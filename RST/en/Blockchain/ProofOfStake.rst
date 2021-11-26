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
For more information, see
:ref:`consensus <consensus> <Consensus>`.

Block Structure Review
----------------------

A blockchain is a series of blocks linked by hash pointers (pointers
that each have an associated hashcode).
A block has a header and a footer where the
header contains information related to the identity of the block
such as the creation time stamp and reference to the block before it.
The footer contains data such as a collection of transactions.
For more information, see
:ref:`blocks <block> <Blocks>`.
     
What is Proof of Stake?
-----------------------

Proof of stake is a way for an individual to validate
(that is, claim the right to add) a new block to a distributed ledger.
Proof of Stake is in contrast to the Proof of Work approach used in
BitCoin.
Proof of Stake is used by the Ethereum cryptocurrency since December
2020, and its most important distinction is that this validation
process does not require “mining” in the sense of expending a
significant amount of computing resources to claim the right to
validate (and add) the next block.
To indicate the distinction, the process of making the claim to
validate the next block (and thereby gain the associated coin as a
reward for this contribution to the community)
is referred to as "forging" instead of "mining".

Other cryptocurrencies that uses proof of stake as their consensus
algorithm include Peercoin, Tezos (XZT), Binance coin (BNB), NEO,
PIVX, Neblio (NEBL), Cardano (ADA), and Stratis (STRAX).

How does it work?
~~~~~~~~~~~~~~~~~

A new block is proposed for addition to the blockchain by a committee
of community members selected for the purpose.
A committee is a group of at least 128 validators.
The number of committee members is determined by the number of
validations required for a block in approving a transaction or
addition of a block.
[I don't understand what this means. Especially the term "validations
required".]
The committee is formed, and then must propose the next block
within a set period of time.

To form a new committee, members are chosen at random from a pool
of users.
Individuals who have more coin invested in the cryptocurrency,
and for a longer period of time, 
have a higher chance of being chosen for the validation committee.
In Ethereum 2.0, users are required to stake 32 ETH to be entered for
a chance to be a validator in the next committee.
Those who have put up this stake form the population that competes to
be selected.
Individuals with less coin might choose to join a staking pool.
Staking pools are groups of individuals who combine
their coin together to increase the chances of the pool being chosen
as a member in the next committee.

The reason that an individual might stake some coin to compete for a
place in the next committee (or might join a staking pool) is that
when the committee successfully has a block added to the
blockchain, they receive a reward
(as explained in the discussion on Ethereum
:ref:`gas <gas> <EVMandGAS>`).

.. avembed:: Exercises/Blockchain/Proof_of_stake_chances_validation.html ka
    :long_name: Validation Chances Quiz

[Put a visualization or exercise here to visualize validating
blocks. We need first a storyboard for what the visualization or
exercise will look like.] [Exercise in the works]

The process of validators adding a new block to the blockchain occurs
in three phases:
proposing the block, voting on the block, and adding transactions to
the block.
After being selected for the validation committee, one random
validator in the committee is chosen to propose a new block.
The remaining members' job is to vote on the proposed
block and attest to transactions within the block.
These remaining members vote to approve the newly proposed block.
Once this phase is complete, the remaining members attest to a
transaction from a previously created block within the chain.
This process of adding a transaction to the previously created block
is used to prevent fraudulent transactions from occurring.
[I don't undertand this. How do you add a transaction to a previously
created block?]
One such fraudulent transaction is attempting to reverse a previously
approved transaction in the blockchain.
If a validator witnesses one or more other validators attempting to
approve such fraudulent transactions in the block, it is their job to
report it. [How would they notice? How would they report it?]

From there, 32 new committees are chosen in slots of time called
epoches to repeat the steps of proposing blocks and attesting to new
transactions on the newly proposed block. [What timescale are we
talking about? How long is an epoch?]
After the epochs are added, the block has two remaining transaction
bundle before all transactions in the block are final. [I don't
understand this sentence, words might be missing. What is a bundle?]
They cannot be changed.
This means that a block in the blockchain has 
room for 34 transaction bundles in their history.


Proof of Stake versus Proof of Work
-----------------------------------

Security Concerns
~~~~~~~~~~~~~~~~~

For both Proof of Stake and Proof of Work consensus algorithms,
various types of attacks are a risk to the system.
"51% attacks" are made by users or user groups that own more than 50%
of some critical resource.
For Proof of Work algorithms, it means that someone controls 51% 
or more of the mining cycles.
For Proof of Stake algorithms, this means that one individual
(or a group invested in a stake pool as described in 'How does it
work?') maintains control of 51% of the particular cryptocurrency in
the market and are currently performing duties in the validation
process.
For both algorithms, a 51% attack selects the next block to add to the
chain, and has the power to drive the consensus algorithm such that
the community accepts it.
If the successful perpetrator of the 51% attack has injected a
malicious transaction, then it will be accepted by the community.

Examples of things that can occur in a 51% attack include preventing
valid transactions from receiving verification
(and so being added to the chain).
If verification of the transaction does not occur in a timely manner,
then an alternative transaction can get onto the blockchain that
spends those same coins
(effectively allowing a malicous user to re-spend coins).
Another example of events that can occur during a 51% attack is the
attacker giving themselves refunds from transactions that have already
occured by overwriting block transactions in a fork that the attacker
controls.
The fork uses the same coin in another transaction.
[I don't see how this can happen. I can't manufacture a transaction
for Bob to give me coin unless I have Bob's private key, right? And I
don't see how forks are necessary here. Basically, the big threat
seems to be that I block one (legitimate) transaction, and substitute
another (legitimate) transaction on the same coin, right?]

[Either in this or the cryptohacking rst provide an exercise used to
detect strange events in a 51% attack. But first, need to come up with
some actual malicious transactions that are plausible.]
[Cryptohacking work on next week]

51% attacks are difficult to recognize until the attack is executed.
Detection can occur when duplicate transactions or repeating refunds
are found for a user with a majority of the coin in the
cryptocurrency.
When a 51% attack occurs, a branch appears where the
attacker can double spend coin where two transactions occur on the same
coin amount. [Why does it need to be the same coin amount?]
In order to catch this, validators must pay attention to
details of branching for such transactions that overwrite previously 
written block logs. [I don't understand the mechanics of "overwriting
a previously written block log".]
In a Proof of Stake system, a 51% attack is discouraged and punished
as those who participate in such an attack will lose part of their
stake or coin as a result.
[How? If someone has 51%, how can they be punished?]

Upon discovery, not only will the attacker lose their stake, [How?]
but the value of the cryptocurrency will go down, especially for the
coin owned by the attacker. [How does value go down differentially for
some participants?]
When this happens, it prevents the individual with the
majority from gaining another majority since more people are able to
afford more coin.
If more coin is in process, the majority is lost for the hacker.
In addition, the discovered attacker lost the gas paid for
the transaction, further reducing their wealth within the
cryptocurrency system.
This means that the chances for the attacker gaining a chance at
validating are reduced in a Proof of Stake algorithm since the have
less coin to stake.

.. Creating a new rst file for cryptohacking as a whole. Will link
   here when it is done.

[The topic of "hard forks" has nothing to do with proof of stake,
ethereum, etc. It should get put into a separate RST file.]

Another risk to consensus algorithms like proof of stake and proof of
work is hard forks.
Hard forks might be caused by a change in the blockchain's technology.
Hard forks might result in blocks that had previously been validated
becoming invalid, while other blocks might become valid by adding
them to the chain.
These forks can be started by developers or miners who are not
satisfied with the current progress of the blockchain.
They also are a way to fund projects.

Specifically, hard forks are caused by additions to block code that
causes a new path with an upgraded blockchain.
This fork causes two paths in the blockchain to appear for miners or
validators.
A fork like this can occur in any form of cryptocurrency that 
is based on blockchain.
When a fork occurs, the miners, validators, and forgers of a
particular coin must follow the changes since when a fork occurs,
developers update the base code of blockchain to match the new
networking rules.
Hard forks can be implemented to undo damage caused by a hack
(i.e. reversing transactions), adding new functionality (such as
changing the consensus algorithm), and patching
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
A fork was introduced for Ethereum, which caused
issues with smart contracts.
The Constantinople fork was proposed in 
increased vulnerabilities within the smart contracts.
The hashing algorithm
within these contracts became repeatable and thus, increased the chances of 
a hacker accessing the information within the contracts.

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
costs 830,000 watt hours (WH) or 830 kWH of energy consumption where the network processes 
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
Because of this collection of resources to one group, potentially
a single group could own the majority of the mining power
(i.e. Bitcoin for some investors in China) with no extra cost of
bitcoin other than the cost of mining them.

For proof of stake algorithms, when an individual is investing in
more cryptocurrency, they must put some percentage of their coin in
for exchange for a chance to be selected for the validation committee.
This exchange is a holding similar to investing in stocks. 
The user may get this back when they attest for the right blocks in
the currency. The coin not invested in the stake can be used for transactions.
This means that an individual with a large amount of wealth could
invest more for higher gains.
An individual or group with lower investment availability has a lower
rate of return since there is a lower chance of being assigned to a
committee.
However, even if an individual with a large stake invested in the
cryptocurrencies, will still not have a majority since the value of
the cryptocurrency is more than the individual's worth. If the cryptocurrency
equates to an individual's worth, it would be easy to invest higher pecentages
in stake and increase chances of being chosen for validation committees where,
if the user has malicious intent, they can initiate the 51% attack.
