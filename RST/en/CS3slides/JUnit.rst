.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

=============
JUnit Testing
=============

.. slide:: Testing

   What is the difference between testing and debugging?

   How much time have you already spent on this project
   testing/debugging your code?


.. slide:: JUnit testing and code coverage

   * It is a true art to be able to think in your head all the
     possible ways that your program could go wrong.

   * One thing that you can get from proper JUnit testing is an
     indication of what lines are not covered.

   * This indicates situations that you have not yet thought to test.

   * Sort of an automatic test generator!


.. slide:: Philosophy

   * Essential rule: Anything that you do in a test must be 
     followed with assertions to verify that what you
     did is correct.

   * Every unit test does two things:
      #. Changes the state of the program. You can assert that these
         changes are correct.
      #. Covers (possibly new) lines of code
     
      You want these two to be in alignment.

.. slide:: A Bad test (1)

   * I see many tests like this::

      public void testMInit() {
        Memman mem = new Memman();
        assertNotNull(mem);
        Memman.main(new String[] {"25", "20", "P1SampleInput.txt"});
      }


.. slide:: A Bad test (2)

   Why is this so bad?
      * It violates our essential rule.
      * There is no testing of what running the program on
        input DID. Pretty much your only conclusion is that the
        program did not crash.
      * But worse: Lots of lines of code are "covered". So you don't
        even know what paths have NOT been tested.

   WARNING: Project 2 will be unforgiving of this sort of thing.


.. slide:: Full test of output

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


.. slide:: Selective Testing of Output

   ::

      public void testEmpty()
          throws Exception {
        String[] args = new String[3];
        args[0] = "10";
        args[1] = "32";
        args[2] = "EmptyTest.txt";
        System.out.println("Empty test");
        Memman.main(args);
        assertTrue(systemOut().getHistory().endsWith("(17,47)\n"));
      }


.. slide:: What would be good testing for Project 1?

   ?


.. slide:: Models

   * JUnit testing compares a model of what the program should do
     against what your program does do.
   * Executing commands puts your program into a certain state
     (expressed by the output).
   * The assertions define characterstics of what you expect from that
     state. This is the model.
   * The test then compares what state YOUR program is in (expressed
     by the output) against the model (assertions).


.. slide:: What if your model is wrong?

   * If you have a model in your head, and you write the program to
     that model, and you test to that model, a "properly working"
     program will meet that model.
   * What if your model does not match reality?
   * In this program, that most often happens when:
      * Your output text is not what is expected. BUT you should have
        used the sample output file to write your tests.
      * You have the wrong model about how probing works. BUT you
        should then see that you pass your tests, and fail the (one)
        Web-CAT test. Then you should be suspicious about your model
        if they tell you different things.

.. slide:: Regression testing

   * This means running all of your old tests on the program to make
     sure that any new changes don't break anything.

   * Students sometimes add print statements to help them debug, and
     then forget to remove them. Then Web-CAT tells them they failed a
     bunch of tests.

     * Your unit tests should warn you about this.

   * If you find a bug, and your tests all pass, then update the tests
     to trigger on the bug.
