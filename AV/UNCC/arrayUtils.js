// returns true if any cells in the array are highlighted
function arrHasHighlight(ar) {
	if (getHighlight(ar) == -1)
		return false;
	return true;
}

// add an array of values to a stack
function buildStackFromArr(arr, stack) {
  return buildStackFromArr(arr, arr.length, stack)
}

function buildStackFromArr(arr, stackSize, stack) {
    for (var i = 0; i < stackSize; i++)
        stack.addLast(arr[i])
    return stack
}

  // returns the index of the highlighted value if there is one
  function getHighlight(ar) {
    for (var i = 0; i < ar.size(); i++) {
      if (ar.isHighlight(i))
        return i;
    }
    return -1;
  }

// returns the number of indices with a given class
function countIndWithClass(ar, class_name) {
	var count = 0;
	for (var i = 0; i < ar.size(); i++) {
		if (ar.hasClass(i, class_name))
			count++;
	}
	return count;
}

// returns true if the given array has any indices of the given classes
function arrayHasClass(ar, class_name) {
  var count = countIndWithClass(ar, class_name)
  if (count > 0)
    return true
  return false
}

// clear the array of a given css class
function clearClassFromArr(ar, class_name) {
	for (var i = 0; i < ar.size(); i++) {
		if (ar.hasClass(i, class_name))
			ar.removeClass(i, class_name)
	}
}

// returns an array of the indices with a given css class
function getIndicesWithClass(ar, class_name) {
	var ind = [];
	for (var i = 0; i < ar.size(); i++) {
		if (ar.hasClass(i, class_name))
			ind.push(i);
	}
	return ind;
}

// returns first index in array with class
function getFirstIndWithClass(ar, class_name) {
	var ind = [];
	for (var i = 0; i < ar.size(); i++) {
		if (ar.hasClass(i, class_name))
			return i;
	}
	return -1;
}

  // returns the index of the first non-blank value, if it exists
  function lastValueIndex() {
    for (var i = userArr.size() - 1;  i > 0; i--) {
      if (userArr.value(i) != "")
        return i;
    }
  }

  // returns true if there is a highlighted empty cell in the array
  function emptyHighlight() {
    for (var i = 0; i < userArr.size(); i++) {
      if (userArr.isHighlight(i) && userArr.value(i) == "")
        return true;
    }
    return false;
  }
