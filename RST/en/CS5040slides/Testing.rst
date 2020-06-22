.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

===============
Project 1 Day 3
===============

Project 1 Day 3
---------------

.. slide:: Hashing Performance

   * What should hasing insert, search cost?

   * Warning: You will take a major grading hit if your performance is
     bad (sequential search)

   * What does printing the table cost? Why is it OK to do print by
     sequentially working through the table?


.. slide:: Testing the Hash Table

   | Assume that string X hashes to slot Y in the table.
   |    Do you know how to create a string that hashes to slot Y+1?
   |    Why does this matter?
   | How good is your coverage? How good are your tests?

           
.. slide:: Debugging vs. Testing

   * Debugging: (Localizing and) fixing a (known) bug

   * Testing: Recognizing that you have a specific bug
   
   * Debugging is hard! Testing is harder. You probably don't have a
     lot of experience with testing.

   * JUnit tests are meant to help you test, and to help you **not** spend
     countless hours debugging.

   * Regression Testing: Include tests that verify all of your fixed
     bugs remain fixed as you continue to evolve your program.

     

.. slide:: Testing and Web-CAT

   * Anytime you submit to Web-CAT and fail a grader test that you did
     not expect to fail, it represents **YOUR failure** to properly
     test.

   * I am not your testing service. Nor is Web-CAT. We don't share our
     test cases.

   * Real problem: How to correct a mis-understanding.


.. slide:: Testing vs. Anti-Testing (1)

   * Testing means that you ran your program, and verified that
     certain behavior is correct.

   * Anti-testing (in the context of JUnit tests) is running a unit
     test that gives code coverage on lines that have not been
     positively verified to behave correctly.

   * Typical anti-test: Give the program a lot of commands (gets code
     coverage) and ignore the results (or copy a dump of the results
     back into the output check in order to "pass").
   
.. slide:: Testing vs. Anti-Testing (2)
                
   * Why Anit-testing is disasterous:
  
      * If you have real tests, then you can expect that your bugs are
        in the uncovered lines. So you know where to look.

      * Throw in an anti-test, and now you can't tell which lines are
        demonstrated correct and which are not.


.. slide:: Project 1 Testing Process

   * Use what you can expect to pass from the sample I/O as a test for
     syntax. Grow this as you increase your functionality to match.

   * Test basic insert (and table print)

   * Add testing for duplicates

   * Add testing for collision resolution. This will take much more
     work.

   * Keep adding tests as you add functionality (update, delete,
     memory manager).
