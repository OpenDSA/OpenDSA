Comprehensive example
======================

**How to Draw ER Diagrams** ? Follow the below points to know how to go about creating an ER.

• Identify all the entities in the system.

•  An entity should appear only once in a particular diagram. 

• Choose a specific notation to follow. (e.g. Chen notation used here)

• Create rectangles for all entities and name them properly.

• Identify relationships between entities. Connect them using a line and add a diamond in the middle describing the relationship.

• Never connect a relationship to another relationship.

• Add attributes for entities. Give meaningful attribute names so they can be understood easily.

• Remove vague, redundant or unnecessary relationships between entities.

• Again, Provide a precise and appropriate name for each entity, attribute, and relationship in the diagram. Terms that are simple and familiar always beats vague, technical-sounding words. In naming entities, remember to use singular nouns. However, adjectives may be used to distinguish entities belonging to the same class (part-time employee and full-time employee, for example). Meanwhile attribute names must be meaningful, unique, system-independent, and easily understandable.

**Sounds simple right?** In a complex system, it can be **a nightmare** to identify relationships. This is something you’ll perfect only with practice.


Try solving the given example following the above steps for ERD creation. Try to find the corresponding relational schema by appling ERD/RDD mapping rules. Finally compare your answer with the below solution to know its pros and cons.

**Tip:** Don't try to see the given solution before trying to solve the problem alone.

**Company Databaes Example:** Requirements are oversimplified for illustrative purposes

The company is organized into DEPARTMENTs. Each department has a unique name, phone (each department may has more than one phone number), and an employee who manages the department. We keep track of the start date of the department manager. 
Each department controls a number of PROJECTs. Each project has a name, Duedate to be finished. Projects may have same names but in different locations. There are suppliers that supply specific parts for each project. The price of each part supplied for specific project by specific supplier should be stored.

Each PART has name and identified by its no.. SUPPLIERs have Ids, names and speciallity.

We store each EMPLOYEE’s social security number, name, address, salary, and birthdate. Employee address should specify city, street & building. Each employee works for one department but may work on several projects. We keep track of the number of hours per week that an employee currently works on each project. We also keep track of the direct supervisor of each employee.
Each employee may have a number of children. For each child, we keep track of their name, sex, age, and relationship to employee.



**Company Database ERD:**

.. odsafig:: Images/CompanyERDEXample.png

**Company's Relational Schema Diagram:**

**Hint:** relational schema diagram is supported by some comments & analysis below for better understanding.

.. odsafig:: Images/CompanyRDDExample.png



.. odsafig:: Images/RDDExampleComments.png


