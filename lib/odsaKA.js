/**
 * Author: Hosam Shahin
 * Last Modified: 2015-09-04
 */
(function() {
  var exerciesPath = window.location.pathname,
    query = Khan.queryString(),
    scoringServerEnabled = false,
    MODULE_NAME = query.module,
    MODULE_ORIGIN = parent.location.protocol + '//' + parent.location.host,
    // Whether student got the proficiency for the exercise or not.
    jsavExCSS = ["ArrayTree", "DoubleLinkList", "huffman"],
    toolProviderData = {};
  scoringServerEnabled = (query.scoringServerEnabled === "true");

  Khan.instBookId = Khan.query.instBookId ? Khan.query.instBookId : null;
  Khan.instSectionId = Khan.query.instSectionId ? Khan.query.instSectionId : null;
  Khan.exerciseName = Khan.getSeedInfo().sha1;
  Khan.odsaPointsAreaDeff = $.Deferred();
  Khan.odsaPointsAreaPromise = Khan.odsaPointsAreaDeff.promise();
  Khan.odsaExerciesPath = exerciesPath.substring(0, exerciesPath.lastIndexOf("/") + 1);
  Khan.attemptOrHintQueue = jQuery({});
  // Used for error reporting: what urls are in the queue when an error happens?
  Khan.attemptOrHintQueueUrls = [];

  // Dictionary of Summ loading and loaded exercises; keys are exercise IDs,
  // values are promises that are resolved when the exercise is loaded
  Khan.SummexerciseFilePromises = {};

  Khan.studentData = {
    'instBookId': Khan.instBookId,
    'module': MODULE_NAME,
    'sha1': Khan.exerciseName
  };

  Khan.proficiency = false;

  Khan.loadCss = function(url, moduleName) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = url;
    var head = document.getElementsByTagName("head")[0];
    if (jsavExCSS.indexOf(moduleName) > -1 || moduleName === "odsaKA") {
      head.appendChild(link);
    } else {
      head.insertBefore(link, head.firstChild);
    }
  };

  Khan.loadCss("../../lib/odsaKA-min.css", "odsaKA");

  // Update DOM elements when getting correct anwser
  Khan.correctAnswerEffect = function() {
    $("#check-answer-results > p").hide();
    $("#check-answer-button").hide();
    var nextButtonText;
    if (Exercises.learningTask && Exercises.learningTask.isComplete()) {
      nextButtonText = $._("Awesome! Show points...");
    } else {
      nextButtonText = $._("Correct! Next question...");
    }

    $("#next-question-button")
      .prop("disabled", false)
      .removeClass("buttonDisabled")
      .val(nextButtonText)
      .show()
      .focus();
    $("#positive-reinforcement").show();
    $("#skip-question-button").prop("disabled", true);
    $("#opt-out-button").prop("disabled", true);
  }

  // Process the message data coming from OpenPop Back end
  Khan.handleMsg = function(message, lineNum, fileName, className) {

    var newmessage = message.join(',');
    var re = "Try Again";
    newmessage = newmessage.replace(/\n/gi, "");

    if (newmessage.indexOf(re) == -1) { // /studentlisttest.java:/gi
      var re = new RegExp(fileName, 'g');
      newmessage = newmessage.replace(re, "Error:line# ");
      newmessage = newmessage.replace(className, "");
      newmessage = newmessage.replace(/\^/gi, "");

      var numbers = newmessage.match(/\d+\.?\d*/g);

      for (var i = numbers.length - 2; i >= 0; i--) {
        var newnumber = numbers[i] - lineNum;
        var stringnum = numbers[i] + '';
        var newstringnumber = newnumber + '';
        newmessage = newmessage.replace(stringnum, newstringnumber);
      }
    }

    var result = newmessage.split(",");
    return result;
  }

  // Show feed-back message from the back end
  Khan.feedbackEffect = function(message, lineNum, fileName, className) {

    var msg = Khan.handleMsg(message, lineNum, fileName, className);

    $('#progfeedback').empty();
    for (var i = 0; i < msg.length; i++) {
      var msgLine = $("<div>" + msg[i] + "</div>")
      $('#progfeedback').append(msgLine);
    }
  }

  // Update DOM elements when the answer is wrong
  Khan.wrongAnswerEffect = function(score, framework) {
    // Wrong answer. Enable all the input elements

    $("#check-answer-button")
      .parent() // .check-answer-wrapper makes shake behave
      .effect("shake", {
        times: 3,
        distance: 8
      }, 50)
      .val($._("Try Again"));
    // Is this a message to be shown?
    if (score.message != null) {
      $("#check-answer-results > p").html(score.message).show().tex();
    } else {
      $("#check-answer-results > p").hide();
    }

    if (framework === "perseus") {
      // TODO(alpert)?
    } else if (framework === "khan-exercises") {
      $(Khan).trigger("refocusSolutionInput");
    }
  }

  Khan.emptyMsgArea = function() {
    $('#solutionarea').empty();
  }

  /**
   * Queries the server for the user's current progress
   * gets the current exposed exercise and list of exercises answered correctly
   *
   * Can be triggered by the module page using postMessage when the page
   * loads or when a new user logs in
   */
  Khan.odsaGetExerciseData = function() {

    $('#points-area').empty();

    // Don't display the user's progress if there is no score server to
    if (scoringServerEnabled) {
      // Load in the exercise data from the server
      jQuery.ajax({
        // Do a request to the server API
        url: "/odsa_exercise_progresses/" + Khan.instBookId + "/" + Khan.instSectionId + "/" + Khan.exerciseName,
        type: "GET",
        dataType: "json",
        // Make sure cookies are passed along
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          if (Khan.odsaGetCurrentExercise) {
            if (data.exercise_progress) {
              Khan.studentData.current_exercise = data.exercise_progress.current_exercise || undefined;
              Khan.studentData.hinted_exercise = data.exercise_progress.hinted_exercise || undefined;
              Khan.studentData.correct_exercises = data.exercise_progress.correct_exercises || undefined;
              if (Khan.studentData.correct_exercises) {
                Khan.studentData.correct_exercises = Khan.studentData.correct_exercises.split(',');
              }
              Khan.odsaGetCurrentExercise.resolve();
            }
          }

          var current_score = 0,
            highest_score = 0,
            threshold = parseInt(data.threshold),
            current_progress = current_score;
          if (data.exercise_progress) {
            current_score = parseInt(data.exercise_progress.current_score);
            highest_score = parseInt(data.exercise_progress.highest_score);
            threshold = parseInt(data.threshold);

            if (highest_score >= threshold) {
              current_progress = threshold;
              Khan.proficiency = true;
              $('#prof_check_mark').show();
            } else {
              current_progress = current_score;
            }
          }

          Khan.odsaPointsAreaPromise.done(function() {
            var points_progress_text = $("<span style = 'font-size:60%'>Current score:  </span>");
            var points_progress = $("<span id = 'points-progress' style = 'font-size : 65%; font-weight : bold;'></span>").text(current_progress);
            var points_total_text = $("<span style = 'font-size:60%'> out of  </span>");
            var points_total = $("<span id = 'points-total' style = 'font-size : 65%; font-weight : bold;'></span>").text(threshold);
            $('#points-area').append(points_progress_text);
            $('#points-area').append(points_progress);
            $('#points-area').append(points_total_text);
            $('#points-area').append(points_total);
            var check_mark = $("<span id='prof_check_mark'><img src='../../khan-exercises/images/green_check.png'></span>");
            $('.exercises-header').append(check_mark);
            if (current_progress >= threshold) {
              $('#prof_check_mark').show();
            }
          });
        },
        error: function() {
          Khan.odsaPointsAreaPromise.done(function() {
            $('#points-area').text(" Score server cannot be reached!");
          });
        }
      });
    }
  };

  // recursively load summary exercises
  // summary exercises will be loadded as a list of individual exercies,
  // the actual loading for each individual exercise markup will be done in a later phase
  // by Khan.loadExercise function
  Khan.loadSummExercise = function(exerciseId, fileName) {

    var promise = Khan.SummexerciseFilePromises[exerciseId];
    if (promise != null) {
      return promise;
    } else {
      promise = Khan.SummexerciseFilePromises[exerciseId] = $.Deferred();
    }

    var subPromises = [];

    $.get(Khan.odsaExerciesPath + fileName)
      .done(function(data) {
        data = data.replace(/<script[^>]+src=[^<]*<\/script>/, "");

        var newContents = $(data).filter(".exercise");

        var summExercises = [];
        newContents.each(function(index) {
          var innerExerciseId = $(this).data("name");
          var innerFileName = innerExerciseId + ".html";
          if (innerExerciseId.indexOf("Summ") > -1) {
            summExercises.push(innerExerciseId);
            $(newContents[index]).attr('id', innerExerciseId);
            subPromises.push(Khan.loadSummExercise(innerExerciseId, innerFileName));
          }
        });

        for (var i = 0; i < summExercises.length; i++) {
          newContents = $(newContents).not("#" + summExercises[i]);
        }

        var $body = $('body');
        $body.append(newContents);

        // Wait for any subexercises to load, then resolve the promise
        $.when.apply($, subPromises)
          .then(function() {
            // Success; all subexercises loaded
            promise.resolve();
          }, function() {
            // Failure; some subexercises failed to load
            promise.reject();
          });
      }).fail(function(xhr, status) {
        Khan.warnTimeout();
      });

    return promise;
  }

  // create multipart KA exercise out of summary exercise.
  // if not summary exercise then call KA framework directly
  Khan.odsaLoadExercises = function() {
    $(function() {
      // for loading individual exercises in the summary exercise
      var promises = [];
      // for loading summary exercises in the summary exercise
      var summPromises = [];

      // if OpenDSA exercise is not "Summ" then fire KA directly
      if (Khan.currentExerciseId.indexOf("Summ") == -1) {
        return Khan.loadLocalModeSiteWhenReady();
      }

      // create a promise in case of summary exercise
      Khan.odsaGetCurrentExercise = $.Deferred();
      Khan.currentExercisePromise = Khan.odsaGetCurrentExercise.promise();

      // remoteExercises can have individual exercises and nested summary exercises
      var remoteExercises = $("div.exercise[data-name]");
      remoteExercises.each(function() {
        var exerciseId = $(this).data("name");
        var fileName = exerciseId + ".html";
        if (exerciseId.indexOf("Summ") > -1) {
          $(this).remove();
          summPromises.push(Khan.loadSummExercise(exerciseId, fileName));
        }
      });

      // All remote nested summary exercises (if any) have now been loaded
      $.when.apply($, summPromises)
        .then(function() {

          // name of all individual exercises to be loaded from individual files
          var remoteExercises = $("div.exercise[data-name]");
          remoteExercises.each(function() {
            var exerciseId = $(this).data("name");
            var fileName = exerciseId + ".html";
            promises.push(Khan.loadExercise(exerciseId, fileName));
          });

          // when all individual exercises are loaded, here we prepare the html markup to follow a multipart KA exercise
          // note: all exercises will be loaded into Khan.exercises object
          $.when.apply($, promises)
            .then(function() {
              var $body = $('body');

              // Remove all exercise elements
              $("div.exercise").detach();

              // create new .exercise div
              // Khan.currentExerciseId is the summary exercise being loaded which might contain individual exercises
              // as well as nested summary exercises.
              var $newExercise = $("<div>").addClass("exercise").data("name", Khan.currentExerciseId)
                // add global .vars element
                .append($("<div>").addClass("vars"))
                // add .problems element to add all the individual exercises under it as multiple .problem elements
                .append($("<div>").addClass("problems"));

              // add problems in each file to the new exercise div
              remoteExercises.each(function(index, value) {
                var currentRemoteExercise = $.data(value, "name");
                // get exercise marckup from Khan.exercies which matches the current name of remoteExercises
                var currentExercise = Khan.exercises.filter(function() {
                  return $.data(this, "name") === currentRemoteExercise;
                });

                // if currentExercise conatians style element, add it to the multipart exercise
                // note: exercise developer will be responsible for css collision
                if (currentExercise.data("style")) {
                  $.each(currentExercise.data("style"), function(i, styleContents) {
                    var style = document.createElement("style");
                    $(style).text(styleContents);
                    document.getElementsByTagName("head")[0].appendChild(style);
                  });
                }

                var exerciseId = $(this).data("name");
                var weight = $(this).data("weight");
                var block = $(this).data("block");

                var vars = currentExercise.children(".vars");
                // note: evey individual exercise should have div element with id under .problems to be extracted.
                var problems = currentExercise.children(".problems").children("div[id]")

                problems.each(function(index, value) {
                  var id = $(this).attr("id");
                  var type = $(this).data("type");
                  var problem = $(this).children();
                  var $newProblem = $("<div>").attr("id", id);

                  if (id) {
                    $newProblem.attr("id", id)
                  } else {
                    $newProblem.attr("id", exerciseId)
                  }
                  if (weight) {
                    $newProblem.attr("data-weight", weight)
                  }
                  if (block !== undefined && !block) {
                    $newProblem.attr("data-block", block)
                  }
                  if (type) {
                    $newProblem.attr("data-type", type)
                  }
                  $newProblem.append(vars).append(problem);
                  $newExercise.children(".problems").append($newProblem);
                })
              });
              $('body').prepend($newExercise);
              // Now we have a new markup for a multipart exercsie and we are ready to call KA framework
              Khan.loadLocalModeSiteWhenReady();
            });
        });
    });

    Khan.onjQueryLoaded();
    Khan.odsaInitEvents();
  };

  // when newProblem is created, initialize CodeMirror if needed
  Khan.odsaInitEvents = function() {
    $(Exercises)
      .bind("newProblem", function() {
        if (typeof CodeMirror !== 'undefined' && document.getElementById("codeTextarea") !== null) {
          window.editor = CodeMirror.fromTextArea(document.getElementById("codeTextarea"), {
            lineNumbers: true,
            readOnly: (typeof codeMirrorReadOnly !== "undefined") ? codeMirrorReadOnly || false : false,
            mode: "text/x-java",
          });
          window.initEditor = editor.getValue();
        }
      });
  };

  Khan.odsaFullUrl = function() {
    return "/odsa_exercise_attempts";
  };

  Khan.loadModule = function(moduleName, exerciseId) {
    exerciseId = exerciseId || null;
    var jsavExtensions = ["ArrayTree", "AVLextension",
        "binaryheap", "CircularQueue",
        "DoubleLinkList", "fp", "huffman", "InfiniteSequence",
        "redblacktree", "LinkList", "PLutils"
      ],
      jsavExPath = "../../DataStructures/",
      modulePromises = {},
      // Return the promise if it exists already
      selfPromise = modulePromises[moduleName];

    if (selfPromise) {
      return selfPromise;
    } else {
      selfPromise = $.Deferred();
    }

    KhanUtil.debugLog("loadModule mod " + moduleName);

    var path = "../../khan-exercises/utils/";
    // When module name has suffix as "Common" load it from the same exercise path
    var suffix = "Common";

    if ([Khan.currentExerciseId, exerciseId].indexOf(moduleName) > -1 || moduleName.indexOf(suffix, moduleName.length - suffix.length) !== -1) {
      path = Khan.odsaExerciesPath;
    } else if (jsavExtensions.indexOf(moduleName) > -1) {
      path = jsavExPath;
    } else {
      path = "../../khan-exercises/utils/";
    }

    if (moduleName === 'codemirror') {
      require(["codemirror",
        "codemirror/mode/clike/clike"
      ], function(CodeMirror) {
        window.CodeMirror = CodeMirror;
        Khan.loadCss("../../lib/CodeMirror-5.5.0/lib/codemirror.css", moduleName);
        selfPromise.resolve();
      });
    } else if (moduleName === 'jsav' || jsavExtensions.indexOf(moduleName) > -1) {
      require([
        "../../JSAV/lib/jquery.transit.js",
        "../../JSAV/lib/raphael.js"
      ], function() {
        require(["jsav"],
          function() {
            Khan.loadCss("../../lib/odsaStyle-min.css", moduleName);
            Khan.loadCss("../../JSAV/css/JSAV.css", moduleName);
            if (jsavExtensions.indexOf(moduleName) > -1) {
              require([jsavExPath + moduleName + ".js"],
                function() {
                  if (jsavExCSS.indexOf(moduleName) > -1) {
                    Khan.loadCss(jsavExPath + moduleName + ".css", moduleName);
                  }
                  selfPromise.resolve();
                });
            } else {
              selfPromise.resolve();
            }
          });
      });
    } else if (moduleName === "blockUI") {
      require(["blockUI"], function() {
        selfPromise.resolve();
      })
    } else {
      // Load the module
      require([path + moduleName + ".js"], function() {
        selfPromise.resolve();
      });
    }

    modulePromises[moduleName] = selfPromise;
    return selfPromise;
  };

  // Build the data to pass to the server
  Khan.buildAttemptData = function(correct, attemptNum, attemptContent, timeTaken, skipped, optOut) {
    var framework = Exercises.getCurrentFramework();
    var data;

    if (framework === "perseus") {
      data = PerseusBridge.getSeedInfo();
    } else if (framework === "khan-exercises") {
      data = Khan.getSeedInfo();
    }

    _.extend(data, {
      inst_book_id: Khan.instBookId,
      inst_section_id: Khan.instSectionId,
      // The module name. If the exercise is embedded in one
      // module_name: MODULE_NAME,
      // Ask for camel casing in returned response
      casing: "camel",
      // Whether we're moving to the next problem (i.e., correctness)
      complete: (correct || skipped) ? 1 : 0,
      count_hints: Khan.hintsUsed,
      time_taken: timeTaken,
      // How many times the problem was attempted
      attempt_number: attemptNum,
      // The answer the user gave
      attempt_content: attemptContent,
      // If working in the context of a LearningTask (on the new learning
      // dashboard), supply the task ID.
      // TODOX(laura): The web view in the iOS app doesn't have a learningTask
      // object on Exercises. To simplify this line, add getTaskId to
      // Exercises on the webapp as well.
      task_id: (Exercises.getTaskId && Exercises.getTaskId()) ||
        (Exercises.learningTask && Exercises.learningTask.get("id")),
      task_generation_time: (Exercises.learningTask &&
        Exercises.learningTask.get("generationTime")),
      user_mission_id: Exercises.userMissionId,
      // The current topic, if any
      topic_slug: Exercises.topicSlug,
      // The user assessment key if in assessmentMode
      user_assessment_key: Exercises.userAssessmentKey,
      // Whether the user is skipping the question
      skipped: skipped ? 1 : 0,
      // Whether the user is opting out of the task
      opt_out: optOut ? 1 : 0,
      // The client-reported datetime in local time (not UTC!).
      // Used by streaks.
      client_dt: moment().format()
    });

    return data;
  };

  Khan.saveAttemptToServer = function(url, attemptData) {
    if (!scoringServerEnabled) {
      return;
    }

    // Save the problem results to the server
    var promise = Khan.request(url, attemptData);

    promise.done(function(data) {
      var current_score = 0,
        highest_score = 0,
        threshold = 0,
        current_progress = 0;

      Khan.studentData.current_exercise = data.exercise_progress.current_exercise || undefined;
      Khan.studentData.hinted_exercise = data.exercise_progress.hinted_exercise || undefined;
      Khan.studentData.correct_exercises = data.exercise_progress.correct_exercises || undefined;
      if (Khan.studentData.correct_exercises) {
        Khan.studentData.correct_exercises = Khan.studentData.correct_exercises.split(',') || undefined;
      }

      if (data) {
        current_score = data.exercise_progress.current_score;
        highest_score = data.exercise_progress.highest_score;
        threshold = data.threshold;
      }

      if (highest_score >= threshold) {
        current_progress = threshold;
        $('#prof_check_mark').show();
      } else {
        current_progress = current_score;
      }

      if (current_progress >= threshold && MODULE_ORIGIN !== "") {
        Khan.proficiency = true;
        // TODO: recheck what is the purpose of sending this to the parent
        // parent.postMessage('{"exercise":"' + exerciseName + '","proficient":' + true + ',"error":' + false + '}', MODULE_ORIGIN);

        // send score to canvas
        if (toolProviderData.exerciseName === Khan.exerciseName) {
          toolProviderData.toParams.score = 1;
          jQuery.ajax({
            url: "/lti/assessment",
            type: "POST",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(toolProviderData),
            datatype: "json"
          });
        }
      }

      current_progress = parseInt(current_progress, 10);
      $('#points-progress').text(current_progress);
    });

    promise.fail(function(xhr) {
      parent.postMessage('{"exercise":"' + Khan.exerciseName + '","proficient":' + false + ',"error":' + true + '}', MODULE_ORIGIN);

      // Alert any listeners of the error before reload
      $(Exercises).trigger("attemptError");

      if (Khan.inUnload) {
        // This path gets called when there is a broken pipe during
        // page unload- browser navigating away during ajax request
        // See http://stackoverflow.com/a/1370383.
        return;
      }

      // Error during submit. Disable the page and ask users to
      // reload in an attempt to get updated data.

      // Hide the page so users don't continue, then warn the user about the
      // problem and encourage reloading the page
      $("#problem-and-answer").css("visibility", "hidden");

      if (xhr.statusText === "timeout") {
        // TODO(david): Instead of throwing up this error message, try
        //     retrying the request or something. See more details in
        //     comment in request().
        $(Exercises).trigger("warning",
          $._("Uh oh, it looks like a network request timed out! " +
            "You'll need to " +
            "<a href='%(refresh)s'>refresh</a> to continue. " +
            "If you think this is a mistake, " +
            "<a href='http://www.khanacademy.org/reportissue?" +
            "type=Defect'>tell us</a>.", {
              refresh: _.escape(window.location.href)
            }
          )
        );
      } else {
        $(Exercises).trigger("warning",
          $._("This page is out of date. You need to " +
            "<a href='%(refresh)s'>refresh</a>, but don't " +
            "worry, you haven't lost progress. If you think " +
            "this is a mistake, " +
            "<a href='http://www.khanacademy.org/reportissue?" +
            "type=Defect'>tell us</a>.", {
              refresh: _.escape(window.location.href)
            }
          )
        );
      }

      // Also log this failure to a bunch of places so we can see
      // how frequently this occurs, and if it's similar to the frequency
      // that we used to get for the endless spinner at end of task card
      // logs.
      var logMessage = "[" + (+new Date()) + "] request to " +
        url + " failed (" + xhr.status + ", " + xhr.statusText + ") " +
        "with " + (Exercises.pendingAPIRequests - 1) +
        " other pending API requests: " + Khan.attemptOrHintQueueUrls +
        " (in khan-exercises/interface.js:handleAttempt)";

      // Log to app engine logs... hopefully.
      $.post("/sendtolog", {
        message: logMessage,
        with_user: 1
      });

      // Also log to Sentry via Raven, just for some redundancy in case
      // the above request doesn't make it to our server somehow.
      if (window.Raven) {
        window.Raven.captureMessage(
          logMessage, {
            tags: {
              ipaddebugging: true
            }
          });
      }
    });

    return promise;
  };

  Khan.request = function(url, data) {
    if (!scoringServerEnabled) {
      return;
    }

    var params = {
      // Do a request to the server API
      url: url,
      type: "POST",
      data: data,
      dataType: "json",

      // If we don't receive a response within this many milliseconds, we
      // throw up an error (the red bar) and prevent the user from
      // continuing. Why do we timeout requests? Dropped requests seem to be
      // a real thing and causes problems. First, a dropped request is bad by
      // itself, but also prevents any future requests from being sent
      // because we queue up requests on the client. Also, before we render
      // the end-of-task card, we wait for all requests to return, and if
      // there's a dropped request, we throw up a spinner that spins forever.
      // This is a real problem that we were first made aware of from iPad
      // Safari users in classrooms. We also added logging after 60 seconds
      // of waiting for all requests to return at the pre-end-of-task card
      // spinner, and it occurs frequently (several times every minute).
      // Though it would be good to retry requests, that's going to be
      // slightly tricker to do to ensure the server can be idempotent or be
      // able to handle multiple requests. So for now, we are just showing
      // the red error bar, which, although jarring, is hopefully less bad
      // than being stuck with an endless spinner before the end of task
      // card and then losing all progress since the first dropped request.
      timeout: Exercises.requestTimeoutMillis
    };

    var deferred = $.Deferred();

    Khan.attemptOrHintQueue.queue(function(next) {
      var requestEndedParameters;

      Khan.attemptOrHintQueueUrls.push(params.url);
      $.kaOauthAjax(params).then(function(data, textStatus, jqXHR) {
        // This line calls any callbacks registered with the promise
        deferred.resolve(data, textStatus, jqXHR);

        // Tell any listeners that we now have new userExercise data
        $(Exercises).trigger("updateUserExercise", {
          userExercise: data,
          source: "serverResponse"
        });
      }, function(jqXHR, textStatus, errorThrown) {
        // Execute passed error function first in case it wants
        // to log the request queue or something like that.
        deferred.reject(jqXHR, textStatus, errorThrown);

        // Clear the queue so we don't spit out a bunch of queued up
        // requests after the error.
        // TODO(csilvers): do we need to call apiRequestEnded for
        // all these as well?  Exercises.pendingAPIRequests is now off.
        Khan.attemptOrHintQueue.clearQueue();
        Khan.attemptOrHintQueueUrls = [];

        requestEndedParameters = {
          "error": {
            textStatus: textStatus,
            errorThrown: errorThrown
          }
        };
      }).always(function() {
        var attemptedUrl = Khan.attemptOrHintQueueUrls.pop();
        // Sanity check.  attemptedUrl will be undefined on send-error.
        if (attemptedUrl && attemptedUrl !== params.url) {
          KhanUtil.debugLog("We just sent " + params.url + " but " +
            attemptedUrl + " was at queue-front!");
        }
        $(Exercises).trigger("apiRequestEnded", requestEndedParameters);
        next();
      });
    });

    // Trigger an apiRequestStarted event here, and not in the queued function
    // because listeners should know an API request is waiting as soon as it
    // gets queued up.
    $(Exercises).trigger("apiRequestStarted");

    return deferred.promise();
  };

  Khan.randRange = function(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

  $(function() {
    Khan.odsaGetExerciseData();

    // Create event handler to listen for messages from embedded exercises
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
      eventer = window[eventMethod],
      messageEvent = (eventMethod === "attachEvent") ? "onmessage" : "message";

    // Listen for message from parent
    eventer(messageEvent, function(e) {
      // Only accept post messages from the module page
      // IMPORTANT: This IF must be commented out (or 'module_origin' must
      // be changed in the config file and the book rebuilt) in order to do local testing
      if (e.origin !== MODULE_ORIGIN || !scoringServerEnabled) {
        return;
      }

      var data = JSON.parse(e.data);
      // Update session information based on message from parent page
      if (data.hasOwnProperty('outcomeService')) {
        toolProviderData = data;
      }
    });

    // Because new KA is using requireJS which loads JS module asynchronously, odsaMOD window.load
    // will fire before iframe JS modules are actually loaded.
    // So here the iframe will send message to parent in order for odsaMOD to send session_key
    if (scoringServerEnabled) {
      parent.postMessage({
        type: "ka-ready",
        exerciseName: Khan.exerciseName
      }, MODULE_ORIGIN);
    }
  });
}())