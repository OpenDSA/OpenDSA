.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=========================
Advanced Mutation Testing
=========================

Mutation Testing Principles
---------------------------

.. revealjs-slide::

* Reminder: To cover a branch under MT, you must do TWO things:

  * Execute the branch.
  * Check that the execution is correct. This means there must be some
    test that FAILS due to a mutation causing that branch to execute.

  ::

     if (a < b)
       Branch 1
     else
       Branch 2

  * One mutation causes Branch 1 to execute when it SHOULD NOT. A test
    must catch that.
  * Another mutation causes Branch 2 to execute when it SHOULD NOT. A
    test must catch that.
  

Project 1 Issues
----------------

.. revealjs-slide::

* While insert returns a boolean, this is not meaningful to
  correctness (beyond good parameter values), so not really testing
  (only executes branches).

  * Must actually do something else to check for correctness of the
    insert, like look at what is in the Sparse Matrix

* For deletion, printRatings might not have been enough to catch
  errors

  * printRatings is row-centric, so probably won't catch problems with
    columns.

  * You can add your own test support, such as a column-oriented
    printRatings variant (or using a lot of listMovie calls).

  * You can also add methods that, for example, go through each row
    and column to make sure that the first entry on the list has the
    appropriate back pointer value (null).


Example: P1 Optimization
------------------------

.. revealjs-slide::

::

   // Return true iff there is a matching index
   Boolean findIndex(listNode start, int index) {
     while (start != null) {
       if (start.index == index)
         return true;
       if (start.index > index) // Quit early
         return false;
       start = start.next;
     }
     return false; // Not there
   }

* Can you cover this? No.
  
  * If ``start.index > index`` is replaced with ``false``, the method
    still correctly returns ``false``.

* Is it really an optimization? Not as much as you might hope.

  * Save (on average) half the work at the cost of a test.
  * The test costs a dereference and a comparison.
  * The work is 2 dereferences, 2 comparisons and an assignment.
  

Example: BST Range Query
------------------------

.. revealjs-slide::

* Only visit the right child if the root value is less than the
  range max.

* Only visit the left child if the root value is greater than or
  equal to the range min.

* This is an optimization to avoid looking at extra nodes.

* There is no way to test that this gives the wrong answer in terms
  of what record is found, because optimization has nothing to do
  with that.

* Optimization in this case is about how many nodes are looked at.
  So, that is what must be tested.


Example: BigNum Exponents
-------------------------

.. revealjs-slide::

::

   public int exponentiate(int base, int exponent) {
     if (exponent == 0) {
       return 1;
     }
     else if (exponent == 1) {
       return base;
     }
     else if (exponent % 2 == 0) {
       return exponentiate(base * base, exponent / 2);
     } else {
       return base * exponentiate(base, exponent - 1);
     }
   }

* Fundamental problem: 4 branches, but 3 outcomes.
* Example input: ``exponentiate(8, 2)``
* Consider: ``else if (exponent == 1)``.

  * If MT sets this to TRUE, this fails. OK. But if MT sets this to
    FALSE, then it gets picked up later by the odd condition.
  * One solution: Simply remove the whole branch for ``exponent == 1``


Hash Table Expansion (1)
------------------------

.. revealjs-slide::

::
   
  private void localInsertIncorrect(Record inH) throws IOException {
    // these should be after the expansion
    int home = h(inH.key());
    int h2 = h2(inH.key());
    int slot = home;
    if (numElements >= table.length / 2) {
      expand();
    }
    while ((table[slot] != null) && !isTombStone(table[slot])) {
      slot = (slot + h2) % table.length;
    }
    table[slot] = inH;
    numElements++;
 }

* A test that only inserts into the first half of the table will give
  mutation coverage, but won't catch the bug.

* So, the code is coverable, and the bug would be catchable. The
  problem is that the test is inadequate. But MT won't point that out
  to you.

  
Hash Table Expansion (2)
------------------------

.. revealjs-slide::

::
   
  private void localInsertCorrect(Record inH) throws IOException {
    if (numElements >= table.length / 2) {
      expand();
    }
    int home = h(inH.key());
    int h2 = h2(inH.key());
    int slot = home;
    while ((table[slot] != null) && !isTombStone(table[slot])) {
      slot = (slot + h2) % table.length;
    }
    table[slot] = inH;
    numElements++;
  }

