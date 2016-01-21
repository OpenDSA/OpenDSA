.. _KAExercise:

Using OpenDSA with the Khan Academy infrastructure
==================================================

We use the Khan Academy (KA) infrastructure for writing questions.
KA supplies some documentation at their
`wiki <https://github.com/Khan/khan-exercises/wiki/>`_.

In the rest of this section, we will go through examples of the most
common question types used in OpenDSA.

In general, each given question gets defined in its own HTML file
(with an associated JavaScript file if necessary).
This promotes maximum flexibility and reuse.
New exercises are normally stored in
``~OpenDSA/Exercises/Development`` until they have been reviewed.

Summary Exercises
-----------------

Individual questions, as appropriate, can be grouped together into
"summary" exercise.
These can in turn be grouped together into a broader summary, such as
an end-of-chapter review.
``~OpenDSA/Exercises/Background/IntroSumm.html`` provides a typical
example.
If you are creating a new summary exercie, you can copy this file and
start by changing the title on line 4.
Note that the two library includes on lines 5 and 6 are needed for all
Khan Academy exercises within OpenDSA.
Replace lines 9-16 with your exercises, one per line, using the same
format as these lines use.
Note that ``data-name`` takes a file name using a path relative to the
summary exercise.

Math and Variables
------------------

You can include math (in LaTeX notation) by bracketing it in
``<code></code>``.
See ``~OpenDSA/Exercises/Background/MthBgMCQperm.html`` for simple
examples.

You can define variables to generate random values or compute
results.
``~OpenDSA/Exercises/List/ListOverhead.html`` shows an example.
It also shows simple use of JavaScript for computation, but
anything more complicated than this should separate the JavaScript
into a separate file (see examples below).


True/False Questions
--------------------

``~OpenDSA/Exercises/Design/CompareTF2.html`` is an example of a
typical simple T/F question.
Simply change the question in the "question" paragraph, set "solution"
to be ``True`` or ``False``, and set the hints.

**ALL** questions (aside from summary exercises) should have at least
one hint!

``~OpenDSA/Exercises/Design/CompareTF1.html`` shows use of simple
alternate wording, called a "spin".
Note the required change in line 2 to load "spin" support.

``~OpenDSA/Exercises/Background/SetTFequivrel.html`` shows
sophisticated use of variables to generate a variety of questions.
It also shows use of ``katex`` functionality to support interpretation
of math inside a string (not a typical problem that you will
encounter).


Multiple Choice Questions
-------------------------

The simplest form of MCQ is shown in
``~OpenDSA/Exercises/Background/IntroMCQeff.html``.
Just change your title, your question, the text for the choices (add
as many as you like), and the hints.
This style of MCQ will show the answer string and the choices strings,
all arranged in random order each time the question is presented.
Note that the correct answer is **not** included as a choice.
In contrast, T/F questions are a special type of MCQ where the
question choices are given in the specified order (and the correct
answer is therefore also one of the listed choices).
``~OpenDSA/Exercises/Design/CompareMCQ4.html`` is an MCQ with fixed
choices.

``~OpenDSA/Exercises/Binary/HparentMCQ.html`` shows a somewhat
different approach.
Line 18 has two key flags.
``data-show`` is set to 4, meaning that 4 choices will be shown.
``data-none`` is set to true, which means that the choice ``None of
the above`` will always appear.
Counting the correct answer, the four distractors, and ``None of the
above``, this means that there are six possible choices to display
(``None of the above`` will appear last, and three of the other five
will appear at random).
When the correct answer is not shown, ``None of the above`` becomes
the correct answer.
If a student chooses that, then the correct answer is shown after
clicking the ``Check answer`` button.


Fill-in-the-Blank Questions
---------------------------

See ``~OpenDSA/Exercises/Background/MthBgFIBlgbs1.html`` for simple
FIB formatting.
It is important to understand that the KA framework provides support
for processing certain types of student inputs.
The simplest approach is to do an exact string match, as in this
simple example.
This is indicated by the fact that line 15 includes the tag
``data-type="text"`` (even though the student answer is actually a
number, they have type it exactly this way).
``~OpenDSA/Exercises/Background/AlgAnlsFIBsqrt.html`` shows off two
different features.
It will allow the student to type either of two diffrent answers:
the string "1/2" or anything that is the decimal equivalent to 0.5.

``~OpenDSA/Exercises/Background/MthBgFIBstckfn.html`` uses custom
JavaScript to interpret student answer.
Note the specific syntax of lines 33-40 that you can use as a
template.
Again, anything more than a few lines of code should be separated into
its own JavaScript file, as described next.
For more details about what is going on here, see the
KA `wiki <https://github.com/Khan/khan-exercises/wiki/>`_.


Using JavaScript and JSAV within the Khan Academy Framework
-----------------------------------------------------------

Using JavaScript in a KA exercise requires some non-standard
processing (since these are not vanilla HTML files).
We also include in our client-side framework special features
to support including JSAV visualization elements.

``~OpenDSA/Exercises/AlgAnal/GrowthRatesPRO.html`` and 
``~OpenDSA/Exercises/AlgAnal/GrowthRatesPRO.js`` show a simple
example.
Note line 6 of the HTML file, where ``CompareGrowth`` is referenced.
This is defining the name of the JavaScript file to include (normally
the name has to match that of the HTML file, otherwise the search
process will be looking in other places for the file).
Note the syntax used on line 30 of ``compareGrowth.checkAnswer``.
This tells the exercise to look for the definition of function
``checkAnswer`` externally (in the JavaScript file).
The first 4 and last 2 lines of this JavaScript file should be copied
verbatim to your file, changing the name ``compareGrowth``
to the corresponding name that you use.
It is relevant that the name matches the file name, with the first
letter in lower case.
Any functions or variables that are to be "exported" to the HTML file
need to be in the equivalent to the ``compareGrowth`` object.
Other functions can be defined outside of that object in normal
fashion.

``~OpenDSA/Exercises/AlgAnal/GrowthRatesPRO.html`` and 
``~OpenDSA/Exercises/AlgAnal/GrowthRatesPRO.js`` show a relatively
simple example of using JSAV with the Khan Academy framework.
Note that all of the following naming conventions should be observed
unless you know what you are doing when you change it.

Line 7 of the HTML file requires that ``jsav`` be included, along with
the name of the exercise file (which must be the same as the matching
.js file to be included.
Exercise file names (and their JavaScript file) must begin with a
capital letter.

Any required CSS styling is included in the .html file for the
exercise.
Be aware that many elements have defined styles already that should
not be overwritten without cause.
``GrowthRatesPRO`` is a rare exception in that it explicitly needs to
define the JSAV array cells to be large.
Most JSAV-based exercises have only a height value, and all CSS
elements should include the file name to keep from colliding namespace
with other parts of the page.
Never adjust the width of the .jsavcanvas.
You have no reason to make it narrower than the default, and you will
probably break things if you make it wider.

The body tag (Line 12) must include the ``data-height`` and
``data-width fields.
Always set ``data-width="950"``.
Make sure that the height can accommodate the hints when they are
displayed.

The ``div`` tag on line 44 has an ID field whose name is the exercise name with "p" added at
the end.
The ``div`` tag on line 52 has an ID field whose name is the exercise name.
Any variables or functions imported from the JavaScript is preceeded
with the exercise name, but with the first letter in lower case.
Lines 54-63 should use this syntax, with the exercise name changed as appropriate.

Moving to the JavaScript file, we first see that ``window`` is always
tagged as a global.
Any other global packages (in this case, ``katex`` would appear there
as well.
We always use the functional version for the ``"use strict"``
directive, so as not to break other JavaScript loaded on the page (in
particular, the KA framework code won't work under strict rules).

Any functions or variables to be exported to the HTML file **must** be
declared inside an object that uses the exercise name, with the
initial letter changed to lower case.
We must use the declaration syntax shown for the declarations in the
object.
Any other functions and variables that we want to create, outside the
scope of the object, can use your preferred JavaScript declaration
syntax.
Note the last two lines of the file, where the object name is
exported.

The JSAV object **must** be declared with the exercise name
for its parameter.
It is petty much universal that the JSAV objects appear as a static
display (that is, not a JSAV slideshow).
Lines 86-90 show the standard format for this section, beginning with
creating the JSAV object, followed by setting out any JSAV objects
(this one is pretty simple in that there is only a single JSAV array),
followed by the ``displayInit`` and ``recorded`` to get the elements
displayed on the HTML page.

Naming Conventions
------------------

Summary exercises should **always** be given names of the form
``<topicname>Summ.html``.

T/F questions should have file names as ``<topicname>TF<question>.html``.
Multiple choice questions should be named as
``<topicname>MCQ<question>.html``.
Fill-in-the-blank questions should be named as
``<topicname>FIB<question>.html``.
It is bad style to use counts (like 1, 2, 3) for the ``<question>``
part in the name for a series of questions.

Proficiency exercises should be named as ``<topicname>PRO.html``.
A proficiency exercise is something where the student must manipulate
a data structure (including any exercise where the user interface for
answering the question is to click or drag JSAV objects), or sometimes
work a problem to reach an answer.
In the case where students do a computation to complete a
fill-in-the-blank problem, this might be a matter of judgement on how
to name it.
Generally, a fill-in-the-blanks question that generates random problem
instances and is presented as a stand-alone exercise to students
should probably be named as a proficiency exercise.


Common Errors
-------------

Your exercise might generate a console error that looks like::

   Error while evaluating var#JSAV
   khan-exercise.js:359 TypeError: Cannot read property 'id' of undefined(…)

This is a common problem. Nearly always, it means that either you
forgot to include ``jsav`` in the ``data-require`` field of the ``<html>``
tag, or else you got the names wrong somewhere for the divs.
