//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes5CON";
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
    var linkedListStartPositionX = 450,
        linkedListStartPositionY = 50;
    var list = av.ds.list({nodegap: 30, center: false, left: linkedListStartPositionX, top: linkedListStartPositionY});
    av.umsg("Consider we have the following list");
    list.addLast(20).addLast(30).addLast(10).addLast(5);
    var head = av.pointer("head", list.get(0));
    list.layout();
    av.displayInit();
    av.umsg("");
    pseudo.show();
    pseudo.setCurrentLine(1);
    var newNode = list.newNode("8");
    newNode.css({
        top: 0,
        left: -80
    });
    var newLink = av.pointer("newLink", newNode,{anchor:"center bottom", myAnchor:"right top",top:10, left:-20, arrowAnchor: "center bottom"});
    newNode.highlight();
    av.step();
    pseudo.setCurrentLine(2);
    list.addFirst(newNode);
    list.layout();
    av.step();
    pseudo.setCurrentLine(3);
    head.target(newNode);
    list.layout();
    newNode.unhighlight();
    av.recorded();
});
