/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction


var it4_consoleY,
  it4_consoleLabels;

$(document).ready(function() {
  "use strict";
  var av_name = "iteration4CON";
  var interpret = ODSA.UTILS.loadConfig({
    av_name: av_name
  }).interpreter;
  var av = new JSAV(av_name);

  var arrValues = [4, 13, 6, 9, 11];
  var leftMargin = 250,
    left = leftMargin - 150,
    top = 35,
    topMargin = top + 20;

  var nodegap = 40;

  // ------------------ top1 boxes, set count = 0
  var top1 = top;
  // blue part
  av.g.rect(left, top1, 160, 35, 10).addClass("bluebox");
  av.g.rect(left + 53, top1 + 8, 60, 20, 5).addClass("blueboxlight");
  // green part
  av.g.rect(left + 130, top1 + 9, 20, 17, 17).addClass("greenbox");
  av.g.rect(left + 147, top1, 55, 35, 10).addClass("greenbox");
  av.g.rect(left + 158, top1 + 6, 32, 23, 5).addClass("greenboxlight");
  var box1 = av.g.rect(left - 1, top1, 210, 40, 10).addClass("emptybox");

  // ------------------ top2 boxes, set total = 0
  var top2 = top + 40;
  // blue part
  av.g.rect(left, top2, 160, 35, 10).addClass("bluebox");
  av.g.rect(left + 50, top2 + 8, 50, 20, 5).addClass("blueboxlight");

  // green part
  av.g.rect(left + 117, top2 + 9, 20, 17, 17).addClass("greenbox");
  av.g.rect(left + 134, top2, 55, 35, 10).addClass("greenbox");
  av.g.rect(left + 143, top2 + 6, 32, 23, 5).addClass("greenboxlight");
  var box2 = av.g.rect(left - 1, top2 - 1, 195, 38, 10).addClass("emptybox");

  // ------------------ top3 boxes, purple, for each item
  // floor 2
  var top3 = top2 + 40
  av.g.rect(left, top3, 250, 35, 10).addClass("purplebox");
  av.g.rect(left, top3 + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  // ------------------ top4 boxes with green array
  //floor 3 and the JSAV array contains arrValues
  var top4 = top3 + 25;
  av.g.rect(left, top4, 30, 62, 10).addClass("purplebox").css({
    opacity: 0.9
  });
  av.g.rect(left + 73, top4, 30, 62, 10).addClass("purplebox").css({
    opacity: 0.9
  });

  // floor 3, JSAV array
  var top4_array = top3 + 19;
  var arr = av.ds.array(arrValues, {
    indexed: false,
    left: leftMargin,
    top: top4_array,
    position: "absolute"
  });

  // ------------------ top5 purple line box, for the line of white text, price
  //floor 4, long purple
  var top5 = top4 + 49;
  av.g.rect(left, top5, 300, 30, 10).addClass("purplebox");

  // ------------------ top 6, left big purple box, text "do"
  var top6 = top5 + 30;
  av.g.rect(left, top5, 110, 170, 10).addClass("purplebox");
  av.g.rect(left, top5, 50, 15).addClass("purplebox");

  // ------------------ top 7 first mid boxes, set count = count + 1
  var top7 = top5 + 40;
  av.g.rect(left + 130, top7, 180, 33, 10).addClass("bluebox");
  av.g.rect(left + 175, top7 + 7, 60, 20, 5).addClass("blueboxlight"); // white box for count
  av.g.rect(left + 253, top7 + 8, 20, 15, 15).addClass("calbox");
  av.g.rect(left + 270, top7, 120, 33, 10).addClass("calbox");
  av.g.rect(left + 279, top7 + 7, 100, 20, 5).addClass("purpleboxlight"); // white box for count + 1
  var box3 = av.g.rect(left + 130, top7, 260, 33, 10).addClass("emptybox");

  // ------------------ top 7 first mid boxes, set count = count + 1
  var top8 = top7 + 40;
  av.g.rect(left + 130, top8, 160, 33, 10).addClass("bluebox");
  av.g.rect(left + 175, top8 + 7, 50, 20, 5).addClass("blueboxlight"); // white box for total
  av.g.rect(left + 243, top8 + 8, 20, 15, 15).addClass("calbox");
  av.g.rect(left + 260, top8, 130, 33, 10).addClass("calbox");
  av.g.rect(left + 265, top8 + 7, 120, 20, 5).addClass("purpleboxlight"); // white box for count + 1
  var box4 = av.g.rect(left + 130, top8, 260, 33, 10).addClass("emptybox");

  // last purple floor
  var top9 = top6 + 90;
  av.g.rect(left + 90, top9, 240, 50, 10).addClass("purplebox");

  var top10 = top9 + 57;
  var box5 = av.g.rect(left, top10, 180, 35, 10).addClass("bluebox");
  av.g.rect(left + 40, top10 + 7, 75, 20, 5).addClass("blueboxlight"); // white box for average
  var box6 = av.g.rect(left + 138, top10 + 10, 20, 15, 15).addClass("calbox");
  var box7 = av.g.rect(left + 155, top10, 135, 35, 10).addClass("calbox");
  av.g.rect(left + 163, top10 + 7, 121, 20, 5).addClass("purpleboxlight"); // white box for total/count

  var top11 = top10 + 40;
  var botblue = av.g.rect(left, top11, 280, 35, 10).addClass("bluebox");

  // ------------------ labels ------------------------

  // box 1 text
  av.label("set", {
    left: left + 15,
    top: top1 - 19
  }).addClass("valLabels");
  av.label("count", {
    left: left + 56,
    top: top1 - 19
  }).addClass("valBlackLabels");
  av.label("=", {
    left: left + 115,
    top: top1 - 21
  }).addClass("valLabels");
  av.label("0", {
    left: left + 168,
    top: top1 - 18
  }).addClass("valBlackLabels");

  // box 2 text
  av.label("set", {
    left: left + 15,
    top: top2 - 19
  }).addClass("valLabels");
  av.label("total", {
    left: left + 52,
    top: top2 - 19
  }).addClass("valBlackLabels");
  av.label("=", {
    left: left + 105,
    top: top2 - 21
  }).addClass("valLabels");
  av.label("0", {
    left: left + 153,
    top: top2 - 18
  }).addClass("valBlackLabels");

  //for each iteam label inside of purple for loop box
  av.label("for each item", {
    left: left + 10,
    top: top3 - 30
  }).addClass("loopLabels");

  //price label inside of purple for loop box
  av.label("price", {
    left: left + 19,
    top: top4 + 20
  }).addClass("loopLabels");;

  // do label inside of purple for loop box
  av.label("do", {
    left: left + 35,
    top: top5 + 30
  }).addClass("loopLabels");

  //set total = total + price label for the mid boxes inside of for loop iteration
  av.label("set", {
    left: left + 140,
    top: top5 + 20
  }).addClass("valLabels");
  av.label("count", {
    left: left + 175,
    top: top5 + 20
  }).addClass("valBlackLabels");
  av.label("=", {
    left: left + 237,
    top: top5 + 20
  }).addClass("valLabels");
  av.label("count + 1", {
    left: left + 283,
    top: top5 + 20
  }).addClass("valBlackLabels");

  //set count label for the 2nd mid boxes inside of for loop iteration
  av.label("set", {
    left: left + 140,
    top: top7 + 20
  }).addClass("valLabels");
  av.label("total", {
    left: left + 180,
    top: top7 + 20
  }).addClass("valBlackLabels");
  av.label("=", {
    left: left + 228,
    top: top7 + 20
  }).addClass("valLabels");
  av.label("total + price", {
    left: left + 270,
    top: top7 + 20
  }).addClass("valBlackLabels");

  // set average label for the box, after the for loop
  av.label("set", {
    left: left + 5,
    top: top9 + 38
  }).addClass("valLabels");
  av.label("average", {
    left: left + 40,
    top: top9 + 38
  }).addClass("valBlackLabels");
  av.label("=", {
    left: left + 120,
    top: top9 + 38
  }).addClass("valLabels");
  av.label("total / count", {
    left: left + 165,
    top: top9 + 38
  }).addClass("valBlackLabels");

  var setavgpop = av.label("43 / 5", {
    left: left + 180,
    top: top9 - 5
  });
  setavgpop.addClass("loopLabels");
  setavgpop.addClass("valuelabelpb");
  setavgpop.hide();

  // print label for the last blue box
  av.label("print (average)", {
    left: left + 5,
    top: top10 + 20
  }).addClass("valLabels");



  // <<--------------- STATE BOX ----------------->>

  var stateX = 550;
  var stateY = 135;
  var boxLabelX = stateX + 23;
  var boxLabelX2 = stateX + 128;

  // STATE label
  av.label("STATE", {
    left: stateX + 55,
    top: stateY
  }).addClass("statelabellarge");

  //state box with maroon stroke
  av.g.rect(stateX - 25, stateY + 50, 220, 260).addClass("statebox");

  // count box and label
  av.label("count", {
    left: stateX + 8,
    top: stateY + 58
  }).addClass("statelabel");
  var countBox = av.g.rect(stateX - 5, stateY + 105, 70, 70).addClass("bluebox");
  var countBoxLabel = av.label("", {
    left: boxLabelX,
    top: stateY + 95
  }).addClass("loopLabels");

  // total box and label
  av.label("total", {
    left: stateX + 117,
    top: stateY + 58
  }).addClass("statelabel");
  var totalBox = av.g.rect(stateX + 100, stateY + 105, 70, 70).addClass("bluebox");
  var totalBoxLabel = av.label("", {
    left: boxLabelX2,
    top: stateY + 97
  }).addClass("loopLabels");

  // price box and label
  av.label("price", {
    left: stateX + 12,
    top: stateY + 171
  }).addClass("statelabel");
  var priceBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
  var priceBoxLabel = av.label("", {
    left: boxLabelX,
    top: stateY + 210
  }).addClass("loopLabels");

  // average box and label
  av.label("average", {
    left: stateX + 102,
    top: stateY + 171
  }).addClass("statelabel");
  var avgBox = av.g.rect(stateX + 100, stateY + 220, 70, 70).addClass("bluebox");
  var avgBoxLabel = av.label("", {
    left: boxLabelX2 - 12,
    top: stateY + 210
  }).addClass("loopLabels");

  // <<--------------- CONSOLE BOX ----------------->>

  var consoleX = 550;
  var consoleY = 0;

  // create CONSOLE label
  av.label("CONSOLE", {
    left: consoleX + 35,
    top: consoleY
  }).addClass("statelabellarge");;

  // create console box.
  var consoleBox = av.g.rect(consoleX, consoleY + 50, 170, 90).addClass("consolebox");
  var printavg = av.label("8.6", {
    left: consoleX + 20,
    top: consoleY + 90
  });
  printavg.addClass("consolelabels");
  printavg.addClass("midlabel");
  printavg.hide();

  // ------------------------console box line -----------------------
  var consoleLineY = consoleY + 270;
  for (var i = consoleY + 110; i > consoleY + 60; i -= 30) {
    var consoleline = av.g.line(consoleX, i, consoleX + 170, i);
    consoleline.addClass("consoleline");
  }

  // <<--------- Slide Show <<--------->>


  // Slide 1
  av.umsg(interpret("sc1"));
  var nextleft = leftMargin - 120;
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  box1.addClass("blueboxh");
  box1.removeClass("blueboxh");
  countBoxLabel.value("0")
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  box2.addClass("blueboxh");
  box2.removeClass("blueboxh");
  totalBoxLabel.value("0")
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.css({
    left: nextleft
  }); //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 4 ")
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 1 ")
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 4 ")
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  arr.css({
    left: nextleft
  }); //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 13 ")
  priceBoxLabel.css({
    left: boxLabelX - 7
  });
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 2 ")
  av.step();


  // Slide 10
  av.umsg(interpret("sc10"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 17 ")
  totalBoxLabel.css({
    left: boxLabelX2 - 7
  });
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.css({
    left: nextleft
  }); //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 6 ")
  priceBoxLabel.css({
    left: boxLabelX
  });
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 3 ");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 23 ");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  arr.css({
    left: nextleft
  }); //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 9 ")
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 4 ")
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 32 ")
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  arr.css({
    left: nextleft
  }); //move array
  nextleft -= (nodegap + 50); // calculate nextleft value for the final array moving
  priceBoxLabel.value(" 11 ")
  priceBoxLabel.css({
    left: boxLabelX - 7
  });
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 18
  av.umsg(interpret("sc18"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 5 ")
  av.step();
  //
  // Slide 19
  av.umsg(interpret("sc19"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 43 ")
  av.step();

  // Slide 20
  av.umsg(interpret("sc20"));
  arr.css({
    left: nextleft
  }); //move array
  av.step();

  // Slide 21
  av.umsg(interpret("sc21"));
  box6.addClass("calboxhigh");
  box7.addClass("calboxhigh");
  box6.removeClass("calboxhigh");
  box7.removeClass("calboxhigh");
  setavgpop.show();
  av.step();

  // Slide 22
  av.umsg(interpret("sc22"));
  box5.addClass("blueboxh");
  box5.removeClass("blueboxh");
  avgBox.addClass("blueboxh");
  avgBox.removeClass("blueboxh");
  avgBoxLabel.value(" 8.6 ")
  setavgpop.hide();
  av.step();


  // Slide 23
  av.umsg(interpret("sc23"));
  botblue.addClass("blueboxh");
  botblue.removeClass("blueboxh");
  printavg.show();
  av.step();

  // Slide 24
  av.umsg(interpret("sc24"));
  av.recorded();
});
