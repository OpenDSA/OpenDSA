.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney

Hard Forks
==========

Review: What are Consensus Algorithms?
--------------------------------------
A consensus algorithm is a method by which a distributed ledger is
updated (that is, a new block is added to the block chain), and all
parties come to agreement that this did happen. There are several implementations
of a consensus algorithm including proof of work and proof of stake.
Proof of work is where blocks are added by mining: computers guessing at
algorithms to find the correct one and add a block to the chain. Proof
of stake is similar to gambling where you invest a percentage of your coin
to be randomly chosen for a validation committe and in that committee, members
add new blocks to chain and approve transactions.
For more information, see
:ref:`consensus <consensus> <Consensus>`.

What is a Hard Fork?
--------------------
Another risk to consensus algorithms like proof of stake and proof of
work is hard forks.
Hard forks might be caused by a change in the blockchain's technology.
Hard forks might result in blocks that had previously been validated
becoming invalid, while other blocks might become valid by adding
them to the chain.
These forks can be started by developers or miners who are not
satisfied with the current progress of the blockchain.
They also are a way to fund projects.

Specifically, hard forks are caused by additions to block code that
causes a new path with an upgraded blockchain.
This fork causes two paths in the blockchain to appear for miners or
validators.
A fork like this can occur in any form of cryptocurrency that 
is based on blockchain.
When a fork occurs, the miners, validators, and forgers of a
particular coin must follow the changes since when a fork occurs,
developers update the base code of blockchain to match the new
networking rules.
Hard forks can be implemented to undo damage caused by a hack
(i.e. reversing transactions), adding new functionality (such as
changing the consensus algorithm), and patching
security risks.

What are the Effects of a Hard Fork?
------------------------------------

Hard forks are in contrast to soft forks, which allows one side of the
fork to continue to exist, removing the choice of path a miner can
take in a hard fork.
Hard forks effectively create a new cryptocurrency, while soft forks
do not.
Although these changes can be beneficial to blockchain users, they can
cause a blockchain to become unstable.
This is because hard forks can result from disagreements from within
the cryptocurrency's community.
Forks can result in price inflations as well, raising the cost 
of the coin.
In addtion, in some cases, adding a hard fork can introduce
vulnerabilities into the cryptocurrency.
An example of this happened to Ethereum in 2019.
A fork was introduced for Ethereum, which caused
issues with smart contracts.
The Constantinople fork was proposed in 
increased vulnerabilities within the smart contracts.
The hashing algorithm
within these contracts became repeatable and thus, increased the chances of 
a hacker accessing the information within the contracts.



How a Consensus Algorithm Influences a Hard Fork's Effect
---------------------------------------------------------

In the case of a hard fork for the proof of work algorithm, the miners
must decide whethere to continue in the current path,
or join the new blockchain.
If the miner decides to choose to continue to support both chains in
the fork, they must divide their resources between the two chains.
Since the computing power is divided between the two chains, there is
reduced resources dedicated to a chain or more strain on the computers
they use to mine coin.
In general, a fork is discouraged for proof of work systems 
because this causes more of an impact on the value of the currency by
decreasing it and the developers of the cryptocurrency would need to
choose the fork that does not cause vulnerabilities in the code base.

In proof of stake algorithms, forking is part of the validator's job.
A validator must choose which block is beneficial to the
cryptocurrency.
If the validator chooses the wrong side of the fork, leading to
vulnerabilities, the validator would lose their stake.
However, unlike proof of work systems, a validator does not have to
choose one block.
There is not as much of a computational cost with maintaining a fork,
the validator can choose to support both directions of the
fork.
Because of this, forking is more prevalent in proof of stake systems
than in proof of work systems and makes people worry about the
stability of the cryptocurrency.

.. avembed:: Exercises/Blockchain/HardForksQuiz.html ka
    :long_name: Hard Forks
