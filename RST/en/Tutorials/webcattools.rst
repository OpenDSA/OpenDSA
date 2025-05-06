.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :title: Installing the Web-CAT Submission Plug-in for Eclipse
   :author: Ayaan Karzarouni; Cliff Shaffer
   :institution: Virginia Tech
   :requires:
   :satisfies: Web-CAT Plugin
   :topic: Programming Tutorial
   :keyword: Web-CAT; Eclipse
   :naturallanguage: en
   :programminglanguage: N/A
   :description: Describes how to install the Web-CAT submission plugin in the Eclipse IDE.

Installing the Web-CAT Submission Plug-in for Eclipse
=====================================================

Introduction
------------

Here are instructions for how to install the Web-CAT submission
plug-in for Eclipse.
These instructions assume that you are running Eclipse versions
Oxygen or Photon.

**Note:** This might be a good time to also update Eclipse. 
If you are running a version earlier than Oxygen, then you should
install the latest version directly.
If you are running Oxygen or Photon already, then you can check for
updates at ``Help --> Check for Updates``.

Installing the Plug-in
----------------------

Un-Installing an Old Plug-in
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you already have an earlier version of the Web-CAT plug-in
installed, you will first need to uninstall it.
For those installing it for the first time, skip to the section on
Installing the Plug-In. 
 
Open Eclipse, and in the tool bar at the top of the screen, go to
``Help --> About Eclipse IDE``.
Then click on the button that says ``Installation Details``.
A window something like this should come up:

.. odsafig:: Images/InstallDetails.png
   :width: 650
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: InstallDetails

Select ``Web-CAT Electronic Submitter`` and click ``Uninstall``.
Follow the prompts, clicking ``Next`` and ``Finish`` as appropriate,
and restart Eclipse to complete the process.
If you don't see a line labeled something like
``Web-CAT Electronic Submitter`` then you probably do not have the
Web-CAT plugin installed.


Installing the Plug-in
~~~~~~~~~~~~~~~~~~~~~~

Open Eclipse, and in the tool bar at the top of the screen, go to
``Help --> Install New Software``.
The following window will come up:

.. odsafig:: Images/PluginInstall1.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: PluginInstall1

In the ``Work With`` text box, paste this link:
https://web-cat.org/eclstats
 
* Next, click ``Add``.
  A dialog box will pop up with two text boxes.

* Make sure the above URL is in the box labeled ``Location``,
  and put in a sensible name (like "Web-CAT plugin") in the box labeled
  ``Name``.

* Once that's done, click ``Add``.
 
This is what the window should look like now:

.. odsafig:: Images/PluginInstall2.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: PluginInstall2

* Check the boxes next to ``Web-CAT Electronic Assignments
  Feature`` and ``Web-CAT Java Development Extras``, and click ``Next``. 

* It will then tell you about files that it plans to install.
  Click ``Next``.

* Accept the terms of the license agreement, and click 'Finish'.

The install will start now.

This might take some time depending on your internet connection.
Probably at least once it pause and warn you that you are about to
install software with unsigned content.

If this is your first time installing the plugin, then You are likely
to get a window titled ``Trust Authorities`` that looks like:

.. odsafig:: Images/trust_authorities.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: trust_authorities

When it does this, select the checkbox next to 'https://web-cat.org/'
and click the ``Trust Selected`` button. 

At some point while downloading the plugin files, you might get
another window titled ``Trust Artifacts`` that looks like:

.. odsafig:: Images/trust_artifacts.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: trust_artifacts

If so, check the boxes and click the ``Trust Selected`` button.
The install will continue. 
Restart Eclipse when prompted to complete the process. 


Final Setup
~~~~~~~~~~~

Once you have the plug-in installed, you need to set it up to be able
to communicate with Web-CAT:

* Go to ``Window --> Preferences`` (``Eclipse --> Preferences`` on Mac).

* In the window that comes up, in the column on the left, click on
  Web-CAT Assignments.
  You should see this window:

.. odsafig:: Images/WebCATAssignment.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: WebCATAssignment

Put in the following information:

* Submission Definition URL: https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT

* Email: Your VT email address (PID@vt.edu).

* Username: Your PID.

* You can leave Outgoing SMTP Mail Server blank.

* In the ``Download URL`` field, enter:
  http://web-cat.cs.vt.edu/Web-CAT/assignments.xml

* Click on ``Apply and Close`` to complete the process.


Installing student.jar
----------------------

If you are using Web-CAT, then you probably will want to use the VT
local support for JUnit tests.

First, download the |studentjar| file. 

.. |studentjar| raw:: html

   <a href="http://sourceforge.net/projects/web-cat/files/Student%20Library/4.14/student.jar/download" 
   target ="_blank">student.jar</a>

Then, in Eclipse, right click on your project, and navigate to
``Build Path --> Configure Build Path``.
In the window that comes up, click on the ``Libraries`` tab.
Select ``Classpath`` and click ``Add External JARs``.
Navigate to the location where you saved the ``student.jar`` file,
select it, and click ``Open``.
The ``student.jar`` file should now be listed in the ``Classpath``
section as shown below:

.. odsafig:: Images/studentjarClassPath.png
   :width: 750
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: studentjarClassPath

Now click ``Apply and Close`` to complete the process.
You should now be able to use the VT local support for JUnit tests.

See |external_link1| for some practical advice on getting started 
with JUnit testing. At the time of this writing, the prefered version 
of JUnit to use is Junit 4.

.. |external_link1| raw:: html

   <a href="http://web-cat.org/eclstats/junit-quickstart/" target =
   "_blank">here</a>
   



Installing formatting support
-----------------------------

You might want to make sure that your Eclipse style checker is as
close as possible to the style guide that Web-CAT is enforcing.
Download this file: |stylefile| (Right click and Save-As).
Then install it into Eclipse, as described below.

.. |stylefile| raw:: html

   <a href="http://people.cs.vt.edu/~shaffer/vtcsstylefixed.xml" target =
   "_blank">vtcsstylefixed.xml</a>

Once it is installed, press CTRL-SHIFT-F (Windows) or COMMAND-SHIFT-F (Mac) within Eclipse to format your code. 


To install:

Mac:

``Eclipse->Preferences->Java->Code Style->Formatter->import``
the above file, then click ``okay``.

Windows:

``Window->Preferences->Java->Code Style->Formatter->import`` the above file,
then click ``okay``.

.. odsafig:: Images/EclipseFormatter.png
   :width: 650
   :align: center
   :capalign: justify
   :figwidth: 90%
   :alt: Eclipse Formatter
