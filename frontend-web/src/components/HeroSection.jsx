import { Link } from 'react-router-dom';
import { Icons } from './Icons';

function HeroSection() {
    return (
        <section className="hero">
            <div className="hero-overlay"></div>
            <div className="hero-particles">
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
                <div className="particle"></div>
            </div>
            <div className="hero-content">
                <span className="hero-badge">
                    <span className="hero-badge-icon">{Icons.hammer}</span>
                    Karang Taruna DIY
                </span>
                <h1 className="hero-title">
                    Tingkatkan <span className="text-accent">Keahlian</span> Bertukangmu!
                </h1>
                <p className="hero-subtitle">
                    Pelajari berbagai teknik perbaikan &amp; pembuatan dari tutorial
                    terpercaya. Dari pemula hingga mahir, semua bisa belajar di sini.
                </p>
                <Link to="/#tutorials" className="btn btn-accent btn-lg btn-glow">
                    Jelajahi Tutorial
                    <span className="btn-icon">{Icons.arrowRight}</span>
                </Link>
            </div>
        </section>
    );
}

export default HeroSection;
