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

Note: this setup involves multiple steps and it's not uncommon for students to
miss something their first time through.  If you've installed everything but
can't get any code to run at all, it's good to try uninstalling Eclipse and just
installing it again.

.. raw:: html

   &nbsp;&nbsp;&nbsp;1. Open <a href="https://www.eclipse.org/downloads/packages/installer" target="_blank">https://www.eclipse.org/downloads/packages/installer</a>


2. Click on the Download link in the box at the top that matches your computer.

3. After the download is complete, follow the installation instructions
   beginning at step 2 on this page, selecting **IDE for Java Developers** when prompted.

4. Start Eclipse. ( If you are on a Mac, you need to set
   **System Preferences->Security and Privacy** to allow apps downloaded from
   locations other than the Mac App Store.)

5. The first time you start Eclipse, you'll be asked to specify a location for
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


6. The initial Eclipse startup screen has a Welcome tab with an
Overview, Tutorials, Samples, and a "What's New" section.


.. odsafig:: Images/SetupFig3.png
   :align: center


Feel free to explore the options and then close the Welcome tab by clicking
the "X" control to the right of "Welcome" near the top of the window to
proceed to the Workbench.


Configuring Eclipse
-------------------

Installing the Webcat Plugin
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Now we need to install an additional plug-in to make some common tasks in this
course easier.

1. Open the Help menu and select **Install New Software...**:

.. odsafig:: Images/WebcatSetupFig1.png
   :align: center

2. In the **Work with**: field, paste the following URL and press
   Enter (or press "Add"): **http://web-cat.org/eclipse**

.. odsafig:: Images/WebcatSetupFig2.png
   :align: center

3. Click the check boxes next to **"Web-CAT Electronic Assignments"**  and
   **"Web-CAT Java Development Extras"**, and click **Next**.

.. odsafig:: Images/WebcatSetupFig3.png
   :align: center

   Review your selection and click **Next** again.

   If the **Install Remediation Page** appears, then select the second radio
   button to **"Update my installation to be compatible with the items being
   installed"**.

   If the **Trust** dialog appears, click on **Select All** followed by
   **Trust Selected**.

4. Check **"I accept the terms of the license agreements"** and then
   click **Finish**.

.. odsafig:: Images/WebcatSetupFig4.png
   :align: center

5. Wait while the plug-in is being downloaded and installed. This may take a
   few minutes. You may get a warning about installing unsigned code during the
   installation. Click **OK** (or **"Install anyway"**) to continue the
   installation.

.. odsafig:: Images/WebcatSetupFig5.png
   :align: center

6. When the installation is complete, Eclipse will notify you that it should
   be restarted in order for the changes to take effect. Click **Yes** to
   do so.


Plugin Settings
~~~~~~~~~~~~~~~

Now that you have installed the Web-CAT plugin, you can tell it where to find
and submit assignments.

1. Once Eclipse has restarted, select  **Window -> Preferences...**
   (or on MacOS, **Eclipse -> Preferences...**) from the menu.

.. odsafig:: Images/FormattingSetupFig1.png
   :align: center

2. Select **Configured Assignments** from the left panel.

.. odsafig:: Images/Web-CAT-bridge-plugin-preferences.png
   :align: center

3. Copy and paste the following two URLs into the panel.
   (If the line gets wrapped, make sure you don't accidentally put
   any spaces in it.)

  * **Download URL**

    * **https://courses.cs.vt.edu/cs2114/meng-bridge/assignments.xml**

  * **Submit URL**

    * **https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT&crn=MEng-100613**

4. Click the **Apply and Close** button to save your changes and exit the
   preferences window.


Customizing Preferences
~~~~~~~~~~~~~~~~~~~~~~~

To tailor Eclipse's settings and code formatting choices for this course,
download the following preferences file to your computer by right-clicking
the link and choosing "Save As..." or "Save Link As...":

`vtpreferences.epf <https://courses.cs.vt.edu/cs2114/meng-bridge/eclipse/vtpreferences.epf>`_

It doesn't matter where you save it, but do remember where it is saved.

To install:

* From Eclipse's menu, choose **File -> Import...**.

* In the Import dialog, click the arrow in front of **General** and select
  **Preferences**.

* Click **Next** to move to the next page of the dialog.

* Click the **Browse** button to the right of the field
  labeled **From preferences file:**, and find the **vtpreferences.epf** file
  you downloaded. Then click **Finish** to import these settings.

You're all set to begin the assignments!
