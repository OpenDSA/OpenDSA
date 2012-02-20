var KAConsole = {
    debugEnabled: false,
    log: function() {
        if (window.console && KAConsole.debugEnabled) {
            if (console.log.apply)
                console.log.apply(console, arguments);
            else
                Function.prototype.apply.call(console.log, null, arguments);
        }
    }
};

function addCommas(nStr) // to show clean number format for "people learning right now" -- no built in JS function
{
    nStr += "";
    var x = nStr.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
}

function validateEmail(sEmail)
{
     var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return sEmail.match(re);
}

function addAutocompleteMatchToList(list, match, kind, reMatch) {
    var o = {
                "label": (kind == 'exercise') ? match.display_name : match.title,
                "title": (kind == 'exercise') ? match.display_name : match.title,
                "value": match.relative_url || match.ka_url,
                "key": match.key,
                "kind": kind
            };

    if (reMatch)
        o.label = o.label.replace(reMatch, "<b>$1</b>");

    list[list.length] = o;
}

function initAutocomplete(selector, fTopics, fxnSelect, fIgnoreSubmitOnEnter)
{
    var autocompleteWidget = $(selector).autocomplete({
        delay: 150,
        source: function(req, fxnCallback) {

            var term = $.trim(req.term);
            if (!term) {
                fxnCallback([]);
                return;
            }

            // Get autocomplete matches
            $.getJSON("/api/v1/autocomplete", {"q": term}, function(data) {

                var matches = [];

                if (data != null)
                {
                    var reMatch = null;

                    // Try to find the "scent" of the match.  If regexp fails
                    // to compile for any input reason, ignore.
                    try {
                        reMatch = new RegExp("(" + data.query + ")", "i");
                    }
                    catch (e) {
                        reMatch = null;
                    }

                    // Add topic and video matches to list of autocomplete suggestions

                    if (fTopics) {
                        for (var ix = 0; ix < data.topics.length; ix++) {
                            addAutocompleteMatchToList(matches, data.topics[ix], "topic", reMatch);
                        }
                    }
                    for (var ix = 0; ix < data.videos.length; ix++) {
                        addAutocompleteMatchToList(matches, data.videos[ix], "video", reMatch);
                    }
                    for (var ix = 0; ix < data.exercises.length; ix++) {
                        addAutocompleteMatchToList(matches, data.exercises[ix], "exercise", reMatch);
                    }
                }

                fxnCallback(matches);

            });
        },
        focus: function() {
            return false;
        },
        select: function(e, ui) {
            if (fxnSelect)
                fxnSelect(ui.item);
            else
                window.location = ui.item.value;
            return false;
        },
        open: function(e, ui) {
            var jelMenu = $(autocompleteWidget.data("autocomplete").menu.element);
            var jelInput = $(this);

            var pxRightMenu = jelMenu.offset().right + jelMenu.outerWidth();
            var pxRightInput = jelInput.offset().right + jelInput.outerWidth();

            if (pxRightMenu > pxRightInput)
            {
                // Keep right side of search input and autocomplete menu aligned
                jelMenu.offset({
                                    right: pxRightInput - jelMenu.outerWidth(),
                                    top: jelMenu.offset().top
                                });
            }
        }
    }).bind("keydown.autocomplete", function(e) {
        if (!fIgnoreSubmitOnEnter && e.keyCode == $.ui.keyCode.ENTER || e.keyCode == $.ui.keyCode.NUMPAD_ENTER)
        {
            if (!autocompleteWidget.data("autocomplete").selectedItem)
            {
                // If enter is pressed and no item is selected, default autocomplete behavior
                // is to do nothing.  We don't want this behavior, we want to fall back to search.
                $(this.form).submit();
            }
        }
    });

    autocompleteWidget.data("autocomplete")._renderItem = function(ul, item) {
        // Customize the display of autocomplete suggestions
        var jLink = $("<a></a>").html(item.label);
        if (item.kind == "topic")
            jLink.prepend("<span class='autocomplete-topic'>Topic </span>");
        else if (item.kind == "video")
            jLink.prepend("<span class='autocomplete-video'>Video </span>");
        else if (item.kind == "exercise")
            jLink.prepend("<span class='autocomplete-exercise'>Exercise </span>");

        return $("<li></li>")
            .data("item.autocomplete", item)
            .append(jLink)
            .appendTo(ul);
    };

    autocompleteWidget.data("autocomplete").menu.select = function(e) {
        // jquery-ui.js's ui.autocomplete widget relies on an implementation of ui.menu
        // that is overridden by our jquery.ui.menu.js.  We need to trigger "selected"
        // here for this specific autocomplete box, not "select."
        this._trigger("selected", e, { item: this.active });
    };
}

$(function() {
    // Configure the search form
    if ($("#page_search input[type=text]").placeholder().length) {
        initAutocomplete("#page_search input[type=text]", true);
    }

    $("#page_search").submit(function(e) {
        // Only allow submission if there is a non-empty query.
        return !!$.trim($("#page_search input[type=text]").val());
    });
});

function createCookie(name, value, days) {
    var expires;
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    else expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name, "", -1);
}

function areCookiesEnabled() {
    createCookie("detectCookiesEnabled", "KhanAcademy", 1);
    if (readCookie("detectCookiesEnabled") == null)
        return false;
    eraseCookie("detectCookiesEnabled");
    return true;
}

function onYouTubePlayerStateChange(state) {
    VideoStats.playerStateChange(state);
}

var VideoControls = {

    player: null,

    initJumpLinks: function() {
        $("span.youTube").addClass("playYouTube").removeClass("youTube").click(VideoControls.clickYouTubeJump);
    },

    clickYouTubeJump: function() {
        var seconds = $(this).attr("seconds");
        if (VideoControls.player && seconds)
        {
            VideoControls.player.seekTo(Math.max(0, seconds - 2), true);
            VideoControls.scrollToPlayer();
        }
    },

    play: function() {
        $(VideoControls).trigger("beforeplay");

        if (VideoControls.player && VideoControls.player.playVideo) {
            VideoControls.player.playVideo();
        }
    },

    pause: function() {
        if (VideoControls.player && VideoControls.player.pauseVideo)
            VideoControls.player.pauseVideo();
    },

    scrollToPlayer: function() {
        // If user has scrolled below the youtube video, scroll to top of video
        // when a play link is clicked.
        var yTop = $(VideoControls.player).offset().top - 2;
        if ($(window).scrollTop() > yTop) $(window).scrollTop(yTop);
    },

    onYouTubeBlocked: function(callback) {
        $("<img width=0 height=0>")
            .error(callback)
            .attr("src", "http://www.youtube.com/favicon.ico?" + Math.random())
            .appendTo("#page-container");
    },

    initThumbnails: function() {

        // Queue:false to make sure all of these run at the same time
        var animationOptions = {duration: 150, queue: false};

        $("#thumbnails")
            .cycle({
                fx: "scrollHorz",
                timeout: 0,
                speed: 550,
                slideResize: 0,
                easing: "easeInOutBack",
                startingSlide: 0,
                prev: "#arrow-left",
                next: "#arrow-right",
                before: function() {
                    $(this).find("div.pending").each(function() {
                        $(this).css("background-image", "url('" + $(this).data("src") + "')");
                    });
                }
            })
            .css({ width: "" }) // We want #thumbnails to be full width even though the cycle plugin doesn't
            .find(".thumbnail_link")
                .click(VideoControls.thumbnailClick).end()
            .find(".thumbnail_td")
                .hover(
                        function() {
                            $(this)
                                .find(".thumbnail_label").animate({ marginTop: -78 }, animationOptions).end()
                                .find(".thumbnail_teaser").animate({ height: 45 }, animationOptions);
                        },
                        function() {
                            $(this)
                                .find(".thumbnail_label").animate({ marginTop: -32 }, animationOptions).end()
                                .find(".thumbnail_teaser").animate({ height: 0 }, animationOptions);
                        }
            );

    },

    thumbnailClick: function() {
        var jelParent = $(this).parents("td").first();
        var youtubeId = jelParent.attr("data-youtube-id");
        if (VideoControls.player && youtubeId)
        {
            $(VideoControls).trigger("beforeplay");

            VideoControls.player.loadVideoById(youtubeId, 0, "default");
            VideoControls.scrollToPlayer();

            $("#thumbnails td.selected").removeClass("selected");
            jelParent.addClass("selected");

            VideoStats.startLoggingProgress(jelParent.attr("data-key"));

            return false;
        }
    }
};

var VideoStats = {

    dPercentGranularity: 0.05,
    dPercentLastSaved: 0.0,
    fSaving: false,
    player: null,
    intervalId: null,
    fAlternativePlayer: false,
    fEventsAttached: false,
    cachedDuration: 0, // For use by alternative FLV player
    cachedCurrentTime: 0, // For use by alternative FLV player
    dtLastSaved: null,
    sVideoKey: null,
    sYoutubeId: null,
    playing: false, //ensures pause and end events are idempotent

    getSecondsWatched: function() {
        if (!this.player) return 0;
        return this.player.getCurrentTime() || 0;
    },

    getSecondsWatchedSinceSave: function() {
        var secondsPageTime = ((new Date()) - this.dtLastSaved) / 1000.0;
        return Math.min(secondsPageTime, this.getSecondsWatched());
    },

    getPercentWatched: function() {
        if (!this.player) return 0;

        var duration = this.player.getDuration() || 0;
        if (duration <= 0) return 0;

        return this.getSecondsWatched() / duration;
    },

    startLoggingProgress: function(sVideoKey, sYoutubeId) {
        if (sYoutubeId) {
            this.sYoutubeId = sYoutubeId;
        }
        else if (sVideoKey) {
            this.sVideoKey = sVideoKey;
        }
        else {
            return; // no key given, can't log anything.
        }

        this.dPercentLastSaved = 0;
        this.cachedDuration = 0;
        this.cachedCurrentTime = 0;
        this.dtLastSaved = new Date();

        if (this.fEventsAttached) return;

        // Listen to state changes in player to detect final end of video
        if (this.player) this.listenToPlayerStateChange();
        // If the player isn't ready yet or if it is replaced in the future,
        // listen to the state changes once it is ready/replaced.
        var me = this;
        $(this).bind("playerready.videostats", function() {
            me.listenToPlayerStateChange();
        });

        if (this.intervalId === null)
        {
            // Every 10 seconds check to see if we've crossed over our percent
            // granularity logging boundary
            this.intervalId = setInterval(function() {
                VideoStats.playerStateChange(-2);
            }, 10000);
        }

        this.fEventsAttached = true;
    },

    stopLoggingProgress: function() {
        // unhook event handler initializer
        $(this).unbind("playerready.videostats");

        // send a final pause event
        this.playerStateChange(2);

        // now unhook playback polling
        if (this.intervalId !== null) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }

        // cannot unhook statechange handler as there is no removeEventListener

        this.fEventsAttached = false;
    },

    listenToPlayerStateChange: function() {
        if (!this.fAlternativePlayer && !this.player.fStateChangeHookAttached)
        {
            // YouTube player is ready, add event listener
            this.player.addEventListener("onStateChange", "onYouTubePlayerStateChange");

            // Multiple calls should be idempotent
            this.player.fStateChangeHookAttached = true;
        }
    },

    playerStateChange: function(state) {
        var playing = this.playing || this.fAlternativePlayer;
        if (state == -2) { // playing normally
            var percent = this.getPercentWatched();
            if (percent > (this.dPercentLastSaved + this.dPercentGranularity))
            {
                // Another 10% has been watched
                this.save();
            }
        } else if (state === 0 && playing) { // ended
            this.playing = false;
            this.save();
        } else if (state == 2 && playing) { // paused
            this.playing = false;
            if (this.getSecondsWatchedSinceSave() > 1) {
              this.save();
            }
        } else if (state == 1) { // play
            this.playing = true;
            this.dtLastSaved = new Date();
            this.dPercentLastSaved = this.getPercentWatched();

            if (!VideoControls.videoBingoSent &&
                    (typeof Homepage != "undefined")) {
                gae_bingo.bingo([
                        "homepage_restructure_homepage_video_played",
                        "homepage_restructure_homepage_video_played_binary"
                        ]);
                VideoControls.videoBingoSent = true;
            }
        }
        // If state is buffering, unstarted, or cued, don't do anything
    },

    save: function() {
        if (this.fSaving) return;

        // Make sure cookies are enabled, otherwise this totally won't work
        if (!areCookiesEnabled()) {
            KAConsole.log("Cookies appear to be disabled. Not logging video progress.");
            return;
        }

        this.fSaving = true;
        var percent = this.getPercentWatched();
        var dtLastSavedBeforeError = this.dtLastSaved;
        var id = 0;

        var data = {
            last_second_watched: this.getSecondsWatched(),
            seconds_watched: this.getSecondsWatchedSinceSave()
        };

        if (this.sVideoKey !== null) {
            data.video_key = this.sVideoKey;
        } else if (this.sYoutubeId !== null) {
            id = this.sYoutubeId;
        }

        $.ajax({type: "GET",
                url: "/api/v1/user/videos/" + id + "/log_compatability",
                data: data,
                success: function(data) {
                    VideoStats.finishSave(data, percent);
                },
                error: function() {
                    // Restore pre-error stats so user can still get full
                    // credit for video even if GAE timed out on a request
                    VideoStats.fSaving = false;
                    VideoStats.dtLastSaved = dtLastSavedBeforeError;
                }
        });

        this.dtLastSaved = new Date();
    },

    /* Use qtip2 (http://craigsworks.com/projects/qtip2/) to create a tooltip
     * that looks like the ones on youtube.
     *
     * Example:
     * VideoStats.tooltip('#points-badge-hover', '0 of 500 points');
     */
    tooltip: function(selector, content) {
        $(selector).qtip({
            content: {
                text: content
            },
            style: {
                classes: "ui-tooltip-youtube"
            },
            position: {
                my: "top center",
                at: "bottom center"
            },
            hide: {
                fixed: true,
                delay: 150
            }
        });
    },

    finishSave: function(dict_json, percent) {
        VideoStats.fSaving = false;
        VideoStats.dPercentLastSaved = percent;

        if (dict_json && dict_json.action_results.user_video) {
            video = dict_json.action_results.user_video;
            // Update the energy points box with the new data.
            var jelPoints = $(".video-energy-points");
            if (jelPoints.length)
            {
                jelPoints.data("title", jelPoints.data("title").replace(/^\d+/, video.points));
                $(".video-energy-points-current", jelPoints).text(video.points);

                // Replace the old tooltip with an updated one.
                VideoStats.tooltip("#points-badge-hover", jelPoints.data("title"));
            }
        }
    },

    prepareAlternativePlayer: function() {

        this.player = $("#flvPlayer").get(0);
        if (!this.player) return;

        // Simulate the necessary YouTube APIs for the alternative player
        this.player.getDuration = function() { return VideoStats.cachedDuration; };
        this.player.getCurrentTime = function() { return VideoStats.cachedCurrentTime; };

        this.fAlternativePlayer = true;
    },

    cacheStats: function(time, duration) {

        // Only update current time if it exists, not if video finished
        // and scrubber went back to 0.
        var currentTime = parseFloat(time);
        if (currentTime) this.cachedCurrentTime = currentTime;

        this.cachedDuration = parseFloat(duration);
    }
};

// called by youtube player upon load. see:
// http://code.google.com/apis/youtube/js_api_reference.html
function onYouTubePlayerReady(playerID) {
    // Check .playVideo to ensure that the YouTube JS API is available. Modern
    // browsers see both the OBJECT and EMBED elements, but only one has the
    // API attached to it, e.g., OBJECT for IE9, EMBED for Chrome.

    var player = $(".mirosubs-widget object").get(0);
    if (!player || !player.playVideo) player = document.getElementById("idPlayer");
    if (!player || !player.playVideo) player = document.getElementById("idOVideo");
    if (!player || !player.playVideo) throw new Error("YouTube player not found");

    // Ensure UniSub widget will know about ready players if/when it loads.
    (window.unisubs_readyAPIIDs = window.unisubs_readyAPIIDs || []).push((playerID == "undefined" || !playerID) ? "" : playerID);

    VideoControls.player = player;
    VideoStats.player = player;

    // The UniSub (aka mirosubs) widget replaces the YouTube player with a copy
    // and that will cause onYouTubePlayerReady() to be called again.  So, we trigger
    // 'playerready' events on any objects that are using the player so that they can
    // take appropriate action to use the new player.
    $(VideoControls).trigger("playerready");
    $(VideoStats).trigger("playerready");
}

var Badges = {

    show: function(sBadgeContainerHtml) {
        var jel = $(".badge-award-container");

        if (sBadgeContainerHtml)
        {
            jel.remove();
            $("body").append(sBadgeContainerHtml);
            jel = $(".badge-award-container");

            if (jel.length) Social.init(jel);
        }

        if (!jel.length) return;

        $(".achievement-badge", jel).click(function() {
            window.location = KA.profileRoot + "/achievements";
            return false;
        });

        var jelTarget = $(".badge-target");
        var jelContainer = $("#page-container-inner");

        var top = jelTarget.offset().top + jelTarget.height() + 5;

        setTimeout(function() {
            jel.css("visibility", "hidden").css("display", "");
            jel.css("left", jelContainer.offset().left + (jelContainer.width() / 2) - (jel.width() / 2)).css("top", -1 * jel.height());
            var topBounce = top + 10;
            jel.css("display", "").css("visibility", "visible");
            jel.animate({top: topBounce}, 300, function() {jel.animate({top: top}, 100);});
        }, 100);
    },

    hide: function() {
        var jel = $(".badge-award-container");
        jel.animate({top: -1 * jel.height()}, 500, function() {jel.hide();});
    },

    showMoreContext: function(el) {
        var jelLink = $(el).parents(".badge-context-hidden-link");
        var jelBadge = jelLink.parents(".achievement-badge");
        var jelContext = $(".badge-context-hidden", jelBadge);

        if (jelLink.length && jelBadge.length && jelContext.length)
        {
            $(".ellipsis", jelLink).remove();
            jelLink.html(jelLink.text());
            jelContext.css("display", "");
            jelBadge.css("min-height", jelBadge.css("height")).css("height", "auto");
            jelBadge.nextAll(".achievement-badge").first().css("clear", "both");
        }
    }
};

var Notifications = {

    show: function(sNotificationContainerHtml) {
        var jel = $(".notification-bar");

        if (sNotificationContainerHtml)
        {
            var jelNew = $(sNotificationContainerHtml);
            jel.empty().append(jelNew.children());
        }

        $(".notification-bar-close a").click(function() {
            Notifications.hide();
            return false;
        });

        if (!jel.is(":visible")) {
            setTimeout(function() {

                jel
                    .css("visibility", "hidden")
                    .css("display", "")
                    .css("top", -jel.height() - 2) // 2 for border and outline
                    .css("visibility", "visible");

                // Queue:false to make sure all of these run at the same time
                var animationOptions = {duration: 350, queue: false};

                $(".notification-bar-spacer").animate({ height: 35 }, animationOptions);
                jel.show().animate({ top: 0 }, animationOptions);

            }, 100);
        }
    },
    showTemplate: function(templateName) {
        var template = Templates.get(templateName);
        this.show(template());
    },

    hide: function() {
        var jel = $(".notification-bar");

        // Queue:false to make sure all of these run at the same time
        var animationOptions = {duration: 350, queue: false};

        $(".notification-bar-spacer").animate({ height: 0 }, animationOptions);
        jel.animate(
                { top: -jel.height() - 2 }, // 2 for border and outline
                $.extend({}, animationOptions,
                    { complete: function() { jel.empty().css("display", "none"); } }
                )
        );

        $.post("/notifierclose");
    }
};

var Timezone = {
    tz_offset: null,

    append_tz_offset_query_param: function(href) {
        if (href.indexOf("?") > -1)
            href += "&";
        else
            href += "?";
        return href + "tz_offset=" + Timezone.get_tz_offset();
    },

    get_tz_offset: function() {
        if (this.tz_offset == null)
            this.tz_offset = -1 * (new Date()).getTimezoneOffset();
        return this.tz_offset;
    }
};

// not every browser has Date.prototype.toISOString
// https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Date#Example.3a_ISO_8601_formatted_dates
if (!Date.prototype.toISOString) {
    Date.prototype.toISOString = function() {
        var pad = function(n) { return n < 10 ? "0" + n : n; };
            return this.getUTCFullYear() + "-" +
                pad(this.getUTCMonth() + 1) + "-" +
                pad(this.getUTCDate()) + "T" +
                pad(this.getUTCHours()) + ":" +
                pad(this.getUTCMinutes()) + ":" +
                pad(this.getUTCSeconds()) + "Z";
    };
}

// some browsers can't parse ISO 8601 with Date.parse
// http://anentropic.wordpress.com/2009/06/25/javascript-iso8601-parser-and-pretty-dates/
var parseISO8601 = function(str) {
    // we assume str is a UTC date ending in 'Z'
    var parts = str.split("T"),
        dateParts = parts[0].split("-"),
        timeParts = parts[1].split("Z"),
        timeSubParts = timeParts[0].split(":"),
        timeSecParts = timeSubParts[2].split("."),
        timeHours = Number(timeSubParts[0]),
        _date = new Date();

    _date.setUTCFullYear(Number(dateParts[0]));
    _date.setUTCMonth(Number(dateParts[1]) - 1);
    _date.setUTCDate(Number(dateParts[2]));
    _date.setUTCHours(Number(timeHours));
    _date.setUTCMinutes(Number(timeSubParts[1]));
    _date.setUTCSeconds(Number(timeSecParts[0]));
    if (timeSecParts[1]) {
        _date.setUTCMilliseconds(Number(timeSecParts[1]));
    }

    // by using setUTC methods the date has already been converted to local time(?)
    return _date;
};

var MailingList = {
    init: function(sIdList) {
        var jelMailingListContainer = $("#mailing_list_container_" + sIdList);
        var jelMailingList = $("form", jelMailingListContainer);
        var jelEmail = $(".email", jelMailingList);

        jelEmail.placeholder().change(function() {
            $(".error", jelMailingListContainer).css("display", (!$(this).val() || validateEmail($(this).val())) ? "none" : "");
        }).keypress(function() {
            if ($(".error", jelMailingListContainer).is(":visible") && validateEmail($(this).val()))
                $(".error", jelMailingListContainer).css("display", "none");
        });

        jelMailingList.submit(function(e) {
            if (validateEmail(jelEmail.val()))
            {
                $.post("/mailing-lists/subscribe", {list_id: sIdList, email: jelEmail.val()});
                jelMailingListContainer.html("<p>Done!</p>");
            }
            e.preventDefault();
            return false;
        });
    }
};

var CSSMenus = {

    active_menu: null,

    init: function() {
        // Make the CSS-only menus click-activated
        $(".noscript").removeClass("noscript");
        $(document).delegate(".css-menu > ul > li", "click", function() {
            if (CSSMenus.active_menu)
                CSSMenus.active_menu.removeClass("css-menu-js-hover");

            if (CSSMenus.active_menu && this == CSSMenus.active_menu[0])
                CSSMenus.active_menu = null;
            else
                CSSMenus.active_menu = $(this).addClass("css-menu-js-hover");
        });

        $(document).bind("click focusin", function(e) {
            if (CSSMenus.active_menu &&
                $(e.target).closest(".css-menu").length === 0) {
                CSSMenus.active_menu.removeClass("css-menu-js-hover");
                CSSMenus.active_menu = null;
            }
        });

        // Make the CSS-only menus keyboard-accessible
        $(document).delegate(".css-menu a", {
            focus: function(e) {
                $(e.target)
                    .addClass("css-menu-js-hover")
                    .closest(".css-menu > ul > li")
                        .addClass("css-menu-js-hover");
            },
            blur: function(e) {
                $(e.target)
                    .removeClass("css-menu-js-hover")
                    .closest(".css-menu > ul > li")
                        .removeClass("css-menu-js-hover");
            }
        });
    }
};
$(CSSMenus.init);

var IEHtml5 = {
    init: function() {
        // Create a dummy version of each HTML5 element we use so that IE 6-8 can style them.
        var html5elements = ["header", "footer", "nav", "article", "section", "menu"];
        for (var i = 0; i < html5elements.length; i++) {
            document.createElement(html5elements[i]);
        }
   }
};
IEHtml5.init();

var VideoViews = {
    init: function() {
        // Exponential fit calculated mid-Jan 2012
        var estimatedTotalViews = 2.4637851937509475e-13 * Math.exp(3.584901929640884e-11 * (+new Date()));

        var totalViewsString = addCommas("" + Math.round(estimatedTotalViews));

        $("#page_num_visitors").append(totalViewsString);
        $("#page_visitors").css("display", "inline");
    }
};
$(VideoViews.init);

var FacebookHook = {
    init: function() {
        if (!window.FB_APP_ID) return;

        window.fbAsyncInit = function() {
            FB.init({appId: FB_APP_ID, status: true, cookie: true, xfbml: true, oauth: true});

            if (!USERNAME) {
                FB.Event.subscribe("auth.login", function(response) {

                    if (response.authResponse) {
                        FacebookHook.fixMissingCookie(response.authResponse);
                    }

                    var url = URL_CONTINUE || "/";
                    if (url.indexOf("?") > -1)
                        url += "&fb=1";
                    else
                        url += "?fb=1";

                    var hasCookie = !!readCookie("fbsr_" + FB_APP_ID);
                    url += "&hc=" + (hasCookie ? "1" : "0");

                    url += "&hs=" + (response.authResponse ? "1" : "0");

                    window.location = url;
               });
            }

            FB.getLoginStatus(function(response) {

                if (response.authResponse) {
                    FacebookHook.fixMissingCookie(response.authResponse);
                }

                $("#page_logout").click(function(e) {

                    eraseCookie("fbsr_" + FB_APP_ID);

                    if (response.authResponse) {

                        FB.logout(function() {
                            window.location = $("#page_logout").attr("href");
                        });

                        e.preventDefault();
                        return false;
                    }

                });

            });
        };

        $(function() {
            var e = document.createElement("script"); e.async = true;
            e.src = document.location.protocol + "//connect.facebook.net/en_US/all.js";
            document.getElementById("fb-root").appendChild(e);
        });
    },

    fixMissingCookie: function(authResponse) {
        // In certain circumstances, Facebook's JS SDK fails to set their cookie
        // but still thinks users are logged in. To avoid continuous reloads, we
        // set the cookie manually. See http://forum.developers.facebook.net/viewtopic.php?id=67438.

        if (readCookie("fbsr_" + FB_APP_ID))
            return;

        if (authResponse && authResponse.signedRequest) {
            // Explicitly use a session cookie here for IE's sake.
            createCookie("fbsr_" + FB_APP_ID, authResponse.signedRequest);
        }
    }

};
FacebookHook.init();

var Throbber = {
    jElement: null,

    show: function(jTarget, fOnLeft) {
        if (!Throbber.jElement)
        {
            Throbber.jElement = $("<img style='display:none;' src='/images/throbber.gif' class='throbber'/>");
            $(document.body).append(Throbber.jElement);
        }

        if (!jTarget.length) return;

        var offset = jTarget.offset();

        var top = offset.top + (jTarget.height() / 2) - 8;
        var left = fOnLeft ? (offset.left - 16 - 4) : (offset.left + jTarget.width() + 4);

        Throbber.jElement.css("top", top).css("left", left).css("display", "");
    },

    hide: function() {
        if (Throbber.jElement) Throbber.jElement.css("display", "none");
    }
};

var SearchResultHighlight = {
    doReplace: function(word, element) {
        // Find all text elements
        textElements = $(element).contents().filter(function() { return this.nodeType != 1; });
        textElements.each(function(index, textElement) {
            var pos = textElement.data.toLowerCase().indexOf(word);
            if (pos >= 0) {
                // Split text element into three elements
                var highlightText = textElement.splitText(pos);
                highlightText.splitText(word.length);

                // Highlight the matching text
                $(highlightText).wrap('<span class="highlighted" />');
            }
        });
    },
    highlight: function(query) {
        $(".searchresulthighlight").each(function(index, element) {
            SearchResultHighlight.doReplace(query, element);
        });
    }
};

// This function detaches the passed in jQuery element and returns a function that re-attaches it
function temporaryDetachElement(element, fn, context) {
    var el, reattach;
    el = element.next();
    if (el.length > 0) {
        // This element belongs before some other element
        reattach = function() {
            element.insertBefore(el);
        };
    } else {
        // This element belongs at the end of the parent's child list
        el = element.parent();
        reattach = function() {
            element.appendTo(el);
        };
    }
    element.detach();
    var val = fn.call(context || this, element);
    reattach();
    return val;
}

var globalPopupDialog = {
    visible: false,
    bindings: false,

    // Size can be an array [width,height] to have an auto-centered dialog or null if the positioning is handled in CSS
    show: function(className, size, title, html, autoClose) {
        var css = (!size) ? {} : {
            position: "relative",
            width: size[0],
            height: size[1],
            marginLeft: (-0.5*size[0]).toFixed(0),
            marginTop: (-0.5*size[1] - 100).toFixed(0)
        }
        $("#popup-dialog")
            .hide()
            .find(".dialog-frame")
                .attr("class", "dialog-frame " + className)
                .attr('style', '') // clear style
                .css(css)
                .find(".description")
                    .html('<h3>' + title + '</h3>')
                    .end()
                .end()
            .find(".dialog-contents")
                .html(html)
                .end()
            .find(".close-button")
                .click(function() { globalPopupDialog.hide(); })
                .end()
            .show()

        if (autoClose && !globalPopupDialog.bindings) {
            // listen for escape key
            $(document).bind('keyup.popupdialog', function ( e ) {
                if ( e.which == 27 ) {
                    globalPopupDialog.hide();
                }
            });

            // close the goal dialog if user clicks elsewhere on page
            $('body').bind('click.popupdialog', function( e ) {
                if ( $(e.target).closest('.dialog-frame').length === 0 ) {
                    globalPopupDialog.hide();
                }
            });
            globalPopupDialog.bindings = true;
        } else if (!autoClose && globalPopupDialog.bindings) {
            $(document).unbind('keyup.popupdialog');
            $('body').unbind('click.popupdialog');
            globalPopupDialog.bindings = false;
        }

        globalPopupDialog.visible = true;
        return globalPopupDialog;
    },
    hide: function() {
        if (globalPopupDialog.visible) {
            $("#popup-dialog")
                .hide()
                .find(".dialog-contents")
                    .html('');

            if (globalPopupDialog.bindings) {
                $(document).unbind('keyup.popupdialog');
                $('body').unbind('click.popupdialog');
                globalPopupDialog.bindings = false;
            }

            globalPopupDialog.visible = false;
        }
        return globalPopupDialog;
    }
};

(function() {
    var messageBox = null;

    popupGenericMessageBox = function(options) {
        if (messageBox) {
            $(messageBox).modal('hide').remove();
        }

        options = _.extend({
            buttons: [
                { title: 'OK', action: hideGenericMessageBox }
            ]
        }, options);

        var template = Templates.get( "shared.generic-dialog" );
        messageBox = $(template(options)).appendTo(document.body).modal({
            keyboard: true,
            backdrop: true,
            show: true
        }).get(0);

        _.each(options.buttons, function(button) {
            $('.generic-button[data-id="' + button.title + '"]', $(messageBox)).click(button.action);
        });
    }

    hideGenericMessageBox = function() {
        if (messageBox) {
            $(messageBox).modal('hide').remove();
        }
        messageBox = null;
    }
})();

function dynamicPackage(packageName, callback, manifest) {
    var self = this;
    this.files = [];
    this.progress = 0;
    this.last_progress = 0;

    dynamicPackageLoader.loadingPackages[packageName] = this;
    _.each(manifest, function(filename) {
        var file = {
            "filename": filename,
            "content": null,
            "evaled": false
        };
        self.files.push(file);
        $.ajax({
            type: "GET",
            url: filename,
            data: null,
            success: function(content) {
                            KAConsole.log("Received contents of " + filename);
                            file.content = content;

                            self.progress++;
                            callback("progress", self.progress / (2 * self.files.length));
                            self.last_progress = self.progress;
                        },
            error: function(xml, status, e) {
                            callback("failed");
                        },
            dataType: "html"
        });
    });

    this.checkComplete = function() {
        var waiting = false;
        _.each(this.files, function(file) {
            if (file.content) {
                if (!file.evaled) {
                    var script = document.createElement("script");
                    if (file.filename.indexOf(".handlebars") > 0)
                        script.type = "text/x-handlebars-template"; // This hasn't been tested
                    else
                        script.type = "text/javascript";

                    script.text = file.content;

                    var head = document.getElementsByTagName("head")[0] || document.documentElement;
                    head.appendChild(script);

                    file.evaled = true;
                    KAConsole.log("Evaled contents of " + file.filename);

                    self.progress++;
                }
            } else {
                waiting = true;
                return _.breaker;
            }
        });

        if (waiting) {
            if (self.progress != self.last_progress) {
                callback("progress", self.progress / (2 * self.files.length));
                self.last_progress = self.progress;
            }
            setTimeout(function() { self.checkComplete(); }, 500);
        } else {
            dynamicPackageLoader.loadedPackages[packageName] = true;
            delete dynamicPackageLoader.loadingPackages[packageName];
            callback("complete");
        }
    };

    this.checkComplete();
}

var dynamicPackageLoader = {
    loadedPackages: {},
    loadingPackages: {},
    currentFiles: [],

    load: function(packageName, callback, manifest) {
        if (this.loadedPackages[packageName]) {
            if (callback)
                callback(packageName);
        } else {
            new dynamicPackage(packageName, callback, manifest);
        }
    },

    packageLoaded: function(packageName) {
        return this.loadedPackages[packageName];
    },

    setPackageLoaded: function(packageName) {
        this.loadedPackages[packageName] = true;
    }
};

$(function() {
    $(document).delegate("input.blur-on-esc", "keyup", function(e, options) {
        if (options && options.silent) return;
        if (e.which == "27") {
            $(e.target).blur();
        }
    });
});

// An animation that grows a box shadow of the review hue
$.fx.step.reviewExplode = function(fx) {
    var val = fx.now + fx.unit;
    $(fx.elem).css("boxShadow",
        "0 0 " + val + " " + val + " " + "rgba(227, 93, 4, 0.2)");
};

var Review = {
    REVIEW_DONE_HTML: "Review&nbsp;Done!",

    highlightDone: function() {
        if ($("#review-mode-title").hasClass("review-done")) {
            return;
        }

        var duration = 800;

        // Make the explosion flare overlap all other elements
        var overflowBefore = $("#container").css("overflow");
        $("#container").css("overflow", "visible")
            .delay(duration).queue(function() {
                $(this).css("overflow", overflowBefore);
            });

        // Review hue explosion
        $("#review-mode-title").stop().addClass("review-done").animate({
            reviewExplode: 200
        }, duration).queue(function() {
            $(this).removeAttr("style").addClass("post-animation");
        });

        // Temporarily change the color of the review done box to match the explosion
        $("#review-mode-title > div")
            .css("backgroundColor", "#F9DFCD")
            .delay(duration).queue(function() {
                $(this).removeAttr("style").addClass("review-done");
            });

        // Huge "REVIEW DONE!" text shrinks to fit in its box
        $("#review-mode-title h1").html(Review.REVIEW_DONE_HTML).css({
            fontSize: "100px",
            right: 0,
            position: "absolute"
        }).stop().animate({
            reviewGlow: 1,
            opacity: 1,
            fontSize: 30
        }, duration).queue(function() {
            $(this).removeAttr("style");
        });
    },

    initCounter: function(reviewsLeftCount) {
        var digits = "0 1 2 3 4 5 6 7 8 9 ";
        $("#review-counter-container")
            .find(".ones").text(new Array(10 + 1).join(digits)).end()
            .find(".tens").text(digits);
    },

    updateCounter: function(reviewsLeftCount) {

        // Spin the remaining reviews counter like a slot machine
        var reviewCounterElem = $("#review-counter-container"),
            reviewTitleElem = $("#review-mode-title"),
            oldCount = reviewCounterElem.data("counter") || 0,
            tens = Math.floor((reviewsLeftCount % 100) / 10),
            animationOptions = {
                duration: Math.log(1 + Math.abs(reviewsLeftCount - oldCount)) *
                    1000 * 0.5 + 0.2,
                easing: "easeInOutCubic"
            },
            lineHeight = parseInt(
                reviewCounterElem.children().css("lineHeight"), 10);

        reviewCounterElem.find(".ones").animate({
            top: (reviewsLeftCount % 100) * -lineHeight
        }, animationOptions);

        reviewCounterElem.find(".tens").animate({
            top: tens * -lineHeight
        }, animationOptions);

        if (reviewsLeftCount === 0) {
            if (oldCount > 0) {
                // Review just finished, light a champagne supernova in the sky
                Review.highlightDone();
            } else {
                reviewTitleElem
                    .addClass("review-done post-animation")
                    .find("h1")
                    .html(Review.REVIEW_DONE_HTML);
            }
        } else if (!reviewTitleElem.hasClass("review-done")) {
            $("#review-mode-title h1").text(
                reviewsLeftCount === 1 ? "Exercise Left!" : "Exercises Left");
        }

        reviewCounterElem.data("counter", reviewsLeftCount);
    }
};
