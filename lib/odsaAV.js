"use strict";
/*global alert: true, console: true, ODSA, PARAMS, JSAV_OPTIONS, JSAV_EXERCISE_OPTIONS */

/** This file should only be referenced by AVs (not modules) */

(function ($) {
  // Create a global namespace for AV related functions and variables
  window.ODSA.AV = {};

  var settings = {},
      odsaUtils = {};

  // Eliminate dependence on OpenDSA framework by creating stubbed function definitions
  if (typeof ODSA === "undefined") {
    // If MODULE_ORIGIN is not specified, assume they are on the same domain
    if (!settings.MODULE_ORIGIN) {
      settings.MODULE_ORIGIN = location.protocol + '//' + location.host;
    }

    // Define the console object if it doesn't exist to support IE without developer tools
    if (!(window.console && console.log)) {
      console = {
        log: function () {},
        debug: function () {},
        info: function () {},
        warn: function () {},
        error: function () {}
      };
    }

    odsaUtils.serverEnabled = function () {return false; };
    odsaUtils.roundPercent = function (number) {
      return Math.round(number * 100) / 100;
    };
    odsaUtils.inDebugMode = function () {
      return localStorage.DEBUG_MODE === 'true';
    };

    odsaUtils.sendEventData = function () {};
    odsaUtils.logUserAction = function (type, desc, exerName, eventUiid) {};
    odsaUtils.logEvent = function (data) {};

    window.ODSA = {};
    window.ODSA.SETTINGS = settings;
    window.ODSA.UTILS = odsaUtils;

    console.warn('odsaUtils.js was not included, using fallback function definitions');
  } else {
    settings = ODSA.SETTINGS;
    odsaUtils = ODSA.UTILS;
  }

  /**
   * A timestamp when the user started looking at the page
   */
  var focusTime = +new Date();

  /**
   * The total amount of time the user has spent on the current exercise instance
   */
  var totalTime = 0;

  /**
   * Stores the empty contents of the avcontainer, used for reset
   */
  var emptyContent = '';

  /**
   * Set a flag indicating the user cannot receive credit for the
   * current exercise instance after viewing the model answer
   */
  var allowCredit = true;

  /**
   * A unique instance identifier, used to group interaction events from a single instance
   */
  var uiid = +new Date();

  //*****************************************************************************
  //*************                    AV FUNCTIONS                   *************
  //*****************************************************************************

  // Controls whether the AV submits its own event data or allows its parent page to handle event data
  var selfLoggingEnabled = PARAMS.selfLoggingEnabled === 'false' ? false : true;

  /**
   * Generates a JSAV event to log the initial state of an AV or exercise
   *   - initData - A JSON object that contains the initial state of an exercise
   *     Conventions:
   *       - The key for automatically generated data should have a prefix 'gen_'
   *         - Ex: an automatically generated array would be 'gen_array'
   *       - The key for user generated data should have a prefix 'user_'
   *         - Ex: Array data the user enters in the textbox should have a key 'user_array'
   */
  function logExerciseInit(initData) {
    // Reset the uiid (unique instance identifier)
    uiid = +new Date();
    totalTime = 0;

    var data = {av: settings.AV_NAME, type: 'odsa-exercise-init', desc: JSON.stringify(initData)};
    $("body").trigger("jsav-log-event", [data]);
  }

  /**
   * Generates a JSAV event which triggers the code to give a user credit for an exercise
   */
  function awardCompletionCredit() {
    var data = {av: settings.AV_NAME, type: 'odsa-award-credit'};
    $("body").trigger("jsav-log-event", [data]);
  }

  /**
   * Resets the AV to its initial state
   */
  function reset(flag) {
    // Replace the contents of the avcontainer with the save initial state
    $('.avcontainer').unbind().html(emptyContent);

    // Clear the array values field, when no params given and reset button hit
    if (flag !== true && !$('#arrayValues').prop("disabled")) {
      $('#arrayValues').val("");
    }
  }

  /**
   * Loads a JSON file that contains language and / or code translations
   * Automatically attempts to reset the language of common elements
   */
  function loadLanguage() {
    var configurationFile;
    var url = settings.AV_NAME + '.json';

    // the selected language and code
    var lang = JSAV_EXERCISE_OPTIONS.lang || JSAV_OPTIONS.lang || "en";
    var code = JSAV_EXERCISE_OPTIONS.code || JSAV_OPTIONS.code || '';
    // Ensure lang and code are lowercase so that everything remains case-insensitive
    lang = lang.toLowerCase();
    code = code.toLowerCase();

    // download the entire configuration file
    $.ajax({
      url: url,
      async: false,
      dataType: "json",
      success: function (data) {
        configurationFile = ODSA.UTILS.getJSON(data);

        // URL where the language information can be downloaded from
        var langUrl = '';

        // Obtain the translation data
        if (typeof configurationFile !== 'undefined' && configurationFile.hasOwnProperty('translations')) {
          var translation;

          if (typeof configurationFile.translations === "string") {
            // If 'translations' is a generic URL, replace the '{lang}' placeholder with the language we are trying to load
            langUrl = configurationFile.translations.replace('{lang}', lang);
          } else if (typeof configurationFile.translations[lang] === "object") {
            // If 'translations' is an object containing translations, we found the translation data
            translation = configurationFile.translations[lang];
          } else if (typeof configurationFile.translations[lang] === "string") {
            // Looks for a JSON file at the path (relative to the AV JS file) specified in association with a given langauge
            langUrl = url.split("/");
            langUrl.pop();
            langUrl = langUrl.join("/");
            if (langUrl !== "") {
              langUrl += "/";
            }
            langUrl += configurationFile.translations[lang];
          }

          // If langUrl is initialized, download the language data
          if (langUrl !== '') {
            // download the language object from the url
            var langData;

            $.ajax({
              url: langUrl,
              async: false,
              dataType: "json",
              success: function (data) { langData = data; }
            });

            translation = langData;
          }

          // Initialize the interpreter object in the ODSA.AV namespace
          ODSA.AV.interpreter = JSAV.utils.getInterpreter(translation);

          // Update the language of text used in the AV
          if (typeof translation === 'undefined') {
            console.error('There is no translation support for language ' + JSAV_OPTIONS.lang);
          } else {
            var container = $('#container');
            var elem;
            for (var field in translation) {
              if (translation.hasOwnProperty(field) && field.indexOf("av_") !== 0) {
                elem = container.find(field);
                if (elem.size() > 0) {
                  if (elem.is('input')) {
                    elem.attr('value', translation[field]);
                  } else {
                    elem.html(translation[field]);
                  }
                }
              }
            }
          }

          // Read the code translation from the configuration file
          if (configurationFile.code !== '') {
            ODSA.AV.code = configurationFile.code[code];
          }
        } else {
          console.error('JSON language file does not contain a "translations" key.  Please make sure your JSON file follows the correct format.');
          ODSA.AV.interpreter = function () {};
        }
      },
      error: function (data) {
        data = ODSA.UTILS.getJSON(data);

        if (data.hasOwnProperty('status') && data.status === 200) {
          console.error('JSON language file is malformed. Please make sure your JSON is valid.');
        } else {
          console.error('Unable to load JSON language file.');
        }

        ODSA.AV.interpreter = function () {};
      }
    });
  }

  // Make AV utility functions public by adding them to the global ODSA.AV namespace
  ODSA.AV.logExerciseInit = logExerciseInit;
  ODSA.AV.awardCompletionCredit = awardCompletionCredit;
  ODSA.AV.reset = reset;


  //*****************************************************************************
  //*************                  JSAV Extensions                  *************
  //*****************************************************************************
  /**
   * Extends the JSAV AV array to have the slice functionality of JavaScript arrays
   */
  JSAV._types.ds.AVArray.prototype.slice = function (start, end) {
    var array = [];

    for (var i = 0; i < (end - start); i++) {
      array[i] = this.value(start + i);
    }

    return array;
  };

  /**
   * Convenience function for highlighting the pivot value in blue
   */
  JSAV._types.ds.AVArray.prototype.highlightBlue = function (index) {
    return this.addClass(index, "processing");
  };
  JSAV._types.ds.AVArray.prototype.unhighlightBlue = function (index) {
    return this.removeClass(index, "processing");
  };

  /**
   * Convenience function for highlighting sorted values
   */
  JSAV._types.ds.AVArray.prototype.markSorted = function (index) {
    this.removeClass(index, "processing");
    return this.addClass(index, "sorted");
  };

  /**
   * toString function for JSAV arrays, useful for debugging
   */
  JSAV._types.ds.AVArray.prototype.toString = function () {
    var size = this.size();
    var str = '[';
    for (var i = 0; i < size; i++) {
      str += this.value(i);

      if (i < size - 1) {
        str += ', ';
      }
    }
    str += ']';

    return str;
  };

  //*****************************************************************************
  //*************                      LOGGING                      *************
  //*****************************************************************************
  /**
   * Parses the name of the page from the URL
   */
  function getNameFromURL(url) {
    // If no URL is specified, uses the pathname of the current page
    url = (url) ? url : location.pathname;
    var start = url.lastIndexOf("/") + 1,
        end = url.lastIndexOf(".htm");

    // URL is a directory, redirecting to an index page
    if (start === url.length && end === -1) {
      return 'index';
    }

    return url.slice(start, end);
  }

  $(document).ready(function () {
    // Initialize settings.AV_NAME
    settings.AV_NAME = getNameFromURL();

    emptyContent = $('.avcontainer').html();

    loadLanguage();

    // Listen for JSAV events and forward them to the parent page
    $("body").on("jsav-log-event", function (e, data) {
      var flush = false,
          discardEvents = ["jsav-init", "jsav-recorded", "jsav-exercise-model-init", "jsav-exercise-model-recorded"],
          ssEvents = ['jsav-forward', 'jsav-backward', 'jsav-begin', 'jsav-end', 'jsav-exercise-model-forward', 'jsav-exercise-model-backward', 'jsav-exercise-model-begin', 'jsav-exercise-model-end'];

      // Filter out events we aren't interested in
      if (discardEvents.indexOf(data.type) > -1) {
        return;
      }

      // Overwrite the av attribute with the correct value and append the uiid
      data.av = settings.AV_NAME;
      data.uiid = uiid;

      // If data.desc doesn't exist or is empty, initialize it
      if (!data.desc || data.desc === '') {
        data.desc = {};
      } else {
        // If it already exists, make sure its a JSON object
        data.desc = odsaUtils.getJSON(data.desc);
      }

      if (ssEvents.indexOf(data.type) > -1) {
        data.desc.currentStep = data.currentStep;
        data.desc.currentStep = data.totalSteps;

        // Flush event data when the end of a slideshow is reached
        if (data.currentStep === data.totalSteps) {
          flush = true;
        }
      } else if (data.type === "jsav-array-click") {
        data.desc.index = data.index;
        data.desc.arrayID = data.arrayid;
      } else if (data.type === "jsav-exercise-grade-change" || data.type === "jsav-exercise-grade" || data.type === "jsav-exercise-step-fixed") {
        // On grade change events, log the user's score and submit it
        data.desc.score = odsaUtils.roundPercent(data.score.correct / data.score.total);
        data.desc.complete = odsaUtils.roundPercent((data.score.correct + data.score.undo + data.score.fix) / data.score.total);

        // Prevent event data from being transmitted on every step
        // This makes better use of the buffering mechanism and overall reduces the network traffic (removed overhead of individual requests), but it takes a while to complete and while its sending the log data isn't saved in local storage, if the user closes the page before the request completes and it fails the data will be lost
        //if (data.desc.complete === 1) {
        flush = true;
        //}
      } else if (data.type === "jsav-exercise-model-open") {
        // If user looks at the model answer before they are done and
        // they haven't already lost credit, warn them they can no longer
        // receive credit and prevent them from getting credit for the exercise
        if (allowCredit && $('span.jsavamidone').html() !== "DONE") {
          allowCredit = false;

          alert("You can no longer receive credit for the current instance of this exercise.\nClick 'Reset' or refresh the page to get a new problem instance.");

          // Hide the score widget and display and appropriate message in its place
          $('span.jsavscore').hide();
          $('span.jsavscore').parent().append('<span id="credit_disabled_msg">Credit not given for this instance</span>');
        }
      } else if (data.type === "jsav-exercise-reset") {
        flush = true;

        // If the student looked at the model answer for the previous
        // attempt, allow them to get credit for the new instance
        if (!allowCredit) {
          allowCredit = true;

          $('span.jsavscore').show();
          $('#credit_disabled_msg').remove();
        }
      }

      // Mark data as logged on the client side, then send message to the parent window
      data.totalTime = totalTime + (+new Date()) - focusTime;

      // Marks the data as logged if the AV itself will be in charge of logging the data
      if (selfLoggingEnabled) {
        data.logged = true;
      }

      if (settings.MODULE_ORIGIN) {
        parent.postMessage(data, settings.MODULE_ORIGIN);
      }

      // Save the event in localStorage
      if (odsaUtils.serverEnabled() && selfLoggingEnabled) {
        odsaUtils.logEvent(data);

        if (flush) {
          odsaUtils.sendEventData();
        }
      }
    });

    if (odsaUtils.serverEnabled()) {
      // Log the browser ready event
      odsaUtils.logUserAction('document-ready', 'User loaded the ' + settings.AV_NAME + ' AV');

      if (selfLoggingEnabled) {
        // Send any stored event data when the page loads
        odsaUtils.sendEventData();
      }

      $(window).focus(function (e) {
        odsaUtils.logUserAction('window-focus', 'User looking at ' + settings.AV_NAME + ' window');
        focusTime = +new Date();
      });

      $(window).blur(function (e) {
        odsaUtils.logUserAction('window-blur', 'User is no longer looking at ' + settings.AV_NAME + ' window');
        totalTime += (+new Date() - focusTime);
      });

      $(window).on('beforeunload', function () {
        // Log the browser unload event
        odsaUtils.logUserAction('window-unload', 'User closed or refreshed ' + settings.AV_NAME + ' window');
      });
    }
  });
}(jQuery));
