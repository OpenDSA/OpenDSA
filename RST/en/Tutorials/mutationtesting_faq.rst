.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Rifat Sabbir Mansur and Cliff Shaffer
   :topic: Mutation testing

Mutation Coverage: FAQ
======================

Frequently Asked Questions
--------------------------

What is Mutation Testing and why should I use it?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mutation testing is a powerful technique for improving the quality of
your test suite.
The primary purpose of mutation testing is to evaluate the
effectiveness of your tests with respect to your program implementation.
It does not directly find bugs in your program.
But if you know where your tests are not looking, it gives a powerful
tool to see where bugs could hide.

Mutation testing works by introducing small changes, or "mutations",
into your code and then running your test suite against the revised code.
If all your tests still pass after a mutation, that's a sign that your
tests do not care about the outcome of the code that was changed.
In other words, the tests are not checking whether that part of the
code has a bug.

Mutation testing can help in writing better code, and it does so in
several ways:

 - **Increases Test Coverage**: Mutation testing helps identify the
   parts of the code that are not well-tested. When a mutation
   survives, it indicates that there is a gap in the test coverage. By
   striving to kill all mutants, developers are encouraged to write
   more comprehensive tests, which can lead to better, more robust
   code.

 - **Detects Unneeded Code**: If a mutation does not lead to a
   failing test, one possibility is that the code in question is not
   necessary for the correct function of the program.
   This could help you identify and remove dead or redundant code.

 - **Improves Test Quality**: Mutation testing doesn't just
   increase the quantity of your tests, it also improves their
   collective quality.
   By generating mutants, mutation testing pinpoints where you need
   new test cases.

 - **Encourages Simpler Design**: When working with mutation testing,
   it often becomes clear that complex code generates more mutants and
   is therefore harder to test.
   This should encourage developers to keep their code as simple and
   straightforward as possible, which generally leads to higher
   quality code.

 - **Exposes Assumptions**: Mutation testing can expose
   the assumptions made while writing the code and the tests.
   If a mutant survives, it might mean that the assumption under which
   you wrote the test was not correct or comprehensive.

 - **Increases Confidence**: By striving for a high mutation score,
   you can gain more confidence that your code is well-tested and free
   of obvious bugs.
   This can make it safer to refactor or add new features to the
   codebase.
   A number of empirical studies have shown that mutants are coupled
   to real faults/bugs and that Mutation Testing is positively
   correlated with real fault detection (which is not so true for the
   Code Coverage metric for test suites).
   Therefore, a high mutation score can be a good indicator
   of the quality of your code.


Does 100% Mutation Score mean 100% Project Correctness?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mutation Score and Project Correctness are two different metrics.
Mutation Score is a measure of the effectiveness of your tests,
while Project Correctness is a measure of the correctness of
your code.
Having a 100% Mutation Score does NOT ensure that your
Project Correctness will be 100%.
Consider this: You can have 100% Mutation Score on Project 1.
Now, if you submit your Project 1 solution code for Project 2 – which
has a different project specification – you will NOT get 100% Project
Correctness in Project 2 despite having 100% Mutation Score.

* Mutation Testing makes sure your code is doing exactly what **YOU**
  expect it to do.

* Project Correctness makes sure your code is doing exactly what
  **INSTRUCTORS** expect it to do.

  
Why does writing Mutation Tests take so much time?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

So much time compared to what?
Most students doing intermediate-level projects spend the bulk of
their project time debugging.
How much time you spend debugging depends in part on how well you
write the code to begin with, and how much effort you put into your
test suites.
Mutation testing gives focussed information on where your test suite
is missing out on testing your code.
If that helps you to find bugs, then it is saving you a lot of time.


Why should I use Mutation Testing instead of Code Coverage?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Testing is a huge concern for industry, and so there has been a lot of
research and empirical study on testing methods.
Code coverage, while simple and cheap to measure, has been shown
empirically not to be well correlated to actual bugs in code,
while mutation testing is much better correlated to real bugs.


Why are we using this particular set of mutation operators?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Historically, mutation testing has not been used much in academic
settings because of its expense.
Every mutation requires running the program against the test suite.
Part of the research in recent years has been about finding minimal
sets of mutations that are a good tradeoff between identifying bugs
and the expense of running the testing process.
While there are many other ways to do things, we think the choice of
operators used in the Web-CAT plugin represent the most effective
solution that we know of.


Does 100% Mutation Score mean my code is perfect?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A high mutation score indicates that your tests are effective at
catching the introduced mutations.
However, this doesn't necessarily mean that your code is perfect or
bug-free.
First, you might have a mis-understanding about the project
requirements that lead to your program giving one answer (which your
own test agrees with), while the instructor reference tests expect a
different answer.
Second, your tests might not cover some edge cases, or there
might be issues in the code that mutation testing doesn't reveal.
