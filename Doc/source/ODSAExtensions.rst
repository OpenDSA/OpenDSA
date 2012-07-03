.. _ODSAExtensions:


ODSA ReST Extensions Documentation
==================================

avembed
-------
NAME
	avembed - embed AV and/or interactive Exercises inside a ReST document.     

SYNOPSIS::  
                      
	.. avembed:: <AV_Path> 
	   [:showbutton: {show|hide}]       
           [:title: ]              

DESCRIPTION
	``.. avembed:: <AV_Path>``                        		              
             Call the directive followed by the relative path of the AV or Exercise.
        ``[:showbutton: {show|hide}]`` 
             Include a button to show or hide the embedded content. The options are ``show`` to have the content visible when the page is first loaded and ``hide`` to have it hidden.
	``[:title: ]``
	     Specify the text that will appear in the *show|hide* button. Alphanumeric characters plus space and special characters are allowed.  
               
NOTES
	``.. avembed::`` directive fetches AVs information (width and height, etc.) from the AV/Exercise descriptive (XML) file located in the AV/Exercise directory (inside the xml subdirectory).
 
avmetadata
----------
NAME                   
	avmetadata - list of metadata information associted with the ReST document. They are used to generate the knowledge map and the module selection interface.

SYNOPSIS::             
        
	.. avmetadata:: module_name
	   :author:
	   :prerequisites:
	   :topic:
	   :short_name:                    	

DESCRIPTION
	``.. avmetadata:: module_name``
	     Call the directive followed by the module's identifier(module_name). It should match module's (ReST) file name without the extension. No space nor special characters are allowed.   
	``:author:``
	     Document author's name.
	``:prerequisites:``
	     A coma separated list of module_name. They represent the prerequisite of the topic that is being study. 
	``:topic:``
	     The topic covered by the document.
	``:short_name:``
	     The name that will be displayed to the user (in the knowledge map). Space and special characters are allowed here.  	

codeinclude
-----------
NAME
	codeinclude - displays code snippets within the eTextbook.

SYNOPSIS::

	.. codeinclude:: <relative path>
	   [:tag: <my tag>]    

DESCRIPTION
	``codeinclude:: <relative path>``
	    Include the code present inside the file located at the <relative path>.
	``:tag: <my tag>``
	    A tag inside the source code file that delimits the block of code that will be include in the module.

NOTES
	The ``codeinclude`` directive simply match to ReST directive ``literalinclude``.::

		.. codeinclude:: <relative path>
		   [:tag: <my tag>]  

	Will map to: ::

		.. literalinclude:: <relative path>
		   :start-after: /* *** ODSATag: <my tag> *** */
		   :end-before: /* *** ODSAendTag: <my tag> *** */   

 
