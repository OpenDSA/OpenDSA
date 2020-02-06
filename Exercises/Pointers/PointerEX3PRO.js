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
      empNode, // A Employee, empNode.
      topP, // Top location
      leftP, //Left Location
      link1, // First created Link
      link2, // Second created Link
      pAnswer, // Answer Mode to check the employee pointer was created correctly
      lAnswer, // Answer Mode to check the link pointer was created correctly
      connections,
      fromNode,
      selected_pointer, // Remember pointer object that has been selected by user
      selected_node; // Remember node that has been selected by user

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
        selected_pointer.element.addClass("bgColor");
      } else if (selected_pointer === pointer) { // Re-clicked slected pointer
        selected_pointer.element.removeClass("bgColor");
        selected_pointer = null;
      } else { // Reselecting a new pointer
        selected_pointer.element.removeClass("bgColor");
        selected_pointer = pointer;
        selected_pointer.element.addClass("bgColor");
      }
      pointerEX3PRO.userInput = true;
    },

    clickHandler: function(e){
      //When the cursor clicked point area.
      var x = parseInt(e.pageX - $("#" + this.id()).offset().left, 10);
      var y = parseInt(e.pageY - $("#" + this.id()).offset().top, 10);
      if (x > 60 && x < 92 && y > 0 && y < 41) { // We are in the pointer part
        if (selected_node !== null) { // Clear prior node value selection
          selected_node.unhighlight();
          selected_node = null;
        }

        if (selected_pointer !== null){
          selected_pointer.element.removeClass("bgColor");
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
      } else {
        //A link node or emp node is clicked
        if (fromNode !== null){ //if pointer area was clicked
          pointerEX3PRO.connection(fromNode.container, this.container, av);
          if(fromNode.container === link1 && fromNode !== this){
            lAnswer = lAnswer === 0 ? 1 : lAnswer;
          } else if(fromNode.container === link2 && fromNode !== this){
            lAnswer = 2;
          }
          // window.alert("lAnswer: " + lAnswer);
          $("#" + fromNode.id() + " .jsavpointerarea:first").removeClass("bgColor");
          $("#" + this.id()).removeClass("bgColor");
          fromNode = null;
        } else if(selected_pointer !== null){
          if(selected_pointer.target() !== this){
            pointerEX3PRO.setPointer(selected_pointer.element.text(), this, selected_pointer);
          }
            selected_pointer.removeClass("bgColor");
            selected_pointer = null;
        } else {
          if(selected_node !== null){
            selected_node.unhighlight();
            if(selected_node !== this){
              if(this === empNode){
                //draw pointer
                pointerEX3PRO.connection_line(selected_node, this, av);
                selected_node = null;
              }
            } else {
              selected_node = null;
            }
          } else {
            selected_node = this;
            selected_node.highlight();
          }
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
      empNode = av.ds.array([newEmp], {top: topP + 105, left: leftP});
      empNode.click(pointerEX3PRO.clickHandler);
      pointerEX3PRO.userInput = true;
    },

    connection_line: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var pos = obj1.container.position();
      var emppos = $("#" + obj2.id()).position();
      var nx = pos.left + 35; // node X
      var ny = pos.top + 55; // node Y
      var ex = emppos.left + 45; // employee node Y, arrow's end
      var ey = emppos.top + 20; // employee node  X, arrow's end

      if(selected_node === link1.get(0)){
        if(pAnswer === 0){
          pAnswer = 1;
        }
      } else {
        pAnswer = 2;
      }
      jsav.g.line(nx, ny, ex, ey, {"stroke-width": 2, "arrow-end": "classic-wide-long"});
    },

    connection: function(obj1, obj2, jsav) {
      if (obj1 === obj2) { return; }
      var pos1 = $("#" + obj1.id()).position();
      var pos2 = $("#" + obj2.id()).position();

      var fx = pos1.left + 72;
      var tx = pos2.left + 2;
      var fy = pos1.top + 20;
      var ty = pos2.top + 30;
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

      jsav.g.path(["M", fx, fy, "C", fx1, fy1, tx1, ty1, tx, ty].join(","),
                             {"arrow-end": "classic-wide-long", opacity: 100,
                              "stroke-width": 2});
    },


      // Reinitialize the exercise.
    reset: function() {
      // JSAV position.
      var leftMargin = 70,
          topMargin = 150;

      pAnswer = 0;
      lAnswer = 0;

      // Reset the value of global variables.
      pointerEX3PRO.userInput = false;
      selected_pointer = null;
      selected_node = null;
      fromNode = null;
      connections = [];

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

      var n = av.ds.array([""], {top: topP + 120, left: nullP});
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
      if(link1.get(0).llist_pleft.element.text() !== "first"){
        return false;
      } else if (pAnswer !== 1 || lAnswer !== 1){
        return false;
      } else {
        var temp = empNode.value(0);
        temp = temp.replace(/\s+/g, '');
        temp = temp.toLowerCase();
        if (temp !== "john,1000") {
          return false;
        }
      }
      return true;
    },
  };

  window.pointerEX3PRO = window.pointerEX3PRO || pointerEX3PRO;
}());
