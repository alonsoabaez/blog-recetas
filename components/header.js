export default function Header() {
  return (
    <header className="header">
      <h1>🍳 Blog de Recetas</h1>
      <nav>
        <ul className="nav">
          <li><a href="/">Inicio</a></li>
          <li><a href="/recetas">Recetas</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
