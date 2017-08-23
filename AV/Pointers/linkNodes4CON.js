//variable xPosition controls the horizontal position of the visualization
$(document).ready(function() {
  "use strict";
  var av_name = "linkNodes4CON";
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
    var leftMargin = 155;
    var topMargin = 38;
    var dashline = av.g.polyline([[leftMargin + 186, topMargin + 32],
            [leftMargin + 210, topMargin + 32],
            [leftMargin + 210, topMargin + 3],
            [leftMargin + 280, topMargin + 3],
            [leftMargin + 280, topMargin + 32],
            [leftMargin + 320, topMargin + 32]],
        {"arrow-end": "classic-wide-long",
            opacity: 0, "stroke-width": 2,
            "stroke-dasharray": "-"});
    dashline.hide();
    var linkedListStartPositionX = 300,
        linkedListStartPositionY = 40;
    var list = av.ds.list({left: linkedListStartPositionX, top:linkedListStartPositionY});
    av.umsg("Consider we have the following list");
    list.addLast(20).addLast(30).addLast(10).addLast(5);
    var head = av.pointer("head", list.get(0));
    list.layout();
    av.displayInit();
    av.umsg("");
    pseudo.show();
    pseudo.setCurrentLine(1);
    var q = av.pointer("q", list.get(1));
    av.step();
    pseudo.setCurrentLine(2);
    list.get(0).edgeToNext().hide();
    dashline.show();
    av.step();
    pseudo.setCurrentLine(3);
    q.target(list.get(2));
    list.get(1).edgeToNext().hide();
    av.recorded();
});
