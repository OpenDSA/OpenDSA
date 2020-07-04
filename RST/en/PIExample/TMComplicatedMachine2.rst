.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Xiaolin Zhou
   :topic: Turing Machine Continued 4


Turing Machine Continued 4
================================

Making More Complicated Machines
-------------------------------

Obviously, Turing Machines can take an input and modify it. We will see examples of how this leads to powerful computational capability, even if it does not seem yet like they are so powerful. To get a quick idea of their power, consider the following relatively simple machine to accept L(anbncn). This is significant, because this language is in fact not context free! Which means that this simple Turing Machine is doing something that no DFA, NFA, or PDA can do!

.. inlineav:: TMComplicatedMachine2 ff
   :links: AV/PIExample/TuringMachine/TMComplicatedMachine2.css
   :scripts:  lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/PIExample/TuringMachine/TMComplicatedMachine2.js DataStructures/PIFrames.js 
   :output: show
