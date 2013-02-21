.. _Client-sideFramework:

=============================
OpenDSA Client-Side Framework
=============================

----------
Data Model
----------

Exercises
=========

* Each module page creates an 'exercises' object on page load.  This object stores important information about each exercise including:

  * Points - the number of points the exercise is worth
  * Required - whether or not the exercise is required for module proficiency
  * Threshold - the minimum score a user must receive to obtain proficiency 
  * Type - the type of exercise
  
    * 'ka' for Khan Academy style exercises
    * 'pe' for proficiency exercises
    * 'ss' for slideshows
    
  * uiid (unique instance identifier) - a code that uniquely identifies an instance of an exercise, used to group log events

Score data
==========

* When a user completes an exercise, a score object is generated and saved to a buffer in local storage (assigned to a specific book and user).  The OpenDSA framework will attempt to send the score to the server immediately.  If it is successful, the buffered score data is removed, otherwise it remains in local storage and will be resent at a later time or when the user clicks the 'Resubmit' button associated with an exercise.
* If no user is logged in, score data will still be buffered, but not sent to the server.  When a user logs in, all anonymous score data is awarded to that user.

Example of localStorage.score_data::

  {
    "guest": {
      "CS3114": [
        {
          "exercise":"SelsortCON1",
          "submit_time":1360269557116,
          "module":"SelectionSort",
          "score":1,
          "total_time":2559,
          "uiid":1360269543543
        }
      ]
    },
    "breakid":{
      "CS3114": []
    }
  }

Proficiency data
================

* For each user, the client caches information (status and number of points) about each exercise with which the user obtains proficiency.  The status can be one of several states:

  * If an exercise does not appear in a user's proficiency cache, they have not obtained proficiency for it
  * If the status is SUBMITTED, the user has obtained local proficiency and their score has been sent to the server
  * If the status is STORED, the user has obtained local proficiency and the server has successfully stored it
  * If the status is ERROR, the user has obtained local proficiency, the score was sent to the server but it was not stored successfully
  
  * When an anonymous user obtains proficiency (as determined by the client) with an exercise or module, it is immediately marked as STORED because server validation is not required
  
    * Since anonymous users don't benefit from having a server store their proficiency, we save this information in local storage so they can maintain their progress.  Unfortunately since all data is stored in the browser's local storage, an anonymous user's progress cannot be maintained between computers or even different browsers on the same computer.
    * We store the number of points an exercise is worth so that when an anonymous user views the gradebook page we are able to calculate the number of points they have earned
    
  * When a logged in user obtains proficiency, the status is set to SUBMITTED and the appropriate proficiency indicator is displayed with a message stating that the grade is being saved.  The score is sent to the server and the proficiency display(s) is updated to reflect the response obtained from the server.  If the server confirms that the user's proficiency was successfully stored, the status changes to STORED and the saving message disappears.  If an error occurs the status is set to ERROR and the saving message is replaced with an error message, a warning indicator (to draw the user's attention to the exercise) and a 'Resubmit' link which allows the user to resend their score data without recompleting the exercise.
  * Caching a logged in user's proficiency allows us to reduce network traffic caused by the client checking whether or not a user is proficient

Example of localStorage.proficiency_data::

  {
    "guest": {
      "CS3114": {
        "shellsortCON1":"STORED",
        "shellsortCON2": "STORED"
      }
    },
    "breakid": {
      "OpenDSA": {
        "shellsortCON1":"STORED",
        "shellsortCON2": "SUBMITTED"
      }
    }
  }


Interaction / Event data
========================

* We collect data about how users interact with OpenDSA for two reasons
  
  1. To continually improve OpenDSA
  2. For research purposes

* As a user interacts with OpenDSA, a variety of events are generated.  If there is a backend server enabled, we record information about these events, buffering it in local storage and sending it to the server when a flush is triggered.  If a user is logged in, we send the event data with their session key, effectively tying interaction data to a specific user, but if no user is logged in the data is sent anonymously (using 'phantom-key' as the session key).  This ensures that we are able to collect as much interaction data as possible.
* localStorage.event_data stores an object where the book name is a key and the value is a list of event object
* Each event object contains:
  
  * av - the name of the exercise with which the event is associated ("" if it is a module-level event)
  * desc - a human readable description or stringified JSON object containing additional event-specific information
  * module - the module the event is associated with
  * tstamp - a timestamp when the event occurred
  * type - the type of event
  * uiid - the unique instance identifier which allows an event to be tied to a specific instance of an exercise or a specific load of a module page

Example of localStorage.event_data::

  {
    "CS3114": [
      {
        "av":"SelsortCON1",
        "desc":"1 / 14",
        "module":"SelectionSort",
        "tstamp":1360269557116,
        "type":"jsav-forward",
        "uiid":1360269543543
      }
    ]
  }

----------------------------
Implementation and Operation
----------------------------

* The "Module Complete" message should appear on any module page once a user has received proficiency with all the required exercises unless "dispModComp" is set to "false" in the configuration file.
* With the exception of login, all data is sent to the server with a session key rather than the username.  The server is able to recover the username from the session and this should prevent data from inappropriately being sent as a different user.

  * Since anonymous users do not have sessions, anonymous user data is sent using the hardcoded value, "phantom-key", as the session key


Module Completion
=================

* In order to obtain module completion a user must complete all exercises marked as "required" in the configuration file

  * For the Guest account (anonymous user), the client determines whether the user is proficient with all required exercises
  * For logged in users, the server must confirm the user is proficient with all required exercises AND the module itself

* If a module does not have any required exercises (or no exercises at all), the "Module Complete" message will not appear unless "dispModComp" is set to "true" for the given module in the configuration file 
* If "dispModComp" is explicitly set to "false" for the given module, the "Module Complete" message will not appear even if the user completes all required exercises


Page Initialization
===================

* updateLogin() is called on page load or when the page gains focus and functions to ensure consistency between all OpenDSA pages, specifically making sure the current user appears logged in and the proficiency indicators display that user's proficiency.  Without this function, a user could log in to multiple tabs, then log out of one and still appear to be logged into the others or another user could log in and it would appear that two users were logged in on the same browser at the same time, even though all data would be submitted as the last user to log in.  updateLogin() synchronizes all the pages to prevent confusing situations.
* loadModule() is called when the page loads and when updateLogin() updates a page to reflect a new user being logged in and performs different actions in different contexts.  If the user is on the index page, loadModule() loops through all the linked module pages and calls checkProficiency() for each.  If the user is viewing a module page, one of two things happens.  If the backend server is enabled and a user is logged in, a message will be sent to the server containing all the information necessary to load the module and all exercises if they don't already appear in the database and the response from the server will contain the user's proficiency status which each exercise and the module itself (the progress is also returned which allows the client to update the progress bar on Khan Academy exercises).  If no backend server is enabled or no user is logged in, loadModule() updates the proficiency indicators based on the anonymous user's data in local storage.


Data Flow
=========

* As a user interacts with an AV, it generates events.  A listener in opendsaAV.js processes the events (logging additional event data in desc field, triggering certain AV specific events like displaying a message saying no credit will be given after viewing the model answer, etc), logs them and forwards the event to the parent page.  The parent page may or may not implement an event listener and process them further (a flag is set to indicate the event has already been logged, to prevent duplicate logging).  The module page implements such a listener and passes events from embedded pages and events generated by the module itself to processEventData().  Here events which have not been logged are logged and certain events trigger saving a user's score (namely moving forward to the last slide of a slideshow, completing a graded exercise, odsa-award-credit event used to award completion credit).  In these cases, storeExerciseScore() is called to store the user's score in localStorage with additional information about the exercise.  At the end of processEventData(), score and event data are pushed to the server, if necessary, using flushStoredData() (which calls sendEventData() and sendExercisesScores()).


Support Functions
=================

* storeStatusAndUpdateDisplays() calls storeProficiencyStatus() to store the given status in the local storage, then updates the appropriate proficiency display (whether its for an exercise or a module) and checks whether or not the user is now proficient with the module (if the user just gained proficiency with an exercise)

  * Local storage is used to cache a user's proficiency with different exercises and modules.  It supports 4 states including: no data (exercise or module does not appear in the proficiency cache), submitted (the user has obtained client-side proficiency and the score has been sent to the server for verification), stored (the user's proficiency is verified by the server or does not need to be verified as in the case with anonymous users) and error (the user's score was submitted to the server but an error occurred and the score was not successfully stored and verified).
  * If a user is logged in, the server is queried for the user's proficiency with the module, otherwise the anonymous user's proficiency is determine client-side based on the user's proficiency with the required exercises (exercises stored in the 'exercises' object for which the 'required' property is true)
  * storeProficiencyStatus(name, [status], [username]) takes an exercise or module name, a status (optional) and username (optional) and caches the given status for the given exercise / module for the given user in local storage.  If username is not specified, the current user's name is used and if status is not specified, it defaults to STORED.
  * updateProfDisplay(name) can be called with either an exercise or module name as an argument (if no argument is given, it will default to the current module name).  The function automatically detects whether the argument is an exercise or module name and updates the appropriate display(s) based on the current user's proficiency status in local storage.
  * checkProficiency(name) can be called with either an exercise or module name as an argument (if no argument is given, it will default to the current module name).  This function checks local storage for the given exercise / module and if it's found, calls updateProfDisplay() and returns.  If the exercise / module is not found, the server is queried for the user's proficiency status and when the response is received, storeStatusAndUpdateDisplays() is called to make sure the status is stored in local storage and the proficiency indicators are updated.
