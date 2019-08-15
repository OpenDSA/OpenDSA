/**
* Module that contains support for FA automated exercises.
* Depends on core.js, anim.js, utils.js, translate.js
*/
/*global JSAV, jQuery, console */
(function($) {
  "use strict";
  if (typeof JSAV === "undefined") { return; }
  // function to filter the steps to those that should be graded

  var exerciseScore = {
    totalScore: 10,
    studentScore: 0,
    numberOfHints: 0,
    numberOfAutoSteps: 0,
    numberOfCorrectTestCases: 0,
    
    toString: function(){
      return "Total Points: " + this.totalScore + ", Student Score: " + this.studentScore + ", Correct Test Case: " + this.numberOfAutoSteps;
    },
    reset: function(){
      this.totalScore = 10;
      this.studentScore = 0;
      this.numberOfHints = 0;
      this.numberOfAutoSteps = 0;
      this.numberOfCorrectTestCases = 0;
    }
  }

  var FLExercise = function(jsav, options) {
    this.jsav = jsav;
    this.score = new exerciseScore;
    this.options = jQuery.extend({reset: function() { }, controls: null, feedback: "atend",
                                  feedbackSelectable: false, fixmode: "undo",
                                  fixmodeSelectable: false, grader: "default",
                                  resetButtonTitle: this.jsav._translate("resetButtonTitle"),
                                  modelButtonTitle: this.jsav._translate("modelButtonTitle"),
                                  gradeButtonTitle: this.jsav._translate("gradeButtonTitle")
                                 },
                                  window.JSAV_EXERCISE_OPTIONS,
                                  options);
    // initialize controls
    var cont = $(this.options.controls),
        self = this;
    if (cont.size() === 0) {
      cont = this.jsav.container.find(".jsavexercisecontrols");
    }
    // function to handle the reset event
    var resetHandler = function() {
      self.jsav.logEvent({type: "jsav-exercise-reset"});
      self.reset();
    };
    
    // allow reset and model answer through an event triggered on container
    this.jsav.container.bind({"jsav-exercise-reset": resetHandler});
    if (cont.size()) {
      var $reset = $('<input type="button" name="reset" value="' + this.options.resetButtonTitle + '" />')
                      .click(resetHandler),
          $action = $('<span class="actionIndicator"></span>');
      cont.append($reset, $action);
      $action.position({of: cont.children().last(), at: "right center", my: "left+5 center-2"});
    }
    
  };

  //convert this function to tst the test cases
  var allEqual = function(solution, testCases, testingFunction) {
    //call the test case function
    var results = testingFunction(solution, testCases);
    
    this.jsav.logEvent({type: "jsav-exercise-grade", score: $.extend({}, this.score.toString())});
    return 
  };
  var graders = {
    //need to add different grading functions FL

  }; // end grader specification

  var exerproto = FLExercise.prototype;


  exerproto._updateScore = function() {
    if (this.options.feedback === "continuous") {

      // cache to make access faster
      var container = this.jsav.container,
          score = this.score;
      if (this._defaultscoretext) {
        container.find(".jsavamidone").html((score.total === score.correct)?
            this.jsav._translate("doneLabel"):this.jsav._translate("remainingLabel") + " <span class='jsavpointsleft'></span>");
      }
      // Fields of the score object:
      // score.total = steps in total in the exercise
      // score.correct = steps correct in the student solution
      // score.fix = steps fixed in the student solution
      // score.undo = steps undone in the student solution

      // check how many points have been undone
      var undo = score.undo;
      // if the current step was undone, it is not counted in the correct field yet
      // so we have to reduce the undo by one
      if (this._undoneSteps[this.jsav.currentStep()]) {
        undo = undo - 1;
      }
      // update the widget fields
      container.find(".jsavcurrentscore").text(score.correct - undo);
      container.find(".jsavcurrentmaxscore").text(score.correct + score.fix + score.undo);
      container.find(".jsavmaxscore").text(score.total);
      container.find(".jsavpointsleft").text((score.total - score.correct  - score.fix) || this.jsav._translate("doneLabel"));
      container.find(".jsavpointslost").text(score.fix || score.undo || 0);
    }
  };
  exerproto.grade = function(solution, testCases) {
    // behavior in a nutshell:
    // 1. get the student's solution
    // 2. get the model answer
    // 3. rewind both
    // 4. compare the states in the visualizations
    // 5. TODO: scale the points
    // 6. return result
    // 7. TODO: show comparison of own and model side by side (??)
    
    return this.score;
  };
  exerproto.showGrade = function() {
    // shows an alert box of the grade
    this.grade();
    var grade = this.score,
      msg = this.jsav._translate("yourScore") + " " + (grade.correct) + " / " + grade.total;
    if (grade.fix > 0) {
      msg += "\n" + this.jsav._translate("fixedSteps") + " " + grade.fix;
    }
    window.alert(msg);
  };
 
  exerproto.reset = function() {
    this.jsav.clearAnimation();
    this.score.reset();
    this.jsav.RECORD = true;
    this.initialStructures = this.options.reset();
    this.jsav.displayInit();
    this.jsav.recorded();
    if (this.modelav) {
      this.modelav.container.remove();
      this.modelav = undefined;
      this.modelStructures = undefined;
    }
    this._updateScore();
    // log the initialization of an exercise, passing the exercise as data
    // this enables other components on a page to get access to the exercise object
    this.jsav.logEvent({type: "jsav-exercise-init", exercise: this});
  };
  exerproto._jsondump = function() {
    var jsav = this.jsav,
        states = [],
        forw = true,
        initial = this.initialStructures,
        origStep = jsav.currentStep(),
        oldFx = $.fx.off || false;
    $.fx.off = true;
    var getstate = function() {
      if ($.isArray(initial)) {
        var state = [];
        for (var i=0, l=initial.length; i < l; i++) {
          state.push(initial[i].state());
        }
        return state;
      } else {
        return initial.state();
      }
    };
    jsav.begin();
    while (forw) {
      states.push(getstate());
      forw = jsav.forward();
    }
    this.jsav.jumpToStep(origStep);
    $.fx.off = oldFx;
    return JSON.stringify(states);
  };

  JSAV._types.FLExercise = FLExercise;
  
  JSAV.ext.flexercise = function(model, reset, options) {
    var opts = $.extend({model: model, reset: reset}, options);
    return new FLExercise(this, opts);
    // options:
    //  - reset: a function that initializes the exercise and returns the structure(s) to
    //           compare in grading
    //  - model: a function that generates the model answer and returns the structure(s) to
    //           compare in grading
    //  - controls: a DOM/jQuery element or a selector for the element where the exercise
    //              controls (reset, model, grade) are to be added
  };
}(jQuery));