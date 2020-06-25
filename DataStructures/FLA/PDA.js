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

  if(options.url){
    this.loadFAFromJFLAPFile(options.url);
  }
}

JSAV.ext.ds.PDA = function (options) {
  var opts = $.extend(true, {visible: true, autoresize: true}, options);
  return new PDA(this, opts);
};

JSAV.utils.extend(PDA, JSAV._types.ds.Graph);

PDA.prototype = Object.create(Automaton.prototype, {});
window.PDA = PDA;
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

var first_stack = 1;
var endSymbol = "";
pda.resetCount = function() {
   first_stack = 1;
   endSymbol = "";
}
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
          if(first_stack == 1 ){
            if (t[1] === l.join('') || t[1] === "z") {
              var nextConfig = new Configuration(this.configurations, next, curStack, s, nextIndex);
              if (t[2] !== emptystring){
                for (var h = t[2].length - 1; h >= 0; h--) {
                  if(t[2].charAt(t[2].length - 1) != "" ){
                    endSymbol = t[2].charAt(t[2].length - 1)
                  }
                  nextConfig.stack.push(t[2].charAt(h));
                }
              }
              next.addClass('current');
              nextStates.push(nextConfig);
             } 
          }
          else if(first_stack == s.length + 1 && endSymbol == ""){
            if (l.join('') === "Z" || l.join('') === "z") {
              var nextConfig = new Configuration(this.configurations, next, curStack, s, nextIndex);
              if (t[2] !== emptystring){
                for (var h = t[2].length - 1; h >= 0; h--) {
                  nextConfig.stack.push(t[2].charAt(h));
                }
              }
              next.addClass('current');
              nextStates.push(nextConfig);
             } 
          }
          else if (t[1] === l.join('')) {
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
  first_stack = first_stack + 1;
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

/**
 * Saves the PDA as an XML file with formatting.
 */
pda.serializeToXML = function () {
  var text = '<?xml version="1.0" encoding="UTF-8"?>';
  text = text + "<structure>" + "\n";
  text = text + "\t" + "<type>pda</type>" + "\n";
    text = text + "\t" + "<automaton>" + "\n";
    var nodes = this.nodes();
  for (var next = nodes.next(); next; next = nodes.next()) {
    var left = next.position().left;
    var top = next.position().top;
    var i = next.hasClass("start");
    var f = next.hasClass("final");
    var label = next.stateLabel();
    text = text + "\t\t" + '<state id="' + next.value().substring(1) + '" name="' + next.value() + '">' + "\n";
    text = text + "\t\t\t" + '<x>' + left + '</x>' + "\n";
    text = text + "\t\t\t" + '<y>' + top + '</y>' + "\n";
    if (label) {
      text = text + '<label>' + label + '</label>';
    }
    if (i) {
      text = text + "\t\t\t" + '<initial/>' + "\n";
    }
    if (f) {
      text = text + "\t\t\t" + '<final/>' + "\n";
    }
    text = text + "\t\t" + '</state>' + "\n";
  }
  var edges = this.edges();
  for (var next = edges.next(); next; next = edges.next()) {
    var fromNode = next.start().value().substring(1);
    var toNode = next.end().value().substring(1);
    var w = next.weight().split('<br>');
    for (var i = 0; i < w.length; i++) {
      text = text + "\t\t" + '<transition>' + "\n";
      text = text + "\t\t\t" + '<from>' + fromNode + '</from>' + "\n";
      text = text + "\t\t\t" + '<to>' + toNode + '</to>' + "\n";
      w[i] = toColonForm(w[i]);
      var wSplit = w[i].split(":");
      if (wSplit[0] === emptystring) {
        text = text + "\t\t\t" + '<read/>' + "\n";
      } else {
        text = text + "\t\t\t" + '<read>' + wSplit[0] + '</read>' + "\n";
      }
      if (wSplit[1] === emptystring) {
        text = text + "\t\t\t" + '<pop/>' + "\n";
      } else {
        text = text + "\t\t\t" + '<pop>' + wSplit[1] + '</pop>' + "\n";
      }
      if (wSplit[2] === emptystring) {
        text = text + "\t\t\t" + '<push/>' + "\n";
      } else {
        text = text + "\t\t\t" + '<push>' + wSplit[2] + '</push>' + "\n";
      }
      text = text + "\t\t" + '</transition>' + "\n";
    }
  }
  text = text + "\t" + "</automaton>" + "\n" + "</structure>"
    return text;
};
pda.loadFAFromJFLAPFile = function (url) {
	var parser,
		xmlDoc,
		text,
    jsav = this.jsav;
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
    var state = 'q'+ String(xmlStates[i].id);
    var newNode = this.addNode({value: state,left: x, top: y});
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
 var PDAState = function (jsav, x_coord, y_coord, rect_width, rect_height, input, stack, node) {
    
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
window.PDAState = PDAState;
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

 var Stack = function (jsav, element, x_coord, y_coord, max_length, options) {
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
window.Stack = Stack;
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

/*****************************************************************
 * Code from ParseTree.js
  */
 (function($) {
  var lambda = String.fromCharCode(955),
  epsilon = String.fromCharCode(949),
  square = String.fromCharCode(9633),
  dot = String.fromCharCode(183),
  arrow = String.fromCharCode(8594),
  emptystring = lambda;
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ParseTreeController = function(jsav, grammar, string, treeOptions) {
      this.init(jsav, grammar, string, treeOptions);
    };
    
    var controllerProto = ParseTreeController.prototype;
    window.ParseTreeController = ParseTreeController;
    controllerProto.init = function(jsav, grammar, string, treeOptions){
        this.jsav = jsav;
        this.productions = JSON.parse(grammar);
        this.inputString = string;
        this.parseTree = this.jsav.ds.tree(treeOptions);
        this.derivationTree = {};
    }
    
    controllerProto.removeLambdaHelper = function (set, productions) {
      for (var i = 0; i < productions.length; i++) {
        if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
          if (!(productions[i][0] in set)) {
            set[productions[i][0]] = true;
            return true;
          }
        }
      }
      return false;
    };
  
    controllerProto.stringAccepted = function(){
        var inputString = this.inputString;
      if(inputString === "!"){
        inputString = "";
      }
      var productions = this.productions;
      var table = {};   // maps each sentential form to the rule that produces it
      var sententials = [];
      var next;
      // assume the first production is the start variable
      for (var i = 0; i < productions.length; i++) {
        if (productions[i][0] === productions[0][0]) {
          if (productions[i][2] === emptystring) {
            sententials.push('');
            table[''] = [i, ''];
          } else {
            sententials.push(productions[i][2]);
            table[productions[i][2]] = [i, ''];
          }
        }
      }
      var derivers = {};  // variables that derive lambda
      var counter = 0;
      // find lambda deriving variables
      while (this.removeLambdaHelper(derivers, productions)) {
        counter++;
        if (counter > 5000) {
          console.warn(counter);
          var confirmed = confirm('This is taking a while. Continue?');
          if (confirmed) {
            counter = 0;
          } else {
            break;
          }
        }
      };
      var hasLambda = function(productions){
          for (var i = 0; i < productions.length; i++)
            if (productions[i][2] === emptystring)
              return true;
          return false;
      }
      if(hasLambda(productions)){
      derivers = Object.keys(derivers);
      // parse
      counter = 0;
      //var queue = [];
      var queue = new Set();
      //queue.push(productions[0][0]);
      queue.add(productions[0][0]);
      for(let nextValue = queue.values().next(); nextValue.done !== true; nextValue = queue.values().next()){
        if(counter > 10000){
          break;
        }
        var next = nextValue.value;
        queue.delete(next);

        if(this.removeLambda(next) === inputString){
          return [true, next, table];
        }
        for(var i = 0; i < this.replaceLHS(productions, next).length; i++){
          var newString = this.replaceLHS(productions, next)[i];
          if(!shouldSkipString(inputString, newString)){
            queue.add(newString);
            table[this.replaceLHS(productions, next)[i]] = next;
          }
        }
        counter++;
      }
      return [false, next, table];
    }
      else
      {
          derivers = Object.keys(derivers);
      // parse
      counter = 0;
      var queue = new Set();
      queue.add(productions[0][0]);
      for(let nextValue = queue.values().next(); nextValue.done !== true; nextValue = queue.values().next()){
        var next = nextValue.value;
        if(next === undefined)
          return [false, null, table];//I added this line to reject a string not in the grammar. For grammar exercise controller
        queue.delete(next);
        if(next.length > inputString.length)
        {
          counter--;
          continue;
        }
        
        if(this.removeLambda(next) === inputString){
          return [true, next, table];
        }
        for(var i = 0; i < this.replaceLHS(productions, next).length; i++){
          var newValue = this.replaceLHS(productions, next)[i];
          if(!shouldSkipString(inputString, newValue))
            if(newValue.length <= inputString.length)
              {
                queue.add(newValue);
                table[this.replaceLHS(productions, next)[i]] = next;
              }
        }
        counter++;
      }
      return [false, next, table];
      }
    }
    controllerProto.replaceLHS = function(productions, sentential){
      result = [];
      for (var i = 0; i < productions.length; i++) {
        for (var j = 0; j < sentential.length; j++) {
          for (var k = 1; k < sentential.length + 1 - j; k++) {
            var subString = sentential.substring(j, j + k);
            if (subString === (productions[i][0])) {
              var newString = sentential.substring(0, j) + productions[i][2]
                    + sentential.substring(j + k, sentential.length);
  
                          result.push(newString);
                          this.derivationTree[newString] = [productions[i], sentential];
            }
          }
        }
      }
      return result;
    }
  
    controllerProto.removeLambda = function(string){
      for(var i = 0; i < string.length; i++){
        if(string[i] === lambda){
          string = string.replace(lambda, "");
        }
      }
      return string;
    }
    controllerProto.displayTree = function(){
      var inputString = this.inputString;
      var productions = this.productions;
  
      var table = {};   // maps each sentential form to the rule that produces it
      var next;
      var accepted = this.stringAccepted(inputString);
      if (accepted[0]) {
        table = this.derivationTree;
        //this.jsav.umsg('"' + inputString + '" accepted');
        var temp = accepted[1];
        var results = [];   // derivation table
        counter = 0;
        // go through the map of sentential forms to productions in order to get the trace
        do {                // handles the case where inputstring is the emptystring
          counter++;
          if (counter > 500) {
            console.warn(counter);
            break;
          }
          var rp = table[temp][0].join("");
          results.push([rp, temp]);
          temp = table[temp][1];
        } while (table[temp] && temp);
  
        results.reverse();
        // set up display
        
        //var displayOrder = [];  // order in which to display the nodes of the parse tree
        // create the parse tree using the derivation table
        this.jsav.umsg("The root of the parse tree is the grammar start variable");
        this.parseTree.root(results[0][0].split(arrow)[0]);
        var root = this.parseTree.root();
        var sentential = [root]; //order of sentential form nodes
        //var displayOrderParents = [];  //order of parent nodes
        //var level = new Map(); //a map from node to level(left and top position)
        //level.set(root, [0,0]); // add root node
        //displayOrder.push(root);
  
        for (var i = 0; i < results.length; i++) {
            this.jsav.step();
            this.jsav.umsg("We substitute in the production " + results[i][0]);
          var lhsProd = results[i][0].split(arrow)[0];
          var rhsProd = results[i][0].split(arrow)[1];
          //find correct lhs in sentential
          var sententialString = "";
          for(var j = 0; j < sentential.length; j++){
            //join all nodes to make a sentential string
            sententialString += sentential[j].value();
          }
          //make the production compatible to this.replaceLHS function
          var pro = results[i][0].split(arrow);
          pro.push(pro[1]);
          pro[1] = "" ;
          var lhsOccur;
          //compare this.replaceLHS to results[i][1]
          for(var j = 0; j < this.replaceLHS([pro],sententialString).length; j++){
            if(this.replaceLHS([pro], sententialString)[j] === results[i][1]){
              //record the jth occurrence of lhs
              lhsOccur = j;
            }
          }
  
          //convert lhsOccur to actual index number of the sententialString
          var count = 0;
          var realIndex = 0;
          while(true){
            var index = sententialString.indexOf(results[i][0].split(arrow)[0]);
            realIndex += index;
            if(count === lhsOccur){
              break;
            }else{
              sententialString = sententialString.substring(index+1);
              realIndex++;
            }
            count++;
          }
  
          //addEdgesFromLHStoRHS();
          var children = [];
          for(var l = 0; l < rhsProd.length; l++){
            var newNode = this.parseTree.newNode(rhsProd[l]);
            children.push(newNode);
            for(var r = 0; r < lhsProd.length; r++){
              sentential[realIndex + r].addChild(newNode);
             
            }
            //construct a map from node to position([left, top])
            //level.set(newNode, [50*(l+realIndex) ,50 + 50*i]);
            this.parseTree.layout();
          }
          //displayOrderParents.push(sentential.slice(realIndex, realIndex + lhsProd.length));
          //removelhsProdfromSentential and addrhsProdtoSentential
          var temp1 = sentential.slice(0, realIndex);
          var temp2 = sentential.slice(realIndex + lhsProd.length);
          sentential = temp1.concat(children);
          sentential = sentential.concat(temp2);
          //displayOrder.push(children);
        }
  
        //updateWidth(parseGraph, root);
        //highlightTerminal(sentential);
        //layoutTable(derivationTable);
        this.parseTree.layout();/*
        // hide the whole tree except for the start node and hide the derivation table
        for(var i = 0; i < this.parseTree.nodes().length; i++){
          this.parseTree.nodes()[i].hide();
        }
        root.show();
        //hide all edges
        for(var i = 0; i < this.parseTree.edges().length; i++){
          this.parseTree.edges()[i].hide();
        }
  
        // create slideshow stepping through derivation table and parse tree
        this.jsav.displayInit();
        var parents = displayOrder.shift();
        for (var i = 0; i < results.length; i++) {
          this.jsav.step();
  
          var parents = displayOrderParents.shift();
          var nodes = displayOrder.shift();
          for (var j = 0; j < nodes.length; j++) {
            nodes[j].show({recursive: false});
  
            //find the deepest level of the parents
            var deepestLevel = -1;
            for(var l = 0; l < parents.length; l++){
              if(level.get(parents[l])[1] > deepestLevel){
                deepestLevel = level.get(parents[l])[1];
              }
            }
            for(var l = 0; l < parents.length; l++){
              if(level.get(parents[l])[1] != deepestLevel){
                var newParent = this.parseTree.addNode(parents[l].value(), {left: level.get(parents[l])[0],top: deepestLevel});
                this.parseTree.addEdge(parents[l], newParent);
                this.parseTree.addEdge(newParent, nodes[j]);
                parents[l].css({'background': "black"});
              }else{
                parents[l].edgeTo(nodes[j]).show();
              }
            }
            this.parseTree.layout();
            //add a rectangle background to show combining nodes
            if(parents.length > 1){
              //show combining nodes with a rectangle
              var rect = jsav.g.rect(183+leftMostPosition(parents,level),  46 + (productions.length-1)*29.5+deepestLevel, results[i][0].split(arrow)[0].length * 50, 50, {stroke: "orange", "stroke-width": 4});
            }
          }
          parents = nodes;
        }*/
        this.jsav.recorded();
      }
    }
  
    var shouldSkipString = function (target, proposedString){
      var numberOfTerminals = getTheNumberOfTerminals(proposedString);
      if(numberOfTerminals <= target.length){
      for(var i = 0; i< target. length; i++){
        if(variables.indexOf(proposedString[i]) <0 && proposedString[i] != lambda){ //not a varuialble so compare the letters
          if(target[i] !== proposedString[i])
            return true;
        }
        else // a variable or a terminal
          return false;
      }
  
    }
    else
      return true;
  }
    var getTheNumberOfTerminals = function (proposedString){
      var count =0;
      for(var i = 0; i<proposedString.length; i++)
        if(variables.indexOf(proposedString[i])<0 && proposedString[i] !== lambda)
          count++;
      return count;
    }
  
}(jQuery));


/*****************************************************************
 * Code from ContextFreeGrammarTransformer.js
  */
 (function($) {
  var lambda = String.fromCharCode(955),
  epsilon = String.fromCharCode(949),
  square = String.fromCharCode(9633),
  dot = String.fromCharCode(183),
  arrow = String.fromCharCode(8594),
  emptystring = lambda;
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var ContextFreeGrammarTransformer = function(jsav, grammar) {
      this.init(jsav, grammar);
    };
    window.ContextFreeGrammarTransformer = ContextFreeGrammarTransformer;

    var transformerProto = ContextFreeGrammarTransformer.prototype;
    transformerProto.init = function(jsav, grammar){
      this.jsav = jsav;
      this.productions = JSON.parse(grammar);
      this. varCounter = 1;
  }
  // remove lambda productions
  transformerProto.removeLambda = function (GrammarMatrix) {
    var derivers = {};  // variables that derive lambda
    var productions = this.productions;
    var counter = 0;
    // find lambda-deriving variables
    this.jsav.umsg("We need to identify the productions that produce " + emptystring);
    while (this.removeLambdaHelper(derivers, productions, GrammarMatrix)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    if (productions[0][0] in derivers) {
      alert('The start variable derives '+emptystring+'.');
    }
    this.jsav.step();
    var transformed = [];
    // remove lambda productions
    productions = _.filter(productions, function(x) { return x[2] !== emptystring;});
    transformed = transformed.concat(productions);
    this.jsav.umsg("Now we need to replace any production that has an occuarance for a Varialble that produces a " + emptystring);
    var newGrammarMatrix = this.jsav.ds.matrix(productions, {style: "table", left: 210});
    this.jsav.step();
    for (var i = 0; i < productions.length; i++) {
      if(i>0){
        newGrammarMatrix.unhighlight(i-1, 0);
        newGrammarMatrix.unhighlight(i-1, 1);
        newGrammarMatrix.unhighlight(i-1, 2);
        newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
        this.jsav.umsg("Replacing the variable(s) that produce(s) " + emptystring + " will add these new productions");
        this.jsav.step();
      }
      newGrammarMatrix.highlight(i, 0);
      newGrammarMatrix.highlight(i, 1);
      newGrammarMatrix.highlight(i, 2);
      var p = productions[i];
      // find lambda deriving variables in right hand side
      var v = _.filter(p[2], function(x) { return x in derivers;});
      if (v.length > 0) {
        this.jsav.umsg("Production " + productions[i] + " has variable"+ (v.length>1?"s ":" ") + " that produce"+ (v.length>1?" ":"s ") + emptystring);
        v = v.join('');
        for (var j = v.length - 1; j >= 0; j--) {
          // remove all combinations of lambda-deriving variables
          var n = getCombinations(v, j + 1);
          for (var next = n.next(); next.value; next = n.next()) {
            var replaced = p[2];
            for (var k = 0; k < next.value.length; k++) {
              replaced = replaced.replace(next.value[k], "");
            }
            // if not a lambda production
            if (replaced && !_.find(transformed, function(x) {return x[0] === p[0] && x[2] === replaced})) {
              transformed.push([p[0], arrow, replaced]);
            }
          }
        }
      }
      
      else{
        this.jsav.umsg("Production " + productions[i] + " does not have any variable that produces " + emptystring);
        
      }
      this.jsav.step();
    }
    newGrammarMatrix.unhighlight(i-1, 0);
    newGrammarMatrix.unhighlight(i-1, 1);
    newGrammarMatrix.unhighlight(i-1, 2);
    newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
    this.jsav.umsg("Replacing the variable(s) that produce(s) " + emptystring + " will add these new productions");
    this.jsav.step();
    var ret = _.map(transformed, function(x) {return x.join('');});
    this.jsav.umsg("The resulting grammar is " + emptystring + " free");
    GrammarMatrix.hide();
    this.jsav.step();
    return ret;
  };
  
  /*
  Function to find lambda-deriving variables.
  A variable derives lambda if it directly produces lambda or if its right side is
  composed only of lambda-deriving variables.
  Used during parsing as well.
  */
  transformerProto.removeLambdaHelper = function (set, productions, GrammarMatrix) {
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2] === emptystring || _.every(productions[i][2], function(x) { return x in set;})) {
        if (!(productions[i][0] in set)) {
          GrammarMatrix.highlight(i,0);
          GrammarMatrix.highlight(i,1);
          GrammarMatrix.highlight(i,2);
          set[productions[i][0]] = true;
          return true;
        }
      }
    }
    return false;
  };
  // check if browser supports generators
  var isGeneratorSupported = function () {
    try {
      eval("(function*(){})()");
      return true;
    } catch(err){
      console.log(err);
      console.log("No generator support.");
      return false;
    }
  }
  // creates a generator for the combinations of variables to remove
  
    var getCombinations = function* (str, l) {
      for (var i = 0; i < str.length; i++) {
        if (l === 1) {
          yield [str[i]];
        } else {
          var n = getCombinations(str.substring(i + 1), l - 1);
          for (var next = n.next(); next.value; next = n.next()) {
            yield [str[i]].concat(next.value);
          }
        }
      }
    };
  
  // remove unit productions
  transformerProto.removeUnit = function (GrammarMatrix) {
    this.originalMatrix = GrammarMatrix;
    var productions = this.productions;
    var pDict = {};
    // a dictionary mapping left sides to right sides
    for (var i = 0; i < productions.length; i++) {
      if (!(productions[i][0] in pDict)) {
        pDict[productions[i][0]] = [];
      }
      pDict[productions[i][0]].push(productions[i][2]);
    }
    var v = [];
      for (var i = 0; i < productions.length; i++) {
        if (v.indexOf(productions[i][0]) === -1) {
          v.push(productions[i][0]);
        }
    }
    var modelDFA = this.jsav.ds.graph({layout: "layered", directed: true, left: 420});
    for (var i = 0; i < v.length; i++) {
      modelDFA.addNode(v[i]);
    }
    var unitProductions = _.filter(productions, function(x) {
      // return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
      return x[2].length === 1 && variables.indexOf(x[2]) !== -1;
    });
    modelDFA.layout();
    var nodes1 = modelDFA.nodes();
    for (var from = nodes1.next(); from; from = nodes1.next()) {
      var nodes2 = modelDFA.nodes();
      for(var to = nodes2.next(); to; to = nodes2.next()){
        if (_.find(unitProductions, function(x) {return x[0] === from.value() && x[2] === to.value();})) {
          this.jsav.umsg("The production " + from.value() + arrow + to.value() + " is a unit production.");
          var newEdge = modelDFA.addEdge(from, to);
          if (newEdge) { modelDFA.layout();}
          this.jsav.step();
        }
      } 
    }
    this.jsav.umsg("The next step is to replace them by substituting each variable with its RHS value")
    this.jsav.step();
    var emptyLine = _.filter(productions, function(x) { return true;});
    for(var i = 0; i< 3*productions.length; i++)
      emptyLine.push(["", arrow, ""]);
    this.newGrammerMatrix = this.jsav.ds.matrix(emptyLine, {style: "table", left: 210});
    for(var i = 0; i< 3*productions.length; i++)
      this.newGrammerMatrix._arrays[productions.length + i].hide();
    var counter = 0;
    while (this.removeUnitHelper(productions, pDict)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    // remove original unit productions
    productions = _.filter(productions, function(x) {
      return !(x[2].length === 1 && variables.indexOf(x[2]) !== -1);
    });
    var ret = _.map(productions, function(x) {return x.join('');});
    this.jsav.umsg("The resulting grammar has no unit productions.")
    this.originalMatrix.hide();
    modelDFA.hide();
    this.jsav.step();
    return ret;
  };
  
  // Function to find a unit production and add one of the replacement productions
  transformerProto.removeUnitHelper = function (productions, pDict) {
    for (var i = 0; i < productions.length; i++) {
      if (productions[i][2].length === 1 && variables.indexOf(productions[i][2]) !== -1) {
        var p = pDict[productions[i][2]];
        var n = [];
        for (var j = 0; j < p.length; j++) {
          if (p[j].length === 1 && variables.indexOf(p[j]) !== -1) {
            continue;
          } else if (!_.find(productions, function(x){ return x[0] === productions[i][0] && x[2] === p[j];})) {
            n.push(p[j]);
          }
        }
        var newProductions = [];
        this.newGrammerMatrix._arrays[i].hide();
        for(var k = 0; k < n.length; k++) {
          productions.push([productions[i][0], arrow, n[k]]);
          newProductions.push([productions[i][0], arrow, n[k]].join(''));
          this.newGrammerMatrix._arrays[productions.length - 1].show();
          this.newGrammerMatrix._arrays[productions.length - 1]._indices[0].value(productions[productions.length - 1][0]);
          this.newGrammerMatrix._arrays[productions.length - 1]._indices[2].value(n[k]);
          highlightProductionByIndex(this.newGrammerMatrix, productions.length - 1);
          pDict[productions[i][0]].push(n[k]);
        }
        if(n.length > 0){
          highlightProductionByIndex(this.originalMatrix, i);
          this.jsav.umsg("The production " + productions[i].join('') + " is a unit production. It will be replaced by " +  newProductions.join(', '));
          this.jsav.step();
          unhighlightMatrix(this.originalMatrix);
          unhighlightMatrix(this.newGrammerMatrix);
        }
      }
    }
    return (n.length > 0);
  };
  
   // remove useless productions
  transformerProto.removeUseless = function (matrix) {
    this.GrammarMatrix = matrix;
    this.jsav.umsg("To remove useless productions, we need to check for two things.\n1) Productions that do not produce a terminal string (No infinity loop).\n2) Productions that are not reachable from the start variable. ")
    this.jsav.step();
    var derivers = {};  // variables that derive a string of terminals
    var productions = this.productions;
    var counter = 0;
    var newGrammarMatrix;
    this.jsav.umsg("We will start by looking for procutions that produce an infinity loop. In other words, productions that will not produce terminal string.");
    this.jsav.step();
    while (this.findDerivable(derivers, productions)) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
    };
    var transformed = [];
    // remove productions which do not derive a string of terminals
    for (var i = 0; i < productions.length; i++) {
      if (_.every(productions[i][2], function(x) { return x in derivers || variables.indexOf(x) === -1;})) {
        transformed.push(productions[i]);
      }
    }
    if(transformed.length === productions.length){
      this.jsav.umsg("In this grammar, all productions can produce terminal strings.");
      this.jsav.step();
    }
    else{//we need to test this
      diff = getGrammarVariables(productions).filter(function(x) { return getGrammarVariables(transformed).indexOf(x) < 0 });
      for(var l = 0; l< diff.length; l++) {
        this.jsav.umsg("Variable " + diff[l][0] + " does not produce terminal strings. It should be removed from the grammar.")
        highlightProductionWithVariableOccurance(this.GrammarMatrix, diff[l][0]);
        this.jsav.step();
      }
      this.jsav.umsg("This is the resulting grammar after the first step.")
      GrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210});
      unhighlightMatrix(this.GrammarMatrix);
      this.jsav.step();
    }
    
    this.jsav.umsg("Then, we need to check the reachability of the variables. We can use dependency graph to help us identifying unreachable variables.")
    this.jsav.step();
    this.jsav.umsg("In the dependency graph, each variable is a state and an edge $(u, v)$ means that node $v$ can be reached from node $u$.")
    var modelDFA = this.jsav.ds.graph({layout: "layered", directed: true, left: 500});
    var top = 0;
    var vairables = getGrammarVariables(transformed);
    for (var i = 0; i < vairables.length; i++) {
      var a = modelDFA.addNode(vairables[i]);
      top+=50;
    }
    modelDFA.layout({layout: 'automatic'});
    this.jsav.step();
    var pDict = {};   // dictionary to hold reachable variables
    var start = transformed[0][0];
    for (var i = 0; i < transformed.length; i++) {
      if (!(transformed[i][0] in pDict)) {
        pDict[transformed[i][0]] = [];
      }
      // map left hand side to the variables in the right hand side
      var r = _.uniq(_.filter(transformed[i][2], function(x) {return variables.indexOf(x) !== -1;}));
      pDict[transformed[i][0]] = _.union(pDict[transformed[i][0]], r);
    }
    var visited = {};
    visited[start] = true;
    // find reachable variables and map them in pDict
    this.findReachable(start, pDict, visited);
    var nodes1 = modelDFA.nodes();
    for (var from = nodes1.next(); from; from = nodes1.next()) {
      var nodes2 = modelDFA.nodes();
      for(var to = nodes2.next(); to; to = nodes2.next()){
        if (_.find(transformed, function(x) {return x[0] === from.value() && x[2].indexOf(to.value()) !== -1;})){
          unhighlightMatrix(GrammarMatrix);
          this.jsav.umsg("Variable " + to.value() + " is reachable from " + from.value());
          highlightProductionGivenFromTO(GrammarMatrix, from.value(), to.value());
          var asd = modelDFA.addEdge(from, to);
          asd.layout();
          modelDFA.layout();
          this.jsav.step();
        }
      } 
    }
    unhighlightMatrix(GrammarMatrix);
    // remove unreachable productions
    transformed = _.filter(transformed, function(x) { return x[0] === start || pDict[start].indexOf(x[0]) !== -1;});
    this.jsav.umsg("Removing all unreachable variables will give the final grammar.");
    GrammarMatrix.hide();
    var newGrammarMatrix = this.jsav.ds.matrix(transformed, {style: "table", left: 210, top: 0});;
    this.jsav.step();
    var ret = _.map(transformed, function(x) {return x.join('');});
    return ret;
  };
  // Function to get variables which can derive a string of terminals
  transformerProto.findDerivable = function (set, productions) {
    for (var i = 0; i < productions.length; i++) {
      unhighlightMatrix(this.GrammarMatrix);
      if (_.every(productions[i][2], function(x) { return x in set || variables.indexOf(x) === -1;})) {
        if (!(productions[i][0] in set)) {
          set[productions[i][0]] = true;
          this.jsav.umsg("The variable " + productions[i][0] + " produces terminal strings.");
          highlightProduction(this.GrammarMatrix, productions[i][0]);
          this.jsav.step();
          return true;
        }
      }
    }
    return false;
  };
  // dfs on the dictionary
  transformerProto.findReachable = function (start, pDict, visited) {
    for (var i = 0; i < pDict[start].length; i++) {
      if (!(pDict[start][i] in visited)) {
        visited[pDict[start][i]] = true;
        this.findReachable(pDict[start][i], pDict, visited);
        pDict[start] = _.union(pDict[start], pDict[pDict[start][i]]);
  
      }
  
    }
  };
  
  // convert to Chomsky Normal Form
  transformerProto.convertToChomsky = function (GrammarMatrix) {
    var v = {};
    var emptyLine = _.filter(this.productions, function(x) { return true;});
    for(var i = 0; i< 3*this.productions.length; i++)
      emptyLine.push(["", arrow, ""]);
    var newGrammerMatrix = this.jsav.ds.matrix(emptyLine, {style: "table", left: 210});
    for(var i = 0; i< 3*this.productions.length; i++)
      newGrammerMatrix._arrays[this.productions.length + i].hide();
    // find all the variables in the grammar
    var productions = this.productions;
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      // change RHS to an array
      x[2] = x[2].split("");
      v[x[0]] = true;
      for (var j = 0; j < x[2].length; j++) {
        if (variables.indexOf(x[2][j]) !== -1) {
          v[x[2][j]] = true;
        }
      }
    }
    // an array of all the temporary variables
    var tempVars = [];
    // counter for D(n) variables
    var varCounter = 1;
    // replace terminals with equivalent variables where necessary
    for (var i = 0; i < productions.length; i++) {
      unhighlightMatrix(newGrammerMatrix);
      if (productions[i][2].length === 1 && variables.indexOf(productions[i][2][0]) === -1) {
        this.jsav.umsg("This production " + productions[i].join('') + " is in Comskey normal form. So no need to modify it.");
        highlightProductionByIndex(newGrammerMatrix, i);
        this.jsav.step();
        continue;
      } else {
        var r = productions[i][2];
        for (var j = 0; j < r.length; j++) {
          if (r[j].length === 1 && variables.indexOf(r[j]) === -1) {
            var temp = "B(" + r[j] + ")";
            if (!_.find(productions, function(x) { return x[0] === temp;})) {
              this.jsav.umsg("This production " + productions[i].join('') + " is not in Comskey normal form. The terminal " + r[j] +" will be converted to " + temp + ". We need to add a new production " + [temp, arrow, [r[j]]].join('') + " to the grammar productions");
              highlightProductionByIndex(newGrammerMatrix, i);
              this.jsav.step();
              productions.push([temp, arrow, [r[j]]]);
              addNewProduction(newGrammerMatrix, [temp, arrow, [r[j]]], productions.length)
              highlightProductionByIndex(newGrammerMatrix, productions.length - 1);
              tempVars.push(temp);
            }
            r[j] = temp;
            modifyProduction(r.join(''), newGrammerMatrix, i, 2);
          }
        }
      }
    }
    var jsav = this.jsav;
    // Function to break productions down into pairs of variables
    var chomskyHelper = function () {
      
      for (var i = 0; i < productions.length; i++) {
        var r = productions[i][2];
        if (r.length === 1 && variables.indexOf(r[0]) === -1) {
          
          continue;
        } else if (r.length > 2) {
          highlightProductionByIndex(newGrammerMatrix, i);
          jsav.umsg("The production " + productions[i].join('') +  " has more than 2 variables on its RHS.");
          jsav.step();
          var temp = "D(" + varCounter + ")";
          var temp2 = r.splice(1, r.length - 1, temp);
          var present = _.find(productions, function(x) { return x[0].length > 1 && x[2].join('') === temp2.join('');});
          if (present) {
            r[1] = present[0];
          } else {
            jsav.umsg("We need to add a new production " + [temp, arrow, temp2].join('') +". And replace " +temp2 + " by " + temp + " in the original production.");
            jsav.step();
            productions.push([temp, arrow, temp2]);
            addNewProduction(newGrammerMatrix, [temp, arrow, temp2], productions.length)
            modifyProduction(r.join(''), newGrammerMatrix, i, 2);
            tempVars.push(temp);
            varCounter++;
          }
          return true;
        }
      }
      return false;
    };
    var counter = 0;
    jsav.umsg("The next step is to convert any production that has more than 2 variables on the RHS to Chomsky normal from.");
    unhighlightMatrix(newGrammerMatrix);
    jsav.step();
    while (chomskyHelper()) {
      counter++;
      if (counter > 500) {
        console.log(counter);
        break;
      }
      unhighlightMatrix(newGrammerMatrix);
    }
    for (var i = 0; i < productions.length; i++) {
      var x = productions[i];
      x[2] = x[2].join("");
    }
    this.jsav.umsg("This is the resulting grammar in Chomsky Normal Form");
    GrammarMatrix.hide();
    this.jsav.step();
    var ret =  _.map(productions, function(x) {return x.join('');});
    return ret;
  };
  var highlightProduction = function(matrix, productionVariable){
    for(var i = 0; i<matrix._arrays.length; i++)  {
      var row = matrix._arrays[i];
      if(row._indices[0].value() === productionVariable){
        for(var j = 0; j<row._indices.length; j++){
          row.highlight(j);
        }
      }
    }
  }
  var highlightProductionByIndex = function(matrix, productionIndex){
  
      var row = matrix._arrays[productionIndex];
        for(var j = 0; j<row._indices.length; j++){
          row.highlight(j);
        }
    }
  var highlightProductionWithVariableOccurance = function(matrix, productionVariable){
    for(var i = 0; i<matrix._arrays.length; i++)  {
      var row = matrix._arrays[i];
      for(var j= 0; j< row._indices.length; j++)
        if(row._indices[j].value().includes(productionVariable)){
          for(var k = 0; k<row._indices.length; k++){
            row.highlight(k);
        }
      }
    }
  }
  var highlightProductionGivenFromTO = function(matrix, from, to){
    for(var i = 0; i<matrix._arrays.length; i++)  {
      var row = matrix._arrays[i];
      if(row._indices[0].value() === from){
        for(var j= 0; j< row._indices.length; j++)
          if(row._indices[j].value().includes(to)){
            for(var k = 0; k<row._indices.length; k++){
              row.highlight(k);
          }
        }
      }
    }
  }
  var unhighlightMatrix = function(matrix){
    for(var i = 0; i<matrix._arrays.length; i++)  {
      var row = matrix._arrays[i];
      for(var j = 0; j<row._indices.length; j++){
          row.unhighlight(j);
      }
    }
  }
  var getGrammarVariables = function(productions){
    var variables = [productions[0][0]];
    for(var i = 1; i< productions.length; i++){
      var found = false;
      for(var j = 0; j< variables.length; j++){
        if(productions[i][0] === variables[j])
          found = true;
      }
      if(!found)
        variables.push(productions[i][0]);
    }
    return variables;
  }
  var drawAnEdge = function(from, to, graph){
    var fromNode, toNode;
    graph.nodes().map(function(node){
      if(node.value() == from)
        fromNode = node;
      if(node.value() == to)
        toNode = node;
    });
    graph.addEdge(fromNode, toNode);
    graph.layout();
  }
  var addNewProduction = function(matrix, listOfData, length){
    matrix._arrays[length - 1].show();
    matrix._arrays[length - 1]._indices[0].value(listOfData[0]);
    matrix._arrays[length - 1]._indices[2].value(listOfData[2]);
  }
  var modifyProduction = function(newValue, matrix, row, col){
    matrix._arrays[row]._indices[col].value(newValue);
  }
}(jQuery));

/*****************************************************************
 * Code from ConvertPDAtoGrammar.js
  */
 (function($) {
  var lambda = String.fromCharCode(955),
  epsilon = String.fromCharCode(949),
  square = String.fromCharCode(9633),
  dot = String.fromCharCode(183),
  arrow = String.fromCharCode(8594),
  emptystring = lambda;
  var variables = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var PDAtoGrammarTransformer = function(jsav, grammar, grammerMatrix) {
      this.init(jsav, grammar, grammerMatrix);
    };
    
  window.PDAtoGrammarTransformer = PDAtoGrammarTransformer;

    var transformerProto = PDAtoGrammarTransformer.prototype;
    transformerProto.init = function(jsav, grammar, grammerMatrix){
      this.jsav = jsav;
      this.productions = JSON.parse(grammar);
      this.matrix = grammerMatrix;
      this. varCounter = 1;
  }
  
  
  transformerProto.convertToPDA = function () {
      var productions = this.productions;
      this.jsav.umsg("The first step is to create a new PDA with three states.")
      this.builtDFA = this.jsav.ds.FA({width: 500, top: 0, left: 250});//We need to find a better way to auto align the PDA instead of 250
      var gWidth = this.builtDFA.element.width(),
          gHeight = this.builtDFA.element.height();
      var a = this.builtDFA.addNode({left: 0.17 * gWidth, top: 0.87 * gHeight}),
          b = this.builtDFA.addNode({left: 0.47 * gWidth, top: 0.87 * gHeight}),
          c = this.builtDFA.addNode({left: 0.77 * gWidth, top: 0.87 * gHeight});
      this.builtDFA.makeInitial(a);
      c.addClass('final');
      var startVar = productions[0][0];
      this.builtDFA.layout();
      this.jsav.step();
      this.convertToPDAinLL(a, b, c, productions, startVar);
      this.builtDFA.disableDragging();
    };
  
    transformerProto.convertToPDAinLL = function(a, b, c, productions, startVar) {
      this.jsav.umsg("Connect the start state with $q_1$ by " + emptystring + ':Z:' + startVar + 'Z');
      this.builtDFA.addEdge(a, b, {weight: emptystring + ':Z:' + startVar + 'Z'});
      this.builtDFA.layout();
      this.jsav.step();
      this.jsav.umsg("Connect $q_1$ state by the final state by " +  emptystring + ':Z:' + emptystring);
      this.builtDFA.addEdge(b, c, {weight: emptystring + ':Z:' + emptystring});
      this.builtDFA.layout();
      this.jsav.step();
      this.jsav.umsg("We need to create a transition from $q_1$ to iteself for every terminal we have.")
      // add a transition for each terminal
      for (var i = 0; i < productions.length; i++) {
        var t = productions[i][2].split("");
        for (var j = 0; j < t.length; j++) {
          if (variables.indexOf(t[j]) === -1 && t[j] !== emptystring) {
              this.builtDFA.addEdge(b, b, {weight: t[j] + ':' + t[j] + ':' + emptystring});
          }
        }
      }
      var bEdge = this.builtDFA.getEdge(b, b);
      //$(bEdge._label.element[0]).css('font-size', '1.4em');
      this.builtDFA.layout();
  
      this.pCount = 0;
      //this.labelHeight = $(bEdge._label.element[0]).height();
      // handler for the grammar table
      this.jsav.step();
      for(var i = 0; i< productions.length; i++){
          this.jsav.umsg("Create a tranistion from $q_1$ to itself for each helighted production.")
          this.convertGrammarHandler(a, b, c, i, this.matrix);
          this.jsav.step();
          this.matrix.unhighlight(i);
      }
    };
    transformerProto.convertGrammarHandler = function (a, b, c,index, matrix) {
      matrix.highlight(index);
    var l = matrix.value(index, 0);
    var r = matrix.value(index, 2);
    var newEdge = this.builtDFA.addEdge(b, b, {weight: emptystring + ':' + matrix.value(index, 0) + ':' + matrix.value(index, 2)});
    if (newEdge) {
      newEdge.layout();
      this.pCount++;
      // scale graph window
      //if ($(newEdge._label.element[0]).offset().top < $('.jsavgraph').offset().top) {
        //var h = $(".jsavgraph").height();
        //var newLabelHeight = $(newEdge._label.element[0]).height();
        //var graphOffset = (newLabelHeight - this.labelHeight) / this.pCount;
        //$(".jsavgraph").height(h + graphOffset);
        //var nodeY = $(a.element).offset().top;
        //$(a.element).offset({top: nodeY + graphOffset});
        //$(b.element).offset({top: nodeY + graphOffset});
        //$(c.element).offset({top: nodeY + graphOffset});
        //this.builtDFA.layout();
      //}
      if (this.pCount === this.productions.length) {
        this.jsav.umsg("Fininshed");
      }
    }
  };
}(jQuery));

/*****************************************************************
 * Code from PDATraverseAccepter.js
  */
 (function($) {

  var willReject = function(graph, inputString, visualize = false){
    graph.initial.addClass('current');
    var configurations = $("<ul>");
    var currentStates = [new Configuration(graph.configurations, graph.initial, ['Z'], inputString, 0)];
    currentStates = graph.addLambdaClosure(currentStates);
    var configArray = null;
    if(!visualize){
      configArray = graph.jsav.ds.array(graph.configurations);
    // var configViews = [];
    graph.configViews.push(configArray.element);
    //var $configView = $('#configurations');
    //$configView.empty();
    //$configView.append(this.configViews[0]);
  
    //this.jsav.displayInit();
    }
    jsav = graph.jsav;
    configurations = $("<ul>");
    for (var j = 0; j < currentStates.length; j++) {
      currentStates[j].update();
    }
    if(!visualize)
      configArray = graph.jsav.ds.array(graph.configurations);
    //this.configViews.push(configArray.element);
  
    var cur;
    counter = 0;
    var stringAccepted = false;
    while (true) {
      if(visualize){
        jsav.umsg("We want to consume the input letter by asd" );
        jsav.step();
      }
      counter++;
      if (counter > 500) {
        break;
      }
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.removeClass('current');
        currentStates[j].state.removeClass('accepted');
        currentStates[j].state.removeClass('rejected');
      }
      cur = graph.traverse(currentStates);
      if (cur.length === 0) {
        break;
      }
      currentStates = cur;
  
      tconfigurations = $("<ul>");
      for (var j = 0; j < currentStates.length; j++) {
        if (currentStates[j].curIndex === inputString.length) {
          if (currentStates[j].state.hasClass('final')) {
            currentStates[j].state.addClass('accepted');
            stringAccepted = true;
          }
        }
        currentStates[j].update();
      }
      if(!visualize)
        configArray = graph.jsav.ds.array(this.configurations);
      //this.configViews.push(configArray.element);
    }
    graph.resetCount();
    return !stringAccepted;
  }

  window.PDAwillReject = willReject;
  
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
    /*this.toString = function() {
      return this.state.value() + ' ' + this.inputString.substring(0, this.curIndex) + ' ' + this.stack.join();
    }*/
  };
  var statesViz = [],
  jsav;
  var run = function(g, inputString) {
    // Start with the closure of the initial state.
    
    var reducedInput = inputString
    jsav = g.jsav;
    g.initial.addClass('current');
    currentStates = [new Configuration(g.configurations, g.initial, ['Z'], inputString, 0)];
  
    var nextStates = currentStates;
    this.configurations = $("<ul>");
  
    // stackViz.update(['Z'])
    var textArray = [];
    for (var i = 0; i < inputString.length; i++) {
      textArray.push(inputString[i]);
    }
    // Use this array to initialize the JSAV array.
    arr = jsav.ds.array(textArray);
    
    var tempViz = jsav.ds.PDAState(30, 200, 150, 100, reducedInput, ['Z'], 'q0')
    statesViz.push(tempViz)
    jsav.displayInit();
  
    while(true) {
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.removeClass('current');
      }
      nextStates = traverse(g, currentStates.slice(0))
      if (nextStates.length == 0) {
        jsav.step();
        break
      }
  
      currentStates = nextStates
      showStatesViz()
      jsav.step();
    }
  
    clearStates()
    var rejected = true;
    for (var k = 0; k < currentStates.length; k++) {
      if(currentStates[k].state.hasClass('accepted')) {
        rejected = false
      }
    }
  
    if (rejected) {
      // If the input string was rejected, color every character in the JSAV array red.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {"background-color": "red"});
      }
      jsav.umsg("Rejected");
    } else {
      // If the input string was accepted, color every character in the JSAV array green.
      for (var l = 0; l < inputString.length; l++) {
        arr.css(l, {"background-color": "green"});
      }
      jsav.umsg("Accepted");
    }
  
    var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      if (next.hasClass('current') && rejected) {
        next.addClass('rejected');
      }
      next.removeClass('current');
    }
    // Add the last step to the slideshow, stop recording the slideshow, and add the click handler to the JSAV array.
    jsav.step();
    jsav.recorded();
    arr.click(arrayClickHandler);
  }
  function arrayClickHandler(index) {
		// Temporarily turn off animation (if it was on).
		var oldFx = $.fx.off || false;
    	$.fx.off = true;
    	// If the step clicked on comes after the current step, increment until you reach that step.
    	if (index > jsav.currentStep() - 1) {
    		while (index > jsav.currentStep() - 1 && jsav._redo.length) {
				jsav.forward();
			}
    	}
    	// If the step clicked on comes before the current step, decrement until you reach that step.
    	if (index < jsav.currentStep() - 1) {
    		while (index < jsav.currentStep() - 1 && jsav._undo.length) {
				jsav.backward();
			}
    	}
    	// If animation was originally on, turn it back on again now.
		$.fx.off = oldFx;
	};
  window.runPDA = run;
  
  var traverse = function(graph, currentStates) {
    var nextStates = []
    for (var i =0; i < currentStates.length; i++) {
      var successors = currentStates[i].state.neighbors();
      var letter = emptystring;
      var inputString = currentStates[i].inputString
      if(inputString.length === 0 && currentStates[i].stack.length === 0) {
        if(currentStates[i].state.hasClass('final')) {
          currentStates[i].state.addClass('accepted')
        }
        else {
          currentStates[i].state.addClass('rejected')
        }
        continue;
      }
      var letter = inputString[0]
      // var reducedInput = inputString.substring(1)
      var curStack = currentStates[i].stack;
      var topOfStack = emptystring
      if(curStack.length != 0) {
        topOfStack = curStack[curStack.length - 1];
        curStack = curStack.slice(0, -1);
      }
      for (var next = successors.next(); next; next = successors.next()) {
        var weight = graph.getEdge(currentStates[i].state, next).weight().split('<br>');
        //Iterate though transitions
        for(var j = 0; j < weight.length; j++){
          var a = weight[j]
          var b = a.split(',')
          var c = b[1].split(';')
          var expectedInput = b[0]
          var expectedStack = c[0]
          var pushOnTo = c[1]
          if ((expectedInput == emptystring || expectedInput == letter) && 
              (expectedStack == emptystring || expectedStack == topOfStack)) {
            next.addClass('current')
            var newStack = curStack
            for(var k = pushOnTo.length - 1; k >= 0; k--) {
              if( pushOnTo[k] != emptystring) {
                newStack = newStack + pushOnTo[k]
              }
            }
            var reducedInput = inputString.substring(1)
            if(expectedInput == emptystring) {
              reducedInput = inputString
            }
            var nextConfig = new Configuration(this.configurations, next, newStack, reducedInput, 0);
            nextStates.push(nextConfig);
          }
        }
  
      }
    }
  
    return nextStates
  }
  
  /*
    Display visualizations for all states that have a current designation
    If you wish to change how it displays you probably only have to change
    width, height, width_spacer, height_spacer, and num_in_row.
  */
  var showStatesViz = function() {
    clearStates();
    var xBase = 30;
    var yBase = 200;
    var width = 150; // Width of the outline of the state vizualizations
    var height = 100; // Height of the outline of the state vizualitions
    var width_spacer = 40; // space between columns
    var height_spacer = 10; // space between rows
    var num_in_row = 5 // number of state vizualizations in a row
  
    for(var i = 0; i < currentStates.length; i++) {
      var config = currentStates[i];
      if( config.state.hasClass('current')) {
        var updatedStack = [''];
        if(config.stack.length > 0){
          updatedStack = config.stack.slice(0).split('')
          updatedStack = updatedStack.slice(0, updatedStack.length).reverse();
        }
  
        var width_shift = statesViz.length % num_in_row;
        var height_shift = Math.floor(statesViz.length / num_in_row);
        var x_coord = xBase + (width + width_spacer) * width_shift;
        var y_coord = yBase + (height + height_spacer) * height_shift
        var tempViz =  jsav.ds.PDAState(x_coord, y_coord, width, height, config.inputString, updatedStack, config.state.value())
        statesViz.push(tempViz)
      }
    }
  }
  
  var clearStates = function() {
    while(statesViz.length != 0) {
      var temp = statesViz.pop();
      temp.hide()
    }
  }
     

}(jQuery));