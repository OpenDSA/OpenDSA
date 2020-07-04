.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

========================================================================
Procedural Abstraction: Map, Curry, and Compose
========================================================================

The Mapping Pattern
-------------------

**Abstraction** is one of the most powerful tools in programming. But
what is it?  Let's begin getting our head around this notion by
considering the following two examples called *addBonusPoint* and *doubleAll*.

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
list.  The following problem is about the mapping pattern.

.. avembed:: Exercises/PL/Map.html ka
   :long_name: Mapping Pattern

   
Function Composition
--------------------

The next example of abstraction we will consider is called function
composition.  We want a function called *compose* that takes in two
functions *f* and *g* and returns the function that first applies *g* to its
argument and then applies *f* to that result. In other words:

.. math::

   compose(f,g)(x) = (f \circ g)(x) = f( g(x) )  

Note that the function :math:`f \circ g` is sometimes called "f after g" or "f
following g" because, when the two functions are composed in this
order, *g* is applied first and *f* second. In contrast, in the
composed function :math:`g \circ f`, read "g after f", *f* would be
applied first and *g* second.

 
.. inlineav:: FP6Code2CON ss
   :long_name: Illustrate Function Composition
   :links: AV/PL/FP/FP6CON.css
   :scripts: AV/PL/FP/FP6Code2CON.js
   :output: show



The following problem is about function composition.

.. avembed:: Exercises/PL/Compose.html ka
   :long_name: Function Composition

.. _currying:

Currying
--------

In the *map* function we developed earlier::

      var map = function (f,ns) {
      if (fp.isNull(ns))
          return [ ];
      else
          return fp.cons(
                          f(fp.hd(ns)), 
                          map(f, fp.tl(ns))
			);
    };

we cannot separate the computations we want to do on list elements,
for example, "doubling all of the elements of a list" or "incrementing
all of the elements of a list" from their argument list because the
map function needs both of its arguments simultaneously.

Instead, we would like to write a function, *map1* below, that takes
in only a function, for example *doubleIt*, and returns another
function, in our example, the function *doubleAll* that can be applied
in general to all lists of numbers.  *map1* is a function-creating
function whereas *map* is not.

::

    var map1 = function (f) {
      return function (ns) {
         if (fp.isNull(ns))
           return [ ];
         else
           return fp.cons(f(fp.hd(ns)), map1(f)(fp.tl(ns))); 
        };
    };
    var doubleAll = map1(doubleIt);
    doubleAll( [1,2,3,4,5] );

*Currying* is the process of transforming a function that takes two or
more arguments (such as *map*) into a function (such as *map1*) that
takes the first argument and returns another function that takes in
the second argument and returns another function that has the first
argument "wired into it" because of the closure that is created by the
definition of the outer function.   This process is named after renowned logician
`Haskell Curry`_.

.. _Haskell Curry:  https://en.wikipedia.org/wiki/Haskell_Curry

So our *map1* function is a curried version of our *map* function.

We will abstract this currying pattern by writing a function called
*curry* that curries *any* two-argument function:

::

    var curry = function (f) {
       return function (x) {
          return function (y) { 
             return f(x,y); 
          };
       };
    };

Now we no longer need to write *map1* but instead can have *curry*
create it for us.

::

    var map1 = curry(map);

As another example of using *curry*, consider the following *fillIn* function:
    
	       
.. inlineav:: FP6Code3CON ss
   :long_name: Illustrate Currying
   :links: AV/PL/FP/FP6CON.css
   :scripts: AV/PL/FP/FP6Code3CON.js
   :output: show

Although the above example may seem a bit contrived, the importance of
currying cannot be overstated.  It allows us to convert any function of two
arguments into a function of one argument that returns a function of
one argument.   We will return to the importance of doing this in Chapter 3 when
we discuss the lambda calculus.

The next problem is about both currying and function composition.

.. avembed:: Exercises/PL/Curry1.html ka
   :long_name: Curry and compose 1


More currying
-------------

The final problem in this section on procedural abstraction will give
you intensive practice with the ``curry`` and ``compose``
functions. This problem is randomized and must be solved three times
in a row.

.. avembed:: Exercises/PL/Curry2.html ka
   :long_name: Curry and compose 2
