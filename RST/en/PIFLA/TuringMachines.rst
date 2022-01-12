.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Turing Machines

Turing Machines
===============

A General Model of Computation
------------------------------
So far we have seen a few simple machine types, such as DFA, NFA, PDA,
RegEx.
And we have seen corresponding grammars: Regular grammars,
context-free grammars, etc.
There are some differences in the machines.
DFAs are deterministic.
NFAs add non-determinism, which simply means that there can be
multiple choices out of a state for the same input character.
The PDA adds the concept of a stack for storage.

These machines all have some similarities.
They all take an input string.
They all march across the string from left to right, one character at
each step.
They stop when they reach the end of the string and then make a
simple decision: If the machine is in a final state, then it accepts
the string, and otherwise it rejects the string.
In other words, they are :term:`acceptors <acceptor>` for some language.
All that they can do is determine if a string is a member of the
language, and the "more powerful" machines can accept or reject string
from more "complicated" languages.

But there is a lot more that we typically expect when we talk about
"computation".
Like, well, the ability to "compute" rather than simply accept.
What does "compute" actually mean?
For example, we would like to be able to take as input the arithmetic
expression ":math:`2 + 3`" and compute the value 5.
This means that we need to be able to output that computed value 5.
Or put another way, we can "compute" a value by taking the input
string ":math:`2 + 3`" and replacing it with the output string "5".

In its most general form, we can think of everything that a computer
does as taking some string as input, and then providing some string as
output.
Of course, modern peripheral devices like keyboards, mice, and computer
monitors give us rich ways to express input strings (perhaps as button
presses), and rich ways to interpret output strings (say, as
pictures).
But it's not a huge stretch of the imagination to consider computation
as converting an input string to an output string.

This concept of converting is far more powerful than simple accepting.
A machine that takes an input and provides an output is called a
:term:`transducer`.

In the next section, we will introduce a simple machine, the
:term:`Turing Machine`, that is a transducer.
It is only slightly more complicated than the machines that we have
seen so far, and only slightly different in its operation.
But these differences are significant.
Ultimately, we will see that a Turing Machine can do any computation
that even the most sophisticated modern computer can do.


Turing Machines
---------------

.. inlineav:: TMGeneralFS ff
   :links: AV/PIFLA/TM/TMGeneralFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMGeneralFS.js
   :output: show


Interpreting Turing Machines
----------------------------

.. inlineav:: TMInterpretingFS ff
   :links: AV/PIFLA/TM/TMInterpretingFS.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMInterpretingFS.js
   :output: show


Turing-Decidable vs. Turing-Acceptable Languages
------------------------------------------------

.. inlineav:: TMDecidableFS ff
   :links: AV/PIFLA/TM/TMDecidableFS.css
   :scripts:  lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMDecidableFS.js
   :output: show


Making More Complicated Machines part 1
---------------------------------------

Obviously, Turing Machines can take an input and modify it.
We will see examples of how this leads to powerful computational
capability, even if it does not seem yet like they are so powerful.
To get a quick idea of their power, consider the following relatively
simple machine to accept :math:`L(a^nb^nc^n)`.
This is significant, because this language is in fact not context
free.
Which means that this simple Turing Machine is doing something that no
DFA, NFA, or PDA can do!

.. inlineav:: TMComplicated1FS ff
   :links: AV/PIFLA/TM/TMComplicated1FS.css
   :scripts:  lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMComplicated1FS.js
   :output: show

|

.. inlineav:: TMComplicated3FS ff
   :links: AV/PIFLA/TM/TMComplicated3FS.css
   :scripts:  lib/underscore.js DataStructures/FLA/FA.js DataStructures/FLA/TuringMachine.js DataStructures/PIFrames.js AV/PIFLA/TM/TMComplicated3FS.js
   :output: show

|

.. inlineav:: TMcopy ss
   :links: AV/Kochan/TMcopy.css
   :scripts: AV/Kochan/TMcopy.js AV/Juwon/FAcopy.js
   :output: show
