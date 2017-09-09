//global alert: true, ODSA
$(document).ready(function () {
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  function setKdValues(node, x, y){
    node.value("x: <span class='xvalue'>" + x + "</span><br/>y: <span class='yvalue'>" + y + "</span>");
  }             
  function getKdValues(node) {
    var $valelem = $('<span/>').html(node.value()), // create new DOM element and set content as the value HTML
        xval = $valelem.find(".xvalue").text(), // get the element holding x-value
        yval = $valelem.find(".yvalue").text(); // get y-value
    return {'x': parseInt(xval, 10), 'y': parseInt(yval, 10)}; // return an object, parse values to integers
  }                 
  
  var getPointIndex = function(node){
    var el = getKdValues(node);
    for (var i = 0; i< keyX.length; i++){
      if(keyX[i] === el.x && keyY[i] === el.y) {return i;}
    }
    return -1;  
  }
  
  // Insert with animation
  var insert_anim = function(node, x, y, level, bounds, i, points) {
    var val = node.value();
    if (!val || val === "jsavnull") { // no value in node : ROOT --> No split
      setKdValues(node, x, y);
      node.css("background-color","red");
      bt.layout();
      jsav.step();
      caption_label.text(caption_text + " completed ");
      
    } else {
      node.css("background-color","yellow");
      if(node.parent()){ node.parent().css("background-color","white");}
      if(j >=0) points[j].css({"fill":"yellow", "fill-opacity": 1});
      if(j > 0){
        k = j-1;
        points[k].css({"fill":"black", "fill-opacity": 1});}
      var el = getKdValues(node);
      if (level % 2 === 0)
      {
        caption_label.text(caption_text + ", comparing X: "+ x +" to X: " + el.x);
        bt.layout();
        jsav.step();
        
        if (el.x >= x)  // go left
        {
          bounds[2] = el.x;                 // inherit xend 
          caption_label.text(caption_text+ "   :   " + x +" < " + el.x+ " --> Go Left");
          
          if (node.left()) {
            j= getPointIndex(node.left());
            insert_anim(node.left(), x, y, ++level, bounds, i, points);}
          else {  // Split and insert left child
            var lin = jsav.g.line(xcanvas + bounds[2], ycanvas + bounds[1], xcanvas + bounds[2], ycanvas + bounds[3], {opacity:0});
            lin.show();
            node.left("y: <span class='yvalue'>" + y + "</span><br/>x: <span class='xvalue'>" + x + "</span>");
            node.left().css("background-color","red");
            bt.layout();
            jsav.step();  
            caption_label.text(caption_text + " completed ");
          }
        } 
        else { // go right
          bounds[0]= el.x;               //inherit xstart
          caption_label.text(caption_text +"    :   " + x +" > " + el.x+ " --> Go Right");
          
          if (node.right()) {
            j=getPointIndex(node.right());
            insert_anim(node.right(), x, y, ++level, bounds, i, points);
          } else {
            var lin = jsav.g.line(xcanvas + el.x, ycanvas + bounds[1], xcanvas + el.x, ycanvas + bounds[3], {opacity:0});
            lin.show();
            node.right("y: <span class='yvalue'>" + y + "</span><br/>x: <span class='xvalue'>" + x + "</span>");
            node.right().css("background-color","red");   
            bt.layout();
            jsav.step();            
            caption_label.text(caption_text + " completed ");
          }
        } //end go right
      } // end if (level % 2 === 0)
      
      else if (level % 2 === 1)
      {
        caption_label.text(caption_text + ", comparing Y: "+ y +" to Y:" + el.y);
        bt.layout();
        jsav.step();
        if (el.y >= y)  // go left
        {
          bounds[3] = el.y;          //inherit yend
          caption_label.text(caption_text +"  :    "+ y +" <= " + el.y+ " --> Go Left");
          
          if (node.left()) {
            j= getPointIndex(node.left());
            insert_anim(node.left(), x, y, ++level, bounds, i, points);}
          else {
            var lin = jsav.g.line(xcanvas + bounds[0], ycanvas + el.y, xcanvas + bounds[2], ycanvas + el.y, {opacity:0});
            lin.show();  
            node.left("x: <span class='xvalue'>" + x + "</span><br/>y: <span class='yvalue'>" + y + "</span>");  
            node.left().css("background-color","red");
            bt.layout();
            jsav.step();
            caption_label.text(caption_text + " completed ");
          }
        } 
        else { // go right
          bounds[1] = el.y;
          caption_label.text(caption_text +"   :   "+ y +" > " + el.y+ " --> Go Right");
          if (node.right()) {
            j= getPointIndex(node.right());
            insert_anim(node.right(), x, y, ++level, bounds, i, points);
          } else {
            var lin = jsav.g.line(xcanvas + bounds[0], ycanvas + el.y, xcanvas + bounds[2], ycanvas + el.y, {opacity:0});
            lin.show();
            node.right("x: <span class='xvalue'>" + x + "</span><br/>y: <span class='yvalue'>" + y + "</span>");
            node.right().css("background-color","red");
            bt.layout();
            jsav.step();
            caption_label.text(caption_text + " completed ");
          }
        } //end go right
      } // end if (level % 2 === 1)
      
    } //end else
  }  // end function

  // traverse to re-set background color of the entire tree
  var traverse_color = function(node, col) {
    var val = node.value();
    if (!val || val === "jsavnull") { // no value in node
      return;
    } else { 
      node.css("background-color", col);
      if (node.left())
        traverse_color(node.left(),col);
      if (node.right())
        traverse_color(node.right(),col);
    }
  }
  
  var init_point = function(xcoord, ycoord){
    var point = jsav.g.circle(xcanvas + xcoord, ycanvas + ycoord, 4, {opacity:0});
    return point;
  } 

  // Execute the "Run" button function
  function runIt() {
    ODSA.AV.reset(true);
    jsav = new JSAV($('.avcontainer'), {settings: settings});
    bt = jsav.ds.binarytree({center:false});
    caption_label = jsav.label("kd-tree insert", {before: bt});
    caption_text = "";
    //var lines = jsav.g.set();       // Set of split lines to be displayed
    var label = "A";
    var c = label.charCodeAt(0);
    var point_label = [];
    k = 0;
    j = 0;
    var canH;
    var width, height;
    
    // Get Viewport width and height:
    if (typeof window.innerWidth != 'undefined') {
      width = window.innerWidth,      
      height = window.innerHeight }
    else if (typeof document.documentElement != 'undefined'     
             && typeof document.documentElement.clientWidth !='undefined' 
             && document.documentElement.clientWidth != 0) {
      width = document.documentElement.clientWidth, 
      height = document.documentElement.clientHeight 
    }
    else {   
      width = document.getElementsByTagName('body')[0].clientWidth,      
      height = document.getElementsByTagName('body')[0].clientHeight }  
    
    $('#av').css({'width': width});   
    
    xcanvas = width/2;
    ycanvas = 0;
//    canH = height*2/3; 
    canH = 460;
    canW = width/3;
    var rect = jsav.g.rect(xcanvas, ycanvas, canW, canH);
    console.log("Rectangle: " + xcanvas + ", " + ycanvas + ", " + canW + ", " + canH);
    
    var wtext = Math.ceil(canW);
    wtext += '';
    //var wlabel = jsav.label(wtext,{before: bt});
    //  wlabel.css({left:"400px", top:"200px"});
    // Initialize points without displaying them:
    keyX = JSAV.utils.rand.numKeys(5,canW-5,10);
    keyY = JSAV.utils.rand.numKeys(5,canH-5,10);
    var points = [];   
    for(var i = 0; i < keyX.length; i++)
    {
      points[i]= init_point(keyX[i], keyY[i]);
      var lab = String.fromCharCode(c);
      point_label[i]= jsav.label(lab, {before: points[i], opacity:0});
      c++;
    }
    //jsav.step();
    for (var i=0; i < keyX.length; i++) {
      jsav.step();
      caption_text = "Inserting ( " + keyX[i] + " , "+ keyY[i] + " )";
      points[i].show();
      point_label[i].show();      // Not working: I'd like to show an alphabetical label next to each dot
      points[i].css({"fill":"red", "fill-opacity": 1});
      caption_label.text(caption_text);
      insert_anim(bt.root(), keyX[i], keyY[i], 0, [0,0,canW,canH], i, points);
      points[i].css({"fill":"black", "fill-opacity": 1});
      for( var k = 0; k < j+1; k++){
        points[k].css({"fill":"black", "fill-opacity": 1});}
      j=0;
      traverse_color(bt.root(), "white");
      bt.layout();
    }
    jsav.step();
    caption_text = "Done inserting 10 points";
    caption_label.text(caption_text);
    jsav.recorded(); // done recording changes, will rewind
  }  

  // Connect action callbacks to the HTML entities
  $('#about').click(about);
  $('#run').click(runIt);
  $('#reset').click(ODSA.AV.reset);

  //////////////////////////////////////////////////////////////////
  // Start processing here
  //////////////////////////////////////////////////////////////////
  // Load the config object with interpreter and code created by odsaUtils.js
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,       // get the interpreter
      settings = config.getSettings();      // Settings for the AV
  var jsav;
  var xcanvas, ycanvas;
  var bt;
  var caption_label;
  var caption_text;
  var j, k;
  var keyX, keyY;
});
