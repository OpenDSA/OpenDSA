.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==========
Comparison
==========

Comparison
----------

.. slide:: Comparison (1)

   * How do we generalize the concept of comparison?
   * "<" is not good enough. String < String won't give you what you
     want.
   * Need a general way to get the key out of a record
   * Define a method record.key()?
      * [Note for C++ users: Operator overloading is effectively the
        same thing.]
      * That is not good enough. What if we want to search on different
        key fields?

.. slide:: Comparison (2)

   * Fundamental issue: The key is a property of the context,
     NOT a property of the record.


.. slide:: KVpair

   This is a truly general way to solve the problem.

   .. codeinclude:: Utils/KVPair
      :tag: KVPair


.. slide:: .

   .


.. slide:: KVpair: Generics

   .. codeinclude:: Utils/KVPairGen
      :tag: KVPair


.. slide:: .

   .


.. slide:: Using the KVpair (1)

   .. codeinclude:: Sorting/Insertionsort
      :tag: Insertionsort

   What is being compared?

   What if we want to find the record that has a given key?
