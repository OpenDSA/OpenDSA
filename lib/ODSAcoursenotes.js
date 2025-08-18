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
  let pending = false;

  function reflowJSAV() {
    const s = (window.Reveal && Reveal.getCurrentSlide && Reveal.getCurrentSlide()) || null;
    if (!s || !s.querySelector('.jsavcontainer,.ssAV,.ffAV')) return;

    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
      pending = false;
    });
  }

  if (window.Reveal) {
    Reveal.on('ready',          reflowJSAV);
    Reveal.on('slidechanged',   reflowJSAV);
    Reveal.on('fragmentshown',  reflowJSAV);
    Reveal.on('fragmenthidden', reflowJSAV);
  } else {
    document.addEventListener('DOMContentLoaded', reflowJSAV);
  }
})();