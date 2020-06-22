.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Mining in a Blockchain System
=============================

What is Mining?
---------------

Blockchain systems allows individuals to mine for more coins, just as one 
would mine for gold. Mining 

What is a Nonce
~~~~~~~~~~~~~~~

A :term:`crypotographic nonce`, similar to a :term:`nonce word`, is simply a 
random number that is only used once during cryptograhic communciation. 
The nonce allows for an extra layer of security within the blockchain system.
Typically, a nonce is used in a :term:`proof-of-work system`, Bitcoin, 
to ensure a variancewithin the :term:`hash pointers`. The nonce is included in the 
:term:`cryptographic hash function` to acquire a hash that satifies an arbitrary
condition agreed upon by all nodes within the network. For example, a system might
require that a hash have some arbitrary amount of preceeding zeros in front in 
order for the block to be accepted into the chain, which is where mining becomes important.


.. avembed:: AV/Blockchain/TextFieldHashingGame.html ss
   :long_name: Text-Field Hashing Game

.. avembed:: AV/Blockchain/NonceHashingGame.html ss
   :long_name: Nonce Hashing Game

How Mining Works
~~~~~~~~~~~~~~~~

Since a blockchain system creates hash pointers with a :term:`cryptographic hash function`
that is nearly impossible to predict what the value of some hash will be depending on the 
input, individuals need to :term:`mine` in order to "obtain" the specific amount of coins. 
The mining process is essentially :term:`miners` competing to be the first to create a block 
containing a nonce that will create a :term:`hash pointer` that has a certain number of 
preceeding zeros. These puzzles become increasing difficult as more coins become mined because 
if we recall the current blocks hash is determined by its previous blocks hash, its data, 
and now a nonce to create the correct number of zeros. These calculations are next to impossible
to guess as the only way to obtain the correct nonce is to simply guess (i.e. brute force attacks). 

The idea of mining is for your computer to guess the correct value of the nonce that makes 
the hash have the correct number of zeros. The first individual to compute the correct nonce 
is awarded the block and it is recorded into the ledger that they own the coin. This will 
normally take millions, billions or even trillions of guesses before the correct value gets 
found. Many miners try to obtain as much compute power as they can inorder become awarded the 
coin. 

One might wonder, what if two miners create a block with the correct nonce with the correct hash? 
Within these blocks, there will be different transactions that have occurred. Here, the miner 
who has construct a block, or mini blockchain, with the largest proof-of-work will be chosen by 
the system to be a part of the blockchain. 

The process of mining provides a structure of validating transactions and makes creating alternative
blocks extremely difficult. This is why a blockchain is exceptionally secure. A miner attempting to dupe
the blockchain would have to convince over half the nodes in the system that they are correct. Since 
each nodes has their own copy of the blockchain, it requires significant compute power to do so. There is 
a fear that a malicious group may gain 51% control of the blockchain and utilize their influence to 
their advantage. A 51% attack would cost an immense amount of money to obtain a profound amount of 
compute power. As of the end of 2019, it would take about 120 terrahashes per second to be computed inorder 
to mine one Bitcoin. 


Who is a Miner?
~~~~~~~~~~~~~~~

During the infancy of cryptocurrencies, miners would be enthusiasts who would utilize their spare
compute power on their laptop or desktop to mine coins. As the popularity of these coins have become 
and their prices rising, many individuals have bought more computers and even warehouses to harness 
as much compute power inorder to mine as many as possible. As the major cost of mining comes from the 
electricity to power these computers, many miners try to exploit areas of low electricity costs.
