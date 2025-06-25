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

In this module we introduce examples of permissionless
consensus algorithms.
Recall that a consensus algorithm is how the community agrees on
blocks to be added to the blockchain.
In a permissionless system, potentially any member of the
community could propose the next block to add.
Since historically these consensus algorithms have been developed for
and primarily associated with specific cryptocurrencies, people are
often confuse about the difference between the consensus algorithm and
its associated cryptocurrency.
In principle, a cryptocurrency could modify or even completely replace
its consensus algorithm (as Etherium proposes to do).


The Original: Proof of Work and Bitcoin
---------------------------------------

The consensus protocol for Bitcoin is called :term:`proof of work`.
It is called this because someone must "do work" to earn the right to
define the next block in the blockchain.
In Bitcoin, this is done by "solving" a "difficult" cryptographic
puzzle.
In practice, "solving a difficult cryptographic puzzle boils down to
guessing until you are sufficiently lucky. That will be explained
below.
But first, let's explain what a :term:`nonce` is.


What is a Nonce?
~~~~~~~~~~~~~~~~

A nonce is a number added to the contents of a block whose purpose is
to change the hash value of the block to achieve some goal.
Typically, a nonce is used in an application that relies on something
called Proof of Work.
The Bitcoin cryptocurrency is an example of such a system.
The idea behind Proof of Work is that a particpant in the
system, on average, has to take a certain amount of effort to find a
hash value that achieves the desired property.
The reason of this is explained when we discuss consensus algorithm.
For now, just know that we use the nonce to change the hash value of
the block.

The purpose of the nonce is to work with the data in the rest of the
block to cause the hash value to have some property, typically that it
be less than some threshold.
For example, the requirement of the system might be that all block
hash values have their leading digit be zero.

Recall that the hash value and the data that generated the hash are
rather unrelated, such that given the block data, it is hard to
predict what the hash value will be (until you actually make the
effort of running the hash algorithm).
Thus, picking a value for the nonce is effectively guessing what the
resulting hash value will be.
To simplify the math, let's assume that hash values are in base 10
(the ones that we actually show in our examples are in hexidecimal).
If picking a value for the nonce is effectively making a random guess
about the resulting hash value, then any nonce you pick has a one in
10 chance of making the first digit of the base-10 hash be a zero.

.. avembed:: AV/Blockchain/TextFieldHashingGame.html ss
   :long_name: Text-Field Hashing Game

.. avembed:: AV/Blockchain/NonceHashingGame.html ss
   :long_name: Nonce Hashing Game

How Mining Works
~~~~~~~~~~~~~~~~

You have probably heard the term ":term:`mining <miner>`" in the
context of Bitcoin or blockchain.
"Mining" simply means to try different values for the nonce
until some hash value with the right property is stumbled upon.
That property is usually that its value be below some threshold.
If the system wants to make the cost of finding a hash value be at a
certain level, then all the system needs to do is set the threshold to
be right.
For example (again, in base 10 values), setting the requirement to be
that the hash value have four leading zeros, then any nonce (and thus the
resulting hash value) has a one in ten thousand chance of hitting the
target.
If the system wants this cost to be hire, then it lowers the
threshold.

A Bitcoin block has an 80-byte header that includes a variable 4-byte
(32-bit) number called a :term:`nonce`.
The remaining 76 bytes are prescribed for other purposes.
Applying the SHA-256 hashing algorithm to the header contents produces
a 256-bit hash.
Varying the nonce varies the resulting hash in, hopefully,
unpredictable ways.
The "puzzle" is to determine a nonce that makes the hash less than a
target hash value.
In fact, the whole point of using a good hash system is to make
"solving" the puzzle really nothing more than guessing nonce values.

The Bitcoin system defines the probability that any given guessed
nonce value will qualify.
Specifically, the goal is to guess a nonce that results in a hash code
less than some value.
Setting the value that the hash has to be less than sets the
probability.
In this way, Bitcoin controls how much work a miner **probably** has
to do to "win" the right to determine the next block, by being the
first to find a nonce to go with their block data that generates a
hash less than the required value.

In the following example, type something into each of the data
blocks.
Then feel free to guess at nonce values that will make the system
consistent.
When you get tired of failing at that, click the "Mine" button to let
the computer do the work for you (by making a lot of guesses really
fast).
Then you can see how the nonces interact with the blockchain.

.. _PermissionlessNonceDemo:

.. avembed:: AV/Blockchain/PermissionlessNonceDemo.html ss
   :long_name: Permissionless Nonce Demo

Who is a Miner?
~~~~~~~~~~~~~~~

Bitcoin depends intimately on miners to work.
Miners take transactions that have been made and bundle them together
into blocks to define the block data.
They then spend effort by guessing nonces until they get one that
meets the requirement.
They then broadcast that block (with the hash value and the nonce) to
the system.
Why would they do that?
Because the system then rewards them with some Bitcoins.
(Specifically, miners are permitted to include in the block of
transactions a specific transaction to credit themselves with a
standard amount of BitCoin.)

During the infancy of cryptocurrencies, miners would be enthusiasts
who would utilize their spare compute power on their laptop or desktop
to mine coins.
As the popularity of these coins have become and their prices rising,
many individuals have bought more computers and even warehouses to
harness as much compute power inorder to mine as many as possible.
As the major cost of mining comes from the electricity to power these
computers, many miners try to exploit areas of low electricity costs.

As Bitcoins change in value, and therefore as the amount of compute
cycles put into mining changes,
the value that the hash has to be less than will vary to keep the
expected time to discover the next block roughly consistent.
This means that as the value of Bitcoin in particular has risen, the
cost to mine a new block has grown.
This has become a major consumer of electricity, estimated to account
for one half of one percent of all power consumed in the world
in 2021.
This in turn has become quite controversial.

Reaching Consensus
~~~~~~~~~~~~~~~~~~

So, the first miner to solve the puzzle for their block of
transactions has a lot of incentive to propose that block of
transactions as the next one in the  blockchain.
In theory, the first miner to do so defines for everyone in the system
the contents of the next block.
Unfortunately, it is way more complicated than that to "reach
consensus", because networks are not instantaneous.
In reality, guessing the right nonce then means that you *are able*
to propose a block that works.
But then, the change that you propose has to propogate through the
network.
This takes time.

Occasionally, more than one miner will propose different new 
blocks at roughly the same time.
In that case, there is a :term:`soft fork` of the blockchain as
different new blocks are added to the blockchain by  
different participants.
This is resolved in a decidedly heuristic fashion, by observing the
forks for a few more rounds until it is clear which fork the majority
of participants are adding to.
Blockchain is tuned to take about ten minutes per round (addition of a
new block), and the resolution heuristic is to wait for about six
rounds to be sure of the right fork to follow.
Hence, there can be roughly an hour of uncertainty before some block
is "secure" in having been added to the chain.
(Of course, by then it will be followed by increasingly less secure
blocks that are themselves undergoing the consensus process.)

This real-time delay is one of the major concerns about the
scaleability of Bitcoin.
Another is the fact that the entire mining process consumes
significant real-world resources to no actual useful purpose aside
from driving the consensus process of the Bitcoin blockchain.

The next step is to understand how the block propogation and consensus
process actually plays out in a network.

.. inlineav:: ProofOfWork ss
   :long_name: ProofOfWork Slideshow
   :links: AV/Blockchain/ProofOfWork.css
   :scripts: AV/Blockchain/ProofOfWork.js
   :output: show

How is a transaction propagated through network? Good question. 
When a node receives a transaction, it adds the transaction to a 
list that it maintains for the other nodes.
Each node has its own list contain all of the transactions it has
received, via itself or other nodes as well as transactions that it
might not have shared yet.
After a random delay, the node will send a message to all the other
nodes including its own transaction list.
Not every transaction is sent.
The node sorts the list by the number of ancestor transactions and fee
rates, so the parent transactions can be sent before the child ones.
Transactions selected from this sorted list are sent until there are
not any left or a limit has been reached, which rarely occurs. 

So what happens if two mining nodes both reach valid (but different) solutions at the same time? How does the network know which chain to agree upon as the single source of truth?


.. inlineav:: ProofOfWorkConsensus ss
   :long_name: ProofOfWorkConsensus Slideshow
   :links: AV/Blockchain/ProofOfWork.css
   :scripts: AV/Blockchain/ProofOfWorkConsensus.js
   :output: show


But what if some miner wants to claim a fraudulant transaction?
How does trusting the chain with the greatest amount of work prevent
fraud?

.. inlineav:: ProofOfWorkFraud ss
   :long_name: ProofOfWorkFraud Slideshow
   :links: AV/Blockchain/ProofOfWork.css
   :scripts: AV/Blockchain/ProofOfWorkFraud.js
   :output: show


In the example above, imagine that 'Blk B' as proposed by node 4
contains a fraudulent transaction pretending that some arbitrary user
sent node 4 $100.
It is entirely possible that node 4 can win the "mini lottery" of
proposing a valid solution to the chain and successfully have 'Blk B'
appended.
For the time being, this fraudulent transaction will begin to
propagate from node B to other nodes,
convincing different users on the network that this transaction did
indeed occur.
What prevents this inaccurate and fraudulent 'Blk B' from remaining
part of the chain is that node B is unable to consistently win the
"mini lottery" of solving the block puzzle before all other nodes. 

There will always be a greater number of nodes who have NOT yet
received any indication that the fraudulent transaction in 'Blk B'
exists.
This is because at first, there is only 1 node preaching the existence
of this fake transaction whereas all other nodes on the network are
working on the assumption that said transaction has never ocurred.

As time continues, we see that node 2 is the first node to propose the
next valid solution.
This solution does NOT fit the header of 'Blk B' due to the fact that
node B would never have been notified of the fraudulent transaction
present in 'Blk B', and thus would not produce a valid solution to
match the block.
Over time, the population of nodes who do not contain 'Blk B' will
continue to win the majority of puzzle solutions simply due to their
greater control over the network.
Eventually, every node will be forced to disregard any forked chains
with 'Blk B' since there exists such a greater proof of work
supporting the chain without 'Blk B'.

The only way for a malicious user to truly take over control of the
public ledger would be for a single entity to effectively and
continuously control over 50% of the network's computing power.
This is the only way to ensure that one user will continually beat-out
other nodes in the race to propose valid solutions for the next
block. In this regard, proof of work preserves consensus by increasing
the difficulty for one user to control the network.


Ethereum
--------

:term:`Ethereum` is a blockchain system that has evolved its consensus
methods  over time.
It began with a Proof of Work strategy that is akin to, but 
not identical to, that of Bitcoin.
Its associated cryptocurrency is called :term:`Ether`.
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

Proof of Stake
~~~~~~~~~~~~~~

:term:`Proof of Stake <proof of stake>` was developed to ensure
distributed consensus throughout a blockchain without relying on the
immense computational power and energy consumption required with the
:term:`proof of work` algorithm.

Proof of stake relies on transaction validators, as opposed
to the miners used by a proof of work system.
Validators will provide a stake of their assets
(typically some amount of the underlyingcryptocurrency) as collateral,
as explained above, in exchange for the right to verify transactions.
Depending on the currency, the amount of currency that needs to be
staked and the duration for how long the currency has been staked
determine the eligibility of a validator to be granted the right to
verify a new block.
To ensure that there is no foul play, the  
staked coins are lost if a validator verifies incorrect transactions;
however, if they validate honestly, they are rewarded with transaction
fees.

:term:`Ethereum` an implementation of a proof of stake algorithm
called :term:`Casper`.
Casper allowed the Ethereum ecosystem to transition proof of work` to
proof of stake`.
The transition from :term:`Ethereum` 1.0 to 2.0 was termed the
Serenity upgrade and has been taking place in 3 separate phases.
Each subsequent phase relies on the previous. 

Phase 0 launches the Beacon Chain which manages the
Casper proof of stake protocol.
Phase 1 introduces Shard Chains as a key to future scalability.
There will be 64 of these chains introduce during this phase and they
allow parallel transaction throughput.
This phase is primarily concerned about the shard chains construction,
consensus, and validity on the data.
Phase 2 brings all the functionality together.
Shard chains will become structured chain states opposed to simplistic
data containers while :term:`smart contracts <smart contract>` will
finally be introduced.
Phase 0 is expected to launch in late July 2020, while phase 1 and 2
are later in 2020 and 2021.


Algorand
--------

Algorand is another popular Blockchain platform that utilizes a unique
proof of stake consensus algoriithm.
Algorand uses what they call Pure Proof of Stake (PPoS).
This differs from Ethereum's algorithm in that there are no staked
coins to promote honesty.
The reason is that in the worst case,  
the staked coins are negligible in comparison to the malicious gain
an entity could make for itself in a large system.
Algorand places its security in the honesty of the majority of the
economy.

Using PPos, owners of the majority of money are able to prevent other
users from making transactions.
However, that would negatively affect the credibility built on the
system, the credibilty of the currency, and therefore would devalue
the stake that the majority has in the economy.
However, this power allows for the honest to promote the security and
reliability by stopping attackers in the minority.

Block generation is unique as well.
Algorand uses a two-phase process.
The first phase randomly selects a user to produce the next block.
The second phase chooses 1000 more users that act as the committee and
verify whether the block is correct.
The addition of a committee is so that if a bad actor were to be
chosen to produce a block, the committee would be able to successfully
catch the attempt.
No minority of bad actors would be able to successfully overturn  
the flagging of a malicious block. 

Lastly, everyone involved is chosen by themselves!
The power given to affect the blockchain is decentralized by requiring
everyone to run a cryptographically fair lottery.
Tokens deemed as winners by the lottery represent a committee member.
