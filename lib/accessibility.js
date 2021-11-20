/**
 * This file supports accessibility tooling for OpenDSA for code treeView's.
 * It does not support assert statements & all Java code must include '{' or
 * '}' for all statements for the code to properly be supported. 
 */

window.onload = () => {
  //wrap code snippets with div and proper classes
  wrapCodeWithSnippets();
  // add treeViews to html
  const snippets = addCodeSnippetSupport();
  /*adds event listeners to each treeView & corresponding buttons 
  for hiding the treeView*/
  for (var i = 0; i < snippets; i++) {
    const buttonId = "tv" + i;
    const treeId = "treeView" + i;
    document.getElementById(buttonId).addEventListener("click", () =>{
      const displayStyle = document.getElementById(treeId).style["display"];
      displayStyle == "none" ? toggleTreeViewOn(buttonId) : toggleTreeViewOff(buttonId);
    });
  }
}

/**
 * Adds treeViews to every code snippet in the document
 * 
 * @returns {number} the number of code snippets in the document
 */
const addCodeSnippetSupport = () => {
  const snippets = document.getElementsByClassName("codeSnippet");
  Array.from(snippets).forEach((snippet, index) => {
    if (snippet.classList.contains("highlight")) {
      try
      {
        addCodeSnippetSupportSingleLang(snippet, index);
      }
      catch (error)
      {
        console.error(error);
        console.error(error.stack);
      }
    }
    else {
      try
      {
        addCodeSnippetSupportMultiLang(snippet, index);
      }
      catch (error)
      {
        console.error(error);
        console.error(error.stack);
      }
    }
  });
  return snippets.length;
}

/**
 * Adds a treeView for the given snippet as long as the snippet supports a single
 * language. This treeView only supports the Java or Java Generic
 * 
 * @param {HTMLNode} snippet the code snippet to have a treeView added to
 * @param {number} index a unique number to be used for this code snippet's html id
 */
const addCodeSnippetSupportSingleLang = (snippet, index) => {
  const javaGenLang = snippet;
  const javaTokens = parseJavaToTokens(javaGenLang.textContent);
  const javaTree = buildParseTree(javaTokens);

  const row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("align-items-center");
  const col1 = document.createElement("div");
  col1.classList.add("col-full");
  col1.classList.add("code-snippet");
  const col2 = document.createElement("div");
  col2.id = `treeView${index}`;
  col2.style.display = "none";
  col2.innerHTML = javaTree;
  row.appendChild(col1);
  row.appendChild(col2);
  const button = document.createElement("button");
  button.id = `tv${index}`;
  button.textContent = "Toggle Tree View";
  button.classList.add("btn");
  button.classList.add("btn-primary");
  const buttonRow = document.createElement("div");
  buttonRow.appendChild(button);
  snippet.parentElement.appendChild(row);
  col1.appendChild(buttonRow);
  col1.appendChild(snippet);
}

/**
 * Adds a treeView for the given snippet as long as the snippet supports multiple
 * languages. This treeView only supports the Java or Java Generic
 * 
 * @param {HTMLNode} snippet the code snippet to have a treeView added to
 * @param {number} index a unique number to be used for this code snippet's html id
 */
const addCodeSnippetSupportMultiLang = (snippet, index) => {
  const buttons = snippet.getElementsByTagName("a");
  /*cause toggling to another language from the first (guaranteed to be Java or 
    Java Generic) to hide the tree view*/
    Array.from(buttons).forEach((button, idx) => {
      if(idx == 0){
        button.addEventListener("click", () => {showTreeViewAndButton(`tv${index}`, `treeView${index}`);});
      }
      else{
        button.addEventListener("click", () => {hideTreeViewAndButton(`tv${index}`);});
      }
    });

    //parse the java code into html
    const snippetCodeLangs = snippet.getElementsByClassName("highlight");
    const javaGenLang = snippetCodeLangs[0];
    const javaTokens = parseJavaToTokens(javaGenLang.textContent);
    const javaTree = buildParseTree(javaTokens);

    //create a row
    const row = document.createElement("div");
    row.classList.add("row");
    row.classList.add("align-items-center");
    //create column 1 to hold the code (full size unless treeView showing)
    const col1 = document.createElement("div");
    col1.classList.add("col-full");
    col1.classList.add("code-snippet");
    //create column 2 to hold the tree view (starts invisible)
    const col2 = document.createElement("div");
    col2.id = `treeView${index}`;
    col2.style.display = "none";
    col2.innerHTML = javaTree;
    row.appendChild(col1);
    row.appendChild(col2);
    //add toggling button to button list
    const button = document.createElement("button");
    button.id = `tv${index}`;
    button.textContent = "Toggle Tree View";
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.style.float = "right";
    snippet.getElementsByTagName('ul')[0].appendChild(button);
    //add row to snippet's current location
    snippet.parentElement.appendChild(row);
    //add snippet to column 1
    col1.appendChild(snippet);
}

/**
 * Toggles on the treeView that corresponds with the given button
 * ID
 * 
 * @param {String} buttonId the id for a button that pairs with a
 *    tree view
 */
const toggleTreeViewOn = (buttonId) => {
  const row = document.getElementById(buttonId).closest(".row");
  const code = row.getElementsByClassName("code-snippet")[0];
  code.classList.remove("col-full");
  code.classList.add("col-half");
  const treeViewId = `treeView${buttonId.replaceAll(/[^0-9]/g, "")}`;
  document.getElementById(treeViewId).style["display"] = "";
  document.getElementById(treeViewId).classList.add("col-half");
}

/**
 * Sets the treeView and button corresponding to the given button ID
 * and tree ID to be invisible
 * 
 * @param {String} buttonId the id for a button that pairs with a
 *    tree view
 * @param {String} treeId the id for a treeView that pairs with a
 *    code snippet 
 */
const hideTreeViewAndButton = (buttonId) => {
  const button = document.getElementById(buttonId);
  button.style.display = "none";
  toggleTreeViewOff(buttonId);
}

/**
 * Sets the treeView and button corresponding to the given button ID
 * and tree ID to be visible
 * 
 * @param {String} buttonId the id for a button that pairs with a
 *    tree view
 * @param {String} treeId the id for a treeView that pairs with a
 *    code snippet 
 */
const showTreeViewAndButton = (buttonId, treeId) => {
  const button = document.getElementById(buttonId);
  button.style.display = "";
  const displayStyle = document.getElementById(treeId).style["display"];
  if(displayStyle != "none"){
    toggleTreeViewOn(buttonId);
  }
  
}

/**
 * Toggles off the treeView that corresponds with the given button
 * ID
 * 
 * @param {String} buttonId the id for a button that pairs with a
 *    tree view
 */
const toggleTreeViewOff = (buttonId) => {
  const row = document.getElementById(buttonId).closest(".row");
  const code = row.getElementsByClassName("code-snippet")[0];
  code.classList.remove("col-half");
  code.classList.add("col-full");
  const treeViewId = `treeView${buttonId.replaceAll(/[^0-9]/g, "")}`;
  document.getElementById(treeViewId).classList.remove("col-half");
  document.getElementById(treeViewId).style["display"] = "none";
}

/**
 * A list of all regex tokens we parse the Java for
 */
const tokenList = [
  {"ID": "Annotation", "Regex": /^@[^\s\/]*/g},
  {"ID": "Comment", "Regex": /^\/\/.*/g},
  {"ID": "Comment", "Regex": /^\/\*+[^\/]*\*\//g},
  {"ID": "Right Brace", "Regex": /^}/g},
  {"ID": "Loop","Regex": /^(for|while)\s*\([^{]*{/g},
  {"ID": "If","Regex": /^if\s*\([^{]*{/g},
  {"ID": "Else", "Regex": /^else\s*{/g},
  {"ID": "Else If", "Regex": /^else\s+if\s*\([^{]*{/g},
  {"ID": "Try", "Regex": /^try[^{]*{/g},
  {"ID": "Catch", "Regex": /^catch[^{]*{/g},
  {"ID": "Interface", "Regex": /^(public\s+|)\s*interface[^{]*{/g},
  {"ID": "Class", "Regex": /^((public|private|protected|)\s+|)(static\s+|)(abstract\s+|)class\s+[^{]*{/g},
  {"ID": "Code Block", "Regex": /^[A-z]*\s*\([^;\n{]*;/g},   //Code for when a method is called
  {"ID": "Switch", "Regex": /^switch[^{]*{/g},
  {"ID": "Case", "Regex": /^case\s*[^:]*:/g},
  {"ID": "Default Case", "Regex": /^default\s*[^:]*:/g},
  {"ID": "Method", "Regex": /^((public|private|protected|)\s+|static|)\s*(static\s+|)\s*(<.*>\s+|)\s*((void|byte|long|short|double|int|float|boolean|char|([A-Z][A-z\<\>]*)\s+)|)\s*\w*\s*\([^;{]*[;{]/g},
  {"ID": "Code Block", "Regex": /^[^;]*;/g},
]

/**
 * Returns all code snippets from the current page that match end in _code 
 * regardless of if they are single or multi language supported.
 *
 * @returns {List} returns a list of HTMLNodes that are code snippets
 */
const getAllCodeBlocks = () => {
  const regex = /^\w*_code$/g;
  const nodeList = document.querySelectorAll('*[id]');
  const multiCodeSnippets = Array.from(nodeList).filter((entry) => entry.id.match(regex));
  const highlightList = document.getElementsByClassName("highlight");
  const singleCodeSnippets = Array.from(highlightList).filter((entry) => !entry.parentNode.parentNode.parentNode.id.match(regex) && !entry.parentNode.classList.contains("highlight-guess"));
  return multiCodeSnippets.concat(singleCodeSnippets);
}

/**
 * Wraps each set of code in the page with the
 * "codeWrapper" div and gives each code block its
 * "codeSnippet" class
 */
const wrapCodeWithSnippets = () => {
  const codeSnippets = getAllCodeBlocks();
  codeSnippets.forEach((snippet) => {
    const wrapObj = wrap(snippet);
    wrapObj.wrapper.classList.add("codeWrapper");
    wrapObj.self.classList.add("codeSnippet");
  });
}


/**
 * Wraps the given HTMLNode in a div
 * 
 * @param {HTMLNode} elem the HTML node to be wrapped in a div
 * @returns {Object} an object where the "wrapper" value is the
 *    new div surrounding elem and the "self" value is the given
 *    elem.
 */
const wrap = (elem) => {
  const parent = elem.parentNode;
  const nodes = parent.childNodes;
  const index = Array.from(nodes).findIndex((entry) => entry == elem);
  const div = document.createElement("div");

  if(index >= nodes.length){          //if this is the last element
    div.appendChild(elem);
    parent.appendChild(div);
  }
  else{                               //if this is not the last element
    const after = nodes[index+1];
    div.appendChild(elem);
    parent.insertBefore(div, after);
  }
  return {
    "wrapper": div,
    "self": elem,
  };
}

/**
 * Parses the given Java code into a series of tokens based on the tokenList
 * object. Each token will return with its ID and the text that matched it.
 * Comments are ignored and Code Block matches are combined if adjacent. The method
 * will recursively create the list of tokens
 * 
 * @param {String} txt the Java text to be tokenized
 * @param {List} list the list to be filled with Java tokens. Default
 *    value is set to a new empty list. List will not be mutated
 * @returns {List} a list of the tokens from the java code
 */
const parseJavaToTokens = (txt, list=[]) => {
  const text = txt.trim().replace(/^\n/, '');
  if (text == '') {
    return list;
  }

  //find all the current valid matches
  const currMatchList = tokenList.map((tokenObj) => {
    const match = text.match(tokenObj.Regex);
    if(match != null && match.length != 0){
      return {"ID": tokenObj.ID, "Match": match[0]};
    }
    return null;
  }).filter((entry) => entry != null);

  const currMatch = currMatchList.length >= 1 ? currMatchList[0] : null;
  
  if (currMatch == null)
  {
    // no need to look further
    return list;
  }
  //update the list with the current match
  const updatedList = ((list, currMatch) => {
    if (currMatch == null || currMatch.ID == "Comment") {
      return list;
    }
    //if the match is not a Code Block adjacent to another code block
    else if (currMatch.ID != "Code Block" || (list.length > 0 ? list[list.length-1].ID : '') != "Code Block") {
      return list.concat(currMatch);
    }
    else {
      const updatedMatch = list[list.length-1].Match.concat(currMatch.Match);
      return list.slice(0, list.length-1).concat({"ID": list[list.length-1].ID, "Match": updatedMatch});
    }
  })(list, currMatch);
  return parseJavaToTokens(text.substring(currMatch.Match.length), updatedList);
}

/**
 * Creates valid html to represent the given tokens in the OpenDSA
 * textbook code format. Iterates through the tokens recursively
 * to create the valid html parse tree
 * 
 * @param {List} tokens the tokens to be converted into html from 
 *    parseJavaToTokens
 * @returns {String} a String of the tokens' html representation
 */
const buildParseTree = (tokens) => {
  const startHtml = '<pre>';
  const endHtml = '</pre>';
  const htmlParsing = (tokens, height=0, html=[], swtch={"defaultFound": false, "firstCaseFound": false, "switchHeight": -1}) => {
    if(tokens.length == 0){
      return html;
    }
    const token = tokens[0];

    //updating height in case we are in a switch statement
    const switchSafeHeight = (
      //if we are at a Case of Default Case, fix height
      ((token.ID == "Case" || token.ID == "Default Case") && swtch.firstCaseFound) ? height-1 :
      //if we are at the end of the switch statement, fix height 
      (token.ID == "Right Brace" && swtch.defaultFound == true && swtch.switchHeight + 2 == height) ? height-1 :
      height);

    const updatedHtmlList = ((token, height, html) => {
      if(token.ID != "Right Brace"){
        if(token.ID == "Comment" || token.ID == "Code Block"){
          return html.concat([`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}</span>\n`]);
        }
        else{
          return html.concat([`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}: ${token.Match.replace(/{/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '')}</span>\n`]);
        }
      }
      return html;
    })(token, switchSafeHeight, html);

    //updating the switch statement state object
    const newSwitchObj = !(token.ID == "Right Brace" && swtch.defaultFound == true && swtch.switchHeight - 2 == height) ?
    {"firstCaseFound": (swtch.firstCaseFound || token.ID == "Case"), 
      "defaultFound": (swtch.defaultFound || token.ID == "Default Case"), 
      "switchHeight": (token.ID == "Switch" ? switchSafeHeight : swtch.switchHeight)}
    :
    {"firstCaseFound": false,
     "defaultFound": false,
     "switchHeight": -1}
    
    //if it is a nesting structure, +1 to height. If it is a right brace, -1, else stay constant
    const updatedHeight = (token.ID != "Comment" && token.ID != "Code Block" && token.ID != "Right Brace" 
    && !(token.ID == "Method" && token.Match.match(/;/g) != null)
    && token.ID != "Annotation" ? switchSafeHeight + 1 : (token.ID == "Right Brace" ? switchSafeHeight - 1 : switchSafeHeight));
    
    return htmlParsing(tokens.slice(1), updatedHeight, updatedHtmlList, newSwitchObj);
  }
  const htmlList = htmlParsing(tokens);
  const html = startHtml.concat(htmlList.join("")).concat(endHtml);
  return html;
}
