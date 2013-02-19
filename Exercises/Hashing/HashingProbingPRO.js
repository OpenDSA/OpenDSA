(function () {
  "use strict";
  var Hashing = {
    linearProbing: function (i) {
      return i;
    },
    quadraticProbing: function (i) {
      return i * i;
    },
    // randomize input for linear&quadratic probing, probefunction should be one of the above
    randomizeInputData: function (probeFunction, arr_size) {
      var tries = JSAV.utils.rand.sample([0, 1, 1, 1, 1, 2, 2, 2, 2, 3], 1)[0], // how many indices are tried before success
          valueMod = JSAV.utils.rand.numKey(0, arr_size), // which index to insert to
          arr = [], // store the hashtable in this array
          // correct position where the student needs to insert the input value
          inputCorrectPosition = (valueMod + probeFunction(tries)) % arr_size,
          input,
          val,
          count,
          solutionArray,
          reservedIndices = [inputCorrectPosition]; // for tracking which indices are in use
  
      arr.length = arr_size; // set the size of the array
      
      // randomize keys to the indices tested by the hash function; as many as we like the student
      // to think about (see tries above)
      for (var i = 0; i < tries; i++) {
        val = JSAV.utils.rand.numKey(10, 99) * 10 + (valueMod + probeFunction(i));
        arr[val % arr_size] = val;
        reservedIndices.push(val % arr_size); // make sure we don't overwrite this index
      }

      // randomize the input value for student
      input = JSAV.utils.rand.numKey(10, 99) * 10 + valueMod;

      // add a random number of other data into the hashtable
      for (i = 0, count = JSAV.utils.rand.numKey(3, Math.ceil(arr_size / 2)); i < count; i++) {
        val = JSAV.utils.rand.numKey(100, 999);
        // make sure we don't put anything especially to the correct position
        if (reservedIndices.indexOf(val % arr_size) === -1) {
          arr[val % arr_size] = val;
          reservedIndices.push(val % arr_size);
        } else {
          i--;
        }
      }
      // replace undefined values with empty strings because jsavArr.value(..) returns
      // empty strings and this makes comparison easier
      arr = $.map(arr, function (item, index) { return item || ""; });

      // create a duplicate for the solution and add the input to the array
      solutionArray = arr.slice(0);
      solutionArray[inputCorrectPosition] = input;

      // return an array (TODO: this is a bit hacky solution...)
      return [arr, input, solutionArray];
    }
  }; // end Hashing

  window.Hashing = Hashing;
})();
