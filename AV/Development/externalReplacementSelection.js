/*
 * This is the AV for the timeline visulization for showing how a tree (NOT trie)
 * splits space. 
 */
(function ($) {
  var av = new JSAV("ExternalReplacementSelection");
  var t = av.ds.binarytree({nodegap: 25});
  var r = t.root("12");
  r.left("19");
  r.right("31");
  r.left().left("25");
  r.left().right("21");
  r.right().left("56");
  r.right().right("40");
  t.layout();
 

  // colors for animation
  var highlight_background_color = "#2B44CF";
  var highlight_text_color = "white";
  var unhighlight_background_color = "white";
  var unhighlight_background_split_color = "black";

  av.umsg("This is our starting heap:");
  t.layout(); // multiple layout() calls to fix off center tree issue
  av.displayInit();
  t.layout();

  // step 1
  av.umsg("We have an incoming value of 16.");
  var inputlabel = av.label("Input:", {left: 30, top: 30});
  var inputtree = av.ds.binarytree({nodegap: 25, left:30, top:60});
  var inputroot = inputtree.root("16");
  av.step();

  // step 2
  av.umsg("The root value 12 is output and 16 replaces it.");
  r.css({"background-color": highlight_background_color, "color": "white"});
  t.root("16");
  inputtree.hide();
  var outputlabel = av.label("Output:", {left: 650, top: 30});
  var outputtree = av.ds.binarytree({nodegap: 25, left:650, top:60});
  var outputroot = outputtree.root("12");
  av.step();

  // step 3
  av.umsg("Since both 19 and 31 are less than 16 we are done.");
  r.css({"background-color": unhighlight_background_color, "color": "black"});
  av.step();

  // step 4
  av.umsg("Now we have an input value of 29.");
  outputtree.hide();
  inputtree.root("29");
  inputtree.show();
  av.step();

  // step 5
  av.umsg("We replace the root value 16 with 29. The value 29 is greater than 19 so we must sift down.");
  r.css({"background-color": highlight_background_color, "color": "white"});
  t.root("29");
  inputtree.hide();
  outputtree.root("16");
  outputtree.show();
  av.step();

  // step 6
  av.umsg("The value 19 is less than 29 and 31 so its placement is correct. However 29 is greater than 25 and 21 so it must be moved again.");
  t.root("19");
  r.left("29");
  r.left().css({"background-color": highlight_background_color, "color": "white"});
  av.step();

  // step 7
  av.umsg("We choose 21 because it is less than 25 and we are done.");
  r.css({"background-color": unhighlight_background_color, "color": "black"});
  r.left("21");
  r.left().right().css({"background-color": highlight_background_color, "color": "white"});
  r.left().right("29");
  av.step();
 
  // step 8
  av.umsg("Now we have an input value of 14.");
  r.left().css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().right().css({"background-color": unhighlight_background_color, "color": "black"});
  outputtree.hide();
  inputtree.root("14");
  inputtree.show();
  av.step();

  // step 9
  av.umsg("14 is too small for this run and is placed at the end of the array, moving 40 to the root.");
  inputtree.hide();
  r.right().right().hide();
  outputtree.root("19");
  outputtree.show();
  var endtree = av.ds.binarytree({nodegap: 25, left:511, top:129});
  var endroot = endtree.root("14");  
  endroot.css({"background-color": highlight_background_color, "color": "white"});
  r.css({"background-color": highlight_background_color, "color": "white"});
  t.root("40");
  av.step();
 
  // step 10
  av.umsg("40 is greater than 21 and 31 so we must sift down.");
  endroot.css({"background-color": unhighlight_background_color, "color": "black"});
  av.step();

  // step 11
  av.umsg("21 is less than 40 and 31 so it finished moving. 40 is greater than 25 and 29 so we must sift down.");
  t.root("21");
  r.left().css({"background-color": highlight_background_color, "color": "white"});
  r.left("40");
  av.step();

  // step 12
  av.umsg("We choose 25 because it is less than 29 and we are done.");
  r.css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().left().css({"background-color": highlight_background_color, "color": "white"});
  r.left().left("40");
  r.left("25");
  av.step();

  // step 13
  av.umsg("Now we have an input value of 35.");
  r.left().left().css({"background-color": unhighlight_background_color, "color": "black"});
  r.left().css({"background-color": unhighlight_background_color, "color": "black"});
  outputtree.hide();
  inputtree.root("35");
  inputtree.show();
  av.step();

  // step 14
  av.umsg("We replace the root value 21 with 35. 35 is greater than 25 and 31 so we must sift down.");
  inputtree.hide();
  r.css({"background-color": highlight_background_color, "color": "white"});
  t.root("35");
  outputtree.root("21");
  outputtree.show();
  av.step();

  // step 15
  av.umsg("25 is now correctly placed. 35 is greater than 29 so we must sift down.");
  t.root("25");
  r.left().css({"background-color": highlight_background_color, "color": "white"});
  r.left("35");
  av.step();

  // step 16
  av.umsg("29 and 35 are now correctly placed and we are done.");
  r.css({"background-color": unhighlight_background_color, "color": "black"});
  r.left("29");
  r.left().right().css({"background-color": highlight_background_color, "color": "white"});
  r.left().right("35");
  av.step();

  // cleanup
  av.recorded();

}(jQuery));
