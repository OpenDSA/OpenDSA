/*global JSAV, document */
// Written by Cliff Shaffer
// Based on earlier material written by Sushma Mandava and Milen John
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  //"use strict";
  var av_name = "Join";
  var av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
  interpret = config.interpreter,       // get the interpreter
  code = config.code;                   // get the code object
  
  
  // Slide 1
  
  av.umsg(interpret("").bold().big());
  var lab1=av.label(interpret("<span style='color:red;'> Loading.........</span>"), {left:150, top: -40 });
  lab1.css({"font-weight": "bold", "font-size": 40});
  av.step();
  av.displayInit();

  //slide 2
  var lab2=av.label(interpret("<span style='color:red;'> Loading..........</span>"), {left:150, top: -20 });
  av.recorded();
});
