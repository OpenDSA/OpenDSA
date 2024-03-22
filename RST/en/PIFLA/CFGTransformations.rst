.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed and Cliff Shaffer
   :satisfies:
   :topic: Context-Free Grammar Transformations
   :keyword: Context-Free Grammar Transformations


Transforming Grammars
=====================

Transforming Grammars
---------------------

Programming language developers often use grammars to represent
the syntax for a programming language. 
Of course, a key question related to implementing a programming
language (or any other use of a grammer) is this:
Is a given program syntactically correct?
This is exactly the same as asking if the string is in the language
defined by that grammar (the membership problem).

We have seen that if we could transform a CFG into an equivalent CFG
with no :math:`\lambda`-productions, and no rules like 
:math:`A \rightarrow B`, then we can determine if string :math:`w` is
in or not in :math:`L(G)` in :math:`2|w|` derivation rounds,
where each step adds a terminal or increases the length of the
sentential form of the current derivation.
This works, but it is not fast!
At least it avoids the possibility of getting into an infinite loop.

We will look at some methods for transforming grammars.
Sometimes we do this to create a version of the grammar that is easier
to work with.
Sometimes we just want to know that we **can** do a transformation to
a given form because assuming that the grammar is in that form makes
it easier to use in a proof.

| What we seek to answer in this module:
| Are there ways to transform (restrict) CFGs such that:
|   1) we can process them efficiently?
|   2) but without restricting the power of CFGs?

.. inlineav:: TransformGrammarsFS ff
   :links: AV/PIFLA/CFL/TransformGrammarsFS.css
   :scripts: DataStructures/PIFrames.js AV/PIFLA/CFL/TransformGrammarsFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations


Remove Useless Productions
--------------------------

.. inlineav:: RemoveUselessFS ff
   :links: AV/PIFLA/CFL/RemoveUselessFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveUselessFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations


Remove Lambda Productions
-------------------------

.. inlineav:: RemoveLambdaFS ff
   :links: AV/PIFLA/CFL/RemoveLambdaFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveLambdaFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations


Remove Unit Productions
-----------------------

.. inlineav:: RemoveUnitFS ff
   :links: AV/PIFLA/CFL/RemoveUnitFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/RemoveUnitFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations


Chomsky Normal Form (CNF)
-------------------------

.. inlineav:: ChomskyNormalFormFS ff
   :links: AV/PIFLA/CFL/ChomskyNormalFormFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/ChomskyNormalFormFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations
   

Greibach Normal Form (GNF)
--------------------------

.. inlineav:: GreibachNormalFormFS ff
   :links: AV/PIFLA/CFL/GreibachNormalFormFS.css
   :scripts: DataStructures/FLA/GrammarMatrix.js DataStructures/PIFrames.js AV/PIFLA/CFL/GreibachNormalFormFS.js
   :output: show
   :keyword: Context-Free Grammar Transformations
