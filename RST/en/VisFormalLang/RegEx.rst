.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
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

**Regular expression** (RegEx or R.E.) is a way to specify a set of
strings that defines a language.

There are three operators that can be used:

  * :math:`+` union (OR)
  * :math:`\cdot` concatenation (AND)
  * :math:`*` star-closure (repeat 0 or more times)

We often omit showing the :math:`\cdot` for concatenation.
  
| Example:
|   :math:`(a + b)^* \cdot a \cdot (a + b)^* = (a + b)^*a(a + b)^*`
|   Q: What language is this? 
|   A: All strings from :math:`\{a, b\}^*` that contain at least one
    :math:`a`.

| Example: 
|   :math:`(aa)*`
|   Q: What language is this?
|   A: Strings of :math:`a` 's with an even number of :math:`a` 's.
|   Note that we need to be careful about our alphabet.
    Here, we only want strings of :math:`a` 's regardless of the
    actual alphabet. Written as a RegEx, this is clear regardless of
    whether the actual alphabet contains other letters (such as b's).
    But its not so clear in English when we say "strings
    with an even number of a's" if we want to rule out "aabaa" from
    the alphabet of :math:`\Sigma = \{a, b\}` or not.
|

**Definition:** Given :math:`\Sigma`,

  #. :math:`\emptyset`, :math:`\lambda`, and :math:`a \in \Sigma` are R.E.

  #. If :math:`r` and :math:`s` are regular expressions, then

      * :math:`r + s` is a R.E.
      * :math:`r s` is a R.E.
      * :math:`(r)` is a R.E.
      * :math:`r^*` is a R.E.

  #. :math:`r` is a R.E if and only if it can be derived from (1) with
     a finite number of applications of (2). 

**Definition:** :math:`L(r)` is the language denoted by regular
expression :math:`r`.

  #. :math:`\emptyset`, :math:`\{\lambda\}`, and :math:`\{a \in \Sigma\}` are each languages denoted by some R.E.
     
      Note that :math:`\emptyset = \{\}` (the empty set),
      while :math:`\lambda = \{ \lambda \}`,
      meaning the set containing just the empty string.
      Q: Does every regular language include the empty string?

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


Examples of Regular Expressions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

#. :math:`\Sigma = \{a,b\}`,
   :math:`\{w \in {\Sigma}^{*} \mid w`
   has an odd number of :math:`a` 's followed by an even number of
   :math:`b` 's :math:`\}`.

   :math:`(aa)^{*}a(bb)^{*}`

   Q: Does this language include the empty string?


#. :math:`\Sigma=\{a,b\}`, :math:`\{w \in {\Sigma}^{*} \mid w` has no more than
   three :math:`a` 's and must end in :math:`ab\}`.

   :math:`b^{*}(ab^{*} + ab^{*}ab^{*} + \lambda)ab`

#. Regular expression for positive and negative integers

   :math:`0 + (- + \lambda)((1+2+\ldots +9)(0+1+2+\ldots +9)^{*})`

   Q: What is acceptable for this language, and what is not acceptable?

Q: Can every finite set of strings be described by a R.E.?
You should be able to answer this question.   
   
Now that we have defined what regular expressions are, a good question
to ask is: Why do we need them?
In particular, we already know two ways to define a language.
One is conceptually, as an English description with more or less
mathematical precision.
The other is operationally in the form of a DFA (or equivalently, an
NFA).
So why yet another representation?
A good answer is that the other two representations are deficient
(in different ways) that the regular expression overcomes.
Describing it in English is imprecise.
Even if we use math to make it precise, its something that we cannot
easily operationalize.
On the other hand, defining a DFA (or NFA) is a bit time consuming.
We can use a tool like JFLAP or OpenFLAP, but that takes a relatively
long time to work through the GUI, even if it is a relatively small
machine.
In contrast, we can type out a regular expression within a system like
JFLAP.
In that case, it is both fast to type and operationalizeable
(in the sense that we can then convert the RegEx to a DFA, which
implements the acceptor for the regular expression).
Of course, while a program (or machine) can be shorter or longer,
it might be hard for us to come up with the program.
In the same way, we might have to struggle to come up with the regular
expression.
But its probably short to type once we have it.


Regular Expressions vs. Regular Languages
-----------------------------------------

Recall that we **define** the term :term:`regular language` to mean
the languages that are recognized by a DFA.
(Which we know is the same as the languages recognized by an NFA,
because we know that every NFA can be converted to a DFA.)
How do regular expressions relate to these?
Are they the same languages?
Is one a subset of the other?
Or are they just different collections of languages?

We can easily see NFAs for :math:`\emptyset`, :math:`\lambda`, and
:math:`a \in \Sigma`.

Here is an NFA that accepts nothing (:math:`\emptyset`).

.. inlineav:: phiREtoNFACON dgm
   :links:   DataStructures/FLA/FLA.css AV/VisFormalLang/Regular/phiREtoNFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/phiREtoNFACON.js
   :output: show

Here is an NFA that accepts an empty string (:math:`\lambda`).

.. inlineav:: lambdaREtoNFACON dgm
   :links:   AV/VisFormalLang/Regular/lambdaREtoNFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/lambdaREtoNFACON.js
   :output: show

Here is an NFA that accepts :math:`a \in \Sigma`.

.. inlineav:: aREtoNFACON dgm
   :links:   AV/VisFormalLang/Regular/aREtoNFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/aREtoNFACON.js
   :output: show

But what about the "more interesting" regular expressions that are
built from AND, OR, and concatenation?
Do these all have maching NFAs?
If we could find a way to "simulate" each of these operations with an
NFA, then we know that we can construct a machine for any R.E.
This idea of "simulation" is a standard approach to proving such things!

Suppose that :math:`r` and :math:`s` are R.E. (By induction...)
That means that there is an NFA for :math:`r` and an NFA for
:math:`s`.
To help us visualize such things, it helps if we can have a standard
way to draw the idea of an arbitrary NFA.
And since we want to combine machines together, it will be much easier
if we know that the arbitrary machine has one start state and one
final state.
Well, we already know that all NFAs have a single start state.
But not all NFAs have a single final state.

.. Note::

   Consider any NFA, and its various final states.
   Is there an easy way to convert this to an **equivalent NFA** with a
   **single final state**?
   The answer is "yes", by adding a new state that will be the final
   state for the machine.
   Figure out for yourself how you can do this.

The following slideshow shows how to convert an NFA with multiple
final states to one with a single final state. 

.. inlineav:: schematicRepCON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicRepCON.js
   :output: show

Our next step is to show how, for each R.E. operator, we can build an
NFA that implements the behavior of that operator on its operand NFAs.

OR: :math:`r + s`.

This means that we have NFAs :math:`r` and :math:`s`, and we want a
new NFA that OR's them together.
Simply add a new start state and a new final state,
each connected (in parallel) with :math:`\lambda`
transitions to both :math:`r` and :math:`s`.

.. inlineav:: schematicORRepCON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicORRepCON.js
   :output: show

:math:`r \cdot s`. Add new start state and new final state,
and connect them with :math:`\lambda` transitions in series.

.. inlineav:: schematicConcatRepCON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicConcatRepCON.js
   :output: show

:math:`r^*`. Add new start and final states, along with
:math:`\lambda` transitions that allow free movement between
them all.

.. inlineav:: schematicStarRepCON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/schematicStarRepCON.js
   :output: show

   Create a slideshow that shows how we create a machine that
   implements star closure, like Linz Figure 3.5
            
**Example:** :math:`ab^* + c` (Multiple Final Stage)

Here is an NFA that accepts :math:`ab^* + c`

.. inlineav:: ABStarOrCCON dgm
   :links:   AV/VisFormalLang/Regular/ABStarOrCCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/ABStarOrCCON.js
   :output: show


Since we have the NFA that accepts :math:`ab^* + c`, we can convert it to a DFA
then to a minimized DFA.


.. inlineav:: RENFAtoDFACON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/RENFAtoDFACON.js
   :output: show


.. note::

   At this point, you should go to OpenFLAP and try it for yourself.
   Type in the R.E, then convert it to an NFA,
   then convert the NFA to a DFA, then minimize the DFA.

You should notice that when OpenFLAP automatically converts the
R.E. to a NFA, the resulting NFA does not look like the "intuitive"
version in the diagram above.
This is because the automatic process is a little more complicated.
To understand how an algorithm can automatically convert an R.E. to a
NFA, a lot of the steps are simply building the machine with the
transformations in the diagrams shown earlier in this module |---|
such as combining two machines to OR them or to AND them, etc.

**Definition:** A Generalized Transition Graph (GTG) is a transition
graph whose edges can be labeled with any regular expression.
Thus, it "generalizes" the standard transition graph.

.. inlineav:: GTGExampleCON dgm
   :links:   AV/VisFormalLang/Regular/GTGExampleCON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/GTGExampleCON.js
   :output: show

The process for automatically converting from a R.E. to an NFA simply
moves step by step through the R.E. from the lowest precedence
operators (OR) to break the R.E. down into partial machines that are
combined together.
It is fairly simple process, as seen here.

.. inlineav:: GTGtoNFACON ss
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/GTGtoNFACON.js
   :output: show

One thing that this example should make clear is that the concept of
an NFA is really helpful for our understanding.
While every NFA **can** be replaced by an equivalent DFA,
it is a lot easier to understand instuitively the process of
converting an R.E. to an NFA than it would be if we had
come up with the DFA directly.

Finally, here is a slideshow that presents all of the details that an
automated process would go through to convert an R.E. to a minimized DFA.

.. inlineav:: REtoMinimizedDFACON ss
   :links:   AV/VisFormalLang/Regular/REtoMinimizedDFACON.css
   :scripts: DataStructures/FLA/FA.js AV/VisFormalLang/Regular/REtoMinimizedDFACON.js lib/paper-core.min.js DataStructures/FLA/REtoFAController.js lib/underscore.js DataStructures/FLA/Discretizer.js
   :output: show


Converting Regular Languages to Regular Expressions
---------------------------------------------------

Since every regular expression has an NFA that implements it,
this means that the regular expressions are a subset of
the regular languages.
The next question is: Does every regular language have a regular
expression?

**Theorem:** Let :math:`L` be regular.
Then there exists an R.E. such that :math:`L = L(r)`.

Perhaps you thought it fairly intuitive to see that any regular
expression can be implemented as a NFA, as described above.
But for most of us, its not obvious that any NFA can be converted to a
regular expression.
This proof is rather difficult, and we are just going to give a sketch.

| Proof Idea:
|   Use a process that removes states sucessively,
    generating equivalent generalized transition graphs (GTG) until
    only two states are left (the initial state and one final state),
    with the resulting regular expression as the transition.
|   This regular expression left as the sole transition is equivalent
    to the original NFA.

**Definition:** A complete GTG is a complete graph, meaning that every
state has a transition to every other state.
Any GTG can be converted to a complete GTG by adding edges labeled
:math:`\emptyset` as needed.

**Proof:**

:math:`L` is regular :math:`\Rightarrow \exists` NFA :math:`M` such
that :math:`L = L(M)`.

#. Assume :math:`M` has one final state, and :math:`q_0 \notin F`.

#. Convert :math:`M` to a complete GTG.

   Let :math:`r_{ij}` stand for the label of the edge from :math:`q_i`
   to :math:`q_j`.

#. If the GTG has only two states, then it has this form:

   .. inlineav:: RegExGTGCON dgm
      :links: AV/VisFormalLang/Regular/RegExGTGCON.css
      :scripts: AV/VisFormalLang/Regular/RegExGTGCON.js
      :align: center

   Add an arrow to the start state. Then, the corresponding regular
   expression is:

   :math:`r = (r^*_{ii}r_{ij}r^*_{jj}r_{ji})^*r^*_{ii}r_{ij}r^*_{jj}`

   Of course, we might have a machine with its start state also a
   final state.
   There are two ways to deal with this.
   One is to come up with a rule in this case.
   (Hint: Its the same rule, with an extra "OR" added for the case
   where we stay in the start state.)
   The other is to first convert our NFA to one with a single final
   state (separate from the start state).
   This is really easy to do, and is probably a homework problem for
   the class.

#. If the GTG has three states, then it must have the following form:

   .. inlineav:: RegExGTG3sCON dgm
      :links: AV/VisFormalLang/Regular/RegExGTG3sCON.css
      :scripts: AV/VisFormalLang/Regular/RegExGTG3sCON.js
      :align: center

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

   | :math:`r + r = r` (OR a subset with itself is the same subset)
   | :math:`s + r{}^{*}s = r{}^{*}s` (OR a subset with a bigger subset
     is just the bigger subset)
   | :math:`r + \emptyset = r` (OR a subset with the empty set is just
     the subset)
   | :math:`r\emptyset = \emptyset` (Intersect a subset with the empty
     set yields the empty set)
   | :math:`\emptyset^{*} = \{\lambda\}` (Special case)
   | :math:`r\lambda = r` (Traversing a R.E. and then doing a free
     transition is just the same R.E.)
   | :math:`(\lambda + r)^{*} = r^{*}` (Taking a free transition adds nothing.)
   | :math:`(\lambda + r)r^{*} = r^{*}` (Being able to do an option
     extra :math:`r` adds nothing)

   And similar rules.

   .. inlineav:: RegExConvertCON dgm
      :links: AV/VisFormalLang/Regular/RegExConvertCON.css
      :scripts: AV/VisFormalLang/Regular/RegExConvertCON.js
      :align: center

You should convince yourself that, in this image, the right side is a
proper re-creation of the left side.
In other words, the R.E labeling the self-loop for the left state
in the right machine is correctly characterizing all the ways that one
can remain in state :math:`q_0` of the left machine.
Likewise, the R.E. labeling the edge from the left state to the right
state in the machine on the right is correctly characterizing all the
ways that one can go from :math:`q_0` to :math:`q_2` in the machine on
the right.

We have now demonstrated that regular expressions are equivalent to DFAs.
Meaning that given any regular expression, we have an algorithm to
convert it to some DFA.
And vice versa.

.. inlineav:: NFAtoRECON ss
   :links:   AV/VisFormalLang/Regular/NFAtoRECON.css
   :scripts: AV/VisFormalLang/Regular/NFAtoRECON.js
   :output: show
