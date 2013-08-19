"use strict";
/*global alert: true, console: true, ODSA */

/** This file should only be referenced by AVs (not modules) */

(function ($) {
  var settings = {},
      odsaUtils = {};

  // Eliminate dependence on OpenDSA framework by creating stubbed function definition
  if (typeof ODSA === "undefined") {
    settings.MODULE_ORIGIN = location.protocol + '//' + location.host;

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

  /**
   * Extracts, decodes and returns the given parameter from the URL
   *   - Based on http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
   */
  function getURLParam(name) {
    var param = new RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.href);
    return (param) ? decodeURIComponent(param[1]) : "";
  }

  // Controls whether the AV submits its own event data or allows its parent page to handle event data
  var selfLoggingEnabled = getURLParam('selfLoggingEnabled') === 'false' ? false : true;

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

  // Add AV utility functions to the global ODSA object
  var av = {};
  av.logExerciseInit = logExerciseInit;
  av.awardCompletionCredit = awardCompletionCredit;
  av.reset = reset;
  window.ODSA.AV = av;

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
    this.addClass(index, "processing");
  };
  JSAV._types.ds.AVArray.prototype.unhighlightBlue = function (index) {
    this.removeClass(index, "processing");
  };

  /**
   * Convenience function for highlighting sorted values
   */
  JSAV._types.ds.AVArray.prototype.markSorted = function (index) {
    this.css(index, {"background-color": "#ffffcc" });
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

      console.log('data.desc: ' + JSON.stringify(data.desc));

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
      } else if (data.type === "jsav-exercise-grade-change") {
        // On grade change events, log the user's score and submit it
        data.desc.score = odsaUtils.roundPercent((data.score.student - data.score.fix) / data.score.total);
        data.desc.complete = odsaUtils.roundPercent(data.score.student / data.score.total);

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

      parent.postMessage(data, settings.MODULE_ORIGIN);

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