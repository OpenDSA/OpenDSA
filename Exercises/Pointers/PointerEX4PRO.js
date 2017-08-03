/*global JSAV, window */
(function() {
  "use strict";

  var av, // The JSAV object
      listSize, // JSAV list size
      jsavList, // JSAV list
      connections = [], // Stores the node-pairs of the JSAV-List arrows.
      fromNode, // Stores the node whose pointer area is clicked.
      selected_node; // Remember node that has been selected by user for swap

  var pointerEX4PRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Add an edge from obj1(node) to obj2(node)
    connection: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var leftOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().left;
      var topOffset = obj1.jsav.container.find(".jsavcanvas:first").offset().top;
      var fx = obj1.element.offset().left + 39 - leftOffset;
      var tx = obj2.element.offset().left + 2 - leftOffset;
      var fy = obj1.element.offset().top + 16 - topOffset;
      var ty = obj2.element.offset().top + 16 - topOffset;
      var fx1 = fx,
          fy1 = fy,
          tx1 = tx,
          ty1 = ty;

      var dx = Math.max(Math.abs(fx - tx) / 2, 35);
      var dy = Math.max(Math.abs(fy - ty) / 2, 35);
      if ((fy - ty > -10) && (fy - ty < 10) && ((tx - fx < 36) || (tx - fx > 38))) {
        dx = Math.min(Math.abs(fx - tx), 20);
        dy = Math.min(Math.abs(fx - tx) / 3, 50);
        tx += 22;
        ty += 15;
        fx1 = fx;
        fy1 = fy + dy;
        tx1 = tx + dx;
        ty1 = ty + dy;
      }
      var edge = jsav.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                             {"arrow-end": "classic-wide-long",
                              opacity: 100, "stroke-width": 2});

      if (obj1.llist_next) {
        obj1.llist_edgeToNext.element.remove();
      } else {
        if(obj1.llist_tail !== null){
          obj1.llist_tail.element.remove();
          obj1.llist_tail = null;
        }
      }

      obj1.llist_edgeToNext = edge;
      obj1.llist_next = obj2;
    },

    // Function for connecting two nodes
    connect: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      pointerEX4PRO.connection(obj1, obj2, jsav);
      obj1.llist_next = obj2;
      obj1._next = obj2;
      for (var i = 0; i < connections.length; i++) {
        if ((connections[i].from === obj1) && (connections[i].to !== obj2)) {
          connections[i].to = obj2;
          return;
        }
      }
      connections.push({from: obj1, to: obj2});
    },

    // Helper function for adding a tail to the target node.
    addTail: function(node) {
      var leftOffset = node.element.offset().left - av.container.find(".jsavcanvas:first").offset().left;
      var topOffset = node.element.offset().top - av.container.find(".jsavcanvas:first").offset().top;
      var fx = leftOffset + 34;
      var tx = leftOffset + 44;
      var fy = topOffset + 32;
      var ty = topOffset + 1;

      if (node.llist_tail) {
        node.llist_tail.element.remove();
        node.llist_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      } else {
        node.llist_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      }
      node.llist_next = null;
    },

    // Click event handler on the list
    clickHandler: function(e) {
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if ((x > 31) && (x < 42) && (y > 0) && (y < 31)) { // We are in the pointer part
        if (selected_node !== null) {
          selected_node.removeClass("bgColor");
          selected_node = null;
        }
        if (fromNode === null) { // Newly selecting a node pointer field
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
        } else if (this.id() === fromNode.id()) { // re-clicked pointer
          $("#" + this.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        } else { // Clicked a second pointer, so replace
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id() + " .jsavpointerarea:first").addClass("bgColor");
          fromNode = this;
        }
      } else // We are in the value part of the node
        if (fromNode !== null) { // We are connecting another node to this node
          // Note that this allows a node to point to itself
          pointerEX4PRO.connect(fromNode, this, av);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id()).removeClass("bgColor");
          fromNode = null;
        } else if (selected_node === null) { // Hightlight it for next action
          this.addClass("bgColor");
          selected_node = this;
        } else { // Second value clicked, so will swap values
          this.value(selected_node.value());
          selected_node.removeClass("bgColor");
          av.effects.copyValue(selected_node, this);
          selected_node = null;
        }
      pointerEX4PRO.userInput = true;
    },

    // Click event handler of 'makenull' button.
    nullClickHandler: function() {
      if (fromNode !== null) { // If no node pointer field selected, do nothing
        $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
        pointerEX4PRO.addTail(fromNode);
        if (fromNode.llist_edgeToNext) {
          fromNode.llist_edgeToNext.element.remove();
          fromNode.llist_next = null;
        }
        pointerEX4PRO.userInput = true;
      }
    },

    // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 220,
          topMargin = 70;
      // Reset the value of global variables.
      pointerEX4PRO.userInput = false;
      connections = [];
      selected_node = null;
      fromNode = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX4PRO")) { $("#PointerEX4PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX4PRO");

      var codes = [];
      codes[0] = "b.next = c.next;";
      codes[1] = "c.next = b;";
      av.code(codes);

      jsavList = av.ds.list({nodegap: 30, top: topMargin, left: leftMargin});
      jsavList.addFirst("c");
      jsavList.addFirst("b");
      jsavList.layout();

      // 'return' JSAV array
      var nullBox = av.ds.array([""], {left: leftMargin, top: topMargin + 50});
      nullBox.addClass([0], "nullBox"); //remove null node's boarder

      for (var i = 0; i < listSize; i++) {
        jsavList.get(i).llist_next = jsavList.get(i).next();
        jsavList.get(i).llist_edgeToNext = jsavList.get(i).edgeToNext();
        jsavList.get(i).llist_tail = null;
      }

      av.displayInit();
      av.recorded();

      jsavList.click(pointerEX4PRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function() {
      listSize = 2;
      pointerEX4PRO.reset();

      // Set up handler for 'makenull' button.
      $("#makenull").click(function() {
        pointerEX4PRO.nullClickHandler();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX4PRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if(jsavList.get(0).llist_next !== null){
        return false;
      } else if (jsavList.get(1).llist_next !== jsavList.get(0)){
        return false;
      } else if (jsavList.get(0).element.text() !== "b"){
        return false;
      } else if (jsavList.get(1).element.text() !== "c"){
        return false;
      }
      return true;
    }

  };

  window.pointerEX4PRO = window.pointerEX4PRO || pointerEX4PRO;
}());
