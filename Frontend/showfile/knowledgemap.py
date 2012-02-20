
#from google.appengine.api import users

#import util
#import request_handler
from models import UserData
import time

class SaveExpandedAllExercises():
    def post(self):
        user_data = UserData.current()

        if user_data:
            expanded = self.request_bool("expanded")

            user_data.expanded_all_exercises = expanded
            user_data.put() 

class SaveMapCoords():

    def get(self):
        return

    def post(self):
        user_data = UserData.current()

        if user_data:
            try:
                lat = self.request_float("lat")
                lng = self.request_float("lng")
                zoom = self.request_int("zoom")
            except ValueError:
                # If any of the above values aren't present in request, don't try to save.
                return

            user_data.map_coords = serializeMapCoords(lat, lng, zoom)
            user_data.put()

def serializeMapCoords(lat, lng, zoom):
    return "%s:%s:%s:%s" % (lat, lng, zoom, int(time.time() * 1000))

def deserializeMapCoords(s=False):
    coords = {'lat':0, 'lng':0, 'zoom':0, 'when':0}
    if (not s):
        return coords

    try:
        rg = s.split(":")
        coords['lat'] = float(rg[0])
        coords['lng'] = float(rg[1])
        coords['zoom'] = int(rg[2])
        if len(rg) == 4:
            coords['when'] = int(rg[3])
        else:
            coords['when'] = 0
    except ValueError:
        return coords

    return coords

