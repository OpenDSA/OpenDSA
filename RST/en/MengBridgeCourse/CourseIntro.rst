.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Understanding this Course
=========================


Who Is This Class For?
----------------------

This course teaches introductory programming in Java, with a significant
emphasis on object-oriented software design and on software testing.
It is taken by students majoring in Computer Science, minoring
in Computer Science, and also by students in other majors thinking about
studying Computer Science.

It can be very helpful if you have already had some exposure to programming.
Basic familiarity with variables and sequential logic will give you a leg up.
However, the course is designed to be approachable by beginners who do not
have any significant programming background. Indeed, it has developed to help
people who are interested in starting on a path towards a programming career
who are coming from other, not-computing disciplines.

Students of Many Experience Levels
----------------------------------

While this course is designed and intended for beginners, please be aware
that students from a very wide range of backgrounds take this course, including
some students who may have significant amounts of prior programming
experience. Just remember that while there are many reasons why students who
already know how to program might take this course, the course isn't intended
for that audience. You may see such students in the course discussions, asking
and answering questions that appear to
require significantly more programming knowledge. The course staff are happy
to answer such questions, but please remember that we do not expect students
in this course to possess that level of knowledge or to perform as if they
have already learned how to program prior to taking this course.

Online, Asynchronous, Self-paced
--------------------------------

This course is designed to be taken in an asynchronous, self-paced fashion.
All students share the same syllabus, course content, and assignments.
However, be aware that the course website on Canvas and the course
discussion areas involve students who are at different places in the course,
and progressing at different speeds, so you will likely to
see questions or information that span the course.

While the course is self-paced, we strongly encourage students to complete the
course in 12 weeks. We do this for two reasons. First, the course is designed
around 12, one-week units which will allow students to complete the course in
a sufficiently long time to grasp the material, but not so long that they don't
complete it in time to enroll in classes during the fall semester. Secondly,
research has show that students in a self-paced course are more likely not to
complete the course if there is an open-ended deadline. We want you to complete
the course successfully, and have a time window for completion will help you to
achieve this success.

Learning Outcomes
-----------------
The goal of this course is to prepare students to have the programming background
necessary to be successful in the Computer Science Masters of Engineering program.
When students complete this course, the should be able to:

* Demonstrate proficiency in the purpose and behavior of basic programming constructs, including variables, control structures, and methods.
* Design programs to solve computational problems using object-oriented programming processes.
* Develop reusable, type-safe software components.
* Employ test-driven development to design and create an effective testing process.
* Employ an Integrated Development Environment to iteratively develop and test medium-sized programs including interactive applications.
* Apply basic algorithm analysis to simple algorithms.
* Design data structures such as linked lists, stacks, and queues.
* Solve problems using recursive algorithms such as for implementing a binary tree.

Course Support
---------------
This course is offered asynchronously, and has been designed to guide you step-by-step
through the material. But, sometimes it helps to have someone to ask questions to. You
have two avenues for getting assistance in the course.

* The course has a teaching assistant assigned. This person can help you figure out technical issues, as well as answer questions about the material.
* You can ask questions using the discussion tool in Canvas. This provides a venue that you and your fellow students can use to collaborate, as well.

Weekly Schedule
---------------

This course is designed around weekly units. This allows you to plan how far
you need to get week-to-week to stay on track. Also, the course is designed
so that the material you learn in one week is the background you need for the
material covered in the following week. Make sure to do the work in order,
to stay on track, and so you are adequately prepared for each new topic
covered in the course.


Reading Activities
------------------

Each unit begins with a Reading Activity that includes embedded exercises
to check your understanding and to allow you to practice what you are learning.
These exercises are important to make sure you understand the material, so
don't skip them. They will prepare you for the lab and project exercises.

Labs
----

Each unit also includes a lab assignment. These labs give you hands-on
experience with more structure than a typical programming assignment.
You can submit your lab as many times a you want, and make corrections based on the
feedback you receive. Labs are intended as practice activities to reinforce the concepts
you are learning, and it is natural and expected that you may regularly run into situations
where you wish to ask TAs for clarification or assistance on something you have not seen
before. This is what the course discussion boards are for.


Programming Assignments <<TODO: REVISIT>>
-----------------------------------------

Programming assignments will be part of each unit. Programming assignments typically come
in pairs: in one, your programming assignment will be to work on a brand new problem
setting up your solution and making sure you have a solid starting point. The next, your
programming assignment will be to fill in the remainder of that starting point to flesh
it out into a full solution.


In this course, we will cover a total of <<TODO: INSERT FINAL NUMBER HERE>> programming
assignments, arranged in <<TODO: INSERT FINAL NUMBER HERE>> pairs. Each odd-numbered
assignment will start a completely new problem
with setting up your solution, and each even-numbered assignment will involve
building the corresponding solution to a working final product.
This means that the work necessary for the first assignment in each
pair is an integral element of your solution for the second assignment of the
pair the following week. So even if you fail to turn in the first part, you
will still need to make up the work in order to successfully complete the
second half. Please keep this in mind when planning how to approach the
programs.

Downloading and Installing Eclipse
----------------------------------

This course teaches programming using Java. We will use the Eclipse
integrated development environment (commonly called an IDE)
for code development in class, including all examples shown.
The instructions here include the user libraries necessary for
assignments in this course, and programming assignments will not
compile without these.

Note: this setup involves a lot of steps and it's not uncommon for students to
miss something in their first time through.  If you've installed everything, but
can't get any code to run at all, it's good to try uninstalling Eclipse and just
installing it again.

1. Open `https://www.eclipse.org/downloads/ <https://www.eclipse.org/downloads/>`

3. Select the **Eclipse** download from the yellow/orange download button
(select the 64bit or 32bit version to correspond to the version of the JDK you
installed, please be aware: versions may change by semester).

4. Download the distribution and follow installation instructions,
selecting **IDE for Java Developers** when prompted.

5. Start Eclipse. ( If you are on a Mac, you need to set
``System Preferences > Security and Privacy`` to allow apps downloaded from
locations other than the Mac App Store.)

6. The first time you start Eclipse, you'll be asked to specify a location for
the Eclipse Workspace; this is where Eclipse will keep your programming
projects. You can either use the default recommendation or place it elsewhere
on your file system. Check **Use this as the default** and do not ask again so
that Eclipse will not ask you every time you start it, and click **OK**.


.. odsafig:: Images/SetupFig1.png
   :align: center


You may see a notice about a requirement needing an update.  Click the
checkbox **Remember my Decision** then select **Install**.


.. odsafig:: Images/SetupFig2.png
   :align: center


7. The initial Eclipse startup screen has a Welcome tab with an
Overview, Tutorials, Samples, and a "What's New" section.


.. odsafig:: Images/SetupFig3.png
   :align: center


Feel free to explorethe options and then proceed to the Workbench.


.. odsafig:: Images/SetupFig4.png
   :align: center


8. Once you're at the Workbench, you should consider cleaning it up to start.
It is suggested you minimize the Task List and Outline Views on
of the Eclipse workbench.  You can also close out the welcome tab if you want.
It may look differently on your screen, but the following image shows the tabs
that we recommend you close.

.. odsafig:: Images/SetupFig5.png
   :align: center

Don't worry if you close something unintentionally!  You can always restore
these windows by going to **Window** > **Show View**.

Configuring Eclipse
-------------------

Installing the Webcat Plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now we need to install an additional plug-in to make some common tasks in this
course easier.

1. Open the Help menu and select Install New Software....


.. odsafig:: Images/WebcatSetupFig1.png
   :align: center


2. In the **Work with**: field, paste the following URL and press
Enter (or press "Add"): `http://web-cat.org/eclipse <http://web-cat.org/eclipse>`_


.. odsafig:: Images/WebcatSetupFig2.png
   :align: center


3. Click the check boxes next to **"Web-CAT Electronic Assignments"**  and
**"Web-CAT Java Development Extras"**, and click **Next**.


.. odsafig:: Images/WebcatSetupFig3.png
   :align: center


Review your selection and click Next again.


If the **Install Remediation Page** appears, then select the second radio button
**"Update my installation to be compatible with the items being installed"**.


4. Check **"I accept the terms of the license agreements"** and then
click **Finish**.


.. odsafig:: Images/WebcatSetupFig4.png
   :align: center


5. Wait while the plug-in is being downloaded and installed; this may take a
few minutes. You may get a warning about installing unsigned code during the
installation. Click **OK** (or **"Install anyway"**) to continue the
installation.


.. odsafig:: Images/WebcatSetupFig5.png
   :align: center


6. When the installation is complete, Eclipse will notify you that it should
be restarted in order for the changes to take effect. Click **Yes** to do so.

Formatting support
~~~~~~~~~~~~~~~~~~

Installing Formatting Support
"""""""""""""""""""""""""""""

Before you can begin working on class assignments, you need to configure a
couple settings in Eclipse's preferences.

1. Once Eclipse has restarted, select  **"Window > Preferences..."**
(or on Mac OS X, **"Eclipse > Preferences..."**) from the menu.


.. odsafig:: Images/FormattingSetupFig1.png
   :align: center


2. Click **"Configured Assignments"** from the left panel


.. odsafig:: Images/FormattingSetupFig2.png
   :align: center


Copy and paste the following two URLs into the panel.
(If the line gets wrapped, make sure you don't accidentally put any spaces in it.)

  * **Download URL**

    * `https://courses.cs.vt.edu/~cs2114/assignments.xml <https://courses.cs.vt.edu/~cs2114/assignments.xml>`_

  * **Submit URL**

    * `https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT <https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT>`_

3. Click **"Apply and close"** to save your changes and exit the preferences window.


Setting up Formatting
"""""""""""""""""""""

One of the formatting guidelines expected throughout this course is to use
spaces instead of tabs in your code. This makes your code more portable between
users and environments.

You will need to download and import this style sheet into Eclipse for
formatting spaces/tabs, indentation, etc. Once it is imported, you may press
CTRL + SHIFT + F within Eclipse to format your code (if using Windows)
or Command + Shift + F (if using Mac).

Remember to format your code before submitting to Web-CAT.

Download the following XML file by going to the link: `vtcsstylefixed.xml download <https://people.cs.vt.edu/~shaffer/vtcsstylefixed.xml download>`_

On Windows, you'll need to Right Click and select **Save As**.  It doesn't matter
where you save it, but do remember where it is saved

To install:

* **Mac:**

  * Eclipse->Preferences->Java->Code Style->Formatter->import the above file,
  then click ok

* **Windows:**

  * Window->Preferences->Java->Code Style->Formatter->import the above file,
  then click ok


This is an image of setting up on Windows

.. odsafig:: Images/FormattingSetupFig3.png.png
   :align: center
