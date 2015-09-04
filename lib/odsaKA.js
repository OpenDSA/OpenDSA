/**
 * TODO: file documentation goes here
 *
 * Author: Hosam Shahin
 * Last Modified: 2015-09-04
 */

(function() {
    Khan = window.Khan || {};
    var exerciesPath = window.location.pathname,
        BOOK_ID = Khan.query.book ? Khan.query.book : typeof OpenPopKa !== "undefined" ? "CS3114" : null,
        SESSION_KEY = 'phantom-key',
        MODULE_ORIGIN = parent.location.protocol + '//' + parent.location.host,
        exerciseName = Khan.getSeedInfo().sha1,

        // Whether student got the proficiency for the exercise or not.
        proficiency = false,
        requestUrl = typeof OpenPopKa !== "undefined" ? "/attemptpop/" : "/attempt/";

    Khan.odsaExerciesPath = exerciesPath.substring(0, exerciesPath.lastIndexOf("/") + 1);

    /**
     * Queries the server for the user's current progress
     *
     * Can be triggered by the module page using postMessage when the page
     * loads or when a new user logs in
     */
    Khan.odsaUpdatePoints = function() {
        var jsonData = {};
        jsonData.book = BOOK_ID;
        jsonData.module = Khan.query.module;
        jsonData.key = SESSION_KEY;

        $('#points-area').empty();

        // Don't display the user's progress if there is no score server to
        // check or if no one is logged in (since there is a shared guest account on the server)
        if (Khan.query.server !== null && SESSION_KEY !== 'phantom-key') {
            // Load in the exercise data from the server
            jQuery.ajax({
                // Do a request to the server API
                url: Khan.query.server + "/api/v1/exercises/?name=" + exerciseName,
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


                    testdeffer.done(function() {
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
                    testdeffer.done(function() {
                        $('#points-area').text(" Score Khan.query.server cannot be reached!");
                    });
                }
            });
        }
    }

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

    Khan.loadModule = function(moduleName, exerciseId) {
        exerciseId = exerciseId || null;
        var modulePromises = {};
        // Return the promise if it exists already
        var selfPromise = modulePromises[moduleName];
        if (selfPromise) {
            return selfPromise;
        } else {
            selfPromise = $.Deferred();
        }
        KhanUtil.debugLog("loadModule mod " + moduleName);

        function loadCss(url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        // var path = (moduleName === Khan.currentExerciseId) ? Khan.odsaExerciesPath : "../../khan-exercises/utils/";
        var path = ([Khan.currentExerciseId, exerciseId].indexOf(moduleName) > -1) ? Khan.odsaExerciesPath : "../../khan-exercises/utils/";

        // console.log(path + " " + moduleName + " " + Khan.currentExerciseId + " " + exerciseId);

        if (moduleName === 'codemirror') {
            require(["codemirror",
                "codemirror/mode/clike/clike"
            ], function(CodeMirror) {
                window.CodeMirror = CodeMirror;
                loadCss("../../lib/CodeMirror-5.5.0/lib/codemirror.css");
                selfPromise.resolve();
            });
        } else if (moduleName === 'jsav') {
            require([
                "../../../JSAV/lib/jquery.transit.js",
                "../../../JSAV/lib/raphael.js"
            ], function() {
                require(["jsav"], function() {
                    loadCss("../../JSAV/css/JSAV.css");
                    loadCss("../../lib/odsaStyle-min.css");
                    selfPromise.resolve();
                })
            });
        } else {
            // Load the module
            require([path + moduleName + ".js"], function() {
                selfPromise.resolve();
            });
        }

        modulePromises[moduleName] = selfPromise;
        return selfPromise;
    };

    Khan.fullUrl = function(method, useMultithreadedModule) {
        // The multithreaded module is slower but cheaper.  We use it for
        // all hints, and problem-attempts that we know are not the last
        // attempt in a task.  (This is because it usually takes people at
        // least a few seconds to read a hint or attempt the next problem,
        // which is plenty of time even when on the slower module.)
        var apiBaseUrl;
        if (Exercises.assessmentMode && useMultithreadedModule) {
            apiBaseUrl = "/api/internal/_mt/user/assessment/exercises";
        } else if (Exercises.assessmentMode) {
            apiBaseUrl = "/api/internal/user/assessment/exercises";
        } else if (useMultithreadedModule) {
            apiBaseUrl = "/api/internal/_mt/user/exercises";
        } else {
            apiBaseUrl = "/api/internal/user/exercises";
        }

        return apiBaseUrl + "/" + userExercise.exerciseModel.name + "/" + method;
    }

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
    })

}())