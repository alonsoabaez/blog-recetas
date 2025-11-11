"use client";
import { useEffect, useMemo, useState } from "react";
import RecetaConPasos from "../components/RecetaConPasos";

export default function Home() {
  const [busqueda, setBusqueda] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar recetas desde la API (BD via Prisma)
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const res = await fetch("/api/recetas", { cache: "no-store" });
        if (!res.ok) throw new Error("Error al cargar recetas");
        const data = await res.json();
        if (!cancel) setRecetas(data);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancel) setLoading(false);
      }
    })();
    return () => { cancel = true; };
  }, []);

  // Filtros de búsqueda
  const recetasFiltradas = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return recetas;
    return recetas.filter((r) => r.title?.toLowerCase().includes(q));
  }, [recetas, busqueda]);

  const recetaDestacada = recetasFiltradas[0] ?? recetas[0];
  const otrasRecetas = useMemo(() => {
    if (!recetaDestacada) return recetasFiltradas;
    return recetasFiltradas.filter((r) => r.id !== recetaDestacada.id);
  }, [recetasFiltradas, recetaDestacada]);

  if (loading) return <p className="no-resultados">Cargando recetas…</p>;
  if (!recetas || recetas.length === 0) {
    return <p className="no-resultados">No hay recetas en la base de datos.</p>;
  }

  return (
    <section>
      <h2 className="section-title">🥇 Receta Destacada</h2>
      {recetaDestacada && (
        <RecetaConPasos
          titulo={recetaDestacada.title}
          imagen={recetaDestacada.image}
          descripcion={recetaDestacada.description}
          pasos={recetaDestacada.steps?.map((s) => s.text) ?? []}
        />
      )}

      <h2 className="section-title">🔍 Buscar Recetas</h2>
      <input
        type="text"
        placeholder="Escribe un nombre, ej: pizza, tacos..."
        className="buscador"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <h2 className="section-title">✨ Resultados</h2>
      {otrasRecetas.length > 0 ? (
        <div className="grid">
          {otrasRecetas.map((rec) => (
            <RecetaConPasos
              key={rec.id}
              titulo={rec.title}
              imagen={rec.image}
              descripcion={rec.description}
              pasos={rec.steps?.map((s) => s.text) ?? []}
            />
          ))}
        </div>
      ) : (
        <p className="no-resultados">No se encontraron recetas 😔</p>
      )}
    </section>
  );
}
