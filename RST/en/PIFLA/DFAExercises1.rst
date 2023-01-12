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

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAodda.html pe
   :long_name: Odd number of a's

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAoddaevenb.html pe
   :long_name: Odd number of a's, even number of b's

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAodda3b.html pe
   :long_name: Odd number of a's, at most 3 b's

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAno3a.html pe
   :long_name: No string with 3 consecutive a's

|

HINT: If DFA :math:`M` accepts language :math:`L`, the we can create a
machine to accept the complement of :math:`L` by reversing the final
and non-final states of :math:`M`.
However, that only works on a complete DFA, meaning that we have to
take into account the trap state.

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFACOMPno3a.html pe
   :long_name: Complement no string with 3 consecutive a's
