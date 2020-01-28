$(document).ready(function() {
    "use strict";
    var av_name = "ISAM";
    var av = new JSAV(av_name, { animationMode: "none" });
    var rect = av.g.rect(360, 10, 120, 70);
    // rect.show();

    var leftTop = av.g.rect(310, 120, 80, 50);
    var leftMid = av.g.rect(310, 170, 80, 80);
    var leftBot = av.g.rect(310, 250, 80, 50);

    var rightTop = av.g.rect(450, 120, 80, 50);
    var rightMid = av.g.rect(450, 170, 80, 80);
    var rightBot = av.g.rect(450, 250, 80, 50);

    var botBot = av.g.rect(370, 340, 100, 60);
    // av.pointer(leftBot, botBot);
    //in-memory table of cylinder
    var lab = av.label("hello", {before: rect , visible: true});
    av.umsg("We start by creating an array with 6 elements.");
    av.displayInit();
    av.recorded();

    // var bt = av.ds.tree({ nodegap: 15});
    // bt.root("S");
    // var rt = bt.root();
    // var lt = bt.newNode("A");
    // rt.addChild(lt);
    // rt.addChild("c");
    // bt.layout();
    // av.displayInit();
    // av.recorded();
});