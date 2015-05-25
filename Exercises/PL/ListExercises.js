"use strict";

/* global console */

var hdFunc="fp.hd";
var tlFunc="fp.tl";
var consFunc="fp.cons";
var maxInt=10;  // all list elements will be non-negative integers less than this value
var maxLength;  // all list constants will have a length less than this value
var L1, L2;

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
	return new CstList("L1");
    } else {
	return new CstList("L2");
    }
}



/*
maxLength = 5 + Math.floor(Math.random()*6);
var l1 = genRndListOfNumbers(maxLength);
maxLength = 5 + Math.floor(Math.random()*6);
var l2 = genRndListOfNumbers(maxLength);
console.log( l1 );
console.log( l2 );
console.log( genRndList().toString() );
*/

var exp;

function getSetupText() {
    var containsL1, containsL2;
    if (exp.indexOf("L1") > -1) {
	containsL1 = true;
    }
    if (exp.indexOf("L2") > -1) {
	containsL2 = true;
    }
    if (containsL1 && containsL2) {
	return "Given that L1 = [" + l1 + "] and L2 = [" + l2 + "], what ";
    } else if (containsL1) {
	return "Given that L1 = [" + l1 + "], what ";
    } else if (containsL2) {
	return "Given that L2 = [" + l2 + "], what ";
    } else {
	return "What ";
    }
}

function initListExerciseOpen() {

    var answer;
    var jsav = new JSAV("jsav", {"animationMode": "none"});
    var maxLength = 5 + Math.floor(Math.random()*6);
    L1 = genRndListOfNumbers(maxLength);
    maxLength = 5 + Math.floor(Math.random()*6);
    L2 = genRndListOfNumbers(maxLength);

    while (true) {
	exp = genRndList().toString();
	if ( exp.length > 15 && exp.length < 45 ) {
	    break;
	}
    }
    answer = eval(exp);

/*    question.answer = answer.replace(/@|\#/g,"a").replace(/\s+/g,"").replace(/\u03BB/g,"^").split("");
    question.answer = ("\\s*" + question.answer.join("\\s*") + "\\s*")
	.replace(/\^/g,"\\^").replace(/\./g,"\\.").replace(/\(/g,"\\(")
	.replace(/\)/g,"\\)");
*/
}

function getAnswerListExerciseOpen() {
    //return question.answer;
}


