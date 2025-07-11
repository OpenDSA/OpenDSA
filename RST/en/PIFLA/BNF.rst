.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Compilers and Backus-Naur Form
   :author: Mostafa Mohammed; Cliff Shaffer
   :institution: Virginia Tech
   :satisfies:
   :topic: Compilers; Backus-Naur Form
   :keyword: Compiler; Backus-Naur Form
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Brief introduction to the use of Backus-Naur Form for a CFG as used by compilers.

Writing Compilers
=================

Part of the definition for a programming language is its grammar.
It is critical that the definition for any programming
language be unambiguous, otherwise two different compilers can
"correctly" compile and execute a program, but give two different
results.
This is very bad if our program behaves differently just because we
compile it with a different compiler!

Traditionally, grammars have been partly (though not entirely) defined
using a grammar.
Of course, all aspects of the definition must be unambiguous.
Sometimes, two compilers might give different outcomes for a program
for the simple reason that one of them has a bug.
But it sometimes happens that the problem is that the language
defintion has an ambiguity.
We have already seen that one possible source of ambiguity is the
grammar used as part of the definition.


Backus-Naur Form
----------------

Traditionally, compiler writers have used grammars to define as much
of the language as possible.
This is because there are very good tools available that can take a
grammar and automaticall build a parser and part of the code generator
for the language, which saves a lot of programming effort and removes
one source of bugs (human error in the programming).

Backus-Naur form is a popular notation to use for writing context-free
grammars.
It has been around since the late 1950's and early 1960's when it was
first used in the definition of the grammar for the early programming
language ALGOL.

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
language generated by a BNF grammar.
After you finish it, there is one more problem about Extended
Backus-Naur Form, which is described before the problem.

.. avembed:: Exercises/FLA/CharacterizeLang3.html ka
   :long_name: Characterizing Language 3
   :keyword: Compilers; Backus-Naur Form


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
   :keyword: Compilers; Backus-Naur Form


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
