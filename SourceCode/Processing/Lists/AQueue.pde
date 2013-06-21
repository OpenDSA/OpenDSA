/* *** ODSATag: AQueue1 *** */
// Array-based queue implementation
class AQueue implements Queue {
  private static final int defaultSize = 10;
  private int maxSize;         // Maximum size of queue
  private int front;           // Index of front element
  private int rear;            // Index of rear element
  private Object listArray[];       // Array holding queue elements

  // Constructors
  AQueue(int size) {
    maxSize = size+1;          // One extra space is allocated
    rear = 0; front = 1;
    listArray = new Object[maxSize];  // Create listArray
  }

  AQueue() { this(defaultSize); }
/* *** ODSAendTag: AQueue1 *** */

  String toString() {
    StringBuffer out = new StringBuffer(length() * 4);
    for (int i=front-1; i != rear; i--) {  // THIS IS WRONG
      out.append(listArray[i]);
      out.append(" ");
    }
    return out.toString();
  }
/* *** ODSATag: AQueue2 *** */

  // Reinitialize
  public void clear() { rear = 0; front = 1; }

  // Put "it" in queue
  public void enqueue(Object it) {
    if (((rear+2) % maxSize) == front) return;  // Full
    rear = (rear+1) % maxSize; // Circular increment
    listArray[rear] = it;
  }

  // Remove and return front value
  public Object dequeue() {
    if(length() == 0) return null;
    Object it = listArray[front];
    front = (front+1) % maxSize; // Circular increment
    return it;
  }

  // Return front value
  public Object frontValue() {
    if (length() == 0) return null;
    return listArray[front];
  }

  // Return queue size
  public int length() { return ((rear+maxSize) - front + 1) % maxSize; }
}
/* *** ODSAendTag: AQueue2 *** */
