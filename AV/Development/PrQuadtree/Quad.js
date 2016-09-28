	/*global alert: true, ODSA */
	$(document).ready(function () {
	  // Process About button: Pop up a message with an Alert
	  function about() {
		alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
	  }
	  // Connect action callbacks to the HTML entities
	  $('#about').click(about);
	  $('#run').click(runIt);
	  $('#reset').click(ODSA.AV.reset);
	// Setup map for viewing the inputs as a map
		var mapleft = 1000;
		var maptop  = 25;
		
	// Enum for the node type
		// stored in node.NodeType
		var NT = {
		  INTERNAL : 0,
		  EMPTYEXT : 1,
		  FULLEXT  : 2
		};
	function QuadTree(jsav, xRange, yRange){
		this.jsav = jsav;
		this.xRange = xRange;
		this.yRange = yRange;
		var map = jsav.g.rect(mapleft, maptop, xRange, yRange);
		this.qdt = jsav.ds.tree({left: 100});
		this.qdt.root("");
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
		this.underRoot = this.underRoot.insert(this.qdt.root(), point, 0, 0, 256, 256, this.pte);
	}
	QuadTreeProto.remove = function(point){
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
			this.jsav.step();
			pointer.hide();
		//}
		this.count++;
		rt.removeClass("bintreeemptyleaf");
		rt.addClass('bintreefullleaf');
		rt.value(rt.value() + point.getName()+ " ");
		if (this.willSplit(point)){
			return this.split(rt, point, x, y, w, h);
		}
		this.list[this.current++] = point;
		this.list[this.current++] = this.jsav.g.circle(mapleft + point.getX(), maptop + point.getY(), 3, {fill: 'black'});
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
			this.list.splice(index, 2);
			this.current -= 2;
		}
		if (this.list.length == 0){
			current = 0;
			this.jsav.step();
			this.jsav.umsg("There is only one point in this quadrant");
			this.jsav.step();
			this.jsav.umsg("After removing this quandrant become a leaf node");
			rt.value("");
			rt.addClass('bintreeemptyleaf');
			return new leafNode(this.jsav, this.qdt);
		}else{
			this.jsav.step();
			this.jsav.umsg("click next to see point " + point.getName() + " removed");
			this.jsav.step();
			(this.list.length > 3)? rt.value(this.list[0].getName() + "|" + 
				this.list[2].getName()): rt.value(this.list[0].getName())
				this.jsav.step();
				this.jsav.umsg("point "+ point.getName() + " removed");
		}
		
		return this;
	}
	leafProto.split = function(rt, point, x, y, w, h){
		this.jsav.step();
		this.jsav.umsg("Now see that the quandrant have more than 3 point, so we must split. click next")
		this.jsav.step();
		this.jsav.umsg("We split and now need to re-insert our points")
		var newNode = new InternalNode(this.jsav, this.qdt);
		//--------------------------------------------------------
		rt.value("");
		rt.addChild("");
		rt.child(0).addClass('bintreeemptyleaf'); // nw dir === 
		rt.addChild("");
		rt.child(1).addClass('bintreeemptyleaf'); // ne dir === 
		rt.addChild("");
		rt.child(2).addClass('bintreeemptyleaf'); // nw dir === 1
		rt.addChild("");
		rt.child(3).addClass('bintreeemptyleaf'); // se dir === 
		rt.removeClass('bintreefullleaf');
		//horrizontal split
		this.jsav.g.rect(mapleft + x, maptop + y, w, h/2);
		// vertical split
		this.jsav.g.rect(mapleft + x, maptop + y, w/2, h);
		this.qdt.layout();
		this.jsav.step();
		newNode.insert(rt, point, x, y, w, h);
		for (var i = 0; i < this.current; i++){
			if (i%2 !== 0){
				//this.jsav.step();
				//this.jsav.umsg("hiding the point");
				this.list[i].hide();
			}
			else{
				this.jsav.step();
				this.jsav.umsg("re-nserting the point");
				newNode.insert(rt, this.list[i], x, y, w, h);
				this.list[i] = undefined;
				
			}
			this.qdt.layout();
		}
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
	}
	var interProto = InternalNode.prototype;

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
					this.jsav.umsg("Now we have no more than 3 point in this all quandrants combine so we must merge into one. click next");
					var str = "";
					for (var c = 0; c < arr.length; c++){
						if (c % 2 === 0){
							str += arr[c].getName() + "|";
						}
					}
					str = str.substring(0, str.length - 1);
					//var prt = rt.parent();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.child(0).remove();
					rt.value(str);
					rt.addClass('bintreefullleaf');
					this.qdt.layout();
					this.jsav.step();
					this.jsav.umsg("After merging this is how the tree looks");
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









	 // Execute the "Run" button function
	  function runIt() {
		ODSA.AV.reset(true);

		var jsav = new JSAV($('.avcontainer'), {settings: settings});
		var point = new Point(120, 120, "A");
		jsav.umsg("Let's get started");
		console.log("Setup the Bintree");
		var bint = new QuadTree(jsav, 256, 256);
		console.log("I just made a new Bintree, and bint.root is");
		jsav.displayInit();

		// Setup the tree
		jsav.umsg("Step 1: insert node with value 'A @ 130, 120");
		var point = new Point(130, 120, "A");
		bint.insert(point, 0, 0, 1024, 1024);
		//jsav.step();
		//jsav.umsg("Step 1 1/2: remove A");
		//bint.remove(point);
		jsav.step();
		jsav.umsg("Step 2: Insert C- (90,200)");
		var point = new Point(90, 200, "C");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 3: Insert D- (30,154)");
		var point = new Point(30, 154, "D");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 4: Insert E- (45,214)");
		var point = new Point(45, 214, "E");
		 bint.insert(point, 0, 0, 1024, 1024);
		 
		jsav.step();
		jsav.umsg("Step 5: Insert F- (74,64)");
		var point = new Point(74, 64, "F");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 6: Insert G- (05,35)");
		var point = new Point(05, 35, "G");
		bint.insert(point, 0, 0, 1024, 1024);
		//jsav.step();
		//jsav.umsg("Step 6 1/2: remove G");
		//bint.remove(point);
		
		jsav.step();
		jsav.umsg("Step 7: Insert H- (560,780)");
		var point = new Point(40, 160, "H");
		bint.insert(point, 0, 0, 1024, 1024);
		
		//jsav.step();
		//jsav.umsg("Step 7 1/2: remove H");
		//bint.remove(point);
		
		/**jsav.step();
		jsav.umsg("Step 8: Insert I- (254,254)");
		var point = new Point(254, 254, "I");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 9: Insert J- (254,254)");
		var point = new Point(200, 200, "J");
		bint.insert(point, 0, 0, 1024, 1024);*/
		
		/*jsav.step();
		jsav.umsg("Step 10: Insert k- (254,254)");
		var point = new Point(19, 60, "K");
		bint.insert(point, 0, 0, 1024, 1024);*/
		
		jsav.step();
		jsav.umsg("Step 11: Insert l- (254,254)");
		var point = new Point(63, 19, "l");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 12: Insert M- (254,254)");
		var point = new Point(50, 180, "M");
		bint.insert(point, 0, 0, 1024, 1024);
		
		jsav.step();
		jsav.umsg("Step 12: Insert L- (254,254)");
		var point = new Point(60, 140, "L");
		bint.insert(point, 0, 0, 1024, 1024);
		jsav.recorded(); // mark the end
	  }

	  //////////////////////////////////////////////////////////////////
	  // Start processing here
	  //////////////////////////////////////////////////////////////////
	  // Load the config object with interpreter and code created by odsaUtils.js
	  var config = ODSA.UTILS.loadConfig(),
	  interpret = config.interpreter,       // get the interpreter
	  settings = config.getSettings();      // Settings for the AV

	});