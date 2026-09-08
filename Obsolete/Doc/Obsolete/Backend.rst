.. _Backend:

OpenDSA Backend Installation and Setup
======================================

The OpenDSA "backend" provides support for collecting student scoring
data (in a MySQL database), logs user interaction details with OpenDSA
content for analysis purposes, and provides tools for instructors to
manage the student score data.
Most OpenDSA developers do **not** need to worry about intalling a
copy of the OpenDSA back end.
Instructors who would like to use OpenDSA will probably want to
contact the OpenDSA team about getting hosting support, rather than
set up their own server.

Windows
-------
1. Install Python

2. Install python setuptools

   * Download the executeable from
     http://pypi.python.org/pypi/setuptools

3. Install Django::

     tar xzvf Django-1.4.1.tar.gz
     cd Django-1.4.1
     python setup.py install

4.  Install MySQL Server

   * Start a MySQL command prompt and then do::

       CREATE DATABASE <database_name>;
       GRANT ALL ON <database_name>.* TO '<database_user>'@'localhost' IDENTIFIED BY '<database_user_password>';
       exit

See "Both" section for remaining instructions


Linux
-----
1. Install Python::

     sudo apt-get install python

2. Download and install Django::

     tar xzvf Django-1.4.1.tar.gz
     cd Django-1.4.1
     python setup.py install

3. Install python setuptools::

     sudo apt-get install python-setuptools (easy_install)

4. Install MySQL Server::

     sudo apt-get install mysql-server

   * Start mysql prompt and do::

       mysql -u root -p
       < Enter your password when prompted >
       CREATE DATABASE <database_name>;
       GRANT ALL ON <database_name>.* TO '<database_user>'@'localhost' IDENTIFIED BY '<database_user_password>';
       exit

See "Both" section for remaining instructions

Both
----

1.  easy_install MySQL-python

   * If this doesn't work in Windows, you can install from an EXE - https://code.google.com/p/soemin/downloads/detail?name=MySQL-python-1.2.3.win32-py2.7.exe

2. Install required modules, (remove ``sudo`` for Windows)::

     sudo easy_install oauth2
     sudo easy_install simplejson
     sudo easy_install feedparser
     sudo easy_install icalendar
     sudo easy_install mimeparse
     sudo easy_install python-dateutil
     sudo easy_install django-tastypie
     sudo easy_install html5lib

3. Install memcache::

     pip install python-memcached

4. Install user agent (http://pypi.python.org/pypi/django-user_agents)::

     pip install pyyaml ua-parser user-agents
     pip install django-user-agents	

5. Install OpenDSA-server::

     git clone https://YOURGITHUBID@github.com/OpenDSA/OpenDSA-server.git 
     cd OpenDSA-server/ODSA-django

   * Change values in settings.py file

      + 'ENGINE': 'django.db.backends.mysql', # Add 'postgresql_psycopg2', 'postgresql', 'mysql', 'sqlite3' or 'oracle'.
      + 'NAME': '<database_name>',         #g3et_path('test.db'),            # Or path to database file if using sqlite3.
      + 'USER': '<database_user>',                  # Not used with sqlite3.
      + 'PASSWORD': '<database_user_password>',                  # Not used with sqlite3.
      + 'HOST': '',                      # Set to empty string for localhost. Not used with sqlite3.
      + 'PORT': '',                      # Set to empty string for default. Not used with sqlite3.
      + For both values under 'TEMPLATE_LOADERS = (' change 'load_template_source' to 'Loader'
      + Update BASE_URL to have IP and port of Django server (optional?)

	* BASE_URL = "<IP>:<PORT>"
	* Ex: BASE_URL = "127.0.0.1:8000"

6. Create an empty file named daily_stats.json, inside  the "media root"
   directory specified in settings.py file 
7. ``python manage.py syncdb``
8. Create an administrator (superuser) account when prompted 
9. ``python manage.py runserver 0.0.0.0:8000``
10. In your web browser, go to: http://127.0.0.1:8000/admin/

SSL Certificates
----------------

An OpenDSA installation might encounter the symptom that some students
cannot log on.
If this is happening, it might be caused by a problem with your SSL
certificate chain.
If this is the cause, then hopefully you will be able to tell because
either the browser console window or the Network tab under Firebug
might indicate a message such as
"Failed to load response data network error, ERR_INSECURE_RESPONSE".

The cause for this condition is that either the root certificate is
missing in your Apache configuration, or else the certifciate
signature chain is broken.
In our experience, this can easily happen in a University setting.

You can use online tools to help diagnose SSL installation issues.
See https://www.digicert.com/help/ or 
https://www.sslshopper.com/ssl-checker.html.
Then, if necessary you will have to update your Apache configuration
file (such as /etc/apache2/sites-enabled/default-ssl).
Depending on your problem, you might need to:

* Add the root certificate by setting the ``SSLCACertificateFile``
  variable (see
  http://httpd.apache.org/docs/2.2/mod/mod_ssl.html#sslcacertificatefile).

* Specify the certificate signature chain file with
  ``SSLCertificateChainFile``
  (see http://httpd.apache.org/docs/2.2/mod/mod_ssl.html#sslcertificatechainfile).
  If your certificate vendor did not provide you with a single chain
  file, you might have to concatenate all the intermediate
  certificates into one file.


Caching
-------

If you frequently update your OpenDSA's files, you might want 
to configure Apache to cache your files for a shorter period
of time. In our case we configured Apache  to cache js and css 
files for an hour.

The Apache documentation recommends to make configuration changes inside
httpd main server config file rather that using ``.htaccess`` files 
(see http://httpd.apache.org/docs/2.4/howto/htaccess.html).
Below is our caching settings::

    ExpiresActive On
    ExpiresByType image/png "now plus 1 month"
    ExpiresByType image/jpeg "now plus 1 month"
    ExpiresByType image/gif "now plus 1 month"
    ExpiresByType application/javascript "now plus 1 hour"
    ExpiresByType application/x-javascript "now plus 1 hour"
    ExpiresByType text/javascript "now plus 1 hour"
    ExpiresByType text/css "now plus 1 hour"



Notes
-----

Due to cross-domain communication issues, the files communicating with
the Django server must be hosted on a server and that server must be
listed in the ``XS_SHARING_ALLOWED_ORIGINS`` variable in the
``settings.py`` file.
For OpenDSA development, we host our files on
``http://algoviz-beta.cc.vt.edu``.

To enable OpenDSA to communicate with the Django server, you must include the IP of your server in your book instance configuration file.
