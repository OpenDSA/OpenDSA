"""

Django template tag that supports {% elif %} branches.

Usage:

  {% my_if a == 0 %}
    a == 0 
  {% elif a == 1 %}
    a == 1
  {% elif a == 2 %}
    a == 2
  {% else %}
    a not in [0, 1, 2]
  {% endif %}


Requires a small patch to django to work properly:

Index: __init__.py
===================================================================
--- __init__.py	(revision 14358)
+++ __init__.py	(working copy)
@@ -264,7 +264,7 @@
                 var_node = self.create_variable_node(filter_expression)
                 self.extend_nodelist(nodelist, var_node,token)
             elif token.token_type == TOKEN_BLOCK:
-                if token.contents in parse_until:
+                if token.contents.partition(" ")[0] in parse_until:
                     # put token back on token list so calling code knows why it terminated
                     self.prepend_token(token)
                     return nodelist

"""


from django.template import Library
from django.template.defaulttags import TemplateIfParser
from django.template import Node, VariableDoesNotExist

register = Library()

class IfBranch(object):
  def __init__(self, var, node_list):
    self.var = var
    self.node_list = node_list


class IfNode(Node):
  def __init__(self, branches):
    self.branches = branches

  def __repr__(self):
    return "<MyIf node>"

  def __iter__(self):
    for n in self.branches:
      for node in n:
        yield node


  def render(self, context):
    for n in self.branches:
      var = n.var
      if var != True:
        try:
          var = var.eval(context)
        except VariableDoesNotExist:
          var = None

      if var:
        return n.node_list.render(context)
        break


def do_if(parser, token):
  branches = []

  bits = token.split_contents()[1:]
  var = TemplateIfParser(parser, bits).parse()

  end_nodes = (('else', 'elif', 'endif'))

  node_list = parser.parse(end_nodes)
  branches.append(IfBranch(var, node_list))
  token = parser.next_token()

  while token.contents == "else" or token.contents.startswith("elif"):
    if token.contents.startswith("elif"):
      bits = token.split_contents()[1:]
      var = TemplateIfParser(parser, bits).parse()
    else:
      var = True

    node_list = parser.parse(end_nodes)
    branches.append(IfBranch(var, node_list))
    token = parser.next_token()

  parser.delete_first_token()
  return IfNode(branches)

do_if = register.tag("my_if", do_if)
