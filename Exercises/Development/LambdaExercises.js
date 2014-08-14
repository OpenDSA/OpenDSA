var jsav, expr1, str, arr, ans, opt, strArr, ansArr, varArr, optArr, var1, var2, var3, rnd, lightArr, answerArr, guessArr;

clickHandler = function(index, e)
{
	if(lightArr[index] === true)
	{
		arr.unhighlight(index);
		lightArr[index] = false;
		for(i = 0; i < guessArr.length; i++)
		{
			if(guessArr[i] === index)
			{
				guessArr.splice(i, 1);
			}
		}
	} else
	{
		arr.highlight(index);
		lightArr[index] = true;
		guessArr[guessArr.length] = index;
	}
}

init_app = function()
{
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = ["(\u03BB"+var1+".("+var1+" "+var1+") (\u03BB"+var2+"."+var2+" "+var3+"))", 
			  "(\u03BB"+var1+"."+var1+" (\u03BB"+var2+"."+var2+" "+var3+"))",
			  "\u03BB"+var1+".(\u03BB"+var1+".("+var1+" "+var1+") "+var2+")"];
	ansArr = ["(^"+var1+".("+var1+" "+var1+") "+var3+")",
			  "(^"+var1+"."+var1+" "+var3+")",
			  "^"+var1+".("+var2+" "+var2+")"];
	rnd = Math.floor(Math.random()*3);
	str = strArr[rnd];
	ans = ansArr[rnd];
	jsav = new JSAV("jsav", {"animationMode": "none"});
	expr1 = jsav.code(str, {lineNumbers: false});
}

init_norm = function()
{
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = ["(\u03BB"+var1+".("+var1+" "+var1+") (\u03BB"+var2+"."+var2+" "+var3+"))", 
			  "(\u03BB"+var1+"."+var1+" (\u03BB"+var2+"."+var2+" "+var3+"))",
			  "\u03BB"+var1+".(\u03BB"+var1+".("+var1+" "+var1+") "+var2+")"];
	ansArr = ["((^"+var2+"."+var2+" "+var3+") (^"+var2+"."+var2+" "+var3+")",
			  "(^"+var2+"."+var2+" "+var3+")",
			  "^"+var1+".("+var2+" "+var2+")"];
	rnd = Math.floor(Math.random()*3);
	str = strArr[rnd];
	ans = ansArr[rnd];
	jsav = new JSAV("jsav", {"animationMode": "none"});
	expr1 = jsav.code(str, {lineNumbers: false});
}

init_alpha = function()
{
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = ["(\u03BB"+var1+".\u03BB"+var2+".("+var1+" "+var2+") "+var2+")"];
	ansArr = ["(\u03BB"+var1+".\u03BB"+var3+".("+var1+" "+var3+") "+var2+")"];
	optArr = 	[
					["(\u03BB"+var1+".\u03BB"+var2+".("+var3+" "+var2+") "+var3+")", 
					 "(\u03BB"+var3+".\u03BB"+var2+".("+var3+" "+var2+") "+var2+")", 
					 "(\u03BB"+var1+".\u03BB"+var2+".("+var1+" "+var2+") "+var3+")",
					 "(\u03BB"+var1+".\u03BB"+var3+".("+var1+" "+var3+") "+var2+")"]
				];
	rnd = Math.floor(Math.random());
	str = strArr[rnd];
	ans = ansArr[rnd];
	opt = optArr[rnd];
	jsav = new JSAV("jsav", {"animationMode": "none"});
	expr1 = jsav.code(str, {lineNumbers: false});
}

init_app_highlight = function()
{
	jsav = new JSAV("jsav", {"animationMode": "none"});
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = [["(", "\u03BB"+var1+".", "(", var1, var1, ")", "(", "\u03BB"+var2+".", var2, var3, ")", ")"],
			  ["(", "\u03BB"+var1+".", var1, "(", "\u03BB"+var2+".", var2, var3, ")", ")"],
			  ["\u03BB"+var1+".", "(", "\u03BB"+var1+".", "(", var1, var1, ")", var2, ")"]];
	ansArr = [[9,8],
			  [6,5],
			  [7,4,5]];
	rnd = Math.floor(Math.random());
	arr = jsav.ds.array(strArr[rnd]);
	answerArr = ansArr[rnd];
	ans = answerArr;
	lightArr = [];
	guessArr = [];
	for(i = 0; i < 9; i++)
	{
		lightArr[i] = false;
	}
	arr.click(clickHandler);
}

init_norm_highlight = function()
{
	jsav = new JSAV("jsav", {"animationMode": "none"});
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = [["(", "\u03BB"+var1+".", "(", var1, var1, ")", "(", "\u03BB"+var2+".", var2, var3, ")", ")"],
			  ["(", "\u03BB"+var1+".", var1, "(", "\u03BB"+var2+".", var2, var3, ")", ")"],
			  ["\u03BB"+var1+".", "(", "\u03BB"+var1+".", "(", var1, var1, ")", var2, ")"]];
	ansArr = [[6,7,8,9,10,3,4],
			  [3,4,5,6,7,2],
			  [7,4,5]];
	rnd = Math.floor(Math.random());
	arr = jsav.ds.array(strArr[rnd]);
	answerArr = ansArr[rnd];
	ans = answerArr;
	lightArr = [];
	guessArr = [];
	for(i = 0; i < 9; i++)
	{
		lightArr[i] = false;
	}
	arr.click(clickHandler);
}

init_alpha_highlight = function()
{
	jsav = new JSAV("jsav", {"animationMode": "none"});
	varArr = ["a", "b", "c", "i", "j", "k", "w", "x", "y", "z"];
	rnd = Math.floor(Math.random()*10);
	var1 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*9);
	var2 = varArr.splice(rnd, 1);
	rnd = Math.floor(Math.random()*8);
	var3 = varArr.splice(rnd, 1);
	strArr = [["(", "\u03BB"+var1+".", "\u03BB"+var2+".", "(", var1, var2, ")", var2, ")"]];
	ansArr = [[2,5]];
	rnd = Math.floor(Math.random());
	arr = jsav.ds.array(strArr[rnd]);
	answerArr = ansArr[rnd];
	ans = answerArr;
	lightArr = [];
	guessArr = [];
	for(i = 0; i < 9; i++)
	{
		lightArr[i] = false;
	}
	arr.click(clickHandler);
}

validate_alpha_Answer = function()
{
	if(answerArr.length == guessArr.length)
	{
		for(i = 0; i < answerArr.length; i++)
		{
			for(j = 0; j < answerArr.length; j++)
			{
				if(answerArr[i] == guessArr[j])
				{
					answerArr.splice(i,1);
					guessArr.splice(j,1);
					i--; j--;
				}
			}
		}
		if(guessArr.length == 0)
		{
			return true;
		} else
		{
			return false;
		}
	} else
	{
		return false;
	}
}

validate_beta_Answer = function()
{
	if(answerArr.length == guessArr.length)
	{
		for(i = 0; i < answerArr.length; i++)
		{
			if(answerArr[i] == guessArr[i])
			{
				answerArr.splice(i,1);
				guessArr.splice(i,1);
				i--;
			}
		}
		if(guessArr.length == 0)
		{
			return true;
		} else
		{
			return false;
		}
	} else
	{
		return false;
	}
}

alphaChoice = function()
{
	rnd = Math.floor(Math.random()*opt.length);
	return opt.splice(rnd,1);
}

genAnswer = function()
{
	return ans;
}