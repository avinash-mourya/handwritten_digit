from django.shortcuts import render
from django.http import HttpResponse 
from django.views.decorators.csrf import csrf_exempt
import numpy as np 
from PIL import Image
import tensorflow as tf
from .img_enc_dec import image_decode
from .predict import Handwritten_digit

def index(request):
    return render(request,"index.html")
@csrf_exempt
def result(request):
    if request.is_ajax():
        # i = request.POST.dict()
        filename = "image.jpg"
        img_data = request.POST.get("imgData")
        image_data = request.POST.get("imageData")
        if img_data!="0":
            image_decode(img_data,filename)
            hadwritten = Handwritten_digit(filename)
            pred = hadwritten.prediction()
            print(pred)
            return HttpResponse(pred)
        elif image_data!="0":
            image_decode(image_data,filename)
            hadwritten = Handwritten_digit(filename)
            pred = hadwritten.prediction()
            print(pred)
            return HttpResponse(pred)
            