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

What is the Ethereum Virtual Machine(EVM)?
The EVM acts as a distributed computer running 
the underlying framework of Ethereum's
operating structure.
Ethereum is a distributed state machine, meaning
that on top of holding all accounts and balances, it will update it's
global state from block to block.
The specific rules for how state is changed are defined by the EVM,
as described next.
Anyone can run the EVM on their personal computer, and in fact, this
is how Ethereum is mined.
The EVM facilitates transactions between both regular accounts and
smart contracts, which fill blocks that update Ethereum's state. 


.. _Ethereum state:

Ethereum State
~~~~~~~~~~~~~~

Ethereum State is a snapshot of the blockchain at a point in time. This includes all balances and previous transactions under addresses, 
all smart contracts existing on the blockchain -- essentially all data on the blockchain. This data is all stored in an enormous data structure 
(a `modified Merkle Patricia Trie <https://eth.wiki/en/fundamentals/patricia-tree>`_). So, how does this state update?

Once a block is committed every 15 seconds or so, AKA chained onto the blockchain, 
the global Ethereum state will transition from the previously known state to the new one. 
This means that the old
data structure will be overwritten with new data, and all Ethereum applications will 
adopt it. So if we look up the transaction history of an address with a transaction in 
the most recently committed block, we will see a new transaction has occured. This is also why transactions
aren't instant; you must wait for the next block to be committed before it goes through.

Thus, we are able to describe Ethereum as having the state transition
function Y(S, T)= S'.
Given an old valid state (S) and a block of valid transactions (T),
the Ethereum state transition function Y(S, T) produces a new valid
output state S'.
All running instances of the EVM will adopt this new state, and
continue onward processing transactions.

.. avembed:: Exercises/Blockchain/EthereumState.html ka
    :long_name: Ethereum State Quiz

Smart Contract Refresher
~~~~~~~~~~~~~~~~~~~~~~~~

There are two types of accounts designated addresses on the blockchain: Externally Owned Accounts
that most people own to send and receive ETH, and Contract Accounts which contain a smart contract.
Smart contracts are written in special-purpose
programming langauges, one popular language one being Solidity.
Here is an example Solidity code snippet. 

.. image:: https://arpitmathur.files.wordpress.com/2018/04/solidity.png

As you might infer, these contracts are highly customizable and are the building blocks
for more advanced parts of blockchains. Developers can assign whatever they want to
exist inside a smart contract, which allows for many different applications.
For example, the most common use of smart contracts is to represent a non-fungible token(NFT).
On the blockchain, a smart contract representing a NFT would hold some metadata such as
name, image/gif/video url to represent the NFT, address that possesses
ownership of that NFT, and more. When someone purchases the NFT, a function would be called
to transfer ownership of the NFT to the new address.

Smart contracts are also how fungible tokens get built on a blockchain. A fungible token is
the opposite of a NFT -- meaning that every token is the same. This is what Ethereum, or Bitcoin, or
any other coin on a blockchain is. A smart contract representing a coin would have metadata such as 
the total supply of the coin, the coin's symbol, if the minting is finished, etc. It would also a function to transfer coins
between addresses, and these addresses are either the same as Ethereum addresses or a mapping
of an Ethereum address. Some of these coins include $USDT (Tether), $SHIB (Shiba Inu), $USDC (USD Coin),
$UNI (Uniswap), and more. You can take a look at all coins built on top of blockchains here: https://coinmarketcap.com/tokens/views/all/

What does the EVM do?
~~~~~~~~~~~~~~~~~~~~~

Every Ethereum node runs a copy of the EVM.
In the EVM, every pending transaction will get added to each node's local 
mempool; a list of all transaction requests that haven't been committed
to a block yet. At some point in time, a single mining node will collect
a few dozen to a few hundred of these transactions into a potential block, 
in a way that maximizes the gas_ fees. Then, the mining node will verify each
transaction, execute its bytecode to perform the transaction on their local
version of the EVM, then collect the transaction's gas fee. Finally, the 
mining node will begin the Proof-of-Work process to produce a certificate that
shows the block is valid. Once completed by a miner, that miner will broadcast
the new block, the certificate, and a checksum of the new EVM state to all 
other nodes. Then, every other node will follow the same steps and approve
all transactions in the block. Once this is complete, the new block is 
chained onto the blockchain, and the EVM's state transitions to include 
this block.

.. _gas:

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
resources to validate and execute the bytecode of a transaction.
Gas also keeps the network safe through stopping an attacker from
overloading the Ethereum network with transactions, elaborated on
here_.


Cost of Gas
~~~~~~~~~~~

Two factors determine the price of gas at a given time:
 1. The complexity of the transaction
    (Blockchain transaction vs smart contract)
 2. The current load on the Ethereum network

Let's start with the first factor.
The normal way to update a Blockchain is that a block filled with
transactions is proposed and accepted into the blockchain
(via the consensus algorithm process). For each of these transactions,
a miner must validate them along with execute their bytecode, which is
composed of instructions.
The base cost to have some transaction validated is 21000 gwei, 
where one gwei is one one-billionth, or 0.000000001 ETH.
Then, an additional fee is placed on top of the base cost, determined
on the amount of instructions the miner must execute.
Each opcode has an associated gas cost, and when executed, consumes
that amount of gas
(see https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv).
When you get to more complicated bytecode in smart contract transactions, the amount of
instructions executed drastically increases, which is why gas fees are higher
for smart contracts than regular transactions.

The second factor for determining the price of gas is the current
load, or how heavily congested the Ethereum network is.
The formula for calculating gas is: Gas price = Gas units * (Base fee + Tip), 
and we just discussed how gas units are calculated.
The base fee's price is determined by Ethereum's network congestion.
The tip is a priority fee and is set automatically by most
wallets to speed up your transaction's completion, so it's not 
very important when calculating gas.
The base fee of the current block is calculated based off previous blocks.
When a block is chained onto the blockchain, there is a set amount of gas, called included gas,
that it can hold (sum of all gas fees from transactions in the block).
In the block with the lowest base fee of 100 gwei, block number 1, included gas is 15M gwei. 
If the included gas is completely filled, the base fee will increase by a
maximum of 12.5% per block and the block number will increase.

.. image:: https://i.gyazo.com/ed985a9f020ea31379ef0901dbbb9249.png

This growth is compounding and can lead to very
high base fees when there is high network congestion for extended
periods of time. The block number will also decrease by 1 when the
included gas is not completely filled, creating fluctuations in 
gas prices.

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

.. avembed:: Exercises/Blockchain/CostOfGas.html ka
    :long_name: Ethereum Gas Quiz

Example
~~~~~~~

To sum up, let's consider an example transaction scenario. Given the formula

Gas price = Gas units * (Base fee + Tip)

Let's assume a tip of 0 and 21000 gas units for a regular transaction. This is what the
gas price would be, depending on the base fee:

.. image:: https://i.gyazo.com/b5a61de74c49f9a66e78ff599577cf99.png

Recall that a higher base fee comes with higher network congestion. So you might end up paying 
a substantial amount of money in ETH just because the network was congested at the time! The base
fee of a transaction is the most variable number when calculating gas, so all real gas prices will 
be fairly reflective of this chart.
Note that Ethereum tends to stay between 1 and 10 blocks, so gas prices will very rarely spike to
crazy numbers. Gas spikes have occured when a popular NFT is released to the public at a single date,
and thousands of smart contracts are attempted to be minted at once. 

.. _here:

Conclusion
~~~~~~~~~~

In conclusion, gas is a huge contributing factor to
Ethereum being decentralized due to mining profits. 
On top of that, Ethereum mining is more profitable than 
Bitcoin mining due to high gas fees during periods of high network congestion
coupled with ~5-6x more Ethereum transactions per day. This means that the 
network is more likely to be highly congested and miners will be paid more.
Gas also removes incentive to attack and overload the network with
transactions, as gas fees will compound (as the base fee compounds)
and quickly consume the attacker's capital. If gas didn't exist, the 
attacker's transactions could fill blocks over and over such that no other transactions could
be added into a block. This would stall the Ethereum network to the point where it would become
unusable. All in all, gas is an important
part of Ethereum that is necessary to keep the blockchain decentralized and running smoothly. 

