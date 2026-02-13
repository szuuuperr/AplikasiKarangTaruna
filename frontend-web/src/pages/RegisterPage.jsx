import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Icons } from '../components/Icons';

function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const form = new FormData(e.target);
        const password = form.get('password');
        const confirm = form.get('confirm');
        const agreed = e.target.querySelector('.checkbox-input').checked;

        if (!agreed) {
            setError('Kamu harus menyetujui Syarat & Ketentuan');
            return;
        }
        if (password !== confirm) {
            setError('Password dan konfirmasi tidak cocok');
            return;
        }

        setLoading(true);
        try {
            await register(form.get('fullname'), form.get('email'), password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registrasi gagal, coba lagi');
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
                        <h2 className="auth-left-heading">Mulai Perjalananmu!</h2>
                        <p className="auth-left-desc">
                            Daftar sekarang dan mulai belajar berbagai keahlian bertukang. Gratis untuk semua anggota Karang Taruna.
                        </p>
                        <div className="auth-left-features">
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.check}</span>
                                <span>Gratis tanpa biaya</span>
                            </div>
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.video}</span>
                                <span>Ratusan tutorial tersedia</span>
                            </div>
                            <div className="auth-feature">
                                <span className="auth-feature-icon">{Icons.target}</span>
                                <span>Belajar sesuai level</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="auth-right">
                    <div className="auth-form-wrapper">
                        <h1 className="auth-title">Daftar Akun</h1>
                        <p className="auth-subtitle">Isi data diri untuk membuat akun baru</p>

                        {error && <div className="auth-error">{error}</div>}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <label className="input-label" htmlFor="fullname">Nama Lengkap</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.user}</span>
                                    <input type="text" id="fullname" name="fullname" className="input-field" placeholder="Nama lengkap" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="reg-email">Email</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.email}</span>
                                    <input type="email" id="reg-email" name="email" className="input-field" placeholder="nama@email.com" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="reg-password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.lock}</span>
                                    <input type={showPassword ? 'text' : 'password'} id="reg-password" name="password" className="input-field" placeholder="Minimal 8 karakter" required minLength={8} />
                                    <button type="button" className="input-toggle" onClick={() => setShowPassword(!showPassword)} aria-label="Toggle password">
                                        {showPassword ? Icons.eyeOff : Icons.eye}
                                    </button>
                                </div>
                            </div>

                            <div className="input-group">
                                <label className="input-label" htmlFor="confirm-password">Konfirmasi Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon">{Icons.lock}</span>
                                    <input type={showConfirm ? 'text' : 'password'} id="confirm-password" name="confirm" className="input-field" placeholder="Ulangi password" required />
                                    <button type="button" className="input-toggle" onClick={() => setShowConfirm(!showConfirm)} aria-label="Toggle confirm password">
                                        {showConfirm ? Icons.eyeOff : Icons.eye}
                                    </button>
                                </div>
                            </div>

                            <label className="checkbox-label" style={{ marginBottom: '1.25rem' }}>
                                <input type="checkbox" className="checkbox-input" />
                                <span className="checkbox-custom"></span>
                                Saya setuju dengan <a href="#" className="auth-link">Syarat & Ketentuan</a>
                            </label>

                            <button type="submit" className="btn btn-accent btn-full" disabled={loading}>
                                <span className="btn-icon">{Icons.register}</span>
                                {loading ? 'Memproses...' : 'Daftar Sekarang'}
                            </button>
                        </form>

                        <p className="auth-footer-text">
                            Sudah punya akun?{' '}
                            <Link to="/login" className="auth-link-bold">Masuk di sini</Link>
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default RegisterPage;
