/*
   Shared, machine-agnostic graph-editor logic for FA/PDA/TM.
   Functions take dependencies as explicit parameters so each editor can keep exposing them under its existing local function names.
 */
var GraphEditor = (function ($) {
  "use strict";

  // Clears mode-related CSS classes and any active selection/highlight so
  // the canvas is in a neutral state before switching tools.
  // collapseEdgesFn: called instead when currently in "deleteNodes" mode,
  // since that mode also temporarily enlarges edges for easier clicking.
  function removeModeClasses(jsav, g, collapseEdgesFn) {
    $('.arrayPlace').empty();
    $('#download').html('');
    jsav.umsg('');
    if (g.first) {
      g.first.unhighlight();
      g.first = null;
    }
    if (g.selected) {
      g.selected.unhighlight();
      g.selected = null;
    }
    if ($(".jsavgraph").hasClass("deleteNodes")) {
      $(".jsavgraph").removeClass("deleteNodes");
      collapseEdgesFn();
    } else {
      $(".jsavgraph").removeClass("addNodes");
      $(".jsavgraph").removeClass("addEdges");
      $(".jsavgraph").removeClass("editNodes");
      $(".jsavgraph").removeClass("moveNodes");
      $(".jsavgraph").removeClass("working");
    }
  }

  // Cancels the current tool/mode entirely (e.g. on pressing Escape).
  function cancel(jsav, g, collapseEdgesFn) {
    $(".jsavgraph").removeClass("addNodes").removeClass("addEdges").removeClass("moveNodes").removeClass("editNodes").removeClass("deleteNodes").removeClass("working");
    jsav.umsg("");
    var nodes = g.nodes();
    for (var next = nodes.next(); next; next = nodes.next()) {
      next.unhighlight();
    }
    g.selected = null;
    g.hideRMenu();
    collapseEdgesFn();
    g.enableDragging();
  }

  // Disables the undo/redo toolbar buttons. Editors re-enable them once
  // their undo/redo stacks actually have something in them.
  function resetUndoButtons() {
    document.getElementById("undoButton").disabled = true;
    document.getElementById("redoButton").disabled = true;
  }

  // Un-highlights every mode/tool toolbar button. All three editors share
  // these same toolbar button IDs.
  function highlightSelectButton() {
    $('#undoButton').removeClass("active");
    $('#redoButton').removeClass("active");
    $('#deleteButton').removeClass("active");
    $('#editButton').removeClass("active");
    $('#nodeButton').removeClass("active");
    $('#edgeButton').removeClass("active");
    $('#collapseButton').removeClass("active");
  }

  // Reads a DOM element's current CSS translateY. Used by avoidOverFlow.
  function getTranslateY(element) {
    var style = window.getComputedStyle(element);
    var matrix = new WebKitCSSMatrix(style.transform);
    return matrix.m42;
  }

  // Shifts nodes/edges back down if an edge label has drifted above the top
  // of the canvas (can happen after certain drags/layouts), keeping the
  // graph fully visible within its container.
  function avoidOverFlow(g) {
    if (g === undefined) {
      return;
    }
    var edges = g._alledges;
    for (var i = 0; i < edges.length; i++) {
      var shiftValue =
        parseFloat(edges[i]._label.element[0].style.top) +
        getTranslateY(edges[i]._label.element[0]);
      if (shiftValue < 0) {
        var targetEdge = edges[i];
        if (targetEdge.endnode.element === targetEdge.startnode.element) {
          var tpoint = targetEdge.endnode.element[0];
          tpoint.style.transform =
            "translateY(" + (getTranslateY(tpoint) + -shiftValue) + "px)";
          if (tpoint.classList.contains("start")) {
            var startMarker = targetEdge.endnode._initialMarker.element[0];
            startMarker.style.transform =
              "translateY(" + (getTranslateY(startMarker) - shiftValue) + "px)";
          }
        } else {
          var startPoint = targetEdge.startnode.element[0];
          var endPoint = targetEdge.endnode.element[0];
          startPoint.style.transform =
            "translateY(" + (getTranslateY(startPoint) + -shiftValue) + "px)";
          endPoint.style.transform =
            "translateY(" + (getTranslateY(endPoint) + -shiftValue) + "px)";
          if (endPoint.classList.contains("start")) {
            var endMarker = targetEdge.endnode._initialMarker.element[0];
            endMarker.style.transform =
              "translateY(" + (getTranslateY(endMarker) - shiftValue) + "px)";
          } else if (startPoint.classList.contains("start")) {
            var startMarker2 = targetEdge.startnode._initialMarker.element[0];
            startMarker2.style.transform =
              "translateY(" + (getTranslateY(startMarker2) - shiftValue) + "px)";
          }
        }
        g.updateEdgePositions();
      }
    }
  }

  // Exports the #av canvas container (the graph drawing area, shared by all
  // three editors) as a downloaded JPEG image.
  function saveCanvasAsImage() {
    html2canvas(document.querySelector("#av")).then(function (canvas) {
      var a = document.createElement('a');
      // toDataURL defaults to png, so request a jpeg, then convert for file download.
      a.href = canvas.toDataURL("image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = 'image.jpg';
      a.click();
    });
  }

  // Runs a layout algorithm, first clearing mode state and any test
  // highlights (what a "test highlight" is is machine-specific, so that
  // clearing logic is passed in rather than assumed here).
  // runAlgorithmFn: function(g) that actually invokes the JSAV layout call,
  // e.g. function(g) { g.circleLayoutAlg(); }
  function applyLayout(g, runAlgorithmFn, removeModeClassesFn, removeTestHighlightsFn) {
    removeModeClassesFn();
    removeTestHighlightsFn();
    runAlgorithmFn(g);
  }

  // Generic click dispatcher for a node or edge: checks which editing mode is active and invokes the matching handler with the clicked node/edge as `this`.
  // Takes an object keyed by the calling editor's own mode class names (since these differ per editor), and only the first matching class's handler runs.
  function dispatchModeClick(modeHandlers) {
    for (var className in modeHandlers) {
      if (Object.prototype.hasOwnProperty.call(modeHandlers, className) && $(".jsavgraph").hasClass(className)) {
        modeHandlers[className].call(this);
        return;
      }
    }
  }

  // Closes the right-click context menu if it's open, reporting whether it
  // did so, so callers can skip the rest of their own click handling for
  // this click (a click meant to dismiss the menu shouldn't also act on
  // whatever's underneath it).
  function closeContextMenuIfOpen(g) {
    if ($("#rmenu").is(":visible")) {
      g.hideRMenu();
      return true;
    }
    return false;
  }

  // Switches the editor into a toolbar tool/edit mode: highlights the active
  // toolbar button, clears previous mode state and test highlights, runs
  // any mode-specific setup (e.g. enabling dragging), marks the canvas with
  // this mode's CSS class (if it has one - not every mode does), and shows
  // a status message.
  // options: {
  //   removeModeClassesFn, removeTestHighlightsFn: each editor's own (what
  //     counts as a "test highlight" is machine-specific),
  //   setup: optional function() run after clearing state, before the mode
  //     class/message/button are set,
  //   modeClass: optional CSS class to add to .jsavgraph,
  //   message: status text shown via jsav.umsg(),
  //   buttonSelector: the toolbar button to mark active, e.g. '#nodeButton'
  // }
  function enterMode(jsav, options) {
    highlightSelectButton();
    options.removeModeClassesFn();
    options.removeTestHighlightsFn();
    if (options.setup) { options.setup(); }
    if (options.modeClass) { $('.jsavgraph').addClass(options.modeClass); }
    jsav.umsg(options.message);
    $(options.buttonSelector).addClass('active');
  }

  // Registers keyboard shortcuts: array of { test(e), action(e) }, first match wins.
  // Skipped while a text input/textarea/contenteditable has focus, so typing is never hijacked.
  function registerKeybindings(bindings) {
    $(document).on('keydown', function (e) {
      var tag = (e.target.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) {
        return;
      }
      for (var i = 0; i < bindings.length; i++) {
        if (bindings[i].test(e)) {
          e.preventDefault();
          bindings[i].action(e);
          return;
        }
      }
    });
  }

  // Clicks a toolbar button via its own handler, unless it's disabled (jQuery's .click() otherwise ignores that).
  function clickButtonUnlessDisabled(buttonSelector) {
    var $button = $(buttonSelector);
    if (!$button.prop('disabled')) {
      $button.click();
    }
  }

  // Re-attaches the canvas-click and edge-label-click handlers, unbinding any previous instance first to avoid stacking duplicates.
  function rebindClickHandlers(graphClickHandler, labelClickHandler) {
    $('.jsavgraph').off('click', graphClickHandler).click(graphClickHandler);
    $('.jsavedgelabel').off('click', labelClickHandler).click(labelClickHandler);
  }

  // Creates a zoom/pan controller for a canvas element (applies a CSS
  // transform directly to it, transform-origin 0 0). screenToLocal converts
  // a raw page coordinate (e.g. a mouse event's pageX/pageY) into the
  // canvas's own local coordinate system - the same system node/edge
  // top/left positions already use - so existing "where on the canvas did I
  // click" code keeps working at any zoom/pan level, not just 100%/(0,0).
  // options.alsoTransform: an extra selector (e.g. the edges' SVG, which in
  // this app is a sibling of the node canvas, not a child of it) to apply
  // the exact same visual transform to, purely for keeping it in sync -
  // never used for any of the coordinate math below, which stays anchored
  // to canvasSelector alone.
  function createZoomPan(canvasSelector, options) {
    options = options || {};
    var minZoom = options.minZoom || 0.25,
      maxZoom = options.maxZoom || 3,
      state = { zoom: 1, panX: 0, panY: 0 };

    var alsoTransformObserverAttached = false;

    // alsoTransform (e.g. Raphael's svg) can be created lazily - well after
    // this controller exists, and even after a later apply() call - so a
    // freshly-created one would otherwise sit untransformed while
    // canvasSelector is already zoomed/panned. Watching canvasSelector's
    // parent for it to appear and re-syncing then keeps it correct without
    // FA.js having to know when that element gets created. Attaching this
    // lazily from apply() (rather than at creation time) matters because
    // canvasSelector itself may not exist yet when createZoomPan runs.
    function ensureAlsoTransformObserver() {
      if (alsoTransformObserverAttached || !options.alsoTransform) return;
      var transformParent = $(canvasSelector).parent()[0];
      if (transformParent && window.MutationObserver) {
        new MutationObserver(apply).observe(transformParent, { childList: true });
        alsoTransformObserverAttached = true;
      }
    }

    function apply() {
      ensureAlsoTransformObserver();
      var transform = 'translate(' + state.panX + 'px,' + state.panY + 'px) scale(' + state.zoom + ')';
      $(canvasSelector).css({ transform: transform, transformOrigin: '0 0' });
      if (options.alsoTransform) {
        $(options.alsoTransform).css({ transform: transform, transformOrigin: '0 0' });
      }
    }

    // The canvas element's own border is part of what gets scaled, so a
    // local (child) coordinate has to be measured inside that border.
    function borderWidth() {
      return parseFloat($(canvasSelector).css('border-left-width')) || 0;
    }

    function screenToLocal(pageX, pageY) {
      // $(canvasSelector).offset() already reflects the current pan (the
      // transform-origin corner doesn't move under scale alone), so no
      // separate pan bookkeeping is needed here.
      var graphOffset = $(canvasSelector).offset();
      return {
        x: (pageX - graphOffset.left) / state.zoom - borderWidth(),
        y: (pageY - graphOffset.top) / state.zoom - borderWidth()
      };
    }

    // Converts a page coordinate into the coordinate system the edges'
    // drawing surface (e.g. Raphael/SVG, via alsoTransform) expects. That
    // surface is a sibling of canvasSelector (not a child), untransformed
    // and positioned flush with their shared, untransformed parent - unlike
    // canvasSelector itself, which can carry its own margin. The surface is
    // also created lazily (e.g. on the first edge ever drawn), so this
    // can't read its offset() directly; instead it derives the surface's
    // static position from the shared parent (always present) plus the
    // current pan, which is equivalent once the surface exists.
    function screenToDrawingLocal(pageX, pageY) {
      var parentOffset = $(canvasSelector).parent().offset();
      return {
        x: (pageX - parentOffset.left - state.panX) / state.zoom,
        y: (pageY - parentOffset.top - state.panY) / state.zoom
      };
    }

    function setZoom(newZoom, aroundPageX, aroundPageY) {
      newZoom = Math.min(maxZoom, Math.max(minZoom, newZoom));
      if (typeof aroundPageX === 'number') {
        // Keep the local point under (aroundPageX, aroundPageY) visually
        // fixed across the zoom change (standard "zoom to cursor").
        var graphOffset = $(canvasSelector).offset();
        var localBefore = screenToLocal(aroundPageX, aroundPageY);
        state.zoom = newZoom;
        // graphOffset.left/top = jsavcanvasOffset + jsavgraph's own local
        // position + panX/panY (unaffected by scale - see screenToLocal).
        // Solve for the new pan that keeps localBefore under the cursor.
        var fixedScreenX = aroundPageX - (graphOffset.left - state.panX);
        var fixedScreenY = aroundPageY - (graphOffset.top - state.panY);
        state.panX = fixedScreenX - (localBefore.x + borderWidth()) * newZoom;
        state.panY = fixedScreenY - (localBefore.y + borderWidth()) * newZoom;
      } else {
        state.zoom = newZoom;
      }
      apply();
    }

    function panBy(dx, dy) {
      state.panX += dx;
      state.panY += dy;
      apply();
    }

    function reset() {
      state.zoom = 1;
      state.panX = 0;
      state.panY = 0;
      apply();
    }

    return {
      getZoom: function () { return state.zoom; },
      setZoom: setZoom,
      panBy: panBy,
      reset: reset,
      screenToLocal: screenToLocal,
      screenToDrawingLocal: screenToDrawingLocal
    };
  }

  // Rubber-band (marquee) selection: draws a dashed rectangle overlay as
  // the user drags, in screen coordinates (correct regardless of any
  // zoom/pan transform elsewhere), and reports which elements it overlaps.
  function createRubberBandSelector(containerSelector) {
    var $rect = null;

    function start() {
      $rect = $('<div class="jsav-selection-rect"></div>').appendTo(containerSelector);
    }

    // x1,y1,x2,y2 are page coordinates (e.g. straight from a mouse event).
    // Returns the resulting rectangle, also in page coordinates.
    function update(x1, y1, x2, y2) {
      var left = Math.min(x1, x2), top = Math.min(y1, y2),
        width = Math.abs(x2 - x1), height = Math.abs(y2 - y1),
        containerOffset = $(containerSelector).offset();
      $rect.css({
        left: (left - containerOffset.left) + 'px',
        top: (top - containerOffset.top) + 'px',
        width: width + 'px',
        height: height + 'px'
      });
      return { left: left, top: top, right: left + width, bottom: top + height };
    }

    function end() {
      if ($rect) { $rect.remove(); $rect = null; }
    }

    // Returns the subset of $elements (a jQuery collection) whose rendered
    // bounding box intersects the given page-coordinate rectangle.
    function elementsWithin(rectBounds, $elements) {
      var matches = [];
      $elements.each(function () {
        var r = this.getBoundingClientRect(),
          pageR = {
            left: r.left + window.scrollX, top: r.top + window.scrollY,
            right: r.right + window.scrollX, bottom: r.bottom + window.scrollY
          },
          intersects = !(pageR.right < rectBounds.left || pageR.left > rectBounds.right ||
            pageR.bottom < rectBounds.top || pageR.top > rectBounds.bottom);
        if (intersects) { matches.push(this); }
      });
      return matches;
    }

    return { start: start, update: update, end: end, elementsWithin: elementsWithin };
  }

  // Given an array of node rects ({left, top, width, height}, in the same
  // local units as node positions - zoom-independent), returns new
  // {left, top} positions with the whole layout flipped/rotated/rescaled
  // as one rigid group operation around the group's own bounding box.
  // transformName is one of 'flipHorizontal', 'flipVertical', 'rotate90',
  // 'fillScreen' (which also needs targetSize: {width, height} to fit into).
  // Pure geometry - the caller applies the returned positions and re-runs
  // whatever edge/label layout its graph needs afterward.
  function transformNodeRects(rects, transformName, targetSize) {
    if (rects.length === 0) { return []; }
    var minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity, i;
    for (i = 0; i < rects.length; i++) {
      minX = Math.min(minX, rects[i].left);
      minY = Math.min(minY, rects[i].top);
      maxX = Math.max(maxX, rects[i].left + rects[i].width);
      maxY = Math.max(maxY, rects[i].top + rects[i].height);
    }
    var centerX = (minX + maxX) / 2,
      centerY = (minY + maxY) / 2,
      boxWidth = maxX - minX,
      boxHeight = maxY - minY,
      scale = 1, targetCenterX = centerX, targetCenterY = centerY;
    if (transformName === 'fillScreen' && boxWidth > 0 && boxHeight > 0) {
      var margin = 20,
        availWidth = Math.max(targetSize.width - 2 * margin, 1),
        availHeight = Math.max(targetSize.height - 2 * margin, 1);
      scale = Math.min(availWidth / boxWidth, availHeight / boxHeight);
      targetCenterX = targetSize.width / 2;
      targetCenterY = targetSize.height / 2;
    }
    return rects.map(function (r) {
      var cx = r.left + r.width / 2,
        cy = r.top + r.height / 2,
        newCx = cx, newCy = cy;
      if (transformName === 'flipHorizontal') {
        newCx = 2 * centerX - cx;
      } else if (transformName === 'flipVertical') {
        newCy = 2 * centerY - cy;
      } else if (transformName === 'rotate90') {
        // 90deg clockwise around the group's own center
        newCx = centerX - (cy - centerY);
        newCy = centerY + (cx - centerX);
      } else if (transformName === 'fillScreen') {
        newCx = targetCenterX + (cx - centerX) * scale;
        newCy = targetCenterY + (cy - centerY) * scale;
      }
      return { left: newCx - r.width / 2, top: newCy - r.height / 2 };
    });
  }

  return {
    removeModeClasses: removeModeClasses,
    cancel: cancel,
    resetUndoButtons: resetUndoButtons,
    highlightSelectButton: highlightSelectButton,
    getTranslateY: getTranslateY,
    avoidOverFlow: avoidOverFlow,
    saveCanvasAsImage: saveCanvasAsImage,
    applyLayout: applyLayout,
    dispatchModeClick: dispatchModeClick,
    closeContextMenuIfOpen: closeContextMenuIfOpen,
    enterMode: enterMode,
    registerKeybindings: registerKeybindings,
    clickButtonUnlessDisabled: clickButtonUnlessDisabled,
    rebindClickHandlers: rebindClickHandlers,
    createZoomPan: createZoomPan,
    createRubberBandSelector: createRubberBandSelector,
    transformNodeRects: transformNodeRects
  };
})(jQuery);
