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

This book adopts a reverse approach for database design process illustration, which is discussing later steps in design process first. The goal of this approach firstly is to clearly 
clarify to the database freshers the output of the design process $(database$ $schema)$ that they should reach, then illustrates the sequential steps used to achieve this output
$(e.g.$ $ creating$ $conceptual$ $ERD$ $then$  $transforming$ $it$  $to$ $relational$ $schema)$. This approach helps the learner to specify his aim later on in the actual design process.

This chapter first defines what is relational database diagram (RDD), then discusses some basic definitions related to RDD (e.g. relation, relational schema, database 
schema, domain and tuple), next it will illustrate relational integrity constraints and their types and finally demonstrates basic operations on relations and how to 
execute these processes without violating constraints. 









