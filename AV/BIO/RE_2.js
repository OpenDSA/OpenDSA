"use strict";

$(document).ready(function () {
    "use strict";
    var av_name = "RE_2";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
  
    // Frame 1
    av.umsg("This frameset presents the operations that you can perform with Regular Expressions.");
    av.displayInit();

     // Frame 2
     av.umsg(Frames.addQuestion("one"));
     av.step();

       // Frame 3
       av.umsg(Frames.addQuestion("two"));
       av.step();

       // Frame 4
       av.umsg(Frames.addQuestion("three"));
       av.step();

       // Frame 5
       av.umsg(Frames.addQuestion("four"));
       av.step();

        

  av.recorded();

});