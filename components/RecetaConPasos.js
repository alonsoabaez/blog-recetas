"use client"; // este sí necesita interactividad
import { useState } from "react";

export default function RecetaConPasos({ titulo, imagen, descripcion, pasos }) {
  const [completados, setCompletados] = useState([]);

  const togglePaso = (index) => {
    setCompletados((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="card">
      <img src={imagen} alt={titulo} className="card-img" />
      <div className="card-body">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>

        <h3>👨‍🍳 Pasos</h3>
        <ol className="pasos-lista">
          {pasos.map((paso, index) => (
            <li key={index} className="paso-item">
              <label>
                <input
                  type="checkbox"
                  checked={completados.includes(index)}
                  onChange={() => togglePaso(index)}
                />
                <span
                  style={{
                    marginLeft: "0.5rem",
                    textDecoration: completados.includes(index)
                      ? "line-through"
                      : "none",
                    color: completados.includes(index) ? "gray" : "black",
                  }}
                >
                  {paso}
                </span>
              </label>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
