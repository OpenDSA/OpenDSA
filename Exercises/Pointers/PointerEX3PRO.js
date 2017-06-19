/*
    global JSAV, window
    Written by Jieun Chon and Cliff Shaffer
*/


//TODO: Complete Click Handlers
// 1. getting the position of link1 and 2, left and top
// 2. calculate the point area, so when people click the area,
// link to the other link, or cancel if click other.

(function() {
  "use strict";

  var av, // The JSAV object
      nullNode, //Null node for the first pointer
      johnNode, // A Employee, johnNode.
      topP, // Top location
      leftP, //Left Location
      link1, // First created Link
      link2, // Second created Link
      selected_pointer, // Remember pointer object that has been selected by user for swap
      selected_node; // Remember node that has been selected by user for swap

  var pointerEX3PRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // Helper function for setting pointer
    setPointer: function(pname, newnode, oldpointer) {
      // Click the node that the pointer is already pointing
      if (oldpointer) {
        if (newnode === oldpointer.target()) { return null; }
      }

      // Two pointers are already pointing the node
      if (newnode.llist_pleft && newnode.llist_pright) { return null; }

      //Create Right Pointer
      var pointerRight = {visible: true, anchor: "right top",
                          myAnchor: "left bottom",
                          left: -10, top: -20};

      //Create Left Pointer
      var pointerLeft = {visible: true, anchor: "left top",
                         myAnchor: "right bottom",
                         left: 30, top: -20};

      //Remove old pointer and copy it to create again
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

      // If nothing is pointhing (left pointer is empty), insert left poitner.
      // Otherwise, insert right pointer
      // (when there is already left pointer for the node)
      if (!newnode.llist_pleft) {
        newnode.llist_pleft = newnode.jsav.pointer(pname, newnode, pointerLeft);
        newnode.llist_pleft.click(pointerEX3PRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(pointerEX3PRO.pclick);
        return newnode.llist_pright;
      }
    },

        // Handler for clicking on a pointer object
    pclick: function(pointer) {
      if (selected_pointer === null) { // No currently selected pointer object
        if(selected_node !== null){
          selected_node.unhighlight();
          selected_node = null;
        }
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlightpointer");
      } else if (selected_pointer === pointer) { // Re-clicked slected pointer
        selected_pointer.element.removeClass("highlightpointer");
        selected_pointer = null;
      } else { // Reselecting a new pointer
        selected_pointer.element.removeClass("highlightpointer");
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlightpointer");
      }
      pointerEX3PRO.userInput = true;
    },

    clickHandler: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() !== this){
          pointerEX3PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
        }
          selected_pointer.removeClass("highlightpointer");
          selected_pointer = null;
      } else {
        if(selected_node !== null){
          selected_node.unhighlight();
          if(selected_node !== this){
            if(this === johnNode){
              //draw arrow
              var pos = $("#" + selected_node.id()).position();
              var top = pos.top;
              var left = pos.left;
              av.g.line(left + 45, top + 45, leftP + 45, topP + 110, {"stroke-width": 2, "arrow-end": "classic-wide-long"});

              selected_node = null;
            } else {
              selected_node = this;
              selected_node.highlight();
            }
          } else {
            selected_node = null;
          }
        } else {
          selected_node = this;
          selected_node.highlight();
        }
      }

      pointerEX3PRO.userInput = true;
    },

    newLink: function(){
      if(link1.size() === 0){
        link1.addLast("");
        link1.layout();
        link1.click(pointerEX3PRO.clickHandler);
      } else if (link2.size() === 0){
        link2.addLast("");
        link2.layout();
        link2.click(pointerEX3PRO.clickHandler);
      }
      pointerEX3PRO.userInput = true;
    },

    newEmployee: function(){
      // create employee node
      var newEmp = prompt("Please enter the name and the salary, separated by comma(,)", "Sam, 2000");
      johnNode = av.ds.array([newEmp], {top: topP + 90, left: leftP});
      johnNode.addClass([0], "johnNode");
      johnNode.click(pointerEX3PRO.clickHandler);
      pointerEX3PRO.userInput = true;
    },


      // Reinitialize the exercise.
    reset: function() {
      // JSAV position.
      var leftMargin = 70,
          topMargin = 150;

      // Reset the value of global variables.
      pointerEX3PRO.userInput = false;
      selected_pointer = null;
      selected_node = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX3PRO")) { $("#PointerEX3PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX3PRO");
      var codes = [];
      codes[0] = "first = new Link(null, null);";
      codes[1] = "first.value = new Employee(John, 1000);";
      codes[2] = "first.next = new Link(null, null);";
      av.code(codes);


      var nullP = leftMargin;
      topP = topMargin;
      leftP = nullP + 100;

      // Create nodes
      nullNode = av.ds.array([""], {top: topP, left: nullP});
      nullNode.addClass([0], "nullBox"); //remove null node's boarder

      var n = av.ds.array([""], {top: topP + 100, left: nullP});
      n.addClass([0], "nullBox"); //remove null node's boarder

      // Create pointers
      pointerEX3PRO.setPointer("first", nullNode);

      //create list
      link1 = av.ds.list({nodegap: 30, top: topP, left: leftP});
      link2 = av.ds.list({nodegap: 30, top: topP, left: leftP + 150});

      av.displayInit();
      av.recorded();
    },

    // Initialise the exercise
    initJSAV: function() {
      pointerEX3PRO.reset();

      $("#newLink").click(function() {
        pointerEX3PRO.newLink();
      });

      $("#newEmployee").click(function() {
        pointerEX3PRO.newEmployee();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX3PRO.reset();
      });

    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      return true;
    },
  };

  window.pointerEX3PRO = window.pointerEX3PRO || pointerEX3PRO;
}());
