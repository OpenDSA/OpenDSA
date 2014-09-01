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

   2-3 tree
      A specialized form of the :term:`B-tree` where each internal
      node has either 2 children or 3 children.
      Key values are ordered to maintain the
      :term:`binary search tree property`.
      The 2-3 tree is always height balanced, and its insert, search,
      and remove operations all have :math:`\Theta(\log n)` cost.

   80/20 rule
      Given a typical application where there is a collection of
      records and a series of search operations for records,
      the 80/20 rule is an empirical observation that
      80% of the record accessess typically go to 20% of the records.
      The exact values varies between data collections, and is related
      to the concept of :term:`locality of reference`.

   abstract data type
      Abreviated :term:`ADT`. The realization of a :term:`data type`
      as a software component.

   activation record
      The entity that is stored on the :term:`runtime stack` during
      program execution.
      It stores any active local variable and the return address from
      which a new subroutine is being called, so that this information
      can be recovered when the subroutine terminates.

   acyclic graph
      :to-term: directed acyclic graph :label: types

      In :term:`graph` terminology, a graph that contains no
      :term:`cycles <cycle>`.

   adjacent
      Two :term:`nodes <node>` of a :term:`tree` or two
      :term:`vertices <vertex>` of a :term:`graph` are said to be
      adjacent if they have an :term:`edge` connecting them.

   adjacency list
      An implementation for a :term:`graph` that uses an (array-based)
      :term:`list` to represent the :term:`vertices <vertex>` of the
      graph, and each vertex is in turn represented by a
      (linked) list of the vertices that are
      :term:`neighbors <neighbor>`. 

   adjacency matrix
      An implementation for a :term:`graph` that uses a 2-dimensional
      array where each row and each column corresponds to a
      :term:`vertex` in the :term:`graph`. A given row and column in
      the matrix corresponds to an edge from the :term:`vertex`
      corresponding to the row to the vertex corresponding to the
      column.

   ADT
      Abbreviation for :term:`abstract data type`.

   adversary argument
      A type of :term:`lower bounds proof` for a problem where a
      (fictional) "adversary" is assumed to control access to an
      algorithm's input, and which yields information about that input
      in such a way
      that will drive the cost for any proposed algorithm to solve the
      problem as high as possible.
      So long as the adversary never gives an answer that conflicts
      with any previous answer, it is permitted to do whatever
      necessary to make the algorithm require as much cost as
      possible.

   aggregate type
      A type whose :term:`members <member>` have subparts.
      For example, a typical database record.
      Another term for this is :term:`composite type`. 

   algorithm
      A method or a process followed to solve a :term:`problem`.

   algorithm analysis
      A less formal version of the term
      :term:`asymptotic algorithm analysis`.

   all-pairs shortest paths problem
      Given a :term:`graph` with :term:`weights <weight>` or
      distances on the :term:`edges <edge>`,
      find the shortest paths between every pair of
      vertices in the graph.
      One approach to solving this problem is
      :term:`Floyd's algorithm`, which uses the
      :term:`dynamic programming` algorithmic technique.

   alphabet trie
      A :term:`trie` data structure for storing variable-length
      strings.
      Level :math:`i` of the tree corresponds to the letter in
      position :math:`i` of the string.
      The root will have potential branches on each intial letter of
      string.
      Thus, all strings starting with "a" will be stored in the "a"
      branch of the tree.
      At the second level, such strings will be separated by branching
      on the second letter.

   amortized analysis
      An :term:`algorithm analysis` techique that looks at the total
      cost for a series of operations and amortizes this total cost
      over the full series. 
      This is as opposed to considering every individual operation to
      independently have the worst case cost, which might lead to an
      overestimate for the total cost of the series.

   amortized cost
      The total cost for a series of operations to be used in an
      :term:`amortized analysis`.

   ancestor
      In a tree, for a given node :math:`A`, any node on a
      :term:`path` from :math:`A` up to the root is an ancestor of
      :math:`A`.

   antisymmetric
      In set notation, relation :math:`R` is antisymmetric if whenever
      :math:`aRb` and :math:`bRa`, then :math:`a = b`, for all
      :math:`a, b \in \mathbf{S}`.

   array-based list
      An implementation for the :term:`list` ADT that uses an array to
      store the list elements. Typical implementations fix the array
      size at creation of the list, and the :term:`overhead`
      is the number of array positions that are presently unused.

   array-based stack
      Analogous to an :term:`array-based list`, this uses an array to
      store the elements when implementing the :term:`stack` ADT.

   array-based queue
      Analogous to an :term:`array-based list`, this uses an array to
      store the elements when implementing the :term:`queue` ADT.

   ASCII character coding
      American Standard Code for Information Interchange.
      A commonly used method for encoding characters using a binary code.
      Standard ASCII uses an 8-bit code to represent upper and lower
      case letters, digits, some punctuation, and some number of
      non-printing characters (such as carrage return).
      Now largely replaced by UTF-8 encoding.

   asymptotic algorithm analysis
      A more formal term for :term:`asymptotic analysis`.

   asymptotic analysis
      A method for estimating the efficiency of an algorithm or
      computer program by identifying its :term:`growth rate`.
      Asymptotic analysis also gives a way to
      define the inherent difficulty of a :term:`problem`.
      We frequently use the term :term:`algorithm analysis` to mean
      the same thing.

   average case
      In algorithm analysis, the average of the costs for all problem
      instances of a given input size :math:`n`. If not all problem
      instances have equal probability of occurring, then average case
      must be calculated using a weighted average.

   average seek time
      Expected (average) time to perform a :term:`seek` operation on a
      :term:`disk drive`, assuming that the seek is between two
      randomly selected tracks.
      This is one of two metrics commonly provided by disk drive
      vendors for disk drive performance, with the other being
      :term:`track-to-track seek time`.

   AVL Tree
      A variant implementation for the :term:`BST`, which differs from
      the standard BST in that it uses modified insert and remove
      methods in order to keep the tree
      :term:`balanced <balanced tree>`.
      Similar to a :term:`Splay Tree` in that it uses the concept of
      :term:`rotations <rotation>` in the insert and remove operations.

   B$^+$-tree
      The most commonly implemented form of :term:`B-tree`.
      A B$^+$-tree does not store data at the
      :term:`internal nodes <internal node>`, but
      instead only stores :term:`search key` values as direction
      finders for the purpose of searching through the tree.
      Only the :term:`leaf nodes <leaf node>` store a reference to the
      actual data records.

   B-tree
      A method for :term:`indexing` a large collection of records.
      A B-tree is a :term:`balanced tree` that typically has high
      branching factor (commonly as much as 100
      :term:`children <child>` per :term:`internal node`),
      causing the tree to be very shallow.
      When stored on disk, the node size is selected to be same as the
      desired unit of I/O (so some multiple of the disk :term:`sector`
      size).
      This makes it easy to gain access to the record associated with
      a given :term:`search key` stored in the tree with few
      :term:`disk accesses <disk access>`.
      The most commonly implemented variant of the B-tree is the
      :term:`B$^+$-tree`.

   backing storage
      In the context of a :term:`caching` system or
      :term:`buffer pool`, backing storage is the relatively large but
      slower source of data that needs to be cached.
      For example, in a :term:`virtual memory`, the disk drive would
      be the backing storage.
      In the context of a web browser, the Internet might be
      considered the backing storage.

   BFS
      Abbreviation for :term:`breadth-first search`.

   bag
      In set notation, a bag is a collection of elements with no order
      (like a set), but which allows for duplicate-valued elements
      (unlike a set).

   balanced tree
      A :term:`tree` where the :term:`subtrees <subtree>` meet some
      criteria for being balanced.
      Two possibilities are that the tree is
      :term:`height balanced`, or that the tree has a roughly equal
      number of :term:`nodes <node>` in each subtree.

   base
      Synonym for :term:`radix`.

   base case
      In :term:`recursion` or :term:`proof by induction`, the base case
      is the termination condition.
      This is a simple input or value that can be solved (or proved in
      the case of induction) without resorting to a recursive call
      (or the :term:`induction hypothesis`).

   base class
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a class from which another class :term:`inherits <inherit>`.
      The class that inherits is called a :term:`subclass`.
  
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

   best fit
      In a :term:`memory manager`, best fit is a :term:`heuristic`
      for deciding which :term:`free block` to use when allocating
      memory from a :term:`memory pool`.
      Best fit will always allocate from the smallest
      :term:`free block` that is large enough to service the memory
      request.
      The rationale is that this will be the method that best
      preserves large blocks needed for unusually large requests.
      The disadvantage is that it tends to 
      cause :term:`external fragmentation` in the form of small,
      unuseable memory blocks.

   big-Oh notation
      In algorithm analysis, a shorthand notation for describing the
      upper bound for an algorithm or problem.

   binary search
      A standard :term:`recursive <recursion>` algorithm for finding
      the :term:`record` with a given :term:`search key` value within
      a sorted list.
      It runs in :math:`O(\log n)` time.
      At each step, look at the middle of the current sublist, and throw
      away the half of the records whose keys are either too small or
      too large.
      
   binary search tree
      A binary tree that imposes the following constraint on its node
      values: The :term:`search key` value for any node :math:`A` must
      be greater than the (key) values for all nodes in the left
      :term:`subtree` of :math:`A`, and less than the key values for
      all nodes in the right subtree of :math:`A`.
      Some convention must be adopted if
      multiple nodes with the same key value are permitted,
      typically these are required to be in the right subtree.

   binary search tree property
      The defining relationship between the :term:`key` values for
      :term:`nodes <node>` in a :term:`BST`.
      All nodes stored in the left subtree of a node whose key value
      is :math:`K` have key values less than or equal to :math:`K`.
      All nodes stored in the right subtree of a node whose key value
      is :math:`K` have key values greater than :math:`K`.

   binary tree
      A finite set of nodes which is either empty, or else has a root
      node together two binary trees, called the left and right
      :term:`subtrees <subtree>`, which are :term:`disjoint` from each
      other and from the :term:`root`.

   binary trie
      A :term:`binary tree` whose structure is that of a :term:`trie`.
      Generally this is an implementation for a :term:`search tree`.
      This means that the :term:`search key` values are thought of a
      binary digits, with the digit in the position corresponding to
      this a node's :term:`level` in the tree indicating a left branch
      if it is "0", or a right branch if it is "1".
      Examples include the :term:`Huffman coding tree` and the
      :term:`Bintree`.

   bintree
      A :term:`spatial data structure` in the form of binary
      :term:`trie`, typically used to store point data in two or more
      dimensions.
      Similar to a :term:`PR quadtree` except that at each level, it
      splits one dimension in half.
      Since many leaf nodes of the PR quadtree will contain no data
      points, implementation often makes use of the :term:`Flyweight`
      :term:`design pattern`.

   Binsort
      A sort that works by taking each record and placing it into a
      bin based on its value. The bins are then gathered up in order
      to sort the list. It is generally not practical in this form,
      but it is the conceptual underpinning of the :term:`radix sort`.

   block
      A unit of storage, usually referring to storage on a
      :term:`disk drive` or other :term:`peripheral storage` device.
      A block is the basic unit of I/O for that device.

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

   break-even point
      The point at which two costs become even when measured as the
      function of some variable.
      In particular, used to compare the space requirements of two
      implementations.
      For example, when comparing the space requirements of an
      :term:`array-based list` implementation versus a
      :term:`linked list` implementation, the key issue is how full
      the list is compared to its capacity limit (for the array-based
      list).
      The point where the two representations would have the same
      space cost is the break-even point.
      As the list becomes more full beyond this point, the array-based
      list implementation becomes more space efficent, while as the
      list becomes less full below this point, the linked list
      implementation becomes more space efficient.

   breadth-first search
     A :term:`graph` :term:`traversal` algorithm.
     As the name implies, all immediate :term:`neighbors <neighbor>`
     for a :term:`node` are :term:`visited <visit>` before any
     more-distant nodes are visited. 
     BFS is driven by a :term:`queue`.
     A start vertex is placed on the queue.
     Then, until the queue is empty, a node is taken off the
     queue, visited, and and then any :term:`unvisited` neighbors are
     placed onto the queue.

   BST
      Abbreviation for :term:`binary search tree`.

   bubble sort
      :to-term: algorithm :label: type of

      A simple sort that requires :math:`Theta(n^2)` time in best,
      average, and worst cases.
      Even an optimized version will normally run slower than
      :term:`insertion sort`, so it has little to recommend it.

   bucket sort
      A variation on the :term:`binsort`, where each bin is associated
      with a range of :term:`key` values.
      This will require some method of
      sorting the records placed into each bin.

   buddy method
      In a :term:`memory manager`, an alternative to using a
      :term:`free block list` and a :term:`sequential fit` method to
      seach for a suitable free block to service a
      :term:`memory request`.
      Instead, the memory pool is broken down as needed into smaller
      chunks by splitting it in half repeatedly until the smallest
      power of 2 that is as big or bigger than the size of the memory
      request is reached.
      The name comes from the fact that the binary representation for
      the start of the block positions only differ by one bit for
      adjacent blocks of the same size.
      These are referred to as "buddies" and will be merged together
      if both are free.

   buffer
      A block of memory, most often in :term:`primary storage`.
      The size of a buffer is typically one or a multiple of the basic
      unit of I/O that is read or written on each access to
      :term:`secondary storage` such as a :term:`disk drive`.

   buffer pool
      A collection of one or more :term:`buffers <buffer>`.
      The buffer pool is an example of a :term:`cache <caching>`. 
      It is stored in :term:`primary storage`, and holds data that is
      expected to be used in the near future.
      When a data value is requested, the buffer pool is searched
      first.
      If the value is found in the buffer pool, then
      :term:`secondary storage` need not be accessed.
      If the value is not found in the buffer pool, then it must be
      fetched from secondary storage.
      A number of traditional :term:`heuristics <heuristic>`
      have been developed for deciding which data to :term:`flush`
      from the buffer pool when new data must be stored,
      such as :term:`least recently used`.

   buffering
      A synonym for :term:`caching`.
      More specifically, it refers to an arrangement where all
      accesses to data (such as on a
      :term:`peripheral storage` device) must 
      be done in multiples of some minimum unit of storage.
      On a :term:`disk drive`, this basic or smallest unit of I/O is a
      :term:`sector`.
      It is called "buffering" because the block of data returned by
      such an access is stored in a :term:`buffer`.

   caching
      The concept of keeping selected data in :term:`main memory`.
      The goal is to have in main memory the data values that are
      most likely to be used in the near future.
      An example of a caching technique is the use of a
      :term:`buffer pool`.

   ceiling
      Written :math:`\lceil x \rceil`, for real value :math:`x` the
      ceiling is the least integer :math:`\geq x`.

   child
      In a tree, the set of :math:`nodes` directly pointed to by a node
      :math:`R` are the :term:`children <child>` of :math:`R`.

   circular first fit
      In a :term:`memory manager`, circular first fit is a
      :term:`heuristic` for deciding which :term:`free block` to use
      when allocating memory from a :term:`memory pool`.
      Circular first fit is a minor modification on :term:`first fit`
      memory allocation, where the last free block allocated from is
      remembered, and search for the next suitable free block picks up
      from there.
      Like first fit, it has the advantage that it is typically not
      necessary to look at all free blocks on the free block list to
      find a suitable free block.
      And it has the advantage over first fit that it spreads out
      memory allocations evenly across the :term:`free block list`.
      This might help to minimize :term:`external fragmentation`.

   circular list
      A :term:`list` ADT implementation variant where the last element
      of the list provides access to the first element of the list.

   class
      In the :term:`object-oriented programming paradigm`
      an ADT and its implementation together make up a class. 

   class hierarchy
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a set of classes and their interrelationships.
      One of the classes is the :term:`base class`, and the others are
      :term:`subclasses <subclass>` that :term:`inherit` either
      directly or indirectly from the base class.

   client
      The user of a service.
      For example, the object or part of the program that calls a
      :term:`memory manager` class is the client of that memory
      manager.
      Likewise the class or code that calls a :term:`buffer pool`.

   clique
      In :term:`graph` terminology, a clique is any :term:`subset`
      :math:`U` of the graph's :term:`vertices <vertex>` such that
      every vertex in :math:`U` has an :term:`edge` to every other
      vertex in :math:`U`.
      The size of the clique is the number of vertices in the clique.

   closed-form solution
      An algebraic equation with the same value as a :term:`summation`
      or :term:`recurrence relation`.
      The process of replacing the summation or
      recurrence with its closed-form solution is known as solving the
      summation or recurrence.

   closed hash system
      A :term:`hash system` where all records are stored in slots of
      the :term:`hash table`.
      This is in contrast to an :term:`open hash system`.

   collision
      In a :term:`hash system`, this refers to the case where two
      search :term:`keys <key>` are mapped by the
      :term:`hash function` to the same 
      slot in the :term:`hash table`.
      This can happen on insertion or search when another record has
      already been hashed to that slot.
      In this case, a :term:`closed hash system` will require a
      process known as :term:`collision resolution` to find the
      location of the desired record.

   collision resolution
      In a :term:`closed hash system`, this is the process of finding
      the proper position in a :term:`hash table` that contains the
      desired record if the :term:`hash function` did not return the
      correct position for that record due to a :term:`collision` with
      another record.

   comparable
      The concept that two objects can be compared to determine if they
      are equal or not, or to determine which one is greater than the
      other. 
      In set notation, elements :math:`x` and :math:`y` of a set are
      comparable under a given relation :math:`R` if either
      :math:`xRy` or :math:`yRx`.
      To be reliably compared for a greater/lesser relationship,
      the values being compared must belong to a :term:`total order`.
      In programming, the property of a data type such that two
      elements of the type can be compared to determine if they the
      same (a weaker version), or which of the two is larger (a
      stronger version).
      ``Comparable`` is also the name of an interface in Java that
      asserts a comparable relationship between objects with a class,
      and ``.compareTo()`` is the ``Comparable`` interface method that
      implements the actual comparison between two objects of the class.

   comparator
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

   comparison
      The act of comparing two :term:`keys <key>` or
      :term:`records <record>`.
      For many :term:`data types <data type>`, a comparison has
      constant time cost.
      The number of comparisons required is often used as a
      :term:`measure of cost` for sorting and searching algorithms.

   complete binary tree
      A binary tree where the nodes are filled in row by row, with the
      bottom row filled in left to right.
      Due to this requirement, there is only one tree of :math:`n`
      nodes for any value of :math:`n`.
      Since storing the records in an array in row order leads to a
      simple mapping from a node's position in the array to its
      :term:`parent`, :term:`siblings <sibling>`, and
      :term:`children <child>`, the array representation is most 
      commonly used to implement the complete binary tree.
      The :term:`heap` data structure is a complete binary tree with
      partial ordering constraints on the node values.

   complete graph
      A :term:`graph` where every :term:`vertex` connects to every
      other vertex.

   Composite design pattern
      Given a class hierarchy representing a set of objects, and a
      container for a collection of objects, the composite
      :term:`design pattern` addresses the relationship between the
      object hierarchy and a bunch of behaviors on the objects.
      In the composite design, each object is required to implement
      the collection of behaviors.
      This is in contrast to the procedural approach where a behavior
      (such as a tree :term:`traversal`) is implemented as a
      method on  the object collection (such as a :term:`tree`).
      Procedural tree traversal requires that the tree have a method
      that understands what to do when it encounters any of the object
      types (:term:`internal <internal node>` or
      :term:`leaf nodes <leaf node>`) that the tree might contain.
      The composite approach would have the tree call the "traversal"
      method on its root node, which then knows how to perform the
      "traversal" behavior.
      This might in turn require invoking the traversal method of
      other objects (in this case, the children of the root).

   composite type
      A type whose :term:`members <member>` have subparts.
      For example, a typical database record.
      Another term for this is :term:`aggregate type`.

   computability
      A branch of computer science that deals with the theory of
      solving problems through computation.
      More specificially, it deals with the limits to what problems
      (functions) are computable.
      An example of a famous problem that cannot in principle be
      solved by a computer is the :term:`halting problem`.

   computational complexity theory
      A branch of the theory of computation in theoretical computer
      science and mathematics that focuses on classifying
      computational problems according to their inherent difficulty,
      and relating those classes to each other.
      An example is the study of :term:`NP Complete` problems.

   connected component
      In an :term:`undirected graph`, a :term:`subset` of the
      :term:`nodes <node>` such that each node in the subset can be
      reached from any other node in that subset.

   connected graph
      An :term:`undirected graph` is a connected graph if there is at
      least one path from any :term:`vertex` to any other.

   constant running time
      The cost of a function whose running time is not related to its
      input size.
      In Theta notation, this is traditionally written as
      :math:`\Theta(1)`.

   container
   container class
      A :term:`data structure` that stores a collection of
      :term:`records <record>`.
      Typical examples are arrays,
      :term:`search trees <search tree>`, and
      :term:`hash tables <hash table>`.

   cost
      The amount of resources that the solution consumes.

   CPU
      Acronym for Central Processing Unit, the primary processing
      device for a computer.

   current position
      A property of some list ADTs, where there is maintained a
      "current position" state that can be referred to later.

   cycle
      In :term:`graph` terminology,
      a :term:`cycle` is a :term:`path` of length three or more that
      connects some :term:`vertex` :math:`v_1` to itself.

   DAG
      Abbreviation for :term:`directed acyclic graph`.

   data item
      A piece of information or a record whose value is drawn from a type.

   data member
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
      the algorithms behavior.
      Decision trees can be used in
      :term:`lower bounds proofs <lower bounds proof>`,
      such as the proof that sorting requires
      :math:`\Omega(n \log n)` comparisons in the worst case.

   degree
      In :term:`graph` terminology, the degree for a :term:`vertex` is
      its number of :term:`neighbors <neighbor>`.
      In :term:`tree` terminology, the degree for a :term:`node` is
      its number of :term:`children <child>`.

   dense graph
      A :term:`graph` where the actual number of :term:`edges <edge>`
      is a large fraction of the possible number of edges.
      Generally, this is interpreted to mean that the :term:`degree`
      for any :term:`vertex` in the graph is relatively high.

   depth
     The depth of a node :math:`M` in a tree is the length
     of the path from the root of the tree to :math:`M`.

   depth-first search
     A :term:`graph` :term:`traversal` algorithm.
     Whenever a :math:`v` is :term:`visited <visit>` during the
     traversal, DFS will :term:`recursively <recursion>` visit all of
     :math:`v` 's :term:`unvisited` :term:`neighbors <neighbor>`.

   depth-first search tree
      A :term:`tree` that can be defined by the operation of a
      :term:`depth-first search` (DFS) on a :term:`graph`.
      This tree would consist of the :term:`nodes <node>` of the graph
      and a subset of the :term:`edges <edge>` of the graph that was
      followed during the DFS.

   dequeue
      A specialized term used to indicate removing an element from a queue.

   descendant
      In a tree, the set of all nodes that have a node :math:`A` as an
      :term:`ancestor` are the descendants of :math:`A`.
      In other words, all of the nodes that can be reached from
      :math:`A` by progressing downwards in tree.
      Another way to say it is: The
      :term:`children <child>` of :math:`A`, their children, and so
      on.

   design pattern
      An a bstractions for describing the design of programs |---|
      that is, the interactions of objects and classes.
      Experienced software designers learn and reuse patterns
      for combining software components, and design patterns allow
      this design knowledge to be passed on to new programmers more quickly.

   deterministic algorithm
      An algorithm that does not involve any element of randomness,
      and so its behavior on a given input will always be the same.
      This is in contrast to a :term:`randomized algorithm`.

   DFS
      Abbreviation for :term:`depth-first search`.

   dictionary
      An abstract data type or interface for a data structure or
      software subsystem that supports insertion, search, and deletion
      of records.

   digraph
      Abbreviation for :term:`directed graph`.

   Dijkstra's algorithm
      An algorithm to solve the
      :term:`single-source shortest paths problem` in a :term:`graph`.
      This is a :term:`greedy algorithm`.
      It is nearly identical to :term:`Prim's algorithm` for finding a 
      :term:`minimal-cost spanning tree`, with the only difference
      being the calculation done to update the best-known distance.

   diminishing increment sort
      Another name for :term:`Shellsort`.

   direct proof
      In general, a direct proof is just a "logical explanation".
      A direct proof is sometimes referred to as an argument by deduction.
      This is simply an argument in terms of logic.
      Often written in English with words such as "if ... then",
      it could also be written with logic notation such as
      :math:`P \Rightarrow Q`.

   directed acyclic graph
      :to-term: DAG :label: abbreviation

      A :term:`graph` with no cycles.
      Abbreviated as :term:`DAG`.
      Note that a DAG is not necessarily a :term:`tree` since a given
      :term:`node` might have multiple :term:`parents <parent>`.

   directed graph
      :to-term: directed acyclic graph :label: types
      :to-term: digraph :label: abbreviation

      A :term:`graph` whose :term:`edges <edge>` each are directed
      from one of its defining :term:`vertices <vertex>` to the
      other.

   dirty bit
      Within a :term:`buffer pool`, a piece of information associated
      with each :term:`buffer` that indicates whether the contents of
      the buffer have changed since being read in from
      :term:`backing storage`.
      When the buffer is :term:`flushed <flush>` from the buffer pool,
      the buffer's contents must be written to the backing storage if
      the dirty bit is set (that is, if the contents have changed).
      This means that a relatively expensive write operation is
      required.
      In contrast, if the dirty bit is not set, then it is unnecessary
      to write the contents to backing storage, thus saving time over
      not keeping track of whether the contents have changed or not.

   discriminator
      A part of a :term:`multi-dimensional search key`.
      Certain tree data structures such as the :term:`bintree` and the
      :term:`kd tree` operate by making branching decisions at nodes
      of the tree based on a single attribute of the multi-dimensional
      key, with the attribute determined by the level of the node in
      the tree.
      For example, in 2 dimensions, nodes at the odd levels in the
      tree might branch based on the :math:`x` value of a coordinate,
      while at the even levels the tree would branch based on the
      :math:`y` value of the coordinate.
      Thus, the :math:`x` coordinate is the discriminator for the odd
      levels, while the :math:`y` coordinate is the discriminator for
      the even levels.

   disjoint
      Two parts of a :term:`data structure` or two
      collections with no objects in common are disjoint.
      This term is often used in conjunction with a data structure
      that has :term:`nodes <node>` (such as a :term:`tree`).
      Also used in the context of :term:`sets <set>`, where two
      :term:`subsets <subset>` are disjoint if they share no elements.

   disjoint sets
      A collection of :term:`sets <set>`, any pair of which share no
      elements in common.
      A collection of disjoint sets partitions some objects
      such that every object is in exactly one of the disjoint sets.

   disk-based space/time tradeoff
      In contrast to the standard :term:`space/time tradeoff`, this
      principle states that the smaller you can make your disk storage
      requirements, the faster your program will run.
      This is because the time to read information from disk is
      enormous compared to computation time, so almost any amount of
      additional computation needed to unpack the data is going to be
      less than the disk-reading time saved by reducing the storage
      requirements.

   disk drive
      An example of term:`peripheral storage` or
      :term:`secondary storage`.
      Data access times are typically measured in thousandths of a
      second (milliseconds), which
      is roughly a million times slower than access times for
      :term:`RAM`, which is an example of a :term:`primary storage`
      device.
      Reads from and writes to a disk drive are always done in terms
      of some minimum size, which is typically called a
      :term:`block`.
      The block size is 512 bytes on most disk drives.
      Disk drives and RAM are typical parts of a computer's
      :term:`memory hierarchy`.

   disk access
      The act of reading data from a disk drive (or other form of
      :term:`peripheral storage`).
      The number of times data must be read from (or written to) a
      disk is often a good measure of cost for an algorithm that
      involves disk I/O, since this is usually the dominant cost.

   disk I/O
      Refers to the act of reading data from or writing data to a
      :term:`disk drive`.
      All disk reads and writes are done in units of a :term:`sector`
      or :term:`block`.

   distance
      In :term:`graph` representations, a synonym for :term:`weight`.

   divide and conquer
      A technique for designing algorithms where a solution is found
      by breaking the problem into smaller (similar) subproblems,
      solving the subproblems, then combining the subproblem solutions
      to form the solution to the original problem.
      This process is often implemented using :term:`recursion`.
   
   domain
      The set of possible inputs to a function.

   double buffering
      The idea of using multiple :term:`buffers <buffer>` to allow the
      :term:`CPU` to operate in parallel with a
      :term:`peripheral storage` device.
      Once the first buffer's worth of data has been read in, the CPU
      can process this while the next block of data is being
      read from the peripheral storage.
      For this idea to work, the next block of data to be processed
      must be known or predicted with reasonable accuracy.

   doubly linked list
      A :term:`linked list` implementation variant where each list
      node contains access pointers to both the previous element and
      the next element on the list.

   DSA
      Abbreviation for Data Structures and Algorithms.

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

   dynamic programming
      An approach to designing algorithms that works by storing a table
      of results for subproblems.
      A typical cause for excessive cost in
      :term:`recursive <recursion>` 
      algorithms is that different branches of the recursion might
      solve the same subproblem.
      Dynamic programming uses a table to store information about
      which subproblems have already been solved, and uses the stored
      information to immediately give the answer for any repeated
      attempts to solve that subproblem.

   edge
      The connection that links two :term:`nodes <node>` in a
      :term:`tree`, :term:`linked list`, or :term:`graph`.

   efficient
      A solution is said to be efficient
      if it solves the problem within the required
      :term:`resource constraints`.
      A solution is sometimes said to be
      efficient if it requires fewer resources than known
      alternatives, regardless of whether it meets any particular
      requirements.

   element
      One value or member in a set.

   empirical comparison
      An approach to comparing to things by actually seeing how they
      perform.
      Most typically, we are referring to the comparison of two
      programs by running each on a suite of test data and measuring
      the actual running times.
      Empirical comparison is subject to many possible complications,
      including unfair selection of test data, and inaccuracies in the
      time measurements due to variations in the computing environment
      between various executions of the programs.

   empty
      For a :term:`container` class, the state of containing no
      :term:`elements <element>`.

   encapsulation
      In programming, the concept of hiding implementation details
      from the user of an ADT, and protecting
      :term:`data members <data member>` of an
      object from outside access.

   enqueue
      A specialized term used to indicate inserting an element onto a queue.

   entry-sequenced file
      A file that stores records in the order that they were added to
      the file.

   enumeration
      The process by which a :term:`traversal` lists every object in
      the :term:`container` exactly once.
      Thus, a traversal that prints the :term:`nodes <node>` is said
      to enumerate the nodes.
      An enumeration can also refer to the actual listing that is
      produced by the traversal 
      (as well as the process that created that listing).

   equivalence class
      An :term:`equivalence relation` can be used to partition a set
      into equivalence classes.

   equivalence relation
      Relation :math:`R` is an equivalence relation on set
      :math:`\mathbf{S}` if it is :term:`reflexive`,
      :term:`symmetric`, and :term:`transitive`.

   estimation
      As a technical skill, this is the process of generating a rough
      estimate in order to evaluate the feasibility of a proposed
      solution.
      This is sometimes known as "back of the napkin" or
      "back of the envelope" calculation.
      The estimation process can be formalized as (1) determine the
      major parameters that affect the problem, (2) derive an equation
      that relates the parameters to the problem, then (3) select
      values for the parameters and apply the equation to yield an
      estimated solution.

   exact-match query
      Records are accessed by unique identifier.

   exchange
      A swap of adjacent records in an array.

   exchange sort
      A sort that relies solely on exchanges (swaps of adjacent
      records) to reorder the list.
      :term:`Insertion Sort <insertion sort>` and
      :term:`Bubble Sort` are examples of exchange sorts.
      All exchange sorts require
      :math:`\Theta(n^2)` time in the worst case.

   exponential growth rate
      A growth rate function where :math:`n` (the input size) appears
      in the exponent. For example, :math:`2^n`.

   expression tree
      A :term:`tree` structure meant to represent a mathematical expression.
      :term:`Internal nodes <internal node>` of the expression tree
      are operators in the expression, with the subtrees being the
      sub-expressions that are its operand.
      All :term:`leaf nodes <leaf node>` are operands.

   external fragmentation
      A condition that arises when a series of
      :term:`memory requests <memory request>`
      result in lots of small :term:`free blocks <free block>`, no one
      of which is useful for servicing typical requests.

   external sort
      A sorting algorithm that is applied to data stored in
      :term:`peripheral storage` such as on a :term:`disk drive`.
      This is in contrast to an :term:`internal sort` that works on
      data stored in :term:`main memory`.

   factorial
      The factorial function is defined as :math:`f(n) = n f(n-1)` for
      :math:`n > 0`.

   failure policy
      In a :term:`memory manager`, a failure policy is the response
      that takes place when there is no way to satisfy a
      :term:`memory request` from the current
      :term:`free blocks <free block>` in the :term:`memory pool`.
      Possibilities include rejecting the request, expanding the
      memory pool, collecting :term:`garbage`, and reorganizing the
      memory pool (to collect together free space).

   file processing
      The domain with Computer Science that deals with processing data
      stored on a :term:`disk drive` (in a file), or more broadly,
      dealing with data stored on any :term:`peripheral storage`
      device.
      Two fundamental properties make dealing with data on a
      peripheral device different from dealing with data in main
      memory:
      (1) Reading/writing data on a peripheral storage device is far
      slower than reading/writing data to main memory (for example, a
      typical disk drive is about a million times slower than
      :term:`RAM`).
      (2) All I/O to a peripheral device is typically in terms of a
      :term:`block` of data (for example, nearly all disk drives do
      all I/O in terms of blocks of 512 bytes).

   file structure
      The organization of data on :term:`peripheral storage`,
      such as a :term:`disk drive` or DVD drive.

   FIFO
      Abbreviation for "first-in, first-out".
      This is the access paradigm for a :term:`queue`,
      and an old terminolgy for the queue is "FIFO list".

   FIND
      One half of the :term:`UNION/FIND` algorithm for managing
      :term:`disjoint sets`.
      It is the process of moving upwards in a
      tree to find the tree's root.

   first fit
      In a :term:`memory manager`, first fit is a :term:`heuristic`
      for deciding which :term:`free block` to use when allocating
      memory from a :term:`memory pool`.
      First fit will always allocate the first :term:`free block` on
      the :term:`free block list` that is large enough to service the
      memory request.
      The advantage of this approach is that it is typically not
      necessary to look at all free blocks on the free block list to
      find a suitable free block.
      The disadvantage is that it is not "intelligently" selecting
      what might be a better choice of free block.

   fixed-length coding
      Given a collection of objects, a fixed-length coding scheme
      assigns a code to each object in the collection using codes that
      are all of the same length.
      Standard ASCII and Unicode representations for characters are
      both examples of fixed-length coding schemes.
      This is in contrast to :term:`variable-length coding`.

   floor
      Written :math:`\lfloor x \rfloor`, for real value :math:`x` the
      floor is the greatest integer :math:`\leq x`.

   flush
      The act of removing data from a :term:`cache <caching>`, most
      typically because other data considered of higher future value
      must replace it in the cache.
      If the data being flushed has been modified since it was first
      read in from :term:`secondary storage` (and the changes are
      meant to be saved), then it must be written back to that
      secondary storage.

   Floyd's algorithm
      An algorithm to solve the
      :term:`all-pairs shortest paths problem`.
      It uses the :term:`dynamic programming` algorithmic technique,
      and runs in :math:`\Theta(n^3)` time.
      As with any dynamic programming algorithm, the key issue is to
      avoid duplicating work through proper bookkeeping on the
      solution space.
      The basic idea is to first find all the direct edge costs, then
      improving those costs by allowing paths through :term:`vertex`
      0, then the cheapest paths involving paths going through
      vertices 0 and 1, and so on.

   flush
      The the context of a :term:`buffer pool`, the process of
      removing the contents stored in a :term:`buffer`
      when that buffer is required in order to store new data.
      If the buffer's contents have been changed since having been
      read in from :term:`backing storage` (this fact would
      normally be tracked by using a :term:`dirty bit`),
      then they must be copied back to the backing storage before the
      buffer can be reused.

   Flyweight
      A :term:`design pattern` that is meant to solve the following
      problem:
      You have an application with many objects.
      Some of these objects are identical in the information that
      they contain, and the role that they play.
      But they must be reached from various places, and conceptually they
      really are distinct objects.
      Because there is so much duplication of the same information,
      we want to reduce memory cost by sharing that space. 
      For example, in document layout, 
      the letter "C" might be represented by an object that
      describes that character's strokes and bounding box.
      However, we do not want to create a separate "C" object everywhere
      in the document that a "C" appears.
      The solution is to allocate a single copy of the shared representation
      for "C" objects.
      Then, every place in the document that needs a "C" in a given font,
      size, and typeface will reference this single copy.
      The various instances of references to a specific form of "C" are
      called flyweights.
      Flyweights can also used to advantage in the implementation of the
      :term:`bintree` and :term:`PR quadtree`.

   free block
      A block of unused space in a :term:`memory pool`.

   free block list
      In a :term:`memory manager`, the list that stores the necessary
      information about the current :term:`free blocks <free block>`.
      Generally, this is done with some sort of :term:`linked list`,
      where each node of the linked list indicates the start position
      and length of the free block in the :term:`memory pool`.

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
      Typically implemented as a :term:`linked stack`, released
      objects are put on the front of the freelist.
      When a request is made to allocate an object, the freelist is
      checked first and it provides the object if possible.
      If the freelist is empty, then a new object is allocated from
      :term:`free store`.

   free tree
      A connected, undirected graph with no simple cycles.
      An equivalent definition is that a free tree is connected and
      has :math:`|\mathbf{V}| - 1` edges.

   frequency count
      A :term:`heuristic` used to maintain a
      :term:`self-organizing list`.
      Under this heuristic, a count is maintained for every record.
      When a record access is made, its count is increased.
      If this makes its count greater than that of another record in
      the list, it moves up toward the front of the list accordingly
      so as to keep the list sorted by frequency.
      Analogous to the :term:`least frequently used` heuristic for
      maintaining a :term:`buffer pool`.
      

   full binary tree theorem
      This theorem states that 
      the number of leaves in a non-empty full binary tree is one
      more than the number of internal nodes.
      Equivalently, then number of null pointers in a standard
      :term:`pointer-based implementation for binary tree nodes`
      is one more than the number of nodes in the binary tree.

   full tree
      A :term:`binary tree` is full if every :term:`node` is either a
      :term:`leaf node` or else it is an :term:`internal node` with
      two non-empty :term:`children <child>`.

   function
      In mathematics, a matching between inputs (the :term:`domain`)
      and outputs (the :term:`range`).
      In programming, a subroutine that takes input parameters and
      uses them to compute and return a value.
      In this case, it is usually considered bad practice for a
      function to change any global variables
      (doing so is called a side effect).

   garbage
      In :term:`memory management <memory manager>`,
      any memory that was previously (dynamically)
      allocated by the program during runtime, but which is no longer
      accessible since all pointers to the memory have been deleted or
      overwritten.
      In some languages, garbage can be recovered by
      :term:`garbage collection`.
      In languages such as C and C++ that do not support garbage
      collection, so creating garbage is considered a
      :term:`memory leak`.

   garbage collection
      Languages with garbage collection such
      Java, JavaScript, Lisp, and Scheme will periodically reclaim
      :term:`garbage` and return it to :term:`free store`.

   general tree
      A tree in which any given node can have any number of
      :term:`children <child>`.
      This is in contrast to, for example, a :term:`binary tree` where
      each node has a fixed number of children (some of which might be
      ``null``).
      General tree nodes tend to be harder to implement for this reason.

   graph
      :to-term: edges <edge> :label: contains
      :to-term: vertices <vertex> :label: contains
      :to-term: adjacency matrix :label: implemented by
      :to-term: adjacency list :label: implemented by
      :to-term: minimal-cost spanning tree :label: problems
      :to-term: traversal :label: problems
      :to-term: topological sort :label: problems
      :to-term: shortest paths :label: problems
      :to-term: dense :label: types
      :to-term: sparse graph :label: types
      :to-term: directed graph :label: types
      :to-term: acyclic graph :label: types
      :to-term: labeled graph :label: types
      :to-term: undirected graph :label: types
      :to-term: weighted graph :label: types
      :to-term: unweighted graph :label: types

      A :term:`graph` :math:`\mathbf{G} = (\mathbf{V}, \mathbf{E})`
      consists of a set of :term:`vertices <vertex>`
      :math:`\mathbf{V}` and a set of :term:`edges <edge>`
      :math:`\mathbf{E}`, such that each edge in :math:`\mathbf{E}` is
      a connection between a pair of vertices in :math:`\mathbf{V}`.

   greedy algorithm
      An algorithm that makes locally optimal choices at each step.

   growth rate
      The rate at which the cost
      of the algorithm grows as the size of its input grows.

   halting problem
      The halting problem is to answer this question:
      Given a computer program :math:`P` and an 
      input :math:`I`, will program :math:`P` halt when executed on
      input :math:`I`?
      This problem has been proved impossible to solve in the general
      case.

   handle
      When using a :term:`memory manager` to store data, the
      :term:`client` will pass data to be stored
      (the :term:`message`) to the memory manager, and the memory
      manager will return to the client a handle.
      The handle encodes the necessary information that the memory
      manager can later use to recover and return the message to the
      client.
      This is typically the location and length of the message within
      the :term:`memory pool`.

   harmonic series
      The sum of reciprocals from 1 to :math:`n` is called the
      Harmonic Series, and is written :math:`{\cal H}_n`.
      This sum has a value between :math:`\log_e n` and
      :math:`\log_e n + 1`. 

   hash function
      In a :term:`hash system`, the function that converts a
      :term:`key` value to a position in the :term:`hash table`.
      The hope is that this position in the hash table contains the
      record that matches the key value.

   hash system
      The implementation for search based on hash lookup in a
      :term:`hash table`.
      The :term:`search key` is processed by a
      :term:`hash function`, which returns a position in a
      :term:`hash table`, which hopefully is the correct position in
      which to find the record corresponding to the search key.

   hash table
      The data structure (usually an array) that stores data
      records for lookup using :term:`hashing`.

   hashing
      A search method that uses a :term:`hash function` to convert a
      :term:`search key` value into a position within a
      :term:`hash table`. 
      In a properly implemented :term:`hash system`, that position in
      the table will have high probability of containing the record
      that matches the key value.
      Sometimes, the hash function will return an position that does
      not store the desired key, due to a process called
      :term:`collision`.
      In that case, the desired record is found through a process
      known as :term:`collision resolution`.

   head
      The beginning of a :term:`list`.

   header node
      Commonly used in implementations for a :term:`linked list` or
      related structure, this :term:`node` preceeds the first element
      of the list.
      Its purpose is to simplify the code implementation by
      reducing the number of special cases that must be programmed
      for.

   heap
      This term has two different meanings.
      Uncommonly, it is a synonym for :term:`free store`.
      Most often it is used to refer to a particular data structure.
      This data structure is a :term:`complete binary tree` with the
      requirement that every :term:`node` has a value greater than its
      :term:`children <child>` (called a :term:`max heap`), or else
      the requirement that every node has a value less than its
      children (called a :term:`min heap`).
      Since it is a complete binary tree, a heap is nearly always
      implemented using an array rather than an explicit tree
      structure.
      To add a new value to a heap, or to remove the extreme value
      (the max value in a max-heap or min value in a min-heap) and
      update the heap,
      takes :math:`\Theta(\log n)` time in the worst case.
      However, if given all of the values in an unordered array,
      the values can be re-arranged to form a heap in only
      :math:`\Theta(n)` time. 
      Due to its space and time efficiency, the heap is a
      popular choice for implementing a :term:`priority queue`.

   Heapsort
      A sorting algorithm that costs :math:`\Theta(n \log n)` time in
      the best, average, and worst cases.
      It tends to be slower than :term:`Mergesort` and
      :term:`Quicksort`.
      It works by building a :term:`max heap`, and
      then repeatedly removing the item with maximum :term:`key` value
      (moving it to the end of the heap) until all elements have been
      removed (and replaced at their proper location in the array).

   height
      The height of a tree is one more than the :term:`depth` of the
      deepest :term:`node` in the tree.

   height balanced
      The condition the :term:`depths <depth>` of each :term:`subtree`
      in a tree are roughly the same.

   heuristic
      A way to solve a problem that is not guarenteed to be optimal.
      While it might not be guarenteed to be optimal, it is generally
      expected (by the agent employing the heuristic) to provide a
      reasonably efficient solution.

   homogeneity
      In a :term:`container` class, this is the property that all
      objects stored in the container are of the same class.
      For example, if you have a list intended to store Payroll
      records, is it possible for the programmer to insert an integer
      onto the list instead?

   Huffman coding tree
      A Huffman coding tree is a :term:`full binary tree <full tree>`
      that is used to represent letters (or other symbols)
      efficiently.
      Each letter is associated with a node in the tree, and is then
      given a :term:`Huffman code <Huffman codes>` based on the
      position of the associated node.
      A Huffman coding tree is an example of a binary :term:`trie`.

   Huffman codes
      The codes given to a collection of letters (or other symbols)
      through the process of Huffman coding.
      Huffman coding uses a :term:`Huffman coding tree` to generate
      the codes.
      The codes can be of variable length, such that the letters which
      are expected to appear most frequently are shorter.
      Huffman coding is optimal whenever the true frequencies are
      known, and the frequency of a letter is independent of the
      context of that letter in the message.

   Huffman tree
      Shorter form of the term :term:`Huffman coding tree`.

   image space decomposition
      A from of :term:`key space decomposition` where the
      :term:`key space` splitting points is predetermined (typically
      by splitting in half).
      For example, a :term:`Huffman coding tree` splits the letters
      being coded into those with codes that start with 0 on the left
      side, and those with codes that start with 1 on the right side.
      This regular decomposition of the key space is the basis for a
      :term:`trie` data structure.
      An image space decomposition is in opposition to an
      :term:`object space decomposition`.

   incident
      In :term:`graph` terminology, a synonym for :term:`adjacent`.

   index file
      A file whose records consist of
      :term:`key-value pairs <key-value pair>` where the
      pointers are referencing the complete records stored in another
      file.

   indexing
      The process of associating a :term:`search key` with the
      location of a corresponding data record.
      The two defining points to the concept of an index is the
      association of a key with a record, and the fact that the index
      does not actually store the record itself but rather it stores a
      :term:`reference` to the record.
      In this way, a collection of records can be supported by
      multiple indices, typically a separate index for each key field
      in the record.

   induction hypothesis
      The key assumption used in a :term:`proof by induction`,
      that the theorem to be proved holds for smaller instances of the
      theorem.
      The induction hypothesis is equivalent to the
      :term:`recursive <recursion>` 
      call in a recursive function.

   induction step
      Part of a :term:`proof by induction`.
      In its simplest form, this is a proof of the implication that if
      the theorem holds for $n-1$, then it holds for $n$.
      As an alternative, see :term:`strong induction`.

   induction variable
      The variable used to parameterize the theorem being proved by
      induction.
      For example, if we seek to prove that the sum of the integers
      from 1 to $n$ is $n(n+1)/2$, then $n$ is the induction
      variable.
      An induction variable must be an integer.

   inherit
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      the process by which a :term:`subclass` gains
      :term:`data members <data member>` and :term:`methods <method>`
      from a :term:`base class`.

   inorder traversal
      In a :term:`binary tree`, a :term:`traversal` that first
      :term:`recursively <recursion>` :term:`visits <visit>` the left
      :term:`child`, then visits the :term:`root`,
      an then recursively visits the right child.
      In a :term:`binary search tree`, this traversal will
      :term:`enumerate <enumeration>` the nodes in sorted order.

   Insertion Sort
      A sorting algorithm with :math:`\Theta(n^2)` average and worst
      case cost, and :math:`Theta(n)` best case cost.
      This best-case cost makes it useful when we have reason to
      expect the input to be nearly sorted.

   instance
      A specific selection of values for the parameters to a problem.
      In other words, a specific set of inputs to a problem.


   internal fragmentation
      A condition that occurs when more than :math:`m` bytes
      are allocated to service a :term:`memory request` for :math:`m`
      bytes, wasting free storage.
      This is often done to simplify
      :term:`memory management <memory manager>`.

   internal node
      In a tree, any node that has at least one non-empty
      :term:`child` is an  internal node.

   internal sort
      A sorting algorithm that is applied to data stored in
      :term:`main memory`.
      This is in contrast to an :term:`external sort` that is meant to
      work on data stored in 
      :term:`peripheral storage` such as on a :term:`disk drive`.

   inversion
      A measure of how disordered a series of values is. For each
      element :math:`X` in the series, count one inversion for each
      element to left of :math:`X` that is greater than the value of
      :math:`X` (and so must ultimately be moved to the right of
      :math:`X` during a sorting process).

   inverted list
      An :term:`index <indexing>` which links
      :term:`secondary keys <secondary key>` to either the associated
      :term:`primary key` or the actual record in the database.

   inverted file
      Synonym for :term:`inverted list` when the inverted list is
      stored in a disk file.

   I/O head
      On a :term:`disk drive` (or similar device), the part of the
      machinery that actually reads data from the disk.

   irreflexive
      In set notation, binary relation :math:`R` on set :math:`S` is
      irreflexive if :math:`aRa` is never in the relation for
      any :math:`a \in \mathbf{S}`.

   ISAM
      Indexed Sequential Access Method: an obsolete method for
      indexing data for (at the time) fast retrieval. More generally,
      the term is used also to generically refer to an
      :term:`index <indexing>` that supports both sequential and
      :term:`keyed <key>` access to data records.
      Today, that would nearly always be implemented using a
      :term:`B-Tree`.

   iterator
      In a :term:`container` such as a List, a separate class that
      indicates position within the container, with support for
      :term:`traversing <traversal>` through all
      :term:`elements <element>` in the container.

   job
      Common name for processes or tasks to be run by an operating
      system.
      They typically need to be processed in order of
      importance, and so are kept organized by a
      :term:`priority queue`.
      Another common use for this term is for a collection of tasks to
      be ordered by a :term:`topological sort`.

   K-ary tree
      A type of :term:`full tree` where every internal node has
      exactly :math:`K` :term:`children <child>`.

   kd tree
      A :term:`spatial data structure` that uses a binary tree to
      store a collection of data records based on their (point)
      location in space.
      It uses the concept of a :term:`discriminator` at each level to
      decide which single component of the
      :term:`multi-dimensional search key` to branch on at that level.
      It uses a :term:`key space decomposition`, meaning that all data
      records in the left subtree of a node have a value on the
      corresponding discriminator that is less than that of the node,
      while all data records in the right subtree have a greater
      value.
      The :term:`bintree` is the :term:`image space decomposition`
      analog of the kd tree.

   key
      A field or part of a larger record used to represent that record
      for the purpose of searching or comparing.
      Another term for :term:`search key`.

   key sort
      Any sorting opertation applied to a collection of
      :term:`key-value pairs <key-value pair>` where the value in this
      case is a reference to a complete record (that is, a pointer to
      the record in memory or a position for a record on disk).
      This is in contrast to a sorting operation that works directly
      on a collection of records.
      The intention is that the collection of key-value pairs is far
      smaller than the collection of records themselves.
      As such, this might allow for an :term:`internal sort` when
      sorting the records directly would require an :term:`external
      sort`.
      The collection of key-value pairs can also act as an
      :term:`index <indexing>`.

   key-value pair
      A standard solution for solving the problem of how to relate a
      :term:`key` value to a record (or how to find the key for a
      given record) within the context of a particular
      :term:`index <indexing>`.
      The idea is to simply store as records in the index pairs of
      keys and records.
      Specifically, the index will typically store a copy of the key
      along with a reference to the record.
      The other standard solution to this problem is to pass a
      :term:`comparator` function to the index.

   key space
      The range of values that a :term:`key` value may take on.

   key space decomposition
      The idea that the range for a :term:`search key` will be split
      into pieces.
      There are two general approaches to this:
      :term:`object space decomposition` and
      :term:`image space decomposition`.

   Kruskal's algorithm
      :to-term: UNION/FIND :label: uses

      An algorithm for computing the :term:`MCST` of a
      :term:`graph`.
      During processing, it makes use of the :term:`UNION/FIND`
      process to efficiently determine of two vertices are within the
      same :term:`subgraph`.

   LFU
      Abbreviation for :term:`least frequently used`.

   LIFO
      Abbreviation for "Last-In, First-Out".
      This is the access paradigm for a :term:`stack`,
      and an old terminolgy for the stack is "LIFO list".

   LRU
      Abbreviation for :term:`least recently used`.

   labeled graph
      A :term:`graph` with labels associated with the
      :term:`nodes <node>`.

   leaf node
      In a :term:`binary tree`, leaf node is any node that has two
      empty :term:`children <child>`.
      (Note that a binary tree is defined so that every
      node has two children, and that is why the leaf node has to have
      two empty children, rather than no children.)
      In a general tree, any node is a leaf node if it has no children.

   least frequently used
       Abbreviated :term:`LFU`, it is a :term:`heuristic` that can be
       used to decide which :term:`buffer` in a :term`buffer pool`
       to :term:`flush` when data in the buffer pool must be
       replaced by new data being read into a
       :term:`cache <caching>`.
       However, :term:`least recently used` is more popular than LFU.
       Analogous to the :term:`frequency count` heuristic for
       maintaining a :term:`self-organizing list`.

   least recently used
       Abbreviated :term:`LRU`, it is a popular :term:`heuristic` to
       use for deciding which :term:`buffer` in a :term`buffer pool`
       to :term:`flush` when data in the buffer pool must be
       replaced by new data being read into a :term:`cache
       <caching>`.
       Analogous to the :term:`move-to-front` heuristic for
       maintaining a :term:`self-organizing list`.

   length
      In a :term:`list`, the number of elements. In a string, the
      number of characters.

   level
      In a tree, all nodes of :term:`depth` :math:`d` are at
      level :math:`d` in the tree.
      The root is the only node at level 0, and its depth is 0.

   linear growth rate
      For input size :math:`n`, a growth rate of :math:`cn` (for
      :math:`c` any positive constant).
      In other words, the cost of
      the associated function is linear on the input size.

   linear index
      A form of :term:`indexing` that stores
      :term:`key-value pairs <key-value pair>` in a sorted array.
      Typically this is used for an index to a large collection of
      records stored on disk, where the linear index itself might be
      on disk or in :term:`main memory`.
      It allows for efficient search (including for
      :term:`range queries <range query>`), but it is not good for
      inserting and deleting entries in the array.
      Therefore, it is an ideal indexing structure when the system
      needs to do range queries but the collection of records never
      changes once the linear index has been created.

   linear order
      Another term for :term:`total order`.

   linear search
      Another name for :term:`sequential search`.

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
      A finite, ordered sequence of data items known as
      :term:`elements <element>`.
      This is close to the mathematical concept of a :term:`sequence`.
      Note that "ordered" in this definition means that the list
      elements have position.
      It does not refer to the relationship
      between :term:`key` values for the list elements (that is,
      "ordered" does not mean "sorted").

   locality of reference
      The concept that accesses within a collection of records is not
      evenly distributed.
      This can express itself as some small fraction of the records
      receiving the bulk of the accesses (:term:`80/20 rule`).
      Alternatively, it can express itself as an increased probability
      that the next or future accesses will come close to the most
      recent access.
      This is the fundamental property for success of :term:`caching`.

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

   lower bounds proof
      A proof regarding the lower bound, with this term most typically
      referring to the lower bound for any possible algorithm to solve
      a given :term:`problem`.
      Many problems have a simple lower bound based on the concept
      that the minimum amount of processing is related to looking at
      all of the problem's input.
      However, some problems have a higher lower bound than that.
      For example, the lower bound for the problem of sorting
      (:math:`\Omega(n \log n)`) is greater than the input size to
      sorting (:math:`n`).
      Proving such "non-trivial" lower bounds for problems is
      notoriously difficult.

   main memory
      A synonym for :term:`primary storage`.
      In a computer, typically this will be :term:`RAM`.

   map
      A :term:`data structure` that relates a :term:`key` to a
      :term:`record`.

   mapping
      A :term:`function` that maps every element of a given
      :term:`set` to a unique element of another set; a
      correspondence.

   mark array
      It is typical in :term:`graph` algorithms that there is a need
      to track which nodes have been visited at some point in the
      algorithm.
      An array of bits or values called the :term:`mark array` is
      often maintained for this purpose.

   mark/sweep algorithm
      An algorithm for :term:`garbage collection`.
      All accessible variables, and any space that is reachable by a
      chain of pointers from any accessible variable, is "marked".
      Then a sequential sweep of all memory in the pool is made.
      Any unmarked memory locations are assumed to not be needed by
      the program and can be considered as free to be reused.

   max heap
      A :term:`heap` where every :term:`node` has a :term:`key` value
      greater than its :term:`children <child>`.
      As a consequence, the node with maximum key value is
      at the :term:`root`.

   measure of cost
      When comparing two things, such as two algorithms, some event or
      unit must be used as the basic unit of comparison.
      It might be number of milliseconds needed or machine instructions
      expended by a program, but it is usually desirable to have a way
      to do comparison between two algorithms without writing a
      program.
      Thus, some other measure of cost might be used as a basis for
      comparison between the algorithms.
      For example, when comparing two sorting algorthms it is
      traditional to use as a measure of cost the number of
      :term:`comparisons <comparison>` made between the key values of
      record pairs.

   Mergesort
      A sorting algorithm that requires :math:`\Theta(n \log n)` in
      the best, average, and worst cases.
      Conceptually it is simple:
      Split the list in half, sort the halves, then merge them
      together.
      It is a bit complicated to implement effiently on an array.

   member
      In set notation, this is a synonym for :term:`element`. 
      In abstract design, a :term:`data item` is a member of a :term:`type`.
      In an object-oriented language,
      :term:`data members <data member>` are data fields in an
      object.

   member function
      Each operation associated with the ADT is implemented by a
      member function or :term:`method`.

   memory allocation
      In a :term:`memory manager`, the act of honoring a request for
      memory.

   memory deallocation
      In a :term:`memory manager`, the act of freeing a block of
      memory, which should create or add to a :term:`free block`.

   memory hierarchy
      The concept that a computer system stores data in a range of
      storage types that range from fast but expensive
      (:term:`primary storage`) to slow but cheap
      (:term`secondary storage`).
      When there is too much data to store in :term:`primary storage`,
      the goal is to have the data that is needed soon or
      most often in the primary storage as much as possible,
      by using :term:`caching` techniques.

   memory leak
      In programming, the act of creating :term:`garbage`.
      In languages such as C and C++ that do not support
      :term:`garbage collection`, repeated memory leaks will evenually
      cause the program to terminate.

   memory manager
      Functionality for managing a :term:`memory pool`.
      Typically, the memory pool is viewed as an array of bytes by the
      memory manager.
      The :term:`client` of the memory manager will request a
      collection of (adjacent) bytes of some size, and release the
      bytes for reuse when the space is no longer needed.
      The memory manager should not know anything about the
      interpretation of the data that is being stored by the client
      into the memory pool.
      Depending on the precise implementation, the client might pass
      in the data to be stored, in which case the memory manager will
      deal with the actual copy of the data into the memory pool.
      The memory manager will return to the client a :term:`handle`
      that can later be used by the client to retrieve the data.

   memory pool
      Memory (usually in :term:`RAM` but possibly on disk or
      :term:`peripheral storage` device) that is logically viewed as
      an array of memory positions.
      A memory pool is usually managed by a :term:`memory manager`.

   memory request
      In a :term:`memory manager`, a request from some :term:`client`
      to the memory manager to reserve a block of memory and store
      some bytes there.

   message
      In a :term:`memory manager` implementation (particularly a
      memory manager implemented with a "message passing" style of
      interface), the message is the data that the :term:`client` of
      the memory manager wishes to have stored in the
      :term:`memory pool`.
      The memory manager will reply to the client by returning a
      :term:`handle` that defines the location and size of the message
      as stored in the memory pool.
      The client can later recover the message by passing the handle
      back to the memory manager.

   metaphor
      Humans deal with complexity by assigning a label to an assembly of
      objects or concepts and then manipulating the label in place of the
      assembly. Cognitive psychologists call such a label a
      metaphor.

   method
      In the :term:`object-oriented programming paradigm`,
      a method is an operation on a :term:`class`.
      A synonym for :term:`member function`.

   MCST
   MST
      Abbreviation for :term:`minimal-cost spanning tree`.

   min heap
      A :term:`heap` where every :term:`node` has a :term:`key` value
      less than its :term:`children <child>`.
      As a consequence, the node with minimum key value is
      at the :term:`root`.

   minimal-cost spanning tree
      :to-term: Kruskal's algorithm :label: algorithms
      :to-term: Prim's algorithm :label: algorithms

      Abbreviated as MCST, or sometimes as MST.
      Derived from a :term:`weighted graph`, the MCST is the
      :term:`subset` of the graph's :term:`edges <edge>` that
      maintains the connectivitiy of the graph while having lowest
      total cost (as defined by the sum of the
      :term:`weights <weight>` of the edges in the MCST). 
      The result is referred to as a :term:`tree` because it would
      never have a :term:`cycle` (since an edge could be removed from
      the cycle and still preserve connectivity).
      Two algorithms to solve this problem are
      :term:`Prim's algorithm` and :term:`Kruskal's algorithm`.

   minimum external path weight
      Given a collection of objects, each associated with a
      :term:`leaf node` in a tree, the binary tree with minimum
      external path weight is the one with the minimum sum of
      :term:`weighted path lengths <weighted path length>` for the
      given set of leaves.
      This concept is used to create a :term:`Huffman coding tree`,
      where a letter with high weight should have low depth, so that
      it will count the least against the total path length.
      As a result, another letter might be pushed deeper in the tree
      if it has less weight.

   mod
      Another name for the :term:`modulus` function.

   modulus
      The modulus function returns the
      remainder of an integer division.
      Sometimes written :math:`n \bmod m` in mathematical expressions,
      the syntax in many programming languages is ``n % m``.

   move-to-front
      A :term:`heuristic` used to maintain a
      :term:`self-organizing list`.
      Under this heuristic, whenever a record is accessed it is moved
      to the front of the list.
      Analogous to the :term:`least recently used` heuristic for
      maintaining a :term:`buffer pool`.

   multi-dimensional search key
      A search key containing multiple parts, that works in
      conjunction with a :term:`multi-dimensional search structure`.
      Most typically, a :term:`spatial` search key representing a
      position in multi-dimensional (2 or 3 dimensions) space.
      But a multidimensional key could be used to organize data within
      non-spatial dimensions, such as temperature and time.

   multi-dimensional search structure
      A data structure used to support efficient search on a
      :term:`multi-dimensional search key`.
      The main concept here is that a multi-dimensional search
      structure works more efficiently by considering the multiple
      parts of the search key as a whole, rather than making
      independent searches on each one-dimensional component of the
      key.
      A primary example is a :term:`spatial data structure` that can
      efficiently represent and search for records in
      multi-dimensional space.

   multilist
      A list that may contain sublists.
      This term is sometimes used as a synonym to the term
      :term:`bag`.

   neighbor
      In a :term:`graph`, a :term:`node` :math:`w` is said to be a
      neighbor of :term:`node` :math:`v` if there is an :term:`edge`
      from :math:`v` to :math:`w`.

   node
      The objects that make up a linked structure such as a linked
      list or binary tree. Typically, nodes are allocated using
      :term:`dynamic memory allocation`.
      In :term:`graph` terminology, the nodes are more commonly called
      :term:`vertices <vertex>`.

   non-strict partial order
      In set notation, a relation that is :term:`reflexive`,
      :term:`antisymmetric`, and :term:`transitive`.

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
      In the :term:`object-oriented programming paradigm`, objects
      are the basic units of operation.
      Not only do they have state (variables), but they
      know how to perform certain actions (:term:`methods <method>`).

   object-oriented programming paradigm
      An approach to problem-solving where all computations are
      carried out using :term:`objects <object>`.

   object space decomposition
      A from of :term:`key space decomposition` where the
      :term:`key space` is determined
      by the actual values of keys that are found.
      For example, a :term:`BST` stores a key value in its root,
      and all other values in the tree with lesser value are in the
      left :term:`subtree`.
      Thus, the root value has split (or decomposed) the
      :term:`key space` for that key based on its value into left
      and right parts.
      An object space decomposition is in opposition to an
      :term:`image space decomposition`.

   one-way list
      A synonym for a :term:`singly linked list`.

   open hash system
      A :term:`hash system` where multiple records might be associated
      with the same slot of a :term:`hash table`.
      Typically this is done using a linked list to store the records.
      This is in contrast to a :term:`closed hash system`.

   optimal static ordering
      A theoretical construct defining the best static (non-changing)
      order in which to place a collection of records so as to
      minimize the number of records :term:`visited <visit>` by a
      series of sequential searches.
      It is a useful concept for the purpose of defining a theoretical
      optimum against which to compare the performance for a
      :term:`self-organizing list heuristic`.

   overflow
      The condition where the amount of data stored in an entity has
      exceeded its capacity.
      For example, a node in a :term:`B-tree` can store a certain
      number of records.
      If a record is attempted to be inserted into a node that is
      full, then something has to be done to handle this case.

   overhead
      All information stored by a data structure aside from the actual
      data.
      For example, the pointer fields in a :term:`linked list` or
      :term:`BST`, or the unused positions in an
      :term:`array-based list`. 

   page
      A term often used to refer to the contents of a single
      :term:`buffer` within a :term:`buffer pool` or other
      :term:`virtual memory`. 
      This corresponds to a single :term:`block` or :term:`sector` of
      data from :term:`backing storage`, which is the fundamental unit
      of I/O.

   parameters
      The values making up an input to a :term:`function`.

   parent
      In a tree, the :term:`node` :math:`P` that directly links to a
      node :math:`A` is the parent of :math:`A`. :math:`A` is the
      :term:`child` of :math:`P`.

   parent pointer representation
      For :term:`trees <tree>`, a :term:`node` implementation where
      each node stores only a pointer to its :term:`parent`, rather
      than to its :term:`children <child>`.
      This makes it easy to go up the tree toward the :term:`root`,
      but not down the tree toward the :term:`leaves <leaf node>`.
      This is most appropriate for solving the
      :term:`UNION/FIND` problem.

   parity
      The concept of matching even-ness or odd-ness, the basic idea
      behind using a :term:`parity bit` for error detection.

   parity bit
      A common method for checking if transmission of a
      sequence of bits has been performed correctly.
      The idea is to count the number of 1 bits in the sequence, and
      set the parity bit to 1 if this number is odd, and 0 if it is
      even.
      Then, the transmitted sequence of bits can be checked to see if
      its parity matches the value of the parity bit.
      This will catch certain types of errors, in particular if the
      value for a single bit has been reversed.
      This was used, for example, in early versions of
      :term:`ASCII character coding`.
      
   partial order
      In set notation, a binary relation is called a partial order if
      it is :term:`antisymmetric` and :term:`transitive`.
      If the relation is also :term:`reflexive`, then it is a
      :term:`non-strict partial order`.
      Alternatively, if the relation is also :term:`irreflexive`, then
      it is a :term:`strict partial order`.

   partially ordered set
      The set on which a :term:`partial order` is defined is called a
      partially ordered set.

   partition
      In :term:`Quicksort`, the process of splitting a list into two
      sublists, such that one sublist has values less than the
      :term:`pivot` value, and the other with values greater than the
      pivot. This process takes :math:`\Theta(i)` time on a sublist of
      length :math:`i`.

   path
      In :term:`tree` or :term:`graph` terminology,
      a sequence of :term:`vertices <vertex>`
      :math:`v_1, v_2, ..., v_n`
      forms a path of length :math:`n-1` if there exist edges from
      :math:`v_i` to :math:`v_{i+1}` for :math:`1 \leq i < n`.

   peripheral storage
      Any storage device that is not part of the core processing
      of the computer (that is, :term:`RAM`).
      A typical example is a :term:`disk drive`.

   permutation
      A permutation of a sequence :math:`\mathbf{S}`
      is the :term:`elements <element>` of :math:`\mathbf{S}` arranged
      in some order.

   physical form
      The implementation of a data type as a data structure.
      Contrast to the :term:`physical form` for the data type.

   Pigeonhole Principle
      A commonly used lemma in Mathematics. A typical variant states:
      When :math:`n+1` objects are stored in :math:`n` locations, at
      least one of the locations must store two or more of the objects.

   pivot
      In :term:`Quicksort`, the value that is used to split the list
      into sublists, one with lesser values than the pivot, the other
      with greater values than the pivot.

   pop
      A specialized term used to indicate removing an :term:`element`
      from a :term:`stack`. 

   pointer-based implementation for binary tree nodes
      A common way to implement :term:`binary tree` :term:`nodes
      <node>`.
      Each node stores a data value (or a reference to a data value),
      and pointers to the left and right children.
      If either or both of the children does not exist, then a null
      pointer is stored.

   poset
      Another name for a :term:`partially ordered set`.

   position
      The defining property of the list ADT, this is the concept that
      list elements are in a position. Many list ADTs support access
      by position.

   postorder traversal
      In a :term:`binary tree`, a :term:`traversal` that first
      :term:`recursively <recursion>` :term:`visits <visit>` the left
      :term:`child`, 
      then recursively visits the right child, and then visits the
      :term:`root`.

   powerset
      For a :term:`set` :math:`\mathbf{S}`, the power set is the set
      of all possible :term:`subsets <subset>` for :math:`\mathbf{S}`.

   PR quadtree
      A type of :term:`quadtree` that stores point data in two
      dimensions.
      The root of the PR quadtree represents some square region of 2d
      space.
      If that space stores more than one data point, then the region
      is decomposed into four equal subquadrants, each represented
      :term:`recursively <recursion>` by a subtree of the PR quadtree.
      Since many leaf nodes of the PR quadtree will contain no data
      points, implementation often makes use of the :term:`Flyweight`
      :term:`design pattern`.
      Related to the :term:`bintree`.

   prefix property
      Given a collection of strings, the collection has the prefix
      property if no string in the collection is a prefix for another
      string in the collection.
      The significance is that, given a long string composed of
      members of the collection, it can be uniquely decomposed into
      the constituent members.
      An example of such a collection of strings with the prefix
      property is a set of :term:`Huffman codes`.

   preorder traversal
      In a :term:`binary tree`, a :term:`traversal` that first
      :term:`visits <visit>` the :term:`root`, then
      :term:`recursively <recursion>` visits the left :term:`child`,
      then recursively visits the right child.

   primary index
      Synonym for :term:`primary key index`.

   primary key index
      Relates each :term:`primary key` value with a pointer to the
      actual record on disk.

   primary key
      A unique identifier for a :term:`record`.

   primary storage
      The faster but more expensive memory in a computer, most often
      :term:`RAM` in modern computers.
      This is in contrast to :term:`secondary storage`, which together
      with primary storage devices make up the computer's
      :term:`memory hierarchy`.

   primitive element
      In set notation, this is a single element that is a member of
      the base type for the set. This is as opposed to an element of
      the set being another set.

   Prim's algorithm
      :to-term: greedy algorithm :label: is a

      A :term:`greedy algorithm` for computing the :term:`MCST` of a
      :term:`graph`.
      It is nearly identical to :term:`Dijkstra's algorithm` for
      solving the :term:`single-source shortest paths problem`,
      with the only difference being the calculation done to update
      the best-known distance.

   priority
      A quantity assigned to each of a collection of
      :term:`jobs <job>` or tasks that indicate importance for order
      of processing.
      For example, in an operating system, there could be a collection
      of processes (jobs) ready to run.
      The operating system must select the next task to execute, 
      based on their priorities.

   priority queue
      An ADT whose primary operations of insert of records, and
      deletion of the greatest (or, in an alternative implementation,
      the least) valued record.
      Most often implemented using the :term:`heap` data structure.
      The name comes from a common application where the records being
      stored represent tasks, with the ordering values based on the
      :term:`priorities <priority>` of the tasks.

   probabilistic algorithm
      A form of :term:`randomized algorithm` that might yield an
      incorrect result, or that might fail to produce a result.

   problem
      A task to be performed.
      It is best thought of as a :term:`function` or a mapping of
      inputs to outputs.

   procedural
      Typically referring to the
      :term:`procedural programming paradigm`, in contrast to the
      :term:`object-oriented programming paradigm`.

   procedural programming paradigm
      Procedural programming uses a list of instructions (and
      procedure calls) that define a series of computational steps to
      be carried out.
      This is in contrast to the 
      :term:`object-oriented programming paradigm`.
     
   proof by contradiction
      A mathematical proof technique that proves a theorem by first
      assuming that the theorem is false, and then uses a chain of
      reasoning to reach a logical contradiction.
      Since when the theorem is false a logical contradiction arises,
      the conclusion is that the theorem must be true.

   proof by induction
      A mathematical proof technique similar to :term:`recursion`.
      It is used to prove a parameterized theorem $S(n)$, that is,
      a theorem where there is a :term:`induction variable` involved
      (such as the sum of the numbers from 1 to $n$).
      One first proves that the theorem holds true for a
      :term:`base case`, then one proves the implication that
      whenever $S(n)$ is true then $S(n+1)$ is also true.
      Another variation is :term:`strong induction`.

   program
      An instance, or concrete representation, of an algorithm in some
      programming language.

   promotion
      In the context of certain :term:`balanced tree` structures such
      as the :term:2-3 tree`, a promotion takes place when an
      insertion causes the node to :term:`overflow`.
      In the case of the 2-3 tree, the :term:`key` with the middlemost
      value is sent to be stored in the parent.

   proving the contrapositive
      We can prove that :math:`P \Rightarrow Q` by proving
      :math:`(\mathrm{not}\ Q) \Rightarrow (\mathrm{not}\ P)`.

   push
      A specialized term used to indicate inserting an :term:`element`
      onto a :term:`stack`.

   quadratic growth rate
      A growth rate function of the form :math:`cn^2` where :math:`n`
      is the input size and :math:`c` is a constant.

   quadtree
      A :term:`full tree` where each internal node has four children.
      Most typically used to store two dimensional
      :term:`spatial data`. 
      Related to the :term:`bintree`.
      The difference is that the quadtree splits all dimensions
      simultaneously, while the bintree splits one dimension at each
      level.
      Thus, to extend the quadtree concept to more dimensions requires
      a rapid increase in the number of splits (for example, 8 in
      three dimensions).

   queue
      A list-like structure in which elements are inserted only at one
      end, and removed only from the other one end.

   Quicksort
      A sort that is :math:`\Theta(n \log n)` in the best and average
      cases, though :math:`\Theta(n^2)` in the worst case. However, a
      reasonable implmentation will make the worst case occur under
      exceedingly rare circumstances. Due to its tight inner loop, it
      tends to run better than any other known sort in general
      cases. Thus, it is a popular sort to use in code libraries. It
      works by divide and conquor, by selecting a :term:`pivot` value,
      splitting the list into parts that are either less than or
      greater than the pivot, and then sorting the two parts.

   RAM
      Abbreviation for :term:`Random Access Memory`.

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
      :term:`Quicksort` or :term:`mergesort`.

   random access memory
      Abbreviated ;term:`RAM`, this is the principle example of
      :term:`primary storage` in a modern computer.
      Data access times are typically measured in billionths of a
      second (microseconds), which is roughly a million times faster
      than data access from a disk drive.
      RAM is where data are held for immediate processing, since
      access times are so much faster than for
      :term:`secondary storage`. 
      RAM is a typical part of a computer's :term:`memory hierarchy`.

   random permutation
      One of the :math:`n!` possible permutations for a set of
      :math:`n` element is selected in such a way that each
      permutation has equal probability of being selected.

   randomized algorithm
      An algorithm that involves some form of randomness to control
      its behavior.
      The ultimate goal of a randomized algorithm is to improve
      performance over a deterministic algorithm to solve the same
      problem.
      There are a number of variations on this theme.
      A "Las Vegas algorithm" returns a correct result,
      but the amount of time required might or might not improve over
      a :term:`deterministic algorithm`.
      A "Monte Carlo algorithm" is a form of
      :term:`probabilistic algorithm` that is not guarenteed to return
      a correct result, but will return a result relatively quickly.

   range
      The set of possible outputs for a function.

   range query
      Records are returned if their relevant key value falls with a
      specified range.

   record
      A collection of information, typical implemented as an object in
      an object-oriented programming language.
      Many data structures are organized containers for a collection
      of records.

   recurrence relation
      A :term:`recurrence relation` (or less formally,
      recurrence) defines a function by means of an 
      expression that includes one or more (smaller) instances of
      itself.
      A classic example is the :term:`recursive <recursion>`
      definition for the
      factorial function, :math:`F(n) = n*F(n-1)`.

   recursion
      The process of using recursive calls.
      An algorithm is recursive if it calls itself to do part of
      its work.
      See :term:`recursion`.

   recursive call
      Within a :term:`recursive function`, it is a call that the
      function makes to itself.

   recursive function
      A function that includes a :term:`recursive call`.

   reduction
      In :term:`algorithm analysis`, the process of deriving
      :term:`asymptotic bounds <asymptotic analysis>`
      for one :term:`problem` from the asymptotic bounds of another.
      In particular, if problem A can be used to solve problem B, and
      problem A is proved to be in :math:`O(f(n))`, then problem B
      must also be in :math:`O(f(n))`.
      Reductions are often used to show that certain problems are at
      least as expensive as sorting, or that certain problems are
      :term:`NP Complete`.

   reference
      A value that enables a program to directly access some
      particular data item.
      An example might be a byte position within a file where the
      record is stored, or a pointer to a record in memory.
      (Note that Java makes a distinction between a reference and the
      concept of a pointer, since it does not define a reference to
      necessarily be a byte position in memory.)

   reference count algorithm
      An algorithm for :term:`garbage collection`.
      Whenever a reference is made from a variable to some memory
      location, a counter associated with that memory location is
      incremented.
      Whenever the reference is changed or deleted, the reference
      count is decremented.
      If this count goes to zero, then the memory is considered free
      for reuse.
      This approach can fail if there is a cycle in the chain of
      references.

   reflexive
      In set notation, binary relation :math:`R` on set :math:`S` is
      reflexive if :math:`aRa` for all :math:`a \in \mathbf{S}`.

   relation
      In set notation, a relation :math:`R` over set
      :math:`\mathbf{S}` is a set of ordered pairs from
      :math:`\mathbf{S}`.

   replacement selection
      A variant of :term:`Heapsort` most often used as one phase of an
      :term:`external sort`.
      Given a collection of records stored in an array, and a stream
      of additional records too large to fit into
      :term:`working memory`, replacement selection will unload the
      :term:`heap` by sending records to an output stream, and seek to
      bring new records into the heap from the input stream in
      preference to shrinking the heap size whenever possible.

   reserved block
      In a :term:`memory manager`, this refers to space in the
      :term:`memory pool` that has been allocated to store data
      received from the :term:`client`.
      This is in contrast to the :term:`free blocks <free block>` that
      represent space in the memory pool that is not allocated to
      storing client data.

   resource constraints
      Examples of resource constraints include the total space
      available to store the data |---| possibly divided into separate
      main memory and disk space constraints |---| and the time
      allowed to perform each subtask.

   root
      In a :term:`tree`, the topmost :term:`node` of the tree.
      All other nodes in the tree are :term:`descendants <descendant>`
      of the root.

   rotation
      In the :term:`AVL Tree` and :term:`Splay Tree`, a rotation is a
      local operation performed on a node, its children, and its
      grandchildren that can result in reordering their relationship.
      The goal of performing a rotation is to make the tree more
      :term:`balanced <balanced tree>`.

   run
      A series of sorted records.
      Most often this refers to a (sorted) subset of records that are
      being sorted by means of an :term:`external sort`.

   run file
      A temporary file that is created during the operation of an
      :term:`external sort`, the run file contains a collection of
      :term:`runs <run>`.
      A common structure for an external sort is to first create a
      series of runs (stored in a run file), followed by merging the
      runs together.

   runtime environment
      The environment in which a program (of a particular programming
      language) executes.
      The runtime environment handles such activities as managing the
      :term:`runtime stack`, the :term:`free store`, and the
      :term:`garbage collector <garbage collection>`,
      and it conducts the execution of the program.

   runtime stack
      The place where an :term:`activation record` is stored when a
      subroutine is called during a program's runtime.

   search key
      A field or part of a record that is used to represent the record
      when searching. For example, in a database of customer records,
      we might want to search by name.
      In this case the name field is used as the search key.

   search lower bound
      The problem of searching in an array has provable lower bounds
      for specific variations of the problem.
      For an unsorted array, it is :math:`\Omega(n)`
      :term:`comparisons <comparison>` in the :term:`worst case`,
      typically proved using an :term:`adversary argument`.
      For a sorted array, it is :math:`\Omega(\log n)` in the worst
      case, typically proved using an argument similar to the
      :term:`sorting lower bound` proof.
      However, it is possible to search a sorted array in the average
      case in :math:`O(\log \log n)` time. 

   search tree
      A :term:`tree` data structure that makes search by :term:`key`
      value more efficient.
      A type of :term:`container`, it is common to implement an
      :term:`index <indexing>` using a search tree.
      A good search tree implementation will guarentee that insertion,
      deletion, and search operations are all :math:`\Theta(\log n)`.

   search trie
      Any :term:`search tree` that is a :term:`trie`.

   secondary key
      A key field in a record such as salary, where a particular key
      value might be duplicated in multiple records. A secondary key
      is more likely to be used by a user as a search key than is the
      record's :term:`primary key`.

   secondary index
      Synonym for :term:`secondary key index`.

   secondary key index
      Associates a :term:`secondary key` value with the
      :term:`primary key` of each record having that secondary key
      value.

   secondary storage
      Refers to slower but cheaper means of storing data.
      Typical examples include a :term:`disk drive`, a USB memory
      stick, or a solid state drive.

   sector
      A unit of space on a :term:`disk drive` that is the amount of
      data that will be read or written at one time by the disk drive
      hardware.
      This is typically 512 bytes.

   seek
      On a :term:`disk drive`, the act of moving the :term:`I/O head`
      from one :term:`track` to another.
      This is usually considered the most expensive step during a
      :term:`disk access`.

   selection sort
      While this sort requires :math:`\Theta(n^2)` time in the best,
      average, and worst cases, it requires only :math:`\Theta(n)`
      swap operations. Thus, it does relatively well in cases where
      swaps are expensive. It can be viewed as an optimization on
      bubble sort where swaps are deferred until the end of each
      iteration.

   self-organizing list
      A list that, over a series of search operations, will make
      use of some :term:`heuristic` to re-order its elements in an
      effort to improve search times.
      Generally speaking, search is done sequentially from the
      beginning, but the self-organizing heuristic will attempt to put
      the records that are most likely to be searched for at or near
      the front of the list.
      While typically not as efficient as :term:`binary search` on a
      sorted list, self-organizing lists do not require that the list
      be sorted (and so do not pay the cost of doing the sorting
      operation).

   self-organizing list heuristic
      A :term:`heuristic` to use for the purpose of maintaining a
      :term:`self-organizing list`.
      Commonly used heuristics include
      :term:`move-to-front` and :term:`transpose`.

   sequence
      In set notation, a collection of elements with an order, and
      which may contain duplicate-valued elements.
      A sequence is also sometimes called a :term:`tuple` or a
      :term:`vector`.

   sequential fit
      In a :term:`memory manager`, the process of searching the
      :term:`memory pool` for a :term:`free block` large enough to
      service a :term:`memory request`, possibly reserving the
      remaining space as a free block.
      Examples are :term:`first fit`, :term:`circular first fit`,
      :term:`best fit`, and :term:`worst fit`.

   sequential search
      The simplest search algorithm: In an array, simply look at the
      array elements in the order that they appear.

   set
      A collection of distinguishable :term:`members <member>` or
      :term:`elements <element>`.

   Shellsort
      A sort that relies on the best-case cost of
      :term:`insertion sort` to improve over :math:`\Theta(n^2)` worst
      case cost. 

   shortest path
      Given a :term:`graph` with distances or :term:`weights <weight>`
      on the :term:`edges <edge>`, the shortest path between two nodes
      is the path with least total distance or weight.
      Examples of the shortest paths problems are the
      :term:`single-source shortest paths problem` and the
      :term:`all-pairs shortest paths problem`.

   sibling
      In a :term:`tree`, a sibling of :term:`node` :math:`A` is any
      other node with the same :term:`parent` as :math:`A`.

   signature
      In a programming language, the signature for a function is its
      return type and its list of parameters and their types.

   simple cycle
      In :term:`graph` terminology, a :term:`cycle` is simple if its
      corresponding :term:`path` is simple, except that the first and
      last :term:`vertices <vertex>` of the cycle are the same.

   simple path
      In :term:`graph` terminology, a :term:`path` is simple if all
      vertices on the path are distinct.

   simple type
      A type whose values contain no subparts. An example is the integers.

   simulating recursion
      If a programming language does not support :term:`recursion`,
      or if you want to implement the effects of recursion more
      efficiently, you can use a :term:`stack` to maintain the
      collection of subproblems that 
      would be waiting for completion during the recursive process.
      Using a loop, whenever a recursive call would have been made,
      simply add the necessary program state to the stack.
      When a return would have been made from the recursive call, pop
      the previous program state off of the stack.

   single-source shortest paths problem
      Given a :term:`graph` with :term:`weights <weight>` or
      distances on the :term:`edges <edge>`, and a designated start
      :term:`vertex` :math:`s`, find the shortest path from :math:`s`
      to every other vertex in the graph.
      One algorithm to solve this problem is :term:`Dijkstra's algorithm`.

   singly linked list
      A :term:`linked list` implementation variant where each list
      node contains access an pointer only to the next element in the list.

   snowplow argument
      An analogy used to give intuition for why :term:`replacement
      selection` will generate :term:`runs <run>` that are on average
      twice the size of working memory.
      Records coming from the input stream have key values that might
      be of any size, whose size is related to the position of a
      falling snowflake.
      The replacement selection process is analogous to a snowplow
      that moves around a circular track picking up snow.
      In steady state, given a certain amount of snow equivalent to
      :term:`working memory` size :math:`M`, an amount of snow
      (incoming records from the input stream) is expected to fall
      ahead of the plow as the size of the working memory during one
      cycle of the plow (analogously, one run of the replacement
      selection algorithm).
      Thus, the snowplow is expected in one pass (one run of
      replacement selection) to pick up :math:`2M` snow.

   software engineering
      The study and application of engineering to the design,
      development, and maintenance of software.

   software reuse
      In :term:`software engineering`, the concept of reusing a piece
      of software.
      In particular, using an existing piece of software (such as a
      function or library) when creating new software.

   sorted list
      A :term:`list` where the records stored in the list are arranged
      so that their :term:`key` values are in ascending order.
      If the list uses an :term:`array-based list` implementation,
      then it can use :term:`binary search` for a cost of
      :math:`\Theta(\log n)`.
      But both insertion and deletion will be require
      :math:`\Theta(n)` time.

   sorting lower bound
      The lower bound for the :term:`problem` of
      :term:sorting <sorting problem>` is :math:`\Omega(n \log n)`.
      This is traditionally proved using a :term:`decision tree` model
      for sorting algorithms, and recognizing that the minimum depth
      of the decision tree for any sorting algorithm is
      :math:`\Omega(n \log n)` since there are :math:`n!` permutations
      of the :math:`n` input records to distinguish between during the
      sorting process. 

   sorting problem
      Given a set of records :math:`r_1`, :math:`r_2`, ..., :math:`r_n`
      with :term:`key` values :math:`k_1`, :math:`k_2`, ..., :math:`k_n`,
      the sorting problem is to arrange the records into any order
      :math:`s` such that records
      :math:`r_{s_1}`, :math:`r_{s_2}`, ..., :math:`r_{s_n}`
      have keys obeying the property
      :math:`k_{s_1} \leq k_{s_2} \leq ... \leq k_{s_n}`.
      In other words, the sorting problem is to arrange a set of
      records so that the values of their key fields are in
      non-decreasing order.

   space/time tradeoff
      Many programs can be designed to either speed processing at the
      cost of additional storage, or reduce storage at the cost of
      additional processing time.

   sparse matrix
      A matrix whose values are mostly zero.
      There are a number of data structures that have been developed
      to store sparse matrices, with the goal of reducing the amount
      of space required to represent it as compared to simply using a
      regular matrix representation that stores a value for every
      matrix position.

   sparse graph
      A :term:`graph` where the actual number of :term:`edges <edge>`
      is much less than the possible number of edges.
      Generally, this is interpreted to mean that the :term:`degree`
      for any :term:`vertex` in the graph is relatively low.

   spatial
      Referring to a position in space.

   spatial data
      Any object or record that has a position (in space).

   spatial application
      An application what has spatial aspects.
      In particular, an application that stores records that need to
      be searched by location.

   spatial attribute
      An attribute of a record that has a position in space, such as
      the coordinate.

   spatial data structure
      A data structure designed to support efficient processing when a
      :term:`spatial attribute` is used as the key.
      In particular, a data structure that supports efficient search
      by location, or finds all records within a given region.
      Examples of spatial data structures to store point data include
      the :term:`bintree`, the :term:`PR quadtree` and the
      :term:`kd tree`.

   Splay Tree
      A variant implementation for the :term:`BST`, which differs from
      the standard BST in that it uses modified insert and remove
      methods in order to keep the tree
      :term:`balanced <balanced tree>`.
      Similar to an :term:`AVL Tree` in that it uses the concept of
      :term:`rotations <rotation>` in the insert and remove operations.
      While a Splay Tree does not guarentee that the tree is balanced,
      it does guarentee that a series of :math:`n` operations on the
      tree will have a total cost of :math:`\Theta(n \log n)` cost,
      meaning that any given operation can be viewed as having
      :term:`amortized cost` of :math:`\Theta(\log n)`.

   stable
      A sorting algorithm is said to be stable if it does not
      change the relative ordering of records with identical
      :term:`key` values. 

   stack
      A list-like structure in which elements may be inserted or
      removed from only one end.

   stale pointer
      Within the context of a :term:`buffer pool` or
      :term:`memory manager`, this refers to a reference to a
      :term:`buffer` or memory location that is no longer valid.
      For example, a program might make a memory request to a buffer
      pool, and be given a reference to the buffer holding the
      requested data. 
      Over time, due to inactivity, the contents of this buffer might
      be flushed.
      If the program holding the buffer reference then tries to access
      the contents of that buffer again, then the data contents will
      have changed.
      The possibility for this to occur depends on the design of the
      interface to the buffer pool system.
      Some designs make this impossible to occur.
      Other designs make it possible in an attempt to deliver greater
      performance.

   Strassen's algorithm
      A :term:`recursive <recursion>` algorithm for matrix
      multiplication. 
      When multiplying two :math:`n \times n` matrices,
      this algorithm runs faster than the :math:`\Theta(n^3)` time
      required by the standard matrix multiplication algorithm.
      Specifically, Strassen's algorithm requires time
      :math:`Theta(n^{\log_2 7})` time.
      This is achieved by refactoring the sub-matrix multiplication
      and addition operations so as to need only 7 sub-matrix
      multiplications instead of 8, at a cost of additional sub-matrix
      addition operations.
      Thus, while the asymptotic cost is lower, the constant factor in
      the growth rate equation is higher.
      This makes Strassen's algorithm inefficient in practice unless
      the arrays being multiplied are rather large.
      Variations on Strassen's algorithm exist that reduce the number
      of sub-matrix multiplications even futher at a cost of even more
      sub-matrix additions.

   strategy
      An approach to accomplish a task, often encapsulated as an
      algorithm.

   Strategy design pattern
      A :term:`design pattern` that separates the algorithm for
      performing a task from the control for applying that task to
      each member of a collection.
      A good example is a generic sorting function that takes a
      collection of records (such as an array) and a "strategy" in the
      form of an algorithm that knows how to extract the key from a
      record in the array.
      Only subtly different from the :term:`Visitor design pattern`,
      where the difference is primarily one of intent rather than
      syntax.
      The strategy design pattern is focused on encapsulating an activity
      that is part of a larger process, so that different ways of
      performing that activity can be substituted.
      The visitor design pattern is focused on encapsulating an activity that
      will be performed on all members of a collection so that completely
      different activities can be substituted within a generic method that
      accesses all of the collection members.

   strict partial order
      In set notation, a relation that is :term:`irreflexive`,
      :term:`antisymmetric`, and :term:`transitive`.

   strong induction
      An alternative formulation for the :term:`induction step` in a
      :term:`proof by induction`.
      The induction step for strong induction is:
      If **Thrm** holds for all :math:`k, c \leq k < n`, then
      **Thrm** holds for :math:`n`.

   subclass
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      any class within a :term:`class hierarchy` that
      :term:`inherits <inherit>` from some other class.

   subgraph
      A subgraph :math:`\mathbf{S}` is formed from :term:`graph`
      :math:`\mathbf{G}` by selecting a :term:`subset`
      :math:`\mathbf{V}_s` of :math:`\mathbf{G}`'s :term:`vertices
      <vertex>` and a subset :math:`\mathbf{E}_s` of
      :math:`\mathbf{G}`'s :term:`edges <edge>` such that for every
      edge :math:`e \in \mathbf{E}_s`, 
      both vertices of :math:`e` are in :math:`\mathbf{V}_s`.

   subset
      In set theory, a set :math:`A` is a subset of a set
      :math:`B`, or equivalently :math:`B` is a :term:`superset` of
      :math:`A`, if all elements of :math:`A` are also elements of
      :math:`B`.

   subtree
      A subtree is a :term:`subset` of the nodes of a binary tree that
      includes some node :math:`R` of the tree as the subtree
      :term:`root` along with all the :term:`descendants <descendant>`
      of :math:`R`.

   successful search
      When searching for a :term:`key` value in a collection of
      records, we might find it.
      If so, we call this a successful search.
      The alternative is an :term:`unsuccessful search`.

   summation
      The sum of costs for some :term:`function` applied to a
      range of parameter values.
      Often written using Sigma notation.
      For example, the sum of the integers from 1 to :math:`n` can be
      written as :math:`\sum_{i=1}^{n} i`.

   superset
      In set theory, a set :math:`A` is a :term:`subset` of a
      :term:`set` :math:`B`, or equivalently :math:`B` is a
      :term:`superset` of :math:`A`, if all :term:`elements <element>`
      of :math:`A` are also elements of :math:`B`.

   symmetric
      In set notation, relation :math:`R` is symmetric if whenever
      :math:`aRb`, then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   symmetric matrix
      A square matrix that is equal to its :term:`transpose`.
      Equivalently, for a :math:`n \times n` matrix :math:`A`,
      for all :math:`i,j < n`, :math:`A[i, j] = A[j, i]`.

   tail
      The end of a :term:`list`.

   topological sort
      The process of laying out the :term:`vertices <vertex>` of a
      :term:`DAG` in a :term:`linear order` such that no vertex
      :math:`A` in the order is preceded by a vertex that can be
      reached by a (directed) :term:`path` from :math:`A`.
      Usually the (directed) edges in the graph define a
      prerequisite system, and the goal of the topological sort is
      to list the vertices in an order such that no prerequisites are
      violated.

   total order
      A binary relation on a set where every pair of distinct elements
      in the set are :term:`comparable` (that is, one can determine
      which of the pair is greater than the other).

   track
      On a :term:`disk drive`, a concentric circle representing all of
      the :term:`sectors <sector>` that can be viewed by the
      :term:`I/O head` as the disk rotates.
      The significance is that, for a given placement of the I/O head,
      the sectors on the track can be read without performing a
      (relatively expensive) :term:`seek` operation.

   track-to-track seek time
      Expected (average) time to perform a :term:`seek` operation from
      a random :term:`track` to an adjacent track.
      Thus, this can be viewed as the minimum possible seek time for the
      :term:`disk drive`.
      This is one of two metrics commonly provided by disk drive
      vendors for disk drive performance, with the other being
      :term:`average seek time`.

   trailer node
      Commonly used in implementations for a :term:`linked list` or
      related structure, this :term:`node` follows the last element
      of the list.
      Its purpose is to simplify the code implementation by
      reducing the number of special cases that must be programmed
      for.

   transitive
      In set notation, relation :math:`R` is transitive if whenever
      :math:`aRb`, then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   transpose
      In the context of linear algebra,
      the transpose of a matrix :math:`A` is
      another matrix :math:`A^T` created by writing the rows of
      :math:`A` as the columns of :math:`A^T`.
      In the context of a :term:`self-organizing list`,
      transpose is a :term:`heuristic` used to maintain the list.
      Under this heuristic, whenever a record is accessed it is moved
      one position closer to the front of the list.

   traversal
      Any process for visiting all of the objects in a collection
      (such as a :term:`tree` or :term:`graph`) in some order.

   tree
      A tree :math:`\mathbf{T}` is a finite set of one or more
      :term:`nodes <node>` such that there is one designated node
      :math:`R`, called the :term:`root` of :math:`\mathbf{T}`.
      If the set :math:`(\mathbf{T} -\{R\})` is not empty, these
      nodes are partitioned into :math:`n > 0`
      :term:`disjoint sets` :math:`\mathbf{T}_0`,
      :math:`\mathbf{T}_1`, ..., :math:`\mathbf{T}_{n-1}`, 
      each of which is a tree, and whose :term:`roots <root>`
      :math:`R_1, R_2, ..., R_n`,
      respectively, are :term:`children <child>` of :math:`R`.

   trie
      A form of :term:`search tree` where an internal node represents
      a split in the :term:`key space` at a predetermined location,
      rather than split based on the actual :term:`key` values seen.
      For example, a simple binary search trie for key values in the
      range 0 to 1023 would store all records with key values less
      than 512 on the left side of the tree, and all records with key
      values equal to or greater than 512 on the right side of the
      tree.
      A trie is always a :term:`full tree`.
      Folklore has it that the term comes from "retrieval", and should
      be pronounced as "try" (in contrast to "tree", to distinguish
      the differences in the space decomposition method of a search
      tree versus a search trie).
      The term "trie" is also sometimes used as a synonym for the
      :term:`alphabet trie`.

   truth table
      In symbolic logic, a table that contains as rows all possible
      combinations of the boolean variables, with a column that shows
      the outcome (true or false) for the expression when given that
      row's truth assignment for the boolean variables.

   tuple
      In set notation, another term for a :term:`sequence`.

   two-coloring
      An assignment from two colors to regions in an image
      such that no two regions sharing a side have the same color.

   type
      A collection of values.

   underflow
      The condition where the amount of data stored in an entity has
      dropped below some minimum threshold.
      For example, a node in a :term:`B-tree` is required to be at
      least half full.
      If a record deletion causes the node to be less than half full,
      then it is in a condition of underflow, and something has to be
      done to correct this.

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
      same :term:`equivalence class` under some
      :term:`equivalence relation`.

   unsorted list
      A :term:`list` where the records stored in the list can appear
      in any order (as opposed to a :term:`sorted list`).
      An unsorted list can support efficient (:math:`\Theta(1)`)
      insertion time (since you can put the record anywhere
      convenient), but requires :math:`\Theta(n)` time for both search
      and and deletion.

   unsuccessful search
      When searching for a :term:`key` value in a collection of
      records, we might not find it.
      If so, we call this an unsuccessful search.
      Usually we require that this means that no record in the
      collection actually has that key value
      (though a :term:`probabilistic algorithm` for search might not
      require this to be true).
      The alternative to an unsuccessful search is a
      :term:`successful search`.

   unvisited
      In :term:`graph` algorithms, this refers to a node that has not
      been processed at the current point in the algorithm.
      This information is typically maintained by using a
      :term:`mark array`.

   upper bound
      In algorithm analysis, the upper or highest growth rate that
      an algorithm can have. In practice, this is the smallest-growing
      function that we know grows at least as fast as all but a
      constant number of inputs. It could be a gross over-estimate of
      the truth.

   variable-length coding
      Given a collection of objects, a variable-length coding scheme
      assigns a code to each object in the collection using codes that
      can be of different lengths.
      Typically this is done in a way such that the objects that are
      most likely to be used have the shortest codes, with the goal of
      minimizing the total space needed to represent an actual
      :term:`sequence` of objects, such as when representing the
      characters in a document.
      :term:`Huffman coding <Huffman codes>` is an example of a
      variable-length coding scheme.
      This is in contrast to :term:`fixed-length coding`.

   vector
      In set notation, another term for a :term:`sequence`.
      As a data structure, the term vector usually used as a synonym
      for a :term:`dynamic array`.

   vertex
      Another name for a :term:`node` in a :term:`graph`.

   virtual memory
      A memory management technique for making relatively fast but
      small memory appear larger to the program.
      The large "virtual" data space is actually stored on a
      relatively slow but large :term:`backing storage` device, and
      portions of the data are copied into the smaller, faster memory
      as needed by use of a :term:`buffer pool`.
      A common example is to use :term:`RAM` to manage access to a
      large virtual space that is actually stored on a
      :term:`disk drive`.
      The programmer can implement a program as though the entire
      data content were stored in RAM, even if that is larger than the
      physical RAM available making it easier to implement.

   visit
      During the process of a :term:`traversal` on a :term:`graph` or
      :term:`tree` the action that takes place on each :term:`node`.

   visited
      In :term:`graph` algorithms, this refers to a node that has
      previously been processed at the current point in the
      algorithm.
      This information is typically maintained by using a
      :term:`mark array`.

   visitor design pattern
      A :term:`design pattern` where a :term:`traversal` process is
      given a function (known as the visitor) that is applied to every
      object in the collection being traversed.
      For example, a generic tree or graph traversal might be
      designed such that it takes a function parameter,
      where that function is applied to each node.

   weight
      A cost or distance most often associated with an :term:`edge` in
      a :term:`graph`.

   weighted graph
      A :term:`graph` whose :term:`edges <edge>` each have an
      associated :term:`weight` or cost.

   weighted path length
      Given a tree, and given a :term:`weight` for each leaf in the
      tree, the weighted path length for a leaf is its weight
      times its :term:`depth`.

   weighted union rule
      When merging two disjoint sets using the :term:`UNION/FIND`
      algorithm, the weighted union rule is used to determine which
      subtree's root points to the other.
      The root of the subtree with fewer nodes will be set to point to
      the root of the subtree with more nodes.
      In this way, the average depth of nodes in the resulting tree
      will be less than if the assignment had been made in the other
      direction.

   working memory
      The portion of :term:`main memory` available to an algorithm for
      its use.
      Typically refers to main memory made available to an algorithm
      that is operating on large amounts of data stored in
      :term:`peripheral storage`, the working memory represents space
      that can hold some subset of the total data being processed.

   worst case
      In algorithm analysis, the problem instance from among all
      problem instances for a given input size :math:`n` that has
      the greatest cost. Note that the worst case is **not** when
      :math:`n` is big, since we are referring to the wost from a
      class of inputs (i.e, those inputs of size :math:`n`).

   worst fit
      In a :term:`memory manager`, worst fit is a :term:`heuristic`
      for deciding which :term:`free block` to use when allocating
      memory from a :term:`memory pool`.
      Worst fit will always allocate from the largest free block.
      The rationale is that this will be the method least likely to
      cause :term:`external fragmentation` in the form of small,
      unuseable memory blocks.
      The disadvantage is that it tends to eliminate the availability
      of large freeblocks needed for unusually large requests.

   Zipf distribution
      A data distribution that follows Zipf's law, an emprical
      observation that many types of data studied in the physical and
      social sciences follow a power law probability distribution.
      That is, the frequency of any record in the data collection is
      inversely proportional to its rank when the collection is sorted
      by frequency.
      Thus, the most frequently appearing record has a frequency much
      higher than the next most frequently appearing record, which in
      turn has a frequency much higher than the third (but with ratio
      slightly lower than that for the first two records) and so on.
      The :term:`80/20 rule` is a casual characterization of a Zipf
      distribution.
      Adherence to a Zipf distribution is important to the successful
      operation of a :term:`cache <caching>` or
      :term:`self-organizing list`.

   zone
      In :term:`memory management <memory manager>`, the concept that
      different parts of the :term:`memory pool` are handled in
      different ways.
      For example, some of the memory might be handled by a simple
      :term:`freelist`, while other portions of the memory pool might
      be handled by a :term:`sequential fit` memory manager.
      On a :term:`disk drive` the concept of a zone relates to the
      fact that there are limits to the maximum data density, combined
      with the fact that the need for the same angular distance to be
      used for a sector in each track means that tracks further from
      the center of the disk will become progressively less dense.
      A zone in this case is a series of adjacent tracks whose data
      density is set by the maximum density of the innermost track of
      that zone.
      The next zone can then reset the data density for its innermost
      track, thereby gaining more total storage space while preserving
      angular distance for each sector.
