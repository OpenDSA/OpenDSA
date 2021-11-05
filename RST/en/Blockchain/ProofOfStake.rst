.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney

Proof of Stake
==============

What is a consensus algorithm?
------------------------------

A consensus algorithm is a method to ensure that every chain in the blockchain is 
the right one to be connected to the chain. It is a way to keep record of the blocks
in a blockchain and provide integrity to the blockchains. Each block in the blockchain
contain a ledger for keeping track of transactions to pinpoint points of failure in the block.
These ledgers also serve as proof of dishonesty of the users.

More information on what a consensus algorithm is can be seen at
.. include:: Consensus.rst

What is it?
-----------

Proof of stake is a way for an individual to validate (that is, claim the
right to add) a new block to a distributed ledger. Essentially, this ensures that
the chain is valid and is otherwise known as a consensus algorithm. Proof of stake
is in contrast to the Proof of Work approach used in BitCoin. Proof of stake is used
by the Ethereum cryptocurrency, and its most important distinction is that this 
validation process does not include “mining”. The validation is used to ensure 
that valid blocks are being used and claimed in transactions. As of December 2020,
Ethereum 2.0 uses proof of stake to validate blocks.
In this context, gaining coin is
not referred to as mining but is referred to as forging. 

Examples of cryptocurrency that uses proof of stake as their consensus
algorithm include
Peercoin, Ethereum, Tezos (XZT), Binance coin (BNB), NEO, PIVX, Neblio
(NEBL), Cardano (ADA), and Stratis (STRAX).

Structure of a Block in a Proof of Stake Algorithm
--------------------------------------------------

The first block in the chain contains details of the underlying software hardcoded into it. This
block is referred to as the genesis block.

Each block in the blockchain has a reference to the block before it. As there are new additions
to the chain, there are more complex versions of a ledger. This ledger contains details of the 
block itself and the ones before it.


How does it work?
~~~~~~~~~~~~~~~~~

A committee is a group of at least 128 validators. A committee is what is required
for attesting each block in a transaction within a set period of time or a slot of
time. Once that period of time passes, the committee is disbanded and recreated with
a new set of validators. Users are chosen at random to prevent bias within the 
system, and potential users will pay some amount of Ethereum to become validators. These 
users are selected from a pool of invested members who have stakes portions of their coin.
Priority is given to individuals who have more coin in the system and for longer amounts of time.
This means that users that have invested more into their stake, will have a higher chance of being
selected as a validator. Individuals who have a low number of coin join staking pools. These
staking pools are places where groups of individuals combine their coin together to increase the chances
of being chosen for new blocks. If they are successful, the participants of the pool share the rewards.

.. Possibly put an exercise here to practice validating blocks.

   Yes! Please sketch out a storyboard of what an exercise would look
   like.

The validator's role is to create new blocks and check the blocks of other validators to prevent
malicious blocks or to prevent false claiming of blocks. If a validator created a block, the other
validators will attest the block. Validators work to choose where the block goes int the transaction.
If the block in the transaction that a particular validator selected, they gain more funds. 
For ethereum, the attestation is recorded in a ledger named "beacon chain." Each block requires that
at least 128 users validate it. The block is available for validation in a slot of time. This slot of 
time is called a slot and encompasses 12 seconds long. 32 of these slots encompass an epoch.
After an epoch has completed, a new group of validators is chosen. If the validator does not respond during the slotted
time, they are removed from the position. Another way of being removed from a validation position is for the
user is to create or attest to a malicious block. In the case that this removal occurs, the validator would 
lose their stake they invested.

Proof of Stake versus Proof of Work
-----------------------------------

Security Concerns
~~~~~~~~~~~~~~~~~

For both Proof of Stake and Proof of Work consensus algorithms, attacks such as the 51% attacks
are a risk to the system. 51% attacks are made by users or user groups that own more than 50% 
of the coin in that network. For proof of work algorithms, it means that someone controls 51% 
or more of the mining cycles. For proof of stake algorithms, this means that one individual or a group 
invested in a stake pool as described in 'How does it work?' maintains control of 51% of the bitcoin in
the market and are currently performing duties in the validation process. For both algorithms, 51% attacks 
selects the current block and continues to add them to the chain, withholding blocks from other investors.
Eventually the perpetrators's chain of the 51% attack will overtake the original chain, removing any transactions
that have occurred in the meantime. 

Examples of things that can occur in a 51% attack include preventing new 
transactions from receiving verifications and if verification does not occur, duplicates can appear, causing 
users to spend double the amount of coins than intended. Another example of events that can occur during a 51%
attack is the attacker giving themselves refunds from transactions that have already occured.

For example, an attacker can buy a Dell Latitude 7410 using ethereum. This user owns 53% of ethereum coin.
The user receives the computer and then completes a request for a refund for the computer. In the process,
the attacker haults any other transaction from occurring. 

.. Either in this or the cryptohacking rst provide an exercise used to detect strange events
    in a 51% attack

Attacks such as the 51% attack are difficult to recognize until the attack is executed. Detection can occur
when duplicate transactions or repeating refunds are found for a user with a majority of the coin in the
cryptocurrency. In a proof of stake system, a 51% attack is discouraged and punished as those who participate
in such an attack will lose part of their stake or coin as a result. Upon discovery, not only will the
attacker lose stake, but the value of the cryptocurrency will go down, especially for the coin owned by the attacker.

After the attacker has been discovered, the coin they have invested in the stake will be lost for them. This means 
that the chances for the attacker gaining a chance at validating are reduced in a proof of stake algorithm since 
they do not have any coin staked.

.. Creating a new rst file for cryptohacking as a whole. Will link here when it is done.

When a blockchain forks in the Proof of Work algorithm, the miners
must choose how their mining power goes whether it be the original
chain, or the new forked one which causes the miners to have 
less power in the mining process since it is divided. [That is too vague.]
In the proof of stake algorithm, the validators
do not choose between the two chains. [How do we get two chains? I
wouldn't ask that question if the consensus process had been better
explained above.]
Instead, both are validated. This can cause issues where the
cryptocurrency is spent twice because spending can happen before and
after the split. [Huh? Again, are you using "double spending" as a
proxy for malicious transactions in general?]
This makes proof of work more secure. [That needs explaination!]

Energy Concerns
~~~~~~~~~~~~~~~

Proof of stake addresses concerns with the environmental impacts that
proof of work causes.
Proof of work requires a large amount of power to run the mining
algorithm (i.e, many, many guesses at the nonce until finally finding
one that works).
This power translates into higher amounts of electricity used and
increases the demand for utility providers to create more.
For example, in 2004 mining cryptocurrency used power as did Ireland
that year. [Not sure that you have the year/country right. Use
something more recent.]
The amount grows annually.
This growth is so significant to make this approach unsustainable in
the future. [2] [What citation is this?]

As for proof of stake, this issue is addressed by the priority of the
user.
This priority is where the user’s mining power is limited based on the
amount of coin they possess.
Meaning, the miner is limited to mining the certain percentage of
coins they already have
[This explanation is really vague. Need to carefully explain how stake
translates to validating transactions. Does more stake translate to
higher chance of being a validator? And what controls are there on
high-stake players? And, what is the process that creates the next
block proposed to the network?]
Because of this limit, there is not a high consumption of energy by
all users attempting to mine as many coins as possible as in the proof
of work concept.
Not only that, but users mining for cryptocurrency using proof of
stake does not need to spend high amounts of money for computers to
process the mining like they do in proof of work.


Ability for Concentration
~~~~~~~~~~~~~~~~~~~~~~~~~

For proof of work algorithms, a business or group of individuals can
collect coin by mining with several computers.
Because of this conglomeration of resources to one group, it causes
single groups to own the majority of a particular cryptocrurrency
(i.e. Bitcoin for some investors in China) with no extra cost of
bitcoin other than the cost of mining them.
For  proof of stake algorithms, when an individual is working to get
more cryptocurrency, they must put some percentage of their coin in
for exchange.
This exchange is a holding similar to investing in stocks.
The user may get this back [How??] but this method for investment
prevents users or groups from gaining a majority. [How?? Vague.]


Concerns with Proof of Stake
----------------------------

The top 1%
~~~~~~~~~~

Because Proof of Stake depends on investing coins and money in order
to receive some return,
there is concern related to who can invest in cryptocurrencies that
use proof of stake.
This concern is that in order to have a stake or be considered for
validation, you must have a minimum amount of the coin to participate.
This would limit the people who can get involved
and invest more to the individuals who have an amount of wealth to
them.
This is similar to the worry of making the rich richer.
[So, why does amount of stake matter? Why does the algorithm give some
sort of priority to those with more stake? This all needs to be
explained.]
