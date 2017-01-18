/* *** ODSATag: EmployeeClass *** */
/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
class Employee {
    String name;

    /**
     * class default constructor
     */
    public Employee()
    {
        this.name = "";
    }
    /**
     * class constructor to initialize the name variable
     * @param name: employee name
     */
    public Employee(String name)
    {
        this.name = name;
    }

    /**
     * getter method for the name variable
     * @return the value of name variable
     */
    public String getName()
    {
        return name;
    }

    /**
     * setter method for the name variable
     * @param newName the value to be assigned to name variable
     */
    public void setName(String newName)
    {
        name = newName;
    }
}
/* *** ODSAendTag: EmployeeClass *** */
public class PointerExample {

    public static void main(String[] args) {
/* *** ODSATag: Example *** */
        /* *** ODSATag: PointerVariables *** */
        Employee empPtr1;// Declare the Employee (reference to Employee) variable empPtr.
        // This allocates space for the pointer, but not the pointee.
        // The pointer starts out with "null"
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
