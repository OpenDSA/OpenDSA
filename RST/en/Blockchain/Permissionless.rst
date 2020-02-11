.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Lenny Heath, Cliff Shaffer, Bailey Spell, and Jesse Terrazas
   :requires:
   :satisfies:
   :topic:

Permissionless Consensus Algorithms
===================================

Introduction
------------

In this module we will introduce some examples of permissionless
consensus algorithms.
Since historically these have been developed for and primarily
associated with specific cryptocurrencies, we often mix up the
difference between the consensus algorithm and its associated
cryptocurrency.


The Original: Proof of Work and Bitcoin
---------------------------------------

The consensus protocol for Bitcoin is called :term:`Proof of Work`.
It is called this because someone must "do work" to earn the right to
define the next block in the blockchain.
In Bitcoin, this is done by "solving" a "difficult" cryptographic
puzzle.
A Bitcoin block has an 80-byte header that includes a variable 4-byte
(32-bit) number called a :term:`nonce`.
The remaining 76 bytes are prescribed for other purposes.
Applying :term:`SHA-256` to the header produces a 256-bit hash.
Varying the nonce varies the resulting hash in, hopefully,
unpredictable ways.
The "puzzle" is to determine a nonce that makes the hash less than a
target hash value.
In fact, the whole point of using a good hash system is to make
"solving" the puzzle really nothing more than guessing nonce values.
And the Bitcoin system sets up the conditions for the probability of a
given guessed nonce to qualify (it has to generate a hash code less
than some value).
Setting the value that the hash has to be less than sets the
probability.
In this way, Bitcoin controls how much work a miner **probably** has
to do to "win" the right to determine the next block, by being the
first to find a nonce to go with their block data that generates a
hash less than the required value.

.. .. TODO::
..    :type: Demo

..    Here is a demo of changing the nonce of a block to achieve
..    different SHA-256 hashes and ultimately finding a hash less than a
..    target.

.. _PermissionlessNonceDemo:

.. avembed:: AV/Blockchain/PermissionlessNonceDemo.html ss
   :long_name: Permissionless Nonce Demo

The first miner to solve the puzzle for the next block of transactions is 
expected to propose that block of transactions as the next one in the 
blockchain.
Occasionally, more than one miner will propose different new 
blocks at roughly the same time.
In that case, there is a :term:`soft fork` of the blockchain as
multiple new blocks are added to the blockchain by  
different participants.
This is resolved in a decidedly heuristic fashion, by observing the
forks for a few more rounds until it is clear which fork the majority
of participants are adding to.
Blockchain is tuned to take about ten minutes per round (addition of a
new block), and the resolution heuristic is to wait for about six
rounds to be sure of the right fork to follow.
Hence, there can be roughly an hour of uncertainty 
about the status of the current end of the Bitcoin blockchain.

This real-time delay is one of the major concerns about the
scaleability of Bitcoin.
Another is the fact that the entire mining process consumes
significant real-world resources to no actual useful purpose aside
from driving the consensus process of the Bitcoin blockchain.


Ethereum
--------

:term:`Ethereum` is a blockchain system that has evolved its consensus methods 
over time.
It began with a Proof of Work strategy that is akin to, but 
not identical to, that of Bitcoin.
Its cryptocurrency is called :term:`Ether`.
Its new consensus strategy is a :term:`Proof of Stake` strategy 
in which the ability to propose a new block is based on the participant's 
stake in Ether.
For each round of proposing a new block, a participant 
makes a choice of whether to put in a fixed stake of Ether that cannot be 
spent that round and that gives the participant the possibility of being a 
part of agreeing on a block to propose.
The actual protocol for selecting a block is based on
:term:`Byzantine agreement`, which will succeed as long as more than
2/3 of the selected participants are honest.

Byzantine Agreement
~~~~~~~~~~~~~~~~~~~

Byzantine agreement is a classic problem in distributed computing that
is  concerned with agreeing on a value or a leader in the face of
faulty nodes or even malicious nodes.
The formal setting is a distributed system in which the set of nodes
can communicate with each other with messages determined by a
consensus protocol.
Some of the nodes are *honest* and will follow the protocol correctly,
while the remainder of the nodes are *malicious* or *faulty* and may
attempt to thwart consensus.
A key result is that more than 2/3 of the nodes must be honest for
successful consensus, which means that all the honest nodes agree on a
value within a finite number of communication rounds.
Within this context, a number of correct consensus algorithms exist,
all using cryptographic techniques as key components.

Things to discuss:

* How the algorithm works.
* Why create a new algorithm? Why not stick with proof of work?
* How did Etherium manage the process of changing its algorithm?


Algorand
--------

Needs to be done.
