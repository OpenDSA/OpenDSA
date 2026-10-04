.. avmetadata::
   :title: Grouping Objects: Lists, Aggregation, and Strings
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: List; ArrayList; Aggregation; String; Generics; Collections; NullPointerException
   :naturallanguage: en
   :programminglanguage: Java
   :description: Introduction to generic collections using ArrayList, object aggregation, list iteration, the null keyword, diagnosing NullPointerExceptions, and string manipulation.


Grouping Objects: Lists, Aggregation, and Strings
=================================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~99 minutes (~44 min reading + ~55 min video at 100 WPM)

   After reading this chapter, you will be able to:

   * **Declare** and instantiate generic ``List`` collection variables using ``ArrayList``.
   * **Apply** core collection methods (``add``, ``get``, ``remove``, ``size``, ``contains``, ``isEmpty``) to manage dynamic sequences of objects.
   * **Implement** object aggregation classes encapsulating a ``List`` instance field with custom addition, removal, and query methods.
   * **Explain** the importance of defensive copying when exposing collection state.
   * **Construct** enhanced ``for-each`` loops to search, count, and filter collection elements.
   * **Diagnose** ``NullPointerException``\ s from uninitialized fields or collection search misses using stack traces, and write defensive null checks.
   * **Use** String manipulation methods (``length``, ``charAt``, ``substring``, ``equals``) to inspect and slice textual data.
   * **Override** the ``toString()`` method to provide readable string representations of domain objects.


Introduction to Grouping Objects: ArrayList
-------------------------------------------

In our programs so far, we have stored individual pieces of data in individual
variables or instance fields. For example, if you were building a card game, you
might store a player's starting hand using separate variables:

.. code-block:: java

   Card card1 = new Card("Dragon", "Fire", 8);
   Card card2 = new Card("Knight", "Steel", 5);
   Card card3 = new Card("Cleric", "Light", 4);

While this approach works for small, fixed scenarios, it breaks down quickly as
programs grow. What happens when a player draws five more cards? Or what if a
player discards three cards and trades two others? You would need dozens of
individual variables, and writing code to inspect or display every card would
require repetitive, bloated statements. Even worse, you cannot easily change the
number of variables while the program is running.

To solve this problem, object-oriented languages provide **containers**—objects
specifically designed to hold and manage collections of other objects. Java
provides a comprehensive library known as the **Java Collections Framework**,
which offers three broad categories of containers:

* **Lists**: Ordered sequences of items where each element has a specific position (index).
* **Sets**: Unordered groups of unique items that contain no duplicate elements.
* **Maps**: Lookup tables of key-value pairs (like a dictionary mapping a word to its definition).

In this chapter, we focus on the most versatile and widely used collection: **lists**.

The List Interface and the ArrayList Class
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, ``List`` is an **interface**, not a concrete class. An interface specifies
what methods a container must provide, without dictating *how* those methods are
implemented behind the scenes. By separating the interface from the implementation,
Java allows programmers to write code that depends on the general behavior of a
list, regardless of the underlying data structure used.

Because ``List`` is an interface, you cannot create an instance directly using
``new List()``. Instead, you instantiate a **concrete class** that implements
the ``List`` interface. The most common concrete implementation in Java is
**ArrayList**:

.. code-block:: java

   import java.util.List;
   import java.util.ArrayList;

   // Declare using the List interface; instantiate using the ArrayList class:
   List<Card> hand = new ArrayList<Card>();

Notice that we declare the variable ``hand`` using the interface type ``List<Card>``,
but we instantiate it using ``new ArrayList<Card>()``. This is an application of
**polymorphism**: any valid ``List`` implementation can be assigned to a ``List``
reference variable.

How ArrayList Works in Memory
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An ``ArrayList`` organizes its elements in a contiguous, sequential line. Each
element is assigned an integer position called an **index**.

.. odsafig:: Images/ArrIdea.png
   :align: center

Just like pixel coordinates in an image or character positions in text,
**list indexing starts at 0, not 1**. In a list containing :math:`n` elements:

* The first element is always located at index ``0``.
* The second element is located at index ``1``.
* The last element is located at index :math:`n - 1` (that is, ``list.size() - 1``).

Unlike primitive arrays whose sizes are fixed upon creation, an ``ArrayList``
grows and shrinks dynamically. When you add elements, the ``ArrayList``
automatically allocates more memory if needed. When you remove elements, it
compacts the remaining items to maintain a continuous, zero-indexed sequence.

Take a few minutes to watch the following overview of how ``ArrayList`` works:

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/XkJD80HmpdI?start=0&end=1156" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Core List Operations: Add, Remove, Size, Get
--------------------------------------------

The ``List`` interface defines a standardized set of methods for managing
elements. The table below summarizes the most essential methods:

.. list-table:: Core Methods of the List Interface
   :header-rows: 1
   :widths: 35 65

   * - Method Signature
     - Purpose & Behavior
   * - ``add(E item)``
     - Appends ``item`` to the end of the list and increases its size by 1.
   * - ``add(int index, E item)``
     - Inserts ``item`` at the specified index, shifting existing elements at that index and higher one position to the right.
   * - ``get(int index)``
     - Returns the element located at ``index`` without removing it.
   * - ``set(int index, E item)``
     - Replaces the element at ``index`` with ``item`` and returns the old element.
   * - ``remove(int index)``
     - Removes and returns the element at ``index``, shifting all subsequent elements one position to the left.
   * - ``remove(Object item)``
     - Removes the first occurrence of ``item`` from the list (if present) and returns ``true``; returns ``false`` if not found.
   * - ``size()``
     - Returns the number of elements currently stored in the list.
   * - ``isEmpty()``
     - Returns ``true`` if ``size() == 0``, otherwise ``false``.
   * - ``contains(Object item)``
     - Returns ``true`` if the list contains the specified element, otherwise ``false``.
   * - ``clear()``
     - Removes all elements from the list, resetting its size to 0.

Adding and Accessing Elements
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an ``ArrayList`` is first created, it is completely empty—its size is 0.
Calling ``add()`` appends elements one by one to the end of the list:

.. code-block:: java

   List<String> party = new ArrayList<String>();
   party.add("Warrior");  // stored at index 0; size is now 1
   party.add("Mage");     // stored at index 1; size is now 2
   party.add("Rogue");    // stored at index 2; size is now 3

To retrieve an element, pass its zero-based index to ``get()``:

.. code-block:: java

   String leader = party.get(0);    // returns "Warrior"
   String support = party.get(1);   // returns "Mage"

Index Boundaries and IndexOutOfBoundsException
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because an ``ArrayList`` only contains positions from ``0`` to ``size() - 1``,
attempting to access an index outside this range causes a runtime crash:

.. code-block:: java

   List<String> party = new ArrayList<String>();
   party.add("Warrior");
   party.add("Mage");

   // Valid indices are 0 and 1 (size is 2)
   String hero = party.get(2); // FAILS: throws IndexOutOfBoundsException!

Whenever you see an ``IndexOutOfBoundsException``, your code attempted to
access a slot that does not exist. Remember: a list of size 2 has no index 2!

Removing Elements and Automatic Shifting
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you remove an element from a list using ``remove(int index)``, the ``ArrayList``
automatically shifts every subsequent element one position to the left to close
the gap:

.. code-block:: java

   List<String> party = new ArrayList<String>();
   party.add("Warrior");  // index 0
   party.add("Mage");     // index 1
   party.add("Rogue");    // index 2

   party.remove(1);       // removes "Mage"
   // "Rogue" shifts from index 2 to index 1!
   // party.size() is now 2
   String secondMember = party.get(1); // returns "Rogue"

Writing Unit Tests for List Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In CS 1114, we use **AssertJ** assertions to verify list state in our unit tests.
AssertJ provides expressive methods for checking collections:

.. code-block:: java

   import static org.assertj.core.api.Assertions.*;
   import org.junit.jupiter.api.Test;

   public class PartyTest
   {
       @Test
       public void testPartyLifecycle()
       {
           List<String> party = new ArrayList<String>();
           assertThat(party).isEmpty();
           assertThat(party).hasSize(0);

           party.add("Warrior");
           party.add("Mage");
           party.add("Rogue");

           assertThat(party).hasSize(3);
           assertThat(party.get(0)).isEqualTo("Warrior");
           assertThat(party).contains("Mage");
           assertThat(party).containsExactly("Warrior", "Mage", "Rogue");

           party.remove("Mage");
           assertThat(party).hasSize(2);
           assertThat(party).containsExactly("Warrior", "Rogue");
           assertThat(party).doesNotContain("Mage");
       }
   }

Take a few minutes to watch this video demonstration of common list methods:

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/1nRj4ALuw7A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Generic Type Parameters & Type Safety
-------------------------------------

In our earlier variable declarations, every type was fixed and self-contained:
``int count;`` or ``String name;``. However, a list is a container that holds
*other* objects. If Java did not know what kind of objects a list held, you
could accidentally add a ``Car`` to a list intended for ``Card``\ s, leading to
mysterious errors later when trying to cast or invoke methods on those objects.

To solve this, Java uses **generics**. A generic type is a class or interface
that takes one or more types as parameters. We specify the element type inside
angle brackets (``<E>``):

.. code-block:: java

   List<Card> deck = new ArrayList<Card>();

Here, ``Card`` is the **type argument**. It tells the Java compiler that this
particular list may *only* contain references to ``Card`` objects (or subclasses
of ``Card``).

Compile-Time Type Safety
~~~~~~~~~~~~~~~~~~~~~~~~

The greatest benefit of generic collections is **type safety enforced at compile
time**. If you attempt to add an incompatible object to a typed list, the
compiler immediately rejects the code:

.. code-block:: java

   List<Card> deck = new ArrayList<Card>();
   deck.add(new Card("Dragon", "Fire", 8)); // OK: is a Card
   deck.add("Ace of Spades");                // COMPILER ERROR: String is not a Card!

Because the compiler verifies element types when code is compiled, you never
need to manually type-cast elements when retrieving them with ``get()``:

.. code-block:: java

   // No cast needed; Java knows deck.get(0) returns a Card
   Card topCard = deck.get(0);
   int power = topCard.getPower();

Primitive Wrapper Classes and Autoboxing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One crucial limitation of Java generics is that **type arguments must be reference
types (objects), not primitive types**. The following line will not compile:

.. code-block:: java

   List<int> scores = new ArrayList<int>(); // SYNTAX ERROR: primitive type not allowed!

To store primitives in collections, Java provides an object wrapper class for
each primitive type:

.. list-table:: Java Primitive Types and Their Wrapper Classes
   :header-rows: 1
   :widths: 30 40 30

   * - Primitive Type
     - Wrapper Class
     - Example Value
   * - ``int``
     - ``Integer``
     - ``Integer.valueOf(42)``
   * - ``double``
     - ``Double``
     - ``Double.valueOf(3.14)``
   * - ``boolean``
     - ``Boolean``
     - ``Boolean.TRUE``
   * - ``char``
     - ``Character``
     - ``Character.valueOf('A')``

To create a list of integers or doubles, use the corresponding wrapper class:

.. code-block:: java

   List<Integer> scores = new ArrayList<Integer>();
   List<Double> ratings = new ArrayList<Double>();

Java automatically converts between primitive values and their corresponding
wrapper objects through **autoboxing** (converting a primitive to an object) and
**unboxing** (extracting the primitive value from an object):

.. code-block:: java

   List<Integer> scores = new ArrayList<Integer>();
   scores.add(95);        // Autoboxing: int 95 automatically converted to Integer

   int highScore = scores.get(0); // Unboxing: Integer automatically converted to int

Take a few minutes to watch this video explaining generics in Java:

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/K1iu1kXkVoA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Encapsulating Collections: Decks and Hands
------------------------------------------

In object-oriented programming, containers are rarely left exposed as bare,
unprotected variables in client code. Instead, we encapsulate collections inside
domain classes. This design pattern is called **aggregation**: a domain entity
(such as a ``CardDeck``, a ``CardHand``, or an ``Inventory``) manages an internal
``List`` as a private instance field.

By encapsulating the collection, the owning class controls all additions,
removals, and modifications, ensuring that the collection's state remains valid
and consistent.

Designing a CardHand Class
~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider modeling a player's hand in a tabletop game. A hand holds multiple
``Card`` objects, but client code should not manipulate the raw list directly.
Instead, the ``CardHand`` class provides controlled domain operations like
``addCard()``, ``playCard()``, and ``getCardCount()``:

.. code-block:: java

   import java.util.List;
   import java.util.ArrayList;

   public class CardHand
   {
       private int maxCapacity;
       private List<Card> cards;

       /**
        * Creates an empty card hand with the specified maximum capacity.
        */
       public CardHand(int capacity)
       {
           this.maxCapacity = capacity;
           this.cards = new ArrayList<Card>();
       }

       /**
        * Adds a card to the hand if there is space available.
        * Returns true if added, false if the hand is full.
        */
       public boolean addCard(Card card)
       {
           if (card != null && this.cards.size() < this.maxCapacity)
           {
               this.cards.add(card);
               return true;
           }
           return false;
       }

       /**
        * Plays (removes and returns) the card at the specified index.
        */
       public Card playCard(int index)
       {
           if (index >= 0 && index < this.cards.size())
           {
               return this.cards.remove(index);
           }
           return null;
       }

       /**
        * Returns the number of cards currently in this hand.
        */
       public int getCardCount()
       {
           return this.cards.size();
       }
   }

Defensive Copying vs. Exposing Internal References
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Suppose a client needs to inspect all the cards currently held in a ``CardHand``.
A common beginner instinct is to write a getter like this:

.. code-block:: java

   // DANGEROUS: Leaks the internal collection reference!
   public List<Card> getCards()
   {
       return this.cards;
   }

**Why is this dangerous?**
Remember that object variables store *references* (memory addresses). If
``getCards()`` returns ``this.cards``, external client code obtains a direct
reference to the internal list. A client could then execute:

.. code-block:: java

   CardHand hand = new CardHand(5);
   hand.addCard(new Card("Dragon", "Fire", 8));

   // Rogue external code clears the player's hand directly!
   List<Card> leaked = hand.getCards();
   leaked.clear(); // Empties the hand behind its back!

This completely violates **encapsulation**. The ``CardHand`` can no longer
guarantee its invariants (such as capacity limits) because an outsider modified
its private list directly.

To prevent this, apply **defensive copying**. When returning an encapsulated
collection, create and return a brand-new list containing copies of the references:

.. code-block:: java

   /**
    * Returns a safe, defensive copy of the cards in this hand.
    */
   public List<Card> getCards()
   {
       return new ArrayList<Card>(this.cards);
   }

Now, if a client calls ``getCards().clear()``, they only clear their own copy.
The private ``cards`` field inside ``CardHand`` remains completely protected.


Iterating Lists with Enhanced For-Each Loops
--------------------------------------------

Once a collection holds objects, we frequently need to examine every element:
searching for a specific card, counting elements that match a criterion, or
calculating a total score.

While you can iterate over a list using an indexed numeric counter
(``for (int i = 0; i < list.size(); i++)``), Java provides a cleaner, more
readable loop syntax specifically designed for collections: the **enhanced for-each loop**.

Enhanced For-Each Syntax
~~~~~~~~~~~~~~~~~~~~~~~~

The general syntax of an enhanced for-each loop is:

.. code-block:: java

   for (ElementType variableName : collectionName)
   {
       // Statements executed for each element in the collection
   }

In each iteration, Java automatically retrieves the next element from the collection,
assigns it to the loop variable, and executes the loop body. For example, to inspect
every card in a player's hand:

.. code-block:: java

   for (Card card : this.cards)
   {
       System.out.println("Inspecting: " + card.getName());
   }

The Search Idiom and Early Loop Exit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A classic operation is searching a collection to find the first element that
satisfies a condition. When you find the desired object, there is no need to keep
looping through the rest of the list. Instead, use an **early loop exit** by
returning the object immediately:

.. code-block:: java

   /**
    * Finds and returns the first card in the hand matching the given name.
    * Returns null if no matching card exists.
    */
   public Card findCardByName(String name)
   {
       for (Card card : this.cards)
       {
           if (card.getName().equals(name))
           {
               return card; // Immediate early exit! Found it!
           }
       }
       return null; // Checked the whole hand; card is not present
   }

Notice how this works:

1. The loop examines each card one by one.
2. If ``card.getName().equals(name)`` is ``true``, the ``return card;`` statement
   terminates both the loop and the entire method immediately.
3. If the loop finishes inspecting all cards without executing the ``return``
   inside the loop, execution drops down to ``return null;``, signaling that no
   matching card was found.

The Accumulator Idiom: Counting and Summing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Another essential pattern is the **accumulator**. An accumulator is a variable
declared *before* the loop, initialized to zero (or an empty collection), and
updated incrementally on each iteration.

For example, to calculate the total attack power of all cards in a hand:

.. code-block:: java

   /**
    * Calculates the total attack power of all cards in this hand.
    */
   public int getTotalPower()
   {
       int totalPower = 0; // The numeric accumulator
       for (Card card : this.cards)
       {
           totalPower = totalPower + card.getPower();
       }
       return totalPower;
   }

Filtering Elements into a New Collection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

An accumulator does not have to be a number—it can also be a **new list**!
Suppose you want to retrieve all cards belonging to a specific element type (e.g.,
"Fire"):

.. code-block:: java

   /**
    * Returns a list of all cards in this hand of the specified element type.
    */
   public List<Card> getCardsByElement(String element)
   {
       List<Card> matches = new ArrayList<Card>(); // The collection accumulator
       for (Card card : this.cards)
       {
           if (card.getElement().equals(element))
           {
               matches.add(card); // Accumulate matching cards
           }
       }
       return matches;
   }


The null Keyword & Diagnosing NullPointerExceptions
---------------------------------------------------

When you declare an object variable or reference field in Java, it stores a
reference (a pointer) to an object in memory. But what if a variable has not been
assigned to any object yet? Or what if a search method looks for an item and
finds nothing?

Java provides the special keyword ``null`` to represent **the absence of an object**:

.. code-block:: java

   Card emptyCard = null; // Refers to no object

Reference Semantics of null
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Understanding ``null`` is essential when working with collections:

1. **Uninitialized Fields Default to null**: When an object is instantiated, all
   its reference fields automatically start with the value ``null`` unless
   explicitly initialized in their declaration or constructor.
2. **Search Sentinels**: As demonstrated in our ``findCardByName()`` method above,
   returning ``null`` is the standard idiom in Java to signal that an object was
   not found.

Causes of NullPointerException: The Receiver Dot Rule
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A variable holding ``null`` does not refer to any object. Therefore, **you cannot
call methods or access fields through a null reference**.

Whenever Java evaluates an expression with a dot (``.``), the expression to the
left of the dot is called the **receiver**. If the receiver evaluates to ``null``,
the Java Virtual Machine immediately throws a **NullPointerException** (frequently
abbreviated as **NPE**):

.. code-block:: java

   Card card = null;
   int power = card.getPower(); // CRASH: card is null! Throws NullPointerException!

In CS 1114, the two most common causes of NullPointerExceptions are:

1. **Forgetting to initialize a collection field in a constructor**:

   .. code-block:: java

      public class CardHand
      {
          private List<Card> cards; // Defaults to null!

          public CardHand(int capacity)
          {
              // BUG: Forgot: this.cards = new ArrayList<Card>();
          }

          public void addCard(Card card)
          {
              this.cards.add(card); // CRASH: this.cards is null! Throws NPE!
          }
      }

2. **Failing to check the result of a search method that may return null**:

   .. code-block:: java

      Card found = hand.findCardByName("Phoenix");
      // If "Phoenix" is not in the hand, found is null!
      System.out.println(found.getPower()); // CRASH if found is null!

Defensive Null Checks
~~~~~~~~~~~~~~~~~~~~~

To avoid NullPointerExceptions, write **defensive null checks** using ``!= null``
before invoking methods on references that might be empty:

.. code-block:: java

   Card found = hand.findCardByName("Phoenix");
   if (found != null)
   {
       System.out.println("Power: " + found.getPower());
   }
   else
   {
       System.out.println("Phoenix is not currently in the hand.");
   }

Diagnosing an NPE with BlueJ Stack Traces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an exception occurs during test execution in BlueJ, the test turns red and
displays a failure message:

.. odsafig:: Images/bluej-test-npe.png
   :align: center

If you click on the failed test in BlueJ, the lower pane displays the **stack trace**.
A stack trace is a chronological record of the method calls that were active at the
moment the program crashed.

To diagnose a NullPointerException from a stack trace:

1. **Locate the topmost line** in the stack trace that belongs to your own code
   (look for your class name and file name in parentheses, such as ``CardHand.java:38``).
2. **Open your source code to that exact line number**.
3. **Inspect every dot (``.``) on that line**. One of the expressions directly to
   the left of a dot was ``null`` when the line executed.
4. Trace backwards to determine *why* that variable was ``null``: was an instance
   field never initialized with ``new``? Did a method call return ``null``? Was
   a parameter passed as ``null``?

Using BlueJ's Debugger & Code Pad
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

BlueJ provides interactive tools to help you inspect variables and step through
code line by line to pinpoint null references:

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/w_iy0jmMmkA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>

You can also use BlueJ's **Code Pad** to interactively evaluate Java expressions,
instantiate lists, and inspect values:

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/OXQoxhuriGY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


String Manipulation & Immutability
----------------------------------

Just as a list groups objects in a sequential order, a **String** groups individual
characters in a sequential order. Characters in Java belong to the primitive type
``char``, written inside single quotes (``'A'``, ``'5'``, ``'!'``), while strings
are objects belonging to the ``String`` class, written inside double quotes
(``"Shadow Dragon"``).

String Immutability
~~~~~~~~~~~~~~~~~~~

The single most important conceptual rule regarding strings in Java is:
**Strings are immutable**.

Once a ``String`` object is created in memory, its contents **can never be changed**.
Methods in the ``String`` class that appear to modify text (like ``toUpperCase()``,
``replace()``, or ``substring()``) do **not** change the original string. Instead,
they construct and return a **brand new String object** containing the modified
result:

.. code-block:: java

   String name = "shadow dragon";
   name.toUpperCase(); // Creates a new uppercase string, but throws it away!

   System.out.println(name); // Still prints lowercase "shadow dragon"!

   // Correct usage: reassign the variable to reference the new string:
   name = name.toUpperCase();
   System.out.println(name); // Prints "SHADOW DRAGON"

Essential String Methods
~~~~~~~~~~~~~~~~~~~~~~~~

The table below summarizes the core methods available on every ``String`` object:

.. list-table:: Core String Inspection and Manipulation Methods
   :header-rows: 1
   :widths: 35 65

   * - Method Signature
     - Purpose & Behavior
   * - ``length()``
     - Returns the number of characters in the string. (Notice the parentheses: unlike array ``length``, string ``length()`` is a method!)
   * - ``charAt(int index)``
     - Returns the character at the specified 0-based index.
   * - ``substring(int beginIndex)``
     - Returns a new string containing the characters from ``beginIndex`` through the end of the string.
   * - ``substring(int begin, int end)``
     - Returns a new string containing characters from ``begin`` up to (but **not including**) ``end``. Length is ``end - begin``.
   * - ``indexOf(String str)``
     - Returns the 0-based index of the first occurrence of ``str``, or ``-1`` if not found.
   * - ``equals(Object other)``
     - Compares the character contents of two strings for equality. Returns ``true`` if identical.
   * - ``equalsIgnoreCase(String other)``
     - Compares two strings ignoring case distinctions (e.g., ``"Fire"`` equals ``"fire"``).

Slicing Strings with substring()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The two-parameter version of ``substring(beginIndex, endIndex)`` uses a half-open
interval :math:`[\text{beginIndex}, \text{endIndex})`. The character at ``beginIndex``
is included, but the character at ``endIndex`` is **excluded**:

.. code-block:: java

   String title = "DragonKnight";
   // Indices:     012345678901

   String firstWord = title.substring(0, 6);  // "Dragon" (indices 0 through 5)
   String secondWord = title.substring(6);    // "Knight" (indices 6 to the end)

   int len = firstWord.length();              // 6
   char initial = title.charAt(0);            // 'D'

String Equality: equals() vs. ==
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Never compare strings using the ``==`` relational operator. In Java:

* ``==`` tests **reference equality** (whether two variables point to the exact same memory address).
* ``.equals()`` tests **content equality** (whether two strings contain the exact same sequence of characters).

.. code-block:: java

   String str1 = new String("Fire");
   String str2 = new String("Fire");

   boolean sameRef = (str1 == str2);         // false! They are different objects in memory!
   boolean sameText = str1.equals(str2);     // true! Both contain "F-i-r-e"

Writing Unit Tests for String Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AssertJ provides built-in assertions for testing string operations:

.. code-block:: java

   @Test
   public void testCardNameFormatting()
   {
       String cardName = "Shadow Dragon";

       assertThat(cardName).hasSize(13);
       assertThat(cardName.length()).isEqualTo(13);
       assertThat(cardName.charAt(0)).isEqualTo('S');
       assertThat(cardName.substring(0, 6)).isEqualTo("Shadow");
       assertThat(cardName.substring(7)).isEqualTo("Dragon");
       assertThat(cardName).startsWith("Shadow");
       assertThat(cardName).endsWith("Dragon");
       assertThat(cardName).containsIgnoringCase("dragon");
   }


Custom toString Formatting for Entities
---------------------------------------

Every class in Java automatically inherits from Java's ultimate root class:
``java.lang.Object``. The ``Object`` class provides a default implementation of
the method:

.. code-block:: java

   public String toString()

The purpose of ``toString()`` is to return a human-readable text representation
of an object. However, the default implementation inherited from ``Object`` simply
prints the class name followed by the object's internal hash code:

.. code-block:: java

   Card card = new Card("Dragon", "Fire", 8);
   System.out.println(card); // Prints: Card@4a5729 (Not very useful!)

Overriding toString()
~~~~~~~~~~~~~~~~~~~~~

To make ``toString()`` useful, domain classes should **override** it to return a
formatted string summarizing the object's state:

.. code-block:: java

   public class Card
   {
       private String name;
       private String element;
       private int power;

       public Card(String name, String element, int power)
       {
           this.name = name;
           this.element = element;
           this.power = power;
       }

       // Getters omitted for brevity...

       @Override
       public String toString()
       {
           return this.name + " [" + this.element + "] (Power: " + this.power + ")";
       }
   }

Now, printing the card produces clear, readable output:

.. code-block:: java

   Card card = new Card("Dragon", "Fire", 8);
   System.out.println(card); // Prints: Dragon [Fire] (Power: 8)

Automatic toString() Invocation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, ``toString()`` is called **automatically** in two major situations:

1. **Printing**: Whenever you pass an object to ``System.out.println(obj)`` or
   ``System.out.print(obj)``.
2. **String Concatenation**: Whenever you use the ``+`` operator with a ``String``
   and an object (e.g., ``"Played: " + card``).

Formatting Encapsulated Collections in toString()
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an aggregating class (like ``CardHand``) overrides ``toString()``, it can
iterate through its internal collection to build a composite description:

.. code-block:: java

   public class CardHand
   {
       private List<Card> cards;

       // Other methods omitted...

       @Override
       public String toString()
       {
           if (this.cards.isEmpty())
           {
               return "Hand: (empty)";
           }

           String result = "Hand (" + this.cards.size() + " cards):\n";
           for (int i = 0; i < this.cards.size(); i++)
           {
               result = result + "  " + (i + 1) + ". " + this.cards.get(i).toString() + "\n";
           }
           return result;
       }
   }

Testing toString() with AssertJ
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In your unit tests, verify that ``toString()`` formats output according to specification:

.. code-block:: java

   @Test
   public void testCardToString()
   {
       Card card = new Card("Knight", "Steel", 5);
       assertThat(card.toString()).isEqualTo("Knight [Steel] (Power: 5)");
   }


Programming Practice 8
----------------------

.. extrtoolembed:: 'Programming Practice 8'
   :workout_id: 1514


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
