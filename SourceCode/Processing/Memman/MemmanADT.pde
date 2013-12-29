// Memory Manager abstract class
interface MemManager {
  // Store a record and return a handle to it
  public MemHandle insert(byte[] info);

  // Release the space associated with a record
  public void release(MemHandle h);

  // Get back a copy of a stored record
  public byte[] getRecord(MemHandle h);
}

