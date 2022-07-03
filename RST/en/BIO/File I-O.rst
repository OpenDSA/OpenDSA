.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Bio_Batch2
   :satisfies: DNASeq
   :topic: DNASeq

File Handling
=============

File handling is an important part of any web application.
Python has several functions for creating, reading, updating, and deleting files

The key function for working with files in Python is **the open() function**.
**The open() function** takes two parameters; **filename** and **mode**

**There are four different methods (modes) for opening a file:**
     ======           ================================================================================= 
     Method           Meaning                                                              
     ======           ================================================================================= 
     "r"              Read - Default value. Opens a file for reading, error if the file does not exist.                                     
     "a"              Append - Opens a file for appending, creates the file if it does not exist.                                           
     "w"              Write - Opens a file for writing, creates the file if it does not exist.                                         
     "x"              Create - Creates the specified file, returns an error if the file exists.                                                                 
     ======           =================================================================================  

**In addition you can specify if the file should be handled as binary or text mode**
   ======           ===================================
   Method           Meaning                                                              
   ======           ===================================
   "t"              Text - Default value. Text mode.                                     
   "b"              Binary - Binary mode (e.g. images).                                                                                                           
   ======           ===================================



**Syntax**
To open a file for reading it is enough to specify the name of the file:
::

  f = open("demofile.txt")


**The code above is the same as:**
::

  f = open("demofile.txt",, "rt")

Because "r" for read, and "t" for text are the default values, you do not need to specify them.

This is a visualization for File I/O


Read Files
---------


Assume we have the following file, located in the same folder as Python:

.. topic:: Example
   **demofile.txt**
   Hello! Welcome to demofile.txt
   This file is for testing purposes.
   Good Luck! 

To open the file, use the built-in **open() function**.

The **open() function** returns a file object, which has **a read() method** for reading the content of the file:
::
   f = open("demofile.txt", "r")
   print(f.read())

If the file is located in a different location, you will have to specify the file path, like this:
::
   f = open("D:\\myfiles\welcome.txt", "r")
   print(f.read())


**Read Only Parts of the File**
By default **the read() method** returns the whole text, but you can also specify how many characters you want to return:
::
   f = open("demofile.txt", "r")
   print(f.read(5))

above output Return the 5 first characters of the file
  
**Read Lines**
You can return one line by using the readline() method:
::
   f = open("demofile.txt", "r")
   print(f.readline())

**By calling readline() two times, you can read the two first lines:**
::
   f = open("demofile.txt", "r")
   print(f.readline())
   print(f.readline())

By looping through the lines of the file, you can read the whole file, line by line:
::
   f = open("demofile.txt", "r")
      for x in f:
        print(x)

**Close Files:**
  It is a good practice to always close the file when you are done with it.
  Close the file when you are finish with it:
  ::
     f = open("demofile.txt", "r")
     print(f.readline())
     f.close()
**Note:** You should always close your files, in some cases, due to buffering, changes made to a file may not show until you close the file.


Write Files
-----------
To write to an existing file, you must add a parameter to **the open() function:**
   * "a" - Append - will append to the end of the file
   * "w" - Write - will overwrite any existing content

**Open the file "demofile2.txt" and append content to the file:**
::
  f = open("demofile2.txt", "a")
  f.write("Now the file has more content!")
  f.close()

  #open and read the file after the appending:
  f = open("demofile2.txt", "r")
  print(f.read())
**Open the file "demofile3.txt" and overwrite the content:**
::
  f = open("demofile3.txt", "w")
  f.write("Woops! I have deleted the content!")
  f.close()

  #open and read the file after the appending:
  f = open("demofile3.txt", "r")
  print(f.read())

**Note: the "w" method will overwrite the entire file.**

**Create a New File:**
 To create a new file in Python, use **the open() method**, with one of the following parameters:
 ::
    f = open("myfile.txt", "x")
Result: a new empty file is created!

Delete Files
------------
 To delete a file, you must import **the OS module**, and run its **os.remove() function:**
 Remove the file "demofile.txt":
 ::
    import os
    os.remove("demofile.txt")

Check if File exist:
::
   import os
   if os.path.exists("demofile.txt"):
      os.remove("demofile.txt")
   else:
      print("The file does not exist")

**Delete Folder:**
  To delete an entire folder, use the **os.rmdir() method:**
  
  Remove the folder "myfolder":
  ::  
    import os
    os.rmdir("myfolder")

