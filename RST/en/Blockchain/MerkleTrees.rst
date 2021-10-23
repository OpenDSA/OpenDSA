.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell, Jesse Terrazas, Kyle Papili, and Cliff Shaffer

Merkle Trees
============

The Problem that Merkle Trees are Meant to Solve
------------------------------------------------

Many Blockchain applications require storing some form of transaction
between two parties.
For example, a cyptocurrency like BitCoin uses the blockchain to store
a record of all the transactions ever done involving one party sending
bitcoins to the another.
Over time, the blockchain will contain a huge number of transactions.
Generally, Blockchain applications will not want to store one
transaction per block, but rather is likely to store many transactions.
For example, as of September 2021, one block the Bitcoin blockchain
anywhere from 1,500 to 2,500 transactions.
In June, 2021, the entire blockchain stored millions of transactions,
comprising 350 Gigabytes of data.

A fundamental operation in a typical blockchain application is to
verify that a specific transaction is indeed stored somewhere on the
blockchain.
Given the huge number of transactions that might be involved, it is
not practical to seach linearly through every transaction in the
chain.
We need to find a faster way to search for a given transaction.


Merkle Trees
------------

A Merkle Tree (or Hash Tree) is a tree where the leaf nodes contain
the cryptographic hash for a single transaction.
All internal nodes store the hashes of their left and right child
nodes, and a hash of those two values.
This means that the root node of the tree contains a hash that is
affected by of all leaves that were continually paired and hashed.

.. inlineav:: MerkleTree ss
   :long_name: Merkle Tree Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTree.js
   :output: show


Why Is It Useful?
-----------------

Recall (see :ref:`Blocks & Nodes <Nodes> <Blocks>`) that many
participants in a blockchain ecosystem are "Thin Nodes".
This means that they only keep a relatively small amount of
information on hand about the blockchain:
That is, the hash for each block and a small amount of metadata about
the block.
When a Thin Node wants to confirm whether a particular transaction is
indeed on the blockchain, it first will get the necessary information
from an entity that maintains more information.
This might be a node that stores the complete blockchain, or it might
be a "block explorer", which indexes that blockchain transaction
database.
The information that comes back will typically be something like the
block number and transaction index within the block, along with the
complete contents of the block that the entity reports as containing
the transaction.

However, since anyone can participate in a distributed ledger
blockchain system, a given thin node might not trust the entity
providing this transaction information.
The thin node would like a way to verify that information that was
just provided to it is in fact taken from the blockchain.
Since blocks are rather large, it would be time consuming to work
through the entire contents of the block to verify that everything is
consistent with the hash for the block that the thin node has stored.


Simple Payment Verification
---------------------------

Now that we understand what a Merkle Tree is, let's see how it helps
with verifying that a transaction is really part of the blockchain as
claimed by a 3rd party information provider.
The primary use-case of Merkle Trees in common public Blockcahins,
Bitcoin included, is to serve as an efficient means of providing
customers with :term:`Simple Payment Verification` (SPV).
SPV is a process by which a node on the network can easily verify that
a transaction took place.

.. inlineav:: MerkleTreeVerification ss
   :long_name: Merkle Tree Verification Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTreeVerification.js
   :output: show

A :term:`Merkle Proof` is an efficient means of proving that a
transaction is legitimate.
As shown in the figure in 1.3, transaction 2 was verified 
using only 3 different values.
This merkle proof consists of O(log(n)) hashes plus the final root
hash.
The thin node can then compute the root node by 
itself using the provided O(log(n)) hashes and compare its calculated
root node to the root node stored in the block header.
If the calculated and actual root nodes match, the transaction is
verified.
This is a much more efficient means of payment verification
than requiring any thin node to store the entire 
transaction history of one or more blocks. 
