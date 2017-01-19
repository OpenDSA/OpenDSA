/* *** ODSATag: badPointers *** */
/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
class Employee {
    String name;

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
public class badPointers {

    public static void main(String[] args) {
        Employee badPointer = null;
        // allocate the pointer, but not the pointee
        System.out.println(badPointer.getName());
        // this dereference is a serious runtime error of type NullPointerException
    }

}
/* *** ODSAendTag: badPointers *** */
