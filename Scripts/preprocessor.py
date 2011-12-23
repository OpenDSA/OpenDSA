import os
import sys
import re

def modTitle(modName, modDir=''):
   fls = open(modDir+modName+'.mod', 'r')
   data = fls.readlines()
   title = ''
   for line in data:
      if '<ODSAtitle \"' in line:
         str =  re.split('ODSAtitle "', line, flags=re.IGNORECASE)[1]
         title = str.partition('"')[0]
   fls.close()
   return title

def parse(filename, modDir='', targetDir=''):
   fls = open(filename,'r')
   data = fls.readlines()
   newline =[]
   for line in data:
      if '<ODSAtitle \"' in line:
         str =  re.split('ODSAtitle "', line, flags=re.IGNORECASE)[1]
         title = str.partition('"')[0]
         line = line.replace('<ODSAtitle "'+title+'">','<title>'+title+'</title>') 
      if '<ODSAref \"' in line:
         str =  re.split('ODSAref "', line, flags=re.IGNORECASE)[1]
         title = str.partition('"')[0]
         line = line.replace('<ODSAref "'+title+'">','<a href="'+title+'.html">'+title+'.'+ modTitle(title, modDir)+'</a>')
      newline.append(line)
   fls.close()
   return newline      
     




         


def control(argv):
   if len(argv) < 3:
      sys.stderr.write("Usage: %s <module directory> <destination directory>" % (argv[0],))
      return 1
   
   if not os.path.exists(argv[1]):
      sys.stderr.write("ERROR: <module directory> %s does not exist! " % (argv[1],))
   if not os.path.exists(argv[2]):
      os.mkdir(argv[2])

def enumFile(folder):
   filelist = []
   for filename in os.listdir(folder):
     filelist.append(folder+filename)
   return filelist

def main(argv):
  control(argv)
  fileLst =  enumFile(argv[1])
  for fl in fileLst:
     if os.path.splitext(fl)[1][1:] == 'mod':
        content = parse(fl, argv[1], argv[2])
        try:
           nfile = open(argv[2]+'/'+os.path.splitext(os.path.basename(fl))[0]+'.html','w')
           nfile.writelines(content)
           nfile.close
        except IOError:
           print 'Error when saving html file'

if __name__ == "__main__":
   sys.exit(main(sys.argv))
