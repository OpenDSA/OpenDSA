// Written by Galina Belolipetski
// This is the Turing Machine

(function ($) {
  "use strict";

  var TM = function init(jsav, options) {
    this.init(jsav, options);
  }

  var tmproto = TM.prototype;

  // Called when DFA is instantiated
  tmproto.init = function(jsav, options) {
    "use strict";
    this.jsav = jsav;
    this.options = options;
    this.allStates = [];
    this.currentStateId = 0;
  };

  // Instantiates and adds a new State to the DFA
  tmproto.addState = function(xPos, yPos, color, isFinalState) {
    "use strict";
    // Assigns Unique ID to the new State object, where Unique ID == size of DFA before adding (just like Array)
    // The first State added becomes a start state.
    var id = this.allStates.length;
    this.allStates.push(new State(this.jsav, xPos, yPos, color, id === 0, isFinalState, id));
    return this.allStates[id];
  };

  tmproto.getCurrentState = function() {
    "use strict";
    return this.allStates[this.currentStateId];
  };

  tmproto.reset = function() {
    "use strict";
    this.getCurrentState().unhighlight();
    this.currentStateId = 0;
    this.getCurrentState().highlight();
  };
  });


  // State implementation
  var State = function(jsav, xPos, yPos, color, isStartState, isFinalState, uniqueId) {
    "use strict";
    this.jsav = jsav;
    this.myXPos = xPos;
    this.myYPos = yPos;
    this.myColor = color;
    this.isStart = isStartState;
    this.isFinal = isFinalState;
    this.uniqueId = uniqueId;
    // Dictionary of possible next states, along with accepted characters
    this.nextStates = {};
    // Dictionary of all edges. nextStates and edges can be combined, as they contain redundant data.
    this.edges = {};

    this.g = this.jsav.g.circle(this.myXPos * 120 + 70, this.myYPos * 120 + 70, 50, {fill: color});

    // Event handling example.
    // See "Events" section of http://jsav.io/graphicalprimitives/ for more.
    this.g.click(function() {
        alert(uniqueId + " clicked!");
    });

    if (this.isStart == true) {
       this.jsav.g.polygon([[this.myXPos * 120, this.myYPos * 120 + 40], [this.myXPos  * 120, this.myYPos * 120 + 100], [this.myXPos * 120 + 20, this.myYPos * 120 + 70]]);
       // Highlight start State
       this.highlight();
    }

    if (this.isFinal == true) {
       this.jsav.g.circle(this.myXPos * 120 + 70, this.myYPos * 120 + 70, 45);
    }

    this.jsav.label("q" + this.getUniqueID(), {left:this.myXPos * 120 + 63, top:this.myYPos * 120 + 67, fill:"black"});
  };

  var stateproto = State.prototype;

  stateproto.getUniqueID = function() {
    return this.uniqueId;
  };

  stateproto.addNextState = function(nextState, acceptedChars) {
    // COMBINE INTO ONE DATA STRUCTURE.
    this.nextStates[""+nextState.getUniqueID()] = acceptedChars;
    this.edges[""+nextState.getUniqueID()] = new StateEdge(this.jsav, this, nextState, acceptedChars);
   };

  stateproto.traverse = function(letter) {
    for (var state in this.nextStates) {
      if (this.nextStates.hasOwnProperty(state)) {
          for (var i = 0; i < this.nextStates[state].length; i++) {
              var acceptedChar = this.nextStates[state][i];
              if (acceptedChar == letter) {
                return Number(state);
              }
          }
      }
    }
    return -1;
  };

  stateproto.highlight = function() {
    "use strict";
    this.g.css({fill: "#ffaaaa"});
  };

  stateproto.unhighlight = function() {
    "use strict";
    this.g.css({fill: this.myColor});
  }

  JSAV.ext.tm = function(options) {
    "use strict";
    return new TM(this, options);
  };
