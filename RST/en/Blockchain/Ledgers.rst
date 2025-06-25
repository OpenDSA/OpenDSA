.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Public Ledgers
==============

Introduction
------------

Most businesses keep a "ledger", a book that describes the important
events (transactions) that took place.
A public ledger is a common use of the blockchain concept
In fact, supporting public ledgers is the main original motivator for
blockchain technology in the first place.
The idea of a public ledger is to make all of the transactions in the
system public, so that the operations on the application (all the
transactions) are transparant to all parties.

Typical goals of a public ledger are to:

- keep the identities of the parties in the transaction secure and
  anonymous, while also confirming who they are.
  (If that seems contradictory, look again at the section on public
  key cryptography.)
- keep a record book of all genuine transactions between participants.
- keep the state of all participants based on the transactions that
  have occurred

Consider the use case of debt between a group of people.
Instead of paying, debt is recorded to resolve sometime in the
future.
The ledger would keep track of all transactions.
This allows the system to update the state (account balance) of those
involved by adding or  subtracting from their money balance,
and verify the participants using public/private key pairs
(which, by the way, keeps the real-life identity of the participants
secure).
Because the ledger is made public, at all times, all transactions are
publicly known, verifiable, and immutable.

.. avembed:: AV/Blockchain/splitwise.html pe
   :long_name: Splitwise Example Diagram


Account Balances
----------------

When a blockchain is used to maintain a public ledger, it is a big,
long series of transactions.
Let's repeat that: The blockchain is a **Big**, **Long** series of
transactions.
Maybe millions of transactions, taking up hundreds of gigabytes of
space for the complete ledger.
That is far too much information to process sequentially in order to
find all the additions and subtractions to a participant's account, in
order to know their current account balance.

Fortunately, there is a fairly simple way to keep track of account
balances even within the paradigm of storing a series of transactions.
This is the :term:`Unspent Transaction Output` (UTXO) model.
Under this model, your total account balance is reflected by the
output of your transaction.
For example, if you currently have a total of 10 coins and you want to
buy a product that is worth 2 coins, your transaction must spend **all**
your 10 coins.
So, your transaction will actually send 2 coins to the seller address,
and send the 8 remaining coins (back) to your account.
With the  UTXO model, you don't have to trace back through multiple
transactions in the history to find out the participant's total
balance, as their total balance is stored at the latest transaction. 


Distributed Public Ledgers
--------------------------

A basic :term:`public ledger` is probably maintained by some central
entity.
A blockchain is used to guarantee that the prior transactions have
not been tampered with.
So long as the current start hash for the blockchain is publicly
known, even the central entity that controls updating the ledger
cannot modify the contents of the ledger without everyone realizing
that something has gone wrong.
However, this does not stop the central keeper of the ledger from
adding whatever transactions they want.
If everyone trusts the central keeper, that is fine.
But there are applications where the users of the system don't want
there to be a central keeper of the ledger.

:term:`Distributed ledgers <distributed ledger>` are public ledgers
that do not have a central controller who is in charge of adding
blocks to the system.
A distributed ledger has all of the goals of any public ledger.
However, across a network of nodes, there are multiple copies of the
ledger (the blockchain and its contents).
In fact, anyone is welcome to keep their own copy.
The challenge is how to add new data to the blockchain when there is
no trusted party to do this.
This is where the Consensus Algorithm comes in.
Those are complicated (aside from the cryptography primitive
functionality,
they are the only part of blockchain technology that is in fact
complicated).
We will talk about these in detail in later modules.
For now, you can just accept that there is an agreed upon way by which
some members of the community can propose new blocks to be added to
the blockchain, along with a mechanism for the community to
collectively accept the update.

.. avembed:: AV/Blockchain/distributedLedger.html pe
   :long_name: Distributed Ledger Diagram
