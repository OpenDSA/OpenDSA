$(document).ready(function(){
  "use strict";
  var av_name = "MessageResponseTest";
  var av = new JSAV(av_name);

  //include this statement to enable PIFrames debug mode
  //it will keep the forward button enable
  //for all the following PIFrames
  //i.e. include at the very beginning -- for all the frames
  //include before this slideshow -- only for this and following slideshows
  window.PIFramesDebugFlag = true;

  var Frames = PIFRAMES.init(av_name);
  av.umsg(Frames.addQuestion("q6"));
  av.step();
  av.umsg(Frames.addQuestion("q0"));
  av.step();
  av.umsg(Frames.addQuestion("q1"));
  av.step();
  av.umsg(Frames.addQuestion("q2"));
  av.step();
  av.umsg(Frames.addQuestion("q3"));
  av.step();
  av.umsg(Frames.addQuestion("q4"));
  av.step();
  av.umsg(Frames.addQuestion("q5"));
  av.step();
  av.umsg("This is the last slideshow");
  av.recorded();
});
