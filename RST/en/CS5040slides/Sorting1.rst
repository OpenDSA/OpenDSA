.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

========================
Sorting: Quadratic Sorts
========================

Quadratic Sorts
---------------

.. slide:: Sorting

   * Each record contains a field called the key.
      * Linear order: comparison.

   * Measures of cost:
      * Comparisons
      * Swaps

.. slide:: Insertion Sort

   What would you do if you have a stack of phone bills from the past
   two years and you want to order by date?
   A fairly natural way to handle this is to look at the first two
   bills and put them in order.
   Then take the third bill and put it into the right position with
   respect to the first two, and so on.


.. slide:: Initial Step
 
   Consider this start to the process.

   .. inlineav:: insertionsortCON ss
      :long_name: Insertion Sort Slideshow
      :links: 
      :scripts: AV/Sorting/insertionsortCON.js
      :output: show
            

.. slide:: Analysis: Worst Case

   .. inlineav:: InsertionSortWorstCaseCON ss
      :long_name: Insertion Sort Worst Case Slideshow
      :links: AV/Sorting/InsertionSortWorstCaseCON.css
      :scripts: AV/Sorting/InsertionSortWorstCaseCON.js
      :output: show


.. slide:: Analysis: Best Case

   .. inlineav:: InsertionSortBestCaseCON ss
      :long_name: Insertion Sort Best Case Slideshow
      :links: AV/Sorting/InsertionSortBestCaseCON.css
      :scripts: AV/Sorting/InsertionSortBestCaseCON.js
      :output: show


.. slide:: Analysis: Average Case

   .. inlineav:: InsertionSortAverageCaseCON ss
      :long_name: Insertion Sort Average Case Slideshow
      :links: AV/Sorting/InsertionSortAverageCaseCON.css
      :scripts: AV/Sorting/InsertionSortAverageCaseCON.js
      :output: show


.. slide:: Bubble Sort

   .. inlineav:: bubblesortS1CON ss
      :long_name: Bubble Sort Slideshow 1
      :links: 
      :scripts: AV/Sorting/bubblesortS1CON.js
      :output: show

   .. inlineav:: bubblesortS2CON ss
      :long_name: Bubble Sort Slideshow 2
      :links: 
      :scripts: AV/Sorting/bubblesortS2CON.js
      :output: show


.. slide:: Analysis

   .. inlineav:: BubbleSortAnalysisCON ss
      :long_name: Bubble Sort Analysis Slideshow
      :links: AV/Sorting/BubbleSortAnalysisCON.css
      :scripts: AV/Sorting/BubbleSortAnalysisCON.js
      :output: show


.. slide:: Selection Sort

   .. inlineav:: selectionsortS1CON ss
      :long_name: Selection Sort Slideshow 1
      :links: 
      :scripts: AV/Sorting/selectionsortS1CON.js
      :output: show

   .. inlineav:: selectionsortS2CON ss
      :long_name: Selection Sort Slideshow 2
      :links: 
      :scripts: AV/Sorting/selectionsortS2CON.js
      :output: show


.. slide:: Analysis

   .. inlineav:: SelectionSortAnalysisCON ss
      :long_name: Selection Sort Analysis Slideshow
      :links: AV/Sorting/SelectionSortAnalysisCON.css
      :scripts: AV/Sorting/SelectionSortAnalysisCON.js
      :output: show


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

.. slide:: Code Tuning (1)

   * General strategy: Test to avoid work
      * Balance test cost, success probability, work saved

   * "Optimizations" for quadratic sorts:
      * Insertion Sort shift vs swaps: Works
      * Selection Sort viewed as an optimization of Bubble Sort: Works
      * Selection Sort avoid self-swaps: Does not work
      * Bubble Sort "i" vs "1": Works
      * Bubble Sort count comparisions/avoid unnecessary iterations:
        Does not work
      * Bubble Sort O(n) best case claim: Bogus

.. slide:: Exchange Sorting

   * All of the sorts so far rely on exchanges of adjacent records: Inversions

   .. inlineav:: ExchangeSortCON ss
      :long_name: Exchange Sort Analysis Slideshow
      :links: AV/Sorting/ExchangeSortCON.css
      :scripts: AV/Sorting/ExchangeSortCON.js
      :output: show
