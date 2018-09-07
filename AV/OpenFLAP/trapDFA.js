/*global JSAV, document */
// Written by Nabil Saad

$(document).ready(function() {
  "use strict";
  var av = new JSAV("trapDFA", {animationMode: "none"});

  // x & y control
  var left = 250;
  var top = 50;

  // graph and nodes
  var graph = av.ds.graph({layout: "manual"});
  var q0 = graph.addNode("q0", {left: left - 200, top: top}),
      q1 = graph.addNode("q1", {left: left - 100, top: top}),
      q3 = graph.addNode("q2", {left: left, top: top}),
      q2 = graph.addNode("trap", {left: left - 100, top: top + 100});

  // edge from q1 to itself
  av.g.polyline([[left + 135, top + 17], [left + 120, top - 5], [left + 135,  top - 25], [left + 144,  top - 10], [left + 142, top + 14]]);
  av.g.polyline([[left + 141, top + 4], [left + 142, top + 14], [left + 145, top + 4]]);
  av.label('b', {"left": left + 121, "top": top - 50});

  // start symbol
  av.g.polyline([[left, top + 30], [left + 24, top + 30]]);
  av.g.polyline([[left + 15, top + 25], [left + 24, top + 30], [left + 15, top + 35]]);

  // end symbol
  av.g.circle(left + 141  , top + 31, 12);

  // edge from q0 to q1
  av.g.polyline([[left + 60, top + 30], [left + 123, top + 30]]);
  av.g.polyline([[left + 114, top + 25], [left + 123, top + 30], [left + 114, top + 35]]);
  av.label('b', {"left": left + 85, "top": top - 8});

  // edge from q3 to q1
  av.g.polyline([[left + 160, top + 30], [left + 223, top + 30]]);
  av.g.polyline([[left + 169, top + 25], [left + 160, top + 30], [left + 169, top + 35]]);
  av.label('a', {"left": left + 190, "top": top - 8});

  // edge from q0 to q2
  av.g.polyline([[left + 55, top + 40], [left + 123, top + 123]]);
  av.g.polyline([[left + 114, top + 118], [left + 123, top + 123], [left + 121, top + 115]]);
  av.label('a', {"left": left + 75, "top": top + 65});

  // edge from q2 to itself
  av.g.polyline([[left + 135, top + 145], [left + 120, top + 165], [left + 135, top + 185], [left + 144, top + 165], [left + 143, top + 146]]);
  av.g.polyline([[left + 141, top + 157], [left + 143, top + 146], [left + 146, top + 157]]);
  av.label('a,b', {"left": left + 120, "top": top + 122});

  // edge from q1 to q2
  //av.g.polyline([[left + 135, top + 45], [left + 135, top + 114]]);
  //av.g.polyline([[left + 130, top + 105], [left + 135, top + 114], [left + 140, top + 105]]);
  //av.label('1', {"left": left + 121, "top": top + 55});

  // edge from q2 to q3
  av.g.polyline([[left + 243, top + 55], [left + 159, top + 128]]);
  av.g.polyline([[left + 230, top + 61], [left + 243, top + 55], [left + 241, top + 65]]);
  av.label('b', {"left": left + 200, "top": top + 80});

  // edge from q3 to q2
  av.g.polyline([[left + 235, top + 45], [left + 155, top + 115]]); 
  av.g.polyline([[left + 158, top + 105], [left + 155, top + 115], [left + 168, top + 110]]);
  av.label('a', {"left": left + 190, "top": top + 45});

  av.displayInit();
});

