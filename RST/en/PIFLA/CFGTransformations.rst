.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies:
   :topic: Context-Free Grammars Transformation


Transforming Grammars
=====================

Transforming Grammars
---------------------

We use grammars to represent a programming language.
Want to know: Is a given string (or program :math:`x`) valid
(syntactically correct)?
Same as asking if it is in the language (the membership problem).

Last time we showed that if we could transform a CFG into
a CFG with no :math:`\lambda`-productions, and no rules like
:math:`A \rightarrow B`, then we could determine if :math:`w` is in or
not in :math:`L(G)` in :math:`2|w|` rounds, each step adding a terminal
or increasing in length.

This works, but it is not fast, that is, not linear!

We will look at lots of methods for transforming grammars.
Some will be forms that are easier to work with,
some are easier to use in proofs.

| Key question: Are there ways to transform (restrict) CFGs such that
|   1) We can process efficiently
|   2) without restricting the power of CFGs

.. inlineav:: TransformGrammarsFS ff
   :links: AV/PIFLA/CFL/TransformGrammarsFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/CFL/TransformGrammarsFS.js
   :output: show


Remove Useless Productions
--------------------------

.. inlineav:: RemoveUselessFS ff
   :links: AV/PIFLA/CFL/RemoveUselessFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveUselessFS.js
   :output: show


Remove Lambda Productions
-------------------------

.. inlineav:: RemoveLambdaFS ff
   :links: AV/PIFLA/CFL/RemoveLambdaFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveLambdaFS.js
   :output: show


Remove Unit Productions
-----------------------

.. inlineav:: RemoveUnitFS ff
   :links: AV/PIFLA/CFL/RemoveUnitFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveUnitFS.js
   :output: show


Chomsky Normal Form (CNF)
-------------------------

.. inlineav:: ChomskyNormalFormFS ff
   :links: AV/PIFLA/CFL/ChomskyNormalFormFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/ChomskyNormalFormFS.js
   :output: show
   

Greibach Normal Form (GNF)
--------------------------

.. inlineav:: GreibachNormalFormFS ff
   :links: AV/PIFLA/CFL/GreibachNormalFormFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/GreibachNormalFormFS.js
   :output: show
