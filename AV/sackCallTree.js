var buildTree = function(tree, i, w, animate)
{
    
    tree.root("" + (i+1) + "," + w);
    if(animate != false)
    {
        tree.layout();
        jsav.step();
    }
    buildNode(tree.root(), i, w, animate);
    return;
}

var buildNode = function(node, i, w, animate)
{
    if(i < 0 || w == 0)
    {
        return;
    }
    if(itemArray[1].value(i) > w)
    {
        node.addChild("" + i + "," + w);
        if(animate != false)
        {
            callTree.layout();
            jsav.step();
        }
        buildNode(node.child(0), i-1, w, animate);
    }
    else
    {
        node.addChild("" + i + "," + w);
        node.addChild("" + i + "," + (w - itemArray[1].value(i)));
        if(animate != false)
        {
            callTree.layout();
            jsav.step();
        }
        buildNode(node.child(0), i-1, w, animate);
        buildNode(node.child(1), i-1, (w - itemArray[1].value(i)), animate);
    }
    return;
}
