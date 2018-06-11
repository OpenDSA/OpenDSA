.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies: Testing Introduction
   :topic: Testing

Testing for Code Coverage
=========================

Testing for Code Coverage
-------------------------

The module in the last section was fairly difficult to come up with
good code coverage.
This is because you could not see the code.
If you can see the code, it is relatively easy to come up with test
cases to cover each branch. Try it this time with code visible.
Try to get over 90% code coverage.

.. raw:: html

   <center>
   <iframe id="Tri_iframe2"
        src="http://lti.cs.vt.edu/LTI_ruby/AV/Testing/Triangle/TriangleApplet.html?code=true"
        width="1100" height="1100"
        frameborder="1" marginwidth="0" marginheight="0"
        scrolling="no">
   </iframe>
   </center>

.. .. avembed:: AV/Testing/Triangle/TriangleApplet.html pe
..   :long_name: Triangle Testing
..   :url_params: code=true


So, did you find it easier to get code coverage when you had the code
in front of you?
Probably, because you could see what paths are in the code, and "write
a test case" for each branch.
However, while this can be a useful skill to be able to write tests to
cover each branch in the code, this is not really the same as
determining if your program "works correctly".
That is, tests to cover all of the code **might** be able to tell you
if the code is doing what you intended.
But that does not tell you if the code is implementing the program as
intended.
This code is reasonably good at checking for various bad user inputs,
like typing something into a box that is not a number at all.
But what if the code had not tested for bad user input?
What would have happened if the user had indeed typed "aa" into a box
instead of a number, but the program never checked for that?
Probably the program would have behaved in a way not intended.
If the programmer never thought to check for this in the program,
then they probably never thought to check for it when they wrote their
tests for the program either.
This is part of what makes testing so difficult.
You need to get good at predicting and testing for all possible types
of input to the program, not just the ones that the user will provide
when they "use the program correctly".
Only testing for "proper" uses of the program is calle :term:`happy
path testing`.
It is not good enough to write reliable programs.
