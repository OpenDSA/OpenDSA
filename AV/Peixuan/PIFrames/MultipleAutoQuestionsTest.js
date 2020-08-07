$(document).ready(function(){
  "use strict";
  var av_name = "MultipleAutoQuestionsTest";
  var av = new JSAV(av_name);

  var url = "../../../AV/VisFormalLang/Regular/Machines/nfa1.jff";
  av.umsg("Suppose we want to convert the following FA to a Regular Expression")
  av.displayInit();
  var nfa = new av.ds.FA({url: url, top: 10, width: 300, height: 250, left: 0});
  var fatoreController = new FAtoREController(av, nfa, {});
  var piframesLocations = {top: 10, left: -50};
  visualizeConversionWithQuestions(fatoreController, url, av_name, {top: 300, left: 100}, {left: 0, width: 300, height: 250, top:250}, piframesLocations);
  nfa.layout();
  av.step();

  //need insert step() before this function
  //USE this to clean the remaning graphs
  cleanRemaingGraph(av_name);

  var url = "../../../AV/VisFormalLang/FA/Machines/EvenBinaryDFACON.jff";
  av.umsg("In this slideshow, we will trace the acceptance or rejections of some strings. The given machine can accept any even number. You can click on any cell to see the process again starting from the clicked cell");
  /*********************************************/
  /*make sure don't call displayInit again*/
  /*********************************************/
  //av.displayInit();
  var binaryDFA = new av.ds.FA({left: 10, url: url});
  var acceptor = new TraverseAcceptor(av, binaryDFA);
  var piframesLocations = {top: 10, left: -50};
  av.step();
  acceptorVisualizeWithQuestions(av_name, av, acceptor,
                      [["0", "0", "1", "0", "1", "0", "0", "1", "0"],
                      ["0", "1", "1", "1"],
                      ["0", "1", "0", "1", "0", "0", "0", "1", "0"]],
                      {left: 80, top: 260},
                      piframesLocations);
  /*Make sure only call recorded at the end*/
  av.recorded();
});
