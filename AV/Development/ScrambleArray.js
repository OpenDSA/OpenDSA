/**
 * Created by RJ-LAPTOP on 2/17/2016.
 */
"use strict";

$(document).ready(function(){
    JSAV.init();

    var av = new JSAV("ScrambleArray");
    var theArray = [];
    var n = 9;
    for (var i = 0; i <= n; i++){ theArray[i] = i ;}
    var arr = av.ds.array(theArray, {indexed: true});
    //av.umsg("Text before displayInit()");
	//not sure why av.usmg isn't working...
    av.displayInit();
    for (i = 0; i < n; i++){
        arr.swap(i, Math.floor(Math.random() * (n - i + 1)) + i);
        av.step().umsg(i);
        //av.umsg(i);
    }
    // We are now starting a new slide (#3)
    av.umsg("Text after av.step()");
    av.recorded();
});