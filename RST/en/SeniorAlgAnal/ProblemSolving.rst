.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: DSA Introduction
   :topic: Introduction

An Introduction to Problem Solving
==================================

Getting Started
---------------

This document presents a brief overview of selected material from four
textbooks (see [FL95, Lev94, WL99, Zei07] in the bibliography).
Reading any of these books should help you to become a better 
problem solver.

To successfully solve any problem, the most important issue to get
actively involved.
Levine [Lev94] calls this "The Principle of Intimate Engagement".
Writers on problem solving often use terms like "roll up your sleeves"
and "get your hands dirty".
It means actively engaging with the problem, and doing some work to
get it done.
For easier problems, you will "see" an answer fairly quickly 
once you actively engage, and the issue then is to work through to
completion.
For most problems, the ones matter most, you won't "see" an answer
right away.
For these problems, you will have to use various strategies to come up
with a potential solution for even getting started.

Problem solvers can be categorized as either "engagers" or
"dismissers".
Engagers typically have a history of success with problem solving.
Dismissers have a history of failure.
Of course, you might be an engager for one type of problem,
and a dismisser for another.
Many students do significant problem solving for recreation |---|
Sodoku puzzles, computer games with meaningful problem solving tasks,
and all sorts of "puzzles".
They might spend hours engaged with "interesting" problems. 
Yet, these same students might dismiss math and analytical computer
science problems due to a historical lack of success.
If you have this problem, then to be successful in life you will
need to find ways to get over what is obviously a mental block.
You need to learn to transfer successful problem-solving strategies
from one part of your life to other parts.

Levine uses examples of trying to repair a clothes dryer or a wobbly
table.
How to solve the problem might not be immediately obvious.
The first step is to take the effort to look at the problem.
In this example, it starts by opening the back of the dryer, or
looking under the table.
This initial investigation can often lead to a solution.
It is a matter of adopting the mental attitude of being willing to
take the risk and the effort.
Then it is a matter of working with the problem for awhile to see what
can be done. At that point, a possible solution path might open
up.
But nothing can be solved unless you are willing to take the time and
make the effort.
All of the heuristics for solving problems start with that.

Fogler and LeBlanc [FL95] discuss the differences between effective and
ineffective problem solvers.

   The most important factors that distinguish between ineffective and
   effective problem solvers are the attitudes with which they
   approach the problem, their aggressiveness in the problem-solving
   process, their concern for accuracy, and the solution procedures
   they use.
   For example, effective problem solvers believe that problems can be
   solved through the use of heuristics and careful persistent
   analysis, while ineffective problem solvers think, "You either know
   it or you don't".

   Effective problem solvers become very active in the problem-solving
   process:
   They draw figures, make sketches, and ask questions of themselves
   and others.
   Ineffective problem solvers don't seem to understand the level of
   personal effort needed to solve the problem. 
   Effective problem solvers take great care to understand all the
   facts and relationships accurately.
   Ineffective problem solvers make judgments without checking for
   accuracy...
   By approaching a situation using the characteristic attitudes and
   actions of an effective problem solver, you will be well on your
   way to finding the real problem and generating an outstanding
   solution.


Investigation and Argument
--------------------------

Problem solving has two parts [Zei07]: the investigation and the
argument.
Students are too used to seeing only the argument in their textbooks
and lectures.
Unfortunately, to be successful in school (and in life after school),
one needs to be good at both, and to understand the differences
between these two phases of the process.
To solve the problem, you must investigate successfully. 
Then, to give the answer to your client (solution on homework or exam,
or report to boss), you need to be able to make the argument in a way
that gets the solution across clearly and succinctly.
The argument phase involves good technical writing skills |---| the
ability to make a clear, logical argument.
Understanding standard proof techniques can help you.
The three most-used proof techniques are deduction (direct proof),
contradiction, and induction.


Heuristics for Problem Solving "In the Small"
---------------------------------------------

**Write it down**
After motivation and mental attitude, the most important limitation on
your ability to solve problems is biological:
While you have lots of storage capacity, your "working memory" is
tiny.
For active manipulation, you can only store :math:`7\pm 2`
pieces of information.
You can't change this biological fact.
All you can do is take advantage of your environment to get around it.
That means, you must put things into your environment to manipulate
them.
Most often, that translates to writing things down, and doing it in a
way that lets you manipulate aspects of the problem (correct
representation).

**Look for special features**
Examples include cryptogram addition problems.
You might recognize that something on one end must be a 1,
in other circumstances one of the numbers must be a zero.
Consider the following cryptogram puzzle where you must replace the
letters with numbers to make a legal addition problem.
In this case, we should recognize two special features:
(1) The leading digit of the answer must be a one, and
(2) One of the right most digits must be a zero.
Recognizing these special features puts us well on the way to solving
the full problem.

::

     A D
   + D I
   -----
   D I D

**Go to the extremes**
Study boundary conditions of the problem.
For lots of problems, it helps to start with the small cases, which
are one form of boundary condition.

**Simplify**
A version of going to extremes is to simplify the problem.
This might give a partial solution that can be extended to the
original problem.

**Penultimate step**
What precondition must take place before the final solution step is
possible?
If you recognize this, then getting to the penultimate step leads to
the final solution, and solving the penultimate problem might be
easier.
Towers of Hanoi gives an excellent example of finding a
solution from looking at the penultimate step.

**Lateral thinking**
Be careful about being lead into a blind alley.
Using an inappropriate problem-solving strategy might blind you to the
solution.

**Get your hands dirty**
Sometimes you need to just "play around" with the problem to get some
initial insight.
For example, when trying to see the closed form solution to a
summation, its often a good place to start writing the first few sums
down.

**Wishful thinking**
A version of simplifying the problem.
Sometimes you can transform the problem into something easy, or see
how to get the start position to something that you could "wish" was
the solution.
That might be a smaller step to the actual solution. 

**Symmetry**
Look for symmetries in the problem.
They might give clues to the solution.


Problem Solving "In the Large"
------------------------------

There are lots of standard techniques for solving larger and messier
"real-world" problems (the type of problems often encountered by
engineers in their professional lives).
Fogler and LeBlanc [FL95] discuss such techniques in detail.
Here is a brief outline of an overall process for disciplined problem
solving of "real world" problems.

**Problem Definition**
The client for a problem will often not state it in the correct
way.
Your first step toward solution is often to define the "real" problem
that needs to be solved.
It might not be obvious what this is.
To get at the "real" problem, you will need to begin by studying it,
collecting information about it, and talking to people familiar with
the problem.
You might consider restating the problem in a number of ways.
Define the desired state.
Then make restatements of the current problem formulation that can
trigger new insights.
Consider looking at the problem statement by making the opposite
statement.
Alternatively, perhaps we can change the surrounding situation such
that the current problem can be "made OK" rather than solved
directly.

**Generate solutions**
Once you have settled on a problem statement, you need to generate and
analyze a range of possible solutions.
Blockbusting and brainstorming techniques can generate a
list of possible solutions to study.

**Decide the Course of Action**
There are a number of standard techniques for select from a given
list of potential actions
(e.g., situation analysis, Pareto analysis, K.T. Problem analysis,
decision analysis).

**Implement the Solution**
Getting approval may be the necessary first step to implementation.
Once that is taken care of, again there are a number of standard
techniques for planning implementations
(e.g., Gannt charts, critical path analysis).

**Evaluation**
Evaluation should be built into all phases of the problem solving
process.


Pairs Problem Solving
---------------------

Whimbey & Lochhead [WL99] discuss a technique for pair problem solving
that separates the pair into a solver and a listener.
The listener plays an active role, being responsible for keeping the
problem solver on track and requiring the problem solver to vocalize
his or her process.
The listener is actively checking for errors by the problem solver.
See the handout for more details on this.


Errors in Reasoning
-------------------

Again from Whimbey & Lochhead [WL99] comes a description of how people
go wrong in problem solving.
Specifically related to homework and tests, typical problems stem from
failing to read the problem carefully.
Thus, students will often fail to use all relevant facts, or plain
mis-interpret the problem.
Other typical mistakes come from failing to be systematic, or worse
yet being just plain careless.
All of this indicates that many of the points lost by students on
tests and homeworks are not caused by "not knowing the material", but
rather are caused by not executing problem solving effectively.
Those are points that don't need to be lost.

Comprehension in reading is a major factor to success.
Proper comprehension of technical material requires careful reading,
and often re-reading.
There is no such thing as speed reading with comprehension.
The mythology of the speed reading advocates,
such as "read in thought groups", "skim for concepts", and "don't
re-read", are all ineffective.

References
----------

[FL95] H. Scott Fogler and Steven E. LeBlanc.
Strategies for Creative Problem Solving.
Prentice Hall, 1995.

[Lev94] Marvin Levine.
Effective Problem Solving.
Prentice Hall, second edition, 1994.

[WL99] Arthur Whimbey and Jack Lochhead.
Problem Solving & Comprehension.
Lawrence Erlbaum Associates, sixth edition, 1999.

[Zei07] Paul Zeitz.
The Art and Craft of Problem Solving.
John Wiley & Sons, second edition, 2007.
