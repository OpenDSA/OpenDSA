.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Finite Automata
   :satisfies: Context-Free Languages
   :topic: Finite Automata

Context-Free Languages
======================

Context-Free Languages
----------------------
Examples of regular languages:

* keywords in a programming language
* names of identifiers
* integers
* a finite list of miscillaneous symbols: = \  ;

Not Regular languages:

* expressions: :math:`((a + b) - c)`
* block structures (:math:`\{\}` in Java/C++ and ``begin`` ... ``end`` in Pascal)

We know that not all languages are not regular, since we've proved
some are not. 

Now we will look at a class of languages that is larger than the
regular languages, and more powerful: Context-free languages. 

**Definition:** A grammar :math:`G = (V, T, S, P)` is 
context-free if all productions are of the form

   | :math:`A \rightarrow x`

| where :math:`A \in V` and :math:`x \in (V \cup T)^*`.
|    (:math:`T` includes :math:`\lambda`.)

**Definition:** :math:`L` is a context-free language (CFL) iff
:math:`\exists` context-free grammar (CFG) :math:`G` such that
:math:`L = L(G)`.

.. topic:: Example

   | :math:`G =(\{S\}, \{a, b\}, S, P)`
   |   :math:`S \rightarrow aSb\ |\ ab`
   | Derivation of :math:`aaabbb`:
   |   :math:`S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aaabbb`
   | :math:`L(G) = \{a^nb^n | n > 0\}`

   .. note::

      We have seen this before! Its not regular!
      
   **Definition:** A linear grammar has at most one variable on the
   right hand side of any production.
   Thus, right linear and left linear grammars are also linear grammars. 

   So, this is a linear grammar. 

.. topic:: Example
           
   | :math:`G = (\{S\}, \{a, b\}, S, P)`
   |   :math:`S \rightarrow aSa\ |\ bSb\ |\ a\ |\ b\ |\ \lambda`

   | Derivation of :math:`ababa`:
   |   :math:`S \Rightarrow aSa \Rightarrow abSba \Rightarrow ababa`

   | :math:`\Sigma = \{a, b\}, L(G) = \{w \in {\Sigma}^{*} | w=w^R\}`,


.. topic:: Example

   | :math:`G = (\{S, A, B\}, \{a, b, c\}, S, P)`
   |   :math:`S \rightarrow AcB`
   |   :math:`A \rightarrow aAa\ |\ \lambda`
   |   :math:`B \rightarrow Bbb\ |\ \lambda`
   | :math:`L(G) = \{a^{2n}cb^{2m} | n, m \ge 0\}`

   | Note this is a context-free language and also a regular language. 

   | Derivations of :math:`aacbb`:
   |    1. :math:`S \Rightarrow \underline{A}cB \Rightarrow a\underline{A}acB
                  \Rightarrow aac\underline{B} \Rightarrow aac\underline{B}bb \Rightarrow aacbb`
   |    2. :math:`S \Rightarrow Ac\underline{B} \Rightarrow Ac\underline{B}bb
                 \Rightarrow \underline{A}cbb \Rightarrow a\underline{A}acbb \Rightarrow aacbb`
   |        Note: Next variable to be replaced is underlined.
   |        There are more derivations of this.

   This grammar is **not** a linear grammar, as there is a choice of 
   which variable to replace. 

   To write an algorithm to perform replacements, we need some order. 
   We will see this when we look at parsing algorithms. 

**Definition:** Leftmost derivation: in each step of a derivation,
replace the leftmost variable. (See derivation 1 above).

**Definition:** Rightmost derivation: in each step of a derivation,
replace the rightmost variable. (See derivation 2 above).

**Derivation Trees** (also known as "parse trees"): A derivation tree
represents a derivation, but does not show the order in which
productions were applied.

.. topic:: Example
           
   A derivation tree for :math:`G = (V, T, S, P)`:

   * root is labeled :math:`S`
   * leaves are labeled :math:`x`, where :math:`x \in T \cup \{\lambda\}`
   * nonleaf vertices labeled :math:`A, A \in V`
   * For rule :math:`A \rightarrow a_1a_2a_3\ldots a_n`, where
     :math:`A \in V, a_i \in (T \cup V \cup \{\lambda\})`,

   .. odsafig:: Images/lt3ptree1.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree1

.. topic:: Example

   | :math:`G = (\{S, A, B\}, \{a, b, c\}, S, P)`
   |    :math:`S \rightarrow AcB`
   |    :math:`A \rightarrow aAa\ |\ \lambda`
   |    :math:`B \rightarrow Bbb\ |\ \lambda`

   .. odsafig:: Images/lt3ptree2.png
      :width: 250
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree2

   NOTE: Derivation trees do not denote the order variables are 
   replaced! We could however get a leftmost or rightmost derivation 
   easily from looking at the tree. 


**Definitions:** Partial derivation tree - subtree of derivation tree.

If partial derivation tree has root :math:`S` then it represents a
sentential form.

Leaves from left to right in a derivation tree form the *yield* of
the tree.

If :math:`w` is the yield of a derivation tree, then it must be that
:math:`w \in L(G)`.

The yield for the example above is :math:`aacbb`.

.. topic:: Example
   
   A partial derivation tree that has root S:

   .. odsafig:: Images/lt3ptree3.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree3

   The yield of this example is :math:`aAacB` (which is a sentential form).

.. topic:: Example
   
   A partial derivation tree that does not have root S:

   .. odsafig:: Images/lt3ptree4.png
      :width: 130
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree4

**Membership:** Given CFG :math:`G` and string :math:`w \in \Sigma^*`, 
is :math:`w \in L(G)`?

If we can find a derivation of :math:`w`, then we would know that
:math:`w` is in :math:`L(G)`.

| **Motivation:**
|    :math:`G` is the grammar for Java.
|    :math:`w` is your Java program.
|    Is :math:`w` syntactically correct?

Why would anybody want to do this? :math:`G =` Java,
:math:`w =` Java program.
Is :math:`w` a syntactically correct program?
This is (part of) what a compiler does.
You write a program, you compile it, and the compiler finds all your 
syntax mistakes.
(It also "translates" the program into "bytecode" to be
executed.
We won't talk much about that aspect of compilers in this class.)

.. topic:: Example

   | :math:`G = (\{S\}, \{a, b\}, S, P), P =`
   |    :math:`S \rightarrow SS\ |\ aSa\ |\ b\ |\ \lambda`

   | :math:`L_1 = L(G) = \{w \in \Sigma^* |\ \mbox{strings with an even number of a's}\}`

   | Is :math:`abbab \in L(G)`?


**Exhaustive Search Algorithm**

If you were to run this in JFLAP, it takes a LONG time, but eventually
accepts... The problem is that this approach is rather inefficient
since it is using an exhaustive search for all ways of expanding from
the start symbol.

   | For all :math:`i = 1, 2, 3, \ldots`
   |    Examine all sentential forms yielded by :math:`i` substitutions

.. topic:: Example

   Is :math:`abbab \in L(G)`?

   | :math:`i = 1`
   |   1. :math:`S \Rightarrow SS`
   |   2. :math:`S \Rightarrow aSa`
   |   3. :math:`S \Rightarrow b`
   |   4. :math:`S \Rightarrow \lambda`
   | :math:`i=2`
   |   1. :math:`S \Rightarrow SS \Rightarrow SSS`
   |   2. :math:`S \Rightarrow SS \Rightarrow aSaS`
   |   3. :math:`S \Rightarrow SS \Rightarrow bS`
   |   4. :math:`S \Rightarrow SS \Rightarrow S`
   |   5. :math:`S \Rightarrow aSa \Rightarrow aSSa`
   |   ...

   Note: Will we find :math:`w`? How long will it take? If we just do leftmost 
   derivations, then for :math:`i = 2`, 8 of length 2. 

   When :math:`i = 6` we will find the derivation of :math:`w`.

   :math:`S \Rightarrow SS \Rightarrow aSaS \Rightarrow aSSaS \Rightarrow abSaS \Rightarrow abba \Rightarrow abbab`

Question: What happens if :math:`w` is not in :math:`L(G)`?
When do we stop the loop in the algorithm and know for sure that
:math:`w` is not going to be derived?
:math:`S \Rightarrow SS ... \Rightarrow SSSSSSSSSS ... \Rightarrow S` 

We cannot determine that :math:`baaba` is not in :math:`L(G)`. 

.. note::

   What happens if you run this in JFLAP?

We want to consider special forms of context free grammars such that 
we can determine when strings are or are not in the language. 
Easy to write a context-free grammar and then convert it into 
a special form, it will be easier to test membership. 

.. topic:: Theorem
           
   **Theorem:** If CFG :math:`G` does not contain rules of the form 

      | :math:`A \rightarrow \lambda`
      | :math:`A \rightarrow B`

   where :math:`A, B \in V`, then we can determine if
   :math:`w \in L(G)` or if :math:`w \not\in L(G)`.


   **Proof:** Consider

      | 1. length of sentential forms
      | 2. number of terminal symbols in a sentential form

   Either 1 or 2 increases with each derivation. 

   Derivation of string :math:`w` in :math:`L(G)` takes :math:`\le 2|w|` times through loop in 
   the exhaustive algorithm. 

   Thus, if there are :math:`> 2|w|` times through loop, then
   :math:`w \not\in L(G)`.

.. topic:: Example

   Let :math:`L_2 = L_1 - \{\lambda\}`. :math:`L_2 = L(G)` where :math:`G` is:

      :math:`S \rightarrow SS\ |\ aa\ |\ aSa\ |\ b`

   NOTE that this grammar is in the correct form for the theorem. 

   Show :math:`baaba \not\in  L(G)`.

   | :math:`i = 1`
   |   1. :math:`S \Rightarrow SS`
   |   2. :math:`S \Rightarrow aSa`
   |   3. :math:`S \Rightarrow aa`
   |   4. :math:`S \Rightarrow b`
   |
   | :math:`i = 2`
   |   1. :math:`S \Rightarrow SS \Rightarrow SSS`
   |   2. :math:`S \Rightarrow SS \Rightarrow aSaS`
   |   3. :math:`S \Rightarrow SS \Rightarrow aaS`
   |   4. :math:`S \Rightarrow SS \Rightarrow bS`
   |   5. :math:`S \Rightarrow aSa \Rightarrow aSSa`
   |   6. :math:`S \Rightarrow aSa \Rightarrow aaSaa`
   |   7. :math:`S \Rightarrow aSa \Rightarrow aaaa`
   |   8. :math:`S \Rightarrow aSa \Rightarrow aba`

   With each substitution, either there is at least one more 
   terminal or the length of the sentential form has increased. 

   So after we process the loop for :math:`i = 10`, we can conclude
   that :math:`baaba` is not in :math:`L(G)`.

Next chapter, we will learn methods for taking a grammar and
transforming it into an equivalent (or almost equivalent) grammar.
We will see that some ways of writing a grammar for a language are
better than others, in terms of our ability to write practical
algorithms for solving the membership problem.
For now, here is another form that will make membership testing easier. 

**Definition:** Simple grammar (or s-grammar) has all productions
of the form:

   | :math:`A \rightarrow ax`

where :math:`A \in V`, :math:`a \in T`, and :math:`x \in V^*` AND any
pair :math:`(A, a)` can occur in at most one rule.

If you use the exhaustive search method to ask if :math:`w \in L(G)`,
where :math:`G` is an s-grammar, the number of terminals increases with
each step.

Ambiguity
~~~~~~~~~

**Definition:** A CFG :math:`G` is ambiguous if :math:`\exists` some
:math:`w \in L(G)` which has two distinct derivation trees.


.. topic:: Example

   Expression grammar

   :math:`G = (\{E, I\}, \{a, b, +, *, (, )\}, E, P), P =`

      | :math:`E \rightarrow E+E\ |\ E*E\ |\ (E)\ |\ I`
      | :math:`I \rightarrow a\ |\ b`

   Derivation of :math:`a+b*a` is:

      | :math:`E \Rightarrow \underline{E}+E \Rightarrow \underline{I}+E 
               \Rightarrow a+\underline{E} \Rightarrow a+\underline{E}*E
               \Rightarrow a+\underline{I}*E \Rightarrow a+b*\underline{E}
               \Rightarrow a+b*\underline{I} \Rightarrow a+b*a`

   Corresponding derivation tree is:

   .. odsafig:: Images/lt4ptree1.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt4ptree1

   Derivation trees of expressions are evaluated bottom up. So if
   :math:`a = 2` and :math:`b = 4`, then the "result" of this
   expression is :math:`2+(4*2) = 10`.  


   Another derivation of :math:`a+b*a` is:

      | :math:`E \Rightarrow \underline{E}*E \Rightarrow \underline{E}+E*E
               \Rightarrow \underline{I}+E*E \Rightarrow a+\underline{E}*E
               \Rightarrow a+\underline{I}*E \Rightarrow a+b*\underline{E}
               \Rightarrow a+b*\underline{I} \Rightarrow a+b*a`

   Corresponding derivation tree is:

   .. odsafig:: Images/lt4ptree2.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt4ptree2

   If :math:`a = 2` and :math:`b = 4`, then the "result" of this
   expression is :math:`(2+4)*2 = 12`. 

   There are two distinct derivation trees for the same string. Thus the 
   grammar is ambiguous. The string can have different meanings depending 
   on which way it is interpreted. 

   If :math:`G` is a grammar for Java programs and :math:`w` is Bob's
   Java program, he doesn't want one compiler to give one meaning to
   his program and another compiler to interpret his program
   differently. Disaster!

.. topic:: Example

   Rewrite the grammar as an unambiguous grammar. (Specifically, with the
   meaning that multiplication has higher precedence than addition.)


      | :math:`E \rightarrow E+T\ |\ T`
      | :math:`T \rightarrow T*F\ |\ F`
      | :math:`F \rightarrow I\ |\ (E)`
      | :math:`I \rightarrow a\ |\ b`

   There is only one derivation tree for :math:`a+b*a`:

   .. odsafig:: Images/lt4ptree3.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt4ptree3

   Try to get a derivation tree with the other meaning of :math:`a+b*c`, when 
   :math:`*` is closer to the root of the tree. 

   :math:`E \Rightarrow T \Rightarrow T*F ...`
   Then the only way to include a ":math:`+`"
   before the multiplication is if the addition is enclosed in 
   parenthesis. Thus, there is only one meaning that is accepted. 

**Definition:** If :math:`L` is CFL and :math:`G` is an unambiguous
CFG such that :math:`L = L(G)`, then :math:`L` is unambiguous.

.. note::

   Why are we studying CFL? Because we want to be able to represent
   syntactically correct programs.

**Backus-Naur Form** of a grammar:

   | Nonterminals are enclosed in brackets :math:`<>`
   | For ":math:`\rightarrow`" use instead ":math:`::=`"

**Sample C++ Program:**::

   main () {
     int a;     int b;   int sum;
     a = 40;    b = 6;   sum = a + b;
     cout << "sum is "<< sum << endl; 
   }


**"Attempt" to write a CFG for C++ in BNF**
(Note: :math:`<\mbox{program}>` is start symbol of grammar.)

.. math::

   \begin{eqnarray*}
   <\mbox{program}> &::=& \mbox{main} ()\ <\mbox{block}>\\
   <\mbox{block}>   &::=& \{\ <\mbox{stmt-list}>\ \}\\
   <\mbox{stmt-list}> &::=& <\mbox{stmt}>\ |\ <\mbox{stmt}>\ <\mbox{stmt-list}>\ |\ <\mbox{decl}>\ |\ <\mbox{decl}> <\mbox{stmt-list}> \\
   <\mbox{decl}>  &::=& \mbox{int}\ <\mbox{id}>\ ;\ |\ \mbox{double}\ <\mbox{id}>\ ; \\
   <\mbox{stmt}>  &::=& <\mbox{asgn-stmt}>\ |\ <\mbox{cout-stmt}>\\
   <\mbox{asgn-stmt}>  &::=& <\mbox{id}>\ =\ <\mbox{expr}>\ ;\\
   <\mbox{expr}>  &::=& <\mbox{expr}>\ +\ <\mbox{expr}>\ |\ <\mbox{expr}>\ *\ <\mbox{expr}>\ |\ (\ <\mbox{expr}>\ )\ |\ <\mbox{id}>\\
   <\mbox{cout-stmt}>  &::=& \mbox{cout}\ <\mbox{out-list}>\\
   \end{eqnarray*}

etc., Must expand all nonterminals!

So a derivation of the program test would look like:

.. math::
   
   <\mbox{program}> &\Rightarrow&\ \mbox{main} ()\ <\mbox{block}> \\
                    &\Rightarrow&\ \mbox{main} ()\ \{\ <\mbox{stmt-list}>\ \} \\
                    &\Rightarrow&\ \mbox{main} ()\ \{\ <\mbox{decl}>\ <\mbox{stmt-list}>\ \} \\
                    &\Rightarrow&\ \mbox{main} ()\ \{\ \mbox{int}\ <\mbox{id}>\ <\mbox{stmt-list}>\ \} \\
                    &\Rightarrow&\ \mbox{main} ()\ \{\ \mbox{int}\ \mbox{a}\ <\mbox{stmt-list}>\ \} \\
                    &\stackrel{*}{\Rightarrow}&\ \mbox{complete C++ program}

**More on CFG for C++**

Last time we "attempted" to write a CFG for C++, 
it is possible to write a CFG that recognizes all syntactically 
correct C++ programs, but there is a problem that the CFG 
also accepts incorrect programs.
For example, it can't recognize that it is an error to declare the
same variable twice, once as an integer and once as a char.

We can write a CFG :math:`G` such that :math:`L(G) = \{ \mbox{syntactically correct C++ programs} \}`.

But note that :math:`\{ \mbox{semantically correct C++ programs} \} \subset L(G)`.

Another example: Can't recognize if formal parameters match actual parameters in number
and type:

   | declare: int Sum(int a, int b, int c) ...
   | call: newsum = Sum(x,y);
