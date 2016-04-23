"use strict";

/* global exports */

var is = {};

(function(exports){

  var thaw = function (thunk) { return thunk(); };

  /** construct an infinite sequence
      @param {integer} x - the integer at the start of the sequence
      @param {function} thunk - the function to be frozen for lazy evaluation
      @return {sequence} the resulting infinite sequence
  */
  var cons = function (x, thunk) {
    return [x, thunk];
  };

  /** get the first integer in an infinite sequence
      @param {sequence} inf_seq - the infinite sequence
      @return {integer} the first integer in the sequence
  */
  var hd = function (seq) {
    return seq[0];
  };

  /** get the remainder of the infinite sequence after the first element
      @param  {sequence} inf_seq - the infinite sequence
      @return {sequence} the infinite sequence that follows the first element
  */
  var tl = function (seq) {
    return thaw(seq[1]);
  };

  /** get a sequence of successive integers from a specified starting
      point

      @param {integer} k - the starting point
      @return {sequence} the infinite sequence of successive integers starting with
      k.
      @example from(6) returns 6, 7, 8, 9, ...
  */
  var from = function (k) {
    return cons(k, function () { return from(k+1); });
  };

  /** evaluate and return a finite portion of the sequence
      @param {sequence} seq - the infinite sequence
      @param  {integer} n - the number of items from seq to evaluate
      @return {array} an array with the first n evaluated members of the sequence
  */
  var take = function (seq, n) {
    if (n === 0)
      return [];
    else {
      var result = take(tl(seq), n - 1).slice(0);
      result.unshift(hd(seq));
      return result;
    }
  };

  /** get a new sequence formed by removing the first n items in an infinite sequence
      @param  {sequence} seq - the infinite sequence
      @param  {integer} n - the number of items to be removed
      @return {sequence} a sequence formed by removing the first n items from seq
  */
  var drop = function (seq, n) {
    if (n === 0)
      return seq;
    else {
      return drop(tl(seq), n - 1);
    }
  };

  /** produce a new sequence by mapping a function onto a given sequence
      @param  {function} f - the mapping function
      @param {sequence} seq - the sequence x0, x1, x2, ... onto which
      the mapping function is to be applied
      @return  {sequence} the sequence f(x0), f(x1), f(x2), ....
  */
  var map = function (f, seq) {
    return cons (f(hd(seq)),
                 function ()  {
                   return map (f, tl(seq));
                 });

  };

  /** produce a new sequence by filtering a given sequence
      @param  {function} pred - the filtering predicate
      @param {sequence} seq - the sequence x0, x1, x2, ... that is to
      be filtered
      @return {sequence} the sequence consisting of all elements from
      seq for which the predicate returns true
  */
  var filter = function (pred, seq) {
    if (pred(hd(seq))) {
      return cons (hd(seq),
                   function () {
                     return filter(pred, tl(seq));
                   });
    } else {
      return filter(pred, tl(seq));
    }
  };

  /** produce a new sequence by repeatedly applying a function to the
      previous term of the sequence whose hd is specified
      @param {function} f - the function to iterate
      @param {integer} x - the integer that is to be the head of the
      returned sequence
      @return  {sequence} the sequence x, f(x), f(f(x)), f(f(f(x))) ....
  */

  var iterates = function (f, x) {
    return cons(x, function () { return iterates(f, f(x)); });
  };

  exports.cons = cons;
  exports.hd = hd;
  exports.tl = tl;
  exports.from = from;
  exports.take = take;
  exports.drop = drop;
  exports.map = map;
  exports.filter = filter;
  exports.iterates = iterates;

})(typeof exports === 'undefined' ? is : exports);
