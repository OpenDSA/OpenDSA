.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Cliff Shaffer
   :topic: OpenDSA

How to Use this System
======================

**Welcome to OpenDSA!**
OpenDSA is an open source project whose goal is to provide online
course materials for a wide range of Computer Science courses.

**Learning Management Systems and OpenDSA Book Instances**
OpenDSA materials are most often presented in the form of a
"textbook instance" as content within some Learning Management System
(LMS), such as Canvas or Moodle.
Your OpenDSA "textbook" is made up of a series of modules.
Each module corresponds to roughly one section in a regular textbook,
or what might get presented in part of a one-hour lecture.
Your LMS might further break modules into smaller sections, one on
each page.
OpenDSA content combines text and images with algorithm visualizations
for all of the algorithms, along with lots of interactive assessment
exercises.
The goal of the exercisees is to let you know if you really understand
what you have been reading.

**Registration and Accounts:**
This is an open source project, and in keeping with the spirit of our
commitment to openness, our materials are free for use.
We maintain versions of our materials that are publicly accessible.
However, your particular textbook instance for your course is likely
to require that you go through some LMS, with its own login process.
In this way, you and your instructor can track which OpenDSA materials
and exercises that you have completed.

**Overview of major elements:**
An OpenDSA module contains a number of interactive components
intended to help you learn the material, in addition to regular text
and graphics.
Most modules include short slideshows that help explain steps of an
algorithm.
OpenDSA also includes full Algorithm Visualizations that go through a
complete example of the algorithm (these will usually let you set the
input data if you like).
There are many "proficiency exercises" where you show the steps 
taken by an algorithm.
There are also many sets of multiple choice, fill-in-the-blanks, and
True/False questions.
There are also various calculators, simulations, and other types of
interactive exercises.

**Getting credit:**
You can get "completion" for doing the various activities.
When any of the following activities are completed, the interface
should give you some type of feedback such as showing a green
checkmark or shading an associated line in the LMS gradebook:
going through a slideshow, completing a proficiency exercise,
completing a question set, or fulfilling the requirements of a
calculator or other exercise.
Depending on how your book is configured, completing an activity might
or might not give assignment points, as shown in the gradebook for
your LMS.

**Seeing your credit and seeing your current score:**
Usually an exercise or slideshow will give you visual confirmation
when you have completed it.
If you complete all exercises and slideshows for a module, the title
line should show "Module Complete" in green.
Your LMS might indicate complete modules in its "table of contents"
listing of modules.
More likely, the LMS gradebook will indicate which exercises have been
completed.

**Slideshows:**
Slideshows are controlled by the buttons at the top of the slideshow.
"<" and ">" buttons will back up or advance by one slide, while "<<"
and ">>" will take you to the beginning or end of the slideshow.
You get "completion" for a slideshow just for progressing to the end
(one step at a time).
A green checkmark should show up on the right when you complete it.
Depending on your your book instance is configured, completing a
slideshow might give you points or it might not.

**Algorithm Visualizations:**
Slideshows demonstrate a part of an algorithm on a fixed input.
The Algorithm Visualizations let you run the whole algorithm,
typically on input that you can choose.
The Algorithm visualizations will have some parameters that you can
set (such as number of elements in an input array,
and the values of the array elements).
The "Run" button will start (or restart) the Algorithm Visualization.
It will also begin the visualization with new, randomly selected
data values if you did not specify your own input.
"Reset" will typically clear all of the input fields and restart the
visualization.
Many visualizations have a "Help" button to give detailed information
about that particular visualization.

**Question Sets:**
Most modules finish with a collection of multiple
choice, True/False, or type-a-number questions.
To get credit for a question set, you will have to
answer some number of the questions correctly (the exact number
required can be different for each question set).
Once you have credit, the interface should indicate this.
You can still get more questions at that point if you would like more
practice.
Above the question on the right-hand side is a counter to indicate
your current number of questions correct out of the total number
needed to complete the exercise.
If you answer a question wrong, your progress toward the completion
threshold will go backwards by one point.
(And you will still have to answer that question before you can
continue!)
Note that once you have been given completion credit for the question
set, you cannot lose that credit by answering more questions, even if
you then get some wrong.

The question sets work by randomly selecting from the questions
available to that set.
Typically, once you correctly answer a question, you will not see it
again (or at least not with the same inputs).
But if you answer it incorrectly (and then clear it with the correct
answer), it might appear again.

The questions will have "hints" that you can use to help you
figure out the answer.
If you take a hint, you will not get credit for that question toward
completing the exercise.
However, you will not lose a point on that question, either.

**Interactive Questions:**
Some of the question are interactive, in that that you will click on
an array, tree node, or other visual element to answer the question.
They work the same way as the multiple choice questions,
in that there is a required number that you must get right to complete
the exercise successfully.

**Proficiency Exercises:**
Proficiency exercises are graded on a point system.
Each (logical) step that you do correctly in the proficiency exercise
gives you a point.
You need to get a set fraction of the total possible points to
complete the exercise (typically 90% of the possible points).
Generally, if you make a mistake on a proficiency exercise, it will
tell you that you did the step wrong and correct it for you so that
you can continue on.
You will not get credit for that particular step
when you do it wrong, but you can still get credit for the remaining
steps.
Once you get completion credit for a proficiency exercise, the LMS
interface should give some indication of this.

Note that the "points" as counted by the proficiency exercise is
different from the credit assigned by the LMS for completion of the
exercise.
For example, to complete the proficiency exercise for a particular
sorting algorithm, you might need to complete 18 of 20 steps in the
exercise correctly.
Once you have done this, the LMS might award you (for example) 2
points of completion credit.
You can always practice an exercise as many times as you like, whether
you already have completion credit or not.

**Settings Button:**
The visualizations, slideshows, and proficiency exercises usually have
a button in the upper right corner with a gear icon on it.
That will let you change some of the default settings,
such as the animation speed (usually used for things like the swap
steps in the sorting algorithm visualizations), or whether the arrays
show values or height bars.

**Enlarging Equations:**
Math is rendered using the MathJAX library,
which gives you a lot of options on how you can see things.
Most importantly, if you right click on any math equation, you will
get a context menu that includes "Math Settings".
This in turn has a sub-menu named "Zoom Trigger".
With that, you can set zoom to "hover" or "click".
From then on, hovering or clicking (if you had selected one) on any
equation will make it larger.
This can really help with reading some of the equations.
