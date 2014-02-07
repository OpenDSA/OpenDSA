(function ($) {
  "use strict";
   var av = new JSAV("firstFit", {"animationMode": "none"});
   arr,  // for the JSAV array
  
  var params = JSAV.utils.getQueryParameter();
  var settings = new JSAV.utils.Settings($(".jsavsettings"));
  
  function about() {
    alert("First Fit Algorithm Visualization\nWritten by Cliff Shaffer and Mauricio De La Barra\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }
  
   
  
  var used1 = av.g.rect(85, 200, 30, 80).css({"fill": "red"});
  var used2 = av.g.rect(220, 200, 75, 80).css({"fill": "red"});
  var used3 = av.g.rect(391, 200, 54, 80).css({"fill": "red"});
  var used4 = av.g.rect(580, 200, 30, 80).css({"fill": "red"});
  
  var free1 = av.g.rect(10, 200, 75, 80).css({"fill": "blue"});
  var free2 = av.g.rect(115, 200, 105, 80).css({"fill": "blue"});
  var free3 = av.g.rect(295, 200, 96, 80).css({"fill": "blue"});
  var free4 = av.g.rect(445, 200, 135, 80).css({"fill": "blue"});
  
  var free1Start = 10;
  var free2Start = 115;
  var free3Start = 295;
  var free4Start = 445;
  
 var freeStartArray = new Array();
 freeArray[0] = free1Start;
 freeArray[1] = free2Start;
 freeArray[2] = free3Start;
 freeArray[3] = free4Start;
  
  var free1Finish = 85;
  var free2Finish = 220;
  var free3Finish = 391;
  var free4Finish = 580;
  
  var freeFinArray = new Array();
  freeFinArray[0] = free1Finish;
  freeFinArray[1] = free2Finish;
  freeFinArray[2] = free3Finish;
  freeFinArray[3] = free4Finish;
  
  
  
  var usedRec = av.g.rect(430, 50, 50, 50).css({"fill": "red"});
  var freeRec = av.g.rect(510, 50, 50, 50).css({"fill": "blue"});
  
  var usedLabel = av.label("Used Space", {left :  430, top:  105});
  var freeLabel = av.label("Free Space", {left :  510, top:  105});
  
  var usedAmountLabel = av.label(usedNum, {left :  450, top:  65});
  var freeAmountLabel = av.label(freeNum, {left :  530, top:  65});
  
  var usedNum = 63;
  var freeNum = 137;
  
   
  
 var freeListRect = av.g.rect(10, 400, 25, 50).css({"fill": "lightgrey"});
 var freeListRect2 = av.g.rect(35, 400, 25, 50).css({"fill": "lightgrey"});
 var freeListRect3 = av.g.rect(60, 400, 25, 50).css({"fill": "lightgrey"});
 var freeListRect4 = av.g.rect(85, 400, 25, 50).css({"fill": "lightgrey"});
  
  
  
  
 var block1 = 25;
 var block2 = 35;
 var block3 = 32;
 var block4 = 45;
 
 var freeArray = new Array();
 freeArray[0] = block1;
 freeArray[1] = block2;
 freeArray[2] = block3;
 freeArray[3] = block4;
 
 var block1Label = av.label(block1, {left :  22, top:  420});
 var block2Label= av.label(block2, {left :  47, top:  420});
 var block3Label = av.label(block3, {left :  72, top:  420});
 var block4Label = av.label(block4, {left :  97, top:  420});
 var freeLabel = av.label("Free List", {left : 15, top: 455});
 
 var connect1 = av.g.line(22.5, 400, 47.5, 280);
 var connect2 = av.g.line(47.5, 400, 167.5, 280);
 var connect3 = av.g.line(72.5, 400, 343, 280);
 var connect4 = av.g.line(97.5, 400, 512.5, 280);
 
 function newRec(startX, sizeX)
 {
	var newRec = av.g.rect(stratX, 50, sizeX, 50).css({"fill": "red"});
 }
 function updadateLabels()
 {
  block1Label = av.label(freeArray[0], {left :  22, top:  420});
  block2Label= av.label(freeArray[1], {left :  47, top:  420});
  block3Label = av.label(freeArray[2], {left :  72, top:  420});
  block4Label = av.label(freeArray[3], {left :  97, top:  420});
  usedAmountLabel = av.label(usedNum, {left :  450, top:  65});
  freeAmountLabel = av.label(freeNum, {left :  530, top:  65});
 }
 
 function updateLines()
 {
  connect1 = av.g.line(22.5, 400, (freeStartArray[1] + freeFinArray[1])/2, 280);
  connect2 = av.g.line(47.5, 400, (freeStartArray[2] + freeFinArray[2])/2, 280);
  connect3 = av.g.line(72.5, 400, (freeStartArray[3] + freeFinArray[3])/2, 280);
  connect4 = av.g.line(97.5, 400, (freeStartArray[4] + freeFinArray[4])/2, 280);
 
 }
 
 function firstFit() {
	
	var input = params;
	if(i > 0)
	{
		jsav.umsg("The request has been scheduled\n Algorithm: First Fit\n Size Required: " + input + "\n");
		var rec2 = av.g.rect(10, 300, input * 3, 80).css({"fill": "lightblue"}); //creates lightblue rectangle
		jsav.step();
		rec2 = av.g.rect(0, 0, 0, 0).css({"fill": "white"}); //deletes lightblue rectangle after step
		for(i = 0; i <= 4; i++)
		{ 
			if(i == 0)
			{
				connect1 = av.g.line(22.5, 400, 47.5, 280, {'stroke-width' : 3}); //sets line 1 to bold
				freeListRect = av.g.rect(10, 400, 25, 50).css({"fill": "yellow"}); //sets 1 to yellow
			}
			else if(i == 1)
			{
				connect2 = av.g.line(47.5, 400, 167.5, 280, {'stroke-width' : 3});
				connect1 = av.g.line(22.5, 400, 47.5, 280); //sets line 1 back to original color
				freeListRect = av.g.rect(10, 400, 25, 50).css({"fill": "lightgrey"}); //sets 1 back to grey
				freeListRect2 = av.g.rect(35, 400, 25, 50).css({"fill": "yellow"}); //sets 2 to yellow
				
			}
			else if(i == 2)
			{
				connect3 = av.g.line(72.5, 400, 343, 280, {'stroke-width' : 3});
				connect2 = av.g.line(47.5, 400, 167.5, 280); //sets line 2 back to original color
				freeListRect2 = av.g.rect(35, 400, 25, 50).css({"fill": "lightgrey"}); //sets 2 back to grey
				freeListRect3 = av.g.rect(60, 400, 25, 50).css({"fill": "yellow"}); //sets 3 to yellow
			}
			else if(i == 3)
			{
				connect4 = av.g.line(97.5, 400, 512.5, 280, {'stroke-width' : 3});
				connect3 = av.g.line(72.5, 400, 343, 280); //sets line 3 back to original color
				freeListRect3 = av.g.rect(60, 400, 25, 50).css({"fill": "lightgrey"}); //turns 3 back to grey
				freeListRect4 = av.g.rect(85, 400, 25, 50).css({"fill": "yellow"}); //turns 4 yellow
			}
			else if (i == 4){
			connect4 = av.g.line(97.5, 400, 512.5, 280); //sets 4 back to non bold
			freeListRect4 = av.g.rect(85, 400, 25, 50).css({"fill": "lightgrey"}); //sets 4 back to grey
			jsav.umsg("End of freelistreached\n Try a smaller size!\n");
			
			}
			
			jsav.umsg("Freelist's " + i + "th block size " + freeArray[i] + "\n");
			
			
			if(input <= freeArray[i])
			{
				jsav.umsg("Appropriate block size found!\n");
				jsav.umsg("Freelist's " + i + "th block size " + freeArray[i]) "\n";
				jsav.step();
				newRec(freeStartArray[i], freeStartArray[i] + input);
				freeArray[i] = freeArray[i] - input;
				freeStartArray[i] = freeStartArray[i] + input;
				usedNum = UsedNum + input;
				freeNum = freeNum - input;
				updateLabels();
				updateLines();
				jsav.step();
				
			}
			jsav.step();
		
		}
	}
	else{
	//posiitve number please
	
	}
	 
 
 
 }
 

 }(jQuery));
  
  
  
  
  
  
  