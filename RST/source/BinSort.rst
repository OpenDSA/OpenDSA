.. avmetadata:: BinSort
   :author: Cliff Shaffer
   :prerequisites: Sorting
   :topic: Sorting
   :short_name: BinSort

.. _BinSort:

.. include:: JSAVheader.rinc

.. index:: ! Binsort

Binsort
=======

Imagine that for the past year, as you paid your various bills, you
then simply piled all the paperwork into a corner somewhere.
Now the year has ended and its time to sort all of these papers by
what the bill was for (phone, electricity, rent, etc.) and date.
A pretty natural approach is to make some space on the floor, and as
you go through the pile of papers, put the phone bills into one pile,
the electric bills into another pile, and so on.
Once this initial assignment of bills to piles is done (in one pass),
you can then sort each pile by date relatively quickly, because each
pile is fairly small.
This is the basic idea behind a Binsort.

Consider the following code fragment to sort a permutation of the
numbers 0 through :math:`n-1`.::

   for (i=0; i<n; i++)
     B[A[i]] = A[i];

Here the key value is used to determine the
position for a record in the final sorted array.
This is the most basic example of a :dfn:`Binsort`, where key
values are used to assign records to :dfn:`bins`.
This algorithm is extremely efficient, taking :math:`\Theta(n)` time
regardless of the initial ordering of the keys.
This is far better than the performance of any sorting
algorithm that we have seen so far.
The only problem is that this algorithm has limited use because it
works only for a permutation of the numbers from 0 to :math:`n-1`.

We can extend this simple Binsort algorithm to be more useful.
Because Binsort must perform direct computation on the key value (as
opposed to just asking which of two records comes first as our
previous sorting algorithms did),
we will assume that the records use an integer key type.

The simplest extension is to allow for duplicate values among the
keys.
This can be done by turning array slots into arbitrary-length bins by
turning ``B`` into an array of linked lists.
In this way, all records with key value :math:`i` can be placed in bin
``B[i]``.
A second extension allows for a key range greater than :math:`n`.
For example, a set of :math:`n` records might have keys in the range 1
to :math:`2n`.
The only requirement is that each possible key value have a
corresponding bin in ``B``.
Here is the extended Binsort algorithm.::

   static void binsort(Integer A[]) {
     List<Integer>[] B = (LList<Integer>[])new LList[MaxKey];
     Integer item;
     for (int i=0; i<MaxKey; i++)
       B[i] = new LList<Integer>();
     for (int i=0; i<A.length; i++) B[A[i]].append(A[i]);
     for (int i=0; i<MaxKey; i++)
       for (B[i].moveToStart();
            (item = B[i].getValue()) != null; B[i].next())
         output(item);
   }

This version of Binsort can sort any collection of records whose key
values fall in the range from 0 to ``MaxKeyValue``-1.
The total work required is simply that needed to place each record
into the appropriate bin and then take all of the records out of the
bins.
Thus, we need to process each record twice, for :math:`\Theta(n)`
work.

Unfortunately, there is a crucial oversight in this analysis.
Binsort must also look at each of the bins to see if it
contains a record.
The algorithm must process ``MaxKeyValue``
bins, regardless of how many actually hold records.
If ``MaxKeyValue``
is small compared to :math:`n`, then this is not a great expense.
Suppose that ``MaxKeyValue`` :math:`= n^2`.
In this case, the total amount of work done will be
:math:`\Theta(n + n^2) = \Theta(n^2)`.
This results in a poor sorting algorithm, and the algorithm becomes
even worse as the disparity between :math:`n` and
``MaxKeyValue`` increases.
In addition, a large key range requires an unacceptably large array
``B``.
Thus, even the extended Binsort is useful only for a limited key
range.

A further generalization to Binsort yields a :dfn:`bucket sort`.
Each bin (now called a bucket) is associated with not just one key,
but rather a range of key values.
A bucket sort assigns records to buckets and then relies on some
other sorting technique to sort the records within each bucket.
The hope is that the relatively inexpensive bucketing process will put
only a small number of records in each bucket, and that a
"cleanup sort" within the buckets will then be relatively cheap.

.. avembed:: Exercises/Development/BinSortSumm.html
   :showbutton: hide
   :title: Binsort Summary Questions
