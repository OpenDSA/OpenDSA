.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :topic:

Finding Prime Numbers
=====================

How do we tell if a number is prime?
One approach is the prime sieve: Test all prime up to
:math:`\lfloor\sqrt{n}\rfloor`.
This requires up to :math:`\lfloor\sqrt{n}\rfloor -1` divisions.

How does the cost of this algorithm compare to the input size?
A problem instance is a single value, and our model syas that size for
value :math:`n` is :math:`\log n`.
Therefore, this is an exponential time algorithm!

Note that it is easy to check the number of times 2 divides :math:`n`
when using a binary representation.
What about checking for the number of times that 3 divides :math:`n`?
This is not so easy.
What if :math:`n` were represented in trinary?
Then it would be easy to check for divisions by 3.

In general, is there a polynomial time algorithm?
We don't know of one (and that fact is important to modern
cryptography, which relies on the "fact" that factoring large numbers
takes a lot of time.
But what if we are willing to settle for a
probabilistic algorithm?

Here are some useful theorems from Number Theory:

* **Prime Number Theorem**: The number of primes less than :math:`n` is
  (approximately) :math:`\frac{n}{\ln n}`.

* The average distance between primes is :math:`\ln n`.

* **Prime Factors Distribution Theorem**: For large :math:`n`,
  on average, :math:`n` has about :math:`\ln \ln n` different prime
  factors with a standard deviation of :math:`\sqrt{\ln \ln n}`.
  Note that this is quite small.
  For :math:`2^{32}`, :math:`\log \log n = 5`.

To prove that a number is composite, we need only one factor.
And, given a (claimed) factor, it is easy to verify whether that claim
is true.
What does it take to prove that a number is prime?
Proving something is prime is much harder than proving that something
is composite!
Because we need to check a lot more than just one value.

Do we need to check all :math:`\sqrt{n}` candidates for possible
factors of :math:`n` in order to know if :math:`n` is prime?
It depends on how safe you want to be.
(Of course, we actually only need to check primes :math:`< \sqrt{n}`.)

Here are some potential probablistic algorithms that we might use to
decide if a value :math:`n` is prime.

#. Always say that Prime(:math:`n`) is FALSE.
   This simple algorithm "usually" works.
   It only fails :math:`1/log n` times on average!

#. If you don't like the notion that for the actual primes values this
   always fails, than an alternative is to say, with probability
   :math:`1/\ln n`, that Prime(:math:`n`) is TRUE.
   Even though it is is not sometimes right and sometimes wrong,
   of course this no better than the previous algorithm.

#. Pick a number :math:`m` between 2 and :math:`\sqrt{n}`.
   Say :math:`n` is prime if and only if :math:`m` does not divide
   :math:`n`.
   This is not not much help, because it probably did *not* pick a
   factor!

None of those are really serious probabilistic algorithms to solve the
problem.
However, using number theory, it is possible to create a cheap test
that probabilistically determines a number to be composite (if it is
actually composite) 50\% of the time.
Using this test, we can build an algorithm for prime testing as follows::

   Prime(n) {
     for(i=0; i<COMFORT; i++)
       if !CHEAPTEST(n)
       return FALSE;
     return TRUE;
   }

In other words, we can repeatedly try the test, until our number
passes enough times for us to be comfortable about claiming that it is
prime.
Of course, this does nothing to help you find the factors!
But there is a nice aspect to this approach.
We use large primes for cryptography.
But, the numbers used don't actually need to be prime.
They only need to be hard to factor!
And those numbers that continually pass the cheap 50/50 test tend to
be hard to factor.
So, even if a non-prime is used, it will still probably succeed in its
intended use.
