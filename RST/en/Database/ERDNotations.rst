ERD Different Notations
=======================

**Notation means:** collection of symbols used for specific data representations purposes in database design modelling. 

• There are a lot of different notations can be used for ERD modelling. 

• Two commonly used systems of notation are **Chen notation**, **Crow’s Foot notation** and an additional **min-max notation** that can be used especially for representing ERD relational constarints $(cardinality$ & $participation)$ that will be discussed later.

• Choosing which ERD notation to use is typically left up to personal preference or conventions. Here, you can find a full review about each notation symbols:


**What are the components of Chen notation?**

• Chen notation was introduced in 1976 by Peter Chen, one of the pioneers of the entity-relationship model. Chen’s notation system uses rectangles to represent entities, ellipse shapes for attributes representation and diamonds to represent relationships.

• In case of having department and employee entities for example, Chen notation uses two rectangles connected by a diamond with the nature of the relationship shown in text inside the diamond for their representation. .



**What are the components of Crow’s Foot notation?**

• Crow’s Foot notation can also be traced back to 1976, when it was introduced by Gordon Everest, and it also uses rectangles to represent entities. Relationships are represented by lines between the boxes with different shapes, or forks, at the end to show cardinality. The line can also be labeled with the nature of the relationship. Our department and employee example would again be two rectangles including entities' attributes, but with no diamond between them.

• The most recognizable characteristic of crow’s foot notation (also known as IE notation) is that it uses graphical symbols to indicate the ‘many’ side of the relationship (i.e. the cardinality constraints). The three-pronged ‘many’ symbol is also how this widely-used notation style got its name. 



**What is Min-Max notation:**

• Is a third ERD notation that can be used for structural constraints (cardinality & participation) representation.

• It uses a pair of numbers(m, n) that appear on the connecting line between the entities and their relationships. 

• The minimum number of times an entity can appear in a relation is represented by m whereas, the maximum time it is available is denoted by n. If m is 0 it signifies that the entity is participating in the relation partially, whereas, if m is either greater than or equal to 1, it denotes total participation of the entity. Note – Number of times an entity participates in a relationship is same as the number appearance of the entity in the tuples.

**Note:**  From here all the following visualizations not only represented by ERD models but also these models were mapped to the corresponding relational schema for best illustration.

These below visualization show you how to represent basic ERD elements (Entities, attributes & relations) in both (Chen & Crow's foot) notations:

.. inlineav:: ChenVsCrossFoot ss
   :long_name: ChenVsCrossFootRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFoot.css
   :scripts: AV/Database/ChenVsCrossFoot.js
   :output: show


Chen vs Crow's foot notaion For Composite Attribute:

.. inlineav:: ChenVsCrossFootAttributes ss
   :long_name: ChenVsCrossFootAttributesRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootAttributes.css
   :scripts: AV/Database/ChenVsCrossFootAttributes.js
   :output: show


Chen vs Crow's foot notaion For Multivalued Attribute:

.. inlineav:: ChenVsCrossFootMultiAtt ss
   :long_name: ChenVsCrossFootMultiAttRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootMultiAtt.css
   :scripts: AV/Database/ChenVsCrossFootMultiAtt.js
   :output: show

**Hint:** In the relational schema the multivalued attribute of the ER model converted to a separate table with a relation with its original table. The primary key of the new multivalued attribute table is composed of both the value of the attribute itself & the FK that references the original table.

.. odsafig:: Images/MultivaluesAttEX.png

Chen vs Crow's foot notaion For Derived Attribute:

.. inlineav:: ChenVsCrossFootDerivedAtt ss
   :long_name: ChenVsCrossFootDerivedAttRepresentation Slideshow
   :links: AV/Database/ChenVsCrossFootDerivedAtt.css
   :scripts: AV/Database/ChenVsCrossFootDerivedAtt.js
   :output: show