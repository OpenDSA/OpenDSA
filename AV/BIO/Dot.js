"use strict";

$(document).ready(function () {
  var jsav = new JSAV("Dot");
  var seq1="GATTCTATCTAACTA";
  var seq2="GTTCTATTCTAAC";
  var len1 = seq1.length;
  var len2 = seq2.length;
  var DotMatrix = new jsav.ds.matrix([[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],
	[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],
	[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,]], {style: "table", top: 0, left: 200});
	
	for(var i=0; i<len1; i++)
    {
		DotMatrix.value(0,i+1, seq1[i])
    }

    for(var i=0; i<len2; i++)
    {
		DotMatrix.value(i+1,0, seq2[i])
    }
	jsav.displayInit();
	for(var i=1; i<=len2; i++)
    {
        for(var j=1; j<=len1; j++)
        {
            if(DotMatrix.value(i,0) == DotMatrix.value(0,j))
            {
				DotMatrix.value(i,j,"#")
        
        
        
        
        
      //  DotMatrix.highlight(i,j)
				jsav.step();
            }
        }
    } 
    
  
	DotMatrix.layout();
	jsav.recorded();
});