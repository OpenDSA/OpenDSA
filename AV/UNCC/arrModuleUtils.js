

// create an array only containing values NOT found in another array
function buildArrayUniqueValues(arr, stackSize) {
 var stack_arr = []
  var last_value = arr[arr.length - stackSize - 1]
  var first_value = arr[0]
  var new_value = Math.floor(Math.random() * (last_value - first_value)) + first_value
  for (var i = 0; i < stackSize; i++) {
    while (arr.includes(new_value) || stack_arr.includes(new_value))
      new_value = Math.floor(Math.random() * (last_value - first_value)) + first_value
    stack_arr[i] = new_value
  }
  return stack_arr
}

function createStackLayout(av) {
    return av.ds.stack({
        center: true,
        xtransition: 5,
        ytransition: -3
    });
}

function createArrayLayout(av, arr, isIndexed, lyt) {
  return av.ds.array(arr, {
    indexed: isIndexed,
    layout: lyt
  });
}

// create a random sorted array with no repeating numbers
function genArrNoRepeat(max, size) {
	var array = []
	array.length = size
	for (var i = 0; i < size; i++) {
		var new_value = Math.floor(Math.random() * max);
		while (array.includes(new_value))
			new_value = Math.floor(Math.random() * max);
		array[i] = new_value;
	}
	array.sort(function(a, b){return a-b})
	return array;
}

// shift a highlight from one cell to another
function moveHighlight(old_pos, new_pos, arr) {
  arr.highlight(new_pos)
  arr.unhighlight(old_pos)
}
