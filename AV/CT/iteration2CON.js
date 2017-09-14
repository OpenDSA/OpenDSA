/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction
$(document).ready(function() {
  "use strict";
  var arrValues = [9.95, 10.14, 10.33, 4.88, 8.92];
  var av_name = "iteration2CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var leftMargin = 450,
      rect_left = 300,
      rect0_top = 0,
      rect_top = 40,
      topMargin = rect_top + 20;

  var nodegap = 40;


  // blue boxes, floor 1, last floor
  var topblue = av.g.rect(rect_left, rect0_top, 280, 35).addClass("bluebox");
  var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35).addClass("bluebox");

  var rect_set = [];
  // floor 2
  rect_set[0] = av.g.rect(rect_left, rect_top, 250, 35).addClass("box");


  //floor 3
  rect_set[1] = av.g.rect(rect_left, rect_top + 35, 30, 48).addClass("box");
  rect_set[2] = av.g.rect(rect_left + 73, rect_top + 35, 30, 50).addClass("box");

  //floor 4, long purple
  rect_set[3] = av.g.rect(rect_left, rect_top + 75, 300, 30).addClass("box");

  //floor 5, left big purple box and 3 blue boxes
  rect_set[4] = av.g.rect(rect_left, rect_top + 80, 110, 170).addClass("box");

  //blue boxes and the the lists for iteration
  var midblue1 = av.g.rect(rect_left + 130, rect_top + 110, 180, 25).addClass("bluebox");
  var midblue2 = av.g.rect(rect_left + 130, rect_top + 140, 180, 25).addClass("bluebox");
  var midblue3 = av.g.rect(rect_left + 130, rect_top + 170, 180, 25).addClass("bluebox");
  var animset = [midblue1, midblue2, midblue3];

  rect_set[5] = av.g.rect(rect_left + 110, rect_top + 200, 220, 50).addClass("box");

  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

  var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 30});
  label1.addClass("labels");

  var label2 = av.label("price", {left: rect_left + 19, top: rect_top + 45});
  label2.addClass("labels");

  var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 100});
  label3.addClass("labels");

  var pricelabel = av.label("price: ", {left: rect_left + 160, top: rect_top + 110});
  pricelabel.addClass("labels");
  pricelabel.addClass("midlabel");

  var valuelabel = av.label("", {left: rect_left + 230, top: rect_top + 111});
  valuelabel.addClass("labels");
  valuelabel.addClass("valuelabel");


  // ----------------------slide show methods-----------------------

    function blueHighlight(animset){
      for(var i = 0; i < animset.length; i++){
        animset[i].addClass("blueboxhigh");
        animset[i].removeClass("blueboxhigh");
      }
    }



  // --------------------- start slide shows

  // Slide
  av.umsg(interpret("sc1"));
  var nextleft = leftMargin - 120;
  av.displayInit();

  av.umsg(interpret(""));
  topblue.addClass("blueboxhigh");
  topblue.removeClass("blueboxhigh");
  av.step();

  // Slide
  av.umsg(interpret("sc2"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide
  av.umsg(interpret(""));
  blueHighlight(animset);
  valuelabel.value("9.95");
  av.step();

  // Slide
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide
  av.umsg(interpret(""));
  blueHighlight(animset);
  valuelabel.value("10.14");
  av.step();

  // Slide
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide
  av.umsg(interpret("sc4"));
  blueHighlight(animset);
  valuelabel.value("10.33");
  av.step();

  // Slide
  av.umsg(interpret("sc5"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide
  av.umsg(interpret("sc5"));
  blueHighlight(animset);
  valuelabel.value("4.88");
  av.step();

  // Slide
  av.umsg(interpret("sc6"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 50);
  av.step();

  // Slide
  av.umsg(interpret("sc6"));
  blueHighlight(animset);
  valuelabel.value("8.92");
  av.step();

  // Slide
  av.umsg(interpret("sc7"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 100);
  valuelabel.value("");
  av.step();

  // Slide
  av.umsg(interpret("sc7"));
  botblue.addClass("blueboxhigh");
  botblue.removeClass("blueboxhigh");
  av.recorded();
});
