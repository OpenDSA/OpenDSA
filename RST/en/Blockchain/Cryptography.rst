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
* Blocks

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

Now we are going to demonstrate how RSA encryption is used. First in
the example below, please provide some message that you would like to be
encrypted and then decrypted. 

.. maybe take this out and just let them input it in the third step 

.. _InputMessage:

.. avembed:: AV/Blockchain/InputMessage.html pe
   :long_name: Inputting a Message to get Decrypted

.. We need a passphrase that will allow us to encrypt your message that you
.. have just typed and will allow us to generate the public and private keys.

.. .. _Passphrase:

.. .. avembed:: AV/Blockchain/Passphrase.html pe
..    :long_name: Inputting a Passphrase for the encryption keys

Now we can generate you a public and private key. You will use these to sign
messages and decrypt your message you inputed above.
In the future, you will never want someone to find your private key.

.. _Keys:

.. avembed:: AV/Blockchain/Keys.html pe
   :long_name: Public and Private Keys

In applications outside of this textbook, you would give your public key to anyone
who might send you a message in the future. For this example, you will use your 
own public key to sign your message that you typed above. By clicking the button 
below, you will see what your message looks like encrypted and signed by the key.

.. maybe change this and just have them input the message here
.. signed message with the public key. this should also show what their message is

.. _Encrypt:

.. avembed:: AV/Blockchain/Encrypt.html pe
   :long_name: Encrypt with Public Key

We will now use your private key to decrypt your message. When someone sends you a
message signed with your private key, you will be able to decrypt it by using your 
private key. This is why RSA encryption is an asymmetric algorithm because you can 
only encrypt messages with a public key and decrypt them with your own private key.
Be careful, you never want anyone to obtain your private key or they have the ability
to intercept and read any messages that have been sent to you.

.. decrypting with the private key 

.. Decrypt:

.. avembed:: AV/Blockchain/Decrypt.html pe
   :long_name: Decrypt with Private Key

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

We will use the SHA-256 hash method throughout this tutorial, but showing 64 characters in the visualizations is unwieldy. 
So, we will only show the last 16 characters, like is shown here: 

.. _SmallerHashExample:

.. avembed:: AV/Blockchain/SmallerHashExample.html pe
   :long_name: Smaller Blockchain Hash Example 

Readers don't need to undestand the details of how the hash function
actually works (give references to more info for those who want it).
What matters is these basic concepts:

* A person reliably generate the hash code or hash pointer for a block
  of data.

* A person cannot come up with data that will generate a specific hash
  code by doing anything more efficient than guessing (and this is
  impractical because of the huge number of possible hash code
  values).

Blocks
~~~~~~

As we dive deeping into the building blocks of blockchain, we will look at a simple example of a block. In the figure below, we can see that 
our block has a corresponding number and then some data corresponding to it. What we do here is concatenate the block number to the data that 
is given to create a new hash.

.. _BlockExample:

.. avembed:: AV/Blockchain/BlockExample.html pe
   :long_name: Block Example

Blockchains are blocks that utilize the previous block's hash to "chain" together and create the blockchain. It is a linked list where 
the pointer of each block points to the previous block's hash. The figure below demonstrates that when we change the the data of one block
we are altering the pointers and hashes from all the blocks behind it. The reason for this is because the hash of each block is dependent 
on the hash of the previous block. This is where security on the blockchain becomes to enter, but we will talk about that in future sections.
As of now, our hashs are created by concatenating the block number, data, and the previous hash.

.. _BlockchainExample:

.. avembed:: AV/Blockchain/BlockchainExample.html pe
   :long_name: Blockchain Example

Below is a slideshow demonstrating these importance of each of these concepts as a blockchain would grow.

.. inlineav:: llistBlockchain ss
   :long_name: Blockchain Slideshow 1
   :links: AV/Blockchain/llistBlockchain.css
   :scripts: AV/List/llist.js AV/Blockchain/llistBlockchain.js
   :output: show