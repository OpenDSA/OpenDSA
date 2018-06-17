.. _GettingStarted:

===============
Getting Started
===============

------------------------------------
Overview and Developer's First Steps
------------------------------------

To the end user, OpenDSA consists of content delivered by servers.
Content is delivered in the form of "book instances", which are
created through the :ref:`configuration process <Configuration>`.
Book instances come in two forms: plain HTML pages (that you can
create locally for testing) and those accessed through a Learning
Management System (at the moment, we only support Canvas).
As a new developer, you typically don't worry about anything other
than creating plain HTML book instances.

If you want to develop content, create a book instance, and view
it, then you will need to set up the necessary infrastructure.
See "Setting up a Local Development Environment" below for details on
how to do this.

The overall project structure and developer workflow goes like this.
You need to create a configuration file in the ``OpenDSA/config``
directory.
You will probably start by copying an existing one (``Test.json`` is a
good place to start).
You will then need to add a target to ``OpenDSA/Makefile`` to compile
this configuration file.
Just copy an existing one (like for ``Test``) and modify the name for
your config file.
Once your config file is set up, then you will execute your Makefile
target (a command like ``make Test`` called from a commandline window
from the OpenDSA repository top level will do this).

The basic unit of an OpenDSA book instance is a Module, and each
Module corresponds to a file written in ReStructuredText (RST).
The existing modules are in ``OpenDSA/RST/en``, with the files divided
among various content subdirectories.
You will typically get started by creating your own subdirectory in
``OpenDSA/RST/en``, copying any starting RST files that you want to
use, adding these to your config file, and then compiling them to see
that you have what you want.
Then you can start modifying your copy of the RST file to create
content.
Actual visualizations and exercises generally live in the
``OpenDSA/AV`` and ``OpenDSA/Exercises`` directories.
See the self-documenting demonstration at
``OpenDSA/RST/en/SimpleDemo/DemoIntro.rst`` for getting started (use
the command ``make SimpleDemo`` to compile a copy of this book
instance for yourself).


----------------------
Project Communications
----------------------

The primary discussion forum for topics related to OpenDSA and JSAV is
our Piazza forum at
https://piazza.com/class/i1v25wdagpr6sn.

Issues (bug reports and suggestions) related to any of the
repositories should be posted to their respective GitHub issue
trackers.


---------------------------------
Repositories and Official Mirrors
---------------------------------

Main development is done out of repositories hosted at GitHub.
We use a GitHub "organization" at https://github.com/OpenDSA.
Here is a list of the individual repositories that we use:

* The main OpenDSA development repository:
  https://github.com/OpenDSA/OpenDSA.

* Most developers should use the version of JSAV distributed with
  OpenDSA.
  However, if your task requires the most recent changes then
  the development version of JSAV can be found at:
  https://github.com/vkaravir/JSAV.

* We use the Khan Academy infrastructure for exercises and distribute
  the necessary portions with OpenDSA. We decided to clone the Khan
  Academy framework under the OpenDSA account on GitHub, and implement
  OpenDSA requirements as a layer that overrides some of the Khan
  Academy framework functionalities, so that we can maintain
  compatibility and move forward by continuously pulling the original
  framework’s latest modifications.
  The customized Khan Academy framework can be found at:
  https://github.com/OpenDSA/khan-exercises.git.

* Support for setting up OpenDSA servers can be found at
  https://github.com/OpenDSA/OpenDSA-DevStack.

* The OpenPOP project is in a separate repository at
  https://github.com/OpenDSA/OpenPOP.

An up-to-date development version of the OpenDSA repository is
mirrored at http://lti.cs.vt.edu/LTI_ruby.
The built version of the stable standard book configurations
(available either as they appear in Canvas or stand-alone web pages)
is available at: https://opendsa-server.cs.vt.edu/home/books.


----
JSAV
----

Visualizations are developed using the JSAV (JavaScript Algorithm
Visualization) library.
Documentation for the JSAV API can be found at: http://jsav.io/
If you have installed the development environment, then the JSAV
git repository will have been loaded as a submodule.


------------------------------------------
File Structure and File Naming Conventions
------------------------------------------

The following refers to the OpenDSA content or "client side"
repositories ("OpenDSA" and "OpenDSA-stable").

Content materials come in the form of modules (in RST), exercises,
AVs, etc. There are various top-level directories, as explained below
and in more detail in the project README file
(https://github.com/OpenDSA/OpenDSA/blob/master/README.md).
Within the RST, AV, SourceCode and Exercises directories, the
materials are subdivided into subdirectories based on topical content
(such as Sorting).
These content subdirectories are mirrored across all of the
materials subtypes.
That is, if there is a Sorting subdirectory in the
AVs directory, there should also be one in the RST directory,
Exercises directory and the SourceCode directory to match.
In addition, each of the major top-level directories contains a
subdirectory named Development.
All content starts life in the Development subdirectory.
Once it is completed, polished, validated,
and had a thorough code review, Dr. Shaffer will move code out of the
Development subdirectory to an appropriate content subdirectory.

Algorithm visualizations, proficiency exercises, and related code live
in the AV directory.

Exercises built using the Khan Academy exercise infrastructure lives
in the Exercises directory.

Tutorial modules live in the RST directory, with the actual source in
RST/source.

Code examples that will be presented within the modules (such as
Processing or Python code) lives in the SourceCode directory.

Individual files are further labeled by functional type.
Files related to AVs have their filename end in AV (such as
insertionsortAV.js).
Files related to proficiency exercises end in PRO.
Files related to mini-slideshows or similar content that is
included within a module end in CON.
Khan Academy exercises that are multiple choice questions end in MC,
and T/F questions end in TF.
KA-based questions that are interactive (for example, where a user
clicks on JSAV array elements to give an answer) end in PRO.
The practice is to put individual KA questions in separate files, and
often these are then aggregated to present to students as a battery of
"summary" questions.
Such aggregations end in Summ.


------------------------
OpenDSA Coding Standards
------------------------

Coding standards for OpenDSA are largely driven by validation
tools.
The requirements for CSS and JavaScript files are embedded in
the validation tools and settings built into the OpenDSA Makefile.
No code gets out of the "Development" stage and into public use until
it follows our rules for splitting into separate HTML/CSS/JavaScript
files and passes the validation tools with zero warnings and errors.

**HTML Pages**
Ideally, HTML pages that are part of OpenDSA should pass the W3
validation suite.
An easy way to run this on your page is to install the Web
Developer plugin (from http://chrispederick.com) for your
browser.
This is available for both Chrome and Firefox, and gives you
icons on your toolbar that lets you run the validator on the current
page.
Unfortunately, we so far have not adopted a command-line tool for
validation of HTML pages similar to what we are using for CSS and
JavaScript.

We try to avoid JavaScript and CSS in the HTML pages (though we often
tolerate a couple of lines of CSS for an AV that needs only minimal
customization away from the standard ``[OpenDSA]/lib/odsaStyle.css`` template).
Our standard practice is to use ``<script>`` and ``<link>`` tags
to call separate .js and .css files, respectively.

**CSS Files**
We use ``csslint`` to validate css files.
``[OpenDSA]/Makefile`` contains our required csslint flags.

**JavaScript**
We use ``eslint`` for validating JavaScript.
OpenDSA/.eslintrc contains our official configuration file that
defines the expected style.
It is relatively strict.
Developers should strive to eliminate all warnings (and of course, all
errors).

**JSON Files**
We use ``jsonlint`` to validate json files.


-------------------------
Web Programming Resources
-------------------------

Since we do so much webpage development and programming in JavaScript,
newcomers will need good resources.
One well-respected site is
https://developer.mozilla.org/en/JavaScript.
Beware of doing a search engine query and ending up at w3schools,
which is not so well respected these days.
If you are at Virginia Tech (or if your school supports this), a
wonderful source of documentation is the Safari database
(http://proquest.safaribooksonline.com/?uicode=viva), which contains a
huge collection of technical books including the entire O'Reilly
catalog.


-----------------------------------------
Disabling the Browser Cache and Debugging
-----------------------------------------

When you right-click a web page in Chrome
(or Firefox when Firebug is installed), you get a popup
menu whose bottom item is "Inspect Element".
This brings up the Chrome Developer Tools panel (in Chrome) or Firebug
(in Firefox).
The first thing that you will want to do is to turn off your browser
cache when you have the developer panel open, so that reloading your
page will show updates to your JavaScript and CSS files that you have
been working so hard on.
In Crome click on the button with 3 vertical dots to the right of the
the developer panel, and then click ``settings`` in the popup window.
Find and check the box that says "Disable cache (while DevTools is open)".

The Developer panel can do a lot, but two key things are the console
(which lists various error and debug messages), and the inspection panel
for inspecting the various DOM elements on your web page.
The inspection panel lets you see the CSS styles in effect for any
specified DOM element.
For details on how to view and
even edit on-the-fly your CSS settings in force (for example, to see
what you should change), see
https://developers.google.com/chrome-developer-tools/docs/elements-styles.

While Chrome has built-in developer tools (and a lite version of
Firebug), we highly recommend using the full version of Firebug,
available for Firefox, for JavaScript debugging.
More information about Firebug's features can be found here:
https://getfirebug.com/.

The following are highlights for some debugger features and how they
can be used.

* Console - an interactive JavaScript console which allows:

  * Print statments for debugging and error logging.

  * Testing JavaScript statements (including access to variables and
    functions defined on the current page).

  * Viewing network requests - GET and POST messages appear in the
    console allowing the user to see what data was sent and the server's
    response.

* Inspect - allows the user to select an element on a page, view the
  HTML for it and modify the element's CSS in real time (helpful for
  rapid GUI prototyping).

* Debugger - a full featured JavaScript debugger (useful for debugging
  or simply following code execution).


------------------------------------------
Setting up a Local Development Environment
------------------------------------------

There are two ways to set up your system to do local development on
OpenDSA content: set up in a virtual box, or install the toolchain
manually.


Using a Virtual Box
~~~~~~~~~~~~~~~~~~~

If all that you want to do is compile OpenDSA content, then you could
set up the toolchain manually (see the next section), or use the
virtual box to set everything up automatically.
If you plan to do more, including running the OpenDSA or Code
Workout back-end servers, then the only practical approach is to
install the OpenDSA DevStack in a virutal box.
To make this relatively easy for most developers, we have created a
package to deliver a complete "OpenDSA in a box" on a virtual
machine.
Complete instructions can be found at:
https://github.com/OpenDSA/OpenDSA-DevStack.


Installing the Toolchain Manually
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Here are instructions for installing the toolchain manually,
which should then allow you to compile OpenDSA books.
These instructions are geared toward Windows, since that is the
hardest to install.
For Linux or Mac, you can do pretty much the same thing (using sudo
for root permissions, and getting the tools from your package
manager),
but can skip some of the steps.

First, install Git.
On Windows, a good choice is  "Git for Windows" at
https://git-scm.com/download/win.
Use the third option for the path environment:
"Use Git and optional Unix tools from the Windows Command Prompt".
Choose "checkout as-is, commit Unix-style line endings",
and then use "MinTTY".

Then on Windows you will need to install "make"
from http://gnuwin32.sourceforge.net/packages/make.htm.
IMPORTANT: Put it in Program Files, NOT Program Files (x86).
Then,edit your environment variable PATH to add:
C:/Program Files/GnuWin32/bin.

Next, install nodejs (on Windows, you can get it from
https://nodejs.org/en/download/).

Now, open a Git Bash window and do::

   npm install -g eslint  [If this is a fresh install of nodejs, this could take awhile]
   npm install -g csslint
   npm install -g jsonlint
   npm install -g uglify-js

Next, install Python 2.7.
Be sure to add it to your PATH variable.
For example, if you choose to put it at the top level of your C:
drive, then add C:/Python27 and C:/Python27/Scripts to your PATH.
Note: If you already have Python 2.7 installed, but it does not have
pip, then it is so obsolete that it needs to be thrown away and
replaced.

Finally pop open a **new** Git Bash window, and clone the OpenDSA
repo from https://github.com/OpenDSA/OpenDSA.

Then do the following::

   cd OpenDSA
   pip install -r requirements.txt
   make pull [This could take awhile]

At this point, you should be all set up. To test things, you can try
doing::

  make Test

This should put a test book into ``[OpenDSA]/Books/Test``.

Running a Local Web Server
~~~~~~~~~~~~~~~~~~~~~~~~~~

To see most OpenDSA content properly, it must be viewed through a web
server.
It won't work just to point your browser at the local HTML files.
But you probably don't want to install a real web server like Apache
on your local machine.
Fortunately, there is a simple alternative.
Take a look at the file ``[OpenDSA]/WebServer``.
This gives easy instructions on starting up a web server to view your
OpenDSA content.
Simply open a new command window, go to the top level of your copy of
the OpenDSA repository, and type ``./WebServer``.
This will start up the local webserver script
(leave the command window open, it will be dedicated to running the
webserver until you are done with it).
Then go to a browser window, and point your browser to the URL shown
in the ``WebServer`` script file.
This will be the top level of the OpenDSA directory, and you can
browse through it in the normal way.
Any books that you compiled will be in the ``Books`` directory.


------------------------------------
Writing Visualizations and Exercises
------------------------------------

The OpenDSA system has been developed over many years to help people
write simple or complex visualizations and interactive exercises.
Depending on what you want to do, there might be a lot
to learn.
To get you productive quickly, we created the ``SimpleDemo``
materials.
Once you have your development environment installed, you should
compile the ``SimpleDemo`` book instance
(do ``make SimpleDemo`` from the top level of the OpenDSA repository).
Then read the module, but also look at the sourcecode for both the
module and the various examples.
These will show you a lot of what you will need to implement your own
visualizations and exercises.
