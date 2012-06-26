var fillTableComplete = function(table, itemTable)
{
    for(var i = 1; i < table.length; i++)
    {
        for(var w = 1; w < table[i].size(); w++)
        {
            var itemWeight, itemValue;
            itemWeight = itemTable[1].value(i-1);
            itemValue = itemTable[2].value(i-1);
            if(itemWeight > w) //item won't fit in the knapsack
            {
                table[i].value(w, table[i-1].value(w));
            }
            else
            {
                table[i].value(w, Math.max(table[i-1].value(w), 
                                           table[i-1].value(w-itemWeight) + itemValue));
            }
        }
    }
}

var findSolSet = function(sol, table, items)
{
    var i = table.length -1;
    var w = table[i].size() -1;
    var newW;
    var solPos = 0;
    var taken = false;
    while(i > 0)
    {
        taken = false;

        //highlight current position
        table[i].css(w, {"background-color": "green"});
        jsav.umsg("looking at item " + i + " with " + w + " knapsack capacity units left");
        jsav.step();

        //hightlight the options
        var itemWeight, itemValue; 
        itemWeight = items[1].value(i-1);
        itemValue = items[2].value(i-1);
        if(w < itemWeight)
        {        
            //had no choice, item won't fit
            table[i-1].css(w, {"background-color": "yellow"});
            items[0].css(i-1, {"background-color": "yellow"});
            items[1].css(i-1, {"background-color": "red"});
            items[2].css(i-1, {"background-color": "yellow"});
            jsav.umsg("item " + i + " has weight " + itemWeight + ", so it can't fit");
            jsav.step();
            //unhighlight items
            for(j = 0; j < items.length; j++)
            {
                items[j].css(i-1, {"background-color": "white"});
            }
            table[i-1].css(w, {"background-color": "white"});
        }
        else
        {
            table[i-1].css(w, {"background-color": "yellow"});//dont take
            jsav.umsg("if item " + i + " is not taken, the best value possible with the remaining items is " +
                table[i-1].value(w));
            jsav.step();
            table[i-1].css(w-itemWeight, {"background-color": "yellow"});//take
            for(j = 0; j < items.length; j++)
            {
                items[j].css(i-1, {"background-color":"yellow"});//highlight item in item array
            }
            jsav.umsg("if item " + i + " is taken, the best value possible is " + (itemValue + table[i-1].value(w-itemWeight)));
            jsav.step();
            
            for(j = 0; j < items.length; j++)
            {
                items[j].css(i-1, {"background-color":"white"});//unhighlight item
            }
            var valTake, valLeave;
            valLeave = table[i-1].value(w);
            valTake  = table[i-1].value(w-itemWeight) + itemValue;
            
            if(valLeave >= valTake) //leave the item
            {
                taken = false;
                table[i-1].css(w, {"background-color": "#2233FF"});//dont take
                table[i-1].css(w-itemWeight, {"background-color": "white"});
                if(valTake == valLeave)
                    jsav.umsg("there is no difference if the item is taken or not. leave it.");
                else
                    jsav.umsg("this item should be left behind.")
                jsav.step();
            }
            else //take the item
            {
                taken = true;
                newW = w-itemWeight;
                table[i-1].css(w, {"background-color": "white"});//dont take
                table[i-1].css(w-itemWeight, {"background-color": "#2233FF"});
                jsav.umsg("item " + i +" should be taken");
                jsav.step();
            }
            
        }

        //put item in sack
        if(taken)
        {
            table[i].css(w, {"background-color": "#00FF00"});
            sol.value(solPos++, i);
            jsav.umsg("put item " + i + " into the knapsack");
        }
        else
        {
            table[i].css(w, {"background-color": "red"});
            jsav.umsg("the item is left behind");
        }
        jsav.step();

        w = newW;
        i--;
    }
}
