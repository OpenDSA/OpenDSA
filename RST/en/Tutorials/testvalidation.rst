.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Alex Hicks
   :requires: JUnit test writing
   :satisfies: 
   :topic: Programming Tutorial
   :keyword: JUnit Testing

Test Case Validation
====================

Test Case Validation
--------------------

Test Case Validation is a new form of feedback (only available on
Web-CAT) whose goal is to help you identify misconceptions in your
understanding of the project specification.
This is determined by how well the tests you have written match the
reference solution.

Test Case Validation works by running the test cases you've
written in ProblemSpecTest.java against our reference implementation.
On Web-CAT, these results are shown in two new feedback sections:

**Estimate of Reference Coverage:**
This section explains what your coverage score means.

**Detailed Test Validation Results:**
This section shows the results of running ProblemSpecTest.java against
the reference implementation.
You can see exactly which tests are failing against the reference
implementation.
If some of these tests fail, it is likely that those tests
embody a misconception.
Specifically, it means that your failing tests are expecting something
different from what the reference solution produces.

Note: This only works for input/output style tests, like the examples
provided in ProblemSpecTest.java.

This system is designed to help you identify difficult-to-find misconceptions.
For example, you may use this system to validate the output format of a project.
You can create an input/output style test case in ProblemSpecTest.java that
works for your solution, submit to Web-CAT, and check Detailed Test Validation
Results to ensure that the reference implementation also formats the output in
the same way. If there are no failures of tests in ProblemSpecTest.java, that
means the tests you have written there do not embody misconceptions and your
formatting of the output is acceptable. If some of your tests here fail, it
indicates that you have something to fix, possibly a formatting issue, possibly
a larger misconception about program behavior.

This system does not replace the need for Unit Testing.
It is important for you 
to create your own modifications of the IO style tests to validate additional
behaviors and outputs in addition to unit tests. What this system seeks to help
with is a situation where you write a test case that your solution passes locally, but is
inconsistent with the project specification, so you fail reference tests despite
passing your own tests. This is similar to mutation testing in that it hopes to
increase the quality of your own tests, but is a little different because
validation gives you feedback on their "correctness" (as defined by
the reference implementation).

Test Case Validation might give one of three different outcomes.
One outcome is that your tests all pass, indicating that the tests in
ProblemSpecTest.java are consistent with the project specification.

.. odsafig:: Images/ValidationAllPass.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: ValidationAllPass

   Validation Results in Web-CAT where all tests in ProblemSpecTest.java pass.

Another is that your tests in ProblemSpecTest.java all fail, indicating that
you have a formatting error or a large misconception about the specification.

.. odsafig:: Images/ValidationAllFail.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: ValidationAllFail

   Validation Results in Web-CAT where all tests in ProblemSpecTest.java fail.

Finally, it is possible that some of your tests will pass and some will fail.
This indicates that you may have a smaller misconception, typically related to some
specific functionality. In this case, the Detailed Test Validation Results will
help you identify which test case is embodying the misconception. Addressing
the misconception should start by asking why your code is
doing something different from the reference implementation. A failure in Test
Validation implies that your code is doing something different than the
reference implementation, but the test case you wrote validates your code's
behavior, not the correct behavior asked by the specification.

.. odsafig:: Images/ValidationSomePass.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: ValidationSomePass

   Validation Results in Web-CAT where some tests in ProblemSpecTest.java pass
   and some fail.

