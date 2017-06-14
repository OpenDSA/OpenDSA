.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: FL Introduction
   :satisfies:
   :topic: Introduction

.. odsalink:: AV/FormalLang/HierarchyCON.css

Overview
========

Language Hierarchy
------------------

.. inlineav:: HierarchyCON dgm
   :align: center


Power of Machines
-----------------

.. math::

   \begin{array}{lll}
   \mathrm{Machine}& \mathrm{Can\ do}&  \mathrm{Can't\ do}\\
   \hline 
   \mathrm{Finite\ Automata}&       \mathrm{recognize\ integers}& \mathrm{recognize\ arithmetic\ expr}\\
   \mathrm{(no\ memory)}\\
   \hline
   \mathrm{Push-Down\ Automata}&      \mathrm{recognize\ arithmetic\ expr}& \mathrm{compute\ expression}\\
   \mathrm{(stack)}\\
   \hline
   \mathrm{Turing\ Machine}&       \mathrm{compute\ expression}&  \mathrm{decide\ if\ halts}\\
   \mathrm{(unlimited)}
   \end{array}


Application: Compilers
----------------------

* Our focus - Question: Given a program in some language (say Java or
  C++) - is it valid?

* Question: language L, program P - is P valid?

*  Other things to consider, how is the compilation process different for
   different programming languages? (Java vs C++?)

.. inlineav:: CompileCON dgm
   :align: center


Stages of a Compiler
~~~~~~~~~~~~~~~~~~~~

.. inlineav:: CompileStagesCON dgm
   :align: center

   Stages of a compiler


L-Systems: Model the Growth of Plants
-------------------------------------

.. odsafig:: Images/LsysGrowth.png
   :width: 400
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: L-system growth

   Iterations on a L-system.

.. odsascript:: AV/FormalLang/HierarchyCON.js
.. odsascript:: AV/FormalLang/CompileCON.js
.. odsascript:: AV/FormalLang/CompileStagesCON.js
