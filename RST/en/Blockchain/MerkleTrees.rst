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

Merkle Trees are useful in providing for less overhead per piece of data. In the case of Bitcoin, Merkle Trees provide
an efficient means of :term:`Simple Payment Verification (SPV)` (described below). To need a block for a single piece of data 
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

Simple Payment Verification
---------------
Now that we understand what a Merkle Tree is, it is equally important to understand exactly how they are leveraged in Bitcoin and what purpose they serve.
The primary use-case of Merkle Trees in common public Blockcahins, Bitcoin included, is to serve as an efficient means of providing customers
with :term:`Simple Payment Verification (SPV)`. SPV is a process by which a node on the network can easily verify that payment has been made
and can be proven legitimate on the Blockchain.

When you swipe your credit card at a grocery store, the store is relying on payment providers such as Visa or Mastercard to "verify" that your credit
is sufficient and that the transaction has been processed. In order to accomplish this, Visa and Mastercard employ staffs of thousands of individuals, 
spanning multiple continents, all working to build and maintain infrastructure for payment processing systems. Bitcoin aims to accomplish this without the need
for human intervention while also avoiding the need for any trust in the process. In the credit card example, both the client and the merchant are forced
to trust that the payment processor is acting in an accurate and honest way. As we will learn, Simple Payment Verification provides both the client
and the merchant with an efficient means of verifying with absolute certainty that a given transaction has been appended to the Blockchain. 


As discussed in Chapter 0, there are different types of nodes on the Bitcoin network including thin and full nodes. In the example of a client and merchant,
it can be assumed that neither the client nor the merchant will be a full node. Full nodes are incredibly large as they store the entire history of all Blockchain
transactions. As thin nodes, the client and merchant still need a means by which they can acquire SPV. 

How Is It Used?
---------------
Imagine a similar scenario in which a grocery store needs to verify that a customer has indeed paid for their groceries. In technical terms, we can say that a 
thin node (grocery store) wants to verify that a given transaction, "X", has been added to the Blockchain.

A full node, having a full comprehensive history of every transaction in the chain, can perform a linear search for this transaction in the Blockchain. 
The transactions are sorted by their timestamp rather than transaction ID and thus, the complexity of this search is O(N) unless you choose to 
reference an external index data structure such as a website that indexes historical Blockchain transactions.

You may be wondering, if there exists an external data structure that contains this transaction, why do I need to work with a full node to get proof of its existence?
This emphasizes a fundamental strength of Blockchain technology which is removing any expectation of trust. There is no means by which you can 
prove the legitimacy of whatever data that external data structure is providing you. The owners of the website could have been compromised or could
have an error in their system. Merkle Proofs and SPV allow you to know with certainty that your transaction has been appended to the Blockchain.

A :term:`Merkle Proof` can be thought of as an efficient means of proving that a transaction is legitimate. As shown in the figure in 1.3, transaction 2 was verified 
using only 3 different values. This merkle proof consists of O(log(n)) hashes plus the final root hash. The thin node can then compute the root node by 
itself using the provided O(log(n)) hashes and compare its calculated root node to the root node stored in the block header. If the calculated and actual root 
nodes match, the transaction is verified. This is a much more efficient means of payment verification than requiring any thin node to store the entire 
transaction history of one or more blocks. 




