.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Hashing

.. index:: ! perfect hashing

Perfect Hashing
===============

Perfect Hashing
---------------

Perfect hashing is a technique for storing records in a hash table in
a way that guarentees no collisions.
Perfect hashing sort of turns the concept of hashing on its head, in
that it requires that the full set of keys to be stored be available
in advance, and a hash function is then generated for that key set.
Besides guarenteeing no collisions, perfect hashing techniques can
store n records in a table with only n slots.

.. TODO::
   :type: text

   Explain how Perfect Hashing works.

In this example, the set of keys is has already been selected to be
the letters a to o. To see this in action, select "perfect hashing" as
the hash method, select any collision resolution method, and select a
hash table of size 15.

.. avembed:: AV/Development/perfectHashAV.html ss

.. TODO::
   :type: AV

   Make a proper visualization for perfect hashing, that lets the user
   specify a set of input keys, computes the hash function, then lets
   the user input keys to the table. A proper explanation for the
   process should be part of the visualization.
