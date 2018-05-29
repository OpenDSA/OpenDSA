/* global ODSA, graphUtils */
(function($) {
  "use strict";
  var exercise,
    graph,
    config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter,
    settings = config.getSettings(),
    jsav = new JSAV($('.avcontainer'), {
      settings: settings
    }),
    box1, box2, box3, box4,
    boxes,
    rect_left,
    purple_top,
    initArr,
    ansArr = [],
    arrValues = [],
    iteration_array,
    jsavArray, // hided jsav array to check answer
    initialArray = [1, 2, 3, 4], // dummy array
    nodegap,
    nextleft,
    count,
    order,
    currHighlighted;

  jsav.recorded();

  function init() {

    // This value shows which box was clicked. Since it's beginning, set as -1
    currHighlighted = -1

    var len = Math.floor(Math.random() * 2) + 3;
    for (var i = 0; i < len; i++) {
      arrValues[i] = Math.floor(Math.random() * 25) + 1;
    }

    // create box click order
    var index = 1;

    order = [1];
    count = 0;
    for(var i = 0; i < len; i++){
      order[index] = 2;
      order[index + 1] = 3;
      index += 2;
    }
    order[index++] = 2;
    order[index] = 4;

    if (jsavArray) {
      jsavArray.clear();
    }

    // If ther user clicked the reset, then reset the iteration array.
    if (iteration_array) {
      iteration_array.clear();
    }

    // initialize jsavArray and make it invisible. This array is used only for grading purpose
    jsavArray = jsav.ds.array(initialArray);
    jsavArray.hide();

    var leftMargin = 250,
      rect_left = leftMargin - 150,
      top = 170,
      purple_top = top + 40,
      topMargin = purple_top + 20;

    var topblue = jsav.g.rect(rect_left, top, 280, 35, 10).addClass("bluebox");
    var botblue = jsav.g.rect(rect_left, top + 295, 280, 35, 10).addClass("bluebox");

    // floor 2
    jsav.g.rect(rect_left, purple_top, 250, 34, 10).addClass("purplebox");
    jsav.g.rect(rect_left, purple_top + 25, 50, 8.5).addClass("purplebox"); // for no-roung on the corner

    //floor 3 rects and array list JSAV contains arrValues' elements
    jsav.g.rect(rect_left, purple_top + 5, 30, 90, 10).addClass("purplebox").css({
      opacity: 0.9
    });
    jsav.g.rect(rect_left + 72, purple_top + 25, 30, 70, 10).addClass("purplebox").css({
      opacity: 0.9
    });


    // set JSAV array
    iteration_array = jsav.ds.array(arrValues, {
      indexed: false,
      left: leftMargin,
      top: topMargin,
      position: "absolute"
    });
    nextleft = 130;
    nodegap = 40;

    //floor 4, long purple
    jsav.g.rect(rect_left, purple_top + 83, 300, 30, 10).addClass("purplebox");

    //floor 5, left big purple box and 3 blue boxes
    jsav.g.rect(rect_left, purple_top + 85, 110, 165, 10).addClass("purplebox");
    jsav.g.rect(rect_left, purple_top + 83, 50, 15).addClass("purplebox"); // for no-roung on the corner

    //blue boxes and the the sets of it for the iterations later
    var midblue1 = jsav.g.rect(rect_left + 130, purple_top + 120, 230, 66, 10).addClass("bluebox");

    // last purple box.
    jsav.g.rect(rect_left + 90, purple_top + 200, 240, 50, 10).addClass("purplebox");


    // ---------------clickerbale boxes-----------------------
    box1 = jsav.g.rect(rect_left, top, 280, 35, 10).addClass("box");
    box1.click(clickHandler1);
    box2 = jsav.g.rect(rect_left, purple_top, 350, 112, 10).addClass("box");
    box2.click(clickHandler2);
    box3 = jsav.g.rect(rect_left, purple_top + 112, 360, 138, 10).addClass("box");
    box3.click(clickHandler3);
    box4 = jsav.g.rect(rect_left, top + 295, 280, 35, 10).addClass("box");
    box4.click(clickHandler4);

    // ---------------loop -labels-----------------------
    var label1 = jsav.label("for each item", {
      left: rect_left + 10,
      top: purple_top - 30
    }).addClass("loopLabels");
    label1.onmouseover = function() {
      box1.addClass("hover")
    };

    jsav.label("price", {
      left: rect_left + 20,
      top: purple_top + 53
    }).addClass("loopLabels");
    jsav.label("do", {
      left: rect_left + 35,
      top: purple_top + 110
    }).addClass("loopLabels");

    return jsavArray;
  }

  function model(modeljsav) {
    var modelArray = modeljsav.ds.array(initialArray);
    modelArray.hide();

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
    modeljsav.g.rect(rect_left, purple_top + 5, 30, 90, 10).addClass("purplebox").css({
      opacity: 0.9
    });
    modeljsav.g.rect(rect_left + 70, purple_top + 25, 30, 70, 10).addClass("purplebox").css({
      opacity: 0.9
    });

    var model_nextleft = leftMargin - 120;
    var model_nodegap = 40;
    var arr = modeljsav.ds.array(arrValues, {
      indexed: false,
      left: leftMargin,
      top: topMargin,
      position: "absolute"
    });

    //floor 4, long purple
    modeljsav.g.rect(rect_left, purple_top + 76, 300, 30, 10).addClass("purplebox");

    //floor 5, left big purple box and 3 blue boxes
    modeljsav.g.rect(rect_left, purple_top + 80, 110, 170, 10).addClass("purplebox");
    modeljsav.g.rect(rect_left, purple_top + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

    //blue boxes and the the sets of it for the iterations later
    var midblue1 = modeljsav.g.rect(rect_left + 130, purple_top + 120, 230, 66, 10).addClass("bluebox");

    // last purple box.
    modeljsav.g.rect(rect_left + 90, purple_top + 200, 240, 50, 10).addClass("purplebox");

    // ---------------clickerbale boxes-----------------------
    var model_box1 = modeljsav.g.rect(rect_left, blue_top, 280, 35, 10).addClass("box");
    var model_box2 = modeljsav.g.rect(rect_left, purple_top, 350, 108, 10).addClass("box");
    var model_box3 = modeljsav.g.rect(rect_left, purple_top + 105, 360, 145, 10).addClass("box");
    var model_box4 = modeljsav.g.rect(rect_left, blue_top + 295, 280, 35, 10).addClass("box");
    var answer = [model_box1, model_box2, model_box3, model_box4];

    // ---------------loop -labels-----------------------
    modeljsav.label("for each item", {
      left: rect_left + 10,
      top: purple_top - 30
    }).addClass("loopLabels");
    modeljsav.label("price", {
      left: rect_left + 20,
      top: purple_top + 48
    }).addClass("loopLabels");
    modeljsav.label("do", {
      left: rect_left + 35,
      top: purple_top + 110
    }).addClass("loopLabels");

    modeljsav.displayInit(); // do displayInit after set all the objects

    //-----------------> Gradable Steps <------------------------
    // top blue

    var model_curr_highlighted = -1;
    model_box1.addClass("blueboxh");
    model_box1.removeClass("blueboxh");
    modelArray.highlight(0);
    model_curr_highlighted = 0;
    modeljsav.umsg("Any block before the iteration was execution.");
    modeljsav.gradeableStep();

    // iterations
    for (var i = 0; i < arrValues.length; i++) {
      model_box2.addClass("blueboxh");
      model_box2.removeClass("blueboxh");
      arr.css({
        left: model_nextleft
      }); //move array
      model_nextleft -= model_nodegap;
      modeljsav.umsg("For loop Statement was executed.");
      modelArray.unhighlight(model_curr_highlighted);
      modelArray.highlight(1);
      model_curr_highlighted = 1;
      modeljsav.gradeableStep();

      model_box3.addClass("blueboxh");
      model_box3.removeClass("blueboxh");
      modeljsav.umsg("Body of the iteration was executed");
      modelArray.unhighlight(model_curr_highlighted);
      modelArray.highlight(2);
      model_curr_highlighted = 2;
      modeljsav.gradeableStep();
    }

    // last iteration that won't pass
    model_box2.addClass("blueboxh");
    model_box2.removeClass("blueboxh");
    model_nextleft -= 50;
    arr.css({
      left: model_nextleft
    }); //move array

    modeljsav.umsg("For loop Statement was executed.");
    modelArray.unhighlight(model_curr_highlighted);
    modelArray.highlight(1);
    model_curr_highlighted = 1;
    modeljsav.gradeableStep();

    // last
    model_box4.addClass("blueboxh");
    model_box4.removeClass("blueboxh");
    modeljsav.umsg("Any Block(s) after the iteration are executed.");
    modelArray.unhighlight(model_curr_highlighted);
    modelArray.highlight(3);
    modeljsav.gradeableStep();
    return modelArray;
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    window.alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  exercise = jsav.exercise(model, init, {
    compare: {
      class: "jsavhighlight"
    },
    controls: $('.jsavexercisecontrols'),
  });
  exercise.reset();

  $("#about").click(about);

  function clickHandler1() {
    // if (currHighlighted !== -1) {
    //   jsavArray.unhighlight(currHighlighted);
    // }
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    jsavArray.highlight(0);
    if(order[count] == 1){
      currHighlighted = 0;
      count++;
    }
    exercise.gradeableStep();
  }

  function clickHandler2() {
    if (currHighlighted !== -1) {
      jsavArray.unhighlight(currHighlighted);
    }
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
     if(order[count] == 2){
      iteration_array.css({
        left: nextleft
      }); //move array
      nextleft -= nodegap;
      count++;
      currHighlighted = 1;
    }
    jsavArray.highlight(1);
    exercise.gradeableStep();
  }

  function clickHandler3() {
    if (currHighlighted !== -1) {
      jsavArray.unhighlight(currHighlighted);
    }
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    if(order[count] == 3){
      count++;
      currHighlighted = 2;
    }
    jsavArray.highlight(2);
    exercise.gradeableStep();
  }

  function clickHandler4() {
    if (currHighlighted !== -1) {
      jsavArray.unhighlight(currHighlighted);
    }
    this.addClass("blueboxh");
    this.removeClass("blueboxh");
    if(order[count] == 4){
      count++;
      currHighlighted = 3;
    }
    jsavArray.highlight(3);
    exercise.gradeableStep();
  }

}(jQuery));
