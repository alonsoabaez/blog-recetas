"use client";
import { useState } from "react";

export default function Panel() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [steps, setSteps] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const addStep = () => setSteps([...steps, ""]);

  const updateStep = (index, value) => {
    const copy = [...steps];
    copy[index] = value;
    setSteps(copy);
  };

  const handleImage = (e) => {
    const f = e.target.files?.[0] ?? null;
    setImageFile(f);

    if (f) {
      const url = URL.createObjectURL(f);
      setImagePreview(url);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (!title.trim()) {
      setMensaje("El título es obligatorio");
      return;
    }

    if (!steps.some((s) => s && s.trim())) {
      setMensaje("Al menos un paso válido");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("steps", JSON.stringify(steps.filter(Boolean)));
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch("/api/recetas", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `HTTP ${res.status}`);
      }

      await res.json();

      setMensaje("✅ Receta creada correctamente");
      // Limpiar formulario
      setTitle("");
      setDescription("");
      setImageFile(null);
      setImagePreview(null);
      setSteps([""]);
    } catch (err) {
      console.error("Error al crear receta:", err);
      setMensaje("❌ Error al crear receta");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">👨‍🍳 Panel de Administración</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Título</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Ej: Pizza Margarita"
          required
        />

        <label>Descripción</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe la receta..."
        />

        <label>Imagen</label>
        <input
          type="file"
          name="image"          // 👈 nombre alineado con el backend
          accept="image/*"
          onChange={handleImage}
        />
        {imagePreview && (
          <div style={{ marginTop: 8 }}>
            <img
              src={imagePreview}
              alt="preview"
              style={{ width: 180, borderRadius: 8 }}
            />
          </div>
        )}

        <label style={{ marginTop: 12 }}>Pasos</label>
        {steps.map((step, idx) => (
          <input
            key={idx}
            type="text"
            placeholder={`Paso ${idx + 1}`}
            value={step}
            onChange={(e) => updateStep(idx, e.target.value)}
            style={{ marginTop: 8 }}
          />
        ))}

        <div style={{ marginTop: 10 }}>
          <button type="button" className="btn-add" onClick={addStep}>
            + Agregar paso
          </button>
        </div>

        <div style={{ marginTop: 20 }}>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Guardando..." : "Crear Receta ✨"}
          </button>
        </div>

        {mensaje && <p style={{ marginTop: 12 }}>{mensaje}</p>}
      </form>
    </div>
  );
}






