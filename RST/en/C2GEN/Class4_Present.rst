.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :satisfies: OpenDSA Introduction
   :topic: Introduction

.. odsalink:: AV/Background/TOHfigCON.css
.. odsalink:: AV/List/listADTCON.css
.. odsalink:: AV/Sorting/listADTCON.css

Creating JSAV-based Visualizations and Exercises
================================================

JSAV
----

*  OpenDSA visualizations and exercises written with
   HTML5/CSS/JavaScript.

*  To support the process, we use the JavaScript Algorithm
   Visualization library (JSAV).

*  Documentation: `http://jsav.io <http://jsav.io>`_

*  The library supports AV developers by providing automated layout
   for many key data structures

   *  Arrays (1D and 2D)
   *  Linked Lists
   *  Trees (General and Binary)
   *  Graphs
   *  Pointer objects to parts of the data structures
   *  Code displays
   *  Graphical primitives (based on SVG)
   *  Simple pop-up MCQs
   *  Proficiency exercises

*  Makes use of JavaScript flexibility to be extensible beyond the JSAV core

   *  BST, Red-Black Trees, Huffman Trees
   *  Heaps: slave together an array and a tree
   *  2-3 trees: tree nodes that are arrays

Examples
--------

This section shows a series of examples to illustrate various aspects
of AV development.

A simple diagram

.. inlineav:: TOHfigCON dgm
   :align: justify

`Source <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Background/TOHfigCON.js>`_

A simple slideshow

.. inlineav:: listADTposCON ss
   :output: show  

`Source <https://github.com/OpenDSA/OpenDSA/blob/master/AV/List/listADTposCON.js>`_

A simple slideshow that manipulates an array

.. inlineav:: insertionsortS1CON ss
   :output: show

`Source <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/insertionsortS1CON.js>`_


A "full AV" that instruments an algorithm, code display

.. avembed:: AV/Sorting/insertionsortAV.html ss
   :showhide: none

`Source HTML <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/insertionsortAV.html>`_

`Source JavaScript <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/insertionsortAV.js>`_

A proficiency exercise

.. avembed:: AV/Binary/BSTsearchPRO.html ss
   :showhide: none

`Source HTML <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Binary/BSTsearchPRO.html>`_

`Source JavaScript <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Binary/BSTsearchPRO.js>`_

More complicated proficiency exercise

.. avembed:: AV/Sorting/shellsortPRO.html ss
   :showhide: none

`Source HTML <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/shellsortPRO.html>`_

`Source JavaScript <https://github.com/OpenDSA/OpenDSA/blob/master/AV/Sorting/shellsortPRO.js>`_

.. odsascript:: AV/Background/TOHfigCON.js
.. odsascript:: AV/List/listADTposCON.js
.. odsascript:: AV/Sorting/insertionsortS1CON.js
