.. _Database:

===============================
Database Implementation Details
===============================

----------------------------
Changes for OpenDSA-DevStack
----------------------------

#. Changed the db service to be a PostgreSQL image and added a new dbmysql service for the MySQL database. 

-----------------------
Changes for OpenDSA-LTI
-----------------------

#. Dump the opendsa MySQL database using the MySQL command shown below.
    * The output file will have a bunch of locks and unlocks and postgres does not like this
    * That command will output a file directly to your machine so there is no need to worry about the volume running out of space
#. Use my created python script mysql_to_psql.py to format the file so that postgres will read it.
    * The script is for python 3 and can be invoked by calling py mysql_to_psql.py MySQL_dump_filename.sql target.sql
#. Implement the postgres changes 
#. Start OpenDSA with docker
#. Once running exec into opendsa-lti and to the following commands
    * rake db:drop
    * rake db:create
    * rake db:schema:load 
#. Now copy the postgres_format.sql script and you MySQL dump to docker using the Put file in docker command below
#. Exec into db and run the postgres_format.sql script first and then your MySQL dump file afterwards using the Run postgres file command below

**Note:** During my initial set up of postgres I ran into some issues with ruby not finding the pg gem. If this happens exec into opendsa-lti and force a gem bundle install.

**MySQL dump command:** docker-compose -f docker-compose.yml -f docker-dev.yml exec mysqldb  mysqldump -h dbmysql -u root -p --no-create-info --complete-insert --compatible=postgresql opendsa > mysql_dump.sql

**Start docker:** docker-compose -f docker-compose.yml -f docker-dev.yml up (in a separate terminal)

**Put file in docker:** docker cp opendsa-lti\YOURFILENAME opendsa-devstack_db_1:/

**Connect to db:** docker-compose -f docker-compose.yml -f docker-dev.yml exec db bash

**Run PostgreSQL file:** psql opendsa opendsa -d opendsa -a -f YOURFILENAME

**Reference commit to LTI:** `LTI-Commit <https://github.com/OpenDSA/OpenDSA-LTI/commit/02fba011595f7e5f3ba2e7a177eaf1037f0dc4b7>`_.

**Reference commit to DevStack:** `DevStack-Commit <https://github.com/OpenDSA/OpenDSA-DevStack/commit/c0cbed1ede6eb9a3f09b059dbd243e531830bfd3>`_.

-----------------
Database controls
-----------------
* To drop a table just run the drop TABLENAME command
    * Dropping a partitioned table will drop all its partitioned tables as well 
* To detach a partition but keep the table 
    * ALTER TABLE TABLENAME DETACH PARTITION PARTIONEDTABLENAME
    * The partition table will still exist but no longer be included in the table partitioning
* See `Partitioning <https://www.postgresql.org/docs/10/ddl-partitioning.html>`_ for any questions on partitioning 

-------------
Helpful Links
-------------

https://www.postgresql.org/about/

https://www.postgresql.org/docs/8.4/routine-vacuuming.html 

https://www.postgresql.org/docs/10/ddl-partitioning.html 

