$(document).ready(function() {
  "use strict";
  var av_name = "UmsgGlossaryTest";
  var av = new JSAV(av_name);

  function parseGlossaries(msg){
    var parsedMsg = msg;
    var glossaries = [...msg.matchAll(/:term:`(.*?)`/g)];
    //console.log(glossaries);
    for(var i = 0 ; i < glossaries.length ; i++){
      var parsedGlossary  = glossaries[i][1].match(/\<([^>]+)\>/);
      //console.log(parsedGlossary);
      var refGlossary = "";;
      var displayGlossary = "";
      if(parsedGlossary){
        refGlossary = parsedGlossary[1];
        displayGlossary = glossaries[i][1].slice(0, parsedGlossary.index - 1);
      }
      else{
        refGlossary = glossaries[i][1];
        displayGlossary = glossaries[i][1];
      }

      parsedMsg = parsedMsg.replace(glossaries[i][0], "<a class=\"reference internal\" href=\"Glossary.html#term-" + refGlossary.replace(" ", "-") + "\" target=\"_parent\"><em class=\"xref std std-term ODSAterm\">" + displayGlossary + "</em></a>")
    }
    return parsedMsg;
  }
  
  av.umsg(parseGlossaries("A :term:`language` is simply a collection of strings. These ways include :term:`grammars <grammar>`, and other  like :term:`regular expressions <regular expression>`"));

  av.displayInit();
  av.recorded();
});
