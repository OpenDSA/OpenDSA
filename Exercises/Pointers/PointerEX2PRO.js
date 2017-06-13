/*global JSAV, window */
(function() {
  "use strict";

  var av, // The JSAV object
      nullNode, // Used to trace the node pointed by 'empRef' pointer.
      johnNode, // Used to trace the node pointed by 'johnRef' pointer.
      samNode, // Used to trace the node pointed by 'samRef' pointer.
      empRef,
      johnRef,
      samRef,
      selected_pointer, // Remember pointer object that has been selected by user for swap
      selected_node; // Remember node that has been selected by user for swap

  var pointerEX2PRO = {
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
                          left: -5, top: -20};

      //Create Left Pointer
      var pointerLeft = {visible: true, anchor: "left top",
                         myAnchor: "right bottom",
                         left: 15, top: -20};

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
        newnode.llist_pleft.click(pointerEX2PRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(pointerEX2PRO.pclick);
        return newnode.llist_pright;
      }
    },

        // Handler for clicking on a pointer object
    pclick: function(pointer) {
      if (selected_pointer === null) { // No currently selected pointer object
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

      if(selected_node !== null){
        selected_node = null;
        selected_node.removeClass([0], "highlightbox");
      }
      pointerEX2PRO.userInput = true;
    },

    clickHandler: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() !== this){
          pointerEX2PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
        }
          selected_pointer.removeClass("highlightpointer");
          selected_pointer = null;
      } else {
        if(selected_node !== null){
          selected_node.removeClass([0], "highlightbox");
          if(selected_node !== this){
            selected_node = this;
            selected_node.addClass([0], "highlightbox");
          } else {
            selected_node = null;
          }
        } else {
          selected_node = this;
          selected_node.addClass([0], "highlightbox");
        }
      }

      pointerEX2PRO.userInput = true;
    },

    setSalaryClickHandler: function(){
      johnNode.value(0, "John, 4000");
      pointerEX2PRO.userInput = true;
    },


      // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 70,
          topMargin = 150;
      // Reset the value of global variables.
      pointerEX2PRO.userInput = false;
      selected_pointer = null;
      selected_node = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX2PRO")) { $("#PointerEX2PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX2PRO");
      var codes = [];
      codes[0] = "third = first;";
      codes[1] = "third.setSalary(3000);";
      av.code(codes);

      var width = 60;

      var topP = topMargin;
      var johnP = leftMargin;
      var samP = johnP + 170;
      var nullP = samP + 170;

      // Create nodes
      nullNode = av.ds.array([""], {top: topP, left: nullP});
      johnNode = av.ds.array(["John, 1000"], {top: topP, left: johnP});
      samNode = av.ds.array(["Sam, 2000"], {top: topP, left: samP});
      nullNode.addClass([0], "nullBox"); //remove null node's boarder
      // johnNode.value(0, "John, 3000");

      // Create pointers
      johnRef = pointerEX2PRO.setPointer("first", johnNode);
      samRef = pointerEX2PRO.setPointer("second", samNode);
      empRef = pointerEX2PRO.setPointer("third", nullNode);

      av.displayInit();
      av.recorded();

      johnNode.click(pointerEX2PRO.clickHandler);
      samNode.click(pointerEX2PRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function() {
      pointerEX2PRO.reset();

      $("#setSalary").click(function() {
        pointerEX2PRO.setSalaryClickHandler();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX2PRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if(nullNode.llist_pleft != null ^ nullNode.llist_pright != null){
        if(nullNode.llist_pleft != null){
            if(nullNode.llist_pleft.element.text() != "johnRef"){
              return false;
            }
          } else {
            if(nullNode.llist_pright.element.text() != "johnRef"){
              return false;
            }
          }
        } else {
          return false;
        }

        if(johnNode.llist_pleft != null ^ johnNode.llist_pright != null){
          if(johnNode.llist_pleft != null){
              if(johnNode.llist_pleft.element.text() != "empRef"){
                return false;
              }
            } else {
              if(johnNode.llist_pright.element.text() != "empRef"){
                return false;
              }
            }
          } else {
            return false;
          }

          if(samNode.llist_pleft != null ^ samNode.llist_pright != null){
            if(samNode.llist_pleft != null){
                if(samNode.llist_pleft.element.text() != "samRef"){
                  return false;
                }
              } else {
                if(samNode.llist_pright.element.text() != "samRef"){
                  return false;
                }
              }
            } else {
              return false;
            }
        return true;
    },
  };

  window.pointerEX2PRO = window.pointerEX2PRO || pointerEX2PRO;
}());
