.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

===================
Recommender Systems
===================

Recommender Systems: Explicit
-----------------------------

.. revealjs-slide::

* Recommender systems are everywhere!

  * Youtube videos to recommend videos
  * Spotify, etc, to recommend music
  * Amazon to recommend books, other products
  * IMDB to recommend movies, TV shows
  * News items to read/watch

* Those are all examples of situations where you are explicitly,
  knowingly providing information so that you can get recommendations.


Recommender Systems: Not So Explicit
------------------------------------

.. revealjs-slide::

* Recommender systems are everywhere!

  * Pretty much any website with ads
  * Facebook, Instagram, Tiktok, etc to recommend content


How They Work
-------------

.. revealjs-slide::

.. revealjs-fragments::

  * You already know the basics from Project 1.

  .. revealjs-fragments::

    #. Collect information about your preferences.

       * Explicitly (ask for ratings)
       * Implicitly (watch your behavior -- where you go, how long you
         look at things, what you "like" or otherwise comment on).

    #. Compare that to other people for
       similarities/opposites. (Collaborative Filtering)

       * Or possibly compare to yourself for things that get positive
         vs. negative response.

    #. Give you "recommendations" based on the matches.

       * Broadly speaking... ads are "recommendations" too

  * Of course, these are all far more sophisticated in real systems.
  

What Could Go Wrong?
--------------------

.. revealjs-slide::

* Shouldn't it always be a positive to get recommendations on things
  that you would like to see, buy, etc?

* Better that than stuff you are not interested in, right?


What Could Go Wrong?
--------------------

.. revealjs-slide::

.. revealjs-fragments::

   * Pretty much by definition, a recommender system is trying to affect
     your behavior.

   * That can be good when its under your control. If you want a book or
     a song, then it has to be good to have recommendations for things
     that you would like, right?

   * Nearly always, the company has goals that benefit the company, with
     little regard for whether they benefit you.

     * Some companies are more ethical about that aspect than others.
  
   * Possibly your goals and the goals of the company doing the
     recommendation align... but that is more by happy coincidence.


What Could Those Goals Be?
--------------------------

.. revealjs-slide::

* For many commercial sites, the primary goal is to maintain use of
  the site.

  * Shopping sites want you to buy stuff.

  * Social Media sites pretty universally attempt to keep users
    attentive while they serve them ads.

    * Serving the ads is what makes their money for them.


What could go wrong?
--------------------

.. revealjs-slide::

* Addiction

* Information Bubbles

* Misinformation

* Financial loss

  * Shopping and gambling additions

* Loss of privacy

* User profiling/stereotyping
  

Social Media
------------

* Lots of stuff gets posted to social media

.. revealjs-fragments::

  * The companies complain that they can't track it all.

  * But the issue is not what gets posted. The issue is what gets
    recommended.

  * The goal of a social media site is to keep you engaged.

    * Regardless of benefit to you, or not.
    * Provocative stuff keeps people engaged.
    * Often that is content that might be considered inappropriate for
      whatever reason.

