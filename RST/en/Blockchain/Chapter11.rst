.. This is the beginning file for Jesse and Bailey's 
.. undergraduate research to create the Blockchain tutorial

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Chapter 11
=============================================

Other Applications of Blockchain
--------------------------------

Blockchain is not only a distributed ledger that only holds value with 
finacial transactions, but to distribute trust among anything that people
put value in. In this chapter, we will explore other uses cases of blockchain
and companies that are utilizing this technology to transform how 
the world runs on trust. 

Blockone
--------

Block.one is a private company that creates open source blockchain solutions.
Their main project is EOSIO with that allows of creating a real-world blockchain
platform. EOSIO allows engineers to develop decentralized products at scale whether
it be on a mobile platform, within the browser, or any other experiences. It includes 
a high porformance database (nodeos), multithreaded smart contracts, and inter-blockchain
communication (IBC) to provide limitless transaction throughput rates. 

They are also working on a blockchain backed social media platform called 
Voice. The goal of the platform is a rewards based social network to 
allow users to create, distribute, and discover new content. In 
many social platforms today, they contain many bots and fake accounts. With Voice, 
the EOSIO protocol is utilized to inherit blockchain characteristics such as 
auditability and security allowing for no fake content and attribute any content 
back to the original source.

Git
---

Every software engineer has used the amazing version control system (VCS) called git
and is probably the most popular VCS. VCS's allow developers to track the history
of a code repository and view the differences between changes. So lets take a look
at how git and blockchain are related and if git is a blockchain system. 

Git is similar to a blockchain in the fact that it:

* It is basically a distrubuted ledger that every developer possess a copy. 

* It is a "chain" of manipulations that is immutable. The only changes that can occur
are changes that have to be appended to the "chain".

* It creates a unique hash for each commit (change) that occurs within the repository.
If someone were to remove a hash, they would have to generate a hashes for the
commits after the removed one. Even if you "git revert" the original change is 
still stored on the repository.

* It records what developer manipulated what exactly how a blockchain will record
who made a transaction.

Even though there are some similarities, there are differences that make Git not
exactly like a blockchain system:

* Forking a git repository is something that developers will often do. They will
take the existing repository and add their own changes without affecting the original
one. 

* It is not anonymous. Any change that is made is tied directly to the name of 
the developer that implemented the change.

* Anyone can add to the repository if they have the proper administrative access
therefore not requiring any proof of work/stake.