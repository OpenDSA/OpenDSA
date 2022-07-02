.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Dictionary
==========
**Python dictionary** is an unordered collection of items. Each item of a dictionary has a key/value pair.

Dictionaries are optimized to retrieve values when the key is known.

**Creating Python Dictionary**

Creating a dictionary is as simple as placing items inside curly braces {} separated by commas.

* An item has a key and a corresponding value that is expressed as a pair (key: value).

* While the values can be of any data type and can repeat, keys must be of immutable type (string, number or tuple with immutable elements) and must be unique.


This how we insert value in the Dictionary::

  "name": "DNA",
  "sugar": "deoxyribose",
  "bases": 4
   }
  
  
**Dictionary Items**

* Dictionary items are ordered, changeable, and does not allow duplicates.

* Dictionary items are presented in key:value pairs, and can be referred to by using the key name.
This how we insert value in the Dictionary::

  thisdict =	{
  "name": "DNA",
  "sugar": "deoxyribose",
  "bases": 4
   }
  print(thisdict["brand"])



This is the Output::

 Ford

**Dictionary Length**

* To determine how many items a dictionary has, use the len() function:
This how we get the length of dictionary::

  thisdict =	{
  "name": "DNA",
  "sugar": "deoxyribose",
  "bases": 4
   }
  print(len(thisdict))

This is the Output the length of dictionary::

 3

The list of the values is a view of the dictionary, meaning that any changes done to the dictionary will be reflected in the values list.

.. inlineav:: Dictionary ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Dictionary.css 
   :scripts: AV/BIO/Dictionary.js
   :output: show

**Why do we need dictionaries?**

As a dictionary, keeps the elements in key-value mapping format and internally uses hashing for it; therefore, we can get a value from the dictionary by its key very quickly. In best cases, its complexity is O(1), whereas, in the worst case, its complexity can be O(n).

If you want to know more about hashing check this article –> What is Hashing and Hash Table?

**Changing and Adding Dictionary elements**

Dictionaries are mutable. We can add new items or change the value of existing items using an assignment operator.

If the key is already present, then the existing value gets updated. In case the key is not present, a new (key: value) pair is added to the dictionary.

**Dictionary Items - Data Types**

The values in dictionary items can be of <b>any data type

This how we use different Data Types::

  thisdict =	{
  "name": "DNA",
  "sugar": "deoxyribose",
  "bases": 4
  "U base" false
   }
**Nested Dictionaries**

A dictionary can contain dictionaries, this is called nested dictionaries.

**Example**
Create a dictionary that contain three dictionaries:

.. inlineav:: dic2 ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/dic2.css 
   :scripts: AV/BIO/dic2.js
   :output: show
