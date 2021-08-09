.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Patrick
    :requires:
    :satisfies: 
    :topic: 

.. _ref_to_test_not_deep_folder:

Test (not) Deep Folder
======================

This is a test of a when RST files are deeper in the RST folder structure than usual.  

Testing links
-------------

Link to top of the SubDir test page: :ref:`ref_to_test_deep_folder`

Link to top of the non-SubDir test page: :ref:`ref_to_test_not_deep_folder`

Doc Link to the SubDir test page: :doc:`TestSubdir` (note that creating this link does NOT need directory specificied)

Doc Link to the non-SubDir test page: :doc:`testNonSubdir`

A small codeinclude
-------------------

.. codeinclude:: Misc/Fibonnaci 
   :tag: FibR

A small slideshow
-----------------

.. inlineav:: FibTreeCON ss
   :links:   /AV/SeniorAlgAnal/FibTreeCON.css
   :scripts: /AV/SeniorAlgAnal/FibTreeCON.js
   :align: center
   :output: show

A small iframe
--------------

.. iframe:: AV/Graphics/graphicsTest.html
    :name: GraphicsTest
    :width: 1100
    :height: 800
