
function /**
			 * @author Souleymane Dia
			 * @version <05/24/2016>~ summer 2016
			 * This data structure is not ready for use 
			 * Task to be completed:
			 * support adding in the middle
			 * support removing from the middle and end
			 * apply more defensinve programing to make sure arguments are passed in approprietly 
			 * follow the naming convention
			 * makes the code more flexible by changing hardcoded values
			 * delete debugging helpers codes
			 * add more comments
			 */
SkipList(jsav, options) {
	this.jsav = jsav;
	this.level = 0;
	this.options = options;
	this.pointer = null;
	this.head = new SkipNode(null, this.level + 1, this.jsav, this.options,
			this.pointer,0);
	this.size = 0;
}
/**
 * generate a random value
 */
var randomLevel = function() {
	var lev = 0;
	var rand = function() {
		return Math.floor(Math.random() * 257);
	};
	for (lev = 0; (rand() % 2) === 0; lev++) {
	}
	return lev;
};
/**
 * adjust the depht of the head if needed
 */
var adjustHead = function(nLev, head, oldLev, jsav, options, pointer) {
	var oldHead = head;
	head = new SkipNode(null, nLev, jsav, options, pointer,0);
	for (var i = 0; i <= oldLev; i++) {
		head.getForward()[i] = oldHead.getForward()[i];
		head.getDispArr().value(i, oldHead .getDispArr().value(i));
	}
	return head;

};
// insert // we can get rid of k
/**
 * insert a kv pair into a the SkipList
 */
SkipList.prototype.insert = function(it, options, newVal) {
	var newLevel = newVal; // randomLevel();
	if (this.level < newLevel) {
		this.head = adjustHead(newLevel, this.head, this.level, this.jsav,
				this.options, this.pointer);
		// console.log('in head = ' + this.head.toString());
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
		//console.log('head store in updarte [ i ] = ' + x.toString());
		update[i] = x; // Track end at level i
	}
	var newOption = {left:this.options.left + (this.size + 1) * 100,
		top: this.options.top,
		layout: "vertical"
		};
	x = new SkipNode(it, newLevel, this.jsav, newOption, null, (update[0].getNodeNum() + 1));
	for (var j = 0; j <= newLevel; j++) { // Splice into list
		x.getForward()[j] = update[j].getForward()[j]; // Who x points to
		update[j].getForward()[j] = x; // Who y points to
		update[j].getDispArr().value(j, " ");
		var longer = (x.getNodeNum() - update[j].getNodeNum())
		update[j].setPointer(this.jsav.pointer("", x.getDispArr().index(j), {
			//anchor: "center",
			left: (longer > 1)? longer * (-72) - (longer - 1)* 33: longer * (-77),
			top: 30,
			arrowAnchor: "left center"
			}));
	}
	this.size++; // Increment dictionary size
	// console.log(this.size);
	return true;
};

/**
 * 
 * @returns {String} of the content of the SkipList
 */
SkipList.prototype.dump = function() {
	var lHead = this.head;
	var result = '<br>';
	while (lHead !== null) {
		// console.log(lHead.toString());
		result += lHead.toString() + '<br>';
		// console.log(lHead.toString());
		lHead = lHead.getForward()[0];
	}
	return result + "SkipList size is: " + this.size;
};

/**
 * XXX The message diplaying require some null checking for displaying
 * search for a particular key
 */
SkipList.prototype.search = function(otherKey) {
	var result = "<br>";
	var x = this.head; // Dummy header node
	var j = this.level;
	this.jsav.umsg("now to search for key "+ otherKey + ", we start where the deepest level of the head points to: " + x.getForward()[j].getPair().getKey());
	this.jsav.step();
	for (var i = this.level; i >= 0; i--) {
		// go forward
		
		while ((x.getForward()[i] != null)
				&& (compareTo(otherKey, x.getForward()[i].getPair().getKey()) > 0)) {
			x = x.getForward()[i];
			this.jsav.umsg("next we visit: "+ x.getForward()[i].getPair().getKey());
			x.getDispArr().highlight(i);
			this.jsav.step();
			if (x.getForward()[i].getForward()[i] === null){
				x.getForward()[i].getDispArr().highlight(i);
				this.jsav.umsg("but this key is bigger than the value we are looking for, so we go down a level from our current location");
			}
		} // Go one last step
	}
	this.jsav.step();
	x = x.getForward()[0]; // Move to actual record, if it exists
	x.getDispArr().highlight(0);
	this.jsav.step();
	while ((x != null) && (compareTo(otherKey, x.getPair().getKey()) === 0)) {
		result += x.getPair().getVal().toString() + "<br>";
		x = x.getForward()[0];
	}
	return result;
}

/**
 * helper function to find specific value in the SkipList
 */
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

/**
 * 
 * @param otherKey the key to be removed
 * @returns the key removed if present
 */
SkipList.prototype.removeKey = function(otherKey) {
	var x = this.head;
	var removed = null;
	var update = new Array(this.level + 1);
	for (var j = this.level; j >= 0; j--) {
		// go forward
		while ((x.getForward()[j] !== null)
				&& (compareTo(otherKey, x.getForward()[j].getPair().getKey()) > 0)) {
			x = x.getForward()[j];

		} // Go one last step
		update[j] = x;
		// break;
	}
	if (x.getForward()[0] !== null
			&& compareTo(otherKey, x.getForward()[0].getPair().getKey()) === 0) {
		removed = x.getForward()[0];
		// x = x.getForward()[0];
		for (var i = 0; i <= this.level; i++) { // Splice into list
			while (update[i].getForward()[i] != null
					&& compareTo(otherKey, update[i].getForward()[i].getPair()
							.getKey()) === 0) {
				// if (update[i].getForward()[i] != null) {

				update[i].getForward()[i] = (update[i].getForward()[i]
						.getForward()[i]);
				// break so that it does not remove all duplicate
				break;
				// }
			} // Who x points to
		}
		this.size--; // Increment dictionary size
		return removed.getPair();
	} else {
		return null;
	}
};
/**
 * 
 * @param otherVal value to remove from the SkipList
 * @returns the value removed from the SkipList
 */
SkipList.prototype.removeVal = function(otherVal) {
	var x = this.head;
	var result = find(otherVal, x);
	if (result == null) {
		return null;
	} else {
		return this.removeKey(result.getKey());
	}
}
