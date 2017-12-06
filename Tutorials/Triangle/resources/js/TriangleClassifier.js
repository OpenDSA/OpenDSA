var testNum = 1;
var codeCoverage = [];
var bugCoverage = [];
for (var i = 0; i < 15; i++) {
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
    if (s1 < 0 || s2 < 0 || s3 < 0) {
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
        codeCoverage[12] = true;
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
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + "Test " + testNum + ": ";
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + "Sides: " + s1 + ", " + s2 + ", " + s3 + " " + triangleName;
    testCaseHistory.innerHTML = testCaseHistory.innerHTML + "\n ";
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

function classifyTriangle() {
    var side1 = document.getElementById("side1").value;
    var side2 = document.getElementById("side2").value;
    var side3 = document.getElementById("side3").value;

    side1 = parseInt(side1, 10);
    side2 = parseInt(side2, 10);
    side3 = parseInt(side3, 10);

    if (isNaN(side1) || isNaN(side2) || isNaN(side3)) {
        document.getElementById("triangleType").innerText = "Error: All sides must be valid integers.";
        document.getElementById("triangleType").style = "color: red;";
        alert("Input only accepts valid integers.");
        return;
    }

    //Code Coverage
    var triangleTypeNum = getTriangleTypeNumber(side1, side2, side3);
    var triangleType = getTriangleTypeText(triangleTypeNum);
    document.getElementById("triangleType").innerText = "Triangle Type: " + triangleType;
    document.getElementById("triangleType").style = "color: green;";
    var codeCoverageP = calculateCoverage();
    document.getElementById("codeCoverageBar").style = "width:" + codeCoverageP + "%";
    document.getElementById("codeCoveragePercentage").innerText = codeCoverageP.toFixed(2) + "%";
    //Bug Coverage
    var bugCoverageP = calculateBugCoverage(side1, side2, side3, triangleTypeNum);
    document.getElementById("bugCoverageBar").style = "width:" + bugCoverageP + "%";
    document.getElementById("bugCoveragePercentage").innerText = bugCoverageP.toFixed(2) + "%";

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