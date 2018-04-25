/*global ODSA */
// Written by Jieun Chon
//Array-Based list introduction 1

$(document).ready(function() {
  "use strict";
  var arrValues = [4, 13, 6, 9, 11];
  var av_name = "iteration1CON";
  var interpret = ODSA.UTILS.loadConfig({
    av_name: av_name
  }).interpreter;

  //animListRecursion :This should come before JSAV Initialize
  // This method make animation recursively.
  JSAV.ext.animListRecursion = JSAV.anim(function(delay, time, list, index, effectName) {
    if (index < list.length && this._shouldAnimate()) {
      setTimeout(function() {
        list[index].addClass(effectName, {
          record: false
        });
        setTimeout(function() {
          list[index].removeClass(effectName, {
            record: false
          });
          av.animListRecursion(time, time, list, index + 1, effectName);
        }, time);
      }, delay);
    }
  }, function() {});
  // animListRecursion END -----------------------------------------------

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

  var av = new JSAV(av_name);
  var left = 300,
    top = 20;

  // top blue
  var topblue = av.g.rect(left, top, 280, 35, 10).addClass("bluebox");

  // floor 2
  var top2 = top + 40;
  av.g.rect(left, top2, 250, 35, 10).addClass("purplebox")
  av.g.rect(left, top2 + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //floor 3
  var top3 = top2 + 25;
  av.g.rect(left, top3, 30, 60).addClass("purplebox").css({
    opacity: 0.7
  });
  av.g.rect(left + 73, top3, 30, 60).addClass("purplebox").css({
    opacity: 0.9
  });

  //create array contains 5 values.
  var top4 = top3 - 5;
  var arrayLeft = left + 160;
  var nodegap = 40;
  var array = av.ds.array(arrValues, {
    indexed: false,
    left: arrayLeft,
    top: top4,
    position: "absolute"
  });

  //Long purple under the green array
  var top5 = top3 + 50;
  av.g.rect(left, top5, 300, 30, 10).addClass("purplebox");
  av.g.rect(left, top5, 50, 15).addClass("purplebox"); // for no-roung on the corner

  //Left big purple box next to the 3 blue boxes
  var top6 = top4 + 65;
  av.g.rect(left, top6, 110, 170, 10).addClass("purplebox");

  // mid blues
  var top7 = top5 + 38;
  var mbleft = left + 130;
  var midblues = [];
  midblues[0] = av.g.rect(mbleft, top7, 180, 25, 10).addClass("bluebox");
  midblues[1] = av.g.rect(mbleft, top7 + 30, 180, 25, 10).addClass("bluebox");
  midblues[2] = av.g.rect(mbleft, top7 + 60, 180, 25, 10).addClass("bluebox");

  //right big putple box below blue boxes
  var top8 = top5 + 130;
  av.g.rect(left + 90, top8, 230, 50, 10).addClass("purplebox");

  // bot blue
  var top9 = top8 + 55;
  var botblue = av.g.rect(left, top9, 280, 35, 10).addClass("bluebox");

  // ------------------- Labels -------------------------
  av.label("for each item", {
    left: left + 10,
    top: top + 13
  }).addClass("loopLabels");
  av.label("price", {
    left: left + 22,
    top: top + 85
  }).addClass("loopLabels");
  av.label("do", {
    left: left + 35,
    top: top + 152
  }).addClass("loopLabels");

  // ------------------- Create Iteration Property box (ipb) and text -------------------------
  var ipb_left = left - 110;
  var ipb_top = 165;
  var iplabel = av.label("Iteration<br>Variable", {
    left: ipb_left,
    top: ipb_top
  }).css({
    'font-weight': '600'
  });
  // var iplabel = av.label("Iteration<br>Variable", {left: rect_left - 120, top: rect_top + 120}).css({'font-weight': '600'});
  iplabel.addClass("hiding");
  var iprec = av.g.rect(ipb_left - 20, ipb_top + 2, 100, 70).addClass("fourRoundBox");
  // var iprec = av.g.rect(rect_left - 140, rect_top + 125, 100, 70).addClass("fourRoundBox");
  iprec.addClass("hiding");
  var ipline = av.g.line(ipb_left + 80, ipb_top + 30, ipb_left + 125, ipb_top - 10, {
    'arrow-end': 'classic-wide-long',
    'stroke-width': 3
  });
  // var ipline = av.g.line(rect_left - 40, rect_top + 150, rect_left + 5, rect_top + 110, {'arrow-end': 'classic-wide-long', 'stroke-width': 3});
  ipline.addClass("hiding");

  // ------------------- slide show start -------------------------

  // Slide 1
  av.umsg(interpret("sc1"));
  av.displayInit();

  // Slide 2
  av.umsg(interpret("sc2"));
  iplabel.removeClass("hiding");
  iprec.removeClass("hiding");
  ipline.removeClass("hiding");
  var nextleft = arrayLeft - 130;
  av.step();

  // Slide 3
  av.umsg(interpret("sc3"));
  av.animation(topblue, 500, "blueboxh");
  av.step();

  // Slide 4
  av.umsg(interpret("sc4"));
  array.css({
    left: nextleft
  });
  nextleft -= nodegap;
  av.step();

  // Slide 5
  av.umsg(interpret("sc5"));
  av.animListRecursion(500, 400, midblues, 0, "blueboxh");
  av.step();

  // Slide 6
  av.umsg(interpret("sc6"));
  array.css({
    left: nextleft
  });
  av.animListRecursion(400, 300, midblues, 0, "blueboxh");
  nextleft -= nodegap;
  av.step();

  // Slide 7
  av.umsg(interpret("sc7"));
  array.css({
    left: nextleft
  });
  av.animListRecursion(400, 200, midblues, 0, "blueboxh");
  nextleft -= nodegap;
  av.step();

  // Slide 8
  av.umsg(interpret("sc8"));
  array.css({
    left: nextleft
  });
  av.animListRecursion(400, 200, midblues, 0, "blueboxh");
  nextleft -= nodegap;
  av.step();

  // Slide 9
  av.umsg(interpret("sc9"));
  array.css({
    left: nextleft
  });
  nextleft -= (nodegap + 50);
  av.animListRecursion(400, 200, midblues, 0, "blueboxh");
  av.step();

  // Slide 10
  av.umsg(interpret("sc10"));
  array.css({
    left: nextleft
  });
  av.step();

  // Slide 15
  av.umsg(interpret("sc11"));
  av.animation(botblue, 150, "blueboxh");
  av.recorded();
});
