.. _AdminTools:

Administrator's Tools
=====================

Teacher View Configuration
--------------------------

To configure a view for a specific course/book instance, it is
required to create a course and an assignement for that course through
the backend administration
`console <http://opendsa.cs.vt.edu/admin/>`_.
Only the Django administration account can perform these tasks.


Course Creation
---------------

If this is a course that does not exist, then on the A+ homepage under
``Courses``, click on ``+Add``, fill in the form, and assign
teacher(s) to the course.

On the A+ homepage under ``Course instances`` click on ``+Add`` to
create an instance of the course.
Fill in the form and assign teaching assistants. 

On the A+ homepage under ``Bookss``, you should now see your book's
URL listed if the book has been compiled.
Click on the url of the OpenDSA book instance
you want to associate to the course.
In the book's form, select the appropriate course to associate it to.

Granting Instructor Access
--------------------------

To give instructor access to an existing account, from the django
administration page
go to "Courses" to display the list of available courses,
then click on the course ID to edit course settings.


Register a Book Instance
------------------------

To send over to the data server all information (chapters, modules,
exercises, points, etc.) related to a newly created book instance, it
is necessary to register the book instance.
The registration can be done on the ``RegisterBook`` page at
``Book_Base_URL/html/RegisterBook.html``.
For example,
``http://algoviz.org/OpenDSA/Books/OpenDSA/html/RegisterBook.html``.
This presumes that the book instance has already been configured by a
Django administrator.

Managing the Front Page
-----------------------

The "front page" for the instructor's view will list a separate button
for each "active" course.
An "active" course is any course who's end date is past the current
moment in time.
All courses will be listed on the "course archive" page.
