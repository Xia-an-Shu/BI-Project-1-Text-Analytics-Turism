from Preprocessing import preparacion_nuevos_datos
from DataModel import DataModel
from PredictionModel import Model
from fastapi import FastAPI
import pandas as pd
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

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

@app.post("/predicts")
def make_bulk_predictions(file: UploadFile = File(...)):
    # Verifica que el archivo sea un CSV
    if file.content_type != 'text/csv':
        raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")
    
    # Lee el archivo CSV en un DataFrame de pandas
    try:
        df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading CSV file: {e}")
    
    # Crea una instancia del modelo
    modelo_pipeline = Model()
    
    # Procesa las revisiones
    df["ProcessedReview"] = preparacion_nuevos_datos(df["Review"])  # Procesa las revisiones
    
    # Realiza las predicciones para todas las revisiones
    predictions = modelo_pipeline.make_predictions(df["ProcessedReview"])
    
    # Crea la respuesta, incluyendo revisiones y predicciones
    response = []
    for i, row in df.iterrows():
        # Convierte el tipo de datos `int64` a tipos de datos estándar de Python
        prediction = predictions[i].astype(int).item()
        response.append({
            "review": row["Review"],
            "prediction": prediction
        })
    
    # Devuelve la respuesta JSON con revisiones y predicciones
    return JSONResponse(content={"results": response})
