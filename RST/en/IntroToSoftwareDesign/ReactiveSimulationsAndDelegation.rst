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

    **Estimated Time**: ~46 minutes (~46 min reading at 100 WPM)

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
We will explore the Greenfoot simulation engine, understand the discrete-event simulation
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

Understanding the Simulation Cycle
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Think of the simulation cycle as a movie projector advancing frame by frame. In each
frame (often referred to as a **simulation tick**):

1. The simulation engine selects an actor in the world.
2. The engine calls that actor's ``act()`` method once.
3. The actor inspects its local environment, updates its internal state, performs one
   small action, and returns control to the engine.
4. The engine proceeds to the next actor, invoking its ``act()`` method.
5. Once all actors have acted, the engine updates the screen display and pauses briefly
   to maintain a steady frame rate (e.g., 60 frames per second).
6. The engine repeats the entire cycle for the next tick.

The following pseudocode illustrates the engine's internal execution loop:

.. code-block:: java

   // Conceptual view of the simulation engine loop
   while (simulationIsRunning)
   {
       for (Actor actor : world.getActors())
       {
           actor.act(); // Each actor gets one turn per frame
       }
       world.repaint();
       pause(frameDelay);
   }

The Contract of the ``act()`` Method
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Because the simulation engine invokes ``act()`` on every actor during every frame,
the ``act()`` method carries a strict contract:

.. note::

   **The ``act()`` Contract**: An actor's ``act()`` method must execute a single,
   discrete unit of work and **return immediately**. It should never block the thread
   or attempt to run a complete, multi-step lifecycle in a single invocation.

Consider an autonomous foraging creature. During each simulation tick, the creature
might look ahead, detect whether food is present, take a single step forward, or turn
away from an obstacle:

.. code-block:: java

   public class Forager extends Actor
   {
       @Override
       public void act()
       {
           if (this.canSeeFood())
           {
               this.pickUpFood();
           }
           else if (this.isAtEdge())
           {
               this.turn(45);
           }
           else
           {
               this.move(2);
           }
       }
   }

When the world engine calls ``forager.act()``, the creature performs exactly one of
those three actions and then returns. Over hundreds of consecutive ticks, these small,
rapid decisions accumulate into smooth, lifelike movement.

The Infinite Loop Anti-Pattern
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A frequent beginner mistake when transitioning to simulation programming is placing a
loop inside ``act()`` to complete a task:

.. code-block:: java

   // CATASTROPHIC ANTI-PATTERN: DO NOT DO THIS!
   public void act()
   {
       // Flawed attempt to walk until an obstacle is reached
       while (!this.isAtEdge())
       {
           this.move(2); // Freezes the entire simulation!
       }
   }

Why is this loop catastrophic? Because Greenfoot runs on a single execution thread.
If an actor enters a `while` loop that takes thousands of iterations (or runs infinitely),
the actor **never returns** from its ``act()`` call. As a result:

* No other actors in the world ever get a turn to execute their ``act()`` methods.
* The simulation engine cannot reach the repaint step, causing the graphical user
  interface to freeze completely.
* User inputs (like pressing the "Pause" or "Reset" button) cannot be processed.

In a reactive simulation, **the engine provides the loop**. You do not need a `while`
loop to keep an actor moving forward across frames; you simply command it to take a
single step during each call to ``act()``, and let the repetitive invocation of ``act()``
create the continuous movement.


Finite State Logic & State Flags for Simulation Actors
------------------------------------------------------

Because an actor's ``act()`` method finishes and returns to the engine dozens of times
every second, a fundamental question arises: *How does an actor remember what it was doing
from one frame to the next?*

The Stateless Trap
~~~~~~~~~~~~~~~~~~

Consider what happens if an actor attempts to use a local variable inside ``act()`` to
track its progress:

.. code-block:: java

   public class FlawedScout extends Actor
   {
       public void act()
       {
           int stepsTaken = 0; // LOCAL VARIABLE: Re-initialized every tick!
           stepsTaken++;

           if (stepsTaken > 10)
           {
               this.turn(90);
           }
           else
           {
               this.move(2);
           }
       }
   }

Every time the engine calls ``act()``, a fresh stack frame is created, ``stepsTaken`` is
initialized to ``0``, incremented to ``1``, and then destroyed when ``act()`` terminates.
The variable ``stepsTaken`` never exceeds ``1``, and the scout never turns!

To maintain continuity across simulation ticks, an actor must store its state in
**private instance fields**. Instance fields live in the heap as part of the actor object
and persist for the entire lifetime of the actor, surviving across thousands of ``act()``
invocations.

Boolean State Flags
~~~~~~~~~~~~~~~~~~~

The simplest mechanism for persisting memory across ticks is a **boolean state flag**.
A state flag holds either ``true`` or ``false``, representing whether the actor is
currently in a specific condition or executing a particular mode of behavior.

For example, in a foraging simulation, an agent might need to know whether it is currently
searching for food or carrying food back to its home base:

.. code-block:: java

   public class ForagerAnt extends Actor
   {
       // State flag: persists across all ticks
       private boolean carryingFood;

       public ForagerAnt()
       {
           super();
           this.carryingFood = false;
       }

       @Override
       public void act()
       {
           if (this.carryingFood)
           {
               this.deliverFoodToNest();
           }
           else
           {
               this.searchForFood();
           }
       }

       private void searchForFood()
       {
           if (this.isTouching(Food.class))
           {
               this.removeTouching(Food.class);
               this.carryingFood = true; // State transition!
           }
           else
           {
               this.move(2);
           }
       }

       private void deliverFoodToNest()
       {
           if (this.isTouching(Nest.class))
           {
               this.carryingFood = false; // State transition back to searching!
           }
           else
           {
               this.turnTowardsNest();
               this.move(2);
           }
       }
   }

Notice how clean this architecture is: the value of ``carryingFood`` determines which
sub-behavior is executed during any given tick. When a transition condition is met
(such as touching food), the flag is flipped, and on subsequent ticks, the agent
automatically executes the new behavior.

Accumulator Timers and Counters
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In addition to boolean flags, reactive agents frequently need to coordinate actions
over time. For example, an agent might need to wander in a fixed direction for 20 ticks
before picking a new random heading, or it might become "stunned" for 50 ticks after
colliding with an obstacle.

An **accumulator timer** is an integer instance field that counts simulation ticks:

.. code-block:: java

   public class WanderingGreep extends Actor
   {
       private int wanderTimer;

       public WanderingGreep()
       {
           super();
           this.wanderTimer = 0;
       }

       @Override
       public void act()
       {
           this.wanderTimer++;

           // Every 25 ticks, choose a new heading
           if (this.wanderTimer >= 25)
           {
               int randomAngle = (int) (Math.random() * 60) - 30; // -30 to +30 degrees
               this.turn(randomAngle);
               this.wanderTimer = 0; // Reset the accumulator
           }

           this.move(3);
       }
   }

Each invocation of ``act()`` increments the timer by 1. When the counter reaches the
target threshold, the agent executes the periodic action and resets the timer to zero.

Finite State Machines (FSM)
~~~~~~~~~~~~~~~~~~~~~~~~~~~

When an agent's behavior grows beyond a single boolean flag, we formalize its decision-making
process as a **Finite State Machine (FSM)**. A finite state machine consists of:

1. A finite set of distinct **states** (modes of operation).
2. An **initial state** when the agent is instantiated.
3. A set of **transitions** between states triggered by sensory events or timers.

Consider a simulation agent with three distinct states:

* **SEARCHING**: Wandering the world looking for food piles.
* **GATHERING**: Loading cargo from an active food source.
* **RETURNING**: Navigating back toward the mothership to unload cargo.

.. code-block:: text

   +----------------+     Finds Food     +-----------------+
   |   SEARCHING    | -----------------> |    GATHERING    |
   +----------------+                    +-----------------+
           ^                                      |
           | Cargo Deposited                      | Cargo Full
           |                                      v
   +----------------+                    +-----------------+
   |   RETURNING    | <----------------- |   RETURNING     |
   +----------------+   Turns to Ship    +-----------------+

In Java, we can represent these states using integer constants or an enumeration,
storing the agent's current state in a private field:

.. code-block:: java

   public class AlienAgent extends Actor
   {
       public static final int SEARCHING = 0;
       public static final int GATHERING = 1;
       public static final int RETURNING = 2;

       private int currentState;
       private int gatherTimer;

       public AlienAgent()
       {
           super();
           this.currentState = SEARCHING;
           this.gatherTimer = 0;
       }

       @Override
       public void act()
       {
           if (this.currentState == SEARCHING)
           {
               this.performSearch();
           }
           else if (this.currentState == GATHERING)
           {
               this.performGather();
           }
           else if (this.currentState == RETURNING)
           {
               this.performReturn();
           }
       }

       private void performSearch()
       {
           if (this.canSeeFood())
           {
               this.currentState = GATHERING; // Transition
               this.gatherTimer = 10;          // Initialize load time
           }
           else
           {
               this.move(3);
           }
       }

       private void performGather()
       {
           this.gatherTimer--;
           if (this.gatherTimer <= 0)
           {
               this.currentState = RETURNING; // Transition
           }
       }

       private void performReturn()
       {
           if (this.atShip())
           {
               this.dropFood();
               this.currentState = SEARCHING; // Transition
           }
           else
           {
               this.moveTowardsShip();
           }
       }
   }

By structuring your simulation actors as finite state machines, each operational state
is isolated in its own helper method. The main ``act()`` method simply dispatches to the
appropriate behavior based on the current state, keeping the overall architecture clean
and extensible.


Testing Autonomous Reactive Entities in JUnit
---------------------------------------------

Because reactive simulation actors depend on the continuous invocation of ``act()`` by an
underlying simulation engine, students often wonder: *How can we write automated unit tests
for an actor without launching a graphical window and waiting for it to run in real time?*

The key insight is that ``act()`` is simply a regular Java instance method. In a unit test,
we do not need the graphical Greenfoot engine running at 60 frames per second. Instead,
**our test method becomes the simulation engine**. We instantiate an actor, place it in a
test world, call ``act()`` directly, and immediately assert whether the actor moved to the
expected coordinates or transitioned into the expected state.

Deterministic Single-Tick Assertions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Testing an actor's behavior for a single frame is straightforward. You configure the
actor's initial position and sensory conditions, call ``act()`` once, and check the
results:

.. code-block:: java

   import student.micro.*;
   import static org.assertj.core.api.Assertions.*;

   public class ScoutAntTest extends TestCase
   {
       private World testWorld;
       private ScoutAnt ant;

       @Override
       public void setUp()
       {
           // Create a small, predictable world fixture
           this.testWorld = new TestWorld(100, 100, 1);
           this.ant = new ScoutAnt();
           this.testWorld.add(this.ant, 10, 10);
       }

       public void testSingleTickAdvance()
       {
           // Initial coordinates
           assertThat(this.ant.getX()).isEqualTo(10);
           assertThat(this.ant.getY()).isEqualTo(10);

           // Manually trigger one simulation tick
           this.ant.act();

           // Assert that the ant advanced forward along its heading
           assertThat(this.ant.getX()).isEqualTo(12);
           assertThat(this.ant.getY()).isEqualTo(10);
       }
   }

Notice that our test class inherits from ``TestCase``:

.. code-block:: java

   public class ScoutAntTest extends TestCase

In accordance with our course development environment, test classes always extend
``TestCase`` directly, with the import statement ``import student.micro.*;`` supplying
the appropriate framework base class. The ``setUp()`` method runs before every single
test method, providing a pristine, isolated test fixture.

Testing Multi-Tick Behaviors and State Transitions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Many behaviors require several simulation ticks to unfold. For instance, an actor might
need to count 10 ticks before changing direction, or it might take 5 steps before
reaching an obstacle.

Instead of writing repetitive calls to ``act()``, use a standard ``for`` loop in your test
to advance the simulation clock by an exact, deterministic number of ticks:

.. code-block:: java

   public void testWanderTimerCausesTurn()
   {
       int initialRotation = this.ant.getRotation();

       // Advance the simulation by 9 ticks: timer should not yet fire
       for (int tick = 0; tick < 9; tick++)
       {
           this.ant.act();
       }
       assertThat(this.ant.getRotation()).isEqualTo(initialRotation);

       // The 10th tick reaches the threshold (timer expires)
       this.ant.act();
       assertThat(this.ant.getRotation()).isNotEqualTo(initialRotation);
   }

This approach provides several powerful testing benefits:

1. **Instantaneous Execution**: Running 100 ticks in a `for` loop takes less than a
   single millisecond, allowing large test suites to finish instantly.
2. **100% Determinism**: There are no race conditions or rendering glitches. You control
   the clock with microsecond precision.
3. **Boundary Condition Verification**: You can verify the exact tick where a transition
   occurs (e.g., verifying that state does not change on tick 9, but does change on tick 10).


Object Association: Companion References in Fields
--------------------------------------------------

Up to this point, our instance fields have stored primitive values (`int`, `boolean`, `double`)
or self-contained utility objects (`Color`, `Picture`). However, one of the greatest strengths
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

Consider a scenario where one Jeroo wants to guide or mirror another Jeroo across an island.
To do this, the first Jeroo needs a private field that refers to its companion:

.. code-block:: java

   public class CopyingJeroo extends Jeroo
   {
       // Association: A reference to another Jeroo object
       private Jeroo copier;

       // ...
   }

Here, ``copier`` is not a primitive value; it is a reference variable capable of holding
the memory address of any ``Jeroo`` instance (or subclass instance).

Constructor Reference Injection
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

How does the companion reference get into the field? While a setter method could be used,
the most robust technique is **constructor dependency injection**: passing the companion
object as a parameter when the primary object is instantiated:

.. code-block:: java

   public class CopyingJeroo extends Jeroo
   {
       private Jeroo copier;

       /**
        * Constructs a CopyingJeroo associated with a companion Jeroo.
        * @param copier the companion Jeroo to coordinate with
        */
       public CopyingJeroo(Jeroo copier)
       {
           super();               // Initialize the superclass (Jeroo)
           this.copier = copier;  // Store the reference in our private field
       }

       /**
        * Accessor method for the companion Jeroo.
        * @return the companion Jeroo
        */
       public Jeroo getCopier()
       {
           return this.copier;
       }
   }

Notice what happens during instantiation:

.. code-block:: java

   Jeroo partner = new Jeroo(1, 1);
   CopyingJeroo leader = new CopyingJeroo(partner);

Memory Representation and Aliasing
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When the code above executes, two objects are allocated on the heap:

.. code-block:: text

   STACK                           HEAP
   +---------+                     +-----------------------+
   | partner | ------------------> | Jeroo (x: 1, y: 1)    | <-------+
   +---------+                     +-----------------------+         |
                                                                     |
   +---------+                     +-----------------------+         |
   | leader  | ------------------> | CopyingJeroo          |         |
   +---------+                     |   copier -------------+---------+
                                   +-----------------------+

Both the variable ``partner`` in the calling method and the internal field ``this.copier``
inside ``leader`` point to the **exact same Jeroo object in memory**. This is known as
**aliasing**. If ``leader`` invokes a method on ``this.copier``, the state of ``partner``
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
  ``CopyingJeroo`` *is a* ``Jeroo``, so it automatically inherits basic abilities like
  ``hop()``, ``turn()``, and ``pick()``.
* **Delegation ("HAS-A")**: Cooperates by forwarding requests to an associated object.
  A ``CopyingJeroo`` *has a* companion ``Jeroo``, and asks that companion to perform
  matching actions.

Delegation provides enormous flexibility because the companion can be swapped or modified
without altering class hierarchies.

Overriding Methods with ``super`` and Delegation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To implement delegation, an actor overrides a method inherited from its superclass. Inside
the overridden method, the actor typically does two things:

1. Calls ``super.method()`` so that it performs its own normal action.
2. Invokes the matching method on its companion field (``this.copier.method()``) to delegate
   the action.

Here is the complete implementation of delegated movement and turning in ``CopyingJeroo``:

.. code-block:: java

   public class CopyingJeroo extends Jeroo
   {
       private Jeroo copier;

       public CopyingJeroo(Jeroo copier)
       {
           super();
           this.copier = copier;
       }

       @Override
       public void hop()
       {
           super.hop();               // 1. Move myself forward
           if (this.copier != null)   // 2. Defensive check
           {
               this.copier.hop();     // 3. Delegate to partner
           }
       }

       @Override
       public void turn(RelativeDirection direction)
       {
           super.turn(direction);     // 1. Turn myself
           if (this.copier != null)   // 2. Defensive check
           {
               this.copier.turn(direction); // 3. Delegate to partner
           }
       }
   }

Notice the critical check: ``if (this.copier != null)``. This is **defensive programming**.
If a ``CopyingJeroo`` is instantiated with a ``null`` companion (or without an assigned
partner), calling ``this.copier.hop()`` would cause a catastrophic ``NullPointerException``.
The null check ensures that the actor continues to function safely even when operating solo.

Delegating Overloaded Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In Java, methods can be *overloaded*—meaning multiple methods share the same name but have
different parameter lists. In the Jeroo class, both ``hop()`` and ``turn()`` are overloaded:

* ``hop()`` and ``hop(int times)``
* ``turn(RelativeDirection dir)`` and ``turn(CompassDirection dir)``

When implementing delegation, you must be careful to override and delegate **each overloaded
variant** that clients might invoke:

.. code-block:: java

   @Override
   public void hop(int times)
   {
       super.hop(times);
       if (this.copier != null)
       {
           this.copier.hop(times);
       }
   }

   @Override
   public void turn(CompassDirection direction)
   {
       super.turn(direction);
       if (this.copier != null)
       {
           this.copier.turn(direction);
       }
   }

By delegating every variant, you ensure that no matter how an external caller commands the
primary actor to move or turn, the companion mirrors the behavior faithfully.


Synchronized Multi-Actor Coordination Algorithms
------------------------------------------------

Now that we understand how an actor delegates individual actions to a companion, let us
examine how to build higher-level algorithms where multiple actors coordinate their movements
in synchronized harmony.

Twin-World Synchronization: The Dual Island Problem
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In **Lab 06 (Delegation & Agent Coordination)**, we explore multi-actor coordination using a
special environment called ``DualIsland``. A ``DualIsland`` consists of two separate,
isolated landmasses located within the same simulation world:

1. **Island 1 (West)**: Contains our primary actor, an instance of ``CopyingJeroo``.
2. **Island 2 (East)**: Contains the companion actor, a standard ``Jeroo``.

The two islands have identical perimeter boundaries. However, the companion ``Jeroo`` on
Island 2 does not possess any autonomous search logic of its own. It relies entirely on
the ``CopyingJeroo`` on Island 1 to guide it.

When the ``CopyingJeroo`` executes an exploration algorithm on Island 1, every step and turn
it performs is delegated across the sea to Island 2. As a consequence, the two actors
trace identical paths across their respective islands in perfect synchronization!

Perimeter Navigation: The ``walkIsland()`` Algorithm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A classic coordination task is perimeter navigation. An actor must traverse the outer edge
of an island, hopping from cell to cell along the boundary, until it returns to its exact
starting coordinates.

Here is the algorithm implemented as a method on ``CopyingJeroo``:

.. code-block:: java

   public class CopyingJeroo extends Jeroo
   {
       private Jeroo copier;

       public CopyingJeroo(Jeroo copier)
       {
           super();
           this.copier = copier;
       }

       /**
        * Traverses the perimeter of the island until returning to the
        * starting position, mirroring all actions on the companion copier.
        */
       public void walkIsland()
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
        * Helper method: takes one navigation step keeping water to the right.
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

* The ``walkIsland()`` method does not write a single line of explicit code directing the
  companion!
* Because ``walkIsland()`` calls ``this.hop()`` and ``this.turn(RIGHT)``, Java's dynamic
  method dispatch invokes ``CopyingJeroo``'s overridden versions of those methods.
* Those overridden methods call ``super.hop()`` (moving the primary actor) and
  ``this.copier.hop()`` (moving the companion).
* As a result, simply commanding ``leader.walkIsland()`` causes **both** actors to complete
  a full synchronized circuit of their respective islands.

Testing Dual-Actor Coordination in JUnit
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When testing multi-actor coordination in JUnit, your test fixture sets up both entities
and verifies that both reached the expected terminal state:

.. code-block:: java

   import student.micro.*;
   import static org.assertj.core.api.Assertions.*;

   public class CopyingJerooTest extends TestCase
   {
       private DualIsland island;
       private CopyingJeroo leader;
       private Jeroo follower;

       @Override
       public void setUp()
       {
           this.island = new DualIsland();
           this.follower = new Jeroo();
           this.leader = new CopyingJeroo(this.follower);

           // Place follower on Island 2 at (1, 1) facing EAST
           this.island.add(this.follower, 1, 1);

           // Place leader on Island 1 at (1, 1) facing EAST
           this.island.add(this.leader, 1, 1);
       }

       public void testSynchronizedHop()
       {
           this.leader.hop();

           // Both actors must have moved forward by 1 unit
           assertThat(this.leader.getX()).isEqualTo(2);
           assertThat(this.leader.getY()).isEqualTo(1);

           assertThat(this.follower.getX()).isEqualTo(2);
           assertThat(this.follower.getY()).isEqualTo(1);
       }

       public void testSynchronizedPerimeterWalk()
       {
           this.leader.walkIsland();

           // Both actors must have completed the perimeter and returned home
           assertThat(this.leader.getX()).isEqualTo(1);
           assertThat(this.leader.getY()).isEqualTo(1);

           assertThat(this.follower.getX()).isEqualTo(1);
           assertThat(this.follower.getY()).isEqualTo(1);
       }
   }

By testing both actors in the assertion phase, we prove that the delegation mechanism
successfully coordinates independent objects across different parts of the virtual world.


Stepwise Refinement & Method Length Control
-------------------------------------------

As simulation actors become more sophisticated—handling sensory checks, avoiding hazards,
tracking internal timers, and delegating tasks to partners—their code complexity can explode.
Without careful discipline, an actor's ``act()`` method can easily devolve into a 60-line
"God method" filled with deeply nested `if-else` branches that is impossible to read, debug,
or test.

In this section, we review the software engineering principles of **stepwise refinement**
and **method length control** that keep reactive simulations clean and maintainable.

The Dangers of Monolithic Methods
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Consider this poorly structured implementation of a reactive simulation agent:

.. code-block:: java

   // POOR PRACTICE: Monolithic, cluttered act() method
   public void act()
   {
       if (this.isAtWater())
       {
           this.turn(180);
           this.move(2);
           this.waterTimer = 10;
       }
       else
       {
           if (this.hasFood)
           {
               if (this.distanceToShip() < 10)
               {
                   this.unloadFood();
                   this.hasFood = false;
                   this.turn(180);
               }
               else
               {
                   this.turnTowardsShip();
                   this.move(3);
               }
           }
           else
           {
               if (this.canSeeFood())
               {
                   this.pickUpFood();
                   this.hasFood = true;
               }
               else
               {
                   this.move(3);
               }
           }
       }
   }

While this method might run, it suffers from severe design flaws:

1. **High Cognitive Load**: A reader must trace three levels of nested conditionals to
   understand what the agent does in any given circumstance.
2. **Poor Reusability**: Logic like turning away from water or returning to the ship is
   locked inside `act()` and cannot be reused elsewhere.
3. **Difficult Testing**: You cannot test "returning to ship" independently from "seeing food".

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

   public class CleanAgent extends Actor
   {
       private boolean hasFood;

       @Override
       public void act()
       {
           if (this.isAtWater())
           {
               this.avoidWater();
           }
           else if (this.hasFood)
           {
               this.deliverCargo();
           }
           else
           {
               this.forageForFood();
           }
       }

       private void avoidWater()
       {
           this.turn(180);
           this.move(2);
       }

       private void deliverCargo()
       {
           if (this.atShip())
           {
               this.unloadCargo();
           }
           else
           {
               this.turnTowardsShip();
               this.move(3);
           }
       }

       private void forageForFood()
       {
           if (this.canSeeFood())
           {
               this.loadCargo();
           }
           else
           {
               this.move(3);
           }
       }

       private void loadCargo()
       {
           this.pickUpFood();
           this.hasFood = true;
       }

       private void unloadCargo()
       {
           this.dropFood();
           this.hasFood = false;
           this.turn(180);
       }
   }

Look at how readable this code has become! Anyone reading ``act()`` can immediately
understand the agent's high-level strategy in five seconds: *If at water, avoid it; if
carrying food, deliver it; otherwise, forage.*

Method Length Bounds ($\le 10$ Lines)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In CS 1114, we enforce clean code standards to foster disciplined software habits. A key
guideline is the **Method Length Bound**:

.. important::

   **The 10-Line Rule**: In general, no method should exceed **10 lines of code** (excluding
   method headers, opening and closing braces, and blank lines).
   
   In complex reactive simulations—such as **Program 03 (Invasion of the Greeps)**—where
   an agent must handle multiple sensor branches and state transitions, a slight extension
   to a maximum of **12 lines** is permissible. Any method exceeding this bound must be
   decomposed using stepwise refinement.

Enforcing short methods provides immense practical benefits:

* **Eliminates Spaghetti Logic**: When you are constrained to 10 lines, you cannot write
  deeply nested loops and `if` ladders; you are forced to extract helper methods.
* **Self-Documenting Code**: Meaningful helper method names like ``retreatFromWater()`` or
  ``findNearestTomato()`` eliminate the need for verbose comments explaining what a block
  of code is trying to do.
* **Streamlined Debugging**: When a bug occurs, Web-CAT stack traces point directly to the
  specific 8-line helper method where the fault occurred, rather than pointing somewhere
  inside a 70-line monster method.

By combining the reactive simulation cycle, finite state flags, object delegation, and
disciplined stepwise refinement, you have assembled the complete set of architectural tools
needed to conquer **Lab 06** and **Program 03**!


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
