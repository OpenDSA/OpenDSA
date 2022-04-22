.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Getting Your Programming Environment Setup
==========================================

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

1. Open `https://www.eclipse.org/downloads/ <https://www.eclipse.org/downloads/>`_

3. Select the **Eclipse** download from the yellow/orange download button
(select the 64bit or 32bit version to correspond to the version of the JDK you
installed, please be aware: versions may change by semester).

4. Download the distribution and follow installation instructions,
selecting **IDE for Java Developers** when prompted.

5. Start Eclipse. ( If you are on a Mac, you need to set
**System Preferences->Security and Privacy** to allow apps downloaded from
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

.. odsafig:: Images/FormattingSetupFig3.png
   :align: center
