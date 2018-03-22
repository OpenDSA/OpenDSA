/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction


var it3_consoleY,
    it3_consoleLabels;

$(document).ready(function() {
  "use strict";
  var av_name = "iteration3CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);

  var arrValues = [4, 13, 6, 9, 11];
  var leftMargin = 270,
      rect_left = leftMargin - 150,
      rect0_top = 0,
      rect_top = 40,
      topMargin = rect_top + 20;

  var nodegap = 40;

  var topblue1 = av.g.rect(rect_left , rect0_top, 140, 35, 10).addClass("bluebox");
  av.g.rect(rect_left + 43, rect0_top + 8, 50, 20, 5).addClass("blueboxlight");

  var topgreen1 = av.g.rect(rect_left + 105, rect0_top + 10, 20, 17, 17)
  topgreen1.addClass("greenbox");
  var topgreen2 = av.g.rect(rect_left + 120, rect0_top, 55, 35, 10).addClass("greenbox");
  av.g.rect(rect_left + 130, rect0_top + 6, 32, 23, 5).addClass("greenboxlight");


  // floor 2
  av.g.rect(rect_left, rect_top, 250, 35, 10).addClass("purplebox");
  av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //floor 3 and the JSAV array contains arrValues
  av.g.rect(rect_left, rect_top + 25, 30, 60, 10).addClass("purplebox").css({opacity: 0.7});
  av.g.rect(rect_left + 73, rect_top + 25, 30, 60, 10).addClass("purplebox").css({opacity: 0.9});
  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

  //floor 4, long purple
  av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("purplebox");

  //floor 5, left big purple box
  av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("purplebox");
  av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("purplebox");

  //mid blue/calculate boxes ( and "set total = ..." blue box )
  var midblue1 = av.g.rect(rect_left + 130, rect_top + 120, 130, 66, 10).addClass("bluebox");
  var midblue2 = av.g.rect(rect_left + 220, rect_top + 139, 20, 32, 15).addClass("calbox");
  var midblue3 = av.g.rect(rect_left + 240, rect_top + 120, 120, 66, 10).addClass("calbox");

  // last purple floor
  av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("purplebox");

  // last blue floor
  var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

// ------------------ labels ------------------------

  av.label("set", {left: rect_left + 8, top: rect_top - 58}).addClass("valLabels");
  av.label("total", {left: rect_left + 45, top: rect_top - 58}).addClass("valBlackLabels");
  av.label("=", {left: rect_left + 93, top: rect_top - 58}).addClass("valLabels");
  av.label("0", {left: rect_left + 140, top: rect_top - 58}).addClass("valBlackLabels");

  var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 30});
  label1.addClass("loopLabels");

  var label2 = av.label("price", {left: rect_left + 19, top: rect_top + 45});
  label2.addClass("loopLabels");

  var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 100});
  label3.addClass("loopLabels");

  var pricelabel = av.label("set total = total + price", {left: rect_left + 140, top: rect_top + 117});
  pricelabel.addClass("loopLabels");
  pricelabel.addClass("smalllabel");

  var pricelabel = av.label("print (total)", {left: rect_left + 5, top: rect_top + 235});
  pricelabel.addClass("loopLabels");
  pricelabel.addClass("smalllabel");

  var valuelabel = av.label("", {left: rect_left + 270, top: rect_top + 165});
  valuelabel.addClass("loopLabels");
  valuelabel.addClass("valuelabelpb");


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
  var nextleft = leftMargin - 120;
  av.displayInit();


  // Slide 1
  av.umsg(interpret("sc2"));
  topgreen1.addClass("blueboxh");
  topgreen1.removeClass("blueboxh");
  topgreen2.addClass("blueboxh");
  topgreen2.removeClass("blueboxh");
  av.step();

  // Slide 2
  av.umsg(interpret("sc2"));
  topblue1.addClass("blueboxh");
  topblue1.removeClass("blueboxh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value("0");
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});   //move array
  nextleft -= nodegap; // calculate nextleft value for next array moving
  priceBoxLabel.value(" 4 ")
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  midblue2.addClass("calboxhigh");
  midblue2.removeClass("calboxhigh");
  midblue3.addClass("calboxhigh");
  midblue3.removeClass("calboxhigh");
  valuelabel.value("0 + 4");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  midblue1.addClass("calboxhigh");
  midblue1.removeClass("calboxhigh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  totalBoxLabel.value(" 4 ");
  valuelabel.value("");
  av.step();


  // Slide 6
  av.umsg(interpret("sc6"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  priceBoxLabel.value(" 13 ");
  priceBoxLabel.css({left: boxLabelX - 5});
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  midblue2.addClass("calboxhigh");
  midblue2.removeClass("calboxhigh");
  midblue3.addClass("calboxhigh");
  midblue3.removeClass("calboxhigh");
  valuelabel.value(" 4 + 13 ");
  av.step();


  // Slide 8
  av.umsg(interpret("sc8"));
  totalBoxLabel.value(" 17 ");
  totalBoxLabel.css({left: boxLabelX - 5});
  midblue1.addClass("calboxhigh");
  midblue1.removeClass("calboxhigh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  valuelabel.value("");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  priceBoxLabel.value(" 6 ");
  priceBoxLabel.css({left: boxLabelX});
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  midblue2.addClass("calboxhigh");
  midblue2.removeClass("calboxhigh");
  midblue3.addClass("calboxhigh");
  midblue3.removeClass("calboxhigh");
  valuelabel.value(" 17 + 6 ");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  totalBoxLabel.value(" 23 ");
  midblue1.addClass("calboxhigh");
  midblue1.removeClass("calboxhigh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  valuelabel.value("");
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  priceBoxLabel.value(" 9 ");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  midblue2.addClass("calboxhigh");
  midblue2.removeClass("calboxhigh");
  midblue3.addClass("calboxhigh");
  midblue3.removeClass("calboxhigh");
  valuelabel.value(" 23 + 9 ");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  totalBoxLabel.value(" 32 ");
  midblue1.addClass("calboxhigh");
  midblue1.removeClass("calboxhigh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  valuelabel.value("");
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 50);
  priceBox.addClass("blueboxh");
  priceBox.removeClass("blueboxh");
  priceBoxLabel.value(" 11 ");
  priceBoxLabel.css({left: boxLabelX - 5});
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  midblue2.addClass("calboxhigh");
  midblue2.removeClass("calboxhigh");
  midblue3.addClass("calboxhigh");
  midblue3.removeClass("calboxhigh");
  valuelabel.value(" 32 + 11 ");
  av.step();

  // Slide 17
  av.umsg(interpret("sc17"));
  totalBoxLabel.value(" 43 ");
  midblue1.addClass("calboxhigh");
  midblue1.removeClass("calboxhigh");
  totalBox.addClass("blueboxh");
  totalBox.removeClass("blueboxh");
  valuelabel.value("");
  av.step();
  //
  // Slide 18
  av.umsg(interpret("sc18"));
  arr.css({left: nextleft});
  valuelabel.value("");
  av.step();

  // Slide 19
  av.umsg(interpret("sc19"));
  botblue.addClass("blueboxh");
  botblue.removeClass("blueboxh");
  printprice.show();
  av.recorded();

  //last Slide
    av.recorded();
});
