This is the working directory for the OpenDSA project.

Makefile: Typing "make" will generate the target directory (build),
converting from .odsa files to .html files.

build: This is were the various targets go to. This will be the
generated "book" example that we maintain for public access.

Modules: The source directory for .odsa files.

Doc: Documentation. Currently contains the modual authoring guilde.

Modules/Images: Images used by the modules.

Scripts: Scripts used to process the content.

Exercises: Khan Academy-style exercises. WARNING: You can run
everything in the project with just the distribution EXCEPT for the
exercises. If you want to actually be able to see the exercises in
your own development copy, you have to do two things.
1) Populate the khan-exercises submodule by doing
   git submodule init
   git submmodule update
2) You must be running a webserver on the machine from which you
access the exercises. So most people using their own personal computer
won't see the exercises, it will either be a blank page or some gibberish.

AV: The various AVs, that are typically included into modules using
iframes.

BinaryTreeChapter.pptx: Quick-and-dirty diagram of the prereq
relationships for the Binary Tree chapter.

khan-site.html: Our version of the "skin" template for KA-style
exercises.

lib: Contains the khan-exercises submodule.

Backend: Support for manipulating views of a collection of modules.

To check this repository out:
  git clone git://github.com/cashaffer/OpenDSA.git OpenDSA
