.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Regular Grammar
   :satisfies: Parsing Introduction
   :topic: Parsing

.. slideconf::
   :autoslides: False

Parsing
=======

.. slide:: Parsing Introduction

   **Parsing:** Deciding if :math:`x \in \Sigma^*` is in :math:`L(G)` for
   some CFG :math:`G`.

   | Consider the CFG :math:`G`:
   |   :math:`S \rightarrow Aa`
   |   :math:`A \rightarrow AA \mid ABa \mid \lambda`
   |   :math:`B \rightarrow BBa \mid  b \mid \lambda`
   | Is :math:`ba` in :math:`L(G)`? Running time?
   | How do you determine whether a string is in :math:`L(G)`? 
   | Note: :math:`ba` is not in :math:`L(G)` for this :math:`G`!
   | Try all possible derivations, but don't know when to stop.
     This runs forever! 


.. slide:: Introduction Example (2)

   | Same grammar without lambda-rules: 
   |    Remove :math:`\lambda`-rules, then unit productions, and 
        then useless productions from the grammar :math:`G` above. 
        New grammar :math:`G'` is:
   |    :math:`S \rightarrow Aa \mid a`
   |    :math:`A \rightarrow AA \mid ABa \mid Aa \mid Ba \mid a`
   |    :math:`B \rightarrow BBa \mid  Ba \mid a \mid b`

   | Is :math:`ba` in :math:`L(G)`? Running time?
   | Try all possible derivations, there will be at most :math:`|w|` rounds. 
     NOTE THIS IS NOT LINEAR TIME, IT TAKES A LONG TIME.
     Actual time is :math:`|w|*p` where :math:`p` is the maximum number of
     rules for any variable.


.. slide:: Introduction Example (3)

   | Grammar:
   |    :math:`S \rightarrow Aa \mid a`
   |    :math:`A \rightarrow AA \mid ABa \mid Aa \mid Ba \mid a`
   |    :math:`B \rightarrow BBa \mid  Ba \mid a \mid b`

   | Consider string :math:`baa`.
   | **Goal**: We would like to only try the rules that give us the
     derivation and  ignore false paths. This would be fast!  
   |    :math:`S \Rightarrow Aa \Rightarrow Baa \Rightarrow baa`


.. slide:: Top-down Parser

   * Start with :math:`S` and try to derive the string.

      |   :math:`S \rightarrow aS \mid b`

      .. odsafig:: Images/lt10ptree1.png
         :width: 100
         :align: center
         :capalign: justify
         :figwidth: 90%
         :alt: lt10ptree1

   * Examples: LL Parser, Recursive Descent


.. slide:: Bottom-up Parser

   * Start with string, work backwards, and try to derive :math:`S`.

      .. odsafig:: Images/lt10ptree2.png
         :width: 125
         :align: center
         :capalign: justify
         :figwidth: 90%
         :alt: lt10ptree2

   * Examples: Shift-reduce, Operator-Precedence, LR Parser


.. slide:: Making Parse Tables

   | We want to construct simple tables that tell us:
   |   When you are working on this rule, and see this input, do something
   | We will use the functions FIRST and FOLLOW to aid in
     computing parse tables.
   | Notation that we will use in defining FIRST and FOLLOW. 
   |    :math:`G=(V, T, S, P)`
   |    :math:`w, v \in (V \cup T)^*`
   |    :math:`a \in T`
   |    :math:`X, A, B \in V`
   |    :math:`X_I \in (V \cup T)^+`


.. slide:: The function FIRST

   | **Definition:** :math:`\mbox{FIRST}(w) =` the set of terminals that 
     begin strings derived from :math:`w`.
   |    If :math:`w \buildrel * \over \Rightarrow av` then
   |       :math:`a` is in :math:`\mbox{FIRST}(w)`
   |    If :math:`w \buildrel * \over \Rightarrow \lambda` then
   |       :math:`\lambda` is in :math:`\mbox{FIRST}(w)`


.. slide:: To compute FIRST (1)

   | 1. :math:`\mbox{FIRST}(a) = \{a\}`
        where a is a terminal. 
   | 2. :math:`\mbox{FIRST}(X)` where :math:`X` is a variable.
   |    (a) If :math:`X \rightarrow aw` then
   |        :math:`a` is in :math:`\mbox{FIRST}(X)`
   |    (b) If :math:`X \rightarrow \lambda` then
   |       :math:`\lambda` is in :math:`\mbox{FIRST}(X)`
   |    (c) If :math:`X \rightarrow Aw`
        and :math:`\lambda \in \mbox{FIRST}(A)` then
   |       Everything in :math:`\mbox{FIRST}(w)` is in :math:`\mbox{FIRST}(X)`


.. slide:: To compute FIRST (2)

   | 3. In general, :math:`\mbox{FIRST}(X_1X_2X_3...X_K) =`
   |    * :math:`\mbox{FIRST}(X_1)`
   |    * :math:`\cup\ \mbox{FIRST}(X_2)` if :math:`\lambda` is in
        :math:`\mbox{FIRST}(X_1)`
   |    * :math:`\cup\ \mbox{FIRST}(X_3)` if :math:`\lambda` is in
        :math:`\mbox{FIRST}(X_1)`
   |       and :math:`\lambda` is in :math:`\mbox{FIRST}(X_2)`
   |       ...
   |    * :math:`\cup\ \mbox{FIRST}(X_K)` if :math:`\lambda` is in
        :math:`\mbox{FIRST}(X_1)`
   |        and :math:`\lambda` is in :math:`\mbox{FIRST}(X_2)`
   |        ... and :math:`\lambda` is in :math:`\mbox{FIRST}(X_{K-1})`
   |    * :math:`-\ \{\lambda\}` if :math:`\lambda \notin \mbox{FIRST}(X_J)`
        for all :math:`J`
   |       (where :math:`X_I` represents a terminal or a variable) 


.. slide:: To compute FIRST (3)

   | We will be computing :math:`\mbox{FIRST}(w)` where :math:`w` is the
     right hand side of a rule.
   | Thus, we will need to compute :math:`\mbox{FIRST}(X)` for each 
     symbol :math:`X` (either terminal or variable) that appears in the
     right hand side of a rule. 


.. slide:: Example (1)

   | :math:`L = \{a^nb^mc^n : n \ge 0, 0 \le m \le 1\}`
   |    :math:`S \rightarrow aSc \mid B`
   |    :math:`B \rightarrow b \mid \lambda`
   | :math:`\mbox{FIRST}(B) = \{b, \lambda \}` 
   |    Using :math:`B \rightarrow b` gives that :math:`b` is in
        :math:`\mbox{FIRST}(B)`.
   |    Using :math:`B \rightarrow \lambda` gives that :math:`\lambda` is
        in :math:`\mbox{FIRST}(B)`.  
   | :math:`\mbox{FIRST}(S) = \{a, b, \lambda\}`
   |    Using :math:`S \rightarrow aSc` gives that :math:`a` is in
       :math:`\mbox{FIRST}(S)`.
   |   Using :math:`S \rightarrow B` and :math:`\lambda` is in
       :math:`\mbox{FIRST}(B)` gives that everything in
       :math:`\mbox{FIRST}(B)` is in :math:`\mbox{FIRST}(S)`, so :math:`b`
       and :math:`\lambda` are in :math:`\mbox{FIRST}(S)`. 
   | :math:`\mbox{FIRST}(Sc) = \{a, b, c\}` 


.. slide:: Example (2a)

   | :math:`S \rightarrow BCD \mid aD`
   | :math:`A \rightarrow CEB \mid aA`
   | :math:`B \rightarrow b \mid \lambda`
   | :math:`C \rightarrow dB \mid \lambda`
   | :math:`D \rightarrow cA \mid \lambda`
   | :math:`E \rightarrow e \mid fE`


.. slide:: Example (2b)

   :math:`\mbox{FIRST}(B) =`

   .. :math:`\{b, \lambda\}` 

   :math:`\mbox{FIRST}(C) =`

   .. :math:`\{d, \lambda\}`

   :math:`\mbox{FIRST}(D) =`

   .. :math:`\{c, \lambda\}`

   :math:`\mbox{FIRST}(E) =`

   .. :math:`\{e, f\}`

   :math:`\mbox{FIRST}(A) =`

   .. :math:`\{d, e, f, a\}`

   :math:`\mbox{FIRST}(S) =`

   .. :math:`\{b, d, c, \lambda, a\}`


.. slide:: The function FOLLOW

   | **Definition:** :math:`\mbox{FOLLOW}(X) =` set of terminals that can
     appear to the right of :math:`X` in some derivation. 
   |    (We only compute FOLLOW for variables.)

   |    If :math:`S \buildrel * \over \Rightarrow wAav` then
   |          :math:`a` is in :math:`\mbox{FOLLOW}(A)`
   |    (where :math:`w` and :math:`v` are strings of terminals and
        variables, :math:`a` is a terminal, and :math:`A` is a variable) 


.. slide:: Computing FOLLOW

   1. :math:`\$` is in :math:`\mbox{FOLLOW}(S)`

   2. If :math:`A \rightarrow wBv` and :math:`v \ne \lambda` then

      :math:`\mbox{FIRST}(v) - \{ \lambda \}` is in :math:`\mbox{FOLLOW}(B)`

   3. If :math:`A \rightarrow wB` or
      :math:`A \rightarrow wBv` and :math:`\lambda` is in
      :math:`\mbox{FIRST}(v)` then 

      :math:`\mbox{FOLLOW}(A)` is in :math:`\mbox{FOLLOW}(B)`

   4. :math:`\lambda` is never in FOLLOW


.. slide:: Example (1)

   | :math:`S \rightarrow aSc \mid B`
   | :math:`B \rightarrow b \mid \lambda`

   Reminder: :math:`\lambda` is never in a FOLLOW set.

   :math:`\mbox{FOLLOW}(S) = \{ \$, c \}` 

   :math:`\$` goes into :math:`\mbox{FOLLOW}(S)` by rule 1.
   Then :math:`c` goes into :math:`\mbox{FOLLOW}(S)` by rule 2 since
   :math:`S \rightarrow aSc` and :math:`\mbox{FIRST}(c) = \{c\}`.  

   :math:`\mbox{FOLLOW}(B) = \{ \$, c \}` 

   By rule 3 and :math:`S \rightarrow B`, :math:`\mbox{FOLLOW}(S)` is 
   added to :math:`\mbox{FOLLOW}(B)`. 


.. slide:: Example (2a)

   | :math:`S \rightarrow BCD \mid aD`
   | :math:`A \rightarrow CEB \mid aA`
   | :math:`B \rightarrow b \mid \lambda`
   | :math:`C \rightarrow dB \mid \lambda`
   | :math:`D \rightarrow cA \mid \lambda`
   | :math:`E \rightarrow e \mid fE`


.. slide:: Example (2b)

   :math:`\mbox{FOLLOW}(S) =`

   .. :math:`\{\$\}`

   :math:`\mbox{FOLLOW}(A) =`

   .. :math:`\{\$\}`

   :math:`\mbox{FOLLOW}(B) =`

   .. :math:`\{d, c, e, f, \$\}`

   :math:`\mbox{FOLLOW}(C) =`

   .. :math:`\{c, e, f, \$\}`

   :math:`\mbox{FOLLOW}(D) =`

   .. :math:`\{\$\}`

   :math:`\mbox{FOLLOW}(E) =`

   .. :math:`\{b, \$\}`


.. slide:: LL(k) Parsing

   | We discussed this in principle before. Now we want to operationalize it.
   | Note: A language is not LL(k), a grammar is.
   |    :math:`L = \{a^iabc^i \mid i > 0 \}`
   |    :math:`G_1 = S \rightarrow aSc \qquad \{aaa\}`
   |                 :math:`S \rightarrow aabc \qquad \{aab\}`
   |    :math:`G_2 = S \rightarrow aA`
   |                 :math:`A \rightarrow Sc \qquad \{aa\}`
   |                 :math:`A \rightarrow abc \qquad \{ab\}`
   |    :math:`G_3 = S \rightarrow aaAc`
   |                 :math:`A \rightarrow aAc \quad \{a\}`
   |                 :math:`A \rightarrow b \qquad \{b\}`


.. slide:: LL parsing process

   | First, convert CFG to PDA
   | :math:`L = \{a^nbb^n: n \ge 0 \}`
   |    :math:`S \rightarrow aSb \mid b`

   .. odsafig:: Images/lt10pda1.png
      :width: 300
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt10pda1

   | The PDA is nondeterministic.
   |    Use lookahead to make it deterministic: determine which rewrite rule to use.


.. slide:: Parsing routine (for this grammar)

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

.. slide:: LL Parse Table

   | When the grammar is large, the parsing routine will have many cases.
   | Alternatively, store the information for which rule to apply in 
     a table. 
   |    Rows: variables
   |    Columns: terminals, $ (end of string marker)
   |    ``LL[i,j]`` contains the right-hand-side of a rule.
        This right-hand-side is pushed onto the stack when the 
        left-hand-side of the rule is the variable representing the
        :math:`i` th row and the lookahead is the symbol representing the
        :math:`j` th column.  
   |    For any CFG that we can specify by this type of parse table, 
        we can use a generic parser to determine if strings 
        are in this language. 
   |    Gets rid of use of states 


.. slide:: Parse Table Example

   Parse table for

   | :math:`L = \{a^nbb^n: n \ge 0 \}`
   |    :math:`S \rightarrow aSb \mid b`

   .. math::
      
      \begin{array}{c||c|c|c} 
      & a & b & \$ \\ \hline \hline 
      S & aSb & b & \mbox{error} \\ 
      \end{array}

   | Example strings:
   |
   |   aabbb
   |
   |   b


.. slide:: A generic parsing routine

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


.. slide:: Example

   | :math:`S \rightarrow aSb`
   | :math:`S \rightarrow c`

   .. math::
      
      \begin{array}{l||l|l|l|l}
      &a&b&c&\$ \\ \hline \hline
      S & aSb & \mbox{error} & c & \mbox{error} \\
      \end{array}

   | When :math:`S` is on the stack and :math:`a` is the lookahead,
     replace :math:`S` by :math:`aSb`
   | When :math:`S` is on the stack and :math:`b` is the lookahead,
     there is an error (there must be a :math:`c` between the
     :math:`a` 's and :math:`b` 's)
   | When :math:`S` is on the stack and $ is the lookahead,
     then there is an error (:math:`S` must be replaced by at
     least one terminal)
   | When :math:`S` is on the stack, and :math:`c` is the lookahead,
     then :math:`S` should be replaced by :math:`c`.

 
.. slide:: Example

   | :math:`S \rightarrow Ac \mid Bc`
   | :math:`A \rightarrow aAb \mid \lambda`
   | :math:`B \rightarrow b`

   | When the grammar has a :math:`\lambda`-rule, it 
     can be difficult to compute parse tables.
   | In this example,
     :math:`A` can disappear (due to :math:`A \rightarrow \lambda`).
   | So when :math:`S` is on the stack, it can be replaced by :math:`Ac`
     if either "a" or "c" are the lookahead, or it can be replaced
     by :math:`Bc` if "b" is the lookahead. 


.. slide:: Constructing an LL parse table

   | 1. For each rule :math:`A \rightarrow w`
   |    a. For each a in FIRST(w)
   |       add w to LL[A,a]
   |    b. If :math:`\lambda` is in FIRST(w)
   |       add :math:`w` to LL[A,b] for each :math:`b` in FOLLOW(A)
   |      where :math:`b \in T \cup \{\$\}` 
   | 2. Each undefined entry is an error.


.. slide:: Example (1): Need FIRST and FOLLOW

   | :math:`S \rightarrow aSc \mid B`
   | :math:`B \rightarrow b \mid \lambda`

   We have already calculated FIRST and FOLLOW for this Grammar: 

   .. math::

      \begin{array}{c|l|l}
      & FIRST & FOLLOW\\ \hline \hline
      S & a, b, \lambda & \$, c \\
      B & b, \lambda & \$, c \\
      \end{array}


.. slide:: Example (2): Compute Parse Table

   | For :math:`S \rightarrow aSc`,
     :math:`\mbox{FIRST}(aSc) = \{a\}`, so add :math:`aSc` to
     ``LL[S,a]`` by step 1a. 

   | For :math:`S \rightarrow B`,
   | :math:`\mbox{FIRST}(B) = \{b, \lambda \}`
   | :math:`\mbox{FOLLOW}(S) = \{\$, c\}`
   | By step 1a, add :math:`B` to ``LL[S,b]``
   | By step 1b, add :math:`B` to ``LL[S,c]`` and ``LL[S,$]``

   | For :math:`B \rightarrow b`,
     :math:`\mbox{FIRST}(b) = \{b\}`, so by step 1a add :math:`b` to ``LL[B,b]``

   | For :math:`B \rightarrow \lambda`
     :math:`\mbox{FIRST}(\lambda) = \{ \lambda \}` and
     :math:`\mbox{FOLLOW}(B) = \{\$, c\}`,
   | so by step 1b 
     add :math:`\lambda` to ``LL[B,c]`` and add :math:`\lambda`
     to ``LL[B,$]``. 


.. slide:: Example (3): Sample Trace

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


.. slide:: Example (4): Sample Trace

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


.. slide:: LL(k) Can't Parse All CFGs

   | :math:`L = \{a^n: n \ge 0 \} \cup \{a^nb^n: n \ge 0 \}`
   |    :math:`S \rightarrow A`
   |    :math:`S \rightarrow B`
   |    :math:`A \rightarrow aA`
   |    :math:`A \rightarrow \lambda`
   |    :math:`B \rightarrow aBb`
   |    :math:`B \rightarrow \lambda`

   | This grammar cannot be recognized by an LL(k) parser for any
     :math:`k`.
   | Consider the string :math:`aabb`.
     Need 3 lookahead to realize that we want :math:`S \rightarrow B`.
   | For :math:`aaabbb`, we need 4 lookahead.
   | For :math:`a^nb^n`, we need :math:`n` lookahead.


.. slide:: Conclusion

   There are some CFL's that have no LL(k) Parser 

   There are some languages for which some grammars have 
   LL(k) parsers and some don't. 
