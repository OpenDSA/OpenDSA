"""
This contains the expression tree code for 
matching trees,
    matching trees will have more methods for different types of matching.
related utilities

As well as a class to store just the expression tree related info
--- derived from nx.Graph obviously, rooted directional tree
--- and details for tracing error locations
For each equation in an equation subgroup

Also, each expression tree will reveal a number of error subtrees
corresponding to the expression tree at hand.
These error subtrees will be stored in the expression tree
- so that we can use the expression tree to expand/stretch the subtree as required.

verbalizing the expression tree might be done at a higher level
--- stretching to write messages will use unknown summaries, which might be done
at the unknown summary level once everything else has been taken care of.
-- or delegated with data passed in, idk
"""