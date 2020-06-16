.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger, Cliff Shaffer, and Mostafa Mohammed
   :requires: CFL Pumping Lemma
   :satisfies:
   :topic: Finite Automata

.. slideconf::
   :autoslides: False


Closure Properties for CFLs
===========================

.. slide:: Closure Properties

   :math:`L=\{a^nb^n | n>0\}`,
   :math:`LL = \{a^nb^na^mb^m | n>0, m>0 \}`

   **Theorem:** CFL's are closed under union, concatenation, and
   star-closure.

   Given: 2 CFGs :math:`G_1 = (V_1,T_1,S_1,P_1)`  and
   :math:`G_2 = (V_2,T_2,S_2,P_2)`


.. slide:: Union

      |   Construct :math:`G_3` such that :math:`L(G_3) = L(G_1) \cup L(G_2)`.
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup V_2 \cup \{S_3\}, T_3 = T_1 \cup T_2`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1 | S_2 \}`.


.. slide:: Concatenation

      |   Construct :math:`G_3` such that
          :math:`L(G_3) = L(G_1)L(G_2)`.
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup V_2 \cup \{S_3\}, T_3 = T_1 \cup T_2`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1S_2 \}`.


.. slide:: Star-Closure

      |   Construct :math:`G_3` such that :math:`L(G_3) = L(G_1)^*`
      |   :math:`G_3 = (V_3,T_3,S_3,P_3)`
      |   :math:`V_3 = V_1 \cup \{S_3\}, T_3 = T_1`, and 
          :math:`P_3 = P_1 \cup P_2 \cup \{S_3 \rightarrow S_1S_3|\lambda \}`.


.. Slide:: Intersection

   | **Theorem:** CFL's are NOT closed under intersection
   |    Let :math:`L_1 = \{a^nb^nc^m | n,m > 0\}` and
        :math:`L_2 = \{a^nb^mc^m | n,m> 0\}`
   |    :math:`L_1` and :math:`L_2` are CFLs 
   |    Then :math:`L_1 \cap L_2 = \{a^nb^nc^n | n >0 \}` is not CFL. 


.. Slide:: Complementation

   | **Theorem:** CFL's are NOT closed under complementation.
   |    Set identity: 
   |       :math:`L_1 \cap L_2 = \overline{\overline{L_1} \cup \overline{L_2}}`

   Thus, CFLs are not closed under complementation. 


.. slide:: Example for theorem below:

   | :math:`L_1 = \{a^nb^ma^n \mid m> 0, n>0 \}`
   | :math:`L_2 = \{w \mid w \in{\Sigma}^{*}` and :math:`w` has an even
     number of b's}, :math:`\Sigma = \{a,b\}`,
   | :math:`L_1 \cap L_2 = \{a^nb^mb^ma^n\}` is a CFL. 


.. slide:: Regular Intersection (1)

   CFL's are closed under *regular* intersection. 
   If :math:`L_1` is CFL and :math:`L_2` is regular,
   then :math:`L_1 \cap L_2` is CFL.

   | **Proof:** (sketch)  
   |    This proof is similar to the construction 
        proof in which we showed regular languages are closed under intersection. 
   |    We can take a NPDA for :math:`L_1` and a DFA for :math:`L_2` and
        construct a NPDA for :math:`L_1 \cap L_2`.


.. slide:: Some Decision Problems for CFGs

   | For a given CFG :math:`G`, is :math:`L(G)` empty?
   |    A: Remove useless productions. Then, is :math:`S` useless?

   | For a given CFG :math:`G`, is :math:`L(G)` infinite?
   |    A: Is there a repeating variable?

   | For two given CFGs :math:`G_1` and :math:`G_2`, does
     :math:`L(G_1) = L(G_2)`?
   |    A: There is no general algorithm that can always deterimine if two CFG
        generate the same language!


.. slide:: A Richer Grammar

   | Here is a grammar for :math:`L = \{a^nb^nc^n \mid n \geq 1 \}`.
   |    :math:`S \rightarrow abc \mid aAbc`
   |    :math:`Ab \rightarrow bA`
   |    :math:`Ac \rightarrow Bbcc`
   |    :math:`bB \rightarrow Bb`
   |    :math:`aB \rightarrow aa \mid aaA`

   Consider how to derive :math:`a^3b^3c^3`

   This is called a Context Sensitive Grammar
