.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: OpenDSA Contributors
   :topic:


Glossary
========

.. glossary::
   :sorted:

   2-3 tree
      :to-term: binary search tree property :label: has
      :to-term: B-tree :label: form of

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
      :to-term: ADT :label: abbreviation
      :to-term: interface :label: logically defines

      Abbreviated :term:`ADT`. The specification of a :term:`data type`
      within some language, independent of an implementation.
      The :term:`interface` for the ADT is defined in terms of a :term:`type`
      and a set of operations on that type.
      The behavior of each operation is determined by its inputs and
      outputs.
      An ADT does not specify *how* the data type is implemented.
      These implementation details are hidden from the user of the ADT
      and protected from outside access, a concept referred to as
      :term:`encapsulation`.

   accept
      When a :term:`finite automata` executes on a string and
      terminates in an :term:`accepting state`, it is said to accept
      the string.
      The finite automata is said to accept the language that consists
      of all strings for which the finite automata completes execution
      in an accepting state.

   accepting state
      Part of the definition of a :term:`finite automata` is to
      designate some :term:`states <state>` as accepting states.
      If the finite automata executes on an input string and completes
      the computation in an accepting state, then the machine is said
      to :term:`accept` the string.

   activation record
      :to-term: local variable :label: stores

      The entity that is stored on the :term:`runtime stack` during
      program execution.
      It stores any active :term:`local variable` and the return
      address from which a new subroutine is being called, so that
      this information can be recovered when the subroutine
      terminates.

   acyclic graph
      :to-term: directed acyclic graph :label: types
      :to-term: cycles <cycle> :label: has no

      In :term:`graph` terminology, a graph that contains no
      :term:`cycles <cycle>`.

   address
      A location in memory.

   adjacent
      Two :term:`nodes <node>` of a :term:`tree` or two
      :term:`vertices <vertex>` of a :term:`graph` are said to be
      adjacent if they have an :term:`edge` connecting them.
      If the edge is directed from :math:`a` to :math:`b`,
      then we say that :math:`a` is adjacent to :math:`b`,
      and :math:`b` is adjacent from :math:`a`.

   adjacency list
      An implementation for a :term:`graph` that uses an (array-based)
      :term:`list` to represent the :term:`vertices <vertex>` of the
      graph, and each vertex is in turn represented by a
      (linked) list of the vertices that are
      :term:`neighbors <neighbor>`.

   adjacency matrix
      An implementation for a :term:`graph` that uses a 2-dimensional
      :term:`array` where each row and each column corresponds to a
      :term:`vertex` in the :term:`graph`. A given row and column in
      the matrix corresponds to an edge from the :term:`vertex`
      corresponding to the row to the vertex corresponding to the
      column.

   ADT
      Abbreviation for :term:`abstract data type`.

   adversary
      A fictional construct introduced for use in an
      :term:`adversary argument`.

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
      :to-term: composite type :label: synonym
      :to-term: member :label: has

      A :term:`data type` whose :term:`members <member>` have subparts.
      For example, a typical database record.
      Another term for this is :term:`composite type`.

   algorithm
      :to-term: problem :label: solves
      :to-term: program :label: implemented by

      A method or a process followed to solve a :term:`problem`.

   algorithm analysis
      :to-term: growth rate :label: key concept
      :to-term: upper bound :label: key concept
      :to-term: lower bound :label: key concept
      :to-term: asymptotic analysis :label: synonym
      :to-term: asymptotic algorithm analysis :label: formal synonym

      A less formal version of the term
      :term:`asymptotic algorithm analysis`, generally used as a
      synonym for :term:`asymptotic analysis`.

   alias
      Another name for something. In programming, this usually refers
      to two :term:`references <reference>` that refer to the same
      object.

   allocated
   allocation
      Reserving memory for an object in the Heap memory.

   all-pairs shortest paths problem
      :to-term: Floyd's algorithm :label: solved by

      Given a :term:`graph` with :term:`weights <weight>` or
      distances on the :term:`edges <edge>`,
      find the shortest paths between every pair of
      vertices in the graph.
      One approach to solving this problem is
      :term:`Floyd's algorithm`, which uses the
      :term:`dynamic programming` algorithmic technique.

   alphabet
      The characters or symbols that strings in a given language may
      be composed of.

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
      :to-term: algorithm analysis :label: is

      An :term:`algorithm analysis` techique that looks at the total
      cost for a series of operations and amortizes this total cost
      over the full series.
      This is as opposed to considering every individual operation to
      independently have the :term:`worst case` cost, which might lead
      to an overestimate for the total cost of the series.

   amortized cost
      :to-term: amortized analysis :label: used in

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

   approximation algorithm
      An algorthm for an :term:`optimization problem` that finds a
      good, but not necessarily cheapest, solution.

   arm
      In the context of an :term:`I/O head`, this attaches the sensor
      on the I/O head to the :term:`boom`.

   array
      A :term:`data type` that is used to store elements in consecutive memory
      locations and refers to them by an index.

   array-based list
      :to-term: array :label: uses

      An implementation for the :term:`list` ADT that uses an :term:`array` to
      store the list elements. Typical implementations fix the array
      size at creation of the list, and the :term:`overhead`
      is the number of array positions that are presently unused.

   array-based stack
      :to-term: array-based list :label: analogous to
      :to-term: stack :label: implementing

      Analogous to an :term:`array-based list`, this uses an :term:`array` to
      store the elements when implementing the :term:`stack` ADT.

   array-based queue
      :to-term: array-based list :label: analogous to
      :to-term: queue :label: implementing

      Analogous to an :term:`array-based list`, this uses an :term:`array` to
      store the elements when implementing the :term:`queue` ADT.

   ASCII character coding
      American Standard Code for Information Interchange.
      A commonly used method for encoding characters using a binary code.
      Standard ASCII uses an 8-bit code to represent upper and lower
      case letters, digits, some punctuation, and some number of
      non-printing characters (such as carrage return).
      Now largely replaced by UTF-8 encoding.

   assembly code
      :to-term: intermediate code :label: form of

      A form of  :term:`intermediate code` created by a :term:`compiler` that
      is easy to convert into the final form that the computer can
      execute.
      An assembly language is typically a direct mapping of one or a
      few instructions that the CPU can execute into a mnemonic form
      that is relatively easy for a human to read.

   asymptotic algorithm analysis
      A more formal term for :term:`asymptotic analysis`.

   asymptotic analysis
      :to-term: algorithm analysis :label: synonym
      :to-term: asymptotic algorithm analysis :label: formal synonym

      A method for estimating the efficiency of an algorithm or
      computer program by identifying its :term:`growth rate`.
      Asymptotic analysis also gives a way to
      define the inherent difficulty of a :term:`problem`.
      We frequently use the term :term:`algorithm analysis` to mean
      the same thing.

   attribute
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a synonym for :term:`data members <data member>`.

   automata
      Synonym for :term:`finite state machine`.

   automatic variable
      A synonym for :term:`local variable`.
      When program flow enters and leaves the variable's scope,
      automatic variables will be allocated and de-allocated
      automatically.

   average case
      In :term:`algorithm analysis`, the average of the costs for all
      :term:`problem instances <problem instance>` of a given input
      size :math:`n`. If not all problem
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
      :to-term: double rotation :label: operations
      :to-term: single rotation :label: operations

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
      Only the :term:`leaf nodes <leaf node>` store a
      :term:`reference` to the actual data records.

   B$^*$-tree
      A variant on the :term:`B$^+$-tree`.
      The :math:`\mathrm{B}^*` tree is identical to the :math:`\mathrm{B}^+`
      tree, except for the rules used to split and merge nodes.
      Instead of splitting a node in half when it overflows, the
      :math:`\mathrm{B}^*` tree
      gives some records to its neighboring sibling, if possible.
      If the sibling is also full, then these two nodes split into three.
      Similarly, when a node underflows, it is combined with its two
      siblings, and the total reduced to two nodes.
      Thus, the nodes are always at least two thirds full.

   B-tree
      :to-term: balanced tree :label: is a
      :to-term: B$^+$-tree :label: variant
      :to-term: B$^*$-tree :label: variant

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

   backtracking
      A :term:`heuristic` for brute-force search of a solution space.
      It is essentially a :term:`depth-first search` of the solution
      space.
      This can be improved using a :term:`branch-and-bounds algorithm`.

   bad reference
      :to-term: NullPointerException :label: raises

      A reference is referred to as a bad reference if it is allocated
      but not initialized.

   bag
      :to-term: multilist :label: synonym

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
      The :term:`data type` for the elements in a set.
      For example, the set might consist of the integer values 3, 5,
      and 7.
      In this example, the base type is integers.

   basic operation
      Examples of basic operations include inserting a data
      item into the data structure, deleting a :term:`data item` from the
      data structure, and finding a specified :term:`data item`.

   best case
      In algorithm analysis, the :term:`problem instance` from among
      all problem instances for a given input size :math:`n` that has
      least cost. Note that the best case is **not** when :math:`n` is
      small, since we are referring to the best from a class of inputs
      (i.e, we want the best of those inputs of size :math:`n`).

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

   BFS
      Abbreviation for :term:`breadth-first search`.

   big-Oh notation
      In :term:`algorithm analysis`, a shorthand notation for
      describing the :term:`upper bound` for an :term:`algorithm` or
      :term:`problem`.

   binary insert sort
      A variation on :term:`insertion sort` where the position of the
      value being inserted is located by binary search, and then put
      into place. In normal usage this is not an improvement on
      standard insertion sort because of the expense of moving many
      items in the :term:`array`. But it is directly useful if the cost of
      comparison is high compared to that of moving an element, or
      is theoretically useful if we only care to count the cost of
      comparisons.

   binary search
      A standard :term:`recursive <recursion>` algorithm for finding
      the :term:`record` with a given :term:`search key` value within
      a sorted list.
      It runs in :math:`O(\log n)` time.
      At each step, look at the middle of the current sublist, and throw
      away the half of the records whose keys are either too small or
      too large.

   binary search tree
      :to-term: AVL tree :label: example
      :to-term: binary search tree property :label: has
      :to-term: BST :label: abbreviated
      :to-term: splay tree :label: example

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
      :to-term: binary search tree :label: example
      :to-term: binary trie :label: example
      :to-term: complete binary tree :label: example
      :to-term: bintree :label: example

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

   binning
      In :term:`hashing`, binning is a type of :term:`hash function`.
      Say we are given keys in the range 0 to 999, and have a hash
      table of size 10.
      In this case, a possible hash function might simply divide the
      key value by 100.
      Thus, all keys in the range 0 to 99 would hash to slot 0, keys
      100 to 199 would hash to slot 1, and so on.
      In other words, this hash function "bins" the first 100 keys to
      the first slot, the next 100 keys to the second slot, and so
      on.
      This approach tends to make the hash function dependent on the
      distribution of the high-order bits of the keys.

   bintree
      :to-term: flyweight :label: uses

      A :term:`spatial data structure` in the form of binary
      :term:`trie`, typically used to store point data in two or more
      dimensions.
      Similar to a :term:`PR quadtree` except that at each level, it
      splits one dimension in half.
      Since many leaf nodes of the PR quadtree will contain no data
      points, implementation often makes use of the :term:`flyweight`
      :term:`design pattern`.

   Binsort
      A sort that works by taking each record and placing it into a
      bin based on its value. The bins are then gathered up in order
      to sort the list. It is generally not practical in this form,
      but it is the conceptual underpinning of the :term:`radix sort`.

   bitmap
   bit vector
      An :term:`array` that stores a single bit at each position.
      Typically these bits represent
      :term:`Boolean variables <Boolean variable>` associated with
      a collection of objects, such that the :math:`i` th bit is the
      Boolean value for the :math:`i` th object.

   block
      A unit of storage, usually referring to storage on a
      :term:`disk drive` or other :term:`peripheral storage` device.
      A block is the basic unit of I/O for that device.

   Boolean expression
      A Boolean expression is comprised of
      :term:`Boolean variables <Boolean variable>`
      combined using the operators AND (:math:`\cdot`), OR
      (:math:`+`), and NOT (to negate Boolean variable :math:`x` we
      write :math:`\overline{x}`).

   Boolean variable
      A variable that takes on one of the two values ``True`` and
      ``False``.

   boom
      In the context of an :term:`I/O head`, is the central structure
      to which all of the I/O heads are attached.
      Thus, the all move together during a :term:`seek` operation.

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

   branch-and-bounds algorithm
      A variation on :term:`backtracking` that applies
      to :term:`optimization problems <optimization problem>`.
      We traverse the :term:`solution tree` as with backtracking.
      Proceeding deeper in the solution tree generally requires
      additional cost.
      We remember the best-cost solution found so far.
      If the cost of the current branch in the tree exceeds the best
      tour cost found so far, then we know to stop pursuing this
      branch of the tree.
      At this point we can immediately back up and take another branch.

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
     :to-term: BFS :label: abbreviation

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

      A simple sort that requires :math:`Theta(n^2)` time in
      :term:`best <best case>`, :term:`average <average case>`,
      and :term:`worst <worst case>` cases.
      Even an optimized version will normally run slower than
      :term:`insertion sort`, so it has little to recommend it.

   bucket
      In :term:`bucket hashing`, a bucket is a sequence of
      :term:`slots <slot>` in the :term:`hash table` that are grouped
      together.

   bucket hashing
      :to-term: bucket :label: uses

      A method of :term:`hashing` where multiple :term:`slots <slot>`
      of the :term:`hash table` are grouped together to form a
      :term:`bucket`.
      The :term:`hash function` then either hashes to some bucket, or
      else it hashes to a :term:`home slot` in the normal way, but
      this home slot is part of some bucket.
      :term:`Collision resolution <collision resolution>` is handled
      first by attempting to find a free position within the same
      bucket as the home slot.
      If the bucket if full, then the record is placed in an
      :term:`overflow bucket`.

   bucket sort
      A variation on the :term:`Binsort`, where each bin is associated
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
      :to-term: dirty bit :label: uses

      A block of memory, most often in :term:`primary storage`.
      The size of a buffer is typically one or a multiple of the basic
      unit of I/O that is read or written on each access to
      :term:`secondary storage` such as a :term:`disk drive`.

   buffer passing
      An approach to implementing the :term:`ADT` for a
      :term:`buffer pool`, where a pointer to a :term:`buffer` is
      passed between the client and the buffer pool.
      This is in contrast to a :term:`message passing` approach,
      it is most likely to be used for long messages or when the
      message size is always the same as the buffer size, such as when
      implementing a :term:`B-tree`.

   buffer pool
      :to-term: buffer :label: composed of
      :to-term: flush :label: operation

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
      :to-term: buffering :label: synonym

      The concept of keeping selected data in :term:`main memory`.
      The goal is to have in main memory the data values that are
      most likely to be used in the near future.
      An example of a caching technique is the use of a
      :term:`buffer pool`.

   call stack
      Known also as execution stack. A stack that stores the function
      call sequence and the return address for each function.

   Cartesian product
      For sets, this is another name for the :term:`set product`.

   ceiling
      Written :math:`\lceil x \rceil`, for real value :math:`x` the
      ceiling is the least integer :math:`\geq x`.

   child
      In a tree, the set of :term:`nodes <node>` directly pointed to
      by a node :math:`R` are the :term:`children <child>` of :math:`R`.

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
      :to-term: member function :label: can include
      :to-term: data member :label: can include

      In the :term:`object-oriented programming paradigm`
      an ADT and its implementation together make up a class.
      An instantiation of a class within a program is termed an
      :term:`object`.

   class hierarchy
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a set of classes and their interrelationships.
      One of the classes is the :term:`base class`, and the others are
      :term:`subclasses <subclass>` that :term:`inherit` either
      directly or indirectly from the base class.

   clause
      In a :term:`Boolean expression`, a clause is one or more
      :term:`literals <literal>` OR'ed together.

   client
      The user of a service.
      For example, the object or part of the program that calls a
      :term:`memory manager` class is the client of that memory
      manager.
      Likewise the class or code that calls a :term:`buffer pool`.

   clique
      In :term:`graph` terminology, a clique is a :term:`subgraph`,
      defined as any :term:`subset` :math:`U` of the graph's
      :term:`vertices <vertex>` such that every vertex in :math:`U`
      has an :term:`edge` to every other vertex in :math:`U`.
      The size of the clique is the number of vertices in the clique.

   closed
      A set is closed over a (binary) operation if,
      whenever the operation is applied to two members of the set, the
      result is a member of the set.

   closed-form solution
      An algebraic equation with the same value as a :term:`summation`
      or :term:`recurrence relation`.
      The process of replacing the summation or
      recurrence with its closed-form solution is known as solving the
      summation or recurrence.

   closed hash system
      :to-term: open addressing :label: synonym

      A :term:`hash system` where all records are stored in slots of
      the :term:`hash table`.
      This is in contrast to an :term:`open hash system`.

   cluster
      In :term:`file processing`, a collection of physically adjacent
      :term:`sectors <sector>` that define the smallest allowed
      allocation unit of space to a disk file.
      The idea of requiring space to be allocated in multiples of
      sectors is that this will reduce the number of
      :term:`extents <extent>` required to store the file, which
      reduces the expected number of :term:`seek` operations reuquired
      to process a series of :term:`disk accesses <disk access>` to
      the file.
      The disadvantage of large cluster size is that it increases
      :term:`internal fragmentation` since any space not actually
      used by the file in the last cluster is wasted.

   code generation
      A phase in a :term:`compiler` that transforms
      :term:`intermediate code` into the final executable form of the
      code.
      More generally, this can refer to the process of turning a parse
      tree (that determines the correctness of the structure of the
      program) into actual instructions that the computer can execute.


   code optimization
      :to-term: assembly code :label: changes

      A phase in a :term:`compiler` that makes changes in the code
      (typically :term:`assembly code`) with the goal of replacing
      it with a version of the code that will run faster while
      performing the same computation.

   cohesion
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a term that refers to the degree to which a class has a single
      well-defined role or responsibility.

   Collatz sequence
      For a given integer value :math:`n`, the sequence of numbers
      that derives from performing the following computatin on :math:`n`

      .. code-block:: cpp

        while (n > 1)
          if (ODD(n))
            n = 3 * n + 1;
          else
            n = n / 2;

      This is famous because, while it terminates for any value of
      :math:`n` that you try, it has never been proven to be a fact
      that this always terminates.

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
      The outcome of a :term:`collision resolution policy`.

   collision resolution policy
      :to-term: collision resolution :label: performs

      In :term:`hashing`, the process of resolving a
      :term:`collision`.
      Specifically in a :term:`closed hash system`, this is the
      process of finding the proper position in a :term:`hash table`
      that contains the
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
      ``Comparable`` is also the name of an :term:`interface` in Java that
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

   compiler
      :to-term: lexical analysis :label: phase
      :to-term: syntax analysis :label: phase
      :to-term: intermediate code generation :label: phase
      :to-term: code optimization :label: phase
      :to-term: code generation :label: phase

      A computer program that reads computer programs and converts
      them into a form that can be directly excecuted by some form of
      computer.
      The major phases in a compiler include :term:`lexical analysis`,
      :term:`syntax analysis`, :term:`intermediate code generation`,
      :term:`code optimization`, and :term:`code generation`.
      More broadly, a compiler can be viewed as :term:`parsing
      <parser>` the program to verify that it is syntactically
      correct, and then doing :term:`code generation` to convert the
      hig-level program into something that the computer can execute.

   compile-time polymorphism
      :to-term: Overloading :label: known as

      A form of :term:`polymorphism` known as Overloading.
      Overloaded methods have the same names, but different signatures
      as a method available elsewhere in the class.
      Compare to :term:`run-time polymorphism`.

   complete binary tree
      A binary tree where the nodes are filled in row by row, with the
      bottom row filled in left to right.
      Due to this requirement, there is only one tree of :math:`n`
      nodes for any value of :math:`n`.
      Since storing the records in an :term:`array` in row order leads to a
      simple mapping from a node's position in the array to its
      :term:`parent`, :term:`siblings <sibling>`, and
      :term:`children <child>`, the array representation is most
      commonly used to implement the complete binary tree.
      The :term:`heap` data structure is a complete binary tree with
      partial ordering constraints on the node values.

   complete graph
      A :term:`graph` where every :term:`vertex` connects to every
      other vertex.

   complex number
      In mathematics, an imaginary number, that is, a number with a
      real component and an imaginary component.

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

   composition
      Relationships between classes based on usage rather than
      :term:`inheritance <inherit>`, i.e. a **HAS-A** relationship.
      For example, some code in class 'A' has a :term:`reference` to some
      other class 'B'.

   computability
      A branch of computer science that deals with the theory of
      solving problems through computation.
      More specificially, it deals with the limits to what problems
      (functions) are computable.
      An example of a famous problem that cannot in principle be
      solved by a computer is the :term:`halting problem`.

   computation
      In a :term:`finite automata`, a computation is a sequence of
      :term:`configurations <configuration>` for some
      length :math:`n \geq 0`.
      In general, it is a series of operations that the machine
      performs.

   computational complexity theory
      A branch of the theory of computation in theoretical computer
      science and mathematics that focuses on classifying
      computational problems according to their inherent difficulty,
      and relating those classes to each other.
      An example is the study of :term:`NP-Complete` problems.

   configuration
      For a :term:`finite automata`, a complete specification for the
      current condition of the machine on some input string.
      This includes the current :term:`state` that the machine is in,
      and the current condition of the string, including which
      character is about to be processed.

   Conjunctive Normal Form
   CNF
      A :term:`Boolean expression` written as a series of
      :term:`clauses <clause>` that are AND'ed together.

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

   constructive induction
      A process for finding the
      :term:`closed form <closed-form solution>` for a
      :term:`recurrence relation`,
      that involves substituting in a guess for the closed form to
      replace the recursive part(s) of the recurrence.
      Depending on the goal (typically either to show that the
      hypothesized growth rate is right, or to find the precise
      constants), one then manipulates the resulting non-recursive
      equation.

   container
   container class
      A :term:`data structure` that stores a collection of
      :term:`records <record>`.
      Typical examples are :term:`arrays <array>`,
      :term:`search trees <search tree>`, and
      :term:`hash tables <hash table>`.

   context-free grammar
      A :term:`grammar` comprised only of productions of the form
      :math:`A \rightarrow x` where :math:`A` is a
      :term:`non-terminal` and :math:`x` is a series of one or more
      :term:`terminals <terminal>` and non-terminals.
      That is, the given non-terminal :math:`A` can be replaced at any
      time.

   context-free language
      The set of :term:`languages <language>` that can be defined by
      :term:`context-sensitive grammars <context-sensitive grammar>`.

   context-sensitive grammar
      A :term:`grammar` comprised only of productions of the form
      :math:`xAy \rightarrow xvy` where :math:`A` is a
      :term:`non-terminal` and :math:`x` and :math:`y` are each a
      series of one or more
      :term:`terminals <terminal>` and non-terminals.
      That is, the given non-terminal :math:`A` can be replaced only
      when it is within the proper context.

   countably infinite
   countable
      A :term:`set` is countably infinite if it contains a finite
      number of elements, or (for a set with an infinite number of
      elements) if there exists a one-to-one mapping from
      the set to the set of integers.

   cost
      The amount of resources that the solution consumes.

   cost model
      In :term:`algorithm analysis`, a definition for the cost of each
      :term:`basic operation` performed by the algorithm,
      along with a definition for the size of the input.
      Having these definitions allows us to calculate the :term:`cost`
      to run the algorithm on a given input, and from there determine
      the :term:`growth rate` of the algorithm.
      A cost model would be considered "good" if it yields predictions
      that conform to our understanding of reality.

   CPU
      Acronym for Central Processing Unit, the primary processing
      device for a computer.

   current position
      A property of some list ADTs, where there is maintained a
      "current position" state that can be referred to later.

   cycle
      :to-term: path :label: is
      :to-term: simple cycle :label: example

      In :term:`graph` terminology,
      a :term:`cycle` is a :term:`path` of length three or more that
      connects some :term:`vertex` :math:`v_1` to itself.

   cylinder
      A :term:`disk drive` normally consists of a stack of
      :term:`platters <platter>`.
      While this might not be so true today, traditionally all of the
      :term:`I/O heads <I/O head>` moved together during a
      :term:`seek` operation.
      Thus, when a given I/O head is positioned over a particular
      :term:`track` on a platter, the other I/O heads are also
      positioned over the corresponding track on their platters.
      That collection of tracks is called a cylinder.
      A given cylinder represents all of the data that can be read
      from all of the platters without doing another seek operation.

   cylinder index
      In the :term:`ISAM` system, a simple :term:`linear index` that
      stores the lowest key value stored in each :term:`cylinder`.

   cylinder overflow
      In the :term:`ISAM` system, this is space reserved for storing
      any records that can not fit in their respective
      :term:`cylinder`.

   DAG
      Abbreviation for :term:`directed acyclic graph`.

   data field
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a synonym for :term:`data member`.

   data item
      :to-term: data member :label: implemented by

      A piece of information or a record whose value is drawn from a type.

   data member
      :to-term: data field :label: synonym
      :to-term: attribute :label: synonym
      :to-term: instance variable :label: synonym

      The variables that together define the space required by a data
      item are referred to as data members.
      Some of the commonly used synonyms include :term:`data field`,
      :term:`attribute`, and :term:`instance variable`.

   data structure
      :to-term: serialization :label: concept
      :to-term: abstract data type :label: implements

      The implementation for an :term:`ADT`.

   data type
      :to-term: abstract data type :label: implemented by
      :to-term: aggregate type :label: type
      :to-term: simple type :label: type
      :to-term: list :label: example
      :to-term: array :label: example

      A type together with a collection of operations to manipulate
      the type.

   deallocated
   deallocation
      Free the memory allocated to an unused object.

   decision tree
      A theoretical construct for modeling the behavior of algorithms.
      Each point at which the algorithm makes a decision (such as an
      if statement) is modeled by a branch in the tree that represents
      the algorithms behavior.
      Decision trees can be used in
      :term:`lower bounds proofs <lower bounds proof>`,
      such as the proof that sorting requires
      :math:`\Omega(n \log n)` comparisons in the :term:`worst case`.

   decision problem
      A problem whose output is either "YES" or "NO".

   deep copy
      Copying the actual content of a :term:`pointee`.

   degree
      In :term:`graph` terminology, the degree for a :term:`vertex` is
      its number of :term:`neighbors <neighbor>`.
      In a :term:`directed graph`, the :term:`in degree` is the number
      of edges directed into the vertex, and the :term:`out degree` is
      the number of edges directed out of the vertex.
      In :term:`tree` terminology, the degree for a :term:`node` is
      its number of :term:`children <child>`.

   delegation mental model for recursion
      A way of thinking about the process of :term:`recursion`.
      The recursive function "delegates" most of the work when it
      makes the recursive call.
      The advantage of the delegation mental model for recursion is
      that you don't need to think about how the delegated task is
      performed.
      It just gets done.

   dense graph
      A :term:`graph` where the actual number of :term:`edges <edge>`
      is a large fraction of the possible number of edges.
      Generally, this is interpreted to mean that the :term:`degree`
      for any :term:`vertex` in the graph is relatively high.

   depth
     The depth of a node :math:`M` in a tree is the length
     of the path from the root of the tree to :math:`M`.

   depth-first search
     :to-term: DFS :label: abbreviation
     :to-term: depth-first search tree :label: generates

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

   dereference
      Accessing the value of the :term:`pointee` for some
      :term:`reference` variable.
      Commonly, this happens in a language like Java when using the
      "dot" operator to access some field of an object.

   derivation
      In formal languages, the process of executing a series of
      :term:`production rules <production rule>` from a :term:`grammar`.
      A typical example of a derivation would be the series of
      productions executed to go from the :term:`start symbol` to a
      given string.

   descendant
      In a tree, the set of all nodes that have a node :math:`A` as an
      :term:`ancestor` are the descendants of :math:`A`.
      In other words, all of the nodes that can be reached from
      :math:`A` by progressing downwards in tree.
      Another way to say it is: The
      :term:`children <child>` of :math:`A`, their children, and so
      on.

   deserialization
      The process of returning a :term:`serialized <serialization>`
      representation for a data structure back to its original
      in-memory form.

   design pattern
      :to-term: Composite design pattern :label: example
      :to-term: flyweight :label: example
      :to-term: strategy :label: example
      :to-term: visitor :label: example

      An abstraction for describing the design of programs,
      that is, the interactions of objects and classes.
      Experienced software designers learn and reuse patterns
      for combining software components, and design patterns allow
      this design knowledge to be passed on to new programmers more quickly.

   deterministic
      Any :term:`finite automata` in which, for every pair of
      :term:`state` and symbol, there is only a single transition.
      This means that whenever the machine is in a given state and
      sees a given symbol, only a single thing can happen.
      This is in contrast to a :term:`non-deterministic` finite
      automata, which has at least one state with multiple transitions
      on at least one symbol.

   deterministic algorithm
      An algorithm that does not involve any element of randomness,
      and so its behavior on a given input will always be the same.
      This is in contrast to a :term:`randomized algorithm`.

   Deterministic Finite Automata
   Deterministic Finite Acceptor
   DFA
      An :term:`automata` or abstract machine that can process an
      input string (shown on a tape) from left to right.
      There is a control unit (with :term:`states <state>`),
      behavior defined for what to do when in a given state and with a
      given symbol on the current square of the tape.
      All that we can "do" is change state before going to the next
      letter to the right.

   DFS
      Abbreviation for :term:`depth-first search`.

   diagonalization argument
      A proof technique for proving that a set is
      :term:`uncountably infinite`.
      The approach is to show that, no matter what order the elements
      of the set are put in, a new element of the set can be
      constructed that is not in that ordering.
      This is done by changing the :math:`i` th value or position of
      the element to be different from that of the :math:`i` th
      element in the proposed ordering.

   dictionary
      An abstract data type or :term:`interface` for a data structure or
      software subsystem that supports insertion, search, and deletion
      of records.

   dictionary search
      A close relative of an :term:`interpolation search`.
      In a classical (paper) dictionary of words in a natural
      language, there are markings for where in the dictionary the
      words with a given letter start.
      So in typical usage of such a dictionary, words are found by
      opening the dictionary to some appropriate place within the
      pages that contain words starting with that letter.

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

   direct access
      A storage device, such as a disk drive, that has some ability to
      move to a desired data location more-or-less directly.
      This is in contrast to a :term:`sequential access` storage
      device such as a tape drive.

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

   directed edge
      An :term:`edge` that goes from :term:`vertex` to another.
      In contrast, an :term:`undirected edge` simply links to vertices
      without a direction.

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


   Discrete Fourier Transform
   DFT
      Let :math:`a = [a_0, a_1, ..., a_{n-1}]^T` be a vector that
      stores the coefficients for a polynomial being evaluated.
      We can then do the calculations to evaluate the polynomial at
      the :math:`n` th :math:`roots of unity <nth roots of unit>`
      by multiplying the :math:`A_{z}`
      matrix by the coefficient vector.
      The resulting vector :math:`F_{z}` is called the
      Discrete Fourier Transform (or DFT) for the polynomial.

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

   disk controller
      The control mechanism for a :term:`disk drive`.
      Responsible for the action of reading or writing a :term:`sector`
      of data.

   disk drive
      :to-term: peripheral storage :label: example of
      :to-term: disk I/O :label: Read/write
      :to-term: block :label: unite of storage
      :to-term: sector :label: unite of space

      An example of :term:`peripheral storage` or
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

   divide-and-conquer recurrences
      A common form of :term:`recurrence relation`
      that have the form

      .. math::

         {\bf T}(n) = a{\bf T}(n/b) + cn^k; \quad {\bf T}(1) = c

      where :math:`a`, :math:`b`, :math:`c`, and :math:`k` are constants.
      In general, this recurrence describes a problem of size :math:`n`
      divided into :math:`a` subproblems of size :math:`n/b`,
      while :math:`cn^k` is the amount of work necessary to combine the
      partial solutions.

   divide-and-guess
      A technique for finding a :term:`closed-form solution` to a
      :term:`summation` or :term:`recurrence relation`.

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

   double hashing
      A :term:`collision resolution` method. A second hash
      function is used to generate a value :math:`c` on the key.
      That value is then used by this key as the step size in
      :term:`linear probing by steps`.
      Since different keys use different step sizes (as generated by
      the second hash function), this process avoids the clustering
      caused by standard linear probing by steps.

   double rotation
      A type of :term:`rebalancing operation` used by the
      :term:`Splay Tree` and :term:`AVL Tree`.

   doubly linked list
      A :term:`linked list` implementation variant where each list
      node contains access pointers to both the previous element and
      the next element on the list.

   DSA
      Abbreviation for Data Structures and Algorithms.

   dynamic
      Something that is changes (in contrast to :term:`static`).
      In computer programming, dynamic normally refers to something
      that happens at run time.
      For example, run-time analysis is analysis of the program's
      behavior, as opposed to its (static) text or structure
      Dynamic binding or dynamic memory allocation occurs at run time.

   dynamic allocation
      :to-term: node :label: example

      The act of creating an object from :term:`free store`.
      In C++, Java, and JavaScript, this is done using the ``new``
      operator.

   dynamic array
      Arrays, once allocated, are of fixed size. A dynamic array puts
      an :term:`interface` around the array so as to appear to allow the array
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
      :to-term: Floyd's algorithm :label: example

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

   edit distance
      Given strings :math:`S` and :math:`T`, the edit distance is
      a measure for the number of editing steps required to convert
      :math:`S` into :math:`T`.

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

   equidistribution property
      In random number theory, this means that a given series of
      random numbers cannot be described more briefly than simply
      listing it out.

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

   evaluation
      The act of finding the value for a polynomial at a given point.

   exact-match query
      Records are accessed by unique identifier.

   exceptions
      Exceptions are techniques used to predict possible runtime
      errors and handle them properly.

   exchange
      A swap of adjacent records in an :term:`array`.

   exchange sort
      A sort that relies solely on exchanges (swaps of adjacent
      records) to reorder the list.
      :term:`Insertion Sort <insertion sort>` and
      :term:`Bubble Sort` are examples of exchange sorts.
      All exchange sorts require
      :math:`\Theta(n^2)` time in the :term:`worst case`.

   expanding the recurrence
      A technique for solving a :term:`recurrence relation`.
      The idea is to replace the recursive part of the recurrence with
      a copy of recurrence.

   exponential growth rate
      A :term:`growth rate` function where :math:`n` (the input size)
      appears in the exponent. For example, :math:`2^n`.

   expression tree
      A :term:`tree` structure meant to represent a mathematical expression.
      :term:`Internal nodes <internal node>` of the expression tree
      are operators in the expression, with the subtrees being the
      sub-expressions that are its operand.
      All :term:`leaf nodes <leaf node>` are operands.

   extent
      A physically contiguous block of :term:`sectors <sector>` on a
      :term:`disk drive` that are all part of a given disk file.
      The fewer extents needed to store the data for a disk file,
      generally the fewer :term:`seek` operations that will be
      required to process a series of :term:`disk access` operations
      on that file.

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

   family of languages
      Given some class or type of :term:`finite automata`
      (for example, the :term:`deterministic finite automata`),
      the set of languages accepted by that class of finite automata
      is called a family.
      For example, the :term:`regular languages <regular language>` is
      a family defined by the DFAs.

   file allocation table
      A legacy file system architecture orginially developed for DOS
      and then used in Windows.
      It is still in use in many small-scale peripheral devices such
      as USB memory sticks and digital camera memory.

   file manager
      A part of the :term:`operating system`
      responsible for taking requests for data from a
      :term:`logical file` and mapping those requests to the
      physical location of the data on disk.

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
      and an old terminology for the queue is "FIFO list".

   final state
      A required element of any :term:`acceptor <finite state acceptor>`.
      When computation on a string ends in a final state, then the
      machine accepts the string.
      Otherwise the machine rejects the string.

   FIND
      One half of the :term:`UNION/FIND` algorithm for managing
      :term:`disjoint sets`.
      It is the process of moving upwards in a
      tree to find the tree's root.

   Finite State Machine
   FSM
   Finite State Automata
   FSA
   Finite Automata
      :to-term: state machine :label: synonym
      :to-term: states :label: consists of
      :to-term: accepting states <accepting states> :label: consists of
      :to-term: Deterministic Finite Automata :label: example

      Any abstract state machine, generally represented as a graph
      where the nodes are the :term:`states <state>`, and the edges
      represent transitions between nodes that take place when the
      machine is in that node (state) and sees an appropriate input.
      See, as an example, :term:`Deterministic Finite Automata`.

   Finite State Acceptor
      A simple type of :term:`finite state automata`, an acceptor's
      only ability is to accept or reject a string.
      So, a finite state acceptor does not have the ability to modify
      the input tape.
      If computation on the string ends in a :term:`final state`,
      then the the string is accepted, otherwise it is rejected.

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
      :to-term: k-path :label: uses

      An algorithm to solve the
      :term:`all-pairs shortest paths problem`.
      It uses the :term:`dynamic programming` algorithmic technique,
      and runs in :math:`\Theta(n^3)` time.
      As with any :term:`dynamic programming` algorithm,
      the key issue is to avoid duplicating work by using proper
      bookkeeping on the algorithm's progress through the solution space.
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

   flyweight
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
      The various instances of :term:`references <reference>` to a
      specific form of "C" are called flyweights.
      Flyweights can also be used to implement the empty leaf nodes
      of the :term:`bintree` and :term:`PR quadtree`.

   folding method
      In :term:`hashing`, an approach to implementing a
      :term:`hash function`.
      Most typically used when the key is a string, the folding method
      breaks the string into pieces (perhaps each letter is a piece,
      or a small series of letters is a piece), converts the letter(s)
      to an integer value (typically by using its underlying encoding
      value), and summing up the pieces.

   Ford and Johnson sort
      A sorting algorithm that is close to the theoretical minimum
      number of key comparisons necessary to sort.
      Generally not considered practical in practice due to the fact
      that it is not efficient in terms of the number of records that
      need to be moved.
      It consists of first sorting pairs of nodes into winners and
      losers (of the pairs comparisons), then (recursively)
      sorting the winners of the pairs, and then finally carefully
      selecting the order in which the losers are added to the chain
      of sorted items.

   forest
      A collection of one or more :term:`trees <tree>`.

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
      A connected, :term:`undirected graph` with no simple cycles.
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

   grammar
      A formal definition for what strings make up a :term:`language`,
      in terms of a set of :term:`production rules <production rule>`.

   graph
      :to-term: edges <edge> :label: contains
      :to-term: vertices <vertex> :label: contains
      :to-term: adjacency matrix :label: implemented by
      :to-term: adjacency list :label: implemented by
      :to-term: traversal :label: problems
      :to-term: topological sort :label: problems
      :to-term: shortest paths :label: problems
      :to-term: dense graph :label: types
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
      :to-term: lower bound :label: type
      :to-term: upper bound :label: type

      In :term:`algorithm analysis`, the rate at which the cost
      of the :term:`algorithm` grows as the size of its input grows.

   guess-and-test
      A technique used when trying to determine the
      :term:`closed-form solution` for a
      :term:`summation` or :term:`recurrence relation`.
      Given a hypothesis for the closed-form solution,
      if it is correct, then it is often relatively easy to prove that
      using :term:`induction <proof by induction>`.

   guided traversal
      A :term:`tree traversal` that does not need to visit every node
      in the tree.
      An example would be a :term:`range query` in a :term:`BST`.

   halt state
      In a :term:`finite automata`, a designated :term:`state` which
      causes the machine to immediately halt when it is entered.

   halted configuration
      A halted configuration occurs in a :term:`Turing machine` when
      the machine transitions into the :term:`halt state`.

   halting problem
      The halting problem is to answer this question:
      Given a computer program :math:`P` and an
      input :math:`I`, will program :math:`P` halt when executed on
      input :math:`I`?
      This problem has been proved impossible to solve in the general
      case.
      Thus, it is an example of an :term:`unsolveable problem`.

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

   hanging configuration
      A hanging configuration occurs in a :term:`Turing machine` when
      the I/O head moves to the left from the left-most square of the
      tape, or when the machine goes into an infinite loop.

   hard algorithm
      "Hard" is traditionally defined in relation to running time, and
      a "hard" algorithm is defined to be an algorithm with exponential
      running time.

   hard problem
      "Hard" is traditionally defined in relation to running time, and
      a "hard" problem is defined to be one whose best known algorithm
      requires exponential running time.


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
      :to-term: hash function :label: uses
      :to-term: bucket hashing :label: type
      :to-term: closed hash system :label: type
      :to-term: open hash system :label: type

      The implementation for search based on hash lookup in a
      :term:`hash table`.
      The :term:`search key` is processed by a
      :term:`hash function`, which returns a position in a
      :term:`hash table`, which hopefully is the correct position in
      which to find the record corresponding to the search key.

   hash table
      The data structure (usually an :term:`array`) that stores data
      records for lookup using :term:`hashing`.

   hashing
      :to-term: hash table :label: has
      :to-term: hash function :label: has
      :to-term: collision resolution policy :label: has

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
      :to-term: complete binary tree :label: is
      :to-term: priority queue :label: used in
      :to-term: max heap :label: example
      :to-term: min heap :label: example

      This term has two different meanings.
      Uncommonly, it is a synonym for :term:`free store`.
      Most often it is used to refer to a particular data structure.
      This data structure is a :term:`complete binary tree` with the
      requirement that every :term:`node` has a value greater than its
      :term:`children <child>` (called a :term:`max heap`), or else
      the requirement that every node has a value less than its
      children (called a :term:`min heap`).
      Since it is a complete binary tree, a heap is nearly always
      implemented using an :term:`array` rather than an explicit tree
      structure.
      To add a new value to a heap, or to remove the extreme value
      (the max value in a max-heap or min value in a min-heap) and
      update the heap,
      takes :math:`\Theta(\log n)` time in the :term:`worst case`.
      However, if given all of the values in an unordered array,
      the values can be re-arranged to form a heap in only
      :math:`\Theta(n)` time.
      Due to its space and time efficiency, the heap is a
      popular choice for implementing a :term:`priority queue`.

   heapsort
      :to-term: replacement selection :label: variant
      :to-term: heap :label: concept of

      A sorting algorithm that costs :math:`\Theta(n \log n)` time in
      the :term:`best <best case>`, :term:`average <average case>`,
      and :term:`worst <worst case>` cases.
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

   heuristic algorithm
      A type of :term:`approximation algorithm`, that uses a
      :term:`heuristic` to find a good, but not necessarily cheapest,
      solution to an :term:`optimization problem`.

   home position
      In :term:`hashing`, a synonym for :term:`home slot`.

   home slot
      In :term:`hashing`, this is the :term:`slot` in the
      :term:`hash table` determined for a given key by the
      :term:`hash function`.

   homogeneity
      In a :term:`container` class, this is the property that all
      objects stored in the ncontainer are of the same class.
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

   in degree
      In :term:`graph` terminology, the in degree for a :term:`vertex` is
      the number of edges directed into the vertex.

   information theoretic lower bound
      A :term:`lower bound` on the amount of resources needed to solve
      a :term:`problem` based on the number of bits of information
      needed to uniquely specify the answer.
      Sometimes referred to as a "Shannon theoretic lower bound" due
      to Shannon's work on information theory and entropy.
      An example is that sorting has a lower bound of
      :math:`\Omega(\log_2 n!)` because there are :math:`n!` possible
      orderings for :math:`n` values.
      This observation alone does not make the lower bound tight,
      because it is possible that no algorithm could actually reach
      the information theory lower limit.

   inode
      Short for "index node".
      In UNIX-style file systems, specific disk :term:`sectors <sector>`
      that hold indexing information to define the layout of the file
      system.

   image-space decomposition
      A from of :term:`key-space decomposition` where the
      :term:`key space` splitting points is predetermined (typically
      by splitting in half).
      For example, a :term:`Huffman coding tree` splits the letters
      being coded into those with codes that start with 0 on the left
      side, and those with codes that start with 1 on the right side.
      This regular decomposition of the key space is the basis for a
      :term:`trie` data structure.
      An image-space decomposition is in opposition to an
      :term:`object-space decomposition`.

   incident
      In :term:`graph` terminology,
      an edge connecting two vertices is said to be incident with
      those vertices.
      The two vertices are said to be :term:`adjacent`.

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
      :to-term: base class :label: has
      :to-term: subclass :label: has

      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      the process by which a :term:`subclass` gains
      :term:`data members <data member>` and :term:`methods <method>`
      from a :term:`base class`.

   initial state
      A synonym for :term:`start state`.

   inorder traversal
      In a :term:`binary tree`, a :term:`traversal` that first
      :term:`recursively <recursion>` :term:`visits <visit>` the left
      :term:`child`, then visits the :term:`root`,
      and then recursively visits the right child.
      In a :term:`binary search tree`, this traversal will
      :term:`enumerate <enumeration>` the nodes in sorted order.

   Insertion Sort
      A sorting algorithm with :math:`\Theta(n^2)`
      :term:`average <average case>` and :term:`worst case` cost,
      and :math:`Theta(n)` :term:`best case` cost.
      This best case cost makes it useful when we have reason to
      expect the input to be nearly sorted.

   instance variable
      In :term:`object-oriented programming <object-oriented programming paradigm>`,
      a synonym for :term:`data member`.

   integer function
      Any function whose input is an integer and whose output is an
      integer. It can be proved by
      :term:`diagonalization <diagonalization argument>` that the
      set of integer functions is :term:`uncountably infinite`.

   inter-sector gap
      On a disk drive, a physical gap in the data that occurs between
      the :term:`sectors <sector>`.
      This allows the :term:`I/O head` detect the end of the sector.

   interface
      An interface is a class-like structure that only contains method
      signatures and fields. An interface does not contain an implementation
      of the methods or any :term:`data members <data member>`.

   intermediate code
      A step in a typical :term:`compiler` is to transform the
      original high-level language into a form on which it is easier
      to do other stages of the process.
      For example, some compilers will transform the original
      high-level source code into :term:`assembly code` on which it
      can do :term:`code optimization`, before translating it into its final
      executable form.

   intermediate code generation
      :to-term: Parse tree :label: walks through
      :to-term: intermediate code :label: produces

      A phase in a :term:`compiler`, that walks through a
      :term:`parse tree` to produce simple :term:`assembly code`.

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

   interpolation
      The act of finding the coefficients of a polynomial, given the
      values at some points.
      A polynomal of degree :math:`n-1` requires :math:`n` points to
      interpolate the coefficients.

   interpolation search
      Given a sorted array, and knowing the first and last :term:`key`
      values stored in some subarray known to contain
      :term:`search key` :math:`K`, interpolation search will compute
      the expected location of :math:`K` in the subarray as a fraction
      of the distance between the known key values.
      So it will next check that computed location, thus narrowing the
      search for the next iteration.
      Given reasonable key value distribution, the :term:`average
      case` for interpolation search will be
      :math:`\Theta(\log \log n)`, or better than the expected cost of
      :term:`binary search`.
      Nonetheless, binary search is expected to be faster in nearly
      all practical situations due to the small difference between the
      two costs, combined with the higher constant factors required to
      implement interpolation search as compared to binary search.

   interpreter
      In contrast to a :term:`compiler` that translates a high-level
      program into something that can be repeatedly executed to
      perform a computation, an interpreter directly performs
      computation on the high-level langauge.
      This tends to make the computation much slower than if it were
      performed on the directly executable version produced by a
      compiler.

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

   jump search
      An algorithm for searching a sorted list, that falls between
      :term:`sequential search` and :term:`binary search` in both
      computational cost and conceptual complexity.
      The idea is to keep jumping by some fixed number of positions
      until a value is found that is bigger than :term:`search key`
      :math:`K`, then do a sequential search over the subarray that is
      now known to contain the search key.
      The optimal number of steps to jump will be :math:`\sqrt{n}` for
      an array of size :math:`n`, and the :term:`worst case` cost will
      be :math:`\Theta(\sqrt{n})`.

   K-ary tree
      A type of :term:`full tree` where every internal node has
      exactly :math:`K` :term:`children <child>`.

   k-path
      In :term:`Floyd's algorithm`, a k-path is a path between two
      vertices :math:`i` and :math:`j` that can only go through
      vertices with an index value less than or equal to :math:`k`.

   kd tree
      :to-term: discriminator :label: uses

      A :term:`spatial data structure` that uses a binary tree to
      store a collection of data records based on their (point)
      location in space.
      It uses the concept of a :term:`discriminator` at each level to
      decide which single component of the
      :term:`multi-dimensional search key` to branch on at that level.
      It uses a :term:`key-space decomposition`, meaning that all data
      records in the left subtree of a node have a value on the
      corresponding discriminator that is less than that of the node,
      while all data records in the right subtree have a greater
      value.
      The :term:`bintree` is the :term:`image-space decomposition`
      analog of the kd tree.

   key
      :to-term: key space :label: has

      A field or part of a larger record used to represent that record
      for the purpose of searching or comparing.
      Another term for :term:`search key`.

   key sort
      :to-term: key :label: uses

      Any sorting operation applied to a collection of
      :term:`key-value pairs <key-value pair>` where the value in this
      case is a :term:`reference` to a complete record (that is, a
      pointer to the record in memory or a position for a record on
      disk).
      This is in contrast to a sorting operation that works directly
      on a collection of records.
      The intention is that the collection of key-value pairs is far
      smaller than the collection of records themselves.
      As such, this might allow for an :term:`internal sort` when
      sorting the records directly would require an :term:`external
      sort`.
      The collection of key-value pairs can also act as an
      :term:`index <indexing>`.

   key space
      The range of values that a :term:`key` value may take on.

   key-space decomposition
      :to-term: object-space decomposition :label: type
      :to-term: image-space decomposition :label: type

      The idea that the range for a :term:`search key` will be split
      into pieces.
      There are two general approaches to this:
      :term:`object-space decomposition` and
      :term:`image-space decomposition`.

   key-value pair
      A standard solution for solving the problem of how to relate a
      :term:`key` value to a record (or how to find the key for a
      given record) within the context of a particular
      :term:`index <indexing>`.
      The idea is to simply store as records in the index pairs of
      keys and records.
      Specifically, the index will typically store a copy of the key
      along with a :term:`reference` to the record.
      The other standard solution to this problem is to pass a
      :term:`comparator` function to the index.

   knapsack problem
      While there are many variations of this problem, here is a
      typical version: Given knapsack of a fixed size, and a
      collection of objects of various sizes, is there a subset of the
      objects that exactly fits into the knapsack?
      This problem is known to be :term:`NP-complete`, but can be
      solved for problem instances in practical time relatively
      quickly using :term:`dynamic programming`.
      Thus, it is considered to have
      :term:`pseudo-polynomial <pseudo polynomial>` cost.
      An :term:`optimization problem` version is to find the subset
      that can fit with the greatest amount of items, either in terms of
      their total size, or in terms of the sum of values associated
      with each item.

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

   language
      A set of strings.

   Las Vegas algorithms
      A form of :term:`randomized algorithm`.
      We always find the maximum value, and "usually" we find it fast.
      Such algorithms have a guaranteed result, but do not guarantee fast
      running time.

   leaf node
      In a :term:`binary tree`, leaf node is any node that has two
      empty :term:`children <child>`.
      (Note that a binary tree is defined so that every
      node has two children, and that is why the leaf node has to have
      two empty children, rather than no children.)
      In a general tree, any node is a leaf node if it has no children.

   least frequently used
       Abbreviated :term:`LFU`, it is a :term:`heuristic` that can be
       used to decide which :term:`buffer` in a :term:`buffer pool`
       to :term:`flush` when data in the buffer pool must be
       replaced by new data being read into a
       :term:`cache <caching>`.
       However, :term:`least recently used` is more popular than LFU.
       Analogous to the :term:`frequency count` heuristic for
       maintaining a :term:`self-organizing list`.

   least recently used
       Abbreviated :term:`LRU`, it is a popular :term:`heuristic` to
       use for deciding which :term:`buffer` in a :term:`buffer pool`
       to :term:`flush` when data in the buffer pool must be
       replaced by new data being read into a :term:`cache
       <caching>`.
       Analogous to the :term:`move-to-front` heuristic for
       maintaining a :term:`self-organizing list`.

   left recursive
      In automata theory, a :term:`production` is left recursive
      if it is of the form :math:`A \rightarrow Ax`,
      :math:`A \in V, x \in (V \cup T)^*` where :math:`V` is the set
      of :term:`non-terminals <non-terminal>` and :math:`T` is the set
      of :term:`terminals <terminal>` in the :term:`grammar`.

   length
      In a :term:`list`, the number of elements. In a string, the
      number of characters.

   level
      In a tree, all nodes of :term:`depth` :math:`d` are at
      level :math:`d` in the tree.
      The root is the only node at level 0, and its depth is 0.

   lexical analysis
      :to-term: interpreter :label: is

      A phase of a :term:`compiler` or :term:`interpreter` responsible
      for reading in characters of the program or language and grouping
      them into :term:`tokens <token>`.

   lexical scoping
      Within programming languages, the convention of allowing access
      to a variable only within the block of code in which the
      variable is defined.
      A synonym for :term:`static scoping`.

   lifetime
      For a variable, lifetime is the amount of time it will exist
      before it is destroyed.

   linear congruential method
      In random number theory, a process for computing the next number
      in a :term:`pseudo-random <pseudo random>` sequence.
      Starting from a :term:`seed`, the next term :math:`r(i)` in the
      series is calculated from term :math:`r(i-1)` by the equation

      .. math::

         r(i) = (r(i-1)\times b) \bmod t

      where :math:`b` and :math:`t` are constants.
      These constants must be well chosen for the resulting series of
      numbers to have desireable properties as a random number sequence.

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

   linear probing
      In :term:`hashing`, this is the simplest
      :term:`collision resolution` method.
      Term :math:`i` of the :term:`probe sequence` is simply
      :math:`i`, meaning that collision resolution works by moving
      sequentially through the hash table from the :term:`home slot`.
      While simple, it is also inefficient, since it quickly leads to
      certain free :term:`slots <slot>` in the hash table having
      higher probability of being selected during insertion or
      search.

   linear probing by steps
      In :term:`hashing`, this :term:`collision resolution` method is
      a variation on simple :term:`linear probing`.
      Some constant :math:`c` is defined such that
      term :math:`i` of the :term:`probe sequence` is
      :math:`ci`.
      This  means that collision resolution works by moving
      sequentially through the hash table from the :term:`home slot`
      in steps of size :math:`c`.
      While not much improvement on linear probing, it forms the basis
      of another collision resolution method called
      :term:`double hashing`, where each key uses a value for
      :math:`c` defined by a second :term:`hash function`.

   linear search
      Another name for :term:`sequential search`.

   link node
      A widely used supporting object that forms the basic
      building block for a :term:`linked list` and similar
      :term:`data structures <data structure>`.
      A link node contains one or more fields that store data, and a
      :term:`pointer` or :term:`reference` to another link node.

   linked list
      An implementation for the list ADT that uses
      :term:`dynamic allocation`
      of :term:`link nodes <link node>` to store the list elements.
      Common variants are the :term:`singly linked list`,
      :term:`doubly linked list` and :term:`circular list`.
      The :term:`overhead` required is the pointers in each link node.

   linked stack
      Analogous to a :term:`linked list`, this uses
      :term:`dynamic allocation` of nodes to
      store the elements when implementing the stack ADT.

   list
      :to-term: array-based list :label: implements
      :to-term: linked list :label: implements

      A finite, ordered sequence of :term:`data items <data item>` known as
      :term:`elements <element>`.
      This is close to the mathematical concept of a :term:`sequence`.
      Note that "ordered" in this definition means that the list
      elements have position.
      It does not refer to the relationship
      between :term:`key` values for the list elements (that is,
      "ordered" does not mean "sorted").

   literal
      In a :term:`Boolean expression`, a :term:`literal` is a
      :term:`Boolean variable` or its negation.
      In the context of compilers, it is any constant value.
      Similar to a :term:`terminal`.

   load factor
      In :term:`hashing` this is the fraction of the :term:`hash
      table` :term:`slots <slot>` that contain a record.
      Hash systems usually try to keep the load factor below 50%.

   local variable
      :to-term: automatic variable :label: synonym
      :to-term: stack variable :label: synonym

      A variable declared within a function or method.
      It exists only from the time when the function is called to when
      the function exits.
      When a function is suspended (due to calling another function),
      the function's local variables are stored in an
      :term:`activation record` on the :term:`runtime stack`.

   locality of reference
      :to-term: 80/20 rule :label: example use

      The concept that accesses within a collection of records is not
      evenly distributed.
      This can express itself as some small fraction of the records
      receiving the bulk of the accesses (:term:`80/20 rule`).
      Alternatively, it can express itself as an increased probability
      that the next or future accesses will come close to the most
      recent access.
      This is the fundamental property for success of :term:`caching`.

   local storage
      local storage.

   logarithm
      The `logarithm` of base :math:`b` for value :math:`y` is the power
      to which :math:`b` is raised to get :math:`y`.

   logical file
      In :term:`file processing`, the programmer's view of a
      :term:`random access` file stored on :term:`disk <disk drive>`
      as a contiguous series of bytes, with those bytes possibly
      combining to form data records.
      This is in contrast to the :term:`physical file`.

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
      In :term:`algorithm analysis`, a :term:`growth rate` that is
      always less than or equal to the that of the
      :term:`algorithm` in question.
      In practice, this is the fastest-growing function that we know
      grows no faster than all but a constant number of inputs.
      It could be a gross under-estimate of the truth.
      Since the lower bound for the algorithm can be very different
      for different situations (such as the :term:`best case` or
      :term:`worst case`), we typically have to specify which
      situation we are referring to.

   lower bounds proof
      :to-term: adversary argument :label: example
      :to-term: sorting lower bound :label: example
      :to-term: search lower bound :label: example

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
      An :term:`array` of bits or values called the :term:`mark array` is
      often maintained for this purpose.

   mark/sweep algorithm
      An algorithm for :term:`garbage collection`.
      All accessible variables, and any space that is reachable by a
      chain of pointers from any accessible variable, is "marked".
      Then a sequential sweep of all memory in the pool is made.
      Any unmarked memory locations are assumed to not be needed by
      the program and can be considered as free to be reused.

   master theorem
      A theorem that makes it easy to solve
      :term:`divide-and-conquer recurrences`.

   matching
      In graph theory, a pairing (or match) of various nodes in a graph.

   matching problem
      Any problem that involves finding a :term:`matching` in a graph
      with some desired property.
      For example, a well-known :term:`NP-complete` problem is to find
      a :term:`maximum match` for an undirected graph.

   max heap
      A :term:`heap` where every :term:`node` has a :term:`key` value
      greater than its :term:`children <child>`.
      As a consequence, the node with maximum key value is
      at the :term:`root`.

   maximal match
      In a graph, any :term:`matching` that leaves no pair of
      unmatched vertices that are connected.
      A maximal matching is not necessarily a
      :term:`maximum match`.
      In other words, there might be a larger matching than the
      maximal matching that was found.

   maximum lower bound
      The :term:`lower bound` for the :term:`problem` of finding the
      maximum value in an unsorted list is :math:`\Omega(n)`.

   maximum match
      In a graph, the largest possible :term:`matching`.

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
      the :term:`best <best case>`, :term:`average <average case>`,
      and :term:`worst <worst case>` cases.
      Conceptually it is simple:
      Split the list in half, sort the halves, then merge them
      together.
      It is a bit complicated to implement efficiently on an :term:`array`.

   member
      :to-term: element :label: synonym

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
      :to-term: primary storage :label: storage type
      :to-term: secondary storage :label: storage type

      The concept that a computer system stores data in a range of
      storage types that range from fast but expensive
      (:term:`primary storage`) to slow but cheap
      (:term:`secondary storage`).
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
      :to-term: buddy method :label: example

      Functionality for managing a :term:`memory pool`.
      Typically, the memory pool is viewed as an :term:`array` of bytes by the
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

   merge insert sort
      A synonym for the :term:`Ford and Johnson sort`.

   message
      In a :term:`memory manager` implementation
      (particularly a memory manager implemented with a
      :term:`message passing` style of
      :term:`interface`), the message is the data that the :term:`client` of
      the memory manager wishes to have stored in the
      :term:`memory pool`.
      The memory manager will reply to the client by returning a
      :term:`handle` that defines the location and size of the message
      as stored in the memory pool.
      The client can later recover the message by passing the handle
      back to the memory manager.

   message passing
      A common approach to implementing the :term:`ADT` for a
      :term:`memory manager` or :term:`buffer pool`, where the
      contents of a :term:`message` to be stored is explicitly
      passed between the client and the memory manager.
      This is in contrast to a :term:`buffer passing` approach.

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

   mid-square method
      In :term:`hashing`, an approach to implementing a
      :term:`hash function`.
      The key value is squared, and some number of bits from the
      middle of the resulting value are extracted as the hash code.
      Some care must be taken to extract bits that tend to actually be
      in the middle of the resulting value, which requires some
      understanding of the typical key values.
      When done correctly, this has the advantage of having the hash
      code be affected by all bits of the key

   min heap
      A :term:`heap` where every :term:`node` has a :term:`key` value
      less than its :term:`children <child>`.
      As a consequence, the node with minimum key value is
      at the :term:`root`.

   minimal-cost spanning tree
      :to-term: Kruskal's algorithm :label: algorithms
      :to-term: Prim's algorithm :label: algorithms
      :to-term: MCST :label: abbreviation
      :to-term: MST :label: abbreviation
      :to-term: cycle :label: never have
      :to-term: tree :label: is a

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
      Abbreviation for the :term:`modulus` function.

   model
      A simplification of reality that preserves only the essential
      elements.
      With a model, we can more easily focus on and reason about these
      essentials.
      In :term:`algorithm analysis`, we are especially concerned with
      the :term:`cost model` for measuring the cost of an algorithm.

   modulus
      :to-term: mod :label: abbreviation

      The modulus function returns the
      remainder of an integer division.
      Sometimes written :math:`n \bmod m` in mathematical expressions,
      the syntax in many programming languages is ``n % m``.

   Monte Carlo algorithms
      A form of :term:`randomized algorithm`.
      We find the maximum value fast, or we don't get an answer at all
      (but fast).
      While such algorithms have good running time, their result is not
      guaranteed.

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
      But a multi-dimensional key could be used to organize data within
      non-spatial dimensions, such as temperature and time.

   multi-dimensional search structure
      :to-term: multi-dimensional search key :label: uses

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
      :to-term: bag :label: synonym

      A list that may contain sublists.
      This term is sometimes used as a synonym to the term
      :term:`bag`.

   natural numbers
      Zero and the positive integers.

   necessary fallacy
      A common mistake in a
      :term:`lower bounds proof` for a problem, where the proof makes
      an inappropriate assumption that any algorithm must operate in
      some manner (typically in the way that some known algorithm
      behaves).

   neighbor
      :to-term: adjacent :label: is
      :to-term: graph :label: context

      In a :term:`graph`, a :term:`node` :math:`w` is said to be a
      neighbor of :term:`node` :math:`v` if there is an :term:`edge`
      from :math:`v` to :math:`w`.

   non-deterministic
      In a :term:`finite automata`, at least one :term:`state` has
      multiple transitions on at least one symbol.
      This means that it is not :term:`deterministic` about what
      transition to take in that situation.
      A non-deterministic machine is said to :term:`accept` a string
      if it completes execution on the string in an
      :term:`accepting state` under at least one choice of
      non-deterministic transitions.
      Generally, non-determinism can be simulated with a deterministic
      machine by alternating between the execution that would take
      place under each of the branching choices.

   non-terminal
      In contrast to a :term:`terminal`, a non-terminal is an abstract
      state in a :term:`production rule`. Begining with the
      :term:`start symbol`, all non-terminals must be converted into
      terminals in order to complete a :term:`derivation`.

   node
      :to-term: neighbor :label: linked to
      :to-term: dynamic allocation :label: created by
      :to-term: depth :label: property

      The objects that make up a linked structure such as a linked
      list or binary tree.
      Typically, nodes are allocated using
      :term:`dynamic memory allocation`.
      In :term:`graph` terminology, the nodes are more commonly called
      :term:`vertices <vertex>`.

   non-strict partial order
      In set notation, a relation that is :term:`reflexive`,
      :term:`antisymmetric`, and :term:`transitive`.

   NP
      An abbreviation for
      :term:`non-deterministic polynomial <non-deterministic polynomial time algorithm>`.

   NP-Complete
      :to-term: NP :label: is
      :to-term: NP-hard :label: is
      :to-term: clique :label: example problem

      A class of problems that are related to each other in this way:
      If ever one such problem is proved to be solvable in
      polynomial time, or proved to require exponential time,
      then all other NP-Complete problems will cost likewise.
      Since so many real-world problems have been proved to be
      NP-Complete, it would be extremely useful to determine if they
      have polynomial or exponential cost. But so far, nobody has
      been able to determine the truth of the situation.
      A more technical definition is that a problem is NP-Complete if
      it is in NP and is NP-hard.

   NP-Completeness proof
      A type of :term:`reduction` used to demonstrate that a
      particular :term:`problem` is :term:`NP-complete`.
      Specifically, an NP-Completeness proof must first show that the
      problem is in class :term:`NP`, and then show (by using a
      reduction to another NP-Complete problem) that the problem is
      :term:`NP-hard`.

   NP-hard
      A problem that is "as hard as" any other problem in :term:`NP`.
      That is, Problem X is NP-hard if any algorithm in NP can be
      :term:`reduced <reduction>` to X in polynomial time.

   non-deterministic algorithm
      An algorithm that may operate using a
      :term:`non-deterministic choice` operation.

   non-deterministic choice
      An operation that captures the concept of nondeterminism.
      A nondeterministic choice can be viewed as either
      "correctly guessing" between a set of choices, or implementing
      each of the choices in parallel.
      In the parallel view, the nondeterminism was successful if at
      least one of the choices leads to a correct answer.

   non-deterministic polynomial time algorithm
      :to-term: NP :label: abbreviation
      :to-term: non-deterministic choice :label: operation

      An algorithm that runs in polynomial time, and which may
      (or might not) use :term:`non-deterministic choice`.

   nth roots of unity
      All of the points along the unit circle in the complex plane
      that represent multiples of the
      :term:`primitive nth root of unity`.

   object
      :to-term: class :label: instance of

      An instance of a :term:`class`, that is, something that is created and
      takes up storage during the execution of a computer program.
      In the :term:`object-oriented programming paradigm`, objects
      are the basic units of operation.
      Objects have state in the form of :term:`data members <data member>`,
      and they know how to perform certain actions
      (:term:`methods <method>`).

   object-oriented programming paradigm
      :to-term: cohesion :label: key concept
      :to-term: inherit :label: principle
      :to-term: encapsulation :label: principle
      :to-term: polymorphism :label: principle
      :to-term: abstraction :label: principle
      :to-term: object :label: consists of

      An approach to problem-solving where all computations are
      carried out using :term:`objects <object>`.

   object-space decomposition
      A from of :term:`key-space decomposition` where the
      :term:`key space` is determined
      by the actual values of keys that are found.
      For example, a :term:`BST` stores a key value in its root,
      and all other values in the tree with lesser value are in the
      left :term:`subtree`.
      Thus, the root value has split (or decomposed) the
      key space for that key based on its value into left
      and right parts.
      An object-space decomposition is in opposition to an
      :term:`image-space decomposition`.

   octree
      The three-dimensional equivalent of the :term:`quadtree` would
      be a tree with :math:`2^3` or eight branches.

   Omega notation
      In :term:`algorithm analysis`,
      :math:`\Omega` notation is used to describe a :term:`lower bound`.
      Roughly (but not completely) analogous to
      :term:`big-Oh notation` used to define an :term:`upper bound`.

   one-way list
      A synonym for a :term:`singly linked list`.

   open addressing
      A synonym for :term:`closed hashing <closed hash system>`.

   open hash system
      A :term:`hash system` where multiple records might be associated
      with the same slot of a :term:`hash table`.
      Typically this is done using a linked list to store the records.
      This is in contrast to a :term:`closed hash system`.

   operating system
      The control program for a computer.
      Its purpose is to control hardware, manage resources, and
      present a standard interface to these to other software
      components.

   optimal static ordering
      A theoretical construct defining the best static (non-changing)
      order in which to place a collection of records so as to
      minimize the number of records :term:`visited <visit>` by a
      series of sequential searches.
      It is a useful concept for the purpose of defining a theoretical
      optimum against which to compare the performance for a
      :term:`self-organizing list heuristic`.

   optimization problem
      Any problem where there are a (typically large) collection of
      potential solutions, and the goal is to find the best solution.
      An example is the Traveling Salesman Problem, where
      visiting :math:`n` cities in some order has a cost, and the goal
      is to visit in the cheapest order.

   out degree
      In :term:`graph` terminology, the out degree for a :term:`vertex` is
      the number of edges directed out of the vertex.

   overflow
      The condition where the amount of data stored in an entity has
      exceeded its capacity.
      For example, a node in a :term:`B-tree` can store a certain
      number of records.
      If a record is attempted to be inserted into a node that is
      full, then something has to be done to handle this case.

   overflow bucket
      In :term:`bucket hashing`, this is the :term:`bucket` into which
      a record is placed if the bucket containing the record's
      :term:`home slot` is full.
      The overflow bucket is logically considered to have infinite
      capacity, though in practice search and insert will become
      relatively expensive if many records are stored in the overflow
      bucket.

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

   parameter
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

   parse tree
      A tree that represents the syntactic structure of an input
      string, making it easy to compare against a :term:`grammar` to
      see if it is syntactically correct.

   parser
      :to-term: compiler :label: part of
      :to-term: parse tree :label: build

      A part of a :term:`compiler` that takes as input the program
      text (or more typically, the tokens from the :term:`scanner`),
      and verifies that the program is syntactically correct.
      Typically it will build a :term:`parse tree` as part of the
      process.

   partially ordered set
      The set on which a :term:`partial order` is defined is called a
      partially ordered set.

   partition
      In :term:`Quicksort`, the process of splitting a list into two
      sublists, such that one sublist has values less than the
      :term:`pivot` value, and the other with values greater than the
      pivot. This process takes :math:`\Theta(i)` time on a sublist of
      length :math:`i`.

   pass by value
      A copy of a variable is passed to the called function. So, any
      modifications will not affect the original variable.

   pass by reference
      A :term:`reference` to the variable is passed to the called
      function. So, any modifications will affect the original
      variable.

   path
      :to-term: tree :label: In
      :to-term: vertex :label: sequence of

      In :term:`tree` or :term:`graph` terminology,
      a sequence of :term:`vertices <vertex>`
      :math:`v_1, v_2, ..., v_n`
      forms a path of length :math:`n-1` if there exist edges from
      :math:`v_i` to :math:`v_{i+1}` for :math:`1 \leq i < n`.

   path compression
      When implementing the :term:`UNION/FIND` algorithm, path
      compression is a local optimization step that can be performed
      during the FIND step.
      Once the root of the tree for the current object has been found,
      the path to the root can be traced a second time, with all
      objects in the tree made to point directly to the root.
      This reduces the depth of the tree from typically
      :math:`\Theta(\log n)` to nearly constant.

   peripheral storage
      Any storage device that is not part of the core processing
      of the computer (that is, :term:`RAM`).
      A typical example is a :term:`disk drive`.

   permutation
      A permutation of a sequence :math:`\mathbf{S}`
      is the :term:`elements <element>` of :math:`\mathbf{S}` arranged
      in some order.

   persistent
      In the context of computer memory, this refers to a memory that
      does not lose its stored information when the power is turned
      off.

   physical file
      The collection of sectors that comprise a file on a
      :term:`disk drive`.
      This is in contrast to the :term:`logical file`.

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

   platter
      In a :term:`disk drive`, one of a series of flat disks that
      comprise the storage space for the drive.
      Typically, each surface (top and bottom) of each platter stores
      data, and each surface has its own :term:`I/O head`.

   point quadtree
      A :term:`spatial data structure` for storing point data.
      It is similar to a :term:`PR quadtree` in that it (in two
      dimensions) splits the world into four parts.
      However, it splits using an :term:`object-space decomposition`.
      That is, quadrant containing the point is split into four parts
      at the point.
      It is similar to the :term:`kd tree` which splits alternately in
      each dimension, except that it splits in all dimensions at once.

   point-region quadtree
      Formal name for what is commonly referred to as a
      :term:`PR quadtree`.

   pointer
      :to-term: variable :label: is a
      :to-term: address :label: value
      :to-term: binary tree :label: used in
      :to-term: linked list :label: used in
      :to-term: pointee :label: point to
      :to-term: shallow copy :label: default copy
      :to-term: dereference :label: get pointee value
      :to-term: initialization :label: requires

      A variable whose value is the :term:`address` of another variable; a link.

   pointer-based implementation for binary tree nodes
      A common way to implement :term:`binary tree` :term:`nodes
      <node>`.
      Each node stores a data value (or a :term:`reference` to a data
      value), and pointers to the left and right children.
      If either or both of the children does not exist, then a null
      pointer is stored.

   polymorphism
      :to-term: run-time polymorphism :label: form
      :to-term: compile-time polymorphism :label: form

      An :term:`object-oriented programming <object-oriented programming paradigm>`
      term meaning *one name, many forms*.
      It describes the ability of software to change its behavior
      dynamically.  Two basic forms exist:
      :term:`run-time polymorphism` and :term:`compile-time polymorphism`.

   pop
      A specialized term used to indicate removing an :term:`element`
      from a :term:`stack`.

   poset
      Another name for a :term:`partially ordered set`.

   position
      The defining property of the list ADT, this is the concept that
      list elements are in a position. Many list ADTs support access
      by position.

   pointee
      :to-term: array :label: example
      :to-term: object :label: example

      The term pointee refers to anything that is pointed to by a
      :term:`pointer` or :term:`reference`.

   postorder traversal
      In a :term:`binary tree`, a :term:`traversal` that first
      :term:`recursively <recursion>` :term:`visits <visit>` the left
      :term:`child`,
      then recursively visits the right child, and then visits the
      :term:`root`.

   potential
      A concept related to :term:`amortized analysis`.
      Potential is the total or currently available amount of work
      that can be done.

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
      :to-term: RAM :label: example
      :to-term: main memory :label: synonym

      The faster but more expensive memory in a computer, most often
      :term:`RAM` in modern computers.
      This is in contrast to :term:`secondary storage`, which together
      with primary storage devices make up the computer's
      :term:`memory hierarchy`.

   primitive element
      In set notation, this is a single element that is a member of
      the base type for the set. This is as opposed to an element of
      the set being another set.

   primitive nth root of unity
      The :math:`n` th root of 1. Normally a :term:`complex number`.
      An intuitive way to view this is one :math:`n` th of the unit
      circle in the complex plain.

   Prim's algorithm
      :to-term: greedy algorithm :label: is a
      :to-term: Dijkstra's algorith :label: identical to

      A :term:`greedy algorithm` for computing the :term:`MCST` of a
      :term:`graph`.
      It is nearly identical to :term:`Dijkstra's algorithm` for
      solving the :term:`single-source shortest paths problem`,
      with the only difference being the calculation done to update
      the best-known distance.

   primary clustering
      In :term:`hashing`, the tendency in certain
      :term:`collision resolution`
      methods to create clustering in sections of the hash table.
      The classic example is :term:`linear probing`.
      This tends to happen when a group of keys follow the same
      :term:`probe sequence` during collision resolution.

   primitive data type
      In Java, one of a particular group of
      :term:`simple types <simple type>` that are not implemented as
      objects.
      An example is an ``int``.

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

   probabilistic data structure
      Any data structure that uses
      :term:`probabilistic algorithms <probabilistic algorithm>` to
      perform its operations.
      A good example is the :term:`skip list`.

   probe function
      In :term:`hashing`, the function used by a
      :term:`collision resolution` method to calculate where to look
      next in the :term:`hash table`.

   probe sequence
      In :term:`hashing`, the series of :term:`slots <slot>` visited
      by the :term:`probe function` during
      :term:`collision resolution`.

   problem
      A task to be performed.
      It is best thought of as a :term:`function` or a mapping of
      inputs to outputs.

   problem instance
      A specific selection of values for the parameters to a problem.
      In other words, a specific set of inputs to a problem.
      A given problem instance has a size under some
      :term:`cost model`.

   problem lower bound
      In :term:`algorithm analysis`, the tightest :term:`lower bound`
      that we can prove over all :term:`algorithms <algorithm>`
      for that :term:`problem`.
      This is often much harder to determine than the
      :term:`problem upper bound`.
      Since the lower bound for the algorithm can be very different
      for different situations (such as the :term:`best case` or
      :term:`worst case`), we typically have to specify which
      situation we are referring to.

   problem upper bound
      In :term:`algorithm analysis`, the :term:`upper bound` for the
      best :term:`algorithm` that we know for the :term:`problem`.
      Since the upper bound for the algorithm can be very different
      for different situations (such as the :term:`best case` or
      :term:`worst case`), we typically have to specify which
      situation we are referring to.

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

   production
   production rule
      A :term:`grammar` is comprised of production rules.
      The production rules consist of :term:`terminals <terminal>` and
      :term:`non-terminals <non-terminal>`, with one of the non-terminals
      being the :term:`start symbol`.
      Each production rule replaces one or more non-terminals (perhaps
      with associated terminals) with one or more terminals and
      non-terminals.
      Depending on the restrictions placed on the form of the rules,
      there are classes of languages that can be represented by
      specific types of grammars.
      A :term:`derivation` is a series of productions that results in
      a string (that is, all non-terminals), and this derivation can
      be represented as a :term:`parse tree`.

   proof
      :to-term: lower bounds proof :label: example
      :to-term: NP-Completeness proof :label: example
      :to-term: proof by contradiction :label: type
      :to-term: proof by induction :label: type

      The establishment of the truth of anything, a demonstration.

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
      as the :term:`2-3 tree`, a promotion takes place when an
      insertion causes the node to :term:`overflow`.
      In the case of the 2-3 tree, the :term:`key` with the middlemost
      value is sent to be stored in the parent.

   proving the contrapositive
      We can prove that :math:`P \Rightarrow Q` by proving
      :math:`(\mathrm{not}\ Q) \Rightarrow (\mathrm{not}\ P)`.

   pseudo polynomial
      In complexity analysis, refers to the time requirements of an
      algorithm for an :term:`NP-Complete` problem that still runs
      acceptably fast for practical application.
      An example is the standard :term:`dynamic programming` algorithm
      for the :term:`knapsack problem`.

   pseudo random
      In random number theory this means that, given all past terms in
      the series, no future term of the series can be accurately
      predicted in polynomial time.

   pseudo-random probing
      In :term:`hashing`, this is a :term:`collision resolution`
      method that stores a random permutation of the values 1 through
      the size of the :term:`hash table`.
      Term :math:`i` of the :term:`probe sequence` is simply the value
      of position :math:`i` in the permuation.

   push
      A specialized term used to indicate inserting an :term:`element`
      onto a :term:`stack`.

   pushdown automata
   PDA
      A type of :term:`Finite State Automata` that adds a stack memory
      to the basic :term:`Deterministic Finite Automata` machine.
      This extends the set of languages that can be recognize to the
      :term:`context-free languages <context-free language>`.

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

   quadratic probing
      In :term:`hashing`, this is a :term:`collision resolution`
      method that computes term :math:`i` of the
      :term:`probe sequence` using some quadratic equation
      :math:`ai^2 _ bi + c` for suitable constants :math:`a, b, c`.
      The simplest form is simply to use :math:`i^2` as term :math:`i`
      of the probe sequence.

   queue
      :to-term: dequeue :label: operations
      :to-term: enqueue :label: operations

      A list-like structure in which elements are inserted only at one
      end, and removed only from the other one end.

   Quicksort
      A sort that is :math:`\Theta(n \log n)` in the
      :term:`best <best case>` and :term:`average <average case>`
      cases, though :math:`\Theta(n^2)` in the :term:`worst case`.
      However, a reasonable implmentation will make the worst case
      occur under exceedingly rare circumstances.
      Due to its tight inner loop, it tends to run better than any
      other known sort in general cases.
      Thus, it is a popular sort to use in code libraries.
      It works by divide and conquer, by selecting a :term:`pivot`
      value,
      splitting the list into parts that are either less than or
      greater than the pivot, and then sorting the two parts.

   RAM
      :to-term: random access memory :label: abbreviation for

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
      values, than at least :math:`\Omega(\log n)` digits are required,
      leading to an :math:`\Omega(n \log n)` sorting algorithm that
      tends to be much slower than other sorting algorithms like
      :term:`Quicksort` or :term:`mergesort`.

   random access
      In :term:`file processing` terminology, a :term:`disk access` to
      a random position within the file.
      More generally, the ability to access an arbitrary record in the
      file.

   random access memory
      Abbreviated :term:`RAM`, this is the principle example of
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

   read/write head
      Synonym for :term:`I/O head`.

   rebalancing operation
      An operation performed on balanced search trees, such as the
      :term:`AVL Tree` or :term:`Splay Tree`, for the purpose of
      keeping the tree :term:`height balanced`.

   record
      A collection of information, typically implemented as an
      :term:`object` in an
      :term:`object-oriented programming language <object-oriented programming paradigm>`.
      Many data structures are organized containers for a collection
      of records.

   recurrence with full history
      A special form of :term:`recurrence relation` that includes a
      summation with a copy of the recurrence inside.
      The recurrence that represents the average case cost for
      :term:`Quicksort` is an example.
      This internal summation can typically be removed with simple
      techniques to simplify solving the recurrence.

   recurrence relation
      A :term:`recurrence relation` (or less formally,
      recurrence) defines a function by means of an
      expression that includes one or more (smaller) instances of
      itself.
      A classic example is the :term:`recursive <recursion>`
      definition for the
      factorial function, :math:`F(n) = n*F(n-1)`.

   recursion
      :to-term: recurrence relation :label: expressed as
      :to-term: recursive function :label: implemented in

      The process of using recursive calls.
      An algorithm is recursive if it calls itself to do part of
      its work.
      See :term:`recursion`.

   recursive call
      Within a :term:`recursive function`, it is a call that the
      function makes to itself.

   recursive data structure
      A data structure that is partially
      composed of smaller or simpler instances of the same data structure.
      For example, :term:`linked lists <linked list>` and
      :term:`binary trees <binary tree>` can be viewed as recursive
      data structures.

   recursive function
      :to-term: base case :label: includes
      :to-term: recursive call :label: includes
      :to-term: binary search :label: example

      A function that includes a :term:`recursive call`.

   recursively enumerable
      A language :math:`L` is recursively enumerable
      if there exists a :term:`Turing machine` :math:`M` such that
      :math:`L = L(M)`.

   Red-Black Tree
      A balanced variation on a :term:`BST`.

   reduction
      In :term:`algorithm analysis`, the process of deriving
      :term:`asymptotic bounds <asymptotic analysis>`
      for one :term:`problem` from the asymptotic bounds of another.
      In particular, if problem A can be used to solve problem B, and
      problem A is proved to be in :math:`O(f(n))`, then problem B
      must also be in :math:`O(f(n))`.
      Reductions are often used to show that certain problems are at
      least as expensive as sorting, or that certain problems are
      :term:`NP-Complete`.

   reference
      :to-term: pointer :label: similar to
      :to-term: bad reference :label: if not initialized

      A value that enables a program to directly access some
      particular :term:`data item`.
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

   reference parameter
      A :term:`parameter` that has been
      :term:`passed by reference <pass by reference>`.
      Such a parameter can be modified inside the function or method.

   reflexive
      In set notation, binary relation :math:`R` on set :math:`S` is
      reflexive if :math:`aRa` for all :math:`a \in \mathbf{S}`.

   Region Quadtree

      A :term:`spatial data structure` for storing 2D pixel data. The
      idea is that the root of the tree represents the entire image,
      and it is recursively divided into four equal subquadrants
      if not all pixels associated with the current node have the
      same value. This is structurally equivalent to a
      :term:`PR quadtree`, only the decomposition rule is changed.

   regular language
      A language :math:`L` is a regular language if and only if
      there exists a :term:`Deterministic Finite Automata` :math:`M`
      such that :math:`L = L(M)`.

   regular expression
      A way to specify a set of strings that define a language using
      the operators of union, contatenation, and star-closure.
      A regular expression defines some :term:`regular language`.

   relation
      In set notation, a relation :math:`R` over set
      :math:`\mathbf{S}` is a set of ordered pairs from
      :math:`\mathbf{S}`.

   replacement selection
      A variant of :term:`heapsort` most often used as one phase of an
      :term:`external sort`.
      Given a collection of records stored in an :term:`array`, and a stream
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
      available to store the data (possibly divided into separate
      main memory and disk space constraints) and the time
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

   rotational delay
      When processing a :term:`disk access`, the time that it takes
      for the first byte of the desired data to move to under the
      :term:`I/O head`.
      On average, this will take one half of a disk rotation, and so
      constitutes a substantial portion of the time required for the
      disk access.

   rotational latency
      A synonym for :term:`rotational delay`.

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

   run-time polymorphism
      :to-term: Overriding :label: Known as

      A form of :term:`polymorphism` known as Overriding.
      Overridden methods are those which implement a new method
      with the same signature as a method inherited from its
      :term:`base class`.
      Compare to :term:`compile-time polymorphism`.

   runtime stack
      :to-term: activation record :label: composed of

      The place where an :term:`activation record` is stored when a
      subroutine is called during a program's runtime.

   scanner
      :to-term: compiler :label: part of
      :to-term: lexical analysis :label: responsible for

      The part of a :term:`compiler` that is responsible for doing
      :term:`lexical analysis`.

   scope
      The parts of a program that can see and access a variable.

   search key
      A field or part of a record that is used to represent the record
      when searching. For example, in a database of customer records,
      we might want to search by name.
      In this case the name field is used as the search key.

   search lower bound
      The problem of searching in an :term:`array` has provable lower bounds
      for specific variations of the problem.
      For an unsorted array, it is :math:`\Omega(n)`
      :term:`comparisons <comparison>` in the :term:`worst case`,
      typically proved using an :term:`adversary argument`.
      For a sorted array, it is :math:`\Omega(\log n)` in the worst
      case, typically proved using an argument similar to the
      :term:`sorting lower bound` proof.
      However, it is possible to search a sorted array in the average
      case in :math:`O(\log \log n)` time.

   search problem
      Given a particular key value :math:`K`, the search problem is to
      locate a :term:`record` :math:`(k_j, I_j)` in some collection of
      records **L** such that :math:`k_j = K` (if one exists).
      :term:`Searching` is a systematic method for
      locating the record (or records) with key value :math:`k_j = K`.

   search tree
      :to-term: Binary Search Tree :label: example
      :to-term: 2-3 tree :label: example
      :to-term: B-tree :label: example
      :to-term: search trie :label: example

      A :term:`tree` data structure that makes search by :term:`key`
      value more efficient.
      A type of :term:`container`, it is common to implement an
      :term:`index <indexing>` using a search tree.
      A good search tree implementation will guarentee that insertion,
      deletion, and search operations are all :math:`\Theta(\log n)`.

   search trie
      :to-term: alphabet trie :label: example
      :to-term: binary trie :label: example

      Any :term:`search tree` that is a :term:`trie`.

   searching
      Given a :term:`search key` :math:`K` and some collection of
      records **L**, searching is a systematic method for locating the
      record (or records) in **L** with key value :math:`k_j = K`.

   secondary clustering
      In :term:`hashing`, the tendency in certain
      :term:`collision resolution`
      methods to create clustering in sections of the hash table.
      In :term:`primary clustering`, this is caused by a cluster of
      keys that don't necessarily hash to the same slot but which
      following significant portions of the same
      :term:`probe sequence` during collision resolution.
      Secondary clustering results from the keys hashing to the same
      slot of the table (and so a collision resolution method that is
      not affected by the key value must use the same probe sequence
      for all such keys).
      This problem can be resolved by :term:`double hashing` since its
      probe sequence is determined in part by a second hash function.

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
      :to-term: disk drive :label: example

      Refers to slower but cheaper means of storing data.
      Typical examples include a :term:`disk drive`, a USB memory
      stick, or a solid state drive.

   sector
      A unit of space on a :term:`disk drive` that is the amount of
      data that will be read or written at one time by the disk drive
      hardware.
      This is typically 512 bytes.

   sector header
      On a disk drive, a piece of information at the start of a
      :term:`sector` that allows the :term:`I/O head` to recognize the
      identity (or equivalently, the address) of the current sector.

   seed
      In random number theory, the starting value for a random number
      series.
      Typically used with any :term:`linear congruential method`.

   seek
      On a :term:`disk drive`, the act of moving the :term:`I/O head`
      from one :term:`track` to another.
      This is usually considered the most expensive step during a
      :term:`disk access`.

   selection sort
      While this sort requires :math:`\Theta(n^2)` time in the
      :term:`best <best case>`, :term:`average <average case>`,
      and :term:`worst <worst case>` cases, it requires only
      :math:`\Theta(n)` swap operations.
      Thus, it does relatively well in applications where swaps are
      expensive.
      It can be viewed as an optimization on :term:`bubble sort`,
      where a swap is deferred until the end of each iteration.

   self-organizing list
      :to-term: move-to-front :label: heuristic
      :to-term: transpose :label: heuristic

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

   separate chaining
      In :term:`hashing`, a synonym for
      :term:`open hashing <open hash system>`

   sequence
      In set notation, a collection of elements with an order, and
      which may contain duplicate-valued elements.
      A sequence is also sometimes called a :term:`tuple` or a
      :term:`vector`.

   sequential access
      In :term:`file processing` terminology, the requirement that all
      records in a file are accessed in sequential order.
      Alternatively, a storage device that can only access data
      sequentially, such as a tape drive.

   sequential fit
      In a :term:`memory manager`, the process of searching the
      :term:`memory pool` for a :term:`free block` large enough to
      service a :term:`memory request`, possibly reserving the
      remaining space as a free block.
      Examples are :term:`first fit`, :term:`circular first fit`,
      :term:`best fit`, and :term:`worst fit`.

   sequential search
      The simplest search algorithm: In an :term:`array`, simply look at the
      array elements in the order that they appear.

   sequential tree representation
      A representation that stores a series of node values with the
      minimum information needed to reconstruct the tree structure.
      This is a technique for :term:`serializing <serialization>` a
      tree.

   serialization
      :to-term: deserialization :label: reversed by
      :to-term: sequential tree representation :label: example

      The process of taking a data structure in memory and
      representing it as a sequence of bytes.
      This is sometimes done in order to transmit the data structure
      across a network or store the data structure in a
      :term:`stream`, such as on disk.
      :term:`Deserialization <deserialization>` reconstructs the
      original data structure from the serialized representation.

   set
      A collection of distinguishable :term:`members <member>` or
      :term:`elements <element>`.

   set product
      Written :math:`\mathbf{Q} \times \mathbf{P}`, the set product is
      a set of ordered pairs such that ordered pair :math:`(a, b)` is
      in the product whenever :math:`a \in \mathbf{P}` and
      :math:`b \in \mathbf{Q}`.
      For example, when :math:`\mathbf{P} = \{2, 3, 5\}` and
      :math:`\mathbf{Q} = \{5, 10\}`,
      :math:`\mathbf{Q} \times \mathbf{P} =
      \{(2, 5),\ (2, 10),\ (3, 5),\ (3, 10),\ (5, 5),\ (5, 10)\}`.

   shallow copy
      Copying the :term:`reference` or :term:`pointer`
      value without copying the actual content.

   Shellsort
      A sort that relies on the best-case cost of
      :term:`insertion sort` to improve over :math:`\Theta(n^2)`
      :term:`worst case` cost.

   shifting method
      A technique for finding a :term:`closed-form solution` to a
      :term:`summation` or :term:`recurrence relation`.

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

   signature file
      In document processing, a signature file is a type of
      :term:`bitmap` used to indicate which documents in a collection
      contain a given keyword, such that there is a :term:`bitmap` for
      each keyword.

   simple cycle
      In :term:`graph` terminology, a :term:`cycle` is simple if its
      corresponding :term:`path` is simple, except that the first and
      last :term:`vertices <vertex>` of the cycle are the same.

   simple path
      In :term:`graph` terminology, a :term:`path` is simple if all
      vertices on the path are distinct.

   simple type
      :to-term: boolean :label: example of
      :to-term: integer :label: example of

      A :term:`data type` whose values contain no subparts.
      An example is the integers.

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

   single rotation
      A type of :term:`rebalancing operation` used by the
      :term:`Splay Tree` and :term:`AVL Tree`.

   single-source shortest paths problem
      Given a :term:`graph` with :term:`weights <weight>` or
      distances on the :term:`edges <edge>`, and a designated start
      :term:`vertex` :math:`s`, find the shortest path from :math:`s`
      to every other vertex in the graph.
      One algorithm to solve this problem is :term:`Dijkstra's algorithm`.

   singly linked list
      :to-term: one-way list :label: synonym

      A :term:`linked list` implementation variant where each list
      node contains access an pointer only to the next element in the list.

   skip list
      A form of :term:`linked list` that adds additional links to
      improve the cost of fundamental operations like insert, delete,
      and search.
      It is a :term:`probabilistic data structure` since it adds the
      additional links using a :term:`probabilistic algorithm`.
      It can implement a :term:`dictionary` more efficiently than a
      :term:`BST`, and is roughly as difficult to implement.

   slot
      In :term:`hashing`, a position in a :term:`hash table`.

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

   solution space
      The possible solutions to a problem.
      This typically refers to an :term:`optimization problem`, where
      some solutions are more desireable than others.

   solution tree
      An ordering imposed on the set of solutions within a
      :term:`solution space` in the form of a  tree, typically derived
      from the order that some algorithm would visit the solutions.

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
      :term:`sorting <sorting problem>` is :math:`\Omega(n \log n)`.
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

   spatial application
      An application what has spatial aspects.
      In particular, an application that stores records that need to
      be searched by location.

   spatial attribute
      An attribute of a record that has a position in space, such as
      the coordinate.
      This is typically in two or more dimensions.

   spatial data
      Any object or record that has a position (in space).

   spatial data structure
      :to-term: bintree :label: example
      :to-term: kd tree :label: example
      :to-term: PR quadtree :label: example

      A :term:`data structure` designed to support efficient
      processing when a
      :term:`spatial attribute` is used as the key.
      In particular, a data structure that supports efficient search
      by location, or finds all records within a given region in two
      or more dimensions.
      Examples of spatial data structures to store point data include
      the :term:`bintree`, the :term:`PR quadtree` and the
      :term:`kd tree`.

   spindle
      The center of a :term:`disk drive` that holds the
      :term:`platters <platter>` in place.

   Splay Tree
      :to-term: splaying :label: operation

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

   splaying
      The act of performing an :term:`rebalancing operation` on a
      :term:`Splay Tree`.

   stable
      A sorting algorithm is said to be stable if it does not
      change the relative ordering of records with identical
      :term:`key` values.

   stack
      :to-term: push :label: operations
      :to-term: pop :label: operations

      A list-like structure in which elements may be inserted or
      removed from only one end.

   stack frame
      Frame of data that pushed into and poped from call stack


   stack variable
      Another name for a :term:`local variable`.

   stale pointer
      Within the context of a :term:`buffer pool` or
      :term:`memory manager`, this means a :term:`reference` to a
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

   start state
      In a :term:`finite automata`, the designated state in which the
      machine will always begin a computation.

   start symbol
      In a :term:`grammar`, the designated :term:`non-terminal` that
      is the intial point for :term:`deriving <derivation>` a string
      in the langauge.

   state
      The condition that something is in at some point in time.
      In computing, this typically means the collective values of any
      existing variables at some point in time.
      In an :term:`automata`, a state is an abstract condition,
      possibly with associated information, that is primarily defined
      in terms of the conditions that the automata may transition from
      its present state to another state.

   State Machine
      Synonym for :term:`finite automata`.

   static
      Something that is not changing (in contrast to :term:`dynamic`).
      In computer programming, static normally refers to something
      that happens at compile time.
      For example, static analysis is analysis of the program's text
      or structure, as opposed to its run-time behavior.
      Static binding or static memory allocation occurs at compile time.

   static scoping
      A synonym for :term:`lexical scoping`.

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
      Also the name for a :term:`design pattern` that separates the
      algorithm for performing a task from the control for applying
      that task to each member of a collection.
      A good example is a generic sorting function that takes a
      collection of records (such as an :term:`array`) and a "strategy" in the
      form of an algorithm that knows how to extract the key from a
      record in the array.
      Only subtly different from the :term:`visitor` design pattern,
      where the difference is primarily one of intent rather than
      syntax.
      The strategy design pattern is focused on encapsulating an
      activity that is part of a larger process, so that different
      ways of performing that activity can be substituted.
      The visitor design pattern is focused on encapsulating an
      activity that will be performed on all members of a collection
      so that completely different activities can be substituted
      within a generic method that accesses all of the collection
      members.

   stream
      The process of delivering content in a
      :term:`serialized <serialization>` form.

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
      :to-term: clique :label: example

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

   subtract-and-guess
      A technique for finding a :term:`closed-form solution` to a
      :term:`summation` or :term:`recurrence relation`.

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

   symbol table
      As part of a :term:`compiler`, the symbol table stores all of
      the identifiers in the program, along with any necessary
      information needed about the identifier to allow the compiler to
      do its job.

   symmetric
      In set notation, relation :math:`R` is symmetric if whenever
      :math:`aRb`, then :math:`bRa`, for all :math:`a, b \in \mathbf{S}`.

   symmetric matrix
      A square matrix that is equal to its :term:`transpose`.
      Equivalently, for a :math:`n \times n` matrix :math:`A`,
      for all :math:`i,j < n`, :math:`A[i, j] = A[j, i]`.

   syntax analysis
      :to-term: parse tree :label: generates
      :to-term: tokens :label: accepts

      A phase of :term:`compilation <compiler>` that accepts
      :term:`tokens <token>`, checks if program is syntactically
      correct, and then generates a :term:`parse tree`.

   tail
      The end of a :term:`list`.

   terminal
      A specific character or string that appears in a
      :term:`production rule`.
      In contrast to a :term:`non-terminal`, which represents an
      abstract state in the production.
      Similar to a :term:`literal`, but this is the term more
      typically used in the context of a :term:`compiler`.

   Theta notation
      In :term:`algorithm analysis`, :math:`\Theta` notation is used
      to indicate that the
      :term:`upper bound` and :term:`lower bound` for an
      :term:`algorithm` or :term:`problem` match.

   token
      The basic logical units of a program, as deterimined by
      :term:`lexical analysis`.
      These are things like arithmetic operators, language keywords,
      variable or function names, or numbers.

   tombstone
      In :term:`hashing`, a tombstone is used to mark a :term:`slot`
      in the :term:`hash table` where a record has been deleted.
      Its purpose is to allow the :term:`collision resolution` process
      to probe through that slot (so that records further down the
      :term:`probe sequence` are not unreachable after deleting the
      record), while also allowing the slot to be reused by a future
      insert operation.

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

   total path length
      In a :term:`tree`, the sum of the :term:`levels <level>` for
      each :term:`node`.

   Towers of Hanoi problem
      A standard example of a recursive algorithm.
      The problem starts with a stack of disks (each with unique size)
      stacked decreasing order on the left pole, and two additional
      poles.
      The problem is to move the disks to the right pole, with the
      constraints that only one disk can be moved at a time and a
      disk may never be on top of a smaller disk.
      For :math:`n` disks, this problem requires :math:`\Theta(2^n)`
      moves.
      The standard solution is to move :math:`n-1` disks to the middle
      pole, move the bottom disk to the right pole, and then move the
      :math:`n-1` disks on the middle pole to the right pole.

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

   transducer
      A machine that takes an input and creates an output.
      A :term:`Turing Machine` is an example of a transducer.

   transitive
      In set notation, relation :math:`R` is transitive if whenever
      :math:`aRb` and :math:`bRc`, then :math:`aRc`, for all
      :math:`a, b, c \in \mathbf{S}`.

   transpose
      In the context of linear algebra,
      the transpose of a matrix :math:`A` is
      another matrix :math:`A^T` created by writing the rows of
      :math:`A` as the columns of :math:`A^T`.
      In the context of a :term:`self-organizing list`,
      transpose is a :term:`heuristic` used to maintain the list.
      Under this heuristic, whenever a record is accessed it is moved
      one position closer to the front of the list.

   trap state
      In a :term:`FSA`, any state that has all transitions cycle back
      to itself.
      Such a state might be :term:`final <final state>`.

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

   tree traversal
      A :term:`traversal` performed on a tree.
      Traditional tree traversals include
      :term:`preorder <preorder traversal>` and
      :term:`postorder <postorder traversal>` traversals for both
      :term:`binary <binary tree>` and :term:`general <general tree>`
      trees, and :term:`inorder traversal` that is most
      appropriate for a :term:`BST`.

   trie
      :to-term: alphebet trie :label: example
      :to-term: binary trie :label: example
      :to-term: search trie :label: example

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

   Turing-acceptable
      A language is :math:`Turing-acceptable` if there is some
      :term:`Turing machine` that :term:`accepts <accept>` it.
      That is, the machine will halt in an accepting configuration if
      the string is in the language, and go into a
      :term:`hanging configuration` if the string is not in the language.

   Turing-computable function
      Any function for which there exists a Turing machine that can
      perform the necessary work to compute the function.

   Turing-decidable
      A language is Turing-decideable if there exists a Turing machine
      that can clearly indicate for every string whether that string
      is in the language or not.
      Every Turing-decidable language is also Turing-acceptable,
      because the Turing machine that can decide if the string is in
      the language can be modified to go into a
      :term:`hanging configuration` if the string is not in the language.

   Turing machine
      A type of :term:`finite automata` that, while simple to define
      completely, is capable of performing any computation that can be
      performed by any known computer.

   tuple
      In set notation, another term for a :term:`sequence`.

   two-coloring
      An assignment from two colors to regions in an image
      such that no two regions sharing a side have the same color.

   type
      A collection of values.

   unary notation
      A way to represent :term:`natural numbers`, where the value of
      zero is represented by the empty string, and the value :math:`n`
      is represented by a series of :math:`n` marks.

   uncountably infinite
   uncountable
      An infinite set is uncountably infinite if there does not exist
      any mapping from it to the set of integers.
      This is often proved using a :term:`diagonalization argument`.
      The real numbers is an example of an uncountably infinite set.

   underflow
      The condition where the amount of data stored in an entity has
      dropped below some minimum threshold.
      For example, a node in a :term:`B-tree` is required to be at
      least half full.
      If a record deletion causes the node to be less than half full,
      then it is in a condition of underflow, and something has to be
      done to correct this.

   undirected graph
      A :term:`graph` whose :term:`edges <edge>` do not have a direction.

   undirected edge
      An :term:`edge` that connects two :term:`vertices <vertex>` with
      no direction between them.
      Many graph representations will represent such an edge
      with two :term:`directed edges <directed edge>`.

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

   uninitialized
      Uninitialized variable means it has no initial value.

   unit production
      A unit production is a :term:`production` in a :term:`grammar`
      of the form :math:`A \rightarrow B`, where :math:`A, B \in` the
      set of :term:`non-terminals <non-terminal>` for the grammar.
      Any grammar with unit productions can be rewritten to remove
      them.

   unsolveable problem
      A problem that can proved impossible to solve on a computer.
      The classic example is the :term:`halting problem`.

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
      In :term:`algorithm analysis`, a :term:`growth rate` that is
      always greater than or equal to the that of the
      :term:`algorithm` in question.
      In practice, this is the slowest-growing function that we know
      grows at least as fast as all but a constant number of inputs.
      It could be a gross over-estimate of the truth.
      Since the upper bound for the algorithm can be very different
      for different situations (such as the :term:`best case` or
      :term:`worst case`), we typically have to specify which
      situation we are referring to.

   value parameter
      A :term:`parameter` that has been
      :term:`passed by value <pass by value>`.
      Changing such a parameter inside the function or method will not
      affect the value of the calling parameter.

   variable-length coding
      :to-term: Huffman codes :label: example
      :to-term: fixed-length coding:label: contrast to

      Given a collection of objects, a variable-length coding scheme
      assigns a code to each object in the collection using codes that
      can be of different lengths.
      Typically this is done in a way such that the objects that are
      most likely to be used have the shortest codes, with the goal of
      minimizing the total space needed to represent a sequence of
      objects, such as when representing the characters in a document.
      :term:`Huffman coding <Huffman codes>` is an example of a
      variable-length coding scheme.
      This is in contrast to :term:`fixed-length coding`.

   vector
      :to-term: sequence :label: synonym
      :to-term: dynamic array :label: synonym

      In set notation, another term for a :term:`sequence`.
      As a data structure, the term vector usually used as a snyonym
      for a :term:`dynamic array`.

   vertex
      :to-term: node :label: synonym

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

   visitor
      A :term:`design pattern` where a :term:`traversal` process is
      given a function (known as the visitor) that is applied to every
      object in the collection being traversed.
      For example, a generic tree or graph traversal might be
      designed such that it takes a function parameter,
      where that function is applied to each node.

   volatile
      In the context of computer memory, this refers to a memory that
      loses all stored information when the power is turned off.

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
      In algorithm analysis, the :term:`problem instance` from among
      all problem instances for a given input size :math:`n` that has
      the greatest cost. Note that the worst case is **not** when
      :math:`n` is big, since we are referring to the wrost from a
      class of inputs (i.e, we want the worst of those inputs of size
      :math:`n`).

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

   zigzig
      A type of :term:`rebalancing operation` used by
      :term:`splay trees <Splay Tree>`.

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
