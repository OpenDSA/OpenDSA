"use strict";

  var av = new JSAV("bintreeAV", {"animationMode": "none"});

  JSAV.umsg("This is a test...");

// Setup the tree
  var bt = av.ds.bintree();
  bt.root('root');
  var rt = bt.root();

  rt.left('');
  rt.left().left('A');
  rt.left().right('B');

  // Process About button: Pop up a message with an Alert
function about() {
  var mystring = "Bintree Visualization\nJSAV library version " + JSAV.version();
  alert(mystring);
}

(function($) {
  var context = $("#ssperform");

  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  // Connect action callbacks to the HTML entities
}(jQuery));

/* (function($) {
  var comp = function(a, b) {
    return a - b;
  };

  JSAV._types.ds.BinTree.prototype.insert = function(value) {
    // helper function to recursively insert
    var ins = function(node, insval) 
    {
      var val = node.value();
      if (!val || val === "jsavnull") 
      { // no value in node
        node.value(insval);
      } 
      else if (comp(val, insval) > 0) 
      { // go left
        if (node.left()) {
          ins(node.left(), insval);
        } else {
          node.left(insval);
        }
      } 
      else 
      { // go right
        if (node.right()) 
        {
          ins(node.right(), insval);
        } else 
        {
          node.right(insval);
        }
      }
    };
    if ($.isArray(value)) 
    { // array of values
      for (var i = 0, l = value.length; i < l; i++) 
      {
        ins(this.root(), value[i]);
      }
    } 
    else 
    {
      ins(this.root(), value);
    }
    return this;
  };
}*/

/*
"use strict";

(function ($) {
  /global alert: true, ODSA /
  // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

  // add the layout setting preference
  var arrayLayout = settings.add("layout", {"type": "select",
                      "options": {"bar": "Bar", "array": "Array"},
                      "label": "Array layout: ", "value": "bar"});

  var LIGHT = "rgb(215, 215, 215)";  // For "greying out" array elements
  

  $(document).ready(function () {
    var initData, bh,
        settings = new JSAV.utils.Settings($(".jsavsettings")),
        jsav = new JSAV($('.avcontainer'), {settings: settings}),
        exercise,
        swapIndex;

    jsav.recorded();
    function init() {
      var nodeNum = 10;
      if (bh) {
        bh.clear();
      }


  function bintree() {
    //insert(BINnode rt, INrecord, NodeBounds, level)
    function insert(rt, ir, nb, level) {
      if (rt.value == null) {
        // Return a new leafnode that contains INrecord;
        rt.value = ir;
        rt.isLeaf = true;
        rt.level = level;
        return rt;
      }
      if (rt.isLeaf)
      {
        // Need to make a new internal node and insert both points
        BINnode temp = new BINinternal(EMPTYLEAF, EMPTYLEAF); // Make new internal node
        rt = insert(temp, rt.record, NodeBounds); // Insert the old point
      } // Note that we are falling through to the next case
      // Deal with an internal node
      if (EVEN(level)) { // Branch on X
        if (go left)
          rt.setLeft(insert(rt.left() ...
        else
          rt.setRight(insert(rt.right()...
      } 
      else // Branch on Y
        if (go left) ... (repeat same logic)
    }
  }

}*/