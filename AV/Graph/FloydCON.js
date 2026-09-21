$(document).ready(function() {
  "use strict";
  var av = new JSAV("FloydCON", {animationMode: "none"});
  var gwidth = 500;
  var gheight = 250;
  var nodeXPosition = 500;
  var nodeYPosition = 0;
  var arrowXPosition = 300;
  var arrowYPosition = 117;
  var labelXPosition = 328;
  var labelYPosition = 33;
  var xradian = 140;
  var yradian = 140;
  var rotationFlag = 0;
  var largeArcFlag = 0;
  var curveFlag = 1;
  var curveFlag2 = 0;
  // Build a valid SVG arc path "d" string. Using ["M", x1, y1, "A", ...].join(",")
  // (the old approach) puts a bare comma right after the "M"/"A" command letters,
  // e.g. "M,300,117,A,140,140,...", which native SVG parsing rejects.
  function arcPath(x1, y1, rx, ry, rot, largeArc, sweep, x2, y2) {
    return "M" + x1 + "," + y1 + "A" + rx + "," + ry + "," + rot + "," + largeArc + "," + sweep + "," + x2 + "," + y2;
  }
  var g = av.ds.graph({width: gwidth, height: gheight,
                       layout: "manual", directed: false});
  g.addNode("0", {left: ((nodeXPosition - 300) / 2),       top: nodeYPosition + 100});
  g.addNode("1", {left: ((nodeXPosition - 300) / 2) + 125, top: nodeYPosition});
  g.addNode("2", {left: ((nodeXPosition - 300) / 2) + 125, top: nodeYPosition + 150});
  g.addNode("3", {left: ((nodeXPosition - 300) / 2) + 250, top: nodeYPosition + 100});
  //Node 0 to Node 1
  av.g.path(arcPath(arrowXPosition, arrowYPosition,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 101, arrowYPosition - 87),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 0
  av.g.path(arcPath(arrowXPosition + 102, arrowYPosition - 82,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 3, arrowYPosition + 3),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 0 to Node 2
  av.g.path(arcPath(arrowXPosition + 7, arrowYPosition + 21,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 102, arrowYPosition + 60),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 0
  av.g.path(arcPath(arrowXPosition + 100, arrowYPosition + 63,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 2, arrowYPosition + 26),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 2
  av.g.path(arcPath(arrowXPosition + 122, arrowYPosition - 69,
             xradian + 30, yradian + 30,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 125, arrowYPosition + 50),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 1
  av.g.path(arcPath(arrowXPosition + 110, arrowYPosition + 48,
             xradian + 30, yradian + 30,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 110, arrowYPosition - 71),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 3
  av.g.path(arcPath(arrowXPosition + 133, arrowYPosition - 87,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 232, arrowYPosition + 3),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 1
  av.g.path(arcPath(arrowXPosition + 227, arrowYPosition + 10,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 128, arrowYPosition - 77),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 3
  av.g.path(arcPath(arrowXPosition + 133, arrowYPosition + 60,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 228, arrowYPosition + 20),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 2
  av.g.path(arcPath(arrowXPosition + 230, arrowYPosition + 26,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 131, arrowYPosition + 64),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 0 to Node 3
  av.g.path(arcPath(arrowXPosition - 2, arrowYPosition + 30,
             xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag2,
             arrowXPosition + 237, arrowYPosition + 28),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 0
  av.g.path(arcPath(arrowXPosition + 242, arrowYPosition + 30,
             xradian - 10, yradian - 10,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition - 10, arrowYPosition + 28),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //label Node 0 to Node 1
  av.label("1", {left: labelXPosition, top: labelYPosition});
  //label Node 1 to Node 3
  av.label("7", {left: labelXPosition + 168, top: labelYPosition + 2});
  //label Node 1 to Node 0
  av.label("4", {left: labelXPosition + 25, top: labelYPosition + 25});
  //label Node 3 to Node 1
  av.label("3", {left: labelXPosition + 135, top: labelYPosition + 26});
  //label Node 2 to Node 1
  av.label("5", {left: labelXPosition + 59, top: labelYPosition + 54});
  //label Nodeode 3
  av.label("11", {left: labelXPosition + 138, top: labelYPosition + 82});
  //label Node 0 to Node 3
  av.label("12", {left: labelXPosition + 81, top: labelYPosition + 147});
  //label Node 2 to Node 0
  av.label("2", {left: labelXPosition + 22, top: labelYPosition + 105});
  //label Node 1 to Node 2
  av.label("\u221E", {left: labelXPosition + 108, top: labelYPosition + 39}).addClass("largeLabel");
  //label Node 3 to Node 2
  av.label("\u221E", {left: labelXPosition + 142, top: labelYPosition + 89}).addClass("largeLabel");
  //label Node 0 to Node 2
  av.label("\u221E", {left: labelXPosition + 25, top: labelYPosition + 65}).addClass("largeLabel");
  //label Node 3 to Node 0
  av.label("\u221E", {left: labelXPosition + 83, top: labelYPosition + 161}).addClass("largeLabel");
  g.layout();
  av.displayInit();
  av.recorded();
});
