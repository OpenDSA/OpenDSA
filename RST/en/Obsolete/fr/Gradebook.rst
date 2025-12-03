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

Notes
=====

.. raw:: html

   <div id="loadingMessage">Loading data...</div>
   <div id="gradeView">
   <input type="checkbox" id="selectGradeView" value="off">Changer de grille (Chapitres/Devoirs)</input>
   <hr style="border-top: dotted 1px;" />
   </div>
   <div id="gradeHeader">
    Cliquer sur les liens pour les informations detailles.<br />
    <a id="expand" href="#">Tout afficher</a> / <a id="collapse" href="#">Masquer</a>
    <input type="checkbox" id="showZeroPointExer" value="off">Afficher les exercises valant 0-point
   </div>
   <div id="gradeData"></div>
   <div id="gradeDataA"></div>
