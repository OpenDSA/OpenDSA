.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Mostafa Mohammed, and Cliff Shaffer
   :satisfies:
   :topic: Closure Properties of Regular Grammars


Identifying Non-regular Languages
=================================

Identifying Non-regular Languages
---------------------------------

We have now spent a lot of time time looking at a bunch of
ways of describing languages.
But they are all pretty much the same, in
that they all desribe the same set of languages: Regular Languages.
And we have hinted numerous times that not all languages are regular.
So, finally, we come to grips with (1) seeing some actual non-regular
languages, and (2) using tools that help us to prove that a given
language is non-regular.

.. inlineav:: introNonRegularFS ff
   :links: AV/PIFLA/NonRegular/introNonRegularFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/introNonRegularFS.js
   :output: show

|

.. inlineav:: Proof1NonRegularCON ss
   :long_name: Proof 1 Non-Regular Grammar Slideshow
   :links: AV/VisFormalLang/NonReg/Proof1NonRegularCON.css
   :scripts: AV/VisFormalLang/NonReg/Proof1NonRegularCON.js
   :output: show

We are about to formalize the proof in the slideshow into a tool for
proving some languages to be nonregular.
But first, let's explore the relationship of loops in DFAs to regular
languages a bit more.

First, we know that loops don't always cause a problem.
In fact, there is a simple relationship between DFAs with or without
loops, and languages that are infinite or finite.
That is, a finite language is accepted by a DFA with no loop.
Its not possible that the language accepted would be finite, since we
can't control the number of times that the machine goes around the
loop.
That is, the machine can accept all strings in the finite language,
but it has to accept more strings as well.
Conversely, any infinite language must be accepted by a DFA with one
or more loops.

Next, consider that we can use a DFA to "count" a finite number of
things.
For example, we can make a DFA that never has three consecutive a's,
or one that has at most three a's in the string.
So long as we want to count a fixed number (or maximum number) of
things, we are OK.
And of course, such a machine can have a loop.
What **cannot** happen is for the loop to affect the counting process.
So, the series of states that counts to three a's can include a loop
to process an arbitrary number of b's, because that will not disrupt
the count of a's.
But if the loop includes a's, then we "lose count" of how many a's we
have seen, because we can't control the number of times through the
loop (or more precisely, we must accept strings that add characters
processed an arbitrary number of times through the loop).


The Concept of Pumping
----------------------

.. inlineav:: introPumpingFS ff
   :links: AV/PIFLA/NonRegular/introPumpingFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/introPumpingFS.js
   :output: show


The Pumping Lemma
-----------------

.. inlineav:: PumpingLemmaCON ss
   :long_name: Pumping Lemma Slideshow
   :links: AV/VisFormalLang/NonReg/PumpingLemmaCON.css
   :scripts: AV/VisFormalLang/NonReg/PumpingLemmaCON.js
   :output: show

**How To Use the Pumping Lemma to prove L is not regular: Proof by Contradiction**

   * Assume L is regular.
   * Therefore :math:`L` satisfies the pumping lemma. 
   * Choose a long string :math:`w \in L`, :math:`|w| \ge m`.
     Remember that :math:`m` relates to the number of states in the
     machine, with :math:`m` being great enough that it has to trigger
     at least one loop.
     Which string we pick is critical.
     We must pick a string that will yield a contradiction.
     And we succeed with the proof if we find any such string,
     even if there exist other stings that don't let us succeed.
   * Show that, for our string, there is NO division of :math:`w` into
     :math:`xyz` (we must consider all possible divisions) such that
     :math:`|xy| \le m`, :math:`|y| \ge 1` and
     :math:`xy^iz \in L` for all  :math:`i \ge 0`.
   * If we show that there is NO possible division,
     then we have a contradiction!
   * :math:`\Rightarrow L` is not regular.

Unfortunately, the pumping lemma is one-way:
For (some) languages we can use the pumping lemma to prove that they
are **not** regular.
But we cannot use the pumping lemma to help us prove that a language
is regular.
And the pumping lemma is not a universal solution for determining that
a language is non-regular.
Its just a tool in the toolbox.


Some Pumping Lemma Examples
---------------------------

.. inlineav:: PLExampanbnFS ff
   :links: AV/PIFLA/NonRegular/PLExampanbnFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExampanbnFS.js
   :output: show

|

.. inlineav:: PLExampwwRFS ff
   :links: AV/PIFLA/NonRegular/PLExampwwRFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExampwwRFS.js
   :output: show


.. topic:: Example

   Use the Pumping Lemma to prove that the language
   :math:`L = \{a^mb^n \mid n+m` is odd :math:`\}` is non-regular.

   But wait! $L$ is a regular language!
   For example, it is not hard to create a DFA that maintains states
   for whether we have seen an even number of symbols so far or an odd
   number.
   If the language is indeed regular, you should find it impossible to
   use the pumping lemma to prove it non-regular.
   In particular, regardless of what value for :math:`w` is picked
   it should not be possible to decompose :math:`w` into :math:`xyz`
   such that :math:`|xy| \le m`, :math:`|y| \ge 1`, and
   :math:`xy^iz \in L` for all values of :math:`i \ge 0`.

   The intuition here is that for any suitably long string, we can
   find a decomposition that lets us pump the :math:`y` substring.
   In particular, for any value of :math:`m \ge 2`, :math:`w`
   has to be at least 3 symbols long (since it has to be of
   odd length to be in the language).
   And in this case, we can always decompose the string such that
   :math:`y` is two symbols long.
   Which means that it can be pumped any number of times (or deleted),
   and the resulting string is still of odd length, and therefore in
   the language.


.. topic:: Example

   Let's look at some more languages that are easily shown to be
   non-regular by the Pumping Lemma.
   In particular, consider these languages:

   * :math:`L = \{a^ncb^n | n > 0\}`
   * :math:`L = \{a^nb^{n+s}c^s | n,s > 0\}`
   * :math:`\Sigma = \{a, b\}, L = \{w \in \Sigma^* | n_a(w) >
     n_b(w)\}`. (Remember that :math:`n_a(w)` means the number of a's
     in :math:`w`.)

   For each of these languages, we can use the same strategy that we used
   in the examples of :math:`L = \{a^nb^n\}` and
   :math:`L = \{ww^R | w \in \Sigma^*\}`.
   Namely, we pick a string with at least :math:`m` leading a's, and show
   that since this results in :math:`y` being some number of a's, it
   cannot be pumped.

.. .. Don't need this
   .. .. inlineav:: PLExample3FS ff
      :links: AV/PIFLA/NonRegular/PLExample3FS.css
      :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExample3FS.js
      :output: show

.. .. |

.. .. Don't need this
   .. .. inlineav:: PLExample4FS ff
   :links: AV/PIFLA/NonRegular/PLExample4FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExample4FS.js
   :output: show

.. .. |

.. .. Don't need this
   .. .. inlineav:: PLExample5FS ff
   :links: AV/PIFLA/NonRegular/PLExample5FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExample5FS.js
   :output: show

.. .. |

Now let's look at an example that is not so easy, because we cannot
use that simple strategy.
This means that we have to pick a string :math:`w` that will lead to a
number of cases for the decomposition into :math:`xyz` that we will
have to get through.

.. inlineav:: PLExampa3bncn3FS ff
   :links: AV/PIFLA/NonRegular/PLExampa3bncn3FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/PLExampa3bncn3FS.js
   :output: show


The Pumping Lemma Adversary Game
--------------------------------

Here is an adversary argument way of looking at this.
Your goal is to establish a contradiction (to prove the language is
not regular), while the opponent tries to stop the proof.
The moves in the game are:

1. The opponent picks $m$.
2. We pick string $w$ in $L$ of length equal or greater than $m$.
   We are free to chose any $w$, so long as $w\\in L$ and $|w|\\ge m$.
3. The opponent chooses the decomposition $xyz$,
   such that $|xy|\\le m,|y|\\ge1$.
   The opponent will make the choice that is hardest for us to win the
   game.
4. We try to pick $i$ so that the pumped string $w_i=xy^iz$ is not in
   $L$.
   If we can always do this, we win ($L$ is not regular).

As we see, the adversary games are role based game where
**we** seek to prove the language is non-regular.
**The adversary** seeks to stop us.

| Consider the Pumping Lemma definition again:
|   Let :math:`L` be an infinite regular language. 
    There exists a constant :math:`m > 0` such that any
    :math:`w \in L` with :math:`|w| \ge m` can be decomposed into three
    parts as :math:`w=xyz` with:
|     :math:`|xy| \le m`
|     :math:`|y| \ge 1`
|     :math:`xy^iz \in L` for all :math:`i\ge 0`

To connect the adversary game to the pumping lemma proof,
we divide proof into steps as follows:

| In the pumping lemma proof we write
| **There exists** a constant :math:`m > 0`
  [:math:`=` **Adversary** picks a value for :math:`m`.]
| such that **any** :math:`w \in L` with :math:`|w| \ge m`
  [:math:`=` **WE** pick our choice for :math:`w`.]
| ... **can be** decomposed into three parts as :math:`w = xyz`
  [:math:`=` **Adversary** picks :math:`xyz`]
  (but they are required to meet the length criteria on
  :math:`xy` and :math:`y`)
| ... such that :math:`xy^iz \in L` **for all** :math:`i \ge 0`
  [:math:`=` **WE** pick a value for :math:`i`.]

In the adversary game below, there is a list of languages to chose
from.
Some of these are regular, some are non-regular.
If you think that the language is non-regular, then you should choose
to let the computer go first.
This makes the computer pick :math:`m`, and then you pick a string
:math:`w` that lets you complete the proof, and so you win.

However, if you think that a language is regular, then you should
choose to go first (that is, you pick the value for :math:`m`, which
is effectively picking the machine to recognize the language within
the context of the proof).
In that case, you want to make moves that stop the proof
(you will make an effective decomposition for :math:`xyz` for whatever
string  :math:`w` the computer picks), and so you win.
  
.. avembed:: AV/VisFormalLang/NonReg/PLGame.html ss
   :long_name: Regular Pumping Lemmma


Using Closure Properties to Prove L is Not Regular
--------------------------------------------------

Sometimes we are unable prove that a language is non-regular by using the
pumping lemma.
Maybe we can't find the right string to use initially, or we can't
figure out an argument for why there is a contradiction.
Either way, it helps to have other tools to prove languages are non-regular.
So here is another tool that we might be able to use.

Recall that regular languages are closed under certain operations.
For example, a regular language that is the union of two known regular
languages is itself regular.
This is an example of using closure properties to prove that a
language is regular.

In a similar way, we can use closure properties to show that a
language is **not** regular.
The approach is to use certain operations to derive a language
that we already know is non-regular.

.. inlineav:: ClosPropFS ff
   :links: AV/PIFLA/NonRegular/ClosPropFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/ClosPropFS.js
   :output: show

|

.. inlineav:: ClosPropEx1FS ff
   :links: AV/PIFLA/NonRegular/ClosPropEx1FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/ClosPropEx1FS.js
   :output: show

|

.. inlineav:: ClosPropEx2FS ff
   :links: AV/PIFLA/NonRegular/ClosPropEx2FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/ClosPropEx2FS.js
   :output: show

.. .. We don't need to do yet one more example!
   .. .. inlineav:: ClosPropEx3FS ff
   :links: AV/PIFLA/NonRegular/ClosPropEx3FS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/NonRegular/ClosPropEx3FS.js
   :output: show

            
Let's do one more quick example.
Prove that :math:`L_1 = \{a^nb^na^n\ |\ n > 0\}` is non-regular by
using closure operations.

   * Assume that :math:`L_1` is non-regular, and derive a contradiction.
   * The goal is to try to construct :math:`\{a^nb^n | n > 0\}` which
     we know is not regular. 
   * Note that trying to intersect with :math:`\{a^{*}b^{*} \}` does
     **not** help us, because the intersection is just the empty set.
   * Let :math:`L_2 = \{a^{*}\}`. :math:`L_2` is regular, since we are
     defining this using a regular expression.
   * Now define
     :math:`L_3 = L_1 \backslash L_2 = \{a^nb^na^p\ |\ 0 \le p \le n, n > 0\}`.
     This is using the right closure operation, which we know is closed
     for regular languages.
     In this case, we are just trimming some number of a's from the end
     of :math:`L_1`.
     Sometimes we trim **all** of the a's from the end of :math:`L_1`.
   * By closure under intersection,
     :math:`L_4 = L_3 \cap \{a^{*}b^{*}\} = \{a^nb^n\ |\ n > 0\}` is
     regular.
     Note that we had to do the step with the trimming of letters,
     because simply intersecting :math:`L_1` with :math:`a^*b^*` does
     not give us what we want.
   * We already proved that :math:`L_4` is not regular. Contradiction.
   * :math:`\Rightarrow L_1` is not regular.


Questions to Think About
------------------------

To review what we now know: There are languages that are regular, and
there are languages that are nonregular.
Regular languages can be represented in any of several interchangeable
ways.
Some nonregular languages can be proved such using tools like the
Pumping Lemma, and closure properties.

These facts should lead us to ask some broader questions.
In particular, is every language either regular or nonregular?
And if so, can we always **decide**, for every language, whether it is
regular or nonregular?

Remember what a language is: It is simply a set of strings.
Most sets of strings are infinite, in that there are many more
infinite sets of strings than there are finite sets of strings.
(Is this claim **really** true? Does that actually make sense?
There are an infinite number of finite sets of strings.)
An important point is that a language is not just those sets of
strings that have a description as, for example, a RegEx (of course
not, since not all languages are regular).
A language is not even just those sets that can be described in
English, or a mix of English and math notation.

We will come back to these and similar questions later in the book.
They relate to issues of Turing decideable vs. Turing acceptable
languages, P vs. NP, and what questions about languages are
decideable vs. undecideable.
By the end of this book, we should have some answers to these
questions, and a better understanding of our limits to what can be
known about languages.
