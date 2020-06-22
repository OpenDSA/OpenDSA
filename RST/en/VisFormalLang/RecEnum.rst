.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Recursively Enumerable Languages
   :topic:

Recursively Enumerable Languages 
================================

Recursively Enumerable Languages
--------------------------------

What is the set of languages that TM's accept?
We know that they accept RL's and CFL's.
And additional languages. 

Question: Is there any language that a TM cannot accept? 

**Definition:** A language :math:`L` is :term:`recursively enumerable`
if there exists a TM :math:`M` such that :math:`L = L(M)`.

[Hah! All that says is that the languages that a TM can deal with now
have a name!]

.. odsafig:: Images/lt25hier1.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt25hier1

We say that :math:`M` accepts the language. 
For every :math:`w` in :math:`L`, :math:`M` should accept :math:`w`.

Question: What happens if :math:`w` is not in :math:`L`? 
Saying that :math:`M` can properly accepting strings in :math:`L`
doesn't define happens if :math:`w` is not in :math:`L`. 
:math:`M` may not halt in that case.

Note: We do not get a yes or no answer, just a yes if w is in L! 

**Definition:** A language :math:`L` is *recursive* if there exists a
TM :math:`M` such that :math:`L = L(M)` and :math:`M` halts on every
:math:`w \in \Sigma^+`.
Thus, A language :math:`L` is recursive if and only if there exists a
membership algorithm for it.

[Note the difference beteen a recursive **language** (one that is
recognized by a TM) and a recursive **algorithm** (which merely means
that it calls itself).]

NOTE: We will ignore the empty string.
In Chapter 9, the definition of the TM assumes that the input string
is always padded on both sides of the input.
If the input could be a blank, the tape head would not 
know where the input string was.
It would be easy to adjust the definition to include the empty string,
but for now we will just examine languages that do not include
:math:`\lambda`.

.. note::

   Not a problem if we use a one-sided tape as our base definition,
   which is a good argument for doing it that way.

Enumeration procedure for recursive languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To enumerate all :math:`w \in \Sigma^+` in a recursive language :math:`L`:

| * Let :math:`M` be a TM that recognizes :math:`L, L = L(M)`.
| * Construct 2-tape TM :math:`M'`
|   Tape 1 will enumerate the strings in :math:`\Sigma^+`
|   Tape 2 will enumerate the strings in :math:`L`.
|   - On Tape 1 generate the next string :math:`v` in :math:`\Sigma^+`
|   - Simulate :math:`M` on :math:`v`
|     If :math:`M` accepts :math:`v`, then write :math:`v` on Tape 2.

Enumeration procedure for recursively enumerable languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The above procedure does not work, since :math:`M` might not halt
on strings that are not in the language. 

To enumerate all :math:`w \in \Sigma^+` in a recursively enumerable
language :math:`L`: 

| Repeat forever:
| * Generate next string (Suppose k strings have been generated:
    :math:`w_1, w_2, ..., w_k`)
| * Run :math:`M` for one step on :math:`w_k`.
|   Run :math:`M` for two steps on :math:`w_{k-1}`.
|   ...
|   Run :math:`M` for :math:`k` steps on :math:`w_{1}`.
|   If any of the strings are accepted then write them to Tape 2.
|   NOTE: Accepted in the exact number of steps! 

.. math::

   \begin{array}{llll} 
   1\ \mbox{move} \ w_1 \\ 
   1\ \mbox{move} \ w_2 & 2\ \mbox{moves} \ w_1 \\ 
   1\ \mbox{move} \ w_3 & 2\ \mbox{moves} \ w_2 & 3\ \mbox{moves} \ w_1 \\ 
   1\ \mbox{move} \ w_4 & 2\ \mbox{moves} \ w_3 & 3\ \mbox{moves} \ w_2 & 4\ \mbox{moves}\ w_1 \\ 
   ... \\ 
   \end{array}

Questions:

1) Are there languages that are RE but not recursive? yes.
2) Are there languages that are not RE? yes 

We will prove that there is a language that is not recursively
enumerable.

.. note::

   Ask what is a powerset. :math:`2^{\{a,b\}}, 2^{pos. int.}`

.. topic:: Theorem

   **Theorem:** Let :math:`S` be an infinite countable set.
   Its powerset :math:`2^S` is not countable.

   **Proof:** Use diagonalization

   | :math:`S` is countable, so its elements can be enumerated.
   | :math:`S = \{s_1,s_2,s_3,s_4,s_5,s_6 \ldots\}`
   | An element :math:`t \in 2^S` can be represented by a sequence of
     0's and 1's such that the :math:`i` th position in :math:`t` is 1
     if :math:`s_i` is in :math:`t`, 0 if :math:`s_i` is not in :math:`t`. 
   | Example, :math:`\{s_2,s_3,s_5\}` represented by 0110100... 
   | Example, set containing every other element from :math:`S`,
     starting with :math:`s_1` is :math:`\{s_1, s_3, s_5, s_7, \ldots \}`
     represented by 101010101010... 
   | Suppose :math:`2^S` is countable.
     Then we can emunerate all its elements: :math:`t_1, t_2, ...`
   | HEADINGS :math:`S` on columns :math:`2^S` on rows 

     .. math::
        
        \begin{array}{c|cccccccc}
            & s_1 & s_2 & s_3 & s_4 & s_5 & s_6 & s_7 & ... \\ \hline
        t_1 & \underline{0} & 1 & 0 & 1 & 0 & 0 & 1 & ... \\
        t_2 & 1 & \underline{1} & 0 & 0 & 1 & 1 & 0 & ... \\
        t_3 & 0 & 0 & \underline{0} & 0 & 1 & 0 & 0 & ... \\
        t_4 & 1 & 0 & 1 & \underline{0} & 1 & 1 & 0 & ... \\
        t_5 & 1 & 1 & 1 & 1 & \underline{1} & 1 & 1 & ... \\
        t_6 & 1 & 0 & 0 & 1 & 0 & \underline{0} & 1 & ... \\
        t_7 & 0 & 1 & 0 & 1 & 0 & 0 & \underline{0} & ... \\
        ... &  \\
        \\ \hline \hline 
        \hat{t} & 1 & 0 & 1 & 1 & 0 & 1 & 1 & ...\\ 
        \end{array}

   | NOTE: :math:`i` th position in :math:`\hat{t} = 0` if
     :math:`s_i = 1`, 1 if :math:`s_i = 0`.

   | Construct an element :math:`\hat{t}` such that the :math:`i` th
     position in :math:`\hat{t}` equals 0 if the :math:`i` th position
     in :math:`t_i` is 1, and equals 1 if the :math:`i` th position in
     :math:`t_i` is 0.  
   | Notice that :math:`\hat{t} \neq t_i` for any :math:`i`.
     Yet :math:`\hat{t}` represents an element from :math:`2^S`.
     Contradiction! :math:`2^S` is not a countable set. QED. 

.. topic:: Theorem

   **Theorem:** For any nonempty :math:`\Sigma`, there exist languages
   that are not recursively enumerable.

   **Proof:**

   | A language is a subset of :math:`\Sigma^*`.
   | The set of all languages over :math:`\Sigma` is 
     :math:`2^{\Sigma^*}`. 
   | :math:`\Rightarrow` the set of all languages over :math:`\Sigma`
     is not countable.
   | The set of all TM's is countable. 
   | Thus, set of recursively enumerable languages are countable. 
   | :math:`\Rightarrow` there are languages that are not recursively
     enumerable. QED.


.. topic:: Theorem     

   **Theorem:** There exists a recursively enumerable language :math:`L`
   such that :math:`\bar L` is not recursively enumerable.

   **Proof:**

   | Let :math:`\Sigma = \{a\}` 
   | Enumerate all TM's over :math:`\Sigma`: :math:`M_1, M_2, M_3, ...` 
   | For each TM :math:`M_i`, :math:`L(M_i)` is a RE (recursively
     enumerable) language.
   | For each RE language, there is a TM that accepts it. 
   | Construct a new :math:`L = \{ a^i | a^i \in L(M_i) \}`.
   | L is a RE language.
     Can come up with an algorithm to list out all of its elements. 
     Enumerate the TM codes until you generate the code for TM :math:`M_i`. 
     Generate the string :math:`a^i`.
     Using the universal TM, simulate :math:`M_i` on :math:`a^i`.
     If :math:`a^i` is in :math:`L(M_i)` then the simulation will halt. 

   .. math::
      
      \begin{array}{c|cccccc}
      & a & aa & aaa& aaaa& aaaaa& ... \\ \hline
      L(M_1) & 0 & 1 & 1 & 0 & 1 & ... \\
      L(M_2) & 1 & 0 & 1 & 0 & 1 & ... \\
      L(M_3) & 0 & 0 & 1 & 1 & 0 & ... \\
      L(M_4) & 1 & 1 & 0 & 1 & 1 & ... \\
      L(M_5) & 0 & 0 & 0 & 1 & 0 & ... \\
      ... & \\
      \\ \hline \hline 
      L & 0 & 0 & 1 & 1 & 0 & ... \\ 
      \bar{L}& 1 & 1 & 0 & 0 & 1 & ... \\ 
      \end{array}

   | Let :math:`\bar{L} = \{a^i | a^i \not\in L(M_i) \}`
   | Enumerate all the RE languages and identify which strings are in
     each language.
     A '0' entry means no the string is not in the language, 
     and a '1' entry means yes, the string is in the language. 
   | :math:`\bar{L}` is not a RE language!
   | :math:`\bar L` cannot equal any of the RE languages 
     that are enumerated above because it differs in the :math:`i` th
     position. QED 
   | NOTE: You cannot come up with an algorithm to list out its
     elements.
     The above algorithm for listing :math:`L` 's elements does not
     work to list :math:`\bar{L}` 's elements. 

The next two theorems in conjunction with the previous theorem 
will show that there are some languages that are recursively
enumerable, but not recursive. 

.. topic:: Theorem
           
   **Theorem:** If languages :math:`L` and :math:`\bar{L}` are both
   RE, then L is recursive.

   **Proof:**

   | There exists :math:`M_1` such that :math:`M_1` can enumerate all
     elements in :math:`L`.
   | There exists :math:`M_2` such that :math:`M_2` can enumerate all
     elements in :math:`\bar{L}`.
   | To determine if a string :math:`w` is in :math:`L` or not in
     :math:`L`, perform the following algorithm: 
   |
   |    Repeat until :math:`w` matched
   |       Enumerate next element in :math:`M_1`
   |       Enumerate next element in :math:`M_2`
   |
   | If :math:`w` is enumerated from :math:`M_1`, then :math:`w` is in
     :math:`L`.
     If :math:`w` is enumerated from :math:`M_2`, then :math:`w` is not
     in :math:`L`.
   | For each :math:`w \in \Sigma^*` we can determine if :math:`w` is
     in :math:`L` or not in :math:`L`. 
     Thus, :math:`L` is recursive. QED. 

.. topic:: Theorem
           
   **Theorem:** If :math:`L` is recursive, then :math:`\bar{L}` is
   recursive.

   **Proof:**

   | :math:`L` is recursive, so there exists a TM :math:`M` such that
     :math:`M` can determine if :math:`w` is in :math:`L` or :math:`w`
     is not in :math:`L`.
     :math:`M` outputs a 1 if a string :math:`w` is in :math:`L`, 
     and outputs a 0 if a string :math:`w` is not in :math:`L`. 
   | Construct TM :math:`M'` that does the following.
     :math:`M'` first simulates TM :math:`M`. 
     If TM :math:`M` halts with a 1, then :math:`M'` erases the 1 and
     writes a 0.
     If TM :math:`M` halts with a 0, then :math:`M'` erases the 0 and
     writes a 1.

     .. odsafig:: Images/lt25recl.png
        :width: 300
        :align: center
        :capalign: justify
        :figwidth: 90%
        :alt: lt25rec1

   | :math:`M'` can determine if a string :math:`w` is in
     :math:`\bar{L}` or not in :math:`\bar{L}`.  
   | Thus, :math:`\bar{L}` is recursive. QED. 

If :math:`L` is not recursive, then neither :math:`L` nor
:math:`\bar{L}` can be RE. 

The language :math:`L = \{ a^i | a^i \in L(M_i) \}` is RE but not
recursive (since we proved that its complement was not RE). 

Hierarchy of Languages:

.. odsafig:: Images/lt25hier2.png
   :width: 200
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: lt25hier2

Now we will look at the grammar that represents the same language as
the turing machine. 

.. note::

   Also mention DCFL (which is between reg and CFL),
   CS (which is between CFL and REC) 

**Definition:** A grammar :math:`G = (V,T,S,P)` is *unrestricted* if
all productions are of the form 

   :math:`u \rightarrow v`

where :math:`u \in (V \cup T)^+` and :math:`v \in (V \cup T)^*`.

No conditions are imposed on the productions. 
You can have any number of variables and terminals on the left 
hand side. 

.. topic:: Example

   Let :math:`G = (\{S,A,X\}, \{a,b\},S,P), P =`

      | :math:`S \rightarrow bAaaX`
      | :math:`bAa \rightarrow abA`
      | :math:`AX \rightarrow \lambda`

   A derivation of :math:`aab` is:
   (the left hand side that is replaced is underlined) 

      :math:`S \Rightarrow \underline{bAa}aX \Rightarrow a\underline{bAa}X \Rightarrow aab\underline{AX} \Rightarrow aab`

.. topic:: Example

   Find an unrestricted grammar :math:`G` such that
   :math:`L(G) = \{a^nb^nc^n | n> 0\}`

      :math:`G = (V,T,S,P)`

      :math:`V = \{S,A,B,D,E,X\}`

      :math:`T = \{a,b,c\}`

      :math:`P =`

   .. math::
      
      \begin{array}{lll}
      1) S \rightarrow AX & \ \ \ \ \ \  
         & 7) Db \rightarrow bD \\ 
      2) A \rightarrow aAbc & \ \ \ \ \ \  
         & 8) DX \rightarrow EXc \\ 
      3) A \rightarrow aBbc & \ \ \ \ \ \  
         & 9) BX \rightarrow \lambda \\ 
      4) Bb \rightarrow bB & \ \ \ \ \ \ 
         & 10) cE \rightarrow Ec \\ 
      5) Bc \rightarrow D & \ \ \ \ \ \  
         & 11) bE \rightarrow Eb \\ 
      6) Dc \rightarrow cD & \ \ \ \ \ \  
         & 12) aE \rightarrow aB \\ 
      \end{array}

   Change the last rule to :math:`DX \rightarrow c` and you can derive
   the string :math:`aaabbcbcc`, moves a :math:`c` in the wrong place
   to the end of the string...

   To derive string :math:`aaabbbccc`, use productions 1, 2 and 3 to
   generate a string that has the correct number of a's b's and c's.
   The a's will all be together, but the b's and c's will be
   intertwined.

      :math:`S \Rightarrow AX \Rightarrow aAbcX \Rightarrow aaAbcbcX \Rightarrow aaaBbcbcbcX`

   Use a :math:`B` to move right through a group of :math:`B` 's until
   it sees a :math:`c`.
   Replace the :math:`c` by a :math:`D`, and use the :math:`D` to move
   right to the end of the string.
   Then write the :math:`c` at the end of the string. 
   Use an :math:`E` to move back to the left. 

      | :math:`aaaBbcbcbcX \Rightarrow aaabBcbcbcX \Rightarrow aaabDbcbcX`
      | :math:`\Rightarrow aaabbDcbcX \Rightarrow aaabbcDbcX \Rightarrow aaabbcbDcX`
      | :math:`\Rightarrow aaabbcbcDX \Rightarrow aaabbcbcEXc`
      | :math:`\Rightarrow aaabbcbEcXc`
      | :math:`\stackrel{*}{\Rightarrow} aaaEbbcbcXc \Rightarrow aaaBbbcbcXc`

   Repeat this process until all the :math:`c` 's have been moved to
   the end of the string.
   Then remove the :math:`X` from the string. 

      | :math:`aaaBbbcbcXc \stackrel{*}{\Rightarrow} aaaBbbbXccc \stackrel{*}{\Rightarrow} aaabbbBXccc \Rightarrow aaabbbccc`

.. topic:: Theorem
           
   **Theorem:** If :math:`G` is an unrestricted grammar, then
   :math:`L(G)` is recursively enumerable.

   **Proof:**

   * List all strings that can be derived in one step.

        :math:`S \Rightarrow w`

   * List all strings that can be derived in two steps.

        :math:`S \Rightarrow x \Rightarrow w` 

   * List all strings that can be derived in three steps. 
   * Continue in this way for strings deriveable in any finite number
     of steps.
   * Therefore, it is possible to enumerate all strings in the language. 

.. topic:: Theorem
           
   **Theorem:** If :math:`L` is recursively enumerable, then there
   exists an unrestricted grammar :math:`G` such that :math:`L = L(G)`.

   **Proof:** (Sketch!)

      | L is recursively enumerable.
      | :math:`\Rightarrow` there exists a TM :math:`M` such that
        :math:`L(M) = L`.
      | :math:`M = (Q, \Sigma, \Gamma, \delta, q_0, B, F)`
      | Idea :math:`M` starts with :math:`w` and eventually ends up
        with a final state.
      | :math:`q_0w \stackrel{*}{\vdash} x_1q_fx_2` for some
        :math:`q_f \in F, x_1, x_2 \in \Gamma^*`
      | Construct an unrestricted grammar :math:`G` such that
        :math:`L(G) = L(M)`.
      | But in :math:`G`, grammar starts with :math:`S` and eventually
        derives :math:`w`, :math:`S \stackrel{*}{\Rightarrow}w`
      | So the constructed grammar will mimic the Turing machine in
        reverse.
      | Three steps:
      | 1. :math:`S \stackrel{*}{\Rightarrow} B \ldots B\#xq_fyB\ldots B`
      |    with :math:`x, y \in \Gamma^*` for every possible combination 
      | 2. :math:`B \ldots B\#xq_fyB\ldots B \stackrel{*}{\Rightarrow} B\ldots B\#q_0wB\ldots B`
      |    by following rules that mimic transitions in reverse order. 
      | 3. :math:`B\ldots B\#q_0wB\ldots B \stackrel{*}{\Rightarrow} w`
      |    Here just remove the blanks, and :math:`\# q_0`.
      | So here is the constructed grammar. 
      | :math:`G = (V,T,S,P)`
      | :math:`T = \Sigma` 
      | :math:`V = \{\Gamma - \Sigma\} \cup Q \{\#\} \cup \{S,A\}`
      | :math:`P` for each of the three above are: 
      | 1. For :math:`S\stackrel{*}{\Rightarrow}B\ldots B\#xq_fyB\ldots B`
      |    :math:`S \rightarrow BS \mid SB \mid \#A`
      |    Replace :math:`S` with lots of blanks and then finally a #`
      |    :math:`A \rightarrow aA \mid Aa \mid q`
      |    (for every :math:`a \in \Gamma` and :math:`q \in F`) 
      |    then generate the strings of symbols finishing off with a
           final state.
      | 2. For :math:`B\ldots B\# xq_fyB\ldots B \stackrel{*}{\Rightarrow} B\ldots B\# q_0wB\ldots B`
      |    Create the rules that mimic what the TM does in reverse order. 
      |    Mimic left and right moves. 
      |    For each :math:`\delta(q_i,a) = (q_j,b,R)`
      |    Add to :math:`P`, :math:`bq_j \rightarrow q_ia`
      |    For each :math:`\delta(q_i,a)=(q_j,b,L)`
      |    add to :math:`P`, :math:`q_jcb \rightarrow cq_ia` for every
      |    :math:`c \in \Gamma`.
      | 3. For :math:`B\ldots B\# q_0wB\ldots B \stackrel{*}{\Rightarrow} w`
      |    To get rid of :math:`\# q_0` and blanks, 
      |       :math:`\# q_0 \rightarrow \lambda`
      |       :math:`B \rightarrow \lambda`
      | Then show that :math:`S \stackrel{*}{\Rightarrow} w` iff 
        :math:`q_0w \stackrel{*}{\vdash} x_1q_fx_2` for :math:`q_f \in F`

**Definition:** A grammar :math:`G` is
:term:`context-sensitive <context-sensitive grammar>` if
all productions are of the form

   :math:`x \rightarrow y`

where :math:`x,y \in (V \cup T)^{+}` and :math:`|x|\le |y|`

Can be shown that another way to define these is that all productions
are of the form: 

   :math:`xAy \rightarrow xvy`

This is equivalent to saying :math:`A \rightarrow v` can be applied
*in the context of* :math:`x` on the left and :math:`x` on the right. 

**Definition:** :math:`L` is context-sensitive (CSL) if there exists a
context-sensitive grammar :math:`G` such that :math:`L = L(G)` or
:math:`L = L(G) \cup \{\lambda\}`.

In the definition of the grammar, we can't have any lambda rules.

We put :math:`\lambda` in there so we can claim that CFL :math:`\subset` CSL 

**Theorem:** For every CSL :math:`L` not including :math:`\lambda`,
:math:`\exists` an LBA :math:`M` such that :math:`L = L(M)`.

**Theorem:** If :math:`L` is accepted by an LBA :math:`M`, then
:math:`\exists` CSG :math:`G` such that :math:`L(M) = L(G)`.

**Theorem:** Every context-sensitive language :math:`L` is recursive.

**Theorem:** There exists a recursive language that is not CSL.

.. note::
   
   Section 11.3 covers context-sensitive languages (CSL).
   These languages lie between the context-free languages and the
   recursive languages.
   CSL's and LBA's (linear bounded automata) represent the same class
   of languages.
