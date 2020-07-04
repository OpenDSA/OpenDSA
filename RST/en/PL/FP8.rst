.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

========================
Combining Map and Reduce
========================
   
The MapReduce Paradigm
----------------------

In 2004, `Jeffrey Dean and Sanjay Ghemawat of Google published a paper
<https://research.google.com/archive/mapreduce.html>`_ describing a
paradigm for distributed computation that has come to be called
**MapReduce**.  It illustrated the influence of functional programming on
the way in which Google organized computational work that could be
parallelized on distributed clusters of computers.

The essence of Dean and Ghemawat's idea was to define a *mapping
function* that would perform a specified task in parallel on multiple
data sets distributed across many computers.  The results of each mapping
function were then returned to a *reducing function* that
accumulated the results into the "answer" being sought.

To illustrate, suppose we had a distributed database, called *db2*, of
salesperson records with the sales records of "Smith" on one computer, the
sales records of "Jones" on a second computer, and the sales records of
"Green" on a third computer.

::

    var db2 = [ ["Jones", 9, 2, 8, 6, 4], ["Smith", 4, 1, 8, 32, 45], 
                ["Green", 4, 4, 6, 1, 12, 8] ];


Given this database, we want a computation (the mapping function) done
on each computer that returns the name of the salesperson along with
the sum of all the sales records for that person.  The results of
those three computations are then returned to a reducing function that
picks out the salesperson who sold the most.
		
::

   > bestSalesPerson(db2)
   [ 'Smith', 90 ]

The following *bestSalesPerson* function achieves this computation by
defining two functions (the *mapper* and the *reducer*) and then
appropriately calling on *fp.reduce*.  Read through the following
slide show for more details and then attempt the review problem that
follows.



.. inlineav:: FP8Code1CON ss
   :long_name: Illustrate MapReduce Pattern
   :links: AV/PL/FP/FP8CON.css
   :scripts: AV/PL/FP/FP8Code1CON.js
   :output: show



The following randomized problem is about the MapReduce model.
You must solve it correctly three times in a row to earn credit for it.

.. avembed:: Exercises/PL/MapReduce.html ka
   :long_name: Map Reduce
