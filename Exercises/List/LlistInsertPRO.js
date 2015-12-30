/*global window */
(function() {
  "use strict";
  var av, // The JSAV object
      answerArr = [], // The (internal) array that stores the correct answer
      answerOrderArr = [], // The (internal) array that stores the correct order of nodes
      orderArr = [], //
      listArr = [], //
      hiddenArr, // Hidden JSAV array used for animation effects
      newLinkNode, // The new node
      llist_head, // head of the list
      connections = [], //
      fromNode, // Remember clicked pointer selected by user for connection
      jsavList, // JSAV list
      listSize, // JSAV list size
      insertPosition, // Position to be inserted
      insertValue, // Value to be inserted
      selected_node; // Remember node that has been selected by user for swap

  var llistInsertPRO = {
    userInput: null, // Boolean: True iff user ever did anything

    // Draw a link onnecting two nodes in "jsav" pane
    connect: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      llistInsertPRO.connection(obj1, obj2, jsav);
      obj1.llist_next = obj2;
      obj1._next = obj2;
      for (var i = 0; i < connections.length; i++) {
        if ((connections[i].from === obj1) && (connections[i].to !== obj2)) {
          connections[i].to = obj2;
          return;
        }
      }
      connections.push({
        from: obj1,
        to: obj2
      });
    },

    // TODO: Move this to DataSructures/LinkedList.js
    // Add an edge from obj1 to obj2 in "jsav" pane
    connection: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var pos1 = $("#" + obj1.id()).position();
      var pos2 = $("#" + obj2.id()).position();
      var fx = pos1.left + 39;
      var tx = pos2.left + 2;
      var fy = pos1.top + 71;
      var ty = pos2.top + 71;
      var fx1 = fx,
          fy1 = fy,
          tx1 = tx,
          ty1 = ty;

      var disx = ((fx - tx - 22) > 0) ? 1 : ((fx - tx - 22) === 0) ? 0 : -1;
      var disy = ((fy - ty) > 0) ? 1 : ((fy - ty) === 0) ? 0 : -1;

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

      var edge = jsav.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                             {"arrow-end": "classic-wide-long", opacity: 100,
                              "stroke-width": 2});
      if (obj1.llist_next) {
        obj1.llist_edgeToNext.element.remove();
      }

      obj1.llist_edgeToNext = edge;
    },

    // Click event handler on a list node
    clickHandler: function(e) {
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if (x > 31 && x < 42 && y > 0 && y < 31) { // We are in the pointer part
        if (selected_node !== null) { // Clear prior node value selection
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
        if (fromNode !== null) { // We are connecting a pointer to this node
          // Note that this allows a node to point to itself
          llistInsertPRO.connect(fromNode, this, av);
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
      llistInsertPRO.userInput = true;
    },

    // Handle "Insert" button click
    insert: function() {
      if (selected_node !== null) { // Only do something if value field selected
        av.effects.copyValue(hiddenArr, 0, selected_node);
        selected_node.removeClass("bgColor");
        selected_node = null;
      }
    },

    // Handle "NewNode" button click
    newnode: function() {
      if (newLinkNode === null) { // Do nothing if new node already exists
        newLinkNode = jsavList.newNode("null");
        // Calculate and set position for the new node
        var leftOffset = (listSize - 1) * 73 / 2;
        var topOffset = 60;
        newLinkNode.css({top: topOffset, left: leftOffset});
        // Set its values
        newLinkNode.llist_next = null;
        newLinkNode.llist_edgeToNext = null;
        answerOrderArr = orderArr.slice(0);
        answerOrderArr.splice(insertPosition + 2, 0, newLinkNode.id());

        $("#" + newLinkNode.id()).draggable({
          start: function() {
            $("#" + newLinkNode.id()).css("cursor", "pointer");
          },
          drag: function() {
            var i;
            for (i = connections.length - 1; i >= 0; i--) {
              llistInsertPRO.connection(connections[i].from, connections[i].to, av);
            }
          },
          stop: function() {
            var i;
            for (i = connections.length - 1; i >= 0; i--) {
              llistInsertPRO.connection(connections[i].from, connections[i].to, av);
            }
          }
        });
        $("#NewNode").disabled = true;
      }
      llistInsertPRO.userInput = true;
    },

    // reset function definition
    reset: function() {
      var i;

      llistInsertPRO.userInput = false;
      newLinkNode = null;
      connections = [];
      selected_node = null;
      fromNode = null;

      // Clear the old JSAV canvas.
      if ($("#LlistInsertPRO")) { $("#LlistInsertPRO").empty(); }

      // Set up the display
      av = new JSAV("LlistInsertPRO");
      jsavList = av.ds.list({nodegap: 30, top: 40, left: 1});
      jsavList.addFirst("null");
      for (i = listSize - 2; i > 0; i--) {
        jsavList.addFirst(listArr[i]);
      }
      jsavList.addFirst("null");
      jsavList.layout();

      llist_head = jsavList.get(0);
      for (i = 0; i < listSize; i++) {
        orderArr[i] = jsavList.get(i).id();
        jsavList.get(i).llist_next = jsavList.get(i).next();
        jsavList.get(i).llist_edgeToNext = jsavList.get(i).edgeToNext();
      }

      av.pointer("curr", jsavList.get(insertPosition + 1));
      hiddenArr = av.ds.array([insertValue],
                              {indexed: false, center: false, left: 350, top: -70});

      av.displayInit();
      av.recorded();
      jsavList.click(llistInsertPRO.clickHandler); // Rebind click handler after reset
      llistInsertPRO.userInput = false;
    },

    // Initialise the exercise
    initJSAV: function(size, pos, value) {
      var i;
      answerArr.length = 0;
      listSize = size;
      insertPosition = pos;
      insertValue = value;

      // Give random numbers in range 0..999
      answerArr[0] = "null";
      for (i = 1; i < size - 1; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      answerArr[size - 1] = "null";
      listArr = answerArr.slice(0);

      llistInsertPRO.reset();

      // correct answer
      answerArr.splice(insertPosition + 1, 0, insertValue);

      // Set up click handlers
      $("#NewNode").click(function() { llistInsertPRO.newnode(); });
      $("#insert").click(function() { llistInsertPRO.insert(); });
      $("#reset").click(function() { llistInsertPRO.reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      var i = 0;
      var curr = llist_head;

      while (curr.llist_next) {
        if ((curr.value() === answerArr[i]) && (curr.id() === answerOrderArr[i])) {
          curr = curr.llist_next;
          i++;
        } else {
          return false;
        }
      }

      return i === listSize;
    }
  };

  window.llistInsertPRO = window.llistInsertPRO || llistInsertPRO;
}());
