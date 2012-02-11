var Goal = Backbone.Model.extend({
    defaults: {
        active: false,
        complete: false,
        progress: 0,
        title: "Unnamed goal",
        objectives: []
    },

    urlRoot: "/api/v1/user/goals",

    initialize: function() {
        // defaults for new models (e.g. not from server)
        // default created and updated values
        if (!this.has("created")) {
            var now = new Date().toISOString();
            this.set({created: now, updated: now});
        }

        // default progress value for all objectives
        _.each(this.get("objectives"), function(o) {
            if (o.progress == null) {
                o.progress = 0;
                o.status = "not-started";
            }
            if (o.status == null) {
                o.status = 'not-started';
            }
        });

        // a bunch of stuff needed to display goals in views. might need to be
        // refactored.
        this.calcDependents();

        this.bind("change", this.fireCustom, this);
    },

    calcDependents: function() {
        var progress = this.calcTotalProgress(this.get("objectives"));
        var objectiveWidth = 100 / this.get("objectives").length;
        _.each(this.get("objectives"), function(obj) {
            Goal.calcObjectiveDependents(obj, objectiveWidth);
        });
        this.set({
            progress: progress,
            progressStr: Goal.floatToPercentageStr(progress),
            complete: progress >= 1,

            // used to display 3/5 in goal summary area
            objectiveProgress: _.filter(this.get("objectives"), function(obj) {
                return obj.progress >= 1;
            }).length,

            // used to maintain sorted order in a GoalCollection
            updatedTime: parseISO8601(this.get("updated")).getTime()
        }, {silent: true});
    },

    calcTotalProgress: function(objectives) {
        objectives = objectives || this.get("objectives");
        var progress = 0;
        if (objectives.length) {
            progress = _.reduce(objectives, function(p, ob) { return p + ob.progress; }, 0);
            if (objectives.length > 0) {
                progress = progress / objectives.length;
            } else {
                progress = 0;
            }
        }
        return progress;
    },

    fireCustom: function() {
        this.calcDependents();

        if (this.hasChanged("progress")) {
            // we want to fire these events after all other listeners to 'change'
            // have had a chance to run
            var toFire = [];

            // check for goal completion
            if (this.get("progress") >= 1) {
                toFire.push(["goalcompleted", this]);
            }
            else {
                // now look for updated objectives
                oldObjectives = this.previous("objectives");
                _.each(this.get("objectives"), function(newObj, i) {
                    var oldObj = oldObjectives[i];
                    if (newObj.progress > oldObj.progress) {
                        toFire.push(["progressed", this, newObj]);
                        if (newObj.progress >= 1) {
                            toFire.push(["completed", this, newObj]);
                        }
                    }
                }, this);
            }
            if (_.any(toFire)) {
                // register a callback to execute at the end of the rest of the
                // change callbacks
                this.collection.bind("change", function callback() {
                    // this callback should only run once, so immediately unbind
                    this.unbind("change", callback);
                    // trigger all change notifications
                    _.each(toFire, function(triggerArgs) {
                        this.trigger.apply(this, triggerArgs);
                    }, this);
                }, this.collection);
            }
        }
    }
}, {
    calcObjectiveDependents: function(objective, objectiveWidth) {
        objective.complete = objective.progress >= 1;
        objective.progressStr = Goal.floatToPercentageStr(objective.progress);
        objective.iconFillHeight = Goal.calcIconFillHeight(objective);
        objective.objectiveWidth = objectiveWidth;
        objective.isVideo = (objective.type == "GoalObjectiveWatchVideo");
        objective.isAnyVideo = (objective.type == "GoalObjectiveAnyVideo");
        objective.isExercise = (objective.type == "GoalObjectiveExerciseProficiency");
        objective.isAnyExercise = (objective.type == "GoalObjectiveAnyExerciseProficiency");
    },

    calcIconFillHeight: function(objective) {
        var height = objective.type.toLowerCase().indexOf("exercise") >= 1 ? 13 : 12;
        var offset = objective.type.toLowerCase().indexOf("exercise") >= 1 ? 4 : 6;
        return Math.ceil(objective.progress * height) + offset;
    },

    floatToPercentageStr: function(progress) {
        return (progress * 100).toFixed(0);
    },

    objectiveUrlForType: {
        GoalObjectiveWatchVideo: function(objective) {
            return "/video/" + objective.internal_id;
        },
        GoalObjectiveAnyVideo: function(objective) {
            return "/";
        },
        GoalObjectiveExerciseProficiency: function(objective) {
            return "/exercise/" + objective.internal_id;
        },
        GoalObjectiveAnyExerciseProficiency: function(objective) {
            return "/exercisedashboard";
        }
    },

    objectiveUrl: function(objective) {
        return Goal.objectiveUrlForType[objective.type](objective);
    },

    defaultVideoProcessGoalAttrs_: {
        title: "Complete Five Videos",
        objectives: [
            { description: "Any video", type: "GoalObjectiveAnyVideo" },
            { description: "Any video", type: "GoalObjectiveAnyVideo" },
            { description: "Any video", type: "GoalObjectiveAnyVideo" },
            { description: "Any video", type: "GoalObjectiveAnyVideo" },
            { description: "Any video", type: "GoalObjectiveAnyVideo" }
        ]
    },

    defaultExerciseProcessGoalAttrs_: {
        title: "Complete Five Exercises",
        objectives: [
            { description: "Any exercise", type: "GoalObjectiveAnyExerciseProficiency" },
            { description: "Any exercise", type: "GoalObjectiveAnyExerciseProficiency" },
            { description: "Any exercise", type: "GoalObjectiveAnyExerciseProficiency" },
            { description: "Any exercise", type: "GoalObjectiveAnyExerciseProficiency" },
            { description: "Any exercise", type: "GoalObjectiveAnyExerciseProficiency" }
        ]
    },

    // TODO: investigate if this is still used.
    exidToExerciseName: function(exid) {
        return exid[0].toUpperCase() + exid.slice(1).replace(/_/g, ' ');
    },

    // TODO: investigate if this is still used.
    GoalObjectiveExerciseProficiency: function(exid) {
        var obj = {
            type: "GoalObjectiveExerciseProficiency",
            internal_id: exid,
            description: Goal.exidToExerciseName(exid)
        };
        obj.url = Goal.objectiveUrl(obj);
        return obj;

    }
});

var GoalCollection = Backbone.Collection.extend({
    model: Goal,

    initialize: function() {
        this.updateActive();

        // ensure updateActive is called whenever the collection changes
        this.bind("add", this.updateActive, this);
        this.bind("remove", this.updateActive, this);
        this.bind("reset", this.updateActive, this);
    },

    url: "/api/v1/user/goals",

    comparator: function(goal) {
        // display most recently updated goal at the top of the list.
        // http://stackoverflow.com/questions/5636812/sorting-strings-in-reverse-order-with-backbone-js/5639070#5639070
        return -goal.get("updatedTime");
    },

    active: function(goal) {
        var current = this.find(function(g) {return g.get("active");}) || null;
        if (goal && goal !== current) {
            // set active
            if (current !== null) {
                current.set({active: false});
            }
            goal.set({active: true});
            current = goal;
        }
        return current;
    },

    updateActive: function() {
        this.active(this.findActiveGoal());
    },

    incrementalUpdate: function(updatedGoals) {
        _.each(updatedGoals, function(newGoal) {
            oldGoal = this.get(newGoal.id) || null;

            if (oldGoal !== null) {
                oldGoal.set(newGoal);
            }
            else {
                // todo: remove this, do something better
                KAConsole.log("Error: brand new goal appeared from somewhere", newGoal);
            }
        }, this);
    },

    findGoalWithObjective: function(internalId, specificType, generalType) {
        return this.find(function(goal) {
            // find a goal with an objective for this exact entity
            return _.find(goal.get("objectives"), function(ob) {
                return ob.type == specificType && internalId == ob.internal_id;
            });
        }) || this.find(function(goal) {
            // otherwise find a goal with any entity proficiency
            return _.find(goal.get("objectives"), function(ob) {
                return ob.type == generalType;
            });
        }) || null;
    },

    // find the most appriate goal to display for a given URL
    findActiveGoal: function() {
        var matchingGoal = null;

        if (window.location.pathname.indexOf("/exercise") === 0 && window.userExerciseName) {
            matchingGoal = this.findGoalWithObjective(userExerciseName,
                "GoalObjectiveExerciseProficiency",
                "GoalObjectiveAnyExerciseProficiency");
        } else if (window.location.pathname.indexOf("/video") === 0 &&
                 typeof Video.readableId !== "undefined") {
            matchingGoal = this.findGoalWithObjective(Video.readableId,
                "GoalObjectiveWatchVideo", "GoalObjectiveAnyVideo");
        }

        // if we're not on a matching exercise or video page, just show the
        // most recently upated one
        if (matchingGoal === null) {
            matchingGoal = this.at(0); // comparator is most recently updated
        }

        return matchingGoal;
    },

    processGoalContext: function() {
        return {
            hasExercise: this.any(function(goal) {
                return _.any(goal.get("objectives"), function(obj) {
                    return obj.type === "GoalObjectiveAnyExerciseProficiency";
                });
            }),
            hasVideo: this.any(function(goal) {
                return _.any(goal.get("objectives"), function(obj) {
                    return obj.type === "GoalObjectiveAnyVideo";
                });
            })
        };
    }
});

var GoalBookView = Backbone.View.extend({
    template: Templates.get("shared.goalbook"),
    isVisible: false,
    needsRerender: true,

    initialize: function() {
        $(this.el)
            .delegate(".close-button", "click", $.proxy(this.hide, this))

            // listen to archive button on goals
            .delegate(".goal.recently-completed", "mouseenter mouseleave", function(e) {
                var el = $(e.currentTarget);
                if (e.type == "mouseenter") {
                    el.find(".goal-description .summary-light").hide();
                    el.find(".goal-description .goal-controls").show();
                } else {
                    el.find(".goal-description .goal-controls").hide();
                    el.find(".goal-description .summary-light").show();
                }
            })

            .delegate(".archive", "click", $.proxy(function(e) {
                var jel = $(e.target).closest(".goal");
                var goal = this.model.get(jel.data("id"));
                this.animateGoalToHistory(jel).then($.proxy(function() {
                    this.model.remove(goal);
                }, this));
            }, this))

            .delegate(".new-goal", "click", $.proxy(function(e) {
                e.preventDefault();
                this.hide();
                newGoalDialog.show();
            }, this))

            .delegate(".goal-history", "click",
                $.proxy(this.goalHistoryButtonClicked, this));

        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        this.model.bind("remove", this.render, this);
        this.model.bind("add", this.added, this);
        this.model.bind("goalcompleted", this.show, this);
    },

    show: function() {
        this.isVisible = true;

        // render if necessary
        if (this.needsRerender) {
            this.render();
        }

        var that = this;
        // animate on the way down
        return $(this.el).slideDown("fast", function() {
            // listen for escape key
            $(document).bind("keyup.goalbook", function(e) {
                if (e.which == 27) {
                    that.hide();
                }
            });

            // close the goalbook if user clicks elsewhere on page
            $("body").bind("click.goalbook", function(e) {
                if ($(e.target).closest("#goals-nav-container").length === 0) {
                    that.hide();
                }
            });
        });
    },

    hide: function() {
        this.isVisible = false;
        $(document).unbind("keyup.goalbook");
        $("body").unbind("click.goalbook");

        // if there are completed goals, move them to history before closing
        var completed = this.model.filter(function(goal) { return goal.get("complete"); });

        var completedEls = this.$(".recently-completed");
        if (completedEls.length > 0) {
            this.animateThenHide(completedEls);
        } else {
            return $(this.el).slideUp("fast");
        }
    },

    goalHistoryButtonClicked: function(e) {
        // Stay on the page if the user is already looking at her profile
        // TODO: if we care about metaKey / control key / middle key working,
        // then there is probably more to test here.
        if (typeof Profile !== "undefined" && !e.metaKey) {
            e.preventDefault();
            this.hide();
            Profile.router.navigate("/goals", true);
        }
    },

    added: function(goal, options) {
        this.needsRerender = true;
        this.show();
        // add a highlight to the new goal
        $(".goal[data-id=" + goal.get("id") + "]").effect("highlight", {}, 2500);
    },

    animateThenHide: function(els) {
        var goals = _.map(els, function(el) {
            return this.model.get($(el).data("id"));
        }, this);
        // wait for the animation to complete and then close the goalbook
        this.animateGoalToHistory(els).then($.proxy(function() {
           $(this.el).slideUp("fast").promise().then($.proxy(function() {
                this.model.remove(goals);
           }, this));
       }, this));
    },

    render: function() {
        var jel = $(this.el);
        // delay rendering until the view is actually visible
        if (!this.isVisible) {
            this.needsRerender = true;
        }
        else {
            KAConsole.log("rendering GoalBookView", this);
            this.needsRerender = false;
            var json = _.pluck(this.model.models, "attributes");
            jel.html(this.template({
                goals: json,
                profileRoot: KA.profileRoot
            }));
        }
        return this;
    },

    animateGoalToHistory: function(els) {
        var btnGoalHistory = this.$("a.goal-history");

        var promises = $(els).map(function(i, el) {
            var dfd = $.Deferred();
            var jel = $(el);
            jel .children()
                    .each(function() {
                        $(this).css("overflow", "hidden").css("height", $(this).height());
                    })
                .end()
                .delay(500)
                .animate({
                    width: btnGoalHistory.width(),
                    left: btnGoalHistory.position().left
                })
                .animate({
                        top: btnGoalHistory.position().top - jel.position().top,
                        height: "0",
                        opacity: "toggle"
                    },
                    "easeInOutCubic",
                    function() {
                        $(this).remove();
                        dfd.resolve();
                    }
                );
            return dfd.promise();
        }).get();

        // once all the animations are done, make the history button glow
        var button = $.Deferred();
        $.when.apply(null, promises).then(function() {
            btnGoalHistory
                .animate({backgroundColor: "orange"})
                .animate({backgroundColor: "#ddd"}, button.resolve);
        });

        // return a promise that the history button is done animating
        return button.promise();
    }
});

var GoalSummaryView = Backbone.View.extend({
    template: Templates.get("shared.goal-summary-area"),

    initialize: function(args) {
        $(this.el).delegate("#goals-drawer", "click",
            $.proxy(args.goalBookView.show, args.goalBookView));

        this.model.bind("change", this.render, this);
        this.model.bind("reset", this.render, this);
        this.model.bind("remove", this.render, this);
        this.model.bind("add", this.render, this);
        this.model.bind("completed", this.justFinishedObjective, this);
    },

    render: function() {
        KAConsole.log("rendering GoalSummaryView", this);
        var active = this.model.active() || null;
        if (active !== null) {
            $(this.el).html(this.template(active.attributes));
        }
        else {
            // todo: put create a goal button here?
            $(this.el).empty();
        }
        return this;
    },

    justFinishedObjective: function(newGoal, newObj) {
        this.render();
        this.$("#goals-drawer").effect("highlight", {}, 2500);
    }
});

function finishLoadingMapsPackage() {
    KAConsole.log("Loaded Google Maps.");
    dynamicLoadPackage_maps(function(status, progress) {
        if (status == "complete") {
            KAConsole.log("Loaded maps package.");
        } else if (status == "failed") {
            KAConsole.log("Failed to load maps package.");
            setTimeout(finishLoadingMapsPackage, 5000); // Try again in 5 seconds
        } else if (status == "progress") {
            KAConsole.log("Maps package " + (progress * 100).toFixed(0) + "% loaded.");
            if (newCustomGoalDialog) {
                newCustomGoalDialog.$(".progress-bar")
                    .progressbar("value", progress * 100);
            }
        }
    });
}

var NewGoalView = Backbone.View.extend({
    template: Templates.get("shared.goal-new"),

    events: {
        "click .newgoal.custom": "createCustomGoal",
        "click .newgoal.five_exercises": "createExerciseProcessGoal",
        "click .newgoal.five_videos": "createVideoProcessGoal"
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var context = this.model.processGoalContext();
        $(this.el).html(this.template(context));
        this.hookup();
        return this;
    },

    hookup: function() {
        var that = this;
        this.$(".newgoal").hoverIntent(
            function hfa(evt) {
                if ($(this).hasClass("disabled")) {
                    return;
                }
                that.$(".newgoal").not(this).not(".disabled").hoverFlow(
                    evt.type, { opacity: 0.2},
                    750, "easeInOutCubic");
                $(".info.pos-left", this).hoverFlow(
                    evt.type, { left: "+=30px", opacity: "show" },
                    350, "easeInOutCubic");
                $(".info.pos-right, .info.pos-top", this).hoverFlow(
                    evt.type, { right: "+=30px", opacity: "show" },
                    350, "easeInOutCubic");
            },
            function hfo(evt) {
                if ($(this).hasClass("disabled")) {
                    return;
                }
                that.$(".newgoal").not(this).not(".disabled").hoverFlow(
                    evt.type, { opacity: 1}, 175, "easeInOutCubic");
                $(".info.pos-left", this).hoverFlow(
                    evt.type, { left: "-=30px", opacity: "hide" },
                    150, "easeInOutCubic");
                $(".info.pos-right, .info.pos-top", this).hoverFlow(
                    evt.type, { right: "-=30px", opacity: "hide" },
                    150, "easeInOutCubic");
            }
        );
    },

    createVideoProcessGoal: function(e) {
        e.preventDefault();
        if ($(e.currentTarget).hasClass("disabled")) return;

        var goal = new Goal(Goal.defaultVideoProcessGoalAttrs_);
        this.createSimpleGoal(goal);
    },

    createExerciseProcessGoal: function(e) {
        e.preventDefault();
        if ($(e.currentTarget).hasClass("disabled")) return;

        var goal = new Goal(Goal.defaultExerciseProcessGoalAttrs_);
        this.createSimpleGoal(goal);
    },

    createSimpleGoal: function(goal) {
        this.model.add(goal);
        goal.save().fail($.proxy(function() {
            KAConsole.log("Error while saving new custom goal", goal);
            this.model.remove(goal);
        }, this));
        this.trigger("creating");
    },

    createCustomGoal: function(e) {
        this.trigger("creating");
        e.preventDefault();
        newCustomGoalDialog.show();
    }
});

var NewGoalDialog = Backbone.View.extend({
    template: Templates.get("shared.goal-new-dialog"),

    initialize: function() {
        this.render();
    },

    render: function() {
        var context = this.model.processGoalContext();
        // As we're assigning to this.el, event handlers need to be rebound
        // after each render.
        this.el = $(this.template(context)).appendTo(document.body).get(0);
        this.newGoalView = new NewGoalView({
            el: this.$(".viewcontents"),
            model: this.model
        });
        this.newGoalView.bind("creating", this.hide, this);
        return this;
    },

    show: function() {
        // rerender every time we show this in case some process goals should
        // be disabled
        this.newGoalView.render();
        return $(this.el).modal({
            keyboard: true,
            backdrop: true,
            show: true
        });
    },

    hide: function() {
        // hide all hover effects so they don't show up next time we show
        this.$(".info").hide();

        // now hide the dialog
        return $(this.el).modal("hide");
    }
});

var NewCustomGoalDialog = Backbone.View.extend({
    template: Templates.get("shared.goal-new-custom-dialog"),
    loaded: false,

    render: function() {
        // As we're assigning to this.el, event handlers need to be rebound
        // after each render.
        this.el = $(this.template()).appendTo(document.body).get(0);
        this.innerEl = this.$(".modal-body").get(0);

        // turn on fading just before we animate so that dragging is fast
        var $el = $(this.el);
        $el.bind("shown", function() { $el.removeClass("fade"); });
        $el.bind("hide", function() { $el.addClass("fade"); });

        return this;
    },

    _show: function() {
        return $(this.el).modal({
            keyboard: false,
            backdrop: true,
            show: true
        });
    },

    show: function() {
        if (!this.innerEl) {
            this.render();
        }
        // if we haven't yet loaded the contents of this dialog, do it
        if (!this.loaded) {
            this.loaded = true;
            this.load().error($.proxy(function() {
                this.loaded = false;
            }));
            this.$(".progress-bar").progressbar({value: 10}).slideDown("fast");
        }
        this._show();
    },

    load: function() {
        if (!dynamicPackageLoader.packageLoaded("maps")) {
            $('<script src="http://maps.google.com/maps/api/js?v=3.3&sensor=false&callback=finishLoadingMapsPackage" type="text/javascript"></script>').appendTo(document);
        }
        return $.ajax({url: "/goals/new", type: "GET", dataType: "html"})
            .done($.proxy(function(html) {
                KAConsole.log("Loaded /goals/new.");
                this.waitForMapsPackage(html);
            }, this))
            .error($.proxy(function() {
                KAConsole.log(Array.prototype.slice.call(arguments));
                $(this.innerEl).text("Page load failed. Please try again.");
            }, this));
    },

    hide: function() {
        $(this.el).modal("hide");
    },

    waitForMapsPackage: function(html) {
        if (!dynamicPackageLoader.packageLoaded("maps")) {
            var that = this;
            setTimeout(function() { that.waitForMapsPackage(html); }, 100);
            return;
        }
        KAConsole.log("Done loading.");
        $(this.innerEl).html(html);
        createGoalInitialize();
    }
});

$(function() {
    window.GoalBook = new GoalCollection(window.GoalsBootstrap || []);
    APIActionResults.register("updateGoals",
        $.proxy(GoalBook.incrementalUpdate, window.GoalBook));

    window.myGoalBookView = new GoalBookView({
        el: "#goals-nav-container",
        model: GoalBook
    });
    window.myGoalSummaryView = new GoalSummaryView({
        el: "#goals-container",
        model: GoalBook,
        goalBookView: myGoalBookView
    });

    myGoalSummaryView.render();
    window.newGoalDialog = new NewGoalDialog({model: GoalBook});
    window.newCustomGoalDialog = new NewCustomGoalDialog();
});

// todo: should we do this globally?
Handlebars.registerPartial("goal-objectives", Templates.get("shared.goal-objectives"));
Handlebars.registerPartial("goalbook-row", Templates.get("shared.goalbook-row"));
Handlebars.registerPartial("goal-new", Templates.get("shared.goal-new"));
