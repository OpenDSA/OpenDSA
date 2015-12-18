/*global ODSA */
$(document).ready(function () {
  "use strict";
  var jsav = new JSAV("varindexCON");
  var setYellow = function (index) {
    arr.css(index, {"background-color": "#FFFF00" });
  };
  var itemheight = 72;  

  //Lower rectangles
  var rect11 = jsav.g.rect(0, itemheight, 120, 20).css({"fill": "white"});
  var rect12 = jsav.g.rect(120, itemheight, 60, 20).css({"fill": "white"});
  var rect13 = jsav.g.rect(180, itemheight, 140, 20).css({"fill": "white"});
  var rect14 = jsav.g.rect(320, itemheight, 30, 20).css({"fill": "white"});
  var rect15 = jsav.g.rect(350, itemheight, 170, 20).css({"fill": "white"});
  
  var fragLabel1 = jsav.label("73", {left : 2, top: itemheight - 15});
  var fragLabel2 = jsav.label("52", {left : 122, top: itemheight - 15});
  var fragLabel3 = jsav.label("98", {left : 182, top: itemheight - 15});
  var fragLabel4 = jsav.label("37", {left : 322, top: itemheight - 15});
  var fragLabel5 = jsav.label("42", {left : 352, top: itemheight - 15});
  
  // Slide 1
  jsav.umsg("Here is an array of variable length database records");
  jsav.displayInit();
  
  // Slide 2
  var theArray = [];
  theArray.length = 10;
  var arr = jsav.ds.array(theArray);
  jsav.umsg("This is the Linear Index array");
  jsav.step();
  
  // Slide 3
  jsav.effects.copyValue(fragLabel1, arr, 0);
  jsav.umsg("Every block in the variable length array has a corresponding key in the Linear Index Array");
  jsav.step();
  
  // Slide 4
  jsav.effects.copyValue(fragLabel2, arr, 2);
  jsav.step();
  
  // Slide 5
  jsav.effects.copyValue(fragLabel3, arr, 4);
  jsav.step();
  
  // Slide 6
  jsav.effects.copyValue(fragLabel4, arr, 6);
  jsav.step();
  
  // Slide 7
  jsav.effects.copyValue(fragLabel5, arr, 8);
  jsav.step();

  // Slide 8
  arr.swap(0,6);
  arr.swap(4,8);
  arr.swap(2,4);
  jsav.umsg("Here is the Linear Index Array with all keys in sorted order");
  jsav.step();
  
  // Slide 9
  var xFragArrow = jsav.g.line(160,  20,  160, 45, {'stroke-width' : 1});
  var yFragArrow = jsav.g.line(160,  45,  325, 45, {'stroke-width' : 1});
  var zFragArrow = jsav.g.line(325,  45,  325, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(1);
  jsav.umsg("Every key has a pointer to the beginning of the corresponding record in the database file");
  jsav.step();
  
  // Slide 10
  var x1FragArrow = jsav.g.line(226,  20,  226, 39, {'stroke-width' : 1});
  var y1FragArrow = jsav.g.line(226,  39,  355, 39, {'stroke-width' : 1});
  var z1FragArrow = jsav.g.line(355,  39,  355, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(3);
  jsav.step();
  
  // Slide 11
  var x2FragArrow = jsav.g.line(289,  20,  289, 62, {'stroke-width' : 1});
  var y2FragArrow = jsav.g.line(289,  62,  127, 62, {'stroke-width' : 1});
  var z2FragArrow = jsav.g.line(127,  62,  127, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(5);
  jsav.step();
  
  // Slide 12
  var x3FragArrow = jsav.g.line(351,  20, 351, 57, {'stroke-width' : 1});
  var y3FragArrow = jsav.g.line(351,  57,  7, 57, {'stroke-width' : 1});
  var z3FragArrow = jsav.g.line(7,  57,  7, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(7);
  jsav.step();

  // Slide 13
  var x4FragArrow = jsav.g.line(412,  20,  412, 51, {'stroke-width' : 1});
  var y4FragArrow = jsav.g.line(412,  51,  184, 51, {'stroke-width' : 1});
  var z4FragArrow = jsav.g.line(184,  51,  184, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});  
  setYellow(9);
  jsav.step();
  
  // Slide 14
  jsav.umsg("Each record in the index file is of fixed length and contains a pointer to the beginning of the corresponding record in the database file");
  jsav.recorded();
});
