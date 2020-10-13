$(document).ready(function() {
    "use strict";
    var av_name = "FibTreeCON";
    var av = new JSAV(av_name);


    var fib = [1,1,2,3,5,8,13]

    var val;
    var fibtree = av.ds.tree({nodegap: 20});

    fibtree.root("6");

    val = "6" + "<br>" + fib[6].toString();
    fibtree.root().value(val);
    // fibtree.root().highlight();


    fibtree.layout();
    av.umsg("Let's see how the recursive process works when we compute the value for F(6). " +
        "We will build a tree showing the recursive function calls that take place. At the root of the tree we have the parameter value 6.");
    av.displayInit();
    av.step();


    // fibtree.root().unhighlight();

    fibtree.root().addChild("4").addChild("5");

    val = "4" + "<br>" + fib[4].toString();
    fibtree.root().child(0).value(val);

    val = "5" + "<br>" + fib[5].toString();
    fibtree.root().child(1).value(val);

    // fibtree.root().child(0).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(0).unhighlight();


    fibtree.root().child(0).addChild("2").addChild("3");

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(0).value(val);

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(0).child(1).value(val);

    // fibtree.root().child(0).child(0).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(0).child(0).highlight();

    fibtree.root().child(0).child(0).addChild("0").addChild("1");

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(0).child(0).value(val);

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(0).child(1).value(val);

    fibtree.layout();
    av.step();
    // fibtree.root().child(0).child(0).unhighlight();
    //3
    fibtree.root().child(0).child(1).addChild("1").addChild("2");

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(1).child(0).value(val);

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(0).child(1).child(1).value(val);

    // fibtree.root().child(0).child(1).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(0).child(1).unhighlight();

    fibtree.root().child(0).child(1).child(1).addChild("0").addChild("1");

    val = "0" + "<br>" + fib[0].toString();
    fibtree.root().child(0).child(1).child(1).child(0).value(val);

    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(0).child(1).child(1).child(1).value(val);

    // fibtree.root().child(0).child(1).child(1).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(0).child(1).child(1).unhighlight();


    fibtree.root().child(1).addChild("3").addChild("4");

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(1).child(0).value(val);

    val = "4" + "<br>" + fib[4].toString();
    fibtree.root().child(1).child(1).value(val);

    // fibtree.root().child(1).highlight();
    fibtree.layout();
    av.step();
    // fibtree.root().child(1).unhighlight();


    fibtree.root().child(1).child(0).addChild("1").addChild("2");
    val = "1" + "<br>" + fib[1].toString();
    fibtree.root().child(1).child(0).child(0).value(val);

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(0).child(1).value(val);

    // fibtree.root().child(1).child(0).highlight();
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
    // fibtree.root().child(1).child(0).child(1).unhighlight();

    fibtree.root().child(1).child(1).addChild("2").addChild("3");

    val = "2" + "<br>" + fib[2].toString();
    fibtree.root().child(1).child(1).child(0).value(val);

    val = "3" + "<br>" + fib[3].toString();
    fibtree.root().child(1).child(1).child(1).value(val);

    // fibtree.root().child(1).child(1).highlight();
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

    // fibtree.root().child(1).child(1).child(1).highlight();
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
    // fibtree.root().child(1).child(1).child(1).child(1).unhighlight();

    av.recorded();
});
