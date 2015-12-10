/* API for adding a hook, created by David Pritchard

 An external user should call
add_pytutor_hook("hook_name_here", function(args) {...})
 args will be a javascript object with several named properties;
 this is meant to be similar to Python's keyword arguments.

 The hooked function should return an array whose first element is a boolean:
 true if it completely handled the situation (no further hooks
 nor the base function should be called); false otherwise (wasn't handled). 
 If the hook semantically represents a function that returns something,
 the second value of the returned array is that semantic return value.

 E.g. for the Java visualizer a simplified version of a hook we use is:

add_pytutor_hook(
  "isPrimitiveType", 
  function(args) {
    var obj = args.obj; // unpack
    if (obj instanceof Array && obj[0] == "CHAR-LITERAL")
      return [true, true]; // yes we handled it, yes it's primitive
    return [false]; // didn't handle it, let someone else
  });

 Hook callbacks can return false or undefined (i.e. no return
 value) in lieu of [false]. 

 NB: If multiple functions are added to a hook, the oldest goes first.
*/

var add_pytutor_hook = function(hook_name, func) {
  if (pytutor_hooks[hook_name])
    pytutor_hooks[hook_name].push();
  else
    pytutor_hooks[hook_name] = [func];
}

// this is global in order to reach static functions like isPrimitiveType
var pytutor_hooks = {}; // keys, hook names; values, list of functions

/*
try_hook(hook_name, args): how the internal codebase invokes a hook. 
 args will be a javascript object with several named properties;
 this is meant to be similar to Python's keyword arguments.
 E.g., 

function isPrimitiveType(obj) {
  var hook_result = try_hook("isPrimitiveType", {obj:obj});
  if (hook_result[0]) return hook_result[1];
  // go on as normal if the hook didn't handle it

 Although add_pytutor_hook allows the hooked function to 
 return false or undefined, try_hook will always return
 something with the strict format [false], [true] or [true, ...].
*/

var try_hook = function(hook_name, args) {
  if (pytutor_hooks[hook_name]) {
    for (var i=0; i<pytutor_hooks[hook_name].length; i++) {

      // apply w/o "this", and pack sole arg into array as required by apply
      var handled_and_result 
        = pytutor_hooks[hook_name][i].apply(null, [args]); 

      if (handled_and_result && handled_and_result[0]) 
        return handled_and_result;
    } 
  }
  return [false];
}

