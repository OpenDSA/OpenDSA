"use strict";
// Helper function for creating a pointer
function setPointer(name, obj, index) {
  return obj.jsav.pointer(name, obj, {
    targetIndex : index,
    visible: true,
    anchor: "left top",
    myAnchor: "right bottom",
    left: 15,
    top: -20
  });
}

// Elements of the queue are stored in the first n positions of the array..
(function ($) {
  var jsav = new JSAV("AQueueFirstNposCON");
  // Relative offsets
  var leftMargin = 300;
  var topMargin = 35;
  var minusOne = jsav.ds.array(["-1"], {top: topMargin + 70, left: leftMargin + 30});
  minusOne.hide();
  var arr = jsav.ds.array([12, 45, 5, 81, "", "", "", ""],
                          {indexed: true, top: topMargin, left: leftMargin});
  jsav.umsg("Assume that there are <i>n</i> elements in the queue. By analogy to the array-based list implementation, we could require that all elements of the queue be stored in the first <i>n</i> positions of the array.");
  jsav.displayInit();

  var rearPointer = setPointer("rear", arr, 0);
  var frontPointer = setPointer("front", arr, 3);
  arr.highlight(3);
  jsav.umsg(" If we choose the rear element of the queue to be in position 0, then dequeue operations require only &theta;(1) time because the front element of the queue (the one being removed) is the last element in the array.");
  jsav.step();
  arr.highlight(0);
  arr.highlight(1);
  arr.highlight(2);
  jsav.umsg("However, enqueue operations will require &theta;(<i>n</i>) time, because the n elements currently in the queue must each be shifted one position in the array.");
  jsav.step();
  arr.unhighlight();
  rearPointer.target(arr.index(3));
  frontPointer.target(arr.index(0));
  jsav.umsg("If instead we chose the rear element of the queue to be in position n-1, then an enqueue operation is equivalent to an append operation on a list. This requires only &theta;(1) time.");
  jsav.step();
  jsav.umsg("But now, a dequeue operation requires &theta;(<i>n</i>) time, because all of the elements must be shifted down by one position to retain the property that the remaining <i>n</i>-1 queue elements reside in the first <i>n</i>-1 positions of the array.");
  jsav.step();
  jsav.recorded();
}(jQuery));

// The contents of the queue will be permitted to drift within the array.
(function ($) {
  var jsav = new JSAV("AQueueDriftposCON");

  // Relative offsets
  var leftMargin = 250;
  var topMargin = 25;
  jsav.umsg("A far more efficient implementation can be obtained by relaxing the requirement that all elements of the queue must be in the first <i>n</i> positions of the array. We will still require that the queue be stored be in contiguous array positions, but the contents of the queue will be permitted to drift within the array, as illustrated by the following slides ");
  jsav.displayInit();
  var arr = jsav.ds.array([20, 5, 12, 17, "", "", "", "", "", "", "", ""],
                          {left: leftMargin, top: topMargin});
  var rearPointer =  setPointer("rear", arr, 3);
  var frontPointer =  setPointer("front", arr, 0);
  jsav.umsg(" The queue after the initial four numbers 20, 5, 12, and 17 have been inserted");
  jsav.step();
  frontPointer.target(arr.index(1));
  arr.value(0, "");
  arr.highlight(0);
  jsav.umsg("<code>dequeue</code> operatio n");
  jsav.step();
  arr.value(1, "");
  arr.unhighlight(0);
  arr.highlight(1);
  jsav.umsg("<code>dequeue</code> operation");
  frontPointer.target(arr.index(2));
  jsav.step();
  arr.value(4, "3");
  arr.unhighlight(1);
  arr.highlight(4);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr.index(4));
  jsav.umsg("<code>enqueue(3)</code>");
  jsav.step();
  arr.value(5, "30");
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr.index(5));
  jsav.umsg("<code>enqueue(30)</code>");
  jsav.step();
  arr.value(6, "4");
  arr.unhighlight(5);
  arr.highlight(6);
  rearPointer.target(arr.index(6));
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
  var arr = jsav.ds.array([20, 5, 12, 17, "", "", "", "", "", "", "", ""],
                          {left: leftMargin, top: topMargin});
  var rearPointer =  setPointer("rear", arr, 3);
  var frontPointer =  setPointer("front", arr, 0);
  jsav.umsg("This implementation raises a new problem. Assume that the front element of the queue is initially at position 0, and that elements are added to successively higher-numbered positions in the array.");
  jsav.displayInit();
  frontPointer.target(arr.index(1));
  arr.value(0, "");
  arr.highlight(0);
  jsav.umsg(" When elements are removed from the queue, the front index increases. ");
  jsav.step();
  arr.value(1, "");
  arr.unhighlight(0);
  arr.highlight(1);
  jsav.umsg("<code>dequeue</code> operation");
  frontPointer.target(arr.index(2));
  jsav.step();
  arr.value(4, "3");
  arr.unhighlight(1);
  arr.highlight(4);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr.index(4));
  jsav.umsg("<code>enqueue(3)</code>");
  jsav.step();
  arr.value(5, "30");
  arr.unhighlight(4);
  arr.highlight(5);
  jsav.umsg("<code>dequeue</code> operation");
  rearPointer.target(arr.index(5));
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
  arr.unhighlight(2);
  arr.highlight(6);
  arr.highlight(7);
  arr.highlight(8);
  arr.highlight(9);
  arr.highlight(10);
  arr.highlight(11);
  frontPointer.target(arr.index(3));
  rearPointer.target(arr.index(11));
  jsav.umsg("<code>enqueue(4)</code>, <code>enqueue(55)</code>, <code>enqueue(37)</code>, <code>enqueue(11)</code>, <code>enqueue(26)</code>, <code>enqueue(32)</code>");
  jsav.step();
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

// JSAV extension for circular queue.
(function ($) {
  function sin(x) {
    return Math.sin(x * Math.PI / 180);
  }
  function cos(x) {
    return Math.cos(x * Math.PI / 180);
  }
  var Circular = function (jsav, cx, cy, r1, r2, options) {
    this.jsav = jsav;
    this.cx = cx;
    this.cy = cy;
    this.r1 = r1;
    this.r2 = r2;
    var defaultOptions = {};
    this.options = $.extend(defaultOptions, options);
    var x1, y1, x2, y2, x3, y3, x4, y4, label,
        i = 0, theta = 0, step = 30, pathString;
    this.path = [];
    this.labels = [];
    while (theta < 360) {
      x1 = cx + r1 * cos(theta);
      y1 = cy + r1 * sin(theta);
      x2 = cx + r2 * cos(theta);
      y2 = cy + r2 * sin(theta);
      theta += 30;
      x3 = cx + r2 * cos(theta);
      y3 = cy + r2 * sin(theta);
      x4 = cx + r1 * cos(theta);
      y4 = cy + r1 * sin(theta);
      theta -= 30;
      pathString = "M" + x2 + "," + y2;
      pathString += " A" + r2 + "," + r2 + " 1 0,1 " + x3 + "," + y3;
      pathString += " L" + x4 + "," + y4;
      pathString += " A" + r1 + "," + r1 + " 1 0,0 " + x1 + "," + y1;
      this.path[i] = this.jsav.g.path(pathString, this.options);
      label = this.jsav.label(" ");
      label.css({'position' : 'absolute',
                 left: cx + (r1 + r2) / 2 * cos(theta + 15) - 20 + 'px',
                 top: cy + (r1 + r2) / 2 * sin(theta + 15) - 25 + 'px',
                 width: '40px', height: '20px', 'text-align': 'center'});
      this.labels[i] = label;
      var test = this.jsav.label(i);
      test.css({'position' : 'absolute',
                 left: cx + (r1) / 100 * 78 * cos(theta + 15) - 20 + 'px',
                 top: cy + (r1) / 100 * 78 * sin(theta + 15) - 25 + 'px',
                 width: '40px', height: '20px', 'text-align': 'center'});
  
      i++;
      theta += 30;
    }
  };

  Circular.prototype.value = JSAV.anim(function (index, value) {
    var oldval = this.labels[index].element.html();
    this.labels[index].element.html(value);
    return [index, oldval];
  });
  Circular.prototype.highlight = function (index) {
    this.path[index]._setattrs({"fill": "yellow", "opacity": "0.5"});
  };
  Circular.prototype.unhighlight = function (index) {
    this.path[index]._setattrs({"fill": "none", "opacity": "1.0"});
  };
  Circular.prototype.pointer = function (name, index) {
    var degree = 15 + 30 * index;
    var left = cos(degree) * ((this.r2 - this.r1) / 2 * 1.8);
    var top = sin(degree) * ((this.r2 - this.r1) / 2 * 1.8);
    var fx, fy;
    var tx = this.r2 * cos(degree) + this.cx;
    var ty = this.r2 * sin(degree) + this.cy;
    left = tx + 32 * cos(degree + 15) - 20;
    if (degree + 15 < 180) {
      top = ty + 32 * sin(degree + 15);
    } else {
      top = ty + 32 * sin(degree + 15) - 22;
    }
    var pointer = {};
    pointer.label = this.jsav.label(name,
      {relativeTo: this.labels[index], anchor: "center",
       myAnchor: "center", left: 0, top: 0, width : 40});
    pointer.label.element.css({left : left, top : top});
    //this.value(index, tx.toFixed() + "," + ty.toFixed());
    fx = pointer.label.element.position().left +
         pointer.label.element.outerWidth() / 2;
    if (degree + 15 < 180) {
      fy = pointer.label.element.position().top;
    } else {
      fy = pointer.label.element.position().top + pointer.label.element.outerHeight();
    }
    pointer.arrow = this.jsav.g.line(fx, fy, tx, ty, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
    return pointer;
  };

  JSAV.ext.circular = function (cx, cy, r1, r2, options) {
    return new Circular(this, cx, cy, r1, r2, $.extend({}, options));
  };
}(jQuery));

// Array-based circular queue
(function ($) {
  var jsav = new JSAV("AQueueCircularCON");

  // center coordinate
  var cx = 400, cy = 130;
  // radius
  var r1 = 50, r2 = 100;
  var fx = cx, fy = cy - r2 - 15;
  var tx = cx + r2 + 15, ty = cy;
  var fx1 = fx + 70, ty2 = ty - 70;
  var path = "M" + fx + "," + fy;
  path += " C" + fx1 + "," + fy;
  path += " " + tx + "," + ty2;
  path += " " + tx + "," + ty;
  var curve = jsav.g.path(path, {"stroke-width" : 2, "arrow-end" : "classic-wide-long"});
  var cir = jsav.circular(cx, cy, r1, r2, {"stroke-width" : 2});
  curve.hide();
  jsav.umsg("The \"drifting queue\" problem can be solved by pretending that the array is circular and so allow the queue to continue directly from the highest-numbered position in the array to the lowest-numbered position.");
  jsav.displayInit();
  jsav.umsg(" This is easily implemented through use of the modulus operator (denoted by % in many programming languages). In this way, positions in the array are numbered from 0 through size-1, and position size-1 is defined to immediately precede position 0.");
  jsav.step();
  jsav.umsg("The circular queue with array positions increasing in the clockwise direction.");
  curve.show();
  jsav.step();
  curve.hide();
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

// How to recognize when the queue is empty or full.
(function ($) {
  var jsav = new JSAV("AQueueEmptyFullCON");

  // center coordinate
  var cx = 400, cy = 120;
  // radius
  var r1 = 50, r2 = 100;
  var cir = jsav.circular(cx, cy, r1, r2, {"stroke-width" : 2});
  jsav.umsg("There remains one more serious, though subtle, problem to the array-based queue implementation. How can we recognize when the queue is empty or full?");
  jsav.displayInit();
  cir.value(10, "12");
  cir.highlight(10);
  var frontP = cir.pointer("front,rear", 10);
  jsav.umsg("Assume that front stores the array index for the front element in the queue, and rear stores the array index for the rear element. If both front and rear have the same position, then with this scheme there must be one element in the queue.");
  jsav.step();
  cir.highlight(11);
  cir.value(10, " ");
  frontP.arrow.hide();
  frontP.label.hide();
  var frontP1 = cir.pointer("front", 11);
  var rearP1 = cir.pointer("rear", 10);
  jsav.umsg("Thus, an empty queue would be recognized by having rear be <i>one less</i> than front (taking into account the fact that the queue is circular, so position size-1 is actually considered to be one less than position 0).");
  jsav.step();
  jsav.umsg("But what if the queue is completely full? In other words, what is the situation when a queue with n array positions available contains n elements? In this case, if the front element is in position 0, then the rear element is in position size-1.");
  frontP1.arrow.hide();
  frontP1.label.hide();
  rearP1.arrow.hide();
  rearP1.label.hide();
  cir.unhighlight(10);
  var frontP2 = cir.pointer("front", 0);
  var rearP2 = cir.pointer("rear", 11);
  cir.highlight(11);
  cir.highlight(0);
  jsav.step();
  jsav.umsg("But this means that the value for rear is one less than the value for front when the circular nature of the queue is taken into account. In other words, the full queue is indistinguishable from the empty queue!");
  jsav.step();
  jsav.umsg("You might think that the problem is in the assumption about front and rear being defined to store the array indices of the front and rear elements, respectively, and that some modification in this definition will allow a solution. ");
  jsav.step();
  jsav.umsg(" Unfortunately, the problem cannot be remedied by a simple change to the definition for front and rear, because of the number of conditions or states that the queue can be in. Ignoring the actual position of the first element, and ignoring the actual values of the elements stored in the queue, how many different states are there? ");
  jsav.step();
  jsav.umsg(" There can be no elements in the queue, one element, two, and so on. At most there can be n elements in the queue if there are n array positions. This means that there are n+1 different states for the queue (0 through n elements are possible).");
  jsav.step();
  jsav.recorded();
}(jQuery));

// Show the AQueue code.
(function ($) {
  var jsav = new JSAV("AQueueVarCON");
  var pseudo = jsav.code({url: "../../../SourceCode/Processing/Lists/AQueue.pde",
                       lineNumbers: false,
                       startAfter: "/* *** ODSATag: AQueue1 *** */",
                       endBefore: "/* *** ODSAendTag: AQueue1 *** */"});
  jsav.umsg("Member <code>queueArray</code> holds the queue elements,");
  pseudo.highlight(6);
  jsav.displayInit();
  pseudo.unhighlight(6);
  pseudo.highlight(9);
  jsav.umsg("and as usual, the queue constructor allows an optional parameter to set the maximum size of the queue.");
  jsav.step();
  pseudo.unhighlight(9);
  pseudo.highlight(10);
  jsav.umsg("The array as created is actually large enough to hold one element more than the queue will allow, so that empty queues can be distinguished from full queues.");
  jsav.step();
  pseudo.unhighlight(10);
  pseudo.highlight(3);
  jsav.umsg("Member <code>maxSize</code> is used to control the circular motion of the queue (it is the base for the modulus operator).");
  jsav.step();
  pseudo.unhighlight(3);
  pseudo.highlight(5);
  jsav.umsg("Member <code>rear</code> is set to the position of the current rear element, while front is the position of the current front element.");
  jsav.recorded();
}(jQuery));
