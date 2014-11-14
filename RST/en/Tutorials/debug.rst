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
In this tutorial we will show basic debugging steps. To begin debugging a
program select the Debug mode by clicking the icon circled in blue below.

.. odsafig:: Images/Debug1.png
   :width: 600
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Debug view

   Figure 1

Debugging Terms
===============
1. Resume - Resuming will run the code until another breakpoint is hit or until
the program finishes (see Figure 2 for icon).

2. Step Into - Stepping into will drop you into the next function called. For 
example, stepping into the bst.add() call in the above image will take you to
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
   :capalign: center
   :figwidth: 90%
   :alt: Debug Steps

   Figure 2

*\*Note - There are a few more step functions not documented here, to
learn more about them visit*
`here <http://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.jdt.doc.user%2Ftasks%2Ftask-stepping.htm>`__.

Debugging A Memory Pool
=======================
For some programs you may need to analyze byte chunks. Doing so can be difficult.
So how do we meaningfully analyze a chunk of bytes? Consider the following code. 

.. codeinclude:: Java/Tutorials/MainByteArrayDebug.java

This program spawns a 1000 byte array and then places 1 of
27 characters chosen randomly in a position randomly chosen in one of the 1000
places. Suppose you wanted to evaluate the contents of the memory, how would 
you do this? Luckily Eclipse has the functionality that can do this. The 
variable window (shown in Figure 1) will allow you to view the memory dump. 

.. odsafig:: Images/DebugMemoryPool1.png
   :width: 600
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Debug Steps

   Figure 3

By default Eclipse will dump a byte as an integer.

.. odsafig:: Images/DebugMemoryPoolRaw1.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Debug Steps

   Figure 4

However there are a number of other ways to dump the information. You
can open the Preferences window by selecting Window->Preferences (see Figure 5).
Then you will be able to select the raw dump information. In this case I
chose ASCII text so I can see the character stored at the location.

.. odsafig:: Images/DebugMemoryPoolPreferences.png
   :width: 300
   :height: 350
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Debug Steps

   Figure 5

Now when we view the memory location we can see the character stored there. We
can also change our display preferences to see the hex value and the
unsigned value as well.

.. odsafig:: Images/DebugValue1.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: ASCII View

   Figure 6: ASCII Text View Enabled

.. odsafig:: Images/DebugValue2.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Hex View

   Figure 7: Hex View Enabled

.. odsafig:: Images/DebugValue3.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Unsiged View

   Figure 8: Unsigned View Enabled

.. odsafig:: Images/DebugValue4.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: All Three Views

   Figure 9: All Three Views Enabled

The Eclipse Console
===================
So you can now view memory, set breakpoints and even step through functions to
the points you care about. What's next? Well by now you should be familiar with
gdb. gdb's command line interface is very handy for dumping information quickly
and programmatically. Eclipse has a similar functionality. Eclipse's Display
window is a debug terminal. If the Display window is not visible you can
enable it using ``Window->Show View->Display``. Once the Display window is open
you can turn on autocomplete by right clicking and selecting Content Assist, or
by hitting CTRL-SPACE. The Display window allows you to write Java code and then
execute it. Anytime you pause your program, you may access local variables,
change them, and print information out about them. In the below example
I have chosen to debug the String ``loc`` out to the output. While this particular
example may not appear useful (as the program will print ``loc`` anyway), imagine
you are debugging a program. You know a bug occurs, now instead of stopping and
recompiling your program with bug changes, you can rapidly prototype
your replacement code and then test the values to insure success.

.. odsafig:: Images/DebugDisplay1.png
   :align: center
   :capalign: center
   :figwidth: 90%
   :alt: Result Of Running Display

   Figure 9: The Display

Conditional Breakpoints
=======================
Often times when troubleshooting you may wish to stop at breakpoint at certain
times. However adding in additional code to catch those specified conditions
can lead to issues later if you forget to remove the additional code.
Fortunately many debuggers have the functionality to only stop at breakpoints
when needed.

Step 1: Create a breakpoint. For this example I will be using the source code
from the memory pool that is randomly filled with characters. I want to hit my
breakpoint if and only if the value of ind is 10.

.. odsafig:: Images/DebugConditionalBreakpoint.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Breakpoint set

Step 2: Right click on the breakpoint and select Breakpoint Properties

Step 3: You will then be presented with a screen similar to the picture below.
There are two option to halt at a breakpoint: by hitcount and when a condition
is satisfied. For this example I have chosen to stop my program only when the
randomly generated index is equal to 10. Choose the option you would like, if
you choose conditional, create an arbitrary boolean expression to satisfy.

.. odsafig:: Images/DebugConditional.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :scale: 50%
   :alt: Breakpoint condition

By making use of conditional breakpoints you can speed up debugging and eliminate
the chance of accidentally progressing too far. For more information on using
breakpoints check out Eclipse's official documentation found
`here <https://wiki.eclipse.org/FAQ_How_do_I_set_a_conditional_breakpoint%3F>`__.
