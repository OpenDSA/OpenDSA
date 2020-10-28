/*global PIFRAMES */
/* Written by Eunoh Cho, Cliff Shaffer */
$(document).ready(function () {
  "use strict";
  var av_name = "EquivFS";
  var av = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  // Frame 1
  av.umsg("An <b>equivalence relation</b> is an especially important type of rlation. Relation $R$ on set $S$ is an equivalence relation if it is reflexive, symmetric, and transitive. An equivalence relation can be viewed as partitioning a set into <b>equivalence classes</b>. If two elements $a$ and $b$ are equivalent to each other, we write $a \\equiv b$. A <b>partition</b> of a set $S$ is a collection of subsets that are <b>disjoint</b> from each other (that is, they share no elements) and whose union is $S$. An <b>equivalence relation</b> on $S$ partitions the set into disjoint subsets whose elements are equivalent. The UNION/FIND algorithm efficiently maintains equivalence classes on a set. Two graph algorithms that make use of disjoint sets is <b>connected component</b> finding and computing a <b>minimal cost spanning tree</b>.");
  av.step();

  // Frame 2
  av.umsg(Frames.addQuestion("equivalent"));
  av.step();

  // Frame 3
  av.umsg(Frames.addQuestion("eqclass"));
  av.step();

  // Frame 4
  av.umsg("For the integers, $=$ is an equivalence relation that partitions each element into a distinct subset. In other words, for any integer $a$, three things are true. (1) $a = a$, (2) if $a = b$ then $b = a$, and (3) if $a = b$ and $b = c$, then $a = c$.<br/><br/>Of course, for distinct integers $a, b,$ and $c$, there are never cases where $ a = b$, $b = a$, or $b = c$. So the requirements for symmetry and transitivity are never violated, and therefore the relation is symmetric and transitive.");
  av.step();

  // Frame 5
  av.umsg(Frames.addQuestion("mod"));
  av.step();
  
  // Frame 20
  av.umsg("A binary relation is called a <b>partial order</b> if it is antisymmetric and transitive. If the relation is reflexive, it is called a <b>non-strict partial order</b>. If the relation is irreflexive, it is called a <b>strict partial order</b>. The set on which the partial order is defined is called a <b>partially ordered set</b> or a <b>poset</b>. Elements $x$ and $y$ of a set are <b>comparable</b> under a given relation $R$ if either $xRy$ or $yRx$. If every pair of distinct elements in a partial order are comparable, then the order is called a <b>total order</b> or <b>linear order</b>.");
  av.step();

  // Frame 21
  av.umsg(Frames.addQuestion("partorder"));
  av.step();

  // Frame 22
  av.umsg("For the integers, relations $<$ and $\\leq$ define partial orders. Operation $<$ is a total order because, for every pair of integers $x$ and $y$ such that $x \\neq y$, either $x < y$ or $y < x$. Likewise, $\\leq$ is a total order because, for every pair of integers $x$ and $y$ such that $x \\neq y$, either $x \\leq y$ or $y \\leq x$.");
  av.step();

  // Frame 23
  av.umsg("For the powerset of the integers, the subset operator defines a partial order (because it is antisymmetric and transitive). For example, $\\{1, 2\\} \\subseteq \\{1, 2, 3\\}$. However, sets $\\{1, 2\\}$ and $\\{1, 3\\}$ are not comparable by the subset operator, because neither is a subset of the other. Therefore, the subset operator does not define a total order on the powerset of the integers.");
  av.step();

  // Frame 24
  av.umsg("Congratulations! Frameset completed.");
  av.recorded();
});
  
