(function ($) {
  "use strict";

  var jsav = new JSAV("av");

  // One independent FA instance with its own mode state and click wiring.
  // Deliberately minimal (click-click edges via prompt()) - this page is a
  // demo/utility tool, not the full editor.
  function createMachine(canvasSelector, toolbarSelector) {
    var g = jsav.ds.FA({ width: '100%', height: 340, layout: 'manual', editable: true, element: $(canvasSelector) });
    var mode = 'addNode';
    var pendingEdgeSource = null;

    function clearPending() {
      if (pendingEdgeSource) { pendingEdgeSource.unhighlight(); }
      pendingEdgeSource = null;
    }

    function onNodeClick(node) {
      if (mode === 'addEdge') {
        if (!pendingEdgeSource) {
          pendingEdgeSource = node;
          node.highlight();
          return;
        }
        var source = pendingEdgeSource;
        var symbol = prompt('Transition symbol?');
        clearPending();
        if (!symbol) { return; }
        var existing = g.hasEdge(source, node) ? g.getEdge(source, node) : null;
        if (existing) {
          existing.weight(existing.weight() + '<br>' + symbol);
          existing.layout();
        } else {
          var edge = g.addEdge(source, node, { weight: symbol });
          if (edge) { edge.layout(); }
        }
      } else if (mode === 'setInitial') {
        g.makeInitial(node);
      } else if (mode === 'toggleFinal') {
        node.hasClass('final') ? node.removeClass('final') : node.addClass('final');
      }
    }

    $(canvasSelector).on('click', function (e) {
      var $node = $(e.target).closest('.jsavnode');
      if ($node.length) {
        onNodeClick($node.data('node'));
        return;
      }
      if (mode !== 'addNode') { return; }
      var offset = $(canvasSelector).offset();
      var left = e.pageX - offset.left, top = e.pageY - offset.top;
      var node = g.addNode();
      node.element.css({ left: left - node.element.outerWidth() / 2, top: top - node.element.outerHeight() / 2 });
      if (!g.initial) { g.makeInitial(node); }
    });

    $(toolbarSelector + ' .mode').click(function () {
      $(toolbarSelector + ' .mode').removeClass('active');
      $(this).addClass('active');
      mode = $(this).data('mode');
      clearPending();
    });

    $(toolbarSelector + ' .clearButton').click(function () {
      clearPending();
      $(canvasSelector).empty();
      g = jsav.ds.FA({ width: '100%', height: 340, layout: 'manual', editable: true, element: $(canvasSelector) });
    });

    return {
      get automaton() { return g; },
      loadFromData: function (source) {
        clearPending();
        $(canvasSelector).empty();
        g = jsav.ds.FA({ width: '100%', height: 340, layout: 'manual', editable: true, element: $(canvasSelector) });
        g.initFromParsedJSONSource(source, 1);
      },
      loadExample: function (which) {
        clearPending();
        $(canvasSelector).empty();
        g = jsav.ds.FA({ width: '100%', height: 340, layout: 'manual', editable: true, element: $(canvasSelector) });
        if (which === 'redundant') {
          var r0 = g.addNode(), r1 = g.addNode(), r2 = g.addNode();
          r0.element.css({ left: 40, top: 140 });
          r1.element.css({ left: 220, top: 60 });
          r2.element.css({ left: 400, top: 140 });
          g.makeInitial(r0);
          r2.addClass('final');
          [[r0, r1, '0'], [r0, r2, '1'], [r1, r1, '0'], [r1, r2, '1'], [r2, r2, '0<br>1']].forEach(function (t) {
            var edge = g.addEdge(t[0], t[1], { weight: t[2] });
            if (edge) { edge.layout(); }
          });
        } else {
          var q0 = g.addNode(), q1 = g.addNode();
          q0.element.css({ left: 80, top: 100 });
          q1.element.css({ left: 300, top: 100 });
          g.makeInitial(q0);
          q1.addClass('final');
          [[q0, q0, '0'], [q0, q1, '1'], [q1, q1, '0<br>1']].forEach(function (t) {
            var edge = g.addEdge(t[0], t[1], { weight: t[2] });
            if (edge) { edge.layout(); }
          });
        }
      }
    };
  }

  var machineA = createMachine('#canvasA', '.toolbar[data-target="A"]');
  var machineB = createMachine('#canvasB', '.toolbar[data-target="B"]');

  // Picks up the automaton sent from the FA editor's "Check DFAs
  // Equivalence" button (see FA.js), same handoff pattern minDFA.js uses.
  if (localStorage['checkEquivalence'] == 'true') {
    localStorage['checkEquivalence'] = false;
    machineA.loadFromData(JSON.parse(localStorage['toCompare']));
  }

  $('.toolbar[data-target="A"] .exampleButton').click(function () { machineA.loadExample('redundant'); });
  $('.toolbar[data-target="B"] .exampleButton').click(function () { machineB.loadExample('clean'); });

  $('#compareButton').click(function () {
    var result = window.FiniteAutomaton.checkEquivalence(machineA.automaton, machineB.automaton);
    var $msg = $('#resultMessage');
    if (result.error) {
      $msg.attr('class', 'bad').text(result.error);
    } else if (result.equivalent) {
      $msg.attr('class', 'good').text('Equivalent - both machines accept the same language.');
    } else {
      $msg.attr('class', 'bad').text('Not equivalent - these machines accept different languages.');
    }
  });
}(jQuery));
