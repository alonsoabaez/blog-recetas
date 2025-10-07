"use client";

export default function Header() {
  const scrollToRecetas = () => {
    const recetasSection = document.getElementById('todas-las-recetas');
    if (recetasSection) {
      recetasSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>🍳 Sabores del Mundo</h1>
        <p className="header-subtitle">Descubre, cocina y disfruta</p>
      </div>
      <nav>
        <ul className="nav">
          <li><a href="/">Inicio</a></li>
          <li>
            <button 
              onClick={scrollToRecetas}
              className="nav-button"
            >
              Recetas
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
