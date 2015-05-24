"use strict";

var hdFunc="fp.hd";
var tlFunc="fp.tl";
var consFunc="fp.cons";
var maxInt=10;
var maxLength;

/*  data structures for list expressions */
function Num(n) {
    this.tag="num";
    this.value=n;
}
function Head(list) {
    this.tag="hd";
    this.list=list;
}
function Tail(list) {
    this.tag="tl";
    this.list=list;
}
function Cons(n,list) {
    this.tag="cons";
    this.hd=n;
    this.tl=list;
}
function CstList(name) {
    this.tag="cstList";
    this.name=name;
}
Num.prototype.toString = function() {
    return String(this.value);
};
Head.prototype.toString = function() {
    return hdFunc + "(" + this.list.toString() + ")";
};
Tail.prototype.toString = function() {
    return tlFunc + "(" + this.list.toString() + ")";
};
Cons.prototype.toString = function() {
    return consFunc + "(" + this.hd.toString() + "," + this.tl.toString() + ")";
};
CstList.prototype.toString = function() {
    return this.name;
};

/* random generation of list expressions */
function genRndNum() {
    return new Num(Math.floor(Math.random()*maxInt));
}
function genRndHead() {
    return new Head( genRndList() );
}
function genRndTail() {
    return new Tail( genRndList() );
}
function genRndCons() {
    return new Cons( genRndInt(), genRndList() );
}
function genRndInt() {
    if (Math.random() > 0.5) {
	return genRndNum();
    } else {
	return genRndHead();
    }
}
function genRndList() {
    if (Math.random() < 0.33) {
	return genRndCons();
    } else if (Math.random() < 0.66) {
	return genRndTail();
    } else {
	return genRndCstList();
    }
}
function genRndListOfNumbers(length) {
    var result = [];
    for(var i = 0; i<length; i++) {
	result.push(Math.floor(Math.random()*maxInt));
    }
    return result;
}
function genRndCstList() {
    if (Math.random() > 0.5) {
	return new CstList("l1");
    } else {
	return new CstList("l2");
    }
}
maxLength = 5 + Math.floor(Math.random()*6);
var l1 = genRndListOfNumbers(maxLength);
maxLength = 5 + Math.floor(Math.random()*6);
var l2 = genRndListOfNumbers(maxLength);
console.log( l1 );
console.log( l2 );
console.log( genRndList().toString() );
