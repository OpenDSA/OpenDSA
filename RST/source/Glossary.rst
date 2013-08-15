.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: OpenDSA Contributors
   :prerequisites: 
   :topic:   


Glossary
========

.. glossary::

   antisymmetric
      In set notation, relation :math:`R` is antisymmetric if whenever
      :math:`aRb` and :math:`bRa`, then :math:`a = b`, for all
      :math:`a, b \in \mathbf{S}`.

   asymptotic analysis
      A method for estimating the efficiency of an algorithm or
      computer program. Asymptotic analysis also gives a way to define
      the inherent difficulty of a problem.

   bag
      In set notation, a bag is a collection of elements with no order
      (like a set), but which allows for duplicate-valued elements
      (unlike a set).

   base case
      In recursion or inductive proofs, the base case is the
      termination condition. This ois a simple input or value that can
      be solved (or proved in the case of induction) without resorting
      to a recursive call (or induction hypothesis).

   base type
      The data type for the elements in a set. For example, the set
      might consist of the integer values 3, 5, and 7. In this
      example, the base type is integers.

   basic operations
      Examples of basic operations include inserting a data
      item into the data structure, deleting a data item from the
      data structure, and finding a specified data item.

   Boolean variable
      A variable that takes on one of the two values ``True`` and
     ``False``.

   ceiling
      Written :math:`\lceil x \rceil`, for real value :math:`x` the
      ceiling is the least integer :math:`\geq x`.

   closed-form solution
      An algebraic equation with the same value as a summation or
      recurrence. The process of replacing the summation or
      recurrence with its closed-form solution is known as solving the
      summation or recurrence.

   comparable
      The concept that two objects can be compared to determine if they
      are equal or not, or to determine which one is greater than the other.
      To be reliably compared for a greater/lesser relationship,
      the values being compared must belong to a total order.
      ``Comparable`` is also the name of an interface in Java that
      asserts a comparable relationship between objects with a class,
      and ``.compareTo()`` is the ``Comparable`` interface method that
      implements the actual comparison between two objects of the class.

   comparable
      In set notation, elements :math:`x` and :math:`y` of a set are
      comparable under a given relation :math:`R` if either
      :math:`xRy` or :math:`yRx`.

   comparator (or comparator function)
      A function given as a parameter to a method of a library
      (or alternatively, a parameter for a C++ template or a Java
      generic).
      The comparator function concept provides a generic way
      encapulates the process of performing a comparison between two
      objects of a specific type.
      For example, if we want to write a generic sorting routine, that
      can handle any record type, we can require that the user of the
      sorting routine pass in a comparator function
      to define how records in the collection are to be compared.

   cost
      The :dfn:`cost` of a solution is the
      amount of resources that the solution consumes.

   diminishing increment sort
      Another name for Shellsort.

   direct proof
      In general, a direct proof is just a "logical explanation".
      A direct proof is sometimes referred to as an argument by deduction.
      This is simply an argument in terms of logic.
      Often written in English with words such as "if ... then",
      it could also be written with logic notation such as
      :math:`P \Rightarrow Q`.

   divide and conquer
      A technique for designing algorithms where a solution is found
      by breaking the problem into smaller (similar) subproblems,
      solving the subproblems, then combining the subproblem solutions
      to form the solution to the original problem.
      This process is often implemented using recursion.
   
   efficient
      A solution is said to be efficient
      if it solves the problem within the required
      :term:`resource constraints`.
      A solution is sometimes said to be
      efficient if it requires fewer resources than known
      alternatives, regardless of whether it meets any particular
      requirements.

   elements
      One value or member in a set.

   equivalence classes
      An :term:`equivalence relation` can be used to partition a set
      into equivalence classes.

   equivalence relation
      Relation :math:`R` is an equivalence relation on set
      :math:`\mathbf{S}` if it is reflexive, symmetric, and
      transitive.

   exact-match query
      Records are accessed by unique identifier.

   factorial
      The factorial function is defined as :math:`f(n) = n f(n-1)` for
      :math:`n > 0`.

   floor
      Written :math:`\lfloor x \rfloor`, for real value :math:`x` the
      floor is the greatest integer :math:`\leq x`.

   harmonic series
      The sum of reciprocals from 1 to :math:`n` is called the
      Harmonic Series, and is written :math:`{\cal H}_n`.
      This sum has a value between :math:`\log_e n` and
      :math:`\log_e n + 1`. 

   induction hypothesis
      The key assumption used in an induction proof, that the theorem
      to be proved holds for smaller instances of the theorem.
      The induction hypothesis is equivalent to the recursive call in
      a recursive function.

   key
      A field or part of a larger record used to represent that record
      for the purpose of searching or comparing.

   key-record pair
      A standard solution for solving the problem of how to relate a
      key value to a record (or how to find the key for a given
      record) within the context of a particular index.
      The idea is to simply stores as records in the index pairs of
      keys and records.
      Specifically, the index will typically store a copy of the key
      along with a reference to the record.
      The other standard solution to this problem is to pass a
      comparator function to the index methods.

   linear order
      Another term for :term:`total order`.

   logarithm
      The `logarithm` of base :math:`b` for value :math:`y` is the power
      to which :math:`b` is raised to get :math:`y`.

   members
      In a set, this is another term for an element. In an
      object-oriented language, data members are data fields in an
      object.

   mod
      Another name for the :term:`modulus` function.

   modulus
      The modulus function returns the
      remainder of an integer division.
      Sometimes written :math:`n \bmod m` in mathematical expressions,
      the syntax in many programming languages is ``n % m``.

   multilist
       A list that may contain sublists.
       This term is sometimes used as a synonym to the term
       :term:`bag`.

   partial order
      A binary relation is called a partial order if it is
      antisymmetric and transitive.

   partially ordered set
      The set on which a :term:`partial order` is defined is called a
      partially ordered set.

   permutation
      A permutation of a sequence :math:`\mathbf{S}`
      is the members of :math:`\mathbf{S}` arranged in some order.

   poset
      Another name for a :term:`partially ordered set`.

   powerset
      For a set :math:`\mathbf{S}`, the power set is the set of all
      possible subsets for :math:`\mathbf{S}`.

   primitive element
      In set notation, this is a single element that is a member of
      the base type for the set. This is as opposed to an element of
      the set being another set.

   random permutation
      One of the :math:`n!` possible permutations for a set of
      :math:`n` element is selected in such a way that each
      permutation has equal probability of being selected.

   range query
      Records are returned if their relevant key value falls with a
      specified range.

   recurrence relation
      A recurrence relation defines a function by means of an
      expression that includes one or more (smaller) instances of
      itself. A classic example is the recursive definition for the
      factorial function.

   recursive
      An algorithm is recursive if it calls itself to do part of
      its work.

   reflexive
      In set notation, relation :math:`R` is reflexive if :math:`aRa`
      for all :math:`a \in \mathbf{S}`.

   relation
      In set notation, a relation :math:`R` over set
      :math:`\mathbf{S}` is a set of ordered pairs from
      :math:`\mathbf{S}`.

   resource constraints
      Examples of resource constraints include the total space
      available to store the data |---| possibly divided into separate
      main memory and disk space constraints |---| and the time
      allowed to perform each subtask.

   sequence
      In set notation, a collection of elements with an order, and
      which may contain duplicate-valued elements.
      A sequence is also sometimes called a :term:`tuple` or a
      :term:`vector`.

   set
      A collection of distinguishable :term:`members` or :term:`elements`.

   sorting problem
      Given a set of records :math:`r_1`, :math:`r_2`, ..., :math:`r_n`
      with key values :math:`k_1`, :math:`k_2`, ..., :math:`k_n`,
      the :dfn:`Sorting Problem` is to
      arrange the records into any order :math:`s` such that records
      :math:`r_{s_1}`, :math:`r_{s_2}`, ..., :math:`r_{s_n}`
      have keys obeying the property
      :math:`k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}`.
      In other words, the sorting problem is to arrange a set of records so
      that the values of their key fields are in non-decreasing order.

   search key
      A field or part of a record that is used to represent the record
      when searching. For example, in a database of customer records,
      we might want to search by name.
      In this case the name field is used as the search key.

   stable
      A sorting algorithm is said to be stable if it does not
      change the relative ordering of records with identical key values.

   strong induction
      An alternative formulation for the induction step in an
      inductive proof.
      The induction step for strong induction is:
      If **Thrm** holds for all :math:`k, c \leq k < n`, then
      **Thrm** holds for :math:`n`.

   summation
      The sum of costs for some function applied to a
      range of parameter values.

   symmetric
      In set notation, relation :math:`R` is symmetric if whenever
      :math:`aRb`, then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   total order
      A binary relation on a set where every pair of distinct elements
      in the set are :term:`comparable` (that is, one can determine
      which of the pair is greater than the other).

   transitive
      In set notation, relation :math:`R` is transitive if whenever
      :math:`aRb`, then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   tuple
      In set notation, another term for a :term:`sequence`.

   two-coloring
      An assignment from two colors to regions in an image
      such that no two regions sharing a side have the same color.

   vector
      In set notation, another term for a :term:`sequence`.
      As a data structure, a vector usually refers to an array that
      grows and shrinks to accomodate the number of elements being
      stored.
