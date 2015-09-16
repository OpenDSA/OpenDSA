(function($) {
  "use strict";

  // Click handler for pointer
  JSAV._types.Pointer.prototype.click = function(fn) {
    var pointer = this;
    this.element.click(function() {
      fn(pointer)
    });
  };

  JSAV._types.ds.ListNode.prototype.llist_next = {};
  JSAV._types.ds.ListNode.prototype.llist_tail = {};
  JSAV._types.ds.ListNode.prototype.llist_edgeToNext = {};
  JSAV._types.ds.ListNode.prototype.llist_pleft = null;
  JSAV._types.ds.ListNode.prototype.llist_pright = null;

}(jQuery));
