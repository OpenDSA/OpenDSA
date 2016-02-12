"use strict";

$(document).ready(function () {


    JSAV.init();

    var av = new JSAV("container");
    var theArray = [20, 30, 44, 54, 55, 11, 78, 14, 13, 79, 12, 98];
    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");
    // Note: av.displayInit() will not affect the number of slides.
    // All that it will do is affect what you get to see on the
    // initial slide.
    av.displayInit();
    // We are now starting a new slide (#2)
    av.umsg("... and text after displayInit()", {preserve: true});
    av.step();
    arr.swap(0,1, highlight=true);
    // We are now starting a new slide (#3)
    av.umsg("Text after av.step()");
    av.recorded();

});
