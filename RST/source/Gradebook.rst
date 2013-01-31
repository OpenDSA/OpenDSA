.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: Gradebook
   :author: Cliff Shaffer
   :prerequisites: 
   :topic: Gradebook
   :short_name: Gradebook
   :exercises: 

.. _Gradebook:

.. include:: JSAVheader.rinc

.. raw:: html

   <script type="text/javascript" src="_static/gradebook.js"></script>
   <style>
    .section-header {
      font-weight: bold;
      cursor: pointer;
    }

    .gb-section-container {
      border-bottom: solid 1px;
      border-top: solid 1px;
      display: none;
    }

    .gb-section-container a{
      color: #333333;
    }

    table.data tr:hover td {
      background: none repeat scroll 0 0 whitesmoke !important;
    }

    table.data tr td.proficient, table.data tr:hover td.proficient {
      background: none repeat scroll 0 0 #00FF00 !important;
    }
    
    .center, table.data th.center, #loadingMessage {
      text-align: center;
    }
   </style>

.. index:: ! Gradebook

Gradebook
=========

.. raw:: html

   <div id="loadingMessage">Loading data...</div>
   <div>
    Click on the links below to view more specific information.<br />
    <a id="expand" href="#">Expand All</a> / <a id="collapse" href="#">Collapse All</a>
   </div>
   <div id="gradeData"></div>
   