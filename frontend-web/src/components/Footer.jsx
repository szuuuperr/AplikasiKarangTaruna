import { Link } from 'react-router-dom';
import { Icons } from './Icons';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-grid">
                    <div className="footer-about">
                        <div className="footer-brand">
                            <span className="navbar-icon">{Icons.hammer}</span>
                            <span className="navbar-title">TukangKita</span>
                        </div>
                        <p className="footer-desc">
                            Platform DIY tutorial untuk Karang Taruna Indonesia.
                            Belajar berbagai keahlian bertukang mulai dari perbaikan rumah
                            hingga pembuatan furniture.
                        </p>
                        <div className="footer-socials">
                            <a href="#" className="social-link" aria-label="Facebook">{Icons.facebook}</a>
                            <a href="#" className="social-link" aria-label="Instagram">{Icons.instagram}</a>
                            <a href="#" className="social-link" aria-label="YouTube">{Icons.youtube}</a>
                        </div>
                    </div>

                    <div className="footer-nav">
                        <h4 className="footer-heading">Navigasi</h4>
                        <ul>
                            <li><Link to="/">Beranda</Link></li>
                            <li><Link to="/">Tutorial</Link></li>
                            <li><Link to="/">Kategori</Link></li>
                            <li><Link to="/">Tentang Kami</Link></li>
                        </ul>
                    </div>

                    <div className="footer-nav">
                        <h4 className="footer-heading">Kategori</h4>
                        <ul>
                            <li><Link to="/"><span className="footer-cat-icon">{Icons.wood}</span> Pertukangan Kayu</Link></li>
                            <li><Link to="/"><span className="footer-cat-icon">{Icons.electric}</span> Kelistrikan</Link></li>
                            <li><Link to="/"><span className="footer-cat-icon">{Icons.plumbing}</span> Perpipaan</Link></li>
                            <li><Link to="/"><span className="footer-cat-icon">{Icons.paint}</span> Pengecatan</Link></li>
                        </ul>
                    </div>

                    <div className="footer-newsletter">
                        <h4 className="footer-heading">Newsletter</h4>
                        <p>Dapatkan tutorial terbaru langsung di inbox kamu.</p>
                        <div className="newsletter-form">
                            <input type="email" placeholder="Alamat email..." className="newsletter-input" />
                            <button className="btn btn-accent newsletter-btn">{Icons.send}</button>
                        </div>
                    </div>
                </div>

                <div className="footer-divider"></div>

                <div className="footer-bottom">
                    <p>&copy; 2026 TukangKita &middot; Karang Taruna</p>
                    <p className="footer-tagline">Belajar, Berkarya, Maju Bersama</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
