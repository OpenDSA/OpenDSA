/* *** ODSATag: EmployeeClass *** */
/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
 /**
  * Employee is a class used in this tutorial to explain various references concepts
  */
 class Employee {
     String name;
     int salary;

     /**
      * class constructor to initialize name and salary fields
      * @param name: employee name
      * @param salary: employee salary
      */
     public Employee(String name, int salary)
     {
         this.name = name;
         this.salary = salary;
     }

     /**
      * getter method for the name field
      * @return the value of name field
      */
     public String getName()
     {
         return name;
     }

     /**
      * setter method for the name field
      * @param newName the value to be assigned to name field
      */
     public void setName(String newName)
     {
         name = newName;
     }
     /**
      * getter method for the salary field
      * @return the value of salary field
      */
     public int getSalary()
     {
         return salary;
     }
     /**
      * setter method for the salary field
      * @param newSalary the value to be assigned to salary field
      */
     public void setSalary(int newSalary)
     {
         salary = newSalary;
     }
 }
/* *** ODSAendTag: EmployeeClass *** */
public class PointerExample {

    public static void main(String[] args) {
/* *** ODSATag: Example *** */
        /* *** ODSATag: PointerVariables *** */
        Employee empPtr1; // Declare a reference to an Employee
        // This allocates space for the reference, but not the pointee.
        // The reference starts out as "null"
        /* *** ODSAendTag: PointerVariables *** */
        // allocate three integers and two pointers
        Employee employee1 = new Employee("John");
        /* *** ODSATag: AssigningPointee *** */
        Employee employee2 = new Employee("Alex");
        /* *** ODSAendTag: AssigningPointee *** */
        Employee empPtr2 = null;
        // Here is the state of memory at this point.
        // T1 -- Notice that the pointers start out bad.
        empPtr1 = employee1;
        // set empPtr to refer to employee1
        empPtr2 = employee2;
        // set empPtr2 to refer to employee2
        // T2 -- The pointers now have pointees
        // Now we mix things up a bit
        employee2 = empPtr2;
        // retrieve empPtr2's pointee value and put it in employee2
        empPtr2 = empPtr1;
        // change empPtr2 to share with empPtr1 (empPtr2's pointee is now employee1)
        empPtr2.setName("Sam");
        // dereference empPtr2 to set its pointee (employee1's name) to Sam (empPtr1's name is now Sam)
        // T3 -- Dereferences and assignments mix things up
/* *** ODSAendTag: Example *** */
    }
}
