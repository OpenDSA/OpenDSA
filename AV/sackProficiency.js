//init for the exercise
var init = function()
{
    //try to clean everything
    if(dynTable !== undefined)
    {
        for(i = 0; i < dynTable.length; i++)
        {
            dynTable[i].hide();
            dynTable[i].clear();
        }
    }
    if(itemTable !== undefined)
    {
        for(i = 0; i < itemTable.length; i++)
        {
            itemTable[i].hide();
            itemTable[i].clear();
        }
    }
    if(valueList !== undefined)
    {
        valueList.hide();
        valueList.clear();
    }
    if(tableSel !== undefined)
    {
        tableSel.value(null);
    }
    if(listSel !== undefined)
    {
        listSel.value(null);
    }
    if(itemLabel !== undefined)
    {
        itemLabel.hide();// = jsav.label("item");
        weightLabel.hide();// = jsav.label("weight");
        valueLabel.hide();// = jsav.label("value");
        choiceLabel.hide();
    }
    dynTable = [];
    itemTable = [];
    startDynTable = [];
    startValueList = [];
    curValue = 0;
    weight = [];
    number = [];
    value = [];
    numItems = Math.floor(Math.random()*3) + 3;
    tableSel = jsav.variable(null);
    listSel = jsav.variable(null);
    //generate items
    for(i = 0; i < numItems; i++)
    {
        weight[i] = Math.floor(Math.random()*5)+1;
        number[i] = i+1;
        value[i] = Math.floor(Math.random()*5)+1;
    }
    itemTable[0] = jsav.ds.array(number, {centered:false, left:50, top:0});
    itemTable[1] = jsav.ds.array(weight, {centered:false, left:50, top:40});
    itemTable[2] = jsav.ds.array(value, {centered:false, left:50, top:80});
    itemLabel = jsav.label("item", {left:(60 + 40 * itemTable[0].size()), top:10});
    weightLabel = jsav.label("weight", {left:(60 + 40 * itemTable[0].size()), top:50});
    valueLabel = jsav.label("value", {left:(60 + 40 * itemTable[0].size()), top:90});
    
    //initalize dynTable
    capacity = Math.floor(Math.random()*6) + 3; //from 5 to 10;
    var row = [];
    for(i = 0; i <= numItems; i++)
    {
        row = [];
        if(i == 0)
        {
            for(j = 0; j <= capacity; j++)
            {
                row[j] = 0; 
            }
        }
        else
        {
            for(j = 0; j <= capacity; j++)
            {
                if(j == 0)
                    row[j] = 0;
                else
                    row[j] = "";
            }
        }
        dynTable[i] = jsav.ds.array(row);
        dynTable[i].click(clickDynTable);
    }
    fillTableComplete(dynTable, itemTable);
    clearCells(dynTable, itemTable, numItems, capacity);

    //store the starting table for later use by model answer
    startDynTable = [];
    for(i = 0; i < dynTable.length; i++)
    {
        var row;
        row = [];
        for(j = 0; j < dynTable[i].size(); j++)
        {
            row[j] = dynTable[i].value(j);
        }
        startDynTable[i] =row;
    }

    valueList = jsav.ds.array(startValueList, {top: (-50)});
    console.log(parseInt(valueList.css("left")));
    choiceLabel = jsav.label("choices", {top:-40, left:(parseInt(valueList.css("left")) - 60)});
    valueList.click(clickValueList);
    
    return dynTable;
}

//lets model the answer for the students
var modelAnswer = function(jsav)
{
    //build the structures needed the visualization
    var dynTable = []; //the dynamic table
    for(i = 0; i < startDynTable.length; i++)
    {
        dynTable[i] = jsav.ds.array(startDynTable[i]);
    }
    var itemTable = []; //the item table
    itemTable[0] = jsav.ds.array(number, {centered: false, top: 20, left:20});
    itemTable[1] = jsav.ds.array(weight, {centered: false, top: 60, left:20});
    itemTable[2] = jsav.ds.array(value,  {centered: false, top: 100,left:20});
    var valueList = jsav.ds.array(startValueList, {top: -50});//the value choice list

    //all the datastructures are setup, now it's time to solve this
    solveTable(jsav, dynTable, itemTable, valueList, numItems, capacity);
    return dynTable;//return the array of tables
}

//recurcive helper to model the answer for the modeAnswer function
var solveTable = function(jsav, dynTable, itemTable, valueList, n, w)
{
    var val, i;
    var highlight;
    if(n === 0 || w === 0 || dynTable[n].value(w) !== "-")
    {
        return;
    }
    else if(w < itemTable[1].value(n-1))
    {
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w);
        val = dynTable[n-1].value(w);
    }
    else
    {
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w-itemTable[1].value(n-1))
        solveTable(jsav, dynTable, itemTable, valueList, n-1, w);
        val = Math.max(dynTable[n-1].value(w),
                     dynTable[n-1].value(w-itemTable[1].value(n-1)) +
                                        itemTable[2].value(n-1));
    }
    //highlight the array element
    for(i = 0; i < valueList.size(); i++)
    {
        if(valueList.value(i) == val)
        {
            valueList.css(i, {"background-color": "yellow"});              
            highlight = i;
            i = 1000;
        }
    }
    jsav.step();  
    
    //remove the element from the table
    //delShiftLeft(valueList, highlight);
    valueList.value(highlight, "-");

    dynTable[n].value(w, val);
    valueList.css(highlight, {"background-color": "white"}); //unhighlight
    //console.log("highlight: " + highlight);
    jsav.stepOption("grade", true);
    jsav.step();
}

//give parameters for a call to knapsack, and blank out
//cells that the call would use.
var clearCells = function(dynTable, itemTable, n, w)
{
    if(n > 0 && w > 0 && dynTable[n].value(w) != "-")
    {
        startValueList[curValue++] = dynTable[n].value(w);
        dynTable[n].value(w, "-");//clear the value
        if(itemTable[1].value(n-1) > w)
        {
            //console.log("call: (" + (n-1) + ", " + w + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w);
        }
        else
        {
            //console.log("call: (" + (n-1) + ", " + (w-itemTable[1].value(n-1)) + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w-itemTable[1].value(n-1));
            //console.log("call: (" + (n-1) + ", " + w + ")"); //DEBUG
            clearCells(dynTable, itemTable, n-1, w);
        }
    }
}

//removes a value from a jsav array and shifts later elements left
//is too ineffecent to use...
var delShiftLeft = function(list, index)
{
    //strange things happen if index is a string...
    if(typeof index == "string")
    {
        index = parseInt(index);
    }
    for(; index < list.size(); index++)
    {
        if(index === list.size()-1)
        {
            console.log("setting " + index + " to \" \"");
            list.value(index, " ");
        }
        else
        {
            console.log("setting " + index + " to " + (index+1));
            list.value(index, list.value(index+1));
        }
    }
}

var clickDynTable = function(index)
{
    //highlight and set case
    console.log("clickDynTable typeof index: " + (typeof index));
    if(listSel.value() != -1 && this.value(index) === "-")
    {
        this.value(index, valueList.value(listSel.value()));
        console.log("valList type: " + typeof listSel.value())
        valueList.css(parseInt(listSel.value()), {"background-color":"white"});        
        //delShiftLeft(valueList, listSel.value());
        valueList.value(listSel.value(), "-");
        listSel.value(-1);
        exercise.gradeableStep();
    }
}

var clickValueList = function(index)
{
    console.log("clickValueList typeof index: " + (typeof index));
    if(this.value(index) !== "-")
    {
        console.log("not empty");
        if(listSel.value() === -1 || listSel.value() === undefined)
        {
            listSel.value(index)
            valueList.css(index, {"background-color":"yellow"});
        }
        else
        {
            console.log("unhighlight valList: " + listSel.value());
            valueList.css(undefined, {"background-color":"white"});
            listSel.value(index);
            valueList.css(index, {"background-color":"yellow"});
        }
    }
}
