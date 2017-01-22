This file provides a "legend" for all the parse tree demos in this
directory.  They are in files names parseTreeX.js/css/html, where X is
empty or a number.

* parseTree.css -- Style sheet for parseTree.js/html and parseTree1.js/html

* In general the js files are set up to work with a plain vanilla HTML
  file for development/debugging/test and also to work as an AV in a
  RST-generated book.  To switch from one to the other, there is a
  copde block that needs to be commented out or in.

* parseTree.js/html -- Parse tree for David's lambda calculus chapter

* parseTree1.js/html -- slide show demo for expression grammar that is
  not left recursive.  Taken from chapter on recursive descent parsers
  in Tom's data structures book.

* parseTree2.js/html -- initial attempt at slide show demo for
  JISON-generated parser.  Currently the tree is hard-wired, that is,
  the tree is produced from JISON's parser in a separate run and then
  hard-wired into the AV.  

* parseTree3.js/html -- Slide show demo for JISON-generated parser.
  Unlike parseTree2, the JISON parser is now incorporated into the
  parseTree3.js and called on the fly to produce the parse tree

* parseTree3a.js/html/css -- Slide show demo in which the viewer can
  enter the expression to be parsed.


