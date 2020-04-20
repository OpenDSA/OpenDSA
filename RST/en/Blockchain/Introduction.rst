.. This is the beginning file for Jesse and Bailey's 
.. undergraduate research to create the Blockchain tutorial

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Understanding Blockchain
========================

Introduction to Tutorial
------------------------

The goal of this tutorial is to give you a thorough understanding of
what Blockchain is, how it works, and what it is used for.
We start with a basic introduction to what a blockchain is
(it is amazingly simple!).
Then we will go through the fundamental background on cryptography
concepts that are Blockchain uses, followed by a discussion of the
basic data structures.
Then we'll talk about how distributed Blockchains can be updated
reliably, using what is called a Consensus Algorithm.
We will examine in detail the most famous use for Blockchain:
Cryptocurrency.
We'll show how the original cryptocurrency (Bitcoin) works, and how it
differs from a few other well-known cryptocurrencies.
Finally, we will present other uses for Blockchain.

The most important thing to know about Blockchain is that
**none of this is difficult**.
(Well, except for some of the cryptography parts.
But you can consider all of the hard parts there as a black box.
You only need to understand what the basic cryptograpy services
provide to a Blockchain system, not necessarily how they work.)
The main reason why many people find Blockchain confusing is because
you need to put about half a dozen unfamiliar (but easy) things
together to get full understanding. 

As we begin to explore a blockchain, we need to first understand the
concept of a hash, which is the backbone for all blockchain
applications.
If you have ever used a hash table or worked with passwords, then you
know what a hash is.
In a broad definition, a hash is a function that converts an input of
letters and numbers into an output of a fixed length.
A hash is created using a specific algorithm (so that if you give the
same information to the hash again, you get the same result).
Ideally (for reasons that we will see soon), we would like for it to
be fairly impossible to recover the original information if all we
know is the hash.

There are many different hashing algorithms out there that are used
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
If we look at the following example, you can type anything and see
its unique SHA-256 hash.

.. _HashExample:

.. avembed:: AV/Blockchain/HashExample.html pe
   :long_name: Blockchain Hash Example

Throughout this tutorial, we will use the SHA-256 hash method whenever
we need to generate a hash value.
But showing 64 characters in the visualizations is unwieldy. 
So, we will only show the first 16 characters, as shown here.

.. _SmallerHashExample:

.. avembed:: AV/Blockchain/SmallerHashExample.html pe
   :long_name: Smaller Blockchain Hash Example 

As we dive deeping into Blockchain, we will look at a simple example
of a "block".
In the figure below, we show a block as having some number and then
some data.
The data might be structured, like a list of transactions.
But in this example, its just text.
The point is that hashing a "block" just means taking the various
fields (here, the block number and the data), and concatenating them
into a single quantity that is hashed by SHA-256.

.. _BlockExample:

.. avembed:: AV/Blockchain/BlockExample.html pe
   :long_name: Block Example

Blockchains are nothing more than a chain of blocks in a linked list,
where each block incorporates into its data the hash of the block that
comes before it.
The figure below demonstrates that when we change the the data of one
block, we are altering its hash, and therefore we are altering the
resulting hash of every block that comes to its right.
Try changing some of the data fields to see how this works.

.. _BlockchainExample:

.. avembed:: AV/Blockchain/BlockchainExample.html pe
   :long_name: Blockchain Example

This is how a blockchain is "secure".
We cannot change an earlier block in the chain without causing an
inconsistency in the values of the blocks that come after.

This next example shows a Bitcoin example of a blockchain.
This conveys the idea of a nonce and how it effects the mining process.

.. _BlockchainNonceExample:

.. avembed:: AV/Blockchain/BlockchainNonceExample.html pe
   :long_name: Blockchain Nonce Example

Below is a slideshow demonstrating these importance of each of these
concepts as a blockchain would grow.

.. inlineav:: llistBlockchain ss
   :long_name: Blockchain Slideshow 1
   :links: AV/Blockchain/llistBlockchain.css
   :scripts: AV/List/llist.js AV/Blockchain/llistBlockchain.js
   :output: show
