.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly




Objectives
----------

* Declare variables and instantiate objects that are generic types and take a type parameter
* Trace code that demonstrates the use of both generics and inheritance
* Design and write a generic class
* Write and use generic methods
* Assess the software engineering benefits of using generic methods
* Assess the benefits and possible tradeoffs of using generic types vs Object type

**Suggested Reading:**  *Java Interlude 1 Generics from Data Structures and Abstractions with Java, 4th edition by Frank M. Carrano and Timothy Henry* 


Generics Intro
------------------



[9:50] Generics Intro Video
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
.. admonition:: Interactive: Follow Along, Practice and Explore

      Download Generics 1 Sample Code to run in the Java OOP Module sample project.  The project CS-GraphWindowLib is required for the sample project. To download the CS-GraphWindowLib you must first complete the configuration steps for your first lab. You will then be able to download it via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment..."

   .. raw:: html

      <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/CS2-ExGenerics1.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
     CS2-ExGenerics1.zip</img>
      </a>

   .. raw:: html

      <a href="https://courses.cs.vt.edu/~cs2114/SWDesignAndDataStructs/CS2-ExJavaOOP.zip"  target="_blank">
      <img src="https://courses.cs.vt.edu/~cs2114/meng-bridge/images/projector-screen.png" width="32" height="32">
      CS2-ExJavaOOP.zip</img>
      </a>



.. raw:: html

     <center>
     <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_2n5x6cp3&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_ootb9ij8" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
     </center>


Notice for a generic class, such as Pair, javadocs are needed for the generic parameter!



Checkpoint 1
------------

.. avembed:: Exercises/SWDesignAndDataStructs/Generics1Checkpoint1Summ.html ka
   :long_name: Checkpoint 1