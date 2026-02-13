import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Icons, categoryIcons } from '../components/Icons';
import TutorialCard from '../components/TutorialCard';
import { tutorialAPI } from '../services/api';

function DetailPage() {
  const { id } = useParams();
  const [tutorial, setTutorial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    tutorialAPI.getById(id)
      .then((res) => setTutorial(res.data))
      .catch(() => setError('Tutorial tidak ditemukan'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-light)' }}>Memuat tutorial...</p>
      </main>
    );
  }

  if (error || !tutorial) {
    return (
      <main className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
        <h2>{error || 'Tutorial tidak ditemukan'}</h2>
        <Link to="/" className="btn btn-accent" style={{ marginTop: '1rem', display: 'inline-block' }}>
          Kembali ke Beranda
        </Link>
      </main>
    );
  }

  const catIcon = categoryIcons[tutorial.category] || Icons.hammer;
  const related = tutorial.relatedIds || [];

  return (
    <main className="detail-page">
      <div className="container">
        <Link to="/" className="back-link">
          <span className="back-icon">{Icons.arrowLeft}</span>
          Kembali ke Beranda
        </Link>

        <div className="detail-hero fade-in">
          <img src={tutorial.image} alt={tutorial.title} className="detail-image" />
          <div className="play-overlay">
            <div className="play-button">{Icons.play}</div>
            <span className="play-label">Tonton Tutorial</span>
          </div>
        </div>

        <div className="detail-header slide-up">
          <h1 className="detail-title">{tutorial.title}</h1>
          <div className="detail-badges">
            <span className="badge badge-level">
              <span className="badge-svg">{Icons.star}</span>
              {tutorial.difficulty}
            </span>
            <span className="badge badge-time">
              <span className="badge-svg">{Icons.clock}</span>
              {tutorial.duration}
            </span>
            <span className="badge badge-cat">
              <span className="badge-svg">{catIcon}</span>
              {tutorial.category}
            </span>
          </div>
        </div>

        <section className="detail-section slide-up">
          <h2 className="detail-section-title">Deskripsi</h2>
          <p className="detail-desc">{tutorial.description}</p>
        </section>

        <section className="detail-section slide-up">
          <h2 className="detail-section-title">Alat &amp; Bahan yang Dibutuhkan</h2>
          <div className="tools-grid">
            {tutorial.tools.map((tool, i) => (
              <div key={i} className="tool-item" style={{ animationDelay: `${i * 0.05}s` }}>
                <span className="tool-check">{Icons.check}</span>
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section slide-up">
          <h2 className="detail-section-title">Langkah-Langkah</h2>
          <div className="steps-list">
            {tutorial.steps.map((step, i) => (
              <div key={i} className="step-item" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="step-number">{i + 1}</div>
                <div className="step-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section className="detail-section slide-up">
            <h2 className="detail-section-title">Tutorial Terkait</h2>
            <div className="tutorial-grid">
              {related.map((t) => (
                <TutorialCard key={t._id} tutorial={t} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default DetailPage;
