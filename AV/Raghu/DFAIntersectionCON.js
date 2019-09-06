$(document).ready(function () {
    "use strict";
    var av_name = "DFAIntersectionCON";
    var av = new JSAV(av_name, { animationMode: "none" });

    var url1 = "../../../AV/Raghu/Machines/DFAIntersection1CON.jff";
    var dfa1 = new av.ds.FA({ left: 0, top: 0, url: url1 });

    var url2 = "../../../AV/Raghu/Machines/DFAIntersection2CON.jff";
    var dfa2 = new av.ds.FA({ right: 0, top: -18, url: url2 });

    var url3 = "../../../AV/Raghu/Machines/DFAIntersection3CON.jff";
    var dfa3 = new av.ds.FA({ left: 200, top: 100, url: url3 });

    av.displayInit();
    av.recorded();
});
