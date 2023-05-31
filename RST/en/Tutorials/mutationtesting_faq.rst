.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Rifat Sabbir Mansur
   :topic: Mutation testing

Mutation Coverage: FAQ
======================

Frequently Asked Questions
---------------------------

What is Mutation Testing and why should I use it? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mutation testing is a powerful technique for improving the quality of your test suite. The primary purpose of mutation testing is to evaluate the effectiveness of your tests. It's not about finding new bugs in your program; it's about finding gaps in your tests where bugs could hide.

Mutation testing works by introducing small changes, or "mutations", into your code and then running your test suite. If all your tests still pass after a mutation, that's a sign that your tests might be missing something important.

Imagine you're trying to create a safety net with your tests. Each test is like a strand of the net. The more strands you have, and the better positioned they are, the less likely it is that a bug will slip through. Mutation testing is like a tool that lets you see any holes in your safety net.

Mutation testing can help in writing better code, and it does so in several ways:

 - **Increased Test Coverage**: Mutation testing helps identify the parts of the code that are not well-tested. When a mutation survives, it indicates that there is a gap in the test coverage. By striving to kill all mutants, developers are encouraged to write more comprehensive tests, which can lead to better, more robust code.

 - **Detection of Redundant Code**: If a mutation does not lead to a failing test, this could indicate that the mutated piece of code is not necessary for the correct function of the program. This could help you identify and remove dead or redundant code.

 - **Improvement of Test Quality**: Mutation testing doesn't just increase the quantity of your tests, it also improves their quality. By generating mutants, mutation testing essentially creates new test cases that your suite must be able to handle. This leads to more comprehensive and robust test suites that are better able to catch regressions and other issues.

 - **Encourages Simpler Design**: When working with mutation testing, it often becomes clear that complex code generates more mutants and is therefore harder to test. This can encourage developers to keep their code as simple and straightforward as possible, which generally leads to higher quality code.

 - **Validation of Assumptions**: Mutation testing can help validate the assumptions made while writing the code and the tests. If a mutant survives, it might mean that the assumption under which you wrote the test was not correct or comprehensive.

 - **Increased Confidence**: By striving for a high mutation score, you can gain more confidence that your code is well-tested and free of obvious bugs. This can make it safer to refactor or add new features to the codebase. A number of empirical studies have shown that mutants are coupled to real faults/bugs and that Mutation Testing is positively correlated with real fault detection. Therefore, a high mutation score can be a good indicator of the quality of your code.

Does 100% Mutation Score mean 100% Project Correctness?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Mutation Score and Project Correctness are two different metrics. Mutation Score is a measure of the effectiveness of your tests, while Project Correctness is a measure of the correctness of your code. Having a 100% Mutation Score does NOT ensure that your Project Correctness will be 100%. Imagine this way, you can have 100% Mutation Score on Project 1. Now, if you submit Project 1 solution code for Project 2 – which has a different project specification – you will NOT get 100% Project Correctness in Project 2 despite having 100% Mutation Score.

* Mutation Testing makes sure your code is doing exactly what **YOU** expect it to do. 

* Project Correctness makes sure your code is doing exactly what **INSTRUCTORS** expect it to do.

Why do writing Mutation Tests take too much time?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

While mutation testing can be resource-intensive, with good configuration and the use of modern tools, it's possible to run mutation tests relatively quickly. It's also important to remember that the value of mutation testing is in its ability to uncover poorly tested parts of your code, which can save debugging time in the long run.

Why should I use Mutation Testing instead of Code Coverage?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Code coverage is a useful metric, but it doesn't tell you anything about the quality of your tests. Mutation testing, on the other hand, can help you identify weak spots in your test suite and improve your tests.

Does 100% Mutation Score mean my code is perfect?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A high mutation score indicates that your tests are effective at catching the introduced mutations. However, this doesn't necessarily mean that your code is perfect or bug-free. For example, your tests might not cover some edge cases, or there might be issues in the code that mutation testing doesn't reveal.
