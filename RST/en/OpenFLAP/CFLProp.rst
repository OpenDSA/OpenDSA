.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Context-Free Languages
   :satisfies:
   :topic: Finite Automata

Properties of Context-Free Languages 
====================================

Properties of Context-Free Languages 
------------------------------------

.. note::
   
   We will not cover Theorem 8.2

Which of the following languages are CFL?

* :math:`L = \{a^nb^nc^j \mid 0 < n\le j\}`

  .. note::

     NOT CFL 
* :math:`L = \{a^nb^ja^nb^j \mid n>0, j>0\}`

  .. note::

     NOT CFL 

* :math:`L = \{a^nb^ja^kb^p \mid n+j \le k+p, n>0, j>0, k>0, p>0 \}`

  .. note::

     CFL 

* :math:`L = \{a^nb^ja^jb^n \mid n>0, j>0\}`

  .. note::

     CFL 

**Pumping Lemma for Regular Languages**

Let :math:`L` be a regular language,
then there is a constant :math:`m` such that :math:`w\in L`,
:math:`|w|\ge m`, :math:`w = xyz` such that 

   * :math:`|xy| \le m`
   * :math:`|y| \ge 1`
   * for all :math:`i\ge 0, xy^iz \in L`

We were able to show that :math:`a^nb^n` is not a regular language. 


**Pumping Lemma for CFL's**

Let :math:`L` be any infinite CFL.
Then there is a constant :math:`m` depending only on :math:`L`,
such that for every string :math:`w` in :math:`L`, 
with :math:`|w| \ge m`, we may partition :math:`w = uvxyz` such that:

   | :math:`|vxy| \le m`, (limit on size of substring)
   | :math:`|vy| \ge 1`,  (:math:`v` and :math:`y` not both empty)
   | For all :math:`i \ge 0, uv^ixy^iz \in L`

**Proof:** (sketch)

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
   
.. inlineav:: CFLprop1 dgm
   :links: AV/OpenFLAP/CFLprop1.css
   :scripts: AV/OpenFLAP/CFLprop1.js
   :align: center

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
   
.. inlineav:: CFLprop2 dgm
   :links: AV/OpenFLAP/CFLprop2.css
   :scripts: AV/OpenFLAP/CFLprop2.js
   :align: center

QED 

.. topic:: Example

   Consider :math:`L = \{a^nb^nc^n: n\ge 1\}`.
   Show :math:`L` is not a CFL.

**Proof:** (by contradiction)

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
   |
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
   |
   | **Case 4:** :math:`v = c^{t_1}`, then :math:`y = c^{t_2}`.
   | Then, :math:`uv^2xy^2z = a^mb^mc^{m+t_1+t_2} \notin L`
     since :math:`t_1 + t_2 > 0, n(c) > n(a)`.
   |
   | Thus, there is no breakdown of :math:`w` into :math:`uvxyz` such
     that :math:`|vy| \ge 1`, :math:`|vxy| \le m` and for all
     :math:`i\ge 0`, :math:`uv^ixy^iz` is in :math:`L`.
   | This is a contradiction, thus, :math:`L` is not a CFL. Q.E.D.


.. topic:: Example

   Why would we want to recognize a language of the type
   :math:`\{a^nb^nc^n: n\ge 1\}`?
 
   Recognize underlined words:
 
   :math:`\underline{word}` is stored as
   :math:`word\beta\beta\beta\beta\ \_\ \_\ \_\ \_`
   where :math:`\beta` represents a backspace. 

.. topic:: Example

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

.. topic:: Example

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

.. topic:: Exercise

   Prove the following is not a CFL by applying the 
   pumping lemma. (Answer is at the end of this handout). 

      | :math:`L = \{ a^{2n}b^{2p}c^nd^p : n,p \ge 0 \}`.

.. topic:: Example

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

.. topic:: Example

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


(Chap 8.2) Closure Properties of CFLs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Example: :math:`L=\{a^nb^n | n>0\}`,
:math:`L\circ L = \{a^nb^na^mb^m | n>0, m>0 \}`

.. topic:: Theorem

   CFL's are closed under union, concatenation, and star-closure.

   **Proof:**

      Given 2 CFG :math:`G_1 = (V_1,T_1,S_1,P_1)`  and
      :math:`G_2 = (V_2,T_2,S_2,P_2)`

      | * Union:
      |   Construct :math:`G_3` such that :math:`L(G_3) = L(G_1) \cup L(G_2)`.
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup V_2 \cup \{S_3\}, T_3 = T_1 \cup T_2`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1 | S_2 \}`.

      | * Concatenation:
      |   Construct :math:`G_3` such that
          :math:`L(G_3) = L(G_1) \circ L(G_2)`.
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup V_2 \cup \{S_3\}, T_3 = T_1 \cup T_2`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1S_2 \}`.

      | * Star-Closure
      |   Construct :math:`G_3` such that :math:`L(G_3) = L(G_1)^*`
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup \{S_3\}, T_3 = T_1`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1S_3|\lambda \}`.

      QED. 


.. topic:: Theorem

   CFL's are NOT closed under intersection and complementation.

   **Proof:**

      | * Intersection:
      |   Let :math:`L_1 = \{a^nb^nc^m | n,m > 0\}` and
          :math:`L_2 = \{a^nb^mc^m | n,m> 0\}`
      |   :math:`L_1` and :math:`L_2` are CFLs 
      |   Then :math:`L_1 \cap L_2 = \{a^nb^nc^n | n >0 \}` is not CFL. 

      | * Complementation:
      |   Set identity: 

        .. math::
           
           L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}

      .. note::

         Show Venn Diagram! 

   Thus, CFLs are not closed under complementation. 

.. note::

   Example for theorem below:

   | :math:`L_1 = \{a^nb^ma^n | m> 0, n>0 \}`
   | :math:`L_2 = \{w | w \in{\Sigma}^{*}` and :math:`w` has an even
     number of b's}, :math:`\Sigma = \{a,b\}`,
   | :math:`L_1 \cup L_2 = \{a^nb^mb^ma^n\}` is a CFL. 

.. topic:: Theorem

   CFL's are closed under *regular* intersection. 
   If :math:`L_1` is CFL and :math:`L_2` is regular,
   then :math:`L_1 \cap L_2` is CFL.

   **Proof:** (sketch)  

      | This proof is similar to the construction 
        proof in which we showed regular languages are closed under intersection. 
        We take a NPDA for :math:`L_1` and a DFA for :math:`L_2` and
        construct a NPDA for :math:`L_1 \cap L_2`.
      | :math:`M_1 = (Q_1,\Sigma, \Gamma, {\delta}_1, q_0, z, F_1)`
        is an NPDA such that :math:`L(M_1) = L_1`.
      | :math:`M_2 = (Q_2,\Sigma, {\delta}_2, q_0^{'}, F_2)` is a DFA
        such that :math:`L(M_2) = L_2`.
      | Construct NPDA :math:`M_3 = (Q_3,\Sigma, \Gamma, {\delta}_3,
                              (q_0,q_0^{'}), z, F_3)`
        where :math:`Q_3 = Q_1 \times Q_2`, and
        :math:`F_3 = \{(q,p) | q\in F_1, p\in F_2\}`.
      | Example of replacing arcs (NOT a Proof!):

      .. odsafig:: Images/lt10inter.png
         :width: 400
         :align: center
         :capalign: justify
         :figwidth: 90%
         :alt: lt10inter
         
      .. inlineav:: CFLprop3 dgm
         :links: AV/OpenFLAP/CFLprop3.css
         :scripts: AV/OpenFLAP/CFLprop3.js
         :align: center

      Note this is not a proof, but sketches how we will combine the DFA and NPDA. 
      We must formally define :math:`{\delta}_3`. If

         | :math:`(q_k,x) \in {\delta}_1(q_i,a,b)`
         | :math:`\delta_2(q_j^{'},a) = q_l^{'}`

      then 

         | :math:`((q_k,q_l^{'}),x) \in {\delta}_3((q_i,q_j^{'}),a,b)`

      Must show

         | :math:`((q_0,q_0^{'}),w,z) \stackrel{*}{\vdash} ((q_i,q_j^{'}),\lambda,x)`
         | :math:`(q_i,q_j^{'})\in F_3`

      if and only if

         | :math:`(q_0,w,z) \stackrel{*}{\vdash} (q_i,\lambda,x)`
         | :math:`(q_0^{'},w) \stackrel{*}{\vdash} (q_j^{'},\lambda)`
         | :math:`q_i \in F_1` and :math:`q_j^{'}\in F_2`

      Must show: 

         | w \in L(M_3)` iff :math:`w \in L(M_1)` and :math:`w \in L(M_2)`. 

      QED. 

      NOTE: Why doesn't this proof work for if we try to construct an 
      NPDA that represents the intersection of two NPDA's? Need 2 stacks.

**Questions about CFL:**

   | 1. Decide if CFL is empty?
   |    Know how to get rid of useless variables and productions, if there is 
        anything left, then CFL is not empty. 

   | 2. Decide if CFL is infinite?
   |    Get rid of useless variables and productions, :math:`\lambda`-rules, and 
        unit productions.
        Then if there is a variable that repeats :math:`A \stackrel{*}{\Rightarrow} xAy`,
        then :math:`L` is infinite. 

     .. note::

        What type of language is a grammar that has this property?
        How do we recognize it automatically?
        
.. topic:: Example

   Consider :math:`L = \{ a^{2n}b^{2m}c^nd^m : n,m \ge 0 \}`.
   Show :math:`L` is not a CFL.

   **Proof:**
      | Assume :math:`L` is a CFL and apply the pumping lemma.
        Let :math:`m` be the constant in the pumping lemma and
        consider :math:`w = a^{2m}b^{2m}c^md^m`.
      | Show there is no division of :math:`w` into :math:`uvxyz` such
        that :math:`|vy| \ge 1`, :math:`|vxy| \le m`,
        and :math:`uv^ixy^iz \in L` for :math:`i = 0, 1, 2, \ldots`.
      |
      | **Case 1:** Neither :math:`v` nor :math:`y` can contain 2 or
        more distinct symbols.
        If :math:`v` contains a's and b's, then
        :math:`uv^2xy^2z \notin L` since
        there will be b's before a's.
      | Thus, :math:`v` and :math:`y` can be only a's, b's, c's, or d's (not mixed).
      | 
      | **Case 2:** :math:`v = a^{t_1}`, then :math:`y = a^{t_2}`
        or :math:`b^{t_3} (|vxy| \le m$)`.
      | If :math:`y = a^{t_2}`, then
        :math:`uv^2xy^2z = a^{2m+t_1+t_2}b^{2m}c^md^m \notin L`
        since :math:`t_1 + t_2 > 0`, the number of a's is not twice the number of c's.
      | If :math:`y=b^{t_3}`, then :math:`uv^2xy^2z = a^{2m+t_1}b^{2m+t_3}c^md^m \notin L`
        since :math:`t_1 + t_3 > 0`, either the number of a's (:math:`n(a)`) is
        not twice :math:`n(c)` or :math:`n(b)` is not twice :math:`n(d)`.
      |
      | **Case 3:** :math:`v = b^{t_1}`, then :math:`y = b^{t_2}` or
        :math:`c^{t_3}`.
      | If :math:`y=b^{t_2}`, then :math:`uv^2xy^2z = a^{2m}b^{2m+t_1+t_2}c^md^m \notin L`
        since :math:`t_1 + t_2 > 0, n(b) > 2 * n(d)`.
      | If :math:`y = c^{t_3}`, then
        :math:`uv^2xy^2z = a^{2m}b^{2m+t_1}c^{m+t_3}d^m \notin L`
        since :math:`t_1 + t_3 > 0`, either :math:`n(b) > 2*n(d)`
        or :math:`2*n(c) > n(a)`.
      | 
      | **Case 4:** :math:`v = c^{t_1}`, then :math:`y = c^{t_2}` or
        :math:`d^{t_3}`.
      | If :math:`y = c^{t_2}`, then
        :math:`uv^2xy^2z = a^{2m}b^{2m}c^{m+t_1+t_2}d^m \notin L`
        since :math:`t_1 + t_2 > 0, 2 * n(c) > n(a)`.
      | If :math:`y = d^{t_3}`, then
        :math:`uv^2xy^2z = a^{2m}b^{2m}c^{m+t_1}d^{m+t_3} \notin L`
        since :math:`t_1 + t_3 > 0`, either :math:2*n(c) > n(a)`
        or :math:`2*n(d) > n(b)`.
      |
      | **Case 5:** :math:`v = d^{t_1}`, then :math:`y = d^{t_2}`.
      | Then :math:`uv^2xy^2z = a^{2m}b^{2m}c^md^{m+t_1+t_2} \notin L`
        since :math:`t_1 + t_2 > 0, 2*n(d) > n(c)`.
      |
      | Thus, there is no breakdown of :math:`w` into :math:`uvxyz`
        such that :math:`|vy| \ge 1`,
        :math:`|vxy| \le m` and for all :math:`i\ ge 0`,
        :math:`uv^ixy^iz` is in :math:`L`.
      | Contradiction, thus, :math:`L` is not a CFL. Q.E.D.
