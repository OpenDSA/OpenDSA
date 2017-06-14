/*global JSAV, window */
(function() {
  "use strict";

  var av, // The JSAV object
      nullNode, // Used to trace the node pointed by 'empRef' pointer.
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
      } else { // Reselecting a new pointer
        selected_pointer.element.removeClass("highlight");
        selected_pointer = pointer;
        selected_pointer.element.addClass("highlight");
      }
      pointerEX1PRO.userInput = true;
    },

    clickHandler: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() !== this){
          pointerEX1PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
        }
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }

      pointerEX1PRO.userInput = true;
    },

    makenull: function(){
      if(selected_pointer !== null){
        if(selected_pointer.target() !== nullNode){
          pointerEX1PRO.setPointer(selected_pointer.element.text(), nullNode, selected_pointer);
        }
          selected_pointer.removeClass("highlight");
          selected_pointer = null;
      }
      pointerEX1PRO.userInput = true;
    },

    labelClickHandler: function(){
      if(selected_pointer !== null){
        if(this.hasClass("samLabel")){
          if(selected_pointer.target() !== samNode){
            pointerEX1PRO.setPointer(selected_pointer.element.text(), samNode, selected_pointer);
          }
        } else if(this.hasClass("johnLabel")){
          if(selected_pointer.target() !== johnNode){
            pointerEX1PRO.setPointer(selected_pointer.element.text(), johnNode, selected_pointer);
          }
        }
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
      var codes = [];
      codes[0] = "empRef = johnRef;";
      codes[1] = "johnRef = null;";
      av.code(codes);

      var width = 60;

      var topP = topMargin;
      var nullP = leftMargin;
      var johnP = nullP + 170;
      var samP = johnP + 170;

      // Create nodes
      nullNode = av.ds.array([""], {top: topP, left: nullP});
      johnNode = av.ds.array(["John, 1000"], {top: topP, left: johnP});
      samNode = av.ds.array(["Sam, 2000"], {top: topP, left: samP});
      nullNode.addClass([0], "nullBox"); //remove null node's boarder

      // Create pointers
      pointerEX1PRO.setPointer("empRef", nullNode);
      pointerEX1PRO.setPointer("johnRef", johnNode);
      pointerEX1PRO.setPointer("samRef", samNode);

      av.displayInit();
      av.recorded();

      johnNode.click(pointerEX1PRO.clickHandler);
      samNode.click(pointerEX1PRO.clickHandler);
    },

    // Initialise the exercise
    initJSAV: function() {
      pointerEX1PRO.reset();

      $("#makenull").click(function() {
        pointerEX1PRO.makenull();
      });

      // Set up handler for reset button
      $("#reset").click(function() {
        pointerEX1PRO.reset();
      });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if(nullNode.llist_pleft.element.text() !== "johnRef"){
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
