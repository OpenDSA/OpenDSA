.. This file is part of the OpenDSA eTextbook project. See
.. http://opendsa.org for more details.
.. Copyright (c) 2012-2020 by the OpenDSA Project Contributors, and
.. distributed under an MIT open source license.

.. avmetadata::
   :author: Noha Alaa
   :satisfies: DB Demo
   :topic: Demo


Introduction to the Database concept
====================================

Guidelines for Using This Book:
-------------------------------

There are many different ways to learn a database course. Here all you need is applying $"READ$ $ONCE$ $VIEW$ $MANY"$ method. This method is the simplist and fastest way to learn database concepts 

for the freshers in the database field.

Because of the author's belief of the maxim $"a$ $picture$ $worth$ $than$ $thousand$ $words"$ and in order to facilitate learning the database concepts for beginners and saving their time. This book is supported

by a lot of pictures, tables, visualization, and figures.

The book's author is highly recommending to study the book in the same sequence as presented because some of the concepts and visualizations are prerequisite to other.

Database Basic Definitions
--------------------------

**DATA:** is a collection of facts and figures that can be processed to produce information (i.e., data ia the row material of information). 
Each piece of data is a little fact that doesn’t mean much on its own.

**INFORMATION:** is the result of processing pieces of data.
“news or knowledge received or given”. It is what results when you have processed or orgnized facts (i.e., data).

 **For example,** if we have data about marks obtained by all students (*this is data*), we can then conclude about toppers and average marks (*that is information*).

.. odsafig:: Images/DataVsInfoEx.png

**Main Differences Between Data and Information:**

.. odsafig:: Images/DataVsInfo.png

**DATABASE:** is a collection of related data (*e.g., "hospital database" stores doctors, patients, patients' diagnosis & treatments as well as patients' bills*).

.. odsafig:: Images/HospitalDB.png

**DATABASE MANAGEMENT SYSTEM  (DBMS):** are software systems used to store, retrieve, and run queries on data.  

A DBMS serves as an interface between an end-user and a database, allowing users to create, read, update, and delete data in the database.

DBMS manage the data, the database engine, and the database schema, allowing data to be manipulated or extracted by users and other programs.

This helps provide data security, data integrity, concurrency, and uniform data administration procedures.

**TYPES OF DBMS:**

	• Distributed database management system.

	• Hierarchical database management system.

	• Network database management system.

	• Object-oriented database management system.

	• Relational database management system. (*This type is the main concern of the book*)


**RELATIONAL DATABASE MANAGEMENT SYSTEM** (RDBMS): are the most popular data model because of its user-friendly interface. It is based on normalizing data in the rows and columns of the tables.

This is a viable option when you need a data storage system that is scalable, flexible, and able to manage lots of information.

**EXAMPLES ON DBMS:**

.. odsafig:: Images/DBMSSoftwares.png


**DATABASE APPLICATION:**

"database application" is shortened form for "database application program".

**A database application:** is a computer program whose main purpose is retrieving information from a computerized database. From here, information can be inserted, modified or deleted which is subsequently conveyed back into the database. 

**Database application programs** should be managed with a standard relational database management system and the interface with user is impemented by either the DBMS itself or using any other programing language to build the application logic on top of the embeded DBMS. 

**Building the application logic means** Is the execution of a set of program statements in a sequence that exactly imitates the design secnario steps to accomplish a specific task, during these execution the programing code may access the database several times via queries as illutrated in the figure below.

.. odsafig:: Images/studentusingcomputercalculatinghergpa2.png

The above figure illustrates the *behind the scene* steps of how student can obtain his result in terms of GPA using his ID. Steps showing application logic sequence of execution according to the university GPA calculation rules. 


**First** student enters his ID, then the system uses this student ID to select student's grades in each subject, system then applies the logical arithmetic calculations according to the given table in the figure to calculate the GPA and Finally the GPA returned back to the student. This execution sequence is a combination of some SQL commands that access database (*e.g., selecting student grades from database using his ID*) as well as some logical & arithmetic programming statements to accomplish the whole task of GPA calculation and result presentation to the user (* e.g., $"Grade points=credits*Grade"$ *). This is a real life example of how the technology automatically identifies the business logic in the program code.

As a result programmers and database designers can built a lot of applications on top of  single database as shown in the below figure. Modern database applications facilitate simultaneous updates and queries from multiple users.


.. odsafig:: Images/singleDatabaseSupportMultiApps.png


**Database application programs Examples**

Many of today's most widely used computer systems are database applications. Some examples given below.

• **Online encyclopedias: (e.g.,Wikipedia)**

• **Social media websites:**

	We all utilize online media sites to associate with companions and to impart our perspectives to the world. Everyday, many people use their online media accounts like Twitter, Facebook, and Google. DBMS put away all of the clients data in the information base, so they become ready to interface with each other. For example, Facebook, which was built on top of MySQL.

• **Banking and credit card exchanges systems:**

• **Education Sector: (e.g., universities and schools database systems)**

• **Email systems: (e.g., Gmail)**

• **E-commerce websites & Online Shopping:**

	These days, web-based shopping has become a major pattern. Nobody needs to visit the shop and waste time. Everybody needs to shop through web based shopping sites, (for example, Amazon, spotify, Apple) from home. So these e-commerce web sites use DBMSs to assist in receipt charges, installments, buy data of all items sold or returned uniquely.

               *Amazon.com* is a very successful example, which used the Oracle relational database management system.

• **Railway Reservation System:**

	In the rail route reservation framework, the information base is needed to store the record or information of ticket appointments, status about train’s appearance, and flight.  Additionally, if trains get late, individuals become informed with it through the information base update.

• **Library management system:**

	There are lots of books in the library so; it isn't efficient to store the record of their relative data in a traditional way, the solution is utilizing a (DBMS) to keep up all the books' data identified with the name of the book, issue date, accessibility of the book, and its writer.  


.. odsafig:: Images/DatabaseApplicationExamples.png


**DATABASE SYSTEM ENVIRONMENT:** Is the DBMS software together with the data itself and the applications are also included.

.. odsafig:: Images/DatabaseSystemComponents.png
.. odsafig:: Images/DatabaseSystemEnvironment.png


Database Types
--------------

**FLAT FILE:**
~~~~~~~~~~~~~~

.. odsafig:: Images/CSVFileExample2.png

**RELATIONAL DATABASE:**
~~~~~~~~~~~~~~~~~~~~~~~~

In a relational database, all data is held in tables, which are physically made up of rows and columns. Each table in the database must hold information about a specific thing, such as employees, products, or customers.

*Note: Each table cannot hold data about different things (concepts)*.


**The below table compares both types of databases (Flat file Vs. Relational database):**

.. odsafig:: Images/FaltFileVsRElationalDatabase.png


**This below visualization shows** the difficulties and drawbacks of using flat file design in database and how its problems solved by converting it to relational design.

.. inlineav:: FlatFileVsRelational ss
   :long_name: FlatFileVsRelationalDatabase Slideshow
   :links: AV/Database/FlatFileVsRelational.css
   :scripts: AV/Database/FlatFileVsRelational.js
   :output: show

**Disadvantages of Flat file (i.e., a single table database)**

	• Redundancy of data

	• Problem with complex data

	• Problems in updating in bulk (department phone number)

	• Problems in adding incomplete data (new department without any employee)

	• Problems in removing group of data (all employees from the specific department)

*Hint: Relational Database Concept solves a lot of problems found in Flat Files design*.

Data Modelling
----------------------

**What is data modeling?**
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                - The process of creating data models. 
 
	- Is a process used to define and analyze data requirements needed to support the business processes within the scope of corresponding information systems in organizations. 

	- It involves expressing data and information through diagrams of text and symbols to visualize the interrelations. It requires a good understanding of the desired business outcome and is the foundation for creating a robust software solution. Therefore, the process of data modeling involves professional database designers and developers working closely with the business stakeholders, as well as potential users of the information system. 
	
	- Data Modeling helps in increasing consistency in naming, rules, semantics, and security to improves data analytics. Thus it creates data models by which data associations and constraints are described and eventually coded to reuse. 

	- Its emphasis is on the need for availability and organization of data, independent of the manner of its application.

**Data Model Definition:**
~~~~~~~~~~~~~~~~~~~~~~~~~~

	• Model created though data modelling process illustrated above.

	• Models are visual representation of either a whole information system or parts of it. Its goal is to illustrate the types of data used and stored within the system, the relationships among these data items, the ways the data can be grouped and organized and its formats and attributes.

	• The data model provides the blueprint for building a new database or reengineering existing applications as a  business solution .

	• These models can present data at various levels of abstraction according to the type of model used.

**Types of Data models**
~~~~~~~~~~~~~~~~~~~~
	
	There are mainly three different types of data models: **conceptual data models**, **logical data models**, and **physical data models**, and each one has a specific purpose. 

	A general understanding to the three models is that, business analyst uses conceptual and logical model for modeling the data required and produced by system from a business angle, while database designer refines the early design to produce the physical model for presenting physical database structure ready for database construction.


**Conceptual Data Model:**
____________________________

	This Data Model defines **WHAT** the system contains.

	A conceptual data model just includes the main concepts (entities) required to store information and the relationships that exist between these entities. But it doesn't include any details about each piece of information.

	In this model entities are specified at a high level, using business rather than technical names; this allows the models to be understood by management and users and not just the technical staff. 

	The conceptual model is considered as an initial model, its purpose is to organize, scope and define business concepts and rules without going into any details.

	It is typically created by Business stakeholders and Data Architects. 

	The focus is to represent data as a user will see it in the “real world.”

.. odsafig:: Images/conceptualuniversitymodel.png

**Logical Data Model:** (Implmentational Model)
____________________________________________

	Defines **HOW** the system should be implemented regardless of the DBMS. 

	Has a low-level description of entities that are defined and how they are related to each other and what kind of data is to be stored.

	This model determines if all the requirements of the business have been gathered. Logical data model describes the data without regard to how they will be physically implemented in the database.

	Its purpose is to developed technical map of rules and data structures.

	This model is typically created by Database designers and Business analysts. 


.. odsafig:: Images/logicaluniversitymodel.png

**Physical Data Model**
_____________________

	Describes HOW the system will be implemented and **HOW the data will be stored using a specific DBMS system**. 
	
	A physical data model is usually derived from a logical data model taking into account all technology-specific details.

	Its purpose is actual implementation of the database.

	One big difference between logical and physical data models is using table and column names rather than entity and attribute names.
	
	This model is typically created by database administrators (DBA) and developers.


.. odsafig:: Images/physicaluniversitymodel.png


The following chart describes the different features that are usually included on each of these three models:

.. odsafig:: Images/ModelsFeatures.png


.. odsafig:: Images/conLogPhyFinalComp.png


Conceptual and logical data models can be considered as technology-agnostic, business-oriented models (the logical one is more detailed), while physical data models are created to actually implement

and create a database, thus taking into account technology features (data types, name conventions and limits, etc.).

From a single conceptual data model, we would expect to get a more detailed logical data model, both of them designed to represent the required data structures from a business perspective. From that 

logical data model, we can then create as many physical data models as needed, each of them designed for a particular database engine, as shown in the figure below:

.. odsafig:: Images/logicalconceptualphysicalbusinessimportance.png



Examples on data models used
~~~~~~~~~~~~~~~~~~~~~~~~

**Entity Relationship Diagram (ERD)**  
*( Conceptual data model example)*

	Defines the relationship between entities and their attributes. In example, an ERD contains many-to-many relationships and do not include foreign
	
	keys. They are implied. In an ERD, we are simply visualising the entities, their attributes, and the relation between them. we dont care about where 
	
	foreign keys go or how to implement that many-to-many relationship. (but we do underline primary keys!)

**Relational Model (RDD)** 
*( Logical data model example)*
	
	we are referring to an implementation of our model. At this point we should be clear about the formats of our attributes, the foreign keys we use, 

	and the linking tables we might need to stitch entities together. A relational model is basically a model of a possible database implementation.


**In short,** an ERD is an abstract concept of our database, it speaks in entities and attributes, a type of conceptual data model. A relational model defines formats and relations in

 a way a database could understand, a type of logical data models.

 The "relational diagram" is probably supposed to show the physical columns and relations of such (as would be done in Access or any other DBMS)

 where the ERD just boxes the entities at a higher level of abstraction.

*Hint: ERD and RDD will be discussed in more details in the next chapter*.


**Why use Data Models?**
~~~~~~~~~~~~~~~~~~~~

**The primary goals of using data model are:**

• Ensures that all data objects (Concepts or entities) required by the database are accurately represented. 

• A data model helps design the database at the conceptual, physical and logical levels.

• Data Model structure helps to define the relational tables, with their primary keys, foreign keys, relationships and any other constraints.

• It provides a clear picture of the base data and database developers can use it to create a physical database.

• It helps in identifying redundant and missing data.

• Omission of data will lead to creation of faulty reports and produce incorrect results.

• Though the initial creation of data model is labor and time consuming, in the long run, it makes your IT infrastructure upgrade and maintenance faster and cheaper.



