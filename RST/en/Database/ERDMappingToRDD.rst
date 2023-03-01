ERD Mapping To Relational Data Model
=================================

• As illustrated before database design process passes through three phases first is conceptual modeling (ER diagram), then logical modelling (relational schema) and finally physical modelling (converting relation schema to physical tables).

• The next sections are devoted for demonstrating how to transform high level ER-design to more detailed relational schema design model and in most cases  we also rely on table design with real data examples to facilitate learning process.

• The reader will notice that all visualization through out the next sections mix all the three design level models for the sake of clarity and deep understanding.

The below figure shows a simple database example modeled with three different diagrams (ERD, RDD & Data Table)

.. odsafig:: Images/ErdvsRDDvsTable.png

**How do you convert an entity-relationship diagram to a relational schema?**

Simply by breaking down entities, attributes, and relationships into tables (relations), columns, fields, and keys.

The below table shows the basic ERD elements and their corresponding relational schema elements.

.. odsafig:: Images/ERDRDDMapping.png