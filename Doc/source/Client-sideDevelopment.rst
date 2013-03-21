.. _Client-sideDevelopment:

=======================
Client-side Development
=======================

-----------------------------
AV Developer Responsibilities
-----------------------------

The OpenDSA client-side framework automatically handles as much logging as possible.  However, developers must write their AVs to be compliant with the framework to ensure proper logging (**Note**: Non-compliant AVs will fail silently, so follow the instructions closely and test your AV to ensure the data you expect to be logged is logged).

* Follow standard HTML layout as close as possible (use templates)

  * Ensures proper CSS and scripts are loaded including: ``JSAV.css``, ``odsaAV-min.css``, ``jquery.min.js``, ``jquery-ui.min.js``, ``jsav-min.js``, ``odsaUtils-min.js``, ``odsaAV-min.js``
  * Provides a standard appearance for all AVs
  * Makes maintenance and systematic changes easier

* Use descriptive IDs to reference page elements

  * All IDs on a single page must be unique, allowing reliable access to a specific element
  * The framework will automatically attach loggers to buttons and links (unless they appear inside a contain with a class that matches '.*jsav\w*control.*') and the data these loggers collect identifies interactive elements based on their ID.  Using descriptive IDs will make data analysis much easier.
  * Do not place elements inside a contain with a class that matches ``'.*jsav\w*control.*'``.  JSAV controls appear within these containers but are logged by a different mechanism so the automatic button and link loggers ignore the contents of these containers.

* Attach JSAV array click handlers through JSAV rather than jQuery

  * Example: ``theArray.click(function(index){...});`` rather than ``$('#arrayId').on('click', ".jsavindex", function(){...});``

* Log initial exercise state

  * If the only input to your AV is an array of input values (such as most of the Sorting AVs), you can use ``ODSA.AV.processArrayValues()`` which will automatically log the array values used to initialize your AV
  * If ``ODSA.AV.processArrayValues()`` does not fit your needs, you can all ``ODSA.AV.logExerciseInit()`` explicitly.  Refer to the function documentation in ``odsaAV.js`` for more information on logging conventions.

* Take advantage of macro-logging

  * As a developer, if you feel something is important to log (whether its the state of the exercise, some sort of interaction or simply a comment) you can use either ``ODSA.UTILS.logUserAction()`` or ``ODSA.UTILS.logEvent()``.  Refer to the function documentation in ``odsaUtils.js`` for more information on how to use these functions.  
  * Allows developers to describe what is happening at a given step to make it easier when analyzing problem steps to identify what step the students are missing


---------------
Client-side API
---------------

ODSA.AV
=======

* **logExerciseInit** - generates an event used to log the initial state of an AV or exercise
* **awardCompletionCredit** - generates an event which triggers the framework to give a user credit for an exercise
* **initArraySize(min, max, selected)** - initializes the arraysize drop down list with the range of numbers from ``min`` to ``max`` with ``selected`` selected
* **reset(flag)** - resets the AV to its original state

  * The ``reset()`` function works by saving the HTML from the ``avcontainer`` element on page load and using it to replace the HTML in the ``avcontainer`` when reset it called.  When JSAV is initialized it alters the contents of the container, after the HTML has been saved.  When JSAV is initialized on page load but never reinitialized, the first reset clears the elements JSAV  generated, breaking the AV.  Using this ``reset()`` method, JSAV must be reinitialized after each reset in order for the AV to function properly.  We recommend reinitializing JSAV after calling ``ODSA.AV.reset(true)`` in the ``runit()`` method.
  * The ``runit()`` method should call ``ODSA.AV.reset(true)`` to ensure the avcontainer is cleared and ready for the next instance.

* **processArrayValues(upperLimit)** - validates the array values a user enters or generates an array of random numbers if none are provided

ODSA.MOD
========

* **serverEnabled()** - returns whether or not the backend server is enabled
* **getUsername()** - returns the username stored in local storage
* **getSessionKey()** - returns the session key stored in local storage
* **userLoggedIn()** - returns whether or not a user is logged in
* **getJSON(data)** - converts the input string to a JSON object, if given a JSON object, returns it
* **logUserAction(type, desc, exerName, eventUiid)** - logging function that takes the event type, a description of the event and the name and uiid of the exercise with which the event is associated
* **logEvent(data)** - flexible logging function that appends whatever data is specified to the event log, provided it meets the criteria for a valid event
* **sendEventData()** - flushes the buffered event data to the server
* **roundPercent(number)** - rounds the given number to a max of 2 decimal places

ODSA.UTILS
==========

* **STATUS** - pseudo-enumerated variable used to define the different states of proficiency
* **getProficiencyStatus(name, username, book)** - returns whether or not local storage has a record of the given user being proficient with the given exercise or module in the given book
* **syncProficiency()** - queries ``getgrade`` endpoint to obtain proficiency status for all exercises and modules

---------------
Tips and Tricks
---------------

Truthy and Falsy
================

Be aware that values in JavaScript will not always evaluate the way you expect when used in conditionals.  When comparing objects use **strict equal** (``===``) and **strict not equal** (``!==``) to ensure values are compared by type and value.  When testing whether a variable contains useful information you can generally use the value inself in the conditional, i.e. ``if (testCondition) {...}``.  While this is 'sloppy', it works unless you expect a ``0``, ``false`` of ``""`` to be valid.  If you want a more formal test, you can use ``typeof testCondition === "undefined"``.  This expression will be true only if ``testCondition`` has never been assigned a value.  

For more information please refer to `Truthy and Falsy: When All is Not Equal in JavaScript <http://www.sitepoint.com/javascript-truthy-falsy/>`_.


HTML5 postMessage
=================

We have no guarantee that content embedded in iFrames (such s AVs and Exercises) will be hosted on the same domain as the modules.  In order to create a robust application communication between the parent and child pages should take place using ``postMessage`` rather than referencing elements or functions through the ``contentDocument`` or ``contentWindow.document`` of the iFrame element or ``window.parent`` or ``window.top``.


Encapsulation
=============

You should always wrap your JavaScript code in an anonymous function to prevent the DOM from getting cluttered and to prevent outside access to specific data or functions.  All functions and global variables defined within an anonymous function are visible to each other and can be used normally.  However, sometimes you will need to define a publically accessible function that interacts with functions you wish to keep private.  The simplest way to do this is to write your JavaScript as normal within an anonymous function and then assign specific "public" functions to be properties of the ``window`` object.  Please refer to the example below::

  (function() {
    var privateData = 0;
    
    function privFunct() {
      alert('ODSA private function');
    }
    
    function publicFunct() {
      privFunct();
    }
    
    var ODSA = {};
    ODSA.publicFunct = publicFunct;
    window.ODSA = ODSA;
  }(jQuery));

Another alternative is::

  (function() {
    var ODSA = {};
    
    function privFunct() {
      alert('ODSA private function');
      ODSA.publicFunct();
    }
    
    ODSA.publicFunct = function() {
      alert('ODSA publicFunct');
    }
    
    ODSA.callPrivFunct = function() {
      privFunct();
    }
    
    window.ODSA = ODSA;
  }(jQuery));

In both of these example, ``publicFunct()`` can be referenced outside the anonymous function using ``ODSA.publicFunct()`` (or ``window.ODSA.publicFunct()``).  We prefer the first method because it looks more like a standard JavaScript file, internal function references are simpler and its easy to add all the public functions in one place, giving the developer greater control over what they make public.


---------------
Troubleshooting
---------------

jQuery Selectors
================

jQuery selectors can be very useful, but do have some limitations.  For instance, when using jQuery to reference an element by ID, the ID cannot contain specific characters such as a period, a plus sign or spaces.  While its better to avoid them if possible, if you find that you must use these or other invalid characters, use ``$('[id="' + objID + '"]')``.


Proficiency Exercises
=====================

* If your AV doesn't show up immediately but shows up as soon as you advance the slideshow, make sure you ran: ``jsav.displayInit();``
* If you are having difficulties with variables managed by JSAV

  * Make sure you use ``.value()`` to access the variables value, otherwise you get an object rather than the string or number you most likely want
  * Make sure you use ``.value(newValue)`` to change the value of the variable, assignment using '=' doesn't work

* If your fixState function successfully changes the state of everything, but says you are getting all subsequent correct answers wrong and undoing everything to the state where you first made a mistake, make sure you are calling ``exercise.gradeableStep();``

