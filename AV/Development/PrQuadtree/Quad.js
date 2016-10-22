	/**
	* This is the regular implementation of the quadtree
	* @author: Souleymane Dia
	* @version<10/22/16>
	*/
	var mapleft = 600;
	var maptop  = 25;
	
	function QuadTree(jsav, xRange, yRange){
		this.jsav = jsav;
		this.xRange = xRange;
		this.yRange = yRange;
		this.map = jsav.g.rect(mapleft, maptop, xRange, yRange);
		this.map.addClass("DepthMinus");
		//this.map.hide();
		//this.map.style.zIndex = "-1";
		this.qdt = jsav.ds.tree({left: 100});
		this.qdt.root("");
		this.qdt.root().addClass('PrQuadEmptyleaf');
		//this.qdt.layout();
		this.underRoot = new leafNode(jsav, this.qdt);
		this.pte = undefined;
		//this.pte.hide();
	}
	var QuadTreeProto = QuadTree.prototype;

	QuadTreeProto.dump = function(x, w, y, h){
		var result = "quadtree dump: \n";
		var indent = "";
		result = this.underRoot.dump(x, w, y, h, indent, result);
		result += "finish printing\n";
		console.log(result);
	}

	QuadTreeProto.insert = function(point){
		if (point.getX() < 0 || point.getX() > 256 || 
			point.getY() < 0 || point.getY() >  256){
				return;
		}
		this.underRoot = this.underRoot.insert(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	}
	QuadTreeProto.remove = function(point){
		if (point.getX() < 0 || point.getX() > 256 || 
			point.getY() < 0 || point.getY() >  256){
				return;
		}
		this.underRoot = this.underRoot.remove(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	}
	
	
	//-------------------------LeafPrNode------------------------------------------

	function leafNode (jsav,qdt, val, list){
		this.qdt = qdt;
		this.jsav = jsav;
		// list with no element
		if (list !== undefined){
			this.nodeType = 1;
			this.list = list;
			this.current = list.length;
		}
		else if (val === undefined){
			this.jsav = jsav;
			this.nodeType = 1;
			this.list = new Array();
			this.current = 0;
		}
		//list with element
		else{
			this.nodeType = 1;
			this.list = new Array();
			this.current = 0;
			this.list[current] = val;
			this.current++;
		}
		this.count = 0;
	}
	var leafProto = leafNode.prototype;
	leafProto.changeType = function(num){
		this.nodeType = num;
	}
	leafProto.getList = function(){
		return this.list;
	}
	leafProto.isFull = function(){
		return this.current >= 6
	}
	// duplicate not supported yet
	leafProto.willSplit = function(point){
		return this.isFull();
	}
	leafProto.insert = function (rt, point, x, y, w, h, pointer){
		//if (this.count > 3){
			this.jsav.step();
			this.jsav.umsg("pointer reach a leaf node and we will inset. click next");
			(pointer === undefined)? pointer = this.jsav.pointer("curr quad", rt):pointer.hide();
			pointer.show();
			this.qdt.layout();
			this.jsav.step();
			pointer.hide();
		//}
		this.count++;
		rt.removeClass("PrQuadEmptyleaf");
		rt.addClass('PrQuadFullleaf');
		rt.value(rt.value() + point.getName()+ " ");
		if (this.willSplit(point)){
			return this.split(rt, point, x, y, w, h);
		}
		this.list[this.current++] = point;
		var d = this.jsav.g.circle(mapleft + point.getX(), maptop + point.getY(), 3, {fill: 'black'});
		d.addClass("DepthMinus")
		 this.list[this.current++] = d;
		//this.list[this.current++].circle(mapleft + point.getX(), maptop + point.getY(), 3, {fill: 'black'});
		//this.current++;
		return this;
	}
	leafProto.remove = function (rt, point, x, y, w, h, pointer){
		var stp = this.current;
		var index = this.list.indexOf(point);
		if (index > -1){
			//take care of the points
			//rt.value("");
			var d = this.list[index+1];
			this.list.splice(index, 2);
			this.current -= 2;
		}
		if (this.list.length == 0){
			current = 0;
			this.jsav.step();
			this.jsav.umsg("There is only one point in this quadrant");
			this.jsav.step();
			this.jsav.umsg("After removing this quandrant become a leaf node");
			d.hide();
			rt.value("");
			rt.addClass('PrQuadEmptyleaf');
			return new leafNode(this.jsav, this.qdt);
		}else{
			this.jsav.step();
			this.jsav.umsg("click next to see point " + point.getName() + " removed");
			this.jsav.step();
			(this.list.length > 3)? rt.value(this.list[0].getName() + " " + 
				this.list[2].getName()): rt.value(this.list[0].getName());
			d.hide();
		}
		
		return this;
	}
	leafProto.split = function(rt, point, x, y, w, h){
		//this.jsav.step();
		//this.jsav.umsg("We split since we there was more than 3 point and now need to re-insert our points")
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
		newNode.setXLine(this.jsav.g.line((mapleft + x), (maptop + y) + (h/2), (mapleft + x + h), (maptop + w/2) + y));
		//newNode.setXLine(this.jsav.g.rect(mapleft + x, maptop + y, h, w/2));
		//newNode.addClass("DepthMinus");
		// vertical split
		newNode.setYLine(this.jsav.g.line((mapleft + x) + w/2, (maptop + y), (mapleft + h/2 + x), (maptop + w) + y));
		//newNode.setYLine(this.jsav.g.rect(mapleft + x, maptop + y, h/2, w));
		//newNode.addClass("DepthMinus");
		newNode.qdt.layout();
		
		for (var i = 0; i < this.current; i = 0){
			this.jsav.step();
			this.jsav.umsg("remove point " + this.list[i].getName());
			this.list[i+1].hide();
			this.jsav.step();
			this.jsav.umsg("re-inserting point " + this.list[i].getName());
			newNode.insert(rt, this.list[i], x, y, w, h);
			this.current -= 2;
			this.list.splice(i, 2);
			this.qdt.layout();
		}
		newNode.insert(rt, point, x, y, w, h);
		return newNode;
	}
	leafProto.getElement = function(lists){
		var i = lists.length;
		for (var j = 0; j < this.current; j++){
			if (this.list[j] !== undefined){
				lists[i] = this.list[j];
				i++;
			}
		}
		return lists;
	}
	leafProto.dump = function(x, y, w, h, indent, result){
		
		result += "Node at " + x + ", " + y + ", " + w + ":\n";
		console.log("Node at " + x + ", " + y + ", " + w + ":\n");
		for (var i = 0; i < 3; i++){
			if (this.list[i] !== undefined){
				console.log(this.list[i].toString() + "\n");
				result += this.list[i].toString() + "\n";
			}
			return result;
		}
	}

	//---------------------------InternalNode------------------------------------------------
	function InternalNode(jsav, qdt){
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
	interProto.getXLine = function(){
		return this.xLine;
	}
	interProto.setXLine = function(line){
		this.xLine = line;
	}
	interProto.getYLine = function(){
		return this.yLine;
	}
	interProto.setYLine = function(line){
		this.yLine = line;
	}
	interProto.insert = function(rt, point, x, y, w, h, pointer){
		this.jsav.step();
		this.jsav.umsg("current location of the pointer: navigating toward a leaf node");
		pointer = this.jsav.pointer("curr quad", rt);//);
		pointer.show();
		this.jsav.step();
		pointer.hide();
		var dir = this.findDirection(point, x, y, w, h);
		if(dir === 1){
			this.nw = this.nw.insert(rt.child(0), point, x, y, w/2, h/2);
		}
		else if(dir === -1){
			this.ne = this.ne.insert(rt.child(1), point, x + (w/2), y, w/2, h/2);
		}
		else if(dir === 2){
			this.sw = this.sw.insert(rt.child(2), point, x, y + (h/2), w/2, h/2);
		}
		else{
			this.se = this.se.insert(rt.child(3), point, x + (w/2), y + (h/2), w/2, h/2);
		}
		return this;
	}
	
	interProto.remove = function(rt, point, x, y, w, h, pointer){
		var dir = this.findDirection(point, x, y, w, h);
		if(dir === 1){
			this.nw = this.nw.remove(rt.child(0), point, x, y, w/2, h/2);
		}
		else if(dir === -1){
			this.ne = this.ne.remove(rt.child(1), point, x + (w/2), y, w/2, h/2);
		}
		else if(dir === 2){
			this.sw = this.sw.remove(rt.child(2), point, x, y + (h/2), w/2, h/2);
		}
		else{
			this.se = this.se.remove(rt.child(3), point, x + (w/2), y + (h/2), w/2, h/2);
		}
		if (this.nw instanceof InternalNode || this.sw instanceof InternalNode 
		||this.ne instanceof InternalNode || this.se instanceof InternalNode){
			return this;
		}else{
			if (this.nw instanceof leafNode || this.sw instanceof leafNode 
				||this.ne instanceof leafNode || this.se instanceof leafNode){
				var arr = new Array();
				var pos = arr.length;
				var num = pos = 0;
				// implementation get element in leaf proto class
				if (this.nw instanceof leafNode){
					arr = this.nw.getElement(arr);
					num++;
				}
				if (this.ne instanceof leafNode){
					arr = this.ne.getElement(arr);
					num++;
				}
				if (this.se instanceof leafNode){
					arr = this.se.getElement(arr);
					num++;
				}
				if (this.sw instanceof leafNode){
					arr = this.sw.getElement(arr);
					num++;
				}
				if (num === 1){
					return this.currDirection(this.nw, this.sw, this.ne, this.sw);
				}else if (arr.length < 7){
					this.jsav.step();
					this.jsav.umsg("Now we have no more than 3 point in this all quandrants combine so we must merge into one.");
					this.jsav.step();
					var str = "";
					for (var c = 0; c < arr.length; c++){
						if (c % 2 === 0){
							str += arr[c].getName() + " ";
						}
					}
					str = str.substring(0, str.length - 1);
					//var prt = rt.parent();
					this.getXLine().hide();
					this.getYLine().hide();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.value(str);
					rt.addClass('PrQuadFullleaf');
					this.jsav.step();
					/**this.qdt.layout();
					this.jsav.step();
					this.jsav.umsg("After merging this is how the tree looks");
					//this.jsav.step();*/
					return new leafNode(this.jsav, this.qdt, undefined, arr);
				}
			}
			return this;
		}
		
	}
	interProto.currDirection = function(nw, sw, ne, sw){
		if (nw instanceof LeafPrNode) {
			return nw;
		}
		else if (ne instanceof LeafPrNode) {
			return ne;
		}
		else if (sw instanceof LeafPrNode) {
			return sw;
		}
		else {
			return se;
		} 
	}
	interProto.findDirection = function(newNode, x, y, w, h){
		var result = 0;
		var xMid = x + (w/2);
		var yMid = (y + (h / 2));
		if (newNode.getX() > xMid && newNode.getY() <= yMid){
			result = -1;
		}
		else if (newNode.getX() <= xMid && newNode.getY() <= yMid){
			result = 1;
		}
		else if (newNode.getX() <= xMid && newNode.getY() > yMid){
			result = 2;
		}
		else{
			result = 3;
		}
		return result;
	}


	interProto.dump = function(x, y, w, h, indent, result){
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
	function Point(x, y, name){
		this.x = x;
		this.y = y;
		this.name = name;
	}
	var pointProto = Point.prototype;
	pointProto.getX = function (){
		return this.x;
	}
	pointProto.getY = function (){
		return this.y;
	}
	pointProto.getName = function (){
		return this.name;
	}
	pointProto.equals = function(point){
		return (point.getX() == this.x && point.getY() == this.y);
	}
	pointProto.toString = function (){
		var result = this.x + ", "+ this.y;
		return result;
	}