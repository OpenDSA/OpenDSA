.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Mining in a Blockchain System
=============================


What is a Nonce?
----------------

A nonce is a number added to the contents of a block whose purpose is
to change the hash value of the block to achieve some goal.
Typically, a nonce is used in an application that relies on something
called Proof of Work.
The Bitcoin cryptocurrency is an example of such a system.
The idea behind Proof of Work is that a particpant in the
system, on average, has to take a certain amount of effort to find a
hash value that achieves the desired property.
The reason of this is explained when we discuss consensus algorithm.
For now, just know that we use the nonce to change the hash value of
the block.

The purpose of the nonce is to work with the data in the rest of the
block to cause the hash value to have some property, typically that it
be less than some threshold.
For example, the requirement of the system might be that all block
hash values have their leading digit be zero.

Recall that the hash value and the data that generated the hash are
rather unrelated, such that given the block data, it is hard to
predict what the hash value will be (until you actually make the
effort of running the hash algorithm).
Thus, picking a value for the nonce is effectively guessing what the
resulting hash value will be.
To simplify the math, let's assume that hash values are in base 10
(the ones that we actually show in our examples are in hexidecimal).
If picking a value for the nonce is effectively making a random guess
about the resulting hash value, then any nonce you pick has a one in
10 chance of making the first digit of the base-10 hash be a zero.

.. avembed:: AV/Blockchain/TextFieldHashingGame.html ss
   :long_name: Text-Field Hashing Game

.. avembed:: AV/Blockchain/NonceHashingGame.html ss
   :long_name: Nonce Hashing Game

How Mining Works
~~~~~~~~~~~~~~~~

You have probably heard the term "mining" in the context of Bitcoin or
blockchain.
"Mining" simply means to try different values for the nonce
until some hash value with the right property is stumbled upon.
That property is usually that its value be below some threshold.
If the system wants to make the cost of finding a hash value be at a
certain level, then all the system needs to do is set the threshold to
be right.
For example (again, in base 10 values), setting the requirement to be
that the hash value have four leading zeros, then any nonce (and thus the
resulting hash value) has a one in ten thousand chance of hitting the
target.
If the system wants this cost to be hire, then it lowers the
threshold.

In Bitcoin, the concensus algorithm for updating the public ledger
relies on miners.
A miner is an entity that tries to find a nonce for a block of
transactions that meets the threshold.
The first miner to do so gets the right to add the block to the
bitcoin blockchain.
And their reward is some bitcoin.
The Proof of Work consensus algorithm is a bit complicated to explain
how the consensus is actually reached, we will discuss that later.

Here is a simplified version of how a block might look
in a cryptocurrency like Bitcoin.
The key idea added here (compared to the Intro module) is the box
labled "Nonce".
What you should do is add data to each block, and then click the
"Mine" button.
This will discover nonces that cause the proper number of zeros (four
in our example) to appear in each hash value.
Then try modifying the data in a block, to see which other blocks are
affected.
You can always click the "Mine" button again to get a consistent set
of nonces and hash codes.

.. _BlockchainNonceExample:

.. avembed:: AV/Blockchain/BlockchainNonceExample.html pe
   :long_name: Blockchain Nonce Example


Who is a Miner?
~~~~~~~~~~~~~~~

During the infancy of cryptocurrencies, miners would be enthusiasts
who would utilize their spare compute power on their laptop or desktop
to mine coins.
As the popularity of these coins have become and their prices rising,
many individuals have bought more computers and even warehouses to
harness as much compute power inorder to mine as many as possible.
As the major cost of mining comes from the electricity to power these
computers, many miners try to exploit areas of low electricity costs.

As the value of Bitcoin in particular has risen, the cost to mine a
new block has grown.
This has become a major consumer of electricity, estimated to account
for one half of one percent of all power consumed in the world
in 2021.
This in turn has become quite controversial.
