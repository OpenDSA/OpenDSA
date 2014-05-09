"use strict";
(function($) {
  var initialData = [],
      stack,
      commonTrie,
      av = new JSAV("jsavcontainer");

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    if (stack) {
      stack.clear();
    }

    if (commonTrie) {
      commonTrie.clear();
    }

    commonTrie = av.ds.tree({center: true, visible: true, nodegap: 20});
    commonTrie.root("");
    commonTrie.root().addClass("emptynode");
    commonTrie.click(clickHandler);
    commonTrie.layout();

    return commonTrie;
  }

  function modelSolution(jsav) {
    var msTree = jsav.ds.tree({center: true, visible: true, nodegap: 20});

    msTree.root("");
    msTree.root().addClass("emptynode");
    msTree.layout();

    jsav.displayInit();

    return msTree;
  }

  function clickHandler() {
    if (this.hasClass("emptynode")) {
      this.removeClass("emptynode");
      this.value("false");
      // this.addChild("").addChild("").addChild("");
      this.child(0, "", {edgeLabel: "a"})
          .child(1, "", {edgeLabel: "b"})
          .child(2, "", {edgeLabel: "c"});
      this.child(0).addClass("emptynode");
      this.child(1).addClass("emptynode");
      this.child(2).addClass("emptynode");
      commonTrie.layout();
      exercise.gradeableStep();
    } else if (this.value() === "false") {
      this.value("true");
    } else if (this.value() === "true") {
      this.value("false");
    }
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend"});
  exercise.reset();

}(jQuery));
