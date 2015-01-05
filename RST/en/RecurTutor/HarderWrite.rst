.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Sally Hamouda
   :requires: recursion writing
   :topic: Recursion


Writing a more sophisticated recursive functions
=====================================================

Classic recursion involves thinking ”backwards”. Instead of building a solution from nothing, you pretend you are at the solution, and want to take a
step back and ask how to solve the problem if you were a step back. Here’s an analogy. You are planning a trip from point A to point B. One way to start is
to begin at point A and move forward to B. Most people like that solution and find it easier to think that way.

However, another approach is to be at B and step back one step towards A (let’s call this point, C), and assume that you can reach C, and figure out how
to B once you reach C. For example, you might be travelling from Atlanta to Boston. You think ”if I were at New York, how would I make it to Boston” and then worry about how to solve the problem of getting from Atlanta to New York. If you learn to think ”backwards” or more accurately, learn to figure out what the correct “smaller” version of the problem is, you’re well on your way to figuring out recursion.

In the previous examples and exercises, all the recursive functions has only one base case and one recursive case. A more general structure for recursion
can have more than one base case and recursive case. 

The following Figure shows how a general structure recursive function looks like.

.. codeinclude:: RecurTutor/RecMultBcRc

In some problems, we need to have more than one base case and more than one recursive case. For example, the fibonacci function and the operations done on a tree structure like tree traversal.

You need to practice harder recursive functions in order to gain more experience on recursion.


