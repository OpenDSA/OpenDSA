.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires:  Context-Free Languages
   :satisfies: Context-Free Language Simplification
   :topic: Finite Automata

.. slideconf::
   :autoslides: False

Simplifying CFGs and Normal Forms
=================================

.. slide:: Transforming CFGs (1)

   | We use grammars to represent a programming language.
   | Want to know: Is a given string (or program :math:`x`) valid
     (syntactically correct)?
   | Same as asking if it is in the language.

   | We have seen that (with restrictions on form of CFG), 
     we can determine whether :math:`w` is in :math:`L(G)` in
     :math:`2|w|` rounds, each step adding a terminal
     or increasing in length.
   | This works, but it is not fast enough, that is, not linear! 


.. slide:: Transforming CFGs (2)

   | Key question: Are there ways to transform (restrict) CFGs such that
   |   1) We can process efficiently
   |   2) without restricting the power of CFGs

   << What does it mean "without restricting the power of CFGs"? >>

   | Specifically, we look at restrictions on the right hand side of the
     production rules.
   |   Need to be able to automatically transform an arbitrary CFG
       into an equivalent restricted CFG.


.. slide:: Substitution Theorem (1)

   | Sometimes it is easier to reason about grammars for languages
     without :math:`\lambda`.
   | (Besides, its pointless to keep expanding on productions that
     derive to the empty string.)

   | Useful note: It would be easy to add :math:`\lambda` to any
     grammar by adding a new start symbol :math:`S_0`,
   |    :math:`S_0 \rightarrow S \mid \lambda`

   | So in practice, if we can transform grammar :math:`G` into
     :math:`\hat{G}` such that :math:`L(\hat{G}) = L(G) - \{\lambda\}`,
     then the two are effectively equivalent.


.. slide:: Substitution Theorem (2)

   | Let :math:`G` be a CFG. Suppose :math:`G` contains
     :math:`A \rightarrow x_1Bx_2`
   | where :math:`x_i \in (V \cup T)^{*}`,
     :math:`A` and :math:`B` are different variables,
     and :math:`B` has the productions
   |    :math:`B \rightarrow y_1|y_2|\ldots|y_n`.
   | We can construct :math:`G'` from :math:`G` by deleting 
   |    :math:`A \rightarrow x_1Bx_2`
   | from :math:`P` and adding to it
   |    :math:`A \rightarrow x_1y_1x_2|x_1y_2x_2|\ldots | x_1y_nx_2`.

   | **Substitution Theorem**: :math:`L(G) = L(G')`.


.. slide:: Substitution Theorem Example

   | Grammar :math:`G`:
   |   :math:`A \rightarrow a \mid aaA \mid abBc`
   |   :math:`B \rightarrow abbA \mid b`

   | Substitute to get :math:`\hat{G}`:
   |   :math:`A \rightarrow a \mid aaA \mid ababbAc \mid abbc`
   |   :math:`B \rightarrow abbA \mid b`

   | Then the B productions become useless productions. 

   << Question: Why don't we also delete :math:`B` rules? >>

   .. <<Answer: These might be used by another production>>


.. slide:: Substitution Theorem Example

   What was the point to this? Look at derivations.

   | Derivation under :math:`G` for :math:`aaabbc`:
   |   :math:`A \Rightarrow aaA \Rightarrow aaabBc \Rightarrow aaabbc`
   | Derivation under :math:`\hat{G}` for :math:`aaabbc`:
   |   :math:`A \Rightarrow aaA \Rightarrow aaabbc`


.. slide:: Useless Productions (1)

   | We left in the productions for :math:`B`, but maybe there is no way
     remaining to reach them.
     Obviously they can go.

   | This example is not as obvious:
   |   :math:`S \rightarrow aSb \mid \lambda \mid A`
   |   :math:`A \rightarrow aA`

   | **Definition**: Variable :math:`A \in V` is said to be *useful* if
     and only if there is at least one :math:`w \in L(G)` such that
   |   :math:`S \stackrel{*} \Rightarrow xAy \stackrel{*} \Rightarrow w`

   We want to eliminate both types of useless production.


.. slide:: Theorem: (useless productions)

   | Let :math:`G` be a CFG.
   | Then there exists :math:`\hat{G}` that does not contain any useless
     variables or productions such that :math:`L(G) = L(\hat{G})`.


.. slide:: Process (1)

   **To Remove Useless Productions:**

   Let :math:`G = (V,T,S,P)`.

   | I. Compute :math:`V_1 =` {Variables that can derive strings of terminals}
   |    1. :math:`V_1 = \emptyset`
   |    2. Repeat until no more variables added
   |       * For every :math:`A \in V` with :math:`A \rightarrow x_1x_2\ldots x_n`,
             all :math:`x_i \in (T^* \cup V_1)`, add :math:`A` to :math:`V_1`
   |    3. Take :math:`P_1` as all productions in :math:`P` whose
           symbols are all in :math:`(V_1 \cup T)`

   Then :math:`G_1 = (V_1, T, S, P_1)` has no variables that can't derive
   strings.

   NOTE: Now need to get rid of productions we can't use. 


.. slide:: Example (1)

   | :math:`S \rightarrow aB \mid bA`
   | :math:`A \rightarrow aA`
   | :math:`B \rightarrow Sa \mid b`
   | :math:`C \rightarrow cBc \mid a`
   | :math:`D \rightarrow bCb`
   | :math:`E \rightarrow Aa \mid b`

   We process this to eliminate :math:`A`.

.. slide:: Process (2)

   | II. Draw Variable Dependency Graph
   |    For :math:`A \rightarrow xBy`, draw :math:`A \rightarrow B`.
   |    Draw :math:`A` in a circle, :math:`B` in a circle, and an arc from
        :math:`A` to :math:`B`.
   |    Remove productions for :math:`V` if there is no path from :math:`S` to
        :math:`V` in the dependency graph.
   |    Resulting Grammar :math:`G'` is such that :math:`L(G) = L(G')` and
        :math:`G'` has no useless productions.


.. slide:: Example (2)

   | :math:`S \rightarrow aB`
   | :math:`B \rightarrow Sa \mid b`
   | :math:`C \rightarrow cBc \mid a`
   | :math:`D \rightarrow bCb`
   | :math:`E \rightarrow Aa \mid b`

   .. odsafig:: Images/uselessgraph.png
      :width: 350
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: uselessgraph

   .. WORK THIS EXAMPLE IN JFLAP?


.. slide:: Example (2)

   | :math:`G_1`:
   |   :math:`S \rightarrow aB`
   |   :math:`B \rightarrow Sa \mid b`
   |   :math:`C \rightarrow cBc \mid a`

   Now, do it again.

   | :math:`G'`:
   |   :math:`S \rightarrow aB`
   |   :math:`B \rightarrow Sa \mid b`


.. slide:: Removing :math:`\lambda` Productions

   NOTE: Last time talked about simpler CFG that had no
   :math:`\lambda`-productions, now we will show how to get rid of them. 

   | **Theorem** (remove :math:`\lambda` productions)
   | Let :math:`G` be a CFG with :math:`\lambda` not in :math:`L(G)`.
   | Then there exists a CFG :math:`G'` having no
     :math:`\lambda`-productions such that :math:`L(G) = L(G')`. 

.. slide:: Process: Removing :math:`\lambda` Productions

   | 1. Let :math:`V_n = \{A \mid \exists\ \mbox{production}\ A \rightarrow \lambda\}`
   | 2. Repeat until no more additions
   |    * if :math:`B \rightarrow A_1A_2 \ldots A_m` and :math:`A_i \in V_n`
          for all :math:`i`, then put :math:`B` in :math:`V_n`
   |    THUS, :math:`V_n = \{A \mid A\stackrel{*}{\Rightarrow} \lambda \}` 
   | 3. Construct :math:`G'` with productions :math:`P'` such that
   |    * If :math:`A \rightarrow x_1x_2\ldots x_m \in P, m \ge 1`, then 
          put all productions formed when :math:`x_j` is replaced by
          :math:`\lambda` (for all :math:`x_j \in V_n`) such that
          :math:`|\mbox{rhs}| \ge 1` into :math:`P'`.


.. slide:: Example

   | :math:`S \rightarrow Ab`
   | :math:`A \rightarrow BCB \mid Aa`
   | :math:`B \rightarrow b \mid \lambda`
   | :math:`C \rightarrow cC \mid \lambda`

   .. WORK THIS EXAMPLE IN JFLAP?

   | :math:`G'`:
   |   :math:`S \rightarrow Ab \mid b`
   |   :math:`A \rightarrow BCB \mid BC \mid BB \mid CB \mid B \mid C \mid Aa \mid a`
   |   :math:`B \rightarrow b`
   |   :math:`C \rightarrow cC \mid c`
      
   NOTE: Don't add :math:`A \rightarrow \lambda`! 


.. slide:: Unit Productions

   | **Definition:** *Unit Production*:
   |   :math:`A \rightarrow B`
   |   where :math:`A, B \in V`.

   | **Consider removing unit productions:** Suppose we have 
   |   :math:`A \rightarrow B`
   |   :math:`B \rightarrow a \mid ab`

   This becomes: :math:`A \rightarrow a \mid ab`


.. slide:: Unit Productions (2)

   | But what if we have 
   |   :math:`A \rightarrow B \quad` becomes :math:`\quad A \rightarrow C`
   |   :math:`B \rightarrow C \qquad\qquad\qquad\qquad B \rightarrow A`
   |   :math:`C \rightarrow A \qquad\qquad\qquad\qquad C \rightarrow B`

   But we didn't get rid of unit productions! 


.. slide:: Removing Unit Productions

   | **Theorem** (Remove unit productions)
   | Let :math:`G = (V, T, S, P)` be a CFG without
     :math:`\lambda`-productions.
   | Then there exists CFG :math:`G' = (V', T', S, P')` that does not
     have any unit-productions and :math:`L(G) = L(G')`.


.. slide:: Process

   | 1. Find for each :math:`A`, all :math:`B` such that
        :math:`A \stackrel{*}{\Rightarrow} B`
   |    (Draw a dependency graph howing relationship of Unit
        productions. Just draw arc for each :math:`A \rightarrow B` rule.
   |    Draw :math:`A` in a circle, :math:`B` in a circle,
        and an arc from :math:`A` to :math:`B`.)
   | 2. Construct :math:`G' = (V', T', S, P')` by
   |    (a) Put all non-unit productions in :math:`P'`
   |    (b) For all :math:`A \stackrel{*}{\Rightarrow} B` such that
            :math:`B \rightarrow y_1 \mid y_2 \mid \ldots y_n \in P'`,
            put :math:`A \rightarrow y_1 \mid y_2 \mid \ldots y_n \in P'`
   |        Run DFS with :math:`A` as root.
   |    Note the star in :math:`A \stackrel{*}{\Rightarrow} B`
   |    Never put a unit production in :math:`P'`.


.. slide:: Example (1)

   | Original:
   |   :math:`S \rightarrow Aa \mid B`
   |   :math:`B \rightarrow A \mid bb`
   |   :math:`A \rightarrow a \mid bc \mid B`

   Unit Production Dependency Graph:



.. slide:: Example (2)

   | Remove the unit production rules, and add these rules:
   |   :math:`S \rightarrow a \mid bc \mid bb`
   |   :math:`A \rightarrow bb`
   |   :math:`B \rightarrow a \mid bc`

   | Result:
   |   :math:`S \rightarrow a \mid bc \mid bb \mid Aa`
   |   :math:`A \rightarrow a \mid bb \mid bc`
   |   :math:`B \rightarrow a \mid bb \mid bc`


.. slide:: Theorem

   | **Theorem:** Let :math:`L` be a CFL that does not contain :math:`\lambda`.
     Then there exists a CFG for :math:`L` that does not have any
     useless productions, :math:`\lambda`-productions, or unit-productions.

   | **Proof:**
   |   1. Remove :math:`\lambda`-productions
   |   2. Remove unit-productions
   |   3. Remove useless productions

   | Order is important.
     Removing :math:`\lambda`-productions can create unit-productions!

   There are additional examples in the book. 


.. slide:: Chomsky Normal Form (CNF)

   | **Definition:**  A CFG is in Chomsky Normal Form (CNF) if all
     productions are of the form 
   |   :math:`A \rightarrow BC` or :math:`A \rightarrow a`
   | where :math:`A, B, C \in V` and :math:`a \in T`.

   | Why would you want to put a grammar in this form?
   | Because it is easier to work with (reason about), so will see it
     in future.


.. slide:: Theorem:

   Any CFG :math:`G` with :math:`\lambda` not in
   :math:`L(G)` has an equivalent grammar in CNF.

   | **Proof:**
   | 1. Remove :math:`\lambda`-productions, unit productions, and  
        useless productions. (We already know how to do this.)
   | 2. For every right-hand-side of length :math:`> 1`,
        replace each terminal :math:`x_i` by a new variable
        :math:`C_j` and add the production :math:`C_j \rightarrow x_i`. 
   |    Note: All productions are in the correct form or the
        right-hand-side is a string of variables. 
   | 3. Replace every right-hand-side of length :math:`> 2` by a
        series of productions, each with right-hand-side of length 2.


.. slide:: Example (1)

   | :math:`S \rightarrow CBcd`
   | :math:`B \rightarrow b`
   | :math:`C \rightarrow Cc \mid e`

   .. Do THIS IN JFLAP, note JFLAP uses different names for the 
      additional variables than below.


   | (after step 1)
   | :math:`S \rightarrow CBC_1C_2`
   | :math:`B \rightarrow b`
   | :math:`C \rightarrow CC_3 \mid e`
   | :math:`C_1 \rightarrow c`
   | :math:`C_2 \rightarrow d`
   | :math:`C_3 \rightarrow c`


.. slide:: Example (2)

   | (after step 2):
   | :math:`S \rightarrow CZ_1`
   | :math:`Z_1 \rightarrow BZ_2`
   | :math:`Z_2 \rightarrow C_1C_2`
   | :math:`B \rightarrow b`
   | :math:`C \rightarrow CC_3 \mid e`
   | :math:`C_1 \rightarrow c`
   | :math:`C_2 \rightarrow d`
   | :math:`C_3 \rightarrow c`

   NOTE: Can get rid of :math:`\lambda`-productions and unit
   productions first!


.. slide:: Greibach Normal Form (GNF)

   | **Definition:** A CFG is in Greibach normal form (GNF) if 
     all productions have the form 
   |   :math:`A \rightarrow ax`
   | where :math:`a \in T` and :math:`x \in V^*`

   This is like an s-grammar (or simple grammar, Linz page 144),
   except the s-grammar definition includes a further restriction that
   any pair :math:`(A, a)` can occur at most in one rule. 

   This is so that you wouldn't have to backtrack (only one 
   choice to match the derivation of a string).
   So it is very restrictive.

   .. Guess that not possible to convert in CFG into an s-grammar??


.. slide:: GNF Theorem

   | For every CFG :math:`G`, there exists a grammar in GNF.
   |    See proof in book.

   | Example:
   |   :math:`S \rightarrow AB`
   |   :math:`A \rightarrow aA \mid bB \mid b`
   |   :math:`B \rightarrow b`

   | Simple substitutions give us:
   |   :math:`S \rightarrow aAB \mid bBB \mid bB`
   |   :math:`A \rightarrow aA \mid bB \mid b`
   |   :math:`B \rightarrow b`


.. Slide:: What You Should Know

   |    Know what usless productions, unit productions, etc. are
   |    Don't memorize the processes for eliminating them, but
        understand how they work in principle.
   |    Know what the GNF and CNF forms are.
