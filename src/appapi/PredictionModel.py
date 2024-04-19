from joblib import load
from Preprocessing import *

class Model:

    def __init__(self):
        self.model = load("../../data/modelo_pipeline.joblib")
        
    def make_predictions(self, data):
        result = self.model.predict(data)
        return result