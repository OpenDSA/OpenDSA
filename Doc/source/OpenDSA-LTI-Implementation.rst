.. _OpenDSA_LTI_Implementation:

OpenDSA-LTI Implementation
==========================

This section will documents how the OpenDSA server works.
There are also a number of
`tutorials available <http://splice.cs.vt.edu/lti>`_ that explain how
OpenDSA implements the `Learning Tools Interoperability (LTI) protocol`_ 
to support communications between the LMS and OpenDSA.

.. _`Learning Tools Interoperability (LTI) protocol`: http://www.imsglobal.org/activity/learning-tools-interoperability

Technologies Stack
------------------
OpenDSA-LTI's backend is implemented in Ruby_ using `Ruby on Rails`_. 
It uses `Active Record`_ to manage and access its MySQL_ database.
The version of LTI implemented by OpendSA is `LTI 1.1`_.

.. _Ruby: https://www.ruby-lang.org/en/
.. _`Ruby on Rails`: http://rubyonrails.org/
.. _`Active Record`: http://guides.rubyonrails.org/active_record_basics.html
.. _MySql: https://www.mysql.com/
.. _`LTI 1.1`: http://www.imsglobal.org/specs/ltiv1p1p1

How OpenDSA-LTI works
---------------------
There are two main avenues of using OpenDSA-LTI:

 1. To integrate a full book into a Canvas course

    An guide walking through how an instructor can add an OpenDSA book to 
    their Canvas course is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-bookinstance>`_.

    For more information on how OpenDSA generates Canvas courses, see 
    `Creating Course Offerings <Configuration.html#creating-course-offerings>`_.

    For details on how Canvas course integration works, see the 
    `Canvas Course Integration`_ section below.

    As a note, LTI and Canvas only support a single gradable resource per
    Canvas module. OpenDSA originally complied with this restriction by 
    ensuring that there was only one gradable exercise per OpenDSA module section,
    and by splitting each module up so that each section of the module was
    it's own module/assignment in Canvas (and therfore its own page). 
    However, OpenDSA has since been changed so that OpenDSA modules are no longer split into 
    sections, but rather each module is only a single module/assignment in Canvas.
    To comply with the restriction of only a single gradable resource per Canvas
    module/assignment, OpenDSA aggregates the scores of every gradable exercise
    and slideshow in a module and sends the aggregated module score to Canvas, 
    rather than the scores for individual exercises.

 2. To integrate individual exercises and visualizations
    
    For details on how individual exercises and visualizations are integrated
    into Canvas and Moodle courses, see the 
    `Integrating Individual Exercises and Visualizations`_ section below.

    A guide on adding individual exercises or visualizations to a Canvas 
    course is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-canvas>`_.
    A guide on adding individual exercises or visualizations to a Moodle course
    is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-moodle>`_.
    
Making New Exercises Available Through LTI
------------------------------------------
For the 2nd avenue of using OpenDSA-LTI described above_, available 
exercises are looked for in RST files contained in a predefined set 
of folders contained in ``~OpenDSA/RST/en/``.

The set of folders that is looked in is defined by the ``EXERCISE_DIRECTORIES`` 
hash located in 
`config/initializers/constants.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/config/initializers/constants.rb>`_.
Any exercises listed in one of the RST files contained in a directory listed in 
the ``EXERCISE_DIRECTORIES`` hash will automatically be available through the 
2nd avenue of LTI acess described above_.

.. _above: `How OpenDSA-LTI works`_

Canvas Course Integration
-------------------------

This section will discuss how the communication between OpenDSA
and Canvas works.

Course Generation
~~~~~~~~~~~~~~~~~
When an instructor creates a course offering through OpenDSA, 
OpenDSA uses the Canvas API to create modules and assignments in Canvas.
Each module in the course offering's book instance will result in
a module being created in Canvas. If a module contains any
exercises or slideshows that are worth points (i.e. have been set to be worth more than 0 points
in the book's configuration), then an assignment will be created in Canvas.
The number of points that the assignment is worth is equal to the sum of the points
of every exercise and slideshow in the module.

When OpenDSA creates a module in Canvas, OpenDSA provides Canvas an 
LTI launch URL. When a user opens an OpenDSA module in Canvas,
Canvas will send an LTI launch request to the URL that OpenDSA provided.

For more details on how OpenDSA generates Canvas courses, see 
`Creating Course Offerings <Configuration.html#creating-course-offerings>`_.

LTI Launches
~~~~~~~~~~~~
As stated above, when OpenDSA creates a module in Canvas, OpenDSA provides Canvas an 
LTI launch URL. When a user opens an OpenDSA module in Canvas,
Canvas will send an LTI launch request to the URL that OpenDSA provided during the 
course generation process. The launch URL that OpenDSA provided to Canvas contains
query parameters for the id of the book instance, the id of the module in the book, 
the path to where the files for the book instance are stored on the OpenDSA server,
the file name of the module being launched, and the title of the module. 
This launch request also contains information about the user that is launching
the module, and the context of the launch (e.g. the name of the course in Canvas).

When OpenDSA receives the launch request from Canvas, the Rails framework will 
call the ``launch`` method in lti_controller.rb_. The ``launch`` method will
authorize the LTI launch request using OAuth. The ``launch`` method will
attempt to find an existing OpenDSA user based on the email in the launch request,
and will create a new OpenDSA user if an existing user is not found. 
The user will be automatically enrolled in the OpenDSA course offering if they 
are not already. The LTI launch request includes information about the user's role
in Canvas. If the user is an instructor for the Canvas course, then they will be 
enrolled as an instructor in the OpenDSA course offering. Otherwise, they will be 
enrolled as a student. 

The ``launch`` method will ensure that a record exists to record the user's progress
for the module being launched. The module progress record also stores the 
``lis_outcome_service_url`` and the ``lis_result_sourcedid`` parameters received 
in the LTI launch request, which will be used to send the module score to Canvas 
when the user complete an exercise in the module.

Finally, OpenDSA serves the HTML file for the module page, which will
be displayed within an iframe in Canvas.

Recording Scores and Sending Scores to Canvas
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
When a user attempts an exercise, the client-side framework sends a request to 
the OpenDSA server. This request results in a method in odsa_exercise_attempts_controller.rb_
being executed. For khan-academy exercises, the method executed is the 
``create`` method. Otherwise, the method executed is ``create_pe``.
Both methods create a new ``OdsaExerciseAttempt`` object (see odsa_exercise_attempt.rb_)
to store information about the attempt. Exercise attempts are stored in the 
``odsa_exercise_attempts`` table of the database.

After an ``OdsaExerciseAttempt`` object is created, the ``update_exercise_progress`` 
method in odsa_exercise_attempt.rb_ is automatically called.
This method updates the exercise progress record (odsa_exercise_progress.rb_)
stored in the ``odsa_exercise_progresses`` table of the database. Afterwards,
the progress of the module the exercise is contained in is updated
by calling the ``update_proficiency`` method of the module progress record
(see odsa_module_progress.rb_). The ``update_proficiency`` method recalculates the 
score of the module by summing up the points earned on each exercise in the module,
then dividing by the total possible points. If the recalculated module score
is greater than the previous module score, then the module score is 
sent to the LMS through LTI by calling the ``post_score_to_lms`` method
in odsa_module_progress.rb_.

Recording User Interactions
~~~~~~~~~~~~~~~~~~~~~~~~~~~
Besides recording exercise scores, OpenDSA records other user interaction data.
This section will cover how the back-end deals with user interaction data that is
received from the client-side framework. For information on how the client-side
framework records and transmits user interaction data, see
the `Client-Side Framework <Client-sideFramework.html>`_ documentation.

When the client sends interaction data to the OpenDSA server, the ``create``
method in odsa_user_interactions_controller.rb_ is called. This method 
saves each user interaction record to the ``odsa_user_interactions`` table
of the database.

External Tools Integration
--------------------------
Much like how Canvas and Moodle are able to launch OpenDSA modules or exercises 
and receive scores from them, OpenDSA is able to use LTI to launch exercises 
from other learning tools, and then receive scores back from those tools.

At the time of this writing, the only external tool that OpenDSA uses
is `CodeWorkout <https://codeworkout.cs.vt.edu/>`_.

Information on learning tools that OpenDSA integrates is stored in the 
``learning_tools`` table in the OpenDSA database, and can be updated
by users with administrator privileges through the admin interface on the 
OpenDSA site. The names of each tool in the ``learning_tools`` table should
match the name of each tool listed in 
`extrtoolembed.py <https://github.com/OpenDSA/OpenDSA/blob/master/RST/ODSAextensions/odsa/extrtoolembed/extrtoolembed.py>`_.

Launching External Tools
~~~~~~~~~~~~~~~~~~~~~~~~


Receiving Scores from External Tools
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Integrating Individual Exercises and Visualizations
---------------------------------------------------
This section discusses OpenDSA support for serving individual exercises and 
visualizations over LTI. This allows instructors to use gradable OpenDSA 
exercises and visualizations in their course without having to create an 
entire book.

Configuring OpenDSA as an External Tool
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
An instructor, after receiving OpenDSA instructor access, must
setup OpenDSA-LTI as an external tool in the LMS. To setup the tool,
the instructor must provide their consumer key and shared secret
which can be accessed from their OpenDSA account page on the OpenDSA site.
They also provide the LMS with the url for OpenDSA's LTI configuration
endpoint, ``/lti/xml_config``, which corresponds to 
the ``xml_config`` method in lti_controller.rb_. 
This endpoint returns an XML object
containing information that tells the LMS how to configure OpenDSA-LTI
as an external tool, including what URL is used to for resource
selection, and what url is used to launch an exercise or visualization.
However, for some LMSs (e.g. Moodle) may not support XML configuration, so the 
instructor must enter information manually.

Resource selection
~~~~~~~~~~~~~~~~~~
Once the instructor has configured OpenDSA-LTI as an external tool,
they are then able to use indiviudal OpenDSA exercises and 
visualizations as assignments in the LMS. When creating a new
assignment, the instructor is given the ability to pick an external tool. 
If they pick OpenDSA-LTI, it will make a request to ``/lti/resource``, which 
will respond with a page containing a collection of exercises and
visualizations that the instructor may choose from. The instructor's
selection is then communicated back to the LMS.

Serving Exercises and Visualizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
When a user accesses the newly created assignment, it makes a request
to ``/lti/launch``. The process from then on is similar
to the launch process described in `Canvas Course Integration`_.

Recording Scores
~~~~~~~~~~~~~~~~


Installation and Setup
----------------------

For instructions on setting up an OpenDSA server, see the README_ in the 
`OpenDSA-LTI repository`_ on GitHub.

.. _README: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/README.md
.. _`OpenDSA-LTI repository`: https://github.com/OpenDSA/OpenDSA-LTI/
.. _lti_controller.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/lti_controller.rb
.. _odsa_exercise_attempts_controller.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/odsa_exercise_attempts_controller.rb
.. _odsa_exercise_progresses_controller.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/odsa_exercise_progresses_controller.rb
.. _odsa_user_interactions_controller.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/controllers/odsa_user_interactions_controller.rb
.. _odsa_module_progress.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/models/odsa_module_progress.rb
.. _odsa_exercise_progress.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/models/odsa_exercise_progress.rb
.. _odsa_exercise_attempt.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/models/odsa_exercise_attempt.rb
