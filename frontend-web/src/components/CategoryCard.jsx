function CategoryCard({ icon, name, count }) {
    return (
        <div className="category-card">
            <div className="category-icon">{icon}</div>
            <h3 className="category-name">{name}</h3>
            <span className="category-count">{count} tutorial</span>
        </div>
    );
}

export default CategoryCard;
