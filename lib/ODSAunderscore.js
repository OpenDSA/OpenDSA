'use strict';



// The cornerstone, an `each` implementation, aka `forEach`.
// Handles objects with the built-in `forEach`, arrays, and raw objects.
function each (obj, iterator, context){
   if (obj === null) {
       return;
   }
   //check if the function in array.prototype applies
   if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach){
       obj.forEach(iterator, context);
       //test if obj is a array
   } else if (obj.length === Number(obj.length)) {
       for (var i = 0; i < obj.length; i++){
           //{} it is comparing the memory address and it is the way to break out of the loop
           if (i in obj && iterator.call(context, obj[i], i, obj) === {}){
               return;
           }
       }
   } else{
       //do what defined in context to all elements in obj
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
    //check if the function in array.prototype applies
    if (Array.prototype.some && obj.some === Array.prototype.some){
        return obj.some(iterator, context);
    }
    //
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
    //check if the function in array.prototype applies
    if (Array.prototype.map && obj.map === Array.prototype.map){
        return obj.map(iterator, context);
    }
    //iterates elements in the set
    each(obj, function(value, index, list){
        //returns the value of every iterates to the results array
        results[results.length] = iterator.call(context, value, index, list);
    });
    //return results
    if (obj.length === Number(obj.length)){
        results.length = obj.length;
    }
    return results;
}


// Return the first value which passes a truth test.
function find(obj, iterator, context){
    //stores the first element pass a test
    var result;
    //Traverse the data through the any and record the elements that pass the validation
    //(if you are checking the context return status in an iteration, it is more appropriate to use the each here.)
    any(obj, function(value, index, list){
        //If the result returned by the context is converted to a boolean type and the value is true,
        // the current record will return the current element
        if (iterator.call(context, value, index, list)){
            result = value;
            return result;
        }
    });
    return null;
}


// Return all the elements that pass a truth test.
//Similar to the find, the filter records all validated elements in the collection
function filter(obj, iterator, context){

    var results = [];
    if (obj === null){
        return results;
    }
    //check if the function in array.prototype applies
    if (Array.prototype.filter && obj.filter === Array.prototype.filter){
        return obj.filter(iterator, context);
    }
    //Iterate over the elements in the collection and put the elements that passed the context validation into the
    // array and return them
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
function bind(func, context) {
    var bound, args;
    //check if the function in array.prototype applies
    if(func.bind === Array.prototype.bind && Array.prototype.bind){
        return Array.prototype.bind.apply(func, Array.prototype.slice.call(arguments, 1));
    }
    //check func is a function
    if (Object.prototype.toString.call(func) !== '[object Function]'){
        return TypeError;
    }
    //Args variable stores the third starting parameter list of bind, which will
    // be passed to func function every time it is called
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
    //check if the function in array.prototype applies
    if (Array.prototype.reduce && obj.reduce === Array.prototype.reduce){
        if (context){
            iterator = bind(iterator, context);
            return i ? obj.reduce(iterator, memo) : obj.reduce(iterator);
        }
    }
    each(obj, function(value, index, list){
        //If there is no initial value, the first element is used as the initial value; if the object collection is
        // processed, the default value is the value of the first attribute
        if (i){
            memo = value;
            i = true;
        }else{
            //Record the processing results and pass them to the next iteration
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
        //Calculate and specify the element position n to the end of the array, and return it as a new array
        Array.prototype.slice.call(array, Math.max(array.length-n, 0));
    }else{
        //If n is not specified, or guard is true, only the last element is returned
        return array[array.length - 1];
    }
}

function contains(obj, target) {
    var found = false;
    if (obj === null){
        return found;
    }
    //check if the function in array.prototype applies
    if (Array.prototype.indexOf && obj.indexOf === Array.prototype.indexOf){
        return obj.indexOf(target) !== -1;
    }
    //By iterating the elements in the collection with the any, it is verified that the value and type of the elements
    // exactly match the target
    found = any(obj, function(value) {
        return value === target;
    });
    return found;
}


// Produce a duplicate-free version of the array. If the array has already
// been sorted, you have the option of using a faster algorithm.
function uniq(array, isSorted, iterator){
    //If the iterator is used, the data in the current array will be processed by iterator first, and a new array after
    // processing will be returned The new array is used as a benchmark for comparison
    var inital = iterator ? map(array, iterator) : array;
    var result = [];
    if (array.length < 3){
        isSorted = true;
    }
    //Reduce is used to iterate and accumulate the results The initial variable is the array to be
    // compared. It may be the original array or the result set of the iterator (if iterator has been set)
    reduce(inital, function (memo, el, i){
        //If the isSorted parameter is true, === is used directly to compare the last data in the record
        //If the isSorted parameter is false, the include method is used to compare with each data in the collection
       if (0 === i || (isSorted === true ? last(memo) !== el : contains(memo, el))){
           //Memo records the non duplicate data that has been compared
           //According to the state of iterator parameter, the data recorded in the memo may be the original data
           // or the data processed by the iterator
            memo[memo.length] = el;
            result[result.length] = array[i];
       }
       return memo;
    }, []);
    return result;
}

//A multidimensional number is combined into a one-dimensional array to support deep merging
function flatten(arr){
    return arr.reduce(function(prev, cur){
        return prev.concat(Array.isArray(cur) ? flatten(cur) : cur);
    },[]);
}

//The union works the same as the uniq, but the difference is that the union allows multiple arrays to be passed into
// the parameter
function union(){
    return uniq(flatten(arguments));
}


//Filter and return the difference data in the current array that is not equal to the specified data
//This function is generally used to delete the data specified in the array and get the new array after deletion
//Difference is similar to withOut.But the parameter of without formally does not allow data to be included in the array.
function difference(array){
    //Merge all parameters starting with the second parameter as an array
    // (merge only the first layer, not the deep layer)
    //Rest variable stores validation data, which is used to compare with the original data in this method
    var remain = flatten(Array.prototype.slice.call(arguments, 1));
    return filter(array, function(value){return !contains(remain, value);});
}

// Return a version of the array that does not contain the specified value(s).
function withOut(array){
    difference(array, Array.prototype.slice.call(arguments, 1));
}

//Traverses an array of object lists and returns a list of values for the specified attribute in each object
function pluck(obj, key){
    //If the property does not exist in an object, undefined is returned
    return map(obj, function(value){return value[key];});
}

// Sort the object's values by a criterion produced by an iterator.
//did not understand it.
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


//Returns true if all elements in the collection can pass context validation
function every(obj, iterator, context){
    var result = true;
    if (obj === null){
        return result;
    }
    //check if the function in array.prototype applies
    if (Array.prototype.every && obj.every === Array.prototype.every){
        return obj.every(iterator, context);
    }
    //Traverse using each
    each(obj, function(value, index, list){
        //This part can view as result = (result)&& iterator.call (context, value, index, list))
        //Verify whether the result of the context is true after it is converted to boolean type
        if (!(result = result && iterator.call(context, value, index, list))){
            return {};
        }
    });
    return result;
}


//Searches for the first occurrence of an element in the array, and returns - 1 if the element does not exist
//Use = = = to match elements when searching
function indexOf(array, item, isSorted){
    if (array === null){
        return -1;
    }
    var i;
    //check if the function in array.prototype applies
    if (Array.prototype.indexOf && array.indexOf === Array.prototype.indexOf){
        return array.indexOf(item);
    }
    //Loop and return the location where the element first appears
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
    //rest record other array objects that need to be compared
    var rest = Array.prototype.slice.call(arguments, 1);
    //Uniq is used to remove the duplicate data in the current array to avoid repeated calculation
    //The data of the current array is filtered by the iterator, and the qualified data (comparing the same elements)
    //is returned
    return filter(uniq(array), function(item){
        //Use the every to verify that each array contains data that needs to be compared
        //If all arrays contain comparison data, all of them will return true.
        //If any array does not contain the element, it will return false
        return every(rest, function(other){
            //other stores each array that needs to be compared
            //Item stores the data that needs to be compared in the current array
            //Use the indexof method to search whether the element exists in the array
            return indexOf(other, item) >= 0;
        });
    });
}