/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  // Declare and initialize state variable
  var outstr = "w: ";
  var str;
  var x;
  var y;
  var z;
  var count = 0;
  // Main action: Result of clicking "Next" button
  function Calculate() {
    var strsize = document.getElementById('stringsize').value;
    var input1;
    var input2;
    var input3;
    if (count == 0) {
      var i;
      
      for (i = 0; i < strsize; i++){
        outstr += "a";
      }
      for (i = 0; i < strsize; i++){
        outstr += "b";
      }
      var para = document.createElement("p");
      var node = document.createTextNode("2. I have selected w such that |w| >= m.");
      para.appendChild(node);
      var para1 = document.createElement("p");
      var node1 = document.createTextNode(outstr);
      para1.appendChild(node1);    
      var element = document.getElementById("container");
      element.appendChild(para);
      element.appendChild(para1);     
    }
    if (count == 1) {
      var para = document.createElement("p");
      var node = document.createTextNode("3. Select decompositon of w into xyz.");
      var para1 = document.createElement("p");
      var node1 = document.createTextNode("|x|: ");
      var para2 = document.createElement("p");
      var node2 = document.createTextNode("|y|: ");
      var para3 = document.createElement("p");
      var node3 = document.createTextNode("|z|: ");
      para.appendChild(node);
      para1.appendChild(node1); 
      para2.appendChild(node2);
      para3.appendChild(node3);
      var element = document.getElementById("container");
      element.appendChild(para);      
      input1 = document.createElement("input");
      input1.type = "number";
      input1.setAttribute("id","input1");     
      input2 = document.createElement("input");
      input2.type = "number";
      input2.setAttribute("id","input2");
      input3 = document.createElement("input");
      input3.type = "number";
      input3.setAttribute("id","input3");
      para1.appendChild(input1);
      para2.appendChild(input2);
      para3.appendChild(input3);
      //input.className = "css-class-name"; // set the CSS class
      element.appendChild(para1);
      element.appendChild(para2);
      element.appendChild(para3);
    }
    if (count == 2) {
      var xl = document.getElementById('input1').value;
      var yl = document.getElementById('input2').value;
      var zl = document.getElementById('input3').value;
      xl = parseInt(xl);
      yl = parseInt(yl);
      zl = parseInt(zl);
      str = outstr.substring(3);
      x = str.substring(0, xl);
      y = str.substring(xl, (xl + yl));
      z = str.substring((xl + yl), (xl + yl + zl));
      var para = document.createElement("p");
      var node = document.createTextNode("x: ");
      var node1 = document.createTextNode(x);
      var node2 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0y: ");
      var node3 = document.createTextNode(y);
      var node4 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0z: ");
      var node5 = document.createTextNode(z);
      para.appendChild(node);
      para.appendChild(node1);
      para.appendChild(node2);
      para.appendChild(node3);
      para.appendChild(node4);
      para.appendChild(node5);
      var element = document.getElementById("container");
      element.appendChild(para);    
    }
    if (count ==3) {
      var ran = Math.floor(Math.random() * 3);
      var p1 = document.createElement("p");
      var n1 = document.createTextNode("4. I have selected i to give a contradiction.");
      p1.appendChild(n1);
      var p2 = document.createElement("p");
      var n2 = document.createTextNode("i = " + ran.toString());
      var pumpstr = "";
      pumpstr = pumpstr + x;
      var i;
      //Pumping 
      for (i = 0; i < ran; i++) {
        pumpstr = pumpstr + y;
      }
      pumpstr = pumpstr + z;
      var n3 = document.createTextNode("\xa0\xa0\xa0\xa0pumped string: " + pumpstr);
      p2.appendChild(n2);
      p2.appendChild(n3);

      var p3 = document.createElement("p");
      var tempy;
      if (ran == 1) {
        tempy = "y";
      }
      else if (ran == 2) {
        tempy = "yy";
      }
      else {
        tempy = ""
      }
      var n4 = document.createTextNode("x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again.");
      p3.appendChild(n4);

      element = document.getElementById("container");
      element.appendChild(p1);
      element.appendChild(p2);
      element.appendChild(p3);
    }  
    count += 1;  
  }
  // Action callbacks for form entities
  $("#about").click(about);
  $("#next").click(Calculate);
});
