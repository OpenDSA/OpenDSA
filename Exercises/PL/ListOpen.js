/* global console */
(function() {
  "use strict";

  var listOpen = {
    getSetupText: function() {
      return setupText;
    },

    getAnswerListOpen: function() {
      return question.answer;
    },

    initJSAV: function() {
      console.log("Hello");
      var jsav = new JSAV("ListOpen");
      console.log("Hello X");
      var maxLength = 3 + Math.floor(Math.random() * 6);
      L1 = genRndListOfNumbers(maxLength);
      maxLength = 3 + Math.floor(Math.random() * 6);
      L2 = genRndListOfNumbers(maxLength);
      console.log("Hello Y");

      while (true) {
        exp = genRndList().toString();
        if (exp.length > 20 && exp.length < 55) {
          break;
        }
      }
      renameListConstants();
      try {
        question.answer = String(eval(exp)).replace(/\s+/g, "").split("");
        question.answer = "\\s*\\[\\s*" + question.answer.join("\\s*") + "\\s*\\]\\s*";
      } catch (e) {
        question.answer = "\\s*error\\s*";
      }
      console.log("Hello 1");
      jsav.code(exp, {
        lineNumbers: false
      });
      jsav.displayInit();
      jsav.recorded();
      console.log("Done");
    }
  };

  var question = {};

  var hdFunc = "fp.hd";
  var tlFunc = "fp.tl";
  var consFunc = "fp.cons";
  var maxInt = 10; // all list elements will be non-negative integers less than this value
  var maxLength; // all list constants will have a length less than this value
  var L, L1, L2;
  var exp; // an expression to evaluate
  var setupText; // initial part of the question text describing list constants

  /*  data structures for list expressions */
  function Num(n) {
    this.tag = "num";
    this.value = n;
  }

  function Head(list) {
    this.tag = "hd";
    this.list = list;
  }

  function Tail(list) {
    this.tag = "tl";
    this.list = list;
  }

  function Cons(n, list) {
    this.tag = "cons";
    this.hd = n;
    this.tl = list;
  }

  function CstList(name) {
    this.tag = "cstList";
    this.name = name;
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
    return new Num(Math.floor(Math.random() * maxInt));
  }

  function genRndHead() {
    return new Head(genRndList());
  }

  function genRndTail() {
    return new Tail(genRndList());
  }

  function genRndCons() {
    return new Cons(genRndInt(), genRndList());
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
    for (var i = 0; i < length; i++) {
      result.push(Math.floor(Math.random() * maxInt));
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

  function renameListConstants() {
    var containsL1, containsL2;
    if (exp.indexOf("L1") > -1) {
      containsL1 = true;
    }
    if (exp.indexOf("L2") > -1) {
      containsL2 = true;
    }
    if (containsL1 && containsL2) {
      setupText = "Given that L1 = [" + L1 + "] and L2 = [" + L2 + "], what ";
    } else if (containsL1 || containsL2) {
      if (containsL1) {
        exp = exp.replace(/L1/g, "L");
        L = L1;
      } else {
        exp = exp.replace(/L2/g, "L");
        L = L2;
      }
      setupText = "Given that L = [" + L + "], what ";
    } else {
      setupText = "What ";
    }
  }

  window.listOpen = window.listOpen || listOpen;
}());
