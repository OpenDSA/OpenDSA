This is the developer's repository for the OpenDSA project. Note that
the stable release version is maintained at:
https://github.com/cashaffer/OpenDSA-stable.

The goal of the OpenDSA project is to create open-source courseware
for use in Data Structures and Algorithms courses, that deeply
integrates textbook-quality content with algorithm visualizations and
interactive, automatically assessed exercises.

The major components in the directory structure is as follows:

AV: Source code for various algorithm visualizations and associated
exercises. Subdirectories divide the content by topical areas.

Books: This contains compiled versions of "textbooks".

config: This holds configuration files for specific books (whose
output will go to the "Books" directory).

configure.py: The file used to drive book compilation.

Doc: Documentation. Currently includes a template for Khan Academy
multiple choice questions, and documentation for using the various
Sphinx directives that we have created.

Exercises: Our Khan Academy Infrastructure-based exercises.
Subdirectories divide the content by topic.

**Frontend: Experimental interface for allowing instructor selection of
modules. Currently not in use, will be replaced at some point.

JSAV: The JavaScript Algorithm Visualization library (JSAV). This is a
submodule for the OpenDSA repository, linked to:
https://github.com/vkaravir/JSAV. Thus, when you check out OpenDSA,
you must get the JSAV submodule by doing the following:
  git submodule init
  git submodule update

lib: System-wide library files

Makefile: Primarily for source file validation and to generate some of
the "textbooks" to the Books directory.

MIT-license.txt: The license file. OpenDSA is distributed under an MIT
open source license.

**Modules: Tutorial source from an obsolete system for generating
content. Will be removed.

ODSAkhan-exercises: Our somewhat modified version of the
khan-exercises distribution (the original is also available at
GitHub).
Note that you can view and run the exercises with just
this distribution. However, you must be running a webserver on the
machine from which you access the exercises. So most people using
their own personal computer won't see the exercises, it will either be
a blank page or some gibberish. You can always see the exercises
within their proper context from our mirror site at:
http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises.

QBank: A question bank system under development. This is a submodule
maintained at: https://github.com/cashaffer/QBank.

README.txt: This file

RST: The source for tutorial content, in reStructuredText (RST) format.

SourceCode: The sourcecode for code snippits contained in the
tutorials. Ultimately, we hope to support code snippits in Processing
(a Java dialect), Python, and JavaScript. In this way, instructors
would be able to generate versions of tutorials that support any of
these three languages.

**Storyboard: Materials related to "storyboarding" designs for
tutorials. This concept never gained much traction, and this might be
removed at some point.

Webserver: A command for invoking a simple python-based web server
that will enable you to run the Khan Academy exercises if your machine
is not running a true web server. You only need to have python installed
for this to work.


In order to pull a more recent copy of JSAV than what is in the submodule:
   cd JSAV
   git pull https://github.com/vkaravir/JSAV 
A similar command will let you pull the up-to-date version of QBank.

To check out a read-only copy of this repository:
  git clone git://github.com/cashaffer/OpenDSA.git OpenDSA

To check out a read-write copy of this repository (requires permission
to commit to the repo):
  git clone https://YOURGITHUBID@github.com/cashaffer/OpenDSA.git OpenDSA
