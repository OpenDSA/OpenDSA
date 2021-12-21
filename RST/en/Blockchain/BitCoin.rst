.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Cliff Shaffer

Bitcoin
=======

Bitcoin Introduction
--------------------

Bitcoin was the first successful cryptocurrency.
Of particular relevance to this tutorial, Bitcoin depends on a public
ledger implemented using a blockchain.
Bitcoin was an early and quite famous use case for blockchain.
Thus, among the broader public these two concepts are intricately
linked, almost to the point that many people cannot distinguish
between them.

Since Bitcoin is built on a public, distributed ledger with no
owner/controller, its success depends on a secure mechanism for
adding transactions to the blockchain, which in turn relies on a way
of convincing members of the community to perform the services
required by whatever consensus algorithm is used.
The payment for rendering these services is some bitcoin.
The consensus algorithm is the original Proof of Work algorithm.
Bitcoin is also the first famous exemplar of a working consensus
algorithm.
Therefore, Proof of Work, and the associated concept of Mining,
are also interwoven into the public perception of what both Blockchain
and a Cryptocurrency are.
We will see later in this tutorial that this is both untrue (there are
alternatives) and undesireable (Proof of Work has major downsides).
If you have been reading through the tutorial to this point, then you
should have a pretty good idea of how the various pieces in the
description above each work,
and so it should not be difficult to see how to put these pieces
together to understand Bitcoin.


Target and Difficulty
---------------------

An important concept to Bitcoin is "target".
Recall that a miner is rewarded when they come up with a nonce that
brings the hash code under some value.
That value is known as the target.
How much work is required depends on how low the target value is.
For example, if the nonce were in base 10 and required 4 leading 0's,
then the chance of "winning" on a nonce try would be 1 in 10,000.
Over time, the value of a bitcoin has changed.
And since miners are paid in bitcoin for providing their service
(essentially, getting blocks onto the blockchain), the amount
of (real) time and expense (in terms of compute cycles, which is
equivalent to electricity cost) that a miner is willing to expend in
order to compete will change.
Bitcoin aims to have a block added to the blockchain
every 10 minutes, so it is necessary to change the target value
(the difficulty level for mining) as the mining pool changes.
If bitcoins become more valuable, then there will be more investment in
mining, and so the target needs to become more restrictive to maintain
the timetable.
If bitcoins drop in value, then there will be less investment
into mining (miners will stop spending so many cycles, and thus so
much electricity), and so the target has to become less restrictive
to maintain the timetable.
The target value is recalculated periodically, based on the actual
history of blocks being added to the chain.


Transactions
------------

Recall that we previously discussed how most participants in the
BitCoin ecossytem are Thin Nodes.
An example is a BitCoin wallet.
Thin nodes do not keep the entire transaction history for the system.
Instead, they query a 3rd party for the needed information about a
transaction, and then verify to their satisfaction that this
information is correct.
BitCoin uses Merkle Trees stored in its blocks to organize the
transactions to support :term:`Simple Payment Verification` (SPV).

However, we have a problem.
SPV only really applies to transactions that are safely on the
blockchain.
The standard for an "acceptable" level of trust is that six blocks
have been added to the blockchain beyond the block in question to be
fairly confident that the consensus algorithm has "confirmed"
settlement of your transaction.
Since BitCoin is tuned to add a new block every 10 minutes, this means
that reliable confirmation of a transaction takes on the order of hours.

When you swipe your credit card at a grocery store, the store is
relying on payment providers such as Visa or Mastercard to "verify"
that your credit is sufficient and that the transaction has been
processed.
In order to accomplish this, Visa and Mastercard employ
staffs of thousands of individuals, spanning multiple continents, all
working to build and maintain infrastructure for payment processing
systems.
Bitcoin aims to accomplish this without the need for human
intervention, while also avoiding the need for any trust in the
process.
In the credit card example, both the client and the merchant are
forced to trust that the payment processor is acting in an accurate
and honest way.

The rule of thumbs for bitcoin is you need to receive at least 6
transaction confirmations to ensure somebody already sent the coin to
you before you ship the real product.
This poses a lot of problems as the buyer does not trust the seller
(what if seller receives money but never ships), and vice-versa (what
if seller sends product and buyer does not pay).
Thus in practice we need a third party (escrow) to establish an
exchange channel between buyer and seller.
Buyer deposits coins to the 3rd trusted party and the seller sends the
product to the 3rd party.
After the 3rd party receives things from the seller and buyer, it will
forward the product to the buyer, and deposit the coin to the seller.
Of course you have to trust the 3rd party.
It is tricky because the bitcoin philosophy is to get rid of the
centralized party, but in the end we have to rely on a 3rd party.


Bitcoin controversies
---------------------

Bitcoin is controversial for a number of reasons.
Some are intrinsic to the nature of cryptocurrencies, and some derive
from the particular implementation of Bitcoin.

**Anonymity:** Like many cryptocurrencies, Bitcoin supports public key
cryptography as a mechanism to make participants in transactions
anonymous, at least to the extent of divorcing their persona within
the transaction from their real-world identity.
If there is any transaction that an entity can participate in that you
don't believe they should be permitted to participate in, then that is
a reason why you might object to this anonymity.
Examples of transactions that people (or governments!) object to
include illegal drug deals, sales of stolen property, money
laundering, murder for hire, illegal weapons deals, ransomware attack
and other blackmail payments, and tax avoidance transactions.
Governments in particular object to many of these, and typically build
complex systems for controlling anonymous transactions in "real world"
currencies.
Thus, they often object to anonymous transactions taking place in the
cryptocurrency world.

**Speculative Investment:** Some cryptocurrencies, and especially
Bitcoin, have become valuable enough to be considered worthwhile
trading as an investment.
Many things that are traded are considered "speculation" investments,
meaning that their trade value is disconnected from their intrinsic
value.
Moreso than stocks, bonds, and commodities that sometimes are traded
speculatively, Bitcoin has no intrinsic value.
It is only worth what someone is willing to provide to you in exchange.
Some argue that this is true for "real world" currencies as well,
with the counter-argument being that government-backed currencies have
a value that is generally related to the perceived stability of the
associated government.
Certainly there have been periods when the value of Bitcoin has varied
widely over short timescales.
Those who object to the notion of speculative investments tend to view
cryptocurrency investments negatively.

**Proof of Work Consumes Resources:** One consequence of the huge rise
in value of Bitcoins is that it gives incentive for many to compete as
miners.
As a consequence, the cost to mine a Bitcoin block has risen
in proportion (see "Target and Difficulty").
Thus, it is quite expensive now in terms of computational cost to mine
a new block of transactions.
Computational cost is directly proportional to energy cost.
That is, increasing the computation required to mine a block causes
the power consumed to mine that block to grow in proportion.
In 2021, Bitcoin mining was responsible for consuming roughly one half
of one percent of all electricty production in the world.
In a world where the effects of climate change are directly related to
the amount of power consumed, this has a signficant negative impact on
the world.
There is no intrinsic reason why any cryptocurrency needs to be
consuming significant amounts of energy to operate.
It is caused solely by the economic incentives created by the
combination of Bitcoin value and the Proof of Work algorithm that
Bitcoin happens to use.
This is a major motivation for finding other ways to build a consensus
algorithm that are less costly.
Etherium is an example of such a cryptocurrency, built on another
type of consensus algorithm

**Consequences:**
In May and June 2021, China effectively banned Bitcoin mining.
This caused the compute cycles available for mining to drop by
approximately 40%.
This in turn had a temporary effect on the mining target, making it
easier (and so, cheaper) for the remaining miners to mine new blocks.
40% of the Bitcoin mining capacity at the time was such a large amount
of computational power that it had real-world ripple effects such as a
drop in the price of related hardware.
In September, 2021, China banned all financial
transactions involving cryptocurrencies.
It is reasonable to assume this is due to China's government objecting
to the anonymity aspect of cryptocurrency described above.


Bitcoin Wallet
--------------

One practical aspect of using Bitcoin is that, if you own bitcoins,
you need to get access to them (to conduct transactions on them).
This is a matter of supplying your credentials when you seek
to publish your transaction.
Essentially, you do this by supplying a form of public key.
The mechanics for doing this go through something called your Bitcoin
Wallet.
Among other things, the Bitcoin Wallet holds your private key.

If you lose either the Wallet file, or you password/key that gives you
access to the Wallet,
then there is no recourse.
There is no central manager of the blockchain, and so no other entity
that can grant you access.
This is one of the repercussions of Bitcoin being a distributed
currency.
If you lose the key, there is no way to recover it.

See https://www.npr.org/2020/12/30/951460511/bitcoin-losers-classic
for an interesting story of people who have lost their
bitcoins when they lost track of or lost access to their Bitcoin
Wallet.
It is estimated that some signficant fraction of all the Bitcoins that
can ever be mined have been permanently lost in this way.
