.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Merkle Trees
============

Merkle Trees
------------

A Merkle Tree (or Hash Tree) is a tree where all leaf nodes contain the cryptographic hash of a single 
data block. All internal nodes combine the hashes of their left and right child nodes and store a hash 
of both values. This means that the root node of the tree contains a hash that is the result of all leaves 
that were continually paired and hashed. Merkle Trees are essential in providing data integrity in the blockchain.

.. inlineav:: MerkleTree ss
   :long_name: Merkle Tree Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTree.js
   :output: show

How Is It Used?
---------------

Merkle Trees act as the message hash of a single block. So far in this module, the requirement of a message has been to represent it as a hash so that we may derive a hash pointer. The Merkle Tree satisifies this with the root hash value. The root is representative of all data leaves of the tree and can act as the message hash.

The primary use-case of Merkle Tree's in common public Blockcahins is to serve as an efficient means of 
verifying that transactions are legitimate. In the case of Bitcoin as of September 2021, one block added to 
the chain contains anywhere from 1.5k to 2.5k transactions each. Imagine a malicious user was attempting to add
 a new Block to the chain with an altered transaction. Without a Merkle tree, identifying this unauthorized 
 editing of prior transactions would requiring comparing each and every individual transactions hash to one 
 another. The use of a Merkle tree enables the Block to store the Merkle Root which serves as a "proof of 
 legitimacy" indicator for all transactions within the given block. If any un-trusted user attempts to change 
 a transaction within the block, the Merkle Roots will not be the same and there will be a clear indicator of 
 fraudulency in the chain.

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
To this end, it's important to note that the branches of a Merkle Tree are inherently modular. 
The verification of a single transaction does not require the verification of every other transaction as shown below.

.. inlineav:: MerkleTreeVerification ss
   :long_name: Merkle Tree Verification Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTreeVerification.js
   :output: show



