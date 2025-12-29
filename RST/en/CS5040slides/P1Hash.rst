.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=================
Project 1 Hashing
=================

Project 1 Hashing
-----------------

.. slide:: What you need to know about Hashing

   * Read Module 10.1, Skim 10.3, Read 10.6 carefully, Read 10.7.4
     Double Hashing, Read 10.9 Deletion

   * Feel free to use code posted as part of OpenDSA modules (Insert, search)

   * You can write Hash Table Class **assuming** that it uses the
     given hash function, and that the key is an integer.

     
.. slide:: Double Hashing

   .. inlineav:: collisionCON8 ss
      :long_name: Double Hashing Slideshow 3
      :links: AV/Hashing/collisionCON.css
      :scripts: AV/Hashing/collisionCON8.js
      :output: show


.. slide:: Primary design issue: Communications

   * World/DB class, Hash Table, Memory Manager need appropriate
     coordination.
   
   * World probably initializes memory manager, and calls memory
     manager to insert/process records. Store resulting Handle in a
     Record to pass to hash table.
   
   * Hash table does not need to know that there is a Memory Manager,
     or Seminar records.
   
   * Record class and Handle class can hide most implementation details.

     
.. slide:: What is stored in the hash table?

   * Clearly there has to be a key, and there has to be a value
     (a record?)
   
   * The key is an integer (ID value for the Seminar, but the hash
     table class doesn't know that)
  
   * The "value" might be dealt with in different ways.
      * Definitely NOT the byte array (this is in memory manager)
      * Maybe the handle for the record? That means that the hash
        table needs to know about handles.

   * Can hide handles behind a Record class.
      * What is key? Store integer? Get from Record? Space vs. Time
        tradeoff, either is reasonable


.. slide:: Milestone 2

   * Must pass some number of tests, some mutant coverage (from your
     JUnit tests), some style points

   * Functionally: Get the hash table working, at least inserts.

