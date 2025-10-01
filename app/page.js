import RecetaConPasos from "../components/RecetaConPasos";

export default function Home() {
  return (
    <section>
      <h2 className="section-title">🥇 Receta Destacada</h2>
      <RecetaConPasos
        titulo="Pasta con Salsa de Tomate"
        imagen="/assets/pasta.jpg"
        descripcion="Una receta sencilla y deliciosa con tomates frescos y hierbas."
        pasos={[
          "Hervir la pasta en agua con sal durante 8 minutos.",
          "Picar y triturar los tomates frescos.",
          "Saltear el ajo en aceite de oliva y añadir los tomates.",
          "Mezclar la pasta con la salsa y espolvorear orégano."
        ]}
      />

      <h2 className="section-title">✨ Otras Recetas</h2>
      <div className="grid">
        <RecetaConPasos
          titulo="Tacos Mexicanos"
          imagen="/assets/tacos.jpg"
          descripcion="Tortillas rellenas de carne, verduras y guacamole."
          pasos={[
            "Preparar las tortillas.",
            "Cocinar la carne con condimentos.",
            "Picar verduras frescas.",
            "Armar los tacos con guacamole y servir."
          ]}
        />
        <RecetaConPasos
          titulo="Pizza Margarita"
          imagen="/assets/pizza.jpg"
          descripcion="La clásica pizza italiana con tomate, mozzarella y albahaca."
          pasos={[
            "Preparar la masa de pizza.",
            "Untar salsa de tomate.",
            "Añadir mozzarella fresca.",
            "Hornear y decorar con albahaca."
          ]}
        />
      </div>
    </section>
  );
}
