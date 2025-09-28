import RecetaCard from "../components/recetacard";

export default function Home() {
  return (
    <section>
      <h2 className="section-title">🥇 Receta Destacada</h2>
      <RecetaCard
        titulo="Pasta con Salsa de Tomate"
        imagen="/assets/pasta.jpg"
        descripcion="Una receta sencilla y deliciosa con tomates frescos y hierbas."
      />

      <h2 className="section-title">✨ Otras Recetas</h2>
      <div className="grid">
        <RecetaCard
          titulo="Tacos Mexicanos"
          imagen="/assets/tacos.jpg"
          descripcion="Tortillas rellenas de carne, verduras y guacamole."
        />
        <RecetaCard
          titulo="Pizza Margarita"
          imagen="/assets/pizza.jpg"
          descripcion="La clásica pizza italiana con tomate, mozzarella y albahaca."
        />
      </div>
    </section>
  );
}
