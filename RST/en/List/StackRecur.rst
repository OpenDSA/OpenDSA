.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :requires: stack
   :satisfies: implementing recursion
   :topic: Lists

Implementing Recursion
======================

WARNING! You should not read this section unless you are already
comfortable with implementing :ref:`recursive <recursion> <Recursion>`
functions.
One of the biggest hang-ups for students learning recursion is too
much focus on the recursive "process".
The right way to think about recursion is to just think about the
return value that the recursive call gives back.
Thinking about *how* that answer is computed just gets in the way of
understanding.
There are good reasons to understand how recursion is implemented,
but helping you to write recursive functions is not one of them.

Perhaps the most common computer application that uses
:ref:`stacks <stack> <StackArray>` is not even visible to its users.
This is the implementation of subroutine calls in most programming
language :term:`runtime environments <runtime environment>`.
A subroutine call is normally implemented by :term:`pushing <push>`
necessary information about the subroutine (including the return
address, parameters, and local variables) onto a stack.
This information is called an :term:`activation record`.
Further subroutine calls add to the stack.
Each return from a subroutine :term:`pops <pop>` the top activation
record off the stack.
As an example, here is a recursive implementation for the factorial
function. 

.. codeinclude:: Misc/Fact 
   :tag: RFact

Here is an illustration for how the internal processing works.

.. _RecurStack:

.. odsafig:: Images/RecurSta.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Implementing recursion with a stack

:math:`\beta` values indicate the address of the program instruction
to return to after completing the current function call.
On each recursive function call to ``fact``, both the return
address and the current value of ``n`` must be saved.
Each return from ``fact`` pops the top activation record off the
stack.

.. TODO::
   :type: Slideshow

   The figure above and the following text should all be rolled into
   a slideshow.

Consider what happens when we call ``fact`` with the value 4.
We use :math:`\beta` to indicate the address of the program
instruction where the call to ``fact`` is made.
Thus, the stack must first store the address :math:`\beta`, and the
value 4 is passed to ``fact``.
Next, a recursive call to ``fact`` is made, this time with value 3.
We will name the program address from which the call is
made :math:`\beta_1`.
The address :math:`\beta_1`, along with the current value for
:math:`n` (which is 4), is saved on the stack.
Function ``fact`` is invoked with input parameter 3.

In similar manner, another recursive call is made with input
parameter 2, requiring that the address from which the call is made
(say :math:`\beta_2`) and the current value for :math:`n` (which is 3)
are stored on the stack.
A final recursive call with input parameter 1 is made, requiring that
the stack store the calling address (say :math:`\beta_3`) and current
value (which is 2).

At this point, we have reached the base case for ``fact``, and so
the recursion begins to unwind.
Each return from ``fact`` involves popping the stored value for
:math:`n` from the stack, along with the return address from the
function call.
The return value for ``fact`` is multiplied by the restored value
for :math:`n`, and the result is returned.

Because an activation record must be created and placed onto the stack
for each subroutine call, making subroutine calls is a relatively
expensive operation. 
While recursion is often used to make implementation easy and clear,
sometimes you might want to eliminate the overhead imposed by the
recursive function calls.
In some cases, such as the factorial function above,
recursion can easily be replaced by iteration.

.. _StackFact:

.. topic:: Example

   As a simple example of replacing recursion with a stack, consider
   the following non-recursive version of the factorial function.

   .. codeinclude:: Misc/Fact
      :tag: Sfact

   Here, we simply push successively smaller values of :math:`n` onto
   the stack until the base case is reached, then repeatedly pop off
   the stored values and multiply them into the result.

An iterative form of the factorial function is both
simpler and faster than the version shown in the example.
But it is not always possible to replace recursion with iteration.
Recursion, or some imitation of it, is necessary when implementing
algorithms that require multiple branching such as in the Towers of
Hanoi algorithm, or when
:ref:`traversing a binary tree <traversal> <BinaryTreeTraversal>`.
The :ref:`Mergesort <Mergesort> <Mergesort>` and
:ref:`Quicksort <Quicksort> <Quicksort>` sorting algorithms
also require recursion.
Fortunately, it is always possible to imitate recursion with a stack.
Let us now turn to a non-recursive version of the Towers of
Hanoi function, which cannot be done iteratively.

.. topic:: Example

   Here is a recursive implementation for Towers of Hanoi.

   .. codeinclude:: Misc/TOH 
      :tag: TOH

   ``TOH`` makes two recursive calls:
   one to move :math:`n-1` rings off the bottom ring, and another to
   move these :math:`n-1` rings back to the goal pole.
   We can eliminate the recursion by using a stack to store a
   representation of the three operations that ``TOH`` must perform:
   two recursive calls and a move operation.
   To do so, we must first come up with a representation of the
   various operations, implemented as a class whose objects will be
   stored on the stack.

   .. codeinclude:: Misc/TOH
      :tag: TOHstack

   We first enumerate the possible operations MOVE and TOH, to
   indicate calls to the ``move`` function 
   and recursive calls to ``TOH``, respectively.
   Class ``TOHobj`` stores five values: an operation value
   (indicating either a MOVE or a new TOH operation), the number of
   rings, and the three poles.
   Note that the move operation actually needs only to store
   information about two poles.
   Thus, there are two constructors: one to store the state when
   imitating a recursive call, and one to store the state for a move
   operation.

   An array-based stack is used because we know that the stack
   will need to store exactly :math:`2n+1` elements.
   The new version of ``TOH`` begins by placing on the stack a
   description of the initial problem for :math:`n` rings.
   The rest of the function is simply a ``while`` loop that pops the
   stack and executes the appropriate operation.
   In the case of a ``TOH`` operation (for :math:`n>0`), we store on
   the stack representations for the three operations executed by the
   recursive version.
   However, these operations must be placed on the stack in reverse
   order, so that they will be popped off in the correct order.

Recursive algorithms lend themselves to efficient implementation with
a stack when the amount of information needed to describe a
sub-problem is small.
For example, :ref:`Quicksort <Quicksort> <Quicksort>` can effectively
use a stack to replace its recursion since only bounds information for
the subarray to be processed needs to be saved.
