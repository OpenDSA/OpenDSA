.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies: Regular Expressions
   :topic: Regular Expressions


Regular Expressions
===================

The :term:`Regular Expression` (also known as RegEx or RE) is another
way to define a language.
They are used a lot by practicing programmers for things like defining
simple search patterns.
This adds another way to define languages along with the ones that we
already know: Grammars, DFAs and NFAs.
Or, we could just describe the language using an English description.
Why do we need another one?

The problem with an English description (or any other language that
people speak) is that it is too imprecise, and not something that we
can easily implement.
Using a DFA or NFA typically requires some sort of graphical
editor, and it takes a bit of time to enter all the states and
transitions.
We will see that regular expressions are easy to type, and they
tend to use relatively short descriptions for common languages that we
want to represent.
Of course, even a relatively small and precise specification for a
language can be hard to come up with (or to understand).
But at least with a regular expression, it is usually quick and easy
to type once you have it.


Definition and Examples of Regular Expressions
----------------------------------------------

.. inlineav:: RegExFS ff
   :links: AV/PIFLA/Regular/RegExFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/Regular/RegExFS.js
   :output: show

**Definition** for Regular Expressions (RE): Given :math:`\Sigma`,
  #. :math:`\lambda`, and all :math:`a \in \Sigma` are RE
  #. If :math:`r` and :math:`s` are regular expressions, then

      * :math:`r + s` is a RE
      * :math:`r s` is a RE
      * :math:`(r)` is a RE
      * :math:`r^*` is a RE
  #. :math:`r` is a RE if and only if it can be derived from (1) with
     a finite number of applications of (2). 

As we will prove soon, regular expressions don't give us any more
power than we already had with DFAs.
But they are often easier to write down, as you will see in the
following exercises.
