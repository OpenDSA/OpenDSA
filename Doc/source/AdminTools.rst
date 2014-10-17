.. _AdminTools:

Administrator's Tools
=====================

Teacher View Configuration
--------------------------

To configure a view for a specific course/book instance, it is
required to create a course and an assignement for that course through
the backend administration
`console <http://opendsa.cc.vt.edu/admin/>`_.
Only the Django administration account can perform these tasks.


Course Creation
---------------

Select ``course``, then ``Add course``, and fill in the form and
assign teacher(s) to the course.

Select ``course instance`` to create an instance of the course you
just created.
Fill in the form and assign teaching assistants. 

Select ``Books``, and click on the url of the OpenDSA book instance
you want to associate to the course.
In the book's form, select the appropriate course.

Granting Instructor Access
--------------------------

To give instructor access to an existing account, from the django
administration page
go to "Course" to display the list of available courses,
then click on the course ID to edit course settings.


Register a Book Instance
------------------------

To send over to the data server all information (chapters, modules,
exercises, points, etc.) related to a newly created book instance, it
is necessary to register the book instance.
The rigistration can be done on the ``RegisterBook`` page at
``Book_Base_URL/html/RegisterBook.html``.
For example,
``http://algoviz.org/OpenDSA/Books/OpenDSA/html/RegisterBook.html``.
This presumes that the book instance has already been configured by a
Django administrator.
