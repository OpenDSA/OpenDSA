var ns = (function(exports) {
  var Raise = function constructor() {
    this._init_handler = function(func) {
      window.addEventListener('load', func);
    };
  };

  Raise.prototype.register = function(id) {
    var to_top = function(e) {
      var scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll_top > 0) {
        var diff = Math.max(scroll_top / 2, 20);
        window.scrollTo(0, scroll_top - diff);
        window.setTimeout(to_top, 25, e);
      }
    };

    this._init_handler(function() {
      var target = document.getElementById(id);
      target.addEventListener('click', to_top);
    });
  };

  exports.Raise = Raise;
  return exports;
})({});


var RAISE_BUTTONS_ID = 'raise-top';
var raiser = new ns.Raise();
raiser.register(RAISE_BUTTONS_ID);
