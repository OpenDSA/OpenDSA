.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney and Cliff Shaffer

Proof of Stake
==============

What is a consensus algorithm?
------------------------------

A consensus algorithm is a method by which a distributed ledger is
updated (that is, a new block is added to the block chain), and all
parties come to agreement that this did happen.
For more information on what a consensus algorithm is, see :doc:`Consensus`.



What is Proof of Stake?
-----------------------

Proof of stake is a way for an individual to validate
(that is, claim the right to add) a new block to a distributed ledger.
Proof of Stake is in contrast to the Proof of Work approach used in
BitCoin.
Proof of Stake is used by the Ethereum cryptocurrency, and its most
important distinction is that this validation process does not require
“mining” in the sense of expending a significant amount of computing
resources to claim the right to validate (and add) the next block.
As of December 2020, Ethereum 2.0 uses proof of stake to validate blocks.
To indicate the distinction, the process of making the claim to
validate the next block (and thereby gain the associated coin as a
reward for this contribution to the community)
is referred to as "forging" instead of "mining".

Examples of cryptocurrency that uses proof of stake as their consensus
algorithm include
Peercoin, Ethereum, Tezos (XZT), Binance coin (BNB), NEO, PIVX, Neblio
(NEBL), Cardano (ADA), and Stratis (STRAX).

How does it work?
~~~~~~~~~~~~~~~~~

A new block is proposed for addition to the blockchain by a committee
of community members selected for the purpose.
A committee is a group of at least 128 validators.
The committee is formed, and then must propose the next block
within a set period of time.
After the time limit passes, or once the committee proposes a block,
that committee is disbanded and a new one is created with
a new set of validators. The goal of the committee selection mechanism is to prevent bias
within the system.
Therefore when a new committe is formed, users are chosen at random from a pool of users. 
These users stake a portion of their currency to become validators 
in the committee. An example of this is putting a certain amount of
Ethereum in their wallet related to the blockchain.

Individuals who have more coin invested for a longer period of time have
a higher chance of being chosen for the validaiton committee.
This means that users that have invested more into their stake, will
have a higher chance of being selected as a validator.
Individuals who have a lower number of coin join staking pools.
These staking pools are places where groups of individuals combine
their coin together to increase the chances of the pool being chosen
for the next committee. If they are successful, the participants of the pool share the
rewards. This is because when the individual or group completes their term in the validation
committe, the amount staked is returned with extra coin or gas in the case of Ethereum.

.. avembed:: Exercises/Blockchain/Proof_of_stake_chances_validation.html ka
    :long_name: Validation Chances Quiz


[Put a visualization or exercise here to visualize validating
blocks. We need first a storyboard for what the visualization or
exercise will look like.] [Exercise in the works]

In a block in the blockchain, there is a header and a footer where the
header contains hashing information related to the identity of the block
such as the creation time stamp and reference to the block before it. The 
footer contains a ledger detailing the history of the block and the blocks
before it in the chain. Please see :doc:`Blocks` for more information about 
block structures.

The validator's role is to create new blocks and check the blocks of
other validators to prevent malicious blocks or to prevent false
claiming of blocks.
If a validator created a block, the other validators will attest the
block.
Validators work to choose where the block goes into the transaction.
If the block in the transaction that a particular validator selected,
they gain more funds.
For ethereum, the attestation is recorded in a ledger named "beacon
chain."
[Sorry, but I find this so confusing that I can't even begin to pick
apart where the problems are. Please try writing this again. Give more
detail. I *think* you are trying to shed light on the process whereby
the committee proposes a block, right? One confusion comes from
talking about "choosing where a block goes in a transaction". Don't
transactions go into blocks? I think blocks contain transactions an
smart contracts.]

Each block requires that at least 128 users validate it.
[At least? That is confusing. I thought there was a process to select
a committee, and then the committee does its work. One goal of the
selection process is to include 128+ participants, but that is a
detail that is not relevant here. What is relevant here is that the
committee got selected somehow. In other words, we need an explanation
of how and why a committee gets selected (I thought that was above),
and then a discussion of what the committee DOES.]
The block is available for validation in a slot of time.
This slot of time is called a slot and encompasses 12 seconds long.
32 of these slots encompass an epoch. 
After an epoch has completed, a new group of validators is chosen.
If the validator does not respond during the slotted
time, they are removed from the position.
[This sounds somewhat redundant with the discussion of committees
above, though slightly more detail is being provided here. Not sure
yet what the best approach is. Perhaps put less detail above, and most
of the detail here.]

Another way of being removed from a validation position is 
is to create or attest to a malicious block.
In the case that this removal occurs, the validator would 
lose their stake they invested.
[How would this be detected? This needs a lot of explanation!]


Proof of Stake versus Proof of Work
-----------------------------------

Security Concerns
~~~~~~~~~~~~~~~~~

For both Proof of Stake and Proof of Work consensus algorithms,
attacks such as the 51% attacks are a risk to the system.
51% attacks are made by users or user groups that own more than 50%
of some critical resource.
For proof of work algorithms, it means that someone controls 51% 
or more of the mining cycles.
For proof of stake algorithms, this means that one individual or a group 
invested in a stake pool as described in 'How does it work?' maintains
control of 51% of the bitcoin in the market and are currently
performing duties in the validation process. [Do you actually mean
that the next committee has at least 51% control by some particular
entity?]
For both algorithms, a 51% attack selects the next block to add to the
chain, and has the power to drive the consensus algorithm such that
the community accepts it.
If the successful perpetrator of the 51% attack has injected a
malicious transaction, then to will be accepted by the community.

Examples of things that can occur in a 51% attack include preventing
valid transactions from receiving verification (being added to the
chain).
If verification does not occur in a timely manner, then an alternative
transaction appear to spend certain coins (allowing a malicous user to
re-spend coins).
Another example of events that can occur during a 51% attack is the
attacker giving themselves refunds from transactions that have already
occured.
[I have another student working on proof of work consensus, and we
keep running into this problem: To issue a refund transaction requires
the malicious actor to have the private key of the refunder. But they
don't. So how do they issue the transaction? It won't validate, right?]

[Either in this or the cryptohacking rst provide an exercise used to
detect strange events in a 51% attack. But first, need to come up with
some actual malicious transactions that are plausible.] [Cryptohacking work on next week]

Attacks such as the 51% attack are difficult to recognize until the
attack is executed.
Detection can occur when duplicate transactions or repeating refunds
are found for a user with a majority of the coin in the
cryptocurrency. [I don't think the issue here is that the user has a
majority stake. Its just that the mechanism to catch them might be
different.]
In a proof of stake system, a 51% attack is discouraged and punished
as those who participate in such an attack will lose part of their
stake or coin as a result. [Todo: add how get caught]

Upon discovery, not only will the attacker lose their stake, but the value
of the cryptocurrency will go down, especially for the coin owned by
the attacker. When this happens, it prevents the individual with the
majority from gaining another majority since more people are able to
afford more coin. If more coin is in process, the majority is lost for
the hacker. In addition, the discovered attacker lost the gas paid for
the transaction, further reducing their wealth within the cryptocurrency
system.

This means that the chances for the attacker gaining a chance at
validating are reduced in a proof of stake algorithm since they do not
have any coin staked.

.. Creating a new rst file for cryptohacking as a whole. Will link
   here when it is done.

Another risk to consensus algorithms like proof of stake and proof of
work is hard forks.
Hard forks might be caused by a change in the blockchain's technology.
Hard forks might reult in blocks that had previously been validated
becoming invalid, while other blocks might become valide by adding
them to the chain.
These forks can be started by developers or miners who are not
satisfied with the current progress of the blockchain.
They also are a way to fund projects.

Specifically, hard forks are caused by additions to block code that
causes a new path with an upgraded blockchain.
This fork causes two paths in the blockchain to appear for miners.
A fork like this can occur in any form of cryptocurrency that 
is based on blockchain.
When a fork occurs, the miners, validators, and forgers of a
particular coin must follow the changes since when a fork occurs,
developers update the base code of blockchain to match the new
networking rules.
Hard forks can be implemented to undo damage caused by a hack
(i.e. reversing transactions), adding new functionality, and patching
security risks.

Hard forks are in contrast to soft forks, which allows one side of the
fork to continue to exist, removing the choice of path a miner can
take in a hard fork.
Hard forks effectively create a new cryptocurrency, while soft forks
do not.
Although these changes can be beneficial to blockchain users, they can
cause a blockchain to become unstable.
This is because hard forks can result from disagreements from within
the cryptocurrency's community.
Forks can result in price inflations as well, raising the cost 
of the coin.
In addtion, in some cases, adding a hard fork can introduce
vulnerabilities into the cryptocurrency.
An example of this happened to Ethereum in 2019.
When the fork was introduced for Ethereum, where the fork caused
issues with smart contracts. [Explain.]

In the case of a hard fork for the proof of work algorithm, the miners
must decide whethere to continue in the current path,
or join the new blockchain.
If the miner decides to choose to continue to support both chains in
the fork, they must divide their resources between the two chains.
Since the computing power is divided between the two chains, there is
reduced resources dedicated to a chain or more strain on the computers
they use to mine coin.
In general, a fork is discouraged for proof of work systems 
because this causes more of an impact on the value of the currency by
decreasing it and the developers of the cryptocurrency would need to
choose the fork that does not cause vulnerabilities in the code base.

In proof of stake algorithms, forking is part of the validator's job.
A validator must choose which block is beneficial to the
cryptocurrency.
If the validator chooses the wrong side of the fork, leading to
vulnerabilities, the validator would lose their stake.
However, unlike proof of work systems, a validator does not have to
choose one block.
There is not as much of a computational cost with maintaining a fork,
the validator can choose to support both directions of the
fork.
Because of this, forking is more prevalent in proof of stake systems
than in proof of work systems and makes people worry about the
stability of the cryptocurrency.


Energy Concerns
~~~~~~~~~~~~~~~

Proof of stake addresses concerns with the environmental impacts that
proof of work causes.
Proof of work requires a large amount of power to run the mining
algorithm (i.e, many, many guesses at the nonce until finally finding
one that works).
This power translates into higher amounts of electricity used and
increases the demand for utility providers to create more.
For example, in 2016, the cost of a transaction in the bitcoin network
costs 830,000 watt hours (WH) or 830 kWH where the network processes 
around 5 transactions a second.
This means, that in one second of transactions, 4,150,000 WH.
When the value of the cryptocurrency increases, the energy cost
consumed rises because of the higher incentive to mine new
cryptocurrency leading to more mining.
This growth is so significant as to make this approach unsustainable
in the future.

As for proof of stake, computation power is effectively replaced by
the priority of the user.
There is no need for high computing power when attesting for new
blocks, meaning the environmental cost is decreased.
However, the user is limited to mining the certain percentage 
of coins they already have.
What prevents the user from owning a majority of the coin in the
cryptocurrency is the fact that they have to stake a percentage of
their own coin in exchange for more.
Meaning, the miner is limited to forging the certain percentage of
coins they already have.
Because of this limit, there is not a high consumption of energy by
all users attempting to mine as many coins as possible as in the proof
of work concept.
Not only that, but users mining for cryptocurrency using proof of
stake does not need to spend high amounts of money for computers to 
process the mining like they do in proof of work.


Risks of Concentration
~~~~~~~~~~~~~~~~~~~~~~

For proof of work algorithms, a business or group of individuals can
collect coin by mining with several computers.
Because of this conglomeration of resources to one group, potentially
a single group could own the majority of a particular cryptocrurrency
(i.e. Bitcoin for some investors in China) with no extra cost of
bitcoin other than the cost of mining them. [I don't think the issue
is the percentage of bitcoin owned. It is the percentage of mining
resources available. Right?]

For proof of stake algorithms, when an individual is working to get
more cryptocurrency, they must put some percentage of their coin in
for exchange. [What does it mean to "work to get more cryptocurrency"?
Do you mean the process of getting onto a committee to get a share of
the processing fee?]
This exchange is a holding similar to investing in stocks. 
The user may get this back when they attest for the right blocks in
the currency. [I think that is a separate issue. A person can always
use their coin. Its just that within the system, the payoff from the
equivalent to mining is limited, right?]
This means that an individual with a large amount of wealth could
invest more for higher gains.
An individual or group with lower investment availability has a lower
rate of return. [All of this assumes that being on the committee is
sufficiently lucrative, right?]
However, even if an individual with a large stake invested in the
cryptocurrencies, will still not have a majority since the value of
the cryptocurrency is more than the individual's worth. [Why should
that be the case?]
Meaning that this method for investment prevents users or groups from
gaining a majority. [I don't see this conclusion.]
