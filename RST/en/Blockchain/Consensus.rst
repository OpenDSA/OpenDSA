.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Lenny Heath, Cliff Shaffer, Bailey Spell, and Jesse Terrazas
   :requires:
   :satisfies:
   :topic:

Consensus Algorithms Introduction
=================================

What is a ledger?
-----------------

Most applications that have a use for a Blockchain are in some sense
keeping track of a bunch of transactions, in the form of records that
add or subtract resources from some entity.
This sort of collection of transactions is referred to as a
:term:`ledger`.
Defining the contents of a ledger is the heart of any system that
employs a blockchain.

What is a distributed ledger?
-----------------------------

Now that you understand how a blockchain works, you can understand
one of its most fundamental properties: Anyone who knows just the
hash pointer to the head of the blockchain, and who also has access to
the nodes of the chain, is able to verify that the chain is "correct".
Meaning that anyone with access can see that the chain has not been
tampered with.

This fundamental property is what makes it possible to distribute the
blockchain (i.e., the ledger for the system), so that many
participants hold a copy.
In some cases, there might not even be "the real" or "canonical" copy
of the ledger.
There are simply a lot of participants who hold a copy, and so long as
they agree on the contents (which everyone can verify from knowing the
hash pointer to the head block), things are fine.

How can a distributed ledger be updated?
----------------------------------------

But simply being able to hold your own copy of the ledger is
rather useless on its own.
To be truly useful, there has to be a way to update the ledger.
This is relatively easy if there is only one central "controller" for
the ledger.
That entity can update the ledger, and then broadcast to other
participants both the new head hash pointer, and copies of the
blockchain nodes.
Which means that still everyone can hold their copy of the ledger if
they like, everyone can verify that prior blocks have not been changed
("tampered with"), and everyone can verify that the latest changes are
self-consistent with the rest of the chain.

But a central authority who has sole ability to modify the ledger is
not acceptable to participants in certain types of systems.
Most notably, cyrptocurrencies are considered to be more useful as a
currency system if there is no "owner" who has control of updating the
ledger.

What is a consensus algorithm?
------------------------------

So, what does this mean in practice?
We want to be able to both distribute (make copies of) the ledger,
**and** we want multiple entities to be able to update the ledger.
Well, if we are going to do that, then it is essential to 
attain a reliable :term:`consensus` on the contents of the ledger.
Specifically, this means that everyone has to agree on what is the
contents of the next block to add to the blockchain.
The process by which the blockchain is updated and everyone agrees on
this update is called a :term:`consensus algorithm`.

A variety of consensus algorithms have been proposed and implemented.
These include :term:`Proof of Work`, :term:`Proof of Stake`,
:term:`Byzantine agreement`, and variants of each.
Two fundamental features of a consensus algorithm
are (1) who is most able to control defining the next block (or the
probability distribution among possible contributors to decide who
gets that right), and (2) the actual mechanism for communicating the
update information among all observers of the ledger.

There are at least two challenges to implementing the mechanics
of distributing this update information to reach consensus in a
distributed environment.
The first challenge is that there is no guarantee of a 
universal clock or of message delivery to rely on.
Only after making some reasonable timing assumptions can an algorithm
be certain that all messages have been successfully delivered and that
a consistent decision has been reached.
The second challenge is that there may be malicious 
actors in the system who are not honest (do not follow the consensus 
protocol) and who even subvert other actors in the system.
If there are enough malicious actors (often called *adversaries*) in
the system, then no consensus algorithm can be successful.
Consequently, there must be assumptions about the powers of an
adversary and about what fraction of actors are honest.
Generally, there are assumptions about the communication network as
well.
Fortunately, good consensus algorithms can succeed so long as a
majority of the participants are "honest".

Consensus has clearly failed if there is a long-lasting *fork* in the 
blockchain, where more than one block has been accepted as the next block 
in the blockchain by different groups of participants.
Pay particular attention to the way in which each consensus protocol
avoids long-lasting forks.

Rather than discuss consensus protocols in the abstract, we address 
consensus concretely in existing blockchain systems.
These systems naturally fall into two categories:
:term:`permissionless systems` where anyone can  
join as a potential participant in the consensus protocol;
and :term:`permissioned systems`, where only designated, trusted
participants are allowed to perform the consensus protocol.
Permissionless systems are more common, and we consider these examples:

* Bitcoin
* Ethereum
* Algorand

Each of these systems has an associated cybercurrency.
Though, a cybercurrency is not essential in a permissioned system,
this is just what they have mostly been used for historically.

We also will describe this  permissioned system:

* Hyperledger
