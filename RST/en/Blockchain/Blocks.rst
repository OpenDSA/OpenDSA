.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Kyle Papili and Cliff Shaffer

Blocks & Nodes
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


What is a Node?
----------------------
Operating a decentralized blockchain requires coordination among multiple members of the network. These "members"
can be classified as nodes. In the case of Bitcoin, there are 3 classifications of nodes the make up the network. Each of these types of nodes serve
a different function that contribute to making the overall network operate effectively. 

A :term:`Full Node` is a node on the bitcoin network that contains a complete record of every block 
including all transactions stored within each block. Full nodes can be large in size, currently as large
as 300+Gb as they have to store a verbose copy of each individual transaction stored on the blockchain. 
The purpose of a full node, otherwise known as a super node, is to inspect the validity of any and all
new blocks appended to the blockchain. Full nodes serve as validators for mining nodes which submit 
potential solutions for new blocks, this process will be discussed more in chapter 3.
 
Conversely, there also exists a :term:`Thin Node` which only stores the headers of each block.
These headers contain the :term:`Merkle Root`, but they DO NOT contain a full record of the Merkle 
Tree. The purpose of thin nodes, otherwise known as light nodes, is to allow the blockchain network to scale
more easily than if each node were required to be a full node. Light nodes can rely on full nodes to provide them with
transaction verification without the need for them to store the full blockchain transaction history.

The third and final type of node is a :term:`Mining Node`. A Mining Node is tasked with completing an action, finding a compliant nonce, that
satisfies the current network difficulty level. We will discuss this in more detail in Chapter 3 Consensus Algorithms. These nodes must receive validation
from full nodes which have access to the full history of transactions on the chain. It is important to node that mining nodes are responsible for creating blocks
to add to the chain. Mining nodes are not responsible for the maintenance or validity of future blocks, this is the role of a full node. 