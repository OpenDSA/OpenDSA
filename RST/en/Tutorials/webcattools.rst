.. This file is part of the OpenDSA eTextbook project. See
.. http://algoviz.org/OpenDSA for more details.
.. Copyright (c) 2012-2016 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Jordan Sablan
   :requires:
   :satisfies: web-cat VT tools
   :topic:

Using/Installing VT Development Tools
=====================================

As a Virginia Tech student you will be using a number of tools to assist in
projects. These tools will help you submit and test your project. If you are
working in Java you will almost certainly make use of WebCAT. WebCAT is an
automated project testing/submission system. It will run your code against a
suite of tests designed by your professor for correctness. It will also measure
how much of your code you have tested and grade your performance.

Installing The Submission Plugin
--------------------------------
*STOP GO NO FURTHER BEFORE READING THIS! This tutorial assumes you are using
Eclipse 4.2 or higher. In addition it assumes you have not installed the
previous Eclipse plugin from webcat. If you have done so remove it and it's
dependencies as the checkstyle plugin included in the older versions of the
Eclipse plugin break the current plugin.*

*\*Author's Note: This section assumes you are using the Eclipse Java IDE. It is
possible to submit WebCAT manually if you do not wish to use Eclipse, however,
the staff of CS@VT have developed a lovely plugin that integrates into Eclipse.*

Step 1: If you have not done so already, install |external_link1| and |external_link2|.

.. |external_link1| raw:: html

   <a href="https://java.com/en/download/index.jsp" target = "_blank">Java</a>

.. |external_link2| raw:: html

   <a href="https://www.eclipse.org/downloads/" target = "_blank">Eclipse</a>


Step 2: To verify you have access, |external_link3| using your PID/PID password

.. |external_link3| raw:: html

   <a href="https://web-cat.cs.vt.edu" target = "_blank">login to WebCAT</a>


Step 3: Open Eclipse and navigate to Help->Install New Software, you will open
a window similar to the below screenshot. Hit the Add button (circled in red)

.. odsafig:: Images/Webcatnewsoftware.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :scale: 50%
   :alt: Add New Software Window

Step 4: You will now be prompted with window requesting a Name/Location. Use
NAME: WebCAT, LOCATION: http://web-cat.org/eclstats.

Step 5: You will now be given a window that prompts you to select the
Java plugin and install it.
If you see no software listed be sure to uncheck the box near the
bottom labeled "Group Items By Category".

Step 6: Finally go to Window->Preferences. Then select Preferences. A window
similar to the below will appear. Fill in the submit URL with this:
https://web-cat.cs.vt.edu/Web-CAT/WebObjects/Web-CAT.woa/wa/assignments/eclipse?institution=VT.
Leave the Download URL box blank unless you have been given an URL from another
resource.

.. odsafig:: Images/Webcatsubmiturl.png
   :align: center
   :capalign: justify
   :figwidth: 90%
   :scale: 50%
   :alt: Submission URL
