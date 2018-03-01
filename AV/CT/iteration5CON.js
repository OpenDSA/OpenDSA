/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction


var it3_consoleY,
    it3_consoleLabels;

$(document).ready(function() {
  "use strict";
  var av_name = "iteration5CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

  var arrValues = [4, 13, 6, 9, 11];
  var leftMargin = 250,
      rect_left = leftMargin - 150,
      rect_top = 0,
      topMargin = rect_top + 20;

  var nodegap = 40;

  // blue boxes, floor 1
  // var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
  var top1 = rect_top;
  var bluebox1 = av.g.rect(rect_left , top1, 160, 35, 10).addClass("bluebox");
  var greenbox1 = av.g.rect(rect_left + 130, top1 + 9, 20, 17, 17).addClass("greenbox");
  var greenboxb1 = av.g.rect(rect_left + 147, top1, 55, 35, 10).addClass("greenbox");

  var top2 = rect_top + 40;
  var bluebox2 = av.g.rect(rect_left , top2, 160, 35, 10).addClass("bluebox");
  var greenbox2 = av.g.rect(rect_left + 117, top2 + 9, 20, 17, 17).addClass("greenbox");
  var greenboxb2 = av.g.rect(rect_left + 134, top2, 55, 35, 10).addClass("greenbox");

  // floor 2
  var top3 = top2 + 40
  av.g.rect(rect_left, top3, 250, 35, 10).addClass("purplebox");
  av.g.rect(rect_left, top3 + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //floor 3 and the JSAV array contains arrValues
  var top4 = top3 + 25;
  av.g.rect(rect_left, top4, 30, 62, 10).addClass("purplebox").css({opacity: 0.9});
  av.g.rect(rect_left + 73, top4, 30, 62, 10).addClass("purplebox").css({opacity: 0.9});

  // floor 3, JSAV array
  var top4_array = top3 + 19;
  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: top4_array, position: "absolute"});

  //floor 4, long purple
  var top5 = top4 + 49;
  av.g.rect(rect_left, top5, 300, 30, 10).addClass("purplebox");

  //floor 5, left big purple box
  var top6 = top5 + 30;
  av.g.rect(rect_left, top5, 110, 170, 10).addClass("purplebox");
  av.g.rect(rect_left, top5, 50, 15).addClass("purplebox");

  //mid blue/calculate boxes 1 ( and "set total = ..." blue box )
  var top7 = top5 + 40;
  var midbluetop1 = av.g.rect(rect_left + 130, top7, 160, 33, 10).addClass("bluebox");
  var midbluetop2 = av.g.rect(rect_left + 243, top7 + 8, 20, 15, 15).addClass("calbox");
  var midbluetop3 = av.g.rect(rect_left + 260, top7, 130, 33, 10).addClass("calbox");

  //mid blue/calculate boxes 2 ( and "set total = ..." blue box )
  var top8 = top7 + 40;
  var midbluebot1 = av.g.rect(rect_left + 130, top8, 180, 33, 10).addClass("bluebox");
  var midbluebot2 = av.g.rect(rect_left + 253, top8 + 8, 20, 15, 15).addClass("calbox");
  var midbluebot3 = av.g.rect(rect_left + 270, top8, 120, 33, 10).addClass("calbox");

  // last purple floor
  var top9 = top6 + 90;
  av.g.rect(rect_left + 90, top9, 240, 50, 10).addClass("purplebox");

  var top10 = top9 + 57;
  var botblue1 = av.g.rect(rect_left, top10, 180, 35, 10).addClass("bluebox");
  var midblue2 = av.g.rect(rect_left + 138, top10 + 10, 20, 15, 15).addClass("calbox");
  var midblue3 = av.g.rect(rect_left + 155, top10, 130, 35, 10).addClass("calbox");

  var top11 = top10 + 40;
  var botblue = av.g.rect(rect_left, top11, 280, 35, 10).addClass("bluebox");

// ------------------ labels ------------------------

  av.label("set count =", {left: rect_left + 15, top: top1 - 21}).addClass("valLabels");
  av.label("0", {left: rect_left + 168, top: top1 - 18}).addClass("valLabels");

  av.label("set total =", {left: rect_left + 15, top: top2 - 21}).addClass("valLabels");
  av.label("0", {left: rect_left + 156, top: top2 - 18}).addClass("valLabels");

  //for each iteam label inside of purple for loop box
  av.label("for each item", {left: rect_left + 5, top: top3 - 30}).addClass("loopLabels");

  //price label inside of purple for loop box
  av.label("price", {left: rect_left + 19, top: top4 + 20}).addClass("loopLabels");;

  // do label inside of purple for loop box
  av.label("do", {left: rect_left + 35, top: top5 +30}).addClass("loopLabels");

  //set total = total + price label for the mid boxes inside of for loop iteration
  av.label("set total =", {left: rect_left + 140, top: top5 + 18}).addClass("valLabels");
  av.label("total + price", {left: rect_left + 270, top: top5 + 18}).addClass("valLabels");

  //set count label for the 2nd mid boxes inside of for loop iteration
  av.label("set count =", {left: rect_left + 140, top: top7 + 20}).addClass("valLabels");
  av.label("count + 1", {left: rect_left + 283, top: top7 + 20}).addClass("valLabels");

  // set average label for the box, after the for loop
  av.label("set average =", {left: rect_left + 5, top: top9 + 38}).addClass("valLabels");
  av.label("total / count", {left: rect_left + 165, top: top9 + 38}).addClass("valLabels");

  // print label for the last blue box
  av.label("print (average)", {left: rect_left + 5, top: top10 + 20}).addClass("valLabels");



  // <<--------------- STATE BOX ----------------->>

  var stateX = 530;
  var stateY = - 20;
  var boxLabelX = stateX + 23;
  var stateLabel = av.label("STATE", {left: stateX, top: stateY});
  stateLabel.addClass("statelabel");

  var stateBox = av.g.rect(stateX - 25, stateY + 50, 110, 280).addClass("statebox");

  // price box and label
  av.label("price", {left: stateX + 13, top: stateY + 65});
  stateLabel.addClass("statelabel");

  var priceBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");
  var priceBoxLabel = av.label("", {left:boxLabelX , top: stateY + 100});
  priceBoxLabel.addClass("loopLabels");
  priceBoxLabel.addClass("midlabel");

  // total box and label
  av.label("total", {left: stateX + 13, top: stateY + 180});
  stateLabel.addClass("statelabel");

  var totalBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
  var totalBoxLabel = av.label("", {left: boxLabelX, top: stateY + 215});
  totalBoxLabel.addClass("loopLabels");
  totalBoxLabel.addClass("midlabel");


  // <<--------------- CONSOLE BOX ----------------->>

  var consoleX = 655;
  var consoleY = 45;

  // create CONSOLE label
  av.label("CONSOLE", {left: consoleX + 40, top: consoleY}).addClass("statelabel");;

  // create console box.
  var consoleBox = av.g.rect(consoleX, consoleY + 50, 170, 180).addClass("consolebox");
  var printprice = av.label("43", {left: consoleX + 20, top: consoleY + 180});
  printprice.addClass("consolelabels");
  printprice.addClass("midlabel");
  printprice.hide();

  // ------------------------console box line -----------------------
    var consoleLineY = consoleY + 270;
    for (var i = consoleY + 200; i > consoleY + 60; i -= 30){
        var consoleline = av.g.line(consoleX, i, consoleX + 170, i);
        consoleline.addClass("consoleline");
    }



  // <<--------- Slide Show <<--------->>


  // Slide 0
  av.umsg(interpret("sc1"));
  // var nextleft = leftMargin - 120;
  av.displayInit();


  // Slide 1
  av.umsg(interpret("sc2"));
  // toppurple1.addClass("calboxhigh");
  // toppurple1.removeClass("calboxhigh");
  // toppurple2.addClass("calboxhigh");
  // toppurple2.removeClass("calboxhigh");
  av.step();

  // Slide 2
  av.umsg(interpret("sc2"));
  // topblue1.addClass("blueboxh");
  // topblue1.removeClass("blueboxh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // totalBoxLabel.value("0");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  // arr.css({left: nextleft});   //move array
  // nextleft -= nodegap; // calculate nextleft value for next array moving
  // priceBoxLabel.value(" 4 ")
  // priceBox.addClass("blueboxh");
  // priceBox.removeClass("blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  // midblue2.addClass("calboxhigh");
  // midblue2.removeClass("calboxhigh");
  // midblue3.addClass("calboxhigh");
  // midblue3.removeClass("calboxhigh");
  // valuelabel.value("0 + 4");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  // midblue1.addClass("calboxhigh");
  // midblue1.removeClass("calboxhigh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // totalBoxLabel.value(" 4 ");
  // valuelabel.value("");
  av.step();


  // Slide 6
  av.umsg(interpret("sc6"));
  // arr.css({left: nextleft});
  // nextleft -= nodegap;
  // priceBox.addClass("blueboxh");
  // priceBox.removeClass("blueboxh");
  // priceBoxLabel.value(" 13 ");
  // priceBoxLabel.css({left: boxLabelX - 5});
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  // midblue2.addClass("calboxhigh");
  // midblue2.removeClass("calboxhigh");
  // midblue3.addClass("calboxhigh");
  // midblue3.removeClass("calboxhigh");
  // valuelabel.value(" 4 + 13 ");
  av.step();


  // Slide 8
  av.umsg(interpret("sc8"));
  // totalBoxLabel.value(" 17 ");
  // totalBoxLabel.css({left: boxLabelX - 5});
  // midblue1.addClass("calboxhigh");
  // midblue1.removeClass("calboxhigh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // valuelabel.value("");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  // arr.css({left: nextleft});
  // nextleft -= nodegap;
  // priceBox.addClass("blueboxh");
  // priceBox.removeClass("blueboxh");
  // priceBoxLabel.value(" 6 ");
  // priceBoxLabel.css({left: boxLabelX});
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  // midblue2.addClass("calboxhigh");
  // midblue2.removeClass("calboxhigh");
  // midblue3.addClass("calboxhigh");
  // midblue3.removeClass("calboxhigh");
  // valuelabel.value(" 17 + 6 ");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  // totalBoxLabel.value(" 23 ");
  // midblue1.addClass("calboxhigh");
  // midblue1.removeClass("calboxhigh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // valuelabel.value("");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  // arr.css({left: nextleft});
  // nextleft -= nodegap;
  // priceBox.addClass("blueboxh");
  // priceBox.removeClass("blueboxh");
  // priceBoxLabel.value(" 9 ");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  // midblue2.addClass("calboxhigh");
  // midblue2.removeClass("calboxhigh");
  // midblue3.addClass("calboxhigh");
  // midblue3.removeClass("calboxhigh");
  // valuelabel.value(" 23 + 9 ");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  // totalBoxLabel.value(" 32 ");
  // midblue1.addClass("calboxhigh");
  // midblue1.removeClass("calboxhigh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // valuelabel.value("");
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  // arr.css({left: nextleft});
  // nextleft -= (nodegap + 50);
  // priceBox.addClass("blueboxh");
  // priceBox.removeClass("blueboxh");
  // priceBoxLabel.value(" 11 ");
  // priceBoxLabel.css({left: boxLabelX - 5});
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  // midblue2.addClass("calboxhigh");
  // midblue2.removeClass("calboxhigh");
  // midblue3.addClass("calboxhigh");
  // midblue3.removeClass("calboxhigh");
  // valuelabel.value(" 32 + 11 ");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  // totalBoxLabel.value(" 43 ");
  // midblue1.addClass("calboxhigh");
  // midblue1.removeClass("calboxhigh");
  // totalBox.addClass("blueboxh");
  // totalBox.removeClass("blueboxh");
  // valuelabel.value("");
  av.step();
  //
  // Slide 18
  av.umsg(interpret("sc18"));
  // arr.css({left: nextleft});
  // valuelabel.value("");
  av.step();

  // Slide 19
  av.umsg(interpret("sc19"));
  // botblue.addClass("blueboxh");
  // botblue.removeClass("blueboxh");
  printprice.show();
  av.recorded();

  //last Slide
    av.recorded();
});
