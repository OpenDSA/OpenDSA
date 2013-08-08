(function ($) {
	"use strict";

	/*
	*	Red-black tree
	*
	*	REQUIRES AVL-extension!!!
    *
    *
    *   
	*
	*/

	/// Red-black Tree implementation
    var RedBlackTree = function(jsav, options) {
        this.init(jsav, options);
        this.element.addClass("jsavredblacktree");
    };
    JSAV.utils.extend(RedBlackTree, JSAV._types.ds.BinaryTree);
    var rbtreeproto = RedBlackTree.prototype;
    // JSAV._types.ds.RedBlackTree = RedBlackTree;
    
    rbtreeproto.newNode = function(value, parent, options) {
        return new RedBlackTreeNode(this, value, parent, options);
    };


    /// Binary Tree Node implementation
    var RedBlackTreeNode = function(container, value, parent, options) {
        this.init(container, value, parent, options);
        this.element.addClass("jsavredblacknode rednode");
    };
    JSAV.utils.extend(RedBlackTreeNode, JSAV._types.ds.BinaryTreeNode);
    var rbnodeproto = RedBlackTreeNode.prototype;


    rbnodeproto.isRed = function () {
        return this.element.hasClass("rednode");
    };

    rbnodeproto.isBlack = function () {
        return this.element.hasClass("blacknode");
    }

    rbnodeproto.colorRed = function (options) {
        if (!this.element.hasClass("rednode")) {
            this.toggleColor(options);
        }
    };

    rbnodeproto.colorBlack = function (options) {
        if (!this.element.hasClass("blacknode")) {
            this.toggleColor(options);
        }
    };

    rbnodeproto.toggleColor = function (options) {
        this.toggleClass("rednode blacknode", options);
    };

    rbnodeproto.grandparent = function () {
        if (!this.parent()) {
            return undefined;
        }
        return this.parent().parent();
    };

    rbnodeproto.uncle = function () {
        var g = this.grandparent();
        if (!g){
            return undefined;
        }
        if (this.parent() == g.left()) {
            return g.right();
        } else {
            return g.left();
        }
    };

    //Insert cases from Wikipedia:
    //http://en.wikipedia.org/wiki/Red-black_tree
    rbnodeproto.insert_case1 = function () {
        if (!this.parent()) {
            this.colorBlack();
        } else {
            this.insert_case2();
        }
    };

    rbnodeproto.insert_case2 = function () {
        if (this.parent().isBlack()) {
            return;
        } else {
            this.insert_case3();
        }
    };

    rbnodeproto.insert_case3 = function () {
        var u = this.uncle();
        if (u && !u.hasClass("emptynode") && u.isRed()) {
            this.parent().colorBlack();
            u.colorBlack();
            var g = this.grandparent();
            g.colorRed();
            g.insert_case1();
        } else {
            this.insert_case4();
        }
    };

    rbnodeproto.insert_case4 = function () {
        var g = this.grandparent();
        if (this === this.parent().right() && this.parent() === g.left()) {
            this.parent().rotateLeft();
            this.left().insert_case5();
        } else if (this === this.parent().left() && this.parent() === g.right()) {
            this.parent().rotateRight();
            this.right().insert_case5();
        } else {
            this.insert_case5();
        }
    };

    rbnodeproto.insert_case5 = function () {
        var g = this.grandparent();

        this.parent().colorBlack();
        g.colorRed();
        if (this === this.parent().left()) {
            g.rotateRight();
        } else {
            g.rotateLeft();
        }
    };

    JSAV.ext.ds.rbtree = function(element, options) {
        return new RedBlackTree(this, element, options);
    }


}(jQuery));