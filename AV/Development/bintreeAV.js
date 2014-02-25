"use strict";
/*global alert: true, ODSA */
/*global sweep */
(function ($) {

  
  
  function Bintree() {

    //var jsav = new JSAV($('.avcontainer'));

    var root;
    
    this.isEmpty = function () {
      console.log("Bintree isEmpty test: ", root == null);
      return (root == null);
    }

    this.insert = function (rootnode, inrecor, nodebounds, level) {
      if (rootnode == null) {
        return (root.value = inrecor);
      }
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
