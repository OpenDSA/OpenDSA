(function ($) 
{
	$(document).ready(function () 
	{
		var settings = new JSAV.utils.Settings($(".jsavsettings"));
		var arrayLayout = settings.add("layout", {"type": "select", "options": {"bar": "Bar", "array": "Array"}, "label": "Array layout: ", "value": "array"});
		var av = new JSAV($('.avcontainer'), {settings: settings});
		av.recorded();
		var tell = function (msg, color) { av.umsg(msg, {color: color}); };
		var incrs = [], $theExpression = $("#expression"), initialArray = [], theExpression, tempAnswer, position, max, ansArray, currentScore, currentLost, currentRemain;

		function modelSolution(jsav) 
		{
			ansArray = ["(^x.(x x) z)", "(z z)"];
			return ansArray;
		}
		
		function init() 
		{
			max = 2;
			position = -1;
			currentLost = 0;
			currentScore = 0;
			currentRemain = max;
			document.getElementById('score').innerHTML = "Score: "+currentScore+" / "+max+", Points remaining: "+currentRemain+", Points lost: "+currentLost;
			document.getElementById('answer').value = "";
			var htmldata = "(&#955;x.(x x) (&#955;y.y z))";
			$theExpression.html(htmldata);
			return htmldata;
		}
		
		function help() 
		{
			alert("Help");
		}

		function about() 
		{
			alert("Proficiency Exercise");
		}

		function submit()
		{
			if(currentRemain > 0)
			{
				var temp = document.getElementById('answer').value;
				document.getElementById('answer').value = "";
				position++;
				currentRemain--;
				if(temp == ansArray[position])
				{
					currentScore++;
					document.getElementById('score').innerHTML = "Score: "+currentScore+" / "+max+", Points remaining: "+currentRemain+", Points lost: "+currentLost;
					$theExpression.html(ansArray[position]);
				} else
				{
					currentLost++;
					document.getElementById('score').innerHTML = "Score: "+currentScore+" / "+max+", Points remaining: "+currentRemain+", Points lost: "+currentLost;
					$theExpression.html(ansArray[position]);
				}
			}
		}

		var exercise = 	av.exercise(modelSolution, init, { compare:  [{css: "background-color"}, {}], controls: $('.jsavexercisecontrols')});
		exercise.reset();

		$('#help').click(help);
		$('#about').click(about);
		$('#submit').click(submit);
	});
}(jQuery));