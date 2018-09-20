// clear a given css from all matrix cells
function clearClassFromMatrix(matrix, w, h, class_name) {
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++)
		{
			if (matrix.hasClass(j, i, class_name))
				matrix.removeClass(j, i, class_name)
		}
	}
}

// get a css class's indices in the matrix in a 2D array
function get2DIndicesWithClass(matrix, w, h, class_name) {
	var ind = [];
	for (var i = 0; i < w; i++) {
		for (var j = 0; j < h; j++) {
			if (matrix.hasClass(j, i, class_name))
				ind.push([j, i])
		}
	}
	return ind;
}