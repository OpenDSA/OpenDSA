.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Queues
======

Objectives
----------

Upon completion of this module, students will be able to:

* Name the function and purpose of basic Java data structures
* State key characteristics of Bags in Java
* Build and populate Bags in Java

Suggested Reading
~~~~~~~~~~~~~~~~~

Chapter 10: Queues, Deques, and Priority Queues & Chapter 11: Queue, Deque, and Priority Queue Implementations from <https://www.amazon.com/Data-Structures-Abstractions-Java-4th/dp/0133744051/ref=sr_1_1?ie=UTF8&qid=1433699101&sr=8-1&keywords=Data+Structures+and+Abstractions+with+Java>`_ by Frank M. Carrano and Timothy Henry

Queues
------

[8:50] Queue Intro Video
~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_1km1xhtz&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_nsebnv6t" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="QueueIntro.pptx">
   </a>

.. code-block:: java

    package queue;

    /**
       An interface for the ADT queue.
       @author Frank M. Carrano
       @author Timothy M. Henry
       @version 4.0
    */
    public interface QueueInterface
    {
      /** Adds a new entry to the back of this queue.
          @param newEntry  An object to be added. */
      public void enqueue(T newEntry);

      /** Removes and returns the entry at the front of this queue.
          @return  The object at the front of the queue.
          @throws  EmptyQueueException if the queue is empty before the operation. */
      public T dequeue();

      /**  Retrieves the entry at the front of this queue.
          @return  The object at the front of the queue.
          @throws  EmptyQueueException if the queue is empty. */
      public T getFront();

      /** Detects whether this queue is empty.
          @return  True if the queue is empty, or false otherwise. */
      public boolean isEmpty();

      /** Removes all entries from this queue. */
      public void clear();
    } // end QueueInterface



Checkpoint 1
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[11:29] Linked Queue Video
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_nf3l8nvv&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_r7z7575f" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="LinkedQueuesEnqueue.pptx">
   </a>


Checkpoint 2
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[8:41] Linked Queue Remove Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_5m4m3con&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_sdpyr72c" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>




TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="LinkedQueueRemove.pptx">
   </a>

Checkpoint 3
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


Deques
------

[13:51] Deque Intro Video
~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_vj6hwbnk&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_aykxb4f3" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>




TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="DequeIntro.pptx">
   </a>

asdf

Deque Interface
"""""""""""""""

.. code-block:: java

    package deque;

    /**
     * An interface for the ADT deque.
     *
     * @author Frank M. Carrano
     * @author Timothy M. Henry
     * @version 4.0
     * @param  generic type for the deque
     */
    public interface DequeInterface
    {
        /**
         * Adds a new entry to the front of this dequeue.
         *
         * @param newEntry
         *            An object to be added.
         */
        public void addToFront(T newEntry);

        /**
         * Adds a new entry to the back of this dequeue.
         *
         * @param newEntry
         *            An object to be added.
         */
        public void addToBack(T newEntry);

        /**
         * Removes and returns the front entry of this dequeue.
         *
         * @return The object at the front of the dequeue.
         * @throws EmptyDequeException
         *             if the dequeue is empty before the operation.
         */
        public T removeFront();

        /**
         * Removes and returns the back entry of this dequeue.
         *
         * @return The object at the back of the dequeue.
         * @throws EmptyDequeException
         *             if the dequeue is empty before the operation.
         */
        public T removeBack();

        /**
         * Retrieves the front entry of this dequeue.
         *
         * @return The object at the front of the dequeue.
         * @throws EmptyDequeException
         *             if the dequeue is empty before the operation.
         */
        public T getFront();

        /**
         * Retrieves the back entry of this dequeue.
         *
         * @return The object at the back of the dequeue.
         * @throws EmptyDequeException
         *             if the dequeue is empty before the operation.
         */
        public T getBack();

        /**
         * Detects whether this dequeue is empty.
         *
         * @return True if the queue is empty, or false otherwise.
         */
        public boolean isEmpty();

        /**
         * Removes all entries from this dequeue.
         */
        public void clear();
    } // end DequeInterface


[9:02] Deque Removing and Wrap Up Video Demonstration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_c94y4y06&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_3t2edwrz" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>




TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="DequeRemoveAndWrapUp.pptx">
   </a>


Checkpoint 5
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable



Array Implementation of Queues
------------------------------

[15:58] ArrayQueue Intro Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_schlfeex&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_zvueuqo7" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>




TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ArrayQueueIntro.ppt">
   </a>


Checkpoint 6
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable

[7:11] ArrayQueue One Unused Location Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_299igb5h&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_pxydj6s7" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>




TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ArrayQueueRemove.ppt">
   </a>


Checkpoint 7
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[14:06] ArrayQueue Ensure Capacity Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_xkijc49b&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_fz7mhpc2" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ArrayQueueEnsureCapacity.ppt">
   </a>

Checkpoint 7
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable



[6:59] ArrayQueue WrapUp Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_8ktqd0d5&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_7lenjuii" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ArrayQueueWrapUp.ppt">
   </a>

Empty Queue Exception
"""""""""""""""""""""

.. code-block:: java

    package queue;

    /**
    * A class of runtime exceptions thrown by methods to indicate that a queue is
    * empty.
    *
    * @author Frank M. Carrano
    * @author Timothy M. Henry
    * @version 4.0
    */

    public class EmptyQueueException extends RuntimeException {
        /**
         * serial Version UID
         */
        private static final long serialVersionUID = 960025440830878197L;

        public EmptyQueueException() {
            this(null);
        } // end default constructor

        public EmptyQueueException(String message) {
            super(message);
        } // end constructor
    } // end EmptyQueueException
