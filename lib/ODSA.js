"use strict";
/*global alert: true, console: true, warn: true, getModuleName */
// getModuleName() is defined in this file, but it is listed as a global so it can be used
// to initialize moduleName at the top, to keep all global vars together

// Set server_url = "" in order to disable server communication and most logging
var server_url = "https://opendsa.cc.vt.edu";
// Eric's desktop: 128.173.55.223:8080

/**
 * The targetOrigin for sending postMessages from embedded AVs to the parent window
 */
var moduleOrigin = "http://algoviz.org";

// Stores the module name so we don't have to look it up every time
// Must be set here, if placed in document.ready() AV initialize()
// methods will run before it and moduleName will not be initialized
var moduleName = getModuleName();  // TODO: Initialize this in .ready()

var AV_NAME = '';

/**
 * A unique instance identifier, used to group interaction events from a single instance
 */
var uiid = +new Date();

var debugMode = false;

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

function isDefined(obj) {
  return (typeof obj !== 'undefined');
}

function inLocalStorage(varName) {
  return localStorage[varName];
}

function getUsername() {
  if (inLocalStorage("opendsa")) {
    var session = JSON.parse(localStorage.opendsa);
    return session.username;
  }
  return "";
}

function getSessionKey() {
  if (inLocalStorage("opendsa")) {
    var session = JSON.parse(localStorage.opendsa);
    return session.key;
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
 * Returns true if the given element is a JSAV managed control
 * Relies on JSAV controls being in a container with a class that matches '.*jsav\w*control.*'
 * include "jsavexercisecontrols" and "jsavcontrols"
 */
function isJSAVControl(item) {
/*jslint regexp: true */
  return (item && item.parentElement && item.parentElement.className.match(/.*jsav\w*control.*/) !== null);
}

/**
 * Returns the given data as a JSON object
 * If given a string, converts it to JSON
 * If given a JSON object, does nothing
 */
function getJSON(data) {
  if (typeof data === 'undefined') {
    console.warn("getJSON() error: data is undefined");
    return {};
  }

  if (is('String', data)) {
    data = jQuery.parseJSON(data);
  }

  return data;
}

//*****************************************************************************
//***********                   Logging Functions                   ***********
//*****************************************************************************

/**
 * Checks the given JSON object to ensure it has the correct fields
 *     data - a JSON object representing an event
 */
function isValidEvent(data) {
  var missingFields = [];

  if (typeof data.type === "undefined") {
    missingFields.push('type');
  }
  if (typeof data.desc === "undefined") {
    missingFields.push('desc');
  }
  if (typeof data.av === "undefined") {
    missingFields.push('av');
  }
  if (typeof data.uiid === "undefined") {
    missingFields.push('uiid');
  }

  if (missingFields.length === 1) {
    console.warn("Invalid event, '" + missingFields[0] + "' is undefined");
    console.log(data);
    return false;
  } else if (missingFields.length > 1) {
    console.warn("Invalid event, '" + missingFields.join(', ') + "' are undefined");
    console.log(data);
    return false;
  }

  return true;
}

/**
 * Appends the given data to the event log
 *     data - A JSON string or object containing event data, must contain the following fields: 'av', 'type', 'desc', 'uiid'
 */
function logEvent(data) {
  if (debugMode) {
    console.group('logEvent(' + data + ')');
    console.debug(data);
  }

  if (serverEnabled()) {
    data = getJSON(data);

    // If av and uiid are not provided, give them default values
    if (typeof data.av === "undefined") {
      data.av = '';
      data.uiid = '';
    }

    // Ensure given JSON data is a valid event
    if (!isValidEvent(data)) {
      console.warn('logEvent() error: Invalid event');
      console.log(data);

      if (debugMode) {
        console.groupEnd();
      }
      return;
    }

    // Don't log events without either an AV name or a module name
    // Getting duplicates of some events where one is missing both
    // Currently all legitimate events should have one or the other
    if (data.av === "" && moduleName === "") {
      if (debugMode) {
        console.warn('Exercise name and moduleName cannot both be ""');
        console.groupEnd();
      }

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

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Logs a custom user interaction
 *     type - String identifying the type of action
 *     desc - Human-readable string describing the action
 *     exerName - Name of the exercise with which the action is associated
 *     eventUiid - A value that identifies a unique exercise instance, used to tie exercise events to a specific instance
 */
function logUserAction(type, desc, exerName, eventUiid) {
  exerName = (exerName) ? exerName : AV_NAME;
  eventUiid = (eventUiid) ? eventUiid : uiid;

  if (debugMode) {
    console.group('logUserAction(' + type + ', ' + desc + ', ' + exerName + ', ' + eventUiid + ')');
  }

  if (serverEnabled()) {
    var eventData = {};
    eventData.type = type;
    eventData.desc = desc;
    eventData.av = exerName;
    eventData.uiid = eventUiid;
    logEvent(eventData);
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Sends the event data logged in localStorage to the server
 */
function sendEventData() {
  if (debugMode) {
    console.group('sendEventData()');
  }

  if (serverEnabled()) {
    var eventData = {};

    // Read and immediately delete event_data (will be re-stored if send fails)
    var eventStr = localStorage.event_data;
    localStorage.removeItem('event_data');

    // Return if there is no data to send
    if (!eventStr || eventStr === '' || eventStr === '[]') {
      if (debugMode) {
        console.debug('No event data to send');
        console.groupEnd();
      }
      return true;
    }

    var sessionKey = getSessionKey();
    eventData.key = (sessionKey) ? sessionKey : 'phantom-key';
    // Timestamp the submission so we can calculate offset from server time
    eventData.submit_time = (new Date()).getTime();
    eventData.actions = eventStr;    // TODO: Find a better way to send this list so that Django can still interpret it

    if (debugMode) {
      console.debug('Sending eventData:');
      console.debug(eventData);
    }

    // Send the data to the server
    jQuery.ajax({
      url:   server_url + "/api/v1/user/exercise/avbutton/",
      type:  "POST",
      data: eventData,
      contentType: "application/json; charset=utf-8",
      datatype: "json",
      xhrFields: {withCredentials: true},
      success: function (data) {
        data = getJSON(data);

        if (!data.success) {
          console.group('Event data rejected by server');
          console.debug(eventData);
          console.groupEnd();
        }
      },
      error: function (data) {
        data = getJSON(data);

        if (data.status === 400) {
          // If status === 400 (Bad request) it means some of the data was rejected
          // by the server and that we should discard that data to prevent future failures
          console.group('Event data rejected by server');
          console.debug(eventData);
          console.groupEnd();
        } else {
          // All other errors should cause the event data to be put back into the buffer

          // Trigger event which will cause the expired session to be handled appropriately
          if (data.status === 401) {
            $('body').trigger('odsa-session-expired', [eventData.key]);
          } else {
            console.group("Error sending event data");
            console.debug(data);
            console.groupEnd();
          }

          // Client couldn't communicate with server
          // TODO: Fix localStorage concurrency issue
          if (inLocalStorage('event_data')) {
            // Prepend the event data that failed to send to what is currently in localStorage
            var newData = eventStr.slice(0, -1) + ',' + localStorage.event_data.slice(1);
            localStorage.event_data = newData;
          } else {
            localStorage.event_data = eventStr;
          }
        }
      }
    });
  }

  if (debugMode) {
    console.groupEnd();
  }
}

/**
 * Default function to handle logging button clicks
 */
function buttonLogger() {
  /*jslint validthis: true */
  if (serverEnabled()) {
    var type = "",
        desc = "";

    if (this.id !== "") {
      type = this.type + "-" + this.id;
    } else {
      type = this.type;
      console.warn(this.value + " button does not have an ID");
    }

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

    logUserAction(type, desc);
  }
}

/**
 * Default function to handle logging hyperlink clicks
 */
function linkLogger() {
/*jslint validthis: true */
  if (serverEnabled()) {

    var type = "",
        desc = {href: this.href, text: $(this).html};

    if (AV_NAME === "" && this.form) {
      AV_NAME = this.form.id;
    }

    if (this.id !== "") {
      type = "hyperlink-" + this.id;
    } else {
      type = "hyperlink";
      console.warn("Link (" + this.href + ") does not have an ID");
    }

    // TODO: Find a better way to log links
    logUserAction(type, desc);
  }
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