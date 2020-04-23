//Starts when spreedsheet is opened in browser. This is what adds the scripts to the tool bar menu in google spreedsheet
function onOpen() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var menuEntries = [
    {name: "Export JSON for this sheet", functionName: "exportSheet2"},
    {name: "Export JS for for this sheet", functionName: "exportJSSheet"}
  ];
  ss.addMenu("Export to openDSA", menuEntries);
}
//This is what is called when the export a JS sheetis selected from menu
function exportJSSheet(e){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet(); 
  displayJS_Text(getJSRowsData_(sheet));
}
//This is what is called when the export a JSON sheet is selected from menu
function exportSheet2(e) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();   
  var json = JSON.stringify(getRowsData(sheet), null, 4);
   displayJSON_Text(json);
}
//Grabs all the rows under the header row
function getRowsData(sheet) {
  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var dataRange = sheet.getRange(sheet.getFrozenRows()+1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  var objects = getObjects(dataRange.getValues(), normalizeHeaders_(headers));
  return objects;
}
//Grabs all the rows under the header row
function getJSRowsData_(sheet) {
  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var dataRange = sheet.getRange(sheet.getFrozenRows()+1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  var text = getJSText(dataRange.getValues(), normalizeHeaders_(headers));
  return text;
  
}
//Returns the JSon text to be displayed in html
// Arguments:
//   - Data: an object containing the row entries
//   - key: the column header names for the frozen row
// Returns an object to convert into a JSON.
function getObjects(data, keys) { 
  
  var jsonObjects = {};
  //Loop through rowdata
  for (var i = 0; i < data.length; ++i) {
    var rowObject = {};
    var hasData = false;
    //Set name of json to refName 
    //This is the first column on spreed sheet
    if(isCellEmpty_(data[i][0])){
        continue;
    }
    for (var j = 1; j < data[i].length; ++j) {
      var cellData = data[i][j];
      if (isCellEmpty_(cellData)) {
        continue;
      }
      if(keys[j] == "hide"){
        //Do not add to json entire row when hide column is true
        if(cellData == true){ break;}
        //Do not add hide column to json when false
        else{ continue;}
      }
      //Do not make json of when a type that is JS export mode only
      if(keys[j] == "type"){
        //These types should not be added to json, they are javascript only
        if(cellData == "link_add" ||cellData == "link_show" || cellData == "link_hide" || cellData == "code" || cellData == "text"){ break;}
      }
       //Check for answer column - format of ';' for multiple entries
      if(keys[j] == "answer"){
       rowObject[keys[j]] = cellData.split(";");
        
      }
      //Check for answer column - format of ';' for multiple entries
      else if(keys[j] == "choices"){
        //Change the delimter
        var tempStr  = cellData.replace(new RegExp(';','g'), "tempDelim");
        tempStr  = tempStr.replace(new RegExp('<','g'), "&lt;");
        tempStr = tempStr.replace(new RegExp('>','g'),"&gt;");
        //rowObject[keys[j]] = cellData.split(";");
        rowObject[keys[j]] =  tempStr.split("tempDelim");
        
      }
      //Check for description column - format for < and > and "
      else if(keys[j] == "description"){
        //Change the text to be json able
         var textStr = cellData.replace(new RegExp('<','g'), "&lt;");
         textStr = textStr.replace(new RegExp('>','g'),"&gt;");
        //rowObject[keys[j]] = cellData.split(";");
        rowObject[keys[j]] =  textStr;
        
      }
      //Skipp data for columns more than 7 
      //This is to make sure the exported raw string columns do not get added
      else if( j > 7){
        continue;
      }
      else{
        
        rowObject[keys[j]] = cellData;
      }
      hasData = true;
    }
    if (hasData) {
      jsonObjects[data[i][0]] = rowObject; 
      
    }
  }
  //Setup data for json
  var translationObj = {};
  var enObj = {};
  translationObj["translations"] = enObj;
  enObj["en"] = jsonObjects;
  
  
  return translationObj;
}
//Returns the JS text to be displayed in html
// Arguments:
//   - Data: an object containing the row entries
//   - key: the column header names for the frozen row
// Returns a rawText for JS file.
function getJSText(data, keys) { 
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var text = "$(document).ready(function() {\n\"use strict\";\nvar av_name = \""+ SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getName() +"\";\nvar av = new JSAV(av_name);\nvar Frames = PIFRAMES.init(av_name);\nvar config = ODSA.UTILS.loadConfig({ av_name: av_name }),\n\tinterpret = config.interpreter,\n\tcode = config.code;\nvar goNext = false;\n";
  //Init display
  var init = "\nav.displayInit();"
  var frameCount = 1;
 for (var i = 0; i < data.length; ++i) {
    var hasData = false;
    //Set name of json to refName 
    //This is the first column on spreed sheet
    if(isCellEmpty_(data[i][0])){
        continue;
    }
   //Loop through all columns in row.
   for (var j = 1; j < data[i].length; ++j) {
      var cellData = data[i][j];
     //Do not add to js when hide column is true
      if(keys[j] == "hide" && cellData == true){
        break;
      }
     
     if(keys[j] == "type"){
       if(cellData == "code"){
         //Add the comment (description column) 
         text += "\n//" + data[i][3] + "\n";
         //he code (question column)
         text += data[i][4];
         
       }
       else if(cellData == "link_add"){
         text+= "\n//"+ data[i][3];
         text+= "\nvar url"+data[i][0]+ "=\"" + data[i][4] + "\";"
         text+= "\nvar "+data[i][0]+"= new av.ds.FA({center:true , url:url"+data[i][0]+"});";
       }
       else if(cellData == "link_show"){
         text+= "\n"+data[i][0]+".show();";
       }
       else if(cellData == "link_hide"){
         text+= "\n"+data[i][0]+".hide();";
       }
       else if(cellData == "text"){
         text+= "\n//Frame "+ frameCount++;
         var textStr  =  data[i][3].replace(new RegExp(/\\/,'g'), "\\\\");
         textStr  =  textStr.replace(new RegExp('"','g'), "\\\"");
         textStr  = textStr.replace(new RegExp('<','g'), "&lt;");
         textStr = textStr.replace(new RegExp('>','g'),"&gt;");
         text+= "\nav.umsg(\""+textStr+"\");";
         if(frameCount > 2)
           text+= "\nav.step();";
         else
           text += init;
           
           
       }
       //Add as a question
       else{
         //Check if first frame
         if(frameCount == 1)   text += init;
         text += "\n//Frame "+ frameCount++ + "\nav.umsg(Frames.addQuestion(\"" + data[i][0] + "\"));\nav.step();";
       }
     }
   }//End of looping through spreedsheet rows   
 }
  text += "\n\nav.recorded();\n});"
  return text;
}
function displayJS_Text(text) {
//  var style = "<style> h1 {  color: blue;  font-family: verdana;  font-size: 300%;} .tag:before{content: '<'}.tag:after{content: '>'}</style>";
 // var test = "<h1 class=\"tag\">test</h1>";
  //text = "&lt</pre>; : &lt;<test>" + text;
  var output = HtmlService.createHtmlOutput("<textarea style='width:100%;' rows='20'>" + text + "</textarea>");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var cell = sheet.getRange("I3");
  cell.setValue(text);
  
  output.setWidth(500);
  output.setHeight(500);
  SpreadsheetApp.getUi()
      .showModalDialog(output, 'Exported JS');
}

function displayJSON_Text(text) {
  var output = HtmlService.createHtmlOutput("<textarea style='width:100%;' rows='20'>" + text + "</textarea>");
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var cell = sheet.getRange("K3");
  cell.setValue(text);
  
  output.setWidth(500)
  output.setHeight(500);
  SpreadsheetApp.getUi()
      .showModalDialog(output, 'Exported JSON');
}
// getRowsData iterates row by row in the input range and returns an array of objects.
// Each object contains all the data for a given row, indexed by its normalized column name.
// Arguments:
//   - sheet: the sheet object that contains the data to be processed
//   - range: the exact range of cells where the data is stored
//   - columnHeadersRowIndex: specifies the row number where the column names are stored.
//       This argument is optional and it defaults to the row immediately above range; 
// Returns an Array of objects.
function getRowsData_(sheet) {
  var headersRange = sheet.getRange(1, 1, sheet.getFrozenRows(), sheet.getMaxColumns());
  var headers = headersRange.getValues()[0];
  var dataRange = sheet.getRange(sheet.getFrozenRows()+1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  var objects = getObjects_(dataRange.getValues(), normalizeHeaders_(headers));
  return objects;
  
}

// For every row of data in data, generates an object that contains the data. Names of
// object fields are defined in keys.
// Arguments:
//   - data: JavaScript 2d array
//   - keys: Array of Strings that define the property names for the objects to create
function getObjects_(data, keys) {
  var objects = [];
  for (var i = 0; i < data.length; ++i) {
    var object = {};
    var hasData = false;
    for (var j = 0; j < data[i].length; ++j) {
      var cellData = data[i][j];
      if (isCellEmpty_(cellData)) {
        continue;
      }
      object[keys[j]] = cellData;
      hasData = true;
    }
    if (hasData) {
      objects.push(object);
    }
  }
  return objects;
}

// Returns an Array of normalized Strings.
// Arguments:
//   - headers: Array of Strings to normalize
function normalizeHeaders_(headers) {
  var keys = [];
  for (var i = 0; i < headers.length; ++i) {
    var key = normalizeHeader_(headers[i]);
    if (key.length > 0) {
      keys.push(key);
    }
  }
  return keys;
}

// Normalizes a string, by removing all alphanumeric characters and using mixed case
// to separate words. The output will always start with a lower case letter.
// This function is designed to produce JavaScript object property names.
// Arguments:
//   - header: string to normalize
// Examples:
//   "First Name" -> "firstName"
//   "Market Cap (millions) -> "marketCapMillions
//   "1 number at the beginning is ignored" -> "numberAtTheBeginningIsIgnored"
function normalizeHeader_(header) {
  var key = "";
  var upperCase = false;
  for (var i = 0; i < header.length; ++i) {
    var letter = header[i];
    if (letter == " " && key.length > 0) {
      upperCase = true;
      continue;
    }
    if (!isAlnum_(letter)) {
      continue;
    }
    if (key.length == 0 && isDigit_(letter)) {
      continue; // first character must be a letter
    }
    if (upperCase) {
      upperCase = false;
      key += letter.toUpperCase();
    } else {
      key += letter.toLowerCase();
    }
  }
  return key;
}
// Returns true if the character char is alphabetical, false otherwise.
function isAlnum_(char) {
  return char >= 'A' && char <= 'Z' ||
    char >= 'a' && char <= 'z' ||
    isDigit_(char);
}
// Returns true if the character char is a digit, false otherwise.
function isDigit_(char) {
  return char >= '0' && char <= '9';
}

// Given a JavaScript 2d Array, this function returns the transposed table.
// Arguments:
//   - data: JavaScript 2d Array
// Returns a JavaScript 2d Array
// Example: arrayTranspose([[1,2,3],[4,5,6]]) returns [[1,4],[2,5],[3,6]].
function arrayTranspose_(data) {
  if (data.length == 0 || data[0].length == 0) {
    return null;
  }

  var ret = [];
  for (var i = 0; i < data[0].length; ++i) {
    ret.push([]);
  }

  for (var i = 0; i < data.length; ++i) {
    for (var j = 0; j < data[i].length; ++j) {
      ret[j][i] = data[i][j];
    }
  }

  return ret;
}

// Returns true if the cell where cellData was read from is empty.
// Arguments:
//   - cellData: string
function isCellEmpty_(cellData) {
  return typeof(cellData) == "string" && cellData == "";
}
