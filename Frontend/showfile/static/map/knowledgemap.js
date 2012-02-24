function KnowledgeMapInitGlobals() {
    window.KnowledgeMapGlobals = {
        colors: {
            blue: "#0080C9",
            green: "#8EBE4F",
            red: "#E35D04",
            gray: "#FFFFFF"
        },
        icons: {
                Exercise: {
                        Proficient: "/static/images/node-complete.png?" + KA_VERSION,
                        Review: "/static/images/node-review.png?" + KA_VERSION,
                        Suggested: "/static/images/node-suggested.png?" + KA_VERSION,
                        Normal: "/static/images/node-not-started.png?" + KA_VERSION
                          },
                Summative: {
                        Normal: "/static/images/node-challenge-not-started.png?" + KA_VERSION,
                        Proficient: "/static/images/node-challenge-complete.png?" + KA_VERSION,
                        Suggested: "/static/images/node-challenge-suggested.png?" + KA_VERSION
                           }
        },
        coordsHome: { lat: -0.064844, lng: 0.736268, zoom: 9, when: 0 },
        latMin: 90,
        latMax: -90,
        lngMin: 180,
        lngMax: -180,
        nodeSpacing: {lat: 0.392, lng: 0.35},
        options: {
                    getTileUrl: function(coord, zoom) {
                        // Sky tiles example from
                        // http://gmaps-samples-v3.googlecode.com/svn/trunk/planetary-maptypes/planetary-maptypes.html
                        return KnowledgeMapGlobals.getHorizontallyRepeatingTileUrl(coord, zoom,
                                function(coord, zoom) {
                                  return "http://127.0.0.1:8000/OpenDSA/static/images/map-tiles/field_" +
                                     Math.floor(Math.random() * 4 + 1) + ".jpg";
                                });
                    },
                    tileSize: new google.maps.Size(256, 256),
                    maxZoom: 10,
                    minZoom: 7,
                    isPng: false
        },
        getHorizontallyRepeatingTileUrl: function(coord, zoom, urlfunc) {

            // From http://gmaps-samples-v3.googlecode.com/svn/trunk/planetary-maptypes/planetary-maptypes.html
            var y = coord.y;
            var x = coord.x;

            // tile range in one direction range is dependent on zoom level
            // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
            var tileRange = 1 << zoom;

            // don't repeat across y-axis (vertically)
            if (y < 0 || y >= tileRange) {
                return null;
            }

            // repeat across x-axis
            if (x < 0 || x >= tileRange) {
                x = (x % tileRange + tileRange) % tileRange;
            }

            return urlfunc({x: x, y: y}, zoom);
        }
    };

    window.KnowledgeMapExercise = Backbone.Model.extend({
        initialize: function() {
            var s_prefix = this.get("summative") ? "node-challenge" : "node";

            if (this.get("status") == "Suggested") {
                this.set({"isSuggested": true, "badgeIcon": "/static/images/" + s_prefix + "-suggested.png?" + KA_VERSION});
            } else if (this.get("status") == "Review") {
                this.set({"isSuggested": true, "isReview": true, "badgeIcon": "/static/images/node-review.png?" + KA_VERSION});
            } else if (this.get("status") == "Proficient") {
                this.set({"isSuggested": false, "badgeIcon": "/static/images/" + s_prefix + "-complete.png?" + KA_VERSION});
            } else {
                this.set({"isSuggested": false, "badgeIcon": "/static/images/" + s_prefix + "-not-started.png?" + KA_VERSION});
            }

            this.set({
                inAllList: false,
                lowercaseName: this.get("display_name").toLowerCase()
            });

            var milestones = [];
            for (var milestone = 0; milestone < this.get("num_milestones") - 1; milestone++) {
                milestones.push({
                    "left": Math.round((milestone + 1) * (228 / this.get("num_milestones")))
                });
            }
            this.set({"streakBar": {
                "proficient": this.get("progress") >= 1,
                "suggested": (this.get("status") == "Suggested" || (this.get("progress") < 1 && this.get("progress") > 0)),
                "progressDisplay": this.get("progress_display"),
                "maxWidth": 228,
                "width": Math.min(1.0, this.get("progress")) * 228,
                "milestones": []
            }});
        },

        url: function() {
            return "/static/" + this.get("name")+".html";  //until we find a way to create a build folder in sitestatic
        },

        adminUrl: function() {
            return "/editexercise?name=" + this.get("name");
        }
    });

    window.ExerciseRowView = Backbone.View.extend({
        initialize: function() {
            this.visible = false;
            this.nodeName = this.model.get("name");
            this.parent = this.options.parent;
        },

        events: {
            "click .exercise-title": "onBadgeClick",
            "click .proficient-badge": "onBadgeClick",
            "click .exercise-show": "onShowExerciseClick"
        },

        inflate: function() {
            if (this.inflated)
                return;

            var template = Templates.get(this.options.admin ? "shared.knowledgemap-admin-exercise" : "shared.knowledgemap-exercise");
            var context = this.model.toJSON();
            if (this.options.admin) {
                context.url = this.model.adminUrl();
            } else {
                context.url = this.model.url();
            }

            context.disabled = this.model.get("invalidForGoal") || false;

            var newContent = $(template(context));
            var self = this;
            newContent.hover(
                function() {self.onBadgeMouseover(self.nodeName, newContent);},
                function() {self.onBadgeMouseout(self.nodeName, newContent);}
            );

            this.el.replaceWith(newContent);
            this.el = newContent;
            this.inflated = true;
            this.delegateEvents();
        },

        onBadgeClick: function(evt) {
            // give the parent a chance to handle this exercise click. If it
            // doesn't, we'll just follow the anchor href
            return this.parent.nodeClickHandler(this.model, evt);
        },

        onBadgeMouseover: function(node_name, element) {
            this.parent.highlightNode(node_name, true);

            element.find(".exercise-show").show();
        },

        onBadgeMouseout: function(node_name, element) {
            this.parent.highlightNode(node_name, false);

            element.find(".exercise-show").hide();
        },

        onShowExerciseClick: function() {
            this.parent.panToNode(this.nodeName);
            this.parent.highlightNode(this.nodeName, true);
        },

        showGoalIcon: function(visible) {
            if (visible)
                this.el.find(".exercise-goal-icon").show();
            else
                this.el.find(".exercise-goal-icon").hide();
        }
    });
    window.ExerciseMarkerView = Backbone.View.extend({
        initialize: function() {
            var exercise = this.model;
            this.nodeName = exercise.get("name");
            this.filtered = false;
            this.goalIconVisible = false;
            this.parent = this.options.parent;

            var iconSet = KnowledgeMapGlobals.icons[exercise.get("summative") ? "Summative" : "Exercise"];
            this.iconUrl = iconSet[exercise.get("status")];
            if (!this.iconUrl) this.iconUrl = iconSet.Normal;

            this.updateElement(this.el);
        },
        updateElement: function(el) {
            this.el = el;
            this.zoom = this.parent.map.getZoom();
            var self = this;

            this.el.click(
                    function(evt) {return self.onNodeClick(evt);}
                ).hover(
                    function() {return self.onNodeMouseover();},
                    function() {return self.onNodeMouseout();}
                );

            var iconOptions = this.getIconOptions();
            this.el.find("img.node-icon").attr("src", iconOptions.url);
            this.el.attr("class", this.getLabelClass());

            if (this.parent.admin)
                this.el.attr("href", this.model.adminUrl());
            else
                this.el.attr("href", this.model.url());

            if (this.goalIconVisible)
                this.el.find(".exercise-goal-icon").show();
            else
                this.el.find(".exercise-goal-icon").hide();
        },

        getIconOptions: function() {

            var iconUrlCacheKey = this.iconUrl + "@" + this.zoom;

            if (!this.parent.iconCache) this.parent.iconCache = {};
            if (!this.parent.iconCache[iconUrlCacheKey])
            {
                var url = this.iconUrl;

                if (!this.model.get("summative") && this.zoom <= KnowledgeMapGlobals.options.minZoom)
                {
                    url = this.iconUrl.replace(".png", "-star.png");
                }

                this.parent.iconCache[iconUrlCacheKey] = {url: url};
            }
            return this.parent.iconCache[iconUrlCacheKey];
        },

        getLabelClass: function() {
            var classText = "nodeLabel nodeLabel" + this.model.get("status");
            var visible = !this.model.get("summative") || this.zoom == KnowledgeMapGlobals.options.minZoom;
            if (this.model.get("summative") && visible) this.zoom = KnowledgeMapGlobals.options.maxZoom - 1;

            if (this.model.get("summative")) classText += " nodeLabelSummative";
            classText += (visible ? "" : " nodeLabelHidden");
            classText += (" nodeLabelZoom" + this.zoom);
            classText += (this.filtered ? " nodeLabelFiltered" : "");
            classText += (this.model.get("invalidForGoal") ? " goalNodeInvalid" : "");

            return classText;
        },

        setFiltered: function(filtered, bounds) {
            if (filtered != this.filtered) {
                this.filtered = filtered;
            }

            var updateAppearance;
            if (bounds) {
                // only update appearance of nodes that are currently on screen
                var node = this.parent.dictNodes[this.nodeName];
                updateAppearance = bounds.contains(node.latLng);
            }
            else {
                updateAppearance = true;
            }

            // if we're in the window, update
            if (updateAppearance) {
                this.updateAppearance();
            }
        },

        updateAppearance: function() {
            // set class for css to apply styles
            if (this.filtered) {
                this.el.addClass("nodeLabelFiltered");
            } else {
                this.el.removeClass("nodeLabelFiltered");
            }

            // perf hack: instead of changing css opacity, set a whole new image
            var img = this.el.find('img.node-icon');
            var url = img.attr('src');

            // don't adjust images of stars when zoomed out
            if (url.indexOf("-star.png") >= 0) return;

            // normalize
            if (url.indexOf("faded") >= 0) {
                url = url.replace("-faded.png", ".png");
            }

            if (this.filtered) {
                img.attr('src', url.replace(".png", "-faded.png"));
            } else {
                img.attr('src', url);
            }
        },

        showGoalIcon: function(visible) {
            if (visible != this.goalIconVisible) {
                this.goalIconVisible = visible;
                if (this.goalIconVisible)
                    this.el.find(".exercise-goal-icon").show();
                else
                    this.el.find(".exercise-goal-icon").hide();
            }
        },

        setHighlight: function(highlight) {
            if (highlight)
                this.el.addClass("nodeLabelHighlight");
            else
                this.el.removeClass("nodeLabelHighlight");
        },

        onNodeClick: function(evt) {
            var self = this;

            if (!this.model.get("summative") && this.parent.map.getZoom() <= KnowledgeMapGlobals.options.minZoom)
                return;

            if (this.parent.admin)
            {
                if (evt.shiftKey)
                {
                    if (this.nodeName in this.parent.selectedNodes)
                    {
                        delete this.parent.selectedNodes[this.nodeName];
                        this.parent.highlightNode(this.nodeName, false);
                    }
                    else
                    {
                        this.parent.selectedNodes[this.nodeName] = true;
                        this.parent.highlightNode(this.nodeName, true);
                    }
                }
                else
                {
                    $.each(this.parent.selectedNodes, function(node_name) {
                        self.parent.highlightNode(node_name, false);
                    });
                    this.parent.selectedNodes = { };
                    this.parent.selectedNodes[this.nodeName] = true;
                    this.parent.highlightNode(this.nodeName, true);
                }

                //Unbind other keydowns to prevent a spawn of hell
                $(document).unbind("keydown");

                // If keydown is an arrow key
                $(document).keydown(function(e) {
                    var delta_v = 0, delta_h = 0;

                    if (e.keyCode == 37) {
                        delta_v = -1; // Left
                    }
                    if (e.keyCode == 38) {
                        delta_h = -1; // Up
                    }
                    if (e.keyCode == 39) {
                        delta_v = 1; // Right
                    }
                    if (e.keyCode == 40) {
                        delta_h = 1; // Down
                    }

                    if (delta_v != 0 || delta_h != 0) {
                        var id_array = [];

                        $.each(self.parent.selectedNodes, function(node_name) {
                            var actual_node = self.parent.dictNodes[node_name];

                            actual_node.v_position = parseInt(actual_node.v_position) + delta_v;
                            actual_node.h_position = parseInt(actual_node.h_position) + delta_h;

                            id_array.push(node_name);
                        });
                        $.post("/moveexercisemapnodes", { exercises: id_array.join(","), delta_h: delta_h, delta_v: delta_v });

                        var zoom = self.parent.map.getZoom();
                        self.parent.markers = [];

                        $.each(self.parent.dictEdges, function(key, rgTargets) { // this loop lets us update the edges wand will remove the old edges
                            for (var ix = 0; ix < rgTargets.length; ix++) {
                                var line = rgTargets[ix].line;
                                if (line != null) {
                                    line.setMap(null);
                                }
                            }
                        });
                        self.parent.overlay.setMap(null);
                        self.parent.layoutGraph();
                        self.parent.drawOverlay();

                        setTimeout(function() {
                                $.each(self.parent.selectedNodes, function(node_name) {
                                    self.parent.highlightNode(node_name, true);
                                });
                            }, 100);

                        return false;
                    }
                });

                evt.preventDefault();
            }
            else
            {
                return this.parent.nodeClickHandler(this.model, evt);
            }
        },

        onNodeMouseover: function() {
            if (!this.model.get("summative") && this.parent.map.getZoom() <= KnowledgeMapGlobals.options.minZoom)
                return;
            if (this.nodeName in this.parent.selectedNodes)
                return;

            $(".exercise-badge[data-id=\"" + this.parent.escapeSelector(this.nodeName) + "\"]").addClass("exercise-badge-hover");
            this.parent.highlightNode(this.nodeName, true);
        },

        onNodeMouseout: function() {
            if (!this.model.get("summative") && this.parent.map.getZoom() <= KnowledgeMapGlobals.options.minZoom)
                return;
            if (this.nodeName in this.parent.selectedNodes)
                return;

            $(".exercise-badge[data-id=\"" + this.parent.escapeSelector(this.nodeName) + "\"]").removeClass("exercise-badge-hover");
            this.parent.highlightNode(this.nodeName, false);
        }
    }, {
        extendBounds: function(bounds, dlat, dlng) {
            dlat = dlat || KnowledgeMapGlobals.nodeSpacing.lat;
            dlng = dlat || KnowledgeMapGlobals.nodeSpacing.lng;

            var ne = bounds.getNorthEast();
            var nee = new google.maps.LatLng(ne.lat() + dlat, ne.lng() + dlng);

            var sw = bounds.getSouthWest();
            var swe = new google.maps.LatLng(sw.lat() - dlat, sw.lng() - dlng);

            return new google.maps.LatLngBounds(swe, nee);
        }
    });
}

function KnowledgeMapDrawer(container, knowledgeMap) {
    var self = this;

    this.container = container;
    this.knowledgeMap = knowledgeMap;

    this.init = function() {

        $("#" + this.container + " .toggle-drawer").click(function() { self.toggle(); return false;});

        $(window).resize(function() {self.resize();});
        this.resize();

        if (window.iScroll)
        {
            // Mobile device, support single-finger touch scrolling
            $("#" + this.container + " .dashboard-drawer").removeClass("drawer-hoverable");
            var scroller = new iScroll("dashboard-drawer-inner", { hScroll: false, hScrollbar: false, vScrollbar: false });
        }
    };

    this.isExpanded = function() {
        var sCSSLeft = $("#" + this.container + " .dashboard-drawer").css("left").toLowerCase();
        return sCSSLeft == "0px" || sCSSLeft == "auto" || sCSSLeft == "";
    };

    this.toggle = function() {

        if (this.fToggling) return;

        var fExpanded = this.isExpanded();

        var jelDrawer = $("#" + this.container + " .dashboard-drawer");
        var leftDrawer = fExpanded ? -1 * (jelDrawer.width() + 20) : 0;

        var jelTitle = $("#" + this.container + " .dashboard-title");
        var leftTitle = fExpanded ? -1 * (jelTitle.width() + 10) : 5;

        jelTitle.animate({left: leftTitle}, 500);

        this.fToggling = true;
        jelDrawer.animate({left: leftDrawer}, 500, function() {self.fToggling = false;});

        if (self.knowledgeMap)
        {
            var leftMap = (fExpanded ? 0 : 340);
            $("#" + this.container + " .map-canvas").animate({marginRight: leftMap + "px", left: leftMap + "px"},
                    500,
                    function() {
                        google.maps.event.trigger(self.knowledgeMap, "resize");
                    }
            );
        }
    };

    this.resize = function() {
        var context = $("#" + this.container);

        // Resize map contents
        var jelMapContent = $(".dashboard-drawer", context)
            .add(".dashboard-drawer-inner", context)
            .add(".dashboard-map", context);

        var containerHeight = $(window).height();
        var yTopPadding = jelMapContent.offset().top;
        var yBottomPadding = $("#end-of-page-spacer").outerHeight(true);
        var newHeight = containerHeight - (yTopPadding + yBottomPadding);

        jelMapContent.height(newHeight);


        // Account for padding in the dashboard drawer
        var jelDrawerInner = $(".dashboard-drawer-inner", context);
        jelDrawerInner.height(jelDrawerInner.height() - 20);

        if (self.knowledgeMap && self.knowledgeMap.map)
            google.maps.event.trigger(self.knowledgeMap.map, "resize");
    };

    this.init();
}

function KnowledgeMap(params) {

    if (typeof google === "undefined") {
        alert("Please make sure you're not using any browser extensions or addons that may be blocking google.com,\n" +
                "which is needed to display the Khan Academy exercises.\n\nOnce you've done that, restart your browser and reload this page.");
        return;
    }

    if (!window.KnowledgeMapGlobals)
        KnowledgeMapInitGlobals();

    if (!window.com || !window.com.redfin)
        FastMarkerOverlayInit();

    var self = this;

    this.selectedNodes = {};
    // This handler exists as a hook to override what happens when an
    // exercise node is clicked. By default, it does nothing.
    this.nodeClickHandler = function(exercise, evt) {
        return true;
    };
    this.updateFilterTimout = null;

    // Models
    this.exerciseModels = []; // list of exercises in displayed order
    this.exercisesByName = {}; // fast access to exercises by name
    this.filterSettings = new Backbone.Model({"filterText": "---", "userShowAll": false});
    this.numSuggestedExercises = 0;
    this.numRecentExercises = 0;

    // Views
    this.exerciseRowViews = [];
    this.exerciseMarkerViews = {};

    // Map
    this.map = null;
    this.overlay = null;
    this.dictNodes = {};
    this.dictEdges = {};
    this.markers = [];
    this.latLngBounds = null;
    this.fFirstDraw = true;
    this.fCenterChanged = false;
    this.fZoomChanged = false;

    this.admin = !!params.admin;
    this.newGoal = !!params.newGoal;

    this.init = function(params) {
        this.containerID = (!!params.container) ? ("#" + params.container) : null;
        this.elementTable = {};

        if (!params.hideDrawer)
            this.drawer = new KnowledgeMapDrawer(params.container, this);


        if (!this.admin) {
            self.getElement("exercise-all-exercises").click(function() { self.toggleShowAll(); });
        }

        this.filterSettings.set({"userShowAll": this.admin});

        Handlebars.registerPartial("streak-bar", Templates.get("shared.streak-bar")); // TomY TODO do this automatically?
        Handlebars.registerPartial("knowledgemap-exercise", Templates.get("shared.knowledgemap-exercise")); // TomY TODO do this automatically?

        // Initial setup of exercise list from embedded data
        this.exerciseModels = _.map(graph_dict_data, function(exercise) {
            var invalidForGoal = (
                exercise.goal_req ||
                exercise.status === "Proficient" ||
                exercise.status === "Review"
            );

            if (self.newGoal && invalidForGoal) {
                exercise.invalidForGoal = true;
            }

            return new KnowledgeMapExercise(exercise);
        });
        this.exercisesByName = _.indexBy(this.exerciseModels, function(ex) {
            return ex.get("name");
        });

        this.initSidebar();
        this.initMap();
        this.initFilter();
    };

    this.initSidebar = function() {
        var suggestedExercisesContent = this.admin ? null : this.getElement("suggested-exercises-content");
        var recentExercisesContent = this.admin ? null : this.getElement("recent-exercises-content");
        var allExercisesContent = this.getElement("all-exercises-content");

        // ensure blank elements take up the right amount of space
        var createEl = function() {
            return $("<div>", {'class': 'exercise-badge'});
        };

        _.each(this.exercisesByName, function(exerciseModel) {
            // Create views
            var element;
            if (exerciseModel.get("isSuggested")) {
                if (!params.hideReview || !exerciseModel.get("isReview")) {
                    element = createEl();
                    element.appendTo(suggestedExercisesContent);
                    this.exerciseRowViews.push(new ExerciseRowView({
                        model: exerciseModel,
                        el: element,
                        type: "suggested",
                        admin: this.admin,
                        parent: this
                    }));
                    this.numSuggestedExercises++;
                }
            }

            if (exerciseModel.get("recent")) {
                element = createEl();
                element.appendTo(recentExercisesContent);
                this.exerciseRowViews.push(new ExerciseRowView({
                    model: exerciseModel,
                    el: element,
                    type: "recent",
                    admin: this.admin,
                    parent: this
                }));

                this.numRecentExercises++;
            }

            element = createEl();
            element.appendTo(allExercisesContent);
            this.exerciseRowViews.push(new ExerciseRowView({
                model: exerciseModel,
                el: element,
                type: "all",
                admin: this.admin,
                parent: this
            }));
        }, this);

        // use lazy rendering unless all exercises are showing
        if (!this.filterSettings.get("userShowAll")) {
            this.getElement(".dashboard-drawer-inner.fancy-scrollbar")
                .on("scroll.inflateVisible", $.proxy(this.inflateVisible, this));
        }

        var handler = function(evt) {
            // as doFilter is running while elements are detached, dimensions
            // will not work. Record the dimensions before we call it.
            var row = _.find(this.exerciseRowViews, function(row) { return row.visible; });

            var rowHeight;
            if (row) {
                rowHeight = row.el.outerHeight(/* includeMargin */ true);
            } else {
                // use a guess because doFilter can't determine this for itself
                rowHeight = 86;
            }
            var screenHeight = this.getElement(".dashboard-drawer-inner.fancy-scrollbar").height();

            temporaryDetachElement(this.getElement("exercise-list"), function() {
                this.doFilter(evt, rowHeight, screenHeight);
            }, this);
        };

        this.filterSettings.bind("change", handler, this);
    };

    // this inflates all remaining visible rows. We could maybe improve it more
    // by only inflating the next screenful, but for now just do them all.
    this.queryRowsRendered = false;
    this.inflateVisible = function(evt) {
        if (this.queryRowsRendered) return;
        _.each(this.exerciseRowViews, function(rowView) {
            if (rowView.visible && !rowView.inflated) {
                rowView.inflate();
            }
        });
        this.queryRowsRendered = true;

        var inflatedAll = (this.filterSettings.get("userShowAll") &&
                           this.filterSettings.get("filterText"));
        if (inflatedAll) {
            $(".dashboard-drawer-inner.fancy-scrollbar").off("scroll.inflateVisible");
        }
    };

    this.doFilter = function(evt, rowHeight, screenHeight) {
        // only render the rows that are on screen. Overshoot by a little to be
        // sure.
        rowHeight = rowHeight || 0;
        screenHeight = screenHeight || $(".dashboard-drawer-inner.fancy-scrollbar").height();
        screenHeight *= 1.3;

        var renderedHeight = 0;

        var userShowAll = this.filterSettings.get("userShowAll");
        var filterText = this.filterSettings.get("filterText");
        var bounds = this.map.getBounds();
        if (bounds)
            bounds = ExerciseMarkerView.extendBounds(bounds);

        _.each(this.exerciseRowViews, function(row) {
            var exerciseName = row.model.get("lowercaseName");

            // single letter filters have lots of matches, so require exercise
            // name to start with filter
            var filterMatches;
            if (filterText.length == 1) {
                filterMatches = exerciseName[0] == filterText;
            }
            else {
                filterMatches = exerciseName.indexOf(filterText) >= 0;
            }

            var allowVisible = filterText || userShowAll || row.options.type != "all";
            row.visible = allowVisible && filterMatches;

            if (row.visible) {
                // only actually inflate if it's going to be on screen
                if (renderedHeight < screenHeight) {
                    if (!row.inflated) {
                        row.inflate();
                    }
                }
                row.el.show();

                if (rowHeight === 0) {
                    rowHeight = row.el.outerHeight(/* includeMargin */ true);
                }
                renderedHeight += rowHeight;
            } else {
                row.el.hide();
            }

            // filter the item off the map view
            if (row.options.type == "all" && this.exerciseMarkerViews[row.nodeName]) {
                this.exerciseMarkerViews[row.nodeName].setFiltered(!filterMatches, bounds);
            }
        }, this);

        // let scroll and finishRenderingNodes listeners finish the work later
        this.queryRowsRendered = false;
        this.queryNodesRendered = false;
    };

    this.initMap = function() {
        _.each(this.exercisesByName, function(exerciseModel) {
            // Update map graph
            this.addNode(exerciseModel.toJSON());
            _.each(exerciseModel.get("prereqs"), function(prereq) {
                this.addEdge(exerciseModel.get("name"), prereq, exerciseModel.get("summative"));
            }, this);
        }, this);

        var mapElement = this.getElement("map-canvas");
        this.map = new google.maps.Map(mapElement.get(0), {
            mapTypeControl: false,
            streetViewControl: false,
            scrollwheel: false
        });

        var knowledgeMapType = new google.maps.ImageMapType(KnowledgeMapGlobals.options);
        this.map.mapTypes.set("knowledge", knowledgeMapType);
        this.map.setMapTypeId("knowledge");

        // copy over the defaults
        var coords = $.extend({}, KnowledgeMapGlobals.coordsHome);

        // overwrite defaults with localStorage values (if any)
        var localCoords = $.parseJSON( window.localStorage[ "map_coords:"+USERNAME ] || "{}" );
        $.extend(coords, localCoords);

        // prefer server values if they're more fresh
        if (params.mapCoords && params.mapCoords.when > coords.when){
            coords = params.mapCoords;
        }

        this.map.setCenter(new google.maps.LatLng(coords.lat, coords.lng));
        this.map.setZoom(coords.zoom);

        this.layoutGraph();
        this.drawOverlay();

        this.latLngBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(KnowledgeMapGlobals.latMin, KnowledgeMapGlobals.lngMin),
            new google.maps.LatLng(KnowledgeMapGlobals.latMax, KnowledgeMapGlobals.lngMax));

        _.bindAll(this, "onCenterChange", "onIdle", "onClick", "finishRenderingNodes");
        google.maps.event.addListener(this.map, "center_changed", this.onCenterChange);
        google.maps.event.addListener(this.map, "idle", this.onIdle);
        google.maps.event.addListener(this.map, "click", this.onClick);
        google.maps.event.addListener(this.map, "center_changed", this.finishRenderingNodes);

        this.giveNasaCredit();
        $(window).on("beforeunload", $.proxy(this.saveMapCoords, this));
    };

    this.setNodeClickHandler = function(handler) {
        this.nodeClickHandler = handler;
    };

    this.panToNode = function(dataID) {
        var node = this.dictNodes[dataID];

        // Set appropriate zoom level if necessary
        if (node.summative && this.map.getZoom() > KnowledgeMapGlobals.options.minZoom)
            this.map.setZoom(KnowledgeMapGlobals.options.minZoom);
        else if (!node.summative && this.map.getZoom() == KnowledgeMapGlobals.options.minZoom)
            this.map.setZoom(KnowledgeMapGlobals.options.minZoom + 1);

        // Move the node to the center of the view
        this.map.panTo(node.latLng);
    };

    this.escapeSelector = function(s) {
        return s.replace(/(:|\.)/g, "\\$1");
    };

    this.giveNasaCredit = function() {
        // Setup a copyright/credit line, emulating the standard Google style
        // From
        // http://code.google.com/apis/maps/documentation/javascript/demogallery.html?searchquery=Planetary
        var creditNode = $("<div class='creditLabel'>Image Credit: SDSS, DSS Consortium, NASA/ESA/STScI</div>");
        creditNode[0].index = 0;
        this.map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(creditNode[0]);
    };

    this.layoutGraph = function() {

        var zoom = this.map.getZoom();

        var self = this;
        $.each(this.dictNodes, function(key, node) {
            self.drawMarker(node, zoom);
        });

        $.each(this.dictEdges, function(key, rgTargets) {
            for (var ix = 0; ix < rgTargets.length; ix++)
            {
                self.drawEdge(self.dictNodes[key], rgTargets[ix], zoom);
            }
        });
    };

    this.drawOverlay = function() {
        var self = this;
        this.overlay = new com.redfin.FastMarkerOverlay(this.map, this.markers);
        this.overlay.drawOriginal = this.overlay.draw;
        this.overlay.draw = function() {
            this.drawOriginal();

            var jrgNodes = $(self.containerID).find(".nodeLabel");

            if (!self.fFirstDraw)
            {
                self.onZoomChange(jrgNodes);
            }

            jrgNodes.each(function() {
                var exerciseName = $(this).attr("data-id");
                var exercise = self.exercisesByName[exerciseName];
                var view = self.exerciseMarkerViews[exerciseName];
                if (view) {
                    view.updateElement($(this));
                } else {
                    view = new ExerciseMarkerView({
                        model: exercise,
                        el: $(this),
                        parent: self
                    });
                    self.exerciseMarkerViews[exerciseName] = view;
                }
            });

            self.fFirstDraw = false;
        };
    };

    this.addNode = function(node) {
        this.dictNodes[node.name] = node;
    };

    this.addEdge = function(source, target, summative) {
        if (!this.dictEdges[source]) this.dictEdges[source] = [];
        var rg = this.dictEdges[source];
        rg[rg.length] = {"target": target, "summative": summative};
    };

    this.nodeStatusCount = function(status) {
        var c = 0;
        for (var ix = 1; ix < arguments.length; ix++)
        {
            if (arguments[ix].status == status) c++;
        }
        return c;
    };

    this.drawEdge = function(nodeSource, edgeTarget, zoom) {

        var nodeTarget = this.dictNodes[edgeTarget.target];

        // If either of the nodes is missing, don't draw the edge.
        if (!nodeSource || !nodeTarget) return;

        var coordinates = [
            nodeSource.latLng,
            nodeTarget.latLng
        ];

        var countProficient = this.nodeStatusCount("Proficient", nodeSource, nodeTarget);
        var countSuggested = this.nodeStatusCount("Suggested", nodeSource, nodeTarget);
        var countReview = this.nodeStatusCount("Review", nodeSource, nodeTarget);

        var color = KnowledgeMapGlobals.colors.gray;
        var weight = 1.0;
        var opacity = 0.48;

        if (countProficient == 2)
        {
            color = KnowledgeMapGlobals.colors.blue;
            weight = 5.0;
            opacity = 1.0;
        }
        else if (countProficient == 1 && countSuggested == 1)
        {
            color = KnowledgeMapGlobals.colors.green;
            weight = 5.0;
            opacity = 1.0;
        }
        else if (countReview > 0)
        {
            color = KnowledgeMapGlobals.colors.red;
            weight = 5.0;
            opacity = 1.0;
        }

        edgeTarget.line = new google.maps.Polyline({
            path: coordinates,
            strokeColor: color,
            strokeOpacity: opacity,
            strokeWeight: weight,
            clickable: false,
            map: this.getMapForEdge(edgeTarget, zoom)
        });
    };

    this.drawMarker = function(node, zoom) {

        var lat = -1 * (node.h_position - 1) * KnowledgeMapGlobals.nodeSpacing.lat;
        var lng = (node.v_position - 1) * KnowledgeMapGlobals.nodeSpacing.lng;

        node.latLng = new google.maps.LatLng(lat, lng);

        if (lat < KnowledgeMapGlobals.latMin) KnowledgeMapGlobals.latMin = lat;
        if (lat > KnowledgeMapGlobals.latMax) KnowledgeMapGlobals.latMax = lat;
        if (lng < KnowledgeMapGlobals.lngMin) KnowledgeMapGlobals.lngMin = lng;
        if (lng > KnowledgeMapGlobals.lngMax) KnowledgeMapGlobals.lngMax = lng;

        var marker = new com.redfin.FastMarker(
                "marker-" + node.name,
                node.latLng,
                [   "<a data-id='" + node.name + "' class='nodeLabel'>" +
                    "<img class='node-icon' src=''/>" +
                    "<img class='exercise-goal-icon' style='display: none' src='/static/images/flag.png'/>" +
                    "<div>" + node.display_name + "</div></a>"],
                "",
                node.summative ? 2 : 1,
                0, 0);

        this.markers[this.markers.length] = marker;
    };

    this.getMapForEdge = function(edge, zoom) {
        return ((zoom == KnowledgeMapGlobals.options.minZoom) == edge.summative) ? this.map : null;
    };

    this.highlightNode = function(node_name, highlight) {
        var markerView = this.exerciseMarkerViews[node_name];
        if (markerView)
            markerView.setHighlight(highlight);
    };

    this.onZoomChange = function() {

        var zoom = this.map.getZoom();

        if (zoom < KnowledgeMapGlobals.options.minZoom) return;
        if (zoom > KnowledgeMapGlobals.options.maxZoom) return;

        this.fZoomChanged = true;

        var self = this;
        $.each(this.dictEdges, function(idx, rgTargets) {
            for (var ix = 0; ix < rgTargets.length; ix++)
            {
                var line = rgTargets[ix].line;
                if (line == null) return;

                var map = self.getMapForEdge(rgTargets[ix], zoom);
                if (line.getMap() != map) line.setMap(map);
            }
        });
    };

    this.getMapCoords = function(){
        var center = this.map.getCenter();

        var coords = {
            "lat": center.lat(),
            "lng": center.lng(),
            "zoom": this.map.getZoom(),
            "when": +(new Date) // Date.now() not present on ie8
        };

        return coords;

    };

    this.saveMapCoords = function(){
        // TODO this may not work, could post synchronously to fix, but it's not critical
        $.post("/savemapcoords", this.getMapCoords());
    };

    this.onIdle = function() {

        if (!this.fCenterChanged && !this.fZoomChanged)
            return;

        // Panning by 0 pixels forces a redraw of our map's markers
        // in case they aren't being rendered at the correct size.
        this.map.panBy(0, 0);

        if (window.localStorage && window.JSON){
            var pos = this.getMapCoords();
            window.localStorage[ "map_coords:"+USERNAME ] = JSON.stringify(pos);
        }
    };

    this.onClick = function() {
        if (this.admin) {
            $.each(this.selectedNodes, function(node_name) {
                self.highlightNode(self.dictNodes[node_name], false);
            });
            self.selectedNodes = { };
        }
    };

    this.queryNodesRendered = true;
    this.finishRenderingNodes = function(evt) {
        if (this.queryNodesRendered) return;
        this.queryNodesRendered = true;

        _.each(this.exerciseRowViews, function(row) {
            if (row.options.type == "all" && this.exerciseMarkerViews[row.nodeName]) {
                this.exerciseMarkerViews[row.nodeName].updateAppearance();
            }
        }, this);
    };

    this.onCenterChange = function() {

        this.fCenterChanged = true;

        var center = this.map.getCenter();
        if (this.latLngBounds.contains(center)) {
            return;
        }

        var C = center;
        var X = C.lng();
        var Y = C.lat();

        var AmaxX = this.latLngBounds.getNorthEast().lng();
        var AmaxY = this.latLngBounds.getNorthEast().lat();
        var AminX = this.latLngBounds.getSouthWest().lng();
        var AminY = this.latLngBounds.getSouthWest().lat();

        if (X < AminX) {X = AminX;}
        if (X > AmaxX) {X = AmaxX;}
        if (Y < AminY) {Y = AminY;}
        if (Y > AmaxY) {Y = AmaxY;}

        this.map.setCenter(new google.maps.LatLng(Y, X));
    };

    // Filtering

    this.initFilter = function() {
        self.getElement("dashboard-filter-text").keyup(function() {
            if (self.updateFilterTimeout == null) {
                self.updateFilterTimeout = setTimeout(function() {
                    self.updateFilter();
                    self.updateFilterTimeout = null;
                }, 250);
            }
        }).placeholder();

        self.getElement("dashboard-filter-clear").click(function() {
            self.clearFilter();
        });
        this.clearFilter();
    };

    this.clearFilter = function() {
        self.getElement("dashboard-filter-text").val("");
        this.updateFilter();
    };

    this.updateFilter = function() {
        var filterText = $.trim(self.getElement("dashboard-filter-text").val().toLowerCase());
        self.filterSettings.set({"filterText": filterText});
        this.postUpdateFilter();
    };

    this.toggleShowAll = function() {
        this.filterSettings.set({"userShowAll": !self.filterSettings.get("userShowAll")});
        this.postUpdateFilter();
    };

    this.postUpdateFilter = function() {
        var counts = { "suggested": 0, "recent": 0, "all": 0 };
        var filterText = self.filterSettings.get("filterText");

        $.each(self.exerciseRowViews, function(idx, exerciseRowView) {
            if (exerciseRowView.visible)
                counts[exerciseRowView.options.type]++;
        });

        if (filterText && counts.all == 0) {
            self.getElement("exercise-no-results").show();
        } else {
            self.getElement("exercise-no-results").hide();
        }

        if (filterText) {
            self.getElement("dashboard-filter-clear").show();
            self.getElement("hide-on-dashboard-filter").hide();
            if (!self.admin)
                self.getElement("exercise-all-exercises").hide();
            self.getElement("dashboard-all-exercises").find(".exercise-filter-count").html("(Showing " + counts.all + " of " + graph_dict_data.length + ")").show();
        } else {
            self.getElement("dashboard-filter-clear").hide();
            self.getElement("hide-on-dashboard-filter").show();
            self.getElement("dashboard-all-exercises").find(".exercise-filter-count").hide();
            if (!self.admin) {
                self.getElement("exercise-all-exercises").show();
                self.getElement("exercise-all-exercises-text").html(self.filterSettings.get("userShowAll") ? "Hide All" : "Show All");
            }
        }
    };

    this.getElement = function(id) {
        if (this.elementTable[id])
            return this.elementTable[id];
        var el = null;
        if (this.containerID)
            el = $(this.containerID + " ." + id);
        else
            el = $("." + id);
        this.elementTable[id] = el;
        if (el.length == 0)
            throw new Error('Missing element: "' + id + '" in container "' + this.containerID + '"');
        return el;
    };

    this.init(params);
}
