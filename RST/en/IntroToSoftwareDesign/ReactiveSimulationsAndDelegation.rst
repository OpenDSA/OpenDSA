.. avmetadata::
   :title: Reactive Agent Simulations and Delegation
   :author: Stephen Edwards
   :institution: Virginia Tech
   :keyword: Reactive Simulation; Greenfoot; Finite State Machine; Delegation; Object Association
   :naturallanguage: en
   :programminglanguage: Java
   :description: Reactive agent architectures, Greenfoot event loops, finite state modeling, object association, and the Delegation design pattern.


Reactive Agent Simulations and Delegation
=========================================

.. |br| raw:: html

   <br />

.. sidebar:: Learning Objectives

    **Estimated Time**: ~50 minutes (~50 min reading at 100 WPM)

    * **Implement** autonomous reactive behaviors in an ``act()`` method driven by sensory inputs and internal state flags.
    * **Explain** the delegation design pattern and how objects collaborate by forwarding tasks to companion objects.
    * **Declare** companion object fields and implement delegated method calls to coordinate multi-actor behaviors.


So far in our study of programming, our code has run primarily in an *imperative*
and *sequential* fashion. When guiding a Jeroo across Santong Island or transforming
pixels in an image, our programs followed a direct script: one method executed to
completion, followed by the next, in a predictable sequence orchestrated by a single
thread of control. In real-world software, however, systems often operate in
dynamic, multi-agent environments. Video games, robotic control systems, traffic
simulations, and autonomous ecological models do not follow a rigid, pre-planned
script. Instead, they consist of independent entities that continuously observe their
surroundings, make decisions based on changing conditions, and react to events in
real time.

In this chapter, we transition from scripted algorithms to **reactive agent simulations**.
We will explore the Greenfoot micro-world framework, understand the discrete simulation
cycle driven by the ``act()`` method, model internal agent memory using state flags and
accumulator timers, and learn how to write deterministic unit tests for autonomous entities.
Furthermore, we will examine how objects collaborate through **object association** and
the **Delegation design pattern**—techniques that allow companion actors to coordinate
actions across complex environments.


Greenfoot Micro-Worlds & The Simulation Cycle
---------------------------------------------

To understand how reactive simulations function, we must first contrast two fundamental
execution models: *scripted execution* and *event-driven simulation cycles*.

In scripted programs, such as our early Jeroo exercises, a central controller or test
method dictates every step:

.. code-block:: java

   // Scripted execution: The controller specifies every action sequentially
   jeroo.hop();
   jeroo.hop();
   if (jeroo.seesFlower(AHEAD))
   {
       jeroo.pick();
   }
   jeroo.turn(RIGHT);

In this scripted model, the actor has no autonomy. If an unexpected obstacle appears
or another entity moves across its path while it is executing a sequence of hops, the
actor remains oblivious until the controller explicitly issues a sensor query.

In contrast, an **agent-based simulation** operates like an animated world. Rather than
executing a single, long sequence of instructions from start to finish, the simulation
engine runs a continuous loop called the **simulation cycle** or **event loop**. In the
Greenfoot micro-world framework, every visible entity in the world is an instance of an
``Actor`` (or a subclass of ``Actor``). The world engine repeatedly calls a special method
named ``act()`` on every actor currently present in the world.

The Greenfoot Environment & Execution Controls
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you open a Greenfoot simulation, the main graphical window presents three primary areas:

1. **The World**: The large visual grid covering most of the screen. This is the virtual
   environment where actors live, move, and interact.
2. **The Class Diagram**: The panel on the right displaying the classes in the scenario
   (such as ``World``, ``Actor``, and your custom subclasses).
3. **The Execution Controls**: The control panel at the bottom featuring the **Act** button,
   the **Run** button, and the **Execution Speed Slider**.

.. file = Images/greenfoot-orchard-scenario.png

.. odsafig:: Images/island.png
   :align: center
   :capalign: justify

   Figure 6.1: The Greenfoot main window showing an Orchard micro-world with a Hedgehog actor, Apples to collect, the class diagram on the right, and the execution controls (Act, Run, and Speed slider) along the bottom.

To understand how Greenfoot runs your program, consider what happens when you interact with
these execution controls:

* **Clicking the Act Button**: Clicking **Act** executes exactly **one turn** of the simulation.
  Greenfoot iterates through every actor currently placed in the world and invokes that actor's
  ``act()`` method once.
* **Clicking the Run Button**: Clicking **Run** causes Greenfoot to execute turn after turn
  continuously. It is exactly equivalent to clicking the **Act** button repeatedly in rapid
  succession. The simulation continues to run until you click the button again (which has now
  become **Pause**).
* **The Speed Slider**: The slider controls the delay between successive simulation turns,
  allowing you to slow down the action to observe fine details or speed it up to watch long-term
  behaviors unfold.

The Meaning of the ``act()`` Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The ``act()`` method is the central heartbeat of every actor in Greenfoot. All objects that
can be placed into a Greenfoot world possess an ``act()`` method.

When Greenfoot invokes an actor's ``act()`` method, it is effectively giving that actor a simple
instruction:

.. note::

   **The Meaning of ``act()``**: *"Do whatever you want to do now for your current turn."*

What an actor does during its turn depends on its current surroundings and its internal rules:

* Look around using its sensory methods (e.g., checking if the way ahead is clear or if food is nearby).
* Make a decision based on those observations.
* Perform **one small action** (such as taking a single step forward, turning to face a new direction,
  or picking up an object).
* Return control immediately to the simulation engine so that other actors can take their turns.

The Contract of the ``act()`` Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the simulation engine repeatedly invokes ``act()`` on every actor during every turn,
the ``act()`` method carries a strict contract:

.. important::

   **The ``act()`` Contract**: An actor's ``act()`` method must execute a single, discrete
   unit of work and **return immediately**. An actor should take at most **one movement step**
   per turn and must never block execution.

Just as in our earlier work with Jeroos and Lightbot, we continue to restrict our actor's turns
to relative left and right directions: ``turn(LEFT)`` and ``turn(RIGHT)``. Rather than turning
by arbitrary fractional angles, our actors navigate grid environments using cardinal compass
headings (``NORTH``, ``SOUTH``, ``EAST``, ``WEST``) and relative rotations (``LEFT``, ``RIGHT``).

Consider an autonomous ``Hedgehog`` exploring an ``Orchard`` grid. In each simulation turn,
the hedgehog inspects whether the path ahead is clear; if blocked by a garden wall or rock,
it turns left; otherwise, it advances one step forward:

.. code-block:: java

   public class Hedgehog extends Actor
   {
       @Override
       public void act()
       {
           if (!this.isClear(AHEAD))
           {
               this.turn(LEFT);
           }
           else
           {
               this.hop();
           }
       }
   }

When you click the **Act** button, the hedgehog checks the cell ahead, executes either a single
turn or a single hop, and finishes. When you click **Run**, Greenfoot repeatedly calls ``act()``,
causing the hedgehog to march forward across the orchard and navigate around boundary walls smoothly.

The Infinite Loop Anti-Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A frequent beginner mistake when transitioning to simulation programming is placing a
loop inside ``act()`` to complete a task:

.. code-block:: java

   // CATASTROPHIC ANTI-PATTERN: DO NOT DO THIS!
   public void act()
   {
       // Flawed attempt to walk until an obstacle is reached
       while (this.isClear(AHEAD))
       {
           this.hop(); // Freezes the entire simulation!
       }
   }

Why is this loop catastrophic? Because the micro-world engine relies on each actor completing
its turn promptly. If an actor enters a ``while`` loop that takes many iterations (or runs
infinitely):

* The actor **never returns** from its ``act()`` call.
* No other actors in the world ever get a turn to act.
* The simulation engine cannot reach its display refresh step, causing the graphical user
  interface to freeze completely.
* User clicks on the **Pause** or **Reset** buttons cannot be processed.

In a reactive simulation, **the engine provides the loop**. You do not need a ``while``
loop to keep an actor moving forward across turns; you simply command it to take a
single step during each call to ``act()``, and let the repetitive invocation of ``act()``
produce continuous, lifelike motion.


Finite State Logic & State Flags for Simulation Actors
------------------------------------------------------

Because an actor's ``act()`` method finishes and returns to the engine dozens of times
every second, a fundamental question arises: *How does an actor remember what it was doing
from one turn to the next?*

The Stateless Trap
~~~~~~~~~~~~~~~~~~

Consider what happens if an actor attempts to use a local variable inside ``act()`` to
track its progress:

.. code-block:: java

   public class FlawedHedgehog extends Actor
   {
       @Override
       public void act()
       {
           int stepsTaken = 0; // LOCAL VARIABLE: Re-initialized every tick!
           stepsTaken++;

           if (stepsTaken >= 5)
           {
               this.turn(RIGHT);
           }
           else
           {
               this.hop();
           }
       }
   }

Every time Greenfoot calls ``act()``, a fresh call begins: ``stepsTaken`` is initialized
to ``0``, incremented to ``1``, and then destroyed when ``act()`` finishes. The variable
``stepsTaken`` never reaches ``5``, and the hedgehog never turns!

To maintain continuity across simulation turns, an actor must store its state in
**private instance fields**. Instance fields live in heap memory as part of the actor object
and persist for the entire lifetime of the actor, surviving across thousands of ``act()``
invocations.

Boolean State Flags
~~~~~~~~~~~~~~~~~~~

The simplest mechanism for persisting memory across turns is a **boolean state flag**.
A state flag holds either ``true`` or ``false``, representing whether the actor is
currently in a specific condition or executing a particular mode of behavior.

For example, in our orchard simulation, a foraging hedgehog needs to know whether it is
currently searching for an apple or carrying an apple back to its burrow:

.. code-block:: java

   public class ForagingHedgehog extends Actor
   {
       // State flag: persists across all simulation turns
       private boolean hasApple;

       public ForagingHedgehog()
       {
           super();
           this.hasApple = false;
       }

       @Override
       public void act()
       {
           if (this.hasApple)
           {
               this.returnToBurrow();
           }
           else
           {
               this.searchForApple();
           }
       }

       private void searchForApple()
       {
           if (this.getOneIntersectingObject(Apple.class) != null)
           {
               this.removeTouching(Apple.class);
               this.hasApple = true; // State transition!
           }
           else if (!this.isClear(AHEAD))
           {
               this.turn(LEFT);
           }
           else
           {
               this.hop();
           }
       }

       private void returnToBurrow()
       {
           if (this.getOneIntersectingObject(Burrow.class) != null)
           {
               this.hasApple = false; // State transition back to searching!
           }
           else if (!this.isClear(AHEAD))
           {
               this.turn(RIGHT);
           }
           else
           {
               this.hop();
           }
       }
   }

Notice how clean this architecture is: the value of ``hasApple`` determines which
sub-behavior executes during any given turn. When a transition condition is met
(such as finding an apple), the flag flips to ``true``. On subsequent turns, the hedgehog
automatically executes the delivery behavior until it reaches its burrow, where it deposits
the apple and flips the flag back to ``false``.

Accumulator Timers and Counters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to boolean flags, reactive agents frequently need to coordinate actions
over time. For example, an agent might want to walk in a straight line for 4 steps before
turning to explore a new path, or pause for several turns while eating.

An **accumulator counter** is an integer instance field that counts simulation turns:

.. code-block:: java

   public class WanderingHedgehog extends Actor
   {
       private int stepCount;

       public WanderingHedgehog()
       {
           super();
           this.stepCount = 0;
       }

       @Override
       public void act()
       {
           this.stepCount++;

           // After walking 4 steps, change direction
           if (this.stepCount >= 4)
           {
               this.turn(RIGHT);
               this.stepCount = 0; // Reset the accumulator
           }
           else if (!this.isClear(AHEAD))
           {
               this.turn(LEFT);
               this.stepCount = 0; // Reset if forced to turn by an obstacle
           }
           else
           {
               this.hop();
           }
       }
   }

Each invocation of ``act()`` increments ``stepCount`` by 1. When the counter reaches the
target threshold, the actor performs the periodic action and resets the counter to zero.

Finite State Machines (FSM)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an agent's behavior grows beyond a single boolean flag, we formalize its decision-making
process as a **Finite State Machine (FSM)**. A finite state machine consists of:

1. A finite set of distinct **states** (modes of operation).
2. An **initial state** when the agent is created.
3. A set of **transitions** between states triggered by sensory events or timers.

Consider our foraging agent with two primary states:

* **SEARCHING**: Exploring the orchard looking for apples.
* **RETURNING**: Navigating back toward the burrow with cargo.

.. file = Images/hedgehog-state-diagram.png

.. odsafig:: Images/island.png
   :align: center
   :capalign: justify

   Figure 6.2: State transition diagram for the foraging Hedgehog, transitioning between SEARCHING and RETURNING based on whether food has been collected or delivered.

In Java, we can represent these states using named integer constants or an enumeration,
storing the agent's current state in a private field:

.. code-block:: java

   public class ForagingAgent extends Actor
   {
       public static final int SEARCHING = 0;
       public static final int RETURNING = 1;

       private int currentState;

       public ForagingAgent()
       {
           super();
           this.currentState = SEARCHING;
       }

       @Override
       public void act()
       {
           if (this.currentState == SEARCHING)
           {
               this.performSearch();
           }
           else if (this.currentState == RETURNING)
           {
               this.performReturn();
           }
       }

       private void performSearch()
       {
           if (this.getOneIntersectingObject(Apple.class) != null)
           {
               this.removeTouching(Apple.class);
               this.currentState = RETURNING; // State transition
           }
           else if (!this.isClear(AHEAD))
           {
               this.turn(LEFT);
           }
           else
           {
               this.hop();
           }
       }

       private void performReturn()
       {
           if (this.getOneIntersectingObject(Burrow.class) != null)
           {
               this.currentState = SEARCHING; // State transition
           }
           else if (!this.isClear(AHEAD))
           {
               this.turn(RIGHT);
           }
           else
           {
               this.hop();
           }
       }
   }

By structuring simulation actors as finite state machines, each operational state
is isolated in its own helper method. The main ``act()`` method simply dispatches to the
appropriate behavior based on the current state, keeping the overall architecture clean
and maintainable.


Testing Autonomous Reactive Entities in JUnit
---------------------------------------------

Because reactive simulation actors depend on the continuous invocation of ``act()`` by an
underlying simulation engine, students often wonder: *How can we write automated unit tests
for an actor without launching a graphical window and waiting for it to run in real time?*

The key insight is that ``act()`` is simply a regular Java instance method. In a unit test,
we do not need the graphical Greenfoot engine running in real time. Instead,
**our test method becomes the simulation engine**. We instantiate an actor, place it in a
test world, call ``act()`` directly, and immediately assert whether the actor moved to the
expected coordinates or transitioned into the expected state.

Deterministic Single-Tick Assertions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Testing an actor's behavior for a single turn is straightforward. You configure the
actor's initial position and sensory conditions in a test world, call ``act()`` once, and
check the results using AssertJ assertions:

.. code-block:: java

   import student.micro.*;
   import static org.assertj.core.api.Assertions.*;

   public class HedgehogTest extends TestCase
   {
       private Orchard orchard;
       private ForagingHedgehog hedgehog;

       @Override
       public void setUp()
       {
           // Create a clean, predictable test world fixture
           this.orchard = new Orchard(10, 10);
           this.hedgehog = new ForagingHedgehog();
           this.orchard.add(this.hedgehog, 2, 2);
       }

       public void testSingleTickAdvance()
       {
           // Verify initial position
           assertThat(this.hedgehog.getX()).isEqualTo(2);
           assertThat(this.hedgehog.getY()).isEqualTo(2);

           // Manually trigger one simulation turn
           this.hedgehog.act();

           // Assert that the hedgehog hopped forward one space
           assertThat(this.hedgehog.getX()).isEqualTo(3);
           assertThat(this.hedgehog.getY()).isEqualTo(2);
       }
   }

Notice that our test class inherits from ``TestCase``:

.. code-block:: java

   public class HedgehogTest extends TestCase

In accordance with our course development environment, test classes always extend
``TestCase`` directly, with the import statement ``import student.micro.*;`` supplying
the appropriate framework base class. The ``setUp()`` method runs before every single
test method, providing a pristine, isolated test fixture.

Testing Multi-Tick Behaviors and State Transitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Many behaviors require several simulation turns to unfold. For instance, an actor might
need to count 4 steps before turning, or it might take several hops to reach an apple.

Instead of writing repetitive manual calls to ``act()``, use a standard ``for`` loop in your
test method to advance the simulation clock by an exact, deterministic number of turns:

.. code-block:: java

   public void testWanderCounterCausesTurn()
   {
       // Advance the simulation by 3 turns: counter should not yet trigger turn
       for (int tick = 0; tick < 3; tick++)
       {
           this.hedgehog.act();
       }
       assertThat(this.hedgehog.isFacing(EAST)).isTrue();

       // The 4th turn reaches the counter threshold and triggers the turn
       this.hedgehog.act();
       assertThat(this.hedgehog.isFacing(SOUTH)).isTrue();
   }

This approach provides several powerful testing benefits:

1. **Instantaneous Execution**: Running hundreds of turns in a ``for`` loop takes less than
   a single millisecond, allowing large test suites to finish instantly.
2. **100% Determinism**: There are no race conditions or animation delays. You control
   the simulation clock with microsecond precision.
3. **Boundary Condition Verification**: You can verify the exact turn where a transition
   occurs (e.g., verifying that the actor maintains its heading on turn 3, but turns on turn 4).


Object Association: Companion References in Fields
--------------------------------------------------

Up to this point, our instance fields have stored primitive values (``int``, ``boolean``, ``double``)
or self-contained utility objects (``Color``, ``Pixel``). However, one of the greatest strengths
of object-oriented programming is the ability of objects to form **associations** with other
objects.

What is Object Association?
~~~~~~~~~~~~~~~~~~~~~~~~~~~

An **association** represents a "HAS-A" relationship between two independent objects. When
Object A holds a reference to Object B in an instance field, Object A "knows about" Object B
and can send messages to it by invoking its methods.

Crucially, in an association, Object B is not merely an internal component owned exclusively
by Object A. Object B often exists independently in the world and may interact with other
entities. Object A simply maintains a connection—a companion reference—allowing the two
to collaborate.

Consider a scenario where one hedgehog guides a companion hedgehog across an orchard.
To do this, the guide needs a private field that refers to its companion:

.. code-block:: java

   public class GuideHedgehog extends Hedgehog
   {
       // Association: A reference to another Hedgehog object
       private Hedgehog companion;

       // ...
   }

Here, ``companion`` is not a primitive value; it is a reference variable capable of holding
the memory address of any ``Hedgehog`` instance (or subclass instance).

Constructor Reference Injection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How does the companion reference get into the field? While a setter method could be used,
the most robust technique is **constructor dependency injection**: passing the companion
object as a parameter when the primary object is instantiated:

.. code-block:: java

   public class GuideHedgehog extends Hedgehog
   {
       private Hedgehog companion;

       /**
        * Constructs a GuideHedgehog associated with a companion Hedgehog.
        * @param companion the companion Hedgehog to coordinate with
        */
       public GuideHedgehog(Hedgehog companion)
       {
           super();                    // Initialize the superclass (Hedgehog)
           this.companion = companion; // Store the reference in our private field
       }

       /**
        * Accessor method for the companion Hedgehog.
        * @return the companion Hedgehog
        */
       public Hedgehog getCompanion()
       {
           return this.companion;
       }
   }

Notice what happens during instantiation:

.. code-block:: java

   Hedgehog buddy = new Hedgehog();
   GuideHedgehog leader = new GuideHedgehog(buddy);

Memory Representation and Aliasing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the code above executes, two objects are allocated on the heap:

.. code-block:: text

   STACK                           HEAP
   +---------+                     +-----------------------+
   |  buddy  | ------------------> | Hedgehog (x: 2, y: 2) | <-------+
   +---------+                     +-----------------------+         |
                                                                     |
   +---------+                     +-----------------------+         |
   | leader  | ------------------> | GuideHedgehog         |         |
   +---------+                     |   companion ----------+---------+
                                   +-----------------------+

.. file = Images/object-association-memory.png

.. odsafig:: Images/island.png
   :align: center
   :capalign: justify

   Figure 6.3: Memory diagram illustrating object association and aliasing: the reference variable buddy and the instance field leader.companion point to the exact same Hedgehog object in heap memory.

Both the variable ``buddy`` in the calling method and the internal field ``this.companion``
inside ``leader`` point to the **exact same Hedgehog object in memory**. This is known as
**aliasing**. If ``leader`` invokes a method on ``this.companion``, the state of ``buddy``
is updated immediately because there is only one underlying object.


The Delegation Pattern: Forwarding Tasks to Partners
----------------------------------------------------

Once an object stores a reference to a companion in an instance field, how does it put
that connection to work? The answer lies in one of the most foundational architectural
patterns in software design: the **Delegation pattern**.

Understanding Delegation
~~~~~~~~~~~~~~~~~~~~~~~~

**Delegation** is an object-oriented technique where an object handles a request by
forwarding (delegating) the responsibility for performing that task to an associated
companion object.

Think of an executive and an administrative assistant. When a client asks the executive
to schedule an appointment, the executive does not personally update the calendar; instead,
the executive turns to the assistant and delegates the task: *"Please schedule this meeting."*
The client interacts with the executive, but the assistant performs the work.

Delegation vs. Inheritance
~~~~~~~~~~~~~~~~~~~~~~~~~~

Students frequently confuse inheritance with delegation:

* **Inheritance ("IS-A")**: Reuses behavior through a parent class hierarchy. A
  ``GuideHedgehog`` *is a* ``Hedgehog``, so it automatically inherits basic abilities like
  ``hop()``, ``turn(RelativeDirection direction)``, and sensory methods.
* **Delegation ("HAS-A")**: Cooperates by forwarding requests to an associated object.
  A ``GuideHedgehog`` *has a* companion ``Hedgehog``, and asks that companion to perform
  matching actions.

Delegation provides enormous flexibility because the companion can be swapped or modified
without altering class hierarchies.

Overriding Methods with ``super`` and Delegation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To implement delegation, an actor overrides a method inherited from its superclass. Inside
the overridden method, the actor typically does two things:

1. Calls ``super.method()`` so that it performs its own normal action.
2. Invokes the matching method on its companion field (``this.companion.method()``) to delegate
   the action.

Here is the complete implementation of delegated movement and turning in ``GuideHedgehog``:

.. code-block:: java

   public class GuideHedgehog extends Hedgehog
   {
       private Hedgehog companion;

       public GuideHedgehog(Hedgehog companion)
       {
           super();
           this.companion = companion;
       }

       @Override
       public void hop()
       {
           super.hop();                  // 1. Move myself forward
           if (this.companion != null)   // 2. Defensive check
           {
               this.companion.hop();     // 3. Delegate to companion
           }
       }

       @Override
       public void turn(RelativeDirection direction)
       {
           super.turn(direction);        // 1. Turn myself
           if (this.companion != null)   // 2. Defensive check
           {
               this.companion.turn(direction); // 3. Delegate to companion
           }
       }
   }

Notice the critical check: ``if (this.companion != null)``. This is **defensive programming**.
If a ``GuideHedgehog`` is instantiated with a ``null`` companion (or without an assigned
partner), calling ``this.companion.hop()`` would cause a catastrophic ``NullPointerException``.
The null check ensures that the actor continues to function safely even when operating solo.

Delegating Overloaded Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, methods can be *overloaded*—meaning multiple methods share the same name but have
different parameter lists. If an actor class provides multiple overloaded versions of a method,
such as ``hop()`` and ``hop(int distance)``, you must be careful to override and delegate
**each overloaded variant** that callers might invoke:

.. code-block:: java

   @Override
   public void hop(int distance)
   {
       super.hop(distance);
       if (this.companion != null)
       {
           this.companion.hop(distance);
       }
   }

By delegating every variant, you ensure that no matter how an external caller commands the
primary actor to move or turn, the companion mirrors the behavior faithfully.


Synchronized Multi-Actor Coordination Algorithms
------------------------------------------------

Now that we understand how an actor delegates individual actions to a companion, let us
examine how to build higher-level algorithms where multiple actors coordinate their movements
in synchronized harmony.

Synchronized Orchard Patrol: Parallel Track Navigation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider an orchard environment where two hedgehogs perform a synchronized perimeter patrol.
The orchard features two concentric tracks: an outer perimeter lane and an inner lane separated
by low garden hedges:

1. **Outer Lane**: Contains our primary actor, an instance of ``GuideHedgehog``.
2. **Inner Lane**: Contains the companion actor, a standard ``Hedgehog``.

The companion hedgehog on the inner track does not possess autonomous pathfinding or
obstacle-avoidance logic of its own. It relies entirely on the ``GuideHedgehog`` on the
outer track to navigate.

.. file = Images/orchard-tandem-patrol.png

.. odsafig:: Images/island.png
   :align: center
   :capalign: justify

   Figure 6.4: Coordinated tandem patrol in the Orchard. The GuideHedgehog navigates the outer track while delegating its movements to its companion on an inner parallel track.

When the ``GuideHedgehog`` executes its patrol algorithm along the outer lane, every step
and turn it performs is delegated to its companion on the inner lane. As a consequence,
the two actors traverse their respective tracks in perfect synchronized lockstep!

Perimeter Navigation: The ``patrolPerimeter()`` Algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A classic coordination task is perimeter navigation. An actor must traverse the boundary of
an orchard lane, hopping along the edge, until it returns to its exact starting coordinates.

Here is the algorithm implemented as a method on ``GuideHedgehog``:

.. code-block:: java

   public class GuideHedgehog extends Hedgehog
   {
       private Hedgehog companion;

       public GuideHedgehog(Hedgehog companion)
       {
           super();
           this.companion = companion;
       }

       /**
        * Traverses the perimeter of the orchard track until returning to the
        * starting position, mirroring all actions on the companion hedgehog.
        */
       public void patrolPerimeter()
       {
           int startX = this.getX();
           int startY = this.getY();

           // Execute at least one step before checking if we are back home
           do
           {
               this.stepAlongEdge();
           } while (this.getX() != startX || this.getY() != startY);
       }

       /**
        * Helper method: takes one navigation step keeping the boundary to the right.
        */
       private void stepAlongEdge()
       {
           if (this.isClear(AHEAD))
           {
               this.hop();
           }
           else
           {
               this.turn(RIGHT);
           }
       }
   }

Notice why this method is so elegant:

* The ``patrolPerimeter()`` method does not write a single line of explicit code directing the
  companion!
* Because ``patrolPerimeter()`` calls ``this.hop()`` and ``this.turn(RIGHT)``, Java's dynamic
  method dispatch invokes ``GuideHedgehog``'s overridden versions of those methods.
* Those overridden methods call ``super.hop()`` (moving the guide) and
  ``this.companion.hop()`` (moving the companion).
* As a result, simply commanding ``leader.patrolPerimeter()`` causes **both** actors to complete
  a full synchronized circuit of their tracks.

Testing Dual-Actor Coordination in JUnit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When testing multi-actor coordination in JUnit, your test fixture sets up both entities
and verifies that both reached the expected terminal state:

.. code-block:: java

   import student.micro.*;
   import static org.assertj.core.api.Assertions.*;

   public class GuideHedgehogTest extends TestCase
   {
       private Orchard orchard;
       private GuideHedgehog leader;
       private Hedgehog companion;

       @Override
       public void setUp()
       {
           this.orchard = new Orchard();
           this.companion = new Hedgehog();
           this.leader = new GuideHedgehog(this.companion);

           // Place companion on the inner track at (2, 2) facing EAST
           this.orchard.add(this.companion, 2, 2);

           // Place leader on the outer track at (1, 1) facing EAST
           this.orchard.add(this.leader, 1, 1);
       }

       public void testSynchronizedHop()
       {
           this.leader.hop();

           // Both actors must have moved forward by 1 unit
           assertThat(this.leader.getX()).isEqualTo(2);
           assertThat(this.leader.getY()).isEqualTo(1);

           assertThat(this.companion.getX()).isEqualTo(3);
           assertThat(this.companion.getY()).isEqualTo(2);
       }

       public void testSynchronizedPerimeterPatrol()
       {
           this.leader.patrolPerimeter();

           // Both actors must have completed the perimeter circuit and returned home
           assertThat(this.leader.getX()).isEqualTo(1);
           assertThat(this.leader.getY()).isEqualTo(1);

           assertThat(this.companion.getX()).isEqualTo(2);
           assertThat(this.companion.getY()).isEqualTo(2);
       }
   }

By testing both actors in the assertion phase, we prove that the delegation mechanism
successfully coordinates independent objects across different parts of the virtual world.


Stepwise Refinement & Method Length Control
-------------------------------------------

As simulation actors become more sophisticated—handling sensory checks, avoiding hazards,
tracking internal timers, and coordinating with partners—their code complexity can explode.
Without careful discipline, an actor's ``act()`` method can easily devolve into a 50-line
"God method" filled with deeply nested ``if-else`` branches that is impossible to read, debug,
or test.

In this section, we review the software engineering principles of **stepwise refinement**
and **method length control** that keep reactive simulations clean and maintainable.

The Dangers of Monolithic Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider this poorly structured implementation of a reactive foraging actor:

.. code-block:: java

   // POOR PRACTICE: Monolithic, cluttered act() method
   public void act()
   {
       if (!this.isClear(AHEAD))
       {
           this.turn(LEFT);
       }
       else
       {
           if (this.hasApple)
           {
               if (this.getOneIntersectingObject(Burrow.class) != null)
               {
                   this.hasApple = false;
                   this.turn(RIGHT);
               }
               else
               {
                   this.hop();
               }
           }
           else
           {
               if (this.getOneIntersectingObject(Apple.class) != null)
               {
                   this.removeTouching(Apple.class);
                   this.hasApple = true;
               }
               else
               {
                   this.hop();
               }
           }
       }
   }

While this method might run, it suffers from severe design flaws:

1. **High Cognitive Load**: A reader must trace three levels of nested conditionals to
   understand what the agent does in any given circumstance.
2. **Poor Reusability**: Logic like avoiding obstacles or delivering food is locked inside
   ``act()`` and cannot be called or tested independently.
3. **Difficult Testing**: You cannot test "returning to burrow" independently from "searching for apples".

Stepwise Refinement: Breaking Problems into Sub-Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

**Stepwise refinement** is the process of breaking a complex, high-level task down into
smaller, self-contained sub-tasks, and implementing each sub-task as a focused helper method.

When applying stepwise refinement to an ``act()`` method:

* The ``act()`` method should read like an **executive summary** or table of contents.
* Each major decision branch delegates to a private helper method whose name clearly
  describes its intent.
* Each helper method should do exactly **one thing** and do it well (the Single Responsibility
  Principle).

Refactoring with Stepwise Refinement
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Let us refactor the cluttered agent above using stepwise refinement:

.. code-block:: java

   public class CleanHedgehog extends Actor
   {
       private boolean hasApple;

       @Override
       public void act()
       {
           if (!this.isClear(AHEAD))
           {
               this.avoidObstacle();
           }
           else if (this.hasApple)
           {
               this.deliverCargo();
           }
           else
           {
               this.forageForFood();
           }
       }

       private void avoidObstacle()
       {
           this.turn(LEFT);
       }

       private void deliverCargo()
       {
           if (this.getOneIntersectingObject(Burrow.class) != null)
           {
               this.hasApple = false;
               this.turn(RIGHT);
           }
           else
           {
               this.hop();
           }
       }

       private void forageForFood()
       {
           if (this.getOneIntersectingObject(Apple.class) != null)
           {
               this.removeTouching(Apple.class);
               this.hasApple = true;
           }
           else
           {
               this.hop();
           }
       }
   }

Look at how readable this code has become! Anyone reading ``act()`` can immediately
understand the agent's high-level strategy in five seconds: *If blocked, avoid the obstacle;
if carrying an apple, deliver it; otherwise, forage.*

Method Length Bounds ($\le 10$ Lines)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In CS 1114, we enforce clean code standards to foster disciplined software habits. A key
guideline is the **Method Length Bound**:

.. important::

   **The 10-Line Rule**: In general, no method should exceed **10 lines of code** (excluding
   method headers, opening and closing braces, and blank lines).
   
   In reactive agent simulations where an actor must handle sensory checks, state transitions,
   and boundary conditions, this bound ensures that every behavior is partitioned into clear,
   single-purpose helper methods. Any method exceeding this bound must be decomposed using
   stepwise refinement.

Enforcing short methods provides immense practical benefits:

* **Eliminates Spaghetti Logic**: When you are constrained to 10 lines, you cannot write
  deeply nested branches; you are forced to extract helper methods.
* **Self-Documenting Code**: Meaningful helper method names like ``avoidObstacle()`` or
  ``deliverCargo()`` eliminate the need for verbose comments explaining what a block
  of code is trying to do.
* **Streamlined Debugging**: When a test fails, Web-CAT stack traces point directly to the
  specific 8-line helper method where the fault occurred, rather than pointing somewhere
  inside a 50-line monster method.

By combining the reactive simulation cycle, finite state flags, object delegation, and
disciplined stepwise refinement, you have assembled the complete set of architectural tools
needed to construct autonomous, collaborative agents!


Programming Practice 6
----------------------

.. extrtoolembed:: 'Programming Practice 6'
   :workout_id: 1344


.. raw:: html
   
      <footer style="border-top: 1px solid #777;"><div class="footer">
        Selected content adapted from:<br/>
        <a href="http://www.cs.trincoll.edu/~ram/jjj/">Java Java Java, Object-Oriented Problem Solving 3rd edition</a> by R. Morelli and R. Walde,
        licensed under the Creative Commons Attribution 4.0 International License (CC BY 4.0).<br/>
        <a href="https://greenteapress.com/wp/think-java-2e/">Think Java: How to Think Like a Computer Scientist</a> version 6.1.3 by Allen B. Downey and Chris Mayfield,
        licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License (CC BY-NC-SA 4.0).
      </div></footer>
