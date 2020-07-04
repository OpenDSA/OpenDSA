.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Susan Rodger and Cliff Shaffer
   :requires: Parsing Introduction
   :satisfies: CYK Parsing
   :topic: Parsing

CYK Parsing
===========

CYK Parsing
-----------

Invented by J. Cocke, D.H. Younger, and T. Kasami

Requires :math:`|w|^3` steps to parse string :math:`w`.

:term:`Dynamic Programming` remembers the answer to small subproblems
so that it won't have to solve them again.

For CYK Parsing, the grammar must be in Chomsky Normal Form (CNF)
first.

| **Definition:** A CFG is in Chomsky Normal Form (CNF) if all
  productions are of the form
|    :math:`A \rightarrow BC` or :math:`A \rightarrow a`
| where :math:`A, B, C \in V` and :math:`a \in T`.


CYK Parsing Algorithm
~~~~~~~~~~~~~~~~~~~~~

| Assume :math:`G = (V, T, S, P)` is in CNF, and :math:`w =
  a_1a_2...a_n`.
| Define substrings :math:`w_{ij} = a_i...a_j`.
| Define subsets of
  :math:`V, V_{ij} = \{A \in V \mid A \stackrel{*}{\Rightarrow} w_{ij} \}`
| Then :math:`w \in L(G)` if and only if :math:`S \in V_{1n}`. 

.. note::

   :math:`A \in V_{ii}` if and only if there is what kind of production?

   Answer: :math:`A \rightarrow a_i`
   
| All :math:`V_{ii}` are easy, just based on if there is a production. 
| Note: Compute :math:`V_{ij}`.
  For :math:`j >i`, :math:`A` derives :math:`w_{ij}` if and only if
  there is a production :math:`A \rightarrow BC` with
  :math:`B \stackrel{*}{\Rightarrow} w_{ik}` and 
  :math:`C \stackrel{*}{\Rightarrow} w_{{k+1}j}` for some :math:`k`
  with :math:`i \le k, k < j`. 

Algorithm
~~~~~~~~~

1. Compute :math:`V_{11}, V_{22}, V_{33}, \ldots, V_{nn}`
2. Compute :math:`V_{12}, V_{23}, V_{34}, \ldots, V_{{n-1}n}`
3. Compute :math:`V_{13}, V_{24}, V_{35}, \ldots, V_{{n-2}n}`
4. :math:`\ldots`
5. Last step is? Compute :math:`V_{1n}`

How do we know if it worked? 
If the last step is :math:`S`

.. topic:: Example

   | :math:`S \rightarrow CD \mid CF`
   | :math:`B \rightarrow HB \mid c`
   | :math:`C \rightarrow a`
   | :math:`D \rightarrow SE`
   | :math:`E \rightarrow GG`
   | :math:`F \rightarrow BE`
   | :math:`G \rightarrow b`
   | :math:`H \rightarrow c`

   Build the CYK Parse table:

   .. math::

      \begin{array}{|l|l|l|l|l|l|l|} 
      \ a& \ a & \ c &\ b & \ b & \ b& \ b \\ \hline 
      \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ \\ \hline
      \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ \\ \cline{1-6}
      \ \ \ & \ \ \ & \ \ \ & \ \ \ & \ \ \ \\ \cline{1-5}
      \ \ \ & \ \ \ & \ \ \ & \ \ \ \\ \cline{1-4}
      \ \ \ & \ \ \ & \ \ \ \\ \cline{1-3}
      \ \ \ & \ \ \ \\ \cline{1-2}
      \ \ \ \\ \cline{1-1}
      \end{array}
