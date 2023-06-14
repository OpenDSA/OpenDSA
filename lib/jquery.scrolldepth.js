/*!
 * @preserve
 * jquery.scrolldepth.js | v1.2.0
 * Copyright (c) 2020 Rob Flaherty (@robflaherty)
 * Licensed under the MIT and GPL licenses.
 */

/* Universal module definition */

(function (factory) {
    if (typeof define === 'function' && define.amd) {
      // AMD
      define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) {
      // CommonJS
      module.exports = factory(require('jquery'));
    } else {
      // Browser globals
      factory(jQuery);
    }
  }(function ($) {
  
    /* Scroll Depth */
  
    "use strict";
    var defaults = {
      minHeight: 0,
      elements: [],
      percentage: true,
      userTiming: true,
      pixelDepth: true,
      dataLayer: 'dataLayer'
    };
  
    var $window = $(window),
      cache = [],
      scrollEventBound = false,
      lastPixelDepth = 0,
      standardEventHandler;
  
    /*
     * Plugin
     */
  
    $.scrollDepth = function (options) {
  
      var startTime = +new Date;
  
      options = $.extend({}, defaults, options);
  
      // Return early if document height is too small
      if ($(document).height() < options.minHeight) {
        return;
      }
  
      if (typeof options.eventHandler === "function") {
        standardEventHandler = options.eventHandler;
      } else if (typeof window[options.dataLayer] !== "undefined" && typeof window[options.dataLayer].push === "function") {
        standardEventHandler = function (data) {
          window[options.dataLayer].push(data);
        };
      }
  
      /*
       * Functions
       */
      function sendEvent(action, label, scrollDistance, timing) {
  
        if (standardEventHandler) {
          lastPixelDepth = scrollDistance;
          standardEventHandler({ 'event': 'scrollDepth', 'eventAction': action, 'eventLabel': label, 'pixelDepth': rounded(scrollDistance), 'eventTiming': timing });
        }
      }
  
      function calculateMarks(docHeight) {
        return {
          '25%': parseInt(docHeight * 0.25, 10),
          '50%': parseInt(docHeight * 0.50, 10),
          '75%': parseInt(docHeight * 0.75, 10),
          // Cushion to trigger 100% event in iOS
          '100%': docHeight - 5
        };
      }
  
      function checkMarks(marks, scrollDistance, timing) {
        // Check each active mark
        $.each(marks, function (key, val) {
          if ($.inArray(key, cache) === -1 && scrollDistance >= val) {
            sendEvent('Percentage', key, scrollDistance, timing);
            cache.push(key);
          }
        });
      }
  
      function checkElements(elements, scrollDistance, timing) {
        $.each(elements, function (index, elem) {
          if ($.inArray(elem, cache) === -1 && $(elem).length) {
            if (scrollDistance >= $(elem).offset().top) {
              sendEvent('Elements', elem, scrollDistance, timing);
              cache.push(elem);
            }
          }
        });
      }
  
      function rounded(scrollDistance) {
        // Returns String
        return (Math.floor(scrollDistance / 250) * 250).toString();
      }
  
      function init() {
        bindScrollDepth();
      }
  
      /*
       * Public Methods
       */
  
      // Reset Scroll Depth with the originally initialized options
      $.scrollDepth.reset = function () {
        cache = [];
        lastPixelDepth = 0;
        $window.off('scroll.scrollDepth');
        bindScrollDepth();
      };
  
      // Add DOM elements to be tracked
      $.scrollDepth.addElements = function (elems) {
  
        if (typeof elems == "undefined" || !$.isArray(elems)) {
          return;
        }
  
        $.merge(options.elements, elems);
  
        // If scroll event has been unbound from window, rebind
        if (!scrollEventBound) {
          bindScrollDepth();
        }
  
      };
  
      // Remove DOM elements currently tracked
      $.scrollDepth.removeElements = function (elems) {
  
        if (typeof elems == "undefined" || !$.isArray(elems)) {
          return;
        }
  
        $.each(elems, function (index, elem) {
  
          var inElementsArray = $.inArray(elem, options.elements);
          var inCacheArray = $.inArray(elem, cache);
  
          if (inElementsArray != -1) {
            options.elements.splice(inElementsArray, 1);
          }
  
          if (inCacheArray != -1) {
            cache.splice(inCacheArray, 1);
          }
  
        });
  
      };
  
      /*
       * Throttle function borrowed from:
       * Underscore.js 1.5.2
       * http://underscorejs.org
       * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
       * Underscore may be freely distributed under the MIT license.
       */
  
      function throttle(func, wait) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        var later = function () {
          previous = new Date;
          timeout = null;
          result = func.apply(context, args);
        };
        return function () {
          var now = new Date;
          if (!previous) previous = now;
          var remaining = wait - (now - previous);
          context = this;
          args = arguments;
          if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
          } else if (!timeout) {
            timeout = setTimeout(later, remaining);
          }
          return result;
        };
      }
  
      /*
       * Scroll Event
       */
  
      function bindScrollDepth() {
  
        scrollEventBound = true;
  
        $window.on('scroll.scrollDepth', throttle(function () {
          /*
           * We calculate document and window height on each scroll event to
           * account for dynamic DOM changes.
           */
  
          var docHeight = $(document).height(),
            winHeight = window.innerHeight ? window.innerHeight : $window.height(),
            scrollDistance = $window.scrollTop() + winHeight,
  
            // Recalculate percentage marks
            marks = calculateMarks(docHeight),
  
            // Timing
            timing = +new Date - startTime;
  
          // If all marks already hit, unbind scroll event
          if (cache.length >= options.elements.length + (options.percentage ? 4 : 0)) {
            $window.off('scroll.scrollDepth');
            scrollEventBound = false;
            return;
          }
  
          // Check specified DOM elements
          if (options.elements) {
            checkElements(options.elements, scrollDistance, timing);
          }
  
          // Check standard marks
          if (options.percentage) {
            checkMarks(marks, scrollDistance, timing);
          }
        }, 500));
  
      }
  
      init();
  
    };
  
    // UMD export
    return $.scrollDepth;
  
  }));