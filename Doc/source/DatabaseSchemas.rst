.. _DatabaseSchemas:


Data collection server database tables
========================================

Below is the description of all the tables created
by the opendsa django app models.py file.

Exercise
--------

Stores exercises information.

        +-------------------------+----------+-----------------------------+
        |   Column                |   Type   |   Description               |
        +=========================+==========+=============================+
        |   name                  |   int    |  Name of the exercise       |
        +-------------------------+----------+-----------------------------+
        |   description	          | longtext | Description of the exercise |
        +-------------------------+----------+-----------------------------+
        |   author                | varchar  |  Exercise author            |
        +-------------------------+----------+-----------------------------+
        |   covers                | longtext | Topic covered by the        |
        |                         |          |  exercise                   |
        +-------------------------+----------+-----------------------------+
        |   ex_type               |          |  Type of exercise: Khan     |
        |                         | varchar  |  academy, JSAV proficiency, |
        |                         |          |  or JSAV slide shows        |
        +-------------------------+----------+-----------------------------+
        |   streak (KA exercises) |          |  streak of correct exercise |
        |                         |  decimal |  for proficiency            |
        +-------------------------+----------+-----------------------------+




Books
-----

Stores books information.

        +-------------------------+----------+-----------------------------+
        |   Column                |   Type   |   Description               |
        +=========================+==========+=============================+
        |   book_name             |  varchar |  Name of the book           |
        +-------------------------+----------+-----------------------------+
        |   description           | longtext |  Book's URL                 |
        +-------------------------+----------+-----------------------------+




Assignments
-----------

Stores assignments information.

        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   course_module(1)      |     int          | reference to assignment name|
        +-------------------------+------------------+-----------------------------+
        |   assignment_book(2)    |     int          | reference to book           |
        +-------------------------+------------------+-----------------------------+
        |   assignment_exercises  | comma separated  |  Exercise author            |
        |                         |   integers       |                             |
        +-------------------------+------------------+-----------------------------+

``Foreign keys:`` (1) Exercise_CourseModule table (A+ database), (2) Book table.


Module
------

Stores modules information.

        +-------------------------+----------+-----------------------------+
        |   Column                |   Type   |   Description               |
        +=========================+==========+=============================+
        |   short_display_name    | varchar  |  Name of the module         |
        +-------------------------+----------+-----------------------------+
        |   name                  | longtext | Description of the module   |
        +-------------------------+----------+-----------------------------+
        |   author                | varchar  |  Exercise author            |
        +-------------------------+----------+-----------------------------+
        |   covers                | longtext | Topic covered by the        |
        |                         |          |  exercise                   |
        +-------------------------+----------+-----------------------------+
        |   exercises_list        | comma    |  List of exercises in       |
        |                         | separated|  the module                 |
        |                         | integers |                             |
        +-------------------------+----------+-----------------------------+



BookModuleExercise
------------------

Stores information related to books, modules, and exercises relationships.

        +-------------------------+----------+-----------------------------+
        |   Column                |   Type   |   Description               |
        +=========================+==========+=============================+
        |   book(1)               | int      |  Reference to book          |
        +-------------------------+----------+-----------------------------+
        |   module(2)             | int      |  Reference to module        |
        +-------------------------+----------+-----------------------------+
        |   exercise(3)           | int      |  Reference to exercise      |
        +-------------------------+----------+-----------------------------+
        |   points                | int      |  Points of the exercise     |
        |                         |          |                             |
        +-------------------------+----------+-----------------------------+



``Foreign keys:`` (1) Book table, (2) Module table, (3) Exercise table.


BookChapter
-----------

Stores information about chapters in a book.

        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   book(1)               | int              |  Reference to book          |
        +-------------------------+------------------+-----------------------------+
        |   name                  | int              |  Name of the chapter        |
        +-------------------------+------------------+-----------------------------+
        |   module_list           | comma separated  |  List of modules in the     |
        |                         | integers         |  chapter                    |
        +-------------------------+------------------+-----------------------------+



``Foreign keys:`` (1) Book table.


UserBook
--------

Stores book-user relationships and if user's work should be graded.
 
        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   book(1)               | int              |  Reference to book          |
        +-------------------------+------------------+-----------------------------+
        |   user(2)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   grade                 | boolean          |  Indicates if user's grades |
        |                         |                  |  should be displayed        | 
        |                         |                  |  in teachers' view          |
        +-------------------------+------------------+-----------------------------+



``Foreign keys:`` (1) Book table, (2) Auth_User table (Django table).




UserButton
----------

Stores clickstream/interactions data

        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   book(1)               | int              |  Reference to book          |
        +-------------------------+------------------+-----------------------------+
        |   user(2)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   exercise(3)           | int              | reference to exercise       |
        +-------------------------+------------------+-----------------------------+
        |   module(4)             | int              | reference to module         |
        +-------------------------+------------------+-----------------------------+
        |   name                  | varchar          | type of interaction         |
        +-------------------------+------------------+-----------------------------+
        |  description            | longtext         | description of the          |
        |                         |                  | interaction                 |
        +-------------------------+------------------+-----------------------------+
        |  action_time            |  datetime        | time of the interaction     |
        +-------------------------+------------------+-----------------------------+
        |  uiid                   | int              | unique id of the intercation|
        +-------------------------+------------------+-----------------------------+
        | browser_family          | varchar          | browser used by the user    |
        +-------------------------+------------------+-----------------------------+
        | browser_version         | varchar          | browser's version           |
        +-------------------------+------------------+-----------------------------+
        | os_family               | varchar          | operating system used       |
        +-------------------------+------------------+-----------------------------+
        | os_version              | varchar          | operating system's version  |
        +-------------------------+------------------+-----------------------------+
        | device                  | varchar          | device used by the user     |
        +-------------------------+------------------+-----------------------------+
        | ip_address              | varchar          | IP address of the user      |
        +-------------------------+------------------+-----------------------------+

``Foreign keys:`` (1) Book table, (2) Auth_User table (Django table), (3) Exercise table, (4) Module table.
   
UserModule
----------

Records a summary of a student activity on a module

        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   book(1)               | int              |  Reference to book          |
        +-------------------------+------------------+-----------------------------+
        |   user(2)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   module(3)             | int              | reference to module         |
        +-------------------------+------------------+-----------------------------+
        |   first_done            | datetime         | date of first module attempt|
        +-------------------------+------------------+-----------------------------+
        |   last_done             | datetime         | date of last module attempt |
        +-------------------------+------------------+-----------------------------+
        |   proficient_date       | datetime         | date of prociciency         |
        +-------------------------+------------------+-----------------------------+


``Foreign keys:`` (1) Book table, (2) Auth_User table (Django table), (3) Module table.


UserData
--------

Records summary of user/exercises activity (started exercises and proficient exercises).

        +-------------------------+---------------------+-----------------------------+
        |   Column                |   Type              |   Description               |
        +=========================+=====================+=============================+
        |   book(1)               | int                 |  Reference to book          |
        +-------------------------+---------------------+-----------------------------+
        |   user(2)               | int                 |  Reference to user          |
        +-------------------------+---------------------+-----------------------------+
        |   started_exercises     | comma separated int | reference to module         |
        +-------------------------+---------------------+-----------------------------+
        |   proficient_exercises  | comma separated int | date of first module attempt|
        +-------------------------+---------------------+-----------------------------+

``Foreign keys:`` (1) Book table, (2) Auth_User table (Django table)

UserExerciseLog
---------------

Records information about each exercise attempt.


        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   user(1)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   exercise(2)           | int              | reference to exercise       |
        +-------------------------+------------------+-----------------------------+
        |   correct               | boolean          | correctness of the attempt  |
        +-------------------------+------------------+-----------------------------+
        |   time_done             | datetime         | time of the attempt         |
        +-------------------------+------------------+-----------------------------+
        |  time_taken             | datetime         | time taken to complete      |
        |                         |                  | the exercise                |
        +-------------------------+------------------+-----------------------------+
        |  counts_hints           |  int             | number of hint used         |
        +-------------------------+------------------+-----------------------------+
        |  hint_used              | boolean          | hint used or not            |
        +-------------------------+------------------+-----------------------------+
        | earned_proficiency      | boolean          | proficiency earned or not   |
        +-------------------------+------------------+-----------------------------+
        | count_attempt           | int              | number of attempts          |
        +-------------------------+------------------+-----------------------------+
        | ex_question             | varchar          | KA question name            |
        +-------------------------+------------------+-----------------------------+


``Foreign keys:`` (1) Book table, (2) Exercise.


UserProgLog
-----------

Records additional information about each programing exercise attempt.


        +-------------------------+---------------+-------------------------------+
        |   Column                |   Type        |   Description                 |
        +=========================+===============+===============================+
        |   problem_log(1)        | int           | Reference to UserExerciseLog  |
        +-------------------------+---------------+-------------------------------+
        |   student_code          | longtext      | students attempt code         |
        +-------------------------+---------------+-------------------------------+
        |   feedback              | longtext      | compilation feedback          |
        +-------------------------+---------------+-------------------------------+

``Foreign keys:`` (1) UserExerciseLog table.

UserProfExerciseLog
-------------------

Stores additional information about each JSAV proficiency exercise attempt.

        +-------------------------+---------------+-------------------------------+
        |   Column                |   Type        |   Description                 |
        +=========================+===============+===============================+
        |   problem_log(1)        | int           | Reference to UserExerciseLog  |
        +-------------------------+---------------+-------------------------------+
        |   student               | int           |                               |
        +-------------------------+---------------+-------------------------------+
        |   correct               | int           |                               |
        +-------------------------+---------------+-------------------------------+
        |   fix                   | int           |                               |
        +-------------------------+---------------+-------------------------------+
        |   undo                  | int           |                               |
        +-------------------------+---------------+-------------------------------+
        |   total                 | int           |                               |
        +-------------------------+---------------+-------------------------------+

``Foreign keys:`` (1) UserExerciseLog table.


UserExercise
------------

Stores statistics about student attempts each record contains the data 
related to one student and one exercise.


        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   user(1)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   exercise(2)           | int              | reference to exercise       |
        +-------------------------+------------------+-----------------------------+
        |   streak                | int              | streak of the attempt (KA)  |
        +-------------------------+------------------+-----------------------------+
        |   longuest_streak       | int              | user's longuest streak      |
        +-------------------------+------------------+-----------------------------+
        |  first_done             | datetime         | time of first  attempt      |
        +-------------------------+------------------+-----------------------------+
        |  last_done              | datetime         | time of last attempt        |
        +-------------------------+------------------+-----------------------------+
        |  total_done             | int              | total number of attempts    |
        +-------------------------+------------------+-----------------------------+
        |  total_correct          | int              | number of correct attempts  |
        +-------------------------+------------------+-----------------------------+
        |  proficient_date        | datetime         | date of proficiency         |
        +-------------------------+------------------+-----------------------------+
        |  progress               | decimal          | correctness percentage      |
        +-------------------------+------------------+-----------------------------+


``Foreign keys:`` (1) Auth_User table (Django table), (2) Exercise table.

Bugs
----
Stores bugs reported by users.

        +-------------------------+------------------+-----------------------------+
        |   Column                |   Type           |   Description               |
        +=========================+==================+=============================+
        |   user(1)               | int              |  Reference to user          |
        +-------------------------+------------------+-----------------------------+
        |   os_family             | varchar          | OS where the bug occured    |
        +-------------------------+------------------+-----------------------------+
        |  browser_family         | varchar          | browser used                |
        +-------------------------+------------------+-----------------------------+
        |   title                 | varchar          | short summary of the bug    |
        +-------------------------+------------------+-----------------------------+
        |  description            | longtext         | detailed bug's description  |
        +-------------------------+------------------+-----------------------------+
        |  screenshot             | longtext         | path to the screenshot      |
        +-------------------------+------------------+-----------------------------+   

``Foreign keys:`` (1) Auth_User table (Django table).
