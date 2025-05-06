/*global ODSA */
// Written by Cliff Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("pairingCON", {animationMode: "none"});

  var leftx = 325;
  var topy = 0;
  var input1 = new Array(23, 42, 17, 93, 88, 12, 57, 90);
  var input2 = new Array(48, 59, 11, 89, 12, 91, 64, 34);
  var iparr1 = av.ds.array(input1,
                           {left: leftx + 0, top: topy + 0, layout: "vertical"});
  var iparr2 = av.ds.array(input2,
                           {left: leftx + 150, top: topy + 0, layout: "vertical"});
  

  av.g.line(leftx + 35, topy + 30, leftx + 148, topy + 233,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 59, leftx + 148, topy + 30,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 88, leftx + 148, topy + 146,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 117, leftx + 148, topy + 175,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 146, leftx + 148, topy + 204,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 175, leftx + 148, topy + 88,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 204, leftx + 148, topy + 59,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.g.line(leftx + 35, topy + 233, leftx + 148, topy + 117,
            {"arrow-start": "classic-wide-long",
             "arrow-end": "classic-wide-long"});
  av.displayInit();
  av.recorded();
});
