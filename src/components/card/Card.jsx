import "./Card.css";

function NewsCard({ item }) {
  return (
    <article className="news-card">
      <img
        src={item.imageURL}
        alt={item.title}
        className="news-card-image"
        loading="lazy"
      />

      <div className="news-card-content">
        <span className="news-card-category">{item.categoryLabel}</span>

        <h3 className="news-card-title">{item.title}</h3>

        <p className="news-card-description">{item.description}</p>
      </div>
    </article>
  );
}

export default NewsCard;