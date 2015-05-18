.. _AV:

====================================
Notes for AV and Exercise Developers
====================================

--------------------------------------------------
Configuration: Code lines and Internationalization
--------------------------------------------------

Any JSAV-based exercise or AV (either standalone or an in-lined
slideshow) can be associated with a configuration file.
This is a ``.json`` file whose default name is the same as the name of
the container for an inlined slideshow, or the same as the standalone
AV or exercise.
Configuration files support sections for defining all strings (used
for internationalziation support), mapping logical names to code lines
(to support alternate programming language examples in JSAV code
objects), and setting defaults for configuration parameters.

File Format
===========

The file format needs to be documented.
In the meantime, a good example is ``AV/Sorting/insertionsortAV.json``.


Use Case: Standalone AV or Proficiency Exercise
===============================================

Given a standalone AV with HTML file ``foo.html`` that contains a
``div`` with classnam ``avcontainer`` and
JavaScript file ``foo.js``, the configuration file would normally be
named ``foo.json``.
After creating a configuration object, the string interpreter and code
interpreters will typically be created as follows::

   av = new JSAV($(".avcontainer"));
   // Load the config object with interpreter and code created by odsaUtils.js
   var config = ODSA.UTILS.loadConfig(),
       interpret = config.interpreter,       // get the interpreter
       code = config.code;                   // get the code object
   var pseudo = av.code(code);

Use Case: Inline Slideshow
==========================

The RST file will reference a given slideshow with a specified ``div``
name as::

   .. inlineav:: fooCON ss

The corresponding JavaScript file that implements the slideshow will
create the JSAV, config, interpreter, and code objects with code
like::

   var av_name = "fooCON";
   // Load the config object with interpreter and code created by odsaUtils.js
   var config = ODSA.UTILS.loadConfig({"av_name": av_name}),
       interpret = config.interpreter,       // get the interpreter
       code = config.code;                   // get the code object
   var av = new JSAV(av_name);
   var pseudo = av.code(code);


Use Case: No pseudocode object
==============================

Creating the ``code`` object is not necessary if no pseudocode object
is used in the visualization.
A shortened version is therefore as follows::

   var av_name = "fooCON";
   var interpret = ODSA.UTILS.loadConfig({"av_name": av_name}).interpreter;
   var av = new JSAV(av_name);
 

Use Case: Shared JSON file
==========================

Occasionally you might have multiple slideshows that share code or
strings, such that it makes sense for them to share a configuration
file.
In this example, consider a JavaScript file ``fooCON.js`` that
contains the code for one or more slideshows, with shared
configuration file ``fooConfCON.json``.
The associated RST file would contain a line for each slideshow, such
as::

   .. inlineav:: fooS1CON ss

Each slideshow implemented in ``fooCON.js`` would contain code similar
to::

   var av_name = "fooS1CON";
   // Load the config object with interpreter and code created by odsaUtils.js
   var config = ODSA.UTILS.loadConfig(
                  {"av_name": av_name, "json_path": "AV/Topic/fooConfCON.json"}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
   var av = new JSAV(av_name);
   var pseudo = av.code(code);


Using the configuration
=======================

After creating the interpreter and code objects, they can be used to
replace text strings and line numbers as follows::

   // If the .json file has definitions for av_c2 and av_c3 in various languages:
   av.umsg(interpret("av_c2"));
   av.label(interpret("av_c3", {top: 10, left: 10}).show();
   // If the .json file has definitions for codelines with the tag ``loop``:
   pseudo.setCurrentLine("loop");

--------------
URL Parameters
--------------

The client-side framework provides functionality to support easy
processing of URL paramters in any stand-alone AV or exercise.
See ``parseURLParams()`` in the
:ref:`Client-side Development  <Client-sideDevelopment>` section.

Some URL parameters are considered a standard part of the system and
have built-in support.
These include the parameters to control the natural language, the
programming language
(see :ref:`Internationalization Support <Client-sideDevelopment>`),
and the exercise grading options.
AV/exercise developers can also implement support for their own ad hoc
URL parameters.

When an AV or exercise is embedded in an OpenDSA module via the
``avembed`` directive, the URL parameters are controlled by the
:ref:`configuration process <Configuration>`.
However, if a third party wishes to call the stand-alone AV or
exercise directly (perhaps someone will want to embed calls within
their own HTML pages), URL parameters are invoked as follows.

  <URL>?JXOP-code=java

This one directs the AV to display Java code.

  <URL>?JOP-lang=fi

This one directs the AV to use Finnish for its text.

Proficiency exercises typically support various grading modes.
These are documented in the
:ref:`Configuration<Configuration>` section.
The typical options are as follows::

   <URL>?JXOP-feedback=atend
   <URL>?JXOP-feedback=continuous&JXOP-fixmode=undo
   <URL>?JXOP-feedback=continuous&JXOP-fixmode=fix

---------
Equations
---------

Within ``jsav.umsg()`` text, all math should be done using LaTeX
format enclosed within ``$...$`` (for inline expressions) or
``$$ ... $$`` (for display equations).
MathJax will automatically recognize the dollar sign markup, and it
will automatically do the conversion from LaTeX format to HTML.
The only peculiarity that you should need to worry about is that
backslashes must be escaped by using two backslashes.
So a typical math markup within an AV or slideshow might look like::

   jsav.umsg("This takes $\\Theta(n)$ time.");

---
CSS
---

Anything related to visual element style that is static should be
defined in a CSS file.
For example, if a JSAV array is placed at a specific location that
never changes, then this location should be defined within a CSS file
for your AV or slideshow.

While the client-side framework should automatically resize the AVs
iFrame, developers should set the default height and width of the AV
to accommodate the maximum size of the AV (such as an optional code
block). If the automatic resizing should fail, the exercise should still
be useable even if it doesn't look as nice.

Some styling aspects are dynamic. For example, over the course of a
visualization, nodes in a tree might need to change color to emphasize
the action being visualized. Looking at the JSAV manual, you will
notice that most visual elements can be styled with a ``.css()``
method on the element.
But in nearly all cases, we wish to avoid using that method.
We prefer to use the ``.addClass()`` and ``.removeClass()`` methods to
control dynamic element styling whenever possible.
These methods will dynamically assign or remove a CSS class to the
element in the DOM.
You can define any necessary new class in your AV's CSS file.
But before doing so, you should first check to see if a suitable class
already exists in the OpenDSA style file at ``lib/odsaStyle.css``.
Given that we have developed a lot of visualizations already, the odds
are pretty high that whatever visual styling you want to do is
semantically equivalent to something that we already support.
If so, you should be using the same style definition.
For example, if you have a cell in an array or a node in a tree that
your AV is currently acting on, then you probably want to indicate
this by styling it using ``mynode.addClass("processing")`` for a tree
node object named ``mynode``, or using ``myarray.(index,
"processing")`` for array position ``index`` in JSAV array ``myarray``.


--------------------------------------------
"Stand-alone" vs. "Inline" AVs and Exercises
--------------------------------------------

Structurally, there are two ways that we include AVs and exerices into
a module.
First is the "stand-alone" artifact, which has its own HTML pages.
In principle, this might be anything with its own URL, though in
practice we usually only include our own materials.
This is done using the ``avembed`` directive
(see :ref:`avembed`).
When converted to HTML, the mechanism used is a standard ``iframe``
tag to include the artifact.
Note that the size of the iframe is controlled by an XML file
corresponding to the thing being embedded.
For example, if you are going to avembed something at
``AV/Sorting/insertionsortAV.html``, then there must be an XML file to
define the size at
``AV/Sorting/xml/insertionsortAV.xml``.
The book compilation script will hard stop when processing the avembed
directive if that XML file does not exist.

"Inline" AVs are usually either a JSAV diagram or a JSAV slideshow
(a diagram is just a "slideshow" with no slide controls at the top).
These are included using the ``inlineav`` directive
(see :ref:`inlineav`).
The ``avID`` is the container name for the AV.
Of course, the final HTML page has to get access to the relevent
JavaScript and CSS files.
This is done by putting at the bottom of the .rst file an
``odsascript`` directive giving the path and name of the Javascript
file (see :ref:`odsascript`).
If a CSS file is used, then you put near the top of the .rst file
(right after the ``avmetadata`` block) an ``odsalink`` directive
giving the path and name of the CSS file (see :ref:`odsalink`).
Our naming convention is that all inlineavs use container names that
end in ``CON``, and that the .js and .css files use the container
name.
Further, our convention is that each individual slideshow or diagram
be in its own JavaScript file (though this is convention is violated
on occasion if there are a lot of very short slideshow files in a
given page).

The ``odsascript`` and ``odsalink`` directives do nothing more than
map down to ``<script></script>`` and ``<link></link>`` tags,
respectively, in the final HTML pages.
Their purpose is merely to keep module authors from needing to use raw
HTML code in an RST file.

When you embed multiple slideshows on the page (with ``inlineav``),
they will naturally share the same namespace, both for code
and for CSS.

For code, this is not generally an issue, because it is our standard
procedure to wrap all of our code in an "anonymous function", and then
reference the key identifier (the container div) by name.
This is why you will always see (in any of our code that has been
cleaned to our internal spec, which should be everything except
perhaps code in the Development directory)
something like the following::

   $(document).ready(function () {
     var av_name = "insertionsortS1CON";
     ...
     var av = new JSAV(av_name);
     ...
   });

This does the following:

* document.ready makes it wait until everything is loaded

* It is all wrapped in a function, so that its namespace will not
  conflict with other slideshows.
  That way, for example, the global
  variables for one slideshow (like ``av`` in this example) are
  separate from the other slideshows.
  (This actually causes a problem if you want to include functions
  from other .js files.
  See  :ref:`Encapsulation`.)

* Use of the container name (such as in the JSAV call) is why THIS
  code gets executed on THIS container instead of the OTHER .js files
  that you loaded on the page.

Each ``inlineav`` might need to set some CSS styling with the same
name as other slideshows will use.
You handle this by "qualifying" the relevant variable to the name of
the div that contains it.
Look for example at ``AV/Binary/BSTCON.css`` to see examples.
Notice lines that look like::

   #avnameCON .jsav.jsavtreenode {
     ...
   }

This will make your styling changes on the tree nodes only affect that
particular slideshow.

----------
Slideshows
----------

The text in slideshows should be complete sentences.
Which means that nearly always, there should be a period at the end of
the sentence.
The only exception would be when a series of slides is building up a
sentence, such as if one slide said "First we do this...", and then
the following slide replaced it with
"First we do this, then we do that."

---------------------
Programming Exercises
---------------------

To create a programming exercise, you will need to create/modify files
on the front-end and others on the back-end:

* Front end:

   1. Go to  OpenDSA/Exercises/ModuleName. ModuleName can be any of the modules in the Exercises directory (e.g. List, Binary, RecurTutor..etc )
   
   2. Create html file exercisename.html. 
   
   3. Open the html file and modify the text of the following tag to have the problem statement::
   
      <p class="problem" id = "test">
   
      e.g. Complete the missing recursive call so that the following function computes something.

   4. Modify the text of the codeTextarea to have the code that required to be edited by the student::
   
      <textarea  id="codeTextarea">
      
      Example::
   
       int examplefunc(int i) {
   
        if (i > 0) {
    
         if (i % 2 == 1) {
   
          return i;
   
        }
   
        //<<Missing a Recursive call>>
   
       }
   
       }
   5. Add a DOM variable to specify the programming exercise type (e.g. recursio, BinaryTree, List,..etc)
      
      Example::
      
         window.progexType= "recursion";    
      
       
   6. Open OpenDSA/config/ModuleName.json
   
   7. Add the exercise in the exercises section as the following example::
   
      "recprogex1":{   
      "long_name": "Recursion Programming Exercise Number or Description",
      "required": true,
      "points": 0.0,
      "threshold": 1.0}
   
      
   8. Open OpenDSA/RST/en/ModuleName/ModuleName.rst
   
   9. Add the following line so that the programming exercise appears in the lesson. As the following example::
    
      .. avembed:: Exercises/RecurTutor/recprogex1.html ka

   10. Build the book on the front end:
   
      a. Go to by the command CD OpenDSA/
      
      b. Run the command: sudo make ModuleName
     

* Back end (Unit tests):

   1. Go to OpenDSA-server/ODSA-django/openpop/build/ModuleName
   
   2. Create a directory with the same name as the exercise name created on the front end (e.g. recprogex1)
   
   3. Create java file that will have the unit tests: exercisename.java (e.g. recprogex1.java)
   
   4. Open the exercisename.java.
   
   5. Name the class in the file as studentexercisename (e.g. studentrecprogex1). 
      Note that the class should be missing its closing brace. 
      The Python code on the back end will append that closing brace dynamically when the student submit his code. 
      The Python code appends the function submitted by the student to the java code and add the closing brace dynamically.
   
   6. Create a  function in the java file that returns the model answer.
   
   7. In the main function, create the code required for the unit tests and call the model answer function (e.g. int x= modelexercisefunction(i)).
   
   8. For each unit test, call both the model answer function and the function given to the student in the front end in::
   
      <textarea  id="codeTextarea">
      
      Example:: 
      
        examplefunc(int i)
   
   9. Compare both answers as follows::
   
       if (studentfunctionreturn(i) == modelexamplefunction(i)) SUCCESS = true;

       try{

       PrintWriter output = new PrintWriter("output");

       if (SUCCESS) {
       
       output.println("Well Done!");
       output.close();
       }
       
       else
       {
       output.println("Try Again! Incorrect Answer!");
       output.close();
       }

       }
       catch (IOException e) {
       e.printStackTrace();
       }
       }

   10. Note that: you should do the necessary logic to make sure that all the unit tests are correct. 
       Also, you will not need to modify any of the Python files on the back end.
