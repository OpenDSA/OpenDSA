"use strict";

$(document).ready(function () {

    var x=0;
    const Gap =  -2;
    const Match =  1;
    const Mismatch = -1;
    var s1="AACG";
    var s2="ACTCG";
  var jsav = new JSAV("Lscore");
  jsav.umsg("Match = 1, Mismatch = -1, Gap = -2");
  var matrix = new jsav.ds.matrix([[,, , , , ,],[, , , , ,, ],[,,,,,,]
  ,[, , , , ,, ],[, , ,, ,, ],[, ,,,,, ],[, , , , ,,]], 
  {style: "table", top: 0, left: 300});
  var matrix2=new jsav.ds.matrix([[,,,],[,,,],[,,,]],{style: "table", top: 0, left: 30});
   matrix2.hide();
  for(var i=2; i<s1.length+2; i++)
    {
		matrix.value(0,i, s1[i-2])
		
    }

    for(var i=2; i<s2.length+2; i++)
    {
		matrix.value(i,0, s2[i-2])
    }
  jsav.displayInit();
  jsav.step();
  for(var i=1; i<2; i++) {
    for(var j=1; j<=s1.length+1; j++) {
		if(x<0)
		{
			x=0;
		}
        matrix.value(i,j,x);
          x+=Gap;
          var previous_xrow=x-Gap;
          const result_Frow=0;
        jsav.umsg(" step 1: initilzation first row with gap penality ");
        jsav.umsg("\n " + "(" + " " + previous_xrow + " " + "+" + " " + "(" + Gap + ")" + " " + ")" + " " + "=" + " " + x ,{"color": "blue","preserve": true});
        jsav.umsg("\n all negative values becomes zero ,so the result is",{"preserve": true});
        jsav.umsg("\n " + result_Frow ,{"color": "blue","preserve": true});
         jsav.step();
         
        } 
    }  
    x=0;
  for(var j=1; j<2; j++) {
    for(var i=2; i<=s2.length+1; i++) {
		if(x<0)
		{
			x=0;
		}
        matrix.value(i,j,x);
         x+=Gap;
         var previous_xcol=x-Gap;
          const result_Fcol=0;
        jsav.umsg(" step 1: initilzation first column with gap penality ");
        jsav.umsg("\n " + "(" + " " + previous_xcol + " " + "+" + " " + "(" + Gap + ")" + " " + ")" + " " + "=" + " " + x ,{"color": "blue","preserve": true});
        jsav.umsg("\n all negative values becomes zero ,so the result is",{"preserve": true});
        jsav.umsg("\n " + result_Fcol ,{"color": "blue","preserve": true});
         jsav.step();
        } 
    }
    var a,b,c,newval;
    for(var i=2; i<=s2.length+1; i++) {
        matrix.unhighlight(i-1);
        for(var j=2; j<=s1.length+1; j++) {
          matrix.unhighlight(i,j-1);
            a=matrix.value(i,j-1) +Gap;
            b=matrix.value(i-1,j) + Gap
            if(matrix.value(i,0)==matrix.value(0,j)){
             
                newval =Math.max(matrix.value(i-1,j) + Gap,  matrix.value(i-1,j-1)+Match,matrix.value(i,j-1) +Gap);
                c=matrix.value(i-1,j-1)+Match;
                jsav.umsg("step 2: fill the matrix by using dynamic programming ,so Value from Left = "+a+", Value from Up ="+b+ ", Value from Diagonal="+c);
				        if(newval<0)
			            	{
				            	newval=0;
                      jsav.umsg("Max value ="+newval+"< 0 ="+0,{"color": "blue","preserve": true});
				            }
				         else{
                       newval=newval;
                       jsav.umsg("\n Max value ="+newval,{"color": "blue","preserve": true});
                     }
                
               }
      
            else{
                  newval =Math.max(matrix.value(i-1,j) + Gap,  matrix.value(i-1,j-1)+Mismatch,matrix.value(i,j-1) +Gap);
                  c=matrix.value(i-1,j-1)+Mismatch;
                  jsav.umsg("step 2: fill the matrix by using dynamic programming ,so Value from Left = "+a+", Value from Up ="+b+ ", Value from Diagonal="+c);
			          	if(newval<0)
				            {
					             newval=0;
                       jsav.umsg("Max value ="+newval+"< 0 ="+0,{"color": "blue","preserve": true});
				            }
				          else{
                     newval=newval;
                     jsav.umsg("Max value ="+newval,{"color": "blue","preserve": true});
                      }
                  

               }
            matrix2.show();
            matrix2.value(0,2,s1[j-2]);
            matrix2.value(2,0,s2[i-2]);
            matrix2.value(2,2,newval);
            matrix2.value(1,1,matrix.value(i-1,j-1));
            matrix2.value(1,2,matrix.value(i-1,j));
            matrix2.value(2,1,matrix.value(i,j-1));
            matrix2.highlight(2,2);
            matrix.value(i,j,newval);
            matrix.highlight(i,j);
            matrix2.highlight(2,2);
            jsav.step();
        }
      }
      jsav.umsg("Step 3 Score Matrix ="+ matrix.value(s2.length+1,s1.length+1));
      jsav.step();

     matrix2.layout();
     matrix.layout();
    jsav.recorded();

});