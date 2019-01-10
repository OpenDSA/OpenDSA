/*global alert: true, console: true, ODSA */
$(document).ready(function () {
  "use strict";
  var config = ODSA.UTILS.loadConfig(),
    interpret = config.interpreter;       // get the interpreter
  // Process About button: Pop up a message with an Alert
  function about() {
    alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }
  // Declare and initialize state variable
  var container = document.getElementById("container"); //container
  var move; //who makes the frist move  
  var lemma; //choosen lemma 
  var paraObjective;
  var stepcounter; //The counter of step
  var str = "";
  var strlen;
  var x, y, z;
  var attemps = 0; //how many times the user attemps
  var num; //random number for first step for computer first

  // Result of clicking "Enter" button
  function Enter() {
    lemma = document.getElementById("lemma").value;
    move = document.getElementById("move").value;
    if (move == "select" || lemma == "select2") {
      alert("Please choose who makes the first move or select a lemma"); //error message when users did not select valid option
    }
    else {
      document.getElementById("movepara").style.display = "none"; //remove paragraph of first option
      document.getElementById("lemmapara").style.display = "none"; //remove paragraph of second option
      document.getElementById("enter").style.display = "none"; //remove enter button
      document.getElementById("next").style.display = "block"; //add next step button
      document.getElementById("clear").style.display = "block"; //add clear button
      document.getElementById("explain").style.display = "block"; //add explain button
      //add titles
      if (lemma == "anbn") {
        document.getElementById("anbn").style.visibility = "visible"; //add instructions
      }
      if (lemma == "nanb") {
        document.getElementById("nanb").style.visibility = "visible"; //add instructions
      }
      if (lemma == "wwr") {
        document.getElementById("wwr").style.visibility = "visible"; //add instructions
      }
      if (lemma == "abnak") {
        document.getElementById("abnak").style.visibility = "visible"; //add instructions
      }
      if (lemma == "anbkcnk") {
        document.getElementById("anbkcnk").style.visibility = "visible"; //add instructions
      }
      if (lemma == "anblak") {
        document.getElementById("anblak").style.visibility = "visible"; //add instructions
      }
      if (lemma == "an") {
        document.getElementById("an").style.visibility = "visible"; //add instructions
      }
      if (lemma == "anbk") {
        document.getElementById("anbk").style.visibility = "visible"; //add instructions
      }
      if (lemma == "bbabanan1") {
        document.getElementById("bbabanan1").style.visibility = "visible"; //add instructions
      }
      if (lemma == "b5w") {
        document.getElementById("b5w").style.visibility = "visible"; //add instructions
      }
      if (lemma == "b5wmod") {
        document.getElementById("b5wmod").style.visibility = "visible"; //add instructions
      }
      if (lemma == "bkabnban") {
        document.getElementById("bkabnban").style.visibility = "visible"; //add instructions
      }
      if (lemma == "ab2n") {
        document.getElementById("ab2n").style.visibility = "visible"; //add instructions
      }
      //Step 1 for user first
      if (move == "user") {
        //Appends objective to container
        paraObjective = document.getElementById("paraObjective");
        paraObjective.appendChild(document.createElement("br"));
        paraObjective.appendChild(document.createTextNode("Objective: Find a valid partition that can be pumped."));
        var step1 = document.getElementById("step1");
        step1.appendChild(document.createTextNode("1. Please select a value for m and press \"Next Step\". (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
        var input1 = document.createElement("input"); //input for the first step in user first
        input1.type = "number";
        input1.id = "input1";
        step1.appendChild(document.createElement("br"));
        step1.appendChild(input1);
        stepcounter = 1;
      }
      //step 1 and step 2 for computer first
      if (move == "computer") {
        //Appends objective to container
        paraObjective = document.getElementById("paraObjective");
        paraObjective.appendChild(document.createElement("br"));
        paraObjective.appendChild(document.createTextNode("Objective: Prevent the computer from finding a valid partition."));
        //step 1
        var step1 = document.getElementById("step1");
        step1.appendChild(document.createTextNode("1. I have selected a value for a constant m, displayed below. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
        step1.appendChild(document.createElement("br"));
        stepcounter = 1;
        validInput();
        step1.appendChild(document.createTextNode(num.toString()));
        //step 2
        var step2 = document.createElement("p");
        step2.id = "step2";
        step2.appendChild(document.createTextNode("2. Please enter a possible value for a string w \u2208 L and press \"Next\"."));
        var input2 = document.createElement("input"); //input for the second step in computer first
        input2.type = "text";
        input2.id = "input2";
        step2.appendChild(input2);
        container.appendChild(step2);
        stepcounter = 2;
      }
    }
  }
  // Main action: Result of clicking "Next Step" button
  function Next() {
    stepcounter++;
    //user first
    if (move == "user") {
      //step 2
      if (stepcounter == 2) {
        strlen = document.getElementById("input1").value;
        var bool = validInput();
        if (bool == 1) {   //invalid input
          stepcounter = 1;
        }
        else {
          document.getElementById("input1").disabled = true;
          str = getString();
          var step2 = document.createElement("p");
          step2.id = "step2";
          step2.appendChild(document.createTextNode("2. I have selected w such that |w| >= m. It is displayed below."));
          var br = document.createElement("br");
          step2.appendChild(br);
          step2.appendChild(document.createTextNode("w: " + str));
          container.appendChild(step2);
        }
      }
      //step 3
      if (stepcounter == 3) {
        document.getElementById("setxyz").style.display = "block"; //add set xyz button
        var len = str.length;  //the length of the string
        var step3 = document.createElement("p"); //create the paragraph for step 3
        step3.id = "step3";
        step3.appendChild(document.createTextNode("3. Select decompostion of w into xyz. Click \"Set xyz\" to set decomposition."));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("x: "));
        x = document.createElement("INPUT"); //the text to display x
        x.setAttribute("type", "text");
        x.id = "x";
        step3.appendChild(x);
        step3.appendChild(document.createTextNode("|x|: "));
        var valueOfx = document.createElement("INPUT"); //the text to display the value of range slider of x
        valueOfx.setAttribute("type", "text");
        valueOfx.id = "valueOfx";
        valueOfx.value = "0";
        var rangeOfx = document.createElement("INPUT");
        rangeOfx.setAttribute("type", "range"); //range slider of x
        rangeOfx.id = "rangeOfx";
        rangeOfx.min = "0";
        rangeOfx.max = len.toString(); //max value of range slider equals to the length of the string
        rangeOfx.value = "0";
        rangeOfx.name = str;
        rangeOfx.setAttribute('oninput', 'updateTextInputx(rangeOfx.value, rangeOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfx);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(rangeOfx);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("y: "));
        y = document.createElement("INPUT"); //the text to display y
        y.setAttribute("type", "text");
        y.id = "y";
        step3.appendChild(y);
        step3.appendChild(document.createTextNode("|y|: "));
        var valueOfy = document.createElement("INPUT"); //the text to display the value of range slider of y
        valueOfy.setAttribute("type", "text");
        valueOfy.id = "valueOfy";
        valueOfy.value = "0";
        var rangeOfy = document.createElement("INPUT");
        rangeOfy.setAttribute("type", "range"); //range slider of y
        rangeOfy.id = "rangeOfy";
        rangeOfy.min = "0";
        rangeOfy.max = len.toString(); //max value of range slider equals to the length of the string
        rangeOfy.value = "0";
        rangeOfy.setAttribute('oninput', 'updateTextInputy(rangeOfy.value, rangeOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfy);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(rangeOfy);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("z: "));
        z = document.createElement("INPUT"); //the text to z
        z.setAttribute("type", "text");
        z.id = "z";
        step3.appendChild(z);
        step3.appendChild(document.createTextNode("|z|: "));
        var valueOfz = document.createElement("INPUT"); //the text to display the value of range slider of z
        valueOfz.setAttribute("type", "text");
        valueOfz.id = "valueOfz";
        valueOfz.value = "0";
        var rangeOfz = document.createElement("INPUT");
        rangeOfz.setAttribute("type", "range"); //range slider of z
        rangeOfz.id = "rangeOfz";
        rangeOfz.min = "0";
        rangeOfz.max = len.toString(); //max value of range slider equals to the length of the string
        rangeOfz.value = "0";
        rangeOfz.setAttribute('oninput', 'updateTextInputz(rangeOfz.value, rangeOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfz);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(rangeOfz);
        container.appendChild(step3);
      }
      if (stepcounter == 4) {
        stepcounter--;
      }
    }
    //computer first
    if (move == "computer") {
      //step 3 
      if (stepcounter == 3) {
        str = str + document.getElementById("input2").value;
        var bool = validInput();
        if (bool == 1) {   //invalid input
          stepcounter = 2;
          str = "";
        }
        else {
          var step3 = document.createElement("p"); //create the paragraph for step 3
          step3.id = "step3";
          step3.appendChild(document.createTextNode("3. I have decomposed w into the following..."));
          step3.appendChild(document.createElement("br"));
          document.getElementById("input2").disabled = true;
          if (lemma == "an") {
            x = "λ";
            y = "aa";
            z = str.substring(2);
            if (z == "") {
              z = "λ";
            }
            step3.appendChild(document.createTextNode("X = λ; \xa0Y = aa; \xa0Z = " + z));
          }
          else if (lemma == "anbk") {
            if (str[1] == 'a') {
              x = "λ";
              y = "aa";
              z = str.substring(2);
              if (z == "") {
                z = "λ";
              }
              step3.appendChild(document.createTextNode("X = λ; \xa0Y = aa; \xa0Z = " + z));
            }
            if (str[1] == 'b') {
              x = "a";
              y = "bb";
              z = str.substring(3);
              if (z == "") {
                z = "λ";
              }
              step3.appendChild(document.createTextNode("X = a; \xa0Y = bb; \xa0Z = " + z));
            }
          }
          else if (lemma == "b5wmod") {
            x = "bbbbb";
            y = str.substring(5, 8);
            z = str.substring(8);
            if (z == "") {
              z = "λ";
            }
            step3.appendChild(document.createTextNode("X = bbbbb; \xa0Y = " + str.substring(5, 8) + "; \xa0Z = " + z));
          }
          else if (lemma == "ab2n") {
            x = "λ";
            y = "abab";
            z = str.substring(4);
            if (z == "") {
              z = "λ";
            }
            step3.appendChild(document.createTextNode("X = λ; \xa0Y = abab; \xa0Z = " + z));
          }
          else {
            var temp = Math.floor(Math.random() * (num - 1)) + 1;
            var xy = str.substring(0, temp);
            var ylength = Math.floor(Math.random() * (xy.length - 1)) + 1;
            x = xy.substring(0, xy.length - ylength);
            y = xy.substring(xy.length - ylength);
            z = str.substring(temp);
            if (x == "") {
              x = "λ";
            }
            if (z == "") {
              z = "λ";
            }
            step3.appendChild(document.createTextNode("X = " + x + "; Y = " + y + "; Z = " + z));
          }
          container.appendChild(step3);
        }
      }
    }
    // Step 4
    if (stepcounter == 4) {
      var step4 = document.createElement("p"); //create the paragraph for step 4
      step4.id = "step4";
      step4.appendChild(document.createTextNode("4. Please enter a possible value for i and press \"Next\". (i is a positive integer such that xy^iz \u2208 L for all i \u2265 0)"));
      step4.appendChild(document.createElement("br"));
      step4.appendChild(document.createTextNode("i: "));
      var i = document.createElement("INPUT");
      i.type = "number";
      i.id = "i";
      step4.appendChild(i);
      container.appendChild(step4);
    }
    if (stepcounter == 5) {
      attemps++;
      var i = document.getElementById("i").value;
      if (i.length == 0) {  //empty input
        alert("Please enter a possible integer in range [0, 2...12} for best results.");
        stepcounter = 4;
      }
      else if (i != 0 && (i < 2 || i > 12)) {
        alert("Please enter a possible integer in range [0, 2...12} for best results.");
        stepcounter = 4;
      }
      else {
        document.getElementById("i").disabled = true;
        var step4 = document.getElementById("step4");
        step4.appendChild(document.createTextNode("\xa0\xa0\xa0\xa0\xa0pumped string: "));
        var pumpstr = "";
        if (x != "λ") {
          pumpstr = pumpstr + x;
        }
        var temp;
        temp = "xy^" + i.toString() + "z = x";
        var j;
        for (j = 0; j < i; j++) {
          pumpstr = pumpstr + y;
          temp = temp + "y";
        }
        if (z != "λ") {
          pumpstr = pumpstr + z;
        }
        if (lemma == "an" || lemma == "anbk" || lemma == "b5wmod" || lemma == "ab2n") {
          temp = temp + "z = " + pumpstr + " is in the language. YOU WIN!";
          alert("My attemps:\n" + attemps.toString() + ": X = " + x + "; Y = " + y + "; Z = " + z + "; I = " + i + "; WON");
        }
        else {
          temp = temp + "z = " + pumpstr + " is NOT in the language. Please try again!";
          alert("My attemps:\n" + attemps.toString() + ": X = " + x + "; Y = " + y + "; Z = " + z + "; I = " + i + "; Failed");
        
        }
        step4.appendChild(document.createTextNode(pumpstr));
        step4.appendChild(document.createElement("br"));
        step4.appendChild(document.createTextNode(temp));
      }
    }
  }

  // Reload the whole page when the user click the Reset button
  function Reset() {
    location.reload();
  }

  //Initializes the tool, returns to step 1 when user click Clear button
  function Clear() {
    if (move == "user") {
      //remove each step
      if (stepcounter >= 1) {
        document.getElementById("step1").remove();
      }
      if (stepcounter >= 2) {
        document.getElementById("step2").remove();
      }
      if (stepcounter >= 3) {
        document.getElementById("step3").remove();
      }
      if (stepcounter >= 4) {
        document.getElementById("step4").remove();
      }
      document.getElementById("setxyz").style.display = "none"; //remove set xyz button
      stepcounter = 1;   //returns to step 1
      str = "";  //clean str
      //reset step 1
      var step1 = document.createElement("p");
      step1.id = "step1";
      step1.appendChild(document.createTextNode("1. Please select a value for m and press \"Next Step\". (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
      step1.appendChild(document.createElement("br"));
      var input1 = document.createElement("input"); //input for the first step
      input1.type = "number";
      input1.id = "input1";
      step1.appendChild(input1);
      container.appendChild(step1);
    }
    else {
      //remove each step
      if (stepcounter >= 1) {
        document.getElementById("step1").remove();
      }
      if (stepcounter >= 2) {
        document.getElementById("step2").remove();
      }
      if (stepcounter >= 3) {
        document.getElementById("step3").remove();
      }
      if (stepcounter >= 4) {
        document.getElementById("step4").remove();
      }
      str = "";  //clean str
      // reset step 1 and step 2
      var step1 = document.createElement("p");
      step1.id = "step1";
      step1.appendChild(document.createTextNode("1. I have selected a value for a constant m, displayed below. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
      step1.appendChild(document.createElement("br"));
      stepcounter = 1;
      validInput();
      step1.appendChild(document.createTextNode(num.toString()));
      container.appendChild(step1);
      //step 2
      var step2 = document.createElement("p");
      step2.id = "step2";
      step2.appendChild(document.createTextNode("2. Please enter a possible value for a string w \u2208 L and press \"Next\"."));
      var input2 = document.createElement("input"); //input for the second step in computer first
      input2.type = "text";
      input2.id = "input2";
      step2.appendChild(input2);
      container.appendChild(step2);
      stepcounter = 2;
    }
  }
  //Result of clicking "Explain" button
  function Explain() {
    var a;
    if (lemma == "anbn") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is a^m b^m".' +
        ' The y value thus would be a multiple of \"a\". For any i ≠ 1, n_a ≠ n_b, giving a string which is not ' +
        'in the language. Thus, the language is not regular.\n'
    }
    if (lemma == "nanb") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is a^m b^(m+1)".' +
        ' The y value thus would be a multiple of \"a\". For any i > 1, n_a > n_b, giving a string which is not ' +
        'in the language. Thus, the language is not regular.\n'
    }
    if (lemma == "wwr") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is a^m bb a^m".' +
        ' The y value thus would be a multiple of \"a\" in \'w\' and not in \'w^R\'. If i = 0, then the total string becomes ' +
        'at most \"a^(m-1)bba^m\", which is not in the language. Thus, the language is not regular.\n'
    }
    if (lemma == "abnak") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is \"(ab)^(m+1)a^m\". ' +
        'To be in the language, y must possess \"ab\"s, \"ba\"s, \"a\"s, and/or \"b\"s. Any multiple or combination thereof ' +
        'yields a string that is not in the language when i = 0, meaning this is not a regular language.';
    }
    if (lemma == "anbkcnk") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "a^m b^m c^(2m)". The y value' +
        ' thus would be a multiple of "a". If i = 0, the string becomes at most "am-1bmc2m", which is not in the language. Thus, the language is not regular.';
    }
    if (lemma == "anblak") {
      a = 'Unfortunately no valid partition of w exists. For any m value ≥ 4, a possible value for w is "a^6 b^m a^m". The y value thus would be a combination ' +
        'of "a"s and "b"s, in that order. If i = 0, either n ≤ 5, k > l, or both, giving a string that is not in the language. Thus, the language is not regular.';
    }
    if (lemma == "an") {
      a = 'A valid partition of w exists! Because this is a regular language, a valid decomposition exists. If m ≥ 2, the y value "aa" will always pump the string.';

    }
    if (lemma == "anbk") {
      a = 'A valid partition of w exists! Because this is a regular language, a valid decomposition exists. If m ≥ 2, the y value "aa" will always pump the string.';
    }
    if (lemma == "bbabanan1") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "bba(ba)^m a^(m-1)". No possible y value among the "bba(ba)^m" ' +
        'segment is possible to pump, meaning any possible generated string is not in the language. Thus, the language is not regular.';
    }
    if (lemma == "b5w") {
      a = 'Unfortunately no valid partition of w exists. For any m value ≥ 6, a possible value for w is "b^5b^(2(m-5))a^(3(m-5))". The y value thus would be a multiple ' +
        'of "b". For any i ≠ 1, 2n_a(\'w\') ≠ 3n_b(\'w\') or n_b in the whole string< 5, giving a string which is not in the language. Thus, the language is not regular.';
    }
    if (lemma == "b5wmod") {
      a = 'A valid partition of w exists! Because this is a regular language, a valid decomposition exists. If m ≥ 8, as long as |y| % 3 = 0 and none of the ' +
        'first 5 "b"s are in y, the decomposition is successful. Pumping any possible combination of 3 characters yields a string divisible by 3.';

    }
    if (lemma == "bkabnban") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "b^4 (ab)^(m/2) (ba)^(m/2)". No possible y value among ' +
        'the "b^4 (ab)^(m/2)" segment will work, so the language is not regular.';
    }
    if (lemma == "ab2n") {
      a = 'A valid partition of w exists! Because this is a regular language, a valid decomposition exists. As long as m ≥ 4, then if y = "abab" (or "baba" if m≥5), the decomposition can be pumped for any i value.';
    }
    alert(a);
  }

  //Set xyz buttion in step 3 and step 4
  function Setxyz() {
    if (stepcounter == 3) {
      x = document.getElementById("x").value;
      y = document.getElementById("y").value;
      z = document.getElementById("z").value;
      var xval = x.length;
      var yval = y.length;
      var zval = z.length;
      var valx = document.getElementById("valueOfx").value;
      var valy = document.getElementById("valueOfy").value;
      var valz = document.getElementById("valueOfz").value;

      if (parseInt(valx) + parseInt(valy) + parseInt(valz) != parseInt(str.length)) {
        alert("The sum of |x|, |y|, and |z| should equal to the length of string, please do it again.");
      }
      else {
        if (yval < 1) {
          alert("Condition violated: |y| > 0");
        }
        else if (xval + yval > strlen) {
          alert("Condition violated: |xy| <= m");
        }
        //Step 4
        else {
          attemps++;
          document.getElementById("x").disabled = true;
          document.getElementById("y").disabled = true;
          document.getElementById("z").disabled = true;
          document.getElementById("valueOfx").disabled = true;
          document.getElementById("valueOfy").disabled = true;
          document.getElementById("valueOfz").disabled = true;
          document.getElementById("rangeOfx").disabled = true;
          document.getElementById("rangeOfy").disabled = true;
          document.getElementById("rangeOfz").disabled = true;
          
          var step4 = document.createElement("p");
          step4.id = "step4";
          step4.appendChild(document.createTextNode("4. I have selected i to give a contradiction.(i is a positive integer such that xy^iz \u2208 L for all i \u2265 0) It is displayed below"));
          var br = document.createElement("br");
          step4.appendChild(br);
          var ran = Math.floor(Math.random() * 3); // random number from 0 to 2
          if (ran == 1) {
            ran = 0;
          }
          var pumpstr = "";  //pumped string
          pumpstr = pumpstr + x;
          var i;
          //Pumping 
          for (i = 0; i < ran; i++) {   //test 2
            pumpstr = pumpstr + y;
          }
          pumpstr = pumpstr + z;
          step4.appendChild(document.createTextNode("i: " + ran.toString() + "\xa0\xa0\xa0\xa0pumped string: " + pumpstr));
          step4.appendChild(document.createElement("br"));
          var tempy;
          var yorder;
          if (ran == 2) {
            tempy = "yy";
            yorder = "\xB2"
          }
          else {
            tempy = ""
            yorder = "\xB0"
          }
          var localx = x;
          var localz = z;
          if (x == "") {
            localx = "λ";
          }
          if (z == "") {
            localz = "λ";
          }
          var outstring;
          if (lemma == "an" && pumpstr.length % 2 == 0) {
            step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
            outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; WON";
          }
          else if (lemma == "anbk") {
            var bool = 1;
            var i;
            var last = 'a';
            var numa = 0;
            var numb = 0;
            for (i = 0; i < pumpstr.length; i++) {
              if (pumpstr[i] == 'a' && last == 'b') {
                bool = 0;
              }
              last = pumpstr[i];
              if (pumpstr[i] == 'a') {
                numa++;
              }
              else {
                numb++;
              }
            }
            if (numa % 2 == 0 && numb % 2 == 1) {
              bool = 0;
            }
            if (bool == 1) {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; WON";
            }
            else {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
            }
          }
          else if (lemma == "b5wmod") {
            var i;
            var numa = 0;
            var numb = 0;
            for (i = 0; i < pumpstr.length; i++) {
              if (pumpstr[i] == 'a') {
                numa++;
              }
              else {
                numb++;
              }
            }
            numb = numb - 5;
            if ((2 * numa + 5 * numb) % 3 == 0) {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; WON";
            }
            else {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
            }
          }
          else if (lemma == "ab2n") {
            var i;
            var bool = 1;
            var last;
            var numa = 0;
            var numb = 0;
            for (i = 0; i < pumpstr.length; i++) {
              if (pumpstr[i] == 'a') {
                numa++;
              }
              else {
                numb++;
              }
              if (pumpstr[0] != 'a' || pumpstr[pumpstr.length - 1] != 'b') {
                bool = 0;
              }
              if (i > 0 && i < pumpstr.length - 1) {
                if (pumpstr[i] == 'b' && (pumpstr[i - 1] != 'a' || pumpstr[i + 1] != 'a')) {
                  bool = 0;
                }
                if (pumpstr[i] == 'a' && (pumpstr[i - 1] != 'b' || pumpstr[i + 1] != 'b')) {
                  bool = 0;
                }
              }
            }
            if (numb % 2 != 0 || numa % 2 != 0) {
              bool = 0;
            }
            if (bool == 1) {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; WON";
            }
            else {
              step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
              outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
            }
          }
          else {
            step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
            outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
          }
          container.appendChild(step4);
          alert(outstring);
          stepcounter++;
        }
      }
    }
  }
  //helper function for error message of invalid input based on different lemma
  //also generate a random number for computer first
  function validInput() {
    if (lemma == "anbn") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (18 - 4)) + 4; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        if (str.length % 2 != 0) {
          alert("That string was not in the language. Please enter another.");
          return 1;
        }
        else {
          var head = str.substring(0, str.length / 2);
          var tail = str.substring(str.length / 2);
          var i;
          for (i = 0; i < head.length; i++) {
            if (head[i] != 'a' || tail[i] != 'b') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 4 && strlen <= 18) && move == "user") {
        alert("Please enter a positive integer in range [4, 18] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "nanb") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (17 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        var acounter = 0;
        var bcounter = 0;
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        for (i = 0; i < str.length; i++) {
          if (str[i] == 'a') {
            acounter++;
          }
          if (str[i] == 'b') {
            bcounter++;
          }
        }
        if (acounter >= bcounter) {
          alert("That string was not in the language. Please enter another.");
          return 1;
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 17) && move == "user") {
        alert("Please enter a positive integer in range [2, 17] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "wwr") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        if (str.length % 2 != 0) {
          alert("That string was not in the language. Please enter another.");
          return 1;
        }
        else {
          var head = str.substring(0, str.length / 2);
          var tail = str.substring(str.length / 2);
          var i;
          var splitString = head.split("");
          var reverseArray = splitString.reverse();
          head = reverseArray.join("");
          for (i = 0; i < head.length; i++) {
            if (head[i] != tail[i]) {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 10) && move == "user") {
        alert("Please enter a positive integer in range [2, 10] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "abnak") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var lastb = 0;
          for (i = 0; i < str.length; i++) {
            if (str[i] == 'b') {
              lastb = i;
            }
          }
          var head = str.substring(0, lastb + 1);
          var tail = str.substring(lastb + 1);
          if (head.length % 2 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          if (tail.length < 0 || head.length / 2 <= tail.length) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] != 'a') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          for (i = 0; i < head.length; i++) {
            if (((i % 2 == 0) && (head[i] != 'a')) || ((i % 2 == 1) && (head[i] != 'b'))) {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 11) && move == "user") {
        alert("Please enter a positive integer in range [2, 11] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "anbkcnk") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (9 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var firstb = -1;
          var firstc = -1;
          for (i = 0; i < str.length; i++) {
            if (str[i] == 'b' && firstb == -1) {
              firstb = i;
            }
            if (str[i] == 'c' && firstc == -1) {
              firstc = i;
            }
          }
          if (firstc == -1) {   //which means there is no "c"s in the string, which is invalid.
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          var tail = str.substring(firstc);
          for (i = 0; i < tail.length; i++) {
            if (tail[i] != 'c') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          var head;
          var mid;
          if (firstb == -1) {   //which means there is no "b"s in the string.
            head = str.substring(0, firstc);
            mid = "";
          }
          else {
            mid = str.substring(firstb, firstc);
            for (i = 0; i < mid.length; i++) {
              if (mid[i] != 'b') {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
            head = str.substring(0, firstb);
          }
          if (head.length != 0) {
            for (i = 0; i < head.length; i++) {
              if (head[i] != 'a') {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
          }
          if (head.length + mid.length != tail.length) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 9) && move == "user") {
        alert("Please enter a positive integer in range [2, 9] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "anblak") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (15 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var head;
          var mid;
          var tail;
          var firstb = -1;
          var lastb = -1;
          var i;
          for (i = 0; i < str.length; i++) {
            if (str[i] == 'b' && firstb == -1) {
              firstb = i;
            }
            if (str[i] == 'b') {
              lastb = i;
            }
          }
          if (firstb == -1) { //which means there is no "b"s in the string, which is invalid.
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          head = str.substring(0, firstb);
          mid = str.substring(firstb, lastb + 1);
          tail = str.substring(lastb + 1);
          if (head.length <= 5 || mid.length <= 3 || tail.length > mid.length) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          for (i = 0; i < head.length; i++) {
            if (head[i] != 'a') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          for (i = 0; i < mid.length; i++) {
            if (mid[i] != 'b') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] != 'a') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 15) && move == "user") {
        alert("Please enter a positive integer in range [2, 15] for best results"); //error message
        return 1;
      }

    }
    if (lemma == "an") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (18 - 2)) + 2; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          if (str.length % 2 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          var i;
          for (i = 0; i < str.length; i++) {
            if (str[i] != 'a') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 2 && strlen <= 18) && move == "user") {
        alert("Please enter a positive integer in range [2, 18] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "anbk") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 3)) + 3; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var firstb = -1;
          for (i = 0; i < str.length; i++) {
            if (str[i] == 'b' && firstb == -1) {
              firstb = i;
            }
          }
          if (firstb == -1) {
            for (i = 0; i < str.length; i++) {
              if (str[i] != 'a' || str.length % 2 != 1) {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
          }
          else {
            var head = str.substring(0, firstb);
            var tail = str.substring(firstb);
            if (head.length % 2 != 1 && tail.length % 2 != 0) {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
            for (i = 0; i < head.length; i++) {
              if (head[i] != 'a') {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
            for (i = 0; i < tail.length; i++) {
              if (tail[i] != 'b') {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 3 && strlen <= 10) && move == "user") {
        alert("Please enter a positive integer in range [3, 10] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "bbabanan1") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 5)) + 5; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var lastb = -1;
          var head = str.substring(0, 3);
          var tail = str.substring(3);
          if (head != "bba" || str[str.length - 1] != 'a') {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] == 'b') {
              lastb = i;
            }
          }
          if (lastb == -1) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          var mid = tail.substring(0, lastb + 2);
          tail = tail.substring(lastb + 2);
          for (i = 0; i < mid.length; i++) {
            if ((i % 2 == 0 && mid[i] != 'b') || (i % 2 == 1 && mid[i] != 'a')) {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          if (mid.length % 2 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          else {
            if (mid.length / 2 - 1 != tail.length) {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] != 'a') {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 5 && strlen <= 10) && move == "user") {
        alert("Please enter a positive integer in range [5, 10] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "b5w") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 6)) + 6; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var head = str.substring(0, 5);
          var tail = str.substring(5);
          var acounter = 0;
          var bcounter = 0;
          if (head != "bbbbb") {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] == 'a') {
              acounter++;
            }
            else if (tail[i] == 'b') {
              bcounter++;
            }
            else {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          if (2 * acounter != 3 * bcounter) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 6 && strlen <= 10) && move == "user") {
        alert("Please enter a positive integer in range [6, 10] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "b5wmod") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (20 - 8)) + 8; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var head = str.substring(0, 5);
          var tail = str.substring(5);
          var acounter = 0;
          var bcounter = 0;
          if (head != "bbbbb") {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          for (i = 0; i < tail.length; i++) {
            if (tail[i] == 'a') {
              acounter++;
            }
            else if (tail[i] == 'b') {
              bcounter++;
            }
            else {
              alert("That string was not in the language. Please enter another.");
              return 1;
            }
          }
          if ((2 * acounter + 5 * bcounter) % 3 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 8 && strlen <= 20) && move == "user") {
        alert("Please enter a positive integer in range [8, 20] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "bkabnban") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (15 - 4)) + 4; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          var i;
          var head;
          var tail;
          var first = -1;
          for (i = 0; i < str.length; i++) {
            if (str[i] != 'b' && first == -1) {
              first = i;
            }
          }
          if (first < 4) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          var tempstr = str.substring(first);
          if (tempstr.length % 2 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          else {
            head = tempstr.substring(0, tempstr.length / 2);
            tail = tempstr.substring(tempstr.length / 2);
            for (i = 0; i < head.length; i++) {
              if ((i % 2 == 0 && (head[i] != 'a' || tail[i] != 'b')) || (i % 2 == 1 && (head[i] != 'b' || tail[i] != 'a'))) {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 4 && strlen <= 15) && move == "user") {
        alert("Please enter a positive integer in range [4, 15] for best results"); //error message
        return 1;
      }
    }
    if (lemma == "ab2n") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 4)) + 4; //generate random input for computer first
      }
      //determine wheter the input is valid or not for computer first
      if (move == "computer" && stepcounter == 3) {
        if (str.length < num) {
          alert("Rember |w| must be >= m");
          return 1;
        }
        else {
          if (str.length % 4 != 0) {
            alert("That string was not in the language. Please enter another.");
            return 1;
          }
          else {
            var i;
            for (i = 0; i < str.length; i++) {
              if ((i % 2 == 0 && str[i] != 'a') || (i % 2 == 1 && str[i] != 'b')) {
                alert("That string was not in the language. Please enter another.");
                return 1;
              }
            }
          }
        }
      }
      //determine wheter the input is valid or not for user first
      if (!(strlen >= 4 && strlen <= 10) && move == "user") {
        alert("Please enter a positive integer in range [4, 10] for best results"); //error message
        return 1;
      }
    }
    return 0;
  }
  //helper function to generate different string based on different languages
  function getString() {
    if (lemma == "anbn") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
    }
    if (lemma == "nanb") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "b";
      }
    }
    if (lemma == "wwr") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      str += "bb";
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
    }
    if (lemma == "abnak") {
      var i;
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "ab";
      }
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
    }
    if (lemma == "anbkcnk") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < parseInt(strlen) * 2; i++) {
        str += "c";
      }
    }
    if (lemma == "anblak") {
      var i;
      str += "aaaaaa";
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
    }
    if (lemma == "an") {
      var i;
      var len = parseInt(strlen);
      if (len % 2 == 0) {
        for (i = 0; i < len; i++) {
          str += "a";
        }
      }
      else {
        for (i = 0; i < len + 1; i++) {
          str += "a";
        }
      }
    }
    if (lemma == "anbk") {
      var i;
      var len = parseInt(strlen);
      if (len % 2 == 0) {
        for (i = 0; i < len - 2; i++) {
          str += "a";
        }
        str += "bb";
      }
      else {
        str += "a";
        for (i = 0; i < len; i++) {
          str += "b";
        }
      }
    }
    if (lemma == "bbabanan1") {
      var i;
      str += "bba"
      for (i = 0; i < strlen; i++) {
        str += "ba";
      }
      for (i = 0; i < parseInt(strlen) - 1; i++) {
        str += "a";
      }
    }
    if (lemma == "b5w") {
      var i;
      var len = parseInt(strlen);
      for (i = 0; i < (2 * len - 5); i++) {
        str += "b";
      }
      for (i = 0; i < (3 * len - 15); i++) {
        str += "a";
      }
    }
    if (lemma == "b5wmod") {
      var i;

      var len = parseInt(strlen);
      if (len % 3 == 0) {
        len += 2;
      }
      if (len % 3 == 1) {
        len += 1;
      }
      for (i = 0; i < 5; i++) {
        str += "b";
      }
      for (i = 0; i < len - 5; i++) {
        var r = Math.floor(Math.random() * 2);  //random number from 0 to 1
        if (r == 0) {
          str += "a";
        }
        else {
          str += "b";
        }
      }
    }
    if (lemma == "bkabnban") {
      var i;
      str += "bbbb";
      var len = parseInt(strlen);
      if (len % 2 == 1) {
        len -= 1;
      }
      for (i = 0; i < len / 2; i++) {
        str += "ab";
      }
      for (i = 0; i < len / 2; i++) {
        str += "ba";
      }
    }
    if (lemma == "ab2n") {
      var i;
      var len = parseInt(strlen);
      if (len % 2 == 1) {
        len += 1;
      }
      for (i = 0; i < len; i++) {
        str += "ab";
      }
    }

    return str;
  }

  // Action callbacks for form entities
  $("#about").click(about);
  $("#enter").click(Enter);
  $("#reset").click(Reset);
  $("#next").click(Next);
  $("#clear").click(Clear);
  $("#explain").click(Explain);
  $("#setxyz").click(Setxyz);
});