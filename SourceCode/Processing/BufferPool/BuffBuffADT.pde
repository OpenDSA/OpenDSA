// ADT for buffer pools using the buffer-passing style
public interface BufferPoolADT {
  // Return pointer to the requested block
  public byte[] getblock(int block);

  // Set the dirty bit for the buffer holding "block"
  public void dirtyblock(int block);

  // Tell the size of a buffer
  public int blocksize();
};
