"use strict";

$(document).ready(function () {
  var jsav = new JSAV("Dot");
  var seq1="GATTCTATCTAACTA";
  var seq2="GTTCTATTCTAAC";
  var len1 = seq1.length;
  var len2 = seq2.length;
  var DotMatrix = new jsav.ds.matrix([[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],
	[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],
	[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,],[,,,,,,,,,,,,,,,,]], {style: "table", top: 0, left: 300});
	
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
				DotMatrix.value(i,j,"*")
       // DotMatrix.highlight(i,j)
				jsav.step();
            }
        }
    }
    DotMatrix.highlight(2,3);
    DotMatrix.highlight(3,4);
    DotMatrix.highlight(4,5);
    DotMatrix.highlight(5,6);
    DotMatrix.highlight(6,7);
    DotMatrix.highlight(7,8);
    DotMatrix.highlight(8,8);
    DotMatrix.highlight(9,9);
    DotMatrix.highlight(10,10);
    DotMatrix.highlight(11,11);
    DotMatrix.highlight(12,12);
    DotMatrix.highlight(13,13);
    DotMatrix.highlight(6,2);
    DotMatrix.highlight(7,3);
    DotMatrix.highlight(8,4);
    DotMatrix.highlight(9,5);
    DotMatrix.highlight(10,6);
    DotMatrix.highlight(11,7);
    jsav.step();

	DotMatrix.layout();
	jsav.recorded();
});
