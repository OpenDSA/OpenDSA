##########################
QBank - Developer's Manual
##########################

.. _QBank Dev Manual:


.. contents:: Table of Contents


Overview 
-----------------

Introduction
^^^^^^^^^^^^^^^^^^

QBank is a web application that assists Problem Authoring and Publishing. The user interface is intuitive and easy to understand. This document will give you a feel of the overall functionality of QBank tool and how to contribute to extending the code base.


QBank Features
^^^^^^^^^^^^^^

**Main Features Of QBank**

Easy interfaces for Problem authoring based on the main Problem types: 
  
 * Static question -- Multiple Choice Question
 * Dynamic question -- Parameterised Question
 * Summative question -- Multi-Part Question
 * Tool Specific question -- Khan Academy Exercise Question

Problem publishing - Parsing options to convert authored questions to different formats
  
 * Comma Separated Format - ``csv``
 * Khan Academy Exercise Format
  
QBank is extremely flexible and extensible

 * All display items are driven by templates using the powerful Django templating language
 * All urls can be custom configured to your desired naming convention
 * The formats that the questions can be parsed into can be extended to support specific needs of various publishing tool.
 * Front ends specific to a Tool can also be easily extended from the existing(Khan Academy) interface.

Standardised Authoring Interfaces based on the **Formal Problem Definition** for different Problem Types.


Requirements
------------

QBank is developed on the Django framework, therefore you do need a fully functioning Django instance  The `Django installation guide  <https://docs.djangoproject.com/en/1.5/intro/install/>`_ will step you through the process.

Please use Django 1.5.x at this time.

QBank requires Python 2.6.5 or later and a database supported by Django.


Directory Structure
^^^^^^^^^^^^^^^^^^^^^

The basic QBank directory structure looks as follows ::

 .       `-- QBank
            |-- manage.py
            |-- settings.py
            |-- urls.py
            `-- templates
            `-- qtool
               |-- admin.py
               |-- models.py
               |-- forms.py
               |-- urls.py
               |-- views.py
               |-- tests.py
               `media
                   `Exercises    

1. The ``templates`` directory contains all the HTML files for the tool.

2. The ``media`` directory contains the JavaScript, CSS, and other important files that are served by Django which are used by the QBank tool. 

3. The ``Exercises`` directory in the ``media`` folder holds the generated exercises in the `Khan Academy Exercise format <https://khan-exercises.readthedocs.org/en/latest/>`_ that can be used as-is fully compatible to Khan Academy.

**Run** ``qtool`` **app** 

Start it with ”./manage.py runserver” and browse to http://localhost:8000/qtool/

Installation
-------------

Setup
^^^^^^

1. Check out the latest version of QBank into /home/user/src/::
 
    git clone 
    https://github.com/annp89/QBank.git

 .. note ::
  This copies all the files in the QBank directory into ``src`` folder.

2. Install QBank onto your system::

    cd /home/user/src/qtool/
    sudo python setup.py install

  .. note ::

    An alternative to running the install is ensuring that /path/to/QBank/qtool is on your python path. This can be done by modifying the ``PATH`` variable to point to the correct file location.

3.  Once the above step in completed, a local database can be created for your copy::
 
     cd /home/user/src/qtool/
     sudo python manage.py syncdb



Configuration
^^^^^^^^^^^^^^^^^^^

After having cloned the QBank repository, you have to make some changes in the ``settings.py`` file to work on your local machine.

* Ensure that ``DJANGO_SETTINGS_MODULE`` environment variable is set to ``<project_name>.settings``; e.g. ``QBank.settings``



``settings.py``
""""""""""""""""

 ``TEMPLATE_DIRS`` should point to a relative location where the templates folder is located. ::
  
  TEMPLATE_DIRS = 
  ("/<project_name>/templates",)



``urls.py``
"""""""""""""

 The ``media`` folder contains all the javascript, css and other image files that are accessed by the tool.

 ::

  url(r'^(?P<path>.*)$',
     'django.views.static.serve',
     {'document_root': 
     '/quiz/qtool/media/'})



For viewing in Khan Academy Exercise Format, there are many ``javascript`` and ``css`` dependent files that have to be located in the media folder. 

Django serves the static files in the above location since the ``url`` is specified with that particular regular expression. 




View the Authoring tool
^^^^^^^^^^^^^^^^^^^^^^^^

After you have completed the installation and the configuration, you can view the QBank tool using the commands below.

1. Start up the sample webserver to see your store::

    python manage.py runserver

2. In order to see your sample store, point your browser to::

    http://127.0.0.1:8000/qtool

3. If you want to see the admin interface, point your browser to::

    http://127.0.0.1:8000/admin

4. Additional detailed documentation can be found here::
 
    http://127.0.0.1:8000/admin/doc

.. Note ::

 The above urls will be dependent on your Django setup. If you’re running the webserver on the same machine you’re developing on, the above urls should work. If not, use the appropriate url.

Developing a Tool-Specific Authoring Interface
-----------------------------------------------------

Files that need to be manipulated in order to develop a tool specific to the interface

1. ``forms.py``: 

 A new form specific to the interface be written by extending the basic ```Problem Form`` by either adding/ excluding fields to it. ::

  ``SimpleProblemForm`` was created to handle simple Multi Choice Questions.


2. ``views.py``:

 For each type of form, a view (class definition) needs to exist to render the template specific to that particular form. ::

  e.g. ``simple`` for is a view for ``SimpleProblemForm`` 

Another view needs to exist for parsing the form into a desired publishing format. ::

 e.g. 
 1. ``write_csv`` to parse the authored Problem to a ``csv`` file.
 2. ``ka_gen`` to parse the authored Problem to a ``Khan Academy Exercise format``


Defining another Publishing format
----------------------------------

In the ``views.py``, the parsing of the content entered in the Frontend Interface into another format is done in the ``ka_gen`` function. This function essentially takes all the content fed into the Front end and parses it with the additional information that converts it into a particular format.

* For instance, to write exercises in the *Khan Academy exercise format*, the content has to be converted into an ``html`` page. All the appropriate header files, scripts, ``css``` and images have to be correctly linked to the question based on the options selected and the type of question being authored. 

The *ka_gen* class parses the content and writes a file which is stored in the ``media`` folder. This allows the author to simply take the parsed file and plug it into the desired tool.


About the project
-------------------

QBank - Problem Authoring Tool, was developed by **Ann Paul**, Masters student, Department of Computer Science, Virginia Polytechnic and State University. 

This project was done under the supervision and able guidance of **Dr. Cliff Shaffer**, Professor, Department of Computer Science, Virginia Tech.
