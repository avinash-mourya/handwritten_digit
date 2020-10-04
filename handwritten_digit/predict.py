import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

class Handwritten_digit:
    def __init__(self,filename):
        self.filename =filename


    def prediction(self):
        model = load_model('handwritten.h5')
        imagename = self.filename
        test_image = image.load_img(imagename,color_mode = "grayscale",target_size = (28,28))
        test_image = image.img_to_array(test_image)
        test_image = np.expand_dims(test_image, axis = 0)
        pred = model.predict_classes(test_image)
        return pred
