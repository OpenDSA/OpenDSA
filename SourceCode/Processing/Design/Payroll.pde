/* *** ODSATag: Payroll *** */
/** A simple payroll entry with ID, name, address fields */
class Payroll {

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
  Integer getID() { return ID; }
  String getname() { return name; }
  String getaddr() { return address; }
}
/* *** ODSAendTag: Payroll *** */
