.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic:

Number Problems
===============

Introduction
------------

This moudle presents a variety of algorithms related to mathematical
computations on numbers.
Examples are activities like multiplying two numbers or raising a
number to a given power.
In particular, we are concerned with situations where built-in integer
or floating-point operations cannot be used because the values being
operated on are too large.
Similar concerns arise for operations on polynomials or matrices.

Since we cannot rely on the hardware to process the inputs in a single
constant-time operation, we are concerned with how to most effectively
implement the operation to minimize the time cost.
This begs a question as to how we should apply our normal measures of
asymptotic cost in terms of growth rates on input size.
First, what is an instance of addition or multiplication?
Each value of the operands yields a different problem instance.
And what is the input size when multiplying two numbers?
If we view the input size as two (since two numbers are input),
then any non-constant-time algorithm has a growth rate that is
infinitely high compared to the growth of the input.
This makes no sense, especially in light of the fact that we know from
grade school arithmetic that adding or multiplying numbers does seem
to get more difficult as the value of the numbers involved increases.
In fact, we know from standard grade school algorithms that the cost
of
standard addition is linear on the number of digits being added, and
multiplication has cost :math:`n \times m` when multiplying an
:math:`m` -digit
number by an :math:`n` -digit number.

The number of digits for the operands does appear to be a key
consideration when we are performing a numeric algorithm that is
sensitive to input size.
The number of digits is simply the log of the value, for a suitable
base of the log.
Thus, for the purpose of calculating asymptotic growth rates of
algorithms, we will consider the "size" of an input value to be the
log of that value.
Given this view, there are a number of features that seem to relate
such operations.

* Arithmetic operations on large values are not cheap.
* There is only one instance of value $n$.
* There are :math:`2^k` instances of length :math:`k` or less.
* The size (length) of value :math:`n` is :math:`\log n`.
* The cost of a particular algorithm can decrease when :math:`n`
  increases in value (say when going from a value of :math:`2^k-1`
  to :math:`2^k` to :math:`2^k+1`),
  but generally increases when :math:`n` increases in length.


Exponentiation
--------------

We will start our examination of standard numerical algorithms by
considering how to perform exponentiation.
That is, how do we compute :math:`m^n`?
We could multiply by :math:`m` a total of :math:`n-1` times.
Can we do better?
Yes, there is a simple divide and conquer approach that we can use.
We can recognize that, when :math:`n` is even,
:math:`m^n = m^{n/2}m^{n/2}`.
If :math:`n` is odd, then
:math:`m^n = m^{\lfloor n/2\rfloor}m^{\lfloor n/2\rfloor}m`.
This leads to the following recursive algorithm::

   int Power(int base, int exp) {
     int half, total;
     if exp = 0 return 1;
     half = Power(base, exp/2);
     total = half * half;
     if (odd(exp)) then total = total * base;
     return total;
   }      

Function `Power` has recurrence relation

.. math::

   f(n) = \left\{
   \begin{array}{ll}
   0&n=1\\
   f(\lfloor n/2\rfloor) + 1 + n \bmod 2&n>1
   \end{array}
   \right.

This has solution

.. math::

   f(n) = \lfloor \log n\rfloor + \beta(n) - 1

where :math:`\beta` is the number of 1's in the binary
representation of :math:`n`.

How does this cost compare with the problem size?
The original problem size is :math:`\log m + \log n`,
and the number of multiplications required is :math:`\log n`.
This is far better (in fact, exponentially better) than performing
:math:`n-1` multiplications.


Largest Common Factor
---------------------

We will next present Euclid's algorithm for finding the largest common
factor (LCF) for two integers.
The LCF is the largest integer that divides both inputs evenly.

First we make this observation: If :math:`k` divides :math:`n` and
:math:`m`, then :math:`k` divides :math:`n - m`.
We know this is true because if :math:`k` divides :math:`n` then
:math:`n = ak` for some integer :math:`a`, and if :math:`k` divides
:math:`m` then :math:`m = bk` for some integer :math:`b`.
So, :math:`LCF(n, m) = LCF(n-m, n) = LCF(m, n-m) = LCF(m, n)`.

Now, for any value :math:`n` there exists :math:`k` and :math:`l` such
that

.. math::

   n = km + l\ \mbox{where}\ m > l \geq 0.

From the definition of the :math:`\bmod` function, we can derive
the fact that

.. math::

   n = \lfloor n/m \rfloor m + n \bmod m.

Since the LCF is a factor of both :math:`n` and :math:`m`,
and since :math:`n = km + l`, the LCF must therefore be a factor of both
:math:`km` and  :math:`l`, and also the largest common factor of each
of these terms.
As a consequence, :math:`LCF(n, m) = LCF(m, l) = LCF(m, n \bmod m)`.

This observation leads to a simple algorithm.
We will assume that :math:`n \geq m`.
At each iteration we replace :math:`n` with :math:`m` and
:math:`m` with :math:`n \bmod m` until we have driven :math:`m` to
zero::

   int LCF(int n, int m) {
     if (m == 0) return n;
     return LCF(m, n % m);
   }

To determine how expensive this algorithm is, we need to know how much
progress we are making at each step.
Note that after two iterations, we have replaced
:math:`n` with :math:`n \bmod m`.
So the key question becomes:
How big is :math:`n \bmod m` relative to :math:`n`?

.. math::

   \begin{eqnarray*}
   n \geq m &\Rightarrow& n/m \geq 1\\
   &\Rightarrow& 2\lfloor n/m\rfloor > n/m\\
   &\Rightarrow& m\lfloor n/m\rfloor > n/2\\
   &\Rightarrow& n - n/2 > n - m\lfloor n/m\rfloor = n \bmod m\\
   &\Rightarrow& n/2 > n \bmod m
   \end{eqnarray*}

Thus, function LCF will halve its first parameter in no more than 2
iterations.
The total cost is then :math:`O(\log n)`.
