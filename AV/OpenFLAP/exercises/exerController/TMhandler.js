function findSameKey(rule, key) {
  var pack = [];
  for (var i = 0; i < rule.length; i=i+5) {
    if (rule[i] == key) {
      pack.push(rule[i]);
      pack.push(rule[i+1]);
      pack.push(rule[i+2]);
      pack.push(rule[i+3]);
      pack.push(rule[i+4]);
    }
  }
  return pack;
}


String.prototype.replaceAt = function(index, replacement){
    if(replacement == "-1"){replacement = "#";}
    return this.substring(0,index)+replacement+this.substring(index+1)
}




function insertString(origString, index, addingString) { 
  newString = origString.slice(0, index) 
          + addingString 
          + origString.slice(index); 
  return newString;         
} 


var exitFlat = false;
var resultString;
function traverseTM(initID, finalID, tranArray,testStr,stringPos){ 
  var trans = findSameKey(tranArray,initID);
  for(var index = 0;index<tranArray.length;index=index+5){
    //check end flag;
    if(exitFlat){
      break;
    }
    //read 
    if(trans[index+2] == testStr.charAt(stringPos) || (trans[index+2] == "-1" && testStr.charAt(stringPos) == "")){
      //write
      if(testStr.charAt(stringPos) != "" || testStr.charAt(stringPos) != "#"){
        testStr = testStr.replaceAt(stringPos,trans[index+3]);
      }
      //move(L,S,R)
      if(trans[index+4] == "L"){
        if(stringPos == 0){
          testStr = '#'+testStr
        }
        else{
          stringPos = stringPos-1;
        }
      }
      else if(trans[index+4] == "R"){
        stringPos = stringPos+1;
      } 
      //traverse END condition
      if(!finalID.includes(trans[index+1])){
        testStr = traverseTM(trans[index+1], finalID, tranArray,testStr,stringPos);
      }else if(finalID.includes(trans[index+1])){
        exitFlat = true;
        resultString = testStr;
        break;
      }
    }
  }

    return resultString.split("#").join("");
}



/**
 * helpful function for transitionToArray
 * 
 * @param xmltext
 *            xml text
 * @param reg
 *            each regular expression
 * @param array1
 *            array to save all transition value
 */
function  transitionHelper(xmltext,reg,array1){
  var tempVal = xmltext.match(reg);
  if(typeof tempVal[2] !== 'undefined'){array1.push(tempVal[2]);}
  else{array1.push("-1");}
}


/**
 * rearrage all transitions into an array. 
 *
 * @param xmltext
 *            xml text
 */
function  transitionToArray(xmltext){
  var array1 = [];
  var RegExp1 = "<transition>(.*?)<\/transition>";
  const transitionArray = [...xmltext.matchAll(RegExp1)];
  for(var i=0;i<transitionArray.length;i++){
    transitionHelper(transitionArray[i][1], "(<from>(.*?)<\/from>)|(from\/)",array1);
    transitionHelper(transitionArray[i][1], "(<to>(.*?)<\/to>)|(to\/)",array1);
    transitionHelper(transitionArray[i][1], "(<read>(.*?)<\/read>)|(read\/)",array1);
    transitionHelper(transitionArray[i][1], "(<write>(.*?)<\/write>)|(write\/)",array1);
    transitionHelper(transitionArray[i][1], "(<move>(.*?)<\/move>)|(move\/)",array1);
    }
  return array1;
}


/**
 * Find corresponding machine xml from the server 
 *
 * @param tmMachine
 *            URL for TM machine XML
 */
function getTMmachine(tmMachine){
  var machine = $.ajax({
    url: tmMachine,
    async: false,
  })
  return machine.responseText;
}


/**
 * check the string is unique, does not exist in the testcases
 *
 */
function checkUniqueString(testCase,str){
  var testCaseList = testCase.testCases;
  for (var name in testCaseList) {
    if (Object.keys(testCaseList[name]) == str) {return false;}
  }
  return true;
}

function findFinalNodeArray(tmMachineXML){
  var targetArray = [];
  var res = tmMachineXML.match(/<state id="(\d)".*?<final\/>/g);
  for(var a =0; a<res.length; a++){
    var tempStr = res[a].match(/state(?!.*state) id="(\d)/g)[0].match(/\d/g)[0];
    targetArray.push(tempStr);
  }
  return targetArray;
}



function addtoTestCaes(obj, string,resultString){
  var current = {};
  current[string] = resultString;
  obj[tmCasesCounter] = current;
  tmCasesCounter++;
}

/**
 * Handler start funtion. 
 *
 * @param testCase
 *            object
 * @param str
 *            test string
 */
function tmHandler(testCase, string) {
  var res = checkUniqueString(testCase,string);
  if(res){
    var tmMachineXML = getTMmachine(testCase.solution);
    var initID= tmMachineXML.match(/(.*?)(?=<initial\/>)/g)[0].match("(?!(.*)state)(.*)")[0].match("id=\"(\\d)\"")[1];
    var finalID= findFinalNodeArray(tmMachineXML)
    var tranArray = transitionToArray(tmMachineXML);
    var stringPos = 0;
    var resultString = traverseTM(initID, finalID, tranArray,string,stringPos);
    addtoTestCaes(testCase.testCases, string,resultString);
    exitFlat = false;
  }
 }