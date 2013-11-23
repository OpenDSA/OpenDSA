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

   ancestor
      In a tree, for a given node :math:`A`, any node on a :term:`path` from
      :math:`A` up to the root is an ancestor of :math:`A`.

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

   base
      Synonym for :term:`radix`.

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

   big-Oh notation
      In algorithm analysis, a shorthand notation for describing the
      upper bound for an algorithm or problem.

   binary search
      A standard recursive search algorithm for a sorted list. It runs
      in :math:O(\log n): time.
      
   binary search tree
   BST
      A binary tree that imposes the following constraint on its node
      values: The (key) value for any node :math:`A` must be greater
      than the (key) values for all nodes in the left :term:`subtree`
      of :math:`A`, and less than the (key) values for all nodes in the
      right subtree of :math:`A`. Some convention must be adopted if
      multiple nodes with the same key value are permitted, typically
      these are required to be in the right subtree.

   binary tree
      A finite set of nodes which is either empty, or else has a root
      node together two binary trees, called the left and right
      :term:`subtrees`,  which are disjoint from each other and from
      the root.

   binsort
      A sort that works by taking each record and placing it into a
      bin based on its value. The bins are then gathered up in order
      to sort the list. It is generally not practical in this form,
      but it is the conceptual underpinning of the :term:`radix sort`.

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

   bubble sort
      A simple sort that requires :math:`Theta(n^2)` time in best,
      average, and worst cases. Even an optimized version will
      normally run slower than insertion sort, so it has little to
      recommend it.

   bucket sort
      A variation on the :term:`binsort`, where each bin is associated
      with a range of key values. This will require some method of
      sorting the records placed into each bin.

   ceiling
      Written :math:`\lceil x \rceil`, for real value :math:`x` the
      ceiling is the least integer :math:`\geq x`.

   child
   children
      In a tree, the set of :math:`nodes` directly pointed to by a node
      :math:`R` are the children of :math:`R`.

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

   comparator
   comparator function
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

   complete
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

   connected component
      In an :term:`undirected graph`, a subset of the nodes such that
      each node in the subset can be reached from any other node in
      that subset.

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

   decision tree
      A theoretical construct for modeling the behavior of algorithms.
      Each point at which the algorithm makes a decision (such as an
      if statement) is modeled by a branch in the tree that represents
      the algorithms behavior. Decision trees can be used in lower
      bounds proofs, such as the proof that sorting requires
      :math:`\Omega(n \log n)` comparisons in the worst case.

   depth
     The depth of a node :math:`M` in a tree is the length
     of the path from the root of the tree to :math:`M`.

   dequeue
      A specialized term used to indicate removing an element from a queue.

   descendant
   descendants
      In a tree, the set of all nodes that have a node :math:`A` as an
      :term:`ancestor` are the descendants of :math:`A`.
      In other words, all of the nodes that can be reached from
      :math:`A` by progressing downwards in tree.
      Another way to say it is: The
      :term:`children` of :math:`A`, their children, and so on.

   design pattern
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

   disjoint set
   disjoint sets
      A collection of sets any pair of which share no elements in
      common.
      A collection of disjoint sets partitions some objects
      such that every object is in exactly one of the disjoint sets.

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

   edge
      The connection that links two :term:`nodes` in a tree, linked
      list, or graph.

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

   entry-sequenced file
      A file that stores records in the order that they were added to
      the file.

   enumeration
   enumerate
      The process by which a :term:`traversal` lists every object in
      the container exactly once. Thus, a traversal that prints the
      nodes is said to enumerate the nodes. An enumeration can also
      refer to the actual listing that is produced by the traversal
      (as well as the process that created that listing).

   equivalence class
   equivalence classes
      An :term:`equivalence relation` can be used to partition a set
      into equivalence classes.

   equivalence relation
      Relation :math:`R` is an equivalence relation on set
      :math:`\mathbf{S}` if it is reflexive, symmetric, and
      transitive.

   exact-match query
      Records are accessed by unique identifier.

   exchange
      A swap of adjacent records in an array.

   exchange sort
      A sort that relies solely on exchanges (swaps of adjacent
      records) to reorder the list. Insertion sort and bubble sort are
      examples of exchange sorts. All exchange sorts require
      :math:`\Theta(n^2)` time in the worst case.

   exponential growth rate
      A growth rate function where :math:`n` (the input size) appears
      in the exponent. For example, :math:`2^n`.

   factorial
      The factorial function is defined as :math:`f(n) = n f(n-1)` for
      :math:`n > 0`.

   file structure
      The organization of data on peripheral storage, such
      as a disk drive or CD.

   FIND
      One half of the :term:`UNION/FIND` algorithm for managing
      :term:`disjoint sets`. It is the process of moving upwards in a
      tree to find the tree's root.

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

   full
   full tree
      A binary tree is full if every node is either a
      :term:`leaf node` or else it is an internal node with two
      non-empty children.

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

   general tree
   general trees
      A tree in which any given node can have any number of children.
      This is in contrast to, for example, a :term:`binary tree` where
      each node has a fixed number of children. General tree nodes
      tend to be harder to implement for this reason.

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

   heapsort
      A sorting algorithm that costs :math:`\Theta(n \log n)` time in
      the best, average, and worst cases. It tends to be slower than
      Mergesort and Quicksort. It works by building a max heap, and
      then repeatedly removing the maximum item (moving it to the end
      of the heap) until all elements have been removed (and replaced
      at their proper location in the array).

   height
      The height of a tree is one more than the :term:`depth` of the
      deepest :term:`node` in the tree.

   homogeneity
      In a container class, this is the property that all objects
      stored in the container are of the same class. For example, if
      you have a list intended to store Payroll records, is it
      possible for the programmer to insert an integer onto the list
      instead?

   index file
      A file whose records consist of key/pointer pairs where the
      pointers are referencing the complete records stored in another
      file.

   indexing
      The process of associating a key with the location
      of a corresponding data record.

   induction hypothesis
      The key assumption used in an induction proof, that the theorem
      to be proved holds for smaller instances of the theorem.
      The induction hypothesis is equivalent to the recursive call in
      a recursive function.

   inorder traversal
      In a binary tree, a :term:`traversal` that first
      recursively visits the left child, then visits the
      root, an then recursively visits the right child.
      In a :term:`binary search tree`, this traversal will
      :term:`enumerate` the nodes in sorted order.

   insertion sort
      A sorting algorithm with :math:`\Theta(n^2)` average and worst
      case cost, and :math:`Theta(n)` best case cost.
      This best-case cost makes it useful when we have reason to
      expect the input to be nearly sorted.

   instance
      A specific selection of values for the parameters to a problem.
      In other words, a specific set of inputs to a problem.

   internal node
      In a tree, any node that has at least one non-empty
      :term:`child` is an  internal node.

   inversion
      A measure of how disordered a series of values is. For each
      element :math:`X` in the series, count one inversion for each
      element to left of :math:`X` that is greater than the value of
      :math:`X` (and so must ultimately be moved to the right of
      :math:`X` during a sorting process.

   ISAM
      Indexed Sequential Access Method: an obsolete method for
      indexing data for (at the time) fast retrieval. More generally,
      the term is used also to generically refer to an index that
      supports both sequential and keyed access to data records.
      Today, that would nearly always be implemented using a :term:`B-Tree`.

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

   leaf
   leaf node
      In a binary tree, A leaf node is any node that has two empty
      children.
      (Note that in a binary tree is defined so that every
      node has two children, and that is why the leaf node has to have
      two empty children, rather than no children.)
      In a general tree, any node is a leaf node if it has no children.

   length
      In a :term:`list`, the number of elements. In a string, the
      number of characters.

   level
      In a tree, all nodes of :term:`depth` :math:`d` are at
      level :math:`d` in the tree.
      The root is the only node at level 0, and its depth is 0.

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

   mergesort
      A sort that requires :math:`\Theta(n \log n)` in the best,
      average, and worst cases. Conceptually it is simple: Split the
      list in half, sort the halves, then merge them together. It is a
      bit complicated to implement effiently on an array.

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

   NP Complete
      A class of problems that are related to each other in this way:
      If ever one such problem is proved to be solvable in
      polynomial time, or proved to require exponential time,
      then all other NP Complete problems will cost likewise.
      Since so many real-world problems have been proved to be
      NP Complete, it would be extremely useful to determine if they
      have polynomial or exponential cost. But so far, nobody has
      been able to determine the truth of the situation.

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

   parent
      In a tree, the :term:`node` :math:`P` that directly links to a
      node :math:`A` is the parent of :math:`A`. :math:`A` is the
      :term:`child` of :math:`P`.

   parent pointer representation
      For trees, a node implementation where each node stores only a
      pointer to its parent, rather than to its children. This makes
      it easy to go up the tree toward the root, but not down the tree
      toward the leaves. This is most appropriate for solving the
      :term:`UNION/FIND` problem.

   partial order
      A binary relation is called a partial order if it is
      antisymmetric and transitive.

   partially ordered set
      The set on which a :term:`partial order` is defined is called a
      partially ordered set.

   partition
      In :term:`quicksort`, the process of splitting a list into two
      sublists, such that one sublist has values less than the
      :term:`pivot` value, and the other with values greater than the
      pivot. This process takes :math:`\Theta(i)` time on a sublist of
      length :math:`i`.

   path
      A sequence of vertices :math:`v_1, v_2, ..., v_n`
      forms a path of length :math:`n-1` if there exist edges from
      :math:`v_i` to :math:`v_{i+1}` for :math:`1 \leq i < n`.

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

   pivot
      In :term:`quicksort`, the value that is used to split the list
      into sublists, one with lesser values than the pivot, the other
      with greater values than the pivot.

   pop
   popped
      A specialized term used to indicate removing an element from a stack.

   poset
      Another name for a :term:`partially ordered set`.

   position
      The defining property of the list ADT, this is the concept that
      list elements are in a position. Many list ADTs support access
      by position.

   postorder traversal
      In a binary tree, a :term:`traversal` that first
      recursively visits the left child, then recursively
      visits the right child, and then visits the root.

   powerset
      For a set :math:`\mathbf{S}`, the power set is the set of all
      possible subsets for :math:`\mathbf{S}`.

   preorder traversal
      In a binary tree, a :term:`traversal` that first visits the
      root, then recursively visits the left child, then recursively
      visits the right child.

   primary index
   primary key index
      Relates each primary key value with a pointer to the actual
      record on disk.

   primary key
      A unique identifier for a record.

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

   quicksort
      A sort that is :math:`\Theta(n \log n)` in the best and average
      cases, though :math:`\Theta(n^2)` in the worst case. However, a
      reasonable implmentation will make the worst case occur under
      exceedingly rare circumstances. Due to its tight inner loop, it
      tends to run better than any other known sort in general
      cases. Thus, it is a popular sort to use in code libraries. It
      works by divide and conquor, by selecting a :term:`pivot` value,
      splitting the list into parts that are either less than or
      greater than the pivot, and then sorting the two parts.

   radix
      Synonym for :term:`base`. The number of digits in a number
      representation. For example, we typically represent numbers in
      base (or radix) 10. Hexidecimal is base (or radix) 16.

   radix sort
      A sorting algorithm that works by processing records with
      :math:`k` digit keys in :math:`k` passes, where each pass sorts
      the records according to the current digit. At the end of the
      process, the records will be sorted. This can be efficient if
      the number of digits is small compared to the number of
      records. However, if the :math:`n` records all have unique key
      valuse, than at least :math:`\Omega(\log n)` digits are required,
      leading to an :math:`\Omega(n \log n)` sorting algorithm that
      tends to be much slower than other sorting algorithms like
      :term:`quicksort` or :term:`mergesort`.

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

   reduction
      In algorithm analysis, the process of deriving asymptotic bounds
      for one problem from the asymptotic bounds of another. In
      particular, if problem A can be used to solve problem B, and
      problem A is proved to be in :math:`O(f(n))`, then problem B
      must also be in :math:`O(f(n)`. Reductions are often used to
      show that certain problems are at least as expensive as sorting,
      or that certain problems are :term:`NP Complete`.

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

   root
      In a tree, the topmost :term:`node` of the tree. All other nodes
      in the tree are :term:`descendants` of the root.

   runtime stack
      The place where an :term:`activation record` is stored when a
      subroutine is called during a program's runtime.

   search key
      A field or part of a record that is used to represent the record
      when searching. For example, in a database of customer records,
      we might want to search by name.
      In this case the name field is used as the search key.

   secondary key
      A key field in a record such as salary, where a particular key
      value might be duplicated in multiple records. A secondary key
      is more likely to be used by a user as a search key than is the
      record's :term:`primary key`.

   secondary index
   secondary key index
      Associates a secondary key value with the primary key of each
      record having that secondary key value.

   selection sort
      While this sort requires :math:`\Theta(n^2)` time in the best,
      average, and worst cases, it requires only :math:`\Theta(n)`
      swap operations. Thus, it does relatively well in cases where
      swaps are expensive. It can be viewed as an optimization on
      bubble sort where swaps are deferred until the end of each
      iteration.

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

   Shellsort
      A sort that relies on the best-case cost of
      :term:`insertion sort` to improve over :math:`\Theta(n^2)` worst
      case cost. 

   signature
      In a programming language, the signature for a function is its
      return type and its list of parameters and their types.

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

   spatial application
      An application what has spatial aspects. In particular, an
      application that stores records that need to be searched by
      location.

   spatial attribute
      An attribute of a record that has a position in space, such as
      the coordinate.

   spatial data structure
      A data structure designed to support efficient processing when a
      :term:`spatial attribute` is used as the key. In particular, a
      data structure that supports efficient search by location, or
      finds all records within a given region.

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

   subtree
   subtrees
      A subtree is a subset of the nodes of a binary tree that
      includes some node :math:`R` of the tree as the subtree root
      along with all the :term:`descendants` of :math:`R`.


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

   traversal
      Any process for visiting all of the objects in a collection
      (such as a tree or graph) in some order.

   tuple
      In set notation, another term for a :term:`sequence`.

   two-coloring
      An assignment from two colors to regions in an image
      such that no two regions sharing a side have the same color.

   type
      A collection of values.

   undirected graph
      A graph whose edges do not have a direction.

   UNION
      One half of the :term:`UNION/FIND` algorithm for managing
      :term:`disjoint sets`. It is the process of merging two trees
      that are represented using the
      :term:`parent pointer representation` by making the root for one
      of the trees set its parent pointer to the root of the other
      tree.

   UNION/FIND
      A process for mainining a collection of disjoint sets.
      The :term:`FIND` operation determines which disjoint set a given
      object resides in, and the :term:`UNION` operation combines two
      disjoint sets when it is determined that they are members of the
      same :term:`equivalence class` under some :term:`equivalence relation`.

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

   visitor
   visitor design pattern
      A :term:`design pattern` where a traversal process is given a
      function (known as the visitor) that is applied to every object
      in the collection being traversed. For example, a generic tree
      or graph traversal might be designed such that it takes a
      function parameter, where that function is applied to each node.

   weighted union rule
      When merging two disjoint sets using the :term:`UNION/FIND`
      algorithm, the weighted union rule is used to determine which
      subtree's root points to the other.
      The root of the subtree with fewer nodes will be set to point to
      the root of the subtree with more nodes.
      In this way, the average depth of nodes in the resulting tree
      will be less than if the assignment had been made in the other
      direction.

   worst case
      In algorithm analysis, the problem instance from among all
      problem instances for a given input size :math:`n` that has
      the greatest cost. Note that the worst case is **not** when
      :math:`n` is big, since we are referring to the wost from a
      class of inputs (i.e, those inputs of size :math:`n`).
