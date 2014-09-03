/* global ODSA, PARAMS */
(function ($) {
  "use strict";

  // AV variables
  var hashSize = PARAMS.size || 19,
      opSize = 20,
      probing = PARAMS.probing || "quadratic",
      hashArray,
      opStack,
      initialOps,
      $hashLabel,
      $stackLabel,
      pseudo,

      // get the configurations from the configuration file
      config = ODSA.UTILS.loadConfig({'av_container': 'jsavcontainer'}),
      interpret = config.interpreter,
      code = config.code,

      // Create a JSAV instance
      av = new JSAV($("#jsavcontainer"));

  av.recorded(); // we are not recording an AV with an algorithm

  var hashFunction = {
    linear: function (key, i, size) {
      return (key + i) % size;
    },
    quadratic: function (key, i, size) {
      return (key + i * i) % size;
    }
  };

  var hashFunctionString = {
    linear: function (key, i, size, hideAns) {
      return "<em>h(" + key + ", " + i + ") = (" + key + " + " + i + ") mod " + size +
        (hideAns ? "" : " = " + hashFunction.linear(key, i, size)) + "</em>";
    },
    quadratic: function (key, i, size, hideAns) {
      return "<em>h(" + key + ", " + i + ") = (" + key + " + " + i + "<sup>2</sup>) mod " + size +
        (hideAns ? "" : " = " + hashFunction.quadratic(key, i, size)) + "</em>";
    }
  };

  if (code) {
    pseudo = av.code($.extend({after: {element: $(".instructions")}}, code));
    pseudo.show();
  }

  function initialize() {


    var probeMessage = interpret("av_probing") + " <strong style='color: #c00'>" +
      interpret("av_" + probing) + "</strong><br>" + hashFunctionString[probing]("k", "i", hashSize, true);

    // clear old structures
    if (hashArray) {
      hashArray.clear();
    }
    if (opStack) {
      opStack.clear();
    }
    // remove all old labels
    av.container.find(".exerciseLabel").remove();

    // generate (pseudo) random input
    initialOps = generateHashOperations(opSize);

    // create operation stack
    opStack = av.ds.stack(initialOps.values, {center: true, ytransition: -9, xtransition: 7});
    opStack.css("min-height", 100);
    opStack.layout();
    for (var i = 0; i < opSize; i++) {
      opStack.get(i).addClass(initialOps.operations[i]);
    }

    // create array
    hashArray = av.ds.array(new Array(hashSize), {indexed: true, center: true, autoresize: false});
    hashArray.layout();
    hashArray.click(clickHandler);

    // create new labels
    $hashLabel = $("<p class='exerciseLabel'>" + interpret("av_hash") + "</p>");
    $stackLabel = $("<p class='exerciseLabel'>" + interpret("av_operations") + "</p>");

    // style the labels
    $hashLabel.add($stackLabel)
      .css("text-align", "center")
      .css("font-weight", "bold");

    // insert the labels
    $hashLabel.insertBefore(hashArray.element);
    $stackLabel.insertBefore(opStack.element);


    // show the used probing type
    av.umsg(probeMessage);

    return hashArray;
  }

  function modelSolution(jsav) {
    // initialize infix array
    var msOldHash = jsav.ds.array(initialHash, {
      indexed: true,
      center: true,
      autoresize: false
    });

    // initialize stack
    var msStack = jsav.ds.stack(initialInsert, {center: true});
    msStack.css("min-height", msOldHash.css("height"));
    msStack.layout();
    msStack.hide();

    // initialize result array
    var msNewHash = jsav.ds.array(new Array(newSize), {
      indexed: true,
      center: true,
      autoresize: false
    });

    jsav.displayInit();

    var i, ind;

    // rehash the values from the old table
    for (i = 0; i < msOldHash.size(); i++) {
      if (msOldHash.value(i) !== "") {
        msOldHash.addClass(i, "selected");
        var t = 0;
        while (msNewHash.value(ind = hashFunction[probing](msOldHash.value(i), t, newSize))) {
          jsav.umsg(hashFunctionString[probing](msOldHash.value(i), t, newSize) + "<br>" + interpret("av_ms_collision"), {fill: {index: ind}});
          // add arrows on top of
          msNewHash.addClass(ind, "jsavarrow");
          jsav.gradeableStep();
          t++;
        }
        jsav.umsg(hashFunctionString[probing](msOldHash.value(i), t, newSize) + "<br>" + interpret("av_ms_insert"), {fill: {index: ind}});
        // move the value from the old hash table to new hash table
        jsav.effects.moveValue(msOldHash, i, msNewHash, ind);
        msOldHash.removeClass(i, "selected");
        // remove all arrows
        msNewHash.removeClass(true, "jsavarrow");
        jsav.gradeableStep();
      }
    }

    msOldHash.hide();
    msStack.show();
    jsav.step();

    // insert the values in the stack to the new hash table
    while (msStack.size()) {
      msStack.first().addClass("selected");
      i = 0;
      while (msNewHash.value(ind = hashFunction[probing](msStack.first().value(), i, newSize))) {
        jsav.umsg(hashFunctionString[probing](msStack.first().value(), i, newSize) + "<br>" + interpret("av_ms_collision"), {fill: {index: ind}});
        msNewHash.addClass(ind, "jsavarrow");
        jsav.gradeableStep();
        i++;
      }
      jsav.umsg(hashFunctionString[probing](msStack.first().value(), i, newSize) + "<br>" + interpret("av_ms_insert"), {fill: {index: ind}});
      jsav.effects.moveValue(msStack.first(), msNewHash, ind);
      msStack.removeFirst();
      msStack.layout();
      // remove all arrows
      msNewHash.removeClass(true, "jsavarrow");
      jsav.gradeableStep();
    }

    return msNewHash;
  }


  var clickHandler = function (index) {
    function nextOperation() {
      hashArray.removeClass(true, "jsavarrow");
      if (opStack.size()) {
        opStack.removeFirst();
        opStack.layout();
      }
      exercise.gradeableStep();
    }

    if (!opStack.size()) {
      return;
    }
    var first = opStack.first(),
        operation;
    if (first.hasClass("insert")) {
      operation = "insert";
    } else if (first.hasClass("remove")) {
      operation = "remove";
    } else if (first.hasClass("search")) {
      operation = "search";
    } else {
      // unknown operation
      return;
    }

    switch (operation) {
    case "insert":
      if (this.value(index) === "" || this.value(index) === "[del]") {
        // insert element
        this.value(index, first.value());
        nextOperation();
      } else {
        this.addClass(index, "jsavarrow");
        exercise.gradeableStep();
      }
      break;
    case "remove":
      if (this.value(index) === "") {
        nextOperation();
      } else if (this.value(index) === first.value()) {
        this.value(index, "[del]");
        nextOperation();
      } else {
        this.addClass(index, "jsavarrow");
        exercise.gradeableStep();
      }
      break;
    case "search":
      if (this.value(index) === "") {
        nextOperation();
      } else if (this.value(index) === first.value()) {
        nextOperation();
      } else {
        this.addClass(index, "jsavarrow");
        exercise.gradeableStep();
      }
      break;
    }


  };


  // generate hash operations
  function generateHashOperations(size) {
    var values = new Array(size),
        operations = new Array(size),
        result = { values: values, operations: operations },
        i, start, end, ind1, ind2, ind3, ind4, colInd;

    // the first quarter contains insert operations
    // collissions at ind1 and ind2
    start = 0;
    end = Math.floor(size / 4);
    ind1 = Math.random() < 0.5 ? 1 : 2;
    ind2 = ind1 + Math.floor(Math.random() * (end - ind1));
    for (i = start; i < end; i++) {
      operations[i] = "insert";
      if (i === ind1 || i === ind2) {
        continue;
      }
      values[i] = JSAV.utils.rand.numKey(100, 900);
    }
    // collision index
    colInd = hashFunction[probing](values[0], 0, hashSize);
    // generate colliding values
    values[ind1] = Math.floor(JSAV.utils.rand.numKey(100, 900) / size) * size + colInd;
    values[ind2] = Math.floor(JSAV.utils.rand.numKey(100, 900) / size) * size + colInd;


    // the second quarter contains remove operations
    // attempt to remove non-existing key at ind1
    // attempt to remove already removed key at ind2
    start = end;
    end = Math.floor(size / 2);
    ind1 = start + Math.floor(Math.random() * (end - 1 - start));
    ind2 = end - 1;
    for (i = start; i < end; i++) {
      operations[i] = "remove";
      if (i === ind1 || i === ind2) {
        continue;
      }
      values[i] = values[Math.floor(Math.random() * start)];
    }
    // new key
    values[ind1] = JSAV.utils.rand.numKey(100, 900);
    // already removed key
    values[ind2] = values[(ind1 === start ? start + 1: start)];


    // the third quarter contains search operations
    // attempt to search for a non-existing key at ind3
    // attempt to search for an already removed key at ind4
    start = end;
    end += Math.floor(size / 4);
    ind3 = start + Math.floor(Math.random() * (end - 1 - start));
    ind4 = end - 1;
    for (i = start; i < end; i++) {
      operations[i] = "search";
      if (i === ind3 || i === ind4) {
        continue;
      }
      while (typeof values[i] === "undefined" ||
              values[i] === values[ind1] ||
              values[i] === values[ind2]
      ) {
        values[i] = values[Math.floor(Math.random() * start)];
      }
    }
    values[ind3] = values[ind1];
    values[ind4] = values[ind2];


    //the fourth quarter contains more insert operations
    start = end;
    end = size;
    for (i = start; i < end; i++) {
      operations[i] = "insert";
      values[i] = JSAV.utils.rand.numKey(100, 900);
    }

    return result;
  }


  var exercise = av.exercise(modelSolution, initialize, {
    feedback: "atend",
    modelDialog: {width: 760}
  });
  exercise.reset();

}(jQuery));
