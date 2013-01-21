"use strict";
/*global alert: true, console: true, serverEnabled, userLoggedIn,
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
  SUBMITTED: 'submitted',
  STORED: 'stored',
  ERROR: 'error'
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
  status = (typeof status !== "undefined") ? status : Status.STORED;  // false is a valid status
  username = (isDefined(username)) ? username : getUsername();

  var profData = getJSON(localStorage.proficiency_data),
      data = {'status': status};

  // Adds the number of points an exercise is worth (if applicable)
  if (exercises[name] && exercises[name].points) {
    data.points = exercises[name].points;
  }

  // Check whether user has an entry
  if (!profData[username]) {
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
}

/**
 * Update the proficiency indicator(s) for the specified exercise or module based on the local proficiency cache
 *  - If 'name' is not provided, will default to moduleName
 */
function updateProfDisplay(name) {
  name = (isDefined(name)) ? name : moduleName;

  var username = getUsername(),
      data = getCachedProf(name),
      status = (data) ? data.status : false;

  if (exercises[name]) {  // name refers to an exercise
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

  return status;
}

/**
 * Queries the server for the user's proficiency on an exercise or module
 */
function checkProficiency(name) {
  name = (name) ? name : moduleName;

  // Clear the proficiency display if the current user is not listed as proficient
  var status = updateProfDisplay(name),
      username = getUsername();

  // If user's proficiency is already stored in local proficiency cache, don't need to verify with the server
  if (status === Status.STORED) {
    return;
  }

  if (serverEnabled() && userLoggedIn()) {
    // Request proficiency status from the server
    var jsonData = {key: getSessionKey()},
        url;

    if (exercises[name]) {
      jsonData.exercise = name;
      url = '/api/v1/userdata/isproficient/';
    } else {
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

        // Proficiency indicators were cleared above, only need to
        // update them again if server responded that the user is proficient
        if (data.proficient) {
          storeStatusAndUpdateDisplays(name, Status.STORED, username);
        }
      },
      error: function (data) {
        data = getJSON(data);

        if (data.status === 404) {
          console.warn(name + ' does not exist in the database');
        } else {
          console.error("Error checking proficiency: " + name);
          console.error(data);
        }
      }
    });
  } else if (name === moduleName) {  // Determine whether the anonymous user is proficient with the current module
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
          status = false;
          break;
        } else if (exerData.status && exerData.status !== Status.STORED) {
          status = exerData.status;
        }
      }
    }

    // If status is SUBMITTED or STORED, store the proficiency status for the module
    if (status) {
      storeStatusAndUpdateDisplays(name, status, username);
    }
  }
}

/**
 * Cache's the user's proficiency status and updates proficiency displays as necessary
 */
function storeStatusAndUpdateDisplays(name, status, username) {
  username = (isDefined(username)) ? username : getUsername();
  storeProficiencyStatus(name, status, username);
  updateProfDisplay(name);

  // If a user is not logged in, check module proficiency if the status is anything other than 'false'
  // (module proficiency as determined locally has multiple states, unlike when the user is logged in)
  // If the user is logged in, only check module proficiency is the status is STORED (reduce network traffic)
  if (exercises[name] && ((!userLoggedIn() && status) || (userLoggedIn() && status === Status.STORED))) {
    checkProficiency(moduleName);
  }
}

/**
 * Sends all the data necessary to load a module to the server
 */
function loadModule(modName) {
  modName = (isDefined(modName)) ? modName : moduleName;

  if (modName === 'index') {
    // Get every module page link on the index page and determine if the user is proficient
    $('li.toctree-l1 > a.reference.internal').each(function (index, item) {
      if ($(item).attr('href').endsWith('.html')) {
        modName = getNameFromURL($(item).attr('href'));
        checkProficiency(modName);
      }
    });
  } else {
    var exerName;

    if (serverEnabled() && userLoggedIn()) {  // Sends all the data necessary to load a module to the server
      var username = getUsername(),
          modData = {},
          exerData = {},
          exerList = [];

      // Package exercises into a list so it can be stringified
      for (exerName in exercises) {
        if (exercises.hasOwnProperty(exerName)) {
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
      modData.book = "OpenDSA";
      // Calculate the URL of the book, relative to the current module page
      modData.url = location.href.substring(0, location.href.lastIndexOf('/') + 1);
      modData.module = modName;
      modData.exercises = JSON.stringify(exerList);

      jQuery.ajax({
        url:  server_url + "/api/v1/module/loadmodule/",
        type: "POST",
        data: modData,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

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
        },
        error: function (data) {
          data = getJSON(data);
          console.error("Error loading module: " + modName);
          console.error(data);
        }
      });
    } else {
      // Update exercise proficiency displays to reflect the proficiency of the current user
      for (exerName in exercises) {
        if (exercises.hasOwnProperty(exerName)) {
          checkProficiency(exerName);
        }
      }

      // Check for module proficiency
      checkProficiency();
    }
  }
}


//*****************************************************************************
//***********                    Scoring System                     ***********
//*****************************************************************************

/**
 * Populates the grade table on the student page
 */
function gradeDisplays(data) {
  // Create the table header
  var i = 0,
      total = 0,
      type,
      max,
      points,
      row = '<tr class="header">';

  row += '<th style=""><a href="#" class="sort"><span>Exercises</span></a></th>';
  row += '<th style=""><a href="#" class="sort"><span>Modules</span></a></th>';
  row += '<th style=""><a href="#" class="sort"><span>Points</span></a></th>';
  row += '</tr>';
  $(row).appendTo('table.data');

  row = '';
  for (i = 0; i < data.grades.length; i++) {
    row += '<tr id="' + i + '">';
    row += '<td>' + data.grades[i].exercise + '</td>';
    row += '<td>' + data.grades[i].module + '</td>';

    type = (data.grades[i].type !== "") ? data.grades[i].type : 'ss';
    max = data.max_points[type];
    points = parseFloat(data.grades[i].points);

    row += (points > 0) ? '<td bgcolor="#00FF00">' : '<td>';
    row += points.toFixed(2) + '/' + parseFloat(max).toFixed(2) + '</td></tr>';
    total += points;
  }
  $(row).appendTo('table.data');

  // Create the table footer with
  row = '<tr class="header">';
  row += '<th></th><th><span>Total</span></th>';
  row += '<th><span>' + total.toFixed(2) + '</span></th>';
  row += '</tr>';
  $(row).appendTo('table.data');
  $('#pointsBox').hide();
  $('#example').css('margin', '10px');
}

/**
 * Queries the server for the user's points
 */
function getUserPoints() {
  // Check server for user's points
  if (serverEnabled() && userLoggedIn()) {
    // get user points
    jQuery.ajax({
      url:   server_url + "/api/v1/userdata/getgrade/",
      type:  "POST",
      data: {"key": getSessionKey()},
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        if (data.grades) {
          gradeDisplays(data);
        } else {
          // Remove the loading message and display an error message to the user
          $('#pointsBox').hide();
          $('table.data').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');
        }
      },
      error: function (data) {
        data = getJSON(data);

        // Remove the loading message and display an error message to the user
        $('#pointsBox').hide();
        $('table.data').replaceWith('<div class="error">The server did not respond.  Please try again later.</div>');

        console.error("Error getting user's points");
        console.error(data);
      }
    });
  }
}

/**
 * Assigns the anonymous score data to the given user
 */
function assignAnonScoreData(username) {
  username = (isDefined(username)) ? username : getUsername();

  // Load score data
  var scoreData = getJSON(localStorage.score_data),
      exerData;

  if (!scoreData[username]) {
    scoreData[username] = {};
  }

  // Loop through anonymous user's score data
  for (var exerName in scoreData['']) {
    if (scoreData[''].hasOwnProperty(exerName)) {
      // Get the anonymous user's data for an exercise
      exerData = scoreData[''][exerName];
      delete scoreData[''][exerName];

      if (scoreData[username][exerName]) {
        // If the given user already has an entry for that exercise, keep the one with the higher score
        if (exerData.score > scoreData[username][exerName].score) {
          scoreData[username][exerName] = exerData;
        }
      } else {
        // If the given user doesn't have an entry for the exercise, add it
        scoreData[username][exerName] = exerData;
      }
    }
  }

  localStorage.score_data = JSON.stringify(scoreData);
}

/**
 * Stores the user's score for an AV / exercise
 */
function storeExerciseScore(exerName, score, username) {
  // TODO: Fix the localStorage concurrency problem
  username = (isDefined(username)) ? username : getUsername();

  // Return if exerName is not a valid exercise
  if (!exercises[exerName]) {
    console.warn('storeExerciseScore(' + exerName + ', ' + score + '): invalid reference ' + exerName);
    return;
  }

  if (serverEnabled()) {
    // Load stored score_data if it exists
    var scoreData = getJSON(localStorage.score_data);

    // If user does not have an entry in score data, create one
    if (!scoreData[username]) {
      scoreData[username] = {};
    }

    // If the user does not have buffered data for the given exercise or if the new score is higher, save the score data
    if (!scoreData[username][exerName] || score >= scoreData[username][exerName].score) {
      var data = {};
      data.submit_time = (new Date()).getTime();
      data.module = moduleName;
      data.score = score;
      data.total_time = 0;  // TODO: Figure out how to record total time
      data.uiid = exercises[exerName].uiid;
      scoreData[username][exerName] = data;

      // Save score data to localStorage
      localStorage.score_data = JSON.stringify(scoreData);
    }

    if (!userLoggedIn() && score >= exercises[exerName].threshold) {
      // Server is enabled but no one is logged in, allow client to determine proficiency based on the threshold
      storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
    }
  } else if (score >= exercises[exerName].threshold) {
    // Server is not enabled, so scores can't be verified, simply mark them as STORED if they are above the threshold
    storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
  }
}

/**
 * Sends the score for a single exercise
 */
function sendExerciseScore(exerName, username, sessionKey) {
  if (serverEnabled()) {
    // Issue a warning if called without an exercise name
    if (!exerName) {
      console.warn('Invalid exercise name: sendExerciseScore(' + exerName + ', ' + username + ', ' + sessionKey + ')');
      return;
    }

    sessionKey = (sessionKey) ? sessionKey : getSessionKey();
    username = (isDefined(username)) ? username : getUsername();

    if (!username) {
      // If a user performs an action that submits an AV score,
      // but they are not logged in, warn them they will not
      // receive credit without logging in
      warnUserLogin();
      return;
    }

    // TODO: Fix localStorage concurrency issue
    // Load stored score data from localStorage
    var scoreData = getJSON(localStorage.score_data),
        exerData;

    // Return if there is no score data
    if (scoreData === {} || !scoreData[username]) {
      return;
    }

    // Get the user's score data for the given exercise, append the session key and exercise name
    exerData = scoreData[username][exerName];
    exerData.key = sessionKey;
    exerData.exercise = exerName;

    // Update exercise status to SUBMITTED
    storeStatusAndUpdateDisplays(exerName, Status.SUBMITTED, username);

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
        
        // Make sure score_data is up-to-date (localStorage concurrency issue)
        scoreData = getJSON(localStorage.score_data);
        // Delete the buffered score data, since the server replied successfully,
        // either it was stored successfully and should be removed or
        // rejected and should be removed 
        delete scoreData[username][exerName];
        localStorage.score_data = JSON.stringify(scoreData);
        
        // Clear the saved data once it has been successfully transmitted
        if (data.success) {
          // Check whether the user is proficient
          if (data.proficient) {
            storeStatusAndUpdateDisplays(exerName, Status.STORED, username);
          } else {
            // If server successfully replies, but user's proficiency is not verified, revoke their proficiency on the client (to keep everything in sync)
            storeStatusAndUpdateDisplays(exerName, false, username);
          }
        } else {
          // If server replies as unsuccessful, stored status as ERROR
          storeStatusAndUpdateDisplays(exerName, Status.ERROR, username);
        }
      },
      error: function (data) {
        data = getJSON(data);

        // Mark the exercise as having encountered a server error
        storeStatusAndUpdateDisplays(exerName, Status.ERROR, username);

        if (data.status === 400) {    // Bad request
          // Make sure scoreData is up-to-date (localStorage concurrency issue)
          scoreData = getJSON(localStorage.score_data);
          // Server rejected score data, discard the rejected
          // score data so it doesn't affect future attempts
          delete scoreData[username][exerName];
          localStorage.score_data = JSON.stringify(scoreData);
        } else if (data.status === 404) {
          console.warn('Exercise does not exist in the database');
        } else {
          console.error("Error sending exercise score: " + exerName + " for " + username);
          console.error(data);
        }
      }
    });
  }
}

/**
 * Loops through and sends all buffered exercise scores for the given user
 */
function sendExerciseScores(username, sessionKey) {
  // User must have a valid session in order to send scores
  // This provides integrity by preventing users submitting
  // scores for someone else and allows us to determine who
  // the scores belong to because the username is derived from the session
  if (serverEnabled() && userLoggedIn() && inLocalStorage("score_data")) {
    username = (isDefined(username)) ? username : getUsername();
    sessionKey = (sessionKey) ? sessionKey : getSessionKey();

    // Load buffered score data
    var scoreData = getJSON(localStorage.score_data);

    // Send score data for the specified user
    for (var exerName in scoreData[username]) {
      if (scoreData[username].hasOwnProperty(exerName)) {
        sendExerciseScore(exerName, username, sessionKey);
      }
    }
  }
}

/**
 * Sends all stored event and AV score data to the server
 */
function flushStoredData() {
  if (serverEnabled()) {
    sendExerciseScores();
    sendEventData();
  }
}

/**
 * Handle data from events generated on the module page or received from embedded pages
 */
function processEventData(data) {
  //console.log('processEventData: ');
  //console.log(data);    // FOR TESTING

  var flush = false,
      discardEvents = ["jsav-init", "jsav-recorded", "jsav-exercise-model-init", "jsav-exercise-model-recorded"],
      ssEvents = ['jsav-forward', 'jsav-backward', 'jsav-begin', 'jsav-end', 'jsav-exercise-model-forward', 'jsav-exercise-model-backward', 'jsav-exercise-model-begin', 'jsav-exercise-model-end'];

  // Filter out events we aren't interested in
  if (discardEvents.indexOf(data.type) > -1) {
    return;
  }

  // Overwrite the av attribute with the correct value
  data.av = data.av.replace('_avc', '');

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
}


//*****************************************************************************
//*************           LOGIN AND REGISTRATION BOXES            *************
//*****************************************************************************

/**
 * Opens the registration window
 */
function showRegistrationBox() {
  if (serverEnabled()) {
    logUserAction('', 'registration-box-open', 'registration box was opened');

    var server_regist_url = server_url + "/accounts/register/",
        registrationBox = '#registration-box',
        regBoxWidth = 300,
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
  logUserAction('', 'login-box-open', 'Login box was opened');

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
    logUserAction('', 'login-box-close', 'Login box was closed');
  } else if ($('#registration-box').is(':visible')) {
    logUserAction('', 'registration-box-close', 'Registration box was closed');
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
    logUserAction('', 'login-warn-message', 'User warned they must login to receive credit');
    alert('You must be logged in to receive credit');
    localStorage.warn_login = "false";
  }
}

/**
 * Makes sure the display shows the currently logged in user
 * or lack there of
 */
function updateLogin() {
  if (serverEnabled()) {
    var username = getUsername(),
        updated = false;

    if (inLocalStorage('opendsa') && $('a.username-link').text() !== username) {
      // If a user is logged in, but its not the one that appears logged in on the page, update the page
      updated = true;

      if (getNameFromURL() === "student") {
        getUserPoints();
      }

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
}

//*****************************************************************************
//***********            Runs When Page Finishes Loading            ***********
//*****************************************************************************

$(document).ready(function () {
  //Dynamically add email address to make life harder to spammers
  var name = "opendsa";
  var place = "cs.vt.edu";
  var theAddress = name + "@" + place;
  $('.email_div').append('<a id="contact_us" class="contact" style="float:left;color:blue;" href="mailto:'+ theAddress + '" rel="nofollow">Contact Us</a>');

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
      processEventData(data);
    }
  }, false);

  if (serverEnabled()) {
    // Log the browser ready event
    logUserAction('', 'document-ready', 'User loaded the ' + moduleName + ' module page');

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

      logUserAction('', 'window-focus', 'User looking at ' + moduleName + ' window');
    });

    $(window).blur(function (e) {
      // When the user leaves an OpenDSA window, log it
      logUserAction('', 'window-blur', 'User is no longer looking at ' + moduleName + ' window');
    });

    $(window).on('beforeunload', function () {
      // Log the browser unload event
      logUserAction('', 'window-unload', 'User closed or refreshed ' + moduleName + ' window');
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

          if (data.success) {
            updateLocalStorage(username, data.key);
            localStorage.name = username;
            logUserAction('', 'user-login', 'User logged in');
            // Assign anonymous user's score data to the user who just logged in
            assignAnonScoreData(username);
            updateLogin();
          }
        },
        error: function (data) {
          data = getJSON(data);
          console.error("Error logging in");
          console.error(data);

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

            console.error("Error logging out");
            console.error(data);
          }
        });

        // Log out the user locally
        logUserAction('', 'user-logout', 'User logged out');
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