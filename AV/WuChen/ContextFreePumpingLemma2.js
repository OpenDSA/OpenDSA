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
  var u, v, x, y, z;
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
      if (lemma == "anbncn") {
        document.getElementById("anbncn").style.visibility = "visible"; //add instructions
      }
      if (lemma == "ww") {
        document.getElementById("ww").style.visibility = "visible"; //add instructions
      }
      if (lemma == "anbjanbj") {
        document.getElementById("anbjanbj").style.visibility = "visible"; //add instructions
      }
      if (lemma == "nanbnc1") {
        document.getElementById("nanbnc1").style.visibility = "visible"; //add instructions
      }
      if (lemma == "nanbnc2") {
        document.getElementById("nanbnc2").style.visibility = "visible"; //add instructions
      }
      if (lemma == "aibjck") {
        document.getElementById("aibjck").style.visibility = "visible"; //add instructions
      }
      if (lemma == "anbn") {
        document.getElementById("anbn").style.visibility = "visible"; //add instructions
      }
      if (lemma == "akbncndj") {
        document.getElementById("akbncndj").style.visibility = "visible"; //add instructions
      }
      if (lemma == "ww1wr1") {
        document.getElementById("ww1wr1").style.visibility = "visible"; //add instructions
      }
      if (lemma == "ww1wr2") {
        document.getElementById("ww1wr2").style.visibility = "visible"; //add instructions
      }
      if (lemma == "w1bnw2") {
        document.getElementById("w1bnw2").style.visibility = "visible"; //add instructions
      }
      if (lemma == "w1cw2cw3cw4") {
        document.getElementById("w1cw2cw3cw4").style.visibility = "visible"; //add instructions
      }
      if (lemma == "w1vvrw2") {
        document.getElementById("w1vvrw2").style.visibility = "visible"; //add instructions
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
        step1.appendChild(document.createTextNode("1. I have selected a value for a constant m, displayed below. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
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
      //step 2
      if (stepcounter == 2) {
        document.getElementById("hint").style.display = "none"; //remove hint
        strlen = document.getElementById("input1").value;
        document.getElementById("input1").disabled = true;
        str = getString();
        var step2 = document.createElement("p");
        step2.id = "step2";
        step2.appendChild(document.createTextNode("2. I have selected w such that |w| >= m. It is displayed below. Please press \"Next Step\" to continue."));
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
        step3.appendChild(document.createTextNode("3. Select decomposition of w into uvxyz. Remember the following rules:"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|vxy|≤ m"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|vy|≥ 1"));
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("u*(v^i)*x*(y^i)*z ∈ L, for all i ≥ 0"));
        step3.appendChild(document.createElement("br"));


        //u
        step3.appendChild(document.createTextNode("|u|: "));
        var valueOfu = document.createElement("INPUT"); //the text to display the value of range slider of u
        valueOfu.setAttribute("type", "text");
        valueOfu.id = "valueOfu";
        valueOfu.value = "";
        valueOfu.max = len.toString();
        valueOfu.name = str;
        valueOfu.setAttribute('oninput', 'updateTextInputu(valueOfu.value, valueOfu.name)');  //value of range slider will change
        step3.appendChild(valueOfu);
        step3.appendChild(document.createTextNode("u: "));
        u = document.createElement("INPUT"); //the text to display u
        u.setAttribute("type", "text");
        u.id = "u";
        step3.appendChild(u);
        step3.appendChild(document.createElement("br"));
        //step3.appendChild(rangeOfu);

        //v
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|v|: "));
        var valueOfv = document.createElement("INPUT"); //the text to display the value of range slider of v
        valueOfv.setAttribute("type", "text");
        valueOfv.id = "valueOfv";
        valueOfv.value = "";
        valueOfv.max = len.toString();
        valueOfv.name = str;
        valueOfv.setAttribute('oninput', 'updateTextInputv(valueOfv.value, valueOfv.name)');  //value of range slider will change
        step3.appendChild(valueOfv);
        step3.appendChild(document.createTextNode("v: "));
        v = document.createElement("INPUT"); //the text to display v
        v.setAttribute("type", "text");
        v.id = "v";
        // step3.appendChild(rangeOfv);
        step3.appendChild(v);
        step3.appendChild(document.createElement("br"));
       

        //x
        step3.appendChild(document.createElement("br"));step3.appendChild(document.createTextNode("|x|: "));
        var valueOfx = document.createElement("INPUT"); //the text to display the value of range slider of x
        valueOfx.setAttribute("type", "text");
        valueOfx.id = "valueOfx";
        valueOfx.value = "";
        valueOfx.max = len.toString();
        valueOfx.name = str;
        valueOfx.setAttribute('oninput', 'updateTextInputx(valueOfx.value, valueOfx.name)');  //value of range slider will change
        step3.appendChild(valueOfx);
        step3.appendChild(document.createTextNode("x: "));
        x = document.createElement("INPUT"); //the text to display x
        x.setAttribute("type", "text");
        x.id = "x";
        step3.appendChild(x);
        step3.appendChild(document.createElement("br"));
        // step3.appendChild(rangeOfx);


        //y
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("|y|: "));
        var valueOfy = document.createElement("INPUT"); //the text to display the value of range slider of y
        valueOfy.setAttribute("type", "text");
        valueOfy.id = "valueOfy";
        valueOfy.value = "";
        valueOfy.max = len.toString();
        valueOfy.name = str;
        valueOfy.setAttribute('oninput', 'updateTextInputy(valueOfy.value, valueOfy.name)');  //value of range slider will change
        // step3.appendChild(rangeOfy);
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
        valueOfz.max = len.toString();
        valueOfz.name = str;
        valueOfz.setAttribute('oninput', 'updateTextInputz(valueOfz.value, valueOfz.name)');  //value of range slider will change
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
        Setuvxyz()
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
        step3.appendChild(document.createTextNode("3. I have decomposed w into the following... Please click \"Next Step\" to continue."));
        step3.appendChild(document.createElement("br"));
        document.getElementById("input2").disabled = true;
        var step3u = document.createElement("INPUT"); //the text to display u
        step3u.setAttribute("type", "text");
        step3u.id = "step3u";
        step3u.disabled = true;
        var step3v = document.createElement("INPUT"); //the text to display v
        step3v.setAttribute("type", "text");
        step3v.id = "step3v";
        step3v.disabled = true;
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
        if (lemma == "anbn") {
          u = str.substring(0, str.length / 2 - 1);
          v = "a";
          x = "λ";
          y = "b";
          z = str.substring(str.length / 2 + 1);
          if (u == "") {
            u = "λ";
          }
          if (z == "") {
            z = "λ";
          }
          step3u.value = u;
          step3v.value = "a";
          step3x.value = "λ";
          step3y.value = "b";
          step3z.value = z;
        }
        else if (lemma == "akbncndj") {
          var acounter = 0;
          var bcounter = 0;
          var ccounter = 0;
          var dcounter = 0;
          var i;
          for (i = 0; i < str.length; i++) {
            if (str[i] == 'a') {
              acounter++;
            }
            if (str[i] == 'b') {
              bcounter++;
            }
            if (str[i] == 'd') {
              dcounter++;
            }
          }
          if ((acounter != 0 && bcounter == 0 && dcounter == 0) || (acounter == 0 && bcounter == 0 && dcounter != 0)) {
            var vxy = Math.floor(Math.random() * (num - 1)) + 1;
            var vy = Math.floor(Math.random() * (vxy - 1)) + 1;
            var tempx = vxy - vy;
            var tempv = Math.floor(Math.random() * (vy - 1)) + 1;
            var tempy = vy - tempv;
            var uz = str.length - vxy;
            var tempu = Math.floor(Math.random() * (uz - 1)) + 1;
            var tempz = uz - tempu;
            u = str.substring(0, tempu);
            v = str.substring(tempu, tempu + tempv);
            x = str.substring(tempu + tempv, tempu + tempv + tempx);
            y = str.substring(tempu + tempv + tempx, tempu + tempv + tempx + tempy);
            z = str.substring(tempu + tempv + tempx + tempy, tempu + tempv + tempx + tempy + tempz);
            step3u.value = u;
            step3v.value = v;
            step3x.value = x;
            step3y.value = y;
            step3z.value = z;
            if (step3u.value == "") {
              step3u.value = "λ";
            }
            if (step3v.value == "") {
              step3v.value = "λ";
            }
            if (step3x.value == "") {
              step3x.value = "λ";
            }
            if (step3y.value == "") {
              step3y.value = "λ";
            }
            if (step3z.value == "") {
              step3z.value = "λ";
            }
          }
          else {
            u = str.substring(0, acounter + bcounter - 1);
            v = str.substring(acounter + bcounter - 1, acounter + bcounter);
            x = "λ";
            y = str.substring(acounter + bcounter, acounter + bcounter + 1);
            z = str.substring(acounter + bcounter + 1);
            if (u == "") {
              u = "λ";
            }
            if (z == "") {
              z = "λ";
            }
            step3u.value = u;
            step3v.value = v;
            step3x.value = "λ";
            step3y.value = y;
            step3z.value = z;
          }
        }
        else if (lemma == "ww1wr1") {
          u = str.substring(0, str.length / 2);
          v = str.substring(str.length / 2, str.length / 2 + 1);
          x = "λ";
          y = "λ";
          z = str.substring(str.length / 2 + 1);
          if (u == "") {
            u = "λ";
          }
          if (z == "") {
            z = "λ";
          }
          step3u.value = u;
          step3v.value = v;
          step3x.value = "λ";
          step3y.value = "λ";
          step3z.value = z;
        }
        else if (lemma == "w1vvrw2") {
          u = str.substring(0, str.length / 2 - 1);
          v = str.substring(str.length / 2 - 1, str.length / 2);
          x = "λ";
          y = str.substring(str.length / 2, str.length / 2 + 1);
          z = str.substring(str.length / 2 + 1);
          if (u == "") {
            u = "λ";
          }
          if (z == "") {
            z = "λ";
          }
          step3u.value = u;
          step3v.value = v;
          step3x.value = "λ";
          step3y.value = y;
          step3z.value = z;
        }
        else {
          var vxy = Math.floor(Math.random() * (num - 1)) + 1;
          var vy = Math.floor(Math.random() * (vxy - 1)) + 1;
          var tempx = vxy - vy;
          var tempv = Math.floor(Math.random() * (vy - 1)) + 1;
          var tempy = vy - tempv;
          var uz = str.length - vxy;
          var tempu = Math.floor(Math.random() * (uz - 1)) + 1;
          var tempz = uz - tempu;
          u = str.substring(0, tempu);
          v = str.substring(tempu, tempu + tempv);
          x = str.substring(tempu + tempv, tempu + tempv + tempx);
          y = str.substring(tempu + tempv + tempx, tempu + tempv + tempx + tempy);
          z = str.substring(tempu + tempv + tempx + tempy, tempu + tempv + tempx + tempy + tempz);
          step3u.value = u;
          step3v.value = v;
          step3x.value = x;
          step3y.value = y;
          step3z.value = z;
          if (step3u.value == "") {
            step3u.value = "λ";
          }
          if (step3v.value == "") {
            step3v.value = "λ";
          }
          if (step3x.value == "") {
            step3x.value = "λ";
          }
          if (step3y.value == "") {
            step3y.value = "λ";
          }
          if (step3z.value == "") {
            step3z.value = "λ";
          }
        }
        step3.appendChild(document.createTextNode("U = "));
        step3.appendChild(step3u);
        step3.appendChild(document.createElement("br"));
        step3.appendChild(document.createTextNode("V = "));
        step3.appendChild(step3v);
        step3.appendChild(document.createElement("br"));
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
        else{
          document.getElementById("i").disabled = true;
          var step4 = document.getElementById("step4");
          step4.appendChild(document.createTextNode("pumped string: "));
          var pumpstr = "";
          var temp;
          temp = "uv^" + i.toString() + "xy^" + i.toString() + "z = u";
          if (u != "λ") {
            pumpstr = pumpstr + u;
          }
          var j;
          for (j = 0; j < i; j++) {
            if (v != "λ") {
              pumpstr = pumpstr + v;
            }
            temp = temp + "v";
          }
          if (x != "λ") {
            pumpstr = pumpstr + x;
            temp = temp + "x";
          }
          for (j = 0; j < i; j++) {
            if (y != "λ") {
              pumpstr = pumpstr + y;
            }
            temp = temp + "y";
          }
          if (z != "λ") {
            pumpstr = pumpstr + z;
          }

          if (lemma == "anbn" || lemma == "akbncndj" || lemma == "ww1wr1" || lemma == "w1vvrw2") {
            temp = temp + "z = " + pumpstr + " is in the language. Please try again!";
          }
          else {
            temp = temp + "z = " + pumpstr + " is NOT in the language. YOU WIN!";
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
      document.getElementById("setuvxyz").style.display = "none"; //remove uvxyz button
      stepcounter = 1;   //returns to step 1
      str = "";  //clean str
      //reset step 1
      var step1 = document.createElement("p");
      step1.id = "step1";
      step1.appendChild(document.createTextNode("1. Please select a value for m. (m is a positive constant such that any w \u2208 L with |w| \u2265 m)"));
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
    if (lemma == "anbncn") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is a^m b^m c^m".' +
        ' With this example, it is impossible to have \"a\"s, \"b\"s, and \"c\"s in both v and y together. Thus if i ≠ 1,' +
        ' an inequality will be generated, meaning this is not a context-free language.\n'
    }
    if (lemma == "ww" || "anbjanbj") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is a^m b^m a^m b^m".' +
        ' To be in the language with this example, v & y together cannot possess indentical letters that are from seperate' +
        ' blocks of alike letters (ex: v has \"b\"s from the first set of \"b\"s, while y has \"b\"s from the second set of' +
        ' \"b\"s. Because of this, any increae or decrease in \"a\"s or \"b\"s will not be mathced by any corresponding change' +
        ' in the other blocks of similar letters, resulting in an inequality that prevents the decompostition from working. Thus' +
        ', this language is not context-free.';
    }
    if (lemma == "nanbnc1") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is \"a^m b^(m+1) c^(m+2)\".' +
        ' With this example, it is impossible to have \"a\"s, \"b\"s, and \"c\"s in both v and y together. Thus, if i = 0, i = 2,' +
        ' or perhaps both, one of the inequalities will be violated, meaning there is no adequate decomposition. Thus, this language is not context-free.';
    }
    if (lemma == "nanbnc2") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is \"a^(m+1) b^m c^m\".' +
        ' With this example, it is impossible to have \"a\"s, \"b\"s, and \"c\"s in both v and y together. Thus, if i = 0, i = 2,' +
        ' or perhaps both, one of the inequalities will be violated, meaning there is no valid decomposition. Thus, this language is not context-free.';
    }
    if (lemma == "aibjck") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is \"a^(m+1) b^m c^m\". The v and y values together thus would have a maximum of two unique letters.' +
        ' Any possible v or y values would then be problematic if i = 0, i = 2, or perhaps both. Thus, this language is not context-free.';
    }
    if (lemma == "anbn") {
      a = 'A valid partition of w exists! Because this is a context-free language, a valid decomposition exists. If m ≥ 2, one could choose v to be' +
        ' \"a\" and y to be \"b\", which will work for all values of i.';
    }
    if (lemma == "akbncndj") {
      a = 'A valid partition of w exists! Because this is a context-free language, a valid decomposition exists. For all m ≥ 2, if n ≥ 1, v could ' +
        'equal \"b\" and y could equal \"c\". If n = 0 and k & j ≥ 1, v could equal \"a\" and y could equal \"d\". If n = 0 and only one of k or j ≥ 1,' +
        ' v could equal \"a\" or \"d\" (whichever one is in the string). and y could be empty. This covers all possible combinations.';
    }
    if (lemma == "ww1wr1") {
      a = 'A valid partition of w exists! Because this is a context-free language, a valid decomposition exists. For any m value ≥ 6, it is possible ' +
        'to assign to both \'w\' and \'wR\' the empty string. Thus, |\'w1\'| ≥ 6. If |v| = 0 and y is one character from \'w1\', |\'w1\'| ≥ 5 for all values of i.';
    }
    if (lemma == "ww1wr2") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "a^m b^m a^m". To be in the language with this example, v & y' +
        ' together cannot possess substrings that are from both \'w\' and \'wR\'. Thus, pumping a substring from either \'w\', \'w1\', or \'wR\' will violate ' +
        'the |\'w\'| = |\'wR\'| equality or cause |\'w\'| ≠|\'w1\'|. Thus, this language is not context-free.';
    }
    if (lemma == "w1bnw2") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "a^m b^(m+1) a^(m+1)". To be in the language with this example,' +
        ' v & y together cannot possess substrings that are from \'w\'1, from bn, and from \'w2\'. Thus, if i = 0, i = 2, or perhaps both, either v or y will violate ' +
        'one of the conditions, meaning there is no valid decomposition. Thus, this language is not context-free.';
    }
    if (lemma == "w1cw2cw3cw4") {
      a = 'Unfortunately no valid partition of w exists. For any m value, a possible value for w is "ambmcambmcacb". If either v or y together span two \'wn\'s or span ' +
        'less but possess a \"c\", then pumping that value could result in more or less than three \"c\"s, which is not permissible. If either v or y span \'w3\' or \'w4\', ' +
        'then if i = 0, |\'w3\'| = 0 or |\'w4\'| = 0. If either v or y span \'w1\' or \'w2\', then for any i ≠ 1, \'w1\' ≠ \w2\'. Thus, this language is not context-free.';
    }
    if (lemma == "w1vvrw2") {
      a = 'A valid partition of w exists! Because this is a context-free language, a valid decomposition exists. If |\'v\'| > 3, or if m ≥ 8 and there are no "b"s in w1 and ' +
        'w2, one could just pump single opposite characters in \'v\' and \'vR\' repeatedly to find a valid decomposition. For example, if |\'v\'| = 4, then v could equal the ' +
        'fourth character of \'v\' and y the first character of \'vR\'. Otherwise, if m ≥ 8 and |v| = 3, one could just pump the first "b" value in w1 or w2.';
    }
    alert(a);
  }

  //Set uvxyz buttion in step 3 and step 4
  function Setuvxyz() {
    if (stepcounter == 3) {
      u = document.getElementById("u").value;
      v = document.getElementById("v").value;
      x = document.getElementById("x").value;
      y = document.getElementById("y").value;
      z = document.getElementById("z").value;
      // var xval = x.length;
      // var yval = y.length;
      // var zval = z.length;
      // var valx = document.getElementById("valueOfx").value;
      // var valy = document.getElementById("valueOfy").value;
      // var valz = document.getElementById("valueOfz").value;
      //Step 4
      attemps++;
      document.getElementById("hint3").style.display = "none";
      document.getElementById("u").disabled = true;
      document.getElementById("v").disabled = true;
      document.getElementById("x").disabled = true;
      document.getElementById("y").disabled = true;
      document.getElementById("z").disabled = true;
      document.getElementById("valueOfu").disabled = true;
      document.getElementById("valueOfv").disabled = true;
      document.getElementById("valueOfx").disabled = true;
      document.getElementById("valueOfy").disabled = true;
      document.getElementById("valueOfz").disabled = true;

      var step4 = document.createElement("p");
      step4.id = "step4";
      step4.appendChild(document.createTextNode("4. I have selected i to give a contradiction.(i is a positive integer such that xy^iz \u2208 L for all i \u2265 0) It is displayed below."));
      step4.appendChild(document.createElement("br"));
      var ran = Math.floor(Math.random() * 3); // random number from 0 to 2
      if (ran == 1) {
        ran = 0;
      }
      var pumpstr = "";  //pumped string
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
      var tempv, tempy;
      var vorder, yorder;
      if (ran == 2) {
        tempv = "vv";
        tempy = "yy";
        vorder = "\xB2";
        yorder = "\xB2";
      }
      else {
        tempv = "";
        tempy = "";
        vorder = "\xB0";
        yorder = "\xB0";
      }
      if (lemma == "anbn") {
        var bool = 1;
        if (pumpstr.length % 2 != 0) {
          bool = 0;
        }
        else {
          var head = pumpstr.substring(0, pumpstr.length / 2);
          var tail = pumpstr.substring(pumpstr.length / 2);
          var i;
          for (i = 0; i < head.length; i++) {
            if (head[i] != 'a' || tail[i] != 'b') {
              bool = 0;
              break;
            }
          }
        }
        if (bool == 1) {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
        }
        else {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
        }

      }
      else if (lemma == "akbncndj") {
        var i;
        var numa = 0;
        var numb = 0;
        var numc = 0;
        var numd = 0;
        var bool = 1;
        for (i = 0; i < pumpstr.length; i++) {
          if (pumpstr[i] == 'a') {
            numa++;
          }
          if (pumpstr[i] == 'b') {
            numb++;
          }
          if (pumpstr[i] == 'c') {
            numc++;
          }
          if (pumpstr[i] == 'd') {
            numd++;
          }
        }
        for (i = 0; i < pumpstr.length; i++) {
          if (i < numa && pumpstr[i] != 'a') {
            bool = 0;
            break;
          }
          if (i >= numa && i < (numa + numb) && pumpstr[i] != 'b') {
            bool = 0;
            break;
          }
          if (i >= (numa + numb) && i < (numa + numb + numc) && pumpstr[i] != 'c') {
            bool = 0;
            break;
          }
          if (i >= (numa + numb + numc) && i < (numa + numb + numc + numd) && pumpstr[i] != 'd') {
            bool = 0;
            break;
          }
        }
        if (numb == numc && numa != numd && bool == 1) {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
        }
        else {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
        }
      }
      else if (lemma == "ww1wr1") {
        var i;
        var bool = 1;
        for (i = 0; i < pumpstr.length; i++) {
          if (pumpstr[i] != 'a' || pumpstr[i] != 'b') {
            bool = 0;
          }
        }
        if (bool = 1 && pumpstr.length >= 5) {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
        }
        else {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
        }
      }
      else if (lemma == "w1vvrw2") {
        var i;
        var bool = 1;
        var head;
        var tail;
        var vlength = 0;
        if (pumpstr.length % 2 != 0) {
          bool = 0;
        }
        else {
          head = pumpstr.substring(0, pumpstr.length / 2);
          tail = pumpstr.substring(pumpstr.length / 2);
          for (i = 0; i < pumpstr.length / 2; i++) {
            if (head[head.length - 1 - i] == tail[i]) {
              vlength++;
            }
            else {
              break;
            }
          }
          if (vlength <= 3) {
            bool = 0;
          }
        }
        if (bool == 1) {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is in the language. YOU WIN!"));
        }
        else {
          step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
        }
      }
      else {
        step4.appendChild(document.createTextNode("w = " + "uv" + vorder + "xy" + yorder + "z = " + "u" + tempv + "x" + tempy + "z = " + pumpstr + " is NOT in the language. Please try again."));
      }
      container.appendChild(step4);
      //alert(outstring);
      stepcounter++;
    }
  }
  //helper function to generate a random number for computer first
  function generateRandom() {
    if (lemma == "anbncn") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (11 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "ww") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (6 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "anbjanbj") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (5 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "nanbnc1") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (6 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "nanbnc2") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (7 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "aibjck") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (7 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "anbn") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (11 - 4)) + 4; //generate random input for computer first
      }
    }
    if (lemma == "akbncndj") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (5 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "ww1wr1") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (7 - 1)) + 1; //generate random input for computer first
      }
    }
    if (lemma == "ww1wr2") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 3)) + 3; //generate random input for computer first
      }
    }
    if (lemma == "w1bnw2") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (10 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "w1cw2cw3cw4") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (7 - 2)) + 2; //generate random input for computer first
      }
    }
    if (lemma == "w1vvrw2") {
      if (move == "computer" && stepcounter == 1) {
        num = Math.floor(Math.random() * (15 - 2)) + 2; //generate random input for computer first
      }
    }
    return 0;
  }
  //helper function to generate different string based on different languages
  function getString() {
    if (lemma == "anbncn") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < strlen; i++) {
        str += "c";
      }
    }
    if (lemma == "ww" || lemma == "anbjanbj") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      str = str + str;
    }
    if (lemma == "nanbnc1") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "b";
      }
      for (i = 0; i < parseInt(strlen) + 2; i++) {
        str += "c";
      }
    }
    if (lemma == "nanbnc2" || lemma == "aibjck") {
      var i;
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < strlen; i++) {
        str += "c";
      }
    }
    if (lemma == "anbn") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
    }
    if (lemma == "akbncndj") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < strlen; i++) {
        str += "c";
      }
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "d";
      }
    }
    if (lemma == "ww1wr1") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      str += "babab";
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
    }
    if (lemma == "ww1wr2") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
    }
    if (lemma == "w1bnw2") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "b";
      }
      for (i = 0; i < parseInt(strlen) + 1; i++) {
        str += "a";
      }
    }
    if (lemma == "w1cw2cw3cw4") {
      var i;
      for (i = 0; i < strlen; i++) {
        str += "a";
      }
      for (i = 0; i < strlen; i++) {
        str += "b";
      }
      str = str + "c" + str + "cacb";
    }
    if (lemma == "w1vvrw2") {
      var i;
      str += "a";
      var len;
      if (parseInt(strlen) % 2 == 0) {
        len = parseInt(strlen) / 2;
      }
      else {
        len = (parseInt(strlen) - 1) / 2;
      }
      for (i = 0; i < len; i++) {
        str += "ba";
      }
      str += "bbbba";
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
  $("#setuvxyz").click(Setuvxyz);
});