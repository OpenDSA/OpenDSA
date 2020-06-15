.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Understanding Blockchain
========================

An Overview of Blockchain Concepts
----------------------------------

The goal of this tutorial is to give you a thorough understanding of
what Blockchain is, how it works, and what it is used for.
This section presents a quick overview of what a blockchain is.
(This is amazingly simple!)
In later sections, we will go through the fundamental background on
cryptography concepts that Blockchain relies on, followed by a
discussion of the basic data structures used by many Blockchain
applications.
Then we'll talk about how distributed Blockchains can be updated
reliably, using what is called a Consensus Algorithm.
We will examine in detail the most famous use for Blockchain:
Cryptocurrency.
We'll show how the original cryptocurrency (Bitcoin) works, and how it
differs from a few other well-known cryptocurrencies.
Finally, we will present other uses for Blockchain.

The most important thing to know about Blockchain is that
**none of this is difficult**.
(Well, except maybe for some of the cryptography parts.
But you can consider all of the hard parts there as a black box.
You only need to understand what the basic cryptograpy services
provide to a Blockchain system, not necessarily how they work
internally.)
The main reason why many people find Blockchain confusing is because
you need to put about half a dozen unfamiliar (but easy) things
together to get full understanding. 

The most basic concept in blockchain is a hash, which is the backbone
for all blockchain applications.
If you have ever used a hash table or know how password systems work,
then you know what a hash is.
Broadly speaking, a hash is a function that converts an input of
some sort (in our case, strings and numbers) into an output
of a fixed length.
A hash is created using some deterministic algorithm, so that if you
give the same information to the hash function again, you get the same
result.
Ideally (for reasons that we will see soon), we would like for it to
be fairly impossible to recover the original information if all we
know is the hash.

There are many different hashing algorithms that are used
commercially, such as SHA-1, SHA-2, SHA-3, SHA-256, SHA-512, etc.
The one that we will focus on is SHA-256.
The Secure Hashing Algorithm 256, or SHA-256, has the reputation of
being one of the most secure ways to protect digital
information.
SHA-256 always will generate a 256 bit quantity
(which can be viewed as 64 hexidecimal digits)
no matter what input your provide.
Viewed as a number, a 256-bit binary quantity has more permutations
than grains of sand on Earth!
In the following example, you can type anything and see
its SHA-256 hash.

.. _HashExample:

.. avembed:: AV/Blockchain/HashExample.html pe
   :long_name: Blockchain Hash Example

Throughout this tutorial, we will use the SHA-256 hash method whenever
we need to generate a hash value.
But showing 64 characters in the visualizations is unwieldy. 
So, we will only show the first 16 characters, like this.
Try copy-and-pasting whatever you typed above for the full hash
conversion into the box below.

.. _SmallerHashExample:

.. avembed:: AV/Blockchain/SmallerHashExample.html pe
   :long_name: Smaller Blockchain Hash Example 

Next, let's consider a simple example of a "block".
In the figure below, we show a block as having some number and then
some data.
The data might be structured, like a list of transactions.
But in this example, its just text.
The point is that hashing a "block" just means taking the various
fields (here, the block number and the data), and concatenating them
into a single quantity that is hashed by SHA-256.
(You can check this by copying the number and the text in the box back
into the hash widget above, and see if you get the same result.)

.. _BlockExample:

.. avembed:: AV/Blockchain/BlockExample.html pe
   :long_name: Block Example

A blockchain is nothing more than a chain of blocks in a linked list,
where each block incorporates into its data the hash of the block that
comes before it.
When we combine a pointer with a hash of the data that the pointer
points to, we get a hash pointer (surprise!).
In the figure below, the blocks are arranged from left to right with
the oldest block to the left, and the most recent block to the right.
As new blocks are added on the right side, they incorporate the hash to
their left, to form a chain.
Change data in any block, and you see that we are also
altering its hash, and therefore we are altering the
resulting hash of every block that comes to its right.
Try adding data into the data fields below.
Then change some data fields, and observe which hash values change as
well.

.. _BlockchainExample:

.. avembed:: AV/Blockchain/BlockchainExample.html pe
   :long_name: Blockchain Example

This is how a blockchain is "secure".
We cannot change the data in an earlier block in the chain without
causing an inconsistency in the values of the blocks that come after.

This next example shows a simple version of how a block might look in
a cryptocurrency like Bitcoin.
The key idea added here is the box labled "Nonce".
The purpose of the nonce is to work with the data in the rest of the
block to cause the hash value to have some property, typically that it
be less than some threshold.
For our example, the nonce has been picked so that the first 4 digits
of the hash are all zero.
The idea of "mining" is simply to try different values for the nonce
until some hash value with 4 zeros at the front is stumbled upon.
What you should do is add data to each block, and then click the
"Mine" button.
This will discover nonces that cause the proper number of zeros to
appear in each hash value.
Then try modifying the data in a block, to see which other blocks are
affected.

.. _BlockchainNonceExample:

.. avembed:: AV/Blockchain/BlockchainNonceExample.html pe
   :long_name: Blockchain Nonce Example

Below is a slideshow demonstrating the importance of each of these
concepts as a blockchain would grow.

.. inlineav:: llistBlockchain ss
   :long_name: Blockchain Slideshow 1
   :links: AV/Blockchain/llistBlockchain.css
   :scripts: AV/List/llist.js AV/Blockchain/llistBlockchain.js
   :output: show

You know have a rough overview of many basic concepts related to
Blockchain.
In the rest of this tutorial, we will cover:

* Cryptographic services associated with blockchain applications,
  including authentication of users.

* Data structures used by Blockchain implementations (Merkle Trees).

* More details on mining.

* How a blockchain can be distributed among users (called a
  "distributed ledger") so that no one user is the all-powerful
  "owner".

* How a distributed ledger can be updated in a way that makes it
  consistent for all users (done using a "consensus algorithm").

* How Bitcoin and other cryptocurrencies work.

* The idea of a smart contract.

* Some other applications for Blockchain.
