$(document).ready(function() {
  "use strict";
  var av_name = "FFTprocedureCON";

  var av = new JSAV(av_name);
  av.umsg("This slideshow shows a visualization of the Fast Fourier Transform.")
  var polynomial = [0, 1, 2, 3];

  av.displayInit();

  av.umsg("New polynomial.");

  var poly2 = fft(polynomial, 4);

  var arr2 = av.ds.array(poly2);

  av.recorded();

  function fft(poly, n) {
  	var even = [];
  	var odd = [];
  	var list1 = [];
  	var list2 = [];
  	var newPoly = [];
  	var height = 0;

  	av.umsg("Perform Fast Fourier Transform on the given polynomial.");
  	var polynomial = av.ds.array(poly);
  	height = height + 50;
  	av.step();

  	if (n == 1) {
  		var list = [poly[0]];
  		av.umsg("The polynomial only has one value which is returned.")
  		av.step();
  		polynomial.hide();
  		return list;
  	}

  	for (var i = 0; i <= n/2 - 1; i++) {
  		even[i] = poly[2 * i];
  		odd[i] = poly[2 * i + 1];
  	}

  	av.umsg("Split into an even and an odd array.")
  	var evenArr = av.ds.array(even, {left: 250, top: height});
  	var evenLab = av.label("even:", {left: 200, top: height});
  	var oddArr = av.ds.array(odd, {left: 550, top: height});
  	var oddLab = av.label("odd:", {left: 500, top: height});
  	height = height + 50;
  	av.step();

  	av.umsg("List 1 is a Fast Fourier Transform of the even array.");
  	av.step();

  	polynomial.hide();
  	evenArr.hide();
  	evenLab.hide();
  	oddArr.hide();
  	oddLab.hide();
  	list1 = fft(even, n/2);
  	polynomial.show();
  	evenArr.show();
  	evenLab.show();
  	oddArr.show();
  	oddLab.show();
  	var list1Arr = av.ds.array(list1, {left: 250, top: height});
  	var list1Lab = av.label("List 1:", {left: 200, top: height});
  	av.step();

  	av.umsg("List 2 is a Fast Fourier Transform of the odd array.");
  	av.step();

  	polynomial.hide();
  	evenArr.hide();
  	evenLab.hide();
  	oddArr.hide();
  	oddLab.hide();
  	list1Arr.hide();
  	list1Lab.hide();
  	list2 = fft(odd, n/2);
  	polynomial.show();
  	evenArr.show();
  	evenLab.show();
  	oddArr.show();
  	oddLab.show();
  	list1Arr.show();
  	list1Lab.show();
  	var list2Arr = av.ds.array(list2, {left: 550, top: height});
  	var list2Lab = av.label("List 2:", {left: 500, top: height});
  	height = height + 50;
  	av.step();

  	av.umsg("Now we compute the new polynomial. Each value of the array is computed using: "
  		+ "$list1[k] + z*list2[k]$. Where $k = index % (n/2)$ and $z=e^(2*\\pi*i*j/n)$.");


  	for (var j = 0; j <= (n - 1); j++) {
  		var exponent = new Complex(0, 2 * Math.PI * j / n);
  		var z = exponent.exp().round();
  		var k = j % (n / 2);
  		var l1 = new Complex(list1[k], 0);
  		var l2 = new Complex(list2[k], 0);
  		var out = l1.add(z.mul(l2))
  		newPoly[j] = out;
  	}

  	if (n == 2)
  	{
  		var newArr = av.ds.array(newPoly, {left: 394, top: height});
  	}
  	else
  	{
  		var newArr = av.ds.array(newPoly, {left: 352, top: height});
  	}
  	
  	av.step();

  	av.umsg("The polynomial has been transfromed and is returned.")

  	polynomial.hide();
  	evenArr.hide();
  	evenLab.hide();
  	oddArr.hide();
  	oddLab.hide();
  	list1Arr.hide();
  	list1Lab.hide();
  	list2Arr.hide();
  	list2Lab.hide();
  	newArr.hide();

  	return newPoly;
  }


 });