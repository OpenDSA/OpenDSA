“use strict”;
$(document).ready(function () {
    var av = new JSAV(“BinaryTreeFullThmCON”,  {“animationMode” : “none”});
    var btTop = 10;
    var btLeft = 225;
    var btRight = 425;
    var bt = av.ds.binartytree(:nodegap: 25, top: btTop, left: btLeft});
    bt.root(‘ ‘);
    var rt = bt.root();

    rt.left(‘ ‘);
    //add dashed line in between here
    rt.left().left();
    rt.left().left()
   
    bt.layout();

    //add the bottom label
    var label = av.label(“Figure 7.3.1: A tree containing many internal nodes and a single leaf” , {left: btLeft - 30, top: 150}).show;

    //add internal node labels
});
