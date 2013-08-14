(function ($) {
	"use strict";

	/*
	*	AVL Extension for Binary Trees
	*
	*	This file adds the following functions for Binary Trees:
	*
	*	.insert()
	*	.getUnbalancedNode(last)
	*	.addEmptyNodes()
	*
	*	and the following functions for Binary Tree Nodes:
	*
	*	.addEmptyNodes()
	*	.balance()
	*	.rotateLeft()
	*	.rotateRight()
	*	.rotateLR()
	*	.rotateRL()
	*
	*/

	// inserts a value or array of values into the binary trees
	// by default duplicates go to the left side
	// this can be changed with option: {toRight: true}
	// returns the node if only a value was inserted, and the tree if an array was inserted
	JSAV._types.ds.BinaryTree.prototype.insert = function (value, options) {
        var opts = $.extend({toRight: false}, options);
        function toLeft(value, insertValue) {
            if (insertValue < value) {
                return true;
            } else if (value === insertValue && !opts.toRight) {
                return true;
            } else {
                return false;
            }
        }
        // helper function to recursively insert
        var ins = function(node, insval) {
          var val = node.value();
          if (!val || val === "jsavnull") { // no value in node
            return node.value(insval);
          } else if (toLeft(val, insval)) { // go left
            if (node.left()) {
              return ins(node.left(), insval);
            } else {
              return node.left(insval);
            }
          } else { // go right
            if (node.right()) {
              return ins(node.right(), insval);
            } else {
              return node.right(insval);
            }
          }
        };
        if ($.isArray(value)) { // array of values
          for (var i = 0, l = value.length; i < l; i++) {
            ins(this.root(), value[i]);
          }
        } else {
          return ins(this.root(), value);
        }
        return this;
    };

	// Finds an unbalanced node from the tree if there is one, otherwise it undefined will be returned
	// <last> should be the last inserted value or node
	JSAV._types.ds.BinaryTree.prototype.getUnbalancedNode = function (last) {
        var node = this.rootnode;
        if (last.constructor === JSAV._types.ds.BinaryTreeNode) {
        	last = last.value();
        }
        //find the last inserted node
        while (node.left() || node.right()) {
            if (node.value() >= last) {
                node = node.left();
            } else {
                node = node.right();
            }
        }
        //Check if tree is unbalanced
        while (node) {
            if (Math.abs(height(node.left()) - height(node.right())) >= 2) {
                return node;
            }
            node = node.parent();
        }
        return undefined;
    }

    //add empty nodes to all the nodes in the tree
    JSAV._types.ds.BinaryTree.prototype.addEmptyNodes = function() {
        this.rootnode.addEmptyNodes();
    }

    //add empty nodes to all the nodes under this node
    JSAV._types.ds.BinaryTreeNode.prototype.addEmptyNodes = function() {
        if (!this.left()) {
            this.left("").element.addClass("emptynode");
        } else if (!this.left().hasClass("emptynode")) {
            this.left().addEmptyNodes();
        }
        if (!this.right()) {
            this.right("").element.addClass("emptynode");
        } else if (!this.right().hasClass("emptynode")) {
            this.right().addEmptyNodes();
        }
    }

    //returns the height of the node and 0 if node is undefined/null
    function height(node) {
        if (node) {
            return node.height();
        }
        return 0;
    }

    // selects and performs a rotation on the node in attempt to balance the tree
    // this function should be called on the unbalanced node that you can get 
    JSAV._types.ds.BinaryTreeNode.prototype.balance = function () {
        if (height(this.left()) > height(this.right()) + 1) {
            if (height(this.left().left()) > height(this.left().right())) {
                this.rotateRight();
            } else {
                this.rotateLR();
            }
        } else if (height(this.right()) > height(this.left()) + 1) {
            if (height(this.right().left()) > height(this.right().right())) {
                this.rotateRL();
            } else {
                this.rotateLeft();
            }
        }
    }

    JSAV._types.ds.BinaryTreeNode.prototype.rotateLeft = function () {
        if (this.right().hasClass("emptynode"))
            return false;
        var lr;
        var parent = this.parent();
        var raisedNode;
        if (parent) {
            lr = parent.left() === this? 0: 1;
        }
        if (parent) {
            parent.child(lr, this.right().remove({hide: false}), {hide: false});
            raisedNode = parent.child(lr);
        } else {
            this.container.root(this.right().remove({hide: false}), {hide: false});
            raisedNode = this.container.root();
        }
        if (raisedNode.left())
            this.right(raisedNode.left().remove({hide: false}));
       raisedNode.left(this);
    }

    JSAV._types.ds.BinaryTreeNode.prototype.rotateRight = function () {
        if (this.left().hasClass("emptynode"))
            return false;
        var lr;
        var parent = this.parent();
        var raisedNode;
        if (parent) {
            lr = parent.left() === this? 0: 1;
        }
        if (parent) {
            parent.child(lr, this.left().remove({hide: false}), {hide: false});
            raisedNode = parent.child(lr);
        } else {
            this.container.root(this.left().remove({hide: false}), {hide: false});
            raisedNode = this.container.root();
        }
        if (raisedNode.right())
            this.left(raisedNode.right().remove({hide: false}));
       raisedNode.right(this);
    }

    JSAV._types.ds.BinaryTreeNode.prototype.rotateLR = function () {
        if (this.left().hasClass("emptynode") || this.left().right().hasClass("emptynode"))
            return false;
        var lr;
        var parent = this.parent();
        var raisedNode;
        if (parent) {
            lr = parent.left() === this? 0: 1;
        }
        if (parent) {
            parent.child(lr, this.left().right().remove({hide: false}), {hide: false});
            raisedNode = parent.child(lr);
        } else {
            this.container.root(this.left().right().remove({hide: false}), {hide: false});
            raisedNode = this.container.root();
        }
        if (raisedNode.left())
            this.left().right(raisedNode.left().remove({hide: false}));
        raisedNode.left(this.left().remove({hide: false}));
        if (raisedNode.right())
            this.left(raisedNode.right().remove({hide: false}));
        raisedNode.right(this);
    }

    JSAV._types.ds.BinaryTreeNode.prototype.rotateRL = function () {
        if (this.right().hasClass("emptynode") || this.right().left().hasClass("emptynode"))
            return false;
        var lr;
        var parent = this.parent();
        var raisedNode;
        if (parent) {
            lr = parent.left() === this? 0: 1;
        }
        if (parent) {
            parent.child(lr, this.right().left().remove({hide: false}), {hide: false});
            raisedNode = parent.child(lr);
        } else {
            this.container.root(this.right().left().remove({hide: false}), {hide: false});
            raisedNode = this.container.root();
        }
        if (raisedNode.right())
            this.right().left(raisedNode.right().remove({hide: false}));
        raisedNode.right(this.right().remove({hide: false}));
        if (raisedNode.left())
            this.right(raisedNode.left().remove({hide: false}));
        raisedNode.left(this);
    }

    

}(jQuery));