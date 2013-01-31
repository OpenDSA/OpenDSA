"use strict";
/*global alert: true, console: true, debugMode, serverEnabled, userLoggedIn, uiid,
warnUserLogin, logUserAction, logEvent, inLocalStorage, getUsername, getSessionKey,
getNameFromURL, getJSON, getModuleName, sendEventData, server_url, moduleName, isDefined, storeStatusAndUpdateDisplays, SHA1 */

/* warnUserLogin and storeStatusAndUpdateDisplays are defined in this file, but due to cyclic dependencies */
// SHA1 is more of a library and is defined at the bottom

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

/**
 * Stores the name of the book, used to uniquely identify a book in the database
 */
var bookName = "OpenDSA";

/**
 * Flag controlling whether or not the system will assign credit (
 * scores) obtained by anonymous users to the next user to log in
 */
var allowAnonCredit = true;

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
          alert(moduleName + "\nWritten by " + val.fields.author + " \nCreated as part of the OpenDSA hypertextbook project.\nFor more information, see http://algoviz.org/OpenDSA\nFile created: " + val.fields.last_modified + "\nJSAV library version " + JSAV.version());
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
  var exDate = new Date();
  exDate.setDate(exDate.getDate() + 5);  //the session is valid 5 days
  var session = {};
  session.username = username;
  session.key = sessionKey;
  session.expires = exDate;
  localStorage.opendsa = JSON.stringify(session);
}

function isSessionExpired() {
  if (inLocalStorage("opendsa")) {
    var bj = JSON.parse(localStorage.opendsa),
        sessionDate = bj.expires,
        currentDate = new Date();
    return sessionDate <= currentDate;
  }
  return true;
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
  if (serverEnabled() && !userLoggedIn()) {
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
function getCachedProf(name, username) {
  username = (isDefined(username)) ? username : getUsername();
  
  // Check for proficiency status in localStorage
  if (inLocalStorage("proficiency_data")) {
    var profData = getJSON(localStorage.proficiency_data);
    username = (isDefined(username)) ? username : getUsername();

    // Check whether user has proficiency data and if the specified exercise is listed
    if (profData[username] && profData[username][name]) {
      return profData[username][name];
    }
  }

  return false;
}

/**
 * Stores the user's proficiency status with the specified exercise in localStorage
 */
function storeProficiencyStatus(name, status, username) {
  if (debugMode) {
    console.group('storeProficiencyStatus(' + name + ', ' + status + ', ' + username + ')');
  }

  status = (typeof status !== "undefined") ? status : Status.STORED;  // false is a valid status
  username = (isDefined(username)) ? username : getUsername();

  var profData = getJSON(localStorage.proficiency_data),
      data = {'status': status};

  // Adds the number of points an exercise is worth (if applicable)
  if (exercises[name] && exercises[name].points) {
    data.points = exercises[name].points;
  }

  if (debugMode) {
    console.debug('storeProficiencyStatus(' + name + ', ' + status + ', ' + username + ')');
    console.debug('profData (unmodified):');
    console.debug(JSON.stringify(profData));
    console.debug('data:');
    console.debug(JSON.stringify(data));
  }

  // Check whether user has an entry
  if (!profData[username]) {
    if (debugMode) {
      console.debug('Creating new proficiency_data entry for ' + ((username) ? username : 'the anonymous user'));
    }
    // Add a new entry for the user
    profData[username] = {};
  }

  if (status) {
    // User is proficient, store the data in local proficiency cache
    profData[username][name] = data;
  } else if (profData[username][name]) {
    // User is not proficient, remove any data from the local proficiency cache
    delete profData[username][name];
  }

  localStorage.proficiency_data = JSON.stringify(profData);

  if (debugMode) {
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
  name = (isDefined(name)) ? name : moduleName;

  if (debugMode) {
    console.group('updateProfDisplay(' + name + ')');
  }

  var username = getUsername(),
      data = getCachedProf(name),
      status = (data) ? data.status : false;

  if (exercises[name]) {  // name refers to an exercise
    if (debugMode) {
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
    if (debugMode) {
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

  if (debugMode) {
    console.debug('returning: ' + status);
    console.groupEnd();
  }

  return status;
}

/**
 * Queries the server for the user's proficiency on an exercise or module
 */
function checkProficiency(name, username) {
  name = (name) ? name : moduleName;
  username = (isDefined(username)) ? username : getUsername();

  if (debugMode) {
    console.group('checkProficiency(' + name + ', ' + username + ')');
  }

  // Clear the proficiency display if the current user is not listed as proficient
  var status = updateProfDisplay(name);

  // If user's proficiency is already stored in local proficiency cache, don't need to verify with the server
  if (status === Status.STORED) {
    if (debugMode) {
      console.debug('Cached status: ' + status);
      console.groupEnd();
    }

    return;
  }

  if (serverEnabled() && userLoggedIn()) {
    // Request proficiency status from the server
    var jsonData = {key: getSessionKey()},
        url;

    if (exercises[name]) {
      if (debugMode) {
        console.debug('Querying server for exercise proficiency for ' + username);
      }

      jsonData.exercise = name;
      url = '/api/v1/userdata/isproficient/';
    } else {
      if (debugMode) {
        console.debug('Querying server for module proficiency for ' + username);
      }

      jsonData.module = name;
      url = '/api/v1/usermodule/ismoduleproficient/';
    }

    jQuery.ajax({
      url:  server_url + url,
      type: "POST",
      data: jsonData,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        if (debugMode) {
          console.group('Server response, checkProficiency(' + name + ', ' + username + ')');
          console.debug(JSON.stringify(data));
        }

        // Proficiency indicators were cleared above, only need to
        // update them again if server responded that the user is proficient
        if (data.proficient) {
          storeStatusAndUpdateDisplays(name, Status.STORED, username);
        }

        if (debugMode) {
          console.groupEnd();
        }
      },
      error: function (data) {
        data = getJSON(data);

        if (data.status === 404) {
          console.warn(name + ' does not exist in the database');
        } else {
          console.group('Error: checkProficiency(' + name + ', ' + username + ')');
          console.debug("Error checking proficiency: " + name);
          console.debug(JSON.stringify(data));
          console.groupEnd();
        }
      }
    });
  } else if (name === moduleName) {  // Determine whether the anonymous user is proficient with the current module
    if (debugMode) {
      console.debug('Determining (client-side) module proficiency for anonymous user');
    }

    // Can't use this technique from the index page to determine the proficiency of other module pages because there are no exercises on the index page which will cause all modules to be listed as proficient

    // Allow the client to determine module proficiency for anonymous users
    status = Status.STORED;
    var exerData;

    // Check whether local proficiency cache lists all exercises required for module proficiency as completed
    for (var exerName in exercises) {
      if (exercises.hasOwnProperty(exerName) && exercises[exerName].required) {
        exerData = getCachedProf(exerName);

        if (!exerData) {
          // User is not proficient with a required exercise and therefore cannot be proficient with the module
          if (debugMode) {
            console.debug(exerName + ': false');
          }

          status = false;
          break;
        } else if (exerData.status && exerData.status !== Status.STORED) {
          status = exerData.status;
        }

        if (debugMode) {
          console.debug(exerName + ': ' + exerData.status);
        }
      }
    }

    // If status is SUBMITTED or STORED, store the proficiency status for the module
    if (status) {
      storeStatusAndUpdateDisplays(name, status, username);
    } else if (debugMode) {
      console.debug(name + ': false');
    }
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Cache's the user's proficiency status and updates proficiency displays as necessary
 */
function storeStatusAndUpdateDisplays(name, status, username) {
  username = (isDefined(username)) ? username : getUsername();

  if (debugMode) {
    console.group('storeStatusAndUpdateDisplays(' + name + ' , ' + status + ', ' + username + ')');
  }

  storeProficiencyStatus(name, status, username);
  updateProfDisplay(name);

  // If a user is not logged in, check module proficiency if the status is anything other than 'false'
  // (module proficiency as determined locally has multiple states, unlike when the user is logged in)
  // If the user is logged in, only check module proficiency is the status is STORED (reduce network traffic)
  if (exercises[name] && ((!userLoggedIn() && status) || (userLoggedIn() && status === Status.STORED))) {
    checkProficiency(moduleName);
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Sends all the data necessary to load a module to the server
 */
function loadModule(modName) {
  modName = (isDefined(modName)) ? modName : moduleName;

  if (debugMode) {
    console.group('loadModule(' + modName + ')');
  }

  if (modName === 'index') {
    // Get every module page link on the index page and determine if the user is proficient
    $('li.toctree-l1 > a.reference.internal').each(function (index, item) {
      if ($(item).attr('href').endsWith('.html')) {
        modName = getNameFromURL($(item).attr('href'));
        checkProficiency(modName);
      }
    });
  } else if (modName === "Gradebook") {
    // Trigger loading the gradebook
    $("body").trigger("gradebook-load");
  } else {
    var exerName;

    if (serverEnabled() && userLoggedIn()) {  // Sends all the data necessary to load a module to the server
      if (debugMode) {
        console.debug('Querying server for module data');
      }

      var username = getUsername(),
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
      modData.key = getSessionKey();
      modData.book = bookName;
      // Calculate the URL of the book, relative to the current module page
      modData.url = location.href.substring(0, location.href.lastIndexOf('/') + 1);
      modData.module = modName;
      modData.exercises = JSON.stringify(exerList);

      if (debugMode) {
        console.debug('Sending modData:');
        console.debug(JSON.stringify(modData));
      }

      jQuery.ajax({
        url:  server_url + "/api/v1/module/loadmodule/",
        type: "POST",
        data: modData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          if (debugMode) {
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
                if (exercises[exerName].type === 'ka' && isDefined(data[exerName].progress)) {
                  exercises[exerName].progress = data[exerName].progress;

                  // Load any existing data
                  exerData = getJSON(localStorage.khan_exercise);
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

          if (debugMode) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = getJSON(data);
          console.group("Error loading module: " + modName);
          console.debug(JSON.stringify(data));
          console.groupEnd();
        }
      });
    } else {
      if (debugMode) {
        console.debug('Load anonymous user data from localStorage');
      }

      // Update exercise proficiency displays to reflect the proficiency of the current user
      for (exerName in exercises) {
        if (exercises.hasOwnProperty(exerName)) {
          checkProficiency(exerName);

          // Update Khan Academy exercise progress bar
          /*
          if (exercises[exerName].type === 'ka') {

          }
          */
        }
      }

      // Check for module proficiency
      checkProficiency();
    }
  }

  if (debugMode) {
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
 */
function storeScoreData(newScoreData, username) {
  username = (username) ? username : getUsername();

  if (allowAnonCredit || username !== '') {
    if (debugMode) {
      console.group('storeScoreData(' + JSON.stringify(newScoreData) + ', ' + ((username) ? username : 'the anonymous user') + ')');
    }

    if (serverEnabled()) {
      // Load stored score_data if it exists
      var scoreData = getJSON(localStorage.score_data);

      if (debugMode) {
        console.debug('Storing exercise score for ' + ((username) ? username : 'the anonymous user'));
        console.debug('scoreData (unmodified):');
        console.debug(JSON.stringify(scoreData));
      }

      if (!scoreData) {
        scoreData = {};
      }

      // If user does not have an entry in score data, create one
      if (!scoreData[username]) {
        if (debugMode) {
          console.debug('Creating a new score_data entry for ' + ((username) ? username : 'the anonymous user'));
        }

        scoreData[username] = [];
      }

      scoreData[username].push(newScoreData);
      localStorage.score_data = JSON.stringify(scoreData);

      if (debugMode) {
        console.debug('scoreData (modified):');
        console.debug(JSON.stringify(scoreData));
      }
    }

    if (debugMode) {
      console.groupEnd();
    }
  }
}

/**
 * Assigns the anonymous score data to the given user
 */
function assignAnonScoreData(username) {
  if (allowAnonCredit) {
    username = (isDefined(username)) ? username : getUsername();

    // Return is specified user is the anonymous user
    if (!username) {
      return;
    }

    if (debugMode) {
      console.group('assignAnonScoreData(' + username + ')');
    }

    // Load score data
    var scoreData = getJSON(localStorage.score_data);

    // Create a deep copy of anonymous user's data so that the original can be
    // cleared and saved immediately to prevent accidentally overwriting data
    var anonData = $.extend(true, [], scoreData['']);

    if (debugMode) {
      console.debug('scoreData (unmodified):');
      console.debug(JSON.stringify(scoreData));
    }

    // Clear list of anonymous user's score objects
    scoreData[''] = [];
    localStorage.score_data = JSON.stringify(scoreData);

    var validDate = new Date();
    validDate.setDate(validDate.getDate() - 5);

    // Associate each score object with the given user, if the
    // exercise was completed within the last 5 days
    for (var i = 0; i < anonData.length; i++) {
      if (anonData[i].submit_time > +validDate) {
        storeScoreData(anonData[i], username);
      }
    }

    if (debugMode) {
      console.debug('scoreData (modified):');
      console.debug(JSON.stringify(scoreData));
      console.groupEnd();
    }
  }
}

/**
 * Stores the user's score for an AV / exercise
 */
function storeExerciseScore(exerName, score, username) {
  // TODO: Fix the localStorage concurrency problem
  username = (isDefined(username)) ? username : getUsername();

  if (debugMode) {
    console.group('storeExerciseScore(' + exerName + ', ' + score + ', ' + username + ')');
  }

  // Return if exerName is not a valid exercise
  if (!exercises[exerName]) {
    console.warn('storeExerciseScore(' + exerName + ', ' + score + ', ' + username + '): invalid reference ' + exerName);

    if (debugMode) {
      console.groupEnd();
    }

    return;
  }

  if (serverEnabled() && (allowAnonCredit || userLoggedIn())) {
    var data = {};
    data.exercise = exerName;
    data.submit_time = (new Date()).getTime();
    data.module = moduleName;
    data.score = score;
    data.total_time = 0;  // TODO: Figure out how to record total time
    data.uiid = exercises[exerName].uiid;

    if (debugMode) {
      console.debug('Storing exercise score for ' + ((username) ? username : 'the anonymous user'));
      console.debug('data:');
      console.debug(JSON.stringify(data));
    }

    // Save the score data in localStorage
    storeScoreData(data, username);
  }

  // If the score is above the threshold and the server isn't enabled or it
  // is and no one is logged in, award proficiency to the anonymous user
  if (score >= exercises[exerName].threshold && (!serverEnabled() || !userLoggedIn())) {
    if (debugMode) {
      console.debug('Award anonymous user proficiency');
    }

    storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Sends the score for a single exercise
 */
function sendExerciseScore(exerData, username, sessionKey) {
  if (debugMode) {
    console.group('sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ')');
    console.debug(JSON.stringify(exerData));
  }

  if (serverEnabled()) {
    // Issue a warning if called without exercise data
    if (!exerData) {
      console.warn('Invalid exercise data: ' + JSON.stringify(exerData));
      if (debugMode) {
        console.groupEnd();
      }
      return;
    }

    sessionKey = (sessionKey) ? sessionKey : getSessionKey();
    username = (isDefined(username)) ? username : getUsername();

    if (debugMode) {
      console.debug('sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ')');
    }

    if (!username) {
      // If a user performs an action that submits an AV score,
      // but they are not logged in, warn them they will not
      // receive credit without logging in
      warnUserLogin();

      if (debugMode) {
        console.debug('No user is logged in');
        console.groupEnd();
      }
      return;
    }

    // Determine if the user is already proficient
    var profData = getCachedProf(exerData.exercise, username),
        profStored = false;

    // If user's proficiency is already confirmed by the server, don't confuse them by changing the status
    if (profData && profData.status === Status.STORED) {
      profStored = true;
    } else {
      // Update exercise status to SUBMITTED
      storeStatusAndUpdateDisplays(exerData.exercise, Status.SUBMITTED, username);
    }

    // Append the session key to the exercise data
    exerData.key = sessionKey;

    if (debugMode) {
      console.debug('Sending exerData:');
      console.debug(JSON.stringify(exerData));
    }

    // Submit the user's score
    jQuery.ajax({
      url:   server_url + "/api/v1/user/exercise/attemptpe/",
      type:  "POST",
      data: exerData,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        if (debugMode) {
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
        } else if (!profStored) {
          // If server replies as unsuccessful, stored status as ERROR
          storeStatusAndUpdateDisplays(exerData.exercise, Status.ERROR, username);
        }

        if (debugMode) {
          console.groupEnd();
        }
      },
      error: function (data) {
        data = getJSON(data);

        if (debugMode) {
          console.group('Error: sendExerciseScore(exerData, ' + username + ', ' + sessionKey + ')');
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
          delete exerData.key;
          storeScoreData(exerData, username);

          if (data.status === 404) {
            console.warn('Exercise does not exist in the database');
          } else {
            console.debug("Error sending exercise score: " + exerData.exercise + " for " + username);
            console.debug(JSON.stringify(data));
          }
        }

        if (debugMode) {
          console.groupEnd();
        }
      }
    });
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Loops through and sends all buffered exercise scores for the given user
 */
function sendExerciseScores(username, sessionKey) {
  if (debugMode) {
    console.group('sendExerciseScores(' + username + ', ' + sessionKey + ')');
  }

  // User must have a valid session in order to send scores
  // This provides integrity by preventing users submitting
  // scores for someone else and allows us to determine who
  // the scores belong to because the username is derived from the session
  if (serverEnabled() && userLoggedIn() && inLocalStorage("score_data")) {
    username = (isDefined(username)) ? username : getUsername();
    sessionKey = (sessionKey) ? sessionKey : getSessionKey();

    // Load buffered score data
    var scoreData = getJSON(localStorage.score_data);

    // Create a deep copy of user's score data so the original can be
    // cleared and saved to prevent accidentally overwriting data
    var userData = $.extend(true, [], scoreData[username]);

    if (debugMode) {
      console.debug('sendExerciseScores(' + username + ', ' + sessionKey + ')');
      console.debug('scoreData:');
      console.debug(JSON.stringify(scoreData));
      console.debug('userData:');
      console.debug(JSON.stringify(userData));
    }

    scoreData[username] = [];
    localStorage.score_data = JSON.stringify(scoreData);

    // Send score data for the specified user
    for (var i = 0; i < userData.length; i++) {
      sendExerciseScore(userData[i], username, sessionKey);
    }
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Sends all stored event and AV score data to the server
 */
function flushStoredData() {
  if (debugMode) {
    console.group('flushStoredData()');
  }

  if (serverEnabled()) {
    sendExerciseScores();
    sendEventData();
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Handle data from events generated on the module page or received from embedded pages
 */
function processEventData(data) {
  if (debugMode) {
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
  if (!data.uiid) {
    if (exercises[data.av]) {
      // If the event belongs to an exercise, use the exercises uiid
      data.uiid = exercises[data.av].uiid;
    } else {
      // If the event doesn't belong to an exercise, use the uiid of the page
      data.uiid = uiid;
    }
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

    // User reached the end of a slideshow, award them credit
    if (data.type === "jsav-forward" && data.currentStep === data.totalSteps) {
      storeExerciseScore(data.av, 1);
      updateProfDisplay(data.av);
      flush = true;
    }
  } else if (data.type === "jsav-array-click") {
    data.desc = JSON.stringify({'index': data.index, 'arrayid': data.arrayid});
  } else if (data.type === "jsav-exercise-grade-change") {
    // On grade change events, log the user's score and submit it
    score = (data.score.student - data.score.fix) / data.score.total;
    complete = (data.score.student + data.score.fix) / data.score.total;
    data.desc = JSON.stringify({'score': score, 'complete': complete});

    // Store the user's score when they complete the exercise
    if (complete === 1) {
      storeExerciseScore(data.av, score);
      updateProfDisplay(data.av);
      flush = true;
    }
  } else if (data.type === "odsa-award-credit") {
    // Store completion credit
    storeExerciseScore(data.av, 1);
    updateProfDisplay(data.av);
    flush = true;
  }

  if (serverEnabled()) {
    // Save the event in localStorage
    if (!data.logged) {
      delete data.logged;  // In case it explicitly says 'false'
      logEvent(data);
    }

    if (flush) {
      flushStoredData();
    }
  }

  if (debugMode) {
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
  if (serverEnabled()) {
    logUserAction('registration-box-open', 'registration box was opened');

    var server_regist_url = server_url + "/accounts/register/",
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
  logUserAction('login-box-open', 'Login box was opened');

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
    logUserAction('login-box-close', 'Login box was closed');
  } else if ($('#registration-box').is(':visible')) {
    logUserAction('registration-box-close', 'Registration box was closed');
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
  if (serverEnabled() && (!inLocalStorage("warn_login") || localStorage.warn_login !== "false")) {
    logUserAction('login-warn-message', 'User warned they must login to receive credit');
    alert('You must be logged in to receive credit');
    localStorage.warn_login = "false";
  }
}

/**
 * Makes sure the display shows the currently logged in user
 * or lack there of
 */
function updateLogin() {
  if (debugMode) {
    console.group('updateLogin()');
  }

  if (serverEnabled()) {
    var username = getUsername(),
        updated = false;

    if (inLocalStorage('opendsa') && $('a.username-link').text() !== username) {
      if (debugMode) {
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
    } else if (!inLocalStorage('opendsa') && $('a.login-window').text() !== 'Login') {
      if (debugMode) {
        console.debug($('a.login-window').text() + ' has logged out since the last page refresh, update the page');
      }

      // If a user was logged in on the page, but has since logged out, update the page with the anonymous user state
      updated = true;

      // Update display to show that no user is logged in
      $('a.login-window').text("Login");
      $('a.username-link').text('');
      $('a.username-link').hide();
      $('a.registration-window').show();

      if (inLocalStorage('warn_login')) {
        localStorage.removeItem('warn_login');
      }

      // Remove the variable storing the user's progress on KA exercises
      if (inLocalStorage('khan_exercise')) {
        localStorage.removeItem('khan_exercise');
      }
    }

    if (updated) {
      loadModule();
    }
  }

  if (debugMode) {
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

  $('.email_div').append('<a id="contact_us" class="contact" style="float:left;color:blue;" rel="nofollow" href="mailto:' + link + '">Contact Us</a>');

  // Append the module complete code to the header
  $('h1 > a.headerlink').parent().css('position', 'relative');
  $('h1 > a.headerlink').parent().append('<div id="' + moduleName + '_complete" class="mod_complete">Module Complete</div>');

  // Populate the exercises hash
  // Iterate through all showHide buttons, iframe and slideshows and add exercises (as necessary)
  $('.showHideLink, iframe, .ssAV').each(function (index, item) {
    var exerName = $(item).data('exer-name'),
        exerData = {};

    // Return if exerName is already in exercises to avoid duplicates
    if (exercises[exerName]) {
      return;
    }

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

  /*
  // TODO: Attempt to dynamically add proficiency check marks to AVs that don't have showhide buttons
  // Works sometimes, but not consistently, CSS doesn't work right (top and right values aren't recognized
  $('iframe').contents().each(function (index, doc) {
    var avName = getNameFromURL($(doc).attr('location').pathname);

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
    var data = getJSON(e.data);

    if (data.exercise && data.proficient) {
      // Store status of Khan Academy exercise
      storeStatusAndUpdateDisplays(data.exercise, Status.STORED, getUsername());
    } else {
      // Reset the uiid stored by the module page to match the one generated on the embedded page
      exercises[data.av].uiid = data.uiid;
      processEventData(data);
    }
  }, false);

  if (serverEnabled()) {
    // Log the browser ready event
    logUserAction('document-ready', 'User loaded the ' + moduleName + ' module page');

    // Suggest the user login if they don't have a valid session,
    // update the login link with their name if they do
    if (isSessionExpired()) {
      // Flush any old data before forcing a user to logout
      flushStoredData();
      localStorage.removeItem("opendsa");
      if (!inLocalStorage("warn_login")) {
        showLoginBox();
      }
      loadModule();
    } else {
      updateLogin();
    }

    $(window).focus(function (e) {
      // When the user switches tabs, make sure the login display on the new tab is correct
      updateLogin();

      logUserAction('window-focus', 'User looking at ' + moduleName + ' window');
    });

    $(window).blur(function (e) {
      // When the user leaves an OpenDSA window, log it
      logUserAction('window-blur', 'User is no longer looking at ' + moduleName + ' window');
    });

    $(window).on('beforeunload', function () {
      // Log the browser unload event
      logUserAction('window-unload', 'User closed or refreshed ' + moduleName + ' window');
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
          //password = SHA1(password);

      jQuery.ajax({
        url:   server_url + "/api/v1/users/login/",
        type:  "POST",
        data: {"username":  username, "password": password  },
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          if (debugMode) {
            console.group('User logged in');
          }

          if (data.success) {
            updateLocalStorage(username, data.key);
            localStorage.name = username;
            logUserAction('user-login', 'User logged in');
            // Assign anonymous user's score data to the user who just logged in
            assignAnonScoreData(username);
            updateLogin();
          }

          if (debugMode) {
            console.groupEnd();
          }
        },
        error: function (data) {
          data = getJSON(data);
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
          url:   server_url + "/api/v1/users/logout/",
          type:  "GET",
          data: {key: getSessionKey()},
          contentType: "application/json; charset=utf-8",
          datatype: "json",
          xhrFields: {withCredentials: true},
          success: function (data) {
            data = getJSON(data);
          },
          error: function (data) {
            data = getJSON(data);

            console.group("Error logging out");
            console.debug(data);
            console.groupEnd();
          }
        });

        // Log out the user locally
        logUserAction('user-logout', 'User logged out');
        localStorage.removeItem('opendsa');
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




































/**
*
*  Secure Hash Algorithm (SHA1)
*  http://www.webtoolkit.info/
*
**/
function SHA1(msg) {
/*jslint bitwise: true */
  function rotate_left(n, s) {
    var t4 = (n << s) | (n >>> (32 - s));
    return t4;
  }

  function lsb_hex(val) {
    var str = "";
    var i;
    var vh;
    var vl;

    for (i = 0; i <= 6; i += 2) {
      vh = (val >>> (i * 4 + 4)) & 0x0f;
      vl = (val >>> (i * 4)) & 0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  }

  function cvt_hex(val) {
    var str = "";
    var i;
    var v;

    for (i = 7; i >= 0; i--) {
      v = (val >>> (i * 4)) & 0x0f;
      str += v.toString(16);
    }
    return str;
  }

  function Utf8Encode(string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";

    for (var n = 0; n < string.length; n++) {
      var c = string.charCodeAt(n);

      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if ((c > 127) && (c < 2048)) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }

    return utftext;
  }

  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;

  msg = new Utf8Encode(msg);
  var msg_len = msg.length;

  var word_array = [];
  for (i = 0; i < msg_len - 3; i += 4) {
    j = msg.charCodeAt(i) << 24 | msg.charCodeAt(i + 1) << 16 |
    msg.charCodeAt(i + 2) << 8 | msg.charCodeAt(i + 3);
    word_array.push(j);
  }

  switch (msg_len % 4) {
  case 0:
    i = 0x080000000;
    break;

  case 1:
    i = msg.charCodeAt(msg_len - 1) << 24 | 0x0800000;
    break;

  case 2:
    i = msg.charCodeAt(msg_len - 2) << 24 | msg.charCodeAt(msg_len - 1) << 16 | 0x08000;
    break;

  case 3:
    i = msg.charCodeAt(msg_len - 3) << 24 | msg.charCodeAt(msg_len - 2) << 16 | msg.charCodeAt(msg_len - 1) << 8 | 0x80;
    break;
  }

  word_array.push(i);

  while ((word_array.length % 16) !== 14) {
    word_array.push(0);
  }

  word_array.push(msg_len >>> 29);
  word_array.push((msg_len << 3) & 0x0ffffffff);

  for (blockstart = 0; blockstart < word_array.length; blockstart += 16) {

    for (i = 0; i < 16; i++) {
      W[i] = word_array[blockstart + i];
    }
    for (i = 16; i <= 79; i++) {
      W[i] = rotate_left(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);
    }

    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;

    for (i = 0; i <= 19; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (~B & D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 20; i <= 39; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 40; i <= 59; i++) {
      temp = (rotate_left(A, 5) + ((B & C) | (B & D) | (C & D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    for (i = 60; i <= 79; i++) {
      temp = (rotate_left(A, 5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B, 30);
      B = A;
      A = temp;
    }

    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }

  temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}