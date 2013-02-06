"use strict";
/*global alert: true, initArraySize, processArrayValues, reset */
(function ($) {
  var jsav;

   // create a new settings panel and specify the link to show it
  var settings = new JSAV.utils.Settings($(".jsavsettings"));

    // Process help button: Give a full help page for this activity
  // We might give them another HTML page to look at.
  function help() {
    //window.open("radixAVHelp.html", 'helpwindow'); // Sally: Create a help for the linked list
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    alert("Linked list insertion visualization\nWritten by Sally Hamouda as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  // Execute the "Run" button function
  function runIt() {    
      reset(true);
      jsav = new JSAV($('.avcontainer'));

    jsav.displayInit();
    linkedListInsert();
     //jsav.umsg("Done insertion!");
    jsav.recorded(); // mark the end
  }
  

  // Linked list insertion
  function linkedListInsert() {
    var toBeInsertedNode;
	var originalList;
	var originalListPart1;
	var originalListPart2;
	var currentArrow;
    var i;
	var  arrowFromTheFirstListHalf;
	var  arrowToTheSecondListHalf;
	jsav.umsg("Given a Linked List");
	// 1- Draw the original linked list with the current arrow pointer
	if (originalList) { originalList.clear(); }
	// The original linked list
	originalList= jsav.ds.list({top: (50), left: 206, nodegap: 40});
	//Building up the list with random numbers 
	//for (i = 0; i < 5; i++) {
	//For now I am hard coding the node values because of the splitting part ..otherwise I should save the randomly generated values of the node
    originalList.addLast(20);
	originalList.addLast(5);
	originalList.addLast(70);
	originalList.addLast(9);
	originalList.addLast(42);
	//}      
	originalList.layout({center: true});
	// Create the current arrow
	currentArrow = jsav.g.line(420, 0, 420, 50,
                    {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});	
   	currentArrow.show();
	// Label on the arrow (Current)
	jsav.label("curr", {before: originalList, left: 422, top: 0});	
		
	jsav.step();
		
	//2- Draw the to be inserted node
	// To be inserted node
	jsav.umsg("The new node to be inserted:");
	toBeInsertedNode = jsav.ds.list({top: (140), left: 470, nodegap: 30});
    toBeInsertedNode.layout({center: true});
	toBeInsertedNode.addLast(22); 
	jsav.step();
	
	
    jsav.umsg("The next field of the node preceding the current position. It used to point to the node containing 9; now it points to the new node.");
	
	//Hide the original list	
	while (originalList.size() !== 0) {
        originalList.remove(0);
        originalList.layout({center: false});
    }
	
	// 3- Break the original linked list into two linked lists inorder to insert the new node in between
	
	// List Part 1 : before and including the current node
    originalListPart1= jsav.ds.list({top: (50), left: 206, nodegap: 40});
	originalListPart1.addLast(20);
	originalListPart1.addLast(5);
	originalListPart1.addLast(70);
	originalListPart1.layout({center: true});
	
	// List Part 2 : all nodes after the current node
   	originalListPart2= jsav.ds.list({top: (50), left: 550, nodegap: 40});
	originalListPart2.addLast(9);
	originalListPart2.addLast(42);
	originalListPart2.layout({center: true});
   
   
   //Connect the left side of the new node to the first part of the linked list
  arrowFromTheFirstListHalf = jsav.g.line(450, 90, 470, 140,
                    {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});	
   arrowFromTheFirstListHalf.show();
   originalListPart1.get(2).highlight();
   jsav.step(); 
  
  //Connect the right side of the new node to the second part of the linked list
   
   jsav.umsg("The next field of the new link node is set to point to what used to be the current node (the node with value 9).");
   
    originalListPart1.get(2).unhighlight();
   arrowToTheSecondListHalf = jsav.g.line(523, 140, 556, 93,
                    {"arrow-end": "classic-wide-long", "opacity": 0, "stroke-width": 2});	
   arrowToTheSecondListHalf.show();
   originalListPart2.get(0).highlight();
   jsav.step();
   
   
    jsav.umsg("The linked list after insertion will be: ");
	while (originalListPart1.size() !== 0) {
        originalListPart1.remove(0);
        originalListPart1.layout({center: false});
    }
	while (originalListPart2.size() !== 0) {
        originalListPart2.remove(0);
        originalListPart2.layout({center: false});
    }
	while (toBeInsertedNode.size() !== 0) {
       toBeInsertedNode.remove(0);
       toBeInsertedNode.layout({center: false});
    }
	 arrowFromTheFirstListHalf.hide();
	 arrowToTheSecondListHalf.hide();
	 
	//For now I am hard coding the node values because of the splitting part ..otherwise I should save the randomly generated values of the node
    originalList.addLast(20);
	originalList.addLast(5);
	originalList.addLast(70);
	originalList.addLast(22);
	originalList.addLast(9);
	originalList.addLast(42);
	originalList.layout({center: true});
	
	//}      
	
  }

  // Connect action callbacks to the HTML entities
  $('#help').click(help);
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(reset);
}(jQuery));
