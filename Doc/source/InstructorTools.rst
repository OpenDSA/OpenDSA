.. _InstructorTools:

Instructor's Tools
==================

Register a Book Instance
------------------------

To send over to the data server all information (chapters, modules, exercises, points, etc.) 
related to a newly created book instance, it is necessary to register the book instance.
The rigistration can be done on the `RegisterBook` page at `Book_Base_URL/html/RegisterBook.html`.

Teacher View Configuration
--------------------------

To configure a view for a specific course/book instance, it is required to 
create a course and an assignement for that course through the backend 
administration `console <http://opendsa.cc.vt.edu/admin/>`_. Only Django
administration account can perform these tasks.

Course Creation
---------------

Select ``course``, then ``Add course``, and fill in the form and assign teacher(s) to the course.

Select ``course instance`` to create an instance of the course you just created. Fill in the 
form and eventually assign teaching assistants. 

Select ``Books``, and click on the url of the OpenDSA book instance you want to associate to the
course. In the book's form select the appropriate course.

Assignment Creation
-------------------

At this point it is necessary to create an assignment after configuring a course.
Assignment creation is a two steps process:

Firs create a ``Course module``, select the add ``Add`` link next to ``course module`` in the backend administration console. Fill out the form and save.

Select ``Assignments``, then ``Add assignments``. In the creation form, select the course module you want to associate with the assignment,
then the corresponding book. There is no need to add exercises to the assignement at this point, 
it will be done by the teacher through the teacher view (standard backend site).

Assignment creation by instructors: 

 (1) Go to the course ``Teacher's view`` 
 (2) Select ``Add new assignment`` 
 (3) Fill out the form then press ``submit``
 (4) Return to the ``Teacher's view`` homepage, you can now see the assignment you just created in the list of assignments 
 (5) Select the corresponding ``Add new exercises`` button to load the edit module form 
 (6) Do not change the value of ``Course module`` and ``Assignment book`` fields. Select the chapter(s) from the ``Assignment chapter`` drop-down list. The exercises presents in the chapters are now displayed under ``Exercises in chapter`` label  
 (7) Select the exercises you want to add to the assignment. The selected exercises are added to the ``Assignment exercises`` list 
 (8) Repeat steps (6) and (7) to add exercises from several chapters into the assignment
 (9) Click on submit and return to the Teacher's view homepage      
