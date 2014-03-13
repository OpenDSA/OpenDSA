

(function ($) {
  "use strict";

  var jsav = new JSAV("varindexCON");
  
  jsav.umsg("So here is the variable length array of database records");
  
  //Lower rectangles
  var rect11 = jsav.g.rect(0, 72, 120, 20).css({"fill": "white"});
  var rect12 = jsav.g.rect(120, 72, 60, 20).css({"fill": "white"});
  var rect13 = jsav.g.rect(180, 72, 140, 20).css({"fill": "white"});
  var rect14 = jsav.g.rect(320, 72, 30, 20).css({"fill": "white"});
  var rect15 = jsav.g.rect(350, 72, 170, 20).css({"fill": "white"});
  
  
  var inFragLabel = jsav.label("Database Records", {left :  0, top:  92});
  var fragLabel = jsav.label("73", {left : 2, top:  72});
  var fragLabel = jsav.label("52", {left : 122, top:  72});
  var fragLabel = jsav.label("98", {left : 182, top:  72});
  var fragLabel = jsav.label("37", {left : 322, top:  72});
  var fragLabel = jsav.label("42", {left : 352, top:  72});
  
  
  jsav.displayInit();
  
  var rect1 = jsav.g.rect(0, 13, 30, 20).css({"fill": "white"});
  var rect2 = jsav.g.rect(30, 13, 30, 20).css({"fill": "white"});
  var rect3 = jsav.g.rect(60, 13, 30, 20).css({"fill": "white"});
  var rect4 = jsav.g.rect(90, 13, 30, 20).css({"fill": "white"});
  var rect5 = jsav.g.rect(120, 13, 30, 20).css({"fill": "white"});
  var rect6 = jsav.g.rect(150, 13, 30, 20).css({"fill": "white"});
  var rect7 = jsav.g.rect(180, 13, 30, 20).css({"fill": "white"});
  var rect8 = jsav.g.rect(210, 13, 30, 20).css({"fill": "white"});
  var rect9 = jsav.g.rect(240, 13, 30, 20).css({"fill": "white"});
  var rect10 = jsav.g.rect(270, 13, 30, 20).css({"fill": "white"});
  
  var fragLabel = jsav.label("37", {left : 8, top:  12});
  var fragLabel = jsav.label("42", {left : 68, top:  12});
  var fragLabel = jsav.label("52", {left : 128, top:  12});
  var fragLabel = jsav.label("73", {left : 188, top:  12});
  var fragLabel = jsav.label("98", {left : 248, top:  12});
  
  jsav.umsg("This is the Linear Index array which is organized as a sequence of key/pointer pairs");
  jsav.step();
  
  var rect1 = jsav.g.rect(0, 13, 30, 20).css({"fill": "white"});
  var rect2 = jsav.g.rect(30, 13, 30, 20).css({"fill": "#FFFF00"});
  var rect3 = jsav.g.rect(60, 13, 30, 20).css({"fill": "white"});
  var rect4 = jsav.g.rect(90, 13, 30, 20).css({"fill": "#FFFF00"});
  var rect5 = jsav.g.rect(120, 13, 30, 20).css({"fill": "white"});
  var rect6 = jsav.g.rect(150, 13, 30, 20).css({"fill": "#FFFF00"});
  var rect7 = jsav.g.rect(180, 13, 30, 20).css({"fill": "white"});
  var rect8 = jsav.g.rect(210, 13, 30, 20).css({"fill": "#FFFF00"});
  var rect9 = jsav.g.rect(240, 13, 30, 20).css({"fill": "white"});
  var rect10 = jsav.g.rect(270, 13, 30, 20).css({"fill": "#FFFF00"});
  
  var xFragArrow = jsav.g.line(45,  20,  45, 45, {'stroke-width' : 1});
  var yFragArrow = jsav.g.line(45,  45,  325, 45, {'stroke-width' : 1});
  var zFragArrow = jsav.g.line(325,  45,  325, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x1FragArrow = jsav.g.line(105,  20,  105, 39, {'stroke-width' : 1});
  var y1FragArrow = jsav.g.line(105,  39,  355, 39, {'stroke-width' : 1});
  var z1FragArrow = jsav.g.line(355,  39,  355, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
   
  var x2FragArrow = jsav.g.line(165,  20,  165, 62, {'stroke-width' : 1});
  var y2FragArrow = jsav.g.line(165,  62,  127, 62, {'stroke-width' : 1});
  var z2FragArrow = jsav.g.line(127,  62,  127, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x3FragArrow = jsav.g.line(225,  20,  225, 57, {'stroke-width' : 1});
  var y3FragArrow = jsav.g.line(225,  57,  7, 57, {'stroke-width' : 1});
  var z3FragArrow = jsav.g.line(7,  57,  7, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  var x4FragArrow = jsav.g.line(285,  20,  285, 51, {'stroke-width' : 1});
  var y4FragArrow = jsav.g.line(285,  51,  184, 51, {'stroke-width' : 1});
  var z4FragArrow = jsav.g.line(184,  51,  184, 70, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  jsav.umsg("Each record in the index file is of fixed length and contains a pointer to the beginning of the corresponding record in the database file");
  //End of slideshow
  jsav.recorded();
  

}(jQuery));
  
(function ($) {

  var theArray = [1,2003,5894,10528];
  var empty = [];
  empty.length = 4;
  var av = new JSAV("linindexCON");
  var arr = av.ds.array(theArray, {indexed: true});
  
var setYellow = function (index) {
arr.css(index, {"background-color": "#FFFF00" });
};

  av.umsg("Here is the Second Level Index Array which stores the first key value in the disk block of the index file");
  av.displayInit();
  
  av.umsg("Let's search for the entry with key 3000");
  av.step();
  
  setYellow(1);
  av.umsg("The second disk block contains the greatest value less than or equal to the search key");
  av.step();
  
  
  var rect5 = av.g.rect(0, 75, 143, 20).css({"fill": "white"});
  var rect6 = av.g.rect(143, 75, 143, 20).css({"fill": "#FFFF00"});
  var rect7 = av.g.rect(286, 75, 143, 20).css({"fill": "white"});
  var rect8 = av.g.rect(429, 75, 143, 20).css({"fill": "white"});
  
  
  
  var fragLabel = av.label("1", {left : 2, top:  75});
  var fragLabel = av.label("2001", {left : 108, top:  75});
  var fragLabel = av.label("2003", {left : 145, top:  75});
  var fragLabel = av.label("5688", {left : 251, top:  75});
  var fragLabel = av.label("5894", {left : 288, top:  75});
  var fragLabel = av.label("9942", {left : 394, top:  75});
  var fragLabel = av.label("10528", {left : 431, top:  75});
  var fragLabel = av.label("10984", {left : 530, top:  75});
  var fragLabel = av.label("Linear Index: Disk Blocks", {left :  0, top:  95});
  
  av.umsg("The search is directed to the proper block in the index file, which is read into memory");
  av.step();
  
  av.umsg(" At this point, a binary search within this block will produce a pointer to the actual record in the database");
  av.recorded();

  
}(jQuery));
  