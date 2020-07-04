.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Blockchain Basics
=================

What is a Blockchain?
---------------------

At the very core of the concept, Blockchain is a linked list! 
That is, data is contained in nodes and these nodes point to a successor.
However, these linked lists differ in that the pointers are hash pointers that derive 
from the data of node and the previous hash pointer. In other words, 
the hash pointer of a node X depends on state of the chain thus far 
(represented by the previous hash pointer) and the data in node X.
Therefore, using the same hashing process, the data of a node is verifiable.

Public Ledgers
--------------

A public ledger is a common use of the blockchain concept. The goal of the public 
ledger is to:

- keep the identities of the network participants are secure and anonymous
- keep a record book of all genuine transactions between participants
- keep the state of all participants based on the transactions that have occurred

Consider the use case of debt between a group of people. Instead of paying,
debt is recorded to resolve sometime in the future. The ledger 
would keep track of all transactions using a blockchain, 
update the state of those involved by adding or 
subtracting from their money balance, verify the participants using 
public and private keys, and keep identities secure if necessary.
At all times, all debts are publicly known, verifiable, and immutable.

.. avembed:: AV/Blockchain/splitwise.html pe
   :long_name: Splitwise Example Diagram

Distributed Public Ledgers
--------------------------

Distributed ledgers are one level of abstraction further than public ledgers.
The same goals persist. However across a network of nodes, there are copies of the 
verified state of the blockchain. With new data to store, blocks are produced by the 
nodes, one is chosen to become the next block of the main chain, and all nodes then 
overwrite their chains with the new and current copy of the blockchain. This eliminates 
central authority of the blockchain and adds a level of consensus that preserves the 
immutability of the ledger.

.. avembed:: AV/Blockchain/distributedLedger.html pe
   :long_name: Distributed Ledger Diagram

What's The Point?
-----------------

The hash pointers are an added level of complexity that aim to render the 
blockchain immutable. What is stored and logged in the blockchain cannot be undone 
or changed in any way. This serves to act as a neutral third-party in a transaction.

Without getting into too much detail, producing hash pointers allow for that immutability.
To produce a block in the chain, a hash pointer must also be offered. Due to the constraints on 
the hash pointer, it takes a significant amount of time to produce.

Now consider the intent of changing a prior record. This means that the goal 
is to change the data of a node, and hash it in conjunction with the previous hash pointer of that node.
However, this creates a different hash pointer and requires a new hash pointer to be computed for 
every successive block. While possible, the main blockchain is continually growing and nullifies 
the intent because of how much work is continually added on top of what the attacker 
wished to change. The attacker has no incentive to try.

