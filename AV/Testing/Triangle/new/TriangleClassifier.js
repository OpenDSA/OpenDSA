"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {

var testNum = 1;
var testCaseHistory = "";

function reset(){
    av.clearumsg();
    document.getElementById("side1").value = "";
    document.getElementById("side2").value = "";
    document.getElementById("side3").value = "";
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + 0;
    testNum = 1;
}

function getTriangleTypeNumber(s1, s2, s3) {
    if (isNaN(s1) || isNaN(s2) || isNaN(s3)) {
        return 0; 
    } else if (s1 < 0 || s2 < 0 || s3 < 0) {
        return 0;
    } else if (s1 == 0) {
        return 0;    
    } else if (s2 == 0) {
        return 0;
    } else if (s3 == 0) {
        return 0;
    } else if (s1 - s2 == s3) {
        return 0;
    } else if (s2 - s1 == s3) {
        return 0;
    } else if (s3 - s2 == s1) {
        return 0;
    } else if (s1 - s2 > s3) {
        return 0;
    } else if (s2 - s1 > s3) {
        return 0;
    } else if (s3 - s2 > s1) {
        return 0;
    } else if (s1 == s2 && s1 == s3 && s2 == s3) {
        return 1;
    } else if (s1 != s2 && s1 != s3 && s2 != s3) {
        return 3;   
    } else {
        return 2;
    }
}

function getTriangleTypeText(triangleTypeNum) {
    var triangleType = "";
    if (triangleTypeNum == 0) {
        triangleType = "Not a Triangle";
    }
    else if (triangleTypeNum == 1) {
        triangleType = "Equilateral Triangle";
    }
    else if (triangleTypeNum == 2) {
        triangleType = "Isoceles Triangle";
    }
    else if (triangleTypeNum == 3) {
        triangleType = "Scalene Triangle";
    }
    return triangleType;
}


function checkScore(triangleTypeNum) {
    if (triangleTypeNum == 1 || triangleTypeNum == 2 || triangleTypeNum == 3){
        return true;
    }
}

function setPerformanceDetails() {
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + testNum;
    testNum++;
}

function classifyTriangle() { 
    var side1 = Number($('#side1').val()),
        side2 = Number($('#side2').val()),
        side3 = Number($('#side3').val());
    var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);
    var triangleType = getTriangleTypeText(triangleTypeNum);
    var initData = {};
    initData.user_side1 = side1;
    initData.user_side2 = side2;
    initData.user_side3 = side3;
    ODSA.AV.logExerciseInit(initData);
    if(checkScore(triangleTypeNum) == true){
        ODSA.AV.awardCompletionCredit();
    }
    av.umsg("Test " + testNum + ": " + "Sides: " + side1 + ", " + side2 + ", " + side3 + " "
                                 + triangleType + "\n" + testCaseHistory);
    setPerformanceDetails();
}

$("#classify").click(classifyTriangle);
$("#reset").click(reset);

var config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter,
    av = new JSAV("ssperform", {"animationMode": "none"});
});



