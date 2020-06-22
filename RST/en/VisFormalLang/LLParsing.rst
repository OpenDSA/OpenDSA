.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Parsing Introduction
   :satisfies: LL Parsing
   :topic: Parsing

LL Parsing
==========

LL Parsing
----------

LL(k) Parser
~~~~~~~~~~~~

* Top-down parser: starts with start symbol on stack,
  and repeatedly replace nonterminals until string is generated.

* | Predictive parser: predict next rewrite rule
  | NOTE: use lookahead for this 

* First L of LL means that we read input string left to right

* Second L of LL means that we produce the leftmost derivation 

  .. note::

     ASK TO SEE IF THEY KNOW WHAT THIS IS 

* | :math:`k`: number of lookahead symbols used.
  | Sometimes more than one symbol is needed 


LL parsing process
~~~~~~~~~~~~~~~~~~

* Convert CFG to PDA (different method than before)
* Use the PDA and lookahead symbols
* Lookahead symbol is next symbol in input string

Notes:

* The PDA is nondeterministic, so we will lookahead to the next input
  symbol and use it to determine which rewrite rule to use. 
* Nondeterministic, could use back-tracking, but this could take
  forever.
* Remember: cannot necessarily construct a deterministic PDA from a
  NPDA.

Convert CFG to NPDA
~~~~~~~~~~~~~~~~~~~

NOTE: This is not the same construction method we used before. 
This method will apply to any CFG, even those that are not in GNF. 

Idea: To derive a string with a CFG, start with 
the start symbol and repeatedly apply production 
rules until the string is derived.
In order to *simulate* this process with an NPDA, start by pushing the
start symbol on the stack.
Whenever a production rule :math:`A \rightarrow w` would be applied,
the variable :math:`A` should be on top of the stack.
:math:`A` is popped (or replaced) and the right hand side of the rule,
:math:`w`, is pushed onto the stack.
Whenever a terminal is on top of the stack, if it matches the next
symbol in the input string, then it is popped from the stack.
If it does not match, then this string is not in the language of the
grammar.
If starting with the start symbol :math:`S`, one can apply replacement
rules, match all the terminals in the input string and empty the
stack, then the string is in the language. 

.. note::

   Just mention this stuff and then draw NPDA. 

The constructed NPDA:

* | Three states: :math:`s, q, f`
  | As usual, start in state :math:`s`
  | Push :math:`S` on stack, move into :math:`q`
  | All rewrite rules in state :math:`q`:
    If left-hand-side of rewrite rule on top of stack, replace it
    with right-hand-side of rewrite rule and stay in state :math:`q`
  | Additional rules in :math:`q` to recognize terminals: 
    Read input symbol, pop input symbol, stay in state :math:`q`
  | Pop :math:`z` from stack, move into :math:`f`, accept

.. topic:: Example

   | :math:`L = \{a^nbb^n: n \ge 0 \}`
   |    :math:`S \rightarrow aSb \mid b`

   .. odsafig:: Images/lt10pda1.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt10pda1

   Note that this is nondeterministic.
   You have to use the lookahead to decide which transition to take,
   in a sense adding determinism by using extra information. 

   .. note::

      Trace aabbb. 

   * ``symbol`` is a buffer that holds next input symbol 
     (not processed right away) 
   * We have gotten rid of the nondeterminism by using the lookahead
     symbol.

   **A parsing routine for this grammar:**

   ``symbol`` is the lookahead symbol and $ is the end-of-string marker::

      state = s
      push(S)
      state = q
      read(symbol)                               obtain the lookahead symbol 
      while top-of-stack <> z do                 while stack is not empty 
         case top-of-stack of
         S: if symbol == a then                  cases for variables 
                  { pop(); push(aSb) }           replace S by aSb 
               else if symbol == b then
                  { pop(); push(b) }             replace S by b 
               else error
            a: if symbol <> a, then error        cases for terminals 
               else { pop(); read(symbol) }      pop a, get next lookahead 
            b: if symbol <> b, then error
               else { pop(); read(symbol) }      pop b, get next lookahead 
            end case
      end while
      pop()                                      pop z from the stack 
      if symbol <> $ then error
      state = f


   What are the drawbacks? 

   * For a larger grammar, case statement can get quite long
   * Can put the case statement into a generic routine 


LL Parse Table: 2-dimensional array
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the grammar is large, the parsing routine will have many cases.
Alternatively, store the information for which rule to apply in 
a table. 

* Rows: variables
* Columns: terminals, $ (end of string marker)
* ``LL[i,j]`` contains the right-hand-side of a rule.
  This right-hand-side is pushed onto the stack when the 
  left-hand-side of the rule is the variable representing the
  :math:`i` th row and the lookahead is the symbol representing the
  :math:`j` th column.  
* If we can specify any CFG by this type of parse table, 
  then we can use a generic parser to determine if strings 
  are in this language. 
* Gets rid of use of states 

.. topic:: Example

   Parse table for

   | :math:`L = \{a^nbb^n: n \ge 0 \}`
   |    :math:`S \rightarrow aSb \mid b`

   .. math::
      
      \begin{array}{c||c|c|c} 
      & a & b & \$ \\ \hline \hline 
      S & aSb & b & \mbox{error} \\ 
      \end{array}


A generic parsing routine
~~~~~~~~~~~~~~~~~~~~~~~~~

Idea: To replace a variable on the top of the stack with 
its appropriate right-hand-side, use the lookahead 
and the left-hand-side to look up the right-hand-side in the LL parse
table.
(``LL[,]`` is the parse table.)::

   push(S)
   read(symbol)                                         obtain the lookahead symbol 
   while stack not empty do
      case top-of-stack of
         terminal:
            if top-of-stack == symbol
               then { pop(); read(symbol) }             pop terminal and get next lookahead 
            else
               error
         variable:
            if LL[top-of-stack, symbol] <> error
               then { pop(),                            pop the lhs 
                      push(LL[top-of-stack,symbol]) }   push the rhs 
               else
                  error
         end case
   end while
   if symbol <> $, then error

.. note::
   
   For previous example, try the following traces: 

   Parse the string: aabbb 

   Parse the string: b 

.. topic:: Example

   .. math::
      
      S \rightarrow aSb
      S \rightarrow c

      \begin{array}{l||l|l|l|l}
      &a&b&c&\$ \\ \hline \hline
      S & aSb & \mbox{error} & c & \mbox{error} \\
      \end{array}

   In this example, it is clear that when :math:`S` is on the 
   stack and :math:`a` is the lookahead, replace :math:`S` by
   :math:`aSb`.
   When :math:`S` is on the stack and :math:`b` is the lookahead,
   there is an error, because there must be a :math:`c` between the
   :math:`a` 's and :math:`b` 's. 
   When :math:`S` is on the stack and $ is the lookahead,
   then there is an error, since :math:`S` must be replaced by at
   least one terminal. 
   When :math:`S` is on the stack, and 
   :math:`c` is the lookahead, then :math:`S` should be replaced by
   :math:`c`.
 
.. topic:: Example

   .. math::

      S \rightarrow Ac \mid Bc
      A \rightarrow aAb \mid \lambda
      B \rightarrow b

   When the grammar has a :math:`\lambda`-rule, it 
   can be difficult to compute parse tables.
   In this example,
   :math:`A` can disappear (due to :math:`A \rightarrow \lambda`), 
   so when :math:`S` is on the stack, it can be replaced by :math:`Ac`
   if either "a" or "c" are the lookahead, or it can be replaced
   by :math:`Bc` if "b" is the lookahead. 

We will use the following functions FIRST and FOLLOW to aid in
computing the table.

To construct an LL parse table LL[rows,cols]
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::

   Refresh memory as to what parse table is. 

1. For each rule :math:`A \rightarrow w`

   a. | For each a in FIRST(w)
      | add w to LL[A,a]
   b. | If :math:`\lambda` is in FIRST(w)
      | add :math:`w` to LL[A,b] for each :math:`b` in FOLLOW(A)
      | where :math:`b \in T \cup \{\$\}` 

2. Each undefined entry is an error.

.. topic:: Example

   | :math:`S \rightarrow aSc \mid B`
   | :math:`B \rightarrow b \mid \lambda`

   We have already calculated FIRST and FOLLOW for this Grammar: 

   .. math::

      \begin{array}{c|l|l}
      & FIRST & FOLLOW\\ \hline \hline
      S & a, b, \lambda & \$, c \\
      B & b, \lambda & \$, c \\
      \end{array}

   **To Compute the LL Parse Table for this example:**

   * | For :math:`S \rightarrow aSc`,
     | :math:`\mbox{FIRST}(aSc) = \{a\}`, so add :math:`aSc` to
       ``LL[S,a]`` by step 1a. 

   * | For :math:`S \rightarrow B`,
     | :math:`\mbox{FIRST}(B) = \{b, \lambda \}`
     | :math:`\mbox{FOLLOW}(S) = \{\$, c\}`
     | By step 1a, add :math:`B` to ``LL[S,b]``
     | By step 1b, add :math:`B` to ``LL[S,c]`` and ``LL[S,$]``

   * | For :math:`B \rightarrow b`,
     | :math:`\mbox{FIRST}(b) = \{b\}`, so by step 1a add :math:`b` to ``LL[B,b]``

   * | For :math:`B \rightarrow \lambda`
     | :math:`\mbox{FIRST}(\lambda) = \{ \lambda \}` and
       :math:`\mbox{FOLLOW}(B) = \{\$, c\}`, so by step 1b 
       add :math:`\lambda` to ``LL[B,c]`` and add :math:`\lambda`
       to ``LL[B,$]``. 

   **LL(1) Parse Table**

   .. math::

      \begin{array}{c||c|c|c|c} 
      & a & b & c & \$ \\ \hline \hline
      S & aSc & B & B & B \\ \hline 
      B & \mbox{error} & b & \lambda & \lambda
      \end{array}
   
   Parse string: :math:`aacc`

   .. math::

      \begin{array}{lcccccccc} 
      &&&&a \\ 
      &&a&&S &S &B \\ 
      &&S& S& c& c& c& c \\ 
      \mbox{Stack:} & \underline{S} & \underline{c} & \underline{c} & \underline{c} 
      & \underline{c} & \underline{c} & \underline{c} & \underline{c} \\ 
      \mbox{symbol:} & a & a & a' & a' & c & c& c& c' \\ 
      \end{array}

   where :math:`a'` is the second :math:`a` in the string and ``symbol`` is
   the lookahead symbol.
   This table is an LL(1) table because only 1 symbol of lookahead is needed. 


.. topic:: Example

   Trace :math:`aabcc`

   .. math::
      
      \begin{array}{lccccccccc}
      &&&&a \\
      &&a&&S &S &B & b\\
      &&S& S& c& c& c& c & c \\
      \mbox{Stack:} & \underline{S} & \underline{c} & \underline{c} & \underline{c} 
      & \underline{c} & \underline{c} & \underline{c} & \underline{c} 
      & \underline{c} \\
      \mbox{symbol:} & a & a & a' & a' & b & b& b& c & c' \\
      \end{array}

   where :math:`a'` is the second :math:`a` in the string and ``symbol``
   is the lookahead symbol.
   This table is an LL(1) table because only 1 symbol of lookahead is needed. 


.. topic:: Example

   | Construct Parse Table for:
   | :math:`L = \{a^nb^nca^mcb^m : n \ge 0, m \ge 0\}`

      | :math:`S \rightarrow AcB`
      | :math:`A \rightarrow aAb`
      | :math:`A \rightarrow \lambda`
      | :math:`B \rightarrow aBb`
      | :math:`B \rightarrow c`

   | :math:`\mbox{FIRST}(A) = \{a, \lambda\}` 
   | :math:`\mbox{FIRST}(S) = \{a, c\}` 
   | NOTE: :math:`\lambda` is not in :math:`\mbox{FIRST}(S)`
   | :math:`\mbox{FIRST}(B) = \{a, c\}` 
   | :math:`\mbox{FOLLOW}(A) = \{b, c\}` 
   | :math:`\mbox{FOLLOW}(S) = \{\$\}` 
   | :math:`\mbox{FOLLOW}(B) = \{b, \$\}`

   | To compute the parse table:

      * | For :math:`S \rightarrow AcB`,
        | :math:`\mbox{FIRST}(AcB) = \{a, c\}` so add :math:`AcB` to
          ``LL[S,a]`` and ``LL[S,c]``

      * | For :math:`A \rightarrow aAb`,
        | :math:`\mbox{FIRST}(aAb) = \{a\}` so add :math:`aAb` to ``LL[A,a]``

      * | For :math:`A \rightarrow \lambda`,
        | :math:`\mbox{FIRST}(\lambda) = \{\lambda\}` and
          :math:`\mbox{FOLLOW}(A) = \{b, c\}` so add :math:`\lambda`
          to ``LL[A,b]`` and ``LL[A,c]``

      * | For :math:`B \rightarrow aBb`,
        | :math:`\mbox{FIRST}(aBb) = \{a\}` so add :math:`aBb` to ``LL[B,a]``

      * | For :math:`B \rightarrow  c`,
        | :math:`\mbox{FIRST}(c) = \{c\}` so add :math:`c` to ``LL[B,c]``

      * | All other entries are errors. 

   | LL(1) Parse Table:

   .. math::

      \begin{array}{c||c|c|c|c}
      &a &b &c & \$ \\ \hline \hline
      S &AcB &\mbox{error} &AcB &\mbox{error} \\ \hline 
      A &aAb &\lambda &\lambda &\mbox{error} \\ \hline 
      B &aBb &\mbox{error} &c &\mbox{error} \\ 
      \end{array}
      
   parse string: :math:`abcacb`

   parse string: :math:`cc`

   parse string: :math:`abcab` (not in language) 


.. topic:: Example

   | :math:`L = \{a^nb^nca^mcb^m: n \ge 1, m \ge 1 \}`
   |
   |   :math:`S \rightarrow AcB`
   |   :math:`A \rightarrow aAb`
   |   :math:`A \rightarrow ab`
   |   :math:`B \rightarrow aBb`
   |   :math:`B \rightarrow acb`

   .. math::
      
      \begin{array}{c|l|l}
      & \mbox{FIRST} & \mbox{FOLLOW} \\ \hline \hline
      S & a & \$ \\ \hline 
      A & a & c,b \\ \hline 
      B & a & b,\$ \\
      \end{array}

   Note that FIRST and FOLLOW are quite easy to calculate since 
   there are no :math:`\lambda` rules!
   In this case, you don't need FOLLOW to construct the parse table. 


   **Try to construct LL(1) Parse table**

   .. math::
      
      \begin{array}{c||c|c|c|c}
      &a &b &c & \$ \\ \hline \hline
      S &AcB &\mbox{error} &\mbox{error} &\mbox{error} \\ \hline 
      A &aAb &\mbox{error} &\mbox{error} &\mbox{error} \\ 
      &ab & & & \\ \hline 
      B &aBb &\mbox{error} &\mbox{error} &\mbox{error} \\ 
      & acb & & & \\ 
      \end{array}

   Note that you don`t know which rewrite rule to apply to replace 
   :math:`A` and :math:`B` with just one lookahead symbol. 
   :math:`A` has two choices and both use a lookahead of 'a'.
   There are two entries in the LL(1) parse table for ``T[A,a]``.
   Thus, there is no LL(1) parse table.
   This means the grammar is not LL(1)!.
   We will try to use 2 symbols of lookahead. 

   For example, the string :math:`aabbcaacbb` cannot be parsed with
   just one lookahead.

   **LL(2) Parse Table:**

   .. math::
      
      \begin{array}{c||c|c|c|c|c|c|c}
      &aa &ab &ac & a\$ & b & c & \$ \\ \hline \hline
      S &AcB &AcB & error & error &error &error &error \\ \hline
      A &aAb &ab & error & error &error &error &error \\ \hline
      B &aBb &error & acb & error &error &error &error \\ 
      \end{array}

   There are no conflicts (only one rule in each entry of the table). 
   This is an LL(2) parser - need two lookahead symbols. 

   parse string: :math:`aabbcacb`

   .. math::
      
      \begin{array}{lcccccccccccc}
      &&&a&&a \\
      &&&A&A&b&b\\
      &&A & b& b& b& b& b&&&a\\
      &&c&c&c&c&c&c&c&&c&c\\
      \mbox{Stack:} & \underline{S} & \underline{B}& \underline{B}& \underline{B}
      & \underline{B}& \underline{B}& \underline{B}& \underline{B}& \underline{B}
      & \underline{b} & \underline{b}  & \underline{b} \\
      \mbox{symbol:} & aa & aa &aa & ab & ab & bb & bc& ca& ac &ac & cb & b\$ \\
      \end{array}

   Note the leftmost derivation!
   Also note that the two lookahead symbols are used whenever there is
   a variable on top of the stack.

   An LL(k) parser needs :math:`k` lookahead symbols.

   .. note::

      Mention that LL parser doesn't work if the grammar is left recursive. 


.. topic:: Example

   :math:`L = \{a^n: n \ge 0 \} \cup \{a^nb^n: n \ge 0 \}`

      | :math:`S \rightarrow A`
      | :math:`S \rightarrow B`
      | :math:`A \rightarrow aA`
      | :math:`A \rightarrow \lambda`
      | :math:`B \rightarrow aBb`
      | :math:`B \rightarrow \lambda`

   This grammar cannot be recognized by an LL(k) parser for any
   :math:`k`!
   Consider the string :math:`aabb`.
   You would need 3 lookahead to realize that you want to use
   :math:`S \rightarrow B`.
   Consider the string :math:`aaabbb`, you would need 4 lookahead.
   Consider string :math:`a^nb^n`, you would need :math:`n` lookahead.
   There is no (constant) :math:`k` such that :math:`k` lookahead
   works for every string in the language.

.. topic:: Example

   .. math::`L = \{a^n: 0 \le n \le 10 \} \cup \{a^nb^n: 0 \le  n \le 10 \}`

   An LL(11) parser will work since all strings have 10 or fewer
   :math:`a` 's. 
    
.. topic:: Example

   | :math:`S \rightarrow bbCd \mid Bcc`
   | :math:`B \rightarrow bB \mid b`
   | :math:`C \rightarrow cC \mid c`

   This grammar is LL(5).
   We don't know which S rule to apply with the string :math:`bbccd`
   or :math:`bbcc\$` until you have seen the fifth symbol.

   This grammar cannot be recognized by an LL(k) parser. 

   When the lookahead is :math:`b`, don't know which rule to 
   apply, either the second or third. 

**Comments:**

There are some CFL's that have no LL(k) Parser 

There are some languages for which some grammars have 
LL(k) parsers and some don't. 
