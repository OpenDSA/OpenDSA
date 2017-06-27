.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. Hopefully this module is now obsolete. Its contents ought to be
   contained in the NPComplete and provingNPC module in the NP
   chapter. But this is left here for the moment, just in case.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: NP-completeness

Some NP-Completeness Proofs
===========================

The following example provides a model for how an
NP-completeness proof is done.

.. topic:: Problem

   3-SATISFIABILITY (3 SAT)

   **Input:** A Boolean expression E in CNF such that each
   clause contains exactly 3 literals.

   **Output:** YES if the expression can be satisfied, NO
   otherwise.

.. avembed:: AV/Development/sat.html ss

.. topic:: Example

   3 SAT is a special case of SAT.
   Is 3 SAT easier than SAT?
   Not if we can prove it to be NP-complete.

   **Theorem:** 3 SAT is NP-complete.

   **Proof:**

   Prove that 3 SAT is in NP:
   Guess (non-deterministically) truth values for the variables.
   The correctness of the guess can be verified in polynomial time.

   Prove that 3 SAT is NP-hard:
   We need a polynomial-time reduction from SAT to 3 SAT.
   Let :math:`E = C_1 \cdot C_2 \cdot ... \cdot C_k` be any instance
   of SAT.
   Our strategy is to replace any clause :math:`C_i` that does not
   have exactly three literals with a set of clauses each having
   exactly three literals.
   (Recall that a literal can be a variable such as :math:`x`, or the
   negation of a variable such as :math:`\overline{x}`.)
   Let :math:`C_i = x_1 + x_2 + ... + x_j` where :math:`x_1, ..., x_j`
   are literals.

   #. :math:`j = 1`, so :math:`C_i = x_1`.
      Replace :math:`C_i` with :math:`C_i'`:

      .. math::

         (x_1 + y + z) \cdot (x_1 + \overline{y} + z) \cdot
         (x_1 + y + \overline{z}) \cdot (x_1 + \overline{y} +
         \overline{z})

      where :math:`y` and :math:`z` are variables not appearing
      in :math:`E`.
      Clearly, :math:`C_i'` is satisfiable if and only if
      :math:`(x_1)` is satisfiable, meaning that :math:`x_1` is TRUE.

   #. :math:`J = 2`, so :math:`C_i = (x_1 + x_2)`.
      Replace :math:`C_i` with

      .. math::

         (x_1 + x_2 + z) \cdot (x_1 + x_2 + \overline{z})

      where :math:`z` is a new variable not appearing in :math:`E`.
      This new pair of clauses is satisfiable if and only if
      :math:`(x_1 + x_2)` is satisfiable, that is, either :math:`x_1`
      or :math:`x_2` must be true.

   #. :math:`j > 3`.
      Replace :math:`C_i = (x_1 + x_2 + \cdots + x_j)` with

      .. math::

         (x_1 + x_2 + z_1) \cdot (x_3 + \overline{z_1} + z_2) \cdot
         (x_4 + \overline{z_2} + z_3) \cdot ...

      .. math::

         \cdot (x_{j-2} +
         \overline{z_{j-4}} + z_{j-3}) \cdot (x_{j-1} + x_j +
         \overline{z_{j-3}})

      where :math:`z_1, ..., z_{j-3}` are new variables.

   After appropriate replacements have been made for each :math:`C_i`,
   a Boolean expression results that is an instance of 3 SAT.
   Each replacement is satisfiable if and only if the original clause
   is satisfiable.
   The reduction is clearly polynomial time.

   For the first two cases it is fairly easy to see that the original
   clause is satisfiable if and only if the resulting clauses are
   satisfiable.
   For the case were we replaced a clause with more than three literals,
   consider the following.

   #. If :math:`E` is satisfiable, then :math:`E'` is satisfiable:
      Assume :math:`x_m` is assigned TRUE.
      Then assign :math:`z_t, t\leq m-2` as TRUE and
      :math:`z_k, t \geq m-1` as FALSE.
      Then all clauses in Case (3) are satisfied.

   #. If :math:`x_1, x_2, ..., x_j` are all FALSE, then
      :math:`z_1, z_2, ..., z_{j-3}` are all TRUE.
      But then :math:`(x_{j-1} + x_{j-2} + \overline{z_{j-3}})` is FALSE.

Next we define the problem VERTEX COVER for use in further examples.

.. topic:: Problem

   VERTEX COVER:

   **Input:** A graph :math:`G` and an integer :math:`k`.

   **Output:** YES if there is a subset :math:`S` of the
   vertices in :math:`G` of size :math:`k` or less such that every
   edge of :math:`G` has at least one of its endpoints in :math:`S`,
   and NO otherwise.

.. avembed:: AV/Development/vertexcover.html ss

.. topic:: Example

   In this example, we make use of a simple conversion between two graph
   problems.

   **Theorem:** VERTEX COVER is NP-complete.

   **Proof:**

   Prove that VERTEX COVER is in NP:
   Simply guess a subset of the graph and determine in polynomial time
   whether that subset is in fact a vertex cover of size :math:`k` or
   less.

   Prove that VERTEX COVER is NP-hard:
   We will assume that K-CLIQUE is already known to be NP-complete.
   (We will see this proof in the next example.
   For now, just accept that it is true.)

   Given that K-CLIQUE is NP-complete, we need to find a
   polynomial-time transformation from the input to K-CLIQUE to the
   input to VERTEX COVER,
   and another polynomial-time transformation from the output for
   VERTEX COVER to the output for K-CLIQUE.
   This turns out to be a simple matter, given the following
   observation.
   Consider a graph :math:`G` and a vertex cover :math:`S` on
   :math:`G`.
   Denote by :math:`S'` the set of vertices in :math:`G` but not in
   :math:`S`.
   There can be no edge connecting any two vertices in :math:`S'`
   because, if there were, then :math:`S` would not be a vertex
   cover.
   Denote by :math:`G'` the inverse graph for :math:`G`, that is, the
   graph formed from the edges not in :math:`G`.
   If :math:`S` is of size :math:`k`, then :math:`S'` forms a clique
   of size :math:`n - k` in graph :math:`G'`.
   Thus, we can reduce K-CLIQUE to VERTEX COVER simply by converting
   graph :math:`G` to :math:`G'`, and asking if :math:`G'` has a
   VERTEX COVER of size :math:`n-k` or smaller.
   If YES, then there is a clique in :math:`G` of size :math:`k`;
   if NO then there is not.

.. topic:: Example

   So far, our NP-completeness proofs have involved
   transformations between inputs of the same "type", such as from
   a Boolean expression to a Boolean expression or from a graph to a
   graph.
   Sometimes an NP-completeness proof involves a transformation between
   types of inputs, as shown next.

   **Theorem:** K-CLIQUE is NP-complete.

   **Proof:** K-CLIQUE is in NP, because we can just guess a
   collection of :math:`k` 
   vertices and test in polynomial time if it is a clique.
   Now we show that K-CLIQUE is NP-hard by using a reduction
   from SAT.
   An instance of SAT is a Boolean expression

   .. math::

      B = C_1 \cdot C_2 \cdot ... \cdot C_m

   whose clauses we will describe by the notation

   .. math::

      C_i = y[i, 1] + y[i, 2] + ... + y[i, k_i]

   where :math:`k_i` is the number of literals in Clause :math:`c_i`.
   We will transform this to an instance of K-CLIQUE as follows.
   We build a graph

   .. math::

       G = \{v[i, j] | 1 \leq i \leq m, 1 \leq j \leq k_i\},

   that is, there is a vertex in :math:`G` corresponding to
   every literal in Boolean expression :math:`B`.
   We will draw an edge between each pair of vertices
   :math:`v[i_1, j_1]` and :math:`v[i_2, j_2]` unless
   (1) they are two literals within the same clause
   (:math:`i_1 = i_2`) or
   (2) they are opposite values for the same variable
   (i.e., one is negated and the other is not). 
   Set :math:`k = m`.
   Figure :num:`Figure #BEgraph` shows an example of this transformation.

   .. _BEgraph:

   .. odsafig:: Images/BEgraph.png
      :width: 150
      :alt: Converting a Boolean expression to a graph
      :capalign: justify
      :figwidth: 90%
      :align: center

      The graph generated from Boolean expression
      :math:`B = (x_1 + x_2) \cdot (\overline{x_1} + x_2 + x_3) \cdot
      (\overline{x_1} + x_3)`.
      Literals from the first clause are labeled C1, and literals from
      the second clause are labeled C2.
      There is an edge between every pair of vertices except when both
      vertices represent instances of literals from the same clause,
      or a negation of the same variable.
      Thus, the vertex labeled :math:`C1\!:\!y_1` does not connect to
      the vertex labeled :math:`C1\!:\!y_2` (because they are literals
      in the same clause) or the vertex labeled
      :math:`C2\!:\!\overline{y_1}` (because they are opposite
      values for the same variable).

   :math:`B` is satisfiable if and only if :math:`G` has a clique of
   size :math:`k` or greater.
   :math:`B` being satisfiable implies that there is a truth assignment
   such that at least one literal :math:`y[i, j_i]` is true for
   each :math:`i`.
   If so, then these :math:`m` literals must correspond to :math:`m`
   vertices in a clique of size :math:`k = m`.
   Conversely, if :math:`G` has a clique of size :math:`k` or greater,
   then the clique must have size exactly :math:`k` (because no two
   vertices corresponding to literals in the same clause can be in the
   clique) and there is one vertex :math:`v[i, j_i]` in the clique for
   each :math:`i`.
   There is a truth assignment making each :math:`y[i, j_i]` true.
   That truth assignment satisfies :math:`B`.

   We conclude that K-CLIQUE is NP-hard, therefore NP-complete.

.. avembed:: AV/Development/3satToClique.html ss

