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
    enterMode: enterMode
  };
})(jQuery);
