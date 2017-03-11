/**
 * @author Souleymane Dia
 * @version <07/01/2016>~ summer 2016
 * Task to be completed:
 * support adding in the middle: ~completed
 * support removing from the middle and end ~completed
 * apply more defensinve programing to make sure arguments are passed in approprietly ~completed 
 * add more comments ~completed
 * makes the code more flexible by changing hardcoded values ~completed
 * delete debugging helpers codes ~completed
 * follow the naming convention and structure the class ~completed
 */
"use strict";

/********************************************************************
 * Add the SkipList constructor to the public facing JSAV interface.
 ********************************************************************/
JSAV.ext.ds.skiplist = function(options) {

    var ex_options = $.extend(true, {
      visible: true,
      autoresize: true
    }, options);
    // create a new SkipList object
    return new SkipList(this, ex_options);
  }
  /**********************************************************************
   * Implement SkipList data structure.
   *********************************************************************/
function SkipList(jsav, options) {
  this.init(jsav, options);
};
// Get SkipList prototype
var SkipListProto = SkipList.prototype;
var hztalDist = 70;
var topVal = 72;
var HeadTopVal = 40;
var noRedraw = 0;
var showStep = true;
var updateArrayPos = 0;
var updArray;
var updArrayPointer;
/**
 * initialize the SkipList. Create an empty head
 * @param jsav The JSAV object for this skiplist
 * @param options Options to be passed to the skiplist structure
 */
SkipListProto.init = function(jsav, options) {
  this.jsav = jsav; // set the jsav object for this tree
  this.level = 0; // level of the tree
  //TODO: need to fix the placement to be independant
  // use specific starting point and ending point if nothin given
  this.positionElem(options);
  // create an empty SkipNode and set it as root
  this.head = new SkipNode(null, this.level, this.jsav, this.options, 0);
  this.size = 0;
};
SkipListProto.positionElem = function(options){
	if(options === undefined || (options.left == undefined && options.top == undefined)){
		this.options = $.extend({
		layout: "vertical",
		indexed: true,
		left: 100,
		top: topVal
	}, options);
	//updateArrayPos = 100/2;
  }else if (options.left == undefined){
		this.options = $.extend({
		layout: "vertical",
		indexed: true,
		top: topVal
	}, options);
	//updateArrayPos = options.left/2;
  }
  else if (options.top == undefined){
		this.options = $.extend({
		layout: "vertical",
		indexed: true,
		left: 100,
	}, options);
	updateArrayPos = options.left/2;
  }
  else{
		this.options = $.extend({
		layout: "vertical",
		indexed: true,
	}, options);
	//updateArrayPos = options.left/2;
  }
}
/** generate a random value, note that the 237 is arbitrary and could have been any number
  also we are preventing the depth to be greater than 4 */
var randomLevel = function() {
  var lev = 0;
  var rand = function() {
    return Math.floor(Math.random() * 237);
  };
  for (lev = 0;
    (rand() % 2) === 0; lev++) {} // preventing depth to be bigger than four
  if (lev > 4)
    lev = 4;
  return lev;
};
/** adjust the depht of the head if needed */
var adjustHead = function(nLev, head, oldLev, jsav, options) {
  var oldHead = head;
  noRedraw = 0;
  head = new SkipNode(null, nLev, jsav, options, 0);
  for (var i = 0; i <= oldLev; i++) {
    head.getForward()[i] = oldHead.getForward()[i];
    head.getDispArr().value(i, oldHead.getDispArr().value(i));
  }
  return head;
};
/** insert a kv pair into a the SkipList */
SkipListProto.insert = function(it, lev, showS) {
  if (!(it instanceof KVPair)) {
    throw new Error("illegal arguments Exception: arg must be of type KVPair");
  }
  var newLevel = 0;
  (lev === undefined)? newLevel = randomLevel(): newLevel = lev;
  if (this.level < newLevel) {
    var flag = false;
    if (this.level + 1 < newLevel) {
		var flag = true;
		if (showStep){
		  //this.jsav.step();
		  this.jsav.umsg("The random depth of the node to be inserted is " +
			newLevel + ", so we must adjust the depth of the header node before inserting.");
		  this.jsav.step();
		}
    }
    this.head = adjustHead(newLevel, this.head, this.level, this.jsav,
      this.options);
    this.level = newLevel;
	if (showStep){
		(flag === true) ? this.jsav.step(): flag = false;
	}
  }
  var update = new Array(this.level + 1);
  if (showStep){
	updArray = this.jsav.ds.array(update, {layout: "vertical", indexed: true, relativeTo: this.head.getDispArr(), myAnchor: "center top", follow:true, anchor: "center top"});
	updArray.css({"left":"-=90"});
	//updArray.show();
	updArrayPointer = this.jsav.pointer("upd array", updArray.index(0));
  }
  var unhigh = new Array(this.size + 3);
  var x = this.head; // Dummy header node 
  var j = this.level;
  var ind = 0;
  if(showStep){
    this.jsav.umsg("Starting from level " + this.level + " of the head, we look for the first node whose pointer points to a key bigger than the key " + it.getKey() + " that we want to insert, and save it into a temporary update array. If no such key exists, then the update array will contain the last node and we insert.");
		unhigh[ind++] = x.getDispArr().highlight(j);
		this.jsav.step();
		unhigh[ind--] = x.getDispArr().unhighlight(j);
	}
  for (var i = this.level; i >= 0; i--) { // Find insert position
	if ((x.getForward()[i] !== null) &&
      (it.compareTo((x.getForward()[i]).getPair().getKey())) > 0){
    while ((x.getForward()[i] !== null) &&
      (it.compareTo((x.getForward()[i]).getPair().getKey())) > 0) {
	  var xfwr = x.getForward()[i];
      if (xfwr !== undefined) {
		  if(showStep){
			  unhigh[ind++] = xfwr.getDispArr().highlight(i);
			  this.jsav.umsg("We compare " + it.getKey() + " to the next record " +
			  xfwr.getPair().getKey() + ". If it is less, we move forward, else we save this value and go down a level.");
			  this.jsav.step();
			  unhigh[ind--] = xfwr.getDispArr().unhighlight(i);
		  }
        }
      x = x.getForward()[i];
    }
	}
	else{
		if(showStep && x.getForward()[i] != null){
			unhigh[ind++] = x.getForward()[i].getDispArr().highlight(i);
			this.jsav.umsg("We compare " + it.getKey() + " to the next record " +
			x.getForward()[i].getPair().getKey() + ". If what it points to is less, we move forward, else we go down a level and store this value in the update array.");
			this.jsav.step();
			unhigh[ind--] = x.getForward()[i].getDispArr().unhighlight(i);
		}
	}
	if(showStep){
		  this.jsav.umsg("We save this highlighted node into our updated array since it will point to our new key: " + it.getKey() + " if their height matches.");
		  unhigh[ind++] = x.getDispArr().highlight(i);
		  updArray.value(i, x.getVal().value(0));
		  updArray.hide();
		  updArray.show();
		  this.jsav.step();
	}
    update[i] = x; // Track end at level i
  }
  if(showStep){
		unhigh[ind++] = x.getDispArr().highlight(0);
		this.jsav.umsg("Now the update array contains the nodes that will point to the new key "+ it.getKey() + ", from which all the nodes that preceed the key are accessible. We start updating.");
		//this.jsav.step();
  }
  var xfwrd = x.getForward()[0];
  if (xfwrd !== null) { // inserting in the middle
    var newOption = $.extend({}, xfwrd.getOptions());
    var i = 0;
    while (xfwrd !== null) {
      var disOption = xfwrd.getOptions();
      xfwrd.incrNodeNum();
      var newOp = xfwrd.getNewOp();
      newOp.left += hztalDist;
	  console.log(newOp.left);
      disOption.left += hztalDist;
      xfwrd.updateDis(disOption, newOp);
      xfwrd.movePointerRight(x.getLevel(), update[0].getNodeNum() + 1, i);
      i++;
      x = xfwrd;
      xfwrd = x.getForward()[0];
    }
    insertMidHelper(it, x, update, newOption, this.jsav, newLevel);
  } else { // inserting at the end
    var newOption = {
      left: this.options.left + (this.size + 1) * hztalDist,
      top: this.options.top,
      layout: "vertical"
    };
    insertEndHelper(it, x, update, newOption, this.jsav, newLevel);
  }
  if(showStep){
		for (var i = 0; i < ind; i++) {
		  unhigh[i].unhighlight();
		}
  }
  this.size++; // Increment dictionary size
  if (showStep){
	  updArray.hide();
	  updArrayPointer.hide();
  }
  return true;
};
/** helper function to insert in the middle */
var insertMidHelper = function(it, x, update, newOption, jsav, newLevel) {
    if(showStep){
		jsav.umsg("Now our update array contain all the highlighted node that will point to the new key: "+ it.getKey() + ". This key is to be inserted into the middle, so we must update both its pointer, and the node before it, at each level.");
	}
    x = new SkipNode(it, newLevel, jsav, newOption, (update[0].getNodeNum() + 1));
	if (showStep){
		jsav.step();
		jsav.umsg("All of the pointers are now updated.");
	}
    var xfwr = x.getForward();
    for (var j = 0; j <= newLevel; j++) { // Splice into list
      xfwr[j] = update[j].getForward()[j]; // Who x points to
      update[j].getForward()[j] = x; // Who y points to
      var longer = (x.getNodeNum() - update[j].getNodeNum());
      if (xfwr[j] != null) {
        x.updateArrDis(j);
      }
      if (xfwr[j] == null) {
        update[j].updateArrDis(j);
      }
	  if(showStep){
      //jsav.step();
		jsav.umsg("Update pointers.");
	  }
      x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
        targetIndex: j,
        left: -(longer - 1) * hztalDist - 55,
        top: 22,
        arrowAnchor: "left center",
        fixed: false
      }));
      if (xfwr[j] != null) {
        longer = (xfwr[j].getNodeNum() - x.getNodeNum());
        xfwr[j].updateNextPointer(longer, j);
      }
    }
  }
  /** helper function for inserting at the end */
var insertEndHelper = function(it, x, update, newOption, jsav, newLevel) {
	if(showStep){
		jsav.umsg("Now our update array contain all the highlighted node that will point to the new key: "+ it.getKey() + ".  We are inserting at the end of the Skip List, so we just need to update the pointers of the nodes before it.");
	}
    x = new SkipNode(it, newLevel, jsav, newOption, (update[0].getNodeNum() + 1));
	if (showStep){
		jsav.step();
		jsav.umsg("All of the pointer are now updated.");
	}
    for (var j = 0; j <= newLevel; j++) { // Splice into list
      x.getForward()[j] = update[j].getForward()[j]; // Who x points to
      update[j].getForward()[j] = x; // Who y points to
      update[j].updateArrDis(j);
      var longer = (x.getNodeNum() - update[j].getNodeNum())
      x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
        targetIndex: j,
        left: -(longer - 1) * hztalDist - 55,
        top: 22,
        arrowAnchor: "left center",
        fixed: false
      }));
    }
  }
  /** searching for a particular key */
SkipListProto.search = function(otherKey) {
    var unhigh = new Array(this.size + 3);
    var ind = 0;
    var result = " ";
    var x = this.head; // Dummy header node
    var j = this.level
	if(showStep){
    this.jsav.umsg("Searching for key: " + otherKey + " starting at the deepest level.");
		unhigh[ind++] = x.getDispArr().highlight(j);
		this.jsav.step();
	}
    for (var i = j; i >= 0; i--) { // go forward
      while ((x.getForward()[i] !== null) &&
        (otherKey, x.getForward()[i].getPair().compareTo(otherKey) < 0)) { 
        var xfwr = x.getForward()[i];
        if (xfwr !== null) {
		  if(showStep){
			unhigh[ind++] = xfwr.getDispArr().highlight(i);
			this.jsav.umsg("We compare " + otherKey + " to the next record " +
            xfwr.getPair().getKey() + ". If what it points to is less, we move forward, else we go down a level.");
			this.jsav.step();
		  }
        }
        x = x.getForward()[i];

      } // Go one last step
    }
	if(showStep){
		unhigh[ind++] = x.getDispArr().highlight(0);
		this.jsav.umsg("We go down to the lowest level.");
		this.jsav.step();
	}
    x = x.getForward()[0]; // Move to actual record, if it exists
    if (x !== null) {
      while ((x.equalKey(otherKey) === 0)) {
        result += x.getPair().getVal().toString();
        x = x.getForward()[0];
      }
	  if(showStep){
		  unhigh[ind++] = x.getDispArr().highlight(0);
		  this.jsav.umsg("Now we move to the record muching the key " + otherKey + ".");
		  this.jsav.step();
	  }
    } else {
		if(showStep){
		  this.jsav.umsg("Key " + otherKey + " not found.");
		  this.jsav.step();
		}
    }
	if(showStep){
		for (var i = 0; i < ind; i++) {
		  unhigh[i].unhighlight();
		}
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
  var isStepShown = function(val){
	showStep = val;
  }
  /** remove by key */
SkipListProto.removeKey = function(otherKey) { 
  if (showStep){
	  this.jsav.step();
	  this.jsav.umsg("To remove " + otherKey + " we must search, find, and then disconnect pointers that point to and preceed it with the help of the temporary update array.");
	  this.jsav.step();
  }
  var x = this.head;
  var j = this.level
  var removed = null;
  var unhigh = new Array(this.size + 3); 
  var ind = 0;
  var update = new Array(this.level + 1);
  if (showStep){
	updArray = this.jsav.ds.array(update, {layout: "vertical", indexed: true, relativeTo: this.head.getDispArr(), myAnchor: "center top", follow:true, anchor: "center top"});
	updArray.css({"left":"-=90"});
	//updArray.show();
	updArrayPointer = this.jsav.pointer("upd array", updArray.index(0));
  }
  if(showStep){
    this.jsav.umsg("As with insert, start from the deepest level " + this.level + " of the head. The update array tracks nodes that point to the node with key " + otherKey + ", that is being removed. If no such node exists, then we just return.");
	unhigh[ind++] = x.getDispArr().highlight(j);
	this.jsav.step();
	unhigh[ind++] = x.getDispArr().unhighlight(j);
	}
  for (var j = this.level; j >= 0; j--) { // go forward
  if ((x.getForward()[j] !== null) &&
      (x.getForward()[j].getPair().compareTo(otherKey) < 0)) {
    while ((x.getForward()[j] !== null) &&
      (x.getForward()[j].getPair().compareTo(otherKey) < 0)) {
		  var xfwr = x.getForward()[j];
		if (xfwr !== undefined) {
		  if(showStep){
			  unhigh[ind++] = xfwr.getDispArr().highlight(j);
			  this.jsav.umsg("We compare " + otherKey + " to the next record " +
			  xfwr.getPair().getKey() + ". If what it points to is less, we move forward, else we go down a level.");
			  this.jsav.step();
			  unhigh[ind--] = xfwr.getDispArr().unhighlight(j);
		  }
        }
      x = x.getForward()[j];
    } // Go one last step
  }
	else{
		if(showStep && x.getForward()[j] != null){
			unhigh[ind++] = x.getForward()[j].getDispArr().highlight(j);
			this.jsav.umsg("We compare " + otherKey + " to the next record " +
			x.getForward()[j].getPair().getKey() + ". If what it points to is less, we move forward, else we go down a level and store this value in the update array.");
			this.jsav.step();
			unhigh[ind--] = x.getForward()[j].getDispArr().unhighlight(j);
		}
	}
	if(showStep){
		  this.jsav.umsg("We save this highlighted node into our updated array since it will point to the key: " + otherKey + " we want to remove, if their height matches.");
		  unhigh[ind++] = x.getDispArr().highlight(j);
		  updArray.value(j, x.getVal().value(0));
		  updArray.hide();
		  updArray.show();
		  this.jsav.step();
	}
    update[j] = x;
  }
  if (x.getForward()[0] !== null &&
    (x.getForward()[0].getPair().compareTo(otherKey) === 0)) {
    removed = x.getForward()[0];
    for (var i = 0; i <= this.level; i++) { // Splice into list
      var upFwrd = update[i].getForward()[i];
      while (upFwrd != null &&
        (upFwrd.getNodeNum() === removed.getNodeNum())) {
        if (upFwrd.getForward()[i] == null) {
          update[i].resetArrDis(i);
        }
        upFwrd = (upFwrd.getForward()[i]);
        update[i].getForward()[i] = upFwrd;
        break; // break so that it does not remove all duplicate
      } // Who x points to
    }
    this.size--; // decrement dictionary size
    if (removed.getForward()[0] == null) { // if removing from the end
      removed.clear();
    } else { // removing from the middle
      removed.clear();
      var x = removed;
      var xfwr = x.getForward()[0];
      while (xfwr !== null) {
        var disOption = xfwr.getOptions();
        xfwr.decrNodeNum();
        var newOp = xfwr.getNewOp();
        newOp.left -= hztalDist;
        disOption.left -= hztalDist;
        xfwr.updateDis(disOption, newOp);
        xfwr.movePointerLeft(x.getLevel(), removed.getNodeNum() - 1, i);
        i++;
        x = xfwr;
        xfwr = x.getForward()[0];
      }
      updateNxt(update, this.jsav);
    }
	if(showStep){
		for (var i = 0; i < ind; i++) {
			unhigh[i].unhighlight();
		}
	  updArray.hide();
	  updArrayPointer.hide();
	}
    return removed.getPair();

  } else {
	if(showStep){
		for (var i = 0; i < ind; i++) {
		  unhigh[i].unhighlight();
		}
	  updArray.hide();
	  updArrayPointer.hide();
	}
    return null;
  }
};
/** updating pointers */
var updateNxt = function(update, jsav) {
    for (var i = 0; i < update.length; i++) {
      var upFwrd = update[i].getForward();
      if (upFwrd[i] != null) {
        var longer = upFwrd[i].getNodeNum() - update[i].getNodeNum();
        var opt = {
          targetIndex: i,
          left: -(longer - 1) * hztalDist - 55,
          top: 22,
          arrowAnchor: "left center",
          fixed: false
        }
        upFwrd[i].updPter(i, opt);
      }
    }
  }
  /** removing by value */
SkipListProto.removeVal = function(otherVal) {
  var x = this.head;
  var result = find(otherVal, x);
  if (result == null) {
    return null;
  } else {
    return this.removeKey(result.getKey());
  }
}

/*******************************************************************************************
 * SkipNode script
 ******************************************************************************************/
/**
 * @author Souleymane Dia
 * @version <05/24/2016>~ summer 2016
 * represent the Skipnode script use in the SkipList implementation
 */
function SkipNode(p, nodeLevel, jsav, options, num) {
  this.jsav = jsav;
  this.options = options;
  this.nodeNum = num;
  this.pair = p;
  this.nodeLevel = nodeLevel;
  this.arr = new Array(nodeLevel + 1);
  this.forward = new Array(nodeLevel + 1);
  this.pointer = new Array(nodeLevel + 1);
  for (var i = 0; i < nodeLevel + 1; i++) {
    this.arr[i] = 'null';
    this.forward[i] = null;
    this.pointer[i] = null;
  }
  //this.disArr = this.jsav.ds.array(this.arr, options);
  this.newOp = $.extend(true, {
    autoresize: true
  }, this.options);
  this.newOp.indexed = false;
  //this.newOp.top = HeadTopVal;
  this.newOp.left = (this.options.indexed === true) ? this.options.left + 8 : this.options.left;
  if (this.pair === null) {
    this.val = jsav.ds.array(['Hd'], this.newOp);
	//if(noRedraw == 0){
	var ponter2 = jsav.pointer("Head", this.val.index(0));
	//}
  } else {
    this.val = jsav.ds.array([p.toString()], this.newOp);
  }
  if (noRedraw == 0){
	  this.disArr = this.jsav.ds.array(this.arr, {layout: "vertical", indexed: true, relativeTo: this.val, myAnchor: "right top", follow:true, anchor: "right bottom", relativeIndex:0});
	  this.disArr.css({"left":"-=6px"});
	  this.disArr.css({"top":"-=1px"});
	   noRedraw++;
  }else{
	  this.disArr = this.jsav.ds.array(this.arr, {layout: "vertical", indexed: false, relativeTo: this.val, myAnchor: "right top", follow:true, anchor: "right bottom", relativeIndex:0});
	  this.disArr.css({"left":"+=2px"});
	  this.disArr.css({"top":"-=1px"});
  }
}
var skipNodeProto = SkipNode.prototype;
skipNodeProto.updateDis = function(options, newOp) {
  this.val.hide();
  this.val = this.jsav.ds.array([this.pair.toString()], newOp);
  this.disArr.hide();
  this.disArr = this.jsav.ds.array(this.arr, {layout: "vertical", indexed: false, relativeTo: this.val, myAnchor: "right top", follow:true, anchor: "right bottom", relativeIndex:0});
	  this.disArr.css({"left":"+=2px"});
	  this.disArr.css({"top":"-=1px"});
  this.val.show();
  this.disArr.show();
};
skipNodeProto.getVal = function(){
	return this.val;
}
skipNodeProto.resetArrDis = function(i) {
  this.arr[i] = "null";
  this.disArr.value(i, "null");
};
skipNodeProto.updateArrDis = function(i) {
  this.arr[i] = " ";
  this.disArr.value(i, " ");
};
skipNodeProto.equalKey = function(other) {
  return (this.pair.getKey() === other);
};
skipNodeProto.equals = function(other) {
  return (this.pair.getKey() === other.pair.getKey()) &&
    (this.pair.getVal() === other.pair.getVal());
};
skipNodeProto.getNewOp = function() {
  return this.newOp;
};
skipNodeProto.getNodeNum = function() {
  return this.nodeNum;
};
skipNodeProto.incrNodeNum = function(i) {
  this.nodeNum++;
};
skipNodeProto.getOptions = function() {
  return this.options;
};
skipNodeProto.updateNextPointer = function(longer, j) {
  this.pointer[j].hide();
  this.pointer[j] = this.jsav.pointer(" ", this.disArr, {
    targetIndex: j,
    left: -(longer - 1) * hztalDist + (-55),
    top: 22,
    arrowAnchor: "left center",
    fixed: false
    //"stroke-width": 2
  });
}
skipNodeProto.movePointerRight = function(lev, longer, t) {
  var point = this.pointer;
  for (var i = 0;
    (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
    var lef = this.pointer[i].options.left;
    this.pointer[i].hide();
    var d = -((this.nodeNum - longer) - 1) * hztalDist - 55;
    d = -d;
    this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
      targetIndex: i,
      left: (t == 0) ? lef - hztalDist : (d <= -lef) ? lef - hztalDist : lef,
      top: 22,
      arrowAnchor: "left center",
      fixed: false,
      "stroke-width": 2
    });
  }
};
skipNodeProto.decrNodeNum = function(i) {
  this.nodeNum--;
};
skipNodeProto.movePointerLeft = function(lev, longer, t) {
  var point = this.pointer;
  for (var i = 0;
    (i < (this.nodeLevel + 1) && point[i] !== null); i++) {
    var lef = this.pointer[i].options.left;
    this.pointer[i].hide();
    var d = -((this.nodeNum - longer)) * hztalDist - 55;
    d = -d;
    this.pointer[i] = this.jsav.pointer(" ", this.disArr, {
      targetIndex: i,
      left: (d > -lef) ? lef : lef + hztalDist,
      top: 22,
      arrowAnchor: "left center",
      fixed: false
    });
    this.pointer[i].css({
      "stroke-width": 2
    });
  }
}
skipNodeProto.updPter = function(i, opt) {
  this.pointer[i].hide();
  this.pointer[i] = this.jsav.pointer(" ", this.disArr, opt);
  this.pointer[i].css({
    "stroke-width": 2
  });
};
skipNodeProto.clear = function(i, pt) {
  
  for (var i = 0; i < this.nodeLevel + 1; i++) {
    this.pointer[i].hide();
  }
  if(showStep){
	  this.jsav.umsg("In this step, we disconnect all pointers that point to the value to be removed. The next step is to now connect these pointers to the ones that preceed the key, if any");
	  this.jsav.step();
	  this.jsav.umsg("The Skip List is now updated, with all nodes connected");
  }
  this.disArr.hide();
  this.val.hide();
  
};
skipNodeProto.setPointer = function(i, pt) {
  return this.pointer[i] = pt;
  this.pointer[i].css({
    "stroke-width": 2
  });
};
skipNodeProto.getLevel = function() {
  return this.nodeLevel;
};
skipNodeProto.getForward = function() {
  return this.forward;
};
skipNodeProto.getDispArr = function() {
  return this.disArr;
};
skipNodeProto.getPair = function(forward) {
  return this.pair;
};
skipNodeProto.toString = function() {
  if (this.pair === null) {
    return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
  } else if (this.pair.getVal() === null) {
    return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
  } else {
    return 'Node has depth ' + this.nodeLevel + ', Value ' +
      this.pair.toString();
  }
};
// ---------------------------------------------------------------------------
// Add interface for array methods
// ---------------------------------------------------------------------------

skipNodeProto.isHighlight = function(index, options) {
  this.disArr.isHighlight(index, options);
};

skipNodeProto.highlight = function(indices, options) {
  this.disArr.highlight(indices, options);
};

skipNodeProto.unhighlight = function(indices, options) {
  this.disArr.unhighlight(indices, options);
};

skipNodeProto.css = function(indices, cssprop, options) {
  this.disArr.css(indices, cssprop, options);
};

skipNodeProto.index = function(index) {
  this.disArr.index(index);
};

skipNodeProto.swap = function(index1, index2, options) {
  this.disArr.swap(index1, index2, options);
};
/*****************************************************************************************************
 * KVPair script implementation
 ****************************************************************************************************/

/**
 * @author Souleymane Dia
 * @version <05/24/2016>~ summer 2016
 * This represent the Key value pair script (KVPair) used in the SkipList implementation
 */
function KVPair(k, v) {
  this.key = k;
  this.value = v;
}
KVPair.prototype.getKey = function() {
  return this.key;
};
KVPair.prototype.getVal = function() {
  return this.value;
};
/** compare to KVPair value */
KVPair.prototype.compareTo = function kvlocaleCompare(otherKey) {
  var rsl = null;
  if (typeof(this.key) === 'number' && typeof(otherKey) === 'number') {
    rsl = this.key - otherKey;
    return rsl;
  } else if ((typeof(this.key) === 'number') || (typeof(otherKey) === 'number')) {
    throw new Error("illegal arguments: type mismatch");
  }
  rsl = first.localeCompare(otherKey);
  return rsl;
};
KVPair.prototype.toString = function kvToString() {
  if (this === null) {
    return 'null';
  }
  return '' + this.key;
};
