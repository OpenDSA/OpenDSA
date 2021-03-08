/*global alert: true, console: true, ODSA, MathJax */

/**
 * This file constitutes the module component of the OpenDSA framework
 * It is responsible for:
 *
 *   1) Handling score data and proficiency feedback
 *        - Receives score data from embedded pages and records score data from
 *          inline exercises
 *        - Buffers and sends score data to the backend server
 *        - Receives proficiency data from the server and provides visual
 *          feedback to the user
 *
 *   2) Handles the client-side components of registration, login, logout,
 *      session management and bug report submission
 *
 *   3) Attaches a click handler to buttons that allows the user to show or hide
 *      embedded AVs and exercises
 *
 * This file should only be referenced by modules (not AV or exercises)
 *
 * This library is dependent on functions defined in odsaUtils.js.
 *
 * Author: Dan Breakiron
 * Updated by : Hosam Shahin
 * Last Modified: 2015-06-30
 */

(function ($) {
  //*****************************************************************************
  //*************                  GLOBAL VARIBALES                 *************
  //*****************************************************************************

  /**
   * Local settings object that makes it easier to access ODSA.SETTINGS and
   * allows better minification
   *
   * ODSA.SETTINGS is initialized in _static/config.js
   */
  var settings = ODSA.SETTINGS;
  settings.EXERCISE_ORIGIN = location.origin;

  /**
   * Local odsaUtils object that makes it easier to access ODSA.UTILS and
   * allows better minification
   *
   * ODSA.UTILS is initialized in odsaUtils.js which must be included before this library
   */
  var odsaUtils = ODSA.UTILS;

  /**
   * Local variable to make it easier to access settings.MODULE_NAME
   *
   * IMPORTANT: Must be initialized inside document.ready() because the
   * script tag where it is defined is in the body element of the page
   */
  var moduleName;

  /**
   * Stores information about each exercise on a page for fast lookup
   *   - type - the exercise type ('ss', 'ka', 'pe')
   *   - uiid - a unique instance identifier which allows events to be tied to an instance of an exercise
   *   - required - whether the exercise is required for module proficiency
   *   - threshold - the score necessary to obtain proficiency (0 to 1.0 for ss and pe, integer for ka)
   *   - points - the number of points an exercise is worth
   */
  var exercises = {};

  /**
   * Enumerated type used for tracking the status of an exercise proficiency
   */
  var ProfStatus = {
    SUBMITTED: {
      value: 'SUBMITTED',
      color: "yellow"
    },
    SUCCESS: {
      value: 'SUCCESS',
      color: "green"
    },
    ERROR: {
      value: 'ERROR',
      color: "red"
    },
    TIMEOUT: {
      value: 'TIMEOUT',
      color: "red"
    }
  };

  /**
   * Keeps count of the number of events that are logged (count will be sent
   * with each event and used to determine how many, if any, events are missing)
   */
  var eventCount = 0;

  /**
   * Stores book stranslation text
   */
  var langDict = odsaUtils.langDict;

  /**
   * Array of exercises names that student become proficient in.
   * This array is loaded from the server by loadModule function.
   */
  var proficientExercises = [];


  //*****************************************************************************
  //***********                   UTILITY FUNCTIONS                                     ***********
  //*****************************************************************************

  function info() { // This is what we pop up
    var outcome = -1;

    // TODO: I don't think modules.json gets generated anymore...
    /*$.ajax({
      url: 'modules.json',
      async: false,
      dataType: 'json',
      success: function(data) {
        $.each(data, function(key, val) {
          if (val.fields.short_display_name.toLowerCase() === moduleName.toLowerCase()) {
            alert(moduleName + "\nModule Written by " + val.fields.author + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://opendsa.org.\nFile created: " + val.fields.last_modified + "\nJSAV library version " + JSAV.version() + "\nDistributed under the MIT open-source license,\nsee https://github.com/OpenDSA/OpenDSA/blob/master/MIT-license.txt");
            outcome = 1;
          }
        });
      }
    });*/

    if (outcome === -1) {
      alert(moduleName + langDict.project_msg + JSAV.version());
    }
  }

  /**
   * Given a button ID, toggles the visibility of the AV in the associated iframe
   */
  function showHide(btnID) {
    var exerName = btnID.replace('_showhide_btn', ''),
      $button = $('#' + btnID),
      $target = $('#' + $button.attr('data-target'));

    if ($target.is(':visible') || $target.css('display') === 'inline') {
      // Hide the target and update the button text
      $target.fadeOut(300);
      $target.css('display', 'none');
      $button.val($button.val().replace(langDict.hide, langDict.show));
    } else {
      // Show the target and update the button text
      // IMPORTANT: Use 'inline' rather than 'block' or else the iFrame
      // won't be centered
      $target.css('display', 'inline');
      $button.val($button.val().replace(langDict.show, langDict.hide));

      // Trigger internal hyperlink to the exercise so that it appears
      // at the top of the screen and the user does not have to scroll
      // down after opening the exercise
      window.location.href = '#' + exerName;
    }

    // If the server is enabled and no user is logged in, warn them
    // they will not receive credit for the exercise they are attempting
    // to view without logging in
    if (odsaUtils.scoringServerEnabled()) {
      if (!$('#' + exerName).hasClass('hideable_content_container')) {
        // warnUserLogin();
      }
    }
  }
  //*****************************************************************************
  //*************      Proficiency Check and Update Displays              *************
  //*****************************************************************************

  /**
   * Update the proficiency indicator(s) for the specified exercise or
   * module based server request state
   *  - If 'name' is not provided, will default to moduleName
   */
  function updateProfDisplay(name, proficient, error) {
    name = (name) ? name : moduleName;
    proficient = proficient || false;
    error = error || false;

    if (exercises[name]) { // name refers to an exercise

      var $iframe = $('#' + name + '_iframe');
      if ($iframe.length > 0) {
        if ($iframe[0].contentWindow) {
          $iframe[0].contentWindow.postMessage(JSON.stringify({
            "proficient": proficient
          }), settings.EXERCISE_ORIGIN);
        }
      }

      var savingMsg = $('#' + name + '_cm_saving_msg'),
        errorMsg = $('#' + name + '_cm_error_msg'),
        check = $('#' + name + '_check_mark');

      // Handle proficiency check mark, if it exists
      if (check.length > 0) {
        // Hide check mark and messages
        check.hide();
        savingMsg.hide();
        errorMsg.hide();

        if (proficient) {
          check.show();
        } else {
          check.hide();
        }

        if (error) {
          errorMsg.show();
        } else {
          errorMsg.hide();
        }
      }

      // Handle showHide button proficiency indicator, if it exists
      var btn = $('#' + name + '_showhide_btn');

      // Change AV showhide button to red or green to indicate proficiency, if it exists
      if (btn.length > 0) {
        savingMsg = $('#' + name + '_shb_saving_msg');
        errorMsg = $('#' + name + '_shb_error_msg');
        spinner = $('#' + name + '_spinner');

        // Hide both saving and error messages
        savingMsg.hide();
        errorMsg.hide();
        spinner.hide();

        if (proficient) {
          btn.css("background-color", ProfStatus.SUCCESS.color);
        } else {
          btn.css("background-color", ProfStatus.ERROR.color);
        }

        if (error) {
          errorMsg.show();
        } else {
          errorMsg.hide();
        }
      }

      // If the student has just become proficient in a required exercise then check to see if the module is now complete
      // if (exercises[name] && exercises[name].required && proficient) {
      //   checkProficiency(moduleName);
      // }
    } else { // name refers to a module
      // Show or hide the 'Module Complete' message on a module page
      var modCompMsgID = '#' + name + '_complete';

      if ($(modCompMsgID).length > 0) {
        $(modCompMsgID).hide();

        if (proficient) {
          $(modCompMsgID).show();
          $(modCompMsgID).css('color', 'lime');
        }

        if (error) {
          $(modCompMsgID).show();
          $(modCompMsgID).css('color', ProfStatus.ERROR.color);
        }
      }

      // Show or hide the check mark next to a module on the index page
      if ($('li.toctree-l1 > a.reference.internal[href="' + name + '.html"]').length > 0) {
        var listStyleImage = (proficient) ? 'url(_static/Images/small_check_mark_green.gif)' : '';

        // Update the style image
        $('li.toctree-l1 > a.reference.internal[href="' + name + '.html"]').parent().css('list-style-image', listStyleImage);
      }
    }
  }

  /**
   * Queries the server for the user's proficiency on an exercise or module
   */
  function checkProficiency(name, username, book) {
    if (odsaUtils.scoringServerEnabled()) {
      name = (name) ? name : moduleName;
      username = (username) ? username : odsaUtils.getUserEmail();
      book = (book) ? book : settings.BOOK_ID;
      // Request proficiency status from the server
      var jsonData = {},
        url;

      jsonData.book = settings.BOOK_ID;

      if (exercises[name]) {
        jsonData.exercise = name;
        url = '/api/v1/userdata/isproficient/';
      } else {
        jsonData.module = name;
        url = '/api/v1/usermodule/ismoduleproficient/';
      }

      jQuery.ajax({
        url: url,
        type: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          data = odsaUtils.getJSON(data);
          updateProfDisplay(name, (data.proficient) ? true : false, false);
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);
          updateProfDisplay(name, false, true);

          if (data.status === 401) {
            // handleExpiredSession(jsonData.key);
          } else if (data.status === 404) {
            console.warn(name + ' does not exist in the database');
          } else {
            console.group('Error: checkProficiency(' + name + ', ' + username + ')');
            console.debug("Error checking proficiency: " + name);
            console.debug(JSON.stringify(data));
            console.groupEnd();
          }
        }
      });
    }
  }

  /**
   * Success handler for getgrade end point ajax call
   */
  function getGradeSuccess(data) {
    data = odsaUtils.getJSON(data);

    if (data.grades && data.modules && data.assignments) {
      var i, exer, mod;
      // Exercises
      for (i = 0; i < data.grades.length; i++) {
        exer = data.grades[i];
        updateProfDisplay(exer.exercise, true, false);
      }
      // Modules
      for (i = 0; i < data.modules.length; i++) {
        mod = data.modules[i];
        updateProfDisplay(mod.module, (mod.proficient) ? true : false, false);
      }
    }
  }

  /**
   * Error handler for getgrade end point ajax call
   */
  function getGradeError(data) {
    data = odsaUtils.getJSON(data);
    if (data.status === 401) {
      // handleExpiredSession(key);
    } else {
      console.debug("Error getting user's points");
      console.debug(JSON.stringify(data));
    }
  }

  /**
   * Queries getgrade endpoint to obtain proficiency status for all
   * exercises and modules used on the index page to concisely determine
   * with which modules the user is proficient
   */
  function syncProficiency(getGradeSuccess, getGradeError) {
    if (odsaUtils.scoringServerEnabled()) {
      var username = odsaUtils.getUserEmail()

      // get user points
      jQuery.ajax({
        url: "/api/v1/userdata/getgrade/",
        type: "POST",
        data: {
          "key": key,
          "book": settings.BOOK_ID
        },
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {
          withCredentials: true
        },
        success: getGradeSuccess,
        error: getGradeError
      });
    }
  }

  /**
   * Sends all the data necessary to load a module to the server
   */
  function loadModule(modName) {
    if (!odsaUtils.hasBook()) return;

    modName = (modName) ? modName : moduleName;

    if (odsaUtils.scoringServerEnabled()) {
      if (odsaUtils.isFullModule()) {
        url = "/odsa_exercise_progresses?inst_chapter_module_id="
          + odsaUtils.getChapterModuleID()
          + "&inst_book_id=" + odsaUtils.getBookID();
      } else if (odsaUtils.isStandaloneModule()) {
        url = "/odsa_exercise_progresses?inst_module_version_id="
          + odsaUtils.getInstModuleVersionID();
      } else {
        url = "/odsa_exercise_progresses/"
          + odsaUtils.getBookID() + "/" + odsaUtils.getSectionID();
      }

      jQuery.ajax({
        url: url,
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {
          withCredentials: true
        },
        success: function (data) {
          // Loop through all the exercises listed in the server's response
          // and update the user's status for each exercise
          proficientExercises = data['proficient_exercises']
          for (var id in proficientExercises) {
            proficientExerName = proficientExercises[id]
            // Update the user's status for the exercises
            if (exercises[proficientExerName]) { // Exercise proficiency
              updateProfDisplay(proficientExerName, true);
            }
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);
          console.debug(JSON.stringify(data));
          console.groupEnd();
        }
      });
    }
  }

  //*****************************************************************************
  //***********                    Scoring System                                           ***********
  //*****************************************************************************

  /**
   * Adds the specified score data to the user's list
   * - data - the score data to store
   */
  function storeScoreData(data) {
    if (odsaUtils.scoringServerEnabled()) {
      data.username = (data.username) ? data.username : odsaUtils.getUserEmail();
      data.book = (data.book) ? data.book : settings.BOOK_ID;

      var rand = Math.floor(Math.random() * 101);
      var key = ['score', data.tstamp, rand].join('-');

      localStorage[key] = JSON.stringify(data);
    }
  }

  /**
   * Stores the user's score for an AV / exercise
   */
  function storeExerciseScore(exerName, score, totalTime, steps_fixed, username, book) {
    if (odsaUtils.scoringServerEnabled()) {
      username = (username) ? username : odsaUtils.getUserEmail();
      book = (book) ? book : settings.BOOK_ID;
      steps_fixed = (steps_fixed) ? steps_fixed : 0;

      // Return if exerName is not a valid exercise
      if (!exercises[exerName]) {
        console.warn('storeExerciseScore(): invalid reference ' + exerName);
        return;
      }
      var data = {};
      data.username = username;
      data.book = book;
      data.exercise = exerName;
      data.module = moduleName;
      data.score = score;
      data.steps_fixed = steps_fixed;
      data.total_time = totalTime;
      data.tstamp = (new Date()).getTime();
      data.threshold = exercises[exerName].threshold;
      data.uiid = exercises[exerName].uiid;
      data.type = exercises[exerName].type;

      var exerId = exercises[exerName].id;
      if (exerId) {
        if (odsaUtils.isStandaloneModule()) {
          data.inst_module_section_exercise_id = exerId;
        } else {
          data.inst_book_section_exercise_id = exerId;
        }
      }
      // Save the score data in localStorage
      storeScoreData(data);
    }
  }

  /**
   * Sends the score for a single exercise
   * - key - the key used to store the score object in local storage
   * - scoreData - the score data to send
   */
  function sendExerciseScore(key, scoreData) {
    var username = odsaUtils.getUserEmail();
    var validDate = new Date();
    validDate.setDate(validDate.getDate() - 5);

    // Send any score data belonging to the current user or the guest
    // account if anonymous credit is allowed
    if (odsaUtils.scoringServerEnabled()) {

      // Set the username to the current user
      // (in case the score belonged to the guest account)
      scoreData.username = username;
      if (scoreData.type == "pe") {
        jQuery.ajax({
          url: "/odsa_exercise_attempts/pe",
          type: "POST",
          data: JSON.stringify(scoreData),
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            data = odsaUtils.getJSON(data);
            // Clear the saved data once it has been successfully transmitted
            // if (odsaUtils.scoringServerEnabled()) {
            //   if (ODSA.TP.outcomeService &&
            //     data.was_proficient === false && data.is_proficient === true) {

            //     ODSA.TP.toParams.score = 1;
            //     jQuery.ajax({
            //       url: "/lti/assessment",
            //       type: "POST",
            //       dataType: 'json',
            //       contentType: "application/json; charset=utf-8",
            //       data: JSON.stringify(ODSA.TP),
            //       datatype: "json",
            //       success: function (data) {
            //         // alert("YES!");
            //       },
            //       error: function (data) {
            //         updateProfDisplay(scoreData.exercise, false, true);
            //       }
            //     });
            //   }
            // }
            // Remove the score object that was sent
            localStorage.removeItem(key);
          },
          error: function (data) {
            updateProfDisplay(scoreData.exercise, false, true);

            data = odsaUtils.getJSON(data);
            try {
              var res = JSON.parse(data.responseText);
              console.error(res);
              if (res.message) {
                alert('ERROR: ' + res.message);
              }
              else {
                alert('ERROR: ' + data.status + ' - ' + data.statusText);
              }
            }
            catch (e) {
              alert('ERROR: ' + data.status + ' - ' + data.statusText);
            }

            if (data.status === 400) { // Bad request
              // Remove the score data so we don't get a build up of bad data that never gets cleared
              localStorage.removeItem(key);
            } else {
              if (data.status === 401) {
                // handleExpiredSession(scoreData.key);
              } else if (data.status === 404) {
                console.warn('Exercise does not exist in the database');
              }
            }
          }
        });
      } else if (scoreData.type == "ae") {
        jQuery.ajax({
          url: "/odsa_exercise_attempts/pe",
          type: "POST",
          data: JSON.stringify(scoreData),
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            data = odsaUtils.getJSON(data);
            localStorage.removeItem(key);
          },
          error: function (data) {
            updateProfDisplay(scoreData.exercise, false, true);

            data = odsaUtils.getJSON(data);
            try {
              var res = JSON.parse(data.responseText);
              console.error(res);
              if (res.message) {
                alert('ERROR: ' + res.message);
              }
              else {
                alert('ERROR: ' + data.status + ' - ' + data.statusText);
              }
            }
            catch (e) {
              alert('ERROR: ' + data.status + ' - ' + data.statusText);
            }

            if (data.status === 400) { // Bad request
              // Remove the score data so we don't get a build up of bad data that never gets cleared
              localStorage.removeItem(key);
            } else {
              if (data.status === 401) {
                // handleExpiredSession(scoreData.key);
              } else if (data.status === 404) {
                console.warn('Exercise does not exist in the database');
              }
            }
          }
        })
      }

    }
  }

  /**
   * Loops through and sends all buffered exercise scores for the given user
   */
  function sendExerciseScores(username) {
    // User must have a valid session in order to send scores
    // This provides integrity by preventing users from submitting
    // scores for someone else and allows us to determine who
    // the scores belong to because the username is derived from the session
    if (odsaUtils.scoringServerEnabled()) {
      username = (username) ? username : odsaUtils.getUserEmail();

      // If a user performs an action that submits an AV score,
      // but they are not logged in, warn them they will not
      // receive credit without logging in
      if (username === "guest") {
        // warnUserLogin();
        return;
      }

      var tstamp = (new Date()).getTime(),
        scoreData;

      // Loop through localStorage looking for any score objects that
      // occurred before tstamp
      for (var key in localStorage) {
        // indexOf is used rather than startsWith because startsWith isn't
        // supported in Chrome
        var scoreTstamp = parseInt(key.split('-')[1], 10);
        if ((key.indexOf('score-') === 0) && (scoreTstamp <= tstamp)) {
          scoreData = odsaUtils.getJSON(localStorage[key]);
          if (odsaUtils.hasBook()) {
            scoreData['inst_book_id'] = ODSA.TP.instBookId;
            if (odsaUtils.isFullModule()) {
              scoreData['inst_chapter_module_id'] = odsaUtils.getChapterModuleID();
            }
            else {
              scoreData['inst_section_id'] = ODSA.TP.instSectionId;
            }
          }
          else if (odsaUtils.isStandaloneModule()) {
            scoreData['inst_module_version_id'] = odsaUtils.getInstModuleVersionId();
          }
          else {
            scoreData['inst_course_offering_exercise_id'] = odsaUtils.getInstCourseOfferingExerciseId();
          }
          // Send the individual score object to the server
          sendExerciseScore(key, scoreData);
        }
      }
    }
  }

  /**
   * Sends all stored event and AV score data to the server
   */
  function flushStoredData() {
    if (odsaUtils.scoringServerEnabled()) {
      sendExerciseScores();
      odsaUtils.sendEventData();
    }
  }

  /**
   * Handle data from events generated on the module page or received from embedded pages
   */
  function processEventData(data) {
    var flush = false;

    // Filter out events we aren't interested in
    if (odsaUtils.discardEvents.indexOf(data.type) > -1) {
      return;
    }

    // Overwrite the av attribute with the correct value
    data.av = data.av.replace('_avc', '');

    // Initialize uiid if it doesn't exist
    if (!data.uiid && exercises[data.av]) {
      // If the event belongs to an exercise, use the exercises uiid
      // If the event belongs to the module, do nothing, page uiid will be added by odsaUtils.logEvent()
      data.uiid = exercises[data.av].uiid;
    }

    // If data.desc doesn't exist or is empty, initialize it
    if (!data.desc || data.desc === '') {
      data.desc = {};
    } else {
      // If it already exists, make sure its a JSON object
      data.desc = odsaUtils.getJSON(data.desc);
    }

    if (exercises[data.av].id) {
      if (odsaUtils.isStandaloneModule()) {
        data.inst_module_section_exercise_id = exercises[data.av].id;
      }
      else {
        data.inst_book_section_exercise_id = exercises[data.av].id;
      }
    }

    // Add the event number to the description so we can track how many events we lose
    data.desc.ev_num = eventCount++;

    var score,
      complete;

    // TODO: Make sure all additional fields of JSAV events are logged somewhere
    if (odsaUtils.ssEvents.indexOf(data.type) > -1) {
      data.desc.currentStep = data.currentStep;
      data.desc.totalSteps = data.totalSteps;

      // Initializes the start time for a slideshow, the first time a user clicks on it
      if (!exercises[data.av].startTime) {
        exercises[data.av].startTime = +new Date();
      }

      // Initialize the highest step count for each slideshow so we can ensure each step is viewed
      if (!exercises[data.av].highestStep) {
        exercises[data.av].highestStep = 0;
      }

      // Increment the step count (only if the user clicked forward to a step they have not yet viewed)
      if ((data.type === 'jsav-forward' || data.type === 'jsav-backward') && data.currentStep === exercises[data.av].highestStep + 1) {
        exercises[data.av].highestStep++;
      }

      // User reached the end of a slideshow, award them credit if:
      //   - They were required to complete the slideshow and they viewed every slide (as indicated by highestStep)
      //   OR
      //   - They are not required to complete the slideshow and they simply make it to the end
      // TODO: Since this references the "settings" object its possible to open the console and set the value to 'false'
      if (data.currentStep === data.totalSteps && ((settings.REQ_FULL_SS && exercises[data.av].highestStep === data.totalSteps) || !settings.REQ_FULL_SS)) {
        data.totalTime = +new Date() - exercises[data.av].startTime;

        // TODO: Do we really want to delete this?
        // Reset the start time because the user just finished
        exercises[data.av].startTime = +new Date();

        // Prevents the exercise from being submitted multiple times if the user gets to the end and keeps clicking "Forward"
        if (!exercises[data.av].hasOwnProperty('complete')) {
          storeExerciseScore(data.av, 1, data.totalTime);
          updateProfDisplay(data.av, true, false);
          flush = true;

          // Add the flag that prevents multiple submissions
          exercises[data.av].complete = true;
        }
      } else {
        // Remove the flag
        delete exercises[data.av].complete;
      }
    } else if (data.type === "jsav-array-click") {
      data.desc.index = data.index;
      data.desc.arrayID = data.arrayid;
    } else if (data.type === "jsav-exercise-grade-change" || data.type === "jsav-exercise-grade" || data.type === "jsav-exercise-step-fixed") {
      // On grade change events, log the user's score and submit it
      score = odsaUtils.roundPercent(data.score.correct / data.score.total);
      // TODO: Verify with Ville how to properly calculate this
      complete = odsaUtils.roundPercent((data.score.correct + data.score.undo + data.score.fix) / data.score.total);
      data.desc.score = score;
      data.desc.complete = complete;

      // Prevent event data from being transmitted on every step
      // This makes better use of the buffering mechanism and overall reduces the network traffic (removed overhead of individual requests), but it takes a while to complete and while its sending the log data isn't saved in local storage, if the user closes the page before the request completes and it fails the data will be lost
      if (exercises[data.av].type == "pe") {
        if (complete === 1) {
          // Store the user's score when they complete the exercise
          storeExerciseScore(data.av, score, data.totalTime, data.score.fix);
          updateProfDisplay(data.av, true, false);
          flush = true;
        }
      }
      else if (exercises[data.av].type == "ae") {
        if (complete === 1) {
          // Store the user's score when they complete the exercise
          storeExerciseScore(data.av, score, data.totalTime, data.score.fix);
          updateProfDisplay(data.av, true, false);
          flush = true;
        }
      }
    } else if (data.type === "odsa-award-credit") {
      // Store completion credit
      storeExerciseScore(data.av, 1, data.totalTime);
      updateProfDisplay(data.av, true, false);
      flush = true;
    }

    if (odsaUtils.scoringServerEnabled()) {
      // Save the event in localStorage
      if (!data.logged) {
        delete data.logged; // In case it explicitly says 'false'
        odsaUtils.logEvent(data);
      }

      if (flush) {
        flushStoredData();
      }
    }
  }

  //*****************************************************************************
  //*************     LOGIN AND REGISTRATION AND BUGS BOXES   *************
  //*****************************************************************************

  /**
   * Opens the bug report window
   */
  function showBugBox() {
    if (odsaUtils.scoringServerEnabled()) {
      odsaUtils.logUserAction('bugreport-box-open', 'bug report box was opened');

      var bugreportBox = '#bugreport-box',
        popMargLeft = ($(bugreportBox).width() + 24) / 2;

      // Change the top and left margins to center the box
      $(bugreportBox).css({
        'margin-left': -popMargLeft
      });

      // Clear any existing error messages
      $('#register_error').slideUp().html('');

      // Fade in the Popup
      $(bugreportBox).fadeIn(300);

      // Add the mask to body
      $('body').append('<div id="mask"></div>');
      $('#mask').fadeIn(300);

      // Set the focus to the username box
      $('#type_bug').focus();
    }
  }

  //*****************************************************************************
  //*************                   INITIALIZATION                  *************
  //*****************************************************************************

  /**
   * Hide the iframe (if applicable), hide the loading spinner and remove
   * the position and top attributes that force the iFrame off the top
   * of the page (to prevent the page from scrolling down when the iFrame
   * loads)
   */
  function exerciseLoaded(exerName) {
    var $iframe = $('#' + exerName + '_iframe');
    $iframe.attr("aria-label", exerName);

    // Hide the iFrame (if its supposed to be hidden) after the
    // dimensions have been reported and the iFrame resized
    // IMPORTANT: Hiding the iFrame before the dimensions have been
    // sent appears to occasionally prevent embedded AVs from
    // calculating their dimensions

    // if ($iframe.attr("data-showhide") === 'hide') {
    //   $iframe.hide();
    //   // remove attribute so that it won't be hidden again when resizing or reloading
    //   // (e.g. when the language is changed)
    //   $iframe.attr('data-showhide', '');
    // }

    // IMPORTANT: Hack to prevent page from scrolling down to iFrame when it loads
    $iframe.css('position', 'relative');
    $iframe.css('top', '0');
    $iframe.css('width', '100%');
    // Hide the loading spinner
    var $spinner = $('#' + exerName + '_spinner');
    if ($spinner.length > 0) {
      $spinner.hide();
    }
  }

  $(document).ready(function () {
    ltiIframeResize();

    // Must be initialized here because ODSA.SETTINGS.MODULE_NAME is contained within the HTML of the page
    moduleName = settings.MODULE_NAME;

    if (moduleName === '') {
      console.warn('ERROR: moduleName is not initialized');
    }

    // Initialize exercise dictionary
    // IMPORTANT: Can't do this in initExercises() because the doesn't run until window.load and the module complete check is performed before that, if exercises is not initialized yet, the module will be listed as complete
    $('.embedContainer, .ssAV, .ffAV').each(function (index, elem) {
      var $elem = $(elem),
        exerName = $elem.attr('id');

      // Return if exerName is already in exercises to avoid duplicates
      // or if the element is a hideable section rather than an exercise
      if (exercises[exerName] || $elem.hasClass('hideable_content_container')) {
        return;
      }

      if (odsaUtils.scoringServerEnabled() && odsaUtils.isStandaloneModule()) {
        // set exercise id data attribute
        exerId = odsaUtils.getExerciseSettings($elem.data('short-name')).inst_module_section_exercise_id
        $elem.attr('data-exer-id', exerId);
        $elem.data('exer-id', exerId);
      }

      // Save the exercise data
      exercises[exerName] = {
        name: $elem.data('long-name'),
        points: $elem.data('points'),
        required: ($elem.data('required') === "True"),
        threshold: $elem.data('threshold'),
        type: $elem.data('type'),
        oembed: $elem.data('oembed'),
        id: $elem.data('exer-id'),
        uiid: +new Date()
      };
    });

    // Listen for and process JSAV events
    $("body").on("jsav-log-event", function (e, data) {
      processEventData(data);
    });

    // Create event handler to listen for messages from embedded exercises
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
      eventer = window[eventMethod],
      messageEvent = (eventMethod === "attachEvent") ? "onmessage" : "message";

    // Listen to message from embedded exercise
    eventer(messageEvent, function (e) {
      var data = odsaUtils.getJSON(e.data);
      if (data) {
        if (data.type === "resize-iframe") {
          var $iframe = $('#' + data.exerName + '_iframe');

          $iframe.width(data.width).height(data.height);

          // Hide the loading spinner and adjust the position of the iFrame
          exerciseLoaded(data.exerName);

          // resize canvas iframe
          ltiIframeResize();
        } else if (data.exercise) {
          // Store status of Khan Academy exercise
          updateProfDisplay(data.exercise, data.proficient, data.error);
        } else if (data.type === "ka-ready") {
          var $iframe = $('#' + data.exerciseName + '_iframe');
          $iframe[0].contentWindow.postMessage(JSON.stringify(ODSA.TP), settings.EXERCISE_ORIGIN);

          // once KA is ready send message to canvas to adjust iframe dimensions
          // to avoid scroll bar in a scroll bar issue
          // for more details https://github.com/OpenDSA/OpenDSA/issues/294
          ltiIframeResize();

        } else if (data.type === "ka-timeme") {
          // KA exercise is tracking its time using timeme lib. When the user
          // leaves the exercise and navigate back to the module the exercise will
          // send a message to the module with the exercise name and the time spent.
          // The module here is adding the time to the correct element.
          // console.log(data.time + " Received form KA exercise: " + data.exerciseName + " callCount: " + data.callCount + " userHasReturned: " + data.userHasReturned);
          var sectionId = $('#' + data.exerciseName + '_iframe').parents('.section').first().attr('id')
          if ((data.userHasReturned || data.callCount > 0) && window.TimeMe) {
            TimeMe.addTimeOnElementInSeconds(sectionId, data.time);
          }
        } else if (data.type === "AV-timeme") {
          // AV exercise is also tracking its time using timeme lib.
          // console.log(data.time + " Received form AV exercise: " + data.exerciseName + " callCount: " + data.callCount + " userHasReturned: " + data.userHasReturned);
          var sectionId = $('#' + data.exerciseName + '_iframe').parents('.section').first().attr('id')
          if ((data.userHasReturned || data.callCount > 0) && window.TimeMe) {
            TimeMe.addTimeOnElementInSeconds(sectionId, data.time);
          }
        } else {
          // Reset the uiid stored by the module page to match the one generated on the embedded page
          exercises[data.av].uiid = data.uiid;
          processEventData(data);
        }
      }
    }, false);

    if (odsaUtils.scoringServerEnabled()) {
      // Log the browser ready event
      if (ODSA.TP.moduleTitle) {
        odsaUtils.logUserAction('document-ready', 'User loaded the ' + ODSA.TP.moduleTitle + ' module');
      }
      else {
        odsaUtils.logUserAction('document-ready', 'User loaded the ' + ODSA.TP.sectionTitle);
      }
    }


    if (odsaUtils.scoringServerEnabled()) {
      // Flush any old data before forcing a user to logout
      flushStoredData();

      loadModule();

      // Attach event handlers
      $(window).focus(function (e) {
        // When the user switches tabs, make sure the login display on the new tab is correct

        if (odsaUtils.scoringServerEnabled()) {
          if (ODSA.TP.moduleTitle) {
            odsaUtils.logUserAction('window-focus', 'User looking at ' + ODSA.TP.moduleTitle + ' module');
          }
          else {
            odsaUtils.logUserAction('window-focus', 'User looking at ' + ODSA.TP.sectionTitle);
          }
        }
      });

      $(window).blur(function (e) {
        if (odsaUtils.scoringServerEnabled()) {
          // When the user leaves an OpenDSA window, log it
          if (ODSA.TP.moduleTitle) {
            odsaUtils.logUserAction('window-blur', 'User is no longer looking at ' + ODSA.TP.moduleTitle + ' module');
          }
          else {
            odsaUtils.logUserAction('window-blur', 'User is no longer looking at ' + ODSA.TP.sectionTitle);
          }
        }
      });

      $(window).on('beforeunload', function () {
        if (odsaUtils.scoringServerEnabled()) {
          // Log the browser unload event
          if (ODSA.TP.moduleTitle) {
            odsaUtils.logUserAction('window-unload', 'User closed or refreshed ' + ODSA.TP.moduleTitle + ' module');
          }
          else {
            odsaUtils.logUserAction('window-unload', 'User closed or refreshed ' + ODSA.TP.sectionTitle);
          }
        };
      });

      // Brings up the embedded bug report  box if the user clicks 'Bug Report/Feedback' and
      // should close the bug report window upon success.
      $('#bugreport-link').click(function () {
        showBugBox();
        return false;
      });

      // Attaches a click handler to the bug report submit button
      // Validation user input and if valid sends a message to the server to record a new bug/feedback
      // Hide the bug report box upon success
      $('#bug-submit-button').click(function () {
        var title = $('#b_title').val();
        if (title === "") {
          $('#bug_error').slideDown().html("Title must be filled out");
          return false;
        }
        var os = $('#b_os').val();
        if (os === "") {
          $('#bug_error').slideDown().html("Operating system must be filled out");
          return false;
        }
        var browser = $('#b_browser').val();
        if (browser === "") {
          $('#bug_error').slideDown().html("Browser must be filled out");
          return false;
        }
        var desc = $('#b_description').val();
        if (desc === "") {
          $('#bug_error').slideDown().html("Description must be filled out");
          return false;
        }

        var formData = new FormData();
        var url = (window.location != window.parent.location) ? document.referrer : document.location;
        formData.append("title", title);
        formData.append("os", os);
        formData.append("browser", browser);
        formData.append("description", desc + '\n\nBook: ' + url);
        formData.append("img", $('#b_screenshot')[0].files[0]);
        jQuery.ajax({
          url: "/api/v1/bugs/submitbug/",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          //datatype: "json",
          xhrFields: {
            withCredentials: true
          },
          success: function (data) {
            // If the bug is recorded successfully n
            alert(langDict.bug_ack);
            // hidePopupBox();
          },
          error: function (data) {
            data = odsaUtils.getJSON(data);
            var response = odsaUtils.getJSON(data.responseText);
            if (data.status === 400) {
              $('#bug_error').slideDown().html('Error:' + response.error);
            }
          }
        });
        return false;
      });

    } else { // Score server is NOT enabled
      // Hide page elements that don't make sense when there is no backend server
      $('#login-link').hide(); // Login link
      $('#registration-link').hide(); // Registration link
    }

    var conceptMapDialogOptions = {
      position: {
        my: "top",
        at: "top",
        of: "body"
      },
      width: "auto",
      height: "auto"
    }

    // inisialize concept map dialog
    function conceptMAPDialogInit() {
      // create dialog markup and initialize dialog
      if ($('#cmapcontainer').length == 0) {
        var $cmapcontainer = $("<div>").attr('id', 'cmapcontainer').attr('title', 'Concept Map').append($("<div>").attr('class', 'avcontainer').append($("<div>").attr('id', 'info').attr("style", "width:800px")));
        $('body').append($cmapcontainer);
      }

      $("#cmapcontainer").dialog({
        autoOpen: false,
        modal: false,
        resizable: true,
        open: function (event, ui) {
          $("#cmapcontainer").dialog("option", conceptMapDialogOptions);
        }
      });
    }

    function showCMapDialog(glossaryTarget) {
      // clear previous graph
      var $svg = $("#cmapcontainer svg");
      if ($svg) {
        $svg.remove();
      }
      var $info = $("#cmapcontainer #info")
      if ($info) {
        $info.empty();
      }

      conceptMapDialogOptions.position.of = glossaryTarget;

      if ($('#cmapcontainer').dialog("isOpen")) {
        $('#cmapcontainer').dialog("close");
      }

      $('#cmapcontainer').dialog("open");

      if (!CMap.runit()) {
        $('#cmapcontainer').dialog("close");
      }
    }

    $("a.abt").click(function (event) {
      info();
    });

    // Solution to the broken slideshows problem
    var showHideLinks = $(".showHideLink");
    $.each(showHideLinks, function (index, value) {
      var section = $("#" + $(value).attr("data-target"));
      if ($(section).attr("id").indexOf("iframe") == -1) {
        if ($(section).css("display") == "none") {
          showHideSection(section);
        }
      }
    });

    // Attach handler to show / hide buttons
    $("input.showHideLink").click(function (event) {
      var btnID = event.target.id;
      showHide(btnID);
    });

    // when GLossary page loaded read target element Id from local storage then manually scroll to it and highlight it.
    // also if there is concept map defined for this book do the following:
    // - initialize conceptmap dialog markup
    // - add click handers for all terms having .ODSAterm class
    var odsaTermList = [];
    if (ODSA.SETTINGS.MODULE_NAME === 'Glossary') {

      // concept map is defined for this book
      if (settings.BUILD_CMAP) {
        conceptMAPDialogInit();
        // add click handlers to .ODSAterm
        $('body').click(function (event) {
          if ($(event.target).hasClass('ODSAterm')) {

            var id = $(event.target).text();
            //List of concept map terms visited, it will be stored in localstorage
            odsaUtils.logUserAction('glossary-term-clicked-IN', id);

            if (localStorage.getItem("concept") !== null) {
              localStorage.removeItem("concept");
            }
            odsaTermList.push(id);
            localStorage.setItem("termIndex", odsaTermList.length - 1);
            localStorage.setItem("concept", JSON.stringify(odsaTermList));

            // get the position of glossaryTarget
            var $parent = $(event.target).closest('a.reference.internal');
            var href = $parent.attr('href');
            var glossaryTarget = href.slice(href.indexOf('#'));

            showCMapDialog(glossaryTarget);
          }
        });

      }

      // move the scroll bar to the glossaryTarget
      if (localStorage.getItem('glossaryTarget') !== null) {
        var glossaryTarget = localStorage.getItem("glossaryTarget");
        showCMapDialog(glossaryTarget);
        //odsaUtils.logUserAction('glossary-term-clicked-OUT', 'User clicked a glossary term from chapter page');
        var container = $('html'),
          scrollTo = $(localStorage.glossaryTarget);

        // scroll to target element
        window.scroll(0,
          scrollTo.offset().top - container.offset().top + container.scrollTop()
        );

        // highlight target element
        scrollTo.addClass('highlighted');

        localStorage.removeItem('glossaryTarget');

        // remove .highlighted class when any other reference link is clicked
        $('body').click(function (event) {
          if ($(event.target).hasClass('xref')) {
            scrollTo.removeClass('highlighted');
          }
        });
      }
      else
        odsaUtils.logUserAction('direct-glossary-link', 'User loaded the glossary from the direct glossary link');
    }

    // for all pages other than Glossary, save target glossary term Id to the local store when term is clicked
    if (ODSA.SETTINGS.MODULE_NAME !== 'Glossary') {

      // put target attr to fix back button in canvas
      $('a.reference.internal').attr('target', '_parent');

      $('body').click(function (event) {
        if ($(event.target).is('.xref, .std, .std-term')) {
          // find the nearst a.reference.internal element to get the term id
          var $parent = $(event.target).closest('a.reference.internal');

          // ::FIXED::TODO: this code will be removed once id attr is in place
          var href = $parent.attr('href');
          var id = href.slice(href.indexOf('#'));
          localStorage['glossaryTarget'] = id;
          id = id.replace("#term-", "");
          id = id.replace(/-/g, " ");

          if (localStorage.getItem("concept") !== null) {
            localStorage.removeItem("concept");
          }

          // ::IT works now without this fix:: TODO: the following code will be uncommented when id attr is in place
          // var glossaryTarget = $parent.attr('id');
          odsaTermList.push(id);
          localStorage.setItem("termIndex", odsaTermList.length - 1);
          localStorage.setItem("concept", JSON.stringify(odsaTermList));

          odsaUtils.logUserAction('glossary-term-clicked-OUT', 'User clicked a glossary term from chapter page');
        }
      });
    }
  });

  //*****************************************************************************
  //***********                  Execute on Page Load                 ***********
  //*****************************************************************************

  /**
   * Initializes an oEmbedded exercise
   *
   * PARAMS:
   *   - elem - the iFrame placeholder div created by the avembed RST directive
   */
  function initOembedAV(elem) {
    var $elem = $(elem),
      exerName = $elem.attr('id'),
      $iframeElem = $('#' + exerName + "_iframe"),
      avurl = $elem.data('frame-src'),
      width = $elem.data('frame-width'),
      height = $elem.data('frame-height'),
      urlParts = avurl.split("//", 2),
      oembedServer = urlParts[0] + "//" + urlParts[1].split("/", 1)[0];

    // Display a div containing an error message that will be replaced
    // if the iframe is loaded successfully
    $iframeElem.html('<div class="warning"><p>Failed to load exercise. Log in to <a href="' + oembedServer + '">' + oembedServer + '</a> to see all the exercises.</p></div>');

    // Error catching doesn't work for jQuery ajax with jsonp and cross referencing
    $.ajax(avurl, {
      dataType: 'jsonp',
      success: function (data, textStatus, jqXhr) {
        var $html = $(data.html),
          $iframe = $html.find('iframe');
        $iframe.attr('id', exerName + '_iframe');
        $iframe.attr('width', width);
        $iframe.css('width', width);
        // $iframe.attr('height', height);
        $iframeElem.replaceWith($iframe);
      }
    });
  }

  /**
   * Fulfills several functions to initialize exercises
   *   - Replaces placeholder divs with the iframes for embedded exercises
   *     (allows embedded pages to be loaded after the module page for
   *     better performance)
   *   - Initializes oEmbed exercises
   *   - Attaches handlers to mini-slideshow events so that MathJax
   *     processing will be applied to mini-slideshow messages
   *   - Adds information about each exercise to the exercise dictionary
   *     for easy access
   *
   * PARAMS:
   *   - elem - a div that encompasses all elements related to the
   *            exercise being processed (including the showhide button)
   *            This div is automatically generated by either the
   *            avembed or inlineav RST directive and MUST use the
   *            exercise name as its ID (required for framework processing
   *            and because this div is used as an anchor to allow
   *            hyperlinking directly to the exercise)
   */
  function initExercises(elem) {
    var $elem = $(elem),
      exerName = $elem.attr('id'),
      iFrameSelector = '#' + exerName + '_iframe';

    if ($elem.attr('data-oembed') === 'true') {
      // Initialize oembedded exercises
      initOembedAV(elem);
    } else if (typeof $elem.attr('data-frame-src') !== 'undefined') {
      // If the element is an embedded exercise that does not use O-embed,
      // dynamically create an iFrame for the exercise and append BOOK_ID to its SRC

      var width = $elem.attr("data-frame-width"),
        height = $elem.attr("data-frame-height"),
        vscroll = $elem.attr("data-vertical-scrolling"),
        showhide = $elem.attr("data-showhide"),
        threshold = $elem.attr("data-threshold"),
        points = $elem.attr("data-points"),
        required = $elem.attr("data-required"),
        separator = $elem.attr("data-frame-src").includes("?") ? "&" : "?",
        shortName = $elem.attr("data-short-name"),
        exerId = $elem.attr("data-exer-id"),
        src = $elem.attr("data-frame-src") + separator + 'scoringServerEnabled=' + odsaUtils.scoringServerEnabled() + '&loggingServerEnabled=' + odsaUtils.loggingServerEnabled() + '&threshold=' + threshold + '&points=' + points + '&required=' + required;
        workoutId = $elem.attr("data-workout-id")

      if (workoutId) {
        src = src + '&workoutId=' + workoutId
      }
      if (odsaUtils.scoringServerEnabled()) {
        if (odsaUtils.hasBook()) {
          src = src + '&instBookId=' + odsaUtils.getBookID();
          if (odsaUtils.isFullModule()) {
            src = src + '&instChapterModuleId=' + odsaUtils.getChapterModuleID() + '&instBookSectionExerciseId=' + exerId;
          }
          else {
            src = src + '&instSectionId=' + odsaUtils.getSectionID();
          }
        }
        else if (odsaUtils.isStandaloneModule()) {
          exSettings = odsaUtils.getExerciseSettings(shortName);
          if (exSettings.launch_url) {
            // external tool exercise (e.g. CodeWorkout)
            src = exSettings.launch_url
          }
          else {
            src = src + '&instModuleVersionId=' + odsaUtils.getInstModuleVersionId() + '&instModuleSectionExerciseId=' + exerId;
          }
        }
        else {
          src = src + '&instCourseOfferingExerciseId=' + odsaUtils.getInstCourseOfferingExerciseId();
        }
      }

      // Dynamic iFrame loading method based on: http://geekoutwith.me/2010/10/make-iframes-load-after-page-content-with-jquery/
      $(iFrameSelector).replaceWith('<iframe id="' + exerName + '_iframe" aria-label="exercise" src="' + src + '" class="embeddedExercise" width="' + width + '" height="' + height + '" data-showhide="' + showhide + '" scrolling="no" >Your browser does not support iframes.</iframe>');

      // if(vscroll === "yes") $(iFrameSelector).css("overflow-y","scroll")
      // else $(iFrameSelector).attr('scrolling',"no")

      // Attach an onLoad() function to each iFrame that will hide it
      // after it is loaded if its supposed to be hidden and send session
      // info to KA exercises
      // IMPORTANT: .hide() must be triggered after contents of iFrame
      // have loaded because Firefox has a bug where the CSS of a hidden
      // iFramed page won't be displayed properly
      $(iFrameSelector).load(function (event) {
        var $iframe = $(event.target);
        if ($elem.attr('data-type') === 'ka') {
          // Hide the loading spinner and adjust the position of the iFrame
          exerciseLoaded(exerName);
        }

        if ($elem.attr('data-type') === 'external_tool') {
          // Hide the loading spinner and adjust the position of the iFrame
          $iframe.css('position', 'relative');
          $iframe.css('top', '0');
        }

        // send ODSA.TP (tool provider) details
        if (odsaUtils.scoringServerEnabled()) {
          $iframe[0].contentWindow.postMessage(JSON.stringify(ODSA.TP), settings.EXERCISE_ORIGIN);
        }

        // Loop through all the exercises listed in the server's response and update the user's status for each exercise
        for (var id in proficientExercises) {
          proficientExerName = proficientExercises[id]
          // Update the user's status for the exercises
          if (exerName === proficientExerName && odsaUtils.scoringServerEnabled()) {
            // send proficiency data to AV and PRO exercise to update the proficiency indecator (green check mark)
            $iframe[0].contentWindow.postMessage(JSON.stringify({
              "proficient": "true"
            }), settings.EXERCISE_ORIGIN);
          }
        }
        // resize canvas iframe
        ltiIframeResize();
      });
    } else if ($elem.hasClass('ssAV') || $elem.hasClass('ffAV')) {
      // If the element is a mini-slideshow, attach handlers to apply
      // MathJax processing to the JSAV message field
      $elem.on("jsav-message", function () {
        // invoke MathJax to do conversion again
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });
      $(".avcontainer").on("jsav-updatecounter", function () {
        // invoke MathJax to do conversion again
        MathJax.Hub.Queue(["Typeset", MathJax.Hub]);
      });
    }
  }

  // Message to canvas to adjust iframe dimension properly
  function ltiIframeResize() {
    // resize ifrme for all sections exept Glossary
    if (ODSA.SETTINGS.MODULE_NAME !== 'Glossary' && odsaUtils.scoringServerEnabled()) {
      var contentHeight = $('.content').outerHeight(true) + 100;
      parent.postMessage(JSON.stringify({
        subject: 'lti.frameResize',
        height: contentHeight
      }), '*');
    }
  }

  $(window).load(function () {
    // Populate the exercises dictionary and initialize embedded iframes
    // Iterate through all exercise containers and mini-slideshows, and add exercises (as necessary)
    $('.embedContainer, .ssAV, .ffAV').each(function (index, elem) {
      initExercises(elem);
    });
    // $('.embedContainer, .ffAV').each(function(index, elem) {
    //   initExercises(elem);
    // });
    ltiIframeResize();
    // becaue MathJax might take long time to load and render the page, we inforce calling
    // ltiIframeResize to readjust canvas iframe
    MathJax.Hub.Queue(ltiIframeResize);
  });

  var ANIMATION_EVENTS = ["jsav-backward", "jsav-forward", "jsav-begin", "jsav-end"];
  $('body').on('jsav-log-event', function (_event, eventData) {
    if (ANIMATION_EVENTS.includes(eventData.type.toString())) {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub])
    }
  })

  //*****************************************************************************
  //***********            Creates global ODSA.MOD object           ***********
  //*****************************************************************************

  // Add publically available functions to a globally accessible ODSA.MOD object
  var odsaMod = {};
  // odsaMod.syncProficiency = syncProficiency;
  odsaMod.langDict = langDict;
  window.ODSA.MOD = odsaMod;
}(jQuery));
