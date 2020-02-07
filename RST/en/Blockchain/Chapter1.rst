.. This is the beginning file for Jesse and Bailey's 
.. undergraduate research to create the Blockchain tutorial

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Chapter 1
=============================================

Introduction to Tutorial
------------------------

a) What this is about: The basics of blockchain, the uses of blockchain. One of which is cryptocurrency.
b) None of this is difficult (except for the cryptography parts, which we will make easy by treating as a black box). It's just confusing because you need to put a few unfamiliar (but easy) things together to get understanding.

As we begin to explore a blockchain, we need to first understand the concept of a hash which is the backbone of blockchain networks. If you have ever 
used a hash table or working with passwords, you have definitely came across what a hash is. In a broad definition, a hash is function that converts an 
input of letters and numbers into an encrypted output of a fixed length. A hash is created using a specific algorithm. There are many different hashing 
algorithms out there, such as: SHA-1, SHA-2, SHA-3, SHA-256, SHA-512, etc. The one that we will focus on is SHA-256. The Secure Hashing Algorithm 256, or
SHA-256, is defined as one of the most secure ways to protect digital information. SHA-256 always will generate a 256 bit (64 character) long random character 
sequence of numbers and letters no matter what input your provide. The reason that this algorithm is so amazing is that its ability to create more hash permutations
than grains of sand on Earth! If we look at the following example, you can input anything and see its unique SHA-256 hash. 
with three lines. 

.. _HashExample:

.. avembed:: AV/Blockchain/HashExample.html ss
   :long_name: Blockchain Hash Example

As we dive deeping into the building blocks of blockchain, we will look at a simple example of a block. In the figure below, we can see that 
our block has a corresponding number and then some data corresponding to it. What we do here is concatenate the block number to the data that 
is given to create a new hash.

.. _BlockExample:

.. avembed:: AV/Blockchain/BlockExample.html ss
   :long_name: Block Example

Blockchains are blocks that utilize the previous block's hash to "chain" together and create the blockchain. It is a linked list where 
the pointer of each block points to the previous block's hash. The figure below demonstrates that when we change the the data of one block
we are altering the pointers and hashes from all the blocks behind it. 

.. _BlockchainExample:

.. avembed:: AV/Blockchain/BlockchainExample.html ss
   :long_name: Blockchain Example

This example shows a Bitcoin example of a blockchain. This conveys the idea of a nonce and how it effects the mining process.

.. _BlockchainNonceExample:

.. avembed:: AV/Blockchain/BlockchainNonceExample.html ss
   :long_name: Blockchain Nonce Example

This is a simulation of a blockchain step-by-step with the inclusion of the nonce

.. inlineav:: llistBlockchain ss
   :long_name: Blockchain Slideshow 1
   :links: AV/Blockchain/llistBlockchain.css
   :scripts: AV/List/llist.js AV/Blockchain/llistBlockchain.js
   :output: show