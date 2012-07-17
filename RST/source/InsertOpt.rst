.. avmetadata:: Optimizing Insertion
   :author: Cliff Shaffer
   :prerequisites: Sorting, InsertionSort
   :topic: Sorting
   :short_name: InsertOpt

.. _InsertOpt:

.. index:: Insertion Sort; optimizing

Optimizing Insertion Sort
=========================

Since sorting is used so much, it is natural for programmers to want
to optimize their code to run faster.
There are intersting things to learn from trying to optimize the
simple Insertion Sort code shown in Module
:ref:`Insertion Sort <InsertionSort>`.

One typical algorithmic change that programmers consider for Insertion
Sort relates to use of the ``swap`` function call.
An alternative to continuously swapping the record to the left until a
smaller value is found is to move the current record to a temporary
variable, and then shift all of the records with greater value one
step to the right.
Since swap requires three assignments and shifting requires only one,
it appears that this will be a big improvement.

One of the key things to understand about optimizing is that the
programming language that you use can have a big influence on the
results.
Perhaps the greatest distinction is whether your language is compiled
or not.
Java and C++ are normally compiled, while JavaScript, Processing, and
Python are normally interpreted.
This can make a huge difference in whether a given code change will
actually speed the program up or not.

In the case of the "shift" vs "swap" choice, on a compiled language
like Java the compiler will already do the optimization for you.
Typically the swap operation as we wrote the Insertion Sort code is
clearer than the shift version, so on a compiled language that is
probably a better idea.

However, in an interpreted language like JavaScript, the shift version
will be faster, for two reasons.
The first reason why it is faster is incidental to the intended
"optimization".
That is, a programmer is likely to write the swap operation using a
function call, while doing the shift inline.
And making the function call to the swap function takes a lot of time.
So if one wrote the Insertion Sort with a swap, but replacing the
function call with the actual swap steps, a big speed improvement will
occur.
Changing from the swap to the shift will make a further improvmement,
but not nearly as much.

.. TODO::

   Write a "live code" style exercise for students to take the
   original code for Insertion Sort, with a (hidden?) harness to do
   the timing on an array of a given size. First they should see what
   the basic algorithm costs. Then they should modify it to in-line
   the swap. Then, finally, they should modify it to do the shift
   instead of swap.
