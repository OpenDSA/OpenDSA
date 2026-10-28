.. avmetadata::
   :title: Maps, Sets, and Associative Data Modeling
   :author: Clifford A. Shaffer, Molly Domino, Stephen Edwards
   :institution: Virginia Tech
   :keyword: Map; Set; HashMap; HashSet; Associative Data Modeling; Command Pattern; Graph Modeling
   :naturallanguage: en
   :programminglanguage: Java
   :description: Comprehensive introduction to associative collections (Map, HashMap), unique collections (Set, HashSet), map-driven dynamic dispatch, case-insensitive key normalization, graph navigation modeling, and unit testing with TestCase.

Maps, Sets, and Associative Data Modeling
=========================================

.. sidebar:: Learning Objectives

   * **Declare and instantiate** generic ``Map`` and ``Set`` collections using concrete implementations ``HashMap`` and ``HashSet``.
   * **Implement** key-value storage, lookup, key existence verification, and removal operations using ``put()``, ``get()``, ``containsKey()``, and ``remove()``.
   * **Differentiate** between sets and lists, utilizing ``Set`` and ``HashSet`` to enforce mathematical uniqueness, perform membership testing, and track visited nodes.
   * **Refactor** brittle cascading ``if/else-if`` conditional command dispatchers into extensible, $O(1)$ constant-time map-driven registries.
   * **Model** interconnected graph structures and spatial navigation layouts by associating directional or pathway string keys with destination references in an internal map.
   * **Normalize** string keys using ``.toLowerCase()`` and ``.trim()`` to guarantee case-insensitive retrieval across command interpreters and navigation directories.
   * **Construct** automated unit test suites extending ``TestCase`` to verify map state, lookup invariants, default fallbacks, and command execution.

**Estimated Time**: ~44 minutes (~44 min reading at 100 WPM)


Introduction to Maps: Key-Value Associations
--------------------------------------------

Throughout your programming journey thus far, you have organized collections of
data primarily using sequential, index-based structures: first with the
``java.util.List`` interface (such as ``ArrayList``) in Chapter 8, and then with
fixed-size one-dimensional and two-dimensional arrays in Chapters 9 and 10. In
all of these structures, every element is located, retrieved, and updated by its
**integer position index** (``0, 1, 2, ..., length - 1``).

While integer indices are ideal for ordered sequences, numeric tallies, and
geometric grids, they become awkward when dealing with real-world entities.
Consider how information is looked up in everyday life:

* You look up a friend's phone number by their **name**, not by an integer slot
  in memory.

* You check a student's grade or enrollment status by their **student ID
  string**, not by their position in a roster array.

* You query an inventory database for product details by a **barcode or SKU
  string**.

* A web server retrieves user preferences by a session **cookie or authentication
  token**.

* A campus navigation system finds pathways using **labels** like ``"bridge"``,
  ``"tunnel"``, or ``"quad"`` rather than index ``0`` or ``1``.

If you were limited strictly to lists or arrays, looking up a record by a string
key would require a **linear search**: traversing the list element by element
from index 0 to the end, comparing each record's key using ``.equals()``. If a
collection contains 100,000 items, searching for an item might require up to
100,000 comparisons.

To solve this problem cleanly and efficiently, modern computer languages provide
**associative data structures**. In Java, this capability is defined by the
``java.util.Map`` interface.

What is a Map?
~~~~~~~~~~~~~~

A **Map** (often referred to in computer science as a **dictionary**, **associative
array**, or **symbol table**) is a collection that establishes relationships
between **keys** and **values**. Instead of using numeric slot numbers to access
data, a map uses arbitrary domain objects—frequently strings or custom
identifiers—to index into the collection.

A map consists of a collection of **key-value associations** (often called
**entries** or **mappings**):

.. code-block:: text

   Key (Lookup Identifier)        Value (Associated Data)
   -----------------------        ------------------------
   "CS 1114"              ===>    "Intro to Software Design"
   "MATH 1225"            ===>    "Calculus of a Single Variable"
   "ENGL 1105"            ===>    "First-Year Writing"

Every association in a map obeys two fundamental rules:

1. **Keys Must Be Unique**: A map cannot contain duplicate keys. Each key
   identifies at most one associated value. If you attempt to insert a new pair
   using a key that already exists in the map, the new value **overwrites** the
   previous value.

2. **Values Need Not Be Unique**: Multiple distinct keys may be associated with
   identical values. For example, two different courses ("MATH 1225" and "MATH
   1226") might both have 4 credit hours associated with them.

The Generic `Map<K, V>` Interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``Map<K, V>`` interface in the ``java.util`` package utilizes two generic
type parameters:

* ``K`` specifies the data type of the **keys** used for lookup.
* ``V`` specifies the data type of the **values** stored in the collection.

For example:

* ``Map<String, String>``: maps a person's name to their phone number.
* ``Map<String, Integer>``: maps a student username to their exam score.
* ``Map<Integer, Student>``: maps an integer student ID to a ``Student`` object.
* ``Map<String, Command>``: maps a command verb string (like ``"temp"``) to an
  executable ``Command`` object.

Because Java collections only operate on reference types, primitive types must
be specified using their corresponding wrapper classes (such as ``Integer``,
``Double``, or ``Boolean``). Java's autoboxing mechanisms automatically handle
converting between primitives and wrapper objects when adding or reading data.

Concrete Implementations: `HashMap` vs. `TreeMap`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Just as ``List<E>`` is an interface implemented by concrete classes like
``ArrayList<E>`` and ``LinkedList<E>``, ``Map<K, V>`` is an interface that
cannot be instantiated directly. The Java Collections Framework provides several
concrete classes implementing ``Map<K, V>``, the two most common being:

1. ``java.util.HashMap<K, V>``:
   Implements the map using an internal data structure known as a **hash table**.
   A hash table uses a mathematical hashing function to convert any key object
   into an internal bucket index, allowing insertions, lookups, and removals to
   complete in **$O(1)$ constant time on average**, regardless of how many
   thousands of entries the map holds. However, ``HashMap`` **does not preserve
   any predictable ordering** of its keys.

2. ``java.util.TreeMap<K, V>``:
   Implements the map using a balanced binary search tree structure (a Red-Black
   Tree). It guarantees that when iterating through keys, they will always appear
   in **sorted natural order** (such as alphabetical order for strings).
   However, this sorted organization requires $O(\log N)$ time for lookups,
   insertions, and removals, making it slightly slower than ``HashMap`` for large
   datasets.

In CS 1114, ``HashMap<K, V>`` **is our standard default choice** for mapping
tasks, just as ``ArrayList<E>`` is our default choice for lists. We instantiate
maps using interface polymorphism:

.. code-block:: java

   // Declaring with the interface type, instantiating with concrete HashMap
   Map<String, Integer> inventory = new HashMap<String, Integer>();

Using the diamond operator (``<>``), the generic type parameters on the right
side can be inferred by the compiler:

.. code-block:: java

   Map<String, Integer> inventory = new HashMap<>();


Core Map Operations: Storage, Retrieval, and Inspection
-------------------------------------------------------

The ``Map<K, V>`` interface defines a concise, powerful suite of methods for
manipulating associations. The most critical operations include:

.. code-block:: java

   public V put(K key, V value);         // Stores an association; returns old value or null
   public V get(Object key);             // Retrieves associated value, or null if key absent
   public boolean containsKey(Object key); // Checks if the key exists in the map
   public V remove(Object key);          // Removes the association; returns removed value
   public int size();                    // Returns total number of key-value pairs
   public boolean isEmpty();             // Returns true if size() == 0
   public void clear();                  // Removes all associations from the map
   public Set<K> keySet();               // Returns a Set of all keys in the map
   public Collection<V> values();        // Returns a Collection of all values

Let us examine each primary operation in detail using a realistic software
analogy: managing a library catalog where book ISBN strings serve as unique keys
mapping to ``Book`` records.

Storing Associations: `put(key, value)`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To insert a new association into a map, you call the ``put()`` method, passing
the key as the first argument and the value as the second:

.. code-block:: java

   Map<String, Book> catalog = new HashMap<>();

   Book book1 = new Book("Intro to Java", "Shaffer", 450);
   Book book2 = new Book("Data Structures", "Weiss", 620);

   catalog.put("978-0134685991", book1);
   catalog.put("978-0135166307", book2);

When ``put()`` is called:

* If the key **does not yet exist** in the map, a brand-new association is
  created, the size of the map increases by one, and ``put()`` returns ``null``.

* If the key **already exists** in the map, the map **replaces the old value**
  with the new value, leaves the map's size unchanged, and returns the previous
  value that was displaced.

This overwriting behavior is fundamental:

.. code-block:: java

   Book book3 = new Book("Intro to Java (2nd Edition)", "Shaffer", 480);

   // Replaces book1 under the identical ISBN key:
   Book previous = catalog.put("978-0134685991", book3);

   // previous now references book1; catalog now associates the key with book3

Retrieving Values: `get(key)`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To retrieve the value associated with a specific key, call ``get()``:

.. code-block:: java

   Book found = catalog.get("978-0135166307");
   System.out.println("Title: " + found.getTitle());

The Critical `null` Return Rule
"""""""""""""""""""""""""""""""

What happens if you query a map with a key that is **not present**?

In a ``List`` or an array, attempting to access an invalid index (such as
``list.get(99)`` when the list only holds 5 items) throws an
``IndexOutOfBoundsException`` that crashes the program.

A map behaves very differently: if the specified key is not found in the map,
``get()`` **returns** ``null``. It does not throw an exception.

Because ``get()`` returns ``null`` on a search miss, you must **always verify
that the returned reference is not null** before invoking methods on it:

.. code-block:: java

   String targetISBN = "978-0000000000"; // Nonexistent ISBN
   Book result = catalog.get(targetISBN);

   if (result != null)
   {
       System.out.println("Found book: " + result.getTitle());
   }
   else
   {
       System.out.println("No book found matching ISBN: " + targetISBN);
   }

If you omit this ``if (result != null)`` defensive guard and immediately invoke
``result.getTitle()``, Java will throw a runtime ``NullPointerException``.

Defensive Membership Checking: `containsKey(key)`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you merely want to determine whether a key exists in a map without
necessarily retrieving its value, or if you want to verify presence before
accessing, use ``containsKey()``:

.. code-block:: java

   if (catalog.containsKey("978-0135166307"))
   {
       System.out.println("The catalog contains this book.");
   }

The ``containsKey()`` method returns ``true`` if the key is stored in the map
and ``false`` otherwise, executing in constant $O(1)$ time.

Removing Associations: `remove(key)`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To remove an association, call ``remove()`` with the key:

.. code-block:: java

   Book removedBook = catalog.remove("978-0135166307");

   // removedBook holds the removed Book object
   // catalog.containsKey("978-0135166307") now returns false
   // catalog.size() is decremented by 1

If the specified key does not exist in the map, ``remove()`` leaves the map
unchanged and safely returns ``null``.

Looping Over Map Keys with `keySet()`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Unlike a list or an array, a map does not provide numeric indices, and
``Map<K, V>`` does not implement ``Iterable``. You cannot directly write
``for (Book b : catalog)``.

Instead, because the keys of a map are unique, Java provides the ``keySet()``
method. The ``keySet()`` method returns a ``java.util.Set<K>`` containing all the
unique keys stored in the map.

Because sets implement ``Iterable``, you can traverse the keys using a standard
enhanced ``for-each`` loop, looking up each corresponding value with ``get()``:

.. code-block:: java

   for (String isbn : catalog.keySet())
   {
       Book currentBook = catalog.get(isbn);
       System.out.println("ISBN: " + isbn + " -> Title: " + currentBook.getTitle());
   }

This pattern is clean, intuitive, and the standard way to inspect all entries
in a map. If you only need to iterate over the values without caring about their
keys, you can similarly use ``catalog.values()``:

.. code-block:: java

   for (Book currentBook : catalog.values())
   {
       System.out.println("Book title: " + currentBook.getTitle());
   }


Sets and Uniqueness: `Set` & `HashSet`
--------------------------------------

While maps store associations between pairs of objects, computer scientists
frequently require collections that represent a mathematical **set**: an
unordered collection of distinct elements where **no duplicates are permitted**.

In Java, this behavior is modeled by the ``java.util.Set<E>`` interface.

Properties of a Set
~~~~~~~~~~~~~~~~~~~

A set differs from a list in three essential ways:

1. **Strict Element Uniqueness**: A set cannot contain duplicate elements. If
   you attempt to add an element that is already in the set, the addition is
   ignored.

2. **No Positional Indexing**: Sets have no concept of "first element", "second
   element", or "index 4". You cannot call ``set.get(0)``.

3. **High-Speed Membership Testing**: While determining whether an element exists
   in a ``List<E>`` requires scanning up to all $N$ elements via linear search
   ($O(N)$), a ``HashSet<E>`` checks membership via hashing in **$O(1)$ constant
   time**.

Concrete Implementations: `HashSet` vs. `TreeSet`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Like ``Map``, ``Set<E>`` is an interface implemented by concrete classes:

* ``java.util.HashSet<E>``: Stores elements using a hash table. Provides $O(1)$
  insertions, deletions, and membership checks. Does not maintain any predictable
  iteration order. **This is our standard choice.**

* ``java.util.TreeSet<E>``: Stores elements in a balanced binary search tree.
  Maintains elements in sorted natural order (e.g., ascending alphabetical or
  numerical order) with $O(\log N)$ performance.

Core Set Operations
~~~~~~~~~~~~~~~~~~~

The ``Set<E>`` interface provides an intuitive collection API:

.. code-block:: java

   public boolean add(E element);      // Adds element; returns true if added, false if duplicate
   public boolean contains(Object o);  // Returns true if element is present in O(1) time
   public boolean remove(Object o);    // Removes element; returns true if present
   public int size();                  // Returns count of unique elements
   public boolean isEmpty();           // Returns true if size() == 0
   public void clear();                // Removes all elements

Using a `HashSet`
~~~~~~~~~~~~~~~~~

Consider managing unique tags on library books or tracking active student
usernames:

.. code-block:: java

   Set<String> activeUsers = new HashSet<>();

   // Adding elements
   activeUsers.add("edwards");
   activeUsers.add("alovelace");
   activeUsers.add("aturing");

   // Attempting to add a duplicate element
   boolean wasAdded = activeUsers.add("edwards");
   System.out.println("Was duplicate added? " + wasAdded); // prints false
   System.out.println("Active user count: " + activeUsers.size()); // prints 3

   // Testing membership in O(1) time
   if (activeUsers.contains("alovelace"))
   {
       System.out.println("Ada Lovelace is currently active.");
   }

   // Iterating with enhanced for-each
   for (String user : activeUsers)
   {
       System.out.println("User: " + user);
   }

Practical Application: Tracking Visited Nodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most vital uses of a ``Set`` in computer science is **cycle detection
and path tracking**. When traversing interconnected networks—such as web
crawlers visiting hyperlinks, GPS routing algorithms navigating road maps, or
autonomous agents wandering through connected spaces—it is easy to get trapped in
infinite loops if you revisit a location you have already explored.

By storing visited location identifiers in a ``Set<String>``, an algorithm can
check ``visited.contains(locationId)`` in $O(1)$ time to avoid cyclic traps:

.. code-block:: java

   Set<String> visitedLocations = new HashSet<>();

   public void visit(String locationId)
   {
       if (visitedLocations.contains(locationId))
       {
           System.out.println("You have already visited " + locationId);
       }
       else
       {
           System.out.println("Exploring new area: " + locationId);
           visitedLocations.add(locationId);
       }
   }


Eliminating `if-else` Chains with Map Lookups
---------------------------------------------

In Chapter 11, we explored the **Command design pattern** and text command
interpreters. In that chapter, our interpreter parsed incoming command words
using a cascading ``if/else-if`` conditional ladder:

.. code-block:: java

   // The Cascading if/else-if Anti-Pattern from Chapter 11
   public void interpretSingleCommand(String verb)
   {
       if (verb.equals("status"))
       {
           statusCommand.execute();
       }
       else if (verb.equals("temp"))
       {
           tempCommand.execute();
       }
       else if (verb.equals("light"))
       {
           lightCommand.execute();
       }
       else
       {
           System.out.println("Unrecognized command: " + verb);
       }
   }

In Chapter 11, we labeled this structure an **architectural anti-pattern**. While
functional for introductory exercises with three commands, it exhibits three
critical flaws:

1. **Violation of the Open/Closed Principle**: To add a new command, you must
   cut open the parser class and modify its internal code, risking regressions.

2. **Code Bloat**: In systems with 30, 50, or 100 commands, the interpreter
   explodes into a multi-thousand-line monolithic block that is painful to read,
   maintain, and test.

3. **Linear Performance Degradation**: Java evaluates branches sequentially from
   top to bottom. The 50th command requires 50 string comparisons before executing.

The Map-Based Command Registry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now that you understand associative collections, we can deliver the elegant,
professional solution foreshadowed in Chapter 11: **replacing conditional ladders
with a Map-driven command registry**.

Instead of hardcoding command decisions into an ``if/else-if`` chain, the
interpreter maintains a:

.. code-block:: java

   Map<String, Command> commands = new HashMap<>();

In this structure:

* The **key** is the command word string (e.g., ``"status"``, ``"temp"``,
  ``"light"``).

* The **value** is an object implementing the ``Command`` interface that
  encapsulates the behavior to execute.

Registering Commands Dynamically
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

During initialization, the interpreter populates the registry by registering
command instances:

.. code-block:: java

   public class CommandInterpreter
   {
       private Map<String, Command> commands;

       public CommandInterpreter(Thermostat thermostat, SmartLight light)
       {
           commands = new HashMap<>();

           // Register command words mapping directly to Command objects
           commands.put("status", new StatusCommand(thermostat, light));
           commands.put("temp", new TemperatureCommand(thermostat));
           commands.put("light", new LightCommand(light));
       }

       public void registerCommand(String verb, Command command)
       {
           commands.put(verb.toLowerCase(), command);
       }
       ...
   }

Executing via Map Lookup
~~~~~~~~~~~~~~~~~~~~~~~~

With the map in place, the entire multi-page conditional ladder collapses into
just **three lines of code**:

.. code-block:: java

   public void interpretSingleCommand(String verb)
   {
       Command cmd = commands.get(verb.toLowerCase());

       if (cmd != null)
       {
           cmd.execute();
       }
       else
       {
           System.out.println("Unrecognized command: " + verb);
       }
   }

Look closely at how this works:

1. ``commands.get(verb.toLowerCase())`` performs an immediate $O(1)$ hash table
   lookup.

2. If the command word is registered, ``get()`` returns the corresponding
   ``Command`` object, and ``cmd.execute()`` polymorphically triggers the action.

3. If the command word is unrecognized, ``get()`` returns ``null``, and the
   ``else`` branch cleanly notifies the user.

Architectural Comparison
~~~~~~~~~~~~~~~~~~~~~~~~

| Criterion | Cascading `if/else-if` Ladder | Map-Driven Command Registry |
| :--- | :--- | :--- |
| **Open/Closed Principle** | **Violated**: Adding a command requires editing parser source code. | **Satisfied**: New commands are registered dynamically without touching parser code. |
| **Time Complexity** | $O(N)$ linear search through all branch conditions. | $O(1)$ constant-time hash table lookup. |
| **Code Length** | Grows linearly ($+5$ to $+10$ lines per command). | Constant size: exactly one lookup regardless of command count. |
| **Coupling** | High: Parser is coupled to every concrete action. | Low: Parser depends only on the generic ``Command`` interface. |
| **Dynamic Configuration** | Impossible: Commands are hardcoded at compile time. | Simple: Commands can be added, disabled, or rebound at runtime. |


Modeling Spatial Worlds: Interconnected Locations and Pathway Maps
------------------------------------------------------------------

In Chapter 10, we modeled two-dimensional spaces using 2D arrays (like a grid of
pixels in an image or rows and columns on a game board). 2D arrays are ideal when
every location has a fixed, uniform geometric coordinate $(row, col)$ and
neighbors are strictly adjacent in a rectangular matrix.

However, many virtual worlds—such as university campuses, museum gallery wings,
transit networks, and interactive environments—do not conform to a rigid
rectangular grid:

* Some buildings have only a single main entrance.
* Others have pathways leading across a courtyard, through an underground tunnel,
  or over an elevated skybridge.

* Express walkways might connect distant parts of campus directly without
  passing through intermediate locations.

* Some connections are one-way (such as turnstiles or security gates).

Such non-grid spatial topologies are known mathematically as **directed graphs**,
where individual locations are **nodes** (vertices) and the pathways between them
are **edges**.

Representing Spatial Connections with `Map<String, CampusLocation>`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How do we model an arbitrary spatial graph in object-oriented Java?

Consider an interactive digital campus tour guide. We can design a
``CampusLocation`` class where each location encapsulates its own **pathway map**:

.. code-block:: java

   public class CampusLocation
   {
       private String name;
       private String description;
       private Map<String, CampusLocation> pathways;

       public CampusLocation(String name, String description)
       {
           this.name = name;
           this.description = description;
           this.pathways = new HashMap<>();
       }

       public String getName()
       {
           return name;
       }

       public String getDescription()
       {
           return description;
       }

       public void connectLocation(String pathwayName, CampusLocation destination)
       {
           pathways.put(pathwayName.toLowerCase(), destination);
       }

       public CampusLocation getDestination(String pathwayName)
       {
           return pathways.get(pathwayName.toLowerCase());
       }
   }

In this design:

* The **key** is the pathway name or directional label entered by the user
  (e.g., ``"bridge"``, ``"tunnel"``, ``"quad"``, ``"north"``).

* The **value** is a reference to the neighboring ``CampusLocation`` reached by
  following that path.

Connecting Locations into a Spatial Topology
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Creating a virtual campus world simply requires instantiating the locations and
linking their pathways:

.. code-block:: java

   // 1. Create the campus locations
   CampusLocation library = new CampusLocation(
       "Newman Library", "a six-story hub of study spaces and media labs");
   CampusLocation studentCenter = new CampusLocation(
       "Squires Center", "a lively student union with dining and music venues");
   CampusLocation drillfield = new CampusLocation(
       "The Drillfield", "a vast open oval lawn crisscrossed with walking paths");

   // 2. Link pathways between locations
   library.connectLocation("plaza", studentCenter);
   studentCenter.connectLocation("plaza", library);

   library.connectLocation("walkway", drillfield);
   drillfield.connectLocation("walkway", library);

   studentCenter.connectLocation("bridge", drillfield);
   drillfield.connectLocation("bridge", studentCenter);

Notice the flexibility of this model:

* If a visitor is at ``Newman Library`` and chooses ``"plaza"``,
  ``library.getDestination("plaza")`` returns the ``Squires Center``.

* If a visitor asks for ``"tunnel"`` while at the library,
  ``library.getDestination("tunnel")`` safely returns ``null`` because no tunnel
  connection was registered.

* Adding an underground pedestrian tunnel or a new academic building requires
  calling ``connectLocation()``—no existing location code needs modification!

Dynamically Formatting Available Pathways
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the pathways are stored in a map, a location can inspect its own
``keySet()`` to dynamically display all available travel options to the user:

.. code-block:: java

   public String listAvailablePathways()
   {
       StringBuilder sb = new StringBuilder("Available pathways:");
       for (String pathway : pathways.keySet())
       {
           sb.append(" ").append(pathway);
       }
       return sb.toString();
   }

If the library connects via the plaza and the walkway, ``listAvailablePathways()``
outputs: ``"Available pathways: plaza walkway"``. If you later add a ``"skybridge"``,
the method automatically includes it without any code modifications.


Case-Insensitive String Keys & Normalization
--------------------------------------------

When human beings interact with software, they type text using unpredictable
casing:

* One user types ``"bridge"``.
* Another user types ``"Bridge"`` with standard capitalization.
* A third user types ``"BRIDGE"`` with Caps Lock enabled.
* A fourth user might type ``"  bridge  "`` with inadvertent leading or trailing
  spaces.

In English, all four inputs convey identical meaning. But in Java, **string keys
are case-sensitive and character-exact**:

.. code-block:: java

   "bridge".equals("Bridge")  // FALSE!
   "bridge".hashCode()       // -1379965416
   "Bridge".hashCode()       // 1999805960

Because a ``HashMap`` locates entries by evaluating ``hashCode()`` and
``.equals()``, querying a map holding the key ``"bridge"`` with the string
``"Bridge"`` will fail:

.. code-block:: java

   Map<String, CampusLocation> paths = new HashMap<>();
   paths.put("bridge", studentCenter);

   CampusLocation loc1 = paths.get("bridge"); // returns studentCenter
   CampusLocation loc2 = paths.get("Bridge"); // returns null! Lookup failed!

The Normalization Rule: "Normalize on Entry, Normalize on Lookup"
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To guarantee robust, defect-free retrieval, professional software systems follow
the **Key Normalization Rule**:

.. note::

   **The Key Normalization Rule**: Always normalize string keys to a uniform
   canonical form (typically all lowercase with trimmed whitespace) **both when
   inserting into a map and when querying a map**.

Java's ``String`` class provides two essential methods for this purpose:

1. ``.toLowerCase()``: Converts all uppercase characters to lowercase.
2. ``.trim()``: Strips all leading and trailing whitespace.

We implement this rule defensively inside our domain classes:

.. code-block:: java

   public class CampusLocation
   {
       private Map<String, CampusLocation> pathways = new HashMap<>();

       public void connectLocation(String pathwayName, CampusLocation destination)
       {
           if (pathwayName != null && destination != null)
           {
               // Normalize on entry:
               pathways.put(pathwayName.trim().toLowerCase(), destination);
           }
       }

       public CampusLocation getDestination(String pathwayName)
       {
           if (pathwayName == null)
           {
               return null;
           }
           // Normalize on lookup:
           return pathways.get(pathwayName.trim().toLowerCase());
       }
   }

With these defensive normalization guards in place:

.. code-block:: java

   location.connectLocation("BRIDGE", studentCenter); // Stored internally as "bridge"

   location.getDestination("bridge");          // returns studentCenter
   location.getDestination("Bridge");          // returns studentCenter
   location.getDestination("  BRIDGE  ");      // returns studentCenter

Every variant reliably resolves to the identical destination, creating a smooth,
forgiving user experience.


Testing Map-Driven Systems with `TestCase`
------------------------------------------

Automated testing is crucial when working with maps. Because maps return ``null``
on lookup misses rather than throwing exceptions, subtle defects—such as casing
mismatches, missing registrations, or unintended key overwrites—can easily go
unnoticed unless exercised by thorough test suites.

In CS 1114, automated unit tests are written in test classes extending
``TestCase`` (from the ``student`` package). BlueJ creates new test classes using
templates with the proper import (``import student.TestCase;``) already
configured, so we always write **public class ... extends TestCase**
without package qualification.

Let us write a comprehensive test suite verifying the behavior of our
``CampusLocation`` navigation system and a map-driven command interpreter.

Testing Campus Navigation Pathways
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A robust test class for ``CampusLocation`` must verify:

1. Setting and retrieving connections with standard lowercase pathway names.
2. Case-insensitivity and whitespace trimming (verifying uppercase, mixed-case,
   and padded lookups).

3. Querying nonexistent pathways safely returning ``null``.
4. Guarding against ``null`` lookup arguments without throwing exceptions.
5. Overwriting a pathway with a new destination.
6. Pathway listing via ``listAvailablePathways()``.

.. code-block:: java

   public class CampusLocationTest extends TestCase
   {
       private CampusLocation library;
       private CampusLocation studentCenter;
       private CampusLocation drillfield;

       /**
        * Sets up the test fixture before each test method runs.
        */
       public void setUp()
       {
           library = new CampusLocation("Library", "study spaces");
           studentCenter = new CampusLocation("Student Center", "dining halls");
           drillfield = new CampusLocation("Drillfield", "open lawn");

           library.connectLocation("plaza", studentCenter);
           library.connectLocation("walkway", drillfield);
       }

       /**
        * Verifies successful destination retrieval with standard lowercase keys.
        */
       public void testGetDestinationStandard()
       {
           assertEquals(studentCenter, library.getDestination("plaza"));
           assertEquals(drillfield, library.getDestination("walkway"));
       }

       /**
        * Verifies that getDestination is case-insensitive and trims whitespace.
        */
       public void testGetDestinationCaseInsensitive()
       {
           assertEquals(studentCenter, library.getDestination("PLAZA"));
           assertEquals(studentCenter, library.getDestination("Plaza"));
           assertEquals(drillfield, library.getDestination("  WALKWAY  "));
       }

       /**
        * Verifies that querying a nonexistent pathway returns null.
        */
       public void testGetDestinationNonexistent()
       {
           assertNull(library.getDestination("tunnel"));
           assertNull(library.getDestination("skybridge"));
       }

       /**
        * Verifies that null queries safely return null without throwing an exception.
        */
       public void testGetDestinationNullKey()
       {
           assertNull(library.getDestination(null));
       }

       /**
        * Verifies that re-connecting a pathway overwrites the previous destination.
        */
       public void testConnectLocationOverwrite()
       {
           CampusLocation bookstore = new CampusLocation("Bookstore", "merchandise");
           library.connectLocation("plaza", bookstore);

           assertEquals(bookstore, library.getDestination("plaza"));
       }

       /**
        * Verifies that listAvailablePathways outputs all registered pathway labels.
        */
       public void testListAvailablePathways()
       {
           String pathways = library.listAvailablePathways();

           assertTrue(pathways.contains("plaza"));
           assertTrue(pathways.contains("walkway"));
           assertFalse(pathways.contains("tunnel"));
       }
   }

Testing Map-Driven Command Interpreters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When testing a command interpreter powered by ``Map<String, Command>``, you
verify that valid command words invoke receiver actions while unknown command
words trigger default fallbacks:

.. code-block:: java

   public class CommandInterpreterTest extends TestCase
   {
       private Thermostat thermostat;
       private SmartLight light;
       private CommandInterpreter interpreter;

       public void setUp()
       {
           thermostat = new Thermostat(70);
           light = new SmartLight();
           interpreter = new CommandInterpreter(thermostat, light);
       }

       /**
        * Tests executing a registered command via the map dispatcher.
        */
       public void testValidCommandExecution()
       {
           assertFalse(light.isOn());

           interpreter.interpretSingleCommand("light on");
           assertTrue(light.isOn());

           interpreter.interpretSingleCommand("light off");
           assertFalse(light.isOn());
       }

       /**
        * Tests case-insensitive command verb dispatch.
        */
       public void testCommandVerbCasing()
       {
           interpreter.interpretSingleCommand("TEMP 74");
           assertEquals(74, thermostat.getTargetTemperature());

           interpreter.interpretSingleCommand("Temp 68");
           assertEquals(68, thermostat.getTargetTemperature());
       }

       /**
        * Tests unrecognized command words gracefully fall back without crashing.
        */
       public void testUnrecognizedCommand()
       {
           // Should output error message without throwing exception:
           interpreter.interpretSingleCommand("jump");
           assertEquals(70, thermostat.getTargetTemperature());
           assertFalse(light.isOn());
       }
   }

Notice how clean, fast, and deterministic these unit tests are. Because our
classes rely on encapsulated maps and clean interfaces, every execution path can
be verified with high-speed assertions in BlueJ and Web-CAT.


Programming Practice 12
-----------------------

.. extrtoolembed:: 'Programming Practice 12'
   :workout_id: 1594


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
