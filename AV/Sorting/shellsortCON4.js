$(document).ready(function () {
  "use strict";
  var theArray2 = [13, 30, 12, 54, 55, 11, 78, 14, 20, 79, 44, 98];
  var av = new JSAV("shellsortCON4");
  var arr = av.ds.array(theArray2, {indexed: true});
  arr.addClass(true, "deemph");
  arr.highlight([0, 4, 8]).removeClass([0, 4, 8], "deemph");
  //  arr.css(function (index)
  //          { return index % 4 !== 0; }, {"color": LIGHT}).highlight([0, 4, 8]);
  av.displayInit();
  arr.unhighlight([0, 4, 8]).addClass([0, 4, 8], "deemph");
  arr.highlight([1, 5, 9]).removeClass([1, 5, 9], "deemph");
  av.step();
  arr.unhighlight([1, 5, 9]).addClass([1, 5, 9], "deemph");
  arr.highlight([2, 6, 10]).removeClass([2, 6, 10], "deemph");
  av.step();
  arr.unhighlight([2, 6, 10]).addClass([2, 6, 10], "deemph");
  arr.highlight([3, 7, 11]).removeClass([3, 7, 11], "deemph");
  av.recorded();
});
