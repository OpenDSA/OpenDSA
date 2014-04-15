"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {
  var comp = function(a, b) {
    return a - b;
  };
  
  var Bintree = function (jsav, xrange, yrange) {

    // This is the JSAV base data structure, a binary tree.
    this.tree = jsav.ds.binarytree({nodegap: 10});
    // This is the root of the tree
    this.vrt = this.tree.root('ROOT');

    this.root = this.vrt;
    console.log("I'm making a new Bintree object. root = ", this.root);
    // Set the values of the root node.
    this.vrt.leaf = true;
    this.vrt.empty = true;
    this.vrt.level = 0;

    // The bintree starts with a root node, and two empty leafnodes
    // var newL1  = this.tree.newNode('');
    // var newR1 = this.tree.newNode('');
    // newL1.leaf = true;
    // newR1.leaf = true;
    // newR1.empty = true;
    // newL1.empty = true;
    // this.vrt.left(newL1);
    // this.vrt.right(newR1);

    // Don't forget to refresh the tree layout
    this.tree.layout();

    // Getter function for the tree
    this.getTree = function () {
      console.log("getTree: ", this.tree);
      return this.tree;
    };

    // Getter function for the root
    this.getRoot = function () {
      console.log("getRoot: ", this.root);
      return this.root;
    };
    
    // I don't think this is working correctly
    this.isEmpty = function () {
      var returning = (this.root.leaf == true);
      console.log("Bintree isEmpty test: ", returning);
      return (returning);
    };
    
    this.add = function(INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {
      this.root = this.insert(this.root, INx, INy, INrec, Bx, By, Bwid, Bhgt, level);
      this.tree.layout();
    }

    // returns a node!
    this.insert = function(rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level) {
      //console.assert(rt != null, "rt not defined");

      jsav.step();
      this.tree.layout();
      console.log("Bintree insert: BEGIN: ", INrec, ", Level:", level);
      
      console.assert(rt != null, "rt not defined");

      if (rt.leaf == true && rt.empty == true) {
        console.log("insert: encountered empty leaf node: insert data and return")
        jsav.umsg("Insert: Encountered an empty leaf node: Now insert data and return!");
        console.log("Bintree insert: (LEAF) Value = ", INrec);
    
        var temp = this.tree.newNode(INrec); 
        // this.tree.newNode(INrec);
        // rt = temp;
        //temp.value(INrec);
        temp.x = INx;
        temp.y = INy;
        //temp.tree = true;
        temp.leaf = true;
        temp.empty = false;
        temp.level = level;
        // if (typeof rt === 'undefined')
        // {
        //   rt = temp;
        // }
        //this.tree.layout();
        //jsav.umsg("Finished inserting ", INrec);
        //jsav.step();
        return temp;
      }
      
      // If the entry is a leaf and not empty.
      if (rt.leaf == true && rt.empty == false) {
        console.log("insert: is a leaf and not empty: ", INrec, rt);
        
        var tp = this.tree.newNode('tp');
        tp.left(this.tree.newNode('tl'));
        tp.right(this.tree.newNode('tr'));
        
        //this.tree.layout();

        // Set the levels
        tp.level = level;
        tp.left().level = level + 1;
        tp.right().level = level + 1;

        // Set the internal/external value
        tp.leaf = false;
        tp.left().leaf = true;
        tp.right().leaf = true;

        // Set the emptyness
        tp.empty = true;
        tp.left().empty = true;
        tp.right().empty = true;

        var oldval = rt.value();
        this.insert(tp, rt.x, rt.y, oldval, Bx, By, Bwid, Bhgt, level);
        this.insert(tp, INx,    INy, INrec, Bx, By, Bwid, Bhgt, level);
        console.log("Finished moving down the previous entry");
        //jsav.umsg("Finished moving down the previous entry ", oldval, ".");
        //this.tree.layout();
        //jsav.step();
        return tp;
        // NO Return: Rolls through to next if statement
      }

      // If it isn't a leaf, then we have an internal node to insert into
      if (level % 2 == 0) // Branch on X
      {
        if (rt.x < (Bx + Bwid/2)) // Insert left
        {
          // This ensures that the data will be stored due to an empty node being placed where it is needed to recurse
          if (typeof rt.left() === 'undefined')
          {
            rt.left(this.tree.newNode(''));
            rt.left().leaf = true;
            rt.left().empty = true;
          }

          console.log("Branch on X, Insert Left");
          jsav.umsg("Branch on X, Insert Left");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid/2, Bhgt, level+1));
        }
        else
        {
          if (typeof rt.right() === 'undefined')
          {
            rt.right(this.tree.newNode(''));
            rt.right().leaf = true;
            rt.right().empty = true;
          }

          console.log("Branch on X, Insert Right: ", rt.right());
          jsav.umsg("Branch on X, Insert Right");
          rt.right(this.insert(rt.right(), INx, INy, INrec, Bx + Bwid/2, By, Bwid/2, Bhgt, level+1));
        }
      }

      else // Branch on Y
      {
        if (rt.y < (By + Bhgt/2)) // Insert left
        {
          if (typeof rt.left() === 'undefined')
          {
            rt.left(this.tree.newNode(''));
            rt.left().leaf = true;
            rt.left().empty = true;
          }

          console.log("Branch on Y, Insert Left: ", rt.left());
          jsav.umsg("Branch on Y, Insert Left");
          rt.left(this.insert(rt.left(), INx, INy, INrec, Bx, By, Bwid, Bhgt/2, level+1));
        }
        else
        {

          if (typeof rt.right() === 'undefined')
          {
            rt.right(this.tree.newNode(''));
            rt.right().leaf = true;
            rt.right().empty = true;
          }

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
    console.log("Create the Bintree object");
    var bint = new Bintree(jsav, 200, 200);
    console.log("I just made a new Bintree, and bint.root is: ", bint.getRoot());
    bint.isEmpty();
    jsav.displayInit();

    jsav.step();
  
    // Setup the tree
    jsav.umsg("Step 1: insert node with value \"A\" @ 10, 10");
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(10, 10, "A", 100, 100, 200, 200, 0);
    //bint.isEmpty();
  
    jsav.step();

    // Insert another object
    jsav.umsg("Step 2: insert node with value \"B\" @ 5, 5");
    // rt, INx, INy, INrec, Bx, By, Bwid, Bhgt, level
    console.log("Let's call insert. bint.root is now: ", bint.getRoot());
    bint.add(5, 5, "B", 100, 100, 200, 200, 0);

    jsav.step();

    jsav.umsg("Step 2: insert node with value \"C\" @ 20, 20");
    //bint.add(20, 20, "C", 100, 100, 200, 200, 0);
    //bint.isEmpty();
  
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