import "./App.css";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import estrellas0 from './0estrellas.png'
import estrellas1 from './1estrella.png'
import estrellas2 from './2estrellas.png'
import estrellas3 from './3estrellas.png'
import estrellas4 from './4estrellas.png'
import estrellas5 from './5estrellas.png'

function Predecir() {

  const [review, setReview] = useState('');
  const [clasificacion, setClasificacion] = useState(0)
  const [estrellas, setEstrellas] = useState(estrellas0)

  const navigation = useNavigate() 

  const navigate = (pagina) => {
    if (pagina === 'inicio'){
        navigation('/home')
    }
    else if (pagina === 'predecir'){
        navigation('/predecir')
    }
    else{
        navigation('/predicciones')
    }
  }

  const handleButtonClick = () => {
    if (review === ''){
      setClasificacion(0)
      cambiarestrellas(0);
      alert("Por favor escribe una reseña")
    }
    else {
      const data = { review };

      fetch("http://127.0.0.1:8000/predict", {method: "POST",
        headers: {
          "Content-Type": "application/json"
        }, body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => { setClasificacion(data["prediction"][0]); 
                      cambiarestrellas(data["prediction"][0]);})
      .catch(error => { console.error('Error:', error); });

    }  
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const cambiarestrellas = (prediction) => {
    
    if(prediction === 0) {setEstrellas(estrellas0);}
    else if (prediction === 1) { setEstrellas(estrellas1);}
    else if (prediction === 2) {setEstrellas(estrellas2);} 
    else if (prediction === 3) {setEstrellas(estrellas3);} 
    else if (prediction === 4) {setEstrellas(estrellas4);} 
    else if (prediction === 5) {setEstrellas(estrellas5);}
  }


  return (
    <div>
    <nav>
    <button onClick={() => navigate('inicio')}>Inicio</button>
    <button onClick={() => navigate('predecir')}>Predicción</button>
    <button onClick={() => navigate('csv')}>Predicciones</button>
  </nav>
    <div className="Contenedor-Principal">
      <div className="Contenedor-Banner">
        <h3>Calcular Nivel de Satisfacción</h3>
      </div>
      
      <div className="Contenedor-Secundario">

        <div className="Contenedor-Review">
          <h3>Review</h3>
          <textarea placeholder="Escribe tu reseña aquí" value={review} onChange={handleReviewChange} spellCheck={false}></textarea>
        </div>

        <div className="Contenedor-Resultado">
          <h3>Clasificación</h3>
          <img src={estrellas} alt="calificacionestrellas"></img>
        </div>
      </div>
      <button onClick={handleButtonClick}>Procesar</button>
    </div>
    </div>
  );
}

export default Predecir;
