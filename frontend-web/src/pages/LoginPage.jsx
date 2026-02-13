import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Icons';

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const form = new FormData(e.target);
        try {
            await login(form.get('email'), form.get('password'));
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login gagal, coba lagi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="auth-page">
            <div className="auth-container">
                <div className="auth-left">
                    <div className="auth-left-content">
                        <div className="auth-brand">
                            <span className="auth-brand-icon">{Icons.hammer}</span>
                            <span className="auth-brand-title">TukangKita</span>
                        </div>
                        <h2 className="auth-left-heading">Selamat Datang Kembali!</h2>
                        <p className="auth-left-desc">
                            Masuk ke akunmu dan lanjutkan belajar berbagai keahlian bertukang bersama komunitas Karang Taruna.
                        </p>
                        <div className="auth-left-features">
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.video}</span>
                                <span>Akses tutorial lengkap</span>
                            </div>
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.clipboard}</span>
                                <span>Simpan progres belajar</span>
                            </div>
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.community}</span>
                                <span>Bergabung dengan komunitas</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-wrapper">
                        <h1 className="auth-title">Masuk</h1>
                        <p className="auth-subtitle">Masukkan kredensial untuk melanjutkan</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.email}</span>
                                    <input type="email" id="email" name="email" className="input-field" placeholder="nama@email.com" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.lock}</span>
                                    <input type={showPassword ? 'text' : 'password'} id="password" name="password" className="input-field" placeholder="Masukkan password" required />
                                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                                        {showPassword ? Icons.eyeOff : Icons.eye}
                                    </button>
                                </div>
                            </div>

                            <div className="auth-options">
                                <label className="checkbox-label">
                                    <input type="checkbox" className="checkbox-input" />
                                    <span className="checkbox-custom"></span>
                                    Ingat saya
                                </label>
                                <a href="#" className="auth-link">Lupa password?</a>
                            </div>

                            <button type="submit" className="btn btn-accent btn-full" disabled={loading}>
                                <span className="btn-icon">{Icons.login}</span>
                                {loading ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>

                        <p className="auth-footer-text">
                            Belum punya akun?{' '}
                            <Link to="/register" className="auth-link-bold">Daftar sekarang</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
