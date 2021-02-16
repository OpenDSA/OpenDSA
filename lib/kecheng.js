'use strict';

// The cornerstone, an `each` implementation, aka `forEach`.
// Handles objects with the built-in `forEach`, arrays, and raw objects.
function each (obj, iterator, context){
   if (obj === null) {
       return;
   }
   if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach){
       obj.forEach(iterator, context);
   } else if (typeof obj.length == 'number') {
       for (var i = 0; i < obj.length; i++){
           if (i in obj && iterator.call(context, obj[i], i, obj) === {}){
               return;
           }
       }
   } else{
       for (var key in obj){
           if (Object.prototype.hasOwnProperty(key)){
               if (iterator.call(context, obj[key], key, obj) === {}){
                   return;
               }
           }
       }
   }
}

// Determine if at least one element in the object matches a truth test.
function any (obj, iterator, context){
    var  result= false;
    if (obj === null){
        return result;
    }
    if (Array.prototype.some && obj.some === Array.prototype.some){
        return obj.some(iterator, context);
    }
    each (obj, function(value, index, list){
        if (result || (result = iterator.call(context, value, index, list))){
            return {};
        }
    });
    return !!result;
}

// Return the results of applying the iterator to each element.
function map(obj, iterator, context){
    var results = [];
    if (obj === null){
        return results;
    }
    if (Array.prototype.map && obj.map === Array.prototype.map){
        return obj.map(iterator, context);
    }
    each(obj, function(value, index, list){
        results[results.length] = iterator.call(context, value, index, list);
    });
    if (typeof obj.length == 'number'){
        results.length = obj.length;
    }
    return results;
}


// Return the first value which passes a truth test.
function find(obj, iterator, context){
    var result;
    any(obj, function(value, index, list){
        if (iterator.call(context, value, index, list)){
            result = value;
            return result;
        }
    });
    return null;
}


// Return all the elements that pass a truth test.
function filter(obj, iterator, context){

    var results = [];
    if (obj === null){
        return results;
    }
    if (Array.prototype.filter && obj.filter === Array.prototype.filter){
        return obj.filter(iterator, context);
    }
    each(obj, function(value, index, list){
        if (iterator.call(context, value, index, list)){
            results[results.length] = value;
        }
    });

}

// Reusable constructor function for prototype setting.
var Ctor = function(){};


// Create a function bound to a given object (assigning `this`, and arguments,
// optionally). Binding with arguments is also known as `curry`.
// Delegates to **ECMAScript 5**'s native `Function.bind` if available.
function bind(func, context){
    var bound, args;
    if(func.bind === Array.prototype.bind && Array.prototype.bind){
        return Array.prototype.bind.apply(func, Array.prototype.slice.call(arguments, 1));
    }
    if (Object.prototype.toString.call(func) !== '[object Function]'){
        return TypeError;
    }
    args = Array.prototype.slice.call(arguments, 2);
    return function(){
        if(!(this instanceof  bound)){
            return func.apply(context, args.concat(Array.prototype.slice(arguments)));
        }
        Ctor.prototype = func.prototype;
        var self = new Ctor();
        var result = func.apply(self, args.concat(Array.prototype.slice.call(arguments)));
        if (Object(result) === result){
            return result;
        }
        return self;
    };
}


// **Reduce** builds up a single result from a list of values, aka `inject`,
// or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
function reduce(obj, iterator, memo, context){
    var i = arguments.length > 2;
    if (obj === null){
        obj = [];
    }
    if (Array.prototype.reduce && obj.reduce === Array.prototype.reduce){
        if (context){
            iterator = bind(iterator, context);
            return i ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
    }
    each(obj, function(value, index, list){
        if (i){
            memo = value;
            i = true;
        }else{
            memo = iterator.call(context, memo, value, index, list);
        }
    });
    if (!i){
        throw new TypeError('Reduce of empty array with no initial value');
    }
    return memo;
}

// Get the last element of an array. Passing **n** will return the last N
// values in the array. The **guard** check allows it to work with `_.map`.
function last (array, n, guard){
    if (n !== null && !guard){
        Array.prototype.slice.call(array, Math.max(array.length-n, 0));
    }else{
        return array[array.length - 1];
    }
}

function contains(obj, target) {
    var found = false;
    if (obj === null){
        return found;
    }
    if (Array.prototype.indexOf && obj.indexOf === Array.prototype.indexOf){
        return obj.indexOf(target) !== -1;
    }
    found = any(obj, function(value) {
        return value === target;
    });
    return found;
}


// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
function uniq(array, isSorted, iterator){
    var inital = iterator ? map(array, iterator) : array;
    var result = [];
    reduce(inital, function (memo, el, i){
       if (0 === i || (isSorted === true ? last(memo) !== el : contains(memo, el))){
            memo[memo.length] = el;
            result[result.length] = array[i];
       }
       return memo;
    }, []);
    return result;
}

function flatten(arr){
    return arr.reduce(function(prev, cur){
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
    },[]);
}

function union(){
    return uniq(flatten(arguments));
}

function difference(array){
    var remain = flatten(Array.prototype.slice.call(arguments, 1));
    return filter(array, function(value){return !contains(remain, value);});
}

// Return a version of the array that does not contain the specified value(s).
function withOut(array){
    difference(array, Array.prototype.slice.call(arguments, 1));
}

function pluck(obj, key){
    return map(obj, function(value){return value[key];});
}

// Sort the object's values by a criterion produced by an iterator.
function sortBy(obj, iterator, context){
    return pluck(map(obj, function(value, index, list){
        return{
            value : value,
            criteria: iterator.call(context, value, index, list)
        };
    }).sort(function(left, right){
        var a = left.criteria, b = right.criteria;
        return a < b ? -1 : a > b ? 1 : 0;
    }),'value');
}

function every(obj, iterator, context){
    var result = true;
    if (obj === null){
        return result;
    }
    if (Array.prototype.every && obj.every === Array.prototype.every){
        return obj.every(iterator, context);
    }
    each(obj, function(value, index, list){
        if (!(result = result && iterator.call(context, value, index, list))){
            return {};
        }
    });
    return result;
}

function indexOf(array, item, isSorted){
    if (array === null){
        return -1;
    }
    var i;
    if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf){
        return array.indexOf(item);
    }
    for (i = 0; i < array.length; i++){
        if (i in array && array[i] === item){
            return i;
        }
    }
    return -1;
}



// Produce an array that contains every item shared between all the
// passed-in arrays.
function intersection(array){
    var rest = Array.prototype.slice.call(arguments, 1);
    return filter(uniq(array), function(item){
        return every(rest, function(other){
            return indexOf(other, item) >= 0;
        });
    });
}