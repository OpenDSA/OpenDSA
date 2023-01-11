.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Rifat Sabbir Mansur
   :topic: Mutation testing

Mutation Coverage In JUnit
======================

Mutation Coverage In JUnit
---------------------------

Mutation testing (or mutation analysis) is used to design new software tests and evaluate 
the quality of existing software tests. 
Mutation testing involves modifying a program in small ways.
The problem is then run against all the test cases in the test suite of the project. 
If the test suite falls to detect the small change in the code, we need to improve the quality 
of the test cases. 
Mutation testing is considered to be a stronger metric than code coverage to assess the quality
of the test suite of a project.  


The latest version of the Web-CAT Submission Plug-in comes with the feature to run mutation testing
in the Eclipse IDE.  
There is no need to install any additional plug-in for mutation testing.
Just make sure that you have the latest version of the Web-CAT Submission Plug-in. 

Please note: If you have previously installed the Web-CAT Submission Plug-in for earlier courses, you must uninstall  
and re-install the Web-CAT plug-in. 
This will ensure that you are using the latest version of the Web-CAT Submission Plug-in for Eclipse. 


Using Mutation Testing
~~~~~~~~~~~~~~~~~~~~~~

After installing the plugin begin writing test code. After completion of the
test code run the mutation testing on your test suite by the following steps:

Step 1: Right-click on a Java project that contains your test suite.

Step 2: Click on Run As > Mutation Test (as shown in the image in red box)

.. odsafig:: Images/mutationtestingrun.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: Mutation Testing Run

When you execute mutation testing, it will create two additional tabs next to your Console output UI.

The first tab lists all the mutations. There are two groups of mutations. 

Group 1: Lines Not Tested

Group 2: Lines Needing Better Testing

Lines Not Tested
~~~~~~~~~~~~~~~~

This list shows all the lines of the project code that were not covered by the test suite.
In order to get a better mutation test coverage, you must write test cases that covers all 
the lines listed in this group. 
If you click on the listed item, it will take you to the specific line of code of that is 
not covered. 
The list also displays package name and class name to which the line of the code belongs to.

.. odsafig:: Images/mutationlist.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: Mutation list

   Mutation List For Each Class In The Eclipse Project


Lines Needing Better Testing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

This group shows all the lines of code that were covered by the test suites, however,
need better test case assertions.
We are using two types of mutations for our mutation testing. 

1: Mutation to check Logical Conditions.

2: Mutation to check Arithmetic Operations.

For Logical Conditions, you must write test case assertions to check the intended behavior
for both "true" and "false" conditions. 

For Arithmetic Operations, you must write test case assertions to check if the operation 
produces expected behavior.

You can click on any of the item in the list and you should be forwarded to the listed line of 
code.

Mutation Summary
~~~~~~~~~~~~~~~~

The summary tab shows the overall Test Coverage of the project. 
The Mutation Coverage is shown as a percentage which is calculated by 
the number of mutations detect vs. the number of mutations generated during
mutation testing. 
A 100% Mutation Testing means all the generated mutations were detected by 
the test suite of the project. 

There is also a breakdown of mutation coverage by different classes in the 
project. 

.. odsafig:: Images/mutationsummary.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :scale: 50%
   :alt: Mutaiton Summary

   Mutation Coverage Summary For The Eclipse Project

Use these visuals to help improve the quality of the test suite of the project
by writing additional test case assertions. 




