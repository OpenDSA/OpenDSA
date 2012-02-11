// Hello friend!
// APIActionResults is an observer for all XHR responses that go through the page
// The key being that it will listen for XHR messages with the magic header "X-KA-API-Response"
// which is added in from api/__init__.py
//
// In api/v1.py, add_action_results takes care of bundling data to be digested by this client-side
// listener. As a result, if you have something which happens as a result of an API POST, it's worth
// investigating whether or not you can have it triggered here rather than in khan-exercise.js
var APIActionResults = {

    init: function() {
        this.hooks = [];

        $(document).ajaxComplete(function(e, xhr, settings) {

            if (xhr &&
                xhr.getResponseHeader("X-KA-API-Version-Mismatch")) {
                apiVersionMismatch();
            }

            if (xhr &&
                xhr.getResponseHeader("X-KA-API-Response") &&
                xhr.responseText) {

                try { eval("var result = " + xhr.responseText); }
                catch (e) { return; }

                if (result) {
                    // Result format may differ depending on if 'casing=camel'
                    // was provided in the request.
                    var action = result['action_results'] || result['actionResults'];
                    if (action) {
                        $(APIActionResults.hooks).each(function(ix, el) {
                            if (typeof action[el.prop] !== "undefined") {
                                el.fxn(action[el.prop]);
                            }
                        });
                    }
                }
            }
        });

        jQuery.ajaxSetup({
            beforeSend: function(xhr, settings) {
                if (settings && settings.url && settings.url.indexOf("/api/") > -1) {
                    var xsrfToken = readCookie("fkey");
                    if (xsrfToken) {
                        // Send xsrf token along via header so it can be matched up
                        // w/ cookie value.
                        xhr.setRequestHeader("X-KA-FKey", xsrfToken);
                    } else {
                        apiVersionMismatch();
                        if (settings.error) {
                            settings.error();
                        }
                        return false;
                    }
                }
            }
        });

    },

    register: function(prop, fxn) {
        this.hooks[this.hooks.length] = {prop: prop, fxn: fxn};
    }
};

function apiVersionMismatch() {
    Notifications.showTemplate("shared.api-version-mismatch");
}

APIActionResults.init();

// Show any badges that were awarded w/ any API ajax request
$(function() { APIActionResults.register("badges_earned_html", Badges.show); });

// Show any login notifications that pop up w/ any API ajax request
$(function() { APIActionResults.register("login_notifications_html", Notifications.show); });

// Update user info after appropriate API ajax requests
$(function() { APIActionResults.register("user_info_html",
        function(sUserInfoHtml) {
            $("#user-info").html(sUserInfoHtml);
        }
    );
});

// show point animation above progress bar when in exercise pages
$(function() {

    var updatePointDisplay = function(data) {
        if (jQuery(".single-exercise").length > 0 && data.points > 0) {
            var coin = jQuery("<div>+" + data.points + "</div>").addClass("energy-points-badge");
            jQuery(".streak-bar").append(coin);
            jQuery(coin)
                .fadeIn(195)
                .delay(650)
                .animate({top: "-30", opacity: 0}, 350, "easeInOutCubic",
                    function() {jQuery(coin).hide(0).remove();}); // remove coin on animation complete
        }
    };

    APIActionResults.register("points_earned", updatePointDisplay);
});

// Update the "reviewing X exercises" heading counter and also change the
// heading to indicate reviews are done when appropriate
$(function() {
    APIActionResults.register("reviews_left", Review.updateCounter);
});
