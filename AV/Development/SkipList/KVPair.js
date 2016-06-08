
/**
 * @author Souleymane Dia
 * @version <05/24/2016>~ summer 2016
 * see SkipList file comments before use
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
var isNum = function(str) {
	str = !isNaN(parseInt(str));
	return str;
};
var compareTo = function (first, sec){
	str = isNum(sec);
	if (str === true) {
		rsl = first - sec;
		return rsl;
	}
	rsl = first.localeCompare(sec);
	return rsl;
};
// add case where there is a type mismatch
KVPair.prototype.compareTo = function kvlocaleCompare(otherKey) {
	str = isNum(otherKey);
	if (str === true) {
		rsl = this.key - otherKey;
		return rsl;
	}
	rsl = this.key.localeCompare(otherKey);
	return rsl;
};

KVPair.prototype.toString = function kvToString() {
	if (this === null){
		return '\/';
	}
	str = '' + this.key + ' | ' + this.value.toString()+ '';
	return str;
};

