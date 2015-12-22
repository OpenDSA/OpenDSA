.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: Limits to Computing
   :satisfies: uncomputable problems
   :topic: Limits to Computing

Unsolveable Problems
====================

Introduction
~~~~~~~~~~~~

Even the best programmer sometimes writes a program that goes into an
infinite loop.
Of course, when you run a program that has not stopped, you do not
know for sure if it is just a slow program or a program in an infinite
loop.
After "enough time", you shut it down.
Wouldn't it be great if your compiler could look at your program and
tell you before you run it that it will get into an infinite loop?
To be more specific, given a program and a particular input, it would
be useful to know if executing the program on that input will result
in an infinite loop without actually running the program.

Unfortunately, the :term:`Halting Problem`, as this is called, cannot
be solved.
There will never be a computer program that can positively determine,
for an arbitrary program :math:`P`, if :math:`P`
will halt for all input.
Nor will there even be a computer program that can positively
determine if arbitrary program :math:`P` will halt for a specified
input :math:`I`.
How can this be?
Programmers look at programs regularly to determine if they will
halt.
Surely this can be automated.
As a warning to those who believe any program can be analyzed in this
way, carefully examine the following code fragment before reading on.

.. codeinclude:: Misc/Collatz
   :tag: Collatz

This is a famous piece of code.
The sequence of values that is assigned to :math:`n` by this code is
sometimes called the :term:`Collatz sequence` for input value
:term:`n`.
Does this code fragment halt for all values of :math:`n`?
Nobody knows the answer.
Every input that has been tried halts.
But does it always halt?
Note that for this code fragment, because we do not know if it halts,
we also do not know an upper bound for its running time.
As for the lower bound, we can easily show
:math:`\Omega(\log n)`.

.. TODO::
   :type: Exercise

   Need an exercise to study lower bound on Colletz function

Personally, I have faith that someday some smart person will
completely analyze the Collatz function, proving once and for all
that the code fragment halts for all values of :math:`n`.
Doing so may well give us techniques that advance our ability to do
algorithm analysis in general.
Unfortunately, proofs from :term:`computability` |---| the branch of
computer science that studies what is impossible to do with a computer
&mdash; compel us to believe that there will always be another
bit of program code that we cannot analyze.
This comes as a result of the fact that the Halting Problem is
unsolvable.

Uncountability
~~~~~~~~~~~~~~

Before proving that the Halting Problem is unsolvable, we first prove
that not all functions can be implemented as a computer program.
This must be so because the number of programs is much smaller than
the number of possible functions.

A set is said to be :term:`countable` (or :term:`countably infinite`
if it is a set with an infinite number of members)
if every member of the set can be uniquely assigned to a positive
integer.
A set is said to be :term:`uncountable`
(or :term:`uncountably infinite`) if it is not possible to 
assign every member of the set to its own positive integer.

To understand what is meant when we say "assigned to a positive
integer", imagine that there is an infinite row of bins, labeled 1,
2, 3, and so on.
Take a set and start placing members of the set into bins, with at
most one member per bin.
If we can find a way to assign all of the set members to bins, then the
set is countable.
For example, consider the set of positive even integers 2, 4, and so
on.
We can assign an integer :math:`i` to bin :math:`i/2`
(or, if we don't mind skipping some bins, then we can assign even
number :math:`i` to bin :math:`i`). 
Thus, the set of even integers is countable.
This should be no surprise, because intuitively there are "fewer"
positive even integers than there are positive integers,
even though both are infinite sets.
But there are not really any more positive integers than
there are positive even integers, because we can uniquely assign every
positive integer to some positive even integer by simply assigning
positive integer :math:`i` to positive even integer :math:`2i`.

On the other hand, the set of all integers is also countable, even
though this set appears to be bigger than the set of positive
integers.
This is true because we can assign 0 to positive integer 1, 1 to
positive integer 2, -1 to positive integer 3, 2 to positive integer 4,
-2 to positive integer 5, and so on.
In general, assign positive integer value :math:`i` to positive
integer 
value :math:`2i`, and assign negative integer value :math:`-i` to
positive integer value :math:`2i+1`.
We will never run out of positive integers to assign, and we know
exactly which positive integer every integer is assigned to.
Because every integer gets an assignment, the set of integers is
countably infinite.

Are the number of programs countable or uncountable?
A program can be viewed as simply a string of characters (including
special punctuation, spaces, and line breaks).
Let us assume that the number of different characters that can appear
in a program is :math:`P`.
(Using the ASCII character set, :math:`P` must be less than 128,
but the actual number does not matter).
If the number of strings is countable, then surely the number of
programs is also countable.
We can assign strings to the bins as follows.
Assign the null string to the first bin.
Now, take all strings of one character, and assign them to the next
:math:`P` bins in "alphabetic" or ASCII code order.
Next, take all strings of two characters, and assign them to the next
:math:`P^2` bins, again in ASCII code order working from left to
right.
Strings of three characters are likewise assigned to bins, then
strings of length four, and so on.
In this way, a string of any given length can be assigned
to some bin.

By this process, any string of finite length is assigned
to some bin.
So any program, which is merely a string of finite length, is
assigned to some bin.
Because all programs are assigned to some bin, the set of all programs
is countable.
Naturally most of the strings in the bins are not legal programs, but
this is irrelevant.
All that matters is that the strings that **do**, correspond to
programs are also in the bins.

Now we consider the number of possible functions.
To keep things simple, assume that all functions take a single
positive integer as input and yield a single positive integer as
output.
We will call such functions :term:`integer functions`.
A function is simply a mapping from input values to output values.
Of course, not all computer programs literally take integers as input
and yield integers as output.
However, everything that computers read and write is
essentially a series of numbers, which may be interpreted as letters
or something else.
Any useful computer program's input and output can be coded as integer
values, so our simple model of computer input and output is
sufficiently general to cover all possible computer programs.

We now wish to see if it is possible to assign all of the integer
functions to the infinite set of bins.
If so, then the number of functions is countable, and it might then be
possible to assign every integer function to a program.
If the set of integer functions cannot be assigned to bins, then
there will be integer functions that must have no corresponding program.

Imagine each integer function as a table with two columns and an
infinite number of rows.
The first column lists the positive integers starting at 1.
The second column lists the output of the function when given the value
in the first column as input.
Thus, the table explicitly describes the mapping from input to output
for each function.
Call this a :term:`function table`.

Next we will try to assign function tables to bins.
To do so we must order the functions, but it does not matter what
order we choose.
For example, Bin 1 could store the function that always returns 1
regardless of the input value.
Bin 2 could store the function that returns its input.
Bin 3 could store the function that doubles its input and adds 5.
Bin 4 could store a function for which we can see no simple
relationship between input and output. [#]_
These four functions as assigned to the first four bins are shown in
Figure :num:`Figure #FuncAssign`.

.. _FuncAssign:

.. odsafig:: Images/FuncBin.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: An illustration of assigning functions to bins

   An illustration of assigning functions to bins.

Can we assign every function to a bin?
The answer is no, because there is always a way to create a new
function that is not in any of the bins.
Suppose that somebody presents a way of assigning functions to bins
that they claim includes all of the functions.
We can build a new function that has not been assigned to any bin, as
follows.
Take the output value for input 1 from the function in the first bin.
Call this value :math:`F_1(1)`.
Add 1 to it, and assign the result as the output of a new
function for input value 1.
Regardless of the remaining values assigned to our new function, it
must be different from the first function in the table, because the
two give different outputs for input 1.
Now take the output value for 2 from the second function in the table
(known as :math:`F_2(2)`).
Add 1 to this value and assign it as the output for 2 in our new
function.
Thus, our new function must be different from the function of Bin 2,
because they will differ at least at the second value.
Continue in this manner, assigning :math:`F_{new}(i) = F_i(i) + 1` for
all values :math:`i`.
Thus, the new function must be different from any function :math:`F_i`
at least at position :math:`i`.
This procedure for constructing a new function not already in the
table is called :term:`diagonalization`.
Because the new function is different from every other function, it
must not be in the table.
This is true no matter how we try to assign functions to
bins, and so the number of integer functions is uncountable.
The significance of this is that not all functions can possibly be
assigned to programs, so there **must** be functions with no
corresponding program.
Figure :num:`Figure #Diag` illustrates this argument.

.. _Diag:

.. odsafig:: Images/FuncDiag.png
   :width: 300
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Illustration for function uncountability

   Illustration for the argument that the number of integer functions
   is uncountable.

The Halting Problem Is Unsolvable
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

There might be intellectual appeal to knowing
that there exists **some** function that cannot be computed by a
computer program
But does it really matter if no program can compute a
"nonsense" function such as the one shown in Bin 4 of
Figure :num:`Figure #FuncAssign`?
That alone doesn't have to mean that there is a **useful** function
that cannot be computed.
After all, the universe should not be this perverse, should it?
Perhaps the very fact that we can easily specify the function that we
want to compute implies that there must be an algorithm to compute
it.

Unfortunately, not so.
Now we will prove that the Halting Problem cannot be computed by any
computer program.
The proof is by contradiction.

We begin by assuming that there is a function named ``halt`` that
can solve the Halting Problem.
Obviously, it is not possible to write out something that does not
exist, but here is a plausible sketch of what a function to solve the
Halting Problem might look like if it did exist.
Function ``halt`` takes two inputs: a string representing the
source code for a program or function, and another string
representing the input that we wish to determine if the input program
or function halts on.
Function ``halt`` does some work to make a decision (which is
encapsulated into some fictitious function named ``PROGRAM_HALTS``).
Function ``halt`` then returns TRUE if the input program or
function does halt on the given input, and FALSE otherwise.

::

   bool halt(String prog, String input) {
     if (PROGRAM_HALTS(prog, input))
       return true;
     else
       return false;
   }

We now will examine two simple functions that clearly can exist
because the complete code for them is presented here.

::

   // Return true if "prog" halts when given itself as input
   bool selfhalt(String prog) {
     if (halt(prog, prog))
       return true;
     else
       return false;
   }

   // Return the reverse of what selfhalt returns on "prog"
   void contrary(String prog) {
     if (selfhalt(prog))
       while (true); // Go into an infinite loop
   }

What happens if we make a program whose sole purpose is to execute
the function ``contrary`` and run that program with itself as
input?
One possibility is that the call to ``selfhalt`` returns ``TRUE``;
that is, ``selfhalt`` claims that ``contrary`` will halt when run on
itself.
In that case, ``contrary`` goes into an infinite loop
(and thus does not halt).
On the other hand, if ``selfhalt`` returns FALSE, then
``halt`` is proclaiming that ``contrary`` does not halt on itself,
and  ``contrary`` then returns, that is, it halts.
Thus, ``contrary`` does the contrary of what
``halt`` says that it will do.

The action of ``contrary`` is logically inconsistent with the
assumption that ``halt`` solves the Halting Problem correctly.
There are no other assumptions we made that might cause this
inconsistency.
Thus, by contradiction, we have proved that ``halt`` cannot
solve the Halting Problem correctly, and thus there is no program that
can solve the Halting Problem.

Now that we have proved that the Halting Problem is unsolvable, we
can use reduction arguments to prove that other problems are also
unsolvable.
The strategy is to assume the existence of a computer program that
solves the problem in question and use that program to solve another
problem that is already known to be unsolvable.

.. topic:: Example

   Consider the following variation on the Halting Problem.
   Given a computer program, will it halt when its input is the
   empty string?
   That is, will it halt when it is given no input?
   To prove that this problem is unsolvable, we will employ a standard
   technique for computability proofs:
   Use a computer program to modify another computer program.

   **Proof by contradiction:**

   Assume that there is a function ``Ehalt`` that determines
   whether a given program halts when given no input.
   Recall that our proof for the Halting Problem involved functions
   that took as parameters a string representing a program and another
   string representing an input.
   Consider another function ``combine`` that takes a program
   :math:`P` and an input string :math:`I` as parameters.
   Function ``combine`` modifies :math:`P` to store :math:`I`
   as a static variable :math:`S` and further modifies all calls
   to input functions within :math:`P` to instead get their input from
   :math:`S`.
   Call the resulting program :math:`P'`.
   It should take no stretch of the imagination to believe that any
   decent compiler could be modified to take computer programs and
   input strings and produce a new computer program that has been
   modified in this way.
   Now, take :math:`P'` and feed it to ``Ehalt``.
   If ``Ehalt`` says that :math:`P'` will halt, then we know that
   :math:`P` would halt on input :math:`I`.
   In other words, we now have a procedure for solving the original
   Halting Problem.
   The only assumption that we made was the existence of ``Ehalt``.
   Thus, the problem of determining if a program will halt on no input
   must be unsolvable.

.. topic:: Example

   For arbitrary program :math:`P`, does there exist **any** input for
   which :math:`P` halts?

   **Proof by contradiction:**

   This problem is also uncomputable.
   Assume that we had a function ``Ahalt`` that, when given program 
   :math:`P` as input would determine if there is some input for which
   :math:`P` halts.
   We could modify our compiler (or write a function as part of a
   program) to take :math:`P` and some input string :math:`w`, and
   modify it so that :math:`w` is hardcoded inside :math:`P`,
   with :math:`P` reading no input.
   Call this modified program :math:`P'`.
   Now, :math:`P'` always behaves the same way regardless of its
   input, because it ignores all input.
   However, because :math:`w` is now hardwired inside of :math:`P'`,
   the behavior we get is that of :math:`P` when given :math:`w` as
   input.
   So, :math:`P'` will halt on any arbitrary input if and only if
   :math:`P` would halt on input :math:`w`.
   We now feed :math:`P'` to function ``Ahalt``.
   If ``Ahalt`` could determine that :math:`P'` halts on some
   input, then that is the same as determining that :math:`P` halts on
   input :math:`w`.
   But we know that that is impossible.
   Therefore, ``Ahalt`` cannot exist.

There are many things that we would like to have a computer do
that are unsolvable.
Many of these have to do with program behavior.
For example, proving that an arbitrary program is "correct", that
is, proving that a program computes a particular function, is a proof
regarding program behavior.
As such, what can be accomplished is severely limited.
Some other unsolvable problems include:

*  Does a program halt on every input?

*  Does a program compute a particular function?

*  Do two programs compute the same function?

*  Does a particular line in a program get executed?

This does **not** mean that a computer program cannot be written
that works on special cases, possibly even on most programs that we
would be interested in checking.
For example, some C compilers will check if the control expression
for a ``while`` loop is a constant expression that evaluates to
``FALSE``.
If it is, the compiler will issue a warning that the ``while``
loop code will never be executed.
Programmers find this special case useful enough to make it worth
including in the compiler.
However, it is not possible to write a computer program that can
check for <em>all</em> input programs whether a specified line of code
will be executed when the program is given some specified input.

Another unsolvable problem is whether a program contains a computer
virus.
The property "contains a computer virus" is a matter of behavior.
Thus, it is not possible to determine positively whether an arbitrary
program contains a computer virus.
Fortunately, there are many good heuristics for determining if a
program is likely to contain a virus, and it is usually possible to
determine if a program contains a particular virus, at least for the
ones that are now known.
Real virus checkers do a pretty good job,
but, it will always be possible for malicious people to invent new
viruses that no existing virus checker can recognize.

.. [#] There is no requirement for a function to have any discernible
       relationship between input and output.
       A function is simply a mapping of inputs to outputs, with no
       constraint on how the mapping is determined.
