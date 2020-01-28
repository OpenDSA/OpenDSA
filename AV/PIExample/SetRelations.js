$(document).ready(function () {
    "use strict";
    var av_name = "SetRelations";
    var av = new JSAV(av_name);
    var injector = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({ av_name: av_name }),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;

    //av.umsg("Relations"); //not the title just for an example
    //av.umsg("Test222222222`");
    
    av.displayInit();
    av.umsg(injector.injectQuestion("q1", "A $relation$ $R$ over set $S$ is a set of ordered pairs from $S$."));
    //av.step();
    ////
    av.umsg(injector.injectQuestion("q2", "If tuple $⟨x,y⟩$ is in relation $R$, we may use the infix notation $xRy$. We often use relations such as the less than operator ($<$) on the natural numbers"));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q3", "Rather than writing the relationship in terms of ordered pairs, we typically use infix notation for such relations"));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q4", "Define the properties of relations as follows, with $R$ a binary relation over set $S$. 1- $R$ is $reflexive$ if $aRa$ for all $a$ ∈ $S$."));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q5", "Define the properties of relations as follows, with $R$ a binary relation over set $S$. 2- $R$ is $irreflexive$ if $aRa$ is not true for all $a$ ∈ $S$."));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q6", "Define the properties of relations as follows, with $R$ a binary relation over set $S$. 3- $R$ is $symmetric$ if whenever $aRb$, then $bRa$, for all $a$,$b$ ∈ $S$."));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q7", "Define the properties of relations as follows, with $R$ a binary relation over set S. 4- $R$ is $antisymmetric$ if whenever $aRb$ and $bRa$, then $a$ $=$ $b$, for all $a,b$ ∈ $S$"));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q8", "Define the properties of relations as follows, with $R$ a binary relation over set S. 5- $R$ is $transitive$ if whenever $aRb$ and $bRc$, then $aRc$, for all $a,b,c$ ∈ $S$."));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q9", "$R$ is an $equivalence$ $relation$ on set $S$ if it is reflexive, symmetric, and transitive."));
    av.step();
    ////
    av.umsg(injector.injectQuestion("q10", "An equivalence relation can be used to partition a set into $equivalence$ $classes$. If two elements $a$ and $b$ are equivalent to each other, we write $a$ ≡ $b$."));
    av.step();
    ////
    av.umsg("A $partition$ of a set $S$ is a collection of subsets that are $disjoint$ from each other and whose union is $S$. An $equivalence$ $relation$ on set $S$ partitions the set into disjoint subsets whose elements are equivalent. ");
    av.step();
    av.umsg("The $UNION$ / $FIND$ algorithm efficiently maintains equivalence classes on a set. One application for such $disjoint$ $sets$ is the $minimal$ $cost$ $spanning$ $tree$.");
    av.step();
    ////
    av.umsg(injector.injectQuestion("q11", " For the set of integers, use the modulus function to define a binary relation such that two numbers $x$ and $y$ are in the relation if and only if $x$ mod $m$ = $y$ mod $m$"));
    av.step();
    ////
    //frame title practicing Equivalence Relations Exercise
    av.umsg("Practicing Equivalence Relations Exercise");
    av.step();
    //is this the right title?
    ////
    av.umsg(injector.injectQuestion("q12", " A binary relation is called a partial order if it is antisymmetric and transitive."));
    av.step();
    ////
    av.umsg("Practicing: Partial Ordering");    
    av.step();
    ////
    av.umsg("A relation is called $non-strict$ $partial$ $order$ if it is a partial order relation and reflexive in the same time.")
    av.step();

    av.umsg("A relation is called $strict$ $partial$ $order$ If the relation is $irreflexive$ and partial order.");
    av.step();

    av.umsg("The set on which the partial order is defined is called a $partially$ $ordered$ $set$ or a $poset$.");
    av.step();

    av.umsg("Elements x and y of a set are $comparable$ under a given relation R if either xRy or yRx. Example: For the powerset of the integers, the subset operator defines a partial order (because it is antisymmetric and transitive). For example, {1,2}⊆{1,2,3}. However, sets {1, 2} and {1, 3} are not comparable by the subset operator, because neither is a subset of the other.");
    av.step();

    av.umsg("If every pair of distinct elements in a partial order are comparable, then the order is called a $total$ $order$ or $linear$ $order$.")
    av.step();



    av.recorded();
});
