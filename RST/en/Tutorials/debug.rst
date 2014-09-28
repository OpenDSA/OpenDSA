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

   Figure 1

Debugging Terms
===============
1. Resume - Resuming will run the code until another breakpoint is hit or until
the program finishes (see Figure 2 for icon).

2. Step Into - Stepping into will drop you into the next function called for 
example, stepping into the bst.add() call in the above photo will take you to
the bst class and inside the add method (see Figure 2 for icon).

3. Step Over - Stepping Over will execute the current line of code and progress
to the next line of code, stopping there (see Figure 2 for icon).

4. Step Return - Code will be executed until the next return statement (see 
Figure 2 for icon).

5. Breakpoint - A breakpoint is a stopping point in your code. When you set a 
breakpoint, the debugger will stop execution anytime it reaches there. You may
add a breakpoint by clicking on the left hand side bar of the Eclipse code 
window (see Figure 1).

.. odsafig:: Images/DebugList.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug Steps

   Figure 2

*\*Author's note - There are a few more step functions not documented here, to
learn more about them visit*
`here <http://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.jdt.doc.user%2Ftasks%2Ftask-stepping.htm>`__.
*Please note that I have not documented the Stop Icon (Red Square) or the Pause
Icon (Two Vertical Bars). These are simple enough to understand, Stop will kill
execution of your program and Pause pauses the program.*

Debugging A Memory Pool
=======================
There will be times when you are working with your programs that you may need
to analyze byte chunks. Doing so can be difficult however, as the computer will
treat it as a primitive. So how do we meaningfully analyze a chunk of bytes?
Consider the following code. 

.. codeinclude:: Java/Tutorials/MainByteArrayDebug.java

It spawns a 1000 byte array and then places 1 of
27 characters chosen randomly in a position randomly chosen in one of the 1000
places. Suppose you wanted to evaluate the contents of the memory, how would 
you do this? Luckily Eclipse has the functionality that can do this. In the 
variable window (shown in Figure 1) will allow you to view the memory dump. 

.. odsafig:: Images/DebugMemoryPool1.png
   :width: 600
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug Steps

   Figure 3

By default Eclipse will dump a byte as an integer.

.. odsafig:: Images/DebugMemoryPoolRaw1.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug Steps

   Figure 4

However there are a number of ways to dump the information otherwise. You can 
open the Preferences window by selecting Window->Preferences (see figure 5). 
Then you will be able to select the raw dump information. In this case I will 
choose ASCII text so I can see the character stored at the location.

.. odsafig:: Images/DebugMemoryPoolPreferences.png
   :width: 300
   :height: 350
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Debug Steps

   Figure 5

Now when we view the memory location we can see the character stored there. We
can also change our display preferences we can also see the hex value and the
unsigned value as well.

.. odsafig:: Images/DebugValue1.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: ASCII View

   Figure 6: ASCII Text View Enabled

.. odsafig:: Images/DebugValue2.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Hex View

   Figure 7: Hex View Enabled

.. odsafig:: Images/DebugValue3.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Unsiged View

   Figure 8: Unsigned View Enabled

.. odsafig:: Images/DebugValue4.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: All Three Views

   Figure 9: All Three Views Enabled

The Eclipse Console
===================
So you can now view memory, set breakpoints and even step through functions to
the points you care about. What's next? Well by now you should be familiar with
gdb. gdb's command line interface is very handy for dumping information quickly
and programmatically. Eclipse has a similar functionality. Eclipse's Display
window functions very similarly. If the Display window is not visible you can
enable it using Window->Show View->Display. Once the Display window is open you
can turn on autocomplete by right clicking and selecting Content Assist, or by
hitting CTRL-SPACE. The Display window allows you to write Java code and then
execute it. This means you can edit and view information programatically.

.. odsafig:: Images/DebugDisplay1.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Result Of Running Display

   Figure 9: The Display

