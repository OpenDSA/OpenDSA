$(document).ready(function () {
    "use strict";
    var av_name = "DFAIntersectionCON";
    var av = new JSAV(av_name);
    av.umsg("In this example, we will find the intersection between 2 DFA's.");
    av.displayInit();
    av.umsg("Let's begin by creating our first DFA.");
    var url1 = "../../../AV/Raghu/Machines/DFAIntersection1CON.jff";
    new av.ds.FA({ left: 0, top: -20, url: url1 });
    av.step();
    av.umsg("We then create our second DFA.");
    var url2 = "../../../AV/Raghu/Machines/DFAIntersection2CON.jff";
    new av.ds.FA({ right: 0, top: -38, url: url2 });
    av.step();
    av.umsg("After intersecting both DFA's, we obtain the following: ");
    var url3 = "../../../AV/Raghu/Machines/DFAIntersection3CON.jff";
    new av.ds.FA({ left: 200, top: 80, url: url3 });
    av.recorded();
});
