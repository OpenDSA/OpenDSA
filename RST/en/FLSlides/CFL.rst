.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Deterministic Finite Automata
   :satisfies: Context-Free Languages
   :topic: Finite Automata

.. slideconf::
   :autoslides: False

Context-Free Languages
======================

.. slide:: Programming Languages

   | Regular Languages
   |   Keywords in a programming language
   |   Names of identifiers
   |   Integers
   |   A finite list of miscillaneous symbols: ``= \ ;``

   | Non-regular Languages
   |   :math:`\{a^ncb^n | n > 0\}`
   |   Expressions: :math:`((a + b) - c)`
   |   Block structures (:math:`\{\}` in Java/C++ and ``begin`` ... ``end`` in Pascal)


.. slide:: Context Free Languages

   | **Definition:** A grammar :math:`G = (V, T, S, P)` is 
     context-free if all productions are of the form
   |    :math:`A \rightarrow x`
   | where :math:`A \in V` and :math:`x \in (V \cup T)^*`.

   **Definition:** :math:`L` is a context-free language (CFL) iff
   there exists a context-free grammar (CFG) :math:`G` such that
   :math:`L = L(G)`.


.. slide:: Example

   | :math:`G =(\{S\}, \{a, b\}, S, P)`
   |   :math:`S \rightarrow aSb\ |\ ab`
   | Derivation of :math:`aaabbb`:
   |   :math:`S \Rightarrow aSb \Rightarrow aaSbb \Rightarrow aaabbb`
   | :math:`L(G) = \{a^nb^n | n > 0\}`


.. slide:: Linear Grammars

   **Definition:** A linear grammar has at most one variable on the
   right hand side of any production.
   Thus, right linear and left linear grammars are also linear grammars. 

   | :math:`G = (\{S\}, \{a, b\}, S, P)`
   |   :math:`S \rightarrow aSa\ |\ bSb\ |\ a\ |\ b\ |\ \lambda`

   | Derivation of :math:`ababa`:
   |   :math:`S \Rightarrow aSa \Rightarrow abSba \Rightarrow ababa`

   | :math:`\Sigma = \{a, b\}, L(G) = \{w \in {\Sigma}^{*} | w=w^R\}`,


.. slide:: Example

   | :math:`G = (\{S, A, B\}, \{a, b, c\}, S, P)`
   |   :math:`S \rightarrow AcB`
   |   :math:`A \rightarrow aAa\ |\ \lambda`
   |   :math:`B \rightarrow Bbb\ |\ \lambda`
   | :math:`L(G) = \{a^{2n}cb^{2m} | n, m \ge 0\}`

   | Note this is a context-free language and also a regular language. 


.. slide:: Example (cont)

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


.. slide:: Derivations

   **Definition:** Leftmost derivation: in each step of a derivation,
   replace the leftmost variable. (See derivation 1 above.)

   **Definition:** Rightmost derivation: in each step of a derivation,
   replace the rightmost variable. (See derivation 2 above.)

   **Derivation Trees** (also known as "parse trees"): A derivation tree
   represents a derivation, but does not show the order in which
   productions were applied.


.. slide:: Example
           
   | A derivation tree for :math:`G = (V, T, S, P)`:
   |   Root is labeled :math:`S`
   |   Leaves are labeled :math:`x`, where :math:`x \in T \cup \{\lambda\}`
   |   Non-leaf vertices labeled :math:`A, A \in V`
   |   For rule :math:`A \rightarrow a_1a_2a_3\ldots a_n`, where
      :math:`A \in V, a_i \in (T \cup V \cup \{\lambda\})`,

   .. odsafig:: Images/lt3ptree1.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree1


.. slide:: Example

   | :math:`G = (\{S, A, B\}, \{a, b, c\}, S, P)`
   |    :math:`S \rightarrow AcB`
   |    :math:`A \rightarrow aAa\ |\ \lambda`
   |    :math:`B \rightarrow Bbb\ |\ \lambda`
   | Derivation trees do not denote the order variables are 
     replaced!
   | But we can get a leftmost or rightmost derivation from looking at
     tree.

   .. odsafig:: Images/lt3ptree2.png
      :width: 220
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree2


.. slide:: More on derivations

   **Definitions:** Partial derivation tree - subtree of derivation tree.

   If partial derivation tree has root :math:`S` then it represents a
   sentential form.

   Leaves from left to right in a derivation tree form the *yield* of
   the tree.

   If :math:`w` is the yield of a derivation tree, then it must be that
   :math:`w \in L(G)`.

   The yield for the example above is :math:`aacbb`.


.. slide:: Examples
   
   A partial derivation tree that has root S:

   .. odsafig:: Images/lt3ptree3.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree3

   | The yield of this example is :math:`aAacB` (which is a sentential form).
   | A partial derivation tree that does not have root S:

   .. odsafig:: Images/lt3ptree4.png
      :width: 130
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt3ptree4


.. slide:: Membership problem (1)

   **Membership:** Given CFG :math:`G` and string :math:`w \in \Sigma^*`, 
   is :math:`w \in L(G)`?

   If we can find a derivation of :math:`w`, then we would know that
   :math:`w` is in :math:`L(G)`.

   | **Motivation:**
   |    :math:`G` is the grammar for Java.
   |    :math:`w` is your Java program.
   |    Is :math:`w` syntactically correct?


.. slide:: Membership problem (2)

   | Why would anybody want to do this?
   | :math:`G =` Java, :math:`w =` Java program.
   | Is :math:`w` a syntactically correct program?

   This is (part of) what a compiler does.
   You write a program, you compile it, and the compiler finds all your 
   syntax mistakes.

   (It also "translates" the program into "bytecode" to be
   executed.
   We won't talk much about that aspect of compilers in this class.)


.. slide:: Example

   | :math:`G = (\{S\}, \{a, b\}, S, P), P =`
   |    :math:`S \rightarrow SS\ |\ aSa\ |\ b\ |\ \lambda`

   | :math:`L_1 = L(G) = \{w \in \Sigma^* |\ \mbox{strings with an even number of a's}\}`

   | Is :math:`abbab \in L(G)`?


   | **Exhaustive Search Algorithm**
   |    For all :math:`i = 1, 2, 3, \ldots`
   |       Examine all sentential forms yielded by :math:`i` substitutions


.. slide:: Example of Derivation (1)

   Is :math:`abbab \in L(G)`?

   | :math:`i = 1`
   |   1. :math:`S \Rightarrow SS`
   |   2. :math:`S \Rightarrow aSa`
   |   3. :math:`S \Rightarrow b`
   |   4. :math:`S \Rightarrow \lambda`


.. slide:: Example of Derivation (2)

   | :math:`i=2`
   |   1. :math:`S \Rightarrow SS \Rightarrow SSS`
   |   2. :math:`S \Rightarrow SS \Rightarrow aSaS`
   |   3. :math:`S \Rightarrow SS \Rightarrow bS`
   |   4. :math:`S \Rightarrow SS \Rightarrow S`
   |   5. :math:`S \Rightarrow aSa \Rightarrow aSSa`
   |   ...

   | Note: Will we find :math:`w`? How long will it take? If we just do leftmost 
     derivations, then for :math:`i = 2`, 8 of length 2. 
   | When :math:`i = 6` we will find the derivation of :math:`w`.
   | :math:`S \Rightarrow SS \Rightarrow aSaS \Rightarrow aSSaS \Rightarrow abSaS \Rightarrow abba \Rightarrow abbab`


.. slide:: Derivation: Strings Not in Language

   | Question: What happens if :math:`w` is not in :math:`L(G)`?
   | When do we stop the loop in the algorithm and know for sure that
     :math:`w` is not going to be derived?
     :math:`S \Rightarrow SS ... \Rightarrow SSSSSSSSSS ... \Rightarrow S` 

   | Hard to determine that :math:`baaba` is not in :math:`L(G)`. 

   | We want to consider special forms of context free grammars such that 
     we can determine when strings are or are not in the language. 
   | Easy to write a context-free grammar and then convert it into 
     a special form such that it will be easier to test membership. 


.. slide:: CFG Theorem (1)
           
   **Theorem:** If CFG :math:`G` does not contain rules of the form 

      | :math:`A \rightarrow \lambda`
      | :math:`A \rightarrow B`

   where :math:`A, B \in V`, then we can determine if
   :math:`w \in L(G)` or if :math:`w \not\in L(G)`.


.. slide:: CFG Theorem (2)

   **Proof:** Consider

      | 1. Length of sentential forms
      | 2. Number of terminal symbols in a sentential form

   Either 1 or 2 increases with each derivation. 

   Derivation of string :math:`w` in :math:`L(G)` takes
   :math:`\le 2|w|` times through loop in the exhaustive algorithm.

   Thus, if there are :math:`> 2|w|` times through loop, then
   :math:`w \not\in L(G)`.


.. slide:: Example (1)

   Let :math:`L_2 = L_1 - \{\lambda\}`. :math:`L_2 = L(G)` where :math:`G` is:

      :math:`S \rightarrow SS\ |\ aa\ |\ aSa\ |\ b`

   NOTE that this grammar is in the correct form for the theorem. 

   Show :math:`baaba \not\in  L(G)`.


.. slide:: Example (2)

   | :math:`i = 1`
   |   1. :math:`S \Rightarrow SS`
   |   2. :math:`S \Rightarrow aSa`
   |   3. :math:`S \Rightarrow aa`
   |   4. :math:`S \Rightarrow b`


.. slide:: Example (3)

   | :math:`i = 2`
   |   1. :math:`S \Rightarrow SS \Rightarrow SSS`
   |   2. :math:`S \Rightarrow SS \Rightarrow aSaS`
   |   3. :math:`S \Rightarrow SS \Rightarrow aaS`
   |   4. :math:`S \Rightarrow SS \Rightarrow bS`
   |   5. :math:`S \Rightarrow aSa \Rightarrow aSSa`
   |   6. :math:`S \Rightarrow aSa \Rightarrow aaSaa`
   |   7. :math:`S \Rightarrow aSa \Rightarrow aaaa`
   |   8. :math:`S \Rightarrow aSa \Rightarrow aba`


.. slide:: Example (4)

   With each substitution, either there is at least one more 
   terminal or the length of the sentential form has increased. 

   So after we process the loop for :math:`i = 10`, we can conclude
   that :math:`baaba` is not in :math:`L(G)`.


.. slide:: Not all grammars considered equal

   Next chapter, we will learn methods for taking a grammar and
   transforming it into an equivalent (or almost) equivalent grammar. 

   For now, here is another form that will make membership testing easier. 

   | **Definition:** Simple grammar (or s-grammar) has all productions
     of the form:
   |    :math:`A \rightarrow ax`
   | where :math:`A \in V`, :math:`a \in T`, and :math:`x \in V^*` AND any
     pair :math:`(A, a)` can occur in at most one rule.

   If you use the exhaustive search method to ask if :math:`w \in L(G)`,
   where :math:`G` is an s-grammar, the number of terminals increases with
   each step.


.. slide:: Ambiguity

   **Definition:** A CFG :math:`G` is ambiguous if there exists some
   :math:`w \in L(G)` which has two distinct derivation trees.


.. slide:: Ambiguity Example (1)

   Expression grammar

   :math:`G = (\{E, I\}, \{a, b, +, *, (, )\}, E, P), P =`

      | :math:`E \rightarrow E+E\ |\ E*E\ |\ (E)\ |\ I`
      | :math:`I \rightarrow a\ |\ b`

   Derivation of :math:`a+b*a` is:

      | :math:`E \Rightarrow \underline{E}+E \Rightarrow \underline{I}+E 
               \Rightarrow a+\underline{E} \Rightarrow a+\underline{E}*E
               \Rightarrow a+\underline{I}*E \Rightarrow a+b*\underline{E}
               \Rightarrow a+b*\underline{I} \Rightarrow a+b*a`


.. slide:: Ambiguity Example (2)

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


.. slide:: Ambiguity Example (3)

   | Another derivation of :math:`a+b*a` is:
   |    :math:`E \Rightarrow \underline{E}*E \Rightarrow \underline{E}+E*E
                 \Rightarrow \underline{I}+E*E \Rightarrow a+\underline{E}*E
                 \Rightarrow a+\underline{I}*E \Rightarrow a+b*\underline{E}
                 \Rightarrow a+b*\underline{I} \Rightarrow a+b*a`
   | Corresponding derivation tree is:

   .. odsafig:: Images/lt4ptree2.png
      :width: 180
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt4ptree2

   If :math:`a = 2` and :math:`b = 4`, then the "result" of this
   expression is :math:`(2+4)*2 = 12`. 

.. slide:: Ambiguity Example (3)

   There are two distinct derivation trees for the same string. Thus the 
   grammar is ambiguous. The string can have different meanings depending 
   on which way it is interpreted. 

   If :math:`G` is a grammar for Java programs and :math:`w` is Bob's
   Java program, he doesn't want one compiler to give one meaning to
   his program and another compiler to interpret his program
   differently. Disaster!


.. slide:: Rewriting the Grammar (1)

   Rewrite the grammar as an unambiguous grammar. (Specifically, with the
   meaning that multiplication has higher precedence than addition.)

      | :math:`E \rightarrow E+T\ |\ T`
      | :math:`T \rightarrow T*F\ |\ F`
      | :math:`F \rightarrow I\ |\ (E)`
      | :math:`I \rightarrow a\ |\ b`


.. slide:: Rewriting the Grammar (2)

   There is only one derivation tree for :math:`a+b*a`:

   .. odsafig:: Images/lt4ptree3.png
      :width: 200
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt4ptree3


.. slide:: Rewriting the Grammar (3)

   Try to get a derivation tree with the other meaning of :math:`a+b*c`, when 
   :math:`*` is closer to the root of the tree. 

   :math:`E \Rightarrow T \Rightarrow T*F ...`
   Then the only way to include a ":math:`+`"
   before the multiplication is if the addition is enclosed in 
   parenthesis. Thus, there is only one meaning that is accepted. 


.. slide:: Unambiguous Grammars

   **Definition:** If :math:`L` is CFL and :math:`G` is an unambiguous
   CFG such that :math:`L = L(G)`, then :math:`L` is unambiguous.

   <<Why are we studying CFL? Because we want to be able to represent
   syntactically correct programs.>>

.. slide:: **Backus-Naur Form** of a grammar:

   | Nonterminals are enclosed in brackets :math:`<>`
   | For ":math:`\rightarrow`" use instead ":math:`::=`"

   **Sample C++ Program:**::

      main () {
        int a;     int b;   int sum;
        a = 40;    b = 6;   sum = a + b;
        cout << "sum is "<< sum << endl; 
      }


.. slide:: Programming Language (1)

   **"Attempt" to write a CFG for C++ in BNF**
   (Note: :math:`<\mbox{program}>` is start symbol of grammar::

     <program>   ::= main () <block>
       <block>   ::= { <stmt-list> }
     <stmt-list> ::= <stmt> | <stmt> stmt-list> | <decl> | <decl> <stmt-list>
       <decl>    ::= int <id> ; | double <id> ;
       <stmt>    ::= <asgn-stmt> | <assgn-stmt> | <cout-stmt>
     <asgn-stmt> ::= <id> = <expr> ;
       <expr>    ::= <expr> + <expr> | <expr> * <expr> | ( <expr> ) | <id>
     <cout-stmt> ::= cout <out-list>

  etc., Must expand all nonterminals!


.. slide:: Programming Language (2)

   So a derivation of the program test would look like::

      <program> ==> main() <block>
                ==> main() { <stmt-list> }
                ==> main() { <decl> <stmt-list> }
                ==> main() { int <id> <stmt-list> }
                ==> main() { int a <stmt-list> }
                ...
                ==> complete C++ program


.. slide:: Limits to CFG

   | Can write a CFG that recognizes all syntactically correct programs.
   | Problem: The CFG also accepts incorrect programs.
   | Can't recognize errors like:
   |    Declare the same variable twice, once as an integer and once as a char.
   |    Assign a real value to a character.
   | We can write a CFG :math:`G` such that
     :math:`L(G) = \{ \mbox{syntactically correct C++ programs} \}`.
   | But :math:`\{ \mbox{semantically correct C++ programs} \} \subset L(G)`.

   Example: Formal parameters should match actual parameters (# and type)::

      declare: int Sum(int a, int b, int c) ...
      call: newsum = Sum(x,y);
