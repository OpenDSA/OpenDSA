.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Sally Hamouda
   :satisfies: recursive list operations
   :topic: Recursive List Operations

Recursive List Operations
=========================

As mentioned before, list is considred as a recursive data structure because it can be defined as an empty list or a node followed by a list.

.. Topic:: Example
    Using recursion to delete the node at the tail of a list. 

.. Todo::
    Visulization of the steps of the deletion using delegation by giving the list except for the node pointed by the head pointer to a friend to delete the tail.
    Steps to show how the recursive call and base case are formulated as a pseudo code.

.. Topic:: Example
    Using recursion to insert node at the tail of a list.

.. Todo::
    Visulization of the steps of the insertion using delegation by giving the list except for the node pointed by the head pointer to a friend to delete the tail.
    Steps to show how the recursive call and base case are formulated as a pseudo code.

.. Todo::
   Programming exercise asks to recursively implement the insertion at the tail of a list.

.. Todo::
   Programming exercise asks to recursively implement the deletion at the tail of a list.

.. Todo::
    Programming exercise asks to recursively  merge the nodes of the two lists into a single list taking a node alternately from each list, and return the new list.

.. Todo::
    Programming exercise asks to use recursion to do a sorted merge of two lists. The function takes two lists sorted in increasing order, and splices their nodes together to 
    make one big sorted list which is returned.

.. Todo::
   Programming exercise asks to Recursively reverses the given linked list by changing its .next pointers and its head pointer in one pass of the list.
