/*global JSAV, window */
(function() {
  "use strict";
  var av,                   // The JSAV object
      answerArr = [],       // The (internal) array that stores the correct answer
      answerOrderArr = [],  // The (internal) array that stores the correct order of nodes
      orderArr = [],        // Stores the node.id() of the jsavList
      listArr = [],         // Stores the jsav list values
      hiddenArr,            // Invisible JSAV array used for animation effects
      ptop,                 // The "top" pointer
      selected_pointer,     // remember pointer when clicked
      status = 0,           // Nothing is currently selected, status = 0;
                            // pointer area is selected, status = 2;
                            // pointer top is selected, status = 3.
      newNodeGen,           //
      newLinkNode,          // New node
      odsa_head,            // head of the list for correct answer
      connections = [],     //
      fromNode,             //
      toNode,               //
      jsavList,             // JSAV list
      listSize,             // JSAV list size
      insertValue,          // Value to be inserted
      selected_node;        // Position that has been selected by user for swap

  var lstackPushPRO = {
    userInput: null,            // Boolean: Tells us if user ever did anything

    // pointer click handler
    pclick: function(pointer) {
      selected_pointer = pointer;
      selected_pointer.element.toggleClass("highlight");
      status = 3;
      lstackPushPRO.userInput = true;
    },

    // Add an edge from obj1 to obj2
    connection: function(obj1, obj2) {
      if (obj1 === obj2) { return; }
      var fx = $("#" + obj1.id()).position().left + 37 + 2;
      var tx = $("#" + obj2.id()).position().left  + 2;
      var fy = $("#" + obj1.id()).position().top + 15 + 1 + 40;
      var ty = $("#" + obj2.id()).position().top + 15 + 1 + 40;
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
      lstackPushPRO.connection(obj1, obj2);
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

    // Click event handler on the list
    clickHandler: function(e) {
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if ((x > 31) && (x < 42) && (y > 0) && (y < 31)) { // Clicked in pointer field
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
        }
      } else {
        if (status === 2) {
          toNode = this;
          lstackPushPRO.connect(fromNode, toNode);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + toNode.id()).removeClass("bgColor");
          fromNode = null;
          toNode = null;
          status = 0;
        } else if (status === 3) {
          selected_pointer.target(this);
          av.container.trigger("jsav-updaterelative");
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
          status = 0;
        }
        lstackPushPRO.userInput = true;
      }
    },

    addTail: function(node) {
      if (node.odsa_tail) {
        node.odsa_tail.element.remove();

        var fx = $("#" + node.id()).position().left + 34;
        var tx = $("#" + node.id()).position().left + 44;
        var fy = $("#" + node.id()).position().top + 47 + 40;
        var ty = $("#" + node.id()).position().top + 16 + 40;
        node.odsa_tail = av.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      }
    },

    newnode: function() {
      var i;
      if (newNodeGen === false) {
        if (status === 2) {
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        } else if (status === 3) {
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
        }
        status = 0;
        newLinkNode = jsavList.newNode("null");

        // Calculate the position for the new node
        var leftOffset = (listSize - 1) * 73 / 2;
        var topOffset = 60;

        // Set the position for the new node
        newLinkNode.css({top: topOffset, left: leftOffset});

        newLinkNode.odsa_next = null;
        newLinkNode.odsa_edgeToNext = null;
        answerOrderArr = orderArr.slice(0);
        answerOrderArr.splice(0, 0, newLinkNode.id());

        var x1 = leftOffset + 34;
        var y1 = topOffset + 46 + 40;
        var x2 = leftOffset + 45;
        var y2 = topOffset + 16 + 40;

        newLinkNode.odsa_tail = av.g.line(x1, y1, x2, y2, {opacity: 100, "stroke-width": 1});

        $("#" + newLinkNode.id()).draggable({
          start: function() {
            $("#" + newLinkNode.id()).css("cursor", "pointer");
            if (status === 2) {
              $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
              fromNode = null;
            } else if (status === 1) {
              selected_node.removeClass("bgColor");
              selected_node = null;
            }
            status = 0;
          },
          drag: function() {
            for (i = connections.length; i--; ) {
              lstackPushPRO.connection(connections[i].from, connections[i].to);
            }
            lstackPushPRO.addTail(newLinkNode);
          },
          stop: function() {
            for (i = connections.length; i--; ) {
              lstackPushPRO.connection(connections[i].from, connections[i].to);
            }
            lstackPushPRO.addTail(newLinkNode);
            av.container.trigger("jsav-updaterelative");
          }
        });
        $("#NewNode").disabled = true;
        odsa_head = newLinkNode;
        newNodeGen = true;
      } else { return; }
      lstackPushPRO.userInput = true;
    },

    // Initialise the exercise
    initJSAV: function(size, value) {
      var i;

      answerArr.length = 0;
      listSize = size;
      insertValue = value;

      // Give random numbers in range 0..999
      for (i = 0; i < size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      listArr = answerArr.slice(0);

      // correct answer
      answerArr.splice(0, 0, insertValue);

      reset();

      // Set up button handlers
      $("#NewNode").click(function() { lstackPushPRO.newnode(); });
      $("#insert").click(function() { insert(); });
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      var i = 0,
          curr = odsa_head;

      if (ptop.target() !== odsa_head) { return false; }
      while (curr.odsa_next) {
        if ((curr.value() === answerArr[i]) && (curr.id() === answerOrderArr[i])) {
          curr = curr.odsa_next;
          i++;
        } else {
          return false;
        }
      }
      if (i !== listSize) { return false; }
      return true;
    }
  };

  // Handle insert button
  function insert() {
    if (newLinkNode) {
      av.effects.copyValue(hiddenArr, 0, newLinkNode);
      newLinkNode.unhighlight();
      status = 0;
    }
  }

  // Handle reset button
  function reset() {
    var i;
    newNodeGen = false;
    connections = [];
    selected_node = null;
    status = 0;

    // Clear the old JSAV canvas.
    if ($("#LstackPushPRO")) { $("#LstackPushPRO").empty(); }

    // Set up the display
    av = new JSAV("LstackPushPRO");
    jsavList = av.ds.list({nodegap: 30, top: 40, left: 0});
    for (i = listSize - 1; i >= 0; i--) {
      jsavList.addFirst(listArr[i]);
    }
    jsavList.layout();

    for (i = 0; i < listSize; i++) {
      orderArr[i] = jsavList.get(i).id();
      jsavList.get(i).odsa_next = jsavList.get(i).next();
      jsavList.get(i).odsa_edgeToNext = jsavList.get(i).edgeToNext();
    }
    // Manually add a tail for the last node
    jsavList.get(listSize - 1).odsa_tail = av.g.line(34 + (listSize - 1) * 74, 47 + 40,
                                                     44 + (listSize - 1) * 74, 16 + 40,
                                                     {opacity: 100, "stroke-width": 1});
    // 'top' pointer
    ptop = av.pointer("top", jsavList.get(0), {fixed: true});
    ptop.click(lstackPushPRO.pclick);

    // Hidden JSAV array for insert animation effect
    hiddenArr = av.ds.array([insertValue], {indexed: false, center: false,
                                            left: 350, top: -70});
    av.displayInit();
    av.recorded();

    jsavList.click(lstackPushPRO.clickHandler);
    lstackPushPRO.userInput = false;
  }

  window.lstackPushPRO = window.lstackPushPRO || lstackPushPRO;
}());
