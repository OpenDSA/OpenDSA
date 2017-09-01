//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes3CON";
  // Load the config object with interpreter and code created by odsaUtils.js
  var av;
  av = new JSAV(av_name);
  var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        code = config.code;
  var pseudo = av.code(code[0]);
  pseudo.element.css({
        position: "absolute",
        top: 10,
        left: -10
  });
    pseudo.hide();
    var linkedListStartPositionX = 300,
        linkedListStartPositionY = 40;
    var list = av.ds.list({left: linkedListStartPositionX, top:linkedListStartPositionY});
    av.umsg("Consider we have the following list");
    list.addLast(20).addLast(30).addLast(10).addLast(5);
    var head = av.pointer("head", list.get(0),{anchor:"center bottom", myAnchor:"right top",top:10, left:-20, arrowAnchor: "center bottom"});
    list.layout();
    av.displayInit();
    av.umsg("This new link reference will point to the same node pointed by head. We can use curr link to loop through the chain of nodes");
    pseudo.show();
    pseudo.setCurrentLine(1);
    var curr = av.pointer("curr", list.get(0));
    av.step();
    av.umsg("This loop will continue till curr is null.");
    pseudo.setCurrentLine(2);
    av.step();
    av.umsg("Iterate the curr to the next node");
    pseudo.setCurrentLine(3);
    curr.target(list.get(1));
    av.step();
    av.umsg("This loop will continue till curr is null.");
    pseudo.setCurrentLine(2);
    av.step();
    av.umsg("Iterate the curr to the next node");
    pseudo.setCurrentLine(3);
    curr.target(list.get(2));
    av.step();
    av.umsg("This loop will continue till curr is null.");
    pseudo.setCurrentLine(2);
    av.step();
    av.umsg("Iterate the curr to the next node");
    pseudo.setCurrentLine(3);
    curr.target(list.get(3));
    av.step();
    av.umsg("Now curr points to a node with null next. So this loop stops.");
    pseudo.setCurrentLine(2);
    av.step();
    av.recorded();
});
