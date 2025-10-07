"use client";
import { useState, useEffect } from "react";

export default function RecetaConPasos({ titulo, imagen, descripcion, pasos, destacada = false, index = 0 }) {
  const [completados, setCompletados] = useState([]);
  const [mostrarPasos, setMostrarPasos] = useState(false);

  const togglePaso = (index) => {
    setCompletados((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  const progreso = (completados.length / pasos.length) * 100;

  // Animación de entrada escalonada
  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarPasos(true);
    }, index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div className={`card ${destacada ? 'receta-destacada' : ''}`}>
      <div className="card-image-container">
        <img src={imagen} alt={titulo} className="card-img" />
        {progreso > 0 && (
          <div className="progreso-overlay">
            <div className="progreso-circle">
              <span>{Math.round(progreso)}%</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="card-body">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>

        <div className="receta-stats">
          <span className="stat">
            <span className="stat-icon">👨‍🍳</span>
            {pasos.length} pasos
          </span>
          <span className="stat">
            <span className="stat-icon">⏱️</span>
            ~{pasos.length * 5} min
          </span>
          <span className="stat">
            <span className="stat-icon">✅</span>
            {completados.length}/{pasos.length}
          </span>
        </div>

        {progreso > 0 && (
          <div className="progreso-bar">
            <div 
              className="progreso-fill" 
              style={{ width: `${progreso}%` }}
            ></div>
          </div>
        )}

        <h3>
          👨‍🍳 Instrucciones
          <button 
            className="toggle-pasos"
            onClick={() => setMostrarPasos(!mostrarPasos)}
          >
            {mostrarPasos ? '▼' : '▶'}
          </button>
        </h3>
        
        {mostrarPasos && (
          <ol className="pasos-lista">
            {pasos.map((paso, index) => (
              <li key={index} className={`paso-item ${completados.includes(index) ? 'completado' : ''}`}>
                <label>
                  <input
                    type="checkbox"
                    checked={completados.includes(index)}
                    onChange={() => togglePaso(index)}
                  />
                  <span className="paso-numero">{index + 1}</span>
                  <span className="paso-texto">
                    {paso}
                  </span>
                </label>
              </li>
            ))}
          </ol>
        )}

        {completados.length === pasos.length && pasos.length > 0 && (
          <div className="receta-completada">
            🎉 ¡Receta completada! ¡Buen provecho!
          </div>
        )}
      </div>
    </div>
  );
}
