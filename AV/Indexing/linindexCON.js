/*global ODSA */
$(document).ready(function () {
  "use strict";
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
  var itemheight = 75;

  av.umsg("Here is the Second Level Index Array which stores the first key value in the disk block of the index file");
  av.displayInit();
  
  av.umsg("Let's search for the entry with key 3000");
  av.step();
  
  setYellow(1);
  av.umsg("The second disk block contains the greatest value less than or equal to the search key");
  av.step();
  
  av.umsg("Here is a representation of the disk blocks in the Linear Index file");
  var rect5 = av.g.rect(0, itemheight, 143, itemheight - 50).css({"fill": "white"});
  var rect6 = av.g.rect(143, itemheight, 143, itemheight - 50).css({"fill": "white"});
  var rect7 = av.g.rect(286, itemheight, 143, itemheight - 50).css({"fill": "white"});
  var rect8 = av.g.rect(429, itemheight, 143, itemheight - 50).css({"fill": "white"});
  
  var fragLabel1 = av.label("1", {left : 2, top: itemheight - 13});
  var fragLabel2 = av.label("2001", {left : 104, top: itemheight - 13});
  var fragLabel3 = av.label("2003", {left : 145, top: itemheight - 13});
  var fragLabel4 = av.label("5688", {left : 245, top: itemheight - 13});
  var fragLabel5 = av.label("5894", {left : 288, top: itemheight - 13});
  var fragLabel6 = av.label("9942", {left : 388, top: itemheight - 13});
  var fragLabel7 = av.label("10528", {left : 431, top: itemheight - 13});
  var fragLabel8 = av.label("10984", {left : 523, top: itemheight - 13});
  var fragLabel9 = av.label("Linear Index: Disk Blocks", {left :  0, top:  100});
  av.step();
  
  av.umsg("The search is directed to the proper block in the index file, which is read into memory");
  var rect6 = av.g.rect(143, 75, 143, 25).css({"fill": "#FFFF00"});
  av.step();
  
  var theArray2 = [2003,2260, 2592, 2820, 3000, 3920, 4160, 4880, 5550, 5688];
  var arr3 = av.ds.array(theArray2, {top: 140, center: true, right: 0, left: 0, indexed: true});

  fragLabel9.hide();
  var x4FragArrow = av.g.line(147,  100,  30, 155, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  var z5FragArrow = av.g.line(280,  100, 430, 155, {'arrow-end': 'classic-wide-long','stroke-width' : 1});
  
  
  av.umsg("Here is the array expansion of the selected block within the index file");
  av.step();
  av.umsg("Now we perform a binary search to look for the record in the array expansion");
  av.step();
  
  av.umsg("We now choose the median value, which is the value at index 5");
  setLight(5);
  av.step();

  x4FragArrow.hide();
  z5FragArrow.hide();
  av.umsg("Since the record 3000 is less than the median value we split the array and look in the lower half");
  arr3.css(5, {"background-color": "white"});
  av.step();

  av.umsg("The element at Index 2 is the new median value");
  arr3.css(2, {"background-color": "#ddf"});
  av.step();
  av.umsg("Since 3000 is greater than the median value we look at the two values at index 3 and 4");
  arr3.css(2, {"background-color": "white"});
  arr3.css(3, {"background-color": "#ddf"});
  arr3.css(4, {"background-color": "#ddf"});
  av.step();
  av.umsg("The record that we are looking for is at index 4");
  arr3.css(3, {"background-color": "white"});
  arr3.css(4, {"background-color": "#FFFF00"});
  av.step();
  av.umsg("A binary search produces a pointer to the actual record in the database");
  av.recorded();
});
