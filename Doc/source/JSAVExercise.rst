.. _JSAVExercise:

Using OpenDSA to Create JSAV-based Proficiency Exercises
========================================================

Place-holder for best practices and advice on writing JSAV-based
proficiency exercises.

There is a tutorial for how to create a proficiency exercise at
http://jsav.io/exercises/tutorial-exercise/.

Comparisons for gradeable steps
-------------------------------

Often, correctness for a gradeable step is based on matching the
current values within some data structure at each step.
For example, you might want to compare the contents of an array at
each step (in other words, what you check is that the user has put the
right values into the array at each step).

Sometimes, what you want to compare is some other aspect of an element
in the data structure.
For example, perhaps what the student should be doing is clicking on
certain array elements in order to highlight the correct ones.
In this case, you are concerned with some property other than the
value of the element.
In such cases, the best approach is to add a class to the element
through the click handler, as opposed to setting some physical
property such as the background-color.
Then, the gradeable step should be comparing that the classes on the
elements in the user's copy of the data structure  matches the classes
on the elements in the model copy of the data structure.
