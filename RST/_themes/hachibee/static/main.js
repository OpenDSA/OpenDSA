(function() {
  var RoleAdjuster;

  RoleAdjuster = (function(namespace) {
    var menuselection;
    menuselection = function() {
      var _create_menulabel;
      _create_menulabel = function(content) {
        var el;
        el = document.createElement('span');
        el.className = 'menu';
        el.textContent = content;
        return el;
      };
      return window.addEventListener('load', function() {
        var content, m, menu_elements, menu_text, menuselections, _i, _j, _len, _len1;
        menuselections = document.querySelectorAll('.menuselection');
        for (_i = 0, _len = menuselections.length; _i < _len; _i++) {
          menuselection = menuselections[_i];
          content = menuselection.textContent;
          menuselection.textContent = '';
          menu_elements = (function() {
            var _j, _len1, _ref, _results;
            _ref = content.split('‣');
            _results = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              menu_text = _ref[_j];
              _results.push(_create_menulabel(menu_text.replace(/^\s+|\s+$/g, "")));
            }
            return _results;
          })();
          for (_j = 0, _len1 = menu_elements.length; _j < _len1; _j++) {
            m = menu_elements[_j];
            menuselection.appendChild(m);
            menuselection.appendChild((function() {
              var el;
              el = document.createElement('span');
              el.className = 'menu-separator icon-rightarrow';
              return el;
            })());
          }
        }
      });
    };
    namespace.menuselection = menuselection;
    return namespace;
  })({});

  RoleAdjuster.menuselection();

}).call(this);

(function() {
  var ELEMENT_OF_HEADER, ELEMENT_OF_RAISETOP_BUTTON, ElementAdjuster, SELECTOR_OF_HEADER, SELECTOR_OF_RAISETOP_BUTTON;

  SELECTOR_OF_HEADER = '#top-header';

  ELEMENT_OF_HEADER = document.querySelector(SELECTOR_OF_HEADER);

  SELECTOR_OF_RAISETOP_BUTTON = '#raise-top';

  ELEMENT_OF_RAISETOP_BUTTON = document.querySelector(SELECTOR_OF_RAISETOP_BUTTON);

  ElementAdjuster = (function(namespace) {
    namespace.phantom_header = function() {
      var scroll_y;
      scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll_y <= 30) {
        return ELEMENT_OF_HEADER.className = "";
      } else {
        return ELEMENT_OF_HEADER.className = "modest";
      }
    };
    namespace.phantom_raise_top_button = function() {
      var raiser_style, scroll_y;
      scroll_y = document.documentElement.scrollTop || document.body.scrollTop;
      raiser_style = ELEMENT_OF_RAISETOP_BUTTON.style;
      if (scroll_y <= 30) {
        return raiser_style.bottom = "-70px";
      } else if (scroll_y <= 330) {
        return raiser_style.bottom = "" + (70 - (330 - scroll_y)) + "px";
      } else {
        return raiser_style.bottom = "70px";
      }
    };
    return namespace;
  })(ElementAdjuster || {});

  window.addEventListener('scroll', ElementAdjuster.phantom_header);

  window.addEventListener('scroll', ElementAdjuster.phantom_raise_top_button);

}).call(this);
