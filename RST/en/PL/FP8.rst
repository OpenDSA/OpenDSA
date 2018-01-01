.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

===========================================
Functional Programming - Part 8 
===========================================
   
The MapReduce Paradigm
----------------------

In 2004 `Jeffrey Dean and Sanjay Ghemawat of Google published a paper
<https://research.google.com/archive/mapreduce.html>`_ describing a
paradigm for distributed computation that has come to be called
**MapReduce**.  It illustrated the influence of functional programming on
the way in which Google organinzed computational work that could be
parallelized on distributed clusters of computer.

The essence of Dean and Ghemawat's idea was to define a *mapping
function* that would perform a specified task in parallel on multiple
data sets distributed across many computers.  The results each mapping
function were then returned to a central *reducing function* that
accumulated the results into the "answer" being sought.

To illustrate, suppose we had a distributed database, called *db2*, of
salesperson records with the sales records of "Smith" on one computer, the
sales records of "Jones" on a second computer, and the sales records of
"Green" on a third computer.

::

    var db2 = [ ["Smith", 4, 1, 8, 32, 45], ["Jones", 9, 2, 8, 6, 4], 
                ["Green", 4, 4, 6, 1, 12, 8] ];


Given this database, we want a computation (the mapping function) done
on each computer that returns the name of the salesperson along with
the sum of all the sales records for that person.  The results of
those three computation are then returned to a reducing function that
picks out the salesperson who sold the most.
		
::

   > bestSalesPerson(db2)
   [ 'Smith', 90 ]

The following *bestSalesPerson* function achieves this computation by
defining two functions -- the *mapper* and the *reducer* and then
appropriately calling on *fp.reduce*.   Think about how the sets of question marks **???** should
be filled in before you attempt the review problem that follows
    
::

    // Our database is a list of records where each record r is a list whose
    // head is the name of a salesperson and whose tail is a list of their sales

    var bestSalesPerson = function (db) {

        // mapper must return the pair [name, totalSales] for a given record
        var mapper = function (r) {
            return fp.makeList( ???, ??? );
        }
        // reducer returns the input pair [name, totalSales] with the largest totalSales
        var reducer = function(p1,p2) {
            return (fp.isGT(fp.hd(fp.tl(p1)), fp.hd(fp.tl(p2)))) ? p1 : p2;
        }
        // returns [salesPerson, totalSales] with the largest totalSales in the DB
        return fp.reduce( ???, ???, ??? ); 
    }


This randomized problem is about the MapReduce model.
You must solve it correctly three times in a row to earn credit for it.

.. avembed:: Exercises/PL/MapReduce.html ka
   :long_name: Map Reduce
