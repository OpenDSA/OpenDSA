	/**
	 * @Author: Souleymane Dia
	 * @version <11/10/2016>
	 * This represent a visualization data structure for the Bintree
	 *
	 */
	/********************************************************************
	 * Add the Bintree constructor to the public facing JSAV interface.
	 ********************************************************************/
	 "use strict";
JSAV.ext.ds.bintree = function(options) {

    var ex_options = $.extend(true, {
      visible: true,
      autoresize: true
    }, options);
    // create a new bintree object
    return new Bintree(this, xRange, yRange, clickackble, ex_options);
  }
  function Bintree(jsav,xRange, yRange, clickackble, options, mLeft, mTop) {
	this.init(jsav,xRange, yRange, clickackble, options, mLeft, mTop);
  };
	var swt = 0;
	var mapleft = 630;
	var maptop = 25;
	var numPoint = 3; 
	var p = 0;
	var noClick = true; // there is not going to be any clicking associated with the rectangle
	/**
	 * @xRange: width of the rectangle (Bintree region)
	 * @yRange: height of the rectangle (Bintree region)
	 * @noClick: if there not going to be any clicking associated with the rectangle to insert point
	 */
	var BinTreeProto = Bintree.prototype;
	
	BinTreeProto.init = function(jsav, xRange, yRange, notClick, options, mLeft, mTop) {
		if (mLeft !== undefined){
			mapleft = mLeft;
		}
		if (mTop !== undefined){
			maptop = mTop;
		}
	  (notClick === false) ? noClick = false: noClick = true;
	  this.jsav = jsav;
	  this.xRange = xRange;
	  this.yRange = yRange;
	  this.map = jsav.g.rect(mapleft, maptop, xRange, yRange);
	  if (options!== undefined && options.left === undefined){
		  this.options = $.extend({
			nodegap: 15,
		}, options);
	  }else{
		  this.options = $.extend({
			nodegap: 15,
			left: 50
		}, options);
	  }
	  this.qdt = jsav.ds.binarytree(this.options);
	  this.qdt.root("");
	  this.qdt.root().addClass('bintreeemptyleaf');
	  this.underRoot = new leafNode(jsav, this.qdt);
	  this.pte = undefined;
	}
	BinTreeProto.dump = function(x, w, y, h) {
	  var result = "quadtree dump: \n";
	  var indent = "";
	  result = this.underRoot.dump(x, w, y, h, indent, result);
	  result += "finish printing\n";
	  console.log(result);
	}

	BinTreeProto.insert = function(point, nPoint) {
	  (nPoint === undefined) ? numPoint = 3: numPoint = 3 * nPoint;
	  if (point.getX() < 0 || point.getX() > 256 ||
	    point.getY() < 0 || point.getY() > 256) {
	    return;
	  }
	  swt = 0;
	  this.underRoot = this.underRoot.insert(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	  this.qdt.layout();
	  p = 0;
	}
	BinTreeProto.remove = function(point) {
	  if (point.getX() < 0 || point.getX() > 256 ||
	    point.getY() < 0 || point.getY() > 256) {
	    return;
	  }
	  swt = 0;
	  this.underRoot = this.underRoot.remove(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	  this.qdt.layout();
	}


	//-------------------------LeafPrNode------------------------------------------

	function leafNode(jsav, qdt, val, list) {
	  this.qdt = qdt;
	  this.jsav = jsav;
	  // list with no element
	  if (list !== undefined) {
	    this.nodeType = 1;
	    this.list = list;
	    this.current = list.length;
	  } else if (val === undefined) {
	    this.jsav = jsav;
	    this.nodeType = 1;
	    this.list = new Array();
	    this.current = 0;
	  }
	  //list with element
	  else {
	    this.nodeType = 1;
	    this.list = new Array();
	    this.current = 0;
	    this.list[current] = val;
	    this.current++;
	  }
	  this.count = 0;
	}
	var leafProto = leafNode.prototype;
	leafProto.changeType = function(num) {
	  this.nodeType = num;
	}
	leafProto.getList = function() {
	  return this.list;
	}
	leafProto.isFull = function() {
	    return this.current >= numPoint;
	  }
	  // duplicate not supported yet
	leafProto.willSplit = function(point) {
	  return this.isFull();
	}
	leafProto.insert = function(rt, point, x, y, w, h, pointer) {
	  this.count++;
	  if (this.willSplit(point)) {
	    if (noClick) {
	      this.jsav.step();
	      this.jsav.umsg("This leaf node is full so we must split.");
	      (pointer === undefined) ? pointer = this.jsav.pointer("curr quad", rt): pointer.hide();
	      pointer.show();
	      this.qdt.layout();
	      this.jsav.step();
	      this.jsav.umsg("After spliting, now we need re-insert points.");
	      pointer.hide();
	    }
	    return this.split(rt, point, x, y, w, h);
	  }
	  // will not split now print jsav
	  if (noClick) { // jsav output active
	    this.jsav.step();
	    this.jsav.umsg("Pointer reach leaf node and we can insert now.");
	    (pointer === undefined) ? pointer = this.jsav.pointer("curr quad", rt): pointer.hide();
	    pointer.show();
	    this.qdt.layout();

	    this.jsav.step();
	    this.jsav.umsg("Point " + point.getName() + " inserted.");
	    rt.removeClass("bintreeemptyleaf");
	    rt.addClass('bintreefullleaf');
	    rt.value(rt.value() + point.getName() + " ");
	    pointer.hide();
	  } else { //not clickable
	    rt.removeClass("bintreeemptyleaf");
	    rt.addClass('bintreefullleaf');
	    rt.value(rt.value() + point.getName() + " ");
	  }
	  this.list[this.current++] = point;
	  if (p == 0) {
	    this.list[this.current++] = this.jsav.label(point.getName(), {
	      left: mapleft + point.getX(),
	      top: maptop + point.getY() - 35
	    });
	    if (!noClick) {
	      this.list[this.current - 1].hide();
	    }
	    this.list[this.current++] = this.jsav.g.circle(mapleft + point.getX(), maptop + point.getY(), 2, {
	      fill: 'black'
	    });
	    //this.list[this.current -1].show();
	    p++;
	  } else {
	    this.list[this.current++] = this.jsav.label(point.getName(), {
	      left: mapleft + point.getX(),
	      top: maptop + point.getY() - 35
	    });
	    if (!noClick) {
	      this.list[this.current - 1].hide();
	    }
	    this.list[this.current++] = this.jsav.g.circle(mapleft + point.getX(), maptop + point.getY(), 2, {
	      fill: 'black'
	    });
	  }
	  return this;
	}
	leafProto.remove = function(rt, point, x, y, w, h, pointer) {
	  var stp = this.current;
	  // remove closest point upon clicking
	  if (noClick === false) { // there is clicking enable
	    for (var i = 0; i < this.list.length; i++) {
	      if ((this.list[i] instanceof Point)) {
	        // -+5 ratio difference
	        var diffX = point.getX() - this.list[i].getX();
	        var diffY = point.getY() - this.list[i].getY();
	        //ratio by which a point can be off
	        var ratio = 10;
	        if ((-ratio <= diffX && diffX <= ratio) && (-ratio <= diffY && diffY <= ratio)) {
	          point = this.list[i];
	          this.list[i + 1].hide();
	          this.list[i + 2].hide();
	          break;
	        }
	      }
	    }
	  }
	  var index = this.list.indexOf(point);
	  if (index > -1) {
	    //take care of the points
	    //remove point
	    var d = this.list[index + 1];
	    var label = this.list[index + 2];
	    //this.list.splice(index, 2);
	    this.current -= 3;
	  } else {
	    if (noClick) {
	      this.jsav.step();
	      this.jsav.umsg("Pointer reach leaf node-remove.");
	      pointer = this.jsav.pointer("curr quad", rt); //);
	      pointer.show();
	      this.jsav.step();
	      this.umsg("Point " + point.getName() + " not present.");
	      pointer.hide();
	    }
	    return this;
	  }
	  if (noClick) {
	    this.jsav.step();
	    this.jsav.umsg("Pointer reach leaf node-remove.");
	    pointer = this.jsav.pointer("curr quad", rt); //);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("Point " + point.getName() + " removed.");
	    pointer.hide();
	  }

	  this.list.splice(index, 3);
	  if (this.list.length == 0 && d != undefined) {
	    this.current = 0;
	    d.hide();
	    label.hide();
	    rt.value("");
	    rt.addClass('bintreeemptyleaf');
	    return new leafNode(this.jsav, this.qdt);
	  } else {
	    //(this.list.length > 4) ? rt.value(this.list[0].getName() + " " +
	      //this.list[2].getName()): rt.value(this.list[0].getName());
		if(this.list.length >= 3){
			var res = "";
			for (var i = 0; i < this.list.length; i++){
				if(this.list[i] instanceof Point){
					res += this.list[i].getName() + " ";
				}
			}
			rt.value(res);
		}
	    if (d !== undefined) {
	      d.hide();
	      label.hide();
	    }
	  }

	  return this;
	}
	leafProto.split = function(rt, point, x, y, w, h) {
	  var newNode = new InternalNode(this.jsav, this.qdt);
	  //--------------------------------------------------------
	  rt.value("");
	  rt.left("");
	  rt.left().addClass('bintreeemptyleaf'); // nw dir === left
	  rt.right("");
	  rt.right().addClass('bintreeemptyleaf'); // ne dir === right
	  rt.removeClass('bintreefullleaf');
	  if (swt % 2 === 0) {
	    //horrizontal split
	    newNode.setXLine(this.jsav.g.line((mapleft + x), (maptop + y) + (h / 2), (mapleft + x + w), (maptop + h / 2) + y));
	  } else {
	    // vetical split
	    newNode.setYLine(this.jsav.g.line((mapleft + x) + w / 2, (maptop + y), (mapleft + x) + w / 2, (maptop + h) + y));
	  }
	  newNode.qdt.layout();
	  for (var i = 0; i < this.current; i = 0) {
	    if (w === 2 * h) {
	      swt = 1;
	    } else {
	      swt = 0;
	    }

	    if (noClick) {
	      this.jsav.step();
	      this.jsav.umsg("Re-inserting point " + this.list[i].getName() + ".");
	    } else {
	      this.list[i + 1].hide(); // very necessary
	      this.list[i + 2].hide();
	    }
	    newNode.insert(rt, this.list[i], x, y, w, h);
	    this.current -= 3;
	    this.list.splice(i, 3);
	    this.qdt.layout();
	  }
	  //swt = 0;
	  if (w === 2 * h) {
	    swt = 1;
	  } else {
	    swt = 0;
	  }
	  newNode.insert(rt, point, x, y, w, h);
	  return newNode;
	}
	leafProto.getElement = function(lists) {
	  var i = lists.length;
	  for (var j = 0; j < this.current; j++) {
	    if (this.list[j] !== undefined) {
	      lists[i] = this.list[j];
	      i++;
	    }
	  }
	  return lists;
	}
	leafProto.dump = function(x, y, w, h, indent, result) {

	  result += "Node at " + x + ", " + y + ", " + w + ":\n";
	  console.log("Node at " + x + ", " + y + ", " + w + ":\n");
	  for (var i = 0; i < 3; i++) {
	    if (this.list[i] !== undefined) {
	      console.log(this.list[i].toString() + "\n");
	      result += this.list[i].toString() + "\n";
	    }
	    return result;
	  }
	}

	//---------------------------InternalNode------------------------------------------------
	function InternalNode(jsav, qdt) {
	  this.jsav = jsav;
	  this.qdt = qdt;
	  this.type = 2;
	  this.leftNd = new leafNode(jsav, this.qdt);
	  this.rightNd = new leafNode(jsav, this.qdt);
	  this.xLine = null;
	  this.yLine = null;
	}

	var interProto = InternalNode.prototype;
	interProto.getXLine = function() {
	  return this.xLine;
	}
	interProto.setXLine = function(line) {
	  this.xLine = line;
	}
	interProto.getYLine = function() {
	  return this.yLine;
	}
	interProto.setYLine = function(line) {
	  this.yLine = line;
	}
	interProto.insert = function(rt, point, x, y, w, h, pointer) {
	  if (noClick) {
	    this.jsav.step();
	    this.jsav.umsg("Current location of the pointer: internal node.");
	    pointer = this.jsav.pointer("curr quad", rt); //);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("Navigate towards leaf node.");
	    pointer.hide();
	  }
	  var dir = undefined;
	  if (swt % 2 === 0) { //horizontal 
	    dir = this.findHorDir(point, x, y, w, h);
	    if (dir === 0) {
	      swt++;
	      this.rightNd = this.rightNd.insert(rt.left(), point, x, y, w, h / 2); //x, y, w/2, h/2
	    } else if (dir === 1) {
	      swt++;
	      this.leftNd = this.leftNd.insert(rt.right(), point, x, y + (h / 2), w, h / 2); //x + (w/2), y, w/2, h/2
	    }
	    //swt++;
	  } else { //vertical
	    dir = this.findVertDir(point, x, y, w, h);
	    if (dir === 1) {
	      swt++;
	      this.rightNd = this.rightNd.insert(rt.right(), point, x + (w / 2), y, w / 2, h); //x, y + (h/2), w/2, h/2
	    } else if (dir === 0) {
	      swt++;
	      this.leftNd = this.leftNd.insert(rt.left(), point, x, y, w / 2, h); //x + (w/2), y + (h/2), w/2, h/2
	    }

	  }
	  return this;
	}
	interProto.remove = function(rt, point, x, y, w, h, pointer) {
	  if (noClick) {
	    this.jsav.step();
	    this.jsav.umsg("Current location of the pointer: internal node.");
	    pointer = this.jsav.pointer("curr quad", rt);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("Navigate towards leaf node to locate the point to be removed.");
	    pointer.hide();
	  }
	  var dir = undefined;
	  if (swt % 2 === 0) { //horizontal 
	    dir = this.findHorDir(point, x, y, w, h);
	    if (dir === 0) {
	      swt++;
	      this.rightNd = this.rightNd.remove(rt.left(), point, x, y, w, h / 2); //x, y, w/2, h/2
	    } else if (dir === 1) {
	      swt++;
	      this.leftNd = this.leftNd.remove(rt.right(), point, x, y + (h / 2), w, h / 2); //x + (w/2), y, w/2, h/2
	    }

	  } else { //vertical
	    dir = this.findVertDir(point, x, y, w, h);
	    if (dir === 1) {
	      swt++;
	      this.rightNd = this.rightNd.remove(rt.right(), point, x + (w / 2), y, w / 2, h); //x, y + (h/2), w/2, h/2
	    } else if (dir === 0) {
	      swt++;
	      this.leftNd = this.leftNd.remove(rt.left(), point, x, y, w / 2, h);
	    }
	  }

	  if (this.rightNd instanceof InternalNode || this.leftNd instanceof InternalNode) {
	    return this;
	  } else {
	    if (this.rightNd instanceof leafNode || this.leftNd instanceof leafNode) {
	      var arr = new Array();
	      var pos = arr.length;
	      var num = pos = 0;
	      // implementation get element in leaf proto class
	      if (this.rightNd instanceof leafNode) {
	        arr = this.rightNd.getElement(arr);
	        num++;
	      }
	      if (this.leftNd instanceof leafNode) {
	        arr = this.leftNd.getElement(arr);
	        num++;
	      }
	      if (num === 1) {
	        return this.currDirection(this.leftNd, this.rightNd);
	      } else if (arr.length <= numPoint) { // number of point allowed can feet and we need to merge
	        if (noClick) {
	          this.jsav.step();
	          this.jsav.umsg("After removeing " + point.getName() + ", leaf belonging to this internal do not have enought point to remain splitted so we must merge.");
	          pointer.show();
	          this.jsav.step();
	          this.jsav.umsg("This is the current state of the tree after merging.");
	          pointer.hide();
	        }
	        var str = "";
	        for (var c = 0; c < arr.length; c++) {
	          if ((arr[c] instanceof Point)) {
	            str += arr[c].getName() + " ";
	          }
	        }
	        str = str.substring(0, str.length - 1);
	        (this.getXLine() === null) ? this.getYLine().hide(): this.getXLine().hide();
	        rt.left().remove();
	        rt.right().remove();
	        rt.value(str);
	        rt.addClass('bintreefullleaf');
	        return new leafNode(this.jsav, this.qdt, undefined, arr);
	      }
	    }
	    return this;
	  }

	}
	interProto.currDirection = function(leftNode, rightNode) {
	  if (leftNode instanceof LeafPrNode) {
	    return leftNode;
	  } else if (rightNode instanceof LeafPrNode) {
	    return rightNode;
	  }
	}
	interProto.findVertDir = function(newNode, x, y, w, h) {
	  var result = 0;
	  var xMid = x + (w / 2);
	  var yMid = (y + (h / 2));
	  if (newNode.getX() >= xMid) {
	    result = 1; //right
	  } else if (newNode.getX() <= xMid) {
	    result = 0; //left
	    //console.log("error: location direction y = " + newNode.getY());  
	  } else {
	    console.log("error: location direction");
	  }
	  return result;
	}
	interProto.findHorDir = function(newNode, x, y, w, h) {
	  var result = 0;
	  var xMid = x + (w / 2);
	  var yMid = (y + (h / 2));
	  if (newNode.getY() >= yMid) {
	    result = 1; // right
	  } else if (newNode.getY() <= yMid) {
	    result = 0; //left
	    //console.log("error: location direction x = " + newNode.getX());  
	  } else {
	    console.log("error: location direction");
	  }
	  return result;
	}

	//-----------------------Point--------------------------------------------------------------
	function Point(x, y, name) {
	  this.x = x;
	  this.y = y;
	  this.name = name;
	}
	var pointProto = Point.prototype;
	pointProto.getX = function() {
	  return this.x;
	}
	pointProto.getY = function() {
	  return this.y;
	}
	pointProto.getName = function() {
	  return this.name;
	}
	pointProto.equals = function(point) {
	  return (point.getX() == this.x && point.getY() == this.y);
	}
	pointProto.toString = function() {
	  var result = this.x + ", " + this.y;
	  return result;
	}
