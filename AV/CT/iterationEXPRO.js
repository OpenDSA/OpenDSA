/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";

  // Load the interpreter created by odsaAV.js
  var config = ODSA.UTILS.loadConfig();
  // var interpret = config.interpreter;
  var midblue1, midblue2, midblue3;
  var boxes,
      rect_left,
      rect_top,
      original_arr = [-1,-1,-1],
      initArr,
      ansArr = [];

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
    initArr = av.ds.array(original_arr);
    initArr.hide();
    rect_left = 50;
    rect_top = 0;
    midblue1 = av.g.rect(rect_left + 130, rect_top + 20, 130, 30, 10).addClass("bluebox");
    midblue1.click(clickHandler1);
    midblue2 = av.g.rect(rect_left + 130, rect_top + 50, 130, 30, 10).addClass("bluebox");
    midblue2.click(clickHandler2);
    midblue3 = av.g.rect(rect_left + 130, rect_top + 80, 130, 30, 10).addClass("bluebox");
    midblue3.click(clickHandler3);
    boxes = [midblue1, midblue2, midblue3];
    return initArr;
  }

  function modelSolution(modeljsav) {
    var modelArray = modeljsav.ds.array(original_arr);
    modelArray.hide();
    // modeljsav.umsg("click in right order");
    var midblue1c = modeljsav.g.rect(rect_left + 130, rect_top + 20, 130, 30, 10).addClass("bluebox");
    var midblue2c = modeljsav.g.rect(rect_left + 130, rect_top + 50, 130, 30, 10).addClass("bluebox");
    var midblue3c = modeljsav.g.rect(rect_left + 130, rect_top + 80, 130, 30, 10).addClass("bluebox");
    var answer = [midblue1c, midblue2c, midblue3c];

    modeljsav.displayInit();

    answer[0].addClass("blueboxh");
    // answer[0].removeClass("blueboxh");
    modelArray.value(0, 1);
    modeljsav.gradeableStep();

    answer[1].addClass("blueboxh");
    // answer[1].removeClass("blueboxh");
        modelArray.value(1, 2);
    modeljsav.gradeableStep();

    answer[2].addClass("blueboxh");
    // answer[2].removeClass("blueboxh");
    modelArray.value(2, 3);
    modeljsav.gradeableStep();
    return answer;
  }


  var exercise = av.exercise(modelSolution, initialize,
                            { feedback: "continuous", fixmode : "fix", compare: {class: "blueboxh"}});
  exercise.reset();

  function clickHandler1() {
    this.addClass("blueboxh");
    // this.removeClass("blueboxh");
    initArr.value(0,1);
    exercise.gradeableStep();
  }

  function clickHandler2() {
    this.addClass("blueboxh");
    // this.removeClass("blueboxh");
    initArr.value(1,2);
    exercise.gradeableStep();
  }

  function clickHandler3() {
    this.addClass("blueboxh");
    // this.removeClass("blueboxh");
    initArr.value(2,3);
    exercise.gradeableStep();
  }



});
