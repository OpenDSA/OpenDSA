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

Select ``Assignments``, then ``Add assignments``. In the creation form, select any course module,
then the corresponding book. There is no need to add exercises to the assignement at this point, 
it will be done by the teacher through the teacher view.
