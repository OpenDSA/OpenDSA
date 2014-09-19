def sorttime(B):
  A = [randrange(1,1000) for _ in range(testsize)]  # To make it create a real A for copying
  numruns = 5

  print "Range ", range(0, numruns)

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    inssort(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Standard Insertion Sort: Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    inssort2(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Standard Insertion Sort, no swap function: Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    inssortshift(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Shifting Insertion Sort: Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    inssortshift(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Shifting Insertion Sort 2 (!=): Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    myinssort(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Chris Dusold's Insertion Sort: Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    inssortshiftpy(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Python'y Insertion Sort with shift: Size ", testsize, ", Time: ", totaltime

# Instead of swapping, "shift" the values down the array
# /* *** ODSATag: Insertionsort shift *** */
def inssortshift(A):
  for i in range(1, len(A)): # Insert i'th record
    temp = A[i]
    j=i
    while (j > 0) and (temp < A[j-1]):
      A[j] = A[j-1]
      j -= 1
    A[j] = temp
# /* *** ODSAendTag: Insertionsort shift *** */


# Same as inssortshift, but try != instead of < for the zero test
# This will only matter to JavaScript
def inssortshift2(A):
  for i in range(1, len(A)-1): # Insert i'th record
    temp = A[i]
    j=i
    while (j != 0) and (temp < A[j-1]):
      A[j] = A[j-1]
      j -= 1
    A[j] = temp

# Same as standard insertion sort, except get rid of the swap
# function call
def inssort2(A):
  for i  in range(1, len(A)-1):  # Insert i'th record
    j = i;
    while (j != 0) and (A[j] < A[j-1]):
      temp = A[j]
      A[j] = A[j-1]
      A[j-1] = temp
      j -= 1

def success():
  print "Success! (Need to define this)"

def sorttest(A):
  inssort(A)

# /* *** ODSATag: Insertionsort *** */
def inssort(A):
  for i  in range(len(A)):  # Insert i'th record
    j = i;
    while (j != 0) and (A[j] < A[j-1]):
      swap(A, j, j - 1)
      j -= 1
# /* *** ODSAendTag: Insertionsort *** */

# Chris Dusold's attempt to "pythonize" the sort
def myinssort(A):
  for i  in range(len(A)):  # Insert i'th record
    for j in range(i,0,-1):
      if (A[j] >= A[j-1]):
        break
      A[j],A[j-1]=A[j-1],A[j]

# Instead of swapping, "shift" the values down the array
# Try to make it more "native" python
# SOLUTION BELOW NOT WORKING
def inssortshiftpy(A):
  for i in range(1, len(A)-1): # Insert i'th record
    temp = A[i]
    for j in range(i,0,-1):
      if (temp >= A[j-1]):
        break
      A[j] = A[j-1]
    A[j-1] = temp
# SOLUTION ABOVE NOT WORKING
