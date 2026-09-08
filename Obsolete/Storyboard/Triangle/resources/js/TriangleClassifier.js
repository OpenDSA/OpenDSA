// @Todo Fix bowling info shown, what frame etc?  Scoreboard??

var testNum = 1;
var codeCoverage = [];
var bugCoverage = [];
for (var i = 0; i < 14; i++) {
    codeCoverage[i] = false;
}

for (var i = 0; i < 14; i++) {
    bugCoverage[i] = false;
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
    return numTrue * 100 / codeCoverage.length
}

function isBugFound(s1, s2, s3, actual, expected) {
    var bugDetected = false;
    try {
        if (actual != expected) {
            bugDetected = true;
        }
    } catch (var6) {
        bugDetected = true;
    }

    return bugDetected;
} 

/**
 * Calculates the percentage of bugs found.  It takes an expected
 * result from the correct getTriangleTypeNumber() function above.
 * If there is a difference in the expected value and the value
 * returned from each bug function then that is considered a bug found.
 * @param {*} expected is the expected triangle type
 */
function calculateBugCoverage(s1, s2, s3, expected) {
    for (var i in bugs) {
        var actual = bugs[i].classify(s1, s2, s3);
        bugCoverage[i] = bugCoverage[i] || isBugFound(s1, s2, s3, actual, expected);
    }

    var numTrue = 0;
    for (var i in bugCoverage) {
        if (bugCoverage[i]) {
            numTrue++;
        }
    }
    return numTrue * 100 / bugCoverage.length


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
    var bugsFound = 0;
    for (var i in bugCoverage) {
        if (bugCoverage[i]) {
            bugsFound++;
        }
    }
    var bugsFoundText = document.getElementById("bugsFound");
    bugsFoundText.innerHTML = "Bugs Found: " + bugsFound + " out of 14";
    

}
window.onload = function() {
    if (getUrlParam("code") != "true") {
        document.getElementById("coverageCode").style.display = 'none';
    } else {
        document.getElementById("coverageCode").style.display = 'block';
    }
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
    var codeCoverageP = calculateCoverage();
    document.getElementById("codeCoverageBar").style = "width:" + codeCoverageP + "%";
    document.getElementById("codeCoveragePercentage").innerText = codeCoverageP.toFixed(2) + "%";

    // Bug Coverage uncomment if you want to add the bug coverage bar back
    // var bugCoverageP = calculateBugCoverage(side1, side2, side3, triangleTypeNum);
    // document.getElementById("bugCoverageBar").style = "width:" + bugCoverageP + "%";
    // document.getElementById("bugCoveragePercentage").innerText = bugCoverageP.toFixed(2) + "%";

    logTestCase(side1, side2, side3, triangleType);
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




reset = false;
function resetClicked() {
    reset = true;
}

window.onbeforeunload = function() {
    if (!reset) {
        return "Data will be lost if you leave the page, are you sure?";
    }
};