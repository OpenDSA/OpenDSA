.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-13 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata:: 
   :author: David Furcy and Tom Naps

============================================================================================
Functional Programming - Procedural Abstraction: The Filtering and Folding (Reduce) Patterns 
============================================================================================

   
The Filtering Pattern
---------------------

Consider the following two functions with some samples of their usage.
First a function called *keepPositive*.

::

    // Given a list, return a list with the positive numbers
    var keepPositive = function (ns) {
        if (fp.isNull(ns))
            return [ ];
        else if (fp.isGT(fp.hd(ns),0))
            return fp.cons(fp.hd(ns),
                           keepPositive(fp.tl(ns)));
        else
            return keepPositive(fp.tl(ns));
    }

::

    > keepPositive([-1,1,0,-10,-20,2,3,-30])
    [ 1, 2, 3 ]
    > censor(["Functions","loops","assignments",
              "and","recursion","are","essential"])
    ['Functions','and','recursion','are','essential']


Next a function called *censor*, with its helper *isAcceptable*.
    
::

    // Censor out all unacceptable words in a list of strings
    var censor = function (sentence) {
        if (fp.isNull(sentence))
            return [ ];
        else if (isAcceptable(fp.hd(sentence)))
            return fp.cons(fp.hd(sentence),
                           censor(fp.tl(sentence)));
        else
            return censor(fp.tl(sentence));
    }

    var isAcceptable = function (word) {
        if (fp.isMember(word, [ "loops", 
                                "assignments", 
                                "side effects" ]))
            return false
        else
            return true;
    }

    > censor(["Functional", "programming", "includes", "functions", "mapping", "loops", "assignments", "side effects", "currying"]);
    [ 'Functional', 'programming', 'includes', 'functions', 'mapping', 'currying' ]


In your own words, try to fill in the following sets of **?????**.
Both the *keepPositive* and *censor* functions take in a **?????** and
return a **?????** that is obtained by **?????**.  Your answers to
these questions will have described a pattern called **filtering**.
The following *filter* function abstracts that pattern.

::

    var filter = function (pred,ns) {
        if (fp.isNull(ns))
            return [ ];
        else if (pred(fp.hd(ns)))
            return fp.cons(fp.hd(ns), 
                           filter(pred,fp.tl(ns)));
        else 
            return filter(pred,fp.tl(ns));
    }

Here are some examples of using the *filter* function to achieve the same results we obtained previously for *keepPositive* and *censor*.
   
::

    > var keepPositive2 = function (ns)  {
                            return filter(function (n) { return fp.isGT(n,0); }, ns); }
    > var keepPositive3 = fp.curry(filter)(function (n) { return fp.isGT(n,0); });
    > keepPositive2([-1,1,0,-10,-20,2,3,-30])      // same output as for keepPositive
    > keepPositive3([-1,1,0,-10,-20,2,3,-30])      // same output as for keepPositive

    > var censor2 = function (words) { return filter(isAcceptable, words); }
    > var censor3 = fp.curry(filter)(isAcceptable)
    > censor2(["Functions","loops","assignments",    // same output as for censor
              "and","recursion","are","essential"])  
    > censor3(["Functions","loops","assignments",    // same output as for censor
              "and","recursion","are","essential"])  


This first problem deals with the filtering pattern.

.. avembed:: Exercises/PL/Filter.html ka
   :long_name: Filtering Pattern


Folding/Reducing
----------------

To discover our next pattern, try to discern what the following *sum* and *count* functions have in common.

::

    // Return the sum of all the numbers in a flat list
    var sum = function (ns) {
        var helper = function (ns,a) {
            if (fp.isNull(ns))
                return a;
            else
                return helper(fp.tl(ns), 
                              fp.add(a,fp.hd(ns)));
        }
        return helper(ns,0);
    }

    > sum([1,2,3])
    6

::

    // Return a count of how many times n occurs in the list ns
    var count = function (n,ns) {
      var helper = function (ns,a) {
          if (fp.isNull(ns))
              return a;
          else
              return helper(fp.tl(ns),
                            fp.add(a, 
                                   fp.isEq(fp.hd(ns),n)
                                        ? 1 
                                        : 0));
        }
        return helper(ns,0);
    }
    
    > count(-1,[-1,0,1,2,-1,-1])
    3
    

Next, in your own words, try to fill in the following sets of **?????**.
Both *helper* functions in *sum* and *count*  start out with a
**?????** and a **?????** and return a **?????** that is obtained by **?????**.
Your answers to
these questions will have described a pattern called **folding** or *reducing**.
The following *reduce* function abstracts that pattern.

::

    var reduce = function (f,ns,acc) {
        if (fp.isNull(ns))
            return acc;
        else 
            return reduce(f,fp.tl(ns),f(acc,fp.hd(ns)));
    }

Next we show how to use *reduce* to create the *sum* and *count*
functions that we previously had to write ourselves.
    
::

    > var sum2 = function (ns) { return reduce(fp.add,ns,0); }
    > var count2 = function (n,ns) { 
                         return reduce(function(a,x) { 
                                            return fp.add(a,fp.isEq(x,n) ? 1 : 0); },
                                       ns, 0); }

    > sum2([1,2,3])                    // same output as with sum
    > count2(-1,[-1,0,1,2,-1,-1])      // same output as with count

.. Could we curry the reduce function?


Following are four additional examples of how the *reduce* function can be used.   
   
1. Here is a non-recursive definition of the factorial function that
   uses reduce and the *fillIn* function defined in Section 2.6.

::

   var factorial = function (n) { return reduce(fp.mul,fillIn(1,n),1); }

2. How would you rewrite the function that takes in a list and returns
   its length?

::
      
   var length = function (ns) { return reduce( ???, ???, ???); }

3. How would you rewrite the function that takes in a list and reverses
   it?

::   

   var reverse = function (ns) { return reduce( ???, ???, ???); }

4. What does this function do?

::   

   var figureItOut = function (l1,l2) {
          return reduce( function(a,n) { return fp.cons(n,a); }, l1, l2); 
   };


**Reducing from the right:** Whereas the *reduce* function we have defined applies its helper
function *f* to produce the accumulated value *acc* in left-to-right
order as it works through the list, we could also define a similar
function that applied the helper function in right-to-left fashion as
it worked through the list.

::

    var reduceRight = function (f,ns,acc) {
        if (fp.isNull(ns))
            return acc;
        else 
            return f( fp.hd(ns), reduceRight(f,fp.tl(ns),acc) );
    }

So, the expression :math:`1 - (2 - (3 - (4 - 5)))` can be computed as
follows:

::

   subtractFromRight([1,2,3,4,5])

if the function *substractFromRight* is defined as follows (what should the **???** be):

::

         var subtractFromRight = function (ns) { return reduceRight( ??? ,ns,0); }

Simlarly, *reduceRight* is exactly what we need to build the *append* function:

::

         var append = function (l1,l2) { return reduceRight(fp.cons, l1, l2); };


This problem deals with the folding pattern.

.. avembed:: Exercises/PL/Reduce1.html ka
   :long_name: Reducing 1


Folding/Reducing (2)
--------------------

This problem uses both the mapping and the folding patterns.

.. avembed:: Exercises/PL/Reduce2.html ka
   :long_name: Reduce and Map


Folding/Reducing (3)
--------------------

This problem will give you intensive practice with the folding
pattern. This problem is randomized and must be solved three times in
a row.

.. avembed:: Exercises/PL/Reduce3.html ka
   :long_name: Reducing 3
