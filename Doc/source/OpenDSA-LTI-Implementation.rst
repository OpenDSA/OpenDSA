.. _OpenDSA_LTI_Implementation:

OpenDSA-LTI Implementation
==========================

This page documents how the OpenDSA server works.
There are also a number of
`tutorials available <http://splice.cs.vt.edu/lti>`_ that explain how
OpenDSA implements the `Learning Tools Interoperability (LTI) protocol`_ 
to support communications between the LMS and OpenDSA.

.. _`Learning Tools Interoperability (LTI) protocol`: http://www.imsglobal.org/activity/learning-tools-interoperability

Technologies Stack
------------------
OpenDSA-LTI's backend is implemented in Ruby_ using `Ruby on Rails`_. 
It uses `Active Record`_ to manage and access its MySQL_ database.
`Capistrano`_ is used for automated deployment.
The version of LTI implemented by OpenDSA is `LTI 1.1`_.
OpenDSA acts as both an LTI Tool Provider (so that OpenDSA content can be integrated with LMS), 
and a Tool Consumer (so that OpenDSA can integrate content from other tool providers).

.. _Ruby: https://www.ruby-lang.org/en/
.. _`Ruby on Rails`: http://rubyonrails.org/
.. _`Active Record`: http://guides.rubyonrails.org/active_record_basics.html
.. _MySql: https://www.mysql.com/
.. _`LTI 1.1`: http://www.imsglobal.org/specs/ltiv1p1p1
.. _`Capistrano`: https://capistranorb.com/

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

    Note: Canvas only supports a single gradable resource per
    Canvas module. OpenDSA originally complied with this restriction by 
    ensuring that there was only one gradable exercise per OpenDSA module section,
    and by splitting each module up so that each section of the module was
    it's own module/assignment in Canvas (and therefore its own page). 
    However, OpenDSA has since been changed so that OpenDSA modules are no longer split into 
    sections, but rather each module is only a single module/assignment in Canvas.
    To comply with the restriction of only a single gradable resource per Canvas
    assignment, OpenDSA aggregates the scores of every gradable exercise
    and slideshow in a module and sends the aggregated module score to Canvas, 
    rather than the scores for individual exercises.

 2. To integrate stand-alone modules, exercises, visualizations
    
    For details on how stand-alone modules, exercises, and visualizations are integrated
    into LMS courses, see the 
    `Integrating Stand-alone Modules, Exercises, and Visualizations`_ section below.

    A guide on adding stand-alone modules, exercises, or visualizations to a Canvas 
    course is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-canvas>`_.
    A guide on adding stand-alone modules, exercises, or visualizations to a Moodle course
    is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-moodle>`_.
    A guide on adding stand-alone modules, exercises, or visualizations to a Blackboard course
    is available 
    `here <https://opendsa-server.cs.vt.edu/guides/opendsa-blackboard>`_.

Making New Modules, Exercises, Visualizations Available Through LTI
-------------------------------------------------------------------
For the 2nd avenue of using OpenDSA-LTI described above_, available 
modules, exercises, and visualizations are looked for in RST files contained in a predefined set 
of folders contained in ``~OpenDSA/RST/en/``.

The set of folders that is looked in is defined by the ``STANDALONE_DIRECTORIES`` 
hash located in 
`config/initializers/constants.rb <https://github.com/OpenDSA/OpenDSA-LTI/blob/master/config/initializers/constants.rb>`_.
Any exercises listed in one of the RST files contained in a directory listed in 
this hash will automatically be available through the 2nd avenue of LTI acess described above_.

.. _above: `How OpenDSA-LTI works`_

Canvas Course Integration
-------------------------

This section describes how the communication between OpenDSA and Canvas works.

Course Generation
~~~~~~~~~~~~~~~~~
When an instructor creates a course offering through OpenDSA, 
OpenDSA uses the Canvas API to create modules and assignments in Canvas.
Each module in the course offering's book instance will result in
a module being created in Canvas. If a module contains any
exercises or slideshows that are worth points (i.e. have been set to be worth more than 0 points
in the book's configuration), then an assignment will also be created in Canvas.
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
This launch request also contains information provided by Canvas about the user that is launching
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

The ``launch`` method will ensure that a record exists in the database to track the user's progress
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
Besides recording exercise attempts and scores, OpenDSA records other user interaction data, 
such as when the user loads a page or clicks a button.
When the client sends interaction data to the OpenDSA server, the ``create``
method in odsa_user_interactions_controller.rb_ is called. This method 
saves each user interaction record to the ``odsa_user_interactions`` table
of the database.

For information on how the client-side
framework records and transmits user interaction data, see
the `Client-Side Framework <Client-sideFramework.html>`_ documentation.

External Tools Integration
--------------------------
Much like how Canvas and Moodle are able to launch OpenDSA modules or exercises 
and receive scores from them, OpenDSA is able to use LTI to launch exercises 
from other learning tools, and then receive scores back from those tools.

The main external tool that OpenDSA uses is `CodeWorkout <https://codeworkout.cs.vt.edu/>`_.
OpenDSA is also confirmed to be able to use exercises and visualizations from `ACOS <https://github.com/acos-server>`_.

Information on learning tools that OpenDSA integrates is stored in the 
``learning_tools`` table in the OpenDSA database, and can be updated
by users with administrator privileges through the admin interface on the 
OpenDSA site. The name of each tool in the ``learning_tools`` table should
match the name of each tool listed in 
`extrtoolembed.py <https://github.com/OpenDSA/OpenDSA/blob/master/RST/ODSAextensions/odsa/extrtoolembed/extrtoolembed.py>`_.

Launching External Tools
~~~~~~~~~~~~~~~~~~~~~~~~
When an OpenDSA module containing an external tool exercise is loaded, the OpenDSA client-side
framework generates an iframe with a target URL that points to an endpoint on the
OpenDSA server: ``lti/launch_extrtool/:exercise_id``, where :exercise_id is the ID of the
exercise instance record stored in the OpenDSA database.
When the iframe is generated, it results in a GET request being sent to the endpoint on the OpenDSA server.
The exercise instance ID from the URL parameter is used to retrieve the exercise instance information
from the database, along with information on the course offering that the exercise instance
is associated with.
The exercise information includes the name of the tool provider (e.g. code-workout), which OpenDSA
uses to retrieve the tool provider's information from the ``learning_tools`` table.
The tool provider information includes the tool provider's LTI launch URL, consumer key, and shared secret.
This information is used to generate the LTI launch parameters that will be sent to the tool provider.
After generating the launch parameters, OpenDSA uses an OAuth library to generate OAuth parameters 
using the consumer key and shared secret.

After generating all the LTI and OAuth parameters, OpenDSA generates an HTML page
that contains a hidden form containing all of the generated parameters.
This form is then automatically submitted using JavaScript, which results in a
POST request being sent to the LTI launch URL of the tool provider.
The tool provider receives the request and displays the requested exercise, which
is shown in an iframe in the OpenDSA module page.

Receiving Scores from External Tools
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
When a user completed an exercise provided by an external tool provider such as CodeWorkout,
the tool provider sends the score to OpenDSA.
When OpenDSA receives the score, the user's exercise progress record in the OpenDSA database is updated.
OpenDSA then updates the user's module progress record, and sends the updated module score
to the LMS.

Integrating Stand-alone Modules, Exercises, and Visualizations
--------------------------------------------------------------
This section discusses OpenDSA support for serving stand-alone OpenDSA modules, exercises, and 
visualizations over LTI. This allows instructors to use gradable OpenDSA 
exercises and visualizations in their course without having to create an 
entire book.
It also allows instructors who are not using the Canvas LMS to use OpenDSA content in their course.

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
However, for some LMS (e.g. Moodle) may not support XML configuration, in which case the 
instructor must enter the information manually.

Blackboard is different from Canvas and Moodle in that it doesn't allow instructors to pre-configure external tools
in their courses themselves. Instead, a Blackboard administrator must pre-configure the tool which can then
be made available to all instructors.
In this case, an OpenDSA administrator must add the Blackboard instance to
the ``lms_instances`` table in the OpenDSA database (e.g. through the OpenDSA admin interface), 
including settings a key and secret to be associated with the Blackboard instance.
The OpenDSA admin must then provide the Blackboard admin with the key and secret
so they can use it to configure OpenDSA as an external tool in their Blackboard instance.

Content Selection
~~~~~~~~~~~~~~~~~
OpenDSA uses the LTI Deep Linking standard in order to provide
a GUI that instructors can use to add OpenDSA content to their LMS course.
The version of Deep Linking that OpenDSA currently supports is `Version 1.0 <https://www.imsglobal.org/specs/lticiv1p0/specification>`_.
Once the instructor has configured OpenDSA-LTI as an external tool in the LMS, 
they will be given the option to select OpenDSA-LTI when creating a new assignment or link. 
If they select OpenDSA, it will make a request to the OpenDSA server, and OpenDSA
will respond with a page displaying a collection of exercises and
visualizations that the instructor may choose from. The instructor's
selection is then communicated back to the LMS.

Relevant files:

   * lti_controller.rb_
   * resource.html.haml_
   * lti_resource.js_

The OpenDSA LTI Deep Linking work flow is as follows:

1. The OpenDSA server receives an LTI launch request with an ``lti_message_type`` parameter with a value of
``ContentItemSelectionRequest``

2. The OpenDSA server verifies the request using OAuth and displays a user interface for
selecting content. The ``content_item_return_url`` and ``oauth_consumer_key`` parameter values
from the launch request are saved in JavaScript variables on the client.

3. The user selects an OpenDSA resource they want to add to their course

4. The OpenDSA client sends an AJAX request to the OpenDSA server with information on 
the resource that was selected, along with the ``oauth_consumer_key`` and ``content_item_return_url``.

5. The OpenDSA server receives the AJAX request and does the following:

   a. Generates a JSON object storing the information on the selected resource according to 
   the Deep Linking specification, converts it to a string, and stores it in the ``content_items`` parameter.
   If the selected resource is a stand-alone exercise or visualization, then the information will include a ``custom_ex_short_name``
   parameter, which identifies which exercise/visualization was selected.
   If the selected resource is a stand-alone module, then the information will include a ``custom_inst_module_id``
   parameter, which identifies which module was selected.
   
   b. Sets the ``lti_message_type`` parameter value to ``ContentItemSelection``
   
   c. Looks up the consumer secret associated with the ``oauth_consumer_key`` and generates OAuth parameters
   
   d. Returns all parameters to the OpenDSA client

6. The OpenDSA client generates a hidden HTML form with input fields storing all of
the parameters received from the OpenDSA server. The action attribute of the form 
is set to the value of the ``content_item_return_url`` parameter from the LTI launch
request sent by the LMS.

7. The OpenDSA client automatically submits the form using JavaScript, resulting in a
POST request being sent to the ``content_item_return_url``

The end result is that the LMS receives the information necessary to set up a link that
launches directly to the specific resource the user selected.

Serving Stand-alone Exercises and Visualizations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
When a user accesses an OpenDSA link in the LMS, it makes a request
to the ``/lti/launch`` endpoint on the OpenDSA server.
If the link is for a stand-alone OpenDSA exercise or visualization, then the launch
request will include the ``custom_ex_short_name`` parameter. 
OpenDSA then does the following:

1. Verifies the request using OAuth.

2. Automatically signs in the user based on the ``lis_person_contact_email_primary``
parameter from the LTI launch request.

3. Determines which LMS instance the launch request came from based on the origin of
the request.

4. Uses a combination of the the LMS instance and the context_id parameter in the
launch request to find a matching course offering record in the OpenDSA database.
The context_id uniquely identifies a course offering (or other similar context) within a
particular instance of an LMS. If no course offering is found, then one is automatically
created.

5. Uses a combination of the course offering and the ``resource_link_id`` parameter from
the launch request to find the ``inst_course_offering_exercise`` record in the database.
The ``resource_link_id`` uniquely identifies a particular link within a context (usually a course in the LMS).
If no record is found, then one is automatically created.
The ``custom_ex_short_name`` parameter from the launch request is used to determine
which exercise is being requested.

6. Finds or creates a record in the ``odsa_exercise_progresses`` table in the database to 
track the user’s progress on the exercise. If the launch request includes
``lis_outcome_service_url`` and ``lis_result_sourcedid`` parameters, then they are stored 
with the exercise progress record so that they can later be used to send the exercise score to the LMS.

7. Renders the HTML page for the exercise which is shown to the user.

Generating Stand-alone Modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

OpenDSA modules are authored using RST and must be compiled to HTML for display in users' web browsers.
For books, this compilation is done as part of the course generation process, with a separate HTML file
being generated for each book the module is included in.
This is a sensible approach since the HTML version of the module can significantly vary depending on
which book it is included in.
For example, the module number will differ depending on where it appears in the book.
In addition, the set of hyperlinks included the module (e.g. links to other modules in the book) might be
different depending on what other modules are included in the book.
For stand-alone modules, this is not the case since the modules are intended to stand on their own, so
there are no links to other modules, and there aren't any module numbers.
This makes it is feasible to compile a single version of each stand-alone module that is then served to everyone
who requests that module, and this is the approach that OpenDSA uses.
However, a module can also change over time. An exercise might be added or removed, or moved to a different section, etc.
This would result in the database records for that module becoming out of sync.
In order to account for this OpenDSA uses a simple version system that compiles a new version of a module
and created corresponding database records every time the module changes.

A `Rake`_ task, update_module_versions.rb_, is used to generate the HTML files and 
database records for stand-alone module versions.
This Rake task is automatically run as part of the OpenDSA deployment script (deploy.rb_).
The task can be run manually (e.g. on your development machine) by using the command
``bundle exec rake update_module_versions`` from the OpenDSA-LTI folder.
The Rake task first goes over each of the module RST files and checks if a new version needs to be
compiled.
This check is done by looking at the git commit hash of the commit that the file was
last modified in, and comparing it to the git commit hash of the current module version that is
stored in the ``inst_module_versions`` table in the database.
If the hashes don't match, then a new module version needs to be compiled.
The Rake task then generates a JSON configuration file that lists all of the modules that
need to be compiled and runs the OpenDSA compilation script with that configuration.
After the module HTML files are generated, the Rake task then creates new database
records for the updated modules.

.. _`Rake`: https://ruby.github.io/rake/


Serving Stand-alone Modules
~~~~~~~~~~~~~~~~~~~~~~~~~~~
When a user accesses an OpenDSA link in the LMS, it makes a request
to the ``/lti/launch`` endpoint on the OpenDSA server.
If the link is for a stand-alone OpenDSA module, then the launch
request will include the ``custom_inst_module_id`` parameter. 
OpenDSA then does the following:

1. Verify the request using OAuth

2. Automatically sign in the user based on the lis_person_contact_email_primary
parameter

3. Determine which LMS instance the launch request came from based on the origin of
the request

4. Use a combination of the the LMS instance and the context_id parameter in the
launch request to find a matching course offering record in the OpenDSA database.
The ``context_id`` uniquely identifies a course offering (or other similar context) within a
particular instance of an LMS. If no course offering is found, then one is automatically
created.

5. Use a combination of the course offering and the ``resource_link_id`` parameter from
the launch request to find the inst_module_version record in the database. The
``resource_link_id`` uniquely identifies a particular link within a context.

   (a) If no record is found, then the ``custom_inst_module_id`` from the launch request is used to retrieve
   the latest module version record that is marked as being a template record. The
   template record is then cloned, with the course offering id and ``resource_link_id``
   being set on the clone. This is also where any custom module settings that might
   be specified in the launch request would be applied to the clone.

6. Find or create a record in the database to track the user’s progress on the module. If
the launch request includes ``lis_outcome_service_url`` and ``lis_result_sourcedid``
parameters, they are stored with the module progress record.

7. Render the HTML page for the module, which is then shown to the user. The path to
the HTML file is stored in the ``inst_module_version`` record. In order to pass the IDs
and settings for the exercise instances to the client-side framework, the module HTML
page is wrapped in a template page that includes templated JavaScript code to save the exercise settings
in JavaScript variables.

8. The OpenDSA client-side framework applies the exercise IDs and settings from the
JavaScript variable created in previous step, then initializes the exercises in the module.

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
.. _update_module_versions.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/lib/tasks/update_module_versions.rake
.. _deploy.rb: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/config/deploy.rb
.. _lti_resource.js: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/assets/javascripts/lti_resource.js
.. _resource.html.haml: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/app/views/lti/resource.html.haml