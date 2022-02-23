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


[13:41] List Introduction Video
-------------------------------

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_vyiwnixx&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_0jv0oelt" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ListIntro.ppt">
   </a>


The List Interface
~~~~~~~~~~~~~~~~~~

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




Checkpoint 1
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable




[10:21] LinkedList Add Implementation Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_ie408z9b&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_766d88pa" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="LinkedListAdd.pptx">
   </a>


Checkpoint 2
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[13:33] Tracing Add with Debugger Video
---------------------------------------

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_g1bdzwhy&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_9z4vgj5t" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="TraceAddDebugger.pptx">
   </a>


List Implementation Details
---------------------------

[18:09] LinkedList Remove Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_m5thdypn&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_1drka8kv" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="LinkedListRemove.pptx">
   </a>


TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="CS2-ExLinkedList.zip">
   </a>


Checkpoint 3
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[10:19] LinkedList Details and Options Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_a1ubm9cw&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="LinkedListMoreDetails.pptx">
   </a>

asdf
Checkpoint 4
~~~~~~~~~~~~

.. avembed:: Exercises/MengBridgeCourse/BlankQuizSumm.html ka
   :long_name: Quiz Unavailable


[15:48] Array List Video
~~~~~~~~~~~~~~~~~~~~~~~~

.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_wahujuxt&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_gmobb3rs" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>



TODO: fix URLS.

.. raw:: html

   <a href="" download>
   <img src="" alt="ArrayListImplementation.pptx">
   </a>
