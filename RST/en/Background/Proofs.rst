.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :satisfies: induction proofs
   :topic: Math Background

.. odsalink:: AV/Background/twoColorCON.css
.. odsalink:: AV/Background/TwoColoringProofCON.css

.. index:: !proof

Mathematical Proof Techniques
=============================

Mathematical Proof Techniques
-----------------------------

Solving any problem has two distinct parts:
the investigation and the argument.
Students are too used to seeing only the argument in their textbooks
and lectures.
But to be successful in school (and in life after school),
one needs to be good at both, and to understand the differences
between these two phases of the process.
To solve the problem, you must investigate successfully.
That means engaging the problem, and working through until you find a
solution.
Then, to give the answer to your client (whether that "client" be
your instructor when writing answers on a homework assignment or exam,
or a written report to your boss),
you need to be able to make the argument in a way
that gets the solution across clearly and succinctly.
The argument phase involves good technical writing skills |---|
the ability to make a clear, logical argument.

Being conversant with standard proof techniques can help you in this
process.
Knowing how to write a good proof helps in many ways.
First, it clarifies your thought process, which in turn clarifies your
explanations.
Second, if you use one of the standard proof structures such as proof
by contradiction or an induction proof, then both you and your reader
are working from a shared understanding of that structure.
That makes for less complexity to your reader to understand your
proof, because the reader need not decode the structure of your
argument from scratch.

This section briefly introduces three commonly used proof techniques:

#) deduction, or direct proof;

#) proof by contradiction and

#) proof by mathematical induction.


.. index:: ! proof; direct

In general, a :term:`direct proof` is just a "logical explanation".
A direct proof is sometimes referred to as an argument by deduction.
This is simply an argument in terms of logic.


Direct Proof
~~~~~~~~~~~~

.. _SumDirect:

.. topic:: Example

   Here is a direct proof that :math:`\sum_{i=1}^n i = (n+1)n/2`.
   If we take the first and last terms of the series, since they are 1
   and :math:`n`, of course they sum to :math:`n+1`.
   If we take the second term and next-to-last term, since they are 2
   and :math:`n-1`, they also sum to :math:`n+1`.
   Likewise for the third term and third-from-the-end term.
   We can go on and pair up terms like this, such that there are
   :math:`n/2` pairs that each sum to :math:`n+1`, for a total sum of
   :math:`(n+1)n/2`.
   You can check for yourself that this is true even if :math:`n` is
   odd (and so the middle value of the series has no partner).

Many direct proofs are written in English with words such as
"if ... then".
In this case logic notation such as :math:`P \Rightarrow Q` can often
help express the proof.
Even if we don't wish to use symbolic logic notation, we can still
take advantage of fundamental theorems of logic to structure our
arguments.
For example, if we want to prove that :math:`P` and :math:`Q` are
equivalent, we can first prove :math:`P \Rightarrow Q` and then prove
:math:`Q \Rightarrow P`.

In some domains, proofs are essentially a series of state changes from
a start state to an end state.
Formal predicate logic can be viewed in this way, with the various
"rules of logic" being used to make the changes from one formula or
combining a couple of formulas to make a new formula
on the route to the destination.
Symbolic manipulations to solve integration problems in introductory
calculus classes are similar in spirit, as are high school geometry
proofs.

.. index:: ! proof; by contradiction


Proof by Contradiction
~~~~~~~~~~~~~~~~~~~~~~

The simplest way to *disprove* a theorem or statement is to find
a counter-example to the theorem.
Unfortunately, no number of examples supporting a theorem is
sufficient to prove that the theorem is correct.
However, there is an approach that is vaguely similar to disproving by
counter-example, called :term:`proof by contradiction`.
To prove a theorem by contradiction, we first *assume* that the
theorem is *false*.
We then find a logical contradiction stemming from this assumption.
If the logic used to find the contradiction is correct, then the only
way to resolve the contradiction is to recognize that the assumption
that the theorem is false must be incorrect.
That is, we conclude that the theorem must be true.

.. topic:: Example

   Here is a simple proof by contradiction.

   **Theorem:** There is no largest integer.

   **Proof by contradiction:**

   **Step 1. Contrary assumption:** Assume that there *is* a
   largest integer.
   Call it :math:`B` (for "biggest").

   **Step 2. Show this assumption leads to a contradiction:**
   Consider :math:`C = B + 1`.
   :math:`C` is an integer because it is the sum of two integers.
   Also, :math:`C > B`, which means that :math:`B` is not the
   largest integer after all.
   Thus, we have reached a contradiction.
   The only flaw in our reasoning is the initial assumption that
   the theorem is false.
   Thus, we conclude that the theorem is correct.

A related proof technique is :term:`proving the contrapositive`.
We can prove that :math:`P \Rightarrow Q` by proving
:math:`(\mathrm{not}\ Q) \Rightarrow (\mathrm{not}\ P)`.
This technique works because the :term:`truth table` for the two
logical statements are the same.

.. index:: ! proof; by induction


Proof by Mathematical Induction
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mathematical induction can be used to prove a wide variety of
theorems.
Induction also provides a useful way to think about algorithm design,
because it encourages you to think about solving a problem by building
up from simple subproblems.
Induction can help to prove that a recursive function produces the
correct result.
Understanding recursion is a big step toward understanding induction,
and vice versa, since they work by essentially the same process.

Within the context of algorithm analysis, one of the most important
uses for mathematical induction is as a method to test a hypothesis.
When :ref:`seeking a closed-form solution <closed-form solution> <Summation>`
for a :term:`summation` or :term:`recurrence <recurrence relation>`,
we might first guess or otherwise acquire evidence that a particular
formula is the correct solution.
If the formula is indeed correct, it is often an easy matter to prove
that fact with an induction proof.

Let **Thrm** be a theorem to prove, and express **Thrm** in
terms of a positive integer parameter :math:`n`.
Mathematical induction states that **Thrm** is true for any value
of parameter :math:`n` (for :math:`n \geq c`, where `c` is some
constant) if the following two conditions are true:

#. :term:`Base Case`: **Thrm** holds for :math:`n = c`, and

#. :term:`Induction Step`:
   If **Thrm** holds for :math:`n - 1`, then **Thrm** holds for :math:`n`.

Proving the base case is usually easy, typically requiring that some
small value such as 1 be substituted for :math:`n` in the theorem and
applying simple algebra or logic as necessary to verify the theorem.
Proving the induction step is sometimes easy, and sometimes difficult.
An alternative formulation of the induction step is known as
:term:`strong induction`.
The induction step for strong induction is:

2a. **Induction Step:**
    If **Thrm** holds for all :math:`k, c \leq k < n`, then
    **Thrm** holds for :math:`n`.

Proving either variant of the induction step (in
conjunction with verifying the base case) yields a satisfactory proof
by mathematical induction.

The two conditions that make up the induction proof combine to
demonstrate that **Thrm** holds for :math:`n=2` as an extension of the
fact that **Thrm** holds for :math:`n=1`.
This fact, combined again with condition (2) or (2a), indicates
that **Thrm** also holds for :math:`n=3`, and so on.
Thus, **Thrm** holds for all values of :math:`n` (larger than the
base cases) once the two conditions have been proved.

What makes mathematical induction so powerful (and so mystifying to
most people at first) is that we can take advantage of the
*assumption* that **Thrm** holds for all values less
than :math:`n` as a tool to help us prove that **Thrm** holds
for :math:`n`.
This is known as the :term:`induction hypothesis`.
Having this assumption to work with makes the induction step
easier to prove than tackling the original theorem itself.
Being able to rely on the induction hypothesis provides extra
information that we can bring to bear on the problem.

Recursion and induction have many similarities.
Both are anchored on one or more base cases. 
A recursive function relies on the ability to call itself to get the
answer for smaller instances of the problem.
Likewise, induction proofs rely on the truth of the induction
hypothesis to prove the theorem.
The induction hypothesis does not come out of thin air.
It is true if and only if the theorem itself is true, and
therefore is reliable within the proof context.
Using the induction hypothesis it do work is exactly the same as using
a recursive call to do work.

.. _SumIEx:

.. topic:: Example

   Here is a sample proof by mathematical induction.
   Call the sum of the first :math:`n` positive integers :math:`\mathbf{S}(n)`.

   **Theorem:** :math:`\mathbf{S}(n) = n(n+1)/2`.

   **Proof:**
   The proof is by mathematical induction.

   #. **Check the base case.**
      For :math:`n = 1`, verify that :math:`\mathbf{S}(1) = 1(1+1)/2`.
      :math:`\mathbf{S}(1)` is simply the sum of the first positive
      number, which is 1.
      Because :math:`1(1+1)/2 = 1`, the formula is correct for the base
      case.

   #. **State the induction hypothesis.**
      The induction hypothesis is

      .. math::

         \mathbf{S}(n-1) = \sum_{i=1}^{n-1} i =
         \frac{(n-1)((n-1)+1)}{2} = \frac{(n-1)(n)}{2}.

   #. **Use the assumption from the induction hypothesis for**
      :math:`n-1` **to show that the result is true for** :math:`n`.
      The induction hypothesis states that
      :math:`\mathbf{S}(n-1) =  (n-1)(n)/2`,
      and because :math:`\mathbf{S}(n) = \mathbf{S}(n-1) + n`,
      we can substitute for :math:`\mathbf{S}(n-1)` to get

      .. math::

         \sum_{i=1}^n i &=& \left(\sum_{i=1}^{n-1} i\right) + n
                            = \frac{(n-1)(n)}{2} + n\\
                        &=&\frac{n^2 - n + 2n}{2} = \frac{n(n+1)}{2}.

      Thus, by mathematical induction,

      .. math::

         \mathbf{S}(n) = \sum_{i=1}^n i = n(n+1)/2.

Note carefully what took place in this example.
First we cast :math:`\mathbf{S}(n)` in terms of a smaller occurrence
of the problem: :math:`\mathbf{S}(n) = \mathbf{S}(n-1) + n`.
This is important because once :math:`\mathbf{S}(n-1)` comes into the
picture, we can  use the induction hypothesis to replace
:math:`\mathbf{S}(n-1)` with :math:`(n-1)(n)/2`.
From here, it is simple algebra to prove that
:math:`\mathbf{S}(n-1) + n` equals the 
right-hand side of the original theorem.

We can compare the induction proof of Example :num:`Example #SumIEx`
with the direct proof in Example :num:`Example #SumDirect`.
Different people might think one is easier to understand than the
other, but certainly the writer of the direct proof version had
to discover an insight unique to that problem that might
not be helpful or relevant when proving other summations.

.. _nOdds:

.. topic:: Example

   Here is another simple proof by induction that illustrates
   choosing the proper variable for induction.
   We wish to prove by induction that the sum of the first :math:`n`
   positive odd numbers is :math:`n^2`.
   First we need a way to describe the :math:`n`'th odd number, which is
   simply :math:`2n - 1`.
   This also allows us to cast the theorem as a summation.

   **Theorem:**
   :math:`\sum_{i=1}^n (2i - 1) = n^2`.

   **Proof:**
   The base case of :math:`n = 1` yields :math:`1 = 1^2`, which is
   true. 
   The induction hypothesis is

   .. math::

      \sum_{i=1}^{n-1} (2i - 1) = (n-1)^2.

   We now use the induction hypothesis to show that the theorem
   holds true for :math:`n`.
   The sum of the first :math:`n` odd numbers is simply the sum of the
   first :math:`n-1` odd numbers plus the :math:`n`'th odd number.
   In the second line below, we will use the induction hypothesis to
   replace the partial summation (shown in brackets in the first line)
   with its closed-form solution.
   After that, algebra takes care of the rest.

   .. math::

      \sum_{i=1}^n (2i - 1) &=& \left[ \sum_{i=1}^{n-1} (2i - 1) \right] + 2n - 1\\
                            &=& [(n-1)^2] + 2n - 1\\
                            &=& n^2 - 2n + 1 + 2n - 1\\
                            &=& n^2.

   Thus, by mathematical induction,

   .. math::

      \sum_{i=1}^n (2i - 1) = n^2.

.. _FactRecurProof:

.. topic:: Example

   This example shows how we can use induction to prove that a proposed
   closed-form solution for a recurrence relation is correct.

   **Theorem:**
   The recurrence relation
   :math:`\mathbf{T}(n) = \mathbf{T}(n-1) + 1; \quad \mathbf{T}(1) = 0`
   has closed-form solution :math:`\mathbf{T}(n) = n - 1`.

   **Proof:**
   To prove the base case, we observe from the definition that
   :math:`\mathbf{T}(2) = \mathbf{T}(1) + 1 = 0 + 1 = 1`.
   From the proposed closed-form solution we get
   :math:`\mathbf{T}(2) = 2 - 1 = 1`, which matches the definition.

   The induction hypothesis is that :math:`\mathbf{T}(n-1) = n-2`.
   Combining the definition of the recurrence with the induction
   hypothesis, we see immediately that

   .. math::

      \mathbf{T}(n) = \mathbf{T}(n-1) + 1 = n-2 + 1 = n-1

   for :math:`n > 1`.
   Thus, we have proved the theorem correct by mathematical induction.

.. _ThmStamps:

.. topic:: Example

   This example uses induction without involving summations or other
   equations.
   It also illustrates a more flexible use of base cases.

   **Theorem:**
   2 cent and 5 cent stamps can be used to form any value
   (for values :math:`\geq 4`).

   **Proof:**
   The theorem defines the problem for values :math:`\geq 4`
   because it does not hold for the values 1 and 3.
   Using 4 as the base case, a value of 4 cents can be made from two
   2 cent stamps.
   The induction hypothesis is that a value of :math:`n-1` can be
   made from some combination of 2 cent and 5 cent stamps.
   We now use the induction hypothesis to show how to get the value
   :math:`n` from 2 cent and 5 cent stamps.
   Either the makeup for value :math:`n-1` includes a 5 cent stamp,
   or it does not.
   If so, then replace a 5 cent stamp with three 2 cent stamps.
   If not, then the makeup must have included at least two 2 cent
   stamps (because it is at least of size 4 and contains only 2 cent
   stamps).
   In this case, replace two of the 2 cent stamps with a single
   5 cent stamp.
   In either case, we now have a value of n made up of
   2 cent and 5 cent stamps. 
   Thus, by mathematical induction, the theorem is correct.

.. topic:: Example

   Here is an example using strong induction.

   **Theorem:**
   For :math:`n > 1, n` is divisible by some prime number.

   **Proof:**
   For the base case, choose :math:`n = 2`.
   2 is divisible by the prime number 2.
   The induction hypothesis is that *any* value :math:`a, 2 \leq a < n`,
   is divisible by some prime number.
   There are now two cases to consider when proving the theorem for
   :math:`n`.
   If :math:`n` is a prime number, then :math:`n` is divisible by itself.
   If :math:`n` is not a prime number, then :math:`n = a \times b`
   for :math:`a` and :math:`b`, both integers less than :math:`n` but
   greater than 1. 
   The induction hypothesis tells us that :math:`a` is divisible by some
   prime number.
   That same prime number must also divide :math:`n`.
   Thus, by mathematical induction, the theorem is correct.

Our next example of mathematical induction proves a theorem from
geometry.
It also illustrates a standard technique of induction proof where we
take :math:`n` objects and remove some object to use the
induction hypothesis.

.. _TwoColor:

.. inlineav:: twoColorCON dgm
   :align: center

   A two-coloring for the regions formed by three lines in the plane.

.. _ThmRegion:

.. topic:: Example

   Define a :term:`two-coloring` for a
   set of regions as a way of assigning one of two colors to each region
   such that no two regions sharing a side have the same color.
   For example, a chessboard is two-colored.
   Figure :num:`Figure #TwoColor` shows a two-coloring for the plane
   with three lines. 
   We will assume that the two colors to be used are black and white.

   **Theorem:**
   The set of regions formed by :math:`n` infinite lines in the plane
   can be two-colored.

   **Proof:**

   .. inlineav:: TwoColoringProofCON ss
      :output: show

Compare the proof in Example :num:`Example #ThmRegion` with that in
Example :num:`Example #ThmStamps`.
For Example :num:`Example #ThmStamps`, we took a collection of stamps of
size :math:`n-1` (which, by the induction hypothesis, must have the
desired property) and from that "built" a collection of size :math:`n`
that has the desired property.
We therefore proved the existence of *some* collection of stamps
of size :math:`n` with the desired property.

For Example :num:`Example #ThmRegion` we must prove that *any*
collection of :math:`n` lines has the desired property.
Thus, our strategy is to take an *arbitrary* collection of
:math:`n` lines, and "reduce" it so that we have a set of lines that
must have the desired property because it matches the induction
hypothesis.
From there, we merely need to show that reversing the original
reduction process preserves the desired property.

In contrast, consider what is required if we attempt to
"build" from a set of lines of size :math:`n-1` to one of size
:math:`n`.
We would have great difficulty justifying that *all* possible
collections of :math:`n` lines are covered by our building process.
By reducing from an arbitrary collection of :math:`n` lines to
something less, we avoid this problem.

Another advantage to thinking in terms of "reducing from :math:`n`"
rather than "building up from :math:`n-1`" is that reducing is more
like what we do when we write a recursive function.
In recursion, we would naturally compute some
function of :math:`n` by calling the function (recursively) on
:math:`n-1` and then using the result to compute the value for
:math:`n`.

This section's final example shows how induction can be used to
prove that a recursive function produces the correct result.

.. topic:: Example

   We would like to prove that function ``fact`` does indeed compute
   the factorial function.
   There are two distinct steps to such a proof.
   The first is to prove that the function always terminates.
   The second is to prove that the function returns the correct value.

   **Theorem:**
   Function ``fact`` will terminate for any value of :math:`n`.

   **Proof:**
   For the base case, we observe that ``fact`` will terminate directly
   whenever :math:`n \leq 0`.
   The induction hypothesis is that ``fact`` will terminate for
   :math:`n-1`.
   For :math:`n`, we have two possibilities.
   One possibility is that :math:`n \geq 12`.
   In that case, ``fact`` will terminate directly because it will
   fail its assertion test.
   Otherwise, ``fact`` will make a recursive call to ``fact(n-1)``.
   By the induction hypothesis, ``fact(n-1)`` must terminate.

   **Theorem:**
   Function ``fact`` does compute the factorial function for any value 
   in the range 0 to 12.

   **Proof:**
   To prove the base case, observe that when :math:`n=0` or
   :math:`n=1`, `fact(n)` returns the correct value of 1.
   The induction hypothesis is that ``fact(n-1)`` returns the correct
   value of `(n-1)!`.
   For any value `n` within the legal range, ``fact(n)`` returns
   :math:`n *` ``fact(n-1)``.
   By the induction hypothesis, ``fact(n-1)`` :math:`= (n-1)!`,
   and because :math:`n * (n-1)! = n!`, we have proved that ``fact(n)``
   produces the correct result.

We can use a similar process to prove many recursive programs correct.
The general form is to show that the base cases perform correctly, and 
then to use the induction hypothesis to show that the recursive step
also produces the correct result.
Prior to this, we must prove that the function always terminates,
which might also be done using an induction proof.

.. odsascript:: AV/Background/twoColorCON.js
.. odsascript:: AV/Background/TwoColoringProofCON.js
