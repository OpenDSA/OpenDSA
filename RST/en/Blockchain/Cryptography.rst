.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Lenny Heath, Cliff Shaffer, Bailey Spell, and Jesse Terrazas
   :requires:
   :satisfies:
   :topic:

Cryptography and Blockchain
===========================

How Cryptography Fits In
------------------------

Blockchain systems employ cryptography in a number of ways to do their
basic operations.
These include:

* Identification
* Hashing

Identification
~~~~~~~~~~~~~~

Blockchain systems often use :term:`public-key cryptography` to
identify participants and confirm which participant originated a
message or transaction.
A participant generates a coordinated pair of keys, their 
public key and their private key, by cryptographic means.
They publish the public key and maintain the private key in secret.
It is possible for the participant to use their private key to sign a
message or transaction so that anyone can use the participant's public
key to verify, with a small amount of computational effort, that the
participant signed it.
At the same time, it is computationally infeasible for
anyone without the private key to sign a message and pass it off as
signed by the participant.
This is essential in blockchains to verify who originated a message.

.. TODO::
   :type: Demo
          
   Give an inline demo of public-key cryptography, such as RSA, 
   here.

Hashing
~~~~~~~

A :term:`cryptographic hash function` is a function that maps any
amount of data (usually taken to be a sequence of bytes or a file) to
a bit string of fixed size, the :term:`hash`.
The intention is that the hash appears random and 
that the function is, practically speaking, impossible to invert 
computationally.
A common cryptographic hash function standard that is 
used in blockchain systems such as Bitcoin is SHA-256.
Here the hash is a 256-bit string (32 bytes or 64 hexadecimal digits).
The idea is that the hash of a transaction is effectively a random
string (or number) that identifies it in a non-forgeable way in the
universe of transactions that might be put on the blockchain.

A :term:`hash pointer` is one of the most important concepts in
Blockchain.
A hash pointer is nothing more than a pointer along with a hash of
whatever the pointer is pointing at.
The point of this is that nobody can in practice change the contents
of the block that the pointer is pointing at, because doing so would
make the hash value no longer match the data.
A blockchain is really nothing more than a linked list where the
"next" pointers are actually hash pointers.
Block :math:`t` in a blockchain therefore contains
the hash of block :math:`t-1` as a backward pointer into the
blockchain.

.. _HashExample: 

.. avembed:: AV/Blockchain/HashExample.html ss
   :long_name: Hash Example
          
   In this demonstration, you can type in some text and watch as the 
   SHA-256 hash changes completely with each new character.

Readers don't need to undestand the details of how the hash function
actually works (give references to more info for those who want it).
What matters is these basic concepts:

* A person reliably generate the hash code or hash pointer for a block
  of data.

* A person cannot come up with data that will generate a specific hash
  code by doing anything more efficient than guessing (and this is
  impractical because of the huge number of possible hash code
  values).
