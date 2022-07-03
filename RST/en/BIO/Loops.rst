.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Loops
=====
**In** computer programming, a **loop** is a sequence of instructions that is continually repeated until a certain condition is reached. **Typically**, a certain process is done, such as getting an item of data and changing it, and then some condition is checked such as whether a counter has reached a prescribed number. If it hasn't, the next instruction in the sequence is an instruction to return to the first instruction in the sequence and repeat the sequence. If the condition has been reached, the next instruction "falls through" to the next sequential instruction or branches outside the loop. A loop is a fundamental programming idea that is commonly used in writing programs.

* **Definition:** Loops are a programming element that repeat a portion of code a set number of times until the desired process is complete. 
Repetitive tasks are common in programming, and loops are essential to save time and minimize errors.

* **Real Life Example:** We talked about ordering the steps correctly to make one PB and J. What if we need to make 500 peanut butter and jelly sandwiches for a school field trip? Instead of having to do the same, monotonous steps over and over again, we would likely prefer to just do it once and have it automatically repeated until 500 sandwiches were made.

* **Why We Use Loops:** Loops make code more manageable and organized. As we learn more about programming and writing complex programs, loops will be an important element to understand and use.

An infinite loop is one that lacks a functioning exit routine . 

The result is that the loop repeats continually until the operating system senses it and terminates the program with an error or until some other event occurs (such as having the program automatically terminate after a certain duration of time).

For Loop
--------
A **for** loop is used for iterating over a sequence (that is either a list, a tuple, a dictionary, a set, or a string).

This is less like the for keyword in other programming languages, and works more like an iterator method as found in other object-orientated programming languages.

With the for loop we can execute a set of statements, once for each item in a list, tuple, set etc.

.. inlineav:: forloop ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/forloop.css 
   :scripts: AV/BIO/forloop.js
   :output: show

|      • The for loop does not require an indexing variable to set beforehand.

While Loop
----------
     A **while loop** is a control flow statement that allows code to be executed repeatedly based on a given Boolean condition. The while loop can be thought of as a repeating if statement.[1]

.. inlineav:: whileloop ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/whileloop.css 
   :scripts: AV/BIO/whileloop.js
   :output: show
   