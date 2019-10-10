$(document).ready(function() {
    "use strict";
    var av_name = "Frames";
    var av = new JSAV(av_name);
    var injector = PIFRAMES.init(av_name);
    // Load the config object with interpreter and code created by odsaUtils.js
    var config = ODSA.UTILS.loadConfig({av_name: av_name}),
        interpret = config.interpreter, // get the interpreter
        code = config.code;             // get the code object
    var goNext = false;
    av.umsg("First Information");
    // var q = av.question("TF", "Understand the given information", {correct: true, falseLabel: "No", trueLabel: "Yes"});
    // var answer = q.show();
    // alert(answer);
    av.step();
    av.umsg("Second Information");
    av.step();
    av.umsg(injector.injectQuestion("q1"));
    av.step();

    av.umsg("Third Information");
    av.step();
    av.umsg(injector.injectQuestion("q4"));
    av.step();

    av.umsg("Fourth Information");
    av.step();
    av.umsg(injector.injectQuestion("q3"));
    av.step();

    av.umsg("Fifth Information");
    av.step();
    av.umsg(injector.injectQuestion("q2"));
    av.step();

    av.recorded();
    // $(".jsavforward").css("pointer-events", "none");  
    // $(".jsavend").css("pointer-events", "none");  
    // var currnet = 0;
    // var index = 0;
    // $('.jsavforward').click(function() {
    //     if(index === currnet)
    //     $(".jsavforward").css("pointer-events", "none");  
    //     else{
    //     $(".jsavforward").css("pointer-events", "auto");  
    //     index++;
    //     }
    //     });

    // $('.jsavbackward').click(function() {
          
    //     if(index>0){
    //     index--;
    //     $(".jsavforward").css("pointer-events", "auto");
    //     }
    //     });
    // $('.jsavbegin').click(function() {
    //     $(".jsavforward").css("pointer-events", "auto");  
    //     index=0;
    //     });
    // $('.jsavend').click(function() {
    //     $(".jsavforward").css("pointer-events", "none");  
    //     });
});
    
  