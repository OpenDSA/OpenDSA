/* *** ODSATag: Payroll *** */
/** A simple payroll entry with ID, name, address fields */
public class Payroll {

  private Integer ID;
  private String name;
  private String address;

  /** Constructor */
  Payroll(int inID, String inname, String inaddr) {
    ID = inID;
    name = inname;
    address = inaddr;
  }

  /** Data member access functions */
  public Integer getID() { return ID; }
  public String getname() { return name; }
  public String getaddr() { return address; }
}
/* *** ODSAendTag: Payroll *** */
