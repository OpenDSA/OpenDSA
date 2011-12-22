import os
import sys

def main(argv):
   if len(argv) < 3:
      sys.stderr.write("Usage: %s <module directory> <destination directory>" % (argv[0],))
      return 1
   
   if not os.path.exists(argv[1]):
      sys.stderr.write("ERROR: <module directory> %s does not exist! " % (argv[1],))
   if not os.path.exists(argv[2]):
      sys.stderr.write("ERROR: <destination directory> %s does not exist! " % (argv[2],))

   for filename in os.listdir(argv[1]):
    print filename

if __name__ == "__main__":
   sys.exit(main(sys.argv))
