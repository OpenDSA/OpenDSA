(function() {
  "use strict";
  var jsav, // The JSAV object
    answerArr = [], // The (internal) array that stores the correct answer
    answFrontPos,
    answRearPos,
    cloneArr = [], // Copy of (internal) array at start of the exercise for reset
    jsavCir, // The array that the user manipulates (JSAV object)
    selected_pointer,
    front_pointer,
    front_index,
    rear_pointer,
    rear_index,
    Xstatus,
    background,
    inValue, // Enqueue value
    selected_index, // Position that has been selected by user for swap
    aqueueEnqueuePRO = {
    userInput: null, // Boolean: Tells us if user ever did anything
      // pointer click handler
      pclick: function(pointer) {
        if (Xstatus === 1) {
          jsavCir.path[selected_index].rObj.attr({
            "fill": "none",
            "opacity": "1"
          });
          pointer.label.element.toggleClass('highlight');
          selected_pointer = pointer;
          Xstatus = 2;
        } else if (Xstatus === 2) {
          if (selected_pointer !== pointer) {
            selected_pointer.label.element.removeClass('highlight');
            pointer.label.element.addClass('highlight');
            selected_pointer = pointer;
          } else {
            pointer.label.element.removeClass('highlight');
            Xstatus = 0;
          }
        } else if (Xstatus === 0) {
          pointer.label.element.addClass('highlight');
          selected_pointer = pointer;
          Xstatus = 2;
        }
        aqueueEnqueuePRO.userInput = true;
      },
      // Convenience function: Set the click handler on a pointer
      bindPointerClick: function(pointer) {
        pointer.label.element.click(function() {
          aqueueEnqueuePRO.pclick(pointer);
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
          aqueueEnqueuePRO.bindPointerClick(front_pointer);
          aqueueEnqueuePRO.bindPointerClick(rear_pointer);
        } else {
          if (type === "front") {
            front_pointer = jsavCir.pointer("front", index);
            aqueueEnqueuePRO.bindPointerClick(front_pointer);
            front_index = index;
          } else if (type === "rear") {
            rear_pointer = jsavCir.pointer("rear", index);
            aqueueEnqueuePRO.bindPointerClick(rear_pointer);
            rear_index = index;
          }
        }
      },
      // JSAV Circular click handler
      clickHandler: function(index) {
        if (Xstatus === 0) {
          jsavCir.path[index].rObj.attr({
            "fill": "yellow",
            "opacity": "0.5"
          });
          selected_index = index;
          Xstatus = 1;
        } else if (Xstatus === 1) {
          if (selected_index === index) {
            jsavCir.path[selected_index].rObj.attr({
              "fill": "none",
              "opacity": "1"
            });
            Xstatus = 0;
          } else {
            jsavCir.path[selected_index].rObj.attr({
              "fill": "none",
              "opacity": "1"
            });
            jsavCir.path[index].rObj.attr({
              "fill": "yellow",
              "opacity": "0.5"
            });
            selected_index = index;
          }
        } else if (Xstatus === 2) {
          aqueueEnqueuePRO.resetPointer(selected_pointer, index, selected_pointer.label.element.html());
          selected_pointer.label.element.removeClass('highlight');
          selected_pointer = null;
          selected_index = -1;
          Xstatus = 0;
        }
        aqueueEnqueuePRO.userInput = true;
      },

      f_insert: function() {
        if ((Xstatus === 1) && (selected_index > -1)) {
          jsavCir.value(selected_index, inValue);
        }
      },
      // reset function definition
      f_reset: function(maxSize, front, rear) {
        selected_index = -1;
        front_index = front;
        rear_index = rear;
        Xstatus = 0;
        var cx = 250,
          cy = 150;
        if ($("#jsav")) {
          $("#jsav").empty();
        }
        jsav = new JSAV("AqueueEnqueuePRO");
        jsavCir = jsav.circular(cx, cy, 50, 100, maxSize, {
          "stroke-width": 2
        });
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

        jsav.displayInit();
        jsav.recorded();
        jsav.forward();

        for (i = 0; i < maxSize; i++) {
          jsavCir.path[i].rObj.node.onclick =
            (function(j) {
            return function() {
              aqueueEnqueuePRO.clickHandler(j);
            };
          }(i));
        }


        aqueueEnqueuePRO.bindPointerClick(front_pointer);
        aqueueEnqueuePRO.bindPointerClick(rear_pointer);
        aqueueEnqueuePRO.userInput = false;
      },
      // Initialise the exercise
      initJSAV: function(maxSize, front, rear, insertValue) {
        var i, j;
        aqueueEnqueuePRO.userInput = false;
        selected_index = -1;
        Xstatus = 0;
        inValue = insertValue;
        answerArr.length = 0; // Out with the old

        // Give random numbers in range 0..999
        for (i = 0; i < maxSize; i++) {
          answerArr[i] = "";
        }
        var frontIndex = front;
        var rearIndex = rear;
        // Copy in data, but only if the queue is not empty
        if (((rear + 1) % maxSize) !== front) {
          while (frontIndex !== ((rear + 1) % maxSize)) {
            answerArr[frontIndex] = Math.floor(Math.random() * 1000);
            frontIndex = (frontIndex + 1) % maxSize;
          }
        }
        // Now make a copy
        cloneArr = answerArr.slice(0);

        aqueueEnqueuePRO.f_reset(maxSize, front, rear);

        // Define the correct answer
        answFrontPos = front;
        answRearPos = rear;
        if (((rear + 2) % maxSize) !== front) {
          rearIndex = (rearIndex + 1) % maxSize; // Circular increment
          answerArr[rearIndex] = inValue;
          answRearPos = rearIndex;
        } // else we don't actually insert because queue is full

        // Set up button click handlers
        $("#insert").click(function() {
          aqueueEnqueuePRO.f_insert();
        });
        $("#reset").click(function() {
          aqueueEnqueuePRO.f_reset(maxSize, front, rear);
        });
      },
      // Check user's answer for correctness: User's array must match answer
      checkAnswer: function(maxSize) {
        if ((front_index !== answFrontPos) || (rear_index !== answRearPos)) {
          return false;
        }
        for (var i = 0; i < maxSize; i++) {
          // This next comparison must really be !=, instead of !==
          if (jsavCir.labels[i].element.html() != answerArr[i]) {
            return false;
          }
        }
        return true;
      }
    };
  window.aqueueEnqueuePRO = window.aqueueEnqueuePRO || aqueueEnqueuePRO;
}())
