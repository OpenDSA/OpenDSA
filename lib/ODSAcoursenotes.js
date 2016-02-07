MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
      },
      "HTML-CSS": {
        scale: "60"
      }
});
// var slides = [];
// var pos = 0;
// $(document).ready(function (){
  // slides = $("body").find(".slide");
  // for (var i = 1; i < slides.length; i++){
	// slides.eq(i).attr("pos", i); 
	// slides.eq(i).addClass("hide");
  // } 
// });
// $(document).keydown(function(e){
    // slides.eq(pos).addClass("hide");
	// if (e.keyCode == 37) {
	  // if (pos > 0){
	    // pos = pos - 1;
	  // }
    // }
    // else if	(e.keyCode == 39){
	  // if (pos < slides.length - 1){
	    // pos = pos + 1;
	  // }
	// }
	// slides.eq(pos).removeClass("hide");
// });