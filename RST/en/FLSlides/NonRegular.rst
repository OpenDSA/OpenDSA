.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Closure Properties of Regular Grammars
   :satisfies: Identifying Non-regular Languages
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Identifying Non-regular Languages
=================================

.. slide:: Review

   How do we prove that a language is regular?

   We have a number of approaches in our toolbox.


.. slide:: How do we know if a language is non-regular?

   Given so many tools for creating a regular language, are there
   languages that are not regular?

   (The very fact that we are concerned with this question is a hint that
   this can happen.)

   If a language :math:`L` is finite, is :math:`L` regular?

   If :math:`L` is infinite, is :math:`L` regular? 


.. slide:: Something to Think About, Revisited

   :math:`L = \{a^nb^n \mid n>0\}`

   Is language :math:`L` regular?
   Can you draw a DFA, regular expression, or Regular grammar for this
   language?


.. slide:: Our First Non-regular Language (1)

   **Prove** that :math:`L_2 = \{a^nb^n | n > 0 \}` is not regular.

   | Proof 1 (by contradiction)
   |   If :math:`L_2` is regular then  :math:`\exists` DFA :math:`M`
       that recognizes :math:`L_2`.
   |   :math:`M` has a finite number of states, say :math:`k` states. 
   |   Consider a long string :math:`a^kb^k \in L_2`. 
   |   Since there are :math:`k` states and :math:`k` a's,
       some state in :math:`M` must be reached more than once when
       following the path of :math:`a^k`. 
   |   In that case, there is a loop with one or more a's
       (say :math:`t` a's for some :math:`t > 1`) along the path. 


.. slide:: Our First Non-regular Language (2)

   | Proof 1 (continued)
   |   Suppose we start at the initial state, traverse the same path for
       :math:`a^kb^k`, but we traverse the loop of :math:`a` 's one
       additional time.
   |   We will end up in the same final state that :math:`a^kb^k` did,
       but our actual number of a's is some other value (call it
       :math:`m`).
   |   Therefore, the string :math:`a^mb^k` is accepted by :math:`M`,
       but this string is not in :math:`L_2`. Contradiction!
   |   Thus, :math:`L_2` is not regular.


.. slide:: Pigeonhole Principle

   This is an example of the *Pigeonhole Principle*.

   The Pigeonhole Principle states that, given :math:`n` pigeonholes
   and :math:`n+1` pigeons, when all of the pigeons go into the holes
   we can be sure that at least one hole contains more than one pigeon.

   In our case, the number of :math:`a` 's are the pigeons,
   and the states in the DFA are the pigeonholes.

   We can't distinguish the various possibilities for the number of
   :math:`a` 's, so we can't verify that they properly match the number
   of :math:`b` 's.


.. slide:: Pumping Concept (1)

   | We introduce the concept of "pumping" the string as
     we go around the loop.
   |   Loops are how we get infinite languages.
   |   They are also how we lose count or otherwise lose the ability to
       distinguish various properties of the string being processed.

   Another way of looking at it is that the memory of a DFA is embodied
   explicitly in its set of states.

   Since the number of states is finite, the memory is finite.

   A program in a traditional programming language might
   have one integer (that conceptually at least stores an infinite number
   of values, even if that is not literally true), a DFA has no such
   thing.


.. slide:: Pumping Concept (2)

   | In general, consider DFAs with or without cycles.
   |   If there is no cycle, the language accepted is finite.
   |   If there is one or more cycle, then the language is infinite.
   | Let's assume that there is exactly one cycle.
   |   The cycle might be skipped, executed once, or executed more than once.
   | We can consider any string accepted by this DFA when the cycle is
     executed exactly once to be of the form
     :math:`w = w_1vw_2` where the :math:`v` represents the part of the
     string captured by the cycle.
   |   If the cycle is skipped, then we get :math:`w = w_1w_2`
   |   If its executed twice we get :math:`w = w_1v^2w_2`.
   |   In general, the DFA accepts all strings like  :math:`w = w_1v^*w_2`.


.. slide:: Pumping Lemma

   | Let :math:`L` be an infinite regular language. 
   | Then there exists a constant :math:`m > 0` such that any
     :math:`w \in L` with :math:`|w| \ge m` can be decomposed into three
     parts as :math:`w=xyz` with:
   |   :math:`|xy| \le m`
   |   :math:`|y| \ge 1`
   |   :math:`xy^iz \in L` for all :math:`i\ge 0`

   **Meaning:** Every sufficiently long string in :math:`L`
   (the constant :math:`m` corresponds to the finite number of states in
   :math:`M`)
   can be partitioned into three parts such that the middle 
   part can be "pumped", resulting in strings that must be in :math:`L`. 


.. slide:: P.L. Used to Prove *L* Non-regular

   | Proof by Contradiction.
   | Assume L is regular.
   | Therefore :math:`L` satisfies the pumping lemma. 
   | Choose a long string :math:`w \in L`, :math:`|w| \ge m`.
   |   (The choice of the string is crucial.
       We must pick a string that will yield a contradiction). 
   | Show that there is NO division of :math:`w` into :math:`xyz`
   |   (must consider all possible divisions) such that
       :math:`|xy| \le m`, :math:`|y| \ge 1` and :math:`xy^iz \in L \forall i \ge 0`.
   | The pumping lemma does not hold. Contradiction!
   | :math:`\Rightarrow L` is not regular.


.. slide:: Example

   | Prove that :math:`L = \{a^nb^n | n \geq 0\}` is not regular.
   |   Assume :math:`L` is regular, therefore the pumping lemma holds. 
   |   Choose :math:`w = a^mb^m`
       where :math:`m` is the constant in the pumping lemma. 
   |     (Note that :math:`w` must be chosen such that :math:`|w| \ge m`.) 
   |   Choose :math:`n = m`.
       Therefore, substring :math:`y` must be some number of
       :math:`a` 's.
   |   So the partition is :math:`x=a^{n-k}\quad |\quad y=a^k\quad |\quad z=b^n`
       where :math:`n \leq m` and :math:`k > 0`.
   |   It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.
   |   But clearly this is not true. Contradiction! 


.. slide:: Observations

   | Unfortunately, the pumping lemma is one-way:
   |   For (some) languages we can use the pumping lemma to prove that they
       are not regular.
   |   But we cannot use the pumping lemma to help us prove that a language
       is regular.
   |   And the pumping lemma is not a universal solution for determining that
       a language is non-regular.
       Its just a tool in the toolbox.


.. slide:: More Observations

   The pumping lemma says that there
   is **some** way to define the language that meets the criteria.

   It is not enough to pick your favorite value of :math:`m` for which
   the language would/would not be regular.

   You have to show that **no** satisfactory :math:`m` **can** exist.


.. slide:: Can View as Adversary Argument

   |   Your want to establish a contradiction (to prove the language is
       not regular)
   |   Meanwhile, the opponent tries to stop the proof.
   |   The moves in the game are:
   |   1. The opponent picks :math:`m`.
   |   2. We pick string :math:`w` in :math:`L` of length equal or greater
          than :math:`m`.
   |      We are free to chose any :math:`w`, so long as :math:`w \in L` and
          :math:`|w| \geq m`.
   |   3. The opponent chooses the decomposition :math:`xyz`, such that
          :math:`|xy| \leq m, |y| \geq 1`.
   |      The opponent will make the choice that is hardest for us to win the
          game.
   |   4. We try to pick :math:`i` so that the pumped string
         :math:`w_i = xy^iz` is not in :math:`L`.
   |   If we can always do this, we win (:math:`L` is not regular).


.. slide:: Example

   | Prove :math:`L = \{ww^R : w \in \Sigma^*\}` is not regular.
   |   For any value :math:`m`, we pick the string
       :math:`a^mb^mb^ma^m`.
   |   Since :math:`|xy| \leq m`, :math:`y` must consist entirely of
       :math:`a` 's.
   |   If we pick :math:`i = 0`, then the resulting string has fewer
       :math:`a` 's on the left than on the right and so cannot be of
       the form :math:`ww^R`.
   |   Therefore, :math:`L` is not regular.


.. slide:: Example: Failure (as expected)

   If the language is indeed regular, you should find it impossible to
   use the pumping lemma to prove it non-regular!

   | Prove :math:`L = \{a^mb^n \mid n+m` is odd :math:`\}` is not regular.
   |   If the opponent picks :math:`m = 1`, then we can pick
       :math:`w = abb`.
   |   Whatever the adversary picks for 
       :math:`xyz`, we end up with :math:`y` such that we can pump
       strings not in the language.
   |   SO... does this mean that :math:`L` is non-regular?
   |   NO!! The adversary will not pick a
       bad choice for :math:`m` if they don't have to!


.. slide:: Example: Failure (as expected)

   | Prove :math:`L = \{a^mb^n \mid n+m` is odd :math:`\}` is not regular.
   |   Say that the opponent picks :math:`m = 3`.
   |   We can choose this string that is in the language:
       :math:`w = aaabb` so as to constrain the opponent to picking
       values for :math:`y` with all :math:`a` 's.
   |   But unfortunately, the opponent picks decomposition
       :math:`a(aa)^ibb`.
   |   We can't pick :math:`i` that is not in the language.
   |   The point is that we **cannot** find a string, for all values
       of :math:`m`, such that the opponent cannot also pick workable
       values for :math:`x, y, z`.


.. slide:: Adversary Argument Explained (1)

   | Consider the Pumping Lemma definition again:
   |   Let :math:`L` be an infinite regular language. 
       There exists a constant :math:`m > 0` such that any
       :math:`w \in L` with :math:`|w| \ge m` can be decomposed into three
       parts as :math:`w=xyz` with:
   |     :math:`|xy| \le m`
   |     :math:`|y| \ge 1`
   |     :math:`xy^iz \in L` for all :math:`i\ge 0`

   | 1. The opponent picks :math:`m`.
   | 2. We pick string :math:`w`.
   | 3. The opponent chooses the decomposition :math:`xyz`.
   | 4. We try to pick :math:`i`.


.. slide:: Adversary Argument Explained (2)

   | **WE** seek to prove the language non-regular.
   | **The adversary** seeks to stop us.

   #. **There exists** a constant :math:`m > 0`
      [= **Adversary** picks a value for :math:`m`.]
   #. ... such that **any** :math:`w \in L` with :math:`|w| \ge m`
      [= **WE** pick our choice for :math:`w`.]
   #. ... **can be** decomposed into three parts as :math:`w=xyz`
      [=  **Adversary** picks :math:`xyz`]
      (that meets the length criteria on :math:`xy` and :math:`y`)
   #. ... such that :math:`xy^iz \in L` **for all** :math:`i\ge 0`
      [= **WE** pick a value for :math:`i`.]


.. slide:: Example

   | Prove that :math:`L = \{a^ncb^n | n > 0\}` is not regular.
   |   Assume :math:`L` is regular, therefore the pumping lemma holds. 
   |   Choose :math:`w = a^mcb^m`
       where :math:`m` is the constant in the pumping lemma. 
       (Note that :math:`w` must be choosen such that :math:`|w|\ge m`.) 
   |   The only way to partition :math:`w` into three parts,
       :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
       :math:`y` contains 1 or more a's, and :math:`z` contains 0 or
       more a's concatenated with :math:`cb^m`.
       This is because of the restrictions :math:`|xy| \le m` and
       :math:`|y|> 0`.
   |   So the partition is: :math:`x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m-k-j}cb^m`
       where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
       for some constants :math:`k` and :math:`j`. 
   |   It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.
   |   :math:`xy^0z = a^{m-j}cb^{m} \not \in L`. Contradiction! 


.. slide:: Example (1)

   | Prove that :math:`L = \{a^3b^nc^{n-3} | n > 3 \}` is not regular.
   |   We can do this with the Pumping Lemma, but it is very complicated!


.. slide:: Using Closure Properties

   Using closure properties of regular languages, construct a language 
   that should be regular, but for which you have already shown is 
   not regular. Contradiction.

   | **Proof Outline:**
   | Assume :math:`L` is regular.
   | Apply closure properties to :math:`L` and other regular
     languages, constructing :math:`L'` that you know is not regular.
   | Closure properties :math:`\Rightarrow L'` is regular.
   | Contradiction. So :math:`L` is not regular.


.. slide:: Example

   | Prove that :math:`L = \{a^3b^nc^{n-3} | n > 3 \}` is not regular.
   |   Assume :math:`L` is regular.
   |   Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*`
       such that :math:`h(a) = a\quad |\quad h(b) = a\quad |\quad h(c) = b`.
   |   :math:`h(L) = \{a^3a^nb^{n-3} | n > 3 \} = \{a^{n+3}b^{n-3} | n > 3\}`
   |   :math:`L` is regular and closure under homomorphism
       :math:`\Rightarrow h(L)` is regular. 
   |   The language :math:`\{b^6\}` is a regular language. 
   |   By closure under concatenation,
       :math:`L' = h(L)\{b^6\} = \{a^{n+3}b^{n+3} | n > 3\}`
       is regular. 
   |   The language
       :math:`L'' = \{ab, aabb, aaabbb, aaaabbbb, aaaaabbbbb, aaaaaabbbbbb\}` is regular. 
   |   By closure under union, :math:`L' \cup L'' = \{a^nb^n | n > 0\}`
       is regular. 
   |   But, we showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
       regular! Contradiction.

      
.. slide:: Example

   | Prove that :math:`L = \{a^nb^ma^{m}\ |\ m \ge 0, n \ge 0 \}` is not regular.
   |   Assume :math:`L` is regular.
   |   :math:`L1 = \{ bb^{*}aa^{*}\}`
   |   :math:`L2 = L \cap L1 = \{b^na^n \mid n > 0\}`
   |   Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*` 
       such that :math:`h(a) = b\quad |\quad h(b) = a`.
   |   :math:`h(L2) = \{a^nb^n | n>0 \}` should be regular.
   |   We showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
       regular. Contradiction.

.. 
.. slide:: Example
.. 
   | Prove that :math:`L_1 = \{a^nb^na^n\ |\ n > 0\}` is not regular.
   |   Assume :math:`L_1` is regular.
   |   The goal is to try to construct :math:`\{a^nb^n | n > 0\}` which
       we know is not regular. 
   |   NOTE: Trying to intersect with :math:`\{a^{*}b^{*} \}` does not work. 
   |   Let :math:`L_2 = \{a^{*}\}`. :math:`L_2` is regular. 
   |   By closure under right quotient,
       :math:`L_3 = L_1 \backslash L_2 = \{a^nb^na^p | 0 \le p \le n, n > 0\}`
       is regular. 
   |   By closure under intersection,
       :math:`L_4 = L_3 \cap \{a^{*}b^{*}\} = \{a^nb^n | n > 0\}` is regular. 
   |  We already proved that :math:`L_4` is not regular. Contradiction.
