.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Kyle Papili and Cliff Shaffer

Blocks
======
What makes up a Block?
----------------------

A blockchain is simply a linked list of blocks, where each link of the
linked list has an associated hash code.
We have already seen how these hash codes provide a mechanism to
protect the blockchain from being modified without it becoming obvious
that this happened.
How let's talk about what might be found in one of the
blocks on a blockchain in a typical application.

The figure below provides a visual breakdown of the major  
components that might be found a given block.
No given application is likely to use all of these.
A brief summary of each item is included beneath the diagram. 

.. avembed:: AV/Blockchain/BlockDiagram.html pe
   :long_name: Bitcoin Block Diagram

**Block Size:** The size (stored in bytes) of the given block.

**Block Header:** An internal object of a block containing relevant metadata.

**Version:** Describes the version / protocol edition.

**Previous Block Hash:** The root hash of the previous block.

**Merkle Root:** The hash of the root node of merkle tree (see 3.1).

**Timestamp:** The timestamp of block's creation.

**Difficulty Target:** Numeric representation of difficulty when block was mined.

**Nonce:** Cryptographic key used to generate accurate hash.

**Transaction Counter:** Number of transactions in block.

**Transactions:** Collection of individual transactions.

.. TODO::
   :type: Explanation

   Explain the difference between thin and fat blocks, and why that is
   a relevant and useful distinction.
   
