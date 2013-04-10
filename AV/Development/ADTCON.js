"use strict";

(function ($) {
  var av = new JSAV("ADTCON1", {"animationMode": "none"});

  av.g.rect(1, 1, 358, 213);
  av.label("Data Type").css({"text-align": "center", "font-size": "18px"});
  av.g.rect(10, 30, 338, 75);
  av.label("ADT:", {"top": "35px", "left": "20px"});
  av.g.circle(25, 67, 2);
  av.label("Type", {"top": "55px", "left": "30px"});
  av.g.circle(25, 87, 2);
  av.label("Operations", {"top": "75px", "left": "30px"});
  av.g.rect(180, 40, 158, 55);
  av.label("Data Items:",  {"top": "45px", "left": "185px"});
  av.label("Logical Form",  {"top": "65px", "left": "195px"});

  av.g.line(180, 105, 180, 130, {"stroke-width": "3", "arrow-end": "classic"});

  av.g.rect(10, 130, 338, 75);
  av.label("Data Structure:", {"top": "135px", "left": "20px"});
  av.g.circle(25, 167, 2);
  av.label("Storage Space", {"top": "155px", "left": "30px"});
  av.g.circle(25, 187, 2);
  av.label("Subroutines", {"top": "175px", "left": "30px"});
  av.g.rect(180, 140, 158, 55);
  av.label("Data Items:",  {"top": "145px", "left": "185px"});
  av.label("Physical Form",  {"top": "165px", "left": "195px"});

  
}(jQuery));
