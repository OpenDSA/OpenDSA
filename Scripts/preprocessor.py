import os
import sys
import re
import datetime
import shutil
import subprocess
import fnmatch

from operator import itemgetter, attrgetter
from xml.dom.minidom import parse, parseString

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
         if '<ODSAtitle>' in line:
            str =  re.split('ODSAtitle>', line, re.IGNORECASE)[1]
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

def modFooter(modDir, title,author,year):
   nfoot =[]
   ffile = open(modDir+'Footer.txt','r')
   fline = ffile.readlines()
   now = datetime.datetime.now()
   for line in fline:
      line = line.replace('<ODSAtitle>',title)
      line = line.replace('<ODSAgetyear/>',str(year))
      line = line.replace('<ODSAgetauthor/>',author)
      line = line.replace('<ODSAdate>',now.strftime("%Y-%m-%d"))
      line = line.replace('<ODSAtime>',now.strftime("%H:%M"))
      nfoot.append(line)
   return nfoot




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

def parseMod(filename, modDir, targetDir, col, table):
   fls = open(modDir+'/'+filename,'r')
   data = fls.readlines()
   fls.close()
   newline =[]
   glossary=[]
   title1 =''
   author=''
   year= datetime.datetime.now().year
   b=1
   modname =os.path.splitext(os.path.basename(filename))[0]
   start=0
   end=0
   cpt=-1
   line1=''
   var1=''
   eqlabel=''
   inline='yes'
   nextline=0
   eq_start=0
   eq_line=''
   for line in data:
      cpt=cpt+1
      if '<ODSAtitle>' in line:
         str =  re.split('ODSAtitle>', line, re.IGNORECASE)[1]
         title1 = str.partition('<')[0]
         line = line.replace('<ODSAtitle>','<h1>Module %s: '%(table[modname]))
         line = line.replace('</ODSAtitle>','</h1>')
      if '<ODSAauthor>' in line:
         str =  re.split('ODSAauthor>', line, re.IGNORECASE)[1]
         author = str.partition('<')[0]
         line ='<!-- '+ line +' -->'
         #line = line.replace('</ODSAtitle>','</h1>')
      if '<ODSAyear>' in line:
         str =  re.split('ODSAyear>', line, re.IGNORECASE)[1]
         year = str.partition('<')[0]
         line ='<!-- '+ line +' -->'
      if '<ODSAif \"' in line:
         start = cpt #index
         var1=line
      if '</ODSAif>' in line:
         end = cpt 
         for v in range(start,end+1):
            line1=line1+remove_eol(data[v])
         line1=line1+'\n'
         start = newline.index(var1)
         stri =  re.split('ODSAif \"', line1, re.IGNORECASE)[1]
         title = stri.partition('"')[0]
         text = stri.partition('</ODSAif>')[0]
         default = title
         ftitle = table.get(title,default) #table[title]
         if ftitle ==title:
               line1='' #line1.replace('<ODSAif "','')
               print 'INFO: Module <'+title+'> not present in collection!'
         else:
               if '<ODSAif "'+title+'">' in line1:
                  line1 = line1[len('<ODSAif "'+title+'">'):]
               #line1 = line1.replace('<ODSAif "'+title+'">','')
               line1 = line1.replace('</ODSAif>','')
         line = line1
         newline[start]=line1
         for v in range(start,len(newline)):
            newline.pop()
         line = line1
         line1=''
         start=0
         end=0
      if '<dfn>' in line:
         str =  re.split('<dfn>', line, re.IGNORECASE)[1]
         title = str.partition('<')[0]
         line = line.replace('<dfn>','<b>')
         v="def:%s.%s"%(table[modname],b)
         line = line.replace('</dfn>','</b><a name="'+v+'"></a>')
         glossary.append(title+' <a href="'+modname+'.html#'+v+'">'+v+'</a><br />\n')
         b=b+1
         try:
           gfile = open('glossary.html.tmp','a')
           gfile.writelines(glossary)
           gfile.close
         except IOError:
           print 'ERROR: When saving temporary glossary file'
      if '<ODSAfig \"' in line:
         for j in xrange(0,len(re.split('ODSAref "', line, re.IGNORECASE))):
            str =  re.split('<ODSAfig "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            default = title
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAfig "'+title+'" />','Figure 0')
               print 'WARNING: Reference missing  <'+title +'>!'
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
               print 'WARNING: Reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAtable "'+title+'" />','<a name="%s"></a> Table %s'%(ftitle,ftitle))
      if '<ODSAtheorem \"' in line:
            str =  re.split('<ODSAtheorem "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            ftitle = table.get(title,default) #table[title]
            if ftitle ==title:
               line = line.replace('<ODSAtheorem "'+title+'" />','Theorem 0')
               print 'WARNING: Reference missing  <'+title +'>!'
            else:
               line = line.replace('<ODSAtheorem "'+title+'" />','<a name="%s"></a> Theorem %s'%(ftitle,ftitle))

      eq_end=0

      if '<ODSAeq' in line:
            eq_start = cpt
            eq_line = line
      if '</ODSAeq>' in line:
            eq_end = cpt
            for v in range(eq_start,eq_end+1):
               line1=line1+remove_eol(data[v])
            line1=line1+'\n'
            if '<ODSAeq'not in line:
               eq_start = newline.index(eq_line)
            if '<ODSAeq>' in line1:
               restline= line1.partition('<ODSAeq>')[2]
               code = restline.partition('</ODSAeq>')[0]
               code1=code
               nextline= data.index(line1)
               if code=='' or code=='\n':
                  print 'WARNING: LaTeX code missing %s'%nextline
               else:
                  if which('mathtex')==None:
                     print 'MathTeX image from http://www.forkosh.com/'
                     print 'input expression: '+code1
                     line1 = line1.replace(code, '<img src="http://www.forkosh.com/mathtex.cgi?'+code1+'" alt="" border=0 align="middle">.')
                  else:
                     cmd = ['mathtex', code,'-o', targetDir+'/Images/eq%s-%s'%(table[modname],nextline)]
                     p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
                     print 'mathTeX> input expression: '+code
                     for ne in p.stdout:
                         if  ('output image file' in ne):
                            print ne
                            p.wait()
                  #print p.returncode
                     line1 = line1.replace(code, '<img src="Images/eq%s-%s.gif" alt="" border=0 align="middle">.'%(table[modname],nextline))
               line1 = line1.replace('<ODSAeq>','')
            if '<ODSAeq \"' in line1:
               inline='no'
               restline = line1.partition('\">')[2]
               code = restline.partition('</ODSAeq>')[0]
               code1=code
               nextline= data.index(line)
               if which('mathtex')==None:
                  print 'MathTeX image from http://www.forkosh.com/'
                  print 'input expression: '+code1
                  line1 = line1.replace(code, '<img src="http://www.forkosh.com/mathtex.cgi?'+code1+'" alt="" border=0 align="middle">.')        
               else:
                  cmd = ['mathtex', code,'-o', targetDir+'/Images/eq%s-%s'%(table[modname],nextline)]
                  p = subprocess.Popen(cmd, stdout=subprocess.PIPE)
                  print 'mathTeX> input expression: '+code
                  for ne in p.stdout:
                      if  ('output image file' in ne):
                         print ne
                         p.wait()
           # print p.returncode
                  line1 = line1.replace(code, '<img src="Images/eq%s-%s.gif" alt="" border=0 align="middle">.'%(table[modname],nextline))
            if '<ODSAeq \"display\"' in line1:
               line1 = line1.replace('<ODSAeq \"display\">','<br /><center>')
            if '<ODSAeq \"' in line1:
               str =  re.split('<ODSAeq "', line1, re.IGNORECASE)[1]
               title = str.partition('"')[0]
               ftitle = table.get(title,default) #table[title]
               if ftitle ==title:
                  line1 = line1.replace('<ODSAeq "'+title+'">','<br /><center>')
                  print 'WARNING: Reference missing  <'+title +'>!'
               else:
                  line1 = line1.replace('<ODSAeq "'+title+'">','<a name="%s"></a><table class="eq"><tr><td><center>')
                  eqlabel = '%s'%(ftitle)


         #if '</ODSAeq>' in line:
            for j in xrange(0,len(re.split('</ODSAeq>', line1, re.IGNORECASE))):
               if inline =='yes':
                  line1 = line1.replace('</ODSAeq>','')
               else:
                  if eqlabel=='':
                     line1 = line1.replace('</ODSAeq>','<br /></center>')
                  else:
                     line1 = line1.replace('</ODSAeq>','</center> </td><th>('+eqlabel+')</th></tr></table>')
                     eqlabel=''
                  inline='no'
            if '<ODSAeq'not in line:
               newline[eq_start]=line1
               for v in range(eq_start,len(newline)):
                  newline.pop()
            line = line1
            line1=''
            eq_start=0
            eq_end=0

      




      if '<ODSAembed' in line:
         emval= re.split('\">', line, re.IGNORECASE)[0]
         emval2 = re.split(' ', emval, re.IGNORECASE)

         if '\"hide\"' in line and len(emval2)==2:
            tr =  re.split('<ODSAembed "hide">', line, re.IGNORECASE)[1]
            address = tr.partition('</ODSAembed>')[0]
            if 'http://' in address:
               line = line.replace('<ODSAembed "hide">',show_code('example%s'%cpt,'example%s'%cpt, 'Exercise' )+hide_code('example%s'%cpt, 'example%s'%cpt, 'Exercise')+embedcode(address))
               line = line.replace(address,'')
               line = line.replace('</ODSAembed>','')
            else:
               avfile = os.path.basename(address)
               res = embedlocal(address)
               name=res[0]+'-'+res[1]+'-'+res[2]
               nameh= name+'-hide' 
               line = line.replace('<ODSAembed "hide">'+address,show_code('example%s'%cpt, name)+hide_code('example%s'%cpt, nameh)) 
               line = line.replace('</ODSAembed>','')
      #in case the embed has a label
         elif '\"hide\"' in line and len(emval2)==3:
            tr =  re.split('\">', line, re.IGNORECASE)[1]
            address = tr.partition('</ODSAembed>')[0]
            lab = emval2[2]
            if 'http://' in address:
               line = line.replace(emval+'\">',show_code('example%s'%cpt,'example%s'%cpt )+hide_code('example%s'%cpt, 'example%s'%cpt)+embedcode(address))
               line = line.replace(address,'')
               line = line.replace('</ODSAembed>','')
            else:
               avfile = os.path.basename(address)
               res = embedlocal(address)
               name=res[0]+'-'+res[1]+'-'+res[2]
               nameh= name+'-hide'
               line = line.replace(emval+'\">'+address,show_code('example%s'%cpt, name, lab)+hide_code('example%s'%cpt, nameh, lab))
               line = line.replace('</ODSAembed>','')
         else:
            tr =  re.split('<ODSAembed>', line, re.IGNORECASE)[1]
            address = tr.partition('</ODSAembed>')[0]
            if 'http://' in address:
               line = line.replace('<ODSAembed>',embedcode(address))
               line = line.replace(address,'')
               line = line.replace('</ODSAembed>','')
            else:
               avfile = os.path.basename(address)
               res = embedlocal(address)
               code = '<center>\n <iframe src="'+res[0]+'" \ntype="text/javascript" width="'+res[1]+'" height="'+res[2]+'" frameborder="0" marginwidth="0" marginheight="0" scrolling="no">\n </iframe></center></div>'
               line = line.replace('<ODSAembed>'+address,code)
               #line = line.replace(address,'')
               line = line.replace('</ODSAembed>','')


      if '<ODSAref \"' in line:
         for j in xrange(1,len(re.split('ODSAref "', line, re.IGNORECASE))):
            str =  re.split('<ODSAref "', line, re.IGNORECASE)[1]
            title = str.partition('"')[0]
            default = title
            mtitle = table.get(title,default) #table[title]
            if mtitle ==title: 
               line = line.replace('<ODSAref "'+title+'" />',mtitle)
               print 'WARNING: Reference missing  <'+title +'>!'
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
      line1=''
   head = modHeader(modDir,title1, col)
   foot = modFooter(modDir,title1,author,year)
   head.extend(newline)
   head.extend(foot)
   return  head      
     



def show_code(divID, name, val='Show Exercise'):
   val = 'Show %s'%val[1:]
   return '<input type="button" name="'+name+'" value="'+val+'" id="'+divID+'-show" class="showLink" style="background-color:#f00;"/>\n<div id="'+divID+'" class="more">\n'

def hide_code(divID, name, val='Hide Exercise'):
   val = 'Hide %s'%val[1:]
   return '<input type="button" name="'+name+'" value="'+val+'" id="'+divID+'-hide" class="hideLink" style="background-color:#f00;"/>\n</div>'







def remove_eol (line):
        if line[-1] == '\n':
           return line[:-1]
        else:
            return line


def which(program):
    def is_exe(fpath):
        return os.path.exists(fpath) and os.access(fpath, os.X_OK)

    def ext_candidates(fpath):
        yield fpath
        for ext in os.environ.get("PATHEXT", "").split(os.pathsep):
            yield fpath + ext

    fpath, fname = os.path.split(program)
    if fpath:
        if is_exe(program):
            return program
    else:
        for path in os.environ["PATH"].split(os.pathsep):
            exe_file = os.path.join(path, program)
            for candidate in ext_candidates(exe_file):
                if is_exe(candidate):
                    return candidate

    return None

def copyfiles(srcdir, dstdir, filepattern):
    def failed(exc):
        raise exc

    for dirpath, dirs, files in os.walk(srcdir, topdown=True, onerror=failed):
        for file in fnmatch.filter(files, filepattern):
            shutil.copy2(os.path.join(dirpath, file), dstdir)
        break # no recursion

def embedcode(address):
   code ='<center>\n<div id="embedHere"></div>\n<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js">\n</script>\n<script>\n$(function() { \n$.getJSON("http://algoviz.org/oembed/?url='
   code=code+address+'", function(data) {\n$("#embedHere").html(data.html);\n })\n});\n</script>\n</center>'
   return code
         

def embedlocal(address):
   embed=[]
   abspath=os.path.abspath(__file__)
   avfull =abspath.partition('Scripts')[0]+address[3:]
   avdir = os.path.dirname(avfull)
   avfile = os.path.basename(avfull)
   xmlfile=avdir+'/xml/'+os.path.splitext(avfile)[0]+'.xml'
   avwidth=0
   avheight=0
   try:
      dom = parse(xmlfile)
      node = dom.documentElement
      widths = dom.getElementsByTagName("width")
      for width in widths:
           nodes = width.childNodes
           for node in nodes:
               if node.nodeType == node.TEXT_NODE:
                   avwidth=node.data
   
      heights = dom.getElementsByTagName("height")
      for height in heights:
           nodes = height.childNodes
           for node in nodes:
               if node.nodeType == node.TEXT_NODE:
                   avheight=node.data
      link =os.path.abspath(address[1:])
      embed.append(address)
      embed.append(avwidth)
      embed.append(avheight)
      return embed     # code
   
   except IOError:
      print 'ERROR: No description file when embedding' + address
      sys.exit()





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
     if os.path.splitext(fl)[1][1:] == 'odsa': 
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
        content = parseMod(fl.name, modDir, modDest,col,finalTable)
        try:
           nfile = open(modDest+'/'+os.path.splitext(os.path.basename(fl.name))[0]+'.html','w') 
           nfile.writelines(content)
           nfile.close
        except IOError:
           print 'ERROR: When saving html file'

  print 'Building glossary...'
  gfile = open('glossary.html.tmp','r')
  glos = gfile.readlines()
  gfile.close()
  lowerglos=[] #lower case all glossary terms-- to ease the alphabetical sorting
  for g in glos:
     words = g.split(' ')
     for i in range(len(words)):
        if i==0:
           words[i]=words[i].capitalize()
     g = ' '.join(words)
     lowerglos.append(g) 
  lowerglos = list(set(lowerglos))  #remove duplicates
  lowerglos.sort()
  try:
     dfile =open(modDest+'/glossary.html','a')
     dfile.writelines('<h1>Glossary</h1>\n')
     dfile.writelines(lowerglos)
     dfile.close
     
     os.remove('glossary.html.tmp')
  except IOError:
     print 'ERROR: When saving glossary file'


if __name__ == "__main__":
   sys.exit(main(sys.argv))
