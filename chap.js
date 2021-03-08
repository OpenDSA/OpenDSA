window.onload = () => {
  wrapCodeWithSnippets();
  const snippets = addCodeSnippetSupport();
  for(var i = 0; i < snippets; i++){
    const buttonId = "tv" + i;
    const treeId = "treeView" + i;
    document.getElementById(buttonId).addEventListener("click", () =>{
      const displayStyle = document.getElementById(treeId).style["display"];
      displayStyle == "none" ? toggleTreeViewOn(buttonId) : toggleTreeViewOff(buttonId);
    });
  }
}



const addCodeSnippetSupport = () => {
  const snippets = document.getElementsByClassName("codeSnippet");
  Array.from(snippets).forEach((snippet, index) => {
    const snippetCodeLangs = snippet.getElementsByClassName("highlight");
    const javaGenLang = snippetCodeLangs[0];
    const javaTokens = parseJavaToTokens(javaGenLang.textContent);
    const javaTree = buildParseTree(javaTokens);

    const row = document.createElement("div");
    row.classList.add("row");
    const col1 = document.createElement("div");
    col1.classList.add("col-md-12");
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
    button.style.float = "right";
    snippet.getElementsByTagName('ul')[0].appendChild(button);
    snippet.parentElement.appendChild(row);
    col1.appendChild(snippet);
  });
  return snippets.length;
}

const toggleTreeViewOn = (buttonId) => {
  const row = document.getElementById(buttonId).closest(".row");
  const code = row.getElementsByClassName("code-snippet")[0];
  code.classList.remove("col-md-12");
  code.classList.add("col-md-6");
  const treeViewId = `treeView${buttonId.replaceAll(/[^0-9]/g, "")}`;
  document.getElementById(treeViewId).style["display"] = "";
  document.getElementById(treeViewId).classList.add("col-md-6");
}

const toggleTreeViewOff = (buttonId) => {
  const row = document.getElementById(buttonId).closest(".row");
  const code = row.getElementsByClassName("code-snippet")[0];
  code.classList.remove("col-md-6");
  code.classList.add("col-md-12");
  const treeViewId = `treeView${buttonId.replaceAll(/[^0-9]/g, "")}`;
  document.getElementById(treeViewId).classList.remove("col-md-6");
  document.getElementById(treeViewId).style["display"] = "none";
}

const extractCode = (buttonId) => {
  const row = document.getElementById(buttonId).closest(".row");
  const snippetDivs = row.getElementsByClassName("highlight");
  const javaDiv = snippetDivs[0];
  const javaTokens = parseJavaToTokens(javaDiv.textContent);
  const javaTree = buildParseTree(javaTokens);
}

const buildParseTree = (tokens) => {
  let height = 0;
  let html = '<pre style="position: absolute; top: 50%; transform: translateY(-50%);">';
  for(var i = 0; i < tokens.length; i++){
    const token = tokens[i];
    if(token.ID != "Right Brace"){
      if(token.ID == "Comment" || token.ID == "Code Block"){
        html = html.concat(`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}</span>\n`)
      }
      else{
        html = html.concat(`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}: ${token.Match.replace(/{/g, '')}</span>\n`)
      }
    }
    if(token.ID != "Comment" && token.ID != "Code Block" && token.ID != "Right Brace" && !(token.ID == "Method" && token.Match.match(/;/g) != null)){
      height += 1;
    }
    else if(token.ID == "Right Brace"){
      height -= 1;
    }
  }
  html = html.concat('</pre>')
  return html;
}

const parseJavaToTokens = (txt) => {
  let text = txt.trim().replace(/^\n/, '');
  let tokenListResult = []
  while(text != ''){
    const currMatchList = tokenList.map((tokenObj) => {
      const match = text.match(tokenObj.Regex);
      if(match != null && match.length != 0){
        return {"ID": tokenObj.ID, "Match": match[0]};
      }
      return null;
    }).filter((entry) => entry != null);
    const currMatch = currMatchList.length >= 1 ? currMatchList[0] : null;
    if((currMatch.ID != "Code Block" || (tokenListResult.length > 0 ? tokenListResult[tokenListResult.length-1].ID : '') != "Code Block")
        && (currMatch.ID != "Comment" || (tokenListResult.length > 0 ? tokenListResult[tokenListResult.length-1].ID : '') != "Comment")){
      tokenListResult.push(currMatch);
    }
    else{
      const updatedMatch = tokenListResult[tokenListResult.length-1].Match.concat(currMatch.Match);
      tokenListResult[tokenListResult.length-1].Match = updatedMatch;
    }
    text = text.substring(currMatch.Match.length).trim().replace(/^\n/, '');
  }
  return tokenListResult;
}


const tokenList = [
  {"ID": "Comment", "Regex": /^\/\/.*/g},
  {"ID": "Right Brace", "Regex": /^}/g},
  {"ID": "Loop","Regex": /^for\s*\([^{]*{/g},
  {"ID": "If Statement","Regex": /^if\s*\([^{]*{/g},
  {"ID": "Interface", "Regex": /^public\s+interface[^{]*{/g},
  {"ID": "Method", "Regex": /^((public|private|protected|)\s+|static)\s*(static\s+|)\s*(void|byte|long|short|double|int|float|boolean|char|([A-Z]\w*))\s*\w*\([^;{]*[;{]/g},
  {"ID": "Code Block", "Regex": /^[^;]*;/g},
]

const wrapCodeWithSnippets = () => {
  const nodeList = document.querySelectorAll('*[id]');
  var regex = /^([^_])*_([^_])*_code$/g;
  var codeSnippets = Array.from(nodeList).filter((entry) => entry.id.match(regex));
  codeSnippets.forEach((snippet) => {
    const wrapObj = wrap(snippet.id);
    wrapObj.wrapper.classList.add("codeWrapper");
    wrapObj.self.classList.add("codeSnippet");
  });
}

const wrap = (id) => {
  const elem = document.getElementById(id);
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


/*
Add the bootstrap
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">

Add this to all blocks and areas
<div class="codeWrapper">
<div id="####" class="codeSnippet">
*/

/* 
For Loop:
  for\s*\([^{]*{
If Statement: 
  if\s*\([^{]*{
*/

//what can we expect to see?
//lets only have support for {}

//for(){}
//if(){}
//else if(){}
//else{}
//(public | private | abstract) class
//(public | private) | interface
//(static) (public | private | protected) [void | type | Generic] name (){}

const tokens = parseJavaToTokens(`static boolean find(List<Integer> L, int k) {\n  for (L.moveToStart();!L.isAtEnd();L.next()){\n    if (k == L.getValue()) {\n      return true;`);
buildParseTree(tokens);