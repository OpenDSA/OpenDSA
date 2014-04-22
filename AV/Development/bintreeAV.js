"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {
  var comp = function(a, b) {
    return a - b;
  };
  
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
    this.root = this.tree.root('');

    console.log("I'm making a new Bintree object. root = ", this.root);
    // Set the root as an empty node
    this.root.NodeType = NT.EMPTYEXT;

    // Don't forget to refresh the tree layout
    this.tree.layout();

    // Getter function for the root
    this.getRoot = function () {
      console.log("getRoot: ", this.root);
      return this.root;
    };
    
    // Tests to see if the tree is empty 
    this.isEmpty = function () {
      var returning = (this.root.NodeType === NT.EMPTYEXT);
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
    this.add = function(INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {
      this.root = this.insert(this.root, INx, INy, INrec, Bx, By, Bwid, Bhgt, level);
      this.tree.layout();
    }

    // returns a node!
    this.insert = function(rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {
      
      jsav.step();
      this.tree.layout();
      console.log("Bintree insert: BEGIN: ", INrec, ", Level:", level);
      
      console.assert(rt != null, "rt not defined");

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
        
        // Create the new nodes and set them as 
        var tp = this.newInteralNode();
        var tpl = this.newEmptyExtNode();
        var tpr = this.newEmptyExtNode();
        tp.left(tpl);
        tp.right(tpr);

        // Insert the old data
        this.insert(tp, rt.x, rt.y, rt.value(), Bx, By, Bwid, Bhgt, level);

        // Insert new data
        this.insert(tp, INx, INy, INrec, Bx, By, Bwid, Bhgt, level);

        // Debug line
        console.log("Finished inserting data for the leaf subtree");
       
        this.tree.layout();

        // Return the new subtree to replace the leaf node
        return tp;
      }

      // If it isn't a leaf, then we have an internal node to insert into
      if (level % 2 == 0) // Branch on X
      {
        if (rt.x < (Bx + Bwid/2)) // Insert left
        {

          console.log("Branch on X, Insert Left");
          jsav.umsg("Branch on X, Insert Left");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid/2, Bhgt, level+1));
        }
        else
        {

          console.log("Branch on X, Insert Right: ", rt.right());
          jsav.umsg("Branch on X, Insert Right");
          rt.right(this.insert(rt.right(), INx, INy, INrec, Bx + Bwid/2, By, Bwid/2, Bhgt, level+1));
        }
      }

      else // Branch on Y
      {
        if (rt.y < (By + Bhgt/2)) // Insert left
        {

          console.log("Branch on Y, Insert Left: ", rt.left());
          jsav.umsg("Branch on Y, Insert Left");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid, Bhgt/2, level+1));
        }
        else
        {

          console.log("Branch on Y, Insert Right: ", rt.right());
          jsav.umsg("Branch on Y, Insert Right");
          rt.right(this.insert(rt.right(), INx, INy, INrec, Bx, By + Bhgt/2, Bwid, Bhgt/2, level+1));
        }
      }

      this.tree.layout();
      return rt;
    } // insert



    this.delete = function (rt, INx, INy, Bx, By, Bwid, Bhgt, level) {
      console.assert( !(rt.leaf == true && rt.empty == true), "Cannot be an empty leaf during delete");

      if (rt.leaf) {
        if (rt.x == INx && rt.y == INy)
        {
          var temp = tree.newNode('');
          temp.leaf = true;
          temp.empty = true;
          return temp;
        }
        // else ERROR: THIS IS IMPOSSIBLE;
      };

      // We have an internal node
      if (level % 2 == 0) // Branch on X
      {
        if (INx < (Bx + Bwid/2)) // delete left
        {
          console.log("Branch on X, Delete Left");
          rt.left(delete(rt.left(), INx, INy, Bx, By, Bwid/2, Bhgt, level+1));
        }
        else
        {
          console.log("Branch on X, Delete Right");
          rt.right(delete(rt.right(), INx, INy, Bx + Bwid/2, By, Bwid/2, Bhgt, level+1));
        }
      }
        
      else // Branch on Y
      {
        if (INy < (By + Bhgt/2)) // Insert left
        {
          rt.left(delete(rt.left(), INx, INy, Bx, By, Bwid, Bhgt/2, level+1));
        }
        else
          rt.right(delete(rt.right(), INx, INy, Bx, By + Bhgt/2, Bwid, Bhgt/2, level+1));
      }
    
      tree.layout();

      // Now, check to see if there should be a merge
      if ((rt.left().leaf == true && rt.left().empty == true) && (rt.right().leaf))
      {
        return rt.right();
      }
      if ((rt.left().leaf) && (rt.right().leaf && rt.left.empty))
      {
        return rt.left();
      }

      // Otherwise, return just the rt subtree without a merge
      return rt;
    
    } // delete

  } // bintree
  
  var arr;

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
    var bint = new Bintree(jsav, 200, 200);
    console.log("I just made a new Bintree, and bint.root is: ", bint.getRoot());
    bint.isEmpty();
    jsav.displayInit();

    jsav.step();
  
    // Setup the tree
    jsav.umsg("Step 1: insert node with value \"A\" @ 100, 100");
    
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(100, 100, "A", 100, 100, 200, 200, 0);
    bint.isEmpty();
  
    jsav.step();

    // Insert another object
    jsav.umsg("Step 2: insert node with value \"B\" @ 50, 50");
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(50, 50, "B", 100, 100, 200, 200, 0);

    jsav.step();

    jsav.umsg("Step 2: insert node with value \"C\" @ 175, 175");
    //bint.add(175, 175, "C", 100, 100, 200, 200, 0);

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