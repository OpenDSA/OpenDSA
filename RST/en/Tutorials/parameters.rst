.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires: Commmand line
   :satisfies: Command line parameters
   :topic: 

==============================================
Parsing Command Line Parameters In Your Progam
==============================================

Parameters In Programming
-------------------------

Alright I get the idea of parameters for a function, that's easy enough. But
how does a Program itself have parameters? This comes in the Main function that
every Java program has. Consider this the "launch" function. Usually the "main"
function is named Main and takes an array of strings as its parameter
(see below).

::

   public static void main(String[] args)


So when you launch the command from the terminal it passes in an array of all 
the additional information (and it usually trims white space). So if I run

.. odsafig:: Images/parameterexample.png
   :width: 500
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: ls with paramaters 


Then args is an array containing::

   {"-l", "file.txt"}

\*Authors Note: This is true for Java, but is a little different for C or C++.
In C, the first parameter that you are given is always the command name so 
your array in C would be::

   {"ls", "-l", "file.txt"}

Java however, removes the command name and only provides parameters.

I have created a main function skeleton for you to use in your projects. It is 
set up simply and makes use of switch cases. You can |external_link1|.
Let's see how it works.

.. |external_link1| raw:: html

   <a href="http://pastebin.com/gwSH2cEa" target="_blank">download it</a>


.. codeinclude:: Java/Tutorials/MainParameters.java

We have our main function take an array of Strings (named args). If that array
is empty then we may or may not want to exit as we have no parameters. It will
then progress into a while loop that iterates through all parameters. The syntax
of this loop is useful as it does not lock parameters into any fixed order. You
can invoke them anyway you wish. The switch case statement allows you to easily
write for any parameter and add a case for unrecognized parameters by using the
default case for any non matching parameters. In this example I choose to exit
after printing the unrecognized string. In the future you may wish to change
this to something else. You can learn more about |external_link2|.
It is also important to note that this function will possibly throw an exception
or behave in an unexpected way if you use "-f" but do not give a file name. For
example you call the program with {"-f", "-v"}, this will set the filename to -v.
Or if you call the program with {"-f"}, you will get an exception for trying to
access outside the array bounds. You can prevent this by using a try catch, but
for simplicity's sake I chose to make example very simple. Once you have your
parameters set, you can call the appropriate methods to launch your program.
There you go simple command line parsing!

.. |external_link2| raw:: html

   <a href="http://docs.oracle.com/javase/tutorial/java/nutsandbolts/switch.html" target="_blank">switch statements</a>
