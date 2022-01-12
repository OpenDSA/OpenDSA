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

What is the Ethereum Virtual Machine (EVM)?
The EVM acts as a distributed computer running 
the underlying framework of Ethereum's
operating structure. 
You can think of Ethereum as a single entity mantained
by thousands of connected computers running a copy of
the EVM. This entity is a blockchain, and we can describe
any given block in the chain as updating a "state_" defined by the
blockchain to that point.
The rules for changing state from block to block are defined by the
EVM and are covered in the rest of this section.

.. _state:

Ethereum State
~~~~~~~~~~~~~~

Before we get started, let's define a few terms:

1. Transaction: Something that changes data within the blockchain.
Common examples of this are changing account balances (sending ETH to
someone else) or editing data within a `smart contract`_.

2. Block: A blockchain is composed of blocks, which are each filled
with transactions.

3. Ethereum State: A snapshot of the Ethereum blockchain at a point in time.

4. Global Ethereum State: The agreed upon state of Ethereum by
up-to-date instances of the EVM.

Elaborating on the Ethereum State -- it's all stored in an
`enormous data structure`_.
The data structure stores data for every account: current balance,
number of previous transactions, smart contract code, etc.
It also stores other data such as previous blocks and all data
pertaining to them.
All running instances of the EVM have a local copy of this giant data
structure downloaded.
Ideally, it is identical to the current consensus state, but some
instances might be slightly behind due to not yet having received the
latest updates through the network.
This is because each EVM instance receives a new state from other EVM
instances.
That new state will propegate throughout the network,
which takes time.

So, how does this global state update?
Once a block is committed, meaning that it is adopted as the newest
block in the blockchain, 
the global Ethereum state will transition from the previously known
state to the new one
(details on how a `block is committed`_).
A block being committed means that all transactions it contains have
been deemed legitimate, and therefore, the giant data structure
containing Ethereum's state has been updated with the new block's
information.
All running instances of the EVM must have adopted this new global
state through downloading new data into their local copy of the giant
data structures.
So some account balances will have changed 
and some smart contract transactions will have been made, which all
these machines must collectively agree on.
Once this is complete, the block is finally committed to the
blockchain and Ethereum's state will update.

One thing to note is that the process for committing a new block onto
the blockchain takes rougly 15 seconds for Ethereum.
So, as with any distributed ledger, transactions aren't instant.
Only a few dozen to a few hundred transactions fill each block, and a
transaction will only have completed once it is included in a
block.
So why 15 seconds, instead of 1 or 2 seconds (which might seem like a
reasonable time to propogate through the network)?
Well, the mean time to propagate new data across all running instances
of the EVM is 12.6 seconds.
Additonally, the process by which a block is proposed needs to take
place (previously this was a form of proof-of-work, but in December
2020, Ethereum changed it's consensus algorithm to proof-of-stake).

Thus, we are able to describe Ethereum as having the state transition
function Y(S, T)= S'.
Given an old valid state (S) and a block of valid transactions (T),
the Ethereum state transition function Y(S, T) produces a new valid
output state S'.
All running instances of the EVM will adopt this new state, and
continue onward processing transactions.

.. avembed:: Exercises/Blockchain/EthereumState.html ka
    :long_name: Ethereum State Quiz

.. _`enormous data structure`:

**Brief description of the enormous data structure:**

A modified Merkle-Patricia tree stores the Ethereum state. 
The tree is essentially a giant key-value map, where every key is 
an Ethereum address and the value is an array containing account
data.
Specifically, it holds account balance, number of previous 
transactions, and two hashed fields pertaining only to `smart
contract`_ accounts.
For regular accounts, these fields will be empty.
For smart contracts, one field is a hash of a piece of the
smart contract code, which is executed if the account
receives a message call (a read only operation).
The other is a hash of the root of another
Merkle-Patricia tree, called the Account Storage tree.
This tree is where *all* of the smart contract data is stored. 

.. _`smart contract`:

Smart Contract Refresher
~~~~~~~~~~~~~~~~~~~~~~~~

There are two types of accounts designated addresses on the
blockchain: Externally Owned Accounts that most people own to send and
receive ETH, and Contract Accounts which contain a smart contract 
compiled down into bytecode.
Both of these account types are given addresses, can receive, hold,
and send ETH and `fungible tokens`_, and can interact with smart contracts.
Smart contracts are written in special-purpose
programming langauges.
One popular language one being Solidity.
Here is an example Solidity code snippet. 

.. image:: https://arpitmathur.files.wordpress.com/2018/04/solidity.png

This code snippet is an example smart contract with a function that
lets a user set a local variable and retrieve it.
It can be thought of as a storage, hence the contract name,
"SimpleStorage".
In a realistic smart contract, someone might store a party that agreed
to a legal document.

A developer can put whatever data and functions they desire inside of
a smart contract.
Once a smart contract is put onto the blockchain, code within it is
immutable.
However, functions are able to be called through third-party software.
If these functions change data within the smart contract, they will
change the blockchain's state and are considered transactions.
In the example above, calling the function "set" would be considered a
transaction since it changes data within the smart contract.
Calling "get", however, would not be since it only reads data.

Since smart contracts are so customizable, multiple different
applications of them have arisen.
For example, the most common use of smart contracts is to transfer a
non-fungible token(NFT).
The most popular smart contract for doing so is `ERC-721
<http://erc721.org/>`_, which is a standard for NFTs.
It has functions like transfer(current_owner, new_owner, NFT_id),
ownerOf(NFT_id), and more.
When someone purchases the NFT, the transfer function would be called
to transfer ownership of the NFT to the new address.
This will change data inside the smart contract,
so it is considered a transaction.
If you call the ownerOf function to find the owner of an NFT,
it won't modify blockchain data, and won't be considered a
transaction.

.. _`fungible tokens`:

Smart contracts are also how fungible token ownership gets
incorportated into a blockchain.
A fungible token is the opposite of a NFT -- meaning that every token
is the same.
This is what Ether, or Bitcoin, or any other coin on a blockchain is.
You are able to trade one coin for another, as they all have the same
value.
The most popular standard for implementing one of these coins is
`ERC-20 <https://ethereum.org/en/developers/docs/standards/tokens/erc-20/>`_,
and a coin must implement specific methods to be considered an ERC-20
coin.
Any one of these coins would have metadata such as the total supply of
the coin, the coin's symbol, if the minting is finished, etc.
It would also have a function to transfer coins between addresses,
and these addresses are either the same as Ethereum addresses or a
mapping of an Ethereum address.
Some of these coins include $USDT (Tether), $SHIB (Shiba Inu),
$USDC (USD Coin), $UNI (Uniswap), and more.
You can take a look at all coins built on top of blockchains here:
https://coinmarketcap.com/tokens/views/all/

.. _`block is committed`:

What does the EVM do?
~~~~~~~~~~~~~~~~~~~~~

Before we get started, let me define an Ethereum node.
A node is a computer running an instance of the EVM that someone has
set up to verify all transactions in each block.
This means the node will ensure no requests are malformed, all
accounts are valid, etc.
So what's the difference between a node and a miner?
Well, all miners are nodes, but not all nodes are miners.
Miners have the ability to validate blocks as a whole through the
proof-of-work consensus algorithm, while nodes cannot.
Note that this pertains only to the proof-of-work protocol.

Ethereum changed to a proof-of-stake protocol in December, 2020.
So, the following description relates to the previous proof-of-work
protocol.
Once a transaction is made anywhere on the Ethereum network, it will
be sent to a node.
That node will broadcast this transaction to all other nodes,
and it will be added to every nodes' list of pending transactions.
This is called the nodes' mempool: a list of all transaction requests 
that haven't been committed to a block yet.
At some point in time, a single miner will collect a few dozen to a
few hundred of these transactions from its local mempool into a
potential block, in a way that maximizes the gas_ fees attached to
each transaction.
Then, the miner will verify each transaction, 
execute its bytecode to perform the transaction on their local
version of the EVM, then collect the transaction's gas fee.
Finally, the miner will begin the proof-of-work process to produce a
certificate that shows the block is valid.
Once completed by the miner, that miner will broadcast
the new block, the certificate, and a checksum of the new EVM state to
all other nodes.
Then, every other node will validate the proof-of-work certificate and
re-approve all transactions in the block.
This includes the transactions to pay the miner their collected gas
fee from the block.
Once validated, the node's local state will update to include the new
block, and it will continue propegating through the network.
In general, once a node has propegated throughout at least 51% of the
network, we can say the global state of Ethereum will transition to 
include the new block.

In the proof-of-stake protocol, all mentions of gas being collected by
miners are instead collected by validators.
The process for adding a new block essentially stays the same.
The difference between the prior proof-of-work protocol and the new
proof-of-stake protocol is the exact process used to propose the next
block.


.. _gas:

Gas
---

Introduction
~~~~~~~~~~~~

Gas keeps the Ethereum blockchain safe.
It is what also allows (previously) miners (now) validators to profit,
and provides incentive for doing the necessary work of proposing the
next blook of transactions for the blockchain.
So, what exactly is gas, and how does it work?

Gas is a fee placed on top of any transaction on the Ethereum network,
which is paid directly to the miner or validators who is making the
effort to validate and execute the bytecode of a transaction.
Gas also keeps the network safe through stopping an attacker from
overloading the Ethereum network with transactions, elaborated on
here_.


Cost of Gas
~~~~~~~~~~~

Two factors determine the amount of gas required by a transaction:
 1. The complexity of the transaction
(static blockchain transaction vs smart contract)
 2. The current load on the Ethereum network

Let's start with the first factor.
The normal way to update a Blockchain is that a block filled with
transactions is proposed and accepted into the blockchain
(via the consensus algorithm process).
For each of these transactions, a miner/validator must validate them
and execute their bytecode, which is composed of instructions.
The base cost to have some transaction validated is 21000 gwei, 
where one gwei is one one-billionth, or 0.000000001 ETH.
Then, an additional fee is placed on top of the base cost, determined
by the amount of instructions to be executed.
Each opcode has an associated gas cost, and when executed, consumes
that amount of gas
(see https://github.com/djrtwo/evm-opcode-gas-costs/blob/master/opcode-gas-costs_EIP-150_revision-1e18248_2017-04-12.csv).
When you get to more complicated bytecode in smart contract
transactions, the amount of instructions executed drastically
increases, which is why gas fees are higher for smart contracts than
for static transactions. 

The second factor for determining the price of a transaction is the
current load, or how heavily congested the Ethereum network is.
The formula for calculating gas is:
Gas price = Gas units * (Base fee + Tip), 
and we just discussed how gas units are calculated.
The base fee's price is determined by Ethereum's network congestion.
The tip is a priority fee and is set automatically by most
wallets to speed up your transaction's completion, so it's not 
very important when calculating gas.
The base fee for the current block is calculated based off previous
blocks.
When a new block is added onto the blockchain, there is a set amount
of gas, called included gas, that it can hold (sum of all gas fees
from transactions in the block).
In the block with the lowest base fee of 100 gwei, block number 1,
included gas is 15M gwei.
If the included gas is completely filled, the base fee will increase
by a maximum of 12.5% per block and the block number will increase.

.. image:: https://i.gyazo.com/ed985a9f020ea31379ef0901dbbb9249.png

This growth is compounding and can lead to very high base fees when
there is high network congestion for extended periods of time.
The block number will also decrease by 1 when the
included gas is not completely filled, creating fluctuations in 
gas prices.

However, this is not the only reason that gas prices increase during
high congestion.
Miners will greedily prioritize transactions that supply more gas, so
the more gas you pay, the more likely your transaction is to get
included in the next block.
When performing a transaction, you will be given the option to choose
from a low, medium, or high priority gas fee.
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

To sum up, let's consider an example transaction scenario.
Given the formula 

Gas price = Gas units * (Base fee + Tip)

Let's assume a tip of 0 and 21000 gas units for a regular
transaction.
This is what the gas price would be, depending on the base fee:

.. image:: https://i.gyazo.com/b5a61de74c49f9a66e78ff599577cf99.png

Recall that a higher base fee comes with higher network congestion.
So you might end up paying a substantial amount of money in ETH just
because the network was congested at the time!
The base fee of a transaction is the most volatile number when
calculating gas, so all real gas prices will be fairly reflective of
this chart.

So you might be wondering why anyone would use Ethereum when  
fees get so high.
One major benefit of Ethereum is that their fees are flat -- meaning that 
the fee for sending $10 versus $100,000 is the same.
Additionally, Ethereum tends to stay between 1 and 10 blocks, so gas
prices will rarely spike to crazy numbers.
Historically, gas price spikes have occured when a popular NFT is
released to the public all at once, and thousands of smart contracts
are attempted to be minted at once.

.. _here:

Conclusion
~~~~~~~~~~

In conclusion, gas is a huge contributing factor to
Ethereum being decentralized due to mining profits. 
Ethereum mining is more profitable than Bitcoin mining due to high gas
fees during periods of high network congestion coupled with ~5-6x more
Ethereum transactions per day since the time to add a new block to the
blockchain is far less in Ethereum (15 seconds typically) as compared
to BitCoin (10 minutes).
This means that the network is more likely to be highly congested and
miners will be paid more to validate transactions.
Gas also removes incentive to attack and overload the network with
transactions, as gas fees will quickly consume the attacker's capital.
If someone wanted to stall the network for 15 seconds, they would have
to put enough transactions in to fill a block.
The gas limit for all blocks (aside from block 1 and 2) is 30M gwei,
which equates to 0.03 ETH.
If you wanted to stall the network, for let's say 1 hour (3600 seconds),
you would have to fill 3600/15 = 240 blocks.
This would equate to spending 240*0.03 = 7.2 ETH = ~$31,000
(as of 12/5/2021).
Attackers will typically consider this an unreasonable amount of money
to stall the network for just 1 hour.
As you can imagine, taking down the network for any extended
period of time is simply not worth it.
If gas didn't exist, an attacker's transactions could fill blocks
over and over such that no other transactions could be added into a
block.
This would stall the Ethereum network to the point where it would
become unusable.
All in all, gas is an important part of Ethereum that is necessary to
keep the blockchain decentralized and running smoothly.
