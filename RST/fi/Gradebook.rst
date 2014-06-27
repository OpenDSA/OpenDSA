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

   <div id="loadingMessage">Ladataan...</div>
   <div id="gradeView">
   <input type="checkbox" id="selectGradeView" value="off">Vaihda näkymää (Kappaleet/Tehtävät)</input>
   <hr style="border-top: dotted 1px;" />
   </div>
   <div id="gradeHeader">
    Klikkaa linkkejä nähdäksesi tarkempaa tietoa pisteistä.<br />
    <a id="expand" href="#">Näytä kaikki</a> / <a id="collapse" href="#">Piilota kaikki</a>
    <input type="checkbox" id="showZeroPointExer" value="off">Näytä pisteettömät harjoitukset
   </div>
   <div id="gradeData"></div>
   <div id="gradeDataA"></div>
