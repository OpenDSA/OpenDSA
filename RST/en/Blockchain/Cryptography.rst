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

Using Cryptography: It might as well be random
----------------------------------------------

In this section, we talk about how cryptography is a fundamental part
of blockchain, cryptocurrencies, and any other application that
involves blockchain.
There are two main ways that cyrptography fits in.
The first we already saw: That a standard cryptography algorithm is
used to generate a hash code.
Why do it that way? We'll explain that next.
Later, we talk about how cyrptography allows a seeming contradiction:
On the one hand, people can perform tasks like send messages and
conduct transactions while remaining anonymous (if they like), while
on the other hand, the recipient of the message or transaction can be
confident about the "identity" of who they are dealing with.


Generating a Hash Code
----------------------

We often want to generate a hash code for some information.
Specifically, we will take an arbitrary string of any length and
generate a fixed-length number in return.
As mentioned in the introduction, we assume in this tutorial that
SHA-256 will be used to crate a 256-bit (or 64 hexidecimal charater)
code.

There are two key features of SHA-256 that we rely on to make the
system secure.
First, given a hash code, there is no practical way to recover any
information about the original string used to generate it.
SHA-256 will effectively slice and dice the original string to the
point that no meaningful information is retained.
We will never have need to undo the hashing process to recover the
original message used to create the code.
(In fact, so far as anyone knows, this is impossible.
Cryptography systems depend on that to be true to work securely.)
The second important property is that minor changes to the input
string lead to unpredictable changes in the resulting hash value.
For example, switching two letters in the input string will change the
resulting hash code in unpredictable ways.
Going up by one letter (like changing an 'a' to a 'b') will also
change the resulting hash code in unpredictable ways.
Not only is this property necessary to make sure that nobody can
deduce the original information from the hash,
but this property is also critical for the "proof of work" concept
used by a system like Bitcoin (see :ref:`Mining <Mining> <Mining>`).


Encrypting and Decrypting
-------------------------

The second fundamental cryptographic service that we rely on is the
ability to securely encrypt a message.
This means that a string (of arbitrary length) can be given to an
encryption process, and the resulting output string cannot be used to
deduce the original message.
But unlike hashing, there has to be a way to decrypt the message.
When given the decryption key, the process can be reversed, the
original message can be recovered from the encrypted string.
So, of course we use different algorithms for encrypting/decrypting
than the SHA-256 algorithm that we have been using to create a hash
code.
For one thing, the encrypted message is not of a pre-determined fixed
length (it can't be fixed-length if its going to contain all of the
information from the original variable-length message).

Blockchain systems often use :term:`public-key cryptography` to
"identify" participants and confirm which participant originated a
message or transaction.
At the same time, this process allows a participant to keep their
"real world" identity secret, while still convincing everyone else
involved that they have the right to make a given transaction.

To start, a participant generates a coordinated pair of keys:
their public key and their private key.
They use a cryptographic hash function to do this for the usual
reason, that the resulting hash cannot be reverse engineered.
The point to the keys is that they are functional inverses of each
other.
That is, you can use either one to encrypt a message, and then use the
other one to decrypt the message.
The participant will then publish the public key, and maintain the
private key in secret.

So now, the participant can encrypt their signature on a message or
transaction using the private key.
Anyone with the public key (which ought to be anyone who is
interested, because the public key is meant to be exactly that --
public) can then verify, with little computational effort,
that the participant signed it.
They do this by decrypting the encrypted signature with the public
key.
The result should be whatever the sender claims it would be to
identify themselves.
At the same time, it is computationally infeasible for
anyone without the private key to sign a message and pass it off as
signed by the participant.
Because that public key will just decrypt to gibberish if someone
tried.
This is essential in public key identity systems to verify who
originated a message, such as a financial transaction.
Note that what this means is that we can know that the holder of the
private key that matches this private key did the encryption of the
signature (and so is authorized to do this transaction).
But that does not mean that we know who this person is, beyond the
fact that they hold the private key.
This is what allows users to be anonymous.
You know their public persona within that public key ecosystem, but
you cannot necessarily relate that back to their "real world"
identity.

Now we are going to demonstrate how something called RSA encryption is
used to do this.
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
do so.
This is because when the public key is used to encrypt a message, only
the matching private key can decrypt it.
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
above, to see that this can go in either direction.
