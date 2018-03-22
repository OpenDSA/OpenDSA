/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction
var it4_midblue1,
    it4_midblue2,
    it4_midblue3,
    it4_consoleLabels,
    it4_consoleY,
    it4_consoleLabelX,
    it4_consoleLabelY,
    it4_consoleGap,
    it4_printprice,
    it4_printpriceX,
    it4_printpriceY;

$(document).ready(function() {
  "use strict";

  //BlueStepAnim :This should come before JSAV Initialize
      JSAV.ext.blueStepAnim = JSAV.anim(function doBlueStep(delay, time, consoleIndex, priceValue) {
      if (this._shouldAnimate()) {

        setTimeout(function() {
            //  midblue 1 start
            it4_midblue1.addClass("blueboxh", {record: false});
            setTimeout(function() {
              it4_midblue1.removeClass("blueboxh", {record: false});

                // midblue 2 animation start -----------------
                setTimeout(function() {
                  it4_midblue2.addClass("blueboxh", {record: false});

                  setTimeout(function(){
                    it4_printprice.value(priceValue);

                    setTimeout(function(){

                      it4_printprice.css({left: it4_consoleLabelX, top:it4_consoleLabelY});
                      for(var i = 0; i <= consoleIndex; i++){
                          it4_consoleLabels[i].css({top: it4_consoleY + (it4_consoleGap * i)});
                          it4_consoleLabels[i].show();
                      }
                          it4_consoleY -= 30;
                      setTimeout(function(){
                        it4_midblue2.removeClass("blueboxh", {record: false});
                        it4_printprice.value("");
                        it4_printprice.css({left: it4_printpriceX, top:it4_printpriceY});

                        // midblue 3 animation start -----------------
                        setTimeout(function() {
                          it4_midblue3.addClass("blueboxh", {record: false});

                          setTimeout(function() {
                            it4_midblue3.removeClass("blueboxh", {record: false});
                          }, time);
                        }, time);
                        // midblue 3 animation close ---------------------

                      }, time + 800);

                    }, time);

                  }, time + 200);
                }, time);
                // midblue 2 animation close

            }, time);
          }, delay);
      }
    }, function undoBlueStep(elemSet) {});
    // BlueStepAnim END -----------------------------------------------zz


    //BlueStepAnim :This should come before JSAV Initialize
        JSAV.ext.bluehigh = JSAV.anim(function doBlueStep(item) {
        if (this._shouldAnimate()) {

            //  midblue 1 start
            item.addClass("blueboxh", {record: false});
            setTimeout(function() {
              item.removeClass("blueboxh", {record: false});
            }, 200);

        }
      }, function undoBlueStep(item) {});
      // BlueStepAnim END -----------------------------------------------

  var arrValues = [4, 13, 6, 9, 11];
  var av_name = "iteration4CON";
  var interpret = ODSA.UTILS.loadConfig({av_name: av_name}).interpreter;
  var av = new JSAV(av_name);
  var leftMargin = 270,
      rect_left = leftMargin - 150,
      rect0_top = 0,
      rect_top = 40,
      topMargin = rect_top + 20;

  var nodegap = 40;


  // blue boxes, floor 1, last floor
  var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
  var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

  // var rect_set = [];
  // floor 2
  av.g.rect(rect_left, rect_top, 250, 35.5, 10).addClass("purplebox");
  av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //floor 3 rects and array list JSAV contains arrValues' elements
  av.g.rect(rect_left, rect_top + 5, 30, 90, 10).addClass("purplebox").css({opacity: 0.7});
  av.g.rect(rect_left + 73, rect_top + 25, 30, 70, 10).addClass("purplebox").css({opacity: 0.9});
  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

  //floor 4, long purple
  av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("purplebox");

  //floor 5, left big purple box and 3 blue boxes
  av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("purplebox");
  av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //blue boxes and the the sets of it for the iterations later
  it4_midblue1 = av.g.rect(rect_left + 130, rect_top + 110, 180, 25, 10).addClass("bluebox");
  it4_midblue2 = av.g.rect(rect_left + 130, rect_top + 140, 180, 25, 10).addClass("bluebox");
  it4_midblue3 = av.g.rect(rect_left + 130, rect_top + 170, 180, 25, 10).addClass("bluebox");

  // last purple box.
  av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("purplebox");


  // ---------------loop -labels-----------------------
  av.label("for each item", {left: rect_left + 5, top: rect_top - 30}).addClass("loopLabels");
  av.label("price", {left: rect_left + 19, top: rect_top + 45}).addClass("loopLabels");
  av.label("do", {left: rect_left + 35, top: rect_top + 100}).addClass("loopLabels");
  av.label("print (price)", {left: rect_left + 160, top: rect_top + 112}).addClass("loopLabels").addClass("midlabel");


  var valuelabel = av.label("", {left: rect_left + 240, top: rect_top + 112});
  valuelabel.addClass("loopLabels");
  valuelabel.addClass("priceBoxLable");

  it4_printpriceX = rect_left + 240;
  it4_printpriceY = rect_top + 85;
  it4_printprice = av.label("", {left: it4_printpriceX, top: it4_printpriceY});
  it4_printprice.addClass("loopLabels");
  it4_printprice.addClass("valuelabelpb");

  // <<--------------- STATE BOX ----------------->>

  var stateX = 530;
  var stateY = 40;
  var stateLabel = av.label("STATE", {left: stateX, top: stateY + 30});
  stateLabel.addClass("statelabel");

  var stateBox = av.g.rect(stateX - 25, stateY + 80, 110, 150).addClass("statebox");

  // price box and label
  av.label("price", {left: stateX + 13, top: stateY + 95});
  stateLabel.addClass("statelabel");

  var priceBox = av.g.rect(stateX - 5, stateY + 135, 70, 70).addClass("bluebox");

  var pricelabelX = stateX + 23;
  var priceBoxLabel = av.label("", {left: pricelabelX, top: stateY + 130});
  priceBoxLabel.addClass("loopLabels");
  priceBoxLabel.addClass("midlabel");

  var totalBoxLabel = av.label("", {left: stateX + 23, top: stateY + 215});

  // <<--------------- CONSOLE BOX ----------------->>

  it4_consoleGap = 30;
  var consoleX = 655;
  var consoleY = 45;

  // create CONSOLE label
  av.label("CONSOLE", {left: consoleX + 40, top: consoleY}).addClass("statelabel");;

  // create console box.
  var consoleBox = av.g.rect(consoleX, consoleY + 50, 170, 180).addClass("consolebox");

  // create console labels will pop up later in the slides
  it4_consoleLabelX = consoleX + 20;
  it4_consoleLabelY = consoleY + 180;
  it4_consoleY = consoleY + 184;
  var label1 = av.label("4", {left: it4_consoleLabelX, top: it4_consoleY});
  var label2 = av.label("13", {left: it4_consoleLabelX, top: it4_consoleY});
  var label3 = av.label("6", {left: it4_consoleLabelX, top: it4_consoleY});
  var label4 = av.label("9", {left: it4_consoleLabelX, top: it4_consoleY});;
  var label5 = av.label("11", {left: it4_consoleLabelX, top: it4_consoleY});

  it4_consoleLabels = [label1, label2, label3, label4, label5];

// ------------------------console box line -----------------------
  var consoleLineY = consoleY + 270;
  for (var i = consoleY + 200; i > consoleY + 60; i -= 30){
      var consoleline = av.g.line(consoleX, i, consoleX + 170, i);
      consoleline.addClass("consoleline");
  }

  for(var i = 0; i < it4_consoleLabels.length; i++){
    it4_consoleLabels[i].addClass("consolelabels");
    it4_consoleLabels[i].addClass("smalllabel");
    it4_consoleLabels[i].hide();
  }

  // --------------------- start slide shows

  // Slide 1
  av.umsg(interpret("sc1"));
  var nextleft = leftMargin - 120;
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.bluehigh(topblue);
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  priceBoxLabel.value("4");
  priceBoxLabel.css({left: pricelabelX});
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  av.blueStepAnim(0, 100, 0, "4");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  it4_printprice.value("");
  priceBoxLabel.value("13");
  priceBoxLabel.css({left: pricelabelX - 6});
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  av.blueStepAnim(0, 100, 1, "13");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  it4_printprice.value("");
  priceBoxLabel.value("6");
  priceBoxLabel.css({left: pricelabelX});
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  av.blueStepAnim(0, 100, 2, "6");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  it4_printprice.value("");
  priceBoxLabel.value("9");
  priceBoxLabel.css({left: pricelabelX});
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  av.blueStepAnim(0, 100, 3, "9");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 50);
  it4_printprice.value("");
  priceBoxLabel.value("11");
  priceBoxLabel.css({left: pricelabelX - 6});
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  av.blueStepAnim(0, 100, 4, "11");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.css({left: nextleft});
  it4_printprice.value("");
  nextleft -= (nodegap + 100);

  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  av.bluehigh(botblue);
  av.recorded();
});
