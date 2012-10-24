"use strict";
/*global alert: true, console: true, warn: true, checkModuleProficiency */

// Set server_url = "" in order to disable server communication and most logging
var server_url = "http://opendsa.cc.vt.edu"; // opendsa.cc.vt.edu:8080
// Dan's desktop: 128.173.54.186:8000
// Eric's desktop: 128.173.55.223:8080

var odsa_url = "http://algoviz.org"; //algoviz.org
// Development: algoviz-beta.cc.vt.edu

// Stores the module name so we don't have to look it up every time
var moduleName = "";

// Flag indicating whether the user can receive credit for the
// current exercise instance, set to false if the student views the model answer
var allowCredit = true;


/*
 * Returns true if the variable matches the expected type.
 * Bypasses broken behavior of 'typeof'.  `typeof` should be avoided at all
 * costs (unless checking if a var is defined).
 * 
 * Usage:
 * is('String, 'testing'); // true
 * is('String', new String('test')); // true
 * Credit to: http://bonsaiden.github.com/JavaScript-Garden/
 */
function is(type, obj) {
  var clas = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && clas === type;
}
  
function inLocalStorage(varName) {
  return localStorage[varName];
}

function getUsername() {
  if (inLocalStorage("opendsa")) {
    var obj = JSON.parse(localStorage.opendsa);
    return obj.username;
  }
  return "";
}

/**
 * Returns whether or not a user is currently logged in
 */
function userLoggedIn() {
  return (getUsername() !== "");
}

/**
 * Returns true if system is configured to use a metrics collection server
 */
function serverEnabled() {
  return (server_url !== "");
}

/**
 * Returns whether or not credit is allowed on the current exercise
 */
function isCreditAllowed() {
  return allowCredit;
}

/**
 * Returns true if the page contains a hyperlink with id='logon' in a div with class="header"
 *   context - optional parameter to specify another document
 *            (such as the window.parent.document of a page loaded in an iFrame)
 */
function isModulePage(context) {
  // Context will default to document if not provided
  context = (context) ? context : document;

  // TODO: Is this really a good way to do this?  Find a more robust way to determine if its a module
  if ($('div > a#logon', context).length === 1 && $('div > a#logon', context).parent().hasClass('header')) {
    return true;
  }
  return false;
}

/**
 * Returns true if the given document has '/AV/' in the URL
 *   context - optional parameter to specify another document
 *            (such as getting the document loaded in an iFrame on a module page)
 */
function isAVPage(context) {
  // Context will default to document if not provided
  context = (context) ? context : document;

  // TODO: Is this really a good way to do this?
  return context.location.href.indexOf('/AV/') > -1;
}

/**
 * Parses the name of the page from the URL
 */
function getNameFromURL(url)
{
  // If no URL is specified, uses the pathname of the current page
  url = (url) ? url : location.pathname;
  var start = url.lastIndexOf("/") + 1;
  var end = url.lastIndexOf(".htm");
  return url.slice(start, end);
}

/**
 * If called from a module page, returns the name parsed from the URL.
 * If called from an AV loaded on a module page, returns the name parsed from the title of the parent page.
 */
function getModuleName() {
  if (isModulePage()) {
    return getNameFromURL();
  } else if (isModulePage(window.parent.document)) {
    return getNameFromURL(window.parent.document.location.pathname);
  }

  return "";
}

/**
 * Returns the name of the AV or exercise if called from an AV page, returns "" otherwise
 */
function getAVName() {
  return (isAVPage() ? getNameFromURL() : "");
}

/**
 * Returns true if the given element is a JSAV managed control
 * Relies on JSAV controls being in a container with a class that matches '.*jsav\w*control.*'
 * include "jsavexercisecontrols" and "jsavcontrols"
 */
function isJSAVControl(item) {
/*jslint regexp: true */
  return (item && item.parentElement && item.parentElement.className.match(/.*jsav\w*control.*/) !== null);
  //return (item !== "undefined" && item.parentElement !== "undefined" && item.parentElement.className.match(/.*jsav\w*control.*/) !== null);
}

/**
 * Returns the given data as a JSON object
 * If given a string, converts it to JSON
 * If given a JSON object, does nothing
 */
function getJSON(data) {
  if (is('String', data)) {
    data = jQuery.parseJSON(data);
  }

  if (!data) {
    console.error("Error parsing JSON data: " + JSON.stringify(data));
  }

  return data;
}

//*****************************************************************************
//*************      Proficiency Check and Update Displays        *************
//*****************************************************************************

/**
 * Adds the given name to a list of items for which the current user is proficient
 *
 * Note: This is designed to only be called by updateExerProfDisplays()
 *       and checkModuleProficiency()
 */
function storeProficiencyStatus(name) {
  var username = getUsername();
  var data = {};

  if (inLocalStorage("proficiency_data")) {
    data = getJSON(localStorage.proficiency_data);

    // Check whether user has an entry
    if (data[username]) {
      var profList = data[username];

      // Check to see if the item already exists in the user's proficiency list
      if (profList.indexOf(name) === -1) {
        profList.push(name);
      }
    } else {
      // Add a new entry for the user
      data[username] = [name];
    }
  } else {
    // Check a new object to store proficiency data and add a new entry for the user
    data[username] = [name];
  }

  localStorage.proficiency_data = JSON.stringify(data);
}

/**
 * Update the proficiency indicator(s) for the specified exercise
 *
 * Status should only be true:
 *     - If no backend server is enabled or no user is logged in and the client determines a user is proficient
 *     - If the server responds that the logged in user is proficient
 */
function updateExerProfDisplay(exerName, status) {
  var objId = exerName + '_check_mark';

  // Hide or display proficiency check mark, if it exists
  if ($('#' + objId).length > 0) {
    if (status) {
      // Display the proficiency check mark
      $("#" + objId).css('display', 'block');
    } else {
      // Hide the proficiency check mark
      $("#" + objId).css('display', 'none');
    }
  }

  objId = exerName + '_showhide_btn';

  // Change AV showhide button to red or green to indicate proficiency, if it exists
  if ($('#' + objId).length > 0) {
    if (status) {
      // Turn the button green
      $("#" + objId).css("background-color", "lime");
    } else {
      // Turn the button red
      $("#" + objId).css("background-color", "#FF0000");
    }
  }
}

/**
 * Update the proficiency indicator(s) for the specified AV on both the AV and module pages
 * If status is true, caches the user's proficiency in localStorage
 *
 * Status should only be true:
 *     - If no backend server is enabled or no user is logged in and the client determines a user is proficient
 *     - If the server responds that the logged in user is proficient
 */
function updateExerProfDisplays(exerName, status) {
  // Store status locally if user is proficient
  if (status) {
    storeProficiencyStatus(exerName, status);
  }

  // Update displays on current page
  updateExerProfDisplay(exerName, status);

  // Update display on module page, if this is an embedded AV
  if (isAVPage() && isModulePage(window.parent.document)) {
    window.parent.updateExerProfDisplay(exerName, status);
  }
}

//*****************************************************************************
//***********        Scoring, Logging and Metrics Collection        ***********
//*****************************************************************************

/**
 * Checks the given JSON object to ensure it has the correct fields
 *     data - a JSON object representing an event
 */
function isValidEvent(data) {
  var missingFields = [];

  if (!data.av) {
    missingFields.push('av');
  }
  if (!data.type) {
    missingFields.push('type');
  }
  if (!data.desc) {
    missingFields.push('desc');
  }

  if (missingFields.length === 1) {
    console.error("ERROR: invalid event, '" + missingFields[0] + "' is undefined");
    return false;
  } else if (missingFields.length > 1) {
    var fields = missingFields.toString().replace(",", "', '");
    console.error("ERROR: invalid event, '" + fields + "' are undefined");
    return false;
  }

  return true;
}

/**
 * Appends the given data to the event log
 *     data - A JSON string or object containing event data, must contain the following fields: 'av', 'type', 'desc'
 */
function logEvent(data) {
  if (serverEnabled()) {
    data = getJSON(data);

    // Ensure given JSON data is a valid event
    if (!isValidEvent(data)) {
      return;
    }

    // Don't log events without either an AV name or a module name
    // Getting duplicates of some events where one is missing both
    // Currently all legitimate events should have one or the other
    if (data.av === "" && moduleName === "") {
      return;
    }

    data.module_name = moduleName;

    // Add a timestamp to the data
    if (data.tstamp) {
      // Convert existing JSAV timestamp from ISO format to milliseconds
      data.tstamp = new Date(data.tstamp).getTime();
    } else {
      data.tstamp = (new Date()).getTime();
    }

    var actions_list = [];

    // Retrieve existing data from localStorage if it exists
    if (inLocalStorage("event_data")) {
      actions_list = getJSON(localStorage.event_data);
    }

    actions_list.push(data);

    localStorage.event_data = JSON.stringify(actions_list);
  }
}

/**
 * Logs a custom user interaction
 *     avName - Name of the AV with which the action is associated
 *     type - String identifying the type of action
 *     desc - Human-readable string describing the action
 */
function logUserAction(avName, type, desc) {
  if (serverEnabled()) {
    console.debug("logUserAction(" + avName + ', ' + type + ', ' + desc + ')');  // FOR TESTING
    var json_data = {};
    json_data.av = avName;
    json_data.type = type;
    json_data.desc = desc;
    logEvent(json_data);
  }
}

/**
 * Logs the initial state of an array generated for an AV or exercise
 *   - avName - Name of the AV with which the array is associated
 *   - initData - A JSON object that contains the initial state of an exercise
 *     Conventions:
 *       - The key for automatically generated data should have a prefix 'gen_'
 *         - Ex: an automatically generated array would be 'gen_array'
 *       - The key for user generated data should have a prefix 'user_'
 *         - Ex: Array data the user enters in the textbox should have a key 'user_array'
 */
function logExerciseInit(avName, initData) {
  if (serverEnabled()) {
    logUserAction(avName, 'exercise_initialization', JSON.stringify(initData));
  }
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
    // If triggered from a module page or an AV in an iFrame
    if (isModulePage() || (isAVPage() && isModulePage(window.parent.document))) {
      logUserAction('', 'login-warn-message', 'User warned they must login to receive credit');
      alert('You must be logged in to receive credit');
      localStorage.warn_login = "false";
    }
  }
}

/**
 * Default function to handle logging button clicks
 */
function buttonLogger() {
/*jslint validthis: true */
  if (serverEnabled()) {
    var avName = getAVName();

    if (avName === "" && this.form) {
      avName = this.form.id;
    }

    var type = "";

    if (this.id !== "") {
      type = this.type + "-" + this.id;
    } else {
      console.warn(this.value + " button does not have an ID");
    }

    var desc = "";

    // TODO: Find a better way to get the description for a button
    if (this.hasAttribute('data-desc')) {
      desc = this.getAttribute('data-desc');
    } else if (this.value !== "") {
      desc = this.value;
    } else if (this.id !== "") {
      desc = this.id;
    } else if (this.name !== "") {
      desc = this.name;
    }

    console.debug("buttonLogger: (" + avName + ", " + type + ", " + desc + ")");  // FOR TESTING

    logUserAction(avName, type, desc);
  }
}

/**
 * Default function to handle logging hyperlink clicks
 */
function linkLogger() {
/*jslint validthis: true */
  if (serverEnabled()) {

    var avName = getAVName();

    if (avName === "" && this.form) {
      avName = this.form.id;
    }

    var type = "";

    if (this.id !== "") {
      type = "hyperlink-" + this.id;
    } else {
      console.warn("Link (" + this.href + ") does not have an ID");
    }

    var desc = $(this).html() + " (" + this.href + ")";

    // TODO: Find a better way to log links
    logUserAction(avName, type, desc);

    console.debug("linkLogger: (" + avName + ", " + type + ", " + desc + ")");  // FOR TESTING
  }
}

/**
 * Stores the user's score for an AV / exercise
 */
function storeExerciseScore(avName, type, score) {
  if (serverEnabled()) {
    // Don't give credit for this exercise
    if (!isCreditAllowed()) {
      return;
    }

    // Adjust the correct value to account for automatically fixed steps
    score.correct = score.student - score.fix;

    var score_data = {};

    // Get stored score_data if it exists
    if (inLocalStorage("score_data")) {
      score_data = getJSON(localStorage.score_data);
    }

    // Store data if no data for the current AV is already stored or
    // update the score data if the given score data is >= what is stored
    if (!score_data[avName] || score.correct >= score_data[avName].score.correct) {
      var data = {};
      data.submit_time = (new Date()).getTime();
      data.module_name = moduleName;
      data.score = score;
      data.type = type;
      data.attempt = 0;    // TODO: Figure out how to record attempts
      data.total_time = 0;  // TODO: Figure out how to record total time
      score_data[avName] = data;

      localStorage.score_data = JSON.stringify(score_data);
    }
  }
}

/**
 * Sends the event data logged in localStorage to the server
 */
function sendEventData() {
  if (serverEnabled()) {
    var event_list = getJSON(localStorage.event_data);

    // Return if there is no data to send
    if (!event_list || event_list.length === 0) {
      return true;
    }

    var username = getUsername();

    if (!userLoggedIn()) {
      username = "phantom";
    }

    var json_data = {};
    json_data.username = username;
    // Timestamp the submission so we can calculate offset from server time
    json_data.submit_time = (new Date()).getTime();
    json_data.actions = JSON.stringify(event_list);    // TODO: Find a better way to send this list so that Django can still interpret it

    // Send the data to the server
    jQuery.ajax({
      url:   server_url + "/api/v1/user/exercise/avbutton/",
      type:  "POST",
      data: json_data,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);
        // Clear the saved data once it has been successfully transmitted
        if (data.success) {
          localStorage.removeItem('event_data');
        }
      },
      error: function (data) { console.error("ERROR " +  JSON.stringify(data)); }
    });
  }
}

/**
 * Sends a the score for a single AV
 */
function sendExerciseScore(avName) {
  if (serverEnabled()) {
    // Load stored score data from localStorage
    var score_data = {};
    if (inLocalStorage("score_data")) {
      score_data = getJSON(localStorage.score_data);
    }

    // Return if there is no score data
    if (score_data === {}) {
      return;
    }

    if (userLoggedIn()) {
      var username = getUsername();

      var json_data = score_data[avName];
      json_data.av = avName;
      json_data.username = username;

      jQuery.ajax({
        url:   server_url + "/api/v1/user/exercise/attemptpe/",
        type:  "POST",
        data: json_data,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          // Clear the saved data once it has been successfully transmitted
          if (data.success) {
            delete score_data[avName];
            localStorage.score_data = JSON.stringify(score_data);
          }

          // Check whether the user is proficient
          if (data.proficient) {
            updateExerProfDisplays(avName, true);

            // The user just obtained proficiency with an exercise, check to see if they finished the module
            if (isModulePage()) {
              checkModuleProficiency();
            } else if (isAVPage() && isModulePage(window.parent.document)) {
              window.parent.checkModuleProficiency();
            }
          }
        },
        error: function (data) {
          //console.error("ERROR " +  JSON.stringify(data));
        }
      });
    } else {
      // If a user performs an action that submits an AV score,
      // but they are not logged in, warn them they will not
      // receive credit without logging in
      warnUserLogin();
    }
  }
}

//TODO: Should send these as a batch if possible, but Django doesn't seem to like that
/**
 * Loops through and sends all stored AV scores
 */
function sendExerciseScores() {
  if (serverEnabled()) {
    // Get stored score_data if it exists
    if (inLocalStorage("score_data")) {
      var score_data = getJSON(localStorage.score_data);

      var names = Object.keys(score_data);

      for (var i = 0; i < names.length; i++) {
        sendExerciseScore(names[i]);
      }
    }
  }
}

/**
 * Sends all stored event and AV score data to the server
 */
function flushStoredData() {
  if (serverEnabled()) {
    sendEventData();
    sendExerciseScores();
  }
}

/**
 * Convenience function to simply award completion of an exercise
 */
function awardCompletionCredit(avName) {
  if (serverEnabled()) {
    var score = {};
    score.student = 1;
    score.correct = 1;
    score.total = 1;
    score.undo = 0;
    score.fix = 0;

    // Store completion credit
    storeExerciseScore(avName, "pe", score);
    flushStoredData();

    // Award anonymous user credit
    if (!userLoggedIn()) {
      updateExerProfDisplays(avName, true);
    }
  } else {
    updateExerProfDisplays(avName, true);
  }
}

/*
// TODO: Fix the Django server to accept batch scores
// Send a batch of AV scores
function sendExerciseScores() {
  if (serverEnabled()) {
    // Load stored score data from localStorage
    var score_data = {};
    if (inLocalStorage("score_data")) {
      score_data = getJSON(localStorage.score_data);
    }

    // Return if there is no score data
    if (score_data === {}) {
      return;
    }

    if (userLoggedIn()) {
      var username = getUsername();

      var json_data = {};
      json_data.username = username;
      // Timestamp the submission so we can calculate offset from server time
      json_data.submit_time = (new Date()).getTime();
      json_data.avs = score_data;

      jQuery.ajax({
        url:   server_url + "/api/v1/user/exercise/attemptpe/",
        type:  "POST",
        data: json_data,
        contentType: "application/json; charset=utf-8",
        datatype: "json",
        xhrFields: {withCredentials: true},
        success: function (data) {
          data = getJSON(data);

          // Clear the saved data once it has been successfully transmitted
          if (data.success) {
            localStorage.removeItem('score_data');
          }

          // Check whether the user is proficient
          updateAllProfDisplays();
        },
        error: function (data) {
          //console.error("ERROR " +  JSON.stringify(data));
        }
      });
    } else {
      alert('You must be logged in to receive credit');
    }
  }
}
*/

//*****************************************************************************
//***********         LOGGING AND LISTENING FOR JSAV EVENTS         ***********
//*****************************************************************************

if (serverEnabled()) {
  $(window).on('beforeunload', function () {
    // Log the browser unload event
    logUserAction('', 'window-unload', 'User closed or refreshed the page');
  });

  // Listen for JSAV events
  $("body").on("jsav-log-event", function (e, data) {
    console.debug(data);    // FOR TESTING

    // Parse the AV name from ID returned by the JSAV event
    data.av = data.av.replace('_avc', '');

    data.desc = data.type;

    var flush = false;

    var ssEvents = ['jsav-forward', 'jsav-backward', 'jsav-begin', 'jsav-end', 'jsav-exercise-model-forward', 'jsav-exercise-model-backward', 'jsav-exercise-model-begin', 'jsav-exercise-model-end'];

    // TODO: Make sure all additional fields of JSAV events are logged somewhere
    if (ssEvents.indexOf(data.type) > -1) {
      data.desc = data.currentStep + " / " + data.totalSteps;
    } else if (data.type === "jsav-exercise-model-open") {
      // Warn them if we haven't already that they can't
      // receive credit for the current instance of the exercise
      if (allowCredit) {
        alert("You can no longer receive credit for the current instance of this exercise.\nClick 'Reset' or refresh the page to get a new problem instance.");
        allowCredit = false;

        // Hide the score widget and display and appropriate message in its place
        $('span.jsavscore').hide();
        $('span.jsavscore').parent().append('<span id="credit_disabled_msg">Credit not given for this instance</span>');
      }
    } else if (data.type === "jsav-exercise-reset") {
      // If the student looked at the model answer for the previous
      // attempt, allow them to get credit for the new instance
      if (!allowCredit) {
        allowCredit = true;
        $('span.jsavscore').show();
        $('#credit_disabled_msg').remove();
      }
    } else if (data.type === "jsav-array-click") {
      data.desc = "User clicked element " + data.index + " of " + data.arrayid;
    } else if (data.type === "jsav-exercise-grade-change") {
      data.desc = JSON.stringify(data.score);

      // On grade change events, log the user's score and submit it
      storeExerciseScore(data.av, "pe", data.score);
      flush = true;

      // TODO: Proficiency threshold for anonymous users is currently hardcoded to 100%, reimplement this if we ever get access to the proficiency threshold on the client-side
      if ((!serverEnabled() || !userLoggedIn()) && data.score.student === data.score.total) {
        // If no user is logged in (whether or not the server is
        // enabled), allow the client to determine user proficiency
        updateExerProfDisplays(data.av, true);
      }
    }

    // Save the event in localStorage
    logEvent(data);

    if (data.type === "jsav-forward" && data.currentStep === data.totalSteps) {
      // TODO: If user is already proficient don't need to send grade data again?

      // When a user reaches the end of an AV, store and submit a completion score
      var score = {};
      score.student = data.currentStep;
      score.correct = data.currentStep;
      score.total = data.totalSteps;
      score.fix = 0;
      score.undo = 0;

      // Store and submit the score
      storeExerciseScore(data.av, "ss", score);
      flush = true;

      if (!serverEnabled() || !userLoggedIn()) {
        // If no user is logged in (whether or not the server is
        // enabled), allow the client to determine user proficiency
        updateExerProfDisplays(data.av, true);
      }
    }

    if (flush) {
      flushStoredData();
    }
  });
}

//*****************************************************************************
//***********            Runs When Page Finishes Loading            ***********
//*****************************************************************************

$(document).ready(function () {
  //Make sure localStorage is enabled
  var localStorageEnabled = function () {
    var enabled, uid = +new Date();
    try {
      localStorage[uid] = uid;
      enabled = (localStorage[uid] === uid);
      localStorage.removeItem(uid);
      return enabled;
    }
    catch (e) {
      return false;
    }
  };

  if (!localStorageEnabled) {
    if (jQuery) {
      warn("You must enable DOM storage in your browser.", false);
    }
    return;
  }

  // Initialize module name
  moduleName = getModuleName();

  // Add buttonLogger to all buttons on the page
  $(':button').each(function (index, item) {
    // Don't attach handler to JSAV managed controls
    if (!isJSAVControl(item)) {
      $(item).click(buttonLogger);
    }
  });

  // Add linkLogger to all links on the page
  $('a').each(function (index, item) {
    // Don't attach handler to JSAV managed controls
    if (!isJSAVControl(item) && $(item).attr("id") !== "logon" && $(item).attr("class") !== "close") {
      $(item).click(linkLogger);
    }
  });
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