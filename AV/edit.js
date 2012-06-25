/*
	Edit Distance (Levenshtein Distance)
	Erich Brungraber
*/

var eDist = function(start, end, output) {
    var startMax = start.length;
    var endMax = end.length;
    var arr = av.ds.array(["",""]);
    var arr2 = av.ds.array([""]);
    var dynArr = [arr, arr2];
    
    for (var i = 0; i < startMax; i++) {
		dynArr[0].value((i + 2), start.charAt(i));
    }
    dynArr[1].value(0, "");
    
	for (var i = 0; i <= startMax; i++) {
		dynArr[1].value((i+1), i);
    }
    
    for (var i = 1; i <= endMax; i++) {
		var tArr = [end.charAt(i-1), i];
		for (var j = 2; j <= startMax + 1; j++) {
			tArr[j] = 0;
		}
		dynArr[i+1] = av.ds.array(tArr);
    }
    
    av.displayInit();
    
    //meat of the code
    var initCol = 2;
    var pRow = 2;
    var pCol = 2;
    
    for (var i = 0; i <= startMax + 1; i++) {		
		dynArr[0].css(i,{"color":"#fff", "background-color": "#000"});
    }
    for (var i = 1; i <= endMax + 1; i++) {
		dynArr[i].css(0, {"color":"#fff", "background-color": "#000"});
    }
    
    for (var j = 2; j <= endMax + 1; j++) {	
		for(var i = 2; i <= startMax + 1; i++) {
			//highlighting
			if (output === 1) {
				dynArr[pRow].css(pCol, {"color": "#0f0", "background-color": "#eee"});
				dynArr[j].css(i, {"color": "#ff0", "background-color": "#f00"});
			}
			if (start.charAt(i-2) === end.charAt(j-2)) {
				dynArr[j].value(i, dynArr[j-1].value(i-1));
			} else {
				var del = parseInt(dynArr[j-1].value(i), 10) + 1;
				var ins = parseInt(dynArr[j].value(i-1), 10) + 1;
				var sub = parseInt(dynArr[j-1].value(i-1), 10) + 1;
			
				var min = Math.min(Math.min(sub, ins), del);
				dynArr[j].value(i, min);		
			}
			av.step();
			if (initCol === 2) {
				pCol = 2;
				initCol = -1;
			} else { pCol = i; }
			pRow = j;
		} //end inner for	    
	} //end outer for
		
	av.recorded();
    av.show();
    
	var ans = dynArr[endMax];
    return ans[startMax];
} //end eDist func

var recDist = function(tr,node, start, end) {
    //console.log("foo "+ typeof node.value());
    var tmp = node.value().split(",");
    var i = parseInt(tmp[0]) - 1;
    var j = parseInt(tmp[1]) - 1;
    //console.log("foobar "+ i + " " + j);
    
    //base cases
    if (i === 0) {
		return j;
    }
    if (j === 0) {
		return i;
    }
    //recursive call, start with match check
    if (start.charAt(i) === end.charAt(j)) {
		node.addChild( "" + i + "," + j);
		tr.layout();
		av.step();
		return recDist(tr,node.child(0), start, end);
    } else { //recursively check top-left, top, and left "cells"
		node.addChild( "" + i + "," + j);
		node.addChild( "" + (i+1) + "," + j);
		node.addChild( "" + i + "," + (j+1));
		tr.layout();
		av.step();
		var sub = recDist(tr,node.child(0), start, end) + 1; //substitution
		var ins = recDist(tr,node.child(1), start, end) + 1; //insert
		var del = recDist(tr,node.child(2), start, end) + 1; //delete
	
		return Math.min(Math.min(sub, ins), del);
    }	
    tr.layout();
    av.step();
} //end recDist func