import os
import sys
import re
import datetime
import shutil

from operator import itemgetter, attrgetter


class modPreReq:
   
   def __init__(self,filename):
      self.name =''
      self.description=''
      self.prereq=[]
      self.prereqNum =0
      fls = open(filename,'r')
      data = fls.readlines()
      fls.close()
      self.name = os.path.basename(filename)
      for line in data:
         if '<ODSAsettitle>' in line:
            str =  re.split('ODSAsettitle>', line, re.IGNORECASE)[1]
            self.description = str.partition('<')[0]
         if '<ODSAprereq \"' in line:
            str =  re.split('ODSAprereq "', line, re.IGNORECASE)[1]
            self.prereq.append(str.partition('"')[0])
      self.prereqNum = len(self.prereq)


def modHeader(modDir, title, collection):
   nhead =[]
   hfile = open(modDir+'Header.txt','r')
   hline = hfile.readlines()
   for line in hline:
      line = line.replace('<ODSAcollection>',collection)
      line = line.replace('<ODSAtitle>',title)
      nhead.append(line)
   return nhead

def modFooter(modDir):
   nfoot =[]
   ffile = open(modDir+'Footer.txt','r')
   fline = ffile.readlines()
   now = datetime.datetime.now()
   for line in fline:
      line = line.replace('<ODSAdate>',now.strftime("%Y-%m-%d"))
      line = line.replace('<ODSAtime>',now.strftime("%H:%M"))
      nfoot.append(line)
   return nfoot


def modTitle(modName, modDir=''):
   try:
      fls = open(modDir+modName+'.mod', 'r')
      data = fls.readlines()
      title = ''
      for line in data:
         if '<ODSAsettitle>' in line:
            str =  re.split('ODSAsettitle>', line, re.IGNORECASE)[1]
            title = str.partition('<')[0]
      fls.close()
      return title
   except IOError:
      print 'Error no file for module <'+modName +'>!'
      title = modName
      return title

def parse(filename, modDir, targetDir, col):
   fls = open(filename,'r')
   data = fls.readlines()
   fls.close()
   newline =[]
   title1 =''
   for line in data:
      if '<ODSAsettitle>' in line:
         str =  re.split('ODSAsettitle>', line, re.IGNORECASE)[1]
         title1 = str.partition('<')[0]
         line = line.replace('<ODSAsettitle>'+title1+'</ODSAsettitle>','<h1>'+title1+'</h1>')
      if '<ODSAdef>' in line:
         str =  re.split('ODSAdef>', line, re.IGNORECASE)[1]
         title = str.partition('<')[0]
         line = line.replace('<ODSAdef>'+title+'</ODSAdef>','<b>'+title+'</b>')
     if '<ODSAref \"' in line:
         str =  re.split('ODSAref "', line, re.IGNORECASE)[1]
         title = str.partition('"')[0]
         mtitle = modTitle(title, modDir)
         if mtitle =='': 
            mtitle = title
            line = line.replace('<ODSAref "'+title+'" />',mtitle)
         else:
            line = line.replace('<ODSAref "'+title+'" />','<a href="'+title+'.html">'+title+'.'+ mtitle+'</a>')
      newline.append(line)
   head = modHeader(modDir,title1, col)
   foot = modFooter(modDir)
   head.extend(newline)
   head.extend(foot)
   return  head      
     




         


def control(argv):
   if len(argv) < 3:
      sys.stderr.write("Usage: %s [-c=<collection name>] <module directory>  <destination directory>" % (argv[0],))
      return 1
   if len(argv)==3:
      if not os.path.exists(argv[1]):
         sys.stderr.write("ERROR: <module directory> %s does not exist! " % (argv[1],))
      if not os.path.exists(argv[2]):
         os.mkdir(argv[2])
   if len(argv)==4:
      if not os.path.exists(argv[2]):
         sys.stderr.write("ERROR: <module directory> %s does not exist! " % (argv[2],))
      if not os.path.exists(argv[3]):
         os.mkdir(argv[3])
   
def enumFile(folder):
   filelist = []
   for filename in os.listdir(folder):
     filelist.append(folder+filename)
   return filelist

def main(argv):
  control(argv)
  col=''
  modDir=''
  modDest=''
  if len(argv)==3:
     col='Collection1'
     modDir=argv[1]
     modDest=argv[2]
  if len(argv)==4:
     col=argv[1].partition('=')[2]
     modDir=argv[2]
     modDest=argv[3]

  fileLst =  enumFile(modDir)
  modList =[]
  for fl in fileLst:
     if os.path.splitext(fl)[1][1:] == 'mod':
        x = modPreReq(fl)
        modList.append(x)
  modList1 = sorted(modList,key = attrgetter('prereqNum'))
  #for ml in modList1:
  #   print ml.name
  #   print ml.prereq
 
  for fl in fileLst:
     if os.path.splitext(fl)[1][1:] == 'mod':
        print "preprocessing " + fl
        content = parse(fl, modDir, modDest,col)
        try:
           nfile = open(modDest+'/'+os.path.splitext(os.path.basename(fl))[0]+'.html','w')
           nfile.writelines(content)
           nfile.close
        except IOError:
           print 'Error when saving html file'

if __name__ == "__main__":
   sys.exit(main(sys.argv))
