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

   asymptotic analysis
      A method for estimating the efficiency of an algorithm or
      computer program. Asymptotic analysis also gives a way to define
      the inherent difficulty of a problem.

   basic operations
      Examples of basic operations include inserting a data
      item into the data structure, deleting a data item from the
      data structure, and finding a specified data item.

   comparable
      The concept that two objects can be compared to determine if they
      are equal or not, or to determine which one is greater than the other.
      To be reliably compared for a greater/lesser relationship,
      the values being compared must belong to a total order.
      ``Comparable`` is also the name of an interface in Java that
      asserts a comparable relationship between objects with a class,
      and ``.compareTo()`` is the ``Comparable`` interface method that
      implements the actual comparison between two objects of the class.

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

   efficient
      A solution is said to be :dfn:`efficient`
      if it solves the problem within the required
      :dfn:`resource constraints`.
      A solution is sometimes said to be
      efficient if it requires fewer resources than known
      alternatives, regardless of whether it meets any particular
      requirements.

   exact-match query
      Records are accessed by unique identifier.

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

   range query
      Records are returned if their relevant key value falls with a
      specified range.

   resource constraints
      Examples of resource constraints include the total space
      available to store the data |---| possibly divided into separate
      main memory and disk space constraints |---| and the time
      allowed to perform each subtask.

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
      A sorting algorithm is said to be :dfn:`stable` if it does not
      change the relative ordering of records with identical key values.

   total order
      A binary relation on a set where every pair of distinct elements
      in the set are comparable (that is, one can determine which of
      the pair is greater than the other).
