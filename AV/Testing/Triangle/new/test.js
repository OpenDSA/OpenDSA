

var av = new JSAV($("#container"));
av.recorded();
var testNum = 1;
var codeCoverage = [];
var bugCoverage = [];
for (var i = 0; i < 14; i++) {
    codeCoverage[i] = false;
}

for (var i = 0; i < 14; i++) {
    bugCoverage[i] = false;
}

function initialize(){
    var testCaseHistory = document.getElementById("testHistory").innerHTML = "";
    document.getElementById("side1").value = "";
    document.getElementById("side1").value = "";
    document.getElementById("side1").value = "";
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + 0;
    testNum = 1;
}

function modelSolution(modeljsav){
    var s1 = document.getElementById("side1").value;
    var s2 = document.getElementById("side2").value;
    var s3 = document.getElementById("side3").value; 
    var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);

}

/**
 * Calculates the type of triangle
 * 0 = not a triangle
 * 1 = equilateral
 * 2 = isoceles
 * 3 = scalene
 */
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

/**
 * calculates code coverage percentage
 */
function calculateCoverage() {
    var numTrue = 0;
    for (var i in codeCoverage) {
        if (codeCoverage[i]) {
            numTrue++;
        }
    }
    return numTrue * 100 / codeCoverage.length;
}


function logTestCase(s1, s2, s3, triangleName) {
    var testCaseHistory = document.getElementById("testHistory");
    testCaseHistory.innerHTML = "Test " + testNum + ": " + "Sides: " + s1 + ", " + s2 + ", " + s3 + " "
                                 + triangleName + "\n" + testCaseHistory.innerHTML;
    setPerformanceDetails();
}

function setPerformanceDetails() {
    var testsrunText = document.getElementById("testsrun");
    testsrunText.innerHTML = "Number of tests run: " + testNum;
    testNum++;
    

}

/**
 * Main function that is called when the 'Classify' button is pressed
 */
function classifyTriangle() {
    var side1 = document.getElementById("side1").value;
    var side2 = document.getElementById("side2").value;
    var side3 = document.getElementById("side3").value;    

    if (side1 == "" || side2 == "" || side3 == "") {
        document.getElementById("triangleType").innerText = "Error: All sides must be entered.";
        document.getElementById("triangleType").style = "color: red;";
        return;
    }

    var allowedValues = new RegExp('^[\-]?[0-9a-zA-Z]+$');
    var triangleTypeNum = 0;
    if (!side1.match(allowedValues) || !side2.match(allowedValues) || !side3.match(allowedValues)) {
        //This is checked here instead of in getTriangleTypeNumber() so that we can evaluate
        //before the sides have been pssed through the parseInt() statements below.
        codeCoverage[12] = true;
        triangleTypeNum = 0;
    } else {
        side1 = parseInt(side1, 10);
        side2 = parseInt(side2, 10);
        side3 = parseInt(side3, 10);
    
        var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);
    }

    
    var triangleType = getTriangleTypeText(triangleTypeNum);
    document.getElementById("triangleType").innerText = "Triangle Type: " + triangleType;
    document.getElementById("triangleType").style = "color: green;";
    //var codeCoverageP = calculateCoverage();
    //document.getElementById("codeCoverageBar").style = "width:" + codeCoverageP + "%";
    //document.getElementById("codeCoveragePercentage").innerText = codeCoverageP.toFixed(2) + "%";

    

    logTestCase(side1, side2, side3, triangleType);
}

reset = false;
function resetClicked() {
    reset = true;
}

window.onbeforeunload = function() {
    if (!reset) {
        return "Data will be lost if you leave the page, are you sure?";
    }
};