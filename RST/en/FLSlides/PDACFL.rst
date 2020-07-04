.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Pushdown Automata
   :satisfies: PDA/CFG Equivalence
   :topic: PDA

.. slideconf::
   :autoslides: False


Equivalence of NPDA and CFG
===========================

.. slide:: Equivalence of NPDA and CFG

   | Now we want to show that NPDA's and CFG both represent CFL's. 
   | We will show that we can take any CFG and construct a NPDA, and
     vice versa.

 
.. slide:: Any CFG has a NPDA

   **Theorem:** For any CFG :math:`L` not containing :math:`\lambda`,
   :math:`\exists` a NPDA :math:`M` such that :math:`L = L(M)`.

   | **Proof** (sketch)
   |   Assume (to simplify) that the CFG is in Griebach Normal Form
   |     Grammar :math:`G' = (V,T,S,P)` is in GNF if all productions in
         :math:`P` are of the form: 
   |       :math:`A \rightarrow ax`
   |       :math:`A \in V, a \in T, x \in V^*`
   |   We will construct a NPDA that performs a leftmost-derivation of
       the string.
   |   Given (:math:`\lambda` -free) CFL :math:`L`.
   |     :math:`\Rightarrow \exists` CFG :math:`G` such that :math:`L = L(G)`.
   |     :math:`\Rightarrow \exists\ G'` in GNF, such that :math:`L(G) = L(G')`. 

.. slide:: Proof Idea

   | At any point in the derivation, we have terminals on the left,
     and variables on the right.
   |   Terminals on the left are inputs seen.
   |   Variables on the right are kept on the PDA's stack.
   | Simply replace the first variable with the derivation that gives
     us the next input characters, and maybe some variables to stick
     on the stack.
   | Big problem: Which production to do next?
   |   No, this is not a problem! Because... non-determinism!!


.. slide:: Proof Example (1)

   :math:`S \rightarrow aSbb \mid a`

   | Transform to GNF:
   |   :math:`S \rightarrow aSA \mid a`
   |   :math:`A \rightarrow bB`
   |   :math:`B \rightarrow b`


.. slide:: Proof Example (2)

   | Construct NPDA :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, z, F)`
   | :math:`Q = \{q_0, q_1, q_f\}, \Sigma = T, \Gamma = V \cup \{z\}, F = \{q_f\}`
   |   1. :math:`M` starts by putting :math:`S` on the stack 
   |   2. For each production 
   |         :math:`A \rightarrow a X_1 X_2 \ldots X_n`
   |      put :math:`(q_1, X_1 X_2 \ldots X_n)` in :math:`\delta(q_1, a, A)`
   |      (Pop :math:`A` from the stack, read "a" from tape,
          and push :math:`X_1 X_2 \ldots X_n` onto the stack) 
   |   3. Accept if :math:`S \stackrel{*}{\Rightarrow} w \in \Sigma^*`
          (all variables on the stack are replaced by terminals or
          :math:`\lambda`)

.. slide:: Proof Example (3)

   * :math:`S \rightarrow aSA \mid a`
   * :math:`A \rightarrow bB`
   * :math:`B \rightarrow b` 


.. slide:: Another Example

   Let :math:`G' = (V,T,S,P), P =`
   |   :math:`S \rightarrow aSA\ |\ aAA\ |\ b`
   |   :math:`A \rightarrow bBBB`
   |   :math:`B \rightarrow b`

   QUESTION: Is this grammar in GNF?

   .. odsafig:: Images/lt7pf3.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf3

   Trace abbbbb in grammar and pda. 


.. slide:: Any NPDA has a CFG (1)

   | Want to show that each NPDA represents a CFG, so we 
     will take a NPDA :math:`M` and convert it to a CFG. 
   | It will be an easier construction if we take the NPDA and put all the 
     transitions in a simpler form. 
   | So, there are some side proofs (here and in book) to justify the
     simplifying assumptions.


.. slide:: Simplifying Assumptions (1)

  | 1. NPDA has a single final state :math:`q_f` that is entered if
    and only if the stack is empty.
  | 2. Can limit the PDA transitions to increase or decrease the stack by
    one symbol

   | **Theorem:** Given a NPDA :math:`M`, :math:`\exists`
     a NPDA :math:`M'` such that all transitions have the form
     :math:`\delta(q_i, a, A) = \{c_1, c_2, \ldots c_n\}` where 
   |   :math:`c_i = (q_j, \lambda)` or
   |   :math:`c_i = (q_j, BC)`
   | Each move either increases or decreases stack contents by a single symbol.


.. slide:: Simplifying Assumptions (2)

   .. odsafig:: Images/lt7pf4.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt7pf4


.. slide:: Any NPDA has a CFG (2)

   **Theorem:** If :math:`L = L(M)` for some NPDA :math:`M`,
   then :math:`L` is a CFG.

   | **Proof Sketch:**
   | Given NPDA :math:`M`, first, construct an equivalent NPDA
     :math:`M'` that meets the simplifying assumptions.
   | Reverse the process used to generate a PDA from a grammar
     to simulate the PDA in the grammar
   |   The content of the stack should be reflected in the variable
       part of the sentential form
   |   The processed input is the terminal prefix of the sentential
       form
