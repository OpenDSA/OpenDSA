Design Correctness And Efficiency
===============================

To develope a database application, there may be a lot of different designs for the same databse according to different designers. The issue  is which design should be choosed among all of the available designs?

The answer: is choosing the **most efficient design** not only the **effective** (right one).


.. odsafig:: Images/TipsLogo.jpg


**what are the criterias of the efficient design?**

1- Design should store/represent in the database all the data needed to achieve application domain requirements.

2- Every single piece of data / information can be retrieved particullarly in a right way. (e.g. missing a unique key for a relation makes the data unreachable).

3- The design should prevent the user from entering data that don't comply with application domain (system) requirements (i.e avoid logical errors). (illustrated in next chapter via visualizations)

4- The design should best saves memory and time. (avoid redundant data or redundant relationships)

**Note:** Applying only point 1 and 2 leads to an effective design (no physicall error------> correct system output) but they can't guarantee efficiency.
 
Applying also point 3 and 4 leads to a design with no logical errors and efficiently utilizes system resources. 

To have an efficient design the four criterias should be achieved altogether.










