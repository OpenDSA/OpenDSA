.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic: Turing Machines
   
.. odsalink:: AV/SeniorAlgAnal/Turing1CON.css
.. odsalink:: AV/SeniorAlgAnal/Turing2CON.css
.. odsalink:: AV/SeniorAlgAnal/Turing3CON.css
.. odsalink:: AV/SeniorAlgAnal/Turing4CON.css
.. odsalink:: AV/SeniorAlgAnal/Turing5CON.css

Turing Machines
===============

A General Model of Computation
------------------------------

We would like to define a general model of computation that is as
simple as possible.
The reason is that we want to be able to understand the limits of what
is possible in computing, but that is rather hard to do with a
complicated definition for a "computer" is.
But then, we need to be confident that whatever model we do pick, that
it actually represents all of the fundamental capabilities of a
"computer".

"State machines" are simple to understand.
There are a number of different state machines, with a range of
capabilities.
We will discuss a particular one, called a :term:`Turing machine`.
As we define "capability", the key is *ability*, not *efficiency*.

The necessary capabilites for any such "machine" are these:

* Read
* Write
* Compute

A Turing machine is defined as follows.
It has a tape, divided into squares, with a fixed left end and
extending infinitely to the right.
Each square can store one character.
The machine has a single I/O head that at any instant in time is "on"
one of the squares.
The control unit of the machine is defined by a set of abstract
:term:`states`.
At any given instant, the machine is said to be
"in" one of the states, and has a set of actions that can be performed
when in that state.
From the current state, the machine will read the symbol on the
current state, and can then do one of the following:

* Change the current symbol.
* Move the I/O head one square to either the left or the right.

By convention, the machine ceases to perate if the head moves off the
left end of the tape, or if the control unit sends the machine into a
specially designated :term:`halt state`.

The input to the machine is the intial contents of the tape, which is
described by listing all of the tape squares from the left to the
rightmost non-blank tape.
Naturally, there must be a finite number of non-blank symbols on the
tape.
The :term:`alphabet` of the machine consists of some letters,
including the special symbol :math:`\#` which means a blank symbol on the
given square.

A Turing machine is formally defined as a quadruple
(:math:`K`, :math:`\Sigma`, $\delta$, $s$) where

* :math:`K` is a finite set of states (not including :math:`h`, the
  halt state).
* :math:`\Sigma` is an alphabet (containing :math:`\#`, not :math:`L`
  or :math:`R`).
* :math:`s \in K` is the :term`initial state`.
* :math:`\delta` is a function from :math:`K \times \Sigma` to
  :math:`(K \cup \{h\}) \times (\Sigma \cup \{L, R\})`.

Note that including :math:`\#` in the language is for convenience
only.
We want to be able to read our specifications without being confused.

If :math:`q \in K`, :math:`a \in \Sigma` and
:math:`\delta(q, a) = (p, b)`,
then when in state :math:`q` and scanning :math:`a`,
enter state :math:`p` and

#. If :math:`b \in \Sigma` then replace :math:`a` with :math:`b`.
#. Else (:math:`b` is :math:`L` or :math:`R`): move head.

.. topic:: Example

   :math:`M = (K, \Sigma, \delta, s)` where

   * :math:`K = \{q_0, q_1\}`,
   * :math:`\Sigma = \{a, \#\}`,
   * :math:`s = q_0`
   * :math:`\delta =`

     .. math::     

        \begin{array}{lll}
        \hline
        q&\sigma&\delta(q, \sigma)\\
        \hline
        q_0&a&(q_1, \#)\\
        q_0&\#&(h, \#)\\
        q_1&a&(q_0, a)\\
        q_1&\#&(q_0, R)\\
        \end{array}

   Its interesting to note that state :math:`(q_1, a)` cannot happen
   if the start state is :math:`q_0`. 
   This is included only for completness (to make :math:`\delta1` a
   total function.

   This machine will scan right, changing any :math:`a` that it sees
   to a :math:`\#`.
   When it first hits a :math:`\#`, it will halt.

.. topic:: Example

   :math:`M = (K, \Sigma, \delta, s)` where

   * :math:`K = \{q_0\}`,
   * :math:`\Sigma = \{a, \#\}`,
   * :math:`s = q_0`,
   * :math:`\delta =`

     .. math::

        \begin{array}{lll}
        \hline
        q&\sigma&\delta(q, \sigma)\\
        \hline
        q_0&a&(q_0, L)\\
        q_0&\#&(h, \#)\\
        \end{array}

   This machine will scan left until it encounters :math:`\#`, and
   then halt.


.. inlineav:: Turing1CON dgm
   :align: center

   A first Turing Machine

|

.. inlineav:: Turing2CON dgm
   :align: center

   A second Turing Machine

|

.. inlineav:: Turing3CON dgm
   :align: center

   A third Turing Machine

|

.. inlineav:: Turing4CON dgm
   :align: center

   A fourth Turing Machine

|

.. inlineav:: Turing5CON dgm
   :align: center

   A fifth Turing Machine

.. odsascript:: AV/SeniorAlgAnal/Turing1CON.js
.. odsascript:: AV/SeniorAlgAnal/Turing2CON.js
.. odsascript:: AV/SeniorAlgAnal/Turing3CON.js
.. odsascript:: AV/SeniorAlgAnal/Turing4CON.js
.. odsascript:: AV/SeniorAlgAnal/Turing5CON.js
