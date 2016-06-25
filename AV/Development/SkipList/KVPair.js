
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
