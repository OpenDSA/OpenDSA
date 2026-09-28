/* Menu behavior for the standalone page; command handlers remain in grammarEditor.js. */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  const nav = document.querySelector('.grammar-menu');
  if (!nav) return;
  const groups = Array.from(nav.querySelectorAll('details'));
  const closeMenus = function (except) {
    groups.forEach(function (group) { if (group !== except) group.open = false; });
  };
  groups.forEach(function (group) {
    const summary = group.querySelector('summary');
    summary.addEventListener('click', function (event) {
      if (summary.getAttribute('aria-disabled') === 'true') { event.preventDefault(); return; }
      closeMenus(group);
    });
    group.addEventListener('keydown', function (event) {
      const commands = Array.from(group.querySelectorAll('button')).filter(function (button) {
        return button.getClientRects().length && !button.disabled;
      });
      if (event.key === 'Escape') { group.open = false; summary.focus(); event.preventDefault(); }
      if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && summary.getAttribute('aria-disabled') !== 'true') {
        event.preventDefault();
        if (!group.open) {
          group.open = true;
          closeMenus(group);
          const available = Array.from(group.querySelectorAll('button')).filter(b => b.getClientRects().length);
          if (available.length) available[event.key === 'ArrowDown' ? 0 : available.length - 1].focus();
        } else if (commands.length) {
          const index = commands.indexOf(document.activeElement);
          const next = event.key === 'ArrowDown' ? (index + 1) % commands.length : (index <= 0 ? commands.length - 1 : index - 1);
          commands[next].focus();
        }
      }
    });
  });
  nav.addEventListener('click', function (event) {
    const button = event.target.closest('button');
    if (button) {
      const group = button.closest('details');
      closeMenus();
      if (group) group.querySelector('summary').focus();
    }
  });
  document.addEventListener('click', function (event) { if (!nav.contains(event.target)) closeMenus(); });
  nav.addEventListener('focusout', function () {
    setTimeout(function () { if (!nav.contains(document.activeElement)) closeMenus(); }, 0);
  });
  document.getElementById('openGrammarFile').addEventListener('click', function () {
    document.getElementById('loadfile').click();
  });
  // Existing workflow handlers show/hide commands. Reflect that state in menu headings.
  const syncMenus = function () {
    const inWorkflow = getComputedStyle(document.getElementById('backbutton')).display !== 'none';
    const multiple = getComputedStyle(document.getElementById('exerciseLinks')).display !== 'none';
    document.getElementById('multipleButton').setAttribute('aria-pressed', String(multiple));
    document.getElementById('openGrammarFile').hidden = multiple;
    groups.forEach(function (group) {
      const isHelp = !!group.querySelector('#helpbutton');
      const enabled = isHelp || !inWorkflow;
      group.querySelector('summary').setAttribute('aria-disabled', String(!enabled));
      if (!enabled) group.open = false;
    });
  };
  new MutationObserver(syncMenus).observe(document.getElementById('container'), {
    subtree: true, attributes: true, attributeFilter: ['style']
  });
  syncMenus();
});
