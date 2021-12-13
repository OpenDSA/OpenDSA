.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: OpenDSA Contributors
   :topic:


Blockchain Tutorial Glossary
============================

.. glossary::
   :sorted:

   Bitcoin
      The original, and currently most popular, cryptocurrency.
      It is based on a :term:`distributed ledger` using a
      :term:`permissionless system`, and its :term:`consensus
      algorithm` is built on :term:`proof of work`.

   blockchain
      A linked list of blocks (typically blocks of
      :term:`transactions <transaction>`) where the links include a
      hash value for the block being pointed to.
      By this means, the contents of the block (and by extension, any
      prior blocks in the blockchain) cannot be modified without
      invalidating the hash value, thereby signaling to all parties in
      the community that the blockchain has been corrupted.
      Blockchains are typically the basis of a :term:`public ledger`.

   Byzantine agreement
      A :term:`consensus algorithm`. This algorithm has existed since
      long before :term:`blockchain` and :term:`cryptocurrency`,
      it is so-named
      because it is meant to solve a story problem called the
      "Byzantine Generals problem". In a network, it is intended to
      reach consensus among "honest" nodes that follow the protocol,
      even when some of the participating nodes are "dishonest" or
      malicious. To succeed, it requires that 2/3 of the nodes be
      "honest".

   Casper
      The :term:`proof of stake` algorithm used by :term:`Ethereum`.

   consensus
   consensus algorithm
      In a :term:`distributed ledger`, the process by which a new
      block (typically containing :term:`transactions <transaction>`
      is added to a :term:`blockchain`.
      A consensus algorith typically defines these major parts:
      How the next block is to be proposed, how the transactions on
      that block are validated, and how the block propogates through
      the network to be accepted by the community.

   cryptocurrency
      An electronic currency that relies on various cryptographic
      services to keep it secure. Typically, a :term:`blockchain` is
      used as the basis for a :term:`public ledger` that stores
      :term:`transactions <transaction>` on the currency being maintained.
      Most typically, a the blockchain is implemented within a
      :term:`distributed ledger` using a
      :term:`permissionless ledger system` so that there is no central
      authority that controls the cryptocurrency.
      As such, a :term:`consensus algorithm` is required to permit the
      community to update the ledger with new transactions.
      
   distributed ledger
   distributed public ledger
      A :term:`public ledger` that does not have a central controller
      who is in charge of adding blocks to the :term:`blockchain`.
      Instead, a :term:`consensus algorithm` is used to determine who
      has the ability to propose the next block, and how it gets
      propogated it to the community.

   Ether
      The name of the actual cryptocurrency coins in the Ethereum
      ecosystem.
      
   Ethereum
      A cryptocurrency ecosystem.
      Most notable for its use of
      :term:`smart contracts <smart contract>` and its transition away
      from using :term:`proof of work` to :term:`proof of stake` to
      drive its :term:`consensus algorithm`.

   fork
      Within a :term:`blockchain` system, it is a condition where
      different members of the community hold differing versions of
      the blockchain.
      Most often these are :term:`soft forks <soft fork>` that will be
      resolved by the :term:`consensus algorithm`.
      A :term:`hard fork` is a permanent change to the blockchain that
      modifies previously verified blocks.

   full node
      Within a :term:`blockchain` network there are typically many
      participants, referred to as nodes.
      A full node stores a complete copy of the blockchain, and might
      also store auxilliary data structures to make search on the
      transaction records embodied by the blockchain easier to search.
      Full nodes sometimes will act as a resource for other members of
      the community.
      
   hard fork
      In a :term:`blockchain`, a state where the contents
      of the blockchain have been irrevocably altered in some way that
      cannot be resolved by the normal consensus algorithm.
      Thus, different members of the community have different versions
      of the blockchain that cannot be resolved by the
      :term:`consensus algorithm`.
      This is in contrast to a :term:`soft fork`.
      Hard forks are sometimes made to a blockchain system when it is
      adopting a new consensus protocol or other implementation change,
      or recovering from a hack or other catastrophic corruption of
      the blockchain's contents.

   ledger
      Within the context of a :term:`blockchain` system, a ledger is a
      record of transactions on some resource, such as a
      :term:`cryptocurrency`.
      Such ledger systems are generally
      :term:`public <public ledger>`, and might also be
      :term:`distributed <distributed ledger>`.

   Merkle proof
      An efficient means of proving that a :term:`transaction` is
      legitimate, accomplished with just :math:`O(log n)` nodes where
      :math:`n` is the number of nodes in a block.
      This is done by moving up the path from the transaction to the
      root of its containing :term:`Merkle tree`.

   Merkle tree
      Similar to a :term:`blockchain`, except it is a tree structure.
      Specifically, a Merkle tree contains a collection of
      :term:`transactions <transaction>`
      organized into a binary tree, where the pointers each have an
      associated hash value. Given the correct hash value for the root
      of the tree, no transaction in the tree can be modified without
      invalidating the hash values along its path to the root.

   miner
   mining
      In a :term:`cryptocurrency` that uses a
      :term:`consensus algorithm` based on :term:`proof of work`,
      a miner is an entity that attempts to gain the right to add
      transactions to the cryptocurrency's :term:`blockchain`.
      This is typically done by consuming computing resources
      (thereby "proving" that they did "work") to guess a successful
      :term:`nonce` value.

   NFT
   Non-fungable token.
      Something that is unique and cannot be duplicated.
      A common form of this is a digital record of ownership,
      typically of a digital object such as an image or data.
      While the digital object can still be copied, the fact of
      ownership embodied in the record of ownership is intended to be
      unique.
      NFT is in contrast to a fungable token, which is an
      interchangable, non-unique object.
      In a :term:`cryptocurrency` context, a fungable token is most
      often a coin in the cryptocurrency itself.
      
   nonce
      A value added to a block of data that will cause the hash code
      for the resulting data (that is, the original data augmented by
      the nonce) to have a particular property (typically that the
      resulting hash code be less than some value).
      This is typically used in a :term:`consensus algorithm` based on
      :term:`proof of work` to control whether a given participant is
      permitted to propose a block to be added to the :term:`blockchain`.
      The :term:`miner` will guess at nonce values until they hit on
      one that causes the hash value to meet the property, thus
      expending effort (the "proof" of work).

   permissioned ledger system
   permissioned system
      A :term:`public ledger` where only certain entities are
      permitted to update the ledger.
      Generally, this is a simpler system to
      implement than a :term:`permissionless ledger system`, which is
      typical for a :term:`distributed public ledger`.
      
   permissionless ledger system
   permissionless system
      A :term:`public ledger` where anyone is potentially permitted to
      update the ledger (though they might need to perform specific
      actions to do so, see :term:`proof of work` and
      :term:`proof of stake`).
      :term:`Distributed public ledgers <distributed public ledger>`
      are typically permissionless in this sense.

   proof of burn
      An uncommonly used basis for a :term:`consensus algorithm`.

   proof of capacity
      An uncommonly used basis for a :term:`consensus algorithm`.
   
   proof of stake
      Within a :term:`consensus algorithm` for a
      :term:`distributed ledger`,
      Proof of Stake is a way that a person or group can claim the
      right to propose the next block of transactions to be added to a
      blockchain.
      It's name comes from the fact that making this claim involves
      putting up a stake (typically in the form of some cryptocurrency
      or other resource that is being managed by this distributed
      ledger).
      Proof of Stake is used, for example, by the :term:`Ethereum`
      cryptocurrency.
      It is in contrast to using :term:`proof of work` as the
      mechanism for claiming the
      right to propose the next block.

   proof of work
      Within a :term:`consensus algorithm` for a
      :term:`distributed ledger`,
      proof of work is a way that a person or group can claim the
      right to propose the next block of
      :term:`transactions <transaction>` to be added to a 
      blockchain.
      This is done by expending resources (work, typically in the form
      of compute cycles) to solve a problem
      (most typically, guessing numbers for a :term:`nonce` until one
      with the right property is stumbled upon).
      Proof of Work is used, for example, by the :term:`Bitcoin`
      cryptocurrency.
      It is in contrast to using :term:`Proof of Stake` as the
      mechanism for claiming the
      right to propose the next block.
   
   public-key cryptography
      A authentication scheme for identifying that a given entity sent
      a message, or is able to receive a message meant for them.
      It is based on a pair of matching keys. Given a message, one of
      the keys can encrypt the message so that the other can decrypt
      it. Typically, an entity will publish their "public" key, and
      keep secret their "private" key.
      
   public ledger
      A ledger (collection of :term:`transactions <transaction>` and
      resulting account balances) that is public, meaning that anyone
      within a certain community can see the series of transactions.
      To protect the public ledger from malicious changes,
      it is often built on a :term:`blockchain`.
      A simple public ledger will have some authority that has
      permission to add new blocks to the blockchain (adding
      transactions to the ledger).
      A :term:`distributed ledger` is public, but has no such central
      authority.
      Instead, blocks of transactions are added to the ledger by means
      of a :term:`consensus algorithm`.

   simple payment verification
      A process of verifying that a given transaction claimed to be in
      a block on a blockchain is really legitimate. A part of this
      process is to make sure that the transaction is properly tied
      into a :term:`Merkle tree` by means of an efficient
      :term:`Merkle proof`.
      
   smart contract
      A type of non-static :term:`transaction` on a
      :term:`public ledger`. Essentially a program written in a
      special-purpose programming language for the purpose.
      Examples of smart  contracts include transfer of ownership for
      things aside from simple transfer of cryptocurrency
      (particularly popular is transfer of ownership of :term:`NFTs
      <NFT>`), or a longer-term series of transactions such as paying
      rent on a regular basis.

   soft fork
      In a :term:`blockchain`, a state where different members of the
      community have different versions of the blockchain.
      Ideally, this is a transient state caused by the fact that a
      network is not instantaneous, and that will get resolved by the
      :term:`consensus algorithm`.
      This is in contrast to a :term:`hard fork`, where the contents
      of the blockchain have been irrevocably altered in some way that
      cannot be resolved by the normal consensus algorithm.
      
   thin node
      Within a :term:`blockchain` network there are typically many
      participants, referred to as nodes.
      A thin node stores very little information beyond that
      immediately of interest to the owner of the node, such as the
      current account balance and transactions involving that owner.
      A typical example of a thin node is a :term:`wallet` for a
      :term:`cryptocurrency`.
      A thin node is in contrast to a :term:`full node`, which
      contains a complete copy of the blockchain.

   transaction
      An agreement to transfer something.
      Simple static transactions are simply of the form that account A
      transfers something of value to account B.
      :term:`Smart contracts <smart contract>` are a form of
      transaction implemented in a programming language, and so can be
      more complicated.
      In a :term:`blockchain` based system, to allow more
      efficient processing,
      transactions typically conform to the :term:`UTXO` model.

   Unspent Transaction Output
   UTXO
      A model for defining transactions in a :term:`public ledger`.
      A simple static transaction might be "Alice pays Bob 10 coin".
      If transactions look like this, then computing the current
      balance for an account requires finding all such transactions
      throughout the :term:`blockchain`.
      Under UTXO, if Alice has 25 coin, the transaction will look like
      "Alice pays Bob 10 coin. Alice pays Alice 15 coin.", thereby
      accounting for all coin currently in the account.
      In this way, an account balance is known by seeing only the most
      recent transaction.

   wallet
      Within the context of a :term:`cryptocurrency`, this is a
      digital system that maintains information about someone's
      account.
      It is a classic example of a :term:`thin node` that maintains
      only the minimal information necessary related to the associated
      cryptocurrency (that is, the account balance and information
      about associated :term:`transactions <transaction>`).
      If the cryptocurrency is built on a a :term:`distributed ledger`
      with no central authority to manage it, then losing the password
      or key to the ledger makes any resources owned by the account
      permanently inaccessible.
