"use strict";

// Astack push method
(function ($) {
  var jsav = new JSAV("AStackPushCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AStackPush *** */",
                       endBefore: "/* *** ODSAendTag: AStackPush *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 25;
  var arr = jsav.ds.array([12, 45, 5, 81, "", "", "", ""],
                          {indexed: true, top: topMargin, left: leftMargin});
  var arrCopy = jsav.ds.array([10]);
  arrCopy.hide();
  var topPointer = jsav.pointer("top", arr, {targetIndex : 4});
  topPointer.hide();
  jsav.umsg("Method <code>push</code> is easy.");
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("<code>top</code> is at the first free position, which is at position 4. Since this is less than <code>maxSize</code> (which is 7), we can proceed.");
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
  jsav.umsg("Then Increment top by one position.");
  topPointer.hide();
  var newTopPointer = jsav.pointer("top", arr, {targetIndex : 5});
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.step();
  jsav.recorded();
}(jQuery));

// Astack pop method
(function ($) {
  var jsav = new JSAV("AStackPopCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AStack.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AStackPop *** */",
                       endBefore: "/* *** ODSAendTag: AStackPop *** */"});
  // Relative offsets
  var leftMargin = 20;
  var topMargin = 20;
  var arr = jsav.ds.array([12, 45, 5, 81, "", "", "", ""],
                          {indexed: true, top: topMargin, left: leftMargin});
  var arrCopy = jsav.ds.array([10]);
  var arrReturn = jsav.ds.array([""], {top : topMargin + 70, left: leftMargin + 100});
  var labelReturn = jsav.label("return", {top : topMargin + 90, left: leftMargin + 50});
  arrCopy.hide();
  arrReturn.hide();
  labelReturn.hide();
  var topPointer = jsav.pointer("top", arr, {targetIndex : 4});
  jsav.umsg("Now, for the implementation of <code>pop</code>. <code>top</code> is at the first free position, which is index 4 on the array.");
  arr.highlight(4);
  pseudo.highlight(0);
  jsav.displayInit();
  jsav.umsg("Since <code>top</code> is not 0 (which would indicate an empty stack), we proceed.");
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
