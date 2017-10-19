/*
    global JSAV, window
    Written by Jieun Chon and Cliff Shaffer
*/

(function() {
  "use strict";

  var av, // The JSAV object
      nullNode1, // Used to trace the node pointed by a pointer pointing null.
      nullNode2,
      nullNode3,
      johnNode, // Used to trace the node pointed by 'johnRef' pointer.
      samNode, // Used to trace the node pointed by 'samRef' pointer.
      selected_pointer;

  var pointerEX1PRO = {
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
        newnode.llist_pleft.click(pointerEX1PRO.pclick);
        return newnode.llist_pleft;
      } else if (!newnode.llist_pright) {
        newnode.llist_pright = newnode.jsav.pointer(pname, newnode, pointerRight);
        newnode.llist_pright.click(pointerEX1PRO.pclick);
        return newnode.llist_pright;
      }
    },

        // Handler for clicking on a pointer object
    pclick: function(pointer) {
      if (selected_pointer === null) { // No currently selected pointer object
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      } else if (selected_pointer === pointer) { // Re-clicked slected pointer
        selected_pointer.element.removeClass("highlight");
        selected_pointer = null;
      } else { // pointer points another pointer
        pointerEX1PRO.setPointer(selected_pointer.element.text(), pointer, selected_pointer);
        selected_pointer.element.removeClass("highlight");
        selected_pointer = null;
      }
      pointerEX1PRO.userInput = true;
    },

    clickHandler: function(){
      if(selected_pointer !== null){ // currently a pointer object is selected
        if(selected_pointer.target() !== this){ // pointer points another pointer
          pointerEX1PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
        }

          //Remove highlighter and removed from selected_pointer
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }
      pointerEX1PRO.userInput = true;
    },

    makenull: function(){
      if(selected_pointer !== null){
        var target = selected_pointer.target();
        if(target !== nullNode1 && target != nullNode2 && target != nullNode3){ // pointer is not pointing a null.
          if(!nullNode1.llist_pleft){
              pointerEX1PRO.setPointer(selected_pointer.element.text(), nullNode1, selected_pointer);
          } else if (!nullNode2.llist_pleft){
            pointerEX1PRO.setPointer(selected_pointer.element.text(), nullNode2, selected_pointer);
          } else {
            pointerEX1PRO.setPointer(selected_pointer.element.text(), nullNode3, selected_pointer);
          }
        }
          //Remove highlighter and removed from selected_pointer
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }
      pointerEX1PRO.userInput = true;
    },

      // Reinitialize the exercise.
    reset: function() {
      // JSAV-List position.
      var leftMargin = 70,
          topMargin = 150;
      // Reset the value of global variables.
      pointerEX1PRO.userInput = false;
      selected_pointer = null;

      // Clear the old JSAV canvas.
      if ($("#PointerEX1PRO")) { $("#PointerEX1PRO").empty(); }

      // Set up the display
      av = new JSAV("PointerEX1PRO");

      // Given code
      var codes = [];
      codes[0] = "empRef = johnRef;";
      codes[1] = "johnRef = null;";
      av.code(codes);

      // create location values
      var topP = topMargin;
      var nullP = leftMargin;
      var johnP = nullP + 170;
      var samP = johnP + 170;

      // Create nodes
      johnNode = av.ds.array(["John, 1000"], {top: topP, left: johnP});
      samNode = av.ds.array(["Sam, 2000"], {top: topP, left: samP});

      //create null nodes.
      nullNode1 = av.ds.array([""], {top: topP - 40, left: nullP});
      nullNode2 = av.ds.array([""], {top: topP, left: nullP});
      nullNode3 = av.ds.array([""], {top: topP + 40, left: nullP});
      nullNode1.addClass([0], "nullBox"); //remove null node's boarder
      nullNode2.addClass([0], "nullBox"); //remove null node's boarder
      nullNode3.addClass([0], "nullBox"); //remove null node's boarder

      // Create pointers
      pointerEX1PRO.setPointer("empRef", nullNode1);
      pointerEX1PRO.setPointer("johnRef", johnNode);
      pointerEX1PRO.setPointer("samRef", samNode);

      av.displayInit();
      av.recorded();

      // Set up the click handlers for each nodes
      johnNode.click(pointerEX1PRO.clickHandler);
      samNode.click(pointerEX1PRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function() {
      pointerEX1PRO.reset();

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX1PRO.reset();
      });

      // Set up handler for makenull button
      $("#makenull").click(function() {
        pointerEX1PRO.makenull();
      });

    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if(nullNode1.llist_pleft.element.text() !== "johnRef"){
        return false;
      } else if(johnNode.llist_pright.element.text() !== "empRef"){
        return false;
      } else if (samNode.llist_pleft.element.text() != "samRef"){
        return false;
      }
      return true;
    },
  };

  window.pointerEX1PRO = window.pointerEX1PRO || pointerEX1PRO;
}());
