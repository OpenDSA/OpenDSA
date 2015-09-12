(function() {
    var jsav, // The JSAV object
        arr_size, // Full array size
        jsavarr_answer, // JSAV array that holds answer
        jsavarr_left, // JSAV array that holds left data
        jsavarr_right, // JSAV array that holds right dtaa
        userInput, // Boolean: Tells us if user ever did anything
        arrdata = [], // The array to be sorted
        arrdata_left = [], // Left side data to merge
        arrdata_right = [], // Right side data to merge
        empty = [], // Dummy for empty data to reset answer array
        left_size, // Size of left array
        isSelected, // Boolean: True iff user has already clicked an array element
        rowHeight = 80, // Space required for each row to be displayed
        rowTop = 30, // Position for top array
        blockWidth = 32, // Width of an array element
        // Variables used to keep track of the index and array of the
        // currently selected element within click handler
        mergeValueIndex = -1,
        mergeValueArr = null,
        mergesortMergePRO = {
            clickHandler: function(arr, index) {
                if (isSelected === false) {
                    // No element is selected, select an element in a bottom array
                    // and highlight
                    // Don't let user select element in answer array
                    if (arr === jsavarr_answer) {
                        return;
                    }
                    // Don't let the user select an empty element,
                    if (arr.value(index) === "") {
                        return;
                    }
                    arr.highlight(index);
                    isSelected = true;
                    mergeValueArr = arr;
                    mergeValueIndex = index;
                } else {
                    if ((arr === mergeValueArr) && (index === mergeValueIndex)) {
                        // Deselect the currently selected element
                        arr.unhighlight(index);
                        isSelected = false;
                    } else { // We must be in top array
                        if (arr !== jsavarr_answer) {
                            return;
                        }
                        // Don't let the user overwrite a merged element
                        if (arr.value(index) !== "") {
                            return;
                        }
                        arr.value(index, mergeValueArr.value(mergeValueIndex));
                        // Clear values the user has already merged
                        mergeValueArr.value(mergeValueIndex, "");
                        mergeValueArr.unhighlight(mergeValueIndex);
                        isSelected = false;
                    }
                }
                userInput = true;
            },
            resetInit: function() {
                // Do initializations for each reset
                userInput = false;
                isSelected = false;
                jsavarr_answer = jsav.ds.array(empty, {
                    indexed: true,
                    center: false,
                    layout: "array"
                });
                jsavarr_answer.element.css({
                    "left": 0,
                    "top": rowTop
                });
                jsavarr_answer.click(function(index) {
                    mergesortMergePRO.clickHandler(this, index);
                });
                jsavarr_left = jsav.ds.array(arrdata_left, {
                    indexed: true,
                    center: false,
                    layout: "array"
                });
                jsavarr_left.element.css({
                    "left": 0,
                    "top": rowTop + rowHeight
                });
                jsavarr_left.click(function(index) {
                    mergesortMergePRO.clickHandler(this, index);
                });
                jsavarr_right = jsav.ds.array(arrdata_right, {
                    indexed: true,
                    center: false,
                    layout: "array"
                });
                jsavarr_right.element.css({
                    "left": blockWidth * (left_size + 1),
                    "top": rowTop + rowHeight
                });
                jsavarr_right.click(function(index) {
                    mergesortMergePRO.clickHandler(this, index);
                });
            },
            f_reset: function() {
                jsavarr_answer.clear();
                jsavarr_right.clear();
                jsavarr_left.clear();
                mergesortMergePRO.resetInit();
            },
            initJSAV: function(a) {
                // Do all of the one-time initializations
                arr_size = a;
                empty = new Array(arr_size),
                jsav = new JSAV($("#container"));
                jsav.recorded();
                left_size = Math.floor((arr_size + 1) / 2);
                arrdata = JSAV.utils.rand.numKeys(10, 100, arr_size);
                arrdata_left = arrdata.slice(0, left_size);
                arrdata_left.sort(function(a, b) {
                    return a - b;
                });
                arrdata_right = arrdata.slice(left_size, arr_size);
                arrdata_right.sort(function(a, b) {
                    return a - b;
                });
                arrdata.sort(function(a, b) {
                    return a - b;
                });
                mergesortMergePRO.resetInit();
                // Set up handler for reset button
                $("#reset").click(function() {
                    mergesortMergePRO.f_reset();
                });
            },
            checkAnswer: function(arr_size) {
                var i;
                for (i = 0; i < arr_size; i++) {
                    if (jsavarr_answer.value(i) !== arrdata[i]) {
                        return false;
                    }
                }
                return true;
            },
        };

    window.mergesortMergePRO = window.mergesortMergePRO || mergesortMergePRO;
}())