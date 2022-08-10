.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Kyle Papili, Elizabeth Mulvaney and Cliff Shaffer

Proof of Stake
==============

What is a consensus mechanism?
------------------------------

A consensus mechanism is a method by which a distributed ledger is
updated (that is, a new block is added to the block chain), and all
parties come to agreement that this did happen.
For more information, see
:ref:`consensus <consensus> <Consensus>`.

A consensus algorithm differs from a consensus mechanism in that a
consensus algorithm is the series of instructions that are executed on a 
given node in the network, whereas the mechanism refers to the
collective action of multiple nodes in a network operating to reach
consensus on what blocks to add to the blockchain.

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

Previously we presented the Proof of Work mechanism,
popularized by the Bitcoin protocol.
This is not the only means of achieving consensus in a distributed
ledger.
The Ethereum network is currently in transition to a version of the
Proof of Stake mechanism.
But why do cryptocurrencies require a consensus algorithm in the first
place and why must there be a 'burden of proof'?

The short answer: Economic civil resistance.
If you have a network consisting of hundreds, thousands, or millions
of participating nodes, it is necessary for the community to
on the order in which transactions are processed.
At the highest level, it is necessary to have a
mechanism that decides who can participate in deciding the order of
transactions.
In Proof of Work, it is whomever is first to provide a legitimate
block (which takes a lot of work---or luck---to produce).
In Proof of Stake, it is more like a voting mechanism.
How this voting mechanism works is where things get complicated for
many crypto protocols.

The first requirement to any protocol that involves voting is a
process for determining what entities get to vote.
If anyone who wanted could vote, than potentially an individual could
spin up hundreds of billions of virtual nodes that claim to be voters
in the network, possibly creating a majority of votes and controlling
the network.

Proof-based consensus mechanisms issue network control authority
proportional to each node's control of a designated economic
resource.
In the case of Bitcoin's proof-of-work mechanism, that economic
resource is one's ability to compute a valid solution to expensive
hashing-related problems.
While there is some element of luck to Bitcoin's proof-of-work
protocol (essentially, miners keep guessing until they are lucky
enough to guess correctly), in the long run it is a measure of
computing power as an economic resource (to make as many guesses as
possible in a given period of time).

Proof of stake, rather than using algorithmic complexity and
computational resources as a measurement of voting authority, uses
amount of an underlying token or asset to denote control in the
network.


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

This section attemtps to provide a high level, chain agnostic summary
of how proof-of-stake works.
Specific implementation details will vary greatly on different
networks.
Unlike proof-of-work, which is relatively simple and fairly settled in
its implementation,
Proof-of-Stake as a viable approach to consensus is still evolving.
Thus, it is hard to say "this is how it works".
But we can give a current example.

Much like in the traditional Proof-Of-Work mechanism, in the current
case of Ethereum, a block typically consists of around 70
transactions.
Unlike Proof-Of-Work where miners are competing for the correct
solution necessary to append this block to the chain, the
Proof-Of-Stake mechanism is more efficient in that it selects a
validator who is responsible for proposing a block to the chain. 

Who is a potential validator, and how does the next validator get
chosen?
A validator is any participant in a proof-of-stake network who has
:term:`staked` a sufficient amount of the network tokens.
In the case of the Ethereum network, 32 ETH is the minimum amount of
staked assets required to become a (potential) validator node.
The next validator is selected by a pseudo-random algorithm 
which elects the next chosen validator in proportion to how much
currency each member of the potential validator pool has staked.
What this means in essence is that if one validator has 32 ETH staked
while another has 320 ETH staked, over the course of a long period of
time, the second validator will be chosen 10 times more often than the
first validator on average.

In the Ethereum implementation, the validation process involves what
is called a committee.
A committee is a collection of pseudo-randomly chosen validator nodes
that are all collectively responsible for proposing the next block.

A common vehicle used to improve one's opportunity to participate in
being the next validator is a staking pool.
Staking pools are groups who combine their coin together to increase
their collective stake, and therefore their chances of their pool
being chosen as a member in the next validator committee.
While this pool is made up of assets from (in some cases) hundreds of
thousands of individuals, the pool itself serves as a singular
validator node on the network.
Assets can be added to a staking pool at anytime; however, the pool
must lock up assets for a set period of time depending on the network
protocol used.
The amount of time your assets are locked up for is referred to as the
bonding period.
Some networks will have a variety of bonding periods available; for
example, ETH 2.0 has staking protocols that require assets to be
locked up for multiple years, while other staking protocols 
can have bonding periods as short as 14 days.

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
As discussed previously, the validator is selected in proportion to
how many tokens they staked.
After being selected, this validator is responsible for proposing a
new block.
The remaining committee members' job is to vote on the proposed block
and attest to transactions within the block.
It is the committee's responsibility to vote on whether or not  the
newly proposed block is legitimate and should be included in the chain. 

What exactly are committee members looking at to see whether a
proposed block is valid?
There are many points of validation necessary to ensure the block is
valid, and these vary from chain to chain.
An obvious criteria for validity is adherence to the format
specification of a block, much like packets being sent over an
internet connection must adhere to a particular format.
An additional check that can be performed is comparing the previous
hash of this block to the hash of the most recent block on the chain.
More advanced block verification processes can exist on different
chains; however, these two are the most common high-level validity
checks performed.

So long as the committee has voted in majority approval of the
proposed block, that block will be appended to the chain.
We will cover what happens when a block is rejected later on. 

Following successful addition of a new block to the chain,
the validator process starts over.
This entire process will repeat over a set period of time known as an
epoch.
Epoch length will vary based on the given network; however, in the
case of Ethereum a new block is appended roughly every 15 seconds (far
faster than BitCoin).
An important note is that even if a block is approved and appended to
the master-chain, it can be still be invalidated later on (for a
limited period of time).
After an epochs is completed, the added block still has two remaining
slots for transactions before all of the transactions in the block are
considered final and cannot be reversed.

The following slideshow visualizes the committee approval process.

.. inlineav:: ProofOfStake ss
   :long_name: ProofOfStake Slideshow
   :links: AV/Blockchain/ProofOfStake.css
   :scripts: AV/Blockchain/ProofOfStake.js
   :output: show
     
.. avembed:: Exercises/Blockchain/ProofOfStakeValidatorsSumm.html ka
    :long_name: Proof of Stake Validator


Proof of Stake versus Proof of Work
-----------------------------------

Where does the Money Come From?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Any consensus protocol must have some form of incentive 
for users to participate in the protocol;
otherwise, there would likely be no way to validate new transactions.
Similar to Proof-Of-Work, Proof-Of-Stake rewards validators with 
newly minted tokens as new blocks are appended to the chain.

The specific reward schema differs greatly between blockchain
infrastructures;
however, at a high level the process used by all Proof-Of-Stake based
environments to reward validators is identical.
Both the block proposer and the validators who attest to the validity
of the proposed block will share some percentage of the newly minted
tokens.
The amount of tokens that are minted with each new block
depends on the issuance rate of that given protocol.

Performance / Reliability
~~~~~~~~~~~~~~~~~~~~~~~~~

All distributed ledger systems require both computation and network
interaction to succeed.
No decentralized network can function without nodes in the network
that conform to a pre-determined protocol.
How can a decentralized system maintain uptime and reliability without
any centralized control over the network nodes?
Consider a traditional software system like Google.com.
If Google has a major server outage, their services fail to function
and users suffer.
Google has direct control over their servers and can take action to
fix the problem or avoid it from happening in the first place.
With a decentralized system, that level of direct control over
hardware uptime does not exist.

In the case of a POW-based network, miners are encouraged to propose
new blocks for the block chain based on the promise of a
reward for providing the next accepted block.
This incentivizes all network participants to continue both making
transactions and for miners to continue mining.
In the case of POS-based networks, there also exists a reward
mechanism for validator nodes when they are selected by the network to
propose a block.
Unlike proof-of-work, proof-of-stake relies on the validator node to
uphold its obligations to the network whenever it is called upon to do
so.
So what happens when a validator node is selected to propose a block,
but either fails to do so or does so in a way that is not valid? 

This introduces the concept of :term:`Slashing`, where a validator
node is punished for not fulfilling its obligations.


Slashing: Incentivizing Legitimacy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Slashing is an important feature of Proof of Stake, as it incentivizes
validator nodes to perform their block proposal duties in accordance
with the set rules and regulations of the given chain.

Proof of Stake retains decentralization by way of the committee voting
process.
Committee members can expose a malicious or ill-configured validator
by voting against their proposed block as explained above in the How
Does It Work section.

Upon discovery of a malicious or ill-configured validator node, the
deficient validator will be punished by way of slashing.
The specific implementation details of slashing vary from chain to
chain; however, in practice, either all or part of the validator's
staked assets will be seized and not returned to them as a punishment
for failing to adhere to the network protocol.

.. inlineav:: ProofOfStakeConflict ss
   :long_name: ProofOfStakeConflict Slideshow
   :links: AV/Blockchain/ProofOfStake.css
   :scripts: AV/Blockchain/ProofOfStakeConflict.js
   :output: show


Security Concerns
~~~~~~~~~~~~~~~~~

For both Proof of Stake and Proof of Work consensus mechanism,
various types of attacks are a risk to the system.
"51% attacks" can be made by users or user groups that own more than 50%
of some critical resource.
For Proof of Work algorithms, it means that someone controls 51% 
or more of the mining cycles.
For Proof of Stake algorithms, this means that one individual or group
in a stake pool maintains control of 51% of the total staked tokens in
the network.
An important distinction is that in this case, it is 51% of staked
tokens, not of all tokens owned by all participants.
For example, it is estimated that the average PoS network has around
70% of the total token supply staked.
This implies that a single user can acquire majority control over the
network by only holding around 35% of the total token supply.

For both algorithms, this form of attack enables a singular party to
retain control over the next block that will be added to the chain.
If the successful perpetrator of the 51% attack has injected a
malicious transaction, then it will be accepted as the malicious party
retains sufficient voting power to accept any transactions they desire.

Examples of things that can occur in a 51% attack include preventing
valid transactions from receiving verification (and so being added to
the chain).
Imagine you are trying to sell ETH on a public exchange like Coinbase
to liquidate your assets.
If a malicious participant wishes to prevent liquidation, they can
block the blockchain transfer of coins, which would in turn prevent
you from selling any of your tokens.  

A second attack vector, and more common, is double spending.
If verification of some transaction does not occur in a timely manner,
then an alternative transaction can get onto the blockchain that
spends those same coins (effectively allowing a malicious user to
re-spend coins).

51% attacks are difficult to recognize until after the attack is
executed.
Detection can occur when duplicate transactions or repeating refunds
are found in between the blockchain and the proposed new block.

In a Proof of Stake system, a 51% attack is discouraged by slashing.
Those who participate in such an attack will lose part of their stake
or coin if it is caught.
This means at a minimum that the attacker gaining a chance at
validating in the future are reduced since the have less coin to
stake.
See :ref:`cryptohacking <Hacking Strategies> <Cryptohacking>`
for more information related to crypto hacking.

.. inlineav:: ProofOfStakeSecurity ss
   :long_name: ProofOfStakeSecurity Slideshow
   :links: AV/Blockchain/ProofOfStake.css
   :scripts: AV/Blockchain/ProofOfStakeSecurity.js
   :output: show

The most obvious reason as to why double spending will eventually be
caught is because following a successful double spend transaction, all
nodes on the network will be able to see and clearly identify this
fraudulent transaction.
A number of things may take place after this has been identified, but
most immediately, the price of tokens will drop as individuals
recognize the system has been compromised.

This drop is actually beneficial for the network as it enables more
validators to rapidly come online and displace the majority control
that one entity had over the network.
Once the malicious party loses majority control of the network,
new validators would be able to repeal the previously added block and
slash the staked currency of the malicious validator.

What this means from a practicality standpoint is that any malicious
actor engaging in a double-spending attack would need to double-spend
MORE currency than what they can potentially lose from a slashing.
In most PoS systems, it would be impractical to double spend more than
the amount of tokens necessary to acquire majority ownership over a
network as this is usually a large portion of all coins in the system.

Slashing is just one way that majority validator abuse can be
combatted.
Another means the community has to fight abuse is through forking.
If enough members of the community agree that the chain has been
compromised and is no longer accurate, they can decide to fork the
chain at the last known point of legitimacy and start a new chain in
which the malicious actor has no stake.
Common examples of forking include Bitcoin and Bitcoin Cash wherein
there was a divergence in community beliefs regarding what the future 
of the token should look like.
As a result, two separate chains emerged.

While technically possible, attacking a proof of stake network is made feasibly unobtainable 
due to the social and logistical implications of what may occur.


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
consumed.
When the value of the cryptocurrency increases, the energy cost
consumed rises because of the higher incentive to mine new
cryptocurrency leading to more mining.
This growth is so significant as to make this approach unsustainable
in the future.

In the  proof of stake algorithm, computation power is effectively
replaced by the stake of the user.
There is no need for high computing power when attesting for new
blocks, meaning the environmental cost is decreased.
Instead of computational resources being used as a source of scarcity,
the users' own tokens are staked.
One notable drawback of this is that in order to participate in
the validation process, a user must own some amount of tokens already.
In PoW, a new miner can begin accumulating coins simply by allocating
some amount of computational power.


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
exchange for a chance to be selected for the validation committee.
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
the cryptocurrency is more than the individual's worth.
If the cryptocurrency equates to an individual's worth, it would be
easy to invest higher pecentages in stake and increase chances of
being chosen for validation committees where, if the user has
malicious intent, they can initiate the 51% attack.

.. avembed:: Exercises/Blockchain/PoWvPoSSumm.html ka
    :long_name: Proof of Stake vs Proof of Work
