/*
   Native replacement for the Bootstrap 3 dropdown plugin used by the OpenFLAP
   menu bars. Works with the existing markup:
     <div class="dropdown">
       <button type="button" data-toggle="dropdown">File <span class="caret"></span></button>
       <ul class="dropdown-menu">...</ul>
     </div>
   Clicking a toggle opens its menu (closing any other); clicking anywhere else,
   choosing an item, or pressing Escape closes it. Styles are in css/dropdown.css.
 */
(function () {
  "use strict";

  var TOGGLE = '[data-toggle="dropdown"]';

  function closeMenus(except) {
    document.querySelectorAll('.dropdown.open').forEach(function (dropdown) {
      if (dropdown !== except) {
        dropdown.classList.remove('open');
        var toggle = dropdown.querySelector(TOGGLE);
        if (toggle) {
          toggle.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  function init() {
    document.querySelectorAll(TOGGLE).forEach(function (toggle) {
      toggle.setAttribute('aria-haspopup', 'true');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Delegated so menus added after page load also work.
  document.addEventListener('click', function (e) {
    var toggle = e.target.closest(TOGGLE);
    if (toggle) {
      var dropdown = toggle.closest('.dropdown');
      closeMenus(dropdown);
      var isOpen = dropdown.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      return;
    }
    // Any other click (including on a menu item) closes open menus.
    closeMenus();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMenus();
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
