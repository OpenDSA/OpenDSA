.. _InheritanceAndPolymorphism:

.. sectionauthor:: Stephen Edwards, Cliff Shaffer, Dennis Kafura

.. index::
   single: Jeroo; Inheritance and Polymorphism
   inheritance; class hierarchy
   polymorphism; dynamic dispatch

.. module:: InheritanceAndPolymorphism
   :synopsis: Introduction to class hierarchies, method overriding, and polymorphism.

Object-Oriented Inheritance, Overriding, and Interfaces
=======================================================

   “Computer Science is not programming. Rather, programming is the medium
   for our art, just as writing is the medium for English and other majors.
   And, like all writing, it is refined by rewriting. The trick is to do
   the rewriting in your head before your fingers hit the keys.”
   -- Nick Parlante

In earlier chapters, you learned how to create subclasses and define custom
methods. In this chapter, you will explore the full power of object-oriented
inheritance: navigating class hierarchies rooted at Java's universal base class
``Object``, specializing behaviors through method overriding (``@Override``),
and leveraging runtime polymorphism and dynamic method dispatch to write
flexible, extensible software systems.



Class Hierarchy and Inheritance
-------------------------------

How are classes related to each other? In Java, and in any other
object-oriented language, classes are organized in a **class hierarchy**.
A class hierarchy is like an upside-down tree. At the very top of the
hierarchy is the most general class. In Java, the most general class is
the ``Object`` class. The classes below ``Object`` in the hierarchy are
known as its **subclasses**. Since
all of the objects we use in our programs belong to some class or other,
this is like saying that all objects are ``Object``\ s.

The figure below illustrates the concept of a class hierarchy using the
classes that we have described in this section. Notice that the ``Object``
class occurs at the top of the hierarchy. It is the most general class. It
has features that are common to all Java objects. As you move down the
hierarchy, the classes become more and more specialized. A ``Rectangle`` is
an ``Object`` but it contains attributes--``length`` and ``width``–-that are
common to all rectangles but not to other objects in the hierarchy. For
example, an ``ATM`` object does not necessarily have a length and a width.
Notice that we have added a ``square`` class to the hierarchy. A ``square``
is a special type of ``Rectangle``, namely one who’s length equals its width.

.. odsafig:: Images/ClassHierarchy.png
  :align: center

To introduce some important terminology associated with this kind of
hierarchy, we say that the ``Rectangle`` class is a subclass of
the ``Object`` class. The ``square`` class is a subclass of both ``square``
and ``Object``. Classes that occur above a given class in the hierarchy are
said to be its **superclasses**. Thus ``Rectangle`` class is superclass of
the ``square`` class.  The ``Object`` class is also a superclass of ``square``.
In general, we say that a subclass *extends* a superclass, meaning that it
adds additional elements (attributes and/or methods) to those contained in
its superclasses. We saw this in the case of the ``square`` class. It adds
the feature that its length and width are always equal.

Another important concept associated with a class hierarchy is the notion
of **class inheritance**, whereby a subclass inherits all the attributes
and methods from its superclass.  To take an example from the natural world,
think of the sort of inheritance that occurs between a horse and a mammal.
A horse is a mammal. So horses inherit the characteristic of being warm
blooded by virtue of also being mammals. (This is different from the kind
of individual inheritance whereby you inherit your mother’s blue eyes and
your father’s black hair).

To illustrate how inheritance works in programming, consider a chess program.
There are several different types of ``ChessPiece`` objects. There
are ``Pawn``\ s, and ``Knight``\ s, and ``Queen``\ s, and ``King``\ s.
The figure below illustrates the chess piece hierarchy.

.. odsafig:: Images/ChessPieceHierarchy.png
   :align: center

A pair of attributes that all chess pieces have in common is their ``row``
and ``column`` position on the chess board. Because all chess pieces have
these attributes in common, they are located at the top of the ``ChessPiece``
hierarchy and inherited by all ``ChessPiece`` subclasses. Of course,
the ``row`` and ``column`` attributes have different values in
each ``ChessPiece`` object.

One of the actions that all chess pieces have in common is that they
can ``moveTo()`` a given square on the chess board. But different types of
chess pieces have different ways of moving. For example,
a ``Bishop`` can only move along diagonals on the chess board, whereas
a ``Rook`` can only move along a ``row`` or ``column`` on the chess board.
So, clearly, we can’t describe a ``moveTo()`` method that will work for
all ``ChessPiece``\ s. This is why we put the ``moveTo()`` method in all of
the ``ChessPiece`` subclasses. The ``ChessPiece`` class also has
a ``moveTo()`` method, but note that its name is italicized in the diagram.
This indicates that it cannot be completely defined at that level.

Finally, note that in chess, the king has certain special attributes and
actions. Thus only the king can be put *in check*. This means that the king
is under attack and in danger of being captured, thereby ending the game.
Similarly, only the king has the ability to castle. This is special move
that a king can make together with one of its rooks under certain conditions.
Thus, the reason we show the ``inCheck`` attribute and ``castle()`` action
in the ``King`` class is because these are characteristics that particular
to ``King`` objects.

In this way, a class hierarchy represents a *specialization* of classes as you
move from top to bottom. The most general class, ``ChessPiece``, is at the top
of the hierarchy. Its attributes and methods are passed on to (inherited by)
its subclasses. However, in addition to the attributes and methods they
inherit from their superclasses, the subclasses define their own special
attributes and methods. Each of the subclasses, ``Pawn``, ``Bishop``
and so on, represents some kind of specialization of the superclass. In this
example, each of the subclasses have their own distinctive ways of moving.
And the ``King`` subclass has unique attributes and actions (``inCheck``
and ``castle()``).


What is Polymorphism?
---------------------

All jeroos understand the same set of messages--that is, they respond to the
same method invocations. But now that you've seen how define custom methods,
it is also possible for a subclass to *redefine* a method to do something more
or to alter its behavior. It turns out that different jeroos might respond to
the *same method call* in different ways, depending on which subclass they
belong to. We use the term *receiver* to refer to the object on which a method
is called. Each time you call a method, the receiver determines how to respond,
so the exact behavior depends on how the method is defined in the specific
subclass used to create the receiver.

**Polymorphism** means that different receivers can respond to the same method
call in different ways. Polymorphism is not just a theoretical concept; it's a
powerful tool for writing clean, flexible, and maintainable code. In essence,
it allows a single interface to represent multiple underlying forms. For
example, if you have a ``Vehicle`` superclass and subclasses like ``Car``, ``Bicycle``,
and ``Truck``, a function that takes a ``Vehicle`` as an argument can work with any
of these subclasses, without needing to know their specific type at compile
time. This is incredibly useful for building extensible systems. You can add
a new subclass, like ``Motorcycle``, and your existing code that works with ``Vehicle``
objects will still function correctly without any changes. This concept of *single
interface, multiple implementations* is the core benefit of polymorphism in
practice.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/jhDUxynEQRI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Programming Practice 7
----------------------

.. extrtoolembed:: 'Programming Practice 7'
   :workout_id: 1344


.. raw:: html
   
      <footer style="border-top: 1px solid #777;"><div class="footer">
        Selected content adapted from:<br/>
        <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
        licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
        <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
        licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
      </div></footer>