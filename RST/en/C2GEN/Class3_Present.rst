.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: OpenDSA Introduction
   :topic: Introduction


Contributing to OpenDSA
=======================

OpenDSA is an Open Source project. Many people have contributed over
the years.

Fundamentally, OpenDSA has two parts: Intrastructure and Content.

*  Most contributors contribute content. Many types of content are
   easy.
*  Many students like to learn learn HTML5/CSS/JavaScript, and
   contributing to OpenDSA is a good vehicle to motivate learning
   these things.


Editing RST
-----------

The "textual" content is written using ReStructuredText (RST).
This is a so-called "simple markup" language, similar to what most
wikis use.
It is pretty easy to look at an example source file, and quickly see
how to modify or write new content.

*  `Homepage <http://docutils.sourceforge.net/rst.html>`_
*  `Quick reference <http://docutils.sourceforge.net/docs/user/rst/quickref.html>`_

See `example <https://raw.githubusercontent.com/OpenDSA/OpenDSA/master/RST/en/C2GEN/Class1_Tour.rst>`_.

Translation support
-------------------

OpenDSA provides support for generating book instances in other
written languages, if the translations are available.

*  See OpenDSA's RST file `directory structure
   <https://github.com/OpenDSA/OpenDSA/tree/master/RST>`_
*  Each written language gets its own directory. The subdirectory
   structure and file names must match.
*  `Example
   <https://raw.githubusercontent.com/OpenDSA/OpenDSA/master/RST/fi/Sorting/Mergesort.rst>`_

AVs and exercises also have a mechanism to support translation (as
well as alternate code languages.
This is done using a JSON file to specify the alternatives.

* `Example
  <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/insertionsortAV.json>`_


Exercises with the KA framework
-------------------------------

The Khan Academy exercise framework provides a rich mechanism for
creating almost any exercise that you can imagine an algorithm to:

*  Generate the problem instance statement
*  Generate the model answer
*  Provide a user interface to specify the student answer
*  Compare the student answer to the model answer to determine if it
   is correct.

Exercises are specified with a specialized HTML markup, with
JavaScript available for computation.

A variety of simple "static" exercises, or exercises with "simple"
forms of parameterization do not require programming expertise.

Examples:

*  Multiple choice question (with math), hints

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Sorting/BinsortMCQ2.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Sorting/BinsortMCQ2.html>`_

*  Simple (text-only) "spin"

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Sorting/MergesortMCQcost.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Sorting/MergesortMCQcost.html>`_

*  None-of-the-above distractor, simple computation

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Sorting/ShellsortMCQ3.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Sorting/ShellsortMCQ3.html>`_



*  Summary question

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Sorting/InssortSumm.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Sorting/InssortSumm.html>`_


*  More complicated computation/selection

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Development/ODSAindex.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Development/ODSAindex.html>`_


*  Generating a problem instance and answer

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Binary/TreeOverhead1.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Binary/TreeOverhead1.html>`_


*  Simple JSAV integration

   `Question
   <http://algoviz.org/OpenDSA/dev/OpenDSA/Exercises/Binary/Dprobs.html>`_

   `Source
   <https://github.com/OpenDSA/OpenDSA/blob/master/Exercises/Binary/Dprobs.html>`_
