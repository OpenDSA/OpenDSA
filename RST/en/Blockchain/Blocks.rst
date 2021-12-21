.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Kyle Papili and Cliff Shaffer

Blocks & Nodes
==============

What makes up a Block?
----------------------

A blockchain is simply a linked list of blocks, where each link of the
linked list has an associated hash code.
We have already seen how these hash codes provide a mechanism to
protect the blockchain from being modified without it becoming obvious
that this happened.
How let's talk about what might be found in one of the
blocks on a blockchain in a typical application.

The figure below provides a visual breakdown of the major  
components that might be found a given block.
No given application is likely to use all of these.
A brief summary of each item is included beneath the diagram. 

.. odsafig:: Images/BlockDiagram.png
   :width: 350
   :align: center
   :alt: Typical fields found in Blockchain blocks.


**Block Size:** The size (stored in bytes) of the given block.

**Block Header:** An internal object of a block containing relevant metadata.

**Version:** Describes the version / protocol edition.

**Previous Block Hash:** The root hash of the previous block.

**Merkle Root:** The hash of the root node of merkle tree
(see :ref:`Merkle Trees <Merkle Trees> <MerkleTrees>`).

**Timestamp:** The timestamp of block's creation.

**Difficulty Target:** Numeric representation of difficulty when block was mined.

**Nonce:** Cryptographic key used to generate accurate hash.

**Transaction Counter:** Number of transactions in block.

**Transactions:** Collection of individual transactions.


Full vs. Thin Blocks and a Community of Nodes
---------------------------------------------

Why use a Blockchain?
We have already seen that one of the primary distinctions of a
Blockchain is that, if any contents are altered, then this can be
verified by anyone who knows the initial hashpointer value, and can
see the contents of the blockchain.
Which begs the question: Why would you be worried that the contents
might be altered?

Blockchains are most typically used in the context of a
:ref:`Public Ledger <public ledger> <Ledgers>`.
This is an application that exposes the entire blockchain publicly.
In some such applications, only a central, trusted authority can
change the contents of the Blockchain, and tampering is not a concern.
In other applications (such as cryptocurrencies), many parties are
allowed to change the ledger, but there is not much trust involved.
This is difficult to get right, and is the domain of
:ref:`Consensus Algorithms <consensus algorithm> <Consensus>`.
For now, just accept that there is away to handle these updates,
but the public parties involved might or might not want to be able to
verify that the Blockchain is self-consistent.
     
There is another practical constraint involved: Some Blockchains are
really, really big.
For example, the public ledger for BitCoin (including its transaction
history) by 2020 had become hundreds of gigabytes in size.
This means both that it is expensive to store (space), expensive to
search (time), and expensive to verify its consistency (time again).

Fortunately, a Blockchain application of significant size is likely to
also attract a signifcant community to it.
Operating a large, decentralized blockchain requires coordination among
multiple members of the community.
These members are sometimes referred to as "nodes" in a network.

A :term:`full node` contains the entire blockchain and it's contents.
This includes a complete record of every block,
including all transactions stored within each block,
which as we mentioned is hundreds of gigabytes of data in the case of
Bitcoin.
A full node has the ability to inspect the validity of the consistency
of the blockchain, and therefore can also assess the validity of new
blocks proposed to be appended to the blockchain.
This is an important safeguard to the community,
but not one that every participant feels the need to do for themselves.

Many participants in the community will host a :term:`thin node` which
only stores the metadata needed for each block.
This includes the hash pointer for each block, and other descriptive
data (time when it was added to the blockchain, etc) that the holder
feels necessary for their needs.
They might also hold copies of transactions that they are particularly
interested in, along with enough information to verify that they are
really a part of the blockchain (we discuss this further in connection
with
:ref:`Simplified Payment Verification <Simplified Payment Verification> <MerkleTrees>`).
The purpose of Thin Nodes is to allow the blockchain network to scale
more easily than if each node were required to be a full node.
A BitCoin Wallet is an example of a thin node.
Thin nodes can rely on full nodes to provide them with
transaction verification when needed.

The third type of node is one that might, depending on the details of
the consensus algorithm used, propose new blocks to add to the
blockchain.

There can be additional members of the community that play an
important role in the ecosystem.
For example, Bitcoin has associated entities known as "block
explorers" that organize the transactions into a a searchable database
to allow efficient lookup of transactions of interest.
