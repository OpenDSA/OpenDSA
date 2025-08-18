MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$','$'], ['\\(','\\)']],
        displayMath: [ ['$$','$$'], ["\\[","\\]"] ],
        processEscapes: true
      },
      "HTML-CSS": {
        scale: "100"
      }
});

(function () {
  function reflowJSAV() {
    window.dispatchEvent(new Event('resize'));
  }
  if (window.Reveal) {
    Reveal.on('ready', reflowJSAV);
    Reveal.on('slidechanged', reflowJSAV);
    Reveal.on('fragmentshown', reflowJSAV);
    Reveal.on('fragmenthidden', reflowJSAV);
    Reveal.on('resize', reflowJSAV);
  } else {
    document.addEventListener('DOMContentLoaded', reflowJSAV);
  }
})();

// var slides = [];
// var pos = 0;
// $(document).ready(function (){
//   slides = $("body").find(".slide");
//   for (var i = 0; i < slides.length; i++){
// 	slides.eq(i).attr("pos", i); 
// 	//slides.eq(i).addClass("hide");
//   } 
// });
// $(document).keydown(function(e){
//     //slides.eq(pos).addClass("hide");
// 	if (e.keyCode == 37) {
// 	  if (pos > 0){
// 	    window.scrollBy(0, -500);
// 	    pos = pos - 1;
// 	  }
//     }
//     else if	(e.keyCode == 39){
// 	  if (pos < slides.length - 1){
// 	    window.scrollBy(0, +500);
// 	    pos = pos + 1;
// 	  }
// 	}
// 	//slides.eq(pos).removeClass("hide");
// });