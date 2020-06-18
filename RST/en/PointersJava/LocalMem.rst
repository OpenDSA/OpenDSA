.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Nick Parlante, Cliff Shaffer, Sally Hamouda and Mostafa Mohammed
   :requires: Pointer intro
   :satisfies: Local memory
   :topic: Pointers

Local Memory
============

Local Memory
------------

Thanks For The Memory: Allocation and Deallocation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

:term:`Local variables <local variable>` are the programming structure
everyone uses but no one thinks about.
You think about them a little when first mastering the syntax.
But after a few weeks, the variables are so automatic that you soon
forget to think about how they work.
This situation is a credit to modern programming languages |---| most
of the time variables appear automatically when you need them, and
they disappear automatically when you are finished.
For basic programming, this is a fine situation.
However, for advanced programming, it's going to be useful to have an
idea of how variables work.

Variables represent storage space in the computer's memory.
Each variable presents a convenient name like ``length`` or ``sum`` in
the source code.
Behind the scenes at runtime, each variable uses an area of the
computer's memory to store its value.
It is not the case that every variable in a program has a permanently
assigned area of memory.
Instead, modern languages are smart about giving memory to a variable
only when necessary.
The terminology is that a variable is :term:`allocated` when it is given an
area of memory to store its value.
While the variable is allocated, it can operate as a variable
in the usual way to hold a value.
A variable is :term:`deallocated` when the system reclaims the memory
from the variable, so it no longer has an area to store its value.
For a variable, the period of time from its allocation until its
deallocation is called its :term:`lifetime`.
Within a program, the parts of the program that can see and access the
variable are its :term:`scope`.

The most common variables you use are :term:`local variables` within
functions such as the variables ``num`` and ``result`` in the
following function.
All of the local variables and parameters taken together are called
its :term:`local storage` or just its "locals".

.. codeinclude:: Pointers/LocalMemory

The variables are called "local" to capture the idea that their lifetime is tied
to the function where they are declared.
Whenever the function runs, its local variables are allocated.
When the function exits, its locals are deallocated. 
For the above example, that means that when the ``Square()`` function is called,
local storage is allocated for ``num`` and ``result``.
Statements like ``result = num * num``; in the function use the local
storage.
When the function finally exits, its local storage is deallocated.

Here is a more detailed version of the rules of local storage:

#.  When a function is called, memory is allocated for all of its
    locals.
    In other words, when the flow of control hits the starting
    ``{`` symbol for the function, all of its locals are allocated
    memory.
    Parameters such as num and local variables such as result
    in the above example both count as locals.
    The only difference between parameters and local variables is that
    parameters start out with a value copied from the caller while
    local variables start with initial values.
    Our examples mostly use simple ``int`` variables,
    however local allocation works for any type, including arrays and
    reference variables.
    These can also be allocated locally.

#. The memory for the locals continues to be allocated so long as the
   thread of control is within the owning function.
   Locals continue to exist even if the function temporarily passes
   off the thread of control by calling another function.
   The locals exist undisturbed through all of this.

#. Finally, when the function finishes and exits, its locals are
   deallocated.
   Does this make sense?
   Suppose the locals were somehow to continue to exist |---| how
   could the code even refer to them?
   The names like ``num`` and ``result`` only make sense within
   the body of ``Square()`` anyway.
   Once the flow of control leaves that function body, there is no
   longer a way to refer to the locals even if they were allocated.
   That locals are available ("scoped") only within their
   owning function is known as :term:`lexical scoping`.
   Pretty much all languages do it that way now.


Here is a simple example of the lifetime of local storage.

.. inlineav:: simpleLifetimeCON ss
   :links: AV/Pointers/simpleLifetimeCON.css
   :scripts: AV/Pointers/simpleLifetimeCON.js
   :output: show

Here is a larger example that shows how the simple rule "the locals
are allocated when their function begins running and are deallocated
when it exits" can build more complex behavior.
You will need a firm grasp of how local allocation works to understand the
material in later modules.
The following slides show the sequence of allocations and deallocations that
result when the function X() calls the function Y() twice.

.. inlineav:: T1-T5CON ss
   :links: AV/Pointers/T1-T5CON.css
   :scripts: AV/Pointers/T1-T5CON.js
   :output: show

The slideshow showed how the sequence of the locals are allocated and
deallocated.
Note how in the slideshow we "stacked up" the local variables that are
created when a function is called.
This is actually how local variables are typically implemented by any
programming language's runtime environment.
The local variables are contained in something called 
the :term:`runtime stack`.
In effect, the slideshow is showing the operation over time of
the runtime stack as this example is being executed.


Local Parameters
~~~~~~~~~~~~~~~~

Local variables are tightly associated with their function |---| they
are used there and nowhere else.
Only the ``X()`` code can refer to its ``a`` and ``b``.
Only the ``Y()`` code can refer to its ``p`` and ``q``.
This independence of local storage is the root cause of both its
advantages and disadvantages.


Advantages Of Locals
~~~~~~~~~~~~~~~~~~~~

Locals are great for 90% of a program's memory needs:

* Convenient. Locals satisfy a convenient need |---| functions often need
  some temporary memory which exists only during the function's
  computation. Local variables conveniently provide this sort of
  temporary, independent memory.

* Efficient. Relative to other memory use techniques, locals are
  efficient.
  Allocating and deallocating them is time efficient (fast) 
  and they are space efficient in the way they use and recycle memory

* Local Copies. Local parameters are basically local copies of the
  information from the caller.
  This is also known as :term:`pass by value`.
  Parameters are local variables which are initialized with an
  assignment (``=``) operation from the caller.
  The caller is not "sharing" the parameter value with the callee in
  the pointer sense |---| the callee is getting its own copy.
  This has the advantage that the callee can change its local copy
  without affecting the caller.
  (Such as with the ``p`` parameter in the above example.)
  This independence is good since it keeps the operation of the caller
  and callee functions separate which follows the rules of good software
  engineering |---| keep separate components as independent as possible.


Disadvantages Of Locals
~~~~~~~~~~~~~~~~~~~~~~~

There are two disadvantages of Locals:

#. Short Lifetime. Their allocation and deallocation schedule (their
   "lifetime") is very strict.
   Sometimes a program needs memory which continues to be allocated
   even after the function which originally allocated it has
   exited.
   Local variables will not work since they are deallocated
   automatically when their owning function exits.
   This problem will be solved in a later section with
   :term:`heap` memory.

#. Restricted Communication. Since locals are copies of the caller
   parameters, they do not provide a means of communication from the
   callee back to the caller.
   This is the flip side of the "independence" advantage |---|
   its not always and advantage.
   Also, sometimes making copies of a value is undesirable for other
   reasons.
   We will see the solution to this problem in the next module.


Synonyms For "Local"
~~~~~~~~~~~~~~~~~~~~

Local variables are also known as
:term:`automatic variables <automatic variable>` since
their allocation and deallocation is done automatically as part of the
function call mechanism.
Local variables are also sometimes known as
:term:`stack variables <stack variable>` 
because, at a low level, languages almost always implement local
variables using a stack structure in memory.


Local Memory Summary
~~~~~~~~~~~~~~~~~~~~

Locals are very convenient for what they do |---| providing convenient
and efficient memory for a function which exists only so long as the
function is executing.
Locals have two deficiencies which we will address in the following
section |---| how a function can communicate back to its caller, and
how a function can allocate separate memory with a less constrained
lifetime.


How Does The Function Call Stack Work?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You do not need to know how local variables are implemented during a
function call to be able to use them correctly,
but here is a rough outline of the steps if you are curious.
The exact details of the implementation are language and compiler
specific.
However, the basic structure below approximates the method used by
many different systems and languages.

To call a function such as ``foo(6, x+1)``:

1. Evaluate the actual parameter expressions, such as the ``x+1``, in the
   caller's context.

2. Allocate memory for ``foo()``'s locals by pushing a suitable "local
   block" of memory onto a runtime :term:`call stack` dedicated to this
   purpose.
   For parameters but not local variables, store the values
   from step (1) into the appropriate slot in ``foo()``'s local
   block.

3. Store the caller's current address of execution (its "return
   address") and switch execution to ``foo()``.

4. ``foo()`` executes with its local block conveniently available at
   the end of the call stack.

5. When ``foo()`` is finished, it exits by popping its locals off the
   stack and "returns" to the caller using the previously stored
   return address.
   Now the caller's locals are on the end of the stack
   and it can resume executing.

For the extremely curious, here are other miscellaneous notes on the
function call process:

* This is why infinite recursion results in a
  "Stack Overflow Error" |---| the code keeps calling and calling
  resulting in steps (1) (2) (3), (1) (2) (3), but never a step (4).
  Eventually the call stack literally runs out of memory.

* This is why local variables have specific initial values based on
  their type.
  Step (2) just pushes the whole local block in one operation.
  Each local gets its own area of memory, but the memory will contain
  whatever the most recent tenant left there.
  These values will be cleared and a default initial
  value will be assigned to all of the locals.

* The "local block" is also known as the function's
  :term:`activation record` or :term:`stack frame`.
  The entire block can be pushed onto the stack (step 2), in a single
  CPU operation |---| it is a very fast operation.
  Why can this be done in a single CPU operation?
  Because pushing an activation record is such a fundamental operation
  for any programming language that CPU designers provide direct
  support for it.

* For a multithreaded environment, each thread gets its own call stack
  instead of just having single, global call stack.

* For performance reasons, some languages pass some parameters through
  registers and others through the stack, so the overall process is
  complex.
  However, the apparent the lifetime of the variables will
  always follow the "stack" model presented here.

