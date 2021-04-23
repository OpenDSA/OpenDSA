var pdaInitID = [];
var pdaFinalID = [];
var pdaCheck = false;
var pdaId;
var pdaStack = '';
var testCaseList3 = []


function findAlledgesFromOneNodePDA(xmlDoc, id) {
  var packagelist = [];
  // var list = $(xmlDoc).find('transition').children()
  var counter = 0;
  while ($(xmlDoc).find('transition').children()[counter] != undefined) {
    var from = $(xmlDoc).find('transition').children()[counter].innerHTML;
    var to = $(xmlDoc).find('transition').children()[counter + 1].innerHTML;
    var read = $(xmlDoc).find('transition').children()[counter + 2].innerHTML;
    var pop = $(xmlDoc).find('transition').children()[counter + 3].innerHTML;
    var push = $(xmlDoc).find('transition').children()[counter + 4].innerHTML;
    if (from == id) {
      packagelist.push(from);
      packagelist.push(to);
      packagelist.push(read);
      packagelist.push(pop);
      packagelist.push(push);
    }
    counter = counter + 5;
  }
  return packagelist;
}


/**
 * add string to testCases
 *
 * @param testCase
 *            tastcases
 * @param result
 *            true/false for the current string
 * @param str
 *            string
 */
function pdaAdd(testCase, result, str) {
  if (testCase.testCases.indexOf(str) == -1) {
    if (result) {
      if (trueCounter < trueStringLimit && !loopkey(testCaseList3,str)) {
        testCaseList3.push(str);
        addtoTestCase(str, testCase, 1);
        trueCounter++;
      }
    } else {
      if (falseCounter < falseStringLimit && !loopkey(testCaseList3,str)) {
        testCaseList3.push(str);
        addtoTestCase(str, testCase, 0);
        falseCounter++;
      }
    }
  }
}

function reverseString(str) {
  return str.split("").reverse().join("");
}

function helpPop(Stack, popStr){
  popStr = reverseString(popStr);
  var pos = Stack.lastIndexOf(popStr);
  if(pos == -1 || Stack.length != (pos + popStr.length)){return false;}
  else{
    pdaStack = Stack.substring(0, pos );
    return true;
  }
}



function travnPda(xmlDoc, id, len) {
  var str = '';
  for (var pos = 0; pos < len; pos++) {
    var package = findAlledgesFromOneNodePDA(xmlDoc, id);
    if(package.length ==0) {
        break;
    }
    var pick = Math.floor(Math.random() * (package.length / 5));
    //check pop
    if(helpPop(pdaStack,package[pick * 5 + 3])){
      //to
      id = package[pick * 5 + 1];
      //read
      str = str + package[pick * 5 + 2];
      //push
      var pushStr = reverseString(package[pick * 5 + 4])
      pdaStack = pdaStack+pushStr;
    }
  }
  // Current node is a final nore
  if (finalID.includes(id)|| checkLambda(xmlDoc, id)) {
    pdaCheck = true;
  } else {
    pdaCheck = false;
  }
  return str;
}

function checkLambda(xmlDoc, id){
  var checkend= false;
  var package = findAlledgesFromOneNodePDA(xmlDoc, id);
  for (var pos = 0; pos < package.length/5 ; pos++) {
    var to = package[pos * 5 + 1];
    var read = package[pos * 5 + 2];
    var pop = package[pos * 5 + 3];
    var push = package[pos * 5 + 4];
    if(read == "" && push==""){
      if((pdaStack == "" && pop == "") ||(pdaStack == "Z" && (pop == ""||pop == "Z" ))|| (pdaStack == "z" && (pop == ""||pop == "z" ))){
        if(finalID.includes(to)){
          checkend =  true; 
          return checkend;
        }
        else{
          checkLambda(xmlDoc, to);
          break;
        }
      }
    }
  }
  return checkend;
}

function pdaHelper(testCase, len) {
  var nfaURL = testCase.solution;
  var machine = $.ajax({
    url: nfaURL,
    async: false,
  })
  var xmltext = machine.responseText;
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(xmltext, 'text/xml');
  initID = findbytag(xmlDoc, 'initial');
  finalID = findbytag(xmlDoc, 'final');
  str = travnPda(xmlDoc, initID[0], len);
  pdaAdd(testCase, pdaCheck, str);
}


function pdaHandler(obj) {
    var min = randomStringLength[0];
    var max = randomStringLength[1];
    var stringLength = Math.round(Math.random() * (max - min)) + min;
    testCaseList3 = obj.testCases;
    pdaCheck = false;
    pdaStack = 'Z';
    pdaHelper(obj, stringLength);
  
}