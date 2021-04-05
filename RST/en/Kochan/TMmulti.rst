.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Ko Yat Chan
   :satisfies: TM Module
   :topic: TM Support

Create Multi-tape TM SS
=================
Visualization of a Multi-tape TM
------------------------

.. inlineav:: TMmulti ss
   :links: AV/Kochan/TMmulti.css
   :scripts: AV/Kochan/TMmulti.js lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js DataStructures/PIFrames.js
   :output: show


.. inlineav:: TMmulti ss
   :links: AV/Kochan/TMmulti.css
   :scripts: AV/Kochan/TMmulti.js lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js DataStructures/PIFrames.js
   :output: show

.. inlineav:: TMmulti ss
   :links: AV/Kochan/TMmulti.css
   :scripts: AV/Kochan/TMmulti.js lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js DataStructures/PIFrames.js
   :output: show

.. inlineav:: ProofOfWork ss
   :long_name: ProofOfWork Slideshow
   :links: AV/Blockchain/ProofOfWork.css
   :scripts: AV/Blockchain/ProofOfWork.js
   :output: show

.. inlineav:: Proof1NonRegularCON ss
   :long_name: Proof 1 Non-Regular Grammar Slideshow
   :links: AV/VisFormalLang/NonReg/Proof1NonRegularCON.css
   :scripts: AV/VisFormalLang/NonReg/Proof1NonRegularCON.js
   :output: show

.. inlineav:: LinearRecurrencesCON ss
   :long_name: Linear Recurrences Slideshow
   :links: AV/Background/LinearRecurrencesCON.css
   :scripts: AV/Background/LinearRecurrencesCON.js
   :output: show

.. inlineav:: SalesCON dgm
   :links: AV/NP/SalesCON.css
   :scripts: AV/NP/SalesCON.js
   :align: center

.. topic:: Example

   Compute :math:`f(n) = n + 1` for any :math:`n \in \mathbb{N}`.

   .. math::

      \begin{array}{lll}
      \hline
      q&\sigma&\delta(q, \sigma)\\
      \hline
      q_0&I&(q_0, I, R)\\
      q_0&\#&(h, I, R)\\
      \end{array}

   An example computation:

   .. math::

      (q_0, \#\underline{I}I\#) \vdash_M (q_0, \#I\underline{I}\#) \vdash_M
      (q_0, \#II\underline{\#}) \vdash_M (h, \#III\underline{\#}).

   .. inlineav:: TMPlusoneCON ss
      :long_name: Turing Machine Replace
      :links: DataStructures/FLA/FLA.css AV/VisFormalLang/TM/TMPlusoneCON.css
      :scripts: lib/underscore.js DataStructures/FLA/FA.js AV/Development/formal_language/TuringMachine.js AV/VisFormalLang/TM/TMPlusoneCON.js
      :align: center
      :output: show

   In general,
   :math:`(q_0, \#\underline{I^n}\#) \vdash^*_M (h, \#I^{n+1}\underline{\#})`.
   What about :math:`n = 0`?
   The input is no marks in unary, and it works OK (that is, the
   result is the head to the right of a single mark).

.. inlineav:: NFA2DFAlargeExFS ff
   :links: AV/PIFLA/FA/NFA2DFAlargeExFS.css
   :scripts: DataStructures/FLA/FA.js DataStructures/PIFrames.js AV/PIFLA/FA/NFA2DFAlargeExFS.js
   :output: show
