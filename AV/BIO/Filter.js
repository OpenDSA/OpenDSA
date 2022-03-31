"use strict";

$(document).ready(function () {
  var jsav = new JSAV("Filter");
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
	for(var i=1; i<=len2; i++)
    {
        for(var j=1; j<=len1; j++)
        {
            if(DotMatrix.value(i,0) == DotMatrix.value(0,j))
            {
				DotMatrix.value(i,j,"#")
        
        
        
        
        
            }
        }
    } 
    
    jsav.displayInit();

    
    var inde=0;    var dia = [];

    for(var i=1;i<=len2;i++){
      for(var j=1;j<=len1;j++){
        var countneg=0;var countpos=0;
        if(DotMatrix.value(i,j)=='#'){
          
           var i1=i;
          
           var j1=j;
           var i2=i;
           var j2=j;
           var i3=i;
           var j3=j;
           var i4=i; 
           var j4=j;
      while(DotMatrix.value(i1,j1)=='#'&&i1<=len2&&j1<=len1){
        if(i1==len2||j1==len1){
          countpos++;
          break;
        }
     
           else{
            countpos++;
            i1++;
            j1++;
           }
          
                       } 
      while(DotMatrix.value(i2,j2)=='#'){
       
        i2--;
        j2--;
        if(DotMatrix.value(i2,j2)=='#'){ 
          countneg++;}
        else{
             break;
        }
       
           }
        
        var countall=countneg+countpos;
     
        dia[inde]=countall
        inde++}}}
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var wordsize=1;
    for(var m=1;m<Math.max(...dia);m++){
      wordsize++;
    for(var i=1;i<=len2;i++){
      for(var j=1;j<=len1;j++){
        var countneg=0;var countpos=0;
        if(DotMatrix.value(i,j)=='#'){
          
           var i1=i;
          
           var j1=j;
           var i2=i;
           var j2=j;
           var i3=i;
           var j3=j;
           var i4=i; 
           var j4=j;
      while(DotMatrix.value(i1,j1)=='#'&&i1<=len2&&j1<=len1){
        if(i1==len2||j1==len1){
          countpos++;
          break;
        }
     
           else{
            countpos++;
            i1++;
            j1++;
           }
          
                       } 
      while(DotMatrix.value(i2,j2)=='#'){
       
        i2--;
        j2--;
        if(DotMatrix.value(i2,j2)=='#'){ 
          countneg++;}
        else{
             break;
        }
       
           }
        
        var countall=countneg+countpos;
     
        dia[inde]=countall
        inde++
        
        if(countall<wordsize&&countall>0){
          while(DotMatrix.value(i3,j3)=='#'){
            DotMatrix.value(i3,j3," ")
            if(i3==len2||j3==len1){
              break;
            }
         
               else{
                i3++;
                j3++;
               }
            jsav.step();
                } 
      while(DotMatrix.value(i4,j4)=="#"){
        if(i4>1&&j4>1){
        i4--;j4--;}
        else{
          break;
        }
        DotMatrix.value(i4,j4," ")
      jsav.step();
           } 
           jsav.step();
        }
        else{
          continue;
        }
      }
      else{
        continue;
      }
    }
    }
  }
  
  for(var i=1; i<=len2; i++)
    {
        for(var j=1; j<=len1; j++)
        {
            if(DotMatrix.value(i,j) == '#')
            {
		
        
        
       DotMatrix.highlight(i,j)
				jsav.step();
            }
        }
    } 
	DotMatrix.layout();
	jsav.recorded();
});