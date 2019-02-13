.. _OpenDSA_LTI_Implementation:

OpenDSA-LTI Implementation
==========================

This section will documents how the OpenDSA server works.
There are also a number of
`tutorials available <http://splice.cs.vt.edu/lti>`_ that explain how
OpenDSA implements the LTI protocol to support communications between
the LMS and the content.

Technologies Stack
------------------
OpenDSA-LTI's backend is implemented in Ruby_ using `Ruby on Rails`_. 
It uses `Active Record`_ to manage and access its MySQL_ database.

.. _Ruby: https://www.ruby-lang.org/en/
.. _`Ruby on Rails`: http://rubyonrails.org/
.. _`Active Record`: http://guides.rubyonrails.org/active_record_basics.html
.. _MySql: https://www.mysql.com/

How OpenDSA-LTI works
---------------------
There are two main avenues of using OpenDSA-LTI:

 1. To integrate a full book into a Canvas course

    OpenDSA makes use of the Canvas API to automatically
    generate Canvas modules and assignments for each OpenDSA module of
    a book. These Canvas assignments and modules are configured
    to make a request to OpenDSA's LTI launch endpoint, ``/lti/launch``.
    
    When a request is made to ``/lti/launch``, the ``launch`` method in
    ``lti_controller.rb`` is called. Using parameters sent in the
    launch request, the course offering information  and user information
    is retrieved from the database. If the user does not exist in the
    database, a new user is created. The user is automatically enrolled 
    in the course offering if they are not already.

    Also using parameters sent in the launch request, the specific page
    that the user is requesting is determined and returned in the response.
    The page OpenDSA returns is then rendered in an iframe within the lms.

 2. To pull individual exercises and visualizations
    
    An instructor, after receiving OpenDSA instructor access, must
    setup OpenDSA-LTI as an external tool in the LMS. To setup the tool,
    the instructor must provide their consumer key and shared secret
    which can be accessed from their OpenDSA account page on the OpenDSA site.
    They also provide the LMS with the url for OpenDSA's lti configuration
    endpoint, ``/lti/xml_config``. This endpoint returns an XML object
    containing information that tells the LMS how to configure OpenDSA-LTI
    as an external tool, including what URL is used to for resource
    selection, and what url is used to launch an exercise or visualization.

    Once the user has configured OpenDSA-LTI as an external tool,
    they are then able to use indiviudal OpenDSA exercises and 
    visualizations as assignments in the LMS. When creating a new
    assignment, the is given the ability to pick an external tool. If they
    pick OpenDSA-LTI, it will make a request to ``/lti/resource``, which 
    will respond with a page containing a collection of exercises and
    visualizations that the instructor may choose from. The instructor's
    selection is then communicated back to the LMS.

    When a user accesses the newly created assignment, it makes a request
    to ``/lti/launch``. The process from then on is similar
    to the launch process described in avenue 1 above.
    

Adding New Exercises and Chapters
---------------------------------
For the 2nd avenue of using OpenDSA-LTI described above, available 
exercises are looked for in RST files contained in a predefined set 
of folders contained in ``~OpenDSA/RST/en/``.

The set of folders that is looked in is defined by the ``EXERCISE_DIRECTORIES`` 
hash located in ``OpenDSA-LTI/config/initializers/constants.rb``. Any exercises
listed in one of the RST files contained in a directory listed in the 
``EXERCISE_DIRECTORIES`` hash will automatically be available through the 2nd
avenue of LTI acess described above_.

.. _above: `How OpenDSA-LTI works`_

Installation and Setup
----------------------

For instructions on setting up an OpenDSA server, see the README_ in the 
`OpenDSA-LTI repository`_ on GitHub.

.. _README: https://github.com/OpenDSA/OpenDSA-LTI/blob/master/README.md
.. _`OpenDSA-LTI repository`: https://github.com/OpenDSA/OpenDSA-LTI/
