.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Bailey Spell and Jesse Terrazas

Smart Contracts
===============

Introduction
------------

Blockchain systems utilize an important protocol called a 
smart contract. In this module we will discuss about what
a smart contract is, why is it useful in blockchain, and 
implementations of this protocol.

What is a Smart Contract?
~~~~~~~~~~~~~~~~~~~~~~~~~

In specific terms, a smart contract is a computer protocol
involving transactions to enforce the terms of an agreed 
upon contract between two peers. They allow for credible transactions to 
occur without the consultation of a third party. By using
a smart contract, individuals to exchange money, property, 
or anything of value without having to deal with a middle man.
For example, you might have to get some legal document signed 
and need to see a notary. You will have to go see them, get it 
signed, and then take the document to the individual who needs 
it. A smart contract eliminates much of this process. With the 
agreed upon protocol, one has the ability to send the document 
off into the system and the smart contract verifies whether this 
document is acceptable and can be sent to the other participant.

Why is it used in Blockchain Systems?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

As we have learn, blockchain systems are decentralized and fall 
into the hands of the users. This is a great reason why a blockchain
system uses a smart contract. Whenever Alice commits a transaction 
to Bob, she never wants to wait and have a third party verfying 
whether she can pay Bob. The smart contract automatically confirms 
this. 

How can this be Implemented?
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An implementation of this can be seen if Bob wants to rent an 
apartment from Alice and decides to pay with a cryptocurrency. Bob receives a receipt
held within their smart contract. Bob is to receive a digital
key on the specified date. If Bob does not receive the key on 
the day Alice told him he would, the smart contract triggers the blockchain
to refund Bob. If Alice sends the key on the specified date, then the 
contract will inform the blockchain to issue Bob's payment to Alice and give 
him a key. In this scenerio, our smart contract operates on an If-Then assertion 
that everyone on the blockchain can see ensuring no faulty exchanges. If Alice 
gives Bob the key, she can be paid. If Bob sends the correct payment, he can
receive the key and anything else will be cancelled.
