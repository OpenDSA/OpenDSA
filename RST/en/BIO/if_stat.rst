.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

if_statplot
===========

**Python supports the usual logical conditions from mathematics:**

   * Equals: a == b
   * Not Equals: a != b
   * Less than: a < b
   * Less than or equal to: a <= b
   * Greater than: a > b
   * Greater than or equal to: a >= b




  **Else**

  The else keyword catches anything which isn't caught by the preceding conditions.

.. inlineav:: if_stat ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/if_stat.css 
   :scripts: AV/BIO/if_stat.js
   :output: show



**This technique is known as Ternary Operators, or Conditional Expressions.**

You can also have multiple else statements on the same line:

**Example**

One line if else statement, with 3 conditions:

When run, produces the following output::

   a = 330 
   b = 330
   print("A") if a > b else print("=") if a == b else print("B") 



**Nested If**

You can have if statements inside if statements, this is called nested if statements.
n_if
----
  
.. inlineav:: n_if ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/n_if.css 
   :scripts: AV/BIO/n_if.js
   :output: show