.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: 
   :satisfies: 
   :topic:

====================
Debugging In Eclipse
====================
In this tutorial we will show basic debugging steps on a Binary Search Tree 
or BST. The BST is borrowed from Edoardo Biagioni from his hawaii.edu site
please view the source for the full citation. To begin debugging a program
select the Debug mode by clicking the icon circled in blue below.

.. odsafig:: Images/Debug1.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug view

Debugging Basics
================
1. Resume - Resuming will run the code until another breakpoint is hit or until
the program finishes (see below figure for icon).

2. Step Into - Stepping into will drop you into the next function called for 
example, stepping into the bst.add() call in the above photo will take you to
the bst class and inside the add method (see below figure for icon).

3. Step Over - Stepping Over will execute the current line of code and progress
to the next line of code, stopping there (see below figure for icon).

4. Step Return - Code will be executed until the next return statement (see 
below figure for icon).

5. Breakpoint - A breakpoint is a stopping point in your code. When you set a 
breakpoint, the debugger will stop execution anytime it reaches there. You may
add a breakpoint by clicking on the left hand side bar of the Eclipse code 
window (see above figure).

.. odsafig:: Images/DebugList.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug Steps

*\*Author's note - There are a few more step functions not documented here, to
learn more about them visit*
`here <http://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.jdt.doc.user%2Ftasks%2Ftask-stepping.htm>`__.
*Please note that I have not documented the Stop Icon (Red Square) or the Pause
Icon (Two Vertical Bars). These are simple enough to understand, Stop will kill
execution of your program and Pause pauses the program.*
