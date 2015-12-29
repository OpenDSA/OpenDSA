/*global ODSA */
// Written by Sally Hamouda and Cliff Shaffer
// Visualization for Towers of Hanoi
$(document).ready(function() {
  "use strict";
  var av_name = "recurTraceTOHCON";
  var av = new JSAV(av_name);
  var ttop = 0;
  var tleft = 0;
  var label0 = av.label("0", {left: tleft + 165, top: ttop + 73});
  var label1 = av.label("1", {left: tleft + 180, top: ttop + 103});
  var label2 = av.label("2", {left: tleft + 195, top: ttop + 133});
  var label3 = av.label("3", {left: tleft + 210, top: ttop + 163});
  // Poles
  av.g.rect(tleft + 105, ttop + 20, 10, 180).addClass("polecolor");
  av.g.rect(tleft + 375, ttop + 20, 10, 180).addClass("polecolor");
  av.g.rect(tleft + 605, ttop + 20, 10, 180).addClass("polecolor");
  // The moving disks
  var rect0 = av.g.rect(tleft + 65, ttop + 90, 90, 20).addClass("disk0color");
  var rect1 = av.g.rect(tleft + 50, ttop + 120, 120, 20).addClass("disk1color");
  var rect2 = av.g.rect(tleft + 35, ttop + 150, 150, 20).addClass("disk2color");
  var rect3 = av.g.rect(tleft + 20, ttop + 180, 180, 20).addClass("disk3color");
  // Labels for each tower
  av.label("A", {left: tleft + 105, top: ttop - 20});
  av.label("B", {left: tleft + 375, top: ttop - 20});
  av.label("C", {left: tleft + 605, top: ttop - 20});

  // Slide 1
  av.displayInit();

  // Slide 2
  rect0.hide();
  rect0 = av.g.rect(565, 180, 90, 20).addClass("disk0color");
  label0.css({left: 660, top: 163});
  av.step();

  // Slide 3
  rect1.hide();
  rect1 = av.g.rect(315, 180, 120, 20).addClass("disk1color");
  label1.css({left: 440, top: 163});
  av.step();

  // Slide 4
  rect0.hide();
  rect0 = av.g.rect(330, 150, 90, 20).addClass("disk0color");
  label0.css({left: 425, top: 130});
  av.step();

  // Slide 5
  rect2.hide();
  rect2 = av.g.rect(540, 180, 150, 20).addClass("disk2color");
  label2.css({left: 698, top: 163});
  av.step();

  // Slide 6
  rect0.hide();
  rect0 = av.g.rect(65, 150, 90, 20).addClass("disk0color");
  label0.css({left: 165, top: 132});
  av.step();

  // Slide 7
  rect1.hide();
  rect1 = av.g.rect(550, 150, 120, 20).addClass("disk1color");
  label1.css({left: 686, top: 132});
  av.step();

  // Slide 8
  rect0.hide();
  rect0 = av.g.rect(565, 120, 90, 20).addClass("disk0color");
  label0.css({left: 660, top: 102});
  av.step();

  // Slide 9
  rect3.hide();
  rect3 = av.g.rect(295, 180, 180, 20).addClass("disk3color");
  label3.css({left: 480, top: 162});
  av.step();

  // Slide 10
  rect0.hide();
  rect0 = av.g.rect(330, 150, 90, 20).addClass("disk0color");
  label0.css({left: 428, top: 132});
  av.step();

  // Slide 11
  rect1.hide();
  rect1 = av.g.rect(50, 180, 120, 20).addClass("disk1color");
  label1.css({left: 180, top: 162});
  av.step();

  // Slide 12
  rect0.hide();
  rect0 = av.g.rect(65, 150, 90, 20).addClass("disk0color");
  label0.css({left: 165, top: 132});
  av.step();

  // Slide 13
  rect2.hide();
  rect2 = av.g.rect(310, 150, 150, 20).addClass("disk2color");
  label2.css({left: 468, top: 132});
  av.step();

  // Slide 14
  rect0.hide();
  rect0 = av.g.rect(565, 180, 90, 20).addClass("disk0color");
  label0.css({left: 660, top: 162});
  av.step();

  // Slide 15
  rect1.hide();
  rect1 = av.g.rect(320, 120, 120, 20).addClass("disk1color");
  label1.css({left: 450, top: 102});
  av.step();

  // Slide 16
  rect0.hide();
  rect0 = av.g.rect(340, 90, 90, 20).addClass("disk0color");
  label0.css({left: 440, top: 72});
  av.recorded();
});
