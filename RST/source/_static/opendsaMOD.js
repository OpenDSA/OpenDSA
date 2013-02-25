"use strict";
/*global alert: true, console: true, ODSA, warnUserLogin, storeStatusAndUpdateDisplays */

/* warnUserLogin and storeStatusAndUpdateDisplays are defined in this file, but due to cyclic dependencies */

(function ($) {
  var settings = ODSA.SETTINGS,
      odsaUtils = ODSA.UTILS;

  /**
   * Flag indicating whether or not the "Module Complete" message should be displayed
   */
  settings.dispModComp = false;

  // Local variable to make it easier to access settings.MODULE_NAME
  var moduleName = settings.MODULE_NAME;

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


  /**
   * Adds an 'endsWith' function to strings
   */
  String.prototype.endsWith = function (suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
  };

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
    session.expires = expireDate;
    localStorage.session = JSON.stringify(session);
  }

  function isSessionExpired() {
    if (localStorage.session) {
      var session = JSON.parse(localStorage.session),
          sessionDate = session.expires,
          currentDate = new Date();
      return sessionDate <= currentDate;
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
        divID = btnID.replace('_showhide_btn', ''),
        div = $('#' + divID);

    if (div.length > 0) {    // AV is loaded, show or hide it
      if (div.is(':visible')) {    // AV is visible, hide it
        div.hide();

        // Update the button text
        button.val(button.val().replace('Hide', 'Show'));
        return;
      } else {    // AV is hidden, show it
        div.show();
      }
    } else {    // AV isn't loaded, load it
      var src = button.data("frame-src"),
          width = button.data("frame-width"),
          height = button.data("frame-height");

      // Append the iFrame after the button
      button.after('<div id="' + divID + '"><p></p><center><iframe id="' + divID + '_iframe" data-av="' + divID + '" src="' + src + '" type="text/javascript" width="' + width + '" height="' + height + '" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n</iframe></center></div>');
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
    // Check for proficiency status in localStorage
    if (localStorage.proficiency_data) {
      username = (username) ? username : odsaUtils.getUsername();
      book = (book) ? book : settings.bookName;

      var profData = odsaUtils.getJSON(localStorage.proficiency_data);

      // Check whether user has proficiency data and if the specified exercise is listed
      if (profData[username] && profData[username][book] && profData[username][book][name]) {
        return profData[username][book][name];
      }
    }

    return false;
  }

  /**
   * Stores the user's proficiency status with the specified exercise in localStorage
   */
  function storeProficiencyStatus(name, status, username, book) {
    if (settings.debugMode) {
      console.group('storeProficiencyStatus(' + name + ', ' + status + ', ' + username + ', ' + book + ')');
    }

    // Don't store proficiency for modules that can't be completed
    if (name === moduleName && !settings.dispModComp) {
      if (settings.debugMode) {
        console.debug(name + ' cannot be completed');
        console.groupEnd();
      }
      return;
    }

    status = (typeof status !== "undefined") ? status : Status.STORED;  // false is a valid status
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.bookName;

    var profData = odsaUtils.getJSON(localStorage.proficiency_data);

    if (settings.debugMode) {
      console.debug('storeProficiencyStatus(' + name + ', ' + status + ', ' + username + ', ' + book + ')');
      console.debug('profData (unmodified):');
      console.debug(JSON.stringify(profData));
    }

    // Check whether user has an entry
    if (!profData[username]) {
      if (settings.debugMode) {
        console.debug('Creating new proficiency_data entry for ' + username);
      }
      // Add a new entry for the user
      profData[username] = {};
    }

    // Check whether user has an entry for the given book
    if (!profData[username][book]) {
      if (settings.debugMode) {
        console.debug('Creating new book entry for ' + username);
      }
      // Add a new entry for the user
      profData[username][book] = {};
    }

    if (status) {
      // User is proficient, store their status in local proficiency cache
      profData[username][book][name] = status;
    } else {
      // User is not proficient, remove any related data from the local proficiency cache
      delete profData[username][book][name];
    }

    localStorage.proficiency_data = JSON.stringify(profData);

    if (settings.debugMode) {
      console.debug('profData (modified):');
      console.debug(JSON.stringify(profData));
      console.groupEnd();
    }
  }

  /**
   * Update the proficiency indicator(s) for the specified exercise or module based on the local proficiency cache
   *  - If 'name' is not provided, will default to moduleName
   */
  function updateProfDisplay(name) {
    name = (name) ? name : moduleName;

    if (settings.debugMode) {
      console.group('updateProfDisplay(' + name + ')');
    }

    var username = odsaUtils.getUsername(),
        status = getProficiencyStatus(name, username, settings.bookName);

    if (exercises[name]) {  // name refers to an exercise
      if (settings.debugMode) {
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
      if (settings.debugMode) {
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

    if (settings.debugMode) {
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
    book = (book) ? book : settings.bookName;

    if (settings.debugMode) {
      console.group('checkProficiency(' + name + ', ' + username + ', ' + book + ')');
    }

    // Clear the proficiency display if the current user is not listed as proficient
    var status = updateProfDisplay(name);

    // If user's proficiency is already stored in local proficiency cache, don't need to verify with the server
    if (status === Status.STORED) {
      if (settings.debugMode) {
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
      jsonData.book = book;

      if (exercises[name]) {
        if (settings.debugMode) {
          console.debug('Querying server for exercise proficiency for ' + username);
        }

        jsonData.exercise = name;
        url = '/api/v1/userdata/isproficient/';
      } else {
        if (settings.debugMode) {
          console.debug('Querying server for module proficiency for ' + username);
        }

        jsonData.module = name;
        url = '/api/v1/usermodule/ismoduleproficient/';
      }

      jQuery.ajax({
        url:  settings.serverURL + url,
        type: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (settings.debugMode) {
            console.group('Server response, checkProficiency(' + name + ', ' + username + ')');
            console.debug(JSON.stringify(data));
          }

          // Proficiency indicators were cleared above, only need to
          // update them again if server responded that the user is proficient
          if (data.proficient) {
            storeStatusAndUpdateDisplays(name, Status.STORED, username);
          }

          if (settings.debugMode) {
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
      if (settings.debugMode) {
        console.debug('Determining (client-side) module proficiency for guest');
      }

      // Can't use this technique from the index page to determine the proficiency of other module pages because there are no exercises on the index page which will cause all modules to be listed as proficient

      // Allow the client to determine module proficiency for guest
      status = Status.STORED;
      var exerStatus;

      // Check whether local proficiency cache lists all exercises required for module proficiency as completed
      for (var exerName in exercises) {
        if (exercises.hasOwnProperty(exerName) && exercises[exerName].required) {
          exerStatus = getProficiencyStatus(exerName, username, settings.bookName);

          if (!exerStatus) {
            // User is not proficient with a required exercise and therefore cannot be proficient with the module
            if (settings.debugMode) {
              console.debug(exerName + ': false');
            }

            status = false;
            break;
          } else if (exerStatus !== Status.STORED) {
            status = exerStatus;
          }

          if (settings.debugMode) {
            console.debug(exerName + ': ' + exerStatus);
          }
        }
      }

      // If status is SUBMITTED or STORED, store the proficiency status for the module
      if (status) {
        storeStatusAndUpdateDisplays(name, status, username);
      } else if (settings.debugMode) {
        console.debug(name + ': false');
      }
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  /**
   * Cache's the user's proficiency status and updates proficiency displays as necessary
   */
  function storeStatusAndUpdateDisplays(name, status, username) {
    username = (username) ? username : odsaUtils.getUsername();

    if (settings.debugMode) {
      console.group('storeStatusAndUpdateDisplays(' + name + ' , ' + status + ', ' + username + ')');
    }

    storeProficiencyStatus(name, status, username);
    updateProfDisplay(name);

    // If a user is not logged in, check module proficiency if the status is anything other than 'false'
    // (module proficiency as determined locally has multiple states, unlike when the user is logged in)
    // If the user is logged in, only check module proficiency is the status is STORED (reduce network traffic)
    if (exercises[name] && ((!odsaUtils.userLoggedIn() && status) || (odsaUtils.userLoggedIn() && status === Status.STORED))) {
      checkProficiency(moduleName);
    }

    if (settings.debugMode) {
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
        url:   settings.serverURL + "/api/v1/userdata/getgrade/",
        type:  "POST",
        data: {"key": key, "book": settings.bookName},
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (settings.debugMode) {
            console.group('Server response, syncProficiency()');
            console.debug(JSON.stringify(data));
          }

          if (data.grades && data.modules) {
            // Update local proficiency cache
            var i,
                exer,
                mod,
                profData;

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

            if (settings.debugMode) {
              console.debug('profData:');
              console.debug(JSON.stringify(profData));
            }
          }

          if (settings.debugMode) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);

          if (data.status === 401) {
            handleExpiredSession(key);
          } else {
            console.debug("Error getting user's points");
            console.debug(JSON.stringify(data));
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

    if (settings.debugMode) {
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

      if (settings.debugMode) {
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
      modData.book = settings.bookName;
      // Calculate the URL of the book, relative to the current module page
      modData.url = location.href.substring(0, location.href.lastIndexOf('/') + 1);
      modData.module = modName;
      modData.completable = settings.dispModComp;
      // Hack to parse the long form module name from the module page title
      // TODO: Create a more reliable way to get this information
      if (modName === 'index') {
        modData.name = 'Contents';
      } else {
        modData.name = document.title.slice(document.title.indexOf(' ') + 1, document.title.indexOf('\u2014') - 1);
      }
      modData.exercises = JSON.stringify(exerList);

      if (settings.debugMode) {
        console.debug('Sending modData:');
        console.debug(JSON.stringify(modData));
      }

      jQuery.ajax({
        url:  settings.serverURL + "/api/v1/module/loadmodule/",
        type: "POST",
        data: modData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (settings.debugMode) {
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

          if (settings.debugMode) {
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
        if ($(item).attr('href').endsWith('.html')) {
          modName = odsaUtils.getNameFromURL($(item).attr('href'));

          if (settings.dispModComp) {
            // Update the proficiency indicators based on what is currently in local storage
            updateProfDisplay(modName);
          }
        }
      });
    } else { // Load guest data from localStorage
      if (settings.debugMode) {
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

    if (settings.debugMode) {
      console.groupEnd();
    }
  }




  //*****************************************************************************
  //***********                    Scoring System                     ***********
  //*****************************************************************************

  /**
   * Adds the specified score data to the user's list
   *   - newScoreData - the score data to store
   *   - username (optional) - the user to whom the score belongs
   *   - book (optional) - the book, the exercise is associated with
   */
  function storeScoreData(newScoreData, username, book) {
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.bookName;

    if (odsaUtils.serverEnabled() && (settings.allowAnonCredit || odsaUtils.userLoggedIn())) {
      if (settings.debugMode) {
        console.group('storeScoreData(' + JSON.stringify(newScoreData) + ', ' + username + ', ' + book + ')');
      }

      if (odsaUtils.serverEnabled()) {
        // Load stored score_data if it exists
        var scoreData = odsaUtils.getJSON(localStorage.score_data);

        if (settings.debugMode) {
          console.debug('Storing exercise score for ' + username);
          console.debug('scoreData (unmodified):');
          console.debug(JSON.stringify(scoreData));
        }

        // If user does not have an entry in score data, create one
        if (!scoreData[username]) {
          if (settings.debugMode) {
            console.debug('Creating a new score_data entry for ' + username);
          }

          scoreData[username] = {};
        }
        
        // If user does not have an entry for the given book, create one
        if (!scoreData[username][book]) {
          if (settings.debugMode) {
            console.debug('Creating a new book entry for ' + username);
          }

          scoreData[username][book] = [];
        }

        scoreData[username][book].push(newScoreData);
        localStorage.score_data = JSON.stringify(scoreData);

        if (settings.debugMode) {
          console.debug('scoreData (modified):');
          console.debug(JSON.stringify(scoreData));
        }
      }

      if (settings.debugMode) {
        console.groupEnd();
      }
    }
  }

  /**
   * Assigns the anonymous score data to the given user
   */
  function assignAnonScoreData(username, book) {
    if (settings.allowAnonCredit) {
      username = (username) ? username : odsaUtils.getUsername();
      book = (book) ? book : settings.bookName;

      // Return is specified user is the anonymous user
      if (username === "guest") {
        return;
      }
      
      // Load score data
      var scoreData = odsaUtils.getJSON(localStorage.score_data);
      
      if (!scoreData.guest || !scoreData.guest[book]) {
        return;
      }

      if (settings.debugMode) {
        console.group('assignAnonScoreData(' + username + ', ' + book + ')');
        console.debug('scoreData (unmodified):');
        console.debug(JSON.stringify(scoreData));
      }
      
      // Create a deep copy of anonymous user's data so that the original can be
      // cleared and saved immediately to prevent accidentally overwriting data
      var anonData = $.extend(true, [], scoreData.guest[book]);

      // Clear list of guest's score objects for given book
      delete scoreData.guest[book];
      localStorage.score_data = JSON.stringify(scoreData);

      var validDate = new Date();
      validDate.setDate(validDate.getDate() - 5);
      
      if (settings.debugMode) {
        console.debug('anonData:');
        console.debug(JSON.stringify(anonData));
      }

      // Associate each score object with the given user, if the
      // exercise was completed within the last 5 days
      for (var i = 0; i < anonData.length; i++) {
        if (settings.debugMode) {
          console.debug(anonData[i].tstamp + ' > ' + (+validDate));
        }
        
        if (anonData[i].tstamp > +validDate) {
          storeScoreData(anonData[i], username, book);
        }
      }

      if (settings.debugMode) {
        console.debug('scoreData (modified):');
        console.debug(localStorage.score_data);
        console.groupEnd();
      }
    }
  }

  /**
   * Stores the user's score for an AV / exercise
   */
  function storeExerciseScore(exerName, score, totalTime, username, book) {
    // TODO: Fix the localStorage concurrency problem
    username = (username) ? username : odsaUtils.getUsername();
    book = (book) ? book : settings.bookName;

    if (settings.debugMode) {
      console.group('storeExerciseScore(' + exerName + ', ' + score + ', ' + totalTime + ', ' + username + ', ' + book + ')');
    }

    // Return if exerName is not a valid exercise
    if (!exercises[exerName]) {
      console.warn('storeExerciseScore(' + exerName + ', ' + score + ', ' + totalTime + ', ' + username + ', ' + book + '): invalid reference ' + exerName);

      if (settings.debugMode) {
        console.groupEnd();
      }

      return;
    }

    if (odsaUtils.serverEnabled() && (settings.allowAnonCredit || odsaUtils.userLoggedIn())) {
      var data = {};
      data.exercise = exerName;
      data.module = moduleName;
      data.tstamp = (new Date()).getTime();
      data.score = score;
      data.total_time = totalTime;
      data.uiid = exercises[exerName].uiid;

      if (settings.debugMode) {
        console.debug('Storing exercise score for ' + username);
        console.debug('data:');
        console.debug(JSON.stringify(data));
      }

      // Save the score data in localStorage
      storeScoreData(data, username, book);
    }

    // If the score is above the threshold and the server isn't enabled or it
    // is and no one is logged in, award proficiency to the anonymous user
    if (score >= exercises[exerName].threshold && (!odsaUtils.serverEnabled() || !odsaUtils.userLoggedIn())) {
      if (settings.debugMode) {
        console.debug('Award anonymous user proficiency');
      }

      storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  /**
   * Sends the score for a single exercise
   */
  function sendExerciseScore(exerData, username, sessionKey, book) {
    if (settings.debugMode) {
      console.group('sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ')');
      console.debug(JSON.stringify(exerData));
    }

    if (odsaUtils.serverEnabled()) {
      // Issue a warning if called without exercise data
      if (!exerData) {
        console.warn('Invalid exercise data: ' + JSON.stringify(exerData));
        if (settings.debugMode) {
          console.groupEnd();
        }
        return;
      }

      sessionKey = (sessionKey) ? sessionKey : odsaUtils.getSessionKey();
      username = (username) ? username : odsaUtils.getUsername();
      book = (book) ? book : settings.bookName;

      if (settings.debugMode) {
        console.debug('sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ', ' + book + ')');
      }

      if (username === "guest") {
        // If a user performs an action that submits an AV score,
        // but they are not logged in, warn them they will not
        // receive credit without logging in
        warnUserLogin();

        if (settings.debugMode) {
          console.debug('No user is logged in');
          console.groupEnd();
        }
        return;
      }

      // Determine if the user is already proficient
      var profStored = false;

      // If user's proficiency is already confirmed by the server, don't confuse them by changing the status
      if (getProficiencyStatus(exerData.exercise, username, book) === Status.STORED) {
        profStored = true;
      } else {
        // Update exercise status to SUBMITTED
        storeStatusAndUpdateDisplays(exerData.exercise, Status.SUBMITTED, username);
      }

      // Append the session key to the exercise data
      exerData.key = sessionKey;
      exerData.book = book;

      if (settings.debugMode) {
        console.debug('Sending exerData:');
        console.debug(JSON.stringify(exerData));
      }

      // Submit the user's score
      jQuery.ajax({
        url:   settings.serverURL + "/api/v1/user/exercise/attemptpe/",
        type:  "POST",
        data: exerData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = odsaUtils.getJSON(data);

          if (settings.debugMode) {
            console.group('Server response, sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ')');
            console.debug(JSON.stringify(data));
          }

          // Clear the saved data once it has been successfully transmitted
          if (data.success) {
            // Check whether the user is proficient
            if (data.proficient) {
              // If the status is already STORED, don't need to change it
              if (!profStored) {
                storeStatusAndUpdateDisplays(exerData.exercise, Status.STORED, username);
              }
            } else {
              // If server successfully replies, but user's proficiency is not verified, revoke their proficiency on the client (to keep everything in sync)
              storeStatusAndUpdateDisplays(exerData.exercise, false, username);
            }
          } else if (!profStored) {  // TODO: In some cases, we want to put the score data back into the buffer such as if a user logged in on another computer and their other session went inactive
            // If server replies as unsuccessful, stored status as ERROR
            storeStatusAndUpdateDisplays(exerData.exercise, Status.ERROR, username);
          }

          if (settings.debugMode) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = odsaUtils.getJSON(data);

          if (settings.debugMode) {
            console.group('Error: sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ', ' + book + ')');
            console.debug(JSON.stringify(data));
          }

          // If user's proficiency is already confirmed by the server, don't confuse them by changing the status
          if (!profStored) {
            // Mark the exercise as having encountered a server error
            storeStatusAndUpdateDisplays(exerData.exercise, Status.ERROR, username);
          }

          if (data.status === 400) {    // Bad request
            console.debug("Score rejected by server: " + exerData.exercise + " for " + username);
            console.debug(JSON.stringify(data));
          } else {
            // Failed to send the score data which has already been
            // removed from the buffer, so save it back to the buffer
            var key = exerData.key;
            delete exerData.key;
            delete exerData.book;
            storeScoreData(exerData, username, book);

            if (data.status === 401) {
              handleExpiredSession(key);
            } else if (data.status === 404) {
              console.warn('Exercise does not exist in the database');
            } else {
              console.debug("Error sending exercise score: " + exerData.exercise + " for " + username);
              console.debug(JSON.stringify(data));
            }
          }

          if (settings.debugMode) {
            console.groupEnd();
          }
        }
      });
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  /**
   * Loops through and sends all buffered exercise scores for the given user
   */
  function sendExerciseScores(username, sessionKey, book) {
    if (settings.debugMode) {
      console.group('sendExerciseScores(' + username + ', ' + sessionKey + ')');
    }

    // User must have a valid session in order to send scores
    // This provides integrity by preventing users submitting
    // scores for someone else and allows us to determine who
    // the scores belong to because the username is derived from the session
    if (odsaUtils.serverEnabled() && odsaUtils.userLoggedIn() && localStorage.score_data) {
      username = (username) ? username : odsaUtils.getUsername();
      sessionKey = (sessionKey) ? sessionKey : odsaUtils.getSessionKey();
      book = (book) ? book : settings.bookName;

      // Load buffered score data
      var scoreData = odsaUtils.getJSON(localStorage.score_data);
      
      if (scoreData[username] && scoreData[username][book]) {
        // Create a deep copy of user's score data (for the given book) so the
        // original can be cleared and saved to prevent accidentally overwriting data
        var userData = $.extend(true, [], scoreData[username][book]);

        if (settings.debugMode) {
          console.debug('sendExerciseScores(' + username + ', ' + sessionKey + ', ' + book + ')');
          console.debug('scoreData:');
          console.debug(JSON.stringify(scoreData));
          console.debug('userData:');
          console.debug(JSON.stringify(userData));
        }

        delete scoreData[username][book];
        localStorage.score_data = JSON.stringify(scoreData);

        // Send score data for the specified user
        for (var i = 0; i < userData.length; i++) {
          sendExerciseScore(userData[i], username, sessionKey, book);
        }
      }
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  /**
   * Sends all stored event and AV score data to the server
   */
  function flushStoredData() {
    if (settings.debugMode) {
      console.group('flushStoredData()');
    }

    if (odsaUtils.serverEnabled()) {
      sendExerciseScores();
      odsaUtils.sendEventData();
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  /**
   * Handle data from events generated on the module page or received from embedded pages
   */
  function processEventData(data) {
    if (settings.debugMode) {
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
      data.desc = data.type;
    }

    var score,
        complete;

    // TODO: Make sure all additional fields of JSAV events are logged somewhere
    if (ssEvents.indexOf(data.type) > -1) {
      data.desc = data.currentStep + " / " + data.totalSteps;

      // Initializes the start time for a slideshow, the first time a user clicks on it
      if (!exercises[data.av].startTime) {
        exercises[data.av].startTime = +new Date();
      }

      // User reached the end of a slideshow, award them credit
      if (data.type === "jsav-forward" && data.currentStep === data.totalSteps) {
        if (!data.totalTime) {
          data.totalTime = +new Date() - exercises[data.av].startTime;

          // TODO: Do we really want to delete this?
          // Remove the start time because the user just finished
          delete exercises[data.av].startTime;
        }

        storeExerciseScore(data.av, 1, data.totalTime);
        updateProfDisplay(data.av);
        flush = true;
      }
    } else if (data.type === "jsav-array-click") {
      data.desc = JSON.stringify({'index': data.index, 'arrayid': data.arrayid});
    } else if (data.type === "jsav-exercise-grade-change") {
      // On grade change events, log the user's score and submit it
      score = odsaUtils.roundPercent((data.score.student - data.score.fix) / data.score.total);
      complete = odsaUtils.roundPercent(data.score.student / data.score.total);
      data.desc = JSON.stringify({'score': score, 'complete': complete});

      // Store the user's score when they complete the exercise
      if (complete === 1) {
        storeExerciseScore(data.av, score, data.totalTime);
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

    if (settings.debugMode) {
      console.groupEnd();
    }
  }


  //*****************************************************************************
  //*************           LOGIN AND REGISTRATION BOXES            *************
  //*****************************************************************************

  /**
   * Opens the registration window
   */
  function showRegistrationBox() {
    if (odsaUtils.serverEnabled()) {
      odsaUtils.logUserAction('registration-box-open', 'registration box was opened');

      var server_regist_url = "_static/registration.html", //serverURL + "/accounts/register/",
          registrationBox = '#registration-box',
          regBoxWidth = $(registrationBox).width(),
          left = ($(window).width() / 2) - (regBoxWidth / 2),
          registration_page = '<center><iframe id="registration_iframe" src="' + server_regist_url + '" type="text/javascript" width="' + regBoxWidth + '" height="510" frameborder="0" marginwidth="0" marginheight="0" scrolling="no"></iframe></center>';

      //Fade in the Popup
      $(registrationBox).fadeIn(300);

      // Position the box
      $(registrationBox).css({
        'top' : $('div.header').height(),
        'left' : left,
        'margin-top' : 0
      });

      //Embed backend registration page
      if ($('#registration_iframe').length === 0) {
        $('.registration-popup').append(registration_page);
      } else {
        $('#registration_iframe').remove();
        $('.registration-popup').append(registration_page);
      }

      // Add the mask to body
      $('body').append('<div id="mask"></div>');
      $('#mask').fadeIn(300);
    }
  }
  
  /**
   * Opens the login window
   */
  function showLoginBox() {
    odsaUtils.logUserAction('login-box-open', 'Login box was opened');

    var loginBox = '#login-box',
        username = localStorage.name,
        popMargTop = ($(loginBox).height() + 24) / 2,
        popMargLeft = ($(loginBox).width() + 24) / 2;

    // Preload the last saved username in the login form
    if (username) {
      $('#username').attr('value', username);
    }

    //Fade in the Popup
    $(loginBox).fadeIn(300);

    //Set the center alignment padding + border see css style
    $(loginBox).css({
      'margin-top' : -popMargTop,
      'margin-left' : -popMargLeft
    });

    // Add the mask to body
    $('body').append('<div id="mask"></div>');
    $('#mask').fadeIn(300);

    // Set the focus to the username box
    $('#username').focus();
  }

  /**
   * Returns true if the login or registration popup box is showing
   */
  function isPopupBoxShowing() {
    return ($('#login-box').is(':visible') || $('#registration-box').is(':visible'));
  }

  /**
   * Closes the login or registration window
   */
  function hidePopupBox() {
    if ($('#login-box').is(':visible')) {
      odsaUtils.logUserAction('login-box-close', 'Login box was closed');
    } else if ($('#registration-box').is(':visible')) {
      odsaUtils.logUserAction('registration-box-close', 'Registration box was closed');
    }

    $('#mask , .login-popup, .registration-popup').fadeOut(300, function () {
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

  /**
   * Makes sure the display shows the currently logged in user
   * or lack there of
   */
  function updateLogin() {
    if (settings.debugMode) {
      console.group('updateLogin()');
    }

    if (odsaUtils.serverEnabled()) {
      var username = odsaUtils.getUsername(),
          updated = false;

      if (localStorage.session && $('a.username-link').text() !== username) {
        if (settings.debugMode) {
          console.debug(username + ' has logged in since the last page refresh, update the page');
        }

        // If a user is logged in, but its not the one that appears logged in on the page, update the page
        updated = true;

        // Update display to show logged in user
        $('a.login-window').text('Logout');
        $('a.username-link').text(username);
        $('a.username-link').show();
        $('a.registration-window').hide();

        // In case the user loaded a bunch of pages,
        // then logs in on one of them
        if (isPopupBoxShowing()) {
          hidePopupBox();
        }

        // Flush any stored data
        flushStoredData();
      } else if (!localStorage.session && $('a.login-window').text() !== 'Login') {
        if (settings.debugMode) {
          console.debug($('a.login-window').text() + ' has logged out since the last page refresh, update the page');
        }

        // If a user was logged in on the page, but has since logged out, update the page with the anonymous user state
        updated = true;

        // Update display to show that no user is logged in
        $('a.login-window').text("Login");
        $('a.username-link').text('');
        $('a.username-link').hide();
        $('a.registration-window').show();
        localStorage.removeItem('warn_login');

        // Remove the variable storing the user's progress on KA exercises
        localStorage.removeItem('khan_exercise');
      }

      if (updated) {
        loadModule();
      }
    }

    if (settings.debugMode) {
      console.groupEnd();
    }
  }

  //*****************************************************************************
  //***********            Runs When Page Finishes Loading            ***********
  //*****************************************************************************
  $(document).ready(function () {
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

    $('.email_div').append('<a id="contact_us" class="contact" style="float:left;color:blue;" rel="nofollow" href="mailto:' + link + '">Contact Us |</a><a style="float:left;color:blue;" rel="nofollow" href="Privacy.html">| Privacy</a>');

    // Populate the exercises hash
    // Iterate through all showHide buttons, iframe and slideshows and add exercises (as necessary)
    $('.showHideLink, iframe, .ssAV').each(function (index, item) {
      var exerName = $(item).data('exer-name'),
          exerData = {};

      // Return if exerName is already in exercises to avoid duplicates
      if (exercises[exerName]) {
        return;
      }

      exerData.name = $(item).data('long-name');
      exerData.points = $(item).data('points');
      exerData.required = ($(item).data('required') === "True");
      exerData.threshold = $(item).data('threshold');
      exerData.type = $(item).data('type');
      exerData.uiid = +new Date();

      // Save the exercise data
      exercises[exerName] = exerData;

      // Append error and saving messages to showHide buttons
      if ($(item).hasClass('showHideLink')) {
        $(item).after("<span id='" + exerName + "_shb_error_msg' class='shb_msg'><img src='_static/Images/warning.png' class='shb_warning_icon' /> Server Error <a class='resubmit_link' href='#'>Resubmit</a></span>");
        $(item).after("<span id='" + exerName + "_shb_saving_msg' class='shb_msg'>Saving...</span>");
      }
    });
    
    // Set settings.dispModComp to true if the module contains any required exercises
    for (var exer in exercises) {
      if (exercises.hasOwnProperty(exer) && exercises[exer].required) {
        settings.dispModComp = true;
        break;
      }
    }
    
    if (settings.dispModComp) {
      // Append the module complete code to the header
      $('h1 > a.headerlink').parent().css('position', 'relative');
      $('h1 > a.headerlink').parent().append('<div id="' + moduleName + '_complete" class="mod_complete">Module Complete</div>');
    }

    /*
    // TODO: Attempt to dynamically add proficiency check marks to AVs that don't have showhide buttons
    // Works sometimes, but not consistently, CSS doesn't work right (top and right values aren't recognized
    $('iframe').contents().each(function (index, doc) {
      var avName = odsaUtils.getNameFromURL($(doc).attr('location').pathname);

      // TODO: Fix the context once the avcontainers are renamed
      // If an AV doesn't have a showhide button or a check mark, dynamically add a check mark to the AV
      if ($('#' + avName + '_showhide_btn').length === 0 && $('#' + avName + '_check_mark', $(doc)).length === 0) {
        console.debug('test1: ' + avName + " doesn't have a showhide button");
        console.debug('test1: $(doc).title = ' + $(doc).title);

        $('#ssperform', $(doc)).after('<img id="' + avName + '_check_mark" class="prof_check_mark" style="position: absolute; top: 65px, right: 10px; display: none;" src="../../lib/Images/green_check.png">');
      }
    });
    */

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
      // The location where exercises are hosted, we will accept post messages from this origin
      var exerciseOrigin = "http://algoviz.org";

      if (e.origin !== exerciseOrigin) {
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

      // Attempts to log the user in when they click submit on the login window
      $('button.submit-button').click(function (event) {
        var username = $('#username').attr('value'),
            password = $('#password').attr('value');

        jQuery.ajax({
          url:   settings.serverURL + "/api/v1/users/login/",
          type:  "POST",
          data: {"username":  username, "password": password  },
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {withCredentials: true},
          success: function (data) {
            data = odsaUtils.getJSON(data);

            if (settings.debugMode) {
              console.group('User logged in');
            }

            if (data.success) {
              updateLocalStorage(username, data.key);
              localStorage.name = username;
              odsaUtils.logUserAction('user-login', 'User logged in');
              // Assign anonymous user's score data to the user who just logged in
              assignAnonScoreData(username);
              updateLogin();
            }

            if (settings.debugMode) {
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
            } else if (data.status === 0) {
              alert("Login failed because the server is not responding or is not reachable.\nFor help, please contact the OpenDSA team.");
              localStorage.warn_login = true;
              hidePopupBox();
            } else {
              alert("Login failed");
              localStorage.warn_login = true;
              hidePopupBox();
            }
          }
        });
      });

      // Brings up the login box if the user clicks 'Login' and
      // logs the user out if they click their username
      $('a.login-window').click(function () {
        if ($('a.login-window').text() === 'Login') {
          showLoginBox();
          return false;
        } else {
          // Submit whatever data we have collected before the user logs out
          flushStoredData();

          // Inform the server the user is logging out
          jQuery.ajax({
            url:   settings.serverURL + "/api/v1/users/logout/",
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
        }
      });

      //Brings the registration form from the login popup page
      $('a.signup').click(function () {
        $('.login-popup').fadeOut(300);
        showRegistrationBox();
        return false;
      });

      // Brings up the embedded registration  box if the user clicks 'Register' and
      // should close the reistration window upon success.
      $('a.registration-window').click(function () {
        showRegistrationBox();
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
      $('a#logon').hide();  // Login link
      $('a#registration').hide();  // Registration link

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
  odsaMod.storeProficiencyStatus = storeProficiencyStatus;
  window.ODSA.MOD = odsaMod;
}(jQuery));
