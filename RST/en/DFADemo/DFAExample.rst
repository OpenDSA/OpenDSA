.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Tom Naps and Cliff Shaffer

A simple diagram
=============================================

A simple diagram
----------------

The simplest thing to do in terms of an OpenDSA visual is called a
"diagram".
This is just a static picture, and it has no interface.
To keep things simple for developers, diagrams are automatically
incorporated into the compiled HTML page for a book using the
``inlineav`` directive in the RST file.
That means there is no explicit HTML file that a developer creates for
a diagram, just a JavaScript file and perhaps a CSS file.
Note use of the ``dgm`` tag to tell the OpenDSA framework not to
provide any interface such as buttons to control a slideshow.

Figure shows an example figure.

.. inlineav:: DFAExample dgm
   :links: AV/OpenFLAP/DFAExample.css
   :scripts: AV/OpenFLAP/DFAExample.js
   :align: center

   Example figure
