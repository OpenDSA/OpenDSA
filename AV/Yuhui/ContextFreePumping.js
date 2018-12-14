/*global alert: true, console: true, ODSA */
$(document).ready(function() {
  "use strict";
  var config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter;       // get the interpreter
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  // Declare and initialize state variable for user first
  var container = document.getElementById("container"); //container
  var lastoption = document.getElementById("option").value; //user last option
  var para0, para11, para12; //paragraph for step 0,1
  var para21, para22, para23, para24, para25, para26, para3; //paragraph for step 2,3
  var para41, para42, para43;  //paragraph for step 4
  var paraerr, paraerr1;
  var u, v, x, y, z;  //substrings u,v,x,y,z
  var ul, vl, xl, yl, zl; //user input for u,v,x,y,z
  var un, vn, xn, yn, zn; //integers u,v,x,y,z
  var str; //output for string
  var outstr = "w: ";  //w: + str
  var count = 0;  //count for the number of next button click
  var first = 0;
  var errcount = 0;
  var valid = 1;
  var valid1 = 1;
  var valid2 = 1;
  var zeroinput = "input";
  var firstinput = "input1";
  var secondinput = "input2";
  var thirdinput = "input3";
  var fourthinput = "input4";
  var fifthinput = "input5";
  var chaoptcount = 0;
  var chafinpcount = 0;
  var errp = "paraerr1";
  var strsize;
  var laststrsize, lastfstsize, lastsecsize, lastthdsize, lastforsize, lastfifsize;
  //Declare and initialize state variable for computer first
  var p0, p01, p1, p11, pe2, p2, p22, p3, p31, p4, p4e, p41;
  var i3;
  var ranc;
  var strc = "";
  var validc = 1;
  var valids = 1;
  var uc, vc, xc, yc, zc;
  var ivalue, lastivalue;
  // Main action: Result of clicking "Next" button
  function Next() {    
    var option = document.getElementById("option").value;
    if (option != lastoption && first != 0) {
      strsize = 0;
      chaoptcount = chaoptcount + 1;
      if (lastoption == "user") {
        if (count >= 1) {
          para0.style.display = "none";
        }
        if (count >= 2) {
          para11.style.display = "none";
          para12.style.display = "none";
          outstr = "w: ";
        }
        if (count >= 3) {
          para21.style.display = "none";
          para22.style.display = "none";
          para23.style.display = "none";
          para24.style.display = "none";
          para25.style.display = "none";
          para26.style.display = "none";
        }
        if (count >= 4) {
          para3.style.display = "none";
        }
        if (count >= 5) {
          para41.style.display = "none";
          para42.style.display = "none";
          para43.style.display = "none";
        }
        if (valid1 == 0) {
          paraerr1.style.display = "none";
          valid1 = 1;
        }
      }
      else {
          if (count >= 1) {
            p0.style.display = "none";
            p01.style.display = "none";
          }
          if (count >= 2) {
            p1.style.display = "none";
            p11.style.display = "none";
          }
          if (count >= 3) {
            if (validc == 0 || valids == 0) {
              pe2.style.display = "none";
              validc = 1;
              valids = 1;
            }
            p2.style.display = "none";
            p22.style.display = "none";
          }
          if (count >= 4) {
            p3.style.display = "none";
            p31.style.display = "none";
          }
          if (count >= 5) {
            if (valid2 == 0) {
              p4e.style.display = "none";
              valid2 = 1;
            }
            p4.style.display = "none";
            p41.style.display = "none";
          }
      }
      count = 0;
    }
    lastoption = option;
    var input1;
    var input2;
    var input3;
    var input4;
    var input5;
    if (option == "user") {  
      if (count == 0) {
        var node0;
        para0 = document.createElement("p");
        para0.setAttribute("id","para0");
        node0 = document.createTextNode("1. Please select a value for m: ");
        para0.appendChild(node0);
        var i;
        for (i = 0; i < chaoptcount; i++) {
          zeroinput = zeroinput + "0";
        }
        for (i = 0; i < chafinpcount; i++) {
          zeroinput = zeroinput + "0";
        }
        var input0 = document.createElement("input");
        input0.type = "number";
        input0.setAttribute("id",zeroinput);
        para0.appendChild(input0);
        container.appendChild(para0);
      }
      if (count == 1) { 
        strsize = document.getElementById(zeroinput).value;
        var ssize = parseInt(strsize);
        if (!(ssize >= 4 && ssize <= 18)) {
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
          for (i = 0; i < ssize; i++){
            outstr += "c";
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
            para25.style.display = "none";
            para26.style.display = "none";
          }
          if (count >= 4) {
            para3.style.display = "none";
          }
          if (count >= 5) {
            para41.style.display = "none";
            para42.style.display = "none";
            para43.style.display = "none";
          }
          if (valid1 == 0) {
            paraerr1.style.display = "none";
            valid1 = 1;
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
        var node22 = document.createTextNode("|u|: ");
        para23 = document.createElement("p");
        para23.setAttribute("id","para23");
        var node23 = document.createTextNode("|v|: ");
        para24 = document.createElement("p");
        para24.setAttribute("id","para24");
        var node24 = document.createTextNode("|x|: ");
        para25 = document.createElement("p");
        para25.setAttribute("id","para25");
        var node25 = document.createTextNode("|y|: ");
        para26 = document.createElement("p");
        para26.setAttribute("id","para26");
        var node26 = document.createTextNode("|z|: ");
        para21.appendChild(node21);
        para22.appendChild(node22); 
        para23.appendChild(node23);
        para24.appendChild(node24);
        para25.appendChild(node25);
        para26.appendChild(node26);
        container.appendChild(para21); 
        var i;
        for (i = 0; i < chaoptcount; i++) {
          firstinput = firstinput + "1";
          secondinput = secondinput + "2";
          thirdinput = thirdinput + "3";
          fourthinput = fourthinput + "4";
          fifthinput = fifthinput + "5";
        }  
        for (i = 0; i < chafinpcount; i++) {
          firstinput = firstinput + "1";
          secondinput = secondinput + "2";
          thirdinput = thirdinput + "3";
          fourthinput = fourthinput + "4";
          fifthinput = fifthinput + "5";
        }
        input1 = document.createElement("input");
        input1.type = "number";
        input1.setAttribute("id",firstinput);     
        input2 = document.createElement("input");
        input2.type = "number";
        input2.setAttribute("id",secondinput);
        input3 = document.createElement("input");
        input3.type = "number";
        input3.setAttribute("id",thirdinput);
        input4 = document.createElement("input");
        input4.type = "number";
        input4.setAttribute("id",fourthinput);
        input5 = document.createElement("input");
        input5.type = "number";
        input5.setAttribute("id",fifthinput);
        para22.appendChild(input1);
        para23.appendChild(input2);
        para24.appendChild(input3);
        para25.appendChild(input4);
        para26.appendChild(input5);
        container.appendChild(para22);
        container.appendChild(para23);
        container.appendChild(para24);
        container.appendChild(para25);
        container.appendChild(para26);
      }
      if (count == 3) {
        ul = document.getElementById(firstinput).value;
        vl = document.getElementById(secondinput).value;
        xl = document.getElementById(thirdinput).value;
        yl = document.getElementById(fourthinput).value;
        zl = document.getElementById(fifthinput).value;
        un = parseInt(ul);
        vn = parseInt(vl);
        xn = parseInt(xl);
        yn = parseInt(yl);
        zn = parseInt(zl);
        var i;
          if (valid1 == 0) {
            document.getElementById(errp).style.display = "none";
            valid1 = 1;
          }
          var i;
          for (i = 0; i < errcount; i++) {
            errp = errp + "1";
          }
          paraerr1 = document.createElement("p");
          paraerr1.setAttribute("id", errp);
          var numerr = 0;
          if ((un + vn + xn + yn + zn) != (3*parseInt(strsize))) {
            numerr = numerr + 1;
            var nodeerr1 = document.createTextNode(numerr.toString() + ". The sum of u, v, x, y and z must equal to the length of string. ");
            paraerr1.appendChild(nodeerr1);
            valid1 = 0;
          }
          if (vn + xn + yn > parseInt(strsize)) {
            numerr = numerr + 1;
            var nodeerr2 = document.createTextNode("\xa0\xa0" + numerr.toString() + ". Condition violated: |vxy| <= m ");
            paraerr1.appendChild(nodeerr2);
            valid1 = 0;
          }
          if (vn + yn < 1) {
            numerr = numerr + 1;
            var nodeerr3 = document.createTextNode("\xa0\xa0" + numerr.toString() + ". Condition violated: |vy| >= 1 ");
            paraerr1.appendChild(nodeerr3);
            valid1 = 0;
          }
          if (un < 0 || vn < 0 || xn < 0 || yn < 0 || zn < 0) {
            numerr = numerr + 1;
            var nodeerr4 = document.createTextNode("\xa0\xa0" + numerr.toString() + ". Negative number is not accepted.");
            paraerr1.appendChild(nodeerr4);
            valid1 = 0;
          }
          numerr = 0;
          if (valid1 == 0) {
              count = count - 1;
              errcount += 1;
              container.appendChild(paraerr1);
          }
          else {
            str = outstr.substring(3);
            u = str.substring(0, un);
            v = str.substring(un, (un + vn));
            x = str.substring((un + vn), (un + vn + xn));
            y = str.substring((un + vn + xn), (un + vn + xn + yn));
            z = str.substring((un + vn + xn + yn), (un + vn + xn + yn + zn));
            para3 = document.createElement("p");
            para3.setAttribute("id","para3");
            var node = document.createTextNode("u: ");
            var node1 = document.createTextNode(u);
            var node2 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0v: ");
            var node3 = document.createTextNode(v);
            var node4 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0x: ");
            var node5 = document.createTextNode(x);
            var node6 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0y: ");
            var node7 = document.createTextNode(y);
            var node8 = document.createTextNode("\xa0\xa0\xa0\xa0\xa0z: ");
            var node9 = document.createTextNode(z);
            para3.appendChild(node);
            para3.appendChild(node1);
            para3.appendChild(node2);
            para3.appendChild(node3);
            para3.appendChild(node4);
            para3.appendChild(node5);
            para3.appendChild(node6);
            para3.appendChild(node7);
            para3.appendChild(node8);
            para3.appendChild(node9);
            container.appendChild(para3);   
            lastfstsize = ul;
            lastsecsize = vl;
            lastthdsize = xl; 
            lastforsize = yl;
            lastfifsize = zl;
          }
      }
      if (count >= 4) {
        ul = document.getElementById(firstinput).value;
        vl = document.getElementById(secondinput).value;
        xl = document.getElementById(thirdinput).value;
        yl = document.getElementById(fourthinput).value;
        zl = document.getElementById(fifthinput).value;

        if ((lastfstsize != ul) || (lastsecsize != vl) ||(lastthdsize != xl) || (lastforsize != yl) || (lastfifsize != zl)) {
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
        pumpstr = pumpstr + u;
        var i;
        //Pumping 
        for (i = 0; i < ran; i++) {
          pumpstr = pumpstr + v;
        }
        pumpstr = pumpstr + x;
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
        var tempv;
        if (ran == 2) {
          tempy = "yy";
          tempv = "vv";
        }
        else {
          tempy = "";
          tempv = "";
        }
        var node44 = document.createTextNode("u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again.");
        para43.appendChild(node44);
        container.appendChild(para41);
        container.appendChild(para42);
        container.appendChild(para43);
      }  
      count += 1;
      first += 1;
    }
    //computer first
    else {
      if (count == 0) {
        p0 = document.createElement("p");
        var n0 = document.createTextNode("1. I have selected a value for m, displayed below.");
        p0.appendChild(n0);
        p01 = document.createElement("p");
        ranc = Math.floor(Math.random() * (8 - 4 + 1)) + 4; //random number from 4 to 18
        var n01 = document.createTextNode(ranc.toString());
        p01.appendChild(n01);
        container.appendChild(p0);
        container.appendChild(p01);
      }
      if (count == 1) {
        var i;
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
        if (inputstr.length < ranc) {
          if (validc == 0) {
            pe2.style.display = "none";
            validc = 1;
          }
          if (valids == 1) {
            pe2 = document.createElement("p");
            pe2.setAttribute("id","pe2");
            var ne2 = document.createTextNode("Remember |w| must be >= m");
            pe2.appendChild(ne2);
            container.appendChild(pe2);
          }
          valids = 0;
          count = 1;
        }
        else {
          var firstpart;
          var secondpart;
          var thirdpart;
          var legal = 1;
          if (inputstr.length % 3 == 1){
            legal = 0;
          }
          else {
            firstpart = inputstr.substr(0, inputstr.length / 3);
            secondpart = inputstr.substr((inputstr.length / 3), (2 * inputstr.length / 3));
            thirdpart = inputstr.substr((2 * inputstr.length / 3));
            var i;
            for (i = 0; i < inputstr.length / 3; i++){
              if (firstpart.charAt(i) != "a" || secondpart.charAt(i) != "b" || thirdpart.charAt(i) != "c"){
                legal = 0;
              }
            }
          }
          if (legal == 0) {
            if (valids == 0) {
              pe2.style.display = "none";
              valids = 1;
            }
            if (validc == 1) {
              pe2 = document.createElement("p");
              pe2.setAttribute("id","pe2");
              var ne2 = document.createTextNode("That string is not in the language. Please enter another.");
              pe2.appendChild(ne2);
              container.appendChild(pe2);
              validc = 0;
              count = 1;
            }
          } 
          else {
            if (validc == 0 || valids == 0) {
              pe2.style.display = "none";
              validc = 1;
              valids = 1;
            }
            p2 = document.createElement("p");
            var n2 = document.createTextNode("3. I have decomposed w into the following...");
            p2.appendChild(n2);
            container.appendChild(p2);
            var uvxyz = inputstr.length;
            var vxy = Math.floor(Math.random() * (ranc + 1)); //random number from 0 to m
            var vcl = Math.floor(Math.random() * (vxy + 1)); //random number from 0 to the length of vxy
            var ycl = Math.floor(Math.random() * (vxy - vcl + 1)); //random number from 0 to the length of vxy
            if (vxy + ycl == 0) {
              vcl = Math.floor(Math.random() * vxy) + 1;
            }
            // while (vcl + ycl < 1 || vcl + ycl > ranc) {
            //   vcl = Math.floor(Math.random() * (vxy + 1)); //random number from 0 to the length of vxy
            //   ycl = Math.floor(Math.random() * (vxy + 1)); //random number from 0 to the length of vxy
            // }
            var xcl = vxy - vcl - ycl;
            var ucl = uvxyz - vxy;
            // 
            uc = inputstr.substring(0, ucl);
            vc = inputstr.substring(ucl, ucl + vcl);
            xc = inputstr.substring(ucl + vcl, ucl + vcl + xcl);
            yc = inputstr.substring(ucl + vcl + xcl, ucl + vcl + xcl + ycl);
            zc = inputstr.substring(ucl + vcl + xcl + ycl);
            p22 = document.createElement("p");
            var n22 = document.createTextNode("U = " + uc + "; V = " + vc + "; X = " + xc + "; Y = " + yc + "; Z = " + zc);
            p22.appendChild(n22);
            container.appendChild(p22);
          }
        }
      }
      if (count == 3) {
        p3 = document.createElement("p");
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
            valid2 = 1;
          }
          var pumpstr1 = uc;
          var i;
          var tempy = "u";
          for (i = 0; i < parseInt(ivalue); i++) {
            pumpstr1 = pumpstr1 + vc;
            tempy = tempy + "v";
          }
          tempy = tempy + "x";
          pumpstr1 = pumpstr1 + xc;
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
  $("#next").click(Next);
});