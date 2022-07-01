"use strict";

$(document).ready(function () {
    "use strict";
    var av_name = "RE";
    var av = new JSAV(av_name);
    var Frames = PIFRAMES.init(av_name);
  
    // Frame 1
    av.umsg("This frameset presents the definition and some examples for a RegEx in Bioinformatics.");
    av.displayInit();

     // Frame 2
     av.umsg(Frames.addQuestion("Operators"));
     av.step();

       // Frame 3
       av.umsg(Frames.addQuestion("Concat"));
       av.step();

       // Frame 4
       av.umsg(Frames.addQuestion("ConcatStr"));
       av.step();

       // Frame 5
       av.umsg(Frames.addQuestion("star"));
       av.step();

        // Frame 6
        av.umsg(Frames.addQuestion("alla"));
        av.step();

  av.recorded();

});
