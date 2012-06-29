.. _SortCompare:

.. index::
   pair: sorting; comparison

Making Comparisons
==================

.. todo::

   [Make this paragraph appropriate for non-JAVA consumption.]
   Except where noted otherwise, input to the sorting algorithms
   is a collection of records stored in an array.
   An important issue is how to compare two records.
   Records are compared to one another by requiring that their type
   extend the ``Comparable`` class.
   This will ensure that the class implements the ``compareTo``
   method, which returns a value less than zero, equal to zero, or
   greater than zero depending on its relationship to the record being
   compared to.
   The ``compareTo`` method is defined to extract the
   appropriate key field from the record.
   We also assume that for every record type there is a ``swap``
   function that can interchange the contents of two records in the
   array.

