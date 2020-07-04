.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: Deterministic Pushdown Automata Grammars
   :satisfies: CFL Pumping Lemma
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Pumping Lemma for CFL
=====================

.. slide:: Which of these is a CFL?

   | Which of the following languages are CFL?
   |    :math:`L = \{a^nb^nc^j \mid 0 < n\le j\}`
   |
   |    :math:`L = \{a^nb^ja^nb^j \mid n>0, j>0\}`
   |
   |    :math:`L = \{a^nb^ja^kb^p \mid n+j \le k+p, n>0, j>0, k>0, p>0 \}`
   |
   |    :math:`L = \{a^nb^ja^jb^n \mid n>0, j>0\}`

   .. Answers: No, No, Yes, Yes


.. slide:: Pumping Lemma: Regular Languages

   | Let :math:`L` be an infinite regular language. 
   | Then there exists a constant :math:`m > 0` such that any
     :math:`w \in L` with :math:`|w| \ge m` can be decomposed into three
     parts as :math:`w=xyz` with:
   |   :math:`|xy| \le m`
   |   :math:`|y| \ge 1`
   |   :math:`xy^iz \in L` for all :math:`i\ge 0`

   With this pumping lemma, we were able to show that :math:`a^nb^n`
   is not a regular language.


.. slide:: Pumping Lemma for CFLs: Intuition

   Suppose a variable repeats, such as:
   :math:`A \stackrel{*}{\Rightarrow} vAy`,
   with :math:`A \stackrel{*}{\Rightarrow} x`.

   The derived string will then contain the substring :math:`vxy`.
   There will also be strings in the language that contain substrings
   :math:`x, vvxyy, vvvxyyy...`

   A little more complicated because there can be two "pumped" parts
   (in equal measure of pumped-ness).


.. slide:: Pumping Lemma for CFLs

   | Let :math:`L` be any infinite CFL.
   | Then exists a constant :math:`m` (depending only on :math:`L`),
     such that for every string :math:`w \in L`, 
     with :math:`|w| \ge m`, we may partition :math:`w = uvxyz` such that:
   |    :math:`|vxy| \le m`, (limit on size of substring)
   |    :math:`|vy| \ge 1`,  (:math:`v` and :math:`y` not both empty)
   | for all :math:`i \ge 0, uv^ixy^iz \in L`

   
.. slide:: Proof Sketch (1)

   There is a CFG :math:`G` such that :math:`L = L(G)`.

   Consider the parse tree of a long string in :math:`L`.

   For any long string, some nonterminal :math:`N` must appear twice in
   the path.

   .. odsafig:: Images/lt8ptree1.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt8ptree1

            
.. slide:: Proof Sketch (2)

   | :math:`N \stackrel{*}{\Rightarrow} vNy` and
     :math:`N \stackrel{*}{\Rightarrow} x`. 
   | :math:`S \stackrel{*}{\Rightarrow} uNz \stackrel{*}{\Rightarrow} uvNyz 
     \stackrel{*}{\Rightarrow} uvxyz`
   | By repeating the :math:`v` and :math:`y` subtrees, get 
     :math:`N \stackrel{*}{\Rightarrow} v^iNy^i \stackrel{*}{\Rightarrow} v^ixy^i`.

   .. odsafig:: Images/lt8ptree2.png
      :width: 400
      :align: center
      :capalign: justify
      :figwidth: 90%
      :alt: lt8ptree2

   << How does this work for grammar :math:`S \rightarrow aSb | ab`? >>


.. slide:: Proof Example Problem

   Consider :math:`L = \{a^nb^nc^n: n\ge 1\}`.

   Why would we want to recognize the language
   :math:`\{a^nb^nc^n: n\ge 1\}`?
 
   Recognize underlined words:
 
   :math:`\underline{word}` is stored as
   :math:`word\beta\beta\beta\beta\ \_\ \_\ \_\ \_`
   where :math:`\beta` represents a backspace. 

   Unfortunately, :math:`L` is not a CFL.

.. slide:: Proof (1)

   | Assume :math:`L` is a CFL and apply the pumping lemma.
   | Let :math:`m` be the constant in the pumping lemma and consider 
     :math:`w = a^mb^mc^m`.
     Note :math:`|w|\ge m`.
   | Show there is no division of :math:`w` into :math:`uvxyz` such
     that :math:`|vy|\ge 1`, :math:`|vxy|\le m`, and
     :math:`uv^ixy^iz \in L` for :math:`i = 0, 1, 2, \ldots`.
   |
   | **Case 1:** Neither :math:`v` nor :math:`y` can contain 2 or more
     distinct symbols.
     If :math:`v` contains a's and b's,
     then :math:`uv^2xy^2z \notin L` since there will be b's
     before a's.
   | Thus, :math:`v` and :math:`y` can be only a's,
     b's, or c's (not mixed). 


.. slide:: Proof (2)

   | **Case 2:** :math:`v = a^{t_1}`, then :math:`y = a^{t_2}`
     or :math:`b^{t_3}`, :math:`(|vxy| \le m)`
   | If :math:`y = a^{t_2}`,
     then :math:`uv^2xy^2z = a^{m+t_1+t_2}b^mc^m \notin L` since 
     :math:`t_1 + t_2 > 0, n(a) > n(b)` (number of a's is
     greater than number of b's) 
   | If :math:`y = b^{t_3}`, then
     :math:`uv^2xy^2z = a^{m+t_1}b^{m+t_3}c^m \notin L`
     since :math:`t_1 + t_3 > 0`, either :math:`n(a) > n(c)` or
     :math:`n(b) > n(c)`.
   |
   | **Case 3:** :math:`v = b^{t_1}`, then :math:`y = b^{t_2}` or :math:`c^{t_3}`.
   | If :math:`y = b^{t_2}`, then :math:`uv^2xy^2z = a^mb^{m+t_1+t_2}c^m \notin L` 
     since :math:`t_1 + t_2 > 0, n(b) > n(a)`. 
   | If :math:`y = c^{t_3}`, then
     :math:`uv^2xy^2z = a^mb^{m+t_1}c^{m+t_3} \notin L` 
     since :math:`t_1 + t_3 > 0`, either :math:`n(b) > n(a)` or
     :math:`n(c) > n(a)`.


.. slide:: Proof (3)
           
   | **Case 4:** :math:`v = c^{t_1}`, then :math:`y = c^{t_2}`.
   | Then, :math:`uv^2xy^2z = a^mb^mc^{m+t_1+t_2} \notin L`
     since :math:`t_1 + t_2 > 0, n(c) > n(a)`.
   |
   | Thus, there is no breakdown of :math:`w` into :math:`uvxyz` such
     that :math:`|vy| \ge 1`, :math:`|vxy| \le m` and for all
     :math:`i\ge 0`, :math:`uv^ixy^iz` is in :math:`L`.
   | This is a contradiction, thus, :math:`L` is not a CFL.


.. slide:: Adversary Version (1)

   | Adversary picks some value for :math:`m`.
   | We pick the string :math:`w = a^mb^mc^m`.
   | Adversary picks the breakdown for :math:`w = uvxyz`.
     Adversary has (bad) choices:
   |    :math:`vxy` are all a's, or all b's, or all c's.
   |       This cannot be pumped.
   |    :math:`vxy` has either :math:`v` or :math:`y` a mix of letters
   |       This cannot be pumped.
   |    :math:`vy` has between them an equal number of a's, b's, and c's.
   |       This is too long.


.. slide:: Adversary Version (2)

   | Note that both :math:`v` and :math:`y` are pumped the same number
     of times.
   | If the adversary could pick them with this in mind,
     then the string might be pumpable.
   |    For example, if :math:`v = a^k` and :math:`y = b^kc^k`.
   | But the length restriction kicks in to prevent that.


.. slide:: (Try to) Prove a CFL not a CFL

   What if we try to prove that :math:`L = a^nb^n` is not context free,
   by using the pumping lemma?

   Pick :math:`w = a^mb^m`.

   Adversary picks :math:`v = a^k` and :math:`y = b^k`.

   Of course, this does not prove that :math:`L` is context free.
   Just that we failed to disprove this with the pumping lemma (that
   is a good thing).


.. slide:: Example

   Prove that :math:`L = \left\{ ww \mid w \in \{a, b\}^* \right\}` is
   not a CFL.

   Consider the string :math:`w = a^mb^ma^mb^m`.

   | No matter how the adversary picks :math:`vxy`, it is not pumpable.


.. slide:: Example

   Prove that :math:`L \left\{ a^{n!} \mid n \geq 0 \right\}` is not a
   CFL.

   | We pick :math:`w = a^{m!}`.
   | Obviously, any decomposition is of the form :math:`v = a^k`,
     :math:`y = a^l`.
   | This is not pumpable.
