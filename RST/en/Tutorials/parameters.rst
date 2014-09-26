.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: 
   :satisfies: 
   :topic: 

==============================================
Parsing Command Line Parameters In Your Progam
==============================================
Parameters In Programming
-------------------------
Alright I get the idea of parameters, that's easy enough. Now how do I move 
forward to actually making use of them in my program? Well luckily for you 
parameters are an old idea in programming and the usage of them is very well 
documented. The first thing needed is a function you can designate as the Main 
function. Consider this the "launch" function. Usually the "main" function is 
named Main and takes an array of strings as its parameter (see below).

.. odsafig:: Images/mainskeleton.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Image 1

   Image 1

So when you launch the command from the terminal it passes in an array of all 
the additional information (and it usually trims white space). So if I run

.. odsafig:: Images/parameterexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Image 2

   Image 2

I receive an array containing

::

	{"-l", "file.txt"}

*\*Authors Note: I am stating this as if this is a Java terminal and not C 
style. In C the first parameter you are given is always the command name so 
your array in C would be {"ls", "-l", "file.txt"}. Java however, removes the 
command name and only provides parameters.*

I have created a main function skeleton for you to use in your projects. It is 
set up simply and makes use of switch cases. You can download it 
`here <http://pastebin.com/gwSH2cEa>`__. Given the provided source code let's 
do a simple analysis of how it works.

.. codeinclude:: Java/Tutorials/Main.java

We have our main function which takes an array of strings. If that array is 
empty we may or may not want to exit as we have no parameters. It will then 
progress into a while loop that iterates through all parameters. The syntax of 
this loop is useful as it does not lock parameters into any fixed order. You 
can invoke them anyway you wish. The switch case statement allows you to easily 
write for any parameter and add a case for unrecognized parameters by using the 
default case for any non matching parameters. In this example I choose to exit 
printing the unrecognized string. In the future you may wish to change this to 
something else. Switch case statements are fairly standard, but if you wish to 
review them you may do so 
`here <http://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html>`__.
 It is also important to note that this function will possibly throw an 
exception or behave in an unexpected way if you use "-f" but do not give a file
 name. For example you call the program with {"-f", "-v"}, this will set the 
filename to -v. Or if you call the program with {"-f"}, you will get an 
exception for trying to access outside the array bounds. You can prevent this by
 using a try catch, but for simplicity's sake I chose to make this very simple.
 Once you have your parameters set you can write the code to launch your 
program. There you go simple command line parsing!
