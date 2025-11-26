"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <h1> Sabores del Mundo</h1>
        <p className="header-subtitle">Descubre, cocina y disfruta</p>
      </div>

      <nav>
        <ul className="nav">
          <li><a href="/">Inicio</a></li>

          {/* Acceso al panel */}
          <li>
            <Link href="/admin" className="nav-button">
              Panel
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

