/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";

  // Load the interpreter created by odsaAV.js
  var config = ODSA.UTILS.loadConfig();
  // var interpret = config.interpreter;
  var box1, box2, box3, box4;
  var boxes,
      rect_left,
      purple_top,
      initArr,
      ansArr = [],
      arrValues = [4, 13, 6, 9, 11],
      jsav_array,
      nodegap,
      nextleft;

  var settings = config.getSettings();

  var av = new JSAV("jsavcontainer", {settings: settings});

  av.recorded(); // we are not recording an AV with an algorithm

  // Process help button: Give a full help page for this activity
  function help() {
    window.open("iterationEXHelpPRO.html", "helpwindow");
  }

  // Process about button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring("Iteration Exercise", "Jieun Chon"));
  }

  // Set click handlers
  $("#help").click(help);
  $("#about").click(about);

  function initialize() {
    var leftMargin = 250,
        rect_left = leftMargin - 150,
        blue_top = 0,
        purple_top = 40,
        topMargin = purple_top + 20;
        av.umsg("Directions: Reproduce the behavior of blockpy iteration. Click block area to indicate the order of block execution.");
        var topblue = av.g.rect(rect_left, blue_top, 280, 35, 10).addClass("bluebox");
        var botblue = av.g.rect(rect_left, blue_top + 295, 280, 35, 10).addClass("bluebox");

        // floor 2
        av.g.rect(rect_left, purple_top, 250, 35.5, 10).addClass("purplebox");
        av.g.rect(rect_left, purple_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

        //floor 3 rects and array list JSAV contains arrValues' elements
        av.g.rect(rect_left, purple_top + 5, 30, 90, 10).addClass("purplebox").css({opacity: 0.9});
        av.g.rect(rect_left + 70, purple_top + 25, 30, 70, 10).addClass("purplebox").css({opacity: 0.9});


        // set JSAV array
        jsav_array = av.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});
        nextleft = leftMargin - 120;
        nodegap = 40;


        //floor 4, long purple
        av.g.rect(rect_left, purple_top + 76, 300, 30, 10).addClass("purplebox");

        //floor 5, left big purple box and 3 blue boxes
        av.g.rect(rect_left, purple_top + 80, 110, 170, 10).addClass("purplebox");
        av.g.rect(rect_left, purple_top + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

        //blue boxes and the the sets of it for the iterations later
        var midblue1 = av.g.rect(rect_left + 130, purple_top + 120, 130, 66, 10).addClass("bluebox");
        var midblue2 = av.g.rect(rect_left + 220, purple_top + 139, 20, 32, 15).addClass("calbox");
        var midblue3 = av.g.rect(rect_left + 240, purple_top + 120, 120, 66, 10).addClass("calbox");
        // last purple box.
        av.g.rect(rect_left + 90, purple_top + 200, 240, 50, 10).addClass("purplebox");


        // ---------------clickerbale boxes-----------------------
        box1 = av.g.rect(rect_left, blue_top, 280, 35, 10).addClass("box");
        box1.click(clickHandler1);
        box2 = av.g.rect(rect_left, purple_top, 350, 106, 10).addClass("box");
        box2.click(clickHandler2);
        box3 = av.g.rect(rect_left, purple_top + 105, 360, 145, 10).addClass("box");
        box3.click(clickHandler3);
        box4 = av.g.rect(rect_left, blue_top + 295, 280, 35, 10).addClass("box");
        box4.click(clickHandler4);

        boxes = [box1, box2, box3, box4];

        // ---------------loop -labels-----------------------
        var label1 = av.label("for each item", {left: rect_left + 5, top: purple_top - 25}).addClass("loopLabels");
        label1.onmouseover = function(){box1.addClass("hover")};

        av.label("price", {left: rect_left + 20, top: purple_top + 48}).addClass("loopLabels");
        av.label("do", {left: rect_left + 35, top: purple_top + 110}).addClass("loopLabels");
        av.label("print (price)", {left: rect_left + 15, top: blue_top + 275}).addClass("loopLabels").addClass("midlabel");

        return boxes;
  }

  function modelSolution(modeljsav) {
    var leftMargin = 280,
        rect_left = leftMargin - 150,
        blue_top = 0,
        purple_top = 40,
        topMargin = purple_top + 20;
        var topblue = modeljsav.g.rect(rect_left, blue_top, 280, 35, 10).addClass("bluebox");
        var botblue = modeljsav.g.rect(rect_left, blue_top + 295, 280, 35, 10).addClass("bluebox");

        // floor 2
        modeljsav.g.rect(rect_left, purple_top, 250, 35.5, 10).addClass("purplebox");
        modeljsav.g.rect(rect_left, purple_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

        //floor 3 rects and array list JSAV contains arrValues' elements
        modeljsav.g.rect(rect_left, purple_top + 5, 30, 90, 10).addClass("purplebox").css({opacity: 0.9});
        modeljsav.g.rect(rect_left + 70, purple_top + 25, 30, 70, 10).addClass("purplebox").css({opacity: 0.9});

        var model_nextleft = leftMargin - 120;
        var model_nodegap = 40;
        var arr = modeljsav.ds.array(arrValues, {indexed: false, left: leftMargin, top: topMargin, position: "absolute"});

        //floor 4, long purple
        modeljsav.g.rect(rect_left, purple_top + 76, 300, 30, 10).addClass("purplebox");

        //floor 5, left big purple box and 3 blue boxes
        modeljsav.g.rect(rect_left, purple_top + 80, 110, 170, 10).addClass("purplebox");
        modeljsav.g.rect(rect_left, purple_top + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

        //blue boxes and the the sets of it for the iterations later
        var midblue1 = modeljsav.g.rect(rect_left + 130, purple_top + 120, 130, 66, 10).addClass("bluebox");
        var midblue2 = modeljsav.g.rect(rect_left + 220, purple_top + 139, 20, 32, 15).addClass("calbox");
        var midblue3 = modeljsav.g.rect(rect_left + 240, purple_top + 120, 120, 66, 10).addClass("calbox");
        // last purple box.
        modeljsav.g.rect(rect_left + 90, purple_top + 200, 240, 50, 10).addClass("purplebox");

        // ---------------clickerbale boxes-----------------------
        var model_box1 = modeljsav.g.rect(rect_left, blue_top, 280, 35, 10).addClass("box");
        var model_box2 = modeljsav.g.rect(rect_left, purple_top, 350, 106, 10).addClass("box");
        var model_box3 = modeljsav.g.rect(rect_left, purple_top + 105, 360, 145, 10).addClass("box");
        var model_box4 = modeljsav.g.rect(rect_left, blue_top + 295, 280, 35, 10).addClass("box");
        var answer = [model_box1, model_box2, model_box3, model_box4];

        // ---------------loop -labels-----------------------
        modeljsav.label("for each item", {left: rect_left + 5, top: purple_top - 25}).addClass("loopLabels");
        modeljsav.label("price", {left: rect_left + 20, top: purple_top + 48}).addClass("loopLabels");
        modeljsav.label("do", {left: rect_left + 35, top: purple_top + 110}).addClass("loopLabels");
        modeljsav.label("print (price)", {left: rect_left + 15, top: blue_top + 275}).addClass("loopLabels").addClass("midlabel");

        modeljsav.displayInit(); // do displayInit after set all the objects

        // top blue
        model_box1.addClass("blueboxh");
        model_box1.removeClass("blueboxh");
        modeljsav.gradeableStep();

        // iterations
        for(var i = 0; i < 5; i++){
          model_box2.addClass("blueboxh");
          model_box2.removeClass("blueboxh");
          arr.css({left: model_nextleft});   //move array
          model_nextleft -= model_nodegap;
          modeljsav.gradeableStep();

          model_box3.addClass("blueboxh");
          model_box3.removeClass("blueboxh");
          modeljsav.gradeableStep();
        }

        // last iteration that won't pass
        model_box2.addClass("blueboxh");
        model_box2.removeClass("blueboxh");
        arr.css({left: model_nextleft});   //move array
        model_nextleft -= model_nodegap;
        modeljsav.gradeableStep();

        // last
        model_box4.addClass("blueboxh");
        model_box4.removeClass("blueboxh");
        modeljsav.gradeableStep();
    return answer;
  }


  var exercise = av.exercise(modelSolution, initialize,
                            { feedback: "continuous", fixmode : "fix", compare: {class: "blueboxh"}});
  exercise.reset();

  function clickHandler1() {
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    // exercise.gradeableStep();
  }

  function clickHandler2() {
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    jsav_array.css({left: nextleft});   //move array
    nextleft -= nodegap;
    // exercise.gradeableStep();
  }

  function clickHandler3() {
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    // exercise.gradeableStep();
  }

  function clickHandler4() {
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    // exercise.gradeableStep();
  }
});
