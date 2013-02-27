.. _BackendSpecs:

OpenDSA back-end web services and user interface Specifications (draft)
=======================================================================

The OpenDSA "back end" provides web services to store student
responses and show student progress and performance over time.
The API is based on REST (REpresentional State Transfer)
principles.
Information is transferred to/from the back end using JSON.


KA Exercises
------------   


Enter exercises data
^^^^^^^^^^^^^^^^^^^^  
``HTTP method:``  POST   
 
``POST parameters:``   
	+-------------------------+----------------------------+
        |   Parameters            |   Description              |  
        +=========================+============================+  
        |   Name                  |   Name of the exercise     | 
        +-------------------------+----------------------------+ 
        |   Description	          | Description of the exercise|   
        +-------------------------+----------------------------+ 
        |   Author                |                            |   	
        +-------------------------+----------------------------+  
        |   Covers                |Topic/section covered by the|    
        |                         |      exercise              |     
        +-------------------------+----------------------------+    
        |   Expected time	  | Time we expect students to |   
        |                         |   complete the exercise    |  
        +-------------------------+----------------------------+  
        |   Proficiency score     | Rules to determine student |   
        |                         |   proficiency              |   
        +-------------------------+----------------------------+  
        |   streak                | streak of correct exercise | 
        |                         | for proficiency            |
        +-------------------------+----------------------------+   
        |   hint penalty          | points substracted for     |
        |                         | using hints                |
        +-------------------------+----------------------------+  
        |   points                | points awarded for a       |
        |                         | correct exercise (no hint) |
        +-------------------------+----------------------------+   

``Access:``  instructors, administrators

``HTTP Response:`` success/Error

``User interface:`` a web interface to manually enter POST Parameter

                                                   
Update exercises data
^^^^^^^^^^^^^^^^^^^^^
``HTTP method:``  POST

``POST parameters:``
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   Description           | Description of the exercise|
        +-------------------------+----------------------------+
        |   Author                |                            |
        +-------------------------+----------------------------+
        |   Covers                |Topic/section covered by the|
        |                         |      exercise              |
        +-------------------------+----------------------------+
        |   Expected time         | Time we expect students to |
        |                         |   complete the exercise    |
        +-------------------------+----------------------------+
        |   Proficiency score     | Rules to determine student |
        |                         |   proficiency              |
        +-------------------------+----------------------------+
        |   streak                | streak of correct exercise |
        |                         | for proficiency            |
        +-------------------------+----------------------------+
        |   hint penalty          | points substracted for     |
        |                         | using hints                |
        +-------------------------+----------------------------+
        |   points                | points awarded for a       |
        |                         | correct exercise (no hint) |
        +-------------------------+----------------------------+

``Access:``  instructors, administrators

``HTTP Response:`` success/Error message 

``User interface:`` a web interface to manually enter POST Parameter

Retrieve exercises data
^^^^^^^^^^^^^^^^^^^^^^^
``HTTP method:`` GET 

``GET parameters:``
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   id                    |  Unique (numeric)          |   
        |                         |  exercise identifier       |
        +-------------------------+----------------------------+
        |   name                  |  name of the exercise      |
        +-------------------------+----------------------------+
        |   Covers                |Topic/section covered by the|
        |                         |      exercise              |
        +-------------------------+----------------------------+

``Access:``  instructors, administrators

``HTTP Response:`` success/Error

``User interface:`` a web interface to manually enter POST Parameter


Modules
-------

Enter modules data   
^^^^^^^^^^^^^^^^^^  

``HTTP method:`` POST 

``POST parameters:`` 
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   name                  |  name of the module        |
        +-------------------------+----------------------------+
        |   Prerequisites         |                            |
        +-------------------------+----------------------------+
        |   topic                 |Topic covered by the        |
        |                         |      module                |
        +-------------------------+----------------------------+
        |  KA exercises           | Reference to all           |   
        |                         | ka-exercise in the module  | 
        +-------------------------+----------------------------+  
        | Proficiency exercise    | Reference to all           |  
        |                         | proficiency exercise in    |  
        |                         | the module                 |  
        +-------------------------+----------------------------+  
        | Other exercises	  | Reference to all any other | 
        |                         | exercises in the module    |   
        +-------------------------+----------------------------+  
        | Proficiency score       | Rules to determine student |   
        |                         | proficiency                | 
        +-------------------------+----------------------------+  

``Access:`` instructors, administrators

``HTTP Response:`` Success/Error message

``User interface:`` a web interface to manually enter POST Parameter

Update modules data
^^^^^^^^^^^^^^^^^^^  
Same as enter modules data.  

Retrieve module data
^^^^^^^^^^^^^^^^^^^^ 

``HTTP Method:``  GET

``GET Parameter:``   
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   id                    |  Unique (numeric)          |
        |                         |  exercise identifier       |
        +-------------------------+----------------------------+
        |   name                  |  name of the module        |
        +-------------------------+----------------------------+
        |   topic                 |  Topic covered by the      |
        |                         |      module                |
        +-------------------------+----------------------------+  

``Access:`` all

``HTTP Response:`` module data

``User interface:`` a web interface to display modules. The interface should allow the user to filter the result based on GET Parameter filters 


Student-exercises logs
----------------------

Enter student-exercise logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^  
``HTTP method:`` POST

``POST Parameters:``  
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   Students	          |  Reference to the student  |   
        +-------------------------+----------------------------+ 
        |   Exercise	          |  Reference to exercise     |   
        +-------------------------+----------------------------+  
        |   Attempt number	  |  Counter for how many time | 
        |                         |  the exercise has been     | 
        |                         |  attempted                 |  
        +-------------------------+----------------------------+
        |  [Attempt content]	  |  [Student answer]          |   
        +-------------------------+----------------------------+  
        |  Correct                |                            |
        +-------------------------+----------------------------+  
        |  Hints number	          | Counter for how many time  |  
        |                         | hints were use             |  
        +-------------------------+----------------------------+ 
        |  Time	                  | Time taken to complete     | 
        |                         |  the exercise              |   
        +-------------------------+----------------------------+   
 
``Access:`` student

``Action triggered:`` check if student meet exercise and module.s proficiency requirements. Update proficiency field accordingly. 

``HTTP Response:`` success and proficiency status.  Error message

``User interface:`` No, this action is triggered automatically upon completion of an exercise.

Retrieve "individual" student log
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^     

``HTTP method:`` GET

``GET parameters:`` 
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   name                  |  student's name            |
        +-------------------------+----------------------------+


``Access:`` student, instructors, administrators

``HTTP Response:`` student activity log

``User interface:`` a web interface to display activity logs for currently registered user. A link to this page should be present on every student profile page.


Retrieve "multiple" students logs
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

``HTTP method:`` GET

``GET parameter:`` 
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   exercise              |  exercise's name           |
        +-------------------------+----------------------------+
        |   Topic                 | Topic covered by exercises |  
        +-------------------------+----------------------------+  
        |   student               |	student name           |   
        +-------------------------+----------------------------+   

``Access:`` instructors, administrators

``HTTP Response:`` student exercise logs

``User interface:``  a web interface to student.s activity data. The interface should allow user to filter the result based on GET Parameter filters 

Students-modules logs
---------------------

Retrieve students logs
^^^^^^^^^^^^^^^^^^^^^^   

``HTTP method:`` GET

``GET parameter:``     
        +-------------------------+----------------------------+
        |   Parameters            |   Description              |
        +=========================+============================+
        |   module                |  module name               |
        +-------------------------+----------------------------+
        |   Topic                 | Topic covered by the module|
        +-------------------------+----------------------------+
        |   student               |     student name           |
        +-------------------------+----------------------------+


``Access:`` instructors, administrators

``HTTP Response:`` student.s module logs

``User interface:`` a web interface to display students activity on a module leve;. The interface should allow the user to filter the result based on GET Parameter filters 



