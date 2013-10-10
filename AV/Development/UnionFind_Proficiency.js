(function ($) {
    "use strict";
    /*global alert: true, ODSA */
  $(document).ready(function () {
    var initData, bh,
    settings = new JSAV.utils.Settings($(".jsavsettings")),
    jsav = new JSAV($('.avcontainer'), {settings: settings}),
    exercise, tree, modelTree, 
	arr, labels, parents;
	var i, treeNodes = [], modelTreeNodes = [], parentIndex=-1;
    jsav.recorded();
	
	arr = new Array(10);
    //Initializing the labels
    for (i = 0; i < arr.length; i++) {
      arr[i] = String.fromCharCode(i + 65);
    }
    labels = jsav.ds.array(arr, {left: 300, top: 150, indexed: true});
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
      treeNodes[0].addChild(treeNodes[1]);
	  tree.layout();
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
	  modelTreeNodes = new Array(arr.length);
      for (i = 0; i < modelTreeNodes.length; i++) {
        modelTreeNodes[i] = modelTree.root().child(i);    //At first
      }
	  modeljsav.displayInit();
	  modelTree.layout();
	  
	  //You may stuck into a problem here when the parent is the same as the child
	  var parent = JSAV.utils.rand.numKeys(0, 10, 1);
	  var child = JSAV.utils.rand.numKeys(0, 10, 1);
      modeljsav.umsg("Union Nodes ("+modelTreeNodes[parent].value()+") And ("+modelTreeNodes[child].value()+")");	  
	  modelTreeNodes[parent].addChild(modelTreeNodes[child]);
	  modeljsav.stepOption("grade",true);
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
	
	function getNodeByValue(value){
	  for (var j = 0; j <treeNodes.length; j++){
	    if (treeNodes[j].value() === value)
		  return treeNodes[j];
	  }
	}
	function clickHandler(index){
	  var node = treeNodes[index];
	  if (parentIndex === -1){
	      node.addClass('selected');
	      labels.addClass(index, 'selected');
		  parentIndex = index;
	  }
	  else{
	    treeNodes[parentIndex].addChild(node);
		tree.layout();
		treeNodes[parentIndex].removeClass('selected');
		parents.value(index, parentIndex);
		labels.removeClass(parentIndex, 'selected');
		parentIndex=-1;
		exercise.gradeableStep();
	  }
	}
    $(".jsavcontainer").on("click", ".jsavtreenode", function () {
      var value = $(this).data('value');
	  var node = getNodeByValue(value);
	  var index = treeNodes.indexOf(node);
	  if (index === parentIndex){
	    treeNodes[parentIndex].removeClass('selected');
		labels.removeClass(parentIndex, 'selected');
		parentIndex=-1;
	  }
	  else{
	    clickHandler(index);
	  }
	});  
	 
    $(".jsavcontainer").on("click", ".jsavarray .jsavindex", function () {
      var index = $(this).parent(".jsavarray").find(".jsavindex").index(this);
	  if (index === parentIndex){
	    treeNodes[parentIndex].removeClass('selected');
		labels.removeClass(parentIndex, 'selected');
		parentIndex=-1;
	  }
	  else{
	    clickHandler(index);
	  }
	});
    $("#about").click(about);
    });
  }(jQuery));
