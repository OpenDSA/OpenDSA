"use strict";
$(document).ready(function() {
    "use strict";
    var av_name = "Suffix";
    var av = new JSAV(av_name);
    var x=0;
    var childnumber=1;
    var nodenumber;
    var Seq1 = "ATCGTA$";
    var Seq2 = "ATCGAT#";
    var Tree=av.ds.tree({nodegap:70,width: 1200, height: 1200});
    var root=Tree.root(0);
    var smilarity;
    av.displayInit();
    av.umsg("The Suffix of number 1 of Seq1 : ATCGTA$ = " +Seq1.slice(Seq1.length-1,Seq1.length),{"color":"blue"});
    root.addChild(Seq1.slice(Seq1.length-1,Seq1.length).length,{"edgeLabel":Seq1.slice(Seq1.length-1,Seq1.length)});
    av.step();
    for(var i=1; i<Seq1.length; i++)
    {
      var y=i+1;
      av.umsg("The Suffix of number " + y + " of Seq1 : ATCGTA$ = "+Seq1.slice(Seq1.length-(i+1),Seq1.length)+"$",{"color":"blue"});
      Checkedges(Seq1.slice(Seq1.length-(i+1),Seq1.length),root);
      childnumber=1;
       av.step();
    }
   // root.addChild(" ",{"edgeLabel":Seq1.slice(Seq2.length-1,Seq2.length)});
    //av.step();

    for(var i=0; i<Seq2.length; i++)
    {
      var y=i+1
      av.umsg("The Suffix" +y+ " of Seq2 : ATCGAT# ="+Seq2.slice(Seq2.length-(i+1),Seq2.length),{"color":"blue"});
      Checkedges(Seq2.slice(Seq2.length-(i+1),Seq2.length),root);
      childnumber=1
       av.step();
    }

    function Checkedges(string,Root)
    {
      x=0;
      for(var i=0;i<Root.childnodes.length;i++){
         smilarity=0;

        if(string[0]==Root.childnodes[i].edgeToParent().label()[0]) {
          smilarity++;        
          for(var j=1;j<Root.childnodes[i].edgeToParent().label().length;j++)
          {
                if(string[j]==Root.childnodes[i].edgeToParent().label()[j]) {
               
                 smilarity++;
                  continue;
                  
                }
                else {
                    //Root.childnodes[i].value()+string.slice(j,string.length).length
                    //av.umsg(Root.childnodes[i].edgeToParent().label());
                    //Root.childnodes[i].edgeToChild().label().length+Root.childnodes[i].edgeToParent().label().length
                    // Root.childnodes[i].value()+string.slice(j,string.length).length
                    nodenumber=i+1;
                    av.umsg(" :first " +smilarity + " characters in this suffix is smilar in the label of child "+childnumber+" node number "+nodenumber,{"color":"blue",preserve:true});
                    Root.childnodes[i].value(Root.childnodes[i].edgeToParent().label().slice(0,j).length+Root.childnodes[i].parentnode.value())
                    Root.childnodes[i].addChild(Root.childnodes[i].value()+string.slice(j,string.length).length,{"edgeLabel":string.slice(j,string.length)})
                    Root.childnodes[i].addChild(Root.childnodes[i].value()+Root.edgeToChild(i).label().slice(j,(Root.edgeToChild(i).label().length)).length,{"edgeLabel":Root.edgeToChild(i).label().slice(j,(Root.edgeToChild(i).label().length))});
                    Root.childnodes[i].edgeToParent().label(Root.childnodes[i].edgeToParent().label().slice(0,j));
                    Tree.layout();
                    break;
                  
                }
            
            }
          if(smilarity==Root.childnodes[i].edgeToParent().label().length)
            {
              childnumber++;
              Checkedges(string.slice(smilarity,string.length),Root.childnodes[i])
              break;

            }

          }
           else{
             x++
             if(x==Root.childnodes.length){
              Root.addChild(string.length,{"edgeLabel":string});
              Tree.layout();
              break;                
             }
              else{   
              continue;
              }
            }

          }
        }
  
    Tree.layout();
    av.recorded();
  });