$(document).ready(function () {
    "use strict";
    var av_name = "RelationsFF";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //frame 1
    av.umsg("Now that you know what $set$ is, in this chapter you will learn about $relations$ in $sets$.");
    av.displayInit();
    
    //frame 2
    av.umsg(Frames.addQuestion("q1"));
    av.step();
    
    //frame 3
    av.umsg(Frames.addQuestion("q2"));
    av.step();
    
    //frame 4
    av.umsg(Frames.addQuestion("q3"));
    av.step();
    //frame 5
    av.umsg("The Following frames will define the properties of relations as follows, where $R$ is a binary relation over set $S$");
    av.step();
    //frame 6
    av.umsg(Frames.addQuestion("q4"));
    av.step();
    
    //frame 7
    av.umsg(Frames.addQuestion("q5"));
    av.step();
    
    //frame 8
    av.umsg(Frames.addQuestion("q6"));
    av.step();
    
    //frame 9
    av.umsg(Frames.addQuestion("q7"));
    av.step();

    //frame 10
    av.umsg(Frames.addQuestion("q8"));
    av.step();

    //frame 11
    av.umsg(Frames.addQuestion("q9"));
    av.step();

    //frame 12
    av.umsg(Frames.addQuestion("q10"));
    av.step();

    //frame 13
    av.umsg("A $partition$ of a set $S$ is a collection of subsets that are $disjoint$ from each other and whose union is $S$. An $equivalence$ $relation$ on a set $S$ partitions the set into disjoint subsets whose elements are equivalent. ");
    av.step();

    //frame 14
    av.umsg("The $UNION$ / $FIND$ algorithm efficiently maintains equivalence classes on a set. One application for such $disjoint$ $sets$ is the $minimum$ $cost$ $spanning$ $tree$.");
    av.step();

    //frame 15
    av.umsg(Frames.addQuestion("q11"));
    av.step();
    
    //frame 16
    //frame title practicing Equivalence Relations Exercise
    //av.umsg("Practicing Equivalence Relations Exercise"); //is this the right title?
    //av.step();
    
    //frame 17
    av.umsg(Frames.addQuestion("q12"));
    av.step();

    //frame 18
    //av.umsg("Practicing: Partial Ordering");    
    //av.step();

    //frame 19
    av.umsg("A relation is called $non-strict$ $partial$ $order$ if it is a partial order relation and reflexive in the same time.")
    av.step();

    //frame 20
    av.umsg("A relation is called $strict$ $partial$ $order$ If the relation is $irreflexive$ and partial order.");
    av.step();

    //frame 21
    av.umsg("The set on which the partial order is defined is called a $partially$ $ordered$ $set$ or a $poset$.");
    av.step();

    //frame 22
    av.umsg("Elements x and y of a set are $comparable$ under a given relation R if either xRy or yRx. Example: For the powerset of the integers, the subset operator defines a partial order (because it is antisymmetric and transitive). For example, {1,2}⊆{1,2,3}. However, sets {1, 2} and {1, 3} are not comparable by the subset operator, because neither is a subset of the other.");
    av.step();

    //frame 23
    av.umsg("If every pair of distinct elements in a partial order are comparable, then the order is called a $total$ $order$ or $linear$ $order$.")
    av.step();

    av.recorded();
});
