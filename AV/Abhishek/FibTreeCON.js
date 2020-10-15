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

    fibtree.root().addChild("5");
    val = "5" + "<br>" + "-" ;// fib[4].toString();
    fibtree.root().child(0).value(val);
    av.umsg("To compute F(6), we have to make a recursive call to compute F(6-1) = F(5).");

    fibtree.layout();
    av.step();

    fibtree.root().child(0).addChild("4");
    val = "4" + "<br>" + "-" ;//fib[2].toString();
    fibtree.root().child(0).child(0).value(val);

    av.umsg("To compute F(5) we have to calculate F(5-1) = F(4)");
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).addChild("3");

    av.umsg("And to compute F(4) we have to calculate F(4-1) = F(3)");
    val = "3" + "<br>" + "-" ;//fib[3].toString();
    fibtree.root().child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(0).addChild("2");

    av.umsg("Which leads us to F(3-1) = F(2)");
    val = "2" + "<br>" + "-" ;//fib[3].toString();
    fibtree.root().child(0).child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(0).child(0).addChild("1");

    av.umsg("To compute F(2) we have to calculate F(2-1) = F(1) = 1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(0).child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(0).child(0).addChild("1");

    av.umsg("And to finish computing F(2) we have to calculate F(2-2) = F(0) = 1");
    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(0).child(0).child(0).child(1).value(val);

    fibtree.layout();
    av.step();

    av.umsg("we get F(2) = F(2-1) + F(2-2) = 1 + 1 = 2");
    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(0).addChild("1");

    av.umsg("then we get F(3) = F(3-1) + F(3-2) = 2 + F(1) ");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(0).child(0).child(1).value(val);

    fibtree.layout();
    av.step();

    av.umsg("We have  F(3) = F(3-1) + F(3-2) = 2 + F(1) = 3");
    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(0).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    av.umsg("We have to compute F(2) again.");

    fibtree.root().child(0).child(0).addChild("2");
    val = "2" + "<br>" + "-"; // fib[3].toString();

    fibtree.root().child(0).child(0).child(1).value(val);
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(1).addChild("1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(0).child(1).child(0).value(val);


    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(0).child(1).addChild("0");
    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(0).child(1).child(1).value(val);

    fibtree.layout();
    av.step();

    av.umsg("We get F(2) = F(2-1) + F(2-2) = 1 + 1 = 2 ");

    val = "2" + "<br>" +  fib[2].toString();

    fibtree.root().child(0).child(0).child(1).value(val);
    fibtree.layout();
    av.step();

    val = "4" + "<br>" + fib[4].toString();
    fibtree.root().child(0).child(0).value(val);

    av.umsg("We then get F(4) = F(4-1) + F(4-2) = 3 + 2 = 5 ");
    fibtree.layout();
    av.step();


    fibtree.root().child(0).addChild("3");
    val = "3" + "<br>" + "-" ;//fib[2].toString();
    fibtree.root().child(0).child(1).value(val);

    av.umsg("To compute F(5) we have to calculate F(5-2) = F(3) which we have calculated before");
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(1).addChild("2");
    val = "2" + "<br>" + "-" ;//fib[2].toString();
    fibtree.root().child(0).child(1).child(0).value(val);

    av.umsg("We have calculated F(2) already twice. But have to do so yet again.");
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(1).child(0).addChild("1");
    val = "1" + "<br>" +  fib[1].toString();
    fibtree.root().child(0).child(1).child(0).child(0).value(val);

    av.umsg("We get F(2) = F(2-1) + F(2-2) = 1 + 1 = 2");
    fibtree.layout();
    av.step();

    fibtree.root().child(0).child(1).child(0).addChild("0");
    val = "0" + "<br>" +  fib[0].toString();
    fibtree.root().child(0).child(1).child(0).child(1).value(val);

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(1).child(0).value(val);

    av.umsg("We have calcualted F(3) twice now.");
    fibtree.layout();
    av.step();


    fibtree.root().child(0).child(1).addChild("1");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(1).child(1).value(val);

    av.umsg("Now, F(3) = F(3-1) + F(3-2)");
    fibtree.layout();
    av.step();

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(0).child(1).value(val);

    av.umsg("We get F(3) = F(3-1) + F(3-2) = 2 + 1 = 3. ");
    fibtree.layout();
    av.step();


    val = "5" + "<br>" + fib[5].toString();
    fibtree.root().child(0).value(val);
    av.umsg("We get F(5) = F(5-1) + F(5-2) = 5 + 3 = 8");

    fibtree.layout();
    av.step();

    fibtree.root().addChild("4");
    val = "4" + "<br>" + "-" ;// fib[4].toString();
    fibtree.root().child(1).value(val);
    av.umsg("Now we have to calculate F(4) which we have calcualted before.");

    fibtree.layout();
    av.step();

    fibtree.root().child(1).addChild("3");
    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(1).child(0).value(val);
    av.umsg("To calculate F(4) we need to compute F(3) yet again.");
    fibtree.layout();
    av.step();

    fibtree.root().child(1).child(0).addChild("2");

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(0).child(0).value(val);

    fibtree.layout();
    av.step();

    fibtree.root().child(1).child(0).child(0).addChild("1").addChild("0");

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(0).child(0).child(0).value(val);

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(1).child(0).child(0).child(1).value(val);

    fibtree.layout();
    av.step();
    
    fibtree.root().child(1).child(0).addChild("1")
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(0).child(1).value(val);

    av.umsg("We now need to compute F(2) a fifth time.");
    fibtree.layout();
    av.step();

    fibtree.root().child(1).addChild("2");
    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(1).value(val);

    fibtree.layout();
    av.step();


    fibtree.root().child(1).child(1).addChild("1").addChild("0");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(1).child(0).value(val);

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(1).child(1).child(1).value(val);
    fibtree.layout();

    fibtree.layout();
    av.step();

    val = "4" + "<br>" +  fib[4].toString();
    fibtree.root().child(1).value(val);
    av.umsg("We get F(4) = F(4-1) + F(4-2) =  3 + 2 = 5");

    fibtree.layout();
    av.step();

    val = "6" + "<br>" +  fib[6].toString();
    fibtree.root().value(val);
    av.umsg("Finally we compute F(6) = F(6-1) + F(6-2) = 8 + 5 = 13 ");

    fibtree.layout();
    av.step();

    av.recorded();
});
