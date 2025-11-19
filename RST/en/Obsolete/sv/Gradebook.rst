.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Daniel Breakiron, Eric Fouh
   :prerequisites: 
   :topic: Gradebook

.. odsalink:: lib/gradebook-min.css
.. odsascript:: lib/gradebook-min.js

.. index:: ! Gradebook

Suoritukset
===========

.. raw:: html

   <div id="loadingMessage">Laddar data...</div>
   <div id="gradeView">
   <input type="checkbox" id="selectGradeView" value="off">Växla vy (Kapitel/Uppgifter)</input>
   <hr style="border-top: dotted 1px;" />
   </div>
   <div id="gradeHeader">
    Klicka på länkarna nedan för att se mer specifik information.<br />
    <a id="expand" href="#">Visa alla</a> / <a id="collapse" href="#">Dölj alla</a>
    <input type="checkbox" id="showZeroPointExer" value="off">Visa nollpoängsövningar
   </div>
   <div id="gradeData"></div>
   <div id="gradeDataA"></div>
