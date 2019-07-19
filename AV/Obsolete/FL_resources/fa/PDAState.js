$(document).ready(function() {
  "use strict";
  if (typeof JSAV === "undefined") { return; }

  /*
  Class for vizualization of a current state in  a pda traversal
  Shows current stack, unreadinput, and the node it represents
  */
  function PDAState(jsav, x_coord, y_coord, rect_width, rect_height, input, stack, node) {
    
    this.jsav = jsav;
    this.x_coord = x_coord;
    this.y_coord = y_coord;
    this.rect_height = rect_height;
    this.rect_width = rect_width;
    this.input = input.split('');
    this.stack = stack

    this.outline = this.jsav.g.rect(this.x_coord, this.y_coord, this.rect_width, this.rect_height);
    this.stackViz = this.jsav.ds.stack(this.stack, this.x_coord + 5, this.y_coord + 5, this.rect_height - 5)
    this.inputViz = this.jsav.ds.stack(this.input, this.x_coord + 40, this.y_coord + 5,this.rect_width - 40, 'horizontal')
    this.nodeViz = this.jsav.g.circle(this.x_coord + 85, this.y_coord + 60, 15, {fill: 'yellow'})
    this.label = this.jsav.label(node, {left: this.x_coord + 75, top: this.y_coord + 35})
    this.label.css({"z-index": 999})
    //this.node  = this.jsav.ds.node(this.x_coord + 5, this.y_coord + 5)
  }

  // Add the Stack constructor to the public facing JSAV interface.
  JSAV.ext.ds.PDAState = function(x_coord, y_coord, rect_width, rect_height, input, stack, node, options) {
    return new PDAState(this, x_coord, y_coord, rect_width, rect_height, input, stack, node);
  };
  // JSAV.utils.extend(PDAState, JSAV._types.ds.AVArray);

  var PDAStateproto = PDAState.prototype

  PDAStateproto.hide = function() {
    this.outline.hide()
    this.stackViz.hide()
    this.inputViz.hide()
    this.nodeViz.hide()
    this.label.hide()
  }


}(jQuery));