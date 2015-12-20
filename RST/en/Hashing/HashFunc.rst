.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: hash intro
   :satisfies: hash function
   :topic: Hashing

.. index:: ! hashing function

Hash Function Principles
========================

Hash Function Principles
------------------------

Hashing generally takes records whose key values come from a
large range and stores those records in a table
with a relatively small number of slots.
Collisions occur when two records hash to the same slot in the
table.
If we are careful |---| or lucky |---| when selecting a hash function,
then the actual number of collisions will be few.
Unfortunately, even under the best of circumstances, collisions are
nearly unavoidable.
To illustrate, consider a classroom full of students.
What is the probability that some pair of students
shares the same birthday (i.e., the same day of the year, not
necessarily the same year)?
If there are 23 students, then the odds are about even that two will
share a birthday.
This is despite the fact that there are 365 days in which students
can have birthdays (ignoring leap years).
On most days, no student in the class has a birthday.
With more students, the probability of a shared birthday increases.
The mapping of students to days based on their birthday is similar to
assigning records to slots in a table (of size 365) using the
birthday as a hash function.
Note that this observation tells us nothing about *which*
students share a birthday, or on *which* days of the year shared
birthdays fall.

Try it for yourself.
Select several table sizes and several different numbers of records to
be inserted in the calculator below.
It will calculate the probability that there is a collision.
To get credit for the exercise, answer the following two questions:

- What is the smallest number of people that must be in the room for
  the probability to be at least 60% that two share a birthday?

- In a hash table of 1000 slots, what is the smallest number of records
  that must be inserted before the probability of a collision reaches 50%?

.. avembed:: AV/Hashing/Birthday.html pe

To be practical, a database organized by hashing must store records in a
hash table that is not so large that it wastes space.
To balance time and space efficiency, this means that the hash table
should be :ref:`around half full <HashAnal>`.
Because collisions are extremely likely to occur under these conditions
(by chance, any record inserted into a table that is half full should
have a collision half of the time),
does this mean that we need not worry about how well a hash function
does at avoiding collisions?
Absolutely not.
The difference between using a good hash function and a bad hash function
makes a big difference in practice in the number of records that must be
examined when searching or inserting to the table.
Technically, any function that maps all possible key values to a
slot in the hash table is a hash function.
In the extreme case, even a function that maps all records to the same 
slot in the array is a hash function, but it does nothing to help us
find records during a search operation.

We would like to pick a hash function that maps keys
to slots in a way that makes each slot in the hash table have equal
probablility of being filled for the actual set keys being used.
Unfortunately, we normally have no control over the distribution of
key values for the actual records in a given database or collection.
So how well any particular hash function does
depends on the actual distribution of the keys used within the
allowable key range.
In some cases, incoming data are well distributed across their key
range.
For example, if the input is a set of random numbers selected
uniformly from the key range,
any hash function that assigns the key range so that each slot in the
hash table receives an equal share of the range will likely also
distribute the input records uniformly within the table.
However, in many applications the incoming records are highly
clustered or otherwise poorly distributed.
When input records are not well distributed throughout the key range
it can be difficult to devise a hash function that does a good job of
distributing the records throughout the table, especially if the 
input distribution is not known in advance.

There are many reasons why data values might be poorly distributed.

1. Natural frequency distributions tend to follow a common pattern where
   a few of the entities occur frequently while most entities occur
   relatively rarely.
   For example, consider the populations of the 100 largest cities in
   the United States.
   If you plot these populations on a numberline, most of them
   will be clustered toward the low side, with a few
   outliers on the high side.
   This is an example of a Zipf distribution.
   Viewed the other way, the home town for a given person is far more
   likely to be a particular large city than a particular small town.

2. Collected data are likely to be skewed in some way.
   Field samples might be rounded to, say, the
   nearest 5 (i.e., all numbers end in 5 or 0).

3. If the input is a collection of common English words, the beginning
   letter will be poorly distributed.

Note that for items 2 and 3 on this list,
either high- or low-order bits of the key are poorly distributed.

When designing hash functions, we are generally faced with one of two
situations:

1. We know nothing about the distribution of the incoming keys.
   In this case, we wish to select a hash function that evenly
   distributes the key range across the hash table,
   while avoiding obvious opportunities for clustering such as hash
   functions that are sensitive to the high- or low-order bits of the key
   value.

2. We know something about the distribution of the incoming keys.
   In this case, we should use a distribution-dependent hash function
   that avoids assigning clusters of related key values to the same hash
   table slot.
   For example, if hashing English words, we should *not* hash on
   the value of the first character because this is likely to be unevenly
   distributed.

In the next module, you will see several examples of hash functions
that illustrate these points. 
