/**
 * NFA, DFA variable
 */
var initID = [];
var finalID = [];
var check = false;
var id;
var testCaseList = [];


function findAlledgesFromOneNode(xmlDoc, id) {
  var packagelist = [];
  var counter = 0;
  while ($(xmlDoc).find('transition').children()[counter] != undefined) {
    var from = $(xmlDoc).find('transition').children()[counter].firstChild.data;
    var to = $(xmlDoc).find('transition').children()[counter + 1].firstChild.data;
    var read = $(xmlDoc).find('transition').children()[counter + 2].firstChild;
    
    if(!read){
      read = "";
    }else{
      read = read.data;
    }
    if (from == id) {
      packagelist.push(from);
      packagelist.push(to);
      packagelist.push(read);
    }
    counter = counter + 3;
  }
  return packagelist;
}


function travnfa(xmlDoc, id, len) {
  var str = '';
  for (var pos = 0; pos < len; pos++) {
    var package = findAlledgesFromOneNode(xmlDoc, id);
    if(package.length ==0) {
        break;
    }
    var pick = Math.floor(Math.random() * (package.length / 3));
    id = package[pick * 3 + 1];
    str = str + package[pick * 3 + 2];
  }
  // Current node is a final nore
  if (finalID.includes(id)) {
    check = true;
  } else {
    check = false;
  }
  return str;
}


function faAdd(testCase, str, result) {
  if (!testCase.testCases.hasOwnProperty(str)) {
    if (result) {
      if (trueCounter < trueStringLimit && !loopkey(testCaseList, str)) {
        addtoTestCase(str, testCase, result);
        trueCounter++;
      }
    } else {
      if (falseCounter < falseStringLimit && !loopkey(testCaseList, str)) {
        addtoTestCase(str, testCase, result);
        falseCounter++;
      }
    }
  }
}


function faHandler(testCase, len) {
  // var av = new JSAV("NFA");
  var nfaURL = testCase.solution;
  var machine = $.ajax({
    url: nfaURL,
    async: false,
  });
  var xmltext = machine.responseText;
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmltext, 'text/xml');
  initID = findbytag(xmlDoc, 'initial');
  finalID = findbytag(xmlDoc, 'final');
  check = false;
  str = travnfa(xmlDoc, initID[0], len);
  faAdd(testCase, str, check);
}


function dfaNfaHandler(obj) {
  var min = randomStringLength[0];
  var max = randomStringLength[1];
  var stringLength = Math.round(Math.random() * (max - min)) + min;
  testCaseList = obj.testCases;
  faHandler(obj, stringLength);
}

// /**
//  * Add strings alone with true or false to the test cases
//  *
//  * @param str  Testing string
//  *
//  * @param TorF True or false
//  *
//  * @param obj  Object that contain all info
//  */
// function addtoTestCase(str, obj, result) {
//   var current = {};
//   if (tempFlag != 1) {
//     var inobj = obj.testCases;
//     if (result) {
//       current[str] = true;
//       inobj[caseCounter] = current;
//     } else {
//       current[str] = false;
//       inobj[caseCounter] = current;
//     }
//   } else {
//     if (result) {
//       current[str] = true;
//       obj.testCases[caseCounter] = current;
//     } else {
//       current[str] = false;
//       obj.testCases[caseCounter] = current;
//     }
//   }
//   caseCounter++;
// }
