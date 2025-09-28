export default function RecetaCard({ titulo, imagen, descripcion }) {
  return (
    <div className="card">
      <img src={imagen} alt={titulo} className="card-img" />
      <div className="card-body">
        <h2>{titulo}</h2>
        <p>{descripcion}</p>
      </div>
    </div>
  );
}
