// Turing Machine "class", extending FiniteAutomaton
//Galina Belolipetski


  var Traversor = function(TM, jsavs) {
    this.TM = TM;
    this.jsavs = jsavs;
  }

  Traversor.prototype.onClickTraverse = function(inputStrings) {
    var tape;
    for(var strCnt = 0; strCnt < inputStrings.length; strCnt++){
      var first = "true";
      var jsav = this.jsavs;
      var inputString = inputStrings[strCnt];
      var phraseChanged = "";
      var direction = "";
      var letChanged = "";
      var letScanned = "";
      var currState = "";
      var prevLet = "";
      var g = this.TM;

      //      $("#functionality").hide();                       //disable buttons
      //      $('#alphabets').hide();
      //      $("#mode").html('');
      //      $('.jsavcontrols').show();
      //      $('.jsavoutput').css({"text-align": "left"});
      var arr = new Array(15);    // arbitrary size
      for (var i = 0; i < 15; i++) {
        arr[i] = "#";
      }
      var indexx = 7 - Math.round(inputString.length/2);
      for(var x = 0; x < inputString.length; x++){
        arr[7-Math.round(inputString.length/2) + x] = inputString.charAt(x);
      }

      var nodess = g.nodes();
      var topos = 0;
      for(var y = 0; y<nodess.length; y++){
        if(topos<nodess[y].position().top){
          topos = nodess[y].position().top;
        }

      }

      jsav.umsg("We will see how the machine processes input string '" + inputString + "'.");
      if(tape){//tape is defined so we will reset the tape and add new string to it.
        tape.clearTapeContent();
        tape.setTapeArray(arr, 7-Math.round(inputString.length/2));
      }
      else //create the tape
        tape = jsav.ds.tape(arr, 150, topos + 140, "both", indexx);
      /*var p3 = jsav.g.line(165+30*(7-Math.round(inputString.length/2)), 180 + topos, 165 + 30*(7-Math.round(inputString.length/2)), 125 + topos, {"arrow-end": "classic-wide-long"});
      var rects = jsav.g.rect(150+30*(7-Math.round(inputString.length/2)), 180 + topos, 30, 30);*/
      nodess[0].highlight();
      var currentStates = [new Configuration(g.initial, inputString, jsav)],
          cur,
          counter = 0,
          configView = [];              // configurations to display in the message box
      // for (var j = 0; j < currentStates.length; j++) {
      //     configView.push(currentStates[j].toString());
      // }
      // this.jsav.umsg(configView.join(' | '));
      g.initial.highlight();
      //jsav.displayInit();

      while (true) {
        if (counter === 500) {
          console.log(counter);
          break;
        }
        counter++;
        for (var j = 0; j < currentStates.length; j++) {
          currentStates[j].state.unhighlight();
          g.removeAccept(currentStates[j].state);
          currentStates[j].state.unhighlight();
          g.removeAccept(currentStates[j].state);
        }
        // get next states
        //cur = g.traverse(currentStates);
        if(first == "true"){
          first = "false";
          nodess[0].highlight();
          jsav.step();
        }
        else{
          var nextStates = [];
          for (var j = 0; j < currentStates.length; j++) {
            var currentState = currentStates[j];
            var tapeValue = currentState.tape.currentValue();
            // var tapeValue = currentState.tape.value();
            var successors = currentState.state.neighbors();
            for (var next = successors.next(); next; next = successors.next()) {
              var edge = g.getEdge(currentState.state, next),
                  weight = edge.weight().split('<br>');
              for (var i = 0; i < weight.length; i++) {
                weight[i] = toColonForm(weight[i]);
                var w = weight[i].split(':');
                if (tapeValue === w[0]) {
                  var nextConfig = new Configuration(next, currentState.tape, jsav);
                  prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                  }
                  else{
                    phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                    tape.setCurrentValue(letChanged);
                  }
                  if (w[1] !== square){
                    nextConfig.tape.value(w[1]);
                    arr[indexx] = w[1]
                  }
                  nextConfig.tape.move(w[2]);
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    /*p3.translateX(30);
                    rects.translateX(30);*/
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    /*p3.translateX(-30);
                    rects.translateX(-30);*/
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }
                  

                  nextStates.push(nextConfig);
                  break;
                }
                else if ((tapeValue === undefined) && w[0] === "#"){
                  var nextConfig = new Configuration(next, currentState.tape, jsav);
                  prevLet = w[0];
                    letChanged = w[1];
                    if(prevLet == letChanged){
                      phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                    }
                    else{
                      phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                      tape.setCurrentValue(letChanged);
                    }
                  if (w[1] !== "#"){
                    nextConfig.tape.value(w[1]);
                    arr[indexx] = w[1]
                    if(w[2] == "R"){
                      indexx = indexx + 1;
                      /*p3.translateX(30);
                      rects.translateX(30);*/
                      direction = "right one cell, ";
                      tape.moveRight();
                    }
                    else if(w[2] == "L"){
                      indexx = indexx -1;
                      /*p3.translateX(-30);
                      rects.translateX(-30);*/
                      direction = "left one cell, ";
                      tape.moveLeft();
                    }
                    
                  }
                  else{
                    prevLet = w[0];
                    letChanged = w[1];
                    if(prevLet == letChanged){
                      phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                    }
                    else{
                      phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                      tape.setCurrentValue(letChanged);
                    }
                    if(w[2] == "R"){
                      indexx = indexx + 1;
                      /*p3.translateX(30);
                      rects.translateX(30);*/
                      direction = "right one cell, ";
                      tape.moveRight();
                    }
                    else if(w[2] == "L"){
                      indexx = indexx -1;
                      /*p3.translateX(-30);
                      rects.translateX(-30);*/
                      direction = "left one cell, ";
                      tape.moveLeft();
                    }
                    
                  }
                  nextConfig.tape.move(w[2]);
                  nextStates.push(nextConfig);
                  break;
                }
              }
            }
          }
          nextStates = _.uniq(nextStates, function(x) {return x.toID();});
          cur = nextStates;
          if (!cur || cur.length === 0) {
            break;
          }
          currentStates = cur;
          configView = [];
          // add highlighting and display
          var previous = 0;
          for (var j = 0; j < currentStates.length; j++) {
            currentStates[j].state.highlight();
            currState = "The current state is " + currentStates[j].state.value();
            jsav.umsg("Step " + counter + ": " + phraseChanged + currState);
            //jsav.ds.tape([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8],arr[9], arr[10], arr[11], arr[12], arr[13], arr[14]], 150, topos + 90, "both");
            if (g.isFinal(currentStates[j].state)) {
              g.showAccept(currentStates[j].state);
            }
            //configView.push(currentStates[j].toString());
          }
          jsav.step();
        }
      }
      for (var k = 0; k < currentStates.length; k++) {
        if (g.isFinal(currentStates[k].state)) {
          g.showAccept(currentStates[k].state);
          jsav.umsg("Final State is accepted");
          /*p3.hide();
          rects.hide();*/
        } else {
          jsav.umsg("Final State is rejected");
          g.showReject(currentStates[k].state);
          /*p3.hide();
          rects.hide();*/
        }

      }
      jsav.step();
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
        g.removeReject(currentStates[j].state);
      }
    }
    jsav.step();
    jsav.recorded();
    //g.play(inputString);
  };

var TuringMachine = function(jsav, options) {
	Automaton.apply(this, arguments);
	this.transitions = [];
	if(options.url){ //load the machine from the file
		this.loadFromFile(options.url);
		this.disableDragging();
	  }    
}

var square = String.fromCharCode(35);

JSAV.ext.ds.TM = function (options) {
	var opts = $.extend(true, {visible: true, autoresize: true}, options);
	return new TuringMachine(this, opts);
};

JSAV.utils.extend(TuringMachine, JSAV._types.ds.Graph);

TuringMachine.prototype = Object.create(Automaton.prototype, {});
var tm = TuringMachine.prototype;

tm.addTransition = function(start, end, toRead, toWrite, direction) {
	var transition = new TMTransition(this.jsav, start, end, toRead, toWrite, direction, {});
	var edge = this.addEdge(start, end, {weight: transition.weight});
	transition.edge = edge;
	edge.transition = transition;
	return transition;
}

// traverse on a given input string (can do nondeterministic traversal)
tm.play = function(inputString) {
	var currentStates = [new Configuration(this.initial, inputString, this.jsav)],
			cur,
			counter = 0,
			configView = [];		// configurations to display in the message box
	for (var j = 0; j < currentStates.length; j++) {
		configView.push(currentStates[j].toString());
	}
	// this.jsav.umsg(configView.join(' | '));
	this.initial.highlight();
	this.jsav.displayInit();

	while (true) {
		if (counter === 500) {
			console.log(counter);
			break;
		}
		counter++;
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.unhighlight();
			this.removeAccept(currentStates[j].state);
		}
		// get next states
		cur = this.traverse(currentStates);
		if (!cur || cur.length === 0) {
			break;
		}
		currentStates = cur;
		configView = [];
		// add highlighting and display
		for (var j = 0; j < currentStates.length; j++) {
			currentStates[j].state.highlight();
			if (this.isFinal(currentStates[j].state)) {
				this.showAccept(currentStates[j].state);
			}
			configView.push(currentStates[j].toString());
		}
		// this.jsav.umsg();
		//av.ds.tape(configView, 35, 20, "right");
		//this.jsav.umsg(configView.join(' | '));
		this.jsav.step();
	}
	for (var k = 0; k < currentStates.length; k++) {
		if (this.isFinal(currentStates[k].state)) {
			this.showAccept(currentStates[k].state);
		} else {
			this.showReject(currentStates[k].state);
		}
	}
	this.jsav.step();
	this.jsav.recorded();
};

tm.showAccept = function(state) {
	state.addClass('accepted');
}

tm.removeAccept = function(state) {
	state.removeClass('accepted');
}

tm.showReject = function(state) {
	state.addClass('rejected');
}

tm.removeReject = function(state) {
	state.removeClass('rejected');
}

tm.isInitial = function(state) {
	return state == this.initial;
}

tm.isFinal = function(state) {
	return state.hasClass('final');
}

// given a list of configurations, returns the set of next configurations
tm.traverse = function(currentStates) {
	var nextStates = [];
	for (var j = 0; j < currentStates.length; j++) {
		var currentState = currentStates[j];
		var tapeValue = currentState.tape.currentValue();
		// var tapeValue = currentState.tape.value();
		var successors = currentState.state.neighbors();
		for (var next = successors.next(); next; next = successors.next()) {
			var edge = this.getEdge(currentState.state, next),
					weight = edge.weight().split('<br>');
			for (var i = 0; i < weight.length; i++) {
				weight[i] = toColonForm(weight[i]);
				var w = weight[i].split(':');
				if (tapeValue === w[0]) {
					var nextConfig = new Configuration(next, currentState.tape, this.jsav);
					if (w[1] !== square){
						nextConfig.tape.value(w[1]);
					}
					nextConfig.tape.move(w[2]);
					nextStates.push(nextConfig);
					break;
				}
				else if ((tapeValue === undefined) && w[0] === square){
					var nextConfig = new Configuration(next, currentState.tape, this.jsav);
					if (w[1] !== square){
						nextConfig.tape.value(w[1]);
					}
					nextConfig.tape.move(w[2]);
					nextStates.push(nextConfig);
					break;
				}
			}
		}
	}
	nextStates = _.uniq(nextStates, function(x) {return x.toID();});
	return nextStates;
};


//======================
// Save/Load
// save TM as XML
tm.serializeToXML = function() {
	var text = '<?xml version="1.0" encoding="UTF-8"?>';
	text = text + "<structure>";
	text = text + "<type>turing</type>";
	text = text + "<automaton>";
	var nodes = this.nodes();
	for (var next = nodes.next(); next; next = nodes.next()) {
		var left = next.position().left;
		var top = next.position().top;
		var i = next.hasClass("start");
		var f = next.hasClass("final");
		var label = next.stateLabel();
		text = text + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">';
		text = text + '<x>' + left + '</x>';
		text = text + '<y>' + top + '</y>';
		if (label) {
			text = text + '<label>' + label + '</label>';
		}
		if (i) {
			text = text + '<initial/>';
		}
		if (f) {
			text = text + '<final/>';
		}
		text = text + '</state>';
	}
	var edges = this.edges();
	for (var next = edges.next(); next; next = edges.next()) {
		var fromNode = next.start().value().substring(1);
		var toNode = next.end().value().substring(1);
		var w = next.weight().split('<br>');
		for (var i = 0; i < w.length; i++) {
			text = text + '<transition>';
			text = text + '<from>' + fromNode + '</from>';
			text = text + '<to>' + toNode + '</to>';
			w[i] = toColonForm(w[i]);
			var wSplit = w[i].split(":");
			if (wSplit[0] === emptystring) {
				text = text + '<read/>';
			} else {
				text = text + '<read>' + wSplit[0] + '</read>';
			}
			if (wSplit[1] === emptystring) {
				text = text + '<write/>';
			} else {
				text = text + '<write>' + wSplit[1] + '</write>';
			}
			text = text + '<move>' + wSplit[2] + '</move>';
			text = text + '</transition>';
		}
	}
	text = text + "</automaton></structure>"
		return text;
};

tm.loadFromFile = function(url){
	var text;
	if(ODSA.UTILS.scoringServerEnabled()){//we need to change the url from relative path to absolute path
		var oldUrlParts = url.split('/AV');
		url = '/OpenDSA/AV' + oldUrlParts[1];
	}
  $.ajax( {
    url: url,
    async: false, // we need it now, so not asynchronous request
    success: function(data) {
      text = data;
    }
  });
  if(text)
  	this.initFromXML(text);
}

// load a TM from an XML file
tm.initFromXML = function(text) {
	var parser,
			xmlDoc;
	if (window.DOMParser) {
		parser=new DOMParser();
		xmlDoc=parser.parseFromString(text,"text/xml");
	} else {
		xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async=false;
		xmlDoc.loadXML(text);
	}
	if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'turing') {
		alert('File does not contain a Turing machine.');
	} else if (xmlDoc.getElementsByTagName("tapes")[0] && Number(xmlDoc.getElementsByTagName("tapes")[0].childNodes[0].nodeValue) !== 1) {
		alert('File contains a multitape Turing machine.');
		var loaded = $('#loadbutton');
		loaded.wrap('<form>').closest('form').get(0).reset();
		loaded.unwrap();
		return;
	} else {
		/*	
			var nodes = this.nodes();
			for (var node = nodes.next(); node; node = nodes.next()) {
				this.removeNode(node);
			}
		*/
		var nodeMap = {};			// map node IDs to nodes
		var xmlStates = xmlDoc.getElementsByTagName("state");
		xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
			var xmlTrans = xmlDoc.getElementsByTagName("transition");
		for (var i = 0; i < xmlStates.length; i++) {
			var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
			var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
			var newNode = this.addNode({left: x, top: y, value: xmlStates[i].attributes[1].nodeValue});
			var isInitial = xmlStates[i].getElementsByTagName("initial")[0];
			var isFinal = xmlStates[i].getElementsByTagName("final")[0];
			var isLabel = xmlStates[i].getElementsByTagName("label")[0];
			if (isInitial) {
				this.makeInitial(newNode);
			}
			if (isFinal) {
				newNode.addClass('final');
			}
			if (isLabel) {
				newNode.stateLabel(isLabel.childNodes[0].nodeValue);
			}
			nodeMap[xmlStates[i].id] = newNode;
		}
		for (var i = 0; i < xmlTrans.length; i++) {
			var from = xmlTrans[i].getElementsByTagName("from")[0].childNodes[0].nodeValue;
			var to = xmlTrans[i].getElementsByTagName("to")[0].childNodes[0].nodeValue;
			var read = xmlTrans[i].getElementsByTagName("read")[0].childNodes[0];
			var write = xmlTrans[i].getElementsByTagName("write")[0].childNodes[0];
			var move = xmlTrans[i].getElementsByTagName("move")[0].childNodes[0].nodeValue;
			if (!read) {
				read = square;
			} else {
				read = read.nodeValue;
			}
			if (!write) {
				write = square;
			} else {
				write = write.nodeValue;
			}
			this.addEdge(nodeMap[from], nodeMap[to], {weight: read + ";" + write + "," + move});
		}
		this.layout();
	}
};


// Configuration class
var Configuration = function(state, tape, av) {
	this.state = state;
	this.tape = new Tape(tape);
	// toString returns the state value + the 'viewport' of the tape, to be displayed to the user
	this.toString = function() {
		this.tape.viewTape(this.tape.getArr(), av);
	}
	this.toID = function() {
		return this.state.value() + this.tape;
	}
};


// Transition object for Turing Machine
var TMTransition = function(jsav, start, end, toRead, toWrite, direction, options) {
	var weight = toRead + ";" + toWrite + "," + direction;
	this.weight = weight;
	this.jsav = jsav;
	this.start = start;
	this.end = end;
	this.toWrite = toWrite;
	this.toRead = toRead;
	this.direction = direction;
}

var tmTrans = TMTransition.prototype;

tmTrans.getWeight = function() {
	return this.weight;
}


/*
	 Holds the tape as an array and keeps track of current
	 position
	 linked list and keeps track of the current position
	 as well as the beginning of the string.
 */
var Tape = function(str) {
	"use strict";
	this.arr = [];
	this.current = 0;
	this.currentIndex = 0;

	if (typeof str === 'string') {
		this.arr = str.split("");
		this.current = this.arr[0];  // the current symbol
		this.currentIndex = 0;                // the current position
	}
	// else, assume that a Tape object was passed in, and create a copy of it
	else {
		this.currentIndex = str.currentIndex;
		this.arr = str.getArr();
		this.current = this.arr[this.currentIndex];
	}

	this.copy = function(value){
		var newarr = new Array(value.length);
		for (var i = 0; i < value.length; i++){
			newarr[i] = value[i];
		}
		return newarr;
	}

	this.toString = function(){
		return this.arr.toString();
	}

	this.write = function(value, location){
		this.arr[location] = value;
		size++;
		this.current = location;
	}

	this.getArr = function(){
		return this.arr;
	}

	this.currentValue = function() {
		return this.arr[this.currentIndex];
	}

	this.value = function(newValue) {
		if (typeof newValue === "undefined") {
			return undefined;
		}
		this.arr[this.currentIndex] = newValue;
		return this.arr[this.currentIndex];
	}

	this.goRight = function() {
			this.currentIndex+=1;
			this.current = this.arr[this.currentIndex];
			return this.current;
	}

	this.goLeft = function() {
			this.currentIndex-=1;
			this.current = this.arr[this.currentIndex];
			return this.current;
	}

	this.removeValue = function(location) {
		this.arr[location] = null;
		for (var i = 0; i < arr.length; i++)	{
			arr[i] = arr[i+1];
		}
	}

	// Move the tape and read the symbol
	this.move = function (str) {
		if (str === "L") {
			return this.goLeft();
		} else if (str === "R") {
			return this.goRight();
		} else if (str === "S") {
			return this.curren;
		}
	}

	this.viewTape = function (t, av) {
		var arr = av.ds.tape(t, 325, 30, "both", this.currentIndex);
		return arr;
	};
};
