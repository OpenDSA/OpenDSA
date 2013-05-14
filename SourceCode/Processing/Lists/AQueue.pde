/* *** ODSATag: AQueue *** */
/** Array-based queue implementation */
class AQueue<E> implements Queue<E> {

private static final int defaultSize = 10;
private int maxSize;         // Maximum size of queue
private int front;           // Index of front element
private int rear;            // Index of rear element
private E[] listArray;       // Array holding queue elements

/** Constructors */
AQueue() { this(defaultSize); }
@SuppressWarnings("unchecked")  // For generic array
AQueue(int size) {
  maxSize = size+1;          // One extra space is allocated
  rear = 0; front = 1;
  listArray = (E[])new Object[maxSize];  // Create listArray
}

/** Reinitialize */
public void clear()
{ rear = 0; front = 1; }

/** Put "it" in queue */
public void enqueue(E it) {
  assert ((rear+2) % maxSize) != front : "Queue is full";
  rear = (rear+1) % maxSize; // Circular increment
  listArray[rear] = it;
}

/** Remove and return front value */
public E dequeue() {
  assert length() != 0 : "Queue is empty";
  E it = listArray[front];
  front = (front+1) % maxSize; // Circular increment
  return it;
}

/** @return Front value */
public E frontValue() {
  assert length() != 0 : "Queue is empty";
  return listArray[front];
}

/** @return Queue size */
public int length()
{ return ((rear+maxSize) - front + 1) % maxSize; }
/* *** ODSAendTag: AQueue *** */
