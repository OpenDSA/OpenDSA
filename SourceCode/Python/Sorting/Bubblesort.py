def sorttime(B):
  A = [randrange(1,1000) for _ in range(testsize)]  # To make it create a real A for copying
  numruns = 5

  for i in range(len(B)):
    A[i] = B[i]
  time1 = datetime.now()
  bubblesort(A)
  time2 = datetime.now()
  checkorder(A)
  print "Standard Bubble Sort: Size ", testsize, ", Time: ", millis(time2 - time1)

  for i in range(len(B)):
    A[i] = B[i]
  time1 = datetime.now()
  bubblesortcheck(A)
  time2 = datetime.now()
  checkorder(A)
  print "Swap Check Bubble Sort: Size ", testsize, ", Time: ", millis(time2 - time1)

  for i in range(len(B)):
    A[i] = B[i]
  time1 = datetime.now()
  bubblesortcheck2(A)
  time2 = datetime.now()
  checkorder(A)
  print "Swap Check Bubble Sort 2: Size ", testsize, ", Time: ", millis(time2 - time1)

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    wikipedia(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Wikipedia Bubble Sort: Size ", testsize, ", for ", numruns, " runs, Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    unwikipedia(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Wikipedia-compatible Bubble Sort without swap checking: Size ", testsize, " for ", numruns, "runs, Time: ", totaltime

# A flag check if a pass did not have any swaps, which lets us quit
def bubblesortcheck(A):
  for i in range(len(A)): # Insert i'th record
    swaps = False
    for j in range (1, len(A) - i):
      if (A[j-1] > A[j]):
        swap(A, j-1, j)
        swaps = True
    if (not swaps):
      print "Quit at ", i
      break  # Can quit early

# Modify the flag to check position of last swap taken
def bubblesortcheck2(A):
  for i in range(len(A)-1): # Insert i'th record
    lastseen = 0;
    top = len(A)
    for j in range(1, top-1):
      if (A[j - 1] > A[j]):
        swap(A, j - 1, j)
        lastseen = j - 1
    top = lastseen
    if (top == 0):
      print "Quit at ", i
      break   # Can quit early

# Wikipedia article "optimization" to only swap up to the last swap seen
def wikipedia(A):
  n = len(A) - 1;
  while (n > 0):
    newn = 0
    for i in range(n):
      # if this pair is out of order
      if (A[i] > A[i + 1]):
        swap(A, i, i + 1)
        newn = i
    n = newn

# Wikipedia article-compatible version without swap checking
def unwikipedia(A):
  n = len(A) - 1;
  while (n > 0):
    for i in range(n):
      # if this pair is out of order
      if (A[i] > A[i + 1]):
        swap(A, i, i + 1)
    n -= 1

def success():
  print "Success! (Need to define this)"

def sorttest(A):
  bubblesort(A)

#/* *** ODSATag: Bubblesort *** */
def bubblesort(A):
  for i in range (len(A)): # Insert i'th record
    for j in range(1, len(A) - i):
      if (A[j - 1] > A[j]):
        swap(A, j - 1, j)
#/* *** ODSAendTag: Bubblesort *** */
