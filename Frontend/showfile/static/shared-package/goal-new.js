var GoalCreator = {
    objectives: [],
    knowledgeMap: null,
    videosAreInit: false,

    init: function(knowledgeMap) {
        this.knowledgeMap = knowledgeMap;

        $(window).resize($.proxy(this.resize, this));

        $("#create-goal .goal-title")
            .focus(function() { $(this).animate({width: "600px"});})
            .blur(function() { $(this).animate({width: "250px"});})
            .placeholder();

        var form = $("#create-goal");
        form.find("input").mouseup(function() { $(this).removeClass("fieldError"); });
        form.find('input[name="title"]')
            .change(function() { GoalCreator.updateViewAndDescription(); })
            .keypress(function(e) {
                if (e.which == "13") { // enter
                    e.preventDefault();
                    $(e.target).blur();
                }
            });

        GoalCreator.updateViewAndDescription();
    },
    getCurrentVideoObjectives: function() {
        var list = {};
        $.each(GoalBook.models, function(idx, model) {
            $.each(model.get("objectives"), function(idx2, objective) {
                if (objective.type == "GoalObjectiveWatchVideo")
                    list[objective.internal_id] = true;
            });
        });
        return list;
    },

    initVideos: function() {
        $("#goal-choose-videos")

            // can't set goals for content only on smarthistory.khanacademy.org
            .find("#smarthistory").remove().end()

            .on("click", ".vl", function(e) {
                // prevent the href navigation from occuring
                e.preventDefault();

                var jel = $(e.currentTarget);
                var span = jel.children("span");
                var image = $(span).css("background-image");

                if (image.indexOf("indicator-complete") == -1)
                {
                    // video isn't complete, so set a goal
                    var name = jel.attr("data-id");
                    var title = span.text();
                    GoalCreator.onVideoClicked(name, title);
                }
                else {
                    alert("You can't add a video you've already watched to a goal.");
                }
            });

        $("#goal-choose-videos .vl").each(function(i, element) {
            var jel = $(element);
            var span = jel.children("span");
            var image = $(span).css("background-image");

            if (image.indexOf("indicator-complete") >= 0) {
                jel.addClass("goalVideoInvalid");
            }
        });
    },

    // reset window state
    reset: function() {
        GoalCreator.objectives = [];
        $('#create-goal input[name="title"]').val("");

        GoalCreator.updateExerciseCount();
        GoalCreator.updateVideoCount();
        GoalCreator.updateViewAndDescription();
        GoalCreator.showExercises();
    },

    toggleObjectiveInternal: function(type, css, id, name) {
        var idx = 1;
        var found_index = -1;

        $("#goal-commit-response").hide();

        $.each(GoalCreator.objectives, function(index, objective) {
            if (objective.type == type && objective.id == id) {
                found_index = index;
            }

            if (objective.idx >= idx)
                idx = objective.idx + 1;
        });

        if (found_index >= 0) {
            // Remove objective
            var objective = GoalCreator.objectives[found_index];
            GoalCreator.objectives.splice(found_index, 1);
            return null;
        } else if (GoalCreator.objectives.length < 10) {
            var newObjective = {
                type: type,
                css: css,
                description: name,
                progress: 0,
                url: "javascript:GoalCreator.onSelectedObjectiveClicked('" +
                    type + "', '" + css + "', '" + id + "', '" + name + "');",

                idx: idx,
                id: id
            };

            GoalCreator.objectives.push(newObjective);
            return newObjective;
        }
    },
    updateViewAndDescription: function() {
        var goalObject = {
            title: $("#create-goal").find('input[name="title"]').val(),
            objectives: GoalCreator.objectives
        };

        var view = Templates.get("shared.goal-create")(goalObject);
        $("#create-goal-view").html(view);

        if (GoalCreator.objectives.length < 2) {
            $("#create-goal-view .goal").addClass("with-border");
        } else {
            $("#create-goal-view .goal").removeClass("with-border");
        }

        if (GoalCreator.objectives.length === 0) {
            $("#goal-info-section > .goal-description").remove();
        }
        if (GoalCreator.objectives.length > 0 && $("#goal-info-section").children(".goal-description").length === 0) {
            $("#create-goal-view .goal .goal-description").remove().insertAfter("#create-goal-view");
        }
        if (GoalCreator.objectives.length >= 1) {
            $("#create-goal-view .goal .goal-description").remove();
        }
        if (GoalCreator.objectives.length > 1) {
            $("#create-goal-view .goal li.objective").css("width", 100 / GoalCreator.objectives.length + "%");
            $("#create-goal-view .goal li.objective").last().children("a").css("border-right", "none");
        }

        var message = "";
        if (GoalCreator.objectives.length === 0) {
            message = "This goal currently has no objectives selected. Select <b>up to 10</b> exercises or videos to complete below.";
        } else {
            var matchingObjectives;

            message = "To complete this goal, you will have to <ul>";

            // Exercises
            matchingObjectives = [];
            $.each(GoalCreator.objectives, function(idx, objective) {
                if (objective.type == "GoalObjectiveExerciseProficiency")
                    matchingObjectives.push(objective);
            });
            if (matchingObjectives.length > 0) {
                message += "<li class='exercise-objectives'>become proficient in exercise";
                if (matchingObjectives.length == 1) {
                    message += " <em>" + matchingObjectives[0].description + "</em>";
                } else {
                    message += "s ";
                    $.each(matchingObjectives, function(idx, objective) {
                        if (idx === 0)
                            message += "<em>" + objective.description + "</em>";
                        else if (idx < matchingObjectives.length - 1)
                            message += ", <em>" + objective.description + "</em>";
                        else
                            message += " and <em>" + objective.description + "</em>";
                    });
                }
                message += "</li>";
            }

            // Videos
            matchingObjectives = [];
            $.each(GoalCreator.objectives, function(idx, objective) {
                if (objective.type == "GoalObjectiveWatchVideo")
                    matchingObjectives.push(objective);
            });
            if (matchingObjectives.length > 0) {
                message += "<li class='video-ojectives'>, and watch video";
                if (matchingObjectives.length == 1) {
                    message += " <em>" + matchingObjectives[0].description + "</em>";
                } else {
                    message += "s ";
                    $.each(matchingObjectives, function(idx, objective) {
                        if (idx === 0)
                            message += "<em>" + objective.description + "</em>";
                        else if (idx < matchingObjectives.length - 1)
                            message += ", <em>" + objective.description + "</em>";
                        else
                            message += " and <em>" + objective.description + "</em>";
                    });
                }
                message += ".</li>";
            }

            message += "</ul>";
        }
        $(".create-goal-page .goal-description").html(message);

        this.resize();
    },

    resize: function() {
        var context = $("#goal-choose-exercises");

        // Resize map contents
        var jelMapContent = $(".dashboard-drawer", context)
            .add(".dashboard-drawer-inner", context)
            .add(".dashboard-map", context)
            .add("#goal-choose-videos .dashboard-content-stretch");

        var container = $(".goal-new-custom.modal");
        var containerHeight = container.outerHeight(true);
        var yTopPadding = $("#goal-spacer").offset().top - container.offset().top;
        var yBottomPadding = 48; // magic numbers ahoy
        var newHeight = containerHeight - (yTopPadding + yBottomPadding);

        jelMapContent.height(newHeight);


        // Account for padding in the dashboard drawer
        var jelDrawerInner = $(".dashboard-drawer-inner", context);
        jelDrawerInner.height(jelDrawerInner.height() - 20);

        if (this.knowledgeMap && this.knowledgeMap.map)
            google.maps.event.trigger(this.knowledgeMap.map, "resize");
    },

    showExercises: function() {
        $("#goal-choose-exercises").show();
        $("#goal-choose-videos").hide();
        $("#show-vid-btn").removeClass("blue");
        $("#show-ex-btn").addClass("blue");

        this.resize();
    },
    onExerciseClicked: function(exercise, evt) {
        // prevent the anchor href from being followed
        evt.preventDefault();

        // Cannot select exercises that:
        //      user is already proficient in
        //      are already objectives in current goals
        if (exercise.get("status") == "Proficient" ||
            exercise.get("status") == "Review" ||
            exercise.get("goal_req")) {
            return;
        }

        GoalCreator.toggleObjectiveInternal("GoalObjectiveExerciseProficiency", "exercise", exercise.get("name"), exercise.get("display_name"));

        GoalCreator.updateExerciseCount();
        GoalCreator.updateViewAndDescription();
    },
    onExerciseBadgeClicked: function(id) {
        this.onExerciseClicked(this.knowledgeMap.dictNodes[id], null);
    },
    updateExerciseCount: function() {
        var count = 0;
        var self = this;

        $.each(GoalCreator.objectives, function(index, objective) {
            if (objective.type == "GoalObjectiveExerciseProficiency")
                count++;
        });

        $("#goal-exercise-count").html(count);

        $.each(self.knowledgeMap.dictNodes, function(index, exercise) {
            var found = false;

            $.each(GoalCreator.objectives, function(index2, objective) {
                if (objective.type == "GoalObjectiveExerciseProficiency" && objective.id == exercise.name)
                {
                    found = true;
                }
            });

            $.each(self.knowledgeMap.exerciseRowViews, function(index, exerciseRowView) {
                if (exercise.name == exerciseRowView.model.get("name"))
                    exerciseRowView.showGoalIcon(found);
            });

            self.knowledgeMap.exerciseMarkerViews[exercise.name].showGoalIcon(found);
        });
    },

    onVideoClicked: function(id, title) {
        if (id in GoalCreator.getCurrentVideoObjectives())
            return;  // Cannot select videos that are objectives in current goals

        GoalCreator.toggleObjectiveInternal("GoalObjectiveWatchVideo", "video", id, title);

        GoalCreator.updateVideoCount();
        GoalCreator.updateViewAndDescription();
    },
    showVideos: function() {
        if (!GoalCreator.videosAreInit) {
            GoalCreator.videosAreInit = true;
            GoalCreator.initVideos();
        }
        $("#goal-choose-exercises").hide();
        $("#goal-choose-videos").show();
        $("#show-vid-btn").addClass("blue");
        $("#show-ex-btn").removeClass("blue");

        this.resize();

        for (var readableId in GoalCreator.getCurrentVideoObjectives()) {
            $('.vl[data-id="' + readableId + '"]').addClass("goalVideoInvalid");
        }
    },
    updateVideoCount: function() {
        var count = 0;

        $.each(GoalCreator.objectives, function(index, objective) {
            if (objective.type == "GoalObjectiveWatchVideo")
                count++;
        });

        $("#goal-video-count").html(count);

        $("#library-content-main").find(".vl").each(function(index, element) {
            var video_name = $(element).attr("data-id");
            var found = false;

            $.each(GoalCreator.objectives, function(index2, objective) {
                if (objective.type == "GoalObjectiveWatchVideo" && objective.id == video_name)
                {
                    found = true;
                }
            });

            var goalIcon = $(element).children(".video-goal-icon");
            if (found)
            {
                if (goalIcon.length === 0)
                    $('<span class="video-goal-icon"><img src="/images/flag.png"></span>').insertBefore($(element).children("span")[0]);
            }
            else
            {
                goalIcon.detach();
            }
        });
    },
    onSelectedObjectiveClicked: function(type, css, name, id) {
        GoalCreator.toggleObjectiveInternal(type, css, name, id);
        GoalCreator.updateExerciseCount();
        GoalCreator.updateVideoCount();
        GoalCreator.updateViewAndDescription();
    },

    validate: function(form) {
        var error = "";

        if (GoalCreator.objectives.length < 2)
        {
            error = "We'd like you to pick at least two (2) objectives";
        }

        if (error !== "") {
            $("#goal-commit-response").html(error).show();
            return false;
        }
        return true;
    },

    submit: function() {
        var form = $("#create-goal");
        var html = "";

        if (!GoalCreator.validate(form))
            return;

        var titleField = form.find('input[name="title"]');
        if (titleField.val() === "")
        {
            titleField.val("Custom goal: " + new Date().toDateString());
        }

        var goal = new Goal({
            title: titleField.val(),
            objectives: _.map(GoalCreator.objectives, function(o) {
                var newObj = {
                    type: o.type,
                    internal_id: o.id,
                    description: o.description
                };
                newObj.url = Goal.objectiveUrl(newObj);
                return newObj;
            })
        });
        GoalBook.add(goal);
        goal.save()
            .fail(function(jqXHR) {
                KAConsole.log("Goal creation failed: " + jqXHR.responseText, goal);
                GoalBook.remove(goal);
            });

        newCustomGoalDialog.hide();
        GoalCreator.reset();

        return false;
    }
};
