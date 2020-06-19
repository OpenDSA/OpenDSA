.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Deterministic Finite Automata
   :satisfies: Context-Free Languages
   :topic: Finite Automata

Context-Free Languages
======================

Context-Free Languages
----------------------
In the previous chapters, we see that some languages are regular languages,
which means that we can define a DFA, NFA, Regular expression, or Regular
grammar for them.

Examples of regular languages:

* keywords in a programming language
* names of identifiers
* integers
* a finite list of miscillaneous symbols: = \ ;

Then we covered the Pumping Lemma which is a tool to
prove that if a language is not regular.

Examples for Not Regular languages:

* expressions: :math:`((a + b) - c)`
* block structures (:math:`\{\}` in Java/C++ and ``begin`` ... ``end``
  in Pascal)

We know that not all languages are not regular, since we've proved
some are not. Now we will look at a class of languages that is
larger than the regular languages, and more powerful:
Context-free languages.

**Definition:** A grammar :math:`G = (V, T, S, P)` is
context-free if all productions are of the form

   | :math:`A \rightarrow x`

| where :math:`A \in V` and :math:`x \in (V \cup T)^*`.
|    (:math:`T` includes :math:`\lambda`.)

**Definition:** :math:`L` is a context-free language (CFL) iff
:math:`\exists` context-free grammar (CFG) :math:`G` such that
:math:`L = L(G)`.

The above definition for Grammars is exactly the same as the one we
keep using from the first chapter in this book.
This means that all grammars we used (including the Regular Grammars)
are Context Free Grammars.

.. topic:: Example

   | :math:`G =(\{S\}, \{a, b\}, S, P)`
   |   :math:`S \rightarrow aSb\ |\ ab`
   | Derivation of :math:`aaabbb`:
   |   :math:`S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aaabbb`
   | :math:`L(G) = \{a^nb^n | n > 0\}`

   .. note::

      We have seen this before! It's not regular!

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

**Definition:** String derivation is to start at the starting point of
the grammar and do replacements until you can do no more replacements.
A variable in the grammar can be replaced by the right hand side of its
rule

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

By looking at the previous example, some sentential forms have multiple
variables, this raises a question, Which variable should be replaced?
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

   .. inlineav:: derivIdeaCON dgm
      :links: AV/VisFormalLang/CFG/derivIdeaCON.css
      :scripts: AV/VisFormalLang/CFG/derivIdeaCON.js
      :align: justify

   |

.. topic:: Example

   | :math:`G = (\{S, A, B\}, \{a, b, c\}, S, P)`
   |    :math:`S \rightarrow AcB`
   |    :math:`A \rightarrow aAa\ |\ \lambda`
   |    :math:`B \rightarrow Bbb\ |\ \lambda`

   .. inlineav:: derivEx1CON dgm
      :links: AV/VisFormalLang/CFG/derivEx1CON.css
      :scripts: AV/VisFormalLang/CFG/derivEx1CON.js
      :align: justify

   NOTE: Derivation trees do not define an order in which variables are
   replaced! We could however get a leftmost or rightmost derivation
   easily from looking at the tree.

    .. note::
                    
       Question: What string is this?

       Answer: aacbb
   
       Question: Describe the language that this grammar produces.

       Answer: Zero or more pairs of a's followed by c followed by zero
       or more pairs of b's.

       Question: What if we want the same number of a's and b's?

       Answer: S -> c | aaSbb
       


Let us see an example for how the previous parse tree was built.

.. inlineav:: ParseTree1CON ss
   :links:   AV/VisFormalLang/CFG/ParseTree1CON.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/PDA.js AV/VisFormalLang/CFG/ParseTree1CON.js
   :output: show

.. avembed:: Exercises/FLA/NumParseTreeNodes.html ka
   :long_name: Determine Number of nodes

**Definitions:** Partial derivation tree - subtree of derivation tree.

If partial derivation tree has root :math:`S` then it represents a
sentential form.

Leaves from left to right in a derivation tree form the *yield* of
the tree.

If :math:`w` is the yield of a derivation tree, then it must be that
:math:`w \in L(G)`.

The yield for the example above is :math:`aacbb`.

.. topic:: Example

   A partial derivation tree that has root S (so it is a sentential
   form):

   .. inlineav:: partDeriv1CON dgm
      :links: AV/VisFormalLang/CFG/partDeriv1CON.css
      :scripts: AV/VisFormalLang/CFG/partDeriv1CON.js
      :align: justify

   The yield for this example is :math:`aAacB`.


.. topic:: Example

   A partial derivation tree that does not have root S:

   .. inlineav:: partDeriv2CON dgm
      :links: AV/VisFormalLang/CFG/partDeriv2CON.css
      :scripts: AV/VisFormalLang/CFG/partDeriv2CON.js
      :align: justify

   |      

**Membership:** Given CFG :math:`G` and string :math:`w \in \Sigma^*`,
is :math:`w \in L(G)`?

If we can find a derivation of :math:`w`, then we would know that
:math:`w` is in :math:`L(G)`.

Why would anybody want to do this?
Consider the case where :math:`G` is a grammar for Java,
and :math:`w` is a Java program.
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

.. avembed:: Exercises/FLA/StringGenFromGmr.html ka
   :long_name: String Generated By a Grammar

**Exhaustive Search Algorithm**

If you were to run this in OpenFLAP, it takes a LONG time, but
eventually accepts.
The problem is that this approach is rather inefficient
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
:math:`S \Rightarrow SS \Rightarrow ... \Rightarrow SSSSSSSSSS \Rightarrow ...`
This process cannot determine that :math:`baaba` is **not** in :math:`L(G)`.

We want to consider special forms of context free grammars such that
we can determine when strings are or are not in the language.
It turns out to be easy take a context-free grammar and
convert it into a special form that makes it easier to test
membership.

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

.. _eg1:

Ambiguity
---------

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

**Definition:** If :math:`L` is CFL and :math:`G` is an unambiguous
CFG such that :math:`L = L(G)`, then :math:`L` is unambiguous.

.. note::

   Why are we studying CFL? Because we want to be able to represent
   syntactically correct programs.

The review problem set for this module contains four review problems, the first three of which refer to the same grammar.  The first problem is about determining how many parse trees a given string has in a given grammar.

.. avembed:: Exercises/FLA/NumParseTrees1.html ka
   :long_name: Number Of Parse Trees, Problem 1

Ambiguous Grammars (2)
~~~~~~~~~~~~~~~~~~~~~~

This problem is again about determining how many parse trees a given string
has in a given grammar.

.. avembed:: Exercises/FLA/NumParseTrees2.html ka
   :long_name: Number Of Parse Trees, Problem 2

Ambiguous Grammars (3)
~~~~~~~~~~~~~~~~~~~~~~

This problem is once more about determining how many parse trees a
given string has in a given grammar.

.. avembed:: Exercises/FLA/NumParseTrees3.html ka
   :long_name: Number Of Parse Trees, Problem 3

Ambiguous Grammars (4)
~~~~~~~~~~~~~~~~~~~~~~

This problem will help you discover ambiguities in grammars as well as
convince yourself that a grammar is not ambiguous.

.. avembed:: Exercises/FLA/DeterminingAmbiguities.html ka
   :long_name: Determining Ambiguities


Eliminating Grammar Ambiguity
-----------------------------
In general, there is no universal solution to eliminate grammar ambiguity.
However, based on the grammar on hand, there are some tricks that can help
to eliminate the amibuity. These common tricks are:

* Operator precedence
* Operator associativity
* Rewrite the grammar from scratch

Precedence
~~~~~~~~~~

By looking at the grammar :ref:`eg1`, we will notice that there are two
different results for the expression 2+4*2. The difference came from which
operator we evaluated first. In the first tree, we can see that the
multiplication sign was deeper in the tree. So we must evaluate it
before evaluationg the addition, this gives the multiplication higer
precedence than addition. In the other parse tree, the addition was
deepre than the multiplication, and in this cas, we gave addition higer
precedence than multiplication. So, to remove the ambiguity for that grammar,
we need to ensure the correct precedence rule for arithmatic operations.
In other words, we need to make sure that we always evaluate the
multiplication first.

This problem illustrates how grammatical structure influences the
evaluation of arithmetic expressions, and thus the semantics of
programs.  Note that, **to get credit for this problem,** you
must solve it correctly three times in a row because the question is
randomized.  After you get the question right one time, the *Check
Answer* button will then allow you to proceed to the next instance of
the question.

.. avembed:: Exercises/FLA/EvalExp.html ka
   :long_name: Evaluating Expression Based on Grammar

Now let us try to remove the ambiguity for the grammar :ref:`eg1`.

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

Let us see how the previous parse tree was built.

.. inlineav:: ParseTreeForExpCON ss
   :links:   AV/VisFormalLang/CFG/ParseTreeForExpCON.css
   :scripts: AV/VisFormalLang/CFG/ParseTreeForExpCON.js
   :output: show

Associativity
~~~~~~~~~~~~~

.. avembed:: Exercises/FLA/Associativity.html ka
   :long_name: Associativity

Precedence and Associativity
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This problem illustrates how grammatical structure impacts the
associativity property and order of precedence of arithmetic
operators.

.. avembed:: Exercises/FLA/PrecedenceAndAssociativity.html ka
   :long_name: Precedence and associativity



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

This problem asks you to provide a characterization in English of the
language generated by a BNF grammar.   After you finish it, there is one more problem about Extended Backus-Naur Form, which is described before the problem.

.. avembed:: Exercises/FLA/CharacterizeLang3.html ka
   :long_name: Characterizing Language 3

Extended BNF
------------

The symbols we have used in our representation of grammars
collectively comprise what is known as *Backus-Naur Form* (BNF).  In
*Extended Backus-Naur Form* (EBNF) we add five meta-symbols to those
already used in BNF notation:


   1. Kleene closure operator :math:`*`, which means "zero or more". Hence if :math:`<fn\_name>`   were a non-terminal representing a valid function name and :math:`<argument>` were a non-terminal representing a valid argument, then the EBNF notation for function calls with zero or more arguments (with no commas between them) would be

      .. math::

        <fn\_name> "(" <argument>* ")"

   2. Positive closure operator :math:`+`.  The EBNF notation for function calls that must have at least one argument would be

      .. math::

        <fn\_name> "(" <argument>+ ")"

   3. The two paired parenthesis symbols :math:`( \; )`, which are used for grouping.  For example, if :math:`<positive\_number>` were the non-terminal denoting a valid positive number, then the following EBNF would dictate that we *must* have a plus or minus sign preceding a number

     .. math::

      (+ | -) <positive\_number>

   4. The "optional operator" :math:`?`, which specifies that you can have zero or one of whatever grammatical structure precedes the operator.  For example, if our language allowed an optional plus or minus sign in front of a number, we would use the EBNF

      .. math::

        (+ | -)? <positive\_number>

EBNF is used to reduce the number of productions a grammar needs to
specify a language.  However, it does not increase the expressive power of
grammars, that is, any grammatical structure that can be expressed in
EBNF can also be expressed in BNF if one is willing to use more
productions.



This last problem is about the equivalence between a given BNF grammar (the
same one as in part 4 above) and a smaller EBNF grammar.

.. avembed:: Exercises/FLA/ExtendedBNF.html ka
   :long_name: Extended BNF


**More on CFG for C++**

Last time we "attempted" to write a CFG for C++,
it is possible to write a CFG that recognizes all syntactically
correct C++ programs, but there is a problem that the CFG
also accepts incorrect programs.
For example, it can't recognize that it is an error to declare the
same variable twice, once as an integer and once as a char.

We can write a CFG :math:`G` such that
:math:`L(G) = \{ \mbox{syntactically correct C++ programs} \}`.

But note that
:math:`\{ \mbox{semantically correct C++ programs} \} \subset L(G)`.

Another example:
Can't recognize if formal parameters match actual parameters in number
and type:

   | declare: int Sum(int a, int b, int c) ...
   | call: newsum = Sum(x,y);

.. odsascript:: Exercises/FLA/EvalExp.js
