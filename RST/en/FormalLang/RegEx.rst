.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Expression
   :topic: Finite Automata

Regular Expressions
===================

Regular Expressions
-------------------

Regular expressions are a way to specify a set of strings that define
a language.

There are three operators that can be used:

* :math:`+` union (or)
* :math:`\cdot` concatenation (AND)
* :math:`*` star-closure (repeat 0 or more times)

We often omit showing the :math:`\cdot` for concatenation.
  
| Example:
|   :math:`(a + b)^* \cdot a \cdot (a + b)^* = (a + b)^*a(a + b)^*`
|   What language is this? 
    All strings from :math:`\{a, b\}^*` that contain at least one
    :math:`a`.

| Example: 
|   :math:`(aa)*`
|   What language is this?
    Strings of :math:`a` 's with an even number of :math:`a` 's

**Definition:** Given :math:`\Sigma`,

#. :math:`\emptyset`, :math:`\lambda`, and :math:`a \in \Sigma` are R.E.

#. If :math:`r` and :math:`s` are R.E. then

   * :math:`r + s` is R.E.
   * :math:`r s` is R.E.
   * :math:`(r)` is R.E.
   * :math:`r^*` is R.E.

#. :math:`r` is a R.E iff it can be derived from (1) with a finite
   number of applications of (2).

**Definition:** :math:`L(r) =` language denoted by R.E. :math:`r`.

#. :math:`\emptyset`, :math:`\{\lambda\}`, and :math:`\{a \in \Sigma\}`
   are languages denoted by a R.E.

#. If :math:`r` and :math:`s` are R.E. then

   * :math:`L(r + s) = L(r) \cup L(s)`
   * :math:`L(r s) = L(r) \cdot L(s)`
   * :math:`L((r)) = L(r)`
   * :math:`L((r)^*) = (L(r)^*)`


Precedence Rules
~~~~~~~~~~~~~~~~

* :math:`*` highest
* :math:`\cdot`
* :math:`+` lowest

Example: :math:`ab^* + c = (a(b)^*) + c`

Examples
~~~~~~~~

#. :math:`\Sigma = \{a,b\}`,
   :math:`\{w \in {\Sigma}^{*} \mid w`
   has an odd number of :math:`a` 's followed by an even number of
   :math:`b` 's :math:`\}`.

   :math:`(aa)^{*}a(bb)^{*}`



#. :math:`\Sigma=\{a,b\}`, :math:`\{w \in {\Sigma}^{*} \mid w` has no more than
   three :math:`a` 's and must end in :math:`ab\}`.

   :math:`b^{*}(ab^{*} + ab^{*}ab^{*} + \lambda)ab`

#. Regular expression for positive and negative integers

   :math:`0 + (- + \lambda)((1+2+\ldots +9)(0+1+2+\ldots +9)^{*})`

   What is acceptable, and not acceptable? 


Regular Expressions vs. Regular Languages
-----------------------------------------

Recall that we **define** the term :term:`regular language` to mean
the languages that are recognized by a DFA.
(Which is the same as the languages recognized by an NFA.)
How do regular expressions relate to these?

We can easily see NFAs for :math:`\emptyset`, :math:`\lambda`, and
:math:`a \in \Sigma` (see Linz Figure 3.1).
But what about the "more interesting" regular expressions?
And, can any regular language be described by a regular expression?

**Theorem:** Let :math:`r` be a R.E.
Then :math:`\exists` NFA :math:`M` such that :math:`L(M) = L(r)`.

**Proof:** By simple simulation/construction. (This is a standard
approach to proving such things!)

   We aleady know that we can easily do :math:`\emptyset`, 
   :math:`\{\lambda\}`, and :math:`\{a\}` for :math:`a \in \Sigma`.

   Suppose that :math:`r` and :math:`s` are R.E. (By induction...)
   That means that there is an NFA for :math:`r` and an NFA for
   :math:`s`.

      #. :math:`r + s`. Simply add a new start state and a new final
         state, each connected (in parallel) with :math:`\lambda`
         transitions to both :math:`r` and :math:`s`. [Linz 3.3]
      #. :math:`r \cdot s`. Add new start state and new final state,
         and connect them with :math:`\lambda` transitions in series.
         [Linz 3.4]
      #. :math:`r^*`. Add new start and final states, along with
         :math:`\lambda` transitions that allow free movement between
         them all. [Linz 3.5]
    
**Example:** :math:`ab^* + c`

.. note::

   Do this in JFLAP, Ideally, show R.E -> NFA, then NFA -> DFA,
   then DFA -> min DFA.


**Theorem:** Let :math:`L` be regular. Then :math:`\exists` R.E. such
that :math:`L = L(r)`.

.. note::

   Probably most can quickly see that any R.E can be implemented as a
   NFA. It might not be so obvious that any NFA can be converted to a
   R.E.

   Proof Idea: remove states sucessively, generating equivalent 
   generalized transition graphs (GTG) until only two states are left 
   (one initial state and one final state). The transition between
   these states is a R.E that is equivalent to the original NFA.

**Definition:** A Generalized Transition Graph (GTG) is a transition
graph whose edges can be labeled with any regular expression.
Thus, it "generalizes" the standard transition graph. [See Linz 3.8]

**Definition:** A complete GTG is a complete graph, meaning that every
state has a transition to every other state.
Any GTG can be converted to a complete GTG by adding edges labeled
:math:`\emptyset` as needed.

.. TODO::

   What does a :math:`\emptyset` transition mean? It is definitely not
   the same thing as a :math:`\lambda` transition. Does it mean "Drop
   dead when you try that, it is not allowed?"

**Proof:**

:math:`L` is regular :math:`\Rightarrow \exists` NFA :math:`M` such
that :math:`L = L(M)`.

#. Assume :math:`M` has one final state, and :math:`q_0 \notin F`.

#. Convert :math:`M` to a complete GTG.

   Let :math:`r_{ij}` stand for the label of the edge from :math:`q_i`
   to :math:`q_j`.

#. If the GTG has only two states, then it has this form:

   .. odsafig:: Images/nfatore1.png
      :width: 250
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: nfatore1

   Add an arrow to the start state. Then, the corresponding regular
   expression is:

   :math:`r = (r^*_{ii}r_{ij}r^*_{jj}r_{ji})^*r^*_{ii}r_{ij}r^*_{jj}`

#. If the GTG has three states, then it must have the following form:

   .. odsafig:: Images/nfatore2.png
      :width: 250
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: nfatore2

   In this case, make the following replacements:

   .. math::
      
      \begin{array}{lll}
      REPLACE & \ \ \ \ \ \ \ \ & WITH \\ \hline
      r_{ii} && r_{ii}+r_{ik}r_{kk}^{*}r_{ki} \\
      r_{jj} && r_{jj}+r_{jk}r_{kk}^{*}r_{kj} \\
      r_{ij} && r_{ij}+r_{ik}r_{kk}^{*}r_{kj} \\
      r_{ji} && $r_{ji}+r_{jk}r_{kk}^{*}r_{ki} \\
      \end{array}

   After these replacements, remove state :math:`q_k` and its edges.

#. If the GTG has four or more states, pick any state :math:`q_k` that
   is not the start or the final state.
   It will be removed.
   For all :math:`o \neq k, p \neq k`, replace :math:`r_{op}` with
   :math:`r_{op} + r_{ok}r^*_{kk}r_{kp}`.

   When done, remove :math:`q_k` and all its edges.
   Continue eliminating states until only two states are left.
   Finish with step (3).

#. In each step, we can simplify regular expressions :math:`r` and
   :math:`s` with any of these rules that apply:

   .. math::
      
      \begin{array}{l}
      r + r = r \\
      s + r{}^{*}s = r{}^{*}s\\
      r + \emptyset = r\\
      r\emptyset = \emptyset\\
      \emptyset^{*} = \{\lambda\}\\
      r\lambda = r\\
      (\lambda + r)^{*} = r^{*}\\
      (\lambda + r)r^{*} = r^{*}\\
      \end{array}

   And similar rules.

.. note::

   **Example:** DO WITH JFLAP. Then add another state :math:`q_3` and
   add arcs :math:`d(q1,a) = q3, \quad d(q3,a) = q1, \quad d(q3,b) = q2`. 

   Examples are in ``~rodger/cl/cps140/jflapex/chap3dfatore1.jff`` and
   ``chap3dfatore2.jff``.

.. odsafig:: Images/stnfatore2s.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: stnfatore2s

We have now demonstrated that R.E. is equivalent (meaning, goes both
directions) to DFA.
