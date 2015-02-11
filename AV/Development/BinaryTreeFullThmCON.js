"use strict";
$(document).ready(function () {
    var av = new JSAV("BinaryTreeFullThmCON",  {"animationMode" : "none"});
    var btTop = 10;
    var btLeft = 350;
    var btRight = 425;
    var bt = av.ds.binarytree({nodegap: 35, top: btTop, left: btLeft});
    bt.root('');
    var rt = bt.root();
    
    rt.right(' ');
    rt.right().right('');
    rt.right().right().right('');
    
   	//add internal nodes label
   	rt.right().edgeToRight().label("Any number of internal nodes");
   	
   	
    bt.layout();

    //add the bottom label
    var label = av.label("A tree containing many internal nodes and a single leaf" , {left: btLeft-50, top: 250}).show;

   
});
