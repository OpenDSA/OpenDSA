.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: JUnit test writing
   :satisfies: Junit code coverage
   :topic: JUnit

Code Coverage In JUnit
======================

One of the most useful features that the webcat grading system provides is
information of total code coverage. Thankfully Eclipse has a couple of plugins
that offer similar functionality so when you write your code you will not be
dependent on webcat solely.

Step 1: Open Eclipse and select Help->Install New Software
Step 2: A new window will appear similar to the following figure select the Add
button.

.. odsafig:: Images/Webcatnewsoftware.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :scale: 50%
   :alt: Add New Software Window

Step 3: A pop up will appear asking for a name/location, enter NAME: Eclemma,
and LOCATION: http://update.eclemma.org/

Step 4: After providing the information, you will be redirected to a screen with
the option to select EclEmma for installation. Click the checkbox and progress
through the installation screens.

Using EclEmma
~~~~~~~~~~~~~

After installing the plugin begin writing test code. After completion of the
test code select the button selected in red in the below image.

.. odsafig:: Images/eclemmabtn.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: EclEmma

Once the test have finished running the source code that was tested will now be
high-lighted in three different colors. Green means that this line of code has
been executed by the tests and are "covered." Yellow indicates a segment of code
that has multiple branches and that not all the branches in code have been
reached (i.e. an if statement). Red indicates that this line of code has not
been reached at all and as such is not covered.

.. odsafig:: Images/coverageexample.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: EclEmma

Use these visuals to help determine what the test code is missing and how to
improve the code coverage. In addition to showing the code missed by test cases
EclEmma can also provide information regarding the total coverage of the entire
project, the entire class, and each method in the class. In order to see this
information select Window->Show View->Other and then Java->Coverage. A window
similar to below will appear providing information.

.. odsafig:: Images/coverageoverview1.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Code coverage of the entire project

   Code Coverage For Each Class In The Eclipse Project

.. odsafig:: Images/coverageoverview2.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Code coverage of each method in the BST class

   Code Coverage Of Each Method In The BST Class
