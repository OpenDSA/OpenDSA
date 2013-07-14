"use strict";
/*global alert: true, console: true, warn: true, ODSA */

(function ($) {
  /**
   * Stores the module name so we don't have to look it up every time
   * Must be set here, if placed in document.ready() AV initialize()
   * methods will run before it and moduleName will not be initialized
   *
   * Unlike referencing ODSA.SETTINGS.MODULE_NAME, code referencing moduleName
   * will not be affected if ODSA.SETTINGS.MODULE_NAME is changed (including at runtime)
   */
  var moduleName;

  /**
   * Local settings object that makes it easier to access ODSA.SETTINGS and allow better minification
   */
  var settings;

  /**
   * A unique instance identifier, used to group interaction events from a single instance
   */
  var uiid = +new Date();

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


  //*****************************************************************************
  //***********                   Utility Functions                   ***********
  //*****************************************************************************
  /**
   * Extracts, decodes and returns the given parameter from the URL
   *   - Based on http://stackoverflow.com/questions/1403888/get-url-parameter-with-jquery
   */
  function getURLParam(name) {
    var param = new RegExp('[?|&]' + name + '=' + '(.+?)(&|$)').exec(location.href);
    return (param) ? decodeURIComponent(param[1]) : "";
  }
  
  // Load necessary settings on embedded pages from the URL
  if (typeof ODSA === "undefined") {
    var odsaSettings = {};
    odsaSettings.BOOK_NAME = getURLParam('bookName');
    odsaSettings.SERVER_URL = getURLParam('serverURL');
    odsaSettings.MODULE_ORIGIN = getURLParam('moduleOrigin');
    odsaSettings.MODULE_NAME = getURLParam('module');
    
    // If MODULE_ORIGIN is not specified, assume they are on the same domain
    if (odsaSettings.MODULE_ORIGIN === '') {
      odsaSettings.MODULE_ORIGIN = location.protocol + '//' + location.host;
    }

    window.ODSA = {};
    window.ODSA.SETTINGS = odsaSettings;
  }

  settings = ODSA.SETTINGS;

  // Provide a warning if HTTPS is not used for communication with the backend
  if (settings.SERVER_URL !== '' && !settings.SERVER_URL.match(/^https:/)) {
    console.warn('Backend communication should use HTTPS');
  }

  /**
   * Constant storing the name of the AV on which ODSA.js is loaded
   * If ODSA.js is loaded on a module page, this value will remain ""
   * Otherwise, if loaded on an AV page, this value will be initialized in opendsaAV.js
   */
  settings.AV_NAME = '';

  /**
   * Returns true if localStorage.DEBUG_MODE is set to true
   */
  function inDebugMode() {
    return localStorage.DEBUG_MODE === 'true';
  }
  
  /**
   * Returns correct type information.  Bypasses broken behavior of 'typeof'.
   * `typeof` should be avoided at all costs (unless checking if a var is defined).
   *
   * Based on 'is' from: http://bonsaiden.github.com/JavaScript-Garden/
   * See https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/ for more information
   */
  function getType(obj) {
    if (typeof obj !== "undefined") {
      // Parse the type from the Object toString output
      return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
    }
    return "undefined";
  }

  function getUsername() {
    if (localStorage.session) {
      var session = JSON.parse(localStorage.session);
      return session.username;
    }
    return "guest";
  }

  function getSessionKey() {
    if (localStorage.session) {
      var session = JSON.parse(localStorage.session);
      return session.key;
    }
    return "";
  }

  /**
   * Returns whether or not a user is currently logged in
   */
  function userLoggedIn() {
    return localStorage.session;
  }

  /**
   * Returns true if system is configured to use a metrics collection server
   */
  function serverEnabled() {
    return (settings.SERVER_URL !== "");
  }

  /**
   * Rounds the given number to a max of 2 decimal places
   */
  function roundPercent(number) {
    return Math.round(number * 100) / 100;
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
    if (inDebugMode()) {
      console.group('getJSON()');
      console.debug(JSON.stringify(data));
    }

    if (typeof data === 'undefined') {
      if (inDebugMode()) {
        console.warn("getJSON() error: data is undefined");
        console.groupEnd();
      }
      return {};
    }

    if (getType(data) === "string") {
      data = jQuery.parseJSON(data);
    }

    if (inDebugMode()) {
      console.groupEnd();
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
   * 'module_name' and 'tstamp' will be appended automatically by this function
   *
   *   data - A JSON string or object containing event data, must contain the following fields: 'av', 'type', 'desc', 'uiid'
   */
  function logEvent(data) {
    if (inDebugMode()) {
      console.group('logEvent(' + data + ')');
      console.debug(data);
    }

    if (serverEnabled()) {
      data = getJSON(data);

      // List of attributes the event data is required to have
      var reqAttrib = ['av', 'desc', 'module_name', 'steps_fixed', 'tstamp', 'type', 'uiid'];

      // Loop through all attributes and remove any unnecessary ones
      // (if the server will ignore them, no reason for us to store and send them)
      for (var prop in data) {
        if (data.hasOwnProperty(prop) && reqAttrib.indexOf(prop) === -1) {
          // Data has a property that the server will ignore, discard it
          if (inDebugMode()) {
            console.warn('Discarding property: ' + prop);
          }
          delete data.prop;
        }
      }

      // If av and uiid are not provided, give them default values
      if (typeof data.av === "undefined") {
        data.av = '';
      }
      if (typeof data.uiid === "undefined") {
        data.uiid = uiid;
      }

      // Ensure given JSON data is a valid event
      if (!isValidEvent(data)) {
        console.warn('logEvent() error: Invalid event');
        console.log(data);

        if (inDebugMode()) {
          console.groupEnd();
        }
        return;
      }

      // Don't log events without either an AV name or a module name
      // Getting duplicates of some events where one is missing both
      // Currently all legitimate events should have one or the other
      if (data.av === "" && moduleName === "") {
        if (inDebugMode()) {
          console.warn('Exercise name and moduleName cannot both be ""');
          console.groupEnd();
        }

        return;
      }

      data.module = moduleName;

      // Add a timestamp to the data
      if (data.tstamp) {
        // Convert existing JSAV timestamp from ISO format to milliseconds
        data.tstamp = new Date(data.tstamp).getTime();
      } else {
        data.tstamp = (new Date()).getTime();
      }

      // Retrieve existing data from localStorage if it exists
      var eventData = getJSON(localStorage.event_data);

      // If event_data does not have an entry for the current book, create one
      if (!eventData[settings.BOOK_NAME]) {
        if (inDebugMode()) {
          console.debug('Creating a new event_data entry for ' + settings.BOOK_NAME);
        }
        eventData[settings.BOOK_NAME] = [];
      }

      eventData[settings.BOOK_NAME].push(data);

      localStorage.event_data = JSON.stringify(eventData);
    }

    if (inDebugMode()) {
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
    exerName = (exerName) ? exerName : settings.AV_NAME;
    eventUiid = (eventUiid) ? eventUiid : uiid;

    if (inDebugMode()) {
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

    if (inDebugMode()) {
      console.groupEnd();
    }
  }

  /**
   * Sends the event data logged in localStorage to the server
   */
  function sendEventData() {
    if (inDebugMode()) {
      console.group('sendEventData()');
    }

    if (serverEnabled()) {
      // Load existing event data
      var eventData = getJSON(localStorage.event_data),
          eventStr = '';

      // Store event data for given book and immediately clear and save it (will be re-stored if send fails)
      if (eventData[settings.BOOK_NAME]) {
        eventStr = JSON.stringify(eventData[settings.BOOK_NAME]);
        eventData[settings.BOOK_NAME] = [];
        localStorage.event_data = JSON.stringify(eventData);
      }

      // Return if there is no data to send
      if (eventStr === '' || eventStr === '[]') {
        if (inDebugMode()) {
          console.debug('No event data to send');
          console.groupEnd();
        }
        return true;
      }

      var sessionKey = getSessionKey();
      eventData = {}; // Clear eventData
      eventData.key = (sessionKey) ? sessionKey : 'phantom-key';
      eventData.book = settings.BOOK_NAME;
      eventData.actions = eventStr;    // TODO: Find a better way to send this list so that Django can still interpret it

      if (inDebugMode()) {
        console.debug('Sending eventData:');
        console.debug(eventData);
      }

      // Send the data to the server
      jQuery.ajax({
        url:   settings.SERVER_URL + "/api/v1/user/exercise/avbutton/",
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

            var key = eventData.key,
                actions = getJSON(eventStr);

            // Client couldn't communicate with server
            // TODO: Fix localStorage concurrency issue
            eventData = getJSON(localStorage.event_data);

            for (var i = 0; i < actions.length; i++) {
              eventData[settings.BOOK_NAME].push(actions[i]);
            }

            localStorage.event_data = JSON.stringify(eventData);


            if (data.status === 401) {
              // Trigger event which will cause the expired session to be handled appropriately
              $('body').trigger('odsa-session-expired', [key]);
            } else {
              console.group("Error sending event data");
              console.debug(data);
              console.groupEnd();
            }
          }
        }
      });
    }

    if (inDebugMode()) {
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

      if (settings.AV_NAME === "" && this.form) {
        settings.AV_NAME = this.form.id;
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
    // Must be initialized here because ODSA.SETTINGS.MODULE_NAME is contained within the HTML of the page
    moduleName = settings.MODULE_NAME;
    
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

  //*****************************************************************************
  //***********            Creates global ODSA.UTILS object           ***********
  //*****************************************************************************

  // Add publically available functions to a globally accessible ODSA.UTILS object
  var odsaUtils = {};

  odsaUtils.serverEnabled = serverEnabled;
  odsaUtils.inDebugMode = inDebugMode;
  odsaUtils.getUsername = getUsername;
  odsaUtils.getSessionKey = getSessionKey;
  odsaUtils.userLoggedIn = userLoggedIn;
  odsaUtils.getJSON = getJSON;
  odsaUtils.logUserAction = logUserAction;
  odsaUtils.logEvent = logEvent;
  odsaUtils.sendEventData = sendEventData;
  odsaUtils.roundPercent = roundPercent;
  odsaUtils.getType = getType;
  window.ODSA.UTILS = odsaUtils;
}(jQuery));
