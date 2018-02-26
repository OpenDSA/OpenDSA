.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies:
   :topic:

Transforming Grammars
=====================

Transforming Grammars
---------------------

We use grammars to represent a programming language.
Want to know: Is a given string (or program :math:`x`) valid
(syntactically correct)?
Same as asking if it is in the language.

Last time we showed that if we could transform a CFG into 
a CFG with no :math:`\lambda`-productions, and no rules like 
:math:`A \rightarrow B`, then we could determine if :math:`w` is in or
not in :math:`L(G)` in :math:`2|w|` rounds, each step adding a terminal
or increasing in length.
(Linz 5.2) 

This works, but it is not fast, that is, not linear! 

We will look at lots of methods for transforming grammars.
Some will be forms that are easier to work with,
some are easier to use in proofs.

| Key question: Are there ways to transform (restrict) CFGs such that
|   1) We can process efficiently
|   2) without restricting the power of CFGs

.. note::

   Ask yourself: What does it mean "without restricting the power of CFGs"?

Specifically, we will look at restrictions on the right hand side of the
production rules.
We want to be able to automatically transform an arbitrary CFG
into an equivalent restricted CFG.

We will consider CFL without :math:`\lambda`.
It would be easy to add :math:`\lambda` to any grammar by adding a new
:term:`start symbol` :math:`S_0`,

   :math:`S_0 \rightarrow S \mid \lambda`

**Substitution Theorem** Let :math:`G` be a CFG.
Suppose :math:`G` contains

   :math:`A \rightarrow x_1Bx_2`

where :math:`x_i \in (V \cup T)^{*}`,
:math:`A` and :math:`B` are different variables,
and :math:`B` has the productions

   :math:`B \rightarrow y_1|y_2|\ldots|y_n`.

Then, we can construct :math:`G'` from :math:`G` by deleting 

   :math:`A \rightarrow x_1Bx_2`

from :math:`P` and adding to it

   :math:`A \rightarrow x_1y_1x_2|x_1y_2x_2|\ldots | x_1y_nx_2`.

Then, :math:`L(G) = L(G')`.

Question: Why don't we also delete :math:`B` rules?

Answer: These might be used by another production

Question: What if :math:`A` and :math:`B` are the same? 

.. math::
   
   \begin{array}{lll}
   S \rightarrow aBa & \mbox{becomes} & S \rightarrow aaSa \mid aaa\\
   B \rightarrow aS \mid a & & B \rightarrow aS \mid a\\ 
   \end{array}

Then the B productions become useless productions. 


**Definition:** A production of the form :math:`A \rightarrow Ax`, 
:math:`A \in V, x \in (V \cup T)^*` is :term:`left recursive`.

**Example:** Previous expression grammar was left recursive.
(from Chapter 5 notes) 

It is left recursive because it has SOME left recursive productions. 
Not all of the productions are left recursive. 

   | :math:`E \rightarrow E+T \mid T`
   | :math:`T \rightarrow T*F \mid F`
   | :math:`F \rightarrow I \mid (E)`
   | :math:`I \rightarrow a \mid b`

A top-down parser (like LL parsing) 
would want to derive the leftmost terminal as soon as possible.
But in the left recursive grammar above, in order to derive 
a sentential form that has the leftmost terminal, we have to 
derive a sentential form that has other terminals in it. 

Derivation of :math:`a+b+a+a` is:

.. math::

   E \Rightarrow E+T \Rightarrow E+T+T \Rightarrow E+T+T+T
   \stackrel{*}{\Rightarrow} a+T+T+T

NOTE: nicer to have a grammar that would derive the :math:`a` first
without all the other +'s. 

We will eliminate the left recursion so that we can derive 
a sentential form with the leftmost terminal and no other terminals. 

**Theorem (Removing Left recursion)**
Let :math:`G = (V,T,S,P)` be a CFG. 
Divide productions for variable :math:`A` into left-recursive and non
left-recursive productions:

   | :math:`A \rightarrow Ax_1 \mid Ax_2 \mid \ldots \mid Ax_n`
   | :math:`A \rightarrow y_1 \mid y_2 \mid \ldots \mid y_m`

where :math:`x_i`, :math:`y_i` are in :math:`(V \cup T)^*`.

Any derivation will start with :math:`y_i`. 

:math:`A` is not a prefix of any of the second type. 

Then :math:`G = (V \cup \{Z\}, T, S, P')` and :math:`P'` replaces
rules of form above by

   | :math:`A \rightarrow y_i \mid y_iZ, i = 1, 2, \ldots, m`
   | :math:`Z \rightarrow x_i \mid x_iZ, i = 1, 2, \ldots, n`

.. note::

   Consider a derivation: :math:`y_3x_7x_1x_3` 


.. topic:: Example

   .. math::

      \begin{array}{lll}
      E \rightarrow E+T \mid T & \mbox{becomes} & E \rightarrow T \mid TZ\\
      & & Z \rightarrow +T \mid +TZ \\ 
      T \rightarrow T*F \mid F & \mbox{becomes} & T \rightarrow F \mid FY \\ 
      & & Y \rightarrow *F \mid *FY \\ 
      \end{array}

When you get rid of left-recursion, the grammar is in the appropriate
form for a top-down parser, but the grammar has more variables and
productions.

Now, the derivation of :math:`a+b+a+a` is:

   | :math:`E \Rightarrow TZ \Rightarrow FZ \Rightarrow IZ \Rightarrow aZ`

Didn't have to look at any other terminals yet! 

**Useless productions**

   | :math:`S \rightarrow aB \mid bA`
   | :math:`A \rightarrow aA`
   | :math:`B \rightarrow Sa`
   | :math:`C \rightarrow cBc \mid a`

What can you say about this grammar?

:math:`A`, :math:`S`, and :math:`B` are useless variables since they
can't derive a string of terminals.  
:math:`C` is useless because you can't get 
:math:`S \stackrel{*}{\Rightarrow} xCy \stackrel{*}{\Rightarrow} w`,
where :math:`w \in T^*`. 

**Theorem: (useless productions)**
Let :math:`G` be a CFG.
Then :math:`\exists\ G'` that does not contain any useless variables or
productions such that :math:`L(G) = L(G')`.

**To Remove Useless Productions:**

Let :math:`G = (V,T,S,P)`.

| I. Compute :math:`V_1 =` {Variables that can derive strings of terminals}
|    1. :math:`V_1 = \emptyset`
|    2. Repeat until no more variables added
|       * For every :math:`A \in V` with :math:`A \rightarrow x_1x_2\ldots x_n`,
          :math:`x_i \in (T^* \cup V_1)`, add :math:`A` to :math:`V_1`
|    3. :math:`P_1 =` all productions in :math:`P` with symbols in
        :math:`(V_1 \cup T)*`

Then :math:`G_1 = (V_1, T, S, P_1)` has no variables that can't derive
strings.

Now we need to get rid of productions we can't use. 


II. Draw Variable Dependency Graph

For :math:`A \rightarrow xBy`, draw :math:`A \rightarrow B`.

Draw :math:`A` in a circle, :math:`B` in a circle, and an arc from
:math:`A` to :math:`B`.

Remove productions for :math:`V` if there is no path from :math:`S` to
:math:`V` in the dependency graph.
Resulting Grammar :math:`G'` is such that :math:`L(G) = L(G')` and
:math:`G'` has no useless productions.

.. topic:: Example

   | :math:`S \rightarrow aB \mid bA`
   | :math:`A \rightarrow aA`
   | :math:`B \rightarrow Sa \mid b`
   | :math:`C \rightarrow cBc \mid a`
   | :math:`D \rightarrow bCb`
   | :math:`E \rightarrow Aa \mid b`

   :math:`V_1 = \{B, C, D, E, S\}`, :math:`A` is useless. 

   .. math::

      \begin{array}{ll} 
      G_1: \ \ \ \ & S \rightarrow aB \\ 
      & B \rightarrow Sa \mid a \\ 
      & C \rightarrow cBc \mid a \\ 
      \end{array} 

   Dependency graph: 

   .. odsafig:: Images/uselessgraph.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: uselessgraph

   .. math::
      
      \begin{array}{ll} 
      G': \ \ \ \ & S \rightarrow aB \\ 
      & B \rightarrow Sa \mid b \\ 
      \end{array}
      
Q: How would you implement II?
How do you know which nodes are accessible from S?
Use DFS or BFS. 

NOTE: Last time talked about simpler CFG that had no
:math:`\lambda`-productions, now we will show how to get rid of them. 

**Theorem** (remove :math:`\lambda` productions)
Let :math:`G` be a CFG with :math:`\lambda` not in :math:`L(G)`.
Then :math:`\exists` a CFG :math:`G'` having no
:math:`\lambda`-productions such that :math:`L(G) = L(G')`. 

**To Remove** :math:`\lambda` **-productions**

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

.. topic:: Example

   | :math:`S \rightarrow Ab`
   | :math:`A \rightarrow BCB \mid Aa`
   | :math:`B \rightarrow b \mid \lambda`
   | :math:`C \rightarrow cC \mid \lambda`

   :math:`V_n = \{B, C, A\}` 

   .. math::

      \begin{array}{ll} 
      G': \ \ \ \ \ & S \rightarrow Ab \mid b\\ 
      &A \rightarrow BCB \mid BC \mid BB \mid CB \mid B \mid C \mid Aa \mid a\\ 
      &B \rightarrow b \\ 
      &C \rightarrow cC \mid c \\ 
      \end{array}
      
   NOTE: Don't add :math:`A \rightarrow \lambda`! 

**Definition:** :term:`Unit Production <unit production>`

   | :math:`A \rightarrow B`

where :math:`A, B \in V`.

**Consider removing unit productions:**

Suppose we have 

   .. math::

      \begin{array}{lll}
      A \rightarrow B & \ \ \ \ \ \mbox{becomes} \ \ \ \ \ 
        & A \rightarrow a \mid ab \\ 
      B \rightarrow a \mid ab \\
      \end{array}

But what if we have 

   .. math::
      
      \begin{array}{lll}
      A \rightarrow B & \ \ \ \ \ \mbox{becomes} \ \ \ \ \ 
        & A \rightarrow C \\ 
      B \rightarrow C & & B \rightarrow A \\ 
      C \rightarrow A & & C \rightarrow B \\ 
      \end{array}

   But we don't get rid of unit-productions! 


**Theorem** (Remove unit productions)
Let :math:`G = (V, T, S, P)` be a CFG without
:math:`\lambda`-productions.
Then :math:`\exists` CFG :math:`G = (V', T', S, P')` that does not
have any unit-productions and :math:`L(G) = L(G')`.


**To Remove Unit Productions:**

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


.. topic:: Example

   | :math:`S \rightarrow AB`
   | :math:`A \rightarrow B`
   | :math:`B \rightarrow C \mid Bb`
   | :math:`C \rightarrow A \mid c \mid Da`
   | :math:`D \rightarrow A`


   .. odsafig:: Images/unitgraph.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: unitgraph

   .. math::

      \begin{array}{ll} 
      \mbox{After a)} & S \rightarrow AB \\ 
      & B \rightarrow Bb \\ 
      & C \rightarrow c \mid Da \\ 
      \end{array} 

   .. math::

      \begin{array}{ll} 
      G': & S \rightarrow AB \\ 
      & A \rightarrow Bb \mid c \mid Da \\ 
      & B \rightarrow Bb \mid c \mid Da\\ 
      & C \rightarrow c \mid Bb \mid Da\\ 
      & D \rightarrow c \mid Bb \mid Da\\ 
      \end{array} 

**Theorem:** Let :math:`L` be a CFL that does not contain :math:`\lambda`.
Then :math:`\exists` a CFG for :math:`L` that does not have any
useless productions, :math:`\lambda`-productions, or unit-productions.

**Proof:**

   | 1. Remove :math:`\lambda`-productions
   | 2. Remove unit-productions
   | 3. Remove useless productions

Note order is very important.
Removing :math:`\lambda`-productions can create unit-productions!
QED.

There are additional examples in the book. 

**Definition:**  A CFG is in Chomsky Normal Form (CNF) if all
productions are of the form 

   | :math:`A \rightarrow BC \ \ or A \rightarrow a`

where :math:`A, B, C \in V` and :math:`a \in T`.

Why would you want to put a grammar in this form?
Because it is easier to work with in proofs. 

.. topic:: Theorem:

   Any CFG :math:`G` with :math:`\lambda` not in
   :math:`L(G)` has an equivalent grammar in CNF.

   **Proof:**

   | 1. Remove :math:`\lambda`-productions, unit productions, and  
        useless productions.

   | 2. For every right-hand-side of length :math:`> 1`,
        replace each terminal :math:`x_i` by a new variable
        :math:`C_j` and add the production :math:`C_j \rightarrow x_i`. 

   |    Note: All productions are in the correct form or the
        right-hand-side is a string of variables. 

   | 3. Replace every right-hand-side of length :math:`> 2` by a
        series of productions, each with right-hand-side of length 2.
        QED.

.. topic:: Example


   | :math:`S \rightarrow CBcd`
   | :math:`B \rightarrow b`
   | :math:`C \rightarrow Cc \mid e`

   .. math::

      \begin{array}{lll} 
      \mbox{(after step 1)} & G': & S \rightarrow CBC_1C_2 \\ 
      && B \rightarrow b \\ 
      && C \rightarrow CC_3 \mid e \\ 
      && C_1 \rightarrow c \\ 
      && C_2 \rightarrow d \\ 
      && C_3 \rightarrow c \\ 
      \\
      \mbox{(after step 2)} & G'': & S \rightarrow CZ_1 \\ 
      && Z_1 \rightarrow BZ_2 \\ 
      && Z_2 \rightarrow C_1C_2 \\ 
      && B \rightarrow b \\ 
      && C \rightarrow CC_3 \mid e \\ 
      && C_1 \rightarrow c \\ 
      && C_2 \rightarrow d \\ 
      && C_3 \rightarrow c \\ 
      \end{array}

   NOTE: Can get rid of :math:`\lambda`-productions and unit
   productions first!

**Definition:** A CFG is in Greibach normal form (GNF) if 
all productions have the form 

   | :math:`A \rightarrow ax`

where :math:`a \in T` and :math:`x \in V^*`

This is like an s-grammar (or simple grammar, p.142 Linz), 
except the s-grammar definition includes a further restriction that
any pair :math:`(A, a)` can occur at most in one rule. 

This is so that you wouldn't have to backtrack (only one 
choice to match the derivation of a string).
So it very restrictive.


.. topic:: Theorem

   For every CFG :math:`G` with :math:`\lambda` not in
   :math:`L(G)`, :math:`\exists` a grammar in GNF.

   **Proof:**

      | 1. Rewrite grammar in CNF.

      | 2. Relabel Variables :math:`A_1, A_2, \ldots A_n`

      | 3. Eliminate left recursion and use substitution to get all
           productions into the form:
      |       :math:`A_i \rightarrow A_jx_j, j > i`
      |       :math:`Z_i \rightarrow A_jx_j, j \le n`
      |       :math:`A_i \rightarrow ax_i`
      |    where :math:`a \in T, x_i \in V*`,
           and :math:`Z_i` are new variables introduced for left recursion.
      |    Use Theorems 6.1 and 6.2 to get rid of left recursion. 

      | 4. All productions with :math:`A_n` are in the correct form, 
           :math:`A_n \rightarrow ax_n`.
           Use these productions as substitutions to get
           :math:`A_{n-1}` productions in the correct form.
           Repeat with :math:`A_{n-2}`, :math:`A_{n-3}`, etc until all
           productions are in the correct form.

WHAT YOU SHOULD KNOW: know forms, GNF, CNF, unit production,
left recursion, etc. Do not need to memorize rules for transforming,
but should understand how to do it. 
