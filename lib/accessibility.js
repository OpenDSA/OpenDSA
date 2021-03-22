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
    if(snippet.classList.contains("highlight")){
      addCodeSnippetSupportSingleLang(snippet, index);
    }
    else{
      addCodeSnippetSupportMultiLang(snippet, index);
    }
  });
  return snippets.length;
}

const addCodeSnippetSupportSingleLang = (snippet, index) => {
  const javaGenLang = snippet;
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
  const buttonRow = document.createElement("div");
  buttonRow.appendChild(button);
  snippet.parentElement.appendChild(row);
  col1.appendChild(buttonRow);
  col1.appendChild(snippet);
}

const addCodeSnippetSupportMultiLang = (snippet, index) => {
  const buttons = snippet.getElementsByTagName("a");
    Array.from(buttons).forEach((button, idx) => {
      if(idx == 0){
        button.addEventListener("click", () => {showTreeViewAndButton(`tv${index}`, `treeView${index}`);});
      }
      else{
        button.addEventListener("click", () => {hideTreeViewAndButton(`tv${index}`);});
      }
    });


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

const hideTreeViewAndButton = (buttonId) => {
  const button = document.getElementById(buttonId);
  button.style.display = "none";
  toggleTreeViewOff(buttonId);
}

const showTreeViewAndButton = (buttonId, treeId) => {
  const button = document.getElementById(buttonId);
  button.style.display = "";
  const displayStyle = document.getElementById(treeId).style["display"];
  if(displayStyle != "none"){
    toggleTreeViewOn(buttonId);
  }
  
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

const buildParseTreeNotPure = (tokens) => {
  let height = 0;
  let html = '<pre style="position: absolute; top: 50%; transform: translateY(-50%);">';
  for(let i = 0; i < tokens.length; i++){
    const token = tokens[i];
    if(token.ID != "Right Brace"){
      if(token.ID == "Comment" || token.ID == "Code Block"){
        console.log(token.Match);
        html = html.concat(`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}</span>\n`)
      }
      else{
        html = html.concat(`${new Array(height*2).join(' ')}<span>H${height} | ${token.ID}: ${token.Match.replace(/{/g, '').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '')}</span>\n`)
      }
    }
    if(token.ID != "Comment" && token.ID != "Code Block" && token.ID != "Right Brace" 
        && !(token.ID == "Method" && token.Match.match(/;/g) != null)
        && token.ID != "Annotation"){
      height += 1;
    }
    else if(token.ID == "Right Brace"){
      height -= 1;
    }
  }
  html = html.concat('</pre>')
  return html;
}


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
  {"ID": "Method", "Regex": /^((public|private|protected|)\s+|static|)\s*(static\s+|)\s*(<.*>\s+|)\s*((void|byte|long|short|double|int|float|boolean|char|([A-Z][A-z\<\>]*)\s+)|)\s*\w*\s*\([^;{]*[;{]/g},
  {"ID": "Code Block", "Regex": /^[^;]*;/g},
]

const getAllCodeBlocks = () => {
  const regex = /^\w*_code$/g;
  const nodeList = document.querySelectorAll('*[id]');
  const multiCodeSnippets = Array.from(nodeList).filter((entry) => entry.id.match(regex));
  const highlightList = document.getElementsByClassName("highlight");
  const singleCodeSnippets = Array.from(highlightList).filter((entry) => !entry.parentNode.parentNode.parentNode.id.match(regex) && !entry.parentNode.classList.contains("highlight-guess"));
  return multiCodeSnippets.concat(singleCodeSnippets);
}

const wrapCodeWithSnippets = () => {
  const codeSnippets = getAllCodeBlocks();
  codeSnippets.forEach((snippet) => {
    const wrapObj = wrap(snippet);
    wrapObj.wrapper.classList.add("codeWrapper");
    wrapObj.self.classList.add("codeSnippet");
  });
}


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


const parseJavaToTokens = (txt, list=[]) => {
  const text = txt.trim().replace(/^\n/, '');
  if(text == ''){
    return list;
  }

  const currMatchList = tokenList.map((tokenObj) => {
    const match = text.match(tokenObj.Regex);
    if(match != null && match.length != 0){
      return {"ID": tokenObj.ID, "Match": match[0]};
    }
    return null;
  }).filter((entry) => entry != null);

  const currMatch = currMatchList.length >= 1 ? currMatchList[0] : null;
  const updatedList = ((list, currMatch) => {
    if(currMatch.ID == "Comment"){
      return list;
    }
    else if(currMatch.ID != "Code Block" || (list.length > 0 ? list[list.length-1].ID : '') != "Code Block"){
      return list.concat(currMatch);
    }
    else{
      const updatedMatch = list[list.length-1].Match.concat(currMatch.Match);
      return list.slice(0, list.length-1).concat({"ID": list[list.length-1].ID, "Match": updatedMatch});
    }
  })(list, currMatch);
  return parseJavaToTokens(text.substring(currMatch.Match.length), updatedList);
}


const buildParseTree = (tokens) => {
  const startHtml = '<pre style="position: absolute; top: 50%; transform: translateY(-50%);">';
  const endHtml = '</pre>';
  const htmlParsing = (tokens, height=0, html=[]) => {
    if(tokens.length == 0){
      return html;
    }
    const token = tokens[0];
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
    })(token, height, html);
    
    const updatedHeight = (token.ID != "Comment" && token.ID != "Code Block" && token.ID != "Right Brace" 
    && !(token.ID == "Method" && token.Match.match(/;/g) != null)
    && token.ID != "Annotation" ? height + 1 : (token.ID == "Right Brace" ? height - 1 : height));
    
    return htmlParsing(tokens.slice(1), updatedHeight, updatedHtmlList);
  }
  const htmlList = htmlParsing(tokens);
  const html = startHtml.concat(htmlList.join("")).concat(endHtml);
  return html;
}



const str = `/** A class with no encapsulation */
class BadBoyShipping {
  public int weight;
  public String address;

  /* remaining code ommitted ... */
}

class ExploitShipping {
  public static void main (String[] args) {
    BadBoyShipping bad = new BadBoyShipping();
    bad.weight = -3;  // Nothing prevents me from doing this
  }
}`;
const tokens = parseJavaToTokens(str);
const res = buildParseTree(tokens);