Relational Integrity Constraints
=======================
What Is Meant By Constraints?
_________________________

Are conditions that must hold on all valid relation instances. These conditions maintain database correctness by preventing errors and inconsistencies.


Advantage of Using Integrity Constraints
_________________________________

1- They ensure the **accuracy** of data by preventing invalid data from being entered into the database.

2- They maintain the **consistency** of data by ensuring that data is consistent across different tables and fields.

These advantages leads to a reliable database design.

Types of Integrity Constraints
_________________________

Key Constraints (Super key, Candidate key, Primary key, Secondary Foreign key, Surrogate key)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1- These are called **uniqueness constraints** since it ensures that every tuple in the relation should be unique.

2- A relation can have multiple keys or candidate keys(minimal superkey), out of which we choose one of the keys as primary key, we don’t have any restriction 

on choosing the primary key out of candidate keys, but it is suggested to go with the candidate key with less number of attributes. All different key types are illustrated

in the below table, followed by diagram representing each type.

.. odsafig:: Images/KeysTypes.png

Examples to explain different key types:

.. odsafig:: Images/PKCKSKDrawing.png

.. odsafig:: Images/PKvsCK.png

.. odsafig:: Images/SuperKey.png

.. odsafig:: Images/SKvsCK.png

.. odsafig:: Images/FK.png

.. odsafig:: Images/CompKey.png

.. odsafig:: Images/surroKey.png


Entity Integrity Constraints 
~~~~~~~~~~~~~~~~~~~~

1- The entity integrity constraint states that: for each relation (i.e. entity in real world, e.g. student entity in faculty database)  primary key value can't be null or 

can't be repeated. This is because the primary key value is used to identify individual  rows in relation and if the primary key has a null or repeated value, then it

can't be used to identify those rows. 

2- Entity Integrity Constraints is applied **per single entity (relation)** , each entity should have a primary key.

**Note:** Other attributes in any relation (table) may also be constrained to disallow null values, even though they are not members of the primary key. 
(e.g. student name in student table can't be null but table may have more that one student with the same name).


Referential Integrity Constraints 
~~~~~~~~~~~~~~~~~~~~~~~~

1- The Referential integrity constraints is specified between two relations (not on single relation as in case of entity integrity constraint) or tables and used to 

maintain the consistency among the tuples in two relations.

2- This constraint is enforced through foreign key, when an attribute in the foreign key of relation R1 (tabel1) have the same domain(s) (domain: set of values 

for the attribute) as the primary key of relation R2 (table 2), then the foreign key of R1 is said to reference or refer to the primary key of relation R2.

3- The values of the foreign key in a tuple of relation R1 can either take the values of the primary key for some tuple in relation R2, or can take NULL values, 

but can’t be empty.

.. odsafig:: Images/RefIntegrityConstraints.png

**Note:** Referential integrity constraints must be maintained in all relational operations (database transactions). 

Appropriate specific actions should be taken if any opration tries to violate theses constraints. those actions will be discussed later in this chapter.


Semantic Integrity  Constraints 
~~~~~~~~~~~~~~~~~~~~~~~~

This type of constraints based on application semantics and can't be expressed by the model.

For Example: the maximum number of hours/month allowed for each employee to work is 85 hours.

