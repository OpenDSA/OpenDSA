/*global JSAV, document */
// Written by Brannon Angers

$(document).ready(function() {
  "use strict";
  var av = new JSAV("AutomataCON", {animationMode: "none"});

  var left = 200;
  var top = 20;
  var elements = ['a', 'a', 'b', 'b', 'a', 'b', '', '', '', '' ];
  var tape = av.ds.tape(elements, left + 30, top, "right");
  //Control unit
  av.g.rect(left + 50, top + 105, 148, 152, {"stroke-width": 1});
  av.g.circle(left + 124, top + 194, 48, {"stroke-width": 1});
  // Arrow in circle of control unit
  av.g.line(left + 124, top + 194, left + 134, top + 184, {"stroke-width": 1});
  av.g.polyline([[left + 129, top + 186], [left + 134, top + 184], [left + 132, top + 188]], {"stroke-width": 1})

  //Arrow from control unit to input tape
  av.g.line(left + 107, top + 38, left + 107, top + 105, {"stroke-width": 1});
  av.g.polyline([[left + 104, top + 44], [left + 107, top + 38], [left + 110, top + 44]], {"stroke-width": 1});

  //Arrow from control unit to storage
  av.g.line(left+198, top + 204, left + 245, top + 204, {"stroke-width": 1});
  av.g.polyline([[left + 239, top+201], [left + 245, top + 204], [left + 239, top + 207]], {"stroke-width": 1})

  // Right edge of storage
  av.g.line(left + 248, top + 194, left + 248, top + 300, {"stroke-width": 1});
  // Left edge of storage
  av.g.line(left + 278, top + 194, left + 278, top + 300, {"stroke-width": 1});

  // Inner lines of storage from top to bottom
  av.g.line(left + 248, top + 204, left + 278, top + 204, {"stroke-width": 1});
  av.g.line(left + 248, top + 229, left + 278, top + 229, {"stroke-width": 1});
  av.g.line(left + 248, top + 254, left + 278, top + 254, {"stroke-width": 1});
  av.g.line(left + 248, top + 278, left + 278, top + 278, {"stroke-width": 1});

  av.label('input tape', {"left": left + 90, "top": top - 35});
  // Inner text of input tape
  av.label('tape head', {"left": left + 126, "top": top + 25})
  av.label('control unit', {"left": left + 85, "top": top + 100})
  av.label('0', {"left": left + 105, "top": top + 145})
  av.label('1', {"left": left + 140, "top": top + 145})
  av.label('storage', {"left": left + 290, "top": top + 170})
  av.label('(optional)', {"left": left + 290, "top": top + 190})

  av.displayInit();
  av.recorded();
});
