/*global JSAV, document */
// Written by Brannon Angers

$(document).ready(function() {
  "use strict";
  var av = new JSAV("AutomataCON", {animationMode: "none"});

  var left = 200;
  var top = 20;
  av.g.line(left, top, left + 400, top, {"stroke-width": 1}); // Top line of input tape
  av.g.line(left, top + 35, left + 410, top + 35, {"stroke-width": 1}); // Bottom line of input tape
  // Left jagged edge of input tape
  av.g.polyline([[left, top], [left, top + 5], [left - 5, top + 10], [left, top + 15],
    [left, top + 20], [left + 5, top + 25], [left, top + 30], [left - 5, top + 35], [left, top + 35]], {"stroke-width": 1});
  // Right jegged edge of input tape
  av.g.polyline([[left + 400, top], [left + 395, top + 4], [left + 400, top + 4], [left + 395, top + 10], [left + 404, top + 15],
   [left + 395, top + 15], [left + 415, top + 23], [left + 400, top + 27], [left + 410, top + 30],
   [left + 410, top + 35]], {"stroke-width": 1})

  // Left most straight vertical line of input tape
  av.g.line(left + 15, top, left + 15, top + 35, {"stroke-width": 1});
  // inner line of input tape
  var i = 1;
  for (i; i <= 9; i++) {
    var temp = av.g.line(left + 15 + 37*i, top, left + 15 + 37*i, top + 35, {"stroke-width": 1});
  }
  // Right most  straight vertical line of input tape
  av.g.line(left + 385, top, left + 385, top + 35, {"stroke-width": 1});

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
  av.label('a', {"left": left + 28, "top": top - 7})
  av.label('a', {"left": left + 65, "top": top - 7})
  av.label('b', {"left": left + 102, "top": top - 7})
  av.label('b', {"left": left + 139, "top": top - 7})
  av.label('a', {"left": left + 176, "top": top - 7})
  av.label('b', {"left": left + 213, "top": top - 7})
  av.label('tape head', {"left": left + 126, "top": top + 25})
  av.label('control unit', {"left": left + 85, "top": top + 100})
  av.label('0', {"left": left + 105, "top": top + 145})
  av.label('1', {"left": left + 140, "top": top + 145})
  av.label('storage', {"left": left + 290, "top": top + 170})
  av.label('(optional)', {"left": left + 290, "top": top + 190})


  av.displayInit();
  av.recorded();
});
