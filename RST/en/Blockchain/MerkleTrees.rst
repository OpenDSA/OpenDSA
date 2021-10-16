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


How Is It Used?
---------------

Given a block storing many transactions, the block can also store the
Merkle Tree created from the transactions.
Merkle Trees's root hash acts as the message hash of that block.
The primary use-case of Merkle Trees in common public Blockcahins is
to serve as an efficient means of providing customers with
:term:`Simple Payment Verification (SPV)`.
In theory, you could provide SPV without the need for a Merkle Tree by
hashing all the transaction IDs together in a single block.
However, this would require users to process the transaction IDs of all
transactions in that block in order to verify any given individual
transaction. 

In the common use-case of a customer paying a merchant or another
individual for goods or services, it is necessary for either or both
parties to be able to quickly search the blockchain and tell whether
or not this transaction has been included.
The idea is that a Merkle tree allows this verification to take place
in logarithmic time, rather than linear time.

.. inlineav:: MerkleTreeUsage ss
   :long_name: Merkle Tree Usage Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTreeUsage.js
   :output: show

The use of a Merkle tree allows a user to query the network for the hash of the given transaction they're hoping to 
verify. Referencing the diagram above, if you are hoping to verify transaction 4, you'd query the network for H(4) and it
would return H(H1+H2) and H(3). If the Merkle root formed from these hashes, in combination with the H(4) you're trying to verify, 
matches the Merkle root of the block, then it is clear that the transaction has been added to the chain. 

Why Is It Useful?
-----------------

Merkle Trees are useful in providing for less overhead per piece of data. To need a block for a single piece of data 
would mean a quickly growing chain where the verification work largely exceeds the information kept. Merkle Trees allow 
for an incredible amount of different data to be stored into a singular hash. These are called the transactions of a block. 

They also provide a way to not only create another level of cryptographic security. With each tree level, there exists more 
hashes that act as a level of security. In addition to finding a nonce that agrees with the previous hash pointer
and the message, the message itself contains a hurdle: an entire half of the tree must be made to agree with the Merkle root when one 
transaction is changed. In the same way that a malicious actor would change the message of a block and reproduce 
a new hash pointer, the same actor would change a transaction. However, this change must agree with verification of the tree.

This fact leads us to the fact that Merkle Trees also allow these transactions to be efficiently verifiable. 
The Merkle Tree enables verification of transactions in 
To this end, it's important to note that the branches of a Merkle Tree are inherently modular. 
The verification of a single transaction does not require the verification of every other transaction as shown below.

.. inlineav:: MerkleTreeVerification ss
   :long_name: Merkle Tree Verification Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTreeVerification.js
   :output: show



