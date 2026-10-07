.. avmetadata::
   :title: Object-Oriented Inheritance, Overriding, and Interfaces
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: Inheritance; Polymorphism; Class Hierarchy; Overriding; Interfaces; Dynamic Dispatch; Abstract Classes; AssertJ
   :naturallanguage: en
   :programminglanguage: Java
   :description: Object-oriented inheritance hierarchies, method overriding with @Override, dynamic method dispatch, polymorphism, and Java interfaces.


Object-Oriented Inheritance, Overriding, and Interfaces
=======================================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~89 minutes (~59 min reading + ~30 min video at 100 WPM)

   * **Distinguish** between IS-A inheritance hierarchies and HAS-A composition relationships.
   * **Override** inherited methods using the ``@Override`` annotation to specialize object behavior.
   * **Trace** dynamic method dispatch across multi-tier class hierarchies.
   * **Define** Java interfaces and **implement** them in concrete classes to enforce behavioral contracts.


In earlier chapters, you learned how to create subclasses and define custom
methods, as well as how objects can collaborate through delegation. In this chapter,
you will explore the full power of object-oriented programming: navigating class
hierarchies rooted at Java's universal base class ``Object``, specializing behaviors
through method overriding (``@Override``), leveraging runtime polymorphism and dynamic
method dispatch, and designing flexible behavioral contracts using Java ``interface``\ s.


Inheritance Hierarchies & The Object Base Class
-----------------------------------------------

How are classes related to each other? In Java, and in any other
object-oriented language, classes are organized in a **class hierarchy**.
A class hierarchy is structured like an inverted tree. At the very top of the
hierarchy sits the most general class. In Java, this universal root is the
``Object`` class (defined in the ``java.lang`` package). Every single class
in Java—whether provided by the standard library or authored by you—is
ultimately a subclass of ``Object``. Classes positioned below another class in the
hierarchy are known as its **subclasses**, while classes above it are its
**superclasses**. Because every class descends from ``Object``, every object in
Java inherits a baseline set of behaviors, such as the ability to produce a
textual description via ``toString()``.

The figure below illustrates a class hierarchy using geometric shapes and utility
objects. Notice that the ``Object`` class occupies the root. It contains features
common to all Java objects. As you descend the hierarchy, classes become progressively
more specialized. A ``Rectangle`` is an ``Object``, but it introduces attributes—such
as ``length`` and ``width``—that are shared by all rectangles but not by unrelated
objects like an ``ATM``. Furthermore, a ``Square`` is a specialized kind of
``Rectangle`` whose length and width are constrained to be equal.

.. odsafig:: Images/ClassHierarchy.png
   :align: center

In Java syntax, a class declares that it inherits from another class using the
``extends`` keyword:

.. code-block:: java

   public class Rectangle
   {
       private double length;
       private double width;

       public Rectangle(double length, double width)
       {
           this.length = length;
           this.width = width;
       }

       public double getArea()
       {
           return length * width;
       }
   }

   public class Square extends Rectangle
   {
       public Square(double side)
       {
           super(side, side);
       }
   }

In this definition, ``Square extends Rectangle`` establishes that ``Square`` is a
subclass of ``Rectangle``, and ``Rectangle`` is the superclass of ``Square``. Because
``Rectangle`` does not explicitly name another superclass, the Java compiler
automatically supplies ``extends Object`` behind the scenes. Thus, ``Square`` is a
subclass of both ``Rectangle`` and ``Object``.

Subclasses inherit accessible instance variables and methods from their superclasses.
To conceptualize this, consider biological classification: a horse is a mammal.
Horses inherit the property of being warm-blooded by virtue of being mammals.
Similarly, in software design, a subclass inherits elements from its superclass
without needing to rewrite or duplicate that code.

To see how inheritance models domain entities, consider a chess application.
The game includes several distinct types of pieces: pawns, knights, bishops,
rooks, queens, and kings.

.. odsafig:: Images/ChessPieceHierarchy.png
   :align: center

Every chess piece shares common state: its current ``row`` and ``column`` coordinates
on the board, as well as its player color. Because every piece requires these
attributes, they are declared in the general superclass ``ChessPiece``:

.. code-block:: java

   public class ChessPiece
   {
       protected int row;
       protected int col;
       private String color;

       public ChessPiece(int row, int col, String color)
       {
           this.row = row;
           this.col = col;
           this.color = color;
       }

       public int getRow()
       {
           return row;
       }

       public int getCol()
       {
           return col;
       }

       public String getColor()
       {
           return color;
       }
   }

Every piece must also be capable of moving across the board via a ``moveTo()``
action. However, each piece follows fundamentally different movement rules:
a ``Bishop`` moves along diagonals, a ``Rook`` moves along horizontal rows or
vertical columns, and a ``Knight`` jumps in an L-shaped path. Because a single,
uniform movement algorithm cannot describe every piece, specialized subclasses
define their own specific behaviors.

Furthermore, certain pieces have exclusive attributes and capabilities. Only a
``King`` can be placed *in check*, and only a ``King`` can perform the specialized
*castling* move in conjunction with a rook. These attributes (``inCheck``) and
methods (``castle()``) are placed specifically within the ``King`` subclass rather
than cluttering the general ``ChessPiece`` superclass.

Member Visibility and the Protected Access Modifier
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When designing inheritance hierarchies, how should instance variables and helper
methods be scoped? In Chapter 5, you learned about ``private`` (accessible only within
the declaring class) and ``public`` (accessible by any class). Java provides an
intermediate access modifier designed specifically for class hierarchies:
**protected**.

Members declared with the ``protected`` keyword are accessible to:
1. The class that defines them.
2. Any subclass that extends that class (even if the subclass resides in a different package).
3. Any class residing within the same package.

.. list-table:: Java Member Access Modifier Visibility
   :widths: 22 18 18 18 18
   :header-rows: 1

   * - Access Modifier
     - Same Class
     - Subclass
     - Same Package
     - Everywhere (World)
   * - ``public``
     - Yes
     - Yes
     - Yes
     - Yes
   * - ``protected``
     - Yes
     - Yes
     - Yes
     - No
   * - *(package-private)*
     - Yes
     - No
     - Yes
     - No
   * - ``private``
     - Yes
     - No
     - No
     - No

In the ``ChessPiece`` example above, ``row`` and ``col`` were marked ``protected``.
This permits subclasses such as ``Bishop`` or ``Knight`` to directly inspect and
update coordinate coordinates during custom moves, while preventing arbitrary outside
classes (such as a user-interface widget) from bypassing game rules.

.. tip::

   While ``protected`` allows convenient access for subclasses, relying heavily on
   ``protected`` fields can create tight coupling between parent and child classes.
   Whenever practical, keep fields ``private`` and provide ``protected`` accessor
   or mutator methods so that superclasses can maintain strict invariants.


IS-A vs. HAS-A: Inheritance vs. Composition
-------------------------------------------

As systems expand, deciding *how* classes should relate to one another is among the
most critical decisions in object-oriented architecture. Two primary mechanisms allow
classes to collaborate: **Inheritance** and **Composition**.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/ry7hWZm5oEw?start=698" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

To choose the correct design, software engineers apply the **IS-A** and **HAS-A**
relationship tests:

1. **Inheritance models an "IS-A" relationship**:
   A subclass *is a specialized version* of its superclass.
   * A ``Square`` **is a** ``Rectangle``.
   * A ``ForagingHedgehog`` **is a** ``Hedgehog``.
   * A ``Bishop`` **is a** ``ChessPiece``.
   * An ``ArmoredCombatant`` **is a** ``Combatant``.

   When an IS-A relationship holds, the subclass inherits the public interface of
   the parent and can be used interchangeably anywhere the parent is expected.

2. **Composition and Aggregation model a "HAS-A" relationship**:
   An object *holds a reference to* one or more companion objects as fields.
   * A ``Car`` **has an** ``Engine``. (A car is *not* an engine!)
   * An ``Orchard`` **has** ``Hedgehog`` actors. (An orchard is *not* a hedgehog!)
   * A ``TabletopHero`` **has an** ``Inventory``. (A hero is *not* an inventory!)
   * A ``ChessBoard`` **has** ``ChessPiece`` objects.

Understanding Composition vs. Aggregation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Within HAS-A relationships, we distinguish between two variations based on object
ownership and lifecycles:

* **Composition (Part-Whole Ownership)**:
  In composition, the container object **owns** its component parts. The component
  objects are typically instantiated directly inside the container's constructor
  using ``new``. The parts usually do not exist independently outside the container,
  and when the container object is discarded, its internal parts are destroyed with it.
  For example, a ``Car`` is composed of an ``Engine`` and four ``Wheel`` instances.

* **Aggregation (Shared Association)**:
  In aggregation, an object holds a reference to another object that has an
  independent existence. The associated object is typically passed into the container
  via a constructor parameter or setter method. For example, a ``Course`` aggregates
  ``Student`` objects: students exist before enrolling in the course, remain in
  existence if the course is dropped, and can simultaneously participate in multiple
  courses.

The Liskov Substitution Principle and Design Pitfalls
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A common beginner mistake is using inheritance simply to share or reuse code when no
genuine IS-A relationship exists. For example, imagine designing a tabletop roleplaying
game with a ``Shield`` class that encapsulates armor defense and damage blocking:

.. code-block:: java

   public class Shield
   {
       private int defenseRating;

       public Shield(int defenseRating)
       {
           this.defenseRating = Math.max(0, defenseRating);
       }

       public int block(int incomingDamage)
       {
           return Math.max(0, incomingDamage - defenseRating);
       }

       public int getDefenseRating()
       {
           return defenseRating;
       }
   }

Now, suppose you want to create a ``Knight`` class that can block incoming damage.
Because ``Shield`` already provides a working ``block()`` method, you might be tempted
to write:

.. code-block:: java

   // Flawed design: Violates IS-A relationship!
   public class Knight extends Shield
   {
       private String name;

       public Knight(String name, int defenseRating)
       {
           super(defenseRating);
           this.name = name;
       }

       // ...
   }

While this code compiles, it introduces severe architectural and conceptual flaws.
Because ``Knight extends Shield``, Java treats every ``Knight`` as an actual ``Shield``!
Any client code expecting a ``Shield``—such as ``blacksmith.polish(Shield s)`` or
``warrior.equip(Shield s)``—would legally accept a ``Knight`` object. A warrior could
literally equip a knight as a piece of armor!

The formal design rule governing valid inheritance is known as the **Liskov
Substitution Principle (LSP)**: *Subtypes must be substitutable for their base types
without altering any of the desirable properties or guarantees of the program*. If a
proposed subclass cannot legitimately substitute for the superclass in every valid
context, inheritance is inappropriate. A knight **is not a** shield; rather, a knight
**has a** shield.

Instead, favor **Composition**:

.. code-block:: java

   // Clean design: Composition with Delegation
   public class Knight
   {
       private String name;
       private Shield shield;

       public Knight(String name, Shield shield)
       {
           this.name = name;
           this.shield = shield;
       }

       public int defend(int incomingDamage)
       {
           // Delegate defense calculation to the encapsulated Shield
           return shield.block(incomingDamage);
       }

       public Shield getShield()
       {
           return shield;
       }
   }

By encapsulating ``Shield`` as a private instance variable, ``Knight`` delegates
defensive calculations to its companion shield while maintaining a clean, realistic
conceptual model.

.. list-table:: Summary: Inheritance vs. Composition
   :widths: 20 40 40
   :header-rows: 1

   * - Aspect
     - Inheritance (IS-A)
     - Composition (HAS-A)
   * - **Relationship**
     - Subclass is a specialized kind of Superclass
     - Container object contains or manages Part objects
   * - **Java Syntax**
     - ``public class B extends A``
     - ``private A part = new A();``
   * - **Coupling**
     - High (tightly coupled to parent implementation)
     - Low (loosely coupled through public interfaces)
   * - **Code Reuse**
     - Automatically inherits all superclass methods
     - Explicitly forwards tasks via delegation
   * - **Design Maxim**
     - Use only when true behavioral substitution holds
     - *"Favor object composition over class inheritance"*


Method Overriding and the @Override Annotation
----------------------------------------------

Inheritance allows a subclass to reuse existing code from its parent, but subclasses
frequently need to alter or specialize how an inherited action is performed.
When a subclass defines a method that shares the exact same signature as a method in
its superclass, the subclass method **overrides** the parent version.

When the method is called on an instance of the subclass, Java executes the
specialized implementation in the child class rather than the general version
defined in the parent.

The Four Rules of Method Overriding
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To successfully override an inherited method, Java enforces four strict rules:

1. **Exact Method Name**: The method name must match the superclass method character-for-character.
2. **Exact Parameter List**: The number, order, and data types of all parameters must match exactly.
3. **Compatible Return Type**: The return type must match the superclass return type (or be a compatible subtype, known as a *covariant return*).
4. **Access Visibility**: The access modifier cannot be more restrictive than the parent method. If a superclass method is ``public``, the overriding method in the subclass must also be ``public``. It cannot be downgraded to ``protected`` or ``private``.

Overriding vs. Method Overloading
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

It is essential to distinguish between **overriding** and **overloading**, which are
frequently confused:

.. list-table:: Overriding vs. Overloading
   :widths: 20 40 40
   :header-rows: 1

   * - Criterion
     - Method Overriding
     - Method Overloading
   * - **Scope**
     - Across parent and child classes in a hierarchy
     - Within the same class (or across hierarchy)
   * - **Method Name**
     - Must be identical
     - Must be identical
   * - **Parameter List**
     - Must match **identically**
     - Must be **different** (types, count, or order)
   * - **Resolution**
     - Decided at **runtime** (dynamic dispatch)
     - Decided at **compile time** (static binding)
   * - **Purpose**
     - Specialize inherited behavior in a subclass
     - Provide multiple ways to call an operation

The `@Override` Annotation
~~~~~~~~~~~~~~~~~~~~~~~~~~

Whenever you intend to override a method, you should always place the
``@Override`` annotation directly above the method header:

.. code-block:: java

   @Override
   public void takeDamage(int amount)
   {
       // specialized implementation
   }

While Java does not require this annotation for the program to compile, omitting it is
dangerous. The ``@Override`` annotation instructs the compiler to verify that a
matching method actually exists in an ancestor class.

If you make a subtle typo—such as misspelling a method name or slightly modifying a
parameter type—the compiler will immediately alert you:

.. code-block:: java

   public class ArmoredCombatant extends Combatant
   {
       // BUG: Misspelled method name!
       // Without @Override, the compiler silently creates a brand-new method.
       // With @Override, the compiler halts with:
       // "method does not override or implement a method from a supertype"
       @Override
       public void takeDamge(int amount)
       {
           super.takeDamage(amount / 2);
       }
   }

Without ``@Override``, Java would treat ``takeDamge`` as a completely new, separate
method. At runtime, whenever the game engine called ``takeDamage``, your armor code
would be ignored, and the default parent behavior would execute! The ``@Override``
annotation eliminates this entire category of silent bugs.

Implementing Overrides: A Combatant Hierarchy
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let's examine a concrete class hierarchy modeling game combatants. First, consider a
base ``Combatant`` class:

.. code-block:: java

   public class Combatant
   {
       private String name;
       private int health;

       public Combatant(String name, int health)
       {
           this.name = name;
           this.health = Math.max(0, health);
       }

       // Secondary constructor defaulting health to 100 using same-class chaining
       public Combatant(String name)
       {
           this(name, 100);
       }

       public String getName()
       {
           return name;
       }

       public int getHealth()
       {
           return health;
       }

       public boolean isDefeated()
       {
           return health <= 0;
       }

       public void takeDamage(int amount)
       {
           if (amount > 0)
           {
               this.health = Math.max(0, this.health - amount);
           }
       }

       @Override
       public String toString()
       {
           return name + " (Health: " + health + ")";
       }
   }

Notice that ``Combatant`` overrides ``toString()``, replacing the default
``Object@hashcode`` string with a descriptive summary of its name and health.

Now, let's create a specialized subclass, ``ArmoredCombatant``. An armored combatant
possesses an integer ``armorRating`` that mitigates incoming damage before it affects
health. It overrides ``takeDamage`` to incorporate this protection:

.. code-block:: java

   public class ArmoredCombatant extends Combatant
   {
       private int armorRating;

       public ArmoredCombatant(String name, int health, int armorRating)
       {
           super(name, health);
           this.armorRating = Math.max(0, armorRating);
       }

       // Secondary constructor defaulting health to 100 using same-class chaining
       public ArmoredCombatant(String name, int armorRating)
       {
           this(name, 100, armorRating);
       }

       public int getArmorRating()
       {
           return armorRating;
       }

       @Override
       public void takeDamage(int amount)
       {
           // Armor absorbs damage point-for-point
           int effectiveDamage = Math.max(0, amount - armorRating);

           // Forward the reduced damage to the parent logic
           super.takeDamage(effectiveDamage);
       }
   }

Notice how ``ArmoredCombatant`` calls ``super.takeDamage(effectiveDamage)``. The
``super`` keyword allows a subclass to invoke the parent class's version of an
overridden method. This preserves the parent's encapsulation and logic (such as
preventing health from dropping below zero) while adding custom specialization.

Constructor Chaining: Initializing State with super() and this()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When designing classes, constructors play a special role: **constructors are not inherited**.
A subclass cannot simply use a superclass constructor as its own because constructors
are responsible for initializing the exact fields declared in their own class.

To ensure every object is properly initialized from the top of the hierarchy downward,
Java provides two forms of **constructor chaining**:

1. **Superclass Constructor Chaining (``super(...)``)**:
   Before a subclass constructor can initialize any of its own fields, the superclass
   portion of the object must be initialized. In ``ArmoredCombatant``:

   .. code-block:: java

      public ArmoredCombatant(String name, int health, int armorRating)
      {
          super(name, health); // 1. Must be the FIRST statement
          this.armorRating = Math.max(0, armorRating); // 2. Initialize subclass fields
      }

   * The call to ``super(...)`` invokes the matching constructor in the direct superclass
     (``Combatant``).
   * **Rule**: If present, ``super(...)`` *must be the very first statement* inside the
     subclass constructor body.
   * **Default Behavior**: If you do not explicitly write ``super(...)``, the Java
     compiler automatically inserts a parameterless ``super();`` call as the first line.
     If the superclass does not have a no-argument constructor, a compile-time error occurs.

2. **Same-Class Constructor Chaining (``this(...)``)**:
   Classes frequently provide multiple overloaded constructors to offer convenient default
   parameter values. Rather than copying and pasting field assignment code across every
   constructor, a constructor can delegate to another constructor within the **same class**
   using ``this(...)``:

   .. code-block:: java

      // Primary constructor
      public Combatant(String name, int health)
      {
          this.name = name;
          this.health = Math.max(0, health);
      }

      // Secondary constructor: delegates to the primary constructor with default health
      public Combatant(String name)
      {
          this(name, 100); // Calls the 2-parameter constructor above!
      }

   * Just like ``super(...)``, a ``this(...)`` call *must be the very first statement*
     in the constructor body.
   * **Mutual Exclusivity**: A constructor can call ``this(...)`` OR ``super(...)``, but
     **never both** in the same constructor. When ``this(...)`` is called, the constructor
     delegates to a peer constructor, which will in turn invoke ``super(...)`` to initialize
     the superclass. This ensures the superclass initialization happens exactly once.

Testing Overridden Methods with AssertJ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In CS 1114, automated unit tests written in JUnit 5 and AssertJ verify that
subclasses correctly specialize parent behaviors:

.. code-block:: java

   import org.junit.jupiter.api.Test;
   import static org.assertj.core.api.Assertions.*;

   class CombatantTest
   {
       @Test
       void testStandardCombatantTakesFullDamage()
       {
           Combatant scout = new Combatant("Scout", 100);
           scout.takeDamage(30);

           assertThat(scout.getHealth()).isEqualTo(70);
           assertThat(scout.isDefeated()).isFalse();
       }

       @Test
       void testArmoredCombatantReducesDamageByArmorRating()
       {
           // Armor rating of 10 should mitigate 10 points of incoming damage
           ArmoredCombatant knight = new ArmoredCombatant("Knight", 100, 10);
           knight.takeDamage(30);

           // 30 incoming damage - 10 armor = 20 effective damage
           assertThat(knight.getHealth()).isEqualTo(80);
       }

       @Test
       void testArmorFullyAbsorbsWeakAttack()
       {
           ArmoredCombatant knight = new ArmoredCombatant("Knight", 100, 15);
           knight.takeDamage(10);

           // Attack was weaker than armor; zero damage sustained
           assertThat(knight.getHealth()).isEqualTo(100);
       }
   }


Polymorphism & Dynamic Method Dispatch
--------------------------------------

In Chapter 6, you created autonomous actors in the Orchard micro-world. Every actor
placed in the world understands the same foundational message: ``act()``. Each
simulation cycle, the Greenfoot engine asks every actor to take its turn. But how each
actor responds depends on its specific class:

* A basic ``Hedgehog`` takes a simple step forward.
* A ``ForagingHedgehog`` scans for nearby apples, harvests them, and carries them back to its burrow.
* A ``WanderingHedgehog`` checks for obstacles and wanders along tree perimeters.
* A ``GuideHedgehog`` steps forward and delegates its movement to a companion in another plot.

Even though the engine simply sends the uniform message ``actor.act()`` to every
entity, each actor responds with its own specialized behavior! We use the term
*receiver* to refer to the object on which a method is called. Each time you call a
method, the receiver determines how to respond, so the exact behavior depends on the
receiver's specific class:

.. code-block:: java

   Hedgehog h1 = new Hedgehog();
   Hedgehog h2 = new ForagingHedgehog();
   Hedgehog h3 = new WanderingHedgehog();

   // Identical method call syntax on each receiver:
   h1.act(); // executes base Hedgehog movement
   h2.act(); // executes specialized apple foraging logic!
   h3.act(); // executes obstacle-avoidance wandering!

**Polymorphism** means that different receivers can respond to the same method
call in different ways. Polymorphism is not just a theoretical concept; it's a
powerful tool for writing clean, flexible, and maintainable code. In essence,
it allows a single interface to represent multiple underlying forms. For
example, if you have a ``Combatant`` superclass and subclasses like ``ArmoredCombatant``,
a function that takes a ``Combatant`` as an argument can work with any
subclass, without needing to know their specific type at compile
time. This is incredibly useful for building extensible systems. You can add
a new subclass, like ``MountedCombatant``, and your existing code that works with ``Combatant``
objects will still function correctly without any changes. This concept of *single
interface, multiple implementations* is the core benefit of polymorphism in
practice.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/jhDUxynEQRI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

Static Type vs. Dynamic Type
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To understand how polymorphism functions behind the scenes in Java, we must separate
two distinct aspects of every reference variable:

1. **Static Type (Compile-Time Type)**: The type declared in the source code when the
   variable is introduced. The Java compiler consults the static type to verify that
   any method you attempt to call is legally available.
2. **Dynamic Type (Run-Time Type)**: The actual class of the concrete object created in
   computer memory via the ``new`` operator.

Consider this declaration:

.. code-block:: java

   Combatant soldier = new ArmoredCombatant("Paladin", 120, 15);

* The **static type** of ``soldier`` is ``Combatant``.
* The **dynamic type** of the object referenced by ``soldier`` is ``ArmoredCombatant``.

How Dynamic Method Dispatch Works
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the program executes a method invocation such as ``soldier.takeDamage(40);``,
how does the Java Virtual Machine decide which version of ``takeDamage`` to run?

1. **At Compile Time**: The compiler inspects the *static type* of ``soldier``
   (``Combatant``). It confirms that the ``Combatant`` class declares a method named
   ``takeDamage(int)``. If no such method exists in ``Combatant``, compilation fails.
2. **At Run Time**: When execution reaches this statement, the JVM ignores the static
   type of the variable. Instead, it examines the *dynamic type* of the actual receiver
   object stored in heap memory.
3. The JVM locates the method implementation starting at the object's dynamic class
   (``ArmoredCombatant``). Since ``ArmoredCombatant`` provides an overridden version of
   ``takeDamage``, that specialized version executes!

This runtime selection of the method implementation based on the dynamic type of the
receiver object is known as **dynamic method dispatch** (or *late binding*).

.. code-block:: text

   [Stack Memory]                         [Heap Memory]
   +----------------------+               +--------------------------------------+
   | soldier (Ref)        | ------------> | Object of class ArmoredCombatant     |
   | Static: Combatant    |               | Dynamic: ArmoredCombatant            |
   +----------------------+               | Fields: name="Paladin", health=120,  |
                                          |         armorRating=15               |
                                          +--------------------------------------+
                                                             |
                                         Dynamic Method      v
                                         Dispatch to: ArmoredCombatant.takeDamage()

Tracing Multi-Tier Hierarchies
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Dynamic dispatch applies seamlessly across deep, multi-tier class hierarchies.
Suppose we extend our combatant system with a third tier:

.. code-block:: text

   Combatant
      ▲
      │ extends
   ArmoredCombatant
      ▲
      │ extends
   FortifiedJuggernaut

If ``FortifiedJuggernaut`` overrides ``takeDamage``, calling ``takeDamage`` on a
``FortifiedJuggernaut`` instance executes that code. If it *does not* override
``takeDamage``, the JVM steps up the hierarchy to ``ArmoredCombatant``. If
``ArmoredCombatant`` implements it, that version runs; otherwise, the JVM continues
upward to ``Combatant``. The JVM always executes the implementation *closest to the
dynamic type* in the inheritance chain.


Polymorphic Reference Assignments
---------------------------------

Because an inheritance relationship represents an IS-A relationship, Java allows an
instance of a subclass to be assigned to a reference variable of any of its
superclasses. This assignment is called **upcasting**:

.. code-block:: java

   Combatant c1 = new Combatant("Scout", 80);
   Combatant c2 = new ArmoredCombatant("Knight", 150, 10);
   Object c3 = new ArmoredCombatant("Guardian", 200, 25);

All three declarations above are valid:
* An ``ArmoredCombatant`` IS-A ``Combatant``, so assigning it to a ``Combatant`` variable is valid.
* An ``ArmoredCombatant`` IS-A ``Object``, so assigning it to an ``Object`` variable is valid.

Upcasting is implicit and completely safe. Every armored combatant possesses every
field and method guaranteed by ``Combatant``, so treating it as a ``Combatant`` can
never result in an invalid operation.

The "Type as a Lens" Metaphor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A helpful way to understand reference variables is to think of the variable's type as
a **lens** or a window through which you observe an object.

.. code-block:: java

   Combatant hero = new ArmoredCombatant("Aegis", 100, 12);

Even though the underlying object in memory is an ``ArmoredCombatant``, our variable
``hero`` looks at that object through a ``Combatant`` lens. This leads to two critical
rules:

1. **What You Can Call (Static Check)**: The lens restricts what you are allowed to
   ask the object to do. The compiler only permits you to call methods defined in the
   static type ``Combatant``.
2. **How It Behaves (Dynamic Dispatch)**: When you invoke an accessible method, the
   object responds using its dynamic type's logic.

Consider what happens if we attempt to call a method that exists *only* in the subclass:

.. code-block:: java

   Combatant hero = new ArmoredCombatant("Aegis", 100, 12);

   // Valid: takeDamage() is declared in Combatant; executes ArmoredCombatant version!
   hero.takeDamage(25);

   // COMPILE ERROR: cannot find symbol method getArmorRating()
   int armor = hero.getArmorRating();

Why does ``hero.getArmorRating()`` fail to compile? Because the compiler looks only at
the static type ``Combatant``, and ``Combatant`` does not have a ``getArmorRating()``
method. The compiler does not know—and cannot assume—that ``hero`` will point to an
``ArmoredCombatant`` at runtime.

Polymorphic Aggregation: Modeling a Squad
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The true practical power of polymorphic references emerges when composing complex
objects from simpler ones. In a simulation or game, you often group related entities
together into larger units. In Chapter 8, we will learn how to store arbitrary numbers
of objects in dynamic collections like lists. Even with the tools we have right now,
we can combine polymorphic objects using **object aggregation** with named fields.

Consider a ``Squad`` composed of two combatants assigned to different tactical positions:
a front line combatant and a back line combatant:

.. code-block:: java

   public class Squad
   {
       private Combatant frontLine;
       private Combatant backLine;

       public Squad(Combatant frontLine, Combatant backLine)
       {
           this.frontLine = frontLine;
           this.backLine = backLine;
       }

       public Combatant getFrontLine()
       {
           return frontLine;
       }

       public Combatant getBackLine()
       {
           return backLine;
       }

       /**
        * Applies area-of-effect damage to both squad positions.
        * @param amount the raw damage incoming to each squad member
        */
       public void takeAreaDamage(int amount)
       {
           frontLine.takeDamage(amount);
           backLine.takeDamage(amount);
       }
   }

Notice how ``Squad`` uses generalized ``Combatant`` references for both of its fields.
This makes the squad **heterogeneous**: we can assemble a squad containing any combination
of regular ``Combatant`` and specialized ``ArmoredCombatant`` instances:

.. code-block:: java

   Combatant archer = new Combatant("Archer", 70);
   Combatant knight = new ArmoredCombatant("Vanguard Knight", 120, 15);

   Squad squad = new Squad(knight, archer);

   // Apply area-of-effect damage to the entire squad
   squad.takeAreaDamage(25);

When ``squad.takeAreaDamage(25)`` executes:
* When ``frontLine.takeDamage(25)`` is called, dynamic dispatch invokes
  ``ArmoredCombatant``'s overridden version because ``frontLine`` refers to a knight!
  Armor absorbs 15, reducing health by only 10.
* When ``backLine.takeDamage(25)`` is called, standard ``Combatant`` damage logic
  executes because ``backLine`` refers to an archer. Health drops by the full 25.
* The ``Squad`` class does not need any ``if-else`` checks to inspect what kind of
  combatant is in each position.

This is the essence of object-oriented design: client code sends messages to
generalized references, and individual objects specialize their responses
autonomously.

AssertJ Verification of Polymorphic Assignment
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

You can write unit tests that verify both the static behavior and dynamic identity of
polymorphically assigned objects:

.. code-block:: java

   import org.junit.jupiter.api.Test;
   import static org.assertj.core.api.Assertions.*;

   class PolymorphicAssignmentTest
   {
       @Test
       void testPolymorphicDispatchInSquad()
       {
           Combatant scout = new Combatant("Scout", 100);
           Combatant knight = new ArmoredCombatant("Knight", 100, 10);

           Squad team = new Squad(knight, scout);

           // Hit both team positions with 20 area-of-effect damage
           team.takeAreaDamage(20);

           // Knight in front line absorbed 10 via armor: 100 - (20 - 10) = 90
           assertThat(knight.getHealth()).isEqualTo(90);

           // Scout in back line took full 20 damage: 100 - 20 = 80
           assertThat(scout.getHealth()).isEqualTo(80);

           // AssertJ can inspect the dynamic type of reference variables
           assertThat(scout).isExactlyInstanceOf(Combatant.class);
           assertThat(knight).isInstanceOf(Combatant.class);
           assertThat(knight).isExactlyInstanceOf(ArmoredCombatant.class);
       }
   }


Defining and Implementing Java Interfaces
-----------------------------------------

Because there are times when we want to know how to *use* a class without
caring about its internal details, it would be nice to talk only about
the services (or methods) a class provides. Java provides a tool for us
to describe the set of methods provided by a class without being concerned
about its internal implementation called an **interface**. An *interface*
is similar to a class, but only lists the declarations of the public
methods in the class (and any public constants you wish to provide). It
does not include the fields, constructors, method implementations or any
private aspects--just the public parts of the declarations that allow you
to use it.

Compared to a class, an interface provides just enough information for you
to be able to call the public methods and use it, while a class provides the
full detail of exactly how those methods are actually implemented. As a result,
you can use a class to create an object, since you have the full implementation
available. However, you cannot use an interface by itself to create an object--all
objects belong to some class, and an interface only describes a set of method
declarations that a class might provide.

Why would we use an interface? Interfaces are used for three main reasons
in programming:

1. By separating the declarations of the methods into an interface, and then
   moving the implementation to a separate class, it becomes possible for
   the same interface to be implemented in multiple different ways using
   different strategies. *Multiple implementations* is tricky and error-prone
   without interfaces, but since any number of classes can implement an
   interface just by providing the required methods, they are useful when there
   are multiple techniques for implementing the same algorithm or data structure.
2. Through an interface, you can capture a common set of methods that you
   expect to appear in multiple classes so that you can give the set of methods
   a name and ensure that classes providing that set of methods all do it
   consistently.
3. By separating the declarations of the methods into an interface, you
   enable programmers who need to *use* the code to build on top of the
   interface, in parallel with other programmers who are writing what is
   underneath. Interfaces can allow groups to communicate and depend on
   each other, even if the underlying software isn't implemented yet.

As an example, suppose we were working on a program that manages graphical
shapes and we wanted all of the various types of graphical shapes to be
drawable on the screen. We might do this by imagining that each shape
would have a ``draw()`` method that would draw it on the screen. We could
capture that in an interface like this:

.. code-block:: java

   public interface Drawable
   {
       public void draw();
   }

You'll notice a few things here that are different from other Java code
we've seen. For one thing, instead of saying public ``class`` we see the
keyword ``interface`` used. For another, our method signature is followed
by a ``;``, not curly braces. There is no implementation for the method
at all--that is left up to the individual classes that provide this method.
The interface only declares the method name, parameters, and return type.

The more general syntax for writing an interface looks like this:

.. code-block:: java

   public interface InterfaceName
   {
       // any number of constant values

       // any number of method signatures WITHOUT implementation.
   }

By itself, this code won't do anything. However, it captures the idea
of providing a single ``draw()`` method. We cannot use it to create
objects--we need a class for that. Any class we write that we intend
to conform to this interface should **implement** it:

.. code-block:: java

   public class Rectangle
       implements Drawable
   {
       // ...
       public void draw()
       {
           // ...
       }
   }

   public class Circle
       implements Drawable
   {
       // ...
       public void draw()
       {
           // ...
       }
   }

In these two class definitions, we use the keyword ``implements`` followed
by the interface name to declare that the class provides all the methods
included in that interface. When we say ``class Rectangle implements Drawable`` we are
claiming that the class ``Rectangle`` provides all the methods declared in
the interface ``Drawable``. Further, this is a guarantee, and we will receive
a compiler error if we accidentally misspell the name of ``draw()`` or
declare it in a way that is inconsistent with the way it is declared
in ``Drawable``.
The ``Rectangle`` class will
not compile until we implement a method with the
signature ``public void draw()``.
We can add any other fields or methods we want, but that ``draw()``
method *must* be implemented.

However, by declaring that ``class Rectangle implements Drawable``, now
any and all programmers (or source code) that use the ``Rectangle`` class
will know that it provides a ``draw()`` method, and that this method can be
used the same way it can for any other drawable objects.

By itself, this can seem like something of an odd structure in a language.
Couldn't a developer just remember to implement that one method? In our
example, probably. But interfaces provide a way for us to explicitly write
these requirements down so we can share them, and also provides a mechanism
for the compiler to check that we have included the required methods with
the correct declarations, and warn us of any mistakes we might make in that
regard. So interfaces give better error checking and better communication
between programmers.

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/GhslBwrRsnw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

Single Inheritance vs. Multiple Interfaces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A fundamental design decision in Java is that a class can extend at most **one**
superclass. This is known as **single inheritance**. Multiple class inheritance (which
is allowed in languages like C++) can create tricky structural ambiguities, such as the
famous "Diamond Problem," where two parent classes define conflicting versions of the
same method or state.

However, a class in Java may implement **as many interfaces as needed**.

Suppose our game environment also needs entities capable of producing audio effects.
We can define a second interface, ``Audible``:

.. code-block:: java

   public interface Audible
   {
       /**
        * Plays the audio effect associated with this entity.
        */
       void playSound();
   }

Now, a class can inherit core state and implementation from a superclass while simultaneously
fulfilling both independent interface contracts:

.. code-block:: java

   public class ArmoredCombatant extends Combatant
       implements Drawable, Audible
   {
       public ArmoredCombatant(String name, int health, int armorRating)
       {
           super(name, health, armorRating);
       }

       @Override
       public void draw()
       {
           // Render armor and weapon graphics
       }

       @Override
       public void playSound()
       {
           // Play sound effect of clanking metal armor
       }
   }

Here, ``ArmoredCombatant`` inherits state and default behaviors from ``Combatant``,
while simultaneously fulfilling the behavioral contracts of both ``Drawable`` and
``Audible``.

.. list-table:: Summary: Class vs. Interface
   :widths: 30 35 35
   :header-rows: 1

   * - Feature
     - Class
     - Interface
   * - **Keyword**
     - ``class``
     - ``interface``
   * - **Can Instantiate?**
     - Yes (via ``new``)
     - No (must be implemented by a class)
   * - **Method Bodies?**
     - Methods must have complete bodies
     - Method declarations only (no bodies)
   * - **Instance Variables?**
     - Yes (declares state)
     - No (cannot declare instance variables)
   * - **Usage Limit**
     - Can extend 1 class
     - A class can implement many interfaces


Designing Extensible Game Frameworks
------------------------------------

In **Program 04 (Tabletop Gaming)**, you will design interactive game environments
containing cards, dice, game boards, and diverse player entities. Interfaces and
polymorphic hierarchies provide the architectural foundation for these systems.

Consider the challenge of designing dice mechanics for a tabletop roleplaying game.
Different games employ different kinds of dice:
* A standard six-sided die (values 1 through 6).
* An *Advantage Die* (the player rolls twice and takes the higher outcome).
* A *Loaded Die* (weighted to favor specific outcomes during testing).

If we wrote a game referee that hard-coded checks for each specific die class, our
code would quickly become brittle and difficult to maintain. Instead, we can define a
clean behavioral contract using an interface:

.. code-block:: java

   public interface Rollable
   {
       /**
        * Generate a single random roll result.
        * @return an integer between 1 and getSides() inclusive.
        */
       int roll();

       /**
        * Return the number of sides on this die.
        * @return total sides.
        */
       int getSides();
   }

Implementing Concrete Dice Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now we can implement specialized classes conforming to ``Rollable``:

.. code-block:: java

   import student.util.Random;

   public class StandardDie implements Rollable
   {
       private int sides;
       private Random generator;

       public StandardDie(int sides)
       {
           this.sides = Math.max(1, sides);
           this.generator = Random.generator();
       }

       // Secondary constructor defaulting to standard 6-sided die via same-class chaining
       public StandardDie()
       {
           this(6);
       }

       @Override
       public int getSides()
       {
           return sides;
       }

       @Override
       public int roll()
       {
           return generator.nextInt(sides) + 1;
       }
   }

.. note::

   In this example, ``StandardDie`` generates random numbers using Virginia Tech's
   built-in ``student.util.Random`` utility class. A reference to the generator is obtained
   via ``Random.generator()``, and ``generator.nextInt(sides)`` generates a random integer
   from ``0`` up to ``sides - 1``. Random number generation—along with testing techniques
   for controlling pseudo-random sequences during automated testing—is covered in much
   greater detail in Chapter 8.

Next, consider an ``AdvantageDie``, a common mechanic in tabletop gaming where a player
rolls twice and keeps the superior result:

.. code-block:: java

   public class AdvantageDie implements Rollable
   {
       private Rollable baseDie;

       public AdvantageDie(Rollable baseDie)
       {
           this.baseDie = baseDie;
       }

       @Override
       public int getSides()
       {
           return baseDie.getSides();
       }

       @Override
       public int roll()
       {
           int roll1 = baseDie.roll();
           int roll2 = baseDie.roll();
           return Math.max(roll1, roll2);
       }
   }

Notice how ``AdvantageDie`` uses **Composition and Delegation**! It does not need to
know how ``baseDie`` generates numbers; it simply delegates the roll operation twice
to its encapsulated ``Rollable`` instance and computes the maximum.

Polymorphic Dice Rolling in Game Engines
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now, imagine constructing a ``DicePair`` used in tabletop games to roll two dice together:

.. code-block:: java

   public class DicePair
   {
       private Rollable firstDie;
       private Rollable secondDie;

       public DicePair(Rollable firstDie, Rollable secondDie)
       {
           this.firstDie = firstDie;
           this.secondDie = secondDie;
       }

       /**
        * Rolls both dice and sums their total value.
        * @return aggregate roll total.
        */
       public int rollTotal()
       {
           return firstDie.roll() + secondDie.roll();
       }
   }

Because ``DicePair`` depends strictly on the ``Rollable`` interface rather than
concrete classes, players can combine any pairing of ``StandardDie`` and
``AdvantageDie``. The rolling logic never changes, demonstrating the open/closed
principle: software should be open for extension, but closed for modification.

Testing Game Entities with AssertJ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To verify our game framework in automated unit tests, we can supply predictable
substitutions (stubs) that implement ``Rollable``:

.. code-block:: java

   // A deterministic die stub for automated testing
   class DeterministicDie implements Rollable
   {
       private int fixedValue;

       public DeterministicDie(int fixedValue)
       {
           this.fixedValue = fixedValue;
       }

       @Override
       public int getSides()
       {
           return 6;
       }

       @Override
       public int roll()
       {
           return fixedValue;
       }
   }

   // A test stub that alternates between two values
   class AlternatingDie implements Rollable
   {
       private int count = 0;

       @Override
       public int getSides()
       {
           return 6;
       }

       @Override
       public int roll()
       {
           count++;
           return (count % 2 == 1) ? 2 : 5;
       }
   }

.. code-block:: java

   import org.junit.jupiter.api.Test;
   import static org.assertj.core.api.Assertions.*;

   class DiceFrameworkTest
   {
       @Test
       void testStandardDieBounds()
       {
           StandardDie d6 = new StandardDie(6);
           int rolls = 0;
           while (rolls < 50)
           {
               int value = d6.roll();
               assertThat(value).isBetween(1, 6);
               rolls++;
           }
       }

       @Test
       void testDicePairPolymorphicSum()
       {
           Rollable die1 = new DeterministicDie(4);
           Rollable die2 = new DeterministicDie(5);

           DicePair pair = new DicePair(die1, die2);
           assertThat(pair.rollTotal()).isEqualTo(9);
       }

       @Test
       void testAdvantageDieSelectsMaxRoll()
       {
           Rollable alternatingDie = new AlternatingDie();
           AdvantageDie advantage = new AdvantageDie(alternatingDie);
           assertThat(advantage.roll()).isEqualTo(5);
       }
   }


Programming Practice 7
----------------------

.. extrtoolembed:: 'Programming Practice 7'
   :workout_id: 3909


.. raw:: html
   
      <footer style="border-top: 1px solid #777;"><div class="footer">
        Selected content adapted from:<br/>
        <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
        licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
        <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
        licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
      </div></footer>