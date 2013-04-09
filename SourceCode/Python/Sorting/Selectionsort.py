def sorttime(B):
  A = [randrange(1,1000) for _ in range(testsize)]  # To make it create a real A for copying
  numruns = 5

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    selsort(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Standard Selectionsort Sort: Size ", testsize, ", Time: ", totaltime

  totaltime = 0
  for runs in range(1, numruns):
    for i in range(len(B)):
      A[i] = B[i]
    time1 = datetime.now()
    selsortcheck(A)
    time2 = datetime.now()
    checkorder(A)
    totaltime += millis(time2-time1)
  print "Selectionsort Sort/Check swaps: Size ", testsize, ", Time: ", totaltime

# Same as selsort, but check if the swap is necessary
def selsortcheck(A):
  for i in range(len(A)):                  # Select i'th biggest record
    bigindex = 0                           # Current biggest index
    for j in range(1, len(A) - i):         # Find the max value
      if (A[j] > A[bigindex]):             # Found something bigger  
        bigindex = j                       # Remember bigger index
    if (bigindex != len(A) - i - 1):
      swap(A, bigindex, len(A) - i - 1)  # Put it into place

def success():
  print "Success! (Need to define this)"

def sorttest(A):
  selsort(A)

# /* *** ODSATag: Selectionsort *** */
def selsort(A):
  for i in range(len(A)):              # Select i'th biggest record
    bigindex = 0;                      # Current biggest index
    for j in range (1, len(A) - i):    # Find the max value
      if (A[j] > A[bigindex]):         # Found something bigger  
        bigindex = j;                  # Remember bigger index
    swap(A, bigindex, len(A) - i - 1); # Put it into place
# /* *** ODSAendTag: Selectionsort *** */
