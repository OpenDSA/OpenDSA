.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
    :author: Elizabeth Mulvaney

Crypto Hacking
==============

What is Crypto Hacking?
-----------------------

Crypto hacking is a term for the act of stealing cryptocurrency.
This can occur by cheating users directly, such as phishing users into
fake coin exchanges.
Or it can occcur by using tools that compromise coin exchanges.
Phishing schemes can occur over emails, text, or advertisements
related to the user's purchases and wallet.
In some cases, these communications trick the user that their
account has already been compromised and the user must provide new
information in order to secure the account again.
Crypto hacking also occurs by exploiting vulnerabilities within the
blockchain or with a user's wallet.

The goal of crypto hacking is to obtain cryptocurrency through such
manipulations.
However, as is the case in most hacking situations, there are white
hat hackers and black hat hackers. 

White hat hackers use their methods of hacking in order to 
expose vulnerabilities to the company.
Companies pay these white hat hackers 
to find the vulnerabilites before a malicious actor can exploit them.
If a white hat hacker obtains cryptocurrency while performing the hacking
practices, they return the coin back to the users.

Black hat hackers are not supported by the company producing the
cryptocurrency or the wallets.
These individuals or groups intend to find the vulnerabilities
for their own gains.
The following discussion relates to black hat hackers.

.. avembed:: Exercises/Blockchain/HackerTypes.html ka
    :long_name: Hacker Types


Hacking Strategies
------------------

Phishing Attack
~~~~~~~~~~~~~~~

Phishing attacks are the methods of stealing data or money from users
by using social engineering methods.
This includes asking for credentials or giving a link
to a false log in for accounts.
One such example of phishing for cryptocurrency is
called spear phishing.
Spear phishing targets individuals with messages designed specifically
for them.
The senders of these messages pretend to be trusted sources 
and ask for sensitive information or send them to a website filled
with malware.
In the case of cryptocurrency, this type of phishing pretends to
originate from the users' wallets.

Another phishing scheme related to cryptocurrency is replacing the
address of the website in the Domain Name Service, DNS, so when the
browser completes the request for the website's location on a server,
the result is a website created by an attacker.
From there, the attacker will gain user information once the user logs
in.
The user typically accesses this page from a phishing email as listed
in the previous paragraph.

[I am not sure what is the point to including this discussion. This
does not have anything to do with cryptocurrency in particular, or
with blockchain. Its just general online scamming and hacking.]


51% Attack
~~~~~~~~~~

A 51% attack can be initiated by an individual, a company, or a group
that has their mining resources collected together as one unit.
The entity or group has 51% or more of the resources related to the
consensus algorithm in the cryptocurrency network.
For a proof of work system, this means that the actor has the majority
of the mining power.
For proof of stake systems, this means that the investor has a
majority of the available coin staked into the system, increasing the
influence they have on the network
(see :ref:`Proof Of Stake <Proof of Stake> <ProofOfStake>`).

The chance of this happening in a developed cryptocurrency is not
significant, but they do still occur. [Need Examples]
Once a person has the majority in computing power or stake, they can
target individuals by hacking their wallets and obtaining information
from their [... looks like something missing here.]

Overall, there is not much legislation related to 51% attacks or a
user's ability to gain 51% of the computing power.
Given that cryptocurrency usage is increasing worldwide, this
may change.

Cryptojacking
~~~~~~~~~~~~~

Cryptojacking is the act of attaching cryptomining code onto what
seems to be trustworthy items.
There are three methods of cryptojacking including attaching malware
onto emails, embedding malicious code into websites, and cloud
cryptojacking.
This type of crypto hacking is typically used 
to mine cryptocurrency that uses a proof of work system.

File-based cryptojacking is the practice of attaching malware on links
in emails.
These links, when clicked, download malware onto the computer and then
runs an executable.
From there, the executable begins mining cryptocurrency for the hacker
using the computer's or system's resources.
This typically runs without the user being aware of anything
occurring.
This method would target users in a proof of work system such as  
bitcoin.
However, the user may notice their system slowing down or an excess
use in the computer's CPU.

Browser-Based Cryptojacking or the act of embedding malicious code
into websites or advertisements, uses the computer's system to run a
cryptomining script.
Once the object the code is embeded in is clicked on, 
the script begins to mine coins without downloading files.
These objects the code is embedded in are typically advertisements or
features that are out of date (vulnerable to security threats).

The last main type of cryptojacking is cloud cryptojacking or using an
organization's file structure to gain access to their cloud services.
Then the hackers use the resources the company has in the cloud
to mine cryptocurrency. [Vague -- needs more explanation.]


Mitigation (Reduce Risk) Strategies
-----------------------------------

Phishing Attacks
~~~~~~~~~~~~~~~~

For protecting against phishing, practice strategies taught by
Virginia Tech and employers.
Such practices include reporting emails thought to be suspicious and
do not open unknown links and do not provide log in information from
links given in emails.
Do not use public Wi-Fi networks to access accounts because you cannot
verify if the traffic is being observed.
Use multi-factor authentification to guaruntee the user
is who should be logging into the system.
[None of this seems related to blockchain.]

In addition, to mitigate the affects for DNS phishing, use a Virtual
Private Network (VPN) to send data on encrypted networks.
Also, verifying URLs for trusted certificates aids in ensuring the
website is trustable.

.. odsafig:: Images/LocalBitcoins.jpg
   :align: center
   :width: 800

|

.. avembed:: Exercises/Blockchain/PhishingEmail.html ka
    :long_name: Phishing Email

51% Attack
~~~~~~~~~~

Although the attack is different than a phishing attack, several
mitigation strategies are shared between the two hacking
strategies.
The first is using two-step authentication on wallets 
to prevent unauthorized users from accessing their data.
To prevent large amounts of cryptocurrency from being stolen from
wallets, maintain several wallets with small amounts of coin in
it.
That way, if one of the wallets have been compromised, only a small
percentage of the wealth could be lost.
Also keep track of any transactions in the accounts to determine if
someone has issued a 51% attack on  the system.
If your account is affected, report the suspicious transaction(s) to
the company that the wallet is made with.
[I think that we don't have an explanation anywhere in the tutorial
about what a wallet is.]
