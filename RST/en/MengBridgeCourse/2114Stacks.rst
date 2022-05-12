.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Stacks
======

Objectives
----------

Upon completion of this module, students will be able to:

* Describe the Stack Abstract Data Type/Data Structure and the characteristics of a Stack
* Implement Stacks in Java using an Array-Based or Linked-Chain approach
* Develop and use Stack methods
* Test the functionality of Stack
* Evaluate a range of applications / use cases to determine if use of the Stack Data Structure is appropriate

Suggested Reading
~~~~~~~~~~~~~~~~~

Chapters 5 - 6 Bags from  `Data Structures and Abstractions with Java, 4th edition  by Frank M. Carrano and Timothy Henry <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_

Introduction to Stacks
----------------------

[11:32] Introduction to Stacks
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. admonition:: The Stack Interface

   .. code-block:: java
   
      package stack;
      
      /**
       * An interface for the ADT stack.
       * 
       * @author Frank M. Carrano
       * @author Timothy M. Henry
       * @author maellis1
       * @version May 2020 
       */
      public interface StackInterface<T> {
          /**
           * Adds a new entry to the top of this stack.
           * 
           * @param newEntry
           *            An object to be added to the stack.
           */
          public void push(T newEntry);
      
          /**
           * Removes and returns this stack's top entry.
           * 
           * @return The object at the top of the stack.
           * @throws stack.EmptyStackException
           *             if the stack is empty before the operation.
           */
          public T pop();
      
          /**
           * Retrieves this stack's top entry.
           * 
           * @return The object at the top of the stack.
           * @throws stack.EmptyStackException
           *             if the stack is empty.
           */
          public T peek();
      
          /**
           * Detects whether this stack is empty.
           * 
           * @return True if the stack is empty.
           */
          public boolean isEmpty();
      
          /** Removes all entries from this stack. */
          public void clear();
      } // end StackInterface
   
   Download `StackInterface.java <https://courses.cs.vt.edu/~cs2114/meng-bridge/examples/StackInterface.java>`_ (right-click to download as .java file).
  
  
.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_2th5gshg&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_arppdfzb" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.5.2-StacksIntro.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.5.2-StacksIntro</img>
   </a>
   
Checkpoint 1
------------

.. avembed:: Exercises/MengBridgeCourse/StacksCheckpoint1Summ.html ka
   :long_name: Checkpoint 1


StackIntroVideoMemory Example
-----------------------------

[6:25] Stack Memory Example
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_0ahaxauj&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_0huh39kf" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


Checkpoint 2
------------

.. avembed:: Exercises/MengBridgeCourse/StacksCheckpoint2Summ.html ka
   :long_name: Checkpoint 2


Stacks Array-Based Design
-------------------------

[4:57] Array-Based Design
~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_zvh51gzm&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_27lecgi4" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


Checkpoint 3
------------

.. avembed:: Exercises/MengBridgeCourse/StacksCheckpoint3Summ.html ka
   :long_name: Checkpoint 3

Stacks Array Implementation
---------------------------

[5:57] Array Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_k40xld68&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_00ne9adm" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>

.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.5.8.1-StacksArrayImplementation.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.5.8.1-StacksArrayImplementation.pdf</img>
   </a>
   

Stacks Linked Chain Implementation
----------------------------------

[12:50] Linked Chain Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_miuoo412&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_mhb5tzhu" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


.. raw:: html

   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.5.9.1-StacksLinkedChainImplementation.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.5.9.1-StacksLinkedChainImplementation.pdf</img>
   </a>
   <br>
   <a href="https://courses.cs.vt.edu/~cs2114/meng-bridge/course-notes/8.5.9.1-TestingStacks.pdf" target="_blank">
   <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
   Video Slides 8.5.9.1-TestingStacks.pdf</img>
   </a>

Checkpoint 4
------------

.. avembed:: Exercises/MengBridgeCourse/StacksCheckpoint4Summ.html ka
   :long_name: Checkpoint 4


Programming Practice: LinkedStacks
----------------------------------

.. extrtoolembed:: 'Programming Practice: LinkedStacks'
   :workout_id: 1912
