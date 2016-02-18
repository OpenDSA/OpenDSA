.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
:author: RJ Freund, Justin Gottschalk, Shane Livieri

============================================================
Illustrate a simple slide show in an OpenDSA learning module
============================================================

Randomizing an array
--------------------


The following slideshow demonstrates how an array can be scrambled. The algorithm first populates an array
with elements equal to their respective indices. Then for each element in the array, it is swapped with a random element
that has an index that is greater than or equal its own index.

.. inlineav:: ScrambleArray ss
	:output: show


.. odsascript:: AV/Development/ScrambleArray.js
