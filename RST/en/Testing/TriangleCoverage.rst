.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Testing for Code Coverage
   :author: Cliff Shaffer
   :institution: Virginia Tech
   :requires: Testing Introduction
   :satisfies:
   :topic: Testing
   :keyword: Testing; Code Coverage
   :naturallanguage: en
   :programminglanguage: Java
   :description: Discusses testing for code coverage, and presents a testing interactive problem to get complete code coverage on a triangle classifier function.


Testing for Code Coverage
=========================

Testing for Code Coverage
-------------------------

For the exercise in the last section, you probably found it to be
fairly difficult to come up with a series of test inputs that gave
good code coverage.
This is because you could not see the code.
If you can see the code, it is relatively easy to come up with test
cases to cover each branch.
Try it this time with code visible.
Try to reach 100% code coverage by giving inputs that take you to each
branch in the nested series of ``if`` statements.

.. avembed:: AV/Testing/Triangle/TriangleClassifier.html pe
   :long_name: Triangle Testing With Code
   :url_params: code=true
   :keyword: Testing; Code Coverage

So, did you find it easier to get code coverage when you had the code
in front of you?
Probably, because you could see what paths are in the code, and "write
a test case" for each branch.
However, while this can be a useful skill to be able to write tests to
cover each branch in the code, this is not really the same as
determining if your program "works correctly".
That is, tests to cover all of the code **might** be able to tell you
if the code that you wrote is doing what you intended.
But that does not tell you if the code is implementing the full
functionality of the problem as intended.

The code in this example is reasonably good at checking for various
bad user inputs, like typing something into a box that is not a number
at all.
But what if the code had not tested for bad user input?
What would have happened if the user had indeed typed "aa" into a box
instead of a number, but the programmer never thought to check and
properly handle that?
Probably the program would have behaved in a way not intended.
If the programmer never thought to check for this in the program,
then they probably never thought to check for it when they wrote their
tests for the program either.
This is part of what makes testing so difficult.
You need to get good at predicting and testing for all possible types
of input to the program, not just the ones that the user will provide
when they "use the program correctly".
Only testing for "proper" inputs or uses of the program is called
:term:`happy path testing`.
Happy path testing alone is not good enough to write reliable
programs.
Programs need to also work reliably when the input is not "proper",
and so the testing process needs to consider such inputs as well.
