"use strict";

$(document).ready(function () {


    JSAV.init();

    //create the JSAV object
    var av = new JSAV("DatabaseJoinsInnerSlideshow");
    //initialize the array
    var theArray = [];
    //insert random integers in the array
    for(i = 0; i < 11; i++){
      theArray.push(Math.floor(Math.random() * 100));
    }

    ////FIRST SLIDE STARTS HERE////

    //data arrays (left to right)
    var R1 = ["A", "B"];
    var R2 = [1, 2];
    var R3 = [3, 4];
    var R4 = [4, 6];
    //Create Table R 
    var tableR = av.ds.matrix([R1, R2, R3, R4], {style: "table"});
    //Shade background for col titles
    tableR.css(0, 0, {"background-color": "aqua", "color": "rgb(150, 55, 50)"});
    tableR.css(0, 1, {"background-color": "aqua", "color": "rgb(150, 55, 50)"});
    tableR.layout();

    //data arrays (left to right)
    var S1 = ["A", "C", "D"];
    var S2 = [1, 5, 6];
    var S3 = [2, 12, 11];
    var S4 = [3, 7, 8];
    //Create Table R 
    var tableS = av.ds.matrix([S1, S2, S3, S4], {style: "table"}, {relativeTo: "tableR"});
    //Shade background for col titles
    tableR.css(0, 0, {"background-color": "aqua", "color": "rgb(150, 55, 50)"});
    tableR.css(0, 1, {"background-color": "aqua", "color": "rgb(150, 55, 50)"});
    tableR.css(0, 2, {"background-color": "aqua", "color": "rgb(150, 55, 50)"});
    tableR.layout();


    av.displayInit();
    ////FIRST SLIDE ENDS HERE////





    //SLIDE 2 START//
      //TODO
    //SLIDE 3 START//
      //TODO
    //SLIDE 3 END//

    av.recorded();
});
