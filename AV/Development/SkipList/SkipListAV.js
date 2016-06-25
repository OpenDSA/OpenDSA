
/**
* @author Souleymane Dia
* @version <05/24/2016>~ summer 2016
* This data structure is not ready for use 
* Task to be completed:
* support adding in the middle: ~completed
* support removing from the middle and end ~completed
* apply more defensinve programing to make sure arguments are passed in approprietly ~completed 
* add more comments ~completed
* makes the code more flexible by changing hardcoded values ~completed
* delete debugging helpers codes ~completed
* follow the naming convention and structure the scipt
*/
function SkipList(jsav, options) {
	this.jsav = jsav;
	this.level = 0;
	this.options = options;
	this.pointer = null;
	this.head = new SkipNode(null, this.level + 1, this.jsav, this.options,
			this.pointer,0);
	this.size = 0;
}
/** generate a random value, note that the 237 is arbitrary and could have been any number
 also we are preventing the depth to be greater than 4 */
var randomLevel = function() {
	var lev = 0;
	var rand = function() {
		return Math.floor(Math.random() * 237);
	};
	for (lev = 0; (rand() % 2) === 0; lev++) {
	}// preventing depth to be bigger than four
	if (lev > 4)
		lev = 4;
	return lev;
};
/** adjust the depht of the head if needed */
var adjustHead = function(nLev, head, oldLev, jsav, options, pointer) {
	var oldHead = head;
	head = new SkipNode(null, nLev, jsav, options, pointer,0);
	for (var i = 0; i <= oldLev; i++) {
		head.getForward()[i] = oldHead.getForward()[i];
		head.getDispArr().value(i, oldHead .getDispArr().value(i));
	}
	return head;
};
/** insert a kv pair into a the SkipList */
SkipList.prototype.insert = function(it) {
	if (!(it instanceof KVPair)){ 
		throw new Error("illegal arguments Exception: arg must be of type KVPair")
	}
	var newLevel = randomLevel();
	if (this.level < newLevel) {
		this.head = adjustHead(newLevel, this.head, this.level, this.jsav,
				this.options, this.pointer);
		this.level = newLevel;
	}
	var update = new Array(this.level + 1);
	var x = this.head;
	for (var i = this.level; i >= 0; i--) { // Find insert position
		while ((x.getForward()[i] !== null)
				&& (x.getForward()[i] !== undefined)
				&& (it.compareTo((x.getForward()[i]).getPair().getKey())) > 0) {
			x = x.getForward()[i];
		}
		update[i] = x; // Track end at level i
	}
	var xfwrd = x.getForward()[0];
	if (xfwrd !== null){ // inserting in the middle
		var newOption = $.extend({}, xfwrd.getOptions());
		var i = 0;
		while (xfwrd !== null){
			var disOption = xfwrd.getOptions();
			xfwrd.incrNodeNum();
			var newOp = xfwrd.getNewOp();
			newOp.left += 100;
			disOption.left += 100;
			xfwrd.updateDis(disOption, newOp);
			xfwrd.movePointerRight(x.getLevel(), update[0].getNodeNum() + 1, i);
			i++;
			x = xfwrd;
			xfwrd = x.getForward()[0];
		}
		insertMidHelper(it, x, update, newOption, this.jsav, newLevel);
	}else { // inserting at the end
		var newOption = {left:this.options.left + (this.size + 1) * 100,
		top: this.options.top,
		layout: "vertical"
		};
		insertEndHelper(it, x, update, newOption, this.jsav, newLevel);
	}
	this.size++; // Increment dictionary size
	return true;
};
/** helper function to insert in the middle */
var insertMidHelper = function (it, x, update, newOption, jsav, newLevel){
	x = new SkipNode(it, newLevel, jsav, newOption, null, (update[0].getNodeNum() + 1));
	var xfwr = x.getForward();
	for (var j = 0; j <= newLevel; j++) { // Splice into list
		xfwr[j] = update[j].getForward()[j]; // Who x points to
		update[j].getForward()[j] = x; // Who y points to
		var longer = (x.getNodeNum() - update[j].getNodeNum());
	if (xfwr[j] != null){
		x.updateArrDis(j);
	}
	if (xfwr[j] == null){
		update[j].updateArrDis(j);
	}
		x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
			targetIndex: j,
			left: -(longer - 1)*100 - 85,
			top: 23,
			arrowAnchor: "left center",
			fixed: false
			}));
		if (xfwr[j] != null){
			longer = (xfwr[j].getNodeNum() - x.getNodeNum());
			xfwr[j].updateNextPointer(longer, j);
		}
	}
}
/** helper function for inserting at the end */
var insertEndHelper = function (it, x, update, newOption, jsav, newLevel){
	x = new SkipNode(it, newLevel, jsav, newOption, null, (update[0].getNodeNum() + 1));
	for (var j = 0; j <= newLevel; j++) { // Splice into list
		x.getForward()[j] = update[j].getForward()[j]; // Who x points to
		update[j].getForward()[j] = x; // Who y points to
		update[j].updateArrDis(j);
		var longer = (x.getNodeNum() - update[j].getNodeNum())
		x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
			targetIndex: j,
			left: -(longer - 1)* 100 - 85,
			top: 23,
			arrowAnchor: "left center",
			fixed: false
			}));
	}
}
/** searching for a particular key */
SkipList.prototype.search = function(otherKey) {
	var result = " ";
	var x = this.head; // Dummy header node
	var j = this.level
	this.jsav.umsg("Searching for key: " + otherKey + " starting at the deepest level")
	x.getDispArr().highlight(j);
	this.jsav.step();
	for (var i = j; i >= 0; i--) {// go forward
		while ((x.getForward()[i] !== null)
				&& (otherKey, x.getForward()[i].getPair().compareTo(otherKey) < 0)) {
					var xfwr = x.getForward()[i];
			if (xfwr !== null){
				xfwr.getDispArr().highlight(i);
				this.jsav.umsg("we compare "+ otherKey + " to the next record "
					+ xfwr.getPair().getKey()+ ". If what it points to is less, we move forward, else we go down a level");
				this.jsav.step();
			}
			x = x.getForward()[i];
			
		} // Go one last step
	}
	x.getDispArr().highlight(0);
		this.jsav.umsg("we go down to the lowest level");
		this.jsav.step();
	x = x.getForward()[0]; // Move to actual record, if it exists
	if (x !== null){
		while ((x.equalKey(otherKey) === 0)) {
			result += x.getPair().getVal().toString() ;
			x = x.getForward()[0];
		}
		x.getDispArr().highlight(0);
		this.jsav.umsg("now we move to the record muching our key "+ otherKey);
		this.jsav.step();
	}
	else{
		this.jsav.umsg("key "+ otherKey + " not found");
	}
	return result;
}
/** helper function for remove */
var find = function(val, head) {
	var valFound = head.getForward()[0];
	while ((valFound !== null) && !(val === valFound.getPair().getVal())) {
		valFound = valFound.getForward()[0];
	}
	if (valFound !== null) {
		return valFound.getPair();
	}
	return null;
}
/** remove by key */
SkipList.prototype.removeKey = function(otherKey) {
	var x = this.head;
	var removed = null;
	var update = new Array(this.level + 1);
	for (var j = this.level; j >= 0; j--) { // go forward
		while ((x.getForward()[j] !== null)
				&& (x.getForward()[j].getPair().compareTo(otherKey) < 0)) {
			x = x.getForward()[j];
		} // Go one last step
		update[j] = x;
	}
	if (x.getForward()[0] !== null
			&& (x.getForward()[0].getPair().compareTo(otherKey) === 0)) {
		removed = x.getForward()[0];
		for (var i = 0; i <= this.level; i++) { // Splice into list
			var upFwrd = update[i].getForward()[i];
			while ( upFwrd != null
					&& (upFwrd.equalKey(otherKey)) && (removed.equals(upFwrd))) {
				if (upFwrd.getForward()[i] == null) {
					update[i].resetArrDis(i);
				}
				upFwrd = (upFwrd.getForward()[i]);
				update[i].getForward()[i] = upFwrd ;
				break;// break so that it does not remove all duplicate
			} // Who x points to
		}
		this.size--; // Increment dictionary size
		if (removed.getForward()[0] == null){ // if removing from the end
			removed.clear();
		}else{ // removing from the middle
			removed.clear();
			var x = removed;
			var xfwr = x.getForward()[0];
			while ( xfwr !== null){
				var disOption = xfwr.getOptions();
				xfwr.decrNodeNum();
				var newOp = xfwr.getNewOp();
				newOp.left -= 100;
				disOption.left -= 100;
				xfwr.updateDis(disOption, newOp);
				xfwr.movePointerLeft(x.getLevel(), removed.getNodeNum() - 1, i);
				i++;
				x = xfwr;
				xfwr = x.getForward()[0];
			}
			updateNxt(update, this.jsav);
		}
		return removed.getPair();
		
	} else {
		return null;
	}
};
/** updating pointers */
var updateNxt = function (update, jsav){
	for (var i = 0; i < update.length; i++){
		var upFwrd = update[i].getForward();
		if (upFwrd[i] != null){
			var longer = upFwrd[i].getNodeNum() - update[i].getNodeNum();
			opt = {
				targetIndex: i,
				left: -(longer - 1)*100 - 85,
				top: 23,
				arrowAnchor: "left center",
				fixed: false
				}
		upFwrd[i].updPter(i, opt); 
		}
	}
} 
/** removing by value */
SkipList.prototype.removeVal = function(otherVal) {
	var x = this.head;
	var result = find(otherVal, x);
	if (result == null) {
		return null;
	} else {
		return this.removeKey(result.getKey());
	}
}
