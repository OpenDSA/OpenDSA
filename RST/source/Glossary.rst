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
   :sorted:

   ADT
      Abbreviation for :term:`abstract data type`.

   abstract data type
      Abreviated ADT. The realization of a data type as a software
      component.

   activation record
      The entity that is stored on the :term:`runtime stack` during
      program execution.
      It stores any active local variable and the return address from
      which a new subroutine is being called, so that this information
      can be recovered when the subroutine terminates.

   aggregate type
      A type whose members have subparts. For example, a typical
      database record. Another term for this is :term:`composite type`.

   antisymmetric
      In set notation, relation :math:`R` is antisymmetric if whenever
      :math:`aRb` and :math:`bRa`, then :math:`a = b`, for all
      :math:`a, b \in \mathbf{S}`.

   algorithm
      A method or a process followed to solve a problem.

   algorithm analysis
      A less formal term for :term:`asymptotic analysis`.

   amortized analysis
      An analysis techique that looks at the total cost for a series
      of operations and amortizes this total cost over the full series.
      This is as opposed to considering only the worst case cost for an
      individual operation, which might well be an overestimate of the
      total cost.

   amortized cost
      The total cost for a series of operations to be used in an
      :term:`amortized analysis`.

   array-based list
      An implementation for the list ADT that uses an array to store
      the list elements. Typical implementations fix the array size at
      creation of the list, and the amount of :term:`overhead` or
      unused space is the number of array positions that are presently
      unused.

   array-based stack
      Analogous to an :term:`array-based list`, this uses an array to
      store the elements when implementing the stack ADT.

   asymptotic algorithm analysis
      A more formal term for :term:`asymptotic analysis`.

   asymptotic analysis
      A method for estimating the efficiency of an algorithm or
      computer program. Asymptotic analysis also gives a way to define
      the inherent difficulty of a problem. We frequently use the
      term :term:`algorithm analysis` to mean the same thing.

   average case
      In algorithm analysis, the average of the costs for all problem
      instances of a given input size :math:`n`. If not all problem
      instances have equal probability of occurring, then average case
      must be calculated using a weighted average.

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

   best case
      In algorithm analysis, the problem instance from among all
      problem instances for a given input size :math:`n` that has
      least cost. Note that the best case is **not** when :math:`n` is
      small, since we are referring to the best from a class of inputs
      (i.e, those inputs of size :math:`n`).

   binary search
      A standard recursive search algorithm for a sorted list. It runs
      in :math:O(\log n): time.
      
   big-Oh notation
      In algorithm analysis, a shorthand notation for describing the
      upper bound for an algorithm or problem.

   Boolean variable
      A variable that takes on one of the two values ``True`` and
      ``False``.

   bounding box
      A box (usually aligned to the coordinate axes of the reference
      system) that contains a (potentially complex) object. In
      graphics and computational geometry, complex objects might be
      associated with a bounding box for use by algorithms that search
      for objects in a particular location. The idea is that if the
      bounding box is not within the area of interest, then neither is
      the object. Checking the bounding box is cheaper than checking
      the object, but it does require some time. So if enough objects
      are not outside the area of interest, this approach will not
      save time. But if most objects are outside of the area of
      interest, then checking bounding boxes first can save a lot of
      time.

   ceiling
      Written :math:`\lceil x \rceil`, for real value :math:`x` the
      ceiling is the least integer :math:`\geq x`.

   circular list
      A :term:`list` ADT implementation variant where the last element of the
      list provides access to the first element of the list.

   class
      In an object-oriented language, an ADT and its implementation
      together make up a class. 

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
      In programming, the property of a data type such that two
      elements of the type can be compared to determine if they the
      same (a weaker version), or which of the two is larger (a
      stronger version). This stronger version requires that the type
      define a :term:`total order`.

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

   complete binary tree
      A binary tree where the nodes are filled in row by row, with the
      bottom row filled in left to right.
      Due to this requirement, there is only one tree of :math:`n`
      nodes for any value of :math:`n`.
      Since storing the records in an array in row order leads to a
      simple mapping from a node's position in the array to its
      parent, siblings, and children, the array representation is most
      commonly used to implement the complete binary tree.
      The :term:`heap` data structure is a complete binary tree with
      partial ordering constraints on the node values.

   composite type
      A type whose members have subparts. For example, a typical
      database record. Another term for this is :term:`aggregate type`.

   computer program
      An instance, or concrete representation, of an algorithm in some
      programming language.

   constant running time
      The cost of a function whose running time is not related to its
      input size.

   cost
      The :dfn:`cost` of a solution is the
      amount of resources that the solution consumes.

   current position
      A property of some list ADTs, where there is maintained a
      "current position" state that can be referred to later.

   data item
      A piece of information or a record whose value is drawn from a type.

   data members
      The variables that together define the space required by a data
      item are referred to as data members.

   data structure
      The implementation for an :term:`ADT`.

   data type
      A type together with a collection of operations to manipulate
      the type.

   dequeue
      A specialized term used to indicate removing an element from a queue.

   design patterns
      Abstractions for describing the design of programs |---| that is,
      the interactions of objects and classes.
      Experienced software designers learn and reuse patterns
      for combining software components, and design patterns allow
      this design knowledge to be passed on to new programmers more quickly.

   dictionary
      An abstract data type or interface for a data structure or
      software subsystem that supports insertion, search, and deletion
      of records.

   diminishing increment sort
      Another name for Shellsort.

   direct proof
      In general, a direct proof is just a "logical explanation".
      A direct proof is sometimes referred to as an argument by deduction.
      This is simply an argument in terms of logic.
      Often written in English with words such as "if ... then",
      it could also be written with logic notation such as
      :math:`P \Rightarrow Q`.

   disk-based space/time tradeoff
      In contrast to the standard :term:`space/time tradeoff`, this
      principle states that the smaller you can make your disk storage
      requirements, the faster your program will run.
      This is because the time to read information from disk is
      enormous compared to computation time, so almost any amount of
      additional computation needed to unpack the data is going to be
      less than the disk-reading time saved by reducing the storage
      requirements.

   divide and conquer
      A technique for designing algorithms where a solution is found
      by breaking the problem into smaller (similar) subproblems,
      solving the subproblems, then combining the subproblem solutions
      to form the solution to the original problem.
      This process is often implemented using recursion.
   
   domain
      The set of possible inputs to a function.

   doubly linked list
      A :term:`linked list` implementation variant where each list
      node contains access pointers to both the previous element and
      the next element on the list.

   dynamic allocation
      The act of creating an object from :term:`free store`.
      In C++, Java, and JavaScript, this is done using the ``new``
      operator.

   dynamic array
      Arrays, once allocated, are of fixed size. A dynamic array puts
      an interface around the array so as to appear to allow the array
      to grow and shrink in size as necessary. Typically this is done
      by allocating a new copy, copying the contents of the old array,
      and then returning the old array to :term:`free store`.
      If done correctly, the :term:`amortized cost` for dynamically
      resizing the array can be made constant.
      In some programming languages such as Java, the term
      :term:`vector` is used as a synonym for dynamic array.

   dynamic memory allocation
      A programming technique where linked objects in a data structure
      are created from :term:`free store` as needed. When no longer
      needed, the object is either returned to :term:`free store` or
      left as :term:`garbage`, depending on the programming language.

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

   empty
      For a container class, the state of containing no elements.

   encapsulation
      In programming, the concept of hiding implementation details
      from the user of an ADT, and protecting data members of an
      object from outside access.

   enqueue
      A specialized term used to indicate inserting an element onto a queue.

   equivalence classes
      An :term:`equivalence relation` can be used to partition a set
      into equivalence classes.

   equivalence relation
      Relation :math:`R` is an equivalence relation on set
      :math:`\mathbf{S}` if it is reflexive, symmetric, and
      transitive.

   exact-match query
      Records are accessed by unique identifier.

   exponential growth rate
      A growth rate function where :math:`n` (the input size) appears
      in the exponent. For example, :math:`2^n`.

   factorial
      The factorial function is defined as :math:`f(n) = n f(n-1)` for
      :math:`n > 0`.

   file structure
      The organization of data on peripheral storage, such
      as a disk drive or CD.

   floor
      Written :math:`\lfloor x \rfloor`, for real value :math:`x` the
      floor is the greatest integer :math:`\leq x`.

   free store
      Space available to a program during runtime to be used for
      :term:`dynamic allocation` of objects.
      The free store is distinct from the :term:`runtime stack`.
      The free store is sometimes referred to as the :term:`heap`,
      which can be confusing because :term:`heap` more often refers to
      a specific data structure. Most programming languages provide
      functions to allocate (and maybe to deallocate) objects from the
      free store, such as ``new`` in C++ and Java.

   freelist
      A simple and faster alternative to using :term:`free store` when
      the objects being dynamically allocated are all of the same size
      (and thus are interchangeable).
      Typically implemented as a linked stack, released objects are
      put on the front of the freelist.
      When a request is made to allocate an object, the freelist is
      checked first and it provides the object if possible.
      If the freelist is empty, then a new object is allocated from
      :term:`free store`.

   function
      A matching between inputs (the :term:`domain`) and outputs
      (the :term:`range`). 

   garbage
      In programming, any memory that was previously (dynamically)
      allocated by the program during runtime, but which is no longer
      accessible since all pointers to the memory have been deleted or
      overwritten. In some languages, garbage can be recovered by
      :term:`garbage collection`.
      In languages such as C and C++ that do not support garbage
      collection, creating garbage is considered a
      :term:`memory leak`.

   garbage collection
       Languages with garbage collection such
      Java, JavaScript, Lisp, and Scheme will periodically reclaim
      :term:`garbage` and return it to :term:`free store`.

   growth rate
      The rate at which the cost
      of the algorithm grows as the size of its input grows.

   harmonic series
      The sum of reciprocals from 1 to :math:`n` is called the
      Harmonic Series, and is written :math:`{\cal H}_n`.
      This sum has a value between :math:`\log_e n` and
      :math:`\log_e n + 1`. 

   head
      The beginning of a :term:`list`.

   header node
      Commonly used in implementations for a :term:`linked list` or
      related structure, this node preceeds the first element of the
      list. Its purpose is to simplify the code implementation by
      reducing the number of special cases that must be programmed
      for.

   heap
      This term has two different meanings. Uncommonly, it is a
      synonym for :term:`free store`.
      Most often it is used to refer to a particular data structure.
      This data structure is a :term:`complete binary tree` with the
      requirement that every node has a value greater than its
      children (called a :term:`max heap`), or else the 
      requirement that every node has a value less than its
      children (called a :term:`min heap`).
      Due to its space and time efficiency, the heap is a
      popular choice for implementing a :term:`priority queue`.

   induction hypothesis
      The key assumption used in an induction proof, that the theorem
      to be proved holds for smaller instances of the theorem.
      The induction hypothesis is equivalent to the recursive call in
      a recursive function.

   instance
      A specific selection of values for the parameters to a problem.
      In other words, a specific set of inputs to a problem.

   iterator
      In a container such as a List, a separate class that indicates
      position within the container, with support for traversing
      through all elements in the container.

   key
      A field or part of a larger record used to represent that record
      for the purpose of searching or comparing. Another term for
      :term:`search key`.

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

   length
      In a :term:`list`, the number of elements. In a string, the
      number of characters.

   linear growth rate
      For input size :math:`n`, a growth rate of :math:`cn` (for
      :math:`c` any positive constant). In other words, the cost of
      the associated function is linear on the input size.

   linear order
      Another term for :term:`total order`.

   linked list
      An implementation for the list ADT that uses
      :term:`dynamic allocation`
      of link nodes to store the list elements. Common variants are the
      :term:`singly linked list`, :term:`doubly linked list` and
      :term:`circular list`.
      The :term:`overhead` required is the pointers in each link node.

   linked stack
      Analogous to a :term:`linked list`, this uses
      :term:`dynamic allocation` of nodes to
      store the elements when implementing the stack ADT.

   list
      A finite, ordered sequence of data items known as :term:`elements`.
      This is close to the mathematical concept of a :term:`sequence`.

   logarithm
      The `logarithm` of base :math:`b` for value :math:`y` is the power
      to which :math:`b` is raised to get :math:`y`.

   logical form
      The definition for a data type in terms of an ADT. Contrast to
      the :term:`physical form` for the data type.

   lookup table
      A table of pre-calculated values, used to speed up processing
      time when the values are going to be viewed many times. The
      costs to this approach are the space required for the table and
      the time required to compute the table. This is an example of a
      :term:`space/time tradeoff`.

   lower bound
      In algorithm analysis, the lowest growth rate that
      an algorithm can have. In practice, this is the fastest-growing
      function that we know grows no faster than all but a
      constant number of inputs. It could be a gross under-estimate of
      the truth.

   max heap
      A :term:`heap` where every node has a key value greater than its
      children. As a consequence, the node with maximum key value is
      at the root.

   member
   members
      In set notation, this is another term for elements. 
      In abstract design, a :term:`data item` is a member of a :term:`type`.
      In an object-oriented language, data members are data fields in an
      object.

   member function
      Each operation associated with the ADT is implemented by a
      member function or :term:`method`.

   memory leak
      In programming, the act of creating :term:`garbage`.
      In languages such as C and C++ that do not support
      :term:`garbage collection`, repeated memory leaks will evenually
      cause the program to terminate.

   metaphor
      Humans deal with complexity by assigning a label to an assembly of
      objects or concepts and then manipulating the label in place of the
      assembly. Cognitive psychologists call such a label a
      metaphor.

   method
      In an objectect-oriented class, a method is an operation on a class.
      A synonym for :term:`member function`.

   min heap
      A :term:`heap` where every node has a key value less than its
      children. As a consequence, the node with minimum key value is
      at the root.

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

   node
   nodes
      The objects that make up a linked structure such as a linked
      list or binary tree. Typically, nodes are allocated using
      :term:`dynamic memory allocation`.

   object
      An instance of a class, that is, something that is created and
      takes up storage during the execution of a computer program.

   one-way list
      A synonym for a :term:`singly linked list`.

   overhead
      All information stored by a data structure aside from the actual
      data. For example, the pointer fields in a linked list or BST.

   parameters
      The values making up an input to a function.

   partial order
      A binary relation is called a partial order if it is
      antisymmetric and transitive.

   partially ordered set
      The set on which a :term:`partial order` is defined is called a
      partially ordered set.

   permutation
      A permutation of a sequence :math:`\mathbf{S}`
      is the members of :math:`\mathbf{S}` arranged in some order.

   physical form
      The implementation of a data type as a data structure.
      Contrast to the :term:`physical form` for the data type.

   Pigeonhole Principle
      A commonly used lemma in Mathematics. A typical variant states:
      When :math:`n+1` objects are stored in :math:`n` locations, at
      least one of the locations must store two or more of the objects.

   pop
   popped
      A specialized term used to indicate removing an element from a stack.

   poset
      Another name for a :term:`partially ordered set`.

   position
      The defining property of the list ADT, this is the concept that
      list elements are in a position. Many list ADTs support access
      by position.

   powerset
      For a set :math:`\mathbf{S}`, the power set is the set of all
      possible subsets for :math:`\mathbf{S}`.

   primitive element
      In set notation, this is a single element that is a member of
      the base type for the set. This is as opposed to an element of
      the set being another set.

   priority queue
      An ADT whose primary operations of insert of records, and
      deletion of the greatest (or, in an alternative implementation,
      the least) valued record. Most often implemented using the
      :term:`heap` data structure.

   problem
      A task to be performed.
      It is best thought of as a function or a mapping of
      inputs to outputs.

   program
      An instance, or concrete representation, of an algorithm in some
      programming language.

   push
   pushed
      A specialized term used to indicate inserting an element onto a stack.

   quadratic growth rate
      A growth rate function of the form :math:`cn^2` where :math:`n`
      is the input size and :math:`c` is a constant.

   queue
      A list-like structure in which elements are inserted only at one
      end, and removed only from the other one end.

   random permutation
      One of the :math:`n!` possible permutations for a set of
      :math:`n` element is selected in such a way that each
      permutation has equal probability of being selected.

   range
      The set of possible outputs for a function.

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

   runtime stack
      The place where an :term:`activation record` is stored when a
      subroutine is called during a program's runtime.

   search key
      A field or part of a record that is used to represent the record
      when searching. For example, in a database of customer records,
      we might want to search by name.
      In this case the name field is used as the search key.

   sequence
      In set notation, a collection of elements with an order, and
      which may contain duplicate-valued elements.
      A sequence is also sometimes called a :term:`tuple` or a
      :term:`vector`.

   sequential search
      The simplest search algorithm: In an array, simply look at the
      array elements in the order that they appear.

   set
      A collection of distinguishable :term:`members` or :term:`elements`.

   simple type
      A type whose values contain no subparts. An example is the integers.

   singly linked list
      A :term:`linked list` implementation variant where each list
      node contains access an pointer only to the next element in the list.

   sorting problem
      Given a set of records :math:`r_1`, :math:`r_2`, ..., :math:`r_n`
      with key values :math:`k_1`, :math:`k_2`, ..., :math:`k_n`,
      the Sorting Problem is to
      arrange the records into any order :math:`s` such that records
      :math:`r_{s_1}`, :math:`r_{s_2}`, ..., :math:`r_{s_n}`
      have keys obeying the property
      :math:`k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}`.
      In other words, the sorting problem is to arrange a set of records so
      that the values of their key fields are in non-decreasing order.

   space/time tradeoff
      Many programs can be designed to either speed processing at the
      cost of additional storage, or reduce storage at the cost of
      additional processing time.

   stable
      A sorting algorithm is said to be stable if it does not
      change the relative ordering of records with identical key values.

   stack
      A list-like structure in which elements may be inserted or
      removed from only one end.

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

   tail
      The end of a :term:`list`.

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

   type
      A collection of values.

   upper bound
      In algorithm analysis, the upper or highest growth rate that
      an algorithm can have. In practice, this is the smallest-growing
      function that we know grows at least as fast as all but a
      constant number of inputs. It could be a gross over-estimate of
      the truth.

   vector
      In set notation, another term for a :term:`sequence`.
      As a data structure, the term vector usually used as a synonym
      for a :term:`dynamic array`.

   worst case
      In algorithm analysis, the problem instance from among all
      problem instances for a given input size :math:`n` that has
      the greatest cost. Note that the worst case is **not** when
      :math:`n` is big, since we are referring to the wost from a
      class of inputs (i.e, those inputs of size :math:`n`).
