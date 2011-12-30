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

   def verifPreref(self, modRoster):
      set1 = set(self.prereq)
      set2 = set(modRoster)
      for i in self.prereq:
         if i not in modRoster:
            self.prereq.remove(i)
      if not (set1.issubset(set2)):
         self.verifPreref(modRoster)
      self.prereqNum = len(self.prereq) 
      




def modOrdering(modRoster):
   finalMod=[]
   tmpMod=[]
   q = len(modRoster)
   for k in modRoster :
      if k.prereqNum == 0:
         finalMod.append(k)
         modRoster.remove(k)
         tmpMod.append(os.path.splitext(os.path.basename(k.name))[0])
   while len(finalMod) <= q:
      for l in modRoster:
         set1 = set(l.prereq)
         set2 = set(tmpMod)
         set3 = set1.difference(set2)
         if len(set3)==0:
            finalMod.append(l)
            tmpMod.append(os.path.splitext(os.path.basename(l.name))[0])
            modRoster.remove(l)
      if(len(modRoster)==1):
         finalMod.append(modRoster.pop())
         #tmpMod.append(os.path.splitext(os.path.basename(modRoster.pop().name))[0])
            #modRoster.remove(l)
         return finalMod
   return finalMod


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


def parseDict(filename, modDir, targetDir, i):
   fls = open(modDir+'/'+filename,'r')
   data = fls.readlines()
   fls.close()
   newline =[]
   fig=0
   tab=0
   theo=0
   eq=0
   global table
   table={os.path.splitext(os.path.basename(filename))[0]:i}
   title1 =''
   for line in data:
      if '<ODSAfig \"' in line:
         for j in xrange(0,len(re.split('ODSAref "', line, re.IGNORECASE))):
            fig=fig+1
            str =  re.split('<ODSAfig "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            table[title]='%s.%s'%(i,fig)
            t='%s.%s'%(i,fig)
            line = line.replace('<ODSAfig "'+title+'" />','Figure '+t)
      if '<ODSAtable \"' in line:
         for j in xrange(0,len(re.split('ODSAtable "', line, re.IGNORECASE))):
            tab=tab+1
            str =  re.split('<ODSAtable "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            table[title]='%s.%s'%(i,tab)
      if '<ODSAtheorem \"' in line:
         for j in xrange(0,len(re.split('ODSAtheorem "', line, re.IGNORECASE))):
            theo=theo+1
            str =  re.split('<ODSAtheorem "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            table[title]='%s.%s'%(i,theo)
      if '<ODSAeq \"' in line:
         for j in xrange(0,len(re.split('ODSAeq "', line, re.IGNORECASE))):
            eq=eq+1
            str =  re.split('<ODSAeq "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            table[title]='%s.%s'%(i,eq) 
   return table

def parse(filename, modDir, targetDir, col, table):
   fls = open(modDir+'/'+filename,'r')
   data = fls.readlines()
   fls.close()
   newline =[]
   title1 =''
   modname =os.path.splitext(os.path.basename(filename))[0]
   for line in data:
      if '<ODSAsettitle>' in line:
         str =  re.split('ODSAsettitle>', line, re.IGNORECASE)[1]
         title1 = str.partition('<')[0]
         line = line.replace('<ODSAsettitle>','<h1>Module %s: '%(table[modname]))
         line = line.replace('</ODSAsettitle>','</h1>')
      if '<ODSAdef>' in line:
         str =  re.split('ODSAdef>', line, re.IGNORECASE)[1]
         title = str.partition('<')[0]
         line = line.replace('<ODSAdef>','<b>')
         line = line.replace('</ODSAdef>','</b>')
      if '<ODSAfig \"' in line:
         for j in xrange(0,len(re.split('ODSAref "', line, re.IGNORECASE))):
            str =  re.split('<ODSAfig "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            default = title
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAfig "'+title+'" />','Figure 0')
               print 'Warning: reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAfig "'+title+'" />','<a name="%s"></a> Figure %s'%(ftitle,ftitle))
      if '<ODSAtable \"' in line:
         for j in xrange(0,len(re.split('ODSAtable "', line, re.IGNORECASE))):
            str =  re.split('<ODSAtable "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            default = title
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAtable "'+title+'" />','Table 0')
               print 'Warning: reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAtable "'+title+'" />','<a name="%s"></a> Table %s'%(ftitle,ftitle))
      if '<ODSAtheorem \"' in line:
        # for j in xrange(0,len(re.split('ODSAtheorem "', line, re.IGNORECASE))):
            str =  re.split('<ODSAtheorem "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAtheorem "'+title+'" />','Theorem 0')
               print 'Warning: reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAtheorem "'+title+'" />','<a name="%s"></a> Theorem %s'%(ftitle,ftitle))
      if '<ODSAeq \"' in line:
         for j in xrange(0,len(re.split('ODSAeq "', line, re.IGNORECASE))):
            str =  re.split('<ODSAeq "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAeq "'+title+'" />','Equation 0')
               print 'Warning: reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAeq "'+title+'" />','<a name="%s"></a> Equation %s'%(ftitle,ftitle))
      if '<ODSAref \"' in line:
         for j in xrange(1,len(re.split('ODSAref "', line, re.IGNORECASE))):
            str =  re.split('<ODSAref "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            default = title
            mtitle = table.get(title,default) #table[title]
            if mtitle ==title: 
               #mtitle = title
               line = line.replace('<ODSAref "'+title+'" />',mtitle)
               print 'Warning: reference missing  <'+title +'>!'
            else:
               st='%s'%(mtitle)
               val = st.partition('.')[0]
               key=''
               for item in table.items():
                  if ('%s'%(item[1])) == val:
                     key=item[0]
               if st.partition('.')[2]=='':
                  line = line.replace('<ODSAref "'+title+'" />','<a href="'+key+'.html">%s'%(mtitle)+'</a> ')
               else:
                  line = line.replace('<ODSAref "'+title+'" />','<a href="'+key+'.html#%s">%s'%(mtitle,mtitle)+'</a> ')
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
  modRost=[]
  for fl in fileLst:
     if os.path.splitext(fl)[1][1:] == 'mod':
        modRost.append(os.path.splitext(os.path.basename(fl))[0])
        x = modPreReq(fl)
        modList.append(x)
  modList1 = sorted(modList,key = attrgetter('prereqNum'))
  for ml in modList1:
     ml.verifPreref(modRost)

  finalList =modOrdering(modList1)
 
  finalTable={}
  z =1
  for fl in finalList:
        print "Building references table "+ os.path.splitext(os.path.basename(fl.name))[0]+'...' 
        finalTable.update(parseDict(fl.name, modDir, modDest, z))
        z=z+1
  for fl in finalList:
        print "preprocessing " + os.path.splitext(os.path.basename(fl.name))[0]+'...'
        content = parse(fl.name, modDir, modDest,col,finalTable)
        try:
           nfile = open(modDest+'/'+os.path.splitext(os.path.basename(fl.name))[0]+'.html','w')
           nfile.writelines(content)
           nfile.close
        except IOError:
           print 'Error when saving html file'

if __name__ == "__main__":
   sys.exit(main(sys.argv))
