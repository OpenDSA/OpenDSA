.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

Variables
=========

Variables are containers for storing data values.
**creating Variables**
 * Python has no command for declaring a variable.
 * A variable is created the moment you first assign a value to it.
**Example**
::
   x = 5
   print(x)
   
**Variables do not need to be declared with any particular type, and can even change type after they have been set.**
::
    x = 4       # x is of type int
    x = "Ahmed" # x is now of type str
    print(x)
 
**Casting:**
If you want to specify the data type of a variable, this can be done with casting.
::
   x = str(5)    # x will be '5'
   y = int(5)    # y will be 5
   z = float(5)  # z will be 5.0  

**Get the Type**
You can get the data type of a variable with the **type() function**
::
    x = 5
    y = "Ahmed"
    print(type(x))
    print(type(y))
**Single or Double Quotes:**
String variables can be declared either by using single or double quotes:
::
   x = "John"
   # is the same as
   x = 'John'

**Case-Sensitive:**
Variable names are case-sensitive.
::
   y = 4
   Y = "Sally"
   #Y will not overwrite y
