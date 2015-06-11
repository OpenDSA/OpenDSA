// Array-based queue implementation
/* *** ODSATag: AQueue1 *** */
class AQueue<E> implements Queue<E> {
  private E queueArray[];      // Array holding queue elements
  private static final int defaultSize = 10;
  private int maxSize;         // Maximum size of queue
  private int front;           // Index of front element
  private int rear;            // Index of rear element

  // Constructors
  @SuppressWarnings("unchecked") // Generic array allocation
  AQueue(int size) {
    maxSize = size+1;          // One extra space is allocated
    rear = 0; front = 1;
    queueArray = (E[])new Object[maxSize];  // Create queueArray
  }
  AQueue() { this(defaultSize); }
/* *** ODSAendTag: AQueue1 *** */

  public String toString() {
    StringBuffer out = new StringBuffer(length() * 4);
    for (int i=front; i != (rear+1)%maxSize; i++) {
      i = i % maxSize;                 // Adjust for wrap-around
      out.append(queueArray[i]);
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: AQueue2 *** */

  // Reinitialize
  public void clear() { rear = 0; front = 1; }

  // Put "it" in queue
  public boolean enqueue(E it) {
    if (((rear+2) % maxSize) == front) return false;  // Full
    rear = (rear+1) % maxSize; // Circular increment
    queueArray[rear] = it;
    return true;
  }

  // Remove and return front value
  public E dequeue() {
    if(length() == 0) return null;
    E it = queueArray[front];
    front = (front+1) % maxSize; // Circular increment
    return it;
  }

  // Return front value
  public E frontValue() {
    if (length() == 0) return null;
    return queueArray[front];
  }

  // Return queue size
  public int length() { return ((rear+maxSize) - front + 1) % maxSize; }
}
/* *** ODSAendTag: AQueue2 *** */
