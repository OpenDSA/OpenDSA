.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy, Tom Naps and Taylor Rydahl


========
GLOSSARY
========


.. glossary::
   :sorted:

   alpha
      The name of the Greek letter :math:`\alpha` (lowercase) or
      :math:`A` (uppercase), corresponding to the letter "a".

   bnf grammar
      A BNF grammar is...

   binding occurrence
      A binding occurrence is the place in a program where a variable is
      bound to its name (or identifier). In modern programming languages,
      a binding occurrence is the same as a declaration of the variable.
      In lambda calculus, a binding occurrence for, say, the variable 
      :math:`x`, is any sub-expression equal to :math:`\lambda x.`
 
   bound
      In a lambda expression, a variable occurrence is bound or
      occurs bound if it belongs to the scope of a binding occurrence
      of that variable.

   free
      In a lambda expression, a variable occurrence is free or
      occurs free if it is not bound in that expression.

   function abstraction 
      In lambda calculus, a function abstraction (or lambda
      abstraction) is synonymous with a function definition that
      contains the name of the formal parameter and the body of the
      function.

   lambda 

      The name of the Greek letter :math:`\lambda` (lowercase) or
      :math:`\Lambda` (uppercase), corresponding to the letter "L".

   lambda abstraction
      Synonym for :term:`function abstraction`.

   scope
      Abbreviation for :term:`variable scope`

   variable scope
      The scope of a variable declaration (or binding occurrence) in a
      program is the collection of all parts of the program (that is,
      the lines of code) in which this variable is accessible via
      its name or identifier.
           
      
   variable capture
      A free variable occurrence is captured when it becomes bound following 
      the renaming of some other variable occurrence.
