"use strict";
(function($) {
  var initialData = [],
      size = 5,
      stack,
      commonTrie,
      $insertLabel,
      $trieLabel,
      $nextButton,
      interpret = function (arg) { return arg; },
      av = new JSAV("jsavcontainer");

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    if (stack) {
      stack.clear();
    }

    if (commonTrie) {
      commonTrie.clear();
    }

    // generate input
    initialData = generateArrayWithStrings(size);
    console.log(initialData);

    stack = av.ds.stack(initialData, {center: true});

    commonTrie = av.ds.tree({center: false, visible: true, nodegap: 15});
    commonTrie.element.addClass("jsavcenter");
    showChildren(commonTrie.root());
    commonTrie.click(clickHandler);
    commonTrie.layout();

    // remove all old labels
    av.container.find(".exerciseElement").remove();

    // create new labels
    $insertLabel = $("<p class='exerciseElement'>" + interpret("av_insert") + "</p>");
    $trieLabel = $("<p class='exerciseElement'>" + interpret("av_common_trie") + "</p>");

    // style the labels
    $insertLabel.add($trieLabel)
      .css("text-align", "center")
      .css("font-weight", "bold");

    // insert the labels
    $insertLabel.insertBefore(stack.element);
    $trieLabel.insertBefore(commonTrie.element);

    // create button and position it on the right side of the stack
    $nextButton = $('<input id="next" type="button" value="' + interpret("av_next") + '" class="exerciseElement jsavcenter" />').insertAfter(stack.element);
    $nextButton.position({my: "left", at: "right", of: stack.element});
    $nextButton.css({left: "+=50"});
    $nextButton.click(function () {
      stack.removeFirst();
      stack.layout();
    });

    return commonTrie;
  }

  function modelSolution(jsav) {
    var msTree = jsav.ds.tree({center: true, visible: true, nodegap: 15});

    msTree.root("");
    msTree.root().addClass("emptynode");
    msTree.layout();

    jsav.displayInit();

    return msTree;
  }


  function showChildren(node) {
    node.removeClass("emptynode");
    node.value(false);
    // add empty node children
    node.child(0, "", {edgeLabel: "a"})
        .child(1, "", {edgeLabel: "b"})
        .child(2, "", {edgeLabel: "c"});
    node.child(0).addClass("emptynode");
    node.child(1).addClass("emptynode");
    node.child(2).addClass("emptynode");
    // call the layout function
    commonTrie.layout();
  }

  function clickHandler() {
    if (this.hasClass("emptynode")) {
      showChildren(this);
      // grade the step
      exercise.gradeableStep();
    } else {
      // toggle true/false
      this.value(!this.value());
      if (this.value()) {
        this.addClass("greenbg");
      } else {
        this.removeClass("greenbg");
      }
    }
  }

  function generateArrayWithStrings(size) {
    var result = [];

    for (var i = 0; i < size; i++) {
      var length = 1 + Math.floor(Math.random() * 4);
      var str = "";
      for (var c = 0; c < length; c++) {
        str += ["a", "b", "c"][Math.floor(Math.random() * 3)];
      }
      result.push(str);
    }

    result[1 + Math.floor(Math.random() * (size - 1))] = "";

    return result;
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend"});
  exercise.reset();

}(jQuery));
