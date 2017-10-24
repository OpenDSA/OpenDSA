/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction
var midblue1,
    midblue2,
    midblue3;

$(document).ready(function() {
  "use strict";

  //BlueStepAnim :This should come before JSAV Initialize
      JSAV.ext.blueBoxHigh = JSAV.anim(function doBlueStep() {
      if (this._shouldAnimate()) {

          //  midblue 1 start
          midblue1.addClass("blueboxh", {record: false});
          setTimeout(function() {
            midblue1.removeClass("blueboxh", {record: false});

              // midblue 2 animation start -----------------
              setTimeout(function() {
                midblue2.addClass("blueboxh", {record: false});
                setTimeout(function() {
                  midblue2.removeClass("blueboxh", {record: false});

                  // midblue 3 animation start -----------------
                  setTimeout(function() {
                    midblue3.addClass("blueboxh", {record: false});
                    setTimeout(function() {
                      midblue3.removeClass("blueboxh", {record: false});
                    }, 200);
                  }, 200);
                  // midblue 3 animation close ---------------------

                }, 200);
              }, 200);
              // midblue 2 animation close

          }, 200);

      }
    }, function undoBlueStep(elemSet) {});
    // BlueStepAnim END -----------------------------------------------


    //BlueStepAnim :This should come before JSAV Initialize
        JSAV.ext.blueStepAnim = JSAV.anim(function doBlueStep() {
        if (this._shouldAnimate()) {

            //  midblue 1 start
            midblue1.addClass("blueboxh", {record: false});
            setTimeout(function() {
              midblue1.removeClass("blueboxh", {record: false});
            }, 200);

        }
      }, function undoBlueStep(elemSet) {});
      // BlueStepAnim END -----------------------------------------------

  var arrValues = [4, 13, 6, 9, 11];
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
  var topblue = av.g.rect(rect_left, rect0_top, 280, 35, 10).addClass("bluebox");
  var botblue = av.g.rect(rect_left, rect0_top + 295, 280, 35, 10).addClass("bluebox");

  // var rect_set = [];
  // floor 2
  av.g.rect(rect_left, rect_top, 250, 35.5, 10).addClass("box");
  av.g.rect(rect_left, rect_top + 20, 50, 15).addClass("box"); // for no-roung on the corner

  //floor 3 rects and array list JSAV contains arrValues' elements
  av.g.rect(rect_left, rect_top + 5, 30, 90, 10).addClass("box").css({opacity: 0.9});
  av.g.rect(rect_left + 73, rect_top + 25, 30, 70, 10).addClass("box").css({opacity: 0.9});
  var arr = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

  //floor 4, long purple
  av.g.rect(rect_left, rect_top + 76, 300, 30, 10).addClass("box");

  //floor 5, left big purple box and 3 blue boxes
  av.g.rect(rect_left, rect_top + 80, 110, 170, 10).addClass("box");
  av.g.rect(rect_left, rect_top + 76, 50, 15).addClass("box"); // for no-roung on the corner

  //blue boxes and the the sets of it for the iterations later
  midblue1 = av.g.rect(rect_left + 130, rect_top + 110, 180, 25, 10).addClass("bluebox");
  midblue2 = av.g.rect(rect_left + 130, rect_top + 140, 180, 25, 10).addClass("bluebox");
  midblue3 = av.g.rect(rect_left + 130, rect_top + 170, 180, 25, 10).addClass("bluebox");

  // last purple box.
  av.g.rect(rect_left + 90, rect_top + 200, 240, 50, 10).addClass("box");


  // ----------------------labels-----------------------
  var label1 = av.label("for each item", {left: rect_left + 5, top: rect_top - 30});
  label1.addClass("labels");

  var label2 = av.label("price", {left: rect_left + 19, top: rect_top + 45});
  label2.addClass("labels");

  var label3 = av.label("do", {left: rect_left + 35, top: rect_top + 100});
  label3.addClass("labels");

  var pricelabel = av.label("price: ", {left: rect_left + 160, top: rect_top + 110});
  pricelabel.addClass("labels");
  pricelabel.addClass("midlabel");

  var valuelabel = av.label("", {left: rect_left + 240, top: rect_top + 112});
  valuelabel.addClass("labels");
  valuelabel.addClass("valuelabel");


  // ----------------------slide show methods-----------------------


// Blink a blue box, just for one.
  function blink(it) {
      it.addClass("blueboxhigh");
}

  function pauseblink(it) {
    it.addClass("midblue2high");
    valuelabel.value("4");
  }

  // --------------------- start slide shows

  // Slide 1
  av.umsg(interpret("sc1"));
  var nextleft = leftMargin - 120;
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  blink(topblue);
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  midblue1.addClass("midblue1high");
  pauseblink(midblue2);
  midblue3.addClass("midblue3high");
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  arr.css({left: nextleft});
  midblue1.removeClass("midblue1high");
  midblue2.removeClass("midblue2high");
  midblue3.removeClass("midblue3high");
  nextleft -= nodegap;
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  midblue1.addClass("midblue1high");
  midblue2.addClass("midblue2high");
  midblue3.addClass("midblue3high");
  valuelabel.value("13");
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  midblue1.addClass("midblue1high");
  midblue2.addClass("midblue2high");
  midblue3.addClass("midblue3high");
  valuelabel.value("21");
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  arr.css({left: nextleft});
  nextleft -= nodegap;
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  midblue1.addClass("midblue1high");
  midblue2.addClass("midblue2high");
  midblue3.addClass("midblue3high");
  valuelabel.value("9");
  av.step();

  // Slide 11
  av.umsg(interpret("sc11"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 50);
  av.step();

  // Slide 12
  av.umsg(interpret("sc12"));
  midblue1.addClass("midblue1high");
  midblue2.addClass("midblue2high");
  midblue3.addClass("midblue3high");
  valuelabel.value("11");
  av.step();

  // Slide 13
  av.umsg(interpret("sc13"));
  arr.css({left: nextleft});
  nextleft -= (nodegap + 100);
  valuelabel.value("");
  av.step();

  // Slide 14
  av.umsg(interpret("sc14"));
  blink(botblue);
  av.recorded();
});
