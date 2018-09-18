from docutils.nodes import figure, caption, Text, reference, raw, SkipNode, Element, topic
from sphinx.roles import XRefRole
from inlineav import av_dgm, av_ss
import json

# Element classes

class page_ref(reference):
    pass

class num_ref(reference):
    pass

figids_1={}  

table_doc={}   

def loadTable():
   try:
      table=open('table.json')
      data = json.load(table)
      table.close()
      return data
   except IOError:
      print 'ERROR: No table.json file.'


# Visit/depart functions

def skip_page_ref(self, node):
    raise SkipNode

def latex_visit_page_ref(self, node):
    self.body.append("\\pageref{%s:%s}" % (node['refdoc'], node['reftarget']))
    raise SkipNode

def latex_visit_num_ref(self, node):
    fields = node['reftarget'].split('#')

    if len(fields) > 1:
        label, target = fields
        ref_link = '%s:%s' % (node['refdoc'], target)
        latex = "\\hyperref[%s]{%s \\ref*{%s}}" % (ref_link, label, ref_link)
        self.body.append(latex)
    else:
        self.body.append('\\ref{%s:%s}' % (node['refdoc'], fields[0]))
        
    raise SkipNode


def html_visit_num_ref(self, node):
    fields = node['reftarget'].split('#')
    json_data = loadTable()  
    if len(fields) > 1:
        label, target = fields
        target_file = ''
        chapter = ''
        if target in json_data:
            chapter = json_data[target].rsplit('.',1)[0]  
            for name_l, idx in json_data.iteritems():
                if idx == chapter:    
                    target_file = name_l   
            if node['refdoc']==target_file:   #target file and curent file are the same  
                link = "%s.html#%s" %(node['refdoc'], target.lower())  
            else:
                link = "%s.html#%s" %(target_file, target.lower())   
            html = '<a href="%s">%s</a>' %(link,  json_data[target][:-1])  
            self.body.append(html)
        else:
            print 'WARNING: Missing object reference %s' %target
    else:
        self.body.append('<a href="%s.html">%s</a>' % (node['refdoc'], fields[0]))

    raise SkipNode



def doctree_read(app, doctree):
    # first generate figure numbers for each figure
    env = app.builder.env
    json_data = loadTable()
    i = getattr(env, 'i', 1)
    figids = getattr(env, 'figids', {})
    figid_docname_map = getattr(env, 'figid_docname_map', {})
    module = '' 
    num_module = 0  
    _table = 1
    _exple = 1
    _thrm = 1
    for figure_info in doctree.traverse(Element): # figure):
            if app.builder.name != 'latex' and app.config.number_figures:
                if env.docname != module:
                   i = 1
                   _table = 1
                   _exple = 1
                   _thrm = 1
            if isinstance( figure_info, figure):
                if  env.docname in json_data:
                    module = env.docname  
                    num_module = json_data[env.docname]  
                for cap in figure_info.traverse(caption):
                    cap[0] = Text(" %s %s.%d: %s" % (app.config.figure_caption_prefix, num_module, i, cap[0]))
                    figids_1[env.docname]= '%s.%d' %(num_module, i) 
                for id in figure_info['ids']:
                    figids[id] = i
                    figid_docname_map[id] = env.docname
                i += 1
            if isinstance( figure_info, av_dgm ): 
                module = env.docname
                i += 1
            if isinstance( figure_info, av_ss ) and len(figure_info.attributes['ids']) > 0:
                module = env.docname
                i += 1
            if isinstance( figure_info, topic):
                numbered_label = ''
                if  env.docname in json_data:
                    module = env.docname
                    num_module = json_data[env.docname]
                    if module not in app.config.expleid:
                        app.config.expleid[module] = {}
                if len(figure_info.attributes['ids']) > 0:
                    for label in figure_info.attributes['ids']:
                        xrefs = ''
                        if label in json_data:
                            xrefs = json_data[label]
                            if '#' in xrefs:
                                xrefs = xrefs[:-1]
                        numbered_label = ' %s' %xrefs
                        break
                if 'example' in figure_info.children[0].children[0].lower():
                    title = str(figure_info.children[0].children[0]) + numbered_label
                    figure_info.children[0].children[0] = Text(title) 
                    title = 'Example %s.%d ' %(num_module,_exple)
                    figure_info.children[0].children[0] = Text(title)
                    #_exple += 1
                    for mod in app.config.expleid:
                        if mod == module:
                            expl_dict = app.config.expleid[mod]
                            for id in figure_info['ids']:
                                expl_dict[id] = _exple
                                figids[id] = _exple 
                                figid_docname_map[id] = env.docname
                    _exple += 1
                if 'table' in figure_info.children[0].children[0].lower():
                    title = str(figure_info.children[0].children[0]) + numbered_label
                    figure_info.children[0].children[0] = Text(title)
                    title = 'Table %s.%d %s' %(num_module,_table,str(figure_info.children[0].children[0]).split('Table')[1])
                    figure_info.children[0].children[0] = Text(title)
                    _table += 1
                if 'theorem' in figure_info.children[0].children[0].lower():
                    title = str(figure_info.children[0].children[0]) + numbered_label
                    figure_info.children[0].children[0] = Text(title)
                    title = 'Theorem %s.%d %s' %(num_module,_thrm,str(figure_info.children[0].children[0]).split('Theorem')[1])
                    figure_info.children[0].children[0] = Text(title)
                    _thrm += 1
    env.figid_docname_map = figid_docname_map
    env.i = i
    env.figids = figids


def doctree_resolved(app, doctree, docname):
    # replace numfig nodes with links
    figids = app.builder.env.figids
    if app.builder.name != 'latex':
        for ref_info in doctree.traverse(num_ref):
            if '#' in ref_info['reftarget']:
                label, target = ref_info['reftarget'].split('#')
                labelfmt = label + " %d"
            else:
                labelfmt = '%d'
                target = ref_info['reftarget']

            if target not in figids:
                continue
            
            if app.builder.name == 'html':
                target_doc = app.builder.env.figid_docname_map[target]
                link = "%s#%s" % (app.builder.get_relative_uri(docname, target_doc),
                                  target)
                html = '<a href="%s">%s</a>' % (link, labelfmt %(figids[target]))
                ref_info.replace_self(raw(html, html, format='html'))
            else:
                ref_info.replace_self(Text(labelfmt % (figids[target])))


def setup(app):
    app.add_config_value('number_figures', True, True)
    app.add_config_value('figure_caption_prefix', "Figure", True)
    app.add_config_value('expleid', {}, True)

    app.add_node(page_ref,
                 text=(skip_page_ref, None),
                 html=(skip_page_ref, None),
                 latex=(latex_visit_page_ref, None))
    app.connect('doctree-read', doctree_read)
    app.connect('doctree-resolved', doctree_resolved)

    app.add_role('page', XRefRole(nodeclass=page_ref))

    app.add_node(num_ref,   
                  html=(html_visit_num_ref, None))

    app.add_role('num', XRefRole(nodeclass=num_ref))

#    app.connect('doctree-read', doctree_read)
#    app.connect('doctree-resolved', doctree_resolved)
