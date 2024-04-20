import "./App.css";

import React, { useState } from "react";

import imgturismo from './turismo.png'
import { useNavigate } from "react-router-dom";

function PaginaPrincipal() {

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

  return (
    <div className="PagPrincipal">
        <nav>
        <button onClick={() => navigate('inicio')}>Inicio</button>
        <button onClick={() => navigate('predecir')}>Predicción</button>
        <button onClick={() => navigate('csv')}>Predicciones</button>
      </nav>
       <div className="PagPrincipalInformación">
       <h1>Bienvenido a Turismo de los Alpes</h1>
       <img src={imgturismo} alt="img" />
       <p>Turismo de los Alpes es una plataforma innovadora que combina la pasión por el turismo con la precisión de la inteligencia artificial. Comparta sus reseñas sobre los restaurantes, hoteles, sitios turísticos y descubra cómo nuestras predicciones pueden enriquecer su experiencia. Con nuestro modelo de Machine Learning con escribir una reseña se puede predecir su calificación entre 1 y 5 estrellas.</p>
       <p>¡Que esperas para probarla!</p>
       </div>
    </div>
  );
}

export default PaginaPrincipal;
