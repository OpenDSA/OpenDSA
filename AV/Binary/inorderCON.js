/*global ODSA */
// Inorder traversal in detail

// Title: Inorder Traversal Shown in Detail
// Author: Cliff Shaffer
// Institution: Virginia Tech
// Features: Algorithm Visualization; Code Tracing Visualization
// Keyword: Inorder Traversal
// Natural Language: en
// Programming Language: Java

/* Description: Slideshow presenting a detailed visualization of inorder traversal of a binary tree and how the recursion works. */

$(document).ready(function() {
  "use strict";

  var av_name = "inorderCON",
      config = ODSA.UTILS.loadConfig({av_name: av_name}),
      interpret = config.interpreter,       // get the interpreter
      code = config.code;                   // get the code object
  var av = new JSAV(av_name);
  var pseudo = av.code(code[0]);
  var bt = av.ds.binarytree({visible: true, nodegap: 15});
  var labelTop = 365;

  bt.root("A");
  var rt = bt.root();
  rt.left("B");
  rt.left().right("D");
  rt.right("C");
  rt.right().left("E");
  rt.right().left().left("G");
  rt.right().right("F");
  rt.right().right().left("H");
  rt.right().right().right("I");
  bt.layout();

  var rt1 = av.pointer("rt", bt.root(), {anchor: "left top", top: -10});
  var btLeft =  250;

  av.umsg(interpret("av_inorder"));
  pseudo.setCurrentLine("sig");
  av.displayInit();

  inorder(rt);

  av.recorded();


  function inorder(node) {
    //check if null
    if (typeof node === "undefined") {
      rt1.arrow.hide();
      av.umsg(interpret("av_isnull"));
      pseudo.setCurrentLine("checknull");
      av.step();
      return;
    }

    //not null
    rt1.target(node, {anchor: "left top"});
    av.umsg(interpret("av_isnotnull"));
    pseudo.setCurrentLine("checknull");
    av.step();

    //left child
    av.umsg(interpret("av_leftchild"));
    pseudo.setCurrentLine("visitleft");
    node.addClass("processing");
    rt1.target(node.left(), {anchor: "left top"});
    av.step();
    inorder(node.left());

    //visit
    rt1.target(node, {anchor: "left top"});
    //node.removeClass("processing");
    node.addClass("thicknode");
    av.umsg(interpret("av_visit") + node.value() + ".");
    pseudo.setCurrentLine("visit");
    btLeft += 35;
    av.label(String(node.value()), {left: btLeft, top: labelTop}).show();
    av.step();

    //right child
    av.umsg(interpret("av_rightchild"));
    pseudo.setCurrentLine("visitright");
    node.addClass("thicknode");
    rt1.target(node.right(), {anchor: "left top"});
    av.step();
    inorder(node.right());

    //finish
    rt1.target(node, {anchor: "left top"});
    node.removeClass("processing");
    av.umsg(interpret("av_finish") + node.value() + ".");
    pseudo.setCurrentLine("end");
    av.step();
  }
});
