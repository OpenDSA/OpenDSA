
.. This file is part of the OpenDSA eTextbook project. See
   .. http://opendsa.org for more details.
   .. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
   .. distributed under an MIT open source license.
   
   .. avmetadata::
      :author: Bob Edmison
   
Importing and Using Downloaded Examples in Eclipse
==================================================
   
   Throughout the modules we have provided code examples for you to download and follow along.  Sometimes these code examples may be in the form of a:
   * a ZIP file, a compressed file containing many other files and subfolders 
   or
   * a standalone Java file (a file with a .java extension)
   
   Instructions regarding the following items have been provided within the sections below:
   
   * `Downloading and importing zip files`_
   * `Downloading and importing standalone Java files`_ (files with a ".java" extension)
   * `Resolving errors from importing a project file`_
   
Downloading and importing zip files
---------------------------------------------
These are archive files that contain eclipse projects.

To open these files you must Import the zip/archive files into the Eclipse environment as a *Project*.  

This has been demonstrated in the video below and described in the steps listed after the video.

The following steps will guide you through the process of importing zip/archive files into Eclipse:
   
.. raw:: html

  <center>
  <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_fwqt4c7a&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_6l3oa8sc" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
  </center>
   
1) Download the archive/zipped file to a location on your computer
   
2) Launch Eclipse IDE

3) Go to the File menu, select File->Import

4) The "Import" Dialog Box should appear

5) Select the option "Existing Projects into Workspace" and click Next

6) The "Import Projects" Dialog Box should now appear

7) Select the option labelled "Select archive file", then Browse to find the location of the Project you wish to import

8) Make sure the Project you want is checked (see below), then click FinishDownloading and importing standalone Java files
   
   
.. odsafig:: Images/EclipseImportDialog.png
   :align: center
   :figwidth: 90%
   
   
9) Check your Package Explorer window (see below) to confirm that the project has been successfully imported
   
   
.. odsafig:: Images/EclipsePackageExplorer.png
   :align: center
   :figwidth: 90%

         
Downloading and importing standalone Java files
-----------------------------------------------
These are individual java files that can be added to an existing project in Eclipse.

These files may be opened and viewed in any modern text editor, to be used and executed they should be added to an existing Eclipse project.

The following steps will guide you through the process of creating a Java project in Eclipse and adding a Java file to that project:
   
   1) Open the standalone Java files (files with a ".java" extension) within your browser or text editor to view its contents
   
   2) Scroll to the top of the file, note the name of the package.  In the example below the package is named "example" 
      
   3) Create a new Eclipse Java Project
     
      1) Download the Java file to a location on your computer
      
      2) Launch Eclipse IDE
      
      3) Go to the File menu, select `New→Java Project` Alternatively you can right-click within the Project Explorer pane and select `New → Java Project`.
      
      4) The "New Java Project" Dialog Box should appear
      
      5) Enter the Project name
      
      6) Configure the options for Location, Java Runtime Environment (JRE), etc. or use the provided default options, then click Finish
      
      7) Check your Package Explorer window (see below) to confirm that the project has been successfully created 
          
   4) Create a new package with the name previously noted in Step 2
     
      1) One way to create a new package is to right click on the Eclipse project within the package explorer, then select New → Package
      
      2) Name the package to match the name noted in Step 2. 
  
  
.. admonition:: Important!
      
   Note that the package named at the top of the class **MUST match** the package the file is placed in within the Eclipse project.  Eclipse will indicate an error if package names do not match.  These will be visible via the Problems tab (by default this tab should be visible near the bottom of the screen).
   
   In these cases Eclipse will advise that `the declared package "<some package name>" does not match the expected package "<some other package name>".  To resolve this error simply rename the packages so that they match.



5) Import the Java files into an existing Eclipse Java Project
    
   1) Using the Package Explorer you are to select the folder or project to add the files
   
   2) Go to the File menu, select New → Import
   
   3) The "Import" Dialog Box should appear
   
   5) Select the option "File System" and click Next
   
   6) The "Import File System" Dialog Box should now appear
   
   7) Browse for the folder with the files you wish to add
   
   8) Select the files to be added, then click Finish
   
   9) Check your Package Explorer window to confirm that the selected file(s) were added to the Eclipse project
    
Note: You may also use the Eclipse Package Explorer window to drag and drop files from a folder on your computer into your Eclipse project 
     
Resolving errors from importing a project file
----------------------------------------------
   
.. raw:: html

  <center>
  <iframe id="kaltura_player" src="https://cdnapisec.kaltura.com/p/2375811/sp/237581100/embedIframeJs/uiconf_id/41950791/partner_id/2375811?iframeembed=true&playerId=kaltura_player&entry_id=1_a9b0y0u3&flashvars[streamerType]=auto&amp;flashvars[localizationCode]=en&amp;flashvars[leadWithHTML5]=true&amp;flashvars[sideBarContainer.plugin]=true&amp;flashvars[sideBarContainer.position]=left&amp;flashvars[sideBarContainer.clickToClose]=true&amp;flashvars[chapters.plugin]=true&amp;flashvars[chapters.layout]=vertical&amp;flashvars[chapters.thumbnailRotator]=false&amp;flashvars[streamSelector.plugin]=true&amp;flashvars[EmbedPlayer.SpinnerTarget]=videoHolder&amp;flashvars[dualScreen.plugin]=true&amp;flashvars[hotspots.plugin]=1&amp;flashvars[Kaltura.addCrossoriginToIframe]=true&amp;&wid=1_6l3oa8sc" width="560" height="630" allowfullscreen webkitallowfullscreen mozAllowFullScreen allow="autoplay *; fullscreen *; encrypted-media *" sandbox="allow-forms allow-same-origin allow-scripts allow-top-navigation allow-pointer-lock allow-popups allow-modals allow-orientation-lock allow-popups-to-escape-sandbox allow-presentation allow-top-navigation-by-user-activation" frameborder="0" title="Kaltura Player"></iframe>
  </center>   

   
   

