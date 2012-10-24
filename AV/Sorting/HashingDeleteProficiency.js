(function($) {
  "use strict";
  var arr_size = 10,
      initData,
      inputData,
      jsavArr,
      jsavInputPos,
      jsav = new JSAV("HashingDeleteProficiency_avc"),
      exercise,
      task;

  jsav.recorded();

  var Setup = {
    probe: function(i) {
      return i;
    },
    hashfunction: function(val) {
      return val % arr_size;
    }
  }; // end setup

  function randomizeData() {
    var initValues = JSAV.utils.rand.numKey(6, 8),
        initArr = [],
        randVal, inspos, i, j, valVals,
        deleted = [], hashdata = [],
        input = [];
    initArr.length = arr_size;
    hashdata.length = arr_size;
    while (initValues > 0) {
      randVal = JSAV.utils.rand.numKey(0, arr_size - 1);
      valVals = JSAV.utils.rand.numKey(1, 3);
      inspos = randVal;
      i = 0;
      for (j = 0; j < valVals; j++) {
        while (initArr[inspos]) {
          i++;
          inspos = Setup.hashfunction(randVal + Setup.probe(i));
        }
        initArr[inspos] = JSAV.utils.rand.numKey(10, 99) * 10 + randVal;
        initValues--;
        console.log(hashdata[randVal] || []);
        if (hashdata[randVal]) { hashdata[randVal].push(initArr[inspos]); }
        else { hashdata[randVal] = [initArr[inspos]]; }
      }
    }
    console.log(hashdata);
    input.push(["delete", initArr[inspos]]);
    input.push(["insert", JSAV.utils.rand.numKey(10, 99) * 10]);
    input.push(["insert", JSAV.utils.rand.numKey(10, 99) * 10]);
    return {array: initArr, input: input };
  }

  function init() {
    if (jsavArr) {
      jsavArr.clear();
      task.element.remove();
      jsavInputPos.element.remove();
    } // remove existing array
    jsav.end();
    jsav.displayInit(); // remove old animation
    initData = randomizeData();
    inputData = initData.input;
    task = jsav.label((inputData[0][0] === "delete" ? "Delete key ":"Insert key ") + inputData[0][1]);
    jsavArr = jsav.ds.array(initData.array, {indexed: true});
    jsavInputPos = jsav.variable(0);
    jsavArr.click(clickHandler);
    return [jsavArr, jsavInputPos];
  }

  function fixState(modelStructures) {
    var inputPos = modelStructures[1],
        modelArr = modelStructures[0],
        size = modelArr.size();
    jsavInputPos.value(inputPos.value());
    for (var i = 0; i < size; i++) {
      var val = modelArr.value(i);
      if (val !== jsavArr.value(i)) { // fix values
        jsavArr.value(i, val);
      }
    }
    updateStepTask();
    exercise.gradeableStep();
  }

  function model(modeljsav) {
    console.log("model", modeljsav);
    var modelArr = modeljsav.ds.array(initData.array, {indexed: true}),
        inputPos = modeljsav.variable(0);
    modeljsav.displayInit();
    for (var i = 0, l = inputData.length; i < l; i++) {
      var inputElem = inputData[i],
          val = inputElem[1],
          probeIndex = 0,
          pos = Setup.hashfunction(val + Setup.probe(probeIndex));
      modelArr.highlight(pos);
      modeljsav.umsg((inputElem[0] === "delete" ? "Deleting key ":"Inserting key ") +
          val + ". We start by checking position " + pos);
      modeljsav.step();
      if (inputElem[0] === "delete") {
        while (modelArr.value(pos) != val && modelArr.value(pos) !== "") {
          probeIndex++;
          pos = Setup.hashfunction(val + Setup.probe(probeIndex));
          modeljsav.umsg("Since it is not the value we are looking for, continue to " + pos);
          modelArr.highlight(pos);
          modeljsav.step();
        }
        modeljsav.umsg("Found the key we are looking for. Delete and mark it with a tombstone.");
        modelArr.value(pos, "[del]");
      } else { // insert
        while (modelArr.value(pos) !== "[del]" && modelArr.value(pos) !== "") {
          probeIndex++;
          pos = Setup.hashfunction(val + Setup.probe(probeIndex));
          modeljsav.umsg("Since it is taken, continue to " + pos);
          modelArr.highlight(pos);
          modeljsav.step();
        }
        if (modelArr.value(pos) === "") {
          modeljsav.umsg("It is empty, so we insert the key");
        } else { // has value [del]
          modeljsav.umsg("It contains a tombstone, so we insert the key");
        }
        modelArr.value(pos, val);
      }
      inputPos.value(i + 1);
      modelArr.unhighlight();
      modeljsav.stepOption("grade", true);
      modeljsav.step();
    }
    return [modelArr, inputPos];
  }
  exercise = jsav.exercise(model, init, {}, {
    controls: $('.jsavexercisecontrols'),
    feedback: "continuous",
    fixmode: "fix",
    fix: fixState
  });
  exercise.reset();

  function updateStepTask() {
    var pos = jsavInputPos.value();
    if (pos < inputData.length) {
      task.text((inputData[pos][0] === "delete" ? "Delete key ":"Insert key ") + inputData[pos][1]);
    } else {
      task.text("DONE");
    }
  }

  function clickHandler(index) {
    var pos = jsavInputPos.value(),
        input = inputData[pos];
    if (input[0] === "delete") {
      jsavArr.value(index, "[del]");
    } else {
      jsavArr.value(index, input[1]);
    }
    jsavInputPos.value(pos + 1);
    updateStepTask();
    exercise.gradeableStep();
  }

  function about() {
    alert("Hashing Proficiency Exercise\nWritten by Ville Karavirta\nCreated as part of the OpenDSA hypertextbook project\nFor more information, see http://algoviz.org/OpenDSA\nSource and development history available at\nhttps://github.com/cashaffer/OpenDSA\nCompiled with JSAV library version " + JSAV.version());
  }

  $(function() {
    $("#about").click(about);
  });
})(jQuery);