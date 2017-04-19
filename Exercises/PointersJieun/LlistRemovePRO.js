/*global JSAV, window */
(function() {
  "use strict";

  var av, // The JSAV object
      llist_head, // Stores the head node of the list
      listSize, // JSAV list size
      // listArr = [], // Initial node elements' values for the JSAV list.
      jsavList, // JSAV list
      connections = [], // Stores the node-pairs of the JSAV-List arrows.
      fromNode, // Stores the node whose pointer area is clicked.
      nullNode, // Used to trace the node pointed by 'head' pointer.
      johnNode, // Used to trace the node pointed by 'curr' pointer.
      samNode, // Used to trace the node pointed by 'tail' pointer.
      currPosition, // Index of 'curr' node, starting counting from the next node of head
      selected_pointer, // Remember pointer object that has been selected by user for swap
      selected_node; // Remember node that has been selected by user for swap

  var llistRemovePRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Helper function for setting pointer
    setPointer: function(pname, newnode, oldpointer) {
      if (oldpointer) {
        if (newnode === oldpointer.target()) { return null; }
      }
      if (newnode.llist_pleft && newnode.llist_pright) { return null; }
      var pointerRight = {visible: true, anchor: "right top",
                          myAnchor: "left bottom",
                          left: -5, top: -20};
      var pointerLeft = {visible: true, anchor: "left top",
                         myAnchor: "right bottom",
                         left: 15, top: -20};
      if (oldpointer) {
        if (oldpointer.target().llist_pleft === oldpointer) {
          oldpointer.target().llist_pleft = null;
        } else if (oldpointer.target().llist_pright === oldpointer) {
          oldpointer.target().llist_pright = null;
        }
        // Remove the old pointer
        oldpointer.element.remove();
        oldpointer.arrow.element.remove();
      }

      if (!newnode.llist_pleft) {
        newnode.llist_pleft = newnode.jsav.pointer(pname, newnode, pointerLeft);
        newnode.llist_pleft.click(llistRemovePRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(llistRemovePRO.pclick);
        return newnode.llist_pright;
      }
    },

    setNullPointer: function(pname, newnode, oldpointer) {
      var nullPointer = {visible: false, anchor: "right top",
                          myAnchor: "left bottom",
                          left: -5, top: -20};

      if (oldpointer) {
        if (oldpointer.target().llist_pleft === oldpointer) {
          oldpointer.target().llist_pleft = null;
        } else if (oldpointer.target().llist_pright === oldpointer) {
          oldpointer.target().llist_pright = null;
        }
        // Remove the old pointer
        oldpointer.element.remove();
        oldpointer.arrow.element.remove();
      }

      if (!newnode.llist_pleft) {
        newnode.llist_pleft = newnode.jsav.pointer(pname, newnode, pointerLeft);
        newnode.llist_pleft.click(llistRemovePRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(llistRemovePRO.pclick);
        return newnode.llist_pright;
      }
    },

      // Handler for clicking on a pointer object
    pclick: function(pointer) {
      if (selected_pointer === null) { // No currently selected pointer object
        if (selected_node !== null) { // Release previously selected node value
          selected_node.removeClass("bgColor");
          selected_node = null;
        }
        if (fromNode !== null) { // Release previously selected pointer field
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          fromNode = null;
        }
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      } else if (selected_pointer === pointer) { // Re-clicked slected pointer
        selected_pointer.element.removeClass("highlight");
      } else { // Reselecting a new pointer
        selected_pointer.element.removeClass("highlight");
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      }
      llistRemovePRO.userInput = true;
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
        if (selected_pointer !== null) {
          selected_pointer.element.removeClass("highlight");
          selected_pointer = null;
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
          llistRemovePRO.connect(fromNode, this, av);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id()).removeClass("bgColor");
          fromNode = null;
        } else if (selected_pointer !== null) { // We are setting a pointer object to this node
          var oldPointer = selected_pointer;
          oldPointer.element.removeClass("highlight");
          if (oldPointer.target() !== this) {
            selected_pointer = llistRemovePRO.setPointer(selected_pointer.element.text(), this, oldPointer);
            if (selected_pointer && selected_pointer.element.text() === "empRef") {
              nullNode = selected_pointer.target();
            } else if (selected_pointer && selected_pointer.element.text() === "empRef") {
              johnNode = selected_pointer.target();
            } else if (selected_pointer && selected_pointer.element.text() === "tail") {
              samNode = selected_pointer.target();
            }
          }
          selected_pointer = null;
        } else if (selected_node === null) { // Hightlight it for next action
          this.addClass("bgColor");
          selected_node = this;
        } else { // Second value clicked, so will swap values
          this.value(selected_node.value());
          selected_node.removeClass("bgColor");
          av.effects.copyValue(selected_node, this);
          selected_node = null;
        }
      llistRemovePRO.userInput = true;
    },


    // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 36,
          topMargin = 50;
      var i;
      // Reset the value of global variables.
      llistRemovePRO.userInput = false;
      connections = [];
      selected_node = null;
      selected_pointer = null;
      fromNode = null;

      // Clear the old JSAV canvas.
      if ($("#LlistRemovePRO")) { $("#LlistRemovePRO").empty(); }

      // Set up the display
      av = new JSAV("LlistRemovePRO");
      jsavList = av.ds.list({nodegap: 100, top: topMargin, left: leftMargin});
      jsavList.addFirst("Sam [2000]");
      jsavList.addFirst("John [1000]");
      jsavList.addFirst("null");

      jsavList.layout();

      // Create pointers
      llistRemovePRO.setPointer("empRef", jsavList.get(0));
      llistRemovePRO.setPointer("johnRef", jsavList.get(1));
      llistRemovePRO.setPointer("samRef", jsavList.get(2));

      llist_head = jsavList.get(0);
      nullNode = jsavList.get(0);
      johnNode = jsavList.get(1);
      samNode = jsavList.get(2);

      av.displayInit();
      av.recorded();

      jsavList.click(llistRemovePRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function(size, pos) {
      var i;
      // Out with the old
      // answerArr.length = 0;
      listSize = size;
      currPosition = pos;

      llistRemovePRO.reset();

      $("#makenull").click(function() {
        llistRemovePRO.nullClickHandler();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        llistRemovePRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return true;
    }

  };

  window.llistRemovePRO = window.llistRemovePRO || llistRemovePRO;
}());
