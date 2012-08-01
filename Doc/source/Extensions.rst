.. _ODSAExtensions:


OpenDSA ReST Extensions
=======================

A number of custom ReST extensions have been created for the OpenDSA
project.
They are documented here.

avembed
-------
NAME
        avembed - embed an AV or other HTML page inside a ReST document.     

SYNOPSIS::  
                      
	.. avembed:: <AV_Path> 
	   [:showbutton: {show|hide}]       
           [:title: ]              

DESCRIPTION
	``.. avembed:: <AV_Path>``                        		              
             Call the directive followed by the relative path of the
	     AV or Exercise.
        ``[:showbutton: {show|hide}]`` 
             Include a button to show or hide the embedded
	     content. The options are ``show`` to have the content visible
	     when the page is first loaded and ``hide`` to have it hidden.
	``[:title: ]``
	     Specify the text that will appear in the *show|hide*
	     button. Alphanumeric characters plus space and special
	     characters are allowed.
               
NOTES
	The ``.. avembed::`` directive fetches the AV's information
	(width and height, etc.) from its XML description file.
	This XML file is located in the directory ``xml`` contained
	within the same directory as the AV. If the AV is named
	``fooAV.html`` then the XML file must be ``xml/fooAV.xml``.
 
avmetadata
----------
NAME                   
	avmetadata - list of metadata information associted with the
	ReST document. It is used to generate the knowledge map and
	the module selection interface.

SYNOPSIS::             
        
	.. avmetadata:: module_name
	   :author:
	   :prerequisites:
	   :topic:
	   :short_name:                    	

DESCRIPTION
	``.. avmetadata:: module_name``
	     Call the directive followed by the module's
	     identifier(module_name). It should match module's (ReST) file
	     name without the extension. No space nor special characters
	     are allowed.
	``:author:``
	     Document author's name.
	``:prerequisites:``
	     A comma-separated list of module_name. These represent the
	     prerequisite of the topic that is being study.
	``:topic:``
	     The topic covered by the document.
	``:short_name:``
	     The name that will be displayed to the user (in the
	     knowledge map). Space and special characters are allowed here.

codeinclude
-----------
NAME
	codeinclude - displays code snippets within the eTextbook.

SYNOPSIS::

	.. codeinclude:: <relative path>
	   [:tag: <my tag>]    

DESCRIPTION
	``codeinclude:: <relative path>``
	    Include the code present inside the file located at the
	    <relative path>.
	``:tag: <my tag>``
	    A tag inside the source code file that delimits the block
	    of code that will be include in the module. Note that the
	    source code must use the tags correctly, as shown below.

NOTES
	The ``codeinclude`` directive simply matches to ReST directive
	``literalinclude``.:: 

		.. codeinclude:: <relative path>
		   [:tag: <my tag>]  

	will (logically) map to: ::

		.. literalinclude:: <relative path>
		   :start-after: /* *** ODSATag: <my tag> *** */
		   :end-before: /* *** ODSAendTag: <my tag> *** */   


TODO
----
NAME
	TODO or todo - adds a todo box in the output HTML file and is use 
	by ODSA preprocessor script to create a HTML page containing 
	the full list of desired AVs and Exercises.   

SYNOPSIS::

	.. TODO::
	   [:type: <type of the desired artifact>]  

DESCRIPTION
	``TODO::``
	   The Sphinx TODO (or todo) directive. The ODSA version adds a tinted red
	   rounded box containing the description of what is to do.
	``:type:  <type of the desired artifact>``    
	   The type of the desired artifact (AVs, Profieciency Exercise, etc).

NOTES
	The ODSA preprocessor collects the description of the TODO directive (inside rst files)
	to create a TODO.rst file that list all the desired AVs and Exercises grouped by type. 
	The TODO.rst file should be included in the index.rst file to be part of the table of content of the
        eBook.  


numref
------
NAME
	numref - adds numbered cross referenced to ODSA HTML documents.

SYNOPSIS::

	:numref:`[caption] <reference_label>`
	:numref:`reference_label`

DESCRIPTION
	``:numref:``               
	   Custom Interpreted Text Role, it adds numbered cross references in ODSA documents.
	``caption``      
	   Text that will be display next to the numbered reference.    
	``reference_label``
	   Reference name (unique) of the referenced object. Should be  enclose in brackets ('<>') when a caption is provided. It is specivied via the standards ReST referencing mechanisms.

NOTES
	The ODSA preprocessor creates a table of all referenced object with numbers and writes it into a file that is read 
	by ``numref`` role.  





   
