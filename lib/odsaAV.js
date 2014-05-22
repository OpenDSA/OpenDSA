"use strict";
/*global alert: true, console: true, ODSA, PARAMS, JSAV_OPTIONS, JSAV_EXERCISE_OPTIONS */

/**
 * This file constitutes the AV and exercise component of the OpenDSA framework
 * It is responsible for:
 *
 *   1) Creating function stubs within the ODSA namespace to allow AVs and
 *      exercises to function without the rest of the OpenDSA framework
 *
 *   2) Defining generalized utility functions used by multiple AVs / exercises
 *
 *   3) Automatically handling some common AV behavior
 *        - Displays a message that user's can no longer receive credit for an
 *          exercise after viewing the model answer
 *
 *   4) Automatically logging most actions taken within an AV
 *        - Sends log information to the parent page or submits its own logging
 *          data (if this option is configured)
 *
 * This file should only be referenced by AVs and non-Khan Academy exercises (not modules)
 *
 * This library is designed to operate either in conjunction with odsaUtils.js
 * or by itself. When used with odsaUtils.js, odsaUtils.js should be included before
 * this library. When used by itself, event logging and score submission will
 * not function properly.
 *
 * Author: Dan Breakiron
 * Last Modified: 2014-05-20
 */

(function ($) {
  //*****************************************************************************
  //*************                  GLOBAL VARIBALES                 *************
  //*****************************************************************************

  /**
   * Local settings object that makes it easier to access ODSA.SETTINGS and
   * allows better minification
   */
  var settings = {};

  /**
   * Local odsaUtils object that makes it easier to access ODSA.UTILS and
   * allows better minification
   */
  var odsaUtils = {};

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
  //*************                   INITIALIZATION                  *************
  //*****************************************************************************

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

  // Initialize ODSA.SETTINGS.AV_NAME
  // Must be done here after the stubs are created
  ODSA.SETTINGS.AV_NAME = getNameFromURL();


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

  // Initialize the arraysize drop down list
  function initArraySize(min, max, selected) {
    // Use the midpoint between the min and max as a default, if a selected value isn't provided
    selected = (selected) ? selected : Math.round((max + min) / 2);

    var html = "";
    for (var i = min; i <= max; i++) {
      html += '<option ';
      if (i === selected) {
        html += 'selected="selected" ';
      }
      html += 'value="' + i + '">' + i + '</option>';
    }

    $('#arraysize').html(html);

    // Save the min and max values as data attributes so
    // they can be used by processArrayValues()
    $('#arraysize').data('min', min);
    $('#arraysize').data('max', max);
  }

  // Validate the array values a user enters or generate an array of random numbers if none are provided
  function processArrayValues(upperLimit) {
    upperLimit = (upperLimit) ? upperLimit : 999;

    var i,
        initData = {},
        minSize = $('#arraysize').data('min'),
        maxSize = $('#arraysize').data('max'),
        msg = "Please enter " + minSize + " to " + maxSize + " positive integers between 0 and " + upperLimit;

    if (!minSize || !maxSize) {
      console.warn('processArrayValues() called without calling initArraySize()');
    }

    // Convert user's values to an array,
    // assuming values are space separated
    var arrValues = $('#arrayValues').val().match(/[0-9]+/g) || [];

    if (arrValues.length === 0) { // Empty field
      // Generate (appropriate length) array of random numbers between 0 and the given upper limit
      for (i = 0; i < $('#arraysize').val(); i++) {
        arrValues[i] = Math.floor(Math.random() * (upperLimit + 1));
      }
      initData.gen_array = arrValues;
    } else {
      // Ensure user provided array is in correct range
      if (arrValues.length < minSize || arrValues.length > maxSize) {
        alert(msg);
        return null;
      }

      // Ensure all user entered values are positive integers
      for (i = 0; i < arrValues.length; i++) {
        arrValues[i] = Number(arrValues[i]);
        if (isNaN(arrValues[i]) || arrValues[i] < 0 || arrValues[i] > upperLimit) {
          alert(msg);
          return null;
        }
      }

      initData.user_array = arrValues;

      // Update the arraysize dropdown to match the length of the user entered array
      $('#arraysize').val(arrValues.length);
    }

    // Dynamically log initial state of text boxes
    $('input[type=text]').each(function (index, item) {
      var id = $(item).attr('id');

      if (id !== 'arrayValues') {
        initData['user_' + id] = $(item).val();
      }
    });

    // Dynamically log initial state of dropdown lists
    $('select').each(function (index, item) {
      var id = $(item).attr('id');
      initData['user_' + id] = $(item).val();
    });

    // Log initial state of exercise
    ODSA.AV.logExerciseInit(initData);

    return arrValues;
  }

  // Return a standard phrasing to be used in the "about" alert box
  function aboutstring(title, authors) {
    return(title + "\nWritten by " + authors + "\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/OpenDSA/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }


  //*****************************************************************************
  //*************            Creates global ODSA.AV object           ************
  //*****************************************************************************


  // Create a global AV namespace and make the necessary AV variables and utility functions public by adding them to it
  window.ODSA.AV = {};
  ODSA.AV.logExerciseInit = logExerciseInit;
  ODSA.AV.awardCompletionCredit = awardCompletionCredit;
  ODSA.AV.reset = reset;
  ODSA.AV.initArraySize = initArraySize;
  ODSA.AV.processArrayValues = processArrayValues;
  ODSA.AV.aboutstring = aboutstring;


  //*****************************************************************************
  //*************                      LOGGING                      *************
  //*****************************************************************************

  $(document).ready(function () {
    // Record the HTML of the avcontainer in the "empty" state
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
