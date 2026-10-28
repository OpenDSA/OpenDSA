.. avmetadata::
   :title: Abstract Classes, Frameworks, and Command Patterns
   :author: Molly Domino; Stephen Edwards
   :institution: Virginia Tech
   :keyword: Abstract Class; Abstract Method; Template Method; Command Pattern; Scanner; Stream Processing; Tokenization; Design Patterns
   :naturallanguage: en
   :programminglanguage: Java
   :description: Comprehensive introduction to abstract classes, behavioral design patterns, the Command pattern, text stream parsing with Scanner, and testing text-driven command interpreters.


Abstract Classes, Frameworks, and Command Patterns
==================================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~42 minutes (~42 min reading at 100 WPM)

   After reading this chapter, you will be able to:

   * **Compare** and contrast abstract classes with interfaces, selecting the appropriate abstraction based on code reuse and subtyping requirements.
   * **Declare** abstract classes containing instance fields, constructors, concrete methods, and abstract method signatures.
   * **Implement** the Template Method design pattern to define the skeleton of an algorithm in an abstract class while deferring specific steps to subclasses.
   * **Implement** the Command design pattern to encapsulate operations into executable objects, decoupling invokers from receivers.
   * **Parse** whitespace-delimited text streams using ``java.util.Scanner`` lookahead and token retrieval methods (``hasNext()``, ``next()``).
   * **Author** a multi-token command interpreter that reads verb-argument command pairs and evaluates action dispatch using ``.equals()``.
   * **Analyze** the structural weaknesses of cascading ``if/else-if`` command dispatch ladders to motivate associative map dispatch in future chapters.
   * **Design** automated test methods verifying text-driven command interpreters by constructing ``Scanner`` instances backed by ``String`` inputs and evaluating receiver postconditions with test case assertions in test classes extending ``TestCase``.


As software applications grow beyond small, single-purpose utilities into
larger, multi-component systems, managing complexity becomes a central software
design challenge. Up to this point in our study of object-oriented programming,
we have used class inheritance to specialize behaviors and interfaces to define
abstract contracts.

However, many computing problems require an intermediate architectural tier: a
structure that can define shared, reusable state and default implementations
like a superclass, while simultaneously enforcing that subclasses provide
specialized implementations of critical behaviors like an interface.

In this chapter, we will study **abstract classes** and **abstract methods**,
which provide this essential bridge. We will then examine two foundational
**software design patterns**—the **Template Method pattern** and the **Command
pattern**—which allow us to build modular, extensible application frameworks.
Finally, we will explore stream tokenization using Java's ``Scanner`` class,
learn how to construct interactive multi-token command interpreters, and analyze
how to test text-driven systems using automated unit tests.


Abstract Classes and Incomplete Blueprints
------------------------------------------

In Chapter 7, we saw how subclasses extend superclasses to inherit instance
fields and methods. In those examples, the superclass was a concrete class: you
could instantiate a ``Jeroo``, a ``Card``, or an ``Actor`` directly using the
``new`` operator.

However, in many system designs, a superclass represents an abstract concept
rather than a specific, tangible entity. Consider designing a software system
for an automated smart home. You might model devices using a hierarchy of
classes:

.. code-block:: text

                +---------------+
                |   Appliance   |
                +---------------+
                   ^    ^    ^
        +----------+    |    +----------+
        |               |               |
   +----------+  +------------+  +--------------+
   |SmartLight|  | Thermostat |  | SmartSpeaker |
   +----------+  +------------+  +--------------+

Every appliance in the home shares certain common attributes: each has a
location name (such as ``"Kitchen"`` or ``"Living Room"``), an operational
power status (on or off), and basic methods to toggle power. However, what does
it mean to instantiate a generic "Appliance" by itself? What sound does a generic
appliance make? How does a generic appliance operate?

A generic appliance cannot operate because the concept is incomplete. It exists
solely to define the common foundation from which concrete appliances—like
lights, thermostats, and speakers—derive their structure and behavior.

The `abstract` Class Keyword
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Java allows programmers to declare that a class is intentionally incomplete by
tagging it with the ``abstract`` keyword in the class header:

.. code-block:: java

   public abstract class Appliance
   {
       // Class contents...
   }

Declaring a class as ``abstract`` has a profound architectural effect: **it
prevents direct instantiation**. Any attempt to create an instance of an
abstract class using ``new`` causes a compile-time error:

.. code-block:: java

   Appliance device = new Appliance("Hallway"); // COMPILE ERROR: Appliance is abstract; cannot be instantiated

By making ``Appliance`` abstract, the compiler guarantees that only fully
specified, concrete subclasses (like ``SmartLight`` or ``Thermostat``) can ever
be created in memory.

Abstract Method Declarations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to preventing direct instantiation, an abstract class can declare
**abstract methods**. An abstract method is a method signature that defines the
name, return type, and formal parameters of an operation, but intentionally
provides **no method body**:

.. code-block:: java

   public abstract void operate();

Notice two syntactic rules:

1. The method header includes the ``abstract`` reserved word.
2. The method header ends with a semicolon (``;``) instead of a brace-delimited
   body (``{ ... }``).

When an abstract class declares an abstract method, it establishes a formal
contract: **any concrete subclass extending this abstract class MUST provide a
concrete implementation for every inherited abstract method**. If a subclass
fails to override and implement even a single abstract method, the compiler will
reject the subclass unless the subclass itself is also declared ``abstract``.

What Abstract Classes Can Contain
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Unlike Java interfaces, which are primarily restricted to method declarations
and constant values, an abstract class is a full-fledged class. An abstract class
can contain:

* **Private instance variables** to store state shared across all subclasses.
* **Constructors** to initialize those instance variables when a subclass
  invokes ``super(...)``.

* **Concrete methods** containing shared algorithms and helper logic that all
  subclasses inherit directly without modification.

* **Abstract methods** that act as placeholders for behaviors that each subclass
  must implement uniquely.

Let us examine the complete ``Appliance`` abstract superclass:

.. code-block:: java

   public abstract class Appliance
   {
       private String location;
       private boolean isOn;

       /**
        * Constructor for the abstract superclass.
        * Subclasses invoke this using super(location).
        */
       public Appliance(String location)
       {
           this.location = location;
           this.isOn = false;
       }

       public String getLocation()
       {
           return location;
       }

       public boolean isOn()
       {
           return isOn;
       }

       public void turnOn()
       {
           this.isOn = true;
       }

       public void turnOff()
       {
           this.isOn = false;
       }

       /**
        * Abstract method: Subclasses must provide their own
        * concrete implementation of how this appliance operates.
        */
       public abstract void operate();
   }

Now, let us implement a concrete subclass: ``SmartLight``. Because
``SmartLight`` is not declared abstract, it **must** provide a body for
``operate()``:

.. code-block:: java

   public class SmartLight extends Appliance
   {
       private int brightness; // 0 to 100 percent

       public SmartLight(String location)
       {
           super(location);
           this.brightness = 100;
       }

       public int getBrightness()
       {
           return brightness;
       }

       public void setBrightness(int level)
       {
           if (level >= 0 && level <= 100)
           {
               this.brightness = level;
           }
       }

       @Override
       public void operate()
       {
           if (isOn())
           {
               System.out.println("Illuminating " + getLocation()
                   + " at " + brightness + "% brightness.");
           }
           else
           {
               System.out.println("Light in " + getLocation() + " is off.");
           }
       }
   }

Similarly, a ``Thermostat`` subclass can extend ``Appliance``, define its own
``int targetTemperature`` field, and provide its own specialized implementation
of ``operate()`` that turns on the heater or air conditioner.

Through dynamic method dispatch, we can store diverse appliances in an array or
list of type ``Appliance[]`` and invoke ``operate()`` polymorphically:

.. code-block:: java

   Appliance[] devices = new Appliance[2];
   devices[0] = new SmartLight("Kitchen");
   devices[1] = new Thermostat("Living Room", 72);

   for (Appliance dev : devices)
   {
       dev.turnOn();
       dev.operate(); // Dynamically dispatches to the correct subclass method!
   }


Abstract Classes vs. Interfaces: Design Choices
-----------------------------------------------

A common question for software designers is: *When should I use an abstract
class, and when should I use an interface?* Both mechanisms allow you to declare
method signatures that subclasses or implementing classes must provide. However,
their roles in object-oriented architecture are fundamentally distinct.

Comparing Language Mechanics
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The table below contrasts the mechanical differences between abstract classes
and interfaces in Java:

.. list-table::
   :header-rows: 1
   :widths: 30 35 35

   * - Design Dimension
     - Abstract Class
     - Interface
   * - **Inheritance Keyword**
     - Subclasses use ``extends``
     - Implementing classes use ``implements``
   * - **Inheritance Multiplicity**
     - **Single inheritance**: A class can extend only *one* class
     - **Multiple implementation**: A class can implement *many* interfaces
   * - **Instance State**
     - Can declare private instance variables of any type
     - Cannot declare instance fields (only ``public static final`` constants)
   * - **Constructors**
     - Can have constructors to initialize shared superclass fields
     - Cannot have constructors (interfaces cannot be instantiated)
   * - **Method Access Modifiers**
     - Can declare ``private``, ``protected``, or ``public`` methods
     - Methods are implicitly ``public``
   * - **Primary Purpose**
     - Code reuse and shared state within a strict hierarchy
     - Contractual behavioral capability across unrelated types

Architectural Roles: IS-A Identity vs. CAN-DO Capability
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Beyond the syntax, the choice between an abstract class and an interface is
guided by the nature of the relationship you are modeling:

1. **Use an Abstract Class when modeling an IS-A relationship with shared state:**
   Choose an abstract class when your classes form a natural, close-knit family
   where every subclass is genuinely a specialized version of the parent
   concept and shares common state and algorithms. For example, a ``SmartLight``
   genuinely *is an* ``Appliance``; it makes sense for it to inherit the
   location field, power status, and getter methods from ``Appliance``.

2. **Use an Interface when modeling a CAN-DO capability across unrelated classes:**
   Choose an interface when you want to guarantee that a class provides certain
   behaviors, regardless of where that class sits in the inheritance hierarchy.
   For example, an interface named ``Scheduleable`` with a method ``void
   scheduleEvent(int time)`` could be implemented by a ``SmartLight``, a
   ``SprinklerSystem``, a ``CalendarEvent``, or an ``AutomatedBackupTask``.
   These classes share no common state and do not belong to the same family, but
   they all *can do* scheduling.

.. note::

   In sophisticated software frameworks, abstract classes and interfaces
   frequently work together. A framework often defines a top-level interface
   declaring capabilities, accompanied by an **abstract base class** that
   provides a partial, default implementation of that interface to reduce boiler-plate
   code for developers.

The Template Method Design Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the most powerful applications of abstract classes is the **Template
Method design pattern**.

A **design pattern** is a well-established, battle-tested solution to a common
software design problem. In the Template Method pattern, an abstract superclass
defines the overall structure (or "skeleton") of an algorithm inside a concrete
method. Certain steps of the algorithm, however, are declared as abstract
methods whose implementation is deferred to subclasses.

Consider an automated cleaning routine for smart robotic cleaners:

.. code-block:: java

   public abstract class RoboticCleaner extends Appliance
   {
       public RoboticCleaner(String location)
       {
           super(location);
       }

       /**
        * The Template Method: defines the invariant steps of a cleaning cycle.
        * Declared final so subclasses cannot accidentally break the sequence.
        */
       public final void runCleaningCycle()
       {
           turnOn();
           calibrateSensors(); // Abstract step: specialized by subclass
           performCleaning();  // Abstract step: specialized by subclass
           returnToDock();     // Concrete step: shared by all cleaners
           turnOff();
       }

       // Primitive steps that subclasses MUST customize:
       protected abstract void calibrateSensors();
       protected abstract void performCleaning();

       // Concrete step shared by all robotic cleaners:
       private void returnToDock()
       {
           System.out.println(getLocation() + " cleaner returning to charging dock.");
       }
   }

Now, different cleaning robots can customize the cleaning mechanics without
rewriting the overarching operational cycle:

.. code-block:: java

   public class VacuumBot extends RoboticCleaner
   {
       public VacuumBot(String location)
       {
           super(location);
       }

       @Override
       protected void calibrateSensors()
       {
           System.out.println("Scanning floor elevation and carpet thresholds.");
       }

       @Override
       protected void performCleaning()
       {
           System.out.println("Engaging suction motors and side brushes.");
       }
   }

When a client calls ``vacuumBot.runCleaningCycle()``, the inherited template
method executes the five-step routine in exact sequence, calling the specialized
sensor calibration and suction routines defined in ``VacuumBot``.


The Command Pattern: Encapsulating Actions
------------------------------------------

In many programs, you need to execute actions in response to user input, such as
clicking a button in a graphical user interface, typing a command into a text
terminal, or reading instructions from an automation script.

The Tightly Coupled Approach (And Why It Fails)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A novice programmer often writes code that directly connects the user input
handler with the low-level business logic:

.. code-block:: java

   // Tightly coupled input handling:
   public void handleUserInput(String input, SmartLight light, Thermostat thermostat)
   {
       if (input.equals("light on"))
       {
           light.turnOn();
       }
       else if (input.equals("light off"))
       {
           light.turnOff();
       }
       else if (input.equals("cool down"))
       {
           thermostat.setTargetTemperature(68);
       }
       // ... dozens more else-if branches
   }

While this code works for two or three options, it suffers from severe
architectural problems:

* **Rigid Coupling**: The input handler is hardwired to specific appliance
  instances and specific method names.

* **Zero Reusability**: If you want to trigger the same action from a scheduled
  timer or a macro script, you must duplicate the conditional branching.

* **No History or Queuing**: You cannot easily queue requests, undo actions, or
  log commands, because actions are ephemeral method calls rather than tangible
  data.

Treating Actions as First-Class Objects
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The **Command design pattern** solves this problem by encapsulating an action or
request as a **first-class object**.

Instead of directly invoking a method on an appliance, we create an object that
represents the intent to perform that action. The command object bundles together
the target object (the **receiver**), the operation to perform, and any required
arguments.

The Command pattern involves four primary roles:

1. **The Command Interface**: Declares a uniform method signature for executing
   an action, typically:
   
   .. code-block:: java
   
      public interface Command
      {
          void execute();
      }

2. **The Receiver**: The domain entity that contains the state and knows how to
   perform the actual work (e.g., ``SmartLight``, ``Thermostat``).

3. **The Concrete Command**: A class implementing the ``Command`` interface that
   holds a private reference to the receiver and executes specific methods on
   the receiver when its ``execute()`` method is invoked.

4. **The Invoker**: The component that holds and triggers commands (such as a
   remote control, a menu system, or an input interpreter) without knowing what
   the concrete command does or who the receiver is.


Implementing Concrete Commands with Receivers
---------------------------------------------

Let us implement the Command pattern for our smart home appliances. First, we
define the simple, elegant ``Command`` interface:

.. code-block:: java

   public interface Command
   {
       /**
        * Carries out the action encapsulated by this command.
        */
       void execute();
   }

Building Concrete Command Classes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Next, we create concrete command classes for each distinct operation. Notice
how each concrete command stores its receiver in a private instance field
initialized via its constructor:

.. code-block:: java

   /**
    * Concrete command to turn an appliance on.
    */
   public class TurnOnCommand implements Command
   {
       private Appliance receiver;

       public TurnOnCommand(Appliance receiver)
       {
           this.receiver = receiver;
       }

       @Override
       public void execute()
       {
           receiver.turnOn();
           System.out.println("Turned on device in " + receiver.getLocation());
       }
   }

Commands can also encapsulate parameters. For instance, setting a thermostat's
temperature requires both a receiver and a target temperature argument:

.. code-block:: java

   /**
    * Concrete command to set a thermostat's target temperature.
    */
   public class SetTemperatureCommand implements Command
   {
       private Thermostat thermostat;
       private int targetTemperature;

       public SetTemperatureCommand(Thermostat thermostat, int targetTemperature)
       {
           this.thermostat = thermostat;
           this.targetTemperature = targetTemperature;
       }

       @Override
       public void execute()
       {
           thermostat.setTargetTemperature(targetTemperature);
           System.out.println("Set thermostat in " + thermostat.getLocation()
               + " to " + targetTemperature + " degrees.");
       }
   }

The Invoker: Decoupling Execution from Implementation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now consider the invoker: a programmable multi-slot remote control or an
automation controller:

.. code-block:: java

   public class RemoteControl
   {
       private Command[] buttons;

       public RemoteControl(int numButtons)
       {
           this.buttons = new Command[numButtons];
       }

       public void setCommand(int slot, Command command)
       {
           if (slot >= 0 && slot < buttons.length)
           {
               buttons[slot] = command;
           }
       }

       public void pressButton(int slot)
       {
           if (slot >= 0 && slot < buttons.length && buttons[slot] != null)
           {
               // Polymorphic execution: the remote has no idea what this command does!
               buttons[slot].execute();
           }
       }
   }

Notice the immense architectural benefit of this decoupling:

* The ``RemoteControl`` class does not import ``SmartLight``, ``Thermostat``,
  or any other specific device. It depends **only on the ``Command``
  interface**.

* You can add fifty new kinds of appliances and commands to the system without
  changing a single line of code in ``RemoteControl``!

* You can dynamically reassign what a button does at runtime simply by calling
  ``setCommand()`` with a different command object.


Text Stream Processing with `Scanner`
-------------------------------------

Now that we can encapsulate actions into executable objects, how do we allow
human users to trigger these actions using typed text commands?

To process user input, we use Java's standard input processing tool:
``java.util.Scanner``.

Whitespace-Delimited Tokenization
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A **stream** is an abstract sequence of data characters. When a user enters a
line of text such as:

.. code-block:: text

   "set   temp    72"

the text consists of characters separated by spaces. In computer science,
individual words or meaningful chunks in an input stream separated by whitespace
(spaces, tabs, or newlines) are called **tokens**.

A ``Scanner`` acts as a parser that automatically tokenizes text. When you call
its core reading method:

.. code-block:: java

   String token = scanner.next();

the scanner skips any leading whitespace, reads characters until it hits the
next whitespace character, and returns the token as a ``String``.

Guarding Stream Reads with `hasNext()`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you call ``scanner.next()`` when there are no more tokens available in the
stream, the scanner throws a runtime exception:
``java.util.NoSuchElementException``.

To prevent crashes, you must **always verify stream availability** before
attempting to read. The scanner provides a lookahead method:

.. code-block:: java

   boolean hasMore = scanner.hasNext();

``scanner.hasNext()`` returns ``true`` if another token is available to read, and
``false`` if the stream has been completely exhausted.

Comparing String Tokens: `.equals()` vs. `==`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When evaluating command words read by a scanner, you must compare their content
using the ``.equals()`` method, **never the** ``==`` **identity operator**:

.. code-block:: java

   String commandWord = scanner.next();

   // CORRECT: Compares character contents
   if (commandWord.equals("status"))
   {
       // ...
   }

   // WRONG: Compares memory object addresses!
   if (commandWord == "status")
   {
       // Almost guaranteed to evaluate to false!
   }

Remember from Chapter 8 that ``==`` tests whether two references point to the
exact same object in heap memory. Because the scanner dynamically allocates a
new ``String`` object for every token it extracts, ``commandWord == "status"``
will evaluate to ``false`` even if the characters are identical.

The Standard Stream Processing Loop
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To process a sequence of commands until the stream ends, we structure our
algorithm around a ``while (scanner.hasNext())`` loop:

.. code-block:: java

   import java.util.Scanner;

   public class StreamEchoer
   {
       public void echoAllTokens(Scanner scanner)
       {
           while (scanner.hasNext())
           {
               String token = scanner.next();
               System.out.println("Processing token: " + token);
           }
       }
   }


Parsing Multi-Token Commands
----------------------------

Most interactive applications require commands composed of more than one word.
For example, a user might enter a **verb** followed by an **argument**:

* ``"temp 72"`` (verb: *temp*, argument: *72*)
* ``"light on"`` (verb: *light*, argument: *on*)
* ``"mode eco"`` (verb: *mode*, argument: *eco*)

Reading Structured Command Pairs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To parse a multi-token command line, our parser follows a sequential protocol:

1. Read the command verb using ``scanner.next()``.
2. Convert the verb to lowercase using ``.toLowerCase()`` to ensure
   case-insensitive input processing.

3. Check whether an argument token exists before attempting to read it.
4. Extract the argument (using ``scanner.next()`` for strings or
   ``scanner.nextInt()`` for integers) and execute the corresponding action.

Here is a straightforward interpreter implementing this protocol:

.. code-block:: java

   public void interpretSingleCommand(Scanner scanner, Thermostat thermostat, SmartLight light)
   {
       if (!scanner.hasNext())
       {
           return; // Stream is empty
       }

       String verb = scanner.next().toLowerCase();

       if (verb.equals("status"))
       {
           System.out.println("Thermostat is at " + thermostat.getTargetTemperature());
           System.out.println("Light is " + (light.isOn() ? "ON" : "OFF"));
       }
       else if (verb.equals("temp"))
       {
           if (scanner.hasNextInt())
           {
               int degrees = scanner.nextInt();
               thermostat.setTargetTemperature(degrees);
           }
           else
           {
               System.out.println("Error: 'temp' command requires an integer temperature.");
           }
       }
       else if (verb.equals("light"))
       {
           if (scanner.hasNext())
           {
               String state = scanner.next().toLowerCase();
               if (state.equals("on"))
               {
                   light.turnOn();
               }
               else if (state.equals("off"))
               {
                   light.turnOff();
               }
               else
               {
                   System.out.println("Error: State must be 'on' or 'off'.");
               }
           }
       }
       else
       {
           System.out.println("Unrecognized command: " + verb);
       }
   }

The `if/else-if` Command Dispatch Anti-Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The cascading ``if/else-if`` structure shown above is the most obvious way to
route text commands. In introductory programming, this is often where students
begin.

However, in professional software engineering, relying on a giant cascading
``if/else-if`` chain for command routing is considered an **anti-pattern**—a
commonly used structure that appears straightforward on the surface but produces
severe architectural flaws as the system expands:

1. **Violation of the Open/Closed Principle**:
   One of the most important rules of software engineering is the **Open/Closed
   Principle**: *software entities should be open for extension, but closed for
   modification*. In the ``if/else-if`` approach, every single time you want to
   add a new command to your application (such as adding a ``"fan"`` or
   ``"lock"`` command), you **must modify the parser class itself** by cutting
   open the method and appending more branches. This risks introducing defects
   into previously working commands.

2. **Code Bloat and Degrading Maintainability**:
   While three commands produce a readable ladder, real-world systems easily
   possess dozens or hundreds of commands. A 50-branch ``if/else-if`` ladder
   spanning hundreds of lines of code becomes an unmaintainable nightmare to
   navigate, read, and test.

3. **Linear Performance Degradation**:
   A cascading ``if/else-if`` chain evaluates each condition sequentially from
   top to bottom. If you have 50 commands and the user executes the 50th
   command, Java must perform 50 string comparisons before finding a match.

Looking Ahead: The Map-Based Solution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How do professional software engineers eliminate this anti-pattern?

The answer lies in combining the **Command design pattern** with an **associative
data structure called a Map**. In Chapter 12, you will learn about Java's
``Map<String, Command>`` collection. A Map acts as a high-speed dictionary: it
stores key-value associations, mapping command word strings (like ``"temp"`` or
``"light"``) directly to concrete ``Command`` objects.

With a map-based dispatcher:

* The entire multi-page ``if/else-if`` ladder is replaced by a single line of
  code:
  
  .. code-block:: java
  
     Command cmd = commandMap.get(verb);
     if (cmd != null) { cmd.execute(); }

* Adding a new command requires **zero changes** to the parser: you simply
  register a new command object into the map!

Understanding the mechanics of multi-token stream parsing in this chapter
provides the essential foundation you need before we replace the branching
ladder with map-based dispatch in Chapter 12.


Testing Text-Driven Command Interpreters
----------------------------------------

Testing an interactive program that reads commands can seem daunting if you
assume testing requires a human sitting at a keyboard typing into a terminal.
Fortunately, Java's ``Scanner`` architecture makes automated unit testing of
text interpreters straightforward and fast.

String-Backed Test Scanners
~~~~~~~~~~~~~~~~~~~~~~~~~~~

Although ``Scanner`` is often used with ``System.in`` to read from the console,
a ``Scanner`` can be instantiated to read from **any data source**—including a
simple in-memory ``String``:

.. code-block:: java

   Scanner testStream = new Scanner("temp 72 light on");

When you pass this string-backed scanner to your command interpreter, the scanner
delivers the tokens ``"temp"``, ``"72"``, ``"light"``, and ``"on"`` in exact
sequence, just as if an exceptionally fast typist entered them at the console!

Authoring Test Classes Extending `TestCase`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In the BlueJ environment used in our course, automated unit tests are written by
declaring test classes that extend ``TestCase`` (from the ``student`` package):

.. code-block:: java

   public class CommandInterpreterTest extends TestCase

Because the project template provides the necessary import (``import student.TestCase;``),
you extend ``TestCase`` directly without package qualification.

Inside your test methods, you:

1. Set up fresh receiver instances.
2. Construct a ``Scanner`` populated with specific command strings.
3. Invoke the interpreter method.
4. Verify receiver state changes and postconditions using **test case
   assertions** (such as ``assertEquals(...)``, ``assertTrue(...)``, ``assertFalse(...)``).

Here is a comprehensive unit test suite verifying our command interpreter:

.. code-block:: java

   public class CommandInterpreterTest extends TestCase
   {
       private Thermostat thermostat;
       private SmartLight light;
       private SmartHomeHub hub;

       /**
        * Automatically executed before each test method.
        */
       public void setUp()
       {
           thermostat = new Thermostat("Hallway", 68);
           light = new SmartLight("Porch");
           hub = new SmartHomeHub(thermostat, light);
       }

       public void testInterpretTempCommand()
       {
           // Provide a valid temperature command stream
           Scanner stream = new Scanner("temp 74");
           hub.interpret(stream);

           // Verify receiver postconditions with test case assertions:
           assertThat(thermostat.getTargetTemperature()).isEqualTo(74);
       }

       public void testInterpretLightOnAndOff()
       {
           // Initially the light is off
           assertThat(light.isOn()).isFalse();

           // Execute light on command
           Scanner streamOn = new Scanner("light on");
           hub.interpret(streamOn);
           assertThat(light.isOn()).isTrue();

           // Execute light off command
           Scanner streamOff = new Scanner("light off");
           hub.interpret(streamOff);
           assertThat(light.isOn()).isFalse();
       }

       public void testInterpretMultipleCommandsInStream()
       {
           // Stream with multiple sequential commands
           Scanner stream = new Scanner("temp 71 light on");
           hub.interpretAll(stream);

           assertThat(thermostat.getTargetTemperature()).isEqualTo(71);
           assertThat(light.isOn()).isTrue();
       }

       public void testInterpretEmptyStream()
       {
           // Empty stream should terminate gracefully without error
           Scanner emptyStream = new Scanner("");
           hub.interpret(emptyStream);

           // State remains at defaults
           assertThat(thermostat.getTargetTemperature()).isEqualTo(68);
           assertThat(light.isOn()).isFalse();
       }

       public void testInterpretUnknownCommand()
       {
           // Unrecognized command should be ignored without crashing
           Scanner stream = new Scanner("activate lasers");
           hub.interpret(stream);

           assertThat(thermostat.getTargetTemperature()).isEqualTo(68);
           assertThat(light.isOn()).isFalse();
       }
   }

By testing across both valid commands, sequential multi-command streams, empty
inputs, and malformed command words, you ensure that your command interpreter is
robust, crash-proof, and fully validated.


Programming Practice 11
-----------------------

.. extrtoolembed:: 'Programming Practice 11'
   :workout_id: 1613


.. raw:: html

   <footer style="border-top: 1px solid #777;"><div class="footer">
     Selected content adapted from:<br/>
     <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
     licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
     <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
     licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
   </div></footer>
