from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from DataModel import DataModel
from PredictionModel import Model
from Preprocessing import preparacion_nuevos_datos
import pandas as pd

app = FastAPI()

origins = ["http://localhost","http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.post("/predict")
def make_predictions(dataModel: DataModel):

    modelo_pipeline = Model()

    df = pd.DataFrame([dataModel.values()], columns=dataModel.columns())
    result = modelo_pipeline.make_predictions(preparacion_nuevos_datos(df["Review"]))

    return {"prediction": result.tolist()}

@app.post("/predicts")
def make_bulk_predictions(file: UploadFile = File(...)):

    modelo_pipeline = Model()

    try:
        if file.content_type != 'text/csv':
            raise HTTPException(status_code=400, detail="Invalid file format. Please upload a CSV file.")
        df = pd.read_csv(file.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading CSV file: {e}")
        
    result = modelo_pipeline.make_predictions(preparacion_nuevos_datos(df["Review"]))
    
    response = []
    for i, row in df.iterrows():
        prediction = result[i].astype(int).item()
        response.append({"review": row["Review"],"prediction": prediction})
    
    return JSONResponse(content={"results": response})