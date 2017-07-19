/*global window */
(function() {
  "use strict";
  var av, // The JSAV object
      newLinkNode, // The new node
      connections = [], //
      topP,
      leftP,
      fromNode, // Remember clicked pointer selected by user for connection
      jsavList, // JSAV list
      listSize, // JSAV list size
      empNode,
      selected_node; // Remember node that has been selected by user for swap


  var pointerEX4PRO = {
    userInput: null, // Boolean: True iff user ever did anything

    // Draw a link connecting two nodes in "jsav" pane
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
      connections.push({
        from: obj1,
        to: obj2
      });
    },

    connection: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var pos1 = $("#" + obj1.id()).position();
      var pos2 = $("#" + obj2.id()).position();
      var fx = pos1.left + 39 + leftP + 50;
      var tx = pos2.left + 2 + leftP + 50;
      var fy = pos1.top + topP + 30;

      var edge = av.g.line(fx, fy, tx, fy, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

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


    // Handle "NewNode" button click
    newnode: function() {
      if(listSize == 0){
        jsavList.addFirst("");
        jsavList.layout();
        listSize += 1;
      } else if (newLinkNode === null) { // Do nothing if new node already exists
        newLinkNode = jsavList.newNode("");
        // Calculate and set position for the new node
        var leftOffset = (listSize - 1) * 73 + 130;
        var topOffset = 0;
        newLinkNode.css({top: topOffset, left: leftOffset});
        // Set its values
        newLinkNode.llist_next = null;
        newLinkNode.llist_edgeToNext = null;

        $("#" + newLinkNode.id()).draggable({
          start: function() {
            $("#" + newLinkNode.id()).css("cursor", "pointer");
          },
          drag: function() {
            var i;
            for (i = connections.length - 1; i >= 0; i--) {
              pointerEX4PRO.connection(connections[i].from, connections[i].to, av);
            }
          },
          stop: function() {
            var i;
            for (i = connections.length - 1; i >= 0; i--) {
              pointerEX4PRO.connection(connections[i].from, connections[i].to, av);
            }
          }
        });
        $("#NewNode").disabled = true;
      }
      pointerEX4PRO.userInput = true;
    },

    newEmployee: function(){
      // create employee node
      var newEmp = prompt("Please enter the name and the salary, separated by comma(,)", "Sam, 2000");
      empNode = av.ds.array([newEmp], {top: topP + 90, left: leftP + 50});
      // empNode.addClass([0], "empNode");
      empNode.click(pointerEX4PRO.clickHandler);
      pointerEX4PRO.userInput = true;
    },

    // reset function definition
    reset: function() {
      listSize = 0;

      pointerEX4PRO.userInput = false;
      newLinkNode = null;
      connections = [];
      selected_node = null;
      fromNode = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX4PRO")) { $("#PointerEX4PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX4PRO");

      var codes = [];
      codes[0] = "first = new Link(null, null);";
      codes[1] = "first.value = new Employee(John, 1000);";
      codes[2] = "first.next = new Link(null, null);";
      codes[3] = "---- testing 1";
      av.code(codes);

      topP = 140;
      leftP = 70;

      // Create nodes
      var nullNode = av.ds.array([""], {top: topP, left: leftP});
      nullNode.addClass([0], "nullBox"); //remove null node's boarder

      var n = av.ds.array([""], {top: topP + 100, left: leftP});
      n.addClass([0], "nullBox"); //remove null node's boarder

      // Create pointers
      // pointerEX4PRO.setPointer("first", nullNode);

      jsavList = av.ds.list({nodegap: 50, top: topP, left: leftP + 50});

      av.displayInit();
      av.recorded();
      jsavList.click(pointerEX4PRO.clickHandler); // Rebind click handler after reset
      pointerEX4PRO.userInput = false;
    },

    // Initialise the exercise
    initJSAV: function() {
      pointerEX4PRO.reset();

      // Set up click handlers
      $("#NewNode").click(function() { pointerEX4PRO.newnode(); });
      $("#reset").click(function() { pointerEX4PRO.reset(); });
      $("#newEmployee").click(function() {
        pointerEX4PRO.newEmployee();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return true;
    }
  };

  window.pointerEX4PRO = window.pointerEX4PRO || pointerEX4PRO;
}());
