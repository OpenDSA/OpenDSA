This is the developer's repository for the OpenDSA project. Note that
the stable release version is maintained at SourceForge as part of the
OpenAlgoViz Project, which can be checked out as:
svn co https://openalgoviz.svn.sourceforge.net/svnroot/openalgoviz/OpenDSA OpenDSA

The goal of the OpenDSA project is to create open-source courseware
for use in Data Structures and Algorithms courses, that deeply
integrate textbook-quality content with algorithm visualizations and
automated assessment exercises.

An outline of the major components in the directory structure is as
follows:

Makefile: Typing "make" will generate the target directory (build),
converting from .odsa files to .html files.

build: This is were the various targets go to. This will be the
generated "book" example that we maintain for public access.

Modules: The source directory for .odsa files.

Doc: Documentation. Currently contains the modual authoring guilde.

Modules/Images: Images used by the modules.

Scripts: Scripts used to process the content.

Exercises: Our Khan Academy-style exercises.
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

AV: The various AVs, that are typically included into modules using
iframes.

lib: Contains the khan-exercises submodule.

JSAV: The JavaScript Algorithm Visualization library (JSAV). This is a
submodule for the OpenDSA repository. Thus, when you check out
OpenDSA, you must get the JSAV submodule by doing the following:
  git submodule init
  git submodule update

To check out a read-only copy of this repository:
  git clone git://github.com/cashaffer/OpenDSA.git OpenDSA

To check out a read-write copy of this repository (requires permission to commit to the repo):
  git clone https://YOURGITHUBID@github.com/cashaffer/OpenDSA.git OpenDSA