.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires:
   :satisfies: Regular Expressions
   :topic: Finite Automata

Regular Expressions
===================

Regular Expressions
-------------------

Regular expressions are a way to specify a set of strings that define
a language.

There are three operators that can be used:

* :math:`+` union (or)
* :math:`\circ` concatenation (AND)
* :math:`*` star-closure (repeat 0 or more times)

.. note::

   Is this true?: The AND operator is not strictly necessary, in that it is
   possible to define all regular expressions without it.
   What did Susan mean by saying that AND can be omitted?

Example:

   :math:`(a + b)^* \circ a \circ (a + b)^* = (a + b)^*a(a + b)^*`

   .. note::

      Strings over :math:`Sigma^*` that contain at least one
      :math:`a`.

   :math:`(aa)*`

   .. note::

      Strings with an even number of :math:`a` 's

**Definition:** Given :math:`\Sigma`,

#. :math:`\empty`, :math:`\lambda`, and :math:`a \in \Sigma` are R.E.
#. If :math:`r` and :math:`s` are R.E. then
   * :math:`r + s` is R.E.
   * :math:`r \circ s` is R.E.
   * :math:`(r)` is R.E.
   * :math:`r^*` is R.E.
#. :math:`r` is a R.E iff it can be derived from (1) with a finite
   number of applications of (2).

**Definition:** :math:`L(r) =` language denoted by R.E. :math:`r`.

#. :math:`\empty`, :math:`\{\lambda\}`, and :math:`\{a \in \Sigma\}`
   are languages denoted by a R.E.
#. If :math:`r` and :math:`s` are R.E. then
   * :math:`L(r + s) = L(r) \cup L(s)`
   * :math:`r \circ s = L(r) \circ L(s)`
   * :math:`L((r)) = L(r)`
   * :math:`L((r)^*) = (L(r)^*)


Precedence Rules
~~~~~~~~~~~~~~~~

* :math:`*` highest
* :math:`\circ`
* :math:`+` lowest

Example: :math:`ab^* + c = (a(b)^*) + c`

Examples
~~~~~~~~

#. :math:`\Sigma = \{a,b\}`,
   :math:`\{w \in {\Sigma}^{*} \mid w`
   has an odd number of :math:`a` 's followed by an even number of
   :math:`b` 's :math:`\}`.

   :math:`(aa)^{*}a(bb)^{*}`



#. :math:`\Sigma=\{a,b\}`, :math:`\{w \in {\Sigma}^{*} \mid w` has no more than
   three :math:`a` 's and must end in :math:`ab$$\}`.

   :math:`b^{*}(ab^{*} + ab^{*}ab^{*} + \lambda)ab`

#. Regular expression for positive and negative integers

   :math:`0 + (- + \lambda)((1+2+\ldots +9)(0+1+2+\ldots +9)^{*})`

   What is acceptable, and not acceptable? 


Regular Expressions vs. Regular Languages
-----------------------------------------


Any regular language can be defined using a regular expression.
(Remember that a regular language is any language that has a finite
acceptor.)
