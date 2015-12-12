.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires:
   :satisfies:
   :topic: Search

.. odsalink:: AV/Development/selforgCON.css

Self-Organizing Lists
=====================

Introduction
------------

While ordering of lists is most commonly done by :term:`key` value,
this is not the only viable option.
Another approach to organizing lists to speed search is to order the
records by expected frequency of access.
While the benefits might not be as great as when sorted by key
value, the cost to organize (at least approximately) by frequency of
access can be much cheaper,
and thus can speed up :term:`sequential search` in some situations.

Assume that we know, for each key :math:`k_i`, the probability
:math:`p_i` that the record with key :math:`k_i` will be requested.
Assume also that the list is ordered so that the most frequently
requested record is first, then the next most frequently requested
record, and so on.
Search in the list will be done sequentially, beginning with the
first position.
Over the course of many searches, the expected number of comparisons
required for one search is

.. math::

   \overline{C}_n = 1 p_0 + 2 p_1 + ... + n p_{n-1}.

In other words, the cost to access the record in
**L** [0] is 1 (because one key value is looked at), and the
probability of this occurring is :math:`p_0`.
The cost to access the record in **L** [1] is 2 (because
we must look at the first and the second records' key values),
with probability :math:`p_1`, and so on.
For :math:`n` records, assuming that all searches are
for records that actually exist, the probabilities :math:`p_0` through
:math:`p_{n-1}` must sum to one.

Certain probability distributions give easily computed results.

.. topic:: Example

   Calculate the expected cost to search a list
   when each record has equal chance of being accessed (the classic
   sequential search through an unsorted list).
   Setting :math:`p_i = 1/n` yields

   .. math::

      \overline{C}_n = \sum_{i=1}^n i/n = (n+1)/2.

   This result matches our expectation that half the records will be
   accessed on average by normal sequential search.
   If the records truly have equal access probabilities, then ordering
   records by frequency yields no benefit.
   In the :ref:`more general case <SortedSearch>`,
   we must consider the probability (labeled :math:`p_n`) that
   the search key does not match that for any record in the array.
   In that case, the general formula gives us

   .. math::

      (1-p_n) \frac{n+1}{2} + p_n n = 
      \frac{n + 1 - p_n n - p_n + 2 p_n n}{2} =
      \frac{n + 1 + p_n (n - 1)}{2}.

   Thus, :math:`\frac{n+1}{2} \leq \overline{C}_n \leq n`,
   depending on the value of \(p_0\).

A geometric probability distribution can yield quite different
results.

.. topic:: Example

   Calculate the expected cost for searching a list ordered by
   frequency when the probabilities are defined as

   .. math::

      p_i = \left\{ \begin{array}{ll}
        1/2^i & \mbox{if \(0 \leq i \leq n-2\)}\\
        1/2^n & \mbox{if \(i = n-1\).}
      \end{array} \right.

   Then,

   .. math::

      \overline{C}_n \approx \sum_{i=0}^{n-1} (i+1)/2^{i+1} =
         \sum_{i=1}^n (i/2^i) \approx 2.

   For this example, the expected number of accesses is a constant.
   This is because the probability for accessing the first record is
   high (one half), the second is much lower (one quarter) but still
   much higher than for the third record, and so on.
   This shows that for some probability distributions, ordering the
   list by frequency can yield an efficient search technique.

In many search applications, real access patterns follow a rule of
thumb called the :term:`80/20 rule`.
The 80/20 rule says that 80% of the record accesses are to 20%
of the records.
The values of 80 and 20 are only estimates; every data access pattern
has its own values.
However, behavior of this nature occurs surprisingly often in practice
(which explains the success of :term:`caching` techniques widely
used by web browsers for speeding access to web pages,
and the use of a
:ref:`buffer pool <buffer pool> <BuffPool>` to speed access
to data stored in slower memory such as a :term:`disk drive`).
When the 80/20 rule applies, we can expect considerable improvements
to search performance from a list ordered by frequency of access over
standard sequential search in an unordered list.

.. ZipfExamp_

.. topic:: Example

   The 80/20 rule is an example of a 
   :term:`Zipf distribution`.
   Naturally occurring distributions often follow a Zipf distribution.
   Examples include the observed frequency for the use of words in a
   natural language such as English, and the size of the population for
   cities (i.e., view the relative proportions for the populations as
   equivalent to the "frequency of use").
   Zipf distributions are related to the
   :ref:`Harmonic Series <Harmonic series> <Summations>`.
   Define the Zipf frequency for item :math:`i` in the distribution for
   :math:`n` records as :math:`1/(i {\cal H}_n)`.
   The expected cost for the series whose members follow this Zipf
   distribution will be

   .. math::

      \overline{C}_n = \sum_{i=1}^n i/i {\cal H}_n = n/{\cal H}_n \approx
      n/\log_e n.

   When a frequency distribution follows the 80/20 rule, the
   average search looks at about 10-15\% of the records in a list
   ordered by frequency.

This is potentially a useful observation that typical "real-life"
distributions of record accesses, if the records were ordered by
frequency, would require that we visit on average only 10-15% of the
list when doing sequential search.
This means that if we had an application that used sequential search,
and we wanted to make it go a bit faster (by a constant amount), we
could do so without a major rewrite to the system to implement
something like a search tree.
But that is only true if there is an easy way to (at least
approximately) order the records by frequency.

In most applications, we have no means of knowing in advance the
frequencies of access for the data records.
To complicate matters further, certain records might be accessed
frequently for a brief period of time, and then rarely thereafter.
Thus, the probability of access for records might change over time (in
most database systems, this is to be expected).
:term:`Self-organizing lists <self-organizing list>` seek to solve
both of these problems.

Self-organizing lists modify the order of records within the
list based on the actual pattern of record access.
Self-organizing lists use a heuristic for
deciding how to reorder the list.
These heuristics are similar to the rules for managing
:ref:`buffer pools <buffer pool> <BuffPool>`.
In fact, a buffer pool is a form of self-organizing list.
Ordering the buffer pool by expected frequency of access is a good
strategy, because typically we must search the contents of the buffers
to determine if the desired information is already in main memory.
When ordered by frequency of access, the buffer at the end of the
list will be the one most appropriate for reuse when a new page
of information must be read.

Frequency Count
---------------

There are three traditional heuristics for managing self-organizing
lists.

The most obvious way to keep a list ordered by frequency would be to
store a count of accesses to each record and always maintain records
in this order.
This method will be referred to as :term:`frequency count` or just
"count".
Count is similar to the :term:`least frequently used` buffer
replacement strategy.
Whenever a record is accessed, it might move toward the front of
the list if its number of accesses becomes greater than a record
preceding it.
Thus, count will store the records in the order of frequency
that has actually occurred so far.
Besides requiring space for the access counts, count does not
react well to changing frequency of access over time.
Once a record has been accessed a large number of times under the
frequency count system, it will
remain near the front of the list regardless of further access
history.

.. inlineav:: SelforgCON1 ss
   :output: show

.. avembed:: Exercises/Development/SelfOrgCounterPro.html ka


Move to Front
-------------

Bring a record to the front of the list when it is
found, pushing all the other records back one position.
This is analogous to the :term:`least recently used`
buffer replacement strategy and is called
:term:`move-to-front`.
This heuristic is easy to implement if the records are stored using
a linked list.
When records are stored in an array, bringing a record forward from
near the end of the array will result in a
large number of records (slightly) changing position.
Move-to-front's cost is bounded in the sense that it requires at
most twice the number of accesses required by the
:term:`optimal static ordering` for :math:`n` records when at least
:math:`n` searches are performed. 
In other words, if we had known the series of (at least :math:`n`)
searches in advance and had stored the records in order of frequency
so as to minimize the total cost for these accesses, this cost would
be at least half the cost required by the move-to-front heuristic.
(This can be proved using
:ref:`amortized analysis <amortized analysis> <AmortAnal>`.)
Finally, move-to-front responds well to local changes in frequency
of access, in that if a record is frequently accessed for a brief
period of time it will be near the front of the list during that
period of access.
Move-to-front does poorly when the records are processed in
sequential order, especially if that sequential order is then
repeated multiple times.

.. inlineav:: SelforgCON2 ss
   :output: show

.. avembed:: Exercises/Development/SelfOrgMove-to-FrontPro.html ka


Transpose
---------

Swap any record found with the record immediately
preceding it in the list.
This heuristic is called :term:`transpose`.
Transpose is good for list implementations based on either linked
lists or arrays.
Frequently used records will, over time, move to the front of the
list.
Records that were once frequently accessed but are no longer used
will slowly drift toward the back.
Thus, it appears to have good properties with respect to changing
frequency of access.
Unfortunately, there are some pathological sequences of access that
can make transpose perform poorly.
Consider the case where the last record of the list
(call it :math:`X`) is accessed.
This record is then swapped with the next-to-last record
(call it :math:`Y`), making :math:`Y` the last record.
If :math:`Y` is now accessed, it swaps with :math:`X`.
A repeated series of accesses alternating between :math:`X`
and :math:`Y` will continually search to the end of the list,
because neither record will ever make progress toward the front.
However, such pathological cases are unusual in practice.
A variation on transpose would be to move the accessed record
forward in the list by some fixed number of steps.

.. inlineav:: SelforgCON3 ss
   :output: show

.. avembed:: Exercises/Development/SelfOrgTransposePro.html ka


An Example
----------

While self-organizing lists do not generally perform as well
as search trees or a sorted list, both of which require
:math:`O(\log n)` search time, there are many situations in which
self-organizing lists prove a valuable tool.
Obviously they have an advantage over sorted lists in that they need
not be sorted.
This means that the cost to insert a new record is low, which could
more than make up for the higher search cost when insertions are
frequent.
Self-organizing lists are simpler to implement than search trees and
are likely to be more efficient for small lists.
Nor do they require additional space.
Finally, in the case of an application where sequential
search is "almost" fast enough, changing an
unsorted list to a self-organizing list might speed the
application enough at a minor cost in additional code.

As an example of applying self-organizing lists, consider an
algorithm for compressing and transmitting messages. [#]_
The list is self-organized by the move-to-front rule.
Transmission is in the form of words and numbers, by the following
rules:

#. If the word has been seen before, transmit the current position of
   the word in the list.
   Move the word to the front of the list.

#. If the word is seen for the first time, transmit the word.
   Place the word at the front of the list.

Both the sender and the receiver keep track of the position of words
in the list in the same way (using the move-to-front rule), so
they agree on the meaning of the numbers that encode repeated
occurrences of words.
Consider the following example message to be transmitted
(for simplicity, ignore case in letters).

``The car on the left hit the car I left``

The first three words have not been seen before, so they must be sent
as full words.
The fourth word is the second appearance of "the" which at this
point is the third word in the list.
Thus, we only need to transmit the position value "3".
The next two words have not yet been seen, so must be sent as full
words.
The seventh word is the third appearance of "the", which
coincidentally is again in the third position.
The eighth word is the second appearance of "car", which is now in the
fifth position of the list.
"I" is a new word, and the last word "left" is now in the fifth
position.
Thus the entire transmission would be

``The car on 3 left hit 3 5 I 5``

This approach to compression is similar in spirit to
Ziv-Lempel coding, which is a class of coding algorithms commonly used
in file compression utilities.
Ziv-Lempel coding replaces repeated occurrences of strings with a
pointer to the location in the file of the first occurrence of the
string.
The codes are stored in a self-organizing list in order to speed
up the time required to search for a string that has previously been
seen.

.. [#] The compression algorithm and the example used both come from
       the following paper:
       J.L. Bentley, D.D. Sleator, R.E. Tarjan, and V.K. Wei,
       "A Locally Adaptive Data Compression Scheme", 
       *Communications of the ACM 29*, 4(April 1986), 320-330.

.. odsascript:: AV/Development/selforgCON.js
