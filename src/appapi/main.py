from Preprocessing import preparacion_nuevos_datos
from DataModel import DataModel
from PredictionModel import Model
from fastapi import FastAPI
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuración de CORS
origins = [
    "http://localhost",
    "http://localhost:3000", 
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def make_predictions(dataModel: DataModel):
    modelo_pipeline = Model()
    df = pd.DataFrame([dataModel.values()], columns=dataModel.columns())
    result = modelo_pipeline.make_predictions(preparacion_nuevos_datos(df["Review"]))
    return {"prediction": result.tolist()}