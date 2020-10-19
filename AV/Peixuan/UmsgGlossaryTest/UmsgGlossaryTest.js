(function($) {
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

      //Open the glossary page in canvas frame
      //parsedMsg = parsedMsg.replace(glossaries[i][0], "<a class=\"reference internal\" href=\"Glossary.html#term-" +
      //refGlossary.replace(" ", "-") + "\" target=\"_parent\"><em class=\"xref std std-term\">" + displayGlossary + "</em></a>")

      //canvas link support

      //if use this one, must include this function after the "ODSA.TP" was defineded
      //var canvasID = ODSA.TP.toParams.launch_params.custom_canvas_course_id;
      var canvasID = "2145001"
      var glossaryPageID = "32913984"; //need to get this from server
      var canvasGlossaryPageLink = "https://canvas.instructure.com/courses/" + canvasID + "/modules/items/" + glossaryPageID;
      parsedMsg = parsedMsg.replace(glossaries[i][0], "<a class=\"reference internal\" href=\"" + canvasGlossaryPageLink + "#term-" +
      refGlossary.replace(" ", "-") + "\" target=\"_blank\"><em class=\"xref std std-term\">" + displayGlossary + "</em></a>");

      //local support
      //parsedMsg = parsedMsg.replace(glossaries[i][0], "<a class=\"reference internal\" href=\"Glossary.html#term-" +
      //refGlossary.replace(" ", "-") + "\" target=\"_blank\"><em class=\"xref std std-term\">" + displayGlossary + "</em></a>")
    }
    return parsedMsg;
  }

  //override JSAV's umsg function to apply the term parser globally
  JSAV.prototype.constructor.ext.umsg = function(msg, options) {
    this._msg.umsg(parseGlossaries(msg), options);
  }

}(jQuery));

$(document).ready(function() {
  "use strict";
  var av_name = "UmsgGlossaryTest";
  var av = new JSAV(av_name);

  av.umsg("A :term:`language` is simply a collection of strings. These ways include :term:`grammars <grammar>`, and other like :term:`regular expressions <regular expression>`");
  av.displayInit();
  av.step();
  av.umsg("There's a lot of nice, tidy code you can write without knowing about :term:`pointers <pointer>`.");
  av.step();

  //not support put glossary in other places rather than the description yet
  var Frames = PIFRAMES.init(av_name);
  av.umsg(Frames.addQuestion("q0"));
  av.step();

  av.recorded();
});
