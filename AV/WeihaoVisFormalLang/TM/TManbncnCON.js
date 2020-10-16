// Written by Jeffrey Peng, Mostafa Mohammed, and Cliff Shaffer, Fall 2019
// TODO: The Traversor code needs to be moved to the TM library,
// and the TM editor needs to use the same Traversor code.
$(document).ready(function() {
  "use strict";

  var Traversor = function(TM, jsavs) {
    this.TM = TM;
    this.jsavs = jsavs;
  }

  Traversor.prototype.onClickTraverse = function(inputStrings) {
    var tape;
    for(var strCnt = 0; strCnt < inputStrings.length; strCnt++){
      var first = "true";
      var jsav = this.jsavs;
      var inputString = inputStrings[strCnt];
      var phraseChanged = "";
      var direction = "";
      var letChanged = "";
      var letScanned = "";
      var currState = "";
      var prevLet = "";
      var g = this.TM;

      //      $("#functionality").hide();                       //disable buttons
      //      $('#alphabets').hide();
      //      $("#mode").html('');
      //      $('.jsavcontrols').show();
      //      $('.jsavoutput').css({"text-align": "left"});
      var arr = new Array(15);    // arbitrary size
      for (var i = 0; i < 15; i++) {
        arr[i] = "#";
      }
      var indexx = 7 - Math.round(inputString.length/2);
      for(var x = 0; x < inputString.length; x++){
        arr[7-Math.round(inputString.length/2) + x] = inputString.charAt(x);
      }

      var nodess = g.nodes();
      var topos = 0;
      for(var y = 0; y<nodess.length; y++){
        if(topos<nodess[y].position().top){
          topos = nodess[y].position().top;
        }

      }

      jsav.umsg("We will see how the machine processes input string '" + inputString + "'.");
      if(tape){//tape is defined so we will reset the tape and add new string to it.
        tape.clearTapeContent();
        tape.setTapeArray(arr, 7-Math.round(inputString.length/2));
      }
      else //create the tape
        tape = jsav.ds.tape(arr, 150, topos + 140, "both", indexx);
      /*var p3 = jsav.g.line(165+30*(7-Math.round(inputString.length/2)), 180 + topos, 165 + 30*(7-Math.round(inputString.length/2)), 125 + topos, {"arrow-end": "classic-wide-long"});
      var rects = jsav.g.rect(150+30*(7-Math.round(inputString.length/2)), 180 + topos, 30, 30);*/
      nodess[0].highlight();
      var currentStates = [new Configuration(g.initial, inputString, jsav)],
          cur,
          counter = 0,
          configView = [];              // configurations to display in the message box
      // for (var j = 0; j < currentStates.length; j++) {
      //     configView.push(currentStates[j].toString());
      // }
      // this.jsav.umsg(configView.join(' | '));
      g.initial.highlight();
      //jsav.displayInit();

      while (true) {
        if (counter === 500) {
          console.log(counter);
          break;
        }
        counter++;
        for (var j = 0; j < currentStates.length; j++) {
          currentStates[j].state.unhighlight();
          g.removeAccept(currentStates[j].state);
          currentStates[j].state.unhighlight();
          g.removeAccept(currentStates[j].state);
        }
        // get next states
        //cur = g.traverse(currentStates);
        if(first == "true"){
          first = "false";
          nodess[0].highlight();
          jsav.step();
        }
        else{
          var nextStates = [];
          for (var j = 0; j < currentStates.length; j++) {
            var currentState = currentStates[j];
            var tapeValue = currentState.tape.currentValue();
            // var tapeValue = currentState.tape.value();
            var successors = currentState.state.neighbors();
            for (var next = successors.next(); next; next = successors.next()) {
              var edge = g.getEdge(currentState.state, next),
                  weight = edge.weight().split('<br>');
              for (var i = 0; i < weight.length; i++) {
                weight[i] = toColonForm(weight[i]);
                var w = weight[i].split(':');
                if (tapeValue === w[0]) {
                  var nextConfig = new Configuration(next, currentState.tape, jsav);
                  prevLet = w[0];
                  letChanged = w[1];
                  if(prevLet == letChanged){
                    phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                  }
                  else{
                    phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                    tape.setCurrentValue(letChanged);
                  }
                  if (w[1] !== square){
                    nextConfig.tape.value(w[1]);
                    arr[indexx] = w[1]
                  }
                  nextConfig.tape.move(w[2]);
                  if(w[2] == "R"){
                    indexx = indexx + 1;
                    /*p3.translateX(30);
                    rects.translateX(30);*/
                    direction = "right one cell, ";
                    tape.moveRight();
                  }
                  else if(w[2] == "L"){
                    indexx = indexx -1;
                    /*p3.translateX(-30);
                    rects.translateX(-30);*/
                    direction = "left one cell, ";
                    tape.moveLeft();
                  }
                  

                  nextStates.push(nextConfig);
                  break;
                }
                else if ((tapeValue === undefined) && w[0] === "#"){
                  var nextConfig = new Configuration(next, currentState.tape, jsav);
                  prevLet = w[0];
                    letChanged = w[1];
                    if(prevLet == letChanged){
                      phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                    }
                    else{
                      phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                      tape.setCurrentValue(letChanged);
                    }
                  if (w[1] !== "#"){
                    nextConfig.tape.value(w[1]);
                    arr[indexx] = w[1]
                    if(w[2] == "R"){
                      indexx = indexx + 1;
                      /*p3.translateX(30);
                      rects.translateX(30);*/
                      direction = "right one cell, ";
                      tape.moveRight();
                    }
                    else if(w[2] == "L"){
                      indexx = indexx -1;
                      /*p3.translateX(-30);
                      rects.translateX(-30);*/
                      direction = "left one cell, ";
                      tape.moveLeft();
                    }
                    
                  }
                  else{
                    prevLet = w[0];
                    letChanged = w[1];
                    if(prevLet == letChanged){
                      phraseChanged = "The current cell value remains the same and the tape head shifts " + direction + "scanning " + arr[indexx] +". ";
                    }
                    else{
                      phraseChanged = "The current cell value becomes " + letChanged + " and the tape head shifts " + direction + "scanning " + arr[indexx] + ". ";
                      tape.setCurrentValue(letChanged);
                    }
                    if(w[2] == "R"){
                      indexx = indexx + 1;
                      /*p3.translateX(30);
                      rects.translateX(30);*/
                      direction = "right one cell, ";
                      tape.moveRight();
                    }
                    else if(w[2] == "L"){
                      indexx = indexx -1;
                      /*p3.translateX(-30);
                      rects.translateX(-30);*/
                      direction = "left one cell, ";
                      tape.moveLeft();
                    }
                    
                  }
                  nextConfig.tape.move(w[2]);
                  nextStates.push(nextConfig);
                  break;
                }
              }
            }
          }
          nextStates = _.uniq(nextStates, function(x) {return x.toID();});
          cur = nextStates;
          if (!cur || cur.length === 0) {
            break;
          }
          currentStates = cur;
          configView = [];
          // add highlighting and display
          var previous = 0;
          for (var j = 0; j < currentStates.length; j++) {
            currentStates[j].state.highlight();
            currState = "The current state is " + currentStates[j].state.value();
            jsav.umsg("Step " + counter + ": " + phraseChanged + currState);
            //jsav.ds.tape([arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6], arr[7], arr[8],arr[9], arr[10], arr[11], arr[12], arr[13], arr[14]], 150, topos + 90, "both");
            if (g.isFinal(currentStates[j].state)) {
              g.showAccept(currentStates[j].state);
            }
            //configView.push(currentStates[j].toString());
          }
          jsav.step();
        }
      }
      for (var k = 0; k < currentStates.length; k++) {
        if (g.isFinal(currentStates[k].state)) {
          g.showAccept(currentStates[k].state);
          jsav.umsg("Final State is accepted");
          /*p3.hide();
          rects.hide();*/
        } else {
          jsav.umsg("Final State is rejected");
          g.showReject(currentStates[k].state);
          /*p3.hide();
          rects.hide();*/
        }

      }
      jsav.step();
      for (var j = 0; j < currentStates.length; j++) {
        currentStates[j].state.unhighlight();
        g.removeAccept(currentStates[j].state);
        g.removeReject(currentStates[j].state);
      }
    }
    jsav.step();
    jsav.recorded();
    //g.play(inputString);
  };

  var av_name = "TManbncnCON";
  var xStart = 50;
  var yStart = 250;
  var av = new JSAV(av_name);

  av.umsg("Here is the graph form for the machine and the intial state of the input tape and the head.");
  var url = "../../../AV/VisFormalLang/TM/Machines/TManbncn.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
  var tm = new av.ds.TM({width: 610, height: 375, left: 50, url: url});
  var trav = new Traversor(tm, av);
  av.displayInit();
  trav.onClickTraverse(["aabbcc", "c", "aaabbcc"]);
  av.recorded();
});
