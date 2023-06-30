.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Lists
=====

Overview & Objectives
---------------------

Upon completion of this module, students will be able to:

* Distinguish properties and use cases for a list from other ADT(stack, queues, bags)
* Implement lists in java  using an Array-Based or Linked-Chain approach
* Consider various design approaches and corresponding efficiency
* Trace and debug list implementations

List Introduction
-----------------


[13:41] Introduction to Lists
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_vyiwnixx&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_0jv0oelt" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.2.1-ListIntro.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.2.1-ListIntro.pdf</img>
   </a>

The List Interface
~~~~~~~~~~~~~~~~~~

.. admonition:: The List Interface

  .. code-block:: java
  
      package list;
  
      /**
       * An interface for the ADT list. Entries in a list have positions that begin
       * with 0
       *
       * @author Frank M. Carrano
       * @author Timothy M. Henry
       * @author maellis1
       * @version Aug 2020
       */
      public interface ListInterface {
          /**
           * Adds a new entry to the end of this list. Entries currently in the list
           * are unaffected. The list's size is increased by 1.
           *
           * @param newEntry
           *            The object to be added as a new entry.
           */
          public void add(T newEntry);
  
          /**
           * Adds a new entry at a specified position within this list. Entries
           * originally at and above the specified position are at the next higher
           * position within the list. The list's size is increased by 1.
           *
           * @param newPosition
           *            An integer that specifies the desired position of the new
           *            entry.
           * @param newEntry
           *            The object to be added as a new entry.
           * @throws IndexOutOfBoundsException
           *             if either newPosition less than 0 or newPosition greater than
           *             getLength().
           */
          public void add(int newPosition, T newEntry);
  
          /**
           * Removes the entry at a given position from this list. Entries originally
           * at positions higher than the given position are at the next lower
           * position within the list, and the list's size is decreased by 1.
           *
           * @param givenPosition
           *            An integer that indicates the position of the entry to be
           *            removed.
           * @return A reference to the removed entry.
           * @throws IndexOutOfBoundsException
           *             if either givenPosition less than 0 or givenPosition greater
           *             than or equal to getLength().
           */
          public T remove(int givenPosition);
  
          /** Removes all entries from this list. */
          public void clear();
  
          /**
           * Replaces the entry at a given position in this list.
           *
           * @param givenPosition
           *            An integer that indicates the position of the entry to be
           *            replaced.
           * @param newEntry
           *            The object that will replace the entry at the position
           *            givenPosition.
           * @return The original entry that was replaced.
           * @throws IndexOutOfBoundsException
           *             if either givenPosition less than 0 or givenPosition greater
           *             than or equal to getLength().
           */
          public T replace(int givenPosition, T newEntry);
  
          /**
           * Retrieves the entry at a given position in this list.
           *
           * @param givenPosition
           *            An integer that indicates the position of the desired entry.
           * @return A reference to the indicated entry.
           * @throws IndexOutOfBoundsException
           *             if either givenPosition less than 0 or givenPosition greater
           *             than getLength().
           */
          public T getEntry(int givenPosition);
  
          /**
           * Retrieves all entries that are in this list in the order in which they
           * occur in the list.
           *
           * @return A newly allocated array of all the entries in the list. If the
           *         list is empty, the returned array is empty.
           */
          public Object[] toArray();
  
          /**
           * Sees whether this list contains a given entry.
           *
           * @param anEntry
           *            The object that is the desired entry.
           * @return True if the list contains anEntry, or false if not.
           */
          public boolean contains(T anEntry);
  
          /**
           * Gets the length of this list.
           *
           * @return The integer number of entries currently in the list.
           */
          public int getLength();
  
          /**
           * Sees whether this list is empty.
           *
           * @return True if the list is empty, or false if not.
           */
          public boolean isEmpty();
      } // end ListInterface

    
  Download `ListInterface.java <https://courses.cs.vt.edu/~cs2114/meng-bridge/examples/ListInterface.java>`_ (right-click to download as .java file).
      


Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


LinkedList Add Implementation
-----------------------------

[10:21] LinkedList Add() Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_ie408z9b&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_766d88pa" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.3.1-LinkedListAdd.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.3.1-LinkedListAdd.pdf</img>
   </a>


Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


Tracing Add with Debugger
-------------------------

[13:33] Tracing Add with Debugger
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_g1bdzwhy&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_9z4vgj5t" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.4.1-TraceAddDebugger.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.4.1-TraceAddDebugger.pdf</img>
   </a>
   
LinkedList Remove
-----------------

LinkedList Example Code
~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: Try It Yourself
   
  In Eclipse, use the *Project > Download Assignment...* menu command to download the exercise project named "ex11.01-LinkedList". 
  
  Refer to `01.02: Lab: LightBot for Beginners <https://profdev-lms.tlos.vt.edu/courses/2832/assignments/10634>`_ if you need to review the instructions for downloading Eclipse projects.

[18:09] LinkedList Remove
~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_m5thdypn&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_1drka8kv" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.5.1-LinkedListRemove.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.5.1-LinkedListRemove.pdf</img>
   </a>


Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

Programming Practice: Lists 1
-----------------------------

.. extrtoolembed:: 'Programming Practice: Lists 1'
   :workout_id: 1922

Considering and Array Implementation of a List
----------------------------------------------

[10:19] LinkedList Details and Options
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_a1ubm9cw&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.7.1-LinkedListMoreDetails.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.7.1-LinkedListMoreDetails.pdf</img>
   </a>


Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/ListsCheckpoint4Summ.html ka
   :long_name: Checkpoint 4


Considering an Array Implementation of a List
---------------------------------------------

[15:48] Array List
~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_wahujuxt&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_gmobb3rs" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/11.1.8.1-ArrayListImplementation.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 11.1.8.1-ArrayListImplementation.pdf</img>
   </a>

Programming Practice: Lists 2
-----------------------------

.. extrtoolembed:: 'Programming Practice: Lists 2'
   :workout_id: 1923
