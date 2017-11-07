.. _EventMessages:

.. raw:: html

  <style>
    tt {
      background-color: white;
    }
  </style>

====================
Event Message Format
====================

The client-side framework transmits two categories of data to the
server: student interaction data events and exercise attempt
events. Student interaction events are buffered in the browser’s local
storage as a list of objects, for each student, for each book
instance. The buffered objects are sent to the server in batches to
increase client-server communication efficiency by reducing the
network traffic. Exercise attempt events fire whenever the client-side
framework determines that the student has completed an "attempt" with
an exercise. The precise information that is transmitted to the server
depends on the exercise type.

Interaction Data Events
-----------------------

Student interaction events are two main types. The first is student click events, either on control buttons or on interface objects related to manipulating an exercise (such as clicking on the value in an array to show behavior in a sorting algorithm). The second type of interaction event relates to loading or unloading a module page, or changing focus into or out of the page. Interaction data events will typically transmit data fields such as:

  * type - the type of the event: module load/unload event or JSAV event
  * desc - a stringified JSON object containing additional event-specific information
  * av - the name of the JSAV-based material with which the event is associated (``null`` string if it is a module-level event)
  * uiid - the unique instance identifier, which allows an attempt event to be tied to a specific instance of an exercise in a specific load of a module page
  * module - the module with which the attempt event is associated
  * user_email - student's email
  * inst_book_id - instance book database Id
  * inst_section_id - instance book section Id
  * tstamp - a timestamp in which the event has occurred

Event data is stored in the browser local storage using a key of the form: 'event-[timestamp]-[random_number]'.  The 'event' prefix identifies the object as user interaction data, while the timestamp helps make the key unique and allows the framework to quickly determine whether the associated event occurred prior to the timestamp taken when the send function was called.  The random number ensures that if two events are logged at the exact same time they will not overwrite each other.  While possible, the probability of two events being logged at the exact same time and having the same random number is negligible.

Example:

.. code-block:: javascript

  localStorage["event-1377743343193-8"] = '{
    "type": "document-ready",
    "desc": "\"User loaded the 00.01.01 - How to Use this System\"",
    "av": "",
    "uiid": 1500227646237,
    "module": "Intro",
    "user_email": "hshahin@email.edu",
    "inst_book_id": "31",
    "inst_section_id": "",
    "tstamp": 1500227646286
  }'                                          

Proficiency Exercise Attempt Object
-----------------------------------

Unlike Interaction data events, the client-side framework will attempt to send the exercise attempts to the server immediately. Each proficiency exercise data object contains the following fields:

  * exercise - the name of the exercise with which the attempt event is associated
  * module - the module with which the attempt event is associated
  * score - a decimal number between 0.0 and 1.0 indicating a student’s attempt score
  * steps_fixed - the number of steps fixed by the auto-grader during the attempt
  * submit_time - the time in which a student finished the attempt
  * total_time - the total time a student spent working on the attempt
  * uiid - the unique instance identifier, which allows an attempt event to be tied to a specific instance of an exercise in a specific load of a module page
  * user_email - student's email
  * inst_book_id - instance book database Id
  * inst_section_id - instance book section Id

Khan Academy Exercise Attempt Object
------------------------------------

Khan Academy exercise framework sends two types of events to the server. First, the attempt event is sent whenever a student solves an exercise question and hits "Check Answer" button. Second, the hint event is sent whenever a student hits the hint button on a question. Khan Academy event object contains the following fields:

  * exercise - the name of the exercise with which the attempt event is associated
  * module - the module with which the attempt event is associated
  * count_attempts - attempts counter for how many times a particular question has been attempted
  * attempt_content - student answer
  * correct - "1" if the answer is correct, "0" otherwise
  * count_hints - hints counter for how many times a particular question hint has been used
  * time_taken - the total time a student spent working on the attempt
  * remote_adrr - student IP address
  * user_email - student's email
  * inst_book_id - instance book database Id
  * inst_section_id - instance book section Id
  * request_type - "attempt" or "hint"

