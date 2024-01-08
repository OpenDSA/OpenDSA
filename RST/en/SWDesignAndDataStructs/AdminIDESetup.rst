.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Molly


Setting Up Your Programming Environment
=======================================

**Students with synchronous lab sections are encouraged to attend the first week for assistance with this setup process.**

Downloading and Installing Eclipse
----------------------------------

This course teaches programming using Java. We will use the  `Eclipse Integrated Development Environment <https://www.eclipse.org/downloads/packages/installer>`_
for code development in class, including all examples shown.
The instructions here include the user libraries necessary for
assignments in this course, and programming assignments will not
compile without these.

.. admonition:: Note
   
   Note: this setup involves multiple steps and it's not uncommon for students to miss something their first time through.  If you've installed everything but can't get any code to run at all, it's good to try uninstalling Eclipse and just installing it again.


1. Open  `https://www.eclipse.org/downloads/packages/release/2023-09/r <https://www.eclipse.org/downloads/packages/release/2023-09/r>`_
2. Click on the Download link in the box at the top that matches your computer.

   .. admonition:: Which version of Eclipse should I download? 32 or 64-bit? x86_64 or AArch64?
   
    It is important to download the correct version of Eclipse for you computer's operating system. 
    
        * For Windows: `Review this page to figure out if you have 32-bit or 64-bit Windows <https://support.microsoft.com/en-us/windows/which-version-of-windows-operating-system-am-i-running-628bec99-476a-2c13-5296-9dd081cdd808>`_, and then download the x86_64 for 64-bit Windows, or the x86 for 32 bit windows. 
        
        * For Mac: `Figure out what processor you have in your Mac <https://www.howtogeek.com/706226/how-to-check-if-your-mac-is-using-an-intel-or-apple-silicon-processor/>`_, and then download the Mac x86_64 version for Intel processors, or AArch64 for the Apple processors.

3. After the download is complete, follow the installation instructions
   
   * Select **Eclipse IDE for Java Developers** when prompted.
   * Install JDK 17.
   * You may also need confrim trust and accept terms and conditions.

4. Start Eclipse. ( If you are on a Mac, you need to set
   **System Preferences->Security and Privacy** to allow apps downloaded from
   locations other than the Mac App Store.)
5.  The first time you start Eclipse, you'll be asked to specify a location for the Eclipse Workspace; this is where Eclipse will keep your programming projects. You can either use the default recommendation or place it elsewhere on your file system. Check the **Use this as the default and the do not ask again** option, so Eclipse will not ask you every time you start it, and click **Launch**.


.. odsafig:: Images/SetupFig1.png
   :align: center


You may see a notice about a requirement needing an update.  Click the
checkbox **Remember my Decision** then select **Install**.


.. odsafig:: Images/SetupFig2.png
   :align: center


1. The initial Eclipse startup screen has a Welcome tab with an
Overview, Tutorials, Samples, and a "What's New" section.


.. odsafig:: Images/SetupFig3.png
   :align: center


Feel free to explore the options and then close the Welcome tab by clicking
the "X" control to the right of "Welcome" near the top of the window to
proceed to the Workbench.

Create a Project and Set Default JDK
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Create a projec to use for experimenting.
1. File | New | Java Project 
2. Name the project "Playground"
3. Set the execution environment JRE to **1.8**

.. odsafig:: Images/CreatingJavaProject.png
   :align: center

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
   (or on MacOS, **Eclipse -> Settings...**) from the menu.

.. odsafig:: Images/FormattingSetupFig1.png
   :align: center

2. Select **Configured Assignments** from the left panel.

.. odsafig:: Images/Web-CAT-2114-plugin-preferences.png
   :align: center

3. Copy and paste the following two URLs into the panel.
   (If the line gets wrapped, make sure you don't accidentally put
   any spaces in it.)

  * **Download URL**

    * ``https://courses.cs.vt.edu/cs2114/assignments.xml``

  * **Submit URL**

    * ``https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT``

4. Click the **Apply and Close** button to save your changes and exit the
   preferences window.

Customizing Formatting and Style Preferences
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

One of the formatting guidelines expected throughout this course is to use spaces instead of tabs in your code. This makes your code more portable between users and environments. To make this easier, we provide a code style sheet that you can import into your Eclipse settings. Once installed, you can use these keyboard commands to automatically format your code:

.. raw:: html
    
    <ul class="simple">
    <li>Windows: <kbd>CTRL</kbd> + <kbd>SHIFT</kbd> + <kbd>F</kbd></li> 
    <li>Mac: <kbd>Command</kbd> + <kbd>Shift</kbd> + <kbd>F</kbd></li>
    </ul>

**Remember to format your code before submitting to Web-CAT.**


Right-Click and "Save As..." to download to `download the stylesheet: https://courses.cs.vt.edu/cs2114/vtcseclipsestyle.xml <https://courses.cs.vt.edu/cs2114/vtcseclipsestyle.xml>`_ 

To install:

Mac:
  Eclipse->Settings->Java->Code Style->Formatter->import the above file, then click OK

Windows:
 Window->Preferences->Java->Code Style->Formatter->import the above file, then click OK


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





Adding CS2 Support Projects
---------------------------

.. admonition:: Follow Along and Engage

    Labs, projects, and sample code make use of one or more of the following CS 2114 Support Projects (CS2-Support, CS2DataStructuresLib, CS-GraphWindowLib). You can download the support projects via eclipse using the blue down arrow icon or using the Project Menu and selecting "Download Assignment...". 


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_4snkjorp' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>


Setting JDK to 1.8 
------------------

.. admonition:: Follow Along and Engage

    To use all of our student configurations, it's easiest to use Java 8.  If you need help with this, watch the video below.


.. raw:: html

   <center>
   <iframe type="text/javascript" src='https://cdnapisec.kaltura.com/p/2375811/embedPlaykitJs/uiconf_id/52883092?iframeembed=true&entry_id=1_q98qkist' style="width: 960px; height: 395px" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" frameborder="0"></iframe> 
   </center>



You're all set to begin the assignments!
