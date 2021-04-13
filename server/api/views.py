from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators import csrf
from django.views.decorators.csrf import csrf_exempt
import subprocess


# Create your views here.
def index(request):
    return HttpResponse("Hello world")


@csrf_exempt
def configure(request):
    if request.method == 'POST':
        config_file_path = request.POST.get('config_file_path')
        build_path = request.POST.get('build_path')
        list_files = subprocess.run(["python3", "configure.py", config_file_path, "-b", build_path])
        return JsonResponse({"ok": True, "message": list_files.returncode})
    else:
        return JsonResponse({"ok": False})


@csrf_exempt
def simple2full(request):
    if request.method == 'POST':
        input_file_path = request.POST.get('input_file_path')
        output_file_path = request.POST.get('output_file_path')
        list_files = subprocess.run(["python3", "simple2full.py", input_file_path, output_file_path])
        return JsonResponse({"ok": True, "message": list_files.returncode})
    else:
        return JsonResponse({"ok": False})
