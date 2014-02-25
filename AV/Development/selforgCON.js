"use strict";
// Various functions and variables that will be used by all of the
// following sections of the tutorial.

// Helper function for seting pointer
function setPointer(name, node, opt){
  var pointerRight = {anchor: "right top",
    myAnchor: "left bottom",
    left: -10,
    top: -20};
  var pointerLeft = {anchor: "left top",
    myAnchor: "right bottom",
    left: 15,
    top: -20};
  if(opt === "right"){
    return node.jsav.pointer(name, node, pointerRight);
  }else{
    return node.jsav.pointer(name, node, pointerLeft);
  }
}

// Helper funciton for deleting a pointer
function delPointer(pointer){
  if(pointer){
    pointer.element.remove();
    pointer.arrow.remove();
  }
}
// JSAV extension
(function ($) {
  JSAV._types.ds.ListNode.prototype.odsa_addTail = function(options){	  
	var fx = $('#' + this.id()).position().left + this.container.position().left + 33;
    var fy = $('#' + this.id()).position().top + this.container.position().top + 32;
    var options = options || {};
	if(options.left){
	  fx += options.left;
	}
	if(options.top){
	  fy += options.top;
	}
	if(options.visible === "undefined"){
      options.visible = 100;
	}
	return this.jsav.g.line(fx, fy, fx + 10, fy - 31,
      {"opacity": options.visible,"stroke-width": 1});
  }

  JSAV._types.ds.ListNode.prototype.odsa_addVLine = function(options){	  
	var fx = $('#' + this.id()).position().left + this.container.position().left;
    var fy = $('#' + this.id()).position().top + this.container.position().top;
    var options = options || {};
	if(options.left){
	  fx += options.left;
	}
	if(options.top){
	  fy += options.top;
	}	
	if(options.visible === "undefined"){
      options.visible = 100;
	}
	return this.jsav.g.line(fx - 15, fy - 5 , fx - 15, fy + 35,
      {"opacity": options.visible, "stroke-width": 1});
  }
}(jQuery));

// SelfOrg frequence heuristic
///////////////////////////////////////
(function ($) {
  var jsav = new JSAV("SelforgCON1");

  // Offsets
  var leftMargin = 217;
  var topMargin =  40;

  // Create a list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("H")
   .addFirst("G")
   .addFirst("F")
   .addFirst("E")
   .addFirst("D")
   .addFirst("C")
   .addFirst("B")
   .addFirst("A");
  l.layout();

  // Create freelist
  var freelist = jsav.ds.list({"nodegap": 30, "top": topMargin + 100, left: leftMargin});

  // Create 'null' label
  var nullLabel = jsav.label("Counter", {top: topMargin - 55, left: leftMargin - 110});
  nullLabel.css({color : "red"});
  // counters for the nodes
  var Apointer = setPointer("0", l.get(0));
  var Bpointer = setPointer("0", l.get(1));
  var Cpointer = setPointer("0", l.get(2));
  var Dpointer = setPointer("0", l.get(3));
  var Epointer = setPointer("0", l.get(4));  
  var Fpointer = setPointer("0", l.get(5));
  var Gpointer = setPointer("0", l.get(6));
  var Hpointer = setPointer("0", l.get(7));

  jsav.umsg("We will  illustrate using a Self Organizing list using frequency count by applying F D F G E G F A D F G E. pattern");
  jsav.displayInit();

  // step 1
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(5);
  l.add(0, "F");
  Fpointer = setPointer("1", l.get(0));
  l.layout();
  jsav.step();


  // step 2
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(4);
  l.add(0, "D");
  Dpointer = setPointer("1", l.get(0));
  l.layout();
  jsav.step();

  // step 3
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(1);
  l.add(0, "F");
  Fpointer = setPointer("2", l.get(0));
  l.layout();
  jsav.step();

  // step 4
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(6);
  l.add(1, "G");
  Gpointer = setPointer("1", l.get(1));
  l.layout();
  jsav.step();

 // step 5
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(6);
  l.add(1, "E");
  Epointer = setPointer("1", l.get(1));
  l.layout();
  jsav.step();

 // step 6
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(2);
  l.add(0, "G");
  Gpointer = setPointer("2", l.get(0));
  l.layout();
  jsav.step();

 // step 7
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(1);
  l.add(0, "F");
  Fpointer = setPointer("3", l.get(0));
  l.layout();
  jsav.step();


 // step 7
  jsav.umsg("We search for A");
  jsav.step();
  l.remove(4);
  l.add(2, "A");
  Apointer = setPointer("1", l.get(2));
  l.layout();
  jsav.step();

 // step 8
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(4);
  l.add(2, "D");
  Dpointer = setPointer("2", l.get(2));
  l.layout();
  jsav.step();

 // step 9
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(0);
  l.add(0, "F");
  Fpointer = setPointer("4", l.get(0));
  l.layout();
  jsav.step();

 // step 11
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(1);
  l.add(1, "G");
  Gpointer = setPointer("3", l.get(1));
  l.layout();
  jsav.step();

 // step 12
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(4);
  l.add(3, "E");
  Epointer = setPointer("2", l.get(3));
  l.layout();
  jsav.step();

  jsav.recorded();
}(jQuery));





////////////////////////////////////
///
//SelfOrg list move-to-front
///////////////////////////////////////
(function ($) {
  var jsav = new JSAV("SelforgCON2");

  // Offsets
  var leftMargin = 217;
  var topMargin =  40;

  // Create a list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("H")
   .addFirst("G")
   .addFirst("F")
   .addFirst("E")
   .addFirst("D")
   .addFirst("C")
   .addFirst("B")
   .addFirst("A");
  l.layout();

  // Create freelist
  var freelist = jsav.ds.list({"nodegap": 30, "top": topMargin + 100, left: leftMargin});

  jsav.umsg("We will  illustrate using a Self Organizing list using move-to-front by applying F D F G E G F A D F G E. pattern");
  jsav.displayInit();

  // step 1
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(5);
  l.add(0, "F");
  l.layout();
  jsav.step();

  // step 2
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(4);
  l.add(0, "D");
  l.layout();
  jsav.step();

  // step 3
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(1);
  l.add(0, "F");
  l.layout();
  jsav.step();

  // step 4
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(6);
  l.add(0, "G");
  l.layout();
  jsav.step();

  // step 5
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(6);
  l.add(0, "E");
  l.layout();
  jsav.step();

  // step 6
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(1);
  l.add(0, "G");
  l.layout();
  jsav.step();

  // step 7
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(2);
  l.add(0, "F");
  l.layout();
  jsav.step();


  // step 8
  jsav.umsg("We search for A");
  jsav.step();
  l.remove(4);
  l.add(0, "A");
  l.layout();
  jsav.step();

  // step 9
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(4);
  l.add(0, "D");
  l.layout();
  jsav.step();

  // step 10
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(2);
  l.add(0, "F");
  l.layout();
  jsav.step();

  // step 11
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(3);
  l.add(0, "G");
  l.layout();
  jsav.step();

  // step 12
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(4);
  l.add(0, "E");
  l.layout();
  jsav.step();

  jsav.recorded();
}(jQuery));




////////////////////////////////////
///
//SelfOrg list Transpose
///////////////////////////////////////
(function ($) {
  var jsav = new JSAV("SelforgCON3");

  // Offsets
  var leftMargin = 217;
  var topMargin =  40;

  // Create a list object under control of JSAV library
  var l = jsav.ds.list({"nodegap": 30, "top": topMargin, left: leftMargin});
  l.addFirst("H")
   .addFirst("G")
   .addFirst("F")
   .addFirst("E")
   .addFirst("D")
   .addFirst("C")
   .addFirst("B")
   .addFirst("A");
  l.layout();

  // Create freelist
  var freelist = jsav.ds.list({"nodegap": 30, "top": topMargin + 100, left: leftMargin});

  jsav.umsg("We will  illustrate using a Self Organizing list using Transpose by applying F D F G E G F A D F G E. pattern");
  jsav.displayInit();

  // step 1
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(5);
  l.add(4, "F");
  l.layout();
  jsav.step();

  // step 2
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(3);
  l.add(2, "D");
  l.layout();
  jsav.step();

  // step 3
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(4);
  l.add(3, "F");
  l.layout();
  jsav.step();

  // step 4
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(6);
  l.add(5, "G");
  l.layout();
  jsav.step();

  // step 5
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(6);
  l.add(5, "E");
  l.layout();
  jsav.step();

  // step 6
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(6);
  l.add(5, "G");
  l.layout();
  jsav.step();

  // step 7
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(3);
  l.add(2, "F");
  l.layout();
  jsav.step();

  // step 8
  jsav.umsg("We search for A");
  jsav.step();


  // step 9
  jsav.umsg("We search for D");
  jsav.step();
  l.remove(3);
  l.add(2, "D");
  l.layout();
  jsav.step();


  // step 10
  jsav.umsg("We search for F");
  jsav.step();
  l.remove(3);
  l.add(2, "F");
  l.layout();
  jsav.step();


  // step 11
  jsav.umsg("We search for G");
  jsav.step();
  l.remove(5);
  l.add(4, "G");
  l.layout();
  jsav.step();

  // step 12
  jsav.umsg("We search for E");
  jsav.step();
  l.remove(6);
  l.add(5, "E");
  l.layout();
  jsav.step();


  jsav.recorded();
}(jQuery));






