"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -20});
}

// Data menbers of Astack
(function ($) {
  var jsav = new JSAV("AStackVarCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AStack1 *** */",
                       endBefore: "/* *** ODSAendTag: AStack1 *** */"});
  pseudo.highlight(2);
  jsav.umsg("As with the array-based list implementation, listArray must be declared of fixed size when the stack is created. ");
  jsav.displayInit();
  pseudo.unhighlight(2);
  pseudo.highlight(7);
  jsav.umsg("In the stack constructor, size serves to indicate list size.");
  jsav.step();
  
  pseudo.unhighlight(7);
  pseudo.highlight(3);
  jsav.umsg("Method top acts somewhat like a current position value (because the \"current\" position is always at the top of the stack), as well as indicating the number of elements currently in the stack.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Explain why sets top at position n-1.
(function ($) {
  var jsav = new JSAV("AStackTopposCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 35; 
  var minusOne = jsav.ds.array(["-1"],{top: topMargin + 70, left: leftMargin + 30});
  minusOne.hide();
  var arr = jsav.ds.array([12,45,5,81,"", "", "", ""],{indexed:true, top: topMargin, left: leftMargin});
  var topPointer = jsav.pointer("top", arr, {targetIndex : 0});
  arr.highlight(0);
  jsav.umsg("One choice is to make the top be at position 0 in the array. In terms of list functions, all insert and remove operations would then be on the element in position 0.");
  jsav.displayInit();
  arr.highlight(1);
  arr.highlight(2);
  arr.highlight(3);
  jsav.umsg("This implementation is inefficient, because now every push or pop operation will require that all elements currently in the stack be shifted one position in the array, for a cost of &theta;(n) if there are n elements.");
  jsav.step();
  arr.unhighlight(0);
  arr.unhighlight(1);
  arr.unhighlight(2);
  topPointer.hide();
  var topPointer1 = jsav.pointer("top", arr, {targetIndex : 3});

  jsav.umsg("The other choice is have the top element be at position n-1 when there are n elements in the stack. In other words, as elements are pushed onto the stack, they are appended to the tail of the list.");
  jsav.step();
  arr.value(3,"");
  arr.unhighlight(3);
  topPointer1.hide();
  var topPointer2 = jsav.pointer("top", arr, {targetIndex : 2});
  jsav.umsg(" Method pop removes the tail element. In this case, the cost for each push or pop operation is only &theta;(1).");
  jsav.step();
  arr.value(0, "");
  arr.value(1, "");
  arr.value(2, "");
  topPointer2.hide();
  topPointer.show();
  arr.highlight(0);
  jsav.umsg(" For the implementation of AStack, top is defined to be the array index of the first free position in the stack. Thus, an empty stack has top set to 0, the first available free position in the array.");
  jsav.step();
  arr.unhighlight(0);
  topPointer.hide();
  minusOne.show();
  minusOne.highlight();
  var topLabel = jsav.label("top" , {left: leftMargin - 5, top : topMargin + 90});
  jsav.umsg("Alternatively, top could have been defined to be the index for the top element in the stack, rather than the first free position. If this had been done, the empty list would initialize top as -1.");
  jsav.recorded();
}(jQuery));

// Astack push method
(function($){
  var jsav = new JSAV("AStackPushCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AStackPush *** */",
                       endBefore: "/* *** ODSAendTag: AStackPush *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 25; 
  var arr = jsav.ds.array([12,45,5,81,"", "", "", ""],{indexed:true, top: topMargin, left: leftMargin});
  var arrCopy = jsav.ds.array([10]);
  arrCopy.hide();
  var topPointer = jsav.pointer("top", arr, {targetIndex : 4});
  topPointer.hide();
  jsav.umsg("Method <code>push</code> is easy.");
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("<code>top</code> is at the first free position.Since <code>top</code> is at position 4, less than the <code>maxSize</code> which is 7, we proceed.");
  topPointer.show();
  arr.highlight(4);
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.umsg("Method <code>push</code> simply places an element into the array position indicated by top.");
  jsav.effects.copyValue(arrCopy, 0, arr, 4);
  jsav.step();
  jsav.umsg("Increments top by one position.");
  topPointer.hide();
  var newTopPointer = jsav.pointer("top", arr, {targetIndex : 5});
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Astack pop method
(function($){
  var jsav = new JSAV("AStackPopCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AStackPop *** */",
                       endBefore: "/* *** ODSAendTag: AStackPop *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 20; 
  var arr = jsav.ds.array([12,45,5,81,"", "", "", ""],{indexed:true, top: topMargin, left: leftMargin});
  var arrCopy = jsav.ds.array([10]);
  var arrReturn = jsav.ds.array([""],{top : topMargin+70, left: leftMargin + 100});
  var labelReturn = jsav.label("return",{top : topMargin+90, left: leftMargin + 50});
  arrCopy.hide();
  arrReturn.hide();
  labelReturn.hide();
  var topPointer = jsav.pointer("top", arr, {targetIndex : 4});
  jsav.umsg("<code>top</code> is at the first free position, which is index 4 on the array.");
  arr.highlight(4);
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("Since <code>top</code> is not <code>null</code>, we proceed.");
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  jsav.umsg("<code>pop</code> first decrements <code>top<code> by 1 position.");
  arr.unhighlight(4);
  arr.highlight(3);
  topPointer.hide();
  var newTopPointer = jsav.pointer("top", arr, {targetIndex : 3});
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  arrReturn.show();
  labelReturn.show();
  jsav.effects.copyValue(arr, 3, arrReturn, 0);
  arrReturn.highlight();
  jsav.umsg("Then removes and returns the <code>top</code> element.");
  arr.value(3, "");
  jsav.step();
  jsav.recorded();
}(jQuery));

// LStack Diagram
(function($){
  var jsav = new JSAV("LStackDiagramCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 25; 
  var list = jsav.ds.list({"nodegap": 30});
  list.css({top : 40});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23)
      .addFirst(20);
  list.layout();
  jsav.pointer("top", list.get(0));
}(jQuery));

// LStack method push
(function($){
  var jsav = new JSAV("LStackPushCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LStackPush *** */",
                       endBefore: "/* *** ODSAendTag: LStackPush *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 40; 
  var list = jsav.ds.list({"nodegap": 30, left: leftMargin, top: topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(20);
  list.layout();
  list.get(0).edgeToNext().hide();
  list.get(0).hide();
  var arr = jsav.ds.array([10]);
  arr.hide();
  var topPointer = jsav.pointer("top", list.get(1));
  jsav.umsg("The listed stack before <code>push</code>");
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("Create a new node."); 
  var newNode = list.newNode("");
  newNode.css({top : topMargin + 20});
  newNode.highlight();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  jsav.umsg("Set the value of the new node.");
  jsav.effects.copyValue(arr, 0, newNode);
  jsav.step();
  jsav.umsg("Modifies the <code>next</code> field of the newly created link node to point to the top of the stack");
  newNode.next(list.get(1));
  list.get(0).next(newNode);
  list.layout({updateTop : false});
  jsav.step();
  jsav.umsg("Then sets top to point to the new link node.");
  topPointer.target(list.get(1));
  list.layout();
  jsav.step();
  list.get(1).unhighlight();
  jsav.umsg("Increase stack size by 1.");
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  jsav.recorded();
}(jQuery));

// LStack method pop
(function($){
  var jsav = new JSAV("LStackPopCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/LStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: LStackPop *** */",
                       endBefore: "/* *** ODSAendTag: LStackPop *** */"});
  // Relative offsets
  var leftMargin = 10;
  var topMargin = 35; 
  var list = jsav.ds.list({"nodegap": 30, left : leftMargin, top : topMargin});
  list.addFirst(15)
      .addFirst(12)
      .addFirst(8)
      .addFirst(23)
      .addFirst(20);
  list.layout();
  var arr = jsav.ds.array([10]);
  arr.hide();
  var arrIt = jsav.ds.array([""], 
	  {left : leftMargin + 110, top: topMargin + 50});
  var labelIt = jsav.label("it", {left : leftMargin + 90, top: topMargin + 70});
  list.get(0).edgeToNext().hide();
  list.get(0).hide();
  jsav.umsg("Method <code>pop</code> is also quite simple.");
  jsav.displayInit();
  list.get(1).highlight();
  jsav.umsg("<code>pop</code> points to the first node. Since <code>pop</code> is not equal to <code>null</code>, we proceed.");
  var topPointer = setPointer("top", list.get(1));
  list.layout();
  pseudo.unhighlight(0);
  pseudo.highlight(1);
  jsav.step();
  jsav.effects.copyValue(list.get(1), arrIt, 0);
  list.get(1).unhighlight();
  arrIt.highlight(0);
  jsav.umsg(" Variable \"it\" stores the top nodes' value as it is removed from the stack."); 
  pseudo.unhighlight(1);
  pseudo.highlight(2);
  jsav.step();
  topPointer.target(list.get(2));
  arrIt.unhighlight();
  list.get(2).highlight();
  jsav.umsg("The stack is updated by setting \"top\" to point to the next link in the stack.");
  pseudo.unhighlight(2);
  pseudo.highlight(3);
  jsav.step();
  jsav.umsg("Decrease the stack size by 1");
  pseudo.unhighlight(3);
  pseudo.highlight(4);
  jsav.step();
  list.get(2).unhighlight();
  arrIt.highlight();
  jsav.umsg("The element value is returned.");
  pseudo.unhighlight(4);
  pseudo.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));


// Diagram showing Two stacks implemented within in a single array.
(function($){
  var jsav = new JSAV("LStackTwostacksCON");
  // Relative offsets
  var leftMargin = 180;
  var topMargin = 50; 
  var rect = jsav.g.rect(leftMargin, topMargin, 500, 31);
  var line1 = jsav.g.line(leftMargin + 31, topMargin, leftMargin + 31, topMargin + 31);
  var line2 = jsav.g.line(leftMargin + 31*2, topMargin, leftMargin + 31*2, topMargin + 31);
  var line2 = jsav.g.line(leftMargin + 376, topMargin, leftMargin + 376, topMargin + 31);
  for(var i =0; i < 4; i++){
    jsav.g.line(leftMargin + 376 + 31*i, topMargin, leftMargin + 376 + 31*i, topMargin + 31);
  }
  var top1Label = jsav.label("top1",{left : leftMargin + 20, top: topMargin - 40});
  var top1Arrow = jsav.g.line(leftMargin + 30, topMargin - 20, leftMargin + 45, topMargin-2,{'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var top2Label = jsav.label("top2",{left : leftMargin + 376 + 20, top: topMargin - 40});
  var top2Arrow = jsav.g.line(leftMargin + 376 + 30, topMargin - 20, leftMargin + 376 + 15, topMargin-2,{'arrow-end': 'classic-wide-long', 'stroke-width' : 2});
  var arrow1 = jsav.g.line(leftMargin + 82, topMargin + 16, leftMargin + 82 + 35, topMargin + 16, {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'})
  var arrow2 = jsav.g.line(leftMargin + 356, topMargin + 16, leftMargin + 356 - 35, topMargin + 16, {'stroke-width' : 2, 'arrow-end' : 'block-wide-long'})
  jsav.displayInit();
  jsav.recorded();
}(jQuery));
