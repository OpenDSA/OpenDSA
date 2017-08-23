//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes1CON";
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
        linkedListStartPositionY = 50;
    var list = av.ds.list({left: linkedListStartPositionX, top:linkedListStartPositionY});
    av.umsg("Consider we have the following list");
    list.addLast(20).addLast(30).addLast(10).addLast(5);
    var head = av.pointer("head", list.get(0));
    list.layout();
    av.displayInit();
    pseudo.show();
    pseudo.setCurrentLine(1);
    var p = av.pointer("p",list.get(0));
    av.step();
    pseudo.setCurrentLine(2);
    var q = av.pointer("q",list.get(1));
    av.step();
    pseudo.setCurrentLine(3);
    var r = av.pointer("r",list.get(2));
    av.step();
    var myVal = av.label("myVal", {left: linkedListStartPositionX + 400, top:linkedListStartPositionY});
    av.g.rect(linkedListStartPositionX + 450, linkedListStartPositionY, 50, 40);
    av.label("30", {left: linkedListStartPositionX + 460, top:linkedListStartPositionY});

    av.recorded();

});
