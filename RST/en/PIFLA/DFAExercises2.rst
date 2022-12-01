.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Mostafa Mohammed, Cliff Shaffer
   :requires:
   :satisfies:
   :topic: DFA exercises

DFA exercises
=============

DFA exercises
-------------

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAevena.html pe
   :long_name: DFA exercise even a

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAbsurrounda.html pe
   :long_name: DFA exercise b surrounds a

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAdiv4.html pe
   :long_name: DFA exercise divisible by 4

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAevenamin3b.html pe
   :long_name: DFA exercise even a min 3 b

|

HINT: If DFA :math:`M` accepts language :math:`L`, the we can create a
machine to accept the complement of :math:`L` by reversing the final
and non-final states of :math:`M`.
However, that only works on a complete DFA, meaning that we have to
take into account the trap state.

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFACOMPevenamin3b.html pe
   :long_name: Complement even a min 3 b
