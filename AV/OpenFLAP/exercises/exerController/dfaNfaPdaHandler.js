/**
 * 
 * Start NFA, DFA
 *
 */
/**
 * NFA, DFA variable
 */
var initID = [];
var finalID = [];
var check = false;
var id;
var testCaseList2 = []


/**
 * find all id that start from the tag ID
 *
 * @param xmlDoc
 *            FA machine 
 * @param tag
 *            some specific tag: 'initial', 'final'.
 * @returns tag ID 
 */
function findbytag(xmlDoc, tag) {
  var temp = [];
  var list = $(xmlDoc).find('automaton').children();
  var counter = 0;
  while (list[counter].localName != 'transition') {
    if (list[counter].children.hasOwnProperty('2')) {
      var t = list[counter].children[2].localName;
      if (t == tag) {
        temp.push(list[counter].attributes[0].nodeValue);
      }
    }
    if (list[counter].children.hasOwnProperty('3')) {
      var f = list[counter].children[3].localName;
      if (f == tag) {
        temp.push(list[counter].attributes[0].nodeValue);
      }
    }
    counter++;
  }
  return temp;
}


/**
 * find all edges that start from current tag ID
 *
 * @param xmlDoc
 *            FA machine 
 * @param id
 *            Node ID
 * @returns array that contains "Id, From, To, EdgeValue". 
 */
function findAlledgesFromOneNode(xmlDoc, id) {
  var packagelist = [];
  // var list = $(xmlDoc).find('transition').children()
  var counter = 0;
  while ($(xmlDoc).find('transition').children()[counter] != undefined) {
    var from = $(xmlDoc).find('transition').children()[counter].firstChild.data;
    var to = $(xmlDoc).find('transition').children()[counter + 1].firstChild.data;
    var read = $(xmlDoc).find('transition').children()[counter + 2].firstChild.data;
    if (from == id) {
      packagelist.push(from);
      packagelist.push(to);
      packagelist.push(read);
    }
    counter = counter + 3;
  }
  return packagelist;
}


/**
 * Traverse NFA,DFA
 *
 * @param xmlDoc
 *            FA machine 
 * @param id
 *            Current Node ID
 * @param str
 *            Traverse string
 * @param strPos
 *            string traverse position pointer
 * @returns -1 or the length of the string. 
 *          -1 : false
 *          length: true
 */
function travnfa(xmlDoc, id, str, strPos) {
  var backupPos = strPos;
  var package = findAlledgesFromOneNode(xmlDoc, id);
  if (package.length % 3 != 0) {
    alert('check FA machine');
  }
  for (var a = 0; a < package.length / 3; a++) {
    if (str.charAt(strPos) == package[3 * a + 2]) {
      if (strPos + 1 == str.length) {
        id = package[3 * a + 1];
        strPos = strPos + 1;
        break;
      }
      strPos = strPos + 1;
      travnfa(xmlDoc, package[3 * a + 1], str, strPos);
    }
    strPos = backupPos;
    if (check == true) {
      break;
    }
    if (strPos == str.length) {
      break;
    }
  }
  if (strPos == str.length && finalID.includes(id)) {
    check = true;
    return strPos;
  } else {
    if (check == true) {
      return str.length;
    }
    return -1;
  }
}

function loopkey(testCases, str) {
  for (var name in testCases) {
    if (Object.keys(testCases[name]) == str) {
      return true;
    }
  }
  return false;
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
function faAdd(testCase, result, str) {
  if (!testCase.testCases.hasOwnProperty(str)) {
    if (result) {
      if (trueCounter < trueStringLimit && !loopkey(testCaseList2, str)) {
        testCaseList2.push(str);
        addtoTestCase(str, testCase, 1);
        trueCounter++;
      }
    } else {
      if (falseCounter < falseStringLimit && !loopkey(testCaseList2, str)) {
        testCaseList2.push(str);
        addtoTestCase(str, testCase, 0);
        falseCounter++;
      }
    }
  }
}


/**
 * NFA,DFA traverse start funtion. Find the strat node and end node.
 *
 * @param testCase
 *            object
 * @param flag
 *            no use
 * @param str
 *            test string
 */
function faHandler(testCase, flag, str) {
  // var av = new JSAV("NFA");
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
  check = false;
  var result = travnfa(xmlDoc, initID[0], str, 0);
  faAdd(testCase, check, str);
}




/**
 * 
 * Start PDA
 *
 */

/**
 * PDA variable
 */
var pdaInitID = [];
var pdaFinalID = [];
var pdaCheck = false;
var pdaId;
var pdaStack = '';
var testCaseList3 = []

/**
 * find all edges that start from current tag ID
 *
 * @param xmlDoc
 *            FA machine 
 * @param id
 *            Node ID
 * @returns array that contains "Id, From, To, EdgeValue". 
 */
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
      if (trueCounter < trueStringLimit && !loopkey(testCaseList3.str)) {
        testCaseList3.push(str);
        addtoTestCase(str, testCase, 1);
        trueCounter++;
      }
    } else {
      if (falseCounter < falseStringLimit && !loopkey(testCaseList3.str)) {
        testCaseList3.push(str);
        addtoTestCase(str, testCase, 0);
        falseCounter++;
      }
    }
  }
}


/**
 * Traverse PDA
 *
 * @param xmlDoc
 *            FA machine 
 * @param id
 *            Current Node ID
 * @param str
 *            Traverse string
 * @param strPos
 *            string traverse position pointer
 * @returns -1 or the length of the string. 
 *          -1 : false
 *          length: true
 */
function travnPda(xmlDoc, id, str, strPos) {
  var backupPos = strPos;
  var package = findAlledgesFromOneNodePDA(xmlDoc, id);
  if (package.length % 5 != 0) {
    alert('check PDA machine');
  }
  for (var a = 0; a < package.length / 5; a++) {
    //read
    var tempChar = str.charAt(strPos);
    if (package[5 * a + 2] == '') {
      tempChar = '';
    }

    if (tempChar == package[5 * a + 2]) {
      var popVal = package[5 * a + 3];
      var len = popVal.length;
      // if pop more chars
      var start = 0;
      if (pdaStack.length < len) {
        break;
      } else {
        start = pdaStack.length - len;
      }

      var currentStack = pdaStack.substring(start, pdaStack.length);
      currentStack = currentStack.split('').reverse().join('');
      if (popVal == 'Z' || popVal == 'z') {
        popVal = 'Z';
      }
      if (currentStack == popVal) {
        pdaStack = pdaStack.substring(0, pdaStack.length - len);

        if (package[5 * a + 2] != '') {
          strPos = strPos + 1;
        }

        var pushStr = package[5 * a + 4].split('').reverse().join('');
        pdaStack = pdaStack + pushStr;
        travnPda(xmlDoc, package[5 * a + 1], str, strPos);
      } else {
        continue;
      }
    }
    if (strPos == str.length && pdaStack == '') {
      break;
    }
    strPos = backupPos;
    if (pdaCheck == true) {
      break;
    }
  }

  if (strPos == str.length && finalID.includes(id)) {
    pdaCheck = true;
    return strPos;
  } else {
    if (pdaCheck == true) {
      return str.length;
    }
    return -1;
  }
}


/**
 * PDA traverse start funtion. Find the strat node and end node.
 *
 * @param testCase
 *            object
 * @param flag
 *            no use
 * @param str
 *            test string
 */
function pdaHandler(testCase, flag, str) {
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
  travnPda(xmlDoc, initID[0], str, 0);
  pdaAdd(testCase, pdaCheck, str);
}


/**
 * 
 * Seprate FA and PDA.
 * 
 */
function dfaNfaPdaHandler(testCase, flag, string) {
  if (testCase.exerciseType == 'DFA' || testCase.exerciseType == 'NFA') {
    testCaseList2 = testCase.testCases
    faHandler(testCase, flag, string);
  } else if (testCase.exerciseType == 'PDA') {
    testCaseList3 = testCase.testCases
    pdaCheck = false;
    // PDA stack
    pdaStack = 'Z';
    pdaHandler(testCase, flag, string);
  }
}