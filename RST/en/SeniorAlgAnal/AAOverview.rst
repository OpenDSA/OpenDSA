.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Introduction

Semester Overview
=================

Introduction
------------

The central question for this course is:
**Given a problem, do we have (or can we devise) a good solution?**
Everything that we will do is connected to this central question in some
way.
Here "good" will usually be taken to mean "as efficient as the problem
will allow".

If we have a problem and a proposed solution, then we need a mechanism
that will let us assess whether that solution is good or not.
This is where algorithm analysis comes in.
This module is not a review of basic algorithm analysis.
It is a reconstruction of the basic concept, from the ground up.
Your prior study of algorithm analysis probably focussed on how to
analyze a given program or algorithm.
We will certainly do that during the course.
But in this module, we will focus on the question of how algorithm
analysis helps us to answer our central question.

This discussion assumes that you are roughly familiar with basic
:term:`algorithm analysis` terms and concepts.
These include definitions for the terms :term:`problem` versus
:term:`algorithm` versus :term:`program`.
These include the concepts of
:term:`upper bounds <upper bound>`,
:term:`lower bounds <lower bound>`,
:term:`growth rate`, :term:`best case`, :term:`worst case`,
:term:`average case`, :term:`big-oh notation`,
:term:`Omega notation`, and :term:`Theta notation`.
Review any of this material as necessary before continuing.

Our problems must be well-defined enough to be solved on computers.
(Actually, to solve a problem we need more than just a clear
definition. By the end of the semester, we will discuss problems that
are not computable (i.e., cannot be solved) even though their
definition is clear.)

A :term:`problem` is a :term:`function`
(i.e., a mapping of inputs to outputs).
We have different :term:`problem instances <problem instance>`
(inputs) for the problem, where each instance has a size.
To solve a problem, we must provide an algorithm, a coding
of problem instances into inputs for the algorithm, and a coding for
outputs into solutions.

An :term:`algorithm` executes the mapping.
A proposed algorithm must work for ALL instances
(give the correct mapping to the output for that input instance).
(Actually, we will relax this restriction later when we talk about 
Approximation and Probabilistic algorithms.)

Our goal is to solve problems with as little computational effort per
instance as possible.
We are most often interested in solutions to "large" instances
of the problem (asymptotic Analysis).
Occasionally we are concerned with small instances.
Then, constants matter.

Ultimately, we want to solve a :term:`problem` by using an efficient
:term:`programs <program>`.
But it is not a good idea to start by writing programs and then
comparing them.
We don't want to spend a lot of time writing worthless programs.
We want a way to decide if the program is worth writing in
the first place.
So, we will really spend most of our time looking at
:term:`algorithms <algorithm>` instead of programs, and using
:term:`algorithm analysis` to evaluate the algorithms.

Algorithm analysis is essentially an exercise in modeling.
A :term:`model` is a simplification of reality that preserves only the
essential elements.
With a model, we can more easily focus on and reason about these
essentials.

Our primary tactical concern for the semester will be how to recognize
if an algorithm is efficient or not.
We will need (and so will study) a lot of mathematical tools for this.
Your primary tools will be :term:`summations <summation>` and
:term:`recurrence relations <recurrence relation>`.
Given the nature of many of our algorithms, we need to develop a lot
of proficiency using logarithms.


Modeling Algorithm Cost
-----------------------

We want to measure the cost of an algorithm.
We want this process to be as simple as possible.
We need a yardstick to define the "cost" of the algorithm.
Qualities for this yardstick are:

   * It should measure something that we care about.
     Usually we care about time, but not always.
   * It should by quantitative, allowing comparisons.
   * It should be easy to compute (the measure, not the algorithm).
   * It should be a good predictor of what a corresponding program
     would actually cost.

The fundamental driver for algorithm analysis is the behavior (growth
rate) of a the algorithm as the problem size grows.
Just to complicate things: Algorithms can behave very different on
different inputs of a given size.
The concepts of best, average, and worst cases come in here.
To have a meaningful discussion about the behavior of an algorithm, we
have to agree in advance about **which** of the many behaviors that
algorithm might have in terms of its growth rate as the input size
grows.

To model the growth rate of an algorithm, we need:

   * A measure for problem size.
   * A measure for solution effort.
      * We use a count of the :term:`basic operations <basic operation>`
        as a measure of solution effort.

To get a measurement, either for the problem size or the solution
effort, we have to have a :term:`cost model`.
Here is a simple example.
Assume that our problem is how to square a value.
We will accept as our input size the value that we want to square.
(Later on, we will actually come to realize that this is actually a
lousy way to model input size for a numeric problem, but it will do
for now.)

Here is an example of a model for a cost measure.
Like any model, it might or might not be a **good** model.
Look back at the list of qualities for a good model, and think about
whether this example has those qualities or not as you read through
it.

Our problem is to calculate the square of a number.

We will model the input size as simply the value of the number.
(Later we will come to realize that this is a lousy model for the
input size of a numeric problem. But its good enough for now.)

To model the cost of the solution, we will assume that
asigning to a variable takes fixed time.
We will also assume that all other operations take no time.
(Is this a good model? Whether it is good or not, it **is** a model.)

Algorithm 1::

   sum = n*n;

One assignment was made, so the cost is 1.
Is this a good model for our intuitive notion of the cost for this
code fragment?
Most people would consider this a reasonable estimate of the work done
for most purposes.
So it looks like a reasonable model.

Algorithm 2::

   sum = 0;
   for (i=1; i<=n; i++)
     sum = sum + n;

The number of assignments made is

.. math::

   1 + \sum_{i=1}^{n} 1 = n + 1

Now, there is a lot of room for quibbling here.
Depending on how you want to deal with loop variables,
you might want to say that the number of assignments is
:math:`2n + 1`.
This makes a difference of :math:`n+1` vs :math:`2n+1`.
Does it matter?
Not so much.
We didn't know the exact amount of time for an operation
to begin with, so the factor of 2 doesn't seem to mean much.
What is important is that the growth rates of these two are the same.
In fact, this is the key consideration.
Perhaps we are concerned about whether an assignment is the same in
real runtime cost as a multiplication, which might be different from
an addition.
Maybe incrementing a loop variable costs something different from
doing an ordinary assignment.
But really none of this matters when compared against the fundamental
recognition that the cost of this algorithm is proportional to the
input size (in this case, the value of the input variable).
:math:`n+1` and :math:`2n+1` both have linear growth rate,
so they are both equally predictive of the growth rate for the
algorithm.
If we all agree that this approch to squaring a number has a linear
growth rate on the size of the number, then we can conclude that this
is a reasonable model for the purpose of estimating the growth rate.

Algorithm 3::

   sum = 0;
   for (i=1; i<=n; i++)
     for (j=1; j<=n; j++)
       sum = sum + 1;

The number of assignments made is:

.. math::

   1 + \sum_{i=1}^{n} \sum_{j=1}^n 1 = n^2 + 1

Again, this is a reasonable model for the cost of this algorithm.

Now, given three algorithms, and with a model in hand for measuring
their costs, the next question is:
Which of these three algorithms is best (meaning, requires the
least amount of work to run)?
Obviously we consider the first to be best in this sense.

In comparison to the above example, consider a problem that involves
string assignment (done by copying the characters in the string).
In this case, is our model that assignment has contant time cost still
good?
Think about this.

As another example of modeling:
Consider a problem that works on a list, and an important basic
operation is accessing the :math:`i\mathrm{th}` record on the list.
We can take as our model that such an access requires one unit of
work.
If the list is implemented using an array in memory, then we probably
consider this to be a "reasonable" model.
If the list is implemented using a singly linked list, then we
probably do **not** consider this to be a "reasonable" model.
(Why?)


Big Issues
----------

**How do we create an efficient algorithm?**
We use problem solving and algorithm design skills.
This semester, we will see some standard algorithm design techniques.
One good example of such a design technique that works for a lot of
problems is :term:`dynamic programming`.

**How do we recognize a "good" algorithm?**
This is a key issue, because we don't know whether to stop with trying
to create a "good" algorithm unless we can recognize one.
Our answer is: By the relationship of its performance to the intrinsic
difficulty of the problem.
Of course, that requires a measure for the algorithm's performance and
a measure for the intrinsic difficulty of the problem.

**How "hard" is a problem?**
That is, what is its intrinsic difficulty?
This is where the concept of the :term:`lower bound` for a problem
comes in.
For now, we will restrict the term "hard" to mean "How much does it
cost to run?"
Later, we will talk about some different meanings for the term "hard".

As we go through a series of problems this semester, we will use the
following general plan:

   * Define a PROBLEM.
   * Build a MODEL to measure the size of the input, and the cost of a
     solution to the problem.
   * Design an ALGORITHM to solve the problem.
   * ANALYZE both problem and algorithm under the model.
      * Analyze an algorithm to get an UPPER BOUND.
      * Analyze a problem to get a LOWER BOUND.
   * COMPARE the bounds to see if our solution is "good enough".

If the two bounds that we compute do not match, then here are some
options:

   * Redesign the algorithm, or invent a new one.
   * Tighten the bounds (if they were not already tight).
   * Change the model.
   * Change the problem.
