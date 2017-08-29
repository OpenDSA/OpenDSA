//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes2CON";
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
    var linkedListStartPositionX = 600,

        linkedListStartPositionY = 50;

    av.umsg("Now lets see how to construct a chain of nodes");
    av.displayInit();
    av.umsg("This line creates an empty node. This node is pointed by the head link.");
    var list = av.ds.list({top:linkedListStartPositionY, left:linkedListStartPositionX});

    pseudo.setCurrentLine(1);
    list.addFirst("null");
    var head = av.pointer("head", list.get(0));
    list.layout();
    av.step();
    av.umsg("This line sets the data field of a node to value of 20");

    pseudo.setCurrentLine(3);
    list.get(0).value(20);

    av.step();
    av.umsg("We can set the element value directly in the constructor. But we have to store an object, not a primitive");
    pseudo.setCurrentLine(6);
    list.addLast(30);
    list.layout();
    av.step();
    av.umsg("It can get tiresome to chain all the \"next\" fields from the head");
    pseudo.setCurrentLine(7);
    list.addLast(10);
    list.layout();
    av.step();
    av.umsg("Instead of using a lot of \".next\", we can define a reference to a node and use it to chain a new node in the next");
    pseudo.setCurrentLine(9);
    var temp = av.pointer("temp", list.get(2));
    av.step();
    av.umsg("This makes adding new node more easy than chaining all the \"next\" fields");
    pseudo.setCurrentLine(10);
    list.addLast(5);
    list.layout();
    av.recorded();
});
