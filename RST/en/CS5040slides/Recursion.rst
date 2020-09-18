.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===================
Recursion
===================

Recursion
-------------------

.. slide:: Recursion

   An algorithm (or a function in a computer program) is recursive if
   it invokes itself to do part of its work.

   Recursion makes it possible to solve complex problems using programs
   that are concise, easily understood, and algorithmically efficient.

.. slide:: A Recursive Method

   .. odsalink:: AV/RecurTutor/recurIntroCON.css

   .. inlineav:: recurIntroDetailsCON ss
      :long_name: Recursion Introduction Slideshow 2
      :links: AV/RecurTutor/recurIntroCON.css
      :scripts: AV/RecurTutor/recurIntroDetailsCON.js
      :output: show


.. slide:: Solving a small piece at a time

   * Solving a "big" problem recursively means to solve one or more smaller
        versions of the problem, and using those solutions of the smaller
        problems to solve the "big" problem.

   .. codeinclude:: RecurTutor/Fibonacci


.. slide:: Recursive methods require two things

   * A base case that does not require recursion

   * The recursive call, where in each call the parameters are "closer" to the base case.

   * The base case is essentially the exit condition.


.. slide:: Multiple base cases

   * Simplest recursive methods have 1 base case and one recursive call.

   * More complicated can have multiple base cases and multiple recursive calls.


   .. codeinclude:: RecurTutor/Paths


.. slide:: Tracing Code

   * When tracing, you have to think about both the entry into the recursive method,
     but also the returns out of the method (unwinding).

   .. odsalink:: AV/RecurTutor/recurTraceCON.css

   .. inlineav:: recurTraceWindCON ss
      :long_name: Recursion Tracing Winding and Unwinding
      :links: AV/RecurTutor/recurTraceCON.css
      :scripts: AV/RecurTutor/recurTraceWindCON.js
      :output: show

.. slide:: Consider Preorder Traversal

   .. codeinclude:: Binary/Preorder
      :tag: preorder

.. slide:: Preorder Traversal

   .. odsalink:: AV/Binary/BTCON.css

   .. inlineav:: preorderCON ss
      :long_name: Preorder Traversal Slideshow
      :links: AV/Binary/BTCON.css
      :scripts: AV/Binary/preorderCON.js
      :output: show