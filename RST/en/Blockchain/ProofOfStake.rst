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
Ethereum 2.0 uses proof of stake to validate blocks.
In this context, gaining coin is
not referred to as mining but is referred to as forging. 

Examples of cryptocurrency that uses proof of stake as their consensus
algorithm include
Peercoin, Ethereum, Tezos (XZT), Binance coin (BNB), NEO, PIVX, Neblio
(NEBL), Cardano (ADA), and Stratis (STRAX).


How does it work?
~~~~~~~~~~~~~~~~~

A committee is a group of at least 128 validators.
A committee is required
to attest each block in a transaction within a set window of time.
Once that period of time passes, the committee is disbanded and
recreated with a new set of validators [1]. [What is this citation?]
[Need more detail about how a committee is selected.]

The committee of validators is chosen at random [from what
population?] to prevent bias within the system, and the selected
validators on the committee will each
pay some amount of Ethereum.
Priority is given to individuals who have more coin in the system and
for longer amounts of time.
[Meaning, that somone with more coin has a higher chance of being selected?]
Their role is to create new blocks and check the blocks of other
validators to prevent malicious blocks or to prevent false claiming of
blocks.
They also validate transactions [What does that mean, to "validate" a
transaction?] and ensure the blocks used are valid. [What does that
mean to "ensure the blocks used are valid"?]
This portion of the validator’s job is called attesting.
If a validator is not responsive for a given period of time or creates
malicious blocks, they can be removed from the position [1].
[What position? As a member of the committee? As a potential member in
the future?]

.. Possibly put an exercise here to practice validating blocks.

   Yes! Please sketch out a storyboard of what an exercise would look
   like.

[We need more detail here about how this is a consensus algorithm, and
what a block looks like. That is, in PoW, mining is finding the
correct nonce. How exactly does the committee form the next block of
transactions? Once the committee proposes the transactions, does the
rest of the process work exactly in the same way as consensus works
for PoW? That the block gets broadcast? And since there is no other
competition, does it always get accepted? That is, is the committee
forming process considered sufficient to guarantee safe blocks?]


Proof of Stake versus Proof of Work
-----------------------------------

Security Concerns
~~~~~~~~~~~~~~~~~

For both Proof of Stake and Proof of Work consensus algorithms,
attacks such as the 51% attacks are a risk to the system.
51% attacks are made by users or user groups that own more than 50% 
of the resources in that network.
For Proof of Work algorithms, that would mean that someone controls
51% or more of the mining cycles.
For Proof of Stake algorithms, that means [What?].
For both consensus algorithms, 51% attacks work to prevent legitimate
transaction blocks from receiving verification.
If verification does not occur, duplicates can appear, causing users
to spend double the amount of coins than intended. [That is vague,
unclear. Are you trying to describe one of the types of malicious
transactions? If so, describe it that way, and use duplicatate
spending as an example.]

In a proof of stake system, a 51% attack is discouraged and punished
as those who participate in such an attack will lose part of their
stake or coin as a result. [How would such an attack be recognized?]
On a successful [do you mean unsuccessful?] attack, not only will the
attacker  lose stake, but the value of the cryptocurrency will go
down, especially for the coin owned by the attacker.
This is connected to how the coins are verified and the
validators. [This needs a lot of detailed explanation!!]
Because you are staking your claim  on a certain percentage of coins,
if those blocks for the coins are invalid, you will lose them.

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
coins they already have [2]. [What citation?]
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

[Another thing that was not explained: What is the motivation to be a
validator on the committee? It was mentioned that validators on the
committee pay some coin to participate. Why do that? In Bitcoin,
miners get paid to validate blocks, because they are performing a
service to the community.]


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
