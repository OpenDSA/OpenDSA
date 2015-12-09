.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :requires: ADT
   :satisfies: design patterns
   :topic: Design Patterns

Design Patterns
===============

Design Patterns
---------------

At a higher level of abstraction than ADTs
are abstractions for describing the design of programs |---| that is,
the interactions of objects and classes.
Experienced software designers learn and reuse patterns
for combining software components.
These have come to be referred to as
:term:`design patterns <design pattern>`.

A design pattern embodies and generalizes important design concepts
for a recurring problem.
A primary goal of design patterns is to quickly transfer the knowledge
gained by expert designers to newer programmers.
Another goal is to allow for efficient communication between
programmers.
It is much easier to discuss a design issue when you share a
technical vocabulary relevant to the topic.

Specific design patterns emerge from the realization that a particular
design problem appears repeatedly in many contexts.
They are meant to solve real problems.
Design patterns describe the structure for a design solution, with the
details filled in for any given problem.
Design patterns are a bit like data structures:
Each one provides costs and benefits, which implies that tradeoffs are
possible.
Therefore, a given design pattern might have variations on its
application to match the various tradeoffs inherent in a given
situation.

The rest of this module introduces a few simple design patterns that
occur frequently in a study of data structures and algorithms.

Flyweight
~~~~~~~~~

The :term:`Flyweight` is meant to solve the following problem:
You have an application with many objects.
Some of these objects are identical in the information that
they contain, and the role that they play.
But they must be reached from various places, and conceptually they
really are distinct objects.
Because there is so much duplication of the same information,
we would like to take advantage of the opportunity to reduce memory
cost by sharing that space. 
An example comes from representing the layout for a document.
The letter "C" might reasonably be represented by an object that
describes that character's strokes and bounding box.
However, we do not want to create a separate "C" object everywhere
in the document that a "C" appears.
The solution is to allocate a single copy of the shared representation
for "C" objects.
Then, every place in the document that needs a "C" in a given font,
size, and typeface will reference this single copy.
The various instances of references to a specific form of "C" are
called flyweights.

We could describe the layout of text on a page by using a
tree structure.
The root of the tree represents the entire page.
The page has multiple child nodes, one for each column.
The column nodes have child nodes for each row.
And the rows have child nodes for each character.
These representations for characters are the flyweights.
The flyweight includes the reference to the shared shape information,
and might contain additional information specific to that instance.
For example, each instance for "C" will contain a reference to the
shared information about strokes and shapes, and it might also contain
the exact location for that instance of the character on the page.

Flyweights are used in the implementation for the
:ref:`PR quadtree <PR quadtree> <Spatial>` and the
:ref:`bintree <bintree> <Spatial>`
for storing collections of point objects.
In a PR quadtree, many of the :term:`leaf nodes <leaf node>` represent
empty areas, and the only information that they store is the fact that
they are empty.
These identical nodes can be implemented using a reference to a single
instance of the flyweight to reduce memory costs.

Visitor
~~~~~~~

Given a tree of objects to describe a page layout,
we might wish to perform some activity on every node in the tree.
A :ref:`tree traversal <traversal> <BinaryTreeTraversal>`
is the process of visiting every node in the tree in a defined
order.
A simple example for our text composition application might be to
count the number of nodes in the tree that represents the page.
At another time, we might wish to print a listing of all the nodes for
debugging purposes.

We could write a separate traversal function for each such activity
that we intend to perform on the tree.
A better approach would be to write a generic traversal function,
and pass in the activity to be performed at each node.
This organization constitutes the :term:`visitor` design pattern.
The visitor design pattern can also be used in
:ref:`Graph Traversal <traversal> <GraphTraversal>`.


Composite
~~~~~~~~~

There are two fundamental approaches to dealing with the relationship
between a collection of actions and a hierarchy of object types.
First consider the typical :term:`procedural` approach.
Say we have a base class for page layout entities, with a subclass
hierarchy to define specific subtypes (page, columns, rows, figures,
characters, etc.).
And say there are actions to be performed on a collection of such
objects (such as rendering the objects to the screen).
The procedural design approach is for each action to be implemented
as a method that takes as a parameter a pointer to the base class
type.
Each such action method will traverse through the collection of
objects, visiting each object in turn.
Each action method contains something like a switch statement that
defines the details of the action for each subclass in the collection
(e.g., page, column, row, character).
We can cut the code down some by using the
:term:`visitor` design pattern
so that we only need to write the traversal once, and then write a
visitor subroutine for each action that might be applied to the
collection of objects.
But each such visitor subroutine must still contain logic for dealing
with each of the possible subclasses.

In our page composition application, there are only a few activities
that we would like to perform on the page representation.
We might render the objects in full detail.
Or we might want a "rough draft" rendering that prints only the
bounding boxes of the objects.
If we come up with a new activity to apply to the collection of
objects, we do not need to change any of the code that implements the
existing activities.
But adding new activities won't happen often for this application.
In contrast, there could be many object types, and we might frequently
add new object types to our implementation.
Unfortunately, adding a new object type requires that we modify each
activity, and the subroutines implementing the activities get rather
long switch statements to distinguish the behavior of the many
subclasses.

An alternative design is to have each object subclass in the hierarchy
embody the action for each of the various activities that might be
performed.
Each subclass will have code to perform each activity
(such as full rendering or bounding box rendering).
Then, if we wish to apply the activity to the collection, we simply
call the first object in the collection and specify the action
(as a method call on that object).
In the case of our page layout and its hierarchical collection of
objects, those objects that contain other objects (such as a row
objects that contains letters) will call the appropriate method for
each child.
If we want to add a new activity with this organization, we have to
change the code for every subclass.
But this is relatively rare for our text compositing application.
In contrast, adding a new object into the subclass hierarchy (which
for this application is far more likely than adding a new rendering
function) is easy.
Adding a new subclass does not require changing any of the existing
subclasses.
It merely requires that we define the behavior of each activity that
can be performed on the new subclass.

This second design approach of burying the functional activity in the
subclasses is called the :term:`Composite design pattern`.
A detailed example for using the Composite design pattern
can be seen in a discussion of the
:ref:`Expression Tree <Expression Tree> <Composite>`.


Strategy
~~~~~~~~

Our final example of a design pattern lets us encapsulate and make
interchangeable a set of alternative actions that
might be performed as part of some larger activity.
Again continuing our text compositing example, each output device that
we wish to render to will require its own function for doing the
actual rendering.
That is, the objects will be broken down into constituent pixels or
strokes, but the actual mechanics of rendering a pixel or stroke will
depend on the output device.
We don't want to build this rendering functionality into the object
subclasses.
Instead, we want to pass to the subroutine performing the rendering
action a method or class that does the appropriate rendering details
for that output device.
That is, we wish to hand to the object the appropriate ":term:`strategy`"
for accomplishing the details of the rendering task.
Thus, this approach is called the :term:`strategy` design pattern.

The Strategy design pattern can be used to create generalized sorting
functions.
The sorting function can be called with an additional parameter.
This parameter is a class
that understands how to extract and compare the key values for
records to be sorted.
In this way, the sorting function does not need to know any details
of how its record type is implemented.

One of the biggest challenges to understanding design patterns is that
sometimes one is only subtly different from another.
For example, you might be confused about the difference between the
composite pattern and the visitor pattern.
The distinction is that the composite design pattern is about whether
to give control of the traversal process to the nodes of the tree or to
the tree itself.
Both approaches can make use of the visitor design pattern to avoid
rewriting the traversal function many times, by 
encapsulating the activity performed at each node.

But isn't the strategy design pattern doing the same thing?
The difference between the visitor pattern and the strategy pattern is
more subtle.
Here the difference is primarily one of intent and focus.
In both the strategy design pattern and the visitor design pattern, an
activity is being passed in as a parameter.
The strategy design pattern is focused on encapsulating an activity
that is part of a larger process, so that different ways of
performing that activity can be substituted.
The visitor design pattern is focused on encapsulating an activity that
will be performed on all members of a collection so that completely
different activities can be substituted within a generic method that
accesses all of the collection members.


Summary Questions
~~~~~~~~~~~~~~~~~

.. avembed:: Exercises/Design/DesignPatternSumm.html ka
