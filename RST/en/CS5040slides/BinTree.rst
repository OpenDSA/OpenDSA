.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

================
BinTrees
================

BinTrees
----------------

.. slide:: Spatial Data Structures

   | Fundamental idea: Need to treat X and Y dimensions as co-equal.
   |    This requires different thinking from 1-dimensional key
        structures like BST or Hash Table
   | Support spatial queries: Records within radius of search point


.. slide:: Bintree (1)

   | Many variants and similar spatial data structures
   |   PR quadtrees, k-d trees, and bintrees are common for storing
       point data
   | Decomposition rule: The rule that decides when to split the
     tree
   |    Our rule: Only one point in a leaf
   |    BUT: Splitting is useless if the points are the same!
   |    So we don't split when they are the same.
   |       Keep on a list


.. slide:: Bintree (2)

   .. inlineav:: bintreeCON dgm
      :links: AV/Spatial/bintreeCON.css
      :scripts: AV/Spatial/bintreeCON.js
      :align: justify


.. slide:: Bintree Visualization

   .. avembed:: AV/Spatial/BintreeAV.html ss


.. slide:: Ineractive Bintree
   
   .. avembed:: AV/Spatial/BintreeInter.html ss


.. slide:: Implementation

  | Example: The world is 1024 units on each side (0..1023)
  |    I define the origin as the upper left corner of the world square
  |    The initial world is an empty box (1024 x 1024)
  
  | Different types of nodes:
  |   Internal has 2 children (no data value)
  |   Leaf with Seminar list (no children)
  |   Leaf that is empty

  
.. slide:: Tree/Node Implementation (1)

  | Class hierarchy
  |   Base node type: An interface
  |   Internal nodes have 2 child pointers (no data)
  |   Leaf nodes have no child pointers, store Seminars (unless empty)

  | How to implement empty nodes? There are a lot of them.
  |    Definitely NOT as a null pointer!!
  |    Avoid space concerns by implementing a Flyweight design pattern
  |    Leaf can be a separate class, or not
  |    Either way, it is a Singleton design pattern.


.. slide:: Tree/Node Implementation (2)

  | Tree initializes as an empty leaf node.
  | NO node stores its world box coordinates (pass them in)
  | All major tree methods (insert, remove, search, intersections) are
    implemented recursively.
  | NO use of parent pointers!

  | Composite design is natural here


.. slide:: Design Patterns (1)

   * Design patterns capture reusable pieces of design wisdom.

   * Goals:
      * Quickly communicate design wisdom to new designers
      * Give a shared vocabulary to designers


.. slide:: Design Patterns (2)

   | Three design patterns for Project 2:
   |    Composite (will talk about in next section)
   |    Flyweight
   |       Everytime you need to point to an empty leaf, point to the
           same empty leaf. 
   |          By not using a null pointer, you can call operations
              on the object.
   |          But you don't pay any space for it!!
   |       Of course, this means that it cannot have state
   |          But your empty leaf node should not need state!
   |          No storing the position/size. No storing parent
              pointers!


.. slide:: Design Patterns (3)

   | Singleton
   |    There can be only one Flyweight object.
   |       So need a way to control this -- create it when you need
           it, but never again.
   |       There are a few standard ways to do this. You can google
           for information.
   |       The simplest approach is to:
   |          Turn off the constructor (make it private)
   |          Make clients go through getInstance() instead
   |          Keep a static member which is the copy of the
              flyweight that you create only one time.
