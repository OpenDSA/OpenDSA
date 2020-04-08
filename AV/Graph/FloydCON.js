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
  var g = av.ds.graph({width: gwidth, height: gheight,
                       layout: "manual", directed: false});
  g.addNode("0", {left: ((nodeXPosition - 300) / 2),       top: nodeYPosition + 100});
  g.addNode("1", {left: ((nodeXPosition - 300) / 2) + 125, top: nodeYPosition});
  g.addNode("2", {left: ((nodeXPosition - 300) / 2) + 125, top: nodeYPosition + 150});
  g.addNode("3", {left: ((nodeXPosition - 300) / 2) + 250, top: nodeYPosition + 100});
  //Node 0 to Node 1
  av.g.path(["M", arrowXPosition, arrowYPosition,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 101, arrowYPosition - 87].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 0
  av.g.path(["M", arrowXPosition + 102, arrowYPosition - 82,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 3, arrowYPosition + 3].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 0 to Node 2
  av.g.path(["M", arrowXPosition + 7, arrowYPosition + 21,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 102, arrowYPosition + 60].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 0
  av.g.path(["M", arrowXPosition + 100, arrowYPosition + 63,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 2, arrowYPosition + 26].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 2
  av.g.path(["M", arrowXPosition + 122, arrowYPosition - 69,
             "A", xradian + 30, yradian + 30,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 125, arrowYPosition + 50].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 1
  av.g.path(["M", arrowXPosition + 110, arrowYPosition + 48,
             "A", xradian + 30, yradian + 30,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 110, arrowYPosition - 71].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 1 to Node 3
  av.g.path(["M", arrowXPosition + 133, arrowYPosition - 87,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 232, arrowYPosition + 3].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 1
  av.g.path(["M", arrowXPosition + 227, arrowYPosition + 10,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 128, arrowYPosition - 77].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 2 to Node 3
  av.g.path(["M", arrowXPosition + 133, arrowYPosition + 60,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 228, arrowYPosition + 20].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 2
  av.g.path(["M", arrowXPosition + 230, arrowYPosition + 26,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition + 131, arrowYPosition + 64].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 0 to Node 3
  av.g.path(["M", arrowXPosition - 2, arrowYPosition + 30,
             "A", xradian, yradian,
             rotationFlag, largeArcFlag, curveFlag2,
             arrowXPosition + 237, arrowYPosition + 28].join(","),
            {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
  //Node 3 to Node 0
  av.g.path(["M", arrowXPosition + 242, arrowYPosition + 30,
             "A", xradian - 10, yradian - 10,
             rotationFlag, largeArcFlag, curveFlag,
             arrowXPosition - 10, arrowYPosition + 28].join(","),
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
