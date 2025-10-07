"use client";
import { useState } from "react";
import RecetaConPasos from "../components/RecetaConPasos";
import HeroSection from "../components/HeroSection";
import recetasData from "../data/recetas.json";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");

  // Filtrar recetas según la búsqueda
  const recetasFiltradas = recetasData.filter((receta) =>
    receta.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    receta.descripcion.toLowerCase().includes(busqueda.toLowerCase())
  );

  // La primera receta se mantiene como destacada
  const recetaDestacada = recetasData[0];
  const otrasRecetas = recetasFiltradas.filter((r) => r.id !== recetaDestacada.id);

  return (
    <section>
      <HeroSection />
      
      <h2 className="section-title">🥇 Receta Destacada</h2>
      <div className="receta-destacada">
        <RecetaConPasos
          titulo={recetaDestacada.titulo}
          imagen={recetaDestacada.imagen}
          descripcion={recetaDestacada.descripcion}
          pasos={recetaDestacada.pasos}
          destacada={true}
        />
      </div>

      <h2 className="section-title">🔍 Buscar Recetas</h2>
      <input
        type="text"
        placeholder="🔎 Busca por nombre o descripción... ej: pizza, tacos, pasta"
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <h2 id="todas-las-recetas" className="section-title">
        ✨ {busqueda ? `Resultados para "${busqueda}"` : 'Todas las Recetas'}
        <span style={{fontSize: '1rem', color: '#7f8c8d', fontWeight: 'normal', display: 'block', marginTop: '0.5rem'}}>
          {otrasRecetas.length} receta{otrasRecetas.length !== 1 ? 's' : ''} encontrada{otrasRecetas.length !== 1 ? 's' : ''}
        </span>
      </h2>
      
      {otrasRecetas.length > 0 ? (
        <div className="grid">
          {otrasRecetas.map((receta, index) => (
            <RecetaConPasos
              key={receta.id}
              titulo={receta.titulo}
              imagen={receta.imagen}
              descripcion={receta.descripcion}
              pasos={receta.pasos}
              index={index}
            />
          ))}
        </div>
      ) : busqueda ? (
        <div className="no-resultados">
          <h3>🔍 No se encontraron recetas</h3>
          <p>Intenta con otros términos como "pasta", "pizza", "tacos" o "sopa"</p>
        </div>
      ) : null}
    </section>
  );
}

