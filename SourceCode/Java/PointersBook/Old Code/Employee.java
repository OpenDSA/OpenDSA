/**
 * Employee is a class used in this tutorial to explain various pointers concepts
 */
public class Employee {
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
