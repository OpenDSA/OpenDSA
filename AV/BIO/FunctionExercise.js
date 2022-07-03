"use strict";

$(document).ready(function () {
  var av_name = "FunctionExercise";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;  
  var jsav = new JSAV(av_name);
  var Frames = PIFRAMES.init(av_name);

  var pseudo =[ jsav.code(code[0]),jsav.code(code[1]),jsav.code(code[2]),jsav.code(code[3]),jsav.code(code[4]),jsav.code(code[5]),
  jsav.code(code[6]),jsav.code(code[7]),jsav.code(code[8]),jsav.code(code[9])];

  for(var i=0;i<10;i++)
  {
    pseudo[i].hide();
  }
  
  jsav.displayInit();
  pseudo[0].show();
  jsav.umsg(Frames.addQuestion("1"));
  jsav.step();
  pseudo[0].hide();
  pseudo[1].show();
  jsav.umsg(Frames.addQuestion("2"));
  jsav.step();
  pseudo[1].hide();
  pseudo[2].show();
  jsav.umsg(Frames.addQuestion("3"));
  jsav.step();
  pseudo[2].hide();
  pseudo[3].show();
  jsav.umsg(Frames.addQuestion("4"));
  jsav.step();
  pseudo[3].hide();
  pseudo[4].show();
  jsav.umsg(Frames.addQuestion("5"));
  jsav.step();
  pseudo[4].hide();
  pseudo[5].show();
  jsav.umsg(Frames.addQuestion("6"));
  jsav.step();
  pseudo[5].hide();
  pseudo[6].show();
  jsav.umsg(Frames.addQuestion("7"));
  jsav.step();
  pseudo[6].hide();
  pseudo[7].show();
  jsav.umsg(Frames.addQuestion("8"));
  jsav.step();
  pseudo[7].hide();
  pseudo[8].show();
  jsav.umsg(Frames.addQuestion("9"));
  jsav.step();
  pseudo[8].hide();
  pseudo[9].show();
  jsav.umsg(Frames.addQuestion("10"));
  jsav.recorded();
});









