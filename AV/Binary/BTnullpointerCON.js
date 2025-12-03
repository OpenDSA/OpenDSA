/*global JSAV, document */
$(document).ready(function () {
  "use strict";
  var av = new JSAV("BTnullpointerCON", { animationMode: "none" });

  // Arrays
  var arrA = av.ds.array([" ", "A", " "], { left: 180 });

  var top1 = 50;
  var arrB = av.ds.array(["/", "B", " "], { left: 40, top: top1 });
  var arrC = av.ds.array([" ", "C", " "], { left: 320, top: top1 });
  arrB.css(0, { "background-color": "LightPink" });

  var top2 = top1 + 50;
  var arrD = av.ds.array(["/", "D", "/"], { left: 70, top: top2 });
  var arrE = av.ds.array([" ", "E", "/"], { left: 230, top: top2 });
  var arrF = av.ds.array([" ", "F", " "], { left: 410, top: top2 });
  arrD.css(0, { "background-color": "LightPink" });
  arrE.css(2, { "background-color": "LightPink" });

  var top3 = top2 + 50;
  var arrG = av.ds.array(["/", "G", "/"], { left: 150, top: top3 });
  var arrH = av.ds.array(["/", "H", "/"], { left: 350, top: top3 });
  var arrI = av.ds.array(["/", "I", "/"], { left: 470, top: top3 });
  [arrG, arrH, arrI].forEach(function (a) {
    a.css(0, { "background-color": "LightPink" });
    a.css(2, { "background-color": "LightPink" });
  });

  // geometry helpers (dynamic)
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


  function arrow(parentArr, childArr, pIdx, cIdx) {
    pIdx = (pIdx !== undefined) ? pIdx : 1;
    cIdx = (cIdx !== undefined) ? cIdx : 1;
    var s = cellCenter(parentArr, pIdx);  
    var t = topCenter(childArr, cIdx);
    av.g.line(s.x, s.y, t.x, t.y, { "stroke-width": 2, "arrow-end": "classic-wide-long" });
  }

  // compute edges
  arrow(arrA, arrB, 0);  // A's left child is B
  arrow(arrA, arrC, 2);  // A's right child is C
  arrow(arrB, arrD, 2);  // B's right child is D 
  arrow(arrC, arrE, 0);  // C's left child is E
  arrow(arrC, arrF, 2);  // C's right child is F
  arrow(arrE, arrG, 0);  // E's left child is G 
  arrow(arrF, arrH, 0);  // F's left child is H
  arrow(arrF, arrI, 2);  // F's right child is I

  av.displayInit();
  av.recorded();
});
