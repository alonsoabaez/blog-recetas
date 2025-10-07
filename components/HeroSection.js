export default function HeroSection() {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-title">
                    Bienvenido a <span className="hero-highlight">Sabores del Mundo</span>
                </h1>
                <p className="hero-description">
                    Descubre recetas increíbles, aprende técnicas culinarias y comparte tu pasión por la cocina.
                    Desde platos tradicionales hasta creaciones modernas, aquí encontrarás inspiración para cada ocasión.
                </p>
                <div className="hero-stats">
                    <div className="hero-stat">
                        <span className="hero-stat-number">13+</span>
                        <span className="hero-stat-label">Recetas</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-number">5★</span>
                        <span className="hero-stat-label">Calidad</span>
                    </div>
                    <div className="hero-stat">
                        <span className="hero-stat-number">100%</span>
                        <span className="hero-stat-label">Gratis</span>
                    </div>
                </div>
            </div>
            <div className="hero-decoration">
                <div className="floating-emoji">🍕</div>
                <div className="floating-emoji">🌮</div>
                <div className="floating-emoji">🍝</div>
                <div className="floating-emoji">🥗</div>
                <div className="floating-emoji">🍰</div>
            </div>
        </section>
    );
}