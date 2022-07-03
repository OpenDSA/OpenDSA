"use strict";
$(document).ready(function() {
    "use strict";
    var av_name = "Suffix_2";
    var av = new JSAV(av_name);
    
    var Seq1 = "ATCGTA$";
    var Seq2 = "ATCGAT#";
    
    /*var Graph=av.ds.graph({"width":500,"height":500,"follow":true});
    var node_1=Graph.addNode(0,{left:0,top:0});
    var node_2=Graph.addNode(1,{left:100,top:70});
    Graph.addEdge(node_1,node_2,{weight:"ACAT"});
    node_1.hide();
    Graph.layout();*/
   
    
    //var s1="ma";
   // var s2="ma";
    
    
    var Tree=av.ds.tree();
    var Root=Tree.root(0);
    /*Root._setchildnodes(0);
    Root._setEdgeToParent({"edgeLabel":"get_seq1_suffixes"});
    Root.childnodes[0].edgeToParent().label  (tamam)
    var ch= Root.addChild("ma",{"edgeLabel":s2});
    if(Root.edgeToChild(0).label()===s2)     (tamam)
      {
        av.umsg("manar");
      }*/
    //Root._setEdgeToParent({"edgeLabel":get_seq1_suffixes});
    //Root.edgeToParent({"newEdge":"550"});
    
    av.displayInit();
    for(var i=0; i<Seq1.length; i++)
       {
        av.umsg("The Suffixes Of Seq1 : ATCGTA$",{"color":"blue"});
        var get_seq1_suffixes=Seq1.substring(Seq1.length-(i+1));
        var child_nodes=Root.addChild(get_seq1_suffixes.length,{"edgeLabel":get_seq1_suffixes});
        Root.childnodes[i].hide();
       /* if(!(get_seq1_suffixes[i].startsWith(Root.edgeToChild(0,i-1).label()))){
          child_nodes.show();
        }*/
       //for(var j=0; j<Root.childnodes.length; j++){
        var Nodes=Root.childnodes[i].edgeToParent().label
         if(Nodes[0] != get_seq1_suffixes.indexOf(0) )
         {
          Root.childnodes[i].show();
          av.umsg("The Suffixes Of Seq1 : ATCGTA$",{"color":"red"});
         }
         /*var first=get_seq1_suffixes[i];           var second=Root.edgeToChild(j).length;
         var c=0,d=0;
         while(c<=first.length & d<=second){
          
           if(first[c]!=Root.edgeToChild(j).label()[d])
              Root.childnodes[i].show();
              av.umsg("The Suffixes Of Seq1 : ATCGTA$",{"color":"red"});
              c++;
              d++;*/
          
          av.step();
       }
       
    
    Tree.layout();
    av.recorded();
  });
  

 

