/*global JSAV, document */
// Written by Sushma Mandava and Milen John
// variable xPosition controls the horizonatl position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "employeeEmpRefCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter;
  var av = new JSAV(av_name);
  var xPosition = 150;
  var yPositionR1 = 15;
  var yPositionR2 = 115;
  var length1 = 100;
  var width = 30;
  var pointerArrow = av.g.line(xPosition + 280, yPositionR1 +6.5, xPosition + 320, yPositionR1 +6.5, 
    {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
    pointerArrow.hide();
  //Slide 1
  av.umsg(interpret("sc1"));
  av.step();
  av.displayInit();

  //Slide 2
  av.umsg(interpret("sc2"));
  var int = av.label('<tt>num</tt>', {top: -10, left: 185})
  var num = av.label('<tt>50</tt>', {top: -10, left: 255}); 
  var double = av.label('<tt>float</tt>', {top: -10, left: 430}) 
  var doubleNum = av.label('<tt>50.0</tt>', {top: -10, left: 510})
  var rect = av.g.rect(xPosition + 70, yPositionR1 - 14, length1, width);
  var rect1 = av.g.rect(xPosition + 330, yPositionR1 - 14, length1, width);
  int.show();
  num.show();
  double.show();
  doubleNum.show();
  av.step()
  
  //Slide 3
  av.umsg(interpret("sc3"));
  int.hide();
  num.hide();
  double.hide();
  doubleNum.hide();
  rect.hide();
  rect1.hide();
  //var rect = av.g.rect(xPosition + 170, yPositionR1 - 10, length1, width);
  //var num = av.label('<tt>ref</tt>', {top: -5, left: 280}); 
  var arr = av.ds.array([]);
  var list = av.ds.list({top:8, left:470});
  var pointer1 = av.pointer("ref", list, {top: 10, left: -100});
  pointer1.show();
  av.step();

  //Slide 4
  av.umsg(interpret("sc4"));
  int.hide();
  double.hide();
  doubleNum.hide();
  rect1.hide();
  var rect1 = av.g.rect(xPosition + 330, yPositionR1 - 14.7, length1+40, width+12);
  var num = av.label('<tt>John</tt>', {top: -13, left: 520}); 
  var num1 = av.label('<tt>1000</tt>', {top: 4, left: 520}); 
  

  av.recorded();
});
