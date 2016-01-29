.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==========
Clean Code
==========

.. slide:: Example 1

   .. rst-class:: build

   * Here was a real bug that I had in some code for an OpenDSA
     exercise. You don't need to know much about the language to recognize
     the bug (if you are able to spot it)::

      <li><var><code>O(n^2)</code></var></li>
      <li><var><code>O(n \log n)</code></var></li>
      <li><var><code>O(\log n)</code><var></li>
      <li><var><code>O(1)</code></var></li>


   * When refactored for readability, the bug pops out immediately::

      <li><var><code>O(n^2)     </code></var></li>
      <li><var><code>O(n \log n)</code></var></li>
      <li><var><code>O(\log n)  </code><var></li>
      <li><var><code>O(1)       </code></var></li>


.. slide:: Example 2

   .. rst-class:: build

   * A real sample of code::

      var nodeOne = graphTwo.addNode("a ", {left: 0, top: 0});
      var nodeTwo = graphTwo.addNode("c", {left: 100, top: 0});
      var nodeThree = graphTwo.addNode("e", {left: 50, top: 50});
      var nodeFour = graphTwo.addNode("b", {left: 0,  top: 100});
      var nodeFive =graphTwo.addNode("d ", {left: 100, top: 100});

   * Refactored for readability::

      var nodea = graph2.addNode("a", {left:   0, top:   0});
      var nodeb = graph2.addNode("b", {left:   0, top: 100});
      var nodec = graph2.addNode("c", {left: 100, top:   0});
      var noded = graph2.addNode("d", {left: 100, top: 100});
      var nodee = graph2.addNode("e", {left:  50, top:  50});
