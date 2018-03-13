.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Deterministic Pushdown Automata Grammars
   :satisfies: CFL Pumping Lemma
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Properties of Context-Free Languages 
====================================

.. slide:: Which of these is a CFL?

   | Which of the following languages are CFL?
   |    :math:`L = \{a^nb^nc^j \mid 0 < n\le j\}`
     .. No
   |    :math:`L = \{a^nb^ja^nb^j \mid n>0, j>0\}`
     .. No
   |    :math:`L = \{a^nb^ja^kb^p \mid n+j \le k+p, n>0, j>0, k>0, p>0 \}`
     .. Yes
   |    :math:`L = \{a^nb^ja^jb^n \mid n>0, j>0\}`
     .. Yes


.. slide:: Pumping Lemma for Regular Languages

   | Let :math:`L` be a regular language,
     then there is a constant :math:`m` such that :math:`w\in L`,
     :math:`|w|\ge m`, :math:`w = xyz` such that 
   |    :math:`|xy| \le m`
   |    :math:`|y| \ge 1`
   | for all :math:`i\ge 0, xy^iz \in L`

   We were able to show that :math:`a^nb^n` is not a regular language. 


.. slide:: Pumping Lemma for CFLs

   | Let :math:`L` be any infinite CFL.
   | Then there is a constant :math:`m` depending only on :math:`L`,
     such that for every string :math:`w` in :math:`L`, 
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


.. slide:: Proof Example Problem

   Consider :math:`L = \{a^nb^nc^n: n\ge 1\}`.
   Show :math:`L` is not a CFL.

   Why would we want to recognize a language of the type
   :math:`\{a^nb^nc^n: n\ge 1\}`?
 
   Recognize underlined words:
 
   :math:`\underline{word}` is stored as
   :math:`word\beta\beta\beta\beta\ \_\ \_\ \_\ \_`
   where :math:`\beta` represents a backspace. 


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
     If :math:`v` contains :math:`a` 's and :math:`b` 's,
     then :math:`uv^2xy^2z \notin L` since there will be :math:`b` 's
     before :math:`a` 's.
   | Thus, :math:`v` and :math:`y` can be only :math:`a` 's,
     :math:`b` 's, or :math:`c` 's (not mixed). 


.. slide:: Proof (2)

   | **Case 2:** :math:`v = a^{t_1}`, then :math:`y = a^{t_2}`
     or :math:`b^{t_3} (|vxy| \le m)`
   | If :math:`y = a^{t_2}`,
     then :math:`uv^2xy^2z = a^{m+t_1+t_2}b^mc^m \notin L` since 
     :math:`t_1 + t_2 > 0, n(a) > n(b)` (number of :math:`a` 's is
     greater than number of :math:`b` 's) 
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
   | This is a contradiction, thus, :math:`L` is not a CFL. Q.E.D.


.. slide:: Example

   Consider :math:`L = \{a^nb^nc^p : p > n > 0 \}`.
   Show that :math:`L` is not a CFL.
 
   **Proof:**

     | Assume :math:`L` is a CFL and apply the pumping lemma.
       Let :math:`m` be the constant in the pumping lemma and consider 
       :math:`w = a^mb^mc^{m+1}`. 
       Note: :math:`|w| \ge m`.
     | Show that there is no division of :math:`w` into :math:`uvxyz`
       such that :math:`|vy| \ge 1`, 
       :math:`|vxy| \le m`, and :math:`uv^ixy^iz \in L` for
       :math:`i = 0, 1, 2, \ldots`.
     |
     | **Case 1:** Neither :math:`v` nor :math:`y` can contain 2 or more
       distinct symbols.
       If :math:`v` contains a's and b's, then :math:`uv^2xy^2z \notin L`
       since there will be b's before a's. 
     | Thus, :math:`v` and :math:`y` can be only a's, b's, or c's (not mixed).
     | 
     | **Case 2:** :math:`v = a^{t_1}`, then :math:`y = a^{t_2}` or
       :math:`b^{t_3} (|vxy| \le m)`  
     | If :math:`y = a^{t_2}`, then
       :math:`uv^2xy^2z = a^{m+t_1+t_2}b^mc^{m+1} \notin L` 
       since :math:`t_1 + t_2 \ge 1, n(a) > n(b)`. 
     | If :math:`y = b^{t_3}`, then
        :math:`uv^2xy^2z = a^{m+t_1}b^{m+t_3}c^{m+1} \notin L` 
        since :math:`t_1 + t_3 \ge 1`, either :math:`n(c)` is not
        :math:`> n(a)` or :math:`n(c)` is not :math:`> n(b)`. 
     | 
     | **Case 3:** :math:`v = b^{t_1}`, then :math:`y = b^{t_2}` or
       :math:`c^{t_3}`.
     | If :math:`y = b^{t_2}`, then
       :math:`uv^2xy^2z = a^mb^{m+t_1+t_2}c^{m+1} \notin L`
       since :math:`t_1 + t_2 \ge 1, n(b) > n(a)`. 
     | If :math:`y = c^{t_3}`, then
       :math:`uv^0xy^0z = a^mb^{m-t_1}c^{m+1-t_3} \notin L`
       since :math:`t_1 + t_3 \ge 1`, either :math:`n(b) < n(a)`
       or :math:`n(c)` is not :math:`> n(a)`. 
     | 
     | **Case 4:** :math:`v = c^{t_1}`, then :math:`y=c^{t_2}`.
     | Then, :math:`uv^0xy^0z = a^mb^mc^{m+1 -t_1-t_2} \notin L`
       since :math:`t_1 + t_2 \ge 1, n(c)` is not :math:`> n(a)`. 
     |
     | Thus, there is no breakdown of :math:`w` into :math:`uvxyz`
       such that :math:`|vy| \ge 1, |vxy| \le m` and for all
       :math:`i\ge 0, uv^ixy^iz` is in :math:`L`. 
     | Contradiction, thus, :math:`L` is not a CFL. Q.E.D. 

     
.. slide:: Example

   Consider :math:`L = \{a^jb^k: k = j^2\}`.
   Show :math:`L` is not a CFL.
 
   **Proof:**

      | Assume :math:`L` is a CFL and apply the pumping lemma.
        Let :math:`m` be the constant in the pumping lemma and consider 
        :math:`w = a^mb^{m^2}`. 
      | Show there is no division of :math:`w` into :math:`uvxyz` such
        that :math:`|vy| \ge 1, |vxy| \le m`, and
        :math:`uv^ixy^iz \in L` for :math:`i = 0, 1, 2, \ldots`.
      |
      | **Case 1:** Neither :math:`v` nor :math:`y` can contain 2 or more
        distinct symbols.
        If :math:`v` contains a's and b's, then
        :math:`uv^2xy^2z \notin L` since
        there will be b's before a's.
      | Thus, :math:`v` and :math:`y` can be only a's, and then b's (not mixed).
      |
      | **Case 2:** :math:`v = a^{t_1}`, then :math:`y = a^{t_2}` or
        :math:`b^{t_3}`.  
      | If :math:`y=a^{t_2}`, then
        :math:`uv^2xy^2z = a^{m+t_1+t_2}b^{m^2} \notin L`
        since :math:`0 < t_1 + t_2 \le m`, not enough b's. 
      | If :math:`y=b^{t_3}`, then
        :math:`uv^2xy^2z = a^{m+t_1}b^{m^2+t_3} \notin L` since
        :math:`0 < t_1 + t_3 \le m`, if :math:`t_1 = 0`, too many b's.
        If :math:`t_1 = 1`, :math:`(m+1)^2 = m^2 +2m+1`,
        so for :math:`t_1\ge 1`, there will be too few b's. 
      | 
      | **Case 3:** :math:`v=b^{t_1}`, then :math:`y = b^{t_2}`.
      | Then, :math:`uv^2xy^2z = a^mb^{m^2 + t_1 + t_2} \notin L`
        since :math:`t_1 + t_2 > 0`, not enough a's. 
      |
      | Thus, there is no breakdown of :math:`w` into :math:`uvxyz`
        such that :math:`|vy| \ge 1`,
        :math:`|vxy| \le m` and for all :math:`i \ge 0, uv^ixy^iz` is
        in :math:`L`.
      | Contradiction, thus, :math:`L` is not a CFL. Q.E.D. 

      
.. slide:: Example

   Consider :math:`L = \{w{\bar w}w : w\in \Sigma^*\}, \Sigma = \{a, b\}`, 
   where :math:`\bar w` is the string :math:`w` with each occurence of
   :math:`a` replaced by :math:`b` and each occurence of :math:`b` 
   replaced by :math:`a`.
   For example, :math:`w = baaa, {\bar w} = abbb, w{\bar w} = baaaabbb`.
   Show :math:`L` is not a CFL.
 
   Proof:
      | Assume :math:`L` is a CFL and apply the pumping lemma.
        Let :math:`m` be the constant in the pumping lemma and consider 
        :math:`w = a^mb^ma^m`. 
      | Show there is no division of :math:`w` into :math:`uvxyz` such
        that :math:`|vy| \ge 1`, :math:`|vxy| \le m`, and
        :math:`uv^ixy^iz \in L` for :math:`i = 0, 1, 2, \ldots`.
      | (Note: :math:`v` and :math:`y` could be mixed a's and b's and
        still be in the language).
      | (Note: I will use a to represent the a's in the front of
        :math:`w` and :math:`A` to represent the a's at the end of
        :math:`w` when it is not clear.)
      | 
      | **Case 1:** :math:`v = a^{t_1}`, then
        :math:`y=a^{t_2}, b^{t_3}` or :math:`a^{t_2}b^{t_3}`.
      | If :math:`y=a^{t_2}`, then
        :math:`uv^2xy^2z = a^{m+t_1+t_2}b^ma^m \notin L`
        since :math:`t_1+t_2 > 0`, more a's on left than on right. 
      | If :math:`y=b^{t_3}`, then
        :math:`uv^2xy^2z = a^{m+t_1}b^{m+t_3}a^m \notin L`
        since :math:`t_1 + t_3 > 0`, either more a's on left than on
        right, or more b's than a's on the right. 
      | If :math:`y = a^{t_2}b^{t_3}`, then
        :math:`uv^0xy^0z = a^{m-t_1-t_2}b^{m-t_3}a^m \notin L`
        since :math:`t_1 + t_2 + t_3 > 0`, either number of a's on
        left and right not equal, or number of b's not equal to number
        of a's on right.
      | 
      | **Case 2:** :math:`v=a^{t_1}b^{t_2}`, then :math:`y=b^{t_3}`.
        Then :math:`uv^0xy^0z = a^{m -t_1}b^{m-t_2-t_3}a^m \notin L`
        since :math:`t_1 + t_2 + t_3 > 0`, either number of a's on
        left and right not equal, or number of b's not equal to number
        of a's on right.
      | 
      | **Case 3:** :math:`v = b^{t_1}`, then :math:`y=b^{t_2}, A^{t_3}`,
        or :math:`b^{t_2}A^{t_3}`.
      | If :math:`y = b^{t_2}`, then
        :math:`uv^2xy^2z = a^mb^{m+t_1+t_2}a^m \notin L`
        since :math:`t_1+t_2 > 0`, :math:`n(b) \neq n(a)` on either side. 
      | If :math:`y=A^{t_3}`, then
        :math:`uv^2xy^2z = a^mb^{m+t_1}a^{m+t_3} \notin L`
        since :math:`t_1 + t_3 > 0`, either :math:`n(a)` on left and
        right not equal, or :math:`n(b)` not equal to number of a's on left. 
      | If :math:`y=b^{t_2}A^{t_3}`, then
        :math:`uv^0xy^0z = a^mb^{m-t_1-t_2}a^{m-t_3} \notin L`
        since :math:`t_1 + t_2 + t_3 > 0`, either :math:`n(a)` on left
        and right not equal, or :math:`n(b)` not equal to number of a's on left. 
      |  
      | **Case 4:** :math:`v = b^{t_1}A^{t_2}`, then :math:`y = A^{t_3}`.
      | Then :math:`uv^0xy^0z = a^mb^{m-t_1}a^{m-t_2-t_3} \notin L`
        since :math:`t_1 + t_2 + t_3 > 0`, either :math:`n(a)` on left
        and right not equal, or :math:`n(b)` not equal to number of a's on left. 
      | 
      | **Case 5:** :math:`v=A^{t_1}`, then :math:`y=A^{t_2}`.
      | Then :math:`uv^0xy^0z = a^mb^ma^{m-t_1 -t_2} \notin L`
        since :math:`t_1+t_2 > 0`, :math:`n(a)` on left not equal to
        :math:`n(a)` on right.
      |
      | Thus, there is no breakdown of :math:`w` into :math:`uvxyz`
        such that :math:`|vy| \ge 1`,  
        :math:`|vxy| \le m` and for all :math:`i \ge 0`,
        :math:`uv^ixy^iz` is in :math:`L`.  
      | Contradiction, thus, :math:`L` is not a CFL. Q.E.D. 

      
.. slide:: Example

   Consider :math:`L = \{a^nb^pb^pa^n\}`.
   :math:`L` is a CFL. The pumping lemma should apply!

   Let :math:`m \ge 4` be the constant in the pumping lemma.
   Consider :math:`w = a^mb^mb^ma^m`.

   We can break :math:`w` into :math:`uvxyz`, with:

      :math:`u = a^mb^{m-2} \qquad v = b \qquad x = bb \qquad y = b \qquad z = b^{m-2}a^m`
  
   Thus, :math:`|vy| \ge 1, |vxy| \le m`, and for all
   :math:`i \ge 0, uv^ixy^iz = a^mb^{m+i}b^{m+i}a^m \in L`.
 
   If you apply the pumping lemma to a CFL, then you should find a partition 
   of :math:`w` that works! 

   .. note::

      This is not a proof that a language is CFL! Why not?
