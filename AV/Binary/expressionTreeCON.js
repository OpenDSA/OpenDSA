/*global JSAV, document */
$(document).ready(function () {
  "use strict";
  var av = new JSAV("expressionTreeCON", { animationMode: "none" });
  
  var arrRoot = av.ds.array([" ", "-", " "], { left: 420 });

  var top1 = 60;
  var arrMult1 = av.ds.array([" ", "*", " "], { left: 350, top: top1 });
  var arrC = av.ds.array(["c"], { left: 520, top: top1 });
  arrC.addClass([0], "internalnode");

  var top2 = top1 + 60;
  var arrMult2 = av.ds.array([" ", "*", " "], { left: 240, top: top2 });
  var arrPlus = av.ds.array([" ", "+", " "], { left: 460, top: top2 });

  var top3 = top2 + 60;
  var arr4 = av.ds.array(["4"], { left: 240, top: top3 });
  var arrX1 = av.ds.array(["x"], { left: 300, top: top3 });
  var arrMult3 = av.ds.array([" ", "*", " "], { left: 400, top: top3 });
  var arrA = av.ds.array(["a"], { left: 550, top: top3 });
  arr4.addClass([0], "internalnode");
  arrX1.addClass([0], "internalnode");
  arrA.addClass([0], "internalnode");

  var top4 = top3 + 60;
  var arr2 = av.ds.array(["2"], { left: 400, top: top4 });
  var arrX2 = av.ds.array(["x"], { left: 460, top: top4 });
  arr2.addClass([0], "internalnode");
  arrX2.addClass([0], "internalnode");

  // dynamic geometry helpers
  function cellCenter(array, idx) {
    var $li = array.element.find("li").eq(idx);
    var $canvas = $li.closest(".jsavcanvas");
    var lo = $li.offset(), co = $canvas.offset();
    return { x: lo.left - co.left + $li.outerWidth() / 2,
             y: lo.top  - co.top  + $li.outerHeight() / 2 };
  }
  function topCenter(array, idx) {
    var $li = array.element.find("li").eq(idx);
    var $canvas = $li.closest(".jsavcanvas");
    var lo = $li.offset(), co = $canvas.offset();
    return { x: lo.left - co.left + $li.outerWidth() / 2,
             y: lo.top  - co.top };
  }
  function bottomCenter(array, idx) {
    var p = cellCenter(array, idx);
    var $li = array.element.find("li").eq(idx);
    return { x: p.x, y: p.y + ($li.outerHeight() / 2) };
  }
  function arrow(parentArr, childArr, pIdx, cIdx) {
    pIdx = (pIdx !== undefined) ? pIdx : 1;  // default to middle element
    cIdx = (cIdx !== undefined) ? cIdx : (childArr.element.find("li").length === 1 ? 0 : 1);
    var s = cellCenter(parentArr, pIdx);  
    var t = topCenter(childArr, cIdx);
    av.g.line(s.x, s.y, t.x, t.y, { "stroke-width": 2, "arrow-end": "classic-wide-long" });
  }

  // compute edges
  arrow(arrRoot, arrMult1, 0);      // from root's left pointer
  arrow(arrRoot, arrC, 2);          // from root's right pointer
  arrow(arrMult1, arrMult2, 0);     // from mult1's left pointer
  arrow(arrMult1, arrPlus, 2);      // from mult1's right pointer
  arrow(arrMult2, arr4, 0);         // from mult2's left pointer
  arrow(arrMult2, arrX1, 2);        // from mult2's right pointer
  arrow(arrPlus, arrMult3, 0);      // from plus's left pointer
  arrow(arrPlus, arrA, 2);          // from plus's right pointer
  arrow(arrMult3, arr2, 0);         // from mult3's left pointer
  arrow(arrMult3, arrX2, 2);        // from mult3's right pointer

  av.displayInit();
  av.recorded();
});
