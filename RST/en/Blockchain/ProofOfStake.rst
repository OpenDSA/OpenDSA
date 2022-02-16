.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney and Cliff Shaffer

Proof of Stake
==============

What is a consensus mechanism?
------------------------------

A consensus mechanism is a method by which a distributed ledger is
updated (that is, a new block is added to the block chain), and all
parties come to agreement that this did happen.
For more information, see
:ref:`consensus <consensus> <Consensus>`.

Note: A consensus algorithm differs from a consensus mechanism in that an 
algorithm is an isolated series of instructions that can be executed on a 
single machine, whereas a mechanism involves multiple nodes in a network 
operating in a coordinated manner as to accomplish a unified goal.

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

.. odsafig:: Images/BlockDiagram.png
   :width: 350
   :align: center
   :alt: Typical fields found in Blockchain blocks.


Why do we need proof of anything?
------------------------------
As you will soon learn, the previously discussed proof of work mechanism,
popularized by the Bitcoin protocol, is not the only means of achieving consensus.
In fact, the Ethereum network is currently amidst a transition to the proof of stake
mechanism. But why do cryptocurrencies require a consensus algorithm in the first place
and why must there be a 'burden of proof'?

The short answer: Economic civil resistance.
If you have a network consisting of hundreds, thousands, or millions of participating
nodes, it is necessary to deploy a means through which the network can agree on the order
in which transactions are processed. At the highest level, it is necessary to have some form
of voting mechanism that decides who can participate in deciding the order of transactions. 
How this voting mechanism works is where things get complicated for many crypto protocols.

You cannot simply provide "each person" gets one vote because you need some form of authority
or mechanism that determines what a "person" is. Otherwise, any individual can spin up hundreds
of billions of virtual nodes that can act as "people" in the network thus garnering the majority
of votes and controlling the network.

Proof of ___ mechanisms issue network control authority proportional to each node's control of a designated
economic resource. In the case of Bitcoin's proof-of-work mechanism, that economic resource is one's ability to compute a valid
solution to complicated hashing algorithms. Proof of stake, rather than utilizing algorithmic complexity
and computational resources as a measurement of voting authority, utilizes an underlying token 
or asset to denote control in the network.


.. inlineav:: ProofOfStake ss
   :long_name: ProofOfStake Slideshow
   :links: AV/Blockchain/ProofOfStake.css
   :scripts: AV/Blockchain/ProofOfStake.js
   :output: show
     
What is Proof of Stake?
-----------------------

Proof of stake is a way for an entity to validate
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
The number of committee members is decided by how many transactions
need to be approved at the time.
For each transaction, there needs to be 32 validators.
In addtion, there must also be one more validator to propose
a new block to the blockchain. [WHY? What is the process?]
The committee is formed, and then must propose the next block
within a set period of time.

To form a new committee, members are chosen at random from a pool
of users.
Individuals who have more coin invested in the cryptocurrency,
and for a longer period of time, 
have a higher chance of being chosen for the validation committee. [Is
this correct? Do different users put up different amounts to bid for
being on the committee? Or is it a fixed stake to be in the lottery?
The next sentence seems to indicate that it is fixed.]
In Ethereum 2.0, users are required to stake 32 ETH to be entered for
a chance to be a validator in the next committee.
Those who have put up this stake form the population that competes to
be selected.
Individuals with less coin to invest might choose to join a staking
pool.
Staking pools are groups of individuals who combine
their coin together to increase the chances of the pool being chosen
as a member in the next committee. [Increase the chances? Again, isn't
it a fixed stake to buy a lottery ticket?]

The reason that an individual might stake some coin to compete for a
place in the next committee (or might join a staking pool) is that
when the committee successfully has a block added to the
blockchain, they receive a reward
(as explained in the discussion on Ethereum
:ref:`gas <gas> <EVMandGAS>`).

The process of validators adding a new block to the blockchain occurs
in three phases:
proposing the block, voting on the block, and adding transactions to
the block.
After being selected for the validation committee, one random
validator in the committee is chosen to propose a new block.
The remaining members' job is to vote on the proposed
block and attest to transactions within the block.
These remaining members vote to approve the newly proposed
block. [This phrasing does not make sense. Its not too exciting if all
they do is vote to approve. ;) I think its more like vote **whether**
to approve. But then, what do they base the decision on?]
Once this phase is complete, the remaining members attest to a
transaction from a previously created block within the chain. [What
does that mean? Any particular transaction? What is the point to this?]

From there [When does this happen?],
32 new committees are chosen in slots of time called
epoches to repeat the steps of proposing blocks and attesting to new
transactions on the newly proposed block. [Why 32? How are they chosen?]
There is no set timeframe for an
epoch but on average, an epoch is around 12 minutes. [What is an
epoch? One committee's time when it is in charge of defining the next block?]
After the epochs are completed, the block has two remaining slots
for transactions before all of the transactions in the block are considered
final and cannot be reversed.
This means that a block in the blockchain has 
room for 34 transaction bundles in their history. [What is a
transaction bundle? I am not understanding the relationship between a
block and the transactions and the committees. I thought that a
committee validated a block of transactions. Then this idea of 32
committees and 34 slots/bundles came up. What is the relationship?]

.. avembed:: Exercises/Blockchain/ProofOfStakeValidatorsSumm.html ka
    :long_name: Proof of Stake Validator


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
The fork uses the same coin in another transaction by substituting the
coin used in the previous transaction in the new transaction.

[This would benefit from a slideshow to explain what is going on.]

51% attacks are difficult to recognize until the attack is executed.
Detection can occur when duplicate transactions or repeating refunds
are found for a user with a majority of the coin in the
cryptocurrency.
However, how a 51% attack is detected is not publicly known.
When a 51% attack occurs, a fork appears, where each branch contains a
transaction that spends the same coin.

In order to catch this, validators must pay attention to
details of branching for such transactions that overwrite previously 
written transactions within the block.
On the other hand, users whose transactions 
are the ones overwritten can report suspicious activity within their
wallets.

In a Proof of Stake system, a 51% attack is discouraged and those who
participate in such an attack will lose part of their stake or coin as
a result.
Upon discovery, not only will the attacker lose their stake by losing all
of the coin taken in the fraudulent transactions, 
but the value of the cryptocurrency will go down. 
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
Please see :ref:`cryptohacking <Hacking Strategies> <Cryptohacking>`
for more information related to crypto hacking.

[It is not clear from this description how the attack is stopped and
reversed. It looks like validators can see the fork, and recognize the
duplicate transactions. But, then what? Why does that change anything?
Again, a slideshow would help here.]


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
was about 830 kWH of energy consumption where the network processes 
around 5 transactions a second.
This means that in one second of transactions, 4,150 kWH were
consumed. [This does not look right. That means something like $500 at
US energy rates, or $100/transaction. Even if that is an overestimate,
its still probably $50/transaction. Is that really right?]
When the value of the cryptocurrency increases, the energy cost
consumed rises because of the higher incentive to mine new
cryptocurrency leading to more mining.
This growth is so significant as to make this approach unsustainable
in the future.

In the  proof of stake algorithm, computation power is effectively
replaced by the priority of the user.
There is no need for high computing power when attesting for new
blocks, meaning the environmental cost is decreased.
However, the user is limited to mining the certain percentage 
of coins they already have. [How so?]
What prevents the user from owning a majority of the coin in the
cryptocurrency is the fact that they have to stake a percentage of
their own coin in exchange for more. [Well, unless they have an
external source of making funds.]
Meaning, the miner is limited to forging the certain percentage of
coins they already have. [How much is that?]
Because of this limit, there is not a high consumption of energy by
all users attempting to mine as many coins as possible as in the proof
of work concept.
Users forging cryptocurrency using proof of stake also do not need to
spend for the computers to mine like they would in proof of work.


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
the currency.
The coin not invested in the stake can be used for transactions.
This means that an individual with a large amount of wealth could
invest more for higher gains.
An individual or group with lower investment availability has a lower
rate of return since there is a lower chance of being assigned to a
committee.
However, even if an individual with a large stake invested in the
cryptocurrencies, will still not have a majority since the value of
the cryptocurrency is more than the individual's worth. [Why?]
If the cryptocurrency
equates to an individual's worth, it would be easy to invest higher pecentages
in stake and increase chances of being chosen for validation committees where,
if the user has malicious intent, they can initiate the 51%
attack. [I don't understand this sentence.]

.. avembed:: Exercises/Blockchain/PoWvPoSSumm.html ka
    :long_name: Proof of Stake vs Proof of Work
