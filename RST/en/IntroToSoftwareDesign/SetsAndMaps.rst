.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Sets and Maps
=============



The Set and Map Interface
-------------------------

The ``Set`` and ``Map`` interfaces are similar to the List interface
in that there are multiple classes in the collections framework that
implement them.

Using the ``Set`` Interface
~~~~~~~~~~~~~~~~~~~~~~~~~~~
The Set interface is modeled after the *set theory* principles taught in
mathematics. In mathematics, sets are a collection of elements -
oftentimes with some amount common properties.
A set is a collection which represents a mathematical set.
There are three important properties of a set:

* The same element value may only occur once in a set

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
be much slower.

The Set<E> interface, which is a subclass of Collection<E>, describes the important operations. Here are are the three most important set operations:

.. code-block:: java

   boolean add(E element);         // add an element to the set
   boolean contains(Object o);     // does the set contain given object?
   boolean remove(Object o);       // remove given object from the set




Using a ``Set``
~~~~~~~~~~~~~~~

Let’s think about a simple example for using a set data structure.
Suppose that a programmer is developing an application for a large
company for maintaining a no–call list. The programmer has decided to
use the ``TreeSet`` data structure to store a series of ``PhoneRecord`` objects.

The ``PhoneRecord`` class looks like this:


.. code-block:: java

   public class PhoneRecord{

      public String name;
      public String phoneNumber;

      public PhoneRecord(String initName, String initNumber){
        this.name = initName;
        this.phoneNumber = initNumber;
      }
   }


A TreeSet seems to be an appropriate structure for this problem, since
the main use of the data will be to test whether names are in the set.

The programmer would first need to create a Set variable to contain our ``PhoneRecord`` objects:


.. code-block:: java

   public void testSet(){
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();
   }

You can try it yourself here:


//3 CW exercises making sets of different types

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525


Now, lets add some records to our Set:

.. code-block:: java

   public void testSet(){
      //creating the noCall
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      //making PhoneRecord and adding to set
      PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
      noCall.add(roger);
   }


In the code above, we added to our method by making a ``PhoneRecord`` object
called ``roger`` then adding it to our set.  We could also add an object
directly to the set by running:

.. code-block:: java

   noCall.add(new PhoneRecord("Stacy K", "090−997−9188"));

Importantly, adding the same object to a set multiple times won't cause any errors
in your code.  Only the first call will actually add the object to the set, however.


.. code-block:: java

   public void testSet(){
      //creating the noCall
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      //making PhoneRecord and adding to set
      PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
      noCall.add(roger);

      //Running a second time won't do anything
      //but also won't cause errors:
      noCall.add(roger);
   }

//3 CW exercises adding values to existing sets

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525



Just like lists as well, you must make sure the item added is the same type as the type
in your angle brackets(``<>``).  For example we could not simply add the number ``1`` to
the set ``noCall``.


The second important method for a set is ``contains()``.  This will return
``true`` if the value is in the set and ``false`` if not.


.. code-block:: java

   public void testSet(){
      //creating the noCall
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      //making PhoneRecord and adding to set
      PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
      noCall.add(roger);

      boolean inside = noCall.contains(roger);
      System.out.println("It is "+inside+ " that Roger is in the set");
   }


If we ran the code above, the following message would be output:
``"It is true that Roger is in the set"``

However, if we created another ``PhoneRecord`` object but **did not** add
it to the set...

.. code-block:: java

   public void testSet(){
      //creating the noCall
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      //making PhoneRecord and adding to set
      PhoneRecord jane = new PhoneRecord("Jane Q", "999-777-1234");

      boolean inside = noCall.contains(jane);
      System.out.println("It is "+inside+ " that Jane is in the set");
   }

This method would output the following message:
``"It is false that Jane is in the set"``

//3 CW exercises practicing contains

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525

The final important method on a Set is ``remove`` which removes something from a set

.. code-block:: java

   public void testSet(){
      //creating the noCall
      Set<PhoneRecord> noCall = new TreeSet<PhoneRecord>();

      //making PhoneRecord and adding to set
      PhoneRecord roger = new PhoneRecord("Roger M", "090−997−2918");
      noCall.add(roger);

      boolean inside = noCall.contains(roger);
      System.out.println("It is "+inside+ " that Roger is in the set");

      noCall.remove(roger);
      inside = noCall.contains(roger);
      System.out.println("It is "+inside+ " that Roger is in the set");
   }


We can see above that we added the ``PhoneRecord`` called ``roger`` to ``noCall``
We then print out

``"It is true that Roger is in the set"``

just as we saw before.  However then we remove roger from the set and then print out:

``"It is false that Roger is in the set"``

//3 CW exercises practicing remove

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525


Check Your Understanding: Sets
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week13Quiz1Summ.html ka
   :long_name: Sets


Using the ``Map<K, V> Interface
-------------------------------

The ``Map<K,V>`` interface is modeled after looking up definitions for words
in a dictionary. In computer science, maps are considered to be a collection
of pairs of elements. A pair consists of a **key** that corresponds to a word
being looked up and a **value** corresponding to the definition of the word.


Pairs can be added to maps and can be removed from maps. Maps cannot
have distinct pairs with the same keys; if you attempt to add a pair to a map
that already contains a pair with the same key, the second pair will replace
the first.

The ``Map<K, V>`` interface defines the map operations. (``K`` is the
type parameter specifying the key type, and ``V`` is the type parameter
specifying the value type).  For example a Key could be an integer and a
Value could be a string.  Or Key and Value could both be booleans.  Or Key could
be a ``Jeroo`` object and ``Value`` a ``Pixel`` object.  There are no limits on
possible combinations!

The most important ``Map`` operations are:

.. code-block:: java

   public boolean put(K key, V val);       // store a given key,value pair
   public V get(Object key);               // get the value associated with given key
   public boolean remove(Object key);      // remove key,value pair for given key
   public boolean containsKey(Object key); // determine whether key exists in Map
   public Set<K> keySet();                 // return the set of keys

Using a ``Map``
~~~~~~~~~~~~~~~

Let's revisit the example above.  The ``PhoneRecord`` class only contains two pieces
of data in each object, a name and a phone number.  Instead of creating a ``PhoneRecord``
object, we could use a Map where both Key and value are Strings:

.. code-block:: java

   public void testMap(){
      Map <String, String> noCallMap = new TreeMap<String, String>();

   }

//3 CW exercises practicing making Maps of different type combinations

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525


Now, lets add some values to our ``noCallMap``.  This time, to add something to
a Map, we'll call the ``put`` method:

.. code-block:: java

   public void testMap(){
      Map <String, String> noCallMap = new TreeMap<String, String>();

      noCallMap.put("Roger M", "090−997−2918");
      noCallMap.put("Jane Q", "999-777-1234");
   }

``put`` takes in two parameters: first a key, and then an associated value.
The two calls to ``put`` above creates two key value pairs each with a name
and a phone number.


To access those pairs, we run the ``get`` method:

.. code-block:: java

   public void testMap(){
      Map <String, String> noCallMap = new TreeMap<String, String>();

      noCallMap.put(Roger M", "090−997−2918");
      noCallMap.put("Jane Q", "999-777-1234");

      System.out.print("Jane Q's number is: " + noCallMap.get("Jane Q"))

   }

When we run the code above, the following message would be printed out:
``"Jane Q's number is: 999-777-1234"``


//3 CW exercises practicing adding values to a map

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525


Remove and contains act largely the same as they do with ``Set``s.  The main
difference is that we don't need to specify a full key, value pair to run either method.
Since keys must be unique in a map, we really only need a key.


.. code-block:: java

   public void testMap(){
      Map <String, String> noCallMap = new TreeMap<String, String>();

      noCallMap.put(Roger M", "090−997−2918");
      noCallMap.put("Jane Q", "999-777-1234");

      noCallMap.remove("Jane Q");
      System.out.print(noCallMap.contains("Jane Q"));

   }

//3 CW exercises practicing using contains and remove

Syntax Practice 10
------------------

.. extrtoolembed:: 'Syntax Practice 10'
   :workout_id: 1525

Here, we add "Jane Q" and her phone number to the Map, remove it, then the value ``false``
would be printed out as there is no longer a key called "Jane Q" in our Map.

As mentioned above, keys are unique, so if we wanted to get a Set of our Key values,
we could write a method like this:

.. code-block:: java

   public Set<String> getKeys(){
      Map <String, String> noCallMap = new TreeMap<String, String>();

      noCallMap.put(Roger M", "090−997−2918");
      noCallMap.put("Jane Q", "999-777-1234");

      return noCallMap.keySet();
   }

Check Your Understanding: Maps
------------------------------

.. avembed:: Exercises/IntroToSoftwareDesign/Week13Quiz2Summ.html ka
   :long_name: Maps
