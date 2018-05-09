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
    count;

  jsav.recorded();

  function init() {
    var len = Math.floor(Math.random() * 2) + 3;
    for (var i = 0; i < len; i++) {
      arrValues[i] = Math.floor(Math.random() * 25) + 1;
    }

    if (jsavArray) {
      jsavArray.clear();
    }

    var leftMargin = 250,
      rect_left = leftMargin - 150,
      top = 170,
      purple_top = top + 40,
      topMargin = purple_top + 20;

    var topblue = jsav.g.rect(rect_left, top, 280, 35, 10).addClass("bluebox");
    var botblue = jsav.g.rect(rect_left, top + 295, 280, 35, 10).addClass("bluebox");

    // floor 2
    jsav.g.rect(rect_left, purple_top, 250, 35.5, 10).addClass("purplebox");
    jsav.g.rect(rect_left, purple_top + 20, 50, 15).addClass("purplebox"); // for no-roung on the corner

    //floor 3 rects and array list JSAV contains arrValues' elements
    jsav.g.rect(rect_left, purple_top + 5, 30, 90, 10).addClass("purplebox").css({
      opacity: 0.9
    });
    jsav.g.rect(rect_left + 70, purple_top + 25, 30, 70, 10).addClass("purplebox").css({
      opacity: 0.9
    });


    // set JSAV array
    iteration_array = jsav.ds.array(arrValues, {
      indexed: false,
      left: leftMargin,
      top: topMargin,
      position: "absolute"
    });
    nextleft = leftMargin - 120;
    nodegap = 40;

    //floor 4, long purple
    jsav.g.rect(rect_left, purple_top + 76, 300, 30, 10).addClass("purplebox");

    //floor 5, left big purple box and 3 blue boxes
    jsav.g.rect(rect_left, purple_top + 80, 110, 170, 10).addClass("purplebox");
    jsav.g.rect(rect_left, purple_top + 76, 50, 15).addClass("purplebox"); // for no-roung on the corner

    //blue boxes and the the sets of it for the iterations later
    var midblue1 = jsav.g.rect(rect_left + 130, purple_top + 120, 230, 66, 10).addClass("bluebox");

    // last purple box.
    jsav.g.rect(rect_left + 90, purple_top + 200, 240, 50, 10).addClass("purplebox");


    // ---------------clickerbale boxes-----------------------
    box1 = jsav.g.rect(rect_left, top, 280, 35, 10).addClass("box");
    // box1.click(clickHandler1);
    box2 = jsav.g.rect(rect_left, purple_top, 350, 106, 10).addClass("box");
    // box2.click(clickHandler2);
    box3 = jsav.g.rect(rect_left, purple_top + 105, 360, 145, 10).addClass("box");
    // box3.click(clickHandler3);
    box4 = jsav.g.rect(rect_left, top + 295, 280, 35, 10).addClass("box");
    // box4.click(clickHandler4);

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
      top: purple_top + 48
    }).addClass("loopLabels");
    jsav.label("do", {
      left: rect_left + 35,
      top: purple_top + 110
    }).addClass("loopLabels");

    return jsavArray;
  }

  function fixState(modelGraph) {
    // var graphEdges = graph.edges(),
    //     modelEdges = modelGraph.edges();
    //
    // // compare the edges between exercise and model
    // for (var i = 0; i < graphEdges.length; i++) {
    //   var edge = graphEdges[i],
    //       modelEdge = modelEdges[i];
    //   if (modelEdge.hasClass("marked") && !edge.hasClass("marked")) {
    //     // mark the edge that is marked in the model, but not in the exercise
    //     markEdge(edge);
    //     break;
    //   }
    // }
  }

  function model(modeljsav) {
    var i;
    // create the model
    var modelGraph = modeljsav.ds.graph({
      width: 400,
      height: 400,
      layout: "automatic",
      directed: false
    });

    // // copy the graph and its weights
    // graphUtils.copy(graph, modelGraph, {weights: true});
    // var modelNodes = modelGraph.nodes();
    //
    // // Mark the 'A' node
    // modelNodes[0].addClass("marked");
    //
    // modeljsav.displayInit();
    //
    // // start the algorithm
    // dfs(modelNodes[0], modeljsav);
    //
    // modeljsav.umsg(interpret("av_ms_final"));
    // // hide all edges that are not part of the search tree
    // var modelEdges = modelGraph.edges();
    // for (i = 0; i < modelGraph.edges().length; i++) {
    //   if (!modelEdges[i].hasClass("marked")) {
    //     modelEdges[i].hide();
    //   }
    // }
    //
    // modeljsav.step();

    return modelGraph;
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

}(jQuery));
