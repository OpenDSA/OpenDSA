.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :prerequisites: 
   :topic: Gradebook

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
    
    .score, table.data th.score {
      text-align: center;
      width: 100px;
    }
    
    #loadingMessage {
      border-radius: 10px 10px 10px 10px;
      box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.8);
      height: 25px;
      margin: 50px auto;
      text-align: center;
      width: 250px;
    }
   </style>

.. index:: ! Gradebook

Gradebook
=========

.. raw:: html

   <div id="loadingMessage">Loading data...</div>
   <div id="gradeHeader">
    Click on the links below to view more specific information.<br />
    <a id="expand" href="#">Expand All</a> / <a id="collapse" href="#">Collapse All</a>
   </div>
   <div id="gradeData"></div>
   
