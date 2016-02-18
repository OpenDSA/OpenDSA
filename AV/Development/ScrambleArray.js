/**
 * Created by RJ-LAPTOP on 2/17/2016.
 */
"use strict";

$(document).ready(function(){
    JSAV.init();

    var av = new JSAV("ScrambleArray");
    var theArray = [];
    var n = 9;
    for (var i = 0; i <= n; i++){ 
    	theArray[i] = i;
    }
    var arr = av.ds.array(theArray, {indexed: true});
    av.umsg("Text before displayInit()");
	//not sure why av.usmg isn't working...
    av.displayInit();
    av.umsg("2", {preserve: false});
    for (i = 0; i < n; i++){
    	av.step();
        arr.swap(i, Math.floor(Math.random() * (n - i + 1)) + i);        
        av.umsg("hi");
    }       
    av.recorded();
});