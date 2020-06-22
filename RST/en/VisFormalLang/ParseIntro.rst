.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Regular Grammar
   :satisfies: Parsing Introduction
   :topic: Parsing

Parsing Introduction
====================

Introduction
------------

**Parsing:** Deciding if :math:`x \in \Sigma^*` is in :math:`L(G)` for
some CFG :math:`G`.

**Review:** What have we done so far

Consider the CFG :math:`G`:

.. math::

   \begin{eqnarray*}
   S &\rightarrow& Aa \\
   A &\rightarrow& AA \mid ABa \mid \lambda \\
   B &\rightarrow& BBa \mid  b \mid \lambda \\
   \end{eqnarray*}

Is :math:`ba` in :math:`L(G)`? Running time?

How do you determine whether a string is in :math:`L(G)`? 

Note :math:`ba` is not in :math:`L(G)` for this :math:`G`!

Try all possible derivations, but don't know when to stop.
This runs forever! 

Same grammar without lambda-rules: 

Remove :math:`\lambda`-rules, then unit productions, and 
then useless productions from the grammar :math:`G` above. 
New grammar :math:`G'` is:

.. math::

   \begin{eqnarray*}
   S &\rightarrow& Aa \mid a \\
   A &\rightarrow& AA \mid ABa \mid Aa \mid Ba \mid a \\
   B &\rightarrow& BBa \mid  Ba \mid a \mid b
   \end{eqnarray*}

Is :math:`ba` in :math:`L(G)`? Running time?

.. note::

   Earlier I said this was linear time. 

Try all possible derivations, there will be at most :math:`|w|` rounds. 
NOTE THIS IS NOT LINEAR TIME, IT TAKES A LONG TIME.
Actual time is :math:`|w|*p` where :math:`p` is the maximum number of
rules for any variable.

.. note::
   
   Given grammar to represent the C Programming language, 
   we would want to know 
   if C programs are syntactically correct.
   This is one of the phases in a compiler. 

   Want this to run as fast as possible, don't want to sit 
   there and wait for your program forever to compile. 

   We will be looking at parsing methods that are used in 
   writing compilers.
   We would like to know which rule to apply next. 


Consider string :math:`baa`.
We would like to only try the rules that give us the derivation and
ignore false paths. This would be fast!  
:math:`S \Rightarrow Aa \Rightarrow Baa \Rightarrow baa`

Top-down Parser:
~~~~~~~~~~~~~~~~

* Start with :math:`S` and try to derive the string.

   |   :math:`S \rightarrow aS \mid b`

   .. odsafig:: Images/lt10ptree1.png
      :width: 100
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt10ptree1

* Examples: LL Parser, Recursive Descent

**Bottom-up Parser:**

* Start with string, work backwards, and try to derive :math:`S`.

   .. odsafig:: Images/lt10ptree2.png
      :width: 125
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt10ptree2

* Examples: Shift-reduce, Operator-Precedence, LR Parser

When the grammar has a :math:`\lambda`-rule, it 
can be difficult to compute parse tables.
In the example above, :math:`A` can disappear
(due to :math:`A \rightarrow \lambda`), 
so when :math:`S` is on the stack, it can be replaced by :math:`Ac` if
either "a" or "c" are the lookahead or it can be replaced by
:math:`Bc` if "b" is the lookahead. 

We will use the following functions FIRST and FOLLOW to aid in
computing parse tables.


The function FIRST
~~~~~~~~~~~~~~~~~~

Some notation that we will use in defining FIRST and FOLLOW. 

   | :math:`G=(V, T, S, P)`
   | :math:`w, v \in (V \cup T)^*`
   | :math:`a \in T`
   | :math:`X, A, B \in V`
   | :math:`X_I \in (V \cup T)^+`


**Definition:** :math:`\mbox{FIRST}(w) =` the set of terminals that 
begin strings derived from :math:`w`.


   | If :math:`w \buildrel * \over \Rightarrow av` then
   |    :math:`a` is in :math:`\mbox{FIRST}(w)`
   | If :math:`w \buildrel * \over \Rightarrow \lambda` then
   |    :math:`\lambda` is in :math:`\mbox{FIRST}(w)`

Example from previous grammar: :math:`\mbox{FIRST}(aAb) = \{a\}`,
since you have :math:`aAb \Rightarrow a...b`, and
:math:`\mbox{FIRST}(Ac) = \{a, c\}` 

**To compute FIRST:**

1. :math:`\mbox{FIRST}(a) = \{a\}`
   where a is a terminal. 

2. :math:`\mbox{FIRST}(X)` where :math:`X` is a variable.

   (a) If :math:`X \rightarrow aw` then

       :math:`a` is in :math:`\mbox{FIRST}(X)`

   (b) If :math:`X \rightarrow \lambda` then

       :math:`\lambda` is in :math:`\mbox{FIRST}(X)`

   (c) If :math:`X \rightarrow Aw` and :math:`\lambda \in \mbox{FIRST}(A)`
       then

       Everything in :math:`\mbox{FIRST}(w)` is in :math:`\mbox{FIRST}(X)`

3. In general, :math:`\mbox{FIRST}(X_1X_2X_3...X_K) =`

   * :math:`\mbox{FIRST}(X_1)`

   * :math:`\cup\ \mbox{FIRST}(X_2)` if :math:`\lambda` is in
     :math:`\mbox{FIRST}(X_1)`

   * :math:`\cup\ \mbox{FIRST}(X_3)` if :math:`\lambda` is in
     :math:`\mbox{FIRST}(X_1)`

     and :math:`\lambda` is in :math:`\mbox{FIRST}(X_2)`

     ...

   * :math:`\cup\ \mbox{FIRST}(X_K)` if :math:`\lambda` is in
     :math:`\mbox{FIRST}(X_1)`

     and :math:`\lambda` is in :math:`\mbox{FIRST}(X_2)`

     ... and :math:`\lambda` is in :math:`\mbox{FIRST}(X_{K-1})`

   * :math:`-\ \{\lambda\}` if :math:`\lambda \notin \mbox{FIRST}(X_J)`
     for all :math:`J`

   (where :math:`X_I` represents a terminal or a variable) 

We will be computing :math:`\mbox{FIRST}(w)` where :math:`w` is the
right hand side of a rule.
Thus, we will need to compute :math:`\mbox{FIRST}(X)` for each 
symbol :math:`X` (either terminal or variable) that appears in the
right hand side of a rule. 

.. topic:: Example

   :math:`L = \{a^nb^mc^n : n \ge 0, 0 \le m \le 1\}`

   .. math::

      \begin{eqnarray*}
      S &\rightarrow& aSc \mid B \\
      B &\rightarrow& b \mid \lambda\\
      \end{eqnarray*}

   :math:`\mbox{FIRST}(B) = \{b, \lambda \}` 

   Using :math:`B \rightarrow b` gives that :math:`b` is in
   :math:`\mbox{FIRST}(B)`.
   Using :math:`B \rightarrow \lambda` gives that :math:`\lambda` is
   in :math:`\mbox{FIRST}(B)`.  

   :math:`\mbox{FIRST}(S) = \{a, b, \lambda\}`

   Using :math:`S \rightarrow aSc` gives that :math:`a` is in
   :math:`\mbox{FIRST}(S)`.

   Using :math:`S \rightarrow B` and :math:`\lambda` is in
   :math:`\mbox{FIRST}(B)` gives that everything in
   :math:`\mbox{FIRST}(B)` is in :math:`\mbox{FIRST}(S)`, so :math:`b`
   and :math:`\lambda` are in :math:`\mbox{FIRST}(S)`. 

   :math:`\mbox{FIRST}(Sc) = \{a, b, c\}` 

.. topic:: Example

   .. math::

      \begin{eqnarray*}
      S &\rightarrow& BCD \mid aD \\
      A &\rightarrow& CEB \mid aA\\
      B &\rightarrow& b \mid \lambda\\
      C &\rightarrow& dB \mid \lambda\\
      D &\rightarrow& cA \mid \lambda\\
      E &\rightarrow& e \mid fE\\
      \end{eqnarray*}

   .. note::

      Why do we not calculate :math:`\mbox{FIRST}(S)` first?

   :math:`\mbox{FIRST}(S) = \{b, d, c, \lambda, a\}`

   :math:`\mbox{FIRST}(A) = \{d, e, f, a\}` 

   :math:`\mbox{FIRST}(B) = \{b, \lambda\}` 

   :math:`\mbox{FIRST}(C) = \{d, \lambda\}`

   :math:`\mbox{FIRST}(D) = \{c, \lambda\}`

   :math:`\mbox{FIRST}(E) = \{e, f\}`

The function FOLLOW
~~~~~~~~~~~~~~~~~~~

**Definition:** :math:`\mbox{FOLLOW}(X) =` set of terminals that can
appear to the right of :math:`X` in some derivation. 
(We only compute FOLLOW for variables.)

   | If :math:`S \buildrel * \over \Rightarrow wAav` then
   |       :math:`a` is in :math:`\mbox{FOLLOW}(A)`
   | (where :math:`w` and :math:`v` are strings of terminals and
     variables, :math:`a` is a terminal, and :math:`A` is a variable) 

**To compute FOLLOW:**

   1. :math:`\$` is in :math:`\mbox{FOLLOW}(S)`

   2. If :math:`A \rightarrow wBv` and :math:`v \ne \lambda` then

      :math:`\mbox{FIRST}(v) - \{ \lambda \}` is in :math:`\mbox{FOLLOW}(B)`

   3. If :math:`A \rightarrow wB` or
      :math:`A \rightarrow wBv` and :math:`\lambda` is in
      :math:`\mbox{FIRST}(v)` then 

      :math:`\mbox{FOLLOW}(A)` is in :math:`\mbox{FOLLOW}(B)`

   4. :math:`\lambda` is never in FOLLOW

.. topic:: Example

   | :math:`S \rightarrow aSc \mid B`
   | :math:`B \rightarrow b \mid \lambda`

   .. note::

      Do a sample derivation of :math:`aabcc` and show that :math:`c`
      follows :math:`S`, :math:`c` follows :math:`B`. 

   Reminder: :math:`\lambda` is never in a FOLLOW set.


   :math:`\mbox{FOLLOW}(S) = \{ \$, c \}` 

   :math:`\$` goes into :math:`\mbox{FOLLOW}(S)` by rule 1.
   Then :math:`c` goes into :math:`\mbox{FOLLOW}(S)` by rule 2 since
   :math:`S \rightarrow aSc` and :math:`\mbox{FIRST}(c) = \{c\}`.  

   :math:`\mbox{FOLLOW}(B) = \{ \$, c \}` 

   By rule 3 and :math:`S \rightarrow B`, :math:`\mbox{FOLLOW}(S)` is 
   added to :math:`\mbox{FOLLOW}(B)`. 

.. topic:: Example:

   | :math:`S \rightarrow BCD \mid aD`
   | :math:`A \rightarrow CEB \mid aA`
   | :math:`B \rightarrow b \mid \lambda`
   | :math:`C \rightarrow dB \mid \lambda`
   | :math:`D \rightarrow cA \mid \lambda`
   | :math:`E \rightarrow e \mid fE`

   :math:`\mbox{FOLLOW}(S) = \{\$\}` 

   :math:`\mbox{FOLLOW}(A) = \{\$\}`

   :math:`\mbox{FOLLOW}(B) = \{d, c, e, f\$\}`

   :math:`\mbox{FOLLOW}(C) = \{c, e, f\$\}`

   :math:`\mbox{FOLLOW}(D) = \{\$\}`

   :math:`\mbox{FOLLOW}(E) = \{b, \$\}`
