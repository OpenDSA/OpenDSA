.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Closure Properties of Regular Grammars
   :satisfies: Identifying Non-regular Languages
   :topic: Finite Automata


Identifying Non-regular Languages
=================================

Identifying Non-regular Languages
---------------------------------

How do we prove that a language is regular?
We have a number of approaches in our toolbox.

#. Build a DFA.
#. Build a NFA.
#. Write a regular expression.
#. Write a regular grammar.
#. Start with known regular languages and apply operations known to be
   closed for regular languages.

Given so many tools for creating a regular language, are there
languages that are not regular?
(The very fact that we are concerned with this question is a hint that
this can happen.)

Let's start with some basic questions.
First, if a language :math:`L` is finite, is :math:`L` regular?
Yes! All finite languages are regular. [Why?]

If :math:`L` is infinite, is :math:`L` regular? 
It might be and it might not.
For example,
:math:`L_1 = \{a^nb^m | n > 0, m > 0 \} = aa^*bb^*` 
is an infinite regular language. 

So, what about a language that was mentioned earlier, with no clear resolution?
:math:`L_2 = \{a^nb^n | n > 0 \}` is an infinite language. [How do we
know this?]

**Prove** that :math:`L_2 = \{a^nb^n | n > 0 \}` is not regular.
The following visualization presents Proof 1 for this.

.. inlineav:: Proof1NonRegularCON ss
   :long_name: Proof 1 Non-Regular Grammar Slideshow
   :links: AV/VisFormalLang/NonReg/Proof1NonRegularCON.css
   :scripts: AV/VisFormalLang/NonReg/Proof1NonRegularCON.js
   :output: show


The Concept of Pumping
~~~~~~~~~~~~~~~~~~~~~~

Proof 2 (by contradiction, but worded a little differently)

   | Proof: Suppose that :math:`L_2` is regular. 
   | Then there exists DFA :math:`M` that recognizes :math:`L_2`.
   | :math:`M` has a finite number of states, say :math:`k` states. 
   | Consider a long string :math:`a^kb^k \in L_2`. 
   | Since there are :math:`k` states and :math:`k` a's
     (followed by some b's),
     some state in :math:`M` must be reached more than once when
     following the path of :math:`a^k`. 
   | In that case, there is a loop with one or more a's
     (say :math:`t` a's for some :math:`t > 1`) along the path. 
   | Suppose we start at the initial state, traverse the same path for
     :math:`a^kb^k`, but we traverse the loop of a's one additional time
     ("pump" the loop).
     We will end up in the same final state that :math:`a^kb^k` did. 
   | Therefore, the string :math:`a^{k+t}b^k` is accepted by :math:`M`,
     but this string is not in :math:`L_2`. Contradiction! 
   | Thus, :math:`L_2` is not regular.

In Proof 2, we introduce the concept of "pumping" the string as
we go around the loop.
Loops are how we get infinite languages.
They are also how we lose count or otherwise lose the ability to
distinguish various properties of the string being processed.

Another way of looking at it is that the memory of a DFA is embodied
explicitly in its set of states.
Since the number of states is finite, the memory is finite.
Further, while a program in a traditional programming language might
have one integer (that conceptually at least stores an infinite number
of values, even if that is not literally true), a DFA has no such
thing.

In general, consider a DFAs with or without cycles.
If there is no cycle, the language accepted is finite.
If there is one or more cycle, then the language is infinite.
But we can actually say a bit more about this language.
To explain the concept, let's assume that there is exactly one cycle.
In that case, the cycle might be skipped, executed once, or executed
more than once.

We can consider any string accepted by this DFA when the cycle is
executed exactly once to be of the form
:math:`w = w_1vw_2` where the :math:`v` represents the part of the
string captured by the cycle.
Now, if the cycle is skipped, then we get :math:`w = w_1w_2`, and if
its executed twice we get :math:`w = w_1v^2w_2`.
In general, the DFA accepts all strings like  :math:`w = w_1v^*w_2`.

Pumping Lemma
~~~~~~~~~~~~~

.. inlineav:: PumpingLemmaCON ss
   :long_name: Pumping Lemma Slideshow
   :links: AV/VisFormalLang/NonReg/PumpingLemmaCON.css
   :scripts: AV/VisFormalLang/NonReg/PumpingLemmaCON.js
   :output: show

**How To Use the Pumping Lemma to prove L is not regular:**

   | Proof by Contradiction.
   | Assume L is regular.
   | Therefore :math:`L` satisfies the pumping lemma. 
   | Choose a long string :math:`w \in L`, :math:`|w| \ge m`.
     The choice of the string is crucial.
     We must pick a string that will yield a contradiction.
   | Show that there is NO division of :math:`w` into :math:`xyz`
     (we must consider all possible divisions) such that
     :math:`|xy| \le m`, :math:`|y| \ge 1` and :math:`xy^iz \in L \forall i \ge 0`.
   | If we show that there is NO possible division, then we have a contradiction!
   | :math:`\Rightarrow L` is not regular.

Note that, unfortunately, the pumping lemma is one-way:
For (some) languages we can use the pumping lemma to prove that they
are not regular.
But we cannot use the pumping lemma to help us prove that a language
is regular.
And the pumping lemma is not a universal solution for determining that
a language is non-regular.
Its just a tool in the toolbox.

.. topic:: Example

   :math:`L = \{a^nb^n | n \geq 0\}`

   **Theorem:** :math:`L` is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^mb^m`
        where :math:`m` is the constant in the pumping lemma. 
        (Note that :math:`w` must be choosen such that :math:`|w| \ge m`.) 
      | We can always choose :math:`n = m`.
        Therefore, substring :math:`y` must be some number of
        :math:`a` 's.
      | So the partition is: 

        .. math::

           x=a^{n-k}\quad |\quad y=a^k\quad |\quad z=b^n

      | where :math:`n \leq m` and :math:`k > 0`.
      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.
      | But clearly this is not true. Contradiction! 
      | :math:`\Rightarrow L` is not regular.

It is important to understand that the pumping lemma says that there
is **some** way to define the language that meets the criteria.
It is not enough to pick your favorite value of :math:`m` for which
the language would not be regular.
You have to show that **no** satisfactory :math:`m` **can** exist.

.. From Linz

Here is an adversary argument way of looking at this.
Your goal is to establish a contradiction (to prove the language is
not regular), while the opponent tries to stop the proof.
The moves in the game are:

#. The opponent picks :math:`m`.
#. We pick string :math:`w` in :math:`L` of length equal or greater
   than :math:`m`.
   We are free to chose any :math:`w`, so long as :math:`w \in L` and
   :math:`|w| \geq m`.
#. The opponent chooses the decomposition :math:`xyz`, such that
   :math:`|xy| \leq m, |y| \geq 1`.
   The opponent will make the choice that is hardest for us to win the
   game.
#. We try to pick :math:`i` so that the pumped string
   :math:`w_i = xy^iz` is not in :math:`L`.
   If we can always do this, we win (:math:`L` is not regular).

.. topic:: Example

   :math:`L = \{ww^R : w \in \Sigma^*\}`.

   **Theorem:** :math:`L` is not regular.
   
   **Proof:**

      | For any value :math:`m`, we pick the string
        :math:`a^mb^mb^ma^m`.
      | Since :math:`|xy| \leq m`, :math:`y` must consist entirely of
        :math:`a` 's.
      | If we pick :math:`i = 0`, then the resulting string has fewer
        :math:`a` 's on the left than on the right and so cannot be of
        the form :math:`ww^R`.
      | Therefore, :math:`L` is not regular.


.. topic:: Example

   If the language is indeed regular, you should find it impossible to
   use the pumping lemma to prove it non-regular!

   :math:`L = \{a^mb^n \mid n+m` is odd :math:`\}`

   | Prove :math:`L` is not regular.
   |   If the opponent picks :math:`m = 1`, then we can pick
       :math:`w = abb`.
   |   Whatever the adversary picks for 
       :math:`xyz`, we end up with :math:`y` such that we can pump
       strings not in the language.
       
   | **Warning:**
   |    When the opponent picked :math:`m = 1`, they could not
        reach the conclusion that :math:`L` is non-regular.
        Does this fact alone mean that :math:`L` is regular?
   |    NO!! The adversary will not pick a
        bad choice for :math:`m` if they don't have to!

.. topic:: Example

   If the language is indeed regular, you should find it impossible to
   use the pumping lemma to prove it non-regular!

   :math:`L = \{a^mb^n \mid n+m` is odd :math:`\}`

   **Theorem:** :math:`L` is not regular.
   
   **Proof:**

      | Say that the opponent picks :math:`m = 3`.
      | We can choose this string that is in the language:
        :math:`aaabb` so as to constrain the opponent to picking
        values for :math:`y` with all :math:`a` 's.
      | But unfortunately, the opponent picks decomposition
        :math:`a(aa)^ibb`.
      | We can't pick :math:`i` that is not in the language.
      | The point is that we **cannot** find a string, for all values
        of :math:`m`, such that the opponent cannot also pick workable
        values for :math:`x, y, z`.

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


.. topic:: Example

   :math:`L = \{a^ncb^n | n > 0\}`

   **Theorem:** :math:`L` is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^mcb^m`
        where :math:`m` is the constant in the pumping lemma. 
        (Note that :math:`w` must be choosen such that :math:`|w|\ge m`.) 
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and :math:`z` contains 0 or
        more a's concatenated with :math:`cb^m`.
        This is because of the restrictions :math:`|xy| \le m` and
        :math:`|y|> 0`.
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m-k-j}cb^m

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.
      | :math:`xy^0z = a^{m-j}cb^{m} \not \in L`. Contradiction! 
      | (Note that :math:`xy^2z` would also give a contradiction,
        but you only need to find one contradiction.)
      | :math:`\Rightarrow L` is not regular.

.. topic:: Example

   :math:`L = \{a^nb^{n+s}c^s | n,s > 0\}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^mb^{m+s}c^s` where :math:`m` is the
        constant in the pumping lemma.
        (Note: :math:`s` could be replaced by any constant here, 5, 9, etc.) 
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and 
        :math:`z` contains 0 or more a's concatenated with the rest of 
        the string :math:`b^{m+s}c^s`.
        This is because of the restrictions :math:`|xy| \le m` and :math:`|y|> 0`. 
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m-k-j}b^{m+s}c^s

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i \ge 0`. 
      | :math:`xy^2z = a^{m+j}b^{m+s}c^s \not\in L`. :math:`n_a + n_c > n_b`. Contradiction! 
      | :math:`\Rightarrow L` is not regular.


.. topic:: Example

   :math:`\Sigma=\{a,b\}, L = \{w\in{\Sigma}^{*}\mid n_a(w) > n_b(w)\}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^{m+1}b^{m}` where :math:`m` is the
        constant in the pumping lemma.
      | The only way to partition :math:`w` into three parts,
        :math:`w=xyz`, is such that :math:`x` contains 0 or more a's,
        :math:`y` contains 1 or more a's, and 
        :math:`z` contains 1 or more a's concatenated with the rest of 
        the string :math:`ab^{m}`.
        This is because of the restrictions :math:`|xy| \le m` and
        :math:`|y| \ge 0`. 
      | So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{m+1-k-j}b^{m}

      where :math:`k \ge 0`, :math:`j > 0`, and :math:`k + j \le m`
      for some constants :math:`k` and `j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i \ge 0`. 
      | :math:`xy^2z = a^{m+1+j}b^{m} \in L`. Not a contradiction.
      | :math:`xy^0z = a^{m+1-j}b^{m} \in L`.
        Since :math:`j > 0`, :math:`n_a \le n_b`. Contradiction! 
      | :math:`\Rightarrow L` is not regular.

.. topic:: Example

   :math:`L = \{a^3b^nc^{n-3} | n > 3 \}`

   **Theorem:** L is not regular.

   **Proof:**

      | Assume :math:`L` is regular, therefore the pumping lemma holds. 
      | Choose :math:`w = a^3b^mc^{m-3}` where :math:`m` is the
        constant in the pumping lemma.
        There are three ways to partition :math:`w` into three parts,
        :math:`w=xyz`.
      |   1) :math:`y` contains only a's 
      |   2) :math:`y` contains only b's, and
      |   3) :math:`y` contains a's and b's 
      | We must show that each of these possible partitions lead to a
        contradiction.
        (Then, there would be no way to divide :math:`w` into three
        parts such that the pumping lemma contraints were true).

      | **Case 1:** (:math:`y` contains only a's).
        Then :math:`x` contains 0 to 2 a's, 
        :math:`y` contains 1 to 3 a's, and 
        :math:`z` contains 0 to 2 a's concatenated with the rest of
        the string :math:`b^{m}c^{m-3}`, such that there are exactly 3
        a's.  
        So the partition is: 

        .. math::

           x=a^k\quad |\quad y=a^j\quad |\quad z=a^{3-k-j}b^{m}c^{m-3}

      where :math:`k \ge 0, j > 0`, and :math:`k + j \le 3` for some
      constants :math:`k` and :math:`j`.

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`. 

      | :math:`xy^2z = (x)(y)(y)(z) = (a^k)(a^j)(a^j)(a^{3-j-k}b^mc^{m-3}) 
               = a^{3+j}b^{m}c^{m-3} \not\in L` since :math:`j>0`,
        there are too many a's. Contradiction.

      | **Case 2:** (:math:`y` contains only b's) 
      | Then :math:`x` contains 3 a's followed by 0 or more b's, 
        :math:`y` contains 1 to :math:`m-3` b's, and 
        :math:`z` contains 3 to :math:`m-3` b's concatenated with the
        rest of the string :math:`c^{m-3}`. 
        So the partition is: 

        .. math::

           x=a^3b^k\quad |\quad y=b^j\quad |\quad z=b^{m-k-j}c^{m-3}

      where :math:`k \ge 0`, :math:`j > 0`, and
      :math:`k + j \le m-3` for some constants :math:`k` and :math:`j`. 

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`.

      | :math:`xy^0z = a^{3}b^{m-j}c^{m-3} \not\in L` since
        :math:`j > 0`, there are too few b's. Contradiction.

      | **Case 3:** (:math:`y` contains a's and b's) 
      | Then :math:`x` contains 0 to 2 a's, 
        :math:`y` contains 1 to 3 a's, and 1 to :math:`m-3` b's, 
        :math:`z` contains 3 to :math:`m-1` b's concatenated with the
        rest of the string :math:`c^{m-3}`.
        So the partition is: 

        .. math::

           x=a^{3-k}\quad |\quad y=a^{k}b^j\quad |\quad z=b^{m-j}c^{m-3}

      where :math:`3 \ge k > 0`, and :math:`m-3 \ge j > 0` for some
      constants :math:`k` and :math:`j`.

      | It should be true that :math:`xy^iz \in L` for all :math:`i\ge 0`. 
      | :math:`xy^2z = a^{3}b^ja^kb^mc^{m-3} \not\in L` since
        :math:`j, k > 0`, there are b's before a's. Contradiction.
      | :math:`\Rightarrow` There is no partition of :math:`w`. 
      | :math:`\Rightarrow L` is not regular.

The following lets you play either side of the adversary argument "game".

.. avembed:: AV/VisFormalLang/NonReg/PLGame.html ss
   :long_name: Regular Pumping Lemmma


**Use Closure Properties** to prove :math:`L` is not regular
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Using closure properties of regular languages, construct a language 
that should be regular, but for which you have already shown is 
not regular. Contradiction.

   | **Proof Outline:**
   | Assume :math:`L` is regular.
   | Apply closure properties to :math:`L` and other regular
     languages, constructing :math:`L'` that you know is not regular.
   | Closure properties :math:`\Rightarrow L'` is regular.
   | Contradiction. So :math:`L` is not regular.

.. topic:: Example

   :math:`L = \{a^3b^nc^{n-3} | n > 3 \}`

   **Theorem:** :math:`L` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L` is regular.
      | Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*`

        .. math::
        
           h(a) = a\quad |\quad h(b) = a\quad |\quad h(c) = b

      | :math:`h(L) = \{a^3a^nb^{n-3} | n > 3 \} = \{a^{n+3}b^{n-3} | n > 3\}`
      | :math:`L` is regular and closure under homomorphism
        :math:`\Rightarrow h(L)` is regular. 
      | The language :math:`\{b^6\}` is a regular language. 
      | By closure under concatenation,
        :math:`L' = h(L)\{b^6\} = \{a^{n+3}b^{n+3} | n > 3\}`
        is regular. 
      | The language :math:`L'' = \{ab, aabb, aaabbb, aaaabbbb, aaaaabbbbb, aaaaaabbbbbb\}` is regular. 
      | By closure under union, :math:`L' \cup L'' = \{a^nb^n | n > 0\}`
        is regular. 
      | But, we showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
        regular! Contradiction.
      | :math:`\Rightarrow L` is not regular.

      
.. topic:: Example

   :math:`L = \{a^nb^ma^{m}\ |\ m \ge 0, n \ge 0 \}`

   **Theorem:** :math:`L` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L` is regular.
      | :math:`L1 = \{ bb^{*}aa^{*}\}`
      | :math:`L2 = L \cap L1 = \{b^na^n \mid n > 0\}`
      | Define a homomorphism :math:`h: \Sigma \rightarrow \Sigma^*` 

        .. math::
      
           h(a) = b\quad |\quad h(b) = a

      | :math:`h(L2) = \{a^nb^n | n>0 \}` should be regular.
      | We showed earlier that :math:`\{a^nb^n | n > 0 \}` is not
        regular. Contradiction.
      | :math:`\Rightarrow L` is not regular.


.. topic:: Example

   :math:`L_1 = \{a^nb^na^n\ |\ n > 0\}`

   **Theorem:** :math:`L_1` is not regular.

   **Proof:** (proof by contradiction)

      | Assume :math:`L_1` is regular.
      | The goal is to try to construct :math:`\{a^nb^n | n > 0\}` which
        we know is not regular. 
      | NOTE: Trying to intersect with :math:`\{a^{*}b^{*} \}` does not work. 
      | Let :math:`L_2 = \{a^{*}\}`. :math:`L_2` is regular. 
      | By closure under right quotient,
        :math:`L_3 = L_1 \backslash L_2 = \{a^nb^na^p | 0 \le p \le n, n > 0\}`
        is regular. 
      | By closure under intersection,
        :math:`L_4 = L_3 \cap \{a^{*}b^{*}\} = \{a^nb^n | n > 0\}` is regular. 
      | We already proved that :math:`L_4` is not regular. Contradiction.
      | :math:`\Rightarrow L_1` is not regular.
