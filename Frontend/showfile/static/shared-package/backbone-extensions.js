// This file contains extensions to Backbone models, collections, etc. that can
// be reused throughout the codebase, as well as any global overrides.

/* Backbone.Collection has no facility to asynchronously fetch individual
 models. IncrementalCollection.fetchByID() will return the given model
 if it is already loaded from the server, or fetch it immediately. The
 callback is called either immediately or when the model is finished
 loading. The __inited flag on the model is set to true if the model
 has been loaded from the server. */
window.IncrementalCollection = Backbone.Collection.extend({
    fetchByID: function(id, callback, args) {
        var ret = this.get(id);
        if (!ret) {
            if (!this.idAttribute) {
                this.idAttribute = this.model.prototype.idAttribute;
                if (!this.idAttribute) {
                    this.idAttribute = "id";
                }
            }

            var attrs = {};
            attrs[this.idAttribute] = id;
            ret = this._add(attrs);
        }
        if (!ret.__inited) {
            if (!ret.__callbacks) {
                ret.__callbacks = [];
			}
            if (callback) {
                ret.__callbacks.push({ callback: callback, args: args });
			}

            if (!ret.__requesting) {
                KAConsole.log("IC (" + id + "): Sending request...");
                ret.fetch({
                    success: function() {
                        KAConsole.log("IC (" + id + "): Request succeeded.");
                        ret.__inited = true;
                        ret.__requesting = false;
                        _.each(ret.__callbacks, function(cb) {
                            cb.callback.apply(null, [ret].concat(cb.args));
                        });
                        ret.__callbacks = [];
                    },

                    error: function() {
                        KAConsole.log("IC (" + id + "): Request failed!");
                        ret.__requesting = false;
                    }
                });
                ret.__requesting = true;
            } else {
                KAConsole.log("IC (" + id + "): Already requested.");
            }
        } else {
            KAConsole.log("IC (" + id + "): Already loaded.");
            if (callback) {
                callback.apply(null, [ret].concat(args));
            }
        }

        return ret;
    },

    resetInited: function(models, options) {
        this.reset(models, options);
        _.each(this.models, function(model) {
            model.__inited = true;
        });
    },

    addInited: function(models, options) {
        if (!this.idAttribute) {
            this.idAttribute = new this.model({}).idAttribute;
            if (!this.idAttribute) {
                this.idAttribute = "id";
            }
        }
        var self = this;

        this.add(models, options);
        _.each(models, function(model) {
            var newModel = self.get(model[self.idAttribute]);
            newModel.__inited = true;
        });
    }
});
