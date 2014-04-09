"use strict";
/*global alert: true, console: true, ODSA */

(function ($) {
  var settings = ODSA.SETTINGS,
      odsaUtils = ODSA.UTILS;

  // Set the book ID (SHA1 hash of the book URL)
  settings.BOOK_ID = odsaUtils.getBookID();

  // Display a warning if a setting known to be in config.js (and not given a default value in odsaUtils.js) is missing
  if (typeof settings.ALLOW_ANON_CREDIT === "undefined") {
    console.warn('ERROR: OpenDSA is not configured and may not function properly.  Please ensure config.js is loaded.');
  }

  // Local variable to make it easier to access settings.MODULE_NAME
  var moduleName;

  // Stores information about each exercise on a page for fast lookup
  //  - type - the exercise type ('ss', 'ka', 'pe')
  //  - uiid - a unique instance identifier which allows events to be tied to an instance of an exercise
  //  - required - whether the exercise is required for module proficiency
  //  - threshold - the score necessary to obtain proficiency (0 to 1.0 for ss and pe, integer for ka)
  //  - points - the number of points an exercise is worth
  var exercises = {};

  // Enumerated type used for tracking the status of an exercise
  var Status = {
    SUBMITTED: 'SUBMITTED',
    STORED: 'STORED',
    ERROR: 'ERROR'
  };

  var readyTime = +new Date();  // TODO: For performance testing

  // Keeps count of the number of events that are logged (count will be sent with each event and used to determine how many, if any, events are missing)
  var eventCount = 0;

  function info() { // This is what we pop up
    var outcome = -1;
    $.ajax({
      url: 'modules.json',
      async: false,
      dataType: 'json',
      success: function (data) {
        $.each(data, function (key, val) {
          if (val.fields.short_display_name.toLowerCase() === moduleName.toLowerCase()) {
            alert(moduleName + "\nModule Written by " + val.fields.author + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nFile created: " + val.fields.last_modified + "\nJSAV library version " + JSAV.version() + "\nDistributed under the MIT open-source license,\nsee http://algoviz.org/OpenDSA/MIT-license.txt");
            outcome = 1;
          }
        });
      }
    });

    if (outcome === -1) {
      alert(moduleName + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nJSAV library version " + JSAV.version());
    }
  }

  /**
   * Store username and session key in localStorage
   */
  function updateLocalStorage(username, sessionKey) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 5);  //the session is valid 5 days
    var session = {};
    session.username = username;
    session.key = sessionKey;
    // Save the expiration date as milliseconds so it can be compared after being extracted from the session
    session.expires = expireDate.getTime();
    localStorage.session = JSON.stringify(session);
  }

  function isSessionExpired() {
    if (localStorage.session) {
      var session = JSON.parse(localStorage.session),
          sessionDate = session.expires,
          currentDate = new Date();

      // Compare the saved expiration date in milliseconds with the current milliseconds
      if (sessionDate > currentDate.getTime()) {
        return false;
      }

      alert('Your current session has expired.');
    }
    return true;
  }

  /**
   * Deletes the session data from local storage, informs the user that their
   * session has expired and reload the page to reset all exercises
   */
  function handleExpiredSession(key) {
    console.warn('Sesson expired');

    var currKey = odsaUtils.getSessionKey();

    // Checks key used to submit data against current key to prevent multiple alerts
    // from popping up when multiple responses come in from multiple messages sent with an invalid session key
    if (key === currKey) {
      localStorage.removeItem('session');
      localStorage.removeItem('warn_login');
      // Alternatively, trigger updateLogin() and show the login box (won't reset exercises that have been completed)
      //updateLogin();
      //showLoginBox();
      alert('Your account has been logged in on another computer and the\n current session is no longer valid. Please login again to continue.');
      // Trigger a page reload to reset exercises (in case someone else logs in) and proficiency indicators
      window.location.reload();
    }
  }

  /**
   * Given a button ID, toggles the visibility of the AV in the associated iframe
   */
  function showHide(btnID) {
    var button = $('#' + btnID),
        exer_name = btnID.replace('_showhide_btn', ''),
        div = $('#' + exer_name);

    if (div.html().trim().length > 0) {    // AV is loaded, show or hide it
      if (div.is(':visible')) {    // AV is visible, hide it
        div.hide();

        // Update the button text
        button.val(button.val().replace('Hide', 'Show'));
        return;
      } else {    // AV is hidden, show it
        div.show();
      }
    } else {    // AV isn't loaded, load it
      var src = div.data("frame-src"),
          width = div.data("frame-width"),
          height = div.data("frame-height");

      // Append the iFrame after the button
      div.append('<iframe id="' + exer_name + '_iframe" src="' + src + '" width="' + width + '" height="' + height + '" scrolling="no">Your browser does not support iframes.</iframe>');
    }

    // Update the button text
    button.val(button.val().replace('Show', 'Hide'));

    // If the server is enabled and no user is logged in, warn them
    // they will not receive credit for the exercise they are attempting
    // to view without logging in
    if (odsaUtils.serverEnabled() && !odsaUtils.userLoggedIn()) {
      warnUserLogin();
    }
  }

  //*****************************************************************************
  //*************      Proficiency Check and Update Displays        *************
  //*****************************************************************************

  /**
   * Given a name, returns whether localStorage has a
   * record of the current user being proficient
   */
  function getProficiencyStatus(name, username, book) {
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.BOOK_ID;

    var key = ['prof', username, book, name].join('-'),
        status = localStorage[key];

    return (status !== "undefined") ? status : false;
  }

  /**
   * Stores the user's proficiency status with the specified exercise in localStorage
   */
  function storeProficiencyStatus(name, status, username, book) {
    if (odsaUtils.inDebugMode()) {
      console.group('storeProficiencyStatus(' + name + ', ' + status + ', ' + username + ', ' + book + ')');
    }

    // Don't store proficiency for modules that can't be completed
    if (name === moduleName && !settings.DISP_MOD_COMP) {
      if (odsaUtils.inDebugMode()) {
        console.debug(name + ' cannot be completed');
        console.groupEnd();
      }
      return;
    }

    status = (typeof status !== "undefined") ? status : Status.STORED;  // false is a valid status
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.BOOK_ID;

    var key = ['prof', username, book, name].join('-');

    // Save or clear the user's status
    if (status) {
      localStorage[key] = status;
    } else {
      localStorage.removeItem(key);
    }

    if (odsaUtils.inDebugMode()) {
      if (status) {
        console.debug('Setting ' + key + ' to ' + status);
      } else {
        console.debug('Removing ' + key);
      }
      console.groupEnd();
    }
  }

  /**
   * Update the proficiency indicator(s) for the specified exercise or module based on the local proficiency cache
   *  - If 'name' is not provided, will default to moduleName
   */
  function updateProfDisplay(name) {
    name = (name) ? name : moduleName;

    if (odsaUtils.inDebugMode()) {
      console.group('updateProfDisplay(' + name + ')');
    }

    var username = odsaUtils.getUsername(),
        status = getProficiencyStatus(name, username, settings.BOOK_ID);

    if (exercises[name]) {  // name refers to an exercise
      if (odsaUtils.inDebugMode()) {
        console.debug('Updating exercise proficiency');
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

        if (status === Status.SUBMITTED) {
          // Display the proficiency check mark and saving message
          check.show();
          savingMsg.show();
        } else if (status === Status.ERROR) {
          // Display the proficiency check mark and error message
          check.show();
          errorMsg.show();
        } else if (status === Status.STORED) {
          // Display the proficiency check mark
          check.show();
        }
      }

      // Handle showHide button proficiency indicator, if it exists
      var btn = $('#' + name + '_showhide_btn');

      // Change AV showhide button to red or green to indicate proficiency, if it exists
      if (btn.length > 0) {
        savingMsg = $('#' + name + '_shb_saving_msg');
        errorMsg = $('#' + name + '_shb_error_msg');

        // Hide both saving and error messages
        savingMsg.hide();
        errorMsg.hide();

        if (status === Status.SUBMITTED) {
          // Turn the button yellow
          btn.css("background-color", "#FFFF00");
          savingMsg.show();
        } else if (status === Status.ERROR) {
          // Turn the button yellow
          btn.css("background-color", "#FFFF00");
          errorMsg.show();
        } else if (status === Status.STORED) {
          // Turn the button green
          btn.css("background-color", "lime");
        } else {
          // Turn the button red
          btn.css("background-color", "#FF0000");
        }
      }
    } else {  // name refers to a module
      if (odsaUtils.inDebugMode()) {
        console.debug('Updating module proficiency');
      }

      // Show or hide the 'Module Complete' message on a module page
      var modCompMsgID = '#' + name + '_complete';

      if ($(modCompMsgID).length > 0) {
        if (status === Status.SUBMITTED || status === Status.ERROR) {
          $(modCompMsgID).show();
          $(modCompMsgID).css('color', '#FFFF00'); // TODO: yellow may be too light
        } else if (status === Status.STORED) {
          $(modCompMsgID).show();
          $(modCompMsgID).css('color', 'lime');
        } else {
          $(modCompMsgID).hide();
        }
      }

      // Show or hide the check mark next to a module on the index page
      if ($('li.toctree-l1 > a.reference.internal[href="' + name + '.html"]').length > 0) {
        var listStyleImage = (status === Status.STORED) ? 'url(_static/Images/small_check_mark_green.gif)' : '';

        // Update the style image
        $('li.toctree-l1 > a.reference.internal[href="' + name + '.html"]').parent().css('list-style-image', listStyleImage);
      }
    }

    if (odsaUtils.inDebugMode()) {
      console.debug('returning: ' + status);
      console.groupEnd();
    }

    return status;
  }

  /**
   * Queries the server for the user's proficiency on an exercise or module
   */
  function checkProficiency(name, username, book) {
    name = (name) ? name : moduleName;
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.BOOK_ID;

    if (odsaUtils.inDebugMode()) {
      console.group('checkProficiency(' + name + ', ' + username + ', ' + book + ')');
    }

    // Updates proficiency display based on local proficiency cache
    // Effectively clears the proficiency display if the current user is not listed as proficient
    var status = updateProfDisplay(name);

    // If user's proficiency is already stored in local proficiency cache, don't need to verify with the server
    if (status === Status.STORED) {
      if (odsaUtils.inDebugMode()) {
        console.debug('Cached status: ' + status);
        console.groupEnd();
      }

      return;
    }

    if (odsaUtils.serverEnabled() && odsaUtils.userLoggedIn()) {
      // Request proficiency status from the server
      var jsonData = {},
          url;

      jsonData.key = odsaUtils.getSessionKey();
      jsonData.book = settings.BOOK_ID;

      if (exercises[name]) {
        if (odsaUtils.inDebugMode()) {
          console.debug('Querying server for exercise proficiency for ' + username);
        }

        jsonData.exercise = name;
        url = '/api/v1/userdata/isproficient/';
      } else {
        if (odsaUtils.inDebugMode()) {
          console.debug('Querying server for module proficiency for ' + username);
        }

        jsonData.module = name;
        url = '/api/v1/usermodule/ismoduleproficient/';
      }

      jQuery.ajax({
        url:  settings.SERVER_URL + url,
        type: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (odsaUtils.inDebugMode()) {
            console.group('Server response, checkProficiency(' + name + ', ' + username + ')');
            console.debug(JSON.stringify(data));
          }

          // Proficiency indicators were cleared above, only need to
          // update them again if server responded that the user is proficient
          if (data.proficient) {
            storeStatusAndUpdateDisplays(name, Status.STORED, username);
          }

          if (odsaUtils.inDebugMode()) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);

          if (data.status === 401) {
            handleExpiredSession(jsonData.key);
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
    } else if (name === moduleName) {  // Determine whether the guest account is proficient with the current module
      if (odsaUtils.inDebugMode()) {
        console.debug('Determining (client-side) module proficiency for guest');
      }

      // Can't use this technique from the index page to determine the proficiency of other module pages because there are no exercises on the index page which will cause all modules to be listed as proficient

      // Allow the client to determine module proficiency for guest
      status = Status.STORED;
      var exerStatus;

      // Check whether local proficiency cache lists all exercises required for module proficiency as completed
      for (var exerName in exercises) {
        if (exercises.hasOwnProperty(exerName) && exercises[exerName].required) {
          exerStatus = getProficiencyStatus(exerName, username, settings.BOOK_ID);

          if (!exerStatus) {
            // User is not proficient with a required exercise and therefore cannot be proficient with the module
            if (odsaUtils.inDebugMode()) {
              console.debug(exerName + ': false');
            }

            status = false;
            break;
          } else if (exerStatus !== Status.STORED) {
            status = exerStatus;
          }

          if (odsaUtils.inDebugMode()) {
            console.debug(exerName + ': ' + exerStatus);
          }
        }
      }

      // If status is SUBMITTED or STORED, store the proficiency status for the module
      if (status) {
        storeStatusAndUpdateDisplays(name, status, username);
      } else if (odsaUtils.inDebugMode()) {
        console.debug(name + ': false');
      }
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Cache's the user's proficiency status and updates proficiency displays as necessary
   */
  function storeStatusAndUpdateDisplays(name, status, username) {
    username = (username) ? username : odsaUtils.getUsername();

    if (odsaUtils.inDebugMode()) {
      console.group('storeStatusAndUpdateDisplays(' + name + ' , ' + status + ', ' + username + ')');
    }

    storeProficiencyStatus(name, status, username);
    updateProfDisplay(name);

    // If the status of a required exercise was just set to STORED, check to see if the module is now complete
    if (exercises[name] && exercises[name].required && status === Status.STORED) {
      checkProficiency(moduleName);
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Queries getgrade endpoint to obtain proficiency status for all exercises and modules
   * Used on the index page to concisely determine with which modules the user is proficient
   */
  function syncProficiency() {
    if (odsaUtils.serverEnabled() && odsaUtils.userLoggedIn()) {
      var username = odsaUtils.getUsername(),
          key = odsaUtils.getSessionKey();

      // get user points
      jQuery.ajax({
        url:   settings.SERVER_URL + "/api/v1/userdata/getgrade/",
        type:  "POST",
        data: {"key": key, "book": settings.BOOK_ID},
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (odsaUtils.inDebugMode()) {
            console.group('Server response, syncProficiency()');
            console.debug(JSON.stringify(data));
          }

          if (data.grades && data.modules && data.assignments) {
            // Update local proficiency cache
            var i,
                exer,
                mod;

            // Exercises
            for (i = 0; i < data.grades.length; i++) {
              exer = data.grades[i];

              storeProficiencyStatus(exer.exercise, (exer.points > 0) ? Status.STORED : false, username);
              updateProfDisplay(exer.exercise);
            }

            // Modules
            for (i = 0; i < data.modules.length; i++) {
              mod = data.modules[i];
              storeProficiencyStatus(mod.module, (mod.proficient) ? Status.STORED : false, username);
              updateProfDisplay(mod.module);
            }

            // Assignments: store list of assignments in localStorage
            localStorage.assignments = JSON.stringify(data.assignments);

            // Trigger grade table generation, if called from gradebook.js
            $('body').trigger('gradebook-gen-table');
          } else {
            // Trigger gradebook.js to display error message
            $('body').trigger('gradebook-error');
          }

          if (odsaUtils.inDebugMode()) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);

          if (data.status === 404) {
            // 404 is returned when a new user views the gradebook before completing any exercises
            // because the database cannot find any data relating to that user, generate the default gradebook
            $('body').trigger('gradebook-gen-table');
          } else {
            // Trigger gradebook.js to display error message
            $('body').trigger('gradebook-error');

            if (data.status === 401) {
              handleExpiredSession(key);
            } else {
              console.debug("Error getting user's points");
              console.debug(JSON.stringify(data));
            }
          }
        }
      });
    }
  }

  /**
   * Sends all the data necessary to load a module to the server
   */
  function loadModule(modName) {
    modName = (modName) ? modName : moduleName;

    if (odsaUtils.inDebugMode()) {
      console.group('loadModule(' + modName + ')');
    }

    // Trigger loading the gradebook
    if (modName === "Gradebook") {
      $("body").trigger("gradebook-load");
    }

    var exerName;

    if (odsaUtils.serverEnabled() && odsaUtils.userLoggedIn()) {
      // Sends all the data necessary to load a module to the server
      // All modules must be loaded this way to ensure event data will be logged successfully

      if (modName === 'index') {
        // Query the server for user proficiency data, update local storage and proficiency indicators
        syncProficiency();
      }

      if (odsaUtils.inDebugMode()) {
        console.debug('Querying server for module data');
      }

      var username = odsaUtils.getUsername(),
          modData = {},
          exerData = {},
          exerList = [];

      // Package exercises into a list so it can be stringified
      for (exerName in exercises) {
        if (exercises.hasOwnProperty(exerName)) {
          // Update proficiency displays based on localStorage to make the page
          // more responsive (don't have to wait until the server responds to see your proficiency)
          updateProfDisplay(exerName);

          // Make a deep copy of the 'exercises' object, so we can add the
          // exercise name and remove uiid without affecting 'exercises'
          exerData = $.extend(true, {}, exercises[exerName]);
          exerData.exercise = exerName;
          delete exerData.uiid;
          exerList.push(exerData);
        }
      }

      // Package the module data
      modData.key = odsaUtils.getSessionKey();
      modData.book = settings.BOOK_ID;
      // Calculate the URL of the book, relative to the current module page
      modData.url = location.href.substring(0, location.href.lastIndexOf('/') + 1);
      modData.module = modName;
      modData.completable = settings.DISP_MOD_COMP;
      modData.name = settings.MODULE_LONG_NAME;
      modData.chapter = settings.MODULE_CHAPTER;
      modData.build_date = settings.BUILD_DATE;
      modData.exercises = JSON.stringify(exerList);

      if (odsaUtils.inDebugMode()) {
        console.debug('Sending modData:');
        console.debug(JSON.stringify(modData));
      }

      jQuery.ajax({
        url:  settings.SERVER_URL + "/api/v1/module/loadmodule/",
        type: "POST",
        data: modData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (odsaUtils.inDebugMode()) {
            console.group('Server response, loadModule(' + modName + ', ' + username + ')');
            console.debug(JSON.stringify(data));
          }

          // Loop through all the exercises listed in the server's response and update the user's status for each exercise
          for (var exerName in data) {
            if (data.hasOwnProperty(exerName)) {
              // Update the user's status for the exercise
              // Since the server is the ultimate authority for logged in users,
              // if the user's proficiency comes back as false, it will remove
              // their local proficiency to keep the client in sync with the server
              if (exercises[exerName]) {  // Exercise proficiency
                storeProficiencyStatus(exerName, (data[exerName].proficient) ? Status.STORED : false, username);
                updateProfDisplay(exerName);

                // Store the user's progress for Khan Academy exercises
                if (exercises[exerName].type === 'ka' && data[exerName].progress) {
                  exercises[exerName].progress = data[exerName].progress;

                  // Load any existing data
                  exerData = odsaUtils.getJSON(localStorage.khan_exercise);
                  exerData[exerName] = exercises[exerName].progress;
                  localStorage.khan_exercise = JSON.stringify(exerData);

                  /*
                  // TODO: get the correct function to trigger
                  // Trigger progress bar update on KA exercise page, if its loaded
                  if ($('#' + exerName + '_iframe')) {
                  document.getElementById(exerName + '_iframe').contentWindow.updateProgressBar();
                  }
                  */
                }
              } else {  // Module proficiency
                storeProficiencyStatus(exerName, (data[exerName]) ? Status.STORED : false, username);
                updateProfDisplay(exerName);
              }
            }
          }

          if (odsaUtils.inDebugMode()) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);
          console.group("Error loading module: " + modName);
          console.debug(JSON.stringify(data));
          console.groupEnd();

          if (data.status === 401) {
            handleExpiredSession(modData.key);
          }
        }
      });
    } else if (modName === 'index') {
      // Get every module page link on the index page and determine if the user is proficient
      $('li.toctree-l1 > a.reference.internal').each(function (index, item) {
        if ($(item).attr('href').match('.*\.html')) {
          modName = $(item).attr('href').replace('.html', '');

          if (settings.DISP_MOD_COMP) {
            // Update the proficiency indicators based on what is currently in local storage
            updateProfDisplay(modName);
          }
        }
      });
    } else { // Load guest data from localStorage
      if (odsaUtils.inDebugMode()) {
        console.debug('Load guest data from localStorage');
      }

      // Update exercise proficiency displays to reflect the proficiency of the current user
      for (exerName in exercises) {
        if (exercises.hasOwnProperty(exerName)) {
          updateProfDisplay(exerName);

          // Update Khan Academy exercise progress bar
          /*
          if (exercises[exerName].type === 'ka') {

          }
          */
        }
      }

      // Check for module proficiency
      checkProficiency(moduleName);
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }




  //*****************************************************************************
  //***********                    Scoring System                     ***********
  //*****************************************************************************

  /**
   * Adds the specified score data to the user's list
   *   - data - the score data to store
   */
  function storeScoreData(data) {
    if (odsaUtils.serverEnabled() && (settings.ALLOW_ANON_CREDIT || odsaUtils.userLoggedIn())) {
      data.username = (data.username) ? data.username : odsaUtils.getUsername();
      data.book = (data.book) ? data.book : settings.BOOK_ID;

      var rand = Math.floor(Math.random() * 101),
          key = ['score', data.tstamp, rand].join('-');

      localStorage[key] = JSON.stringify(data);

      if (odsaUtils.inDebugMode()) {
        console.debug('storeScoreData(' + JSON.stringify(data) + ')');
      }
    }
  }

  /**
   * Stores the user's score for an AV / exercise
   */
  function storeExerciseScore(exerName, score, totalTime, steps_fixed, username, book) {
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.BOOK_ID;
    steps_fixed = (steps_fixed) ? steps_fixed : 0;

    if (odsaUtils.inDebugMode()) {
      console.group('storeExerciseScore(' + exerName + ', ' + score + ', ' + totalTime + ', ' + steps_fixed + ', ' + username + ', ' + book + ')');
    }

    // Return if exerName is not a valid exercise
    if (!exercises[exerName]) {
      console.warn('storeExerciseScore(): invalid reference ' + exerName);

      if (odsaUtils.inDebugMode()) {
        console.groupEnd();
      }

      return;
    }

    if (odsaUtils.serverEnabled() && (settings.ALLOW_ANON_CREDIT || odsaUtils.userLoggedIn())) {
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

      if (odsaUtils.inDebugMode()) {
        console.debug('Storing exercise score for ' + username);
        console.debug('data:');
        console.debug(JSON.stringify(data));
      }

      // Save the score data in localStorage
      storeScoreData(data);
    }

    // If the score is above the threshold and the server isn't enabled or it
    // is and no one is logged in, award proficiency to the anonymous user
    if (score >= exercises[exerName].threshold && (!odsaUtils.serverEnabled() || !odsaUtils.userLoggedIn())) {
      if (odsaUtils.inDebugMode()) {
        console.debug('Award anonymous user proficiency');
      }

      storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Sends the score for a single exercise
   *   - key - the key used to store the score object in local storage
   *   - scoreData - the score data to send
   */
  function sendExerciseScore(key, scoreData) {
    if (odsaUtils.inDebugMode()) {
      console.group('sendExerciseScore(' + key + ', scoreData)');
      console.debug(JSON.stringify(scoreData));
    }

    var username = odsaUtils.getUsername(),
        validDate = new Date();
    validDate.setDate(validDate.getDate() - 5);

    // Remove expired guest account data
    if (scoreData.username === 'guest' && scoreData.tstamp < +validDate) {
      localStorage.removeItem(key);

      if (odsaUtils.inDebugMode()) {
        console.debug('Removing expired guest account data');
        console.groupEnd();
      }
      return;
    }

    // Send any score data belonging to the current user or the guest account if anonymous credit is allowed
    if (odsaUtils.serverEnabled() && (username === scoreData.username || (scoreData.username === 'guest' && settings.ALLOW_ANON_CREDIT))) {
      // Set the username to the current user (in case the score belonged to the guest account)
      scoreData.username = username;
      var profStored = false;

      // If user's proficiency is already confirmed by the server, don't confuse them by changing the status
      if (getProficiencyStatus(scoreData.exercise, username, scoreData.book) === Status.STORED) {
        profStored = true;
      } else if (exercises[scoreData.exercise] && scoreData.score >= scoreData.threshold) {
        // If user obtains local proficiency, update exercise status to SUBMITTED
        // Only update if proficient because a status of SUBMITTED will cause proficiency
        // indicators to be displayed and the concept of saving their score doesn't matter
        // to the user unless they actually obtained proficiency
        // If the exercise isn't in exercises, it isn't on the current page and we don't need to update its displays
        storeStatusAndUpdateDisplays(scoreData.exercise, Status.SUBMITTED, username);
      }

      // Append the session key to the score data
      var sessionKey = (sessionKey) ? sessionKey : odsaUtils.getSessionKey();
      scoreData.key = sessionKey;

      jQuery.ajax({
        url:   settings.SERVER_URL + "/api/v1/user/exercise/attemptpe/",
        type:  "POST",
        data: scoreData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (odsaUtils.inDebugMode()) {
            console.group('Server response, sendExerciseScore(' + key + ', ' + scoreData + ')');
            console.debug(JSON.stringify(data));
          }

          // Clear the saved data once it has been successfully transmitted
          if (data.success) {
            // Check whether the user is proficient
            if (data.proficient) {
              // If the status is already STORED, don't need to change it
              if (!profStored) {
                storeStatusAndUpdateDisplays(scoreData.exercise, Status.STORED, username);
              }
            } else {
              // If server successfully replies, but user's proficiency is not verified, revoke their proficiency on the client (to keep everything in sync)
              storeStatusAndUpdateDisplays(scoreData.exercise, false, username);
            }
          } else if (!profStored) {
            // If server replies as unsuccessful, stored status as ERROR
            storeStatusAndUpdateDisplays(scoreData.exercise, Status.ERROR, username);
          }

          // Remove the score object that was sent
          localStorage.removeItem(key);

          if (odsaUtils.inDebugMode()) {
            console.debug('Removed key: ' + key);
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);

          if (odsaUtils.inDebugMode()) {
            console.group('Error: sendExerciseScore(' + key + ', ' + scoreData + ')');
            console.debug(JSON.stringify(data));
          }

          // If user's proficiency is already confirmed by the server, don't confuse them by changing the status
          if (!profStored) {
            // Mark the exercise as having encountered a server error
            storeStatusAndUpdateDisplays(scoreData.exercise, Status.ERROR, username);
          }

          if (data.status === 400) {    // Bad request
            // Remove the score data so we don't get a build up of bad data that never gets cleared
            localStorage.removeItem(key);
            if (odsaUtils.inDebugMode()) {
              console.debug("Score rejected by server: " + scoreData.exercise + " for " + username);
              console.debug('Removed key: ' + key);
            }
          } else {
            if (data.status === 401) {
              handleExpiredSession(sessionKey);
            } else if (data.status === 404) {
              console.warn('Exercise does not exist in the database');
            } else if (odsaUtils.inDebugMode()) {
              console.debug("Error sending exercise score: " + scoreData.exercise + " for " + username);
            }
          }

          if (odsaUtils.inDebugMode()) {
            console.groupEnd();
          }
        }
      });
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Loops through and sends all buffered exercise scores for the given user
   */
  function sendExerciseScores(username) {
    if (odsaUtils.inDebugMode()) {
      console.group('sendExerciseScores(' + username + ')');
    }

    // User must have a valid session in order to send scores
    // This provides integrity by preventing users from submitting
    // scores for someone else and allows us to determine who
    // the scores belong to because the username is derived from the session
    if (odsaUtils.serverEnabled() && odsaUtils.userLoggedIn()) {
      username = (username) ? username : odsaUtils.getUsername();

      // If a user performs an action that submits an AV score,
      // but they are not logged in, warn them they will not
      // receive credit without logging in
      if (username === "guest") {
        warnUserLogin();

        if (odsaUtils.inDebugMode()) {
          console.debug('No user is logged in');
          console.groupEnd();
        }
        return;
      }

      var tstamp = (new Date()).getTime(),
          scoreData;

      // Loop through localStorage looking for any score objects that occurred before tstamp
      for (var key in localStorage) {
        // indexOf is used rather than startsWith because startsWith isn't supported in Chrome
        if (key.indexOf('score-') === 0 && parseInt(key.split('-')[1], 10) < tstamp) {
          scoreData = odsaUtils.getJSON(localStorage[key]);

          // Send the individual score object to the server
          sendExerciseScore(key, scoreData);
        }
      }
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Sends all stored event and AV score data to the server
   */
  function flushStoredData() {
    if (odsaUtils.inDebugMode()) {
      console.group('flushStoredData()');
    }

    if (odsaUtils.serverEnabled()) {
      sendExerciseScores();
      odsaUtils.sendEventData();
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Handle data from events generated on the module page or received from embedded pages
   */
  function processEventData(data) {
    if (odsaUtils.inDebugMode()) {
      console.group('processEventData(data)');
      console.debug(JSON.stringify(data));
    }

    var flush = false,
        discardEvents = ["jsav-init", "jsav-recorded", "jsav-exercise-model-init", "jsav-exercise-model-recorded"],
        ssEvents = ['jsav-forward', 'jsav-backward', 'jsav-begin', 'jsav-end', 'jsav-exercise-model-forward', 'jsav-exercise-model-backward', 'jsav-exercise-model-begin', 'jsav-exercise-model-end'];

    // Filter out events we aren't interested in
    if (discardEvents.indexOf(data.type) > -1) {
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

    // Add the event number to the description so we can track how many events we lose
    data.desc.ev_num = eventCount++;

    var score,
        complete;

    // TODO: Make sure all additional fields of JSAV events are logged somewhere
    if (ssEvents.indexOf(data.type) > -1) {
      data.desc.currentStep = data.currentStep;
      data.desc.currentStep = data.totalSteps;

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
          updateProfDisplay(data.av);
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
      complete = odsaUtils.roundPercent((data.score.correct + data.score.undo + data.score.fix) / data.score.total);
      data.desc.score = score;
      data.desc.complete = complete;

      // Prevent event data from being transmitted on every step
      // This makes better use of the buffering mechanism and overall reduces the network traffic (removed overhead of individual requests), but it takes a while to complete and while its sending the log data isn't saved in local storage, if the user closes the page before the request completes and it fails the data will be lost
      if (complete === 1) {
        // Store the user's score when they complete the exercise
        storeExerciseScore(data.av, score, data.totalTime, data.score.fix);
        updateProfDisplay(data.av);
        flush = true;
      }
    } else if (data.type === "odsa-award-credit") {
      // Store completion credit
      storeExerciseScore(data.av, 1, data.totalTime);
      updateProfDisplay(data.av);
      flush = true;
    }

    if (odsaUtils.serverEnabled()) {
      // Save the event in localStorage
      if (!data.logged) {
        delete data.logged;  // In case it explicitly says 'false'
        odsaUtils.logEvent(data);
      }

      if (flush) {
        flushStoredData();
      }
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }


  //*****************************************************************************
  //*************       LOGIN AND REGISTRATION AND BUGS BOXES       *************
  //*****************************************************************************

  /**
   * Opens the registration window
   */
  function showRegistrationBox() {
    if (odsaUtils.serverEnabled()) {
      odsaUtils.logUserAction('registration-box-open', 'registration box was opened');

      var registrationBox = '#registration-box',
          popMargLeft = ($(registrationBox).width() + 24) / 2;

      // Change the top and left margins to center the box
      $(registrationBox).css({
        'margin-left' : -popMargLeft
      });

      // Clear any existing error messages
      $('#register_error').slideUp().html('');

      // Fade in the Popup
      $(registrationBox).fadeIn(300);

      // Add the mask to body
      $('body').append('<div id="mask"></div>');
      $('#mask').fadeIn(300);

      // Set the focus to the username box
      $('#user').focus();
    }
  }

  /**
   * Opens the login window
   */
  function showLoginBox() {
    if (odsaUtils.serverEnabled()) {
      odsaUtils.logUserAction('login-box-open', 'Login box was opened');

      var loginBox = '#login-box',
          username = localStorage.name,
          popMargLeft = ($(loginBox).width() + 24) / 2;

      // Preload the last saved username in the login form
      if (username) {
        $('#username').attr('value', username);
      }

      // Fade in the Popup
      $(loginBox).fadeIn(300);

      // Change the top and left margins to center the box
      $(loginBox).css({
        'margin-left' : -popMargLeft
      });

      // Add the mask to body
      $('body').append('<div id="mask"></div>');
      $('#mask').fadeIn(300);

      // Set the focus to the username box
      $('#username').focus();
    }
  }

  /**
   * Opens the bug report window
   */
  function showBugBox() {
    if (odsaUtils.serverEnabled()) {
      odsaUtils.logUserAction('bugreport-box-open', 'bug report box was opened');

      var bugreportBox = '#bugreport-box',
          popMargLeft = ($(bugreportBox).width() + 24) / 2;

      // Change the top and left margins to center the box
      $(bugreportBox).css({
        'margin-left' : -popMargLeft
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


  /**
   * Returns true if the login or registration popup box is showing
   */
  function isPopupBoxShowing() {
    return ($('#login-box').is(':visible') || $('#registration-box').is(':visible'));
  }

  /**
   * Closes the login or registration or bur report window
   */
  function hidePopupBox() {
    if ($('#login-box').is(':visible')) {
      odsaUtils.logUserAction('login-box-close', 'Login box was closed');
    } else if ($('#registration-box').is(':visible')) {
      odsaUtils.logUserAction('registration-box-close', 'Registration box was closed');
    } else if ($('#bugreport-box').is(':visible')) {
      odsaUtils.logUserAction('bugreport-box-close', 'Registration box was closed');
    }
   

    $('#mask , .login-popup, .registration-popup, .bugreport-popup').fadeOut(300, function () {
      $('#mask').remove();
    });
    return false;
  }

  /**
   * Warn the user they will not receive credit unless they log in,
   * but only:
   *   - If a login server is enabled
   *   - They are on a module page
   *   - They have not been prompted before
   */
  function warnUserLogin()
  {
    /*
     * Only warn the user:
     *   - If the server is enabled
     *   - If they haven't been warned before or since they last logged out
     */
    if (odsaUtils.serverEnabled() && (!localStorage.warn_login || localStorage.warn_login !== "false")) {
      odsaUtils.logUserAction('login-warn-message', 'User warned they must login to receive credit');
      alert('You must be logged in to receive credit');
      localStorage.warn_login = "false";
    }
  }

  function login(username, password) {
    jQuery.ajax({
      url:   settings.SERVER_URL + "/api/v1/users/login/",
      type:  "POST",
      data: {"username":  username, "password": password  },
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = odsaUtils.getJSON(data);

        if (odsaUtils.inDebugMode()) {
          console.group('User logged in');
        }

        if (data.success) {
          updateLocalStorage(username, data.key);
          localStorage.name = username;
          odsaUtils.logUserAction('user-login', 'User logged in');
          updateLogin();
        }

        if (odsaUtils.inDebugMode()) {
          console.groupEnd();
        }
      },
      error: function (data) {
        data = odsaUtils.getJSON(data);
        console.group("Error logging in");
        console.debug(data);
        console.groupEnd();

        if (data.status === 401) {
          alert("Incorrect username / password combination");
        } else if (data.status === 403) {
          alert("This account has been disabled");
        } else if (data.status === 0) {
          alert("Login failed because the server could not be contacted. If the problem persists, please contact the OpenDSA team.");
          localStorage.warn_login = true;
          hidePopupBox();
        } else {
          alert("Login failed");
          localStorage.warn_login = true;
          hidePopupBox();
        }
      }
    });
  }

  /**
   * Makes sure the display shows the currently logged in user
   * or lack there of
   */
  function updateLogin() {
    if (odsaUtils.inDebugMode()) {
      console.group('updateLogin()');
    }

    if (odsaUtils.serverEnabled()) {
      var username = odsaUtils.getUsername(),
          updated = false;

      if (localStorage.session && $('a.username-link').text() !== username) {
        if (odsaUtils.inDebugMode()) {
          console.debug(username + ' has logged in since the last page refresh, update the page');
        }

        // If a user is logged in, but its not the one that appears logged in on the page, update the page
        updated = true;

        // Update display to show logged in user
        $('#login-link').text('Logout');
        $('a.username-link').text(username);
        $('a.username-link').show();
        $('#registration-link').hide();
      
        // Show bug report link
        $('#bugreport-link').show();

        // In case the user loaded a bunch of pages,
        // then logs in on one of them
        if (isPopupBoxShowing()) {
          hidePopupBox();
        }

        // Flush any stored data
        flushStoredData();
      } else if (!localStorage.session && $('#login-link').text() !== 'Login') {
        if (odsaUtils.inDebugMode()) {
          console.debug($('#login-link').text() + ' has logged out since the last page refresh, update the page');
        }

        // If a user was logged in on the page, but has since logged out, update the page with the anonymous user state
        updated = true;

        // Update display to show that no user is logged in
        $('#login-link').text("Login");
        $('a.username-link').text('');
        $('a.username-link').hide();
        $('#registration-link').show();
        localStorage.removeItem('warn_login');

        // Remove the variable storing the user's progress on KA exercises
        localStorage.removeItem('khan_exercise');
      }

      if (updated) {
        loadModule();
      }
    }

    if (odsaUtils.inDebugMode()) {
      console.groupEnd();
    }
  }

  //*****************************************************************************
  //***********            Runs When Page Finishes Loading            ***********
  //*****************************************************************************
  $(document).ready(function () {
    // Must be initialized here because ODSA.SETTINGS.MODULE_NAME is contained within the HTML of the page
    moduleName = settings.MODULE_NAME;

    if (moduleName === '') {
      console.warn('ERROR: moduleName is not initialized');
    }

    // Dynamically add obfuscated email address to discourage spammers

    // Email obfuscator script 2.1 by Tim Williams, University of Arizona
    // Random encryption key feature by Andrew Moulden, Site Engineering Ltd
    // This code is freeware provided these four comment lines remain intact
    // A wizard to generate this code is at http://www.jottings.com/obfuscator/
    var coded = "czSpsiM@Ei.ZT.Ssv",
        key = "81fRgEkPiQjWvw4aTnyq5IKJCX3xeZ0HMoprdUGA2NbYFSlh7mcz6sDBVuOL9t",
        shift = coded.length,
        link = "";

    for (var i = 0; i < coded.length; i++) {
      if (key.indexOf(coded.charAt(i)) === -1) {
        link += coded.charAt(i);
      } else {
        link += key.charAt((key.indexOf(coded.charAt(i)) - shift + key.length) % key.length);
      }
    }
    $('#contact_us').attr('href', "mailto:'" + link + "'");

    // Populate the exercises hash
    // Iterate through all showHide buttons, iframe and slideshows and add exercises (as necessary)
    $('.embedContainer, .ssAV').each(function (index, item) {
      var exerName = $(item).data('exer-name'),
          exerData = {};

      // Return if exerName is already in exercises to avoid duplicates
      if (exercises[exerName]) {
        return;
      }

      // Add the book ID as a URL parameter to embedded pages
      if ($(item).data('frame-src')) {
        $(item).data('frame-src', $(item).data('frame-src') + '&book=' + settings.BOOK_ID);
      }

      exerData.name = $(item).data('long-name');
      exerData.points = $(item).data('points');
      exerData.required = ($(item).data('required') === "True");
      exerData.threshold = $(item).data('threshold');
      exerData.type = $(item).data('type');
      exerData.uiid = +new Date();

      // Save the exercise data
      exercises[exerName] = exerData;
    });

    $('.showHideLink').each(function (index, item) {
      var exerName = $(item).attr('id').replace('_showhide_btn', '');

      // Append error and saving messages to showHide buttons
      $(item).after("<span id='" + exerName + "_shb_error_msg' class='shb_msg'><img src='_static/Images/warning.png' class='shb_warning_icon' /> Server Error <a class='resubmit_link' href='#'>Resubmit</a></span>");
      $(item).after("<span id='" + exerName + "_shb_saving_msg' class='shb_msg'>Saving...</span>");
    });

    if (settings.DISP_MOD_COMP) {
      // Append the module complete code to the header
      $('h1 > a.headerlink').parent().css('position', 'relative');
      $('h1 > a.headerlink').parent().append('<div id="' + moduleName + '_complete" class="mod_complete">Module Complete</div>');
    }

    // Listen for and process JSAV events
    $("body").on("jsav-log-event", function (e, data) {
      processEventData(data);
    });

    // Listen for and process JSAV events
    $("body").on("odsa-session-expired", function (e, data) {
      handleExpiredSession(data.key);
    });

    // Create event handler to listen for JSAV events from embedded exercises
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
        eventer = window[eventMethod],
        messageEvent = (eventMethod === "attachEvent") ? "onmessage" : "message";

    // Listen to message from embedded exercise
    eventer(messageEvent, function (e) {
      // Only accept post messages from the location where exercises or AVs are hosted
      if (e.origin !== settings.EXERCISE_ORIGIN && e.origin !== settings.AV_ORIGIN) {
        return;
      }
      var data = odsaUtils.getJSON(e.data);

      if (data.exercise && data.proficient) {
        // Store status of Khan Academy exercise
        storeStatusAndUpdateDisplays(data.exercise, Status.STORED, odsaUtils.getUsername());
      } else {
        // Reset the uiid stored by the module page to match the one generated on the embedded page
        exercises[data.av].uiid = data.uiid;
        processEventData(data);
      }
    }, false);

    if (odsaUtils.serverEnabled()) {
      // Log the browser ready event
      odsaUtils.logUserAction('document-ready', 'User loaded the ' + moduleName + ' module page');

      // Suggest the user login if they don't have a valid session,
      // update the login link with their name if they do
      if (isSessionExpired()) {
        // Flush any old data before forcing a user to logout
        flushStoredData();
        localStorage.removeItem('session');
        if (!localStorage.warn_login) {
          showLoginBox();
        }
        loadModule();
      } else {
        updateLogin();
      }

      // Attach event handlers
      $(window).focus(function (e) {
        // When the user switches tabs, make sure the login display on the new tab is correct
        updateLogin();

        odsaUtils.logUserAction('window-focus', 'User looking at ' + moduleName + ' window');
      });

      $(window).blur(function (e) {
        // When the user leaves an OpenDSA window, log it
        odsaUtils.logUserAction('window-blur', 'User is no longer looking at ' + moduleName + ' window');
      });

      $(window).on('beforeunload', function () {
        // Log the browser unload event
        odsaUtils.logUserAction('window-unload', 'User closed or refreshed ' + moduleName + ' window');
      });

      // Attach a click handler to all resubmit links that flushes stored data,
      // return false to prevent the focus from jumping to the top of the page
      $('.resubmit_link').click(function (e) {
        flushStoredData();
        return false;
      });

      // Attaches a click handler to the "Sign-in" button that logs a user in
      $('#login-submit-button').click(function (event) {
        var username = $('#username').val(),
            password = $('#password').val();

        if (username === "" || password === "") {
          alert("Please enter your username and password");
          return false;
        }

        login(username, password);
        return false;
      });

      // Brings up the login box if the user clicks 'Login' and
      // logs the user out if they click their username
      $('#login-link').click(function () {
        if ($('#login-link').text() === 'Login') {
          showLoginBox();
          return false;
        } else {
          // Submit whatever data we have collected before the user logs out
          flushStoredData();

          // Inform the server the user is logging out
          jQuery.ajax({
            url:   settings.SERVER_URL + "/api/v1/users/logout/",
            type:  "GET",
            data: {key: odsaUtils.getSessionKey()},
            contentType: "application/json; charset=utf-8",
            datatype: "json",
            xhrFields: {withCredentials: true},
            success: function (data) {
              data = odsaUtils.getJSON(data);
            },
            error: function (data) {
              data = odsaUtils.getJSON(data);

              console.group("Error logging out");
              console.debug(data);
              console.groupEnd();
            }
          });

          // Log out the user locally
          odsaUtils.logUserAction('user-logout', 'User logged out');
          localStorage.removeItem('session');
          //updateLogin();

          // Force the page to reload to reset all exercises
          window.location.reload();
          // Hide bug report link
          $('#bugreport-link').hide(); 
        }
      });

      //Brings the registration form from the login popup page
      $('#register-button').click(function () {
        $('.login-popup').fadeOut(300);
        showRegistrationBox();
        return false;
      });

      //User forgot his username. We open backend reset password page in a new window.
      $('#forgot').click(function () {
        window.open(settings.SERVER_URL + "/accounts/password/reset/");
      });

      // Brings up the embedded registration  box if the user clicks 'Register' and
      // should close the registration window upon success.
      $('#registration-link').click(function () {
        showRegistrationBox();
        return false;
      });

      // Brings up the embedded bug report  box if the user clicks 'Bug Report/Feedback' and
      // should close the bug report window upon success.
      $('#bugreport-link').click(function () {
        showBugBox();
        return false;
      });

      // Attaches a click handler to the registration submit button
      // Validation user input and if valid sends a message to the server to create a new user
      // If a new user is successfully created, automatically logs the user in
      $('#register-submit-button').click(function () {
        var user = $('#user').val();
        var pass = $('#pass').val();
        var rpass = $('#rpass').val();
        var email = $('#email').val();

        if (user === "") {
          $('#register_error').slideDown().html("Please enter a username");
          return false;
        }

        if (pass === "") {
          $('#register_error').slideDown().html('Please enter a password');
          return false;
        }

        if (rpass === "") {
          $('#register_error').slideDown().html('Please confirm your password');
          return false;
        }

        if (pass !== rpass) {
          $('#register_error').slideDown().html('Passwords do not match');
          return false;
        }

        // TODO: Better support these email rules: http://rumkin.com/software/email/rules.php
        // Quoted local parts are not currently supported
        // Filter based on http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        // This filter allows the domain to be an IP address (not sure if this is desirable or not)
        var filter = /^([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!filter.test(email)) {
          $('#register_error').slideDown().html('Please enter a valid email');
          return false;
        }

        jQuery.ajax({
          url:   settings.SERVER_URL + "/api/v1/newuser/",
          type:  "POST",
          data: JSON.stringify({"username":  user, "password": pass, "email": email }),
          processData: false,
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {withCredentials: true},
          success: function (data) {
            // If new user account successfully created, log the user in
            login(user, pass);
            hidePopupBox();
          },
          error: function (data) {
            data = odsaUtils.getJSON(data);

            if (data.status === 400) {
              $('#register_error').slideDown().html('Username already exists');
            }
          }
        });
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
        formData.append("key", odsaUtils.getSessionKey());
        formData.append("title", title);
        formData.append("os", os);
        formData.append("browser", browser);
        formData.append("description", desc + '\n\nBook: ' + location.href);
        formData.append("img", $('#b_screenshot')[0].files[0]);
        jQuery.ajax({
          url:   settings.SERVER_URL + "/api/v1/bugs/submitbug/",
          type:  "POST",
          data: formData,
          processData: false,
          contentType: false, 
          //datatype: "json",
          xhrFields: {withCredentials: true},
          success: function (data) {
            // If the bug is recorded successfully n
            alert("Your bug/feedback has been successfully submitted.\n Thank You");
            hidePopupBox();
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





      // When clicking on the button close or the mask layer the popup closed
      $('a.close, #mask').live('click', function () {
        // If the user tries to close the login box without logging
        // in, warn them they will not receive credit without logging in
        warnUserLogin();
        hidePopupBox();
      });
    } else {  // Backend server is NOT enabled
      // Hide page elements that don't make sense when there is no backend server
      $('#login-link').hide();  // Login link
      $('#registration-link').hide();  // Registration link

      // Update proficiency indicators based on local proficiency cache
      loadModule();
    }

    // Attach handler to show / hide buttons
    $("input.showHideLink").click(function (event) {
      var btnID = event.target.id;
      showHide(btnID);
    });

    $("a.abt").click(function (event) {
      info();
    });
  });

  $(window).load(function () {
    console.debug('Load time: ' + (+new Date() - readyTime));
  });

  //*****************************************************************************
  //***********            Creates global ODSA.MOD object           ***********
  //*****************************************************************************

  // Add publically available functions to a globally accessible ODSA.MOD object
  var odsaMod = {};
  odsaMod.STATUS = Status;
  odsaMod.getProficiencyStatus = getProficiencyStatus;
  odsaMod.syncProficiency = syncProficiency;
  window.ODSA.MOD = odsaMod;
}(jQuery));
