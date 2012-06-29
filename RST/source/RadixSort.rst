.. _RadixSort:

.. index:: ! Binsort
.. index:: ! Radix Sort

Binsort and Radix Sort
======================

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

   for (i=0; i&lt;n; i++)
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
turning <code>B`` into an array of linked lists.
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
Each bin is associated with not just one key, but rather a range of
key values.
A bucket sort assigns records to bins and then relies on some
other sorting technique to sort the records within each bin.
The hope is that the relatively inexpensive bucketing process will put
only a small number of records in each bin, and that a
"cleanup sort" within the bins will then be relatively cheap.

There is a way to keep the number of bins and the related processing
small while allowing the cleanup sort to be based on Binsort.
Consider a sequence of records with keys in the range 0 to 99.
If we have ten bins available, we can first assign records to bins by
taking their key value modulo 10.
Thus, every key will be assigned to the
bin matching its rightmost decimal digit.
We can then take these
records from the bins *in order* and reassign them to the bins
on the basis of their leftmost (10's place) digit (define values in
the range 0 to 9 to have a leftmost digit of 0).
In other words, assign the :math:`i`'th record from array ``A`` to
a bin using the formula ``A[i]/10``.
If we now gather the values from
the bins in order, the result is a sorted list.
Figure <ODSAref "RadixSort" /> illustrates this process.

.. figure:: http://algoviz.org/OpenDSA/build/Images/RadSort.png
   :width: 400
   :alt: An example of Radix Sort

   <ODSAfig "RadixSort" />
   An example of Radix Sort for twelve two-digit numbers in base ten.
   Two passes are required to sort the list.

In this example, we have :math:`r=10` bins and :math:`n=12` keys in
the range 0 to :math:`r^2-1`.
The total computation is :math:`\Theta(n)`, because we look at each
record and each bin a constant number of times.
This is a great improvement over the simple Binsort where the number
of bins must be as large as the key range.
Note that the example uses :math:`r = 10` so as
to make the bin computations easy to visualize:
Records were placed
into bins based on the value of first the rightmost and then the
leftmost decimal digits.
Any number of bins would have worked.
This is an example of a :dfn:`Radix Sort`, so called because the
bin computations are based on the :dfn:`radix` or the
:dfn:`base` of the key values.
This sorting algorithm can be extended to any number of
keys in any key range.
We simply assign records to bins based on the
keys' digit values working from the rightmost digit to the leftmost.
If there are :math:`k` digits, then this requires that we assign keys to
bins :math:`k` times.

As with Mergesort,
an efficient implementation of Radix Sort is
somewhat difficult to achieve.
In particular, we would prefer to sort
an array of values and avoid processing linked lists.  If we know how
many values will be in each bin, then an auxiliary array of size
:math:`r` can be used to hold the bins.
For example, if during the first pass the 0 bin will receive three
records and the 1 bin will receive five records, then we could simply
reserve the first three array positions for the 0 bin and the next
five array positions for the 1 bin.
Exactly this approach is taken by the following Java implementation.
At the end of each pass, the records are copied back to the original
array.::

   static void radix(Integer[] A, Integer[] B,
                     int k, int r, int[] count) {
     // Count[i] stores number of records in bin[i]
     int i, j, rtok;

     for (i=0, rtok=1; i<k; i++, rtok*=r) { // For k digits
       for (j=0; j<r; j++) count[j] = 0;    // Initialize count

       // Count the number of records for each bin on this pass
       for (j=0; j<A.length; j++) count[(A[j]/rtok)%r]++;

       // count[j] will be index in B for last slot of bin j.
       for (j=1; j<r; j++) count[j] = count[j-1] + count[j];

       // Put records into bins, working from bottom of bin
       // Since bins fill from bottom, j counts downwards
       for (j=A.length-1; j>=0; j--)
         B[--count[(A[j]/rtok)%r]] = A[j];

       for (j=0; j<A.length; j++) A[j] = B[j]; // Copy B back
     }
   }

The first inner ``for`` loop initializes array ``cnt``.
The second loop counts the number of records to be assigned to each
bin.
The third loop sets the values in ``cnt`` to their proper
indices within array ``B``.
Note that the index stored in ``cnt[j]``
is the *last* index for bin ``j``; bins are filled
from high index to low index.
The fourth loop assigns the records to the bins (within
array ``B``).
The final loop simply copies the records back to
array ``A`` to be ready for the next pass.
Variable ``rtoi`` stores :math:`r^i` for use in bin computation
on the :math:`i`'th iteration.
Figure <ODSAref "RadExamp" /> shows how this algorithm processes the
input shown in Figure <ODSAref "RadixSort" />.

.. figure:: http://algoviz.org/OpenDSA/build/Images/RadExamp.png
   :width: 400
   :alt: An example of function ``radix``

   <ODSAfig "RadExamp" />
   An example showing function ``radix`` applied to the input of
   Figure <ODSAref "RadixSort" />.
   Row 1 shows the initial values within the input array.
   Row 2 shows the values for array ``cnt`` after
   counting the number of records for each bin.
   Row 3 shows the index values stored in array ``cnt``.
   For example, ``cnt[0]`` is 0, indicating no input values are
   in bin 0.
   ``Cnt[1]`` is 2, indicating that array ``B``
   positions 0 and 1 will hold the values for bin 1.
   ``Cnt[2]`` is 3, indicating that array ``B``
   position 2 will hold the (single) value for bin 2.
   ``Cnt[7]`` is 11, indicating that array ``B``
   positions 7 through 10 will hold the four values for bin 7.
   Row 4 shows the results of the first pass of the Radix Sort.
   Rows 5 through 7 show the equivalent steps for the second
   pass.

This algorithm requires :math:`k` passes over the list of :math:`n`
numbers in base :math:`r`, with :math:`\Theta(n + r)` work done at
each pass.
Thus the total work is :math:`\Theta(nk + rk)`.
What is this in terms of :math:`n`?
Because :math:`r` is the size of the base, it might be rather small.
One could use base 2 or 10.
Base 26 would be appropriate for sorting character strings.
For now, we will treat :math:`r` as a constant value and ignore it
for the purpose of determining asymptotic complexity.
Variable :math:`k` is related to the key range:
It is the maximum number of digits that a
key may have in base :math:`r`.
In some applications we can determine :math:`k`
to be of limited size and so might wish to consider it a constant.
In this case, Radix Sort is :math:`\Theta(n)` in the best, average, and
worst cases, making it the sort with best asymptotic complexity that
we have studied.

Is it a reasonable assumption to treat :math:`k` as a constant?
Or is there some relationship between :math:`k` and :math:`n`?
If the key range is limited and duplicate key values are common,
there might be no relationship between :math:`k` and :math:`n`.
To make this distinction clear, use :math:`N` to denote the number of
distinct key values used by the :math:`n` records.
Thus, :math:`N \leq n`.
Because it takes a minimum of :math:`\log_r N` base :math:`r` digits to
represent :math:`N` distinct key values, we know that
:math:`k \geq \log_r N`.

Now, consider the situation in which no keys are duplicated.
If there are :math:`n` unique keys (:math:`n = N`), then it requires
:math:`n` distinct code values to represent them.
Thus, :math:`k \geq \log_r n`.
Because it requires *at least* :math:`\Omega(\log n)` digits
(within a constant factor) to distinguish between the :math:`n`
distinct keys, :math:`k` is in :math:`\Omega(\log n)`.
This yields an asymptotic complexity of :math:`\Omega(n \log n)` for 
Radix Sort to process :math:`n` distinct key values.

It is possible that the key range is much larger;
:math:`\log_r n` bits is merely the best case possible for :math:`n`
distinct values.
Thus, the :math:`\log_r n` estimate for :math:`k` could be overly
optimistic.
The moral of this analysis is that, for the general case of :math:`n`
distinct key values, Radix Sort is at best a :math:`\Omega(n \log n)`
sorting algorithm.

Radix Sort can be much improved by making base :math:`r` be as large
as possible.
Consider the case of an integer key value.
Set :math:`r = 2^i` for some :math:`i`.
In other words, the value of :math:`r` is related to the
number of bits of the key processed on each pass.
Each time the number of bits is doubled, the number of passes is cut
in half.
When processing an integer key value, setting :math:`r = 256` allows
the key to be processed one byte at a time.
Processing a 32-bit key requires only four passes.
It is not unreasonable on most computers to use
:math:`r = 2^{16} = 64\mbox{K}`, resulting in only two passes for a
32-bit key.
Of course, this requires a ``cnt`` array of size 64K.
Performance will be good
only if the number of records is about 64K or greater.
In other words, the number of records must be large compared to the
key size for Radix Sort to be efficient.
In many sorting applications, Radix Sort can be tuned in this way to
give good performance.

Radix Sort depends on the ability to make a fixed number of multiway
choices based on a digit value, as well as random access to the bins.
Thus, Radix Sort might be difficult to implement for certain key
types.
For example, if the keys are real numbers or arbitrary length strings,
then some care will be necessary in implementation.
In particular, Radix Sort will need to be careful about deciding when
the "last digit" has been found to distinguish among real numbers,
or the last character in variable length strings.
Implementing the concept of Radix Sort with the trie data
structure (Module <ODSAref "Trie" />) is most appropriate for these
situations.

At this point, the perceptive reader might begin to question our
earlier assumption that key comparison takes constant time.
If the keys are "normal integer" values stored in, say, an integer
variable, what is the size of this variable compared to :math:`n`?
In fact, it is almost certain that 32 (the number of bits in a
standard ``int`` variable) is
greater than :math:`\log n` for any practical computation.
In this sense, comparison of two long integers requires
:math:`\Omega(\log n)` work.

Computers normally do arithmetic in units of a particular size, such
as a 32-bit word.
Regardless of the size of the variables, comparisons use this
native word size and require a constant amount of time since the
comparison is implemented in hardware.
In practice, comparisons of two 32-bit values take constant time, even
though 32 is much greater than :math:`\log n`.
To some extent the truth of the proposition that there are constant
time operations (such as integer comparison) is in the eye of the
beholder.
At the gate level of computer architecture, individual bits are
compared.
However, constant time comparison for integers is true in practice on
most computers (they require a fixed number of machine instructions),
and we rely on such assumptions as the basis for our analyses.
In contrast, Radix Sort must do several arithmetic
calculations on key values (each requiring constant time), where the
number of such calculations is proportional to the key length.
Thus, Radix Sort truly does :math:`\Omega(n \log n)` work to process
:math:`n` distinct key values.
