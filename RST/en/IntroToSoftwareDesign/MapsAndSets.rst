.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Maps and Sets
=============

The Map and Set Interfaces
--------------------------

So far, we have use the ``List`` interface as the basic form of container
in Java. However, two additional interfaces that define containers with
different properties are ``Map`` and ``Set``.
The ``Map`` and ``Set`` interfaces are similar to ``List``
in that there are multiple classes in the ``java.util`` collections framework
that implement them. The main difference is that they organize values
differently, which means that you add and access values differently.


The Map Interface
-----------------

The ``Map<K, V>`` interface is modeled after looking up definitions for words
in a dictionary. In computer science, you will hear people refer to these
kinds of "look up" structures using names like "map", "dictionary", 
"hash", or even "associative array". You can think of a map as a collection
of *pairs* of elements that are associated with each other. A pair consists
of a **key** that corresponds to a value you can look up, and
a **value** corresponding to the result you will find when you look up its
key. If you think of a dictionary of words, for example, each entry in the
dictionary consists of a "word" and its "definition". We would call the "word"
a "key", and its definition would be a "value", and the dictionary itself is
a collection of pairs of keys and values (words and definitions). You will
sometimes hear the elements in a map referred to as a **key-value pair**
because it contains pairs of connected values.
 
Pairs can be added to maps and can be removed from maps. Maps cannot
have distinct pairs with the same keys; if you attempt to add a pair to a map
that already contains a pair with the same key, the second pair will replace
the first.

The ``Map<K, V>`` interface defines the map operations. It takes two separate
generic type parameters: ``K`` is the
type parameter specifying the key type, and ``V`` is the type parameter
specifying the value type.  For example ``K`` could be ``Integer`` and a
``V`` could be ``String``.  Or ``K`` and ``V`` could both be ``Boolean``.
Or ``K`` could be ``Jeroo`` and ``V`` could be ``List<Flower>``.  There are no
limits on possible combinations!

The most important ``Map`` operations are:

.. code-block:: java

   public boolean put(K key, V val);       // store a given key,value pair
   public V get(Object key);               // get the value associated with given key
   public boolean remove(Object key);      // remove key,value pair for given key
   public boolean containsKey(Object key); // determine whether key exists in Map
   public Set<K> keySet();                 // return the set of keys


Classes that Implement ``Map``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``HashMap`` and ``TreeMap`` are two classes in the ``java.util`` collections
framework that implement the ``Map`` interface.  They both provide
fast operations to look up a key in a map. They also
provide quick insertion of a pair into the map or removal of a
pair from a map. For large volumes of data, both are much, much faster
at lookup tasks than storing items in a ``List`` or an array. 
For new programmers, we usually use ``HashMap`` as the
default choice when we create new maps, similar to choosing ``ArrayList``
as the default choice for new ``List`` objects. The ``HashMap`` class
works well in most cases.

One situation when you would prefer to use ``TreeMap`` is when you would
like to iterate over all the keys in the map in **sorted order**. For example,
in a dictionary, you might expect words to be stored in alphabetical order,
and in a phone book, you might expect names to be stored in alphabetical order.
If keys have a natural ordering, the ``TreeMap`` class will use this order
when iterating over keys, although his can slightly impact the overall
performance of the map by a small amount. The ``HashMap`` does not keep keys
in any predictable order.


Using a ``Map``
~~~~~~~~~~~~~~~

Let’s think about a simple example for using a map data structure.
Suppose that a programmer is developing an application for a large
company for maintaining a no–call list. The programmer wishes to
store pairs of names and phone numbers. We could represent both using
strings, so we could use a ``Map<String, String>`` to store these
pairs. The resulting map will act sort of like a phone book, associating
names (keys) with phone numbers (values) in pairs.

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();
   }


Syntax Practice: Making Maps
----------------------------

.. 3 CW exercises practicing making Maps of different type combinations
.. extrtoolembed:: 'Syntax Practice: Making Maps'
   :workout_id: 1588


Adding and Accessing Pairs in a Map
-----------------------------------

Now, lets add some values to our ``noCallMap``.  To add something to
a Map, we'll call the ``put()`` method:

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put("Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");
   }

``put()`` takes in two parameters: first a key, and then an associated value.
The two calls to ``put()`` above create two key-value pairs, each with a name
and a phone number.

To access those pairs, we use the ``get()`` method:

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put(Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       System.out.print("Jane Q's number is: " + noCallMap.get("Jane Q"));
   }

When we run the code above, the following message would be printed out:

.. raw:: html

   <pre>"Jane Q's number is: 999-777-1234"</pre>


Syntax Practice: Adding to Maps
-------------------------------

.. 3 CW exercises practicing adding values to a map
.. extrtoolembed:: 'Syntax Practice: Adding to Maps'
   :workout_id: 1589


Checking for and Removing Pairs in a Map
----------------------------------------

As you saw with ``get()``, when accessing values in a map, you usually use
the key to specify which pair you wish to work on. In fact, sometimes one
might say "index into a map" using a key. The alternate name of "associative
array" comes from the fact that a map uses keys as unique identifiers for the
pairs it contains, and you can think of the key as being similar to the
"position" of a pair in a map, just like numeric positions are used to
refer to positions in a ``List``.

So when checking to see if a pair is stored in a map, or to remove the pair
from the map, it is natural to use the key as the identifier. Maps provide
a ``remove()`` method where you specify a key, and the pair with that key
will be removed from the map. Maps also provide a ``contains()`` method that
takes a key value and returns a boolean result indicating whether a pair
with the corresponding key is present in the map. For both of these operations,
since keys must be unique in a map, we really only need a key.

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put(Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       noCallMap.remove("Jane Q");
       System.out.print(noCallMap.contains("Jane Q"));
   }

Here, we add "Jane Q" and her phone number to the Map, remove it, then the value ``false``
would be printed out as there is no longer a key called "Jane Q" in our Map.

A Visual Summary of Using Map and HashMap
-----------------------------------------

.. raw:: html

   <div class="align-center" style="margin-top:1em;">
   <iframe width="560" height="315" src="https://www.youtube.com/embed/H62Jfv1DJlU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
   </div>


Syntax Practice: Map Contains and Remove
----------------------------------------

.. 3 CW exercises practicing using contains and remove
.. extrtoolembed:: 'Syntax Practice: Map Contains and Remove'
   :workout_id: 1590


Looping Over Map Contents
-------------------------

As mentioned above, keys are unique, and maps provide a method to get the
full set of all keys they contain. This method is called ``keySet()`` and
it returns a ``Set`` of key values--the ``Set`` interface is discuseed next.

Because the ``keySet()`` method returns a collection of all the keys in
the map, it is commonly used in looping over the entire map:

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put(Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       for (String name : noCallMap.keySet())
       {
           System.out.println("name: " + name
               + ", phone: " + noCallMap.get(name));
       }
   }

This method would print out the entire contents of the map by using a
for-each loop over the set of all keys in the map. This approach to
writing a for-each loop over a map is a great place for beginners to start.

More advanced programmers may also use a for-each loop, but might wish
to loop over all the **pairs** in the map, instead of just the keys. This
is a bit more complicated, due to the type used to represent pairs in
a map. The ``Map`` interface provides a nested class called ``Map.Entry``
that represents one *entry* or pair in the map. The ``Map`` interface
also provides a method called ``entrySet()`` that is similar to ``keySet()``,
but provides a collection of all the entries (pairs) in the map. You can
use ``entrySet()`` to write a more advanced loop that looks like this:

.. code-block:: java

   public void testMap()
   {
       Map<String, String> noCallMap = new HashMap<String, String>();

       noCallMap.put(Roger M", "090−997−2918");
       noCallMap.put("Jane Q", "999-777-1234");

       for (Map.Entry<String, String> pair : noCallMap.entrySet())
       {
           System.out.println("name: " + pair.getKey(),
               + ", phone: " + pair.getValue());
       }
   }

Writing a loop using ``keySet()`` is usually simpler. However, it
requires calling ``get()`` to retrieve the value associated with each
key. Writing a loop using ``entrySet()`` is a little more complex, but
because it provides access to both the key and the value at the same
time without having to look up anything in the map, it is much more
efficient when both the key and value are needed inside the loop.


Check Your Understanding: Maps
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week13Quiz2Summ.html ka
   :long_name: Maps


The Set Interface
-----------------

The Set interface is modeled after the *set theory* principles taught in
mathematics. In mathematics, sets are a collection of elements--oftentimes
with some amount of common properties.
A set is a collection that represents a mathematical set.
There are three important properties of a set:

* The same element value may only occur once in a set.

* The order in which the elements of a set appear (when iterating through the
  elements) is typically different than the order in which the elements were added.
  Two sets that have the same elements listed in different orders are considered
  to be the same set.

In computer science and in Java, data structures that model sets are
designed for large collections of data. Such data structures have a
method that determines if an object is in a given set with an
efficient algorithm. For large data sets, using such a method is much
faster than iterating through a list.


Classes that Implement ``Set``
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``TreeSet`` and ``HashSet`` are two classes in the collections
framework that implement the ``Set`` interface.  They both provide
fast operations to check whether an element is in a set. They also
provide quick insertion of an element into the set or removal of an
element from a set. For large sets—those having at least several
thousand elements—where there are large numbers of insertions,
deletions, and tests for whether elements are in a set, Lists would
be much slower. Just like for maps, ``TreeSet`` guarantees that it will
iterate over its values in their natural order, while ``HashSet`` does
not maintain any ordering.

The ``Set<E>`` interface, which is a subclass of ``Collection<E>``
(just like ``List<E>``), describes the operations that all sets provide.
Here are are the three most important set operations:

.. code-block:: java

   boolean add(E element);         // add an element to the set
   boolean contains(Object o);     // does the set contain given object?
   boolean remove(Object o);       // remove given object from the set


Using a Set
~~~~~~~~~~~

Let’s think about a simple example for using a set data structure.
Let's return to our no-call list example.
Suppose that a programmer is developing an application for a large
company for maintaining a no–call list. The programmer has decided to
use the ``TreeSet`` data structure to store a series of ``PhoneRecord`` objects.

The ``PhoneRecord`` class looks like this:

.. code-block:: java

   public class PhoneRecord
   {
       public String name;
       public String phoneNumber;

       public PhoneRecord(String initName, String initNumber)
       {
           this.name = initName;
           this.phoneNumber = initNumber;
       }
   }


A TreeSet seems to be an appropriate structure for this problem, since
the main use of the data will be to test whether records are in the set.

The programmer would first need to create a ``Set`` variable to contain
our ``PhoneRecord`` objects:

.. code-block:: java

   public void testSet()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();
   }


Syntax Practice: Making A Set
-----------------------------

.. 3 CW exercises making sets of different types
.. extrtoolembed:: 'Syntax Practice: Making A Set'
   :workout_id: 1584


Adding Values to a Set
----------------------

Now, lets add some records to our ``Set``:

.. code-block:: java

   public void testSet()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

       // making PhoneRecord and adding to set
       PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
       noCall.add(roger);
   }

In the code above, we make a ``PhoneRecord`` object
called ``roger`` and then add it to our set.  We could also add an object
directly to the set without using a separate variable:

.. code-block:: java

   noCall.add(new PhoneRecord("Stacy K", "090−997−9188"));

Importantly, adding the same object to a set multiple times won't cause any
errors in your code.  Only the first call will actually add the object to the
set, however.

.. code-block:: java

   public void testSet()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

       PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
       noCall.add(roger);

       // Running a second time won't do anything
       // but also won't cause errors:
       noCall.add(roger);
   }

Just as with lists, you must make sure the item added is the same type as the
type in your angle brackets(``<>``).  For example we could not simply add the
number ``1`` to the set ``noCall``.


Syntax Practice: Adding to a Set
--------------------------------

.. 3 CW exercises adding values to existing sets
.. extrtoolembed:: 'Syntax Practice: Adding to a Set'
   :workout_id: 1585



Checking Values in a Set
------------------------

The second important method for a set is ``contains()``.  This method takes
a value and returns
``true`` if the value is in the set or ``false`` if not.

.. code-block:: java

   public void testSet()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

       PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
       noCall.add(roger);

       boolean inside = noCall.contains(roger);
       System.out.println("It is " + inside + " that Roger is in the set");
   }

If we ran the code above, the following message would be output:

.. raw:: html

   <pre>"It is true that Roger is in the set"</pre>

However, if we created another ``PhoneRecord`` object but **did not** add
it to the set...

.. code-block:: java

   public void testSet()
   {
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      PhoneRecord jane = new PhoneRecord("Jane Q", "999-777-1234");

      boolean inside = noCall.contains(jane);
      System.out.println("It is " + inside + " that Jane is in the set");
   }

This method would output the following message:

.. raw:: html

   <pre>"It is false that Jane is in the set</pre>


Syntax Practice: Set Contains
-----------------------------

.. 3 CW exercises practicing contains
.. extrtoolembed:: 'Syntax Practice: Set Contains'
   :workout_id: 1586


Removing Values from a Set
--------------------------

The final important method on a set is ``remove()``, which removes something
from a set.

.. code-block:: java

   public void testSet()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

       PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
       noCall.add(roger);

       boolean inside = noCall.contains(roger);
       System.out.println("It is " + inside + " that Roger is in the set");

       noCall.remove(roger);
       inside = noCall.contains(roger);
       System.out.println("It is " + inside + " that Roger is in the set");
   }

We can see above that we added the ``PhoneRecord`` called ``roger``
to ``noCall``. We then print out:

.. raw:: html

   <pre>"It is true that Roger is in the set"</pre>

We then remove ``roger``` from the set and then print out:

.. raw:: html

   <pre>"It is false that Roger is in the set"</pre>


Syntax Practice: Set Remove
---------------------------

.. 3 CW exercises practicing remove
.. extrtoolembed:: 'Syntax Practice: Set Remove'
   :workout_id: 1587


Looping Over Sets
-----------------

Iterating over a set is easiest if you use a for-each loop, and is virtually
identical to using a for-each loop over a list.

.. code-block:: java

   public void testMap()
   {
       Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

       // insert records into the set

       for (PhoneRecord record : noCall)
       {
           System.out.println("name: " + record.getName()
               + ", phone: " + record.getPhoneNumber());
       }
   }

This method would print out the entire contents of the set by using a
for-each loop over all of the elements in the set.


Check Your Understanding: Sets
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week13Quiz1Summ.html ka
   :long_name: Sets


Programming Practice: Maps
--------------------------

.. extrtoolembed:: 'Programming Practice: Maps'
   :workout_id: 1594
