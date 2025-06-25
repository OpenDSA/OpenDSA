
"use strict";
$(document).ready(function () {
    var max_score = 0;
    var max_indexes = [0,0];
    var x=0;
    const Gap =  -2;
    const Match =  1;
    const Mismatch = -1;
    var s1="AACG";
    var s2="ACTCG"
    var s1_alignment="";
    var s2_alignment="";
  var jsav = new JSAV("Ltraceback");
  jsav.umsg("Match = 1, Mismatch = -1, Gap = -2");
  var matrix = new jsav.ds.matrix([[,, , , , ,],[, , , , ,, ],[,,,,,,]
  ,[, , , , ,, ],[, , ,, ,, ],[, ,,,,, ],[, , , , ,,]], 
  {style: "table", top: 0, left: 300});
  var matrix2=new jsav.ds.matrix([[,,,],[,,,],[,,,]],{style: "table", top: 0, left: 120});
    matrix2.hide();
  for(var i=2; i<s1.length+2; i++)
    {
	  	matrix.value(0,i, s1[i-2]);
    }

    for(var i=2; i<s2.length+2; i++)
    {
		matrix.value(i,0, s2[i-2]);
    }
  for(var i=1; i<2; i++) {
    for(var j=1; j<=s1.length+1; j++) {
		if(x<0)
		{
			x=0;
		}
        matrix.value(i,j,x);
          x+=Gap;
        } 
    }  
    x=0;
  for(var j=1; j<2; j++) {
    for(var i=1; i<=s2.length+1; i++) {
		if(x<0)
		{
			x=0;
		}
        matrix.value(i,j,x);
         x+=Gap;
        } 
    }

    for(var i=2; i<=s2.length+1; i++) {
        for(var j=2; j<=s1.length+1; j++) {

            if(matrix.value(i,0)==matrix.value(0,j)){
                var newval =Math.max(matrix.value(i-1,j) + Gap,  matrix.value(i-1,j-1)+Match,matrix.value(i,j-1) +Gap);
				if(newval<0)
				{
					newval=0;
				}
				else{newval=newval;}

            }
            else{
                var newval =Math.max(matrix.value(i-1,j) + Gap,  matrix.value(i-1,j-1)+Mismatch,matrix.value(i,j-1) +Gap);
				if(newval<0)
				{
					newval=0;
				}
				else{newval=newval;}
            }
            matrix.value(i,j,newval);
        }
      }
     for (var i = 2; i< s1.length+2; i++)
     {
         for (var j = 2; j < s2.length+2; j++)
         {
             if (matrix.value(i,j) >= max_score)
             {
                 max_score = matrix.value(i,j);
                 max_indexes[0] = i;
                 max_indexes[1] = j;
             }
         }
     }
     jsav.displayInit();
    var current_s1_index =max_indexes[0];
    var current_s2_index = max_indexes[1];
    var current_score = max_score;
    var diagonal_score = matrix.value(current_s1_index - 1,current_s2_index - 1);
    var vertical_score = matrix.value(current_s1_index - 1,current_s2_index);
    var horizontal_score = matrix.value(current_s1_index ,current_s2_index-1)
    matrix.highlight(current_s1_index,current_s2_index);
          matrix2.show();
          matrix2.value(0,2,matrix.value(0,current_s2_index));
          matrix2.value(2,0,matrix.value(current_s1_index,0));
          matrix2.value(2,2,current_score);
          matrix2.value(1,1,diagonal_score);
          matrix2.value(1,2,vertical_score);
          matrix2.value(2,1,horizontal_score);
          matrix2.highlight(2,2)

    jsav.step();
    while (current_score != 0) {

      if (diagonal_score + Match == current_score)
      {
          s1_alignment = matrix.value(0,current_s2_index) + s1_alignment;
          s2_alignment = matrix.value(current_s1_index,0) + s2_alignment;
          current_s1_index--;
          current_s2_index--;
      }
    
      else if (vertical_score + Gap == current_score)
      {
          s1_alignment = "-" + s1_alignment;
          s2_alignment = matrix.value(current_s1_index,0) + s2_alignment;
          current_s1_index--;
      }
      else if (diagonal_score + Mismatch == current_score)
      {
          s1_alignment = matrix.value(0,current_s2_index) + s1_alignment;
          s2_alignment = matrix.value(current_s1_index,0) + s2_alignment;
          current_s1_index--;
          current_s2_index--;
      }
      else
      {
         s1_alignment = matrix.value(0,current_s2_index) + s1_alignment;
         s2_alignment = "-" + s2_alignment;
          current_s2_index--;
      }
      
      current_score = matrix.value(current_s1_index,current_s2_index);
      if(current_score!=0){
      diagonal_score = matrix.value(current_s1_index - 1,current_s2_index - 1);
      vertical_score = matrix.value(current_s1_index - 1,current_s2_index);
      horizontal_score = matrix.value(current_s1_index ,current_s2_index-1)
      matrix2.value(0,2,matrix.value(0,current_s2_index));
      matrix2.value(2,0,matrix.value(current_s1_index,0));
      matrix2.value(2,2,current_score);
      matrix2.value(1,1,diagonal_score);
      matrix2.value(1,2,vertical_score);
      matrix2.value(2,1,horizontal_score);
      matrix.highlight(current_s1_index,current_s2_index);
      matrix2.highlight(2,2)
      jsav.step(); 
      }
     }
     matrix2.hide();
     jsav.label("the alignment is");
     jsav.label(s1_alignment);
     jsav.label(s2_alignment);
     jsav.step();
     matrix2.layout();
     matrix.layout();
    jsav.recorded();

});

 

