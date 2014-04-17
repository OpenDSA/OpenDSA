

(function ($) {
  "use strict";

  var jsav = new JSAV("varindexCON");
  
var setYellow = function (index) {
arr.css(index, {"background-color": "#FFFF00" });
};
  
  jsav.umsg("So here is the variable length array of database records");
  
  //Lower rectangles
  var rect11 = jsav.g.rect(0, 72, 120, 20).css({"fill": "white"});
  var rect12 = jsav.g.rect(120, 72, 60, 20).css({"fill": "white"});
  var rect13 = jsav.g.rect(180, 72, 140, 20).css({"fill": "white"});
  var rect14 = jsav.g.rect(320, 72, 30, 20).css({"fill": "white"});
  var rect15 = jsav.g.rect(350, 72, 170, 20).css({"fill": "white"});
  
  
  var fragLabel1 = jsav.label("73", {left : 2, top:  72});
  var fragLabel2 = jsav.label("52", {left : 122, top:  72});
  var fragLabel3 = jsav.label("98", {left : 182, top:  72});
  var fragLabel4 = jsav.label("37", {left : 322, top:  72});
  var fragLabel5 = jsav.label("42", {left : 352, top:  72});
  
  
  jsav.displayInit();
  
  var theArray = [];
  theArray.length = 10;
  var arr = jsav.ds.array(theArray);
  //var fragLabel = jsav.label("37", {left : 8, top:  12});
  //var fragLabel = jsav.label("42", {left : 68, top:  12});
  //var fragLabel = jsav.label("52", {left : 128, top:  12});
  //var fragLabel = jsav.label("73", {left : 188, top:  12});
  //var fragLabel = jsav.label("98", {left : 248, top:  12});
  
  jsav.umsg("This is the Linear Index array");
  jsav.step();
  
  //var fragLabel = jsav.label("73", {left : 8, top:  12});
  jsav.effects.copyValue(fragLabel1, arr, 0);
  jsav.umsg("Every block in the variable length array has a corresponding key in the Linear Index Array");
  jsav.step();
  
  //var fragLabel = jsav.label("52", {left : 68, top:  12});
  jsav.effects.copyValue(fragLabel2, arr, 2);
  jsav.step();
  
  //var fragLabel = jsav.label("98", {left : 128, top:  12});
  jsav.effects.copyValue(fragLabel3, arr, 4);
  jsav.step();
  
  //var fragLabel = jsav.label("37", {left : 188, top:  12});
  jsav.effects.copyValue(fragLabel4, arr, 6);
  jsav.step();
  
  //var fragLabel = jsav.label("42", {left : 248, top:  12});
  jsav.effects.copyValue(fragLabel5, arr, 8);
  jsav.step();
  arr.swap(0,6);
  arr.swap(4,8);
  arr.swap(2,4);
  jsav.umsg("Here is the Linear Index Array with all keys in sorted order");
  jsav.step();
  
  var xFragArrow = jsav.g.line(160,  20,  160, 45, {'stroke-width' : 1});
  var yFragArrow = jsav.g.line(160,  45,  325, 45, {'stroke-width' : 1});
  var zFragArrow = jsav.g.line(325,  45,  325, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  setYellow(1);
  jsav.umsg("Every key has a pointer to the beginning of the corresponding record in the database file");
  jsav.step();
  
  var x1FragArrow = jsav.g.line(226,  20,  226, 39, {'stroke-width' : 1});
  var y1FragArrow = jsav.g.line(226,  39,  355, 39, {'stroke-width' : 1});
  var z1FragArrow = jsav.g.line(355,  39,  355, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(3);
  jsav.step();
  
  var x2FragArrow = jsav.g.line(289,  20,  289, 62, {'stroke-width' : 1});
  var y2FragArrow = jsav.g.line(289,  62,  127, 62, {'stroke-width' : 1});
  var z2FragArrow = jsav.g.line(127,  62,  127, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(5);
  jsav.step();
  
  var x3FragArrow = jsav.g.line(351,  20, 351, 57, {'stroke-width' : 1});
  var y3FragArrow = jsav.g.line(351,  57,  7, 57, {'stroke-width' : 1});
  var z3FragArrow = jsav.g.line(7,  57,  7, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setYellow(7);
  jsav.step();
  var x4FragArrow = jsav.g.line(412,  20,  412, 51, {'stroke-width' : 1});
  var y4FragArrow = jsav.g.line(412,  51,  184, 51, {'stroke-width' : 1});
  var z4FragArrow = jsav.g.line(184,  51,  184, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});  
  setYellow(9);
  jsav.step();
  
  jsav.umsg("Each record in the index file is of fixed length and contains a pointer to the beginning of the corresponding record in the database file");
  //End of slideshow
  jsav.recorded();
  

}(jQuery));
  
(function ($) {

  var theArray = [1,2003,5894,10528];
  var empty = [];
  empty.length = 4;
  var av = new JSAV("linindexCON");
  var arr2 = av.ds.array(theArray);
  var LIGHT = "rgb(215, 215, 215)"; 
var setYellow = function (index) {
arr2.css(index, {"background-color": "#FFFF00" });
};
var setLight = function (index) {
arr3.css(index, {"background-color": "#ddf"});
};

  av.umsg("Here is the Second Level Index Array which stores the first key value in the disk block of the index file");
  av.displayInit();
  
  av.umsg("Let's search for the entry with key 3000");
  av.step();
  
  setYellow(1);
  av.umsg("The second disk block contains the greatest value less than or equal to the search key");
  av.step();
  
  av.umsg("Here is a representation of the disk blocks in the Linear Index file");
  var rect5 = av.g.rect(0, 75, 143, 20).css({"fill": "white"});
  var rect6 = av.g.rect(143, 75, 143, 20).css({"fill": "white"});
  var rect7 = av.g.rect(286, 75, 143, 20).css({"fill": "white"});
  var rect8 = av.g.rect(429, 75, 143, 20).css({"fill": "white"});
  
  
  
  var fragLabel1 = av.label("1", {left : 2, top:  75});
  var fragLabel2 = av.label("2001", {left : 108, top:  75});
  var fragLabel3 = av.label("2003", {left : 145, top:  75});
  var fragLabel4 = av.label("5688", {left : 251, top:  75});
  var fragLabel5 = av.label("5894", {left : 288, top:  75});
  var fragLabel6 = av.label("9942", {left : 394, top:  75});
  var fragLabel7 = av.label("10528", {left : 431, top:  75});
  var fragLabel8 = av.label("10984", {left : 530, top:  75});
  var fragLabel9 = av.label("Linear Index: Disk Blocks", {left :  0, top:  95});
  av.step();
  
  av.umsg("The search is directed to the proper block in the index file, which is read into memory");
  var rect6 = av.g.rect(143, 75, 143, 20).css({"fill": "#FFFF00"});
  av.step();
  
  var theArray2 = [2003,2260, 2592, 2820, 3000, 3920, 4160, 4880, 5550, 5688];
  var arr3 = av.ds.array(theArray2, {bottom:30, center: true, right: 0, left: 0, indexed: true});
  rect5.hide();
  rect7.hide();
  rect8.hide();
  fragLabel1.hide();
  fragLabel2.hide();
  fragLabel5.hide();
  fragLabel6.hide();
  fragLabel7.hide();
  fragLabel8.hide();
  fragLabel9.hide();
  
  var x4FragArrow = av.g.line(147,  98,  30, 155, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  var z5FragArrow = av.g.line(280,  98, 430, 155, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  setLight(0);
  
  av.umsg("Here is the array expansion of the selected block within the index file");
  av.step();
  setLight(1);
  av.umsg(" At this point, a binary search within this block will produce a pointer to the actual record in the database");
  av.recorded();

  
}(jQuery));
  