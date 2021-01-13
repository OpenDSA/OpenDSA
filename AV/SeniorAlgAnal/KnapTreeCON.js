// Written by Abhishek Jha and Cliff Shaffer, Fall 2020
$(document).ready(function() {
  "use strict";
  var av_name = "KnapTreeCON";
  var av = new JSAV(av_name);
  var val;
  var knaptree = av.ds.tree({nodegap: 20});

  av.label("<b>if</b> P($n-1$, $K$) has a solution,", {left: 0, top: -10});
  av.label("<b>then</b> P($n$, $K$) has a solution", {left: 10, top: 10});
  av.label("<b>else if</b> P($n-1$, $K-k_n$) has a solution", {left: 10, top: 30});
  av.label("<b>then</b> P($n$, $K$) has a solution", {left: 20, top: 50});
  av.label("<b>else</b> P($n$, $K$) has no solution", {left: 20, top: 70});

  av.label("$k_4 = 1$", {left: 750, top: 5});
  av.label("$k_3 = 4$", {left: 750, top: 58});
  av.label("$k_2 = 7$", {left: 750, top: 111});
  av.label("$k_1 = 2$", {left: 750, top: 164});
  av.label("$k_0 = 9$", {left: 750, top: 217});

  // Slide 1
  // 4,10
  av.umsg("Let's see how the knapsack algorithm works. We start by trying to solve the value problem for a knapsack of size 10, with all items available in indices 0 to 4. So the initial problem is P(4, 10).");
  knaptree.root("4");
  val = "4,10" + "<br>" + "?" ;
  knaptree.root().value(val);
  knaptree.layout();
  av.displayInit();

  // Slide 2
  // 3,10
  av.umsg("Solving that problem requires solving some subproblems. We start by tring to solve the problem <b>without</b> the item in index 4. In other words, we need now to solve the problem for knapsack size 10, using items in indices 0 through 3. This is P(3, 10).");
  knaptree.root().addChild("3");
  val = "3,10"  + "<br>" + "?" ;
  knaptree.root().child(0).value(val);
  knaptree.layout();
  knaptree.layout();
  av.step();

  // Slide 3
  // 2,10
  av.umsg("Likewise, we recursively call to solve the subproblems P(2, 10), P(1, 10), and P(0, 10).");
  knaptree.root().child(0).addChild("2");
  val = "2,10" + "<br>" + "?" ;
  knaptree.root().child(0).child(0).value(val);

  // 1,10
  knaptree.root().child(0).child(0).addChild("1");
  val = "1,10" + "<br>" + "?" ;
  knaptree.root().child(0).child(0).child(0).value(val);

  // 0,10
  knaptree.root().child(0).child(0).child(0).addChild("0");
  val = "0,10" + "<br>" + "?" ;
  knaptree.root().child(0).child(0).child(0).child(0).value(val);
  knaptree.layout();
  av.step();

  // Slide 4
  av.umsg("Of course, this is a base case since we are simply asking the question: Does the item with size 9 fill the knapsack? The answer is no, so the return value is 'no solution' (represented by '-').");
  val = "0,10" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(0).child(0).value(val);
  knaptree.layout();
  av.step();

  // Slide 5
  // 0,8
  av.umsg("So now we can make the second recursive call for P($n-1$, $K-k_n$). This is asking whether there is a solution using the item at index 0 if we have used the item at index 1 (this is value 2). So the call is to P(0, 8).");
  knaptree.root().child(0).child(0).child(0).addChild("0");
  val = "0,8" + "<br>" + "?" ;
  knaptree.root().child(0).child(0).child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 6
  av.umsg("Since we cannot use the item at index 0 (value 9) to fill a knapsack of size 8, the return value is 'no solution'.");
  val = "0,8" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 7
  av.umsg("Popping the recursion back to node (1, 10), we now have found that both subproblems fail to solve the problem. So the result returned for P(1, 10) is again 'no solution'.");
  val = "1,10" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(0).value(val);
  knaptree.layout();
  av.step();

  // Slide 8
  av.umsg("Likewise, to complete solving the problem at P(2, 10) requires solving the problem for P($n-1$, $K - k_n$). Since the item at index 2 has size 7, this means that we need to solve the problem for P(1, 10-7) = P(1, 3).");
  //1,3
  knaptree.root().child(0).child(0).addChild("1");
  val = "1,3" + "<br>" + "?" ;
  knaptree.root().child(0).child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 9
  av.umsg("Unfortunately, filling out the recursion tree for P(1, 3) results in no solution. So ultimately, P(2, 10) also has no solution.");

  // 0,3
  knaptree.root().child(0).child(0).child(1).addChild("0");
  val = "0,3" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(1).child(0).value(val);

  // 0,1
  knaptree.root().child(0).child(0).child(1).addChild("0");
  val = "0,1" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(1).child(1).value(val);
  knaptree.layout();

  val = "1,3" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).child(1).value(val);

  val = "2,10" + "<br>" + "-" ;
  knaptree.root().child(0).child(0).value(val);

  av.step();

  // Slide 10
  av.umsg("Popping the recursion stack back to (3, 10), we now need to solve the second subproblem. Since the item at index 3 has value 4, this will be P(2, 6).");
  // 2,6
  knaptree.root().child(0).addChild("2");
  val = "2,6" + "<br>" + "?" ;
  knaptree.root().child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 11
  av.umsg("Ultimately, there are no solutions down this branch either.");
  val = "3,10"  + "<br>" + "-" ;
  knaptree.root().child(0).value(val);

  val = "2,6" + "<br>" + "-" ;
  knaptree.root().child(0).child(1).value(val);

  // 1,6
  knaptree.root().child(0).child(1).addChild("1");
  val = "1,6" + "<br>" + "-" ;
  knaptree.root().child(0).child(1).child(0).value(val);

  // 0,6
  knaptree.root().child(0).child(1).child(0).addChild("0");
  val = "0,6" + "<br>" + "-" ;
  knaptree.root().child(0).child(1).child(0).child(0).value(val);

  // 0,4
  knaptree.root().child(0).child(1).child(0).addChild("0");
  val = "0,4" + "<br>" + "-" ;
  knaptree.root().child(0).child(1).child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 12
  av.umsg("Now we are ready to attempt the second subproblem for (4, 10). This involves solving the subproblem P($n-1$, $K-k_n$). Since the item at index 4 has value 1, this requires solving the problem P(3, 9).");
  // 3,9
  knaptree.root().addChild("3");
  val = "3,9" + "<br>" + "?" ;
  knaptree.root().child(1).value(val);
  knaptree.layout();
  av.step();

  // Slide 12
  av.umsg("Again we work our way down the recursion tree until we reach a base case at P(0, 9).");
  // 2,9
  knaptree.root().child(1).addChild("2");
  val = "2,9" + "<br>" + "?" ;
  knaptree.root().child(1).child(0).value(val);

  // 1,9
  knaptree.root().child(1).child(0).addChild("1");
  val = "1,9" + "<br>" + "?" ;
  knaptree.root().child(1).child(0).child(0).value(val);

  // 0,9
  knaptree.root().child(1).child(0).child(0).addChild("0");
  val = "0,9" + "<br>" + "?" ;
  knaptree.root().child(1).child(0).child(0).child(0).value(val);
  knaptree.layout();
  av.step();

  // Slide 12
  av.umsg("This time, when we go to solve P(0, 9), there is a solution since we are trying to fill a knapsack of size 9 with an item of size 9. So the return value is a successful solution using the value 9.");
  val = "0,9" + "<br>" + "9" ;
  knaptree.root().child(1).child(0).child(0).child(0).value(val);
  knaptree.layout();
  av.step();

  // Slide 13
  av.umsg("Now we can unwind the recursion stack to propogate the solution upwards.");

  val = "1,9" + "<br>" + "9" ;
  knaptree.root().child(1).child(0).child(0).value(val);

  val = "2,9" + "<br>" + "9" ;
  knaptree.root().child(1).child(0).value(val);

  val = "3,9" + "<br>" + "9" ;
  knaptree.root().child(1).value(val);
  
  val = "4,10" + "<br>" + "10" ;
  knaptree.root().value(val);
  knaptree.layout();
  av.step();

  // Slide 14
  av.umsg("If the goal were only to solve the problem, we would now be done.");
  av.step();

  // Slide 15
  av.umsg("But, let's fill out the rest of the tree to find if there are any alternate solutions.");
  
  // 0,7
  knaptree.root().child(1).child(0).child(0).addChild("0");
  val = "0,7" + "<br>" + "-" ;
  knaptree.root().child(1).child(0).child(0).child(1).value(val);

  // 1,2
  knaptree.root().child(1).child(0).addChild("1");
  val = "1,2" + "<br>" + "2" ;
  knaptree.root().child(1).child(0).child(1).value(val);

  // 0,2
  knaptree.root().child(1).child(0).child(1).addChild("0");
  val = "0,2" + "<br>" + "-" ;
  knaptree.root().child(1).child(0).child(1).child(0).value(val);

  // 0,0
  knaptree.root().child(1).child(0).child(1).addChild("0");
  val = "0,0" + "<br>" + "0" ;
  knaptree.root().child(1).child(0).child(1).child(1).value(val);

  // 2,5
  knaptree.root().child(1).addChild("2");
  val = "2,5" + "<br>" + "-" ;
  knaptree.root().child(1).child(1).value(val);

  // 1,5
  knaptree.root().child(1).child(1).addChild("1");
  val = "1,5" + "<br>" + "-" ;
  knaptree.root().child(1).child(1).child(0).value(val);

  // 0,5
  knaptree.root().child(1).child(1).child(0).addChild("0");
  val = "0,5" + "<br>" + "-" ;
  knaptree.root().child(1).child(1).child(0).child(0).value(val);

  // 0,3
  knaptree.root().child(1).child(1).child(0).addChild("0");
  val = "0,3" + "<br>" + "-" ;
  knaptree.root().child(1).child(1).child(0).child(1).value(val);
  knaptree.layout();
  av.step();

  av.umsg("This reveals an alternate solution by using the items in indices 1 and 2 (values 2 and 7) instead of the one at index 0 (value 9).");
  av.recorded();
});
