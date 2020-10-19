$(document).ready(function() {
    "use strict";
    var av_name = "KnapTreeCON";
    var av = new JSAV(av_name);
    var val;
    var knaptree = av.ds.tree({nodegap: 20});

    // 4,10
    knaptree.root("4");
    val = "4,10" + "<br>" + "10" ;
    knaptree.root().value(val);
    knaptree.layout();
    av.displayInit();

    // 3,10
    knaptree.root().addChild("3");
    val = "3,10"  + "<br>" + "-" ;
    knaptree.root().child(0).value(val);
    knaptree.layout();
    knaptree.layout();
    av.step();


    // 2,10
    knaptree.root().child(0).addChild("2");
    val = "2,10" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).value(val);
    knaptree.layout();
    av.step();

    // 1,10
    knaptree.root().child(0).child(0).addChild("1");
    val = "1,10" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(0).value(val);


    // 0,10
    knaptree.root().child(0).child(0).child(0).addChild("0");
    val = "0,10" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(0).child(0).value(val);
    knaptree.layout();
    knaptree.layout();
    av.step();


    // 0,8
    knaptree.root().child(0).child(0).child(0).addChild("0");
    val = "0,8" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(0).child(1).value(val);
    knaptree.layout();
    av.step();

    //1,3
    knaptree.root().child(0).child(0).addChild("1");
    val = "1,3" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(1).value(val);
    knaptree.layout();
    av.step();

    // 0,3
    knaptree.root().child(0).child(0).child(1).addChild("0");
    val = "0,3" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(1).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,1
    knaptree.root().child(0).child(0).child(1).addChild("0");
    val = "0,1" + "<br>" + "-" ;
    knaptree.root().child(0).child(0).child(1).child(1).value(val);
    knaptree.layout();
    av.step();

    // 2,6
    knaptree.root().child(0).addChild("2");
    val = "2,6" + "<br>" + "-" ;
    knaptree.root().child(0).child(1).value(val);
    knaptree.layout();
    av.step();

    // 1,6
    knaptree.root().child(0).child(1).addChild("1");
    val = "1,6" + "<br>" + "-" ;
    knaptree.root().child(0).child(1).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,6
    knaptree.root().child(0).child(1).child(0).addChild("0");
    val = "0,6" + "<br>" + "-" ;
    knaptree.root().child(0).child(1).child(0).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,4
    knaptree.root().child(0).child(1).child(0).addChild("0");
    val = "0,4" + "<br>" + "-" ;
    knaptree.root().child(0).child(1).child(0).child(1).value(val);
    knaptree.layout();
    av.step();

    // 3,9
    knaptree.root().addChild("3");
    val = "3,9" + "<br>" + "9" ;
    knaptree.root().child(1).value(val);
    knaptree.layout();
    av.step();

    // 2,9
    knaptree.root().child(1).addChild("2");
    val = "2,9" + "<br>" + "9" ;
    knaptree.root().child(1).child(0).value(val);
    knaptree.layout();
    av.step();

    // 1,9
    knaptree.root().child(1).child(0).addChild("1");
    val = "1,9" + "<br>" + "9" ;
    knaptree.root().child(1).child(0).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,9
    knaptree.root().child(1).child(0).child(0).addChild("0");
    val = "0,9" + "<br>" + "9" ;
    knaptree.root().child(1).child(0).child(0).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,7
    knaptree.root().child(1).child(0).child(0).addChild("0");
    val = "0,7" + "<br>" + "-" ;
    knaptree.root().child(1).child(0).child(0).child(1).value(val);
    knaptree.layout();
    av.step();


    // 1,2
    knaptree.root().child(1).child(0).addChild("1");
    val = "1,2" + "<br>" + "2" ;
    knaptree.root().child(1).child(0).child(1).value(val);
    knaptree.layout();
    av.step();

    // 0,2
    knaptree.root().child(1).child(0).child(1).addChild("0");
    val = "0,2" + "<br>" + "-" ;
    knaptree.root().child(1).child(0).child(1).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,0
    knaptree.root().child(1).child(0).child(1).addChild("0");
    val = "0,0" + "<br>" + "0" ;
    knaptree.root().child(1).child(0).child(1).child(1).value(val);
    knaptree.layout();
    av.step();

    // 2,5
    knaptree.root().child(1).addChild("2");
    val = "2,5" + "<br>" + "-" ;
    knaptree.root().child(1).child(1).value(val);
    knaptree.layout();
    av.step();

    // 1,5
    knaptree.root().child(1).child(1).addChild("1");
    val = "1,5" + "<br>" + "-" ;
    knaptree.root().child(1).child(1).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,5
    knaptree.root().child(1).child(1).child(0).addChild("0");
    val = "0,5" + "<br>" + "-" ;
    knaptree.root().child(1).child(1).child(0).child(0).value(val);
    knaptree.layout();
    av.step();

    // 0,3
    knaptree.root().child(1).child(1).child(0).addChild("0");
    val = "0,3" + "<br>" + "-" ;
    knaptree.root().child(1).child(1).child(0).child(1).value(val);
    knaptree.layout();
    av.recorded();
});
