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

* Make JSAV exercise options configurable (if necessary and desired)

  * If you do not change the default values of ``JSAV_EXERCISE_OPTIONS``, you do not have to do anything.
  * However, if you do change the default values of ``JSAV_EXERCISE_OPTIONS``, you must call ``ODSA.UTILS.parseURLParams()`` in order to make the exercise options configurable from the config file.  Conversely, if you want to prevent the configuration process from overriding the grading options for your exercise, you can change or reset the defaults and not call this function.
  * Developers should initialize configurable variables like this: ``var variable = (params.<variable>) ? params.<variable> : default_value;``, so that if the appropriate parameter is passed to the exercise it will be used, otherwise the exercise will default to a reasonable value

* Attach JSAV array click handlers through JSAV rather than jQuery

  * Example: ``theArray.click(function(index){...});`` rather than ``$('#arrayId').on('click', ".jsavindex", function(){...});``

* Log initial exercise state

  * If the only input to your AV is an array of input values (such as most of the Sorting AVs), you can use ``ODSA.AV.processArrayValues()`` which will automatically log the array values used to initialize your AV
  * If ``ODSA.AV.processArrayValues()`` does not fit your needs, you can all ``ODSA.AV.logExerciseInit()`` explicitly.  Refer to the function documentation in ``odsaAV.js`` for more information on logging conventions.

* Take advantage of macro-logging

  * As a developer, if you feel something is important to log (whether its the state of the exercise, some sort of interaction or simply a comment) you can use either ``ODSA.UTILS.logUserAction()`` or ``ODSA.UTILS.logEvent()``.  Refer to the function documentation in ``odsaUtils.js`` for more information on how to use these functions.
  * Allows developers to describe what is happening at a given step to make it easier when analyzing problem steps to identify what step the students are missing


----------------------------
Internationalization Support
----------------------------

OpenDSA supports a sophisticated internationalization framework that
attempts to make it as easy as possible to support compiling textbook
instances in various (natural) languages.
The configuration system allows a book compiler to specify the
language of choice, and the system will take module versions in the
target language whenever available (the fallback language is
English).

Like every other aspect of internationalization, we define the
language using the two-letter
`ISO 639-1 <http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes>`_
language codes.

Someone creating a new book instance would use the 'lang' variable
in the configuration file to define their book language.
But if you want to add support to the OpenDSA system to support a new
language, then you will need to provide the necessary strings in the
target language.
Here is a guide to how you would provide that information.

It helps to understand that the Sphinx compiler itself has its own
translation support, which affects some of the strings that appear on
an OpenDSA page.
Just telling Sphinx what language that you want to use will cause
those strings that Sphinx controls to be translated.
This is done by the configuration system when the configuration file
tells it to use a particular language.
A list of languages supported by sphinx can be found at
http://sphinx-doc.org/config.html#confval-language.

Translation is controlled by the file ``tools/language_msg.json``.
Each language is represented by its code in language_msg.json.
Make sure that a translation is available in language_msg.json file
before asking the configuration system to create a book in that
language.

The terms for each language are grouped in two categories within
``language_msg.json``:

* ``jinja`` for the terms that will be added inside the configuration
    file. They will be passed by Sphinx to the templating system
    (jinja + haiku).
* ``js`` for the terms processed by the ``odsaMOD.js`` library, and
    injected while the page is loading.

Here is the structure for language_msg.json::

   {
     "en"{
       "jinja": {
         "term1": "en_term1",
         ...
       },
       "js": {
         "term2": "en_term2",
         ...
       }
     },
     "fi"{
       "jinja": {
         "term1": "fi_term1",
         ...
       },
       "js": {
         "term2": "fi_term2",
         ...
       }
     }
   }

The gradebook text strings are taken from ``RST/<lang>/Gradebook.rst``.

The book configuration  program will read the language variable.
If a translation for the entered language is not available, the
default language English is used.

Individual AVs and exercises support internationalization through the
use of an associated ``.json`` file that provides the various
translation text for all strings that appear in the AV.
JSAV provides translations to many languages for its infrastructure
strings.


-------------------------------
Glossary Concept Map Definition
-------------------------------

OpenDSA supports displaying glossary terms as a **concept map**.
The relationship between terms are specified in the ``Glossary.rst``
file, and consist of the following elements added below the term we are defining:

* ``:to-term:`` followed by the related term. Ideally, the related term should be also
    defined in the glossary file, but is is not mandatory.
* ``:label:`` followed by the linking phrase decribing the relationship between the two terms.

Here is an example of a relationship definition between the terms ``graph`` and ``vertices``::

  graph
      :to-term: vertices :label: contains

      A :term:`graph` :math:`\mathbf{G} = (\mathbf{V}, \mathbf{E})` consists
      of a set of :term:`vertices` :math:`\mathbf{V}` and a set of
      :term:`edges` :math:`\mathbf{E}`,
      such that each edge in :math:`\mathbf{E}` is a connection between a
      pair of vertices in :math:`\mathbf{V}`.



---------------
Client-side API
---------------

ODSA.AV
=======

* **logExerciseInit** - generates an event which is used to log the initial state of an AV or exercise

  * Captures the state of the exercise at the beginning (such as the numbers in an array) which allows us to put the later operations we log in context.  For example, its all well and great to know the user clicked on index 4 of an array but if we don't know the randomly generated numbers in the array the operations we log won't make much sense.
  * The generated event uses the same channel as JSAV events and is therefore received by the existing listener.  This function is NOT dependent on the JSAV framework.

* **awardCompletionCredit** - generates an event which triggers the framework to give a user credit for an exercise

  * This function is designed to be used when an exercise doesn't really have a score but must be completed (like the calculator or performance exercises).  Developers should call this function in their code when a student has reached a state where the developer believes they should receive credit.
  * The generated event uses the same channel as JSAV events and is therefore received by the existing listener.  This function is NOT dependent on the JSAV framework.

* **initArraySize(min, max, selected)** - initializes the arraysize drop down list with the range of numbers from ``min`` to ``max`` with ``selected`` selected

* **reset(flag)** - resets the AV to its original state

  * The ``reset()`` function works by saving the HTML from the ``avcontainer`` element on page load and using it to replace the HTML in the ``avcontainer`` when reset it called.  When JSAV is initialized it alters the contents of the container, after the HTML has been saved.  When JSAV is initialized on page load but never reinitialized, the first reset clears the elements JSAV  generated, breaking the AV.  Using this ``reset()`` method, JSAV must be reinitialized after each reset in order for the AV to function properly.  We recommend reinitializing JSAV after calling ``ODSA.AV.reset(true)`` in the ``runit()`` method.
  * The ``runit()`` method should call ``ODSA.AV.reset(true)`` to ensure the avcontainer is cleared and ready for the next instance.

* **processArrayValues(upperLimit)** - validates the array values a user enters or generates an array of random numbers if none are provided

* **sendResizeMsg()** - forces the AV to send a message to the parent page containing the height and width of the rendered AV. This function is called automatically when the AV is loaded or reset, but can be explicitly called by developers if their AV changes size during its operation.


ODSA.MOD
========

* **serverEnabled()** - returns whether or not the backend server is enabled
* **inDebugMode()** - returns true if localStorage.DEBUG_MODE is set to true
* **getBookID()** - returns a SHA1 hash of the book URL as a unique identifier
* **getUsername()** - returns the username stored in local storage
* **getSessionKey()** - returns the session key stored in local storage
* **userLoggedIn()** - returns whether or not a user is logged in
* **getJSON(data)** - converts the input string to a JSON object, if given a JSON object, returns it
* **logUserAction(type, desc, exerName, eventUiid)** - logging function that takes the event type, a description of the event and the name and uiid of the exercise with which the event is associated
* **logEvent(data)** - flexible logging function that appends whatever data is specified to the event log, provided it meets the criteria for a valid event
* **sendEventData()** - flushes the buffered event data to the server
* **getType()** - returns correct object type information (replaces broken functionality of 'typeof')
* **roundPercent(number)** - rounds the given number to a max of 2 decimal places

ODSA.UTILS
==========

* **STATUS** - pseudo-enumerated variable used to define the different
  states of proficiency
* **getProficiencyStatus(name, username, book)** - returns whether or
  not local storage has a record of the given user being proficient
  with the given exercise or module in the given book
* **syncProficiency()** - queries ``getgrade`` endpoint to obtain
  proficiency status for all exercises and modules
* **parseURLParams()** - parses parameters from the URL, sets ``JSAV_OPTIONS`` and ``JSAV_EXERCISE_OPTIONS`` if applicable and stores the remaining options in a global ``PARAMS`` object for use by the module or exercise

---------------
Tips and Tricks
---------------

Truthy and Falsy
================

Be aware that values in JavaScript will not always evaluate the way
you expect when used in conditionals.  When comparing objects use
**strict equal** (``===``) and **strict not equal** (``!==``) to
ensure values are compared by type and value.  When testing whether a
variable contains useful information you can generally use the value
inself in the conditional, i.e. ``if (testCondition) {...}``.  While
this is 'sloppy', it works unless you expect a ``0``, ``false`` of
``""`` to be valid.  If you want a more formal test, you can use
``typeof testCondition === "undefined"``.  This expression will be
true only if ``testCondition`` has never been assigned a value.

For more information see
`Truthy and Falsy: When All is Not Equal in JavaScript <http://www.sitepoint.com/javascript-truthy-falsy/>`_.


HTML5 postMessage
=================

We have no guarantee that content embedded in iFrames (such as AVs and
Exercises) will be hosted on the same domain as the modules.  In order
to create a robust application communication between the parent and
child pages should take place using ``postMessage`` rather than
referencing elements or functions through the ``contentDocument`` or
``contentWindow.document`` of the iFrame element or ``window.parent``
or ``window.top``.


.. _Encapsulation:

Encapsulation
=============

You should always wrap your JavaScript code in an anonymous function
to prevent the DOM from getting cluttered and to prevent outside
access to specific data or functions.
All functions and global variables defined within an anonymous
function are visible to each other and can be used normally.
However, sometimes you will need to define a publically accessible
function that interacts with functions you wish to keep private.
The simplest way to do this is to write your JavaScript as normal
within an anonymous function and then assign specific "public"
functions to be properties of the ``window`` object.
For example::

  $(document).ready(function () {
    var privateData = 0;

    function privFunct() {
      alert('ODSA private function');
    }

    function publicFunct() {
      privFunct();
    }

    var AV = {};
    AV.publicFunct = publicFunct;
    window.AV = AV;
  });

Another alternative is::

  $(document).ready(function () {
    var AV = {};

    function privFunct() {
      alert('ODSA private function');
      AV.publicFunct();
    }

    AV.publicFunct = function() {
      alert('ODSA publicFunct');
    }

    AV.callPrivFunct = function() {
      privFunct();
    }

    window.AV = AV;
  });

In both of these examples, ``publicFunct()`` can be referenced outside
the anonymous function using ``AV.publicFunct()``
(or ``window.AV.publicFunct()``).
We prefer the first method because it looks more like a standard
JavaScript file, internal function references are simpler, and its
easy to add all the public functions in one place, giving the
developer greater control over what they make public.

Be sure not to overwrite any existing namespaces (such as window.ODSA
which is used by the OpenDSA framework)!

---------------
Troubleshooting
---------------

jQuery Selectors
================

jQuery selectors can be useful, but do have some limitations.  For
instance, when using jQuery to reference an element by ID, the ID
cannot contain specific characters such as a period, a plus sign or
spaces.  While its better to avoid them if possible, if you find that
you must use these or other invalid characters, use ``$('[id="' +
objID + '"]')``.


Proficiency Exercises
=====================

* If your AV doesn't show up immediately but shows up as soon as you
  advance the slideshow, make sure you ran: ``jsav.displayInit();``
* If you are having difficulties with variables managed by JSAV

  * Make sure you use ``.value()`` to access the variables value,
    otherwise you get an object rather than the string or number you
    most likely want
  * Make sure you use ``.value(newValue)`` to change the value of the
    variable, assignment using '=' doesn't work

* If your fixState function successfully changes the state of
  everything, but says you are getting all subsequent correct answers
  wrong and undoing everything to the state where you first made a
  mistake, make sure you are calling ``exercise.gradeableStep();``

