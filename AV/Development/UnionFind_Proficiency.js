(function ($) {
    "use strict";
    /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
    settings = new JSAV.utils.Settings($(".jsavsettings")),
    jsav = new JSAV($('.avcontainer'), {settings: settings}),
    exercise, tree, modelTree, 
	arr, labels, parents;
	var i, treeNodes = [];
    jsav.recorded();
	
	arr = new Array(10);
    //Initializing the labels
    for (i = 0; i < arr.length; i++) {
      arr[i] = String.fromCharCode(i + 65);
    }
    labels = jsav.ds.array(arr, {left: 300, top: 150});
    //Initializing the parent pointer
    for (i = 0; i < arr.length; i++) {
      arr[i] = "/";
    }
    parents = jsav.ds.array(arr, {left: 300, top: 103});
	
    function init() {
	  if(tree) {
	    tree.clear();
	  }
	  initTree();
	  return tree;        
    }

    function fixState(mGraph) {
        
    }

    function model(modeljsav) {
      modelTree = modeljsav.ds.tree({nodegap: 20});
	  var newNode;
      var root = modelTree.newNode("X");
      modelTree.root(root);
      root.id("root");
      for (var j = 0; j < arr.length; j++) {
        newNode = modelTree.newNode(labels.value(j));
        newNode.size = 1;   //To maintain the size of each connected component
        root.addChild(newNode);
      }
	  modeljsav.displayInit();
	  modelTree.layout();
	  root.child(0).addChild(root.child(1));
	  modelTree.layout();
	  modeljsav.step();
      return modelTree;   
    }
	  
	function initTree() {
	  var newNode;
      tree = jsav.ds.tree({left: 20, top: 220, nodegap: 20});
      var root = tree.newNode("X");
      tree.root(root);
      root.id("root");
      for (i = 0; i < arr.length; i++) {
        newNode = tree.newNode(labels.value(i));
        newNode.size = 1;   //To maintain the size of each connected component
        root.addChild(newNode);
      }
	  treeNodes = new Array(arr.length);
      for (i = 0; i < treeNodes.length; i++) {
        treeNodes[i] = tree.root().child(i);    //At first
      }
      tree.layout();	  
	}

      // Process About button: Pop up a message with an Alert
    function about() {
      alert("Heapsort Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
    }

    exercise = jsav.exercise(model, init, { css: "background-color" },
        { controls: $('.jsavexercisecontrols'), fix: fixState });
    exercise.reset();
    $(".jsavcontainer").on("click", ".jsavtreenode", function () {
      var value = $(this).data('value');
      alert(value);
    });
    $(".jsavcontainer").on("click", ".jsavarray .jsavindex", function () {
      var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
      alert(index);
    });
    $("#about").click(about);
    });
  }(jQuery));
