Comprehensive example
======================

How to Draw ER Diagrams
Below points show how to go about creating an ER diagram.

Identify all the entities in the system. An entity should appear only once in a particular diagram. Create rectangles for all entities and name them properly.
Identify relationships between entities. Connect them using a line and add a diamond in the middle describing the relationship.
Add attributes for entities. Give meaningful attribute names so they can be understood easily.
Sounds simple right? In a complex system, it can be a nightmare to identify relationships. This is something you’ll perfect only with practice.

**ER Diagram Best Practices**
Provide a precise and appropriate name for each entity, attribute, and relationship in the diagram. Terms that are simple and familiar always beats vague, technical-sounding words. In naming entities, remember to use singular nouns. However, adjectives may be used to distinguish entities belonging to the same class (part-time employee and full-time employee, for example). Meanwhile attribute names must be meaningful, unique, system-independent, and easily understandable.
Remove vague, redundant or unnecessary relationships between entities.
Never connect a relationship to another relationship.


Requirements of the Company (oversimplified for illustrative purposes)
The company is organized into DEPARTMENTs. Each department has a name, number and an employee who manages the department. We keep track of the start date of the department manager. 
Each department controls a number of PROJECTs. Each project has a name, number and is located at a single location.

We store each EMPLOYEE’s social security number, address, salary, sex, and birthdate. Each employee works for one department but may work on several projects. We keep track of the number of hours per week that an employee currently works on each project. We also keep track of the direct supervisor of each employee.
Each employee may have a number of DEPENDENTs. For each dependent, we keep track of their name, sex, birthdate, and relationship to employee.



.. odsafig:: Images/CompanyERDEXample.png

.. odsafig:: Images/CompanyRDDExample.png

.. odsafig:: Images/RDDExampleComments.png


