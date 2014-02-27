"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {

  
  
  function Bintree() {

    function node(val, lev) {

      var value = val;
      var level = lev;
      var internal = false;
      var leftChild = null;
      var rightChild = null;

      this.setInternal = function () {
        internal = true;
      }

      this.setLeaf = function () {
        internal = false;
      }

      this.isInternal = function () {
        return internal;
      }

      this.setValue = function (val) {
        value = val;
      }

      this.setLevel = function (lev) {
        level = lev;
      }

      this.setLeftChild = function (lc) {
        leftChild = lc;
        return (leftChild);
      }

      this.setRightChild = function (rc) {
        rightChild = rc;
        return (rightChild);
      }

      this.getValue = function () {
        return value;
      }
      this.getLevel = function () {
        return level;
      }

      this.isLeaf = function () {
        if (leftChild == null && rightChild == null) {
          return true;
        }
        return false;
      }
    }

    //var jsav = new JSAV($('.avcontainer'));

    var root = new node();
    
    this.isEmpty = function () {
      console.log("Bintree isEmpty test: ", root == null);
      return (root == null);
    }

    this.insert = function (rootnode, inrecor, nodebounds, level) {
      console.log("Bintree insert: ", inrecor);

      if (rootnode == null) {
        console.log("Bintree given rootnode is null, level: ", level);
        rootnode = new node(inrecor, level);
        return (rootnode);
      }
      
      if (rootnode.isLeaf()) {
        console.log("Bintree given rootnode is a leaf. Insert an internal node in it's place and continue.");
        var temp = new node(null, null);
        temp.setInternal();
        rootnode = insert(temp, rt.getValue, nodebounds, null)
      } // Note, it will continue into the next if statement!


    }


  }

  var jsav, // for JSAV library object av
      arr;  // for the JSAV array

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
    jsav.displayInit();

// Setup the tree
  var bt = jsav.ds.bintree();
  var bint = new Bintree();
  bint.isEmpty();
  bint.insert(bint.root, 100, 0,0);
   bint.isEmpty();

  bt.root('');
  var rt = bt.root();


    jsav.umsg("Step 1");

    jsav.step();
rt.left('');
  
    jsav.umsg("All Done!");

    rt.left().left('A');
  rt.left().right('B');

    jsav.recorded(); // mark the end

  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

  

}(jQuery));
