.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Data Types
==========
Variables can store data of different types, and different types can do different things.
**Python has the following data types built-in by default, in these categories:**
   
  * Text Type:	str
  * Numeric Types:	int, float, complex
  * Sequence Types:	list, tuple, range
  * Mapping Type:	dict
  * Set Types:	set, frozenset
  * Boolean Type:	bool
  * Binary Types:	bytes, bytearray, memoryview
**Setting the Data Type** 
   * In Python, the data type is set when you assign a value to a variable:
      =================================                ========= 
      Example                                          Data Type                                                              
      =================================                =========
      x = "Hello World"                                str                                     
      x = 20                                           int                                          
      x = 20.5                                         float                                         
      x = 1j                                           complex
      x = ["apple", "banana", "cherry"]                list  
      x = ("apple", "banana", "cherry")                tuple 
      x = range(6)                                     range
      x = {"name" : "John", "age" : 36}                dict
      x = {"apple", "banana", "cherry"}                set
      x = True                                         bool                                                                 
      =================================                =========

Numbers
-------
**There are three numeric types in Python:**

 * int
 * float
 * complex
**Example**
::
   x = 1    # int
   y = 2.8  # float
   z = 1j   # complex

**Type Conversion**
You can convert from one type to another with the **int(), float(), and complex()** methods:
::
   x = 1    # int
   y = 2.8  # float
   z = 1j   # complex

   #convert from int to float:
   a = float(x)
   #convert from float to int:
   b = int(y)
   #convert from int to complex:
   c = complex(x)

 
Strings
-------
Strings in python are surrounded by either single quotation marks, or double quotation marks.
'hello' is the same as "hello".
You can display a string literal with the **print()** function:
**Multiline Strings**
* You can assign a multiline string to a variable by using three quotes:
::
   a = """Lorem ipsum dolor sit amet,
          consectetur adipiscing elit,
         sed do eiusmod tempor incididunt
         ut labore et dolore magna aliqua."""
          print(a)

**Strings are Arrays**
* Like many other popular programming languages, strings in Python are arrays of bytes representing unicode characters.
* However, Python does not have a character data type, a single character is simply a string with a length of 1.
* Square brackets can be used to access elements of the string.
::
   a = "Hello, World!"
   print(a[1])

**String Length:**
To get the length of a string, use the **len()** function.
::
   a = "Hello, World!"
   print(len(a))

**Check String:**
* To check if a certain phrase or character is present in a string, we can use the keyword **in**.
::
   txt = "The best things in life are free!"
   print("free" in txt)

**Check If Not:**
* To check if a certain phrase or character is NOT present in a string, we can use the keyword **not in**.
::
   txt = "The best things in life are free!"
   print("expensive" not in txt)

String Methods
~~~~~~~~~~~~~~
* **indexing:**
    * string as an ordered sequence Each element in Sequence can be assessed an index represented by the array of numbers:
    *  use indexes to start the slice from the begin of the string
    **Example:**
      ::
         b = "Hello, World!"
         print(b[7:9])
         output: Wo

* **negative indexing:**
    * Use negative indexes to start the slice from the end of the string
    **Example:**
      ::
         b = "Hello, World!"
         print(b[-5:-2])
         output: orl
*  **String are immutable:**
       * Use negative indexes to start the slice from the end of the string
    **Example:**
      ::
         b = "Hello, World!"
         print(b[3]=2)
         output: error 'str' object doesn't support item assignment
* **Slicing:**
    * You can return a range of characters by using the slice syntax.
    * Specify the start index and the end index, separated by a colon, to return a part of the string
    **Example:**
       Get the characters from position 2 to position 5 (not included):
       ::
         b = "Hello, World!"
         print(b[2:5])
         output:
      **Note:** The first character has index **0**
   **Slice From the Start**
       * By leaving out the start index, the range will start at the first character:
       **Example:**
       * Get the characters from the start to position 5 (not included):
       ::
         b = "Hello, World!"
         print(b[:5])  

   **Slice From the end**
       * By leaving out the end index, the range will go to the end:
       **Example:**
       * Get the characters from position 2, and all the way to the end:
       ::
         b = "Hello, World!"
         print(b[2:])  
   
* **Stride:**
    * We can also input stride alue as follows , with the '2' indicating that are selecting **every second variable**
     **Example**
     ::
       X = "Ahmed"
       print(b[::2])   ##Get every second element on index 0,2,4 
       output: Amd
     ::
       X = "Hello World"
       print(b[0:8:2])   ##Get every second element on from index 0 to 7
       output:Hlo W
       
* **String Concatenate:**
    * To concatenate, or combine, two strings you can use the + operator.
     **Example**
     Merge variable a with variable b into variable c:
     ::
       a = "Hello"
       b = "World"
       c = a + b
       print(c) 
    * To replicate values of string we simply multiply the string by the number of times we would like to replicate it.
     **Example**
         Merge variable a with variable b into variable c:
         ::
          3*"Micheal Jackson"
       
.. inlineav:: StringMethods ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/StringMethods.css 
   :scripts: AV/BIO/StringMethods.js
   :output: show

**Modify Strings:**
  * Python has a set of built-in methods that you can use on strings:
     **Upper Case:**
      * The **upper()** method returns the string in upper case:
         ::
            a = "Hello, World!" 
            print(a.upper()) ## HELLO, WORLD!
      **lower Case:**
       * The **lower()** method returns the string in upper case:
       ::
          a = "Hello, World!" 
           ## hello, world!
      **Replace String:**
       * The **replace()** method replaces a string with another string:
       ::
          a = "Hello, World!" 
          print(a.replace("H", "J")) ## Jello, World!
      **Split String:**
       * The **split()** method returns a list where the text between the specified separator becomes the list items.
       ::
          a = "Hello, World!"
          print(a.split(",")) # returns ['Hello', ' World!']


       

.. inlineav:: StringOperations ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/StringOperations.css 
   :scripts: AV/BIO/StringOperations.js
   :output: show



Exercise
~~~~~~~~
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: Suffix ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/StringOperations.css 
   :scripts: AV/BIO/StringOperations.js
   :output: show

List
----
* Lists are used to store multiple items in a single variable.
* Lists are one of 4 built-in data types in Python used to store collections of data, the other 3 are Tuple, Set, and Dictionary, all with different qualities and usage.
* Lists are created using square brackets:
::
  thislist = ["blue", "white", "black"]

**List Items**
    * List items are ordered, changeable, and allow duplicate values.
    * List items are indexed, the first item has index [0], the second item has index [1] etc.

**Ordered**
    *  When we say that lists are ordered, it means that the items have a defined order, and that order will not change.
    * If you add new items to a list, the new items will be placed at the end of the list.

**Changeable**
    The list is changeable, meaning that we can change, add, and remove items in a list after it has been created.
**A list can contain different data types:**
::
   A list with strings, integers and boolean values:
   list1 = ["abc", 34, True, 40, "male"]
**The list() Constructor**
   It is also possible to use **the list()** constructor when creating a new list.
   ::
     thislist = list(("apple", "banana", "cherry")) # note the double round-brackets
     print(thislist)
List Operations
~~~~~~~~~~~~~~~
**Change List Items**
    **Change Item Value**
       To change the value of a specific item, refer to **the index number**:
       ::
        thislist = list(("apple", "banana", "cherry")) # note the double round-brackets
        print(thislist)
    **Change a Range of Item Values**
       To change the value of items within a specific range, define a list with the new values, and refer to the range of index numbers where you want to insert the new values:
       ::
        thislist = ["apple", "banana", "cherry", "orange", "kiwi", "mango"]
        thislist[1:3] = ["blackcurrant", "watermelon"] 
        print(thislist) ##['apple', 'blackcurrant', 'watermelon', 'orange', 'kiwi', 'mango']
    **Change Item Value**
      If you insert more items than you replace, the new items will be inserted where you specified, and the remaining items will move accordingly:
    **Change the second value by replacing it with two new values:**
       ::
        thislist = ["apple", "banana", "cherry"]
        thislist[1:2] = ["blackcurrant", "watermelon"]
        print(thislist)  ## ['apple', 'blackcurrant', 'watermelon', 'cherry']
    **Note:** The length of the list will change when the number of items inserted does not match the number of items replaced.
       If you insert less items than you replace, the new items will be inserted where you specified, and the remaining items will move accordingly:
    **Change the second and third value by replacing it with one value:**
       ::
        thislist = ["apple", "banana", "cherry"]
        thislist[1:3] = ["watermelon"]
        print(thislist)  ## ['apple', 'watermelon']
**Add List Items**
    **Insert Items**
       To insert a new list item, without replacing any of the existing values, we can use the **insert() method**.
       The **insert()** method inserts an item at **the specified index**
       ::
        thislist = ["apple", "banana", "cherry"]
        thislist.insert(2, "watermelon") 
        print(thislist) ##['apple', 'banana', 'watermelon', 'cherry']
   **Note:** As a result of the example above, the list will now contain 4 items.
    **Append Items**
       To add an item to the end of the list, use **the append()** method:
       Using the **append()** method to append an item:
       ::
        thislist = ["apple", "banana", "cherry"]
        a=["orange","Vegetables"]
        thislist.append(a) 
        print(thislist) ##['apple', 'banana', 'cherry', ["orange","Vegetables"]]
    **Extend List**
       To append elements from another list to the current list, use the **extend()** method:
       Add the elements of y to thislist:
       ::
        thislist = ["apple", "banana", "cherry"]
        y = ["mango", "pineapple", "papaya"]
        thislist.extend(y) 
        print(thislist) ##['apple', 'banana', 'cherry', 'mango', 'pineapple', 'papaya']
**Remove List Items**
    **Remove Specified Item**
       The **remove()** method removes the specified item.
       ::
        thislist = ["apple", "banana", "cherry"]
        thislist.remove("banana") 
        print(thislist) ##["apple","cherry"]
   **Note:** As a result of the example above, the list will now contain 4 items.
    **Remove Specified Index**
       The **pop()** method removes the specified index:
       Remove the second item by many functions:
       ::
        thislist = ["apple", "banana", "cherry"]
        thislist.pop(1) 
        del thislist[1]

        print(thislist) ##["apple","cherry"]
       **The del keyword can also delete the list completely**
       Delete the entire list:
       ::
        thislist = ["apple", "banana", "cherry"]
        del thislist  
       
   **Clear the List**
     The clear() method empties the list.
     The list still remains, but it has no content.
     ::
      thislist = ["apple", "banana", "cherry"]
      thislist.clear()

This is a visualization for Suffix Tree

.. inlineav:: ListOperations ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/ListOperations.css 
   :scripts: AV/BIO/ListOperations.js
   :output: show
**Copy and Clone:**
You cannot copy a list simply by typing list2 = list1, because: list2 will only be a reference to list1, and changes made in list1 will automatically also be made in list2.
**Shallow copy**: set one varaible B equal to A ; Both A and B are referencing the Same list in memory **(Copy By reference)**
     ::
      list1 = [50, "Ahmed", 200]
      list2=list1
      list1[1]="Omar"
      list1
      list2
      output:
      [50, "Omar", 200]
      [50, "Omar", 200]
**Deep copy**: Variable B references a new copy or clone of orginial list **(Copy By Value)** its demonstrated by following code
     ::
      list1 = [50, "Ahmed", 200]
      list2=list1[:]
      ##or using Copy Function
      list2=list1.copy()
      
.. _shallowdeepFig:

.. inlineav:: CopyandClone2 dgm
   :links: AV/BIO/CopyandClone2.css
   :scripts: AV/BIO/CopyandClone2.js
   :align: center

.. inlineav:: CopyandClone ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/CopyandClone.css 
   :scripts: AV/BIO/CopyandClone.js
   :output: show

Exercise
~~~~~~~~
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree


Dictionary
----------
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: Dictionary ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Dictionary.css 
   :scripts: AV/BIO/Dictionary.js
   :output: show

Dictionary Operations
~~~~~~~~~~~~~~~~~~~~~
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: DictionaryOperations ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/DictionaryOperations.css 
   :scripts: AV/BIO/DictionaryOperations.js
   :output: show

Tuple
-----
* Sets are used to store multiple items in a single variable.
* Set is one of 4 built-in data types in Python used to store collections of data, the other 3 are List, Tuple, and Dictionary, all with different qualities and usage.
* A set is a collection which is unordered, unchangeable*, and unindexed.
* **Note:** Set items are **unchangeable**, but you can **remove items and add new items**
It is also possible to use **the set() constructor** to make a set.
::
   thisset = set(("apple", "banana", "cherry")) # note the double round-brackets



This is a visualization for Suffix Tree

.. inlineav:: Tuple ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/Tuple.css 
   :scripts: AV/BIO/Tuple.js
   :output: show

Tuple Operations
~~~~~~~~~~~~~~~~
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: TupleOperations ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/TupleOperations.css 
   :scripts: AV/BIO/TupleOperations.js
   :output: show

Nest Tuple
~~~~~~~~~~
A suffix tree is a tree data structure typically used to store a list of strings. It is also referred to as the compressed version of a trie, as, unlike a trie, each unique suffix in the list is compressed together and represented by a single node or branch in a suffix tree.
There are many ways to construct a suffix tree, but the semantics that is shared by most if not all types of suffix trees are as follows:
•	Build a generalized suffix tree for T_1 and T_2.
•	Annotate each internal node in the tree with whether that node has at least one leaf node from each of T_1 and T_2
•	Run a depth-first search over the tree to find the marked node with the highest string depth.
Properties of a Suffix Tree
Each tree edge is labeled by a substring of S
Each internal node has at least 2 children
.Each S(i) has its corresponding labeled path from root to a leaf, for 1 <i <n
There are n leaves
No edges branching out from the same internal node can start with the same character

Usage
The application of suffix trees is diverse and inter-disciplinary in nature.
In Computational Biology, suffix trees are widely used to identify the repeating structures in a DNA molecule. Similarly, it may be used to find the longest common sub-string or sub-sequence in a DNA sequence. These techniques are vital to the study of evolution and to trace similarities between organisms.
Moreover, in Forensic Science, it is crucial to make sure that DNA samples are not contaminated. Using suffix trees, analysts can verify if a given DNA sequence is contaminated or not!



This is a visualization for Suffix Tree

.. inlineav:: NestTuple ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/NestTuple.css 
   :scripts: AV/BIO/NestTuple.js
   :output: show

Set
---
* Sets are used to store multiple items in a single variable.
* Set is one of 4 built-in data types in Python used to store collections of data, the other 3 are List, Tuple, and Dictionary, all with different qualities and usage.
* A set is a collection which is unordered, unchangeable*, and unindexed.
**Note:** Set items are **unchangeable**, but you can **remove items and add new items**
          Sets are **unordered**, so you cannot be sure in which **order the items will appear**

**The set() Constructor**
It is also possible to use **the set() constructor** to make a set.
::
   thisset = set(("apple", "banana", "cherry")) # note the double round-brackets



Set Operations
~~~~~~~~~~~~~~
**Add Items**
* Once a set is created, you cannot change its items, but you can add new items.
** To add one item to a set use the **add()** method.
::
   thisset = {"apple", "banana", "cherry"}
   thisset.add("orange")

**Remove Item**
To remove an item in a set, use the **remove()**, or the **discard()** method.
**Note:**  If the item to remove does not exist, discard() will NOT raise an error.
           If the item to remove does not exist, remove() will raise an error.

::
   thisset = {"apple", "banana", "cherry"}
   thisset.remove("orange")
   thisset.discard("orange")
**Join Two Sets**
   * There are several ways to join two or more sets in Python.
   * You can use the **union()** method that returns a new set containing all items from both sets, or the **update()** method that inserts all the items from one set into another:
::

   set1 = {"a", "b" , "c"}
   set2 = {1, 2, 3}
   set3 = set1.union(set2)
   print(set3)

The update() method inserts the items in set2 into set1:
:: 
   set1 = {"a", "b" , "c"}
   set2 = {1, 2, 3}
   set1.update(set2) 
   print(set1)

**Keep ONLY the Duplicates in 2 Sets**
* The **intersection()** method will return a new set, that only contains the items that are present in both sets.
* The **intersection_update()** method will keep only the items that are present in both sets.
::
   x = {"apple", "banana", "cherry"}
   y = {"google", "microsoft", "apple"}
   z = x.intersection(y)
   x.intersection_update(y)
   print(x)
   print(z)
   output:
   {'apple'}
   {'apple'}
**Note**:Both functions return same output  
**Keep All, But NOT the Duplicates**
* The **symmetric_difference()** method will return a new set, that contains only the elements that are NOT present in both sets.
* The **smmetric_difference_update()** method will keep only the elements that are NOT present in both sets.
::
   x = {"apple", "banana", "cherry"}
   y = {"google", "microsoft", "apple"}
   z = x.symmetric_difference(y)
   x.symmetric_difference_update(y)
   print(x)
   print(z)
   output:
   {'google', 'banana', 'microsoft', 'cherry'}
   {'google', 'banana', 'microsoft', 'cherry'}

**Note**:Both functions return same output  
This is a visualization for Suffix Tree

.. inlineav:: SetOperations ss
   :long_name: DNA Sequencing example Slideshow
   :links: AV/BIO/SetOperations.css 
   :scripts: AV/BIO/SetOperations.js
   :output: show
