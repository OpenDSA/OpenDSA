/*global JSAV, document */
// Written by Irena Shaffer

$(document).ready(function() {
  "use strict";
  var av = new JSAV("buddyCON", {animationMode: "none"});

  var rectX = 170;
  var rectY = 130;
  var rectHeight = 30;
  var currX = rectX;

  av.g.rect(rectX, rectY, 16, rectHeight).css({fill: "coral"});
  currX = currX + 16;
  av.g.rect(currX, rectY, 16, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 16;
  av.g.rect(currX, rectY, 32, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 32;
  av.g.rect(currX, rectY, 64, rectHeight).css({fill: "coral"});
  currX = currX + 64;
  av.g.rect(currX, rectY, 128, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 128;
  av.g.rect(currX, rectY, 128, rectHeight).css({fill: "coral"});
  currX = currX + 128;
  av.g.rect(currX, rectY, 128, rectHeight).css({fill: "cornflowerblue"});

  //2 rectangles at top of screen that show how much memory is used/remains
  av.g.rect(570, 20, 30, 30).css({fill: "coral"});
  av.g.rect(670, 20, 30, 30).css({fill: "cornflowerblue"});
  //labels the blocks at the top of the screen
  av.label("Used Space", {left:  550, top:  45});
  av.label("Free Space", {left:  650, top:  45});

  var usedAmountLabel = av.label(104, {left:  575, top:  10});
  usedAmountLabel.css({"z-index": 500});
  var freeAmountLabel = av.label(152, {left:  670, top:  10});
  freeAmountLabel.css({"z-index": 500});

  av.label("Block Size", {left: 160, top: 170});
  av.ds.array([2, 4, 8, 16, 32, 64, 128, 256], {layout: "vertical", left: 180, top: 200});
  //labels the free lists
  var freeListTop = 202;

  var spacing = 34;

  var freeList8 = av.ds.list({top: freeListTop + spacing * 2, left: 250, nodegap: 30});
  freeList8.layout({center: false});
  freeList8.addLast(1);
  freeList8.layout({center: false});
  av.g.line(215, freeListTop + 2 * spacing + 30, 250, freeListTop + 2 * spacing + 30,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var freeList16 = av.ds.list({top: freeListTop + spacing * 3, left: 250, nodegap: 30});
  freeList16.layout({center: false});
  freeList16.addLast(2);
  freeList16.layout({center: false});
  av.g.line(215, freeListTop + 3 * spacing + 30, 250, freeListTop + 3 * spacing + 30,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var freeList64 = av.ds.list({top: freeListTop + spacing * 5, left: 250, nodegap: 30});
  freeList64.layout({center: false});
  freeList64.addLast(4);
  freeList64.layout({center: false});
  freeList64.addLast(6);
  freeList64.layout({center: false});
  av.g.line(215, freeListTop + 5 * spacing + 30, 250, freeListTop + 5 * spacing + 30,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});


  av.displayInit();
  av.recorded();
});
