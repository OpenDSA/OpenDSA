.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Daniel Breakiron, Eric Fouh
   :topic: Gradebook

.. odsalink:: lib/gradebook-min.css
.. odsascript:: lib/gradebook-min.js

.. index:: ! Gradebook

Gradebook
=========

.. raw:: html

   <div id="loadingMessage">Loading data...</div>
   <div id="gradeView">
   <input type="checkbox" id="selectGradeView" value="off">Toggle view (Chapter/Assignment)</input>
   <hr style="border-top: dotted 1px;" />
   </div>
   <div id="gradeHeader">
    Click on the links below to view more specific information.<br />
    <a id="expand" href="#">Expand All</a> / <a id="collapse" href="#">Collapse All</a>
    <input type="checkbox" id="showZeroPointExer" value="off">Show 0-point exercises
   </div>
   <div id="gradeData"></div>
   <div id="gradeDataA"></div>
