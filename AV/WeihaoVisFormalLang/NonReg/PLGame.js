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
  var stepcounter = 0; //The counter of step
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
        document.getElementById("next").disabled = true;
        paraObjective = document.getElementById("paraObjective");
        paraObjective.appendChild(document.createElement("br"));
        paraObjective.appendChild(document.createTextNode("Objective: Find a valid partition that can be pumped."));
        var step1 = document.createElement("p");
        step1.id = "step1";
        step1.appendChild(document.createTextNode("1. Please select a value for m. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
        var input1 = document.createElement("input"); //input for the first step in user first
        input1.type = "number";
        input1.id = "input1";
        input1.setAttribute('oninput', 'updateTextInput1()');
        step1.appendChild(document.createElement("br"));
        step1.appendChild(input1);
        var hint = document.createElement("p");
        hint.id = "hint";
        container.appendChild(step1);
        container.appendChild(hint);
        stepcounter++;
      }
      //step 1 and step 2 for computer first
      if (move == "computer") {
        //Appends objective to container
        paraObjective = document.getElementById("paraObjective");
        paraObjective.appendChild(document.createElement("br"));
        paraObjective.appendChild(document.createTextNode("Objective: Prevent the computer from finding a valid partition."));
        //step 1
        document.getElementById("next").disabled = true;
        var step1 = document.createElement("p");
        step1.id = "step1";
        step1.appendChild(document.createTextNode("1. Opponent have selected a value for a constant m, displayed below. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
        step1.appendChild(document.createElement("br"));
        stepcounter = 1;
        generateRandom(); //generate random number
        var step1m = document.createElement("INPUT"); //the text to display m
        step1m.setAttribute("type", "text");
        step1m.id = "step1m";
        step1m.value = num.toString();
        step1m.disabled = true;
        step1.appendChild(step1m);
        container.appendChild(step1);
        //step 2
        var step2 = document.createElement("p");
        step2.id = "step2";
        step2.appendChild(document.createTextNode("2. Please enter a possible value for a string w \u2208 L."));
        var input2 = document.createElement("input"); //input for the second step in computer first
        input2.type = "text";
        input2.id = "input2";
        input2.name = num;
        input2.setAttribute('oninput', 'updateTextInput2(input2.name)');
        step2.appendChild(document.createElement("br"));
        step2.appendChild(input2);
        var hint2 = document.createElement("p");
        hint2.id = "hint2";
        container.appendChild(step2);
        container.appendChild(hint2);
        stepcounter = 2;
      }
    }
  }
  // Main action: Result of clicking "Next Step" button
  function Next() {
    stepcounter++;
    //user first
    if (move == "user") {
      //step 2 and step 3
      if (stepcounter == 2) {
        //step 2
        document.getElementById("hint").style.display = "none"; //remove hint
        strlen = document.getElementById("input1").value;
        document.getElementById("input1").disabled = true;
        str = getString();
        var step2 = document.createElement("p");
        step2.id = "step2";
        step2.appendChild(document.createTextNode("2. Opponent has selected w such that |w| >= m. It is displayed below. Please press \"Next Step\" to continue."));
        var br = document.createElement("br");
        step2.appendChild(br);
        var outstep2 = document.createElement("INPUT"); //the text to display w
        outstep2.setAttribute("type", "text");
        outstep2.id = "outstep2";
        outstep2.value = str;
        outstep2.disabled = true;
        step2.appendChild(document.createTextNode("w: "));
        step2.appendChild(outstep2);
        container.appendChild(step2);
        stepcounter++;
      
      //step 3
      
        var len = str.length;  //the length of the string
        var step3 = document.createElement("p"); //create the paragraph for step 3
        step3.id = "step3";
        step3.appendChild(document.createTextNode("3. Select decomposition of w into xyz."));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("Please keep in mind the following rules:"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|xy| ≤ m"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|y| ≥ 1"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("x*(y^i)*z ∈ L  for all i ≥ 0"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("Please decompose the w by the length of x, y, and z"));
        step3.appendChild(document.createElement("br"));

        //x
        step3.appendChild(document.createTextNode("|x|: "));
        var valueOfx = document.createElement("INPUT"); //the text to display the value of range slider of x
        valueOfx.setAttribute("type", "text");
        valueOfx.id = "valueOfx";
        valueOfx.value = "";
        valueOfx.max = len.toString(); //max value of range slider equals to the length of the string
        valueOfx.name = str;
        valueOfx.setAttribute('oninput', 'updateTextInputx(valueOfx.value, valueOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfx);
        step3.appendChild(document.createTextNode("x: "));
        x = document.createElement("INPUT"); //the text to display x
        x.setAttribute("type", "text");
        x.id = "x";
        step3.appendChild(x);
        step3.appendChild(document.createElement("br"));
        // y
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|y|: "));
        var valueOfy = document.createElement("INPUT"); //the text to display the value of range slider of y
        valueOfy.setAttribute("type", "text");
        valueOfy.id = "valueOfy";
        valueOfy.value = "";
        valueOfy.max = len.toString(); //max value of range slider equals to the length of the string
        valueOfy.name = str;
        valueOfy.setAttribute('oninput', 'updateTextInputy(valueOfy.value, valueOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfy);
        step3.appendChild(document.createTextNode("y: "));
        y = document.createElement("INPUT"); //the text to display y
        y.setAttribute("type", "text");
        y.id = "y";
        step3.appendChild(y);
        step3.appendChild(document.createElement("br"));
        //z
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|z|: "));
        var valueOfz = document.createElement("INPUT"); //the text to display the value of range slider of z
        valueOfz.setAttribute("type", "text");
        valueOfz.id = "valueOfz";
        valueOfz.value = "";
        valueOfz.max = len.toString(); //max value of range slider equals to the length of the string
        valueOfz.name = str;
        valueOfz.setAttribute('oninput', 'updateTextInputz(valueOfz.value, valueOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfz);
        step3.appendChild(document.createTextNode("z: "));
        z = document.createElement("INPUT"); //the text to z
        z.setAttribute("type", "text");
        z.id = "z";
        step3.appendChild(z);
        step3.appendChild(document.createElement("br"));
        //step3.appendChild(rangeOfz);
        var hint3 = document.createElement("p"); //create the paragraph for hints in step 3
        hint3.id = "hint3";
        container.appendChild(step3);
        container.appendChild(hint3);
        document.getElementById("next").disabled = false;
      }
      //step 4
      if (stepcounter == 4) {
        stepcounter--;
        document.getElementById("next").disabled = true;
        Setxyz()
        stepcounter++;
      }
    }
    //computer first
    if (move == "computer") {
      //step 3 
      if (stepcounter == 3) {
        document.getElementById("hint2").style.display = "none"; //remove hint2
        str = str + document.getElementById("input2").value;
        var step3 = document.createElement("p"); //create the paragraph for step 3
        step3.id = "step3";
        step3.appendChild(document.createTextNode("3. Opponent have decomposed w into the following form based on rules:"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|xy|≤m"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|y|≥1"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("xy^iz∈L  for all i≥0"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("Please click \"Next Step\" to continue."));
        step3.appendChild(document.createElement("br"));
        document.getElementById("input2").disabled = true;
        var step3x = document.createElement("INPUT"); //the text to display x
        step3x.setAttribute("type", "text");
        step3x.id = "step3x";
        step3x.disabled = true;
        var step3y = document.createElement("INPUT"); //the text to display y
        step3y.setAttribute("type", "text");
        step3y.id = "step3y";
        step3y.disabled = true;
        var step3z = document.createElement("INPUT"); //the text to display z
        step3z.setAttribute("type", "text");
        step3z.id = "step3z";
        step3z.disabled = true;
        if (lemma == "an") {
          x = "λ";
          y = "aa";
          z = str.substring(2);
          if (z == "") {
            z = "λ";
          }
          step3x.value = "λ";
          step3y.value = "aa";
          step3z.value = z;
        }
        else if (lemma == "anbk") {
          if (str[1] == 'a') {
            x = "λ";
            y = "aa";
            z = str.substring(2);
            if (z == "") {
              z = "λ";
            }
            step3x.value = "λ";
            step3y.value = "aa";
            step3z.value = z;
          }
          if (str[1] == 'b') {
            x = "a";
            y = "bb";
            z = str.substring(3);
            if (z == "") {
              z = "λ";
            }
            step3x.value = "a";
            step3y.value = "bb";
            step3z.value = z;
          }
        }
        else if (lemma == "b5wmod") {
          x = "bbbbb";
          y = str.substring(5, 8);
          z = str.substring(8);
          if (z == "") {
            z = "λ";
          }
          step3x.value = "bbbbb";
          step3y.value = y;
          step3z.value = z;
        }
        else if (lemma == "ab2n") {
          x = "λ";
          y = "abab";
          z = str.substring(4);
          if (z == "") {
            z = "λ";
          }
          step3x.value = "λ";
          step3y.value = "abab";
          step3z.value = z;
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
          step3x.value = x;
          step3y.value = y;
          step3z.value = z;
        }
        
        step3.appendChild(document.createTextNode("X = "));
        step3.appendChild(step3x);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("Y = "));
        step3.appendChild(step3y);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("Z = "));
        step3.appendChild(step3z);
        container.appendChild(step3);


      // Step 4
        stepcounter++;
        document.getElementById("next").disabled = true;
        var step4 = document.createElement("p"); //create the paragraph for step 4
        step4.id = "step4";
        step4.appendChild(document.createTextNode("4. Please enter a possible value for i. (i is a positive integer such that xy^iz \u2208 L for all i \u2265 0)"));
        step4.appendChild(document.createElement("br"));
        step4.appendChild(document.createTextNode("i: "));
        var i = document.createElement("INPUT");
        i.type = "number";
        i.id = "i";
        i.setAttribute('oninput', 'updateTextInputi()');
        var hint4 = document.createElement("p"); //hint 
        hint4.id = "hint4";
        step4.appendChild(i);
        container.appendChild(step4);
        container.appendChild(hint4);
      }
      //step 5
      if (stepcounter == 5) {
        attemps++;
        document.getElementById("hint4").style.display = "none"; //remove hint4
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
          step4.appendChild(document.createTextNode("pumped string: "));
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
            temp = temp + "z = " + pumpstr + " is in the language. You have failed to prove that this language is not regular. Please try again!";
            //alert("My attemps:\n" + attemps.toString() + ": X = " + x + "; Y = " + y + "; Z = " + z + "; I = " + i + "; WON");
          }
          else {
            temp = temp + "z = " + pumpstr + " is NOT in the language. You have proved that this language is not regular. YOU WIN!";
            //alert("My attemps:\n" + attemps.toString() + ": X = " + x + "; Y = " + y + "; Z = " + z + "; I = " + i + "; Failed");
          }
          var step4ps = document.createElement("INPUT"); //the text to display pumped string
          step4ps.setAttribute("type", "text");
          step4ps.id = "step4ps";
          step4ps.value = pumpstr;
          step4ps.disabled = true;
          step4.appendChild(step4ps);
          step4.appendChild(document.createElement("br"));
          step4.appendChild(document.createTextNode(temp));
          document.getElementById("next").disabled = true;
        }
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
        document.getElementById("hint").remove();
      }
      if (stepcounter >= 2) {
        document.getElementById("step2").remove();
      }
      if (stepcounter >= 3) {
        document.getElementById("step3").remove();
        document.getElementById("hint3").remove();
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
      step1.appendChild(document.createTextNode("1. Please enter a value for m. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
      step1.appendChild(document.createElement("br"));
      var input1 = document.createElement("input"); //input for the first step
      input1.type = "number";
      input1.id = "input1";
      input1.setAttribute('oninput', 'updateTextInput1()');
      step1.appendChild(input1);
      var hint = document.createElement("p");
      hint.id = "hint";
      container.appendChild(step1);
      container.appendChild(hint);
      document.getElementById("next").disabled = true;
    }
    else {
      //remove each step
      if (stepcounter >= 1) {
        document.getElementById("step1").remove();
      }
      if (stepcounter >= 2) {
        document.getElementById("step2").remove();
        document.getElementById("hint2").remove();
      }
      if (stepcounter >= 3) {
        document.getElementById("step3").remove();
      }
      if (stepcounter >= 4) {
        document.getElementById("step4").remove();
        document.getElementById("hint4").remove();
      }
      str = "";  //clean str
      // reset step 1 and step 2
      var step1 = document.createElement("p");
      step1.id = "step1";
      step1.appendChild(document.createTextNode("1. I have selected a value for a constant m, displayed below. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
      step1.appendChild(document.createElement("br"));
      stepcounter = 1;
      generateRandom();
      var step1m = document.createElement("INPUT"); //the text to display m
      step1m.setAttribute("type", "text");
      step1m.id = "step1m";
      step1m.value = num.toString();
      step1m.disabled = true;
      step1.appendChild(step1m);
      container.appendChild(step1);
      //step 2
      var step2 = document.createElement("p");
      step2.id = "step2";
      step2.appendChild(document.createTextNode("2. Please enter a possible value for a string w \u2208 L."));
      var input2 = document.createElement("input"); //input for the second step in computer first
      input2.type = "text";
      input2.id = "input2";
      input2.name = num;
      input2.setAttribute('oninput', 'updateTextInput2(input2.name)');
      var hint2 = document.createElement("p");
      hint2.id = "hint2";
      step2.appendChild(document.createElement("br"));
      step2.appendChild(input2);
      container.appendChild(step2);
      container.appendChild(hint2);
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
      //Step 4
      attemps++;
      document.getElementById("hint3").style.display = "none";
      document.getElementById("x").disabled = true;
      document.getElementById("y").disabled = true;
      document.getElementById("z").disabled = true;
      document.getElementById("valueOfx").disabled = true;
      document.getElementById("valueOfy").disabled = true;
      document.getElementById("valueOfz").disabled = true;

      console.log("Before s4")

      var step4 = document.createElement("p");
      step4.id = "step4";
      step4.appendChild(document.createTextNode("4. Opponent has selected i to give a contradiction.(i is a positive integer such that xy^iz \u2208 L for all i \u2265 0) It is displayed below."));
      step4.appendChild(document.createElement("br"));
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
      var step4i = document.createElement("INPUT"); //the text to display i
      step4i.setAttribute("type", "text");
      step4i.id = "step4i";
      step4i.value = ran.toString();
      step4i.disabled = true;
      var step4ps = document.createElement("INPUT"); //the text to display pumped string
      step4ps.setAttribute("type", "text");
      step4ps.id = "step4ps";
      step4ps.value = pumpstr;
      step4ps.disabled = true;
      step4.appendChild(document.createTextNode("i: "));
      step4.appendChild(step4i);
      step4.appendChild(document.createTextNode("pumped string: "));
      step4.appendChild(step4ps);
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
          step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is in the language. Opponent has failed to prove that this language is not regular.YOU WIN!"));
          outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; WON";
        }
        else {
          step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Opponent has proved that this language is not regular. Please try again."));
          outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
        }
      }
      else {
        step4.appendChild(document.createTextNode("w = " + "xy" + yorder + "z = " + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Opponent has proved that this language is not regular. Please try again."));
        outstring = "My attemps:\n" + attemps.toString() + ": X = " + localx + "; Y = " + y + "; Z = " + localz + "; I = " + ran + "; Failed";
      }
      container.appendChild(step4);
      //alert(outstring);
      stepcounter++;
    }
  }
  //helper function to generate a random number for computer first
  function generateRandom() {
    if (lemma == "anbn") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (18 - 4)) + 4; //generate random input for computer first
      }
    }
    if (lemma == "nanb") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (17 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "wwr") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "abnak") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (11 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "anbkcnk") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (9 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "anblak") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (15 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "an") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (18 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "anbk") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "bbabanan1") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 5)) + 5; //generate random input for computer first
      }
    }
    if (lemma == "b5w") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 6)) + 6; //generate random input for computer first
      }
    }
    if (lemma == "b5wmod") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (20 - 8)) + 8; //generate random input for computer first
      }
    }
    if (lemma == "bkabnban") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (15 - 4)) + 4; //generate random input for computer first
      }
    }
    if (lemma == "ab2n") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 4)) + 4; //generate random input for computer first
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