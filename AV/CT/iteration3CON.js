/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction
$(document).ready(function() {
  "use strict";
  var arrValues = [9.95, 10.14, 10.33, 4.88, 8.92];
  var av_name = "iteration3CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var leftMargin = 450,
      rect_left = 300,
      rect0_top = 0,
      rect_top = 40,
      topMargin = rect_top + 20;

  var nodegap = 40;


  // blue boxes, floor 1
  var topblue = av.g.rect(rect_left, rect0_top, 280, 35).addClass("bluebox");
  var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35).addClass("bluebox");

  // floor 2
  av.g.rect(rect_left, rect_top, 250, 35).addClass("box");

  //floor 3 and the JSAV array contains arrValues
  av.g.rect(rect_left, rect_top + 35, 30, 48).addClass("box");
  av.g.rect(rect_left + 73, rect_top + 35, 30, 50).addClass("box");
  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

  //floor 4, long purple
  av.g.rect(rect_left, rect_top + 76, 300, 30).addClass("box");

  //floor 5, left big purple box and "set total = ..." blue box
  av.g.rect(rect_left, rect_top + 80, 110, 170).addClass("box");
  var midblue = av.g.rect(rect_left + 130, rect_top + 120, 225, 66).addClass("bluebox");

  // last purple floor
  av.g.rect(rect_left + 110, rect_top + 200, 220, 50).addClass("box");


// ------------------ labels ------------------------

  var initlabel = av.label("set total = 0", {left: rect_left + 5, top: rect_top - 65});
  initlabel.addClass("labels").addClass("midlabel");

  var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 30});
  label1.addClass("labels");

  var label2 = av.label("price", {left: rect_left + 19, top: rect_top + 45});
  label2.addClass("labels");

  var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 100});
  label3.addClass("labels");

  var pricelabel = av.label("set total = total + price", {left: rect_left + 140, top: rect_top + 117});
  pricelabel.addClass("labels");
  pricelabel.addClass("smalllabel");

  var valuelabel = av.label("", {left: rect_left + 390, top: rect_top + 111});
  valuelabel.addClass("labels");
  valuelabel.addClass("valuelabel");


  // <<--------------- STATE BOX ----------------->>

  var stateX = 150;
  var stateY = 110;
  var stateLabel = av.label("STATE", {left: stateX, top: stateY});
  stateLabel.addClass("statelabel");

  var stateBox = av.g.rect(stateX - 25, stateY + 50, 110, 150).addClass("statebox");

  var totalLabel = av.label("TOTAL", {left: stateX + 5, top: stateY + 65});
  stateLabel.addClass("statelabel");

  var totalBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");

  var totallabel = av.label("", {left: stateX + 23, top: stateY + 100});
  totallabel.addClass("labels");
  totallabel.addClass("midlabel");

  // <<--------- Slide Show <<--------->>


  // Slide 1
  av.umsg(interpret("sc1"));
  var nextleft = leftMargin - 120;
  av.displayInit();


  // Slide 2
  av.umsg(interpret("sc2"));
  topblue.addClass("blueboxhigh");
  topblue.removeClass("blueboxhigh");
  totallabel.value("0");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});   //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  midblue.addClass("blueboxhigh");
  midblue.removeClass("blueboxhigh");
  valuelabel.value("0 + 9.95");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  totallabel.value(" 9.95 ");
  totallabel.css({left: stateX + 9});
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  midblue.addClass("blueboxhigh");
  midblue.removeClass("blueboxhigh");
  valuelabel.value(" 9.95 + 10.14 ");
  av.step();


  // Slide 8
  av.umsg(interpret("sc8"));
  totallabel.value(" 20.09 ");
  totallabel.css({left: stateX});
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  midblue.addClass("blueboxhigh");
  midblue.removeClass("blueboxhigh");
  valuelabel.value(" 20.09 + 10.33 ");
  av.step();


  // Slide 11
  av.umsg(interpret("sc11"));
  totallabel.value(" 30.42 ");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  midblue.addClass("blueboxhigh");
  midblue.removeClass("blueboxhigh");
  valuelabel.value(" 30.42 + 4.88 ");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  totallabel.value(" 35.30 ");
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 50);
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  midblue.addClass("blueboxhigh");
  midblue.removeClass("blueboxhigh");
  valuelabel.value(" 35.30 + 8.92 ");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  totallabel.value(" 44.22 ");
  av.step();

  // Slide 18
  av.umsg(interpret("sc18"));
  arr.css({left: nextleft});
  valuelabel.value("");
  av.step();

  // Slide 19
  av.umsg(interpret("sc19"));
  botblue.addClass("blueboxhigh");
  botblue.removeClass("blueboxhigh");
  av.recorded();
});
