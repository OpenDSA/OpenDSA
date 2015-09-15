/**
 * TODO: file documentation goes here
 *
 * Author: Hosam Shahin
 * Last Modified: 2015-09-04
 */
(function() {
  var exerciesPath = window.location.pathname,
    query = Khan.queryString(),
    server = query.exerciseServer,
    BOOK_ID = query.book ? query.book : typeof OpenPopKa !== "undefined" ? "CS3114" : null,
    MODULE_NAME = query.module,
    SESSION_KEY = 'phantom-key',
    MODULE_ORIGIN = parent.location.protocol + '//' + parent.location.host,
    exerciseName = Khan.getSeedInfo().sha1,

    // Whether student got the proficiency for the exercise or not.
    proficiency = false;

  Khan.tempdeff = $.Deferred();
  Khan.testdeffer = Khan.tempdeff.promise();

  Khan.odsaExerciesPath = exerciesPath.substring(0, exerciesPath.lastIndexOf("/") + 1);
  Khan.attemptOrHintQueue = jQuery({});
  // Used for error reporting: what urls are in the queue when an error happens?
  Khan.attemptOrHintQueueUrls = [];

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

    for (var i = 0; i < msg.length; i++) {
      var msgLine = $("<div>" + msg[i] + "</div>")
      $('#solutionarea').append(msgLine);
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
   *
   * Can be triggered by the module page using postMessage when the page
   * loads or when a new user logs in
   */
  Khan.odsaUpdatePoints = function() {
    var jsonData = {};
    jsonData.book = BOOK_ID;
    jsonData.module = MODULE_NAME;
    jsonData.key = SESSION_KEY;

    $('#points-area').empty();

    // Don't display the user's progress if there is no score server to
    // check or if no one is logged in (since there is a shared guest account on the server)
    if (server !== null && SESSION_KEY !== 'phantom-key') {
      // Load in the exercise data from the server
      jQuery.ajax({
        // Do a request to the server API
        url: server + "/api/v1/exercises/?name=" + exerciseName,
        type: "GET",
        data: jsonData,
        dataType: "json",
        // Make sure cookies are passed along
        xhrFields: {
          withCredentials: true
        },
        success: function(data) {
          var streakval = data.objects[0] && data.objects[0].streak ? data.objects[0].streak : 0;
          var streakval = parseInt(streakval);
          var progress = data.objects[0] && data.objects[0].progress_streak ? data.objects[0].progress_streak : 0;
          var progressval = Math.min(parseInt(progress), streakval);
          proficiency = (progressval >= streakval) ? true : false;


          Khan.testdeffer.done(function() {
            var points_progress_text = $("<span style = 'font-size:60%'>Current score:  </span>");
            var points_progress = $("<span id = 'points-progress' style = 'font-size : 65%; font-weight : bold;'></span>").text(progressval);
            var points_total_text = $("<span style = 'font-size:60%'> out of  </span>");
            var points_total = $("<span id = 'points-total' style = 'font-size : 65%; font-weight : bold;'></span>").text(streakval);
            $('#points-area').append(points_progress_text);
            $('#points-area').append(points_progress);
            $('#points-area').append(points_total_text);
            $('#points-area').append(points_total);
          });
        },
        error: function() {
          Khan.testdeffer.done(function() {
            $('#points-area').text(" Score server cannot be reached!");
          });
        }
      });
    }
  };

  Khan.odsaLoadExercises = function() {
    $(function() {
      var promises = [];

      // if OpenDSA exercise is not "Summ" then fire KA directly
      if (Khan.currentExerciseId.indexOf("Summ") == -1) {
        return Khan.loadLocalModeSiteWhenReady();
      }

      var remoteExercises = $("div.exercise[data-name]");

      remoteExercises.each(function() {
        var exerciseId = $(this).data("name");
        var fileName = exerciseId + ".html";
        promises.push(Khan.loadExercise(exerciseId, fileName));
      });

      // All remote exercises (if any) have now been loaded
      $.when.apply($, promises).then(function() {
        // Prepare exercise html markup as if all summary exercises were inclused in one file

        // Remove all exercise elements
        $("div.exercise").detach();

        // create new .exercise div
        var $newExercise = $("<div>").addClass("exercise").data("name", Khan.currentExerciseId)
          .append($("<div>").addClass("vars"))
          .append($("<div>").addClass("problems"));

        // add problems in each file to the new exercise div
        remoteExercises.each(function(index) {
          if ($(Khan.exercises[index]).data("style")) {
            $.each($(Khan.exercises[index]).data("style"), function(i, styleContents) {
              var style = document.createElement("style");
              $(style).text(styleContents);
              document.getElementsByTagName("head")[0].appendChild(style);
            });
          }
          var exerciseId = $(this).data("name");
          var weight = $(this).data("weight");

          var vars = $(Khan.exercises[index]).children(".vars");
          var problem = $(Khan.exercises[index]).children(".problems").children("div[id]").children();

          var $newProblem = $("<div>").attr("id", exerciseId);
          if (weight) {
            $newProblem.attr("data-weight", weight)
          }
          $newProblem.append(vars).append(problem);
          $newExercise.children(".problems").append($newProblem);
        });

        $('body').prepend($newExercise);
        Khan.loadLocalModeSiteWhenReady();
      });
    });

    Khan.onjQueryLoaded();
    Khan.odsaInitEvents();
  };

  Khan.odsaInitEvents = function() {
    $(Exercises)
      .bind("newProblem", function() {
        if (typeof CodeMirror !== 'undefined' && document.getElementById("codeTextarea") !== null) {
          window.editor = CodeMirror.fromTextArea(document.getElementById("codeTextarea"), {
            lineNumbers: true,
            readOnly: (typeof codeMirrorReadOnly !== "undefined") ? codeMirrorReadOnly || false : false,
            mode: "text/x-java",
          });
        }
      });
  };

  Khan.odsaFullUrl = function(method, useMultithreadedModule) {
    var requestUrl = typeof window.OpenPopKa !== "undefined" ? "/attemptpop/" : "/attempt/";
    return server + "/api/v1/user/exercise" + requestUrl;
  };

  Khan.loadModule = function(moduleName, exerciseId) {
    exerciseId = exerciseId || null;
    var jsavExtentions = ["ArrayTree", "AVLextension",
        "binaryheap", "CircularQueue",
        "DoubleLinkList", "huffman",
        "redblacktree"
      ],
      jsavExCSS = ["ArrayTree", "DoubleLinkList", "huffman"],
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

    function loadCss(url, moduleName) {
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = url;
      var head = document.getElementsByTagName("head")[0];
      if (jsavExCSS.indexOf(moduleName) > -1) {
        head.appendChild(link);
      } else {
        head.insertBefore(link, head.firstChild);
      }
    }

    var path = "../../khan-exercises/utils/";

    if ([Khan.currentExerciseId, exerciseId].indexOf(moduleName) > -1) {
      path = Khan.odsaExerciesPath;
    } else if (jsavExtentions.indexOf(moduleName) > -1) {
      path = jsavExPath;
    } else {
      path = "../../khan-exercises/utils/";
    }

    if (moduleName === 'codemirror') {
      require(["codemirror",
        "codemirror/mode/clike/clike"
      ], function(CodeMirror) {
        window.CodeMirror = CodeMirror;
        loadCss("../../lib/CodeMirror-5.5.0/lib/codemirror.css", moduleName);
        selfPromise.resolve();
      });
    } else if (moduleName === 'jsav' || jsavExtentions.indexOf(moduleName) > -1) {
      require([
        "../../JSAV/lib/jquery.transit.js",
        "../../JSAV/lib/raphael.js"
      ], function() {
        require(["jsav"],
          function() {
            loadCss("../../lib/odsaStyle-min.css", moduleName);
            loadCss("../../JSAV/css/JSAV.css", moduleName);
            if (jsavExtentions.indexOf(moduleName) > -1) {
              require([jsavExPath + moduleName + ".js"],
                function() {
                  if (jsavExCSS.indexOf(moduleName) > -1) {
                    loadCss(jsavExPath + moduleName + ".css", moduleName);
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
    var OpenPop_code = typeof codeValue !== "undefined" ? codeValue : null;
    var OpenPop_genlist = typeof generatedList !== "undefined" ? generatedList : null;
    var OpenPop_summexname = typeof summexName !== "undefined" ? summexName : null;
    var OpenPop_checkdefvar = typeof checkdefvar !== "undefined" ? checkdefvar : null;
    var OpenPop_listoftypes = typeof listoftypes !== "undefined" ? listoftypes : null;
    var OpenPop_progexType = typeof progexType !== "undefined" ? progexType : null;


    _.extend(data, {
      key: SESSION_KEY,
      book: BOOK_ID,

      // The module name. If the exercise is embedded in one
      module_name: MODULE_NAME,
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
      client_dt: moment().format(),
      // OpenPop code
      code: OpenPop_code,

      // OpenPop random list
      genlist: OpenPop_genlist,

      summexname: OpenPop_summexname,

      checkdefvar: OpenPop_checkdefvar,

      listoftypes: OpenPop_listoftypes,

      progexType: OpenPop_progexType
    });

    return data;
  };

  Khan.saveAttemptToServer = function(url, attemptData) {
    if (typeof window.OpenPopKa !== "undefined") {
      $("#check-answer-results > p").hide();
      $.blockUI({
        message: "Waiting for the server to evaluate your code ..."
      });

    }

    // Save the problem results to the server
    var promise = Khan.request(url, attemptData);

    promise.done(function(data) {
      data = jQuery.parseJSON(data);
      var progress = 0;
      var streakNum = 0;

      if (typeof OpenPopKa !== "undefined") {
        $.unblockUI();
      }
      // Update DOM elements according to the feedback from OpenPop
      if (data && typeof OpenPopKa !== "undefined") {
        //progress = data.progress;
        //streakNum = data.streak;

        // Empty the message area.
        Khan.emptyMsgArea();

        if (data.correct) {
          Khan.correctAnswerEffect();
        } else {
          Khan.wrongAnswerEffect(Khan.scoreInput(), Exercises.getCurrentFramework());
          if (data.message !== null) {
            Khan.feedbackEffect(data.message, data.lineNum, data.fileName, data.className);
          }
        }
      }
      // Update DOM elements for the scores.
      if (data) {
        progress = data.streak;
        if (parseInt(data.progress._sign) != 0) {
          progress = 0;
        }
        streakNum = parseFloat(data._exercise_cache.streak._int) * Math.pow(10, parseInt(data._exercise_cache.streak._exp));
      }

      var total = progress; //parseInt(streak) + 1;
      if (total >= streakNum && MODULE_ORIGIN !== "") {
        total = streakNum;
        proficiency = true;
        parent.postMessage('{"exercise":"' + exerciseName + '","proficient":' + true + ',"error":' + false + '}', MODULE_ORIGIN);
      }

      total = parseInt(total, 10);
      $('#points-progress').text(total);
    });

    promise.fail(function(xhr) {
      parent.postMessage('{"exercise":"' + exerciseName + '","proficient":' + false + ',"error":' + true + '}', MODULE_ORIGIN);

      // Alert any listeners of the error before reload
      $(Exercises).trigger("attemptError");

      if (inUnload) {
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

  $(function() {
    // Create event handler to listen for messages from embedded exercises
    var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent",
      eventer = window[eventMethod],
      messageEvent = (eventMethod === "attachEvent") ? "onmessage" : "message";

    // Listen for message from parent
    eventer(messageEvent, function(e) {
      // Only accept post messages from the module page
      // IMPORTANT: This IF must be commented out (or 'module_origin' must
      // be changed in the config file and the book rebuilt) in order to do local testing
      if (e.origin !== MODULE_ORIGIN) {
        return;
      }
      var data = JSON.parse(e.data);
      // Update session information based on message from parent page
      if (data.hasOwnProperty('session_key')) {
        SESSION_KEY = data.session_key;
        Khan.odsaUpdatePoints();
      }
    });

    // Because new KA is using requireJS which loads JS module asynchronous odsaMOD window.load
    // will fire before iframe JS modules are actually loaded.
    // So here the iframe will send message to parent in order for odsaMOD to send session_key
    parent.postMessage({
      type: "ka-ready",
      exerciseName: exerciseName
    }, MODULE_ORIGIN);
  });

}())
