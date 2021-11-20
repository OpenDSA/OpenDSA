.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Liam Gillies and Cliff Shaffer

The Ethereum Virtual Machine and Gas
====================================

Ethereum Virtual Machine
------------------------

Introduction
~~~~~~~~~~~~

[Liam and Arib need to coordinate, since some of this material is
covered also in the introduction.]

What is the Ethereum Virtual Machine(EVM)?
The EVM acts as the underlying framework of Ethereum's entire
operating structure.
Ethereum is a distributed state machine, meaning
that on top of holding all accounts and balances, it will update it's
entire state from block to block. [What does this mean?]
The specific rules for changing state from block to block are defined
by the EVM.
Anyone can run the EVM on their personal computers, and in fact, this
is how Ethereum is mined.
The EVM facilitates executions and deployments of smart
contracts and transactions, both of which fill blocks that update
Ethereum's state.  
[I don't get any of this "update state" stuff. Explain.]


Smart Contract Refresher
~~~~~~~~~~~~~~~~~~~~~~~~

Smart contracts are programs [To do what?] written in special-purpose
programming langauges to support them.
One popular language made to target the EVM is Solidity [Huh? Is
Solidity for supporting EVM, or is it for writing smart contracts?],
which in terms of syntax looks very similar to Java.
Here is an example code snippet. 

https://gyazo.com/7e396421b961f9d4d48fceb9cb84a769 (will insert later,
link for now) [Go ahead and do this! Look up examples in other modules
for how we support code snippets.]

These contracts are highly customizable and are the building blocks
for more advanced parts of blockchains. [This is super vague, rewrite
and explain what you mean.]
For example, one common use of smart contracts is to transfer
ownership of NFTs.
[Explain why this needs a smart contract, and is not simply a
transaction. This might be a good place to have a detail example,
perhaps as a slideshow.]

The EVM's main job is to compile smart contracts and transactions down
into low-level instructions to be executed on miners' machines. [Is
this really where a smart contract gets executed? What is the outcome
of a smart contract? Transactions on the blockchain?]
One benefit of using languages specifically designed to build smart
contracts is that they compile down to fewer instructions,
making them faster to execute. [Is that really important? Who runs the
smart contract other than the minor? Given that we are still in a
proof-of-work world, efficiency doesn't seem like a motivator!]
[A major benefit to specialized langauges (at least in Bitcoin) is
that they limit what the programs can do.]
Once compiled, each instruction will contain an opcode that denotes
its goal.
These opcodes are similar to what you would see in any given assembly
language, some examples being ADD, POP, JUMP, etc.
Then, the EVM will execute these instructions, and
once verified, will add it to the next block.
[None of this explains why we need a specialized programming
language.]


Ethereum State
~~~~~~~~~~~~~~

Once a block is committed [Meaning what? Mined and proposed to the
network?], it will update the global Ethereum state, 
and transition from the previously known state to the new one. [This
is vague. Explain. What is the definition of a state? I am guessing
that it is a collection of account balances.]
Thus, we are able to describe Ethereum as having the state transition
function Y(S, T)= S'.
Given an old valid state (S) and a new set of valid transactions (T),
the Ethereum state transition function Y(S, T) produces a new valid
output state S'. [How is this different from, say, Bitcoin? Doesn't
adding a block (meaning a bunch of transactions) to the blockchain
always changing the state of the current collection of account balances?]
All running instances of the EVM will adopt this new state, and
continue onward processing transactions. [By this, do you mean that
all participants reach consensus on the definition of the blockchain?


Gas
---

Introduction
~~~~~~~~~~~~

Gas keeps the Ethereum blockchain safe.
It is what also allows miners to profit, and provides incentive for
doing so.
So, what exactly is gas, and how does it work?

Gas is a fee placed on top of any transaction on the Ethereum network,
which is paid directly to the miner who is using their computational
resources to process the transaction. [What does "process the
transaction" mean?]
Gas also keeps the network safe through stopping an attacker from
overloading the Ethereum network with transactions. [This will need
detailed explanation, but probably later in this section.]
If an attacker were to do so, they would quickly
run out of capital due to gas fees stacking up. [... as explained
later, right?]


Cost of Gas
~~~~~~~~~~~

Two factors determine the price of gas at a given time:
 1. The complexity of the transaction
    (Blockchain transaction vs smart contract)
 2. The current load on the Ethereum network

Let's start with the first factor.
The normal way to update a Blockchain is that a block filled with
transactions is proposed and accepted into the blockchain
(via the consensus algorithm process).
The base cost to have some transaction validated and added to the
block is 21000 gwei, where one gwei is one one-billionth, or
0.000000001 ETH.
Then, an additional fee is placed on top of the base cost, determined
on the amount of instructions the miner must execute. [Why would a
miner execute instructions? I think you skipped saying that this is in
case the thing is a smart contract instead of a static transaction.]
Each opcode has an associated gas cost, and when executed, consumes
that amount of gas
(see https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv).
Executing a static transaction is the simplest activity that can
be done on a blockchain.
When you get to more complicated use of smart contracts, the amount of
opcodes executed will drastically increase, which would increase the
overall gas price.

The second factor for determining the price of gas is the current
load, or how heavily congested the Ethereum network is.
This is because the formula for calculating gas is
Gas units * (Base fee + Tip).
We just discussed how Gas Units are calculated based on how complex
the transaction or smart contract might be.
Ethereum's network congestion determines the price of the base fee.
The Tip is a priority fee and is set automatically by most
wallets to assist in your transaction's completion.
To have your transaction to be included in a block, you must pay the
block's corresponding base fee, shown here. 

(Image https://gyazo.com/ed985a9f020ea31379ef0901dbbb9249) [Fix this
to embed the image into the page.]

The base fee of the current block is calculated based off of the size
of previous blocks (amount of gas used total).
If the target size is exceeded, the base fee will increase by a
maximum of 12.5% per block.
As a result, this growth is compounding and can lead to very
high base fees when there is high network congestion for extended
periods of time. [This does not really make sense. Explain more.]

However, this is not the only reason that gas prices increase during
high congestion.
Miners will greedily prioritize transactions that supply more gas, so
the more gas you pay, the more likely you are to get included in the
next block.
When performing a transaction, you will be given the option to choose
from a low, medium, and high priority gas fee.
The lower the fee, the lower the chance a miner will pick it up, and
the longer it will take for the transaction to be incorporated into
the blockchain.
This also means that if you pay too little gas, your transaction could
get stuck.
In this situation, you can either cancel the transaction and lose what
you paid for gas, or pay additional gas and speed up the
transaction.


Examples
~~~~~~~~

To sum up, let's consider some example transaction scenarios, assuming
a tip of 0: (note - this could be an exercise) [Should try to make
this a visualization.]

1. Blockchain transaction, low network congestion

Here, we assume 21000 gas units will be used, and 100 units for
the block's base fee.
Thus, the gas fee will be 21000 * (100 + 0) = 0.0021 Ethereum

2. Blockchain transaction, high network congestion

Here, we assume a higher base fee due to network congestion:
21000 * (180 + 0) = 0.00378 Ethereum

3. Smart contract execution, extremely high network congestion

An example smart contract token is ERC-20, which is the technical
standard for smart contracts on Ethereum. [This provides no
information. Explain.]
It has a minimum fee of 65000 gwei. 
So, the cost would be: 65000 * (250 + 0) = 0.01625 Ethereum

As you can see, gas fees can become quite expensive when dealing with
such transactions.
In conclusion, gas is a huge contributing factor to
Ethereum being decentralized due to potential profits from mining.
It also removes incentive to attack and overload the network with
transactions, as gas fees will compound and quickly consume the
attacker's capital. [This needs a lot more explanation! To start with,
why would loading the network with transactions (if there were no gas
fees) be an attack? Second, why does anyone want to pay gas fees to
begin with? What is the motivation? I guess because a person wants
their transaction on the blockchain. So, compare to Bitcoin: There the
system generates coin for miners, on a known schedule (the rate at
which blocks are added to the chain). Why do it differently? Is there
an advantage to the Bitcoin process (system pays) vs. the Ethereum
process (transactor pays)?]

