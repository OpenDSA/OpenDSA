/**
 * @author Souleymane Dia
 * @version <06/26/2016>~ summer 2016
 * XXX: I mimic the ArrayTree datastructure implementation as closely as possible. In doing so
 * I implemented certain functions That I am not sure what they do. They have "????" next to them.
 * So anybody who know what they do can answer them in the comment or refer me to where I can read
 * about them.
 * This data structure is not ready for use 
 * Task to be completed:
 * support adding in the middle: ~completed
 * support removing from the middle and end ~completed
 * apply more defensinve programing to make sure arguments are passed in approprietly ~completed 
 * add more comments ~completed
 * makes the code more flexible by changing hardcoded values ~completed
 * delete debugging helpers codes ~completed
 * follow the naming convention and structure the class ~completed
 */
 (function($) {
    "use strict";
    if (typeof JSAV === "undefined") {
      return;
    }
	/********************************************************************
	 * Add the SkipList constructor to the public facing JSAV interface.
	 ********************************************************************/
	JSAV.ext.ds.skiplist = function (options){
		/**
		 * XXX: ???
		 * Add attribute to options
		 * - Set visibility by default to true.
		 * - set autorized by default to true.
		 *
		 * NOTE: these properties will be overriden if the provided 'options
		 * redefine them
		 */
		 var ex_options = $.extend(true, {visible: true, autoresize: true}, options);
		 // create a new SkipList object
		 return new SkipList(this, ex_options);
	}
	/**********************************************************************
	 * Implement SkipList data structure.
	 *********************************************************************/
    function SkipList(jsav, options) {
		this.init(jsav, options);
    };
	// XXX: ???
	JSAV.utils.extend(SkipList, JSAV._type.ds.List);
	
	// Get SkipList prototype
	var SkipListProto = SkipList.prototype;
	
	/**
	 * initialize the SkipList. Create an empty head
	 * @param jsav The JSAV object for this skiplist
	 * @param options Options to be passed to the skiplist structure
	 */
	SkipListProto.init = function (jsav, options){
		this.jsav = jsav; // set the jsav object for this tree
		this.level = 0; // level of the tree
		// use specific starting point and ending point
		this.options = $.extend({layout: "vertical", indexed: true, left: 80, top:20}, options);
		
		/**
		 * XXX: ???
		 * Generate the element where this SkipList is going to placed. The element 
		 * can either come from the options, which means that it already exist. 
		 * Otherwise it will be generated now by creating an empty div.
		 */
		var el = this.options.element || $("<div />");
		el.addClass("jsavautoresize jsavcenter jsavindexed jsavarray jsavverticalarray")
		// add all the options to the tree
		for (var key in this.options){
			// get the value of the key
			var val = this.options[key];
			/**
			 * XXX: ???
			 * Check if the value is valid 
			 * - The options objects has this key
			 * - The value is a string
			 * - The value is a number
			 * - The value is a boolean
			 */
			 if (this.options.hasOwnProperty(key) && typeof(val) === "string" || 
				typeof(val) === "number" || typeof(val) === "boolean"){
					// XXX ????
					// add the property to the element as a data attribute
					el.attr("data-" + key, val);
				}
		}
		/**
		 * XXX: ???
		 * Add the this skiplist's element to the DOM only if the element was not specify
		 * in the options (because that means it already exist).
		 */ 
		 if (!this.options.element){
			 $(this.jsav.canvas).append(el);
		 }
		 // set the element for this skiplist
		 this.element = el;
		// add auto-resize calss id options has property.
		if (this.options.autoresize){
			this.element.addClass("jsavautoresize");
		}
		// XXX: ???
		// Handle top, left, right, bottom options and positions the element accordingly
		JSAV.utils._helpers.handlePosition(this);
		// XXX: ???
		// Set the used constructors for this data structure
		// if the constructor weren't set, we would nee to override several 
		// functions that we are now inheriting.
		this.constructors = $.extend({
			List: SkipList,
			Node: SkipNode,
			KevVal: KVPair
		}, this.options.constructors);
		// create an empty SkipNode and set it as root
		this.head = new SkipNode(null, this.level + 1, this.jsav, this.options, 0);
		// XXX: ???
		// set the role of the skipnode to head
		// The roles can be used for instance to highlight the root with CSS
		this.head.element.attr("data-head-role", "root");
		//XXX: ????
		// set the root id to the SkipNode
		//this.element.attr({
		//"data-head": this.head.id(), "id": this.id()
		//});
		// show or hides the data structure based on options.visible
		// This is placed after the root node code, since the roots show function
		// will be call if the SkipList is visible
		JSAV.utils._helpers.handleVisibility(this, this.options);
		this.size = 0;
	};
/**	// even to register as function on array
	var event = ["clcik", "dblclick", "mousedown", "mousemove",
			"mouseup", "mouseenter", "mouseleave"];
	// ??? (are we just overiding these methodes from jsav library?) ~not sure why we need this function
	// return a function for the passed event type that binds a passed function
	// to that event type for indice in the array
	var eventhandler = function (eventType){
		// what are we returning here
		return function(data, handler);
		// store reference to this, needed when executing the handler
		var self = this;
		// bind a jQuery event handler, limit to .jsavindex
		this.element.on(eventType, ".jsavindex", function (e){
			//get the array of the clicked element
			// ??? (how does this get the click element?)
			var $curr = $(this),
			elem = $curr.data.("array"); // get the JSAV node object
			while (!elem){
				$curr = $curr.parent();
				elem = $curr.dara("array");
			}
			// get the index of the clicked element
			var index = elem.no
		}
	}
	*/
   
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
      head = new SkipNode(null, nLev, jsav, options, 0);
      for (var i = 0; i <= oldLev; i++) {
        head.getForward()[i] = oldHead.getForward()[i];
        head.getDispArr().value(i, oldHead.getDispArr().value(i));
      }
      return head;
    };
    /** insert a kv pair into a the SkipList */
    SkipListProto.insert = function(it) {
      if (!(it instanceof KVPair)) {
        throw new Error("illegal arguments Exception: arg must be of type KVPair")
      }
      var newLevel = randomLevel();
      if (this.level < newLevel) {
        this.head = adjustHead(newLevel, this.head, this.level, this.jsav,
          this.options);
        this.level = newLevel;
      }
      var update = new Array(this.level + 1);
      var x = this.head;
      for (var i = this.level; i >= 0; i--) { // Find insert position
        while ((x.getForward()[i] !== null) &&
          (x.getForward()[i] !== undefined) &&
          (it.compareTo((x.getForward()[i]).getPair().getKey())) > 0) {
          x = x.getForward()[i];
        }
        update[i] = x; // Track end at level i
      }
      var xfwrd = x.getForward()[0];
      if (xfwrd !== null) { // inserting in the middle
        var newOption = $.extend({}, xfwrd.getOptions());
        var i = 0;
        while (xfwrd !== null) {
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
      } else { // inserting at the end
        var newOption = {
          left: this.options.left + (this.size + 1) * 100,
          top: this.options.top,
          layout: "vertical"
        };
        insertEndHelper(it, x, update, newOption, this.jsav, newLevel);
      }
      this.size++; // Increment dictionary size
      return true;
    };
    /** helper function to insert in the middle */
    var insertMidHelper = function(it, x, update, newOption, jsav, newLevel) {
        x = new SkipNode(it, newLevel, jsav, newOption, (update[0].getNodeNum() + 1));
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
          x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
            targetIndex: j,
            left: -(longer - 1) * 100 - 85,
            top: 23,
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
        x = new SkipNode(it, newLevel, jsav, newOption, (update[0].getNodeNum() + 1));
        for (var j = 0; j <= newLevel; j++) { // Splice into list
          x.getForward()[j] = update[j].getForward()[j]; // Who x points to
          update[j].getForward()[j] = x; // Who y points to
          update[j].updateArrDis(j);
          var longer = (x.getNodeNum() - update[j].getNodeNum())
          x.setPointer(j, jsav.pointer(" ", x.getDispArr(), {
            targetIndex: j,
            left: -(longer - 1) * 100 - 85,
            top: 23,
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
        this.jsav.umsg("Searching for key: " + otherKey + " starting at the deepest level")
		unhigh[ind++] = x.getDispArr().highlight(j);
        this.jsav.step();
        for (var i = j; i >= 0; i--) { // go forward
          while ((x.getForward()[i] !== null) &&
            (otherKey, x.getForward()[i].getPair().compareTo(otherKey) < 0)) {
            var xfwr = x.getForward()[i];
            if (xfwr !== null) {
              unhigh[ind++] = xfwr.getDispArr().highlight(i);
			  
              this.jsav.umsg("we compare " + otherKey + " to the next record " +
                xfwr.getPair().getKey() + ". If what it points to is less, we move forward, else we go down a level");
              this.jsav.step();
            }
            x = x.getForward()[i];

          } // Go one last step
        }
		unhigh[ind++] = x.getDispArr().highlight(0);
        this.jsav.umsg("we go down to the lowest level");
        this.jsav.step();
        x = x.getForward()[0]; // Move to actual record, if it exists
        if (x !== null) {
          while ((x.equalKey(otherKey) === 0)) {
            result += x.getPair().getVal().toString();
            x = x.getForward()[0];
          }
          unhigh[ind++] = x.getDispArr().highlight(0);
          this.jsav.umsg("now we move to the record muching our key " + otherKey);
          this.jsav.step();
        } else {
          this.jsav.umsg("key " + otherKey + " not found");
		  this.jsav.step();
        }
		for (var i = 0; i < ind; i++){
			unhigh[i].unhighlight();
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
    SkipListProto.removeKey = function(otherKey) {
      var x = this.head;
      var removed = null;
      var update = new Array(this.level + 1);
      for (var j = this.level; j >= 0; j--) { // go forward
        while ((x.getForward()[j] !== null) &&
          (x.getForward()[j].getPair().compareTo(otherKey) < 0)) {
          x = x.getForward()[j];
        } // Go one last step
        update[j] = x;
      }
      if (x.getForward()[0] !== null &&
        (x.getForward()[0].getPair().compareTo(otherKey) === 0)) {
        removed = x.getForward()[0];
        for (var i = 0; i <= this.level; i++) { // Splice into list
          var upFwrd = update[i].getForward()[i];
          while (upFwrd != null &&
            (upFwrd.equalKey(otherKey)) && (removed.equals(upFwrd))) {
            if (upFwrd.getForward()[i] == null) {
              update[i].resetArrDis(i);
            }
            upFwrd = (upFwrd.getForward()[i]);
            update[i].getForward()[i] = upFwrd;
            break; // break so that it does not remove all duplicate
          } // Who x points to
        }
        this.size--; // Increment dictionary size
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
    var updateNxt = function(update, jsav) {
        for (var i = 0; i < update.length; i++) {
          var upFwrd = update[i].getForward();
          if (upFwrd[i] != null) {
            var longer = upFwrd[i].getNodeNum() - update[i].getNodeNum();
            opt = {
              targetIndex: i,
              left: -(longer - 1) * 100 - 85,
              top: 23,
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
	// ??? 
	this.element = this.options.nodeelement || $("<div><ol></ol></div>");
	this.element.addClass("jsavautoresize jsavcenter jsavindexed jsavarray jsavverticalarray");
	// set id ???
	//this.element.attr({"id": this.id()});
	// save this node in the DOM (used by the click handler) ???
	this.element.data("array", this);
	/// ????
	if (this.options.autoResize) {
      this.element.addClass("jsavautoresize");
    }
	// Add the Array Tree Node element to the Array Tree container.
    //this.container.element.append(this.element);

    // Create array for the skipnode and added to the skiplist element.
    this.arrayelement = $(this.element).find("ol");
    var array_options = $.extend(
      {element: this.arrayelement}, this.options);
	  
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
	this.newOp = $.extend(true, {autoresize: true}, this.options);
	this.newOp.indexed = false;
	this.newOp.top = -15;
	this.newOp.left = (this.options.indexed === true)? this.options.left + 8: this.options.left;
	if (this.pair === null){
		this.val = jsav.ds.array(['head'],this.newOp);
	}else{
		this.val = jsav.ds.array([p.toString() ],this.newOp);
	}
	JSAV.utils._helpers.handleVisibility(this, this.newOp);
}
var skipNodeProto = SkipNode.prototype;
skipNodeProto.updateDis = function(options, newOp) {
	this.val.hide();
	this.val = this.jsav.ds.array([ this.pair.toString() ], newOp);
	this.disArr.hide();
	this.disArr = this.jsav.ds.array(this.arr, options);
	this.val.show();
	this.disArr.show();
};
skipNodeProto.resetArrDis = function(i) {
	this.arr[i] = " \ -/";
	this.disArr.value(i, " \ -/");
};
skipNodeProto.updateArrDis = function(i) {
	this.arr[i] = " " ;
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
skipNodeProto.updateNextPointer = function(longer, j){
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
skipNodeProto.movePointerRight = function(lev, longer, t) {
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
skipNodeProto.decrNodeNum = function(i) {
	this.nodeNum--;
};
skipNodeProto.movePointerLeft = function(lev, longer, t) {
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
skipNodeProto.updPter = function(i, opt) {
	this.pointer[i].hide();
	this.pointer[i] = this.jsav.pointer(" ", this.disArr,opt);
	this.pointer[i].css({"stroke-width": 2});	
};	
skipNodeProto.clear = function(i, pt) {
	for (var i = 0; i < this.nodeLevel + 1; i++) {
		this.pointer[i].hide();
	}
	this.disArr.hide();
	this.val.hide();
};
skipNodeProto.setPointer = function(i, pt) {
	return this.pointer[i] = pt;
	this.pointer[i].css({"stroke-width": 2});	
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
	}
	else if (this.pair.getVal() === null) {
		return 'Node has depth ' + this.nodeLevel + ', Value (null) ';
	} else {
		return 'Node has depth ' + this.nodeLevel + ', Value '
				+ this.pair.toString();
	}
};
// ---------------------------------------------------------------------------
  // Add interface for array methods
  // ---------------------------------------------------------------------------
  
  skipNodeProto.isHighlight = function (index, options) {
    this.disArr.isHighlight(index, options);
  };

  skipNodeProto.highlight = function (indices, options) {
    this.disArr.highlight(indices, options);
  };

  skipNodeProto.unhighlight = function (indices, options) {
    this.disArr.unhighlight(indices, options);
  };

  skipNodeProto.css = function (indices, cssprop, options) {
    this.disArr.css(indices, cssprop, options);
  };

  skipNodeProto.index = function (index) {
    this.disArr.index(index);
  };

  skipNodeProto.swap = function (index1, index2, options) {
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
	}else if ((typeof(this.key) === 'number') || (typeof(otherKey) === 'number')){
		throw new Error("illegal arguments: type mismatch");
	}
	rsl = first.localeCompare(otherKey);
	return rsl;
};
KVPair.prototype.toString = function kvToString() {
	if (this === null){
		return '\/';
	}
	str = '' + this.key + ' | ' + this.value.toString()+ '';
	return str;
};
} (jQuery));
