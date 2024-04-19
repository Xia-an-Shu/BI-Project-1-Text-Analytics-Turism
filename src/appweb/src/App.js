import "./App.css";

import React, { useState } from "react";

function App() {

  const [review, setReview] = useState('');
  const [clasificacion, setClasificacion] = useState(0)

  const handleButtonClick = () => {
    if (review === ''){
      setClasificacion(0)
      cambiarfondo(0);
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
                      cambiarfondo(data["prediction"][0]);})
      .catch(error => { console.error('Error:', error); });

    }  
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const cambiarfondo = (prediction) => {
    const contenedorResultado = document.querySelector(".Contenedor-Resultado");
    const resultado = contenedorResultado.querySelector("h1");
    
    if(prediction === 0) {resultado.style.backgroundColor = "#00000070";}
    else if (prediction === 1) { resultado.style.backgroundColor = "#b8000070";}
    else if (prediction === 2) {resultado.style.backgroundColor = "#b1350070";} 
    else if (prediction === 3) {resultado.style.backgroundColor = "#89890070";} 
    else if (prediction === 4) {resultado.style.backgroundColor = "#005b8970";} 
    else if (prediction === 5) {resultado.style.backgroundColor = "#00710670";}
  }


  return (
    <div className="Contenedor-Principal">

      <div className="Contenedor-Banner">
        <h1>TURISMO DE LOS ALPES</h1>
        <h3>Calcular Nivel de Satisfacción</h3>
      </div>
      
      <div className="Contenedor-Secundario">

        <div className="Contenedor-Review">
          <h3>Review</h3>
          <textarea placeholder="Escribe tu reseña aquí" value={review} onChange={handleReviewChange} spellCheck={false}></textarea>
        </div>

        <div className="Contenedor-Resultado">
          <h3>Clasificación</h3>
          <h1>{clasificacion}</h1>
        </div>
      </div>
      <button onClick={handleButtonClick}>Procesar</button>
    </div>
    
  );
}

export default App;
