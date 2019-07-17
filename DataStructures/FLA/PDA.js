(function($) {
var PDA = function(jsav, options) {
  Automaton.apply(this, arguments);
  this.configurations = $("<ul>"); // configurations jQuery object used to setup view at a step
  this.configViews = []; // configurations view for a step
  this.step = 0; // current step the user is at, used for changing configuration display
  this.stack = ['Z'];
  this.undoStack = [];
  this.redoStack = [];
  //this.stackViz = this.jsav.ds.stack(['Z'], 20, 5)
  //this.stackViz.hide()
  //this.inputViz = this.jsav.ds.tape([], 36, 5)
  //this.inputViz.hide()
}

JSAV.ext.ds.pda = function (options) {
  var opts = $.extend(true, {visible: true, autoresize: true}, options);
  return new PDA(this, opts);
};

JSAV.utils.extend(PDA, JSAV._types.ds.Graph);

PDA.prototype = Object.create(Automaton.prototype, {});
var pda = PDA.prototype;

pda.showAccept = function(state) {
  state.addClass('accepted');
}

pda.removeAccept = function(state) {
  state.removeClass('accepted');
}

pda.showReject = function(state) {
  state.addClass('rejected');
}

pda.isInitial = function(state) {
  return state == this.initial;
}

pda.isFinal = function(state) {
  return state.hasClass('final');
}

//====================
// tests

// toggles highlighting nondeterministic nodes
pda.toggleND = function() {
  var nodes = this.nodes();
  for(var next = nodes.next(); next; next = nodes.next()) {
    var edges = next.getOutgoing();
    if (edges.length === 0) {continue;}
    var weights = _.map(edges, function(e) {return toColonForm(e.weight()).split('<br>')});
    for (var i = 0; i < weights.length; i++) {
      var findLambda = _.find(weights[i], function(e) {return e.split(':')[0] === emptystring});
      if (findLambda) { break; }
    }
    var dup = _.map(_.flatten(weights), function(e) {return _.initial(e.split(':')).join()})
      if (findLambda || _.uniq(dup).length < dup.length) {
        next.toggleClass('testingND');
      }
  }
};

// toggles highlighting lambda transitions
pda.toggleLambda = function() {
  var edges = this.edges();
  for (var next = edges.next(); next; next = edges.next()) {
    var wSplit = toColonForm(next.weight()).split('<br>');
    for (var i = 0; i < wSplit.length; i++) {
      if (_.every(wSplit[i].split(':'), function(x) {return x == emptystring})) {
        next.g.element.toggleClass('testingLambda');
        break;
      }
    }
  }
};

//====================
//traversal

/*pda.playTraverse = function(inputString) {
  //this.setupControls();

  // var configArray = this.jsav.ds.array();
  // this.configViews.push(configArray.element);
  this.stackViz.update(['Z'])
  var inputViz = this.jsav.ds.tape(inputString.split(''), 40, 5, 'right')

  this.initial.addClass('current');
  this.configurations = $("<ul>");
  var currentStates = [new Configuration(this.configurations, this.initial, ['Z'], inputString, 0)];
  currentStates = this.addLambdaClosure(currentStates);
  var configArray = this.jsav.ds.array(this.configurations);
  this.configViews.push(configArray.element);
  var $configView = $('#configurations');
  $configView.empty();
  $configView.append(this.configViews[0]);

  this.jsav.displayInit();

  this.configurations = $("<ul>");
  for (var j = 0; j < currentStates.length; j++) {
    currentStates[j].update();
  }

  configArray = this.jsav.ds.array(this.configurations);
  this.configViews.push(configArray.element);

  var cur;
  counter = 0;
  var stringAccepted = false;
  while (true) {
    this.jsav.step();
    counter++;
    if (counter > 100) {
      break;
    }
    // console.log(counter)
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.removeClass('current');
      currentStates[j].state.removeClass('accepted');
      currentStates[j].state.removeClass('rejected');
    }
    cur = this.traverse(currentStates);
    if (cur.length === 0) {
      break;
    }
    currentStates = cur;

    this.configurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      if (currentStates[j].curIndex === inputString.length) {
        if (currentStates[j].state.hasClass('final')) {
          currentStates[j].state.addClass('accepted');
          stringAccepted = true;
        }
      }
      currentStates[j].update();
    }
    var updatedStack = currentStates[currentStates.length - 1].stack
    updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
    this.stackViz.update(updatedStack)
    configArray = this.jsav.ds.array(this.configurations);
    this.configViews.push(configArray.element);
  }

  if (stringAccepted) {
    this.jsav.umsg("Accepted");
  } else {
    this.jsav.umsg("Rejected");
  }
  this.jsav.recorded();
};*/

pda.traverse = function(currentStates) {
  // currentStates is an array of configurations
  var nextStates = [];
  for (var i = 0; i < currentStates.length; i++) {
    //Current problem is that the neighbors doesn't include the case where the node has an edge connecting to itself. We also need to check if there is an edge connecting to itself
    var successors = currentStates[i].state.neighbors(),
        curStack = currentStates[i].stack,
        curIndex = currentStates[i].curIndex,
        s = currentStates[i].inputString,
        letter = s[curIndex];
    for (var next = successors.next(); next; next = successors.next()) {
      if(nextStates.length > 50){
        break;
      }
      var w = this.getEdge(currentStates[i].state, next).weight().split('<br>');
      for (var j = 0; j < w.length; j++) {
        var nextIndex = curIndex + 1;
        w[j] = toColonForm(w[j]);
        var t = w[j].split(':');
        if (t[0] !== letter && t[0] !== emptystring) {continue;}
        if (t[0] === emptystring) {nextIndex = curIndex;}
        if (t[1] !== emptystring) {
          var l = [],
              cur;
          for (var k = 0; k < t[1].length; k++) {
            cur = curStack.pop();
            if (cur) {
              l.push(cur);
            } else {
              break;
            }
          }
          if (t[1] === l.join('')) {
            var nextConfig = new Configuration(this.configurations, next, curStack, s, nextIndex);
            if (t[2] !== emptystring){
              for (var h = t[2].length - 1; h >= 0; h--) {
                nextConfig.stack.push(t[2].charAt(h));
              }
            }
            next.addClass('current');
            nextStates.push(nextConfig);
          } 
          l.reverse();
          curStack = curStack.concat(l);
        } else {
          var nextConfig = new Configuration(this.configurations, next, curStack, s, nextIndex);
          if (t[2] !== emptystring){
            for (var h = t[2].length - 1; h >= 0; h--) {
              nextConfig.stack.push(t[2].charAt(h));
            }
          }
          next.addClass('current');
          nextStates.push(nextConfig);
          // break;
          continue;
        }
      }
    }
  }
  nextStates = _.each(nextStates, function(x) {return x.toString();});
  nextStates = this.addLambdaClosure(nextStates);
  return nextStates;
};

pda.traverseOneInput = function(inputString){
  this.setupControls();
  this.initial.addClass('current');
  this.configurations = $("<ul>");
  var currentStates = [new Configuration(this.configurations, this.initial, ['Z'], inputString, 0)];
  currentStates = this.addLambdaClosure(currentStates);
  var configArray = this.jsav.ds.array(this.configurations);
  this.configViews.push(configArray.element);
  //var $configView = $('#configurations');
  //$configView.empty();
  //$configView.append(this.configViews[0]);

  //this.jsav.displayInit();

  this.configurations = $("<ul>");
  for (var j = 0; j < currentStates.length; j++) {
    currentStates[j].update();
  }

  configArray = this.jsav.ds.array(this.configurations);
  //this.configViews.push(configArray.element);

  var cur;
  counter = 0;
  var stringAccepted = false;
  while (true) {
    //this.jsav.step();
    counter++;
    if (counter > 500) {
      break;
    }
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].state.removeClass('current');
      currentStates[j].state.removeClass('accepted');
      currentStates[j].state.removeClass('rejected');
    }
    cur = this.traverse(currentStates);
    if (cur.length === 0) {
      break;
    }
    currentStates = cur;

    this.configurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      if (currentStates[j].curIndex === inputString.length) {
        if (currentStates[j].state.hasClass('final')) {
          currentStates[j].state.addClass('accepted');
          stringAccepted = true;
        }
      }
      currentStates[j].update();
    }
    configArray = this.jsav.ds.array(this.configurations);
    //this.configViews.push(configArray.element);
  }

  return stringAccepted;
}

pda.addLambdaClosure = function(nextStates) {
  lambdaStates = [];
  for (var i = 0; i < nextStates.length; i++) {
    var successors = nextStates[i].state.neighbors();
    for (var next = successors.next(); next; next = successors.next()) {
      var weight = toColonForm(this.getEdge(nextStates[i].state, next).weight());
      weight = weight.split("<br>");
      for (var j = 0; j < weight.length; j++) {
        if (!next.hasClass('current') && _.every(weight[j].split(':'), function(x) {return x === emptystring})) {
          next.addClass('current');
          var nextConfig = new Configuration(this.configurations, next, nextStates[i].stack, nextStates[i].inputString, nextStates[i].curIndex)
            lambdaStates.push(nextConfig);
        }
      }
    }
  }
  if(lambdaStates.length > 0) {
    lambdaStates = this.addLambdaClosure(lambdaStates);
  }
  for (var k = 0; k < lambdaStates.length; k++) {
    nextStates.push(lambdaStates[k]);
  }
  nextStates = _.each(nextStates, function(x) {return x.toString();});
  return nextStates;
};

pda.cancelTraverse = function() {
  var i = 0
  for(i; i < this._nodes.length; i++){
    if(this._nodes[i].hasClass('current')) {
      this._nodes[i].removeClass('current')
    }
    if(this._nodes[i].hasClass('accepted')) {
      this._nodes[i].removeClass('accepted')
    }
    if(this._nodes[i].hasClass('rejected')) {
      this._nodes[i].removeClass('rejected')
    }
  }
  this.configurations = $("<ul>"); // configurations jQuery object used to setup view at a step
  this.configViews = []; // configurations view for a step
  this.step = 0; // current step the user is at, used for changing configuration display
  this.stack = ['Z'];
  $('.jsavverticalarray').hide()
  $('.jsavhorizontalarray').hide()
  $('.jsavcanvas > svg > path').hide()
  $('.jsavoutput > div').html('')
}

// Configuration object
var Configuration = function(configurations, state, stack, str, index) {
  this.state = state;
  this.inputString = str;
  this.curIndex = index;
  this.stack = stack.slice(0);
  this.element = $('.configuration').last().clone();
  this.update = function() {
    this.element.find('#currentState').text(this.state.value());
    this.element.find('#readInput').text(this.inputString.substring(0, this.curIndex));
    this.element.find('#unreadInput').text(this.inputString.substring(this.curIndex, this.inputString.length));
    this.element.find('#stack').text(this.stack.join());
    this.element.removeClass('configNormal').removeClass('configAccepted').removeClass('configRejected');
    if (this.state.hasClass('accepted')) {
      this.element.addClass('configAccepted');
    } else if (this.state.hasClass('rejected')) {
      this.element.addClass('configRejected');
    } else {
      this.element.addClass('configNormal');
    }
    var newL = $("<li>");
    newL.append(this.element);
    configurations.append(newL);
    this.element.show();
  }
  this.toString = function() {
    return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
  }
};

//======================
// Save/Load
// save PDA as XML
pda.serializeToXML = function () {
  var text = '<?xml version="1.0" encoding="UTF-8"?>';
  text = text + "<structure>";
  text = text + "<type>pda</type>"
    text = text + "<automaton>"
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
        text = text + '<pop/>';
      } else {
        text = text + '<pop>' + wSplit[1] + '</pop>';
      }
      if (wSplit[2] === emptystring) {
        text = text + '<push/>';
      } else {
        text = text + '<push>' + wSplit[2] + '</push>';
      }
      text = text + '</transition>';
    }
  }
  text = text + "</automaton></structure>"
    return text;
};
pda.loadFAFromJFLAPFile = function (url) {
	var parser,
		xmlDoc,
		text,
		jsav = this.jsav;
	$.ajax( {
		url: url,
		async: false, // we need it now, so not asynchronous request
		success: function(data) {
		  text = data;
		}
  });
  this.initFromXML(text);
}
// load a PDA from a XML file
pda.initFromXML = function(text) {
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
  if (xmlDoc.getElementsByTagName("type")[0].childNodes[0].nodeValue !== 'pda') {
      alert('File does not contain a pushdown automaton.');
      // clear input
      var loaded = $('#loadbutton');
      loaded.wrap('<form>').closest('form').get(0).reset();
      loaded.unwrap();
      return;
  } else {
    var nodes = this.nodes();
    for (var node = nodes.next(); node; node = nodes.next()) {
      this.removeNode(node);
    }
    // $('.jsavgraph').off();
  }
  var nodeMap = {};     // map node IDs to nodes
  var xmlStates = xmlDoc.getElementsByTagName("state");
  xmlStates = _.sortBy(xmlStates, function(x) {return x.id;})
  var xmlTrans = xmlDoc.getElementsByTagName("transition");
  for (var i = 0; i < xmlStates.length; i++) {
    var x = Number(xmlStates[i].getElementsByTagName("x")[0].childNodes[0].nodeValue);
    var y = Number(xmlStates[i].getElementsByTagName("y")[0].childNodes[0].nodeValue);
    var newNode = this.addNode({left: x, top: y});
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
    var pop = xmlTrans[i].getElementsByTagName("pop")[0].childNodes[0];
    var push = xmlTrans[i].getElementsByTagName("push")[0].childNodes[0];
    if (!read) {
      read = emptystring;
    } else {
      read = read.nodeValue;
    }
    if (!pop) {
      pop = emptystring;
    } else {
      pop = pop.nodeValue;
    }
    if (!push) {
      push = emptystring;
    } else {
      push = push.nodeValue;
    }
    this.addEdge(nodeMap[from], nodeMap[to], {weight: read + "," + pop + ";" + push});
  }
  this.layout();
};

/*
   Function to get the stack alphabet for a PDA
   Returns an array.
 */
pda.getStackAlphabet = function () {
  var alphabet = [];
  var edges = this.edges();
  var w;
  for (var next = edges.next(); next; next = edges.next()) {
    w = next.weight();
    w = toColonForm(w);
    w = w.split('<br>');
    for (var i = 0; i < w.length; i++) {
      var letter1 = w[i].split(':')[1],
          letter2 = w[i].split(':')[2],
          letters;
      if (letter1 !== this.emptystring && letter2 !== this.emptystring) {
        letters = letter1.split('').concat(letter2.split(''));
      } else if (letter1 !== this.emptystring) {
        letters = letter1.split('');
      } else if (letter2 !== this.emptystring) {
        letters = letter2.split('');
      } else {
        break;
      }
      for (var j = 0; j < letters.length; j++) {
        if (letters[j] !== this.emptystring && alphabet.indexOf(letters[j]) === -1){
          alphabet.push(letters[j]);
        }
      }
    }
  }
  return alphabet;
};

pda.updateAlphabetFunction = pda.updateAlphabet;
pda.updateAlphabet = function() {
  this.updateAlphabetFunction();
  $("#alphabet").html("" + Object.keys(this.alphabet).sort());
  var sa = this.getStackAlphabet();
  $('#stackalphabet').html(emptystring + "," + sa.sort());
}

pda.setupControls = function() {
  var t = this; 
  var $configView = $('#configurations');
  $('.jsavbegin').click(function() {
    $configView.empty();
    $configView.append(t.configViews[0]);
    t.step = 0;
  });
  $('.jsavend').click(function() {
    $configView.empty();
    $configView.append(t.configViews[t.configViews.length - 1]);
    t.step = t.configViews.length - 1;
  });
  $('.jsavforward').click(function() {
    if (t.step >= t.configViews.length - 1) return;
    t.step++;
    $configView.empty();
    $configView.append(t.configViews[t.step]);
  });
  $('.jsavbackward').click(function() {
    if (t.step <= 0) return;
    t.step--;
    $configView.empty();
    $configView.append(t.configViews[t.step]);
  });
};
}(jQuery));
/**********************************************************************************
 * Code form PDAState.js
 */
/*
  Class for vizualization of a current state in  a pda traversal
  Shows current stack, unreadinput, and the node it represents
  */
 (function($) {
 function PDAState(jsav, x_coord, y_coord, rect_width, rect_height, input, stack, node) {
    
  this.jsav = jsav;
  this.x_coord = x_coord;
  this.y_coord = y_coord;
  this.rect_height = rect_height;
  this.rect_width = rect_width;
  this.input = input.split('');
  this.stack = stack

  this.outline = this.jsav.g.rect(this.x_coord, this.y_coord, this.rect_width, this.rect_height);
  this.stackViz = this.jsav.ds.stack(this.stack, this.x_coord + 5, this.y_coord + 5, this.rect_height - 5)
  this.inputViz = this.jsav.ds.stack(this.input, this.x_coord + 40, this.y_coord + 5,this.rect_width - 40, 'horizontal')
  this.nodeViz = this.jsav.g.circle(this.x_coord + 85, this.y_coord + 60, 15, {fill: 'yellow'})
  this.label = this.jsav.label(node, {left: this.x_coord + 75, top: this.y_coord + 35})
  this.label.css({"z-index": 999})
  //this.node  = this.jsav.ds.node(this.x_coord + 5, this.y_coord + 5)
}

// Add the Stack constructor to the public facing JSAV interface.
JSAV.ext.ds.PDAState = function(x_coord, y_coord, rect_width, rect_height, input, stack, node, options) {
  return new PDAState(this, x_coord, y_coord, rect_width, rect_height, input, stack, node);
};
// JSAV.utils.extend(PDAState, JSAV._types.ds.AVArray);

var PDAStateproto = PDAState.prototype

PDAStateproto.hide = function() {
  this.outline.hide()
  this.stackViz.hide()
  this.inputViz.hide()
  this.nodeViz.hide()
  this.label.hide()
}
}(jQuery));
/*****************************************************************
 * Code from formal_lang/fa/Stack.js
 */
/*
  Stack class implementation
  Extended from the JSAV array class.
  element is an array with values to put into the tape
  x_coord is the x-coordinate
  y-coord is the y-coordinate
  */
(function($) {

 function Stack(jsav, element, x_coord, y_coord, max_length, options) {
  this.cell_size = 30;

  this.jsav = jsav;
  this.stack = element;
  this.displayStack = null;
  this.x_coord = x_coord;
  this.y_coord = y_coord;
  this.options = options;
  this.arr = null
  this.max_length = max_length
  
  if ($.isArray(element)) {

    //default position of array's top center and call JSAV array constructor
    var left_arr = String(x_coord) + "px";
    var top_arr = String(y_coord - 16) + "px";
    this.formStack()
    if(this.options == 'horizontal') {
      this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr});
    }
    else {
      this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr, layout: 'vertical'});
    }

    this.arr.css(0, {"background": "yellow"});

  }

}

// Add the Stack constructor to the public facing JSAV interface.
JSAV.ext.ds.stack = function(element, x_coord, y_coord, max_length, options) {
  return new Stack(this, element, x_coord, y_coord, max_length, options);
};
JSAV.utils.extend(Stack, JSAV._types.ds.AVArray);

var Stackproto = Stack.prototype

Stackproto.update = function(newStack) {
  this.stack = newStack
  this.arr.hide()

  //default position of array's top center and call JSAV array constructor
  var left_arr = String(this.x_coord) + "px";
  var top_arr = String(this.y_coord - 16) + "px";

  this.formStack()
  if(this.options == 'horizontal') {
    this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr});
  }
  else {
    this.arr = this.jsav.ds.array(this.displayStack, {left: left_arr, top: top_arr, layout: 'vertical'});
  }
  
  this.arr.css(0, {"background": "yellow"});
}

Stackproto.hide = function() {
  this.arr.hide()
}

Stackproto.formStack = function() {
  if ( (this.stack.length * this.cell_size) > this.max_length ) {
    var cellsToShow = (this.max_length / this.cell_size) - 1;
    var tempArr = this.stack.slice(0, cellsToShow);
    tempArr.push('...');
    this.displayStack = tempArr;
  } 
  else {
    this.displayStack = this.stack;
  }
}

}(jQuery));