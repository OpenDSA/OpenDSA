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

Another risk to consensus algorithms like proof of stake and proof of work is hard forks. Hard forks are where there is 
a change in the blockchain's technology where blocks that had already determined to be invalid, become valid. These forks
can be started by developers or miners who are not satisfied with the current progress of the blockchain. They also are A
way to fund projects. Specifically, hard forks are caused by additions to block code that causes a new path with upgraded 
blockchain. This fork causes two paths to appear for miners. A fork like this can occur in any form of cryptocurrency that 
is based on blockchain. When a fork occurs, the miners, validators, and forgers of a particular coin must follow the changes
since when a fork occurs, developers update the base code of blockchain to match the new networking rules. Hard forks can be
implemented to undo damage caused by a hack (i.e. reversing transactions), adding new functionality, and patching security 
risks. This is a contrast with a soft fork which allows one side of the fork to continue to exist, removing the choice of 
path a miner can take in a hard fork. Hard forks create a new cryptocurrency and soft forks do not. Although these changes
can be beneficial to blockchain users, they can cause a blockchain to become unstable. This is because hard forks can result
from disagreements from within the cryptocurrency's community. Forks can result in price inflations as well, raising the cost
of the coin. In addtion, in some cases, adding a hard fork can introduce vulnerabilities into the cryptocurrency. An example 
of this is from Ethereum in 2019. When the fork was introduced for Ethereum, where the fork caused issues with smart contracts.

In the case of a hard fork for the proof of work algorithm, the miners must decide whethere to continue in the current path,
or join the new blockchain. If the miner decides to choose to continue to support both chains in the fork, they must divide
their resources between the two chains. Since the computing power is divided between the two chains, there is reduced resources
dedicated to a chain or more strain on the computers they use to mine coin. In general, a fork is discouraged for proof of work systems
because this causes more of an impact on the value of the currency by decreasing it and the developers of the cryptocurrency
would need to choose the fork that does not cause vulnerabilities in the code base.

In proof of stake algorithms, forking is part of the validator's job. A validator must choose which block is beneficial to the 
cryptocurrency. If the validator chooses the wrong side of the fork, leading to vulnerabilities, the validator would lose their
stake. However, unlike proof of work systems, a validator does not have to choose one block. There is not as much of an computational
cost with maintaining a fork, the validator can choose to support both directions of the fork. Because of this, forking is more
prevalent in proof of stake systems than in proof of work systems and makes people worry about the stability of the cryptocurrency.

Energy Concerns
~~~~~~~~~~~~~~~

Proof of stake addresses concerns with the environmental impacts that proof of work causes. Proof of work requires a large amount
of power to run the mining algorithm (i.e, many, many guesses at the nonce until finally finding one that works). This power translates
into higher amounts of electricity used and increases the demand for utility providers to create more.
For example, in 2016, the cost of a transaction in the bitcoin network costs 830,000 watt hours (WH) or 830 kWH where the network processes
around 5 transactions a second. This means, that in one second of transactions, 4,150,000 WH. In addition, when the value of the cryptocurrency
increases, the energy cost consumed rises because of the higher incentive to mine new cryptocurrency leading to more mining. This growth is so
significant to make this approach unsustainable in the future.

As for proof of stake, this computation power issue is addressed by the priority of the user. There is no need for high computing power
when attesting for new blocks, meaning the environmental cost is decreased. However, the user is limited to mining the certain percentage
of coins they already have. What prevents the user from owning a majority of the coin in the cryptocurrency is the fact that they have to
stake a percentage of their own coin in exchange for more. Meaning, the miner is limited to forging the certain percentage of coins they already 
have. Because of this limit, there is not a high consumption of energy by all users attempting to mine as many coins as possible as in the proof
of work concept. Not only that, but users mining for cryptocurrency using proof of stake does not need to spend high amounts of money for computers to
process the mining like they do in proof of work.

Ability for Concentration into the top 1%
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

For proof of work algorithms, a business or group of individuals can collect coin by mining with several computers. Because of this conglomeration of
resources to one group, it causes single groups to own the majority of a particular cryptocrurrency (i.e. Bitcoin for some investors in China) with
no extra cost of bitcoin other than the cost of mining them. For proof of stake algorithms, when an individual is working to get more cryptocurrency,
they must put some percentage of their coin in for exchange. This exchange is a holding similar to investing in stocks.
The user may get this back when they attest for the right blocks in the currency. This means that an individual with a large amount of wealth could invest
more for higher gains. An individual or group with lower investment availability has a lower rate of return. However, even if an individual with a large stake
invested in the cryptocurrencies, will still not have a majority since the value of the cryptocurrency is more than the individual's worth.
Meaning that this method for investment prevents users or groups from gaining a majority.
