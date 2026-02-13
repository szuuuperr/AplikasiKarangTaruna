import { Link } from 'react-router-dom';
import { Icons, categoryIcons } from './Icons';

function TutorialCard({ tutorial }) {
    const catIcon = categoryIcons[tutorial.category] || Icons.hammer;

    return (
        <Link to={`/tutorial/${tutorial._id}`} className="tutorial-card">
            <div className="tutorial-thumb">
                <img src={tutorial.thumbnail} alt={tutorial.title} loading="lazy" />
                <span className="tutorial-category-badge">
                    <span className="badge-icon">{catIcon}</span>
                    {tutorial.category}
                </span>
            </div>
            <div className="tutorial-info">
                <h3 className="tutorial-title">{tutorial.title}</h3>
                <div className="tutorial-meta">
                    <span className="meta-item">
                        <span className="meta-icon">{Icons.clock}</span>
                        {tutorial.duration}
                    </span>
                    <span className="meta-item">
                        <span className="meta-icon">{Icons.star}</span>
                        {tutorial.difficulty}
                    </span>
                </div>
            </div>
        </Link>
    );
}

export default TutorialCard;
