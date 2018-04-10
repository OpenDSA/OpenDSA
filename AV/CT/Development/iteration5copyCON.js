/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction


// var it3_consoleY,
//     it3_consoleLabels;

$(document).ready(function() {
  "use strict";
  var av_name = "iteration5copyCON";
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
  av.g.rect(rect_left , top1, 160, 35, 10).addClass("bluebox");

  av.g.rect(rect_left + 130, top1 + 9, 20, 17, 17).addClass("greenbox");
  av.g.rect(rect_left + 147, top1, 55, 35, 10).addClass("greenbox");
  var box1 = av.g.rect(rect_left, top1, 200, 35, 10).addClass("emptybox");

  var top2 = rect_top + 40;
  av.g.rect(rect_left , top2, 160, 35, 10).addClass("bluebox");
  av.g.rect(rect_left + 117, top2 + 9, 20, 17, 17).addClass("greenbox");
  av.g.rect(rect_left + 134, top2, 55, 35, 10).addClass("greenbox");
  var box2 = av.g.rect(rect_left , top2, 190, 35, 10).addClass("emptybox");

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

  //mid set count boxes 1 ( and "set count = ..." blue box )
  var top7 = top5 + 40;
  av.g.rect(rect_left + 130, top7, 180, 33, 10).addClass("bluebox");
  av.g.rect(rect_left + 253, top7 + 8, 20, 15, 15).addClass("calbox");
  av.g.rect(rect_left + 270, top7, 120, 33, 10).addClass("calbox");
  var box3 = av.g.rect(rect_left + 130, top7, 260, 33, 10).addClass("emptybox");

  //mid blue/calculate boxes 2 ( and "set total = ..." blue box )
  var top8 = top7 + 40;
  av.g.rect(rect_left + 130, top8, 160, 33, 10).addClass("bluebox");
  av.g.rect(rect_left + 243, top8 + 8, 20, 15, 15).addClass("calbox");
  av.g.rect(rect_left + 260, top8, 130, 33, 10).addClass("calbox");
  var box4 = av.g.rect(rect_left + 130, top8, 260, 33, 10).addClass("emptybox");

  // last purple floor
  var top9 = top6 + 90;
  av.g.rect(rect_left + 90, top9, 240, 50, 10).addClass("purplebox");

  var top10 = top9 + 57;
  var box5 = av.g.rect(rect_left, top10, 180, 35, 10).addClass("bluebox");
  var box6 = av.g.rect(rect_left + 138, top10 + 10, 20, 15, 15).addClass("calbox");
  var box7 = av.g.rect(rect_left + 155, top10, 130, 35, 10).addClass("calbox");

  var top11 = top10 + 40;
  var botblue = av.g.rect(rect_left, top11, 280, 35, 10).addClass("bluebox");

// ------------------ labels ------------------------

  av.label("set", {left: rect_left + 15, top: top1 - 19}).addClass("valLabels");
  av.label("count", {left: rect_left + 50, top: top1 - 19}).addClass("valLabels");
  av.label("=", {left: rect_left + 115, top: top1 - 21}).addClass("valLabels");
  av.label("0", {left: rect_left + 168, top: top1 - 18}).addClass("valLabels");

  av.label("set total =", {left: rect_left + 15, top: top2 - 21}).addClass("valLabels");
  av.label("0", {left: rect_left + 153, top: top2 - 18}).addClass("valLabels");

  //for each iteam label inside of purple for loop box
  av.label("for each item", {left: rect_left + 10, top: top3 - 30}).addClass("loopLabels");

  //price label inside of purple for loop box
  av.label("price", {left: rect_left + 19, top: top4 + 20}).addClass("loopLabels");;

  // do label inside of purple for loop box
  av.label("do", {left: rect_left + 35, top: top5 +30}).addClass("loopLabels");

  //set total = total + price label for the mid boxes inside of for loop iteration
  av.label("set count =", {left: rect_left + 140, top: top5 + 20}).addClass("valLabels");
  av.label("count + 1", {left: rect_left + 283, top: top5 + 20}).addClass("valLabels");

  //set count label for the 2nd mid boxes inside of for loop iteration
  av.label("set total =", {left: rect_left + 140, top: top7 + 18}).addClass("valLabels");
  av.label("total + price", {left: rect_left + 270, top: top7 + 18}).addClass("valLabels");

  // set average label for the box, after the for loop
  av.label("set average =", {left: rect_left + 5, top: top9 + 38}).addClass("valLabels");
  av.label("total / count", {left: rect_left + 165, top: top9 + 38}).addClass("valLabels");

  var setavgpop =   av.label("43 / 5", {left: rect_left + 180, top: top9 - 5});
  setavgpop.addClass("loopLabels");
  setavgpop.addClass("valuelabelpb");
  setavgpop.hide();

  // print label for the last blue box
  av.label("print (average)", {left: rect_left + 5, top: top10 + 20}).addClass("valLabels");



  // <<--------------- STATE BOX ----------------->>

  var stateX = 550;
  var stateY = 110;
  var boxLabelX = stateX + 23;
  var boxLabelX2 = stateX + 128;
  var stateLabel = av.label("STATE", {left: stateX, top: stateY});
  stateLabel.addClass("statelabel");

  //state box with maroon stroke
  av.g.rect(stateX - 25, stateY + 50, 220, 260).addClass("statebox");

  // count box and label
  av.label("count", {left: stateX + 3, top: stateY + 53}).addClass("statelabellarge");
  var countBox = av.g.rect(stateX - 5, stateY + 105, 70, 70 ).addClass("bluebox");
  var countBoxLabel = av.label("", {left:boxLabelX , top: stateY + 95}).addClass("loopLabels");

  // total box and label
  av.label("total", {left: stateX + 100, top: stateY + 53}).addClass("statelabellarge");
  var totalBox = av.g.rect(stateX + 100, stateY + 105, 70, 70).addClass("bluebox");
  var totalBoxLabel = av.label("", {left: boxLabelX2, top: stateY + 97}).addClass("loopLabels");

  // price box and label
  av.label("price", {left: stateX, top: stateY + 171}).addClass("statelabellarge");
  var priceBox = av.g.rect(stateX - 5, stateY + 220, 70, 70).addClass("bluebox");
  var priceBoxLabel = av.label("", {left: boxLabelX, top: stateY + 210}).addClass("loopLabels");

  // average box and label
  av.label("average", {left: stateX + 100, top: stateY + 171}).addClass("statelabellarge");
  var avgBox = av.g.rect(stateX + 100, stateY + 220, 70, 70).addClass("bluebox");
  var avgBoxLabel = av.label("", {left: boxLabelX2 - 12, top: stateY + 210}).addClass("loopLabels");

  // <<--------------- CONSOLE BOX ----------------->>

  var consoleX = 550;
  var consoleY = -25;

  // create CONSOLE label
  av.label("CONSOLE", {left: consoleX + 40, top: consoleY}).addClass("statelabel");;

  // create console box.
  var consoleBox = av.g.rect(consoleX, consoleY + 50, 170, 90).addClass("consolebox");
  var printavg = av.label("8.6", {left: consoleX + 20, top: consoleY + 90});
  printavg.addClass("consolelabels");
  printavg.addClass("midlabel");
  printavg.hide();

  // ------------------------console box line -----------------------
    var consoleLineY = consoleY + 270;
    for (var i = consoleY + 110; i > consoleY + 60; i -= 30){
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
  box1.addClass("blueboxh");
  box1.removeClass("blueboxh");
  countBoxLabel.value("0")
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  box2.addClass("blueboxh");
  box2.removeClass("blueboxh");
  totalBoxLabel.value("0")
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.css({left: nextleft});   //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 4 ")
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 1 ")
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 4 ")
  av.step();


  // Slide 7
  av.umsg(interpret("sc7"));
  arr.css({left: nextleft});   //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 13 ")
  priceBoxLabel.css({left: boxLabelX - 7});
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 9
  av.umsg(interpret("sc8"));
  box3.addClass("blueboxh");
  box3.removeClass("blueboxh");
  countBox.addClass("blueboxh");
  countBox.removeClass("blueboxh");
  countBoxLabel.value(" 2 ")
  av.step();


  // Slide 10
  av.umsg(interpret("sc8"));
  box4.addClass("blueboxh");
  box4.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 17 ")
  totalBoxLabel.css({left: boxLabelX2 - 7});
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.css({left: nextleft});   //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 6 ")
  priceBoxLabel.css({left: boxLabelX});
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
  arr.css({left: nextleft});   //move array
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
  arr.css({left: nextleft});   //move array
  nextleft -= (nodegap + 50); // calculate nextleft value for the final array moving
  priceBoxLabel.value(" 11 ")
  priceBoxLabel.css({left: boxLabelX - 7});
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
  arr.css({left: nextleft});   //move array
  av.step();

  // Slide 21 total/count blink
  av.umsg(interpret("sc21"));
  box6.addClass("calboxhigh");
  box7.addClass("calboxhigh");
  box6.removeClass("calboxhigh");
  box7.removeClass("calboxhigh");
  setavgpop.show();
  av.step();

  // Slide 22 set verage blink, average box assinged value
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
  av.recorded();

  // //last Slide
  // av.recorded();
});
