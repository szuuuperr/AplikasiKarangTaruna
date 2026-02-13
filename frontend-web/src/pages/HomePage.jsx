import { useState, useEffect } from 'react';
import { Icons } from '../components/Icons';
import HeroSection from '../components/HeroSection';
import CategoryCard from '../components/CategoryCard';
import TutorialCard from '../components/TutorialCard';
import FeatureCard from '../components/FeatureCard';
import { tutorialAPI } from '../services/api';

const categories = [
    { name: "Kayu", icon: Icons.wood, count: 3 },
    { name: "Listrik", icon: Icons.electric, count: 1 },
    { name: "Pipa", icon: Icons.plumbing, count: 1 },
    { name: "Cat", icon: Icons.paint, count: 1 }
];

const features = [
    { icon: Icons.video, title: "Video HD Tutorial", description: "Tutorial berkualitas tinggi yang mudah diikuti langkah demi langkah." },
    { icon: Icons.clipboard, title: "Panduan Terperinci", description: "Setiap tutorial dilengkapi daftar alat, bahan, dan instruksi detail." },
    { icon: Icons.community, title: "Komunitas Aktif", description: "Bergabung dengan ribuan anggota Karang Taruna yang saling berbagi." },
    { icon: Icons.target, title: "Untuk Semua Level", description: "Dari pemula hingga mahir, tersedia tutorial sesuai kemampuanmu." }
];

function HomePage() {
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        tutorialAPI.getAll()
            .then((res) => setTutorials(res.data))
            .catch(() => setTutorials([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <main>
            <HeroSection />

            <section className="section" id="categories">
                <div className="container">
                    <h2 className="section-title">Kategori Populer</h2>
                    <p className="section-subtitle">Pilih bidang yang ingin kamu pelajari</p>
                    <div className="category-grid">
                        {categories.map((cat) => (
                            <CategoryCard key={cat.name} icon={cat.icon} name={cat.name} count={cat.count} />
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-alt" id="tutorials">
                <div className="container">
                    <h2 className="section-title">Tutorial Terbaru</h2>
                    <p className="section-subtitle">Mulai belajar dari tutorial pilihan kami</p>
                    {loading ? (
                        <p style={{ textAlign: 'center', color: 'var(--text-light)' }}>Memuat tutorial...</p>
                    ) : (
                        <div className="tutorial-grid">
                            {tutorials.map((t) => (
                                <TutorialCard key={t._id} tutorial={t} />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <section className="section" id="features">
                <div className="container">
                    <h2 className="section-title">Kenapa TukangKita?</h2>
                    <p className="section-subtitle">Alasan memilih platform kami untuk belajar</p>
                    <div className="feature-grid">
                        {features.map((f, i) => (
                            <FeatureCard key={i} icon={f.icon} title={f.title} description={f.description} />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
