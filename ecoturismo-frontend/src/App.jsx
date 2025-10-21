// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Inicio from './components/Inicio';
import LugaresPopulares from './components/LugaresPopulares';
import Actividades from './components/Actividades';
import Contacto from './components/Contacto';
import DetalleLugar from './components/DetalleLugar';
import ActividadDetalle from './components/ActividadDetalle'; // Nuevo componente
import RutaDetalle from "./components/RutaDetalle.jsx";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App relative">
          <Navbar />
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/lugares" element={<LugaresPopulares />} />
            <Route path="/actividades" element={<Actividades />} />
            <Route path="/contacto" element={<Contacto />} />

            {/* Detalles de lugar por ID */}
            <Route path="/lugar/:id" element={<DetalleLugar />} />
            
            {/* Detalles de actividad por ID - NUEVA RUTA */}
            <Route path="/actividad/:id" element={<ActividadDetalle />} />
            
            {/* Ruta de navegación - usa nombre del lugar */}
            <Route path="/ruta/:nombreLugar" element={<RutaDetalle />} />

          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;