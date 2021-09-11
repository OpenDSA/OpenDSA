.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Week 4
======


This week, we'll be going back over some topics we've seen before.


The NamedJeroo Class (Adapted from Think Java's Time Class)
-----------------------------------------------------------

One common reason to define a new class is to encapsulate related data in
an object that can be treated as a single unit. That way, we can use objects
as parameters and return values, rather than passing and returning multiple
values. This design principle is called **data encapsulation**.

For example in this module we will implement a ``TrackingJeroo`` class which
represents a jeroo that keeps track of the number of flowers it has picked,
the number of nets it has disabled, and the number of times it has hopped.
Because every ``TrackingJeroo`` object contains these data, we define
attributes to hold them.


Instance Variables
~~~~~~~~~~~~~~~~~~

Attributes are also called **instance variables**, because each instance has its
own variables.

Instance variables are declared at the beginning of the class definition, outside
of any method. By itself, this code fragment is a legal class definition:

.. code-block:: java

    public class TrackingJeroo {
        private int numFlowersPicked;
        private int numNetsDisabled;
        private int numHops;
    }

The TrackingJeroo class is ``public``, which means that it can be used in other
classes. But the instance variables are ``private``, which means they can only
be accessed from inside the ``TrackingJeroo`` class. If you try to read or write
them from another class, you will get a compiler error.

Private instance variables help keep classes isolated from each other so that
changes in one class won’t require changes in other classes. It also simplifies
what other programmers need to understand in order to use your classes. This
kind of isolation is called **information hiding**.

Constructors
~~~~~~~~~~~~

After declaring the instance variables, the next step is to define a **constructor**,
which is a special method that initializes the instance variables.

Here is an example constructor for the TrackingJeroo class:

.. code-block:: java

    public TrackingJeroo(){
        this.numFlowersPicked = 0;
        this.numNetsDisabled = 0;
        this.numHops = 0;
    }

This constructor does not take any arguments. Each line initializes an instance
variable to zero.

The name this is a keyword that refers to the object we are creating. You can
use this the same way you use the name of any other object. For example,
you can read and write the instance variables of this, and you can pass this
as an argument to other methods. But you do not declare this, and you can’t
make an assignment to it.

To create a ``TrackingJeroo`` object, just like a ``Jeroo`` class you must use the
``new`` keyword:


.. code-block:: java

    TrackingJeroo tom = new TrackingJeroo();

When you invoke new, Java creates the object and calls your constructor to
initialize the instance variables. When the constructor is done, new returns a
reference to the new object. In this example, the reference gets assigned to
the variable ``tom``.

Beginners sometimes make the mistake of invoking new inside the constructor.
You don’t have to, and you shouldn’t. In this example, invoking new
TrackingJeroo() in the constructor causes an error:


.. code-block:: java

    public TrackingJeroo() {
        new TrackingJeroo(); // wrong!
        this.numFlowersPicked = 0;
        this.numNetsDisabled = 0;
        this.numHops = 0;
    }

Like other methods, constructors can be overloaded, which means you can
write multiple constructors with different parameters. Java knows which
constructor to invoke by matching the arguments you provide with the
parameters of the constructors.

Sometimes it may be helpful to write a constructor that takes in no parameters
like the one above, and another that like this:

.. code-block:: java

    public TrackingJeroo(int flowers, int nets, int hops) {
        this.numFlowersPicked = flowers;
        this.numNetsDisabled = nets;
        this.numHops = hops;
    }

All this constructor does is copy values from the parameters to the instance
variables.  If we

To invoke this constructor, you have to provide arguments after the
``new`` operator.
This example creates a ``TrackingJeroo`` that has already hopped 7 times and
picked 3 flowers.

.. code-block:: java

    Time time = new Time(3, 0, 7);

Creating multiple constructors provides the flexibility to create an object
first and then fill in the attributes, or collect all the information
before creating the object itself.

Once you get the hang of it, writing constructors gets boring. You can write
them quickly just by looking at the list of instance variables.

Pulling it all together, here is the complete class definition so far:


.. code-block:: java

    public class TrackingJeroo {
        private int numFlowersPicked;
        private int numNetsDisabled;
        public int numHops;

        public TrackingJeroo(){
            this.numFlowersPicked = 0;
            this.numNetsDisabled = 0;
            this.numHops = 0;
        }

        public TrackingJeroo(int flowers, int nets, int hops) {
            this.numFlowersPicked = flowers;
            this.numNetsDisabled = nets;
            this.numHops = hops;
        }
    }


Methods
-------

A **method**, which corresponds to an action or a behavior, is a named chunk of
code that can be called upon or *invoked* to perform a certain pre-defined set
of actions.

A method definition consists of two parts: the method header and the method
body.  In general, a method header takes the following form, including some
parts which are optional:

*Modifiers*:sub:`optional` *ReturnType*  *MethodName* ( *ParameterList*:sub:`optional`)

Put together, a method definition may look like this:

.. code-block:: java

   public int addHops()

Above, this method starts with the access modifier, ``public``, to declare
that this method can be accessed or referred to by other classes. The next part
of the method header is the method’s return type. This is the type of value, if
any, that the method returns. In the code above, we specify that we are
expecting to return an ``int``.  When we've been writing methods so far, we've
written methods like this:

.. code-block:: java

   public void pickFlowersAndDisableNets()

Instead of an int here we see the keyword ``void`` which specifies we aren't
going to return anything.  We'll get more into return types later.  The method’s
name follows the method’s return type. This is the name that is used when the
method is called. We could call the method anything we wanted, but spaces cannot
be included.  Following the method’s name is the method’s **parameter list**
which we'll talk about in the next section.

Passing Information using Parameters (from ThinkJava)
-----------------------------------------------------

Some of the methods we have used require arguments, which are the values you
provide when you invoke the method.  For example, a ``Jeroo`` has two methods
with the name 'hop'.  Calling ``hop()`` will cause the jeroo to hop one space
ahead.  However if you specify a number inside the parentheses like this:
``hop(4)``, the jeroo will hop four spaces ahead.

When you use a method, you provide the arguments. When you *write* a method, you
name the parameters. The parameter list indicates what arguments are required.

For example:

.. code-block:: java

    public void turnAndDisable(RelativeDirection direction) {

      this.turn(direction);
      this.toss();

    }

To invoke this method, we have to provide a relative direction as an argument:

.. code-block:: java

    RelativeDirection dir = RIGHT;
    turnAndDisable(dir);

which would cause the jeroo to turn right, and disable a net.


Using Multiple Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~

Here is an example of a method that takes two parameters:

.. code-block:: java

    public void turnThenHop(RelativeDirection direction, int hops) {
        this.turn(direction);
        this.hop(numHops);
    }

To invoke this method, we have to provide an integer and a relative direction
as arguments:

.. code-block:: java

    int number = 7;
    RelativeDirection dir = RIGHT;
    turnThenHop(number, dir);

which would cause the jeroo to turn right, then hop seven times.


Conditionals Continued
----------------------

Sometimes you want to check related conditions and choose one of several
actions. One way to do this is our cascaded if structure:

.. code-block:: java

    if(molly.isFacing(NORTH))
    {
      molly.hop();
    }
    else if (molly.isFacing(SOUTH))
    {
      molly.hop(2);
    }
    else if (molly.isFacing(EAST))
    {
      molly.hop(3);
    }
    else
    {
      molly.hop();
      molly.toss();
    }

These chains can be as long as you want, although they can be difficult to
read if they get out of hand.

You can also make complex decisions by nesting one conditional statement inside
another. We could have written the previous example as:


.. code-block:: java

    if(molly.isFacing(WEST))
    {
      molly.hop();
      molly.toss();
    }
    else{
      if (molly.isFacing(NORTH)){
        molly.hop();
      }
      else if (molly.isFacing(SOUTH))
      {
        molly.hop(2);
      }
      else{
        molly.hop(3);
      }
    }

The outer conditional has two branches. The first branch tells the jeroo to hop
once and toss, and the second branch contains another conditional statement,
which has three branches of its own.

These kinds of structures are common, but they get difficult to read
very quickly. Good indentation is essential to make the structure (or intended
structure) apparent to the reader.


A Different Type of Complex If-Statement
----------------------------------------

Another way if statements can get more complex is by creating longer compound
conditionals.

For example,

.. code-block:: java

    if((molly.isFacing(NORTH) && molly.hasFlower()) || molly.seesNet(AHEAD))

This statement could be generalized to ``if(A || B)`` where:

* ``A = molly.isFacing(NORTH) && molly.hasFlower()``
* ``B = molly.seesNet(AHEAD)``

If the jeroo has a flower while facing north OR sees a net ahead of it, this if
statement will trigger.  Notably, if the jeroo only has a flower the logical AND
 will force the statement ``molly.isFacing(NORTH) && molly.hasFlower()``
 to be false.  Thus, the jeroo would have to see a net ahead for this if
 statement to trigger.

 Logical NOT can also negate a compound statement.

 .. code-block:: java

     if(!(molly.isFacing(NORTH) && molly.hasFlower()))

Remember, for ``molly.isFacing(NORTH) && molly.hasFlower()`` to be true, the
jeroo must have a flower and be facing North.  Writing
``!(molly.isFacing(NORTH) && molly.hasFlower())`` will be true as long as the
compound condition within the parentheses is false.

When looking at these sort of complex operations, it is easy to get mixed up.
When considering negated compound conditions re-writing them  according
**De Morgan’s laws** may be helpful to you:

* ``!(A && B)`` is the same as ``!A || !B``
* ``!(A || B)`` is the same as ``!A && !B``

Using this, instead of writing

.. code-block:: java

    if(!(molly.isFacing(NORTH) && molly.hasFlower()))

It is be logically equivalent to write:

.. code-block:: java

    if(!molly.isFacing(NORTH) || !molly.hasFlower())





Syntax Review
-------------



Syntax Practice
---------------

Codeworkout exercises



changePointeeDataDirect
-----------------------

Molly is practicing adding a CW style question (still in progress)

.. extrtoolembed:: 'changePointeeDataDirect'



Programming Practice
--------------------

Codeworkout exercises
---------------------

Reading Quiz 1
---------------------

Practicing making a multiple choice question to mimic a Khan Academy question

.. avembed:: Exercises/IntroToSoftwareDesign/Question1.html ka
