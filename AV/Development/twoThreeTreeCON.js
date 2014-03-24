(function ($) {
  "use strict";
  function positionRow(array_nodes, top, container_width, row_width, left_offset) {
    var total_width, node_width, offset, left;
    node_width = extractNumber(array_nodes[0].css("width"));
    total_width = node_width * array_nodes.length;
    offset = (row_width - total_width) / (array_nodes.length - 1);

    if (typeof(left_offset) == "undefined") {
      left_offset = 0;
    }
    left = (container_width - row_width)/2 + left_offset;

    for (var i = 0; i < array_nodes.length; i++) {
      array_nodes[i].css({"left": left + "px", "top": top + "px", "position": "absolute"})
      left +=  node_width + offset;
    }
  }

  function drawEdge(jsav, properties, arrayFrom, arrayTo, edgeIndex, length) {
    var top, left, height, width, step, x1, y1, x2, y2;

    // Get coordinates for the x1 and y1 of the edge.
    height = extractNumber(arrayFrom.css("height"));
    width = extractNumber(arrayFrom.css("width"));
    top = extractNumber(arrayFrom.css("top"));
    left = extractNumber(arrayFrom.css("left"));
    step = width / length;

    x1 = left + (step * edgeIndex);
    y1 = top + height;
    if (edgeIndex == 0) {
      x1 += 2;
      y1 -= 2;
    } else if (edgeIndex == length) {
      x1 -= 2;
      y1 -= 2;
    }

    // Get coordinates for the x2 and y2 of the edge.
    height = extractNumber(arrayTo.css("height"));
    width = extractNumber(arrayTo.css("width"));
    top = extractNumber(arrayTo.css("top"));
    left = extractNumber(arrayTo.css("left"));

    x2 = left  + (width / 2);
    y2 = top + 1;

    // Create line and return object.
    return jsav.g.line(x1, y1, x2, y2, properties);
  }

  function extractNumber(pixels) {
    return parseFloat(pixels.substring(0, pixels.length - 2));
  }

  var ODSA = {};
  ODSA.drawEdge = drawEdge;
  ODSA.positionRow = positionRow;
  Window.ODSA = ODSA;
}(jQuery));

// Create diagram for twoThreeTreeCON.
(function ($) {
  "use strict";

  var jsav = new JSAV("twoThreeTreeCON");

  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11;
  // Create all the arrays that represent the nodes in the 2-3 tree.
  var width = 560;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 450);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);

  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2
  Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);
}(jQuery));

// Create slide show for simpleInsertCON
(function ($) {
  "use strict";
  var jsav = new JSAV("simpleInsertCON");

  /* 1st Slide *************************************************************/
  jsav.umsg("Simple insert into the 2-3 tree.");
  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12;
  // Create all the arrays that represent the nodes in the 2-3 tree.
  var width = 700;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 450);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);
  arr12 = jsav.ds.array([14], {left: "250px", top: "0px", visible: false});
  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2
  var line1, line5;
  line1 = Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  line5 = Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);
  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 14 is inserted into the tree. The value is first compared agains the root node.\nSince 14 is less than the left value of the root node it follows the left child node.");
  arr12.show();
  arr1.highlight(0);
  line1.css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only one element, and 14 is greater than 12 so the center child is followed next.");
  line1.css({"stroke": "black"});
  arr1.unhighlight(0);
  arr12.css({left: "110px", top: "40px"});
  arr2.highlight(0);
  line5.css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has an empty space the new node can be inserted here.");
  line5.css({"stroke": "black"});
  arr2.unhighlight(0);
  arr12.css({left: "150px", top: "200px"});
  arr6.highlight(0);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg("The new key 14 is less than 15 so the key 15 has to be moved to the right to make room for the new key.");
  arr6.unhighlight(0);
  arr6.swap(0, 1, {arrow: false});
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg("Finally the key 14 is inserted into the 2-3 tree.");
  arr6.value(0, 14);
  arr12.hide();
  // Mark the slide show as finished.
  jsav.recorded();

}(jQuery));

// Create slide show for promoteCON
(function ($) {
  "use strict";
  var jsav = new JSAV("promoteCON");

  /* 1st Slide *************************************************************/
  jsav.umsg("A simple node-splitting insert for a 2-3 tree.");
  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12, arr13;
  // Create all the arrays that represent the nodes in the 2-3 tree.
  var width = 780;
  arr1 = jsav.ds.array([18, 13]);
  Window.ODSA.positionRow([arr1], 0, width, 70);
  arr2 = jsav.ds.array([12, ""]);
  arr3 = jsav.ds.array([23, 30]);
  arr4 = jsav.ds.array([48, ""]);
  Window.ODSA.positionRow([arr2, arr3, arr4], 80, width, 450);
  arr5 = jsav.ds.array([10, ""]);
  arr6 = jsav.ds.array([15, ""]);
  arr7 = jsav.ds.array([20, 21]);
  arr8 = jsav.ds.array([24, ""]);
  arr9 = jsav.ds.array([31, ""]);
  arr10 = jsav.ds.array([45, 47]);
  arr11 = jsav.ds.array([50, 52]);
  Window.ODSA.positionRow([arr5, arr6, arr7, arr8, arr9, arr10, arr11], 160, width, 560);
  arr12 = jsav.ds.array([55], {left: "340px", top: "0px", visible: false});
  arr13 = jsav.ds.array(["", ""], {left: "560px", top: "160px", visible: false});
  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2
  var line3, line10;
  Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  line3 = Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  line10 = Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);
  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 55 is inserted into the tree. The value is first compared agains the root node.\nSince 55 is more than the right value of the root node it follows the right child node.");
  arr12.show();
  arr1.highlight(1);
  line3.css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only one element, and 55 is greater than 48 so the center child is followed next.");
  line3.css({"stroke": "black"});
  arr1.unhighlight(1);
  arr12.css({left: "480px", top: "40px"});
  arr4.highlight(0);
  line10.css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.");
  line10.css({"stroke": "black"});
  arr4.unhighlight(0);
  arr12.css({left: "500px", top: "200px"});
  arr11.highlight(0);
  arr11.highlight(1);
  jsav.step();

  /* 5th Slide *************************************************************/
  jsav.umsg("Now that the leaf node has being split, the largest key will go on the newly created node. The smallest key will go on the old node, and the middle value will be promoted.");
  arr12.css({left: "540px", top: "200px"});
  arr13.show();
  arr6.unhighlight(0);
  jsav.step();

  /* 6th Slide *************************************************************/
  jsav.umsg("The middle value, 52, is now promoted to the parent node.");
  arr11.value(1, "");
  arr12.value(0, 52);
  arr13.value(0, 55);
  arr12.highlight(0);
  arr11.unhighlight(0);
  arr11.unhighlight(1);
  jsav.step();

  /* 7th Slide *************************************************************/
  jsav.umsg("Since 52 is greater than 48, it is placed on the right, and the pointer to the newly created node is stablished.");
  arr12.css({left: "520px", top: "40px"});
  arr12.unhighlight(0);
  jsav.step();

  /* 8th Slide *************************************************************/
  jsav.umsg("The new value has being inserted into the tree.");
  arr12.hide();
  arr4.value(1, 52);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr13, 2, length);
  jsav.step();
  // Mark the slide show as finished.
  jsav.recorded();

}(jQuery));

// Create slide show for splitCON
(function ($) {
  "use strict";
  var jsav = new JSAV("splitCON");

  /* 1st Slide *************************************************************/
  jsav.umsg("Example of inserting a record that causes the 2-3 tree root to split.");
  // Create all the arrays that represent the nodes in the 2-3 tree.
  var arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10, arr11, arr12, arr13, arr14;
  arr1 = jsav.ds.array([18, 13], {left: "290px", top: "80px"});
  arr2 = jsav.ds.array([12, ""], {left: "50px", top: "160px"});
  arr3 = jsav.ds.array([23, 30], {left: "290px", top: "160px"});
  arr4 = jsav.ds.array([48, ""], {left: "530px", top: "160px"});
  arr5 = jsav.ds.array([10, ""], {left: "-40px", top: "240px"});
  arr6 = jsav.ds.array([15, ""], {left: "50px", top: "240px"});
  arr7 = jsav.ds.array([20, 21], {left: "210px", top: "240px"});
  arr8 = jsav.ds.array([24, ""], {left: "290px", top: "240px"});
  arr9 = jsav.ds.array([31, ""], {left: "370px", top: "240px"});
  arr10 = jsav.ds.array([45, 47], {left: "450px", top: "240px"});
  arr11 = jsav.ds.array([50, 52], {left: "530px", top: "240px"});

  arr12 = jsav.ds.array([19], {left: "240px", top: "50px", visible: false});
  arr13 = jsav.ds.array(["", ""], {left: "210px", top: "240px", visible: false});
  arr14 = jsav.ds.array(["", ""], {left: "330px", top: "160px", visible: false});


  // Create lines that connect all the nodes.
  var properties = {"stroke-width": 1.5};
  var length = 2
  var line2, line3, line6, line7, line8, line10;
  Window.ODSA.drawEdge(jsav, properties, arr1, arr2, 0, length);
  line2 = Window.ODSA.drawEdge(jsav, properties, arr1, arr3, 1, length);
  line3 = Window.ODSA.drawEdge(jsav, properties, arr1, arr4, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr5, 0, length);
  Window.ODSA.drawEdge(jsav, properties, arr2, arr6, 1, length);
  line6 = Window.ODSA.drawEdge(jsav, properties, arr3, arr7, 0, length);
  line7 = Window.ODSA.drawEdge(jsav, properties, arr3, arr8, 1, length);
  line8 = Window.ODSA.drawEdge(jsav, properties, arr3, arr9, 2, length);
  Window.ODSA.drawEdge(jsav, properties, arr4, arr10, 0, length);
  line10 = Window.ODSA.drawEdge(jsav, properties, arr4, arr11, 1, length);
  // set initial display for first slide.
  jsav.displayInit();

  /* 2nd Slide *************************************************************/
  jsav.umsg("The value 19 is inserted into the tree. The value is first compared agains the root node.\nSince 19 is more than the left value and less than the right value of the root node it follows the center child node.");
  arr12.show();
  arr1.highlight(1);
  arr1.highlight(0);
  line2.css({"stroke": "red"});
  jsav.step();

  /* 3rd Slide *************************************************************/
  jsav.umsg("This node has only two elements, and 19 is less than 23 so the left child is inspected next.");
  line3.css({"stroke": "black"});
  line2.css({"stroke": "black"});
  arr1.unhighlight(1);
  arr1.unhighlight(0);
  arr12.css({left: "240px", top: "140px"});
  arr3.highlight(0);
  line6.css({"stroke": "red"});
  jsav.step();

  /* 4th Slide *************************************************************/
  jsav.umsg("A leaf node has being reached. Since the leaf node has no empty spaces it will have to be split.");
  line10.css({"stroke": "black"});
  arr3.unhighlight(0);
  arr12.css({left: "220px", top: "280px"});
  arr7.highlight(0);
  arr7.highlight(1);
  jsav.step();

  // Mark the slide show as finished.
  jsav.recorded();

}(jQuery));
