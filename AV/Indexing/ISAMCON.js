$(document).ready(function() {
  "use strict";
  var av_name = "ISAMCON";
  var av = new JSAV(av_name, {animationMode: "none"});
  var left = 310;

  av.g.rect(left + 50, 10, 120, 70);
  av.label("In-memory", {left: left + 65, top: -10}).css({
    "font-size": "18px"
  });
  av.label("Table of", {left: left + 75, top: 10}).css({
    "font-size": "18px"
  });
  av.label("Cylinder Keys", {left: left + 55, top: 30}).css({
    "font-size": "18px"
  });

  av.label("Cylinder 1", {left: left, top: 80}).css({"font-size": "18px"});
  av.g.rect(left, 120, 80, 50);
  av.label("Cylinder", {left: left + 5, top: 105}).css({"font-size": "18px"});
  av.label("Index", {left: left + 15, top: 125}).css({"font-size": "18px"});
  av.g.rect(left, 170, 80, 80);
  av.label("Records", {left: left + 5, top: 180}).css({"font-size": "18px"});
  av.g.rect(left, 250, 80, 50);
  av.label("Cylinder", {left: left + 7, top: 230}).css({"font-size": "18px"});
  av.label("Overflow", {left: left + 5, top: 250}).css({"font-size": "18px"});

  av.label("Cylinder 2", {left: left + 140, top: 80}).css({"font-size": "18px"});
  av.g.rect(left + 140, 120, 80, 50);
  av.label("Cylinder", {left: left + 145, top: 105}).css({"font-size": "18px"});
  av.label("Index", {left: left + 155, top: 125}).css({"font-size": "18px"});
  av.g.rect(left + 140, 170, 80, 80);
  av.label("Records", {left: left + 145, top: 180}).css({"font-size": "18px"});
  av.g.rect(left + 140, 250, 80, 50);
  av.label("Cylinder", {left: left + 147, top: 230}).css({"font-size": "18px"});
  av.label("Overflow", {left: left + 145, top: 250}).css({"font-size": "18px"});

  av.g.line(left + 40, 302, left + 95, 338, {"stroke-width": "3", "arrow-end": "classic"});
  av.g.line(left + 180, 302, left + 125, 338, {"stroke-width": "3", "arrow-end": "classic"});

  av.g.rect(370, 340, 100, 60);
  av.label("System", {left: left + 80, top: 325}).css({"font-size": "18px"});
  av.label("Overflow", {left: left + 75, top: 345}).css({"font-size": "18px"});
  av.displayInit();
  av.recorded();
});
