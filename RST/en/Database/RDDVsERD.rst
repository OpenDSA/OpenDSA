How ERD and RDD are related?
==========================

As discussed in the previous chapter there are many phases in database design process. Different types of data models (i.e. conceptual, logical & physical) should be created in 
these phases each of which has its own purpose. This and the next chapter are concentrating only on the first two model types, conceptual and logical models. 
Chapter 1 here illustrates the relational data model as the most famous example for logical (implementational) data model. ER- Model as a well-known example 
for conceptual data model will be discussed in details in chapter 2.

AS the next step after database design is database implementation using DBMS, then the transformation from **high level conceptual design (ERD)** to more
detailed **logical design (RDD)** is very important step. This transformation step called **“data model mapping”**. RDD results from data model mapping 
acts as a **database schema** which is very important as an implementational model that helps database developer easily converting it to physical design used in
DBMS for database creation.

**The data model mapping** in this book discussed twice, in this chapter in a theoretical way to give the reader a background about the mapping concept and 
for the sake of feeling the difference between RDD and ERD models in a simplified way, and merged in a practical way in most of chapter 2 visualizations to 
help reader imagine how actual transition (mapping steps) done from EDR to RDD.  

This book adopts a reverse idea from the other traditional books which is illustrating later steps in design process first. The goal of this idea is to first clearly 
illustrate to the database freshers the design process output $(database$ $schema)$ that we want to reach and then how to reach this output in a sequential steps
$(e.g.$ $ creating$ $conceptual$ $ERD$ $passing$  $by$ $transforming$ $to$ $relational$ $schema)$. Learning by showing design process output first allows 
the learner to specify his aim later on in actual designing process.

This chapter first defines what is relational data model (RDD), then discusses some basic definitions related to RDD (e.g. relation, relational schema, database 
schema, domain and tuple), next it will illustrate relational integrity constraints and their types and finally demonstrates basic operations on relations and how to 
execute these processes without violating constraints. 









