.. This is the beginning file for Jesse and Bailey's 
.. undergraduate research to create the Blockchain tutorial

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Chapter 4
=============================================

Merkle Trees
------------

A Merkle Tree (or Hash Tree) is a tree where all leaf nodes contain the cryptographic hash of a single 
data block. All internal nodes combine the hashes of their left and right child nodes and store a hash 
of both values. This means that the root node of the tree contains a hash that is the result of all leaves 
that were continually paired and hashed. Merkle Trees are essential in providing data integrity in the blockchain.

How Is It Used?
---------------

Merkle Trees are important when we give blocks in a blockchain more complexity. Instead of a singular message 
as shown in our demo, blocks hold several transactions that are recorded in the ledger. Merkle Trees are the 
solution to how we can derive the block hash (in part) where each of these transactions make a merkle tree, and 
the resulting root hash of the tree is used in creating a block hash.

.. inlineav:: MerkleTree ss
   :long_name: Merkle Tree Slideshow
   :links: AV/Blockchain/MerkleTree.css
   :scripts: AV/Blockchain/MerkleTree.js
   :output: show

Why Is It Useful?
---------------

Merkle Trees are useful in that they provide a way to not only create another level of cryptographic security, 
but also are efficiently verifiable. Transactions are what a malicious actor would change to effectively alter 
the blockchain and challenge the immutability. To this end, it's important to note that the branches of a 
Merkle Tree are inherently modular: provided we have the hash of some internal node, all transactions 
related to that hash are verifiable up to that internal node. In other words, the entire tree does not need 
to be verified to verify a single transaction. For a specific transaction, the computational steps 
to verify a transaction as unaltered relates to height of the tree logarithmically.

In addition to the verifiability, the hashing of each transaction creates a new level of complexity and security. 
In addition to mining for a new nonce that agrees with the hash pointer of a block, altering a transaction and 
therefore the Merkle Tree adds the work of making a verifiable Merkle Tree. 


