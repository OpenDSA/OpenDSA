/**
 * @author Souleymane Dia
 * @version <05/24/2016>~ summer 2016
 * see SkipList file comments before use
 */
function SkipNode(p, nodeLevel, jsav, options, pointer, num) {
	this.jsav = jsav;
	this.options = options;
	this.pointer = pointer;
	// to determine how long the arraow should be extended
	this.nodeNum = num;
	// ------------------------------
	this.pair = p;
	this.nodeLevel = nodeLevel;
	var arr = new Array(nodeLevel + 1);
	this.forward = new Array(nodeLevel + 1);
	for (var i = 0; i < nodeLevel + 1; i++) {
		arr[i] = ' \ -/';
		this.forward[i] = null;
	}
	this.disArr = this.jsav.ds.array(arr, options);
	var newOp = $.extend({}, this.options);
	newOp.indexed = false;
	newOp.top = -10;
	newOp.left = (this.options.indexed === true)? this.options.left + 8: this.options.left;
	//newOp.top = this.options.top - 100;
	if (this.pair === null){
		this.val = jsav.ds.array(['head'],newOp);
	}else{
		this.val = jsav.ds.array([ p.toString() ],newOp);
	}
	//var Edge = JSAV._types.ds.Edge;
	//var csf = new Edge(this.jsav, this.forward[i], this.forward[i], { 'arrow-end': 'classic-wide-long' });
}
SkipNode.prototype.getNodeNum = function() {
	return this.nodeNum;
};
SkipNode.prototype.getOptions = function() {
	return this.options;
};
SkipNode.prototype.setOptions = function(op) {
	return this.options = op;
};
SkipNode.prototype.setPointer = function(pt) {
	return this.pointer = pt;
};
SkipNode.prototype.getLevel = function() {
	return this.nodeLevel;
};
SkipNode.prototype.setLevel = function(lev) {
	this.nodeLevel = lev;
	return this.nodeLevel;
};
SkipNode.prototype.getForward = function() {
	return this.forward;
};
SkipNode.prototype.setForward = function(forward) {
	this.forward = forward;
	return this.forward;
};
SkipNode.prototype.getDispArr = function() {
	return this.disArr;
};
SkipNode.prototype.setDispArr = function(i, valu1) {
	this.disArr[i] = valu1;
};
SkipNode.prototype.setForwardVal = function(i, val) {
	this.forward[i] = val;
	return this.forward;
};
SkipNode.prototype.getForwardVal = function() {
	return this.val;
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
