ERD Different Notations
=======================

An entity relationship diagram (ERD) is a diagram that defines the structure of database instances. Choosing which notation to use is typically left up to personal preference or conventions. Here, you can find 

some useful information about each notation:

Continuing our trip through different ERD notations, let’s review the Chen ERD notation.

Peter Chen, who developed entity-relationship modeling and published his work in 1976, was one of the pioneers of using the entity relationship concepts in software and information system modeling and design.
 
The Chen ERD notation is still used and is considered to present a more detailed way of representing entities and relationships.

The most recognizable characteristic of crow’s foot notation (also known as IE notation) is that it uses graphical symbols to indicate the ‘many’ side of the relationship. The three-pronged ‘many’ symbol is also 

how this widely-used notation style got its name. 

Cardinality is represented in an entity-relationship diagram by using notation to clarify the relationships between entities. Two commonly used systems of notation 

are Chen notation and Crow’s Foot notation. But what are the differences between them and how can you decide which is right for you? 

**What are the components of Chen notation?**

Chen notation was introduced in 1976 by Peter Chen, one of the pioneers of the entity-relationship model. Chen’s notation system uses rectangles to represent entities and diamonds to represent relationships,

 so our department and employee example from above would be two rectangles connected by a diamond with the nature of the relationship shown in text inside the diamond.

**What are the components of Crow’s Foot notation?**

Crow’s Foot notation can also be traced back to 1976, when it was introduced by Gordon Everest, and it also uses rectangles to represent entities. Relationships are represented 

by lines between the boxes with different shapes, or forks, at the end to show cardinality. The line can also be labeled with the nature of the relationship. Our department and employee

example would again be two rectangles, but with no diamond between them.

Cardinality is shown in this case by the “crow’s foot” fork on the employee side of the relationship. This indicates that there can be many employees.

Cardinality is represented in an entity-relationship diagram by using notation to clarify the relationships between entities. Two commonly used systems of notation are Chen notation and Crow’s Foot notation. But what are the differences between them and how can you decide which is right for you? Join us for a detailed comparison between Chen notation and Crow’s Foot notation.

**What is min-max notation:**

The Structural constraints are represented by Min-Max notation. This is a pair of numbers(m, n) that appear on the connecting line between the entities and their relationships. 

The minimum number of times an entity can appear in a relation is represented by m whereas, the maximum time it is available is denoted by n. If m is 0 it signifies that the entity is participating in the relation partially, whereas, if m is either greater than or equal to 1, it denotes total participation of the entity. Note – Number of times an entity participates in a relationship is same as the number appearance of the entity in the tuples.

.. inlineav:: ChenVsCrossFoot ss
   :long_name: ChenVsCrossFootRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFoot.css
   :scripts: AV/Database/ChenVsCrossFoot.js
   :output: show

.. inlineav:: ChenVsCrossFootAttributes ss
   :long_name: ChenVsCrossFootAttributesRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootAttributes.css
   :scripts: AV/Database/ChenVsCrossFootAttributes.js
   :output: show

.. inlineav:: ChenVsCrossFootMultiAtt ss
   :long_name: ChenVsCrossFootMultiAttRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootMultiAtt.css
   :scripts: AV/Database/ChenVsCrossFootMultiAtt.js
   :output: show


.. inlineav:: ChenVsCrossFootDerivedAtt ss
   :long_name: ChenVsCrossFootDerivedAttRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootDerivedAtt.css
   :scripts: AV/Database/ChenVsCrossFootDerivedAtt.js
   :output: show