$(document).ready(function () {
    "use strict";
    var av_name = "RLClosConceptFS";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);

    //frame 1
    av.umsg("First let us start with the meaning of closure properities for sets.");
    av.displayInit();

    //frame 2
    av.umsg(Frames.addQuestion("q2"));
    av.step();

    //frame 3
    av.umsg(Frames.addQuestion("q3"));
    av.step();
    
    //frame 4
    av.umsg(Frames.addQuestion("q4"));
    av.step();

    //frame 5
    av.umsg(Frames.addQuestion("q5"));
    av.step();
    //frame 6
    av.umsg(Frames.addQuestion("q6"));
    av.step();
    //frame 7
    av.umsg(Frames.addQuestion("q7"));
    av.step();
    //frame 8
    av.umsg(Frames.addQuestion("q8"));
    av.step();
    //frame 9
    av.umsg(Frames.addQuestion("q9"));
    av.step();
    
    //frame 10
    av.umsg("Completed.")
    av.recorded();
});
