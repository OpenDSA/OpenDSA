//===========================================
/*
Turing Machine class
Holds the tape as a linked list and keeps track of the current position
as well as the beginning of the string.
*/
var Tape = function (str) {
  // if the tape is initialized using a string, writes the string to the new tape
  if (typeof str === 'string') {
    this.head = makeTape(str);
    this.current = this.head.right()[0];  // the current symbol
    this.currentIndex = 0;                // the current position
  }
  // else, assume that a Tape object was passed in, and create a copy of it
  else {
    var copy = copyTape(str);
    this.head = copy[0];
    this.current = copy[1];
    this.currentIndex = str.currentIndex;
  }
  // Returns the string written on the tape starting from the head of the string, including empty squares
  this.toString = function() {
    var temp = this.head,
        ret = "";
    while (temp) {
      ret += temp.value();
      temp = temp._right;
    }
    return ret;
  };
  // Move the tape left and set the new head of the string
  this.left = function() {
    var next = this.current.left();
    this.current = next[0];
    this.currentIndex--;
    if (next[1]) {
      this.head = next[1];
    }
    return this.current;
  };
  // Move the tape right
  this.right = function() {
    var next = this.current.right();
    this.current = next[0];
    this.currentIndex++;
    return this.current;
  };
  // Write to the current position
  this.value = function (newVal) {
    return this.current.value(newVal);
  };
  // Move the tape and read the symbol
  this.move = function (str) {
    if (str === "L") {
      return this.left();
    } else if (str === "R") {
      return this.right();
    } else if (str === "S") {
      return this.current;
    }
  };
};
// Tape linked list node
var TapeNode = function (left, right, val) {
  this._left = left;
  this._right = right;
  if (typeof val === "undefined") {
    //this._value = "";
    this._value = String.fromCharCode(9633);
  } else {
    this._value = val;
  }
  // Return the value written at this position or write a symbol to this position
  this.value = function (newVal) {
    if (typeof newVal === "undefined") {
      return this._value;
    } else {
      this._value = newVal;
      return this._value;
    }
  };
  /*
  Traverse left or right and read.
  If can't, create empty tape nodes.
  Returns an array containing the read symbol and the new head of the string
  */
  this.left = function (n) {
    if (this._left) {
      return [this._left];
    } else {
      if (!n) { n = 10; }
      return extendTape("left", this, n);
    }
  }
  this.right = function (n) {
    if (this._right) {
      return [this._right];
    } else {
      if (!n) { n = 10; }
      return extendTape("right", this, n);
    }
  }
};
// Function to initialize the linked list from an inputted string
var makeTape = function (str) {
  var prev = new TapeNode(null, null);
  var head = prev;
  for (var i = 0; i < str.length; i++) {
    var temp = new TapeNode(prev, null, str.charAt(i));
    prev._right = temp;
    prev = temp;
  }
  return head;
};
// Function to initialize the linked list by copying the inputted tape
var copyTape = function (t) {
  var prev = new TapeNode(null, null, t.current.value());
  var cur = prev;
  var temp = t.current._right;
  while (temp) {
    var next = new TapeNode(prev, null, temp.value());
    prev._right = next;
    prev = next;
    temp = temp._right;
  }
  prev = cur;
  temp = t.current;
  while (temp._left) {
    var next = new TapeNode(null, prev, temp._left.value());
    prev._left = next;
    prev = next;
    temp = temp._left;
  }
  return [temp, cur];
};
/*
Creates n empty tape nodes to the beginning or end of the tape
and returns the read symbol and the leftmost/rightmost new node
*/
var extendTape = function (dir, node, n) {
  if (dir === 'left') {
    var next = new TapeNode(null, node),
        prev = next;
    node._left = next;
    for (var i = 0; i < n - 1; i++) {
      var temp = new TapeNode(null, prev);
      prev._left = temp;
      prev = temp;
    }
    return [next, prev];
  }
  if (dir === 'right') {
    var next = new TapeNode(node, null),
        prev = next;
    node._right = next;
    for (var i = 0; i < n - 1; i++) {
      var temp = new TapeNode(prev, null);
      prev._right = temp;
      prev = temp;
    }
    return [next, prev];
  }
};
/*
Function to get the tape alphabet.
Should maybe be added as a FA method.
*/
var getTapeAlphabet = function (graph) {
  var alphabet = [];
  var edges = graph.edges();
  var w;
  for (var next = edges.next(); next; next = edges.next()) {
    w = next.weight();
    w = w.split('<br>');
    for (var i = 0; i < w.length; i++) {
      var t = w[i].split('|');
      for (var k = 0; k < t.length; k++) {
        var letter1 = t[k].split(':')[0],
            letter2 = t[k].split(':')[1],
            letters;
        if (letter1 !== graph.emptystring && letter2 !== graph.emptystring) {
          letters = letter1.split('').concat(letter2.split(''));
        } else if (letter1 !== graph.emptystring) {
          letters = letter1.split('');
        } else if (letter2 !== graph.emptystring) {
          letters = letter2.split('');
        } else {
          break;
        }
        for (var j = 0; j < letters.length; j++) {
          if (letters[j] !== graph.emptystring && alphabet.indexOf(letters[j]) === -1){
            alphabet.push(letters[j]);
          }
        }
      }
    }
  }
  return alphabet;
};
/*
Function to get the tape "viewport".
This returns a string showing the current position and the seven
symbols to the left and right of the current position.
The current position is highlighted as well.
*/
var viewTape = function (t) {
  var arr = new Array(15);    // arbitrary size
  for (var i = 0; i < 15; i++) {
    arr[i] = String.fromCharCode(9633);;
  }
  i = 7;
  var temp = t.current;
  while (temp) {
    if (i < 0) {break;}
    arr[i] = temp.value();
    i--;
    temp = temp._left;
  }
  i = 7;
  temp = t.current;
  while (temp) {
    if (i >= arr.length) {break;}
    arr[i] = temp.value();
    i++;
    temp = temp._right;
  }
  var view = "|";
  for (var i = 0; i < arr.length; i++) {
    if (i === 7) {
      view+="<mark>" + arr[i] + "</mark>";
    } else {
      view+=arr[i];
    }
  }
  view+="|";
  return view;
};
