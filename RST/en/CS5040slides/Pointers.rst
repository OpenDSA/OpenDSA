.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer

.. slideconf::
   :autoslides: False

====================
Pointer Manipulation
====================

Pointer Manipulation
--------------------

.. TODO::
   
   | Lesson Plan for Today:
   |    Chance to catch up if AlgAnal not completed last time
   |    Present basics on pointer manipulation
   |    Provide opportunity to discuss P1, based on student questions

   | Relationship to CSOs:
   |    CSO...

.. slide:: Model for Computer Memory (1)

   * Just a bunch of bytes, that might get clumped as "words"
  
     .. inlineav:: num42CON dgm
        :links: AV/Pointers/num42CON.css
        :scripts: AV/Pointers/num42CON.js
        :align: center


.. slide:: Model for Computer Memory (2)

   | From there, its all interpretation.
   |   ASCII vs Integer
   |   A "pointer" or "reference" is just an index to a byte in memory

   .. inlineav:: memoryModelCON dgm
      :links: AV/Pointers/memoryModelCON.css
      :scripts: AV/Pointers/memoryModelCON.js
      :align: center


.. slide:: Reference Variables (1)

   * In Java::

     Employee empRef;

   * Techically this has no value (though Java will **try** to protect
     you from using an unitialized variable).

     .. inlineav:: empRefnullCON dgm
        :links: AV/Pointers/empRefnullCON.css
        :scripts: AV/Pointers/empRefnullCON.js
        :align: center

.. slide:: Reference Variables (2)

   * Assignment::
    
     empRef = new Employee("John", 1000);
        
     .. inlineav:: employeeEmpRefCON dgm
        :links: AV/Pointers/employeeEmpRefCON.css
        :scripts: AV/Pointers/employeeEmpRefCON.js
        :align: center

   * Everyone's favorite bug: pointers not pointing in the right place.


.. slide:: Shallow vs. Deep Copy

   .. inlineav:: shallowdeepCON dgm
      :links: AV/Pointers/shallowdeepCON.css
      :scripts: AV/Pointers/shallowdeepCON.js
      :align: center


.. slide:: Local/Stack Memory vs. Heap Memory

   * The local memory or stack is for variables allocated for a given
     method.

      * As methods are called and then completed, this stack adds and
        removes variables in memory

   * Heap Memory

     * This is space allocated by ``new``
     * Just a memory manager!
     * **Warning!** Two meanings of the term "heap"
