//i = one past current item; i starts at 1
var fillTable = function(tree, node, table, itemTable, l, m)
{
    var iwString = node.value().split(",");
    var i = parseInt(iwString[0]);
    var w = parseInt(iwString[1]);

    //I basically just want to check if the node has a child.
    //I don't seem to be actually deleting values from the
    //data structure beneath the tree, so I check if the value
    //of the child node is defined also...
    var k = 0;
    var chCount;
    for(; k < node.children().length; k++)
    {
        chCount = node.children().length;
        fillTable(tree, node.children()[k], table, itemTable);
        if(chCount != node.children().length)
        {
            k--;
        }
    }
    /*
    if(typeof node.child(0) == "object" && node.child(0) != null &&
        node.child(0).value() != undefined)
    {
        fillTable(tree, node.child(0), table, itemTable);   
    }

    //same as above, but for the posible second child
    if(typeof node.child(1) == "object" && node.child(1) != null &&
        node.child(1).value() != undefined)
    {
        fillTable(tree, node.child(1), table, itemTable);  
    }
    */

    
    //highligh the active node to green
    node.css({"background-color": "green"});

    //if this is a base case leaf
    if(i <= 0 || w == 0)    
    {
        //do what is needed for the base cases
        jsav.umsg("this is a base case, it's value is known.");
        table[i].css(w, {"background-color": "yellow"});
        jsav.step();
        table[i].css(w, {"background-color": "white"});
    }
    else
    {
        //highlight the appropriate item in the itemTable
        for(j = 0; j < itemTable.length; j++)
        {
           itemTable[j].css(i-1, {"background-color": "yellow"});
        }
        //highlight dynamic table entry
        var hIndecies = [];
        table[i].css(w, {"background-color": "green"});
        hIndecies[hIndecies.length] = {"j":i, "k":w};
        jsav.umsg("the value for knapsack(" + i + ", " + w + ") goes into the green cell in the table");
        jsav.step();

        //hightlight dependancies & fill values
        if(itemTable[1].value(i-1) > w)
        {
            //item doesn't even fit case
            //alert("at: " + (i-1) + ", " + (w));
            table[i-1].css(w, {"background-color": "yellow"});
            hIndecies[hIndecies.length] = {"j":(i-1), "k":w};
            table[i].value(w, table[i-1].value(w));
        }
        else
        {
            //general case
            table[i-1].css(w, {"background-color": "yellow"});
            hIndecies[hIndecies.length] = {"j":(i-1), "k":w};
            table[i-1].css(w-itemTable[1].value(i-1), {"background-color": "yellow"});
            hIndecies[hIndecies.length] = {"j":(i-1), "k":w-itemTable[1].value(i-1)};
            
            //fill in value for the dynamic table
            var val1 = table[i-1].value(w);
            var val2 = table[i-1].value(w-itemTable[1].value(i-1));
            //alert("indecies: (" + (i-1) + ", " + w + ")");
            table[i].value(w, Math.max(val1, val2 + itemTable[2].value(i-1)));
        }
        jsav.umsg("the value can be found from the yellow cells")
        jsav.step();

        //pluck the tree
        trimTree(tree.root(), i, w);
        jsav.umsg("all future calls to knapsack(" + i + ", " + w + ") can now be looked up in constant time.");
        jsav.step();
        
        //unhighlight item table again
        for(j = 0; j < hIndecies.length; j++)
        {
            table[hIndecies[j].j].css(hIndecies[j].k, {"background-color": "white"});
        }
        for(j = 0; j < itemTable.length; j++)
        {
           itemTable[j].css(i-1, {"background-color": "white"});
        }
    }
    //unhighlight the current node and return
    node.css({"background-color": "white"});
    return;
    
}


var trimTree = function(node, i, w)
{
    //alert("trmming: " + i + "," + w);
    if(node.value() == "" + i + "," + w)
    {
        delNode(node);
    }
    else
    {
        var k, chCount;
        for(k = 0; k < node.children().length; k++)
        {
            chCount = node.children().length;
            trimTree(node.children()[k], i, w);
            if(chCount != node.children().length)
                k--;
        }
    }
    return;
}


var delNode = function(node)
{
    
    var k, chCount;
    for(k = 0; k < node.children().length; k++)
    {
        chCount = node.children().length;
        delNode(node.children()[k]);
        if(chCount != node.children().length)
            k--;
    }
    if(node.edgeToParent() != undefined)
        node.edgeToParent().hide();
    node.hide();
    //try to get this node removed from it's parrent    
    if(node.parent() != null && node.parent() != undefined)
    {
        //console.log(node.parent() == null);
        for(k = 0; k < node.parent().children().length; k++)
        {
            //console.log("for " + i + ": " + (node.parent() == null))
            if(node.equals(node.parent().children()[k]));
            {
                //console.log("removing node: " + node.parent().child(k).value() + 
                //            " from parent: " + node.parent().value());
                node.parent().child(k, null);
                break;
            }
        }
    }
}

