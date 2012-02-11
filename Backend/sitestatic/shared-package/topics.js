// These models can automatically fetch the tree incrementally
// using API calls during traversal. Note that the fetchByID()
// call may be either synchronous or asynchronous, depending on
// whether the model is already in the cache.

window.TestTopics = function() {
    var tree = getDefaultTopicTree();
    KAConsole.log("Fetching root...");
    tree.fetchByID("root",
        function() {
            KAConsole.log("Got root. Fetching first child...");
            tree.fetchByID(this.get("children")[0].id,
                function() {
                    KAConsole.log("Got child topic:", this);
                }
            );
        }
    );
};

// Model for a TopicVersion

(function() {
    var topicVersionList = null;

    window.TopicVersion = Backbone.Model.extend({
		defaults: {
			number: 0, // API ID
			kind: "TopicVersion",
			"default": false, // Is the current default version
			edit: false, // Is the current editing version
			title: "(untitled version)",
			last_edited_by: "",
			description: "",
			created_on: "",
			updated_on: "" 
		},

        idAttribute: "number",

        urlRoot: "/api/v1/topicversion",

        initialize: function() {
            this._topicTree = new TopicTree(this);
        },

        getTopicTree: function() {
            return this._topicTree;
        }
    });

	window.TopicVersionList = IncrementalCollection.extend({
		model: TopicVersion,
        url: "/api/v1/topicversions/"
    });

    window.getTopicVersionList = function() {
		topicVersionList = topicVersionList || new TopicVersionList();
        return topicVersionList;
    };
})();

// Model/collection for Topics
(function() {
	var defaultTree = null;

	window.Topic = Backbone.Model.extend({
		defaults: {
			// Short version
			id: "new_topic", // API ID / slug
			title: "New Topic",
			standalone_title: "New Topic",
			kind: "Topic",

			// Long version
			description: "",
			hide: false,
			ka_url: "",
			tags: [],
			children: []
		},

		initialize: function() {
		},

        url: function() {
            var versionID = this.collection ? this.collection.getVersionID() : "edit";
			return "/api/v1/topicversion/" + versionID + "/topic/" + this.id;
        },

        getChildren: function() {
            var self = this;
            return _.map(this.get("children"), function(child) { return self.tree.get(child.id); });
        },

        addChild: function(child, idx) {
            var child_list = this.get("children").slice(0);
            child_list.splice(idx, 0, child);
            this.set({"children": child_list});
        },
        removeChild: function(kind, id) {
            var ret = null;
            var child_list = _.filter(this.get("children"), function(child) {
                if (child.kind != kind || child.id != id) {
                    return true;
                }
                ret = child;
                return false;
            });
            this.set({"children": child_list});
            return ret;
        },

        updateNode: function() {
            var tree = this.tree;

            // Insert "placeholder" nodes into tree so we can track changes
            _.each(this.get("children"), function(child) {
                if (child.kind == "Topic" && !tree.get(child.id)) {
                    var newNode = new Topic(child);
                    tree.addNode(newNode);
                    child.__ptr = newNode;
                }
            });

            // Update child lists
            tree.each(function(otherNode) {
                var children = _.map(otherNode.get("children"), function(child) {
                    if (child.__ptr && child.__ptr.__inited) {
                        return {
                            kind: child.kind,
                            __ptr: child.__ptr,
                            id: child.__ptr.id,
                            title: child.__ptr.get("title"),
                            hide: child.__ptr.get("hide")
                        };
                    } else {
                        return child;
                    }
                });
                otherNode.set({children: children});
            });
        }
	});

	window.TopicTree = IncrementalCollection.extend({
		model: Topic,
        version: null,

        initialize: function(version) {
            this.version = version;
        },

        getRoot: function() {
            var ret = this.fetchByID("root");
            if (!ret.__inited) {
                ret.set({title: "Loading..."});
            }
            return ret;
        },

        addNode: function(node) {
            KAConsole.log("Adding node to tree: " + node.get("id"));
            node.tree = this;
            this.add([ node ]);
            node.bind("change", node.updateNode, node);
        },

        getVersionID: function() {
            return _.isString(this.version) ? this.version : this.version.get("number");
        }
	});

    var itemIDTable = {
        Topic: "id",
        Video: "readable_id",
        Exercise: "name",
        Url: "id"
    };
    var itemTitleTable = {
        Topic: "title",
        Video: "title",
        Exercise: "display_name",
        Url: "title"
    };
    var itemHideTable = {
        Topic: "hide"
    };

    // Utility class to wrap a Video/Exercise/URL model with accessors for the common fields id/title/etc.
    window.TopicChild = function(childModel) {
        if (childModel instanceof Backbone.Model) {
            this.model = childModel.toJSON();
        } else {
            this.model = childModel;
        }

        this.kind = this.model.kind;
        this.id = this.model[itemIDTable[this.model.kind]]; 
        this.title = this.model[itemTitleTable[this.model.kind]]; 
        if (itemHideTable[this.model.kind]) {
            this.hide = this.model[itemHideTable[this.model.kind]];
        } else {
            this.hide = false;
        }
    };

    window.getDefaultTopicTree = function() {
		defaultTree = defaultTree || new TopicTree("default");
        return defaultTree;
    };

})();

// Model/collection for Videos
(function() {

	var videoList = null;

    window.Video = Backbone.Model.extend({
        defaults: {
            readable_id: "", // API ID / slug
			kind: "Video",
            title: "",
            youtube_id: "",
            description: "",
            keywords: "",
            duration: 0,
            views: 0,
            date_added: "",
            url: "",
            ka_url: "",
            relative_url: "",
            download_urls: null
        },

        idAttribute: "readable_id",

        initialize: function(version) {
            this.version = version;
        },

        urlRoot: "/api/v1/topicversion/edit/videos",
    });

	window.VideoList = IncrementalCollection.extend({
		model: Video
    });

    window.getVideoList = function() {
		videoList = videoList || new VideoList();
        return videoList;
    };

})();

// Model/collection for Exercises

(function() {

	var exerciseList = null;

    window.Exercise = Backbone.Model.extend({
        defaults: {
            name: "new_exercise", // API ID / slug
			kind: "Exercise",
            display_name: "New Exercise", 
            short_display_name: "New Ex", 
            creation_date: "", 
            h_position: 0, 
            v_position: 0,
            live: false, 
            summative: false, 
            num_milestones: 0, 
            seconds_per_fast_problem: 0, 
            covers: [], 
            prerequisites: [], 
            ka_url: "", 
            relative_url: "",
            description: "",
            tags: []
        },

        idAttribute: "name",

        urlRoot: "/api/v1/topicversion/edit/exercises"
    });

	window.ExerciseList = IncrementalCollection.extend({
		model: Exercise
    });

    window.getExerciseList = function() {
		exerciseList = exerciseList || new ExerciseList();
        return exerciseList;
    };

})();

// Model/collection for URLs

(function() {

	var urlList = null;

    window.ExternalURL = Backbone.Model.extend({
        defaults: {
            id: "", // API ID
            kind: "Url",
            url: "",
            title: "New URL",
            tags: [],
            created_on: "",
            updated_on: ""
        },

        urlRoot: "/api/v1/topicversion/edit/url"
    });

	window.URLList = IncrementalCollection.extend({
		model: ExternalURL
    });

    window.getUrlList = function() {
		urlList = urlList || new URLList();
        return urlList;
    };

})();
