"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: 70});
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
  var topMargin = 25; 
  var minusOne = jsav.ds.array(["-1"],{top: topMargin + 80, left: leftMargin});
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
  var topLabel = jsav.label("top" , {left: leftMargin - 35, top : topMargin + 100});
  jsav.umsg("Alternatively, top could have been defined to be the index for the top element in the stack, rather than the first free position. If this had been done, the empty list would initialize top as -1.");
  jsav.recorded();
}(jQuery));