This is the working directory for the OpenDSA project.

Makefile: Typing "make" will generate the target directory (build),
converting from .odsa files to .html files.

build: This is were the various targets go to. This will be the
generated "book" example.

Modules: The source directory for .odsa files

Doc: Documentation. Currently contains the modual authoring guilde.

Images: Images used by the modules.

Scripts: Scripts used to process the content.

Exercises: Khan Academy-style exercises. WARNING: You can run
everything in the project with just the distribution EXCEPT for the
exercises. You cannot see the exercises unless you clone the GitHub
repository of their infrastructure and place it as a sibling to this
directory. To install that do the following from THIS directory.
   cd ..
   git clone git://github.com/Khan/khan-exercises.git khan-exercises


AV: The various AVs, that are typically included into modules using
iframes.

BinaryTreeChapter.pptx: Quick-and-dirty diagram of the prereq
relationships for the Binary Tree chapter.

To check this repository out:
  git clone git://github.com/cashaffer/OpenDSA.git OpenDSA
