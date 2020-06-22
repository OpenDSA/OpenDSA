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

Cryptography Hashing: It might as well be random
------------------------------------------------

In this section, we talk about how cryptography is a fundamental part
of blockchain, cryptocurrencies, and any other application that
involves blockchain.
There are two main ways that cyrptography fits in.
The first we already saw: That a standard cryptography algorithm is
used to generate a hash code.
Why do it that way? We'll explain that next.
Below, we talk about how cyrptography allows a seeming contradiction:
On the one hand, people can perform tasks like send messages and
conduct transactions while remaining anonymous (if they like), while
on the other hand, the recipient of the message or transaction can be
confident about the "identity" of who they are dealing with.

TODO: DISCUSS HERE WHY WE USE CRYPTOGRAPHIC HASH FUNCTIONS.
BASICALLY, TO MAKE THEM EFFECTIVELY RANDOM, SO THAT THEY CANNOT BE
REVERSE ENGINEERED.

NOTE THAT PASSWORD SYSTEMS WORK THE SAME WAY.


Identification
~~~~~~~~~~~~~~

Blockchain systems often use :term:`public-key cryptography` to
"identify" participants and confirm which participant originated a
message or transaction.
At the same time, this process allows a participant to keep their
"real world" identity secret, while still convincing everyone else
involved that they have the right to make the transaction involved.

To start, a participant generates a coordinated pair of keys:
their public key and their private key.
They use a cryptographic hash function to do this for all the usual
reasons, that they cannot be reverse engineered.
They publish the public key, and maintain the private key in secret.

It is possible [EXPLAIN HOW] for the participant to use their private
key to sign a message or transaction so that anyone can use the
participant's public key to verify, with a small amount of
computational effort, that the participant signed it.
At the same time, it is computationally infeasible for
anyone without the private key to sign a message and pass it off as
signed by the participant. [EXPLAIN]
This is essential in blockchains to verify who originated a message.

Now we are going to demonstrate how RSA encryption is used to do this.
To see how this works, you should type some message that you would
like to be encrypted and then decrypted.
We suggest that you type some real phrase rather than just gibberish
characters, so that its easy for you to see that the decryption is
done correctly.

.. maybe take this out and just let them input it in the third step 

.. _InputMessage:

.. avembed:: AV/Blockchain/InputMessage.html pe
   :long_name: Inputting a Message to get Decrypted

.. We need a passphrase that will allow us to encrypt your message that you
.. have just typed and will allow us to generate the public and private keys.

.. .. _Passphrase:

.. .. avembed:: AV/Blockchain/Passphrase.html pe
..    :long_name: Inputting a Passphrase for the encryption keys

Next, we have generated for you public and private keys.
You will use these to sign messages and decrypt the message that you
typed above.
We make it easy for you to copy and paste, just click on the button to
the right of the key that you want to use to copy it.

.. _Keys:

.. avembed:: AV/Blockchain/Keys.html pe
   :long_name: Public and Private Keys

In a real application, you would make your public key, well, public.
That way, anyone who wants to verify that a message really comes from
you can do it.
Or, anyone who wants to send you a message that only you can read can
do it.
For this example, assume that someone wants to use your public key 
to encrypt the message that you typed above.
By copying the public key into the box, you will see that the message
is encrypted.

.. maybe change this and just have them input the message here
.. signed message with the public key. this should also show what
.. their message is

.. _Encrypt:

.. avembed:: AV/Blockchain/Encrypt.html pe
   :long_name: Encrypt with Public Key

We will now use your private key to decrypt your message.
When someone sends you a message signed with your private key, you
will be able to decrypt it by using your private key.
This is why RSA encryption is an asymmetric algorithm because you can
only encrypt messages with a public key and decrypt them with your own
private key.

.. decrypting with the private key 

.. Decrypt:

.. avembed:: AV/Blockchain/Decrypt.html pe
   :long_name: Decrypt with Private Key

In a real public/private key system, you would never want someone to
find your private key!
Because if they do, then they will be able to pretend that they are
you (which means that they could do all of your transactions, like
manipulate a bank account that is tied to this private key).
Or, they will be able to read messages that were encrypted with your
public key, and therefore were only intended for you to be able to
decrypt.

You can see that the process is reversable.
Simply reverse the use of the public and private keys in the widgets
above, to see that this can go in either direction. [EXPLAIN THIS BETTER.]
