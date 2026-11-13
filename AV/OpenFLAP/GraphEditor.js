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

  // Reads every node's current position/size (raw CSS, independent of any
  // zoom transform - see createZoomPan's screenToLocal comments for why
  // that distinction matters), as parallel arrays so the rects can be
  // handed to transformNodeRects and the results matched back up to their
  // node by array index.
  function getNodeRects(g) {
    var nodeList = [], rects = [], nodes = g.nodes();
    for (var node = nodes.next(); node; node = nodes.next()) {
      nodeList.push(node);
      rects.push({
        left: parseFloat(node.element.css('left')) || 0,
        top: parseFloat(node.element.css('top')) || 0,
        width: node.element.outerWidth(),
        height: node.element.outerHeight()
      });
    }
    return { nodes: nodeList, rects: rects };
  }

  // Wires the View menu's layout items (any that exist on the page) to the
  // layout algorithms and rigid transforms, plus Save/Restore Layout.
  // options: {
  //   jsav,
  //   getGraph: function() returning the current graph (editors replace
  //     their graph on load, so it's looked up at click time),
  //   removeModeClassesFn, removeTestHighlightsFn: each editor's own
  // }
  function attachLayoutMenu(options) {
    var jsav = options.jsav, getGraph = options.getGraph;
    function run(algorithmFn) {
      applyLayout(getGraph(), algorithmFn, options.removeModeClassesFn, options.removeTestHighlightsFn);
    }

    // Applies a rigid group transform (flip/rotate/fill-screen) to every
    // node's position at once. One undo step for the whole operation.
    function transformLayout(transformName) {
      var g = getGraph();
      g.saveFAState();
      var nodeRects = getNodeRects(g),
        targetSize = { width: g.element.width(), height: g.element.height() },
        newPositions = transformNodeRects(nodeRects.rects, transformName, targetSize);
      for (var i = 0; i < nodeRects.nodes.length; i++) {
        nodeRects.nodes[i].element.css({ left: newPositions[i].left, top: newPositions[i].top });
        nodeRects.nodes[i].stateLabelPositionUpdate();
      }
      g.updateEdgePositions();
    }

    // Bookmarks the current node positions (keyed by each node's own stable
    // id, not its editable state name) so they can be restored later even if
    // labels/structure change in the meantime - narrower than the regular
    // undo stack, which would also revert those other edits.
    var layoutSnapshot = null;
    function saveLayout() {
      layoutSnapshot = {};
      var nodes = getGraph().nodes();
      for (var node = nodes.next(); node; node = nodes.next()) {
        layoutSnapshot[node.id()] = {
          left: parseFloat(node.element.css('left')) || 0,
          top: parseFloat(node.element.css('top')) || 0
        };
      }
      jsav.umsg('Layout saved.');
    }
    function restoreLayout() {
      if (!layoutSnapshot) {
        jsav.umsg('No saved layout yet.');
        return;
      }
      var g = getGraph();
      g.saveFAState();
      var nodes = g.nodes();
      for (var node = nodes.next(); node; node = nodes.next()) {
        var pos = layoutSnapshot[node.id()];
        if (pos) {
          node.element.css({ left: pos.left, top: pos.top });
          node.stateLabelPositionUpdate();
        }
      }
      g.updateEdgePositions();
      jsav.umsg('Layout restored.');
    }

    var algorithms = {
      '#layoutButton': function(g) { g.layout(); },
      '#circleButton': function(g) { g.circleLayoutAlg(); },
      '#gemButton': function(g) { g.gemLayoutAlg(); },
      '#spiralButton': function(g) { g.spiralLayoutAlg(); },
      '#treeDegreeButton': function(g) { g.treeLayoutAlg(false); },
      '#treeHieButton': function(g) { g.treeLayoutAlg(true); },
      '#twoCircleButton': function(g) { g.twoCircleLayoutAlg(); },
      '#randomButton': function(g) { g.randomLayoutAlg(); }
    };
    Object.keys(algorithms).forEach(function(selector) {
      $(selector).click(function() { run(algorithms[selector]); });
    });
    ['flipHorizontal', 'flipVertical', 'rotate90', 'fillScreen'].forEach(function(name) {
      $('#' + name + 'Button').click(function() { run(function() { transformLayout(name); }); });
    });
    $('#saveLayoutButton').click(saveLayout);
    $('#restoreLayoutButton').click(restoreLayout);
  }

  // Wires the zoom toolbar (#zoomInButton, #zoomOutButton, #zoomResetButton,
  // #zoomLevelDisplay) and scroll-wheel zoom on .jsavcanvas to a controller
  // from createZoomPan.
  function attachZoomControls(zoomPan) {
    function updateZoomDisplay() {
      $('#zoomLevelDisplay').text(Math.round(zoomPan.getZoom() * 100) + '%');
    }
    function zoomAroundCanvasCenter(factor) {
      var canvasOffset = $('.jsavcanvas').offset();
      zoomPan.setZoom(zoomPan.getZoom() * factor,
        canvasOffset.left + $('.jsavcanvas').width() / 2,
        canvasOffset.top + $('.jsavcanvas').height() / 2);
      updateZoomDisplay();
    }
    $('#zoomInButton').click(function() { zoomAroundCanvasCenter(1.2); });
    $('#zoomOutButton').click(function() { zoomAroundCanvasCenter(1 / 1.2); });
    $('#zoomResetButton').click(function() { zoomPan.reset(); updateZoomDisplay(); });

    // Scroll/trackpad wheel zooms, centered on the cursor. Bound natively
    // (not via jQuery) with { passive: false } so preventDefault() reliably
    // stops the page itself from scrolling.
    var zoomCanvasEl = document.querySelector('.jsavcanvas');
    if (zoomCanvasEl) {
      zoomCanvasEl.addEventListener('wheel', function(e) {
        e.preventDefault();
        zoomPan.setZoom(zoomPan.getZoom() * (e.deltaY > 0 ? 0.9 : 1.1), e.pageX, e.pageY);
        updateZoomDisplay();
      }, { passive: false });
    }
  }

  // Starting a drag on empty canvas background (not on a node/edge/label)
  // either pans the view, or - in "Edit Nodes" mode specifically - draws a
  // rubber-band selection rectangle instead. Bound to .jsavcanvas (the
  // stable viewport, not .jsavgraph) since editors repeatedly clear/rebind
  // .jsavgraph's own mousedown/mousemove/mouseup for edge-drawing.
  // g.selectedNodes holds the current rubber-band selection (separate from
  // g.selected, the single-node reference used by edit/delete click
  // handling, which stays untouched).
  // options: { zoomPan, getGraph, allowPan (default true) }
  // Returns { consumeSuppressedClick, clearSelection }: the editor's canvas
  // click handler should return early when consumeSuppressedClick() is true,
  // since that click just ended a pan/selection drag rather than being a
  // real click.
  function attachPanAndSelect(options) {
    var zoomPan = options.zoomPan, getGraph = options.getGraph,
      allowPan = options.allowPan !== false;
    var suppressNextClick = false;
    var panning = false, panStartX, panStartY, panMoved = false;
    var selecting = false, selectStartX, selectStartY, selectMoved = false;
    var DRAG_THRESHOLD = 4; // px of movement before this counts as a drag, not a click
    var rubberBand = createRubberBandSelector('.jsavcanvas');

    function clearSelection() {
      var g = getGraph();
      if (g.selectedNodes) {
        for (var i = 0; i < g.selectedNodes.length; i++) { g.selectedNodes[i].unhighlight(); }
      }
      g.selectedNodes = [];
    }
    function setSelectedNodes(nodes) {
      clearSelection();
      getGraph().selectedNodes = nodes;
      for (var i = 0; i < nodes.length; i++) { nodes[i].highlight(); }
    }

    $('.jsavcanvas').on('mousedown', function(e) {
      if ($(e.target).closest('.jsavnode, .jsavedge, .jsavedgelabel, .jsavgraphnode').length) { return; }
      if ($('.jsavgraph').hasClass('editNodes')) {
        selecting = true;
        selectMoved = false;
        selectStartX = e.pageX;
        selectStartY = e.pageY;
        rubberBand.start();
      } else if (allowPan) {
        panning = true;
        panMoved = false;
        panStartX = e.pageX;
        panStartY = e.pageY;
      }
    });
    $(document).on('mousemove', function(e) {
      if (panning) {
        var dx = e.pageX - panStartX, dy = e.pageY - panStartY;
        if (!panMoved && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) { return; }
        panMoved = true;
        zoomPan.panBy(dx, dy);
        panStartX = e.pageX;
        panStartY = e.pageY;
      } else if (selecting) {
        var dx2 = e.pageX - selectStartX, dy2 = e.pageY - selectStartY;
        if (!selectMoved && Math.abs(dx2) < DRAG_THRESHOLD && Math.abs(dy2) < DRAG_THRESHOLD) { return; }
        selectMoved = true;
        rubberBand.update(selectStartX, selectStartY, e.pageX, e.pageY);
      }
    });
    $(document).on('mouseup', function(e) {
      if (panning) {
        if (panMoved) { suppressNextClick = true; }
        panning = false;
      } else if (selecting) {
        if (selectMoved) {
          var bounds = rubberBand.update(selectStartX, selectStartY, e.pageX, e.pageY);
          var matched = rubberBand.elementsWithin(bounds, $('.jsavgraphnode'));
          setSelectedNodes(matched.map(function(el) { return $(el).data('node'); }).filter(Boolean));
          suppressNextClick = true;
        } else {
          clearSelection();
        }
        rubberBand.end();
        selecting = false;
      }
    });

    return {
      consumeSuppressedClick: function() {
        if (suppressNextClick) { suppressNextClick = false; return true; }
        return false;
      },
      clearSelection: clearSelection
    };
  }

  // The state-name label (.jsavvaluelabel) under a mouse event, or null.
  // Looks through whatever is on top - on exercise pages JSAV's "shutter"
  // overlay covers the canvas while the drag's highlight animation plays,
  // so the event's own target is the shutter, not the state.
  function stateLabelAtPointer(e) {
    var els = document.elementsFromPoint(e.clientX, e.clientY);
    for (var i = 0; i < els.length; i++) {
      if ($(els[i]).hasClass('jsavvaluelabel')) { return els[i]; }
    }
    return null;
  }

  // Wires the mouse handlers for drawing a new transition. Move/up are
  // listened for on the whole document (not just .jsavgraph) because the
  // shutter overlay mentioned above swallows them on exercise pages.
  function bindTransitionDrag(mouseDown, mouseMove, mouseUp) {
    $('.jsavgraph').off('mousedown').mousedown(mouseDown);
    $('.jsavgraph').off('mousemove').off('mouseup');
    $(document).off('mousemove.transitionDrag').on('mousemove.transitionDrag', mouseMove);
    $(document).off('mouseup.transitionDrag').on('mouseup.transitionDrag', mouseUp);
  }

  // Page-coordinate center of a node as drawn (accounts for zoom/pan).
  function nodeScreenCenter(node) {
    var r = node.element[0].getBoundingClientRect();
    return { x: r.left + window.scrollX + r.width / 2, y: r.top + window.scrollY + r.height / 2 };
  }

  // Shared PDA/TM transition editor: the #edge box for adding a transition and the #editEdge table for editing an arrow's transitions.
  // The config supplies the machine-specific parts: field ids, what a blank field means (emptySymbol), and how fields join into a label (formatWeight).
  function createTransitionEditor(config) {
    var getGraph = config.getGraph,
      emptySymbol = config.emptySymbol,
      parseWeight = config.parseWeight || function(line) { return toColonForm(line).split(':'); },
      deleteLastRowCommits = config.deleteLastRowCommits !== false,
      pending = null,        // { from, to } while the add box is open
      editingLabel = null;   // the label element while the edit table is open

    function valueOrEmpty(v) { return (v === '' || v === undefined || v === null) ? emptySymbol : v; }

    // --- Add box (#edge) ---

    function openAddBox(from, to) {
      var g = getGraph(), edgeInput = $('#edge');
      var rows = $('#edge > table > tr');
      for (var i = 1; i < rows.length; i++) {
        rows[i].remove();
      }
      config.addFields.forEach(function(id, k) {
        var def = config.addDefaults ? config.addDefaults[k] : emptySymbol;
        if (def !== null && def !== undefined) { edgeInput.find('#' + id).val(def); }
      });
      edgeInput.show();
      // Centered above the midpoint between the two states, measured from the
      // states themselves so it works at any zoom and for a single-click self-loop.
      var a = nodeScreenCenter(from), b = nodeScreenCenter(to);
      edgeInput.offset({
        left: (a.x + b.x) / 2 - edgeInput.outerWidth() / 2,
        top: (a.y + b.y) / 2 - 14
      });
      $('path[opacity="1.5"]').remove();  // the drag's preview line
      pending = { from: from, to: to };
      g.first = null;
      edgeInput.find('#' + config.addFields[0]).focus();
      // One namespaced handler, replaced (not stacked) each time the box opens.
      $(document).off('keyup.transitionAdd').on('keyup.transitionAdd', function(e) {
        if (e.keyCode == 13) { commitAdd(); }
        else if (e.keyCode == 27) { closeAddBox(); }
      });
    }

    function commitAdd() {
      if (!pending) { return; }
      var g = getGraph(), edgeInput = $('#edge');
      var values = config.addFields.map(function(id) { return valueOrEmpty(edgeInput.find('#' + id).val()); });
      g.saveFAState();
      g.addEdge(pending.from, pending.to, { weight: config.formatWeight(values) });
      $('.jsavedgelabel').off('click').click(config.labelClickHandler);
      g.updateEdgePositions();
      closeAddBox();
    }

    // Closes the add box without adding anything.
    function closeAddBox() {
      $(document).off('keyup.transitionAdd');
      $('#edge').hide();
      $('path[opacity="1.5"]').remove();
      if (pending) {
        pending.from.unhighlight();
        pending.to.unhighlight();
        pending = null;
      }
      var g = getGraph();
      if (g) { g.selected = null; }
    }

    // --- Edit table (#editEdge) ---

    function openEditTable(label) {
      var g = getGraph();
      var weights = $(label).html().split("<br>");
      // In delete mode, clicking a single-transition label removes it outright.
      if (weights.length == 1 && g.hasClass(config.deleteModeClass)) {
        g.saveFAState();
        $(label).html("");
        g.layout({ layout: 'manual' });
        g.updateEdgePositions();
        return;
      }
      var tbody = $('#editEdge > table > tbody');
      var rows = tbody.find('tr');
      for (var i = rows.length - 1; i > 0; i--) {
        rows[i].remove();
      }
      var row = $(rows[0]);
      for (var w = 0; w < weights.length; w++) {
        var values = parseWeight(weights[w]);
        if (w >= tbody.find('tr').length) {
          tbody.append(row.clone());
        }
        var lastRow = tbody.find('tr').last();
        config.editFields.forEach(function(id, k) { lastRow.find('#' + id).val(values[k]); });
        lastRow.find('#deleteEdge').text("Delete").off('click').on('click', deleteRow);
      }
      tbody.attr({ remove: false });
      editingLabel = label;
      var editEdgeInput = $('#editEdge');
      editEdgeInput.css({ left: $(label).offset().left, top: $(label).offset().top });
      editEdgeInput.show();
      tbody.find('tr').first().find('#' + config.editFields[0]).focus();
      $(document).off('keyup.transitionEdit').on('keyup.transitionEdit', function(e) {
        if (e.keyCode == 13) { commitEdit(label); }
        else if (e.keyCode == 27) { closeEditTable(); config.onEditCancel(); }
      });
    }

    // Click handler for a row's Delete button.
    function deleteRow() {
      var tbody = $(this).closest('tbody');
      if (tbody.children().length == 1) {
        tbody.attr({ remove: 'true' });
        if (deleteLastRowCommits) {
          commitEdit(editingLabel);
        } else {
          $(this).text("Deleted");
        }
        return;
      }
      $(this).closest('tr').remove();
    }

    function commitEdit(label) {
      var g = getGraph(), editEdgeInput = $('#editEdge');
      var tbody = editEdgeInput.find('tbody');
      var newWeight = "";
      if (tbody.attr('remove') != 'true') {
        var weights = [];
        tbody.find('tr').each(function() {
          var r = $(this);
          weights.push(config.formatWeight(config.editFields.map(function(id) { return valueOrEmpty(r.find('#' + id).val()); })));
        });
        newWeight = weights.join("<br>");
      }
      $(label).html(newWeight);
      g.saveFAState();
      g.layout({ layout: 'manual' });
      g.updateEdgePositions();
      closeEditTable();
      g.updateAlphabet();
    }

    function closeEditTable() {
      $(document).off('keyup.transitionEdit');
      $('#editEdge').hide();
      editingLabel = null;
    }

    // --- Making edges easier to click while editing ---

    function addEdgeSelect() {
      var edges = getGraph().edges();
      for (var next = edges.next(); next; next = edges.next()) {
        next.addClass('edgeSelect');
        next.layout();
      }
    }
    function removeEdgeSelect() {
      var edges = getGraph().edges();
      for (var next = edges.next(); next; next = edges.next()) {
        if (next.hasClass('edgeSelect')) {
          next.removeClass('edgeSelect');
          next.layout();
        }
      }
    }
    function removeLabelMenu() {
      $('#editedgelabel').remove();
    }

    return {
      openAddBox: openAddBox,
      commitAdd: commitAdd,
      closeAddBox: closeAddBox,
      openEditTable: openEditTable,
      commitEdit: commitEdit,
      closeEditTable: closeEditTable,
      // Closes both boxes without saving - for the editor's cancel.
      closeAll: function() { closeAddBox(); closeEditTable(); },
      addEdgeSelect: addEdgeSelect,
      removeEdgeSelect: removeEdgeSelect,
      removeLabelMenu: removeLabelMenu
    };
  }

  // Fast Run dialog (JFLAP's Input > Fast Run): type a string, see whether it is accepted and
  // the path of configurations that accepts it, then "Keep looking" for other accepting paths.
  // The search itself is Automaton.createRunSearch with the machine's own fastRunRules.
  // options: { buttonSelector, getGraph }
  function attachFastRun(options) {
    $(options.buttonSelector).click(function (e) {
      e.preventDefault();
      if (!options.getGraph().initial) {
        window.alert("Fast Run needs an initial state.");
        return;
      }
      openFastRun(options.getGraph);
    });
  }

  function ensureFastRunDialog() {
    if ($('#fastRunOverlay').length) { return; }
    $('<style id="fastRunStyles">' +
      '#fastRunOverlay{position:fixed;inset:0;z-index:2000;background:rgba(0,0,0,.35);display:none}' +
      '#fastRunBox{position:absolute;top:80px;left:50%;transform:translateX(-50%);width:420px;max-width:calc(100% - 32px);background:#fff;border:1px solid #888;border-radius:4px;box-shadow:0 4px 16px rgba(0,0,0,.3);font:14px Arial,sans-serif}' +
      '#fastRunBox .fr-head{display:flex;justify-content:space-between;align-items:center;padding:8px 12px;background:#eee;border-bottom:1px solid #ccc;font-weight:bold}' +
      '#fastRunBox .fr-body{padding:12px}' +
      '#fastRunBox input{width:220px;margin:0 6px}' +
      '#fastRunResult{margin-top:12px}' +
      '#fastRunResult .fr-msg{font-weight:bold;margin-bottom:8px}' +
      '#fastRunResult .fr-accept{color:#1a7f37}#fastRunResult .fr-reject{color:#c62828}' +
      '#fastRunResult .fr-path{max-height:300px;overflow:auto;border:1px solid #ddd}' +
      '#fastRunResult table{width:100%;border-collapse:collapse;font-family:monospace}' +
      '#fastRunResult th,#fastRunResult td{padding:3px 8px;border-bottom:1px solid #eee;text-align:left}' +
      '#fastRunResult .fr-buttons{margin-top:10px;text-align:right}' +
      '#fastRunResult .fr-buttons button{margin-left:6px}' +
      '</style>').appendTo('head');
    $('<div id="fastRunOverlay"><div id="fastRunBox">' +
      '<div class="fr-head"><span>Fast Run</span><button type="button" class="fr-close" aria-label="Close">&times;</button></div>' +
      '<div class="fr-body"><label>Input:<input type="text" id="fastRunInput" autocomplete="off"></label>' +
      '<button type="button" id="fastRunGo">Run</button>' +
      '<div id="fastRunResult"></div></div></div></div>').appendTo('body');
    $('#fastRunOverlay').on('click', function (e) { if (e.target === this) { closeFastRun(); } });
    $('#fastRunBox .fr-close').on('click', closeFastRun);
    $('#fastRunOverlay').on('keydown', function (e) {
      e.stopPropagation(); // keep editor shortcuts (s, t, Delete, ...) out of the dialog
      if (e.key === 'Escape') { closeFastRun(); }
    });
  }

  function closeFastRun() {
    $('#fastRunOverlay').hide();
  }

  // getGraph is called on every run, since some editors replace their graph when a file is loaded.
  function openFastRun(getGraph) {
    ensureFastRunDialog();
    $('#fastRunResult').empty();
    $('#fastRunOverlay').show();
    $('#fastRunInput').off('keydown.fastRun').on('keydown.fastRun', function (e) {
      // preventDefault: otherwise this Enter also presses the Keep looking button that run() focuses.
      if (e.key === 'Enter') { e.preventDefault(); run(); }
    }).focus().select();
    $('#fastRunGo').off('click').on('click', run);

    function run() {
      var g = getGraph(), input = $('#fastRunInput').val();
      var rules = g.fastRunRules(input);
      showNext(g.createRunSearch(rules), rules.columns, input);
    }
  }

  function showNext(search, columns, input) {
    var r = search.next(), $result = $('#fastRunResult').empty();
    if (r.path) {
      $result.append($('<div class="fr-msg fr-accept">').text('Accepting configuration found for ' +
        (input === '' ? 'the empty string' : '"' + input + '"') + '!'));
      var $table = $('<table>'), $row = $('<tr>').append($('<th>').text('Step'));
      columns.forEach(function (c) { $row.append($('<th>').text(c)); });
      $table.append($row);
      r.path.forEach(function (cells, i) {
        var $tr = $('<tr>').append($('<td>').text(i));
        cells.forEach(function (c) { $tr.append($('<td>').text(c)); });
        $table.append($tr);
      });
      $result.append($('<div class="fr-path">').append($table));
      $result.append($('<div class="fr-buttons">')
        .append($('<button type="button" class="fr-keep">Keep looking</button>').on('click', function () { showNext(search, columns, input); }))
        .append($('<button type="button" class="fr-done">I\'m done</button>').on('click', closeFastRun)));
      $result.find('.fr-keep').focus();
    } else if (r.paused) {
      $result.append($('<div class="fr-msg">').text(search.generated + ' configurations have been generated. Keep going?'));
      $result.append($('<div class="fr-buttons">')
        .append($('<button type="button" class="fr-keep">Keep going</button>').on('click', function () { showNext(search, columns, input); }))
        .append($('<button type="button" class="fr-done">Stop</button>').on('click', function () {
          $('#fastRunResult').empty().append($('<div class="fr-msg">').text('Stopped after ' + search.generated + ' configurations' +
            (search.accepted ? ' (' + search.accepted + ' accepted).' : '; no accepting configuration found.')));
        })));
      $result.find('.fr-keep').focus();
    } else if (search.accepted === 0) {
      $result.append($('<div class="fr-msg fr-reject">').text(input === '' ? 'The empty string was rejected.' : 'The input "' + input + '" was rejected.'));
    } else {
      $result.append($('<div class="fr-msg">').text(search.accepted + ' configuration' + (search.accepted === 1 ? '' : 's') +
        ' accepted, and other possibilities are exhausted.'));
    }
  }

  return {
    attachFastRun: attachFastRun,
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
    transformNodeRects: transformNodeRects,
    getNodeRects: getNodeRects,
    attachLayoutMenu: attachLayoutMenu,
    attachZoomControls: attachZoomControls,
    attachPanAndSelect: attachPanAndSelect,
    nodeScreenCenter: nodeScreenCenter,
    stateLabelAtPointer: stateLabelAtPointer,
    bindTransitionDrag: bindTransitionDrag,
    createTransitionEditor: createTransitionEditor
  };
})(jQuery);
