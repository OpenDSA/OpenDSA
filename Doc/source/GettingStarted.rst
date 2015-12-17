.. _GettingStarted:

===============
Getting Started
===============

------------------------------------
Overview and Developer's First Steps
------------------------------------

OpenDSA consists of content delivered by servers.
Content is delivered in the form of "book instances", which are
created by the :ref:`configuration process <Configuration>`.
A book instance is accessed through a Learning Management System (at
the moment, we are only supporting Canvas), with the files delivered
by an LTI Content Provider.
Various support operations are conducted by the OpenDSA Server.
If you want to develop content, then create a book instance and view
it, then you will need to set up the necessary infrastructure.
For testing purposes, this has all been packaged together to simplify
setting up a development environment.
See https://github.com/OpenDSA/OpenDSA-DevStack for how to set this
up.

Once you have the development environment in place, the next step is
to get an account on a Canvas server.
You can either use one provided by your institution, set up your own
Canvas server, or use the public test server provided by Instructure
at https://canvas.instructure.com.
With your account in place, you can tell Canvas to create a course.
The place to start is to create a course named "Test".
You will then go back to your development environment, and create a
:ref:`course configuration file <Configuration>`.
You should start with one named "Test_LMSconf.json", made by copying
the template in the config directory.
You can then go to the top of the OpenDSA repository, and do
``make Test``.
If everything worked right, then you will have populated your course
on Canvas with some content.
At this point, you are ready to learn about the parts of the system
that you need to know in detail so that you can do useful work.


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
  The stable releases are kept in a separate repository at
  https://github.com/OpenDSA/OpenDSA-stable.

* Most developers should use the version of JSAV distributed with
  OpenDSA. However, if your task requires the most recent changes then
  the development version of JSAV can be found at:
  https://github.com/vkaravir/JSAV.

* We use the Khan Academy infrastructure for exercises and distribute
  the necessary portions with OpenDSA.

* Support for setting up OpenDSA servers can be found at https://github.com/OpenDSA/OpenDSA-DevStack.

* The OpenPOP project is in a separate repository at
  https://github.com/OpenDSA/OpenPOP.

* The QBank project is in a separate repository at
  https://github.com/OpenDSA/QBank.

The stable releases of OpenDSA and JSAV are mirrored at:
http://algoviz.org/OpenDSA/ and http://algoviz.org/OpenDSA/JSAV,
respectively.
The built version of the stable modules are mirrored at:
http://algoviz.org/OpenDSA/Books. 
The development versions of OpenDSA and JSAV are mirrored at:
http://algoviz.org/OpenDSA/dev/OpenDSA and
http://algoviz.org/OpenDSA/dev/OpenDSA/JSAV, respectively.


----
JSAV
----

Visualizations are developed using the JSAV (JavaScript Algorithm
Visualization) library.
Documentation for the JSAV API can be found at: http://jsav.io/


------------------------------------------
File Structure and File Naming Conventions
------------------------------------------

The following refers to the OpenDSA content or "client side"
repositories ("OpenDSA" and "OpenDSA-stable").

Content materials come in the form of modules (in RST), exercises,
AVs, etc. There are various top-level directories, as explained below
and in more detail in the project README file
(https://github.com/OpenDSA/OpenDSA/blob/master/README.md). Within the
RST, AV, SourceCode and Exercises directories, the materials are
subdivided into subdirectories based on topical content (such as
Sorting).
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
customization away from the standard lib/odsaStyle.css template).
Our standard practice is to use ``<script>`` and ``<link>`` tags
to call separate .js and .css files, respectively.

**CSS Files**
We use ``csslint`` to validate css files.
OpenDSA/Makefile contains our required csslint flags.

**JavaScript**
We use ``eslint`` for validating JavaScript.
OpenDSA/.eslintrc contains our official configuration file that
defines the expected style.
It is relatively strict.
Developers should strive to eliminate all warnings (and of course, all
errors).

**JSON Files**
We use ``jsonlint`` to validate css files.

-----
Tools
-----

This section describes the various tools that are either required or
might be particularly helpful for various aspects of OpenDSA
development.

git
===

There are several versions of git for Windows
We recommend the version found at http://msysgit.github.com/.
This guide assumes that windows users are working through the Git Bash
command window.
When installing ``msysgit``, you should install it at the
level of ``C:\``, rather than in ``C:\Program Files``.
Otherwise, you are likely to have troubles interacting with
``GnuWin32`` tools (for ``make``).
Aside from this, just accept the default configuration options.


make
====

GNU make for Windows can be found at
http://gnuwin32.sourceforge.net/packages/make.htm.

Python
======

We are using Python 2.7 (NOT 3.x).


Python setuptools
=================

Python setuptools is used for installing Sphinx.
On Linux this might come preinstalled.
If not, run the following using the appropriate package manager for
your distribution (on Ubuntu, it is "apt-get")::

   sudo <package_manager> install python-setuptools

On windows, see http://pypi.python.org/pypi/setuptools#files.
You will need to include [PythonHome]/Scripts on your PATH system
variable for both setuptools and sphinx.
I had some trouble installing setuptools for the 64-bit version of
Python 2.7.3 on Windows.
When I tried to install setuptools, it wouldn't recognize that a
Python installation was available.
This is a known problem.
You can either re-install the 32-bit version, or look
on the internet for the proper registry work-around.


sphinx
======

For documentation, see http://sphinx.pocoo.org/contents.html.

With Python and setuptools installed, just type
``easy_install -U Sphinx`` at the command line.


Hieroglyph
==========

Hieroglyph is only needed to compile course slides.
You need to use version 0.5.5 (newer versions don't work).
To install, just type ``easy_install pip; pip install hieroglyph==0.5.5``
at the command line.

nodejs
======

We don't use nodejs directly in our toolchain, but this is useful for
installing several of the other tools.
For installation instructions, see
http://nodejs.org (and don't forget to check for the 64-bit version if
that is the OS you are running).

eslint
======

Once you have nodejs installed, just do::

   npm install -g eslint

csslint
=======

Once you have nodejs installed, just do::

   npm install -g csslint

Note: To be able to lint check either JavaScript or CSS, you need to
put it in separate files from your HTML code.

jsonlint
========

Once you have nodejs installed, just do::

   npm install -g jsonlint

uglifyjs
========

We use this for minimizing JavaScript code.
To install on Windows::

   npm install -g uglify-js

On Linux, you more likely will need to use the package manager.
For example, on Ubuntu::

   apt-get install uglifyjs

Some other things: requirements.txt
===================================

(This needs more documentation.)
From the top level of the OpenDSA directory, do the following:

   pip install -r requirements.txt

Notes for Windows
=================

* You will need to be sure that Git, Python, and make are on your
  path.
  On Windows 7, you edit your path variable by right-clicking your
  Computer icon, clicking on "Advanced system settings" and then
  "Environment Variables".

* If you have a 64-bit operating system, be aware that the various GNU
  tools will not work properly if they see "Program Files (x86)" on the
  system path variable. You might need to install these tools elsewhere,
  and/or reorder things on the path so that the GNU tool appears before
  anything referencing "Program Files (x86)". 

* We have had a lot of trouble getting the Git Bash shell to work
  properly when running GnuWin32 tools like "make". One solution is to
  make sure that Git is not installed to a directory whose name has
  spaces in it (in particular, the standard "Program Files" directory
  that is the default). Instead, we find it most reliable to install Git
  directly into C:/.

* Beware if you have Cygwin installed on your Windows machine: There
  might be path conflicts between Cygwin on the one hand, and the Git
  Bash shell and the GNU tools on the other.
  If you insist on trying to use both on your system, you are on your
  own.
  Otherwise you have two reasonable options: 

  * If you don't use Cygwin much, then delete it entirely from your
    system.

  * Or stick completely with using Cygwin, by running Git and your
    other tools from within it instead of the Git command shell.


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


---------
Debugging
---------

When you right-click a web page in Chrome
(or Firefox when Firebug is installed), you get a popup
menu whose bottom item is "Inspect Element".
This brings up the Chrome Developer Tools panel (in Chrome) or Firebug
(in Firefox).
This is especially helpful for inspecting the various DOM
elements on your web page.
A big help here is seeing the CSS styles in
effect for any specified DOM element. For details on how to view and
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


--------------------------------
Setting up a Testing Environment
--------------------------------

To compile your own books for testing purposes requires rather a lot
of infrastruture.
It also involves running multiple servers: at least one for the LTI
provider and one for the OpenDSA scoring server.
To make this relatively easy for most developers, we have created a
package to deliver a complete "OpenDSA in a box" on a virtual
machine.
Complete instructions can be found at:
https://github.com/OpenDSA/OpenDSA-DevStack.
