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
    var list = av.ds.list({left: linkedListStartPositionX, top:linkedListStartPositionY});
    pseudo.setCurrentLine(1);
    list.addFirst("null");
    var head = av.pointer("head", list.get(0));
    list.layout();
    av.displayInit();
    pseudo.setCurrentLine(3);
    list.get(0).value(20);
    av.step();
    pseudo.setCurrentLine(6);
    list.addLast(30);
    list.layout();
    av.step();
    pseudo.setCurrentLine(7);
    list.addLast(10);
    list.layout();
    av.step();
    pseudo.setCurrentLine(9);
    var temp = av.pointer("temp", list.get(2));
    av.step();
    pseudo.setCurrentLine(10);
    list.addLast(5);
    list.layout();
    av.recorded();
});
