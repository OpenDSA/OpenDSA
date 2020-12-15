// Written by Abhishek Jha Fall 2020
$(document).ready(function() {
  "use strict";
  var av_name = "MatMulCON";
  var av = new JSAV(av_name);
  var val;
  var multree = av.ds.tree({nodegap: 8});

  av.label("$A = 3 \\times 2 $", {left: 0, top: 0});
  av.label("$B = 2 \\times  4$", {left: 90, top: 0});
  av.label("$C = 4 \\times 2$", {left: 190, top: 0});
  av.label("$D = 2 \\times 5$", {left: 270, top: 0});
  av.label("$E = 5 \\times 3$", {left: 0, top: 50});


  // Slide 1
  av.umsg("Let's see how the Matrix Chain multiplication  algorithm works." +
      " Given a sequence of matrices, our goal is to find the most efficient way to multiply these matrices. " +
      "For example, say we have five matrices with the following dimensions: ");
  multree.root("ABCDE");
  val = "ABCDE" + "<br>" + "?" ;
  multree.root().value(val);
  multree.layout();
  av.displayInit();

  // Slide 2
  av.umsg("We break the problem down into sub-problems." +
        " Here the parentheses indicate that the sub-sequence of matrices have been grouped together for multiplication." +
      " We list every arrangement while remembering that matrix multiplication is not commutative." +
      " Firstly, we find the most efficient way to multiply the sub-sequence BCDE.");
  multree.root().addChild("A(BCDE)");
  val = "A(BCDE)"  + "<br>" + "?" ;
  multree.root().child(0).value(val);
  multree.layout();
  av.step();

  // Slide 3
  av.umsg("Now, we observe that there are three ways to multiply the matrices BCDE, namely: B(CDE), (BC)(DE), and (BCD)E." +
      " Also, (BC)(DE) can be calculated without further division." +
      " BC results in a $2\\times2$ matrix , while DE results in a $2\\times3$ matrix." +
      " Thus, the total number of operations to compute (BC)(DE) are $(2) (4) (2) + (2) (5) (3) + (2) (2) (3) = 58$ ");
  multree.root().child(0).addChild("B(CDE)");
  val = "B(CDE)" + "<br>" + "?" ;
  multree.root().child(0).child(0).value(val);

  multree.root().child(0).addChild("(BC)(DE)");
  val = "(BC)(DE)" + "<br>" + "58" ;
  multree.root().child(0).child(1).value(val);


  multree.root().child(0).addChild("(BCD)E");
  val = "(BCD)E" + "<br>" + "?" ;
  multree.root().child(0).child(2).value(val);
  multree.layout();
  av.step();

  // Slide 4
  av.umsg("Next, CDE can be further multiplied in two different ways, they are C(DE) and (CD)E." +
      " The total number of operations to compute C(DE) are $(2) (5) (3)  + (4) (2) (3) = 54$, " +
      "and for (CD)E are  $(4) (2) (5)  + (4) (5) (3) = 100$. "+
      " Similarly, we can calculate the total operations needed for  B(CD) and (BC)D.");
  multree.root().child(0).child(0).addChild("(C(DE)");
  val = "C(DE)" + "<br>" + "54" ;
  multree.root().child(0).child(0).child(0).value(val);

  multree.root().child(0).child(0).addChild("(CD)E");
  val = "(CD)E" + "<br>" + "100" ;
  multree.root().child(0).child(0).child(1).value(val);

  multree.root().child(0).child(2).addChild("B(CD)");
  val = "B(CD)" + "<br>" + "36" ;
  multree.root().child(0).child(2).child(0).value(val);

  multree.root().child(0).child(2).addChild("(BC)D");
  val = "(BC)D" + "<br>" + "80" ;
  multree.root().child(0).child(2).child(1).value(val);
  multree.layout();
  av.step();

  // Slide 5
  av.umsg("Another way to group the sequence of matrices ABCDE is (AB)(CDE).");
  multree.root().addChild("(AB)(CDE)");
  val = "(AB)(CDE)" + "<br>" + "?" ;
  multree.root().child(1).value(val);
  multree.layout();
  av.step();


  // Slide 6
  av.umsg("Then, we have to compute the most efficient way to multiply the triplet CDE." +
      " But, we have encountered this sub-problem previously! " );
  multree.layout();
  av.step();

  // Slide 7
  av.umsg("Yet, we recalculate the number of operations for C(DE) as $(2)(5)(3)+(4)(2)(3) = 54$" +
      " and (CD)E as $(4)(2)(5)+(4) (5) (3) = 100$." );

  multree.root().child(1).addChild("C(DE)");
  val = "C(DE)" + "<br>" + "54" ;
  multree.root().child(1).child(0).value(val);

  multree.root().child(1).addChild("(CD)E");
  val = "(CD)E" + "<br>" + "100" ;
  multree.root().child(1).child(1).value(val);
  multree.layout();
  av.step();



  // Slide 8
    av.umsg("Additionally, an alternative way to group ABCDE is (ABC)(DE).");
  multree.root().addChild("(ABC)(DE)");
  val = "(ABC)(DE)" + "<br>" + "?" ;
  multree.root().child(2).value(val);
  multree.layout();
  av.step();

  // Slide 9
  av.umsg("Then, we find the most efficient way to compute ABC");
  multree.root().child(2).addChild("A(BC)");
  val = "A(BC)" + "<br>" + "28" ;
  multree.root().child(2).child(0).value(val);

  multree.root().child(2).addChild("(AB)C");
  val = "(AB)C" + "<br>" + "48" ;
  multree.root().child(2).child(1).value(val);

  multree.layout();
  av.step();

  // Slide 10
  av.umsg("Finally, the last way to group ABCDE is (ABCD)E.");
  multree.root().addChild("(ABCD)E");
  val = "(ABCD)E" + "<br>" + "?" ;
  multree.root().child(3).value(val);

  multree.root().child(3).addChild("A(BCD)");
  val = "A(BCD)" + "<br>" + "?" ;
  multree.root().child(3).child(0).value(val);

  multree.root().child(3).addChild("(AB)(CD)");
  val = "(AB)(CD)" + "<br>" + "124" ;
  multree.root().child(3).child(1).value(val);

  multree.root().child(3).addChild("(ABC)D");
  val = "(ABC)D" + "<br>" + "?" ;
  multree.root().child(3).child(2).value(val);

  multree.layout();
  av.step();

  // Slide 11
  av.umsg("The number of operations for (AB)(CD) is  $(3) (2) (4)  + (4) (2) (5) + (3) (4) (5) = 124$. We recalculate  the most efficient way to compute BCD and ABC.");

  multree.root().child(3).child(0).addChild("B(CD)");
  val = "B(CD)" + "<br>" + "36" ;
  multree.root().child(3).child(0).child(0).value(val);

  multree.root().child(3).child(0).addChild("(BC)D");
  val = "(BC)D" + "<br>" + "80" ;
  multree.root().child(3).child(0).child(1).value(val);



  multree.root().child(3).child(2).addChild("A(BC)");
  val = "A(BC)" + "<br>" + "28" ;
  multree.root().child(3).child(2).child(0).value(val);

  multree.root().child(3).child(2).addChild("(AB)C");
  val = "(AB)C" + "<br>" + "48" ;
  multree.root().child(3).child(2).child(1).value(val);

  multree.layout();
  av.step();
  // slide 12

  av.umsg("The most efficient way to compute B(CDE) is to compute CDE in the least number of operations i.e. 54," +
      " and multiply the resultant  matrix with B." +
      "So, the total number of operations for B(CDE) = $54 + (2) (4) (3) = 78$ " +
      "Comparably, for (BCD)E we have $36 + (2) (5) (3) = 66$ " +
      "We compute A(BCD) and (ABC)D in a similar manner.");
  val = "B(CDE)" + "<br>" + "78" ;
  multree.root().child(0).child(0).value(val);

  val = "(BCD)E" + "<br>" + "66" ;
  multree.root().child(0).child(2).value(val);

  val = "A(BCD)" + "<br>" + "66" ;
  multree.root().child(3).child(0).value(val);

  val = "(ABC)D" + "<br>" + "58" ;
  multree.root().child(3).child(2).value(val);
  multree.layout();
  av.step();
  // slide 13

  av.umsg("Using the same idea, BCDE requires a minimum of 58 operations. " +
      "Thus, least number of operations to compute A(BCDE) are  $58 + (3) (2) (3) = 76$." +
      "Similarly, we evaluate the most efficient way to compute (AB)(CDE), (ABC)(DE), and (ABCD)E.");
  val = "A(BCDE)"  + "<br>" + "76" ;
  multree.root().child(0).value(val);

  // val = "(AB)(CDE)" + "<br>" + "90" ;
  val = "(AB)(CDE)" + "<br>" + "114" ;
  multree.root().child(1).value(val);

  // val = "(ABC)(DE)" + "<br>" + "46" ;
  val = "(ABC)(DE)" + "<br>" + "76" ;
  multree.root().child(2).value(val);

  val = "(ABCD)E" + "<br>" + "108" ;
  multree.root().child(3).value(val);

  multree.layout();
  av.step();
  // slide 13
  av.umsg("Finally, we have determined that the most efficient way to compute ABCDE is to partition it in the manner" +
      " (A(BC))(DE) or A((BC)(DE)) and the minimum number of operations required are 76.");
  val = "ABCDE" + "<br>" + "76" ;
  multree.root().value(val);



  multree.layout();
  av.step();
  av.recorded();
});
