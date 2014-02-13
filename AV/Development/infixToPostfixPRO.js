(function ($) {
  "use strict";

  var arraySize = 15, // size needs to be odd
    initialInfix = [],
    infixArray,
    resultArray,
    stack,
    bitBucket,
    av = new JSAV($("#jsavcontainer")),
    clickHandler;

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {
    
    exercise.jsav.container.find(".jsavcanvas").css({height: 300});

    // set up click handler
    if (typeof clickHandler === "undefined") {
      clickHandler = new ClickHandler(av, exercise, {selectedClass: "selected"});
    }
    clickHandler.reset();

    // generate random infix
    initialInfix = generateRandomInfix(arraySize, 2, false);

    // create array with infix expression
    if (infixArray) {
      clickHandler.remove(infixArray);
      infixArray.clear();
    }
    infixArray = av.ds.array(initialInfix, {indexed: false, center: true});
    infixArray.element.css({"top": 50});
    infixArray.layout();
    clickHandler.addArray(infixArray);

    // create empty array for the result
    if (resultArray) {
      clickHandler.remove(resultArray);
      resultArray.clear();
    }
    resultArray = av.ds.array(new Array(arraySize - 4), {indexed: false, center: true});
    resultArray.element.css({"top": 250});
    resultArray.layout();
    clickHandler.addArray(resultArray, 
      { onDrop: function () { restoreInfix(infixArray).call(this); }
    });

    // add stack and set click handler
    if (stack) {
      clickHandler.remove(stack);
      stack.clear();
    }
    stack = av.ds.list({nodegap: 15, center: false});
    stack.addFirst("");
    stack.first().addClass("greybg");
    stack.css({top: 30, left: 200});
    stack.layout();
    clickHandler.addList(stack, {
      keep: true,
      select: "first",
      drop: "first",
      onDrop: function (){ restoreInfix(infixArray).call(this) }
    });

    // create the bit bucket
    if (typeof bitBucket === "undefined") {
      bitBucket = av.ds.array(["Bit Bucket"], {indexed: false, center: false});
      bitBucket.element.css({"top": 150, "left": 60 , "position": "absolute", "width": "auto"});
      clickHandler.addArray(bitBucket, {
        onSelect: function () { return false; },
        onDrop: restoreInfix(infixArray),
        effect: "toss"
      });
    }

    // clear all the Raphael elements (text)
    av.getSvg().clear();

    // add text
    var font = {
      "font-size": 16,
      "font-family": "Times New Roman",
      "font-weight": "bold"
    };
    var canvasWidth = exercise.jsav.container.find(".jsavcanvas").width();
    av.getSvg().text(canvasWidth / 2, 20, "Infix Expression").attr(font);
    av.getSvg().text(canvasWidth / 2, 140, "Stack").attr(font);
    av.getSvg().text(canvasWidth / 2, 280, "Postfix Expression").attr(font);

    return resultArray;
  }

  function modelSolution(jsav) {
    // array
    var modelArray = jsav.ds.array(initialInfix);
    // stack
    var modelStack = jsav.ds.list({nodegap: 15, layout: "horizontal", center: false});
    modelStack.addFirst("");
    modelStack.first().addClass("greybg");
    modelStack.css({top: 30, left: 200});
    modelStack.layout();

    var modelResultArray = jsav.ds.array(new Array(arraySize - 4));
    modelResultArray.element.css(
      {top: 165,
      left: (jsav.canvas.outerWidth() - modelResultArray.element.outerWidth()) / 2,
      "position": "absolute"});
    
    var modelBitBucket = jsav.ds.array(["Bit Bucket"], {indexed: false, center: false});
    modelBitBucket.element.css({"top": 60, "left": 60 , "position": "absolute"});

    jsav.canvas.css({height: 250});

    jsav._undo = [];

    $(".jsavforward").click(function() {
      if (jsav.container.hasClass("jsavplaying")) {
        jsav.container.removeClass("jsavplaying");
      }
    });
    $(".jsavbackward").click(function() {
      if (jsav.container.hasClass("jsavplaying")) {
        jsav.container.removeClass("jsavplaying");
      }
    });

    // postfix index
    var postfixInd = 0;

    for (var i = 0; i < arraySize; i++) {
      var newChar = initialInfix[i];
      var type;
      if (parseInt(newChar, 16)) {
        type = "operand";
      } else {
        type = newChar;
      }

      switch (type) {
        case "operand":
          // move operand into the expression
          jsav.effects.moveValue(modelArray, i, modelResultArray, postfixInd++);
          restoreInfix(modelArray).call(this);
          jsav.umsg("The operands go directly into the postfix expression");
          jsav.stepOption("grade", true);
          jsav.step();
          break;
        case "(":
          // push the left parenthesis to the stack
          modelStack.addFirst();
          jsav.effects.moveValue(modelArray, i, modelStack.first());
          restoreInfix(modelArray).call(this);
          modelStack.layout();
          jsav.umsg("The left parenthesis is pushed to the stack.");
          jsav.stepOption("grade", true);
          jsav.step();
          break;
        case ")":
          // throw the right parenthesis into the bit bucket and pop operators into the expression
          modelArray.value(i, "");
          restoreInfix(modelArray).call(this);
          jsav.umsg("After we have read a right parenthesis, we pop the operators from the stack and put them into the postfix expression, until we find a left parenthesis.");
          //  jsav.stepOption("grade", true);
          jsav.step();
          var node = modelStack.first();
          while (node.value() !== "(") {
            jsav.effects.moveValue(node, modelResultArray, postfixInd++);
            modelStack.removeFirst();
            modelStack.layout();
            jsav.stepOption("grade", true);
            jsav.step();
            node = modelStack.first();
          }
          // pop the left parenthesis into the bit bucket
          modelStack.removeFirst();
          modelStack.layout();
          jsav.stepOption("grade", true);
          jsav.step();
          break;
        case "*":
          // pop possible * from the stack into the expression
          var node = modelStack.first();
          while (node.value() === "*") {
            jsav.effects.moveValue(node, modelResultArray, postfixInd++);
            modelStack.removeFirst();
            modelStack.layout();
            jsav.umsg('"*" has the same presendence as the read value("*"), so we pop it from the stack and put it in the postfix expression.');
            jsav.stepOption("grade", true);
            jsav.step();
            node = modelStack.first();
          }
          // push the * into the stack
          modelStack.addFirst();
          jsav.effects.moveValue(modelArray, i, modelStack.first());
          restoreInfix(modelArray).call(this);
          modelStack.layout();
          jsav.umsg('The "*" operator is pushed into the stack.');
          jsav.stepOption("grade", true);
          jsav.step();
          break;
        case "+":
          // pop possible * and + from the stack into the expression
          var node = modelStack.first();
          while (node.value() === "*" || node.value() === "+") {
            jsav.umsg('"'+node.value()+'"'+' has greater or equal presendence than the read value("+"), so we pop it from the stack and put it in the postfix expression.');
            jsav.effects.moveValue(node, modelResultArray, postfixInd++);
            modelStack.removeFirst();
            modelStack.layout();
            jsav.stepOption("grade", true);
            jsav.step();
            node = modelStack.first();
          }
          // push the + into the stack
          modelStack.addFirst();
          jsav.effects.moveValue(modelArray, i, modelStack.first());
          restoreInfix(modelArray).call(this);
          modelStack.layout();
          jsav.umsg('The "+" operator is pushed into the stack.');
          jsav.stepOption("grade", true);
          jsav.step();
          break;
      }
    }

    // empty the stack into the expression
    var node = modelStack.first();
    while (node.value() !== "") {
      jsav.effects.moveValue(node, modelResultArray, postfixInd++);
      modelStack.removeFirst();
      modelStack.layout();
      jsav.umsg("Pop the rest of the operators from the stack and put them in the postfix expression.");
      jsav.stepOption("grade", true);
      jsav.step();
      node = modelStack.first();
    }

    return modelResultArray;
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend"});
  exercise.reset();

  // generates a random infix expression
  // only made to work with the exercise
  // initial call should be made with odd length
  function generateRandomInfix(length, parentheses, endWithOperator) {
    if (length === 0)
      return [];
    if (length === 1) {
      if (endWithOperator) {
        return Math.random() < 0.5? ["+"]: ["*"];
      } else {
        var operand = Math.ceil(Math.random() * 15).toString(16);
        return [operand];
      }
    }

    var minLengthForParentheses = parentheses * 5 + parentheses - 1 + (endWithOperator && parentheses?1:0);
    
    if (Math.random() < minLengthForParentheses / length) {
      // return array with parentheses
      if (    parentheses - 1 > 0 &&
          length >= 11 + (endWithOperator?1:0) &&
          Math.random() < 0.5) {
        // parentheses inside parentheses
        if (length <= 12) {
          return ["("].concat(generateRandomInfix(9, 1, false),
                    [")"],
                    generateRandomInfix(length - 11,parentheses - 2, endWithOperator));
        } else {
          return ["("].concat(generateRandomInfix(9, 1, false),
                    [")"],
                    generateRandomInfix(1, 0, true),
                    generateRandomInfix(length - 12,parentheses - 2, endWithOperator));
        }
      }
      var parInside = Math.min(Math.random() < 0.5? 3: 5, length - 2);
      if (length <= parInside + 3) {
        return ["("].concat(generateRandomInfix(parInside, 0, false),
                  [")"],
                  generateRandomInfix(length - parInside - 2, parentheses - 1, endWithOperator));

      } else {
        return ["("].concat(generateRandomInfix(parInside, 0, false),
                  [")"],
                  generateRandomInfix(1, 0, true),
                  generateRandomInfix(length - parInside - 3, parentheses - 1, endWithOperator));  
      }
    }

    // no parentheses
    // return operand + operator
    var operand = Math.ceil(Math.random() * 15).toString(16);
    return [operand].concat(generateRandomInfix(1, 0, true),
                generateRandomInfix(length - 2, parentheses, endWithOperator));

  }

  // returns a function which:
  // restores the infix expression after an element has been moved
  // away from the expression
  // paints the restored index grey to mark that it has been used
  function restoreInfix(array) {
    return function() {
      for (var i = 0; i < arraySize; i++) {
        if (array.value(i) === "") {
          array.value(i, initialInfix[i]);
          array.addClass(i, "greybg");
          return false;
        }
      }
      return true;
    }
  }
}(jQuery));