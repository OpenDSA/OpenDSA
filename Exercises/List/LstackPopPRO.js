/*global JSAV, window */
(function() {
  "use strict";
  var jsav,             // The JSAV object
      answerArr = [],     // The (internal) array that stores the correct answer
      listArr = [],       // Stores the jsav list values
      ptop,               // pointer top
      selected_pointer,   // pointer that is clicked, which will always be ptop here.
      status = 0,         // Nothing is currently selected, status = 0;
                          // List node is selected, status = 1;
                          // pointer top is selected, status = 2.
      arrReturn,          //
      copyFrom,           //
      jsavList,           // JSAV list
      listSize,           // JSAV list size
      selected_node;      // Position that has been selected by user for swap

  var lstackPopPRO = {
    userInput: null,            // Boolean: Tells us if user ever did anything

    // pointer click handler
    pclick: function(pointer) {
      if (status === 1) {
        selected_node.unhighlight();
        selected_node = null;
      } else if (status === 2) {
        selected_pointer.element.removeClass("highlight");
        selected_pointer = null;
        status = 0;
        lstackPopPRO.userInput = true;
        return;
      }
      selected_pointer = pointer;
      selected_pointer.element.toggleClass("highlight");
      status = 2;
      lstackPopPRO.userInput = true;
    },

    copyHandler: function() {
      if (status === 1) {
        selected_node.unhighlight();
        jsav.effects.copyValue(selected_node, arrReturn, 0);
        copyFrom = selected_node;
        status = 0;
        lstackPopPRO.userInput = true;
      }
    },

    // Click event handler on the list
    clickHandler: function() {
      if (status === 0) {
        selected_node = this;
        this.highlight();
        status = 1;
      } else if (status === 1) {
        if (selected_node === this) {
          this.unhighlight();
          status = 0;
        } else {
          selected_node.unhighlight();
          selected_node = this;
          this.highlight();
        }
      } else if (status === 2) {
        selected_pointer.target(this);
        jsav.container.trigger("jsav-updaterelative");
        selected_pointer.element.removeClass("highlight");
        selected_pointer = null;
        status = 0;
      }
      lstackPopPRO.userInput = true;
    },

    addTail: function(node) {
      if (node.odsa_tail) {
        node.odsa_tail.element.remove();

        var fx = $("#" + node.id()).position().left + 34;
        var tx = $("#" + node.id()).position().left + 44;
        var fy = $("#" + node.id()).position().top + 47 + 40;
        var ty = $("#" + node.id()).position().top + 16 + 40;
        node.odsa_tail = jsav.g.line(fx, fy, tx, ty, {opacity: 100, "stroke-width": 1});
      }
    },

    // reset function definition
    reset: function() {
      var i;
      lstackPopPRO.userInput = false;
      selected_node = null;
      copyFrom = null;
      status = 0;

      if ($("#LstackPopPRO")) {
        $("#LstackPopPRO").empty();
      }
      jsav = new JSAV("LstackPopPRO");
      jsav.recorded();

      jsavList = jsav.ds.list({nodegap: 30, top: 40, left: 0});
      for (i = listSize - 1; i >= 0; i--) {
        jsavList.addFirst(listArr[i]);
      }
      jsavList.layout();

      arrReturn = jsav.ds.array([""], {left: jsavList.get(0).element.position().left + 45, top: 100});
      jsav.label("return", {left: jsavList.get(0).element.position().left, top: 105});
      for (i = 0; i < listSize; i++) {
        jsavList.get(i).odsa_next = jsavList.get(i).next();
        jsavList.get(i).odsa_edgeToNext = jsavList.get(i).edgeToNext();
      }
      jsavList.get(listSize - 1).odsa_tail = jsav.g.line(34 + (listSize - 1) * 74, 47 + 40,
                                                         44 + (listSize - 1) * 74, 16 + 40,
                                                         {opacity: 100, "stroke-width": 1});
      ptop = jsav.pointer("top", jsavList.get(0), {fixed: "true"});
      ptop.click(lstackPopPRO.pclick);

      arrReturn.click(lstackPopPRO.copyHandler);
      jsavList.click(lstackPopPRO.clickHandler); // Rebind click handler after reset
      lstackPopPRO.userInput = false;
    },

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

      lstackPopPRO.reset();

      // Set up handler for reset button
      $("#reset").click(function() { lstackPopPRO.reset(); });
    },

    // Check user's answer for correctness: User's array must match answer
    checkAnswer: function() {
      if (ptop.target() !== jsavList.get(1)) { return false; }
      if (copyFrom !== jsavList.get(0)) { return false; }
      return true;
    }
  };

  window.lstackPopPRO = window.lstackPopPRO || lstackPopPRO;
}());
