/*global JSAV, window */
(function() {
  "use strict";
  var av, // The JSAV object
      answFrontPos,
      answRearPos,
      answCopyFrom,
      copyFrom,
      arrReturn,
      cloneArr = [], // Copy of (internal) array at start of the exercise for reset
      jsavCir, // The array that the user manipulates (JSAV object)
      selected_pointer,
      front_pointer,
      front_index,
      rear_pointer,
      rear_index,
      Xstatus,
      selected_index; // Position that has been selected by user for swap

  var aqueueDequeuePRO = {
    userInput: null, // Boolean: Tells us if user ever did anything

    // pointer click handler
    pclick: function(pointer) {
      if (Xstatus === 1) { // Highlight the queue cell
        jsavCir.path[selected_index].rObj.attr({fill: "none", opacity: 1});
        pointer.label.element.toggleClass("highlight");
        selected_pointer = pointer;
        Xstatus = 2;
      } else if (Xstatus === 2) {
        if (selected_pointer !== pointer) {
          selected_pointer.label.element.removeClass("highlight");
          pointer.label.element.addClass("highlight");
          selected_pointer = pointer;
        } else { // Reclicked cell, so unhighlight
          pointer.label.element.removeClass("highlight");
          Xstatus = 0;
        }
      } else if (Xstatus === 0) {
        pointer.label.element.addClass("highlight");
        selected_pointer = pointer;
        Xstatus = 2;
      }
      aqueueDequeuePRO.userInput = true;
    },

    bindPointerClick: function(pointer) {
      pointer.label.element.click(function() {
        aqueueDequeuePRO.pclick(pointer);
      });
    },

    resetPointer: function(pointer, index, type) {
      var not_select_pointer = null;
      if (pointer === front_pointer) {
        front_index = index;
        not_select_pointer = rear_pointer;
      } else if (pointer === rear_pointer) {
        rear_index = index;
        not_select_pointer = front_pointer;
      }
      pointer.label.element.remove();
      pointer.arrow.rObj.remove();

      if (front_index === rear_index) {
        not_select_pointer.label.element.remove();
        not_select_pointer.arrow.rObj.remove();
        front_pointer = jsavCir.pointer("front", index, 0.3);
        rear_pointer = jsavCir.pointer("rear", index, 0.7);
        aqueueDequeuePRO.bindPointerClick(front_pointer);
        aqueueDequeuePRO.bindPointerClick(rear_pointer);
      } else if (type === "front") {
        front_pointer = jsavCir.pointer("front", index);
        aqueueDequeuePRO.bindPointerClick(front_pointer);
        front_index = index;
      } else if (type === "rear") {
        rear_pointer = jsavCir.pointer("rear", index);
        aqueueDequeuePRO.bindPointerClick(rear_pointer);
        rear_index = index;
      }
    },

    // JSAV Circular click handler
    clickHandler: function(index) {
      if (Xstatus === 0) {
        var val = jsavCir.value(index);
        jsavCir.value(index, "");
        arrReturn.value(0, val);
        copyFrom = index;
      } else if (Xstatus === 1) {
        if (selected_index === index) {
          jsavCir.path[selected_index].rObj.attr({
            fill: "none",
            opacity: 1
          });
          Xstatus = 0;
        } else {
          jsavCir.path[selected_index].rObj.attr({
            fill: "none",
            opacity: 1
          });
          jsavCir.path[index].rObj.attr({
            fill: "yellow",
            opacity: 0.5
          });
          selected_index = index;
        }
      } else if (Xstatus === 2) {
        aqueueDequeuePRO.resetPointer(selected_pointer, index, selected_pointer.label.element.html());
        selected_pointer.label.element.removeClass("highlight");
        selected_pointer = null;
        selected_index = -1;
        Xstatus = 0;
      }
      aqueueDequeuePRO.userInput = true;
    },

    copy: function() {
      var val;
      if ((Xstatus === 1) && (selected_index > -1)) {
        jsavCir.path[selected_index].rObj.attr({fill: "none", opacity: 1});
        val = jsavCir.value(selected_index);
        arrReturn.value(0, val);
        copyFrom = selected_index;
        selected_index = -1;
        Xstatus = 0;
      }
    },

    // Initialise the exercise
    initJSAV: function(maxSize, front, rear) {
      var i;
      aqueueDequeuePRO.userInput = false;
      selected_index = -1;
      Xstatus = 0;
      answCopyFrom = front;
      cloneArr.length = 0; // Out with the old

      // Give random numbers in range 0..999
      for (i = 0; i < maxSize; i++) {
        cloneArr[i] = "";
      }
      var frontIndex = front;
      // Copy in data, but only if the queue is not empty
      if (((rear + 1) % maxSize) !== front) {
        while (frontIndex !== ((rear + 1) % maxSize)) {
          cloneArr[frontIndex] = Math.floor(Math.random() * 1000);
          frontIndex = (frontIndex + 1) % maxSize;
        }
      }

      reset(maxSize, front, rear);

      // Set up handler for reset button
      $("#reset").click(function() { reset(maxSize, front, rear); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function(maxSize) {
      if ((front_index !== answFrontPos) || (rear_index !== answRearPos)) {
        return false;
      }
      if (answCopyFrom !== copyFrom) {
        return false;
      }
      return true;
    }
  };

  // reset function definition
  function reset(maxSize, front, rear) {
    var cx = 250,
        cy = 150;
    selected_index = -1;
    copyFrom = front;
    front_index = front;
    rear_index = rear;
    Xstatus = 0;

    // Clear the old JSAV canvas.
    if ($("#AqueueDequeuePRO")) { $("#AqueueDequeuePRO").empty(); }

    // Set up the display
    av = new JSAV("AqueueDequeuePRO");
    jsavCir = av.circular(cx, cy, 50, 100, maxSize, {"stroke-width": 2});
    arrReturn = av.ds.array(["null"], {left: cx + 200, top: cy - 15});
    av.label("return", {left: cx + 155, top: cy - 10});
    if (front === rear) {
      front_pointer = jsavCir.pointer("front", front, 0.3);
      rear_pointer = jsavCir.pointer("rear", rear, 0.7);
    } else {
      front_pointer = jsavCir.pointer("front", front);
      rear_pointer = jsavCir.pointer("rear", rear);
    }
    var i = 0;
    for (i = 0; i < maxSize; i++) {
      jsavCir.value(i, cloneArr[i]);
    }

    av.displayInit();
    av.recorded();

    for (i = 0; i < maxSize; i++) {
      jsavCir.path[i].rObj.node.onclick =
        (function(j) {
          return function() { aqueueDequeuePRO.clickHandler(j); };
        }(i));
    }
    arrReturn.element.css({"z-index": 100});
    arrReturn.click(aqueueDequeuePRO.copy);
    aqueueDequeuePRO.bindPointerClick(front_pointer);
    aqueueDequeuePRO.bindPointerClick(rear_pointer);
    aqueueDequeuePRO.userInput = false;

    // correct answer
    answFrontPos = front;
    answRearPos = rear;
    if (((rear + 1) % maxSize) !== front) { // queue not empty
      answFrontPos = (front + 1) % maxSize; // Circular increment
    } else {
      answCopyFrom = 1000;
      copyFrom = 1000;
    }
  }

  window.aqueueDequeuePRO = window.aqueueDequeuePRO || aqueueDequeuePRO;
}());
