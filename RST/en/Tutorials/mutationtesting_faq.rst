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

Why do I have bugs in my code despite having 100% Mutation Score?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Again, a high mutation score indicates the effectiveness of your 
tests in capturing the introduced mutations.
We are only using a particular set of mutation operators, and there 
are many other mutation operators that test different aspects of your
code.
This may leave room for bugs to hide in other parts of your code.


For example, let's start with a simple class definition:

.. code-block:: java
  
  public class SimpleMath{
  private Integer divisor;

    public SimpleMath(Integer divisor){
      this.divisor = divisor;
    }

    public int divideByDivisor(int dividend){
      return dividend / divisor;
    }
  }

In this case, we have a class `SimpleMath` which takes an `Integer` in 
the constructor and uses it as a divisor in the `divideByDivisor` method.

Let's also consider a test for this class:

.. code-block:: java

  import org.junit.jupiter.api.Test;
  import static org.junit.jupiter.api.Assertions.assertEquals;

  public class SimpleMathTest {
      @Test
      public void testDivideByDivisor() {
          SimpleMath sm = new SimpleMath(5);
          assertEquals(10, sm.divideByDivisor(50));
      }
  }

This test will pass and the mutation testing can achieve 100% coverage with 
the applied mutators (for example, changing arithmetic operators, altering 
return values, etc.). However, there's a situation not covered by the test, 
which is passing `null` to the `SimpleMath` constructor:

.. code-block:: java
  :emphasize-lines: 1

  SimpleMath sm = new SimpleMath(null);
  sm.divideByDivisor(50);  // This will throw a NullPointerException

If this happens in your code, a `NullPointerException` would be thrown, 
as `divisor` is `null`. The mutation testing won't catch this because 
it does not include mutators that check for `NullPointerException`. 
To catch this kind of exception, a good practice would be to add null 
checks in the `SimpleMath` constructor and/or `divideByDivisor` method, 
and also include corresponding test cases in the test suite.

Why do my mutation tests not cover all branches of my code? 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You may have a situation where your mutation tests do not cover all
branches of your code. 
In such case, you may want to make sure you are not writing over-constrained 
code.

Consider the situation where you have two points. You want to know which
quadrant the second point (x2, y2) is in w.r.t. the first point (x1, y1).

.. code-block:: java

  public class Quadrant {
    public static String getQuadrant(int x1, int y1, int x2, int y2) {
      if (x2 >= x1 && y2 >= y1) {
        return "South-East";
      } else if (x2 < x1 && y2 >= y1) {
        return "South-West";
      } else if (x2 < x1 && y2 < y1) {
        return "North-West";
      } else if (x2 >= x1 && y2 < y1) {
        return "North-East";
      } 
    }
  }

This has the virtue of being quite logical and clear. However, it 
has some problems.
It is horribly inefficient, compared to alternatives.
But our real concern has to do with testing and mutation coverage.

**Fact:** No series of tests will cover all branches in this code.

Now, consider every possible branch and see what can get triggered. 
Consider that there have to be at least 8+ branches, and only 4 
possible inputs.
You can figure out all the possible branches by trying to hit every 
branch by brute force, one at a time.

Here, we want complete mutation coverage but there are only four 
logically distinct inputs.
Therefore, we must come up with code that has only four branches!

For example, our refactored code could look like this:

.. code-block:: java

  public class Quadrant {
    public static String getQuadrant(int x1, int y1, int x2, int y2) {
      if (x2 >= x1) {
        if (y2 >= y1) {
          return "South-East";
        } else {
          return "North-East";
        }
      } else {
        if (y2 >= y1) {
          return "South-West";
        } else {
          return "North-West";
        }
      }
    }
  }


With the refactored code, not only can you test every branch, but 
this is a lot more efficient. 
Every branch requires 2 tests.

This is a good example of how mutation testing can help you to 
improve the quality and efficiency of your code.
