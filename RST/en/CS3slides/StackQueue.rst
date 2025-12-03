.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=================
Stacks and Queues
=================

Stacks
------

.. revealjs-slide::

* LIFO: Last In, First Out.

* Restricted form of list: Insert and remove only at front of list.

* Notation:

  * Insert: PUSH
  * Remove: POP
  * The accessible element is called TOP.


Stack ADT
---------

.. revealjs-slide::

.. codeinclude:: Lists/Stack
   :tag: Stack


Array-Based Stack (1)
---------------------

.. revealjs-slide::

* Issues:

  * Which end is the top?
  * Where does “top” point to?
  * What are the costs of the operations?


Array-Based Stack (2)
---------------------

.. revealjs-slide::

.. codeinclude:: Lists/AStack
      :tag: AStack1


Linked Stack
------------

.. revealjs-slide::

.. codeinclude:: Lists/LStack
   :tag: LStack1

* What are the costs of the operations?


* How do space requirements compare to the array-based stack
  implementation?


Queues
------

.. revealjs-slide::


* FIFO: First in, First Out

* Restricted form of list: Insert at one end, remove from the other.

* Notation:

  * Insert: Enqueue
  * Delete: Dequeue
  * First element: Front
  * Last element: Rear


Queue Implementation (1)
------------------------

.. revealjs-slide::

.. inlineav:: aqueueFirstCON ss
   :long_name: Array-based Queue Positions Slideshow
   :links: AV/List/aqueueCON.css
   :scripts: AV/List/aqueueFirstCON.js
   :output: show


Queue Implementation (2)
------------------------

.. revealjs-slide::

.. inlineav:: aqueueDriftCON ss
   :long_name: Array-based Queue Drift Slideshow
   :links: AV/List/aqueueCON.css
   :scripts: AV/List/aqueueDriftCON.js
   :output: show


Queue Implementation (3)
------------------------

.. revealjs-slide::

.. inlineav:: aqueueBadCON ss
   :long_name: Array-based Queue Bad Representation Slideshow
   :links: AV/List/aqueueCON.css
   :scripts: AV/List/aqueueBadCON.js
   :output: show


Circular Queue (1)
------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/List/aqueueCircularCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>



Circular Queue (2)
------------------

.. revealjs-slide::

.. raw:: html

   <iframe src="../../../Metadata/inlineav/List/aqueueEmptyCON.html" 
           width="960" 
           height="700" 
           frameborder="0"
           style="background: white; display: block; margin: 0 auto;">
   </iframe>

.. only:: never

   This is a comment that does NOT show in built slides: prevents 'odsalink' from appearing.