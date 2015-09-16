(function($) {
  "use strict";

  // Click handler for pointer
  JSAV._types.Pointer.prototype.click = function(fn) {
    var pointer = this;
    this.element.click(function() {
      fn(pointer)
    });
  };

}(jQuery));
