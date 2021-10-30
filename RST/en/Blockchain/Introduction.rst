.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell, Jesse Terrazas, and Cliff Shaffer

Understanding Blockchain
========================

About this Tutorial
-------------------

Why a tutorial on Blockchain?
Isn't there already plenty of material about Blockchain
on the Internet?
Yes, there is.
But in our experience, much of it does a poor job of
either explaining the pieces or putting the pieces together.
And while there many popular press articles about Blockchain these
days, one usually comes away from them not really knowing any more
than when you started.

What about Blockchain books?
Are there any good ones?
Yes, absolutely.
In particular, we can recommend that you read:
Arvind Narayanan, Joseph Bonneau, Edward Felten,
Andrew Miller, and Steven Goldfeder,
*Bitocoin and Cryptocurrency Technologies*,
Princeton University Press, 2016.
You can probably find a free copy if you search the Internet.
While it is more focussed on the cryptocurrency side of Blockchain
technologies, it does go through all the basics, and it is relatively
comprehenisble.

But there are reasons why we feel this tutorial is a valueable
addition to the Blockchain literature.
First, we want to provide a reasonably comprehensive introduction to
the basics of Blockchain, but not in a book-long setting.
Our goal is to give you enough that you can hope to understand what
the typical Blockchain research paper is talking about when it dives
into the details.
And so that you have enough background to fill in the inevitable
blanks in any popular press or business article about Blockchain.
The second reason for this tutorial is our unique ability to provide
interactive visuals.
As part of the OpenDSA project, we are able to present our content
with various widgets and slideshows that can help you to try things
out for yourself, or better see how an algorithm works.


An Overview of Blockchain Concepts
----------------------------------

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
Then we will discuss the concept of a smart contract and what it is
used for.
Finally, we will discuss how all these concepts have been used for
other applications of Blockchain.

The most important thing to know about Blockchain is that
**none of this is difficult**.
(Well, except maybe for some of the cryptography parts.
But you can consider all of the hard parts related to cryptography as
a black box.
You only need to understand what the basic cryptograpy services
provide to a Blockchain application, not necessarily the details for
how the cryptography works internally.)
The main reason why many people find Blockchain confusing is because
you need to put about half a dozen unfamiliar (but easy) things
together to get to an application.

The most basic concept in blockchain is a hash, which is the backbone
for all blockchain applications.
If you have ever studied how hash tables work or if you know how
password systems work, then you know what a hash is.
Broadly speaking, a hash is a function that converts an input of
some sort (in our case, strings and numbers) into an output
of a fixed length.
(In a hash table storage system, that output will be a slot in the hash
table.
But there are many other uses for hashes.)
A hash is created using some deterministic algorithm, so that if you
give the same information to the hash function again, you get the same
result.
Ideally (for reasons that we will see soon), we would like for it to
be fairly impossible to recover the original information, or even to
know anything about the original information, if all we
know is the hash.

There are many different hashing algorithms that are used
commercially, such as SHA-1, SHA-2, SHA-3, SHA-256, SHA-512, etc.
The one that we will focus on is SHA-256.
The Secure Hashing Algorithm 256, or SHA-256, has the reputation of
being one of the most secure ways to protect digital information.
SHA-256 always will generate a 256 bit quantity
(which can be viewed as 64 hexidecimal digits)
no matter what input you provide.
Viewed as a number, a 256-bit quantity has more permutations
than grains of sand on Earth!
In the following widget, you can type anything and see
its SHA-256 hash.
You should try it out, to get a feeling for how this works.
As you type things, the corresponding SHA-256 hash will be generated
automatically.

.. _HashExample:

.. avembed:: AV/Blockchain/HashExample.html pe
   :long_name: Blockchain Hash Example

Throughout this tutorial, we will use the SHA-256 hash method whenever
we need to generate a hash value.
But showing 64 hexidecimal characters in the visualizations is
unwieldy.
So, we will only show the first 16 characters, like this.
Try copy-and-pasting whatever you last typed in the widget above (that
shows the full hash conversion) into the box below.

.. _SmallerHashExample:

.. avembed:: AV/Blockchain/SmallerHashExample.html pe
   :long_name: Smaller Blockchain Hash Example 

Next, let's consider a simple example of a "block".
In the figure below, we show a block as having some number and then
some data.
The data might be structured, like a list of transactions.
But in this example, it's just text.
The point is that hashing a "block" just means taking the various
fields (here, the block number and the data), and concatenating them
into a single string that is hashed by SHA-256.
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
As new blocks are added on the right side, they incorporate the hash
of the block to their immediate left, to form a chain.
Change data in any block, and you see that we are also
altering its hash, and therefore we are altering the
resulting hash of every block that comes to its right.
Try adding data into the data fields below.
Then change some data fields, and observe which hash values change as
well.
To be clear: An "earlier" block is to the left in the diagram,
and is being pointed at by the "later" block immediately to its
right.
The leftmost block is the "first" block in the Blockchain.
We somewhat arbitrarily give it a "previous" hash code of all zeros.

.. _BlockchainExample:

.. avembed:: AV/Blockchain/BlockchainExample.html pe
   :long_name: Blockchain Example

Here is how a blockchain is "secure":
We cannot change the data in an earlier block in the chain without
causing an inconsistency in the values of the blocks that come after.
If you hold the hash to the first block in the chain,
then nothing in any part of the blockchain can be altered without your
knowledge, because doing so will make your hash no longer match with
the altered contents of the blockchain.
Changing the data in the right-most block above obviously changes the
hash for that block (and you know that it has been changed if you are
holding a copy of the what was the hash code before the change).
But also, changing any other block in the chain will also ultimately
change the hash code of the right-most block (by the cascading change
in hash codes that moves to the right from whever the data gets
changed).
You should try this out in the widget to make sure that you
understand.

This explains everything that there is to know about an actual
blockchain, though there is a lot more to know about how blockchains
are useful for real applications.
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
