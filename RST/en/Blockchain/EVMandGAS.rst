.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Liam Gillies

Ethereum Virtual Machine
========================

Introduction
------------

What is the Ethereum Virtual Machine(EVM)? The EVM acts as the underlying framework of Ethereum's entire operating structure. Ethereum is a distributed state machine, meaning that on top of holding all accounts and balances, it will update it's entire state from block to block. The specific rules for changing state from block to block are defined by the EVM. Anyone can run the EVM on their personal computers, and in fact, this is how Ethereum is mined. The EVM facilitates executions and deployments of smart contracts and transactions, both of which fill blocks that update Ethereum's state. 

Smart Contract Refresher
------------------------

Smart contracts are digital contracts, written in languages that are specifically designed to support them. One popular language made to target the EVM is Solidity, which in terms of syntax looks very similar to Java. Here is an example code snippet.

https://gyazo.com/7e396421b961f9d4d48fceb9cb84a769 (will insert later, link for now)

These contracts are highly customizable and are the building blocks for more advanced parts of blockchains. For example, one common use of smart contracts is to transfer ownership of NFTs. 

The EVM's main job is to compile smart contracts and transactions down into low-level instructions to be executed on miners' machines. One benefit of using languages specifically designed to build smart contracts is that they compile down to fewer instructions, making them faster to execute. Once compiled, each instruction will contain an opcode that denotes its goal. These opcodes are similar to what you would see in any given assembly language, some examples being ADD, POP, JUMP, etc. Then, the EVM will execute these instructions, and once verified, will add it to the next block.

Ethereum State
--------------

Once a block is committed, it will update the global Ethereum state, and transition from the previously known state to the new one. Thus, we are able to describe Ethereum as having the state transition function Y(S, T)= S'. Given an old valid state (S) and a new set of valid transactions (T), the Ethereum state transition function Y(S, T) produces a new valid output state S'. All running instances of the EVM will adopt this new state, and continue onward processing transactions.


Gas
===

Introduction
------------

Gas keeps the Ethereum blockchain safe. It is what also allows miners to profit, and provides incentive for doing so. So, what exactly is gas, and how does it work?

Gas is a fee placed on top of any transaction on the Ethereum network, which is paid directly to the miner who is using their computational resources to process the transaction. Gas also keeps the network safe through stopping an attacker from overloading the Ethereum network with transactions. If an attacker were to do so, they would quickly run out of capital due to gas fees stacking up on one another.

Cost of Gas
-----------

Two factors determine the price of gas at a given time:
 1. The complexity of the transaction (Blockchain transaction vs smart contract)
 2. The current load on the Ethereum network

Let's start with the first factor. In a regular Blockchain transaction, a block filled with transactions is executed and stored in the blockchain after it has been validated by miners. The base cost to have one of these transactions validated is 21000 gwei, where one gwei is one one-billionth, or 0.000000001 ETH. Then, there is an additional fee placed on top of the base cost, determined on the amount of instructions the miner must execute. Each opcode has an https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv associated gas cost, and when executed, consumes that amount of gas. Now, executing a transaction is the simplest transaction that can be done on a blockchain. When you get to more complicated transactions such as smart contracts, the amount of opcodes will drastically increase, which would increase the overall gas price.

The second factor for determining the price of gas is the current load, or how heavily congested the Ethereum network is. This is because the formula for calculating gas is Gas units * (Base fee + Tip). In the previous section we learned how Gas Units are calculated, and Ethereum's network congestion determines the price of the base fee. The Tip is a priority fee and is set automatically by most wallets to assist in your transaction's completion. To have your transaction to be included in a block, you must pay the block's corresponding base fee, shown here.

(Image https://gyazo.com/ed985a9f020ea31379ef0901dbbb9249)

The base fee of the current block is calculated based off of the size of previous blocks (amount of gas used total). If the target size is exceeded, the base fee will increase by a maximum of 12.5% per block. As a result, this growth is compounding and can lead to very high base fees when there is high network congestion for extended periods of time.

However, this is not the only reason that gas prices increase during high congestion. Miners will greedily prioritize transactions that supply more gas, so the more gas you pay, the more likely you are to get included in the next block. When performing a transaction, you will be given the option to choose from a low, medium, and high priority gas fee. The lower the fee, the lower the chance a miner will pick it up, and the longer it will take for the transaction to be completed by the blockchain. This also means that if you pay too little gas, your transaction will likely get stuck. In this situation, you can either cancel the transaction and lose what you paid for gas, or pay additional gas and speed up the transaction. Either way, paying too low of a gas fee is usually not a good idea.

Examples
--------

To sum up, let's consider some example transaction scenarios, assuming a tip of 0: (note - this could be an exercise)

1. Blockchain transaction, low network congestion

Here, we can assume 21000 gas units will be used, and a base of 100 for the block's base fee.
Thus, the gas fee will be 21000 * (100 + 0) = 0.0021 Ethereum

2. Blockchain transaction, high network congestion

21000 * (180 + 0) = 0.00378 Ethereum

3. Smart contract execution, extremely high network congestion

An example smart contract token is ERC-20, which is the technical standard for smart contracts on Ethereum. It has a minimum fee of 65000 gwei.
65000 * (250 + 0) = 0.01625 Ethereum

As you can see, gas fees can become quite expensive when dealing with such transactions. In conclusion, gas is a huge contributing factor to Ethereum being decentralized due to potential profits from mining. It also removes incentive to attack and overload the network with transactions, as gas fees will compound and quickly consume the attacker's capital.