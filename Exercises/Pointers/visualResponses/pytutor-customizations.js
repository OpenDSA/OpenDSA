rightwardNudgeHack = false;

add_pytutor_hook(
  "renderPrimitiveObject",
  function(args) {
    var obj = args.obj, d3DomElement = args.d3DomElement;
    var typ = typeof obj;
    if (obj == null) 
      d3DomElement.append('<span class="nullObj">null</span>');
    else if (typ == "number") 
      d3DomElement.append('<span class="numberObj">' + obj + '</span>');
    else if (typ == "boolean") {
      if (obj) 
        d3DomElement.append('<span class="boolObj">true</span>');
      else 
        d3DomElement.append('<span class="boolObj">false</span>');
    }
    else if (obj instanceof Array && obj[0] == "VOID") {
      d3DomElement.append('<span class="voidObj">void</span>');
    }
    else if (obj instanceof Array && obj[0] == "NUMBER-LITERAL") {
      // actually transmitted as a string
      d3DomElement.append('<span class="numberObj">' + obj[1] + '</span>');
    }
    else if (obj instanceof Array && obj[0] == "CHAR-LITERAL") {
      var asc = obj[1].charCodeAt(0);
      var ch = obj[1];
      
      // default
      var show = asc.toString(16);
      while (show.length < 4) show = "0" + show;
      show = "\\u" + show;
      
      if (ch == "\n") show = "\\n";
      else if (ch == "\r") show = "\\r";
      else if (ch == "\t") show = "\\t";
      else if (ch == "\b") show = "\\b";
      else if (ch == "\f") show = "\\f";
      else if (ch == "\'") show = "\\\'";
      else if (ch == "\"") show = "\\\"";
      else if (ch == "\\") show = "\\\\";
      else if (asc >= 32) show = ch;
      
      // stringObj to make monospace
      d3DomElement.append('<span class="stringObj">\'' + show + '\'</span>');
    }
    else
      return [false]; // we didn't handle it
    return [true]; // we handled it
  });

add_pytutor_hook(
  "isPrimitiveType", 
  function(args) {
    var obj = args.obj;
    if ((obj instanceof Array && obj[0] == "VOID")
        || (obj instanceof Array && obj[0] == "NUMBER-LITERAL")
        || (obj instanceof Array && obj[0] == "CHAR-LITERAL")
        || (obj instanceof Array && obj[0] == "ELIDE"))
      return [true, true]; // we handled it, it's primitive
    return [false]; // didn't handle it
  });

add_pytutor_hook(
  "end_updateOutput",
  function(args) {
    var myViz = args.myViz;
    var curEntry = myViz.curTrace[myViz.curInstr];
    if (myViz.params.stdin && myViz.params.stdin != "") {
      var stdinPosition = curEntry.stdinPosition || 0;
      var stdinContent =
        '<span style="color:lightgray;text-decoration: line-through">'+
        escapeHtml(myViz.params.stdin.substr(0, stdinPosition))+
        '</span>'+
        escapeHtml(myViz.params.stdin.substr(stdinPosition));
      myViz.domRoot.find('#stdinShow').html(stdinContent);
    }
    return [false]; 
  });

add_pytutor_hook(
  "end_constructor",
  function(args) {
    var myViz = args.myViz;
    if ((myViz.curTrace.length > 0)
        && myViz.curTrace[myViz.curTrace.length-1]
        && myViz.curTrace[myViz.curTrace.length-1].stdout) {
      myViz.hasStdout = true;
      myViz.stdoutLines = myViz.curTrace[myViz.curTrace.length-1].stdout.split("\n").length;
    }
    // if last frame is a step limit
    else if ((myViz.curTrace.length > 1)
             && myViz.curTrace[myViz.curTrace.length-2]
             && myViz.curTrace[myViz.curTrace.length-2].stdout) {
      myViz.hasStdout = true;
      myViz.stdoutLines = myViz.curTrace[myViz.curTrace.length-2].stdout.split("\n").length;
    }
    else {
      myViz.stdoutLines = -1;
    }
    if (myViz.hasStdout)
      for (var i=0; i<myViz.curTrace.length; i++)
        if (!(myViz.curTrace[i].stdout))
            myViz.curTrace[i].stdout=" "; // always show it, if it's ever used      
  });

add_pytutor_hook(
  "end_render",
  function(args) {
    var myViz = args.myViz;
    myViz.domRoot.find('#pyStdout').attr('cols', 1);
    myViz.domRoot.find('#pyStdout').attr('rows', Math.min(10, myViz.stdoutLines));
    
    if (myViz.params.stdin && myViz.params.stdin != "") {
      var stdinHTML = '<div id="stdinWrap">stdin:<pre id="stdinShow" style="border:1px solid gray"></pre></div>';
      myViz.domRoot.find('#dataViz').append(stdinHTML);
    }

    myViz.domRoot.find('#'+myViz.generateID('globals_header')).html("Static fields");
  });

add_pytutor_hook(
  "isLinearObject",
  function(args) {
    var heapObj = args.heapObj;
    if (heapObj[0]=='STACK' || heapObj[0]=='QUEUE')
      return ['true', 'true'];
    return ['false'];
  });

add_pytutor_hook(
  "renderCompoundObject",
  function(args) {
    var objID = args.objID;
    var d3DomElement = args.d3DomElement;
    var obj = args.obj;
    var typeLabelPrefix = args.typeLabelPrefix;
    var myViz = args.myViz;
    var stepNum = args.stepNum;

    if (!(obj[0] == 'LIST' || obj[0] == 'QUEUE' || obj[0] == 'STACK')) 
      return [false]; // didn't handle

    var label = obj[0].toLowerCase();
    var visibleLabel = {list:'array', queue:'queue', stack:'stack'}[label];
    
    if (obj.length == 1) {
      d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + 'empty ' + visibleLabel + '</div>');
      return [true]; //handled
    }

    d3DomElement.append('<div class="typeLabel">' + typeLabelPrefix + visibleLabel + '</div>');
    d3DomElement.append('<table class="' + label + 'Tbl"></table>');
    var tbl = d3DomElement.children('table');
    
    if (obj[0] == 'LIST') {
      tbl.append('<tr></tr><tr></tr>');
      var headerTr = tbl.find('tr:first');
      var contentTr = tbl.find('tr:last');
      
      // i: actual index in json object; ind: apparent index
      for (var i=1, ind=0; i<obj.length; i++) {
        val = obj[i];
        var elide = val instanceof Array && val[0] == 'ELIDE';
        
        // add a new column and then pass in that newly-added column
        // as d3DomElement to the recursive call to child:
        headerTr.append('<td class="' + label + 'Header"></td>');
        headerTr.find('td:last').append(elide ? "&hellip;" : ind);
        
        contentTr.append('<td class="'+ label + 'Elt"></td>');
        if (!elide) {
          myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
          ind++;
        }
        else {
          contentTr.find('td:last').append("&hellip;");
          ind += val[1]; // val[1] is the number of cells to skip
        }
      }
    } // end of LIST handling

   // Stack and Queue handling code by Will Gwozdz
    /* The table produced for stacks and queues is formed slightly differently than the others,
   missing the header row. Two rows made the dashed border not line up properly */
    if (obj[0] == 'STACK') { 
      tbl.append('<tr></tr><tr></tr>');
      var contentTr = tbl.find('tr:last');
      contentTr.append('<td class="'+ label + 'FElt">'+'<span class="stringObj symbolic">&#8596;</span>'+'</td>');
      $.each(obj, function(ind, val) {
        if (ind < 1) return; // skip type tag and ID entry
        contentTr.append('<td class="'+ label + 'Elt"></td>');
        myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
      });
      contentTr.append('<td class="'+ label + 'LElt">'+'</td>');
    }
    
    if (obj[0] == 'QUEUE') { 
      tbl.append('<tr></tr><tr></tr>');
      var contentTr = tbl.find('tr:last');    
      // Add arrows showing in/out direction
      contentTr.append('<td class="'+ label + 'FElt">'+'<span class="stringObj symbolic">&#8592;</span></td>');    
      $.each(obj, function(ind, val) {
        if (ind < 1) return; // skip type tag and ID entry
        contentTr.append('<td class="'+ label + 'Elt"></td>');
        myViz.renderNestedObject(val, stepNum, contentTr.find('td:last'));
      });
      contentTr.append('<td class="'+ label + 'LElt">'+'<span class="stringObj symbolic">&#8592;</span></td>');    
    }

    return [true]; // did handle
  });

add_pytutor_hook(
  "end_renderDataStructures",
  function(args) {
    var myViz = args.myViz;
    myViz.domRoot.find("td.instKey:contains('___NO_LABEL!___')").hide();
    myViz.domRoot.find(".typeLabel:contains('dict')").each(
      function(i) {
        if ($(this).html()=='dict')
          $(this).html('symbol table');
        if ($(this).html()=='empty dict')
          $(this).html('empty symbol table');
      });
  });

// java synthetics cause things which javascript doesn't like in an id
var old_generateID = ExecutionVisualizer.prototype.generateID;
ExecutionVisualizer.prototype.generateID = function(original_id) {
  var sanitized = original_id.replace(
      /[^0-9a-zA-Z_]/g,
    function(match) {return '-'+match.charCodeAt(0)+'-';}
  );
  return old_generateID(sanitized);
}

// utility functions
var entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': '&quot;',
  "'": '&#39;',
  "/": '&#x2F;'
};

var escapeHtml = function(string) {
  return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
};

