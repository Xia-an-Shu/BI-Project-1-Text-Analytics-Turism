import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PagPrincipal from './PagPrincipal';
import Predecir from './Predecir';
import Predicciones from './Predicciones';

function App() {

  return (
<BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/home"/>}/>

          <Route path="/home" element={<PagPrincipal />}/>

          <Route path="/predecir" element={<Predecir />}/>
          
          <Route path="/predicciones" element={<Predicciones />}/>
        
        </Routes>
      </div>
    </BrowserRouter>
);
}

export default App
