$(document).ready(function() {
    "use strict";
    var av_name = "FibTreeCON";
    var av = new JSAV(av_name);


    var fib = [1,1,2,3,5,8,13]

    var val;
    var fibtree = av.ds.tree({nodegap: 20});

    fibtree.root("6");

    val = "6" + "<br>" + "-" ;//fib[6].toString();
    fibtree.root().value(val);

    fibtree.layout();
    av.umsg("Let's see how the recursive process works when we compute the value for F(6). " +
        "We will build a tree showing the recursive function calls that take place. At the root of the tree we have the parameter value 6.");
    av.displayInit();
    av.step();


    // fibtree.root().unhighlight();

    fibtree.root().addChild("4");
    val = "4" + "<br>" + "-" ;// fib[4].toString();
    fibtree.root().child(0).value(val);
    av.umsg("First we have to calculate F(6-2) = F(4)");

    fibtree.layout();
    av.step();

    fibtree.root().child(0).addChild("2");
    val = "2" + "<br>" + "-" ;//fib[2].toString();
    fibtree.root().child(0).child(0).value(val);

    av.umsg("To compute F(4) we have to calculate F(4-2) = F(2)");
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).addChild("0");

    av.umsg("And to compute F(2) we have to calculate F(2-2) = F(0) = 1");
    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).addChild("1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(0).child(1).value(val);
    av.umsg("To complete the computation of F(2) we have to calculate F(2-1) = F(1) = 1");


    fibtree.layout();
    av.step();
    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(0).value(val);
    av.umsg("We get F(2) = F(2-2) + F(2-1) = 1 + 1 = 2");


    fibtree.layout();
    av.step();

    fibtree.root().child(0).addChild("3");
    val = "3" + "<br>" + "-" ;//fib[3].toString();
    fibtree.root().child(0).child(1).value(val);
    av.umsg("To complete the computation of F(4) we have to calculate F(3) ");


    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(1).addChild("1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(1).child(0).value(val);

    av.umsg("For the computation of F(3) we have to calculate F(1) = 1");
    fibtree.layout();
    av.step();


    fibtree.layout();
    av.step();
    fibtree.root().child(0).child(1).addChild("2");
    val = "2" + "<br>" + "-" ;//fib[2].toString();
    fibtree.root().child(0).child(1).child(1).value(val);

    av.umsg("To complete the computation of F(3) we have to calculate F(2) which we have already computed" +
        ". Thus to compute F(2) we have to calculate F(2) = F(2-2) + F(2-1) again");
    fibtree.layout();
    av.step();
    fibtree.root().child(0).child(1).child(1).addChild("0");
    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(1).child(1).child(0).value(val);

    fibtree.layout();
    av.step();


    fibtree.root().child(0).child(1).child(1).addChild("1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(1).child(1).child(1).value(val);

    av.umsg("To compute F(2) we have to calculate F(2) = F(2-2) + F(2-1)");
    fibtree.layout();
    av.step();

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(1).child(1).value(val);

    av.umsg("We get  F(2) = F(2-2) + F(2-1) = 1 + 1 = 2");
    fibtree.layout();
    av.step();

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(0).child(1).value(val);

    av.umsg("We get  F(3) = F(3-2) + F(3-1) = 2 + 1 = 3");
    fibtree.layout();
    av.step();

    val = "4" + "<br>" +  fib[4].toString();
    fibtree.root().child(0).value(val);

    av.umsg("We get  F(4) = F(4-2) + F(4-1) = 2 + 3 = 5");
    fibtree.layout();
    av.step();

    fibtree.root().addChild("5");

    val = "5" + "<br>" + "-" ;//fib[5].toString();
    fibtree.root().child(1).value(val);

    av.umsg("Now, to compelete the computation F(6) we have to calculate F(5) = F(5-2) + F(5-1)");
    fibtree.layout();
    av.step();


    fibtree.root().child(1).addChild("3");
    val = "3" + "<br>" +"-" ;// fib[3].toString();
    fibtree.root().child(1).child(0).value(val);

    av.umsg("We have to calculate F(3) through recursion again");
    fibtree.layout();
    av.step();

    fibtree.root().child(1).addChild("4");
    val = "4" + "<br>" +"-" ;// fib[4].toString();
    fibtree.root().child(1).child(1).value(val);

    av.umsg("F(4) is calculated again too");
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).unhighlight();


    fibtree.root().child(1).child(0).addChild("1").addChild("2");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(0).child(0).value(val);

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(0).child(1).value(val);

    // fibtree.root().child(1).child(0).highlight();
    av.umsg("For this computation F(2) is calculated thorugh recursion yet again!");
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).child(0).unhighlight();


    fibtree.root().child(1).child(0).child(1).addChild("0").addChild("1");

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(1).child(0).child(1).child(0).value(val);

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(0).child(1).child(1).value(val);

    // fibtree.root().child(1).child(0).child(1).highlight();
    fibtree.layout();
    av.step();

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(1).child(0).value(val);

    fibtree.layout();
    av.step();


    fibtree.root().child(1).child(1).addChild("2").addChild("3");

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(1).child(0).value(val);

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(1).child(1).child(1).value(val);

    av.umsg("F(2) and F(3) are calculated thorugh recursion once more!");
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).child(1).unhighlight();

    fibtree.root().child(1).child(1).child(0).addChild("0").addChild("1");

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(1).child(1).child(0).child(0).value(val);

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(1).child(0).child(1).value(val);

    // fibtree.root().child(1).child(1).child(0).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).child(1).child(0).unhighlight();


    fibtree.root().child(1).child(1).child(1).addChild("1").addChild("2");

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(1).child(1).child(0).value(val);

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(1).child(1).child(1).value(val);

    av.umsg("F(2) is calculated yet another time!");
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).child(1).child(1).unhighlight();

    fibtree.root().child(1).child(1).child(1).child(1).addChild("0").addChild("1");

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(1).child(1).child(1).child(1).child(0).value(val);

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(1).child(1).child(1).child(1).value(val);

    // fibtree.root().child(1).child(1).child(1).child(1).highlight();
    fibtree.layout();
    av.step();

    val = "4" + "<br>" + fib[4].toString();
    fibtree.root().child(1).child(1).value(val);

    av.umsg("We have finished calculating F(4) for the second time " + " F(4) = F(4-2) + F(4-1) = 2 + 3 = 5");
    fibtree.layout();
    av.step();

    val = "5" + "<br>" + fib[5].toString();
    fibtree.root().child(1).value(val);

    av.umsg("To compute F(5) we have to calculate F(5) = F(5-2) + F(5-1) = 3 + 5 = 8");
    fibtree.layout();
    av.step();

    val = "6" + "<br>" + fib[6].toString();
    fibtree.root().value(val);

    av.umsg("Finally we have computed F(6) = F(6-2) + F(6-1) = 5 + 8 = 13");
    fibtree.layout();
    av.step();

    av.recorded();
});
