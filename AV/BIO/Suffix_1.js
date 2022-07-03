"use strict";
$(document).ready(function() {
    "use strict";
    var av_name = "Suffix_1";
    var av = new JSAV(av_name);
    
    var Seq1 = "ATCGTA$";
    var Seq2 = "ATCGAT#";
   
    av.displayInit();
    for(var i=0; i<Seq1.length; i++)
       {
        av.umsg("The Suffixes Of Seq1 : ATCGTA$",{"color":"blue"});
        var get_seq1_suffixes=Seq1.substring(Seq1.length-(i+1));
        av.label(get_seq1_suffixes).css({"text-align":"center"});
        av.step();
       }
       
    av.label("The Suffixes Of Seq2 : ATCGAT#").css({"color":"blue","text-align":"left"}); 
    for(var i=0; i<Seq1.length; i++)
       {
        var get_seq2_suffixes=Seq2.substring(Seq2.length-(i+1));
        av.label(get_seq2_suffixes).css({"text-align":"center"});
        av.step();
       }
      
    av.recorded();
  });
  

 

