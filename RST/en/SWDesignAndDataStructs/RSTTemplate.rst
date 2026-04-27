.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. Title with equal signs as the underline
.. Make sure the header and underline match length

Template/RST Tutorial
=====================

This is a first level subheading
--------------------------------


This is a second level subheading, using tildes as underline
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Links
-----
This is an external link `The displayed link text goes here <https://vt.edu>`_

Note the trailing underscore. That is important. 

If you want to have the links open in another window, you need to use raw html:

.. raw:: html
    
    <a href="https://vt.edu" target="_blank">Link to open in new tab</a>
    
    
It is also possible to link to :doc:`another doc in the project </ContentStyleIntro>`


Text blocks, lengths and new paragraphs
---------------------------------------

Text can be either soft or hard wrapped. Typically, we use 80 columns for hard breaks. 
This line starts after about 80 chars. Note there is isn't a new paragraph.
Soft wraps are more convenient when copying content from another source. This line is about 240 chars and wraps at screen width in my editor. If you want to start a new paragraph, put a blank line after the last line in the paragraph.

Here is the start of a new paragraph.

If you want to emphasize something in text, you can use the `admonition` directive

.. admonition:: Title goes here

    The admonition text goes here...
    

Inserting an image
------------------

The `odsafig` directive loads an image. The image should live in the `/RST/Images` directory

.. odsafig:: Images/2114BagInterfaceClassDiagram.png
   :align: center



Images in exercises
~~~~~~~~~~~~~~~~~~~~

java file example 
 .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/examples/ArrayBasics.java"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/icons8-java60.png" alt=""  width="32" height="32">
      ArrayBasics.java</img>
      </a>  (right click-> save link as...) (won't auto-download from external domain)

slides

 .. raw:: html

      <a href="https://courses.cs.vt.edu/cs2114/SWDesignAndDataStructs/course-notes/ProgrammingBinarySearchTrees.pdf"  target="_blank">
      <img src="https://courses.cs.vt.edu/cs2114/opendsa/icons/projector-screen.png" alt="" width="32" height="32">
      ProgrammingBinarySearchTrees.pdf</img>
      </a>

Some issues with imgaes in ka - need to troublshoot and describes

images in checkpoint questions go in subdirecotries under Exercises folder




Code
----

Code can be highlighted inline or as blocks. 

To highlight inline, ``wrap the code with 2 back ticks``.

For code blocks, use the  code-block directive. You can add the language as param to the directive:

.. code-block:: java

   package bag;
   /**
   An interface that describes the operations of a bag of objects.
   A bag is an unordered collection of objects of a particular types.
   Duplicates are allowed.
   @author Frank M. Carrano
   @author Timothy M. Henry
   @author Margaret Ellis
   @version April 2020
   */
   
   public interface BagInterface<T>
   {
   /** Gets the current number of entries in this bag.
      @return  The integer number of entries currently in the bag. */
      public int getCurrentSize();

   /** Sees whether this bag is empty.
      @return  True if the bag is empty, or false if not. */
      public boolean isEmpty();

   } // end BagInterface

.. admonition:: Code can also go in an admonition if you want to call it out.

    .. code-block:: java
    
       package bag;
       /**
       An interface that describes the operations of a bag of objects.
       A bag is an unordered collection of objects of a particular types.
       Duplicates are allowed.
       @author Frank M. Carrano
       @author Timothy M. Henry
       @author Margaret Ellis
       @version April 2020
       */
       public interface BagInterface<T>
       {
       /** Gets the current number of entries in this bag.
          @return  The integer number of entries currently in the bag. */
       public int getCurrentSize();
    
       /** Sees whether this bag is empty.
          @return  True if the bag is empty, or false if not. */
       public boolean isEmpty();
    
    
       } // end BagInterface


Bullet lists
------------

Bulleted lists start with a * or - in column one. sublists can start with * or -, but indented. 

* Item 1
   - subitem 1
* Item 2
* Item 3
   - subitem 1
   - subitem 2


Numbered lists
--------------

Numbered lists start with a #. and can have sublists within them

#. Item 1
   * subitem 1
#. Item 2
#. Item 3
   - subitem 1
   - subitem 2


[7:28] Videos need to be loaded as an Iframe using raw html
-----------------------------------------------------------

This code can be reused for any kaltura video, so long as the `entry_id` = is updated. The kaltura videos look like `1_kn4272o0`, and always start with a `1_`

.. raw:: html

    
     <center>
     <h2>Older kaltura player</h2>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_kn4272o0&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_6l3oa8sc" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


     
     <center>
       <h2>New kaltura player</h2>
       <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_kn4272o0' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0" title="Videos need to be loaded as an Iframe using raw html"></iframe> 
    </center>


KA Exercises
------------

.. avembed:: Exercises/SWDesignAndDataStructs/BagsCheckpoint1Summ.html ka
   :long_name: Title for the exercise



CodeWorkout Exercises (add as a workout)
----------------------------------------

.. code-block::
    
    .. extrtoolembed:: 'Title for the Workout'
        :workout_id: 1910



Adding a table
~~~~~~~~~~~~~~

.. list-table:: Table Caption (appears above the table)
   :header-rows: 1

   * - Column 1 Header
     - Column 2 Header
     - Column 3 Header
   * - Row 1 Column 1
     - Row 1 Column 2
     - Row 1 Column 3
   * - Row 2 Column 1
     - Row 2 Column 2
     - Row 2 Column 3




admonitions for interactivity before Videos
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: Follow Along and Engage

    Download the slides corresponding to the video. Take notes on them as you watch the video, practice drawing diagrams yourself!


.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the corresponding project from the video on your own in eclipse. The project CS2-Support is required for the sample project.  It is also used in your course projects. To download the CS2-Support you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."


.. admonition:: Follow Along, Practice and Explore

    Download to run and explore the java file (see below) from the video on your own in eclipse. You may download the standalone \*.java file for this example. To run the standalone \*.java file you will need to 
        1) create a new Eclipse project, then 
        2) create a package within the project called “example” (the package named at the top of the class MUST match the package the file is placed in within the Eclipse project), and finally 
        3) download and import the standalone \*.java file(s) to the created package.



in ka questions
~~~~~~~~~~~~~~~
<img src="TreesCheckpointImages/BinaryTreeTraversal.png" alt="complete tree with nodes ABCDEFG in level order" width="300" height="200">
            <br>




