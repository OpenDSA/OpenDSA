/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction
var it2_consoleLabels,
  it2_consoleY,
  it2_consoleLabelX,
  it2_consoleLabelY,
  it2_consoleGap,
  it2_printprice,
  it2_printpriceX,
  it2_printpriceY;

$(document).ready(function() {
  "use strict";

  //BlueStepAnim :This should come before JSAV Initialize
  JSAV.ext.blueStepAnim = JSAV.anim(function (delay, time, consoleIndex, list,
    priceValue, effectName) {
    if (this._shouldAnimate()) {

      setTimeout(function() {
        //  midblue 1 start
        list[0].addClass(effectName, {
          record: false
        });
        setTimeout(function() {
          list[0].removeClass(effectName, {
            record: false
          });

          // midblue 2 animation start -----------------
          setTimeout(function() {
            list[1].addClass(effectName, {
              record: false
            });

            setTimeout(function() {
              it2_printprice.value(priceValue);

              setTimeout(function() {

                it2_printprice.css({
                  left: it2_consoleLabelX,
                  top: it2_consoleLabelY
                });

                for (var i = 0; i <= consoleIndex; i++) {
                  it2_consoleLabels[i].css({
                    top: it2_consoleY[consoleIndex - i]
                  });
                }

                setTimeout(function() {
                  list[1].removeClass(effectName, {
                    record: false
                  });
                  it2_printprice.value("");
                  it2_printprice.css({
                    left: it2_printpriceX,
                    top: it2_printpriceY
                  });

                  // set time out to show label
                  setTimeout(function() {
                      it2_consoleLabels[consoleIndex].show();
                    }, time);

                  // midblue 3 animation start -----------------
                  setTimeout(function() {
                    list[2].addClass(effectName, {
                      record: false
                    });

                    setTimeout(function() {
                      list[2].removeClass(effectName, {
                        record: false
                      });
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

  //Animation :This should come before JSAV Initialize
  JSAV.ext.animation = JSAV.anim(function(item, time, effectName) {
    if (this._shouldAnimate()) {
      item.addClass(effectName, {
        record: false
      });
      setTimeout(function() {
        item.removeClass(effectName, {
          record: false
        });
      }, time);
    }
  }, function() {});
  // Animation END -----------------------------------------------



  var arrValues = [4, 13, 6, 9, 11];
  var av_name = "iteration2CON";
  var interpret = ODSA.UTILS.loadConfig({
    av_name: av_name
  }).interpreter;
  var av = new JSAV(av_name);
  var left = 120,
    top = 0,
    nextleft = left + 29, // for the array's movement
    nodegap = 40; // for the array's movement

  // blue boxes, floor 1, last floor
  var top1 = top;
  var topblue = av.g.rect(left, top1, 280, 35, 10).addClass("bluebox");
  var botblue = av.g.rect(left, top1 + 295, 280, 35, 10).addClass("bluebox");

  // floor 2
  var top2 = top1 + 40;
  av.g.rect(left, top2, 250, 35.5, 10).addClass("purplebox");
  av.g.rect(left, top2 + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //floor 3 rects and array list JSAV contains arrValues' elements
  av.g.rect(left, top2 + 5, 30, 90, 10).addClass("purplebox").css({
    opacity: 0.7
  });
  av.g.rect(left + 71, top2 + 25, 30, 70, 10).addClass("purplebox").css({
    opacity: 0.9
  });

  // array JSAV
  var arrayleft = left + 152;
  var arraytop = top + 60.5;
  var arr = av.ds.array(arrValues, {
    indexed: false,
    left: arrayleft,
    top: arraytop,
    position: "absolute"
  });

  //floor 4, long purple
  av.g.rect(left, top2 + 76, 300, 30, 10).addClass("purplebox");

  //floor 5, left big purple box and 3 blue boxes
  av.g.rect(left, top2 + 80, 110, 170, 10).addClass("purplebox");
  av.g.rect(left, top2 + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //blue boxes and the the sets of it for the iterations later

  var midblues = [];
  midblues[0] = av.g.rect(left + 130, top2 + 110, 180, 25, 10).addClass("bluebox");
  midblues[1] = av.g.rect(left + 130, top2 + 140, 180, 25, 10).addClass("bluebox");
  midblues[2] = av.g.rect(left + 130, top2 + 170, 180, 25, 10).addClass("bluebox");

  // last purple box.
  av.g.rect(left + 90, top2 + 200, 240, 50, 10).addClass("purplebox");

  // ---------------loop-labels-----------------------
  av.label("for each item", {
    left: left + 10,
    top: top2 - 26
  }).addClass("loopLabels");
  av.label("price", {
    left: left + 19,
    top: top2 + 45
  }).addClass("loopLabels");
  av.label("do", {
    left: left + 35,
    top: top2 + 100
  }).addClass("loopLabels");
  av.label("print (price)", {
    left: left + 160,
    top: top2 + 112
  }).addClass("loopLabels").addClass("midlabel");

  var valuelabel = av.label("", {
    left: left + 240,
    top: top2 + 112
  });
  valuelabel.addClass("loopLabels");
  valuelabel.addClass("priceBoxLable");

  // <<--------------- STATE BOX ----------------->>

  var stateX = 525;
  var stateY = 40;

  av.label("STATE", {
    left: stateX,
    top: stateY + 30
  }).addClass("statelabellarge");
  var stateBox = av.g.rect(stateX - 25, stateY + 80, 110, 150).addClass("statebox");

  // price box and label
  av.label("price", {
    left: stateX + 7,
    top: stateY + 90
  }).addClass("statelabel");
  av.g.rect(stateX - 5, stateY + 135, 70, 70).addClass("bluebox");
  var pricelabelX = stateX + 24;
  var priceBoxLabel = av.label("", {
    left: pricelabelX,
    top: stateY + 133
  });
  priceBoxLabel.addClass("loopLabels");
  priceBoxLabel.addClass("midlabel");

  // <<--------------- MOVING LABELS ----------------->>
  it2_printpriceX = pricelabelX;
  it2_printpriceY = stateY + 133;
  it2_printprice = av.label("", {
    left: it2_printpriceX,
    top: it2_printpriceY
  });
  it2_printprice.addClass("consolelabels");


  // <<--------------- CONSOLE BOX ----------------->>
  it2_consoleGap = 30;
  var consoleX = 655;
  var consoleY = 45;

  // create CONSOLE label
  av.label("CONSOLE", {
    left: consoleX + 35,
    top: consoleY
  }).addClass("statelabellarge");;

  // create console box.
  av.g.rect(consoleX, consoleY + 50, 170, 180).addClass("consolebox");

  // create console labels will pop up later in the slides
  it2_consoleLabelX = consoleX + 20;
  it2_consoleLabelY = consoleY + 183;
  it2_consoleY = [it2_consoleLabelY];
  for (var i = 1; i < 5; i++) {
    it2_consoleY[i] = it2_consoleY[i - 1] - 30;
  }
  var it2_consoleYCopy = it2_consoleY;
  it2_consoleLabels = [];
  it2_consoleLabels[0] = av.label("4", {
    left: it2_consoleLabelX,
    top: it2_consoleLabelY
  });
  it2_consoleLabels[1] = av.label("13", {
    left: it2_consoleLabelX,
    top: it2_consoleLabelY
  });
  it2_consoleLabels[2] = av.label("6", {
    left: it2_consoleLabelX,
    top: it2_consoleLabelY
  });
  it2_consoleLabels[3] = av.label("9", {
    left: it2_consoleLabelX,
    top: it2_consoleLabelY
  });;
  it2_consoleLabels[4] = av.label("11", {
    left: it2_consoleLabelX,
    top: it2_consoleLabelY
  });
  // ------------------------console box line -----------------------
  var consoleLineY = consoleY + 270;
  for (var i = consoleY + 200; i > consoleY + 60; i -= 30) {
    var consoleline = av.g.line(consoleX, i, consoleX + 170, i);
    consoleline.addClass("consoleline");
  }

  for (var i = 0; i < it2_consoleLabels.length; i++) {
    it2_consoleLabels[i].addClass("consolelabels");
    it2_consoleLabels[i].hide();
  }

  // --------------------- start slide shows

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  av.animation(topblue, 200, "blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  arr.css({
    left: nextleft
  });
  nextleft -= nodegap;
  priceBoxLabel.value("4");
  priceBoxLabel.css({
    left: pricelabelX
  });
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.blueStepAnim(0, 100, 0, midblues, "4", "blueboxh");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  arr.css({
    left: nextleft
  });
  nextleft -= nodegap;
  it2_printprice.value("");
  priceBoxLabel.value("13");
  priceBoxLabel.css({
    left: pricelabelX - 6
  });
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  av.blueStepAnim(0, 100, 1, midblues, "13", "blueboxh");
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  arr.css({
    left: nextleft
  });
  nextleft -= nodegap;
  it2_printprice.value("");
  priceBoxLabel.value("6");
  priceBoxLabel.css({
    left: pricelabelX
  });
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  av.blueStepAnim(0, 100, 2, midblues, "6", "blueboxh");
  av.step();

  // slide 10
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.css({
    left: nextleft
  });
  nextleft -= nodegap;
  it2_printprice.value("");
  priceBoxLabel.value("9");
  priceBoxLabel.css({
    left: pricelabelX
  });
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  av.blueStepAnim(0, 100, 3, midblues, "9", "blueboxh");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.css({
    left: nextleft
  });
  nextleft -= (nodegap + 50);
  it2_printprice.value("");
  priceBoxLabel.value("11");
  priceBoxLabel.css({
    left: pricelabelX - 6
  });
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  av.blueStepAnim(0, 100, 4, midblues, "11", "blueboxh");
  av.step();

  // Slide 15
  av.umsg(interpret("sc15"));
  arr.css({
    left: nextleft
  });
  it2_printprice.value("");
  nextleft -= (nodegap + 100);
  av.step();

  // Slide 16
  av.umsg(interpret("sc16"));
  av.animation(botblue, 200, "blueboxh");
  av.recorded();
});
