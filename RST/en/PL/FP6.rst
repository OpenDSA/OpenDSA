.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

========================================================================
Functional Programming - Procedural Abstraction: Map, Curry, and Compose
========================================================================

The Mapping Pattern
-------------------

**Abstraction** is one of the most powerful tools in programming. But
what is it?  Let's begin getting our head around this notion by
considering the following two examples called *addBonusPoint* and *doubleAll* .

.. 
.. ::
.. 
..     var add1 = function (x) { 
..                      return fp.add(x,1); };
..     var addBonusPoint = function (ns) {
..       if (fp.isNull(ns))
..           return [ ];
..       else
..           return fp.cons( 
..                    add1(fp.hd(ns)),
..                    addBonusPoint(fp.tl(ns)));
..     }
..     addBonusPoint( [1,2,3,4,5] );
.. 
.. ::
.. 
..     var doubleIt = function (x) { 
..                      return fp.add(x,x); };
..     var doubleAll = function (ns) {
..       if (fp.isNull(ns))
..           return [ ];
..       else
..           return fp.cons( 
..                    doubleIt(fp.hd(ns)), 
..                    doubleAll(fp.tl(ns)));
..     }
..     doubleAll( [1,2,3,4,5] );
.. 
.. 
.. 
..     
.. Both *addBonusPoint* and *doubleAll* use very similar patterns of
.. computation.  Given a list, they return a new list by applying a
.. function to every element of the given list.  How can we lift this
.. pattern of computation to a level where we can write it once and be
.. done with it?
.. 
.. ::
.. 
..     var doubleIt = function (x) { return fp.add(x,x); };
..     var map = function (f,ns) {
..       if (fp.isNull(ns))
..           return [ ];
..       else
..           return fp.cons(
..                      f(fp.hd(ns)), 
..                      map(f, fp.tl(ns)));
..     }
..     map( doubleIt, [1,2,3,4,5] );
..     map( function (x) { return x+1; }, [1,2,3,4,5] );


.. inlineav:: FP6Code1CON ss
   :long_name: Illustrate Mapping Pattern
   :links: AV/PL/FP/FP6CON.css
   :scripts: AV/PL/FP/FP6Code1CON.js
   :output: show

This pattern of computation in the preceding example is called the
**mapping pattern**: it takes a function and a list and returns the
list obtained by applying the function to each element in the input
list.  This problem is about the mapping pattern.

.. avembed:: Exercises/PL/Map.html ka
   :long_name: Mapping Pattern

   
Function Composition
--------------------

The next example of abstraction we will consider is called function
composition.  We want a function called *compose* that takes in two
functions *f* and *g* and returns the function that first applies *g* to its
argument and then applies *f* to that result. In other words:

.. math::

   h(x) = (f \circ g)(x) = f( g(x) )  

::

    var compose = function (f,g) {

           return ?????
    }

Once you've completed the *compose* function, use it to compose the
*doubleIt* function with the *add1* function and apply the resulting
function *h* to the value 2.

::

   > var h = ???
   > h(2)  // returns ???

This next problem is about function composition.

.. avembed:: Exercises/PL/Compose.html ka
   :long_name: Function Composition

