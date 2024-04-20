import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Predicciones() {

    const [csvFile, setCsvFile] = useState(null);
    const [results, setResults] = useState([]);
    const [cargando, setCargando] = useState('')

    const cambiarCargando = () =>{
        if (!csvFile) {
            return;
        }
        setCargando('Cargando...')
    }

    const navigation = useNavigate() 

    const navigate = (pagina) => {
      if (pagina === 'inicio'){
          navigation('/home')
      }
      else if (pagina === 'predecir'){
          navigation('/predecir')
      }
      else{
          navigation('/predecircsv')
      }
    }

    // Manejador de eventos para el cambio de archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
    };

    // Manejador de eventos para enviar el archivo a la API
    const handleFileUpload = async () => {
        if (!csvFile) {
            alert('Por favor, sube un archivo CSV primero.');
            return;
        }

        // Crear un objeto FormData para enviar el archivo a la API
        const formData = new FormData();
        formData.append('file', csvFile);

        try {
            // Hacer una solicitud POST a la API `/predicts`
            const response = await axios.post('http://127.0.0.1:8000/predicts', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Almacenar las revisiones y predicciones recibidas en el estado
            setResults(response.data.results);
            setCargando('')
        } catch (error) {
            console.error('Error al hacer la solicitud a la API:', error);
            alert('Hubo un error al hacer la solicitud a la API.');
        }
    };

    return (
        <div>
            <nav>
                <button onClick={() => navigate('inicio')}>Inicio</button>
                <button onClick={() => navigate('predecir')}>Predicción</button>
                <button onClick={() => navigate('csv')}>Predicciones</button>
            </nav>
            <h2>Predicciones para múltiples revisiones</h2>
            <input type="file" accept=".csv" onChange={handleFileChange} />
            <button onClick={() => {handleFileUpload(); cambiarCargando();}}>Enviar archivo</button>
            <h2>{cargando}</h2>
            {/* Mostrar revisiones y predicciones */}
            {results.length > 0 && (
                <div>
                    <h3>Resultados:</h3>
                    <ul>
                        {results.map((result, index) => (
                            <li key={index}>
                                <strong>Revisión:</strong> {result.review}<br />
                                <strong>Predicción:</strong> {result.prediction}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Predicciones;
