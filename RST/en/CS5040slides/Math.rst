.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===============
Math Background
===============

Math Background
---------------

.. TODO::
   
   | Lesson Plan for Today:
   |    Provide a summary of necessary math background
        (Discrete Math). This is more coverage of this topic than I do
        in CS3114.
   |    P1 intro: Signficant design discussion

   | Relationship to CSOs:
   |    CSO...


.. slide:: Set Notation

   | **Set**: A collection of distinguishable members. No concept of
     duplicates, no concept of order.
   | Be familiar with the usual stuff (union intersection, membership,
     subset, set size.
   | **Powerset**: All subsets of a set (including the set itself, and the
     empty set): :math:`2^S` if there are :math:`S` elements in the
     set.
   | **Bag**: Elements are distinishable even with same value, but
     there is no concept of order.
   | **Sequence**: Distingishable elements in some order (can have
     duplicates).


.. slide:: Set Relations

   | A **relation** R over set S is a set of ordered pairs from S.

   * :math:`R` is :term:`reflexive` if :math:`aRa`
     for all :math:`a \in \mathbf{S}`.

   * :math:`R` is :term:`irreflexive` if :math:`aRa` is not true
     for all :math:`a \in \mathbf{S}`.

   * :math:`R` is :term:`symmetric` if whenever :math:`aRb`,
     then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   * :math:`R` is :term:`antisymmetric` if whenever :math:`aRb`
     and :math:`bRa`, then :math:`a = b`, for all
     :math:`a, b \in \mathbf{S}`.

   * :math:`R` is :term:`transitive` if whenever :math:`aRb` and
     :math:`bRc`, then :math:`aRc`, for all
     :math:`a, b, c \in \mathbf{S}`.


.. slide:: Equivalence Relations

   | R is an **equivalence relation** on set S if it is reflexive,
     symmetric, and transitive.
   | An equivalence relation can be used to partition a set into
     **equivalence classes**.
   | A **partition** of a set :math:`\mathbf{S}` is a collection of
    subsets that are **disjoint** from each other and whose union is
    :math:`\mathbf{S}`.
   | Example: **Modulus** defines an equivalence relation.


.. slide:: Total vs. Partial Order

   | A binary relation is called a
     **partial order** if it is antisymmetric and transitive.
   | If the relation is reflexive, it is called a
     **non-strict partial order**.
   | If the relation is irreflexive, it is called a
     **strict partial order**.
   | If every pair of distinct elements in a partial order are comparable,
     then the order is called a **total order**.
   | :math:`<` and :math:`\leq` are total orders. Subset is a partial
     order.

.. slide:: Miscellaneous Notation

   | Factorial function
   | A **permutation** of a sequence :math:`\mathbf{S}`
     is simply the members of :math:`\mathbf{S}` arranged in some
     order. For :math:`|S|` elements, there are :math:`|S|!` permuations.
   | **Mod function**: Returns the remainder of an integer division.
     Sometimes written :math:`n \bmod m` in mathematical expressions,
     the syntax in many programming languages is ``n % m``.

     
.. slide:: Logarithms

   | To store codes for :math:`n` objects required :math:`\log n`
     bits. :math:`n` bits can represent :math:`2^n` objects
   | You can cut :math:`n` objects in half :math:`\log n` times
   | :math:`\log (nm) = \log n + \log m`.
   | :math:`\log (n/m) = \log n - \log m`.
   | :math:`\log (n^r) = r \log n`.
   | :math:`\log_a n = \log_b n / \log_b a`.
   | :math:`n = 2^{\log_2 n}`


.. slide:: Summations and Recurrences
   
   .. math::
      \sum_{i = 1}^{n} i &=& \frac{n (n+1)}{2}.

   .. math::
      \sum_{i = 1}^{n} \frac{1}{2^i} &=& 1 - \frac{1}{2^n},

   .. math::
      \sum_{i = 0}^{n} 2^i &=& 2^{n+1} - 1.

   | Factorial: 

     .. math::
        n! = (n-1)! \cdot n\ \mbox{for}\ n>1; \quad 1! = 0! = 1.


.. slide:: Estimation Techniques

   | Known as "back of the envelope" or "back of the napkin"
     calculation
   |   1. Determine the major parameters that affect the problem.
   |   2. Define an equation that relates the parameters to the
          problem.
   |   3. Select values for the parameters, and apply the equation to
          yield an estimated solution.


.. slide:: Estimation Example

   | How many library bookcasese does it take to store books totalling
     one million pages?

   | Estimate
   |   - Pages/inch
   |   - Feet/shelf
   |   - Shelves/bookcase

