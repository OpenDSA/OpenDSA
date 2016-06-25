/**
 * @author Souleymane Dia
 * @version <05/24/2016>~ summer 2016
 * represent the Skipnode script use in the SkipList implementation
 */
function SkipNode(p, nodeLevel, jsav, options, pointer, num) {
	this.jsav = jsav;
	this.options = options;
	this.nodeNum = num;
	this.pair = p;
	this.nodeLevel = nodeLevel;
	this.arr = new Array(nodeLevel + 1);
	this.forward = new Array(nodeLevel + 1);
	this.pointer = new Array(nodeLevel+1);
	for (var i = 0; i < nodeLevel + 1; i++) {
		this.arr[i] = ' \ -/';
		this.forward[i] = null;
		this.pointer[i] = null;
	}
	this.disArr = this.jsav.ds.array(this.arr, options);
	this.newOp = $.extend({}, this.options);
	this.newOp.indexed = false;
	this.newOp.top = -15;
	this.newOp.left = (this.options.indexed === true)? this.options.left + 8: this.options.left;
	if (this.pair === null){
		this.val = jsav.ds.array(['head'],this.newOp);
	}else{
		this.val = jsav.ds.array([p.toString() ],this.newOp);
	}
}
SkipNode.prototype.updateDis = function(options, newOp) {
	this.val.hide();
	this.val = this.jsav.ds.array([ this.pair.toString() ], newOp);
	this.disArr.hide();
	this.disArr = this.jsav.ds.array(this.arr, options);
	this.val.show();
	this.disArr.show();
};
SkipNode.prototype.resetArrDis = function(i) {
	this.arr[i] = " \ -/";
	this.disArr.value(i, " \ -/");
};
SkipNode.prototype.updateArrDis = function(i) {
	this.arr[i] = " " ;
	this.disArr.value(i, " ");
};
SkipNode.prototype.equalKey = function(other) {
	return (this.pair.getKey() === other);
};
SkipNode.prototype.equals = function(other) {
	return (this.pair.getKey() === other.pair.getKey()) &&
				(this.pair.getVal() === other.pair.getVal());
};
SkipNode.prototype.getNewOp = function() {
	return this.newOp;
};
SkipNode.prototype.getNodeNum = function() {
	return this.nodeNum;
};
SkipNode.prototype.incrNodeNum = function(i) {
	this.nodeNum++;
};
SkipNode.prototype.getOptions = function() {
	return this.options;
};
SkipNode.prototype.updateNextPointer = function(longer, j){
	this.pointer[j].hide();
	this.pointer[j] =  this.jsav.pointer(" ", this.disArr, {
			targetIndex: j,
			left: -(longer - 1)*100 + (-85),
			top: 23,
			arrowAnchor: "left center",
			fixed: false,
			"stroke-width": 2	
			});
}
SkipNode.prototype.movePointerRight = function(lev, longer, t) {
	var point = this.pointer;
	for (var i = 0; (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
		var lef = this.pointer[i].options.left;
		this.pointer[i].hide();
		var d = -((this.nodeNum - longer) -1) * 100 - 85;
		d = -d;
		this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
			targetIndex: i,
			left: (t == 0)? lef - 100: (d <= -lef)? lef - 100: lef,
			top: 23,
			arrowAnchor: "left center",
			fixed: false,
			"stroke-width": 2	
		});
	}
};

SkipNode.prototype.decrNodeNum = function(i) {
	this.nodeNum--;
};

SkipNode.prototype.movePointerLeft = function(lev, longer, t) {
	var point = this.pointer;
	for (var i = 0; (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
		var lef = this.pointer[i].options.left;
		this.pointer[i].hide();
		var d = -((this.nodeNum - longer)) * 100 - 85;
		d = -d;
		this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
			targetIndex: i,
			left: (d > -lef)? lef: lef + 100,
			top: 23,
			arrowAnchor: "left center",
			fixed: false
		});
		this.pointer[i].css({"stroke-width": 2});	
	}
}
SkipNode.prototype.updPter = function(i, opt) {
	this.pointer[i].hide();
	this.pointer[i] = this.jsav.pointer(" ", this.disArr,opt);
	this.pointer[i].css({"stroke-width": 2});	
};	
SkipNode.prototype.clear = function(i, pt) {
	for (var i = 0; i < this.nodeLevel + 1; i++) {
		this.pointer[i].hide();
	}
	this.disArr.hide();
	this.val.hide();
};
SkipNode.prototype.setPointer = function(i, pt) {
	return this.pointer[i] = pt;
	this.pointer[i].css({"stroke-width": 2});	
};
SkipNode.prototype.getLevel = function() {
	return this.nodeLevel;
};
SkipNode.prototype.getForward = function() {
	return this.forward;
};
SkipNode.prototype.getDispArr = function() {
	return this.disArr;
};
SkipNode.prototype.getPair = function(forward) {
	return this.pair;
};
SkipNode.prototype.toString = function() {
	if (this.pair === null) {
		return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
	}
	else if (this.pair.getVal() === null) {
		return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
	} else {
		return 'Node has depth ' + this.nodeLevel + ', Value '
				+ this.pair.toString();
	}
};
