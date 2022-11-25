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

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAevenaoddb.html pe
   :long_name: Even number of a's, odd number of b's

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAevenabsoddas.html pe
   :long_name: Even number of a's, b's, odd number of a's

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAbotheo.html pe
   :long_name: DFA exercise both even or both odd

|

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFAnoba.html pe
   :long_name: DFA exercise does not end in ba

|

HINT: If DFA :math:`M` accepts language :math:`L`, the we can create a
machine to accept the complement of :math:`L` by reversing the final
and non-final states of :math:`M`.
However, that only works on a complete DFA, meaning that we have to
take into account the trap state.

.. avembed:: AV/OpenFLAP/exercises/FLAssignments/FA/DFACOMPnoba.html pe
   :long_name: DFA exercise does not end in ba
