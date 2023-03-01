Basic Operations On Relations
======================
All of these operations are considered modification operations because executing any one

of them changes the database state (i.e. values of data in records).

Integrity constraints **shouldn't be violated**  during the execution of these operations.

Operation Types
______________

INSERT tuples
~~~~~~~~~~~~

Inserting new record (tuple) into a table (relation).

During insertion operation:

- Inserted values of record's attributes must be of correct data types (i.e. of appropriate domain)

- The value of prime attribute (key attribute either is simple or composite) shouldn't be NULL.

- The values of prime attribute can't be repeated.

- The value of the foreign key (if any) must refer to an existing tuple (record) in the corresponding relation (related table).


UPDATE tuples
~~~~~~~~~~~~~~

- Is changing values of some attributes of an existing tuple in a relation.

- A lot of care and specific actions should be taken if the attribute to be updated is a PK attribute. (actions will be illustrated later in this section)

DELETE tuples
~~~~~~~~~~~~

- Is removing an existing record (tuple) from table (relation).

- To delete tuple must aleady exist in database current state.

- Specific actions should be done if the deleted record contains a primary key that relates it to other table (these actions illustrated in the below visualization.)

Actions Taken in Case of Constraints Violation
______________________________________

There are several action that can be taken in case of constraints violation to avoid data corruption. Each can choose the appropriate action according to the suitability for the application domain.

1- Cancel the operation that causes violation. 

2- Make additional updates so the violation is corrected (CASCADE Option, SETNULL Option ).

3- Inform user using ERROR message.

.. inlineav:: EforceReferentialConst ss
   :long_name: EforceReferentialConstRepresentation Slideshow
   :links: AV/Database/EforceReferentialConst.css
   :scripts: AV/Database/EforceReferentialConst.js
   :output: show
