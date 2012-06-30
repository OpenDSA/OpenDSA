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

	
