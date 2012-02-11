/**
 * JS client library for detecting if a user has been served a
 * one-time promotion of any kind.
 *
 * Corresponds to PromoRecord in models.py on the server side.
 */

var Promos = {};

// TODO: use localstorage?
/**
 * Cache of promo data.
 */
Promos.cache_ = {};


/**
 * Asynchronously checks to see if a user has been served a
 * particular promo.
 * @param {string} promoName The name of the promo to check.
 * @param {Function} callback A callback that accepts a single boolean
 *     indicating whether or not the user has seen the promo.
 * @param {Object} context Optional 'this' context to invoke the callback with.
 */
Promos.hasUserSeen = function(promoName, callback, context) {
    if (promoName in Promos.cache_) {
        callback.call(context, Promos.cache_[promoName]);
        return;
    }

    $.ajax({
        type: "GET",
        url: "/api/v1/user/promo/" + encodeURIComponent(promoName),
        success: function(hasSeen) {
            Promos.cache_[promoName] = hasSeen;
            callback.call(context, hasSeen);
        },
        error: function() {
            // Err on the side of safety and avoid showing promos when
            // connectivity is flaky?
            callback.call(context, true);
        }
    });
};

/**
 * Marks a promo as having been served.
 */
Promos.markAsSeen = function(promoName) {
    $.ajax({
        type: "POST",
        url: "/api/v1/user/promo/" + encodeURIComponent(promoName)
    });
    Promos.cache_[promoName] = true;
};
