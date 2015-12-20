.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: Cliff Shaffer
   :satisfies: estimation
   :topic: Math Background

.. index:: ! estimation

Estimation
==========

One of the most useful life skills that you can gain from your
computer science training is the ability to perform quick estimates.
This is sometimes known as "back of the napkin" or
"back of the envelope" calculation.
Both nicknames suggest that only a rough estimate is produced.
:term:`Estimation` techniques are a standard part of engineering
curricula but are often neglected in computer science.
Estimation is no substitute for rigorous, detailed analysis
of a problem, but it can help to decide when a rigorous
analysis is warranted:
If the initial estimate indicates that the solution
is unworkable, then further analysis is probably unnecessary.

Estimation can be formalized by the following three-step process:

#. Determine the major parameters that affect the problem.

#. Derive an equation that relates the parameters to the problem.

#. Select values for the parameters, and apply the equation to yield an
   estimated solution.

When doing estimations, a good way to reassure yourself that the
estimate is reasonable is to do it in two different ways.
In general, if you want to know what comes out of a system, you can
either try to estimate that directly, or you can estimate what goes
into the system (assuming that what goes in must later come out).
If both approaches (independently) give similar answers, then this
should build confidence in the estimate.

When calculating, be sure that your units match.
For example, do not add feet and pounds.
Verify that the result is in the correct units.
Always keep in mind that the output of a calculation is only
as good as its input.
The more uncertain your valuation for the input parameters in Step 3,
the more uncertain the output value.
However, back of the envelope calculations are often meant only to get
an answer within an order of magnitude, or perhaps within a factor of
two.
Before doing an estimate, you should decide on acceptable error
bounds, such as within 25\%, within a factor of two, and so forth.
Once you are confident that an estimate falls within your error
bounds, leave it alone!
Do not try to get a more precise estimate than necessary for your
purpose.

.. topic:: Example

   How many library bookcases does it take to store books containing one
   million pages?
   I estimate that a 500-page book requires one inch on the
   library shelf (it will help to look at the size of any handy book),
   yielding about 200 feet of shelf space for one million pages.
   If a shelf is 4 feet wide, then 50 shelves are required.
   If a bookcase contains 5 shelves, this yields about 10 library
   bookcases.
   To reach this conclusion, I estimated the number of pages per
   inch, the width of a shelf, and the number of shelves in a
   bookcase.
   None of my estimates are likely to be precise, but I feel confident
   that my answer is correct to within a factor of two.
   (After writing this, I went to Virginia Tech's library and looked at
   some real bookcases.
   They were only about 3 feet wide, but typically had 7 shelves for a
   total of 21 shelf-feet.
   So I was correct to within 10% on bookcase capacity, far better than
   I expected or needed.
   One of my selected values was too high, and the other too low, which
   canceled out the errors.)

.. topic:: Example

   Is it more economical
   to buy a car that gets 20 miles per gallon, or one that gets 30 miles
   per gallon but costs \\$3000 more?
   The typical car is driven about 12,000 miles per year.
   If gasoline costs \\$3/gallon, then the yearly gas bill is
   \\$1800 for the less efficient car and \\$1200 for the more
   efficient car. 
   If we ignore issues such as the payback that would be received if we
   invested \\$3000 in a bank, it would take 5 years to make up the
   difference in price.
   At this point, the buyer must decide if price is the only criterion and
   if a 5-year payback time is acceptable.
   Naturally, a person who drives more will make up the difference more
   quickly, and changes in gasoline prices will also greatly affect the
   outcome.

.. topic:: Example

   When at the supermarket doing the week's shopping, can you estimate
   about how much you will have to pay at the checkout?
   One simple way is to round the price of each item to the nearest
   dollar, and add this value to a mental running total as you put the
   item in your shopping cart.
   This will likely give an answer within a couple of dollars of the true
   total.
