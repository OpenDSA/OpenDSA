(function ($) {
  "use strict";

  var languages = {
    en: {
      title: "Binary Search",
      instructLabel: "Instructions:",
      instructions: "Find the key given in the exercise by highlighting the <strong>mid points</strong> used in Binary Search. The values are hidden and in <strong>ascending order</strong>.",
      find_label: "Find",
      ms_comment1: "Low = {low} and high = {high}, so mid = ( {low} + {high} ) / 2 = <strong>{mid}</strong> (line 9, division truncates!)",
      ms_comment2: "<br/>Because {arr_at_mid} is less than {key}, the new low will be <strong>{mid_plus_1}</strong>. (line 10 and 11)",
      ms_comment3: "<br/>Because {arr_at_mid} is greater than {key}, the new high will be <strong>{mid_minus_1}</strong>. (line 12 and 13)",
      ms_comment4: "<br/>The key was found at index {mid}!",
      ms_comment5: "<br/>The key was not found in the table."
    },
    fi: {
      title: "Puolitushaku",
      instructLabel: "Ohjeet:",
      instructions: "Löydä etsittävä arvo klikkaamalla mid-muuttujan arvoa vastaavia indeksejä annetussa puolitushakualgoritmissa. Klikkaamattomat arvot ovat piilossa. Taulukon arvot ovat nousevassa järjestyksessä.",
      find_label: "Etsi",
      ms_comment1: "Low = {low} ja high = {high}, joten mid = ( {low} + {high} ) / 2 = <strong>{mid}</strong> (rivi 9, osamäärä pyöristetään alaspäin!)",
      ms_comment2: "<br/>Koska {arr_at_mid} on pienempi kuin {key}, low:n uudeksi arvoksi tulee <strong>{mid_plus_1}</strong>. (rivit 10 ja 11)",
      ms_comment3: "<br/>Koska {arr_at_mid} on suurempi kuin {key}, high:n uudeksi arvoksi tulee <strong>{mid_minus_1}</strong>. (rivit 12 ja 13)",
      ms_comment4: "<br/>Haettava avain löytyi kohdasta {mid}!",
      ms_comment5: "<br/>Avainta ei löytynyt."
    }
  }

  var arraySize = 20,
    key,
    initialArray = [],
    array,
    keyholder,
    findLabel,
    lang,
    av = new JSAV($("#jsavcontainer")),
    code = av.code(
      "int binarySearch(int[] table, int x) {\n"+
      "    int low = 0;\n"+
      "    int high = table.length - 1;\n"+
      "    int mid;\n"+
      "\n"+
      "    while( low <= high )\n"+
      "    {\n"+
      "        // Division truncates\n"+
      "        mid = (low + high) / 2;\n"+
      "        if( table[mid] < x)\n"+
      "            low = mid + 1;\n"+
      "        else if(table[mid] > x)\n"+
      "            high = mid - 1;\n"+
      "        else\n"+
      "            return mid;\n"+
      "    }\n"+
      "    return -1;     // Not found\n"+
      "}");

  av.recorded(); // we are not recording an AV with an algorithm

  function initialize() {

    // create language function for the selected language
    // If exercise.lang is undefined English("en") will be used
    lang = getLanguageFunction(languages, exercise.options.lang);
    console.log(exercise.options.lang);

    av.container.find(".title").html(lang("title"));
    av.container.find(".instructLabel").html(lang("instructLabel"));
    av.container.find(".instructions").html(lang("instructions"));

    // show the code and highlight the row where mid is calculated
    code.show();
    code.highlight(8);

    //generate random array with ascending values
    var randomVal = 0;
    for (var i = 0; i < arraySize; i++) {
      randomVal += Math.floor(Math.random()*10);
      initialArray[i] = randomVal;
    }

    //generate a random key, the value of which is between the min and max of the array
    key = Math.ceil(5* (initialArray[0] + initialArray[arraySize -1]) / 7);
    
    // clear old elements
    if (keyholder) {
      keyholder.clear();
    }
    if (findLabel) {
      findLabel.clear();
    }
    if (array) {
      array.clear();
    }

    //insert key into the array (the blue box)
    keyholder = av.ds.array([key], {indexed: false});
    keyholder.css(0, {"background-color": "#ddf"});
    findLabel = av.label(lang("find_label"), {relativeTo: keyholder, anchor: "center top", myAnchor: "center bottom"});

    // create the empty array
    array = av.ds.array(new Array(arraySize), {indexed: true, autoresize: false});
    array.click(clickhandler);
    array.layout();

    return array;
  }

  function modelSolution(jsav) {
    jsav.ds.array([key], {indexed: false}).css(0, {"background-color": "#ddf"});
    var modelArray = jsav.ds.array(Array(arraySize), {indexed: true, autoresize: false});

    jsav._undo = [];

    var low = 0, high = arraySize - 1, mid;

    while (low <= high) {
      mid = Math.floor( (low + high)/2);
      jsav.umsg(lang("ms_comment1"), {fill: {
        low: low,
        high: high,
        mid: mid
      }});
      modelArray.value(mid, initialArray[mid]);
      modelArray.highlight(mid);
      if (modelArray.value(mid) < key) {
        jsav.umsg(lang("ms_comment2"), {preserve: true, fill: {
          "arr_at_mid": modelArray.value(mid),
          key: key,
          "mid_plus_1": mid + 1
        }});
        low = mid + 1;
        paintGrey(modelArray, 0, mid);
      }
      if (modelArray.value(mid) > key) {
        jsav.umsg(lang("ms_comment3"), {preserve: true, fill: {
          "arr_at_mid": modelArray.value(mid),
          key: key,
          "mid_minus_1": mid - 1
        }});
        high = mid - 1;
        paintGrey(modelArray, mid, arraySize - 1);
      }
      if (modelArray.value(mid) === key) {
        jsav.umsg(lang("ms_comment4"), {preserve: true, fill: {key: key}});

        paintGrey(modelArray, 0, arraySize - 1);
      }
      jsav.stepOption("grade", true);
      jsav.step();
      if (modelArray.value(mid) === key) {
        return modelArray;
      }
    }
    jsav.umsg(lang("ms_comment5"), {preserve: true});
    return modelArray;
  }

  var exercise = av.exercise(modelSolution, initialize, {}, {feedback: "atend", modelDialog: {width: 780}});
  exercise.reset();

  // bind a function to handle all click events on the array
  function clickhandler(index) {
    
    //if the clicked index is not higlighted earlier, highlight it and paint the ones which are outside of the new range
    if (!this.isHighlight(index)) {
      this.value(index, initialArray[index]);
      // if (this.value(index) > key) {
      //     paintGrey(this, index, arraySize - 1);
      // } else if (this.value(index) < key) {
      //     paintGrey(this, 0, index);
      // }
      // if (this.value(index) === key) {
      //     paintGrey(this, 0, arraySize - 1);
      // }
      // highlight the index
      this.highlight(index);
      exercise.gradeableStep();
    }
  }

  // paints the background gray for indices [first, last].
  function paintGrey(array, first, last) {
    array.addClass(
      function(index) {return index >= first && index <= last},
      "greybg"
      );
  }

}(jQuery));