.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=============
Quick Hashing
=============

A Quick Introduction to Hashing
-------------------------------

.. slide:: Hashing (1)

   Hashing: The process of mapping a key value to a position in a table.

   A hash function maps key values to positions.  It is denoted by :math:`h`.

   A hash table is an array that holds the records.  It is denoted by **HT**.

   **HT** has :math:`M` slots, indexed form 0 to :math:`M-1`.


.. slide:: Hashing (2)

   For any value :math:`K` in the key range and some hash function
   :math:`h`, :math:`h(K) = i`, :math:`0 <= i < M`, such that
   key(HT[i]) :math:`= K`.

   Hashing is appropriate only for sets (no duplicates).

   Good for both in-memory and disk-based applications.

   Answers the question "What record, if any, has key value K?"


.. slide:: Collisions

   * Given: hash function **h** with keys :math:`k_1` and :math:`k_2`.
     :math:`\beta` is a slot in the hash table.

   * If :math:`\mathbf{h}(k_1) = \beta = \mathbf{h}(k_2)`, then
     :math:`k_1` and :math:`k_2` have a collision at :math:`\beta`
     under **h**.

   * Search for the record with key :math:`K`:
      #. Compute the table location :math:`\mathbf{h}(K)`.
      #. Starting with slot :math:`\mathbf{h}(K)`, locate the record
         containing key :math:`K` using (if necessary) a collision
         resolution policy.


.. slide:: Closed Hashing

   * Closed hashing stores all records directly in the hash table.

   * Each record :math:`i` has a home position :math:`\mathbf{h}(k_i)`.

   * If another record occupies the home position for :math:`i`, then
     another slot must be found to store :math:`i`.

   * The new slot is found by a collision resolution policy.

   * Search must follow the same policy to find records not in their
     home slots.


.. slide:: Collision Resolution

   * During insertion, the goal of collision resolution is to find a
     free slot in the table.

   * Probe sequence: The series of slots visited during insert/search
     by following a collision resolution policy.

   * Let :math:`\beta_0 = \mathbf{h}(K)`.
     Let :math:`(\beta_0, \beta_1, ...)` be the series of slots making
     up the probe sequence.


.. slide:: Insertion

   ::

      // Insert e into hash table HT
      void hashInsert(const Key& k, const Elem& e) {
        int home;                     // Home position for e
        int pos = home = h(k);        // Init probe sequence
        for (int i=1; EMPTYKEY != (HT[pos]).key(); i++) {
          pos = (home + p(k, i)) % M; // probe
          if (k == HT[pos].key()) {
            println("Duplicates not allowed");
            return;
          }
        }
        HT[pos] = e;
      }


.. slide:: Search

   ::

      // Search for the record with Key K
      bool hashSearch(const Key& K, Elem& e) const {
        int home;              // Home position for K
        int pos = home = h(K); // Initial position is the home slot
        for (int i = 1;
             (K != (HT[pos]).key()) && (EMPTYKEY != (HT[pos]).key());
             i++)
          pos = (home + p(K, i)) % M; // Next on probe sequence
        if (K == (HT[pos]).key()) {   // Found it
          e = HT[pos];
          return true;
        }
        else return false;            // K not in hash table
      }


.. slide:: Probe Function

   * Look carefully at the probe function p()::

       pos = (home + p(k, i)) % M; // probe

   * Each time p() is called, it generates a value to be added to the
     home position to generate the new slot to be examined.

   * :math:`p()` is a function both of the element's key value, and of
     the number of steps taken along the probe sequence.
     Not all probe functions use both parameters.


.. slide:: Quadratic Probing

   .. inlineav:: collisionCON5 ss
      :long_name: Quadratic Probing Slideshow
      :links: AV/Hashing/collisionCON.css
      :scripts: AV/Hashing/collisionCON5.js
      :output: show

   .. inlineav:: collisionCON6 ss
      :long_name: Quadratic Probing Problem
      :links: AV/Hashing/collisionCON.css
      :scripts: AV/Hashing/collisionCON6.js
      :output: show


.. slide:: Deletion

   * Deleting a record must not hinder later searches.

   * We do not want to make positions in the hash table unusable because of
     deletion.

   * Both of these problems can be resolved by placing a special mark in
     place of the deleted record, called a tombstone.

   * A tombstone will not stop a search, but that slot can be used for
     future insertions.


.. slide:: Tombstones

   .. inlineav:: hashdelCON ss
      :long_name: Hash Deletion Slideshow
      :links: 
      :scripts: AV/Hashing/hashdelCON.js
      :output: show
