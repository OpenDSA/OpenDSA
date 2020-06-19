.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: Turing Machines

Turing Machines
===============

Turing Machines
---------------

A General Model of Computation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

The necessary capabilities for any such "machine" are these:

* Read
* Write
* Compute

A Turing machine is defined as follows.
It has a one-dimensional tape, divided into squares.
This tape extends infinitely to the left and to the right.
Each square can store one character.
The machine has a single I/O head that at any instant in time is "on"
one of the squares.
The control unit of the machine is defined by a set of abstract
:term:`states <state>`.
At any given instant, the machine is said to be
"in" one of the states, and has a set of actions that can be performed
when in that state.
From the current state, the machine will read the symbol on the
current square, and will then do the following (depending on the value
of the symbol that it sees):

* Overwrite that symbol with a new symbol,
* Move the tape head either left (:math:`L`), right (:math:`R`), or
  stay (:math:`S`)

The letters that can appear on the tape are an important part of the
definition for a given Turing machine.
The :term:`alphabet` of the machine is these letters that may appear
in the input.
In addition to the letters of the alphabet that can define an input
string, there is also the blank character.
When talking about strings, since a blank is hard to see, we will use
the :math:`\#` character to represent a blank character.
Note that including :math:`\#` in the alphabet is for convenience
only.
We want to be able to read our specifications without being confused.

The input to the machine is the initial contents of the tape, which is
described by listing all of the tape squares from the leftmost
non-blank tape cell to the rightmost non-blank tape cell.
Naturally, there must be a finite number of non-blank symbols on the
tape.
And the input string might have some blank squares in between the
non-blank squares that define the input.

Now, we know that at any instant the machine is in some state, and
that the input head is under some square on the tape.
The machine reads the symbol, and responds by going to some state
(possibly the current state, possibly another state), writing some
letter onto the square (possibly the same letter as is currently in
the square, possibly another), and then moving the head either one
square left, one square right, or leaving the head in the current
square.
That is everything that the machine can do.

A Turing machine is formally defined as
(:math:`Q`, :math:`\Sigma`, :math:`\Gamma`, $s$,
:math:`F`, :math:`\delta`) where

* :math:`Q` is a finite set of states.
* :math:`\Sigma` is an alphabet. This is used to define the input.
* :math:`\Gamma` is another alphabet that at least includes :math:`\Sigma` and
  :math:`\#`. It might include other symbols, and is the alphabet used
  by the computational process.
* :math:`s \in Q` is the :term:`initial state`.
* :math:`F \subset Q` is the set of :term:`final states <final state>`.
* :math:`\delta` is a partial function from :math:`Q \times \Gamma` to
  :math:`Q \times \Gamma \times \{L, R, S\})`.

The machine operates as follows: For :math:`q \in Q`, :math:`a \in \Sigma` and
:math:`\delta(q, a) = (p, b, m)`,
when in state :math:`q` and scanning :math:`a`,
enter state :math:`p`, replace :math:`a` with :math:`b`, and move the head
(:math:`m` is :math:`L`, :math:`R`, or :math:`S`).

To do computation, we have to have some conventions about starting and
ending the process.
The machine stops immediately if (1) it enters any :term:`final state`,
or (2) it is in a state and scans a character for which there is no
transition.
(Note that there are many ways to define Turing Machines, and some
definitions require an explicit reject state. We do not.)

.. topic:: Example

   :math:`M = (Q, \Sigma, \Gamma, s, F, \delta)` where

   * :math:`Q = \{q_0, q_1\}`,
   * :math:`\Sigma = \{a\}`,
   * :math:`\Gamma = \Sigma \cup \{\#\}`,
   * :math:`s = q_0`,
   * :math:`F = {q_1}`,
   * :math:`\delta =`

     .. math::

        \begin{array}{lll}
        \hline
        q&\Gamma&(q, \Gamma, \{L, R, S\})\\
        \hline
        q_0&a&(q_0, \#, R)\\
        q_0&\#&(q_1, \#, S)\\
        \end{array}

   This machine will scan right, changing any :math:`a` that it sees
   to a :math:`\#`.
   When it first sees a :math:`\#`, it will halt.

We can also describe a Turing Machine as a graph, whose nodes are the
states in :math:`Q` and with edges corresponding to the transitions in
:math:`\delta`.
Further, we can visualize the processing of the machine as the
movement of a head across the tape.

.. inlineav:: RClearCON ss
   :long_name: Turing Machine RClear
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/RClearCON.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/RClearCON.js
   :align: center
   :output: show

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/TMexercise/addOnea.html pe
   :long_name: Sheet 2 Exercise 1 NFAtoDFA exercise

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/TMexercise/eraseABC.html pe
   :long_name: Sheet 2 Exercise 1 NFAtoDFA exercise

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/TMexercise/keepABC.html pe
   :long_name: Sheet 2 Exercise 1 NFAtoDFA exercise

.. topic:: Example

   Here is an example of a machine that is slightly more complicated.
   This Turing machine accepts the language :math:`L(a^*b^*c^*)`.

   :math:`M = (Q, \Sigma, \Gamma, s, F, \delta)` where

   * :math:`Q = \{q_0, q_1, q_2, q_3\}`,
   * :math:`\Sigma = \{a, b, c\}`,
   * :math:`\Gamma = \Sigma \cup \{\#\}`,
   * :math:`s = q_0`,
   * :math:`F = {q_2}`,
   * :math:`\delta =`

     .. math::

        \begin{array}{lll}
        \hline
        q&\Gamma&(q, \Gamma, \{L, R, S\})\\
        \hline
        q_0&a&(q_0, a, R)\\
        q_0&b&(q_1, b, R)\\
        q_0&c&(q_2, c, R)\\
        q_0&\#&(q_3, \#, S)\\
        q_1&b&(q_1, b, R)\\
        q_1&c&(q_2, c, R)\\
        q_1&\#&(q_3, \#, S)\\
        q_2&c&(q_2, c, R)\\
        q_2&\#&(q_3, \#, S)\\
        \end{array}

   However, this specification is missing something important.
   Regardless of what input you give it on the tape, it will execute
   something and eventually halt.
   But how do we know if the machine has determined that the string is
   in the language or not?
   The answer is that we use a convention.
   First, we only care about what happens when the machine starts with
   the head scanning the first non-blank character.
   Second, we use the convention that the string is accepted as being
   in the language if the machine halts in a Final State (:math:`q_3`
   in this case), and the string is rejected if the machine halts by
   following an undefined transition.
   For example, on the string "abac", when the second 'a' is
   encountered there is no transition for what to do.
   So, the machine halts, and we interpret this to mean that the
   string has been rejected since it is not currently in a Final State.

   Here is the graphical view of the machine.

   .. inlineav:: TMabcCON dgm
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMabcCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMabcCON.js
      :align: center
      :output: show

   |


Interpreting Turing Machines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A :term:`configuration` for a Turing machine looks like this:

.. math::
   (q, \underline{a}aba)

This means that the TM is on state :math:`q`,
the tape contains :math:`\underline{a}aba` and the read/write
head position is on the underlined 'a'.
Recall that we assume at the start of processing input for any TM,
the read/write head position is on the leftmost non-blank character.

Don't forget that the tape is infinite in both directions.
So to the left of the leftmost 'a' in this configuration is an
infinite number of blank squares, and to the right of the rightmost a
is also an infinite number of blank squares.

A :term:`halted configuration` occurs when the machine does not find
a move from the current state using the current tape letter
(the current configuration).
In other words, a TM halts if there is no :math:`\delta` defined.
Note that we never define any transitions out of any Final State.
So there is some redundancy when we said earlier that the
machine halts when either it is in any Final State, or when there is
no current transition.
But having two such definitions for halting makes it easy to define
the difference between accepting and rejecting a string.

A :term:`computation` is a sequence of configurations of some
length :math:`n \geq 0`.

.. topic:: Example

   Recall the TM example that erases all a's from the tape.
   Here are the configurations for the input "aaaa".

   .. math::

      \begin{eqnarray*}
      (q_0, \underline{a}aaa) &\vdash_M&(q_0, \underline{\#}aaa)\\
      &\vdash_M&(q_0, \#\underline{\#}aa)\\
      &\vdash_M&(q_0, \#\#\underline{\#}a)\\
      &\vdash_M&(q_0, \#\#\#\underline{\#})\\
      &\vdash_M&(q_1, \#\#\#\#\underline{\#})\\
      \end{eqnarray*}
      
**Notation**: Given a string :math:`w`, the notation
:math:`\underline{w}` for a configuration means that the read/write
head is scanning the leftmost character in :math:`w`.


:math:`M` is said to **halt** on input :math:`w` iff
:math:`(s, \underline{w})` yields some halted configuration.

:math:`M` is said to **hang** on input :math:`w` if
:math:`(s, \underline{w})` yields some hanging configuration.

Wait, what? What is a "hanging" configuration?
The machine hangs when it goes into an infinite loop.
Anytime you provide the mechanism to create loops that only end on a
condition, you have also created the conditions that might allow an
infinite loop to happen.
Consider the following machine on strings of a's and b's that scans
right until it sees a 'b'.
If it never sees a 'b', then it will never halt.
This means that it goes into an infinite loop (or hangs) anytime the
input string does not contain a 'b'.

.. inlineav:: TMabCON dgm
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMabCON.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMabCON.js
   :align: center
   :output: show



Turing Acceptors and Turing Transducers
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Turing machines compute functions from strings to strings.
Formally: Let :math:`f` be a function from :math:`\Sigma^*_0` to
:math:`\Sigma^*_1`.
Turing machine :math:`M` is said to **compute** :math:`f` when,
for any string :math:`w \in \Sigma^*_0`, if :math:`f(w) = u` then

.. math::

   (s, \#\underline{w}) \vdash^*_M (h, \#u\underline{\#})

for some state :math:`h \in F` (that is, a Final State for :math:`M`).

Such a function :math:`f` is said to be a
:term:`Turing-computable function`.

Here is how we express multiple parameters:
For :math:`f(w_1, ..., w_k) = u`,

.. math::

   (s, \#\underline{w_1}\#w_2\#...\#w_k) \vdash^*_M (h, \#u\underline{\#}).

One way to express functions on natural numbers is to represent a
number using :term:`unary notation`.
(Remember, we are not concerned about what is efficient, we are concerned
about what is possible.)
In this case, we represent the value 0 as an empty string.
We say that :math:`f: \mathbb{N} \rightarrow \mathbb{N}`
is computed by :math:`M` if :math:`M`
computes :math:`f': \{I\}^* \rightarrow \{I\}^*` where
:math:`f'(I^n) = I^{f(n)}` for each :math:`n \in \mathbb{N}`.

.. topic:: Example

   Compute :math:`f(n) = n + 1` for any :math:`n \in \mathbb{N}`.

   .. math::

      \begin{array}{lll}
      \hline
      q&\sigma&\delta(q, \sigma)\\
      \hline
      q_0&I&(q_0, I, R)\\
      q_0&\#&(h, I, R)\\
      \end{array}

   An example computation:

   .. math::

      (q_0, \#\underline{I}I\#) \vdash_M (q_0, \#I\underline{I}\#) \vdash_M
      (q_0, \#II\underline{\#}) \vdash_M (h, \#III\underline{\#}).

   .. inlineav:: TMPlusoneCON ss
      :long_name: Turing Machine Replace
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMPlusoneCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMPlusoneCON.js
      :align: center
      :output: show

   In general,
   :math:`(q_0, \#\underline{I^n}\#) \vdash^*_M (h, \#I^{n+1}\underline{\#})`.
   What about :math:`n = 0`?
   The input is no marks in unary, and it works OK (that is, the
   result is the head to the right of a single mark).


Turing-Decidable vs. Turing-Acceptable Languages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Recall that we defined a convention for accepting/rejecting whether an
input string is in a specified language:
The string is accepted as being in the language if the machine halts
in a Final State, and the string is rejected if the machine halts by
following an undefined transition.
The key here is that the machine halts (with separate mechanisms for
accept or reject).
We define a language to be :term:`Turing-decidable`
if every string results in one of these two outcomes.

Unfortunately, there is a third possible outcome:
The machine might go into an infinite loop.

We can define another concept: :math:`Turing-acceptable`.
We say that machine :math:`M` :term:`accepts <accept>` a string
:math:`w` if :math:`M` halts on input :math:`w`.
Then,

* :math:`M` accepts a language iff :math:`M` halts on :math:`w` iff
  :math:`w \in L`.
* A language is :math:`Turing-acceptable` if there is some Turing
  machine that accepts it.

So, a language is Turing-decidable if it halts on every input, in two
different ways so that we can tell if the string is in the language or
not.
Separately, a language is Turing-acceptable if it halts on strings in
the language, and does not halt on strings not in the language.

It is easy to turn any Turing-decidable machine into a
Turing-acceptable machine.
If the machine would reject the string, then simply go into an
infinite loop by moving right regardless of the value of the symbol
seen.
But, can every Turing-acceptable machine be converted into a
Turing-decidable machine?

Consider this example:
Example: :math:`\Sigma_0 = \{a, b\}`,
:math:`L = \{w \in \Sigma^*_0: w\ \mbox{contains at least one}\ a\}`.

.. math::

   \begin{array}{lll}
   \hline
   q&\sigma&\delta(q, \sigma, \{R, L, S\})\\
   \hline
   q_0&a&(h, a, R)\\
   q_0&b&(q_0, b, R)\\
   q_0&\#&(q_0, \#, R)\\
   \hline
   \end{array}

This machine is Turing-acceptable.
It halts if it sees an 'a', and it hangs if there is no 'a'.

Is this language Turing decidable?
Of course.
Instead of running right when a # is seen, the machine can halt.
Here is the modified machine:

.. math::

   \begin{array}{lll}
   \hline
   q&\sigma&\delta(q, \sigma, \{R, L, S\})\\
   \hline
   q_0&a&(h, a, R)\\
   q_0&b&(q_0, b, R)\\
   \hline
   \end{array}

All that we have done is remove the transition for what to do when a
blank symbol is seen.
Thus, the machine halts instead of moving to the right (thus starting
the infinite loop).

(You might ask: But what if there is an 'a' to the right of the #?
Recall that we only care about the machine's behavior when it begins
in a legal start configuration.)

But, we can ask again: Is every Turing-acceptable language Turing
decidable?
In other words, whenever the Turing-acceptable machine would hang,
can we *always* replace it with logic to trigger a non-existant
transition instead?
This is known as the :term:`Halting Problem`.

It turns out that we can **prove** that there are always languages
that cannot be converted from Turing-acceptable to Turing-decidable.
In other words, we can **prove** that the Halting Problem is
unsolveable.


Making More Complicated Machines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Obviously, Turing Machines can take an input and modify it.
We will see examples of how this leads to powerful computational
capability, even if it does not seem yet like they are so powerful.
To get a quick idea of their power, consider the following relatively
simple machine to accept :math:`L(a^nb^nc^n)`.
This is significant, because this language is in fact not context
free!
Which means that this simple Turing Machine is doing something that no
DFA, NFA, or PDA can do!

.. inlineav:: TManbncnCON ss
   :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TManbncnCON.css
   :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TManbncnCON.js
   :align: center
   :output: show

But while Turing machines might be able to do powerful things, when
operating at the individual state level, it can get rather difficult
and tedious to program them.
In fact, it might feel in some ways like writing machine code or
assembly language.
The secret to success in modern software development is to build up
more powerful tools,
especially by packaging behavior together and manipulating the
packages.
We can hope to build up similar capability with Turing Machines.

.. .. TODO::    :type: Old Prose
.. 
   [This is old prose from when our basic model was a one-sided
   infinite tape. That was easy to explain composition since you knew
   that any given machine cannot run arbitrarily left. Its not nearly
   so easy explain composition without that to rely on. We need
   something new to replace this.]
..    
   Since we are not using a one-sided tape, the following material
   needs to be replaced with a treatment like in Linz. 
   Note that the Stay "move" simplifies the if-then-else as compared
   to Linz.
   
**Lemma**: If

   .. math::

      (q_1, w_1\underline{a_1}u_1) \vdash_M^* (q_2, ww_2\underline{a_2}u_2)

   for string :math:`w` and

   .. math::

      (q_2, w_2\underline{a_2}u_2) \vdash^*_M (q_3, w_3\underline{a_3}u_3),

   then

   .. math::

      (q_1, w_1\underline{a_1}u_1) \vdash^*_M (q_3, ww_3\underline{a_3}u_3).

   Insight: Since
   :math:`(q_2, w_2\underline{a_2}u_2) \vdash^*_M (q_3, w_3\underline{a_3}u_3)`,
   this computation must take place without moving the head left of :math:`w_2`
   The machine cannot "sense" the left end of the tape.
   (And if it had moved left, it would have hung.)
   Thus, the head won't move left of :math:`w_2` even if it is not at the
   left end of the tape.

   This means that Turing machine computations can be combined into
   larger machines:

   * :math:`M_2` prepares string as input to :math:`M_1`.
   * :math:`M_2` passes control to :math:`M_1` with I/O head at the
     end of the input.
   * :math:`M_2` retrieves control when :math:`M_1` has completed.

Here are some basic machines and notation

* :math:`|\Sigma|` symbol-writing machines (one for each symbol):
  Any give letter :math:`\sigma` has a symbol-writing machine named
  :math:`\sigma`.
* Head-moving machines, named :math:`R` and :math:`L`, move the head
  appropriately.
* Start state indicated with :math:`>`.
* Transitions on anything other than (for example) :math:`\#` are
  labeled :math:`\overline{\#}`
* Multiple copies of a machine get a superscript: :math:`R^2` means
  move right twice.


.. inlineav:: Turing1CON dgm
   :links: AV/SeniorAlgAnal/Turing1CON.css
   :scripts: AV/SeniorAlgAnal/Turing1CON.js
   :align: center

   First do :math:`M_1`, then do :math:`M_2` or :math:`M_3` depending
   on the current symbol.

|

.. inlineav:: Turing2CON dgm
   :links: AV/SeniorAlgAnal/Turing2CON.css
   :scripts: AV/SeniorAlgAnal/Turing2CON.js
   :align: center

   (For :math:`\Sigma = \{a, b,c\}`) Move head to the right until a
   blank is found.
   We will use the notation :math:`R_{\#}` for this process.

|

.. inlineav:: Turing3CON dgm
   :links: AV/SeniorAlgAnal/Turing3CON.css
   :scripts: AV/SeniorAlgAnal/Turing3CON.js
   :align: center

   Two views of a simple machine to find the first blank square to the
   left, and then transition to machine :math:`M`.
   The version on the left shows this in greater detail.
   In the more abstract notation on the right, we use the notation
   :math:`L_{\#}`, and the transition to :math:`M` on the horizontal
   line is assumed to occur on seeing the first :math:`\#` symbol.

|

.. inlineav:: TuringCopyCON dgm
   :links: AV/SeniorAlgAnal/TuringCopyCON.css
   :scripts: AV/SeniorAlgAnal/TuringCopyCON.js
   :align: center

   Copy Machine: Transform :math:`\#w\underline{\#}` into
   :math:`\#w\#w\underline{\#}`.
   Note the difference between :math:`L_{\#}` in the start state
   (which means move left until seeing the first blank), and
   :math:`L\#` at the bottom (which means move left and then write a
   space).

|

.. inlineav:: TuringShiftCON dgm
   :links: AV/SeniorAlgAnal/TuringShiftCON.css
   :scripts: AV/SeniorAlgAnal/TuringShiftCON.js
   :align: center

   Shift a string right.


Turing Machine Extensions
~~~~~~~~~~~~~~~~~~~~~~~~~

When we give extensions or new functionality to a computing system,
sometimes they change something fundamental about the capabilities of
the system.
For example, when we add non-determinism to an algorithm, we **might**
change the cost of the underlying problem from exponential to
polynomial time.
But, other changes do nothing fundamental.
In terms of Turing machines, our concern is what the machine can do,
rather than how long it takes to do it.
Does non-determinism help us to solve the Halting problem?
No.
Likewise, the following extensions do not increase the power of Turing
Machines.

* Limit the tape to be infinite in only one direction

  Our first example actually demonstrates that some limitations do not
  make a difference.
  Many textbooks on formal languages present the basic Turing Machine
  as having a tape that is infinite in only one direction.
  The folling diagram shows that we can easily simulate a tape
  infinite in two directions with a one-direction infinite tape.

  .. inlineav:: TuringExt1CON dgm
     :links: AV/SeniorAlgAnal/TuringExt1CON.css
     :scripts: AV/SeniorAlgAnal/TuringExt1CON.js
     :align: center

  The idea is to just bend the 2-way infinite tape in the middle, and
  store both directions of the tape into a single cell.
  This requires a greatly expanded alphabet, because we now need to be
  able to represent any combination of two characters.
  This will need more states, and probably more time.
  But it does not allow anything new in terms of capability.

* Multiple tapes (each with its own head)

  Again, we can simulate this with encoding multiple symbols into a
  single table cell.
  For example, to simulate two tapes (each with a head), we encode in
  each cell the corresponding two symbols, and two binary markers to
  indicate if the tape head is currently in the corresponding cell of
  the two tapes.

  .. inlineav:: TuringExt2CON dgm
     :links: AV/SeniorAlgAnal/TuringExt2CON.css
     :scripts: AV/SeniorAlgAnal/TuringExt2CON.js
     :align: center

* Multiple heads on one tape

  This is easier than encoding multiple tapes.
  We merely encode the heads onto the tape, and simulate moving them
  around.

* A two-dimensional "tape"

  All that we need to do is find a mapping from 2D to 1D, which is
  fairly easy.
  One approach is to work in diagonals, in the order (0, 0), (0, 1),
  (1, 0), (0, 2), (1, 1), (2, 0), and so on.

  .. inlineav:: TuringExt3CON dgm
     :links: AV/SeniorAlgAnal/TuringExt3CON.css
     :scripts: AV/SeniorAlgAnal/TuringExt3CON.js
     :align: center

* Non-determinismFormalLanguages2

  We can simulate non-deterministic behavior in sequence, doing all
  length 1 computations, then length 2, etc., until we reach a halt
  state for one of the non-deterministic choices.
  So we see that while non-determinism can save a lot of time, it does
  not change what can (eventually) be done.
