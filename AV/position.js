"use strict";

// first slideshow
(function ($) {
  var jsav = new JSAV("avcontainer1");
  // Relative offsets
  var leftMargin = 160;
  var topMargin = 45;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(15)
   .addFirst(12)
   .addFirst(23)
   .addFirst(20)
   .addFirst("null");
  l.layout();
  jsav.pointer("head", l.get(0));
  jsav.pointer("curr", l.get(2));
  jsav.pointer("tail", l.get(5));
}(jQuery));

// second slideshow
(function ($) {
  var jsav = new JSAV("avcontainer2");
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;
  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  itBox.highlight();
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();
  jsav.pointer("head", l.get(0));
  var curr = jsav.pointer("curr", l.get(2));
  jsav.pointer("tail", l.get(5));
  var label = jsav.label("test"); 
  label.element.position({my: "right bottom", at: "left top", of: l.get(3).element});
  jsav.umsg("The linked list before insertion. 15 is the value to be inserted.");
  jsav.displayInit();

  // Step 2
  jsav.recorded();
}(jQuery));

// third slideshow
(function ($) {
  var jsav = new JSAV("avcontainer3");
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;
  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  itBox.highlight();
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();

  //////////////////////////////////////////////////////
  setTimeout(function(){
	jsav.pointer("head", l.get(0));
    var curr = jsav.pointer("curr", l.get(2));
    var tail = jsav.pointer("tail", l.get(5));
    var label = jsav.label("testtest"); 
    var mylabel = (function(){ return label.element})();
    mylabel.position({my: "right bottom", at: "left top", of: l.get(3).element});
  }, 20);
  //////////////////////////////////////////////////////
}(jQuery));

// fouth slideshow
(function ($) {
  var jsav = new JSAV("avcontainer4");
  // Relative offsets
  var leftMargin = 150;
  var topMargin = 25;
  // Box "it"
  var itLabel = jsav.label("it",
	  {left: 20, top: 0, "font-size":"20px"});
  var itBox = jsav.ds.array(["15"], 
            {indexed: false, layout: "array", top: -20, left: 40});
  itBox.highlight();
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(10)
   .addFirst(35)
   .addFirst(8)
   .addFirst(23)
   .addFirst("null");
  l.layout();


  //////////////////////////////////////////////////////
  setTimeout(function(){
	jsav.pointer("head", l.get(0));
    var curr = jsav.pointer("curr", l.get(2));
    var tail = jsav.pointer("tail", l.get(5));
    var label = jsav.label("test"); 
    label.element.position({my: "right bottom", at: "left top", of: l.get(3).element});
  }, 200);
  //////////////////////////////////////////////////////
}(jQuery));

// fifth slideshow
(function ($) {
  var jsav = new JSAV("avcontainer5");
  // Relative offsets
  var leftMargin = 160;
  var topMargin = 45;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst(15)
   .addFirst(12)
   .addFirst(23)
   .addFirst(20)
   .addFirst("null");
  l.layout();
  l.get(0).jsav.pointer("head", l.get(0));
  jsav.displayInit();
  var curr = jsav.pointer("curr", l.get(2));
  jsav.step();
  curr.target(l.get(4));
  jsav.pointer("tail", l.get(5));
  jsav.recorded();
}(jQuery));