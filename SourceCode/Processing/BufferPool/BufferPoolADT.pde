public interface BufferPoolADT {

  // Relate a block to a buffer, returning a pointer to a buffer object
  Buffer acquireBuffer(int block);
}
