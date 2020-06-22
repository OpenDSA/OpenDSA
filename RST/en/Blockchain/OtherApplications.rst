.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Other Applications
==================

Other Applications of Blockchain
--------------------------------

Blockchain is not only a distributed ledger for use with financial
transactions.
It can be the foundation for building trust between people that some
information has not been tampered with.
In this section we explore other uses cases of blockchain,
and companies that are utilizing this technology to transform how 
the world runs on trust. 

Blockone
--------

Block.one is a private company that creates open source blockchain
solutions.
Their main project is EOSIO with that allows of creating a real-world
blockchain platform.
EOSIO allows engineers to develop decentralized products at scale
whether it be on a mobile platform, within the browser, or any other
experiences.
It includes a high performance database (nodeos), multithreaded smart
contracts, and inter-blockchain communication (IBC) to provide
limitless transaction throughput rates.

They are also working on a blockchain backed social media platform
called Voice.
The goal of the platform is a rewards based social network to 
allow users to create, distribute, and discover new content.
Many social platforms today contain bots and fake accounts.
With Voice, the EOSIO protocol is used to inherit blockchain
characteristics such as auditability and security allowing for no fake
content and attribute any content back to the original source.

Git
---

Most software developers are familiar with version control systems
(VCS).
A VCS allows developers to track the history of a code repository and
view the differences between changes.
Git is probably the most popular VCS today.
So lets take a look at how Git and blockchain are related, and see if
Git is a blockchain system.

Git is similar to a blockchain in these ways:

* It is a distributed ledger in that every developer possesses a
  copy.

* It is a "chain" of manipulations that is immutable.
  The only changes that can occur are changes that have to be appended
  to the "chain".
  (Well, that is not absolutely true.
  It is possible for people with sufficient permission to do a "hard"
  reset to roll back or remove a commit.)

* It creates a unique hash for each commit (change) that occurs within
  the repository.
  If someone were to remove a hash, they would have to generate a
  hashes for the commits after the removed one.
  Even if you "git revert" the original change is still stored on the
  repository.

* It records what developer manipulated what, exactly how a blockchain
  will record who made a transaction.

Even though there are some similarities, there are differences that
make Git not exactly like a blockchain system:

* Forking a git repository is something that developers will often do.
  They will clone the existing repository and add their own changes
  without affecting the original one.
  But this won't be confused with the original version.

* It is not anonymous.
  Any change that is made is tied directly to the name of the
  developer that implemented the change.
  But that is not an intrinsic property of Blockchains anyway, only of
  certain applications (like cryptocurrencies) where anonymity is
  deliberatel built into the system.

* Anyone can add to the repository if they have the proper
  administrative access, therefore not requiring any proof of
  work/stake.
  Again, these proof of work/stake systems are application-dependent
  and not an intrinsic part of Blockchain.

