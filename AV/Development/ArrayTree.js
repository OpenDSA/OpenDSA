/**
 * Created by Elmer on 2/12/14.
 */

(function($) {
  if (typeof JSAV === "undefined") {
    console.log("JSAV object is undefined");
    return;
  }
  JSAV.ext.ds.arraytree = function(options) {
    console.log("Enter arraytree");
    return new ArrayTree(this, $.extend(true, {visible: true, autoresize: true}, options));
  };

  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
  var ArrayTree = function(jsav, options) {
    console.log("init function");
    this.init(jsav, options);
    console.log("add class");
    this.element.addClass("jsavarraytree")
  };
  JSAV.utils.extend(ArrayTree, jsav.ds.Tree);

  ArrayTree.prototype.newNode = function(value, parent, options) {
    return new ArrayTreeNode(this, value, parent, options);
  };

  var ArrayTreeNode = function(container, value, parent, options) {
    this.init(container, value, parent, options);
    this.element.addClass("jsavarraytreenode");
  };
  JSAV.utils.extend(ArrayTreeNode, jsav.ds.TreeNode);

  ArrayTreeNode.prototype.init = function (container, value, parent, options) {
    var el = this.options.nodeelement || $("<div><span class='jsavvalue'></span></div>");

    this._array = this.jsav.ds.array(value, {element: el.find(".jsavvalue")});
  }
  // --------------------------------------------------------------------------
  // --------------------------------------------------------------------------
}(jQuery));