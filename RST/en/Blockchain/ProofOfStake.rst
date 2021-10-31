.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney

Proof of Stake
==============

What is it?
-----------

Proof of stake is a way for an individual to validate (that is, claim the
right to add) a new block to a distributed ledger. Essentially, this ensures that
the chain is valid and is otherwise known as a consensus algorithm. Proof of stake
is in contrast to the Proof of Work approach used in BitCoin. Proof of stake is used
by the Ethereum cryptocurrency, and its most important distinction is that this 
validation process does not include “mining”. The validation is used to ensure 
that valid blocks are being used and claimed in transactions. As of December 2020,
Ethereum 2.0 uses proof of state to validate blocks. In this sytem, gaining coin is
not referred to as mining but is referred to as forging. 

Examples of cryptocurrency that uses proof of stake as their consensus algorithm includes
Peercoin, Ethereum, Tezos (XZT), Binance coin (BNB), NEO, PIVX, Neblio (NEBL), Cardano (ADA),
and Stratis (STRAX).

..possibly add more files related to the different cryptocurrencies that use proof of stake

How does it work?
-----------------

A committee is a group of at least 128 validators. A committee is what is required
for attesting each block in a transaction within a set period of time or a slot of
time. Once that period of time passes, the committee is disbanded and recreated with
a new set of validators [1]. 

Users are chosen at random to prevent bias within the 
system, and potential users will pay some amount of Ethereum to become validators. Prioirty 
is given to individuals who have more coin in the system and for longer amounts of time.
Their role is to create new blocks and check the blocks of other validators to prevent
malicious blocks or to prevent false claiming of blocks. They also validate transactions
and ensure the blocks used are valid. This portion of the validator’s job is called attesting.
If a validator is not responsive for a given period of time or creates malicious blocks, they
can be removed from the position [1].

.. Possibly put an exercise here to practice validating blocks.

Proof of Stake versus Proof of Work
===================================

Security Concerns
-----------------

For both Proof of Stake and Proof of Work consensus algorithms, attacks such as the 51% attacks
are a risk to the systems. 51% attacks are made by users or user groups that own more than 50% 
of the coin in a particular market (bitcoin, ethereum, dogecoin, etc). For proof of work algorithms,
it means that they own the majority of the computing power. For both consensus algorithms, 51% 
attacks work to prevent new transactions from receiving verifications. If verification does not occur,
duplicates can appear, causing users to spend double the amount of coins than intended. In a proof
of stake system, a 51% attack is discouraged and punished as those who participate in such an attack
will lose part of their stake or coin as a result. On a successful attack, not only will the attacker
lose stake, but the value of the cryptocurrency will go down, especially for the coin owned by the attacker.
This is connected to how the coins are verified and the validators. Because you are staking your claim
on a certain percentage of coins, if those blocks for the coins are invalid, you will lose them.

.. Creating a new rst file for cryptohacking as a whole. Will link here when it is done.



Energy Concerns
---------------

Proof of stake addresses concerns with the environmental impacts that proof of work causes. 
Proof of work requires a large amount of power to run the mining algorithm (i.e, many, many
guesses at the nonce until finally finding one that works). This power translates into higher
amounts of electricity used and increases the demand for utility providers to create more.
For example, in 2004 mining cryptocurrency used power as did Ireland that year. The amount
grows annually. This growth is so significant that researchers worry about how unsustainable this method
will be in the future. This high energy requirement initiates concerns about the carbon
footprint caused by this particular task as the energy costs are growing and the estimates
are just for mining coins by itself and not just the entire household needs [2]. 

As for proof of stake, this issue is addressed by the priority of the user. This priority is 
where the user’s mining power is limited based on the amount of coin they possess. Meaning,
the miner is limited to mining the certain percentage of coins they already have [2].
Because of this limit, there is not a high consumption of energy by all users attempting
to mine as many coins as possible as in the proof of work concept. Not only that, but
users mining for cryptocurrency using proof of stake does not need to spend high amounts
of money for computers to process the mining like they do in proof of work.

Ability for Concentration
-------------------------

For proof of work algorithms, a business or group of individuals can collect coin by mining
with several computers. Because of this conglomeration of resources to one group, it causes
single groups to own the majority of a particular cryptocrurrency (i.e. Bitcoin for some 
investors in China) with no extra cost of bitcoin other than the cost of mining them. For 
proof of stake algorithms, when an individual is working to get more cryptocurrency, they must
put some percentage of their coin in for exchange. This exchange is a holding similar to investing
in stocks. The user may get this back but this method for investment prevents users or groups from
gaining a majority.

Concerns with Proof of Stake
============================

The top 1%
----------

Because Proof of Stake depends on investing coins and money in order to receive some return, 
there is concern related to who can invest in cryptocurrencies that use proof of stake.
This concern is that in order to have a stake or be considered for validation, you must have
a minimum amount of the coin to participate. This would limit the people who can get involved
and invest more to the individuals who have an amount of wealth to them. This is similar to the 
worry of making the rich richer.
