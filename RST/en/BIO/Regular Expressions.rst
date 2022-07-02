.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Regular Expressions
   :topic: Regular Expressions


Regular Expressions
===================

Regular Expressions, also known as “regex” or “regexp”, are used to match strings of text such as particular characters, words, or patterns of characters. It means that we can match and extract any string pattern from the text with the help of regular expressions. 


The Python module re provides full support for Perl-like regular expressions in Python. The re module raises the exception re.error if an error occurs while compiling or using a regular expression.


Definition and Examples of Regular Expressions
----------------------------------------------

.. inlineav:: RegExFS ff
   :links: AV/PIFLA/Regular/RegExFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RegExFS.js
   :output: show

When run, produces the following output::

  'test1' does not equal 'test2'.
  'test1' is an Object.

**Definition** for Regular Expressions (RE): Given :math:`\Sigma`,
  #. :math:`\lambda`, and :math:`a \in \Sigma` are RE
  #. If :math:`r` and :math:`s` are regular expressions, then


      * Regular expressions are particularly useful for defining filters.
      * Regular expressions contain a series of characters that define a pattern of text to be matched—to make a filter more specialized, or general.
   

            
Regular Expression For Bioinformatics
-------------------------------------
**The most common functions of regular expressions are:** 

      * Search a string (search and match)
      * Finding a string (findall)
      * Break string into sub strings (split)
      * Replace part of a string (sub)


.. inlineav:: RE ss
   :links: AV/BIO/RE.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/BIO/RE.js
   :output: show

**What are the most commonly used operators?**



.. inlineav:: RE_2 ss
   :links: AV/BIO/RE_2.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/BIO/RE_2.js
   :output: show

**why we use regular expressions in bioinformatics?**

      * Given a DNA sequence, what is the length of the poly-A tail?
      * Given a gene accession name, extract the part between the third charcter and the underscore
      * Given a protein sequence, determine if it contains this highly redundant domain motif
      
   

.. inlineav:: RE_3 ss
   :links: AV/BIO/RE_3.css
   :scripts: AV/BIO/RE_3.js
   :output: show

**Character sets in regular expressions:**   

+------------------+------------------------------------------------------------------------------------------------+
|   Pattern        |          Matches                                                                               |
+==================+================================================================================================+
|   [ACTG]         | one DNA base character                                                                         |
+------------------+------------------------------------------------------------------------------------------------+
|   AT?AA          | AAA or ATAA only                                                                               |
+------------------+------------------------------------------------------------------------------------------------+
|   A+             | One or more A                                                                                  |
+------------------+------------------------------------------------------------------------------------------------+
|   [GC]*          | Zero or more GC or CG (in any combination)                                                     |
+------------------+------------------------------------------------------------------------------------------------+
|   CC[TCAG]{2}GG  | CC, followed by ant two DNA bases, followed by GG                                              |
+------------------+------------------------------------------------------------------------------------------------+
|   (TA){3,8}      | Between three and eight repetitions of TA                                                      |
+------------------+------------------------------------------------------------------------------------------------+


|

.. inlineav:: RE_4 ss
   :links: AV/BIO/RE_4.css
   :scripts: AV/BIO/RE_4.js
   :output: show


            
