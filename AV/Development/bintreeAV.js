"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {
  var comp = function(a, b) {
    return a - b;
  };
  
  var theString;

  var Bintree = function (jsav, xrange, yrange) {

    // Enum for the node type
    // stored in node.NodeType
    var NT = {
      INTERNAL : 0,
      EMPTYEXT : 1,
      FULLEXT  : 2
    };

    // This is the JSAV base data structure, a binary tree.
    this.tree = jsav.ds.binarytree({nodegap: 10});
    // This is the root of the tree
    this.tree.root('');

    console.log("I'm making a new Bintree object. root = ", this.tree.root());
    // Set the root as an empty node
    this.tree.root().NodeType = NT.EMPTYEXT;
 
    this.doTrav = function(root) {
      if (root.NodeType === NT.INTERNAL) {
        theString = theString + "I";
        this.doTrav(root.left());
        this.doTrav(root.right());
      }
      else if (root.NodeType === NT.EMPTYEXT)
        theString = theString + "E";
      else if (root.NodeType === NT.FULLEXT)
        theString = theString + root.value();
      else
        console.log("ERROR WITH TRAVERSING TREE");
    }

    this.logtrav = function() {
      theString = "";
      this.doTrav(this.tree.root());
      console.log(theString);
    }

    this.layout = function () {
      console.log("Layout the tree");
      this.logtrav();
      this.tree.layout();
    }

    // Getter function for the root
    this.getRoot = function () {
      console.log("getRoot: ", this.tree.root());
      return this.tree.root();
    };
    
    // Tests to see if the tree is empty 
    this.isEmpty = function () {
      var returning = (this.tree.root().NodeType === NT.EMPTYEXT);
      console.log("Bintree isEmpty test: ", returning);
      return (returning);
    };

    // Helper function for creating a new internal node

    this.newInteralNode = function() {
      var ret = this.tree.newNode('');
      ret.NodeType = NT.INTERNAL;
      return ret;
    }

    this.newEmptyExtNode = function() {
      var ret = this.tree.newNode('');
      ret.NodeType = NT.EMPTYEXT;
      return ret;
    }
    
    // calling function for insertion
    this.add = function(INx, INy, INrec) {
      console.log("Start Insert: ", INrec, " @ (", INx, ", ", INy, ")");
      var temp = this.insert(this.tree.root(), INx, INy, INrec, 0, 0, xrange, yrange, 0);
      console.log("Setting the root to be: " + temp);
      this.tree.root(temp);
      this.layout();
    }

    // returns the root of tree that results from inserting the new record
    this.insert = function(rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {
      console.log("Bintree insert BEGIN: ", INx, INy, ", Level: ", level, ", Box: ", Bx, By, Bwid, Bhgt, ", rt Type: ", rt.NodeType);

      if (level > 15) {
        console.log("EMERGENCY STOP");
        return rt;
      }

      if (rt.NodeType === NT.EMPTYEXT) {
        console.log("insert: encountered empty leaf node: insert data and return")
        jsav.umsg("Insert: Encountered an empty leaf node: Now insert data and return!");
        console.log("Bintree insert: (LEAF) Value = ", INrec);
    
        var temp = this.tree.newNode(INrec); 

        temp.x = INx;
        temp.y = INy;
        temp.NodeType = NT.FULLEXT;
        return temp;
      }
      
      // If the entry is a full leaf
      if (rt.NodeType === NT.FULLEXT) {
        console.log("insert: is a leaf and not empty: ", INrec, rt);
        
        if ((rt.x === INx) && (rt.y === INy)) {
          console.log("ERROR: Tried to reinsert duplicate point");
          jsav.umsg("Error: Tried to reinsert duplicate point");
          return rt;
        }
        // Create the new nodes and set them as 
        var tp = this.newInteralNode();
        var tpl = this.newEmptyExtNode();
        var tpr = this.newEmptyExtNode();
        tp.left(tpl);
        tp.right(tpr);

        var old = rt; 
        rt = tp;

        console.log("Insert old data for insert: ", INrec);
        // Insert the old data
        tp = this.insert(rt, old.x, old.y, old.value(), Bx, By, Bwid, Bhgt, level);

        console.log("Insert new data for insert: ", INrec);
        
        // Fall through and continue inserting the data.
      }

      // If it isn't a leaf, then we have an internal node to insert into
      if (level % 2 == 0) { // Branch on X
        if (INx < (Bx + Bwid/2)) { // Insert left
          console.log("Branch on X, Insert Left: ", rt.left().NodeType);
          jsav.umsg("Branch on X, Insert Left");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid/2, Bhgt, level+1));
        }
        else {
          console.log("Branch on X, Insert Right: ", rt.right().NodeType);
          jsav.umsg("Branch on X, Insert Right");
          rt.right(this.insert(rt.right(), INx, INy, INrec, Bx + Bwid/2, By, Bwid/2, Bhgt, level+1));
        }
      }

      else { // Branch on Y
        if (INy < (By + Bhgt/2)) { // Insert up
          console.log("Branch on Y, Insert up: " + rt.left().NodeType);
          jsav.umsg("Branch on Y, Insert up");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid, Bhgt/2, level+1));
        }
        else {
          console.log("Branch on Y, Insert down: " + rt.right().NodeType);
          jsav.umsg("Branch on Y, Insert down");
          rt.right(this.insert(rt.right(), INx, INy, INrec, Bx, By + Bhgt/2, Bwid, Bhgt/2, level+1));
        }
      }

      return rt;
    } // insert

  } // bintree

  // check query parameters from URL
  var params = JSAV.utils.getQueryParameter();
  if ("increments" in params) { // set value of increments if it is a param
    $('#increments').val(params.increments).prop("disabled", true);
  }

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // add the layout setting preference
  var arrayLayout = settings.add("layout",
    {"type": "select", "options": {"bar": "Bar", "array": "Array"},
     "label": "Array layout: ", "value": "bar"});

  // Initialize the arraysize dropdown list
  ODSA.AV.initArraySize(5, 16, 8);
  
  // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    window.open("bintreeHelpAV.html", 'helpwindow');
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Bintree Visualization\nWritten by Anthony Rinaldi and Cliff Shaffer\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Execute the "Run" button function
  function runIt() {
    
    ODSA.AV.reset(true);

    var jsav = new JSAV($('.avcontainer'));

    jsav.umsg("Let's get started");
    console.log("Setup the Bintree");
    var bint = new Bintree(jsav, 256, 256);
    console.log("I just made a new Bintree, and bint.root is: ", bint.getRoot());
    bint.isEmpty();
    jsav.displayInit();

    jsav.step();
  
    // Setup the tree
    jsav.umsg("Step 1: insert node with value \"A\" @ 125, 125");
    
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(125, 125, "A");
    bint.isEmpty();
  
    jsav.step();

    // Insert another object
    jsav.umsg("Step 2: insert node with value \"B\" @ 50, 50");
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(50, 50, "B");

    jsav.step();

    jsav.umsg("Step 3: insert node with value \"C\" @ 175, 175");
    bint.add(175, 175, "C");

    jsav.step();

    jsav.umsg("Lay it out again");
    bint.layout();
    jsav.step();

  // Done
    jsav.umsg("All Done!");

    jsav.recorded(); // mark the end

  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

}(jQuery));
