.. avmetadata:: MergesortImpl
   :author: Cliff Shaffer
   :prerequisites: Sorting, Mergesort
   :topic: Sorting
   :short_name: MergesortImpl

.. _MergesortImpl:

.. include:: JSAVheader.rinc

Implementing Mergesort
======================

Implementing Mergesort presents a number of technical difficulties.
The first decision is how to represent the lists.
Mergesort lends itself well to sorting a singly linked list because
merging does not require random access to the list elements.
Thus, Mergesort is the method of choice when the input is in the form
of a linked list.
Implementing ``merge`` for linked lists is straightforward,
because we need only remove items from the front of the input lists
and append items to the output list.
Breaking the input list into two equal halves presents some
difficulty.
Ideally we would just break the lists into front and back halves.
However, even if we know the length of the list in advance, it would
still be necessary to traverse halfway down the linked list to reach
the beginning of the second half.
A simpler method, which does not rely on knowing the length of the
list in advance, assigns elements of the input list alternating
between the two sublists.
The first element is assigned to the first sublist, the
second element to the second sublist, the third to first sublist, the
fourth to the second sublist, and so on.
This requires one complete pass through the input list to build the
sublists.

When the input to Mergesort is an array, splitting input into two
subarrays is easy if we know the array bounds.
Merging is also easy if we merge the subarrays into a second array.
Note that this approach requires twice the amount of space as any of
the sorting methods presented so far, which is a serious disadvantage
for Mergesort.
It is possible to merge the subarrays without using a second array,
but this is extremely difficult to do efficiently and is
not really practical.
Merging the two subarrays into a second array, while
simple to implement, presents another difficulty.
The merge process ends with the sorted list in the auxiliary array.
Consider how the recursive nature of Mergesort breaks
the original array into subarrays, as shown in
Figure <ODSAref "MergeFig" \>.
Mergesort is recursively called until subarrays of size 1 have been
created, requiring :math:`\log n` levels of recursion.
These subarrays are merged into subarrays of size 2, which are in
turn merged into subarrays of size 4, and so on.
We need to avoid having each merge operation
require a new array.
With some difficulty, an algorithm can be
devised that alternates between two arrays.  A much simpler approach
is to copy the sorted sublists to the auxiliary array first, and then
merge them back to the original array.
Here is a complete implementation for mergesort following this
approach.::

   static <E extends Comparable<? super E>>
   void mergesort(E[] A, E[] temp, int l, int r) {
     int mid = (l+r)/2;                // Select midpoint
     if (l == r) return;               // List has one element
     mergesort(A, temp, l, mid);   // Mergesort first half
     mergesort(A, temp, mid+1, r); // Mergesort second half
     for (int i=l; i&lt;=r; i++)          // Copy subarray to temp
       temp[i] = A[i];
     // Do the merge operation back to A
     int i1 = l; int i2 = mid + 1;
     for (int curr=l; curr&lt;=r; curr++) {
       if (i1 == mid+1)              // Left sublist exhausted
         A[curr] = temp[i2++];
       else if (i2 > r)              // Right sublist exhausted
         A[curr] = temp[i1++];
       else if (temp[i1].compareTo(temp[i2])<0) // Get smaller
         A[curr] = temp[i1++];
       else A[curr] = temp[i2++];
     }
   }

An optimized Mergesort implementation is shown below.
It reverses the order of the second subarray during the initial copy.
Now the current positions of the two subarrays work inwards from the
ends, allowing the end of each subarray to act as a sentinel for the
other.
Unlike the previous implementation, no test is needed to check for
when one of the two subarrays becomes empty.
This version also uses Insertion Sort to sort small subarrays.::

   static <E extends Comparable<? super E>>
   void mergesort(E[] A, E[] temp, int l, int r) {
     int i, j, k, mid = (l+r)/2;  // Select the midpoint
     if (l == r) return;          // List has one element
     if ((mid-l) >= THRESHOLD) mergesort(A, temp, l, mid);
     else inssort(A, l, mid-l+1);
     if ((r-mid) > THRESHOLD) mergesort(A, temp, mid+1, r);
     else inssort(A, mid+1, r-mid);
     // Do the merge operation.  First, copy 2 halves to temp.
     for (i=l; i<=mid; i++) temp[i] = A[i];
     for (j=1; j<=r-mid; j++) temp[r-j+1] = A[j+mid];
     // Merge sublists back to array
     for (i=l,j=r,k=l; k<=r; k++)
       if (temp[i].compareTo(temp[j])<0) A[k] = temp[i++];
       else A[k] = temp[j--];
   }
