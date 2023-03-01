ERD Basic Components
====================

There are **three basic components** of an entity relationship diagram. Similar components will be designated by the same shape. For example, all entitie types might be enclosed in a rectangle, while all attributes are enclosed in ellipse.


1- **Entities,** which are objects or concepts that can have data stored about them. Entities refer to tables used in databases.

2- **Attributes,** which are properties or characteristics of entities. Some of ERD attributes can be denoted as a primary key, which identifies a unique attribute, or a foreign key, which can be assigned to multiple attributes.

3- **The relationships** between and among those entities.

**For Exapmle:** assume in a faculty database we have two real world concepts a student and a course. Student learning process for a given course needs to be represented. Erd simply represents these concepts in the form of entities and the learning process as a relation between them as in the figure below.


.. odsafig:: Images/ERDSimpleEx.png


All ERD components & their types are shown in the below diagram:

.. odsafig:: Images/ErdComponents.png

Entities 
__________

**Entities** are specific objects or things in the mini-world that are represented in the database. For example the STUDENT "Adam" (Adam is the **entity instance** & STUDENT is the **entity type**), the "Database" COURSE.

**There are two types of entities:** (Strong Vs. Weak)

Strong Entity
~~~~~~~~~~~~~~

**A strong entity** is not dependent on any other entity in the schema. A strong entity will always have a primary key. Strong entities are represented by a single rectangle. The relationship of two strong entities is represented by a single diamond. 

**Example for strong entities:** EMPLOYEE, COURSE and BOOK each can be strong entity as each has its own primary key (ssn (PK) For EMPLOYEE, Code (PK) for COURSE & ISBN for BOOK).

Weak Entity
~~~~~~~~~~~~~~

**A weak entity** is dependent on a strong entity to ensure its existence. Unlike a strong entity, a weak entity does not have any primary key. It instead has a partial discriminator key. A weak entity is represented by a double rectangle. The relation between one strong and one weak entity is represented by a double diamond. This relationship is also known as **identifying relationship**.

**Examples for weak entities:** CHILD  entity depends on EMPLOYEE strong entity.

                                                 LOAN entity depends on CUSTOMER strong entity.

		               ROOM entity depends on HOTEL strong entity.	

**Weak entities are identified by the combination of:** A partial key of the weak entity type and the primary key of the strong entity type that is related to it.

.. odsafig:: Images/ERDSimpleExWeak.png

The below visualization demonstrates the weak entity concept.

.. inlineav:: WeakEntity ss
   :long_name: WeakEntityEx Slideshow
   :links: AV/Database/WeakEntity.css
   :scripts: AV/Database/WeakEntity.js
   :output: show
 

.. odsafig:: Images/TipsLogo.jpg

**Very Important Design Notes:**

1- Any concept is considered entity not an attribute if there is some characteristics (i.e. attributes) describing that concept even if its weak and doesn't have a unique identifier on its own.

**For Example,** Assume in a company database each employee's children should be recorded for ensurance. If only their names or their numbers needs to be saved child can be considered an **attribute** of EMPLOYEE entity. But if for every child of an employee we want to record his name, age and sex, now it isn't just a simple or even multivalued attribute but it should be considered as a CHILD entity having attributes and related to EMPLOYEE entity. 


2- The decision to consider an entity weak or strong, is dependant on if it has a unique identifier for its instances or it should depend on another strong entity for unique identification.

**For Example,** In previous CHILD entity, we can find two child instances with exactly the same characteristics (Ali, 8 years, Boy) & another (Ali, 8 years, Boy) the only difference between these CHILD instances is with whom (i.e. to which employee) they are related . In case like this CHILD entity should be considered weak.


3- Only concepts that will have more than one instance can be represented as entities.

**Note:** there is a greate difference between designing a database for a specific hotel and we need to describe entities & processes inside that hotel and between designing a database for a chain (group) of hotels.


**In the first case (single hotel database):** HOTEL entity should NOT be created as it will have only one instance of that hotel for which we are creating the database and it can't be related to the rest of entities like (ROOM, RESTAURANT, POOL, CLIENT).

**In second case (hotel's chain database):** HOTEL entity should be created to diffrentiate between hotel branches according to their location, number of rooms, each branch has different employees and so on...

Hotel entity will have number of instances equals to number of its branches and is related to all other entities like ROOM, EMPLOYEE and CLIENT.


.. inlineav:: DatabaseDesign ss
   :long_name: DatabaseDesignEx Slideshow
   :links: AV/Database/DatabaseDesign.css
   :scripts: AV/Database/DatabaseDesign.js
   :output: show


Attributes
_________________

**Attributes** are properties used to describe an entity. For example an STUDENT entity may have a Name, ID, Address, Sex, BirthDate A specific entity will have a value for each of its attributes. 

**For example** a specific student entity may have Name='Adam Ahmed', ID='123456789', Address ='731, Mohandesin, Cairo, Egypt', Sex='M', BirthDate='09-SEP-1995‘

Each attribute has a value set (or data type) associated with it – e.g. integer, string, subrange, enumerated type, …

Types Of Attributes
~~~~~~~~~~~~~~~~~~

There are five main attribute types : (**Simple**, **Composite**, **Multivalued**, **Derived**, **Key attribute**) 

**Simple Attribute**

Each entity has a single atomic value for that attribute. For example, ID or Sex.


**Composite Attribute**

The attribute may be composed of several components. For example, Address (Apt#, House#, Street, City, State, ZipCode, Country) or Name (FirstName, MiddleName, LastName). Composition may form a hierarchy where some components are themselves composite (i.e. nested composite attributes).


**Multi-valued Attribute**

An entity may have multiple values for that attribute. For example, Color of a CAR or PreviousDegrees of a STUDENT. Denoted as {Color} or {PreviousDegrees}.


**Note:**

- Entities (i.e. entity instances) with the same basic attributes are grouped or typed into an entity type. **For example,** the STUDENT entity type or the PROJECT entity type.

- An attribute of an entity type for which each entity must have a unique value is called a key attribute of the entity type. **For example,** ID of STUDENT

- A key attribute may be composite. **For example,** VehicleTagNumber is a key of the CAR entity type with components (Number, State).

- An entity type may have more than one key. **For example,** the CAR entity type may have two keys: VehicleIdentificationNumber (popularly called VIN) and VehicleTagNumber (Number, State), also known as license_plate number.

$(All$ $types$ $of$ $key$ $attributes$ $illustrated$ $in$ $detailes$ $earlier$ $in$ $the$ $previous$ $chapter)$

Relationship Types
_____________________

• **A relationship** relates two or more distinct entities with a specific meaning. **For example,** STUDENT "Adam Ahmed" Registers on the "Database" COURSE or EMPLOYEE "Sally" manages the "IT" DEPARTMENT.

• Relationships of the same type are grouped or typed into a relationship type. **For example,** the Register relationship type in which STUDENTSs and COURSEs participate, or the MANAGES relationship type in which EMPLOYEEs and DEPARTMENTs participate.

• **The degree of a relationship type** is the number of participating entity types. Both MANAGES and WORKS_At are binary relationships. (see the below figure)

**Note1:** More than one relationship type can exist with the same participating entity types. For example, MANAGES and WORKS_At are distinct relationships between EMPLOYEE and DEPARTMENT, but with different meanings and different relationship instances.

.. odsafig:: Images/TworelationsWithSameEntities.png

**Note2:** Any relationship type can have a relational attribute that describes that relation not the entity types which are related through it. **For example,** Register relationship type between STUDENT and COURSE entity types, may have a Date attribute that describes when a specific student instance registers at a specific course.


All these components will be illustrated using interactive visualizations in the subsequent sections.


The below visualization shown a very simple example for entities and attributes.

.. inlineav:: insertionsortCON ss
   :long_name: insertionsortCONEx Slideshow
   :links: AV/Database/insertionsortCON.css
   :scripts: AV/Database/insertionsortCON.js
   :output: show






