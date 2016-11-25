	/**
	 * @Author: Souleymane Dia
	 * @version <09/14/2016>
	 * This represent a visualization data structure for PrQuadtree
	 *
	 */
	var mapleft = 800;
	var maptop = 25;
	var numPoint = 6;
	var p = 0;
	var noClick = true; // there is not going to be any clicking associated with the rectangle
	/**
	 * @xRange: width of the rectangle (PrQuadtree region)
	 * @yRange: height of the rectangle (PrQuadtree region)
	 * @noClick: if there not going to be any clicking associated with the rectangle to insert point
	 */
	function QuadTree(jsav, xRange, yRange, notClick) {
	  (notClick === false) ? noClick = false: noClick = true;
	  this.jsav = jsav;
	  this.xRange = xRange;
	  this.yRange = yRange;
	  this.map = jsav.g.rect(mapleft, maptop, xRange, yRange);
	  this.qdt = jsav.ds.tree({
	    nodegap: 10,
	    left: 50
	  });
	  this.qdt.root("");
	  this.qdt.root().addClass('PrQuadEmptyleaf');
	  this.underRoot = new leafNode(jsav, this.qdt);
	  this.pte = undefined;
	}
	var QuadTreeProto = QuadTree.prototype;
	QuadTreeProto.dump = function(x, w, y, h) {
	  var result = "quadtree dump: \n";
	  var indent = "";
	  result = this.underRoot.dump(x, w, y, h, indent, result);
	  result += "finish printing\n";
	  console.log(result);
	}

	QuadTreeProto.insert = function(point, nPoint) {
	  (nPoint === undefined) ? numPoint = 6: numPoint = 3 * nPoint;
	  if (point.getX() < 0 || point.getX() > 256 ||
	    point.getY() < 0 || point.getY() > 256) {
	    return;
	  }
	  this.underRoot = this.underRoot.insert(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	  this.qdt.layout();
	  p = 0;
	}
	QuadTreeProto.remove = function(point) {
	  if (point.getX() < 0 || point.getX() > 256 ||
	    point.getY() < 0 || point.getY() > 256) {
	    return;
	  }
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
	      this.jsav.umsg("This leaf node is full so we must split");
	      (pointer === undefined) ? pointer = this.jsav.pointer("curr quad", rt): pointer.hide();
	      pointer.show();
	      this.qdt.layout();
	      this.jsav.step();
	      this.jsav.umsg("After spliting, now we need re-insert points");
	      pointer.hide();
	    }
	    return this.split(rt, point, x, y, w, h);
	  }
	  // will not split now print jsav
	  if (noClick) { // jsav output active
	    this.jsav.step();
	    this.jsav.umsg("Pointer reach leaf node and we can insert now");
	    (pointer === undefined) ? pointer = this.jsav.pointer("curr quad", rt): pointer.hide();
	    pointer.show();
	    this.qdt.layout();

	    this.jsav.step();
	    this.jsav.umsg("Point " + point.getName() + " inserted");
	    rt.removeClass("PrQuadEmptyleaf");
	    rt.addClass('PrQuadFullleaf');
	    rt.value(rt.value() + point.getName() + " ");
	    pointer.hide();
	  } else { //not clickable
	    rt.removeClass("PrQuadEmptyleaf");
	    rt.addClass('PrQuadFullleaf');
	    rt.value(rt.value() + point.getName() + " ");
	  }
	  this.list[this.current++] = point;
	  if (p == 0) {
	    this.list[this.current++] = this.jsav.label(point.getName(), {
	      left: mapleft + point.getX(),
	      top: maptop + point.getY() - 35,
	    });
	    if (!noClick) { // jsav output disable
	      this.list[(this.current - 1)].hide();
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
	    if (!noClick) { // jsav output disable
	      this.list[(this.current - 1)].hide();
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
	      this.jsav.umsg("pointer reach leaf node-remove");
	      pointer = this.jsav.pointer("curr quad", rt); //);
	      pointer.show();
	      this.jsav.step();
	      this.umsg("point " + point.getName() + " not present");
	      pointer.hide();
	    }
	    return this;
	  }
	  if (noClick) {
	    this.jsav.step();
	    this.jsav.umsg("pointer reach leaf node-remove");
	    pointer = this.jsav.pointer("curr quad", rt); //);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("point " + point.getName() + " removed");
	    pointer.hide();
	  }

	  this.list.splice(index, 3);
	  if (this.list.length == 0 && d != undefined) {
	    current = 0;
	    d.hide();
	    label.hide();
	    rt.value("");
	    rt.addClass('PrQuadEmptyleaf');
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
	  rt.addChild("");
	  rt.child(0).addClass('PrQuadEmptyleaf'); // nw dir === 
	  rt.addChild("");
	  rt.child(1).addClass('PrQuadEmptyleaf'); // ne dir === 
	  rt.addChild("");
	  rt.child(2).addClass('PrQuadEmptyleaf'); // nw dir === 1
	  rt.addChild("");
	  rt.child(3).addClass('PrQuadEmptyleaf'); // se dir === 
	  rt.removeClass('PrQuadFullleaf');
	  //horrizontal split
	  newNode.setXLine(this.jsav.g.line((mapleft + x), (maptop + y) + (h / 2), (mapleft + x + h), (maptop + w / 2) + y));
	  // vetical split
	  newNode.setYLine(this.jsav.g.line((mapleft + x) + w / 2, (maptop + y), (mapleft + h / 2 + x), (maptop + w) + y));
	  newNode.qdt.layout();
	  for (var i = 0; i < this.current; i = 0) {
	    if (noClick) {
	      this.jsav.step();
	      this.jsav.umsg("re-inserting point " + this.list[i].getName());
	    } else {
	      this.list[i + 1].hide(); // very necessary
	      this.list[i + 2].hide();
	    }
	    newNode.insert(rt, this.list[i], x, y, w, h);
	    this.current -= 3;
	    this.list.splice(i, 3);
	    this.qdt.layout();
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
	  this.nw = new leafNode(jsav, this.qdt);
	  this.ne = new leafNode(jsav, this.qdt);
	  this.sw = new leafNode(jsav, this.qdt);
	  this.se = new leafNode(jsav, this.qdt);
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
	    this.jsav.umsg("current location of the pointer: internal node");
	    pointer = this.jsav.pointer("curr quad", rt); //);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("navigate towards leaf node");
	    pointer.hide();
	  }
	  var dir = this.findDirection(point, x, y, w, h);
	  if (dir === 1) {
	    this.nw = this.nw.insert(rt.child(0), point, x, y, w / 2, h / 2);
	  } else if (dir === -1) {
	    this.ne = this.ne.insert(rt.child(1), point, x + (w / 2), y, w / 2, h / 2);
	  } else if (dir === 2) {
	    this.sw = this.sw.insert(rt.child(2), point, x, y + (h / 2), w / 2, h / 2);
	  } else {
	    this.se = this.se.insert(rt.child(3), point, x + (w / 2), y + (h / 2), w / 2, h / 2);
	  }
	  return this;
	}
	interProto.remove = function(rt, point, x, y, w, h, pointer) {
	  if (noClick) {
	    this.jsav.step();
	    this.jsav.umsg("current location of the pointer: internal node,");
	    pointer = this.jsav.pointer("curr quad", rt); //);
	    pointer.show();
	    this.jsav.step();
	    this.jsav.umsg("navigate towards leaf node to locate the point to be removed");
	    pointer.hide();
	  }
	  var dir = this.findDirection(point, x, y, w, h);
	  if (dir === 1) {
	    this.nw = this.nw.remove(rt.child(0), point, x, y, w / 2, h / 2);
	  } else if (dir === -1) {
	    this.ne = this.ne.remove(rt.child(1), point, x + (w / 2), y, w / 2, h / 2);
	  } else if (dir === 2) {
	    this.sw = this.sw.remove(rt.child(2), point, x, y + (h / 2), w / 2, h / 2);
	  } else {
	    this.se = this.se.remove(rt.child(3), point, x + (w / 2), y + (h / 2), w / 2, h / 2);
	  }
	  if (this.nw instanceof InternalNode || this.sw instanceof InternalNode ||
	    this.ne instanceof InternalNode || this.se instanceof InternalNode) {
	    return this;
	  } else {
	    if (this.nw instanceof leafNode || this.sw instanceof leafNode ||
	      this.ne instanceof leafNode || this.se instanceof leafNode) {
	      var arr = new Array();
	      var pos = arr.length;
	      var num = pos = 0;
	      // implementation get element in leaf proto class
	      if (this.nw instanceof leafNode) {
	        arr = this.nw.getElement(arr);
	        num++;
	      }
	      if (this.ne instanceof leafNode) {
	        arr = this.ne.getElement(arr);
	        num++;
	      }
	      if (this.se instanceof leafNode) {
	        arr = this.se.getElement(arr);
	        num++;
	      }
	      if (this.sw instanceof leafNode) {
	        arr = this.sw.getElement(arr);
	        num++;
	      }
	      if (num === 1) {
	        return this.currDirection(this.nw, this.sw, this.ne, this.sw);
	      } else if (arr.length <= numPoint) { // number of point allowed can feet and we need to merge
	        if (noClick) {
	          this.jsav.step();
	          this.jsav.umsg("After removeing " + point.getName() + ", leaf belonging to this internal do not have enought point to remain splitted so we must merge");
	          pointer.show();
	          this.jsav.step();
	          this.jsav.umsg("This is the current state of the tree after merging");
	          pointer.hide();
	        }
	        var str = "";
	        for (var c = 0; c < arr.length; c++) {
	          if ((arr[c] instanceof Point)) {
	            str += arr[c].getName() + " ";
	          }
	        }
	        str = str.substring(0, str.length - 1);
	        this.getXLine().hide();
	        this.getYLine().hide();
	        rt.child(0).remove();
	        rt.child(0).remove();
	        rt.child(0).remove();
	        rt.child(0).remove();
	        rt.value(str);
	        rt.addClass('PrQuadFullleaf');
	        return new leafNode(this.jsav, this.qdt, undefined, arr);
	      }
	    }
	    return this;
	  }

	}
	interProto.currDirection = function(nw, sw, ne, sw) {
	  if (nw instanceof LeafPrNode) {
	    return nw;
	  } else if (ne instanceof LeafPrNode) {
	    return ne;
	  } else if (sw instanceof LeafPrNode) {
	    return sw;
	  } else {
	    return se;
	  }
	}
	interProto.findDirection = function(newNode, x, y, w, h) {
	  var result = 0;
	  var xMid = x + (w / 2);
	  var yMid = (y + (h / 2));
	  if (newNode.getX() > xMid && newNode.getY() <= yMid) {
	    result = -1;
	  } else if (newNode.getX() <= xMid && newNode.getY() <= yMid) {
	    result = 1;
	  } else if (newNode.getX() <= xMid && newNode.getY() > yMid) {
	    result = 2;
	  } else {
	    result = 3;
	  }
	  return result;
	}


	interProto.dump = function(x, y, w, h, indent, result) {
	    result += "Node at " + x + ", " + y + ", " + w + ": Internal\n";
	    console.log("Node at " + x + ", " + y + ", " + w + ": Internal\n");
	    indent += "  ";
	    var nws = indent;
	    var nes = indent;
	    var sws = indent;
	    var ses = indent;
	    result += nws;
	    numNode = this.nw.dump(x, y, w / 2, h / 2, indent, result);
	    result += nes;
	    numNode = this.ne.dump(x + (w / 2), y, w / 2, h / 2, indent, result);
	    result += sws;
	    result = this.sw.dump(x, y + (h / 2), w / 2, h / 2, indent, result);
	    result += ses;
	    result = this.se.dump((x + (w / 2)), y + (h / 2), (w) / 2, (h) / 2, indent, result);
	    return result;
	  }
	  //-----------------------Point------------------------------
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
