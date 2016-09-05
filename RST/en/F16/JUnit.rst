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

   * I see many examples of this::

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
