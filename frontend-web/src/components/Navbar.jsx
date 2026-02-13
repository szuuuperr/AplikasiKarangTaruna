import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from './Icons';

function Navbar() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <span className="navbar-icon">{Icons.hammer}</span>
                    <span className="navbar-title">TukangKita</span>
                </Link>
                <div className="navbar-actions">
                    {isLoggedIn ? (
                        <button onClick={logout} className="btn btn-ghost">
                            <span className="btn-icon">{Icons.login}</span>
                            Keluar
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="btn btn-ghost">
                                <span className="btn-icon">{Icons.login}</span>
                                Masuk
                            </Link>
                            <Link to="/register" className="btn btn-accent">
                                <span className="btn-icon">{Icons.register}</span>
                                Daftar
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
