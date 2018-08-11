"use strict";
/*global alert: true, ODSA */
$(document).ready(function () {

var testNum = 1;
var creditStatus = false;
var testCaseHistory = "";
var threshold = 50;
var coverage = 0.00;
var codeCoverage = [];
for (var i = 0; i < 14; i++) {
    codeCoverage[i] = false;
}

function reset(){
    av.clearumsg();
    document.getElementById("side1").value = "";
    document.getElementById("side2").value = "";
    document.getElementById("side3").value = "";
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + 0;
    testNum = 1;
    coverage = 0.00;
    document.getElementById("codeCoverageBar").style = "width:" + 0 + "%";
    document.getElementById("codeCoveragePercentage").innerText = 0 + "%";
    for (var i = 0; i < 14; i++) {
        codeCoverage[i] = false;
    }
}

function getTriangleTypeNumber(s1, s2, s3) {
    if (isNaN(s1) || isNaN(s2) || isNaN(s3)) {
        codeCoverage[12] = true;
        return 0; 
    } else if (s1 < 0 || s2 < 0 || s3 < 0) {
        codeCoverage[0] = true;
        return 0;
    } else if (s1 == 0) {
        codeCoverage[1] = true;
        return 0;    
    } else if (s2 == 0) {
        codeCoverage[2] = true;
        return 0;
    } else if (s3 == 0) {
        codeCoverage[3] = true;
        return 0;
    } else if (s1 - s2 == s3) {
        codeCoverage[4] = true;
        return 0;
    } else if (s2 - s1 == s3) {
        codeCoverage[5] = true;
        return 0;
    } else if (s3 - s2 == s1) {
        codeCoverage[6] = true;
        return 0;
    } else if (s1 - s2 > s3) {
        codeCoverage[7] = true;
        return 0;
    } else if (s2 - s1 > s3) {
        codeCoverage[8] = true;
        return 0;
    } else if (s3 - s2 > s1) {
        codeCoverage[9] = true;
        return 0;
    } else if (s1 == s2 && s1 == s3 && s2 == s3) {
        codeCoverage[10] = true;
        return 1;
    } else if (s1 != s2 && s1 != s3 && s2 != s3) {
        codeCoverage[11] = true;
        return 3;   
    } else {
        codeCoverage[13] = true;
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

function calculateCoverage() {
    var numTrue = 0;
    for (var i in codeCoverage) {
        if (codeCoverage[i]) {
            numTrue++;
        }
    }
    return numTrue * 100 / codeCoverage.length
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
    av.umsg("Test " + testNum + ": " + "Sides: " + side1 + ", " + side2 + ", " + side3 + " "
                                 + triangleType + "\n");
    coverage = calculateCoverage(); 
    document.getElementById("codeCoverageBar").style = "width:" + coverage + "%";
    document.getElementById("codeCoveragePercentage").innerText = coverage.toFixed(2) + "%";
    if(!creditStatus && (coverage >= threshold)){
        ODSA.AV.awardCompletionCredit();
        av.umsg(interpret("av_c1"));
        creditStatus = true;
    }
    setPerformanceDetails();
}

window.onload = function() {
    if (getUrlParam("code") == "true") {
        document.getElementById("coverageCode").style.display = "block";
        threshold = 100;
        //document.getElementById("container").style.float = "right";
    } else {
        document.getElementById("coverageCode").style.display = "none";
        //document.getElementById("container").style.float = "left";
    }
}

/**
 * Gets the value of a url parameter
 * @param {*} name is the name of the parameter you want to get 
 * @param {*} url is the url we want to read, can leave empty.
 */
function getUrlParam( name, url ) {
    if (!url) url = location.href;
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

$("#classify").click(classifyTriangle);
$("#reset").click(reset);

var config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter,
    av = new JSAV("ssperform", {"animationMode": "none"});
});
