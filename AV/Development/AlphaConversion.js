(function() {
	var x = 0; var y = 0;
	var av = new JSAV("av");
	var stepOne = ["(", "&#955;x.", "&#955;y.", "(", "x", "y", ")", "y", ")"];
	var stepTwo = ["&#955;y.", "(", "y", "y", ")"];
	var stepThree = ["(", "&#955;x.", "&#955;z.", "(", "x", "z", ")", "y", ")"];
	var stepFour = ["&#955;z.", "(", "y", "z", ")"];
	av.label("&#945;-Conversion Matrix");
	var m1 = av.ds.matrix([stepOne, stepTwo, stepThree, stepFour], {style: "plain"});
	x = 1;
	for(y = 0; y < 5; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(255, 255, 255)"});
	}
	x = 2;
	for(y = 0; y < 9; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(255, 255, 255)"});
	}
	x = 3;
	for(y = 0; y < 5; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(255, 255, 255)"});
	}
	av.umsg("This slideshow will illustrate the importance of alpha-conversion.");
	av.displayInit();
	x = 1;
	for(y = 0; y < 5; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(0,0,0)"});
	}
	av.umsg("If we try to beta-reduce this equation...");
	av.step();
	m1.css(0, 4, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	m1.css(1, 2, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	av.umsg("...we capture a free-variable which causes problems.");
	av.step();
	m1.css(0, 4, {"background-color": "white", "color": "rgb(0,0,0)"});
	x = 1;
	for(y = 0; y < 5; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(255, 255, 255)"});
	}
	av.umsg("So, how do we fix this?");
	av.step();
	m1.css(0, 2, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	m1.css(0, 5, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	x = 2;
	for(y = 0; y < 9; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(0,0,0)"});
	}
	m1.css(2, 2, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	m1.css(2, 5, {"background-color": "lightgreen", "color": "rgb(0, 0, 0)"});
	av.umsg("We need to alpha-convert the expression!");
	av.step();
	m1.css(0, 2, {"background-color": "white", "color": "rgb(0,0,0)"});
	m1.css(0, 5, {"background-color": "white", "color": "rgb(0,0,0)"});
	m1.css(2, 2, {"background-color": "white", "color": "rgb(0,0,0)"});
	m1.css(2, 5, {"background-color": "white", "color": "rgb(0,0,0)"});
	x = 3;
	for(y = 0; y < 5; y++)
	{
		m1.css(x, y, {"background-color": "white", "color": "rgb(0,0,0)"});
	}
	av.umsg("This allows us to reduce without capturing free-variables.");
	av.step();
	x = 2;
	for(y = 0; y < 9; y++)
	{	
		m1.css(x, y, {"background-color": "white", "color": "rgb(255, 255, 255)"});
	}
	av.umsg("This gives us an answer we can use!");
	av.recorded();
}());