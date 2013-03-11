"use strict";
/*global alert: true, console: true, ODSA */

/** This file should only be referenced by AVs (not modules) */

(function ($) {
  var settings = {},
      odsaUtils = {};

  // Eliminate dependence on OpenDSA framework by creating stubbed function definition
  if (typeof ODSA === "undefined") {
    settings.AV_NAME = '';
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
    odsaUtils.getNameFromURL = function () {return ''; };
    odsaUtils.roundPercent = function (number) {
      return Math.round(number * 100) / 100;
    };
    odsaUtils.sendEventData = function () {};
    odsaUtils.logUserAction = function (type, desc, exerName, eventUiid) {};
    odsaUtils.logEvent = function (data) {};

    window.ODSA = {};
    window.ODSA.SETTINGS = settings;
    window.ODSA.UTILS = odsaUtils;

    console.warn('ODSA.js was not included, using fallback function definitions');
  } else {
    settings = ODSA.SETTINGS;
    odsaUtils = ODSA.UTILS;
  }

  /**
   * A timestamp when the user started looking at the pages
   */
  var focusTime = 0;

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
   * Initializes the arraysize drop down list
   */
  function initArraySize(min, max, selected) {
    // Uses the midpoint between the min and max as a default, if a selected value isn't provided
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
   * Validates the array values a user enters or generates an array of random numbers if none are provided
   */
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
    logExerciseInit(initData);

    return arrValues;
  }

  // Add AV utility functions to a
  var av = {};
  av.logExerciseInit = logExerciseInit;
  av.awardCompletionCredit = awardCompletionCredit;
  av.initArraySize = initArraySize;
  av.reset = reset;
  av.processArrayValues = processArrayValues;
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

  // TODO: Reimplement this using JSAV's built-in addClass and removeClass methods
  /**
   * Convenience function for highlighting the pivot value in blue
   */
  JSAV._types.ds.AVArray.prototype.highlightBlue = function (index) {
    this.css(index, {"background-color": "#ddf" });
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
  $(document).ready(function () {
    // Initialize settings.AV_NAME
    settings.AV_NAME = odsaUtils.getNameFromURL();

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
        data.desc = data.type;
      }

      if (ssEvents.indexOf(data.type) > -1) {
        data.desc = data.currentStep + " / " + data.totalSteps;

        // Flush event data when the end of a slideshow is reached
        if (data.currentStep === data.totalSteps) {
          flush = true;
        }
      } else if (data.type === "jsav-array-click") {
        data.desc = JSON.stringify({'index': data.index, 'arrayid': data.arrayid});
      } else if (data.type === "jsav-exercise-grade-change") {
        // On grade change events, log the user's score and submit it
        var score = odsaUtils.roundPercent((data.score.student - data.score.fix) / data.score.total);
        var complete = odsaUtils.roundPercent(data.score.student / data.score.total);
        data.desc = JSON.stringify({'score': score, 'complete': complete});

        // Prevent event data from being transmitted on every step
        // This makes better use of the buffering mechanism and overall reduces the network traffic (removed overhead of individual requests), but it takes a while to complete and while its sending the log data isn't saved in local storage, if the user closes the page before the request completes and it fails the data will be lost
        //if (complete === 1) {
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

      // Mark data as logged on the client side, then send to message to the parent window
      data.totalTime = totalTime + (+new Date()) - focusTime;
      data.logged = true;
      parent.postMessage(data, settings.MODULE_ORIGIN);

      // Save the event in localStorage
      if (odsaUtils.serverEnabled()) {
        odsaUtils.logEvent(data);

        if (flush) {
          odsaUtils.sendEventData();
        }
      }
    });

    if (odsaUtils.serverEnabled()) {
      // Log the browser ready event
      odsaUtils.logUserAction('document-ready', 'User loaded the ' + settings.AV_NAME + ' AV');

      // Send any stored event data when the page loads
      odsaUtils.sendEventData();

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