/*global ODSA */
// Written by Cliff Shaffer
$(document).ready(function() {
  "use strict";
  var av_name = "ADTCON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name, {animationMode: "none"});
  var left = 240;

  av.g.rect(left +   1,   1, 358, 213);
  av.label(interpret("av_tag1"),  {left: left + 135, top: -15}).css({"font-size": "18px"});
  av.g.rect(left +  10,  30, 338,  75);
  av.label(interpret("av_tag2"),  {left: left +  20, top:  20});
  av.g.circle(left + 25, 66,   2);
  av.g.circle(left + 25, 86,   2);
  av.label(interpret("av_tag3"),  {left: left +  30, top:  40});
  av.label(interpret("av_tag4"),  {left: left +  30, top:  60});
  av.g.rect(left + 180,  40, 158, 55);
  av.label(interpret("av_tag5"),  {left: left + 185, top:  30});
  av.label(interpret("av_tag6"),  {left: left + 195, top:  50});

  av.g.line(left + 180, 105, left + 180, 130, {"stroke-width": "3", "arrow-end": "classic"});

  av.g.rect(left +  10, 130, 338,  75);
  av.label(interpret("av_tag7"),  {left: left +  20, top: 120});
  av.g.circle(left + 25, 166, 2);
  av.label(interpret("av_tag8"),  {left: left +  30, top: 140});
  av.g.circle(left + 25, 186, 2);
  av.label(interpret("av_tag9"),  {left: left +  30, top: 160});
  av.g.rect(left + 180, 140, 158,  55);
  av.label(interpret("av_tag10"), {left: left + 185, top: 130});
  av.label(interpret("av_tag11"), {left: left + 195, top: 150});
  av.displayInit();
  av.recorded();
});
