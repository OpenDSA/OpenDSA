.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly Domino

Getting Set Up
==============

Downloading/Installing Eclipse
------------------------------

1. To compile your code in Eclipse as well as on the command line, you must
have an installed version of the
Java Development Kit (JDK) from: `http://www.oracle.com/technetwork/java/javase/downloads/index.html <http://www.oracle.com/technetwork/java/javase/downloads/index.html>`
It is recommended that you use the x64 bit version if you have a 64 bit OS.

  * If you have or plan to install an older version of Eclipse then you can just get the JDK 8
  * If you plan to get a newer version of eclipse  then get the JDK 11 (this requires more config adjustments per project to maintain compatibility)
  * To find out if you have a 32 or 64 bit OS, go to `https://www.howtogeek.com/howto/21726/how-do-i-know-if-im-running-32-bit-or-64-bit-windows-answers/ <https://www.howtogeek.com/howto/21726/how-do-i-know-if-im-running-32-bit-or-64-bit-windows-answers/>`_
  for Windows users and `https://support.apple.com/en-us/HT201948 <https://support.apple.com/en-us/HT201948>` for Mac users.
  * **Run the installation once you have downloaded it**

2. Open `https://www.eclipse.org/downloads/ <https://www.eclipse.org/downloads/>`

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

7. The initial Eclipse startup screen has a Welcome tab with an
Overview, Tutorials, Samples, and a "What's New" section. Feel free to explore
the options and then proceed to the Workbench.

8. Once you're at the Workbench, you should consider cleaning it up to start.
It is suggested you minimize the Task List and Outline Views on the right side
of the Eclipse workbench.

Configuring Eclipse
-------------------

Installing the Webcat Plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now we need to install an additional plug-in to make some common tasks in this
course easier.

1. Open the Help menu and select Install New Software....

2. In the **Work with**: field, paste the following URL and press
Enter: `http://web-cat.org/eclipse <http://web-cat.org/eclipse>`_

3. Click the check boxes next to **"Web-CAT Electronic Assignments"**  and
**"Web-CAT Java Development Extras"**, and click **Next**. Review your
selection and click Next again.  If the **Install Remediation Page** appears,
then select the second radio button
**"Update my installation to be compatible with the items being installed"**.

4. Check **"I accept the terms of the license agreements"** and then
click **Finish**.

5. Wait while the plug-in is being downloaded and installed; this may take a
few minutes. You may get a warning about installing unsigned code during the
installation. Click **OK** (or **"Install anyway"**) to continue the
installation.

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

2. Click **"Configured Assignments"** from the left panel and copy and paste
the following two URLs into the panel.
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

Download the following XML file: `vtcsstylefixed.xml download <vtcsstylefixed.xml download>`_

To install:

* **Mac:**

  * Eclipse->Preferences->Java->Code Style->Formatter->import the above file,
  then click ok

* **Windows:**

  * Window->Preferences->Java->Code Style->Formatter->import the above file,
  then click ok
  * (Right click and Save-As)


Adding CS2 Support Projects
---------------------------

Labs, projects, and sample code make use of one or more of the following
CS 2114 Support Projects (CS2-Support, CS2DataStructuresLib, CS-GraphWindowLib).

Before working on these tasks you must first complete the configuration steps
described in the Pre-Lab part of Lab 2. You will then be able to download the
support projects via Eclipse using the blue down arrow icon or using the
Project Menu and selecting "Download Assignment...".

TODO: Add hyperlink on the word Page to a canvas page.

You may view a demonstration of this process on this page.
