/*global JSAV, window */
(function() {
  "use strict";
  var av,                 // The JSAV object
      answerArr = [],     // The (internal) array that stores the correct answer
      listArr = [],       // Stores the jsav list values
      ptop,               // pointer top
      selected_pointer,   // pointer that is clicked, which will always be ptop here.
      arrReturn,          //
      copyFrom,           //
      jsavList,           // JSAV list
      listSize,           // JSAV list size
      selected_node;      // Position that has been selected by user for swap

  var lstackPopPRO = {
    userInput: null,            // Boolean: Tells us if user ever did anything

    // Initialise the exercise
    initJSAV: function(size) {
      var i;
      answerArr.length = 0;
      listSize = size;

      // Give random numbers in range 0..999
      for (i = 0; i < size; i++) {
        answerArr[i] = Math.floor(Math.random() * 1000);
      }
      listArr = answerArr.slice(0);

      reset();

      // Set up handler for reset button
      $("#reset").click(function() { reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if (ptop.target() !== jsavList.get(1)) { return false; }
      if (copyFrom !== jsavList.get(0)) { return false; }
      return true;
    }
  };

  // pointer click handler
  function pclick(pointer) {
    if (selected_node !== null) { // Unhighlight selected node
      selected_node.unhighlight();
      selected_node = null;
    }
    if (selected_pointer !== null) { // Unselecting the pointer
      selected_pointer.element.removeClass("highlight");
      selected_pointer = null;
    } else { // Selecting the top poiner
      selected_pointer = pointer;
      selected_pointer.element.toggleClass("highlight");
    }
    lstackPopPRO.userInput = true;
  }

  function copyHandler() {
    if (selected_node !== null) { // Copy the value
      selected_node.unhighlight();
      av.effects.copyValue(selected_node, arrReturn, 0);
      copyFrom = selected_node;
      lstackPopPRO.userInput = true;
    }
  }

  // Click event handler on the list
  function clickHandler() {
    if (selected_node !== null) { // Deal with old highlight
      if (selected_node === this) { // Deselecting this node
        this.unhighlight();
        selected_node = null;
      } else {
        selected_node.unhighlight();
        selected_node = this;
        this.highlight();
      }
    } else if (selected_pointer !== null) { // Point to this node
      selected_pointer.target(this);
      av.container.trigger("jsav-updaterelative");
      selected_pointer.element.removeClass("highlight");
      selected_pointer = null;
    } else { // Nothing was selected already
      selected_node = this;
      this.highlight();
    }
    lstackPopPRO.userInput = true;
  }

  // reset function definition
  function reset() {
    var i;
    lstackPopPRO.userInput = false;
    selected_node = null;
    selected_pointer = null;
    copyFrom = null;

    // Clear the old JSAV canvas.
    if ($("#LstackPopPRO")) { $("#LstackPopPRO").empty(); }

    // Set up the display
    av = new JSAV("LstackPopPRO");

    jsavList = av.ds.list({nodegap: 30, top: 40, left: 0});
    for (i = listSize - 1; i >= 0; i--) {
      jsavList.addFirst(listArr[i]);
    }
    jsavList.layout();
    arrReturn = av.ds.array([""], {left: 75, top: 100});
    av.label("return", {left: jsavList.get(0).element.position().left, top: 105});
    for (i = 0; i < listSize; i++) {
      jsavList.get(i).odsa_next = jsavList.get(i).next();
      jsavList.get(i).odsa_edgeToNext = jsavList.get(i).edgeToNext();
    }
    // Tail null pointer line
    jsavList.get(listSize - 1).odsa_tail = av.g.line(34 + (listSize - 1) * 74, 47 + 40,
                                                     44 + (listSize - 1) * 74, 16 + 40,
                                                     {opacity: 100, "stroke-width": 1});
    ptop = av.pointer("top", jsavList.get(0), {fixed: "true"});
    av.displayInit();
    av.recorded();

    // Set click handers
    ptop.click(pclick);
    arrReturn.click(copyHandler);
    jsavList.click(clickHandler); // Rebind click handler after reset
    lstackPopPRO.userInput = false;
  }

  window.lstackPopPRO = window.lstackPopPRO || lstackPopPRO;
}());
