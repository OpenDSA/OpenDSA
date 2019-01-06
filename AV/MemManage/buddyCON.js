/*global JSAV, document */
// Written by Irena Shaffer
$(document).ready(function() {
  "use strict";
  var av = new JSAV("buddyCON", {animationMode: "none"});

  var currX = 170;
  var posY = 30;
  var rectHeight = 30;

  av.g.rect(currX, posY, 16, rectHeight).css({fill: "coral"});
  currX = currX + 16;
  av.g.rect(currX, posY, 16, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 16;
  av.g.rect(currX, posY, 32, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 32;
  av.g.rect(currX, posY, 64, rectHeight).css({fill: "coral"});
  currX = currX + 64;
  av.g.rect(currX, posY, 128, rectHeight).css({fill: "cornflowerblue"});
  currX = currX + 128;
  av.g.rect(currX, posY, 128, rectHeight).css({fill: "coral"});
  currX = currX + 128;
  av.g.rect(currX, posY, 128, rectHeight).css({fill: "cornflowerblue"});

  //2 rectangles at top of screen that show how much memory is used/remains
  av.g.rect(550, posY + 60, 40, 30).css({fill: "coral"});
  av.g.rect(650, posY + 60, 40, 30).css({fill: "cornflowerblue"});
  //labels the blocks at the top of the screen
  av.label("Used Space", {left: 530, top: 135});
  av.label("Free Space", {left: 630, top: 135});

  var usedAmountLabel = av.label(104, {left: 557, top: 110});
  usedAmountLabel.css({"z-index": 500});
  var freeAmountLabel = av.label(152, {left: 657, top: 110});
  freeAmountLabel.css({"z-index": 500});

  av.label("Block Size", {left: 160, top: posY + 40});
  av.ds.array([1, 2, 4, 8, 16, 32, 64, 128, 256], {layout: "vertical", left: 180, top: posY + 70});
 
  //labels the free lists
  var freeListTop = posY + 110;

  var spacing = 34;

  var freeList8 = av.ds.list({top: freeListTop + spacing * 2, left: 250, nodegap: 30});
  freeList8.layout({center: false});
  freeList8.addLast(1);
  freeList8.layout({center: false});
  av.g.line(215, freeListTop + 2 * spacing + 28, 250, freeListTop + 2 * spacing + 28,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var freeList16 = av.ds.list({top: freeListTop + spacing * 3, left: 250, nodegap: 30});
  freeList16.layout({center: false});
  freeList16.addLast(2);
  freeList16.layout({center: false});
  av.g.line(215, freeListTop + 3 * spacing + 28, 250, freeListTop + 3 * spacing + 28,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});
  var freeList64 = av.ds.list({top: freeListTop + spacing * 5, left: 250, nodegap: 30});
  freeList64.layout({center: false});
  freeList64.addLast(4);
  freeList64.layout({center: false});
  freeList64.addLast(6);
  freeList64.layout({center: false});
  av.g.line(215, freeListTop + 5 * spacing + 28, 250, freeListTop + 5 * spacing + 28,
            {"arrow-end": "classic-wide-long", "stroke-width": 2});


  av.label("0", {left: 173, top: posY - 35});
  av.label("1", {left: 189, top: posY - 35});
  av.label("2", {left: 213, top: posY - 35});
  av.label("3", {left: 260, top: posY - 35});
  av.label("4", {left: 355, top: posY - 35});
  av.label("5", {left: 480, top: posY - 35});
  av.label("6", {left: 613, top: posY - 35});

  av.displayInit();
  av.recorded();
});
