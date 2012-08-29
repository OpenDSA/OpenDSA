.. _FrontendJSSpecs:

OpenDSA Frontend JavaScript API  
===============================

Functions exposed by the javascript library in to enable communication with the backend.


recordstarttime()
-----------------  

Description:  
^^^^^^^^^^^^  
Send to the backend the time when the page was loaded.  

Data sent:
^^^^^^^^^^    
* Module name 
* Timestamp  

recordendtime()
-----------------

Description:
^^^^^^^^^^^^
Send to the backend the time when the page was left. Trigerred when we navigate away from the page. 

Data sent:
^^^^^^^^^^
* Module name
* Timestamp   


recordshowhide()  
----------------   

Description:
^^^^^^^^^^^^    
Record if a show/hide button was clicked, along with timestamp and the resource (av or exercise) exposed. 

Data sent:
^^^^^^^^^^
* Module name
* button id 
* button class 
* button name (resource) 
* timestamp  


AV buttons   
----------

AV buttons are buttons created by the AV developer. 
Typicall AV buttons include ``run`` and ``reset`` buttons.   

storerunbutton()
---------------- 

All run button should be from class ``odsa-run`` (class="odsa-run")   

Description:
^^^^^^^^^^^^
Record  when the run button in an AV was clicked.

Data sent:
^^^^^^^^^^
* Module name
* AV name 
* button name 
* timestamp
* score (get the score from JSAV)  

storeresetbutton()
------------------

All reset buttons should be from class ``odsa-reset`` (class="odsa-reset")

Description:
^^^^^^^^^^^^
Record  when the reset button in an AV was clicked.

Data sent:
^^^^^^^^^^
* Module name
* AV name
* button name
* timestamp




Customs buttons  
---------------    

All customs button in order to get their action recorded should have their class attribute equals to ``odsa-button``.
have a custom data attribute ``data-desc``. Its value should be a description of the action performed by the button.

recordcustombutton()
--------------------

Description:
^^^^^^^^^^^^
Record when a custom button was clicked, along with timestamp and its descrition.

Data sent:
^^^^^^^^^^
* Module name
* AV name if the button is emebedded in an AV  
* button description    
* button class
* button name 
* timestamp

  


