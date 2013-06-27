"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: 70});
}


function connect(objFrom, objTo, options){
  var opts = $.extend({}, options);
  var left, top, nodeWidth, nodeHeight, fx, fy, tx, ty;

  if(typeof(opts.index) !== "undefined"){
    left = objFrom.element.position().left;
    top = objFrom.element.position().top;
    fx = left + opts.index * 30 + 16;
    fy = top + 30;
    tx = objTo.element.position().left + objTo.element.outerWidth() / 2 - (opts.index + 1)%2 * 20;
    ty = objTo.element.position().top + 10;
  }else{
    left = objFrom.element.position().left + objFrom.container.position().left;
    top = objFrom.element.position().top + objFrom.container.position().top;
    nodeWidth = objFrom.element.outerWidth();
    nodeHeight = objFrom.element.outerHeight();
    fx = left + (nodeWidth - 10)/2;
    fy = top + nodeHeight / 2;
    tx = objTo.element.position().left + 100 *fx / 360 ;
    ty = objTo.element.position().top + 10;
  }
  return objFrom.jsav.g.line(fx, fy, tx, ty,
      {"arrow-end": "classic-wide",
                                "stroke-width": 2});
}
// Diagram showing the doubly linked list
(function ($) {

  var jsav = new JSAV("listElementDataCON");
  // Relative offsets
  var leftMargin = 200;
  var topMargin = 130;
  // JSAV list
  var l = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  l.addFirst("null")
   .addFirst("9")
   .addFirst("12")
   .addFirst("35")
   .addFirst("21")
   .addFirst("null");
  l.layout();
  var arr = jsav.ds.array([21, 35, 12, 9]
	  , {top: 10, left: 360});

  // JSAV dlist
  var dl = jsav.ds.dlist({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin + 100});
  dl.addFirst("null")
   .addFirst("9")
   .addFirst("12")
   .addFirst("35")
   .addFirst("21")
   .addFirst("null");
  dl.layout();
  var bigData = jsav.ds.array(["ID : 546457", "Name : Jake", "Phone : 5405642511", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 170});
  var bigData1 = jsav.ds.array(["ID : 546213", "Name : Mike", "Phone : 5405642513", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 470});
  var bigData2 = jsav.ds.array(["ID : 546805", "Name : John", "Phone : 5405642552", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 470});
  var bigData3 = jsav.ds.array(["ID : 546991", "Name : Lucy", "Phone : 5405642568", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 470});
  bigData.hide();
  bigData1.hide();
  bigData2.hide();
  bigData3.hide();
  var head = setPointer("head", l.get(0));
  var curr = setPointer("curr", l.get(2));
  var tail = setPointer("tail", l.get(5));

  var dhead = setPointer("head", dl.get(0));
  var dcurr = setPointer("curr", dl.get(2));
  var dtail = setPointer("tail", dl.get(5));
  jsav.umsg("List users must decide whether they wish to store a copy of any given element on each list that contains it. For small elements such as an integer, this makes sense.");
  jsav.displayInit();

  // Step 2
  arr.hide();
  dl.hide();
  l.show();
  l.get(1).value("");
  l.get(2).value("");
  l.get(3).value("");
  l.get(4).value("");
  l.css({top : 50});
  bigData.show();
  bigData1.show();
  var listP1 = connect(l.get(1), bigData);
  var listP2 = connect(l.get(2), bigData);
  var listP3 = connect(l.get(3), bigData1);
  var listP4 = connect(l.get(4), bigData1);
  listP1.show();
  jsav.umsg("If the elements are payroll records, it might be desirable for the list node to store a pointer to the record rather than store a copy of the record itself. This change would allow multiple list nodes (or other data structures) to point to the same record, rather than make repeated copies of the record. Not only might this save space, but it also means that a modification to an element's value is automatically reflected at all locations where it is referenced.");
  jsav.step();
  l.hide();
  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  dl.show();  
  dl.get(1).value("");
  dl.get(2).value("");
  dl.get(3).value("");
  dl.get(4).value("");
  dl.css({top : 50});
  var dlistP1 = connect(dl.get(1), bigData);
  var dlistP2 = connect(dl.get(2), bigData);
  var dlistP3 = connect(dl.get(3), bigData1);
  var dlistP4 = connect(dl.get(4), bigData1);
  jsav.step();

  dl.hide();
  dlistP1.hide();
  dlistP2.hide();
  dlistP3.hide();
  dlistP4.hide();
  arr.show(); 
  arr.css({top : 20});
  arr.value(0, " ");
  arr.value(1, " ");
  arr.value(2, " ");
  arr.value(3, " ");
  var arrP1 = connect(arr, bigData, {index : 0});
  var arrP2 = connect(arr, bigData, {index : 1});
  var arrP3 = connect(arr, bigData1, {index : 2});
  var arrP4 = connect(arr, bigData1, {index : 3});
  jsav.step();
  bigData2.show();
  bigData3.show();
  bigData.css({left : 10});
  bigData1.css({left : 210});
  bigData2.css({left : 410});
  bigData3.css({left : 610});
  arrP1.hide();
  arrP2.hide();
  arrP3.hide();
  arrP4.hide();
  var arrP5 = connect(arr, bigData, {index : 0});
  var arrP6 = connect(arr, bigData1, {index : 1});
  var arrP7 = connect(arr, bigData2, {index : 2});
  var arrP8 = connect(arr, bigData3, {index : 3});
  jsav.umsg("The disadvantage of storing a pointer to each element is that the pointer requires space of its own. If elements are never duplicated, then this additional space adds unnecessary overhead. Java most naturally stores references to objects, meaning that only a single copy of an object such as a payroll record will be maintained, even if it is on multiple lists.");
  jsav.recorded();
}(jQuery));
