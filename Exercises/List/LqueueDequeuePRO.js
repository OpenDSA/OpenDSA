/*global JSAV, window */
(function() {
  "use strict";
  var av,               // The JSAV object
      leftMargin,           //
      topMargin,            //
      answerArr = [],       // The (internal) array that stores the correct answer
      answerOrderArr = [],  // The (internal) array that stores the correct order of nodes
      answFrontNode,        //
      answRearNode,         //
      answCopyFrom,         //
      orderArr = [],        // Stores the node.id() of the jsavList
      listArr = [],         // Stores the jsav list values
      front,                // pointer front
      rear,                 // pointer rear
      selected_pointer,     // pointer that is clicked, which will always be front here.
      selected_node,
      status = 0,           // Nothing is currently selected, status = 0;
      // listNode is selected, status = 1;
      // pointer area is selected, status = 2;
      // pointer is selected, status = 3.
      connections = [],
      fromNode,
      toNode,
      jsavList,             // JSAV list
      returnArr,
      copyFrom,
      listSize;             // JSAV list size

  var lqueueDequeuePRO = {
    userInput: null,            // Boolean: Tells us if user ever did anything

    // pointer click handler
    pclick: function(pointer) {
      selected_pointer = pointer;
      selected_pointer.element.toggleClass("highlight");
      status = 3;
      lqueueDequeuePRO.userInput = true;
    },

    // Helper function for seting pointer
    setPointer: function(pname, node) {
      var pointerRight = {anchor: "right top", myAnchor: "left bottom", fixed: "true",
                          left: -10, top: -20};
      var pointerLeft = {anchor: "left top", myAnchor: "right bottom", fixed: "true",
                         left: 15, top: -20};
      if (pname === "rear") { //(node.pNum === 1) {
        node.pNum ++;
        return node.jsav.pointer(pname, node, pointerRight);
      } //  else if (node.pNum === 0) {
      node.pNum ++;
      return node.jsav.pointer(pname, node, pointerLeft);
    },

    // Add an edge from obj1 to obj2
    connection: function(obj1, obj2) {
      if (obj1 === obj2) { return; }
      var leftOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().left;
      var topOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().top;
      var fx = obj1.element.offset().left + 39 - leftOffset;
      var tx = obj2.element.offset().left + 2 - leftOffset;
      var fy = obj1.element.offset().top + 16 - topOffset;
      var ty = obj2.element.offset().top + 16 - topOffset;
      var fx1 = fx, fy1 = fy, tx1 = tx, ty1 = ty;

      var disx = (fx - tx - 22) > 0 ? 1 : (fx - tx - 22) === 0 ? 0 : -1;
      var disy = (fy - ty) > 0 ? 1 : (fy - ty) === 0 ? 0 : -1;

      var dx = Math.max(Math.abs(fx - tx) / 2, 35);
      var dy = Math.max(Math.abs(fy - ty) / 2, 35);

      if ((fy - ty > -25) && (fy - ty < 25) && ((tx - fx < 36) || (tx - fx > 38))) {
        dx = Math.min(Math.abs(fx - tx), 20);
        dy = Math.min(Math.abs(fx - tx) / 3, 50);
        tx += 22;
        ty -= 15;
        fx1 = fx;
        fy1 = fy - dy;
        tx1 = tx - dx;
        ty1 = ty - dy;
      } else if (disx === 1) {
        tx += 22;
        ty += 15 * disy;
        fx1 = fx + dx;
        fy1 = fy - dy * disy;
        tx1 = tx;
        ty1 = ty + dy * disy;
      } else if (disx === -1) {
        fx1 = fx + dx;
        fy1 = fy;
        tx1 = tx - dx;
        ty1 = ty;
      }

      var edge = av.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                           {"arrow-end": "classic-wide-long", opacity: 100, "stroke-width": 2});
      if (obj1.odsa_next) {
        obj1.odsa_edgeToNext.element.remove();
      } else {
        obj1.odsa_tail.element.remove();
        obj1.odsa_tail = null;
      }
      obj1.odsa_edgeToNext = edge;
    },

    // Function for connecting to nodes when click them
    connect: function(obj1, obj2) {
      var i;
      if (obj1 === obj2) { return; }
      lqueueDequeuePRO.connection(obj1, obj2);
      obj1.odsa_next = obj2;
      obj1._next = obj2;
      for (i = 0; i < connections.length; i++) {
        if ((connections[i].from === obj1) && (connections[i].to !== obj2)) {
          connections[i].to = obj2;
          return;
        }
      }
      connections.push({from: obj1, to: obj2});
    },

    copyHandler: function() {
      if (status === 1) {
        copyFrom = selected_node;
        av.effects.copyValue(selected_node, returnArr, 0);
        selected_node.unhighlight();
        status = 0;
      }
    },

    // Click event handler on the list
    clickHandler: function(e) {
      var setright = {anchor: "right top", myAnchor: "left bottom", left: -10, top: -20};
      var setleft = {anchor: "left top", myAnchor: "right bottom", left: 15, top: -20};
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if ((x > 31) && (x < 42) && (y > 0) && (y < 31)) { // In pointer area
        if (status === 0) {
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
          status = 2;
        } else if (status === 2) {
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          if (this.id() === fromNode.id()) {
            $("#" + this.id() + " .jsavpointerarea:first").removeClass("bgColor");
            fromNode = null;
            status = 0;
          } else {
            $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
            fromNode = this;
            status = 2;
          }
        } else if (status === 1) {
          selected_node.unhighlight();
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
          status = 2;
        }
      } else { // In value area
        if (status === 2) {
          toNode = this;
          lqueueDequeuePRO.connect(fromNode, toNode);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + toNode.id()).removeClass("bgColor");
          fromNode = null;
          toNode = null;
          status = 0;
        } else if (status === 3) {
          if (selected_pointer.target() !== this) {
            selected_pointer.target().pNum--;
            if (this === front) { // (this.pNum === 1) {
              selected_pointer.target(this, setright);
              this.pNum++;
            } else { // if (this.pNum === 0) {
              selected_pointer.target(this, setleft);
              this.pNum++;
            }
          }
          av.container.trigger("jsav-updaterelative");
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
          status = 0;
        } else if (status === 0) {
          this.highlight();
          selected_node = this;
          status = 1;
        } else if (status === 1) {
          if (selected_node === this) {
            this.unhighlight();
            status = 0;
          } else {
            selected_node.unhighlight();
            selected_node = this;
            this.highlight();
          }
        }
        lqueueDequeuePRO.userInput = true;
      }
    },

    // Add a tail for the target node
    addTail: function(node) {
      var leftOffset = node.element.offset().left - av.container.find(".jsavcanvas:first").offset().left;
      var topOffset = node.element.offset().top - av.container.find(".jsavcanvas:first").offset().top;
      var fx = leftOffset + 34;
      var tx = leftOffset + 44;
      var fy = topOffset + 32;
      var ty = topOffset + 1;

      if (node.odsa_tail) {
        node.odsa_tail.element.remove();
        node.odsa_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      } else {
        node.odsa_edgeToNext.element.remove();
        node.odsa_next = null;
        node.odsa_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      }
      node.odsa_next = null;
    },

    // Click handler function for makenull button
    makenull: function() {
      if (status === 2) {
        fromNode.element.removeClass("bgColor");
        lqueueDequeuePRO.addTail(fromNode);
        fromNode = null;
        status = 0;
      }
    },

    // Initialise the exercise
    initJSAV: function(size) {
      var i;
      listSize = size;
      answerArr.length = 0;

      answerArr[0] = "null";
      // Give random numbers in range 0..999
      for (i = 1; i < size + 1; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      // Make a copy.
      listArr = answerArr.slice(0);

      reset();

      // correct answer
      if (listSize !== 1) {
        answerArr.splice(1, 1);
        answerArr.length = listSize - 1;
      }

      // Set up handler for 'makenull'
      $("#makenull").click(function() { lqueueDequeuePRO.makenull(); });
      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function(arr_size) {
      var i = 0,
          curr = jsavList.get(0);

      if (front.target() !== answFrontNode) { return false; }
      if (rear.target() !== answRearNode) { return false; }
      if (answCopyFrom !== copyFrom) { return false; }

      while (curr) {
        if ((curr.value() === answerArr[i]) && (curr.id() === answerOrderArr[i])) {
          curr = curr.odsa_next;
          i++;
        } else {
          return false;
        }
      }

      if (listSize === 1) {
        return true;
      } else if (i === listSize - 1) {
        return true;
      }

      return false;
    }
  };

  // reset function definition
  function reset() {
    var i;
    leftMargin = 40;
    topMargin = 60;
    lqueueDequeuePRO.userInput = false;
    connections = [];
    selected_node = null;
    copyFrom = null;
    status = 0;

    // Clear the old JSAV canvas.
    if ($("#LqueueDequeuePRO")) { $("#LqueueDequeuePRO").empty(); }

    // Set up the display
    av = new JSAV("LqueueDequeuePRO");
    jsavList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
    returnArr = av.ds.array(["null"], {left: leftMargin + 62, top: topMargin + 70});
    av.label("return", {left: leftMargin + 18, top: topMargin + 73});

    for (i = listSize - 1; i >= 0; i--) {
      jsavList.addFirst(listArr[i]);
    }
    jsavList.layout();
    front = lqueueDequeuePRO.setPointer("front", jsavList.get(0));
    rear = lqueueDequeuePRO.setPointer("rear", jsavList.get(listSize - 1));
    for (i = 0; i < listSize; i++) {
      // Store JSAV List orders
      orderArr[i] = jsavList.get(i).id();
      // Assign .odsa_next the object of the next JSAV node
      jsavList.get(i).odsa_next = jsavList.get(i).next();
      // Assign odsa_edgeToNext the edge connecting the JSAV node to the following node
      jsavList.get(i).odsa_edgeToNext = jsavList.get(i).edgeToNext();
    }
    // Manually add tail to the last node.
    jsavList.get(listSize - 1).odsa_tail =
      av.g.line(leftMargin + 34 + (listSize - 1) * 74, 47 + topMargin,
                leftMargin + 44 + (listSize - 1) * 74, 16 + topMargin,
                {opacity: 100, "stroke-width": 1});

    // Correct answer
    answerOrderArr = orderArr.slice(0);
    if (listSize !== 1) {
      answerOrderArr.splice(1, 1);
      answerOrderArr.length = listSize - 1;
      answCopyFrom = jsavList.get(1);
    } else {
      answCopyFrom = null;
    }
    answFrontNode = jsavList.get(0);
    if (listSize === 2) {
      answRearNode = jsavList.get(0);
    } else {
      answRearNode = jsavList.get(listSize - 1);
    }
    av.displayInit();
    av.recorded();

    // Bind click event handlers.
    front.click(lqueueDequeuePRO.pclick);
    rear.click(lqueueDequeuePRO.pclick);
    returnArr.click(lqueueDequeuePRO.copyHandler);
    jsavList.click(lqueueDequeuePRO.clickHandler);

    lqueueDequeuePRO.userInput = false;
  }

  window.lqueueDequeuePRO = window.lqueueDequeuePRO || lqueueDequeuePRO;
}());
