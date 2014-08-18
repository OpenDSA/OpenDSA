.. _Backend:

OpenDSA Backend Installation and Setup
======================================

The OpenDSA "backend" provides support for collecting student scoring
data (in a MySQL database), logs user interaction details with OpenDSA
content for analysis purposes, and provides tools for instructors to
manage the student score data.
Most OpenDSA developers do **not** need to worry about intalling a
copy of the OpenDSA back end.

Windows
-------
1. Install Python

2. Install python setuptools
   * Download EXE from http://pypi.python.org/pypi/setuptools

3. Install  Django

   * tar xzvf Django-1.4.1.tar.gz
   * cd Django-1.4.1
   * python setup.py install

4.  Install MySQL Server

   * Start a MySQL command prompt
   * CREATE DATABASE <database_name>;
   * GRANT ALL ON <database_name>.* TO '<database_user>'@'localhost' IDENTIFIED BY '<database_user_password>';
   * exit

See "Both" section for remaining instructions


Linux
-----
1. Install Python
   * sudo apt-get install python

2. Download and install Django

   * tar xzvf Django-1.4.1.tar.gz
   * cd Django-1.4.1
   * python setup.py install

3. Install python setuptools 

   * sudo apt-get install python-setuptools (easy_install)

4. Install MySQL Server

   * sudo apt-get install mysql-server
   * Start mysql prompt
   * mysql -u root -p [ENTER]
   * Enter your password when prompted
   * CREATE DATABASE <database_name>;
   * GRANT ALL ON <database_name>.* TO '<database_user>'@'localhost' IDENTIFIED BY '<database_user_password>';
   * exit

See "Both" section for remaining instructions

Both
----

1.  easy_install MySQL-python

   * If this doesn't work in Windows, you can install from an EXE - https://code.google.com/p/soemin/downloads/detail?name=MySQL-python-1.2.3.win32-py2.7.exe

2. Install required modules, remove sudo for Windows

   * sudo easy_install oauth2
   * sudo easy_install simplejson
   * sudo easy_install feedparser
   * sudo easy_install icalendar
   * sudo easy_install mimeparse
   * sudo easy_install python-dateutil
   * sudo easy_install django-tastypie

3. Install memcache

   * pip install python-memcached

4. Install user agent (http://pypi.python.org/pypi/django-user_agents)

   * pip install pyyaml ua-parser user-agents
   * pip install django-user-agents	

5. Install OpenDSA-server

   * git clone https://YOURGITHUBID@github.com/OpenDSA/OpenDSA-server.git 
   * cd OpenDSA-server/ODSA-django
   * Change values in settings.py file

      + 'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
      + 'NAME': '<database_name>',         #g3et_path('test.db'),            # Or path to database file if using sqlite3.
      + 'USER': '<database_user>',                  # Not used with sqlite3.
      + 'PASSWORD': '<database_user_password>',                  # Not used with sqlite3.
      + 'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
      + 'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
      + For both values under 'TEMPLATE_LOADERS = (' change 'load_template_source' to 'Loader'
      + Update BASE_URL to have IP and port of Django server (optional?)
					BASE_URL = "<IP>:<PORT>"
					Ex: BASE_URL = "127.0.0.1:8000"

6. Create an empty file named daily_stats.json, inside  the "media root"
   directory specified in settings.py file 
7. python manage.py syncdb
8. Create an administrator (superuser) account when prompted 
9. python manage.py runserver 0.0.0.0:8000
10. In your web browser, go to: http://127.0.0.1:8000/admin/

Notes
-----

 Due to cross-domain communication issues, the files communicating with the Django server must be hosted on a server and that server must be listed in the 'XS_SHARING_ALLOWED_ORIGINS' variable in the settings.py file.  For OpenDSA development, we are hosting our files on 'http://algoviz-beta.cc.vt.edu'

To enable OpenDSA to communicate with the Django server, you must include the IP of your server in your book instance configuration file.





