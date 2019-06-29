// Improved ADT for buffer pools using the buffer-passing style.
// Most user functionality is in the buffer class, not the buffer pool itself.

// A single buffer in the buffer pool
public interface BufferADT {
  // Read the associated block from disk (if necessary) and return a
  // pointer to the data
  public byte[] readBlock();

  // Return a pointer to the buffer's data array (without reading from disk)
  public byte[] getDataPointer();

  // Flag buffer's contents as having changed, so that flushing the
  // block will write it back to disk
  public void markDirty();

  // Release the block's access to this buffer. Further accesses to
  // this buffer are illegal
  public void releaseBuffer();
}
