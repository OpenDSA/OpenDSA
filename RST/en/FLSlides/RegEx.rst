.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Expression
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Regular Languages and Expressions
=================================

.. slide:: Regular Expressions

   Regular expressions are a way to specify the set of strings that
   define a language.

   | There are three operators that can be used:
   |    :math:`+` union (or)
   |    :math:`\cdot` concatenation (AND)
   |    :math:`\,^*` star-closure (repeat 0 or more times)
   | We often omit showing the :math:`\cdot` for concatenation.
  

.. slide:: Examples

   | Example 1:
   |   :math:`(a + b)^* \cdot a \cdot (a + b)^* = (a + b)^*a(a + b)^*`
   |   What language is this? 
       All strings from :math:`\{a, b\}^*` that contain at least one
       :math:`a`.

   | Example2 :
   |   :math:`(aa)^*`
   |   What language is this?
       Strings of :math:`a` 's with an even number of :math:`a` 's


.. slide:: Definition for Regular Expression

   Given :math:`\Sigma`,

   #. :math:`\emptyset`, :math:`\lambda`, and :math:`a \in \Sigma` are
      regular expressions.

   #. | If :math:`r` and :math:`s` are regular expressions then
      |    :math:`r + s` is a regular expression.
      |    :math:`r s` is a regular expression.
      |    :math:`(r)` is a regular expression.
      |    :math:`r^*` is a regular expression.

   #. :math:`r` is a regular expression iff it can be derived from (1)
      with a finite number of applications of (2).


.. slide:: Definition for Regular Language

   :math:`L(r) =` language denoted by some regular expression :math:`r`.

   #. :math:`\emptyset`, :math:`\{\lambda\}`, and :math:`\{a \in \Sigma\}`
      are languages denoted by a regular expression.

   #. | If :math:`r` and :math:`s` are regular expressions, then
      |    :math:`L(r + s) = L(r) \cup L(s)`
      |    :math:`L(r s) = L(r) \cdot L(s)`
      |    :math:`L((r)) = L(r)`
      |    :math:`L((r)^*) = (L(r))^*`


.. slide:: Precedence Rules

   * :math:`()` highest
   * :math:`^*` next highest
   * :math:`\cdot`
   * :math:`+` lowest

   Example: :math:`ab^* + c = (a(b)^*) + c`


.. slide:: Examples of Regular Languages

   #. :math:`\Sigma = \{a,b\}`,
      :math:`\{w \in {\Sigma}^{*} \mid w`
      has an odd number of :math:`a` 's followed by an even number of
      :math:`b` 's :math:`\}`:

      | ??

      .. .. a(aa)^*(bb)^*

   #. :math:`\Sigma=\{a,b\}`, :math:`\{w \in {\Sigma}^{*} \mid w` has
      no more than three :math:`a` 's and must end in :math:`ab\}`:

      | ??

      .. .. (b^*ab^*ab^* + b^*ab^*)ab Note we need the "or" here for the
         cases of 2 a's and 1 a before the ab.

   #. Regular expression for positive and negative integers:

      | ??

      .. .. (d* + -d*) for d a digit.


.. slide:: Regular Expressions vs. Regular Languages

   | Recall that we previously **defined** the term regular language to mean
     the languages that are recognized by a DFA.
   |    (Which is the same as the languages recognized by an NFA.)
   |    How do regular expressions relate to these?

   | We can easily see NFAs for :math:`\emptyset`, :math:`\lambda`, and
     :math:`a \in \Sigma`.
   |    But what about the "more interesting" regular expressions?
   |    Can every regular language :math:`r` be described by some
        regular expression? 


.. slide:: Regular Expression :math:`\rightarrow` NFA (1)

   **Theorem:** Let :math:`r` be a R.E.
   Then :math:`\exists` NFA :math:`M` such that :math:`L(M) = L(r)`.

   | **Proof:** By simple simulation/construction.
   |    (This is a standard approach to proving such things!)

   We aleady know that we can easily do :math:`\emptyset`, 
   :math:`\{\lambda\}`, and :math:`\{a\}` for :math:`a \in \Sigma`.


.. slide:: Regular Expression :math:`\rightarrow` NFA (1a)

   Here is an NFA that accepts nothing (:math:`\emptyset`).

   .. inlineav:: phiREtoNFACON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/phiREtoNFACON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/phiREtoNFACON.js
      :output: show

   Here is an NFA that accepts an empty string (:math:`\lambda`).

   .. inlineav:: lambdaREtoNFACON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/lambdaREtoNFACON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/lambdaREtoNFACON.js
      :output: show

.. slide:: Regular Expression :math:`\rightarrow` NFA (1b)

   Here is an NFA that accepts :math:`a \in \Sigma`.

   .. inlineav:: aREtoNFACON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/aREtoNFACON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/aREtoNFACON.js
      :output: show


.. slide:: Regular Expression :math:`\rightarrow` NFA (2)

   Suppose that :math:`r` and :math:`s` are regular expressions.
   (By induction...)
   That means that there is an NFA for :math:`r` and an NFA for
   :math:`s`.


      #. :math:`r + s`. Simply add a new start state and a new final
         state, each connected (in parallel) with :math:`\lambda`
         transitions to both :math:`r` and :math:`s`.
      #. :math:`r \cdot s`. Add new start state and new final state,
         and connect them with :math:`\lambda` transitions in series.
      #. :math:`r^*`. Add new start and final states, along with
         :math:`\lambda` transitions that allow free movement between
         them all.

      << Question: Why are we using NFAs for this proof?>>

      .. .. Because it is so much easier to assume that there is a
            single final state that we can control access to. And we
            know that L(NFA) = L(DFA).


.. slide:: Regular Expression :math:`\rightarrow` NFA: Schematic

   .. inlineav:: schematicRepCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/schematicRepCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicRepCON.js
      :output: show


.. slide:: Regular Expression :math:`\rightarrow` NFA: Or

   .. inlineav:: schematicORRepCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/schematicORRepCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicORRepCON.js
      :output: show


.. slide:: .

   .

   
.. slide:: Regular Expression :math:`\rightarrow` NFA: Concatenation

   .. inlineav:: schematicConcatRepCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/schematicConcatRepCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicConcatRepCON.js
      :output: show


.. slide:: Regular Expression :math:`\rightarrow` NFA: Star

   .. inlineav:: schematicStarRepCON ss
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/schematicStarRepCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicStarRepCON.js
      :output: show


.. slide:: NFA :math:`\rightarrow` Regular Expression

   **Theorem:** Let :math:`L` be regular. Then :math:`\exists` a
   regular expression such that :math:`L = L(r)`.

   | Perhaps you see that any regular expression can be
     implemented as a NFA.
   | For most of us, its not obvious that any NFA can be converted to a
     regular expression.

   | Proof Idea:
   |    Remove states sucessively, generating equivalent 
        generalized transition graphs (GTG) until only two states are
        left (initial state and one final state).
   |    The transition between these states is a regular expression
        that is equivalent to the original NFA. 


.. slide:: Generalized Transition Graph (GTG)

   A Generalized Transition Graph (GTG) is a transition
   graph whose edges can be labeled with any regular expression.
   Thus, it "generalizes" the standard transition graph.

   **Definition:** A complete GTG is a complete graph, meaning that every
   state has a transition to every other state.
   Any GTG can be converted to a complete GTG by adding edges labeled
   :math:`\emptyset` as needed.


.. slide:: Proof (1)

   | :math:`L` is regular :math:`\Rightarrow \exists` NFA :math:`M` such
     that :math:`L = L(M)`.
   | 1. Assume :math:`M` has one final state, and :math:`q_0 \notin F`.
   | 2. Convert :math:`M` to a complete GTG.
   |    Let :math:`r_{ij}` stand for the label of the edge from :math:`q_i`
        to :math:`q_j`.
   | 3. If the GTG has only two states, then it has this form:

   .. inlineav:: RegExGTGCON dgm
      :links: AV/VisFormalLang/Regular/RegExGTGCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/RegExGTGCON.js
      :align: center

   | Add an arrow to the start state.
   | Then, the corresponding regular expression is:
     :math:`r = (r^*_{ii}r_{ij}r^*_{jj}r_{ji})^*r^*_{ii}r_{ij}r^*_{jj}`


.. slide:: Proof (2)

   (See homework question about why its fair to just assume that
   there is a single final state, and that the start state is not final.)

   If the GTG has three states, then it must have the following form:

   .. inlineav:: RegExGTG3sCON dgm
      :links: AV/VisFormalLang/Regular/RegExGTG3sCON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/RegExGTG3sCON.js
      :align: center


.. slide:: Proof (3)

   In this case, make the following replacements:

   | REPLACE :math:`\quad` WITH
   | :math:`r_{ii} \qquad\qquad\qquad\qquad r_{ii}+r_{ik}r_{kk}^{*}r_{ki}`
   | :math:`r_{jj} \qquad\qquad\qquad\qquad r_{jj}+r_{jk}r_{kk}^{*}r_{kj}`
   | :math:`r_{ij} \qquad\qquad\qquad\qquad r_{ij}+r_{ik}r_{kk}^{*}r_{kj}`
   | :math:`r_{ji} \qquad\qquad\qquad\qquad r_{ji}+r_{jk}r_{kk}^{*}r_{ki}`

   After these replacements, remove state :math:`q_k` and its edges.


.. slide:: Proof (4)

   | If the GTG has four or more states, pick any state :math:`q_k` that
     is not the start or the final state.
     It will be removed.
   | For all :math:`o \neq k, p \neq k`, replace :math:`r_{op}` with
     :math:`r_{op} + r_{ok}r^*_{kk}r_{kp}`.

   | When done, remove :math:`q_k` and all its edges.
   | Continue eliminating states until only two states are left.
   | Finish with step 3 of the "Proof (1)" slide.


.. slide:: Proof (5)

   | In each step, we can simplify regular expressions :math:`r` and
     :math:`s` with any of these rules that apply:
   |    :math:`r + r = r`
   |    :math:`s + r{}^{*}s = r{}^{*}s`
   |    :math:`r + \emptyset = r`
   |    :math:`r\emptyset = \emptyset`
   |    :math:`\emptyset^{*} = \{\lambda\}`
   |    :math:`r\lambda = r`
   |    :math:`(\lambda + r)^{*} = r^{*}`
   |    :math:`(\lambda + r)r^{*} = r^{*}`

   And similar rules.


.. slide:: Example

   .. inlineav:: NFAtoRECON ss
      :links:   AV/VisFormalLang/Regular/NFAtoRECON.css
      :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/NFAtoRECON.js
      :output: show


.. slide:: Conclusion

   We have now demonstrated that R.E. is equivalent (meaning, goes both
   directions) to DFA.
