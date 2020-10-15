$(document).ready(function() {
  "use strict";
  var av_name = "FibTreeCON";
  var av = new JSAV(av_name);
  var fib = [1,1,2,3,5,8,13]
  var val;
  var fibtree = av.ds.tree({nodegap: 20});

  // Slide 1
  fibtree.root("7");
  val = "7" + "<br>" + "-" ;//fib[6].toString();
  fibtree.root().value(val);
  fibtree.layout();
  av.umsg("Let's see how the recursive process works when we compute the value for Fib(7). We will build a tree showing the recursive function calls that take place. In each node, the top half (in blue) shows the parameter values on the recursive call, while the bottom half (in red) shows the return value for the call. So, the root of the tree represents the initial call to the function with an input of 7.");
  av.displayInit();

  // Slide 2
  fibtree.root().addChild("6");
  val = "6" + "<br>" + "-" ;// fib[4].toString();
  fibtree.root().child(0).value(val);
  av.umsg("To compute Fib(7), the algorithm will make recursive calls to compute Fib(6) and Fib(5). We start with the first call to Fib(6).");
  fibtree.layout();
  av.step();

  // Slide 3
  fibtree.root().child(0).addChild("5");
  val = "5" + "<br>" + "-" ;//fib[2].toString();
  fibtree.root().child(0).child(0).value(val);
  av.umsg("To compute Fib(6), we will need to calculate Fib(5) and Fib(4). We first call Fib(5).");
  fibtree.layout();
  av.step();

  // Slide 4
  av.umsg("We continue in this way making recursive calls, until we reach a base-case at Fib(2). This gets computed and returns the value 1.");
  fibtree.root().child(0).child(0).addChild("4");
  val = "4" + "<br>" + "-" ;//fib[3].toString();
  fibtree.root().child(0).child(0).child(0).value(val);
  fibtree.root().child(0).child(0).child(0).addChild("3");
  val = "3" + "<br>" + "-" ;//fib[3].toString();
  fibtree.root().child(0).child(0).child(0).child(0).value(val);
  fibtree.root().child(0).child(0).child(0).child(0).addChild("2");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(0).child(0).child(0).child(0).child(0).value(val);
  fibtree.layout();
  av.step();

  // Slide 5
  av.umsg("Now, to finish computing Fib(3) we have to also calculate Fib(3-2) = Fib(1) by making a recursive call. This is also a base-case with value 1");
  fibtree.root().child(0).child(0).child(0).child(0).addChild("2");
  val = "1" + "<br>" + fib[0].toString();
  fibtree.root().child(0).child(0).child(0).child(0).child(1).value(val);
  fibtree.layout();
  av.step();

  // Slide 6
  av.umsg("At this point, the recusion process pops back up to sum the two values from the subproblems for Fib(3). We get Fib(3) = Fib(3-1) + Fib(3-2) = 1 + 1 = 2");
  val = "3" + "<br>" + fib[2].toString();
  fibtree.root().child(0).child(0).child(0).child(0).value(val);
  fibtree.layout();
  av.step();

  // Slide 7
  av.umsg("Now the recursion pops back to computing Fib(4). This requires making the second recursive call to Fib(4-2) = Fib(2). This will be a base-case again, which returns the value 1. But notice that we already solved this subproblem earlier!");
  fibtree.root().child(0).child(0).child(0).addChild("2");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(0).child(0).child(0).child(1).value(val);
  fibtree.layout();
  av.step();

  // Slide 8
  av.umsg("Now we have the results of both recusive calls needed to compute Fib(4), and can return the value Fib(4) = Fib(4-1) + Fib(4-2) = 2 + 1 = 3");
  val = "4" + "<br>" + fib[3].toString();
  fibtree.root().child(0).child(0).child(0).value(val);
  fibtree.layout();
  av.step();

  // Slide 9
  av.umsg("Popping the recursion stack, we return to computing the solution for Fib(5). To do this, we have to compute Fib(5-2) = Fib(3)... again!");
  fibtree.root().child(0).child(0).addChild("3");
  val = "3" + "<br>" + "-"; // fib[3].toString();
  fibtree.root().child(0).child(0).child(1).value(val);
  fibtree.root().child(0).child(0).child(1).addChild("2");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(0).child(0).child(1).child(0).value(val);
  fibtree.root().child(0).child(0).child(1).addChild("1");
  val = "1" + "<br>" + fib[0].toString();
  fibtree.root().child(0).child(0).child(1).child(1).value(val);
  fibtree.layout();
  val = "3" + "<br>" +  fib[2].toString();
  fibtree.root().child(0).child(0).child(1).value(val);
  fibtree.layout();
  av.step();

  // Slide 10
  av.umsg("Which lets us compute Fib(5) = 5.");
  val = "5" + "<br>" + fib[4].toString();
  fibtree.root().child(0).child(0).value(val);
  fibtree.layout();
  av.step();

  // Slide 11
  av.umsg("Now let's skip ahead to show the state of the tree after we have completed calculating Fib(6) and popped the recursion stack back to the root of the tre. Notice there are a lot of repeating numbers in blue.");
  fibtree.root().child(0).addChild("4");
  val = "4" + "<br>" + "-" ;//fib[2].toString();
  fibtree.root().child(0).child(1).value(val);
  fibtree.root().child(0).child(1).addChild("3");
  val = "3" + "<br>" + "-" ;//fib[2].toString();
  fibtree.root().child(0).child(1).child(0).value(val);
  fibtree.root().child(0).child(1).child(0).addChild("2");
  val = "2" + "<br>" +  fib[1].toString();
  fibtree.root().child(0).child(1).child(0).child(0).value(val);
  fibtree.root().child(0).child(1).child(0).addChild("1");
  val = "1" + "<br>" +  fib[0].toString();
  fibtree.root().child(0).child(1).child(0).child(1).value(val);
  val = "3" + "<br>" + fib[2].toString();
  fibtree.root().child(0).child(1).child(0).value(val);
  fibtree.root().child(0).child(1).addChild("2");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(0).child(1).child(1).value(val);
  val = "4" + "<br>" + fib[3].toString();
  fibtree.root().child(0).child(1).value(val);
  val = "6" + "<br>" + fib[5].toString();
  fibtree.root().child(0).value(val);
  fibtree.layout();
  av.step();

  // Slide 12
  av.umsg("Now we have to calculate Fib(5). Which, by the way, we have calcualted before.");
  fibtree.root().addChild("5");
  val = "5" + "<br>" + "-" ;// fib[4].toString();
  fibtree.root().child(1).value(val);
  fibtree.layout();
  av.step();

  // Slide 13
  av.umsg("Here is the state of the recursion tree after calculating Fib(5).");
  fibtree.root().child(1).addChild("4");
  val = "4" + "<br>" + fib[3].toString();
  fibtree.root().child(1).child(0).value(val);
  fibtree.root().child(1).child(0).addChild("3");
  val = "3" + "<br>" + fib[2].toString();
  fibtree.root().child(1).child(0).child(0).value(val);
  fibtree.root().child(1).child(0).child(0).addChild("1").addChild("0");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(1).child(0).child(0).child(0).value(val);
  val = "1" + "<br>" + fib[0].toString();
  fibtree.root().child(1).child(0).child(0).child(1).value(val);
  fibtree.root().child(1).child(0).addChild("2")
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(1).child(0).child(1).value(val);
  fibtree.root().child(1).addChild("3");
  val = "3" + "<br>" + fib[2].toString();
  fibtree.root().child(1).child(1).value(val);
  fibtree.root().child(1).child(1).addChild("1").addChild("1");
  val = "2" + "<br>" + fib[1].toString();
  fibtree.root().child(1).child(1).child(0).value(val);
  val = "1" + "<br>" + fib[0].toString();
  fibtree.root().child(1).child(1).child(1).value(val);
  val = "5" + "<br>" +  fib[4].toString();
  fibtree.root().child(1).value(val);
  fibtree.layout();
  av.step();

  // Slide 14
  av.umsg("We finally have the pieces needed to compute Fib(7) = Fib(7-1) + Fib(7-2) = 8 + 5 = 13 ");
  val = "7" + "<br>" +  fib[6].toString();
  fibtree.root().value(val);
  fibtree.layout();
  av.recorded();
});
