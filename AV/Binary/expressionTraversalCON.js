/*global ODSA */
// Traverse an expression tree

// Title: Traverse an expression tree
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Code Tracing Visualization; Algorithm Visualization
// Keyword: Expression Tree; Binary Tree Traversal; Full Binary Tree
// Natural Language: en
// Programming Language: Java

/* Description: Slideshow demonstrating traversal of an expression tree. The primary point is to highlight the node implementation for a full binary tree. */

$(document).ready(function() {
  "use strict";

  var av_name = "expressionTraversalCON";
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var labelTop = 260;

  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  bt.root("-");
  bt.root().addClass("internalnode");
  var rt = bt.root();
  rt.left("*");
  rt.left().addClass("internalnode");
  rt.right("c");
  rt.left().left("*");
  rt.left().left().addClass("internalnode");
  rt.left().left().left("4");
  rt.left().left().right("x");
  rt.left().right("+");
  rt.left().right().addClass("internalnode");
  rt.left().right().right("a");
  rt.left().right().left("*");
  rt.left().right().left().addClass("internalnode");
  rt.left().right().left().left("2");
  rt.left().right().left().right("x");
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  var btLeft =  20;

  av.umsg(interpret("av_preorder"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  preorder(rt);

  av.recorded();

  function preorder(node) {
    // Check if null
    if (typeof node === "undefined") {
      rt1.arrow.hide();
      av.umsg(interpret("av_isnull"));
      pseudo.setCurrentLine("checknull");
      av.step();
      return;
    }

    // Not null, check if leaf
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret("av_isnotnull"));
    pseudo.setCurrentLine("isleaf");
    av.step();

    // Is leaf...
    if (!(node.value() === "*" || node.value() === "+" ||
          node.value() === "-")) {
      rt1.target(node, {anchor: "left top"});
      node.removeClass("processing");
      node.addClass("thicknode");
      av.umsg(interpret("av_visitleaf"));
      pseudo.setCurrentLine("visitleaf");
      btLeft += 25;
      av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
      av.step();
    } else {
      // Is internal...visit
      rt1.target(node, {anchor: "left top"});
      node.removeClass("processing");
      node.addClass("thicknode");
      av.umsg(interpret("av_visitinternal"));
      pseudo.setCurrentLine("visitinternal");
      btLeft += 25;
      av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
      av.step();

      // Left child
      rt1.target(node.left(), {anchor: "left top"});
      av.umsg(interpret("av_traverseleft"));
      pseudo.setCurrentLine("traverseleft");
      node.addClass("processing");
      av.step();
      preorder(node.left());

      // Right child
      rt1.target(node, {anchor: "left top"});
      av.umsg(interpret("av_traverseright"));
      pseudo.setCurrentLine("traverseright");
      node.addClass("thicknode");
      av.step();
      preorder(node.right());
    }

    // Finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret("av_done") + node.value());
    pseudo.setCurrentLine("end");
    av.step();
  }
});
