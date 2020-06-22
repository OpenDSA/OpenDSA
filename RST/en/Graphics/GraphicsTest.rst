.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: David Furcy and Tom Naps

=====================================================
Can WebGL animations be displayed in an OpenDSA book?
=====================================================


Testing WebGL Graphics in OpenDSA
---------------------------------

This module is a proof-of-concept test to see whether we can use WebGL
instead of JSAV to put animations into an OpenDSA book.


In the demonstration below, you can use the "Rotate" buttons to control the axis on which the color-cube accumulates additional rotations (by 2 degrees each time the frame is updated).   If you want to explore what the accumulated rotations do without the continual rotation, just click the "Toggle" button

.. iframe:: AV/Graphics/graphicsTest.html
    :name: GraphicsTest
    :width: 1100
    :height: 800

Simple Exercise
---------------

.. avembed:: Exercises/Graphics/SimpleExerciseTest.html ka
   :long_name: Simple Exercise Test

Simple Exercise With Graphics
-----------------------------

.. avembed:: Exercises/Graphics/SimpleExerciseTestWithCanvas.html ka
   :long_name: Simple Exercise Test With Graphics in Canvas
	     
