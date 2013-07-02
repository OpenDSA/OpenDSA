"use strict";
// Helper function for creating a pointer
function setPointer(name, obj){
  return obj.jsav.pointer(name, obj,{visible: true, 
                anchor: "left top",
                myAnchor: "right bottom",
                left: 20,
                top: -20});
}

jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
};

// Elements of the queue are stored in the first n positions of the array..
(function ($) {
  var jsav = new JSAV("AQueueFirstNposCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 35; 
  var minusOne = jsav.ds.array(["-1"],{top: topMargin + 70, left: leftMargin + 30});
  minusOne.hide();
  var arr = jsav.ds.array([12,45,5,81,"", "", "", ""],{indexed:true, top: topMargin, left: leftMargin});
  jsav.umsg("Assume that there are <code>n</code> elements in the queue. By analogy to the array-based list implementation, we could require that all elements of the queue be stored in the first <code>n</code> positions of the array.");
  jsav.displayInit();
  var rearPointer = jsav.pointer("rear", arr, {targetIndex : 0});
  var frontPointer = jsav.pointer("front", arr, {targetIndex : 3});
  arr.highlight(3);
  jsav.umsg(" If we choose the rear element of the queue to be in position 0, then dequeue operations require only &theta;(1) time because the front element of the queue (the one being removed) is the last element in the array.");
  jsav.step();
  arr.highlight(0);
  arr.highlight(1);
  arr.highlight(2);
  jsav.umsg("However, enqueue operations will require &theta;(n) time, because the n elements currently in the queue must each be shifted one position in the array.");
  jsav.step();
  arr.unhighlight();
  rearPointer.target(arr, {relativeIndex : 3, targetIndex : 3});
  frontPointer.target(arr, {relativeIndex : 0, targetIndex : 0});
  jsav.umsg("If instead we chose the rear element of the queue to be in position n-1, then an enqueue operation is equivalent to an append operation on a list. This requires only &theta;(1) time.");
  jsav.step();
  jsav.umsg("But now, a dequeue operation requires &theta;(n) time, because all of the elements must be shifted down by one position to retain the property that the remaining $n-1$ queue elements reside in the first n-1 positions of the array.");
  jsav.step();
  jsav.step();
  jsav.recorded();
}(jQuery));

// The contents of the queue will be permitted to drift within the array.
(function ($) {
  var jsav = new JSAV("AQueueDriftposCON");

  // Relative offsets
  var leftMargin = 250;
  var topMargin = 25; 
  jsav.umsg("A far more efficient implementation can be obtained by relaxing the requirement that all elements of the queue must be in the first $n$~positions of the array. We will still require that the queue be stored be in contiguous array positions, but the contents of the queue will be permitted to drift within the array, as illustrated by the following slides ");
  jsav.displayInit();
  var arr = jsav.ds.array([20,5,12,17, "", "", "", "", "", "", "", ""],{left:leftMargin, top:topMargin});
  var rearPointer =  jsav.pointer("rear", arr, {targetIndex : 3});
  var frontPointer =  jsav.pointer("front", arr, {targetIndex : 0});
  jsav.umsg(" The queue after the initial four numbers 20, 5, 12, and 17 have been inserted");
  jsav.step();
  frontPointer.target(arr, {relativeIndex : 1, targetIndex : 1});
  arr.value(0, "");
  arr.highlight(0);
  jsav.umsg("<code>dequeue</code> operation");
  jsav.step();
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  arr.value(1, "");
  arr.unhighlight(0);
  arr.highlight(1);
  jsav.umsg("<code>dequeue</code> operation");
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  jsav.step();
  arr.value(4, "3");
  arr.unhighlight(1);
  arr.highlight(4);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 4, targetIndex : 4});
  jsav.umsg("<code>enqueue(3)</code>");
  jsav.step();
  arr.value(5, "30");
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 5, targetIndex : 5});
  jsav.umsg("<code>enqueue(30)</code>");
  jsav.step();
  arr.value(6, "4");
  arr.unhighlight(5);
  arr.highlight(6);
  rearPointer.target(arr, {relativeIndex : 6, targetIndex : 6});
  jsav.umsg("<code>enqueue(4)</code>");
  jsav.step();
  arr.unhighlight(6);
  jsav.umsg("Now, both the enqueue and the dequeue operations can be performed in &theta;(1) time because no other elements in the queue need be moved.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// A problem that queue runs out of space..
(function ($) {
  var jsav = new JSAV("AQueueBadCON");

  // Relative offsets
  var leftMargin = 250;
  var topMargin = 25; 
  var arr = jsav.ds.array([20,5,12,17, "", "", "", "", "", "", "", ""],{left:leftMargin, top:topMargin});
  var rearPointer =  jsav.pointer("rear", arr, {targetIndex : 3});
  var frontPointer =  jsav.pointer("front", arr, {targetIndex : 0});
  jsav.umsg("This implementation raises a new problem. Assume that the front element of the queue is initially at position~0, and that elements are added to successively higher-numbered positions in the array.");
  jsav.displayInit();
  frontPointer.target(arr, {relativeIndex : 1, targetIndex : 1});
  arr.value(0, "");
  arr.highlight(0);
  jsav.umsg(" When elements are removed from the queue, the front index increases. ");
  jsav.step();
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  arr.value(1, "");
  arr.unhighlight(0);
  arr.highlight(1);
  jsav.umsg("<code>dequeue</code> operation");
  frontPointer.target(arr, {relativeIndex : 2, targetIndex : 2});
  jsav.step();
  arr.value(4, "3");
  arr.unhighlight(1);
  arr.highlight(4);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 4, targetIndex : 4});
  jsav.umsg("<code>enqueue(3)</code>");
  jsav.step();
  arr.value(5, "30");
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr, {relativeIndex : 5, targetIndex : 5});
  jsav.umsg("<code>enqueue(30)</code>");
  jsav.step();
  jsav.umsg("Over time, the entire queue will drift toward the higher-numbered positions in the array.");
  jsav.step();
  arr.value(2, "");
  arr.value(6, "4");
  arr.value(7, "55");
  arr.value(8, "37");
  arr.value(9, "11");
  arr.value(10, "26");
  arr.value(11, "32");
  arr.unhighlight(5);
  arr.highlight(2);
  arr.highlight(6);
  arr.highlight(7);
  arr.highlight(8);
  arr.highlight(9);
  arr.highlight(10);
  arr.highlight(11);
  frontPointer.target(arr, {relativeIndex : 3, targetIndex : 3});
  rearPointer.target(arr, {relativeIndex : 11, targetIndex : 11});
  jsav.umsg("<code>enqueue(4)</code>, <code>enqueue(55)</code>, <code>enqueue(37)</code>, <code>enqueue(11)</code>, <code>enqueue(26)</code>, <code>enqueue(32)</code>");
  jsav.step();
  arr.unhighlight(2);
  arr.unhighlight(6);
  arr.unhighlight(7);
  arr.unhighlight(8);
  arr.unhighlight(9);
  arr.unhighlight(10);
  arr.unhighlight(11);
  jsav.umsg("Once an element is inserted into the highest-numbered position in the array, the queue has run out of space.");
  jsav.step();
  jsav.umsg("This happens despite the fact that there might be free positions at the low end of the array where elements have previously been removed from the queue.");
  arr.highlight(0);
  arr.highlight(1);
  arr.highlight(2);
  jsav.recorded();
}(jQuery));

(function($){
  function sin(x){
    return Math.sin(x*Math.PI/180);
  }
  function cos(x){
    return Math.cos(x*Math.PI/180);
  }
  var Circular = function(jsav, cx, cy, r1, r2, options){
    this.jsav = jsav;
    this.cx = cx;
    this.cy = cy;
    this.r1 = r1;
    this.r2 = r2;
    var defaultOptions = {};
    this.options = $.extend(defaultOptions, options);
    this.circle1 = this.jsav.g.circle(cx, cy, r1, this.options);
    this.circle2 = this.jsav.g.circle(cx, cy, r2, this.options);
    this.lines = [];
    this.values = [];
    var name = "test test";

    var i = 0, x1, y1, x2, y2, label, degree = 0, step = 30;
    while(degree < 360){
      x1 = cx + r1 * cos(degree);
      y1 = cy + r1 * sin(degree);
      x2 = cx + r2 * cos(degree);
      y2 = cy + r2 * sin(degree);
      this.lines[i] = (this.jsav.g.line(x1, y1, x2, y2 , this.options));
      label = this.jsav.label(" ");
      label.css({'position' : 'absolute', 
                 left : cx + (r1+r2)/2 * cos(degree + 15) - 20 + 'px', 
                 top : cy + (r1+r2)/2 * sin(degree + 15) - 10 + 'px', width : '40px', height:'20px', 'text-align': 'center'});
      this.values[i] = label;
      i++;
      degree += 30;
    }
  };
  Circular.prototype.value = JSAV.anim(function(index, value){
    var oldval = this.values[index].element.html();
    this.values[index].element.html(value);
    return [index, oldval];
  });
  Circular.prototype.pointer = function(name, index){
  var degree = 15 + 30 * index;
  var left = cos(degree)*((this.r2 - this.r1)/2*1.8);
  var top = sin(degree)*((this.r2 - this.r1)/2*1.8);
  var fx, fy; 
  var tx = this.r2*cos(degree) + this.cx;
  var ty = this.r2*sin(degree) + this.cy;
  if(degree + 15 < 180){
    left = tx + 25 * cos(degree + 15) -20;
    top = ty + 25 * sin(degree + 15);
  }else{
    left = tx + 25 * cos(degree + 15) -20;
    top = ty + 25 * sin(degree + 15) - 22;
  }
  var pointer = {};
  pointer.label = this.jsav.label(name,{relativeTo: this.values[index], anchor: "center",
                          myAnchor: "center",
                          left: 0,
                          top: 0, width : 40});
  pointer.label.element.css({left : left, top : top});
  this.value(index, top.toFixed(0));
  if(degree + 15 < 180){
    fx = pointer.label.element.position().left + pointer.label.element.outerWidth()/2;
    fy = pointer.label.element.position().top;
  }else{
    fx = pointer.label.element.position().left + pointer.label.element.outerWidth()/2;
    fy = pointer.label.element.position().top + pointer.label.element.outerHeight();
  }
  pointer.arrow = this.jsav.g.line(fx, fy, tx, ty, {"stroke-width" : 2, "arrow-end":"classic-wide-long"});
  return pointer;
}

  JSAV.ext.circular = function(cx, cy, r1, r2, options) {
    return new Circular(this, cx, cy, r1, r2, $.extend({}, options));
  }; 
}(jQuery));

(function($){
  var jsav = new JSAV("AQueueCircularCON");

  // Relative offsets
  var cx = 400;
  var cy = 120; 
  var cir = jsav.circular(cx, cy, 50, 100, {"stroke-width" : 2});
  jsav.umsg("The circular queue with array positions increasing in the clockwise direction.");
  jsav.displayInit();
  cir.value(8, "20");
  cir.value(9, "5");
  cir.value(10, "12");
  cir.value(11, "17");
  var frontP = cir.pointer("front", 8);
  var rearP = cir.pointer("rear", 11);
  jsav.umsg("The queue after the initial four numbers 20, 5, 12, and 17 have been inserted.");
  jsav.step();
  cir.value(8, " ");
  cir.value(9, " ");
  cir.value(0, "3");
  cir.value(1, "30");
  cir.value(2, "4");
  cir.value(10, "12");
  cir.value(11, "17");
  frontP.arrow.hide();
  frontP.label.hide();
  rearP.arrow.hide();
  rearP.label.hide();
  cir.pointer("front", 10);
  cir.pointer("rear", 2);
  jsav.umsg("The queue after elements 20 and 5 are deleted, following which 3, 30, and 4 are inserted.");
  jsav.step();
  jsav.recorded();
}(jQuery));

