.. _Configuration:

===============================================
Compiling Book Instances: OpenDSA Configuration
===============================================

--------
Overview
--------

**Note:** This section initially presents configuation management from
raw configuration files, which is generally only done by developers
for testing purposes.
Instructors will use the book configuration GUI, which is documented
toward the end of this section.

A given OpenDSA eTextbook is called a "book instance".
A book instance is made of of "modules", where each module is a single
ReStructuredText file.
The modules within a book instance, their chapter grouping, their
order, and details about how exercises that they contain will be
treated are all defined by a configuration file,
the detailed syntax for which is defined in this section.
In practice, it is easiest to start by copying an existing
configuration file, and then changing it to fit your needs.
Configuration files are JSON files, normally stored in OpenDSA/config.
From the top level of an OpenDSA repository
(from within the |devstack_link|), you can compile a book
instance (given the existance of a configuration file named
``config/foo.json``) by issuing these commands::

  docker-compose up -d # to start the container
  docker-compose exec opendsa bash # to enter into the container
  python tools/configure.py config/foo.json --no-lms
  CTRL + C # to exit the container
  docker-compose down # to take down the container

.. |devstack_link| raw:: html

   <a href="https://github.com/OpenDSA/OpenDSA-DevStack#development-workflow" target="_blank">OpenDSA-DevStack</a>


Separate from book instances is the concept of a "course instance" or "course offering".
Depending on the course software (typically an LMS such as Canvas) that you are 
using, you will likely need to compile a special
instance of a given OpenDSA book instance for each course that intends to use it.

Details about how to define a course related information and how to
create a course offering using OpenDSA web interfaces is in
:ref:`OpenDSA web interfaces <OpenDSA_LTI_Web_Interfaces>`.

---------------------------------------
Motivation for the Configuration System
---------------------------------------

* Allows content to be environment-independent

  * Configuration file contains all environment-dependent settings
    such as paths and target URLs
  * Example: If developers want to point their front-end code at
    different backend systems, they simply make the change in their
    own config file.  They can share all OpenDSA content, but when
    they build the book, it will be built using their personalized
    settings

* Allows easy replication

  * Collects all settings and preferences required to configure an
    instance of OpenDSA in a single, portable file that can be easily
    shared among instructors.
  * Once a configuration has been created, instructors can make
    identical copies without going through the configuration process

* Allows fine grain control

  * Existing configuration files provide sensible defaults, but allow
    instructors to control aspects such as how many points a specific
    exercise is worth or whether it is required for module proficiency

---------------------
Configuration Process
---------------------

A comment at the beginning of configure.py gives some information
information about how the script works.
Generally, those who want to compile a book instance do not need to
worry about those details.

**Note**: The OpenDSA root directory must be web-accessible as there
are many supplemental directories and files (AV/, Exercises/, lib/,
SourceCode/, etc) which must be referenced.  These files are identical
for all books and not copying them reduces the footprint of each
book.


Module and Exercise Removal
~~~~~~~~~~~~~~~~~~~~~~~~~~~

* Only the modules listed in the configuration file will be included.
  To remove a module from the book, simply remove the module object
  from the configuration file.

* To remove a section from a module, set the "showsection" attribute to
  ``false``.
  Exercises are normally the sole contents of some sections.
  Note that Exercises that do not appear in the configuration file will
  still be included in the book using the default configuration
  options.


Book Name
~~~~~~~~~

The name of the configuration file will often be used in some way by the
LMS that manages the course.
For example, the name of the configuration file might be the Course Code
in Canvas LMS.

.. ---------------
.. Future Features
.. ---------------

.. * 

------
Format
------

OpenDSA configuration files are stored using JSON.
Here are the field definitions.
All are required unless otherwise specified.

* **title** - The title of the OpenDSA textbook.

* **build_dir** - (optional) The directory where the configured book
  directory will be created, defaults to 'Books' if omitted

  * A new directory, named after the configuration file, will be
    created at this location and serve as the output directory for the
    configuration process.  Files required to compile the book will be
    copied / written to the output directory, including modified
    version of the source RST files

    * Example: Assume "build_dir": "Books" and the name of the
      configuration file used is "CS3114.json", the output directory
      would be "~OpenDSA/Books/CS3114/"

  * The compiled textbook will appear in ``[build_dir]/[book name]/html``
  * This directory must be web accessible

* **code_dir** (optional) - Specifies a directory that contains
  another directory as specified by ``code_lang`` (see below).
  Defaults to ``SourceCode`` if omitted.

  * Ex: Using ``"code_dir": "SourceCode/"``, and assuming that the
    defined language directory is ``Python`` then the configuration
    process would look for example Python source code in
    ``~OpenDSA/SourceCode/Python``.

* **code_lang** - A dictionary where each key is the name of a
  programming language (supported by Pygments and matching a directory
  name in ``code_dir``), and each value is a dictionary of language
  options.
  Language options are:

  * ``ext`` for a list of file extensions.
  * ``label`` for the text that will be displayed at the
    header of the code snippet tab.
  * ``lang`` for the name of the programming language (supported by
    Pygments).

  The order in which the languages and extensions are provided
  determines their order of precedence in cases where only one display
  code is to be selected.

  * Example::

     "code_lang": {
        "C++": {"ext": ["cpp","h"],"label":"C++","lang":"C++"}
        "Java": {"ext":["java"], "label":"Java", "lang":"java"},
        "Processing": {"ext":["pde"], "label":"Processing","lang":"java"}
     }

  * In this example, assuming that ``code_dir`` is ``SourceCode/``,
    the system would search for ``.cpp`` files,
    followed by ``.h`` files in ``~OpenDSA/SourceCode/C++/``,
    then ``.java`` files in ``~OpenDSA/SourceCode/Java/``,
    and finally ``.pde`` files in ``~OpenDSA/SourceCode/Processing/``.

  * There is not actually a need for the "code" language files to be a
    real programming language. For example, it is plausible to use a
    "programming language" called ``Pseudo`` with file suffix ``.txt``.
    However, Pygments might not do well with colorizing the result.

* **tabbed_codeinc** (optional) - A boolean that controls whether or
  not code is displayed in a tabbed interface.
  If true, it will display the specified code in each of the languages
  specified in ``code_lang`` (if the code exists) in a tabbed
  container.
  If false, it will display the code in a single language (the first
  language for which the code exists with the order of precedence
  determined by the order specified in ``code_lang``).
  Defaults to ``true`` if omitted.

* **lang** (optional) - Specifies the native language of the book
  using the official ISO 639-1 or 639-2 standard abbreviation,
  defaults to ``en`` if omitted.
  This is used to control where RST source files are located, within
  ``~OpenDSA/RST/[lang]``.
  Any RST files not found in the indicated subdirectory will then be
  located in ``~OpenDSA/RST/en``.

* **glob_mod_options** - (optional) An object containing options to be
  applied to every module in the book.
  Can be overridden by module-specific options.

* **glob_exer_options** - (optional) An object containing options to
  be applied to every exercise in the book. Can be used to control the
  behavior of the exercise. Can be overridden by exercise-specific
  options.

* **glob_pe_options** - (optional) An object containing default options 
  for proficiency style exercises in the book. These options can be overidden
  for specific exercises. If this object is omitted, defaults defined 
  by the compilation script will be used. Fields for this object include:
    
    * **points** - The number of points khan-academy style exercises 
      are worth. Defaults to ``1`` if omitted.
    * **threshold** - A number between 0 and 1 specifing the percentage of 
      steps a user must get correct to achieve proficiency. 
      Defaults to ``1`` if omitted.
    * **required** - Whether proficiency exercises are required for module
      proficiency. Defaults to ``true`` if omitted.

    Example::

      "glob_pe_options": {
        "threshold": 1, 
        "points": 2.0, 
        "required": true
      }

* **glob_ka_options** - (optional) An object containing default options 
  for khan-academy style exercises in the book. These options can be overidden 
  for specific exercises. If this object is omitted, defaults defined 
  by the compilation script will be used. Fields for this object include:
    
    * **points** - The number of points khan-academy style exercises are worth. 
      Defaults to ``1`` if omitted.
    * **threshold** - The number of questions a user must complete to achieve
      proficiency. Defaults to ``5`` if omitted.
    * **required** - Whether khan-academy style exercises are required for module
      proficiency. Defaults to ``true`` if omitted.

    Example::

      "glob_ka_options": {
        "threshold": 5, 
        "points": 1.0, 
        "required": true
      }

* **glob_ss_options** - (optional) An object containing default options 
  for slideshows in the book. These options can be overidden for specific 
  slideshows. If this object is omitted, defaults defined by the compilation
  script will be used. Fields for this object include:
    
    * **points** - the number of points slideshows are worth. Defaults to
      ``0`` if omitted.
    * **threshold** - This option is not used for slideshows.
    * **required** - whether slideshows are required for module completion. 
      Defaults to ``false`` if omitted.

    Example::

      "glob_ss_options": {
        "threshold": 1.0, 
        "points": 0.0, 
        "required": false
      }

* **glob_extr_options** - (optional) An object containing default options 
  for external tool exercises (i.e. CodeWorkout) in the book. These options 
  can be overidden for specific exercises. If this object is omitted, 
  defaults defined by the compilation script will be used. Fields for this 
  object include:
    
    * **points** - the number of points external tool exercises are worth. 
      Defaults to  ``1`` if omitted. 
    * You may also specify default options for a specific external tool.
      Example::

        "glob_extr_options": {
          "code-workout": {
            "points": 2.0
          }, 
          "points": 1.0
        }
      
      In the above example, code-workout exercises are worth two points each,
      and all other external tool exercises are worth one point each. 
      Currently code-workout is the only external tool used by OpenDSA.

* **zeropt_assignments** - (optional) A boolean controlling wheter or not
  an assignment with 0 points should be created for any module
  without exercises or other scoreable element.
  The point to this is to make every module appear in the assignment
  list at Canvas, because otherwise a student who focusses only on
  assignments (and not modules) would miss seeing this content.
  Unfortunately, the ordering of the assignments in Canvas does not
  match the module ordering, so adding these 0-pt assignments might
  not really help students to read all of the material.
  Defaults to ``false`` if omitted.

* **build_JSAV** - (optional) A boolean controlling whether or not the
  JSAV library should be rebuilt whenever the book is compiled.
  Defaults to ``false`` if omitted.

  * This value should normally set to ``false`` for development.
  * Instructors may wish to set this to true for production
    environments when configuration is run infrequently and JSAV is
    likely to have changed since the last time configuration occurred.

* **build_cmap** - (optional) A boolean controlling wether or not the
  glossary terms concept map should be diplayed.
  Defaults to ``false``.

* **req_full_ss** - (optional) A boolean controlling whether students
  must view every step of a slideshow in order to obtain credit.
  Defaults to ``true`` if omitted.

* **narration_enabled** - (optional) A boolean controlling whether text-to-speech
  narration of JSAV slideshows is enabled. If enabled, a small
  speaker button will be displayed in the top right corner of every 
  JSAV slideshow. If a user clicks the speaker button, narration will be
  enabled. If the user clicks the button again, narration will be disabled.
  Defaults to ``true`` if omitted.

* **start_chap_num** - (optional) Specifies at which number to start
  numbering chapters.
  Defaults to 0 if omitted.

* **suppress_todo** - (optional) A boolean controlling whether or not
  TODO directives are removed from the RST source files.
  Defaults to ``false`` if omitted.

* **tag** - (optional) A string containing a semi-colon delimited
  list of tags.
  This directs Sphinx to include material from RST ``only`` directives
  with the matching tag(s).
  This is useful for relatively fine-grain control over whether
  material will be included in a book instance.
  For example, if you want to have multiple paragraphs each with a
  programming language-dependent discussion, with only the appropriate
  paragraph for the language being used for this book instance
  actually appearing to the reader.
  Any material within an ``only`` block that does **not**
  have a matching ``tag`` in the config file will be left out.

* **assumes** - (optional) A string containing a semi-colon delimited
  list of topics that the book assumes students are familiar with.
  This allows for control over warnings about missing prerequisite
  modules during the build process.

* **chapters** - A hierarchy of chapters, modules, sections, and exercises.
  This makes up the vast majority of most configuration files.

  * Each key in "chapters" represents a chapter name.
    A module object is one whose key matches the name of an
    RST file in the ``~OpenDSA/RST/[lang]/`` directory.

  * **hidden** - This is an optional field to signal the preprocessor
    to not display the content of the chapter in the TOC. The
    configuration script will add the new directive
    ``odsatoctree``.
    The flagged chapter entries in the TOC will be
    of class ``hide-from-toc``, and will be removed by a CSS rule in
    odsaMOD.css file.

  * **Modules**

    * The key relating to each module object must correspond to a
      path to an RST file found in ~OpenDSA/RST/[lang]/.

    * **dispModComp** - (optional) A flag that, if set to "true", will
      force the "Module Complete" message to appear even if the module
      contains no required exercises.
      If set to "false", the "Module Complete" message will not appear,
      even if the module DOES contain required exercises.

    * **mod_options** - (optional) overrides ``glob_mod_options``,
      which allows modules to be configured independently from one
      another.
      Options that should be stored in ``JSAV_OPTIONS`` should be
      prepended with ``JOP-`` and options that should be stored in
      ``JSAV_EXERCISE_OPTIONS`` should be prepended with ``JXOP-``.
      (This can be used to override the defaults set in
      ``odsaUtils.js``).
      All other options will be made directly available to modules in
      the form of a parameters object created automatically by the
      client-side framework (specifically, when ``parseURLParams()`` is
      called in ``odsaUtils.js``).

    * **codeinclude** - (optional) An object that maps the path from a
      codeinclude to a specific language that should be used for that
      code.
      This allows control of individual code snippets, overriding the
      ``code_lang`` field.

      * Ex: ``"codeinclude": {"Sorting/Mergesort": "C++"}`` would set
        C++ as the language for the codeinclude "Sorting/Mergesort"
        within the current module.

    * **sections and exercises** - (optional) A collection of 
      section and exercise objects that define the sections and/or exercises 
      in the module whose settings you want to be different from 
      the default or global settings. 
      If you do not wish to override the default/global settings for a 
      section or exercise, you do not need to list it.

      * The section objects should have keys that match the
        titles of the corresponding sections in the RST file.
      * The exercise objects should have keys that match the short names
        of the corresponding exercises in the RST file.
      * To remove the section completely, provide the field
        ``showsection`` and set it to ``false``.
      * All options provided within a section object
        are appended to the directive, please
        see the :ref:`Extensions <ODSAExtensions>` section for a list
        of supported arguments.
      * A section in an RST file may contain multiple exercises objects. 
        Each exercise object may contain the following attributes:

        * **points** - (optional) The number of points the exercise is
          worth. 
          Uses global defaults if omitted.
        * **required** - (optional) Whether the exercise is required
          for module proficiency.
          Uses global defaults if omitted.
        * **threshold** - (optional) The percentage that a user needs
          to score on the exercise to obtain proficiency.
          For khan-academy style exercises, this is the number of questions
          the user must get correct to obtain proficiency.
          Uses global defaults if omitted.

        * **exer_options** - (optional) An object containing
          exercise-specific configuration options for JSAV.
          Can be used to override the options set using
          ``glob_exer_options``.
          Options that should be stored in ``JSAV_OPTIONS`` should be
          prepended with ``JOP-`` and options that should be stored in
          ``JSAV_EXERCISE_OPTIONS`` should be prepended with
          ``JXOP-``.
          (This allows overriding the defaults set in
          ``odsaUtils.js``.)
          All other options will be made directly available to
          exercises in the form of a parameters object created
          automatically by the client-side framework (specifically
          when ``parseURLParams()`` is called in ``odsaUtils.js``).

      Example of a module object::

        "Background/IntroDSA": {
          "IntroSumm": {
            "threshold": 6
          },
          "Some Software Engineering Topics": {
            "showsection": false
          }
        }

      In the above example, the threshold for "IntroSumm"
      (a khan-academy style exercise) is set to ``6``, overriding
      whatever is specified in ``glob_ka_options``. It will retain the
      default settings for ``points`` and ``required`` that are specified in
      ``glob_ka_options``.
      The section titled "Some Software Engineering Topics" is set 
      to be removed when compiling the book.

      Example of a module object whose sections and exercises all use the 
      default/global settings::

        "Background/IntroDSA": {}

---------------------
Configuring Exercises
---------------------

The most important concern when configuring proficiency exercises is
the scoring option to be used.
JSAV-based proficiency exercises have a number of possible grading
methods:

* ``atend``: Scores are only shown at the end of the exercise.
* ``continuous:undo``: Mistakes are undone, the student will lose that
  point but have to repeat the step.
* ``continuous:fix``: On a mistake, the step is corrected, the student
  loses that point, and then is ready to attempt the next step. This
  mode requires that the exercise have the capability to fix the
  step.
  If it does not, this grading mode will default to
  ``continuous:undo``.

All proficiency exercises can be controlled through URL
parameters.
What the configuration file actualy does by setting
``exer_options`` is specify what should be in the URL parameters
that are sent to the exercise by the OpenDSA module page.
Here is an example for configuring an exercise::

          "shellsortPRO": {
            "required": true,
            "points": 2.0,
            "threshold": 0.9,
            "exer_options": {
              "JXOP-feedback": "continuous",
              "JXOP-fixmode": "fix"
            }
          },

This configuration will affect the configuration of an entity called
``shellsortPRO`` (presumeably defined by an ``..avembed`` directive in
the corresponding OpenDSA module).
It is scored (as indicated by setting the ``required`` field to ``true``),
and is worth 2.0 points of credit once the user reaches "proficiency".
To reach "proficiency" requires correctly achieving 90% of the
possible steps on some attempt at the exercise (as defined by
``threshold``).
The exercise is instructed to use the ``continuous:fix`` mode of
scoring.

In addition to the standard ``JXOP-feedback`` and ``JXOP-fixmode``
parameters, a given AV or exercise might have ad hoc parameter
settings that it can accept via URL parameter.
Examples might be algorithm variations or initial data input values.
Those would have to be defined by the exercise itself.
These (along with the standard grading options) can also have defaults
defined in the ``.json`` file associated with the AV or exercise,
which might help to document the available options.
Any such ad hoc parameter defaults can be over-ridden in the
``exer_options`` setting in the configuration file.

----------------------
Book Configuration GUI
----------------------
.. _ConfigurationGUI:

A graphical user interface that instructors may use to create their own
book configurations is located `here
<https://opendsa-server.cs.vt.edu/configurations/book/>`_.
A version of this documentation with some screenshots can be found
`here <https://opendsa-server.cs.vt.edu/guides/opendsa-book-configuration>`_.


Load Existing Configuration (Optional)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. **Select Reference Configuration:** You may select from a number of 
configuration files that are stored on the OpenDSA server. These can be 
useful as a starting point for creating your own configuration.

2. **Select Your Configuration:** If you have created/uploaded a configuration
to the OpenDSA server in the past, you may load it and make modifications to it.
If you only wish to change the point values of the exercises in the book, or add
additional modules to the book, you may update the existing configuration 
directly and ge-generate your Canvas course. However, if you wish to remove or 
reorder the modules in the book, then you must save your configuration as a new 
template book and create a new course. These configurations are stored in the 
OpenDSA-LTI database.

3. **Select Configuration File:** If you have a book configuration file (.json),
you may load it using this option.

Book settings
~~~~~~~~~~~~~

These are global settings that describe or apply to the entire book.

* **Title:** This will be the title of the book

* **Description:** A short description of the book

* **Language:** The language of the content in the book. This will determine
  which modules are available for you to choose from. The vast majority of
  OpenDSA content is currently only available in English.

* **Code Languages:** OpenDSA modules sometimes contain sample code. You
  may select which languages you wish for these code samples to appear in. If
  you select multiple languages, the code sample container will have a tab
  for each language (unless you disable Tabbed Code-include), 
  with the tabs ordered based on how you order the languages
  in the interface. You may reorder the languages using drag-and-drop. It is
  important to note that code samples are usually not available in every language,
  but most code samples are available in Java.

* **Global Exercise Options:** These are options that will apply to every 
  exercise.

  * JSAV Debug: This option can be useful for developers of OpenDSA exercises. 
    It enables the debug flag for JSAV exercises which results in some debugging 
    information being printed to the browser console.

* **Global Slideshow Options:** These options will apply to all slideshows, 
  unless explicitly overridden for individual slideshows.

  * Required: Whether the completion of the slideshow is required for
    module proficiency.
  * Points: The number of points completion of the slideshow is worth.

* **Global Khan-Academy Exercise Options:** These are options that will apply
  to all Khan-Academy style exercise, unless explicitly overriden for individual
  exercises.

  * Required: Whether the completion of the exercise is required for
    module proficiency.
  * Points: The number of points the exercise is worth.
  * Threshold: The number of questions the student must get correct to 
    achieve proficiency.

* **Global Proficiency Exercise Options:** These are options that will apply
  to all proficiency style exercises, unless explicitly overriden for individual
  exercises.

  * Required: Whether the completion of the exercise is required for
    module proficiency.
  * Points: The number of points the exercise is worth.
  * Threshold: The proportion of steps the student must get correct to
    achieve proficiency. Must be between 0 and 1, where 1 means
    the student must get all steps correct to achieve proficiency.

* **Global External Tool Options:** These are options that will apply
  to all external tool exercises unless the same settings are specified
  for the specific external tool, or overidden for a specific external tool
  exercise.

  * Points: The number of points the exercise is worth.

* **Global Code-Workout Options:** These are options that will apply
  to all Code-Workout exercises, unless explicitly overriden for individual
  exercises.

  * Points: The number of points the exercise is worth.

* **Other Options:** These are simple options that are either enabled
  or disabled.

  * Build JSAV: Controls whether or not the JSAV library should be rebuilt 
    whenever the book is compiled.
  * Display Module Completion: If enabled, will force the “Module Complete” 
    message to appear even if the module contains no required exercises. 
    If disabled, the “Module Complete” message will not appear, even if the module 
    DOES contain required exercises.
  * Build Concept Map: Controls whether a concept map is built for glossary
    terms in the book. If enabled, then a concept map for a specific term, 
    which shows how that term relates to other terms, can be viewed by 
    clicking on the term on the glossary page. Note that a concept
    map may not be available for every term.
  * Narration Enabled: This controls whether or not a button should be shown
    for each slideshow that will turn on text-to-speech narration for that slideshow.
  * Suppress ToDo: Controls whether or not TODO messages are displayed. This
    should generally be enabled.
  * Tabbed Code-include: Controls whether or not code samples are displayed in 
    a tabbed interface.
    If enabled, it will display code samples in each of the languages
    selected in Code Languages section (if the code exists) in a tabbed
    container.
    If disabled, it will display the code in a single language (the first
    language for which the code exists with the order of precedence
    determined by the order specified in the Code Languages section).

Book Content
~~~~~~~~~~~~

This two-pane drag-and-drop interface allows you to specify the content
that should be in your book. Before you can select the content in your book,
you must first either select the book language, or load an existing 
configuration.

* The left pane (Included Modules) lists the content that is included in your book.
* The right pane (Available Modules) lists content that is available to be 
  included in your book.
* Books are organized into chapters, with each chapter containing one or more modules.
  You choose the names of chapters, as well as which modules should be included in
  each chapter.git status
* A module may contain zero or more sections, and a section may contain
  zero or more exercises and/or slideshows.
* To **add a chapter** to your book, click the "+ Chapter" button and enter a 
  name for the chapter.
* To **remove a chapter** and all of its modules from your book, right click 
  on the chapter, then click "Delete". 
* To **add a module** to your book, left-click and hold and drag a module from the Available 
  pane and drop it (release your left mouse button) in the Included pane in the 
  desired chapter. You can select multiple modules by holding Ctrl (Mac: ⌘) and 
  clicking on the desired modules. To select multiple sequentially listed 
  modules, click on the first module, then hold Shift and click on the last 
  module. 
* To **remove a module** from your book, right click on the module in the 
  Included pane, then click "Remove".
* **Reorder chapters and modules** in your book using drag-and-drop. The order 
  of the chapters and modules in the Included pane will be the order of the 
  chapters and modules in your book. 
* To **override the global settings for an individual exercise**, right click on 
  the exercise, then click "Edit Settings". 
* To **hide a section in the book**, right click on the section, then click 
  "Hide Section". 

Saving Your Configuration
~~~~~~~~~~~~~~~~~~~~~~~~~

Once you are finished configuring your book you can:

    1. Click "Save New Configuration" to save the configuration as a template
    book to the OpenDSA database. The book will then show up in the list of 
    available books when creating a new course offering.

    2. If you have loaded one of your existing configurations you can click 
    "Update Configuration". You can then update your Canvas course by 
    regenerating it. Note that this option does not support removing or 
    reordering chapters and/or modules.

    3. Click "Download Configuration" to download a json file containing the 
    configuration.

-------------------------
Creating Course Offerings
-------------------------
.. _CreateCourseOfferings:

Rationale
~~~~~~~~~

Separate from book configuration files (which define the contents of a
book, scoring information, and configurations for various exercise),
a given book instance will typically be accessed in the context of a
particular LMS, which will require various permissions in order to
operate correctly.
The compilation process separates the compilation of book files from
the interactions needed to set up the book's use at a specific
instance of the LMS.
Book instances are in fact compiled to the specification necessary for
that specific LMS to access it, meaning that book instances cannot be
shared across LMS's, or by different instances of the same LMS (say,
two instances of Canvas), or even by two course instances on the same
installation of a given LMS.
The reason is that the internal cross links between the various parts
of the book instance are often defined in the context of a specific
course instance within the LMS.

Process
~~~~~~~

The following is a description of the steps involved in creating a 
course offering and publishing it to an LMS, including what happens behind the scenes. It is assumed that
the user in this scenario has instructor access.
This description is intended for infrastructure developers.
For a guide aimed at helping instructors publish a course offering to an LMS, see https://opendsa-server.cs.vt.edu/guides/opendsa-bookinstance.

1. An instructor navigates to the course offering creation page and fills out the New Course Offering form.
  
  Files involved:
  
    * `app/controllers/course_offerings_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/course_offerings_controller.rb>`_
    * `app/views/course_offerings/new.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/course_offerings/new.html.haml>`_
    * `app/views/course_offerings/_form.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/course_offerings/_form.html.haml>`_
    * `app/assets/javascripts/course_offerings.js <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/assets/javascripts/course_offerings.js>`_


2. The instructor clicks submit on the New Course Offering form.
  
  Files involved:
  
    * `app/views/course_offerings/new.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/course_offerings/new.html.haml>`_
    * `app/views/course_offerings/_form.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/course_offerings/_form.html.haml>`_

3. A post request is sent to the /course_offerings endpoint, 
which results in the ``create`` method of  the 
``CourseOfferingsController`` (course_offerings_controller.rb) being run.
  
  Files involved:
  
    * `app/assets/javascripts/course_offerings.js <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/assets/javascripts/course_offerings.js>`_ (``handle_submit`` method)
    * `app/controllers/course_offerings_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/course_offerings_controller.rb>`_

4. The ``create`` method searches for any existing course offering 
for the same course, term, label, and lms instance. If no course offering exists, 
then a new course offering is created in the course_offerings table of the database.
Then, the template book instance that 
the user selected in the New Course Offering form is cloned, 
meaning a copy is made and saved to the database. This cloned book
instance is associated with the new course offering (by setting the course_offering_id attribute). 
The user creating the course offering is enrolled in the new course offering as an instructor. The url of the new course offering's page is included in the server's response.
  
  Files involved:
  
    * `app/controllers/course_offerings_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/course_offerings_controller.rb>`_

5. The url from the server's response in the previous step is used to redirect the user to the page listing the course offerings
for the course the user selected in the New Course Offering form.
  
  Files involved:
  
    * `app/assets/javascripts/course_offerings.js <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/assets/javascripts/course_offerings.js>`_ (``handle_submit`` method)
    * `app/controllers/organizations_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/courses_controller.rb>`_ (``show`` method)
    * `app/views/courses/show.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/courses/show.html.haml>`_
    * `app/views/inst_books/_inst_book.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/inst_books/_inst_book.html.haml>`_

6. The user finds the course offering they just 
created, and clicks the "Generate Canvas Course" button for 
that course offering. This sends a request to the 
/inst_books/:id route, resulting in the ``compile`` method
of the ``InstBooksController`` (inst_books_controller.rb) 
being run.
  
  Files involved:
  
    * `app/views/courses/show.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/courses/show.html.haml>`_
    * `app/views/inst_books/_inst_book.html.haml <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/inst_books/_inst_book.html.haml>`_
    * `app/controllers/inst_books_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/inst_books_controller.rb>`_

7. The ``compile`` method enqueues a new ``GenerateCourseJob`` using
the `delayed job gem`_. This creates a new row in the delayed_jobs 
table of the database. A background process reads this job from 
the database and executes the job.
  
  Files involved:
  
    * `app/controllers/inst_books_controller.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/inst_books_controller.rb>`_
    * `app/jobs/generate_course_job.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/jobs/generate_course_job.rb>`_

.. _delayed job gem: https://github.com/collectiveidea/delayed_job/

8. The ``GenerateCourseJob`` first uses the Canvas API to generate the
chapters and modules in Canvas so that it can record the Canvas module and 
assignment id's for each chapter and module. 
These ID's are saved to the correspoding OpenDSA chapter and module records in the OpenDSA database.
These ID's will be used by the book compilation script next. 
OpenDSA makes calls to the Canvas API using the `Pandarus client`_ provided by Instructure. This step also involves creating an external tool configuration for OpenDSA in Canvas.
 
  Files involved:

    * `app/jobs/generate_course_job.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/jobs/generate_course_job.rb>`_

.. _Pandarus client: https://github.com/instructure/pandarus

9. After setting up the necessary infrastructure in the Canvas course, 
the ``GenerateCourseJob`` will then load the book 
instance from the database, convert the 
instance to json `using a jbuilder`_, then dump
the json to a temporary configuration file in the public/OpenDSA/config/temp folder. 
The configuration file created by the jbuilder includes the ID's generate by the 
LMS in the previous step. The temp file will be named in the format 
``temp_{user_id}_{timestamp}.json``.
  
  Files involved:

    * `app/jobs/generate_course_job.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/jobs/generate_course_job.rb>`_
    * `app/views/inst_books/show.json.jbuilder <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/inst_books/show.json.jbuilder>`_ 

.. _using a jbuilder: https://github.com/rails/jbuilder

10. The ``GenerateCourseJob`` will then execute the book
compilation script at public/OpenDSA/tools/configure.py, 
passing the path of the temporary config file just created.
This will generate the HTML files for each module in the book.
  
  Files involved:

    * `app/jobs/generate_course_job.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/jobs/generate_course_job.rb>`_
    * `public/OpenDSA/tools/configure.py <https://github.com/OpenDSA/OpenDSA/blob/master/tools/configure.py>`_  

