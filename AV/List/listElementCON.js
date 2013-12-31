"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -20});
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
// List data storage
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

  arr.show(); 
  arr.css({top : 20});
  arr.value(0, " ");
  arr.value(1, " ");
  arr.value(2, " ");
  arr.value(3, " ");

  bigData2.show();
  bigData3.show();
  bigData.css({left : 10});
  bigData1.css({left : 210});
  bigData2.css({left : 410});
  bigData3.css({left : 610});
  var arrP5 = connect(arr, bigData, {index : 0});
  var arrP6 = connect(arr, bigData1, {index : 1});
  var arrP7 = connect(arr, bigData2, {index : 2});
  var arrP8 = connect(arr, bigData3, {index : 3});
  jsav.umsg("The disadvantage of storing a pointer to each element is that the pointer requires space of its own. If elements are never duplicated, then this additional space adds unnecessary overhead. Java most naturally stores references to objects, meaning that only a single copy of an object such as a payroll record will be maintained, even if it is on multiple lists.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Homogeneous vs. non-homgeneous lists.
(function ($) {

  var jsav = new JSAV("listElementTypeCON");
  // Relative offsets
  var leftMargin = 200;
  var topMargin = 25;
  // JSAV list
  var list1 = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  list1.addFirst("null")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("null");
  list1.layout();
  list1.hide();
  
  var list2 = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin + 100});
  list2.addFirst("null")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("null");
  list2.layout();
  list2.hide();
  var curr = setPointer("curr", list1.get(0));
  var head = setPointer("head", list1.get(2));
  var tail = setPointer("tail", list1.get(5));


  jsav.umsg("A second issue faced by implementors of a list class (or any other data structure that stores a collection of user-defined data elements) is whether the elements stored are all required to be of the same type. This is known as homogeneity in a data structure.");
  jsav.displayInit();
  list1.show();
  var bigData = jsav.ds.array(["ID : 546457", "Name : Jake", "Phone : 5405642511", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 10});
  var bigData1 = jsav.ds.array(["ID : 546213", "Name : Mike", "Phone : 5405642513", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 210});
  var bigData2 = jsav.ds.array(["ID : 546805", "Name : John", "Phone : 5405642552", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 410});
  var bigData3 = jsav.ds.array(["ID : 546991", "Name : Lucy", "Phone : 5405642568", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 610});
  var listP1 = connect(list1.get(1), bigData);
  var listP2 = connect(list1.get(2), bigData1);
  var listP3 = connect(list1.get(3), bigData2);
  var listP4 = connect(list1.get(4), bigData3);
  jsav.umsg("In some applications, the user would like to define the class of the data element that is stored on a given list, and then never permit objects of a different class to be stored on that same list.");
  jsav.step();

  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  list1.get(2).value(5);
  list1.get(4).value("true");
  bigData.css({left: 170});
  bigData1.css({left:400});
  bigData2.hide();
  bigData3.hide();
  connect(list1.get(1), bigData);
  connect(list1.get(3), bigData1);
  
  jsav.umsg("In other applications, the user would like to permit the objects stored on a single list to be of differing types.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Garbage collection of lists
(function ($) {
  var jsav = new JSAV("listElementDeleteCON");
  // Relative offsets
  var leftMargin = 200;
  var topMargin = 25;
  // JSAV list
  var list1 = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin});
  list1.addFirst("null")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("null");
  list1.layout();
  list1.hide();
  
  var list2 = jsav.ds.list({"nodegap": 30, "center": false, "left": leftMargin, "top":topMargin + 100});
  list2.addFirst("null")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("")
   .addFirst("null");
  list2.layout();
  list2.hide();
  var curr = setPointer("curr", list1.get(0));
  var head = setPointer("head", list1.get(2));
  var tail = setPointer("tail", list1.get(5));


  jsav.umsg("The third issue that users of a list implementation must face is primarily of concern when programming in languages that do not support automatic garbage collection. ");
  jsav.displayInit();
  list1.show();
  var bigData = jsav.ds.array(["ID : 546457", "Name : Jake", "Phone : 5405642511", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 10});
  var bigData1 = jsav.ds.array(["ID : 546213", "Name : Mike", "Phone : 5405642513", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 210});
  var bigData2 = jsav.ds.array(["ID : 546805", "Name : John", "Phone : 5405642552", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 410});
  var bigData3 = jsav.ds.array(["ID : 546991", "Name : Lucy", "Phone : 5405642568", "Email : example@vt.edu", "Office : 212"]
	  , {layout:"vertical", top: 100, left: 610});
  var listP1 = connect(list1.get(1), bigData);
  var listP2 = connect(list1.get(2), bigData1);
  var listP3 = connect(list1.get(3), bigData2);
  var listP4 = connect(list1.get(4), bigData3);
  jsav.umsg("That is how to deal with the memory of the objects stored on the list when the list is deleted or the clear method is called. In C++ for example, list destructor and the clear method are problematic in that there is a potential that they will be misused. ");
  jsav.step();

  listP1.hide();
  listP2.hide();
  listP3.hide();
  listP4.hide();
  list1.hide();
  bigData.highlight();
  bigData1.highlight();
  bigData2.highlight();
  bigData3.highlight();
  
  jsav.umsg("Deleting listArray in the array-based implementation, or deleting a link node in the linked list implementation, might remove the only reference to an object, leaving its memory space inaccessible. ");
  jsav.step();

  bigData.css({top:50});
  bigData1.css({top:50});
  bigData2.css({top:50});
  bigData3.css({top:50});
  jsav.umsg("Unfortunately, there is no way for the list implementation to know whether a given object is pointed to in another part of the program or not. Thus, the user of the list must be responsible for deleting these objects when that is appropriate.");
  //jsav.step();
  jsav.recorded();
}(jQuery));