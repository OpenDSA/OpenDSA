/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  // Declare and initialize state variable for user
  var outstr = "w: ";
  var str;
  var xn;
  var yn;
  var zn;
  var x;
  var y;
  var z;
  var count = 0;
  var first = 0;
  var errcount = 0;
  var valid = 1;
  var valid1 = 1;
  var container = document.getElementById("container");
  var lastoption = document.getElementById("option").value;
  var zeroinput = "input";
  var firstinput = "input1";
  var secondinput = "input2";
  var thirdinput = "input3";
  var chaoptcount = 0;
  var chafinpcount = 0;
  var errp = "paraerr1";
  var strsize = "";
  var laststrsize = "";
  var lastfstsize = "";
  var lastsecsize = "";
  var lastthdsize = "";
  var para0;
  var para11;
  var para12;
  var para21;
  var para22;
  var para23;
  var para24;
  var para3;
  var para41;
  var para42;
  var para43;
  var valid2 = 1;
  var paraerr;
  var paraerr1;
  var xl = "";
  var yl = "";
  var zl = "";

  //Declare for computer
  var p0;
  var p01;
  var p1;
  var p11;
  var pe2;
  var p2;
  var p31;
  var p4;
  var p4e;
  var p41;
  var i3;
  var ranc;
  var strc = "";
  var validc = 1;
  var xc = "";
  var yc = "";
  var zc = "";
  var ivalue;
  var lastivalue = "";

  // Main action: Result of clicking "Next" button
  function Calculate() {    
    var option = document.getElementById("option").value;
    
    if (option != lastoption && first != 0) {
      
      strsize = 0;
      outstr = "w: ";
      chaoptcount = chaoptcount + 1;
      if (count >= 1) {
        para0.style.display = "none";
      }
      if (count >= 2) {
        para11.style.display = "none";
        para12.style.display = "none";
      }
      if (count >= 3) {
        para21.style.display = "none";
        para22.style.display = "none";
        para23.style.display = "none";
        para24.style.display = "none";
      }
      if (count >= 4) {
        para3.style.display = "none";
      }
      if (count >= 5) {
        para41.style.display = "none";
        para42.style.display = "none";
        para43.style.display = "none";
      }
      count = 0;
    }
    lastoption = option;
    var input1;
    var input2;
    var input3;
    if (option == "user") {  
      if (count == 0) {
        var node0;
        para0 = document.createElement("p");
        para0.setAttribute("id","para0");
        node0 = document.createTextNode("1. Please select a value for m: ");
        para0.appendChild(node0);
        var i;
        // for (i = 0; i < chaoptcount; i++) {
        //   zeroinput = zeroinput + "0";
        // }
        // for (i = 0; i < chafinpcount; i++) {
        //   zeroinput = zeroinput + "0";
        // }
        var input0 = document.createElement("input");
        input0.type = "number";
        input0.setAttribute("id",zeroinput);
        para0.appendChild(input0);
        container.appendChild(para0);
      }
      if (count == 1) { 
        strsize = document.getElementById(zeroinput).value;
        var ssize = parseInt(strsize);
        if (ssize < 4 || ssize > 18) {
          if (valid == 1) {
            paraerr = document.createElement("p");
            paraerr.setAttribute("id","paraerr");
            var nodeerr = document.createTextNode("Please enter a positive integer in range [4, 18] for best results");
            paraerr.appendChild(nodeerr);
            container.appendChild(paraerr);
            valid = 0;
          }
          count = count - 1;
        }
        else {
          if (valid == 0) {
            paraerr.style.display = "none";
            valid = 1;
          } 
          var i;      
          for (i = 0; i < ssize; i++){
            outstr += "a";
          }
          for (i = 0; i < ssize; i++){
            outstr += "b";
          }
          para11 = document.createElement("p");
          para11.setAttribute("id","para11");
          var node11 = document.createTextNode("2. I have selected w such that |w| >= m.");
          para11.appendChild(node11);
          para12 = document.createElement("p");
          para12.setAttribute("id","para12");
          var node12 = document.createTextNode(outstr);
          para12.appendChild(node12);    
          container.appendChild(para11);
          container.appendChild(para12);   
          laststrsize = strsize;
        } 
      }
      //first input reset
      if (count >= 2) {
        strsize = document.getElementById(zeroinput).value;
        if (laststrsize != strsize) {
          outstr = "w: ";
          strsize = 0;
          chafinpcount = chafinpcount + 1;
        
          para11.style.display = "none";
          para12.style.display = "none";
          if (count >= 3) {
            para21.style.display = "none";
            para22.style.display = "none";
            para23.style.display = "none";
            para24.style.display = "none";
          }
          if (count >= 4) {
            para3.style.display = "none";
          }
          if (count >= 5) {
            para41.style.display = "none";
            para42.style.display = "none";
            para43.style.display = "none";
          }
          count = 0;
        } 
      }
      
      if (count == 2) {
        para21 = document.createElement("p");
        para21.setAttribute("id","para21");
        var node21 = document.createTextNode("3. Select decompositon of w into xyz.");
        para22 = document.createElement("p");
        para22.setAttribute("id","para22");
        var node22 = document.createTextNode("|x|: ");
        para23 = document.createElement("p");
        para23.setAttribute("id","para23");
        var node23 = document.createTextNode("|y|: ");
        para24 = document.createElement("p");
        para24.setAttribute("id","para24");
        var node24 = document.createTextNode("|z|: ");
        para21.appendChild(node21);
        para22.appendChild(node22); 
        para23.appendChild(node23);
        para24.appendChild(node24);
        container.appendChild(para21); 
        var i;
        // for (i = 0; i < chaoptcount; i++) {
        //   firstinput = firstinput + "1";
        //   secondinput = secondinput + "2";
        //   thirdinput = thirdinput + "3";
        // }  
        // for (i = 0; i < chafinpcount; i++) {
        //   firstinput = firstinput + "1";
        //   secondinput = secondinput + "2";
        //   thirdinput = thirdinput + "3";
        // }
        input1 = document.createElement("input");
        input1.type = "number";
        input1.setAttribute("id",firstinput);     
        input2 = document.createElement("input");
        input2.type = "number";
        input2.setAttribute("id",secondinput);
        input3 = document.createElement("input");
        input3.type = "number";
        input3.setAttribute("id",thirdinput);
        para22.appendChild(input1);
        para23.appendChild(input2);
        para24.appendChild(input3);
        //input.className = "css-class-name"; // set the CSS class
        container.appendChild(para22);
        container.appendChild(para23);
        container.appendChild(para24);
      }
      if (count == 3) {
        xl = document.getElementById(firstinput).value;
        yl = document.getElementById(secondinput).value;
        zl = document.getElementById(thirdinput).value;
        xn = parseInt(xl);
        yn = parseInt(yl);
        zn = parseInt(zl);
        var i;
        
        if (valid1 == 1) {
          for (i = 0; i < errcount; i++) {
            errp = errp + "1";
          }
          paraerr1 = document.createElement("p");
          paraerr1.setAttribute("id", errp);
          if ((xn + yn + zn) != (2*parseInt(strsize))) {
            var nodeerr1 = document.createTextNode("The sum of x, y and z must equal to the length of string.");
            paraerr1.appendChild(nodeerr1);
            valid1 = 0;
          }
          if (xn + yn > parseInt(strsize)) {
            var nodeerr2 = document.createTextNode("Condition violated: |xy| <= m");
            paraerr1.appendChild(nodeerr2);
            valid1 = 0;
          }
          if (yn <= 0) {
            var nodeerr3 = document.createTextNode("Condition violated: |y| > 0");
            paraerr1.appendChild(nodeerr3);
            valid1 = 0;
          }
          if (xn < 0 && zn < 0) {
            var nodeerr4 = document.createTextNode("x and z cannot be negative.");
            paraerr1.appendChild(nodeerr4);
            valid1 = 0;
          } 
          if (valid1 == 0) {
            count = count - 1;
            errcount += 1;
          }
          else {
            str = outstr.substring(3);
            x = str.substring(0, xn);
            y = str.substring(xn, (xn + yn));
            z = str.substring((xn + yn), (xn + yn + zn));
            para3 = document.createElement("p");
            para3.setAttribute("id","para3");
            var node = document.createTextNode("x: ");
            var node1 = document.createTextNode(x);
            var node2 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0y: ");
            var node3 = document.createTextNode(y);
            var node4 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0z: ");
            var node5 = document.createTextNode(z);
            para3.appendChild(node);
            para3.appendChild(node1);
            para3.appendChild(node2);
            para3.appendChild(node3);
            para3.appendChild(node4);
            para3.appendChild(node5);
            container.appendChild(para3);   
            lastfstsize = xl;
            lastsecsize = yl;
            lastthdsize = zl; 
          }
          container.appendChild(paraerr1);
        }
        else {
          document.getElementById(errp).style.display = "none";
          //console.log(errp);
          valid1 = 1;
          var i;
          for (i = 0; i < errcount; i++) {
            errp = errp + "1";
          }
          paraerr1 = document.createElement("p");
          paraerr1.setAttribute("id", errp);
          if ((xn + yn + zn) != (2*parseInt(strsize))) {
            var nodeerr1 = document.createTextNode("The sum of x, y and z must equal to the length of string. ");
            paraerr1.appendChild(nodeerr1);
            valid1 = 0;
          }
          if (xn + yn > parseInt(strsize)) {
            var nodeerr2 = document.createTextNode("Condition violated: |xy| <= m ");
            paraerr1.appendChild(nodeerr2);
            valid1 = 0;
          }
          if (yn <= 0) {
            var nodeerr3 = document.createTextNode("Condition violated: |y| > 0 ");
            paraerr1.appendChild(nodeerr3);
            valid1 = 0;
          }
          if (xn < 0 && zn < 0) {
            var nodeerr4 = document.createTextNode("x and z cannot be negative. ");
            paraerr1.appendChild(nodeerr4);
            valid1 = 0;
          } 
          if (valid1 == 0) {
              count = count - 1;
              errcount += 1;
              container.appendChild(paraerr1);
          }
          else {
            str = outstr.substring(3);
            x = str.substring(0, xn);
            y = str.substring(xn, (xn + yn));
            z = str.substring((xn + yn), (xn + yn + zn));
            para3 = document.createElement("p");
            para3.setAttribute("id","para3");
            var node = document.createTextNode("x: ");
            var node1 = document.createTextNode(x);
            var node2 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0y: ");
            var node3 = document.createTextNode(y);
            var node4 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0z: ");
            var node5 = document.createTextNode(z);
            para3.appendChild(node);
            para3.appendChild(node1);
            para3.appendChild(node2);
            para3.appendChild(node3);
            para3.appendChild(node4);
            para3.appendChild(node5);
            container.appendChild(para3);   
            lastfstsize = xl;
            lastsecsize = yl;
            lastthdsize = zl; 
          }
        }
        
        
      }
      if (count >= 4) {
        xl = document.getElementById(firstinput).value;
        yl = document.getElementById(secondinput).value;
        zl = document.getElementById(thirdinput).value;
        if ((lastfstsize != xl) || (lastsecsize != yl) || (lastthdsize != zl)) {
          para3.style.display = "none";
          if (count >= 5) {
            para41.style.display = "none";
            para42.style.display = "none";
            para43.style.display = "none";
          }
          count = 2;
        }
      }

      if (count == 4) {
        var ran = Math.floor(Math.random() * 3);
        if (ran == 1) {
          ran = 2;
        }
        para41 = document.createElement("p");
        para41.setAttribute("id","para41");
        var node41 = document.createTextNode("4. I have selected i to give a contradiction.");
        para41.appendChild(node41);
        para42 = document.createElement("p");
        para42.setAttribute("id","para42");
        var node42 = document.createTextNode("i = " + ran.toString());
        var pumpstr = "";
        pumpstr = pumpstr + x;
        var i;
        //Pumping 
        for (i = 0; i < ran; i++) {
          pumpstr = pumpstr + y;
        }
        pumpstr = pumpstr + z;
        var node43 = document.createTextNode("\xa0\xa0\xa0\xa0pumped string: " + pumpstr);
        para42.appendChild(node42);
        para42.appendChild(node43);
        para43 = document.createElement("p");
        para43.setAttribute("id","para43");
        var tempy;
        if (ran == 2) {
          tempy = "yy";
        }
        else {
          tempy = ""
        }
        var node44 = document.createTextNode("x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again.");
        para43.appendChild(node44);
        container.appendChild(para41);
        container.appendChild(para42);
        container.appendChild(para43);
      }  
      count += 1;
      first += 1;
    }
    else {
      if (count == 0) {
        p0 = document.createElement("p");
        var n0 = document.createTextNode("1. I have selected a value for m, displayed below.");
        p0.appendChild(n0);
        p01 = document.createElement("p");
        ranc = Math.floor(Math.random() * (18 - 4 + 1)) + 4;;; //random number from 4 to 18
        var n01 = document.createTextNode(ranc.toString());
        p01.appendChild(n01);
        container.appendChild(p0);
        container.appendChild(p01);
      }
      if (count == 1) {
        var i;
        for (i = 0; i < ranc; i++) {
          strc = strc + "a";
        }
        for (i = 0; i < ranc; i++) {
          strc = strc + "b";
        }
        p1 = document.createElement("p");
        var n1 = document.createTextNode("2. Please enter a possible value for w.");
        p1.appendChild(n1);
        container.appendChild(p1);
        p11 = document.createElement("p");
        var i1 = document.createElement("input");
        i1.setAttribute("id","i1");
        p11.appendChild(i1);
        container.appendChild(p11);
      }
      if (count == 2) {
        var inputstr = document.getElementById("i1").value;
        if (inputstr != strc) {
          if (validc == 1) {
            pe2 = document.createElement("p");
            var ne2 = document.createTextNode("That string is not in the language. Please enter another.");
            pe2.appendChild(ne2);
            container.appendChild(pe2);
          }
          validc = 0;
          count = 1;
        }
        else {
          if (validc == 0) {
            pe2.style.display = "none";
          }
          p2 = document.createElement("p");
          var n2 = document.createTextNode("3. I have decomposed w into the following...");
          p2.appendChild(n2);
          container.appendChild(p2);
          var i;
          for (i = 0; i < ranc; i++) {
            zc = zc + "b";
          }
          var ycl = Math.floor(Math.random() * ranc) + 1; //random number from 1 to m
          var xcl = ranc - ycl;
          xc = strc.substring(0, xcl);
          yc = strc.substring(xcl, (xcl + ycl));
          var p22 = document.createElement("p");
          var n22 = document.createTextNode("X = " + xc + "; Y = " + yc + "; Z = " + zc);
          p22.appendChild(n22);
          container.appendChild(p22);
        }
      }
      if (count == 3) {
        var p3 = document.createElement("p");
        var n3 = document.createTextNode("4. Please enter a possible value for i.");
        p3.appendChild(n3);
        container.appendChild(p3);
        p31 = document.createElement("p");
        var n31 = document.createTextNode("i: ");
        i3 = document.createElement("input");
        i3.type = "number";
        i3.setAttribute("id","i3");
        p31.appendChild(n31);
        p31.appendChild(i3);
        container.appendChild(p31);
      }
      if (count == 4) {
        ivalue = document.getElementById("i3").value;
        if (ivalue == 1 || ivalue < 0 || ivalue > 12) {
          if (valid2 == 1) {
            p4e = document.createElement("p");
            p4e.setAttribute("id", "p4e");
            var n4e = document.createTextNode("Please enter a positve integer in range [0, 2...12] for best results");
            p4e.appendChild(n4e);
            container.appendChild(p4e);
          }
          valid2 = 0;
          count = 3;
        }
        else {
          if (valid2 == 0) {
            p4e.style.display = "none";
          }
          var pumpstr1 = xc;
          var i;
          var tempy = "x";
          for (i = 0; i < parseInt(ivalue); i++) {
            pumpstr1 = pumpstr1 + yc;
            tempy = tempy + "y";
          }
          tempy = tempy + "z";
          pumpstr1 = pumpstr1 + zc;
          p4 = document.createElement("p");
          p4.setAttribute("id", "p4");
          var n4 = document.createTextNode("Pumped String: " + pumpstr1);
          p4.appendChild(n4);
          container.appendChild(p4);

          p41 = document.createElement("p");
          p41.setAttribute("id", "p41");
          var n41 = document.createTextNode(tempy + " = " + pumpstr1 + " is Not in the language. YOU WIN!");
          p41.appendChild(n41);
          container.appendChild(p41);
          lastivalue = ivalue;
        } 
      }
      if (count == 5){
        ivalue = document.getElementById("i3").value;
        if (lastivalue != ivalue) {
          p4.style.display = "none";
          p41.style.display = "none";
          count = 3;
        }
      }
      
      count += 1;
      first += 1;
    } 
    
  }
  // Action callbacks for form entities
  $("#about").click(about);
  $("#next").click(Calculate);
});
