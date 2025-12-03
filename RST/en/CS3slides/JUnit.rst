.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

=======
Testing
=======

Testing
-------

.. revealjs-slide::

* What is the difference between testing and debugging?

* It is a true art to be able to think in your head all the
  possible ways that your program could go wrong.

* One thing that you can get from proper JUnit testing is an
  indication of what lines are not covered.

* This indicates situations that you have not yet thought to test.

* Sort of an automatic test generator!


Philosophy
----------

.. revealjs-slide::

* Essential rule: Anything that you do in a test must be 
  followed with assertions to verify that what you did is correct.

* Every unit test does two things:
  
  #. Changes the state of the program. You can assert that these
     changes are correct.
  #. Covers (possibly new) lines of code
    
* You want these two to be in alignment.

  
A Bad test (1)
--------------

.. revealjs-slide::

* To get high code coverage, sometimes people write tests like this:

::
  
   public void testMInit() {
     Memman mem = new Memman();
     assertNotNull(mem);
     Memman.main(new String[] {"25", "20", "P1SampleInput.txt"});
   }

* The last line means to execute an input file with lots of
  commands.

  * But they are not being checked for correctness
  * Only some trivial part is being tested (to make the style checker happy)


A Bad test (2)
--------------

.. revealjs-slide::

* Why is this so bad?
  
  * It violates our essential rule.
    
    * There is no testing of what running the program on
      input DID. Pretty much your only conclusion is that the
      program did not crash.

  * But worse: Lots of lines of code are "covered". So you don't
    even know what paths have NOT been tested. This actively hurts
    your ability to write new tests that help to find bugs.


Full test of output
-------------------

.. revealjs-slide::

::

  public void testSampleInput() throws Exception {
    String[] args = new String[3];
    args[0]= "10"; args[1]= "32"; args[2]= "P1sampleInput.txt";
    Memman.main(args);
    assertFuzzyEquals( systemOut().getHistory(),
          "|When Summer's Through| " +
          "does not exist in the song database.\n" +
          "(0,32)\n" +
          ...
          "|Watermelon Man| is added to the song database.\n" +
          "(44,11) -> (121,4) -> (319,1)\n");
  }

* This test is from a program that has output for every command
  executed, and the test verifies that they are correct.


Selective Testing of Output
---------------------------

.. revealjs-slide::

::

   public void testEmpty()
       throws Exception {
     String[] args = new String[3];
     args[0]= "10"; args[1]= "32"; args[2]= "P1sampleInput.txt";
     Memman.main(args);
     assertTrue(systemOut().getHistory().endsWith(" (319,1)\n");
   }

* This test is not nearly so good. It merely checks that the last
  command is printing something that is correct. Perhaps that is easy
  and hides lots of bugs.


Mutation Testing
----------------

.. revealjs-slide::

* Mutation testing changes things in your code in a systematic way.

  * Such a change is called a "mutant".

  * Presumably, changing the code introduces a bug.

  * The issue then becomes: Does some test fail when the bug is
    introduced? If so, the mutant is said to be "covered".

* There are lots of "mutation operators" that have been tried. We use two:

  * Change a boolean test to TRUE. Separately, change it to FALSE.

  * Drop an operand in an arithmetic expression.


Mutation Testing Effects
------------------------

.. revealjs-slide::

* Mutation Testing is an improvement over code coverage.
  Becoming an industry standard.

* Code coverage is helpful if you use it correctly, but its easy to
  "game".

* Code coverage only tells you if a branch is executed, that in
  itself says nothing about correctness.

* Mutation testing requires both that the branch is executed, and
  that the execution affects the test results in some way.

* Web-CAT acts as an "oracle" for correctness. You don't get that
  crutch in the real world.

  * MT is the next best thing to an automated oracle. It's not
    perfect, but it does a good job of helping you to test and debug.

* In our use in CS3114/5040 in recent years, MT use has improved
  student project scores, test suite quality, and program code
  quality.


Models
------

.. revealjs-slide::

* JUnit testing compares a model of what the program **should** do
  against what your program **does** do.
* Executing commands puts your program into a certain state
  (expressed by the output).
* The assertions define characterstics of what you expect from that
  state. This is the model.
* The test then compares what state your program is in (expressed
  by the output) against the model (assertions).


What if your model is wrong?
----------------------------

.. revealjs-slide::

* IF you have a model in your head, AND you write the program to
  that model, AND you test to that model, THEN a "properly working"
  program will meet that model.
* What if your model does not match reality?

  * Specifically, your assertions define a result is not what the
    project spec requires.

    * BUT you should be using the sample tests we give you to check
      things like the formatting and the error conditions.

  * You get a bit lazy: You write a test by running your program on
    some input, taking the output, and asserting that this is correct.

    * Don't do that! Carefully think through what the result SHOULD
      be, and then verify that your result matches.

  * Take advantage of the service that Web-CAT provides to check your
    tests against the reference implementation.


Regression Testing
------------------

.. revealjs-slide::

* This means running all of your old tests on the program to make
  sure that any new changes don't break anything.

* Students sometimes add print statements to help them debug, and
  then forget to remove them. Fortunately, we now use a style of
  testing that ignores System.out content.

* If you find a bug, but your tests all pass, then update the tests
  to trigger on the bug.

  * That should also improve your mutation coverage.
