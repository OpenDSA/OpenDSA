.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2013 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

==============
Sorting Part 1
==============

Sorting Part 1
--------------

.. slide:: Sorting

   * Each record contains a field called the key.
      * Linear order: comparison.

   * Measures of cost:
      * Comparisons
      * Swaps

.. slide:: Insertion Sort

   .. inlineav:: insertionsortCON ss
      :output: show

   .. odsascript:: AV/Sorting/insertionsortCON.js

.. slide:: Analysis: Worst Case

   .. odsalink:: AV/Sorting/InsertionSortWorstCaseCON.css

   .. inlineav:: InsertionSortWorstCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortWorstCaseCON.js


.. slide:: Analysis: Best Case

   .. odsalink:: AV/Sorting/InsertionSortBestCaseCON.css

   .. inlineav:: InsertionSortBestCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortBestCaseCON.js


.. slide:: Analysis: Average Case

   .. odsalink:: AV/Sorting/InsertionSortAverageCaseCON.css

   .. inlineav:: InsertionSortAverageCaseCON ss
      :output: show

   .. odsascript:: AV/Sorting/InsertionSortAverageCaseCON.js


.. slide:: Bubble Sort

   .. inlineav:: bubblesortS1CON ss
      :output: show

   .. inlineav:: bubblesortS2CON ss
      :output: show

   .. odsascript:: AV/Sorting/bubblesortS1CON.js
   .. odsascript:: AV/Sorting/bubblesortS2CON.js


.. slide:: Analysis

   .. odsalink:: AV/Sorting/BubbleSortAnalysisCON.css

   .. inlineav:: BubbleSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Sorting/BubbleSortAnalysisCON.js


.. slide:: Selection Sort

   .. inlineav:: selectionsortS1CON ss
      :output: show

   .. inlineav:: selectionsortS2CON ss
      :output: show

   .. odsascript:: AV/Sorting/selectionsortS1CON.js
   .. odsascript:: AV/Sorting/selectionsortS2CON.js


.. slide:: Analysis

   .. odsalink:: AV/Sorting/SelectionSortAnalysisCON.css

   .. inlineav:: SelectionSortAnalysisCON ss
      :output: show

   .. odsascript:: AV/Sorting/SelectionSortAnalysisCON.js


.. slide:: Summary

   .. math::

      \begin{array}{rccc}
      &\textbf{Insertion}&\textbf{Bubble}&\textbf{Selection}\\
      \textbf{Comparisons:}\\
      \textrm{Best Case}&\Theta(n)&\Theta(n^2)&\Theta(n^2)\\
      \textrm{Average Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n^2)\\
      \textrm{Worst Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n^2)\\
      \\
      \textbf{Swaps:}\\
      \textrm{Best Case}&0&0&\Theta(n)\\
      \textrm{Average Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n)\\
      \textrm{Worst Case}&\Theta(n^2)&\Theta(n^2)&\Theta(n)\\
      \end{array}

.. slide:: Code Tuning

   * General strategy: Test to avoid work
      * Balance test cost, success probability, work saved

   * "Optimizations" for quadratic sorts:
      * Insertion Sort shift vs swaps: Works
      * Selection Sort avoid self-swaps: Does not work
      * Bubble Sort avoid/count comparisions: Does not work

.. slide:: Exchange Sorting

   * All of the sorts so far rely on exchanges of adjacent records.
   * Inversions
   * What is the average number of exchanges required?

   .. odsalink:: AV/Sorting/ExchangeSortCON.css

   .. inlineav:: ExchangeSortCON ss
      :output: show

   .. odsascript:: AV/Sorting/ExchangeSortCON.js
