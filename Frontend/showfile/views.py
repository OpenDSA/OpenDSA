# Create your views here.
from django.http import HttpResponse
from showfile.models import *
from django.template import Context, loader
from django.utils import simplejson as json
import knowledgemap
from django.conf import settings
from jinja2 import Environment, ChoiceLoader, FileSystemLoader
from django.views.generic.simple import redirect_to

 
# Setup environment
default_mimetype = getattr(settings, 'DEFAULT_CONTENT_TYPE')
 
# Create the Jinja2 Environment
env = Environment(
    loader=ChoiceLoader([FileSystemLoader(path) for path in getattr(settings, 'TEMPLATE_DIRS', ())])
)
 
def render_to_string(filename, context={}):
    return env.get_template(filename).render(**context)
 
def render_to_response(filename, context={},mimetype=default_mimetype, request = None):
    if request: context['request'] = request
    return HttpResponse(render_to_string(filename, context),mimetype=mimetype)

def index(request):
    mod_list = list(ODSAmod.objects.all())
    return render_to_response('showfile/index.html',{'mod_list': mod_list,})

def home(request):
     mod_list = list(ODSAmod.objects.all()) 
     return HttpResponse("Hello World -. You're at the OpenDSA  Home.!")


def modules(request,tag):
    mod_list = list(ODSAmod.objects.all())
    return render_to_response('showfile/build/%s.html'%tag,{'mod_list': mod_list,})

def viewallexercises(request):
        #user_data = UserData.current() or UserData.pre_phantom()
        user_data = list(UserData.objects.all())[0] 
        user_exercise_graph = UserExerciseGraph.get(user_data)

        show_review_drawer =False # (not user_exercise_graph.has_completed_review())
        admin=False        
        graph_dict_data = []
        for graph_dict in Exercise.objects.all():
           row = {
              "name": graph_dict.short_display_name,
              "points":"",        #graph_dict.get("points", ''),
              "display_name": graph_dict.name.replace('_',' '),
              "status":"Suggested", #  graph_dict.get("status"),
              "recent": False,
              "progress": 0.0,
              "progress_display": "0%",
              "longest_streak": 0,
              "h_position": graph_dict.h_position,
              "v_position": graph_dict.v_position,
              "summative": graph_dict.summative,
              "num_milestones": 1,
              "goal_req": False,
              "prereqs":[graph_dict.prerequisites.replace('-',',')],}
              # get_by_name returns only exercises visible to current user
              #'prereqs': [prereq["name"] for prereq in graph_dict["prerequisites"] if models.Exercise.get_by_name(prereq["name"])],  }

           if admin:
                  exercise = models.Exercise.get_by_name(graph_dict["name"])
                  row["live"] = exercise and exercise.live
           graph_dict_data.append(row)


        template_values = {
            "graph_dict_data": json.dumps(graph_dict_data),
            "user_data": user_data,
            "expanded_all_exercises": True,
            "map_coords": json.dumps(knowledgemap.deserializeMapCoords('0:0:0')),
            "selected_nav_link": "practice",
            "show_review_drawer": False, #show_review_drawer,
        }
        
        if show_review_drawer:
            template_values['review_statement'] = 'Attain mastery'
            template_values['review_call_to_action'] = "I'll do it"
              
        print 'Templates Values=%s'%graph_dict_data
        return render_to_response('showfile/viewexercises.html',{'template_values': template_values,})

